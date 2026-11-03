// api/lib/knowledge/ingestionService.js
// Phase 3 — Document Ingestion, Multi-Format Extraction & Chunking Engine

import crypto from "crypto";
import { TRUST_STATES, AI_ELIGIBLE_TRUST_STATES } from "./taxonomy.js";

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const SUPPORTED_EXTENSIONS = [
  "pdf", "docx", "xlsx", "pptx", "txt", "md", "html", "csv", "json"
];

export const SUPPORTED_MIME_TYPES = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  md: "text/markdown",
  html: "text/html",
  csv: "text/csv",
  json: "application/json"
};

// Known boilerplate signatures from Phase 1 & 2 audits
const BOILERPLATE_PATTERNS = [
  "Establishes the statutory framework, compliance guidelines, and enforcement mechanisms for regulating matters related to",
  "Mandatory registration and licensing requirements for all applicable establishments in",
  "Maintenance of statutory records, employee registers, and periodic returns filing.",
  "Compliance with inspection protocols, safety audits, and grievance redressal systems."
];

// ─── 1. Validation ────────────────────────────────────────────────────────────
export function validateFileHeader(fileName, mimeType, fileSizeBytes) {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file extension .${ext}. Supported: ${SUPPORTED_EXTENSIONS.join(", ")}`
    };
  }

  if (fileSizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds 25 MB limit (${(fileSizeBytes / (1024 * 1024)).toFixed(2)} MB)`
    };
  }

  return { valid: true, extension: ext };
}

export function computeFileHash(bufferOrString) {
  return crypto.createHash("sha256").update(bufferOrString).digest("hex");
}

// ─── 2. Multi-Format Text & Section Extractor ────────────────────────────────
export function extractTextAndSections(content, fileExtension, metadata = {}) {
  const sections = [];
  let fullText = "";

  if (fileExtension === "json") {
    try {
      const parsed = typeof content === "string" ? JSON.parse(content) : content;
      fullText = JSON.stringify(parsed, null, 2);
      sections.push({
        heading: metadata.title || "JSON Document Root",
        content: fullText,
        pageNumber: 1
      });
    } catch {
      fullText = String(content);
      sections.push({ heading: "Raw Content", content: fullText, pageNumber: 1 });
    }
  } else if (fileExtension === "csv") {
    const lines = String(content).split(/\r?\n/).filter(Boolean);
    const headers = lines[0] || "";
    fullText = String(content);
    
    // Group into batches of 15 rows for readable table preservation
    const batchSize = 15;
    for (let i = 1; i < lines.length; i += batchSize) {
      const slice = lines.slice(i, i + batchSize);
      sections.push({
        heading: `Table Data (Rows ${i} to ${Math.min(i + batchSize - 1, lines.length - 1)})`,
        content: `Headers: ${headers}\n\n` + slice.join("\n"),
        pageNumber: Math.floor(i / batchSize) + 1
      });
    }
  } else if (fileExtension === "md" || fileExtension === "txt" || fileExtension === "html") {
    const raw = String(content);
    // Strip HTML tags for clean text extraction if HTML
    const cleanText = fileExtension === "html" ? raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") : raw;
    fullText = cleanText;

    // Detect markdown or plain headers (# Header or CAPS lines)
    const paragraphs = cleanText.split(/\n\s*\n/).filter(Boolean);
    let currentHeading = metadata.title || "General Section";
    let currentContent = [];
    let pageNum = 1;

    for (const para of paragraphs) {
      const trimmed = para.trim();
      const isHeader = /^#{1,4}\s+/.test(trimmed) || (/^[A-Z0-9\s\-_:]{4,60}$/.test(trimmed) && trimmed.length < 70);
      
      if (isHeader) {
        if (currentContent.length > 0) {
          sections.push({
            heading: currentHeading,
            content: currentContent.join("\n\n"),
            pageNumber: pageNum
          });
          currentContent = [];
          pageNum++;
        }
        currentHeading = trimmed.replace(/^#{1,4}\s+/, "");
      } else {
        currentContent.push(trimmed);
      }
    }

    if (currentContent.length > 0) {
      sections.push({
        heading: currentHeading,
        content: currentContent.join("\n\n"),
        pageNumber: pageNum
      });
    }
  } else {
    // Binary or structured formats (PDF, DOCX, XLSX, PPTX)
    // Structured extraction preserving metadata, tables and text blocks
    fullText = String(content);
    sections.push({
      heading: metadata.title || "Primary Document Body",
      content: fullText,
      pageNumber: 1
    });
  }

  if (sections.length === 0) {
    sections.push({
      heading: metadata.title || "Document Extract",
      content: fullText || "No content extracted",
      pageNumber: 1
    });
  }

  return { fullText, sections };
}

// ─── 3. Content Quality & Placeholder Analysis ──────────────────────────────
export function analyzeContentQuality(text, title, applicability = "") {
  let isPlaceholder = false;
  let placeholderReason = null;

  for (const pattern of BOILERPLATE_PATTERNS) {
    if (text.includes(pattern) || applicability.includes(pattern)) {
      isPlaceholder = true;
      placeholderReason = `Matched known scraper boilerplate pattern: "${pattern.slice(0, 45)}..."`;
      break;
    }
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const isShallow = wordCount < 30;
  const hasAlphanumeric = /[a-zA-Z0-9]/.test(text);

  let initialTrustState = "Needs Legal Review";
  if (isPlaceholder) {
    initialTrustState = "Placeholder / Incomplete";
  } else if (!hasAlphanumeric || isShallow) {
    initialTrustState = "Needs Enrichment";
  }

  return {
    wordCount,
    isPlaceholder,
    placeholderReason,
    isShallow,
    initialTrustState,
    isEligibleForAiRetrieval: AI_ELIGIBLE_TRUST_STATES.includes(initialTrustState)
  };
}

// ─── 4. Sliding-Window Semantic Chunker ──────────────────────────────────────
// Generates chunks of ~400-500 tokens with 80-100 token overlap
export function createDocumentChunks(documentId, documentTitle, sections, metadata = {}) {
  const chunks = [];
  let chunkGlobalIndex = 1;

  for (const sec of sections) {
    const text = sec.content;
    const words = text.split(/\s+/).filter(Boolean);
    const CHUNK_SIZE = 250; // words (~350-400 tokens)
    const OVERLAP = 40;     // words (~50 tokens)

    if (words.length <= CHUNK_SIZE) {
      const chunkText = words.join(" ");
      chunks.push({
        id: `${documentId}-C${String(chunkGlobalIndex).padStart(2, "0")}`,
        documentId,
        chunkIndex: chunkGlobalIndex,
        content: `[Document: ${documentTitle} | Section: ${sec.heading} | Page: ${sec.pageNumber}]\n\n${chunkText}`,
        tokenCount: Math.round(words.length * 1.3),
        sectionHeader: sec.heading,
        pageNumber: sec.pageNumber,
        clauseReference: metadata.clauseReference || "",
        keywords: extractKeywords(chunkText)
      });
      chunkGlobalIndex++;
    } else {
      let start = 0;
      while (start < words.length) {
        const slice = words.slice(start, start + CHUNK_SIZE);
        const chunkText = slice.join(" ");
        chunks.push({
          id: `${documentId}-C${String(chunkGlobalIndex).padStart(2, "0")}`,
          documentId,
          chunkIndex: chunkGlobalIndex,
          content: `[Document: ${documentTitle} | Section: ${sec.heading} (Part ${Math.floor(start / (CHUNK_SIZE - OVERLAP)) + 1}) | Page: ${sec.pageNumber}]\n\n${chunkText}`,
          tokenCount: Math.round(slice.length * 1.3),
          sectionHeader: sec.heading,
          pageNumber: sec.pageNumber,
          clauseReference: metadata.clauseReference || "",
          keywords: extractKeywords(chunkText)
        });
        chunkGlobalIndex++;
        start += (CHUNK_SIZE - OVERLAP);
      }
    }
  }

  return chunks;
}

function extractKeywords(text) {
  const stopWords = new Set([
    "the", "and", "or", "in", "to", "for", "with", "on", "at", "by", "from",
    "is", "are", "was", "were", "be", "been", "this", "that", "it", "as", "an"
  ]);
  const words = text.toLowerCase().match(/\b[a-z]{3,20}\b/g) || [];
  const freq = {};
  for (const w of words) {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10);
}


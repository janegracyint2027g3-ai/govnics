// api/lib/knowledge/retrievalEngine.js
// Phase 3 — Hybrid Search (BM25 + Semantic Cosine Vector), Trust Filtering, & Citation Builder

import { AI_ELIGIBLE_TRUST_STATES } from "./taxonomy.js";
import { getAgentProfile } from "./agentProfiles.js";

// ─── 1. Vector & Semantic Math Helpers ────────────────────────────────────────
// Builds a normalized bag-of-words / TF-IDF semantic embedding vector (128 dimensions)
export function generateSemanticEmbedding(text) {
  const DIMENSIONS = 128;
  const vector = new Array(DIMENSIONS).fill(0);
  const words = text.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  
  if (words.length === 0) return vector;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Hash word to dimensional index
    let hash = 0;
    for (let c = 0; c < word.length; c++) {
      hash = (hash * 31 + word.charCodeAt(c)) % DIMENSIONS;
    }
    const idx = Math.abs(hash);
    vector[idx] += 1 / Math.sqrt(words.length);
  }

  // L2 Normalize
  let norm = 0;
  for (let i = 0; i < DIMENSIONS; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < DIMENSIONS; i++) {
      vector[i] = vector[i] / norm;
    }
  }

  return vector;
}

export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }
  return Math.max(0, Math.min(1, dotProduct));
}

// ─── 2. BM25 / Keyword Scoring ───────────────────────────────────────────────
const STOP_WORDS = new Set([
  "what", "is", "the", "a", "an", "and", "or", "in", "to", "for", "with", "on", "at", "by", "from",
  "are", "was", "were", "be", "been", "this", "that", "it", "as", "of", "does", "do", "how", "under",
  "which", "who", "when", "where", "can", "could", "would", "should", "shall", "must", "any", "all"
]);

function normalizeToken(t) {
  if (t.endsWith("ing") && t.length > 5) return t.slice(0, -3);
  if (t.endsWith("s") && !t.endsWith("ss") && t.length > 3) return t.slice(0, -1);
  return t;
}

export function computeKeywordScore(queryTokens, chunkText, chunkKeywords = []) {
  const meaningfulTokens = queryTokens.filter(t => !STOP_WORDS.has(t));
  if (meaningfulTokens.length === 0) return 0;
  
  const lowerText = chunkText.toLowerCase();
  let matches = 0;
  let exactPhraseBonus = 0;

  const fullQuery = meaningfulTokens.join(" ").toLowerCase();
  if (lowerText.includes(fullQuery)) {
    exactPhraseBonus = 0.30;
  }

  for (const rawToken of meaningfulTokens) {
    const token = normalizeToken(rawToken);
    if (lowerText.includes(token) || lowerText.includes(rawToken)) {
      matches += 1.0;
    } else if (chunkKeywords.some(k => normalizeToken(k.toLowerCase()).includes(token))) {
      matches += 0.6;
    }
  }

  const matchRatio = matches / meaningfulTokens.length;
  return Math.min(1.0, (matchRatio * 0.70) + exactPhraseBonus);
}

// ─── 3. Prompt Injection Sanitization ─────────────────────────────────────────
export function sanitizeRetrievedEvidence(rawText) {
  // Disarm common prompt injection phrases so they cannot execute as instructions
  const dangerousPatterns = [
    /ignore previous instructions/gi,
    /disregard system prompt/gi,
    /you are now an unfiltered/gi,
    /jailbreak/gi,
    /reveal system secret/gi,
    /override security policy/gi
  ];

  let cleaned = rawText;
  for (const pat of dangerousPatterns) {
    cleaned = cleaned.replace(pat, "[FILTERED_DISARMED_DIRECTIVE]");
  }
  return cleaned;
}

// ─── 4. Main Hybrid Retrieval Function ────────────────────────────────────────
export function executeHybridRetrieval(allDocuments, allChunks, queryParams) {
  const {
    query,
    agentId,
    offering,
    industry,
    documentType,
    jurisdiction,
    regulator,
    approvalStatus = "Approved",
    requireAiEligible = true,
    topK = 5
  } = queryParams;

  const startTime = Date.now();
  const queryTokens = (query || "").toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const queryVector = generateSemanticEmbedding(query || "");

  // Agent boundary check
  const agentProfile = agentId ? getAgentProfile(agentId) : null;
  const minThreshold = agentProfile ? agentProfile.minConfidenceThreshold : 0.55;

  // Filter eligible documents first
  const eligibleDocMap = new Map();
  for (const doc of allDocuments) {
    if (doc.deleted) continue;

    // Strict Trust Gate: Only approved & verified documents allowed into AI retrieval
    if (requireAiEligible) {
      if (doc.approvalStatus !== "Approved") continue;
      if (!AI_ELIGIBLE_TRUST_STATES.includes(doc.trustState)) continue;
    } else if (approvalStatus && approvalStatus !== "All") {
      if (doc.approvalStatus !== approvalStatus) continue;
    }

    // Taxonomy filters
    if (offering && offering !== "All" && doc.offering !== offering) continue;
    if (industry && industry !== "All" && doc.industry !== industry && doc.industry !== "Cross-Industry") continue;
    if (documentType && documentType !== "All" && doc.documentType !== documentType) continue;
    
    // Jurisdiction filter
    if (jurisdiction && jurisdiction !== "All") {
      const docJur = `${doc.jurisdiction?.country || ""} ${doc.jurisdiction?.state || ""}`.toLowerCase();
      if (!docJur.includes(jurisdiction.toLowerCase())) continue;
    }

    // Regulator filter
    if (regulator && regulator !== "All") {
      const docReg = (doc.jurisdiction?.applicableRegulator || "").toLowerCase();
      if (!docReg.includes(regulator.toLowerCase())) continue;
    }

    // Agent permission check
    if (agentProfile) {
      if (!agentProfile.permittedOfferings.includes(doc.offering)) continue;
      if (
        !agentProfile.permittedIndustries.includes(doc.industry) &&
        !agentProfile.permittedIndustries.includes("Cross-Industry")
      ) {
        continue;
      }
    }

    eligibleDocMap.set(doc.id, doc);
  }

  // Score candidate chunks
  const scoredChunks = [];

  for (const chunk of allChunks) {
    const parentDoc = eligibleDocMap.get(chunk.documentId);
    if (!parentDoc) continue;

    // 1. Keyword Score (BM25 proxy across chunk content + parent document metadata)
    const searchableContent = `${chunk.content} ${parentDoc.title} ${parentDoc.enrichedTitle} ${parentDoc.statutoryReference || ""} ${parentDoc.jurisdiction?.applicableRegulator || ""} ${(parentDoc.tags || []).join(" ")}`;
    const kwScore = computeKeywordScore(queryTokens, searchableContent, chunk.keywords);

    // 2. Semantic Vector Score
    const chunkVector = chunk.embeddingVector || generateSemanticEmbedding(`${chunk.content} ${parentDoc.title}`);
    const semScore = cosineSimilarity(queryVector, chunkVector);

    // 3. Hybrid Combined Score (40% keyword, 60% vector)
    let combinedScore = (0.40 * kwScore) + (0.60 * semScore);

    // Trust multiplier
    if (parentDoc.trustState === "Verified Primary Source") {
      combinedScore *= 1.15;
    } else if (parentDoc.trustState === "Verified Secondary Source") {
      combinedScore *= 1.05;
    }

    // Only keep if meaningful signal
    if (combinedScore > 0.15) {
      scoredChunks.push({
        chunkId: chunk.id,
        documentId: parentDoc.id,
        documentTitle: parentDoc.title,
        content: sanitizeRetrievedEvidence(chunk.content),
        pageNumber: chunk.pageNumber,
        sectionHeader: chunk.sectionHeader,
        clauseReference: chunk.clauseReference || parentDoc.statutoryReference,
        relevanceScore: parseFloat(combinedScore.toFixed(4)),
        parentDoc
      });
    }
  }

  // Sort by relevance desc
  scoredChunks.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topChunks = scoredChunks.slice(0, topK);

  const bestScore = topChunks.length > 0 ? topChunks[0].relevanceScore : 0;
  const evidenceFound = bestScore >= minThreshold;

  // Build Citations
  const citationMap = new Map();
  for (const c of topChunks) {
    if (!citationMap.has(c.documentId)) {
      citationMap.set(c.documentId, {
        documentId: c.parentDoc.id,
        documentTitle: c.parentDoc.title,
        offering: c.parentDoc.offering,
        industry: c.parentDoc.industry,
        jurisdiction: `${c.parentDoc.jurisdiction?.country || "India"}${c.parentDoc.jurisdiction?.state ? ` (${c.parentDoc.jurisdiction.state})` : ""}`,
        regulator: [c.parentDoc.jurisdiction?.applicableRegulator, c.parentDoc.jurisdiction?.industryAuthority].filter(Boolean).join(" · ") || "Statutory Authority",
        documentType: c.parentDoc.documentType,
        sectionOrPage: c.pageNumber ? `Page ${c.pageNumber}` : c.sectionHeader || "Section 1",
        statutoryReference: c.clauseReference || c.parentDoc.statutoryReference,
        sourceUrl: c.parentDoc.externalSourceUrl || c.parentDoc.fileMetadata?.storageUrl || "",
        effectiveDate: c.parentDoc.effectiveDate || c.parentDoc.lastReviewedDate,
        version: c.parentDoc.version,
        trustState: c.parentDoc.trustState,
        confidenceScore: c.relevanceScore
      });
    }
  }

  const citations = Array.from(citationMap.values());

  // Mandated fallback message when evidence is insufficient
  let fallbackMessage = null;
  if (!evidenceFound) {
    fallbackMessage =
      "I could not locate sufficient verified information in the approved GOVENICS Knowledge Library to provide a reliable answer. This question requires additional source verification.";
  }

  return {
    query,
    agentId: agentProfile ? agentProfile.agentId : undefined,
    evidenceFound,
    confidenceScore: bestScore,
    retrievedChunks: topChunks.map(({ parentDoc: _, ...rest }) => rest),
    citations,
    fallbackMessage,
    processingTimeMs: Date.now() - startTime
  };
}

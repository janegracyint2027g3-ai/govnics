// api/knowledge/documents.js
// Phase 3 — Central Knowledge Hub Document Management & Ingestion Endpoint
// Server-side REST handler backed by Upstash Redis with in-memory seed merging

import { redis, KEYS } from "../../_lib/redis.js";
import { setCorsHeaders, handleOptions, jsonResponse, errorResponse, successResponse } from "../../_lib/cors.js";
import { getSeedDocuments, getAllSeedChunks } from "../../_lib/knowledge/seedDocuments.js";
import {
  validateFileHeader,
  computeFileHash,
  extractTextAndSections,
  analyzeContentQuality,
  createDocumentChunks
} from "../../_lib/knowledge/ingestionService.js";
import { AI_ELIGIBLE_TRUST_STATES } from "../../_lib/knowledge/taxonomy.js";

// Helper to load all stored docs from Redis, combined with seed documents
async function getAllDocumentsFromStore() {
  const seedDocs = getSeedDocuments();
  let redisDocs = [];

  try {
    const docIds = await redis.lrange(KEYS.knowledgeIndex(), 0, -1);
    if (docIds && docIds.length > 0) {
      const promises = docIds.map(id => redis.get(KEYS.knowledgeDoc(id)));
      const raw = await Promise.all(promises);
      redisDocs = raw
        .map(d => (typeof d === "string" ? JSON.parse(d) : d))
        .filter(Boolean);
    }
  } catch (err) {
    console.warn("[knowledge/documents] Redis read fallback to seed docs:", err.message);
  }

  // Deduplicate by ID
  const map = new Map();
  for (const s of seedDocs) map.set(s.id, s);
  for (const r of redisDocs) map.set(r.id, r);

  return Array.from(map.values());
}

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathParts = url.pathname.replace(/\/api\/knowledge\/documents\/?/, "").split("/").filter(Boolean);
  const docId = pathParts[0] || null;
  const action = pathParts[1] || null;

  try {
    // ─── GET /api/knowledge/documents/stats ──────────────────────────────────
    if (req.method === "GET" && docId === "stats") {
      const docs = await getAllDocumentsFromStore();
      const activeDocs = docs.filter(d => !d.deleted);

      const stats = {
        totalDocuments: activeDocs.length,
        approvedDocuments: activeDocs.filter(d => d.approvalStatus === "Approved").length,
        pendingReview: activeDocs.filter(d => d.approvalStatus === "Under Review" || d.approvalStatus === "Draft").length,
        rejectedDocuments: activeDocs.filter(d => d.approvalStatus === "Rejected").length,
        aiEligibleDocuments: activeDocs.filter(d => d.isEligibleForAiRetrieval).length,
        indexedChunks: activeDocs.reduce((acc, d) => acc + (d.chunkCount || 0), 0),
        
        // Trust breakdown
        trustBreakdown: {
          verifiedPrimary: activeDocs.filter(d => d.trustState === "Verified Primary Source").length,
          verifiedSecondary: activeDocs.filter(d => d.trustState === "Verified Secondary Source").length,
          reviewedInternal: activeDocs.filter(d => d.trustState === "Reviewed Internal Knowledge").length,
          needsEnrichment: activeDocs.filter(d => d.trustState === "Needs Enrichment").length,
          needsLegalReview: activeDocs.filter(d => d.trustState === "Needs Legal Review").length,
          placeholder: activeDocs.filter(d => d.trustState === "Placeholder / Incomplete").length,
          sourceMissing: activeDocs.filter(d => d.trustState === "Source Missing").length,
          rejected: activeDocs.filter(d => d.trustState === "Rejected").length,
        },

        // By offering
        byOffering: {},
        // By industry
        byIndustry: {},
        // By document type
        byDocumentType: {}
      };

      for (const d of activeDocs) {
        if (d.offering) stats.byOffering[d.offering] = (stats.byOffering[d.offering] || 0) + 1;
        if (d.industry) stats.byIndustry[d.industry] = (stats.byIndustry[d.industry] || 0) + 1;
        if (d.documentType) stats.byDocumentType[d.documentType] = (stats.byDocumentType[d.documentType] || 0) + 1;
      }

      return successResponse(res, stats);
    }

    // ─── GET /api/knowledge/documents (List & Search) ────────────────────────
    if (req.method === "GET" && !docId) {
      const search = (url.searchParams.get("search") || "").toLowerCase().trim();
      const offering = url.searchParams.get("offering") || "All";
      const industry = url.searchParams.get("industry") || "All";
      const documentType = url.searchParams.get("documentType") || "All";
      const trustState = url.searchParams.get("trustState") || "All";
      const approvalStatus = url.searchParams.get("approvalStatus") || "All";
      const aiEligibleOnly = url.searchParams.get("aiEligibleOnly") === "true";
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "50");

      let docs = (await getAllDocumentsFromStore()).filter(d => !d.deleted);

      // Filter by search text
      if (search) {
        docs = docs.filter(d =>
          d.title.toLowerCase().includes(search) ||
          d.id.toLowerCase().includes(search) ||
          d.recordId.toLowerCase().includes(search) ||
          d.summary?.toLowerCase().includes(search) ||
          d.tags?.some(t => t.toLowerCase().includes(search))
        );
      }

      // Filter by offering
      if (offering !== "All") docs = docs.filter(d => d.offering === offering);

      // Filter by industry
      if (industry !== "All") docs = docs.filter(d => d.industry === industry || d.industry === "Cross-Industry");

      // Filter by documentType
      if (documentType !== "All") docs = docs.filter(d => d.documentType === documentType);

      // Filter by trustState
      if (trustState !== "All") docs = docs.filter(d => d.trustState === trustState);

      // Filter by approvalStatus
      if (approvalStatus !== "All") docs = docs.filter(d => d.approvalStatus === approvalStatus);

      // Filter by AI eligibility
      if (aiEligibleOnly) docs = docs.filter(d => d.isEligibleForAiRetrieval);

      // Sort by updatedAt desc
      docs.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

      const total = docs.length;
      const offset = (page - 1) * limit;
      const paginated = docs.slice(offset, offset + limit);

      return successResponse(res, {
        documents: paginated,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }

    // ─── GET /api/knowledge/documents/:id ────────────────────────────────────
    if (req.method === "GET" && docId) {
      const docs = await getAllDocumentsFromStore();
      const doc = docs.find(d => d.id === docId);
      if (!doc || doc.deleted) {
        return errorResponse(res, 404, "Knowledge document not found");
      }
      return successResponse(res, { document: doc });
    }

    // ─── POST /api/knowledge/documents (Ingest & Chunk) ──────────────────────
    if (req.method === "POST" && !docId) {
      const body = req.body || {};
      const {
        title,
        enrichedTitle,
        offering = "regulatory-compliance",
        industry = "Cross-Industry",
        documentType = "Statutory / Legal Source",
        jurisdiction = { country: "India", state: "Central", applicableRegulator: "Statutory Authority" },
        content = "",
        fileName = "document.txt",
        mimeType = "text/plain",
        sourceUrl = "",
        statutoryReference = "",
        tags = [],
        summary = ""
      } = body;

      if (!title || !title.trim()) {
        return errorResponse(res, 400, "Document title is required");
      }

      // 1. Validation
      const fileSizeBytes = Buffer.byteLength(content, "utf8");
      const validation = validateFileHeader(fileName, mimeType, fileSizeBytes);
      if (!validation.valid) {
        return errorResponse(res, 400, validation.error);
      }

      // 2. Hash & Duplicate Detection
      const fileHash = computeFileHash(content);
      const existingDocs = await getAllDocumentsFromStore();
      const duplicate = existingDocs.find(
        d => !d.deleted && d.fileMetadata?.fileHashSha256 === fileHash
      );
      if (duplicate) {
        return errorResponse(res, 409, `Duplicate document detected (identical SHA-256 hash to ${duplicate.id} - "${duplicate.title}")`);
      }

      // 3. Extract Text & Sections
      const { fullText, sections } = extractTextAndSections(content, validation.extension, { title });

      // 4. Quality & Placeholder Analysis
      const qualityAnalysis = analyzeContentQuality(fullText, title);

      // Generate ID
      const seq = existingDocs.length + 1;
      const newId = `KN-${new Date().getFullYear()}-${String(seq).padStart(4, "0")}`;
      const recordId = `GOVENICS-${offering.slice(0, 3).toUpperCase()}-${newId}`;

      // 5. Sliding-Window Chunking
      const chunks = createDocumentChunks(newId, title, sections, { statutoryReference });

      const now = new Date().toISOString();
      const newDoc = {
        id: newId,
        recordId,
        title: title.trim(),
        enrichedTitle: (enrichedTitle || title).trim(),
        offering,
        industry,
        documentType,
        jurisdiction,
        fileMetadata: {
          originalFileName: fileName,
          fileExtension: validation.extension,
          mimeType,
          fileSizeBytes,
          fileHashSha256: fileHash,
          pageCount: sections.length
        },
        summary: summary || fullText.slice(0, 240) + "...",
        extractedTextSnippet: fullText.slice(0, 1000),
        chunkCount: chunks.length,
        chunks,
        trustState: qualityAnalysis.initialTrustState,
        approvalStatus: "Under Review",
        isEligibleForAiRetrieval: false, // Must be approved by admin first
        version: "v1.0",
        lastReviewedDate: now.split("T")[0],
        createdAt: now,
        updatedAt: now,
        processingStatus: "Content Review",
        tags: Array.isArray(tags) ? tags : [],
        externalSourceUrl: sourceUrl,
        statutoryReference
      };

      // Persist in Redis
      try {
        await redis.set(KEYS.knowledgeDoc(newId), JSON.stringify(newDoc));
        await redis.lpush(KEYS.knowledgeIndex(), newId);
        // Save chunks
        for (const c of chunks) {
          await redis.set(KEYS.knowledgeChunk(c.id), JSON.stringify(c));
          await redis.lpush(KEYS.knowledgeAllChunks(), c.id);
        }
      } catch (err) {
        console.warn("[knowledge/documents] Redis write fallback:", err.message);
      }

      return successResponse(res, {
        document: newDoc,
        qualityAnalysis,
        message: "Document successfully ingested, chunked, and queued for review."
      });
    }

    // ─── PUT /api/knowledge/documents/:id/approve ────────────────────────────
    if (req.method === "PUT" && docId && action === "approve") {
      const docs = await getAllDocumentsFromStore();
      const doc = docs.find(d => d.id === docId);
      if (!doc || doc.deleted) return errorResponse(res, 404, "Document not found");

      const body = req.body || {};
      const newTrustState = body.trustState || doc.trustState;
      const isEligible = AI_ELIGIBLE_TRUST_STATES.includes(newTrustState);

      const updated = {
        ...doc,
        approvalStatus: "Approved",
        trustState: newTrustState,
        isEligibleForAiRetrieval: isEligible,
        processingStatus: isEligible ? "Indexed" : "Approved",
        approvedBy: body.approvedBy || "Admin Reviewer",
        updatedAt: new Date().toISOString()
      };

      try {
        await redis.set(KEYS.knowledgeDoc(docId), JSON.stringify(updated));
      } catch (e) {
        console.warn("Redis update fallback:", e.message);
      }

      return successResponse(res, {
        document: updated,
        message: isEligible
          ? `Document approved and activated for AI Agent retrieval (${newTrustState})`
          : `Document approved, but trust state "${newTrustState}" remains excluded from AI retrieval`
      });
    }

    // ─── PUT /api/knowledge/documents/:id/reject ─────────────────────────────
    if (req.method === "PUT" && docId && action === "reject") {
      const docs = await getAllDocumentsFromStore();
      const doc = docs.find(d => d.id === docId);
      if (!doc || doc.deleted) return errorResponse(res, 404, "Document not found");

      const body = req.body || {};
      const updated = {
        ...doc,
        approvalStatus: "Rejected",
        trustState: "Rejected",
        isEligibleForAiRetrieval: false,
        processingStatus: "Rejected",
        processingError: body.reason || "Rejected by administrator review",
        updatedAt: new Date().toISOString()
      };

      try {
        await redis.set(KEYS.knowledgeDoc(docId), JSON.stringify(updated));
      } catch (e) {
        console.warn("Redis update fallback:", e.message);
      }

      return successResponse(res, { document: updated, message: "Document rejected and quarantined from AI retrieval." });
    }

    // ─── DELETE /api/knowledge/documents/:id ─────────────────────────────────
    if (req.method === "DELETE" && docId) {
      const docs = await getAllDocumentsFromStore();
      const doc = docs.find(d => d.id === docId);
      if (!doc) return errorResponse(res, 404, "Document not found");

      const deleted = {
        ...doc,
        deleted: true,
        isEligibleForAiRetrieval: false,
        processingStatus: "Archived",
        updatedAt: new Date().toISOString()
      };

      try {
        await redis.set(KEYS.knowledgeDoc(docId), JSON.stringify(deleted));
      } catch (e) {
        console.warn("Redis delete fallback:", e.message);
      }

      return successResponse(res, { message: `Document ${docId} archived successfully` });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[knowledge/documents] Unhandled error:", err);
    return errorResponse(res, 500, "Internal Knowledge Hub Error", { details: err.message });
  }
}


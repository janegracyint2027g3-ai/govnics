// api/knowledge/retrieve.js
// Phase 3 — Central Multi-Agent AI Knowledge Retrieval API
// Serves all 12 GOVENICS AI Agents with Hybrid Search & Source Grounding

import { redis, KEYS } from "../lib/redis.js";
import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getSeedDocuments, getAllSeedChunks } from "../lib/knowledge/seedDocuments.js";
import { executeHybridRetrieval } from "../lib/knowledge/retrievalEngine.js";
import { getAgentProfile } from "../lib/knowledge/agentProfiles.js";

// Helper to assemble active documents and chunks
async function loadSearchableCorpus() {
  const seedDocs = getSeedDocuments();
  const seedChunks = getAllSeedChunks();

  let redisDocs = [];
  let redisChunks = [];

  try {
    const docIds = await redis.lrange(KEYS.knowledgeIndex(), 0, -1);
    if (docIds && docIds.length > 0) {
      const promises = docIds.map(id => redis.get(KEYS.knowledgeDoc(id)));
      const raw = await Promise.all(promises);
      redisDocs = raw
        .map(d => (typeof d === "string" ? JSON.parse(d) : d))
        .filter(Boolean);

      // Load chunks
      const chunkIds = await redis.lrange(KEYS.knowledgeAllChunks(), 0, -1);
      if (chunkIds && chunkIds.length > 0) {
        const chunkPromises = chunkIds.map(cid => redis.get(KEYS.knowledgeChunk(cid)));
        const rawChunks = await Promise.all(chunkPromises);
        redisChunks = rawChunks
          .map(c => (typeof c === "string" ? JSON.parse(c) : c))
          .filter(Boolean);
      }
    }
  } catch (err) {
    console.warn("[knowledge/retrieve] Redis read fallback:", err.message);
  }

  // Deduplicate docs & chunks
  const docMap = new Map();
  for (const s of seedDocs) docMap.set(s.id, s);
  for (const r of redisDocs) docMap.set(r.id, r);

  const chunkMap = new Map();
  for (const sc of seedChunks) chunkMap.set(sc.id, sc);
  for (const rc of redisChunks) chunkMap.set(rc.id, rc);

  return {
    documents: Array.from(docMap.values()),
    chunks: Array.from(chunkMap.values())
  };
}

// ─── Answer Formatter with Citations & Grounding ──────────────────────────────
function generateGroundedAnswer(query, retrievalResult, agentProfile) {
  if (!retrievalResult.evidenceFound || retrievalResult.retrievedChunks.length === 0) {
    return {
      answer: retrievalResult.fallbackMessage ||
        "I could not locate sufficient verified information in the approved GOVENICS Knowledge Library to provide a reliable answer. This question requires additional source verification.",
      isRefusal: true
    };
  }

  const topChunks = retrievalResult.retrievedChunks;
  const primaryChunk = topChunks[0];
  const primaryDoc = retrievalResult.citations[0];

  // Distinguish statutory obligations from recommendations
  const isStatutory = primaryDoc.documentType === "Statutory / Legal Source";
  const obligationLabel = isStatutory ? "Mandatory Statutory Obligation" : "Regulatory Recommendation / Advisory Procedure";

  // Build grounded response synthesis
  let responseText = `Based on verified records in the **GOVENICS Knowledge Library** (${primaryDoc.trustState}):\n\n`;

  for (let i = 0; i < Math.min(topChunks.length, 2); i++) {
    const chunk = topChunks[i];
    // Strip header tags for smooth prose display
    const cleanContent = chunk.content.replace(/^\[Document:[^\]]+\]\s*/i, "").trim();
    responseText += `• **${chunk.sectionHeader || "Statutory Provision"}**: ${cleanContent}\n\n`;
  }

  responseText += `\n**Regulatory Classification:** ${obligationLabel}\n`;
  responseText += `**Applicable Regulator:** ${primaryDoc.regulator}\n`;
  responseText += `**Jurisdiction:** ${primaryDoc.jurisdiction}\n`;
  if (primaryDoc.effectiveDate) {
    responseText += `**Effective Baseline:** ${primaryDoc.effectiveDate}\n`;
  }

  return {
    answer: responseText,
    isRefusal: false
  };
}

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST" && req.method !== "GET") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const params = req.method === "POST" ? (req.body || {}) : Object.fromEntries(new URL(req.url, `http://${req.headers.host}`).searchParams);
    const {
      query,
      agentId = "agent-grc-general",
      offering,
      industry,
      documentType,
      jurisdiction,
      topK = 5
    } = params;

    if (!query || !query.trim()) {
      return errorResponse(res, 400, "Search query is required");
    }

    const agentProfile = getAgentProfile(agentId);
    if (!agentProfile.isActive) {
      return errorResponse(res, 403, `Agent profile "${agentId}" is currently inactive`);
    }

    // Load corpus
    const { documents, chunks } = await loadSearchableCorpus();

    // Execute Hybrid Retrieval (BM25 + Semantic Cosine + Strict Trust Gate)
    const retrievalResult = executeHybridRetrieval(documents, chunks, {
      query: query.trim(),
      agentId: agentProfile.agentId,
      offering,
      industry,
      documentType,
      jurisdiction,
      requireAiEligible: true, // STRICT TRUST GATE ENFORCED
      topK: parseInt(topK) || 5
    });

    // Synthesize grounded response
    const { answer, isRefusal } = generateGroundedAnswer(query, retrievalResult, agentProfile);

    // Audit log agent retrieval
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        agentId: agentProfile.agentId,
        query: query.slice(0, 100),
        confidenceScore: retrievalResult.confidenceScore,
        evidenceFound: retrievalResult.evidenceFound,
        citationsCount: retrievalResult.citations.length,
        isRefusal
      };
      await redis.lpush(KEYS.knowledgeAgentQueries(), JSON.stringify(logEntry));
      await redis.ltrim(KEYS.knowledgeAgentQueries(), 0, 999);
    } catch {}

    return successResponse(res, {
      agent: {
        id: agentProfile.agentId,
        name: agentProfile.agentName,
        role: agentProfile.roleTitle
      },
      query: retrievalResult.query,
      confidenceScore: retrievalResult.confidenceScore,
      evidenceFound: retrievalResult.evidenceFound,
      isRefusal,
      groundedAnswer: answer,
      citations: retrievalResult.citations,
      retrievedEvidence: retrievalResult.retrievedChunks,
      fallbackMessage: retrievalResult.fallbackMessage,
      processingTimeMs: retrievalResult.processingTimeMs
    });
  } catch (err) {
    console.error("[knowledge/retrieve] Error:", err);
    return errorResponse(res, 500, "Knowledge retrieval error", { details: err.message });
  }
}


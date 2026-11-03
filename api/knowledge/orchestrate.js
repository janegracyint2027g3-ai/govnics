// api/knowledge/orchestrate.js
// Phase 4 — Central Multi-Agent AI Orchestrator API
// Routes queries to 20 specialized/cross-functional agents with verified knowledge retrieval

import { redis, KEYS } from "../lib/redis.js";
import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getSeedDocuments, getAllSeedChunks } from "../lib/knowledge/seedDocuments.js";
import { orchestrateAgentRequest } from "../lib/knowledge/orchestrator.js";
import { checkRateLimit } from "../lib/auth.js";

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
    console.warn("[knowledge/orchestrate] Redis read fallback:", err.message);
  }

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

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`ai:orch:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 AI orchestration requests per minute.");
    }

    const { query, selectedAgentId, userContext } = req.body || {};

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return errorResponse(res, 400, "Query string is required.");
    }

    const corpus = await loadSearchableCorpus();
    const result = await orchestrateAgentRequest({
      query: query.trim(),
      selectedAgentId,
      userContext
    }, corpus);

    // Audit log orchestration
    try {
      const logEntry = {
        orchestrationId: result.orchestrationId,
        agentId: result.agent.agentId,
        query: result.query.slice(0, 200),
        intent: result.routing.intentDetected,
        confidence: result.routing.confidenceScore,
        citationsCount: result.citations.length,
        timestamp: new Date().toISOString()
      };
      await redis.lpush(KEYS.knowledgeAuditLog("system"), JSON.stringify(logEntry));
      await redis.ltrim(KEYS.knowledgeAuditLog("system"), 0, 199);
    } catch {
      // Non-blocking log write
    }

    return successResponse(res, result);
  } catch (err) {
    console.error("[knowledge/orchestrate] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


// api/knowledge/agents.js
// Phase 3 — Agent Profile Registry & Permission Directory

import { AGENT_PROFILES } from "../../_lib/knowledge/agentProfiles.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "GET") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const agentId = url.searchParams.get("agentId");

  if (agentId) {
    const agent = AGENT_PROFILES.find(a => a.agentId === agentId);
    if (!agent) return errorResponse(res, 404, "Agent profile not found");
    return successResponse(res, { agent });
  }

  return successResponse(res, {
    agents: AGENT_PROFILES,
    total: AGENT_PROFILES.length,
    activeCount: AGENT_PROFILES.filter(a => a.isActive).length
  });
}


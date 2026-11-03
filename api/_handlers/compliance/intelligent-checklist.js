// api/compliance/intelligent-checklist.js
// POST /api/compliance/intelligent-checklist — Generate 15-field statutory compliance checklist

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { generateIntelligentChecklist } from "../../_lib/compliance/intelligentChecklistService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`compliance:chk:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 checklist requests per minute.");
    }

    const profile = req.body || {};
    const checklist = generateIntelligentChecklist(profile);

    return successResponse(res, { checklist });
  } catch (err) {
    console.error("[compliance/intelligent-checklist] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


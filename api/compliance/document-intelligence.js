// api/compliance/document-intelligence.js
// POST /api/compliance/document-intelligence — Analyze compliance document and extract obligations

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { analyzeDocumentContent } from "../lib/compliance/documentIntelligenceService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`compliance:docintel:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 document intelligence requests per minute.");
    }

    const payload = req.body || {};
    const analysis = analyzeDocumentContent(payload);

    return successResponse(res, { analysis });
  } catch (err) {
    console.error("[compliance/document-intelligence] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


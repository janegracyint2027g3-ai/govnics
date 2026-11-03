// api/compliance/policies.js
// POST /api/compliance/policies — Generate guided corporate policy & SOP draft

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { generateStructuredPolicy } from "../lib/compliance/policyGeneratorService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`compliance:pol:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 policy requests per minute.");
    }

    const payload = req.body || {};
    const policy = generateStructuredPolicy(payload);

    return successResponse(res, { policy });
  } catch (err) {
    console.error("[compliance/policies] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


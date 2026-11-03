// api/compliance/gap-assessment.js
// POST /api/compliance/gap-assessment — Evaluate compliance gaps and calculate residual risk scores

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { executeGapAssessment } from "../../_lib/compliance/gapAssessmentService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`compliance:gap:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 gap assessment requests per minute.");
    }

    const payload = req.body || {};
    const report = executeGapAssessment(payload);

    return successResponse(res, { report });
  } catch (err) {
    console.error("[compliance/gap-assessment] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


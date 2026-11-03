// api/regulatory/applicability.js
// POST /api/regulatory/applicability — Map Central vs State applicability & retrieve amendments

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { mapCentralStateApplicability, getRegulatoryAmendments } from "../lib/regulatory/applicabilityAndAmendmentService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:app:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 requests per minute.");
    }

    if (req.method === "GET") {
      const { status } = req.query || {};
      const amendments = getRegulatoryAmendments(status);
      return successResponse(res, { amendments });
    }

    if (req.method === "POST") {
      const profile = req.body || {};
      const mapping = mapCentralStateApplicability(profile);
      return successResponse(res, { mapping });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/applicability] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


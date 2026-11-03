// api/_handlers/regulatory/coverage.js
// Handler for Comprehensive Central, 28 States, and 8 UTs Regulatory Coverage Matrix

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { RegulatoryCoverageService } from "../../_lib/regulatory/regulatoryCoverageService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers?.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:coverage:${clientIp}`, 60, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 60 requests per minute.");
    }

    if (req.method === "GET") {
      const report = await RegulatoryCoverageService.getComprehensiveCoverageReport();
      return successResponse(res, report);
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/coverage] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}

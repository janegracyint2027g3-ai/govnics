// api/reports/generate.js
// POST /api/reports/generate — Generate structured GRC reports from stored assessment data

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { generateStructuredReport, REPORT_TYPES } from "../lib/reports/reportGeneratorService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed. Use POST.");
  }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`rep:gen:${clientIp}`, 20, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 20 report generation requests per minute.");
    }

    const payload = req.body || {};
    const report = generateStructuredReport(payload);

    return successResponse(res, { report });
  } catch (err) {
    console.error("[reports/generate] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


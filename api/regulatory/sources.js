// api/regulatory/sources.js
// GET & POST /api/regulatory/sources — Retrieve official sources across Central, 28 States, and 8 UTs

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getAllSources, getSourcesByJurisdiction, getSourceById } from "../lib/regulatory/sourceRegistry.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:src:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 requests per minute.");
    }

    if (req.method === "GET") {
      const { jurisdiction, stateOrUt } = req.query || {};
      const sources = jurisdiction || stateOrUt
        ? getSourcesByJurisdiction(jurisdiction, stateOrUt)
        : getAllSources();

      return successResponse(res, {
        totalSources: sources.length,
        centralCount: sources.filter(s => s.jurisdictionLevel === "Central").length,
        stateCount: sources.filter(s => s.jurisdictionLevel === "State").length,
        utCount: sources.filter(s => s.jurisdictionLevel === "Union Territory").length,
        sources
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/sources] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


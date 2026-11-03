// api/regulatory/monitoring.js
// GET & PUT /api/regulatory/monitoring — Monitor official gazettes, retrieve updates, and approve changes

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getRegulatorySources, getRegulatoryUpdates, approveRegulatoryUpdate } from "../lib/regulatory/monitoringService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:mon:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 regulatory monitoring requests per minute.");
    }

    if (req.method === "GET") {
      const { status } = req.query || {};
      const sources = getRegulatorySources();
      const updates = getRegulatoryUpdates(status);
      return successResponse(res, { sources, updates });
    }

    if (req.method === "PUT") {
      const { updateId, reviewer } = req.body || {};
      if (!updateId) {
        return errorResponse(res, 400, "updateId is required for approval.");
      }
      const approved = approveRegulatoryUpdate(updateId, reviewer);
      if (!approved) {
        return errorResponse(res, 404, `Regulatory update ${updateId} not found.`);
      }
      return successResponse(res, {
        message: `Regulatory update ${updateId} approved and staged for Knowledge Hub synchronization.`,
        update: approved
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/monitoring] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


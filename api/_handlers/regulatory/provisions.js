// api/regulatory/provisions.js
// GET & POST /api/regulatory/provisions — Query section-level legal provisions across Central & State acts

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { getAllProvisions, getProvisionsByJurisdiction, getProvisionsByOffering, getProvisionById } from "../../_lib/regulatory/sectionExtractionService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:prv:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 requests per minute.");
    }

    if (req.method === "GET") {
      const { jurisdiction, state, offering, provisionId } = req.query || {};

      if (provisionId) {
        const item = getProvisionById(provisionId);
        if (!item) return errorResponse(res, 404, `Provision ${provisionId} not found.`);
        return successResponse(res, { provision: item });
      }

      let provisions = getAllProvisions();
      if (jurisdiction || state) {
        provisions = getProvisionsByJurisdiction(jurisdiction, state);
      } else if (offering) {
        provisions = getProvisionsByOffering(offering);
      }

      return successResponse(res, {
        totalProvisions: provisions.length,
        provisions
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/provisions] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


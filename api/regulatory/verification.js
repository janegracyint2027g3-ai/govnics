// api/regulatory/verification.js
// GET & POST /api/regulatory/verification — Legal review staging, approval & audit log

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getPendingProvisions, verifyAndApproveProvision, getVerificationAuditTrail } from "../lib/regulatory/verificationService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:ver:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded.");
    }

    if (req.method === "GET") {
      const pending = getPendingProvisions();
      const auditTrail = getVerificationAuditTrail();
      return successResponse(res, {
        pendingCount: pending.length,
        pendingProvisions: pending,
        auditTrail
      });
    }

    if (req.method === "POST") {
      const { provisionId, reviewerName, decision, notes } = req.body || {};
      if (!provisionId || !decision) {
        return errorResponse(res, 400, "provisionId and decision (Approved/Rejected/Needs Legal Review) are required.");
      }

      const result = verifyAndApproveProvision(provisionId, reviewerName, decision, notes);
      if (!result) {
        return errorResponse(res, 404, `Provision ${provisionId} not found.`);
      }

      return successResponse(res, {
        message: `Provision ${provisionId} review decision recorded as ${decision}.`,
        result
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/verification] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


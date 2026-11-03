// api/_handlers/regulatory/legal-review.js
// Handler for Human Legal Review & Approval Console

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { LegalReviewService } from "../../_lib/regulatory/legalReviewService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers?.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:review:${clientIp}`, 60, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 60 requests per minute.");
    }

    const url = new URL(req.url, `https://${req.headers?.host || "localhost"}`);
    const pathname = url.pathname;

    // GET /api/regulatory/legal-review/summary
    if (req.method === "GET" && pathname.endsWith("/summary")) {
      const summary = await LegalReviewService.getQueueSummary();
      return successResponse(res, { summary });
    }

    // GET /api/regulatory/legal-review?queue=queue:review:pending&page=1
    if (req.method === "GET") {
      const queueKey = url.searchParams.get("queue") || "queue:review:pending";
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const limit = parseInt(url.searchParams.get("limit") || "20", 10);

      const data = await LegalReviewService.getQueueRecords(queueKey, page, limit);
      return successResponse(res, data);
    }

    // POST /api/regulatory/legal-review — Submit reviewer action (APPROVE, REJECT, REQUEST_REPROCESSING, UPDATE_FIELDS)
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return errorResponse(res, 400, "Invalid JSON payload in request body.");
        }
      }

      if (!body?.recordId || !body?.currentQueue || !body?.action) {
        return errorResponse(res, 400, "Missing required review parameters: recordId, currentQueue, action.");
      }

      const result = await LegalReviewService.reviewRecordAction(body);
      return successResponse(res, result);
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/legal-review] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


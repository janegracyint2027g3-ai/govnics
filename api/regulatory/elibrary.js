// api/regulatory/elibrary.js
// GET /api/regulatory/elibrary — Retrieve professional offering E-Books and downloadable resources

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";
import { getOfferingEbooks, getEbookById } from "../lib/regulatory/elibraryContentService.js";
import { checkRateLimit } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`reg:elib:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 requests per minute.");
    }

    if (req.method === "GET") {
      const { offering, contentId } = req.query || {};

      if (contentId) {
        const item = getEbookById(contentId);
        if (!item) return errorResponse(res, 404, `E-Book ${contentId} not found.`);
        return successResponse(res, { ebook: item });
      }

      const ebooks = getOfferingEbooks(offering);
      return successResponse(res, {
        totalEbooks: ebooks.length,
        ebooks
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[regulatory/elibrary] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


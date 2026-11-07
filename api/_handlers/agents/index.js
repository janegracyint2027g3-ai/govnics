// api/_handlers/agents/index.js
// GOVENICS GRC — Content Extraction & Nurturing Agents Gateway API
// Exposes autonomous extraction, plain-English nurturing, and CMS staging.

import { ContentExtractionService } from "../../_lib/agents/contentExtractionService.js";
import { ContentNurturingService } from "../../_lib/agents/contentNurturingService.js";
import { setCorsHeaders, handleOptions } from "../../_lib/cors.js";

const extractor = new ContentExtractionService();
const nurturer = new ContentNurturingService();

function sendJson(res, statusCode, data) {
  if (!res.headersSent) {
    res.status(statusCode).json(data);
  }
}

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (handleOptions(req, res)) return;

  const rawUrl = req.url || "/";
  const parsed = new URL(rawUrl, `https://${req.headers?.host || "localhost"}`);
  const pathname = parsed.pathname.replace(/\/$/, "") || "/api/agents";
  const method = (req.method || "GET").toUpperCase();

  try {
    // ── 1. GET /api/agents/status ─────────────────────────────────────────────
    if (pathname === "/api/agents" || pathname === "/api/agents/status") {
      if (method !== "GET") return sendJson(res, 405, { error: "Method Not Allowed" });
      return sendJson(res, 200, {
        success: true,
        service: "GOVENICS Content Extraction & Nurturing Agents",
        version: "2.0",
        agents: [
          {
            name: "Content Extraction Agent",
            status: "ONLINE",
            capabilities: ["statutory_provisions", "penalties", "authorities", "forms", "canonical_schema"]
          },
          {
            name: "Content Nurturing Agent",
            status: "ONLINE",
            capabilities: ["executive_summaries", "compliance_checklists", "advisory_faqs", "wordpress_publishing", "linkedin_snippets"]
          }
        ]
      });
    }

    // ── 2. POST /api/agents/extract ───────────────────────────────────────────
    if (pathname === "/api/agents/extract") {
      if (method !== "POST") return sendJson(res, 405, { error: "Method Not Allowed" });
      const { text, title, hints } = req.body || {};

      if (!text || typeof text !== "string") {
        return sendJson(res, 400, { error: "Missing required 'text' string parameter in request body." });
      }

      const extracted = await extractor.extractFromText(text, title || "", hints || {});
      return sendJson(res, 200, {
        success: true,
        message: "Content extracted successfully.",
        data: extracted
      });
    }

    // ── 3. POST /api/agents/nurture ───────────────────────────────────────────
    if (pathname === "/api/agents/nurture") {
      if (method !== "POST") return sendJson(res, 405, { error: "Method Not Allowed" });
      const { extractedRecord, publishToCms = false } = req.body || {};

      if (!extractedRecord || !extractedRecord.content_id) {
        return sendJson(res, 400, { error: "Missing required 'extractedRecord' object with valid content_id." });
      }

      const asset = await nurturer.nurture(extractedRecord, { publishToCms });
      return sendJson(res, 200, {
        success: true,
        message: "Content nurtured successfully.",
        data: asset
      });
    }

    // ── 4. POST /api/agents/pipeline (Extract + Nurture in one flow) ──────────
    if (pathname === "/api/agents/pipeline") {
      if (method !== "POST") return sendJson(res, 405, { error: "Method Not Allowed" });
      const { text, title, hints, publishToCms = false } = req.body || {};

      if (!text || typeof text !== "string") {
        return sendJson(res, 400, { error: "Missing required 'text' string parameter." });
      }

      // Step 1: Extract
      const extracted = await extractor.extractFromText(text, title || "", hints || {});

      // Step 2: Nurture
      const asset = await nurturer.nurture(extracted, { publishToCms });

      return sendJson(res, 200, {
        success: true,
        message: "Pipeline completed: Content extracted and nurtured successfully.",
        extracted,
        nurtured: asset
      });
    }

    return sendJson(res, 404, { error: `Endpoint not found: ${pathname}` });
  } catch (err) {
    console.error("[Agents API Handler Error]:", err);
    return sendJson(res, 500, {
      success: false,
      error: "Internal error processing agents request.",
      details: err.message
    });
  }
}

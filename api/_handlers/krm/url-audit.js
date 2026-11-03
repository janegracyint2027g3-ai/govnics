// api/krm/url-audit.js
// Phase 2 — Statutory URL Accessibility Checker
// Checks whether Simpliance-hosted PDFs are still accessible.
// IMPORTANT: Does NOT download or store PDF content.
// Only performs HEAD requests to verify URL accessibility.
// Processes in controlled batches to avoid rate-limiting.

import { redis, KEYS } from "../../_lib/redis.js";

const BATCH_SIZE = 5;
const REQUEST_TIMEOUT_MS = 8000;
const DELAY_BETWEEN_BATCHES_MS = 500;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "GOVENICS-Phase2-Audit/1.0 (Accessibility check only)" },
    });
    clearTimeout(timeoutId);
    return {
      url,
      accessible: res.ok,
      statusCode: res.status,
      contentType: res.headers.get("content-type") || "",
      contentLength: res.headers.get("content-length") || "",
      checkedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      url,
      accessible: false,
      statusCode: null,
      contentType: "",
      contentLength: "",
      checkedAt: new Date().toISOString(),
      error: err.name === "AbortError" ? "Timeout" : err.message,
    };
  }
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  // GET /api/krm/url-audit — return last audit report from Redis
  if (req.method === "GET") {
    try {
      const report = await redis.get(KEYS.statutoryUrlMigrationLog());
      if (!report) {
        return jsonResponse({
          message: "No URL audit has been run yet. POST to this endpoint with { urls: [...] } to start.",
          lastRun: null,
          results: [],
        });
      }
      const parsed = typeof report === "string" ? JSON.parse(report) : report;
      return jsonResponse(parsed);
    } catch {
      return jsonResponse({ message: "URL audit report not available", results: [] });
    }
  }

  // POST /api/krm/url-audit — run audit on provided URLs (sample, not bulk)
  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const urls = body.urls;
    if (!Array.isArray(urls) || urls.length === 0) {
      return jsonResponse({ error: "Provide an array of URLs in { urls: [...] }" }, 400);
    }

    // Safety limit: max 20 URLs per request to prevent abuse
    const MAX_URLS = 20;
    const urlsToCheck = urls.slice(0, MAX_URLS);

    const results = [];
    // Process in batches
    for (let i = 0; i < urlsToCheck.length; i += BATCH_SIZE) {
      const batch = urlsToCheck.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.allSettled(batch.map(checkUrl));
      batchResults.forEach((r) => {
        if (r.status === "fulfilled") results.push(r.value);
        else results.push({ url: "", accessible: false, error: r.reason?.message || "Unknown error" });
      });
      if (i + BATCH_SIZE < urlsToCheck.length) {
        await delay(DELAY_BETWEEN_BATCHES_MS);
      }
    }

    const accessible = results.filter((r) => r.accessible).length;
    const broken = results.filter((r) => !r.accessible).length;

    const report = {
      auditedAt: new Date().toISOString(),
      totalChecked: results.length,
      accessible,
      broken,
      timeoutRate: `${((results.filter(r => r.error === "Timeout").length / results.length) * 100).toFixed(1)}%`,
      results,
      note: "HEAD requests only — no content downloaded. Copyrighted PDFs must not be downloaded without permission.",
    };

    // Save to Redis for retrieval
    try {
      await redis.set(KEYS.statutoryUrlMigrationLog(), JSON.stringify(report));
    } catch {
      // Non-fatal — return result even if Redis save fails
    }

    return jsonResponse(report);
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}


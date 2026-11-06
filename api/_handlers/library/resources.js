// api/_handlers/library/resources.js
// GOVENICS GRC — WordPress CMS E-Library API Gateway
// Implements:
// GET /api/library/ebooks
// GET /api/library/blogs
// GET /api/library/acts
// GET /api/library/regulations
// GET /api/library/guides
// GET /api/library/industry-reports
// GET /api/library/checklists
// GET /api/library/templates
// GET /api/library/search
// GET /api/library/resource?id=xyz

import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../../_lib/cors.js";
import { fetchWpLibraryResources, fetchWpLibraryResourceById, getWpCategories, invalidateWpCache } from "../../_lib/wordpress.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers?.origin);
  if (handleOptions(req, res)) return;

  const rawUrl = req.url || "/";
  const parsed = new URL(rawUrl, `https://${req.headers?.host || "localhost"}`);
  const pathname = parsed.pathname.replace(/\/$/, "");

  // Webhook / Sync endpoint for automatic WordPress content synchronization
  if (req.method === "POST" && (pathname === "/api/library/webhook" || pathname === "/api/library/sync")) {
    await invalidateWpCache();
    return successResponse(res, {
      message: "WordPress E-Library cache successfully invalidated and resynchronized.",
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== "GET") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const rawUrl = req.url || "/";
    const parsed = new URL(rawUrl, `https://${req.headers?.host || "localhost"}`);
    const pathname = parsed.pathname.replace(/\/$/, "");
    const query = Object.fromEntries(parsed.searchParams.entries());

    const {
      id,
      docId,
      q,
      search,
      offering,
      industry,
      page = "1",
      per_page = "12",
      perPage = "12",
      refresh
    } = query;

    const forceRefresh = refresh === "true" || refresh === "1";
    const requestedPage = parseInt(page, 10) || 1;
    const requestedPerPage = parseInt(per_page || perPage, 10) || 12;

    // ─── 1. Resource Detail Endpoint: /api/library/resource?id=xyz ────────────────
    if (pathname === "/api/library/resource" || pathname.startsWith("/api/library/resource/")) {
      const targetId = id || docId || pathname.split("/").pop();
      if (!targetId || targetId === "resource") {
        return errorResponse(res, 400, "Missing required resource 'id' parameter.");
      }

      const resource = await fetchWpLibraryResourceById(targetId);
      if (!resource) {
        return errorResponse(res, 404, `Resource with ID '${targetId}' not found in WordPress CMS.`);
      }

      return successResponse(res, {
        source: "WordPress CMS (https://cms.govenics.com)",
        resource
      });
    }

    // ─── 2. Categories Metadata Endpoint: /api/library/categories ─────────────────
    if (pathname === "/api/library/categories") {
      const categories = await getWpCategories();
      return successResponse(res, {
        source: "WordPress CMS",
        count: categories.length,
        categories: categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, count: c.count }))
      });
    }

    // ─── 3. Content Type Category Mapping ─────────────────────────────────────────
    const CATEGORY_MAP = {
      "/api/library/ebooks": "ebooks",
      "/api/library/blogs": "blogs",
      "/api/library/acts": "acts",
      "/api/library/regulations": "regulations",
      "/api/library/guides": "guides",
      "/api/library/industry-reports": "industry-reports",
      "/api/library/checklists": "checklists",
      "/api/library/templates": "templates",
      "/api/library/research": "research",
      "/api/library/notifications": "notifications",
      "/api/library/updates": "regulatory-updates"
    };

    let targetCategory = CATEGORY_MAP[pathname] || query.category || null;

    // Global search or unified library index
    const searchTerm = q || search || "";

    const data = await fetchWpLibraryResources({
      categorySlug: targetCategory,
      offering: offering && offering !== "All" ? offering : null,
      industry: industry && industry !== "All" ? industry : null,
      search: searchTerm,
      page: requestedPage,
      perPage: requestedPerPage,
      forceRefresh
    });

    return successResponse(res, {
      source: "WordPress CMS (https://cms.govenics.com)",
      category: targetCategory || "all",
      filters: {
        offering: offering || "All",
        industry: industry || "All",
        search: searchTerm || null
      },
      ...data
    });
  } catch (err) {
    console.error("[library/resources] Error:", err.message);
    return errorResponse(res, 500, `WordPress E-Library API Error: ${err.message}`);
  }
}

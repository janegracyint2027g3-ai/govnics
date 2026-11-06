// api/_lib/wordpress.js
// GOVENICS GRC — WordPress CMS E-Library REST API Client & Transformer
// Connects to https://cms.govenics.com/wp-json/wp/v2 with Basic Auth

import { redis, TTL } from "./redis.js";

const DEFAULT_WP_URL = "https://cms.govenics.com/wp-json/wp/v2";
const DEFAULT_USERNAME = "gracejane";
const DEFAULT_APP_PASS = "H1Pv OZk6 makj fefb OLk4 QWe4";

function getWpConfig() {
  const apiUrl = (process.env.WORDPRESS_API_URL || DEFAULT_WP_URL).replace(/\/$/, "");
  const username = process.env.WORDPRESS_USERNAME || DEFAULT_USERNAME;
  const rawPass = process.env.WORDPRESS_APP_PASSWORD || DEFAULT_APP_PASS;
  const appPass = rawPass.replace(/\s+/g, "");
  const authHeader = `Basic ${Buffer.from(`${username}:${appPass}`).toString("base64")}`;

  return {
    apiUrl,
    username,
    authHeader
  };
}

// In-memory cache for taxonomy IDs
let TAXONOMY_CACHE = {
  categories: null,
  tags: null,
  lastFetched: 0
};

// ─── 1. Taxonomy Discovery & Resolution ───────────────────────────────────────

export async function getWpCategories() {
  const now = Date.now();
  if (TAXONOMY_CACHE.categories && (now - TAXONOMY_CACHE.lastFetched < 300000)) {
    return TAXONOMY_CACHE.categories;
  }

  const { apiUrl, authHeader } = getWpConfig();
  try {
    const res = await fetch(`${apiUrl}/categories?per_page=100`, {
      headers: { Authorization: authHeader }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cats = await res.json();
    TAXONOMY_CACHE.categories = cats;
    TAXONOMY_CACHE.lastFetched = now;
    return cats;
  } catch (err) {
    console.error("[wordpress] Failed to fetch categories:", err.message);
    return TAXONOMY_CACHE.categories || [];
  }
}

export async function getWpTags() {
  const now = Date.now();
  if (TAXONOMY_CACHE.tags && (now - TAXONOMY_CACHE.lastFetched < 300000)) {
    return TAXONOMY_CACHE.tags;
  }

  const { apiUrl, authHeader } = getWpConfig();
  try {
    const res = await fetch(`${apiUrl}/tags?per_page=100`, {
      headers: { Authorization: authHeader }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const tags = await res.json();
    TAXONOMY_CACHE.tags = tags;
    TAXONOMY_CACHE.lastFetched = now;
    return tags;
  } catch (err) {
    console.error("[wordpress] Failed to fetch tags:", err.message);
    return TAXONOMY_CACHE.tags || [];
  }
}

// ─── 2. Data Transformation to Canonical E-Library Resource ───────────────────

function decodeHtmlEntities(str = "") {
  return str
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—");
}

function stripHtml(html = "") {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "").trim());
}

export function transformWpPostToResource(post) {
  if (!post) return null;

  const title = decodeHtmlEntities(post.title?.rendered || "Untitled Resource");
  const rawContent = post.content?.rendered || "";
  const excerpt = stripHtml(post.excerpt?.rendered || rawContent.slice(0, 200));

  // Extract embedded terms (categories & tags)
  const embeddedTerms = (post._embedded?.["wp:term"] || []).flat();
  const categoryTerms = embeddedTerms.filter(t => t.taxonomy === "category");
  const tagTerms = embeddedTerms.filter(t => t.taxonomy === "post_tag");

  const primaryCategory = categoryTerms[0]?.name || "Statutory Resource";
  const primaryCategorySlug = categoryTerms[0]?.slug || "general";

  // Match Offering and Industry from tags
  const KNOWN_OFFERINGS = [
    "Regulatory Compliance", "Labour & Employment", "Environmental & EHS",
    "Licensing & Permits", "Taxation & Trade", "Export & Trade Services",
    "Supply Chain Compliance", "Escrow Services", "Enterprise Governance",
    "Risk Management", "ESG & Sustainability", "Cybersecurity & Privacy"
  ];

  let matchedOffering = "";
  let matchedIndustry = "";

  for (const tag of tagTerms) {
    const cleanTagName = decodeHtmlEntities(tag.name);
    if (!matchedOffering && KNOWN_OFFERINGS.some(o => o.toLowerCase() === cleanTagName.toLowerCase())) {
      matchedOffering = cleanTagName;
    } else if (!matchedIndustry) {
      matchedIndustry = cleanTagName;
    }
  }

  // Author details
  const authorData = post._embedded?.author?.[0];
  const authorName = authorData?.name || "GOVENICS Editorial Board";

  // Featured Media
  const mediaData = post._embedded?.["wp:featuredmedia"]?.[0];
  const featuredImage = mediaData?.source_url || "";

  // Custom Metadata (supporting WP meta, ACF, or fallback embedded JSON)
  const meta = post.meta || post.acf || {};

  // Extract PDF or attachment URL
  let pdfUrl = meta.pdf_url || meta.pdf_attachment || "";
  if (!pdfUrl) {
    const pdfMatch = rawContent.match(/href="([^"]+\.pdf)"/i);
    if (pdfMatch) pdfUrl = pdfMatch[1];
  }

  // Extract Source URL
  let sourceUrl = meta.source_url || "";
  if (!sourceUrl) {
    const srcMatch = rawContent.match(/href="(https?:\/\/[^"]+)"/i);
    if (srcMatch && !srcMatch[1].endsWith(".pdf")) sourceUrl = srcMatch[1];
  }

  return {
    id: post.id,
    documentId: meta.document_id || `WP-DOC-${post.id}`,
    title,
    description: excerpt,
    content: rawContent,
    offering: meta.offering || matchedOffering || "Regulatory Compliance",
    industry: meta.industry || matchedIndustry || "Manufacturing & Industrial",
    country: meta.country || "India",
    state: meta.state || "Central",
    applicableAct: meta.applicable_act || "Statutory Framework",
    regulatoryAuthority: meta.regulatory_authority || "Ministry of Corporate Affairs / MoLE / MeitY",
    documentType: meta.document_type || primaryCategory,
    categorySlug: primaryCategorySlug,
    categories: categoryTerms.map(c => ({ id: c.id, name: decodeHtmlEntities(c.name), slug: c.slug })),
    tags: tagTerms.map(t => ({ id: t.id, name: decodeHtmlEntities(t.name), slug: t.slug })),
    publicationDate: post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "",
    effectiveDate: meta.effective_date || post.date?.split("T")[0] || "",
    lastUpdated: post.modified ? new Date(post.modified).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "",
    version: meta.version || "v1.0",
    author: authorName,
    sourceUrl: sourceUrl || "https://govenics.com",
    pdfUrl: pdfUrl || "",
    featuredImage,
    accessType: meta.access_type || "Public",
    status: post.status || "publish",
    slug: post.slug || `post-${post.id}`,
    link: `/sgrc/e-library?doc=${post.id}`
  };
}

// ─── 3. Query Execution & Cached Retrieval ────────────────────────────────────

/**
 * Fetch library resources with filtering, search, pagination, and caching.
 */
export async function fetchWpLibraryResources(options = {}) {
  const {
    categorySlug,
    offering,
    industry,
    search,
    page = 1,
    perPage = 20,
    forceRefresh = false
  } = options;

  const cacheKey = `wp:lib:${categorySlug || "all"}:${offering || "all"}:${industry || "all"}:${search || "all"}:${page}:${perPage}`;

  // 1. Check cache (unless forceRefresh)
  if (!forceRefresh) {
    try {
      if (redis?.get) {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return typeof cached === "string" ? JSON.parse(cached) : cached;
        }
      }
    } catch {
      // Ignore cache lookup failure
    }
  }

  const { apiUrl, authHeader } = getWpConfig();

  // Resolve category ID if categorySlug specified
  let categoryId = null;
  if (categorySlug && categorySlug !== "all") {
    const cats = await getWpCategories();
    const foundCat = cats.find(c => c.slug === categorySlug.toLowerCase() || c.name.toLowerCase() === categorySlug.toLowerCase());
    if (foundCat) categoryId = foundCat.id;
  }

  // Resolve Tag IDs for offering or industry
  const tagIds = [];
  if (offering && offering !== "all") {
    const tags = await getWpTags();
    const foundTag = tags.find(t => t.name.toLowerCase() === offering.toLowerCase());
    if (foundTag) tagIds.push(foundTag.id);
  }
  if (industry && industry !== "all") {
    const tags = await getWpTags();
    const foundTag = tags.find(t => t.name.toLowerCase() === industry.toLowerCase());
    if (foundTag) tagIds.push(foundTag.id);
  }

  // Construct WP REST query params
  const params = new URLSearchParams({
    _embed: "true",
    status: "publish",
    page: page.toString(),
    per_page: perPage.toString()
  });

  if (categoryId) params.append("categories", categoryId.toString());
  if (tagIds.length > 0) params.append("tags", tagIds.join(","));
  if (search) params.append("search", search);

  const endpointUrl = `${apiUrl}/posts?${params.toString()}`;

  try {
    const res = await fetch(endpointUrl, {
      headers: { Authorization: authHeader }
    });

    if (!res.ok) {
      if (res.status === 400 && page > 1) {
        // Requested page out of bounds
        return {
          total: 0,
          totalPages: 0,
          page,
          resources: []
        };
      }
      throw new Error(`WordPress API HTTP ${res.status}`);
    }

    const total = parseInt(res.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "0", 10);
    const posts = await res.json();

    const resources = posts.map(transformWpPostToResource);

    const result = {
      total,
      totalPages,
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
      count: resources.length,
      resources
    };

    // Cache for 5 minutes (300 seconds)
    try {
      if (redis?.setex) {
        await redis.setex(cacheKey, 300, JSON.stringify(result));
      }
    } catch {
      // Ignore cache write failure
    }

    return result;
  } catch (err) {
    console.error("[wordpress] Failed to fetch resources:", err.message);
    throw err;
  }
}

/**
 * Fetch a single resource by WordPress Post ID or Document ID.
 */
export async function fetchWpLibraryResourceById(id) {
  if (!id) return null;
  const { apiUrl, authHeader } = getWpConfig();

  try {
    const res = await fetch(`${apiUrl}/posts/${id}?_embed=true`, {
      headers: { Authorization: authHeader }
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`WordPress API HTTP ${res.status}`);
    }
    const post = await res.json();
    return transformWpPostToResource(post);
  } catch (err) {
    console.error(`[wordpress] Failed to fetch resource ${id}:`, err.message);
    return null;
  }
}

/**
 * Invalidate in-memory and Redis caches for WordPress content.
 */
export async function invalidateWpCache() {
  TAXONOMY_CACHE.categories = null;
  TAXONOMY_CACHE.tags = null;
  TAXONOMY_CACHE.lastFetched = 0;
  try {
    if (redis?.keys && redis?.del) {
      const keys = await redis.keys("wp:lib:*");
      if (keys && keys.length > 0) {
        for (const k of keys) {
          await redis.del(k);
        }
      }
    }
  } catch {
    // Ignore Redis error
  }
}

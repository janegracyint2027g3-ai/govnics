// api/regulatory/industry.js
// Phase 5 — Industry-Specific Regulatory Knowledge Collections API
// Returns structured compliance taxonomies for all 18 industry sectors

import { getAllIndustryCollections, getIndustryBySlug } from "../lib/regulatory/industryKnowledgeService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const { slug, search } = req.query || {};

  if (slug) {
    const item = getIndustryBySlug(slug);
    if (!item) {
      return res.status(404).json({ error: `Industry sector '${slug}' not found.` });
    }
    return res.status(200).json({ success: true, data: item });
  }

  let collections = getAllIndustryCollections();

  if (search) {
    const term = search.toLowerCase();
    collections = collections.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.centralActs.some(a => a.toLowerCase().includes(term)) ||
      c.primaryRegulators.some(r => r.toLowerCase().includes(term))
    );
  }

  return res.status(200).json({
    success: true,
    totalIndustries: collections.length,
    data: collections
  });
}


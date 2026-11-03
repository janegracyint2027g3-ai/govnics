// api/integrations/analytics.js
// Phase 7.7 & 7.8 — Executive Analytics & Scheduled Reporting API

import { getExecutiveAnalyticsSnapshot, generateScheduledExecutiveReport } from "../lib/integrations/analyticsService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed. Use GET." });

  try {
    const { orgId, report, period } = req.query || {};

    if (report === "true") {
      const generated = await generateScheduledExecutiveReport(orgId, period || "Monthly");
      return res.status(200).json({ success: true, data: generated });
    }

    const snapshot = await getExecutiveAnalyticsSnapshot(orgId);
    return res.status(200).json({ success: true, data: snapshot });
  } catch (err) {
    return res.status(500).json({ error: "Failed to compile executive analytics", details: err.message });
  }
}


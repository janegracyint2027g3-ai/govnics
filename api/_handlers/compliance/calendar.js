// api/compliance/calendar.js
// Phase 6.3 — Compliance Calendar and Deadline Management API

import { getComplianceCalendarEvents } from "../../_lib/compliance/complianceCalendarService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed. Use GET." });

  try {
    const { orgId, month, year, department, offering } = req.query || {};
    const calendar = await getComplianceCalendarEvents(orgId, { month, year, department, offering });
    return res.status(200).json({ success: true, ...calendar });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch calendar", details: err.message });
  }
}


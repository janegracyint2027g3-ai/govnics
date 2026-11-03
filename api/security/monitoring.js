// api/security/monitoring.js
// Phase 9.8 — Continuous Regulatory Monitoring Feed API

import { getContinuousMonitoringFeed, triggerRegulatoryScan } from "../lib/security/continuousIntelligenceService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const feed = getContinuousMonitoringFeed();
    return res.status(200).json({ success: true, count: feed.length, data: feed });
  }

  if (req.method === "POST") {
    const scan = triggerRegulatoryScan();
    return res.status(200).json({ success: true, message: "Continuous regulatory scan executed.", data: scan });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


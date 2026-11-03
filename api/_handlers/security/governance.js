// api/security/governance.js
// Phase 9.5 & 9.6 — AI Agent Governance & Quality Metrics API

import { getAiGovernanceRegistry, getAiQualityMetrics, sanitizeUserInput } from "../../_lib/security/aiGovernanceService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { metrics } = req.query || {};
    if (metrics === "true") {
      const qm = getAiQualityMetrics();
      return res.status(200).json({ success: true, data: qm });
    }
    const registry = getAiGovernanceRegistry();
    return res.status(200).json({ success: true, count: registry.length, data: registry });
  }

  if (req.method === "POST") {
    const { input } = req.body || {};
    const check = sanitizeUserInput(input);
    return res.status(200).json({ success: true, data: check });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


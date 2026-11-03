// api/compliance/escalations.js
// Phase 6.9 — SLA and Escalation Engine API Handler

import { evaluateOrganizationEscalations } from "../lib/compliance/slaEscalationService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed. Use GET." });

  try {
    const orgId = req.query?.orgId || "ORG-GOVENICS-DEMO";
    const report = await evaluateOrganizationEscalations(orgId);
    return res.status(200).json({ success: true, ...report });
  } catch (err) {
    return res.status(500).json({ error: "Failed to evaluate escalations", details: err.message });
  }
}


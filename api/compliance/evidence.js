// api/compliance/evidence.js
// Phase 6.6 — Evidence and Document Management API

import { getEvidenceByOrg, submitEvidence, reviewEvidence } from "../lib/compliance/evidenceManagementService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { category, status, linkedObligationId } = req.query || {};
    const evidence = await getEvidenceByOrg(orgId, { category, status, linkedObligationId });
    return res.status(200).json({ success: true, count: evidence.length, data: evidence });
  }

  if (req.method === "POST") {
    try {
      const evidenceData = req.body || {};
      if (!evidenceData.title || !evidenceData.category) {
        return res.status(400).json({ error: "Missing required fields: title and category." });
      }
      const created = await submitEvidence({ ...evidenceData, orgId });
      return res.status(201).json({ success: true, message: "Evidence submitted.", data: created });
    } catch (err) {
      return res.status(500).json({ error: "Failed to submit evidence", details: err.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { evidenceId, decision, reviewerName, comments } = req.body || {};
      if (!evidenceId || !decision) {
        return res.status(400).json({ error: "evidenceId and decision ('Approved' | 'Rejected') are required." });
      }
      const reviewed = await reviewEvidence(evidenceId, decision, reviewerName, comments);
      return res.status(200).json({ success: true, message: `Evidence marked as ${decision}.`, data: reviewed });
    } catch (err) {
      return res.status(500).json({ error: "Failed to review evidence", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}


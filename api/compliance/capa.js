// api/compliance/capa.js
// Phase 6.8 — Corrective and Preventive Action (CAPA) API

import { getCapaRecordsByOrg, createCapaRecord, closeCapaRecord } from "../lib/compliance/capaManagementService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { status, actionOwner } = req.query || {};
    const records = await getCapaRecordsByOrg(orgId, { status, actionOwner });
    return res.status(200).json({ success: true, count: records.length, data: records });
  }

  if (req.method === "POST") {
    try {
      const capaData = req.body || {};
      if (!capaData.title || !capaData.actionOwner) {
        return res.status(400).json({ error: "Missing required fields: title and actionOwner." });
      }
      const created = await createCapaRecord({ ...capaData, orgId });
      return res.status(201).json({ success: true, message: "CAPA record created.", data: created });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create CAPA", details: err.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { capaId, verifiedBy, closureNotes } = req.body || {};
      if (!capaId) return res.status(400).json({ error: "capaId is required." });
      const closed = await closeCapaRecord(capaId, verifiedBy, closureNotes);
      return res.status(200).json({ success: true, message: "CAPA verified and closed.", data: closed });
    } catch (err) {
      return res.status(500).json({ error: "Failed to close CAPA", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}


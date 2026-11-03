// api/compliance/register.js
// Phase 6.1 — Compliance Register & Obligations API Handler

import {
  getComplianceRegister,
  getComplianceObligationById,
  saveComplianceObligation,
  deleteComplianceObligation,
  calculateOrganizationComplianceMetrics
} from "../../_lib/compliance/complianceRegisterService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { id, metrics } = req.query || {};

    if (id) {
      const item = await getComplianceObligationById(id);
      if (!item) return res.status(404).json({ error: `Obligation '${id}' not found.` });
      return res.status(200).json({ success: true, data: item });
    }

    if (metrics === "true") {
      const summary = await calculateOrganizationComplianceMetrics(orgId);
      return res.status(200).json({ success: true, data: summary });
    }

    const list = await getComplianceRegister(orgId);
    return res.status(200).json({
      success: true,
      orgId,
      count: list.length,
      data: list
    });
  }

  if (req.method === "POST") {
    try {
      const obligationData = req.body || {};
      if (!obligationData.requirementTitle || !obligationData.actName) {
        return res.status(400).json({ error: "Missing required fields: requirementTitle and actName." });
      }

      const complianceId = obligationData.complianceId || `OBL-2026-${Date.now().toString().slice(-4)}`;
      const saved = await saveComplianceObligation({
        ...obligationData,
        complianceId,
        orgId
      });

      return res.status(201).json({
        success: true,
        message: "Compliance obligation saved successfully.",
        data: saved
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to save obligation", details: err.message });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: "Obligation ID is required." });
    await deleteComplianceObligation(id, orgId);
    return res.status(200).json({ success: true, message: `Obligation ${id} deleted.` });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


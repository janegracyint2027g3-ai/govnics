// api/compliance/audits.js
// Phase 6.5 — Enterprise Audit Management API

import { getAuditsByOrg, createAudit, generateAuditReport } from "../../_lib/compliance/enterpriseAuditService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { auditId, report, auditType, status } = req.query || {};

    if (auditId && report === "true") {
      try {
        const reportData = await generateAuditReport(auditId);
        return res.status(200).json({ success: true, data: reportData });
      } catch (err) {
        return res.status(404).json({ error: err.message });
      }
    }

    const audits = await getAuditsByOrg(orgId, { auditType, status });
    return res.status(200).json({ success: true, count: audits.length, data: audits });
  }

  if (req.method === "POST") {
    try {
      const auditData = req.body || {};
      if (!auditData.auditTitle || !auditData.auditType) {
        return res.status(400).json({ error: "Missing required fields: auditTitle and auditType." });
      }
      const created = await createAudit({ ...auditData, orgId });
      return res.status(201).json({ success: true, message: "Audit created.", data: created });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create audit", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}


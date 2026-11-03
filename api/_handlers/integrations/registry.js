// api/integrations/registry.js
// Phase 7.1 & 7.2 — Integration Registry & Sync API

import { getIntegrations, updateIntegrationStatus, triggerIntegrationSync } from "../../_lib/integrations/integrationRegistryService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const list = await getIntegrations(orgId);
    return res.status(200).json({ success: true, count: list.length, data: list });
  }

  if (req.method === "POST") {
    const { integrationId, action } = req.body || {};
    if (!integrationId) return res.status(400).json({ error: "integrationId is required." });

    if (action === "sync") {
      try {
        const syncResult = await triggerIntegrationSync(integrationId, orgId);
        return res.status(200).json({ success: true, message: "Sync executed.", data: syncResult });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }

    if (action === "toggle") {
      const { status } = req.body || {};
      const updated = await updateIntegrationStatus(integrationId, status || "Connected");
      return res.status(200).json({ success: true, message: "Integration status updated.", data: updated });
    }

    return res.status(400).json({ error: "Unknown action. Use 'sync' or 'toggle'." });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


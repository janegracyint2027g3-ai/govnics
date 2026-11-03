// api/integrations/webhooks.js
// Phase 7.5 — Enterprise Webhook Management API

import { getWebhooksByOrg, registerWebhook, dispatchWebhookEvent, getDeliveryLogs } from "../lib/integrations/webhookService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { logs } = req.query || {};
    if (logs === "true") {
      const history = getDeliveryLogs(orgId);
      return res.status(200).json({ success: true, count: history.length, data: history });
    }

    const hooks = await getWebhooksByOrg(orgId);
    return res.status(200).json({ success: true, count: hooks.length, data: hooks });
  }

  if (req.method === "POST") {
    const { action, targetUrl, subscribedEvents, eventType, eventData } = req.body || {};

    if (action === "test-dispatch") {
      const dis = await dispatchWebhookEvent(eventType || "compliance.task.overdue", eventData || { test: true }, orgId);
      return res.status(200).json({ success: true, message: "Webhook test dispatch triggered.", data: dis });
    }

    if (!targetUrl) return res.status(400).json({ error: "targetUrl is required." });
    const created = await registerWebhook({ targetUrl, subscribedEvents, orgId });
    return res.status(201).json({ success: true, message: "Webhook registered.", data: created });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


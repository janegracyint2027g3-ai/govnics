// api/integrations/apikeys.js
// Phase 7.4 — API Key Management API

import { generateApiKey, getApiKeysByOrg, revokeApiKey, getApiUsageAnalytics } from "../lib/integrations/apiManagementService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { analytics } = req.query || {};
    if (analytics === "true") {
      const stats = getApiUsageAnalytics();
      return res.status(200).json({ success: true, data: stats });
    }

    const keys = getApiKeysByOrg(orgId);
    return res.status(200).json({ success: true, count: keys.length, data: keys });
  }

  if (req.method === "POST") {
    const { name, scopes } = req.body || {};
    const created = generateApiKey(orgId, name, scopes);
    return res.status(201).json({
      success: true,
      message: "API Key created. Store this key securely; it will not be shown again in plaintext.",
      apiKey: created.apiKey,
      data: created.record
    });
  }

  if (req.method === "DELETE") {
    const { keyId } = req.query || {};
    if (!keyId) return res.status(400).json({ error: "keyId is required." });
    const revoked = revokeApiKey(keyId);
    if (!revoked) return res.status(404).json({ error: "Key not found." });
    return res.status(200).json({ success: true, message: `API Key ${keyId} revoked.` });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


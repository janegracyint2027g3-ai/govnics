// api/portals/customer.js
// Phase 8.1 & 8.2 — Customer Portal & Multi-Tenant Organization API

import { getCustomerOrganization, registerCustomerOrganization, inviteOrganizationMember } from "../../_lib/portals/customerService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const customer = await getCustomerOrganization(orgId);
    if (!customer) return res.status(404).json({ error: `Organization '${orgId}' not found.` });
    return res.status(200).json({ success: true, data: customer });
  }

  if (req.method === "POST") {
    const { action, organizationName, email, role } = req.body || {};

    if (action === "invite") {
      if (!email) return res.status(400).json({ error: "Email is required." });
      try {
        const invite = await inviteOrganizationMember(orgId, email, role);
        return res.status(200).json({ success: true, message: "Invitation sent.", data: invite });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }

    if (!organizationName) return res.status(400).json({ error: "organizationName is required." });
    const created = await registerCustomerOrganization(req.body);
    return res.status(201).json({ success: true, message: "Organization registered.", data: created });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


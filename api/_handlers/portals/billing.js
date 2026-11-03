// api/portals/billing.js
// Phase 8.4 — Subscription & Billing Sandbox API

import { getSubscriptionPlans, getCustomerInvoices, createSandboxCheckout } from "../../_lib/portals/billingService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { invoices } = req.query || {};
    if (invoices === "true") {
      const invList = getCustomerInvoices(orgId);
      return res.status(200).json({ success: true, count: invList.length, data: invList });
    }
    const plans = getSubscriptionPlans();
    return res.status(200).json({ success: true, count: plans.length, data: plans });
  }

  if (req.method === "POST") {
    const { planId, billingCycle } = req.body || {};
    if (!planId) return res.status(400).json({ error: "planId is required." });
    const result = createSandboxCheckout(orgId, planId, billingCycle || "Annual");
    return res.status(200).json(result);
  }

  return res.status(405).json({ error: "Method not allowed." });
}


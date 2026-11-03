// api/portals/leads.js
// Phase 8.5 — Lead-to-Customer Lifecycle & Partner Management API

import { getLeadsList, createLeadEnquiry, getPartnersList } from "../../_lib/portals/leadLifecycleService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { partners } = req.query || {};
    if (partners === "true") {
      const pList = getPartnersList();
      return res.status(200).json({ success: true, count: pList.length, data: pList });
    }
    const leads = getLeadsList();
    return res.status(200).json({ success: true, count: leads.length, data: leads });
  }

  if (req.method === "POST") {
    const { companyName, email, contactName } = req.body || {};
    if (!companyName || !email) return res.status(400).json({ error: "companyName and email are required." });
    const created = createLeadEnquiry(req.body);
    return res.status(201).json({ success: true, message: "Enquiry submitted.", data: created });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


// api/portals/consultant.js
// Phase 8.3 — Consultant Portal API

import { getAllConsultants, getConsultantById, logConsultantTimesheet } from "../../_lib/portals/consultantService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { consultantId } = req.query || {};
    if (consultantId) {
      const c = getConsultantById(consultantId);
      if (!c) return res.status(404).json({ error: "Consultant not found." });
      return res.status(200).json({ success: true, data: c });
    }
    const all = getAllConsultants();
    return res.status(200).json({ success: true, count: all.length, data: all });
  }

  if (req.method === "POST") {
    const { consultantId, hours, description, clientOrg, date } = req.body || {};
    if (!consultantId || !hours) return res.status(400).json({ error: "consultantId and hours are required." });
    try {
      const logged = logConsultantTimesheet(consultantId, { hours, description, clientOrg, date });
      return res.status(201).json({ success: true, message: "Timesheet logged.", data: logged });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}


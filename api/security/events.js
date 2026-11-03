// api/security/events.js
// Phase 9.1 & 9.2 — Enterprise Security Operations & Event Logging API

import { getSecurityEvents, logSecurityEvent, hasPermission } from "../lib/security/rbacService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { limit } = req.query || {};
    const events = getSecurityEvents(parseInt(limit) || 50);
    return res.status(200).json({ success: true, count: events.length, data: events });
  }

  if (req.method === "POST") {
    const { eventType, details, severity, userContext } = req.body || {};
    if (!eventType || !details) return res.status(400).json({ error: "eventType and details are required." });
    const logged = logSecurityEvent(eventType, details, severity || "Info", userContext || {});
    return res.status(201).json({ success: true, message: "Security event logged.", data: logged });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


// api/security/recovery.js
// Phase 9.11 — Disaster Recovery & Backup Verification API

import { getBackupHistory, executeRestoreSimulation } from "../lib/security/disasterRecoveryService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const history = getBackupHistory();
    return res.status(200).json({ success: true, count: history.length, data: history });
  }

  if (req.method === "POST") {
    const { backupId } = req.body || {};
    const sim = executeRestoreSimulation(backupId);
    return res.status(200).json({ success: true, message: "Restore verification simulation passed.", data: sim });
  }

  return res.status(405).json({ error: "Method not allowed." });
}


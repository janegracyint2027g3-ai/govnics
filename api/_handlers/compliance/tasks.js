// api/compliance/tasks.js
// Phase 6.4 — Enterprise Tasks & Workflow API

import { getTasksByOrg, createTask, updateTaskStatus } from "../../_lib/compliance/enterpriseTaskService.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  const orgId = req.query?.orgId || req.body?.orgId || "ORG-GOVENICS-DEMO";

  if (req.method === "GET") {
    const { status, department, taskType } = req.query || {};
    const tasks = await getTasksByOrg(orgId, { status, department, taskType });
    return res.status(200).json({ success: true, count: tasks.length, data: tasks });
  }

  if (req.method === "POST") {
    try {
      const taskData = req.body || {};
      if (!taskData.title || !taskData.assignedTo) {
        return res.status(400).json({ error: "Missing required fields: title and assignedTo." });
      }
      const created = await createTask({ ...taskData, orgId });
      return res.status(201).json({ success: true, message: "Task created successfully.", data: created });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create task", details: err.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { taskId, status, notes, userEmail } = req.body || {};
      if (!taskId || !status) {
        return res.status(400).json({ error: "taskId and status are required." });
      }
      const updated = await updateTaskStatus(taskId, status, userEmail, notes);
      if (!updated) return res.status(404).json({ error: `Task '${taskId}' not found.` });
      return res.status(200).json({ success: true, message: "Task status updated.", data: updated });
    } catch (err) {
      return res.status(500).json({ error: "Failed to update task", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}


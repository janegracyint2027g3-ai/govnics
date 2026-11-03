// api/lib/compliance/enterpriseTaskService.js
// Phase 6.4 — Enterprise Task & Workflow Management
// 9 Task Types, 9 Statuses, departmental assignment, dependencies, comments, and history.

import { redis, KEYS } from "../redis.js";

let IN_MEMORY_TASKS = new Map();

export const TASK_TYPES = [
  "Compliance actions",
  "Regulatory reviews",
  "Audit findings",
  "Evidence requests",
  "Document approvals",
  "Licence renewals",
  "Policy updates",
  "Risk mitigation",
  "Corrective actions"
];

export const TASK_STATUSES = [
  "Open",
  "Assigned",
  "In Progress",
  "Pending Evidence",
  "Pending Review",
  "Pending Approval",
  "Completed",
  "Overdue",
  "Cancelled"
];

const SEED_TASKS = [
  {
    taskId: "TSK-2026-001",
    orgId: "ORG-GOVENICS-DEMO",
    taskType: "Compliance actions",
    title: "Deploy Automated CMP Consent Banner on Customer Portals",
    description: "Install and test granular cookie and personal data consent logging per DPDP Act Section 6.",
    assignedTo: "ciso@acme-ind.com",
    department: "Information Security (IT/SOC)",
    dueDate: "2026-11-20",
    priority: "Critical",
    status: "In Progress",
    dependencies: [],
    comments: [
      { author: "Chief Privacy Officer", timestamp: "2026-10-18T10:00:00Z", message: "Ensure withdrawal mechanism matches opt-in granularity." }
    ],
    history: [
      { action: "Created", timestamp: "2026-10-15T09:00:00Z", actor: "System" },
      { action: "Assigned to ciso@acme-ind.com", timestamp: "2026-10-15T09:30:00Z", actor: "Admin" }
    ],
    createdAt: "2026-10-15T09:00:00Z",
    updatedAt: "2026-10-18T10:00:00Z"
  },
  {
    taskId: "TSK-2026-002",
    orgId: "ORG-GOVENICS-DEMO",
    taskType: "Licence renewals",
    title: "Renew Maharashtra Factory Licence Form 4",
    description: "Submit online renewal application for Pune manufacturing unit to DISH Maharashtra before December 31.",
    assignedTo: "ehs.lead@acme-ind.com",
    department: "Health, Safety & Environment (HSE)",
    dueDate: "2026-12-15",
    priority: "High",
    status: "Assigned",
    dependencies: [],
    comments: [],
    history: [
      { action: "Created", timestamp: "2026-10-12T14:00:00Z", actor: "Compliance Manager" }
    ],
    createdAt: "2026-10-12T14:00:00Z",
    updatedAt: "2026-10-12T14:00:00Z"
  },
  {
    taskId: "TSK-2026-003",
    orgId: "ORG-GOVENICS-DEMO",
    taskType: "Document approvals",
    title: "Sign-off on Internal POSH Committee Annual Report",
    description: "Review and approve POSH IC Annual Return for submission to the Pune District Collector Officer.",
    assignedTo: "compliance@acme-ind.com",
    department: "Legal & Secretarial",
    dueDate: "2026-11-15",
    priority: "High",
    status: "Pending Review",
    dependencies: ["TSK-2026-001"],
    comments: [],
    history: [
      { action: "Created", timestamp: "2026-10-25T11:00:00Z", actor: "HR Lead" }
    ],
    createdAt: "2026-10-25T11:00:00Z",
    updatedAt: "2026-10-25T11:00:00Z"
  }
];

for (const t of SEED_TASKS) {
  IN_MEMORY_TASKS.set(t.taskId, t);
}

export async function getTasksByOrg(orgId, filter = {}) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  const map = new Map();
  if (targetOrg === "ORG-GOVENICS-DEMO") {
    for (const t of SEED_TASKS) map.set(t.taskId, t);
  }
  try {
    const ids = await redis.smembers(KEYS.tasksList(targetOrg));
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const raw = await redis.get(KEYS.taskItem(id));
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          map.set(parsed.taskId, parsed);
        }
      }
    }
  } catch {}
  for (const [id, t] of IN_MEMORY_TASKS.entries()) {
    if (t.orgId === targetOrg) map.set(id, t);
  }
  return applyTaskFilters(Array.from(map.values()), filter);
}

function applyTaskFilters(tasks, filter) {
  let res = tasks;
  if (filter.status) {
    res = res.filter(t => t.status.toLowerCase() === filter.status.toLowerCase());
  }
  if (filter.department) {
    res = res.filter(t => t.department?.toLowerCase() === filter.department.toLowerCase());
  }
  if (filter.taskType) {
    res = res.filter(t => t.taskType?.toLowerCase() === filter.taskType.toLowerCase());
  }
  return res;
}

export async function createTask(taskData) {
  const taskId = taskData.taskId || `TSK-2026-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const record = {
    ...taskData,
    taskId,
    orgId: taskData.orgId || "ORG-GOVENICS-DEMO",
    status: taskData.status || "Open",
    comments: taskData.comments || [],
    history: [
      ...(taskData.history || []),
      { action: "Created task", timestamp: now, actor: taskData.createdBy || "System" }
    ],
    createdAt: now,
    updatedAt: now
  };

  IN_MEMORY_TASKS.set(taskId, record);

  try {
    await redis.set(KEYS.taskItem(taskId), JSON.stringify(record));
    await redis.sadd(KEYS.tasksList(record.orgId), taskId);
  } catch {}

  return record;
}

export async function updateTaskStatus(taskId, status, userEmail, notes) {
  const task = IN_MEMORY_TASKS.get(taskId);
  if (!task) return null;

  task.status = status;
  task.updatedAt = new Date().toISOString();
  task.history.push({
    action: `Status updated to ${status}`,
    timestamp: task.updatedAt,
    actor: userEmail || "Authorized User",
    notes: notes || ""
  });

  IN_MEMORY_TASKS.set(taskId, task);

  try {
    await redis.set(KEYS.taskItem(taskId), JSON.stringify(task));
  } catch {}

  return task;
}

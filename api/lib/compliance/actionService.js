// api/lib/compliance/actionService.js
// Phase 4 — GOVENICS AI-Powered Action Plan & Task Management
// Manages corrective action lifecycle from gap detection to evidence-backed closure

export const ACTION_STATUSES = [
  "Open",
  "Assigned",
  "In Progress",
  "Pending Evidence",
  "Pending Review",
  "Completed",
  "Overdue",
  "Cancelled"
];

let ACTIONS_STORE = [
  {
    actionId: "ACT-2026-0001",
    assessmentId: "ASSESS-2026-01",
    requirementReference: "STAT-EPF-001",
    identifiedGap: "Missing monthly ECR contribution challan for contractor workforce.",
    recommendedAction: "Audit contractor monthly PF deposit receipts and obtain ECR challans prior to invoice clearance.",
    priority: "High",
    responsibleDepartment: "Human Resources",
    assignedUser: "compliance.officer@govenics.com",
    targetDate: "2026-11-20",
    currentStatus: "In Progress",
    completionEvidence: null,
    reviewer: "Senior HR Auditor",
    closureDate: null
  },
  {
    actionId: "ACT-2026-0002",
    assessmentId: "ASSESS-2026-01",
    requirementReference: "GOVENICS-CYB-ACT-0001",
    identifiedGap: "Absence of formalized data breach escalation protocol under DPDP Act Section 8(6).",
    recommendedAction: "Draft, approve, and test a 6-hour CERT-In and DPBI intimation drill with Information Security team.",
    priority: "Critical",
    responsibleDepartment: "Information Technology & Security",
    assignedUser: "ciso@govenics.com",
    targetDate: "2026-11-15",
    currentStatus: "Pending Review",
    completionEvidence: "https://storage.govenics.com/evidence/dpdp_breach_sop_signed.pdf",
    reviewer: "Chief Privacy Counsel",
    closureDate: null
  },
  {
    actionId: "ACT-2026-0003",
    assessmentId: "ASSESS-2026-01",
    requirementReference: "STAT-EHS-040B",
    identifiedGap: "Factory unit operating with 1,200 workers without certified DGFASLI Safety Officer.",
    recommendedAction: "Execute appointment letter for certified Safety Officer and notify State Inspectorate of Factories.",
    priority: "Critical",
    responsibleDepartment: "Health, Safety & Environment (HSE)",
    assignedUser: "plant.director@govenics.com",
    targetDate: "2026-11-30",
    currentStatus: "Assigned",
    completionEvidence: null,
    reviewer: "EHS Audit Director",
    closureDate: null
  }
];

export function getActionsList(statusFilter = "All") {
  if (!statusFilter || statusFilter === "All") return ACTIONS_STORE;
  return ACTIONS_STORE.filter(a => a.currentStatus === statusFilter);
}

export function updateActionItem(actionId, updates) {
  const action = ACTIONS_STORE.find(a => a.actionId === actionId);
  if (!action) return null;

  if (updates.currentStatus && ACTION_STATUSES.includes(updates.currentStatus)) {
    action.currentStatus = updates.currentStatus;
    if (updates.currentStatus === "Completed") {
      action.closureDate = new Date().toISOString().split("T")[0];
    }
  }
  if (updates.assignedUser) action.assignedUser = updates.assignedUser;
  if (updates.targetDate) action.targetDate = updates.targetDate;
  if (updates.completionEvidence) action.completionEvidence = updates.completionEvidence;
  if (updates.reviewer) action.reviewer = updates.reviewer;

  return action;
}

export function createBulkActions(items) {
  const created = [];
  for (const item of items) {
    const newAction = {
      actionId: `ACT-2026-${String(ACTIONS_STORE.length + 1).padStart(4, "0")}`,
      assessmentId: item.assessmentId || `ASSESS-${Date.now()}`,
      requirementReference: item.requirementId || "STAT-GEN",
      identifiedGap: item.gapTitle || item.gapCategory || "Identified Compliance Deficiency",
      recommendedAction: item.recommendedAction || "Execute corrective remediation.",
      priority: item.priority || "Medium",
      responsibleDepartment: item.department || "Compliance",
      assignedUser: item.assignedUser || "unassigned",
      targetDate: item.targetDate || "2026-12-31",
      currentStatus: "Open",
      completionEvidence: null,
      reviewer: null,
      closureDate: null
    };
    ACTIONS_STORE.push(newAction);
    created.push(newAction);
  }
  return created;
}


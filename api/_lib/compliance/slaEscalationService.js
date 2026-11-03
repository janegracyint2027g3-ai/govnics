// api/lib/compliance/slaEscalationService.js
// Phase 6.9 — SLA and Escalation Engine
// Configurable 4-tier escalation rules for approaching deadlines, overdue obligations, and pending evidence.

import { getComplianceRegister } from "./complianceRegisterService.js";
import { getTasksByOrg } from "./enterpriseTaskService.js";
import { getCapaRecordsByOrg } from "./capaManagementService.js";

export const ESCALATION_LEVELS = [
  "Reminder",
  "Warning",
  "Manager escalation",
  "Executive escalation"
];

export async function evaluateOrganizationEscalations(orgId) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  const now = new Date();

  const obligations = await getComplianceRegister(targetOrg);
  const tasks = await getTasksByOrg(targetOrg);
  const capas = await getCapaRecordsByOrg(targetOrg);

  const activeEscalations = [];

  // 1. Evaluate Compliance Obligations
  for (const ob of obligations) {
    if (ob.currentStatus === "Compliant" || !ob.dueDate) continue;

    const due = new Date(ob.dueDate);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // Overdue
      const daysOverdue = Math.abs(diffDays);
      const level = daysOverdue >= 5 ? "Executive escalation" : "Manager escalation";
      activeEscalations.push({
        escalationId: `ESC-OBL-${ob.complianceId}`,
        entityType: "Compliance Obligation",
        referenceId: ob.complianceId,
        title: ob.requirementTitle,
        dueDate: ob.dueDate,
        diffDays,
        escalationLevel: level,
        escalationReason: `Obligation is ${daysOverdue} days overdue.`,
        assignedOwner: ob.assignedOwner,
        escalateTo: level === "Executive escalation" ? "Chief Executive & General Counsel" : "Department Head",
        status: "Action Required"
      });
    } else if (diffDays <= 2) {
      activeEscalations.push({
        escalationId: `ESC-OBL-${ob.complianceId}`,
        entityType: "Compliance Obligation",
        referenceId: ob.complianceId,
        title: ob.requirementTitle,
        dueDate: ob.dueDate,
        diffDays,
        escalationLevel: "Warning",
        escalationReason: `Due in ${diffDays} day(s). Final warning before management escalation.`,
        assignedOwner: ob.assignedOwner,
        escalateTo: ob.assignedOwner,
        status: "Approaching Deadline"
      });
    } else if (diffDays <= 7) {
      activeEscalations.push({
        escalationId: `ESC-OBL-${ob.complianceId}`,
        entityType: "Compliance Obligation",
        referenceId: ob.complianceId,
        title: ob.requirementTitle,
        dueDate: ob.dueDate,
        diffDays,
        escalationLevel: "Reminder",
        escalationReason: `Upcoming compliance obligation due in ${diffDays} days.`,
        assignedOwner: ob.assignedOwner,
        escalateTo: ob.assignedOwner,
        status: "Reminder Sent"
      });
    }
  }

  // 2. Evaluate Overdue Tasks
  for (const task of tasks) {
    if (task.status === "Completed" || !task.dueDate) continue;
    const due = new Date(task.dueDate);
    if (due < now) {
      activeEscalations.push({
        escalationId: `ESC-TSK-${task.taskId}`,
        entityType: "Workflow Task",
        referenceId: task.taskId,
        title: task.title,
        dueDate: task.dueDate,
        escalationLevel: "Manager escalation",
        escalationReason: `Task '${task.title}' is past its due date without completion.`,
        assignedOwner: task.assignedTo,
        escalateTo: "Operations Manager",
        status: "Task Overdue"
      });
    }
  }

  // 3. Evaluate Delayed CAPA Records
  for (const capa of capas) {
    if (capa.status === "Closed" || !capa.dueDate) continue;
    const due = new Date(capa.dueDate);
    if (due < now) {
      activeEscalations.push({
        escalationId: `ESC-CAPA-${capa.capaId}`,
        entityType: "CAPA Finding",
        referenceId: capa.capaId,
        title: capa.title,
        dueDate: capa.dueDate,
        escalationLevel: "Executive escalation",
        escalationReason: `Audit corrective action is overdue. Non-conformance risk elevated.`,
        assignedOwner: capa.actionOwner,
        escalateTo: "Audit Committee & Head of Quality",
        status: "CAPA Delayed"
      });
    }
  }

  return {
    orgId: targetOrg,
    totalEscalations: activeEscalations.length,
    remindersCount: activeEscalations.filter(e => e.escalationLevel === "Reminder").length,
    warningsCount: activeEscalations.filter(e => e.escalationLevel === "Warning").length,
    managerEscalationsCount: activeEscalations.filter(e => e.escalationLevel === "Manager escalation").length,
    executiveEscalationsCount: activeEscalations.filter(e => e.escalationLevel === "Executive escalation").length,
    escalations: activeEscalations
  };
}


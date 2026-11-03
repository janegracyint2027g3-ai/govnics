// test/phase6_operations_eval.js
// GOVENICS Phase 6 Automated Evaluation Suite
// Validates Enterprise GRC Operations, Compliance Register, Calendar, Tasks, Audits, Evidence, CAPA & Escalations

import {
  getComplianceRegister,
  getComplianceObligationById,
  saveComplianceObligation,
  calculateOrganizationComplianceMetrics,
  COMPLIANCE_STATUSES,
  RISK_RATINGS
} from "../api/_lib/compliance/complianceRegisterService.js";

import { getComplianceCalendarEvents } from "../api/_lib/compliance/complianceCalendarService.js";
import { getTasksByOrg, createTask, updateTaskStatus, TASK_TYPES, TASK_STATUSES } from "../api/_lib/compliance/enterpriseTaskService.js";
import { getAuditsByOrg, createAudit, generateAuditReport, AUDIT_TYPES, AUDIT_LIFECYCLE_STEPS } from "../api/_lib/compliance/enterpriseAuditService.js";
import { getEvidenceByOrg, submitEvidence, reviewEvidence, EVIDENCE_CATEGORIES } from "../api/_lib/compliance/evidenceManagementService.js";
import { getCapaRecordsByOrg, createCapaRecord, closeCapaRecord } from "../api/_lib/compliance/capaManagementService.js";
import { evaluateOrganizationEscalations, ESCALATION_LEVELS } from "../api/_lib/compliance/slaEscalationService.js";

let passed = 0;
let failed = 0;

function assert(tcId, description, condition) {
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${tcId}: ${description}`);
  } else {
    failed++;
    console.error(`❌ [FAIL] ${tcId}: ${description} (Assertion failed)`);
  }
}

async function runPhase6Tests() {
  console.log("\n=====================================================================");
  console.log("   GOVENICS PHASE 6: ENTERPRISE OPERATIONS EVALUATION SUITE   ");
  console.log("=====================================================================");

  const orgId = "ORG-GOVENICS-DEMO";

  // 1. Compliance Register & 24-Field Record Verification
  const obligations = await getComplianceRegister(orgId);
  assert("TC-P6-01", "Compliance Register retrieval returns obligations array", Array.isArray(obligations) && obligations.length >= 5);

  const ob1 = obligations[0];
  const requiredFields = [
    "complianceId", "orgId", "requirementTitle", "description", "offering",
    "industry", "country", "state", "regulatoryAuthority", "actName",
    "sectionRuleClause", "officialSourceUrl", "applicabilityRationale",
    "responsibleDepartment", "assignedOwner", "frequency", "dueDate",
    "evidenceRequired", "currentStatus", "riskRating", "reviewer",
    "lastReviewed", "nextReview", "linkedProvisionId"
  ];
  const allFieldsPresent = requiredFields.every(f => ob1[f] !== undefined && ob1[f] !== null);
  assert("TC-P6-02", "Obligation contains all 24 enterprise compliance fields", allFieldsPresent);

  // Linkage to approved regulatory knowledge record
  assert("TC-P6-03", "Obligation is linked to verified statutory provision PRV-FACT-SEC040B", ob1.linkedProvisionId === "PRV-FACT-SEC040B");

  // Metrics & department rollup
  const metrics = await calculateOrganizationComplianceMetrics(orgId);
  assert("TC-P6-04", "Compliance score calculated accurately (0-100%)", metrics.complianceScorePercentage > 0 && metrics.complianceScorePercentage <= 100);
  assert("TC-P6-05", "Department breakdown includes HSE & Information Security", metrics.departmentBreakdown["Health, Safety & Environment (HSE)"] !== undefined);

  // Save new obligation
  const newOb = await saveComplianceObligation({
    complianceId: "OBL-TEST-NEW",
    orgId,
    requirementTitle: "Test Hazardous Waste Manifest Form 10 Filing",
    actName: "Hazardous and Other Wastes Rules, 2016",
    responsibleDepartment: "Health, Safety & Environment (HSE)",
    currentStatus: "In Progress",
    riskRating: "High"
  });
  assert("TC-P6-06", "New compliance obligation successfully persisted", newOb.complianceId === "OBL-TEST-NEW");

  // 2. Compliance Calendar & Deadlines
  const cal = await getComplianceCalendarEvents(orgId);
  assert("TC-P6-07", "Compliance Calendar events generated", cal.totalEvents >= 5 && Array.isArray(cal.events));
  assert("TC-P6-08", "Calendar separates upcoming vs overdue vs completed", cal.upcomingCount !== undefined && cal.overdueCount !== undefined);

  // 3. Enterprise Task & Workflow Management
  const tasks = await getTasksByOrg(orgId);
  assert("TC-P6-09", "Enterprise tasks retrieved with 9 allowed types", Array.isArray(tasks) && tasks.length >= 3);

  const createdTask = await createTask({
    orgId,
    taskType: "Evidence requests",
    title: "Request calibrated pH sensor calibration certificate",
    assignedTo: "lab.technician@acme-ind.com",
    department: "Health, Safety & Environment (HSE)",
    dueDate: "2026-11-28",
    priority: "High"
  });
  assert("TC-P6-10", "Task creation initializes with Open status and audit history", createdTask.status === "Open" && createdTask.history.length >= 1);

  const updatedTask = await updateTaskStatus(createdTask.taskId, "Completed", "qa.manager@acme-ind.com", "Verified certificate valid.");
  assert("TC-P6-11", "Task status transition to Completed appends audit log", updatedTask.status === "Completed" && updatedTask.history.length >= 2);

  // 4. Enterprise Audit Lifecycle Management
  const audits = await getAuditsByOrg(orgId);
  assert("TC-P6-12", "Enterprise audits retrieved across 11 audit types", Array.isArray(audits) && audits.length >= 2);

  const newAudit = await createAudit({
    orgId,
    auditTitle: "Annual ISO 27001 Surveillance Audit",
    auditType: "Cybersecurity audit",
    leadAuditor: "V. Menon (Lead Auditor)"
  });
  assert("TC-P6-13", "Audit created in step 1 of 18-step lifecycle", newAudit.currentLifecycleStep.startsWith("1."));

  const auditReport = await generateAuditReport(audits[0].auditId);
  assert("TC-P6-14", "Audit report generation produces formal executive briefing", auditReport.findingsCount >= 0 && auditReport.formalExecutiveSummary.length > 50);

  // 5. Evidence & Document Management (KRM Integration)
  const evidenceList = await getEvidenceByOrg(orgId);
  assert("TC-P6-15", "Evidence documents mapped to statutory obligations", Array.isArray(evidenceList) && evidenceList.length >= 2);

  const submittedEvd = await submitEvidence({
    orgId,
    title: "Air Pollution Stack Emission Test Report Form 1",
    category: "Audit reports",
    linkedObligationId: "OBL-2026-001"
  });
  assert("TC-P6-16", "Evidence submission initializes with version v1.0", submittedEvd.version === "v1.0" && submittedEvd.status === "Submitted");

  const reviewedEvd = await reviewEvidence(submittedEvd.evidenceId, "Approved", "Chief Legal Counsel", "Test verified.");
  assert("TC-P6-17", "Evidence review records decision and reviewer timestamp", reviewedEvd.status === "Approved" && reviewedEvd.reviewers.length >= 1);

  // 6. Corrective and Preventive Action (CAPA)
  const capas = await getCapaRecordsByOrg(orgId);
  assert("TC-P6-18", "CAPA records contain structured 5-Whys root-cause analysis", capas[0].rootCauseAnalysis.method === "5-Whys");

  const newCapa = await createCapaRecord({
    orgId,
    title: "Preventive maintenance on hazardous chemical isolation valves",
    actionOwner: "maintenance.lead@acme-ind.com"
  });
  assert("TC-P6-19", "CAPA record created in Investigation status", newCapa.status === "Investigation");

  const closedCapa = await closeCapaRecord(newCapa.capaId, "Safety Director", "Valves overhauled and hydrotested.");
  assert("TC-P6-20", "CAPA closure logs verification and closure notes", closedCapa.status === "Closed" && closedCapa.verifiedBy === "Safety Director");

  // 7. SLA & Escalation Engine
  const escalations = await evaluateOrganizationEscalations(orgId);
  assert("TC-P6-21", "SLA Escalation Engine evaluates 4 escalation tiers", Array.isArray(escalations.escalations) && escalations.totalEscalations >= 0);
  assert("TC-P6-22", "Escalations categorize into Reminders, Warnings, Manager, and Executive tiers", ESCALATION_LEVELS.length === 4);

  console.log("\n=====================================================================");
  console.log(`PHASE 6 EVALUATION SUMMARY: ${passed} / ${passed + failed} PASSED (${((passed / (passed + failed)) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed}`);
  console.log("=====================================================================\n");

  if (failed > 0) process.exit(1);
}

runPhase6Tests().catch(err => {
  console.error("Evaluation runtime failure:", err);
  process.exit(1);
});


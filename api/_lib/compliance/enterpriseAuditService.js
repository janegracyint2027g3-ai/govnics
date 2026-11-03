// api/lib/compliance/enterpriseAuditService.js
// Phase 6.5 — Enterprise Audit Management System
// 11 Audit Types, 18-Step Full Lifecycle, Findings, Risk Levels, and Report Generation

import { redis, KEYS } from "../redis.js";

let IN_MEMORY_AUDITS = new Map();

export const AUDIT_TYPES = [
  "Internal compliance audit",
  "Regulatory audit",
  "Labour compliance audit",
  "Environmental and EHS audit",
  "Factory compliance audit",
  "Tax and trade audit",
  "Corporate governance audit",
  "ESG audit",
  "Cybersecurity audit",
  "Vendor and supplier audit",
  "Process audit"
];

export const AUDIT_LIFECYCLE_STEPS = [
  "1. Create audit",
  "2. Select organization",
  "3. Define audit scope",
  "4. Select jurisdiction",
  "5. Select industry",
  "6. Select applicable requirements",
  "7. Assign auditors",
  "8. Generate audit programme",
  "9. Generate checklists",
  "10. Request evidence",
  "11. Conduct audit",
  "12. Record observations",
  "13. Identify findings",
  "14. Assign risk levels",
  "15. Create corrective actions",
  "16. Conduct management review",
  "17. Verify closure",
  "18. Generate final report"
];

const SEED_AUDITS = [
  {
    auditId: "AUD-2026-001",
    orgId: "ORG-GOVENICS-DEMO",
    auditTitle: "Q4 Statutory Labour & Factory Safety Compliance Audit",
    auditType: "Factory compliance audit",
    scope: "Pune Manufacturing Unit - Workforce registers, Safety Officers, and DISH renewals",
    auditPeriod: "FY 2026-27 Q3-Q4",
    jurisdiction: "Maharashtra / India (Central)",
    leadAuditor: "Senior Industrial Counsel R. Deshmukh (Bar No. MAH/1820/2005)",
    auditTeam: ["R. Deshmukh (Lead)", "K. Sharma (EHS Auditor)", "M. Iyer (Secretarial)"],
    applicableRequirements: ["OBL-2026-001", "OBL-2026-005"],
    currentLifecycleStep: "16. Conduct management review",
    status: "Under Review",
    riskRating: "Medium",
    findings: [
      {
        findingId: "FND-001",
        title: "Contractor ECR PF verification delayed by 45 days",
        severity: "High",
        requirementRef: "Social Security Code / EPF Act",
        observation: "Third-party manpower agency did not submit Form 12A / ECR bank scrolls for October billing.",
        recommendedCapa: "Withhold contract agency monthly invoice clearance until ECR receipt verification is confirmed."
      },
      {
        findingId: "FND-002",
        title: "Secondary ETP continuous pH meter calibration overdue",
        severity: "Medium",
        requirementRef: "Water Act S.25 / MPCB Consent",
        observation: "Calibration log in ETP plant missing technician signature for past 60 days.",
        recommendedCapa: "Conduct immediate sensor recalibration and log in certified digital register."
      }
    ],
    correctiveActionIds: ["ACT-2026-0001", "ACT-2026-0003"],
    approvalStatus: "Approved by Head of Compliance",
    closureDate: null,
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-25T14:00:00Z"
  },
  {
    auditId: "AUD-2026-002",
    orgId: "ORG-GOVENICS-DEMO",
    auditTitle: "Annual Cybersecurity & DPDP Act Data Fiduciary Readiness Audit",
    auditType: "Cybersecurity audit",
    scope: "Enterprise ERP, customer CRM databases, and workforce HRMS endpoints",
    auditPeriod: "FY 2026-27 Annual",
    jurisdiction: "India (Central)",
    leadAuditor: "CERT-In Certified Lead Auditor V. Menon",
    auditTeam: ["V. Menon (Lead)", "S. Rao (VAPT Lead)"],
    applicableRequirements: ["OBL-2026-002"],
    currentLifecycleStep: "18. Generate final report",
    status: "Closed",
    riskRating: "Low",
    findings: [],
    correctiveActionIds: ["ACT-2026-0002"],
    approvalStatus: "Final Report Published",
    closureDate: "2026-10-28T18:00:00Z",
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-10-28T18:00:00Z"
  }
];

for (const a of SEED_AUDITS) {
  IN_MEMORY_AUDITS.set(a.auditId, a);
}

export async function getAuditsByOrg(orgId, filter = {}) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  const map = new Map();
  if (targetOrg === "ORG-GOVENICS-DEMO") {
    for (const a of SEED_AUDITS) map.set(a.auditId, a);
  }
  try {
    const ids = await redis.smembers(KEYS.auditsList(targetOrg));
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const raw = await redis.get(KEYS.auditItem(id));
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          map.set(parsed.auditId, parsed);
        }
      }
    }
  } catch {}
  for (const [id, a] of IN_MEMORY_AUDITS.entries()) {
    if (a.orgId === targetOrg) map.set(id, a);
  }
  return applyAuditFilters(Array.from(map.values()), filter);
}

function applyAuditFilters(audits, filter) {
  let res = audits;
  if (filter.auditType) {
    res = res.filter(a => a.auditType.toLowerCase() === filter.auditType.toLowerCase());
  }
  if (filter.status) {
    res = res.filter(a => a.status.toLowerCase() === filter.status.toLowerCase());
  }
  return res;
}

export async function createAudit(auditData) {
  const auditId = auditData.auditId || `AUD-2026-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const record = {
    ...auditData,
    auditId,
    orgId: auditData.orgId || "ORG-GOVENICS-DEMO",
    currentLifecycleStep: auditData.currentLifecycleStep || "1. Create audit",
    status: auditData.status || "Planning",
    findings: auditData.findings || [],
    correctiveActionIds: auditData.correctiveActionIds || [],
    createdAt: now,
    updatedAt: now
  };

  IN_MEMORY_AUDITS.set(auditId, record);

  try {
    await redis.set(KEYS.auditItem(auditId), JSON.stringify(record));
    await redis.sadd(KEYS.auditsList(record.orgId), auditId);
  } catch {}

  return record;
}

export async function generateAuditReport(auditId) {
  let audit = IN_MEMORY_AUDITS.get(auditId);
  if (!audit) {
    try {
      const raw = await redis.get(KEYS.auditItem(auditId));
      if (raw) audit = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch {}
  }
  if (!audit) {
    // Check seed audits
    audit = SEED_AUDITS.find(a => a.auditId === auditId);
  }
  if (!audit) throw new Error(`Audit '${auditId}' not found.`);

  return {
    reportId: `RPT-${auditId}`,
    generatedAt: new Date().toISOString(),
    auditTitle: audit.auditTitle,
    auditType: audit.auditType,
    orgId: audit.orgId,
    leadAuditor: audit.leadAuditor,
    auditPeriod: audit.auditPeriod,
    jurisdiction: audit.jurisdiction,
    findingsCount: audit.findings.length,
    findings: audit.findings,
    riskRating: audit.riskRating,
    lifecycleStatus: audit.currentLifecycleStep,
    formalExecutiveSummary: `This statutory audit was conducted in compliance with approved regulatory standards. ${audit.findings.length} findings were recorded, of which ${audit.findings.filter(f => f.severity === "High" || f.severity === "Critical").length} require priority corrective actions.`
  };
}

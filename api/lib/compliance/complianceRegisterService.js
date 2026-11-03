// api/lib/compliance/complianceRegisterService.js
// Phase 6.1 — Enterprise Compliance Management System
// Implements 24-field compliance obligations, organization compliance profile,
// department-wise accountability, and statutory linkage to Phase 5 structured provisions.

import { redis, KEYS } from "../redis.js";
import { getAllProvisions } from "../regulatory/sectionExtractionService.js";

// In-memory fallback cache for development or disconnected states
let IN_MEMORY_OBLIGATIONS = new Map();

export const COMPLIANCE_STATUSES = [
  "Compliant",
  "Partially Compliant",
  "Non-Compliant",
  "In Progress",
  "Pending Review",
  "Overdue"
];

export const RISK_RATINGS = ["Critical", "High", "Medium", "Low"];

export const RECURRENCE_FREQUENCIES = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Half-yearly",
  "Annual",
  "Event-driven",
  "One-time"
];

// Seed 24-field compliance obligations for Acme Industrial Technologies Ltd (ORG-GOVENICS-DEMO)
const SEED_OBLIGATIONS = [
  {
    complianceId: "OBL-2026-001",
    orgId: "ORG-GOVENICS-DEMO",
    requirementTitle: "Mandatory Certified Safety Officer Appointment",
    description: "Appoint certified Safety Officers holding an MSBTE or state-approved Industrial Safety diploma in factories with >=500 workers in Maharashtra and >=1000 workers centrally.",
    offering: "environmental-ehs",
    industry: "Manufacturing & Industrial",
    country: "India",
    state: "Maharashtra",
    regulatoryAuthority: "Directorate of Industrial Safety and Health (DISH) · Maharashtra",
    actName: "The Factories Act, 1948 & Maharashtra Factories Rules, 1963",
    sectionRuleClause: "Section 40-B & Rule 68",
    officialSourceUrl: "https://labour.gov.in/sites/default/files/Factories_Act.pdf",
    applicabilityRationale: "Manufacturing plant in Pune employs 1,250 workers, exceeding both the Central (1,000) and Maharashtra state (500) thresholds.",
    responsibleDepartment: "Health, Safety & Environment (HSE)",
    assignedOwner: "ehs.lead@acme-ind.com",
    frequency: "Annual",
    dueDate: "2026-12-31",
    evidenceRequired: [
      "Factory Licence (Form 2)",
      "Safety Officer appointment letter",
      "MSBTE qualification certificate",
      "Monthly safety audit reports"
    ],
    currentStatus: "Compliant",
    riskRating: "Critical",
    reviewer: "Senior Factory Inspector",
    lastReviewed: "2026-10-15",
    nextReview: "2027-04-15",
    linkedProvisionId: "PRV-FACT-SEC040B",
    createdDate: "2026-01-15T10:00:00Z",
    updatedDate: "2026-10-15T14:30:00Z"
  },
  {
    complianceId: "OBL-2026-002",
    orgId: "ORG-GOVENICS-DEMO",
    requirementTitle: "DPDP Act Consent Management & Breach Protocol",
    description: "Deploy clear, granular consent architecture for customer and workforce data. Maintain operational 6-hour data breach notification readiness to the Data Protection Board.",
    offering: "cybersecurity-data",
    industry: "Manufacturing & Industrial",
    country: "India",
    state: "Central",
    regulatoryAuthority: "Data Protection Board of India (DPBI) · MeitY",
    actName: "Digital Personal Data Protection Act, 2023",
    sectionRuleClause: "Section 6 & Section 8(6)",
    officialSourceUrl: "https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf",
    applicabilityRationale: "Processes employee, vendor, and prospective customer personal data across multi-state digital operations.",
    responsibleDepartment: "Information Security (IT/SOC)",
    assignedOwner: "ciso@acme-ind.com",
    frequency: "Event-driven",
    dueDate: "2026-11-30",
    evidenceRequired: [
      "Consent Management Platform audit logs",
      "Data Principal notice version history",
      "Breach response simulation drill sign-off"
    ],
    currentStatus: "In Progress",
    riskRating: "Critical",
    reviewer: "Chief Privacy Officer",
    lastReviewed: "2026-10-20",
    nextReview: "2026-11-20",
    linkedProvisionId: "PRV-DPDP-SEC006",
    createdDate: "2026-01-15T10:00:00Z",
    updatedDate: "2026-10-20T11:00:00Z"
  },
  {
    complianceId: "OBL-2026-003",
    orgId: "ORG-GOVENICS-DEMO",
    requirementTitle: "Annual Financial Statement ROC Filing (Form AOC-4)",
    description: "Adopted financial statements must be filed with the Registrar of Companies within 30 days of the Annual General Meeting to avoid statutory daily late fees.",
    offering: "enterprise-governance",
    industry: "Manufacturing & Industrial",
    country: "India",
    state: "Central",
    regulatoryAuthority: "Ministry of Corporate Affairs (MCA)",
    actName: "The Companies Act, 2013",
    sectionRuleClause: "Section 137",
    officialSourceUrl: "https://www.mca.gov.in/",
    applicabilityRationale: "Mandatory corporate secretarial filing for all active Indian companies registered under Companies Act.",
    responsibleDepartment: "Legal & Secretarial",
    assignedOwner: "compliance@acme-ind.com",
    frequency: "Annual",
    dueDate: "2026-10-30",
    evidenceRequired: [
      "Audited Balance Sheet & P&L",
      "Auditor's Report",
      "Board's Report",
      "AGM Minutes",
      "MCA SRN Acknowledgement Receipt"
    ],
    currentStatus: "Compliant",
    riskRating: "High",
    reviewer: "Company Secretary",
    lastReviewed: "2026-10-28",
    nextReview: "2027-10-30",
    linkedProvisionId: "PRV-MCA-SEC137",
    createdDate: "2026-01-15T10:00:00Z",
    updatedDate: "2026-10-28T16:00:00Z"
  },
  {
    complianceId: "OBL-2026-004",
    orgId: "ORG-GOVENICS-DEMO",
    requirementTitle: "Reverse Charge Mechanism (RCM) GST Cash Settlement",
    description: "Discharge reverse charge GST liabilities on Goods Transport Agency (GTA) and legal services exclusively from the Electronic Cash Ledger without ITC offset.",
    offering: "taxation-trade",
    industry: "Manufacturing & Industrial",
    country: "India",
    state: "Central",
    regulatoryAuthority: "Central Board of Indirect Taxes and Customs (CBIC)",
    actName: "Central Goods and Services Tax Act, 2017",
    sectionRuleClause: "Section 9(3)",
    officialSourceUrl: "https://cbic-gst.gov.in/",
    applicabilityRationale: "Consigns multi-state freight via unregistered GTAs and engages external legal counsels.",
    responsibleDepartment: "Finance & Accounts",
    assignedOwner: "tax.lead@acme-ind.com",
    frequency: "Monthly",
    dueDate: "2026-11-20",
    evidenceRequired: [
      "Self-invoice for GTA services",
      "Electronic Cash Ledger debit entry",
      "GSTR-3B Table 3.1(d) filing acknowledgment"
    ],
    currentStatus: "Compliant",
    riskRating: "High",
    reviewer: "Chief Financial Officer",
    lastReviewed: "2026-10-20",
    nextReview: "2026-11-20",
    linkedProvisionId: "PRV-GST-SEC009-3",
    createdDate: "2026-01-15T10:00:00Z",
    updatedDate: "2026-10-20T17:00:00Z"
  },
  {
    complianceId: "OBL-2026-005",
    orgId: "ORG-GOVENICS-DEMO",
    requirementTitle: "Fixed-Term Worker Gratuity Pro-Rata Disbursement",
    description: "Disburse gratuity on a pro-rata basis for fixed-term contract workers upon cessation, regardless of the 5-year continuous service rule.",
    offering: "labour-employment",
    industry: "Manufacturing & Industrial",
    country: "India",
    state: "Central",
    regulatoryAuthority: "Ministry of Labour and Employment",
    actName: "Code on Social Security, 2020",
    sectionRuleClause: "Section 53 Proviso",
    officialSourceUrl: "https://labour.gov.in/",
    applicabilityRationale: "Employs technical specialists on fixed-term 12-to-24-month project contracts.",
    responsibleDepartment: "Human Resources & Industrial Relations",
    assignedOwner: "hr.ops@acme-ind.com",
    frequency: "Event-driven",
    dueDate: "2026-11-25",
    evidenceRequired: [
      "Fixed-term contract copies",
      "Pro-rata gratuity calculation sheet",
      "Bank transfer vouchers"
    ],
    currentStatus: "In Progress",
    riskRating: "Medium",
    reviewer: "HR Director",
    lastReviewed: "2026-10-10",
    nextReview: "2026-11-25",
    linkedProvisionId: "PRV-SSCODE-SEC053",
    createdDate: "2026-01-15T10:00:00Z",
    updatedDate: "2026-10-10T11:00:00Z"
  }
];

// Initialize seed data
for (const ob of SEED_OBLIGATIONS) {
  IN_MEMORY_OBLIGATIONS.set(ob.complianceId, ob);
}

// ─── COMPLIANCE REGISTER CRUD ────────────────────────────────────────────────

export async function getComplianceRegister(orgId) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  
  // Ensure seed obligations are loaded
  const recordsMap = new Map();
  if (targetOrg === "ORG-GOVENICS-DEMO") {
    for (const s of SEED_OBLIGATIONS) {
      recordsMap.set(s.complianceId, s);
    }
  }

  try {
    const ids = await redis.smembers(KEYS.complianceRegister(targetOrg));
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const raw = await redis.get(KEYS.complianceObligation(id));
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          recordsMap.set(parsed.complianceId, parsed);
        }
      }
    }
  } catch (err) {
    // Fallback to in-memory map
  }

  // Merge in-memory records
  for (const [id, ob] of IN_MEMORY_OBLIGATIONS.entries()) {
    if (ob.orgId === targetOrg) {
      recordsMap.set(id, ob);
    }
  }

  return Array.from(recordsMap.values());
}

export async function getComplianceObligationById(complianceId) {
  try {
    const raw = await redis.get(KEYS.complianceObligation(complianceId));
    if (raw) return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {}
  return IN_MEMORY_OBLIGATIONS.get(complianceId) || null;
}

export async function saveComplianceObligation(obligation) {
  if (!obligation.complianceId || !obligation.orgId || !obligation.requirementTitle) {
    throw new Error("Missing required compliance obligation fields.");
  }

  const record = {
    ...obligation,
    updatedDate: new Date().toISOString()
  };

  IN_MEMORY_OBLIGATIONS.set(record.complianceId, record);

  try {
    await redis.set(KEYS.complianceObligation(record.complianceId), JSON.stringify(record));
    await redis.sadd(KEYS.complianceRegister(record.orgId), record.complianceId);
  } catch (err) {
    console.warn("[Redis Compliance Register Warning]", err.message);
  }

  return record;
}

export async function deleteComplianceObligation(complianceId, orgId) {
  IN_MEMORY_OBLIGATIONS.delete(complianceId);
  try {
    await redis.del(KEYS.complianceObligation(complianceId));
    if (orgId) {
      await redis.srem(KEYS.complianceRegister(orgId), complianceId);
    }
  } catch (err) {
    console.warn("[Redis Delete Obligation Warning]", err.message);
  }
  return true;
}

// ─── COMPLIANCE METRICS & DEPARTMENT ROLLUP ──────────────────────────────────

export async function calculateOrganizationComplianceMetrics(orgId) {
  const obligations = await getComplianceRegister(orgId);
  const total = obligations.length;

  if (total === 0) {
    return {
      totalObligations: 0,
      compliantCount: 0,
      partiallyCompliantCount: 0,
      nonCompliantCount: 0,
      inProgressCount: 0,
      overdueCount: 0,
      complianceScorePercentage: 0,
      departmentBreakdown: {},
      riskDistribution: { Critical: 0, High: 0, Medium: 0, Low: 0 }
    };
  }

  let compliant = 0;
  let partial = 0;
  let nonCompliant = 0;
  let inProgress = 0;
  let overdue = 0;

  const departmentBreakdown = {};
  const riskDistribution = { Critical: 0, High: 0, Medium: 0, Low: 0 };

  const now = new Date();

  for (const ob of obligations) {
    const status = ob.currentStatus || "In Progress";
    if (status === "Compliant") compliant++;
    else if (status === "Partially Compliant") partial++;
    else if (status === "Non-Compliant") nonCompliant++;
    else if (status === "In Progress") inProgress++;

    // Check if overdue by date
    if (ob.dueDate && new Date(ob.dueDate) < now && status !== "Compliant") {
      overdue++;
    }

    // Risk distribution
    const r = ob.riskRating || "Medium";
    if (riskDistribution[r] !== undefined) riskDistribution[r]++;

    // Department grouping
    const dept = ob.responsibleDepartment || "General Management";
    if (!departmentBreakdown[dept]) {
      departmentBreakdown[dept] = { total: 0, compliant: 0, score: 0 };
    }
    departmentBreakdown[dept].total++;
    if (status === "Compliant") departmentBreakdown[dept].compliant++;
  }

  // Calculate department compliance score
  for (const d in departmentBreakdown) {
    const item = departmentBreakdown[d];
    item.score = Math.round((item.compliant / item.total) * 100);
  }

  // Global score: Compliant = 1.0, Partial = 0.5, In Progress = 0.25
  const weightedScore = (compliant * 1.0) + (partial * 0.5) + (inProgress * 0.25);
  const complianceScorePercentage = Math.round((weightedScore / total) * 100);

  return {
    totalObligations: total,
    compliantCount: compliant,
    partiallyCompliantCount: partial,
    nonCompliantCount: nonCompliant,
    inProgressCount: inProgress,
    overdueCount: overdue,
    complianceScorePercentage,
    departmentBreakdown,
    riskDistribution
  };
}

// api/lib/compliance/capaManagementService.js
// Phase 6.8 — Corrective and Preventive Action (CAPA) Management
// Root-cause analysis (5-Whys / Fishbone), immediate correction, preventive controls, and effectiveness verification.

import { redis, KEYS } from "../redis.js";

let IN_MEMORY_CAPA = new Map();

export const CAPA_STATUSES = [
  "Draft",
  "Investigation",
  "Action Planned",
  "Under Execution",
  "Verification Pending",
  "Effectiveness Review",
  "Closed",
  "Overdue"
];

const SEED_CAPA = [
  {
    capaId: "CAPA-2026-001",
    orgId: "ORG-GOVENICS-DEMO",
    findingId: "FND-001",
    title: "Resolution of Contractor Manpower PF ECR Reconciliation Lag",
    rootCauseAnalysis: {
      method: "5-Whys",
      primaryRootCause: "Contractor vendor billing portal did not gate invoice processing on Form 12A PF challan verification.",
      contributingFactors: ["Manual paper-based challan collection", "Vendor onboarding lack of SLA clauses"]
    },
    immediateCorrection: "Held payment on vendor voucher pending submission of validated ECR deposit scroll.",
    correctiveAction: "Configured mandatory digital upload of EPFO ECR electronic receipt before vendor invoice is generated.",
    preventiveAction: "Updated Standard Vendor Agreement Clause 14 to mandate monthly auto-debit PF escrow clearance.",
    actionOwner: "hr.ops@acme-ind.com",
    dueDate: "2026-11-20",
    supportingEvidence: ["https://storage.govenics.com/evidence/vendor_clause_amendment.pdf"],
    effectivenessReviewSchedule: "2026-12-15",
    verificationStatus: "Verified by Lead Auditor",
    status: "Under Execution",
    createdAt: "2026-10-05T10:00:00Z",
    updatedAt: "2026-10-25T11:00:00Z"
  },
  {
    capaId: "CAPA-2026-002",
    orgId: "ORG-GOVENICS-DEMO",
    findingId: "FND-002",
    title: "Recalibration of Industrial ETP Continuous Effluent Sensors",
    rootCauseAnalysis: {
      method: "Fishbone / Ishikawa",
      primaryRootCause: "Technician turnover caused gap in manual shift log entries for calibration cycles.",
      contributingFactors: ["Absence of automated cloud calibration telemetry", "Lack of secondary instrument backup"]
    },
    immediateCorrection: "Senior ETP operator performed immediate multi-point buffer calibration and certified readings.",
    correctiveAction: "Linked sensor digital output directly to CPCB OCEMS telemetry server with automatic calibration drift alarms.",
    preventiveAction: "Instituted bi-weekly third-party instrumentation service contract with OEM.",
    actionOwner: "ehs.lead@acme-ind.com",
    dueDate: "2026-11-10",
    supportingEvidence: ["https://storage.govenics.com/evidence/ocems_calibration_cert.pdf"],
    effectivenessReviewSchedule: "2026-11-30",
    verificationStatus: "Verified by Factory Inspector",
    status: "Verification Pending",
    createdAt: "2026-10-10T12:00:00Z",
    updatedAt: "2026-10-26T15:00:00Z"
  }
];

for (const c of SEED_CAPA) {
  IN_MEMORY_CAPA.set(c.capaId, c);
}

export async function getCapaRecordsByOrg(orgId, filter = {}) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  const map = new Map();
  if (targetOrg === "ORG-GOVENICS-DEMO") {
    for (const c of SEED_CAPA) map.set(c.capaId, c);
  }
  try {
    const ids = await redis.smembers(KEYS.capaList(targetOrg));
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const raw = await redis.get(KEYS.capaItem(id));
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          map.set(parsed.capaId, parsed);
        }
      }
    }
  } catch {}
  for (const [id, c] of IN_MEMORY_CAPA.entries()) {
    if (c.orgId === targetOrg) map.set(id, c);
  }
  return applyCapaFilters(Array.from(map.values()), filter);
}

function applyCapaFilters(capas, filter) {
  let res = capas;
  if (filter.status) {
    res = res.filter(c => c.status.toLowerCase() === filter.status.toLowerCase());
  }
  if (filter.actionOwner) {
    res = res.filter(c => c.actionOwner.toLowerCase() === filter.actionOwner.toLowerCase());
  }
  return res;
}

export async function createCapaRecord(capaData) {
  const capaId = capaData.capaId || `CAPA-2026-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const record = {
    ...capaData,
    capaId,
    orgId: capaData.orgId || "ORG-GOVENICS-DEMO",
    status: capaData.status || "Investigation",
    createdAt: now,
    updatedAt: now
  };

  IN_MEMORY_CAPA.set(capaId, record);

  try {
    await redis.set(KEYS.capaItem(capaId), JSON.stringify(record));
    await redis.sadd(KEYS.capaList(record.orgId), capaId);
  } catch {}

  return record;
}

export async function closeCapaRecord(capaId, verifiedBy, closureNotes) {
  const item = IN_MEMORY_CAPA.get(capaId);
  if (!item) throw new Error(`CAPA '${capaId}' not found.`);

  item.status = "Closed";
  item.verifiedBy = verifiedBy;
  item.closureNotes = closureNotes;
  item.closedAt = new Date().toISOString();
  item.updatedAt = item.closedAt;

  IN_MEMORY_CAPA.set(capaId, item);

  try {
    await redis.set(KEYS.capaItem(capaId), JSON.stringify(item));
  } catch {}

  return item;
}

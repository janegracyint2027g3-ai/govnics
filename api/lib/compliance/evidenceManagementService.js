// api/lib/compliance/evidenceManagementService.js
// Phase 6.6 — Evidence and Document Management with KRM Integration
// 12 Document Categories, Requirement Mapping, Review/Approval, Versioning, and Immutability

import { redis, KEYS } from "../redis.js";

let IN_MEMORY_EVIDENCE = new Map();

export const EVIDENCE_CATEGORIES = [
  "Licences",
  "Registrations",
  "Returns",
  "Audit reports",
  "Policies",
  "SOPs",
  "Contracts",
  "Training records",
  "Inspection reports",
  "Certificates",
  "Government correspondence",
  "Other compliance evidence"
];

export const EVIDENCE_STATUSES = [
  "Draft",
  "Submitted",
  "Under Review",
  "Approved",
  "Rejected",
  "Expired"
];

const SEED_EVIDENCE = [
  {
    evidenceId: "EVD-2026-001",
    orgId: "ORG-GOVENICS-DEMO",
    title: "Maharashtra Factory Licence Form 4 Renewal Certificate",
    category: "Licences",
    linkedObligationId: "OBL-2026-001",
    documentUrl: "https://storage.govenics.com/evidence/mh_factory_licence_2026.pdf",
    version: "v2.0",
    uploadedBy: "ehs.lead@acme-ind.com",
    fileSizeKb: 1420,
    fileHashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "Approved",
    reviewers: [
      { reviewer: "Legal Counsel", decision: "Approved", comments: "Valid till Dec 31, 2026", timestamp: "2026-01-20T10:00:00Z" }
    ],
    expiryDate: "2026-12-31",
    createdAt: "2026-01-18T10:00:00Z"
  },
  {
    evidenceId: "EVD-2026-002",
    orgId: "ORG-GOVENICS-DEMO",
    title: "Form AOC-4 MCA SRN Filing Acknowledgement",
    category: "Returns",
    linkedObligationId: "OBL-2026-003",
    documentUrl: "https://storage.govenics.com/evidence/mca_aoc4_srn_receipt.pdf",
    version: "v1.0",
    uploadedBy: "compliance@acme-ind.com",
    fileSizeKb: 680,
    fileHashSha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    status: "Approved",
    reviewers: [
      { reviewer: "Company Secretary", decision: "Approved", comments: "SRN AA829104 confirmed on MCA21 portal", timestamp: "2026-10-28T16:30:00Z" }
    ],
    expiryDate: null,
    createdAt: "2026-10-28T16:00:00Z"
  }
];

for (const e of SEED_EVIDENCE) {
  IN_MEMORY_EVIDENCE.set(e.evidenceId, e);
}

export async function getEvidenceByOrg(orgId, filter = {}) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  const map = new Map();
  if (targetOrg === "ORG-GOVENICS-DEMO") {
    for (const e of SEED_EVIDENCE) map.set(e.evidenceId, e);
  }
  try {
    const ids = await redis.smembers(KEYS.evidenceList(targetOrg));
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const raw = await redis.get(KEYS.evidenceItem(id));
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          map.set(parsed.evidenceId, parsed);
        }
      }
    }
  } catch {}
  for (const [id, e] of IN_MEMORY_EVIDENCE.entries()) {
    if (e.orgId === targetOrg) map.set(id, e);
  }
  return applyEvidenceFilters(Array.from(map.values()), filter);
}

function applyEvidenceFilters(evidence, filter) {
  let res = evidence;
  if (filter.category) {
    res = res.filter(e => e.category.toLowerCase() === filter.category.toLowerCase());
  }
  if (filter.status) {
    res = res.filter(e => e.status.toLowerCase() === filter.status.toLowerCase());
  }
  if (filter.linkedObligationId) {
    res = res.filter(e => e.linkedObligationId === filter.linkedObligationId);
  }
  return res;
}

export async function submitEvidence(evidenceData) {
  const evidenceId = evidenceData.evidenceId || `EVD-2026-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const record = {
    ...evidenceData,
    evidenceId,
    orgId: evidenceData.orgId || "ORG-GOVENICS-DEMO",
    version: evidenceData.version || "v1.0",
    status: evidenceData.status || "Submitted",
    reviewers: evidenceData.reviewers || [],
    createdAt: now,
    updatedAt: now
  };

  IN_MEMORY_EVIDENCE.set(evidenceId, record);

  try {
    await redis.set(KEYS.evidenceItem(evidenceId), JSON.stringify(record));
    await redis.sadd(KEYS.evidenceList(record.orgId), evidenceId);
  } catch {}

  return record;
}

export async function reviewEvidence(evidenceId, decision, reviewerName, comments) {
  const item = IN_MEMORY_EVIDENCE.get(evidenceId);
  if (!item) throw new Error(`Evidence '${evidenceId}' not found.`);

  const now = new Date().toISOString();
  item.status = decision === "Approved" ? "Approved" : "Rejected";
  item.reviewers.push({
    reviewer: reviewerName || "Compliance Reviewer",
    decision,
    comments: comments || "",
    timestamp: now
  });
  item.updatedAt = now;

  IN_MEMORY_EVIDENCE.set(evidenceId, item);

  try {
    await redis.set(KEYS.evidenceItem(evidenceId), JSON.stringify(item));
  } catch {}

  return item;
}

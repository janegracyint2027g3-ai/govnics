// api/lib/regulatory/verificationService.js
// Phase 5 — Legal Source Verification and Quality Approval Workflow

import { STRUCTURED_PROVISIONS } from "./sectionExtractionService.js";

export const VERIFICATION_STATES = [
  "Verified Primary Source",
  "Verified Official Secondary Source",
  "Reviewed Internal Knowledge",
  "Needs Legal Review",
  "Needs Enrichment",
  "Source Missing",
  "Placeholder / Incomplete",
  "Rejected",
  "Superseded"
];

let VERIFICATION_AUDIT_TRAIL = [
  {
    auditId: "VER-2026-001",
    provisionId: "PRV-DPDP-SEC006",
    reviewerName: "Chief Privacy Counsel",
    decision: "Approved & Verified",
    notes: "Verified against India Gazette Notification Act No. 22 of 2023.",
    timestamp: "2026-10-15T11:00:00Z"
  },
  {
    auditId: "VER-2026-002",
    provisionId: "PRV-FACT-SEC040B",
    reviewerName: "Senior EHS Legal Director",
    decision: "Approved & Verified",
    notes: "Verified against Central Factories Act Section 40-B text.",
    timestamp: "2026-10-16T14:30:00Z"
  }
];

export function getPendingProvisions() {
  return STRUCTURED_PROVISIONS.filter(p => p.verificationStatus === "Needs Legal Review" || p.verificationStatus === "Reviewed Internal Knowledge");
}

export function verifyAndApproveProvision(provisionId, reviewerName, decision, notes = "") {
  const provision = STRUCTURED_PROVISIONS.find(p => p.provisionId === provisionId);
  if (!provision) return null;

  if (decision === "Approved") {
    provision.verificationStatus = "Verified Primary Source";
  } else if (decision === "Rejected") {
    provision.verificationStatus = "Rejected";
  } else {
    provision.verificationStatus = "Needs Legal Review";
  }

  const logEntry = {
    auditId: `VER-2026-${String(VERIFICATION_AUDIT_TRAIL.length + 1).padStart(3, "0")}`,
    provisionId,
    reviewerName: reviewerName || "Compliance Counsel",
    decision,
    notes,
    timestamp: new Date().toISOString()
  };

  VERIFICATION_AUDIT_TRAIL.push(logEntry);

  return {
    provision,
    log: logEntry
  };
}

export function getVerificationAuditTrail() {
  return VERIFICATION_AUDIT_TRAIL;
}


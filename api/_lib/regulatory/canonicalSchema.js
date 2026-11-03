// api/_lib/regulatory/canonicalSchema.js
// Canonical 46-Field Standard Regulatory Knowledge Schema for GOVENICS GRC Platform

export const JURISDICTION_TYPES = ["Central", "State", "Union Territory"];

export const COMPLIANCE_FREQUENCIES = [
  "One-Time",
  "Monthly",
  "Quarterly",
  "Half-Yearly",
  "Annual",
  "Event-Driven",
  "Continuous"
];

export const AMENDMENT_STATUSES = [
  "Original",
  "Amended",
  "Superseded",
  "Pending_Notification"
];

export const REPEAL_STATUSES = [
  "In_Force",
  "Repealed",
  "Partially_Repealed",
  "Subsumed_By_Code"
];

export const VERIFICATION_STATUSES = [
  "Verified",
  "Pending_Verification",
  "Conflicting",
  "Source_Unavailable"
];

export const LEGAL_REVIEW_STATUSES = [
  "Draft",
  "Under_Review",
  "Approved",
  "Rejected",
  "Needs_Reprocessing"
];

export const REVIEW_QUEUES = {
  NEW_SOURCES: "queue:sources:new",
  NEW_EXTRACTIONS: "queue:extractions:new",
  LOW_CONFIDENCE: "queue:extractions:low_confidence",
  MISSING_SOURCE: "queue:records:missing_source",
  CONFLICTING_PROVISIONS: "queue:provisions:conflicting",
  AMENDMENT_CANDIDATES: "queue:amendments:candidates",
  REPEALED_RECORDS: "queue:records:repealed",
  PENDING_LEGAL_REVIEW: "queue:review:pending",
  APPROVED_RECORDS: "queue:records:approved",
  REJECTED_RECORDS: "queue:records:rejected"
};

/**
 * Validates a regulatory knowledge record against the 46-field canonical schema
 * @param {Object} record - The candidate regulatory record
 * @returns {{ isValid: boolean, missingFields: string[], errors: string[] }}
 */
export function validateCanonicalRegulatoryRecord(record) {
  const missingFields = [];
  const errors = [];

  const requiredKeys = [
    "recordId",
    "jurisdictionType",
    "country",
    "issuingAuthority",
    "actName",
    "section",
    "originalLegalText",
    "plainLanguageExplanation",
    "complianceObligation",
    "applicabilityConditions",
    "industry",
    "responsibleDepartment",
    "responsibleRole",
    "complianceFrequency",
    "dueDateLogic",
    "effectiveFrom",
    "amendmentStatus",
    "repealStatus",
    "officialSourceUrl",
    "verificationStatus",
    "legalReviewStatus",
    "versionNumber",
    "aiConfidenceScore"
  ];

  requiredKeys.forEach((key) => {
    if (record[key] === undefined || record[key] === null || record[key] === "") {
      missingFields.push(key);
    }
  });

  if (record.jurisdictionType && !JURISDICTION_TYPES.includes(record.jurisdictionType)) {
    errors.push(`Invalid jurisdictionType: ${record.jurisdictionType}`);
  }

  if (record.jurisdictionType !== "Central" && !record.stateOrUt) {
    missingFields.push("stateOrUt");
  }

  if (record.complianceFrequency && !COMPLIANCE_FREQUENCIES.includes(record.complianceFrequency)) {
    errors.push(`Invalid complianceFrequency: ${record.complianceFrequency}`);
  }

  if (record.verificationStatus && !VERIFICATION_STATUSES.includes(record.verificationStatus)) {
    errors.push(`Invalid verificationStatus: ${record.verificationStatus}`);
  }

  if (record.legalReviewStatus && !LEGAL_REVIEW_STATUSES.includes(record.legalReviewStatus)) {
    errors.push(`Invalid legalReviewStatus: ${record.legalReviewStatus}`);
  }

  if (typeof record.aiConfidenceScore === "number") {
    if (record.aiConfidenceScore < 0 || record.aiConfidenceScore > 1) {
      errors.push("aiConfidenceScore must be a float between 0.0 and 1.0");
    }
  }

  return {
    isValid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors
  };
}

/**
 * Creates a normalized 46-field canonical regulatory record with default guarantees
 */
export function createCanonicalRegulatoryRecord(data) {
  const now = new Date().toISOString();
  return {
    // 1-6 Identification & Jurisdiction
    recordId: data.recordId || `REG-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    jurisdictionType: data.jurisdictionType || "Central",
    country: "India",
    stateOrUt: data.stateOrUt !== undefined ? data.stateOrUt : (data.jurisdictionType === "Central" ? null : null),
    issuingAuthority: data.issuingAuthority || "Unknown Statutory Authority",
    ministryOrDepartment: data.ministryOrDepartment || "General Administration",

    // 7-14 Act & Subordinate Legislation
    actName: data.actName || "Untitled Statutory Act",
    actNumberAndYear: data.actNumberAndYear || null,
    ruleOrRegulationName: data.ruleOrRegulationName || null,
    chapter: data.chapter || null,
    section: data.section || "General",
    subsection: data.subsection || null,
    clause: data.clause || null,
    schedule: data.schedule || null,

    // 15-18 Substantive Legal Content
    originalLegalText: data.originalLegalText || "",
    plainLanguageExplanation: data.plainLanguageExplanation || "",
    complianceObligation: data.complianceObligation || "",
    applicabilityConditions: Array.isArray(data.applicabilityConditions) ? data.applicabilityConditions : [],

    // 19-27 Sector & Operational Mapping
    industry: Array.isArray(data.industry) ? data.industry : ["All"],
    subIndustry: Array.isArray(data.subIndustry) ? data.subIndustry : [],
    businessActivity: Array.isArray(data.businessActivity) ? data.businessActivity : [],
    responsibleDepartment: data.responsibleDepartment || "Legal & Compliance",
    responsibleRole: data.responsibleRole || "Compliance Officer",
    requiredEvidence: Array.isArray(data.requiredEvidence) ? data.requiredEvidence : [],
    complianceFrequency: data.complianceFrequency || "Annual",
    dueDateLogic: data.dueDateLogic || "As notified by relevant authority",
    penaltyOrConsequence: data.penaltyOrConsequence || "Penal consequences as stipulated under parent Act",

    // 28-32 Temporal & Versioning Metadata
    commencementDate: data.commencementDate || null,
    effectiveFrom: data.effectiveFrom || now.split("T")[0],
    effectiveTo: data.effectiveTo || null,
    amendmentStatus: data.amendmentStatus || "Original",
    repealStatus: data.repealStatus || "In_Force",

    // 33-46 Source Traceability & Verification
    officialSourceUrl: data.officialSourceUrl || "https://www.indiacode.nic.in/",
    sourceDocumentTitle: data.sourceDocumentTitle || "Official Gazette / Government Release",
    gazetteOrNotificationNumber: data.gazetteOrNotificationNumber || null,
    publicationDate: data.publicationDate || null,
    pageNumber: data.pageNumber || null,
    extractionDate: data.extractionDate || now,
    lastVerifiedDate: data.lastVerifiedDate || now,
    verificationStatus: data.verificationStatus || "Pending_Verification",
    legalReviewStatus: data.legalReviewStatus || "Draft",
    versionNumber: data.versionNumber || 1,
    previousVersionId: data.previousVersionId || null,
    aiConfidenceScore: typeof data.aiConfidenceScore === "number" ? data.aiConfidenceScore : 0.90,
    humanReviewer: data.humanReviewer || null,
    approvalTimestamp: data.approvalTimestamp || null
  };
}

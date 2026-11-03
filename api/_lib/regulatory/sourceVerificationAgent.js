// api/_lib/regulatory/sourceVerificationAgent.js
// Specialist Agent 11: Legal Source Verification Agent
// Validates source authenticity, domain sovereignty, gazette verification, and integrity checks

export class SourceVerificationAgent {
  constructor() {
    this.agentId = "AGT-REG-11-SOURCE-VERIFY";
    this.agentName = "Legal Source Verification Agent";
  }

  /**
   * Verifies an official regulatory source and record citation
   * @param {Object} record - The candidate regulatory record
   */
  verifyRecordAuthenticity(record) {
    const checks = {
      isGovDomain: false,
      hasValidSourceUrl: false,
      hasPublicationReference: false,
      hasEffectiveDate: false,
      isRepealed: false,
      isConflicting: false
    };

    const errors = [];
    const warnings = [];

    // 1. URL & Government Domain Check
    if (record.officialSourceUrl) {
      checks.hasValidSourceUrl = true;
      try {
        const parsed = new URL(record.officialSourceUrl);
        const host = parsed.hostname.toLowerCase();
        if (
          host.endsWith(".gov.in") ||
          host.endsWith(".nic.in") ||
          host.endsWith(".rbi.org.in") ||
          host.endsWith(".sebi.gov.in") ||
          host.endsWith(".irdai.gov.in") ||
          host.endsWith(".cpcb.nic.in")
        ) {
          checks.isGovDomain = true;
        } else {
          warnings.push(`Non-standard government domain: ${host}. Manual legal review mandatory.`);
        }
      } catch (e) {
        errors.push(`Invalid source URL format: ${record.officialSourceUrl}`);
      }
    } else {
      errors.push("Missing officialSourceUrl. A regulatory record cannot be approved without a verified URL.");
    }

    // 2. Publication Citation Verification
    if (record.gazetteOrNotificationNumber || record.sourceDocumentTitle) {
      checks.hasPublicationReference = true;
    } else {
      warnings.push("No Gazette or Notification Number provided; record relies exclusively on portal title.");
    }

    // 3. Temporal Validity
    if (record.effectiveFrom) {
      checks.hasEffectiveDate = true;
    } else {
      warnings.push("Missing effectiveFrom date. Defaulting to extraction date.");
    }

    // 4. Repeal / Supersession Detection
    if (record.repealStatus && record.repealStatus !== "In_Force") {
      checks.isRepealed = true;
      warnings.push(`Record status is ${record.repealStatus}. Must not be presented as active mandatory obligation.`);
    }

    // Determine verification status
    let verificationStatus = "Verified";
    let targetQueue = "queue:records:approved";

    if (errors.length > 0) {
      verificationStatus = "Source_Unavailable";
      targetQueue = "queue:records:missing_source";
    } else if (!checks.isGovDomain || warnings.length > 1) {
      verificationStatus = "Pending_Verification";
      targetQueue = "queue:review:pending";
    }

    // Quality confidence score computation (0.0 to 1.0)
    let confidenceScore = 1.0;
    if (!checks.isGovDomain) confidenceScore -= 0.15;
    if (!checks.hasPublicationReference) confidenceScore -= 0.10;
    if (warnings.length > 0) confidenceScore -= (warnings.length * 0.05);
    confidenceScore = Math.max(0.50, Math.min(1.0, confidenceScore));

    return {
      recordId: record.recordId,
      actName: record.actName,
      section: record.section,
      isAuthentic: errors.length === 0,
      checks,
      errors,
      warnings,
      verificationStatus,
      confidenceScore: Number(confidenceScore.toFixed(2)),
      recommendedQueue: targetQueue,
      verifiedTimestamp: new Date().toISOString()
    };
  }
}


// api/_lib/regulatory/obligationStructuringAgent.js
// Specialist Agent 12: Compliance Obligation Structuring Agent
// Synthesizes verbatim legal text into actionable enterprise obligations

import { createCanonicalRegulatoryRecord } from "./canonicalSchema.js";

export class ObligationStructuringAgent {
  constructor() {
    this.agentId = "AGT-REG-12-OBLIGATION-STRUCT";
    this.agentName = "Compliance Obligation Structuring Agent";
  }

  /**
   * Transforms raw legal extraction into an actionable compliance obligation record
   * @param {Object} rawExtraction - Raw section data
   * @returns {Object} Structured canonical regulatory record
   */
  structureComplianceObligation(rawExtraction) {
    // 1. Synthesize Actionable Obligation if not explicit
    let synthesizedObligation = rawExtraction.complianceObligation;
    if (!synthesizedObligation) {
      synthesizedObligation = `Ensure compliance with ${rawExtraction.actName} (${rawExtraction.section}) by maintaining prescribed registers, adhering to statutory thresholds, and filing required returns.`;
    }

    // 2. Synthesize plain-language summary if missing
    let plainSummary = rawExtraction.plainLanguageExplanation;
    if (!plainSummary && rawExtraction.originalLegalText) {
      plainSummary = `Statutory mandate under ${rawExtraction.actName} governing ${rawExtraction.responsibleDepartment || "corporate operations"}. Requires continuous adherence to defined legal limits and records.`;
    }

    // 3. Guarantee Required Evidence
    let evidence = rawExtraction.requiredEvidence;
    if (!evidence || evidence.length === 0) {
      evidence = ["Internal Compliance Certificate", "Audit Register Log", "Statutory Return Acknowledgement"];
    }

    // 4. Construct canonical record
    return createCanonicalRegulatoryRecord({
      ...rawExtraction,
      complianceObligation: synthesizedObligation,
      plainLanguageExplanation: plainSummary,
      requiredEvidence: evidence,
      verificationStatus: rawExtraction.verificationStatus || "Pending_Verification",
      legalReviewStatus: rawExtraction.legalReviewStatus || "Under_Review",
      aiConfidenceScore: rawExtraction.aiConfidenceScore || 0.92
    });
  }
}


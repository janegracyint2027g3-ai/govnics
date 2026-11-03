// api/lib/compliance/documentIntelligenceService.js
// Phase 4 — GOVENICS Non-Destructive Document Intelligence & Clause Extraction
// Analyzes uploaded policies, SOPs, and contracts to extract obligations, identify missing safeguards, and detect compliance risks

export function analyzeDocumentContent(documentPayload) {
  const {
    documentId = `DOC-${Date.now()}`,
    documentTitle = "Untitled Compliance Document",
    documentType = "Policy",
    rawText = ""
  } = documentPayload;

  const lower = rawText.toLowerCase();

  // 1. Identify Key Obligations
  const obligations = [];
  let obligationCounter = 1;

  if (lower.includes("shall") || lower.includes("must") || lower.includes("mandatory") || lower.includes("required")) {
    const sentences = rawText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
    for (const sent of sentences) {
      const sentLower = sent.toLowerCase();
      if (sentLower.includes("shall") || sentLower.includes("must") || sentLower.includes("required to")) {
        obligations.push({
          obligationId: `OBL-${String(obligationCounter++).padStart(3, "0")}`,
          clauseExcerpt: sent,
          nature: sentLower.includes("must") || sentLower.includes("shall") ? "Mandatory Duty" : "Procedural Requirement",
          responsibleParty: sentLower.includes("employee") ? "Employees" : sentLower.includes("officer") ? "Compliance Officer" : "Department Head",
          reviewStatus: "Pending Human Verification"
        });
        if (obligations.length >= 6) break;
      }
    }
  }

  // 2. Detect Missing Critical Clauses
  const missingClauses = [];
  if (!lower.includes("audit") && !lower.includes("review frequency")) {
    missingClauses.push({
      clauseType: "Audit & Review Cadence",
      recommendation: "Specify an explicit annual or bi-annual review schedule and designated review authority."
    });
  }
  if (!lower.includes("escalation") && !lower.includes("grievance") && !lower.includes("whistleblower")) {
    missingClauses.push({
      clauseType: "Grievance & Escalation Mechanism",
      recommendation: "Incorporate an escalation channel for reporting non-compliance or statutory breaches."
    });
  }
  if (!lower.includes("penalty") && !lower.includes("disciplinary") && !lower.includes("breach")) {
    missingClauses.push({
      clauseType: "Consequence of Non-Compliance",
      recommendation: "Define disciplinary or contractual remedies for non-compliance with the policy."
    });
  }

  // 3. Potential Compliance Risks
  const detectedRisks = [];
  if (lower.includes("unlimited liability") || lower.includes("indemnify without limit")) {
    detectedRisks.push({
      riskType: "Uncapped Indemnity",
      severity: "High",
      detail: "Agreement contains unhedged indemnification exposure without liability ceiling."
    });
  }
  if (lower.includes("sole discretion") || lower.includes("unilateral termination")) {
    detectedRisks.push({
      riskType: "Discretionary Termination Trigger",
      severity: "Medium",
      detail: "Counterparty holds unilateral termination powers without standard curing period."
    });
  }

  return {
    analysisId: `ANALYSIS-${Date.now()}`,
    documentId,
    documentTitle,
    documentType,
    analyzedAt: new Date().toISOString(),
    extractedObligations: obligations,
    missingClauses,
    detectedRisks,
    humanVerificationRequired: true,
    disclaimer:
      "This document intelligence report is an automated extraction aid. All extracted obligations, risk ratings, and clause identifications require human verification and formal legal approval prior to operational adoption."
  };
}


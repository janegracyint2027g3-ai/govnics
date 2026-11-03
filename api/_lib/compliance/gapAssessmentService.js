// api/lib/compliance/gapAssessmentService.js
// Phase 4 — GOVENICS Compliance Gap Assessment Engine
// Compares declared operational posture and evidence against approved requirements, computes risk scores & corrective plans

export const GAP_CATEGORIES = [
  "Regulatory Gap",
  "Documentation Gap",
  "Process Gap",
  "Governance Gap",
  "Operational Gap",
  "Training Gap",
  "Monitoring Gap",
  "Technology / Security Gap"
];

export function executeGapAssessment(assessmentInput) {
  const {
    organizationName = "Enterprise Client",
    industry = "Manufacturing & Industrial",
    jurisdiction = "India (Central)",
    evaluationItems = []
  } = assessmentInput;

  const gapsIdentified = [];
  let totalScore = 0;
  let inherentRiskSum = 0;
  let residualRiskSum = 0;

  for (const item of evaluationItems) {
    const declaredStatus = item.complianceStatus || "Non-Compliant";
    const hasEvidence = Boolean(item.evidenceAttached && item.evidenceAttached.length > 0);

    // Scoring baseline: Likelihood (1-5), Severity/Impact (1-5)
    let likelihood = item.likelihood || (item.riskLevel === "Critical" ? 5 : item.riskLevel === "High" ? 4 : 3);
    let severity = item.severity || (item.riskLevel === "Critical" ? 5 : item.riskLevel === "High" ? 4 : 3);
    let inherentScore = likelihood * severity; // 1 to 25

    // Control effectiveness based on declared status and evidence
    let controlEffectiveness = 0; // 0 to 100%
    let gapCategory = "Regulatory Gap";

    if (declaredStatus === "Compliant" && hasEvidence) {
      controlEffectiveness = 0.90;
    } else if (declaredStatus === "Compliant" && !hasEvidence) {
      controlEffectiveness = 0.50;
      gapCategory = "Documentation Gap";
    } else if (declaredStatus === "Partially Compliant") {
      controlEffectiveness = 0.35;
      gapCategory = "Process Gap";
    } else {
      controlEffectiveness = 0.05;
      gapCategory = item.gapCategory || "Operational Gap";
    }

    // Residual Risk = Inherent * (1 - ControlEffectiveness)
    const residualScore = parseFloat((inherentScore * (1 - controlEffectiveness)).toFixed(2));
    inherentRiskSum += inherentScore;
    residualRiskSum += residualScore;

    // Flag item as gap if residual score >= 8 or non-compliant
    if (residualScore >= 8 || declaredStatus === "Non-Compliant" || declaredStatus === "Partially Compliant") {
      let priority = "Medium";
      if (residualScore >= 16) priority = "Critical";
      else if (residualScore >= 10) priority = "High";

      gapsIdentified.push({
        gapId: `GAP-2026-${String(gapsIdentified.length + 1).padStart(3, "0")}`,
        requirementId: item.checklistId || item.ruleReferenceId || "REQ-UNKNOWN",
        requirementTitle: item.complianceRequirement || item.title,
        applicableLaw: item.applicableLaw || "Statutory Mandate",
        gapCategory,
        declaredStatus,
        evidenceCompleteness: hasEvidence ? "Partial" : "Missing",
        likelihood,
        severity,
        inherentRisk: inherentScore,
        controlEffectivenessPercentage: Math.round(controlEffectiveness * 100),
        residualRisk: residualScore,
        priority,
        recommendedAction: generateRemediationAction(gapCategory, item.complianceRequirement),
        targetClosureDays: priority === "Critical" ? 15 : priority === "High" ? 30 : 60
      });
    }
  }

  // Aggregate statistics
  const itemCount = evaluationItems.length || 1;
  const avgInherent = parseFloat((inherentRiskSum / itemCount).toFixed(1));
  const avgResidual = parseFloat((residualRiskSum / itemCount).toFixed(1));
  const compliancePosturePercent = Math.max(0, Math.min(100, Math.round(100 - (gapsIdentified.length / itemCount) * 100)));

  return {
    assessmentId: `ASSESS-${Date.now()}`,
    organizationName,
    industry,
    jurisdiction,
    assessmentDate: new Date().toISOString().split("T")[0],
    metrics: {
      totalEvaluated: evaluationItems.length,
      totalGapsIdentified: gapsIdentified.length,
      criticalGaps: gapsIdentified.filter(g => g.priority === "Critical").length,
      highGaps: gapsIdentified.filter(g => g.priority === "High").length,
      mediumGaps: gapsIdentified.filter(g => g.priority === "Medium").length,
      averageInherentRisk: avgInherent,
      averageResidualRisk: avgResidual,
      overallCompliancePosture: `${compliancePosturePercent}%`
    },
    gaps: gapsIdentified,
    disclaimer:
      "This gap assessment report represents automated comparative analysis based on submitted documentation and user-declared operational parameters. It does not constitute an official certification of legal compliance."
  };
}

function generateRemediationAction(category, requirement) {
  switch (category) {
    case "Documentation Gap":
      return "Compile statutory registers, signed resolutions, or official filing challans to substantiate compliance.";
    case "Process Gap":
      return "Implement formal operational Standard Operating Procedure (SOP) with designated supervisory sign-offs.";
    case "Governance Gap":
      return "Table statutory matter before Board of Directors or Audit Committee for formal approval and recording.";
    case "Technology / Security Gap":
      return "Deploy technical security safeguards, role-based access restrictions, and audit log monitoring.";
    default:
      return "Remediate non-compliance by executing required statutory filings and appointing responsible compliance custodian.";
  }
}


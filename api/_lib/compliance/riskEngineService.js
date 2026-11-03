// api/lib/compliance/riskEngineService.js
// Phase 4 — GOVENICS Enterprise Risk Assessment Engine
// 5x5 Heatmap matrix, inherent vs residual risk calculation, category rollups

export const RISK_CATEGORIES = [
  "Regulatory",
  "Legal",
  "Financial",
  "Operational",
  "Environmental",
  "Employment",
  "Cybersecurity",
  "Data Privacy",
  "Supply Chain",
  "ESG",
  "Strategic",
  "Reputational"
];

export function calculateRiskMetrics(riskItems) {
  // 5x5 Matrix: Likelihood (1-5) x Impact (1-5)
  // Grid buckets: Low (1-5), Medium (6-11), High (12-19), Critical (20-25)
  const heatmap = Array.from({ length: 5 }, () => Array(5).fill(0));

  const enrichedRisks = riskItems.map((r, idx) => {
    const likelihood = Math.max(1, Math.min(5, Number(r.likelihood) || 3));
    const impact = Math.max(1, Math.min(5, Number(r.impact) || 3));
    const inherentScore = likelihood * impact;

    // Control effectiveness (0 to 1)
    const controlEff = Math.max(0, Math.min(1, Number(r.controlEffectiveness) || 0.40));
    const residualScore = parseFloat((inherentScore * (1 - controlEff)).toFixed(2));

    // Update heatmap coordinates (row: 5 - impact, col: likelihood - 1)
    heatmap[5 - impact][likelihood - 1]++;

    let severity = "Medium";
    if (residualScore >= 16) severity = "Critical";
    else if (residualScore >= 10) severity = "High";
    else if (residualScore <= 4) severity = "Low";

    return {
      riskId: r.riskId || `RSK-2026-${String(idx + 1).padStart(4, "0")}`,
      riskTitle: r.riskTitle || "Operational Compliance Exposure",
      riskDescription: r.riskDescription || "",
      offering: r.offering || "regulatory-compliance",
      industry: r.industry || "Cross-Industry",
      businessUnit: r.businessUnit || "Operations",
      riskCategory: r.riskCategory || "Regulatory",
      riskOwner: r.riskOwner || "Chief Compliance Officer",
      likelihood,
      impact,
      inherentRiskScore: inherentScore,
      existingControls: r.existingControls || "Internal supervisory review",
      controlEffectiveness: Math.round(controlEff * 100),
      residualRiskScore: residualScore,
      severity,
      mitigationStrategy: r.mitigationStrategy || "Implement standard controls and regular monitoring.",
      targetCompletionDate: r.targetCompletionDate || "2026-12-31",
      currentStatus: r.currentStatus || "Open",
      supportingEvidence: r.supportingEvidence || []
    };
  });

  // Category-wise summary
  const categoryRollup = {};
  for (const cat of RISK_CATEGORIES) {
    const inCat = enrichedRisks.filter(r => r.riskCategory === cat);
    if (inCat.length > 0) {
      categoryRollup[cat] = {
        count: inCat.length,
        avgResidualScore: parseFloat((inCat.reduce((sum, r) => sum + r.residualRiskScore, 0) / inCat.length).toFixed(1)),
        criticalCount: inCat.filter(r => r.severity === "Critical").length
      };
    }
  }

  return {
    totalRisks: enrichedRisks.length,
    criticalCount: enrichedRisks.filter(r => r.severity === "Critical").length,
    highCount: enrichedRisks.filter(r => r.severity === "High").length,
    mediumCount: enrichedRisks.filter(r => r.severity === "Medium").length,
    lowCount: enrichedRisks.filter(r => r.severity === "Low").length,
    heatmapGrid: heatmap,
    categoryRollup,
    risks: enrichedRisks
  };
}


// api/risk/register.js
// GET & POST /api/risk/register — Retrieve or calculate enterprise risk registers with 5x5 heatmap metrics

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { calculateRiskMetrics } from "../../_lib/compliance/riskEngineService.js";
import { checkRateLimit } from "../../_lib/auth.js";

// Baseline seed risk items
const SEED_RISKS = [
  {
    riskId: "RSK-2026-0001",
    riskTitle: "Non-Compliance with DPDP Act 2023 Breach Notice Provisions",
    riskDescription: "Failure to report personal data breaches to DPBI within prescribed timelines.",
    offering: "cybersecurity-data",
    industry: "IT & Technology",
    businessUnit: "Information Security",
    riskCategory: "Data Privacy",
    riskOwner: "Chief Privacy Officer",
    likelihood: 4,
    impact: 5,
    existingControls: "Incident response plan drafted; SOC monitoring active",
    controlEffectiveness: 0.60,
    mitigationStrategy: "Deploy automated breach triage workflow and 72-hour board notification trigger.",
    targetCompletionDate: "2026-11-30",
    currentStatus: "In Progress"
  },
  {
    riskId: "RSK-2026-0002",
    riskTitle: "Delayed Filing of Annual Return Form AOC-4 & MGT-7",
    riskDescription: "Attracting continuous daily additional statutory fees of ₹100/day without ceiling under Section 137.",
    offering: "enterprise-governance",
    industry: "Cross-Industry",
    businessUnit: "Secretarial & Legal",
    riskCategory: "Regulatory",
    riskOwner: "Company Secretary",
    likelihood: 2,
    impact: 4,
    existingControls: "Secretarial calendar and external auditor review",
    controlEffectiveness: 0.80,
    mitigationStrategy: "Adopt automated secretarial compliance tracker with 15-day pre-AGM alerts.",
    targetCompletionDate: "2026-10-31",
    currentStatus: "Mitigated"
  },
  {
    riskId: "RSK-2026-0003",
    riskTitle: "Ineligible ITC Claim on Reverse Charge (RCM) Inward Supplies",
    riskDescription: "Discharging RCM liabilities via ITC credit ledger instead of electronic cash ledger under Section 9(3).",
    offering: "taxation-trade",
    industry: "Cross-Industry",
    businessUnit: "Taxation",
    riskCategory: "Financial",
    riskOwner: "Tax Director",
    likelihood: 3,
    impact: 4,
    existingControls: "Monthly GSTR-2B matching",
    controlEffectiveness: 0.50,
    mitigationStrategy: "Configure ERP validation rule blocking credit ledger offset for RCM tax codes.",
    targetCompletionDate: "2026-12-15",
    currentStatus: "In Progress"
  },
  {
    riskId: "RSK-2026-0004",
    riskTitle: "Inadequate Safety Officer Ratio in Manufacturing Unit",
    riskDescription: "Exceeding 1,000 workers without dedicated certified Safety Officers under Factories Act Section 40-B.",
    offering: "environmental-ehs",
    industry: "Manufacturing & Industrial",
    businessUnit: "Plant Operations",
    riskCategory: "Environmental",
    riskOwner: "Plant Director",
    likelihood: 3,
    impact: 5,
    existingControls: "Plant HSE supervisor on duty",
    controlEffectiveness: 0.40,
    mitigationStrategy: "Recruit certified DGFASLI recognized Safety Officer and establish bi-weekly inspection audit.",
    targetCompletionDate: "2026-11-15",
    currentStatus: "Open"
  }
];

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`risk:reg:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 risk requests per minute.");
    }

    if (req.method === "GET") {
      const metrics = calculateRiskMetrics(SEED_RISKS);
      return successResponse(res, metrics);
    }

    if (req.method === "POST") {
      const { items } = req.body || {};
      const riskList = Array.isArray(items) && items.length > 0 ? items : SEED_RISKS;
      const metrics = calculateRiskMetrics(riskList);
      return successResponse(res, metrics);
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[risk/register] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


// api/lib/regulatory/applicabilityAndAmendmentService.js
// Phase 5 — Central-State Applicability Mapping & Amendment Versioning Engine

import { STRUCTURED_PROVISIONS } from "./sectionExtractionService.js";

// Central-State Deviations and Mappings
export const CENTRAL_STATE_MAPPINGS = [
  {
    mappingId: "MAP-CS-001",
    centralActTitle: "The Factories Act, 1948",
    centralSection: "Section 40-B (Safety Officers)",
    stateOrUtName: "Maharashtra",
    stateRuleTitle: "Maharashtra Factories Rules, 1963",
    stateRuleSection: "Rule 68",
    isOverridingOrAdditive: "Additive State Rules",
    operationalImpact: "Maharashtra mandates an additional Safety Officer for every 1,000 workers or fraction above 500, with DISH-approved degree.",
    applicableAuthority: "Directorate of Industrial Safety and Health (DISH), Maharashtra"
  },
  {
    mappingId: "MAP-CS-002",
    centralActTitle: "The Factories Act, 1948",
    centralSection: "Section 59 (Overtime Wages)",
    stateOrUtName: "Tamil Nadu",
    stateRuleTitle: "Tamil Nadu Factories Rules, 1950",
    stateRuleSection: "Rule 78 & Form 10",
    isOverridingOrAdditive: "Additive State Rules",
    operationalImpact: "Tamil Nadu mandates Form 10 Overtime Register maintenance with pre-approval requirement for continuous shift work.",
    applicableAuthority: "Tamil Nadu Directorate of Industrial Safety and Health"
  },
  {
    mappingId: "MAP-CS-003",
    centralActTitle: "The Code on Wages, 2019",
    centralSection: "Section 6 (Minimum Wages Floor)",
    stateOrUtName: "Delhi",
    stateRuleTitle: "Delhi Minimum Wages Revision Notification",
    stateRuleSection: "Section 3 State Slabs",
    isOverridingOrAdditive: "Additive State Rules",
    operationalImpact: "Delhi publishes semi-annual VDA minimum wage revisions for unskilled, semi-skilled, and skilled workforce with dearness allowances.",
    applicableAuthority: "Office of the Labour Commissioner, Government of NCT of Delhi"
  }
];

// Amendment History Tracker
export const REGULATORY_AMENDMENTS = [
  {
    amendmentId: "AMD-2026-001",
    parentLegislationId: "ACT-CEN-DPDP-2023",
    legislationTitle: "Digital Personal Data Protection Act, 2023",
    amendingActOrNotification: "Draft DPDP Rules 2026 Notification",
    publicationDate: "2026-02-15",
    effectiveDate: "2026-06-01",
    affectedSections: ["Section 6", "Section 8", "Section 10"],
    summaryOfChanges: "Specifies quantitative thresholds for Significant Data Fiduciary classification and sets 72-hour breach notification schedule.",
    affectedOfferings: ["cybersecurity-data", "enterprise-governance"],
    affectedIndustries: ["Cross-Industry", "IT & Technology", "BFSI & Fintech"],
    affectedStates: ["All States"],
    sourceUrl: "https://www.meity.gov.in/content/dpdp-rules-2026",
    reviewStatus: "Under Legal Review",
    reviewer: "Senior Data Privacy Counsel"
  },
  {
    amendmentId: "AMD-2026-002",
    parentLegislationId: "ACT-CEN-SEBI-LODR",
    legislationTitle: "SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015",
    amendingActOrNotification: "SEBI Circular on BRSR Reasonable Assurance Slabs",
    publicationDate: "2026-01-10",
    effectiveDate: "2026-04-01",
    affectedSections: ["Regulation 34(2)(f)", "Annexure I"],
    summaryOfChanges: "Expands mandatory reasonable assurance from top 250 to top 500 listed entities for FY 2026-27.",
    affectedOfferings: ["esg-sustainability", "enterprise-governance"],
    affectedIndustries: ["Banking & Financial Services", "Manufacturing & Industrial", "Cross-Industry"],
    affectedStates: ["All States"],
    sourceUrl: "https://www.sebi.gov.in/legal/circulars/jan-2026/brsr-expansion.html",
    reviewStatus: "Approved & Verified",
    reviewer: "Head of ESG Advisory"
  }
];

export function mapCentralStateApplicability(profile) {
  const {
    stateOrUt = "Maharashtra",
    industry = "Manufacturing & Industrial",
    employeeCount = 1200,
    hasHazardousProcesses = true
  } = profile;

  const relevantProvisions = [];
  const stateDeviations = CENTRAL_STATE_MAPPINGS.filter(m => m.stateOrUtName.toLowerCase() === stateOrUt.toLowerCase());

  // 1. Evaluate Central Provisions
  for (const prov of STRUCTURED_PROVISIONS) {
    if (prov.jurisdictionLevel === "Central") {
      relevantProvisions.push({
        provisionId: prov.provisionId,
        actTitle: prov.actTitle,
        sectionNumber: prov.sectionNumber,
        complianceRequirement: prov.complianceRequirement,
        jurisdiction: "Central",
        applicabilityReason: "Central statutory enactment applicable nationwide."
      });
    }
  }

  // 2. Evaluate State-Specific Provisions
  for (const prov of STRUCTURED_PROVISIONS) {
    if (prov.jurisdictionLevel === "State" && prov.stateOrUtName?.toLowerCase().includes(stateOrUt.toLowerCase())) {
      relevantProvisions.push({
        provisionId: prov.provisionId,
        actTitle: prov.actTitle,
        sectionNumber: prov.sectionNumber,
        complianceRequirement: prov.complianceRequirement,
        jurisdiction: `State (${stateOrUt})`,
        applicabilityReason: `Enacted by State of ${stateOrUt} for operations within state borders.`
      });
    }
  }

  return {
    profileAnalyzed: {
      stateOrUt,
      industry,
      employeeCount,
      hasHazardousProcesses
    },
    totalApplicableProvisions: relevantProvisions.length,
    centralProvisionsCount: relevantProvisions.filter(p => p.jurisdiction === "Central").length,
    stateProvisionsCount: relevantProvisions.filter(p => p.jurisdiction.startsWith("State")).length,
    stateDeviations,
    applicableProvisions: relevantProvisions
  };
}

export function getRegulatoryAmendments(statusFilter = "All") {
  if (!statusFilter || statusFilter === "All") return REGULATORY_AMENDMENTS;
  return REGULATORY_AMENDMENTS.filter(a => a.reviewStatus === statusFilter);
}


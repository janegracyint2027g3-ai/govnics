// src/types/regulatory.ts
// Phase 5 — Universal Regulatory Knowledge Types across Central, 28 States & 8 Union Territories

import type { GovenicsOffering, IndustrySector, TrustState } from "./knowledgeHub";

export type JurisdictionLevel = "Central" | "State" | "Union Territory";

export interface RegulatorySource {
  sourceId: string;
  authorityName: string;
  portalTitle: string;
  officialUrl: string;
  jurisdictionLevel: JurisdictionLevel;
  stateOrUtName?: string;
  ministryOrDepartment: string;
  trustRating: "Verified Official Government Portal" | "Verified Official Regulator" | "Official State Department";
  monitoredOfferings: GovenicsOffering[];
  rateLimitMs: number;
  lastCrawledAt?: string;
  isActive: boolean;
}

export interface LegalProvision {
  provisionId: string;
  actId: string;
  actTitle: string;
  jurisdictionLevel: JurisdictionLevel;
  stateOrUtName?: string;
  sectionNumber: string;
  ruleNumber?: string;
  subsection?: string;
  clause?: string;
  scheduleReference?: string;
  originalLegalText: string;
  simplifiedExplanation: string;
  complianceRequirement: string;
  applicabilityCondition: string;
  responsibleEntity: string;
  responsibleDepartment: string;
  requiredEvidence: string;
  requiredFilingOrAction: string;
  frequency: "Annual" | "Half-Yearly" | "Quarterly" | "Monthly" | "Continuous / Event-Based" | "One-Time";
  deadline: string | null;
  penaltyOrConsequence: string | null;
  offering: GovenicsOffering;
  industry: IndustrySector;
  regulatoryAuthority: string;
  sourceUrl: string;
  pageNumber?: number;
  verificationStatus: TrustState;
  amendmentReference?: string;
  isRepealedOrSuperseded?: boolean;
}

export interface CentralStateMapping {
  mappingId: string;
  centralActTitle: string;
  centralSection: string;
  stateOrUtName: string;
  stateRuleTitle: string;
  stateRuleSection: string;
  isOverridingOrAdditive: "Additive State Rules" | "State-Specific Exemption" | "Conflicting Provision (Needs Legal Review)";
  operationalImpact: string;
  applicableAuthority: string;
}

export interface RegulatoryAmendment {
  amendmentId: string;
  parentLegislationId: string;
  legislationTitle: string;
  amendingActOrNotification: string;
  publicationDate: string;
  effectiveDate: string;
  affectedSections: string[];
  summaryOfChanges: string;
  affectedOfferings: GovenicsOffering[];
  affectedIndustries: IndustrySector[];
  affectedStates: string[];
  sourceUrl: string;
  reviewStatus: "Detected" | "Under Legal Review" | "Approved & Verified" | "Rejected";
  reviewer?: string;
}

export interface StateCoverageMetric {
  stateOrUtName: string;
  jurisdictionLevel: "State" | "Union Territory";
  sourcesRegistered: number;
  actsDocumented: number;
  provisionsExtracted: number;
  verifiedProvisions: number;
  pendingReviewProvisions: number;
  coveragePercentage: number;
  lastExtractionDate: string;
}


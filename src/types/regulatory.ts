// src/types/regulatory.ts
// Production Regulatory Knowledge Types across Central, 28 States & 8 Union Territories

import type { GovenicsOffering } from "./knowledgeHub";

export type JurisdictionLevel = "Central" | "State" | "Union Territory";

export interface RegulatorySource {
  sourceId: string;
  authorityName: string;
  portalTitle: string;
  officialUrl: string;
  jurisdictionLevel: JurisdictionLevel;
  stateOrUtName?: string;
  ministryOrDepartment: string;
  trustRating: "Verified Official Government Portal" | "Verified Official Regulator" | "Official State Department" | string;
  monitoredOfferings: (GovenicsOffering | string)[];
  departments?: string[];
  subEndpoints?: Record<string, string>;
  rateLimitMs: number;
  lastCrawledAt?: string;
  isActive: boolean;
  verificationStatus?: string;
}

export interface RegulatoryKnowledgeRecord {
  recordId: string;
  jurisdictionType: JurisdictionLevel;
  country: "India";
  stateOrUt?: string | null;
  issuingAuthority: string;
  ministryOrDepartment: string;

  actName: string;
  actNumberAndYear?: string | null;
  ruleOrRegulationName?: string | null;
  chapter?: string | null;
  section: string;
  subsection?: string | null;
  clause?: string | null;
  schedule?: string | null;

  originalLegalText: string;
  plainLanguageExplanation: string;
  complianceObligation: string;
  applicabilityConditions: string[];

  industry: string[];
  subIndustry?: string[];
  businessActivity?: string[];
  responsibleDepartment: string;
  responsibleRole: string;
  requiredEvidence: string[];
  complianceFrequency: "One-Time" | "Monthly" | "Quarterly" | "Half-Yearly" | "Annual" | "Event-Driven" | "Continuous" | string;
  dueDateLogic: string;
  penaltyOrConsequence: string;

  commencementDate?: string | null;
  effectiveFrom: string;
  effectiveTo?: string | null;
  amendmentStatus: "Original" | "Amended" | "Superseded" | "Pending_Notification" | string;
  repealStatus: "In_Force" | "Repealed" | "Partially_Repealed" | "Subsumed_By_Code" | string;

  officialSourceUrl: string;
  sourceDocumentTitle: string;
  gazetteOrNotificationNumber?: string | null;
  publicationDate?: string | null;
  pageNumber?: string | null;
  extractionDate: string;
  lastVerifiedDate: string;
  verificationStatus: "Verified" | "Pending_Verification" | "Conflicting" | "Source_Unavailable" | string;
  legalReviewStatus: "Draft" | "Under_Review" | "Approved" | "Rejected" | "Needs_Reprocessing" | string;
  versionNumber: number;
  previousVersionId?: string | null;
  aiConfidenceScore: number;
  humanReviewer?: string | null;
  approvalTimestamp?: string | null;
}

export interface LegalReviewQueueItem {
  queueId: string;
  queueName: string;
  title: string;
  count: number;
  description: string;
  color: string;
}

export interface ExtractionJob {
  jobId: string;
  agentId: string;
  jurisdiction: JurisdictionLevel | string;
  sourceId?: string | null;
  extractionCategory: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";
  startTime?: string | null;
  completionTime?: string | null;
  documentsDiscovered: number;
  documentsProcessed: number;
  recordsExtracted: number;
  errors: string[];
  retryCount: number;
  reviewStatus: string;
  logs: string[];
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

// src/types/knowledgeHub.ts
// Phase 3 — GOVENICS AI Knowledge Hub & Agent Intelligence Engine
// Universal Knowledge Taxonomy, Document Types, and Metadata Schema

export type GovenicsOffering =
  | "regulatory-compliance"
  | "labour-employment"
  | "environmental-ehs"
  | "licensing-permits"
  | "taxation-trade"
  | "export-trade"
  | "supply-chain"
  | "escrow-services"
  | "enterprise-governance"
  | "risk-management"
  | "esg-sustainability"
  | "cybersecurity-data";

export interface OfferingDefinition {
  id: GovenicsOffering;
  name: string;
  code: string;
  description: string;
  applicableRegulators: string[];
}

export const GOVENICS_OFFERINGS: Record<GovenicsOffering, OfferingDefinition> = {
  "regulatory-compliance": {
    id: "regulatory-compliance",
    name: "Regulatory Compliance",
    code: "REG",
    description: "Central & state statutory compliance, filings, and audit readiness",
    applicableRegulators: ["RBI", "SEBI", "MCA", "TRAI", "IRDAI", "CPCB"]
  },
  "labour-employment": {
    id: "labour-employment",
    name: "Labour & Employment",
    code: "LEI",
    description: "Consolidated Labour Codes, POSH, EPF, ESI, gratuity, and state shops & establishments",
    applicableRegulators: ["Ministry of Labour", "EPFO", "ESIC", "State Labour Commissioners"]
  },
  "environmental-ehs": {
    id: "environmental-ehs",
    name: "Environmental & EHS",
    code: "EHS",
    description: "Pollution control, CTE/CTO consents, hazardous waste, ISO 14001/45001, and industrial safety",
    applicableRegulators: ["MoEFCC", "CPCB", "SPCB", "PESO", "Factory Inspectorate"]
  },
  "licensing-permits": {
    id: "licensing-permits",
    name: "Licensing & Permits",
    code: "LIC",
    description: "FSSAI, trade licences, factory permits, municipal clearances, and state approvals",
    applicableRegulators: ["FSSAI", "Municipal Corporations", "State Licensing Authorities"]
  },
  "taxation-trade": {
    id: "taxation-trade",
    name: "Taxation & Trade",
    code: "TAX",
    description: "Direct tax, GST statutory returns, professional tax, withholding taxes, and audit assessments",
    applicableRegulators: ["CBDT", "CBIC", "GSTN", "State Commercial Taxes"]
  },
  "export-trade": {
    id: "export-trade",
    name: "Export & Trade Services",
    code: "EXP",
    description: "DGFT foreign trade policy, customs compliance, IEC, SEZ, bonded warehousing, and FEMA",
    applicableRegulators: ["DGFT", "Indian Customs (CBIC)", "RBI (FEMA)", "SEZ Development Commissioners"]
  },
  "supply-chain": {
    id: "supply-chain",
    name: "Supply Chain Compliance",
    code: "SCC",
    description: "Vendor due diligence, contractor labour compliance, anti-bribery, and tier-1/2 audits",
    applicableRegulators: ["CLRA Authorities", "Ministry of Corporate Affairs", "Competition Commission"]
  },
  "escrow-services": {
    id: "escrow-services",
    name: "Escrow Services",
    code: "ESC",
    description: "Statutory escrow, M&A conditional accounts, project disbursements, and regulatory trust mechanisms",
    applicableRegulators: ["RBI", "SEBI", "RERA Authorities"]
  },
  "enterprise-governance": {
    id: "enterprise-governance",
    name: "Enterprise Governance",
    code: "GOV",
    description: "Companies Act 2013, secretarial standards, board oversight, related party transactions, and CSR",
    applicableRegulators: ["MCA", "RoC", "NCLT", "SEBI"]
  },
  "risk-management": {
    id: "risk-management",
    name: "Risk Management",
    code: "RSK",
    description: "Enterprise risk management (ERM), ISO 31000, COSO, operational risk, and KRI monitoring",
    applicableRegulators: ["RBI ERM Framework", "SEBI Risk Committee Mandates", "IRDAI"]
  },
  "esg-sustainability": {
    id: "esg-sustainability",
    name: "ESG & Sustainability",
    code: "ESG",
    description: "SEBI BRSR Core, Scope 1-3 carbon accounting, net zero roadmaps, and sustainability disclosures",
    applicableRegulators: ["SEBI (BRSR)", "BEE (Energy Conservation)", "MoEFCC"]
  },
  "cybersecurity-data": {
    id: "cybersecurity-data",
    name: "Cybersecurity & Privacy",
    code: "CYB",
    description: "DPDP Act 2023, ISO 27001:2022, CERT-In cybersecurity directives, SOC 2, and data breach response",
    applicableRegulators: ["Data Protection Board of India (DPBI)", "CERT-In", "MeitY", "RBI Cyber Security"]
  }
};

export type IndustrySector =
  | "Manufacturing & Industrial"
  | "Automotive & Auto Components"
  | "Pharmaceuticals & Medical Devices"
  | "Healthcare"
  | "Electronics & Semiconductors"
  | "Chemicals & Petrochemicals"
  | "Textiles"
  | "Food Processing"
  | "Banking & Financial Services"
  | "BFSI & Fintech"
  | "IT & Technology"
  | "Logistics & Supply Chain"
  | "Infrastructure"
  | "Energy & Utilities"
  | "Retail & E-commerce"
  | "Telecommunications"
  | "Exporters & International Trade"
  | "Global Capability Centres"
  | "Cross-Industry";

export const INDUSTRY_SECTORS: IndustrySector[] = [
  "Manufacturing & Industrial",
  "Automotive & Auto Components",
  "Pharmaceuticals & Medical Devices",
  "Healthcare",
  "Electronics & Semiconductors",
  "Chemicals & Petrochemicals",
  "Textiles",
  "Food Processing",
  "Banking & Financial Services",
  "BFSI & Fintech",
  "IT & Technology",
  "Logistics & Supply Chain",
  "Infrastructure",
  "Energy & Utilities",
  "Retail & E-commerce",
  "Telecommunications",
  "Exporters & International Trade",
  "Global Capability Centres",
  "Cross-Industry"
];

export type DocumentType =
  | "Statutory / Legal Source"
  | "Regulatory Guidance"
  | "Internal Policy"
  | "Standard Operating Procedure"
  | "Compliance Checklist"
  | "Risk Framework"
  | "Audit Template"
  | "Research Report"
  | "E-book"
  | "Whitepaper"
  | "Training Material"
  | "Case Study"
  | "Advisory / Best Practice";

export const DOCUMENT_TYPES: DocumentType[] = [
  "Statutory / Legal Source",
  "Regulatory Guidance",
  "Internal Policy",
  "Standard Operating Procedure",
  "Compliance Checklist",
  "Risk Framework",
  "Audit Template",
  "Research Report",
  "E-book",
  "Whitepaper",
  "Training Material",
  "Case Study",
  "Advisory / Best Practice"
];

// Strict 8-tier trust states
export type TrustState =
  | "Verified Primary Source"
  | "Verified Secondary Source"
  | "Reviewed Internal Knowledge"
  | "Needs Enrichment"
  | "Needs Legal Review"
  | "Placeholder / Incomplete"
  | "Source Missing"
  | "Rejected";

export type ApprovalStatus = "Draft" | "Under Review" | "Approved" | "Rejected";

export type ProcessingStatus =
  | "Uploaded"
  | "Processing"
  | "Extraction Failed"
  | "Metadata Review"
  | "Content Review"
  | "Pending Approval"
  | "Approved"
  | "Indexed"
  | "Rejected"
  | "Archived"
  | "Reprocessing Required";

export interface KnowledgeChunk {
  id: string;                         // e.g. "KN-2026-0042-C01"
  documentId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  sectionHeader?: string;
  pageNumber?: number;
  clauseReference?: string;
  embeddingVector?: number[];        // Semantic vector representation
  keywords: string[];
}

export interface KnowledgeDocument {
  id: string;
  recordId: string;
  title: string;
  enrichedTitle: string;
  offering: GovenicsOffering;
  industry: IndustrySector;
  documentType: DocumentType;
  jurisdiction: {
    country: string;
    state?: string;
    applicableRegulator: string;
    industryAuthority?: string;
  };
  fileMetadata: {
    originalFileName: string;
    fileExtension: string;
    mimeType: string;
    fileSizeBytes: number;
    fileHashSha256: string;
    storageUrl?: string;
    pageCount?: number;
  };
  summary: string;
  extractedTextSnippet?: string;
  chunkCount: number;
  chunks?: KnowledgeChunk[];
  trustState: TrustState;
  approvalStatus: ApprovalStatus;
  isEligibleForAiRetrieval: boolean;
  version: string;
  effectiveDate?: string;
  lastAmendedDate?: string;
  lastReviewedDate: string;
  reviewedBy?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  processingStatus: ProcessingStatus;
  processingError?: string;
  tags: string[];
  externalSourceUrl?: string;
  statutoryReference?: string;
  deleted?: boolean;
}

export interface AgentProfile {
  agentId: string;
  agentName: string;
  roleTitle: string;
  description: string;
  purpose?: string;
  permittedOfferings: GovenicsOffering[];
  approvedKnowledgeCollections?: GovenicsOffering[];
  permittedIndustries: IndustrySector[];
  supportedIndustries?: IndustrySector[];
  permittedJurisdictions: string[];
  supportedJurisdictions?: string[];
  allowedTools?: string[];
  permissionLevel?: "Public" | "Standard" | "ComplianceOfficer" | "Admin";
  accessLevel: "Public" | "Internal" | "Restricted" | "Confidential";
  minConfidenceThreshold: number;     // e.g. 0.45 - 0.60
  retrievalConfiguration?: {
    minConfidenceThreshold: number;
    topK: number;
    requireCitations: boolean;
  };
  modelConfiguration?: {
    provider: string;
    modelName: string;
    temperature: number;
    maxTokens: number;
  };
  citationRequirements?: string;
  responseFormat?: "StructuredMarkdown" | "ExecutiveBrief" | "ChecklistGrid" | "RiskRegister" | "FormalPolicy";
  requireCitations: boolean;
  isActive: boolean;
  version?: string;
  lastUpdated?: string;
  systemPromptGrounded: string;
}

export interface RetrievalQuery {
  query: string;
  agentId?: string;
  offering?: GovenicsOffering;
  industry?: IndustrySector;
  documentType?: DocumentType;
  jurisdiction?: string;
  minTrustState?: TrustState;
  topK?: number;
}

export interface RetrievalCitation {
  documentId: string;
  documentTitle: string;
  offering: GovenicsOffering;
  industry: IndustrySector;
  jurisdiction: string;
  regulator: string;
  documentType: DocumentType;
  sectionOrPage?: string;
  statutoryReference?: string;
  sourceUrl?: string;
  effectiveDate?: string;
  version: string;
  trustState: TrustState;
  confidenceScore: number;
}

export interface RetrievalResult {
  query: string;
  agentId?: string;
  evidenceFound: boolean;
  confidenceScore: number;
  retrievedChunks: {
    chunkId: string;
    documentId: string;
    documentTitle: string;
    content: string;
    pageNumber?: number;
    sectionHeader?: string;
    relevanceScore: number;
  }[];
  citations: RetrievalCitation[];
  groundedAnswer?: string;
  fallbackMessage?: string;
  quarantinedNotice?: string;
  processingTimeMs: number;
}

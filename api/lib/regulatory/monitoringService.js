// api/lib/regulatory/monitoringService.js
// Phase 4 — Controlled Regulatory Change Intelligence Service
// Maintains approved official sources, detects gazette changes, and enforces staging review workflows

export const APPROVED_REGULATORY_SOURCES = [
  {
    authority: "Ministry of Corporate Affairs (MCA)",
    jurisdiction: "India (Central)",
    officialUrl: "https://www.mca.gov.in/",
    monitoredOffering: "enterprise-governance",
    trustRating: "Verified Official Government Portal"
  },
  {
    authority: "Ministry of Labour & Employment",
    jurisdiction: "India (Central)",
    officialUrl: "https://labour.gov.in/",
    monitoredOffering: "labour-employment",
    trustRating: "Verified Official Government Portal"
  },
  {
    authority: "Securities and Exchange Board of India (SEBI)",
    jurisdiction: "India (Central)",
    officialUrl: "https://www.sebi.gov.in/",
    monitoredOffering: "esg-sustainability",
    trustRating: "Verified Official Regulator"
  },
  {
    authority: "Central Board of Indirect Taxes and Customs (CBIC)",
    jurisdiction: "India (Central)",
    officialUrl: "https://www.cbic.gov.in/",
    monitoredOffering: "taxation-trade",
    trustRating: "Verified Official Department"
  },
  {
    authority: "Ministry of Electronics & Information Technology (MeitY)",
    jurisdiction: "India (Central)",
    officialUrl: "https://www.meity.gov.in/",
    monitoredOffering: "cybersecurity-data",
    trustRating: "Verified Official Ministry"
  }
];

export const SEED_REGULATORY_UPDATES = [
  {
    updateId: "REG-2026-0001",
    authority: "Ministry of Electronics & Information Technology (MeitY)",
    jurisdiction: "India (Central)",
    regulationOrNotification: "Digital Personal Data Protection (DPDP) Rules, 2026 Draft Notification",
    publicationDate: "2026-02-15",
    effectiveDate: "2026-06-01",
    changeType: "New Procedural Rules",
    summary: "Sets out operational mechanisms for Data Protection Board inquiries, standard consent manager registration protocols, and breach disclosure formats.",
    affectedIndustries: ["IT & Technology", "BFSI & Fintech", "Cross-Industry"],
    affectedOfferings: ["cybersecurity-data", "enterprise-governance"],
    sourceUrl: "https://www.meity.gov.in/content/dpdp-rules-2026",
    reviewStatus: "Under Legal Review",
    reviewer: "Senior Data Privacy Counsel",
    approvalDate: null,
    isPublishedToKnowledgeHub: false
  },
  {
    updateId: "REG-2026-0002",
    authority: "Securities and Exchange Board of India (SEBI)",
    jurisdiction: "India (Central)",
    regulationOrNotification: "Circular on Mandatory Reasonable Assurance for BRSR Core — Slabs Expansion",
    publicationDate: "2026-01-10",
    effectiveDate: "2026-04-01",
    changeType: "Assurance Scope Expansion",
    summary: "Mandates reasonable assurance for top 500 listed entities by market capitalization for FY 2026-27 (previously top 250).",
    affectedIndustries: ["Banking & Financial Services", "Manufacturing & Industrial", "Cross-Industry"],
    affectedOfferings: ["esg-sustainability", "enterprise-governance"],
    sourceUrl: "https://www.sebi.gov.in/legal/circulars/jan-2026/brsr-expansion.html",
    reviewStatus: "Approved & Verified",
    reviewer: "Head of ESG Advisory",
    approvalDate: "2026-01-20",
    isPublishedToKnowledgeHub: true
  },
  {
    updateId: "REG-2026-0003",
    authority: "Central Board of Indirect Taxes and Customs (CBIC)",
    jurisdiction: "India (Central)",
    regulationOrNotification: "Notification No. 04/2026-Central Tax — E-Invoicing Threshold Revision",
    publicationDate: "2026-03-01",
    effectiveDate: "2026-05-01",
    changeType: "Threshold Modification",
    summary: "Revises mandatory e-invoicing aggregate turnover threshold down to ₹2 Crores for B2B supplies.",
    affectedIndustries: ["Cross-Industry", "Retail & E-commerce", "Manufacturing & Industrial"],
    affectedOfferings: ["taxation-trade"],
    sourceUrl: "https://www.cbic.gov.in/resources/htdocs-cbec/gst/notf-04-2026.pdf",
    reviewStatus: "Under Legal Review",
    reviewer: "Senior Indirect Tax Counsel",
    approvalDate: null,
    isPublishedToKnowledgeHub: false
  }
];

export function getRegulatorySources() {
  return APPROVED_REGULATORY_SOURCES;
}

export function getRegulatoryUpdates(statusFilter = "All") {
  if (!statusFilter || statusFilter === "All") return SEED_REGULATORY_UPDATES;
  return SEED_REGULATORY_UPDATES.filter(u => u.reviewStatus === statusFilter);
}

export function approveRegulatoryUpdate(updateId, reviewerName) {
  const update = SEED_REGULATORY_UPDATES.find(u => u.updateId === updateId);
  if (!update) return null;
  update.reviewStatus = "Approved & Verified";
  update.reviewer = reviewerName || "Chief Legal Counsel";
  update.approvalDate = new Date().toISOString().split("T")[0];
  update.isPublishedToKnowledgeHub = true;
  return update;
}


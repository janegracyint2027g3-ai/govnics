/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * GOVENICS GRC — EMAIL CONTENT LIBRARY CONFIGURATION
 * Version: 1.0.0
 * ───────────────────────────────────────────────────────────────────────────────
 * This file defines the complete content architecture for the GOVENICS GRC
 * enterprise email template library.
 *
 * Structure:
 *   BRAND_CONFIG         — Global brand constants
 *   INDUSTRY_CLUSTERS    — 9 industry clusters with subindustries
 *   OFFERING_REGISTRY    — All verified GOVENICS services and offerings
 *   EMAIL_TYPE_REGISTRY  — 6 email type definitions and writing rules
 *   SPICED_RULES         — SPICED framework application rules
 *   STAT_CARD_REGISTRY   — Reusable stat card configurations by industry
 *   TEMPLATE_MANIFEST    — Complete mapping: industry × offering × email type
 *   BANNED_WORDS         — Words that must never appear in generated copy
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export const BRAND_CONFIG = {
  name: "GOVENICS GRC",
  legalName: "Industrial Security Investigators (P) Ltd. (ISI Group)",
  tagline: "Enterprise GRC Advisory",
  division: "A Division of ISI Group",
  website: "https://govnics-murex.vercel.app",
  contactEmail: "contact@govenics.grc",
  address: "No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai, Tamil Nadu 600092, India",
  linkedIn: "https://www.linkedin.com/company/govenics",
  certifications: ["CERT-In Empanelled", "ISO Advisory", "A Division of ISI Group (Est. 1985)"],
  colors: {
    navyDark: "#0A1628",
    navyMid: "#1E3A5F",
    navyLight: "#1E40AF",
    gold: "#B8942A",
    lightBlue: "#7FB3D3",
    white: "#FFFFFF",
    bodyBg: "#F0F4F8",
    cardBg: "#F7F9FC",
    textDark: "#111827",
    textMid: "#374151",
    textLight: "#6B7280",
    borderColor: "#E5E9F0",
  },
  senderName: "GOVENICS GRC Advisory",
  replyTo: "contact@govenics.grc",
};

// ─────────────────────────────────────────────────────────────────────────────
// BANNED WORDS (must never appear in generated copy)
// ─────────────────────────────────────────────────────────────────────────────
export const BANNED_WORDS = [
  "Unlock", "Transform", "Accelerate", "Synergy", "Game-changer", "Delve",
  "unlock", "transform", "accelerate", "synergy", "game-changer", "delve",
  "game changer", "Game changer",
];

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
export const EMAIL_TYPES = {
  WELCOME: {
    id: "welcome",
    name: "Welcome Email",
    purpose: "Welcome a new lead, subscriber, or assessment requester.",
    maxBodyWords: 180,
    subjectMaxWords: 6,
    tone: ["helpful", "professional", "reassuring", "informative"],
    spicedRequired: ["Situation", "Decision"],
    hasCriticalEvent: false,
    hasStatCards: false,
  },
  PROMOTIONAL: {
    id: "promotional",
    name: "Promotional Email",
    purpose: "Generate interest in a specific GOVENICS service or offering.",
    maxBodyWords: 125,
    subjectMaxWords: 6,
    tone: ["authoritative", "commercially relevant", "insight-led"],
    spicedRequired: ["Situation", "Pain", "Impact", "Decision"],
    hasCriticalEvent: false,
    hasStatCards: true,
  },
  BUSINESS_VALUE: {
    id: "business-value",
    name: "Business-Value Email",
    purpose: "Explain the business case for addressing a GRC, ESG, trade, or cybersecurity challenge.",
    maxBodyWords: 150,
    subjectMaxWords: 6,
    tone: ["executive", "concise", "evidence-led"],
    spicedRequired: ["Situation", "Pain", "Impact", "Decision"],
    hasCriticalEvent: false,
    hasStatCards: true,
  },
  ADVERTISING: {
    id: "advertising",
    name: "Advertising / Campaign Email",
    purpose: "Promote a verified service, report, assessment, or campaign asset.",
    maxBodyWords: 125,
    subjectMaxWords: 6,
    tone: ["campaign", "compelling", "accurate"],
    spicedRequired: ["Situation", "Pain", "Decision"],
    hasCriticalEvent: true,
    hasStatCards: true,
  },
  REENGAGEMENT: {
    id: "re-engagement",
    name: "Re-Engagement Email",
    purpose: "Reconnect with an inactive lead or prospect.",
    maxBodyWords: 120,
    subjectMaxWords: 6,
    tone: ["natural", "fresh", "low-pressure"],
    spicedRequired: ["Situation", "Pain", "Decision"],
    hasCriticalEvent: false,
    hasStatCards: false,
  },
  LEAD_GENERATION: {
    id: "lead-generation",
    name: "Lead-Generation / Assessment Email",
    purpose: "Encourage qualified prospects to request an assessment or consultation.",
    maxBodyWords: 130,
    subjectMaxWords: 6,
    tone: ["advisory", "specific", "professional"],
    spicedRequired: ["Situation", "Pain", "Impact", "Critical Event", "Decision"],
    hasCriticalEvent: true,
    hasStatCards: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY CLUSTER REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
export const INDUSTRY_CLUSTERS = {
  BFSI: {
    id: "bfsi",
    name: "BFSI & Financial Services",
    slug: "financial-services",
    pageUrl: "/industries/financial-services",
    subindustries: [
      { id: "banking", name: "Commercial & Cooperative Banking" },
      { id: "nbfcs", name: "NBFCs & Capital Markets" },
      { id: "insurance", name: "Insurance Companies & Intermediaries" },
      { id: "payments", name: "Payment Aggregators & Gateways" },
      { id: "microfinance", name: "Microfinance & Rural Lending" },
      { id: "wealth-management", name: "Wealth & Asset Management" },
      { id: "fintech-payments", name: "Fintech & Digital Payments" },
    ],
    targetRoles: ["CRO", "CFO", "CCO", "Head of Compliance", "CTO", "Internal Audit Head"],
    regulatoryContext: ["RBI", "SEBI", "IRDAI", "PMLA", "PCI-DSS", "DPDP Act"],
    primaryOfferings: [
      "regulatory-compliance", "enterprise-risk-management",
      "cybersecurity-iso27001", "data-privacy-dpdp",
      "internal-audit", "governance-framework", "vendor-risk-management"
    ],
  },
  MANUFACTURING: {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    slug: "manufacturing-industrial",
    pageUrl: "/industries/manufacturing-industrial",
    subindustries: [
      { id: "automobiles", name: "Automotive Manufacturing" },
      { id: "auto-components", name: "Auto Components & Ancillaries" },
      { id: "engineering-capital-goods", name: "Capital Goods & Heavy Machinery" },
      { id: "defence-manufacturing", name: "Defence & Aerospace Manufacturing" },
      { id: "msme", name: "MSME Manufacturing" },
      { id: "chemicals-specialty", name: "Chemicals & Specialty Coatings" },
    ],
    targetRoles: ["CEO", "COO", "Head of EHS", "CFO", "Plant Head", "Supply Chain Director"],
    regulatoryContext: ["Factories Act 1948", "ISO 14001", "ISO 45001", "IATF 16949", "MSIHC Rules", "PESO"],
    primaryOfferings: [
      "regulatory-compliance", "enterprise-risk-management",
      "esg-sustainability", "vendor-risk-management", "internal-audit"
    ],
  },
  TECHNOLOGY: {
    id: "technology",
    name: "Technology & Electronics",
    slug: "technology-electronics",
    pageUrl: "/industries/technology-electronics",
    subindustries: [
      { id: "it-bpm", name: "IT & BPM Services" },
      { id: "electronics-semiconductor", name: "Electronics & Semiconductor" },
      { id: "telecommunications", name: "Telecommunications & Digital Infrastructure" },
      { id: "electric-vehicles", name: "Electric Vehicles & Clean Mobility" },
      { id: "cybersecurity-services", name: "Cybersecurity & InfoSec Services" },
      { id: "fintech-digital-payments", name: "Fintech & Digital Payments" },
    ],
    targetRoles: ["CTO", "CISO", "CRO", "DPO", "Head of Compliance", "VP Engineering"],
    regulatoryContext: ["DPDP Act 2023", "ISO 27001", "SOC 2", "CERT-In Directives", "DoT", "E-Waste Rules"],
    primaryOfferings: [
      "cybersecurity-iso27001", "data-privacy-dpdp",
      "incident-response", "vendor-risk-management",
      "regulatory-compliance", "governance-framework"
    ],
  },
  INFRASTRUCTURE: {
    id: "infrastructure",
    name: "Infrastructure & Construction",
    slug: "infrastructure-construction",
    pageUrl: "/industries/infrastructure-construction",
    subindustries: [
      { id: "real-estate", name: "Real Estate & Urban Development" },
      { id: "roads-highways", name: "Highways & Transport Infrastructure" },
      { id: "cement", name: "Cement & Building Materials" },
      { id: "steel", name: "Steel & Basic Metals" },
      { id: "ports-logistics", name: "Ports & Logistics Hubs" },
      { id: "metro-rail-transit", name: "Urban Metro & Rail Transit" },
    ],
    targetRoles: ["CEO", "COO", "Head of EHS", "Project Director", "CFO", "Legal Head"],
    regulatoryContext: ["RERA Act", "BOCW Act", "Mines Act", "CPCB", "NHAI Guidelines", "Customs Act"],
    primaryOfferings: [
      "regulatory-compliance", "enterprise-risk-management",
      "esg-sustainability", "internal-audit", "vendor-risk-management"
    ],
  },
  ENERGY: {
    id: "energy",
    name: "Energy & Utilities",
    slug: "energy-utilities",
    pageUrl: "/industries/energy-utilities",
    subindustries: [
      { id: "renewable-energy", name: "Renewable Energy (Solar & Wind)" },
      { id: "oil-gas", name: "Oil, Gas & Refining" },
      { id: "power-grid", name: "Power Transmission & Distribution" },
      { id: "mining", name: "Mining & Mineral Operations" },
      { id: "bioenergy", name: "Biomass & Waste-to-Energy" },
      { id: "hydrogen-gas", name: "Industrial Gas & Clean Hydrogen" },
    ],
    targetRoles: ["CEO", "COO", "Head of HSE", "Regulatory Affairs Director", "CFO"],
    regulatoryContext: ["CERC", "Electricity Act 2003", "PESO", "CPCB", "DGMS", "Mines Act"],
    primaryOfferings: [
      "regulatory-compliance", "esg-sustainability",
      "enterprise-risk-management", "internal-audit", "cybersecurity-iso27001"
    ],
  },
  HEALTHCARE: {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    slug: "healthcare-life-sciences",
    pageUrl: "/industries/healthcare-life-sciences",
    subindustries: [
      { id: "healthcare", name: "Hospitals & Healthcare Networks" },
      { id: "pharmaceuticals", name: "Pharmaceuticals & Formulations" },
      { id: "medical-devices", name: "Medical Devices & Diagnostics" },
      { id: "biotechnology", name: "Biotechnology & Clinical Research" },
      { id: "diagnostic-labs", name: "Diagnostic & Pathology Laboratories" },
      { id: "ayush", name: "AYUSH & Integrative Medicine" },
      { id: "pharmaceutical-manufacturing", name: "Pharmaceutical Manufacturing" },
      { id: "healthcare-delivery", name: "Healthcare Delivery Systems" },
    ],
    targetRoles: ["CEO", "COO", "Quality Head", "Regulatory Affairs Director", "DPO", "Medical Director"],
    regulatoryContext: ["NABH", "CDSCO", "Drugs & Cosmetics Act", "DPDP Act", "Bio-Medical Waste Rules", "NABL"],
    primaryOfferings: [
      "regulatory-compliance", "accreditation-services",
      "data-privacy-dpdp", "vendor-risk-management", "internal-audit"
    ],
  },
  FOOD_PROCESSING: {
    id: "food-processing",
    name: "Food Processing",
    slug: "food-processing-pharma-healthcare",
    pageUrl: "/industries/food-processing-pharma-healthcare",
    subindustries: [
      { id: "food-processing", name: "Food Processing & Packaged Goods" },
      { id: "dairy-beverages", name: "Dairy, Beverages & Breweries" },
      { id: "cold-chain", name: "Cold Chain & Perishable Logistics" },
      { id: "nutraceuticals", name: "Nutraceuticals & Health Supplements" },
    ],
    targetRoles: ["CEO", "Quality Director", "Supply Chain Head", "Regulatory Affairs", "COO"],
    regulatoryContext: ["FSSAI Act 2006", "ISO 22000", "Legal Metrology", "BIS", "HACCP"],
    primaryOfferings: [
      "regulatory-compliance", "internal-audit",
      "vendor-risk-management", "esg-sustainability"
    ],
  },
  CONSUMER_RETAIL: {
    id: "consumer-retail",
    name: "Consumer & Retail",
    slug: "consumer-retail",
    pageUrl: "/industries/consumer-retail",
    subindustries: [
      { id: "retail", name: "Retail Stores & Supermarkets" },
      { id: "textiles", name: "Textiles, Garments & Apparel" },
      { id: "ecommerce", name: "E-Commerce & Digital Marketplaces" },
      { id: "jewellery", name: "Gems, Jewellery & Luxury Retail" },
      { id: "consumer-durables", name: "Consumer Durables & Electronics" },
      { id: "quick-commerce", name: "Quick Commerce & Hyperlocal Delivery" },
    ],
    targetRoles: ["CEO", "COO", "Legal Head", "CTO", "Head of Compliance", "CFO"],
    regulatoryContext: ["Consumer Protection Act", "DPDP Act", "Legal Metrology", "BIS", "E-Waste Rules"],
    primaryOfferings: [
      "regulatory-compliance", "data-privacy-dpdp",
      "vendor-risk-management", "internal-audit", "esg-sustainability"
    ],
  },
  MEDIA_SERVICES: {
    id: "media-services",
    name: "Media & Services",
    slug: "media-services",
    pageUrl: "/industries/media-services",
    subindustries: [
      { id: "education-training", name: "Higher Education & Training Institutions" },
      { id: "tourism-hospitality", name: "Hospitality & Hotels" },
      { id: "media-entertainment", name: "Media & Entertainment" },
      { id: "aviation", name: "Aviation, Airlines & Airport Hubs" },
      { id: "broadcasting", name: "Television Broadcasting & Cable Networks" },
      { id: "sports-events", name: "Sports Leagues, Arenas & Large Events" },
    ],
    targetRoles: ["CEO", "COO", "Legal Head", "Quality Head", "Regulatory Affairs", "CFO"],
    regulatoryContext: ["UGC", "AICTE", "DGCA", "Ministry of Tourism", "MIB", "TRAI", "FSSAI"],
    primaryOfferings: [
      "regulatory-compliance", "accreditation-services",
      "data-privacy-dpdp", "internal-audit", "governance-framework"
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// OFFERING REGISTRY (Verified GOVENICS services)
// Source: /grc, /cybersecurity, /esg, /solutions, /sgrc/services pages
// ─────────────────────────────────────────────────────────────────────────────
export const OFFERING_REGISTRY = {
  "regulatory-compliance": {
    id: "regulatory-compliance",
    title: "Regulatory Compliance Management",
    category: "Governance & Risk Advisory",
    shortDesc: "End-to-end compliance tracking across RBI, SEBI, CPCB, FSSAI, and 100+ statutory bodies.",
    pageUrl: "/services/regulatory-compliance",
    deliverables: ["Compliance Register", "Statutory Filing Calendar", "Audit Readiness Report"],
  },
  "enterprise-risk-management": {
    id: "enterprise-risk-management",
    title: "Enterprise Risk Management (ERM)",
    category: "Governance & Risk Advisory",
    shortDesc: "RCSA frameworks, KRI dashboards, and dynamic risk registers across all business units.",
    pageUrl: "/services/enterprise-risk-management",
    deliverables: ["RCSA Framework", "KRI Dashboard", "Risk Heat Map"],
  },
  "governance-framework": {
    id: "governance-framework",
    title: "Governance Framework Design",
    category: "Governance & Risk Advisory",
    shortDesc: "Board charters, delegation of authority matrices, and ethics and whistleblower frameworks.",
    pageUrl: "/services/governance-framework",
    deliverables: ["Board Charter", "DoA Matrix", "Ethics Policy Framework"],
  },
  "internal-audit": {
    id: "internal-audit",
    title: "Internal Audit Services",
    category: "Audit & Assurance",
    shortDesc: "Compliance-integrated audit cycles identifying operational loopholes before regulators do.",
    pageUrl: "/services/internal-audit",
    deliverables: ["Audit Report", "Control Gap Matrix", "Management Action Tracker"],
  },
  "data-privacy-dpdp": {
    id: "data-privacy-dpdp",
    title: "Data Privacy & DPDP Compliance",
    category: "Digital Trust & Cybersecurity",
    shortDesc: "DPDP Act, GDPR, and HIPAA audit and implementation under India's data protection regime.",
    pageUrl: "/services/data-privacy-dpdp",
    deliverables: ["Data Processing Register", "Consent Manager Framework", "Breach Response Plan"],
  },
  "cybersecurity-iso27001": {
    id: "cybersecurity-iso27001",
    title: "Cybersecurity & ISO 27001",
    category: "Digital Trust & Cybersecurity",
    shortDesc: "ISMS implementation, VAPT, and ISO 27001 / SOC 2 Type II audit certification readiness.",
    pageUrl: "/cybersecurity",
    deliverables: ["ISMS Policy Suite", "VAPT Report", "ISO 27001 Gap Analysis"],
  },
  "vendor-risk-management": {
    id: "vendor-risk-management",
    title: "Vendor & Third-Party Risk Management",
    category: "Governance & Risk Advisory",
    shortDesc: "Third-party due diligence, security questionnaire audits, and supply chain risk scoring.",
    pageUrl: "/services/vendor-risk-management",
    deliverables: ["Vendor Risk Register", "Supply Chain Due Diligence Report", "Vendor Scorecard"],
  },
  "esg-sustainability": {
    id: "esg-sustainability",
    title: "ESG & Sustainability Reporting",
    category: "Governance & Risk Advisory",
    shortDesc: "SEBI BRSR, GRI, TCFD-aligned sustainability frameworks with carbon and waste tracking.",
    pageUrl: "/esg",
    deliverables: ["BRSR Report", "Carbon Footprint Baseline", "ESG Governance Framework"],
  },
  "incident-response": {
    id: "incident-response",
    title: "Incident Response & CERT-In Support",
    category: "Digital Trust & Cybersecurity",
    shortDesc: "6-hour CERT-In incident reporting, forensic investigation, and business continuity plans.",
    pageUrl: "/services/incident-response",
    deliverables: ["Incident Response Plan", "CERT-In Filing Framework", "Forensic Drill Report"],
  },
  "accreditation-services": {
    id: "accreditation-services",
    title: "Accreditation & Certification Services",
    category: "Audit & Assurance",
    shortDesc: "NABH, NAAC, NABL, and ISO certification preparation and mock audit support.",
    pageUrl: "/services/accreditation-services",
    deliverables: ["Gap Analysis Report", "Accreditation Checklist", "Mock Audit Report"],
  },
  "compliance-risk-audit": {
    id: "compliance-risk-audit",
    title: "Compliance Risk Audit & Due Diligence",
    category: "Statutory GRC",
    shortDesc: "Labour law due diligence, board risk shield, and vendor audit services.",
    pageUrl: "/sgrc/services/compliance-risk-audit",
    deliverables: ["Labour Law Compliance Report", "Board Risk Summary", "Vendor Audit Report"],
  },
  "payroll-compliance": {
    id: "payroll-compliance",
    title: "Payroll Compliance Services",
    category: "Statutory GRC",
    shortDesc: "PF, ESIC, Professional Tax, and Labour Welfare Fund statutory integrations and filings.",
    pageUrl: "/sgrc/services/payroll-compliance",
    deliverables: ["Monthly Challan Reports", "Statutory Compliance Certificate", "Payroll Audit Report"],
  },
  "establishment-compliances": {
    id: "establishment-compliances",
    title: "Establishment Compliances",
    category: "Statutory GRC",
    shortDesc: "Shop & Establishment registrations, trade licenses, and display mandate compliance.",
    pageUrl: "/sgrc/services/establishment-compliances",
    deliverables: ["License Register", "Renewal Calendar", "State-wise Compliance Dashboard"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD CONFIGURATIONS BY INDUSTRY
// NOTE: All figures are indicative assessment dimensions, not guaranteed results.
// ─────────────────────────────────────────────────────────────────────────────
export const STAT_CARDS = {
  bfsi: {
    welcome: [
      { label: "Compliance Domains", metric: "12+", note: "RBI, SEBI, IRDAI & AML/CFT" },
      { label: "Risk Areas Reviewed", metric: "6", note: "Operational, cyber, credit, market, regulatory, vendor" },
      { label: "Reporting Cadences", metric: "Monthly", note: "Board, regulator, and audit committee" },
      { label: "Assessment Timeline", metric: "3–4 Wks", note: "Typical readiness review duration" },
    ],
    promotional: [
      { label: "RBI Directions Mapped", metric: "150+", note: "Source: RBI Master Direction Index" },
      { label: "Audit Prep Time", metric: "↓ 80%", note: "Indicative reduction vs. manual process" },
      { label: "Penalty Domains", metric: "RBI, SEBI, IRDAI", note: "Primary regulatory exposure areas" },
      { label: "Advisory Cycle", metric: "Ongoing", note: "Continuous compliance monitoring model" },
    ],
    leadGeneration: [
      { label: "Compliance Coverage", metric: "15+ Laws", note: "Banking Regulation Act, PMLA, IT Act & more" },
      { label: "Open Risk Items", metric: "Assessed", note: "Identified through gap review" },
      { label: "Upcoming Milestones", metric: "Q1 Filing", note: "Regulatory reporting calendar" },
      { label: "Third-Party Risk", metric: "Mapped", note: "Vendor & outsourcing review" },
    ],
  },
  manufacturing: {
    promotional: [
      { label: "EHS Registers", metric: "50+", note: "Factories Act statutory records" },
      { label: "Vendor Audit Items", metric: "Structured", note: "Tier-1 & Tier-2 supplier checks" },
      { label: "PESO License Areas", metric: "Chemical, Gas, Electrical", note: "Applicable to hazmat operations" },
      { label: "ESG Reporting", metric: "BRSR Ready", note: "SEBI mandate for listed entities" },
    ],
    leadGeneration: [
      { label: "Factory Compliance Acts", metric: "25+", note: "Central & state manufacturing laws" },
      { label: "EHS Review Scope", metric: "Site-wide", note: "Shopfloor, warehouse & contractor" },
      { label: "Reporting Overhead", metric: "Reducible", note: "Through compliance digitisation" },
      { label: "Audit Readiness", metric: "Assessment", note: "Pre-inspection readiness review" },
    ],
  },
  technology: {
    promotional: [
      { label: "DPDP Penalty Ceiling", metric: "₹250 Cr", note: "Per incident under DPDP Act 2023" },
      { label: "CERT-In Reporting Window", metric: "6 Hours", note: "Statutory incident reporting deadline" },
      { label: "ISO 27001 Domains", metric: "93 Controls", note: "ISO 27001:2022 Annex A" },
      { label: "SOC 2 Categories", metric: "5 TSCs", note: "Security, Availability, PI, Confidentiality, Privacy" },
    ],
    leadGeneration: [
      { label: "Information Assets", metric: "Catalogued", note: "Asset inventory as foundation of ISMS" },
      { label: "Privacy Risk Scope", metric: "Customer Data", note: "DPDP Act data fiduciary obligations" },
      { label: "Vendor Security", metric: "Third-Party Review", note: "Sub-service provider risk assessment" },
      { label: "Incident Readiness", metric: "6-Hr Plan", note: "CERT-In mandated response framework" },
    ],
  },
  healthcare: {
    promotional: [
      { label: "NABH Standards", metric: "100+ Criteria", note: "Hospital accreditation requirements" },
      { label: "DPDP Exposure", metric: "Patient Data", note: "Health records under data protection" },
      { label: "Bio-Medical Waste", metric: "8 Categories", note: "Statutory segregation categories" },
      { label: "Accreditation Timeline", metric: "6–12 Months", note: "Indicative preparation duration" },
    ],
    leadGeneration: [
      { label: "Quality Standards", metric: "NABH / JCI", note: "National & international accreditation" },
      { label: "Data Privacy", metric: "DPDP Act 2023", note: "Patient health records protection" },
      { label: "Vendor Governance", metric: "Supply Chain", note: "Third-party & outsourcing review" },
      { label: "Audit Readiness", metric: "Mock Audit", note: "Pre-accreditation preparation" },
    ],
  },
  energy: {
    promotional: [
      { label: "PESO License Areas", metric: "Explosives, Gas, Petroleum", note: "Hazardous storage permits" },
      { label: "BRSR ESG Mandate", metric: "SEBI Listed", note: "Mandatory for top 1000 listed companies" },
      { label: "CEMS Monitoring", metric: "24/7", note: "Continuous emissions monitoring" },
      { label: "DSM Penalty Scope", metric: "Grid Deviation", note: "CERC grid code compliance" },
    ],
    leadGeneration: [
      { label: "Environmental Clearances", metric: "EIA + SEIAA", note: "Project-stage approvals" },
      { label: "HSE Coverage", metric: "Site-Wide", note: "From plant to contractor workforce" },
      { label: "Carbon Reporting", metric: "GHG Baseline", note: "Scope 1, 2 emissions mapping" },
      { label: "Regulatory Filings", metric: "Annual Returns", note: "Multiple statutory bodies" },
    ],
  },
  food_processing: {
    promotional: [
      { label: "FSSAI Compliance Scope", metric: "Central License", note: "Manufacturing & multi-state ops" },
      { label: "Traceability Coverage", metric: "Farm-to-Fork", note: "Batch-level supply chain tracking" },
      { label: "HACCP Hazards", metric: "Biological, Chemical, Physical", note: "ISO 22000 hazard categories" },
      { label: "Legal Metrology", metric: "Packaged Rules", note: "Weight, measure & labeling laws" },
    ],
    leadGeneration: [
      { label: "FSSAI Readiness", metric: "Gap Review", note: "Licensing & compliance assessment" },
      { label: "Allergen Control", metric: "14 Major Allergens", note: "EU & FSSAI disclosure requirements" },
      { label: "Supply Chain Audit", metric: "Vendor-level", note: "Ingredient sourcing verification" },
      { label: "Recall Readiness", metric: "Crisis Plan", note: "Product withdrawal procedure" },
    ],
  },
  consumer_retail: {
    promotional: [
      { label: "Legal Metrology Scope", metric: "MRP, Weight, Label", note: "Packaged commodity rules" },
      { label: "DPDP Exposure", metric: "Customer PII", note: "Online buyer data protection" },
      { label: "E-Waste EPR Targets", metric: "Annual Quota", note: "Producer responsibility obligations" },
      { label: "Consumer Grievances", metric: "30-Day SLA", note: "Consumer Protection Rules 2020" },
    ],
    leadGeneration: [
      { label: "Shop License Review", metric: "All States", note: "Shop & Establishment currency check" },
      { label: "Data Privacy", metric: "DPDP Act 2023", note: "Customer data governance review" },
      { label: "Supply Chain Ethics", metric: "Vendor Audit", note: "SMETA / buyer social audit readiness" },
      { label: "Brand Risk", metric: "Compliance Gaps", note: "Legal & reputational exposure areas" },
    ],
  },
  media_services: {
    promotional: [
      { label: "NAAC Grade Scope", metric: "A+ Target", note: "National accreditation benchmark" },
      { label: "DGCA Requirements", metric: "Safety Audit", note: "Annual airworthiness review" },
      { label: "CBFC / OTT Codes", metric: "Content Rating", note: "Statutory certification requirements" },
      { label: "Student Data Privacy", metric: "DPDP Act 2023", note: "University records protection" },
    ],
    leadGeneration: [
      { label: "Accreditation Scope", metric: "NAAC / NBA / NABL", note: "Institutional quality standards" },
      { label: "Safety Compliance", metric: "Campus / Set / Fleet", note: "Site-specific EHS requirements" },
      { label: "Licensing Currency", metric: "UGC / DGCA / MIB", note: "Statutory license renewal review" },
      { label: "Data Protection", metric: "DPDP Act Review", note: "Student / subscriber / guest data" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SPICED FRAMEWORK RULES
// ─────────────────────────────────────────────────────────────────────────────
export const SPICED_RULES = {
  description: "SPICED is an internal quality-assurance framework. Do not print SPICED labels in the email body.",
  elements: {
    Situation: "Establish the target organization's industry, operational context, or business requirement.",
    Pain: "Identify a specific business, regulatory, operational, or governance challenge.",
    Impact: "Explain the potential consequence of leaving the issue unresolved.",
    CriticalEvent: "Identify a legitimate reason to act now (regulatory deadline, audit cycle, expansion).",
    Decision: "Offer one simple, relevant next step.",
  },
  notes: [
    "Not every email needs an explicit critical event.",
    "Welcome emails should prioritize relevance and the next step.",
    "Do not manufacture urgency or fabricate deadlines.",
    "Never print SPICED label names inside the email body.",
    "Cold and promotional bodies should remain under 125 words.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PERSONALIZATION VARIABLES (Token reference)
// ─────────────────────────────────────────────────────────────────────────────
export const PERSONALIZATION_TOKENS = {
  "{{FIRST_NAME}}": "Recipient's first name",
  "{{COMPANY_NAME}}": "Recipient's company name",
  "{{INDUSTRY_NAME}}": "Recipient's industry label",
  "{{SUBINDUSTRY_NAME}}": "Recipient's specific sub-sector",
  "{{ROLE_TITLE}}": "Recipient's job title",
  "{{OFFERING_NAME}}": "The relevant GOVENICS offering",
  "{{CTA_URL}}": "Call-to-action destination URL",
  "{{CTA_LABEL}}": "CTA button label",
  "{{CTA_SUBTEXT}}": "Text below the CTA button",
  "{{EMAIL_SUBJECT}}": "Email subject line",
  "{{UNSUBSCRIBE_URL}}": "Unsubscribe link",
  "{{CARD_1_LABEL}}": "Stat card 1 label",
  "{{CARD_1_METRIC}}": "Stat card 1 metric or status",
  "{{CARD_1_NOTE}}": "Stat card 1 explanatory note",
};

export default {
  BRAND_CONFIG,
  BANNED_WORDS,
  EMAIL_TYPES,
  INDUSTRY_CLUSTERS,
  OFFERING_REGISTRY,
  STAT_CARDS,
  SPICED_RULES,
  PERSONALIZATION_TOKENS,
};

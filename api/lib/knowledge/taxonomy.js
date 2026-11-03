// api/lib/knowledge/taxonomy.js
// Phase 3 — Backend Knowledge Taxonomy and Classification Constants

export const GOVENICS_OFFERINGS = {
  "regulatory-compliance": {
    name: "Regulatory Compliance",
    code: "REG",
    regulators: ["RBI", "SEBI", "MCA", "TRAI", "IRDAI", "CPCB"]
  },
  "labour-employment": {
    name: "Labour & Employment",
    code: "LEI",
    regulators: ["Ministry of Labour", "EPFO", "ESIC", "State Labour Commissioners"]
  },
  "environmental-ehs": {
    name: "Environmental & EHS",
    code: "EHS",
    regulators: ["MoEFCC", "CPCB", "SPCB", "PESO", "Factory Inspectorate"]
  },
  "licensing-permits": {
    name: "Licensing & Permits",
    code: "LIC",
    regulators: ["FSSAI", "Municipal Corporations", "State Licensing Authorities"]
  },
  "taxation-trade": {
    name: "Taxation & Trade",
    code: "TAX",
    regulators: ["CBDT", "CBIC", "GSTN", "State Commercial Taxes"]
  },
  "export-trade": {
    name: "Export & Trade Services",
    code: "EXP",
    regulators: ["DGFT", "Indian Customs", "RBI (FEMA)", "SEZ Development Commissioners"]
  },
  "supply-chain": {
    name: "Supply Chain Compliance",
    code: "SCC",
    regulators: ["CLRA Authorities", "MCA", "Competition Commission"]
  },
  "escrow-services": {
    name: "Escrow Services",
    code: "ESC",
    regulators: ["RBI", "SEBI", "RERA"]
  },
  "enterprise-governance": {
    name: "Enterprise Governance",
    code: "GOV",
    regulators: ["MCA", "RoC", "NCLT", "SEBI"]
  },
  "risk-management": {
    name: "Risk Management",
    code: "RSK",
    regulators: ["RBI ERM Framework", "SEBI Risk Committee", "IRDAI"]
  },
  "esg-sustainability": {
    name: "ESG & Sustainability",
    code: "ESG",
    regulators: ["SEBI (BRSR)", "BEE", "MoEFCC"]
  },
  "cybersecurity-data": {
    name: "Cybersecurity & Privacy",
    code: "CYB",
    regulators: ["DPBI", "CERT-In", "MeitY", "RBI Cyber Security"]
  }
};

export const TRUST_STATES = [
  "Verified Primary Source",
  "Verified Secondary Source",
  "Reviewed Internal Knowledge",
  "Needs Enrichment",
  "Needs Legal Review",
  "Placeholder / Incomplete",
  "Source Missing",
  "Rejected"
];

// CRITICAL TRUST GATE: Only these trust states may ever be included in production AI retrieval
export const AI_ELIGIBLE_TRUST_STATES = [
  "Verified Primary Source",
  "Verified Secondary Source",
  "Reviewed Internal Knowledge"
];

export const DOCUMENT_TYPES = [
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

export const INDUSTRY_SECTORS = [
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


// api/lib/regulatory/sourceRegistry.js
// Phase 5 — Official Regulatory Source Registry
// Covers Central Government, All 28 States, and All 8 Union Territories

export const ALL_28_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const ALL_8_UNION_TERRITORIES = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// 1. Central Government Official Sources
export const CENTRAL_SOURCES = [
  {
    sourceId: "SRC-CEN-001",
    authorityName: "Legislative Department, Ministry of Law and Justice",
    portalTitle: "India Code Digital Repository",
    officialUrl: "https://www.indiacode.nic.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Law and Justice",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["regulatory-compliance", "enterprise-governance", "labour-employment", "environmental-ehs"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-002",
    authorityName: "Department of Publication, Ministry of Housing & Urban Affairs",
    portalTitle: "The Gazette of India (e-Gazette)",
    officialUrl: "https://egazette.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Housing and Urban Affairs",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["regulatory-compliance", "taxation-trade", "cybersecurity-data"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-003",
    authorityName: "Ministry of Corporate Affairs (MCA)",
    portalTitle: "MCA21 Regulatory E-Services & Circulars",
    officialUrl: "https://www.mca.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Corporate Affairs",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["enterprise-governance", "regulatory-compliance", "risk-management"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-004",
    authorityName: "Ministry of Labour and Employment",
    portalTitle: "Ministry of Labour & Employment Portal & Shram Suvidha",
    officialUrl: "https://labour.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Labour and Employment",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["labour-employment", "regulatory-compliance"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-005",
    authorityName: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    portalTitle: "MoEFCC Enactments & Notifications Portal",
    officialUrl: "https://moef.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Environment, Forest and Climate Change",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["environmental-ehs", "esg-sustainability"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-006",
    authorityName: "Central Pollution Control Board (CPCB)",
    portalTitle: "CPCB Environmental Standards & Consent Protocols",
    officialUrl: "https://cpcb.nic.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Environment, Forest and Climate Change",
    trustRating: "Verified Official Regulator",
    monitoredOfferings: ["environmental-ehs", "esg-sustainability"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-007",
    authorityName: "Central Board of Indirect Taxes and Customs (CBIC)",
    portalTitle: "CBIC GST & Customs Notifications & Circulars",
    officialUrl: "https://www.cbic.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Finance",
    trustRating: "Verified Official Regulator",
    monitoredOfferings: ["taxation-trade", "export-trade"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-008",
    authorityName: "Central Board of Direct Taxes (CBDT)",
    portalTitle: "Income Tax Department Regulatory Notifications",
    officialUrl: "https://incometaxindia.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Finance",
    trustRating: "Verified Official Regulator",
    monitoredOfferings: ["taxation-trade"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-009",
    authorityName: "Securities and Exchange Board of India (SEBI)",
    portalTitle: "SEBI Master Circulars & Regulations",
    officialUrl: "https://www.sebi.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Securities Regulator",
    trustRating: "Verified Official Regulator",
    monitoredOfferings: ["esg-sustainability", "enterprise-governance"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-010",
    authorityName: "Directorate General of Foreign Trade (DGFT)",
    portalTitle: "DGFT Foreign Trade Policy & Public Notices",
    officialUrl: "https://www.dgft.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Commerce and Industry",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["export-trade", "taxation-trade", "supply-chain"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-011",
    authorityName: "Ministry of Electronics and Information Technology (MeitY)",
    portalTitle: "MeitY Digital Laws, DPDP Act & CERT-In Directives",
    officialUrl: "https://www.meity.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Electronics and Information Technology",
    trustRating: "Verified Official Government Portal",
    monitoredOfferings: ["cybersecurity-data", "risk-management"],
    rateLimitMs: 2000,
    isActive: true
  },
  {
    sourceId: "SRC-CEN-012",
    authorityName: "Food Safety and Standards Authority of India (FSSAI)",
    portalTitle: "FSSAI Food Safety Regulations & Compendiums",
    officialUrl: "https://www.fssai.gov.in/",
    jurisdictionLevel: "Central",
    ministryOrDepartment: "Ministry of Health and Family Welfare",
    trustRating: "Verified Official Regulator",
    monitoredOfferings: ["licensing-permits", "regulatory-compliance"],
    rateLimitMs: 2000,
    isActive: true
  }
];

// 2. All 28 States Official Sources Registry
export const STATE_SOURCES = ALL_28_STATES.map((stateName, index) => {
  const code = stateName.toLowerCase().replace(/[^a-z]/g, "").slice(0, 3).toUpperCase();
  return {
    sourceId: `SRC-ST-${String(index + 1).padStart(3, "0")}-${code}`,
    authorityName: `Government of ${stateName} (Labour, Industries & Environment Departments)`,
    portalTitle: `${stateName} Official State Gazette & Regulatory Portal`,
    officialUrl: `https://${stateName.toLowerCase().replace(/\s+/g, "")}.gov.in/regulations`,
    jurisdictionLevel: "State",
    stateOrUtName: stateName,
    ministryOrDepartment: "State Labour & Environment Department",
    trustRating: "Official State Department",
    monitoredOfferings: ["labour-employment", "environmental-ehs", "licensing-permits", "taxation-trade"],
    rateLimitMs: 2000,
    isActive: true
  };
});

// 3. All 8 Union Territories Official Sources Registry
export const UT_SOURCES = ALL_8_UNION_TERRITORIES.map((utName, index) => {
  const code = utName.toLowerCase().replace(/[^a-z]/g, "").slice(0, 3).toUpperCase();
  return {
    sourceId: `SRC-UT-${String(index + 1).padStart(3, "0")}-${code}`,
    authorityName: `${utName} Administration`,
    portalTitle: `${utName} Gazette & Administrative Regulations Portal`,
    officialUrl: `https://${utName.toLowerCase().replace(/\s+/g, "")}.gov.in/gazette`,
    jurisdictionLevel: "Union Territory",
    stateOrUtName: utName,
    ministryOrDepartment: "Union Territory Administration",
    trustRating: "Official State Department",
    monitoredOfferings: ["regulatory-compliance", "labour-employment", "licensing-permits"],
    rateLimitMs: 2000,
    isActive: true
  };
});

export const ALL_REGULATORY_SOURCES = [
  ...CENTRAL_SOURCES,
  ...STATE_SOURCES,
  ...UT_SOURCES
];

export function getAllSources() {
  return ALL_REGULATORY_SOURCES;
}

export function getSourcesByJurisdiction(jurisdictionLevel, stateOrUtName = null) {
  if (jurisdictionLevel === "Central") return CENTRAL_SOURCES;
  if (stateOrUtName) {
    return ALL_REGULATORY_SOURCES.filter(s => s.stateOrUtName?.toLowerCase() === stateOrUtName.toLowerCase());
  }
  if (jurisdictionLevel === "State") return STATE_SOURCES;
  if (jurisdictionLevel === "Union Territory") return UT_SOURCES;
  return ALL_REGULATORY_SOURCES;
}

export function getSourceById(sourceId) {
  return ALL_REGULATORY_SOURCES.find(s => s.sourceId === sourceId) || null;
}


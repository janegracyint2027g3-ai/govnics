// src/data/regulatory-data.ts
// Phase 5 — TypeScript-typed data bridge for regulatory constants
// Re-exports key data from api/lib/regulatory/*.js as typed constants
// This avoids direct TS-from-JS imports in frontend components.

// ─── JURISDICTIONS ────────────────────────────────────────────────────────────

export const ALL_28_STATES: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const ALL_8_UNION_TERRITORIES: string[] = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// ─── PROVISION TYPE ────────────────────────────────────────────────────────────

export interface StructuredProvision {
  provisionId: string;
  actShortTitle: string;
  actFullTitle: string;
  sectionNumber: string;
  sectionTitle: string;
  clauseOrSubSection?: string;
  provisionText: string;
  complianceObligation: string;
  evidenceRequired: string[];
  deadlineOrFrequency: string;
  penaltyOrConsequence: string;
  jurisdictionLevel: "Central" | "State" | "Union Territory";
  applicableJurisdictions: string[];
  applicableIndustries: string[];
  offeringCategory: string;
  regulatoryAuthority: string;
  officialSourceUrl: string;
  documentType: string;
  effectiveDate: string;
  lastAmendedDate?: string;
  verificationStatus: string;
  verifiedBy?: string;
  verificationDate?: string;
  trustGateStatus: "Approved" | "Needs Legal Review" | "Rejected";
  version: string;
  tags: string[];
}

// ─── SEED PROVISIONS (TypeScript-typed) ───────────────────────────────────────
// Kept in sync manually with api/lib/regulatory/sectionExtractionService.js

export const STRUCTURED_PROVISIONS: StructuredProvision[] = [
  {
    provisionId: "PRV-DPDP-SEC006",
    actShortTitle: "DPDP Act 2023",
    actFullTitle: "Digital Personal Data Protection Act, 2023",
    sectionNumber: "Section 6",
    sectionTitle: "Consent of Data Principal",
    clauseOrSubSection: "S.6(1) — Free, specific, informed, unconditional, unambiguous consent",
    provisionText:
      "A Data Fiduciary may process the personal data of a Data Principal only upon her consent given in a clear and plain language and for a specified purpose. Consent shall be free, specific, informed, unconditional and unambiguous with a clear affirmative action, and shall signify an agreement to the processing of her personal data for the specified purpose.",
    complianceObligation:
      "Obtain explicit, purpose-specific, revocable consent before any personal data processing. Provide granular consent management that allows separate consent per purpose.",
    evidenceRequired: [
      "Consent Management Platform (CMP) logs",
      "Timestamped consent records per Data Principal",
      "Consent withdrawal mechanism audit trail",
      "Privacy Notice version linked to consent"
    ],
    deadlineOrFrequency: "Before first data processing event; re-consent required on purpose change",
    penaltyOrConsequence: "Non-consensual processing → adjudication by Data Protection Board → penalty up to ₹250 Crores",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Cross-Industry"],
    offeringCategory: "cybersecurity-data",
    regulatoryAuthority: "Data Protection Board of India (DPBI) · MeitY",
    officialSourceUrl: "https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2023-08-11",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["DPDP", "consent", "data-protection", "MeitY", "privacy"]
  },
  {
    provisionId: "PRV-DPDP-SEC008",
    actShortTitle: "DPDP Act 2023",
    actFullTitle: "Digital Personal Data Protection Act, 2023",
    sectionNumber: "Section 8(6)",
    sectionTitle: "Obligations of Data Fiduciary — Breach Notification",
    provisionText:
      "In the event of a personal data breach, the Data Fiduciary shall, as soon as possible, give the Board and each affected Data Principal notice of such breach in such form and manner as may be prescribed.",
    complianceObligation:
      "Notify Data Protection Board and each affected Data Principal upon any personal data breach, as soon as practicable. Form and manner per DPDP Rules (when notified).",
    evidenceRequired: [
      "Breach detection timestamp",
      "Board notification acknowledgement (Form B)",
      "Data Principal notification records",
      "Root cause analysis report",
      "Remediation action log"
    ],
    deadlineOrFrequency: "As soon as practicable after breach detection; mandatory",
    penaltyOrConsequence: "Failure to notify → Schedule IV Clause 6 → penalty up to ₹200 Crores",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Cross-Industry"],
    offeringCategory: "cybersecurity-data",
    regulatoryAuthority: "Data Protection Board of India (DPBI) · MeitY",
    officialSourceUrl: "https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2023-08-11",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["DPDP", "breach-notification", "data-breach", "cybersecurity"]
  },
  {
    provisionId: "PRV-SSCODE-SEC053",
    actShortTitle: "Social Security Code 2020",
    actFullTitle: "Code on Social Security, 2020",
    sectionNumber: "Section 53",
    sectionTitle: "Payment of Gratuity — Fixed-Term Employment Proviso",
    clauseOrSubSection: "Proviso to Section 53(1)",
    provisionText:
      "Provided that in the case of an employee employed on fixed-term employment, the employer shall pay gratuity on pro rata basis even if he has not completed five years of continuous service.",
    complianceObligation:
      "Pay gratuity to fixed-term workers on a pro-rata basis calculated on the actual period of service, regardless of whether the 5-year continuous service threshold is met.",
    evidenceRequired: [
      "Fixed-term employment contract copy",
      "Gratuity calculation worksheet (pro-rata formula)",
      "Payment voucher / Form I acknowledgement",
      "Payroll records for the service period"
    ],
    deadlineOrFrequency: "Within 30 days of cessation of fixed-term contract",
    penaltyOrConsequence: "Non-payment → interest at 10% p.a.; wilful refusal → Section 72 prosecution → fine up to ₹20,000",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Cross-Industry", "Manufacturing & Industrial", "IT & Technology"],
    offeringCategory: "labour-employment",
    regulatoryAuthority: "Ministry of Labour and Employment",
    officialSourceUrl: "https://labour.gov.in/sites/default/files/Social_Security_Code_2020.pdf",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2021-09-28",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["gratuity", "fixed-term", "Social Security Code", "labour"]
  },
  {
    provisionId: "PRV-FACT-SEC040B",
    actShortTitle: "Factories Act 1948",
    actFullTitle: "The Factories Act, 1948",
    sectionNumber: "Section 40-B",
    sectionTitle: "Safety Officers — Mandatory Appointment",
    provisionText:
      "In every factory (a) wherein 1,000 or more workers are ordinarily employed, or (b) wherein, in the opinion of the State Government, any manufacturing process or operation is carried on, which process or operation involves any risk of bodily injury, poisoning or disease… the occupier shall, if so required by the State Government by notification in the Official Gazette, employ such number of Safety Officers with such qualifications and duties as may be specified in that notification.",
    complianceObligation:
      "Appoint certified Safety Officers in factories with ≥1,000 workers. Qualifications and duties per State Government notification. Maintain their appointment records.",
    evidenceRequired: [
      "Factory Licence (Form 2)",
      "Safety Officer appointment letter",
      "Safety Officer certification / qualification proof",
      "Monthly safety inspection reports",
      "Accident register (Form 26)"
    ],
    deadlineOrFrequency: "Continuous obligation; appointment before reaching 1,000-worker threshold",
    penaltyOrConsequence: "Section 92 → fine up to ₹2 Lakhs; repeat offence → ₹3 Lakhs + 3 years imprisonment",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)", "All States"],
    applicableIndustries: ["Manufacturing & Industrial", "Chemicals & Petrochemicals", "Pharmaceuticals & Medical Devices"],
    offeringCategory: "environmental-ehs",
    regulatoryAuthority: "State Factories Inspectorate (delegated from Central)",
    officialSourceUrl: "https://labour.gov.in/sites/default/files/Factories_Act.pdf",
    documentType: "Statutory / Legal Source",
    effectiveDate: "1948-09-23",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["factories", "safety-officer", "EHS", "manufacturing"]
  },
  {
    provisionId: "PRV-MH-FACT-R68",
    actShortTitle: "MH Factories Rules 1963",
    actFullTitle: "Maharashtra Factories Rules, 1963",
    sectionNumber: "Rule 68",
    sectionTitle: "Safety Officer — Maharashtra-Specific Qualifications",
    provisionText:
      "Every factory employing 500 or more workers in Maharashtra shall appoint a Safety Officer who possesses a degree in Engineering or Technology plus a post-graduate diploma in Industrial Safety recognised by the Maharashtra State Board of Technical Education.",
    complianceObligation:
      "Appoint a Safety Officer with specified qualifications in Maharashtra factories with ≥500 workers (lower threshold than Central Act). Officer must hold MSBTE-recognised industrial safety diploma.",
    evidenceRequired: [
      "Maharashtra factory registration certificate",
      "Safety Officer appointment letter",
      "MSBTE diploma certificate",
      "Quarterly safety audit reports"
    ],
    deadlineOrFrequency: "Continuous; 500-worker threshold is lower than Central (1,000) — state rule more stringent",
    penaltyOrConsequence: "Prosecution under Maharashtra Factories Rules + Factories Act S.92 → fine up to ₹2 Lakhs",
    jurisdictionLevel: "State",
    applicableJurisdictions: ["Maharashtra"],
    applicableIndustries: ["Manufacturing & Industrial", "Chemicals & Petrochemicals"],
    offeringCategory: "environmental-ehs",
    regulatoryAuthority: "Maharashtra Factories Inspectorate",
    officialSourceUrl: "https://mahaindustries.com/maharashtra-factories-rules",
    documentType: "State Regulation",
    effectiveDate: "1963-01-01",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["Maharashtra", "factories", "safety-officer", "state-rule"]
  },
  {
    provisionId: "PRV-DL-SHOPS-SEC15",
    actShortTitle: "Delhi Shops Act 1954",
    actFullTitle: "Delhi Shops and Establishments Act, 1954",
    sectionNumber: "Section 15",
    sectionTitle: "Registration of Establishment — Mandatory",
    provisionText:
      "Every employer shall within 90 days of the commencement of his business register his establishment with the Chief Inspector and obtain a certificate of registration.",
    complianceObligation:
      "Register all commercial establishments in Delhi with the Labour Department within 90 days of commencing business. Maintain valid registration certificate at the premises.",
    evidenceRequired: [
      "Delhi Shops & Establishments registration certificate",
      "Form A application copy",
      "Proof of address (lease/rent deed)",
      "Employer identity proof"
    ],
    deadlineOrFrequency: "Within 90 days of business commencement; annual renewal",
    penaltyOrConsequence: "Non-registration → fine up to ₹5,000 per default; continued default → additional ₹500/day",
    jurisdictionLevel: "State",
    applicableJurisdictions: ["Delhi"],
    applicableIndustries: ["Retail & E-commerce", "IT & Technology", "BFSI & Fintech"],
    offeringCategory: "licensing-permits",
    regulatoryAuthority: "Delhi Labour Department — Chief Inspector",
    officialSourceUrl: "https://labour.delhi.gov.in/",
    documentType: "State Act",
    effectiveDate: "1954-01-01",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["Delhi", "shops-act", "establishment-registration", "licensing"]
  },
  {
    provisionId: "PRV-MCA-SEC137",
    actShortTitle: "Companies Act 2013",
    actFullTitle: "The Companies Act, 2013",
    sectionNumber: "Section 137",
    sectionTitle: "Filing of Financial Statements — AOC-4 Deadline & Penalties",
    provisionText:
      "A copy of the financial statements, including consolidated financial statement, if any, along with all the documents which are required to be or attached to such financial statements under this Act, duly adopted at the annual general meeting of the company, shall be filed with the Registrar within thirty days of the date of annual general meeting in such manner, with such fees or additional fees as may be prescribed.",
    complianceObligation:
      "File AOC-4 (Financial Statements) with the Registrar of Companies within 30 days of the Annual General Meeting. Failure attracts a daily late fee of ₹100 per day.",
    evidenceRequired: [
      "Adopted financial statements (Balance Sheet, P&L, Cash Flow)",
      "Auditor's Report",
      "Board's Report",
      "AGM minutes with date",
      "AOC-4 filing acknowledgement (SRN)"
    ],
    deadlineOrFrequency: "Within 30 days of AGM; AGM must be held within 6 months of financial year end",
    penaltyOrConsequence: "Late filing → ₹100 per day per default; Section 137(3) → fine on company ₹1,000/day (max ₹10 Lakhs) + officer fine ₹1 Lakh",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Cross-Industry"],
    offeringCategory: "enterprise-governance",
    regulatoryAuthority: "Ministry of Corporate Affairs (MCA) — Registrar of Companies",
    officialSourceUrl: "https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-filing/company-filing-act-2013.html",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2013-09-12",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["Companies Act", "AOC-4", "MCA", "annual-return", "governance"]
  },
  {
    provisionId: "PRV-GST-SEC009-3",
    actShortTitle: "CGST Act 2017",
    actFullTitle: "Central Goods and Services Tax Act, 2017",
    sectionNumber: "Section 9(3)",
    sectionTitle: "Reverse Charge Mechanism — Mandatory Cash Ledger Payment",
    provisionText:
      "The Government may, on the recommendations of the Council, by notification, specify categories of supply of goods or services or both, the tax on which shall be paid on reverse charge basis by the recipient of such goods or services or both and all the provisions of this Act shall apply to such recipient as if he is the person liable for paying the tax.",
    complianceObligation:
      "Recipients of RCM-notified supply categories must self-assess and pay GST directly to the government from Electronic Cash Ledger (no ITC offset for RCM liability payment). File RCM self-invoice and GSTR-3B Table 3.1(d).",
    evidenceRequired: [
      "Self-invoice for RCM supply",
      "Electronic Cash Ledger debit entry",
      "GSTR-3B (Table 3.1(d)) filing",
      "ITC reversal entry if input ineligible",
      "Notification reference for applicable RCM category"
    ],
    deadlineOrFrequency: "Monthly GSTR-3B — 20th of following month; quarterly for QRMP filers",
    penaltyOrConsequence: "Non-payment → interest 18% p.a.; Section 73/74 demand + penalty up to 100% of tax due",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Cross-Industry"],
    offeringCategory: "taxation-trade",
    regulatoryAuthority: "Central Board of Indirect Taxes and Customs (CBIC)",
    officialSourceUrl: "https://cbic-gst.gov.in/",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2017-07-01",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["GST", "reverse-charge", "CGST", "CBIC", "taxation"]
  },
  {
    provisionId: "PRV-SEBI-LODR-34",
    actShortTitle: "SEBI LODR 2015",
    actFullTitle: "SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015",
    sectionNumber: "Regulation 34(2)(f)",
    sectionTitle: "Business Responsibility and Sustainability Report (BRSR) — Top 1000",
    provisionText:
      "The annual report shall contain a Business Responsibility and Sustainability Report describing initiatives taken by the listed entity from an environmental, social and governance perspective, in such form as specified by the Board from time to time. This requirement is mandatory for the top 1000 listed entities by market capitalisation.",
    complianceObligation:
      "Listed entities in the top 1,000 by market-cap must include a BRSR in the Annual Report, covering 9 principles of the National Guidelines on Responsible Business Conduct (NGRBC). BRSR Core (assurance) mandatory for top 150 from FY 2024-25.",
    evidenceRequired: [
      "BRSR disclosure in Annual Report",
      "Leadership Indicators data (top 150: third-party assured)",
      "NGRBC principles alignment mapping",
      "ESG data for all 9 principles",
      "Board approval of BRSR"
    ],
    deadlineOrFrequency: "Annual; filed with Annual Report within 60 days of AGM",
    penaltyOrConsequence: "Non-compliance → SEBI enforcement action; fine per SEBI Act S.15A up to ₹1 Crore per violation",
    jurisdictionLevel: "Central",
    applicableJurisdictions: ["India (Central)"],
    applicableIndustries: ["Banking & Financial Services", "BFSI & Fintech", "Manufacturing & Industrial", "IT & Technology"],
    offeringCategory: "esg-sustainability",
    regulatoryAuthority: "Securities and Exchange Board of India (SEBI)",
    officialSourceUrl: "https://www.sebi.gov.in/legal/regulations/mar-2021/sebi-listing-obligations-and-disclosure-requirements-regulations-2015_53570.html",
    documentType: "Statutory / Legal Source",
    effectiveDate: "2022-04-01",
    lastAmendedDate: "2023-07-12",
    verificationStatus: "Verified Primary Source",
    trustGateStatus: "Approved",
    version: "v4.0",
    tags: ["SEBI", "BRSR", "ESG", "sustainability", "listed-entities"]
  }
];


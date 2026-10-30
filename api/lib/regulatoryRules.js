// api/lib/regulatoryRules.js
// Verified regulatory rules database for GOVENICS compliance checklist generation.
// Each rule is sourced from official government/regulatory publications.
// IMPORTANT: This is not legal advice. Always consult qualified legal professionals.
// Last Database Update: 2024-01

/**
 * @typedef {Object} RegulatoryRule
 * @property {string} ruleId - Unique rule identifier
 * @property {string} country - ISO 3166-1 alpha-2 country code
 * @property {string|null} state - State/province code or null for national
 * @property {string[]} industries - Applicable industry sectors (empty = all)
 * @property {string[]} companySizes - Applicable company sizes (empty = all)
 * @property {string[]} operations - Applicable business operations (empty = all)
 * @property {string} category - Regulatory category
 * @property {string} regulationName - Official name of the regulation
 * @property {string} authority - Regulatory authority name
 * @property {string} officialUrl - Official source URL
 * @property {string|null} effectiveDate - Date regulation came into effect
 * @property {string} lastVerified - Date this entry was last verified
 * @property {"active"|"pending"|"repealed"} status - Rule status
 * @property {string} description - Brief description of the requirement
 * @property {string} whyItApplies - Template explaining applicability
 * @property {string} documentation - Required documentation
 * @property {string} frequency - Compliance frequency
 * @property {string|null} deadline - Filing deadline if applicable
 * @property {"critical"|"high"|"medium"|"low"} priority - Priority level
 */

export const REGULATORY_RULES = [
  // ─── INDIA — CORPORATE ────────────────────────────────────────────────────
  {
    ruleId: "IN-CORP-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: [],
    category: "Corporate & Business Compliance",
    regulationName: "Companies Act 2013 — Annual Return & Financial Statements",
    authority: "Ministry of Corporate Affairs (MCA)",
    officialUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html",
    effectiveDate: "2013-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "All companies registered under the Companies Act 2013 must file Annual Returns (Form MGT-7 or MGT-7A) and Financial Statements (Form AOC-4) with the MCA within the prescribed timelines each financial year.",
    whyItApplies: "Your organisation is registered as a company in India, making compliance with the Companies Act 2013 mandatory.",
    documentation: "Balance Sheet, Profit & Loss Account, Directors' Report, Auditor's Report, Form MGT-7/MGT-7A, Form AOC-4",
    frequency: "Annual",
    deadline: "Within 60 days of AGM for Annual Return; within 30 days of AGM for Financial Statements",
    priority: "critical",
  },
  {
    ruleId: "IN-CORP-002",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: [],
    category: "Corporate & Business Compliance",
    regulationName: "Companies Act 2013 — Board Meetings & Statutory Registers",
    authority: "Ministry of Corporate Affairs (MCA)",
    officialUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html",
    effectiveDate: "2013-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Companies must hold a minimum of 4 Board Meetings per year with gaps not exceeding 120 days, maintain statutory registers (Members, Directors, Charges, etc.) and follow prescribed quorum requirements.",
    whyItApplies: "As a registered company with multiple employees, maintaining Board Meeting records and statutory registers is mandatory under the Companies Act 2013.",
    documentation: "Board Meeting Minutes, Attendance Registers, Statutory Registers (MGT-1, MGT-2, MGT-7, etc.)",
    frequency: "Quarterly",
    deadline: "Ongoing — meetings must be held within regulatory intervals",
    priority: "high",
  },

  // ─── INDIA — TAX ──────────────────────────────────────────────────────────
  {
    ruleId: "IN-TAX-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: [],
    category: "Tax & Financial Compliance",
    regulationName: "Income Tax Act 1961 — Corporate Tax Return (ITR-6)",
    authority: "Income Tax Department, Ministry of Finance",
    officialUrl: "https://www.incometax.gov.in/iec/foportal/",
    effectiveDate: "1961-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "All companies not claiming exemption under Section 11 must file Income Tax Return in Form ITR-6 annually. Tax audit under Section 44AB is mandatory if turnover exceeds ₹1 crore (business) or ₹50 lakhs (profession).",
    whyItApplies: "Your organisation operates as a company in India and is liable to pay corporate income tax and file annual IT returns.",
    documentation: "Form ITR-6, Tax Audit Report (Form 3CA-3CD), Profit & Loss Account, Balance Sheet, TDS Certificates",
    frequency: "Annual",
    deadline: "31st October (with audit) / 31st July (without audit) of Assessment Year",
    priority: "critical",
  },
  {
    ruleId: "IN-TAX-002",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: [],
    category: "Tax & Financial Compliance",
    regulationName: "Goods and Services Tax (GST) — Monthly/Quarterly Returns",
    authority: "GST Council / GSTN",
    officialUrl: "https://www.gst.gov.in/",
    effectiveDate: "2017-07-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "GST-registered businesses must file GSTR-1 (outward supplies) and GSTR-3B (summary return) monthly or quarterly, and an annual return GSTR-9. Input Tax Credit reconciliation is mandatory.",
    whyItApplies: "Your organisation is required to register for GST if annual turnover exceeds ₹40 lakh (₹20 lakh for special category states) and must comply with GST return filing requirements.",
    documentation: "GSTR-1, GSTR-3B, GSTR-9, GSTR-9C (for turnover >₹5 crore), Purchase/Sales Registers, Invoice Records",
    frequency: "Monthly/Quarterly + Annual",
    deadline: "GSTR-1: 11th of following month; GSTR-3B: 20th of following month; GSTR-9: 31st December",
    priority: "critical",
  },
  {
    ruleId: "IN-TAX-003",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Employee Management"],
    category: "Tax & Financial Compliance",
    regulationName: "Income Tax Act 1961 — TDS / TCS Compliance",
    authority: "Income Tax Department, TRACES",
    officialUrl: "https://www.tdscpc.gov.in/",
    effectiveDate: "1961-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Entities making specified payments (salaries, contractor fees, rent, etc.) must deduct Tax Deducted at Source (TDS) at prescribed rates, deposit it with the government within 7 days, and file quarterly TDS returns (Form 24Q, 26Q, 27Q).",
    whyItApplies: "Your organisation has employees and/or makes payments to vendors/contractors, triggering TDS deduction and deposit obligations.",
    documentation: "Form 24Q (salary TDS), Form 26Q (non-salary TDS), Challan 281, Form 16/16A (TDS certificates for employees/vendors)",
    frequency: "Monthly deposit; Quarterly returns",
    deadline: "Deposit: 7th of following month (30th for March); Returns: 31st of July, October, January, May",
    priority: "critical",
  },

  // ─── INDIA — LABOUR ───────────────────────────────────────────────────────
  {
    ruleId: "IN-LABOUR-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Startup (1–10 employees)", "Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Employee Management"],
    category: "Labour & Employment Compliance",
    regulationName: "Employees' Provident Funds and Miscellaneous Provisions Act 1952 (EPF)",
    authority: "Employees' Provident Fund Organisation (EPFO)",
    officialUrl: "https://www.epfindia.gov.in/",
    effectiveDate: "1952-03-04",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Establishments with 20 or more employees must register with EPFO, deduct 12% of basic wages as employee PF contribution, contribute an equal 12% as employer (8.33% to EPS, 3.67% to EPF), and file monthly ECR returns.",
    whyItApplies: "Your organisation has employees and is required to comply with EPF regulations.",
    documentation: "EPF Registration Certificate, Monthly ECR (Electronic Challan cum Return), PF passbooks, Form 5/10/12A",
    frequency: "Monthly",
    deadline: "Contribution deposit by 15th of following month; ECR filing by 25th",
    priority: "critical",
  },
  {
    ruleId: "IN-LABOUR-002",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Employee Management"],
    category: "Labour & Employment Compliance",
    regulationName: "Employees' State Insurance Act 1948 (ESI)",
    authority: "Employees' State Insurance Corporation (ESIC)",
    officialUrl: "https://www.esic.in/",
    effectiveDate: "1948-04-19",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Establishments with 10 or more employees (earning ≤ ₹21,000/month) must register with ESIC, deduct 0.75% of wages as employee ESI contribution, contribute 3.25% as employer, and file half-yearly returns.",
    whyItApplies: "Your organisation has employees and falls under the ESI Act applicability threshold.",
    documentation: "ESI Registration Certificate, Challan, Return of Contribution (Form 5), Employee Declaration Forms (Form 1)",
    frequency: "Monthly deposit; Half-yearly returns",
    deadline: "Contribution: 15th of following month; Returns: 11th May and 11th November",
    priority: "critical",
  },
  {
    ruleId: "IN-LABOUR-003",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Employee Management"],
    category: "Labour & Employment Compliance",
    regulationName: "Payment of Gratuity Act 1972",
    authority: "Ministry of Labour and Employment",
    officialUrl: "https://labour.gov.in/",
    effectiveDate: "1972-09-16",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Establishments with 10 or more employees must pay gratuity to employees who have completed 5 years of continuous service at the rate of 15 days' wages for each completed year of service, subject to a maximum of ₹20 lakh.",
    whyItApplies: "Your organisation has more than 10 employees and is liable to pay gratuity under the Payment of Gratuity Act 1972.",
    documentation: "Gratuity Policy, Gratuity Fund Trust documents or LIC Group Gratuity Scheme, Form A (Notice of Opening), Form F (Nomination)",
    frequency: "On separation",
    deadline: "Within 30 days of it becoming payable",
    priority: "high",
  },
  {
    ruleId: "IN-LABOUR-004",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Employee Management"],
    category: "Labour & Employment Compliance",
    regulationName: "Sexual Harassment of Women at Workplace Act 2013 (POSH Act)",
    authority: "Ministry of Women and Child Development",
    officialUrl: "https://wcd.nic.in/act/sexual-harassment-women-workplace-prevention-prohibition-and-redressal-act-2013",
    effectiveDate: "2013-12-09",
    lastVerified: "2024-01-01",
    status: "active",
    description: "All organisations with 10 or more employees must constitute an Internal Complaints Committee (ICC), display awareness notices, conduct annual awareness training, and file an annual report on complaints received and disposed of with the District Officer.",
    whyItApplies: "Your organisation has employees and is mandatorily required to comply with the POSH Act 2013.",
    documentation: "ICC Constitution Order, POSH Policy, Annual Report to District Officer, Training Completion Records, Complaint Register",
    frequency: "Annual reporting; Ongoing policy",
    deadline: "Annual report to District Officer by 31st January",
    priority: "high",
  },
  {
    ruleId: "IN-LABOUR-005",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Employee Management"],
    category: "Labour & Employment Compliance",
    regulationName: "Code on Wages 2019 — Minimum Wage Compliance",
    authority: "Ministry of Labour and Employment",
    officialUrl: "https://labour.gov.in/sites/default/files/TheCodeonWages2019.pdf",
    effectiveDate: "2019-08-08",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Employers must pay wages not less than the minimum wage prescribed by the Central or State Government for the respective scheduled employment, maintain wage registers, and issue wage slips.",
    whyItApplies: "Your organisation employs workers and must ensure compliance with minimum wage laws.",
    documentation: "Wage Register (Form I), Muster Roll, Wage Slips, Minimum Wage Notification (State-specific)",
    frequency: "Monthly",
    deadline: "Wages to be paid by 7th of following month (establishments ≤ 1,000 employees) or 10th (others)",
    priority: "high",
  },

  // ─── INDIA — DATA PROTECTION ──────────────────────────────────────────────
  {
    ruleId: "IN-DATA-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Data Processing", "Consumer Data Collection"],
    category: "Data Protection & Privacy",
    regulationName: "Digital Personal Data Protection Act 2023 (DPDP Act)",
    authority: "Data Protection Board of India (to be established)",
    officialUrl: "https://www.meity.gov.in/data-protection-framework",
    effectiveDate: "2023-08-11",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Organisations that process digital personal data must obtain valid consent, fulfil data principal rights (access, correction, erasure, grievance redressal), maintain data processing records, implement security safeguards, and notify breaches. Significant Data Fiduciaries have additional obligations.",
    whyItApplies: "Your organisation processes or collects personal data of individuals, making DPDP Act compliance mandatory.",
    documentation: "Privacy Notice / Consent Banner, Data Processing Register, Data Breach Notification Procedure, Grievance Redressal Mechanism, DPO Appointment (if Significant Data Fiduciary)",
    frequency: "Ongoing",
    deadline: "Breach notification: Within 72 hours of becoming aware",
    priority: "high",
  },
  {
    ruleId: "IN-DATA-002",
    country: "IN",
    state: null,
    industries: ["Information Technology & Technology Services"],
    companySizes: [],
    operations: ["Data Processing", "Cloud Infrastructure"],
    category: "Data Protection & Privacy",
    regulationName: "IT Act 2000 — Section 43A & IT (Amendment) Act 2008 — Sensitive Personal Data Rules 2011",
    authority: "Ministry of Electronics and Information Technology (MeitY)",
    officialUrl: "https://www.meity.gov.in/content/information-technology-act",
    effectiveDate: "2011-04-11",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Body corporates handling sensitive personal data must implement a comprehensive information security programme and practices, publish a privacy policy, and are liable for negligence in maintaining reasonable security practices.",
    whyItApplies: "Your organisation handles sensitive personal data in the course of providing IT services.",
    documentation: "Information Security Policy, Privacy Policy, Security Audit Reports, Vendor Data Processing Agreements",
    frequency: "Ongoing",
    deadline: "Policy review: Annual",
    priority: "high",
  },

  // ─── INDIA — CYBERSECURITY ────────────────────────────────────────────────
  {
    ruleId: "IN-CYBER-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Data Processing", "Cloud Infrastructure"],
    category: "Cybersecurity & Information Security",
    regulationName: "CERT-In Directions 2022 — Cyber Incident Reporting",
    authority: "Indian Computer Emergency Response Team (CERT-In)",
    officialUrl: "https://www.cert-in.org.in/",
    effectiveDate: "2022-04-28",
    lastVerified: "2024-01-01",
    status: "active",
    description: "All service providers, intermediaries, data centres, body corporates, and government organisations must report 20 categories of cyber incidents to CERT-In within 6 hours of becoming aware. ICT infrastructure providers must maintain logs for 180 days.",
    whyItApplies: "Your organisation operates digital infrastructure and is mandated to comply with CERT-In incident reporting requirements.",
    documentation: "Cyber Incident Response Plan, Incident Log Register, CERT-In Incident Report Forms, System Log Retention Policy (180 days)",
    frequency: "Incident-based; Log retention: 180 days",
    deadline: "Incident report: Within 6 hours of becoming aware",
    priority: "critical",
  },
  {
    ruleId: "IN-CYBER-002",
    country: "IN",
    state: null,
    industries: ["Banking, Financial Services & Insurance", "Information Technology & Technology Services"],
    companySizes: ["Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Data Processing", "Cloud Infrastructure", "Financial Transactions"],
    category: "Cybersecurity & Information Security",
    regulationName: "ISO/IEC 27001:2022 — Information Security Management System",
    authority: "International Organization for Standardization (ISO) / Bureau of Indian Standards (BIS)",
    officialUrl: "https://www.iso.org/standard/82875.html",
    effectiveDate: "2022-10-25",
    lastVerified: "2024-01-01",
    status: "active",
    description: "ISO 27001 provides a systematic approach to managing information security risks. While voluntary for most, it is increasingly mandated by contracts, regulators (especially RBI, SEBI, IRDAI), and government procurement. Requires ISMS implementation, risk assessment, and periodic surveillance audits.",
    whyItApplies: "Your organisation's industry and operations make ISO 27001 certification strategically important and often contractually required.",
    documentation: "ISMS Policy, Risk Assessment Report, Statement of Applicability, Internal Audit Reports, Certificate of Conformity (ISO 27001)",
    frequency: "Annual surveillance; 3-year recertification",
    deadline: "Certification renewal: Every 3 years",
    priority: "high",
  },

  // ─── INDIA — MANUFACTURING ────────────────────────────────────────────────
  {
    ruleId: "IN-MFG-001",
    country: "IN",
    state: null,
    industries: ["Manufacturing & Industrial", "Chemicals & Petrochemicals", "Food Processing", "Automotive & Auto Components", "Textiles"],
    companySizes: ["Small Enterprise (11–50 employees)", "Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Manufacturing"],
    category: "Environmental, Health & Safety Compliance",
    regulationName: "Factories Act 1948 — Registration, Licensing & Safety Compliance",
    authority: "State Factory Inspectorate / Ministry of Labour and Employment",
    officialUrl: "https://labour.gov.in/sites/default/files/TheFactoriesAct1948.pdf",
    effectiveDate: "1948-09-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Every factory employing 10 or more workers (with power) or 20 or more workers (without power) must be registered and licensed with the State Factory Inspectorate. Annual renewal of license, maintenance of registers (accident, overtime, wages, health), and compliance with prescribed safety standards are mandatory.",
    whyItApplies: "Your organisation is engaged in manufacturing activities with employees, making Factories Act compliance mandatory.",
    documentation: "Factory License, Annual Return (Form 21), Register of Accidents (Form 26), Register of Leave (Form 15), Safety Officer Appointment (if ≥500 workers)",
    frequency: "Annual license renewal; Monthly/Quarterly registers",
    deadline: "Annual return: 31st January; License renewal: Before expiry",
    priority: "critical",
  },
  {
    ruleId: "IN-MFG-002",
    country: "IN",
    state: null,
    industries: ["Manufacturing & Industrial", "Chemicals & Petrochemicals", "Food Processing"],
    companySizes: [],
    operations: ["Manufacturing"],
    category: "Environmental, Health & Safety Compliance",
    regulationName: "Environment Protection Act 1986 & Rules — Consent to Establish/Operate (CTE/CTO)",
    authority: "State Pollution Control Board / Central Pollution Control Board (CPCB)",
    officialUrl: "https://cpcb.nic.in/",
    effectiveDate: "1986-11-19",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Industries must obtain Consent to Establish (CTE) before setting up operations and Consent to Operate (CTO) before commencing production from the State Pollution Control Board. Annual Environmental Statement must be submitted.",
    whyItApplies: "Your organisation's manufacturing operations involve potential environmental impact, requiring pollution control board consents.",
    documentation: "CTE Certificate, CTO Certificate, Environmental Statement (Form V), Environmental Impact Assessment (if applicable), Effluent Treatment Plant records",
    frequency: "Annual renewal for CTO; Annual Environmental Statement",
    deadline: "Environmental Statement: 30th September annually",
    priority: "critical",
  },

  // ─── INDIA — TRADE & IMPORT-EXPORT ───────────────────────────────────────
  {
    ruleId: "IN-TRADE-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Import and Export"],
    category: "Trade & Import-Export Compliance",
    regulationName: "Foreign Trade (Development & Regulation) Act 1992 — IEC Registration",
    authority: "Directorate General of Foreign Trade (DGFT)",
    officialUrl: "https://www.dgft.gov.in/",
    effectiveDate: "1992-08-07",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Any entity engaged in import or export of goods must obtain an Importer-Exporter Code (IEC) from the DGFT. IEC is mandatory for customs clearance and for receiving foreign remittances. Annual IEC renewal/confirmation is required.",
    whyItApplies: "Your organisation is engaged in import and/or export operations, making IEC registration mandatory.",
    documentation: "IEC Certificate, Annual IEC Confirmation on DGFT portal, Export-Import Documentation (Bill of Lading, Commercial Invoice, Packing List)",
    frequency: "Annual confirmation",
    deadline: "IEC Annual Confirmation: 30th June each year",
    priority: "critical",
  },
  {
    ruleId: "IN-TRADE-002",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Import and Export", "International Operations"],
    category: "Trade & Import-Export Compliance",
    regulationName: "Foreign Exchange Management Act 1999 (FEMA) — Cross-border Transactions",
    authority: "Reserve Bank of India (RBI) / Enforcement Directorate",
    officialUrl: "https://www.rbi.org.in/Scripts/BS_FemaNotifications.aspx",
    effectiveDate: "1999-12-29",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Organisations engaging in international financial transactions (exports, imports, foreign remittances, FDI, ECB) must comply with FEMA regulations, file prescribed returns with RBI (EDPMS for exports, IDPMS for imports), and adhere to forex limits.",
    whyItApplies: "Your organisation conducts international operations involving cross-border financial transactions regulated under FEMA.",
    documentation: "FEMA Declarations, Export Declaration Form (EDF), Import Licence records, RBI Filing Receipts (EDPMS/IDPMS), Bank Realisation Certificates",
    frequency: "Transaction-based; Annual filings",
    deadline: "Export proceeds realisation: Within 9 months of shipment",
    priority: "high",
  },

  // ─── INDIA — BANKING/FINANCIAL SERVICES ──────────────────────────────────
  {
    ruleId: "IN-FIN-001",
    country: "IN",
    state: null,
    industries: ["Banking, Financial Services & Insurance"],
    companySizes: [],
    operations: ["Financial Transactions"],
    category: "Industry-Specific Regulations",
    regulationName: "Prevention of Money Laundering Act 2002 (PMLA) — AML/KYC Compliance",
    authority: "Financial Intelligence Unit — India (FIU-IND) / Reserve Bank of India",
    officialUrl: "https://fiuindia.gov.in/",
    effectiveDate: "2002-07-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Reporting entities (banks, NBFCs, payment aggregators, etc.) must implement Know Your Customer (KYC) procedures, Customer Due Diligence (CDD), Enhanced Due Diligence (EDD) for high-risk customers, Suspicious Transaction Reports (STR) filing, and Cash Transaction Reports (CTR) for transactions exceeding ₹10 lakh.",
    whyItApplies: "Your organisation operates in the financial services sector and is a reporting entity under PMLA.",
    documentation: "KYC Policy, Customer Risk Categorisation Records, STR Filing Records (FIU-IND Portal), CTR Filing Records, AML Training Records",
    frequency: "Ongoing; Monthly CTR filing",
    deadline: "STR: Within 7 days of suspicion; CTR: By 15th of following month",
    priority: "critical",
  },

  // ─── INDIA — HEALTHCARE ───────────────────────────────────────────────────
  {
    ruleId: "IN-HEALTH-001",
    country: "IN",
    state: null,
    industries: ["Healthcare & Pharmaceuticals"],
    companySizes: [],
    operations: ["Healthcare Services"],
    category: "Industry-Specific Regulations",
    regulationName: "Clinical Establishments (Registration and Regulation) Act 2010",
    authority: "State Clinical Establishment Authority / Ministry of Health and Family Welfare",
    officialUrl: "https://clinicalestablishments.gov.in/",
    effectiveDate: "2010-09-03",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Clinical establishments (hospitals, nursing homes, clinics, diagnostic centres) must register with the appropriate State authority and comply with prescribed minimum standards for personnel, equipment and medical records.",
    whyItApplies: "Your organisation operates a clinical establishment and must obtain and renew registration with the state authority.",
    documentation: "Registration Certificate, Proof of Compliance with Minimum Standards, Qualified Personnel Records, Equipment Calibration Records",
    frequency: "Annual renewal",
    deadline: "Renewal before certificate expiry",
    priority: "critical",
  },

  // ─── INDIA — ESG ──────────────────────────────────────────────────────────
  {
    ruleId: "IN-ESG-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: [],
    category: "ESG & Sustainability",
    regulationName: "SEBI — Business Responsibility and Sustainability Report (BRSR)",
    authority: "Securities and Exchange Board of India (SEBI)",
    officialUrl: "https://www.sebi.gov.in/legal/circulars/may-2021/business-responsibility-and-sustainability-reporting-by-listed-entities_50096.html",
    effectiveDate: "2022-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Top 1,000 listed companies (by market capitalisation) must mandatorily disclose BRSR covering environmental indicators (energy, water, GHG emissions), social indicators (employee welfare, supply chain ESG) and governance (ethics, stakeholder engagement). Assurance of BRSR Core is mandatory for top 150 companies from FY 2023-24.",
    whyItApplies: "Your organisation is a large listed entity subject to SEBI's mandatory BRSR disclosure requirements.",
    documentation: "BRSR Report (Annual Report), GHG Inventory, Energy Consumption Data, Water Usage Data, Employee Wellbeing Survey, Supply Chain Assessment Records",
    frequency: "Annual",
    deadline: "Filed with Annual Report; usually by August/September of following year",
    priority: "high",
  },

  // ─── INDIA — DATA PROCESSING ──────────────────────────────────────────────
  {
    ruleId: "IN-DATA-003",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: ["Third-Party Vendor Management"],
    category: "Data Protection & Privacy",
    regulationName: "DPDP Act 2023 — Data Processing Agreements with Third Parties",
    authority: "Data Protection Board of India",
    officialUrl: "https://www.meity.gov.in/data-protection-framework",
    effectiveDate: "2023-08-11",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Data Fiduciaries must enter into Data Processing Agreements (DPA) with Data Processors (third parties processing data on their behalf), ensuring contractual obligations for data protection, security measures, and breach notification.",
    whyItApplies: "Your organisation engages third-party vendors who process personal data on your behalf, requiring formal Data Processing Agreements.",
    documentation: "Data Processing Agreements (DPA) with each Data Processor, Third-Party Vendor Assessment Records, Data Flow Maps",
    frequency: "On engagement and annual review",
    deadline: "Before personal data is shared with the processor",
    priority: "high",
  },

  // ─── INDIA — CLOUD/IT ─────────────────────────────────────────────────────
  {
    ruleId: "IN-IT-001",
    country: "IN",
    state: null,
    industries: ["Information Technology & Technology Services"],
    companySizes: [],
    operations: ["Cloud Infrastructure", "Data Processing"],
    category: "Cybersecurity & Information Security",
    regulationName: "RBI Guidelines on Cloud Computing for Banks/NBFCs",
    authority: "Reserve Bank of India",
    officialUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx",
    effectiveDate: "2023-04-07",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Regulated entities (banks, NBFCs, payment aggregators) using cloud services must adhere to RBI's cloud guidelines covering governance, data localisation, vendor assessment, exit strategy, and audit rights.",
    whyItApplies: "Your organisation provides IT/cloud services to regulated financial entities, making compliance with RBI cloud guidelines necessary for business operations.",
    documentation: "Cloud Governance Policy, Cloud Risk Assessment, Vendor Due Diligence Records, Data Localisation Compliance Evidence, Incident Response Plan",
    frequency: "Annual review",
    deadline: "Policy review: Annual",
    priority: "high",
  },

  // ─── INDIA — LICENSING ────────────────────────────────────────────────────
  {
    ruleId: "IN-LIC-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: [],
    category: "Licensing, Registration & Certifications",
    regulationName: "Shops and Establishments Act — State Registration",
    authority: "State Labour Department / Municipal Corporation",
    officialUrl: "https://labour.gov.in/",
    effectiveDate: "1961-01-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Every commercial establishment (shops, offices, restaurants, factories for commercial purposes) must register under the respective State's Shops and Establishments Act within 30 days of commencement of business. Annual renewal is required in most states.",
    whyItApplies: "Your organisation operates a commercial establishment in India and must obtain and maintain the Shops & Establishments registration.",
    documentation: "Shops & Establishments Registration Certificate, Renewal Application, Business Address Proof",
    frequency: "Annual renewal (state-specific)",
    deadline: "Registration: Within 30 days of commencement; Annual renewal per state requirements",
    priority: "high",
  },
  {
    ruleId: "IN-LIC-002",
    country: "IN",
    state: null,
    industries: [],
    companySizes: [],
    operations: [],
    category: "Licensing, Registration & Certifications",
    regulationName: "Professional Tax — State Registration & Compliance",
    authority: "State Commercial Tax Department",
    officialUrl: "https://www.incometax.gov.in/",
    effectiveDate: "1976-04-01",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Employers in applicable states must obtain Professional Tax (PT) Enrolment Certificate (EC) as an employer and Registration Certificate (RC) for the establishment, deduct PT from employee salaries as per the state's slab rates, and file periodic returns.",
    whyItApplies: "Your organisation has employees in states where Professional Tax is levied (Maharashtra, Karnataka, West Bengal, Andhra Pradesh, Telangana, Tamil Nadu, Gujarat, etc.).",
    documentation: "PT Enrolment Certificate, PT Registration Certificate, Monthly/Annual PT Return, Salary/Wage Register",
    frequency: "Monthly deduction; Monthly/Annual return (state-specific)",
    deadline: "Varies by state — typically 31st March annually",
    priority: "medium",
  },

  // ─── INDIA — SUPPLY CHAIN ─────────────────────────────────────────────────
  {
    ruleId: "IN-SC-001",
    country: "IN",
    state: null,
    industries: [],
    companySizes: ["Medium Enterprise (51–250 employees)", "Large Enterprise (251–1,000 employees)", "Enterprise (1,000+ employees)"],
    operations: ["Supply Chain Management", "Third-Party Vendor Management"],
    category: "Corporate & Business Compliance",
    regulationName: "MSMED Act 2006 — MSME Payment Compliance & UDYAM Classification",
    authority: "Ministry of Micro, Small and Medium Enterprises",
    officialUrl: "https://msme.gov.in/",
    effectiveDate: "2006-10-02",
    lastVerified: "2024-01-01",
    status: "active",
    description: "Buyers must pay MSME suppliers within 45 days of acceptance of goods/services. Delayed payments attract compound interest at 3x the RBI bank rate. Companies with MSME suppliers must file MSME Form I (half-yearly) if outstanding dues exceed 45 days.",
    whyItApplies: "Your organisation has MSME vendors in your supply chain, requiring payment compliance and mandatory MSME Form I filing.",
    documentation: "MSME Form I (half-yearly), Vendor Register (indicating UDYAM Registration Numbers), Payment Records",
    frequency: "Half-yearly (MSME Form I)",
    deadline: "Form I: 31st October and 30th April annually",
    priority: "high",
  },
];

// ─── Compliance Categories ─────────────────────────────────────────────────
export const COMPLIANCE_CATEGORIES = [
  "Corporate & Business Compliance",
  "Tax & Financial Compliance",
  "Labour & Employment Compliance",
  "Environmental, Health & Safety Compliance",
  "Industry-Specific Regulations",
  "Data Protection & Privacy",
  "Cybersecurity & Information Security",
  "Trade & Import-Export Compliance",
  "ESG & Sustainability",
  "Licensing, Registration & Certifications",
];

// ─── Matching Engine ────────────────────────────────────────────────────────
/**
 * Match regulatory rules to a company profile
 * @param {Object} profile - Company profile
 * @returns {Array} Matched rules with applicability metadata
 */
export function matchRules(profile) {
  const {
    country = "IN",
    state = null,
    industry = "",
    subIndustry = "",
    companySize = "",
    businessOperations = [],
  } = profile;

  // Normalize country to 2-letter ISO code
  const normCountry = (c = "") => {
    const lower = String(c).toLowerCase().trim();
    if (lower === "in" || lower === "india") return "IN";
    if (lower === "us" || lower === "usa" || lower === "united states") return "US";
    if (lower === "uk" || lower === "united kingdom") return "GB";
    if (lower === "sg" || lower === "singapore") return "SG";
    if (lower === "ae" || lower === "uae" || lower === "united arab emirates") return "AE";
    if (lower === "de" || lower === "germany") return "DE";
    if (lower === "au" || lower === "australia") return "AU";
    if (lower === "ca" || lower === "canada") return "CA";
    return String(c).toUpperCase().slice(0, 2);
  };

  const targetCountry = normCountry(country);
  const matched = [];

  for (const rule of REGULATORY_RULES) {
    // Country check
    if (rule.country && normCountry(rule.country) !== targetCountry) continue;

    // State check (null state = applies to all states in that country)
    if (rule.state && state && rule.state !== state) continue;

    // Industry check
    if (rule.industries && rule.industries.length > 0) {
      const ruleIndustries = rule.industries.map((i) => i.toLowerCase());
      const profileIndustry = (industry || "").toLowerCase();
      const profileSubIndustry = (subIndustry || "").toLowerCase();
      const industryMatch = ruleIndustries.some(
        (ri) => profileIndustry.includes(ri) || ri.includes(profileIndustry) ||
                 profileSubIndustry.includes(ri) || ri.includes(profileSubIndustry)
      );
      if (!industryMatch) continue;
    }

    // Company size check (flexible matching for employee range strings)
    if (rule.companySizes && rule.companySizes.length > 0 && companySize) {
      const normSize = (s = "") => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
      const profileSizeNorm = normSize(companySize);
      const sizeMatch = rule.companySizes.some(
        (rs) => normSize(rs).includes(profileSizeNorm) || profileSizeNorm.includes(normSize(rs))
      );
      if (!sizeMatch) continue;
    }

    // Operations check
    if (rule.operations && rule.operations.length > 0) {
      const ruleOps = rule.operations.map((o) => o.toLowerCase());
      const profOps = (businessOperations || []).map((o) => o.toLowerCase());
      const hasOp = ruleOps.some((ro) =>
        profOps.some((po) => po.includes(ro) || ro.includes(po))
      );
      if (!hasOp) continue;
    }

    // Only include active rules
    if (rule.status !== "active") continue;

    matched.push({
      ...rule,
      applicabilityStatus: "Applicable",
      completionStatus: "Not Started",
      notes: "",
      internalDeadline: null,
      uploadedDocuments: [],
    });
  }

  return matched;
}

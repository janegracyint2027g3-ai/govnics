export interface SolutionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  badge: string;
  iconName: string;
  deliverables: string[];
  frameworks?: string[];
  metricsHighlight?: string;
}

export interface SolutionCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  items: SolutionItem[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  clientType: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metricBadge: string;
  metricValue: string;
  badge: string;
  duration?: string;
}

export interface CaseStudyCategory {
  id: string;
  name: string;
  iconName: string;
  studies: CaseStudyItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SOLUTIONS (Pre-defined Consulting Assets)
// ─────────────────────────────────────────────────────────────────────────────

export const solutionsByIndustrySector: SolutionCategory[] = [
  {
    id: "bfsi-fintech",
    name: "BFSI & Fintech",
    description: "Institutional regulatory posture, digital lending adherence, and AML/CFT orchestration.",
    iconName: "Landmark",
    items: [
      {
        id: "banking-nbfcs",
        title: "Banking & NBFCs",
        description: "Statutory governance blueprints, core risk registers, and RBI audit readiness kits.",
        badge: "Banking Core",
        iconName: "Building2",
        deliverables: ["RBI Master Direction Alignment", "ALM & Credit Risk Framework", "Statutory Board Reporting Templates"],
        frameworks: ["RBI Master Directions", "Basel III", "PMLA"],
        metricsHighlight: "Zero audit discrepancies across 14+ NBFC audits"
      },
      {
        id: "insurance",
        title: "Insurance",
        description: "IRDAI compliance frameworks, claims underwriting risk assessments, and solvency controls.",
        badge: "IRDAI Regulated",
        iconName: "Shield",
        deliverables: ["Underwriting Risk Assessment", "Policyholder Protection Framework", "Claims Governance Matrix"],
        frameworks: ["IRDAI Act", "AML Insurance Guidelines"],
        metricsHighlight: "100% statutory filing timeliness achieved"
      },
      {
        id: "payments-digital-lending",
        title: "Payments & Digital Lending",
        description: "DLG guidelines compliance, LSP governance, and payment gateway escrow compliance.",
        badge: "Digital Lending",
        iconName: "CreditCard",
        deliverables: ["LSP Due Diligence Packets", "KFS & APR Calculation Engines", "Escrow & Settlement Audit Framework"],
        frameworks: ["RBI Digital Lending Guidelines 2022", "PA/PG Directions"],
        metricsHighlight: "14-day turnaround for digital lender audit certification"
      },
      {
        id: "capital-markets",
        title: "Capital Markets",
        description: "SEBI LODR, PIT regulations, custody risk architectures, and stock broker audit compliance.",
        badge: "SEBI Compliance",
        iconName: "TrendingUp",
        deliverables: ["SEBI PIT Insider Trading Vault", "LODR Compliance Automation", "Broker Surveillance Matrix"],
        frameworks: ["SEBI LODR 2015", "SEBI PIT Regulations"],
        metricsHighlight: "99.8% compliance accuracy across quarterly disclosures"
      }
    ]
  },
  {
    id: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    description: "Shopfloor statutory safety, environmental consent approvals, and logistics compliance.",
    iconName: "Factory",
    items: [
      {
        id: "automotive",
        title: "Automotive",
        description: "IATF 16949 governance, OEM tier-1 supplier audit readiness, and hazardous material protocols.",
        badge: "Automotive OEM",
        iconName: "Truck",
        deliverables: ["Tier-1 Supplier Audit Toolkits", "EHS Factory Safety Protocols", "Hazardous Material Tracking Registers"],
        frameworks: ["Factories Act 1948", "IATF 16949"],
        metricsHighlight: "Zero lost-time injury compliance records across 8 plant sites"
      },
      {
        id: "electronics-semiconductors",
        title: "Electronics & Semiconductors",
        description: "Cleanroom EHS compliance, RoHS/REACH verification, and PLI scheme regulatory management.",
        badge: "High-Tech Fab",
        iconName: "Cpu",
        deliverables: ["RoHS/REACH Material Passports", "Cleanroom EHS Audits", "PLI Scheme Verification Dossiers"],
        frameworks: ["RoHS", "REACH", "E-Waste Management Rules"],
        metricsHighlight: "100% compliant export certification dispatch"
      },
      {
        id: "pharma-lifesciences",
        title: "Pharmaceuticals & Life Sciences",
        description: "Schedule M compliance, CDSCO validation, USFDA audit preparedness, and bioclean certifications.",
        badge: "Pharma GMP",
        iconName: "Activity",
        deliverables: ["Schedule M / cGMP Gap Analysis", "CDSCO Licensing Dossiers", "21 CFR Part 11 Electronic Records Audit"],
        frameworks: ["Drugs & Cosmetics Act", "USFDA 21 CFR 11", "CDSCO Guidelines"],
        metricsHighlight: "Zero 483 observations during mock audit rounds"
      },
      {
        id: "food-processing-fmcg",
        title: "Food Processing & FMCG",
        description: "FSSAI compliance, cold chain safety auditing, allergen control frameworks, and packaging laws.",
        badge: "FSSAI Certified",
        iconName: "ShoppingBag",
        deliverables: ["FSSAI Central Licensing Documentation", "HACCP Hygiene Protocol Matrices", "Plastic Packaging EPR Filing"],
        frameworks: ["FSSAI Act 2006", "Legal Metrology Act"],
        metricsHighlight: "100% batch traceability and zero labeling recalls"
      },
      {
        id: "heavy-engineering",
        title: "Heavy Engineering",
        description: "Boilers Act, pressure vessel safety registers, crane certifications, and contractor EHS.",
        badge: "Heavy Industry",
        iconName: "Wrench",
        deliverables: ["Boilers Act & Pressure Vessel Inspection Registers", "Contract Labour EHS Scorecards", "Machinery Safeguarding Certifications"],
        frameworks: ["Indian Boilers Act", "Factories Act Chapter IV"],
        metricsHighlight: "42% reduction in contractor safety violation citations"
      },
      {
        id: "shopfloor-production",
        title: "Shopfloor & Production Operations",
        description: "Real-time worker safety monitoring, statutory shift logs, and continuous machine hazard audits.",
        badge: "Shopfloor Safety",
        iconName: "Layers",
        deliverables: ["Automated Shift Attendance & Overtime Logs", "Machine Guarding Compliance Audit", "Ergonomics & Noise Level Studies"],
        frameworks: ["Occupational Safety, Health and Working Conditions Code"],
        metricsHighlight: "Zero non-compliance fines in state factory inspections"
      },
      {
        id: "warehouse-logistics-infra",
        title: "Warehouse & Logistics Infrastructure",
        description: "Fire NOC clearances, automated racking load stability audits, and fleet driver statutory compliance.",
        badge: "Logistics Hubs",
        iconName: "Box",
        deliverables: ["Warehouse Fire NOC Clearance Dossiers", "Racking Structural Stability Records", "Driver Duty Hours & Welfare Audits"],
        frameworks: ["National Building Code Part 4", "Motor Vehicles Act"],
        metricsHighlight: "24-hour turnaround on warehouse lease compliance clearances"
      }
    ]
  },
  {
    id: "healthcare-hospitals",
    name: "Healthcare & Hospitals",
    description: "NABH, AERB, biomedical waste registers, and clinical governance protocols.",
    iconName: "HeartPulse",
    items: [
      {
        id: "multispecialty-hospitals",
        title: "Multi-specialty Hospitals",
        description: "NABH 5th edition compliance, AERB radiation clearance, and clinical audit dashboards.",
        badge: "Hospital Care",
        iconName: "Activity",
        deliverables: ["NABH Accreditation Readiness Pack", "AERB Diagnostic Radiology License Files", "Biomedical Waste Manifest Vault"],
        frameworks: ["Clinical Establishments Act", "NABH Standards", "AERB Directives"],
        metricsHighlight: "NABH re-accreditation secured without single non-conformity"
      },
      {
        id: "diagnostic-chains",
        title: "Diagnostic Chains",
        description: "NABL ISO 15189 compliance, sample logistics chain-of-custody, and hazardous reagent disposal.",
        badge: "NABL Pathology",
        iconName: "TestTube",
        deliverables: ["NABL Quality Manual Protocols", "Biohazard Reagent Safe Disposal Logs", "Diagnostic Data Security Controls"],
        frameworks: ["ISO 15189:2022", "Biomedical Waste Rules 2016"],
        metricsHighlight: "99.9% diagnostic sample compliance audit scores"
      },
      {
        id: "cros-clinical-research",
        title: "Clinical Research Organizations",
        description: "ICH-GCP compliance, ethics committee registration, and participant consent audit trails.",
        badge: "Clinical Trials",
        iconName: "FileCheck",
        deliverables: ["ICH-GCP Protocol Validation Toolkits", "Ethics Committee Registration Packs", "Electronic Trial Master File (eTMF) Governance"],
        frameworks: ["ICH-GCP Guidelines", "New Drugs and Clinical Trials Rules 2019"],
        metricsHighlight: "100% regulatory inspection acceptance across 20+ study sites"
      },
      {
        id: "healthtech-platforms",
        title: "HealthTech Platforms",
        description: "Telemedicine practice guidelines, HIPAA/DPDP health data privacy, and EHR/EMR governance.",
        badge: "HealthTech AI",
        iconName: "Cpu",
        deliverables: ["Telemedicine Consent Flow Audit", "EHR Interoperability & Privacy Policy", "Health Data Protection Impact Assessment (DPIA)"],
        frameworks: ["Telemedicine Practice Guidelines 2020", "DPDP Act 2023", "HIPAA Security Rule"],
        metricsHighlight: "Sub-3-day patient data rights verification deployment"
      }
    ]
  },
  {
    id: "it-tech-services",
    name: "IT & Technology Services",
    description: "Global cloud security, cross-border data transfer adherence, and enterprise SOC 2/ISO certifications.",
    iconName: "Laptop",
    items: [
      {
        id: "software-product-companies",
        title: "Software Product Companies",
        description: "Secure SDLC governance, SBOM management, intellectual property audits, and cloud certifications.",
        badge: "Tech Product",
        iconName: "Code",
        deliverables: ["SBOM Supply Chain Security Toolkit", "Secure SDLC CI/CD Gate Policies", "Automated Privacy Notice Generator"],
        frameworks: ["ISO 27001:2022", "SOC 2 Type II", "OWASP SAMM"],
        metricsHighlight: "SOC 2 Type II audit readiness in under 45 days"
      },
      {
        id: "it-services-bpo",
        title: "IT Services & BPO",
        description: "Client MSA compliance audits, OSP DoT regulatory reporting, and enterprise clean-desk governance.",
        badge: "BPO / ITES",
        iconName: "Users",
        deliverables: ["DoT Other Service Provider (OSP) Registrations", "Client Vendor Risk Audit Defense", "Information Security Baseline Architecture"],
        frameworks: ["DoT Telecom Regulations", "ISO 27701", "NIST CSF"],
        metricsHighlight: "100% SLA pass rate across 50+ enterprise client security audits"
      },
      {
        id: "saas-cloud-providers",
        title: "SaaS & Cloud Providers",
        description: "Multi-tenant isolation audits, CSA STAR assessments, and GDPR/DPDP data residency controls.",
        badge: "Cloud SaaS",
        iconName: "Cloud",
        deliverables: ["CSA STAR Level 2 Submission Dossier", "Cross-Border Transfer DPIA Documents", "Automated Continuous Compliance Dashboard"],
        frameworks: ["CSA STAR", "SOC 2", "ISO 27017 / 27018"],
        metricsHighlight: "35% reduction in customer vendor security questionnaire delays"
      },
      {
        id: "cybersecurity-firms",
        title: "Cybersecurity Firms",
        description: "CERT-In empaneled auditor alignment, incident disclosure runbooks, and ethical hacking compliance.",
        badge: "Cyber Defense",
        iconName: "ShieldAlert",
        deliverables: ["CERT-In 6-Hour Incident Notification Playbook", "Ethical Hacking Engagement Agreements", "Forensic Data Preservation Toolkits"],
        frameworks: ["CERT-In Cyber Security Directions 2022", "ISO 27035"],
        metricsHighlight: "<4 hour incident reporting response time certified"
      }
    ]
  },
  {
    id: "infrastructure-construction",
    name: "Infrastructure & Construction",
    description: "RERA compliance, EPC construction safety audits, and environmental impact consents.",
    iconName: "HardHat",
    items: [
      {
        id: "real-estate-developers",
        title: "Real Estate Developers",
        description: "State RERA project registration, quarterly progress updates, escrow account audits, and occupancy NOCs.",
        badge: "RERA Compliant",
        iconName: "Building",
        deliverables: ["RERA Quarterly Compliance Filing Kit", "70% Escrow Account Withdrawal Certification", "Title Due Diligence Dossiers"],
        frameworks: ["RERA Act 2016", "State RERA Rules"],
        metricsHighlight: "Zero late filing penalties across 25+ registered projects"
      },
      {
        id: "epc-contractors",
        title: "EPC Contractors",
        description: "BOCW Act worker registrations, high-risk work permits, and scaffolding/crane safety audits.",
        badge: "EPC Heavy Infra",
        iconName: "Wrench",
        deliverables: ["BOCW Act Worker Welfare Fund Records", "Safe Work Method Statements (SWMS)", "Subcontractor Statutory Verification Engine"],
        frameworks: ["BOCW Act 1996", "IS 13415 Construction Safety"],
        metricsHighlight: "Over 2M safe man-hours logged without regulatory suspension"
      },
      {
        id: "smart-cities-urban",
        title: "Smart Cities & Urban Development",
        description: "Public-private partnership (PPP) compliance, municipal waste frameworks, and surveillance data governance.",
        badge: "Smart City",
        iconName: "MapPin",
        deliverables: ["CCTV & Facial Recognition Privacy Charter", "Municipal Solid Waste Statutory Adherence", "Concession Agreement Compliance Register"],
        frameworks: ["Smart Cities Mission Guidelines", "DPDP Act 2023"],
        metricsHighlight: "100% audit defense on municipal concession milestones"
      },
      {
        id: "logistics-parks",
        title: "Logistics Parks",
        description: "Multi-modal transport approvals, industrial zoning compliance, and stormwater drainage consents.",
        badge: "Logistics Parks",
        iconName: "Truck",
        deliverables: ["Industrial Land Use & Zoning Clearance Files", "Stormwater & Effluent SPCB Consents", "Internal Road Traffic Safety Audits"],
        frameworks: ["State Industrial Development Acts", "Water Act 1974"],
        metricsHighlight: "Consents to Operate (CTO) approved on initial submission"
      }
    ]
  },
  {
    id: "energy-utilities",
    name: "Energy & Utilities",
    description: "Central Electricity Authority regulations, renewable PPA compliance, and carbon credit audits.",
    iconName: "Zap",
    items: [
      {
        id: "power-generation",
        title: "Power Generation & Distribution",
        description: "CEA grid safety regulations, CERC tariff filings, and high-voltage transmission safety protocols.",
        badge: "Power Utility",
        iconName: "Zap",
        deliverables: ["CEA Safety Regulations 2010 Audit Checklist", "CERC Regulatory Compliance Calendars", "Substation Earthing & Protection Review"],
        frameworks: ["Electricity Act 2003", "CEA Grid Standards"],
        metricsHighlight: "100% statutory clearance on annual grid safety audits"
      },
      {
        id: "renewable-energy",
        title: "Renewable Energy",
        description: "Solar/wind land title clearances, grid connectivity approvals, and renewable energy certificates (REC).",
        badge: "Clean Tech",
        iconName: "Sun",
        deliverables: ["MNRE Technical Quality Standard Verifications", "REC Mechanism Reporting Packages", "Interconnection Feasibility Due Diligence"],
        frameworks: ["MNRE Guidelines", "CERC REC Regulations"],
        metricsHighlight: "Expedited commissioning approvals across 400MW+ projects"
      },
      {
        id: "oil-gas",
        title: "Oil & Gas",
        description: "PNGRB regulations, OISD fire & safety standards, and pipeline right-of-use statutory tracking.",
        badge: "Oil & Gas Safety",
        iconName: "Flame",
        deliverables: ["OISD Standard 116 / 117 Safety Audits", "PNGRB Integrity Management Systems (IMS)", "Hazard & Operability (HAZOP) Study Validation"],
        frameworks: ["Petroleum Act 1934", "PNGRB IMS Regulations", "OISD Standards"],
        metricsHighlight: "Zero tier-1 process safety incidents recorded"
      },
      {
        id: "water-waste-management",
        title: "Water & Waste Management",
        description: "STP/ETP discharge compliance, zero liquid discharge (ZLD) certifications, and municipal water testing.",
        badge: "Water & Waste",
        iconName: "Droplets",
        deliverables: ["Online Continuous Effluent Monitoring (OCEMS) Verifications", "ZLD System Operating Compliance Packets", "Solid Waste Handling Authorization Dossiers"],
        frameworks: ["Water (Prevention & Control of Pollution) Act", "Solid Waste Rules 2016"],
        metricsHighlight: "Continuous 24/7 compliant effluent parameter logging achieved"
      }
    ]
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    description: "Consumer protection e-commerce rules, legal metrology packaging, and omnichannel GST reconcile.",
    iconName: "ShoppingCart",
    items: [
      {
        id: "omnichannel-retailers",
        title: "Omnichannel Retailers",
        description: "Multi-state Shops & Establishments registrations, store staff minimum wages, and fire safety.",
        badge: "Retail Stores",
        iconName: "Store",
        deliverables: ["Multi-State S&E Digital Registration Register", "Legal Metrology Packaged Commodity Audit", "Store Opening Statutory Checklist"],
        frameworks: ["Shops & Commercial Establishments Acts", "Legal Metrology Packaged Commodities Rules"],
        metricsHighlight: "Turnkey store opening compliance achieved in 10 business days"
      },
      {
        id: "d2c-brands",
        title: "D2C Brands",
        description: "Consumer Protection E-Commerce Rules 2020, return/refund disclosure compliance, and DPDP cookies.",
        badge: "D2C Brands",
        iconName: "Sparkles",
        deliverables: ["Country-of-Origin & Price Transparency Audit", "D2C Return, Refund & Grievance Mechanism Charter", "Customer Consent & Privacy Engine"],
        frameworks: ["Consumer Protection (E-Commerce) Rules 2020", "DPDP Act"],
        metricsHighlight: "Zero consumer court notices across 100K+ monthly order operations"
      },
      {
        id: "marketplace-platforms",
        title: "Marketplace Platforms",
        description: "FDI e-commerce compliance, intermediary liability safe harbor under IT Act, and seller KYC.",
        badge: "E-Commerce Market",
        iconName: "ShoppingBag",
        deliverables: ["FDI Press Note 2 Intermediary Compliance Blueprint", "IT Act Intermediary Safe Harbor Guidelines", "Seller Onboarding Tax Verification Engine"],
        frameworks: ["IT Act Section 79 Intermediary Guidelines", "FDI Policy"],
        metricsHighlight: "100% safe harbor compliance protection maintained"
      },
      {
        id: "supply-chain-operators",
        title: "Supply Chain Operators",
        description: "E-Way bill automation, carrier liability compliance, and transit insurance risk registers.",
        badge: "Supply Chain",
        iconName: "Truck",
        deliverables: ["Automated E-Way Bill Generation & Reconcile Engine", "Carriage by Road Act Carrier Licensing Files", "Third-Party Fleet Safety Agreements"],
        frameworks: ["CGST E-Way Bill Rules", "Carriage by Road Act 2007"],
        metricsHighlight: "₹0 detention penalties over 50,000 inter-state vehicle movements"
      }
    ]
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "ICAI/ICSI quality review boards, client confidentiality, and automated statutory payroll compliance.",
    iconName: "Briefcase",
    items: [
      {
        id: "consulting-firms",
        title: "Consulting Firms",
        description: "Conflict-of-interest registers, independent advisory standards, and client NDA vaulting.",
        badge: "Consulting Advisory",
        iconName: "FileText",
        deliverables: ["Ethics & Independence Declaration System", "Information Barrier (Chinese Wall) Policies", "Subcontractor Security Clearance Matrix"],
        frameworks: ["ICAI Code of Ethics", "ISO 27001"],
        metricsHighlight: "Zero conflict breaches across multi-client engagements"
      },
      {
        id: "legal-secretarial",
        title: "Legal & Secretarial Practices",
        description: "Bar council advertising compliance, digital board minute preservation, and client escrow.",
        badge: "Corporate Legal",
        iconName: "Scale",
        deliverables: ["Secretarial Audit Standard (SS-1 & SS-2) Toolkits", "Tamper-Evident Digital Minutes Archive", "AML Politically Exposed Person (PEP) Screening"],
        frameworks: ["Companies Act 2013", "ICSI Secretarial Standards"],
        metricsHighlight: "100% pass rate in peer review inspections"
      },
      {
        id: "audit-firms",
        title: "Audit Firms",
        description: "NFRA audit quality standards, SA 200 series compliance, and workpaper archiving solutions.",
        badge: "Audit & Assurance",
        iconName: "CheckCircle",
        deliverables: ["Standard on Quality Control (SQC 1) Framework", "Digital Audit Workpaper Repository with Timestamping", "Independence Tracking Registers"],
        frameworks: ["NFRA Rules", "Standards on Auditing (ICAI)"],
        metricsHighlight: "Flawless inspection outcomes under NFRA quality review"
      },
      {
        id: "hr-payroll-outsourcing",
        title: "HR & Payroll Outsourcing",
        description: "Multi-state minimum wage compliance, PF/ESI challan automation, and bonus statutory registers.",
        badge: "Staffing & Payroll",
        iconName: "Users",
        deliverables: ["Automated Statutory Challan Reconciliation System", "Contract Labour Master Register Compliance Engine", "POSH Internal Committee Governance Kit"],
        frameworks: ["Code on Wages 2019", "EPF & MP Act", "ESI Act"],
        metricsHighlight: "99.98% statutory payroll accuracy for over 25,000 workforce headcount"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. SOLUTIONS - B. BY COMPLIANCE DOMAIN
// ─────────────────────────────────────────────────────────────────────────────

export const solutionsByComplianceDomain: SolutionCategory[] = [
  {
    id: "central-govt-tax",
    name: "Central Govt Tax & Regulatory Compliance",
    description: "Direct & indirect taxation, cross-border FEMA, foreign trade DGFT, and corporate law compliance.",
    iconName: "Landmark",
    items: [
      {
        id: "gst-invoicing",
        title: "GST Compliance & E-Invoicing Automation",
        description: "Real-time GSTR-1, 3B, 9C automation, e-invoicing API integration, and ITC mismatch detection.",
        badge: "GST Tax Tech",
        iconName: "FileCheck",
        deliverables: ["Automated 2B vs Purchase Register Reconcile", "Real-time IRP E-Invoice Dispatch", "Annual GST Audit Defense Files"],
        frameworks: ["CGST/SGST Acts", "E-Invoicing Schema"],
        metricsHighlight: "100% Input Tax Credit claim optimization with zero leakage"
      },
      {
        id: "income-tax-tds",
        title: "Income Tax & TDS/TCS Management",
        description: "Quarterly TDS return filing (24Q/26Q), Section 194R/194S compliance, and corporate advance tax.",
        badge: "Direct Tax",
        iconName: "Receipt",
        deliverables: ["Automated Lower Deduction Certificate Tracking", "Section 194Q vs 206C(1H) Decision Engines", "Corporate Tax Return Verification"],
        frameworks: ["Income Tax Act 1961"],
        metricsHighlight: "Zero demand notices on TDS short-deduction"
      },
      {
        id: "customs-dgft-iec",
        title: "Customs, DGFT & Export-Import Code (IEC)",
        description: "Advance authorization, EPCG scheme licensing, customs bonded warehouse, and AEO certification.",
        badge: "Foreign Trade",
        iconName: "Globe",
        deliverables: ["AEO Tier-1 & Tier-2 Accreditation Dossiers", "RoDTEP & Duty Drawback Benefit Audits", "Customs Valuation Defense Packets"],
        frameworks: ["Foreign Trade Policy 2023", "Customs Act 1962"],
        metricsHighlight: "48-hour customs clearance acceleration through AEO status"
      },
      {
        id: "fema-cross-border",
        title: "FEMA & Cross-Border Transaction Compliance",
        description: "FDI reporting (Single Master Form / FC-GPR), external commercial borrowings (ECB), and FLA returns.",
        badge: "FEMA Banking",
        iconName: "DollarSign",
        deliverables: ["FC-GPR / FC-TRS Valuation & Reporting Files", "Overseas Direct Investment (ODI) Compliance", "Annual FLA Return Verification"],
        frameworks: ["FEMA 1999", "RBI Master Directions on FDI/ODI"],
        metricsHighlight: "Zero compounding fines on cross-border equity allotments"
      },
      {
        id: "corporate-law-mca",
        title: "Corporate Law (ROC/MCA) & Secretarial",
        description: "MCA V3 portal filings, AGM/EGM secretarial documentation, and independent director governance.",
        badge: "ROC Compliance",
        iconName: "FileText",
        deliverables: ["Annual MCA Filings (AOC-4, MGT-7)", "Director KYC & DIRT Registration Automation", "Significant Beneficial Ownership (SBO) Registers"],
        frameworks: ["Companies Act 2013", "MCA V3 Guidelines"],
        metricsHighlight: "100% on-time MCA V3 filings across all corporate entities"
      },
      {
        id: "ibc-support",
        title: "Insolvency & Bankruptcy Code (IBC) Support",
        description: "Resolution professional advisory, CIRP committee of creditors (CoC) compliance, and claims validation.",
        badge: "IBC Legal",
        iconName: "Scale",
        deliverables: ["Claims Verification Matrix & Priority Ranking", "Information Memorandum Legal Compliance", "Section 29A Ineligibility Due Diligence"],
        frameworks: ["Insolvency and Bankruptcy Code 2016", "IBBI Regulations"],
        metricsHighlight: "Accelerated 30-day claims verification with zero challenge in NCLT"
      }
    ]
  },
  {
    id: "rbi-nbfc-governance",
    name: "RBI & NBFC Governance Frameworks",
    description: "Central bank directives, IT outsourcing, fair practices code, and regulatory surveillance automation.",
    iconName: "ShieldCheck",
    items: [
      {
        id: "it-outsourcing-directions",
        title: "Master Direction on IT Outsourcing",
        description: "Material IT service provider risk assessment, concentration risk analysis, and BCP exit strategies.",
        badge: "RBI IT",
        iconName: "Server",
        deliverables: ["Material IT Vendor Due Diligence Dossiers", "Continuous Monitoring SLAs & Exit Frameworks", "Board IT Committee Annual Submission Packets"],
        frameworks: ["RBI Master Direction on IT Outsourcing 2023"],
        metricsHighlight: "100% compliant IT vendor portfolio approved by RBI inspection"
      },
      {
        id: "digital-lending-guidelines",
        title: "Digital Lending Guidelines Compliance",
        description: "Direct loan disbursals, Key Fact Statement (KFS) generation, DLAs privacy, and cooling-off periods.",
        badge: "DLG 2022",
        iconName: "Smartphone",
        deliverables: ["KFS Real-Time Generation Verification", "LSP App Store Policy & Permission Audits", "Grievance Redressal Officer (GRO) Workflow Engine"],
        frameworks: ["RBI Guidelines on Digital Lending"],
        metricsHighlight: "Zero non-compliance flags in central bank thematic audits"
      },
      {
        id: "kyc-aml-pmla",
        title: "KYC/AML & PMLA Adherence",
        description: "Central KYC (CKYC) registry integration, Video-KYC audits, sanction screening, and STR reporting.",
        badge: "AML / CFT",
        iconName: "ShieldAlert",
        deliverables: ["Automated Sanctions & Politically Exposed Persons Engine", "Suspicious Transaction Report (STR) Trigger Rules", "Video-KYC Anti-Spoofing Assurance"],
        frameworks: ["PMLA 2002", "RBI KYC Master Direction"],
        metricsHighlight: "False-positive alert reduction by 62% using intelligent screening"
      },
      {
        id: "fair-practices-customer",
        title: "Fair Practices Code & Customer Protection",
        description: "Interest rate model disclosure, recovery agent code of conduct, and Ombudsman scheme adherence.",
        badge: "Consumer Trust",
        iconName: "HeartHandshake",
        deliverables: ["Recovery Agent Certification & Call Recording Audits", "Internal Ombudsman Escalation Architecture", "Transparent Interest Rate Policy Dossier"],
        frameworks: ["RBI Integrated Ombudsman Scheme", "Fair Practices Code"],
        metricsHighlight: "Customer grievance resolution turnaround dropped from 21 to 4 days"
      },
      {
        id: "nbfc-corp-governance",
        title: "Corporate Governance for NBFCs",
        description: "Scale-Based Regulation (SBR) compliance: Base, Middle, Upper, and Top Layer governance.",
        badge: "SBR NBFC",
        iconName: "Layers",
        deliverables: ["SBR Multi-Layer Governance Transition Roadmap", "Chief Risk Officer (CRO) Reporting Framework", "Capital Adequacy & Leverage Ratio Monitoring"],
        frameworks: ["RBI Scale-Based Regulatory Framework for NBFCs"],
        metricsHighlight: "Seamless transition to Upper Layer status with zero capital drag"
      },
      {
        id: "rbi-supervisory-reporting",
        title: "RBI Supervisory Reporting Automation",
        description: "Automated XBRL filing for DBR, CRILC exposure reports, liquidity returns, and fraud reporting.",
        badge: "Supervisory Tech",
        iconName: "Cpu",
        deliverables: ["CRILC Weekly Large Exposure Automated Extractor", "XBRL Liquidity Return Automation", "Form Fraud Monitoring Return (FMR) Validator"],
        frameworks: ["RBI DAKSH Platform", "CRILC Guidelines"],
        metricsHighlight: "Filing errors reduced to 0.00% across all statutory reporting"
      }
    ]
  },
  {
    id: "labour-workplace",
    name: "State-Level Labour & Workplace Compliance",
    description: "4 Labour Codes transition, Factories Act, Contract Labour, and POSH statutory compliance.",
    iconName: "Users",
    items: [
      {
        id: "factories-act-ehs",
        title: "Factories Act & Industrial Safety (EHS)",
        description: "Factory license renewals, hazardous processes NOCs, annual medical examinations, and safety committees.",
        badge: "Factory EHS",
        iconName: "Building2",
        deliverables: ["Annual Factory License Digital Submission", "Occupational Health Center (OHC) Registers", "Machine Guarding & Hazard Identification Toolkits"],
        frameworks: ["Factories Act 1948", "State Factory Rules"],
        metricsHighlight: "Zero shut-down orders across 40+ monitored production plants"
      },
      {
        id: "shops-establishments",
        title: "Shops & Establishments Act Compliance",
        description: "Pan-India digital store registrations, working hours compliance, and overtime register automation.",
        badge: "Shops Act",
        iconName: "Store",
        deliverables: ["Pan-India Store Registration Automation", "Shift Scheduling & Overtime Statutory Vault", "Notice Board Display Compliance Registers"],
        frameworks: ["State Shops & Commercial Establishments Acts"],
        metricsHighlight: "100% compliance across 1,200+ multi-state retail branches"
      },
      {
        id: "contract-labour-management",
        title: "Contract Labour (R&A) Act Management",
        description: "Principal employer registration, contractor licensing, Form XII/XIII registers, and wage slips.",
        badge: "Contract Labour",
        iconName: "FileCheck",
        deliverables: ["Contractor Statutory Due Diligence Scorecards", "Online Wage Slip & Muster Roll Verification", "Joint Indemnity & Statutory Audit Packs"],
        frameworks: ["Contract Labour (Regulation and Abolition) Act 1970"],
        metricsHighlight: "Zero vicarious liability claims on principal employers"
      },
      {
        id: "statutory-payroll-pf-esi",
        title: "PF, ESI, PT & LWF Statutory Payroll",
        description: "EPFO monthly ECR filing, ESIC return filings, Professional Tax (PT), and Labour Welfare Fund (LWF).",
        badge: "Statutory Payroll",
        iconName: "Receipt",
        deliverables: ["Automated Monthly ECR Validation Engine", "ESIC Contribution & IP Card Generation", "Multi-State PT / LWF Remittance Calendars"],
        frameworks: ["EPF & MP Act 1952", "ESI Act 1948", "State PT/LWF Acts"],
        metricsHighlight: "99.99% challan reconciliation on day-1 of month"
      },
      {
        id: "minimum-wages-bonus",
        title: "Minimum Wages & Bonus Act Compliance",
        description: "Zone-wise variable dearness allowance (VDA) recalculation, equal remuneration, and bonus payout registers.",
        badge: "Wage Code",
        iconName: "DollarSign",
        deliverables: ["State VDA Notification Auto-Update Desk", "Form A/B/C Bonus Registers", "Code on Wages 2019 Readiness Matrix"],
        frameworks: ["Minimum Wages Act 1948", "Payment of Bonus Act 1965"],
        metricsHighlight: "Zero wage-shortage disputes across pan-India field workforce"
      },
      {
        id: "posh-maternity",
        title: "POSH & Maternity Benefit Compliance",
        description: "Internal Committee (IC) constitution, external member empanelment, annual reports, and creche audits.",
        badge: "POSH & Diversity",
        iconName: "Heart",
        deliverables: ["POSH Internal Committee Manual & Embellished Policy", "Annual District Officer POSH Report Filing", "Maternity Benefit Creche Statutory Verification"],
        frameworks: ["POSH Act 2013", "Maternity Benefit Amendment Act 2017"],
        metricsHighlight: "100% statutory district report submission with zero penalty"
      },
      {
        id: "warehouse-ergonomics",
        title: "Warehouse Worker Safety & Ergonomics",
        description: "Material handling risk assessments, repetitive strain injury (RSI) controls, and forklift protocols.",
        badge: "Ergonomics Safety",
        iconName: "Box",
        deliverables: ["Rapid Entire Body Assessment (REBA) Ergonomic Toolkits", "Forklift Operation Safety Certifications", "Warehouse First-Aid & Emergency Response Manuals"],
        frameworks: ["OSHA Ergonomics Guidelines", "National Safety Council Protocols"],
        metricsHighlight: "38% reduction in musculoskeletal strain incidents among warehouse associates"
      }
    ]
  },
  {
    id: "environmental-compliance",
    name: "State-Level Environmental Compliance",
    description: "CPCB/SPCB consents, hazardous waste disposal, extended producer responsibility (EPR), and carbon.",
    iconName: "Leaf",
    items: [
      {
        id: "cpcb-spcb-consent",
        title: "CPCB/SPCB Consent (CTE/CTO) Management",
        description: "Consent to Establish (CTE) & Consent to Operate (CTO) renewals, air/water pollution compliance.",
        badge: "SPCB Consents",
        iconName: "Shield",
        deliverables: ["Online CTE/CTO Application Processing Files", "Stack Emission & Ambient Air Quality Registers", "Effluent Treatment Plant (ETP) Adequacy Reports"],
        frameworks: ["Air Act 1981", "Water Act 1974"],
        metricsHighlight: "100% first-pass consent approval without public objection delays"
      },
      {
        id: "hazardous-waste-tsdf",
        title: "Hazardous Waste & TSDF Compliance",
        description: "Hazardous waste authorization (Form 1), Form 10 manifest tracking, and TSDF operator agreements.",
        badge: "Hazardous Waste",
        iconName: "AlertTriangle",
        deliverables: ["Form 10 Manifest Digital Archival Engine", "Authorized TSDF Disposal Agreement Audits", "Annual Form 4 Return Filing Automations"],
        frameworks: ["Hazardous and Other Wastes Rules 2016"],
        metricsHighlight: "Zero regulatory show-cause notices on waste traceability"
      },
      {
        id: "epr-waste-registration",
        title: "E-Waste & Plastic Waste EPR Registration",
        description: "Centralized CPCB EPR portal registration, recycling certificate procurement, and quarterly filings.",
        badge: "EPR Portal",
        iconName: "RefreshCw",
        deliverables: ["CPCB Plastic & E-Waste Portal Brand Owner Dossiers", "Recycler Credit Procurement & Verification", "Annual EPR Target Fulfillment Returns"],
        frameworks: ["Plastic Waste Management Rules", "E-Waste Management Rules 2022"],
        metricsHighlight: "Over 15,000 MT of EPR credit validated and fulfilled"
      },
      {
        id: "pollution-control-acts",
        title: "Air & Water Pollution Control Acts",
        description: "Continuous Emission Monitoring Systems (CEMS) calibration, sewage treatment plants, and green belts.",
        badge: "Pollution Control",
        iconName: "Wind",
        deliverables: ["CEMS Real-Time Data Integration Verification", "Green Belt Development Audit & Tree Plantation Registers", "Rainwater Harvesting Statutory Audit"],
        frameworks: ["Environment (Protection) Act 1986"],
        metricsHighlight: "100% compliance on state pollution board surprise audits"
      },
      {
        id: "eia-impact-assessment",
        title: "Environmental Impact Assessment (EIA)",
        description: "Prior environmental clearance (EC) documentation, public hearing defense, and post-EC monitoring.",
        badge: "EIA Clearances",
        iconName: "FileText",
        deliverables: ["Comprehensive EIA / EMP Report Validation", "State Expert Appraisal Committee (SEAC) Presentation Packs", "Six-Monthly EC Compliance Monitoring Reports"],
        frameworks: ["EIA Notification 2006 (MoEFCC)"],
        metricsHighlight: "Clearance turnaround accelerated by 4 months"
      },
      {
        id: "green-hydrogen-carbon",
        title: "Green Hydrogen & Carbon Credit Tracking",
        description: "National Green Hydrogen Mission standards, voluntary carbon offset verification, and ESG registries.",
        badge: "Carbon Tech",
        iconName: "Zap",
        deliverables: ["Carbon Footprint Accounting Models (Scope 1, 2, 3)", "Green Hydrogen Certification Protocols", "Carbon Credit Integrity & Additionality Verification"],
        frameworks: ["BEE Carbon Credit Trading Scheme", "GHG Protocol"],
        metricsHighlight: "120,000 MT CO2e verified under international standards"
      }
    ]
  },
  {
    id: "data-privacy-cybersecurity",
    name: "Data Privacy & Cybersecurity",
    description: "India's DPDP Act 2023, ISO 27001, SOC 2 Type II, cloud security, and CERT-In 6-hour response.",
    iconName: "Lock",
    items: [
      {
        id: "dpdp-act-compliance",
        title: "DPDP Act Compliance",
        description: "Data fiduciary governance, multilingual notice generation, consent management, and data audit.",
        badge: "DPDP Act 2023",
        iconName: "ShieldCheck",
        deliverables: ["Notice & Consent Management Framework (22 Indian Languages)", "Data Principal Rights Redressal (SRR) Automation", "Data Protection Officer (DPO) Operating Charter"],
        frameworks: ["Digital Personal Data Protection Act 2023"],
        metricsHighlight: "Zero exposure to statutory ₹250 Cr penalties"
      },
      {
        id: "iso-soc2-certification",
        title: "ISO 27001 / SOC 2 Certification",
        description: "ISMS policies, Statement of Applicability (SoA), Trust Services Criteria controls, and auditor packs.",
        badge: "ISO 27001 / SOC 2",
        iconName: "CheckCircle",
        deliverables: ["Complete ISO 27001:2022 Policy Vault", "SOC 2 Type II Continuous Evidence Collector", "Pre-Audit Mock Inspection Scorecard"],
        frameworks: ["ISO/IEC 27001:2022", "AICPA SOC 2"],
        metricsHighlight: "First-attempt certification pass rate of 100%"
      },
      {
        id: "gdpr-hipaa-alignment",
        title: "GDPR & HIPAA Alignment",
        description: "Standard Contractual Clauses (SCC), Business Associate Agreements (BAA), and HIPAA privacy audits.",
        badge: "GDPR / HIPAA",
        iconName: "Globe",
        deliverables: ["EU Cross-Border Transfer Impact Assessment (TIA)", "HIPAA Security Rule Administrative Safeguards", "Breach Notification Timelines Protocol"],
        frameworks: ["EU GDPR", "HIPAA Omnibus Rule"],
        metricsHighlight: "Enables frictionless European and US healthcare market entry"
      },
      {
        id: "vapt-penetration-testing",
        title: "VAPT & Penetration Testing",
        description: "Web/Mobile application security, network infrastructure penetration testing, and API audits.",
        badge: "Cyber VAPT",
        iconName: "Terminal",
        deliverables: ["Executive Risk Summary & Technical Remediation Plan", "OWASP Top 10 & SANS 25 Vulnerability Mapping", "Post-Remediation Verification Certificate"],
        frameworks: ["OWASP ASVS", "NIST SP 800-115"],
        metricsHighlight: "100% of high and critical vulnerabilities closed within 14 days"
      },
      {
        id: "incident-certin-support",
        title: "Incident Response & CERT-In Support",
        description: "6-hour mandatory incident reporting playbook, system log preservation for 180 days, and NTP sync.",
        badge: "CERT-In 6-Hour",
        iconName: "Clock",
        deliverables: ["CERT-In Annexure-I Incident Reporting Engine", "180-Day Secure Log Retention Architecture", "NTP Server Time Synchronization Verification"],
        frameworks: ["CERT-In Cyber Security Directions 2022"],
        metricsHighlight: "Verified response drill executed in under 2 hours"
      },
      {
        id: "cloud-security-posture",
        title: "Cloud Security (AWS/Azure/GCP)",
        description: "Cloud Security Posture Management (CSPM), IAM least-privilege automation, and data encryption.",
        badge: "Cloud Security",
        iconName: "Cloud",
        deliverables: ["Multi-Cloud CIS Benchmark Hardening Rules", "Automated IAM Least-Privilege Remediation", "KMS Key Rotation & Encryption Governance"],
        frameworks: ["CIS Cloud Benchmarks", "NIST CSF"],
        metricsHighlight: "Misconfigurations reduced by 94% across enterprise multi-cloud tenants"
      }
    ]
  },
  {
    id: "risk-internal-audit",
    name: "Risk Management & Internal Audit",
    description: "Enterprise Risk Management (ERM), third-party supply chain risk, and forensic fraud detection.",
    iconName: "AlertTriangle",
    items: [
      {
        id: "enterprise-risk-management",
        title: "Enterprise Risk Management (ERM)",
        description: "Risk appetite statement, 5x5 impact-likelihood scoring, KRIs dashboard, and Board risk committee packs.",
        badge: "ERM Strategy",
        iconName: "Activity",
        deliverables: ["Corporate Risk Taxonomy & 5x5 Heatmaps", "Key Risk Indicator (KRI) Early-Warning Dashboard", "Board Risk Management Committee Charters"],
        frameworks: ["COSO ERM 2017", "ISO 31000:2018"],
        metricsHighlight: "Identified and mitigated top 10 existential enterprise vulnerabilities"
      },
      {
        id: "third-party-vendor-risk",
        title: "Third-Party & Vendor Risk Management",
        description: "Vendor tiering, continuous security questionnaire assessments, and contract indemnity audits.",
        badge: "Vendor Risk",
        iconName: "Users",
        deliverables: ["Automated Vendor Risk Tiering Questionnaire", "On-Site & Virtual Vendor Audit Checklists", "Contractual Data Protection Addendum (DPA) Blueprints"],
        frameworks: ["Shared Assessments SIG", "ISO 27036"],
        metricsHighlight: "Assessed and cleared over 450 critical tier-1 vendor partnerships"
      },
      {
        id: "internal-audit-automation",
        title: "Internal Audit Automation",
        description: "Continuous transaction monitoring, automated exception detection, and working paper repositories.",
        badge: "Audit Automation",
        iconName: "FileCheck",
        deliverables: ["Continuous Controls Monitoring (CCM) Scripts", "Internal Financial Controls (IFC) Testing Matrices", "Executive Audit Committee Reporting Portals"],
        frameworks: ["Standards on Internal Audit (SIA) - ICAI"],
        metricsHighlight: "Audit cycle time shortened by 55% with zero sampling gaps"
      },
      {
        id: "business-continuity-bcp",
        title: "Business Continuity Planning (BCP)",
        description: "Business impact analysis (BIA), RTO/RPO targets, disaster recovery drills, and crisis communications.",
        badge: "BCP / DR",
        iconName: "RefreshCw",
        deliverables: ["Enterprise Business Impact Analysis (BIA) Models", "Disaster Recovery Drill Runbooks with RTO < 4h", "Crisis Command Center Protocols"],
        frameworks: ["ISO 22301:2019"],
        metricsHighlight: "Zero unplanned business interruption during simulated ransomware strike"
      },
      {
        id: "fraud-forensic-audit",
        title: "Fraud Detection & Forensic Audit",
        description: "Whistleblower mechanism investigation, digital evidence preservation, Benford's law anomaly scans.",
        badge: "Forensics",
        iconName: "Eye",
        deliverables: ["Whistleblower Policy & Independent Portal System", "Digital Forensics & Chain-of-Custody Protocols", "Procurement Fraud Anomaly Algorithms"],
        frameworks: ["ACFE Fraud Examination Standards"],
        metricsHighlight: "Recovered ₹4.2 Cr in leaked procurement billing discrepancies"
      }
    ]
  },
  {
    id: "esg-sustainability",
    name: "ESG & Sustainability",
    description: "BRSR / BRSR Core reporting, greenhouse gas accounting, circular economy, and green audits.",
    iconName: "Sun",
    items: [
      {
        id: "brsr-core-reporting",
        title: "BRSR & BRSR Core Reporting",
        description: "SEBI mandate for top 1000 listed entities, 9 National Guidelines principles, and value chain ESG.",
        badge: "SEBI BRSR",
        iconName: "BarChart3",
        deliverables: ["Complete BRSR Core Quantitative Disclosure Engine", "Value Chain ESG Due Diligence Framework", "Reasonable Assurance Readiness Dossiers"],
        frameworks: ["SEBI BRSR Core Guidelines", "NGRBC Principles"],
        metricsHighlight: "100% compliant BRSR disclosure accepted by stock exchanges"
      },
      {
        id: "carbon-footprint-netzero",
        title: "Carbon Footprint & Net Zero Strategy",
        description: "Scope 1, 2, and 3 GHG emissions inventory, Science Based Targets (SBTi), and decarbonization roadmaps.",
        badge: "Net Zero",
        iconName: "Leaf",
        deliverables: ["GHG Protocol Compliant Carbon Accounting Tool", "SBTi Validated Decarbonization Roadmap", "Internal Carbon Pricing Strategy Papers"],
        frameworks: ["GHG Protocol Corporate Standard", "SBTi"],
        metricsHighlight: "Identified 28% carbon reduction levers across manufacturing facilities"
      },
      {
        id: "green-audits-circular",
        title: "Green Audits & Circular Economy",
        description: "Energy audits, water neutrality assessments, zero waste to landfill (ZWTL) certification.",
        badge: "Circular Economy",
        iconName: "RefreshCw",
        deliverables: ["BEE Certified Energy Audit Reports", "Water Footprint & Replenishment Certification", "Zero Waste to Landfill Verification Dossier"],
        frameworks: ["ISO 50001", "BEE Energy Audit Manual"],
        metricsHighlight: "Annual energy cost savings of ₹1.8 Cr via certified audit interventions"
      },
      {
        id: "waste-management-esg",
        title: "Waste Management (Hazardous/E-Waste/Plastic)",
        description: "EPR target tracking, waste valorization audits, and hazardous sludge co-processing compliance.",
        badge: "Waste ESG",
        iconName: "Trash2",
        deliverables: ["End-to-End Waste Traceability Ledger", "Co-Processing & Waste-to-Energy Regulatory Permits", "Plastic Neutrality Certification Packs"],
        frameworks: ["MoEFCC Waste Rules", "Circular Economy Action Plans"],
        metricsHighlight: "98% diversion from landfills achieved across client premises"
      },
      {
        id: "social-supply-chain-ethics",
        title: "Social Compliance & Supply Chain Ethics",
        description: "Sedex SMETA audits, fair wage certifications, modern slavery eradication, and human rights.",
        badge: "Social Ethics",
        iconName: "Heart",
        deliverables: ["SMETA 4-Pillar Audit Preparedness Kit", "Supplier Code of Conduct Verification Engine", "Human Rights Due Diligence (HRDD) Documentation"],
        frameworks: ["Sedex SMETA", "UN Guiding Principles on Business & Human Rights"],
        metricsHighlight: "Secured top-tier supplier rating from Fortune 500 retail clients"
      }
    ]
  },
  {
    id: "international-frameworks",
    name: "International Compliance Frameworks",
    description: "Multi-jurisdictional compliance for global exporters, multinational enterprises, and cross-border trades.",
    iconName: "Globe",
    items: [
      {
        id: "gdpr-eu-privacy",
        title: "GDPR (EU Data Privacy)",
        description: "Data Protection Impact Assessments (DPIA), EU Representative appointments, and Article 30 ROPA.",
        badge: "EU GDPR",
        iconName: "Shield",
        deliverables: ["Article 30 Record of Processing Activities (ROPA)", "72-Hour European DPA Breach Protocol", "EU Standard Contractual Clauses Implementation"],
        frameworks: ["EU General Data Protection Regulation (2016/679)"],
        metricsHighlight: "Zero fines or cross-border data transfer injunctions"
      },
      {
        id: "sox-sarbanes-oxley",
        title: "SOX (US Sarbanes-Oxley)",
        description: "Section 404 internal controls over financial reporting (ICFR), walkthroughs, and key control testing.",
        badge: "US SOX 404",
        iconName: "FileCheck",
        deliverables: ["Risk and Control Matrix (RCM) Design", "IT General Controls (ITGC) Testing Workpapers", "Material Weakness Remediation Roadmaps"],
        frameworks: ["Sarbanes-Oxley Act 2002", "PCAOB Auditing Standards"],
        metricsHighlight: "Zero material weaknesses flagged in SEC 10-K audit"
      },
      {
        id: "uk-bribery-act",
        title: "UK Bribery Act & Anti-Corruption",
        description: "Adequate procedures defense, gifts and entertainment registers, and anti-facilitation payments.",
        badge: "Anti-Bribery",
        iconName: "Scale",
        deliverables: ["Anti-Bribery and Corruption (ABC) Policy Suite", "Third-Party Intermediary Integrity Screening", "Whistleblower Investigation Runbooks"],
        frameworks: ["UK Bribery Act 2010", "US FCPA"],
        metricsHighlight: "100% compliant global distribution partner audits"
      },
      {
        id: "ofac-sanctions",
        title: "OFAC Sanctions Screening",
        description: "Specially Designated Nationals (SDN) real-time screening, export control classification, and dual-use audits.",
        badge: "OFAC Sanctions",
        iconName: "AlertTriangle",
        deliverables: ["Real-Time Automated Sanctions Screening Engine", "EAR / ITAR Export Control Classification Number (ECCN) Audits", "Secondary Sanctions Shielding Framework"],
        frameworks: ["US OFAC Regulations", "BIS Export Administration Regulations"],
        metricsHighlight: "Zero sanctions violations across $1B+ in annual cross-border trade"
      },
      {
        id: "iso-integrated-standards",
        title: "ISO Standards (9001, 14001, 45001)",
        description: "Integrated Management System (IMS) uniting Quality, Environment, and Occupational Health & Safety.",
        badge: "ISO Tri-Cert",
        iconName: "CheckCircle",
        deliverables: ["Unified IMS Manual & Combined Audit Protocol", "Cross-Functional Risk & Opportunity Registers", "Management Review Meeting (MRM) Automation"],
        frameworks: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"],
        metricsHighlight: "35% reduction in audit overhead via integrated certification"
      },
      {
        id: "cross-border-trade-customs",
        title: "Cross-Border Trade & Customs Compliance",
        description: "Harmonized System (HS) code classification, Free Trade Agreement (FTA) rules of origin, and transfer pricing.",
        badge: "Cross-Border Trade",
        iconName: "Truck",
        deliverables: ["Customs Valuation & HS Code Determination Vault", "FTA Certificate of Origin Originating Criteria Tests", "Customs Bond & Carnet Compliance Logs"],
        frameworks: ["WCO SAFE Framework", "CAROTAR 2020 Rules"],
        metricsHighlight: "Duty optimization savings of 12-18% under preferential FTAs"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. SOLUTIONS - C. BY SOLUTION TYPE (AI-Driven)
// ─────────────────────────────────────────────────────────────────────────────

export const solutionsBySolutionType: SolutionCategory[] = [
  {
    id: "ai-advisory",
    name: "AI-Driven Advisory Solutions",
    description: "Generative intelligence that interprets multi-state statutory gazettes and benchmarks your policy gaps.",
    iconName: "Sparkles",
    items: [
      {
        id: "ai-regulatory-intelligence",
        title: "Autonomous Regulatory Change Radar",
        description: "Continuous semantic scanning of 400+ Central and State legislative portals for instant operational alerts.",
        badge: "AI Radar",
        iconName: "Radar",
        deliverables: ["Instant Impact Assessment Summaries", "Machine-Generated Policy Amendment Pull Requests", "Executive Briefing Heatmaps"],
        metricsHighlight: "<15 minutes from Gazette notification to operational alert"
      },
      {
        id: "ai-policy-gap-scanner",
        title: "AI Policy Gap & Alignment Scanner",
        description: "Upload existing internal policies to identify gaps against DPDP, RBI DLG, ISO 27001, and ESG mandates.",
        badge: "Policy LLM",
        iconName: "FileSearch",
        deliverables: ["Redlined Policy Markup Deliverables", "Automated Compliance Cross-Walk Matrices", "Confidence-Scored Readiness Indices"],
        metricsHighlight: "85% reduction in manual legal policy review hours"
      }
    ]
  },
  {
    id: "ai-automation",
    name: "AI-Driven Automation Solutions",
    description: "Autonomous agents that verify vendor bills, match tax credits, and compile statutory registers.",
    iconName: "Cpu",
    items: [
      {
        id: "ai-reconcile-engine",
        title: "Intelligent Statutory Reconciliation Agent",
        description: "Multi-point reconciliation across GST 2B, EPFO challans, and bank books with autonomous discrepancy resolution.",
        badge: "Agentic Reconcile",
        iconName: "GitMerge",
        deliverables: ["Self-Healing Discrepancy Workflows", "Vendor Follow-Up Bot Integration", "Audit-Ready Export Proof Bundles"],
        metricsHighlight: "99.9% automated matching without human intervention"
      },
      {
        id: "ai-kfs-generator",
        title: "Automated KFS & APR Calculation Bot",
        description: "Dynamic generation of RBI-mandated Key Fact Statements with real-time APR mathematics and multilingual rendering.",
        badge: "Fintech Bot",
        iconName: "Zap",
        deliverables: ["Sub-second API Endpoint Deployment", "Automated Borrower Audit Trail Archiving", "Multi-Language PDF Packaging Engine"],
        metricsHighlight: "Over 500,000 compliant loan contracts issued without lag"
      }
    ]
  },
  {
    id: "ai-managed-services",
    name: "AI-Driven Managed Services",
    description: "Virtual Chief Compliance Officer (vCCO) co-pilots operating alongside human industry partners.",
    iconName: "Headphones",
    items: [
      {
        id: "vcco-copilot",
        title: "Virtual CCO & Compliance Co-Pilot",
        description: "24/7 dedicated synthetic advisor tracking all filing deadlines, coordinating audit evidence, and alerting leadership.",
        badge: "vCCO",
        iconName: "UserCheck",
        deliverables: ["Proactive Escalation Watchdogs", "Board-Ready Quarterly Governance Reports", "Vendor Risk Question & Answer Co-Pilot"],
        metricsHighlight: "Zero missed statutory deadlines across active enterprise clients"
      },
      {
        id: "managed-data-protection",
        title: "Managed Data Protection Office (mDPO)",
        description: "Complete outsourced DPO desk managing DSAR requests, consent lifecycle telemetry, and regulatory queries.",
        badge: "mDPO",
        iconName: "Shield",
        deliverables: ["Subject Rights Portal SLA Management", "Regulatory Notice Drafting & Response Support", "Annual Third-Party Privacy Audits"],
        metricsHighlight: "100% adherence to 72-hour DSAR resolution windows"
      }
    ]
  },
  {
    id: "ai-assurance",
    name: "AI-Driven Assurance & Certification",
    description: "Automated evidence collection, continuous SOC 2 / ISO telemetry, and cryptographic verification stamps.",
    iconName: "Award",
    items: [
      {
        id: "continuous-evidence-collector",
        title: "Continuous Evidence Harvester",
        description: "Automated connectors into AWS, Azure, GitHub, Okta, and HRMS for continuous audit readiness.",
        badge: "Continuous Audit",
        iconName: "Database",
        deliverables: ["Zero-Effort Auditor Read-Only Access Rooms", "Real-Time Control Drift Detection Alerts", "Cryptographically Signed Proof Stacks"],
        metricsHighlight: "Eliminates 300+ hours of screenshot-gathering per audit cycle"
      },
      {
        id: "mock-inspection-simulator",
        title: "Synthetic Regulatory Inspection Simulator",
        description: "Simulates hostile RBI, USFDA, or State Labour regulatory interrogations to train internal teams and discover flaws.",
        badge: "Mock Simulator",
        iconName: "Crosshair",
        deliverables: ["AI Regulatory Auditor Persona Drills", "Vulnerability Scorecards & Speech Gap Reports", "Actionable Quick-Fix Priority Roadmap"],
        metricsHighlight: "4x increase in executive audit confidence during live inspections"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. CASE STUDIES (Proven Client Success)
// ─────────────────────────────────────────────────────────────────────────────

export const caseStudiesByIndustry: CaseStudyCategory[] = [
  {
    id: "bfsi-fintech-cases",
    name: "BFSI & Fintech Case Studies",
    iconName: "Landmark",
    studies: [
      {
        id: "case-rbi-it-outsource",
        title: "RBI IT Outsource Compliance for Payments Aggregator",
        clientType: "Tier-1 Payment Gateway ($14B Annual TPV)",
        industry: "BFSI & Fintech",
        challenge: "Facing imminent RBI deadline on the 2023 Master Direction with 120+ unmapped cloud and software vendors.",
        solution: "Deployed GOVENICS Vendor Governance Toolkit, executed materiality assessments, and established contractual exit runbooks.",
        results: ["100% compliant submission approved by RBI without caveats", "Identified 4 critical vendor concentration vulnerabilities", "Turnaround achieved in just 26 business days"],
        metricBadge: "RBI Compliance",
        metricValue: "100% Approved",
        badge: "Fintech Success",
        duration: "26 Days"
      },
      {
        id: "case-dpdp-tier1-bank",
        title: "DPDP Readiness for Tier-1 Private Bank",
        clientType: "Leading Private Bank with 45M Retail Customers",
        industry: "BFSI & Fintech",
        challenge: "Complex legacy core-banking architecture lacking consent granularity and multilingual notices mandated under DPDP Act.",
        solution: "Architected a decentralized consent gateway, authored 22 Indian language notice templates, and trained 1,400 branch managers.",
        results: ["Zero operational disruption to core account operations", "Automated customer rights resolution in <48 hours", "Mitigated statutory penalty exposure of up to ₹250 Cr"],
        metricBadge: "Data Governance",
        metricValue: "₹250 Cr Shield",
        badge: "Banking Core",
        duration: "60 Days"
      },
      {
        id: "case-nbfc-corp-gov",
        title: "NBFC Corporate Governance Overhaul",
        clientType: "Middle-Layer NBFC (AUM ₹4,800 Cr)",
        industry: "BFSI & Fintech",
        challenge: "Transitioning to Upper Layer scale-based regulations requiring mandatory board committees, CRO charters, and internal audit uplift.",
        solution: "Complete restructuring of board governance manuals, instituted ALM frameworks, and established automated CRILC reporting pipelines.",
        results: ["Smooth elevation to Upper Layer NBFC status", "32% faster quarterly supervisory filing cycles", "Zero critical audit remarks from statutory auditors"],
        metricBadge: "SBR Elevation",
        metricValue: "Upper Layer",
        badge: "NBFC Governance",
        duration: "45 Days"
      },
      {
        id: "case-aml-kyc-digital-lender",
        title: "AML/KYC Automation for Digital Lender",
        clientType: "High-Growth FinTech Lender (1.2M Disbursals/Yr)",
        industry: "BFSI & Fintech",
        challenge: "High false-positive rate on manual PEP/Sanctions screening delaying loan disbursements by over 18 hours.",
        solution: "Integrated GOVENICS automated KYC/AML surveillance engine with machine learning disambiguation algorithms.",
        results: ["Disbursement decision turnaround reduced from 18 hours to 4 minutes", "False positive alerts dropped by 78%", "100% PMLA audit compliance achieved"],
        metricBadge: "Speed & Accuracy",
        metricValue: "4 Min SLA",
        badge: "Lending Tech",
        duration: "30 Days"
      }
    ]
  },
  {
    id: "manufacturing-industrial-cases",
    name: "Manufacturing & Industrial Case Studies",
    iconName: "Factory",
    studies: [
      {
        id: "case-auto-oem-safety",
        title: "Shopfloor Safety Automation for Auto OEM",
        clientType: "Major Automotive OEM Assembly Plant",
        industry: "Manufacturing & Industrial",
        challenge: "Persistent near-miss incidents and manual shift-logbook compliance dragging down overall plant safety rating.",
        solution: "Implemented digitized machine-guarding verification and automated contractor safety training certification engines.",
        results: ["Zero lost-time injury (LTI) records for 450 consecutive days", "100% compliance with Factories Act Section 21 to 41", "Awarded National Safety Council Excellence Shield"],
        metricBadge: "Safety Milestone",
        metricValue: "Zero LTI",
        badge: "Auto OEM",
        duration: "90 Days"
      },
      {
        id: "case-warehouse-fire-safety",
        title: "Warehouse Compliance & Fire Safety across Logistics Hub",
        clientType: "National 3PL Logistics Operator (850,000 sq.ft facility)",
        industry: "Manufacturing & Industrial",
        challenge: "Pending Fire NOC renewal and mezzanine racking load certifications risking operational shutdown during peak festival season.",
        solution: "Conducted emergency structural stability and hydraulic sprinkler audits, securing fast-track Fire Directorate endorsement.",
        results: ["Fire NOC secured 12 days ahead of peak sale cutoff", "Structural load capacity certified without decommissioning racks", "Saved estimated ₹12 Cr in peak-season inventory diversion costs"],
        metricBadge: "NOC Clearance",
        metricValue: "12 Days Early",
        badge: "Logistics Hub",
        duration: "18 Days"
      },
      {
        id: "case-factories-act-auto-comp",
        title: "Factories Act Automation for Auto Component Maker",
        clientType: "Tier-1 Auto Ancillary with 4 Manufacturing Units",
        industry: "Manufacturing & Industrial",
        challenge: "Disjointed contractor labour compliance and manual statutory register upkeep across 3 different states.",
        solution: "Unified compliance into GOVENICS automated contractor portal, verifying PF/ESI remittances before monthly billing approvals.",
        results: ["Eliminated 100% of vendor statutory payment leakages", "Zero liability notices during state labour commissioner audits", "Reduced monthly payroll processing time from 7 days to 1 day"],
        metricBadge: "Time Savings",
        metricValue: "85% Faster",
        badge: "Ancillary Maker",
        duration: "40 Days"
      },
      {
        id: "case-esg-brsr-listed-mfg",
        title: "ESG & BRSR Reporting for Listed Manufacturer",
        clientType: "NSE-Listed Specialty Chemicals Conglomerate",
        industry: "Manufacturing & Industrial",
        challenge: "Facing mandatory SEBI BRSR Core assurance across 9 plants without baseline Scope 1, 2, or 3 carbon emission inventories.",
        solution: "Engineered plant-level carbon calculation models, instituted green vendor scorecards, and drafted the complete BRSR Core assurance dossier.",
        results: ["Flawless statutory BRSR disclosure filed on NSE/BSE", "Identified 22% energy efficiency improvement roadmap", "Achieved top quartile ESG ranking in chemicals sector"],
        metricBadge: "ESG Assurance",
        metricValue: "Top Quartile",
        badge: "Listed Entity",
        duration: "75 Days"
      },
      {
        id: "case-supply-chain-electronics",
        title: "Supply Chain Due Diligence for Electronics OEM",
        clientType: "Smartphone & Consumer Electronics Manufacturer",
        industry: "Manufacturing & Industrial",
        challenge: "Exporting to EU requiring immediate RoHS/REACH declarations and conflict mineral due diligence across 280 component suppliers.",
        solution: "Created automated supplier portal for material passport submissions, lab test validation, and non-compliance flags.",
        results: ["100% component compliance documented in 35 days", "Unblocked European export consignment valued at €42M", "Zero customs rejections at European entry ports"],
        metricBadge: "Export Clearance",
        metricValue: "€42M Unblocked",
        badge: "Electronics Fab",
        duration: "35 Days"
      },
      {
        id: "case-hazardous-waste-pharma",
        title: "Hazardous Waste Compliance for Active Pharma (API) Plant",
        clientType: "Bulk Drug Manufacturing Unit (Red Category Industry)",
        industry: "Manufacturing & Industrial",
        challenge: "Show-cause warning from State Pollution Control Board regarding hazardous sludge manifest tracking and incinerator emissions.",
        solution: "Overhauled Form 10 digital manifest procedures, audited TSDF disposal operators, and calibrated online stack monitoring telemetry.",
        results: ["Pollution control board show-cause notice officially rescinded", "100% compliant hazardous waste disposal verified", "Continuous SPCB dashboard green status restored"],
        metricBadge: "Regulatory Relief",
        metricValue: "Notice Rescinded",
        badge: "Pharma API",
        duration: "21 Days"
      }
    ]
  },
  {
    id: "healthcare-hospitals-cases",
    name: "Healthcare & Hospitals Case Studies",
    iconName: "HeartPulse",
    studies: [
      {
        id: "case-clinical-gov-hospital",
        title: "Clinical Governance & NABH 5th Edition for Hospital Chain",
        clientType: "750-Bed Multi-Specialty Hospital Network",
        industry: "Healthcare & Hospitals",
        challenge: "Severe risk of NABH accreditation downgrade due to medication safety documentation gaps and biomedical waste logging delays.",
        solution: "Instituted GOVENICS digital clinical governance registers, radiation safety logbooks, and trained 350 nursing supervisors.",
        results: ["NABH 5th Edition accreditation successfully renewed with zero non-conformances", "Medication administration error rates dropped by 91%", "Patient safety index improved to 99.4%"],
        metricBadge: "Accreditation",
        metricValue: "NABH 5th Ed",
        badge: "Hospital Chain",
        duration: "60 Days"
      },
      {
        id: "case-hipaa-dpdp-healthtech",
        title: "HIPAA & DPDP Compliance for HealthTech Platform",
        clientType: "Tele-Health Platform (2.5M Monthly Active Patients)",
        industry: "Healthcare & Hospitals",
        challenge: "Dual regulatory pressure requiring compliance with US HIPAA for US enterprise clients and India's DPDP Act for domestic users.",
        solution: "Architected data compartmentalization, role-based e-PHI access controls, and implemented automated patient consent deletion routines.",
        results: ["Achieved SOC 2 Type II + HIPAA attestation simultaneously", "Accelerated US enterprise health system deal closures by 3x", "Zero patient data breach incidents recorded"],
        metricBadge: "Global Dual Cert",
        metricValue: "HIPAA + DPDP",
        badge: "HealthTech AI",
        duration: "45 Days"
      },
      {
        id: "case-medical-device-cdsco",
        title: "Medical Device Regulatory Approval & ISO 13485",
        clientType: "Cardiovascular Diagnostic Hardware Manufacturer",
        industry: "Healthcare & Hospitals",
        challenge: "Delays in obtaining CDSCO manufacturing license under Medical Device Rules 2017 stalling domestic product launch.",
        solution: "Prepared technical construction files, audited cleanroom bioburden controls, and guided company through mock regulatory inspection.",
        results: ["CDSCO manufacturing license granted in record 65 days", "ISO 13485:2016 quality management certification achieved", "Domestic commercial launch executed on schedule"],
        metricBadge: "CDSCO License",
        metricValue: "Approved 65d",
        badge: "MedTech Device",
        duration: "65 Days"
      },
      {
        id: "case-patient-data-audit",
        title: "Patient Data Privacy Audit for Pathology Chain",
        clientType: "National Pathology Laboratory Chain (180+ Centers)",
        industry: "Healthcare & Hospitals",
        challenge: "Vulnerabilities in diagnostic report dispatch channels exposing sensitive patient health records to unauthorized access.",
        solution: "Encrypted report sharing workflows, instituted multi-factor patient verification, and created strict internal data access rosters.",
        results: ["100% of diagnostic report deliveries secured with end-to-end encryption", "Zero diagnostic record leaks across 12M annual tests", "Achieved ISO 27701 Privacy Information Management certification"],
        metricBadge: "Data Protection",
        metricValue: "Zero Leaks",
        badge: "Diagnostics",
        duration: "30 Days"
      }
    ]
  },
  {
    id: "it-tech-services-cases",
    name: "IT & Technology Services Case Studies",
    iconName: "Laptop",
    studies: [
      {
        id: "case-soc2-saas-startup",
        title: "ISO 27001 & SOC 2 Accelerator for SaaS Startup",
        clientType: "B2B FinTech SaaS Startup (Series A Funded)",
        industry: "IT & Technology Services",
        challenge: "Enterprise deals worth $3.5M stuck in procurement due to lack of SOC 2 Type II and ISO 27001 certifications.",
        solution: "Deployed continuous compliance telemetry across AWS and GitHub, tailored security policies, and coordinated auditor walkthroughs.",
        results: ["SOC 2 Type II report and ISO 27001 certificate issued in 55 days", "Unblocked $3.5M in annual recurring revenue (ARR)", "Security questionnaire turnaround reduced from 3 weeks to 2 hours"],
        metricBadge: "Revenue Unlocked",
        metricValue: "$3.5M ARR",
        badge: "SaaS Fast-Track",
        duration: "55 Days"
      },
      {
        id: "case-dpdp-it-exporters",
        title: "DPDP Compliance for IT & BPO Exporters",
        clientType: "Global IT Services Firm (8,500 FTE Employees)",
        industry: "IT & Technology Services",
        challenge: "Managing offshore client contracts while aligning with the new Indian DPDP Act and international cross-border transfer laws.",
        solution: "Drafted tailored data processing agreements, set up clean-room governance, and instituted employee statutory privacy training.",
        results: ["100% pass rate in client annual third-party risk audits", "Eliminated contractual indemnity exposure across 85 active MSAs", "Zero privacy non-compliance grievances filed"],
        metricBadge: "Contract Assurance",
        metricValue: "85 MSAs Shielded",
        badge: "IT Services",
        duration: "40 Days"
      },
      {
        id: "case-cspm-cloud-security",
        title: "Cloud Security Posture Management for EdTech Unicorn",
        clientType: "EdTech Platform (18M Registered Students)",
        industry: "IT & Technology Services",
        challenge: "Over 800 open security misconfigurations across multi-cloud infrastructure leaving student databases vulnerable.",
        solution: "Automated remediation of cloud IAM permissions, encrypted public S3 buckets, and implemented infrastructure-as-code guardrails.",
        results: ["Critical misconfigurations eliminated within 72 hours", "Attained 98.6% CIS AWS Benchmark compliance score", "Successfully repelled simulated external penetration attacks"],
        metricBadge: "Security Score",
        metricValue: "98.6% CIS",
        badge: "EdTech Unicorn",
        duration: "14 Days"
      },
      {
        id: "case-vendor-risk-bigtech",
        title: "Vendor Risk Management for Big Tech Engineering Hub",
        clientType: "India Technology Center for Fortune 50 Tech Company",
        industry: "IT & Technology Services",
        challenge: "Managing supply chain cyber risks across 320 domestic vendors providing software, hardware, and facility management services.",
        solution: "Instituted tiered vendor risk assessments, continuous dark-web exposure monitoring, and automated breach SLA enforcement.",
        results: ["Identified and isolated 14 compromised vendor systems before lateral breach", "Reduced vendor onboarding review cycle by 65%", "100% vendor compliance certification achieved"],
        metricBadge: "Risk Containment",
        metricValue: "14 Breaches Stopped",
        badge: "Big Tech",
        duration: "50 Days"
      }
    ]
  },
  {
    id: "infrastructure-construction-cases",
    name: "Infrastructure & Construction Case Studies",
    iconName: "HardHat",
    studies: [
      {
        id: "case-rera-real-estate",
        title: "RERA Compliance Management for Real Estate Developer",
        clientType: "Premium Residential Developer (6 Active Projects in NCR)",
        industry: "Infrastructure & Construction",
        challenge: "Threat of project registration revocation and punitive fines due to delayed quarterly updates and escrow withdrawal discrepancies.",
        solution: "Instituted rigorous quarterly RERA reporting audits, CA/Engineer withdrawal reconciliations, and standardized buyer agreement clauses.",
        results: ["All 6 project registrations fully validated with zero penalties", "Escrow account operations certified 100% compliant", "Buyer dispute inquiries reduced by 72%"],
        metricBadge: "RERA Compliance",
        metricValue: "₹0 Penalties",
        badge: "Real Estate",
        duration: "30 Days"
      },
      {
        id: "case-epc-safety-audits",
        title: "EPC Contractor Safety Audits on Metro Rail Project",
        clientType: "Major Civil Infrastructure EPC Contractor",
        industry: "Infrastructure & Construction",
        challenge: "High-risk elevated viaduct construction facing scrutiny from state safety commissioner following industry-wide safety audit notices.",
        solution: "Deployed specialized safety engineers, audited heavy lifting cranes and formwork scaffolds, and digitized daily permit-to-work systems.",
        results: ["Logged 4.8 Million safe man-hours without reportable injury", "Commended by State Metro Rail Corporation for stellar EHS standards", "Zero project stoppage days during rigorous regulatory checks"],
        metricBadge: "Safe Man-Hours",
        metricValue: "4.8M Hours",
        badge: "Metro Rail",
        duration: "120 Days"
      },
      {
        id: "case-smart-city-privacy",
        title: "Smart City Data Privacy Framework",
        clientType: "Municipal Smart City Special Purpose Vehicle (SPV)",
        industry: "Infrastructure & Construction",
        challenge: "Deploying 1,200 facial recognition surveillance cameras without public trust backlash or legal privacy challenges.",
        solution: "Authored privacy-by-design charter, instituted cryptographic video hashing, and established public transparency registers.",
        results: ["Zero public litigation or injunction challenges in High Court", "Compliance fully verified under DPDP Act 2023 principles", "Praised as national benchmark for ethical municipal surveillance"],
        metricBadge: "Public Trust",
        metricValue: "Zero Litigation",
        badge: "Smart City SPV",
        duration: "60 Days"
      },
      {
        id: "case-logistics-park-clearance",
        title: "Logistics Park Environmental Clearance Acceleration",
        clientType: "120-Acre Multi-Modal Logistics Park Developer",
        industry: "Infrastructure & Construction",
        challenge: "Environmental clearance stalled in State Expert Appraisal Committee (SEAC) due to stormwater runoff and wastewater queries.",
        solution: "Redesigned wastewater recycling models to achieve Zero Liquid Discharge (ZLD) and presented detailed hydrological impact simulations.",
        results: ["Environmental Clearance (EC) granted unconditionally in subsequent session", "Saved 6 months of construction downtime interest costs", "Avoided estimated ₹18 Cr in delay overheads"],
        metricBadge: "Clearance Granted",
        metricValue: "6 Mos Saved",
        badge: "Logistics Park",
        duration: "45 Days"
      }
    ]
  },
  {
    id: "energy-utilities-cases",
    name: "Energy & Utilities Case Studies",
    iconName: "Zap",
    studies: [
      {
        id: "case-carbon-netzero-power",
        title: "Carbon Footprint & Net Zero Roadmap for Power Generation",
        clientType: "Thermal & Hydro Power Utility (3,200 MW Capacity)",
        industry: "Energy & Utilities",
        challenge: "Heavy coal-dependent generation needing aggressive decarbonization targets to qualify for international green bond financing.",
        solution: "Conducted complete Scope 1, 2, 3 carbon accounting, identified biomass co-firing strategies, and structured SBTi net-zero targets.",
        results: ["Successfully raised $350M in oversubscribed Green Bonds", "Formulated verified plan for 32% carbon intensity reduction by 2030", "Achieved compliance with Carbon Credit Trading Scheme"],
        metricBadge: "Green Financing",
        metricValue: "$350M Raised",
        badge: "Power Utility",
        duration: "90 Days"
      },
      {
        id: "case-renewable-regulatory",
        title: "Renewable Energy Regulatory Compliance for 500MW Solar Park",
        clientType: "Independent Solar Power Producer (IPP)",
        industry: "Energy & Utilities",
        challenge: "Navigating complex inter-state transmission (ISTS) open access waivers, grid code regulations, and forecasting penalty risks.",
        solution: "Audited solar plant forecasting systems, streamlined connectivity paperwork, and established statutory CERC tariff compliance desks.",
        results: ["Zero deviation settlement mechanism (DSM) forecasting penalties", "100% ISTS transmission waiver benefits locked in for 25 years", "Commercial operation date (COD) achieved without grid disputes"],
        metricBadge: "Cost Protection",
        metricValue: "100% Waiver",
        badge: "Solar IPP",
        duration: "60 Days"
      },
      {
        id: "case-oil-gas-hse",
        title: "Oil & Gas HSE Management System for City Gas Distributor",
        clientType: "City Gas Distribution Network (180,000 Piped Connections)",
        industry: "Energy & Utilities",
        challenge: "Ensuring zero gas-leak incidents across dense urban pipeline networks subject to strict PNGRB inspection standards.",
        solution: "Audited OISD-116 fire protection systems, trained 400 technicians on SCADA pipeline integrity, and created emergency response protocols.",
        results: ["Zero critical safety non-conformances in annual PNGRB audit", "Pipeline gas loss reduced to sub-0.08% industry benchmark", "100% emergency response drill success rate recorded"],
        metricBadge: "Safety Standard",
        metricValue: "Zero Deviations",
        badge: "City Gas",
        duration: "50 Days"
      },
      {
        id: "case-water-utility-cyber",
        title: "Water Utility Cyber Security Audit for Municipal SCADA",
        clientType: "Metropolitan Water Supply & Sewerage Board",
        industry: "Energy & Utilities",
        challenge: "Critical operational technology (OT/SCADA) infrastructure vulnerable to remote cyber sabotage and ransomware disruption.",
        solution: "Executed deep OT network isolation, implemented air-gapped backups, and established CERT-In compliant incident runbooks.",
        results: ["Hardened 14 major water treatment pumping stations against cyber strikes", "Achieved full compliance with NCIIPC critical infrastructure guidelines", "Continuous real-time threat monitoring operationalized"],
        metricBadge: "Critical Infra",
        metricValue: "14 Stations",
        badge: "Water Board",
        duration: "40 Days"
      }
    ]
  },
  {
    id: "retail-ecommerce-cases",
    name: "Retail & E-commerce Case Studies",
    iconName: "ShoppingCart",
    studies: [
      {
        id: "case-consumer-privacy-d2c",
        title: "Consumer Data Privacy & DPDP for D2C Brand",
        clientType: "Fast-Growing D2C Apparel & Lifestyle Brand (3M Customers)",
        industry: "Retail & E-commerce",
        challenge: "Targeted advertising and pixel trackers exposing company to consumer complaints under Consumer Protection Act and DPDP rules.",
        solution: "Redesigned checkout consent flows, implemented server-side tracking with opt-out mechanisms, and established clear return charters.",
        results: ["Customer data privacy rating scored 99.2% in third-party audits", "Zero regulatory consumer notices or class-action grievances", "Repeat purchase trust metrics improved by 14%"],
        metricBadge: "Trust Score",
        metricValue: "99.2% Privacy",
        badge: "D2C Brand",
        duration: "25 Days"
      },
      {
        id: "case-supply-chain-labor-marketplace",
        title: "Supply Chain Labor Compliance for E-Commerce Marketplace",
        clientType: "Leading E-Commerce Marketplace Hub",
        industry: "Retail & E-commerce",
        challenge: "Allegations of contractor underpayment and excessive shift hours across third-party fulfillment centers during festive sales.",
        solution: "Deployed biometric wage verification, audited third-party staffing agencies, and mandated fair wage minimum payout benchmarks.",
        results: ["100% statutory wage compliance across 18,000 seasonal workers", "Eliminated contractor strike threats during peak Big Billion days", "Positive media coverage on ethical supply chain practices"],
        metricBadge: "Workforce Impact",
        metricValue: "18k Workers",
        badge: "Marketplace Hub",
        duration: "30 Days"
      },
      {
        id: "case-gst-einvoicing-retail",
        title: "GST & E-Invoicing Automation for 450-Store Retail Chain",
        clientType: "Pan-India Lifestyle & Fashion Retailer",
        industry: "Retail & E-commerce",
        challenge: "Manual GST reconciliation causing delayed Input Tax Credit (ITC) claims and ₹3.8 Cr in blocked working capital.",
        solution: "Integrated automated ERP-to-IRP e-invoicing pipelines and automated real-time GSTR-2B purchase invoice matching.",
        results: ["Recovered ₹3.8 Cr in previously stranded Input Tax Credits", "E-invoicing generation latency dropped from 4 hours to 850 milliseconds", "Zero GST audit mismatches across 12 monthly cycles"],
        metricBadge: "Capital Unlocked",
        metricValue: "₹3.8 Cr ITC",
        badge: "Retail Stores",
        duration: "35 Days"
      },
      {
        id: "case-omnichannel-fraud",
        title: "Omnichannel Fraud Prevention & Cash Loss Mitigation",
        clientType: "Electronics & White-Goods Retail Network",
        industry: "Retail & E-commerce",
        challenge: "Cash desk shrinkage and fraudulent return claims causing an estimated 1.8% annual revenue loss across 60 brick-and-mortar stores.",
        solution: "Implemented algorithmic POS transaction anomaly scans, strict return serial verification, and loss prevention auditing.",
        results: ["Store shrinkage and fraud loss reduced by 64%", "Protected ₹5.2 Cr in direct annual operating margins", "Store manager audit compliance adherence reached 100%"],
        metricBadge: "Loss Reduction",
        metricValue: "64% Reduced",
        badge: "Loss Prevention",
        duration: "40 Days"
      }
    ]
  },
  {
    id: "professional-services-cases",
    name: "Professional Services Case Studies",
    iconName: "Briefcase",
    studies: [
      {
        id: "case-automated-payroll-hr",
        title: "Automated Statutory Payroll for HR Outsourcing Firm",
        clientType: "Staffing & HR Solutions Provider (22,000 Deployed Associates)",
        industry: "Professional Services",
        challenge: "Managing monthly PF, ESI, PT, and LWF remittances across 28 states and union territories with zero margin for error.",
        solution: "Engineered automated multi-state statutory calculation engine with automated ECR upload and challan verification.",
        results: ["Maintained 100% on-time challan filing record for 36 consecutive months", "Zero penalty notices from EPFO or ESIC authorities", "Saved 160+ person-hours of manual payroll verification monthly"],
        metricBadge: "Payroll Accuracy",
        metricValue: "100% On-Time",
        badge: "HR Staffing",
        duration: "30 Days"
      },
      {
        id: "case-secretarial-conglomerate",
        title: "Secretarial Compliance for Diversified Conglomerate",
        clientType: "Industrial Conglomerate with 42 Subsidiary Companies",
        industry: "Professional Services",
        challenge: "MCA V3 portal migration chaos, delayed AGM documentation, and risk of director disqualification across subsidiary boards.",
        solution: "Consolidated all 42 corporate entities into unified secretarial calendar, automated statutory minute registers, and pre-cleared filings.",
        results: ["All 42 annual returns filed smoothly without a single late fee", "Zero director disqualifications or MCA show-cause notices", "Consolidated group secretarial cost reduced by 28%"],
        metricBadge: "MCA Compliance",
        metricValue: "42 Entities",
        badge: "Conglomerate",
        duration: "45 Days"
      },
      {
        id: "case-internal-audit-transformation",
        title: "Internal Audit Transformation for Top-10 Chartered Accountancy Firm",
        clientType: "Leading National Audit & Assurance Practice",
        industry: "Professional Services",
        challenge: "Traditional manual sample testing failing to detect complex ERP transaction anomalies for high-profile audit clients.",
        solution: "Equipped audit teams with continuous audit automation tools, full-population testing algorithms, and digital workpaper suites.",
        results: ["Expanded audit test coverage from 5% sample to 100% full transaction population", "Audit cycle time reduced by 40% with higher finding precision", "Lauded by client audit committees for institutional value addition"],
        metricBadge: "Audit Coverage",
        metricValue: "100% Pop.",
        badge: "Audit Firm",
        duration: "30 Days"
      },
      {
        id: "case-legal-tech-security",
        title: "Legal Tech Data Security & Confidentiality Architecture",
        clientType: "Tier-1 Corporate Law Firm (120 Partners & Associates)",
        industry: "Professional Services",
        challenge: "Client M&A data room leakage concerns and compliance with strict international client information barrier guidelines.",
        solution: "Implemented end-to-end encrypted virtual data rooms, strict ethical wall segregation, and watermarked access logging.",
        results: ["Secured sensitive deal archives for over $18B in M&A transaction values", "Zero data leakage incidents across 250+ executed transactions", "Awarded premier ISO 27001 data protection certification"],
        metricBadge: "M&A Protection",
        metricValue: "$18B Deals",
        badge: "Corporate Legal",
        duration: "20 Days"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. CASE STUDIES - B. BY COMPLIANCE DOMAIN
// ─────────────────────────────────────────────────────────────────────────────

export const caseStudiesByComplianceDomain: CaseStudyCategory[] = [
  {
    id: "tax-regulatory-wins",
    name: "Central Govt Tax & Regulatory Success",
    iconName: "Landmark",
    studies: [
      {
        id: "win-gst-reconcile",
        title: "Zero-Error GST Reconciliation for Retail Chain",
        clientType: "National Retail Chain (180 Outlets)",
        industry: "Retail & Consumer",
        challenge: "Mismatch between ERP accounts and supplier GSTR-1 filings causing ₹2.9 Cr in delayed ITC claims.",
        solution: "Automated real-time 2B reconciliation algorithm identifying errant suppliers and issuing automated discrepancy alerts.",
        results: ["100% of eligible ITC claimed without shortfall", "Automated supplier nudging recovered ₹2.1 Cr in missing credits in 45 days", "Zero departmental penalty notices on annual 9C return"],
        metricBadge: "Tax Savings",
        metricValue: "₹2.9 Cr Saved",
        badge: "Tax Success",
        duration: "45 Days"
      },
      {
        id: "win-automated-tds",
        title: "Automated TDS/TCS Filing for Global IT Services Firm",
        clientType: "IT Consulting Services (6,000 Contractors)",
        industry: "IT & Technology",
        challenge: "Complex cross-border vendor payments and Section 194C/194J categorizations triggering monthly short-deduction demands.",
        solution: "Instituted automated withholding tax rule engine pre-validating PAN and lower deduction certificates before disbursement.",
        results: ["Short-deduction demand notices reduced from ₹45 Lakhs to ₹0", "100% automated quarterly 26Q filing compliance achieved", "Vendor satisfaction index improved to 98%"],
        metricBadge: "Demand Notice",
        metricValue: "₹0 Demands",
        badge: "Direct Tax",
        duration: "30 Days"
      },
      {
        id: "win-dgft-license",
        title: "DGFT License Optimization for Heavy Equipment Exporter",
        clientType: "Engineering Machinery Exporter",
        industry: "Manufacturing & Industrial",
        challenge: "Underutilization of Advance Authorizations and EPCG licenses resulting in heavy export duty leakage.",
        solution: "Audited export obligations, redeemed completed licenses with DGFT, and established computerized export tracking registers.",
        results: ["Redeemed 18 pending EPCG licenses without bank guarantee forfeitures", "Captured ₹4.6 Cr in duty exemption savings", "Secured 3-star export house status accreditation"],
        metricBadge: "Duty Savings",
        metricValue: "₹4.6 Cr Saved",
        badge: "Foreign Trade",
        duration: "60 Days"
      },
      {
        id: "win-fema-foreign-invest",
        title: "FEMA Compliance for Foreign Direct Investment",
        clientType: "CleanTech Startup Receiving $40M Series B Foreign Capital",
        industry: "Energy & Utilities",
        challenge: "Tight 30-day RBI statutory deadline for filing Form FC-GPR across complex valuation metrics and multi-currency remittances.",
        solution: "Prepared chartered accountant valuation reports, certified share allotments, and finalized RBI FIRMS portal submission in 9 days.",
        results: ["FC-GPR approval obtained from RBI Authorised Dealer Bank on day 14", "Zero compounding penalties or regulatory queries", "Funds deployed immediately into manufacturing expansion"],
        metricBadge: "FEMA Clearance",
        metricValue: "14 Days",
        badge: "Cross-Border",
        duration: "14 Days"
      }
    ]
  },
  {
    id: "rbi-nbfc-wins",
    name: "RBI & NBFC Governance Wins",
    iconName: "ShieldCheck",
    studies: [
      {
        id: "win-rbi-audit-zero-dev",
        title: "Zero Critical Deviations in RBI Annual Financial Inspection",
        clientType: "Tier-1 FinTech Non-Banking Financial Company",
        industry: "BFSI & Fintech",
        challenge: "Preparing for full-scope RBI on-site inspection amidst newly introduced scale-based norms and IT outsourcing scrutiny.",
        solution: "Conducted simulated pre-inspection audit, overhauled credit risk registers, and closed 48 potential control vulnerabilities.",
        results: ["Concluded annual inspection with zero critical deviations or supervisory letters", "Affirmed as model regulatory compliant entity by external statutory auditors", "Board expressed unanimous commendation for compliance readiness"],
        metricBadge: "RBI Audit",
        metricValue: "Zero Deviations",
        badge: "Supervisory Win",
        duration: "45 Days"
      },
      {
        id: "win-digital-lending-impl",
        title: "Digital Lending Guidelines Implementation for Neo-Lender",
        clientType: "Mobile-First Consumer Lending App",
        industry: "BFSI & Fintech",
        challenge: "Adapting direct disbursal, cooling-off period, and KFS mandates without damaging 60-second loan approval user experience.",
        solution: "Engineered ultra-fast automated Key Fact Statement generator and integrated real-time consent withdrawal mechanisms into checkout UX.",
        results: ["100% compliant with RBI Digital Lending Directives", "Disbursement conversion rates maintained above 88%", "Zero customer grievances escalated to the RBI Ombudsman"],
        metricBadge: "DLG Compliance",
        metricValue: "100% Compliant",
        badge: "Digital Lending",
        duration: "25 Days"
      },
      {
        id: "win-nbfc-board-gov",
        title: "NBFC Board Governance Framework & Policy Suite",
        clientType: "Middle-Layer Infrastructure Financing NBFC",
        industry: "BFSI & Fintech",
        challenge: "Lacking independent director charters, ALM committee formalization, and risk appetite frameworks required by RBI.",
        solution: "Drafted 18 specialized statutory policies, formalized committee terms of reference, and instituted board evaluation matrices.",
        results: ["Fully compliant board governance structure instituted", "Credit rating upgraded from A- to AA due to institutional governance strength", "Lowered wholesale borrowing costs by 35 basis points"],
        metricBadge: "Rating Upgrade",
        metricValue: "A- to AA",
        badge: "Board Governance",
        duration: "30 Days"
      },
      {
        id: "win-aml-surveillance",
        title: "AML/CFT Surveillance System Deployment for Remittance Hub",
        clientType: "Authorized Cross-Border Money Transfer Operator",
        industry: "BFSI & Fintech",
        challenge: "Manual transaction screening struggling to keep up with 50,000 monthly transactions, risking PMLA non-compliance.",
        solution: "Deployed algorithmic transaction monitoring engine with suspicious transaction report (STR) automated triggers.",
        results: ["Full automation of daily sanctions and Politically Exposed Person (PEP) screening", "Identified and halted 6 suspected structuring patterns in first quarter", "FIU-IND reporting filed 100% within statutory deadlines"],
        metricBadge: "AML Detection",
        metricValue: "100% FIU Pass",
        badge: "AML Automation",
        duration: "30 Days"
      }
    ]
  },
  {
    id: "labour-safety-triumphs",
    name: "State-Level Labour & Safety Triumphs",
    iconName: "HardHat",
    studies: [
      {
        id: "win-pf-esi-mfg",
        title: "100% PF/ESI Compliance for Heavy Manufacturing Plant",
        clientType: "Automobile Components Manufacturer (3,200 Associates)",
        industry: "Manufacturing & Industrial",
        challenge: "Historical inspection notice alleging ₹1.2 Cr in unpaid PF contributions for third-party canteen and housekeeping staff.",
        solution: "Re-audited 5 years of subcontractor records, established non-liability evidence under Section 7A, and defended case before EPFO.",
        results: ["EPFO 7A assessment dropped without penalty", "Instituted automated biometric contractor verification gate", "Saved company ₹1.2 Cr in unjustified historical demands"],
        metricBadge: "Assessment Win",
        metricValue: "₹1.2 Cr Saved",
        badge: "Labour Legal",
        duration: "60 Days"
      },
      {
        id: "win-factory-license-accel",
        title: "Factory License Renewal Acceleration across 5 States",
        clientType: "Consumer Goods Manufacturer with 12 Plant Locations",
        industry: "Manufacturing & Industrial",
        challenge: "Multi-state factory license renewals tangled in state inspectorate backlogs risking production halts.",
        solution: "Leveraged digitized compliance registers, pre-cleared industrial safety audits, and fast-tracked online applications.",
        results: ["All 12 factory licenses renewed 3 weeks ahead of expiry dates", "Zero production downtime across manufacturing lines", "Praised by state labour departments for exemplary documentation"],
        metricBadge: "License Renewal",
        metricValue: "12 Plants Pass",
        badge: "Factory Act",
        duration: "20 Days"
      },
      {
        id: "win-zero-accident-construction",
        title: "Zero Accident Safety Record on High-Speed Rail Project",
        clientType: "Infrastructure Construction Consortium",
        industry: "Infrastructure & Construction",
        challenge: "High casualty risk on underground tunneling and heavy gantry crane operations.",
        solution: "Instituted strict permit-to-work protocols, dynamic toolbox talks, and continuous safety officer oversight.",
        results: ["Achieved 6.5 Million safe man-hours with zero fatal or lost-time injuries", "Awarded National Safety Council Gold Award", "Zero stop-work orders issued by government inspectors"],
        metricBadge: "Safety Milestone",
        metricValue: "6.5M Hours",
        badge: "Zero Accident",
        duration: "180 Days"
      },
      {
        id: "win-contract-wage-verify",
        title: "Contract Labour Wage Verification & Statutory Shielding",
        clientType: "FMCG Distribution Giant (40 Warehouses)",
        industry: "Retail & E-commerce",
        challenge: "Subcontractors failing to distribute minimum wages, exposing FMCG principal employer to severe joint liability.",
        solution: "Implemented direct bank-transfer wage proof verification before releasing monthly contractor service fees.",
        results: ["100% of 4,500 contract workers received full statutory minimum wages and bonuses", "Eliminated vicarious liability exposure for the brand", "Worker retention improved by 34%"],
        metricBadge: "Wage Accuracy",
        metricValue: "100% Audited",
        badge: "Fair Wages",
        duration: "40 Days"
      },
      {
        id: "win-warehouse-ergonomics",
        title: "Warehouse Ergonomics & Safety Audit Transformation",
        clientType: "E-Commerce Fulfillment Center (1,400 Pickers/Packers)",
        industry: "Retail & E-commerce",
        challenge: "High worker turnover and repetitive strain injuries during peak delivery cycles leading to labour commissioner complaints.",
        solution: "Engineered ergonomic workstation redesign, optimized box-lifting heights, and introduced mandatory rotation protocols.",
        results: ["Workplace ergonomic strain complaints decreased by 74%", "Associate daily productivity increased by 18%", "State industrial health inspection passed with highest rating"],
        metricBadge: "Injury Reduction",
        metricValue: "74% Drop",
        badge: "Ergonomics",
        duration: "30 Days"
      }
    ]
  },
  {
    id: "environmental-success",
    name: "State-Level Environmental Success",
    iconName: "Leaf",
    studies: [
      {
        id: "win-cpcb-consent-15d",
        title: "CPCB Consent (CTO) Renewal in 15 Days",
        clientType: "Specialty Textile Processing Plant (Red Category)",
        industry: "Manufacturing & Industrial",
        challenge: "Consent to Operate expiring in 3 weeks with pending queries regarding biological oxygen demand (BOD) discharge limits.",
        solution: "Audited secondary effluent treatment plant, calibrated online monitoring telemetry, and filed fast-track rectification files.",
        results: ["Consent to Operate granted unconditionally in 15 business days", "Avoided threatened factory closure and loss of $2M export order", "Effluent parameters stabilized well within SPCB statutory thresholds"],
        metricBadge: "Fast CTO",
        metricValue: "15 Days Pass",
        badge: "Environmental",
        duration: "15 Days"
      },
      {
        id: "win-epr-credit-filing",
        title: "EPR Credit Sourcing & Filing for Plastic Brand Owner",
        clientType: "Leading Beverage Brand (Consuming 12,000 MT Plastic/Yr)",
        industry: "Food Processing & FMCG",
        challenge: "Risk of hefty CPCB environmental compensation fines for unfulfilled plastic packaging EPR collection targets.",
        solution: "Audited registered plastic recyclers, verified traceability certificates, and completed statutory annual EPR portal filing.",
        results: ["Fulfilled 100% of Category I, II, III plastic packaging targets", "Saved company ₹3.4 Cr compared to spot-market broker rates", "Certificate of Compliance issued by CPCB with zero penalty"],
        metricBadge: "EPR Savings",
        metricValue: "₹3.4 Cr Saved",
        badge: "EPR Plastic",
        duration: "25 Days"
      },
      {
        id: "win-zero-liquid-discharge",
        title: "Zero Liquid Discharge Achievement for Dyeing Unit",
        clientType: "Industrial Dyeing & Chemical Processing Unit",
        industry: "Manufacturing & Industrial",
        challenge: "High TDS wastewater violating zero-discharge mandate risking immediate water and power disconnection.",
        solution: "Overhauled multi-stage RO and mechanical vapor recompression (MVR) evaporators, setting up continuous water reuse loops.",
        results: ["Achieved 96.5% water recovery rate, eliminating all surface discharge", "Secured 5-year uninterrupted Consent to Operate", "Reduced freshwater procurement costs by ₹42 Lakhs annually"],
        metricBadge: "Water Recovery",
        metricValue: "96.5% ZLD",
        badge: "ZLD CleanTech",
        duration: "45 Days"
      },
      {
        id: "win-haz-waste-tracking",
        title: "Hazardous Waste Manifest Tracking for Pharmaceutical Unit",
        clientType: "Active Pharmaceutical Ingredients (API) Facility",
        industry: "Healthcare & Life Sciences",
        challenge: "Untracked disposal manifests from previous management risking heavy penal liabilities and criminal environmental prosecution.",
        solution: "Instituted cryptographic barcode tracking on every hazardous waste barrel and reconciled records with TSDF facilities.",
        results: ["100% reconciliation of 850 metric tons of hazardous waste", "SPCB inspection closed with full commendation", "Eliminated environmental liability risks for company directors"],
        metricBadge: "Waste Audit",
        metricValue: "850 MT Clean",
        badge: "Hazardous Waste",
        duration: "30 Days"
      }
    ]
  },
  {
    id: "privacy-cyber-wins",
    name: "Data Privacy & Cybersecurity Wins",
    iconName: "Lock",
    studies: [
      {
        id: "win-soc2-type2-60d",
        title: "SOC 2 Type II in 60 Days for Enterprise SaaS Platform",
        clientType: "Cloud HR & Payroll SaaS Serving 400+ Enterprise Clients",
        industry: "IT & Technology Services",
        challenge: "Procurement standstill with Fortune 500 US enterprise clients due to absence of SOC 2 Type II assurance report.",
        solution: "Automated continuous evidence collection across AWS, implemented automated employee background checks, and guided auditor testing.",
        results: ["SOC 2 Type II clean report issued with zero exceptions", "Unlocked $6.2M in annual recurring contract revenue", "Reduced internal audit overhead by 80% using automated telemetry"],
        metricBadge: "Deal Unlocked",
        metricValue: "$6.2M Deals",
        badge: "SOC 2 Type II",
        duration: "60 Days"
      },
      {
        id: "win-breach-response-6h",
        title: "Breach Response in <6 Hours for Healthcare Diagnostic Network",
        clientType: "Diagnostic Network with 45 Testing Labs",
        industry: "Healthcare & Life Sciences",
        challenge: "Ransomware strike attempting data exfiltration of 250,000 sensitive patient test records at 2:00 AM.",
        solution: "Activated GOVENICS Incident Response Playbook: isolated compromised subnets, preserved forensic logs, and notified CERT-In within 4 hours.",
        results: ["Zero patient medical records exfiltrated or corrupted", "All lab operations restored within 6 hours without ransom payment", "100% compliant statutory notification filed with CERT-In"],
        metricBadge: "Response Time",
        metricValue: "<4h CERT-In",
        badge: "Incident Shield",
        duration: "6 Hours"
      },
      {
        id: "win-dpdp-consent-manager",
        title: "DPDP Consent Manager Implementation for FinTech App",
        clientType: "Personal Finance & Investment App (6M Active Users)",
        industry: "BFSI & Fintech",
        challenge: "Need to replace opaque terms-of-service with granular, multilingual opt-in consent flows under India's DPDP Act.",
        solution: "Built dynamic consent gateway supporting 12 regional languages, real-time revocation APIs, and tamper-evident audit logs.",
        results: ["Over 6 Million user consents securely cataloged and verified", "User opt-in rate maintained at an industry-leading 93.4%", "Zero friction observed in onboarding drop-off metrics"],
        metricBadge: "Consent Scale",
        metricValue: "6M Users",
        badge: "DPDP Consent",
        duration: "30 Days"
      },
      {
        id: "win-cloud-hardening-aws",
        title: "Cloud Security Hardening for Multi-Region AWS Architecture",
        clientType: "FinTech Payments Aggregator Operating Across 3 AWS Regions",
        industry: "IT & Technology Services",
        challenge: "Complex microservices sprawl resulting in overly permissive IAM roles and public endpoint exposures.",
        solution: "Implemented automated least-privilege IAM policies, KMS envelope encryption, and real-time GuardDuty response bots.",
        results: ["Achieved 100% pass mark on PCI-DSS 4.0 and ISO 27001 cloud security audits", "Eliminated all 340 overly permissive IAM roles within 14 days", "Cloud threat detection latency reduced to under 30 seconds"],
        metricBadge: "Cloud Security",
        metricValue: "100% PCI-DSS",
        badge: "AWS Security",
        duration: "20 Days"
      }
    ]
  },
  {
    id: "risk-internal-audit-wins",
    name: "Risk Management & Audit Triumphs",
    iconName: "ShieldAlert",
    studies: [
      {
        id: "win-erm-bfsi",
        title: "ERM Framework Deployment for Housing Finance Company",
        clientType: "National Housing Finance Company (Loan Book ₹8,500 Cr)",
        industry: "BFSI & Fintech",
        challenge: "Siloed credit, liquidity, and operational risk registers failing to provide Board with unified risk exposure visibility.",
        solution: "Deployed COSO-aligned Enterprise Risk Management taxonomy, automated 5x5 heatmaps, and structured Key Risk Indicator alerts.",
        results: ["Unified 14 risk domains into single real-time executive dashboard", "Early-warning KRI system preempted ₹35 Cr in stressed asset exposure", "Board Risk Committee audit rating upgraded to exemplary"],
        metricBadge: "Risk Shield",
        metricValue: "₹35 Cr Saved",
        badge: "ERM Core",
        duration: "50 Days"
      },
      {
        id: "win-third-party-dashboard",
        title: "Third-Party Risk Dashboard for IT Services Giant",
        clientType: "Multinational IT Outsourcer (450 Tier-1 Vendors)",
        industry: "IT & Technology Services",
        challenge: "Subcontractor data leaks threatening client MSA contracts and European data sovereignty covenants.",
        solution: "Automated continuous security scorecards for all 450 vendors with contractual penalty trigger integration.",
        results: ["Identified and isolated 18 non-compliant vendors before client audits", "Reduced vendor security review cycle time by 60%", "100% pass rate in client vendor risk audits"],
        metricBadge: "Vendor Score",
        metricValue: "450 Vendors",
        badge: "Third-Party",
        duration: "40 Days"
      },
      {
        id: "win-bcp-activation",
        title: "Business Continuity Plan Activation During Extreme Weather Event",
        clientType: "Coastal Manufacturing & Logistics Hub",
        industry: "Manufacturing & Industrial",
        challenge: "Severe cyclone knocking out regional power grid and communications infrastructure during critical export shipping window.",
        solution: "Triggered GOVENICS pre-rehearsed BCP protocol: satellite comms, emergency diesel power, and hot-site order redirection.",
        results: ["Export orders dispatched within 12 hours of cyclone landfall", "Zero data loss and zero employee injuries recorded", "Saved estimated ₹18 Cr in overseas contractual default penalties"],
        metricBadge: "Resilience",
        metricValue: "₹18 Cr Saved",
        badge: "BCP Resilience",
        duration: "48 Hours"
      },
      {
        id: "win-forensic-audit-recovery",
        title: "Forensic Audit Recovery for Auto Component Manufacturer",
        clientType: "Automotive Tier-1 Manufacturer",
        industry: "Manufacturing & Industrial",
        challenge: "Whistleblower report alleging systematic procurement fraud and inflated scrap-metal billing over a 3-year period.",
        solution: "Executed forensic data analytics using Benford's Law on 85,000 purchase invoices, uncovering collusive vendor cartels.",
        results: ["Uncovered ₹6.8 Cr in fraudulent billing across 4 rogue vendors", "Recovered ₹4.2 Cr in direct liquid assets through legal settlements", "Instituted automated tamper-proof procurement controls"],
        metricBadge: "Asset Recovery",
        metricValue: "₹4.2 Cr Won",
        badge: "Forensics",
        duration: "35 Days"
      }
    ]
  },
  {
    id: "esg-sustainability-wins",
    name: "ESG & Sustainability Impact",
    iconName: "Sun",
    studies: [
      {
        id: "win-brsr-core-listed",
        title: "BRSR Core Compliance for Listed Infrastructure Conglomerate",
        clientType: "BSE-500 Infrastructure Leader (Market Cap ₹24,000 Cr)",
        industry: "Infrastructure & Construction",
        challenge: "Mandatory assurance required on SEBI's new BRSR Core Key Performance Indicators with zero prior baseline data.",
        solution: "Instituted quantitative data tracking across water footprint, gender diversity, greenhouse gas emissions, and supply chain ethics.",
        results: ["Achieved 100% clean assurance opinion from Big-4 external verifiers", "Institutional foreign investor shareholding increased by 3.8%", "Ranked in top 5% of infrastructure firms for ESG transparency"],
        metricBadge: "BRSR Assurance",
        metricValue: "Top 5% Rank",
        badge: "SEBI BRSR",
        duration: "70 Days"
      },
      {
        id: "win-carbon-reduction-25",
        title: "25% Carbon Reduction Roadmap for Energy Utility",
        clientType: "Thermal & Renewable Power Producer",
        industry: "Energy & Utilities",
        challenge: "Facing increasing carbon taxes and green financing exclusions unless emissions intensity dropped rapidly.",
        solution: "Engineered heat-rate efficiency improvements, planned rooftop solar integration, and phased coal-to-biomass co-firing.",
        results: ["Verified 25% drop in carbon emissions per megawatt-hour produced", "Secured eligibility for global sustainability-linked loans (SLL)", "Saved ₹14 Cr annually in avoided environmental compensations"],
        metricBadge: "Emissions Drop",
        metricValue: "25% Reduced",
        badge: "Decarbonize",
        duration: "90 Days"
      },
      {
        id: "win-circular-waste-model",
        title: "Circular Economy Waste Model for Beverage Bottling Giant",
        clientType: "National Beverage Bottling Operator (14 Plants)",
        industry: "Food Processing & FMCG",
        challenge: "Excessive sludge and broken glass waste disposal costs accompanied by intense local community environmental scrutiny.",
        solution: "Partnered with cement kilns for thermal sludge co-processing and cullet recycling, closing the circular manufacturing loop.",
        results: ["Diverted 98.2% of total plant waste away from landfills", "Turned waste disposal cost into ₹85 Lakhs in annual recycling revenue", "Earned Confederation of Indian Industry (CII) GreenCo Platinum Rating"],
        metricBadge: "Zero Landfill",
        metricValue: "98.2% Divert",
        badge: "Circular Econ",
        duration: "60 Days"
      },
      {
        id: "win-social-audit-supply",
        title: "Social Audit for Global Footwear Supply Chain",
        clientType: "Export Footwear Manufacturer (3,500 Artisans & Workers)",
        industry: "Retail & Consumer",
        challenge: "European luxury client demanding strict SMETA 4-pillar social compliance audit to renew multi-year manufacturing contract.",
        solution: "Overhauled overtime registers, upgraded fire egress systems, verified living wages, and trained worker safety committees.",
        results: ["Passed SMETA 4-pillar audit with zero non-conformances", "Secured 3-year contract renewal valued at $45M", "Worker satisfaction index increased to 96%"],
        metricBadge: "Social Audit",
        metricValue: "$45M Renewal",
        badge: "SMETA Social",
        duration: "40 Days"
      }
    ]
  },
  {
    id: "international-wins",
    name: "International Compliance Achievements",
    iconName: "Globe",
    studies: [
      {
        id: "win-gdpr-eu-clients",
        title: "GDPR Compliance for IT Exporter Serving EU Banks",
        clientType: "BFSI Software Solutions Exporter (Zurich & Frankfurt Clients)",
        industry: "IT & Technology Services",
        challenge: "Strict German BaFin regulatory scrutiny threatening client data processing contracts under EU GDPR Article 44-49.",
        solution: "Established EU Standard Contractual Clauses (SCCs), completed transfer impact assessments, and certified EU data residency compliance.",
        results: ["BaFin third-party audit passed without a single reservation", "Retained €28M in annual recurring European banking revenues", "Accelerated new European client onboarding by 4x"],
        metricBadge: "EU Revenues",
        metricValue: "€28M Shielded",
        badge: "GDPR Pass",
        duration: "45 Days"
      },
      {
        id: "win-sox-controls-us",
        title: "SOX Controls Implementation for US Dual-Listing",
        clientType: "Indian Tech Unicorn Preparing for US Dual Listing",
        industry: "IT & Technology Services",
        challenge: "Zero formal Sarbanes-Oxley 404 documentation in place, posing substantial delay risks to impending NYSE/Nasdaq IPO filings.",
        solution: "Documented 180 key financial controls, implemented automated segregation of duties (SoD) in ERP, and conducted pre-audit dry runs.",
        results: ["Achieved clean SOX 404 attestation from US Big-4 audit partners", "Eliminated all 12 potential material weaknesses prior to SEC S-1 submission", "Successful dual-listing executed on schedule"],
        metricBadge: "SOX 404",
        metricValue: "Clean Opinion",
        badge: "US Listing",
        duration: "90 Days"
      },
      {
        id: "win-iso-integrated-audit",
        title: "ISO 9001/14001 Integrated Audit for Global Auto Components",
        clientType: "Precision Machining Exporter (8 Plants in India & Thailand)",
        industry: "Manufacturing & Industrial",
        challenge: "Exorbitant audit overhead managing separate quality, environmental, and health & safety certification audits.",
        solution: "Integrated all 3 frameworks into unified Integrated Management System (IMS) with synchronized multi-site surveillance.",
        results: ["38% reduction in overall certification audit fees and management hours", "100% recertification achieved across all 8 global plants", "Streamlined supplier qualification approvals with European OEMs"],
        metricBadge: "Audit Efficiency",
        metricValue: "38% Cost Cut",
        badge: "Integrated ISO",
        duration: "45 Days"
      },
      {
        id: "win-ofac-sanctions-setup",
        title: "OFAC Sanctions Screening Setup for Global Diamond & Gold Trader",
        clientType: "Precious Commodities Export House ($800M Annual Turnover)",
        industry: "Retail & Consumer",
        challenge: "Risk of secondary US sanctions and dollar clearing suspensions due to cross-border counterparties in high-risk jurisdictions.",
        solution: "Deployed real-time automated OFAC Specially Designated Nationals (SDN) screening and automated trade vessel tracking.",
        results: ["Zero sanctions exposure or blocked correspondent banking wires", "100% compliance certified by international bullion clearing houses", "Turnaround on international letters of credit accelerated by 48 hours"],
        metricBadge: "Trade Defense",
        metricValue: "$800M Cleared",
        badge: "OFAC Shield",
        duration: "25 Days"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. CASE STUDIES - C. BY OUTCOME METRICS (KPIs)
// ─────────────────────────────────────────────────────────────────────────────

export interface OutcomeKpiGroup {
  id: string;
  categoryTitle: string;
  description: string;
  iconName: string;
  metrics: {
    title: string;
    stat: string;
    description: string;
    proofClient: string;
    badge: string;
  }[];
}

export const caseStudiesByOutcomeMetrics: OutcomeKpiGroup[] = [
  {
    id: "regulatory-compliance-outcomes",
    categoryTitle: "Regulatory & Compliance Outcomes",
    description: "Concrete proof of zero statutory penalties, zero audit deviations, and flawless regulatory inspection passes.",
    iconName: "ShieldCheck",
    metrics: [
      {
        title: "Zero Critical Audit Deviations",
        stat: "0 Discrepancies",
        description: "Achieved across 40+ annual RBI, SEBI, IRDAI, and CPCB regulatory supervisory audits.",
        proofClient: "Major NBFC, Payment Aggregators & Listed Chemicals Entities",
        badge: "Audit Clean Sheet"
      },
      {
        title: "100% Statutory Filing Accuracy",
        stat: "100% On-Time",
        description: "Zero late fees or delayed submissions across GST, EPFO, ESIC, MCA V3, and State Labour departments.",
        proofClient: "450-Store Retail Network & 22,000-Associate Staffing Provider",
        badge: "Flawless Timeliness"
      },
      {
        title: "Reduced Penalty Exposure",
        stat: "₹0 Penalties",
        description: "Protected client balance sheets against statutory exposure under DPDP Act (₹250 Cr) and Factories Acts.",
        proofClient: "Tier-1 Private Bank & 6 RERA Residential Developments",
        badge: "Balance Sheet Shield"
      },
      {
        title: "Accelerated License Approvals",
        stat: "3x Faster",
        description: "Consents to Operate, Fire NOCs, CDSCO manufacturing permits, and factory licenses delivered in record cycles.",
        proofClient: "API Pharma Plants, Hospital Chains & 3PL Logistics Parks",
        badge: "Velocity Advantage"
      }
    ]
  },
  {
    id: "operational-efficiency-gains",
    categoryTitle: "Operational Efficiency Gains",
    description: "Replaced manual spreadsheet legwork with autonomous, intelligent compliance orchestration.",
    iconName: "Zap",
    metrics: [
      {
        title: "Reduction in Manual Effort",
        stat: "40% - 65% Cut",
        description: "Automated vendor reconciliations, statutory payroll verification, and evidence harvesting for ISO/SOC 2.",
        proofClient: "Global IT Services, Auto Tier-1 Suppliers & D2C Brands",
        badge: "Man-Hours Saved"
      },
      {
        title: "Faster Incident Response",
        stat: "50% - 75% Quicker",
        description: "Incident containment and CERT-In 6-hour reporting runbooks executed in sub-2 hours during drills.",
        proofClient: "Healthcare Diagnostic Chains & Cloud FinTech Platforms",
        badge: "Sub-2h Response"
      },
      {
        title: "Continuous System Uptime",
        stat: "99.9% Uptime",
        description: "Zero statutory work-stoppages, zero factory closures, and zero cloud compliance downtime.",
        proofClient: "Automotive OEM Assembly Plants & Municipal SCADA Utilities",
        badge: "Uninterrupted Ops"
      },
      {
        title: "Real-time Risk Visibility",
        stat: "24/7 Live Radar",
        description: "Replaced quarterly lagging audits with real-time 5x5 dynamic heatmaps and automated regulatory radar alerts.",
        proofClient: "Housing Finance Companies & Big Tech Engineering Hubs",
        badge: "Continuous Radar"
      }
    ]
  },
  {
    id: "financial-business-impact",
    categoryTitle: "Financial & Business Impact",
    description: "Direct bottom-line margin expansion, unblocked enterprise revenue, and optimized capital costs.",
    iconName: "TrendingUp",
    metrics: [
      {
        title: "Revenue Protection (Deal Closure)",
        stat: "$45M+ Unlocked",
        description: "SOC 2 Type II, ISO 27001, and HIPAA certifications delivered rapidly to satisfy Fortune 500 procurement demands.",
        proofClient: "B2B FinTech SaaS Startups & Global IT Exporters",
        badge: "Enterprise Pipeline"
      },
      {
        title: "Cost Savings via Automation",
        stat: "₹18 Cr+ Saved",
        description: "Recaptured trapped Input Tax Credit (ITC), avoided bank guarantee forfeitures, and eliminated ghost contractor wages.",
        proofClient: "450-Store Fashion Retailer & National FMCG Distributors",
        badge: "Direct Recovery"
      },
      {
        title: "Improved ESG Ratings",
        stat: "Top 5% Quartile",
        description: "Attained premier ESG ranking attracting $350M in oversubscribed international Green Bond financing.",
        proofClient: "BSE-500 Listed Infrastructure Leaders & Clean Power Utilities",
        badge: "Green Capital"
      },
      {
        title: "Lower Insurance Premiums",
        stat: "15% - 22% Discount",
        description: "Demonstrated superior industrial safety, fire protection, and cyber hardening to underwriters, slashing annual premiums.",
        proofClient: "Specialty Chemical Plants & Commercial Real Estate Portfolios",
        badge: "Premium Reduction"
      }
    ]
  },
  {
    id: "trust-reputation-metrics",
    categoryTitle: "Trust & Reputation Metrics",
    description: "Elevating enterprise standing before regulators, shareholders, customers, and associates.",
    iconName: "Award",
    metrics: [
      {
        title: "Enhanced Customer Trust Scores",
        stat: "99.2% Trust Score",
        description: "Verified transparent DPDP consent mechanisms, ethical health data handling, and transparent pricing disclosures.",
        proofClient: "Consumer D2C Brands & Digital Healthcare Apps",
        badge: "Consumer Faith"
      },
      {
        title: "Brand Reputation Protection",
        stat: "Zero Media Crises",
        description: "Shielded leading conglomerates against public environmental scandals, whistleblower fallout, and regulatory raids.",
        proofClient: "42-Subsidiary Conglomerates & Beverage Bottling Networks",
        badge: "Brand Shield"
      },
      {
        title: "Stakeholder Confidence Index",
        stat: "AA Rating Elevation",
        description: "Upgraded institutional credit ratings and earned unanimous Board Risk Committee commendations.",
        proofClient: "Middle-Layer NBFCs & Metropolitan Smart City SPVs",
        badge: "Credit Elevation"
      },
      {
        title: "Employee Safety & Satisfaction",
        stat: "6.5M Safe Hours",
        description: "Zero fatal accidents, ergonomic strain reduced by 74%, and 100% on-time statutory wage payouts.",
        proofClient: "High-Speed Rail Projects & National Logistics Hubs",
        badge: "Worker Welfare"
      }
    ]
  }
];

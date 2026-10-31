// src/data/posterData.ts
// Master Data Repository for GOVENICS Industry & Offering Poster Design System
// Strictly complies with Brand Guidelines: Navy, Royal Blue, White, Soft Blue Gradients (4:5 Aspect Ratio)

export interface StructuredRisk {
  title: string;
  desc: string;
}

export interface PosterSolution {
  title: string;
  desc: string;
  iconName: "ShieldCheck" | "Layers" | "ClipboardCheck" | "FileSearch" | "Settings" | "BarChart3" | "Lock" | "Clock" | "Users" | "CheckCircle2";
}

export interface PosterData {
  id: string;
  title: string;
  categoryType: "industry" | "offering";
  clusterId?: string;
  categoryName: string;
  subCategoryName?: string;
  targetPersona: string;

  // Section B - Executive Messaging
  eyebrow?: string;
  headline: {
    prefix?: string;
    highlight: string;
    suffix?: string;
  };
  subheadline?: string;

  // Section C - Key Statistic / Industry Intelligence
  stat: {
    figure: string;
    label: string;
    context: string;
    source: string;
    year: string;
    impactType?: "financial" | "operational" | "regulatory" | "legal";
    impactLabel?: string;
  };

  // Section D - Visual Iconography Theme
  visualTheme: "manufacturing" | "technology" | "finance" | "healthcare" | "food" | "infrastructure" | "energy" | "retail" | "governance" | "cyber" | "esg" | "supply-chain" | "trade";

  // Section E - Business Risks / Pain Points
  risks: string[];
  structuredRisks?: StructuredRisk[];

  // Section F - How GOVENICS Helps (Up to 6 items)
  solutions: PosterSolution[];

  // Section G - CTA
  cta: {
    text: string;
    link: string;
    subtitle?: string;
    buttonText?: string;
  };
}

export const masterPosterData: Record<string, PosterData> = {
  // =========================================================================
  // INDUSTRY CLUSTERS (9 CLUSTERS)
  // =========================================================================

  "manufacturing-industrial": {
    id: "manufacturing-industrial",
    title: "Manufacturing & Industrial GRC",
    categoryType: "industry",
    clusterId: "manufacturing-industrial",
    categoryName: "Manufacturing & Industrial",
    targetPersona: "Plant Directors & VP Operations",
    eyebrow: "UNANNOUNCED INSPECTION. ZERO BUFFER. PLANT HEAD ACCOUNTABILITY.",
    headline: {
      prefix: "REGULATORS INSPECT PLANTS.",
      highlight: "BOARDS QUESTION OPERATIONS.",
      suffix: ""
    },
    subheadline: "Can Your Multi-Facility Manufacturing Setup Defend Every Statutory Log and EHS Consent During Inspection?",
    stat: {
      figure: "4,800+",
      label: "Factory Inspections",
      context: "Conducted under Factories Act with unannounced safety, wage muster, and hazardous emissions scrutiny.",
      source: "Directorate General Factory Advice Service & Labour Institutes (DGFASLI)",
      year: "2023",
      impactType: "operational",
      impactLabel: "Supervisory Plant Scrutiny"
    },
    visualTheme: "manufacturing",
    risks: [
      "Fragmented Shift Registers: Statutory logs dispersed across plant spreadsheets with zero audit trail.",
      "Contractor CLRA Vulnerabilities: Unreconciled contractor PF/ESI challans exposing the principal employer.",
      "Lapsed Environmental CTOs: Expired state pollution consent renewals risking immediate facility closure.",
      "Plant Head Personal Liability: Factory inspectors holding Directors & Plant Occupiers personally accountable."
    ],
    structuredRisks: [
      {
        title: "Fragmented Shift Registers",
        desc: "Statutory logs dispersed across plant spreadsheets and offline ledgers with zero centralized audit trail."
      },
      {
        title: "Contractor CLRA Vulnerabilities",
        desc: "Unreconciled contractor PF/ESI challans exposing the principal employer to joint statutory liability."
      },
      {
        title: "Lapsed Environmental CTOs",
        desc: "Expired state pollution consent renewals risking immediate facility closure orders."
      },
      {
        title: "Plant Head Personal Liability",
        desc: "Factory inspectors holding Directors & Plant Occupiers personally accountable for non-compliance."
      }
    ],
    solutions: [
      {
        title: "Automated Factory Registers",
        desc: "Digitized daily attendance, overtime, and statutory registers.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Contract Labour Governance",
        desc: "Monthly contractor wage and PF/ESI challan audit verification.",
        iconName: "Users"
      },
      {
        title: "45-Day Consent Escalation",
        desc: "Proactive renewal workflows for PCB, boiler, and safety approvals.",
        iconName: "Clock"
      },
      {
        title: "Evidentiary Audit Vault",
        desc: "Instant statutory dossier assembly for unannounced inspections.",
        iconName: "ShieldCheck"
      },
      {
        title: "EHS Incident Telemetry",
        desc: "Continuous plant floor safety monitoring and near-miss governance.",
        iconName: "Settings"
      },
      {
        title: "40-Year Institutional Defense",
        desc: "Direct representation and advisory defense before state labour commissioners.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "Schedule a Manufacturing Plant Compliance Diagnostic",
      buttonText: "REQUEST FACTORY AUDIT REVIEW →",
      link: "/industries/manufacturing-industrial#consultation-form",
      subtitle: "Includes complete review of active CTOs, contractor wage logs, and boiler approvals."
    }
  },

  "automobiles": {
    id: "automobiles",
    title: "Automotive & Auto-Components GRC",
    categoryType: "industry",
    clusterId: "manufacturing-industrial",
    categoryName: "Automotive & Auto-Components",
    targetPersona: "VP Quality & Plant Directors",
    eyebrow: "TIER-1 STOPPAGE. JOINT STATUTORY LIABILITY. OPERATIONS DEFENSE.",
    headline: {
      prefix: "OEM AUDITORS DEMAND TRACEABILITY.",
      highlight: "CAN YOUR TIER-1 FACTORY DELIVER?",
      suffix: ""
    },
    subheadline: "Are Your Extended Supply Chain and Assembly Shifts Structured to Withstand Zero-Defect Supervisory Scrutiny?",
    stat: {
      figure: "3.8 Million",
      label: "Component Recalls",
      context: "Recorded across automotive tier-1 ecosystems due to component non-conformity and supplier variance.",
      source: "Society of Indian Automobile Manufacturers (SIAM) Bulletin",
      year: "2023",
      impactType: "financial",
      impactLabel: "Supply Chain Financial Exposure"
    },
    visualTheme: "manufacturing",
    risks: [
      "IATF 16949 Gaps: Tier-2 supplier documentation variance disrupting OEM line-side feeding.",
      "Hazardous Substance Defaults: RoHS and REACH chemical non-compliance triggering export customs holding.",
      "High Contract Labour Attrition: Assembly line worker rotation leading to unverified PF/ESI challans.",
      "Tooling Capital Disputes: Unresolved escrow and depreciation disputes during model changeovers."
    ],
    structuredRisks: [
      {
        title: "IATF 16949 Evidentiary Gaps",
        desc: "Supplier documentation inconsistencies causing OEM line-side rejection and audit demerits."
      },
      {
        title: "RoHS / REACH Chemical Defaults",
        desc: "Unverified hazardous chemical manifests causing costly export vehicle impoundments."
      },
      {
        title: "Contractor Workforce Attrition",
        desc: "High contractual churn creating unverified muster rolls and principal employer liabilities."
      },
      {
        title: "Tooling & Line Escrow Exposure",
        desc: "Unsecured tooling advances and capital machinery contracts stalling OEM rollouts."
      }
    ],
    solutions: [
      {
        title: "IATF 16949 Audit Defense",
        desc: "End-to-end traceability of quality logs, PPAP files, and supplier audits.",
        iconName: "ShieldCheck"
      },
      {
        title: "Tier-1/2 Vendor Governance",
        desc: "Automated scoring of vendor regulatory health and labour compliance.",
        iconName: "Layers"
      },
      {
        title: "CLRA Labour Automation",
        desc: "Real-time biometric cross-checking with PF/ESI filings.",
        iconName: "Users"
      },
      {
        title: "Tooling Escrow Architecture",
        desc: "Tripartite commercial escrow protecting capital machinery milestones.",
        iconName: "Lock"
      },
      {
        title: "Hazardous Chemical Manifests",
        desc: "Automated chemical substance compliance and PCB discharge tracking.",
        iconName: "Settings"
      },
      {
        title: "Rapid OEM Audit Dossier",
        desc: "15-minute assembly of complete component quality and statutory proof.",
        iconName: "Clock"
      }
    ],
    cta: {
      text: "Book an Automotive Compliance Readiness Review",
      buttonText: "REQUEST AUTOMOTIVE REVIEW →",
      link: "/industries/manufacturing-industrial#consultation-form",
      subtitle: "Dedicated to OEM suppliers, Tier-1 component manufacturers, and assembly plants."
    }
  },

  "technology-electronics": {
    id: "technology-electronics",
    title: "Technology & Electronics GRC",
    categoryType: "industry",
    clusterId: "technology-electronics",
    categoryName: "Technology & Electronics",
    targetPersona: "Chief Technology Officers & CISOs",
    eyebrow: "CROSS-BORDER DATA FLOWS. 6-HOUR CERT-IN SLA. CISO EXPOSURE.",
    headline: {
      prefix: "DATA FLOWS FREELY ACROSS CLOUD.",
      highlight: "STATUTORY SCRUTINY STOPS AT THE CISO.",
      suffix: ""
    },
    subheadline: "Can Your Tech Infrastructure Demonstrate Immutable DPDP Compliance and Instant Breach Defensibility?",
    stat: {
      figure: "₹250 Crore",
      label: "Statutory Penalty Ceiling",
      context: "Enacted under the Digital Personal Data Protection (DPDP) Act 2023 for unmitigated personal data lapses.",
      source: "MeitY Statutory Gazette Notification",
      year: "2023",
      impactType: "financial",
      impactLabel: "DPDP Statutory Financial Exposure"
    },
    visualTheme: "cyber",
    risks: [
      "DPDP Consent Flaws: Processing customer data without granular, revocable consent architectures.",
      "CERT-In 6-Hour Deadline: Inability to assemble forensic incident dossiers within statutory reporting windows.",
      "BIS Electronics Stoppages: Uncertified component imports impounded at port of entry.",
      "SaaS Vendor Data Leaks: Sub-processors handling enterprise IP without verified data protection agreements."
    ],
    structuredRisks: [
      {
        title: "DPDP Consent Architecture Gaps",
        desc: "Unmapped personal data pipelines exposing the organization to severe statutory penalty orders."
      },
      {
        title: "CERT-In 6-Hour Reporting SLA",
        desc: "Fragmented SOC logs preventing rapid mandatory forensic notifications to national cyber authorities."
      },
      {
        title: "BIS Component Import Impoundments",
        desc: "Delayed Compulsory Registration Scheme approvals halting electronics manufacturing lines."
      },
      {
        title: "Sub-Processor Supply Chain Leaks",
        desc: "Third-party cloud dependencies operating without legally verified data processing agreements."
      }
    ],
    solutions: [
      {
        title: "DPDP Act Readiness Roadmap",
        desc: "Data mapping, consent managers, and data fiduciary compliance baselines.",
        iconName: "Lock"
      },
      {
        title: "CERT-In Breach Playbooks",
        desc: "Automated 6-hour incident documentation and regulatory reporting frameworks.",
        iconName: "Clock"
      },
      {
        title: "BIS Compliance Acceleration",
        desc: "Expedited testing lab liaison and CRS registration for electronic equipment.",
        iconName: "Settings"
      },
      {
        title: "Vendor Cyber Risk Scoring",
        desc: "Continuous assessment of sub-processors and SaaS supply chain contracts.",
        iconName: "ShieldCheck"
      },
      {
        title: "Board-Level Cyber Scorecards",
        desc: "Executive risk dashboards translating technical metrics into audit defensibility.",
        iconName: "BarChart3"
      },
      {
        title: "Cross-Border Transfer Advisory",
        desc: "Legal shielding for multinational data residency and cloud transfer mandates.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "Schedule an Executive Cyber Risk & DPDP Diagnostic",
      buttonText: "REQUEST CYBER RISK ASSESSMENT →",
      link: "/industries/technology-electronics#consultation-form",
      subtitle: "Audit your DPDP Act gaps, CERT-In logging readiness, and BIS import approvals."
    }
  },

  "financial-services": {
    id: "financial-services",
    title: "Financial Services & Banking GRC",
    categoryType: "industry",
    clusterId: "financial-services",
    categoryName: "Financial Services & Banking",
    targetPersona: "Chief Risk Officers & Head of Compliance",
    eyebrow: "SUPERVISORY AUDIT. RBI / SEBI SCRUTINY. BOARD-LEVEL DEFENSIBILITY.",
    headline: {
      prefix: "SUPERVISORS AUDIT OPERATIONS.",
      highlight: "BOARDS QUESTION CROs.",
      suffix: ""
    },
    subheadline: "Can Your Institution Reconcile Multi-State Portfolios and Escrow Liabilities Before Supervisory Inspectors Arrive?",
    stat: {
      figure: "₹847 Crore",
      label: "SEBI LODR & RBI Penalties",
      context: "Enforced across financial intermediaries and NBFCs for secretarial omission and governance oversights.",
      source: "SEBI & Reserve Bank of India Annual Enforcement Compendium",
      year: "2023",
      impactType: "financial",
      impactLabel: "Supervisory Financial Enforcement"
    },
    visualTheme: "finance",
    risks: [
      "RBI Scale-Based Gaps: NBFCs struggling to meet Tier-1 bank-grade governance and risk controls.",
      "Escrow Accounting Variances: Reconciliation delays in high-value commercial transactions.",
      "Digital Lending Guideline Default: Non-compliant third-party loan origination partners.",
      "AML / CFT Transaction Backlogs: Unreported suspicious transaction alerts triggering regulatory notices."
    ],
    structuredRisks: [
      {
        title: "RBI SBR Scale Governance Gaps",
        desc: "Mid-sized NBFCs failing to satisfy bank-grade capital adequacy and board oversight mandates."
      },
      {
        title: "Escrow Transaction Variances",
        desc: "Delayed reconciliation between contractual milestones and tripartite fund disbursements."
      },
      {
        title: "LSP / Fintech Partnership Defaults",
        desc: "Loan service providers operating outside RBI digital lending governance directions."
      },
      {
        title: "Director KYC & LODR Delays",
        desc: "Secretarial lapses leading to punitive MCA debarment and stock exchange penalties."
      }
    ],
    solutions: [
      {
        title: "RBI Supervisory Defense",
        desc: "Comprehensive pre-inspection audits mapping every master direction and circular.",
        iconName: "ShieldCheck"
      },
      {
        title: "Commercial Escrow Management",
        desc: "Regulated, neutral escrow mechanisms for M&A, real estate, and project capital.",
        iconName: "Lock"
      },
      {
        title: "SEBI LODR Secretarial Vault",
        desc: "Automated tracking of quarterly filings, board resolutions, and related-party deals.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Fintech Vendor Due Diligence",
        desc: "Rigorous compliance checks for loan servicing partners and tech providers.",
        iconName: "FileSearch"
      },
      {
        title: "AML & KYC Evidentiary Systems",
        desc: "Audit-ready transaction monitoring workflows and suspicious transaction logs.",
        iconName: "Settings"
      },
      {
        title: "Board Risk Committee Advisory",
        desc: "Executive risk reporting and policy defensibility drafted by veteran legal counsels.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "Request a Financial Institutions GRC Assessment",
      buttonText: "REQUEST SUPERVISORY AUDIT REVIEW →",
      link: "/industries/financial-services#consultation-form",
      subtitle: "Tailored for Banks, NBFCs, FinTechs, AIFs, and Wealth Management Firms."
    }
  },

  "healthcare-life-sciences": {
    id: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences GRC",
    categoryType: "industry",
    clusterId: "healthcare-life-sciences",
    categoryName: "Healthcare & Life Sciences",
    targetPersona: "Quality Assurance Heads & Hospital Directors",
    eyebrow: "BATCH INTEGRITY. CDSCO / GMP SCRUTINY. QUALITY HEAD ACCOUNTABILITY.",
    headline: {
      prefix: "REGULATORS SAMPLE PRODUCT BATCHES.",
      highlight: "CAN YOUR QUALITY DOSSIER DEFEND THEM?",
      suffix: ""
    },
    subheadline: "Are Your Revised Schedule M Standards and Biomedical Authorizations Ready for Stringent Regulatory Inspection?",
    stat: {
      figure: "400+",
      label: "Pharma Stop-Production Notices",
      context: "Issued by state and central drug regulators following joint risk-based GMP inspections.",
      source: "Central Drugs Standard Control Organisation (CDSCO) Bulletins",
      year: "2023",
      impactType: "operational",
      impactLabel: "CDSCO Enforcement Notices"
    },
    visualTheme: "healthcare",
    risks: [
      "Revised Schedule M Upgrades: Stricter documentation standards for QA/QC and HVAC validations.",
      "Biomedical Waste Tracking Gaps: Lapsed state PCB authorizations and barcode tracking defaults.",
      "Clinical Data Integrity Gaps: Inadequate audit trails in electronic batch records (eBR).",
      "Spurious Drug Supply Chain: Counterfeit vulnerability in primary packaging and distributor channels."
    ],
    structuredRisks: [
      {
        title: "Revised Schedule M Non-Compliance",
        desc: "Failure to upgrade quality management systems and validation files to new GMP mandates."
      },
      {
        title: "Biomedical Waste Authorizations",
        desc: "Lapsed state PCB disposal consents risking immediate operational suspension notices."
      },
      {
        title: "Electronic Batch Record Variances",
        desc: "Unverified change controls and incomplete audit trails during supervisory sampling."
      },
      {
        title: "Clinical Trial Documentation Gaps",
        desc: "Ethics committee record lapses exposing institutions to CDSCO show-cause notices."
      }
    ],
    solutions: [
      {
        title: "Schedule M Transition Advisory",
        desc: "Gap assessments and turnkey remediation to meet updated national GMP standards.",
        iconName: "ShieldCheck"
      },
      {
        title: "Biomedical & PCB Consent Vault",
        desc: "Real-time tracking of pollution consents, hazardous waste manifests, and renewals.",
        iconName: "Clock"
      },
      {
        title: "21 CFR Part 11 Validation",
        desc: "Data integrity audits ensuring electronic batch records withstand international scrutiny.",
        iconName: "FileSearch"
      },
      {
        title: "Clinical Ethics Governance",
        desc: "Comprehensive protocol compliance and informed consent documentation reviews.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Cold-Chain Supply Verification",
        desc: "Statutory temperature logs and third-party logistics quality audits.",
        iconName: "Settings"
      },
      {
        title: "Legal Defense Against CDSCO Notices",
        desc: "Seasoned pharmaceutical legal representation for statutory show-cause responses.",
        iconName: "Users"
      }
    ],
    cta: {
      text: "Schedule a Healthcare & Pharma Compliance Audit",
      buttonText: "REQUEST HEALTHCARE COMPLIANCE REVIEW →",
      link: "/industries/healthcare-life-sciences#consultation-form",
      subtitle: "Specialized for Formulations, API Plants, Diagnostics, and Hospital Networks."
    }
  },

  "food-processing": {
    id: "food-processing",
    title: "Food Processing & Agriculture GRC",
    categoryType: "industry",
    clusterId: "food-processing",
    categoryName: "Food Processing & Agriculture",
    targetPersona: "Head of Food Safety & Factory Managers",
    eyebrow: "UNANNOUNCED REGULATORY SEIZURE. INGREDIENT TRACEABILITY. FSSAI DEFENSE.",
    headline: {
      prefix: "INSPECTORS ARRIVE UNANNOUNCED.",
      highlight: "CAN YOUR PLANT PRODUCE BATCH LOGS?",
      suffix: ""
    },
    subheadline: "Are Your FoSCoS Annual Returns, Lab Test Records, and Mandated Health Checks Verifiable in Minutes?",
    stat: {
      figure: "26,267",
      label: "FoSCoS Statutory Inspections",
      context: "Executed by regulatory authorities in FY23-24, leading to 3,800+ license suspensions.",
      source: "Food Safety and Standards Authority of India (FSSAI) Annual Report",
      year: "2023",
      impactType: "regulatory",
      impactLabel: "FSSAI Statutory Enforcement"
    },
    visualTheme: "food",
    risks: [
      "FoSCoS Return Delays: Daily late fees compounding for delayed annual processing return filings.",
      "Ingredient Traceability Deficits: Inability to trace suspect raw materials upstream within 2 hours.",
      "Mandatory Food Testing Lapses: Missed biannual NABL lab test reports for water and food contact surfaces.",
      "Worker Medical Fitness Gaps: Uncertified contract workers handling open food contact zones."
    ],
    structuredRisks: [
      {
        title: "FoSCoS Filing Delays & Penalties",
        desc: "Automated daily fines and license de-activation for late quarterly and annual return filings."
      },
      {
        title: "Raw Material Traceability Deficits",
        desc: "Inability to substantiate ingredient batch origins during regulatory recall inquiries."
      },
      {
        title: "Mandatory NABL Testing Backlogs",
        desc: "Unpublished water and product testing certificates leading to product seizure orders."
      },
      {
        title: "Food Handler Health Fitness Lapses",
        desc: "Expired medical fitness cards creating direct violations during unannounced inspections."
      }
    ],
    solutions: [
      {
        title: "FSSAI FoSCoS Automation",
        desc: "Automated return filings, license renewals, and statutory fee reconciliations.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Batch Recall Defense Framework",
        desc: "2-hour backward-forward traceability architecture for regulatory inquiries.",
        iconName: "Clock"
      },
      {
        title: "NABL Lab Audit Synchronization",
        desc: "Scheduled sampling calendars ensuring mandatory food and water testing never lapses.",
        iconName: "Settings"
      },
      {
        title: "Contractor Hygiene Governance",
        desc: "Digital health fitness registers and mandatory food safety training logs.",
        iconName: "Users"
      },
      {
        title: "Packaged Food Label Verification",
        desc: "Comprehensive review of nutritional claims, allergen alerts, and packaging mandates.",
        iconName: "FileSearch"
      },
      {
        title: "Statutory Notice Representation",
        desc: "Immediate senior counsel support for product seizure and adulteration notices.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "Book an FSSAI Plant Compliance Audit",
      buttonText: "REQUEST PLANT AUDIT REVIEW →",
      link: "/industries/food-processing#consultation-form",
      subtitle: "For FMCG, Dairy, Beverages, Spices, and Packaged Food Manufacturing Plants."
    }
  },

  "infrastructure-construction": {
    id: "infrastructure-construction",
    title: "Infrastructure & Construction GRC",
    categoryType: "industry",
    clusterId: "infrastructure-construction",
    categoryName: "Infrastructure & Construction",
    targetPersona: "Project Directors & Legal Counsel",
    eyebrow: "PROJECT ESCROW COMPLIANCE. BOCW WORKFORCE AUDIT. DEVELOPER DEFENSE.",
    headline: {
      prefix: "SITE WORK CANNOT HALT.",
      highlight: "CAN YOUR PROJECT DEFEND ITS STATUTORY REGISTERS?",
      suffix: ""
    },
    subheadline: "Are Your Multi-Contractor BOCW Cess Deposits, RERA Account Allocations, and Site Safety Cleared for Inspection?",
    stat: {
      figure: "70%",
      label: "RERA Mandated Escrow Deposit",
      context: "Enforced for all customer receivables, with stringent statutory audit requirements for fund withdrawals.",
      source: "Real Estate Regulatory Authority (RERA) Compendium",
      year: "2023",
      impactType: "financial",
      impactLabel: "RERA Statutory Capital Restriction"
    },
    visualTheme: "infrastructure",
    risks: [
      "BOCW Cess Miscalculation: 1% statutory cess under-reporting causing retrospective interest demands.",
      "Contractor Safety Defaults: Fatal site accidents triggering stop-work notices and criminal charges.",
      "RERA Withdrawal Discrepancies: Engineer/CA certificate errors causing project account freezing.",
      "Environmental Clearance Violations: Construction prior to CPCB/SPCB Consent to Establish (CTE)."
    ],
    structuredRisks: [
      {
        title: "BOCW 1% Cess Under-Reporting",
        desc: "Retrospective state assessment orders accompanied by compounding interest penalties."
      },
      {
        title: "Contractor Site Safety Defaults",
        desc: "Uncertified scaffolding and labor gear triggering immediate police FIRs and work shutdowns."
      },
      {
        title: "RERA Escrow Withdrawal Variances",
        desc: "Architect and CA milestone discrepancies prompting regulatory escrow account freezes."
      },
      {
        title: "Environmental CTE / Tree Clearances",
        desc: "Excavation and civil work commenced without state pollution control consent."
      }
    ],
    solutions: [
      {
        title: "RERA Escrow Governance",
        desc: "Tripartite verification of project receivables, withdrawals, and completion ratios.",
        iconName: "Lock"
      },
      {
        title: "BOCW Welfare Fund Audits",
        desc: "Accurate cess calculations, contractor passbook management, and labor welfare compliance.",
        iconName: "Users"
      },
      {
        title: "Site Safety Legal Shield",
        desc: "Routine safety audits, PPE certification registers, and incident reporting protocols.",
        iconName: "ShieldCheck"
      },
      {
        title: "CTE/CTO Environmental Tracking",
        desc: "Proactive tracking of dust control norms, CPCB emissions, and groundwater clearances.",
        iconName: "Clock"
      },
      {
        title: "Multi-Tier Contractor Screening",
        desc: "Statutory vetting of civil, MEP, and labor contractors before project mobilization.",
        iconName: "Layers"
      },
      {
        title: "Dispute & Stop-Work Defense",
        desc: "Rapid legal intervention and administrative representations before municipal bodies.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "Schedule an Infrastructure Statutory Risk Assessment",
      buttonText: "REQUEST INFRASTRUCTURE REVIEW →",
      link: "/industries/infrastructure-construction#consultation-form",
      subtitle: "Designed for EPC Contractors, Real Estate Developers, and Public Infra Consortia."
    }
  },

  "energy-utilities": {
    id: "energy-utilities",
    title: "Energy & Utilities GRC",
    categoryType: "industry",
    clusterId: "energy-utilities",
    categoryName: "Energy & Utilities",
    targetPersona: "Chief Operations Officers & EHS Heads",
    eyebrow: "CONTINUOUS POLLUTION TELEMETRY. CPCB CONSENTS. EXECUTIVE LIABILITY.",
    headline: {
      prefix: "POWER NEVER STOPS.",
      highlight: "NEITHER DOES REGULATORY SCRUTINY.",
      suffix: ""
    },
    subheadline: "Can Your Generation & Distribution Units Demonstrate 100% Currency Across Environmental Consents?",
    stat: {
      figure: "₹5 Crore/Incident",
      label: "Environmental Damage Compensation",
      context: "Imposed by the National Green Tribunal (NGT) for untracked industrial emissions and effluent leaks.",
      source: "National Green Tribunal (NGT) Enforcement Gazette",
      year: "2023",
      impactType: "financial",
      impactLabel: "NGT Statutory Compensation Penalty"
    },
    visualTheme: "energy",
    risks: [
      "Online Continuous Emission (OCEMS) Gaps: Disconnected sensors triggering automatic NGT notices.",
      "Hazardous Ash & Effluent Disposal: Fly ash utilization shortfalls causing statutory financial penalties.",
      "Grid Code Compliance Failures: Frequency regulation defaults under State Electricity Regulatory Commissions.",
      "Renewable Purchase Obligation (RPO) Defaults: Unmet green energy quotas causing heavy surcharges."
    ],
    structuredRisks: [
      {
        title: "OCEMS Real-Time Telemetry Drops",
        desc: "Online stack sensor disconnections triggering automated pollution control board show-cause alerts."
      },
      {
        title: "NGT Environmental Penalty Orders",
        desc: "Direct financial liability for fly ash non-utilization and effluent discharge threshold breaches."
      },
      {
        title: "Grid Code Regulatory Penalties",
        desc: "Deviation Settlement Mechanism (DSM) penalties levied by state load dispatch centers."
      },
      {
        title: "RPO Renewable Quota Shortfalls",
        desc: "Mandatory clean energy purchase deficits prompting regulatory surcharge assessments."
      }
    ],
    solutions: [
      {
        title: "OCEMS Environmental Governance",
        desc: "Audit validation of continuous emission telemetry linked to CPCB/SPCB servers.",
        iconName: "Settings"
      },
      {
        title: "NGT Exposure Advisory",
        desc: "Legal defense, environmental remediation audits, and restitution planning.",
        iconName: "ShieldCheck"
      },
      {
        title: "RPO & Green Certificate Auditing",
        desc: "Strategic reconciliation of renewable purchase quotas and carbon offset registers.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Boiler & Electrical Safety Vault",
        desc: "Scheduled statutory certifications under Indian Boilers Act and CEA safety regulations.",
        iconName: "Clock"
      },
      {
        title: "Hazardous Waste Manifest Automation",
        desc: "Digitized tracking of ash utilization, hazardous effluents, and authorized disposal channels.",
        iconName: "Layers"
      },
      {
        title: "Regulatory Commission Advocacy",
        desc: "Senior representation before CERC, SERCs, and Ministry of Power hearings.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "Request an Energy & Environmental Compliance Audit",
      buttonText: "REQUEST ENERGY COMPLIANCE REVIEW →",
      link: "/industries/energy-utilities#consultation-form",
      subtitle: "For Thermal, Solar, Wind, Hydro, Biomass, and Power Distribution Entities."
    }
  },

  "consumer-retail": {
    id: "consumer-retail",
    title: "Consumer Goods & Retail GRC",
    categoryType: "industry",
    clusterId: "consumer-retail",
    categoryName: "Consumer Goods & Retail",
    targetPersona: "VP Supply Chain & Legal Heads",
    eyebrow: "MULTI-STATE PACKAGING NORMS. LEGAL METROLOGY. CCPA SHIELD.",
    headline: {
      prefix: "PRODUCTS DISTRIBUTE ACROSS 28 STATES.",
      highlight: "CAN YOUR PACKAGING DEFEND ITSELF?",
      suffix: ""
    },
    subheadline: "Are Your Extended Producer Responsibility (EPR) Portals and Legal Metrology Filings Audit-Proof?",
    stat: {
      figure: "12,000+",
      label: "Legal Metrology Inspections",
      context: "Conducted annually targeting MRP, weight declaration, origin disclosures, and plastic waste norms.",
      source: "Department of Consumer Affairs (DoCA) Bulletin",
      year: "2023",
      impactType: "regulatory",
      impactLabel: "DoCA Statutory Seizure Volume"
    },
    visualTheme: "retail",
    risks: [
      "Legal Metrology Seizures: Ambiguous font sizes or manufacturing dates leading to retail shelf seizures.",
      "Plastic EPR Portal Non-Compliance: Unmet plastic recycling targets risking sudden trading bans.",
      "CCPA Dark Pattern Notices: Scrutiny by Central Consumer Protection Authority over e-commerce claims.",
      "State Trade Licensing Lapses: Multi-city retail outlets operating with un-renewed municipal permits."
    ],
    structuredRisks: [
      {
        title: "Legal Metrology Retail Seizures",
        desc: "Minor labeling font discrepancies prompting municipal inspectors to impound store inventory."
      },
      {
        title: "Plastic EPR Target Shortfalls",
        desc: "Unredeemed recycling credits triggering heavy environmental compensation surcharges."
      },
      {
        title: "CCPA Misleading Claim Scrutiny",
        desc: "Consumer authority show-cause notices targeting advertising and packaging declarations."
      },
      {
        title: "Multi-State Trade License Lapses",
        desc: "Unsynchronized renewal calendars across 100+ retail store locations nationwide."
      }
    ],
    solutions: [
      {
        title: "Legal Metrology Packaging Audits",
        desc: "Pre-print label vetting for font sizes, country of origin, MRP, and consumer care norms.",
        iconName: "CheckCircle2"
      },
      {
        title: "Plastic EPR Turnkey Management",
        desc: "End-to-end CPCB portal registration, credit procurement, and annual return filings.",
        iconName: "Clock"
      },
      {
        title: "CCPA Marketing Compliance",
        desc: "Advertising claim substantiation and e-commerce dark pattern prevention audits.",
        iconName: "ShieldCheck"
      },
      {
        title: "Multi-State Store License Vault",
        desc: "Centralized tracking of Shops & Establishment, trade, and fire licenses across all stores.",
        iconName: "Layers"
      },
      {
        title: "Warehouse Labour & EHS Auditing",
        desc: "Supply chain logistics hub compliance with factory acts and contract labor laws.",
        iconName: "Users"
      },
      {
        title: "Seizure & Penal Notice Defense",
        desc: "Swift legal representations before Legal Metrology controllers and consumer forums.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "Book a Retail & FMCG Compliance Diagnostic",
      buttonText: "REQUEST RETAIL COMPLIANCE REVIEW →",
      link: "/industries/consumer-retail#consultation-form",
      subtitle: "For FMCG Brands, Modern Trade Retailers, D2C Startups, and E-Commerce Platforms."
    }
  },

  "media-services": {
    id: "media-services",
    title: "Media & Enterprise Services GRC",
    categoryType: "industry",
    clusterId: "media-services",
    categoryName: "Media & Enterprise Services",
    targetPersona: "Chief Legal Officers & Managing Directors",
    eyebrow: "IP REVENUE ACCELERATION. CONTRACT DEFENSE. ENTERPRISE GRC.",
    headline: {
      prefix: "CONTENT SCALES GLOBALLY.",
      highlight: "CAN YOUR IP RIGHTS WITHSTAND SCRUTINY?",
      suffix: ""
    },
    subheadline: "Are Your Digital Media Assets, Cross-Border Royalties, and Freelancer Contracts Legally Bulletproof?",
    stat: {
      figure: "₹1,200 Crore",
      label: "IP & Royalty Disputes",
      context: "Under active arbitration across media and digital entertainment sectors regarding unlicensed content.",
      source: "Indian Performing Right Society & Media Law Review",
      year: "2023",
      impactType: "financial",
      impactLabel: "IP Infringement Financial Exposure"
    },
    visualTheme: "technology",
    risks: [
      "Copyright Infringement Notices: Unclear digital sync rights triggering takedown notices and damages.",
      "IT Intermediary Rules Defaults: Delayed grievance officer appointments and monthly compliance filings.",
      "Contractor IP Assignment Gaps: Freelancers retaining underlying rights to creative code and media.",
      "Advertising Standards (ASCI) Violations: Influencer disclosures failing statutory consumer guidelines."
    ],
    structuredRisks: [
      {
        title: "Unlicensed Digital Synchronization",
        desc: "Incomplete music and footage clearance leading to immediate copyright injunctions."
      },
      {
        title: "IT Intermediary Rules Deficits",
        desc: "Missed statutory 24-hour content takedown windows exposing platforms to platform liability."
      },
      {
        title: "Contractor IP Assignment Flaws",
        desc: "Ambiguous vendor agreements leaving proprietary code and video ownership contested."
      },
      {
        title: "ASCI Influencer Non-Disclosure",
        desc: "Unlabeled brand partnerships triggering formal consumer protection penalty actions."
      }
    ],
    solutions: [
      {
        title: "Comprehensive IP Chain-of-Title",
        desc: "Rigorous verification of ownership, synchronization, and worldwide licensing rights.",
        iconName: "ShieldCheck"
      },
      {
        title: "IT Intermediary Compliance Desk",
        desc: "Turnkey grievance officer workflows, statutory reporting, and takedown protocols.",
        iconName: "Clock"
      },
      {
        title: "Freelancer & Agency IP Shield",
        desc: "Air-tight contract templates securing 100% intellectual property assignment.",
        iconName: "FileSearch"
      },
      {
        title: "ASCI & CCPA Advertising Vetting",
        desc: "Pre-release campaign audits ensuring zero deceptive marketing or dark patterns.",
        iconName: "CheckCircle2"
      },
      {
        title: "Media Escrow & Royalty Accounts",
        desc: "Secured escrow accounts managing syndication advances and milestone payouts.",
        iconName: "Lock"
      },
      {
        title: "Copyright Arbitration Representation",
        desc: "Veteran entertainment counsel defense in high-stakes intellectual property disputes.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule a Media & Digital IP Compliance Review",
      buttonText: "REQUEST MEDIA IP AUDIT →",
      link: "/industries/media-services#consultation-form",
      subtitle: "Tailored for Digital Publishers, Production Houses, Ad Agencies, and SaaS Media Tech."
    }
  },

  // =========================================================================
  // CORE OFFERING DOMAINS (13 OFFERINGS)
  // =========================================================================

  "regulatory-compliance": {
    id: "regulatory-compliance",
    title: "Regulatory Compliance Advisory",
    categoryType: "offering",
    categoryName: "Regulatory Compliance",
    targetPersona: "Chief Compliance Officers & Legal Directors",
    eyebrow: "STATUTORY FILING DELAY. SECTION 134(5) ATTESTATION. DIRECTOR SHIELD.",
    headline: {
      prefix: "SUPERVISORY AUDITORS REVIEW RECORDS.",
      highlight: "BOARDS QUESTION COMPLIANCE HEADS.",
      suffix: ""
    },
    subheadline: "Can Your Enterprise Holding Structure Defend Every Statutory Return and Board Attestation on Demand?",
    stat: {
      figure: "₹1 Lakh/Day",
      label: "Compounding Statutory Penalty",
      context: "Levied under Section 137(3) of the Companies Act 2013 for delayed subsidiary statutory filings.",
      source: "Ministry of Corporate Affairs (MCA) Enforcement Gazette",
      year: "2023",
      impactType: "financial",
      impactLabel: "Companies Act Statutory Daily Exposure"
    },
    visualTheme: "governance",
    risks: [
      "14 Disparate Spreadsheets: Compliance tracking dispersed across unverified subsidiary files.",
      "Section 149(12) Director Liability: Independent directors facing personal liability for compliance gaps.",
      "MCA Late Fee Compounding: Unmonitored subsidiary filings triggering compounding fines.",
      "Show-Cause Notice Backlogs: Delayed legal responses converting administrative queries into prosecutions."
    ],
    structuredRisks: [
      {
        title: "Entity Documentation Gaps",
        desc: "Statutory registers maintained across fragmented spreadsheets with zero immutable audit trails."
      },
      {
        title: "Missed Mandatory Filings",
        desc: "Delayed annual subsidiary returns triggering compounding daily penalties and director disqualification."
      },
      {
        title: "Vendor & Affiliate Variance",
        desc: "Subsidiary and joint-venture non-compliance bleeding into the parent holding entity's risk register."
      },
      {
        title: "Director & KMP Accountability",
        desc: "Personal civil and criminal exposure under Section 134(5) directors' responsibility statements."
      }
    ],
    solutions: [
      {
        title: "Unified Multi-Entity Visibility",
        desc: "Real-time dashboard tracking statutory status across parent, subsidiaries, and joint ventures.",
        iconName: "ShieldCheck"
      },
      {
        title: "Statutory Obligation Tracking",
        desc: "Automated alert engine monitoring 1,200+ central and state corporate compliance deadlines.",
        iconName: "Clock"
      },
      {
        title: "Digital Statutory Records",
        desc: "Encrypted repository storing immutable, timestamped corporate filings and board minutes.",
        iconName: "FileSearch"
      },
      {
        title: "Entity-Level Risk Monitoring",
        desc: "Granular compliance health scores highlighting high-risk operating subsidiaries.",
        iconName: "BarChart3"
      },
      {
        title: "Board & Audit Committee Support",
        desc: "Pre-packaged board compliance dossiers and director liability shielding frameworks.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Continuous Advisory & Defense",
        desc: "Direct intervention by senior corporate counsels for show-cause notice responses.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule an Enterprise Compliance Exposure Assessment",
      buttonText: "REQUEST COMPLIANCE REVIEW →",
      link: "/services/regulatory-compliance#consultation-form",
      subtitle: "Includes complete review of active entity filings, director attestations, and statutory calendars."
    }
  },

    "enterprise-governance": {
    id: "enterprise-governance",
    title: "Enterprise Corporate Governance (CFO Suite)",
    categoryType: "offering",
    categoryName: "Corporate Governance & Board Advisory",
    targetPersona: "FOR CFOs • GROUP CFOs • FINANCE CONTROLLERS",
    eyebrow: "ONE MISSING RECORD. MULTIPLE ENTITY EXPOSURE. CFO ACCOUNTABILITY.",
    headline: {
      prefix: "REGULATORS AUDIT ENTITIES.",
      highlight: "BOARDS QUESTION CFOs.",
      suffix: ""
    },
    subheadline: "Can Your Multi-Entity Holding Group Defend Every Statutory Record During Inspection?",
    stat: {
      figure: "₹1,00,000+",
      label: "Per Day Exposure",
      context: "Non-compliance penalties, filing defaults, missing statutory records and entity-level documentation gaps can create significant financial and governance exposure during inspections.",
      source: "Companies Act 2013 & Statutory Compounding Benchmarks",
      year: "2025",
      impactType: "financial",
      impactLabel: "Statutory Financial Impact"
    },
    visualTheme: "governance",
    risks: [
      "Entity Documentation Gaps: Different entities maintaining inconsistent statutory records.",
      "Missed Compliance Filings: ROC, Labour, Secretarial and regulatory deadlines.",
      "Contractor & Vendor Compliance Risks: Third-party workforce and engagement exposure.",
      "Director & KMP Liability: Personal accountability during regulatory scrutiny."
    ],
    structuredRisks: [
      { title: "Entity Documentation Gaps", desc: "Different entities maintaining inconsistent statutory records." },
      { title: "Missed Compliance Filings", desc: "ROC, Labour, Secretarial and regulatory deadlines." },
      { title: "Contractor & Vendor Compliance Risks", desc: "Third-party workforce and engagement exposure." },
      { title: "Director & KMP Liability", desc: "Personal accountability during regulatory scrutiny." }
    ],
    solutions: [
      {
        title: "Multi-Entity Compliance Command Center",
        desc: "Unified single-pane-of-glass tracking all subsidiary filings, registers, and statutory obligations in real time.",
        iconName: "Layers"
      },
      {
        title: "72-Hour Inspection Readiness",
        desc: "Instant statutory register generation and automated audit packet assembly for sudden regulatory scrutiny.",
        iconName: "Clock"
      },
      {
        title: "Digital Statutory Record Repository",
        desc: "Immutable, timestamped repository housing ROC, secretarial, labor, and tax filings with verifiable trail.",
        iconName: "ShieldCheck"
      },
      {
        title: "Real-Time Entity Risk Heatmaps",
        desc: "Automated risk scoring across subsidiaries to detect compliance vulnerabilities before regulators do.",
        iconName: "BarChart3"
      },
      {
        title: "Board & Audit Committee Reporting",
        desc: "Executive-grade governance dashboards and unvarnished statutory health packs prepared for quarterly board review.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Continuous Compliance Monitoring",
        desc: "Automated regulatory change radar and statutory due date alerts ensuring zero deadline defaults.",
        iconName: "CheckCircle2"
      }
    ],
    cta: {
      text: "Schedule a CFO Compliance Exposure Assessment",
      buttonText: "REQUEST CFO REVIEW →",
      link: "https://govnics-murex.vercel.app/services/enterprise-governance",
      subtitle: "Identify statutory vulnerabilities across all entities before regulators do."
    }
  },

  "cybersecurity-data": {
    id: "cybersecurity-data",
    title: "Cybersecurity & Data Protection (CISO Suite)",
    categoryType: "offering",
    categoryName: "Cybersecurity & Data Privacy",
    targetPersona: "Chief Information Security Officers (CISOs)",
    eyebrow: "DPDP ACT PENALTIES. THIRD-PARTY DATA LEAKS. CISO ATTESTATION.",
    headline: {
      prefix: "HACKERS EXPLOIT VENDORS.",
      highlight: "REGULATORS PENALIZE THE CISO.",
      suffix: ""
    },
    subheadline: "Can Your Organization Prove Audit-Grade Technical Controls and Comply with the 6-Hour CERT-In Mandate?",
    stat: {
      figure: "₹250 Crore",
      label: "Per-Incident DPDP Penalty",
      context: "Maximum statutory penalty codified under DPDP Act 2023 for failure to maintain reasonable security safeguards.",
      source: "Data Protection Board of India / MeitY Gazette",
      year: "2023",
      impactType: "financial",
      impactLabel: "DPDP Act Statutory Financial Risk"
    },
    visualTheme: "cyber",
    risks: [
      "DPDP Technical Gaps: Inability to enforce granular consent, purpose limitation, and user erasure rights.",
      "CERT-In 6-Hour Window: Absence of forensic log pipelines preventing rapid statutory breach reporting.",
      "Supply Chain Shadow IT: Third-party SaaS tools storing unencrypted corporate and customer PII.",
      "CISO Personal Liability: Regulatory directors questioning security leadership during forensic inquiries."
    ],
    structuredRisks: [
      {
        title: "DPDP Technical Control Gaps",
        desc: "Unmapped data flows across cloud databases violating purpose limitation and consent mandates."
      },
      {
        title: "CERT-In 6-Hour SLA Breach",
        desc: "Delayed incident containment preventing legally mandated reporting to national cyber teams."
      },
      {
        title: "Third-Party SaaS Data Leaks",
        desc: "Unvetted vendor integrations exposing corporate secrets without encrypted audit logs."
      },
      {
        title: "Executive Attestation Liability",
        desc: "CISOs facing personal regulatory scrutiny for certifying inadequate cyber hygiene baselines."
      }
    ],
    solutions: [
      {
        title: "DPDP Turnkey Architecture",
        desc: "Consent managers, data flow registers, and automated data principal rights workflows.",
        iconName: "Lock"
      },
      {
        title: "CERT-In 6-Hour Incident Desk",
        desc: "Pre-configured forensic playbooks and regulatory notification pipelines.",
        iconName: "Clock"
      },
      {
        title: "ISO 27001 / SOC 2 Compliance",
        desc: "End-to-end certification readiness audits and continuous control monitoring.",
        iconName: "ShieldCheck"
      },
      {
        title: "Third-Party Cyber Due Diligence",
        desc: "Automated risk scoring and contractual cyber shielding for all SaaS vendors.",
        iconName: "Layers"
      },
      {
        title: "VAPT Remediation Oversight",
        desc: "Quarterly vulnerability assessments with validated patch verification sign-offs.",
        iconName: "Settings"
      },
      {
        title: "Board-Level Cyber Reporting",
        desc: "Executive risk dashboards translating technical telemetry into defensible governance.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "Schedule an Executive Cybersecurity & DPDP Audit",
      buttonText: "REQUEST CYBER RISK ASSESSMENT →",
      link: "/services/cybersecurity-data#consultation-form",
      subtitle: "Complete review of DPDP Act readiness, CERT-In logging, and vendor cyber risk."
    }
  },

  "labour-employment": {
    id: "labour-employment",
    title: "Labour & Employment Compliance",
    categoryType: "offering",
    categoryName: "Labour & Workforce Compliance",
    targetPersona: "Chief Human Resources Officers & Head of Labour Legal",
    eyebrow: "CONTRACTOR CLRA BREACH. EPFO WAGE MISCLASSIFICATION. PRINCIPAL EMPLOYER LIABILITY.",
    headline: {
      prefix: "CONTRACTORS DEFAULT ON PF.",
      highlight: "THE PRINCIPAL EMPLOYER PAYS.",
      suffix: ""
    },
    subheadline: "Can Your Organization Substantiate 100% Contractor Wage, PF/ESI, and Safety Compliance Across All Shifts?",
    stat: {
      figure: "₹12,000 Crore",
      label: "EPFO Inspection Recoveries",
      context: "Recovered through nationwide statutory inspections targeting contractor wage misclassifications and under-remittances.",
      source: "Employees' Provident Fund Organisation (EPFO) Annual Bulletin",
      year: "2023",
      impactType: "financial",
      impactLabel: "EPFO Statutory Recovery Volume"
    },
    visualTheme: "governance",
    risks: [
      "CLRA Joint-Employer Exposure: Contractor defaults on minimum wages and PF transferring liability directly to the company.",
      "Ghost Worker Muster Rolls: Discrepancies between plant gate biometric logs and monthly vendor invoice claims.",
      "Factory Labour Notices: 2,300+ statutory show-cause notices issued under Factories Act in a single quarter.",
      "Disputed Gratuity Liabilities: Unfunded statutory employee benefit provisions triggering labor court summons."
    ],
    structuredRisks: [
      {
        title: "Contractor CLRA Default Liabilities",
        desc: "Principal employers held financially and legally liable for third-party contractor wage and PF deficits."
      },
      {
        title: "Biometric vs Invoice Variance",
        desc: "Discrepancies between physical gate punch records and contractor billing rosters."
      },
      {
        title: "Factories Act Statutory Notices",
        desc: "Irregular overtime registers and safety log lapses triggering formal labor department summons."
      },
      {
        title: "Unfunded Gratuity & Leave Liability",
        desc: "Delayed actuarial reconciliations exposing corporate balance sheets to sudden court orders."
      }
    ],
    solutions: [
      {
        title: "Automated Contractor Audits",
        desc: "Monthly three-way reconciliation of muster rolls, wage slips, and PF/ESI bank challans.",
        iconName: "Users"
      },
      {
        title: "CLRA Principal Employer Shield",
        desc: "Pre-onboarding contractor vetting and continuous registration license maintenance.",
        iconName: "ShieldCheck"
      },
      {
        title: "Digital Statutory Muster Vault",
        desc: "Automated daily attendance, overtime, leave with wages, and adult worker registers.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Labour Court Notice Defense",
        desc: "Senior labor advocate representation before conciliation officers and labor commissioners.",
        iconName: "FileSearch"
      },
      {
        title: "POSH & Internal Committee Audits",
        desc: "Mandatory annual POSH report filings, committee training, and compliance dossiers.",
        iconName: "Clock"
      },
      {
        title: "Multi-State Labor Law Tracking",
        desc: "Real-time updates on state minimum wage notifications and national labor codes.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "Schedule a Contractor & Workforce Compliance Audit",
      buttonText: "REQUEST WORKFORCE AUDIT →",
      link: "/services/labour-employment#consultation-form",
      subtitle: "Audit contractor muster rolls, PF/ESI challans, and CLRA principal employer liabilities."
    }
  },

  "esg-sustainability": {
    id: "esg-sustainability",
    title: "ESG & Sustainability Advisory",
    categoryType: "offering",
    categoryName: "ESG & Sustainability",
    targetPersona: "Chief Sustainability Officers & ESG Heads",
    eyebrow: "BRSR CORE ASSURANCE. GREENWASHING SCRUTINY. ESG HEAD MANDATE.",
    headline: {
      prefix: "STAKEHOLDERS DEMAND SUSTAINABILITY.",
      highlight: "REGULATORS DEMAND AUDIT-GRADE PROOF.",
      suffix: ""
    },
    subheadline: "Are Your Scope 1, 2, and 3 Disclosures Backed by Verifiable, Inspection-Ready Evidentiary Data?",
    stat: {
      figure: "Top 1,000",
      label: "Listed Companies Mandated",
      context: "Under SEBI BRSR Core guidelines to obtain reasonable third-party assurance for ESG metrics.",
      source: "SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122",
      year: "2023",
      impactType: "regulatory",
      impactLabel: "SEBI BRSR Core Mandatory Scope"
    },
    visualTheme: "esg",
    risks: [
      "BRSR Core Assurance Gaps: Discrepancies between internal ESG declarations and external auditor evidence.",
      "Greenwashing Allegations: Marketing claims unsupported by verifiable operational carbon receipts.",
      "Supply Chain Scope 3 Blindspots: Inability to capture Tier-1 vendor emission data for CBAM reporting.",
      "Board ESG Accountability: Directors held responsible for misleading sustainability disclosures."
    ],
    structuredRisks: [
      {
        title: "BRSR Assurance Discrepancies",
        desc: "Inability to provide primary source documentation for Scope 1, 2, and 3 emission numbers."
      },
      {
        title: "Greenwashing Statutory Exposure",
        desc: "Unsubstantiated environmental claims attracting formal consumer protection and SEBI inquiries."
      },
      {
        title: "EU CBAM Carbon Import Tariffs",
        desc: "Unaccounted embodied carbon in exports leading to prohibitive European customs levies."
      },
      {
        title: "EPR Plastic & E-Waste Defaults",
        desc: "Unfulfilled producer responsibility credits leading to state pollution board fines."
      }
    ],
    solutions: [
      {
        title: "BRSR Core Assurance Readiness",
        desc: "Turnkey diagnostic aligning operational metrics with SEBI reasonable assurance frameworks.",
        iconName: "ShieldCheck"
      },
      {
        title: "Scope 1, 2, 3 Data Engineering",
        desc: "Automated carbon telemetry gathering primary utility bills, fuel manifests, and vendor data.",
        iconName: "Settings"
      },
      {
        title: "EU CBAM Export Verification",
        desc: "Embodied carbon calculation and verified reporting dossiers for global trade corridors.",
        iconName: "FileSearch"
      },
      {
        title: "Plastic & Battery EPR Turnkey",
        desc: "CPCB portal management, recycler credit verification, and annual return filings.",
        iconName: "Clock"
      },
      {
        title: "Board ESG Governance Packs",
        desc: "Audit committee scorecards substantiating sustainability milestones and risk mitigation.",
        iconName: "BarChart3"
      },
      {
        title: "ESG Supply Chain Screening",
        desc: "Supplier sustainability scoring and contractual environmental covenant audits.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule a BRSR & ESG Readiness Review",
      buttonText: "REQUEST ESG READINESS REVIEW →",
      link: "/services/esg-sustainability#consultation-form",
      subtitle: "Prepare your enterprise for BRSR Core reasonable assurance and EU CBAM reporting."
    }
  },

  "taxation-trade": {
    id: "taxation-trade",
    title: "Taxation & Trade Advisory",
    categoryType: "offering",
    categoryName: "Taxation & Indirect Taxes",
    targetPersona: "Chief Financial Officers & Head of Tax",
    eyebrow: "CUSTOMS INVESTIGATION. DGFT SCHEME DEFAULT. TAX HEAD DEFENSIBILITY.",
    headline: {
      prefix: "PORT CLEARANCES MOVE QUICKLY.",
      highlight: "TAX AUDITS DIG IN RETROSPECTIVELY.",
      suffix: ""
    },
    subheadline: "Can Your Business Reconcile Export-Import Schemes, GST Input Tax Credits, and Transfer Pricing on Demand?",
    stat: {
      figure: "₹1.31 Lakh Crore",
      label: "GST ITC Mismatch Detections",
      context: "Flagged by automated tax analytics systems across corporate filings in FY23.",
      source: "Central Board of Indirect Taxes and Customs (CBIC) Annual Review",
      year: "2023",
      impactType: "financial",
      impactLabel: "CBIC Statutory ITC Detection"
    },
    visualTheme: "finance",
    risks: [
      "GST GSTR-2B vs 3B Variances: Input tax credit claimed without corresponding vendor tax payments.",
      "Customs Classification Disputes: Incorrect HSN coding triggering retrospective duty and penalty notices.",
      "Advance Authorization Lapses: Unfulfilled export obligations causing sudden interest demands.",
      "Cross-Border Transfer Pricing Gaps: Inadequate benchmarking documentation for intercompany services."
    ],
    structuredRisks: [
      {
        title: "GSTR-2B ITC Mismatches",
        desc: "Automated CBIC red flags for input tax credit claims lacking supplier invoice reconciliation."
      },
      {
        title: "Customs HSN Misclassification",
        desc: "Retrospective reclassification demands accompanied by 100% statutory penalty notices."
      },
      {
        title: "DGFT Export Obligation Shortfalls",
        desc: "Lapsed EPCG and Advance Authorizations prompting customs bank guarantee encashment."
      },
      {
        title: "Transfer Pricing Benchmark Gaps",
        desc: "Ambiguous intercompany management service agreements contested during corporate audits."
      }
    ],
    solutions: [
      {
        title: "Automated GST ITC Reconciliation",
        desc: "Continuous algorithmic matching of GSTR-2B with purchase ledgers to prevent tax notices.",
        iconName: "Clock"
      },
      {
        title: "Customs HSN Audit Defense",
        desc: "Binding rulings advisory, valuation reviews, and classification defense before customs tribunals.",
        iconName: "ShieldCheck"
      },
      {
        title: "DGFT Foreign Trade Scheme Vault",
        desc: "End-to-end management of Advance Authorization, EPCG, and RoDTEP export obligations.",
        iconName: "Settings"
      },
      {
        title: "Transfer Pricing Documentation",
        desc: "Robust economic analysis and master/local file assembly ensuring zero audit adjustments.",
        iconName: "FileSearch"
      },
      {
        title: "AEO Tier-2/3 Certification",
        desc: "Customs Authorized Economic Operator accreditation securing expedited cargo clearance.",
        iconName: "CheckCircle2"
      },
      {
        title: "Tax Dispute Representation",
        desc: "Expert legal advocacy before appellate commissioners, CESTAT, and higher judicial forums.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Book an Indirect Tax & Customs Risk Review",
      buttonText: "REQUEST TAX COMPLIANCE REVIEW →",
      link: "/services/taxation-trade#consultation-form",
      subtitle: "Reconcile your GST input credits, DGFT export schemes, and customs classifications."
    }
  },

  "environmental-ehs": {
    id: "environmental-ehs",
    title: "Environmental & EHS Advisory",
    categoryType: "offering",
    categoryName: "Environmental & EHS Compliance",
    targetPersona: "Chief Sustainability Officers & VP Health & Safety",
    eyebrow: "CONSENT TO OPERATE EXPIRY. HAZARDOUS WASTE AUDIT. EHS DEFENSE.",
    headline: {
      prefix: "POLLUTION BOARDS INSPECT UNANNOUNCED.",
      highlight: "CAN YOUR FACILITY PRODUCE COMPLIANCE LOGS?",
      suffix: ""
    },
    subheadline: "Are Your Environmental Consents, Effluent Treatment Logs, and EPR Registrations Current Across All Sites?",
    stat: {
      figure: "1,200+",
      label: "Pollution Board Closure Notices",
      context: "Issued across industrial clusters for unrenewed CTOs and non-compliant effluent treatment plants.",
      source: "Central Pollution Control Board (CPCB) Enforcement Digest",
      year: "2023",
      impactType: "operational",
      impactLabel: "CPCB Closure Notice Volume"
    },
    visualTheme: "esg",
    risks: [
      "Lapsed CTO Renewals: Operating units functioning under expired state pollution board consents.",
      "ETP/STP Parameter Failures: Biochemical oxygen demand (BOD) spikes triggering immediate shutdown orders.",
      "Hazardous Waste Manifest Gaps: Unmanifested chemical disposal exposing company directors to criminal liability.",
      "Groundwater Extraction Notices: Unregistered industrial borewells attracting severe retrospective charges."
    ],
    structuredRisks: [
      {
        title: "Lapsed State PCB CTOs",
        desc: "Operating facilities without valid pollution consents risking immediate utility disconnection."
      },
      {
        title: "ETP Effluent Threshold Breaches",
        desc: "Untreated wastewater spikes detected by CPCB automated monitoring sensors."
      },
      {
        title: "Hazardous Chemical Manifest Errors",
        desc: "Unreconciled transport manifests violating Hazardous and Other Wastes Rules."
      },
      {
        title: "CGWA Groundwater Penalties",
        desc: "Unpermitted industrial borewell extraction triggering heavy environmental damage tariffs."
      }
    ],
    solutions: [
      {
        title: "CTE/CTO Turnkey Management",
        desc: "Proactive renewal workflows securing State PCB consents 90 days before statutory expiration.",
        iconName: "Clock"
      },
      {
        title: "OCEMS Real-Time Audit Desk",
        desc: "Telemetry verification ensuring continuous stack and effluent sensor data integrity.",
        iconName: "Settings"
      },
      {
        title: "Hazardous Waste Manifest Vault",
        desc: "Digitized Form 10 manifests and authorized TSDF vendor tracking.",
        iconName: "ShieldCheck"
      },
      {
        title: "CGWA Borewell NOC Advisory",
        desc: "Hydrological surveys, water audit reports, and turnkey groundwater NOC procurement.",
        iconName: "FileSearch"
      },
      {
        title: "On-Site EHS Mock Audits",
        desc: "Simulated pollution control board inspections identifying vulnerabilities before authorities arrive.",
        iconName: "ClipboardCheck"
      },
      {
        title: "NGT & SPCB Legal Defense",
        desc: "Senior environmental counsel representation against closure orders and financial penalties.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule an Environmental & EHS Regulatory Diagnostic",
      buttonText: "REQUEST EHS COMPLIANCE REVIEW →",
      link: "/services/environmental-ehs#consultation-form",
      subtitle: "Complete review of state PCB consents, OCEMS telemetry, and hazardous waste logs."
    }
  },

  "supply-chain": {
    id: "supply-chain",
    title: "Supply Chain & Vendor Governance",
    categoryType: "offering",
    categoryName: "Supply Chain Governance",
    targetPersona: "Chief Procurement Officers & VP Sourcing",
    eyebrow: "TIER-2 VENDOR DEFAULT. JOINT STATUTORY PENALTY. CPO OVERSIGHT.",
    headline: {
      prefix: "YOUR FACTORY RUNS CLEAN.",
      highlight: "WHAT ABOUT YOUR EXTENDED VENDOR NETWORK?",
      suffix: ""
    },
    subheadline: "Can Your Organization Verify Tier-1 and Tier-2 Vendor Labor, Tax, and Environmental Compliance in Minutes?",
    stat: {
      figure: "42%",
      label: "Vendor Disruption Incidents",
      context: "Traced directly to regulatory enforcement, labor strikes, and tax debarments among Tier-1 and Tier-2 suppliers.",
      source: "CII National Supply Chain Resilience Survey",
      year: "2023",
      impactType: "operational",
      impactLabel: "Supplier Disruption Vulnerability"
    },
    visualTheme: "supply-chain",
    risks: [
      "Vendor GST Non-Filing: Tier-1 suppliers failing to remit taxes, causing buyer input credit freezes.",
      "Contractor Child/Forced Labor Violations: Supply chain abuses creating catastrophic reputational damage.",
      "Single-Source Supplier Insolvency: Critical component supplier entering NCLT insolvency unannounced.",
      "Anti-Bribery & Sanction Lapses: International suppliers violating FCPA or global sanctions lists."
    ],
    structuredRisks: [
      {
        title: "Vendor GST Compliance Default",
        desc: "Suppliers defaulting on GSTR-3B filings resulting in blocked buyer input tax credits."
      },
      {
        title: "Labor Law Violations at Vendor Sites",
        desc: "Unregulated contractor practices exposing principal brands to consumer boycott and regulatory heat."
      },
      {
        title: "Supplier Insolvency Blindspots",
        desc: "Unmonitored vendor financial distress causing sudden, unrecoverable assembly line shutdowns."
      },
      {
        title: "Export Sanction List Defaults",
        desc: "Sub-tier component suppliers violating international trade embargos and trade controls."
      }
    ],
    solutions: [
      {
        title: "Vendor Regulatory Health Scoring",
        desc: "Automated monthly scoring of vendor GST returns, PF challans, and statutory filings.",
        iconName: "BarChart3"
      },
      {
        title: "Third-Party Labour Audits",
        desc: "Unannounced site inspections verifying ethical labor standards, minimum wages, and safety.",
        iconName: "Users"
      },
      {
        title: "Supply Chain Escrow Safeguards",
        desc: "Milestone-backed commercial escrow accounts shielding advance tooling and component payments.",
        iconName: "Lock"
      },
      {
        title: "Global Sanctions & KYC Screening",
        desc: "Automated checks against global watchlists, OFAC lists, and PEP databases.",
        iconName: "FileSearch"
      },
      {
        title: "ESG Scope 3 Supplier Accounting",
        desc: "Standardized telemetry gathering primary emission and waste data across Tier-1/2 suppliers.",
        iconName: "Settings"
      },
      {
        title: "Vendor Contract Shielding",
        desc: "Drafting bulletproof indemnification covenants, audit rights, and termination clauses.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "Request a Supply Chain Risk & Vendor Governance Review",
      buttonText: "REQUEST VENDOR AUDIT →",
      link: "/services/supply-chain#consultation-form",
      subtitle: "Audit Tier-1/2 supplier compliance, tax reconciliation, and labor standards."
    }
  },

  "export-trade": {
    id: "export-trade",
    title: "Export & Global Trade Advisory",
    categoryType: "offering",
    categoryName: "Global Trade & Customs",
    targetPersona: "VP International Business & Head of Logistics",
    eyebrow: "ORIGIN FRAUD SCRUTINY. SCOMET DUAL-USE CLEARANCE. EXPORT DIRECTOR DEFENSE.",
    headline: {
      prefix: "SHIPMENTS SAIL WORLDWIDE.",
      highlight: "CAN YOUR EXPORT LICENSES WITHSTAND SCRUTINY?",
      suffix: ""
    },
    subheadline: "Are Your RoDTEP Claims, Dual-Use SCOMET Authorizations, and Free Trade Rules of Origin Defensible?",
    stat: {
      figure: "₹4,200 Crore",
      label: "Export Incentive Demands",
      context: "Issued by customs authorities for erroneous duty drawbacks and RoDTEP claim reconciliations.",
      source: "Directorate of Revenue Intelligence (DRI) Annual Report",
      year: "2023",
      impactType: "financial",
      impactLabel: "DRI Statutory Export Recovery"
    },
    visualTheme: "trade",
    risks: [
      "SCOMET Licensing Lapses: Exporting dual-use items without mandatory DGFT inter-ministerial clearance.",
      "FTA Rules of Origin Audits: Unverified regional value content (RVC) leading to punitive retroactive tariffs.",
      "RoDTEP Recovery Notices: Discrepancies between shipping bill declarations and bank realization certs.",
      "Demurrage & Port Holding: Shipping containers impounded at ports of entry due to document mismatch."
    ],
    structuredRisks: [
      {
        title: "SCOMET Dual-Use Clearance Defaults",
        desc: "Shipments halted by customs for export of high-tech and dual-use equipment without DGFT permits."
      },
      {
        title: "FTA Origin Verification Demands",
        desc: "Partner nation customs contesting certificate of origin validity and imposing maximum tariffs."
      },
      {
        title: "RoDTEP / Duty Drawback Clawbacks",
        desc: "DRI recovery notices accompanied by 100% penalties for unverified export incentive claims."
      },
      {
        title: "Bank Realization (eBRC) Lapses",
        desc: "Unclosed EDPMS entries triggering automated RBI export caution-listing and banking blocks."
      }
    ],
    solutions: [
      {
        title: "SCOMET Turnkey Licensing",
        desc: "Comprehensive dual-use classification, end-user verification, and DGFT approval acceleration.",
        iconName: "ShieldCheck"
      },
      {
        title: "FTA Rules of Origin Vetting",
        desc: "Calculation and documentation of Regional Value Content (RVC) and Tariff Shift criteria.",
        iconName: "FileSearch"
      },
      {
        title: "EDPMS / eBRC Reconciliation",
        desc: "Automated closing of export realization entries with authorized dealer banks.",
        iconName: "Clock"
      },
      {
        title: "AEO Customs Tier Accreditation",
        desc: "Turnkey documentation securing Authorized Economic Operator status for green-channel clearance.",
        iconName: "CheckCircle2"
      },
      {
        title: "Export Trade Escrow Mechanisms",
        desc: "International commercial escrow accounts mitigating cross-border buyer default risks.",
        iconName: "Lock"
      },
      {
        title: "DRI & Customs Tribunal Defense",
        desc: "Specialist representation before customs special valuation branches and appellate tribunals.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule an Export & Customs Compliance Review",
      buttonText: "REQUEST EXPORT TRADE AUDIT →",
      link: "/services/export-trade#consultation-form",
      subtitle: "Verify your SCOMET classifications, FTA certificates of origin, and RoDTEP incentives."
    }
  },

  "licensing-permits": {
    id: "licensing-permits",
    title: "Licensing & Permits Management",
    categoryType: "offering",
    categoryName: "Licensing & Statutory Authorizations",
    targetPersona: "Chief Operating Officers & General Counsels",
    eyebrow: "UNTRACKED LICENSE EXPIRY. CESSATION OF OPERATIONS. REGULATORY SHIELD.",
    headline: {
      prefix: "OPERATIONS EXPAND FASTER THAN EVER.",
      highlight: "CAN YOUR LICENSES KEEP PACE?",
      suffix: ""
    },
    subheadline: "Are Your 80+ Municipal, State, and Central Operating Authorizations Tracked with 90-Day Renewal Buffers?",
    stat: {
      figure: "82 Days",
      label: "Average License Renewal Lead Time",
      context: "Required across Indian state single-window systems, creating dangerous operational gaps if left unmonitored.",
      source: "DPIIT Ease of Doing Business State Assessment",
      year: "2023",
      impactType: "operational",
      impactLabel: "Statutory Approval Lead Time"
    },
    visualTheme: "governance",
    risks: [
      "Unmonitored Expiry Dates: Critical operating licenses lapsing unnoticed, prompting police or municipal stop-work.",
      "Multi-State Policy Discrepancies: Navigating divergent state industrial regulations across manufacturing units.",
      "Inter-Agency Approval Delays: Fire safety, electrical inspectorate, and pollution board synchronization gaps.",
      "Corporate Restructuring Defaults: Failure to transfer statutory licenses post-merger or acquisition."
    ],
    structuredRisks: [
      {
        title: "Silent License Expirations",
        desc: "Facility operating under lapsed trade or factory licenses leading to sudden administrative sealings."
      },
      {
        title: "Inter-Agency Bottlenecks",
        desc: "Delays in Fire NOC or pollution approvals preventing the issuance of final operating licenses."
      },
      {
        title: "Post-M&A License Transfer Gaps",
        desc: "Corporate amalgamations completed without corresponding statutory entity name endorsements."
      },
      {
        title: "Municipal Extortion & Show-Cause",
        desc: "Unaddressed local body notices escalating into operational closure orders and utility cuts."
      }
    ],
    solutions: [
      {
        title: "Centralized License Management System",
        desc: "Digital dashboard tracking 100+ municipal, state, and central operating authorizations.",
        iconName: "Layers"
      },
      {
        title: "90-Day Proactive Renewal Pipeline",
        desc: "Automated filing triggers ensuring renewals are secured well before statutory expiry.",
        iconName: "Clock"
      },
      {
        title: "Post-Merger License Harmonization",
        desc: "Turnkey name-change and entity endorsement across all active government registers.",
        iconName: "Settings"
      },
      {
        title: "Fire NOC & Electrical Certifications",
        desc: "Liaison and compliance coordination for structural, fire, and boiler inspectorial approvals.",
        iconName: "ShieldCheck"
      },
      {
        title: "Municipal Authority Defense",
        desc: "Fast-track administrative representations before municipal commissioners and town planning bodies.",
        iconName: "FileSearch"
      },
      {
        title: "Single-Window Portal Liaison",
        desc: "Dedicated ground-level teams expediting approvals across all state industrial portals.",
        iconName: "Users"
      }
    ],
    cta: {
      text: "Request a Corporate Licensing Audit & Renewal Assessment",
      buttonText: "REQUEST LICENSING AUDIT →",
      link: "/services/licensing-permits#consultation-form",
      subtitle: "Audit your active licenses, upcoming renewals, and post-restructuring authorizations."
    }
  },

  "escrow-services": {
    id: "escrow-services",
    title: "Commercial Escrow Services",
    categoryType: "offering",
    categoryName: "Commercial Escrow & Trustee Advisory",
    targetPersona: "Chief Financial Officers & General Counsels",
    eyebrow: "M&A CONTINGENCY RISKS. SECTION 73 DEPOSIT LOCK. ESCROW ASSURANCE.",
    headline: {
      prefix: "HIGH-VALUE DEALS REQUIRE TRUST.",
      highlight: "CAN YOUR ESCROW ARCHITECTURE PROVIDE IT?",
      suffix: ""
    },
    subheadline: "Are Your M&A Holdbacks, Real Estate Advances, and Cross-Border Settlements Protected by Regulated Escrow?",
    stat: {
      figure: "₹18,500 Crore",
      label: "Disputed Commercial Contract Capital",
      context: "Locked in litigation annually due to bilateral payment defaults, milestone disputes, and insolvency freezes.",
      source: "Insolvency and Bankruptcy Board of India (IBBI) Analysis",
      year: "2023",
      impactType: "financial",
      impactLabel: "Contract Dispute Capital Lock"
    },
    visualTheme: "finance",
    risks: [
      "M&A Indemnity Disputes: Post-closing liabilities contested without secured, neutral retention funds.",
      "Insolvency Clawback Exposures: Advance payments swallowed by NCLT moratoriums upon supplier insolvency.",
      "Real Estate Escrow Non-Compliance: Builder diversion of project funds violating statutory RERA accounts.",
      "Cross-Border Transaction Default: Overseas buyers withholding milestone funds after shipment dispatch."
    ],
    structuredRisks: [
      {
        title: "M&A Post-Closing Holdback Default",
        desc: "Sellers contesting indemnity claims without pre-established, independent escrow dispute mechanisms."
      },
      {
        title: "IBC Supplier Insolvency Freezes",
        desc: "Unsecured advance payments frozen under moratorium orders when vendors enter NCLT proceedings."
      },
      {
        title: "RERA Section 4(2)(l)(D) Violations",
        desc: "Receivable diversions outside mandated 70% project escrow accounts attracting heavy RERA penalties."
      },
      {
        title: "Cross-Border Settlement Defaults",
        desc: "Unilateral buyer chargebacks and payment cancellations on international commercial shipments."
      }
    ],
    solutions: [
      {
        title: "M&A Indemnity Escrow Accounts",
        desc: "Tripartite agreements securing purchase price adjustments, representations, and warranties.",
        iconName: "Lock"
      },
      {
        title: "Project & Real Estate Escrow",
        desc: "RERA-compliant escrow mechanisms governing milestone-based contractor disbursements.",
        iconName: "ShieldCheck"
      },
      {
        title: "Supply Chain & Tooling Escrow",
        desc: "Neutral fund retention safeguarding advance equipment manufacturing and tooling orders.",
        iconName: "Settings"
      },
      {
        title: "Cross-Border Trade Escrow",
        desc: "Multi-currency escrow structures protecting exporters against foreign buyer defaults.",
        iconName: "Clock"
      },
      {
        title: "Software & Source Code Escrow",
        desc: "Secure source code vaults ensuring enterprise business continuity upon vendor liquidation.",
        iconName: "FileSearch"
      },
      {
        title: "Dispute Arbitration Mechanisms",
        desc: "Clear conditional release protocols eliminating the need for protracted court litigation.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Consult with our Commercial Escrow Specialists",
      buttonText: "REQUEST ESCROW ADVISORY →",
      link: "/services/escrow-services#consultation-form",
      subtitle: "Regulated, neutral escrow mechanisms for M&A, Real Estate, and High-Value Trade."
    }
  },

  "risk-management": {
    id: "risk-management",
    title: "Enterprise Risk Management (CRO Suite)",
    categoryType: "offering",
    categoryName: "Enterprise Risk Management",
    targetPersona: "Chief Risk Officers & Board Audit Committees",
    eyebrow: "BOARD RISK COMMITTEE SCRUTINY. UNQUANTIFIED OPERATIONAL GAPS. CRO MANDATE.",
    headline: {
      prefix: "UNEXPECTED CRISES OCCUR.",
      highlight: "DOES YOUR ENTERPRISE HAVE REAL-TIME RISK VISIBILITY?",
      suffix: ""
    },
    subheadline: "Can Your Executive Committee Quantify, Monitor, and Mitigate Operational and Regulatory Risks Across Entities?",
    stat: {
      figure: "68%",
      label: "Board Risk Demerits",
      context: "Recorded by institutional proxy advisory firms targeting unquantified regulatory and operational risk registers.",
      source: "Institutional Investor Advisory Services (IiAS) Report",
      year: "2023",
      impactType: "regulatory",
      impactLabel: "Proxy Advisory Board Demerits"
    },
    visualTheme: "governance",
    risks: [
      "Static Spreadsheets as ERM: Quarterly risk reviews failing to detect real-time operational failures.",
      "Siloed Subsidiary Risks: High-risk affiliate operations invisible to the parent company board.",
      "Unquantified Legal Exposures: Litigation registers lacking statistical loss probability scoring.",
      "Business Continuity Failures: Disaster recovery plans un-tested against simulated cyber or supply chain collapse."
    ],
    structuredRisks: [
      {
        title: "Static Annual Risk Registers",
        desc: "Outdated spreadsheet reviews blind to dynamic regulatory enforcement shifts and operational crises."
      },
      {
        title: "Subsidiary Operational Blindspots",
        desc: "High-risk joint-venture and subsidiary practices hidden from parent company executive committees."
      },
      {
        title: "Unquantified Litigation Exposure",
        desc: "Disputed statutory claims recorded without actuarial probability modeling or balance sheet reserves."
      },
      {
        title: "Un-Tested Continuity Playbooks",
        desc: "Theoretical disaster recovery plans collapsing during real-world cyber or regulatory disruption."
      }
    ],
    solutions: [
      {
        title: "Dynamic Enterprise Risk Registers",
        desc: "Real-time KRIs (Key Risk Indicators) mapped across all operating subsidiaries and units.",
        iconName: "BarChart3"
      },
      {
        title: "Board & Audit Committee Dashboards",
        desc: "Defensible executive reporting packs aligned with COSO and ISO 31000 ERM standards.",
        iconName: "ShieldCheck"
      },
      {
        title: "Operational Stress-Testing",
        desc: "Simulated scenario modeling for regulatory shutdowns, supply shocks, and cyber events.",
        iconName: "Settings"
      },
      {
        title: "Legal & Regulatory Liability Valuation",
        desc: "Statistical loss modeling providing accurate provisions for contingent statutory liabilities.",
        iconName: "FileSearch"
      },
      {
        title: "Business Continuity (ISO 22301)",
        desc: "Turnkey resilience playbooks ensuring uninterrupted operational governance during crises.",
        iconName: "Clock"
      },
      {
        title: "Third-Party Risk Scoring Desk",
        desc: "Automated vendor and affiliate risk assessments embedded into procurement workflows.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Schedule an Enterprise Risk Architecture Diagnostic",
      buttonText: "REQUEST CRO RISK REVIEW →",
      link: "/services/risk-management#consultation-form",
      subtitle: "Align your enterprise risk framework with ISO 31000 and institutional proxy guidelines."
    }
  },

  "staffing-managed": {
    id: "staffing-managed",
    title: "Staffing & Managed Compliance",
    categoryType: "offering",
    categoryName: "Staffing & Managed Services",
    targetPersona: "Chief People Officers & Head of Procurement",
    eyebrow: "WORKFORCE FLUIDITY. PF/ESI NON-REMITTANCE. HR & LEGAL DEFENSIBILITY.",
    headline: {
      prefix: "WORKFORCE SCALES ON-DEMAND.",
      highlight: "CAN YOUR COMPLIANCE KEEP UP?",
      suffix: ""
    },
    subheadline: "Are Your 1,000+ Contractual Associates Covered by Verified PF/ESI Challans and Zero Joint Liability?",
    stat: {
      figure: "100%",
      label: "Statutory Defensibility SLA",
      context: "Guaranteed monthly reconciliation across employee PF, ESI, Professional Tax, and Minimum Wages.",
      source: "GOVENICS Managed Staffing Performance Benchmark",
      year: "2024",
      impactType: "operational",
      impactLabel: "Compliance Defensibility SLA"
    },
    visualTheme: "governance",
    risks: [
      "Vendor ESI/PF Default: Staffing vendors absconding after billing clients, transferring liabilities to the principal employer.",
      "Dual Employment & Moonlighting: IT and knowledge workers holding unauthorized concurrent jobs.",
      "Non-Compliant Wage Structuring: Miscalculated basic vs allowance ratios attracting EPFO inspection notices.",
      "Misclassified Gig Workers: Independent contractors demanding permanent employee statutory protections."
    ],
    structuredRisks: [
      {
        title: "Staffing Vendor Default Liability",
        desc: "Third-party vendors collecting client remittances but defaulting on employee statutory welfare deposits."
      },
      {
        title: "Dual Employment Moonlighting Gaps",
        desc: "Unchecked remote contractor engagements causing serious client IP leakage and breach of duty."
      },
      {
        title: "Wage Split Regulatory Scrutiny",
        desc: "Artificial reduction of basic pay to evade PF contributions attracting heavy retrospective penalties."
      },
      {
        title: "Gig Worker Statutory Claims",
        desc: "Unregistered contract workers filing joint-employer claims before state labor conciliation officers."
      }
    ],
    solutions: [
      {
        title: "Managed Compliance Staffing",
        desc: "100% compliant contractual associate deployment with zero principal employer liability.",
        iconName: "Users"
      },
      {
        title: "Zero-Variance Statutory Challans",
        desc: "Direct remittance verification and monthly client-specific PF/ESI challan generation.",
        iconName: "ShieldCheck"
      },
      {
        title: "Biometric Shift Reconciliation",
        desc: "Automated billing reconciled with real-time biometric and electronic attendance punch logs.",
        iconName: "Clock"
      },
      {
        title: "Dual Employment Background Checks",
        desc: "Automated UAN and tax data checks detecting unauthorized concurrent employment.",
        iconName: "FileSearch"
      },
      {
        title: "Statutory Wage Structuring",
        desc: "Audit-proof salary structuring fully compliant with Supreme Court PF wage definitions.",
        iconName: "Settings"
      },
      {
        title: "Turnkey Labor Legal Defense",
        desc: "Complete indemnification and legal counsel representation for all deployed associates.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "Request a Managed Staffing & Workforce Compliance Audit",
      buttonText: "REQUEST WORKFORCE AUDIT →",
      link: "/services/staffing-managed#consultation-form",
      subtitle: "Eliminate principal employer liabilities across your flexible and contractual workforce."
    }
  }
};

/**
 * Helper function to retrieve poster data for any given key.
 * Falls back to cluster or default if specific sub-sector isn't mapped.
 */
export function getPosterData(key: string): PosterData {
  if (masterPosterData[key]) {
    return masterPosterData[key];
  }

  // Fallback mappings for sub-industries
  const subMappings: Record<string, string> = {
    "auto-components": "automobiles",
    "chemicals-specialty": "manufacturing-industrial",
    "electronics-semiconductor": "technology-electronics",
    "it-bpm": "technology-electronics",
    "banking": "financial-services",
    "pharmaceuticals": "healthcare-life-sciences",
    "healthcare": "healthcare-life-sciences",
    "dairy-beverages": "food-processing",
    "retail": "consumer-retail",
    "textiles": "manufacturing-industrial"
  };

  const mappedKey = subMappings[key];
  if (mappedKey && masterPosterData[mappedKey]) {
    return masterPosterData[mappedKey];
  }

  // Default to regulatory compliance if nothing found
  return masterPosterData["regulatory-compliance"];
}

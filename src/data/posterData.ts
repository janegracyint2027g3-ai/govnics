// src/data/posterData.ts
// Master Data Repository for GOVENICS Industry & Offering Poster Design System
// Strictly complies with Brand Guidelines: Navy, Royal Blue, White, Soft Blue Gradients (4:5 Aspect Ratio)

export interface PosterSolution {
  title: string;
  desc: string;
  iconName: "ShieldCheck" | "Layers" | "ClipboardCheck" | "FileSearch" | "Settings" | "BarChart3" | "Lock" | "Clock" | "Users" | "CheckCircle2";
}

export interface PosterData {
  id: string; // matches route id (e.g. "automobiles", "regulatory-compliance", "manufacturing-industrial")
  title: string;
  categoryType: "industry" | "offering";
  clusterId?: string;
  categoryName: string;
  subCategoryName?: string;
  targetPersona: string;

  // Section B - Strong Headline
  headline: {
    prefix?: string;
    highlight: string;
    suffix?: string;
  };

  // Section C - Key Statistic / Industry Intelligence
  stat: {
    figure: string;
    label: string;
    context: string;
    source: string;
    year: string;
  };

  // Section D - Visual Iconography Theme
  visualTheme: "manufacturing" | "technology" | "finance" | "healthcare" | "food" | "infrastructure" | "energy" | "retail" | "governance" | "cyber" | "esg" | "supply-chain" | "trade";

  // Section E - Business Risks / Pain Points (3-4 items)
  risks: string[];

  // Section F - How GOVENICS Helps (3-4 items)
  solutions: PosterSolution[];

  // Section G - CTA
  cta: {
    text: string;
    link: string;
    subtitle?: string;
  };
}

export const masterPosterData: Record<string, PosterData> = {
  // =========================================================================
  // INDUSTRY CLUSTER 1: MANUFACTURING & INDUSTRIAL
  // =========================================================================
  "manufacturing-industrial": {
    id: "manufacturing-industrial",
    title: "Manufacturing & Industrial GRC",
    categoryType: "industry",
    clusterId: "manufacturing-industrial",
    categoryName: "Manufacturing & Industrial",
    targetPersona: "Plant Directors & VP Operations",
    headline: {
      prefix: "CAN YOUR FACTORY PRODUCE",
      highlight: "STATUTORY RECORDS",
      suffix: "DURING UNANNOUNCED INSPECTION?"
    },
    stat: {
      figure: "4,800+",
      label: "Factory Inspections",
      context: "Conducted under Factories Act with unannounced safety & register audits.",
      source: "Directorate General Factory Advice Service & Labour Institutes (DGFASLI)",
      year: "2023"
    },
    visualTheme: "manufacturing",
    risks: [
      "Navigating 38 overlapping central, state, boiler, and pollution approvals.",
      "Uncredited contractor muster rolls creating joint-employer liability under CLRA.",
      "Lapsed Consent to Operate (CTO) renewals risking immediate plant closure orders.",
      "Delayed hazardous waste manifest tracking across multi-shift facilities."
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
        desc: "Instant retrieval of 5 years of certified statutory evidence.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST A FACTORY GRC DIAGNOSTIC",
      link: "/contact?intent=manufacturing-audit",
      subtitle: "Connect with our Senior Industrial Compliance Advisory Team"
    }
  },

  "automobiles": {
    id: "automobiles",
    title: "Automotive Manufacturing GRC",
    categoryType: "industry",
    clusterId: "manufacturing-industrial",
    categoryName: "Manufacturing & Industrial",
    subCategoryName: "Automotive & Auto Components",
    targetPersona: "Plant Directors & Head of EHS",
    headline: {
      prefix: "CAN YOUR AUTOMOTIVE PLANT DEMONSTRATE",
      highlight: "100% AUDIT READINESS",
      suffix: "ACROSS THE ENTIRE ASSEMBLY LINE?"
    },
    stat: {
      figure: "Zero Defects",
      label: "IATF 16949 & EHS Norms",
      context: "Tier-1 OEMs face immediate assembly stoppages for unverified supplier compliance.",
      source: "Automotive Industry Compliance Benchmark",
      year: "2024"
    },
    visualTheme: "manufacturing",
    risks: [
      "Complex multi-tier supplier compliance gaps stalling production lines.",
      "Dynamic assembly-line safety guidelines and shop-floor EHS inspections.",
      "Contractor worker safety non-conformities leading to heavy regulatory penalties.",
      "Tracking component environmental footprints and extended producer obligations."
    ],
    solutions: [
      {
        title: "Assembly EHS Automation",
        desc: "Daily automated machinery safety and hazardous process monitoring.",
        iconName: "Settings"
      },
      {
        title: "Tier-1 Supplier Audits",
        desc: "Real-time vendor statutory tracking and labour compliance assurance.",
        iconName: "Layers"
      },
      {
        title: "License Currency Tracking",
        desc: "Continuous tracking of industrial explosive, boiler, and factory permits.",
        iconName: "Clock"
      },
      {
        title: "Board Risk Briefings",
        desc: "Executive risk dashboards for directorial statutory peace of mind.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "ASSESS AUTOMOTIVE PLANT COMPLIANCE",
      link: "/contact?intent=automotive-grc",
      subtitle: "Tailored for Tier-1 OEMs and component manufacturing leaders"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 2: TECHNOLOGY & ELECTRONICS
  // =========================================================================
  "technology-electronics": {
    id: "technology-electronics",
    title: "Technology & Electronics GRC",
    categoryType: "industry",
    clusterId: "technology-electronics",
    categoryName: "Technology & Electronics",
    targetPersona: "CISOs, DPOs & General Counsels",
    headline: {
      prefix: "IS YOUR ENTERPRISE READY FOR",
      highlight: "DPDP ACT ENFORCEMENT",
      suffix: "& 6-HOUR CERT-IN REPORTING?"
    },
    stat: {
      figure: "₹250 Crore",
      label: "Statutory Penalty Ceiling",
      context: "Prescribed under DPDP Act 2023 for failure to implement verifiable security safeguards.",
      source: "Ministry of Electronics & IT (MeitY) Gazette of India",
      year: "2023"
    },
    visualTheme: "cyber",
    risks: [
      "Ambiguous customer data consent architectures violating DPDP principles.",
      "Strict 6-hour CERT-In incident notification window causing compliance panic.",
      "Unvetted third-party software libraries and vendor cloud API vulnerabilities.",
      "E-Waste Extended Producer Responsibility (EPR) collection shortfall penalties."
    ],
    solutions: [
      {
        title: "DPDP Compliance Mapping",
        desc: "End-to-end consumer personal data flow mapping and consent lifecycle.",
        iconName: "Lock"
      },
      {
        title: "CERT-In 6-Hour Playbook",
        desc: "Pre-configured rapid incident triage and regulatory reporting workflows.",
        iconName: "Clock"
      },
      {
        title: "ISO 27001 & SOC 2 Defense",
        desc: "Comprehensive continuous technical controls monitoring and audit readiness.",
        iconName: "ShieldCheck"
      },
      {
        title: "Vendor Tech Audits",
        desc: "Continuous third-party security posture and API vulnerability assessments.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "REQUEST A CYBER & DPDP DIAGNOSTIC",
      link: "/contact?intent=tech-cyber-diagnostic",
      subtitle: "Evaluate your technical and regulatory data privacy posture"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 3: FINANCIAL SERVICES (BFSI)
  // =========================================================================
  "financial-services": {
    id: "financial-services",
    title: "Banking, NBFC & Financial Services GRC",
    categoryType: "industry",
    clusterId: "financial-services",
    categoryName: "Financial Services",
    targetPersona: "Chief Compliance Officers & Chief Risk Officers",
    headline: {
      prefix: "HOW PREPARED IS YOUR INSTITUTION FOR",
      highlight: "SUPERVISORY AUDIT SCRUTINY",
      suffix: "ACROSS KYC, IT & LENDING NORMS?"
    },
    stat: {
      figure: "₹100 Cr+",
      label: "Cumulative Penalties",
      context: "Imposed on regulated financial entities for KYC lapses and IT governance deficiencies.",
      source: "Reserve Bank of India Enforcement Actions Annual Review",
      year: "2023"
    },
    visualTheme: "finance",
    risks: [
      "Rigorous Scale-Based Regulation (SBR) compliance mandates for Upper/Middle Layer NBFCs.",
      "Unmonitored digital lending app partnerships breaching fair practice codes.",
      "Incomplete Ultimate Beneficial Ownership (UBO) records violating PMLA mandates.",
      "Delayed material event disclosures triggering SEBI LODR stock exchange inquiries."
    ],
    solutions: [
      {
        title: "RBI Scale-Based Mapping",
        desc: "Comprehensive compliance charters aligned with RBI Master Directions.",
        iconName: "Settings"
      },
      {
        title: "Digital Lending Governance",
        desc: "Automated underwriting, escrow, and collection partner compliance audits.",
        iconName: "ClipboardCheck"
      },
      {
        title: "PMLA Beneficial Ownership",
        desc: "Standardized multi-tier corporate entity verification and AML screening.",
        iconName: "FileSearch"
      },
      {
        title: "Executive Risk Dashboards",
        desc: "Real-time board risk committee telemetry and supervisory audit trails.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "SCHEDULE A BFSI REGULATORY BRIEFING",
      link: "/contact?intent=bfsi-governance",
      subtitle: "Tailored for Scheduled Commercial Banks, NBFCs & Fintechs"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 4: HEALTHCARE & LIFE SCIENCES
  // =========================================================================
  "healthcare-life-sciences": {
    id: "healthcare-life-sciences",
    title: "Healthcare, Hospitals & Life Sciences GRC",
    categoryType: "industry",
    clusterId: "healthcare-life-sciences",
    categoryName: "Healthcare & Life Sciences",
    targetPersona: "VP Quality Assurance & Medical Directors",
    headline: {
      prefix: "CAN YOUR HEALTHCARE FACILITY DEMONSTRATE",
      highlight: "COMPLIANCE AT EVERY LEVEL",
      suffix: "FROM DRUG GMP TO CLINICAL WASTE?"
    },
    stat: {
      figure: "Revised Schedule M",
      label: "Mandatory CDSCO Standard",
      context: "Enforcing automated HVAC validation, computerized data integrity & cleanroom hygiene.",
      source: "CDSCO Gazette Notification G.S.R. 922(E)",
      year: "2024"
    },
    visualTheme: "healthcare",
    risks: [
      "Strict compliance with CDSCO Revised Schedule M (GMP) data integrity standards.",
      "Severe penalties for improper bio-medical waste segregation and barcoded manifest gaps.",
      "Statutory price capping and unexpected overcharging recovery notices under DPCO.",
      "Clinical establishments act documentation gaps across multi-specialty centers."
    ],
    solutions: [
      {
        title: "Schedule M Gap Audit",
        desc: "Comprehensive facility readiness and technical validation for pharma units.",
        iconName: "CheckCircle2"
      },
      {
        title: "Bio-Medical Waste Governance",
        desc: "Barcoded GPS manifest tracking ensuring 100% CPCB compliance currency.",
        iconName: "Layers"
      },
      {
        title: "NABH / NABL Readiness",
        desc: "Standardized clinical protocols, staffing ratios, and tariff disclosure registers.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Healthcare Data Privacy",
        desc: "Secure patient electronic record protection and medical consent frameworks.",
        iconName: "Lock"
      }
    ],
    cta: {
      text: "DISCUSS HEALTHCARE & PHARMA ADVISORY",
      link: "/contact?intent=healthcare-grc",
      subtitle: "Confidential gap analysis for hospitals and pharmaceutical formulators"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 5: FOOD PROCESSING & AGRICULTURE
  // =========================================================================
  "food-processing": {
    id: "food-processing",
    title: "Food Processing & Packaged Goods GRC",
    categoryType: "industry",
    clusterId: "food-processing",
    categoryName: "Food Processing & Agriculture",
    targetPersona: "Head of Food Safety, Quality & Operations",
    headline: {
      prefix: "CAN YOUR FOOD PROCESSING UNIT WITHSTAND",
      highlight: "FSSAI RISK-BASED INSPECTION",
      suffix: "WITH 100% BATCH TRACEABILITY?"
    },
    stat: {
      figure: "26,267",
      label: "FoSCoS Inspections",
      context: "Conducted pan-India resulting in over 3,800 license suspension and seizure notices.",
      source: "Food Safety and Standards Authority of India (FSSAI) Bulletin",
      year: "2023-24"
    },
    visualTheme: "food",
    risks: [
      "Product seizure notices triggered by unendorsed FSSAI FoSCoS category listings.",
      "Broken cold-chain data logs risking export rejection under APEDA guidelines.",
      "Up to ₹10 Lakh statutory penalties under FSS Act Section 52 for mislabeled packaging.",
      "Delayed annual water quality (IS 10500) and laboratory pesticide testing certificates."
    ],
    solutions: [
      {
        title: "FoSCoS Category Alignment",
        desc: "Full verification of licensed manufacturing capacities and category endorsements.",
        iconName: "CheckCircle2"
      },
      {
        title: "Batch & Cold-Chain Traceability",
        desc: "End-to-end digital ingredient and temperature logging for audit defensibility.",
        iconName: "Clock"
      },
      {
        title: "Packaging Label Audits",
        desc: "Nutritional panel, allergen declaration, and Legal Metrology compliance checks.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Pre-Audit Mock Inspections",
        desc: "Simulated food safety enforcement audits preventing operational stoppages.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST A FOOD SAFETY AUDIT REVIEW",
      link: "/contact?intent=food-processing-audit",
      subtitle: "Verify your FoSCoS licenses and batch traceability before inspectors arrive"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 6: INFRASTRUCTURE & CONSTRUCTION
  // =========================================================================
  "infrastructure-construction": {
    id: "infrastructure-construction",
    title: "Infrastructure, Real Estate & Construction GRC",
    categoryType: "industry",
    clusterId: "infrastructure-construction",
    categoryName: "Infrastructure & Construction",
    targetPersona: "Project Directors & Chief Legal Officers",
    headline: {
      prefix: "ARE YOUR LARGE INFRASTRUCTURE PROJECTS",
      highlight: "FULLY DEFENDABLE",
      suffix: "UNDER RERA, BOCW & EIA REGULATIONS?"
    },
    stat: {
      figure: "70% Escrow",
      label: "Mandatory Revenue Ringfence",
      context: "Enforced under RERA Section 4 to prevent project fund diversion and construction delays.",
      source: "Ministry of Housing & Urban Affairs (MoHUA) Guidelines",
      year: "2023"
    },
    visualTheme: "infrastructure",
    risks: [
      "Severe compounding interest and notices for unpaid 1% BOCW construction welfare cess.",
      "National Green Tribunal (NGT) stop-work orders for expired Environmental Clearances (EIA).",
      "High liability for site subcontractor labour accidents lacking certified safety netting.",
      "Strict municipal structural stability and recurring fire safety NOC renewals."
    ],
    solutions: [
      {
        title: "RERA Escrow Monitoring",
        desc: "Automated project cost allocation and CA/Architect certification verification.",
        iconName: "BarChart3"
      },
      {
        title: "BOCW Cess Reconciliation",
        desc: "Accurate assessment and pre-audit reconciliation of construction worker cess.",
        iconName: "ClipboardCheck"
      },
      {
        title: "EHS Site Safety Audits",
        desc: "Proactive high-hazard construction safety audits and personal protective checks.",
        iconName: "Settings"
      },
      {
        title: "Clearance Tracking Engine",
        desc: "Centralized monitoring of airport, tree transit, water, and environmental NOCs.",
        iconName: "Clock"
      }
    ],
    cta: {
      text: "ASSESS INFRASTRUCTURE PROJECT EXPOSURE",
      link: "/contact?intent=infrastructure-compliance",
      subtitle: "Protect commercial property and EPC projects from costly stop-work directives"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 7: ENERGY & UTILITIES
  // =========================================================================
  "energy-utilities": {
    id: "energy-utilities",
    title: "Energy, Power & Clean Utilities GRC",
    categoryType: "industry",
    clusterId: "energy-utilities",
    categoryName: "Energy & Utilities",
    targetPersona: "Chief Operating Officers & VP Regulatory Affairs",
    headline: {
      prefix: "CAN YOUR POWER & ENERGY ASSETS MAINTAIN",
      highlight: "100% CONTINUITY",
      suffix: "UNDER RIGID GRID & POLLUTION NORMS?"
    },
    stat: {
      figure: "100% Fly Ash",
      label: "Statutory Utilization Target",
      context: "Mandated under CPCB environmental notifications for thermal generation assets.",
      source: "Central Pollution Control Board Environmental Compendium",
      year: "2023"
    },
    visualTheme: "energy",
    risks: [
      "Heavy fiscal penalties under SERC directives for missed Renewable Purchase Obligations (RPO).",
      "CERC tariff curtailments and penalties for uncertified power transmission maintenance outages.",
      "Strict Directorate General of Mines Safety (DGMS) audits on mining and explosive permits.",
      "Mandatory carbon emission baselines and upcoming domestic carbon credit trading audits."
    ],
    solutions: [
      {
        title: "RPO Quota Governance",
        desc: "Continuous green energy procurement tracking and certificate reconciliation.",
        iconName: "CheckCircle2"
      },
      {
        title: "Continuous Emission Telemetry",
        desc: "Real-time automated stack emission and industrial effluent monitoring.",
        iconName: "BarChart3"
      },
      {
        title: "Mine & Explosive Safety",
        desc: "Statutory DGMS register compliance and explosive magazine inspection readiness.",
        iconName: "Settings"
      },
      {
        title: "Carbon Accounting & Net-Zero",
        desc: "Audit-grade Scope 1, 2, and 3 emission inventories ready for regulatory disclosure.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST AN ENERGY COMPLIANCE AUDIT",
      link: "/contact?intent=energy-utilities-audit",
      subtitle: "Specialized for solar, wind, power transmission, and refining facilities"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 8: CONSUMER & RETAIL
  // =========================================================================
  "consumer-retail": {
    id: "consumer-retail",
    title: "Retail, E-Commerce & FMCG GRC",
    categoryType: "industry",
    clusterId: "consumer-retail",
    categoryName: "Consumer Goods & Retail",
    targetPersona: "VP Retail Operations & Chief Commercial Officer",
    headline: {
      prefix: "IS YOUR MULTI-STORE RETAIL CHAIN DEFENDED AGAINST",
      highlight: "PACKAGING & CONSUMER REGULATORY SEIZURES",
      suffix: "ACROSS ALL OPERATING STATES?"
    },
    stat: {
      figure: "₹50 Lakh",
      label: "Consumer Protection Penalty",
      context: "Imposed by CCPA on consumer brands for deceptive design and dark pattern violations.",
      source: "Ministry of Consumer Affairs Guidelines",
      year: "2023"
    },
    visualTheme: "retail",
    risks: [
      "Legal Metrology raids and inventory seizures for missing manufacturer/MRP declarations.",
      "Store closures caused by unrenewed local state Shops and Commercial Establishments licenses.",
      "Plastic Waste Management Extended Producer Responsibility (EPR) recycling quota audits.",
      "Customer loyalty database consent non-compliance under Digital Personal Data Protection Act."
    ],
    solutions: [
      {
        title: "Multi-State Store Licensing",
        desc: "Centralized digital calendar managing trade, shop act, and signage licenses.",
        iconName: "Clock"
      },
      {
        title: "Legal Metrology Label Audits",
        desc: "Pre-distribution packaging verification ensuring zero warehouse seizure risk.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Plastic EPR Fulfillment",
        desc: "Audited brand-owner recycling certificate purchase and portal filing management.",
        iconName: "Layers"
      },
      {
        title: "Consumer Privacy Guardrails",
        desc: "DPDP-aligned opt-in consent flows for e-commerce checkouts and loyalty apps.",
        iconName: "Lock"
      }
    ],
    cta: {
      text: "ASSESS RETAIL CHAIN COMPLIANCE",
      link: "/contact?intent=retail-compliance-check",
      subtitle: "Comprehensive review for retail networks with 20+ operating stores"
    }
  },

  // =========================================================================
  // INDUSTRY CLUSTER 9: MEDIA & SERVICES
  // =========================================================================
  "media-services": {
    id: "media-services",
    title: "Media, Hospitality & Enterprise Services GRC",
    categoryType: "industry",
    clusterId: "media-services",
    categoryName: "Media & Enterprise Services",
    targetPersona: "General Counsels & Managing Directors",
    headline: {
      prefix: "CAN YOUR SERVICE ENTERPRISE DEMONSTRATE",
      highlight: "COMPLETE STATUTORY DEFICIENCY IMMUNITY",
      suffix: "ACROSS LICENSING & CONTENT NORMS?"
    },
    stat: {
      figure: "15-Day Rule",
      label: "Statutory Redressal Window",
      context: "Enforced under IT Intermediary Rules for user grievance resolutions and compliance reports.",
      source: "Ministry of Electronics & Information Technology Guidelines",
      year: "2023"
    },
    visualTheme: "governance",
    risks: [
      "Stringent 15-day user grievance resolution mandates under IT Intermediary Rules 2021.",
      "Unannounced municipal inspections and license suspensions for hospitality fire safety.",
      "University derecognition risks for unaligned UGC/AICTE faculty ratios and approvals.",
      "Severe corporate liability under POSH Act 2013 for unformed internal committees."
    ],
    solutions: [
      {
        title: "Intermediary Grievance Systems",
        desc: "Digital grievance logging, escalation workflows, and monthly disclosure reports.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Hospitality Safety Audits",
        desc: "Comprehensive Fire NOC, bar license, swimming pool, and health trade renewals.",
        iconName: "Clock"
      },
      {
        title: "POSH Statutory Governance",
        desc: "External committee member provisioning, employee training, and annual ROC filings.",
        iconName: "Users"
      },
      {
        title: "Brand Reputation Assurance",
        desc: "Continuous intellectual property, advertising code, and operational risk oversight.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "DISCUSS MEDIA & SERVICE ADVISORY",
      link: "/contact?intent=media-services-grc",
      subtitle: "Tailored governance advisory for education, hospitality, and digital publishers"
    }
  },

  // =========================================================================
  // CORE OFFERING 1: REGULATORY COMPLIANCE
  // =========================================================================
  "regulatory-compliance": {
    id: "regulatory-compliance",
    title: "Regulatory Compliance Advisory",
    categoryType: "offering",
    categoryName: "Regulatory Compliance",
    targetPersona: "Chief Compliance Officers & Company Secretaries",
    headline: {
      prefix: "IS YOUR ENTERPRISE READY FOR",
      highlight: "AUTOMATED REGULATORY DEFENSE",
      suffix: "WITH ZERO STATUTORY DEFAULT NOTICES?"
    },
    stat: {
      figure: "₹1 Lakh/Day",
      label: "Statutory Penalty Ceiling",
      context: "Mandated under Section 137(3) of Companies Act 2013 for delayed subsidiary financial filings.",
      source: "Ministry of Corporate Affairs (MCA) Enforcement Gazette",
      year: "2023-24"
    },
    visualTheme: "governance",
    risks: [
      "Fragmented secretarial spreadsheets across multi-tier operating subsidiaries.",
      "Personal civil and criminal liability on independent directors under Section 149(12).",
      "Delayed ROC annual returns compounding into heavy daily statutory fiscal penalties.",
      "Scrambling during supervisory audits due to missing physical evidentiary document files."
    ],
    solutions: [
      {
        title: "Automated Digital Registers",
        desc: "Cloud-hosted, tamper-evident statutory registers updated continuously.",
        iconName: "ClipboardCheck"
      },
      {
        title: "45-Day Early Warning Engine",
        desc: "Proactive alert workflows before any statutory filing or permit expires.",
        iconName: "Clock"
      },
      {
        title: "Director Liability Shield",
        desc: "Documented board compliance reporting ensuring total Section 149(12) defense.",
        iconName: "ShieldCheck"
      },
      {
        title: "100% Audit Readiness",
        desc: "Instant one-click digital dossier generation for regulatory inspection officers.",
        iconName: "FileSearch"
      }
    ],
    cta: {
      text: "REQUEST A REGULATORY COMPLIANCE AUDIT",
      link: "/contact?intent=regulatory-compliance-audit",
      subtitle: "Comprehensive review of all central, state, and ROC filing obligations"
    }
  },

  // =========================================================================
  // CORE OFFERING 2: LABOUR & EMPLOYMENT
  // =========================================================================
  "labour-employment": {
    id: "labour-employment",
    title: "Labour & Employment Law Governance",
    categoryType: "offering",
    categoryName: "Labour & Employment",
    targetPersona: "Heads of HR & Industrial Relations",
    headline: {
      prefix: "CAN YOUR ENTERPRISE ELIMINATE",
      highlight: "CONTRACTOR WAGE LIABILITIES",
      suffix: "BEFORE LABOUR INSPECTORS VISIT?"
    },
    stat: {
      figure: "₹12,000 Cr",
      label: "Undetected Wage Gap",
      context: "Discovered by EPFO during nationwide contractor wage & welfare inspection drives.",
      source: "Employees' Provident Fund Organisation (EPFO) Annual Report",
      year: "2022-23"
    },
    visualTheme: "manufacturing",
    risks: [
      "Joint-employer financial liability under CLRA Section 22 for contractor non-compliance.",
      "Under-computed basic wages and uncredited PF/ESI challans on shop floors.",
      "Transition uncertainties surrounding 4 Unified Labour Codes and gratuity liabilities.",
      "Unannounced factory inspector visits resulting in sudden plant stoppage notices."
    ],
    solutions: [
      {
        title: "Contractor Muster Roll Audits",
        desc: "Monthly 100% verification of contractor wage, PF, and ESI challan deposits.",
        iconName: "Users"
      },
      {
        title: "Labour Code Transition Engine",
        desc: "Strategic restructuring of wage components to align with the 4 Unified Codes.",
        iconName: "Settings"
      },
      {
        title: "Standing Orders & Welfare Audits",
        desc: "Review of canteen, crèche, first-aid, and safety amenities for plant workers.",
        iconName: "ClipboardCheck"
      },
      {
        title: "POSH Compliance Verification",
        desc: "Internal committee formation, annual state reporting, and mandatory training.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "SCHEDULE A CONTRACT LABOUR AUDIT",
      link: "/contact?intent=labour-employment-audit",
      subtitle: "Eliminate contractor defaults and protect your factory uptime"
    }
  },

  // =========================================================================
  // CORE OFFERING 3: TAXATION & TRADE
  // =========================================================================
  "taxation-trade": {
    id: "taxation-trade",
    title: "Taxation & Trade Governance",
    categoryType: "offering",
    categoryName: "Taxation & Trade",
    targetPersona: "Chief Financial Officers & Heads of Taxation",
    headline: {
      prefix: "IS YOUR WORKING CAPITAL BLOCKED BY",
      highlight: "GSTR-2B CREDIT MISMATCHES",
      suffix: "& CUSTOMS SPECIAL VALUATION SCRUTINY?"
    },
    stat: {
      figure: "1.14 Lakh",
      label: "GST Demand Notices",
      context: "Issued by tax authorities totaling ₹1.45 lakh crore, largely from input credit gaps.",
      source: "Central Board of Indirect Taxes & Customs (CBIC) Gazette",
      year: "2022-23"
    },
    visualTheme: "finance",
    risks: [
      "Rule 86B automated restrictions locking electronic credit ledgers and cash flow.",
      "Customs valuation disputes under Special Valuation Branch (SVB) delaying port clearance.",
      "Section 148 income tax reopenings triggered by faceless algorithmic data matching.",
      "Heavy 5x customs duty penalty exposure under Section 114 for mismatched manifests."
    ],
    solutions: [
      {
        title: "Automated GSTR-2B Matching",
        desc: "Pre-filing invoice level reconciliation unlocking maximum legitimate input tax credits.",
        iconName: "BarChart3"
      },
      {
        title: "Customs SVB Valuation Defense",
        desc: "Expert representation and pricing documentation for related-party cross-border imports.",
        iconName: "FileSearch"
      },
      {
        title: "MOOWR Bonded Deferral",
        desc: "Section 65 customs bonded manufacturing deferring 100% upfront import duties.",
        iconName: "Settings"
      },
      {
        title: "Transfer Pricing Certification",
        desc: "Robust international transaction benchmarking preventing tax scrutiny adjustments.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST A TAX & CUSTOMS DIAGNOSTIC",
      link: "/contact?intent=tax-trade-audit",
      subtitle: "Safeguard working capital and resolve disputed input credits"
    }
  },

  // =========================================================================
  // CORE OFFERING 4: ENVIRONMENTAL & EHS
  // =========================================================================
  "environmental-ehs": {
    id: "environmental-ehs",
    title: "Environmental, Health & Safety (EHS)",
    categoryType: "offering",
    categoryName: "Environmental & EHS",
    targetPersona: "Heads of EHS & Sustainability Directors",
    headline: {
      prefix: "ARE YOUR INDUSTRIAL PLANTS PROTECTED AGAINST",
      highlight: "UNPLANNED CLOSURE NOTICES",
      suffix: "FOR LAPSED POLLUTION CONSENTS?"
    },
    stat: {
      figure: "18.2% Surge",
      label: "Annual Closure Directives",
      context: "Recorded by CPCB under Air and Water Acts for industrial non-compliance.",
      source: "Central Pollution Control Board (CPCB) Annual Review",
      year: "2022-23"
    },
    visualTheme: "esg",
    risks: [
      "Sudden factory stop-work directives for operating on lapsed Consent to Operate (CTO).",
      "Compounding environmental compensation fines under the amended Jan Vishwas Act.",
      "Strict CGWA groundwater extraction meters and bi-annual water impact audits.",
      "Barcoded manifest non-compliance for industrial hazardous and chemical waste."
    ],
    solutions: [
      {
        title: "CTE / CTO Consent Renewal",
        desc: "End-to-end liaison with State Pollution Control Boards preventing lapses.",
        iconName: "Clock"
      },
      {
        title: "Hazardous Waste Barcoding",
        desc: "100% compliant manifest tracking from plant shop floor to authorized recyclers.",
        iconName: "Layers"
      },
      {
        title: "CGWA Water Audit Assurance",
        desc: "Digital telemetry calibration and ground water recharge certification.",
        iconName: "BarChart3"
      },
      {
        title: "Industrial Safety Audits",
        desc: "Comprehensive ISO 45001 workplace hazard identification and risk mitigation.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "SCHEDULE AN EHS FACILITY REVIEW",
      link: "/contact?intent=ehs-facility-audit",
      subtitle: "Comprehensive safety, pollution, and water compliance health check"
    }
  },

  // =========================================================================
  // CORE OFFERING 5: SUPPLY CHAIN GOVERNANCE
  // =========================================================================
  "supply-chain": {
    id: "supply-chain",
    title: "Supply Chain & Third-Party Governance",
    categoryType: "offering",
    categoryName: "Supply Chain Governance",
    targetPersona: "Chief Procurement Officers & Supply Chain Directors",
    headline: {
      prefix: "DO YOU HAVE FULL VISIBILITY OVER",
      highlight: "TIER-2 & TIER-3 VENDOR RISKS",
      suffix: "BEFORE THEY DISRUPT PRODUCTION?"
    },
    stat: {
      figure: "62%",
      label: "Vendor Risk Origination",
      context: "Of enterprise corporate compliance violations stem from unmonitored supplier networks.",
      source: "Global Supply Chain Governance & Integrity Study",
      year: "2023"
    },
    visualTheme: "supply-chain",
    risks: [
      "Critical production line shutdowns caused by sudden vendor insolvency or strikes.",
      "Subcontractor labour and safety violations creating direct corporate liability.",
      "Mandatory SEBI BRSR Core value-chain ESG audit demands on top 250 enterprise vendors.",
      "Anti-bribery and corruption exposure under Prevention of Corruption Act (ABAC/FCPA)."
    ],
    solutions: [
      {
        title: "Vendor Statutory Verification",
        desc: "Automated onboarding verification of vendor tax, labour, and safety currency.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Tier-2 Wage Muster Audits",
        desc: "On-ground physical audits verifying subcontractor wages and social security.",
        iconName: "Users"
      },
      {
        title: "Supply Chain ESG Assurance",
        desc: "BRSR Core value chain screening for child labour, emissions, and governance.",
        iconName: "BarChart3"
      },
      {
        title: "Third-Party Risk Management",
        desc: "Continuous real-time vendor risk scoring and dual-sourcing contingency plans.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST A VENDOR RISK AUDIT",
      link: "/contact?intent=vendor-risk-audit",
      subtitle: "Shield your supply chain from subcontractor default and ESG scrutiny"
    }
  },

  // =========================================================================
  // CORE OFFERING 6: EXPORT & GLOBAL TRADE
  // =========================================================================
  "export-trade": {
    id: "export-trade",
    title: "Export & Global Trade Advisory",
    categoryType: "offering",
    categoryName: "Export & Global Trade",
    targetPersona: "Heads of Global Logistics & VP Export Operations",
    headline: {
      prefix: "ARE YOUR GLOBAL SHIPMENTS DEFENDED AGAINST",
      highlight: "CUSTOMS DEMURRAGE & EDPMS SCRUTINY",
      suffix: "AT MAJOR AIR AND SEA PORTS?"
    },
    stat: {
      figure: "60% Faster",
      label: "Port Dwell Clearance",
      context: "Achieved by Authorized Economic Operator (AEO Tier-3) certified corporate exporters.",
      source: "Central Board of Indirect Taxes & Customs (CBIC) Trade Program",
      year: "2023"
    },
    visualTheme: "trade",
    risks: [
      "Demurrage and container holding costs due to delayed customs Bill of Entry approvals.",
      "Automatic RBI export caution-listing for unadjusted EDPMS foreign invoice receipts.",
      "Advance Authorisation and EPCG export obligation redemption audits by DGFT.",
      "Severe Section 111 container confiscation risks for declaration discrepancies."
    ],
    solutions: [
      {
        title: "AEO Tier-2 & Tier-3 Accreditation",
        desc: "Fast-track green-channel clearance and exemption from bank guarantee bonds.",
        iconName: "CheckCircle2"
      },
      {
        title: "FEMA EDPMS / IDPMS Settlement",
        desc: "Automated bank reconciliation eliminating export caution-listing notices.",
        iconName: "BarChart3"
      },
      {
        title: "DGFT Advance License Closure",
        desc: "Flawless redemption of EPCG export obligations and duty-free import authorisations.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Customs Bonded MOOWR Setup",
        desc: "Complete operational setup for manufacturing in customs bonded warehouses.",
        iconName: "Settings"
      }
    ],
    cta: {
      text: "SCHEDULE A GLOBAL TRADE AUDIT",
      link: "/contact?intent=global-trade-audit",
      subtitle: "Eliminate port delays, redeem export licenses, and secure AEO accreditation"
    }
  },

  // =========================================================================
  // CORE OFFERING 7: LICENSING & PERMITS
  // =========================================================================
  "licensing-permits": {
    id: "licensing-permits",
    title: "Licensing & Industrial Permits Management",
    categoryType: "offering",
    categoryName: "Licensing & Permits",
    targetPersona: "Heads of Corporate Affairs & Plant Heads",
    headline: {
      prefix: "CAN YOUR MULTI-SITE ENTERPRISE TRACK",
      highlight: "DOZENS OF CONCURRENT PERMITS",
      suffix: "WITHOUT A SINGLE EXPIRED LICENCE?"
    },
    stat: {
      figure: "38 Concurrent",
      label: "Statutory Approvals",
      context: "Required by a standard industrial manufacturing facility across civic, state, and central boards.",
      source: "DPIIT Industrial Regulatory Assessment Compendium",
      year: "2023"
    },
    visualTheme: "governance",
    risks: [
      "Municipal sealing orders for operating facilities on expired Fire Safety NOCs.",
      "Factory boiler shutdowns due to missed annual mechanical certification dates.",
      "Petroleum & Explosives Safety Organisation (PESO) license suspension risks.",
      "Manual spreadsheet tracking leading to a 60-day average lapse before discovery."
    ],
    solutions: [
      {
        title: "Permit Lifecycle Engine",
        desc: "Centralized digital registry tracking all municipal, state, and central licenses.",
        iconName: "Clock"
      },
      {
        title: "Fire Safety & Structural NOCs",
        desc: "Coordinated on-site inspections, stability checks, and civic renewals.",
        iconName: "ShieldCheck"
      },
      {
        title: "PESO & Boiler Approvals",
        desc: "Certified engineer testing and liaison for high-pressure storage and boilers.",
        iconName: "Settings"
      },
      {
        title: "60-Day Pre-Expiry Workflow",
        desc: "Automated escalations ensuring renewal submissions well before deadlines.",
        iconName: "ClipboardCheck"
      }
    ],
    cta: {
      text: "REQUEST A PERMIT CURRENCY AUDIT",
      link: "/contact?intent=licensing-permits-audit",
      subtitle: "Never let an expired operating licence disrupt your business operations"
    }
  },

  // =========================================================================
  // CORE OFFERING 8: COMMERCIAL ESCROW
  // =========================================================================
  "escrow-services": {
    id: "escrow-services",
    title: "Commercial & M&A Escrow Advisory",
    categoryType: "offering",
    categoryName: "Commercial Escrow Services",
    targetPersona: "General Counsels, M&A Heads & PE Partners",
    headline: {
      prefix: "IS YOUR HIGH-STAKES TRANSACTION SECURED BY",
      highlight: "INDEPENDENT ESCROW GOVERNANCE",
      suffix: "WITH PRE-AGREED MILESTONE CERTAINTY?"
    },
    stat: {
      figure: "₹18,500 Cr",
      label: "Disputed Capital",
      context: "Locked in commercial and capex procurement litigation due to unsecured advances.",
      source: "National Company Law Tribunal (NCLT) Dispute Review",
      year: "2023"
    },
    visualTheme: "finance",
    risks: [
      "Counterparty default on high-value asset acquisitions and capex advance payments.",
      "Traditional escrow setup taking 4–6 weeks, stalling critical commercial deal closings.",
      "Source code and core tech IP loss during critical software licensing partnerships.",
      "RERA compliance disputes over delayed builder withdrawals from 70% project accounts."
    ],
    solutions: [
      {
        title: "48-Hour Escrow Structuring",
        desc: "Fast-track legal drafting and scheduled bank account setup for M&A and trade.",
        iconName: "Clock"
      },
      {
        title: "Milestone Verification Releases",
        desc: "Dual-signoff release protocols based on independent third-party verification.",
        iconName: "CheckCircle2"
      },
      {
        title: "Software Source Code Vault",
        desc: "Encrypted tech asset escrow protecting buyers against developer insolvency.",
        iconName: "Lock"
      },
      {
        title: "RERA Project Escrow Audits",
        desc: "Independent monitoring and CA certificate validation for builder withdrawals.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "STRUCTURE A COMMERCIAL ESCROW",
      link: "/contact?intent=commercial-escrow",
      subtitle: "Neutral tripartite governance for M&A, cross-border trade, and capex advances"
    }
  },

  // =========================================================================
  // CORE OFFERING 9: ENTERPRISE RISK MANAGEMENT (ERM)
  // =========================================================================
  "risk-management": {
    id: "risk-management",
    title: "Enterprise Risk Management (ERM) & Resilience",
    categoryType: "offering",
    categoryName: "Enterprise Risk Management",
    targetPersona: "Chief Risk Officers & Audit Committee Chairs",
    headline: {
      prefix: "CAN YOUR EXECUTIVE BOARD IDENTIFY",
      highlight: "CRITICAL OPERATIONAL DISRUPTIONS",
      suffix: "BEFORE THEY IMPACT EARNINGS?"
    },
    stat: {
      figure: "₹12.4 Cr",
      label: "Average Breach Cost",
      context: "Calculated for major enterprise operational and compliance failures in 2023.",
      source: "Enterprise Risk Management & Operational Resilience Benchmark",
      year: "2023"
    },
    visualTheme: "governance",
    risks: [
      "Siloed departmental risk registers failing to provide unified enterprise visibility.",
      "Section 134(5) Companies Act personal director exposure for unverified internal controls.",
      "58% of mid-market enterprises failing unannounced disaster recovery simulation audits.",
      "Unanticipated supply chain bottlenecks eroding quarterly EBITDA margins."
    ],
    solutions: [
      {
        title: "Unified ERM Architecture",
        desc: "ISO 31000 aligned enterprise risk heat-maps covering strategic, operational, and cyber risks.",
        iconName: "BarChart3"
      },
      {
        title: "Internal Financial Controls (IFC)",
        desc: "Comprehensive testing and process documentation for Section 134(5) board compliance.",
        iconName: "CheckCircle2"
      },
      {
        title: "Business Continuity (BCP)",
        desc: "Simulated scenario drills ensuring zero downtime during crises.",
        iconName: "Settings"
      },
      {
        title: "Board Risk Committee Telemetry",
        desc: "Quarterly institutional risk dashboards tailored for independent directors.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST AN ENTERPRISE RISK REVIEW",
      link: "/contact?intent=enterprise-risk-audit",
      subtitle: "Transform reactive risk registers into predictive boardroom intelligence"
    }
  },

  // =========================================================================
  // CORE OFFERING 10: ENTERPRISE CORPORATE GOVERNANCE
  // =========================================================================
  "enterprise-governance": {
    id: "enterprise-governance",
    title: "Corporate Governance & Board Accountability",
    categoryType: "offering",
    categoryName: "Enterprise Governance",
    targetPersona: "Company Secretaries, Chairpersons & Legal Heads",
    headline: {
      prefix: "ARE YOUR INDEPENDENT DIRECTORS PROTECTED BY",
      highlight: "UNCOMPROMISING SECRETARIAL GOVERNANCE",
      suffix: "UNDER COMPANIES ACT & SEBI LODR?"
    },
    stat: {
      figure: "₹5 Crore+",
      label: "Direct Director Penalties",
      context: "Levied by MCA ROC adjudicating officers for secretarial omissions and filing gaps.",
      source: "Ministry of Corporate Affairs ROC Adjudication Orders Annual Register",
      year: "2023"
    },
    visualTheme: "governance",
    risks: [
      "Personal statutory exposure for independent directors under Section 149(12).",
      "Unmonitored leaks of Unpublished Price Sensitive Information (UPSI) violating SEBI PIT.",
      "Strict statutory enforcement of maximum 120-day gaps between board meetings.",
      "Mandatory unspent CSR fund transfer defaults incurring heavy ROC penalties."
    ],
    solutions: [
      {
        title: "Secretarial Standards Audit",
        desc: "Flawless compliance with ICSI SS-1 and SS-2 meeting documentation standards.",
        iconName: "ClipboardCheck"
      },
      {
        title: "SEBI PIT & UPSI Controls",
        desc: "Digital structured digital databases (SDD) tracking price sensitive info sharing.",
        iconName: "Lock"
      },
      {
        title: "Statutory CSR Mandate Audits",
        desc: "Impact assessments and compliance verification for Section 135 expenditure.",
        iconName: "Users"
      },
      {
        title: "Board Evaluation Charters",
        desc: "Independent board performance evaluations and governance scorecards.",
        iconName: "BarChart3"
      }
    ],
    cta: {
      text: "SCHEDULE A BOARD GOVERNANCE BRIEFING",
      link: "/contact?intent=board-governance-audit",
      subtitle: "Comprehensive review of secretarial compliance and independent director immunity"
    }
  },

  // =========================================================================
  // CORE OFFERING 11: CYBERSECURITY & DATA PROTECTION
  // =========================================================================
  "cybersecurity-data": {
    id: "cybersecurity-data",
    title: "Cybersecurity & Data Privacy (DPDP)",
    categoryType: "offering",
    categoryName: "Cybersecurity & Data Protection",
    targetPersona: "Chief Information Security Officers & DPOs",
    headline: {
      prefix: "CAN YOUR INFRASTRUCTURE DETECT & DISCLOSE",
      highlight: "CYBER INCIDENTS WITHIN 6 HOURS",
      suffix: "WHILE DEFENDING CUSTOMER PRIVACY?"
    },
    stat: {
      figure: "6-Hour Rule",
      label: "Mandatory Incident Reporting",
      context: "Enforced by CERT-In for ransomware, server intrusion, and data breach disclosures.",
      source: "CERT-In Cyber Security Directions Guidelines",
      year: "2023"
    },
    visualTheme: "cyber",
    risks: [
      "DPDP Act 2023 financial penalties up to ₹250 Crore for failing to protect user data.",
      "6-hour CERT-In mandatory notification deadlines causing operational reporting chaos.",
      "Global B2B procurement contract rejections for lacking verified SOC 2 Type II reports.",
      "Unsecured cloud API endpoints and unmonitored third-party vendor integrations."
    ],
    solutions: [
      {
        title: "DPDP Act Privacy Framework",
        desc: "Consent management, data principal rights workflows, and privacy impact audits.",
        iconName: "Lock"
      },
      {
        title: "CERT-In Incident Playbook",
        desc: "24/7 logging architecture and standardized 6-hour regulatory dispatch templates.",
        iconName: "Clock"
      },
      {
        title: "VAPT & Penetration Testing",
        desc: "Certified ethical hacking identifying critical vulnerabilities before adversaries.",
        iconName: "FileSearch"
      },
      {
        title: "ISO 27001:2022 Certification",
        desc: "Complete implementation and audit support for international security standards.",
        iconName: "ShieldCheck"
      }
    ],
    cta: {
      text: "REQUEST A CYBERSECURITY AUDIT",
      link: "/contact?intent=cybersecurity-audit",
      subtitle: "Verify your DPDP defensibility, SOC 2 posture, and CERT-In compliance"
    }
  },

  // =========================================================================
  // CORE OFFERING 12: ESG & SUSTAINABILITY
  // =========================================================================
  "esg-sustainability": {
    id: "esg-sustainability",
    title: "ESG, BRSR & Sustainability Advisory",
    categoryType: "offering",
    categoryName: "ESG & Sustainability",
    targetPersona: "Chief Sustainability Officers & CFOs",
    headline: {
      prefix: "ARE YOUR CORPORATE ESG DISCLOSURES",
      highlight: "BACKED BY AUDIT-GRADE EVIDENCE",
      suffix: "UNDER SEBI BRSR CORE GUIDELINES?"
    },
    stat: {
      figure: "Top 250 Listed",
      label: "Mandatory Supply Assurance",
      context: "Must obtain reasonable assurance on BRSR Core environmental and workforce metrics.",
      source: "Securities and Exchange Board of India (SEBI) Circular",
      year: "2024"
    },
    visualTheme: "esg",
    risks: [
      "Strict SEBI BRSR Core assurance mandates exposing unverified sustainability marketing.",
      "Upcoming European Union CBAM carbon tariffs penalizing steel, aluminium and cement exports.",
      "Mandatory plastic and electronic waste Extended Producer Responsibility (EPR) targets.",
      "Institutional investor capital reallocations away from poor ESG governance ratings."
    ],
    solutions: [
      {
        title: "BRSR Core Assurance Support",
        desc: "Audit-grade documentation for energy, water, waste, and employee welfare indicators.",
        iconName: "ClipboardCheck"
      },
      {
        title: "Scope 1, 2 & 3 Carbon Accounting",
        desc: "Greenhouse Gas (GHG) protocol aligned emissions accounting and net-zero roadmaps.",
        iconName: "BarChart3"
      },
      {
        title: "EU CBAM Export Compliance",
        desc: "Accredited embedded emission calculations ensuring zero EU border customs delays.",
        iconName: "CheckCircle2"
      },
      {
        title: "Plastic EPR Portal Compliance",
        desc: "End-to-end management of CPCB EPR portal filings and certified recycling credits.",
        iconName: "Layers"
      }
    ],
    cta: {
      text: "REQUEST A BRSR & ESG DIAGNOSTIC",
      link: "/contact?intent=esg-brsr-audit",
      subtitle: "Ensure your sustainability disclosures withstand institutional investor scrutiny"
    }
  },

  // =========================================================================
  // CORE OFFERING 13: STAFFING & MANAGED SERVICES
  // =========================================================================
  "staffing-managed": {
    id: "staffing-managed",
    title: "Dedicated Compliance Staffing & Retainership",
    categoryType: "offering",
    categoryName: "Staffing & Managed Services",
    targetPersona: "Chief Human Resources Officers & General Counsels",
    headline: {
      prefix: "CAN YOUR ENTERPRISE CLOSE",
      highlight: "CRITICAL GRC TALENT VACANCIES",
      suffix: "BEFORE REGULATORY AUDITS COMMENCE?"
    },
    stat: {
      figure: "78-Day Average",
      label: "Compliance Hiring Lag",
      context: "Experienced by enterprises when replacing departing Chief Compliance Officers and EHS leads.",
      source: "Corporate Compliance Staffing & Talent Outlook Study",
      year: "2023"
    },
    visualTheme: "governance",
    risks: [
      "Critical compliance vacancies leaving operating facilities exposed to unannounced audits.",
      "Ad-hoc emergency legal retainers costing 3x more than managed advisory programs.",
      "Difficulty finding specialized talent with localized district factory and labour board relationships.",
      "Sudden surges in audit defense workload overwhelming existing in-house compliance teams."
    ],
    solutions: [
      {
        title: "Dedicated Compliance Officers",
        desc: "Full-time, pre-vetted compliance professionals deployed directly to your facilities.",
        iconName: "Users"
      },
      {
        title: "Managed Compliance Retainership",
        desc: "Predictable monthly advisory covering all central, state, and statutory renewals.",
        iconName: "Clock"
      },
      {
        title: "Audit Defense Taskforces",
        desc: "Specialized regulatory SWAT teams deployed within 48 hours for high-stakes audits.",
        iconName: "ShieldCheck"
      },
      {
        title: "Fractional General Counsel",
        desc: "Senior corporate legal and company secretarial leadership at 65% lower overhead.",
        iconName: "Settings"
      }
    ],
    cta: {
      text: "EXPLORE COMPLIANCE STAFFING OPTIONS",
      link: "/contact?intent=compliance-staffing",
      subtitle: "Deploy experienced compliance leaders to your operational facilities within 48 hours"
    }
  }
};

/**
 * Helper to retrieve poster data by key or cluster fallback
 */
export function getPosterData(key: string): PosterData {
  if (masterPosterData[key]) {
    return masterPosterData[key];
  }
  // Check if it's a sub-industry belonging to a cluster
  const lower = key.toLowerCase();
  for (const item of Object.values(masterPosterData)) {
    if (item.clusterId && lower.includes(item.clusterId)) {
      return item;
    }
  }
  // Default to General Industrial Manufacturing
  return masterPosterData["manufacturing-industrial"];
}


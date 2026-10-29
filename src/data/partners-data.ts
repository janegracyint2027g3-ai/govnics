import {
  Scale,
  Coins,
  HardHat,
  Leaf,
  ShieldCheck,
  BarChart3,
  Globe2,
  Cpu,
  Network,
  Award,
  type LucideIcon
} from "lucide-react";

export interface FeaturedAlliance {
  name: string;
  type: string;
  specialization: string;
  tier: "Global Strategic" | "Premier Alliance" | "Accredited Body" | "Certified Practice" | "Integration OEM";
  badge: string;
  metric: string;
}

export interface PartnerTier {
  name: string;
  badge: string;
  description: string;
  commitments: string[];
}

export interface PartnerCategory {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  badge: string;
  iconName: string;
  icon: LucideIcon;
  tagline: string;
  partnerCount: string;
  color: "blue" | "indigo" | "violet" | "emerald" | "amber" | "rose" | "teal" | "cyan" | "purple" | "sky";
  accentColor: string;
  overview: string;
  detailedDescription: string;
  allianceFocus: string[];
  collaborativeDeliverables: string[];
  relevantRegulations: string[];
  featuredAlliances: FeaturedAlliance[];
  jointValuePropositions: string[];
  stats: { label: string; value: string }[];
}

export const partnerCategoriesData: PartnerCategory[] = [
  {
    id: "regulatory-compliance",
    slug: "regulatory-compliance",
    name: "Regulatory Compliance Partners",
    shortTitle: "Regulatory Compliance",
    badge: "Legal & Statutory Counsel",
    iconName: "Scale",
    icon: Scale,
    tagline: "Empowering enterprises with premier statutory counsels, MCA/ROC liaisons, and legal advisory networks.",
    partnerCount: "18+ Legal & Statutory Practices",
    color: "blue",
    accentColor: "#2563eb",
    overview: "We partner with tier-one corporate law firms, high-court advocates, and company secretarial practices to deliver end-to-end statutory health checks, board governance advisories, and gazetted regulatory change tracking.",
    detailedDescription: "In an evolving statutory terrain marked by cross-sectoral mandates and stringent director liability, GOVENICS pairs automated compliance workflows with vetted legal practitioners. Together, we co-author legal registers, issue formal legal opinion memorandums, and defend corporate positions across regional tribunals and appellate boards.",
    allianceFocus: [
      "Statutory compliance registry maintenance and recurring board audits",
      "MCA, ROC, and SEBI filing advisory and secretarial due diligence",
      "Corporate governance restructurings and cross-border regulatory harmonization",
      "Proactive regulatory gazette monitoring and legislative impact assessments"
    ],
    collaborativeDeliverables: [
      "Customized Corporate Statutory Risk Matrix & Calendar",
      "Director & Officer (D&O) Liability Exposure Health Reports",
      "Quarterly Regulatory Gazette Summaries & Board Advisory Memos",
      "Joint Secretarial Audit & Registrar Compliance Certification"
    ],
    relevantRegulations: [
      "Companies Act 2013 & MCA Secretarial Standards",
      "SEBI (Listing Obligations and Disclosure Requirements) 2015",
      "Competition Act 2002 & Antitrust Directives",
      "Insolvency and Bankruptcy Code (IBC) 2016"
    ],
    featuredAlliances: [
      {
        name: "Shardul Amarchand Mangaldas & Co",
        type: "Corporate Law Alliance",
        specialization: "Statutory Governance & M&A Due Diligence",
        tier: "Global Strategic",
        badge: "Tier-1 Counsel",
        metric: "100% Filing Compliance"
      },
      {
        name: "Trilegal Counsel Network",
        type: "Legal Advisory Alliance",
        specialization: "Regulatory Defense & Secretarial Oversight",
        tier: "Premier Alliance",
        badge: "Corporate Advisory",
        metric: "40+ Multi-jurisdictional Audits"
      },
      {
        name: "JSA Advocates & Solicitors",
        type: "Regulatory Litigation Practice",
        specialization: "Statutory Gazettes & Tribunal Representation",
        tier: "Premier Alliance",
        badge: "Tribunal Specialist",
        metric: "Zero Non-Compliance Penalties"
      },
      {
        name: "Cyril Amarchand Mangaldas",
        type: "Corporate Law Practice",
        specialization: "Corporate Board Governance & SEBI Advisory",
        tier: "Global Strategic",
        badge: "Capital Markets",
        metric: "250+ Board Compliance Briefs"
      }
    ],
    jointValuePropositions: [
      "Accelerated board clearance with legally backed statutory registers",
      "Defensible risk posture backed by formal legal opinions",
      "Seamless integration between statutory deadlines and digital tracking dashboards"
    ],
    stats: [
      { label: "Active Legal Partners", value: "18+" },
      { label: "Statutory Registers Managed", value: "450+" },
      { label: "Audit Clearance Rate", value: "99.8%" }
    ]
  },
  {
    id: "financial-governance",
    slug: "financial-governance",
    name: "Financial Governance Partners",
    shortTitle: "Financial Governance",
    badge: "ICFR & Tax Governance",
    iconName: "Coins",
    icon: Coins,
    tagline: "Synchronizing internal financial controls, transfer pricing, and statutory accounting with leading CA practices.",
    partnerCount: "22+ CA & Forensic Audit Practices",
    color: "indigo",
    accentColor: "#4f46e5",
    overview: "Our financial governance alliance encompasses top-tier Chartered Accounting networks, tax advisory practices, and forensic audit consultancies dedicated to fortifying Internal Financial Controls (IFC/ICFR).",
    detailedDescription: "Working alongside premier audit houses, GOVENICS unifies financial data lakes with rigorous statutory reconciliation. Together, we eliminate revenue leakages, streamline automated GST/TDS reconciliations, and prepare listed and unlisted enterprises for flawless statutory and internal audits.",
    allianceFocus: [
      "Internal Financial Controls (IFC) and SOX 404 testing automation",
      "Multi-state GST, direct tax, and transfer pricing audit workflows",
      "Forensic fraud risk assessments and treasury control frameworks",
      "Audit Committee reporting and financial integrity assurance"
    ],
    collaborativeDeliverables: [
      "Internal Financial Controls (IFC) Process Walkthrough & Risk Control Matrices (RCM)",
      "Automated GST & TDS Recoil & Credit Ledger Reconciliation Packs",
      "Continuous Fraud Risk & Segregation of Duties (SoD) Diagnostic Reports",
      "Joint Statutory Year-End Audit Readiness Dossiers"
    ],
    relevantRegulations: [
      "Companies Act Section 134(5)(e) & Section 143(3)(i) (IFC Mandates)",
      "ICAI Guidance Note on Internal Financial Controls",
      "Central Goods and Services Tax (CGST) Act & State Tax Norms",
      "Sarbanes-Oxley Act (SOX) Section 404"
    ],
    featuredAlliances: [
      {
        name: "BDO India LLP",
        type: "Statutory & Tax Practice",
        specialization: "Internal Financial Controls & Tax Governance",
        tier: "Global Strategic",
        badge: "Global Network",
        metric: "₹1,200 Cr+ Reconciled"
      },
      {
        name: "Grant Thornton Bharat",
        type: "Audit & Assurance Alliance",
        specialization: "IFC Walkthroughs & Forensic Reviews",
        tier: "Global Strategic",
        badge: "Forensics Leader",
        metric: "60+ Enterprise ICFR Engagements"
      },
      {
        name: "Walker Chandiok & Co LLP",
        type: "Financial Assurance Practice",
        specialization: "Financial Reporting Standards & Risk Controls",
        tier: "Premier Alliance",
        badge: "Assurance Practice",
        metric: "99.9% Reconciliation Accuracy"
      },
      {
        name: "Singhi & Co Chartered Accountants",
        type: "Internal Audit Practice",
        specialization: "Treasury Audits & Operational Tax Controls",
        tier: "Certified Practice",
        badge: "Tax Practice",
        metric: "35+ Industrial Plants Covered"
      }
    ],
    jointValuePropositions: [
      "Zero material audit qualifications across client balance sheets",
      "Pre-configured Risk Control Matrices tailored for 20+ industries",
      "Integrated automation between ERP ledgers and compliance checklists"
    ],
    stats: [
      { label: "CA Alliance Firms", value: "22+" },
      { label: "Controls Verified Annually", value: "15,000+" },
      { label: "Audit Timeline Reduction", value: "45%" }
    ]
  },
  {
    id: "labour-ehs",
    slug: "labour-ehs",
    name: "Labour & EHS Partners",
    shortTitle: "Labour & EHS",
    badge: "Occupational Safety & Labour",
    iconName: "HardHat",
    icon: HardHat,
    tagline: "Guaranteeing workplace safety, four labour codes alignment, and contractor compliance nationwide.",
    partnerCount: "25+ Labour Law & Safety Specialists",
    color: "amber",
    accentColor: "#d97706",
    overview: "Collaborating with national safety councils, authorized factory inspectors, and labour law practitioners to protect industrial workforces, eliminate statutory penalties, and manage third-party staffing compliance.",
    detailedDescription: "Labour law and occupational health & safety are frontline liabilities for industrial and operational giants. GOVENICS combines digitized contractor gate-pass tracking with field-level safety inspections and legal payroll audits executed by accredited regional labour experts.",
    allianceFocus: [
      "Four Labour Codes readiness (Wages, Social Security, IR, OSH)",
      "Contract Labour Regulation & Abolition (CLRA) audits and vendor screening",
      "Factory safety walkthroughs, hazard identification, and machine safeguarding",
      "POSH compliance, internal committee training, and annual statutory filings"
    ],
    collaborativeDeliverables: [
      "Contractor Labour Statutory Wage & Benefit Audit Scorecards",
      "Factory Act Form Registers & Return Filings (Forms 21, 22, 25)",
      "HazOp (Hazard and Operability) and Job Safety Analysis (JSA) Matrices",
      "Certified POSH Annual Report & Training Verification Dossier"
    ],
    relevantRegulations: [
      "Factories Act 1948 & State Factory Rules",
      "Occupational Safety, Health and Working Conditions Code 2020",
      "Code on Wages 2019 & Social Security Code 2020",
      "Contract Labour (Regulation and Abolition) Act 1970",
      "POSH Act 2013 (Prevention of Sexual Harassment)"
    ],
    featuredAlliances: [
      {
        name: "National Safety Council (NSC) Network",
        type: "Safety Audit Alliance",
        specialization: "Industrial Safety Audits & Plant HazOp",
        tier: "Accredited Body",
        badge: "Apex Safety Council",
        metric: "180+ Plant Inspections"
      },
      {
        name: "TeamLease Compliance Solutions",
        type: "Labour Law Advisory",
        specialization: "CLRA Vendor Audits & Multi-State Labour Filings",
        tier: "Global Strategic",
        badge: "Staffing GRC",
        metric: "50,000+ Contractor Audits"
      },
      {
        name: "ComplyKaro POSH Specialists",
        type: "Gender Safety Alliance",
        specialization: "POSH Committee Audits & Legal Inquiry Support",
        tier: "Premier Alliance",
        badge: "POSH Authority",
        metric: "120+ Corporate Rollouts"
      },
      {
        name: "British Safety Council India",
        type: "International Safety Partner",
        specialization: "5-Star Safety Audits & OSH Certification",
        tier: "Accredited Body",
        badge: "Global Standard",
        metric: "Zero Fatal Incident Records"
      }
    ],
    jointValuePropositions: [
      "Complete elimination of co-employment liabilities for principal employers",
      "Seamless multi-state statutory return management across 28 states",
      "Unified mobile and desktop incident reporting with live geo-tagging"
    ],
    stats: [
      { label: "Shopfloors Covered", value: "340+" },
      { label: "Contractor Audits/Mo", value: "8,500+" },
      { label: "Zero Penalty Record", value: "99.4%" }
    ]
  },
  {
    id: "environmental-compliance",
    slug: "environmental-compliance",
    name: "Environmental Compliance Partners",
    shortTitle: "Environmental Compliance",
    badge: "Pollution Control & EPR",
    iconName: "Leaf",
    icon: Leaf,
    tagline: "Connecting CPCB/SPCB accredited labs, hazardous waste handlers, and circular economy specialists.",
    partnerCount: "16+ Environmental Labs & Consultancies",
    color: "emerald",
    accentColor: "#059669",
    overview: "Partnering with state-accredited environmental monitoring laboratories, Extended Producer Responsibility (EPR) agencies, and clean-tech engineers to deliver verifiable pollution and waste compliance.",
    detailedDescription: "As environmental enforcement tightens under CPCB mandates and green tribunal directives, GOVENICS bridges industrial emissions telemetry with on-ground sampling and accredited consent renewals. We ensure real-time environmental transparency for heavy industries, manufacturing, and tech campuses.",
    allianceFocus: [
      "Consent to Establish (CTE) & Consent to Operate (CTO) application and renewal",
      "Continuous Emission Monitoring Systems (CEMS) & OCEMS data stream audits",
      "Extended Producer Responsibility (EPR) registration, target fulfillment & credit trade",
      "Hazardous waste manifest tracking and ground water / effluent testing"
    ],
    collaborativeDeliverables: [
      "SPCB Consent Compliance Register & Renewal Alert Pipeline",
      "Monthly Ambient Air, Stack Emission & Effluent Lab Test Reports",
      "Centralized EPR Credit Fulfilment Certificates (Plastic, Battery, E-Waste)",
      "Green Tribunal Statutory Readiness & Remediation Directives"
    ],
    relevantRegulations: [
      "Environment (Protection) Act 1986",
      "Water (Prevention & Control of Pollution) Act 1974",
      "Air (Prevention & Control of Pollution) Act 1981",
      "Plastic Waste Management Rules (Amended 2022)",
      "Battery Waste & E-Waste Management Rules 2022"
    ],
    featuredAlliances: [
      {
        name: "NEERI CSIR Network",
        type: "Environmental Research & Testing",
        specialization: "Industrial Effluent & Environmental Impact Assessments",
        tier: "Accredited Body",
        badge: "Apex Lab",
        metric: "NABL Accredited Testing"
      },
      {
        name: "GEM Enviro Management",
        type: "EPR Fulfilment Partner",
        specialization: "Plastic & E-Waste Credit Origination and Offsetting",
        tier: "Premier Alliance",
        badge: "EPR Leader",
        metric: "12,000+ MT Waste Offset"
      },
      {
        name: "Eco Services India Laboratories",
        type: "Industrial Testing Laboratory",
        specialization: "CEMS Calibration & Stack Emission Validation",
        tier: "Certified Practice",
        badge: "MoEFCC Recognized",
        metric: "24/7 OCEMS Live Sync"
      },
      {
        name: "Ramky Enviro Engineers",
        type: "Waste Management Infrastructure",
        specialization: "Hazardous & Biomedical Waste Disposal Alliances",
        tier: "Premier Alliance",
        badge: "Treatment Specialist",
        metric: "100% Manifest Validation"
      }
    ],
    jointValuePropositions: [
      "End-to-end NABL laboratory testing synchronized with digital registers",
      "Guaranteed EPR credit certificate authenticity registered on CPCB portals",
      "Automated warning triggers before emission or effluent threshold exceedances"
    ],
    stats: [
      { label: "Accredited Lab Partners", value: "16+" },
      { label: "CTO / CTE Renewals Handled", value: "320+" },
      { label: "Tons of EPR Offset", value: "25,000+" }
    ]
  },
  {
    id: "cybersecurity-privacy",
    slug: "cybersecurity-privacy",
    name: "Cybersecurity & Privacy Partners",
    shortTitle: "Cybersecurity & Privacy",
    badge: "CERT-In & DPDP Act 2023",
    iconName: "ShieldCheck",
    icon: ShieldCheck,
    tagline: "Architecting cyber resilience with CERT-In empaneled auditors, red team specialists, and DPDP privacy legal counsels.",
    partnerCount: "28+ Security & Privacy Leaders",
    color: "cyan",
    accentColor: "#0891b2",
    overview: "Our cybersecurity and data privacy alliance unifies CERT-In certified auditors, SOC operators, penetration testing specialists, and privacy engineers to meet strict Indian and international cyber mandates.",
    detailedDescription: "From the Digital Personal Data Protection (DPDP) Act 2023 to mandatory CERT-In 6-hour incident disclosures, GOVENICS pairs continuous security telemetry with specialized third-party red teams and certified Data Protection Officers (DPO).",
    allianceFocus: [
      "DPDP Act 2023 Data Protection Impact Assessments (DPIA) and consent workflows",
      "CERT-In empaneled VAPT (Vulnerability Assessment & Penetration Testing)",
      "Zero Trust posture evaluations and identity governance integrations",
      "Security Operations Center (SOC 24/7) telemetry monitoring and incident response"
    ],
    collaborativeDeliverables: [
      "CERT-In Empaneled Comprehensive VAPT Security Clearance Certificates",
      "DPDP Consent Architecture & Data Principal Rights Management Workflows",
      "6-Hour Incident Reporting Runbooks Aligned with Cyber Directions 2022",
      "ISO 27001:2022 & ISO 27701 Statement of Applicability (SoA) Toolkits"
    ],
    relevantRegulations: [
      "Digital Personal Data Protection Act 2023 (DPDP)",
      "CERT-In Cyber Security Directions (April 2022)",
      "Information Technology Act 2000 & IT (Amendment) Act 2008",
      "RBI Master Direction on Information Technology Governance & Security",
      "ISO/IEC 27001:2022 & ISO/IEC 27701:2019"
    ],
    featuredAlliances: [
      {
        name: "DSCI (Data Security Council of India)",
        type: "Apex Industry Body",
        specialization: "National Cyber Security & Privacy Standards",
        tier: "Global Strategic",
        badge: "Apex Authority",
        metric: "Industry Framework Partner"
      },
      {
        name: "Paladion / Atos Cyber Defense",
        type: "Managed Cyber Defense",
        specialization: "CERT-In Audits & Managed MDR Operations",
        tier: "Global Strategic",
        badge: "CERT-In Empaneled",
        metric: "6-Hour SLA Incident Response"
      },
      {
        name: "KPMG Cyber & Privacy Practice",
        type: "Security Consulting Alliance",
        specialization: "DPDP Readiness & Privacy Engineering",
        tier: "Premier Alliance",
        badge: "Big 4 Cyber Leader",
        metric: "40+ DPIAs Delivered"
      },
      {
        name: "Quick Heal Enterprise (Seqrite)",
        type: "Endpoint & Perimeter OEM",
        specialization: "Zero Trust Threat Intelligence & Endpoint Protection",
        tier: "Integration OEM",
        badge: "Cyber OEM",
        metric: "250K+ Nodes Monitored"
      }
    ],
    jointValuePropositions: [
      "Pre-tested DPDP Consent notice frameworks built into customer portals",
      "Fast-track CERT-In compliant VAPT audit certificates accepted by RBI and SEBI",
      "Automated logging pipelines meeting the mandatory 180-day log retention mandate"
    ],
    stats: [
      { label: "CERT-In Auditors Empaneled", value: "14" },
      { label: "VAPT Audits Executed", value: "520+" },
      { label: "Incident SLA Guarantee", value: "< 2 hr" }
    ]
  },
  {
    id: "enterprise-risk-grc",
    slug: "enterprise-risk-grc",
    name: "Enterprise Risk & GRC Partners",
    shortTitle: "Enterprise Risk & GRC",
    badge: "COSO, ISO 31000 & TPRM",
    iconName: "BarChart3",
    icon: BarChart3,
    tagline: "Collaborating with global risk advisory consultancies, BCDR practitioners, and third-party risk managers.",
    partnerCount: "20+ Enterprise Risk Consultancies",
    color: "purple",
    accentColor: "#9333ea",
    overview: "Connecting global risk advisory powerhouses, insurance brokers, and resilience strategists to design agile Enterprise Risk Management (ERM) and Third-Party Risk Management (TPRM) programs.",
    detailedDescription: "Uncertainty demands institutional resilience. GOVENICS works side by side with premier risk advisory firms to implement real-time Key Risk Indicators (KRIs), conduct comprehensive Business Impact Analyses (BIA), and structure corporate risk transfer policies.",
    allianceFocus: [
      "COSO ERM & ISO 31000 Enterprise Risk framework operationalization",
      "Third-Party Risk Management (TPRM) & global supply chain vulnerability scoring",
      "Business Continuity Management (BCM) and Disaster Recovery (DR) war-rooms",
      "Risk transfer optimization and D&O / Cyber insurance broking alignment"
    ],
    collaborativeDeliverables: [
      "Enterprise Key Risk Indicator (KRI) Heatmaps & Board Executive Packs",
      "Third-Party Vendor Risk Tiering & Contractual Compliance Audits",
      "ISO 22301 Business Continuity Plans & Incident Simulation Scripts",
      "Risk Quantification & Insurance Premium Optimization Memos"
    ],
    relevantRegulations: [
      "ISO 31000:2018 (Risk Management Guidelines)",
      "COSO Enterprise Risk Management Integrated Framework",
      "ISO 22301:2019 (Business Continuity Management)",
      "SEBI LODR Regulation 21 (Mandatory Risk Management Committee)"
    ],
    featuredAlliances: [
      {
        name: "Marsh McLennan India",
        type: "Risk Advisory & Broking",
        specialization: "Enterprise Risk Quantification & Transfer Strategies",
        tier: "Global Strategic",
        badge: "Global Risk Leader",
        metric: "₹4,500 Cr Risk Portfolio"
      },
      {
        name: "Aon Risk Solutions",
        type: "Resilience & Cyber Broking",
        specialization: "Cyber Risk Broking & Supply Chain Analytics",
        tier: "Global Strategic",
        badge: "Resilience Leader",
        metric: "15% Insurance Savings"
      },
      {
        name: "Protiviti Risk Advisory",
        type: "GRC Management Consulting",
        specialization: "TPRM Frameworks & Internal Audit Co-Sourcing",
        tier: "Premier Alliance",
        badge: "GRC Consultant",
        metric: "120+ ERM Deployments"
      },
      {
        name: "Willis Towers Watson (WTW)",
        type: "Human Capital & Financial Risk",
        specialization: "Director & Officer (D&O) Liability Analysis",
        tier: "Premier Alliance",
        badge: "Governance Specialist",
        metric: "Zero Uncovered Claims"
      }
    ],
    jointValuePropositions: [
      "Direct conversion of compliance risk data into reduced insurance premiums",
      "Real-time visibility into tier-1, tier-2, and tier-3 vendor compliance health",
      "Comprehensive Board Risk Management Committee briefing collateral"
    ],
    stats: [
      { label: "ERM Frameworks Deployed", value: "110+" },
      { label: "Vendors Screened", value: "35,000+" },
      { label: "Average Premium Reduction", value: "18%" }
    ]
  },
  {
    id: "esg-sustainability",
    slug: "esg-sustainability",
    name: "ESG & Sustainability Partners",
    shortTitle: "ESG & Sustainability",
    badge: "BRSR Core & Net-Zero",
    iconName: "Globe2",
    icon: Globe2,
    tagline: "Teaming up with carbon accountants, BRSR Core assurance providers, and green rating agencies.",
    partnerCount: "15+ Climate & ESG Specialists",
    color: "teal",
    accentColor: "#0d9488",
    overview: "Partnering with certified greenhouse gas (GHG) accounting firms, sustainability assurance providers, and circular economy consultants to drive credible, auditable ESG performance.",
    detailedDescription: "As SEBI mandates mandatory reasonable assurance for BRSR Core across top listed entities and global supply chains face EU CBAM scrutiny, GOVENICS pairs auditable data pipelines with premier climate assurance auditors and carbon registries.",
    allianceFocus: [
      "SEBI BRSR Core 9-attribute verification and reasonable assurance",
      "Scope 1, 2, and 3 GHG emissions calculation and supply chain decarbonization",
      "Double materiality assessments and CSRD / TCFD disclosure alignment",
      "Corporate CSR statutory audits under Section 135 and impact assessments"
    ],
    collaborativeDeliverables: [
      "SEBI Mandated BRSR & BRSR Core Independent Assurance Dossiers",
      "Scope 1, 2, and 3 Greenhouse Gas Inventory Verification Reports",
      "Materiality Matrix & Stakeholder Inclusiveness Assurance Memorandums",
      "CSR Project Impact Evaluation & Schedule VII Compliance Registers"
    ],
    relevantRegulations: [
      "SEBI Circular on BRSR Core & Assurance Mandates (July 2023)",
      "Companies Act 2013 Section 135 (Corporate Social Responsibility)",
      "GHG Protocol Corporate Accounting and Reporting Standard",
      "EU Carbon Border Adjustment Mechanism (CBAM) Directives",
      "TCFD & GRI Sustainability Reporting Standards"
    ],
    featuredAlliances: [
      {
        name: "Persefoni Carbon Software",
        type: "Climate Accounting OEM",
        specialization: "Enterprise Carbon Footprint & Scope 3 Accounting",
        tier: "Integration OEM",
        badge: "Carbon Tech",
        metric: "Automated GHG Telemetry"
      },
      {
        name: "TÜV Rheinland Sustainability",
        type: "Accredited ESG Assurance",
        specialization: "BRSR Core Reasonable Assurance & ISO 14064 GHG Verification",
        tier: "Accredited Body",
        badge: "Global Registrar",
        metric: "100% Assurance Acceptance"
      },
      {
        name: "EY Climate Change & Sustainability (CCaSS)",
        type: "ESG Strategy Advisory",
        specialization: "Double Materiality & Decarbonization Roadmaps",
        tier: "Global Strategic",
        badge: "Big 4 Leader",
        metric: "30+ Top 250 BRSR Filings"
      },
      {
        name: "Sphera Environmental Intelligence",
        type: "Life Cycle Assessment Alliance",
        specialization: "Product Environmental Footprints (LCA) & Scope 3",
        tier: "Premier Alliance",
        badge: "Product LCA",
        metric: "ISO 14040 Compliant"
      }
    ],
    jointValuePropositions: [
      "Audit-ready carbon footprints backed by third-party assurance bodies",
      "Automated extraction of utility bills and fuel logs for seamless BRSR reporting",
      "Protection against greenwashing claims through immutable data lineage"
    ],
    stats: [
      { label: "BRSR Reports Assured", value: "75+" },
      { label: "Tons CO2e Calculated", value: "4.2M" },
      { label: "CSR Funds Audited", value: "₹380 Cr" }
    ]
  },
  {
    id: "technology-platforms",
    slug: "technology-platforms",
    name: "Technology Platforms Partners",
    shortTitle: "Technology Platforms",
    badge: "Enterprise SaaS & ERP",
    iconName: "Cpu",
    icon: Cpu,
    tagline: "Integrating enterprise ERPs, cloud platforms, and workflow automation engines with GOVENICS GRC.",
    partnerCount: "30+ Enterprise Tech OEMs",
    color: "blue",
    accentColor: "#2563eb",
    overview: "Connecting leading enterprise software suites, cloud hyperscalers, and workflow automation providers to create seamless, automated compliance workflows directly within existing toolchains.",
    detailedDescription: "Compliance must live inside day-to-day enterprise operations. Through native API integrations and certified marketplace connectors, GOVENICS syncs with SAP, ServiceNow, Microsoft, Oracle, and Salesforce to continuously collect evidence, monitor controls, and orchestrate approvals.",
    allianceFocus: [
      "Bi-directional ERP statutory ledger and procurement compliance syncing",
      "ServiceNow GRC and ITSM incident management bi-directional webhooks",
      "Cloud Security Posture Management (CSPM) and Kubernetes compliance telemetry",
      "Continuous Control Monitoring (CCM) connectors for corporate finance and HRMS"
    ],
    collaborativeDeliverables: [
      "Certified ServiceNow & Jira GRC Workflow Marketplace Connectors",
      "SAP S/4HANA & Oracle ERP Vendor Statutory Compliance Gateways",
      "AWS & Azure Multi-Cloud Continuous Compliance Telemetry Collectors",
      "Automated Evidence Collection API Connectors for 80+ Enterprise Tools"
    ],
    relevantRegulations: [
      "SOC 1 / SOC 2 Type II Integrations",
      "ISO/IEC 27001 Cloud Control Matrix (CCM)",
      "OpenID Connect & OAuth 2.0 Identity Federation Standards",
      "RESTful API & Webhook Security Standards"
    ],
    featuredAlliances: [
      {
        name: "ServiceNow Alliance Partner",
        type: "Enterprise Workflow OEM",
        specialization: "Integrated Risk Management (IRM) & Incident Orchestration",
        tier: "Global Strategic",
        badge: "Enterprise IRM",
        metric: "Certified Store Integration"
      },
      {
        name: "MetricStream Platform Network",
        type: "GRC Software Alliance",
        specialization: "Continuous Controls Monitoring & Cyber GRC",
        tier: "Global Strategic",
        badge: "GRC OEM",
        metric: "Native API Telemetry"
      },
      {
        name: "Microsoft Cloud for Sustainability",
        type: "Cloud Hyperscaler",
        specialization: "Azure Security Center & M365 Compliance Center Sync",
        tier: "Global Strategic",
        badge: "Cloud Partner",
        metric: "99.99% Connector Uptime"
      },
      {
        name: "VComply Compliance Suite",
        type: "SaaS GRC OEM",
        specialization: "Operational Compliance & Delegation of Authority (DoA)",
        tier: "Premier Alliance",
        badge: "SaaS Alliance",
        metric: "1-Click Evidence Sync"
      }
    ],
    jointValuePropositions: [
      "Eliminate manual screenshot collection with automated API evidence ingestion",
      "Zero disruption to end users—tasks surfaced inside Slack, Teams, and Jira",
      "Real-time continuous control verification with automated audit trails"
    ],
    stats: [
      { label: "Pre-Built Connectors", value: "85+" },
      { label: "Daily Evidence Ingestion", value: "2.4M" },
      { label: "Setup Time Saved", value: "65%" }
    ]
  },
  {
    id: "networking-security",
    slug: "networking-security",
    name: "Networking & Security Partners",
    shortTitle: "Networking & Security",
    badge: "SASE, Zero Trust & MSSP",
    iconName: "Network",
    icon: Network,
    tagline: "Collaborating with next-gen perimeter leaders, SASE providers, and Managed Security Service Providers.",
    partnerCount: "19+ Network & Infrastructure Leaders",
    color: "rose",
    accentColor: "#e11d48",
    overview: "Teaming up with premier firewall OEMs, Secure Access Service Edge (SASE) architects, and tier-1 MSSPs to deliver verifiable network segmentation, continuous perimeter monitoring, and DDoS resilience.",
    detailedDescription: "Modern compliance mandates rigorous network segmentation, immutable firewall rule auditing, and end-to-end encryption. GOVENICS works directly with leading network security pioneers to ingest network telemetry, validate PCI-DSS perimeter controls, and automate network drift alerts.",
    allianceFocus: [
      "Zero Trust Network Access (ZTNA) policy audits and micro-segmentation testing",
      "Firewall rule-base hygiene, change-request tracking, and compliance validation",
      "SASE cloud security gateway integrations and remote workforce monitoring",
      "DDoS defense readiness, perimeter intrusion alerts, and telecom line redundancy"
    ],
    collaborativeDeliverables: [
      "Automated Firewall & Router Compliance Drift Verification Reports",
      "PCI-DSS v4.0 Network Segmentation & Penetration Test Attestations",
      "Zero Trust Architecture (NIST SP 800-207) Maturity Scorecards",
      "Managed Network Incident Runbooks & 24/7 SOC Escalation Integrations"
    ],
    relevantRegulations: [
      "PCI-DSS v4.0 (Requirement 1: Network Security Controls)",
      "NIST SP 800-207 (Zero Trust Architecture)",
      "CIS Benchmarks for Network Devices & Firewalls",
      "ISO/IEC 27033 (Information Technology — Network Security)"
    ],
    featuredAlliances: [
      {
        name: "Palo Alto Networks",
        type: "Next-Gen Security OEM",
        specialization: "Prisma SASE, Zero Trust & Strata Firewall Audits",
        tier: "Global Strategic",
        badge: "Firewall Leader",
        metric: "Automated Policy Verification"
      },
      {
        name: "Fortinet Security Fabric",
        type: "Network Security OEM",
        specialization: "FortiGate Rule Hygiene & OT/SCADA Security",
        tier: "Global Strategic",
        badge: "Fabric Partner",
        metric: "Sub-second Drift Alerting"
      },
      {
        name: "Cisco Systems India",
        type: "Enterprise Networking OEM",
        specialization: "Cisco ISE Identity Segmentation & SD-WAN Compliance",
        tier: "Premier Alliance",
        badge: "Network Pioneer",
        metric: "100+ Enterprise Deployments"
      },
      {
        name: "Tata Communications Managed Security",
        type: "Tier-1 MSSP & Telecom",
        specialization: "Global SASE, Managed SOC & DDoS Shield Telemetry",
        tier: "Global Strategic",
        badge: "Telecom MSSP",
        metric: "99.999% Network Availability"
      }
    ],
    jointValuePropositions: [
      "Instant audit readiness for payment card and banking network inspections",
      "Continuous verification of network rule changes against enterprise security policies",
      "Direct integration between network alerts and GRC risk registers"
    ],
    stats: [
      { label: "Firewalls Monitored", value: "1,200+" },
      { label: "Network Drift Detection", value: "< 15 min" },
      { label: "PCI-DSS Network Passes", value: "100%" }
    ]
  },
  {
    id: "audit-certification-bodies",
    slug: "audit-certification-bodies",
    name: "Audit & Certification Bodies",
    shortTitle: "Audit & Certification Bodies",
    badge: "Accredited Registrars",
    iconName: "Award",
    icon: Award,
    tagline: "Partnering with accredited global registrars, ISO conformity bodies, and SOC 2 assessment agencies.",
    partnerCount: "12+ Accredited Registrars",
    color: "violet",
    accentColor: "#7c3aed",
    overview: "Allied with globally accredited conformity assessment bodies, NABCB/ANAB registrars, and independent auditing authorities to deliver expedited, frictionless ISO and SOC 2 certifications.",
    detailedDescription: "Achieving and maintaining ISO and SOC 2 certifications should not be a scramble of disconnected spreadsheets. GOVENICS collaborates directly with accredited registrars to standardize audit evidence dossiers, conduct structured pre-assessments, and resolve Non-Conformities (NCs) 40% faster.",
    allianceFocus: [
      "Streamlined Stage 1 and Stage 2 ISO certification audits",
      "SOC 2 Type I and Type II independent assessment readiness",
      "Automated evidence repository provisioning for external auditors",
      "Surveillance audit tracking and continuous certification renewal"
    ],
    collaborativeDeliverables: [
      "Auditor-Ready ISO 9001, 14001, 45001, 27001 Integrated Evidence Packs",
      "SOC 2 Type II System Description & Control Activity Mapping Dossiers",
      "Pre-Audit Mock Gap Analysis with Remediation Action Plans (CAPA)",
      "Digital Verified Certificate Issuance & Public Directory Badges"
    ],
    relevantRegulations: [
      "ISO/IEC 27001:2022 (Information Security Management)",
      "ISO 9001:2015 (Quality) & ISO 14001:2015 (Environmental)",
      "ISO 45001:2018 (Occupational Health and Safety)",
      "AICPA SSAE 18 (SOC 1, SOC 2 Type II Frameworks)",
      "ISO 22301:2019 (Business Continuity Management)"
    ],
    featuredAlliances: [
      {
        name: "Bureau Veritas (BV) India",
        type: "Accredited Global Registrar",
        specialization: "ISO 9001, 14001, 45001 & Integrated Management Audits",
        tier: "Accredited Body",
        badge: "Global Registrar",
        metric: "40% Faster Certification"
      },
      {
        name: "SGS India Certification Services",
        type: "Accredited Testing & Certification",
        specialization: "Supply Chain Audits & Sustainability Verification",
        tier: "Accredited Body",
        badge: "Accredited Registrar",
        metric: "150+ Enterprise Clients"
      },
      {
        name: "DNV Business Assurance",
        type: "Conformity Assessment Body",
        specialization: "ISO 27001, ISO 22301 & Cyber Maturity Assessments",
        tier: "Accredited Body",
        badge: "Accredited Registrar",
        metric: "Global Accreditation"
      },
      {
        name: "TÜV SÜD South Asia",
        type: "Technical Testing & Certification",
        specialization: "Automotive, Industrial & Data Security Audits",
        tier: "Accredited Body",
        badge: "Accredited Registrar",
        metric: "Zero Stage-2 Delays"
      },
      {
        name: "BSI (British Standards Institution)",
        type: "Royal Charter Standards Body",
        specialization: "ISO 27701 Privacy & ISO 37001 Anti-Bribery Standards",
        tier: "Accredited Body",
        badge: "Charter Body",
        metric: "Global Standard Setting"
      }
    ],
    jointValuePropositions: [
      "Unified audit dashboard accessible directly by external certification auditors",
      "40% reduction in external audit cycles through standardized evidence templates",
      "Proactive automated alerts 90 days prior to annual surveillance audit deadlines"
    ],
    stats: [
      { label: "Registrar Alliances", value: "12+" },
      { label: "Successful Certifications", value: "850+" },
      { label: "First-Time Pass Rate", value: "98.7%" }
    ]
  }
];

export const partnerEcosystemStats = [
  { label: "Total Active Partners", value: "120+", prefix: "", suffix: "" },
  { label: "Specialized Domains", value: "10", prefix: "", suffix: " Categories" },
  { label: "Global Coverage", value: "40+", prefix: "", suffix: " Countries" },
  { label: "Audit Clearance Rate", value: "99.2", prefix: "", suffix: "%" },
  { label: "Enterprise Engagements", value: "450+", prefix: "", suffix: "" },
  { label: "Fast-track Onboarding", value: "72", prefix: "", suffix: " Hours" }
];

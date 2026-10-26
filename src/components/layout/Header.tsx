import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ArrowRight, ShieldCheck, ChevronDown, Search,
  Scale, Building, Factory, Users, ShieldAlert, UserPlus, FileSpreadsheet, Leaf,
  Heart, Coins,
  User, LogOut, Zap, Briefcase,
  Shield, Lock, Laptop, TreePine, Droplet, Activity, Cloud
} from "lucide-react";
import { whomWeServeClusters } from "@/data/whom-we-serve-data";
import { useAuth } from "@/context/AuthContext";

const offeringsVerticalTabsData: Record<string, {
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    keyDetails: string[];
    link: string;
    icon: any;
  }[];
}> = {
  "compliance": {
    title: "COMPLIANCE SERVICES",
    items: [
      {
        id: "regulatory-compliance",
        title: "Regulatory Compliance",
        description: "End-to-end statutory compliance tracking and advisory across regulators like RBI, SEBI, TRAI, and CPCB — keeping your enterprise perpetually audit-ready.",
        keyDetails: [
          "100% Audit Readiness|Always inspection-ready across all agencies.|Continuous monitoring of gazette amendments & circulars|Automated compliance calendars and deadline alerts|Board-level compliance dashboards updated in real time",
          "Automated Registers|Eliminate manual paperwork with smart registers.|Auto-generation of compliance evidence packages|Tamper-proof digital records for regulatory defence|Instant retrieval during surprise inspections",
          "Penalty Prevention|Zero tolerance for statutory lapses.|Zero-lag alerts for upcoming filing deadlines|Escalation workflows triggered before due dates|Dedicated compliance helpdesk for query resolution"
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldCheck
      },
      {
        id: "labour-law",
        title: "Labour & Employment",
        description: "Comprehensive adherence to PF, ESI, Minimum Wages, Contract Labour, and Factory Acts across all Indian states — shielding you from enforcement actions.",
        keyDetails: [
          "State-specific Adherence|Complete coverage across all 28 states & UTs.|Monthly statutory register maintenance per state|State-wise wage revision tracking and updates|Multi-location principal employer compliance mapping",
          "Contractor Audits|Rigorous third-party payroll verification.|Monthly wage audit of all contractor employees|Principal employer liability shield documentation|Subcontractor due diligence and onboarding checks",
          "Inspection Support|Expert representation when inspectors arrive.|Dedicated labour law attorneys during inspections|Pre-inspection mock drills and evidence organisation|Settlement and conciliation management support"
        ],
        link: "/services/labour-law-compliance",
        icon: Users
      },
      {
        id: "taxation-trade",
        title: "Taxation & Trade",
        description: "Direct and indirect tax advisory, transfer pricing, SEZ compliance, and customs management — preventing costly disputes before they arise.",
        keyDetails: [
          "GST & TDS Management|Seamless monthly and annual statutory filings.|End-to-end GST reconciliation and ITC optimisation|TDS deduction, challan and return filing support|GST audit readiness and departmental notice handling",
          "Customs & SEZ|Full compliance with export-import regulations.|Customs classification, valuation and duty advisory|SEZ unit compliance with DGFT and RBI guidelines|Foreign Trade Policy (FTP) benefits advisory",
          "Transfer Pricing|Arm's length pricing studies and documentation.|Annual TP documentation and benchmarking studies|Advance Pricing Agreement (APA) support|Country-by-Country Reporting (CbCR) compliance"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Building
      },
      {
        id: "environmental-ehs",
        title: "Environmental & EHS",
        description: "Statutory adherence to Pollution Control Boards, MoEFCC, waste management rules, and factory safety laws — keeping your operations legally clean and safe.",
        keyDetails: [
          "Consent Management|Timely CTE and CTO renewals without delays.|Air, Water & Hazardous Waste consent renewals|Form-IV, Form-V, and CPCB online portal filing|Status tracking and liaison with State PCBs",
          "Safety Audits|Comprehensive factory and fire safety inspections.|Statutory safety committee formation and meetings|Factory Inspector mock audit preparation|Occupational health surveillance and MSDS management",
          "Waste Returns|Accurate and timely hazardous & e-waste filings.|Hazardous Waste Annual Return (Form-4) filing|E-waste Producer Responsibility (PRO) compliance|Biomedical and plastic waste manifest management"
        ],
        link: "/services/environmental-ehs",
        icon: Leaf
      },
      {
        id: "supply-chain-compliance",
        title: "Supply Chain Compliance",
        description: "Auditing and securing statutory compliance across your entire vendor, contractor, and distributor network — eliminating downstream liability transfer risks.",
        keyDetails: [
          "Vendor Verification|Rigorous pre-onboarding compliance checks.|GST, PF, ESI and labour law registration validation|Vendor risk scoring and tiered classification|Ongoing statutory health monitoring of all vendors",
          "Principal Employer Protection|Shield your organisation from contractor defaults.|Co-employment liability prevention frameworks|Contract Labour Act principal employer safeguards|Vendor indemnity clause and insurance advisory",
          "Logistics Laws|Full adherence to transport and warehousing rules.|Waybill, e-way bill and consignment compliance|Warehouse licensing under WDRA and FSSAI|Dangerous Goods (ADR/IMDG) transportation compliance"
        ],
        link: "/services/supply-chain-compliance",
        icon: Factory
      }
    ]
  },
  "risk": {
    title: "RISK MANAGEMENT",
    items: [
      {
        id: "enterprise-risk",
        title: "Enterprise Risk (ERM)",
        description: "Deploy integrated ERM frameworks linking operational telemetry with risk thresholds — giving leadership a live, prioritised view of enterprise exposure.",
        keyDetails: [
          "Predictive Indicators|Real-time KRI dashboards for boards and CXOs.|Heat-mapped risk registers with velocity scoring|Live KRI threshold breach notifications|Quarterly trend analysis and emerging risk briefings",
          "Standardised Taxonomy|Unified risk language across every department.|ISO 31000-aligned risk categorisation structure|Cross-functional risk ownership and accountability maps|Risk appetite statement drafting and board adoption",
          "Contingency Mapping|Pre-mapped SOPs for swift, structured mitigation.|Crisis response playbooks for top-tier risks|Business Continuity Plan (BCP) design and testing|Post-incident lessons-learned integration loops"
        ],
        link: "/services/enterprise-risk-management",
        icon: ShieldAlert
      },
      {
        id: "internal-audit",
        title: "Internal Audit",
        description: "Compliance-integrated internal audit engine validating physical controls and process logic — transitioning from reactive to continuous assurance.",
        keyDetails: [
          "Continuous Cycles|Shift from annual snapshots to always-on auditing.|Risk-based rolling audit plan design and execution|Process-level control effectiveness assessments|Quarterly thematic audits on priority risk areas",
          "Gap Discovery|Proactively surface issues before regulators do.|Root-cause analysis and systemic deficiency mapping|Control environment maturity benchmarking|Management letter and Board Audit Committee reporting",
          "Action Tracking|Close every finding with accountability dashboards.|Online issue tracker with owner and due-date fields|Escalation matrix for overdue action items|Follow-up audit verification of remediation quality"
        ],
        link: "/services/internal-audit",
        icon: FileSpreadsheet
      },
      {
        id: "vendor-risk",
        title: "Vendor Risk",
        description: "Ongoing third-party due diligence and security questionnaire audits — ensuring your supply chain never becomes your compliance liability.",
        keyDetails: [
          "Supply Chain Transparency|End-to-end visibility across all vendor tiers.|Tier-1, Tier-2 and Tier-3 vendor risk mapping|Contractual SLA monitoring and exception reporting|Fourth-party risk exposure identification",
          "Health Scores|Automated, dynamic vendor risk profiling.|Risk scoring based on financial, legal and cyber data|Continuous monitoring for negative news and litigation|Supplier diversity and ESG risk integration",
          "Downstream Protection|Prevent exploits originating from vendor access.|Vendor access privilege reviews and least-privilege policy|Vendor IT security questionnaire and VAPT requirements|Third-party breach notification protocol setup"
        ],
        link: "/services/vendor-risk-management",
        icon: Building
      },
      {
        id: "financial-risk",
        title: "Financial Risk Advisory",
        description: "Comprehensive assessment of credit, market, and liquidity risks — protecting capital structures and ensuring regulatory capital adequacy.",
        keyDetails: [
          "Stress Testing|Robust scenario modelling against market volatility.|Macroeconomic shock scenario design and simulation|Portfolio concentration and sector exposure analysis|Reverse stress testing and recovery planning",
          "Credit Profiling|Advanced counterparty risk modelling and limits.|Credit scoring model design and validation|Early-warning indicator (EWI) framework build-out|Regulatory credit risk reporting (RBI, Basel III norms)",
          "Capital Adequacy|Ensure Basel III/IV and RBI capital compliance.|CRAR computation and regulatory capital optimisation|Internal Capital Adequacy Assessment Process (ICAAP)|Pillar 2 and Pillar 3 disclosure framework support"
        ],
        link: "/services/financial-risk",
        icon: Coins
      },
      {
        id: "operational-risk",
        title: "Operational Resilience",
        description: "Identifying vulnerabilities in daily processes and building robust BCPs — ensuring your operations survive disruptions without breaching regulatory obligations.",
        keyDetails: [
          "Process Mapping|Identify and eliminate single points of failure.|End-to-end process flow mapping and FMEA analysis|Critical function and dependency identification|Control gap remediation with ownership assignment",
          "BCP Drills|Validate your recovery plans under real pressure.|Tabletop simulation and full-scale BCP exercises|Crisis communication protocol testing|Post-drill debrief and improvement cycle integration",
          "Loss Data Analysis|Learn from every failure to prevent recurrence.|Operational loss event capture and classification|Root-cause trend analysis and heat-mapping|Regulatory loss data reporting (RBI ORX framework)"
        ],
        link: "/services/operational-risk",
        icon: Activity
      }
    ]
  },
  "governance": {
    title: "GOVERNANCE",
    items: [
      {
        id: "corporate-governance",
        title: "Corporate Governance",
        description: "Robust governance charters and operational workflows that ensure board accountability, statutory compliance, and institutional investor confidence.",
        keyDetails: [
          "Board Committees|Properly structured audit, risk, and CSR committees.|Composition advisory per SEBI LODR and Companies Act|Terms of Reference (ToR) drafting for each committee|Committee performance evaluation and gap assessment",
          "DoA Matrices|Standardised, board-approved delegation of authority.|Authority matrix design across management layers|Policy-embedded approval thresholds and escalation paths|Periodic DoA review and update protocols",
          "Conflict Prevention|Robust policy framework to prevent governance failures.|Related-party transaction policy and register maintenance|Board-level conflict-of-interest disclosure system|Whistleblower and vigil mechanism policy setup"
        ],
        link: "/services/governance-framework",
        icon: Building
      },
      {
        id: "hr-policy-governance",
        title: "HR Policy & Governance",
        description: "Workplace compliance, PoSH framework, diversity mandates, and employment policy governance — building a legally defensible workplace culture.",
        keyDetails: [
          "PoSH Adherence|Full Internal Complaints Committee (ICC) setup and training.|ICC constitution, training and annual report filing|POSH awareness workshops for employees and managers|Mock inquiry simulation and case management support",
          "Diversity & Inclusion|Benchmarking against global and Indian D&I standards.|Equal opportunity policy drafting and implementation|Pay equity audit and gender pay gap analysis|Diversity reporting for ESG / BRSR disclosures",
          "Policy Handbooks|Comprehensive, legally vetted employee code of conduct.|Employee handbook drafting — onboarding to exit|HR policy gap analysis against statutory requirements|Regular policy refresh aligned with labour law updates"
        ],
        link: "/services/hr-policy-governance",
        icon: Users
      },
      {
        id: "it-governance",
        title: "IT Governance",
        description: "Aligning IT strategy with business objectives using COBIT and ITIL frameworks — ensuring technology investments deliver value within a controlled environment.",
        keyDetails: [
          "Framework Alignment|Adherence to COBIT 2019 and ITIL v4 standards.|Current-state IT governance maturity assessment|Target-state roadmap and control framework design|COBIT/ITIL gap remediation with prioritised action plan",
          "Resource Optimisation|Maximise value from software, hardware, and data assets.|IT asset lifecycle audit and right-sizing advisory|Shadow IT identification and policy enforcement|Software licence compliance and cost optimisation",
          "Strategic Steering|Board-level IT investment and risk advisory.|IT strategy review aligned to business objectives|Technology risk register and board briefing packs|Digital transformation governance and oversight model"
        ],
        link: "/services/it-governance",
        icon: Laptop
      },
      {
        id: "board-advisory",
        title: "Board Advisory Services",
        description: "Expert counsel for independent directors and board committees — navigating fiduciary duties, SEBI mandates, and evolving corporate governance standards.",
        keyDetails: [
          "Regulatory Briefings|Timely updates on governance law amendments.|Monthly board regulatory update newsletters|SEBI LODR and Companies Act amendment impact analysis|Director induction and onboarding programme design",
          "Performance Evaluation|Rigorous board and committee effectiveness reviews.|Board skills-gap matrix design and assessment|Individual director evaluation and feedback framework|Peer review and board performance improvement plan",
          "Ethics Charters|Zero-tolerance anti-bribery and anti-corruption policy.|ABAC policy and Code of Ethics drafting|Gifts & hospitality register and approval workflow|Ethics training and e-learning module development"
        ],
        link: "/services/board-advisory",
        icon: Scale
      }
    ]
  },
  "staffing": {
    title: "STAFFING SERVICES",
    items: [
      {
        id: "healthcare-manpower",
        title: "Healthcare Staffing",
        description: "Specialized staffing solutions for hospitals, clinics, and allied healthcare facilities.",
        keyDetails: [
          "Certified Professionals: Verified credentials for doctors and nurses.",
          "Allied Health: Technicians and support staff.",
          "Rapid Deployment: Immediate availability for critical care needs."
        ],
        link: "/staffing/healthcare-manpower",
        icon: Heart
      },
      {
        id: "manufacturing-manpower",
        title: "Manufacturing",
        description: "Reliable workforce for assembly lines, machine operation, and quality control.",
        keyDetails: [
          "Skilled Operators: Trained personnel for complex machinery.",
          "Production Efficiency: Scalable workforce to meet production targets.",
          "Safety First: Strict adherence to industrial safety protocols."
        ],
        link: "/staffing/manufacturing",
        icon: Factory
      },
      {
        id: "facility-management",
        title: "Facility Management",
        description: "Comprehensive facility upkeep, maintenance, and administrative support services.",
        keyDetails: [
          "Integrated Services: End-to-end management of building operations.",
          "Technical Maintenance: HVAC, electrical, and plumbing experts.",
          "24/7 Support: Round-the-clock facility monitoring and upkeep."
        ],
        link: "/staffing/facility-management",
        icon: Building
      },
      {
        id: "housekeeping-it",
        title: "IT & Campus Housekeeping",
        description: "Premium housekeeping and deep cleaning services tailored for corporate parks and IT campuses.",
        keyDetails: [
          "Corporate Standards: Specialized training for premium environments.",
          "Eco-Friendly Cleaning: Use of sustainable materials.",
          "Discreet Operations: Minimal disruption to corporate workflows."
        ],
        link: "/staffing/housekeeping-it",
        icon: Droplet
      },
      {
        id: "white-collar",
        title: "White Collar Staffing",
        description: "Targeted recruitment for corporate executives, IT professionals, managers, and specialized knowledge workers.",
        keyDetails: [
          "Specialized Talent: Access to pre-vetted domain experts.",
          "Cultural Alignment: Rigorous behavioral and leadership matching.",
          "Rapid Placement: Fill critical knowledge-worker roles swiftly."
        ],
        link: "/staffing/white-collar-staffing",
        icon: User
      },
      {
        id: "grey-collar",
        title: "Grey Collar Staffing",
        description: "Deployment of qualified technicians, supervisors, and specialized skilled workers balancing technical and manual skills.",
        keyDetails: [
          "Certified Technicians: Verified credentials for specialized trades.",
          "Supervisory Roles: Experienced floor and project managers.",
          "Agile Deployment: Ready-to-deploy talent for immediate needs."
        ],
        link: "/staffing/grey-collar-staffing",
        icon: Users
      },
      {
        id: "blue-collar",
        title: "Blue Collar Staffing",
        description: "Reliable workforce for factory operations, logistics, warehousing, and essential operational support.",
        keyDetails: [
          "Mass Recruitment: Scalable hiring for peak seasonal demands.",
          "Compliance Guaranteed: 100% adherence to all statutory labor laws.",
          "Turnkey Management: We handle payroll, ESI, and PF administration."
        ],
        link: "/staffing/blue-collar-staffing",
        icon: Factory
      },
      {
        id: "executive-search",
        title: "Executive Search & Leadership",
        description: "Targeted recruitment for C-suite executives, directors, and critical senior management positions.",
        keyDetails: [
          "Confidential Search: Discreet headhunting for top-level roles.",
          "Industry Experts: Deep networks in manufacturing, IT, and BFSI.",
          "Cultural Fit: Rigorous behavioral and leadership assessments."
        ],
        link: "/staffing/executive-search",
        icon: Briefcase
      },
      {
        id: "contract-staffing",
        title: "Contract & Temp Staffing",
        description: "Flexible, on-demand workforce solutions to manage seasonal peaks and specialized projects.",
        keyDetails: [
          "Agile Scaling: Quickly scale up or down based on business cycles.",
          "Compliance Handled: 100% adherence to all statutory labor laws.",
          "Reduced Liability: We manage payroll, benefits, and administration."
        ],
        link: "/staffing/contract-staffing",
        icon: UserPlus
      },
      {
        id: "sla-managed",
        title: "SLA Based Managed Services",
        description: "We assume end-to-end operational accountability for your compliance posture under strict SLAs.",
        keyDetails: [
          "99% Assurance Level: Guaranteed response times and targets.",
          "Always-On Overwatch: Surveillance of critical controls.",
          "Routine Status Audits: Scheduled weekly and monthly assessments."
        ],
        link: "/staffing/sla-managed",
        icon: ShieldCheck
      },
      {
        id: "payroll-management",
        title: "Payroll & Benefits Management",
        description: "End-to-end payroll processing, tax calculations, and employee benefits administration.",
        keyDetails: [
          "Error-Free Processing: Automated and highly accurate payroll cycles.",
          "Statutory Deductions: PF, ESI, PT, and TDS seamlessly handled.",
          "Employee Self-Service: Dedicated portals for pay slips and tax."
        ],
        link: "/staffing/payroll-management",
        icon: Coins
      }
    ]
  },
  "cybersecurity": {
    title: "CYBERSECURITY",
    items: [
      {
        id: "isms-iso27001",
        title: "ISMS & ISO 27001",
        description: "Build and certify bespoke Information Security Management Systems to ISO 27001 and SOC 2 standards — protecting critical assets and earning stakeholder trust.",
        keyDetails: [
          "Certification Readiness|Full-cycle support from gap analysis to certificate issuance.|ISO 27001 Stage 1 & Stage 2 audit preparation|Corrective Action Plan (CAP) management and closure|Surveillance audit and recertification support",
          "Active Threat Tracking|Continuous risk identification across your entire network.|Information asset register build and classification|Continuous vulnerability monitoring and SIEM integration|Threat intelligence feed integration and alert triage",
          "Policy Framework|Robust, legally defensible security policy suite.|Information security policy library (40+ policies)|Acceptable use, BYOD and remote access policy design|Security awareness training programme development"
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Zap
      },
      {
        id: "incident-response",
        title: "Incident Response",
        description: "6-hour CERT-In compliant response plans, digital forensics, and live crisis simulation drills — so you're always ready for the worst.",
        keyDetails: [
          "Emergency Compliance|Meet strict 6-hour CERT-In reporting timelines.|Incident response plan (IRP) design and documentation|24/7 security operations centre (SOC) liaison support|Regulatory notification drafting and submission",
          "Rapid Isolation|Immediate threat containment and environment clean-up.|Playbook-driven containment for 15+ attack vectors|Malware eradication and system hardening post-breach|Network segmentation and lateral movement prevention",
          "Forensic Analysis|Deep-dive digital investigation and evidence preservation.|Chain-of-custody compliant forensic evidence collection|Root-cause analysis and attack timeline reconstruction|Court-admissible forensic reports for legal proceedings"
        ],
        link: "/services/incident-response",
        icon: ShieldAlert
      },
      {
        id: "vapt-testing",
        title: "VAPT & Penetration Testing",
        description: "Simulated ethical hacking across web, mobile, API, and network layers — finding vulnerabilities before malicious actors do.",
        keyDetails: [
          "Web & App Security|Comprehensive testing of all customer-facing applications.|OWASP Top-10 and Business Logic vulnerability testing|Mobile app (iOS/Android) and API security assessment|Source code review and secure SDLC advisory",
          "Network Scans|Expose every weak point in your internal infrastructure.|External and internal network penetration testing|Wireless security assessment and rogue AP detection|Active Directory and privilege escalation path testing",
          "Remediation Support|Step-by-step expert guidance to close every vulnerability.|CVSS-scored finding report with prioritised fix list|Developer-facing remediation advisory sessions|Post-fix re-testing and verified closure certification"
        ],
        link: "/services/vapt-testing",
        icon: Shield
      },
      {
        id: "cloud-security",
        title: "Cloud & Infrastructure Security",
        description: "Securing AWS, Azure, and GCP environments against misconfigurations, unauthorised access, and data exfiltration at scale.",
        keyDetails: [
          "Configuration Audits|Detect and fix dangerous cloud misconfigurations.|CIS Benchmark-based cloud configuration assessment|S3/Blob/GCS storage exposure and access audit|Infrastructure-as-Code (IaC) security scan integration",
          "Access Management|Enforce strict IAM and Zero Trust across all cloud layers.|Privileged Access Management (PAM) framework design|Identity federation, MFA enforcement and SSO security|Just-In-Time (JIT) access provisioning model build-out",
          "Continuous Monitoring|24/7 cloud threat detection and automated response.|CSPM tool deployment and alert tuning|Cloud-native SIEM integration (CloudTrail, Azure Monitor)|Automated drift detection and policy enforcement"
        ],
        link: "/services/cloud-security",
        icon: Cloud
      },
      {
        id: "data-privacy",
        title: "Data Privacy & DPDP",
        description: "Comprehensive audits and consent architecture to align with India's DPDP Act, GDPR, and sector-specific data protection mandates.",
        keyDetails: [
          "Consent Architecture|Secure, verifiable, and revocable user consent flows.|Consent Manager platform evaluation and deployment|Granular consent capture for each data processing purpose|Consent withdrawal and data deletion workflow design",
          "Data Mapping|Complete personal data lifecycle discovery and tracking.|Data inventory and record of processing activities (RoPA)|Cross-border data transfer assessment and adequacy checks|Data minimisation and retention policy enforcement",
          "Breach Readiness|72-hour breach response plans for DPDP Act compliance.|Data breach detection, investigation and notification SOP|Regulator notification template library by jurisdiction|Privacy impact assessment (PIA/DPIA) framework setup"
        ],
        link: "/services/data-privacy",
        icon: Lock
      }
    ]
  },
  "esg": {
    title: "ESG & SUSTAINABILITY",
    items: [
      {
        id: "esg-reporting",
        title: "ESG Reporting & BRSR",
        description: "Automate environmental, social, and governance reporting to SEBI BRSR, GRI, and TCFD frameworks — turning data into investor-grade disclosures.",
        keyDetails: [
          "BRSR Alignment|Full compliance with SEBI Business Responsibility & Sustainability Reporting.|Principle-wise BRSR data gap assessment and remediation|Material topic identification via stakeholder engagement|Third-party assurance readiness and pre-audit support",
          "Carbon Tracking|Automated GHG footprint calculation and offset planning.|Scope 1, 2 & 3 GHG inventory build to GHG Protocol|Science-Based Targets (SBTi) commitment and validation|Carbon offset project evaluation and credit procurement",
          "Audit-Proof Filings|Reliable, defensible sustainability disclosures every year.|Data assurance framework aligned to ISAE 3000 standard|ESG KPI data governance and controls documentation|Annual ESG report design, narrative writing and filing"
        ],
        link: "/services/esg-sustainability",
        icon: Leaf
      },
      {
        id: "carbon-footprint",
        title: "Carbon Footprint & Net Zero",
        description: "Scope 1, 2, and 3 emissions mapping with actionable reduction roadmaps — moving your organisation towards verified net-zero commitments.",
        keyDetails: [
          "GHG Accounting|Precise, audit-ready greenhouse gas emissions quantification.|Activity-based and spend-based Scope 3 emission calculation|GHG inventory quality assurance and peer review|Third-party verification readiness for carbon certificates",
          "Reduction Strategies|Actionable, cost-ranked decarbonisation roadmaps.|Energy efficiency improvement and renewable energy transition|Circular economy integration and waste-to-value strategies|Fleet electrification and commuting emission reduction plans",
          "Offset Advisory|Strategic guidance on credible carbon credit markets.|VCS, Gold Standard and CDM offset project evaluation|Internal carbon pricing mechanism design and rollout|Carbon credit portfolio management and retirement tracking"
        ],
        link: "/services/carbon-footprint",
        icon: TreePine
      },
      {
        id: "green-audits",
        title: "Green & Energy Audits",
        description: "Comprehensive assessments of facility energy, water, and waste — uncovering cost savings while meeting environmental statutory obligations.",
        keyDetails: [
          "Energy Efficiency|Identify high-impact opportunities to cut power costs.|ISO 50001 energy management system implementation|Electrical load audit and power factor improvement advisory|Renewable energy feasibility and rooftop solar advisory",
          "Water Stewardship|Zero Liquid Discharge (ZLD) and water recycling planning.|Water footprint assessment and reduction planning|Effluent Treatment Plant (ETP) performance audit|Rainwater harvesting and groundwater compliance advisory",
          "Waste Valuation|Transform waste streams into circular economy revenue.|Waste stream characterisation and material flow analysis|Extended Producer Responsibility (EPR) target planning|Recycler empanelment and waste traceability system setup"
        ],
        link: "/services/green-audits",
        icon: Droplet
      },
      {
        id: "csr-management",
        title: "CSR Strategy & Implementation",
        description: "Designing impactful, legally compliant CSR programmes that align with Schedule VII, Companies Act rules, and your brand's sustainability purpose.",
        keyDetails: [
          "Project Vetting|Rigorous due diligence on NGO partners and CSR initiatives.|Implementing agency legal and financial due diligence|Project alignment with Schedule VII and CSR rules 2021|CSR budget allocation strategy and utilisation planning",
          "Impact Assessment|Third-party outcome measurement and beneficiary audits.|Theory of change and logical framework (logframe) design|Beneficiary surveys and social return on investment (SROI)|Annual CSR impact report aligned to GRI 413 standard",
          "Statutory Reporting|Full Companies Act CSR compliance and MCA filing support.|CSR-1 e-form filing and CSRBOX portal management|Board CSR Committee meeting support and minutes drafting|Unspent CSR fund transfer compliance (Sections 135/80G)"
        ],
        link: "/services/csr-management",
        icon: Heart
      }
    ]
  }
};

// ─── Manpower Sectors Data ───────────────────────────────────────────────────
const manpowerSectorsData = [
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Trained workforce solutions for hospitals, clinics, diagnostic centers, and healthcare campuses — backed by NABH/JCI protocol training and 100% statutory compliance.",
    services: [
      "Hospital Housekeeping",
      "Infection Control",
      "Patient Transport",
      "Biomedical Waste Mgmt",
      "Facility Maintenance",
      "Security Services",
      "Front Office Support",
    ],
    coverage: [
      "Hospitals & ICUs",
      "Clinics & OPDs",
      "Diagnostic Centers",
      "Medical Colleges",
    ],
    benefits: [
      "Compliance-Ready Staff",
      "48-hr Deployment",
      "Verified Workforce",
      "SLA-Based Delivery",
    ],
    link: "/staffing/healthcare-manpower",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    description: "Skilled and semi-skilled workforce for production, assembly, quality control, and plant operations — with strict adherence to industrial safety protocols.",
    services: [
      "Assembly Line Operators",
      "Quality Control Inspectors",
      "Machine Operators",
      "Shift Supervisors",
      "Warehouse Staff",
      "Packaging Workers",
      "Plant Maintenance",
    ],
    coverage: [
      "Automotive Plants",
      "FMCG Factories",
      "Electronics Units",
      "Chemical Plants",
    ],
    benefits: [
      "Scalable Workforce",
      "Safety-Trained Staff",
      "Pan-India Sourcing",
      "SLA-Driven Delivery",
    ],
    link: "/staffing/manufacturing",
  },
  {
    id: "facilities",
    label: "Facilities",
    description: "Housekeeping, maintenance, landscaping, pest control, and facility support professionals for corporate parks, IT campuses, and commercial premises.",
    services: [
      "Housekeeping Supervisors",
      "Deep Cleaning Specialists",
      "Landscaping & Horticulture",
      "Pest Control Technicians",
      "Facility Maintenance Tech",
      "Pantry & Cafeteria Staff",
      "Waste Management Ops",
    ],
    coverage: [
      "Corporate Parks",
      "IT Campuses",
      "Commercial Complexes",
      "Residential Societies",
    ],
    benefits: [
      "ISO-Trained Workforce",
      "Eco-Friendly Practices",
      "24/7 Support Available",
      "Minimal Disruption",
    ],
    link: "/staffing/facility-management",
  },
  {
    id: "security",
    label: "Security",
    description: "Security personnel for access control, surveillance, patrolling, and emergency response — PSARA-licensed and trained for diverse site environments.",
    services: [
      "Security Supervisors",
      "Access Control Guards",
      "CCTV & Surveillance Ops",
      "Perimeter Patrolling",
      "Emergency Response",
      "Visitor Management",
      "Event Security",
    ],
    coverage: [
      "Hospitals & Healthcare",
      "Industrial Plants",
      "Corporate Offices",
      "Gated Communities",
    ],
    benefits: [
      "PSARA-Licensed Guards",
      "Background Verified",
      "Emergency-Code Trained",
      "Rapid Deployment",
    ],
    link: "/staffing/security",
  },
  {
    id: "administration",
    label: "Administration",
    description: "Front office executives, help desk staff, coordinators, and office support professionals to keep your operations running smoothly.",
    services: [
      "Front Office Executives",
      "Help Desk Attendants",
      "Data Entry Operators",
      "Office Coordinators",
      "Receptionist Staff",
      "Pantry Supervisors",
      "MIS & Reporting Staff",
    ],
    coverage: [
      "Corporate Head Offices",
      "Healthcare Front Desks",
      "Government Offices",
      "BPO & Shared Services",
    ],
    benefits: [
      "Presentable & Trained",
      "Multi-Language Staff",
      "Fast Onboarding",
      "Payroll Managed by Us",
    ],
    link: "/staffing/administration",
  },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const [activeOfferTab, setActiveOfferTab] = useState<string>("compliance");
  const [activeServiceTab, setActiveServiceTab] = useState<string>("");
  const [activeManpowerSector, setActiveManpowerSector] = useState<string>("healthcare");
  const [industrySearchQuery, setIndustrySearchQuery] = useState<string>("");
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setProfileDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setProfileDropdownOpen(false);
    setIndustrySearchQuery("");
  }, [pathname]);

  useEffect(() => {
    if (activeDropdown === "what-we-offer") {
      setActiveOfferTab("compliance");
      setActiveServiceTab(offeringsVerticalTabsData["compliance"]?.items[0]?.id || "");
    } else if (activeDropdown === "whom-we-serve") {
      setActiveSubTab("manufacturing-industrial");
      setIndustrySearchQuery("");
    } else {
      setActiveSubTab("");
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (activeOfferTab === "compliance") {
      setActiveSubTab("compliance-services");
    } else if (activeOfferTab === "risk") {
      setActiveSubTab("risk-services");
    } else if (activeOfferTab === "governance") {
      setActiveSubTab("governance-services");
    } else if (activeOfferTab === "cybersecurity") {
      setActiveSubTab("grc-compliance");
    } else if (activeOfferTab === "esg") {
      setActiveSubTab("esg-compliance");
    } else if (activeOfferTab === "staffing") {
      setActiveSubTab("");
    }
  }, [activeOfferTab]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "px-2 xl:px-1.5 2xl:px-3 h-full flex items-center text-[13px] 2xl:text-sm font-bold transition-colors duration-200 whitespace-nowrap";
    return `${baseClass} ${isActive ? "text-blue-600" : "text-black hover:text-blue-600"}`;
  };

  const getNavItemClass = () => {
    const baseClass = "px-2 xl:px-1.5 2xl:px-3 h-full flex items-center gap-1 text-[13px] 2xl:text-sm font-bold transition-colors duration-200 whitespace-nowrap";
    return `${baseClass} text-black hover:text-blue-600`;
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md"
        : "bg-transparent"
        }`}
    >
      {/* Top Info Bar */}
      <div
        className={`border-b transition-all duration-300 ${scrolled
          ? "h-0 opacity-0 overflow-hidden"
          : "h-10 opacity-100 border-slate-200 bg-slate-50 text-slate-600"
          }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-center text-[11px] font-bold tracking-wider uppercase text-center">
          <span className="text-slate-500">
            Governance, Risk & Compliance Excellence
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="GOVENICS GRC"
            className="h-14 w-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-stretch gap-1 h-full">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>



          {/* Our Services Dropdown */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDropdown("what-we-offer")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className={getNavItemClass() + " cursor-pointer"}>
              Offerings <ChevronDown className="w-4 h-4 text-current" />
            </div>
            {activeDropdown === "what-we-offer" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-6xl xl:max-w-7xl bg-white border border-slate-200/90 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Level 1 Sidebar - Divisions */}
                <div className="w-[23%] xl:w-[22%] bg-slate-900 text-white p-6 pb-7 flex flex-col justify-between border-r border-slate-800 shrink-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.25em] leading-tight">
                        Offerings
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1.5 font-medium leading-relaxed">
                        Explore our compliance, security, ESG, and staffing solutions.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      {[
                        { id: "compliance", label: "Compliance" },
                        { id: "risk", label: "Risk" },
                        { id: "governance", label: "Governance" },
                        { id: "staffing", label: "Staffing Services" },
                        { id: "cybersecurity", label: "Cybersecurity" },
                        { id: "esg", label: "ESG & Sustainability" }
                      ].map((offer) => (
                        <button
                          key={offer.id}
                          onMouseEnter={() => {
                            setActiveOfferTab(offer.id);
                            setActiveServiceTab(offeringsVerticalTabsData[offer.id]?.items[0]?.id || "");
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center justify-between group ${
                            activeOfferTab === offer.id
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                          }`}
                        >
                          <span>{offer.label}</span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-all ${activeOfferTab === offer.id ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-slate-400"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Pane (Dual Column Layout) */}
                <div className="w-[77%] xl:w-[78%] flex flex-col justify-between bg-white p-6 min-h-[480px]">
                  
                  {/* Content Area */}
                  <div className="flex overflow-hidden flex-1">

                    {activeOfferTab === "staffing" ? (
                      /* ── Manpower 2-Panel Layout ── */
                      <>
                        {/* Left: Sector List */}
                        <div className="w-[36%] border-r border-slate-100 pr-5 flex flex-col gap-2.5 overflow-y-auto shrink-0">
                          <div className="mb-1">
                            <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em]">Manpower</span>
                          </div>
                          <div className="flex flex-col gap-2.5">
                            {manpowerSectorsData.map((sector) => {
                              const isActive = activeManpowerSector === sector.id;
                              return (
                                <button
                                  key={sector.id}
                                  onMouseEnter={() => setActiveManpowerSector(sector.id)}
                                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group ${
                                    isActive
                                      ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20"
                                      : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                  }`}
                                >
                                  <span className="text-xs font-bold tracking-wide uppercase">{sector.label}</span>
                                  <ArrowRight className={`w-3.5 h-3.5 transition-all ${
                                    isActive ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-60 text-slate-400"
                                  }`} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Dynamic Sector Detail */}
                        {(() => {
                          const sector = manpowerSectorsData.find(s => s.id === activeManpowerSector);
                          if (!sector) return null;

                          // Sector icon map
                          const sectorIconMap: Record<string, React.ElementType> = {
                            healthcare: Heart,
                            manufacturing: Factory,
                            facilities: Building,
                            security: ShieldCheck,
                            administration: Users,
                          };
                          const SectorIcon = sectorIconMap[sector.id] || Users;

                          const cardThemes = [
                            { accent: "bg-blue-500", header: "text-blue-700", border: "border-blue-100", bg: "bg-blue-50/40", dot: "bg-blue-400" },
                            { accent: "bg-emerald-500", header: "text-emerald-700", border: "border-emerald-100", bg: "bg-emerald-50/40", dot: "bg-emerald-400" },
                            { accent: "bg-violet-500", header: "text-violet-700", border: "border-violet-100", bg: "bg-violet-50/40", dot: "bg-violet-400" },
                          ];

                          const cards = [
                            { label: "Services", items: sector.services, theme: cardThemes[0] },
                            { label: "Coverage", items: sector.coverage, theme: cardThemes[1] },
                            { label: "Benefits", items: sector.benefits, theme: cardThemes[2] },
                          ];

                          return (
                            <div className="w-[64%] pl-6 flex flex-col animate-fade-in overflow-y-auto">
                              {/* Sector Header — matches standard tabs */}
                              <div className="mb-4 pb-3.5 border-b border-slate-100">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                    <SectorIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-tight tracking-tight">{sector.label} Workforce Solutions</h3>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{sector.description}</p>
                                  </div>
                                </div>
                              </div>

                              {/* 3-Card Grid — Services / Coverage / Benefits */}
                              <div className="grid grid-cols-3 gap-3 flex-1">
                                {cards.map((card) => (
                                  <div key={card.label} className={`${card.theme.bg} border ${card.theme.border} rounded-xl flex flex-col overflow-hidden shadow-sm`}>
                                    {/* Colored top accent bar */}
                                    <div className={`h-1 w-full ${card.theme.accent}`} />
                                    <div className="p-3.5 flex flex-col gap-2 flex-1">
                                      <h4 className={`text-[10.5px] font-black ${card.theme.header} uppercase tracking-wider leading-tight`}>{card.label}</h4>
                                      <ul className="space-y-1">
                                        {card.items.map((item, i) => (
                                          <li key={i} className="flex items-start gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${card.theme.dot} shrink-0 mt-1.5`} />
                                            <span className="text-[10px] font-medium text-slate-600 leading-snug">{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Bottom action row */}
                              <div className="pt-4 flex items-center justify-between">
                                <Link
                                  to={sector.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                                >
                                  <span>Read Full Details</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {manpowerSectorsData.length} sectors covered
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    ) : (
                      /* ── Standard 3-Column Layout for all other tabs ── */
                      <>
                        {/* Middle Column: Vertical Tabs */}
                        <div className="w-[36%] border-r border-slate-100 pr-5 flex flex-col gap-2.5 overflow-y-auto shrink-0">
                          {offeringsVerticalTabsData[activeOfferTab]?.items.map((item) => {
                            const IconComp = item.icon;
                            const isActive = activeServiceTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onMouseEnter={() => setActiveServiceTab(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                                  isActive 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20" 
                                    : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                                <span className="text-xs font-bold uppercase tracking-wide flex-1 text-left">{item.title}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Right Column: Rich 3-Card Detail Panel */}
                        <div className="w-[64%] pl-6 flex flex-col justify-between overflow-y-auto">
                          {(() => {
                            const activeItem = offeringsVerticalTabsData[activeOfferTab]?.items.find(i => i.id === activeServiceTab);
                            if (!activeItem) return null;

                            // Parse pipe-delimited format: "Label|Overview|Bullet1|Bullet2|Bullet3"
                            const parsedDetails = activeItem.keyDetails.map(detail => {
                              const parts = detail.split("|");
                              if (parts.length >= 2) {
                                return {
                                  label: parts[0].trim(),
                                  overview: parts[1].trim(),
                                  bullets: parts.slice(2).map(b => b.trim()).filter(Boolean),
                                };
                              }
                              // fallback: legacy "Label: Description" format
                              const colonIdx = detail.indexOf(": ");
                              return colonIdx !== -1
                                ? { label: detail.substring(0, colonIdx), overview: detail.substring(colonIdx + 2), bullets: [] }
                                : { label: detail, overview: "", bullets: [] };
                            });

                            const cardThemes = [
                              { accent: "bg-blue-500", header: "text-blue-700", border: "border-blue-100", bg: "bg-blue-50/40", dot: "bg-blue-400" },
                              { accent: "bg-emerald-500", header: "text-emerald-700", border: "border-emerald-100", bg: "bg-emerald-50/40", dot: "bg-emerald-400" },
                              { accent: "bg-violet-500", header: "text-violet-700", border: "border-violet-100", bg: "bg-violet-50/40", dot: "bg-violet-400" },
                            ];

                            return (
                              <div className="animate-fade-in flex flex-col h-full">
                                {/* Service Header */}
                                <div className="mb-4 pb-3.5 border-b border-slate-100">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                      {(() => { const Icon = activeItem.icon; return <Icon className="w-4 h-4 text-white" />; })()}
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-black text-slate-900 leading-tight tracking-tight">{activeItem.title}</h3>
                                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{activeItem.description}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* 3-Card Grid — rich bullet cards */}
                                <div className="grid grid-cols-3 gap-3 flex-1">
                                  {parsedDetails.map((detail, idx) => {
                                    const theme = cardThemes[idx] || cardThemes[0];
                                    return (
                                      <div key={idx} className={`${theme.bg} border ${theme.border} rounded-xl flex flex-col overflow-hidden shadow-sm`}>
                                        {/* Colored top accent bar */}
                                        <div className={`h-1 w-full ${theme.accent}`} />
                                        <div className="p-3.5 flex flex-col gap-2 flex-1">
                                          <h4 className={`text-[10.5px] font-black ${theme.header} uppercase tracking-wider leading-tight`}>{detail.label}</h4>
                                          <p className="text-[10px] font-medium text-slate-600 leading-relaxed">{detail.overview}</p>
                                          {detail.bullets.length > 0 && (
                                            <ul className="space-y-1 mt-1">
                                              {detail.bullets.map((bullet, bi) => (
                                                <li key={bi} className="flex items-start gap-1.5">
                                                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0 mt-1.5`} />
                                                  <span className="text-[10px] font-medium text-slate-600 leading-snug">{bullet}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Bottom action row */}
                                <div className="pt-4 flex items-center justify-between">
                                  <Link
                                    to={activeItem.link}
                                    onClick={() => setActiveDropdown(null)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                                  >
                                    <span>Read Full Details</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    {offeringsVerticalTabsData[activeOfferTab]?.items.length} services in this category
                                  </span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Contact Us Banner */}
                  <div className="mt-5 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 px-6 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">
                      Need expert guidance for your specific requirements?
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/15 shrink-0 ml-4"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Industries & Scale Dropdown */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDropdown("whom-we-serve")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className={getNavItemClass() + " cursor-pointer"}>
              Whom We Serve <ChevronDown className="w-4 h-4 text-current" />
            </div>
            {activeDropdown === "whom-we-serve" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-6xl xl:max-w-7xl bg-white border border-slate-200/90 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Left Sidebar */}
                <div className="w-[28%] bg-slate-900 text-white border-r border-slate-800 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em] leading-tight">
                        Whom We Serve
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed">
                        Explore industries and the governance, risk and compliance requirements relevant to their operations.
                      </p>
                    </div>

                    {/* Search Field */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search industries or topics..."
                        value={industrySearchQuery}
                        onChange={(e) => setIndustrySearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    {/* Sidebar Clusters List */}
                    <div className="flex flex-col gap-1 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                      {whomWeServeClusters.map((cluster) => {
                        const ClusterIcon = cluster.icon;
                        const isSelected = activeSubTab === cluster.id;
                        return (
                          <button
                            key={cluster.id}
                            onMouseEnter={() => {
                              setActiveSubTab(cluster.id);
                              if (industrySearchQuery) setIndustrySearchQuery("");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group ${
                              isSelected && !industrySearchQuery
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                                : "text-slate-350 hover:text-white hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ClusterIcon className={`w-4 h-4 shrink-0 ${isSelected && !industrySearchQuery ? "text-white" : "text-blue-400"}`} />
                              <span className="truncate">{cluster.name}</span>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-all ${isSelected && !industrySearchQuery ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>View All Industries Directory</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Right Pane */}
                <div className="w-[72%] p-6 flex flex-col justify-between bg-white min-h-[470px]">
                  {industrySearchQuery.trim() ? (
                    /* ── Search Results View ── */
                    (() => {
                      const query = industrySearchQuery.trim().toLowerCase();
                      const matched = whomWeServeClusters.flatMap(c => 
                        c.subIndustries.filter(s => 
                          s.title.toLowerCase().includes(query) ||
                          s.subtitle.toLowerCase().includes(query) ||
                          s.regulations.some(r => r.toLowerCase().includes(query)) ||
                          s.searchKeywords.some(k => k.toLowerCase().includes(query)) ||
                          c.name.toLowerCase().includes(query)
                        ).map(s => ({ ...s, clusterName: c.name, clusterId: c.id }))
                      );

                      if (matched.length === 0) {
                        return (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                              <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-700">No industry matched "{industrySearchQuery}"</h4>
                            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                              Try searching for automotive, healthcare, banking, tech, construction, or EHS regulations.
                            </p>
                            <button
                              onClick={() => setIndustrySearchQuery("")}
                              className="px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                            >
                              Clear Search
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-600">
                              Found <span className="text-blue-600 font-extrabold">{matched.length}</span> matching industries
                            </span>
                            <button
                              onClick={() => setIndustrySearchQuery("")}
                              className="text-xs text-blue-600 hover:underline font-semibold"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
                            {matched.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.id}
                                  to={sub.existingRoute}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setIndustrySearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all group shadow-2xs"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0 transition-colors">
                                      <SubIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                        {sub.title}
                                      </span>
                                      <span className="text-[10px] text-blue-600 font-semibold">{sub.clusterName}</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* ── Active Cluster View ── */
                    (() => {
                      const activeCluster = whomWeServeClusters.find(c => c.id === activeSubTab) || whomWeServeClusters[0];
                      return (
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {/* Cluster Header */}
                            <div className="border-b border-slate-100 pb-3 flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-black text-slate-900 tracking-tight">
                                    {activeCluster.name}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9.5px] font-black text-emerald-700 tracking-wide uppercase">
                                    Verified Scope
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                                  {activeCluster.shortDescription}
                                </p>
                              </div>
                              <Link
                                to={`/industries/${activeCluster.id}`}
                                onClick={() => setActiveDropdown(null)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-bold whitespace-nowrap inline-flex items-center gap-1 shrink-0"
                              >
                                Explore Sector Page <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            {/* Two-Column Industry Cards Grid (6 submenu items horizontally in 3 rows of 2) */}
                            <div className="grid grid-cols-2 gap-3 my-4">
                              {activeCluster.subIndustries.slice(0, 6).map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                  <Link
                                    key={sub.id}
                                    to={sub.existingRoute}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all group shadow-2xs"
                                  >
                                    <div className="flex items-center gap-3 text-left min-w-0">
                                      <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0 transition-colors">
                                        <SubIcon className="w-4 h-4" />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                          {sub.title}
                                        </span>
                                        <span className="text-[10.5px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                                          {sub.subtitle}
                                        </span>
                                      </div>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-3 mt-1">
                            {/* Key GRC Topics & Documented Offerings */}
                            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 items-center">
                              <div>
                                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Applicable GRC Focus Topics
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeCluster.keyGrcTopics.slice(0, 3).map((topic, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium border border-slate-200/70 truncate max-w-[220px]"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Documented GOVENICS Offerings
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeCluster.documentedOfferings.slice(0, 3).map((off) => (
                                    <Link
                                      key={off.serviceId}
                                      to={off.route}
                                      onClick={() => setActiveDropdown(null)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold border border-blue-200/60 transition-colors"
                                    >
                                      <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                                      <span className="truncate max-w-[140px]">{off.serviceName}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Contextual Contact CTA Banner */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                              <span className="text-xs text-slate-600 font-medium">
                                Discuss your governance, risk and compliance requirements with GOVENICS.
                              </span>
                              <Link
                                to="/contact"
                                onClick={() => setActiveDropdown(null)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/10 shrink-0 ml-3"
                              >
                                Contact Us
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>
            )}
          </div>



          {/* Partners Link */}
          <Link to="/partners" className={getLinkClass("/partners")}>
            Partners
          </Link>

          <Link to="/careers" className={getLinkClass("/careers")}>
            Careers
          </Link>

          {/* About Us Link */}
          <Link to="/about" className={getLinkClass("/about")}>
            About Us
          </Link>


          {/* Prominent CTA Button */}
          <div className="h-full flex items-center pl-2">
            <Link
              to="#lead-capture"
              id="nav-cta-assessment"
              className="inline-flex items-center justify-center gap-2.5 h-11 px-6 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:via-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black tracking-wide transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 border border-blue-400/30"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap leading-none">Get Free Assessment</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        {!isAuthenticated ? (
          <div className="hidden xl:flex items-center gap-3">
            <Link to="/login" className="inline-flex items-center">
              <button className="group inline-flex items-center justify-center gap-2 h-10 px-6 bg-gradient-to-b from-slate-50 via-slate-100/90 to-slate-100 hover:from-white hover:to-blue-50/80 text-slate-800 hover:text-blue-600 border border-slate-250 hover:border-blue-300 rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
                <User className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <span className="whitespace-nowrap">Sign In</span>
              </button>
            </Link>
            <Link to="/contact" className="inline-flex items-center">
              <button className="inline-flex items-center justify-center gap-2 h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 text-xs font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="whitespace-nowrap">Contact Us</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-3 relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all cursor-pointer select-none"
            >
              <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                {user?.fullName?.substring(0, 2).toUpperCase() || "US"}
              </div>
              <div className="flex flex-col text-left max-w-[120px]">
                <span className="text-[11px] font-black text-slate-900 truncate leading-tight">
                  {user?.fullName}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider truncate leading-none mt-0.5">
                  {user?.designation}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {profileDropdownOpen && (
              <div className="absolute top-full right-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 animate-slide-up-dropdown mt-1.5 text-left z-50">
                <div className="pb-3 border-b border-slate-100 mb-2">
                  <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                    Active GRC Session
                  </div>
                  <div className="text-xs font-black text-slate-800 mt-1 truncate">
                    {user?.fullName}
                  </div>
                  <div className="text-[10px] text-slate-450 font-bold leading-tight truncate">
                    {user?.designation} • {user?.companyName}
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium truncate">
                    {user?.email}
                  </div>
                  {user?.primaryStandard && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-[9px] font-bold text-blue-700 uppercase">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{user.primaryStandard} Target</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    Calibrated GRC Scope
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user?.grcScope?.slice(0, 3).map((scope, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-500 rounded uppercase">
                        {scope.split(" ")[0]}
                      </span>
                    ))}
                    {user?.grcScope && user.grcScope.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-500 rounded uppercase">
                        +{user.grcScope.length - 3} More
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-450 font-bold mt-1 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Maturity: {user?.maturity}</span>
                    </div>
                    <div className="text-[8.5px] text-slate-400 font-medium">
                      Sector: {user?.industry}
                    </div>
                    <div className="text-[8.5px] text-slate-400 font-medium">
                      Scope: {user?.geoFootprint}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                  <Link 
                    to="/sgrc/e-library" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My e-Library Portal</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-rose-50 text-xs font-bold text-rose-700 transition-colors text-left font-sans"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-450" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 transition-colors text-slate-800 hover:text-slate-900"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200/80 p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex flex-col gap-1.5">
            <Link to="/" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg">
              Home
            </Link>



            {/* Mobile Accordion for Our Services */}
            <div>
              <button
                onClick={() => toggleDropdown("what-we-offer")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Offerings</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "what-we-offer" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "what-we-offer" && (
                <div className="pl-4 my-1 flex flex-col gap-4 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[500px] overflow-y-auto text-left">
                  
                  {/* Compliance */}
                  <div className="space-y-2 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">Compliance</span>
                      <Link to="/grc" onClick={() => setMobileOpen(false)} className="text-[10px] text-blue-600 font-bold hover:underline">Go to GRC &rarr;</Link>
                    </div>
                    <div className="space-y-1">
                      <div className="pl-2 flex flex-col gap-1">
                        {[
                          { id: "labour-law-compliance", label: "Labour & Employment" },
                          { id: "environmental-compliance", label: "Environmental & EHS" },
                          { id: "taxation-trade-compliance", label: "Taxation & Trade" },
                          { id: "data-privacy-dpdp", label: "Data Privacy & Cyber" },
                          { id: "accreditation-services", label: "Accreditations" }
                        ].map((item) => (
                          <Link
                            key={item.id}
                            to={`/services/${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Risk */}
                  <div className="space-y-2 pb-2 border-b border-slate-200/60">
                    <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">Risk</span>
                    <div className="space-y-1">
                      <div className="pl-2 flex flex-col gap-1">
                        {[
                          { id: "enterprise-risk-management", label: "Enterprise Risk (ERM)" },
                          { id: "internal-audit", label: "Internal Audit" },
                          { id: "vendor-risk-management", label: "Vendor & Third-Party Risk" },
                          { id: "anti-fraud-investigation", label: "Anti-Fraud & Ethics" }
                        ].map((item) => (
                          <Link
                            key={item.id}
                            to={`/services/${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Governance */}
                  <div className="space-y-2 pb-2 border-b border-slate-200/60">
                    <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">Governance</span>
                    <div className="space-y-1">
                      <div className="pl-2 flex flex-col gap-1">
                        {[
                          { id: "governance-framework", label: "Corporate Governance" },
                          { id: "hr-policy-governance", label: "HR Policy & Governance" },
                          { id: "regulatory-compliance", label: "Regulatory Governance" },
                          { id: "clinical-governance", label: "Clinical Governance" }
                        ].map((item) => (
                          <Link
                            key={item.id}
                            to={`/services/${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cybersecurity */}
                  <div className="space-y-2 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">Cybersecurity</span>
                      <Link to="/cybersecurity" onClick={() => setMobileOpen(false)} className="text-[10px] text-blue-600 font-bold hover:underline">Go to Cyber &rarr;</Link>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9.5px] font-bold text-blue-600 uppercase tracking-widest border-l-2 border-blue-500 pl-1.5">
                        Cyber GRC & Compliance
                      </div>
                      <div className="pl-2 flex flex-col gap-1">
                        <Link to="/cybersecurity#grc-compliance" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Framework Implementation</Link>
                        <Link to="/cybersecurity#grc-compliance" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Indian Regulatory Compliance</Link>
                      </div>
                    </div>
                    <div className="space-y-1 pt-1.5">
                      <div className="text-[9.5px] font-bold text-blue-600 uppercase tracking-widest border-l-2 border-blue-500 pl-1.5">
                        Offensive Security (VAPT)
                      </div>
                      <div className="pl-2 flex flex-col gap-1">
                        <Link to="/cybersecurity#offensive-security" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Penetration Testing</Link>
                        <Link to="/cybersecurity#offensive-security" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Attack Simulation</Link>
                      </div>
                    </div>
                  </div>

                  {/* ESG */}
                  <div className="space-y-2 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">ESG & Sustainability</span>
                      <Link to="/esg" onClick={() => setMobileOpen(false)} className="text-[10px] text-blue-600 font-bold hover:underline">Go to ESG &rarr;</Link>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9.5px] font-bold text-blue-600 uppercase tracking-widest border-l-2 border-blue-500 pl-1.5">
                        ESG Compliance
                      </div>
                      <div className="pl-2 flex flex-col gap-1">
                        <Link to="/esg#ehs" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Environmental & EHS Regulatory</Link>
                        <Link to="/esg#labor" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block">Supply Chain & Labor</Link>
                      </div>
                    </div>
                  </div>

                  {/* Staffing Services */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-wider">Staffing Services</span>
                      <Link to="/staffing" onClick={() => setMobileOpen(false)} className="text-[10px] text-blue-600 font-bold hover:underline">Go to Staffing &rarr;</Link>
                    </div>
                    <div className="pl-2 flex flex-col gap-1 text-xs font-semibold text-slate-700">
                      <Link to="/staffing?tab=offerings" onClick={() => setMobileOpen(false)} className="py-0.5 block">Offerings</Link>
                      <Link to="/staffing?tab=industries" onClick={() => setMobileOpen(false)} className="py-0.5 block">Industries</Link>
                      <Link to="/staffing?tab=engagement-models" onClick={() => setMobileOpen(false)} className="py-0.5 block">Engagement Models</Link>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Mobile Accordion for Industries & Scale */}
            <div>
              <button
                onClick={() => toggleDropdown("whom-we-serve")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Whom We Serve</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "whom-we-serve" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "whom-we-serve" && (
                <div className="pl-4 my-1 flex flex-col gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100 max-h-[350px] overflow-y-auto text-left">
                  {whomWeServeClusters.map((cluster) => (
                    <div key={cluster.id} className="space-y-1 pb-2 border-b border-slate-200/60 last:border-b-0">
                      <div className="flex items-center justify-between border-l-2 border-blue-500 pl-1.5">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                          {cluster.name}
                        </span>
                        <Link
                          to={`/industries/${cluster.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-[9.5px] text-blue-600 font-bold hover:underline"
                        >
                          Sector Page &rarr;
                        </Link>
                      </div>
                      <div className="pl-2 flex flex-col gap-0.5">
                        {cluster.subIndustries.slice(0, 6).map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.existingRoute}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block truncate"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Link for Partners */}
            <Link to="/partners" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg block text-left">
              Partners
            </Link>

            {/* Mobile Link for About Us */}
            <Link to="/about" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg block text-left">
              About Us
            </Link>

          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 text-left">
            {!isAuthenticated ? (
              <>
                {/* Mobile Primary CTA */}
                <Link to="#lead-capture" onClick={() => setMobileOpen(false)} className="w-full">
                  <button
                    id="mobile-nav-cta-assessment"
                    className="w-full h-11 flex items-center justify-center gap-2.5 px-6 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white rounded-xl text-xs font-black tracking-wide shadow-md shadow-blue-500/25 border border-blue-400/30 transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap leading-none">Get Free Assessment</span>
                  </button>
                </Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                    Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-slate-50 to-slate-100 hover:bg-blue-50 border border-slate-250 text-slate-800 hover:text-blue-600 rounded-xl text-xs font-bold transition-all shadow-xs">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sign In to Portal</span>
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">
                    Create GRC Account
                  </button>
                </Link>
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</div>
                  <div className="text-xs font-black text-slate-800 truncate">{user?.fullName}</div>
                  <div className="text-[10px] text-slate-500 font-bold leading-tight truncate">{user?.designation} at {user?.companyName}</div>
                  <div className="text-[9px] text-slate-400 font-medium truncate">{user?.email}</div>
                  <div className="mt-2 text-[9.5px] text-slate-650 font-bold">Target Standard: {user?.primaryStandard}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Maturity: {user?.maturity}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Sector: {user?.industry}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Scope: {user?.geoFootprint}</div>
                </div>
                <Link to="/sgrc/e-library" onClick={() => setMobileOpen(false)} className="w-full block">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>My e-Library Portal</span>
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

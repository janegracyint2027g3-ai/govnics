import {
  ShieldCheck, Users, Building, Leaf, Factory, Globe, FileCheck, KeyRound,
  ShieldAlert, Scale, Lock, TreePine, FileText,
  Coins, Zap, Shield, Laptop, Droplet, Activity, UserPlus, Anchor
} from "lucide-react";

export interface OfferingSubItem {
  id: string;
  title: string;
  description: string;
  keyDetails: string[];
  link: string;
  icon: any;
}

export interface OfferingCategory {
  id: string;
  label: string;
  title: string;
  shortDesc: string;
  items: OfferingSubItem[];
}

export const offeringsData: Record<string, OfferingCategory> = {
  "regulatory-compliance": {
    id: "regulatory-compliance",
    label: "Regulatory Compliance",
    title: "REGULATORY COMPLIANCE",
    shortDesc: "End-to-end statutory tracking, audit readiness, and penalty defense across central and state regulators.",
    items: [
      {
        id: "statutory-tracking",
        title: "Statutory Tracking & Mapping",
        description: "Continuous monitoring and mapping across RBI, SEBI, TRAI, CPCB, MCA, and Central/State authorities.",
        keyDetails: [
          "Multi-Agency Scope|Complete tracking across 12+ regulatory bodies.|RBI master directions & circular mapping|SEBI LODR & ICDR disclosure tracking|MCA portal e-form filings & secretarial monitoring",
          "Real-Time Alerts|Zero-lag notification engine for regulatory amendments.|Daily gazette notifications & circular impact alerts|Automated deadline calculation with escalation loops|CXO & Board compliance dashboard integration",
          "Industry Coverage|Specialized compliance across high-scrutiny sectors.|BFSI capital & liquidity norm validation|Pharma GxP & CDSCO manufacturing compliance|Telecom license & spectrum fee adherence"
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldCheck
      },
      {
        id: "audit-readiness",
        title: "100% Audit Readiness Programs",
        description: "Pre-audit verification drills, digital evidence vaults, and regulatory inspection defense protocols.",
        keyDetails: [
          "Pre-Audit Verification|Mock inspections simulating statutory audits.|Rigorous gap assessment against agency mandates|Sampling tests of operational compliance registers|Comprehensive pre-audit scoring and heat maps",
          "Digital Evidence Vault|Centralized, tamper-evident document vault.|Time-stamped statutory challans & receipts|Role-based evidence indexing for swift retrieval|Multi-year audit trail preservation",
          "Regulatory Defense|Hands-on liaison and defense during official audits.|Dedicated GRC specialist on-site representation|Formal responses to show-cause notices & queries|Post-audit corrective action plan (CAP) closure"
        ],
        link: "/services/audit-readiness",
        icon: FileCheck
      },
      {
        id: "automated-registers",
        title: "Automated Digital Registers",
        description: "Transform error-prone physical registers into cloud-synchronized, immutable digital logs.",
        keyDetails: [
          "Digital Logbooks|Automated register creation per statutory templates.|Real-time automated entry population|Multi-location register synchronization|Version-controlled amendment history",
          "Error Elimination|Intelligent validation rules stopping manual errors.|Algorithmic statutory calculation checks|Duplicate entry and omission detection|Automated supervisor review workflows",
          "Instant Extraction|One-click export for regulatory submissions.|Formatted PDF/Excel outputs matching statutory forms|API connectors for ERP and HRMS integration|Secure electronic signature endorsement"
        ],
        link: "/services/regulatory-compliance",
        icon: FileText
      },
      {
        id: "penalty-prevention",
        title: "Penalty & Prosecution Prevention",
        description: "Proactive safeguards and financial liability protection against statutory defaults.",
        keyDetails: [
          "Zero-Lag Calendars|Proactive countdown to all statutory deadlines.|Auto-scheduled filing reminders via SMS/Email/Slack|Buffer day margins preventing last-minute rushes|Centralized master compliance calendar",
          "Escalation Workflows|Multi-tiered intervention for at-risk compliance tasks.|Tiered escalation alerts to Unit Heads & CXOs|Emergency response protocol for overdue items|Root cause diagnostic on near-miss deadlines",
          "Liability Protection|Shielding directors and officers from personal liability.|Director KMP indemnification documentation|Compounding of offenses advisory and representation|Legal opinion and statutory dispute mitigation"
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldAlert
      }
    ]
  },

  "labour-employment": {
    id: "labour-employment",
    label: "Labour & Employment",
    title: "LABOUR & EMPLOYMENT COMPLIANCE",
    shortDesc: "Comprehensive adherence to PF, ESI, Minimum Wages, Contract Labour, and Labour Codes across all Indian states.",
    items: [
      {
        id: "labour-law-statutory",
        title: "Labour Laws & 4 Labour Codes",
        description: "End-to-end statutory compliance across Factories Act, Shops & Establishments, and the 4 Labour Codes.",
        keyDetails: [
          "Code on Wages|Complete readiness for new wage definition norms.|Basic pay and allowance restructuring advisory|Minimum wages notification updates per state|Overtime, bonus, and leave encashment audits",
          "State-Wise Coverage|Seamless adherence across all 28 states & 8 UTs.|Shops & Establishments registration & renewals|Standing Orders drafting and state certification|Annual returns and statutory notices display",
          "Factory Regulations|Safety, welfare, and working condition adherence.|Factory license acquisition, renewal, and amendment|Health and safety register maintenance|Inspector of Factories compliance verification"
        ],
        link: "/services/labour-law-compliance",
        icon: Users
      },
      {
        id: "contract-labour",
        title: "Contract Labour (CLRA) Governance",
        description: "Robust safeguards against co-employment liabilities under the Contract Labour (R&A) Act.",
        keyDetails: [
          "Principal Employer Shield|Insulate enterprise assets from vendor defaults.|CLRA registration and license threshold tracking|Form V issuance and contractor vendor verification|Co-employment risk prevention frameworks",
          "Contractor Payroll Audits|Verification of vendor minimum wages and deductions.|Monthly wage sheet and bank payout verification|PF, ESI, and LWF deposit challan reconciliation|Vendor non-compliance penalty recovery support",
          "Subcontractor Diligence|Comprehensive auditing of secondary vendor tiers.|Tier-2 contractor registration validation|Site-level worker safety & welfare checks|Contractual indemnity & liability clause advisory"
        ],
        link: "/services/contract-labour",
        icon: Factory
      },
      {
        id: "payroll-statutory",
        title: "Payroll Statutory (PF/ESI/PT/LWF)",
        description: "Flawless computation and deposit of employee statutory benefits across all operations.",
        keyDetails: [
          "PF & ESI Management|Complete monthly challan generation and filing.|Universal Account Number (UAN) generation & seeding|ESI monthly contribution and dispensaries mapping|EPFO inspection handling and notice defense",
          "State PT & LWF|Precise deductions across multi-state workforces.|State-specific professional tax slab calculation|Labour Welfare Fund (LWF) bi-annual deposits|Timely statutory annual return submissions",
          "Gratuity & Benefits|Actuarial compliance and trust fund governance.|Payment of Gratuity Act calculation & claims|Maternity Benefit Act leave and crèche compliance|Equal Remuneration Act payroll audits"
        ],
        link: "/services/payroll-statutory",
        icon: Coins
      },
      {
        id: "employment-posh",
        title: "POSH & Employment Governance",
        description: "Institutionalizing prevention of sexual harassment, fair workplace charters, and audit defense.",
        keyDetails: [
          "POSH Framework|Legal constitution of Internal Committee (IC).|External expert member empanelment|Annual POSH report filing with District Officer|Policy drafting compliant with POSH Act 2013",
          "Training & Sensitization|Organization-wide awareness and leadership workshops.|Mandatory employee e-learning modules|IC member inquiry procedure masterclasses|Managerial unconscious bias workshops",
          "Inquiry & Defense|Defensible documentation during workplace disputes.|Legally compliant inquiry procedure execution|Impartial report drafting & recommendation notes|Conciliation and settlement advisory support"
        ],
        link: "/services/hr-policy-governance",
        icon: Scale
      }
    ]
  },

  "taxation-trade": {
    id: "taxation-trade",
    label: "Taxation & Trade",
    title: "TAXATION & TRADE COMPLIANCE",
    shortDesc: "Direct and indirect tax advisory, transfer pricing, SEZ compliance, and customs duty optimization.",
    items: [
      {
        id: "gst-compliance",
        title: "GST & Indirect Tax Governance",
        description: "End-to-end GST return filing, automated ITC reconciliation, and departmental audit defense.",
        keyDetails: [
          "Filing & Reconciliation|Error-free monthly and annual GST filings.|GSTR-1, 3B, and GSTR-9/9C reconciliation|Automated 2B vs Purchase Register ITC matching|Vendor follow-up for missing invoices",
          "E-Way & E-Invoicing|Real-time generation and compliance validation.|Automated IRN generation via GSTN sandbox|Multi-vehicle and consolidated e-way bill workflows|Error logs resolution and cancellation audits",
          "Audit & Notice Defense|Professional representation for GST scrutiny notices.|Form ASMT-10 notice response drafting|Pre-audit documentation and mock scrutiny drills|SCN dispute representation and litigation advisory"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Building
      },
      {
        id: "direct-tax-tp",
        title: "Income Tax & Transfer Pricing",
        description: "Corporate tax returns, withholding tax (TDS), and arm's-length transfer pricing documentation.",
        keyDetails: [
          "Corporate Income Tax|Optimized returns and deduction verification.|Advance tax computation and estimation models|MAT and minimum tax credit calculation|Tax audit readiness under Section 44AB",
          "Transfer Pricing Studies|Defensible global arm's-length benchmarking.|Master file and Local file documentation|Country-by-Country Reporting (CbCR) filing|Advance Pricing Agreement (APA) advisory",
          "Withholding Tax (TDS)|Error-free deduction and challan settlement.|Lower deduction certificate (Form 13) filing|Quarterly 24Q, 26Q, and 27Q return filing|TDS default notice (TRACES) resolution"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Coins
      },
      {
        id: "customs-fema",
        title: "Customs, SEZ & FEMA Compliance",
        description: "Cross-border capital flow compliance, SEZ unit operations, and customs valuation.",
        keyDetails: [
          "Customs Valuation|Classification and duty drawback optimization.|Harmonized System (HS) code classification|Special Valuation Branch (SVB) representation|Project import and EPCG scheme benefits",
          "SEZ Operations|Seamless management of Development Commissioner filings.|Monthly APR and Softex filing support|DTA sale permission and duty calculation|Zero-rated procurement documentation",
          "FEMA & RBI Adherence|Comprehensive Foreign Exchange Management compliance.|Form FC-GPR and FC-TRS filings for FDI/FPI|External Commercial Borrowing (ECB) reporting|FLA (Foreign Liabilities and Assets) return filing"
        ],
        link: "/services/customs-fema",
        icon: Scale
      }
    ]
  },

  "environmental-ehs": {
    id: "environmental-ehs",
    label: "Environmental & EHS",
    title: "ENVIRONMENTAL, HEALTH & SAFETY (EHS)",
    shortDesc: "Statutory adherence to Pollution Control Boards, MoEFCC, waste rules, and factory safety certifications.",
    items: [
      {
        id: "consent-clearances",
        title: "Environmental CTE/CTO Consents",
        description: "Complete statutory consent lifecycle management across State and Central Pollution Control Boards.",
        keyDetails: [
          "CTE & CTO Approvals|Fast-track Consent to Establish & Operate.|SPCB application preparation and portal submission|Environmental Management Plan (EMP) drafting|Site inspection facilitation and query handling",
          "Renewal Management|Never face plant shutdown due to expired consents.|90-day advance renewal notification triggers|Form-IV and Form-V environmental statement filings|Capital investment verification and fee audit",
          "Liaison & Defense|Official liaison with regional PCB officers.|Show-cause notice and closure direction handling|Bank guarantee compliance and release support|Discharge standards compliance"
        ],
        link: "/services/environmental-ehs",
        icon: Leaf
      },
      {
        id: "waste-management",
        title: "Hazardous, E-Waste & Plastic Rules",
        description: "Adherence to Waste Management Rules, manifest tracking, and Extended Producer Responsibility (EPR).",
        keyDetails: [
          "Hazardous Waste Rules|Strict compliance with Form-4 and Form-10 manifests.|Authorized TSDF membership and manifest tracking|Hazardous waste storage area labeling compliance|Annual return submission to SPCB",
          "EPR Registration & Credits|End-to-end Producer Responsibility management.|CPCB portal registration for Plastic & E-Waste|Accredited recycler empanelment & credit sourcing|Annual EPR fulfillment certificate acquisition",
          "Battery & Bio-Medical|Compliant disposal protocols and documentation.|Battery Waste Management Rules 2022 filings|Bio-medical waste color-coded segregation audits|Manifest verification and disposal audit trails"
        ],
        link: "/services/waste-management",
        icon: Droplet
      },
      {
        id: "workplace-safety",
        title: "Factory & Workplace Safety Audits",
        description: "Statutory safety committee setups, fire safety certifications, and HAZOP assessments.",
        keyDetails: [
          "Industrial Safety Audits|Deep-dive hazard identification across shop floors.|Comprehensive Factories Act safety compliance|HAZOP and Risk Assessment studies|Machine guarding and electrical safety checks",
          "Fire & Emergency NOC|Multi-tier fire safety certifications.|Fire department building plan sanction|Fire prevention equipment commissioning and NOC|Periodic renewal and annual fire safety certificate",
          "Occupational Health|Medical surveillance and worker safety records.|Annual employee medical checkup compliance|Form-32 health register maintenance|PPE compliance and MSDS display verification"
        ],
        link: "/services/workplace-safety",
        icon: ShieldCheck
      },
      {
        id: "esg-ehs-readiness",
        title: "ESG EHS Readiness & Decarbonization",
        description: "Transform compliance data into audit-grade environmental disclosures for global investors.",
        keyDetails: [
          "Baseline Metrics|Accurate tracking of carbon, water, and waste.|Resource consumption accounting and intensity ratios|Scope 1 & Scope 2 baseline emission mapping|Effluent Treatment Plant (ETP) performance logs",
          "Regulatory Alignment|Transition readiness for SEBI BRSR and GRI.|Principle 6 environmental disclosures support|Water neutrality and Zero Liquid Discharge (ZLD)|Circular economy and zero-waste-to-landfill",
          "Green Certifications|Preparation for IGBC, LEED, and ISO 14001.|ISO 14001 EMS gap analysis and documentation|Internal environmental audit framework setup|Environmental performance dashboard deployment"
        ],
        link: "/services/esg-sustainability",
        icon: TreePine
      }
    ]
  },

  "supply-chain": {
    id: "supply-chain",
    label: "Supply Chain Compliance",
    title: "SUPPLY CHAIN COMPLIANCE",
    shortDesc: "Auditing and securing statutory compliance across your entire vendor, contractor, and distributor network.",
    items: [
      {
        id: "vendor-due-diligence",
        title: "Vendor & Third-Party Due Diligence",
        description: "Automated pre-onboarding compliance verification and continuous risk scoring of suppliers.",
        keyDetails: [
          "Pre-Onboarding Screening|Automated statutory verification before vendor activation.|GST, PAN, PF, and ESI active status check|Court records, negative news, and PEP screening|Financial health and credit rating assessment",
          "Tiered Risk Profiling|Classify suppliers by compliance exposure.|Critical vs non-critical vendor categorization|Multi-factor compliance scoring algorithm|Vendor compliance health dashboard",
          "Continuous Overwatch|Real-time monitoring for compliance infractions.|Instant alerts on vendor GST cancellation or default|Labour law violation and strike tracking|Annual vendor re-certification campaigns"
        ],
        link: "/services/supply-chain-compliance",
        icon: Building
      },
      {
        id: "supply-chain-esg",
        title: "Supply Chain ESG & Sustainability",
        description: "Scope 3 supply chain decarbonization, human rights due diligence, and ethical sourcing.",
        keyDetails: [
          "Scope 3 Accounting|Precise supplier carbon footprint quantification.|Spend-based and activity-based Scope 3 data collection|Supplier emission reduction engagement programs|Carbon reporting ready for BRSR Principle 6",
          "Ethical & Human Rights|Auditing labor standards across supplier facilities.|Child labor and forced labor prohibition verification|Fair wage and working hour compliance audits|Supplier Code of Conduct rollout and adoption",
          "Responsible Sourcing|Verification of raw material provenance.|Conflict minerals and deforestation-free checks|Sustainable packaging and recycled content audits|Chain-of-custody documentation verification"
        ],
        link: "/services/supply-chain-compliance",
        icon: Leaf
      },
      {
        id: "contractual-monitoring",
        title: "Contractual Compliance & SLA Monitoring",
        description: "Continuous surveillance of vendor legal obligations, indemnity clauses, and insurance.",
        keyDetails: [
          "Clause Enforcement|Audit vendor compliance with statutory covenants.|Anti-bribery & anti-corruption (ABAC) clause checks|Data confidentiality and privacy covenants|Minimum wage revision pass-through compliance",
          "Insurance & Indemnity|Active tracking of policies protecting enterprise assets.|Workmen Compensation policy verification|Commercial General Liability (CGL) coverage checks|Policy expiry tracking and renewal alerts",
          "Penalty & Dispute Defense|Evidence-backed vendor SLA enforcement.|Non-compliance penalty deduction documentation|Vendor breach notices and legal cure periods|Alternate dispute resolution (ADR) assistance"
        ],
        link: "/services/supply-chain-compliance",
        icon: Factory
      }
    ]
  },

  "export-trade": {
    id: "export-trade",
    label: "Export & Trade Services",
    title: "EXPORT & INTERNATIONAL TRADE SERVICES",
    shortDesc: "Export documentation, DGFT advisory, duty drawback incentives, and cross-border customs clearance.",
    items: [
      {
        id: "export-documentation",
        title: "Export Documentation & Port Clearance",
        description: "Flawless paperwork across Shipping Bills, Bills of Lading, and Country of Origin certificates.",
        keyDetails: [
          "Pre-Shipment Documentation|Audit-proof shipping paperwork generation.|Proforma & Commercial Invoice generation|Packing list, Certificate of Origin (COO), and GSP|Electronic Shipping Bill (ESB) preparation",
          "ICEGATE Customs Clearances|Swift clearance across Indian ports and ICDs.|Customs declaration and self-assessment|EDI portal clearance and query resolution|Special Economic Zone (SEZ) procurement clearances",
          "Post-Shipment Compliances|Banking and regulatory closure for exports.|Bank Realisation Certificate (e-BRC) reconciliation|Bill of Lading / Airway Bill endorsement|EDPMS entry closure with authorized dealer banks"
        ],
        link: "/services/export-trade-services",
        icon: Anchor
      },
      {
        id: "dgft-ftp-advisory",
        title: "DGFT & Foreign Trade Policy (FTP)",
        description: "Maximizing incentives under RoDTEP, EPCG, and Advance Authorization schemes.",
        keyDetails: [
          "Advance Authorization|Duty-free import of inputs for export production.|Norms committee fixation and SION alignment|Redemption of advance authorization licenses|Invalidation letter and ARO procurement",
          "EPCG Scheme Benefits|Zero-duty capital goods imports with export obligations.|Installation certificate filing with DGFT|Export obligation fulfillment tracking & extension|Redemption and clubbing of EPCG licenses",
          "Incentive Optimization|Timely claiming of export promotion benefits.|Remission of Duties (RoDTEP) claim reconciliation|RoSCTL claims for textiles and garments|DGFT IEC amendment and port registration"
        ],
        link: "/services/export-trade-services",
        icon: Globe
      },
      {
        id: "cross-border-regulatory",
        title: "Cross-Border Regulatory & Sanctions",
        description: "Screening transactions against global sanctions, OFAC lists, and dual-use export controls.",
        keyDetails: [
          "SCOMET Licensing|Dual-use goods and technology export controls.|SCOMET classification and item determination|DGFT export license application preparation|End-user verification and certificate validation",
          "Sanctions & AML Screening|Defense against international trade violations.|Real-time OFAC, UN, and EU sanctions screening|Counterparty and vessel sanctions checks|High-risk jurisdiction transaction vetting",
          "Trade Agreements|Maximize tariff savings via Free Trade Agreements.|India-UAE CEPA, India-Australia ECTA utilization|Rule of origin value-addition calculation|Preferential duty filing documentation"
        ],
        link: "/services/export-trade-services",
        icon: ShieldCheck
      }
    ]
  },

  "licensing-permits": {
    id: "licensing-permits",
    label: "Licensing & Permits",
    title: "LICENSING, PERMITS & APPROVALS",
    shortDesc: "Single-window procurement, tracking, and renewal of Central, State, and Municipal authorizations.",
    items: [
      {
        id: "central-state-licenses",
        title: "Central & State Business Registrations",
        description: "Single-window procurement of enterprise incorporation, tax, and commercial registrations.",
        keyDetails: [
          "Corporate Setup|Central and state-level business enablement.|MCA incorporation and digital signature certificates|Pan-India GST and PAN/TAN registrations|Startup India and MSME/Udyam certification",
          "Commercial Licenses|Local municipal and administrative authorizations.|Municipal Trade License acquisition & renewals|Shops & Establishments registrations across states|Professional Tax employer and employee registrations",
          "Multi-Location Rollout|Rapid expansion into new territories and states.|Standardized licensing blueprints for expansion|State-specific documentation harmonization|Centralized multi-branch permit registry"
        ],
        link: "/services/licensing-permits",
        icon: Building
      },
      {
        id: "industrial-permits-noc",
        title: "Industrial Permits, Pollution & Fire NOCs",
        description: "End-to-end statutory approvals for factories, warehouses, and industrial campuses.",
        keyDetails: [
          "Factory Approvals|Factory plan and machinery layout clearances.|Inspector of Factories plan approval and license|Boilers, pressure vessels, and DG set approvals|Electrical inspectorate clearances and CEA compliance",
          "Fire & Emergency NOC|Multi-tier fire safety certifications.|Fire department building plan sanction|Fire prevention equipment commissioning and NOC|Periodic renewal and annual fire safety certificate",
          "Pollution Clearances|Comprehensive environmental consent approvals.|CTE & CTO under Air and Water Acts|Hazardous waste authorization from SPCB|Ground water extraction NOC from CGWA"
        ],
        link: "/services/licensing-permits",
        icon: Factory
      },
      {
        id: "sector-specific-permits",
        title: "Sector Permits (Pharma, Food, Telecom)",
        description: "Specialized regulatory authorizations for heavily controlled industrial sectors.",
        keyDetails: [
          "Food & Healthcare|Stringent public safety and health authorizations.|FSSAI Central & State license procurement|CDSCO drug manufacturing and sale licenses|NABH & Atomic Energy Regulatory Board (AERB)",
          "Telecom & IT|Wireless and communication network clearances.|DoT WPC (Wireless Planning & Coordination) license|Telecom infrastructure provider (IP-1) registration|OSP / Other Service Provider compliance",
          "Energy & Mining|Exploitation and generation operational permits.|Mining lease statutory compliance and clearances|Explosives (PESO) storage and handling licenses|Renewable power grid connectivity approvals"
        ],
        link: "/services/licensing-permits",
        icon: FileCheck
      },
      {
        id: "permit-lifecycle-tracking",
        title: "Permit Tracking & Renewal Engine",
        description: "Zero-expiry assurance through proactive timelines, automated alerts, and dedicated liaison.",
        keyDetails: [
          "Automated Expiry Radar|Never face penalties or closure due to lapse.|120, 90, and 30-day automated renewal alerts|Master dashboard tracking 500+ licenses enterprise-wide|Document archival of historical approvals",
          "Turnkey Renewals|Hands-off renewal processing managed by experts.|Preparation of statutory renewal dossiers|Inspection handling and official department follow-ups|Challan payment and official endorsement collection",
          "Compliance Assurance|Guarantee uninterrupted operational legality.|Senior management escalation on pending renewals|Digital certificate repository with QR verification|Status reports for Board Audit Committees"
        ],
        link: "/services/licensing-permits",
        icon: ShieldAlert
      }
    ]
  },

  "escrow-services": {
    id: "escrow-services",
    label: "Escrow Services",
    title: "ESCROW & TRANSACTION SUPPORT SERVICES",
    shortDesc: "Independent, neutral custody of funds, source code, and commercial assets during high-value deals.",
    items: [
      {
        id: "commercial-escrow",
        title: "Commercial & M&A Escrow Services",
        description: "Independent, neutral custody of transaction funds, shares, and assets during high-value deals.",
        keyDetails: [
          "M&A & Private Equity|Safeguard transaction funds during deal closing.|Indemnity and holdback escrow accounts|Earn-out milestone payment custody|Joint escrow agreement drafting and execution",
          "Real Estate & Projects|RERA-compliant fund custody and project disbursements.|Milestone-linked contractor payment releases|Land acquisition settlement escrow accounts|Advance payment guarantee fund protection",
          "Dispute-Free Settlement|Impartial third-party releases per strict conditions.|Bi-party verification protocols before fund release|Immediate freeze in case of dispute notification|Neutral audit trails ready for arbitration"
        ],
        link: "/services/escrow-services",
        icon: KeyRound
      },
      {
        id: "cross-border-escrow",
        title: "Cross-Border & Trade Escrow",
        description: "Mitigate non-payment and non-performance risks in international import-export contracts.",
        keyDetails: [
          "Trade Escrow|Safe global settlement without expensive Letters of Credit.|Buyer payment custody pending bill of lading verification|Seller payment guarantee upon port delivery|Independent cargo inspection milestone release",
          "Cross-Border Transfers|Compliant with RBI, FEMA, and international banking.|Multi-currency escrow custody (USD, EUR, GBP, INR)|Authorized Dealer Category-I bank integration|Form A2 and FEMA documentation reconciliation",
          "Supply Chain Finance|Controlled liquidity release across supply chains.|Vendor milestone payment accounts|Inventory financing collateral custody|Tri-party escrow between buyer, seller, and financier"
        ],
        link: "/services/escrow-services",
        icon: Globe
      },
      {
        id: "digital-blockchain-escrow",
        title: "Digital & Technology Escrow",
        description: "Smart contract-driven escrow, source code deposit, and digital asset custody.",
        keyDetails: [
          "Software & Code Vault|Protect critical software assets and source code.|Secure source code deposit and versioning vault|Release condition verification (vendor insolvency/support)|Software build and deployability validation",
          "Smart Contract Settlement|Programmable milestone disbursement on verification.|Automated API triggers upon logistics confirmation|Cryptographically secure ledger audit records|Reduced transaction costs and zero settlement delays",
          "Intellectual Property|Secure custody during tech licensing and joint ventures.|Patent and proprietary formula holding accounts|Release triggers linked to regulatory drug approvals|Trade secret access control management"
        ],
        link: "/services/escrow-services",
        icon: Laptop
      }
    ]
  },

  "risk-management": {
    id: "risk-management",
    label: "Risk Management",
    title: "RISK MANAGEMENT",
    shortDesc: "Enterprise risk management (ERM) frameworks, operational resilience, and third-party risk management.",
    items: [
      {
        id: "enterprise-risk-erm",
        title: "Enterprise Risk Management (ERM)",
        description: "Deploy COSO and ISO 31000 aligned frameworks turning risks into strategic advantages.",
        keyDetails: [
          "Framework Blueprint|Tailored risk appetite and tolerance definitions.|ISO 31000 & COSO ERM framework design|Enterprise risk taxonomy and library creation|Board Risk Committee charter and reporting design",
          "Risk & Control Mapping|Deep-dive RCSA across all business functions.|Process-level risk identification and control scoring|Inherent vs residual risk quantification|Gap identification and mitigation roadmap",
          "KRI Architecture|Predictive leading indicators warning of exposures.|Key Risk Indicator threshold setting|Automated KRI data feeds from ERP/CRM|Real-time heat maps for executive leadership"
        ],
        link: "/services/enterprise-risk-management",
        icon: ShieldAlert
      },
      {
        id: "operational-resilience",
        title: "Operational Resilience & BCP",
        description: "Identify single points of failure, stress test supply lines, and build resilient operations.",
        keyDetails: [
          "Business Impact Analysis|Identify critical operations and maximum tolerable downtime.|Dependency mapping of systems, people, and facilities|Recovery Time Objectives (RTO) and RPO definition|Supply chain vulnerability stress testing",
          "BCP & Disaster Recovery|Actionable playbooks tested against real crisis scenarios.|ISO 22301 aligned business continuity plans|Comprehensive IT disaster recovery procedures|Crisis management team roles and communication plans",
          "Scenario Simulation|Validate response capabilities through live drills.|Tabletop simulations for cyber, fire, and supply shocks|Post-drill debrief and playbook remediation|Regulatory resilience reporting for BFSI and utilities"
        ],
        link: "/services/operational-risk",
        icon: Activity
      },
      {
        id: "third-party-risk",
        title: "Third-Party & Vendor Risk (TPRM)",
        description: "End-to-end evaluation of operational, financial, and cyber risks across vendor networks.",
        keyDetails: [
          "Vendor Risk Profiling|Multi-dimensional scoring across all suppliers.|Financial stability and credit risk assessment|Legal, statutory, and regulatory compliance audit|Information security and data access evaluation",
          "Lifecycle TPRM|Continuous risk management from onboarding to exit.|Tiered due diligence based on spend and criticality|Ongoing monitoring of negative news and litigation|Fourth-party / sub-vendor risk exposure tracking",
          "Contractual Defense|Pre-mapped clauses mitigating third-party liability.|Robust SLA definitions and breach penalties|Right-to-audit and inspection covenants|Offboarding and data destruction verification"
        ],
        link: "/services/vendor-risk-management",
        icon: Building
      }
    ]
  },

  "enterprise-governance": {
    id: "enterprise-governance",
    label: "Enterprise Governance",
    title: "ENTERPRISE GOVERNANCE",
    shortDesc: "Corporate governance charters, board secretarial compliance, and internal financial controls.",
    items: [
      {
        id: "corporate-governance",
        title: "Corporate Governance & Board Accountability",
        description: "Codify charters, committee workflows, and ethical frameworks ensuring investor confidence.",
        keyDetails: [
          "Board Charters|Structuring high-impact governance committees.|Audit, Nomination & Remuneration (NRC), and Risk charters|Terms of Reference (ToR) aligned to SEBI LODR|Board skills matrix and diversity planning",
          "Delegation of Authority|Transparent decision-making and approval hierarchies.|Matrix-based approval limits for CapEx and OpEx|Multi-tier authorization workflows in ERP|Regular DoA review and loophole closure",
          "Conflict & RPT Policy|Protect boards from governance failures and fraud.|Related Party Transaction (RPT) audit and registers|Board-level conflict of interest disclosure system|Whistleblower and vigil mechanism frameworks"
        ],
        link: "/services/governance-framework",
        icon: Building
      },
      {
        id: "secretarial-compliance",
        title: "Secretarial Compliance & Board Reporting",
        description: "Flawless Companies Act compliance, board pack drafting, and statutory ROC filings.",
        keyDetails: [
          "Board & Committee Meetings|Flawless preparation and statutory documentation.|Agenda, board pack, and draft resolution preparation|Secretarial Standards (SS-1 and SS-2) compliance|Comprehensive and defensible minutes drafting",
          "MCA & Registrar Filings|On-time submission of corporate statutory returns.|Annual filing of AOC-4, MGT-7, and director DIR-3 KYC|Changes in directors, capital, and registered office|Charge creation, modification, and satisfaction filings",
          "Secretarial Audits|Comprehensive pre-audit and certification support.|Section 204 Companies Act secretarial audit defense|Compliance certificate for listed and unlisted entities|Corporate governance report for annual disclosure"
        ],
        link: "/services/secretarial-compliance",
        icon: Scale
      },
      {
        id: "internal-controls-governance",
        title: "Internal Financial Controls (IFC) & Audits",
        description: "Design, testing, and continuous monitoring of internal financial and process controls.",
        keyDetails: [
          "IFC Design & Documentation|Standard operating procedures and control matrices.|Risk and Control Matrix (RCM) documentation|Process narrative and flowchart mapping|Anti-fraud control framework deployment",
          "Control Testing|Rigorous testing of operating and design effectiveness.|Sample testing of financial and operational approvals|Walkthrough tests across procure-to-pay and order-to-cash|Control deficiency grading and remediation support",
          "Audit Committee Reporting|Clear, concise assurance briefings for directors.|Quarterly IFC health scorecards|Progress tracking of remediation action plans|Statutory auditor alignment on internal controls"
        ],
        link: "/services/internal-audit",
        icon: FileText
      }
    ]
  },

  "cybersecurity-data": {
    id: "cybersecurity-data",
    label: "Cybersecurity & Data Privacy",
    title: "CYBERSECURITY & DATA COMPLIANCE",
    shortDesc: "DPDP Act compliance, ISO 27001/SOC 2 frameworks, VAPT ethical hacking, and 6-hour CERT-In response.",
    items: [
      {
        id: "data-privacy-dpdp",
        title: "Data Protection & DPDP Act Compliance",
        description: "Full compliance with India's DPDP Act, GDPR, consent architectures, and privacy audits.",
        keyDetails: [
          "DPDP Act Alignment|End-to-end readiness for India's data protection law.|Data Principal consent capture and notice workflows|Purpose limitation and data minimisation audits|Record of Processing Activities (RoPA) compilation",
          "Consent Architecture|Deploy legally verifiable consent management platforms.|Granular, bilingual consent capture mechanisms|Consent withdrawal and data erasure workflows|Data Principal grievance redressal mechanism",
          "Privacy Breach Readiness|72-hour regulatory breach notification workflows.|Data breach assessment and containment protocols|Data Protection Board of India notification templates|Data Protection Officer (DPO) support and advisory"
        ],
        link: "/services/data-privacy",
        icon: Lock
      },
      {
        id: "cybersecurity-frameworks",
        title: "Cybersecurity Policy & ISO 27001 / SOC 2",
        description: "Design and certification of Information Security Management Systems.",
        keyDetails: [
          "ISO 27001 & SOC 2|Fast-track support from gap audit to certification.|ISMS scope definition and risk treatment plan|Statement of Applicability (SoA) documentation|Stage 1 and Stage 2 certification audit facilitation",
          "Security Policies|Complete library of 40+ legally vetted cyber policies.|Acceptable use, remote access, and BYOD policies|Data classification, retention, and disposal rules|Access control, password, and encryption standards",
          "Security Operations|Oversight of SIEM, SOC, and vulnerability scanning.|Vulnerability management lifecycle advisory|Log retention compliance per CERT-In guidelines|Third-party cloud and SaaS application vetting"
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Zap
      },
      {
        id: "vapt-testing-services",
        title: "VAPT & Penetration Testing",
        description: "Simulate advanced real-world attacks across web, mobile, API, and cloud networks.",
        keyDetails: [
          "Web, Mobile & API|Uncover vulnerabilities before cyber adversaries do.|OWASP Top 10 and business logic flaw testing|API security assessment and authorization checks|Mobile application (Android & iOS) pen-testing",
          "Network & Infrastructure|Expose perimeter and internal weaknesses.|External perimeter and firewall penetration testing|Active Directory and privilege escalation testing|Cloud infrastructure configuration and IAM review",
          "Verified Remediation|Developer-facing remediation guidance and re-tests.|CVSS-prioritized vulnerability fix roadmaps|Hands-on code remediation advisory sessions|Zero-vulnerability closure certificates"
        ],
        link: "/services/vapt-testing",
        icon: Shield
      },
      {
        id: "incident-response-cert",
        title: "Incident Response & CERT-In Compliance",
        description: "6-hour mandatory CERT-In breach reporting, live forensic analysis, and containment.",
        keyDetails: [
          "6-Hour Reporting|Meet strict CERT-In cyber incident reporting mandates.|Incident triage and notification drafting|24/7 designated incident liaison team|CERT-In compliance log retention (180 days)",
          "Containment & Forensic|Rapid threat isolation and forensic evidence logging.|Playbook-driven attack containment and isolation|Court-admissible chain of custody forensic reports|Malware reverse-engineering and root-cause analysis",
          "Crisis Simulation|Tabletop drills testing executive incident readiness.|Ransomware negotiation and crisis playbook testing|Multi-stakeholder communications templates|Post-incident lessons learned and posture hardening"
        ],
        link: "/services/incident-response",
        icon: ShieldAlert
      }
    ]
  },

  "esg-sustainability": {
    id: "esg-sustainability",
    label: "ESG & Sustainability",
    title: "ESG & SUSTAINABILITY",
    shortDesc: "Automate environmental, social, and governance reporting to SEBI BRSR, GRI, and carbon accounting.",
    items: [
      {
        id: "esg-brsr-reporting",
        title: "ESG Strategy & BRSR / GRI Reporting",
        description: "Automate environmental, social, and governance reporting to SEBI BRSR and GRI standards.",
        keyDetails: [
          "SEBI BRSR Compliance|Principle-wise reporting for top 1000 listed entities.|BRSR Core mandatory assurance readiness|Comprehensive 9-principle data gap assessment|ESG narrative drafting and investor disclosures",
          "GRI & Global Standards|Align reporting with worldwide investor expectations.|GRI Standards materiality matrix and disclosures|TCFD climate risk governance alignment|CDP questionnaire scoring and submission support",
          "Data Assurance|Audit-proof sustainability metrics and evidence trails.|Pre-assurance review per ISAE 3000 standards|Internal ESG data governance and control checks|Annual sustainability report design and publication"
        ],
        link: "/services/esg-sustainability",
        icon: Leaf
      },
      {
        id: "carbon-accounting-netzero",
        title: "Carbon Accounting & Net-Zero",
        description: "Scope 1, 2, and 3 GHG emissions quantification and verified net-zero pathways.",
        keyDetails: [
          "GHG Quantification|Audit-ready carbon inventory per GHG Protocol.|Scope 1 direct emissions calculation|Scope 2 indirect emissions (location & market-based)|Comprehensive Scope 3 value chain emissions mapping",
          "Net-Zero Roadmaps|Science-based decarbonization targets and strategies.|Science Based Targets initiative (SBTi) alignment|Renewable energy transition feasibility studies|Energy efficiency CapEx payback modeling",
          "Carbon Credits & Offsets|High-integrity offset procurement and management.|Verified Carbon Standard (VCS) project validation|Internal carbon pricing mechanism design|Carbon offset retirement and registry accounting"
        ],
        link: "/services/carbon-footprint",
        icon: TreePine
      },
      {
        id: "supply-chain-sustainability",
        title: "Supply Chain ESG & Green Audits",
        description: "Supplier ESG audits, circular economy transition, and facility resource efficiency.",
        keyDetails: [
          "Supplier ESG Audits|Drive sustainability through Tier-1 and Tier-2 vendors.|Supplier ESG scoring and gap remediation|Green procurement policy drafting and rollout|Deforestation-free and fair labor verification",
          "Resource & Green Audits|Uncover operational savings while meeting green norms.|Energy efficiency and thermal audit assessments|Water footprint assessment and ZLD planning|Solid, hazardous, and plastic waste audits",
          "Circular Economy|Transform operational waste streams into valuable assets.|Extended Producer Responsibility (EPR) planning|Material recovery and recycling validation|Zero-waste-to-landfill certification assistance"
        ],
        link: "/services/green-audits",
        icon: Droplet
      }
    ]
  },

  "staffing-managed": {
    id: "staffing-managed",
    label: "Staffing & Managed Services",
    title: "STAFFING & MANAGED COMPLIANCE SERVICES",
    shortDesc: "Dedicated compliance officers on contract, managed retainership, specialized staffing, and audit support.",
    items: [
      {
        id: "compliance-officers",
        title: "Dedicated Compliance Officers on Contract",
        description: "Deploy experienced compliance officers and company secretaries to manage your operations.",
        keyDetails: [
          "Experienced Officers|Immediate access to certified compliance professionals.|Dedicated full-time or fractional compliance officers|Qualified Company Secretaries (CS) and Legal Counsel|Specialized sector experience (BFSI, Pharma, Tech)",
          "Full On-Site Authority|On-site execution and regulatory agency management.|Day-to-day statutory register and filing oversight|Representation before statutory authorities|Internal stakeholder compliance training",
          "Zero Overhead Liability|Flexible contract terms without long-term liabilities.|Flexible contract terms with pre-vetted specialists|Seamless replacement guarantees without disruption|Complete payroll, benefits, and insurance handled"
        ],
        link: "/staffing/compliance-officers",
        icon: UserPlus
      },
      {
        id: "managed-retainership",
        title: "Managed Compliance Retainership",
        description: "Turnkey, SLA-governed compliance retainership handling all statutory obligations.",
        keyDetails: [
          "Guaranteed SLAs|Fixed monthly retainership with 99.9% assurance.|Penalty indemnity guarantees under defined SLAs|Guaranteed response times for regulatory notices|Weekly progress reporting to management",
          "End-to-End Governance|We take 100% operational accountability for filings.|Central, State, and Municipal compliance execution|Routine license renewals and inspection preparation|Centralized digital repository maintenance",
          "Executive Dashboard|Real-time transparency for corporate management.|Executive compliance health scorecard|Automated compliance calendar with progress updates|Quarterly board-ready risk and compliance briefings"
        ],
        link: "/staffing/managed-retainership",
        icon: ShieldCheck
      },
      {
        id: "specialized-temp-staffing",
        title: "Temporary & Specialized Staffing",
        description: "Agile, specialized talent for seasonal spikes, regulatory changes, and remediation.",
        keyDetails: [
          "Rapid Deployment|Ready-to-deploy talent within 48 to 72 hours.|On-demand staffing for seasonal compliance peaks|Specialized experts for new regulatory rollouts (DPDP/BRSR)|Project-specific contract durations",
          "Domain Experts|Specialists across every niche compliance vertical.|Labour law and payroll compliance experts|Environmental engineers for SPCB/CTE/CTO|Tax and transfer pricing documentation analysts",
          "Scalable Workforce|Scale your compliance team up or down on demand.|Flexible headcount expansion without hiring friction|Pan-India deployment capability across 28 states|Comprehensive statutory compliance on our payroll"
        ],
        link: "/staffing/specialized-temp-staffing",
        icon: Users
      },
      {
        id: "audit-defense-staffing",
        title: "Audit Support & Defense Staffing",
        description: "On-site taskforces managing audits, historical remediation, and regulator queries.",
        keyDetails: [
          "On-Site Taskforce|Elite teams deployed to manage complex audits.|Dedicated war-room support during agency inspections|Systemematic evidence collation and sampling reviews|Reconciliation of multi-year historical records",
          "Remediation Drills|Rapid turnaround of audit findings and non-compliances.|Root cause analysis and fast-track remediation|Corrective and Preventive Action (CAPA) drafting|Formal rebuttal drafting for show-cause notices",
          "Clean Audit Deliveries|Protect reputation and ensure successful sign-offs.|Liaison with statutory, tax, and labor auditors|Audit closure certificate acquisition|Post-audit internal control hardening"
        ],
        link: "/staffing/audit-defense-staffing",
        icon: FileCheck
      },
      {
        id: "sectoral-workforce",
        title: "Sectoral Workforce Deployment",
        description: "Trained workforce solutions for healthcare, manufacturing, facility management, and IT campuses.",
        keyDetails: [
          "Healthcare & Hospitals|Verified, NABH/JCI protocol trained medical workforce.|Hospital housekeeping & biomedical waste handling|Patient transport and infection control specialists|Credential-verified nursing and allied health staff",
          "Manufacturing & Plants|Skilled operators and floor supervisors adhering to safety.|Assembly line operators and machine technicians|Strict adherence to industrial safety and DISH protocols|Scalable workforce for peak production cycles",
          "Facilities & Campuses|Integrated facility upkeep, HVAC, and corporate services.|24/7 technical maintenance (electrical, plumbing, HVAC)|Corporate park and IT campus housekeeping|100% statutory labor law compliance guaranteed"
        ],
        link: "/staffing",
        icon: Factory
      }
    ]
  }
};

export const offeringsList = [
  { id: "regulatory-compliance", label: "Regulatory Compliance" },
  { id: "labour-employment", label: "Labour & Employment" },
  { id: "taxation-trade", label: "Taxation & Trade" },
  { id: "environmental-ehs", label: "Environmental & EHS" },
  { id: "supply-chain", label: "Supply Chain Compliance" },
  { id: "export-trade", label: "Export & Trade Services" },
  { id: "licensing-permits", label: "Licensing & Permits" },
  { id: "escrow-services", label: "Escrow Services" },
  { id: "risk-management", label: "Risk Management" },
  { id: "enterprise-governance", label: "Enterprise Governance" },
  { id: "cybersecurity-data", label: "Cybersecurity & Data Privacy" },
  { id: "esg-sustainability", label: "ESG & Sustainability" },
  { id: "staffing-managed", label: "Staffing & Managed Services" },
];

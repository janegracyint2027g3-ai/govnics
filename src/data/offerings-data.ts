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
  standards: string[];
  slaBadge: string;
  items: OfferingSubItem[];
}

export const offeringsData: Record<string, OfferingCategory> = {
  "regulatory-compliance": {
    id: "regulatory-compliance",
    label: "Regulatory Compliance",
    title: "REGULATORY COMPLIANCE",
    shortDesc: "End-to-end statutory tracking, audit readiness, and penalty defense across central and state regulators.",
    standards: ["RBI Master Directions", "SEBI LODR / ICDR", "CPCB / SPCB Norms", "MCA E-Filing", "TRAI Guidelines", "GST Statutory Rules"],
    slaBadge: "100% Audit Readiness • Zero Penalties Guarantee",
    items: [
      {
        id: "statutory-tracking",
        title: "Statutory Tracking & Mapping",
        description: "Continuous monitoring and mapping across RBI, SEBI, TRAI, CPCB, MCA, and Central/State authorities.",
        keyDetails: [
          "Multi-Agency Scope|Complete tracking across 12+ regulatory bodies.|RBI master directions & circular mapping|SEBI LODR & ICDR disclosure tracking|MCA portal e-form filings & secretarial monitoring|TRAI, IRDAI, and CPCB regulatory mandate tracking|Central and State legislative gazette continuous surveillance",
          "Real-Time Alerts|Zero-lag notification engine for regulatory amendments.|Daily gazette notifications & circular impact alerts|Automated deadline calculation with escalation loops|CXO & Board compliance dashboard integration|Regulatory change severity scoring and impact analysis|Automated rule dissemination to department compliance champions",
          "Industry Coverage|Specialized compliance across high-scrutiny sectors.|BFSI capital adequacy & liquidity norm validation|Pharma GxP & CDSCO manufacturing compliance|Telecom license & spectrum fee adherence|Fintech payment aggregator compliance protocols|Automotive AIS and safety standard certification tracking"
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldCheck
      },
      {
        id: "audit-readiness",
        title: "100% Audit Readiness Programs",
        description: "Pre-audit verification drills, digital evidence vaults, and regulatory inspection defense protocols.",
        keyDetails: [
          "Pre-Audit Verification|Mock inspections simulating statutory audits.|Rigorous gap assessment against agency mandates|Sampling tests of operational compliance registers|Comprehensive pre-audit scoring and heat maps|Root-cause diagnostic on procedural deviations|Departmental corrective action plan (CAPA) implementation",
          "Digital Evidence Vault|Centralized, tamper-evident document vault.|Time-stamped statutory challans & receipts|Role-based evidence indexing for swift retrieval|Multi-year audit trail preservation|Cryptographic hashing guaranteeing document integrity|Granular permission controls with full access audit logs",
          "Regulatory Defense|Hands-on liaison and defense during official audits.|Dedicated GRC specialist on-site representation|Formal responses to show-cause notices & queries|Post-audit corrective action plan (CAP) closure|Inspector query resolution and statutory reconciliations|Appellate tribunal brief preparation and evidence packaging"
        ],
        link: "/services/audit-readiness",
        icon: FileCheck
      },
      {
        id: "automated-registers",
        title: "Automated Digital Registers",
        description: "Transform error-prone physical registers into cloud-synchronized, immutable digital logs.",
        keyDetails: [
          "Digital Logbooks|Automated register creation per statutory templates.|Real-time automated entry population|Multi-location register synchronization|Version-controlled amendment history|Standardized master templates across all state rules|Immutable change logs for statutory inspector review",
          "Error Elimination|Intelligent validation rules stopping manual errors.|Algorithmic statutory calculation checks|Duplicate entry and omission detection|Automated supervisor review workflows|Field-level anomaly alerts preventing non-compliance fines|Real-time input validation against statutory schedules",
          "Instant Extraction|One-click export for regulatory submissions.|Formatted PDF/Excel outputs matching statutory forms|API connectors for ERP and HRMS integration|Secure electronic signature endorsement|Scheduled statutory return generation pipelines|Automated dispatch to regulatory portals and email inboxes"
        ],
        link: "/services/regulatory-compliance",
        icon: FileText
      },
      {
        id: "penalty-prevention",
        title: "Penalty & Prosecution Prevention",
        description: "Proactive safeguards and financial liability protection against statutory defaults.",
        keyDetails: [
          "Zero-Lag Calendars|Proactive countdown to all statutory deadlines.|Auto-scheduled filing reminders via SMS/Email/Slack|Buffer day margins preventing last-minute rushes|Centralized master compliance calendar across all entities|Multi-calendar synchronization across Google, Outlook, and ERP|Statutory holiday and state banking calendar adjustments",
          "Escalation Workflows|Multi-tiered intervention for at-risk compliance tasks.|Tiered escalation alerts to Unit Heads & CXOs|Emergency response protocol for overdue items|Root cause diagnostic on near-miss deadlines|Automated ticket assignment to specialized external counsel|Real-time risk scoring impact on executive scorecards",
          "Liability Protection|Shielding directors and officers from personal liability.|Director KMP indemnification documentation|Compounding of offenses advisory and representation|Legal opinion and statutory dispute mitigation|Section 442 mediation and compounding petitions before ROC|Board liability shield documentation under Companies Act"
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldAlert
      },
      {
        id: "board-reporting-compliance",
        title: "Board & Audit Committee Briefings",
        description: "Quarterly statutory compliance certificates and executive risk heat maps for directors.",
        keyDetails: [
          "Compliance Certificates|Quarterly CEO/CFO statutory compliance sign-offs.|Section 134 compliance reporting documentation|Consolidated compliance status across 50+ operating laws|Exception reports highlighting open non-compliance items|Formal statutory compliance certificate for Audit Committee|Director personal liability insulation declarations",
          "Risk Heat Maps|Visual multi-dimensional compliance risk dashboards.|Inherent vs residual risk scoring by operating subsidiary|Penalty exposure estimates and financial provision models|Trend analysis tracking compliance resolution velocity|Peer benchmarking against industry compliance standards|Prioritized executive remediation roadmaps",
          "Regulatory Scrutiny Drills|Board-level preparation for major regulatory inspections.|RBI and SEBI supervisory visit mock briefings|Corporate governance audit readiness validation|Whistleblower case registers and remediation disclosures|Independent Director briefings on statutory obligations|Post-inspection corrective action sign-offs"
        ],
        link: "/services/regulatory-compliance",
        icon: Scale
      },
      {
        id: "sector-regulatory-charters",
        title: "Sector-Specific Regulatory Charters",
        description: "Tailored regulatory frameworks for BFSI, Healthcare, Energy, Telecom, and Tech.",
        keyDetails: [
          "BFSI & Fintech|Adherence to RBI master directions and NBFC frameworks.|Digital lending guidelines and FLDG risk caps|Fair practices code and ombudsman grievance mechanisms|Capital adequacy ratio (CRAR) compliance reporting|Outsourcing of financial services risk controls|AML, KYC, and PMLA transaction monitoring protocols",
          "Energy & Utilities|Compliance with CERC, SERC, and Electricity Act rules.|Open access regulations and tariff filing schedules|Renewable Purchase Obligation (RPO) compliance audits|Grid connectivity code and statutory safety certificates|Pollution control norms for thermal and captive plants|CEA electrical safety inspection certifications",
          "Telecom & Technology|Licensing, spectrum, and data intercept regulations.|DoT Unified License (UL) adherence and AGR filings|Emergency communication protocols and lawful intercept compliance|TRAI tariff reporting and quality of service (QoS) rules|Satellite communication and space sector licensing norms|Cyber resilience audits for critical telecom infrastructure"
        ],
        link: "/services/regulatory-compliance",
        icon: Building
      }
    ]
  },

  "labour-employment": {
    id: "labour-employment",
    label: "Labour & Employment",
    title: "LABOUR & EMPLOYMENT COMPLIANCE",
    shortDesc: "Comprehensive adherence to PF, ESI, Minimum Wages, Contract Labour, and Labour Codes across all Indian states.",
    standards: ["Factories Act 1948", "Code on Wages 2019", "POSH Act 2013", "EPFO & ESIC Acts", "CLRA 1970", "LWF State Rules"],
    slaBadge: "Principal Employer Liability Shield • 100% Wage Compliance",
    items: [
      {
        id: "labour-law-statutory",
        title: "Labour Laws & 4 Labour Codes",
        description: "End-to-end statutory compliance across Factories Act, Shops & Establishments, and the 4 Labour Codes.",
        keyDetails: [
          "Code on Wages|Complete readiness for new wage definition norms.|Basic pay and allowance restructuring advisory|Minimum wages notification updates per state|Overtime, bonus, and leave encashment audits|Statutory wage slip standardization and digital records|Executive liability shielding under unified wage codes",
          "State-Wise Coverage|Seamless adherence across all 28 states & 8 UTs.|Shops & Establishments registration & renewals|Standing Orders drafting and state certification|Annual returns and statutory notices display|Local festival holiday notifications compliance|State Labour Commissioner notice representations",
          "Factory Regulations|Safety, welfare, and working condition adherence.|Factory license acquisition, renewal, and amendment|Health and safety register maintenance|Inspector of Factories compliance verification|Factory building plan and stability approval renewals|Hazardous process worker welfare documentation"
        ],
        link: "/services/labour-law-compliance",
        icon: Users
      },
      {
        id: "contract-labour",
        title: "Contract Labour (CLRA) Governance",
        description: "Robust safeguards against co-employment liabilities under the Contract Labour (R&A) Act.",
        keyDetails: [
          "Principal Employer Shield|Insulate enterprise assets from vendor defaults.|CLRA registration and license threshold tracking|Form V issuance and contractor vendor verification|Co-employment risk prevention frameworks|Independent contractor agreement vetting and indemnities|Direct control avoidance protocols on shop floors",
          "Contractor Payroll Audits|Verification of vendor minimum wages and deductions.|Monthly wage sheet and bank payout verification|PF, ESI, and LWF deposit challan reconciliation|Vendor non-compliance penalty recovery support|Wage slip distribution and biometric attendance matching|Joint inspection and contractor compliance scorecards",
          "Subcontractor Diligence|Comprehensive auditing of secondary vendor tiers.|Tier-2 contractor registration validation|Site-level worker safety & welfare checks|Contractual indemnity & liability clause advisory|Vendor pass-through payment auditing|Master vendor non-compliance blacklisting advisory"
        ],
        link: "/services/contract-labour",
        icon: Factory
      },
      {
        id: "payroll-statutory",
        title: "Payroll Statutory (PF/ESI/PT/LWF)",
        description: "Flawless computation and deposit of employee statutory benefits across all operations.",
        keyDetails: [
          "PF & ESI Management|Complete monthly challan generation and filing.|Universal Account Number (UAN) generation & seeding|ESI monthly contribution and dispensaries mapping|EPFO inspection handling and notice defense|International worker PF compliance and exemptions|Damages and interest notice dispute resolution (7A/14B)",
          "State PT & LWF|Precise deductions across multi-state workforces.|State-specific professional tax slab calculation|Labour Welfare Fund (LWF) bi-annual deposits|Timely statutory annual return submissions|Assessment orders and recovery notice management|State-wide PT registration across all branches",
          "Gratuity & Benefits|Actuarial compliance and trust fund governance.|Payment of Gratuity Act calculation & claims|Maternity Benefit Act leave and crèche compliance|Equal Remuneration Act payroll audits|Statutory bonus calculation and Form D filing|Employee Compensation Act insurance management"
        ],
        link: "/services/payroll-statutory",
        icon: Coins
      },
      {
        id: "employment-posh",
        title: "POSH & Workplace Equality",
        description: "Institutionalizing prevention of sexual harassment, fair workplace charters, and audit defense.",
        keyDetails: [
          "POSH Framework|Legal constitution of Internal Committee (IC).|External expert member empanelment|Annual POSH report filing with District Officer|Policy drafting compliant with POSH Act 2013|IC member tenure tracking and reconstitutions|Gender-neutral workplace policy harmonization",
          "Training & Sensitization|Organization-wide awareness and leadership workshops.|Mandatory employee e-learning modules|IC member inquiry procedure masterclasses|Managerial unconscious bias workshops|Annual refresher courses with digital completion records|Specialized training for night-shift female staff safety",
          "Inquiry & Defense|Defensible documentation during workplace disputes.|Legally compliant inquiry procedure execution|Impartial report drafting & recommendation notes|Conciliation and settlement advisory support|Appellate court and writ petition defense support|Confidential witness protection protocols"
        ],
        link: "/services/hr-policy-governance",
        icon: Scale
      },
      {
        id: "fixed-term-gig-workforce",
        title: "Fixed-Term & Gig Workforce Norms",
        description: "Adherence to Fixed Term Employment (FTE) rules, platform aggregator norms, and social security.",
        keyDetails: [
          "Fixed-Term Employment|Structuring compliant FTE contracts and benefits.|Proportionate statutory benefits calculation for FTEs|Gratuity entitlement on pro-rata basis under new codes|Separation and notice period legal compliance|FTE conversion and employment tenure tracking|Equal working conditions and wage parity verification",
          "Gig & Platform Workers|Readiness for Social Security Code aggregator schemes.|Aggregator registration with state and central boards|Contribution calculations to Social Security Fund|Worker welfare board enrollment support|Accident and disability insurance policy tracking|Fair dispute resolution process establishment",
          "Apprentice Act Rules|Statutory apprentice engagement and portal compliance.|NATS and NAPS portal registration and quota tracking|Monthly stipend reimbursement claim processing|Apprentice contract registration and assessments|Basic training and shop-floor safety induction|Annual returns and apprentice quota audits"
        ],
        link: "/services/labour-law-compliance",
        icon: Users
      },
      {
        id: "factory-welfare-safety",
        title: "Shop Floor Welfare & Standing Orders",
        description: "Statutory certified standing orders, canteen committees, crèches, and safety welfare officers.",
        keyDetails: [
          "Standing Orders|Model and Certified Standing Orders compliance.|Drafting and certification under Industrial Employment Act|Disciplinary inquiry procedures and domestic inquiries|Charge sheet and suspension order drafting support|Trade union charter negotiations and settlements|Tribunal dispute representation on standing orders",
          "Welfare Infrastructure|Statutory compliance for shop floor amenities.|Canteen committee formation for 250+ worker plants|Crèche facility compliance for 50+ employee facilities|First aid box, ambulance room, and medical officer norms|Restroom, drinking water, and ventilation audits|Welfare officer appointment statutory mandates",
          "Disciplinary Inquiries|Defensible domestic inquiries and termination procedures.|Appointment of independent inquiry officers|Adherence to principles of natural justice|Detailed inquiry report and finding drafting|Defensible discharge/dismissal documentation|Labor court and industrial tribunal trial prep"
        ],
        link: "/services/labour-law-compliance",
        icon: Factory
      }
    ]
  },

  "taxation-trade": {
    id: "taxation-trade",
    label: "Taxation & Trade",
    title: "TAXATION & TRADE COMPLIANCE",
    shortDesc: "Direct and indirect tax advisory, transfer pricing, SEZ compliance, and customs duty optimization.",
    standards: ["GST Act 2017", "Income Tax Act 1961", "Customs Act 1962", "Foreign Trade Policy 2023", "FEMA / RBI Regulations"],
    slaBadge: "Zero ITC Mismatch • Defensible Transfer Pricing",
    items: [
      {
        id: "gst-compliance",
        title: "GST & Indirect Tax Governance",
        description: "End-to-end GST return filing, automated ITC reconciliation, and departmental audit defense.",
        keyDetails: [
          "Filing & Reconciliation|Error-free monthly and annual GST filings.|GSTR-1, 3B, and GSTR-9/9C reconciliation|Automated 2B vs Purchase Register ITC matching|Vendor follow-up for missing invoices|E-invoicing validation against GSTN repository|Automated reversal of ineligible credits under Rule 42/43",
          "E-Way & E-Invoicing|Real-time generation and compliance validation.|Automated IRN generation via GSTN sandbox|Multi-vehicle and consolidated e-way bill workflows|Error logs resolution and cancellation audits|Transit checkpoint inspection representation|Expiry alerts for long-haul transport consignments",
          "Audit & Notice Defense|Professional representation for GST scrutiny notices.|Form ASMT-10 notice response drafting|Pre-audit documentation and mock scrutiny drills|SCN dispute representation and litigation advisory|Departmental audit (Section 65) liaison & handling|Appeals drafting before Appellate Authority and Tribunal"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Building
      },
      {
        id: "direct-tax-tp",
        title: "Income Tax & Transfer Pricing",
        description: "Corporate tax returns, withholding tax (TDS), and arm's-length transfer pricing documentation.",
        keyDetails: [
          "Corporate Income Tax|Optimized returns and deduction verification.|Advance tax computation and estimation models|MAT and minimum tax credit calculation|Tax audit readiness under Section 44AB|Depreciation schedules and capital gains computation|Filing of Form 3CA/3CD and ITR-6 corporate returns",
          "Transfer Pricing Studies|Defensible global arm's-length benchmarking.|Master file and Local file documentation per BEPS|Country-by-Country Reporting (CbCR) filing|Advance Pricing Agreement (APA) advisory|Economic benchmarking using Prowess and Capitaline|Inter-company agreement structuring and TP defense",
          "Withholding Tax (TDS)|Error-free deduction and challan settlement.|Lower deduction certificate (Form 13) filing|Quarterly 24Q, 26Q, and 27Q return filing|TDS default notice (TRACES) resolution|Form 15CA/15CB certification for foreign remittances|TDS credit matching with Form 26AS and AIS"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Coins
      },
      {
        id: "customs-fema",
        title: "Customs, SEZ & FEMA Compliance",
        description: "Cross-border capital flow compliance, SEZ unit operations, and customs valuation.",
        keyDetails: [
          "Customs Valuation|Classification and duty drawback optimization.|Harmonized System (HS) code classification|Special Valuation Branch (SVB) representation|Project import and EPCG scheme benefits|Customs Post Clearance Audit (PCA) readiness|Bonded warehouse (Section 58/65) compliance",
          "SEZ Operations|Seamless management of Development Commissioner filings.|Monthly APR and Softex filing support|DTA sale permission and duty calculation|Zero-rated procurement documentation|SEZ exit / de-bonding advisory and filings|Net Foreign Exchange (NFE) earning compliance",
          "FEMA & RBI Adherence|Comprehensive Foreign Exchange Management compliance.|Form FC-GPR and FC-TRS filings for FDI/FPI|External Commercial Borrowing (ECB) reporting|FLA (Foreign Liabilities and Assets) return filing|Compounding applications before RBI for delays|Authorized Dealer (AD Bank) liaison and approval requests"
        ],
        link: "/services/customs-fema",
        icon: Scale
      },
      {
        id: "advance-rulings-litigation",
        title: "Tax Scrutiny, SCN & Litigation Defense",
        description: "End-to-end representation before Faceless Assessment Centers, CIT(A), and ITAT tribunals.",
        keyDetails: [
          "Faceless Assessments|Structured responses to Income Tax e-assessments.|Drafting factual and legal replies to Section 142(1)|Defense against additions under Section 68/69|Show-cause notice response under Section 148/148A|High-value transaction and AIS mismatch defenses|Pre-assessment video conference representation",
          "Appellate Litigation|Defensible appeals before CIT(A) and ITAT.|Form 35 appeal drafting and ground formulations|Paper book preparation and judicial precedent research|Representation before Commissioner of Income Tax (Appeals)|Appeal filings before Income Tax Appellate Tribunal (ITAT)|High Court tax appeal briefing and senior counsel support",
          "Dispute Resolution (DRC)|Fast-track settlement under statutory dispute panels.|Section 245MA dispute resolution committee filings|Penalty waiver and compounding of tax offenses|Viv विवाद se Vishwas and amnesty scheme advisory|Search and seizure post-operation disclosure filings|Stay of demand applications and recovery stays"
        ],
        link: "/services/taxation-trade-compliance",
        icon: ShieldAlert
      },
      {
        id: "moowr-bonded-tax-schemes",
        title: "Bonded Manufacturing & PLI Incentives",
        description: "Customs duty deferment under MOOWR scheme and PLI subsidy milestone documentation.",
        keyDetails: [
          "MOOWR Scheme Setup|Zero customs duty on capital goods and raw materials.|Section 65 Customs Act bonded warehouse licensing|Triple-duty software and digital ledger integration|Bond officer inspection and bond execution support|Zero-duty benefit on export-oriented goods|Domestic clearance duty calculation upon DTA sale",
          "PLI Documentation|Incentive claims under Production Linked Schemes.|Baseline year production and capex expenditure verification|Quarterly incentive disbursement application filing|Chartered Accountant and technical certs collation|Empaneled agency audit facilitation (IFCI/SIDBI)|Defense against incentive rejection or deduction notices",
          "Duty Remission Schemes|RoDTEP, RoSCTL, and Advance Authorization.|RoDTEP rate calculation and e-scrip management|Advance Authorization application and redemption|Export Obligation Discharge Certificate (EODC) closure|Duty Drawback All Industry Rates (AIR) optimization|Ineligible benefit refund and interest computation"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Factory
      },
      {
        id: "cross-border-withholding",
        title: "Cross-Border Withholding & DTAA Advisory",
        description: "Section 195 withholding, Double Taxation Avoidance Agreements, and Permanent Establishment.",
        keyDetails: [
          "DTAA Treaty Relief|Leveraging international tax treaties to reduce tax cost.|Beneficial ownership evaluation under MLI rules|Tax Residency Certificate (TRC) and Form 10F verification|Lower withholding tax applications under Section 197|Royalty, FTS, and business profit taxation advisory|Capital gains treaty relief for foreign investors",
          "Form 15CA & 15CB|Statutory certification for foreign outward remittances.|Chartered Accountant certification on Form 15CB|Online filing and ARN generation on Form 15CA|Authorized Dealer bank remittance package verification|Withholding tax deposit challan reconciliation|Annual remittance reconciliation with income tax records",
          "Permanent Establishment|Mitigating PE exposure for multinational enterprises.|Fixed place, agency, and service PE risk assessments|Virtual and digital PE risk analysis under Equalization Levy|Secondment and expat payroll taxation structuring|Transfer pricing attribution of profits to PEs|Mitigation of prosecution risks for foreign directors"
        ],
        link: "/services/taxation-trade-compliance",
        icon: Globe
      }
    ]
  },

  "environmental-ehs": {
    id: "environmental-ehs",
    label: "Environmental & EHS",
    title: "ENVIRONMENTAL, HEALTH & SAFETY (EHS)",
    shortDesc: "Statutory adherence to Pollution Control Boards, MoEFCC, waste rules, and factory safety certifications.",
    standards: ["Water & Air Acts", "Environment Protection Act", "E-Waste Rules 2022", "Hazardous Waste Rules", "Plastic EPR Portal", "ISO 14001"],
    slaBadge: "100% On-Time Consent Renewals • Zero Closure Notices",
    items: [
      {
        id: "consent-clearances",
        title: "Environmental CTE/CTO Consents",
        description: "Complete statutory consent lifecycle management across State and Central Pollution Control Boards.",
        keyDetails: [
          "CTE & CTO Approvals|Fast-track Consent to Establish & Operate.|SPCB application preparation and portal submission|Environmental Management Plan (EMP) drafting|Site inspection facilitation and query handling|Effluent and emission baseline parameter modeling|Consent renewal timeline and capital fee audit",
          "Renewal Management|Never face plant shutdown due to expired consents.|90-day advance renewal notification triggers|Form-IV and Form-V environmental statement filings|Capital investment verification and fee audit|Online Continuous Emission Monitoring (OCEMS) integration|Post-consent compliance report submissions to PCB",
          "Liaison & Defense|Official liaison with regional PCB officers.|Show-cause notice and closure direction handling|Bank guarantee compliance and release support|Discharge standards compliance defense|Appeals before National Green Tribunal (NGT)|Site remediation and mitigation plan execution"
        ],
        link: "/services/environmental-ehs",
        icon: Leaf
      },
      {
        id: "waste-management",
        title: "Hazardous, E-Waste & Plastic Rules",
        description: "Adherence to Waste Management Rules, manifest tracking, and Extended Producer Responsibility (EPR).",
        keyDetails: [
          "Hazardous Waste Rules|Strict compliance with Form-4 and Form-10 manifests.|Authorized TSDF membership and manifest tracking|Hazardous waste storage area labeling compliance|Annual return submission to SPCB|Emergency response protocols for hazardous chemical spills|Transboundary movement and recycling authorization",
          "EPR Registration & Credits|End-to-end Producer Responsibility management.|CPCB portal registration for Plastic & E-Waste|Accredited recycler empanelment & credit sourcing|Annual EPR fulfillment certificate acquisition|Brand owner and producer compliance audits|State-wise plastic waste collection modeling",
          "Battery & Bio-Medical|Compliant disposal protocols and documentation.|Battery Waste Management Rules 2022 filings|Bio-medical waste color-coded segregation audits|Manifest verification and disposal audit trails|Authorized collection center tie-ups and auditing|Quarterly return filing on central EPR portals"
        ],
        link: "/services/waste-management",
        icon: Droplet
      },
      {
        id: "workplace-safety",
        title: "Factory & Workplace Safety Audits",
        description: "Statutory safety committee setups, fire safety certifications, and HAZOP assessments.",
        keyDetails: [
          "Industrial Safety Audits|Deep-dive hazard identification across shop floors.|Comprehensive Factories Act safety compliance|HAZOP and Risk Assessment studies|Machine guarding and electrical safety checks|LOTO (Lockout/Tagout) procedure implementations|Workplace ergonomics and illumination surveys",
          "Fire & Emergency NOC|Multi-tier fire safety certifications.|Fire department building plan sanction|Fire prevention equipment commissioning and NOC|Periodic renewal and annual fire safety certificate|Hydrant, sprinkler, and alarm system testing certs|Emergency evacuation mock drill documentation",
          "Occupational Health|Medical surveillance and worker safety records.|Annual employee medical checkup compliance|Form-32 health register maintenance|PPE compliance and MSDS display verification|Factory medical officer statutory appointments|Canteen hygiene and food testing certificates"
        ],
        link: "/services/workplace-safety",
        icon: ShieldCheck
      },
      {
        id: "groundwater-cgwa-noc",
        title: "CGWA NOC & Water Abstraction Audits",
        description: "Groundwater extraction clearances, telemetry flow meters, and artificial recharge compliance.",
        keyDetails: [
          "CGWA NOC Clearances|Securing mandatory groundwater withdrawal NOCs.|Hydrogeological impact assessment study reports|Rainwater harvesting and artificial recharge plan approval|Central Ground Water Authority online application filing|Geotagged piezometer telemetry installation oversight|Annual water audit reports by certified auditors",
          "Telemetry & Flow Meters|Strict adherence to ultrasonic telemetry mandates.|Calibrated digital water flow meter installation|Real-time data transmission to CGWA/SPCB cloud servers|Daily, monthly, and annual water balance logs|Water conservation and recycling recycling logs|Zero groundwater abstraction penalty defense",
          "Water Neutrality|Sustainable water management and recharge projects.|Design of injection wells and rainwater collection trenches|Water recycling via ETP/STP treated water reuse|Third-party verification of groundwater recharge|Statutory groundwater impact modeling|Annual CGWA NOC renewal filings and inspections"
        ],
        link: "/services/environmental-ehs",
        icon: Droplet
      },
      {
        id: "air-noise-pollution-control",
        title: "Stack Emissions & Ambient Air Quality",
        description: "Adherence to ambient noise levels, stack emission norms, and continuous emission monitoring (CEMS).",
        keyDetails: [
          "CEMS & Stack Monitoring|Online Continuous Emission Monitoring Systems.|Stack height and sampling port design verification|Real-time particulate matter (PM) and SOx/NOx telemetry|CEMS analyzer calibration and connectivity to CPCB server|Periodic stack emission testing by MoEF recognized labs|Flue gas desulfurization (FGD) compliance monitoring",
          "Ambient Air & Noise|Monitoring plant boundary environmental parameters.|Quarterly ambient air quality monitoring (AAQM)|Day and night industrial noise level surveys|Diesel generator (DG) set acoustic enclosure certs|DG stack height compliance per CPCB formula|Fugitive emission control and dust suppression logs",
          "SPCB Show-Cause Defense|Expert technical response to pollution default notices.|Detailed technical rebuttals to emission exceedance notices|Remediation action plans for scrubber and bag filter units|Bank guarantee forfeiture prevention and resolution|Representation before Chairman/Member Secretary of SPCB|Site re-inspection assistance and closure order recalls"
        ],
        link: "/services/environmental-ehs",
        icon: Activity
      },
      {
        id: "esg-ehs-readiness",
        title: "ESG EHS Readiness & Decarbonization",
        description: "Transform compliance data into audit-grade environmental disclosures for global investors.",
        keyDetails: [
          "Baseline Metrics|Accurate tracking of carbon, water, and waste.|Resource consumption accounting and intensity ratios|Scope 1 & Scope 2 baseline emission mapping|Effluent Treatment Plant (ETP) performance logs|Energy audit recommendations implementation|Zero Liquid Discharge (ZLD) plant compliance tracking",
          "Regulatory Alignment|Transition readiness for SEBI BRSR and GRI.|Principle 6 environmental disclosures support|Water neutrality and Zero Liquid Discharge (ZLD)|Circular economy and zero-waste-to-landfill|Hazardous chemical inventory digitalization|Sustainable packaging and life-cycle assessment (LCA)",
          "Green Certifications|Preparation for IGBC, LEED, and ISO 14001.|ISO 14001 EMS gap analysis and documentation|Internal environmental audit framework setup|Environmental performance dashboard deployment|Green building carbon neutral credits facilitation|Global supply chain ESG rating improvement"
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
    standards: ["Vendor POSH Audits", "Contract Labour CLRA", "ISO 20400", "Anti-Bribery (FCPA/UKBA)", "Supply Chain BRSR"],
    slaBadge: "100% Tier-1 Vendor Audit Pass Rate • Anti-Bribery Proof",
    items: [
      {
        id: "vendor-due-diligence",
        title: "Vendor & Third-Party Due Diligence",
        description: "Automated pre-onboarding compliance verification and continuous risk scoring of suppliers.",
        keyDetails: [
          "Pre-Onboarding Screening|Automated statutory verification before vendor activation.|GST, PAN, PF, and ESI active status check|Court records, negative news, and PEP screening|Financial health and credit rating assessment|Beneficial ownership and sanction list verification|Director disqualification checks on MCA portal",
          "Tiered Risk Profiling|Classify suppliers by compliance exposure.|Critical vs non-critical vendor categorization|Multi-factor compliance scoring algorithm|Vendor compliance health dashboard|High-risk vendor high-frequency audit triggers|Supplier risk register integration into enterprise ERP",
          "Continuous Overwatch|Real-time monitoring for compliance infractions.|Instant alerts on vendor GST cancellation or default|Labour law violation and strike tracking|Annual vendor re-certification campaigns|Vendor regulatory non-compliance early warning flags|Automated vendor master freeze upon critical breach"
        ],
        link: "/services/supply-chain-compliance",
        icon: Building
      },
      {
        id: "vendor-payroll-statutory-audits",
        title: "Tier-1 & Tier-2 Contractor Wage Audits",
        description: "Physical and digital audits verifying vendor minimum wage, PF, ESI, and statutory deposits.",
        keyDetails: [
          "Wage Sheet Verification|Ensuring zero wage leakage across contractor workforces.|Monthly contractor wage register cross-verification|Minimum wage notification compliance per state zone|Proof of direct electronic bank disbursement to workers|Overtime calculation and paid leave encashment audit|Pay slip issuance verification on contractor sites",
          "PF & ESI Reconciliation|Challan matching eliminating principal employer default.|ECR challan verification against deployed headcount|TRRN payment receipt validation on EPFO/ESIC portal|Labour Welfare Fund (LWF) deposit verification|Professional Tax (PT) contractor state filings audit|Vendor billing clearance conditional upon challan match",
          "Sub-Contractor Audits|Extending compliance beyond primary tier vendors.|Tier-2 and tier-3 labor contractor licensing checks|Preventing unauthorized multi-tier subcontracting|Site safety pass and PPE verification for sub-contractors|Master contractor liability indemnity enforcement|Remediation and penalty holdbacks for defaulting vendors"
        ],
        link: "/services/supply-chain-compliance",
        icon: Users
      },
      {
        id: "supply-chain-esg",
        title: "Supply Chain ESG & Sustainability",
        description: "Scope 3 supply chain decarbonization, human rights due diligence, and ethical sourcing.",
        keyDetails: [
          "Scope 3 Accounting|Precise supplier carbon footprint quantification.|Spend-based and activity-based Scope 3 data collection|Supplier emission reduction engagement programs|Carbon reporting ready for BRSR Principle 6|Primary supplier carbon emissions data verification|Supplier energy efficiency and renewable energy adoption",
          "Ethical & Human Rights|Auditing labor standards across supplier facilities.|Child labor and forced labor prohibition verification|Fair wage and working hour compliance audits|Supplier Code of Conduct rollout and adoption|Living wage assessments across high-risk vendor tiers|Whistleblower channel accessibility for contract workers",
          "Responsible Sourcing|Verification of raw material provenance.|Conflict minerals and deforestation-free checks|Sustainable packaging and recycled content audits|Chain-of-custody documentation verification|Supplier green logistics and zero-emission transit|Circular economy and waste return commitments"
        ],
        link: "/services/supply-chain-compliance",
        icon: Leaf
      },
      {
        id: "anti-bribery-abac-compliance",
        title: "Anti-Bribery & FCPA Vendor Governance",
        description: "Preventing corruption risks across procurement, liaison agents, and distribution channels.",
        keyDetails: [
          "ABAC Policy Framework|Comprehensive anti-bribery policies for vendor networks.|Adherence to Prevention of Corruption Act and FCPA|Supplier Code of Business Conduct drafting and rollout|Gift, hospitality, and entertainment threshold logging|Facilitation payment prohibition enforcement|Pre-contract ABAC representations and certifications",
          "Liaison Agent Audits|Rigorous monitoring of third parties interacting with officials.|Enhanced due diligence on customs brokers and clearing agents|Permit liaison agency fee breakdown verification|Red flag identification in commission and success fee structures|Mandatory expense substantiation and voucher audits|High-risk intermediary anti-bribery compliance certs",
          "Whistleblower & Hotline|Confidential reporting channel for vendor fraud.|Multi-channel anonymous grievance hotline|Independent investigation of supplier kickback allegations|Procurement fraud forensic review and evidence collation|Vendor debarment and blacklisting legal procedures|Commercial contract termination for integrity breach"
        ],
        link: "/services/supply-chain-compliance",
        icon: ShieldCheck
      },
      {
        id: "logistics-distributor-compliance",
        title: "Distributor & 3PL Logistics Governance",
        description: "Regulatory adherence across warehousing, transport fleet, e-way bills, and transit insurance.",
        keyDetails: [
          "Warehousing Standards|Legal compliance for leased and 3PL warehouse sites.|Warehouse Shops & Establishments and Trade licenses|Fire safety NOC and structural stability certificates|Pollution control consent for warehouse washing bays|Pest control, hygiene, and FSSAI norms for food storage|Hazardous chemical storage authorization and MSDS",
          "Fleet & Transit Rules|Adherence to Motor Vehicles Act and transport safety.|Commercial vehicle fitness, PUC, and permit verification|Driver working hours and breath-analyzer logbooks|E-way bill validity extension monitoring in transit|Hazardous material (Hazmat) transport TREM card compliance|Transit insurance policy maintenance and claim support",
          "Distributor Governance|Monitoring retail network and distributor practices.|Price display and Legal Metrology packaging compliance|Anti-competitive practice and resale price maintenance prevention|Distributor GST filing status and tax invoice audits|FSSAI distributor license verification across states|Pharma distributor drug license and cold-chain compliance"
        ],
        link: "/services/supply-chain-compliance",
        icon: Anchor
      },
      {
        id: "contractual-monitoring",
        title: "Contractual Compliance & SLA Monitoring",
        description: "Continuous surveillance of vendor legal obligations, indemnity clauses, and insurance.",
        keyDetails: [
          "Clause Enforcement|Audit vendor compliance with statutory covenants.|Anti-bribery & anti-corruption (ABAC) clause checks|Data confidentiality and privacy covenants|Minimum wage revision pass-through compliance|Intellectual property ownership and protection clauses|Statutory audit rights and inspection covenants",
          "Insurance & Indemnity|Active tracking of policies protecting enterprise assets.|Workmen Compensation policy verification|Commercial General Liability (CGL) coverage checks|Policy expiry tracking and renewal alerts|Cyber liability insurance for tech and IT vendors|Co-insured endorsement certificates collation",
          "Penalty & Dispute Defense|Evidence-backed vendor SLA enforcement.|Non-compliance penalty deduction documentation|Vendor breach notices and legal cure periods|Alternate dispute resolution (ADR) assistance|Performance bank guarantee (PBG) claim assistance|Contractual termination and dispute defense filings"
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
    standards: ["Foreign Trade Policy 2023", "Customs Act 1962", "DGFT Schemes (RoDTEP/EPCG)", "FEMA / ECB Norms", "SCOMET Controls"],
    slaBadge: "Zero Port Demurrage • Maximized RoDTEP Claims",
    items: [
      {
        id: "export-documentation",
        title: "Export Documentation & Port Clearance",
        description: "Flawless paperwork across Shipping Bills, Bills of Lading, and Country of Origin certificates.",
        keyDetails: [
          "Pre-Shipment Documentation|Audit-proof shipping paperwork generation.|Proforma & Commercial Invoice generation per international Incoterms|Packing list, Certificate of Origin (COO), and GSP documentation|Electronic Shipping Bill (ESB) compilation and ICEGATE upload|Hazardous cargo declarations and IMO container packing certificates|Fumigation, phytosanitary & pre-shipment inspection certificates",
          "ICEGATE Customs Clearances|Swift clearance across Indian sea ports, airports, and ICDs.|Customs declaration and automated risk management (RMS) assessment|EDI portal real-time clearance tracking and officer query resolution|Special Economic Zone (SEZ) procurement & customs gate passes|Port terminal handling, CFS container carting & vessel gate-in escort|Detention and demurrage waiver coordination with shipping lines",
          "Post-Shipment Compliances|Banking, RBI, and regulatory closure for export flows.|Electronic Bank Realisation Certificate (e-BRC) portal reconciliation|Bill of Lading / Airway Bill statutory endorsement and archival|EDPMS regulatory entry closure with authorized dealer (AD) banks|Duty drawback (DBK) claim verification and electronic disbursal|Turnkey compliance with international documentary letters of credit (LC)"
        ],
        link: "/services/export-trade-services",
        icon: Anchor
      },
      {
        id: "dgft-ftp-advisory",
        title: "DGFT & Foreign Trade Policy (FTP)",
        description: "Maximizing incentives under RoDTEP, EPCG, and Advance Authorization schemes.",
        keyDetails: [
          "Advance Authorization|Duty-free import of inputs for export production.|Norms committee fixation and Standard Input Output Norms (SION)|Redemption of advance authorization licenses with DGFT regional offices|Invalidation letters and Advance Release Orders (ARO) procurement|Bond and bank guarantee execution and cancellation with Customs|Deemed export benefit claims and intermediate supplier endorsements",
          "EPCG Scheme Benefits|Zero-duty capital goods imports with export obligations.|Capital machinery installation certificate filing with chartered engineers|Export obligation fulfillment tracking and block-wise extension petitions|Redemption, clubbing, and nexus certificate filings with DGFT|Post-export EPCG duty credit scrip procurement and monetization|Liaison with customs commissionerates for bond cancellation",
          "Incentive Optimization|Timely claiming and monetization of export promotion benefits.|Remission of Duties and Taxes on Exported Products (RoDTEP) reconciliation|RoSCTL rebate claims for textiles, apparel, and made-ups|Status Holder (One Star to Five Star Export House) certificate issuance|DGFT IEC code profile updates, port additions, and RCMC renewals|Duty Drawback All Industry Rates (AIR) and brand rate fixation dossiers"
        ],
        link: "/services/export-trade-services",
        icon: Globe
      },
      {
        id: "moowr-bonded-manufacturing",
        title: "MOOWR & Customs Bonded Warehousing",
        description: "Defer or eliminate customs duty on capital goods and raw materials under Section 65.",
        keyDetails: [
          "Licensing & Setup|End-to-end Section 65 private bonded warehouse enablement.|Application for customs private bonded warehouse license (Section 58)|Permission for in-bond manufacturing operations under Section 65|Customs bond execution and triple-duty bank guarantee optimization|Computerized inventory tracking system design meeting customs standards|Appointment of dedicated customs warehouse officer and lock-in protocols",
          "Working Capital Optimization|Indefinite duty deferment on capex machinery & raw materials.|Zero customs duty payment on imported machinery used for manufacturing|Exemption from payment of interest on deferred customs duties|No export obligation deadlines or minimum value addition constraints|Seamless conversion of bonded inventory for domestic tariff area (DTA) sale|Comprehensive reconciliation of input-output scrap and production wastage",
          "Audit & Registers|Statutory monthly returns and customs audit defense.|Maintenance of digital Annexure-B inventory registers with batch tracking|Preparation of monthly returns for Assistant Commissioner of Customs|Physical verification coordination and stock-taking audit escort|Discharge of duty upon domestic clearances with applicable BCD & IGST|Re-export of unsold or damaged raw materials without duty liability"
        ],
        link: "/services/export-trade-services",
        icon: Building
      },
      {
        id: "aeo-tier-accreditation",
        title: "AEO Accreditation (T1, T2, T3 & LO)",
        description: "Fast-track green-channel port clearance under Indian Customs Authorized Economic Operator program.",
        keyDetails: [
          "AEO Program Enrolment|Procurement of Tier-1, Tier-2, Tier-3 and Logistics Operator status.|Comprehensive pre-audit internal gap assessment across 50+ customs criteria|Legal compliance, financial solvency, and customs record verification|Commercial data security, transport safety, and procedural security audits|Compilation of Annexure-1 to Annexure-7 application dossiers for DIC|Liaison with Directorate of International Customs (DIC) for on-site audits",
          "Operational Fast-Tracking|Substantial reduction in cargo dwell times and customs friction.|Direct Port Delivery (DPD) and Direct Port Entry (DPE) access|Nil or minimal cargo physical examination by customs (green channel)|Deferred duty payment facility for eligible AEO-T2 and T3 tier holders|Exemption from bank guarantee requirements for DGFT and customs bonds|Dedicated customs relationship manager for prioritized dispute handling",
          "Global Mutual Recognition|Reciprocal customs privileges across international partner nations.|India Mutual Recognition Agreements (MRA) benefits across US, Korea, Taiwan|Expedited border crossing and overseas customs fast-track processing|Lower risk scoring in international port clearance automated engines|Enhanced global brand credibility with enterprise international buyers|Annual AEO compliance self-assessment and continuous certification maintenance"
        ],
        link: "/services/export-trade-services",
        icon: ShieldCheck
      },
      {
        id: "cross-border-regulatory",
        title: "Cross-Border Regulatory & Sanctions",
        description: "Screening transactions against global sanctions, OFAC lists, and dual-use export controls.",
        keyDetails: [
          "SCOMET Licensing|Dual-use goods, software, and technology export controls.|SCOMET Category 0 to Category 8 technical classification review|DGFT SCOMET export license application preparation and defense|End-user and end-use verification and EUC certificate validation|Internal Compliance Program (ICP) implementation for defense/tech exporters|Global Authorization for Intra-Company Transfers (GAICT) facilitation",
          "Sanctions & AML Screening|Enterprise defense against international trade penalties.|Real-time screening against US OFAC, UN Security Council, and EU lists|Vessel, container, and maritime freight carrier sanctions vetting|High-risk and transshipment jurisdiction enhanced due diligence|Counterparty beneficiary ownership and PEP compliance validation|Comprehensive trade audit documentation for international correspondent banks",
          "Trade Agreements|Maximize tariff savings via Free Trade Agreements (FTAs).|India-UAE CEPA, India-Australia ECTA, and ASEAN FTA tariff concessions|Rule of Origin (ROO) value-addition calculation and bill of materials audits|Certificate of Origin (COO) issuance via the DGFT digital platform|Protection against non-tariff barriers, anti-dumping, and safeguard duties|Duty impact forecasting for multi-country global supply chain sourcing"
        ],
        link: "/services/export-trade-services",
        icon: ShieldAlert
      },
      {
        id: "fema-edpms-settlement",
        title: "FEMA EDPMS / IDPMS Settlement & Advisory",
        description: "Regulatory reconciliation of inward remittances, trade credit, and cross-border bank entries.",
        keyDetails: [
          "EDPMS Reconciliation|Export Data Processing and Monitoring System overwatch.|Automated reconciliation of shipping bills against inward FIRCs|Resolution of export bill payment shortfalls and bank charges deduction|Liaison with authorized dealer banks for EDPMS entry closure|Extension of export realization period beyond statutory 9 months|Write-off of unrealized export bills within prescribed regulatory limits",
          "IDPMS Settlement|Import Data Processing and Monitoring System compliance.|Reconciliation of import Bill of Entry (BOE) against outward wire transfers|Resolution of Advance Remittance for Imports pending over 180 days|Submission of customs out-of-charge BOE documents to AD banks|Avoidance of RBI caution-listing and authorized dealer compliance notices|Regularization of unutilized import advance payments via lawful repatriation",
          "FEMA & Trade Finance|Statutory advisory across ECB, buyer's credit, and merchanting trade.|External Commercial Borrowing (ECB) reporting and Form ECB filings|Merchanting trade transaction (MTT) regulatory structuring and oversight|Overseas direct investment (ODI) and foreign subsidiary capital flows|Export advance received against long-term contracts and bank guarantees|Compounding of FEMA contraventions before the Reserve Bank of India"
        ],
        link: "/services/export-trade-services",
        icon: FileText
      }
    ]
  },

  "licensing-permits": {
    id: "licensing-permits",
    label: "Licensing & Permits",
    title: "LICENSING, PERMITS & APPROVALS",
    shortDesc: "Single-window procurement, tracking, and renewal of Central, State, and Municipal authorizations.",
    standards: ["Factories Act 1948", "Shop & Establishment Laws", "FSSAI / CDSCO / DoT", "CGWA / SPCB / MoEF", "RERA / RBI Licensing"],
    slaBadge: "Zero License Expiry Lapses • 500+ Permits Tracked",
    items: [
      {
        id: "central-state-licenses",
        title: "Central & State Business Registrations",
        description: "Single-window procurement of enterprise incorporation, tax, and commercial registrations.",
        keyDetails: [
          "Corporate Enablement|Central and state-level business enablement.|MCA company incorporation and director DIN filings|Pan-India GST, PAN, and TAN tax registrations|Startup India recognition and DPIIT seed benefits|MSME / Udyam registration with banking priority lending|Digital Signature Certificates (Class 3 DSC) lifecycle",
          "Commercial Licenses|Local municipal and administrative authorizations.|Municipal Trade License acquisition across municipal wards|Shops & Establishments registrations across 28 states & 8 UTs|State Professional Tax (PT) employer and employee enrollment|Labour Welfare Fund (LWF) establishment registration|Standing Orders certification and local magistrate notices",
          "Multi-Location Rollout|Rapid retail, warehouse, and branch network expansion.|Standardized multi-state licensing blueprints for rapid rollout|State-specific regulatory documentation harmonization|Centralized pan-India branch permit repository|Municipal advertisement, hoardings, and signage permissions|Turnkey liaison with local municipal corporators & ward engineers"
        ],
        link: "/services/licensing-permits",
        icon: Building
      },
      {
        id: "industrial-permits-noc",
        title: "Industrial Permits, Factory & Boiler Approvals",
        description: "End-to-end statutory approvals for factories, manufacturing bays, and industrial campuses.",
        keyDetails: [
          "Factory Approvals|Factory plan approval and machinery layout clearances.|Directorate of Industrial Safety & Health (DISH) site scrutiny|Machinery layout, ventilation & emergency egress vetting|Boilers, pressure vessels, and DG set approvals with testing logs|Electrical inspectorate clearances and CEA regulation compliance|Lifting machinery, cranes, and tackle annual load test certificates",
          "Operational Clearances|Critical manufacturing and utility certifications.|Weight and measures calibration verification under Legal Metrology|Industrial canteen hygiene and food safety inspector approvals|Explosives (PESO) solvent, petroleum & gas storage licensing|Static & Mobile Pressure Vessels (SMPV) compliance dossiers|Hazardous process notifications under the Factories Act Schedule",
          "Campus Commissioning|Turnkey clearance for greenfield and brownfield plants.|Industrial land allotment documentation with state IDC boards|Power utility high-tension (HT) connection clearances|Industrial water supply allocation and treated discharge agreements|Building completion and occupancy certificates (OC)|Local panchayat / municipality commercial operational NOC"
        ],
        link: "/services/licensing-permits",
        icon: Factory
      },
      {
        id: "environmental-cgwa-permits",
        title: "Pollution Clearances & Groundwater NOCs",
        description: "Comprehensive environmental consent management across CPCB, SPCB, and CGWA frameworks.",
        keyDetails: [
          "Pollution Board Consents|Consent to Establish (CTE) & Consent to Operate (CTO).|Air and Water Act statutory applications and site inspections|Effluent treatment plant (ETP) and sewage treatment design vetting|SPCB online portal submission, tracking, and query resolution|Annual environment statement (Form V) compilation and filing|Hazardous waste handling authorization (Form 2) acquisition",
          "Groundwater Extraction|Central Ground Water Authority (CGWA) authorizations.|Hydrogeological impact assessment and rain harvesting blueprints|Digital telemetry water flow meter installation and calibration|Borewell piezometer telemetry data submission to CGWA portal|Annual groundwater extraction compliance returns and audit prep|Water conservation and artificial recharge system certification",
          "Industrial Waste Authorizations|Hazardous, e-waste, and plastic waste permits.|Authorized TSDF vendor tie-up agreements and manifest tracking|Extended Producer Responsibility (EPR) registration with CPCB|Bio-medical waste authorization for industrial occupational health centers|Batteries and e-waste EPR quota purchase and compliance filing|Waste minimization audit and zero liquid discharge validation"
        ],
        link: "/services/licensing-permits",
        icon: Leaf
      },
      {
        id: "fire-structural-stability",
        title: "Fire Safety NOCs & Structural Stability",
        description: "Statutory building safety approvals, structural audits, and annual emergency clearances.",
        keyDetails: [
          "Fire Department Approvals|Multi-tier industrial and commercial fire certifications.|Fire department architectural building plan sanction|Fire detection, hydrants, sprinklers, and alarm commissioning|Fire safety compliance certificate and provisional/final NOC|Annual fire equipment inspection, pressure testing & renewal|Factory fire safety mock drill logs and trained warden registers",
          "Structural Stability|Chartered structural engineer certification.|Factory building structural stability certificates (Form 1A)|Roof load testing for solar panel and crane gantry installations|Wind load and seismic resistance certification for PEB sheds|Vibration analysis for heavy rotating industrial equipment|Periodic structural health audit reports for insurance underwriting",
          "Electrical Safety|Central Electricity Authority (CEA) clearances.|High-tension (HT) and low-tension (LT) transformer commissioning|Substation earthing resistance measurement and verification|Lightning protection system (LPS) audit and compliance certificate|DG set sync panel approval and electrical inspectorate licenses|Thermography audits for prevention of industrial electrical fires"
        ],
        link: "/services/licensing-permits",
        icon: ShieldAlert
      },
      {
        id: "sector-specific-permits",
        title: "Sector Permits (Pharma, Food, Telecom, PESO)",
        description: "Specialized regulatory authorizations for heavily controlled industrial sectors.",
        keyDetails: [
          "Food & Healthcare|Stringent public safety and health authorizations.|FSSAI Central & State license procurement and annual returns|CDSCO drug manufacturing (Form 25/28) and wholesale sale licenses|Atomic Energy Regulatory Board (AERB) medical diagnostic clearances|Clinical Establishments Act registration and municipal bio-waste approvals|Ayush ministry manufacturing licenses under Drugs & Cosmetics Act",
          "Telecom & Technology|Wireless, communications, and digital infrastructure permissions.|DoT WPC (Wireless Planning & Coordination) import and ETA licenses|Telecom infrastructure provider (IP-1) registration and compliance|Other Service Provider (OSP) registration and voice network norms|Standing Advisory Committee on Radio Frequency Allocation (SACFA)|Municipal Right-of-Way (RoW) and optical fiber laying permissions",
          "Chemicals & Energy|High-hazard exploitation and storage permits.|Petroleum and Explosives Safety Organization (PESO) approvals|Mining lease statutory clearances and IBM production return filings|Pollution control Board clearance for red-category chemical plants|Captive power plant grid synchronizing and wheeling approvals|Gas cylinder storage, filling, and road transport vehicle licensing"
        ],
        link: "/services/licensing-permits",
        icon: FileCheck
      },
      {
        id: "permit-lifecycle-tracking",
        title: "Permit Tracking & Renewal Engine",
        description: "Zero-expiry assurance through proactive timelines, automated alerts, and dedicated liaison.",
        keyDetails: [
          "Automated Expiry Radar|Proactive tracking engine preventing statutory lapse.|120, 90, 60, and 30-day multi-tier automated renewal triggers|Master dashboard tracking 500+ licenses across all enterprise units|Document archival of historical approvals & past inspection logs|Automated notification dispatch to plant managers & CXO desk|Real-time status integration with enterprise GRC calendar",
          "Turnkey Renewals|Hands-off statutory renewal processing managed by senior liaisons.|Turnkey preparation of statutory renewal dossiers & fees|Hands-on liaison with municipal, state & central inspectorates|Department inspection escort and compliance clarification|Challan payment reconciliation and stamped endorsement retrieval|Zero operational downtime and expedited department file movement",
          "Compliance Assurance|Guarantee continuous legality and director indemnity.|Executive risk heat map for pending renewals & renewals at risk|Digital certificate repository with tamper-evident QR verification|Audit committee quarterly governance packs & risk rating|Board-level statutory declaration & director liability defense|100% legal immunity against closure notices and compounding"
        ],
        link: "/services/licensing-permits",
        icon: KeyRound
      }
    ]
  },

  "escrow-services": {
    id: "escrow-services",
    label: "Escrow Services",
    title: "ESCROW & TRANSACTION SUPPORT SERVICES",
    shortDesc: "Independent, neutral custody of funds, source code, and commercial assets during high-value deals.",
    standards: ["Indian Contract Act 1872", "FEMA / RBI Regulations", "RERA Escrow Rules", "SEBI M&A Regulations", "ISO 27001 (Digital Vaults)"],
    slaBadge: "100% Fund Safety Guarantee • Blockchain-Verified Custody",
    items: [
      {
        id: "commercial-escrow",
        title: "Commercial & M&A Escrow Services",
        description: "Independent, neutral custody of transaction funds, shares, and assets during high-value deals.",
        keyDetails: [
          "M&A & Private Equity|Safeguard transaction funds during deal closing & earn-outs.|Indemnity and holdback escrow accounts for representations & warranties|Earn-out milestone payment custody with objective verification gates|Joint tripartite escrow agreement drafting, execution, and legal vetting|Depository participant (DP) share custody and escrowed stock pledges|Regulatory compliance with SEBI Takeover and M&A regulations",
          "Real Estate & Projects|RERA-compliant fund custody and project disbursements.|Dedicated 70% project development escrow account operations per RERA|Milestone-linked contractor and EPC payment releases against architect certificates|Land acquisition settlement escrow accounts protecting seller & buyer funds|Advance payment guarantee fund protection for infrastructure projects|Regular statutory reporting and independent chartered accountant audits",
          "Dispute-Free Settlement|Impartial third-party releases per strict contract conditions.|Bi-party verification protocols and dual-authorization digital signatures|Immediate legal freeze mechanism upon receipt of dispute notification|Neutral audit trails and financial logs ready for arbitration tribunals|Interest accrual optimization with top-tier scheduled commercial banks|Turnkey release management avoiding commercial litigation delays"
        ],
        link: "/services/escrow-services",
        icon: KeyRound
      },
      {
        id: "cross-border-escrow",
        title: "Cross-Border & Trade Escrow",
        description: "Mitigate non-payment and non-performance risks in international import-export contracts.",
        keyDetails: [
          "Trade Escrow|Safe global settlement without expensive Letters of Credit (LC).|Buyer payment custody pending bill of lading and customs verification|Seller guaranteed payment release immediately upon port delivery confirmation|Independent third-party cargo inspection and SGS milestone release|Protection against cargo rejection disputes and international fraud|Lower fee structure and faster settlement than documentary bank credits",
          "Cross-Border Transfers|Full adherence to RBI, FEMA, and international banking regulations.|Multi-currency escrow custody across USD, EUR, GBP, AED, and INR|Authorized Dealer Category-I bank integration and dedicated accounts|Form A2, FIRC, and FEMA regulatory documentation reconciliation|Strict anti-money laundering (AML) and international sanction screenings|Zero capital lock-in friction across cross-border corporate deals",
          "Supply Chain Finance|Controlled liquidity release across tiered manufacturing chains.|Tier-1 and Tier-2 vendor milestone payment accounts|Raw material inventory financing collateral custody and release|Tri-party escrow between enterprise buyer, OEM supplier, and NBFC financier|Early payment discount capture with guaranteed vendor settlements|Real-time digital dashboard tracking pan-India supply chain cashflows"
        ],
        link: "/services/escrow-services",
        icon: Globe
      },
      {
        id: "software-source-code-escrow",
        title: "Software Source Code & Tech Asset Vault",
        description: "Secure third-party escrow protecting mission-critical software, algorithms, and SaaS assets.",
        keyDetails: [
          "Source Code Vaulting|Protect mission-critical enterprise software and proprietary IP.|Automated encrypted Git repository mirroring and scheduled backups|Physical and cloud-isolated air-gapped cryptographic storage|Compilation testing and deployability verification (Cleanroom Build)|Escrow release triggers strictly tied to software vendor insolvency or SLA default|Legal ownership protection safeguarding enterprise tech continuity",
          "SaaS & Cloud Continuity|Ensure continuous uptime of cloud-hosted SaaS solutions.|Daily automated snapshots of cloud configuration and tenant databases|Disaster recovery mirror verification on independent cloud infrastructure|SaaS escrow agreement covering software licenses, APIs, and microservices|Pre-negotiated hosting transfer rights upon vendor corporate dissolution|Elimination of vendor lock-in risk for critical enterprise applications",
          "Technology Transfer|Secure IP holding during tech acquisitions and joint ventures.|Proprietary chemical formulas, CAD schematics, and patent blueprints custody|Milestone-based source code release upon technology acceptance testing|Trade secret access control management and non-disclosure governance|Independent technical expert review of deliverable documentation|Digital watermark tracking for intellectual property provenance"
        ],
        link: "/services/escrow-services",
        icon: Laptop
      },
      {
        id: "rera-real-estate-escrow",
        title: "RERA Project & Development Escrow",
        description: "Statutory 70% project fund management and developer withdrawal compliance under RERA.",
        keyDetails: [
          "RERA Compliance|Mandatory 70% project account governance across state RERAs.|Dedicated project bank account setup with scheduled commercial banks|Ensuring 100% of collection proceeds are deposited into master account|Strict prohibition of developer fund diversion across unapproved projects|Quarterly chartered accountant (Form 3) and engineer (Form 2) validation|Automated generation of RERA quarterly progress report (QPR) filings",
          "Withdrawal Verification|Rigorous checks before releasing construction development funds.|Verification of percentage completion against architectural certificates|Validation of actual land cost and construction expenditure incurred|Compliance scrutiny before executing contractor and vendor transfers|Online withdrawal approvals with multi-factor management authorization|Complete protection for homebuyers and commercial retail allottees",
          "Banking Coordination|Seamless synchronization between developers, lenders, and buyers.|Tripartite agreements between builder, project lender, and escrow agent|Priority debt servicing and NOC issuance for unit mortgage clearances|Project finance milestone drawdown verification and lender reporting|Real-time reconciliation of home loan disbursements across lending banks|Audit-ready financial ledgers ready for state RERA authority scrutiny"
        ],
        link: "/services/escrow-services",
        icon: Building
      },
      {
        id: "litigation-dispute-escrow",
        title: "Litigation, Settlement & Arbitral Escrow",
        description: "Neutral custody of disputed amounts during commercial arbitration, court stays, and settlements.",
        keyDetails: [
          "Arbitral Deposits|Independent holding of disputed funds during legal proceedings.|Custody of earnest money, performance guarantees, and disputed amounts|Compliance with Section 9 and Section 36 of Arbitration & Conciliation Act|Court-ordered deposits pending outcome of commercial civil suits|Neutral third-party holding preventing asset dissipation by counterparties|High-yield fixed deposit placement optimizing return during litigation",
          "Commercial Settlements|Secure settlement execution between disputing corporate parties.|Escrowed settlement sums released strictly upon filing of consent terms|Mutual withdrawal of criminal complaints, arbitration petitions, and appeals|Immediate return of seized collateral, post-dated cheques, and guarantees|Simultaneous cross-release of mutual releases and termination agreements|Elimination of breach-of-settlement risk between hostile adversaries",
          "Regulatory Compounding|Statutory penalty and compounding deposit escrow accounts.|Escrow custody during settlement proceedings with SEBI, ED, and CCI|Pre-deposit maintenance required for appeals before NCLAT and SAT|Guaranteed release to government treasury upon final regulatory order|Reversal to corporate appellant upon successful legal quashing of orders|Certified banking audit certificates for submission to judicial benches"
        ],
        link: "/services/escrow-services",
        icon: Shield
      },
      {
        id: "procurement-capex-escrow",
        title: "Capex Procurement & Vendor Advance Escrow",
        description: "Guaranteed milestone releases for heavy industrial machinery and turnkey EPC contracts.",
        keyDetails: [
          "EPC & Plant Machinery|Protect multi-crore advance payments for plant installations.|Advance payment held in neutral escrow until machinery dispatch confirmation|Factory Acceptance Testing (FAT) milestone release upon engineer sign-off|Site delivery and physical inspection verification before secondary payout|Site Acceptance Testing (SAT) and commercial commissioning final release|Performance bank guarantee (PBG) substitution upon operational handover",
          "Vendor Risk Shield|Prevent contractor abandonment and project cost overruns.|Contractor mobilized capital secured against verified sub-vendor orders|Progressive milestone releases based on certified measurement books (MB)|Retention money custody during the defect liability period (DLP)|Unconditional fund release to buyer if supplier fails delivery timeline|Full transparency and trust for international machinery imports",
          "Digital Governance|Real-time visibility and instant multi-signature disbursements.|Cloud dashboard showing live escrow balance, releases, and commitments|Automated document upload for bills of lading, test certs, and invoices|Multi-tiered approval matrix involving CFO, Project Head, and Escrow Trustee|Immutable blockchain-timestamped audit trail of every fund movement|Seamless ERP integration for automated accounting and reconciliation"
        ],
        link: "/services/escrow-services",
        icon: FileText
      }
    ]
  },

  "risk-management": {
    id: "risk-management",
    label: "Risk Management",
    title: "RISK MANAGEMENT",
    shortDesc: "Enterprise risk management (ERM) frameworks, operational resilience, and third-party risk management.",
    standards: ["ISO 31000:2018", "COSO ERM 2017", "ISO 22301 (BCP)", "SEBI LODR Risk Policy", "RBI ORMC Guidelines"],
    slaBadge: "Predictive KRI Dashboards • 360° Vendor Risk Visibility",
    items: [
      {
        id: "enterprise-risk-erm",
        title: "Enterprise Risk Management (ERM)",
        description: "Deploy COSO and ISO 31000 aligned frameworks turning risks into strategic advantages.",
        keyDetails: [
          "Framework Blueprint|Tailored risk appetite and tolerance definitions.|ISO 31000 & COSO ERM framework design|Enterprise risk taxonomy and library creation|Board Risk Committee charter and reporting design|Quantitative risk tolerance thresholds by business line|Executive risk ownership matrices and accountability charters",
          "Risk & Control Mapping|Deep-dive RCSA across all business functions.|Process-level risk identification and control scoring|Inherent vs residual risk quantification|Gap identification and mitigation roadmap|Quarterly Risk and Control Self-Assessment (RCSA) cycles|Automated control effectiveness testing schedules",
          "KRI Architecture|Predictive leading indicators warning of exposures.|Key Risk Indicator threshold setting|Automated KRI data feeds from ERP/CRM|Real-time heat maps for executive leadership|Risk velocity and correlation modeling|Early warning triggers dispatched to senior management"
        ],
        link: "/services/enterprise-risk-management",
        icon: ShieldAlert
      },
      {
        id: "operational-resilience",
        title: "Operational Resilience & BCP",
        description: "Identify single points of failure, stress test supply lines, and build resilient operations.",
        keyDetails: [
          "Business Impact Analysis|Identify critical operations and maximum tolerable downtime.|Dependency mapping of systems, people, and facilities|Recovery Time Objectives (RTO) and RPO definition|Supply chain vulnerability stress testing|Financial and operational impact curve modeling|Mission-critical third-party dependency mapping",
          "BCP & Disaster Recovery|Actionable playbooks tested against real crisis scenarios.|ISO 22301 aligned business continuity plans|Comprehensive IT disaster recovery procedures|Crisis management team roles and communication plans|Alternate site activation and remote workforce failovers|Call-tree automation and emergency notification broadcasting",
          "Scenario Simulation|Validate response capabilities through live drills.|Tabletop simulations for cyber, fire, and supply shocks|Post-drill debrief and playbook remediation|Regulatory resilience reporting for BFSI and utilities|Cyber extortion and power blackout simulation drills|Continuous business continuity maturity scoring"
        ],
        link: "/services/operational-risk",
        icon: Activity
      },
      {
        id: "third-party-risk",
        title: "Third-Party & Vendor Risk (TPRM)",
        description: "End-to-end evaluation of operational, financial, and cyber risks across vendor networks.",
        keyDetails: [
          "Vendor Risk Profiling|Multi-dimensional scoring across all suppliers.|Financial stability and credit risk assessment|Legal, statutory, and regulatory compliance audit|Information security and data access evaluation|Adverse media screening and sanction checks|Geopolitical and concentration risk modeling",
          "Lifecycle TPRM|Continuous risk management from onboarding to exit.|Tiered due diligence based on spend and criticality|Ongoing monitoring of negative news and litigation|Fourth-party / sub-vendor risk exposure tracking|Automated annual vendor risk re-assessment campaigns|Continuous vendor credit score change alerts",
          "Contractual Defense|Pre-mapped clauses mitigating third-party liability.|Robust SLA definitions and breach penalties|Right-to-audit and inspection covenants|Offboarding and data destruction verification|Subcontractor liability indemnification enforcement|Insurance coverage verification (Cyber & CGL)"
        ],
        link: "/services/vendor-risk-management",
        icon: Building
      },
      {
        id: "internal-audit-fraud-control",
        title: "Internal Audit & Anti-Fraud Governance",
        description: "Forensic audits, whistleblower investigations, and proactive anti-fraud controls.",
        keyDetails: [
          "Risk-Based Internal Audit|Align internal audit plans with enterprise risk profiles.|Annual RBIA charter drafting and Audit Committee approval|Operational audit cycles across revenue and procurement|Process efficiency and revenue leakage detection|Detailed root cause findings and management responses|Actionable remediation tracking and closure validation",
          "Forensic Investigations|Independent investigation of financial fraud and misconduct.|Data analytics and forensic accounting on suspect transactions|Digital forensics on email, mobile devices, and ERP logs|Independent investigation reports for legal action|Whistleblower allegation fact-finding and evidence gathering|Asset recovery and legal assistance before law enforcement",
          "Anti-Fraud Framework|Proactive fraud deterrence and whistleblowing policies.|Fraud risk assessment (FRA) across vulnerable departments|Segregation of duties (SoD) conflict identification|Anonymous whistleblower reporting channel deployment|Anti-fraud training workshops for finance and procurement|Fraud risk heat maps presented to Audit Committee"
        ],
        link: "/services/internal-audit",
        icon: Scale
      },
      {
        id: "board-risk-reporting",
        title: "Board Risk Governance & Committee Advisory",
        description: "Structuring Board Risk Committees, executive dashboards, and regulatory risk filings.",
        keyDetails: [
          "Risk Committee Support|Structuring high-impact board governance sessions.|Quarterly Board Risk Management Committee (RMC) agenda|Risk tolerance review and top-10 risk dashboard|Emerging risk briefings (AI, geopolitical, climate)|Board evaluation of enterprise risk appetite|Risk disclosure notes for annual corporate report",
          "Executive Risk Dashboards|Real-time enterprise risk posture visibility.|Aggregated risk scores across subsidiaries and divisions|Predictive trends showing risk trajectory and velocity|Incident logs and material operational loss tracking|Interactive scenario stress testing for CXOs|Automated board pack generation with executive summaries",
          "Regulatory Risk Disclosures|Adherence to SEBI LODR Regulation 21 and RBI mandates.|Statutory risk management policy formulation|Cybersecurity risk disclosure per SEBI guidelines|Business risk and mitigation disclosures in Board's Report|Stress test and capital adequacy reporting for BFSI|Climate risk governance reporting under TCFD"
        ],
        link: "/services/enterprise-risk-management",
        icon: FileText
      },
      {
        id: "cyber-tech-risk-errm",
        title: "Technology & IT Risk Governance",
        description: "Managing IT obsolescence, cloud migration exposures, and IT disaster recovery.",
        keyDetails: [
          "IT Risk Assessment|Comprehensive audit of technology infrastructure risks.|Legacy core system obsolescence evaluation|Cloud architecture and multi-tenant security reviews|Database encryption and data sovereignty risk checks|Privileged access management (PAM) audit trails|Disaster recovery RTO/RPO validation and testing",
          "Cyber Insurance Advisory|Quantify cyber exposure and optimize insurance policies.|Crown jewels financial loss modeling|Cyber insurance policy gap analysis and wording review|Claims preparation and forensic evidence presentation|Ransomware and business interruption coverage optimization|Underwriter technical audit questionnaire defense",
          "Change & Release Risk|Prevent production outages from unapproved software updates.|Software development lifecycle (SDLC) security controls|Change advisory board (CAB) risk evaluation matrix|Emergency release post-implementation reviews|Automated code repository scanning integration|Rollback plan verification for enterprise software"
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Laptop
      }
    ]
  },

  "enterprise-governance": {
    id: "enterprise-governance",
    label: "Enterprise Governance",
    title: "ENTERPRISE GOVERNANCE",
    shortDesc: "Corporate governance charters, board secretarial compliance, and internal financial controls.",
    standards: ["Companies Act 2013", "SEBI LODR 2015", "Secretarial Standards SS-1/SS-2", "ICSI Guidelines", "SEBI Insider Trading Regs"],
    slaBadge: "Board-Ready Governance • Zero ROC Default",
    items: [
      {
        id: "corporate-governance",
        title: "Corporate Governance & Board Accountability",
        description: "Codify charters, committee workflows, and ethical frameworks ensuring investor confidence.",
        keyDetails: [
          "Board Charters|Structuring high-impact governance committees.|Audit, Nomination & Remuneration (NRC), and Risk charters|Terms of Reference (ToR) aligned to SEBI LODR|Board skills matrix and diversity planning|Independent Director onboarding and evaluation frameworks|Director tenure tracking and succession planning",
          "Delegation of Authority|Transparent decision-making and approval hierarchies.|Matrix-based approval limits for CapEx and OpEx|Multi-tier authorization workflows in ERP|Regular DoA review and loophole closure|Signing authority thresholds for commercial contracts|Emergency expenditure authorization protocols",
          "Conflict & RPT Policy|Protect boards from governance failures and fraud.|Related Party Transaction (RPT) audit and registers|Board-level conflict of interest disclosure system|Whistleblower and vigil mechanism frameworks|Arm's length transaction validation per Section 188|Omnibus approval monitoring by Audit Committee"
        ],
        link: "/services/governance-framework",
        icon: Building
      },
      {
        id: "secretarial-compliance",
        title: "Secretarial Compliance & Board Reporting",
        description: "Flawless Companies Act compliance, board pack drafting, and statutory ROC filings.",
        keyDetails: [
          "Board & Committee Meetings|Flawless preparation and statutory documentation.|Agenda, board pack, and draft resolution preparation|Secretarial Standards (SS-1 and SS-2) compliance|Comprehensive and defensible minutes drafting|Post-meeting action taken reports (ATR) tracking|Notice of meetings and statutory attendance records",
          "MCA & Registrar Filings|On-time submission of corporate statutory returns.|Annual filing of AOC-4, MGT-7, and director DIR-3 KYC|Changes in directors, capital, and registered office|Charge creation, modification, and satisfaction filings|Active company tagging (INC-22A) compliance|Statutory register maintenance under Companies Act",
          "Secretarial Audits|Comprehensive pre-audit and certification support.|Section 204 Companies Act secretarial audit defense|Compliance certificate for listed and unlisted entities|Corporate governance report for annual disclosure|Annual Secretarial Compliance Report (ASCR) for SEBI|Qualification-free secretarial audit sign-off"
        ],
        link: "/services/secretarial-compliance",
        icon: Scale
      },
      {
        id: "internal-controls-governance",
        title: "Internal Financial Controls (IFC) & Audits",
        description: "Design, testing, and continuous monitoring of internal financial and process controls.",
        keyDetails: [
          "IFC Design & Documentation|Standard operating procedures and control matrices.|Risk and Control Matrix (RCM) documentation|Process narrative and flowchart mapping|Anti-fraud control framework deployment|Financial reporting risk identification|Entity-level and process-level control codification",
          "Control Testing|Rigorous testing of operating and design effectiveness.|Sample testing of financial and operational approvals|Walkthrough tests across procure-to-pay and order-to-cash|Control deficiency grading and remediation support|IT general controls (ITGC) and application controls|Interim and year-end testing documentation",
          "Audit Committee Reporting|Clear, concise assurance briefings for directors.|Quarterly IFC health scorecards|Progress tracking of remediation action plans|Statutory auditor alignment on internal controls|Formal IFC adequacy opinion support|Zero material weakness certification"
        ],
        link: "/services/internal-audit",
        icon: FileText
      },
      {
        id: "insider-trading-pit-code",
        title: "SEBI Insider Trading (PIT) & UPSI Controls",
        description: "Structured Digital Database (SDD), trading window closures, and pre-clearance workflows.",
        keyDetails: [
          "SDD Software Implementation|Statutory compliance with SEBI PIT Regulation 3(5).|Internally maintained tamper-evident audit trail database|Time-stamped recording of UPSI sharing events|PAN and personal details capture of recipient parties|Non-disclosure and confidentiality agreement logging|Annual SDD compliance certificate from Practicing CS",
          "Designated Persons (DP)|Managing insider lists and pre-clearance approvals.|Automated trading window closure notifications|Pre-clearance trading approval workflows with Compliance Officer|Immediate reporting of off-market and market trades|Annual and continuous DP disclosures collation|Contra-trade monitoring and disgorgement penalty recovery",
          "UPSI Governance|Strict protocols protecting Unpublished Price Sensitive Information.|Chinese walls and info-barrier verification|Need-to-know access control enforcement|Board and committee leak investigation playbooks|Inquiry procedure for leakage of UPSI|Defense against SEBI insider trading show-cause notices"
        ],
        link: "/services/secretarial-compliance",
        icon: Lock
      },
      {
        id: "esop-shareholder-governance",
        title: "ESOP Administration & Shareholder Alignment",
        description: "Employee stock option trusts, cap-table governance, and shareholder meeting resolutions.",
        keyDetails: [
          "ESOP Scheme Design|Structuring compliant equity compensation plans.|Scheme drafting compliant with SEBI SBEB / Companies Act|ESOP Trust deed drafting and trustee governance|Vesting schedule, exercise price, and performance metrics|Valuation reports for fair market value determination|Special resolution drafting and shareholder vote documentation",
          "Cap-Table Management|Immutable ownership tracking and shareholder ledgers.|Automated option grant, vesting, and exercise tracking|Allotment of shares upon exercise and PAS-3 filings|In-principle and final listing approvals from stock exchanges|Tax withholding (TDS) computation upon perquisite value|Digital cap-table synchronization with investor registers",
          "General Meetings (AGM/EGM)|Statutory preparation and voting compliance.|Notice of AGM and explanatory statements drafting|E-voting setup with NSDL/CDSL depositories|Scrutinizer appointment and report verification|Filing of MGT-14 for special resolutions passed|Shareholder grievance redressal mechanism"
        ],
        link: "/services/governance-framework",
        icon: Users
      },
      {
        id: "csr-statutory-governance",
        title: "Statutory CSR Mandate & Impact Audits",
        description: "Section 135 Companies Act compliance, CSR committee charters, and impact assessments.",
        keyDetails: [
          "CSR Obligation Calculation|Accurate 2% net profit computation per Section 135.|Calculation of average net profit per Section 198|Annual CSR action plan formulation and approval|CSR committee charter and composition compliance|Ongoing project vs other project expenditure categorization|Unspent CSR account escrow account opening with banks",
          "Implementation & Verification|Due diligence on implementing agencies.|Verification of NGO registration on MCA portal (CSR-1)|Utilization certificate collection and fund auditing|Project milestone tracking and site verification visits|Zero diversion of funds to ineligible activities|Board CSR report drafting for inclusion in annual filing",
          "Mandatory Impact Assessment|Independent impact evaluation for large CSR projects.|Engaging independent agencies for INR 1 Cr+ projects|Quantitative and qualitative impact scoring|Social Return on Investment (SROI) analysis|Impact assessment report attachment to Board's report|Annual CSR return filing on MCA portal (Form CSR-2)"
        ],
        link: "/services/governance-framework",
        icon: TreePine
      }
    ]
  },

  "cybersecurity-data": {
    id: "cybersecurity-data",
    label: "Cybersecurity & Data Privacy",
    title: "CYBERSECURITY & DATA COMPLIANCE",
    shortDesc: "DPDP Act compliance, ISO 27001/SOC 2 frameworks, VAPT ethical hacking, and 6-hour CERT-In response.",
    standards: ["DPDP Act 2023", "GDPR (EU)", "ISO 27001:2022", "SOC 2 Type II", "CERT-In Directions 2022"],
    slaBadge: "6-Hour CERT-In Response • Zero Data Breach Record",
    items: [
      {
        id: "data-privacy-dpdp",
        title: "Data Protection & DPDP Act Compliance",
        description: "Full compliance with India's DPDP Act, GDPR, consent architectures, and privacy audits.",
        keyDetails: [
          "DPDP Act Alignment|End-to-end readiness for India's data protection law.|Data Principal consent capture and notice workflows|Purpose limitation and data minimisation audits|Record of Processing Activities (RoPA) compilation|Data protection impact assessment (DPIA) frameworks|Cross-border data transfer safeguard compliance",
          "Consent Architecture|Deploy legally verifiable consent management platforms.|Granular, bilingual consent capture mechanisms|Consent withdrawal and data erasure workflows|Data Principal grievance redressal mechanism|Parental consent verification for minor users|Consent registry tamper-proof audit trails",
          "Privacy Breach Readiness|72-hour regulatory breach notification workflows.|Data breach assessment and containment protocols|Data Protection Board of India notification templates|Data Protection Officer (DPO) support and advisory|Post-breach forensic investigation coordination|Data Subject notification and damage mitigation",
        ],
        link: "/services/data-privacy",
        icon: Lock
      },
      {
        id: "cybersecurity-frameworks",
        title: "Cybersecurity Policy & ISO 27001 / SOC 2",
        description: "Design and certification of Information Security Management Systems.",
        keyDetails: [
          "ISO 27001 & SOC 2|Fast-track support from gap audit to certification.|ISMS scope definition and risk treatment plan|Statement of Applicability (SoA) documentation|Stage 1 and Stage 2 certification audit facilitation|SOC 2 Type II trust service criteria mapping|Continuous compliance automation platform rollout",
          "Security Policies|Complete library of 40+ legally vetted cyber policies.|Acceptable use, remote access, and BYOD policies|Data classification, retention, and disposal rules|Access control, password, and encryption standards|Third-party vendor data security obligations|Annual policy re-certification and employee sign-offs",
          "Security Operations|Oversight of SIEM, SOC, and vulnerability scanning.|Vulnerability management lifecycle advisory|Log retention compliance per CERT-In guidelines|Third-party cloud and SaaS application vetting|Privileged access monitoring and session audits|Threat intelligence integration into daily SOC operations"
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Zap
      },
      {
        id: "vapt-testing-services",
        title: "VAPT & Penetration Testing",
        description: "Simulate advanced real-world attacks across web, mobile, API, and cloud networks.",
        keyDetails: [
          "Web, Mobile & API|Uncover vulnerabilities before cyber adversaries do.|OWASP Top 10 and business logic flaw testing|API security assessment and authorization checks|Mobile application (Android & iOS) pen-testing|GraphQL and microservice security evaluations|Automated vs manual exploitation validation",
          "Network & Infrastructure|Expose perimeter and internal weaknesses.|External perimeter and firewall penetration testing|Active Directory and privilege escalation testing|Cloud infrastructure configuration and IAM review|Internal network pivoting and lateral movement simulation|Wireless and IoT device vulnerability scanning",
          "Verified Remediation|Developer-facing remediation guidance and re-tests.|CVSS-prioritized vulnerability fix roadmaps|Hands-on code remediation advisory sessions|Zero-vulnerability closure certificates|Executive summary presentation for Board of Directors|Independent safe-to-host certification for production"
        ],
        link: "/services/vapt-testing",
        icon: Shield
      },
      {
        id: "incident-response-cert",
        title: "Incident Response & CERT-In Compliance",
        description: "6-hour mandatory CERT-In breach reporting, live forensic analysis, and containment.",
        keyDetails: [
          "6-Hour Reporting|Meet strict CERT-In cyber incident reporting mandates.|Incident triage and notification drafting|24/7 designated incident liaison team|CERT-In compliance log retention (180 days)|Mandatory NTP server synchronization compliance|Formal closure report submission to CERT-In",
          "Containment & Forensic|Rapid threat isolation and forensic evidence logging.|Playbook-driven attack containment and isolation|Court-admissible chain of custody forensic reports|Malware reverse-engineering and root-cause analysis|Dark web monitoring for leaked corporate credentials|System restoration without data reinfection risk",
          "Crisis Simulation|Tabletop drills testing executive incident readiness.|Ransomware negotiation and crisis playbook testing|Multi-stakeholder communications templates|Post-incident lessons learned and posture hardening|Board crisis briefing and investor disclosure support|Cyber insurance adjuster liaison and claims packaging"
        ],
        link: "/services/incident-response",
        icon: ShieldAlert
      },
      {
        id: "cloud-security-posture",
        title: "Cloud Security (CSPM) & Zero Trust",
        description: "Securing multi-cloud AWS, Azure, and GCP architectures with zero-trust principles.",
        keyDetails: [
          "Cloud Misconfiguration|Automated detection of security drift across cloud stacks.|Continuous scanning of S3 buckets and public storage|Identity & Access Management (IAM) privilege hygiene|CIS Benchmark compliance audits across AWS and Azure|Kubernetes and container runtime vulnerability checks|Serverless function and API gateway hardening",
          "Zero Trust Architecture|Verify explicitly with micro-segmented network zones.|Software-defined perimeter (SDP) implementation|Multi-factor authentication (MFA) and conditional access|Just-in-time (JIT) privileged administrative access|End-to-end data transit and rest encryption auditing|Device posture compliance verification before network entry",
          "Cloud Compliance Audits|Aligning cloud infrastructure to global standards.|PCI-DSS compliance for cloud payment gateways|HIPAA / HITRUST compliance for digital health data|RBI Master Directions compliance for banking cloud|Data sovereignty and local data residency verification|DevSecOps CI/CD pipeline automated security gates"
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Laptop
      },
      {
        id: "third-party-cyber-risk",
        title: "Third-Party Cyber & Supply Chain Tech Audits",
        description: "Assessing cyber posture, data access, and API connections of technology vendors.",
        keyDetails: [
          "SaaS & Vendor Audits|Rigorous cybersecurity vetting of external tech providers.|SaaS application security review and SOC 2 verification|Third-party developer source code and library checks|Data leakage risk assessments across shared cloud drives|Vendor offboarding and access revocation verification|Quarterly vendor cybersecurity posture scoring",
          "API & Integration Security|Protect enterprise backends from vulnerable vendor APIs.|API token authorization and rate limiting audits|Data payload validation and injection attack prevention|Secure webhook implementation and payload encryption|Integration sandbox environment isolation testing|Mutual TLS (mTLS) authentication verification",
          "Breach Cascade Defense|Prevent lateral movement if a vendor gets compromised.|Network segmentation isolating third-party portals|Privilege restriction limiting supplier database access|Vendor compromise incident containment playbooks|Contractual breach notification enforcement within 24 hours|Independent technical verification of vendor remediation"
        ],
        link: "/services/data-privacy",
        icon: KeyRound
      }
    ]
  },

  "esg-sustainability": {
    id: "esg-sustainability",
    label: "ESG & Sustainability",
    title: "ESG & SUSTAINABILITY",
    shortDesc: "Automate environmental, social, and governance reporting to SEBI BRSR, GRI, and carbon accounting.",
    standards: ["SEBI BRSR 2023", "GRI Standards 2021", "TCFD Framework", "GHG Protocol (Scopes 1-3)", "SBTi Net-Zero Standard"],
    slaBadge: "BRSR Core Ready • SBTi Aligned Net-Zero Pathway",
    items: [
      {
        id: "esg-brsr-reporting",
        title: "ESG Strategy & BRSR / GRI Reporting",
        description: "Automate environmental, social, and governance reporting to SEBI BRSR and GRI standards.",
        keyDetails: [
          "SEBI BRSR Compliance|Principle-wise reporting for top 1000 listed entities.|BRSR Core mandatory assurance readiness|Comprehensive 9-principle data gap assessment|ESG narrative drafting and investor disclosures|Value chain partner ESG disclosure collation|Audit committee presentation on BRSR progress",
          "GRI & Global Standards|Align reporting with worldwide investor expectations.|GRI Standards materiality matrix and disclosures|TCFD climate risk governance alignment|CDP questionnaire scoring and submission support|UN Sustainable Development Goals (SDG) mapping|EcoVadis score improvement advisory",
          "Data Assurance|Audit-proof sustainability metrics and evidence trails.|Pre-assurance review per ISAE 3000 standards|Internal ESG data governance and control checks|Annual sustainability report design and publication|Data provenance tracking for every metric|Independent third-party assurance support"
        ],
        link: "/services/esg-sustainability",
        icon: Leaf
      },
      {
        id: "carbon-accounting-netzero",
        title: "Carbon Accounting & Net-Zero",
        description: "Scope 1, 2, and 3 GHG emissions quantification and verified net-zero pathways.",
        keyDetails: [
          "GHG Quantification|Audit-ready carbon inventory per GHG Protocol.|Scope 1 direct emissions calculation|Scope 2 indirect emissions (location & market-based)|Comprehensive Scope 3 value chain emissions mapping|Emission factor verification and database alignment|Activity data collection workflows across facilities",
          "Net-Zero Roadmaps|Science-based decarbonization targets and strategies.|Science Based Targets initiative (SBTi) alignment|Renewable energy transition feasibility studies|Energy efficiency CapEx payback modeling|Internal carbon pricing mechanism design|Decarbonization milestone monitoring dashboards",
          "Carbon Credits & Offsets|High-integrity offset procurement and management.|Verified Carbon Standard (VCS) project validation|Gold Standard credit due diligence and tracking|Carbon offset retirement and registry accounting|Article 6 Paris Agreement cross-border compliance|Green tariff and corporate PPA advisory"
        ],
        link: "/services/carbon-footprint",
        icon: TreePine
      },
      {
        id: "supply-chain-sustainability",
        title: "Supply Chain ESG & Green Audits",
        description: "Supplier ESG audits, circular economy transition, and facility resource efficiency.",
        keyDetails: [
          "Supplier ESG Audits|Drive sustainability through Tier-1 and Tier-2 vendors.|Supplier ESG scoring and gap remediation|Green procurement policy drafting and rollout|Deforestation-free and fair labor verification|Supplier decarbonization workshops and support|Sustainable sourcing verification certificates",
          "Resource & Green Audits|Uncover operational savings while meeting green norms.|Energy efficiency and thermal audit assessments|Water footprint assessment and ZLD planning|Solid, hazardous, and plastic waste audits|Compressed air and HVAC leak detection surveys|ISO 50001 energy management system gap audits",
          "Circular Economy|Transform operational waste streams into valuable assets.|Extended Producer Responsibility (EPR) planning|Material recovery and recycling validation|Zero-waste-to-landfill certification assistance|Byproduct valorization and waste exchange programs|Life cycle assessment (LCA) for key product lines"
        ],
        link: "/services/green-audits",
        icon: Droplet
      },
      {
        id: "green-building-igbc-leed",
        title: "Green Building & LEED/IGBC Certifications",
        description: "Transform corporate campuses and factories into certified green, net-zero buildings.",
        keyDetails: [
          "Green Certification|Advisory from baseline audit to platinum certification.|IGBC (Indian Green Building Council) rating facilitation|LEED certification documentation and credit points tracking|GRIHA certification for government and institutional assets|Energy simulation and daylight analysis modeling|Indoor Air Quality (IAQ) testing and certification",
          "Resource Efficiency|Slashing energy and water footprints in real estate.|High-efficiency HVAC and solar rooftop integration|Rainwater harvesting and greywater recycling systems|Sustainable building materials and low-VOC paints|Smart building IoT energy management systems|Carbon footprint reduction verification per sq. ft.",
          "Post-Occupancy Audits|Continuous monitoring of green building standards.|Periodic indoor environment quality audits|Green building recertification and renewal filings|Employee wellness and biophilic design evaluations|Facility team green operations training|Corporate marketing and investor sustainability branding"
        ],
        link: "/services/green-audits",
        icon: Building
      },
      {
        id: "epr-plastic-battery-compliance",
        title: "Extended Producer Responsibility (EPR)",
        description: "Turnkey CPCB portal registration, recycling credits, and annual return filings.",
        keyDetails: [
          "CPCB Portal Registration|Securing mandatory Producer, Importer & Brand Owner (PIBO) certs.|Plastic Waste Management Rules registration|E-Waste Management Rules 2022 portal compliance|Battery Waste Management Rules EPR authorizations|Used Oil and tyre waste EPR registration support|State-wise EPR obligation quota calculation",
          "Recycling Credit Fulfillment|Procure authentic, verified certificates from accredited recyclers.|Direct empanelment with audited recycling facilities|Physical verification of recycling plant operations|Credit transfer on national CPCB portal repositories|Protection against fraudulent recycler certificates|Zero-shortfall assurance before annual deadlines",
          "Annual Filing & Audits|Flawless annual returns avoiding statutory penalties.|Compilation of sales volume and plastic packaging weight|Form-IV annual return generation and portal filing|Audit defense during CPCB/SPCB surprise inspections|Environmental compensation penalty waiver advisory|State Pollution Control Board liaison representation"
        ],
        link: "/services/waste-management",
        icon: Droplet
      },
      {
        id: "esg-due-diligence-ma",
        title: "ESG Due Diligence & Sustainable Finance",
        description: "Assessing ESG liabilities in M&A transactions and accessing green finance bonds.",
        keyDetails: [
          "M&A Due Diligence|Uncovering hidden environmental liabilities in acquisitions.|Historical contamination and Phase-I/Phase-II audits|Workplace safety, labour disputes, and ESG litigation risk|Climate physical and transition risk financial modeling|Post-acquisition ESG integration roadmap drafting|Representations and warranties ESG clause negotiations",
          "Sustainable Finance|Access lower-cost green loans and sustainability-linked bonds.|Green Bond Principles and taxonomy alignment|Sustainability-Linked Loan (SLL) KPI selection|Second-Party Opinions (SPO) facilitation with rating agencies|Annual allocation and impact reporting for bondholders|EU Taxonomy and global investor disclosure alignment",
          "ESG Rating Enhancement|Optimize scores across MSCI, S&P DJSI, CDP, and CRISIL.|Public disclosure gap analysis and scoring remediation|Controversy monitoring and rebuttal dossier preparation|Engagement with ESG rating agency analysts|Peer benchmarking and competitive positioning|Corporate board ESG governance presentation"
        ],
        link: "/services/esg-sustainability",
        icon: Coins
      }
    ]
  },

  "staffing-managed": {
    id: "staffing-managed",
    label: "Staffing & Managed Services",
    title: "STAFFING & MANAGED COMPLIANCE SERVICES",
    shortDesc: "Dedicated compliance officers on contract, managed retainership, specialized staffing, and audit support.",
    standards: ["CLRA 1970 (Contract Staffing)", "EPFO / ESIC Payroll", "Labour Codes 2020", "Fixed-Term Employment Rules", "PSARA (Security)"],
    slaBadge: "99.9% Filing Accuracy SLA • Same-Day Replacement Guarantee",
    items: [
      {
        id: "compliance-officers",
        title: "Dedicated Compliance Officers on Contract",
        description: "Deploy experienced compliance officers and company secretaries to manage your operations.",
        keyDetails: [
          "Experienced Officers|Immediate access to certified compliance professionals.|Dedicated full-time or fractional compliance officers|Qualified Company Secretaries (CS) and Legal Counsel|Specialized sector experience (BFSI, Pharma, Tech)|Rigorous background vetting and technical evaluations|Pre-trained on statutory calendars and ERP workflows",
          "Full On-Site Authority|On-site execution and regulatory agency management.|Day-to-day statutory register and filing oversight|Representation before statutory authorities and inspectors|Internal stakeholder compliance training and guidance|Vendor and contract labour compliance supervision|Regular executive reporting to CXOs and Board members",
          "Zero Overhead Liability|Flexible contract terms without long-term liabilities.|Flexible contract terms with pre-vetted specialists|Seamless same-day replacement guarantee without disruption|Complete payroll, benefits, and insurance handled on our books|Elimination of recruitment, training, and retention overhead|Scale compliance headcount in alignment with project needs"
        ],
        link: "/staffing/compliance-officers",
        icon: UserPlus
      },
      {
        id: "managed-retainership",
        title: "Managed Compliance Retainership",
        description: "Turnkey, SLA-governed compliance retainership handling all statutory obligations.",
        keyDetails: [
          "Guaranteed SLAs|Fixed monthly retainership with 99.9% assurance.|Penalty indemnity guarantees under defined contractual SLAs|Guaranteed response times for regulatory notices and queries|Weekly progress reporting and milestone tracking to leadership|Dedicated Client Success Manager and legal lead|Transparent monthly billing with zero unexpected add-ons",
          "End-to-End Governance|We take 100% operational accountability for filings.|Central, State, and Municipal compliance execution|Routine license renewals and inspection preparation|Centralized digital repository maintenance with cloud backups|Dispute response drafting and show-cause notice handling|Continuous tracking of legislative amendments and impact",
          "Executive Dashboard|Real-time transparency for corporate management.|Executive compliance health scorecard and heat maps|Automated compliance calendar with live progress updates|Quarterly board-ready risk and compliance briefings|Exception reports highlighting any departmental bottlenecks|Documented audit trails ready for statutory inspection"
        ],
        link: "/staffing/managed-retainership",
        icon: ShieldCheck
      },
      {
        id: "specialized-temp-staffing",
        title: "Temporary & Specialized Staffing",
        description: "Agile, specialized talent for seasonal spikes, regulatory changes, and remediation.",
        keyDetails: [
          "Rapid Deployment|Ready-to-deploy talent within 48 to 72 hours.|On-demand staffing for seasonal compliance peaks|Specialized experts for new regulatory rollouts (DPDP/BRSR)|Project-specific contract durations from 1 month to 2 years|Seamless onboarding and knowledge transfer protocols|National talent pool across 28 states and metro hubs",
          "Domain Experts|Specialists across every niche compliance vertical.|Labour law and payroll compliance subject-matter experts|Environmental engineers for SPCB, CTE/CTO, and ETP operations|Tax and transfer pricing documentation analysts|Secretarial officers for Companies Act annual filings|Workplace safety and fire safety certified officers",
          "Scalable Workforce|Scale your compliance team up or down on demand.|Flexible headcount expansion without hiring friction|Pan-India deployment capability across multiple plant sites|Comprehensive statutory compliance on our payroll|Transparent timesheet and deliverable tracking|Option to transition high-performing talent to full-time payroll"
        ],
        link: "/staffing/specialized-temp-staffing",
        icon: Users
      },
      {
        id: "audit-defense-staffing",
        title: "Audit Support & Defense Staffing",
        description: "On-site taskforces managing audits, historical remediation, and regulator queries.",
        keyDetails: [
          "On-Site Taskforce|Elite teams deployed to manage complex audits.|Dedicated war-room support during agency inspections|Systematic evidence collation and sampling reviews|Reconciliation of multi-year historical records|On-site liaison during auditor and inspector walkthroughs|Immediate retrieval of time-stamped proof documents",
          "Remediation Drills|Rapid turnaround of audit findings and non-compliances.|Root cause analysis and fast-track remediation workflows|Corrective and Preventive Action (CAPA) drafting|Formal rebuttal drafting for show-cause notices|Challan reconciliation and differential interest payment calculations|Pre-audit dry runs ensuring 100% staff readiness",
          "Clean Audit Deliveries|Protect reputation and ensure successful sign-offs.|Liaison with statutory, tax, and labor auditors|Audit closure certificate acquisition without qualification|Post-audit internal control hardening and training|Executive post-mortem report and risk mitigation advisory|Complete peace of mind for management and promoters"
        ],
        link: "/staffing/audit-defense-staffing",
        icon: FileCheck
      },
      {
        id: "sectoral-workforce",
        title: "Sectoral Workforce Deployment",
        description: "Trained workforce solutions for healthcare, manufacturing, facility management, and IT campuses.",
        keyDetails: [
          "Healthcare & Hospitals|Verified, NABH/JCI protocol trained medical workforce.|Hospital housekeeping & biomedical waste handling|Patient transport and infection control specialists|Credential-verified nursing and allied health staff|Strict adherence to hospital hygiene and biomedical rules|Continuous training on bio-safety protocols",
          "Manufacturing & Plants|Skilled operators and floor supervisors adhering to safety.|Assembly line operators and machine technicians|Strict adherence to industrial safety and DISH protocols|Scalable workforce for peak production cycles|Certified machine operators and safety marshals|100% compliance with Factories Act and CLRA regulations",
          "Facilities & Campuses|Integrated facility upkeep, HVAC, and corporate services.|24/7 technical maintenance (electrical, plumbing, HVAC)|Corporate park and IT campus housekeeping|100% statutory labor law compliance guaranteed|Energy-saving facility operational practices|Emergency response and fire evacuation trained staff"
        ],
        link: "/staffing",
        icon: Factory
      },
      {
        id: "fractional-legal-counsel",
        title: "Fractional Legal Counsel & Company Secretaries",
        description: "Experienced general counsels and company secretaries providing strategic part-time governance.",
        keyDetails: [
          "Strategic Legal Counsel|High-caliber legal advisory without full-time C-suite cost.|Commercial contract negotiation and boilerplate drafting|Intellectual property protection and trademark filings|Dispute management and litigation strategy oversight|M&A transaction support and legal due diligence|Board advisory on corporate restructuring and joint ventures",
          "Company Secretarial Services|Certified Practicing Company Secretaries (PCS) on demand.|Secretarial audit certification under Section 204|Board meeting management and master resolutions drafting|ROC representation for compoundable offenses and strikes-off|Share capital restructuring, rights issues, and bonus shares|SEBI compliance advisory for listed and IPO-bound entities",
          "Flexible Engagement Models|Retainer, project-based, or day-rate arrangements.|Part-time deployment from 10 to 40 hours per month|Dedicated virtual legal counsel for startups and scale-ups|Immediate escalation support during regulatory emergencies|Clear deliverables and guaranteed turnaround times|Seamless alignment with in-house leadership teams"
        ],
        link: "/staffing",
        icon: Scale
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
];

export interface MegaOfferingGroup {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  practices: {
    id: string;
    label: string;
    tag?: string;
  }[];
}

export const megaOfferingsCategories: MegaOfferingGroup[] = [
  {
    id: "statutory-operational",
    name: "Statutory & Operations",
    tagline: "Labor, pollution boards, safety audits & industrial permits",
    iconName: "Scale",
    practices: [
      { id: "regulatory-compliance", label: "Regulatory Compliance", tag: "Statutory" },
      { id: "labour-employment", label: "Labour & Employment", tag: "Audits" },
      { id: "environmental-ehs", label: "Environmental & EHS", tag: "PCB / NOC" },
      { id: "licensing-permits", label: "Licensing & Permits", tag: "Fast-Track" },
    ]
  },
  {
    id: "tax-trade-supply",
    name: "Tax, Trade & Escrow",
    tagline: "Direct & indirect tax, export customs, and transaction escrow",
    iconName: "Coins",
    practices: [
      { id: "taxation-trade", label: "Taxation & Trade", tag: "GST / IT" },
      { id: "export-trade", label: "Export & Trade Services", tag: "DGFT" },
      { id: "supply-chain", label: "Supply Chain Compliance", tag: "Vendors" },
      { id: "escrow-services", label: "Escrow Services", tag: "Tripartite" },
    ]
  },
  {
    id: "governance-risk-esg",
    name: "Governance, Risk & ESG",
    tagline: "Secretarial compliance, enterprise risk, and ESG disclosures",
    iconName: "Building",
    practices: [
      { id: "enterprise-governance", label: "Enterprise Governance", tag: "MCA / ROC" },
      { id: "risk-management", label: "Risk Management", tag: "ERM" },
      { id: "esg-sustainability", label: "ESG & Sustainability", tag: "BRSR" },
    ]
  },
  {
    id: "cybersecurity-privacy",
    name: "Cybersecurity & Privacy",
    tagline: "DPDP Act compliance, ISO 27001, and cloud security defense",
    iconName: "Lock",
    practices: [
      { id: "cybersecurity-data", label: "Cybersecurity & Data Privacy", tag: "DPDP / ISO" },
    ]
  }
];


import { 
  Car, Wrench, Settings, ShieldAlert, Store, Laptop, Cpu, PhoneCall, FlaskConical, Zap, 
  BrickWall, Hammer, Building2, Home, Milestone, Fuel, Sun, Train, 
  Landmark, Coins, ShoppingCart, Gem, Pill, Activity, Stethoscope, Dna, Leaf, 
  Tv, Scissors, Utensils, Film, Hotel, Plane, GraduationCap, Sprout,
  ShieldCheck, Shield, Mountain, Wind, Briefcase, CreditCard,
  Microscope, Sparkles, Snowflake, Apple, Bike, Trophy, Anchor
} from "lucide-react";

export interface IndustrySegment {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  focusAreas: string[];
  regulations: string[];
  challenges: string[];
  outcomes: string[];
  color: string;
  cluster: string;
  stats?: {
    value: string;
    suffix?: string;
    label: string;
  }[];
}

export const industriesData: IndustrySegment[] = [
  // ==========================================
  // CLUSTER 1: MANUFACTURING & INDUSTRIAL
  // ==========================================
  {
    id: "automobiles",
    title: "Automotive Manufacturing",
    subtitle: "Automotive Manufacturing & EHS Compliance",
    icon: Car,
    focusAreas: ["Assembly Safety", "EHS Registers", "Supply Chain Audit"],
    regulations: ["Factories Act 1948", "ISO 14001", "Motor Vehicles Act", "BIS Standards"],
    challenges: [
      "Dynamic assembly-line safety regulations and factory compliance audits.",
      "Tracking supplier certifications and raw material footprints globally."
    ],
    outcomes: [
      "Zero-deviation EHS records, faster compliance audit clearance.",
      "Resilient, fully certified auto component vendor network."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "0", label: "Assembly HSE Incidents" },
      { value: "100", suffix: "%", label: "Factories Act Compliance" },
      { value: "↓ 60", suffix: "%", label: "Reporting Overhead Cut" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "auto-components",
    title: "Auto Components & Ancillaries",
    subtitle: "Tier-1/2 Supplier Audits & Quality Standards",
    icon: Wrench,
    focusAreas: ["Quality Control", "Subcontractor Risk", "Labour Laws"],
    regulations: ["IATF 16949", "CLRA Act 1970", "Factories Act", "EPA Norms"],
    challenges: [
      "Meeting strict global buyer audits and IATF quality standards.",
      "Managing subcontractor compliance and labor safety at scale."
    ],
    outcomes: [
      "Full supply chain transparency and automated audit readiness.",
      "Mitigated subcontractor operational risks and labor penalties."
    ],
    color: "from-blue-500 to-cyan-600",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "100", suffix: "%", label: "IATF 16949 Pass Rate" },
      { value: "↓ 70", suffix: "%", label: "Vendor Non-Conformities" },
      { value: "0", label: "CLRA Penalty Notices" },
      { value: "12-18", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "engineering-capital-goods",
    title: "Capital Goods & Heavy Machinery",
    subtitle: "Heavy Machinery Safety & Operational Risk",
    icon: Settings,
    focusAreas: ["Heavy Machinery Safety", "Site EHS", "Customs GFR"],
    regulations: ["Factories Act", "ISO 45001", "Indian Boiler Regulations", "Customs Act"],
    challenges: [
      "Managing high-hazard heavy engineering plants and high-pressure boiler certifications.",
      "Navigating complex import-export customs audits and export obligation fulfillments."
    ],
    outcomes: [
      "Flawless plant safety record with zero catastrophic equipment failures.",
      "Accelerated customs clearance and zero duty penalty disputes."
    ],
    color: "from-slate-700 to-blue-800",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "0", label: "Critical Site Hazards" },
      { value: "100", suffix: "%", label: "Boiler License Currency" },
      { value: "↓ 50", suffix: "%", label: "Inspection Lead Time" },
      { value: "14-20", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "defence-manufacturing",
    title: "Defence & Aerospace Manufacturing",
    subtitle: "Military Logistics & Strict Security GRC",
    icon: ShieldAlert,
    focusAreas: ["Export Controls", "AS9100D Quality", "Classified IP"],
    regulations: ["SCOMET / ITAR Guidelines", "AS9100D", "MoD Security Directives", "ISO 27001"],
    challenges: [
      "Maintaining dual-use SCOMET export controls and strict MoD security clearances.",
      "Meeting stringent AS9100D aerospace quality tolerances and domestic offset audits."
    ],
    outcomes: [
      "Approved military supplier standing with 100% export control compliance.",
      "Impenetrable defense IP protection and verified offset credits."
    ],
    color: "from-indigo-700 to-slate-900",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "100", suffix: "%", label: "SCOMET Audit Clearance" },
      { value: "0", label: "Classified Data Leaks" },
      { value: "100", suffix: "%", label: "DGQA Quality Score" },
      { value: "18-24", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "msme",
    title: "MSME Manufacturing",
    subtitle: "Scaling Business Compliance & Statutory Records",
    icon: Home,
    focusAreas: ["Statutory Baseline", "Payroll EHS", "ZED Certification"],
    regulations: ["Factories Act", "MSMED Act", "ZED Scheme Norms", "EPFO / ESIC Rules"],
    challenges: [
      "Navigating scattered state and central manufacturing licenses on constrained budgets.",
      "Transitioning from informal operations to audited corporate supplier panels."
    ],
    outcomes: [
      "Complete statutory compliance baseline established within 30 days.",
      "ZED Gold certification accelerating access to enterprise procurement tenders."
    ],
    color: "from-blue-600 to-indigo-600",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "30", suffix: " Days", label: "Full Baseline Setup" },
      { value: "100", suffix: "%", label: "Statutory Filing Accuracy" },
      { value: "↓ 80", suffix: "%", label: "Vendor Rejection Rate" },
      { value: "6-12", suffix: " mo", label: "Capital Payback" }
    ]
  },
  {
    id: "chemicals-specialty",
    title: "Chemicals & Specialty Coatings",
    subtitle: "Process Safety & Hazardous Chemical Compliance",
    icon: FlaskConical,
    focusAreas: ["Process Safety (PSM)", "PESO Consents", "Hazardous Waste"],
    regulations: ["MSIHC Rules 1989", "PESO Explosives Rules", "Factories Act Sec 41B", "CPCB/SPCB Rules"],
    challenges: [
      "Mitigating exothermic chemical reaction hazards and toxic gas releases.",
      "Complying with stringent SPCB effluent treatment and hazardous waste manifest returns."
    ],
    outcomes: [
      "Zero chemical leakage incidents and 100% valid PESO storage licenses.",
      "Unbroken SPCB Consent to Operate (CTO) with certified pollution overwatch."
    ],
    color: "from-emerald-700 to-teal-800",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "0", label: "Toxic Chemical Spills" },
      { value: "100", suffix: "%", label: "PESO License Currency" },
      { value: "↓ 85", suffix: "%", label: "SPCB Audit Notice Risk" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },

  // ==========================================
  // CLUSTER 2: TECHNOLOGY & ELECTRONICS
  // ==========================================
  {
    id: "it-bpm",
    title: "IT & BPM Services",
    subtitle: "Global Data Protection & SOC 2 Auditing",
    icon: Laptop,
    focusAreas: ["Information Security", "SOC 2 Type II", "DPDP Compliance"],
    regulations: ["DPDP Act 2023", "ISO 27001", "SOC 2 Criteria", "STPI / SEZ Rules"],
    challenges: [
      "Navigating cross-border client data privacy requirements under GDPR and DPDP.",
      "Managing complex remote workforce security and sub-service vendor risk."
    ],
    outcomes: [
      "Seamless SOC 2 Type II clearances that accelerate enterprise contract closings.",
      "Fully codified DPDP architecture protecting millions of customer records."
    ],
    color: "from-blue-600 to-indigo-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "SOC 2 Type II Audit Pass" },
      { value: "0", label: "Privacy Penalty Notices" },
      { value: "↓ 75", suffix: "%", label: "Vendor Vetting Cycle" },
      { value: "9-15", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "electronics-semiconductor",
    title: "Electronics & Semiconductor",
    subtitle: "Cleanroom EHS & E-Waste Management",
    icon: Cpu,
    focusAreas: ["Cleanroom EHS", "E-Waste EPR", "RoHS Verification"],
    regulations: ["E-Waste Rules 2022", "RoHS Directives", "Factories Act", "Semiconductor PLI"],
    challenges: [
      "Toxic silane/arsine gas containment and cleanroom continuous EHS monitoring.",
      "Tracking complex Extended Producer Responsibility (EPR) electronic scrap targets."
    ],
    outcomes: [
      "Zero cleanroom toxic exposure incidents and verified RoHS export eligibility.",
      "100% EPR electronic waste quota fulfillment through authorized recyclers."
    ],
    color: "from-cyan-600 to-blue-700",
    cluster: "Technology & Electronics",
    stats: [
      { value: "0", label: "Cleanroom Safety Incidents" },
      { value: "100", suffix: "%", label: "EPR Target Fulfilment" },
      { value: "100", suffix: "%", label: "RoHS Export Clearance" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "telecommunications",
    title: "Telecommunications & Digital Infrastructure",
    subtitle: "Spectrum Licensing & Critical Infrastructure Security",
    icon: PhoneCall,
    focusAreas: ["DoT Licensing", "Trusted Hardware", "Subscriber eKYC"],
    regulations: ["DoT Unified License", "NSDT Directives", "TRAI QoS Norms", "IT Act"],
    challenges: [
      "Reconciling Adjusted Gross Revenue (AGR) calculations and license fee filings.",
      "Vetting telecom supply chains under the National Security Directive on Telecommunications."
    ],
    outcomes: [
      "100% accurate AGR reporting with zero dispute demand notices from DoT.",
      "Certified 'Trusted Source' network rollouts with zero unauthorized hardware risks."
    ],
    color: "from-indigo-600 to-blue-800",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "DoT Statutory Currency" },
      { value: "0", label: "Trusted Source Violations" },
      { value: "↓ 80", suffix: "%", label: "Subscriber KYC Delays" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "electric-vehicles",
    title: "Electric Vehicles & Clean Mobility",
    subtitle: "Battery Safety & AIS Regulations",
    icon: Zap,
    focusAreas: ["AIS 156 Battery Safety", "FAME/EMPS Subsidies", "Battery EPR"],
    regulations: ["AIS 156 / AIS 038", "CMVR Rules", "Battery Waste Rules 2022", "PMP Norms"],
    challenges: [
      "Meeting stringent thermal runaway and water immersion battery safety benchmarks.",
      "Proving Phased Manufacturing Program (PMP) domestic value addition for subsidies."
    ],
    outcomes: [
      "Rapid ARAI/ICAT battery type approvals and zero thermal fire recalls.",
      "Accelerated government subsidy disbursement with zero retrospective clawbacks."
    ],
    color: "from-emerald-600 to-teal-700",
    cluster: "Technology & Electronics",
    stats: [
      { value: "0", label: "Thermal Battery Recalls" },
      { value: "100", suffix: "%", label: "AIS 156 Pass Rate" },
      { value: "100", suffix: "%", label: "PMP Subsidy Realization" },
      { value: "12-18", suffix: " mo", label: "Capital Recovery" }
    ]
  },
  {
    id: "cybersecurity-services",
    title: "Cybersecurity & InfoSec Services",
    subtitle: "Managed Security & CERT-In Compliance",
    icon: ShieldCheck,
    focusAreas: ["CERT-In 6-Hour Filings", "SOC 2 Type II", "Vulnerability GRC"],
    regulations: ["CERT-In Directives 2022", "ISO 27001:2022", "DPDP Act 2023", "NCIIPC Guidelines"],
    challenges: [
      "Adhering to mandatory 6-hour cybersecurity incident reporting to CERT-In.",
      "Maintaining air-gapped forensic log retention and continuous multi-tenant security."
    ],
    outcomes: [
      "100% statutory CERT-In reporting currency with zero non-compliance notices.",
      "Elite SOC 2 Type II attestation driving premium enterprise client onboarding."
    ],
    color: "from-blue-700 to-indigo-900",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "CERT-In 6-Hr Compliance" },
      { value: "0", label: "Critical Log Gaps" },
      { value: "↓ 70", suffix: "%", label: "Audit Evidence Prep Time" },
      { value: "9-12", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "fintech-digital-payments",
    title: "Fintech & Digital Payments",
    subtitle: "RBI Payment Aggregator Norms & Data Security",
    icon: CreditCard,
    focusAreas: ["RBI PA/PG Licensing", "Escrow Reconciliation", "Tokenisation"],
    regulations: ["RBI PA Guidelines", "PCI-DSS v4.0", "PMLA 2002", "RBI Tokenisation Rules"],
    challenges: [
      "Reconciling high-velocity merchant settlement escrows under RBI T+1 rules.",
      "Ensuring card-on-file tokenization architecture passes PCI-DSS Level 1 audits."
    ],
    outcomes: [
      "Flawless RBI regulatory standing with zero merchant settlement escrow slippage.",
      "100% PCI-DSS v4.0 certification guaranteeing end-to-end payment security."
    ],
    color: "from-indigo-600 to-purple-800",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "Escrow Audit Accuracy" },
      { value: "0", label: "RBI Settlement Infractions" },
      { value: "100", suffix: "%", label: "PCI-DSS v4.0 Currency" },
      { value: "12-15", suffix: " mo", label: "ROI Horizon" }
    ]
  },

  // ==========================================
  // CLUSTER 3: INFRASTRUCTURE & CONSTRUCTION
  // ==========================================
  {
    id: "real-estate",
    title: "Real Estate & Urban Development",
    subtitle: "RERA Governance & Project Disclosures",
    icon: Building2,
    focusAreas: ["RERA Quarterly Filings", "Site EHS & BOCW", "Environmental NOC"],
    regulations: ["Real Estate (RERA) Act", "BOCW Act", "SEIAA Guidelines", "National Building Code"],
    challenges: [
      "Complying with 70% dedicated escrow fund withdrawal rules and quarterly progress filings.",
      "Controlling construction site scaffolding hazards and migrant worker welfare."
    ],
    outcomes: [
      "Zero RERA delay penalties and uninterrupted project sales permissions.",
      "Zero fatal construction falls and full BOCW labor cess compliance."
    ],
    color: "from-blue-600 to-cyan-700",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "RERA Stop-Sale Orders" },
      { value: "100", suffix: "%", label: "BOCW Compliance Rate" },
      { value: "↓ 70", suffix: "%", label: "QPR Filing Overhead" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "roads-highways",
    title: "Highways & Transport Infrastructure",
    subtitle: "EPC Contract Governance & Environmental Approvals",
    icon: Milestone,
    focusAreas: ["EPC Concession Agreements", "Work-Zone Safety", "Forest Clearances"],
    regulations: ["NHAI Guidelines", "IRC Safety Norms", "Forest Conservation Act", "Motor Vehicles Act"],
    challenges: [
      "Mitigating liquidated damages risks from Right-of-Way (RoW) and utility shifting delays.",
      "Maintaining high-speed traffic diversion barricading under Indian Roads Congress norms."
    ],
    outcomes: [
      "Zero concession agreement penalty claims and accelerated project milestone annuity releases.",
      "Pristine highway work-zone safety record with certified environmental clearances."
    ],
    color: "from-slate-700 to-blue-800",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Liquidated Damage Events" },
      { value: "100", suffix: "%", label: "Work-Zone IRC Compliance" },
      { value: "↓ 60", suffix: "%", label: "Clearance Delay Costs" },
      { value: "14-20", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "cement",
    title: "Cement & Building Materials",
    subtitle: "Emissions Monitoring & Quarry Licensing",
    icon: BrickWall,
    focusAreas: ["Kiln CEMS Telemetry", "Quarry Mining Leases", "Alternative Fuels"],
    regulations: ["CPCB Emission Standards", "Mines Act", "Atomic Energy / Fly Ash Norms", "Factories Act"],
    challenges: [
      "Managing continuous online stack emissions telemetry connected to CPCB/SPCB.",
      "Operating captive limestone quarries in compliance with progressive mine closure rules."
    ],
    outcomes: [
      "100% valid pollution consents with zero kiln shutdown orders.",
      "Unbroken quarry mining lease currency and safe alternative fuel co-processing."
    ],
    color: "from-amber-700 to-slate-800",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Pollution Closure Orders" },
      { value: "100", suffix: "%", label: "CEMS Data Availability" },
      { value: "100", suffix: "%", label: "Quarry Mining Compliance" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "steel",
    title: "Steel & Basic Metals",
    subtitle: "Heavy Metallurgy Safety & Slag Management",
    icon: Hammer,
    focusAreas: ["Melt-Shop EHS", "Slag Environmental Returns", "BIS Steel QCO"],
    regulations: ["Steel Quality Control Orders", "Factories Act", "SPCB Hazardous Waste Norms", "PESO"],
    challenges: [
      "Preventing blast furnace molten metal accidents and toxic carbon monoxide leaks.",
      "Guaranteeing mandatory Bureau of Indian Standards (BIS) mark compliance across structural steel."
    ],
    outcomes: [
      "Zero melt-shop catastrophic incidents and 100% BIS certification currency.",
      "100% blast furnace slag recycling compliance with clean environmental standing."
    ],
    color: "from-slate-600 to-indigo-900",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Melt-Shop Lost Time Incidents" },
      { value: "100", suffix: "%", label: "BIS QCO Mark Currency" },
      { value: "100", suffix: "%", label: "Slag Recycling Adherence" },
      { value: "16-24", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "ports-logistics",
    title: "Ports & Logistics Hubs",
    subtitle: "Customs Compliance & Port EHS Governance",
    icon: Anchor,
    focusAreas: ["Customs SCMTR", "Dock Safety Regulations", "MARPOL Compliance"],
    regulations: ["Major Port Authorities Act", "Customs Act 1962", "MARPOL 73/78", "Dock Workers Act"],
    challenges: [
      "Navigating Sea Cargo Manifest and Transhipment Regulations (SCMTR) filing timelines.",
      "Maintaining high-tonnage gantry crane safety and dangerous goods container segregations."
    ],
    outcomes: [
      "Zero customs seizure fines and accelerated container evacuation cycles.",
      "Flawless dock safety inspectorate clearance with zero marine pollution violations."
    ],
    color: "from-cyan-700 to-blue-900",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Customs Manifest Fines" },
      { value: "100", suffix: "%", label: "Dock Safety Clearance" },
      { value: "↓ 65", suffix: "%", label: "Vessel Dwell Penalties" },
      { value: "12-18", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "metro-rail-transit",
    title: "Urban Metro & Rail Transit",
    subtitle: "Metro Rail Safety & Public Works Compliance",
    icon: Train,
    focusAreas: ["CMRS Safety Dossiers", "25kV Traction Safety", "Station Fire Egress"],
    regulations: ["Metro Railways Act 2002", "CMRS Directives", "National Building Code", "Electricity Act"],
    challenges: [
      "Compiling exhaustive Commissioner of Metro Railway Safety (CMRS) safety cases for commercial launch.",
      "Managing high-voltage overhead catenary wire maintenance and underground tunnel settlement sensors."
    ],
    outcomes: [
      "100% CMRS clearance on initial submission, avoiding expensive project launch delays.",
      "Zero passenger traction accidents and verified subterranean structural stability."
    ],
    color: "from-blue-600 to-indigo-800",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "100", suffix: "%", label: "CMRS First-Time Clearance" },
      { value: "0", label: "Traction Electrical Incidents" },
      { value: "100", suffix: "%", label: "Station Fire NOC Currency" },
      { value: "18-24", suffix: " mo", label: "Capital Recovery" }
    ]
  },

  // ==========================================
  // CLUSTER 4: ENERGY & UTILITIES
  // ==========================================
  {
    id: "renewable-energy",
    title: "Renewable Energy (Solar & Wind)",
    subtitle: "Grid Compliance & Land Due Diligence",
    icon: Sun,
    focusAreas: ["Land Title Diligence", "Grid SLDC Scheduling", "PPA Obligations"],
    regulations: ["CERC Grid Code", "Electricity Act 2003", "Solar / Wind PPA Norms", "E-Waste Rules"],
    challenges: [
      "Securing clear, undisputed title deeds for multi-thousand-acre solar and wind parks.",
      "Minimizing Deviation Settlement Mechanism (DSM) penalties through accurate power forecasting."
    ],
    outcomes: [
      "100% bankable, litigation-free land titles ready for project finance syndication.",
      "Minimization of DSM grid penalties and full PPA minimum generation adherence."
    ],
    color: "from-amber-500 to-emerald-600",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "Title Deed Disputes" },
      { value: "↓ 70", suffix: "%", label: "DSM Grid Penalties" },
      { value: "100", suffix: "%", label: "PPA Quota Fulfilment" },
      { value: "10-16", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "oil-gas",
    title: "Oil, Gas & Refining",
    subtitle: "PESO Licensing & Pipeline Safety",
    icon: Fuel,
    focusAreas: ["PESO Approvals", "Pipeline Integrity EHS", "Refinery Emissions"],
    regulations: ["Petroleum Act 1934", "Oil Mines Regulations 2017", "PESO Rules", "CPCB CEMS Norms"],
    challenges: [
      "Preventing well-site blowout hazards and pipeline corrosion leaks across long cross-country routes.",
      "Sustaining multi-point PESO operational licenses across hazardous terminal depots."
    ],
    outcomes: [
      "Zero catastrophic pipeline breaches and continuous valid PESO operating permissions.",
      "100% compliance with CPCB sulfur recovery and fence-line VOC emission standards."
    ],
    color: "from-amber-600 to-slate-800",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "Pipeline Containment Losses" },
      { value: "100", suffix: "%", label: "PESO License Currency" },
      { value: "100", suffix: "%", label: "Refinery Emission Compliance" },
      { value: "16-24", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "power-grid",
    title: "Power Transmission & Distribution",
    subtitle: "Grid Reliability & Substation EHS",
    icon: Zap,
    focusAreas: ["CEA Safety Regulations", "Arc-Flash Safety", "SCADA Cybersecurity"],
    regulations: ["Electricity Act 2003", "CEA Safety & Supply Rules", "IEGC Grid Code", "NCIIPC Norms"],
    challenges: [
      "Managing high-voltage substation arc-flash safety and lockout/tagout protocols for maintenance crews.",
      "Hardening SCADA energy telemetry against state-sponsored critical infrastructure cyberattacks."
    ],
    outcomes: [
      "Zero fatal electrocution accidents across transmission grid operations.",
      "Hardened SCADA telemetry with certified NCIIPC critical infrastructure protections."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "Fatal Substation Incidents" },
      { value: "100", suffix: "%", label: "CEA Safety Clearance" },
      { value: "0", label: "SCADA Cyber Intrusions" },
      { value: "12-18", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "mining",
    title: "Mining & Mineral Operations",
    subtitle: "DGMS Guidelines & Environmental Restoration",
    icon: Mountain,
    focusAreas: ["DGMS Slope Stability", "Blasting Explosives EHS", "Reclamation Escrow"],
    regulations: ["Mines Act 1952", "MMDR Act", "DGMS Circulars", "Forest Conservation Act"],
    challenges: [
      "Controlling open-cast pit wall slope failures through radar telemetry overwatch.",
      "Accounting for progressive mine closure funds and forest compensatory afforestation registers."
    ],
    outcomes: [
      "Zero slope collapse incidents and flawless DGMS quarterly inspection clearances.",
      "100% legal compliance with IBM mine closure plans, safeguarding mining lease renewals."
    ],
    color: "from-slate-700 to-amber-800",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "DGMS Stop-Work Orders" },
      { value: "100", suffix: "%", label: "Blasting Safety Compliance" },
      { value: "100", suffix: "%", label: "Reclamation Fund Audit" },
      { value: "14-20", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "bioenergy",
    title: "Biomass & Waste-to-Energy",
    subtitle: "Bio-Power Safety & Emission Consents",
    icon: Leaf,
    focusAreas: ["Boiler IBR Inspection", "Flue Gas CEMS", "Feedstock Fire EHS"],
    regulations: ["Solid Waste Management Rules", "Indian Boiler Regulations", "CPCB CEMS Standards"],
    challenges: [
      "Managing high-temperature biomass boiler tube erosion and statutory IBR annual approvals.",
      "Preventing spontaneous combustion fires across multi-acre agricultural residue fuel yards."
    ],
    outcomes: [
      "Zero boiler shutdown orders with 100% valid IBR certificates.",
      "Verified flue gas emissions within CPCB dioxin/furan limits, maintaining green power status."
    ],
    color: "from-emerald-600 to-teal-800",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "Boiler Failure Days" },
      { value: "100", suffix: "%", label: "CEMS Emission Compliance" },
      { value: "0", label: "Feedstock Fire Incidents" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "hydrogen-gas",
    title: "Industrial Gas & Clean Hydrogen",
    subtitle: "PESO Gas Standards & Clean Hydrogen Safety",
    icon: Wind,
    focusAreas: ["PESO Cascade Vessels", "H2 Embrittlement", "Zone 0/1 Hazardous EHS"],
    regulations: ["Gas Cylinders Rules 2016", "SMPV Rules", "PESO Hydrogen Norms", "ISO 19880"],
    challenges: [
      "Detecting micro-leaks in ultra-high pressure (700 bar) hydrogen dispensing networks.",
      "Maintaining intrinsic safety certifications for electrical equipment in Zone 0/1 areas."
    ],
    outcomes: [
      "Zero explosive gas containment losses and 100% current PESO storage permits.",
      "Certified National Green Hydrogen Mission compliance accelerating production subsidies."
    ],
    color: "from-cyan-600 to-blue-800",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "High-Pressure Gas Leaks" },
      { value: "100", suffix: "%", label: "PESO License Currency" },
      { value: "100", suffix: "%", label: "Green Subsidy Eligibility" },
      { value: "14-20", suffix: " mo", label: "Compliance ROI" }
    ]
  },

  // ==========================================
  // CLUSTER 5: FINANCIAL SERVICES
  // ==========================================
  {
    id: "banking",
    title: "Commercial & Cooperative Banking",
    subtitle: "Banking Compliance & RBI Risk Governance",
    icon: Landmark,
    focusAreas: ["RBI Master Directions", "Cybersecurity (CSFB)", "AML / KYC Oversight"],
    regulations: ["Banking Regulation Act", "RBI CSFB Framework", "PMLA 2002", "RBI Outsourcing Norms"],
    challenges: [
      "Adhering to RBI Master Directions on asset classifications, capital adequacy, and board reporting.",
      "Maintaining 24/7 continuous SOC overwatch across core banking and SWIFT transaction nodes."
    ],
    outcomes: [
      "Pristine RBI Annual Financial Inspection (AFI) ratings with zero supervisory penalty notices.",
      "Hardened banking infrastructure insulated from cyber extortion and unauthorized wire fraud."
    ],
    color: "from-blue-700 to-indigo-900",
    cluster: "Financial Services",
    stats: [
      { value: "0", label: "Supervisory Penalty Events" },
      { value: "100", suffix: "%", label: "RBI CSFB Adherence" },
      { value: "↓ 80", suffix: "%", label: "Audit Evidence Prep Time" },
      { value: "12-18", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "financial-services",
    title: "Capital Markets & NBFCs",
    subtitle: "Corporate Finance & SEBI Disclosure Risk",
    icon: Briefcase,
    focusAreas: ["SEBI LODR Disclosures", "NBFC Scale-Based Regs", "Insider Trading SDD"],
    regulations: ["SEBI (LODR) Regulations", "RBI Scale-Based Regulations", "SEBI (PIT) Rules", "PMLA 2002"],
    challenges: [
      "Automating structured digital database (SDD) maintenance for unpublished price-sensitive info (UPSI).",
      "Meeting RBI Scale-Based Regulation capital adequacy (CRAR) and asset-liability management rules."
    ],
    outcomes: [
      "Zero stock exchange scrutiny notices and 100% SEBI LODR disclosure compliance.",
      "Seamless NBFC regulatory capital compliance ensuring uninterrupted institutional debt access."
    ],
    color: "from-indigo-600 to-purple-800",
    cluster: "Financial Services",
    stats: [
      { value: "0", label: "SEBI Inquiry Notices" },
      { value: "100", suffix: "%", label: "CRAR Capital Compliance" },
      { value: "100", suffix: "%", label: "UPSI SDD Verification" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "insurance",
    title: "Insurance Companies & Intermediaries",
    subtitle: "IRDAI Audits & Claim Settlement Governance",
    icon: Shield,
    focusAreas: ["IRDAI Solvency Margins", "Policyholder Protection", "Fraud Analytics"],
    regulations: ["Insurance Act 1938", "IRDAI Regulations", "Use & File Guidelines", "PMLA 2002"],
    challenges: [
      "Calculating and defending statutory solvency margin ratios with the IRDAI.",
      "Meeting strict claim settlement turnaround times while detecting organized fraud syndicates."
    ],
    outcomes: [
      "100% solvency margin currency and accelerated 'Use and File' product approvals.",
      "Elevated claim settlement ratio with minimized fraud claim loss leakage."
    ],
    color: "from-blue-600 to-teal-700",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "Solvency Margin Currency" },
      { value: "0", label: "IRDAI Mis-Selling Penalties" },
      { value: "↓ 60", suffix: "%", label: "Claim Investigation TAT" },
      { value: "12-18", suffix: " mo", label: "Capital Recovery" }
    ]
  },
  {
    id: "microfinance",
    title: "Microfinance & Rural Lending",
    subtitle: "NBFC-MFI Fair Practices & Priority Lending",
    icon: Coins,
    focusAreas: ["Income Assessment Norms", "Recovery Fair Practices", "PSL Compliance"],
    regulations: ["RBI Microfinance Directions 2022", "PMLA 2002", "Priority Sector Lending Norms"],
    challenges: [
      "Ensuring field agents strictly adhere to qualifying household income assessment rules.",
      "Eliminating coercive collection tactics across thousands of rural borrower self-help groups."
    ],
    outcomes: [
      "Zero borrower harassment grievances and sustained top-tier MFIN rating.",
      "100% Priority Sector Lending (PSL) portfolio verification, accelerating bank funding."
    ],
    color: "from-emerald-600 to-teal-800",
    cluster: "Financial Services",
    stats: [
      { value: "0", label: "Borrower Harassment Claims" },
      { value: "100", suffix: "%", label: "Household Income Audits" },
      { value: "100", suffix: "%", label: "PSL Verification Score" },
      { value: "9-15", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "wealth-management",
    title: "Wealth & Asset Management",
    subtitle: "SEBI Portfolio Governance & AIF Compliance",
    icon: Briefcase,
    focusAreas: ["SEBI PMS Regulations", "AIF Fund Governance", "Advisory Segregation"],
    regulations: ["SEBI (PMS) Regulations 2020", "SEBI (AIF) Regulations 2012", "PMLA KYC Rules"],
    challenges: [
      "Maintaining auditable client risk-profiling histories and minimum investment tracking.",
      "Ensuring strict arm's-length segregation between wealth distribution and advisory fees."
    ],
    outcomes: [
      "Flawless SEBI inspection reports with zero investor mis-selling grievances.",
      "Complete AIF valuation transparency attracting global institutional capital."
    ],
    color: "from-indigo-700 to-slate-900",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "SEBI PMS Inspection Pass" },
      { value: "0", label: "Mis-Selling Penalty Orders" },
      { value: "↓ 70", suffix: "%", label: "Investor Onboarding TAT" },
      { value: "12-18", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "payments",
    title: "Payment Aggregators & Gateways",
    subtitle: "RBI Payment Gateways & Tokenisation Norms",
    icon: CreditCard,
    focusAreas: ["RBI PA Guidelines", "Escrow Reconciliation", "Tokenisation"],
    regulations: ["RBI Payment Aggregator Directives", "PCI-DSS v4.0", "DPDP Act 2023"],
    challenges: [
      "Reconciling complex T+1 merchant funds settlement across multiple nodal banking partners.",
      "Meeting stringent PCI-DSS v4.0 card-on-file tokenization and vault security mandates."
    ],
    outcomes: [
      "100% verified settlement escrow balance accuracy with zero RBI compliance infractions.",
      "Unbroken PCI-DSS Level 1 certification securing billions in transaction volume."
    ],
    color: "from-purple-600 to-indigo-800",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "Escrow Audit Accuracy" },
      { value: "0", label: "Settlement Dispute Notices" },
      { value: "100", suffix: "%", label: "PCI-DSS v4.0 Certification" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },

  // ==========================================
  // CLUSTER 6: HEALTHCARE & LIFE SCIENCES
  // ==========================================
  {
    id: "healthcare",
    title: "Hospitals & Healthcare Networks",
    subtitle: "NABH Accreditation & Clinical Quality",
    icon: Stethoscope,
    focusAreas: ["NABH Accreditation", "Bio-Medical Waste EHS", "Patient Health Privacy"],
    regulations: ["Clinical Establishments Act", "NABH Standards", "Bio-Medical Waste Rules", "DPDP Act"],
    challenges: [
      "Sustaining hospital-wide clinical audit registers, surgical safety checklists, and incident logs.",
      "Preventing bio-medical waste segregation failures across wards, ICUs, and laboratories."
    ],
    outcomes: [
      "Unbroken NABH hospital accreditation renewal with elite clinical quality scoring.",
      "Zero bio-medical waste pollution board violations and protected patient health data privacy."
    ],
    color: "from-blue-600 to-teal-700",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "NABH Audit Compliance" },
      { value: "0", label: "Bio-Waste Notice Events" },
      { value: "0", label: "Patient Data Leaks" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals & Formulations",
    subtitle: "GMP Data Integrity & CDSCO Audits",
    icon: Pill,
    focusAreas: ["cGMP Form 28", "21 CFR Part 11 Integrity", "Cleanroom Qualification"],
    regulations: ["Drugs and Cosmetics Act", "US FDA cGMP", "WHO-GMP", "Schedule M (Revised)"],
    challenges: [
      "Passing unannounced US FDA and CDSCO regulatory audits with zero Form 483 citations.",
      "Validating computerized laboratory instrument audit trails to prevent data falsification."
    ],
    outcomes: [
      "100% data integrity compliance with clean US FDA and European GMP inspection outcomes.",
      "Protected active pharmaceutical supply lines to regulated global healthcare markets."
    ],
    color: "from-emerald-600 to-blue-700",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "0", label: "FDA 483 Observations" },
      { value: "100", suffix: "%", label: "21 CFR Part 11 Integrity" },
      { value: "↓ 80", suffix: "%", label: "Batch Record Audit Time" },
      { value: "18-24", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "medical-devices",
    title: "Medical Devices & Diagnostics",
    subtitle: "Device Quality Systems & CDSCO MDR Compliance",
    icon: Activity,
    focusAreas: ["CDSCO MDR 2017", "ISO 13485 QMS", "Unique Device ID (UDI)"],
    regulations: ["Medical Device Rules 2017", "ISO 13485:2016", "ISO 14971", "EU MDR"],
    challenges: [
      "Compiling Device Master Files (DMF) for Class A/B/C/D manufacturing and import approvals.",
      "Implementing GS1 Unique Device Identification (UDI) serialization and labeling rules."
    ],
    outcomes: [
      "Accelerated CDSCO regulatory marketing authorizations and unrestricted export access.",
      "100% ISO 13485 certified quality management system with zero post-market recall notices."
    ],
    color: "from-cyan-600 to-indigo-700",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "CDSCO License Currency" },
      { value: "0", label: "Device Recall Notices" },
      { value: "100", suffix: "%", label: "UDI Barcode Adherence" },
      { value: "12-18", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "biotechnology",
    title: "Biotechnology & Clinical Research",
    subtitle: "Bio-Safety SOPs & Clinical Trial Ethics",
    icon: Dna,
    focusAreas: ["RCGM / GEAC Approvals", "BSL-2/3 Containment", "Clinical Trials (GCP)"],
    regulations: ["Rules 1989 (EPA)", "Good Clinical Practices (GCP)", "Biological Diversity Act"],
    challenges: [
      "Navigating Review Committee on Genetic Manipulation (RCGM) approvals for recombinant products.",
      "Managing Biosafety Level 2/3 containment integrity and worker biohazard protection."
    ],
    outcomes: [
      "100% statutory biosecurity approvals, fast-tracking biosimilar clinical trial phases.",
      "Zero pathogen containment breaches and flawless ethical committee clinical trial compliance."
    ],
    color: "from-purple-600 to-indigo-800",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "RCGM Approval Currency" },
      { value: "0", label: "Biocontainment Breaches" },
      { value: "100", suffix: "%", label: "GCP Trial Ethics Pass" },
      { value: "14-20", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "diagnostic-labs",
    title: "Diagnostic & Pathology Laboratories",
    subtitle: "NABL Accreditation & Bio-Waste Management",
    icon: Microscope,
    focusAreas: ["NABL ISO 15189", "Bio-Waste Autoclave EHS", "Diagnostic Data Privacy"],
    regulations: ["NABL ISO 15189:2022", "Clinical Establishments Act", "Bio-Medical Waste Rules", "DPDP"],
    challenges: [
      "Maintaining calibrator reagent traceability and internal quality control (IQC) documentation.",
      "Ensuring diagnostic test results and sensitive patient health data are encrypted and protected."
    ],
    outcomes: [
      "Unbroken NABL ISO 15189 laboratory accreditation driving clinician trust.",
      "Zero specimen mix-up incidents and full statutory bio-medical waste compliance."
    ],
    color: "from-teal-600 to-blue-800",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "NABL Accreditation Score" },
      { value: "0", label: "Sample Mix-Up Errors" },
      { value: "0", label: "Bio-Waste Disposal Fines" },
      { value: "10-16", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "ayush",
    title: "AYUSH & Integrative Medicine",
    subtitle: "Ministry of AYUSH Standards & GMP Licensing",
    icon: Sparkles,
    focusAreas: ["Schedule T GMP", "Botanical Purity Testing", "Advertising Claims"],
    regulations: ["Drugs and Cosmetics Act (Schedule T)", "AYUSH Premium Mark", "Magic Remedies Act"],
    challenges: [
      "Proving absence of heavy metals (lead, arsenic) and pesticide residues in botanical raw materials.",
      "Complying with Drugs and Magic Remedies advertising guidelines to avoid marketing litigation."
    ],
    outcomes: [
      "Attainment of AYUSH Premium Mark certification, unlocking lucrative export contracts.",
      "Zero misleading advertisement notices with validated scientific claim substantiation."
    ],
    color: "from-emerald-700 to-teal-800",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "Schedule T GMP Pass" },
      { value: "0", label: "Heavy Metal Residue Violations" },
      { value: "0", label: "Magic Remedies Notices" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "pharmaceutical-manufacturing",
    title: "Pharmaceutical Manufacturing",
    subtitle: "GMP Data Integrity & CDSCO Audits",
    icon: Pill,
    focusAreas: ["Revised Schedule M", "Sterile Parenteral Validation", "API Precursor Logs"],
    regulations: ["Drugs & Cosmetics Act", "Schedule M (Revised 2023)", "WHO-GMP", "US FDA cGMP"],
    challenges: [
      "Complying with upgraded Schedule M HVAC differential pressure and computerized system validation.",
      "Maintaining zero contamination in sterile injectable formulation filling lines."
    ],
    outcomes: [
      "Pristine CDSCO and international GMP audit clearances with zero critical observations.",
      "100% batch manufacturing record (BMR) data integrity and continuous drug license currency."
    ],
    color: "from-blue-600 to-indigo-800",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "0", label: "Critical GMP Audit Findings" },
      { value: "100", suffix: "%", label: "Schedule M Validation" },
      { value: "100", suffix: "%", label: "Drug License Currency" },
      { value: "16-24", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "healthcare-delivery",
    title: "Healthcare Delivery Systems",
    subtitle: "Hospital Quality & Patient Safety Governance",
    icon: Stethoscope,
    focusAreas: ["Clinical Governance", "Infection Control EHS", "EHR Patient Privacy"],
    regulations: ["Clinical Establishments Act", "NABH Standards", "Bio-Medical Waste Rules", "DPDP Act"],
    challenges: [
      "Maintaining continuous compliance with hospital infection control and surgical safety checklists.",
      "Protecting patient health diagnostic histories under the Digital Personal Data Protection Act."
    ],
    outcomes: [
      "Unbroken NABH hospital accreditation, cementing reputation as an elite care institution.",
      "Zero healthcare-associated outbreak penalties and protected patient electronic health records."
    ],
    color: "from-teal-600 to-blue-800",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "NABH Accreditation Score" },
      { value: "0", label: "Infection Control Breaches" },
      { value: "0", label: "Patient Privacy Incidents" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },

  // ==========================================
  // CLUSTER 7: FOOD PROCESSING
  // ==========================================
  {
    id: "food-processing",
    title: "Food Processing & Packaged Goods",
    subtitle: "HACCP Safety & Traceability Logs",
    icon: Utensils,
    focusAreas: ["FSSAI Licensing", "HACCP / ISO 22000", "Packaging Legal Metrology"],
    regulations: ["FSSAI Act 2006", "ISO 22000 (FSMS)", "Legal Metrology Packaged Rules", "BIS Standards"],
    challenges: [
      "Enforcing strict farm-to-fork batch traceability and allergen cross-contamination controls.",
      "Ensuring nutritional labeling, ingredient disclosures, and Legal Metrology meet statutory rules."
    ],
    outcomes: [
      "Zero product recall orders and 100% clean FSSAI state and central inspection audits.",
      "Verified raw material provenance and certified food safety management across all lines."
    ],
    color: "from-amber-600 to-emerald-700",
    cluster: "Food Processing",
    stats: [
      { value: "0", label: "FSSAI Product Recalls" },
      { value: "100", suffix: "%", label: "FSMS Audit Pass Rate" },
      { value: "↓ 75", suffix: "%", label: "Batch Traceability Speedup" },
      { value: "12-18", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "dairy-beverages",
    title: "Dairy, Beverages & Breweries",
    subtitle: "FSSAI Safety Standards & Effluent Oversight",
    icon: Sprout,
    focusAreas: ["Raw Milk Adulteration GRC", "Pasteurization Thermal Logs", "High-BOD Wastewater"],
    regulations: ["FSSAI Milk Standards", "CPCB Zero Liquid Discharge", "BIS 14543", "Boiler Act"],
    challenges: [
      "Detecting chemical adulteration and antibiotic residues at farm milk chilling centers.",
      "Operating high-BOD anaerobic brewery wastewater digesters within strict SPCB limits."
    ],
    outcomes: [
      "100% pure raw milk intake with complete pasteurizer thermal recorder compliance.",
      "Zero environmental pollution notices and successful biogas energy recovery."
    ],
    color: "from-emerald-600 to-teal-700",
    cluster: "Food Processing",
    stats: [
      { value: "0", label: "Milk Adulteration Incidents" },
      { value: "100", suffix: "%", label: "Pasteurization Telemetry Logs" },
      { value: "100", suffix: "%", label: "SPCB Wastewater Currency" },
      { value: "12-18", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "cold-chain",
    title: "Cold Chain & Perishable Logistics",
    subtitle: "Cold Chain FSMS & Temperature Integrity",
    icon: Snowflake,
    focusAreas: ["FSMS Temperature Telemetry", "Reefer Fleet Driver EHS", "Pharma GDP Traceability"],
    regulations: ["FSSAI Cold Chain Norms", "CDSCO GDP Guidelines", "Motor Transport Workers Act", "ISO 22000"],
    challenges: [
      "Preventing temperature excursion spoilage across multimodal road, air, and staging hubs.",
      "Complying with hazardous refrigerant gas containment and statutory commercial driver rest hours."
    ],
    outcomes: [
      "Zero temperature excursion product losses and 100% auditable IoT temperature records.",
      "Fully certified WHO-GDP distribution for life-saving vaccines and premium perishables."
    ],
    color: "from-cyan-600 to-blue-700",
    cluster: "Food Processing",
    stats: [
      { value: "0", label: "Temperature Spoilage Loss" },
      { value: "100", suffix: "%", label: "IoT Telemetry Uptime" },
      { value: "100", suffix: "%", label: "WHO-GDP Audit Compliance" },
      { value: "10-16", suffix: " mo", label: "Capital Payback" }
    ]
  },
  {
    id: "nutraceuticals",
    title: "Nutraceuticals & Health Supplements",
    subtitle: "Nutraceutical Regulations & Labeling Audits",
    icon: Apple,
    focusAreas: ["FSSAI Health Supplements 2022", "Heavy Metal Testing", "Claim Substantiation"],
    regulations: ["FSSAI (Nutraceuticals) Regulations", "Consumer Protection Act", "Legal Metrology Rules"],
    challenges: [
      "Ensuring formulation dosages remain within statutory Recommended Dietary Allowance (RDA) limits.",
      "Substantiating therapeutic and wellness claims with validated clinical evidence to satisfy regulators."
    ],
    outcomes: [
      "100% compliant product formulations avoiding regulatory seizure and marketing injunctions.",
      "Zero misleading advertisement notices from ASCI or the Central Consumer Protection Authority."
    ],
    color: "from-teal-600 to-emerald-700",
    cluster: "Food Processing",
    stats: [
      { value: "100", suffix: "%", label: "FSSAI RDA Limit Adherence" },
      { value: "0", label: "Misleading Claim Notices" },
      { value: "0", label: "Heavy Metal Residue Violations" },
      { value: "9-15", suffix: " mo", label: "Payback Period" }
    ]
  },

  // ==========================================
  // CLUSTER 8: CONSUMER & RETAIL
  // ==========================================
  {
    id: "retail",
    title: "Retail Stores & Supermarkets",
    subtitle: "Shop Safety & Workforce Compliance",
    icon: Store,
    focusAreas: ["Shops & Establishments", "Legal Metrology MRP", "Fire Safety Egress"],
    regulations: ["State Shops & Establishments Acts", "Legal Metrology Act", "Municipal Fire NOCs"],
    challenges: [
      "Managing municipal shop licenses, opening hour variances, and statutory displays across hundreds of stores.",
      "Preventing Legal Metrology inspector notices regarding dual pricing and packaged commodity labeling."
    ],
    outcomes: [
      "100% current shop registrations nationwide with zero store closure notices.",
      "Zero Legal Metrology seizure penalties and verified in-store fire emergency egress safety."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "Shop License Currency" },
      { value: "0", label: "Municipal Store Sealings" },
      { value: "0", label: "Legal Metrology Fines" },
      { value: "9-15", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "textiles",
    title: "Textiles, Garments & Apparel",
    subtitle: "Social Compliance & Zero Liquid Discharge",
    icon: Scissors,
    focusAreas: ["Buyer Social Audits (SMETA)", "ZLD Dyeing ETP", "Cotton Dust Health EHS"],
    regulations: ["Factories Act", "WRAP / SMETA Criteria", "SPCB ZLD Norms", "ZDHC Guidelines"],
    challenges: [
      "Passing unannounced global buyer social audits regarding working hours, overtime pay, and labor welfare.",
      "Operating complex Zero Liquid Discharge (ZLD) effluent plants in textile processing clusters."
    ],
    outcomes: [
      "Preferred export vendor status with 100% buyer social audit pass ratings.",
      "Continuous ZLD consent currency protecting production lines from environmental closure orders."
    ],
    color: "from-indigo-600 to-purple-700",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "Buyer Audit Pass Rate" },
      { value: "0", label: "ZLD Non-Compliance Days" },
      { value: "0", label: "Labor Department Penalties" },
      { value: "12-18", suffix: " mo", label: "ROI Horizon" }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce & Digital Marketplaces",
    subtitle: "Marketplace Integrity & User Trust",
    icon: ShoppingCart,
    focusAreas: ["Consumer Protection Rules", "DPDP Customer Privacy", "Warehouse Logistics EHS"],
    regulations: ["Consumer Protection (E-Commerce) Rules", "DPDP Act 2023", "IT Act Sec 79 (Safe Harbor)"],
    challenges: [
      "Complying with country-of-origin disclosure rules, ticketed customer grievance turnaround times.",
      "Protecting buyer address and payment token vaults under the Digital Personal Data Protection Act."
    ],
    outcomes: [
      "100% compliance with consumer protection rules, maintaining statutory safe harbor protections.",
      "Zero consumer data breaches and fully compliant fulfillment center warehouse operations."
    ],
    color: "from-blue-600 to-cyan-700",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "Consumer Rule Compliance" },
      { value: "0", label: "Safe Harbor Loss Events" },
      { value: "0", label: "Customer Data Leaks" },
      { value: "10-16", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "jewellery",
    title: "Gems, Jewellery & Luxury Retail",
    subtitle: "BIS Hallmarking & AML/CFT Due Diligence",
    icon: Gem,
    focusAreas: ["BIS 6-Digit HUID", "PMLA / FIU-IND Reporting", "Strongroom Vault EHS"],
    regulations: ["BIS Hallmarking Regulations", "PMLA (Bullion Dealer Norms)", "Consumer Protection Act"],
    challenges: [
      "Enforcing 100% Hallmark Unique Identification (HUID) laser serialization across every inventory piece.",
      "Reporting high-value cash transactions and verifying customer identity under FIU-IND anti-money laundering rules."
    ],
    outcomes: [
      "100% BIS hallmarking compliance with zero counterfeit gold seizure events.",
      "Flawless FIU-IND audit record and fully insured strongroom physical security."
    ],
    color: "from-amber-600 to-indigo-800",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "HUID Hallmarking Rate" },
      { value: "0", label: "FIU-IND Penalty Notices" },
      { value: "100", suffix: "%", label: "Insurance Warranty Compliance" },
      { value: "12-18", suffix: " mo", label: "Capital Recovery" }
    ]
  },
  {
    id: "consumer-durables",
    title: "Consumer Durables & Electronics",
    subtitle: "BEE Star Labeling & E-Waste EPR",
    icon: Tv,
    focusAreas: ["BEE Energy Labeling", "E-Waste EPR Targets", "BIS Mandatory QCO"],
    regulations: ["BEE Energy Conservation Act", "E-Waste Rules 2022", "BIS Electronics QCO Orders"],
    challenges: [
      "Renewing Bureau of Energy Efficiency star ratings and submitting annual production test logs.",
      "Fulfilling nationwide e-waste collection and certified recycling targets through CPCB portals."
    ],
    outcomes: [
      "Unbroken BEE star label currency and zero retail market product seizure risks.",
      "100% Extended Producer Responsibility (EPR) quota fulfillment without statutory penalty fines."
    ],
    color: "from-blue-700 to-indigo-900",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "BEE Star Rating Currency" },
      { value: "100", suffix: "%", label: "E-Waste EPR Fulfilment" },
      { value: "0", label: "BIS QCO Seizure Notices" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "quick-commerce",
    title: "Quick Commerce & Hyperlocal Delivery",
    subtitle: "Dark Store Safety & Gig Workforce Compliance",
    icon: Bike,
    focusAreas: ["Dark Store Municipal NOC", "Gig Worker Welfare", "Perishable Expiry Logs"],
    regulations: ["Shops & Establishments Act", "Code on Social Security (Gig Workers)", "Municipal Fire Codes"],
    challenges: [
      "Licensing dense urban dark store micro-warehouses while meeting stringent fire egress and load limits.",
      "Managing gig delivery rider accident insurance, EV battery safety, and local noise restrictions."
    ],
    outcomes: [
      "100% licensed operational dark stores with zero municipal sealing notices.",
      "Ethical, compliant gig workforce management insulated from labor department citations."
    ],
    color: "from-emerald-600 to-blue-700",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "Dark Store License Currency" },
      { value: "0", label: "Municipal Sealing Actions" },
      { value: "100", suffix: "%", label: "Rider Insurance Adherence" },
      { value: "9-15", suffix: " mo", label: "ROI Horizon" }
    ]
  },

  // ==========================================
  // CLUSTER 9: MEDIA & SERVICES
  // ==========================================
  {
    id: "education-training",
    title: "Higher Education & Training Institutions",
    subtitle: "Institutional Governance & Accreditation",
    icon: GraduationCap,
    focusAreas: ["UGC / AICTE Accreditation", "Campus Fire Safety", "Student Data Privacy"],
    regulations: ["UGC Regulations", "AICTE Norms", "NAAC Guidelines", "DPDP Act 2023"],
    challenges: [
      "Managing vast institutional evidence archives for NAAC and NBA accreditation cycles.",
      "Securing student personal databases and online examination portals from cyber tampering."
    ],
    outcomes: [
      "Attainment of prestigious NAAC Grade A+ accreditation status, elevating institutional standing.",
      "Zero campus safety incidents and robust DPDP personal data protections for all students."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "NAAC Criteria Compliance" },
      { value: "0", label: "Campus Safety Deviations" },
      { value: "0", label: "Examination Data Leaks" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "tourism-hospitality",
    title: "Hospitality & Hotels",
    subtitle: "Hotel Safety & Guest Privacy",
    icon: Hotel,
    focusAreas: ["HRACC Star Classification", "Kitchen FSSAI Hygiene", "Police C-Form Filings"],
    regulations: ["Ministry of Tourism Guidelines", "FSSAI Regulations", "Foreigners Act (C-Form)", "Fire NOC"],
    challenges: [
      "Passing rigorous 5-Star HRACC inspections across room amenities, kitchen hygiene, and accessibility.",
      "Managing daily commercial banquet food safety logs and mandatory police guest registration portals."
    ],
    outcomes: [
      "Elite 5-Star / Heritage hotel categorization award driving premium room yields.",
      "Zero food safety incidents and 100% timely immigration police compliance."
    ],
    color: "from-amber-600 to-slate-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "HRACC Star Classification" },
      { value: "0", label: "Food Hygiene Penalty Events" },
      { value: "100", suffix: "%", label: "Police C-Form Compliance" },
      { value: "12-18", suffix: " mo", label: "Capital Recovery" }
    ]
  },
  {
    id: "media-entertainment",
    title: "Media & Entertainment",
    subtitle: "IP Protection & Broadcasting Compliance",
    icon: Film,
    focusAreas: ["CBFC / OTT Age Rating", "Copyright Chain of Title", "Production Set EHS"],
    regulations: ["Cinematograph Act 1952", "IT Rules 2021 (Digital Media)", "Copyright Act", "NCPCR Guidelines"],
    challenges: [
      "Navigating Central Board of Film Certification (CBFC) and OTT self-regulatory body rating codes.",
      "Ensuring stunt pyrotechnics, high-altitude rigging, and child artist hours comply with strict safety rules."
    ],
    outcomes: [
      "On-schedule theatrical and streaming releases with zero legal injunction stoppages.",
      "Pristine production set safety record with zero insurance claim disputes."
    ],
    color: "from-purple-600 to-indigo-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "Release Schedule Clearance" },
      { value: "0", label: "Copyright Injunctions" },
      { value: "0", label: "Film Set Lost-Time Accidents" },
      { value: "10-16", suffix: " mo", label: "Payback Horizon" }
    ]
  },
  {
    id: "aviation",
    title: "Aviation, Airlines & Airport Hubs",
    subtitle: "DGCA Safety Standards & Airport EHS",
    icon: Plane,
    focusAreas: ["DGCA Safety Requirements", "Aerodrome Fire (ARFF)", "BCAS Security Passes"],
    regulations: ["DGCA Civil Aviation Requirements (CAR)", "Aircraft Rules 1937", "BCAS Norms", "ICAO Annexes"],
    challenges: [
      "Adhering to mandatory DGCA pilot flight duty time limitations (FDTL) and airworthiness directives.",
      "Maintaining airport rescue and firefighting (ARFF) response times under strict aerodrome licensing rules."
    ],
    outcomes: [
      "100% DGCA safety audit pass rate with zero flight grounding orders.",
      "Continuous aerodrome license validity and uncompromised airside security."
    ],
    color: "from-blue-600 to-cyan-700",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "DGCA Safety Audit Score" },
      { value: "0", label: "Regulatory Flight Groundings" },
      { value: "100", suffix: "%", label: "Aerodrome License Currency" },
      { value: "16-24", suffix: " mo", label: "Compliance ROI" }
    ]
  },
  {
    id: "broadcasting",
    title: "Television Broadcasting & Cable Networks",
    subtitle: "Broadcasting Code & Telecom Regulations",
    icon: Tv,
    focusAreas: ["MIB Uplinking Permissions", "Cable TV Programme Code", "TRAI Quality of Service"],
    regulations: ["Cable TV Networks Act 1995", "MIB Policy Guidelines 2022", "TRAI QoS Regulations"],
    challenges: [
      "Ensuring 24/7 broadcast transmission feeds strictly comply with advertising and programme codes.",
      "Auditing digital addressable system (DAS) encryption logs and subscriber billing records for TRAI."
    ],
    outcomes: [
      "100% broadcast license currency with zero Ministry of Information & Broadcasting show-cause notices.",
      "Flawless TRAI audit record with zero consumer grievance financial penalties."
    ],
    color: "from-indigo-600 to-slate-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "MIB License Currency" },
      { value: "0", label: "Broadcast Advisory Warnings" },
      { value: "100", suffix: "%", label: "TRAI QoS Audit Clearance" },
      { value: "12-18", suffix: " mo", label: "Payback Period" }
    ]
  },
  {
    id: "sports-events",
    title: "Sports Leagues, Arenas & Large Events",
    subtitle: "Mass Gathering Safety & Fire NOC Protocols",
    icon: Trophy,
    focusAreas: ["Stadium Structural Safety", "Multi-Agency Police NOC", "Spectator Liability EHS"],
    regulations: ["Disaster Management Act 2005", "National Building Code", "Police Public Amusement Rules"],
    challenges: [
      "Securing engineering certifications for temporary spectator grandstands, staging, and turnstiles.",
      "Coordinating multi-agency permits across local police, municipal fire, and medical response units."
    ],
    outcomes: [
      "100% pre-event safety clearance with zero crowd surge or structural safety incidents.",
      "Comprehensive public liability and event cancellation insurance protection."
    ],
    color: "from-amber-600 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "Pre-Event NOC Approvals" },
      { value: "0", label: "Crowd Safety Incidents" },
      { value: "100", suffix: "%", label: "Structural Safety Score" },
      { value: "10-16", suffix: " mo", label: "ROI Horizon" }
    ]
  }
];

export const getIndustryById = (id: string): IndustrySegment | undefined => {
  return industriesData.find(ind => ind.id === id);
};

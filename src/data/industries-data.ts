import { 
  Car, Wrench, Settings, ShieldAlert, Store, Laptop, Cpu, PhoneCall, FlaskConical, Zap, 
  BrickWall, Hammer, Building2, Home, Milestone, Fuel, BatteryCharging, Sun, Anchor, Train, 
  Landmark, Coins, HeartHandshake, ShoppingCart, Gem, Pill, Activity, Stethoscope, Dna, Leaf, 
  ShoppingBag, Tv, Scissors, Utensils, Film, Hotel, Plane, GraduationCap, Sprout
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
  // Cluster 1: Manufacturing & Industrial
  {
    id: "automobiles",
    title: "Automobiles",
    subtitle: "Automotive Manufacturing & EHS Compliance",
    icon: Car,
    focusAreas: ["Assembly Safety", "EHS Registers", "Supply Chain Audit"],
    regulations: ["Factories Act", "ISO 14001", "Motor Vehicles Act", "BIS Standard"],
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
    title: "Auto Components",
    subtitle: "Tier-1/2 Supplier Audits & Quality Standards",
    icon: Wrench,
    focusAreas: ["Quality Control", "Subcontractor Risk", "Labour Laws"],
    regulations: ["IATF 16949", "CLRA Act", "Factories Act", "EPA Norms"],
    challenges: [
      "Meeting strict global buyer audits and IATF quality standards.",
      "Managing massive contract workforces and wage reconciliations."
    ],
    outcomes: [
      "Preferred Tier-1 status with seamless buyer social audits.",
      "100% compliance with local contract labor and factory safety laws."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "100", suffix: "%", label: "OEM Audit Pass Rate" },
      { value: "↓ 40", suffix: "%", label: "Subcontractor Risks" },
      { value: "↓ 50", suffix: "%", label: "Wage Dispute Events" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "engineering-capital-goods",
    title: "Engineering & Capital Goods",
    subtitle: "Heavy Machinery Safety & Operational Risk",
    icon: Settings,
    focusAreas: ["Operational Safety", "Machinery Standards", "EHS Audit"],
    regulations: ["Factories Act", "ISO 45001", "BOCW Safety", "Customs Act"],
    challenges: [
      "Hazards associated with heavy machinery fabrication and testing.",
      "Managing logistics and customs documentation for imported machinery components."
    ],
    outcomes: [
      "Stellar workplace safety rating, minimizing liability claims.",
      "Clean customs audits and uninterrupted supply chains."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "0", label: "Major Rig Accidents" },
      { value: "100", suffix: "%", label: "Customs Audit Clearance" },
      { value: "↓ 35", suffix: "%", label: "Reporting Overheads" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "defence-manufacturing",
    title: "Defence Manufacturing",
    subtitle: "Military Logistics & Strict Security GRC",
    icon: ShieldAlert,
    focusAreas: ["Information Security", "NDAs & IP Protection", "Quality Assurance"],
    regulations: ["DPD Guidelines", "ISO 27001", "Armaments Act", "DRDO Standards"],
    challenges: [
      "Stringent cybersecurity and national security data protection rules.",
      "Fiduciary liabilities regarding military supply contracts and audits."
    ],
    outcomes: [
      "Approved military vendor certification, zero security leaks.",
      "Perfect ratings on product quality and traceability checks."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "0", label: "Military Data Leaks" },
      { value: "100", suffix: "%", label: "DRDO Standards Audited" },
      { value: "↓ 75", suffix: "%", label: "Audit Prep Overhead" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "msme",
    title: "MSME",
    subtitle: "Scaling Business Compliance & Government Schemes",
    icon: Store,
    focusAreas: ["Statutory Compliance", "Working Capital Audits", "GST Filing"],
    regulations: ["MSMED Act", "GST Rules", "CLRA Act", "EPF & ESIC"],
    challenges: [
      "High compliance overhead relative to limited administrative staff.",
      "Managing regulatory updates and accessing central incentives."
    ],
    outcomes: [
      "Legally compliant operations, avoiding costly penalties.",
      "Smooth financing audits with verified financial and compliance logs."
    ],
    color: "from-blue-600 to-indigo-700",
    cluster: "Manufacturing & Industrial",
    stats: [
      { value: "↓ 50", suffix: "%", label: "Compliance Costs" },
      { value: "100", suffix: "%", label: "Statutory Registers Filed" },
      { value: "↓ 60", suffix: "%", label: "Tax Penalty Exposures" },
      { value: "6-12", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 2: Technology & Electronics
  {
    id: "it-bpm",
    title: "IT & BPM",
    subtitle: "Information Security & Global Data Governance",
    icon: Laptop,
    focusAreas: ["Data Protection", "ISO 27001", "Client SLA Audits"],
    regulations: ["DPDP Act 2023", "GDPR Compliance", "SOC 2 Type II", "CERT-In"],
    challenges: [
      "Managing cross-border customer records under diverse privacy rules.",
      "Mitigating cybersecurity threats across vast remote worker networks."
    ],
    outcomes: [
      "Enterprise trust and eligibility for premium offshore contracts.",
      "Secure data pipelines with zero reportable leakage incidents."
    ],
    color: "from-cyan-600 to-blue-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "0", label: "Reportable DPDP Leaks" },
      { value: "100", suffix: "%", label: "User Consent Audited" },
      { value: "↓ 80", suffix: "%", label: "Audit Prep Speedup" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "electronics-semiconductor",
    title: "Electronics & Semiconductor",
    subtitle: "Cleanroom EHS & IP Protection",
    icon: Cpu,
    focusAreas: ["IP Protection", "Chemical Hazards", "Supply Chain Traceability"],
    regulations: ["E-Waste Rules", "Factories Act", "EPA Guidelines", "Customs Act"],
    challenges: [
      "Handling toxic semiconductor fabrication waste safely.",
      "Protecting proprietary circuit designs and intellectual property."
    ],
    outcomes: [
      "Environmentally compliant fabrication, zero SPCB warnings.",
      "Audit-proof IP protection workflows and secure dev networks."
    ],
    color: "from-cyan-600 to-blue-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "0", label: "Cleanroom EHS Events" },
      { value: "100", suffix: "%", label: "E-Waste Target Compliance" },
      { value: "↓ 40", suffix: "%", label: "Customs Hold-Ups" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    subtitle: "Spectrum Licensing & User Privacy",
    icon: PhoneCall,
    focusAreas: ["Spectrum Adherence", "User Privacy", "EMF Radiation"],
    regulations: ["TRAI Regulations", "DPDP Act", "EMF Guidelines", "ISO 27001"],
    challenges: [
      "Compliance with TRAI Quality of Service (QoS) and emission limits.",
      "Encrypting call data records and managing user consent profiles."
    ],
    outcomes: [
      "Zero spectrum penalties, smooth audits from TRAI and DOperating Theatres (OT).",
      "Enhanced user trust with DPDP-compliant communication channels."
    ],
    color: "from-cyan-600 to-blue-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "0", label: "Spectrum Quality Fines" },
      { value: "100", suffix: "%", label: "EMF Tower Clearances" },
      { value: "↓ 65", suffix: "%", label: "Consent Audit Timelines" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "science-technology",
    title: "Science & Technology",
    subtitle: "R&D Lab Standards & Ethics Governance",
    icon: FlaskConical,
    focusAreas: ["Lab Safety", "Bio-Safety SOPs", "Ethics Review"],
    regulations: ["EPA 1986", "Hazardous Waste Rules", "IP Acts", "ISO 9001"],
    challenges: [
      "Regulatory safety clearances for biological and chemical testing labs.",
      "Governance of research datasets and ethical review filings."
    ],
    outcomes: [
      "Accredited test facilities with clean bio-safety reports.",
      "Streamlined patent filing processes with audit-ready documentation."
    ],
    color: "from-cyan-600 to-blue-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "NABL Accreditation" },
      { value: "0", label: "Biohazard Escapes" },
      { value: "↓ 50", suffix: "%", label: "IP Audits Redundancies" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "electric-vehicles",
    title: "Electric Vehicles",
    subtitle: "Battery Safety & Green Manufacturing",
    icon: Zap,
    focusAreas: ["Battery Safety Standards", "FAME Incentives Audits", "E-Waste"],
    regulations: ["AIS 156 Standards", "FAME Guidelines", "E-Waste Rules", "Motor Vehicles Act"],
    challenges: [
      "Meeting battery testing and thermal runway protection rules.",
      "Audit logs verification for availing clean energy incentives."
    ],
    outcomes: [
      "100% compliant battery packs, preventing safety incidents.",
      "Successful FAME audits unlocking regulatory subsidies."
    ],
    color: "from-cyan-600 to-blue-600",
    cluster: "Technology & Electronics",
    stats: [
      { value: "100", suffix: "%", label: "AIS 156 Battery Stamp" },
      { value: "0", label: "Battery Fire Events" },
      { value: "↓ 60", suffix: "%", label: "FAME Audit Timelines" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 3: Infrastructure & Construction
  {
    id: "cement",
    title: "Cement",
    subtitle: "Heavy Mining Safety & Carbon Footprints",
    icon: BrickWall,
    focusAreas: ["Carbon Emission Tracking", "Mine Safety", "Logistics Audits"],
    regulations: ["Mines Act", "EPA Guidelines", "BRSR Standards", "Factories Act"],
    challenges: [
      "Mitigating carbon emissions and monitoring stack emission limits.",
      "HSE protocols for limestone mining and high-heat kiln processes."
    ],
    outcomes: [
      "Compliance with environmental norms, avoiding factory shutdowns.",
      "Stellar ESG rankings, unlocking sustainable development funding."
    ],
    color: "from-orange-600 to-amber-600",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Mines Act Violations" },
      { value: "100", suffix: "%", label: "CEMS Realtime Compliance" },
      { value: "↓ 40", suffix: "%", label: "ESG Reporting Delays" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "steel",
    title: "Steel",
    subtitle: "Metallurgy EHS & Industrial Compliance",
    icon: Hammer,
    focusAreas: ["Furnace Safety", "Contractor Wages", "Waste Management"],
    regulations: ["Factories Act", "ISO 14001", "CLRA Act", "SPCB Norms"],
    challenges: [
      "Extreme safety hazards and environmental compliance in steel plants.",
      "Ensuring social compliance audits across extensive vendor bases."
    ],
    outcomes: [
      "Stellar safety registers, avoiding administrative penalties.",
      "Uninterrupted manufacturing with clean environmental approvals."
    ],
    color: "from-orange-600 to-amber-600",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "Furnace EHS Incidents" },
      { value: "100", suffix: "%", label: "ZLD Effluent Compliance" },
      { value: "↓ 50", suffix: "%", label: "Contractor Wage Claims" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    subtitle: "EPC Project Risk & Environmental Clearances",
    icon: Building2,
    focusAreas: ["EPC Governance", "Forest & Environment Clearances", "SLA Audits"],
    regulations: ["BOCW Act", "Land Acquisition Act", "EPA 1986", "ISO 9001"],
    challenges: [
      "Complex environmental clearances for highways and bridge projects.",
      "Site safety compliance for thousands of on-site contract workers."
    ],
    outcomes: [
      "Zero litigation and delay on environmental clearances.",
      "Safe project construction sites conforming to BOCW safety laws."
    ],
    color: "from-orange-600 to-amber-600",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "100", suffix: "%", label: "BOCW Scaffold Clearance" },
      { value: "0", label: "Environmental Closures" },
      { value: "↓ 55", suffix: "%", label: "Project Delay Risks" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "RERA Disclosures & Escrow Cash Audits",
    icon: Home,
    focusAreas: ["RERA Filings", "Escrow Reconciliation", "BOCW Safety"],
    regulations: ["RERA Act 2016", "Building Bye-Laws", "CLRA Act", "BOCW Act"],
    challenges: [
      "Strict quarterly project disclosures and customer grievance registers.",
      "Managing funds within designated project escrow accounts."
    ],
    outcomes: [
      "Stronger buyer confidence with zero warning letters from RERA.",
      "Audit-proof financial accounting, minimizing cash-routing penalties."
    ],
    color: "from-orange-600 to-amber-600",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "100", suffix: "%", label: "RERA Quarterly Filings" },
      { value: "0", label: "Escrow Cash Penalties" },
      { value: "↓ 70", suffix: "%", label: "Buyer Dispute Speeds" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "roads-highways",
    title: "Roads & Highways",
    subtitle: "Public Concessions & Contractor Oversight",
    icon: Milestone,
    focusAreas: ["Concession SLA", "Environmental Restoration", "NHAI Norms"],
    regulations: ["NHAI Guidelines", "BOCW Act", "EPA", "Arbitration Act"],
    challenges: [
      "Adhering to strict concession agreements and NHAI specifications.",
      "Post-construction environmental remediation audits."
    ],
    outcomes: [
      "Successful project handovers with zero concession penalties.",
      "100% compliance with green belt and dust control regulations."
    ],
    color: "from-orange-600 to-amber-600",
    cluster: "Infrastructure & Construction",
    stats: [
      { value: "0", label: "NHAI Concession Fines" },
      { value: "100", suffix: "%", label: "Toll Cash Audit Traces" },
      { value: "↓ 45", suffix: "%", label: "Environmental Audits" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 4: Energy & Utilities
  {
    id: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Pipeline Safety & Environmental Overwatch",
    icon: Fuel,
    focusAreas: ["Refinery EHS", "Pipeline Integrity", "Pollution Compliance"],
    regulations: ["OISD Guidelines", "EPA 1986", "PNG Rules", "ISO 14001"],
    challenges: [
      "Extremely high-hazard refinery operations and gas pipeline leakage risks.",
      "Stringent maritime and environmental pollution regulations at terminals."
    ],
    outcomes: [
      "Zero oil spill incidents, fully compliant OISD safety audits.",
      "Continuous operations with active environmental licenses."
    ],
    color: "from-yellow-600 to-amber-500",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "OISD Refinery Violations" },
      { value: "100", suffix: "%", label: "Pipeline Integrity Logs" },
      { value: "↓ 80", suffix: "%", label: "Audit Timeline Spans" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "power",
    title: "Power",
    subtitle: "Grid Reliability & Tariff GRC",
    icon: BatteryCharging,
    focusAreas: ["Grid Compliance", "Tariff GRC", "Emission Monitoring"],
    regulations: ["CERC/SERC Rules", "EPA Norms", "Grid Code", "ISO 50001"],
    challenges: [
      "Complex grid compliance codes and real-time frequency targets.",
      "Filing and tracking tariff schedules across state agencies."
    ],
    outcomes: [
      "Protected revenue with optimized tariff capture and filings.",
      "Grid stability and zero regulatory non-compliance events."
    ],
    color: "from-yellow-600 to-amber-500",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "Grid Code Deviations" },
      { value: "100", suffix: "%", label: "CEMS Emission Compliance" },
      { value: "↓ 50", suffix: "%", label: "Tariff Filing Delay" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    subtitle: "Solar & Wind Subsidy Audits",
    icon: Sun,
    focusAreas: ["Carbon Credits", "Subsidy Verification", "Land Approvals"],
    regulations: ["RPO Guidelines", "REC Mechanisms", "Land Acts", "CEA Rules"],
    challenges: [
      "Fulfilling renewable purchase obligations (RPO) and carbon credit logs.",
      "Auditing land acquisitions for large wind/solar parks."
    ],
    outcomes: [
      "Unlocked carbon credits and green energy incentives.",
      "Stellar ESG profile, securing international sustainable financing."
    ],
    color: "from-yellow-600 to-amber-500",
    cluster: "Energy & Utilities",
    stats: [
      { value: "100", suffix: "%", label: "Carbon Credit Stamp" },
      { value: "0", label: "Land Title Disputes" },
      { value: "↓ 60", suffix: "%", label: "REC Audit Timelines" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "ports",
    title: "Ports",
    subtitle: "Maritime Security & Customs Audits",
    icon: Anchor,
    focusAreas: ["Maritime Security", "Customs Audits", "EHS at Docks"],
    regulations: ["ISPS Code", "Customs Act", "Major Port Trusts Act", "EPA"],
    challenges: [
      "Ensuring port facility security under international ISPS maritime codes.",
      "Tracking container clearances and avoiding cargo congestion penalties."
    ],
    outcomes: [
      "International port compliance, attracting premium shipping lines.",
      "Efficient cargo throughput with clean customs auditing trails."
    ],
    color: "from-yellow-600 to-amber-500",
    cluster: "Energy & Utilities",
    stats: [
      { value: "0", label: "ISPS Rating Warnings" },
      { value: "100", suffix: "%", label: "Cargo Customs Trace" },
      { value: "↓ 40", suffix: "%", label: "Container Congestions" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "railways",
    title: "Railways",
    subtitle: "Track EHS & Metro Rail Safety",
    icon: Train,
    focusAreas: ["Metro Safety", "Track Maintenance EHS", "Procurement GRC"],
    regulations: ["Railway Act", "CMRS Guidelines", "BOCW Safety", "GFR Rules"],
    challenges: [
      "Securing safety clearances from the Commissioner of Railway Safety (CMRS).",
      "Procurement transparency for massive rail coaches and systems."
    ],
    outcomes: [
      "Successful metro rail line clearances, zero safety incidents.",
      "Audit-proof procurement records under GFR rules."
    ],
    color: "from-yellow-600 to-amber-500",
    cluster: "Energy & Utilities",
    stats: [
      { value: "100", suffix: "%", label: "CMRS Safety Approvals" },
      { value: "0", label: "Metro Safety Incidents" },
      { value: "↓ 50", suffix: "%", label: "Procurement Overheads" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 5: Financial Services
  {
    id: "banking",
    title: "Banking",
    subtitle: "Banking Compliance & Risk Governance",
    icon: Landmark,
    focusAreas: ["AML & KYC", "RBI Master Circulars", "Cyber Resilience"],
    regulations: ["RBI Master Directions", "PMLA Act", "FEMA Rules", "ISO 27001"],
    challenges: [
      "Dynamic KYC, AML monitoring, and fraudulent transactions prevention.",
      "Adhering to strict RBI IT outsourcing and vendor risk frameworks."
    ],
    outcomes: [
      "Flawless RBI inspection ratings, avoiding central banking penalties.",
      "Protected user deposits with secure, audited network controls."
    ],
    color: "from-stone-600 to-neutral-700",
    cluster: "Financial Services",
    stats: [
      { value: "0", label: "RBI Statutory Penalties" },
      { value: "100", suffix: "%", label: "PMLA KYC Compliance" },
      { value: "↓ 80", suffix: "%", label: "RBI IT Outsourcing Risks" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "financial-services",
    title: "Financial Services",
    subtitle: "Corporate Finance & Capital Markets Risk",
    icon: Coins,
    focusAreas: ["SEBI Disclosures", "Compliance Auditing", "Risk Registers"],
    regulations: ["SEBI Regulations", "Companies Act 2013", "FEMA", "DPDP Act"],
    challenges: [
      "Complying with complex SEBI LODR corporate disclosure schedules.",
      "Mitigating market and operational risks inside capital service firms."
    ],
    outcomes: [
      "Highest standards of corporate governance, attracting investors.",
      "Protected user records, fully DPDP-compliant operations."
    ],
    color: "from-stone-600 to-neutral-700",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "SEBI LODR Compliance" },
      { value: "0", label: "Disclosure Omission Fines" },
      { value: "↓ 70", suffix: "%", label: "DPDP Consent Timelines" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "IRDAI Audits & Claim Settlement Governance",
    icon: HeartHandshake,
    focusAreas: ["Claim Audits", "IRDAI Reporting", "Data Classification"],
    regulations: ["IRDAI Guidelines", "DPDP Act", "Insurance Act", "PMLA"],
    challenges: [
      "Ensuring fair claim settlement practices under IRDAI consumer codes.",
      "Securing policyholder medical and financial records against leaks."
    ],
    outcomes: [
      "High claim settlement ratio status with clean IRDAI compliance logs.",
      "100% compliance with data privacy regulations, boosting policyholder trust."
    ],
    color: "from-stone-600 to-neutral-700",
    cluster: "Financial Services",
    stats: [
      { value: "0", label: "IRDAI Consumer Fines" },
      { value: "100", suffix: "%", label: "Medical Data Privacy" },
      { value: "↓ 60", suffix: "%", label: "Claim Leakage Rates" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    subtitle: "Marketplace Integrity & User Trust",
    icon: ShoppingCart,
    focusAreas: ["Data Privacy", "GST Reconciliation", "Consumer Protection"],
    regulations: ["DPDP Act", "Consumer Protection Act", "FDI Guidelines", "GST Rules"],
    challenges: [
      "Managing user consent and tracking data processing activities.",
      "Regulatory alignment with FDI guidelines on marketplace inventory."
    ],
    outcomes: [
      "Complete legal compliance for consumer data portals.",
      "Protected platform operations with zero FDI compliance investigations."
    ],
    color: "from-stone-600 to-neutral-700",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "FDI Guidelines Audited" },
      { value: "0", label: "PCI-DSS Data Leaks" },
      { value: "↓ 50", suffix: "%", label: "Shopper Dispute Filing" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "gems-jewellery",
    title: "Gems & Jewellery",
    subtitle: "Gold Hallmarking & Supply Traceability",
    icon: Gem,
    focusAreas: ["Supply Traceability", "Gold Hallmarking", "PMLA Compliance"],
    regulations: ["BIS Hallmarking", "PMLA Rules", "Customs Act", "FEMA"],
    challenges: [
      "Ensuring absolute origin tracking and BIS hallmarking compliance.",
      "High KYC and transaction monitoring under PMLA anti-money laundering codes."
    ],
    outcomes: [
      "Approved BIS jeweller status, guaranteeing product integrity.",
      "Audit-proof PMLA registers, avoiding transaction-monitoring penalties."
    ],
    color: "from-stone-600 to-neutral-700",
    cluster: "Financial Services",
    stats: [
      { value: "100", suffix: "%", label: "BIS Hallmarking Stamps" },
      { value: "0", label: "PMLA Compliance Warnings" },
      { value: "↓ 40", suffix: "%", label: "Customs Hold Delays" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 6: Healthcare & Life Sciences
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    subtitle: "GMP Data Integrity & CDSCO Audits",
    icon: Pill,
    focusAreas: ["GMP Compliance", "Data Integrity", "Schedule M"],
    regulations: ["USFDA Norms", "CDSCO Guidelines", "Schedule M", "ALCOA+ Rules"],
    challenges: [
      "Maintaining absolute data integrity (ALCOA+) on batch records.",
      "Securing clean GMP approvals for exports to US and European markets."
    ],
    outcomes: [
      "Successful global drug inspections, zero USFDA warning letters.",
      "Seamless CDSCO audit approvals for local pharmaceutical units."
    ],
    color: "from-emerald-600 to-teal-600",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "0", label: "USFDA Warning Letters" },
      { value: "100", suffix: "%", label: "ALCOA+ Data Integrity" },
      { value: "↓ 70", suffix: "%", label: "SPCB Water Clearance" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "NABH Accreditation & Clinical Quality",
    icon: Activity,
    focusAreas: ["NABH Quality", "Patient Privacy", "Clinical SOPs"],
    regulations: ["NABH Standards", "DPDP Act", "Clinical Establishments Act", "NMC Guidelines"],
    challenges: [
      "Meeting hundreds of quality indicators for NABH accreditation.",
      "Protecting patients' health records against cloud database leaks."
    ],
    outcomes: [
      "Accredited hospital status, improving healthcare brand value.",
      "100% DPDP-compliant hospital record management systems."
    ],
    color: "from-emerald-600 to-teal-600",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "NABH Quality Accredit" },
      { value: "0", label: "EMR Health Data Leaks" },
      { value: "↓ 60", suffix: "%", label: "Biohazard Fine Risks" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "medical-devices",
    title: "Medical Devices",
    subtitle: "Hardware Safety & Clinical Trials",
    icon: Stethoscope,
    focusAreas: ["Device Validation", "Clinical Trials", "ISO 13485"],
    regulations: ["MDR 2017", "CDSCO Guidelines", "ISO 13485", "ISO 14971"],
    challenges: [
      "Complex CDSCO registration for life-critical medical devices.",
      "Running clinical investigations according to ethical guidelines."
    ],
    outcomes: [
      "Device manufacturing clearance, zero product recalls.",
      "Accurate device trial datasets with approved ethics logs."
    ],
    color: "from-emerald-600 to-teal-600",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "ISO 13485 QMS Standard" },
      { value: "0", label: "Product Recalls Events" },
      { value: "↓ 50", suffix: "%", label: "Clinical Trial Delays" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "biotechnology",
    title: "Biotechnology",
    subtitle: "Bio-Safety Clearances & DNA Governance",
    icon: Dna,
    focusAreas: ["Bio-Safety SOPs", "IP Audits", "Waste Pathways"],
    regulations: ["RCGM Guidelines", "EPA 1986", "Patent Act", "Hazardous Waste Rules"],
    challenges: [
      "Obiting clearances from the Review Committee on Genetic Manipulation (RCGM).",
      "Responsible storage and disposal of bio-hazardous lab materials."
    ],
    outcomes: [
      "Approved bio-tech facility status, zero biosafety incidents.",
      "Audit-proof IP protection workflows for biotech discoveries."
    ],
    color: "from-emerald-600 to-teal-600",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "RCGM Safety Approvals" },
      { value: "0", label: "Lab Biohazard Incidents" },
      { value: "↓ 55", suffix: "%", label: "Patent Filing Overheads" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "ayush",
    title: "Ayush",
    subtitle: "Traditional Medicine GMP & Standardisation",
    icon: Leaf,
    focusAreas: ["GMP Compliance", "Ingredient Verification", "Ayush Mark"],
    regulations: ["Ayush Mark Rules", "Schedule T GMP", "FSSAI Guidelines", "WLPA Act"],
    challenges: [
      "Authenticating raw herb sourcing under wildlife protection codes.",
      "Conforming to traditional formulations under Schedule T GMP."
    ],
    outcomes: [
      "Gold-level Ayush Mark certification, boosting product sales.",
      "Statutory herbal raw material sourcing audits, fully verified."
    ],
    color: "from-emerald-600 to-teal-600",
    cluster: "Healthcare & Life Sciences",
    stats: [
      { value: "100", suffix: "%", label: "Schedule T GMP Audited" },
      { value: "100", suffix: "%", label: "Ayush Mark Certification" },
      { value: "↓ 40", suffix: "%", label: "Herb Source Violations" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 7: Consumer & Retail
  {
    id: "fmcg",
    title: "FMCG",
    subtitle: "Supply Chain Traceability & ESG Reporting",
    icon: ShoppingBag,
    focusAreas: ["Batch Traceability", "Legal Metrology", "EHS Registers"],
    regulations: ["FSSAI", "Legal Metrology Act", "E-Waste Rules", "BRSR Standards"],
    challenges: [
      "Strict labeling, packaging, and shelf-life regulations under FSSAI.",
      "Managing carbon footprint data across high-volume supply networks."
    ],
    outcomes: [
      "Smooth product packaging checks, zero legal metrology notices.",
      "Verified ESG metrics aligned with BRSR corporate standards."
    ],
    color: "from-purple-600 to-pink-600",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "FSSAI Labeling Norms" },
      { value: "0", label: "Food Recall Disasters" },
      { value: "↓ 60", suffix: "%", label: "BRSR ESG Reporting" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "retail",
    title: "Retail",
    subtitle: "Shop Safety & Inventory GRC",
    icon: Store,
    focusAreas: ["Shop Act License", "Labour compliance", "Consumer Disputes"],
    regulations: ["Shops & Establishments Act", "Consumer Protection Act", "CLRA", "GST"],
    challenges: [
      "Ensuring work hours limits and wage compliance for thousands of staff.",
      "Managing consumer complaints and warranty service SLA trackers."
    ],
    outcomes: [
      "Uninterrupted retail store operations with valid municipal licenses.",
      "Stellar rating on consumer grievance redressal systems."
    ],
    color: "from-purple-600 to-pink-600",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "Shop Act Licenses Clear" },
      { value: "0", label: "Labor Code Penalties" },
      { value: "↓ 50", suffix: "%", label: "Consumer Forum Suits" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "consumer-durables",
    title: "Consumer Durables",
    subtitle: "Electronic Testing & E-Waste Audits",
    icon: Tv,
    focusAreas: ["BEE Energy Rating", "E-Waste Target Compliance", "EHS at Plant"],
    regulations: ["BEE Guidelines", "E-Waste Rules", "BIS Standards", "Factories Act"],
    challenges: [
      "Obtaining BEE star ratings and BIS safety certificates for home appliances.",
      "Fulfilling EPR (Extended Producer Responsibility) e-waste collection targets."
    ],
    outcomes: [
      "Certified energy-efficient appliances, zero BIS safety notices.",
      "Successful EPR audits, avoiding electronic waste penalties."
    ],
    color: "from-purple-600 to-pink-600",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "BEE Energy Ratings" },
      { value: "100", suffix: "%", label: "BIS Safety Stamp Pass" },
      { value: "↓ 60", suffix: "%", label: "EPR Recycled Targets" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "textiles",
    title: "Textiles",
    subtitle: "Social Compliance & Zero Liquid Discharge",
    icon: Scissors,
    focusAreas: ["Social Audits", "ZLD Compliance", "Contractor Wages"],
    regulations: ["BSCI Code", "CLRA Act", "Factories Act", "SPCB Consent Norms"],
    challenges: [
      "Meeting strict social audit criteria (BSCI, GOTS) for export buyers.",
      "Operating Zero Liquid Discharge (ZLD) effluent units at dyeing plants."
    ],
    outcomes: [
      "Preferred global textile vendor status, zero audit warnings.",
      "Clean water discharge records, fully compliant environmental licenses."
    ],
    color: "from-purple-600 to-pink-600",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "BSCI / GOTS Audit Stamp" },
      { value: "100", suffix: "%", label: "ZLD Effluent Clearances" },
      { value: "0", label: "Child Labor Violations" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "food-processing",
    title: "Food Processing",
    subtitle: "HACCP Safety & Traceability Logs",
    icon: Utensils,
    focusAreas: ["Food Safety SOPs", "Batch Traceability", "HACCP Audit"],
    regulations: ["FSSAI Rules", "ISO 22000", "EPA Guidelines", "Customs Act"],
    challenges: [
      "Ensuring cleanrooms hygiene and absolute food safety controls.",
      "Maintaining batch-traceability records from farm to retail packaging."
    ],
    outcomes: [
      "Successful FSSAI audits, preventing batch contamination recalls.",
      "ISO 22000 certified processing plants, unlocking export channels."
    ],
    color: "from-purple-600 to-pink-600",
    cluster: "Consumer & Retail",
    stats: [
      { value: "100", suffix: "%", label: "ISO 22000 Certified" },
      { value: "100", suffix: "%", label: "Batch Traceability Logs" },
      { value: "0", label: "Contamination Events" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },

  // Cluster 8: Media & Services
  {
    id: "media-entertainment",
    title: "Media & Entertainment",
    subtitle: "IP Protection & Content Broadcasting GRC",
    icon: Film,
    focusAreas: ["IP Protection", "Broadcasting GRC", "Tax Compliance"],
    regulations: ["Copyright Act", "Broadcasting Code", "DPDP Act", "IT Act"],
    challenges: [
      "Mitigating digital piracy and protecting proprietary content library IPs.",
      "Complying with central broadcasting standards and advisory codes."
    ],
    outcomes: [
      "Tamper-proof copyright structures, securing content asset values.",
      "Compliant broadcasting workflows, avoiding regulatory warnings."
    ],
    color: "from-sky-700 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "IP Copyright Registry" },
      { value: "0", label: "Broadcasting Code Fines" },
      { value: "↓ 50", suffix: "%", label: "Subscriber Data Risks" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "tourism-hospitality",
    title: "Tourism & Hospitality",
    subtitle: "Hotel Safety & Customer Privacy",
    icon: Hotel,
    focusAreas: ["Hotel Safety", "Customer Privacy", "FSSAI Food Safety"],
    regulations: ["DPDP Act", "FSSAI Guidelines", "Sarais Act", "Local Licenses"],
    challenges: [
      "Securing hotel guest passport and credit card data from database leaks.",
      "Managing food hygiene and liquor licensing across hospital operations."
    ],
    outcomes: [
      "Highly secure guest database systems, avoiding privacy breaches.",
      "Valid operational licenses, zero hygiene penalty notices."
    ],
    color: "from-sky-700 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "Sarai Act Compliance" },
      { value: "0", label: "Guest Database Leaks" },
      { value: "↓ 70", suffix: "%", label: "Food Safety Warnings" },
      { value: "12-15", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "aviation",
    title: "Aviation",
    subtitle: "Aircraft EHS & DGCA Regulatory Compliance",
    icon: Plane,
    focusAreas: ["Aircraft Maintenance EHS", "DGCA Compliance", "Security Audits"],
    regulations: ["DGCA Rules", "BCAS Guidelines", "Aircraft Act", "ISO 9001"],
    challenges: [
      "Adhering to strict DGCA aircraft maintenance and air crew hour limits.",
      "BCAS airport security clearance guidelines for operations."
    ],
    outcomes: [
      "Airworthiness certification, zero regulatory safety actions.",
      "Approved airport operations under secure security logs."
    ],
    color: "from-sky-700 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "0", label: "DGCA Safety Fines" },
      { value: "100", suffix: "%", label: "BCAS Security Clearance" },
      { value: "100", suffix: "%", label: "Aircraft Flight Logs Clear" },
      { value: "18-24", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "education-training",
    title: "Education & Training",
    subtitle: "Institutional Governance & Accreditation",
    icon: GraduationCap,
    focusAreas: ["Accreditation Audits", "Student Data Privacy", "HR Policies"],
    regulations: ["UGC/AICTE Norms", "NAAC Guidelines", "DPDP Act", "CLRA"],
    challenges: [
      "Documenting compliance indicators for UGC/AICTE affiliation cycles.",
      "Managing student and parent personal data records under the DPDP Act."
    ],
    outcomes: [
      "Higher NAAC/NBA scores, improving institutional reputation.",
      "Audit-proof student portals with DPDP-compliant consent."
    ],
    color: "from-sky-700 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "NAAC Accreditation Pass" },
      { value: "100", suffix: "%", label: "Student DPDP Consent" },
      { value: "↓ 80", suffix: "%", label: "UGC Affiliation Overheads" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  },
  {
    id: "agriculture-allied",
    title: "Agriculture & Allied",
    subtitle: "Pesticide Limits & Traceable Organic Sourcing",
    icon: Sprout,
    focusAreas: ["Organic Audits", "Pesticide SOPs", "Logistics Operations"],
    regulations: ["APEDA Rules", "EPA 1986", "Insecticides Act", "FSSAI Standards"],
    challenges: [
      "Conforming to strict pesticide limits and organic farming records.",
      "Managing logistics pipelines for perishable crop inventories."
    ],
    outcomes: [
      "APEDA certified organic crop status, securing price premiums.",
      "Minimized crop wastage and flawless statutory compliance registers."
    ],
    color: "from-sky-700 to-blue-800",
    cluster: "Media & Services",
    stats: [
      { value: "100", suffix: "%", label: "APEDA Organic Certificate" },
      { value: "0", label: "Pesticide Over-Limit Alerts" },
      { value: "↓ 50", suffix: "%", label: "Supply Chain Waste" },
      { value: "12-18", suffix: " mo", label: "Average ROI Period" }
    ]
  }
];

export const getIndustryIcon = (id: string) => {
  const segment = industriesData.find(ind => ind.id === id);
  return segment ? segment.icon : Landmark;
};

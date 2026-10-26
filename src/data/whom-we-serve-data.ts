import { 
  Car, Wrench, Settings, ShieldAlert, Store, Laptop, Cpu, PhoneCall, 
  Zap, BrickWall, Hammer, Building2, Milestone, 
  Fuel, Sun, Landmark, Coins, 
  HeartHandshake, ShoppingCart, Pill, Activity, Stethoscope, 
  Dna, ShoppingBag, Scissors, Utensils, Film, Hotel, 
  GraduationCap, Factory,
  Package, Radio, HardHat
} from "lucide-react";

export interface DocumentedOfferingLink {
  serviceId: string;
  serviceName: string;
  route: string;
  relevance: string;
}

export interface BusinessSegmentItem {
  name: string;
  description: string;
  typicalOperatingModel?: string;
  relevantIndustryRisks: string[];
  applicableGrcConsiderations: string[];
  relatedVerifiedOfferings: string[];
}

export interface SubIndustryRecord {
  id: string;
  title: string;
  slug: string;
  parentClusterId: string;
  parentClusterName: string;
  subtitle: string;
  overview: string;
  icon: any;
  iconName: string;
  displayOrder: number;
  regulations: string[];
  focusAreas: string[];
  businessSegments: BusinessSegmentItem[];
  relevantGrcTopics: string[];
  linkedOfferings: DocumentedOfferingLink[];
  existingRoute: string;
  searchKeywords: string[];
  verificationStatus: "confirmed" | "potentially-relevant" | "unverified" | "excluded";
  publicationStatus: "published" | "pending-review" | "internal-only";
  reviewNotes?: string;
}

export type OrgSegment = "global" | "large-mid" | "mid-small";

export interface SegmentIndustryItem {
  segment: OrgSegment;
  industryName: string;
  businessType: string;
  shortDescription?: string;
  destinationUrl: string;
  verificationStatus: "verified" | "aligned";
}

export interface SizeSegmentsConfig {
  global: SegmentIndustryItem[];
  largeMid: SegmentIndustryItem[];
  midSmall: SegmentIndustryItem[];
}

export interface IndustryClusterRecord {
  id: string;
  name: string;
  shortDescription: string;
  icon: any;
  iconName: string;
  displayOrder: number;
  verificationStatus: "confirmed" | "potentially-relevant";
  publicationStatus: "published" | "pending-review";
  evidenceNote: string;
  keyGrcTopics: string[];
  documentedOfferings: DocumentedOfferingLink[];
  subIndustries: SubIndustryRecord[];
  sizeSegments?: SizeSegmentsConfig;
}

export const whomWeServeClusters: IndustryClusterRecord[] = [
  // ── 1. Manufacturing & Industrial ──────────────────────────────────────────
  {
    id: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    shortDescription: "Workplace safety, EHS registers, contract labour reconciliation, and supply chain vendor verification for production environments.",
    icon: Factory,
    iconName: "Factory",
    displayOrder: 1,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Explicitly documented across services-data.ts, industry-services-data.ts, and industries-data.ts.",
    keyGrcTopics: [
      "Factories Act & EHS Regulatory Filings",
      "Contract Labour (CLRA) & Wage Slips Reconciliation",
      "Pollution Control (CPCB/SPCB) & Hazardous Waste Consents",
      "Supply Chain Tier-1/Tier-2 Quality & Social Audits",
      "Statutory Registers (Form 1, 2, 7, 24) Maintenance"
    ],
    documentedOfferings: [
      {
        serviceId: "labour-law-compliance",
        serviceName: "Labour & Employment Law Compliance",
        route: "/services/labour-law-compliance",
        relevance: "CLRA registries, contractor audits, and factory inspector preparation."
      },
      {
        serviceId: "environmental-compliance",
        serviceName: "Environmental Compliance & EHS",
        route: "/services/environmental-compliance",
        relevance: "CPCB/SPCB CTE/CTO consent renewals and hazardous waste returns."
      },
      {
        serviceId: "supply-chain-compliance",
        serviceName: "Supply Chain Compliance",
        route: "/services/supply-chain-compliance",
        relevance: "Vendor verification, subcontracting audits, and site compliance."
      },
      {
        serviceId: "managed-staffing-risk-shield",
        serviceName: "Managed Staffing & Risk Shield",
        route: "/services/managed-staffing-risk-shield",
        relevance: "Co-employment liability mitigation and contract staff auditing."
      }
    ],
    subIndustries: [
      {
        id: "automobiles",
        title: "Automotive Manufacturing",
        slug: "automobiles",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Automotive Manufacturing & EHS Compliance",
        overview: "Automotive OEMs and Tier-1 systems integrators manage intricate fabrication lines, hazardous paint shops, and large contract labor forces requiring constant adherence to the Factories Act and EHS protocols.",
        icon: Car,
        iconName: "Car",
        displayOrder: 1,
        regulations: ["Factories Act 1948", "ISO 14001", "Motor Vehicles Act", "BIS Standards"],
        focusAreas: ["Assembly Safety", "EHS Registers", "Supply Chain Audit"],
        businessSegments: [
          {
            name: "Passenger & Commercial Vehicle Assembly",
            description: "Final assembly facilities coordinating robotic lines, body shops, and paint shops.",
            relevantIndustryRisks: ["Assembly floor hazard exposure", "Paint shop VOC emissions"],
            applicableGrcConsiderations: ["ISO 45001 workplace safety", "SPCB air emission consents"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          },
          {
            name: "Tier-1 Powertrain & Body Integration",
            description: "Dedicated fabrication of engines, gearboxes, and structural stampings.",
            relevantIndustryRisks: ["Machine guarding non-conformities", "Contractor roster discrepancies"],
            applicableGrcConsiderations: ["CLRA monthly contractor audits", "Hazardous waste handling rules"],
            relatedVerifiedOfferings: ["labour-law-compliance", "managed-staffing-risk-shield"]
          }
        ],
        relevantGrcTopics: [
          "Assembly-line safety & conveyor interlocking",
          "Paint shop effluent & VOC emission logs",
          "Contract labor PF/ESIC and minimum wage compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour & Employment Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Roster verification and contract worker audits under the Factories Act."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "SPCB air/water consent monitoring and hazardous sludge reporting."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#automobiles",
        searchKeywords: ["automotive", "car", "oem", "assembly", "powertrain", "factories act"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "auto-components",
        title: "Auto Components & Ancillaries",
        slug: "auto-components",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Tier-1/2 Supplier Audits & Quality Standards",
        overview: "Precision engineering, casting, machining, and stamping units supplying automotive OEMs must comply with IATF 16949 requirements, statutory labor codes, and strict buyer social compliance inspections.",
        icon: Wrench,
        iconName: "Wrench",
        displayOrder: 2,
        regulations: ["IATF 16949", "CLRA Act 1970", "Factories Act", "EPA Norms"],
        focusAreas: ["Quality Control", "Subcontractor Risk", "Labour Laws"],
        businessSegments: [
          {
            name: "Forging, Casting & Machining Units",
            description: "High-heat and heavy metal component fabricators.",
            relevantIndustryRisks: ["Molten metal handling hazards", "Effluent discharge exceeding limits"],
            applicableGrcConsiderations: ["ISO 45001 safety checks", "SPCB trade effluent limits"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          },
          {
            name: "Electrical & Electronic Components",
            description: "Wiring harnesses, sensors, and electronic control units.",
            relevantIndustryRisks: ["RoHS/REACH non-compliance", "ESD cleanroom statutory guidelines"],
            applicableGrcConsiderations: ["Hazardous substance tracking", "Vendor quality assurance audits"],
            relatedVerifiedOfferings: ["supply-chain-compliance"]
          }
        ],
        relevantGrcTopics: [
          "IATF 16949 audit preparation and corrective action",
          "Subcontractor plating and treatment risk checks",
          "Wage slip reconciliations and contract safety gear registers"
        ],
        linkedOfferings: [
          {
            serviceId: "supply-chain-compliance",
            serviceName: "Supply Chain Compliance",
            route: "/services/supply-chain-compliance",
            relevance: "Downstream subcontractor audits and buyer verification checklists."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "CLRA documentation and wage reconciliation."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#auto-components",
        searchKeywords: ["auto components", "iatf 16949", "ancillaries", "forging", "stamping", "tier-2"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "engineering-capital-goods",
        title: "Capital Goods & Heavy Machinery",
        slug: "engineering-capital-goods",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Heavy Machinery Safety & Operational Risk",
        overview: "Heavy industrial equipment, tooling, pressure vessel, and turbomachinery manufacturers operating under strict engineering standards, high-tonnage lifting regulations, and customs trade compliance.",
        icon: Settings,
        iconName: "Settings",
        displayOrder: 3,
        regulations: ["Factories Act", "ISO 45001", "BOCW Safety", "Customs Act 1962"],
        focusAreas: ["Operational Safety", "Machinery Standards", "EHS Audit"],
        businessSegments: [
          {
            name: "Industrial Tooling & Fabrication",
            description: "Heavy fabrication bays, pressure vessels, and boiler manufacturing.",
            relevantIndustryRisks: ["Lifting equipment failure", "High-pressure test ruptures"],
            applicableGrcConsiderations: ["Boiler Inspectorate approvals", "Pressure vessel certifications"],
            relatedVerifiedOfferings: ["environmental-compliance", "regulatory-compliance"]
          },
          {
            name: "Automation & Process Plant Equipment",
            description: "Custom turnkey systems, pumps, compressors, and material handling gear.",
            relevantIndustryRisks: ["Import license delays", "Technical blueprint leaks"],
            applicableGrcConsiderations: ["Customs clearance documentation", "IP and confidentiality safeguards"],
            relatedVerifiedOfferings: ["taxation-trade-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Overhead crane and pressure vessel statutory inspections",
          "Customs documentation for heavy component imports",
          "Factory stability plans and inspector clearance documentation"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental & EHS Compliance",
            route: "/services/environmental-compliance",
            relevance: "Factory safety registers and pressure equipment regulatory logs."
          },
          {
            serviceId: "taxation-trade-compliance",
            serviceName: "Taxation & Trade Compliance",
            route: "/services/taxation-trade-compliance",
            relevance: "Customs classification and import license tracking."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#engineering-capital-goods",
        searchKeywords: ["capital goods", "machinery", "heavy engineering", "fabrication", "cranes"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "defence-manufacturing",
        title: "Defence & Aerospace Manufacturing",
        slug: "defence-manufacturing",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Military Logistics & Strict Security GRC",
        overview: "Suppliers of defence equipment, aerospace structures, and military electronics operating under strict confidentiality, industrial licensing, DRDO/MoD standards, and secure physical access protocols.",
        icon: ShieldAlert,
        iconName: "ShieldAlert",
        displayOrder: 4,
        regulations: ["DPD Guidelines", "ISO 27001", "Arms Act", "DRDO/MoD Standards"],
        focusAreas: ["Information Security", "NDAs & IP Protection", "Quality Assurance"],
        businessSegments: [
          {
            name: "Aerospace Structural Assemblies",
            description: "Precision sheet metal, titanium machining, and avionics housings.",
            relevantIndustryRisks: ["Material traceability breaks", "Foreign Object Debris (FOD)"],
            applicableGrcConsiderations: ["AS9100 quality traceability", "Specialized EHS protocols"],
            relatedVerifiedOfferings: ["regulatory-compliance"]
          },
          {
            name: "Defence Electronics & Systems",
            description: "Communication payloads, radar components, and tactical sensors.",
            relevantIndustryRisks: ["Cyber intrusion on CAD servers", "ITAR/SCOMET export controls"],
            applicableGrcConsiderations: ["Air-gapped data room audits", "Export authorization compliance"],
            relatedVerifiedOfferings: ["cybersecurity-iso27001", "taxation-trade-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Information security management systems (ISO 27001) for defence designs",
          "Metallurgical traceability databases and ballistic inspection records",
          "General Financial Rules (GFR) compliance for public defence tenders"
        ],
        linkedOfferings: [
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "Safeguarding technical drawings and confidential tender records."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "GFR procurement logs and industrial license compliance."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#defence-manufacturing",
        searchKeywords: ["defence", "aerospace", "drdo", "military", "mod", "security clearance"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "msme",
        title: "MSME Manufacturing",
        slug: "msme",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Scaling Business Compliance & Statutory Records",
        overview: "Micro, small, and medium manufacturing enterprises building compliant operational foundations to prevent statutory penalties, support bank financing, and qualify as approved enterprise suppliers.",
        icon: Store,
        iconName: "Store",
        displayOrder: 5,
        regulations: ["MSMED Act 2006", "GST Rules", "CLRA Act", "EPF & ESIC"],
        focusAreas: ["Statutory Compliance", "Working Capital Audits", "GST Filing"],
        businessSegments: [
          {
            name: "Small Batch Machining & Component Units",
            description: "Tier-2/3 subcontractors producing specialized batches.",
            relevantIndustryRisks: ["Penalty exposure on delayed returns", "Delayed buyer payments"],
            applicableGrcConsiderations: ["MSMED prompt payment tracking", "Consolidated statutory calendars"],
            relatedVerifiedOfferings: ["regulatory-compliance", "statutory-payroll-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Unified statutory calendars for GST, PF, and trade licenses",
          "MSMED Act delayed payment rights and interest reconciliation",
          "Audit-proof books for institutional working capital facilities"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Multi-agency statutory calendars and penalty prevention."
          },
          {
            serviceId: "statutory-payroll-compliance",
            serviceName: "Statutory Payroll Compliance",
            route: "/services/statutory-payroll-compliance",
            relevance: "Automated PF/ESIC deductions and Form 16 management."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#msme",
        searchKeywords: ["msme", "sme", "small business", "factories", "statutory registers"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 2. Technology & Electronics ────────────────────────────────────────────
  {
    id: "technology-electronics",
    name: "Technology & Electronics",
    shortDescription: "Information security, DPDP data protection, IT governance, and subcontractor compliance for software, ITES, and hardware organizations.",
    icon: Laptop,
    iconName: "Laptop",
    displayOrder: 2,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed across services-data.ts (ISO 27001, DPDP, CERT-In, HR privacy) and industries-data.ts.",
    keyGrcTopics: [
      "Digital Personal Data Protection (DPDP Act 2023) Compliance",
      "ISO 27001 ISMS & SOC 2 Trust Principles",
      "CERT-In 6-Hour Incident Notification Playbooks",
      "Third-Party Developer & Vendor Security Due Diligence",
      "E-Waste (Management) Rules for Electronics Manufacturers"
    ],
    documentedOfferings: [
      {
        serviceId: "data-privacy-dpdp",
        serviceName: "Data Privacy & DPDP Compliance",
        route: "/services/data-privacy-dpdp",
        relevance: "Consent architecture, Data Protection Officer support, and RoPA registers."
      },
      {
        serviceId: "cybersecurity-iso27001",
        serviceName: "Cybersecurity & ISO 27001",
        route: "/services/cybersecurity-iso27001",
        relevance: "ISMS codification, SOC 2 audits, and vulnerability management."
      },
      {
        serviceId: "incident-response",
        serviceName: "Incident Response & CERT-In Support",
        route: "/services/incident-response",
        relevance: "Mandated 6-hour CERT-In reporting playbooks and forensic oversight."
      },
      {
        serviceId: "vendor-risk-management",
        serviceName: "Vendor & Third-Party Risk Management",
        route: "/services/vendor-risk-management",
        relevance: "Software vendor questionnaires and developer SLA audits."
      }
    ],
    subIndustries: [
      {
        id: "it-bpm",
        title: "IT & BPM Services",
        slug: "it-bpm",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Global Data Protection & SOC 2 Auditing",
        overview: "Software development companies, SaaS providers, and business process management organizations delivering services to domestic and multinational enterprises.",
        icon: Laptop,
        iconName: "Laptop",
        displayOrder: 1,
        regulations: ["DPDP Act 2023", "GDPR", "ISO 27001", "SOC 2 (Type II)", "IT Act 2000"],
        focusAreas: ["Data Privacy", "SOC 2 Readiness", "Vendor Risk"],
        businessSegments: [
          {
            name: "Enterprise Software & SaaS",
            description: "Cloud-hosted multi-tenant software platforms handling customer data.",
            relevantIndustryRisks: ["Tenant data leakage", "Sub-processor vendor breaches"],
            applicableGrcConsiderations: ["SOC 2 Type II controls", "DPDP consent management"],
            relatedVerifiedOfferings: ["cybersecurity-iso27001", "data-privacy-dpdp"]
          },
          {
            name: "BPM & Technical Support Centers",
            description: "High-volume operational facilities handling offshore back-office data.",
            relevantIndustryRisks: ["Employee data misuse", "Shops & Establishment hour violations"],
            applicableGrcConsiderations: ["Endpoint DLP auditing", "Labour law shift approvals"],
            relatedVerifiedOfferings: ["labour-law-compliance", "hr-data-privacy-security"]
          }
        ],
        relevantGrcTopics: [
          "DPDP 2023 consent tracking and data mapping",
          "SOC 2 Type II trust criteria and security audit trails",
          "CERT-In incident logging and 6-hour disclosure readiness"
        ],
        linkedOfferings: [
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "Continuous security control audits and SOC 2 prep."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "End-to-end data mapping and consent managers."
          }
        ],
        existingRoute: "/industries/technology-electronics#it-bpm",
        searchKeywords: ["it", "saas", "software", "bpm", "soc 2", "iso 27001", "dpdp"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "electronics-semiconductor",
        title: "Electronics & Semiconductor",
        slug: "electronics-semiconductor",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Cleanroom EHS & E-Waste Management",
        overview: "Electronics assembly units, PCB manufacturers, and semiconductor packaging facilities managing cleanroom standards, hazardous chemicals, and Extended Producer Responsibility (EPR) mandates.",
        icon: Cpu,
        iconName: "Cpu",
        displayOrder: 2,
        regulations: ["E-Waste Rules 2022", "Factories Act", "EPA 1986", "RoHS Standards"],
        focusAreas: ["E-Waste Targets", "Cleanroom EHS", "Chemical Safety"],
        businessSegments: [
          {
            name: "PCB Assembly & Electronics Manufacturing Services (EMS)",
            description: "Surface mount assembly and hardware enclosure fabrication.",
            relevantIndustryRisks: ["Lead and flux chemical fumes", "E-waste disposal non-compliance"],
            applicableGrcConsiderations: ["SPCB hazardous waste authorization", "RoHS lead-free certification"],
            relatedVerifiedOfferings: ["environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CPCB EPR portal registration and recycling target fulfillment",
          "Cleanroom airflow, ESD compliance, and chemical handling registers",
          "BIS Compulsory Registration Scheme (CRS) documentation"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "E-waste filings and hazardous chemical storage authorizations."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "BIS product certifications and factory inspection preparation."
          }
        ],
        existingRoute: "/industries/technology-electronics#electronics-semiconductor",
        searchKeywords: ["electronics", "semiconductor", "pcb", "e-waste", "cleanroom", "ems"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "telecommunications",
        title: "Telecommunications & Digital Infrastructure",
        slug: "telecommunications",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Spectrum Licensing & Critical Infrastructure Security",
        overview: "Telecom service providers, internet access providers, and tower infrastructure operators maintaining national network uptime, spectrum adherence, and CERT-In critical infrastructure protections.",
        icon: PhoneCall,
        iconName: "PhoneCall",
        displayOrder: 3,
        regulations: ["TRAI Regulations", "DoT License Terms", "CERT-In Directives", "DPDP Act"],
        focusAreas: ["Licensing Compliance", "Tower EMF Safety", "Subscriber Privacy"],
        businessSegments: [
          {
            name: "Passive Infrastructure & Tower Operations",
            description: "Shared telecom towers, diesel generator backup, and site acquisition.",
            relevantIndustryRisks: ["EMF radiation limit non-compliance", "Right-of-Way (RoW) disputes"],
            applicableGrcConsiderations: ["DoT EMF radiation self-certification", "Municipal tower permissions"],
            relatedVerifiedOfferings: ["telecom-compliance", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "TRAI Quality of Service (QoS) reporting and consumer grievance registers",
          "Tower EMF emission self-certification and safety logs",
          "Mandatory subscriber data retention and privacy compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "telecom-compliance",
            serviceName: "Telecom Compliance Management",
            route: "/services/telecom-compliance",
            relevance: "TRAI filings, DoT licensing adherence, and QoS tracking."
          },
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity Services",
            route: "/services/cybersecurity-iso27001",
            relevance: "Critical infrastructure security and CERT-In compliance."
          }
        ],
        existingRoute: "/industries/technology-electronics#telecommunications",
        searchKeywords: ["telecom", "trai", "towers", "emf", "dot", "network infrastructure"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "electric-vehicles",
        title: "Electric Vehicles & Clean Mobility",
        slug: "electric-vehicles",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Battery Safety & AIS Regulations",
        overview: "EV OEMs, battery pack assemblers, and charging station network operators navigating rapid regulatory transitions, AIS battery safety standards, and battery waste recycling quotas.",
        icon: Zap,
        iconName: "Zap",
        displayOrder: 4,
        regulations: ["AIS-156", "AIS-038", "Battery Waste Management Rules 2022", "Motor Vehicles Act"],
        focusAreas: ["Battery Safety Standards", "Battery Waste EPR", "Plant Safety"],
        businessSegments: [
          {
            name: "Battery Pack Assembly & Thermal Testing",
            description: "Lithium-ion pack assembly, BMS calibration, and stress testing.",
            relevantIndustryRisks: ["Thermal runaway fire hazards", "Toxic electrolyte handling"],
            applicableGrcConsiderations: ["AIS-156 Amendment 3 compliance", "Factory fire safety clearance"],
            relatedVerifiedOfferings: ["environmental-compliance", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Automotive Industry Standards (AIS-156 / AIS-038) validation logs",
          "Battery Waste Management Rules EPR registration and recycling targets",
          "Lithium storage safety protocols and fire inspector approvals"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Battery waste recycling EPR quotas and hazardous waste logs."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "AIS compliance tracking and statutory automotive certifications."
          }
        ],
        existingRoute: "/industries/technology-electronics#electric-vehicles",
        searchKeywords: ["ev", "electric vehicles", "battery", "ais-156", "clean mobility", "epr"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 3. Infrastructure & Construction ──────────────────────────────────────
  {
    id: "infrastructure-construction",
    name: "Infrastructure & Construction",
    shortDescription: "Contractor safety (BOCW Act), real estate RERA compliance, environmental clearance monitoring, and supply chain material traceability.",
    icon: HardHat,
    iconName: "HardHat",
    displayOrder: 3,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed in services-data.ts (RERA compliance, Labour law BOCW, Environmental, Internal Audit) and industries-data.ts.",
    keyGrcTopics: [
      "Real Estate (Regulation and Development) Act (RERA) Compliance",
      "Building and Other Construction Workers (BOCW Act) Safety & Welfare",
      "Environmental Impact Assessment (EIA) & SPCB Consents",
      "Contractor Due Diligence & Labour Wage Reconciliation",
      "Escrow Account Management & Project Statutory Filings"
    ],
    documentedOfferings: [
      {
        serviceId: "rera-compliance",
        serviceName: "RERA Compliance Management",
        route: "/services/rera-compliance",
        relevance: "Quarterly progress reports, escrow balance audits, and buyer disclosures."
      },
      {
        serviceId: "labour-law-compliance",
        serviceName: "Labour & Employment Law Compliance",
        route: "/services/labour-law-compliance",
        relevance: "BOCW cess registers, site safety logs, and contractor audits."
      },
      {
        serviceId: "environmental-compliance",
        serviceName: "Environmental Compliance",
        route: "/services/environmental-compliance",
        relevance: "Dust mitigation logs, noise compliance, and construction waste disposal."
      },
      {
        serviceId: "internal-audit",
        serviceName: "Internal Audit Services",
        route: "/services/internal-audit",
        relevance: "Contractor billing validation and project procurement controls."
      }
    ],
    subIndustries: [
      {
        id: "real-estate",
        title: "Real Estate & Urban Development",
        slug: "real-estate",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "RERA Governance & Project Disclosures",
        overview: "Commercial and residential real estate developers managing multi-year construction cycles, buyer transparency, project escrow accounts, and state RERA authority filings.",
        icon: Building2,
        iconName: "Building2",
        displayOrder: 1,
        regulations: ["RERA Act 2016", "Building Bye-Laws", "BOCW Act", "Local Municipal Acts"],
        focusAreas: ["Escrow Management", "Quarterly RERA Filings", "Site Safety"],
        businessSegments: [
          {
            name: "Residential Townships & High-Rises",
            description: "Multi-phase residential projects requiring dedicated escrow accounts.",
            relevantIndustryRisks: ["Delay penalties under RERA Sec 18", "Plan modification disputes"],
            applicableGrcConsiderations: ["Quarterly RERA portal updates", "Title clearance verifications"],
            relatedVerifiedOfferings: ["rera-compliance"]
          }
        ],
        relevantGrcTopics: [
          "RERA quarterly compliance reporting and CA certificate filings",
          "70% escrow fund segregation and withdrawal verification",
          "Building approval sanction tracking and occupancy certificate audits"
        ],
        linkedOfferings: [
          {
            serviceId: "rera-compliance",
            serviceName: "RERA Compliance Management",
            route: "/services/rera-compliance",
            relevance: "Direct management of state RERA portal filings and escrow logs."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "BOCW worker registrations and safety compliance on construction sites."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#real-estate",
        searchKeywords: ["real estate", "rera", "construction", "bocw", "property", "escrow"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "roads-highways",
        title: "Highways & Transport Infrastructure",
        slug: "roads-highways",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "EPC Contract Governance & Environmental Approvals",
        overview: "Engineering, Procurement, and Construction (EPC) concessionaires executing highway corridors, bridges, and expressways under NHAI and state public works contracts.",
        icon: Milestone,
        iconName: "Milestone",
        displayOrder: 2,
        regulations: ["NHAI Concession Agreements", "BOCW Safety Rules", "Forest Clearance Act", "EPA 1986"],
        focusAreas: ["Contract Compliance", "Environmental Clearances", "Workforce Safety"],
        businessSegments: [
          {
            name: "Highway Concessionaires (HAM & BOT)",
            description: "Design-build-operate transport infrastructure.",
            relevantIndustryRisks: ["Right-of-Way delay claims", "Subcontractor safety fatalities"],
            applicableGrcConsiderations: ["Independent engineer milestone audits", "BOCW safety protocols"],
            relatedVerifiedOfferings: ["internal-audit", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "BOCW cess calculation, payment proof, and site clinic registers",
          "Environmental Impact Assessment (EIA) conditions monitoring",
          "Subcontractor payment reconciliation and wage protection"
        ],
        linkedOfferings: [
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "High-volume contractor labor tracking across distributed project camps."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Clearance renewals, borrow pit restoration, and tree transplantation logs."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#roads-highways",
        searchKeywords: ["highways", "roads", "epc", "nhai", "transport infrastructure", "bocw"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "cement",
        title: "Cement & Building Materials",
        slug: "cement",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "Emissions Monitoring & Quarry Licensing",
        overview: "Integrated cement plants, grinding units, and ready-mix concrete suppliers managing limestone mining concessions, kiln continuous emissions, and fly ash utilization guidelines.",
        icon: BrickWall,
        iconName: "BrickWall",
        displayOrder: 3,
        regulations: ["CPCB Emission Standards", "Mines Act 1952", "Fly Ash Notification", "Factories Act"],
        focusAreas: ["Continuous Emissions", "Mine Safety", "Waste Co-processing"],
        businessSegments: [
          {
            name: "Integrated Clinker & Cement Plants",
            description: "High-temperature rotary kilns and captive limestone quarries.",
            relevantIndustryRisks: ["Particulate matter emission spikes", "Mine bench safety hazards"],
            applicableGrcConsiderations: ["Continuous Emission Monitoring Systems (CEMS) calibration", "DGMS inspections"],
            relatedVerifiedOfferings: ["environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CEMS real-time data transmission to CPCB/SPCB servers",
          "Fly ash utilization registers under Ministry of Environment notifications",
          "Limestone quarry safety rules and DGMS statutory inspection prep"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Continuous emission system reporting and trade waste logs."
          },
          {
            serviceId: "esg-sustainability",
            serviceName: "ESG & Sustainability Reporting",
            route: "/services/esg-sustainability",
            relevance: "Carbon intensity metrics and alternate fuel co-processing logs."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#cement",
        searchKeywords: ["cement", "building materials", "cems", "quarry", "fly ash"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "steel",
        title: "Steel & Basic Metals",
        slug: "steel",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "Heavy Metallurgy Safety & Slag Management",
        overview: "Blast furnace and electric arc furnace steel producers managing heavy hot-metal operations, blast furnace slag recycling, continuous emissions, and large contract labor forces.",
        icon: Hammer,
        iconName: "Hammer",
        displayOrder: 4,
        regulations: ["Factories Act", "ISO 45001", "EPA Norms", "BIS Mandatory Certification"],
        focusAreas: ["Hot Metal Safety", "Slag Utilization", "Contract Labour"],
        businessSegments: [
          {
            name: "Primary Steel Plants & Rolling Mills",
            description: "Continuous casting, reheating furnaces, and bar/sheet rolling mills.",
            relevantIndustryRisks: ["Hot metal spill hazards", "SOx/NOx stack emissions"],
            applicableGrcConsiderations: ["ISO 45001 furnace zone safety SOPs", "SPCB air quality logs"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Hot-metal zone safety protocols and PPE compliance audits",
          "Slag disposal and industrial byproduct utilization registers",
          "BIS mandatory quality certification for structural steel grades"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Air and water pollution control registers for heavy metallurgical operations."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Workforce statutory registers under the Factories Act."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#steel",
        searchKeywords: ["steel", "metals", "blast furnace", "slag", "metallurgy", "rolling mills"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 4. Energy & Utilities ──────────────────────────────────────────────────
  {
    id: "energy-utilities",
    name: "Energy & Utilities",
    shortDescription: "Environmental compliance, continuous emission monitoring, renewable energy grid adherence, and industrial asset integrity management.",
    icon: Fuel,
    iconName: "Fuel",
    displayOrder: 4,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed in services-data.ts (ESG reporting, Environmental compliance, ERM) and industries-data.ts.",
    keyGrcTopics: [
      "Continuous Emission Monitoring Systems (CEMS) & Effluent Adherence",
      "Central Electricity Authority (CEA) Technical & Safety Standards",
      "Renewable Energy Purchase Obligations (RPO) & REC Tracking",
      "Petroleum and Explosives Safety Organisation (PESO) Licences",
      "Mine Safety (DGMS Guidelines) & Environmental Clearance Conditions"
    ],
    documentedOfferings: [
      {
        serviceId: "environmental-compliance",
        serviceName: "Environmental Compliance",
        route: "/services/environmental-compliance",
        relevance: "CPCB/SPCB stack emission registers, zero liquid discharge, and water audits."
      },
      {
        serviceId: "esg-sustainability",
        serviceName: "ESG & Sustainability Reporting",
        route: "/services/esg-sustainability",
        relevance: "BRSR disclosures, Scope 1/2 carbon accounting, and GRI framework logs."
      },
      {
        serviceId: "enterprise-risk-management",
        serviceName: "Enterprise Risk Management (ERM)",
        route: "/services/enterprise-risk-management",
        relevance: "Asset integrity thresholds, catastrophic hazard RCSA, and contingency mapping."
      }
    ],
    subIndustries: [
      {
        id: "renewable-energy",
        title: "Renewable Energy (Solar & Wind)",
        slug: "renewable-energy",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "Grid Compliance & Land Due Diligence",
        overview: "Utility-scale solar developers, wind farm operators, and hybrid energy parks managing grid connectivity, power purchase agreement (PPA) covenants, and land acquisition compliance.",
        icon: Sun,
        iconName: "Sun",
        displayOrder: 1,
        regulations: ["CEA Grid Standards", "State Electricity Regulatory Commission Rules", "Land Acquisition Acts"],
        focusAreas: ["Grid Connectivity", "PPA Compliance", "Land Title Verification"],
        businessSegments: [
          {
            name: "Utility-Scale Solar Parks",
            description: "Multi-megawatt solar photovoltaic plants feeding the transmission grid.",
            relevantIndustryRisks: ["Curtailment losses", "Right-of-way transmission disputes"],
            applicableGrcConsiderations: ["Grid code harmonic limits", "State SERC forecasting rules"],
            relatedVerifiedOfferings: ["regulatory-compliance", "esg-sustainability"]
          }
        ],
        relevantGrcTopics: [
          "State Electricity Regulatory Commission (SERC) tariff and grid code adherence",
          "Forecasting and scheduling deviation settlement registers",
          "Carbon offset documentation and Renewable Energy Certificate (REC) filings"
        ],
        linkedOfferings: [
          {
            serviceId: "esg-sustainability",
            serviceName: "ESG & Sustainability Reporting",
            route: "/services/esg-sustainability",
            relevance: "Clean energy generation registers and carbon credit verification."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Grid connectivity codes and statutory power authority filings."
          }
        ],
        existingRoute: "/industries/energy-utilities#renewable-energy",
        searchKeywords: ["solar", "wind", "renewable energy", "ppa", "grid compliance", "clean energy"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "oil-gas",
        title: "Oil, Gas & Refining",
        slug: "oil-gas",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "PESO Licensing & Pipeline Safety",
        overview: "Refineries, LPG bottling plants, fuel distribution networks, and city gas operators subject to stringent Petroleum and Explosives Safety Organisation (PESO) regulations and PNGRB codes.",
        icon: Fuel,
        iconName: "Fuel",
        displayOrder: 2,
        regulations: ["Petroleum Act 1934", "PESO Guidelines", "PNGRB Technical Standards", "OISD Norms"],
        focusAreas: ["PESO Renewals", "Process Safety", "Pipeline Right-of-Way"],
        businessSegments: [
          {
            name: "LPG Bottling & Storage Terminals",
            description: "High-pressure hydrocarbon storage spheres and cylinder filling lines.",
            relevantIndustryRisks: ["Vapor cloud explosion hazards", "Static discharge events"],
            applicableGrcConsiderations: ["OISD-144 safety audits", "PESO license validity tracking"],
            relatedVerifiedOfferings: ["regulatory-compliance", "enterprise-risk-management"]
          }
        ],
        relevantGrcTopics: [
          "PESO storage licenses, calibration certificates, and pressure vessel tests",
          "Oil Industry Safety Directorate (OISD) safety audit action tracking",
          "Pipeline integrity management systems under PNGRB technical codes"
        ],
        linkedOfferings: [
          {
            serviceId: "enterprise-risk-management",
            serviceName: "Enterprise Risk Management",
            route: "/services/enterprise-risk-management",
            relevance: "Major hazard facility risk control assessments and contingency playbooks."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Flaring logs, VOC monitoring, and oil-water separator effluent registers."
          }
        ],
        existingRoute: "/industries/energy-utilities#oil-gas",
        searchKeywords: ["oil", "gas", "petroleum", "peso", "refinery", "pipeline", "oisd"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "power-grid",
        title: "Power Transmission & Distribution",
        slug: "power-grid",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "Grid Reliability & Substation EHS",
        overview: "Transmission utilities, power distribution companies (DISCOMs), and high-voltage substation operators managing electrical safety regulations, consumer service standards, and substation work permits.",
        icon: Zap,
        iconName: "Zap",
        displayOrder: 3,
        regulations: ["Electricity Act 2003", "CEA Safety Regulations 2010", "SERC Supply Codes"],
        focusAreas: ["Electrical Safety Audits", "Work Permit Systems", "Transformer Maintenance"],
        businessSegments: [
          {
            name: "Extra High Voltage (EHV) Substations",
            description: "400kV/220kV transmission substations and switchyards.",
            relevantIndustryRisks: ["Arc flash hazards", "Transformer oil PCB contamination"],
            applicableGrcConsiderations: ["Lockout-Tagout (LOTO) protocols", "Electrical inspectorate approvals"],
            relatedVerifiedOfferings: ["labour-law-compliance", "environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CEA Electrical Safety inspection certifications and earth resistance logs",
          "Electrical Inspector to Government (EIG) statutory approvals",
          "Substation oil soak pit and PCB chemical testing documentation"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "CEA safety code compliance and statutory electrical licenses."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Transformer oil containment and hazardous waste disposal compliance."
          }
        ],
        existingRoute: "/industries/energy-utilities#power-grid",
        searchKeywords: ["power grid", "transmission", "substation", "cea", "electrical safety"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "mining",
        title: "Mining & Mineral Operations",
        slug: "mining",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "DGMS Guidelines & Environmental Restoration",
        overview: "Open-cast and underground extraction of iron ore, coal, bauxite, and industrial minerals adhering to Directorate General of Mines Safety (DGMS) codes, forest clearance terms, and overburden management.",
        icon: Settings,
        iconName: "Settings",
        displayOrder: 4,
        regulations: ["Mines Act 1952", "DGMS Guidelines", "MMDR Act", "Forest Conservation Act"],
        focusAreas: ["Mine Safety Codes", "Forest Compensatory Afforestation", "Overburden Slope Stability"],
        businessSegments: [
          {
            name: "Opencast Extraction & Crushing",
            description: "Heavy earthmoving machinery, blasting, and primary crushing operations.",
            relevantIndustryRisks: ["Slope collapse hazards", "Silica dust inhalation"],
            applicableGrcConsiderations: ["DGMS Safety Management Plans (SMP)", "Air quality water sprinkling registers"],
            relatedVerifiedOfferings: ["environmental-compliance", "enterprise-risk-management"]
          }
        ],
        relevantGrcTopics: [
          "DGMS Safety Management Plan (SMP) codification and statutory drills",
          "Mine progressive closure plan documentation and bank guarantees",
          "Contractor worker occupational health surveillance registers"
        ],
        linkedOfferings: [
          {
            serviceId: "enterprise-risk-management",
            serviceName: "Enterprise Risk Management",
            route: "/services/enterprise-risk-management",
            relevance: "DGMS-compliant Risk Assessment and Hazard Identification (HAZOP)."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Mine drainage treatment, air dust mitigation, and reclamation registers."
          }
        ],
        existingRoute: "/industries/energy-utilities#mining",
        searchKeywords: ["mining", "dgms", "minerals", "mines act", "quarry", "extraction"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 5. Financial Services ──────────────────────────────────────────────────
  {
    id: "financial-services",
    name: "Financial Services",
    shortDescription: "Regulatory compliance, internal controls, third-party vendor risk, and DPDP data protection for banks, NBFCs, fintechs, and capital market entities.",
    icon: Landmark,
    iconName: "Landmark",
    displayOrder: 5,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed across services-data.ts (regulatory compliance RBI/SEBI, internal audit, DPDP, vendor risk) and industries-data.ts.",
    keyGrcTopics: [
      "RBI Master Directions on IT Governance & Outsourcing of Financial Services",
      "SEBI LODR (Listing Obligations and Disclosure Requirements)",
      "PMLA (Prevention of Money Laundering) & KYC Policy Frameworks",
      "Digital Personal Data Protection (DPDP Act 2023) Financial Data Consent",
      "Internal Controls Over Financial Reporting (ICFR) & Internal Audit"
    ],
    documentedOfferings: [
      {
        serviceId: "regulatory-compliance",
        serviceName: "Regulatory Compliance Management",
        route: "/services/regulatory-compliance",
        relevance: "RBI Master Directions, SEBI LODR corporate disclosures, and statutory registers."
      },
      {
        serviceId: "internal-audit",
        serviceName: "Internal Audit Services",
        route: "/services/internal-audit",
        relevance: "COSO internal controls validation, loan file auditing, and physical/logical checkmarks."
      },
      {
        serviceId: "vendor-risk-management",
        serviceName: "Vendor & Third-Party Risk Management",
        route: "/services/vendor-risk-management",
        relevance: "RBI-mandated third-party IT outsourcing risk audits and SLA checks."
      },
      {
        serviceId: "data-privacy-dpdp",
        serviceName: "Data Privacy & DPDP Compliance",
        route: "/services/data-privacy-dpdp",
        relevance: "Financial customer consent mechanisms and audit-ready data registers."
      }
    ],
    subIndustries: [
      {
        id: "banking",
        title: "Commercial & Cooperative Banking",
        slug: "banking",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "Banking Compliance & RBI Risk Governance",
        overview: "Scheduled commercial banks and cooperative credit institutions subject to strict Reserve Bank of India inspection frameworks, capital adequacy rules, and statutory registers.",
        icon: Landmark,
        iconName: "Landmark",
        displayOrder: 1,
        regulations: ["RBI Master Directions", "Banking Regulation Act 1949", "PMLA 2002", "DPDP Act"],
        focusAreas: ["AML & KYC Governance", "RBI IT Outsourcing Norms", "Internal Controls"],
        businessSegments: [
          {
            name: "Retail & Corporate Lending Operations",
            description: "Branch banking, loan origination, and credit underwriting.",
            relevantIndustryRisks: ["Credit documentation non-conformity", "KYC compliance gaps"],
            applicableGrcConsiderations: ["Periodic KYC updation registers", "Loan sanction authorization limits"],
            relatedVerifiedOfferings: ["regulatory-compliance", "internal-audit"]
          }
        ],
        relevantGrcTopics: [
          "RBI Master Directions on IT Governance, Risk, Controls and Assurance",
          "PMLA customer due diligence and suspicious transaction register audits",
          "Third-party technology vendor security and audit compliance (RBI Outsourcing Guidelines)"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "RBI circular tracking, statutory reporting calendars, and notice resolution."
          },
          {
            serviceId: "vendor-risk-management",
            serviceName: "Vendor Risk Management",
            route: "/services/vendor-risk-management",
            relevance: "Continuous third-party security audits under RBI IT Outsourcing directives."
          }
        ],
        existingRoute: "/industries/financial-services#banking",
        searchKeywords: ["banking", "rbi", "nbfc", "pmla", "kyc", "internal audit", "financial services"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "financial-services",
        title: "Capital Markets & NBFCs",
        slug: "financial-services",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "Corporate Finance & SEBI Disclosure Risk",
        overview: "Non-banking financial companies (NBFCs), asset management firms, brokerage houses, and listed entities managing complex corporate reporting, board governance, and SEBI compliance.",
        icon: Coins,
        iconName: "Coins",
        displayOrder: 2,
        regulations: ["SEBI LODR 2015", "Companies Act 2013", "RBI Scale-Based Regulations", "PMLA"],
        focusAreas: ["SEBI Disclosures", "Scale-Based Regulation", "Corporate Governance"],
        businessSegments: [
          {
            name: "NBFC-Middle/Upper Layer Lending",
            description: "Specialized retail, auto, or gold loan non-banking lenders.",
            relevantIndustryRisks: ["Scale-based regulatory divergence", "Asset classification mismatches"],
            applicableGrcConsiderations: ["Board risk committee charters", "Quarterly NPA classification reviews"],
            relatedVerifiedOfferings: ["governance-framework", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "SEBI LODR continuous disclosures, related-party transactions, and insider trading codes",
          "RBI Scale-Based Regulation (SBR) governance charters and committee minutes",
          "Internal controls over financial reporting (ICFR) testing and documentation"
        ],
        linkedOfferings: [
          {
            serviceId: "governance-framework",
            serviceName: "Governance Framework Design",
            route: "/services/governance-framework",
            relevance: "Board committee charters, delegation of authority (DoA), and policy orchestration."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit Services",
            route: "/services/internal-audit",
            relevance: "ICFR controls validation and operational risk gap analysis."
          }
        ],
        existingRoute: "/industries/financial-services#financial-services",
        searchKeywords: ["capital markets", "nbfc", "sebi", "lodr", "asset management", "governance"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "insurance",
        title: "Insurance Companies & Intermediaries",
        slug: "insurance",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "IRDAI Audits & Claim Settlement Governance",
        overview: "Life and general insurance providers, web aggregators, and corporate brokers managing IRDAI statutory reporting, policyholder grievance resolution, and medical record confidentiality.",
        icon: HeartHandshake,
        iconName: "HeartHandshake",
        displayOrder: 3,
        regulations: ["IRDAI Regulations", "Insurance Act 1938", "DPDP Act 2023", "PMLA"],
        focusAreas: ["Claim Audits", "IRDAI Reporting", "Policyholder Data Privacy"],
        businessSegments: [
          {
            name: "Life & Health Underwriting",
            description: "Retail and group insurance underwriting handling medical dossiers.",
            relevantIndustryRisks: ["Sensitive health data leakage", "Claim repudiation disputes"],
            applicableGrcConsiderations: ["DPDP health data consent", "IRDAI turn-around-time compliance"],
            relatedVerifiedOfferings: ["data-privacy-dpdp", "internal-audit"]
          }
        ],
        relevantGrcTopics: [
          "IRDAI regulatory filing calendars and solvency ratio reporting logs",
          "Claim settlement turnaround time (TAT) and consumer grievance registers",
          "Policyholder medical and banking record protection under DPDP rules"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Protecting sensitive medical and health data records of policyholders."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "IRDAI statutory registers, circular tracking, and corporate filings."
          }
        ],
        existingRoute: "/industries/financial-services#insurance",
        searchKeywords: ["insurance", "irdai", "claims", "policyholders", "actuarial", "underwriting"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 6. Healthcare & Life Sciences ──────────────────────────────────────────
  {
    id: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    shortDescription: "Hospital quality governance (NABH), biomedical waste compliance, CDSCO clinical trial ethics, pharmaceutical data integrity (ALCOA+), and patient health data privacy.",
    icon: Activity,
    iconName: "Activity",
    displayOrder: 6,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed across services-data.ts (accreditation services NABH, clinical governance CDSCO, DPDP HIPAA rules, environmental) and industries-data.ts.",
    keyGrcTopics: [
      "National Accreditation Board for Hospitals & Healthcare Providers (NABH) Standards",
      "Bio-Medical Waste Management Rules 2016 & SPCB Clearances",
      "Clinical Trials Governance (CDSCO & ICH-GCP Ethics Standards)",
      "Digital Personal Data Protection (DPDP Act) for Electronic Health Records (EHR)",
      "Schedule M GMP & WHO Data Integrity (ALCOA+) Protocols"
    ],
    documentedOfferings: [
      {
        serviceId: "accreditation-services",
        serviceName: "Accreditation & Certification Services",
        route: "/services/accreditation-services",
        relevance: "NABH, NABL ISO 15189, and institutional healthcare compliance readiness."
      },
      {
        serviceId: "clinical-governance",
        serviceName: "Clinical Governance & Trial Ethics",
        route: "/services/clinical-governance",
        relevance: "ICH-GCP ethics committees, adverse event logging, and CDSCO audit prep."
      },
      {
        serviceId: "data-privacy-dpdp",
        serviceName: "Data Privacy & Health Records Compliance",
        route: "/services/data-privacy-dpdp",
        relevance: "EHR consent workflows and HIPAA/DPDP patient record confidentiality."
      },
      {
        serviceId: "environmental-compliance",
        serviceName: "Environmental Compliance",
        route: "/services/environmental-compliance",
        relevance: "Biomedical waste barcoding logs, effluent treatment plants, and SPCB consents."
      }
    ],
    subIndustries: [
      {
        id: "healthcare",
        title: "Hospitals & Healthcare Networks",
        slug: "healthcare",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "NABH Accreditation & Clinical Quality",
        overview: "Multi-specialty hospitals, clinical diagnostic networks, and day-care surgical centres maintaining clinical quality standards, statutory medical licences, and biomedical waste clearances.",
        icon: Activity,
        iconName: "Activity",
        displayOrder: 1,
        regulations: ["NABH 5th Edition", "Clinical Establishments Act", "Biomedical Waste Rules", "DPDP Act"],
        focusAreas: ["NABH Quality", "Patient Privacy", "Biomedical Waste"],
        businessSegments: [
          {
            name: "Tertiary & Quaternary Care Hospitals",
            description: "High-acuity medical facilities with intensive care, operation theatres, and diagnostics.",
            relevantIndustryRisks: ["Hospital-acquired infection spikes", "Biomedical waste mixing"],
            applicableGrcConsiderations: ["Infection control committee audits", "Barcoded waste manifest tracking"],
            relatedVerifiedOfferings: ["accreditation-services", "environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "NABH accreditation gap assessment, policy checklist codification, and mock drills",
          "Biomedical waste segregation, barcoding manifests, and SPCB annual returns",
          "Patient health record confidentiality and consent systems under DPDP 2023"
        ],
        linkedOfferings: [
          {
            serviceId: "accreditation-services",
            serviceName: "Accreditation Services",
            route: "/services/accreditation-services",
            relevance: "NABH hospital accreditation preparation and quality indicator audits."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Biomedical waste handling logs and state pollution board consent renewals."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#healthcare",
        searchKeywords: ["hospital", "healthcare", "nabh", "biomedical waste", "clinical establishment", "ehr"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "pharmaceuticals",
        title: "Pharmaceuticals & Formulations",
        slug: "pharmaceuticals",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "GMP Data Integrity & CDSCO Audits",
        overview: "Active pharmaceutical ingredient (API) manufacturers and formulation plants operating under revised Schedule M, WHO-GMP guidelines, and strict laboratory data integrity (ALCOA+) norms.",
        icon: Pill,
        iconName: "Pill",
        displayOrder: 2,
        regulations: ["Drugs & Cosmetics Act", "Revised Schedule M", "CDSCO Guidelines", "WHO-GMP"],
        focusAreas: ["GMP Compliance", "Batch Data Integrity", "Effluent Treatment"],
        businessSegments: [
          {
            name: "Oral Solid Dosage & Injectable Formulations",
            description: "Sterile and non-sterile pharmaceutical formulation plants.",
            relevantIndustryRisks: ["Batch contamination", "Audit trail discrepancies in HPLC/GC instruments"],
            applicableGrcConsiderations: ["21 CFR Part 11 electronic records", "Cleanroom differential pressure logs"],
            relatedVerifiedOfferings: ["regulatory-compliance", "environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Revised Schedule M compliance gap analyses and corrective action plans",
          "Laboratory instrument data integrity, audit trail review, and user access matrices",
          "Zero liquid discharge (ZLD) effluent treatment registers for chemical API synthesis"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "CDSCO licensing, drug master file tracking, and Schedule M adherence."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "SPCB trade effluent consents and solvent recovery unit registers."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#pharmaceuticals",
        searchKeywords: ["pharma", "pharmaceuticals", "gmp", "schedule m", "cdsco", "alcoa", "api"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "medical-devices",
        title: "Medical Devices & Diagnostics",
        slug: "medical-devices",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "Device Quality Systems & CDSCO MDR Compliance",
        overview: "Manufacturers and importers of Class A, B, C, and D medical equipment, diagnostic reagents, and surgical implants complying with Medical Device Rules 2017 and ISO 13485 QMS standards.",
        icon: Stethoscope,
        iconName: "Stethoscope",
        displayOrder: 3,
        regulations: ["Medical Device Rules 2017", "CDSCO Guidelines", "ISO 13485", "ISO 14971"],
        focusAreas: ["Device Risk Management", "Cleanroom Assembly", "Clinical Performance"],
        businessSegments: [
          {
            name: "Diagnostic Reagents & Point-of-Care Kits",
            description: "In-vitro diagnostic kits and rapid testing cartridges.",
            relevantIndustryRisks: ["Shelf-life stability failures", "Batch-to-batch sensitivity variation"],
            applicableGrcConsiderations: ["CDSCO manufacturing license (MD-5/MD-9)", "Cold-chain validation logs"],
            relatedVerifiedOfferings: ["regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Medical Device Rules 2017 manufacturing and import license dossiers (Form MD-3 to MD-15)",
          "ISO 13485 Quality Management Systems and ISO 14971 Risk Management files",
          "Post-market surveillance, vigilance reporting, and device recall SOPs"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "CDSCO MDR device classification and statutory manufacturing license registers."
          },
          {
            serviceId: "accreditation-services",
            serviceName: "Accreditation Services",
            route: "/services/accreditation-services",
            relevance: "ISO 13485 quality management system audit preparation."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#medical-devices",
        searchKeywords: ["medical devices", "iso 13485", "cdsco", "mdr 2017", "diagnostics", "implants"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "biotechnology",
        title: "Biotechnology & Clinical Research",
        slug: "biotechnology",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "Bio-Safety SOPs & Clinical Trial Ethics",
        overview: "Biopharmaceutical developers, contract research organizations (CROs), and genomics laboratories managing recombinant DNA approvals, ethics committee oversight, and biosafety protocols.",
        icon: Dna,
        iconName: "Dna",
        displayOrder: 4,
        regulations: ["RCGM Guidelines", "CDSCO New Drugs & Clinical Trials Rules 2019", "EPA 1986", "ICMR Guidelines"],
        focusAreas: ["Biosafety Clearances", "Ethics Committee Registration", "Adverse Event Reporting"],
        businessSegments: [
          {
            name: "Clinical Trial Operations (CRO)",
            description: "Phase II-IV clinical drug trials across investigational hospital sites.",
            relevantIndustryRisks: ["Serious Adverse Event (SAE) reporting delay", "Informed consent documentation flaws"],
            applicableGrcConsiderations: ["CDSCO 14-day SAE reporting window", "Institutional Ethics Committee approvals"],
            relatedVerifiedOfferings: ["clinical-governance"]
          }
        ],
        relevantGrcTopics: [
          "Review Committee on Genetic Manipulation (RCGM) biosafety clearance documentation",
          "Clinical trial site audit preparation under New Drugs and Clinical Trials Rules 2019",
          "Ethics committee charter codification, quorum registers, and review logs"
        ],
        linkedOfferings: [
          {
            serviceId: "clinical-governance",
            serviceName: "Clinical Governance & Ethics",
            route: "/services/clinical-governance",
            relevance: "Clinical trial workflow standardization and adverse event compliance playbooks."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & Research Consent",
            route: "/services/data-privacy-dpdp",
            relevance: "Trial subject pseudonymization and genomic data privacy compliance."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#biotechnology",
        searchKeywords: ["biotech", "clinical trials", "cro", "rcgm", "ethics committee", "genomics"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 7. Food Processing, Pharma & Healthcare ────────────────────────────────
  {
    id: "food-processing-pharma-healthcare",
    name: "Food Processing, Pharma & Healthcare",
    shortDescription: "Combined sector directory highlighting specialized manufacturing, hygiene controls, cold-chain compliance, and consumer health safety across consumables and pharmaceuticals.",
    icon: Package,
    iconName: "Package",
    displayOrder: 7,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Preserved existing navigation cluster combining verified food processing, pharmaceutical manufacturing, and healthcare services.",
    keyGrcTopics: [
      "FSSAI Food Safety Management Systems & Hygiene Rating Audits",
      "HACCP (Hazard Analysis Critical Control Point) Food Safety Registers",
      "Schedule M & WHO-GMP Pharmaceutical Quality Adherence",
      "Cold-Chain Temperature Telemetry & Perishable Goods Compliance",
      "Legal Metrology & Mandatory Packaging Declarations"
    ],
    documentedOfferings: [
      {
        serviceId: "regulatory-compliance",
        serviceName: "Regulatory Compliance Management",
        route: "/services/regulatory-compliance",
        relevance: "FSSAI central/state licenses, CDSCO drug manufacturing licenses, and packaging norms."
      },
      {
        serviceId: "supply-chain-compliance",
        serviceName: "Supply Chain Compliance",
        route: "/services/supply-chain-compliance",
        relevance: "Farm-to-fork batch traceability audits and cold-chain temperature verification."
      },
      {
        serviceId: "environmental-compliance",
        serviceName: "Environmental Compliance",
        route: "/services/environmental-compliance",
        relevance: "Food processing effluent treatment (BOD/COD limits) and organic waste registers."
      }
    ],
    subIndustries: [
      {
        id: "food-processing",
        title: "Food Processing & Packaged Goods",
        slug: "food-processing",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "HACCP Safety & Traceability Logs",
        overview: "Packaged food producers, dairy processors, and beverage bottlers complying with Food Safety and Standards Authority of India (FSSAI) norms, cleanroom air filtration, and batch recall protocols.",
        icon: Utensils,
        iconName: "Utensils",
        displayOrder: 1,
        regulations: ["FSSAI Regulations 2011", "ISO 22000 / FSSC 22000", "Legal Metrology Act", "Factories Act"],
        focusAreas: ["Food Safety SOPs", "Batch Traceability", "HACCP Audit"],
        businessSegments: [
          {
            name: "Packaged Foods & Confectionery",
            description: "High-volume consumer snacks, baked goods, and ready-to-eat meal packaging.",
            relevantIndustryRisks: ["Physical or biological contaminant breach", "Incorrect nutritional labeling"],
            applicableGrcConsiderations: ["Critical Control Point (CCP) hourly records", "Legal metrology net quantity checks"],
            relatedVerifiedOfferings: ["regulatory-compliance", "supply-chain-compliance"]
          }
        ],
        relevantGrcTopics: [
          "FSSAI central licensing renewals, annual returns, and food recall playbooks",
          "HACCP hazard analysis registers and temperature control logging",
          "Legal Metrology packaging declarations and font-size statutory compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "FSSAI statutory filings, inspection readiness, and product labeling reviews."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Effluent treatment plant (ETP) biological oxygen demand monitoring."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#food-processing",
        searchKeywords: ["food processing", "fssai", "haccp", "dairy", "beverage", "packaged food"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "pharmaceuticals-fp",
        title: "Pharmaceutical Manufacturing",
        slug: "pharmaceuticals",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "GMP Data Integrity & CDSCO Audits",
        overview: "Formulations and drug manufacturing facilities ensuring patient safety through strict validation of raw ingredients, batch records, cleanroom parameters, and CDSCO licenses.",
        icon: Pill,
        iconName: "Pill",
        displayOrder: 2,
        regulations: ["Drugs & Cosmetics Act", "Revised Schedule M", "CDSCO Guidelines"],
        focusAreas: ["Batch Records", "Cleanroom Parameters", "Statutory Licensing"],
        businessSegments: [
          {
            name: "Formulation Manufacturing",
            description: "Tablet pressing, liquid bottling, and blister packaging lines.",
            relevantIndustryRisks: ["Cross-contamination", "Batch reconciliation mismatches"],
            applicableGrcConsiderations: ["Line clearance verification logs", "Form 25/28 licensing"],
            relatedVerifiedOfferings: ["regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CDSCO manufacturing licence inspections and Form 25/28 maintenance",
          "Batch manufacturing record (BMR) review and deviation handling",
          "Cleanroom HVAC air exchange validation and HEPA filter certifications"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Drug authority filings and statutory manufacturing registers."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#pharmaceuticals",
        searchKeywords: ["pharma", "pharmaceutical manufacturing", "drugs", "cleanroom", "cdsco"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "healthcare-fp",
        title: "Healthcare Delivery Systems",
        slug: "healthcare",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "Hospital Quality & Patient Safety Governance",
        overview: "Clinical facilities, diagnostic centers, and hospital operations adhering to healthcare service delivery standards, statutory hospital licensing, and patient privacy requirements.",
        icon: Activity,
        iconName: "Activity",
        displayOrder: 3,
        regulations: ["Clinical Establishments Act", "NABH Guidelines", "DPDP Act 2023"],
        focusAreas: ["Clinical Quality", "Statutory Licenses", "Patient Rights"],
        businessSegments: [
          {
            name: "Hospital Infrastructure Operations",
            description: "Inpatient facilities, diagnostic laboratories, and ambulatory clinics.",
            relevantIndustryRisks: ["Clinical statutory license lapse", "Patient data exposure"],
            applicableGrcConsiderations: ["Clinical Establishments registration", "Consent record archives"],
            relatedVerifiedOfferings: ["accreditation-services", "data-privacy-dpdp"]
          }
        ],
        relevantGrcTopics: [
          "Clinical Establishment license renewals and municipal fire clearances",
          "Patient health data privacy and DPDP 2023 consent mapping",
          "Hospital infection control committee registers and medical audit trails"
        ],
        linkedOfferings: [
          {
            serviceId: "accreditation-services",
            serviceName: "Accreditation Services",
            route: "/services/accreditation-services",
            relevance: "NABH quality standards and healthcare accreditation prep."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Health record privacy and consent management."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#healthcare",
        searchKeywords: ["healthcare", "hospitals", "clinics", "clinical quality", "patient safety"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 8. Consumer & Retail ───────────────────────────────────────────────────
  {
    id: "consumer-retail",
    name: "Consumer & Retail",
    shortDescription: "Store workforce compliance (Shops Act), supply chain social audits, consumer dispute resolution, and e-commerce marketplace regulations.",
    icon: ShoppingBag,
    iconName: "ShoppingBag",
    displayOrder: 8,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed in services-data.ts (supply chain BSCI, labour law, taxation GST, DPDP) and industries-data.ts.",
    keyGrcTopics: [
      "Shops & Commercial Establishments Act Licensing across Indian States",
      "Supply Chain Social Audits (BSCI, Sedex, Ethical Trading)",
      "Consumer Protection (E-Commerce) Rules & Grievance Officer Protocols",
      "Legal Metrology & Packaging Compliance",
      "Extended Producer Responsibility (EPR) for Plastic & E-Waste"
    ],
    documentedOfferings: [
      {
        serviceId: "supply-chain-compliance",
        serviceName: "Supply Chain Compliance",
        route: "/services/supply-chain-compliance",
        relevance: "Subcontractor ethical audits, BSCI compliance, and supplier due diligence."
      },
      {
        serviceId: "labour-law-compliance",
        serviceName: "Labour Law Compliance",
        route: "/services/labour-law-compliance",
        relevance: "Multi-state Shop & Establishment licenses and retail shift registers."
      },
      {
        serviceId: "taxation-trade-compliance",
        serviceName: "Taxation & Trade Compliance",
        route: "/services/taxation-trade-compliance",
        relevance: "E-invoicing pipelines and multi-state GST input tax credit reconciliations."
      }
    ],
    subIndustries: [
      {
        id: "retail",
        title: "Retail Stores & Supermarkets",
        slug: "retail",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Shop Safety & Workforce Compliance",
        overview: "Large-format retail chains, departmental stores, and supermarket networks operating across multiple municipal jurisdictions with distributed staff rosters.",
        icon: Store,
        iconName: "Store",
        displayOrder: 1,
        regulations: ["Shops & Establishments Acts", "Consumer Protection Act", "CLRA", "Legal Metrology"],
        focusAreas: ["Shop Act Licenses", "Labour Compliance", "Consumer Disputes"],
        businessSegments: [
          {
            name: "Multi-Brand Retail Outlets",
            description: "Nationwide chain stores in commercial shopping centres and high streets.",
            relevantIndustryRisks: ["Store license expirations", "Overtime hour violations"],
            applicableGrcConsiderations: ["State-specific Shop Act renewal calendars", "Staff wage slip reconciliation"],
            relatedVerifiedOfferings: ["labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Multi-state Shop & Establishment registration and periodic renewals",
          "Retail store employee shift scheduling and statutory overtime registers",
          "Weights and measures stamping and retail price declaration audits"
        ],
        linkedOfferings: [
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Managing multi-state Shop & Establishment licenses and contractor rosters."
          }
        ],
        existingRoute: "/industries/consumer-retail#retail",
        searchKeywords: ["retail", "shops act", "supermarket", "store compliance", "consumer"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "textiles",
        title: "Textiles, Garments & Apparel",
        slug: "textiles",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Social Compliance & Zero Liquid Discharge",
        overview: "Garment export houses, spinning mills, and textile wet-processing units adhering to global brand social codes (BSCI, Sedex) and strict environmental effluent standards.",
        icon: Scissors,
        iconName: "Scissors",
        displayOrder: 2,
        regulations: ["BSCI Audit Codes", "Factories Act", "CLRA Act", "SPCB ZLD Norms"],
        focusAreas: ["Social Audits", "ZLD Effluent Treatment", "Contractor Wages"],
        businessSegments: [
          {
            name: "Apparel Export Houses",
            description: "Cutting, stitching, and finishing units manufacturing for international retail brands.",
            relevantIndustryRisks: ["Social audit blacklisting", "Contractor child labor allegations"],
            applicableGrcConsiderations: ["BSCI/Sedex social compliance pre-audits", "Worker grievance committee logs"],
            relatedVerifiedOfferings: ["supply-chain-compliance", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Buyer social compliance code audit prep (BSCI, Sedex SMETA, WRAP)",
          "Dyeing and wet processing Zero Liquid Discharge (ZLD) continuous logs",
          "Contract labor PF/ESIC contribution verification and minimum wage slips"
        ],
        linkedOfferings: [
          {
            serviceId: "supply-chain-compliance",
            serviceName: "Supply Chain Compliance",
            route: "/services/supply-chain-compliance",
            relevance: "BSCI and buyer social audit inspection readiness."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Effluent treatment plant consents and water discharge registers."
          }
        ],
        existingRoute: "/industries/consumer-retail#textiles",
        searchKeywords: ["textiles", "apparel", "garments", "bsci", "zld", "dyeing", "social audits"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "ecommerce",
        title: "E-Commerce & Digital Marketplaces",
        slug: "ecommerce",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Marketplace Integrity & User Trust",
        overview: "Online retail platforms, third-party seller marketplaces, and direct-to-consumer (D2C) brands managing consumer privacy, FDI marketplace norms, and payment data regulations.",
        icon: ShoppingCart,
        iconName: "ShoppingCart",
        displayOrder: 3,
        regulations: ["Consumer Protection (E-Commerce) Rules", "DPDP Act 2023", "FDI Guidelines", "GST Rules"],
        focusAreas: ["Data Privacy", "GST E-Commerce Reconciliations", "Grievance Redressal"],
        businessSegments: [
          {
            name: "Marketplace Platforms & D2C Brands",
            description: "Online catalog and fulfillment services for consumers.",
            relevantIndustryRisks: ["Consumer forum complaints", "Seller counterfeit liability"],
            applicableGrcConsiderations: ["Grievance officer notification portal", "DPDP cookie and consent banner"],
            relatedVerifiedOfferings: ["data-privacy-dpdp", "taxation-trade-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Consumer Protection (E-Commerce) Rules 2020 mandatory website disclosures",
          "DPDP 2023 consumer shopping profile and payment consent management",
          "E-commerce operator TCS (Tax Collected at Source) reconciliation under GST"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "User shopping consent architecture and RoPA registers."
          },
          {
            serviceId: "taxation-trade-compliance",
            serviceName: "Taxation & Trade Compliance",
            route: "/services/taxation-trade-compliance",
            relevance: "Automated GST reconciliations and marketplace seller tax tracking."
          }
        ],
        existingRoute: "/industries/consumer-retail#ecommerce",
        searchKeywords: ["ecommerce", "d2c", "marketplace", "consumer protection", "online retail"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  },

  // ── 9. Media & Services ────────────────────────────────────────────────────
  {
    id: "media-services",
    name: "Media & Services",
    shortDescription: "Content copyright protection, hospitality guest data privacy, institutional education accreditations, and aviation ground operations EHS.",
    icon: Radio,
    iconName: "Radio",
    displayOrder: 9,
    verificationStatus: "confirmed",
    publicationStatus: "published",
    evidenceNote: "Confirmed across services-data.ts (accreditation NAAC, DPDP, environmental, labour law) and industries-data.ts.",
    keyGrcTopics: [
      "Copyright & Content Intellectual Property Protection",
      "Guest & Subscriber Personal Data Protection (DPDP Act 2023)",
      "Higher Education Institutional Accreditation (NAAC/NBA/UGC Norms)",
      "Hospitality Food Safety (FSSAI) & Municipal Licences",
      "Aviation Ground Handling Safety & BCAS Security Protocols"
    ],
    documentedOfferings: [
      {
        serviceId: "accreditation-services",
        serviceName: "Accreditation & Certification Services",
        route: "/services/accreditation-services",
        relevance: "NAAC guidelines, institutional gap analyses, and policy checklist codification."
      },
      {
        serviceId: "data-privacy-dpdp",
        serviceName: "Data Privacy & DPDP Compliance",
        route: "/services/data-privacy-dpdp",
        relevance: "Student, guest, and subscriber personal data governance."
      },
      {
        serviceId: "labour-law-compliance",
        serviceName: "Labour Law Compliance",
        route: "/services/labour-law-compliance",
        relevance: "Hospitality and service workforce statutory registers."
      }
    ],
    subIndustries: [
      {
        id: "education-training",
        title: "Higher Education & Training Institutions",
        slug: "education-training",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "Institutional Governance & Accreditation",
        overview: "Universities, professional colleges, and educational trusts pursuing NAAC/NBA accreditations while ensuring statutory compliance with UGC/AICTE norms and student data privacy.",
        icon: GraduationCap,
        iconName: "GraduationCap",
        displayOrder: 1,
        regulations: ["NAAC Guidelines", "UGC Regulations", "AICTE Approval Process", "DPDP Act"],
        focusAreas: ["Accreditation Prep", "Student Data Privacy", "Affiliation Compliance"],
        businessSegments: [
          {
            name: "Universities & Professional Colleges",
            description: "Degree-granting institutions with multiple departments.",
            relevantIndustryRisks: ["Accreditation grade reduction", "Student personal data leakage"],
            applicableGrcConsiderations: ["Self-Study Report (SSR) metric verification", "DPDP student consent architecture"],
            relatedVerifiedOfferings: ["accreditation-services", "data-privacy-dpdp"]
          }
        ],
        relevantGrcTopics: [
          "NAAC 7-criterion metric validation and documentary proof registers",
          "Student admissions and parent personal data management under DPDP 2023",
          "Mandatory institutional committees (POSH, Anti-Ragging, Grievance) documentation"
        ],
        linkedOfferings: [
          {
            serviceId: "accreditation-services",
            serviceName: "Accreditation Services",
            route: "/services/accreditation-services",
            relevance: "NAAC self-study report data audit and mock committee inspections."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Student portal data privacy and consent mechanisms."
          }
        ],
        existingRoute: "/industries/media-services#education-training",
        searchKeywords: ["education", "naac", "university", "aicte", "ugc", "student data"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "tourism-hospitality",
        title: "Hospitality & Hotels",
        slug: "tourism-hospitality",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "Hotel Safety & Guest Privacy",
        overview: "Hotel chains, resorts, and convention venues managing guest identity privacy, FSSAI restaurant kitchen hygiene, liquor licensing, and municipal fire safety certificates.",
        icon: Hotel,
        iconName: "Hotel",
        displayOrder: 2,
        regulations: ["Sarais Act", "FSSAI Guidelines", "DPDP Act 2023", "Municipal Fire Safety"],
        focusAreas: ["Guest Privacy", "Kitchen Hygiene", "Fire Safety Clearances"],
        businessSegments: [
          {
            name: "Full-Service Hotels & Resorts",
            description: "Accommodations with restaurants, banquet halls, and recreational facilities.",
            relevantIndustryRisks: ["Guest credit card/ID leaks", "Food hygiene notices"],
            applicableGrcConsiderations: ["DPDP guest registration consent", "FSSAI periodic kitchen audits"],
            relatedVerifiedOfferings: ["data-privacy-dpdp", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Hotel guest passport and identity document protection under DPDP rules",
          "FSSAI food safety hygiene ratings for banquet and restaurant kitchens",
          "Municipal operating licences, fire NOC renewals, and swimming pool safety logs"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Guest identity data protection and PMS system data security."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Statutory municipal license renewals and FSSAI audits."
          }
        ],
        existingRoute: "/industries/media-services#tourism-hospitality",
        searchKeywords: ["hospitality", "hotels", "tourism", "guest privacy", "fssai kitchen"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "media-entertainment",
        title: "Media & Entertainment",
        slug: "media-entertainment",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "IP Protection & Broadcasting Compliance",
        overview: "Content producers, digital streaming platforms, and broadcast networks managing intellectual property copyrights, broadcasting code guidelines, and subscriber data governance.",
        icon: Film,
        iconName: "Film",
        displayOrder: 3,
        regulations: ["Copyright Act 1957", "Information Technology Rules 2021", "DPDP Act", "Broadcasting Codes"],
        focusAreas: ["IP Protection", "Broadcasting Code", "Subscriber Data"],
        businessSegments: [
          {
            name: "Digital Streaming & Media Platforms",
            description: "OTT video and audio streaming services handling subscriber accounts.",
            relevantIndustryRisks: ["Content piracy/IP leakage", "Grievance redressal escalation"],
            applicableGrcConsiderations: ["IT Rules 2021 Code of Ethics", "DPDP subscriber data consent"],
            relatedVerifiedOfferings: ["data-privacy-dpdp", "cybersecurity-iso27001"]
          }
        ],
        relevantGrcTopics: [
          "Digital media grievance redressal officer notifications and monthly reports",
          "Copyright registration records and production contract NDA governance",
          "Subscriber viewing history data privacy under the DPDP Act 2023"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Subscriber account privacy and digital streaming consent logs."
          },
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity Services",
            route: "/services/cybersecurity-iso27001",
            relevance: "Protecting proprietary pre-release media content archives from digital leaks."
          }
        ],
        existingRoute: "/industries/media-services#media-entertainment",
        searchKeywords: ["media", "entertainment", "ott", "broadcasting", "copyright", "streaming"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      }
    ]
  }
];

// Helper functions for easy consumption across components
export const getAllPublishedSubIndustries = (): SubIndustryRecord[] => {
  return whomWeServeClusters.flatMap(cluster => 
    cluster.subIndustries.filter(sub => sub.publicationStatus === "published")
  );
};

export const getClusterById = (id: string): IndustryClusterRecord | undefined => {
  return whomWeServeClusters.find(c => c.id === id);
};

export const searchIndustriesAndSubIndustries = (query: string): {
  clusters: IndustryClusterRecord[];
  subIndustries: SubIndustryRecord[];
} => {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return { clusters: whomWeServeClusters, subIndustries: [] };
  }

  const matchedSub = getAllPublishedSubIndustries().filter(sub => 
    sub.title.toLowerCase().includes(clean) ||
    sub.subtitle.toLowerCase().includes(clean) ||
    sub.overview.toLowerCase().includes(clean) ||
    sub.searchKeywords.some(kw => kw.toLowerCase().includes(clean)) ||
    sub.regulations.some(reg => reg.toLowerCase().includes(clean))
  );

  const matchedClusterIds = new Set(matchedSub.map(s => s.parentClusterId));
  const matchedClusters = whomWeServeClusters.filter(c => 
    c.name.toLowerCase().includes(clean) ||
    c.shortDescription.toLowerCase().includes(clean) ||
    c.keyGrcTopics.some(t => t.toLowerCase().includes(clean)) ||
    matchedClusterIds.has(c.id)
  );

  return {
    clusters: matchedClusters,
    subIndustries: matchedSub
  };
};

// ── Three-Column Organization-Size Segments Architecture ──────────────────────
// Maps each verified cluster into 3 distinct organization scale columns:
// 1. Global (Multinational Corporations & Large Global Conglomerates)
// 2. Large–Mid (Large & Mid-Sized Regional / Multi-Site Enterprises)
// 3. Mid–Small (MSMEs, Lean Manufacturers & Local Operating Units)

export const clusterSizeSegments: Record<string, SizeSegmentsConfig> = {
  "manufacturing-industrial": {
    global: [
      {
        segment: "global",
        industryName: "Automotive Manufacturing",
        businessType: "Vehicle OEMs & Multi-Plant Assembly Operations",
        shortDescription: "Integrated robotics, paint shops & global supplier audits",
        destinationUrl: "/industries/manufacturing-industrial#automobiles",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Defence & Aerospace Manufacturing",
        businessType: "Prime Defence Systems, Aviation & Space Fabricators",
        shortDescription: "ITAR/MoD security clearances, AS9100 quality oversight",
        destinationUrl: "/industries/manufacturing-industrial#defence-manufacturing",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Capital Goods & Heavy Machinery",
        businessType: "Turbines, Heavy Plant Machinery & Material Handling",
        shortDescription: "Heavy fabrication safety, environmental emission consent",
        destinationUrl: "/industries/manufacturing-industrial#engineering-capital-goods",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Basic Metals, Steel & Materials",
        businessType: "Integrated Blast Furnaces, Rolling Mills & Smelters",
        shortDescription: "CPCB continuous emission monitoring & occupational safety",
        destinationUrl: "/industries/manufacturing-industrial#steel",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Chemicals & Petrochemicals",
        businessType: "Petrochemical Refineries, Bulk Polymers & Specialty Chemicals",
        shortDescription: "MSIHC hazard control, PESO licensing & toxic storage logs",
        destinationUrl: "/industries/energy-utilities#oil-gas",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Mining & Mineral Processing",
        businessType: "Mineral Extraction, Ore Beneficiation & Quarry Conglomerates",
        shortDescription: "Mines Act safety logs, forestry clearance & blast audits",
        destinationUrl: "/industries/infrastructure-construction#infrastructure",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Industrial Automation & Instrumentation",
        businessType: "Process Automation Systems, PLCs & Factory Robotics Giants",
        shortDescription: "Critical infrastructure safety, CE/UL certification GRC",
        destinationUrl: "/industries/technology-electronics#it-bpm",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Auto Components & Ancillaries",
        businessType: "Tier-1 Transmission, Chassis & Engine Suppliers",
        shortDescription: "IATF 16949 quality oversight & contractor wage registers",
        destinationUrl: "/industries/manufacturing-industrial#auto-components",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Renewable Energy Equipment",
        businessType: "Solar PV Module, Inverter & Wind Turbine Fabricators",
        shortDescription: "ALMM listing adherence, hazardous material handling",
        destinationUrl: "/industries/energy-utilities#renewable-energy",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Textiles & Technical Textiles",
        businessType: "Commercial Spinning, Weaving & Industrial Technical Fabrics",
        shortDescription: "Zero liquid discharge (ZLD) audits & OEKO-TEX compliance",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Paper, Pulp & Packaging",
        businessType: "Automated Corrugated Line Mills & Industrial Pulp Plants",
        shortDescription: "SPCB trade effluent limits & boiler statutory inspections",
        destinationUrl: "/industries/manufacturing-industrial#packaging",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Ceramics, Glass & Advanced Materials",
        businessType: "Architectural Float Glass, Tiles & Refractories",
        shortDescription: "Air pollution control devices & thermal safety audits",
        destinationUrl: "/industries/infrastructure-construction#cement",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Electronics & Semiconductors",
        businessType: "Contract Electronic Assembly & EMS Manufacturing",
        shortDescription: "RoHS/REACH substance testing & cleanroom ISO 14644",
        destinationUrl: "/industries/technology-electronics#electronics",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Food Processing Facilities",
        businessType: "Commercial Packaged Foods, Edible Oils & Processing Hubs",
        shortDescription: "FSSAI central licensing & HACCP biological hazard controls",
        destinationUrl: "/industries/food-processing-pharma-healthcare#food",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Pharmaceuticals & Bulk Drugs",
        businessType: "Regional Formulation Plants & API Bulk Units",
        shortDescription: "GMP validation master plans & CDSCO state licensures",
        destinationUrl: "/industries/food-processing-pharma-healthcare#pharma",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "MSME Manufacturing Units",
        businessType: "Precision Tool Rooms, Dies & CNC Machining Centers",
        shortDescription: "Statutory factory inspection readiness & basic EHS records",
        destinationUrl: "/industries/manufacturing-industrial#msme",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Auto Ancillaries & Job Shops",
        businessType: "Press Stamping, Forging & Precision Turning Units",
        shortDescription: "Workplace hazard guarding & contract labour muster roles",
        destinationUrl: "/industries/manufacturing-industrial#auto-components",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Leather & Footwear Workshops",
        businessType: "Tanning Facilities & Finished Export Footwear Workshops",
        shortDescription: "Chromium recovery plant checks & export social compliance",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Contract Metal Fabrication & Spares",
        businessType: "Custom Structural Steel, Boilers & Jobbing Shops",
        shortDescription: "Hot work permit registers & worker insurance coverage",
        destinationUrl: "/industries/manufacturing-industrial#engineering-capital-goods",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Packaging & Corrugated Converters",
        businessType: "Regional Carton Box Makers & Printing Facilities",
        shortDescription: "Fire NOC renewals & ink VOC disposal documentation",
        destinationUrl: "/industries/manufacturing-industrial#packaging",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Specialty Component Sub-Assemblies",
        businessType: "Plastic Injection Moulding & Wire Harness Assemblies",
        shortDescription: "Machine interlocking safety & labour law notice filings",
        destinationUrl: "/industries/manufacturing-industrial#auto-components",
        verificationStatus: "verified"
      }
    ]
  },
  "food-processing-pharma-healthcare": {
    global: [
      {
        segment: "global",
        industryName: "Global Pharmaceutical MNCs",
        businessType: "USFDA / MHRA Regulated Sterile Formulation & API Plants",
        shortDescription: "21 CFR Part 11 electronic records, global batch release",
        destinationUrl: "/industries/food-processing-pharma-healthcare#pharma",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "International Food & Beverage Conglomerates",
        businessType: "Global FMCG Food Brands, Breweries & Bottling Networks",
        shortDescription: "Global food safety initiative (GFSI) & multi-state FSSAI",
        destinationUrl: "/industries/food-processing-pharma-healthcare#food",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Multinational MedTech Corporations",
        businessType: "Class C/D Implantable Devices & High-Risk Diagnostics",
        shortDescription: "MDR 2017 risk assessments, ISO 13485 design dossiers",
        destinationUrl: "/industries/food-processing-pharma-healthcare#medtech",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Regional Pharmaceutical CDMOs",
        businessType: "Contract Formulation Facilities & API Bulk Manufacturers",
        shortDescription: "WHO-GMP adherence, stability logs & validation registers",
        destinationUrl: "/industries/food-processing-pharma-healthcare#pharma",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Commercial Dairy & Agro-Processing",
        businessType: "Integrated Dairy Plants, Cold Storage & Milling Hubs",
        shortDescription: "Cold chain telemetry validation & packaging compliance",
        destinationUrl: "/industries/food-processing-pharma-healthcare#food",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Multi-Specialty Hospital Chains",
        businessType: "NABH-Accredited 150+ Bed Multi-Hospital Networks",
        shortDescription: "Bio-medical waste rules, clinical audit protocols",
        destinationUrl: "/industries/food-processing-pharma-healthcare#healthcare",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "AYUSH & Herbal Formulations",
        businessType: "Ayurvedic & Natural Medicine Manufacturing Units",
        shortDescription: "Schedule T Ayurvedic GMP & state licensing filings",
        destinationUrl: "/industries/food-processing-pharma-healthcare#ayush",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Local Food Processing Units",
        businessType: "Packaged Snack Food, Confectionary & Bakery Centers",
        shortDescription: "FSSAI state licensing, hygiene records & pest audits",
        destinationUrl: "/industries/food-processing-pharma-healthcare#food",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Diagnostic Clinics & Daycare Centers",
        businessType: "Independent Pathology Testing Labs & Day Surgery Centers",
        shortDescription: "Radiation safety AERB clearance, biomedical disposal",
        destinationUrl: "/industries/food-processing-pharma-healthcare#healthcare",
        verificationStatus: "verified"
      }
    ]
  },
  "technology-electronics": {
    global: [
      {
        segment: "global",
        industryName: "Global SaaS & Cloud Providers",
        businessType: "Multi-Region Cloud Infrastructure & Hyperscale Platforms",
        shortDescription: "SOC 2 Type II, ISO 27001 ISMS & multi-region privacy GRC",
        destinationUrl: "/industries/technology-electronics#saas",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Global In-House Centers (GICs) & Tech BPMs",
        businessType: "Enterprise IT Delivery & Knowledge Processing Centers",
        shortDescription: "DPDP cross-border data transfer & enterprise vendor risk",
        destinationUrl: "/industries/technology-electronics#it-bpm",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Semiconductor Design & Device MNCs",
        businessType: "Fabless Chip Designers & High-Volume Device Manufacturers",
        shortDescription: "IP security, export control regulations & cleanroom audits",
        destinationUrl: "/industries/technology-electronics#electronics",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Mid-Market B2B Enterprise Software",
        businessType: "Regulated FinTech, HealthTech & Supply Chain SaaS Platforms",
        shortDescription: "VAPT penetration audits, data privacy impact assessment",
        destinationUrl: "/industries/technology-electronics#saas",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Electronic Manufacturing Services (EMS)",
        businessType: "PCB Fabrication, Device Assembly & Box-Build Plants",
        shortDescription: "E-waste EPR authorization & hazardous chemical handling",
        destinationUrl: "/industries/technology-electronics#electronics",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Regional Telecom & Managed Service Providers",
        businessType: "Enterprise Network Providers, ISPs & Managed Cloud Operators",
        shortDescription: "DoT licensing conditions, security audit certifications",
        destinationUrl: "/industries/technology-electronics#telecommunications",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "High-Growth Tech & Mobile Startups",
        businessType: "Seed to Series-B Software, Mobile Apps & API Platforms",
        shortDescription: "Rapid DPDP baseline readiness & cloud security review",
        destinationUrl: "/industries/technology-electronics#startups",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "IoT Prototyping & Hardware Workshops",
        businessType: "Embedded Firmware, Smart Meters & Sensor Assemblies",
        shortDescription: "WPC equipment type approvals & BIS registrations",
        destinationUrl: "/industries/technology-electronics#electronics",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Localized IT Support & Web Agencies",
        businessType: "Regional Managed IT Infrastructure & System Support Agencies",
        shortDescription: "Client data confidentiality agreements & SLA audits",
        destinationUrl: "/industries/technology-electronics#it-bpm",
        verificationStatus: "verified"
      }
    ]
  },
  "infrastructure-construction": {
    global: [
      {
        segment: "global",
        industryName: "Mega EPC & Infrastructure Contractors",
        businessType: "Expressways, Rail Corridors, Ports & Transit Systems",
        shortDescription: "FIDIC contract dispute risk & massive labor camp EHS",
        destinationUrl: "/industries/infrastructure-construction#roads-highways",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Global Real Estate Developers & REITs",
        businessType: "Institutional SEZs, Commercial Hubs & Logistics Parks",
        shortDescription: "Environmental clearance (MoEFCC) & multi-state RERA",
        destinationUrl: "/industries/infrastructure-construction#real-estate",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Heavy Cement & Building Material Giants",
        businessType: "Integrated Clinker & Automated Ready-Mix Concrete Mills",
        shortDescription: "Mining lease conditions & emission scrubbers compliance",
        destinationUrl: "/industries/infrastructure-construction#cement",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Regional Real Estate Developers",
        businessType: "RERA-Compliant Residential Townships & Commercial Units",
        shortDescription: "Quarterly progress filings, escrow accounts & Title audits",
        destinationUrl: "/industries/infrastructure-construction#real-estate",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Road & Bridge Construction Contractors",
        businessType: "State Highway Builders, Flyovers & Civic Infrastructure",
        shortDescription: "Interstate contractor licensing & public safety hoardings",
        destinationUrl: "/industries/infrastructure-construction#roads-highways",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Specialized Engineering Subcontractors",
        businessType: "Pre-Engineered Buildings, HVAC & Structural Steel Units",
        shortDescription: "Scaffolding safety registers & crane operator permits",
        destinationUrl: "/industries/infrastructure-construction#infrastructure",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Local Building Contractors & Specialists",
        businessType: "Residential Builders, Finishing & MEP Trade Contractors",
        shortDescription: "BOCW worker welfare cess payments & site safety gear",
        destinationUrl: "/industries/infrastructure-construction#real-estate",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Heavy Equipment Rental & Batching Plants",
        businessType: "Crane & Earthmoving Operators, Ready-Mix Plants",
        shortDescription: "Third-party equipment fitness testing & fuel storage NOC",
        destinationUrl: "/industries/infrastructure-construction#infrastructure",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Project Supervision & Civil Consultancies",
        businessType: "Site Health & Safety Oversight, Municipal Approvals",
        shortDescription: "Occupancy certificate filings & site hazard registers",
        destinationUrl: "/industries/infrastructure-construction#infrastructure",
        verificationStatus: "verified"
      }
    ]
  },
  "energy-utilities": {
    global: [
      {
        segment: "global",
        industryName: "Integrated Oil & Gas Corporations",
        businessType: "Offshore E&P, Downstream Refineries & Pipeline Grids",
        shortDescription: "OISD safety norms, petroleum act concessions & HAZOP",
        destinationUrl: "/industries/energy-utilities#oil-gas",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "National Power Generation Utilities",
        businessType: "Thermal, Hydro & Nuclear Utilities, Inter-State Grids",
        shortDescription: "Central Electricity Authority (CEA) norms, flue gas limits",
        destinationUrl: "/industries/energy-utilities#power",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "GW-Scale Renewable Energy Developers",
        businessType: "Utility Solar Parks, Wind Farms & Hybrid Plants",
        shortDescription: "Grid connectivity approvals & environmental biodiversity",
        destinationUrl: "/industries/energy-utilities#renewable-energy",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "City Gas Distribution (CGD) Companies",
        businessType: "City Piped Gas Distribution & Commercial CNG Stations",
        shortDescription: "PNGRB regulatory standards & pressure vessel audits",
        destinationUrl: "/industries/energy-utilities#oil-gas",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Independent Power Producers (IPPs)",
        businessType: "Commercial Solar Plants, Captive Biomass Generators",
        shortDescription: "State electricity regulatory commission (SERC) tariff GRC",
        destinationUrl: "/industries/energy-utilities#renewable-energy",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Power Distribution Discoms & Substations",
        businessType: "Regional Grid Distribution, Transformer Stations",
        shortDescription: "Substation safety audits & transformer oil disposal logs",
        destinationUrl: "/industries/energy-utilities#power",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Commercial Rooftop Solar EPC Providers",
        businessType: "Industrial & Commercial C&I Solar Array Installers",
        shortDescription: "Net-metering clearance, rooftop structural stability",
        destinationUrl: "/industries/energy-utilities#renewable-energy",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Bio-CNG & Agri-Residue Pellet Units",
        businessType: "Agricultural Waste Briquetting & Biofuel Producers",
        shortDescription: "Biomass storage safety & SPCB air emissions compliance",
        destinationUrl: "/industries/energy-utilities#renewable-energy",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Field Line Maintenance & Subcontractors",
        businessType: "Transmission Line Inspections, Metering Services",
        shortDescription: "Lineman electrical safety certification & CLRA logs",
        destinationUrl: "/industries/energy-utilities#power",
        verificationStatus: "verified"
      }
    ]
  },
  "financial-services": {
    global: [
      {
        segment: "global",
        industryName: "Scheduled Commercial & Investment Banks",
        businessType: "Tier-1 Scheduled Commercial Banks & Global Custodians",
        shortDescription: "RBI Master Directions on IT Governance & cyber audit",
        destinationUrl: "/industries/financial-services#banking",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Multinational Insurance Carriers",
        businessType: "Life, General & Health Insurance Conglomerates",
        shortDescription: "IRDAI corporate governance, solvency reporting & broker oversight",
        destinationUrl: "/industries/financial-services#insurance",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Institutional Asset Managers & Sovereign Funds",
        businessType: "Pension Funds, Private Equity & Global Asset Managers",
        shortDescription: "SEBI AIF regulations, insider trading prevention systems",
        destinationUrl: "/industries/financial-services#financial-services",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Systemically Important NBFCs",
        businessType: "Upper Layer Infrastructure, Auto & MSME Finance Companies",
        shortDescription: "RBI Scale-Based Regulations (SBR) & fair practices code",
        destinationUrl: "/industries/financial-services#financial-services",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Small Finance & Regional Banks",
        businessType: "SFBs, Regional Commercial Banks & Urban Banking Entities",
        shortDescription: "Priority sector lending registers & statutory liquidity ratio",
        destinationUrl: "/industries/financial-services#banking",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Payment Aggregators & FinTech Platforms",
        businessType: "Digital Payments, Neo-Banking & Lending Portals",
        shortDescription: "RBI PA-PG cybersecurity baseline & card tokenization",
        destinationUrl: "/industries/financial-services#financial-services",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Microfinance Institutions (MFIs)",
        businessType: "Section 8 MFIs, Joint Liability Lending Intermediaries",
        shortDescription: "Qualifying asset compliance & borrower grievance registers",
        destinationUrl: "/industries/financial-services#financial-services",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Primary Urban Co-operative Credit Societies",
        businessType: "District Co-operative Credit Banks & Rural Thrifts",
        shortDescription: "State registrar filings & periodic statutory audit logs",
        destinationUrl: "/industries/financial-services#banking",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Independent Brokerages & Wealth Advisors",
        businessType: "SEBI-Registered Sub-Brokers & Wealth Management Firms",
        shortDescription: "Client KYC directories, AML/CFT screening & trade logs",
        destinationUrl: "/industries/financial-services#insurance",
        verificationStatus: "verified"
      }
    ]
  },
  "healthcare-life-sciences": {
    global: [
      {
        segment: "global",
        industryName: "Global Biopharma & Vaccines Leaders",
        businessType: "International Clinical Trials, Biologics & Vaccines Hubs",
        shortDescription: "GCP clinical trial registers & international biosafety approvals",
        destinationUrl: "/industries/healthcare-life-sciences#biotechnology",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Multinational Hospital Networks",
        businessType: "JCI-Accredited Quaternary Care Hospital Networks",
        shortDescription: "Clinical governance, organ transplant statutory oversight",
        destinationUrl: "/industries/healthcare-life-sciences#healthcare",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Advanced Medical Devices Corporations",
        businessType: "Class C/D Implantable Hardware & Diagnostic Imaging",
        shortDescription: "CDSCO manufacturing licences & ISO 14971 risk management",
        destinationUrl: "/industries/healthcare-life-sciences#medical-devices",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Regional Multi-Specialty Hospital Chains",
        businessType: "NABH-Accredited 100-250 Bed Regional Facilities",
        shortDescription: "Biomedical waste management rules & patient privacy",
        destinationUrl: "/industries/healthcare-life-sciences#healthcare",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Diagnostic Laboratory & Imaging Chains",
        businessType: "NABL-Accredited Centralized Labs & Imaging Centers",
        shortDescription: "AERB radiation clearance & NABL quality calibration records",
        destinationUrl: "/industries/healthcare-life-sciences#healthcare",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Surgical Consumables Manufacturers",
        businessType: "Orthopedic Disposables, Sterilization Hardware",
        shortDescription: "ETO sterilization validation & batch tracking records",
        destinationUrl: "/industries/healthcare-life-sciences#medical-devices",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Community Hospitals & Nursing Homes",
        businessType: "30-50 Bed Local Nursing Homes & Specialist Clinics",
        shortDescription: "Clinical Establishments Act registrations & fire clearances",
        destinationUrl: "/industries/healthcare-life-sciences#healthcare",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Sample Collection Centers & Pathology Units",
        businessType: "Local Sample Pick-Up & Basic Pathology Testing Units",
        shortDescription: "Biological specimen transit safety & sharps disposal records",
        destinationUrl: "/industries/healthcare-life-sciences#healthcare",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "AYUSH Wellness & Alternative Health Centers",
        businessType: "State-Registered Holistic Wellness & Therapy Clinics",
        shortDescription: "Practitioner credentialing & herbal dispensary licensures",
        destinationUrl: "/industries/healthcare-life-sciences#ayush",
        verificationStatus: "verified"
      }
    ]
  },
  "consumer-retail": {
    global: [
      {
        segment: "global",
        industryName: "Multinational FMCG Conglomerates",
        businessType: "Personal Care, Packaged Beverages & Home Products",
        shortDescription: "Plastic waste EPR returns & Legal Metrology packaging norms",
        destinationUrl: "/industries/consumer-retail#fmcg",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Global Retail Chains & Hypermarkets",
        businessType: "Supermarket Chains & Cash-and-Carry Megastores",
        shortDescription: "Multi-state Shops & Commercial Establishments licensing",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "International Apparel & Footwear Brands",
        businessType: "Global Lifestyle Retailers & Multi-Unit Franchises",
        shortDescription: "Consumer protection e-commerce rules & ethical sourcing",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Regional FMCG & Packaged Staples Brands",
        businessType: "State Food Brands, Edible Oil Mills & Dairy Distributors",
        shortDescription: "FSSAI state license compliance & commodity weight checks",
        destinationUrl: "/industries/consumer-retail#fmcg",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Multi-Category E-Commerce Platforms",
        businessType: "Direct-to-Consumer Marketplaces & Fulfillment Networks",
        shortDescription: "DPDP consent management & seller onboarding audit records",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Regional Lifestyle & Electronics Chains",
        businessType: "Multi-Brand Consumer Electronics & Fashion Showrooms",
        shortDescription: "Store safety audits & electronic waste buy-back registers",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Standalone Retail Outlets & Boutiques",
        businessType: "Independent Retail Stores, Superettes & Showrooms",
        shortDescription: "Local municipal trade licenses & GST invoicing registers",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Artisanal D2C & Organic Brands",
        businessType: "Specialty Organic Foods, Handcrafted Apparel Brands",
        shortDescription: "Jaivik Bharat organic certification & clean label disclosure",
        destinationUrl: "/industries/consumer-retail#fmcg",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Wholesale Distributors & Stockist Depots",
        businessType: "Regional FMCG Distribution Hubs & Trade Depots",
        shortDescription: "Warehouse fire NOCs & commercial vehicle permit tracking",
        destinationUrl: "/industries/consumer-retail#retail",
        verificationStatus: "verified"
      }
    ]
  },
  "media-services": {
    global: [
      {
        segment: "global",
        industryName: "Global Broadcast & Entertainment Studios",
        businessType: "Television Networks, Film Studios & Streaming Providers",
        shortDescription: "MIB uplinking/downlinking guidelines & copyright audits",
        destinationUrl: "/industries/media-services#entertainment",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "Multinational Professional Advisory Firms",
        businessType: "International Audit, Legal & Management Consultancies",
        shortDescription: "ICAI/Bar Council code of ethics, client confidentiality GRC",
        destinationUrl: "/industries/media-services#consulting",
        verificationStatus: "verified"
      },
      {
        segment: "global",
        industryName: "International Luxury Hotel Groups",
        businessType: "5-Star Luxury Hotels & International Resort Chains",
        shortDescription: "FSSAI star hotel compliance, fire and life safety certifications",
        destinationUrl: "/industries/media-services#hospitality",
        verificationStatus: "verified"
      }
    ],
    largeMid: [
      {
        segment: "large-mid",
        industryName: "Regional Television Networks & Publishers",
        businessType: "Multi-Lingual News Channels & Commercial Publishing",
        shortDescription: "Press Council regulations & editorial compliance archives",
        destinationUrl: "/industries/media-services#media",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Contract 3PL Logistics & Warehousing Hubs",
        businessType: "Multi-Modal Freight, Logistics & Fulfillment Centers",
        shortDescription: "Warehouse Development and Regulatory Authority (WDRA) GRC",
        destinationUrl: "/industries/media-services#logistics",
        verificationStatus: "verified"
      },
      {
        segment: "large-mid",
        industryName: "Business Hotels & Convention Centers",
        businessType: "Corporate Business Hotels & Exhibition Venues",
        shortDescription: "Commercial swimming pool safety, liquor license renewals",
        destinationUrl: "/industries/media-services#hospitality",
        verificationStatus: "verified"
      }
    ],
    midSmall: [
      {
        segment: "mid-small",
        industryName: "Digital Creative & Advertising Agencies",
        businessType: "Independent Design Studios, PR & Video Production",
        shortDescription: "ASCI advertising standards & talent intellectual property",
        destinationUrl: "/industries/media-services#media",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Corporate Facility & Security Providers",
        businessType: "Contract Security Guards & Industrial Housekeeping",
        shortDescription: "PSARA private security agency licenses & minimum wages",
        destinationUrl: "/industries/media-services#services",
        verificationStatus: "verified"
      },
      {
        segment: "mid-small",
        industryName: "Local Freight & Last-Mile Delivery Fleets",
        businessType: "Regional Couriers, Van Fleets & Parcel Operators",
        shortDescription: "Commercial driver fitness records & transit insurance logs",
        destinationUrl: "/industries/media-services#logistics",
        verificationStatus: "verified"
      }
    ]
  }
};

export const getClusterSizeSegments = (clusterId: string): SizeSegmentsConfig => {
  return clusterSizeSegments[clusterId] || clusterSizeSegments["manufacturing-industrial"];
};


import { 
  Car, Wrench, Settings, ShieldAlert, Store, Laptop, Cpu, PhoneCall, 
  Zap, BrickWall, Hammer, Building2, Milestone, 
  Fuel, Sun, Landmark, Coins, 
  HeartHandshake, ShoppingCart, Pill, Activity, Stethoscope, 
  Dna, ShoppingBag, Scissors, Utensils, Film, Hotel, 
  GraduationCap, Factory,
  Package, Radio, HardHat,
  Droplets, Leaf, Truck, Globe, CreditCard, BarChart3, Microscope,
  FlaskConical, ChefHat, Tractor, Plane, Tv, Building, Users, Wifi
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
  relatedVerifiedOfferings?: string[];
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
      },
      {
        id: "chemicals-specialty",
        title: "Chemicals & Specialty Coatings",
        slug: "chemicals-specialty",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "Process Safety & Hazardous Chemical Compliance",
        overview: "Specialty chemical plants, paint manufacturers, and adhesive producers operating under stringent Factories Act hazardous process schedules, CPCB effluent limits, and chemical import licensing frameworks.",
        icon: FlaskConical,
        iconName: "FlaskConical",
        displayOrder: 6,
        regulations: ["Factories Act (Hazardous Processes)", "EPA 1986", "CPCB Emission Norms", "Customs Hazardous Chemicals Rules"],
        focusAreas: ["Hazardous Chemical Storage", "ETP Effluent Monitoring", "Process Safety"],
        businessSegments: [
          {
            name: "Specialty Coatings & Adhesive Manufacturing",
            description: "Solvent-based paints, industrial adhesives, and anti-corrosion coating units.",
            relevantIndustryRisks: ["VOC emission limit breaches", "Flammable solvent storage safety"],
            applicableGrcConsiderations: ["SPCB stack emission consents", "Flammable storage safety certificates"],
            relatedVerifiedOfferings: ["environmental-compliance", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Factories Act Schedule IV hazardous process notifications",
          "Effluent trade consent renewals and online monitoring portal uploads",
          "Chemical import license and SDS (Safety Data Sheet) regulatory registers"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "CPCB/SPCB consent-to-establish, consent-to-operate, and effluent reports."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Hazardous process statutory registers and chemical import documentation."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#chemicals-specialty",
        searchKeywords: ["chemicals", "coatings", "paint", "adhesive", "hazardous process", "etp", "voc"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "plastics-rubber",
        title: "Plastics & Rubber Processing",
        slug: "plastics-rubber",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "EPR Compliance & Polymer Waste Management",
        overview: "Polymer compounders, injection moulding units, and rubber goods manufacturers managing Extended Producer Responsibility (EPR) obligations, plastic waste rules, and factory floor chemical safety.",
        icon: Package,
        iconName: "Package",
        displayOrder: 7,
        regulations: ["Plastic Waste Management Rules 2016", "Factories Act", "BIS Standards", "EPR Guidelines"],
        focusAreas: ["EPR Registration", "Plastic Waste Reduction", "Factory Safety"],
        businessSegments: [
          {
            name: "Injection Moulding & Polymer Components",
            description: "High-volume plastic part manufacturers supplying automotive and consumer sectors.",
            relevantIndustryRisks: ["EPR target non-fulfilment", "Plasticizer chemical exposure"],
            applicableGrcConsiderations: ["CPCB EPR portal registration", "Worker chemical hazard exposure monitoring"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CPCB Extended Producer Responsibility (EPR) portal registration and annual targets",
          "Plastic Waste Management Rules 2016 producer obligations and compliance returns",
          "Factory floor chemical exposure monitoring and occupational health records"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "EPR returns, plastic waste collection targets, and environmental registers."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Factory Act statutory registers and occupational health surveillance."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#plastics-rubber",
        searchKeywords: ["plastics", "rubber", "polymer", "epr", "injection moulding", "plastic waste"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "glass-ceramics",
        title: "Glass, Ceramics & Refractories",
        slug: "glass-ceramics",
        parentClusterId: "manufacturing-industrial",
        parentClusterName: "Manufacturing & Industrial",
        subtitle: "High-Temperature Process Safety & Emission Monitoring",
        overview: "Flat glass producers, ceramic sanitaryware manufacturers, and refractory brick units operating high-temperature kilns subject to continuous emission norms, silica dust controls, and energy efficiency regulations.",
        icon: Droplets,
        iconName: "Droplets",
        displayOrder: 8,
        regulations: ["Environment Protection Act 1986", "Factories Act", "CPCB Emission Norms", "Energy Conservation Act"],
        focusAreas: ["Kiln Emissions", "Silica Dust Controls", "Energy Efficiency"],
        businessSegments: [
          {
            name: "Flat Glass & Container Glass Production",
            description: "Continuous tank furnaces for architectural and packaging glass.",
            relevantIndustryRisks: ["Particulate emission spikes from furnaces", "Silica sand dust inhalation hazards"],
            applicableGrcConsiderations: ["CEMS emission data uploads", "Silica occupational exposure limit monitoring"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Continuous Emission Monitoring System (CEMS) compliance for high-temperature kilns",
          "Silica dust exposure measurement and respiratory health surveillance",
          "BEE energy star ratings and designated consumer energy audit records"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "CEMS monitoring, particulate emission registers, and SPCB filings."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Occupational health records and silica hazard exposure logs under the Factories Act."
          }
        ],
        existingRoute: "/industries/manufacturing-industrial#glass-ceramics",
        searchKeywords: ["glass", "ceramics", "refractories", "kilns", "silica", "cems", "emission"],
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
      },
      {
        id: "cybersecurity-services",
        title: "Cybersecurity & InfoSec Services",
        slug: "cybersecurity-services",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Managed Security & CERT-In Compliance",
        overview: "Managed security service providers (MSSPs), penetration testing firms, and security operations centres (SOCs) delivering threat detection, incident response, and compliance assurance services to regulated clients.",
        icon: ShieldAlert,
        iconName: "ShieldAlert",
        displayOrder: 5,
        regulations: ["CERT-In Directions 2022", "IT Act 2000", "ISO 27001", "DPDP Act 2023"],
        focusAreas: ["SOC Operations", "CERT-In Incident Reporting", "Penetration Testing"],
        businessSegments: [
          {
            name: "Managed Security Operations Centres (MSSP/SOC)",
            description: "24×7 threat monitoring, SIEM management, and client compliance dashboards.",
            relevantIndustryRisks: ["SLA breach for incident response", "Sub-processor data exposure"],
            applicableGrcConsiderations: ["CERT-In 6-hour reporting playbooks", "Client data handling policies"],
            relatedVerifiedOfferings: ["cybersecurity-iso27001", "incident-response"]
          }
        ],
        relevantGrcTopics: [
          "CERT-In mandatory 6-hour cyber incident reporting and log retention requirements",
          "ISO 27001 ISMS gap assessments for security service providers",
          "Client data classification and cross-border transfer controls under DPDP"
        ],
        linkedOfferings: [
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "ISMS framework design, vulnerability management, and SOC 2 readiness."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Client data processing agreements and DPDP consent architecture."
          }
        ],
        existingRoute: "/industries/technology-electronics#cybersecurity-services",
        searchKeywords: ["cybersecurity", "mssp", "soc", "cert-in", "iso 27001", "penetration testing"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "fintech-digital-payments",
        title: "Fintech & Digital Payments",
        slug: "fintech-digital-payments",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "RBI Payment Aggregator Norms & Data Security",
        overview: "Payment aggregators, lending platforms, and digital wallet operators complying with RBI Payment Aggregator guidelines, NPCI operational standards, and PCI-DSS security requirements.",
        icon: CreditCard,
        iconName: "CreditCard",
        displayOrder: 6,
        regulations: ["RBI Payment Aggregator Guidelines 2020", "PCI-DSS", "DPDP Act 2023", "PMLA 2002"],
        focusAreas: ["RBI Authorization", "PCI-DSS Compliance", "AML & KYC"],
        businessSegments: [
          {
            name: "Payment Aggregators & Digital Wallets",
            description: "Online merchant payment acceptance platforms and stored-value wallets.",
            relevantIndustryRisks: ["Fraudulent transaction spikes", "RBI networth covenant breach"],
            applicableGrcConsiderations: ["RBI escrow account monitoring", "PCI-DSS annual QSA assessments"],
            relatedVerifiedOfferings: ["regulatory-compliance", "cybersecurity-iso27001"]
          }
        ],
        relevantGrcTopics: [
          "RBI Payment Aggregator authorization and net-worth thresholds compliance",
          "PCI-DSS card data environment scoping and quarterly ASV scans",
          "PMLA transaction monitoring and suspicious activity reporting for fintechs"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "RBI PA/PG licensing compliance and NPCI operational standards tracking."
          },
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity Services",
            route: "/services/cybersecurity-iso27001",
            relevance: "PCI-DSS scoping, card data environment audits, and penetration testing."
          }
        ],
        existingRoute: "/industries/technology-electronics#fintech-digital-payments",
        searchKeywords: ["fintech", "payments", "rbi pa", "pci-dss", "wallet", "digital payments", "npci"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "cloud-data-centres",
        title: "Cloud & Data Centre Operations",
        slug: "cloud-data-centres",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Data Localisation & Infrastructure Security",
        overview: "Hyperscale and co-location data centre operators, cloud service providers, and edge computing facilities managing data residency regulations, ISO 27001 physical security, and energy compliance.",
        icon: Globe,
        iconName: "Globe",
        displayOrder: 7,
        regulations: ["DPDP Act 2023 (Data Localisation)", "ISO 27001", "CERT-In Directions", "Electricity Act 2003"],
        focusAreas: ["Data Residency", "Physical Security", "Environmental Footprint"],
        businessSegments: [
          {
            name: "Co-location & Cloud Hosting Providers",
            description: "Enterprise-grade data centres offering managed infrastructure and IaaS.",
            relevantIndustryRisks: ["Cross-border data transfer non-compliance", "Physical intrusion and insider threats"],
            applicableGrcConsiderations: ["DPDP data fiduciary obligations", "ISO 27001 A.11 physical security controls"],
            relatedVerifiedOfferings: ["cybersecurity-iso27001", "data-privacy-dpdp"]
          }
        ],
        relevantGrcTopics: [
          "DPDP Act data localisation mandates and cross-border transfer safeguards",
          "ISO 27001 data centre physical security (CCTV, access control, visitor logs)",
          "Power Usage Effectiveness (PUE) energy efficiency and environmental regulatory logs"
        ],
        linkedOfferings: [
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "Data centre ISMS and physical security audit preparation."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Data localisation compliance and cross-border processing safeguards."
          }
        ],
        existingRoute: "/industries/technology-electronics#cloud-data-centres",
        searchKeywords: ["cloud", "data centre", "hosting", "iaas", "data localisation", "dpdp"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "edtech-elearning",
        title: "EdTech & E-Learning Platforms",
        slug: "edtech-elearning",
        parentClusterId: "technology-electronics",
        parentClusterName: "Technology & Electronics",
        subtitle: "Student Data Privacy & Platform Governance",
        overview: "Online learning platforms, skill development companies, and educational technology providers handling student personal data, payment records, and academic performance under emerging EdTech regulatory scrutiny.",
        icon: GraduationCap,
        iconName: "GraduationCap",
        displayOrder: 8,
        regulations: ["DPDP Act 2023", "IT Act 2000", "Consumer Protection Act 2019", "UGC Online Education Norms"],
        focusAreas: ["Minor Data Protection", "Consumer Grievances", "IT Rules 2021"],
        businessSegments: [
          {
            name: "Online Learning & Upskilling Platforms",
            description: "Subscription-based professional skill and K-12 academic platforms.",
            relevantIndustryRisks: ["Minor learner personal data misuse", "Refund policy consumer disputes"],
            applicableGrcConsiderations: ["DPDP parental consent for minors", "Consumer Protection grievance officer portal"],
            relatedVerifiedOfferings: ["data-privacy-dpdp", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "DPDP Act 2023 consent requirements for minor learner data and parental consent",
          "Consumer Protection (E-Commerce) Rules grievance officer and refund policies",
          "IT Rules 2021 intermediary due diligence and content moderation policies"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Student data mapping, parental consent architecture, and RoPA registers."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "IT Rules 2021 intermediary compliance and UGC online education filings."
          }
        ],
        existingRoute: "/industries/technology-electronics#edtech-elearning",
        searchKeywords: ["edtech", "e-learning", "online education", "student data", "minor data", "ugc"],
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
      },
      {
        id: "ports-logistics",
        title: "Ports & Logistics Hubs",
        slug: "ports-logistics",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "Customs Compliance & Port EHS Governance",
        overview: "Major and minor port trusts, logistics park developers, and integrated warehousing hubs managing dock worker safety, customs warehousing licenses, dangerous goods handling, and multimodal transport EHS.",
        icon: Truck,
        iconName: "Truck",
        displayOrder: 5,
        regulations: ["Major Port Authorities Act 2021", "Customs Act 1962", "BOCW Safety Norms", "Dangerous Goods Rules"],
        focusAreas: ["Dock Worker Safety", "Customs Warehousing", "Dangerous Goods"],
        businessSegments: [
          {
            name: "Container Terminals & Warehousing Parks",
            description: "Deep-water container berths and bonded logistics warehousing facilities.",
            relevantIndustryRisks: ["Crane and dock worker fatality risks", "Dangerous goods mislabelling"],
            applicableGrcConsiderations: ["Dock Workers Safety Regulations", "Customs bonded warehouse license audits"],
            relatedVerifiedOfferings: ["labour-law-compliance", "regulatory-compliance"]
          }
        ],
        relevantGrcTopics: [
          "Dock Workers (Safety, Health and Welfare) Regulations compliance",
          "Customs bonded warehouse licensing and periodic reconciliation audits",
          "Dangerous goods classification, labelling, and segregation records"
        ],
        linkedOfferings: [
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Dock and contract worker safety registers and statutory insurance compliance."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Port authority licensing and customs warehousing compliance filings."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#ports-logistics",
        searchKeywords: ["ports", "logistics", "dock", "warehousing", "customs", "container terminal"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "metro-rail-transit",
        title: "Urban Metro & Rail Transit",
        slug: "metro-rail-transit",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "Metro Rail Safety & Public Works Compliance",
        overview: "Metro rail corporations, urban rapid transit operators, and railway infrastructure contractors managing electrical safety, tunneling EHS, passenger safety standards, and government contract compliance.",
        icon: Milestone,
        iconName: "Milestone",
        displayOrder: 6,
        regulations: ["Metro Railway Act 2002", "Electricity Act 2003", "BOCW Act", "Fire Safety Standards"],
        focusAreas: ["Tunneling Safety", "Electrical Clearances", "Labour Compliance"],
        businessSegments: [
          {
            name: "Metro Rail Civil & Systems Contractors",
            description: "Tunnel boring, elevated viaduct, and station civil contractors.",
            relevantIndustryRisks: ["Underground tunneling collapse hazards", "High-voltage OHE electrocution risks"],
            applicableGrcConsiderations: ["Tunneling safety management plans", "Electrical inspector clearances"],
            relatedVerifiedOfferings: ["labour-law-compliance", "environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "BOCW cess deduction, payment proof, and site injury registers for tunneling works",
          "Electrical Inspector to Government (EIG) clearances for traction and signaling systems",
          "Vibration and noise impact monitoring during underground drilling and blasting"
        ],
        linkedOfferings: [
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "BOCW statutory compliance for large-scale civil construction workforces."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Dust, vibration, and noise pollution control at urban transit worksites."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#metro-rail-transit",
        searchKeywords: ["metro", "rail transit", "tunneling", "railway", "bocw", "urban transit"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "water-infrastructure",
        title: "Water Infrastructure & Treatment",
        slug: "water-infrastructure",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "WTP/STP Environmental Compliance & Safety",
        overview: "Municipal water treatment plants (WTP), sewage treatment plants (STP), and bulk water pipeline infrastructure operators ensuring treated water quality standards, CPCB effluent compliance, and contractor safety.",
        icon: Droplets,
        iconName: "Droplets",
        displayOrder: 7,
        regulations: ["Environment Protection Act 1986", "CPCB Water Quality Standards", "BOCW Act", "National Water Policy"],
        focusAreas: ["Effluent Quality Compliance", "STP/WTP Inspections", "Labour Safety"],
        businessSegments: [
          {
            name: "Sewage Treatment Plant (STP) Operations",
            description: "Urban municipal wastewater treatment and reuse infrastructure.",
            relevantIndustryRisks: ["Effluent discharge exceeding BOD/COD limits", "Confined space worker asphyxiation"],
            applicableGrcConsiderations: ["CPCB/SPCB trade effluent standards monitoring", "Confined space entry permit registers"],
            relatedVerifiedOfferings: ["environmental-compliance", "labour-law-compliance"]
          }
        ],
        relevantGrcTopics: [
          "CPCB treated wastewater quality standards (BOD, COD, pH) compliance monitoring",
          "Confined space permit-to-work registers for STP maintenance operations",
          "Contractor wage reconciliation and BOCW safety compliance at project sites"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "STP/WTP effluent quality monitoring logs and SPCB discharge consents."
          },
          {
            serviceId: "labour-law-compliance",
            serviceName: "Labour Law Compliance",
            route: "/services/labour-law-compliance",
            relevance: "Confined space worker safety permits and BOCW statutory compliance."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#water-infrastructure",
        searchKeywords: ["water treatment", "sewage", "stp", "wtp", "effluent", "municipal infrastructure"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "industrial-parks-sez",
        title: "Industrial Parks & Special Economic Zones",
        slug: "industrial-parks-sez",
        parentClusterId: "infrastructure-construction",
        parentClusterName: "Infrastructure & Construction",
        subtitle: "SEZ Compliance & Multi-Tenant EHS Governance",
        overview: "SEZ developers, industrial park operators, and plug-and-play manufacturing hub managers ensuring common facility environmental compliance, zone authority filings, and multi-tenant contractor safety governance.",
        icon: Building2,
        iconName: "Building2",
        displayOrder: 8,
        regulations: ["SEZ Act 2005", "Environment Protection Act", "Factories Act", "BOCW Act"],
        focusAreas: ["Zone Authority Compliance", "Common ETP Operations", "Multi-Tenant Labour"],
        businessSegments: [
          {
            name: "SEZ Developer & Zone Management",
            description: "Infrastructure development and facility management for manufacturing SEZ units.",
            relevantIndustryRisks: ["Zone authority compliance lapses", "Common ETP overloading"],
            applicableGrcConsiderations: ["SEZ annual performance statement filings", "CPCB common ETP consent conditions"],
            relatedVerifiedOfferings: ["regulatory-compliance", "environmental-compliance"]
          }
        ],
        relevantGrcTopics: [
          "SEZ Act 2005 zone authority annual reports and unit-wise performance statements",
          "Common Effluent Treatment Plant (CETP) regulatory consent and trade waste allocation",
          "Multi-tenant contractor workforce compliance and site safety coordination"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance",
            route: "/services/regulatory-compliance",
            relevance: "Zone authority filings, unit-level trade licenses, and SEZ annual returns."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Common ETP compliance management and multi-unit environmental returns."
          }
        ],
        existingRoute: "/industries/infrastructure-construction#industrial-parks-sez",
        searchKeywords: ["sez", "industrial park", "special economic zone", "cetp", "zone authority", "plug-and-play"],
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
      },
      {
        id: "bioenergy-waste-to-power",
        title: "Biomass & Waste-to-Energy",
        slug: "bioenergy-waste-to-power",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "Bio-Power Safety & Emission Consents",
        overview: "Operators of biomass generation, landfill gas capture, and municipal waste-to-energy plants manage municipal concessions, stack emission limits, ash disposal protocols, and feed-in tariff reconciliations.",
        icon: Leaf,
        iconName: "Leaf",
        displayOrder: 5,
        regulations: [
          "Solid Waste Management Rules, 2016",
          "Air (Prevention and Control of Pollution) Act, 1981",
          "Central Electricity Authority (Technical Standards) Regulations",
          "Indian Boilers Act, 1923"
        ],
        focusAreas: [
          "Municipal solid waste feedstock supply compliance",
          "Continuous stack emission monitoring system (CEMS) compliance",
          "Fly ash and bottom ash management and disposal verification",
          "Power purchase agreement (PPA) statutory reconciliations"
        ],
        businessSegments: [
          {
            name: "Global Clean Energy Conglomerates",
            description: "Multinational renewable energy firms running municipal waste-to-energy assets in emerging markets.",
            relevantIndustryRisks: ["Strict emission threshold penalties", "Feedstock volume guarantee defaults", "Cross-border turbine technology compliance"],
            applicableGrcConsiderations: ["Comprehensive ESG and carbon credit validation", "Continuous CEMS tracking", "Contractual indemnities and risk mitigation"]
          },
          {
            name: "Large–Mid Independent Power Producers (IPPs)",
            description: "Regional IPPs running grid-connected agricultural biomass and municipal waste plants.",
            relevantIndustryRisks: ["State pollution control board inspections", "Seasonal feedstock supply fluctuations", "Grid synchronization stability mandates"],
            applicableGrcConsiderations: ["Consent-to-operate renewals", "Environmental register maintenance", "Labour safety in fuel handling yards"]
          },
          {
            name: "Mid–Small Bio-Energy & Bio-CNG Operators",
            description: "Decentralized bio-CNG, agricultural residue pelletization, and municipal biogas processors.",
            relevantIndustryRisks: ["Local municipal contract disputes", "On-site industrial hygiene and fire hazards", "Subsidies and state nodal agency clearances"],
            applicableGrcConsiderations: ["Fire and safety licensing", "Factory Act boiler registrations", "Statutory wage and vendor filings"]
          }
        ],
        relevantGrcTopics: [
          "Waste feedstock compliance",
          "Continuous emission monitoring",
          "Environmental consent filings",
          "Industrial boiler safety"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "CEMS integration, stack emissions, and ash disposal register adherence."
          },
          {
            serviceId: "esg-sustainability",
            serviceName: "ESG & Sustainability Advisory",
            route: "/services/esg-sustainability",
            relevance: "Carbon credit assurance, circular economy reporting, and BRSR filings."
          }
        ],
        existingRoute: "/industries/energy-utilities#bioenergy",
        searchKeywords: ["biomass", "waste to energy", "biogas", "bio cng", "cems", "renewable power"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "hydrogen-gas-supply",
        title: "Industrial Gas & Clean Hydrogen",
        slug: "hydrogen-gas-supply",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "PESO Gas Standards & Clean Hydrogen Safety",
        overview: "Green hydrogen electrolyzer operators and industrial gas producers navigate stringent pressure vessel certifications, explosive atmosphere regulations, hazardous handling norms, and green hydrogen standard accreditations.",
        icon: Fuel,
        iconName: "Fuel",
        displayOrder: 6,
        regulations: [
          "Static and Mobile Pressure Vessels (Unfired) Rules, 2016 (PESO)",
          "Gas Cylinders Rules, 2016",
          "National Green Hydrogen Mission Standards & Specifications",
          "Manufacture, Storage and Import of Hazardous Chemical Rules, 1989"
        ],
        focusAreas: [
          "PESO licensing for high-pressure cryogenic and compressed hydrogen storage",
          "Green hydrogen origin certification and additionality tracking",
          "Process safety management (PSM) and leak detection governance",
          "Emergency response and disaster management plans (ERDMP)"
        ],
        businessSegments: [
          {
            name: "Global Energy & Chemical Multinationals",
            description: "International leaders developing giga-scale green hydrogen hubs and ammonia export terminals.",
            relevantIndustryRisks: ["PESO pipeline right-of-way compliance", "Export port safety certifications", "International green hydrogen accreditation standards"],
            applicableGrcConsiderations: ["Cross-border carbon border adjustment (CBAM) alignment", "Global process safety standards", "Continuous leak monitoring governance"]
          },
          {
            name: "Large–Mid Industrial Gas Suppliers",
            description: "Producers of oxygen, nitrogen, and argon supplying steel, pharma, and manufacturing clusters.",
            relevantIndustryRisks: ["Fleet cylinder compliance and testing cycles", "Bulk cryogenic tanker transport licensing", "Industrial customer safety SLA breaches"],
            applicableGrcConsiderations: ["SMPV testing audits", "Driver hazardous material handling certifications", "Depot environmental consents"]
          },
          {
            name: "Mid–Small Gas Bottling & Distribution Units",
            description: "Regional gas filling plants, medical oxygen distributors, and specialized gas retailers.",
            relevantIndustryRisks: ["Cylinder inspection lapses", "Static electricity and fire incidents", "Local municipal and fire NOC non-compliances"],
            applicableGrcConsiderations: ["Local PESO license renewals", "Factory safety audits", "Contract labour statutory registrations"]
          }
        ],
        relevantGrcTopics: [
          "PESO pressure vessel compliance",
          "Hazardous chemical storage",
          "Process safety management",
          "Green hydrogen certification"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "PESO licensing, hazardous material approvals, and environmental filings."
          },
          {
            serviceId: "enterprise-risk-management",
            serviceName: "Enterprise Risk Management",
            route: "/services/enterprise-risk-management",
            relevance: "Process safety risk registers, ERDMP drills, and supply chain continuity."
          }
        ],
        existingRoute: "/industries/energy-utilities#hydrogen-gas",
        searchKeywords: ["hydrogen", "green hydrogen", "industrial gas", "peso", "cryogenic", "pressure vessels"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "thermal-power-generation",
        title: "Thermal & Conventional Power",
        slug: "thermal-power-generation",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "Stack Emissions & Ash Pond Safety",
        overview: "Conventional power utilities operate under rigorous flue-gas desulfurization (FGD) installation deadlines, coal linkage audits, water withdrawal clearances, and electrical safety standards.",
        icon: Zap,
        iconName: "Zap",
        displayOrder: 7,
        regulations: [
          "Electricity Act, 2003 and CEA Safety Regulations, 2010",
          "MoEFCC Emission Norms for Thermal Power Plants (SOx, NOx, SPM)",
          "Central Electricity Regulatory Commission (CERC) Grid Code",
          "Water (Prevention and Control of Pollution) Act, 1974"
        ],
        focusAreas: [
          "FGD retrofitting and emission benchmark adherence",
          "Fly ash 100% utilization mandate compliance",
          "Cooling water intake and thermal discharge monitoring",
          "Captive power generation statutory reporting and duty payments"
        ],
        businessSegments: [
          {
            name: "Global & National Power Utilities",
            description: "Large-scale public and private utility corporations operating supercritical coal and combined-cycle plants.",
            relevantIndustryRisks: ["Non-compliance penalties for emission retrofit milestones", "Coal quality and linkage reconciliations", "Grid stability and dynamic scheduling compliance"],
            applicableGrcConsiderations: ["Integrated CERC regulatory compliance tracking", "Continuous emission and water telemetry governance", "BRSR and carbon reduction reporting"]
          },
          {
            name: "Large–Mid Captive Power Plants (CPPs)",
            description: "Industrial captive plants powering steel mills, chemical complexes, and aluminum smelters.",
            relevantIndustryRisks: ["Electricity duty assessment disputes", "Ash disposal storage limit breaches", "Factory Act boiler inspection lapses"],
            applicableGrcConsiderations: ["State electricity regulatory commission (SERC) filings", "Boiler safety compliance audits", "Contract labour health and safety"]
          },
          {
            name: "Mid–Small Gas & Cogeneration Units",
            description: "Combined heat and power (CHP) installations serving sugar mills, textile parks, and chemical zones.",
            relevantIndustryRisks: ["Gas supply contract penalties", "Local air pollution board notices", "Boiler license renewal delays"],
            applicableGrcConsiderations: ["Pollution control board consent renewals", "Annual boiler inspections", "Vendor compliance reviews"]
          }
        ],
        relevantGrcTopics: [
          "Flue-gas emission compliance",
          "Fly ash utilization registers",
          "Boiler safety certifications",
          "Grid code adherence"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Fly ash utilization, stack emissions, and effluent discharge monitoring."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "CERC/SERC tariff compliance, grid regulations, and statutory filings."
          }
        ],
        existingRoute: "/industries/energy-utilities#thermal-power",
        searchKeywords: ["thermal power", "coal power", "fgd", "cerc", "boiler", "cooling water"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "water-desalination-utilities",
        title: "Water Utilities & Desalination",
        slug: "water-desalination-utilities",
        parentClusterId: "energy-utilities",
        parentClusterName: "Energy & Utilities",
        subtitle: "Desalination Water Quality & EHS Norms",
        overview: "Water treatment and utility operators must maintain potable water health standards, marine brine disposal compliance, groundwater extraction NOCs, and municipal concession contracts.",
        icon: Droplets,
        iconName: "Droplets",
        displayOrder: 8,
        regulations: [
          "Central Ground Water Authority (CGWA) Guidelines",
          "Coastal Regulation Zone (CRZ) Notifications for Marine Outfalls",
          "Water (Prevention and Control of Pollution) Cess Act, 1977",
          "Bureau of Indian Standards IS 10500 Drinking Water Specifications"
        ],
        focusAreas: [
          "CGWA abstraction permits and digital flowmeter compliance",
          "Desalination plant marine brine discharge impact monitoring",
          "Sludge disposal and heavy metal leachate testing",
          "Public-private partnership (PPP) concession agreement governance"
        ],
        businessSegments: [
          {
            name: "Global Water Infrastructure Operators",
            description: "International desalination and wastewater concessionaires operating giga-scale treatment assets.",
            relevantIndustryRisks: ["CRZ marine outfall environmental litigation", "Concession tariff indexation disputes", "Plant availability SLA penalties"],
            applicableGrcConsiderations: ["Environmental and marine impact audits", "Concession contract risk management", "Continuous water quality telemetry"]
          },
          {
            name: "Large–Mid Industrial Water Treatment Plants",
            description: "Zero Liquid Discharge (ZLD) plants and common effluent treatment plants (CETP) in industrial estates.",
            relevantIndustryRisks: ["SPCB online BOD/COD telemetry breach notices", "Hazardous solid salt disposal compliance", "Industrial member discharge non-compliance"],
            applicableGrcConsiderations: ["CETP regulatory compliance oversight", "Hazardous waste manifest management", "Member industry effluent monitoring"]
          },
          {
            name: "Mid–Small Water Supply & Purification Units",
            description: "Packaged drinking water plants, commercial filtration networks, and municipal water kiosks.",
            relevantIndustryRisks: ["BIS license suspension for microbiological contamination", "Unregistered borehole extraction fines", "Local public health notices"],
            applicableGrcConsiderations: ["BIS IS 10500 testing governance", "CGWA NOC application tracking", "Food safety (FSSAI) potable water licenses"]
          }
        ],
        relevantGrcTopics: [
          "CGWA groundwater abstraction",
          "Marine brine disposal compliance",
          "Zero liquid discharge monitoring",
          "BIS drinking water standards"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Groundwater NOC, brine discharge compliance, and SPCB consent filings."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "Municipal concession contracts, BIS licensing, and statutory reports."
          }
        ],
        existingRoute: "/industries/energy-utilities#water-utilities",
        searchKeywords: ["water utilities", "desalination", "cgwa", "zld", "effluent", "cetp"],
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
      },
      {
        id: "microfinance-institutions",
        title: "Microfinance & Rural Lending",
        slug: "microfinance-institutions",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "NBFC-MFI Fair Practices & Priority Lending",
        overview: "Microfinance institutions handle high-volume field operations, field officer code-of-conduct adherence, RBI harmonized microfinance regulatory frameworks, customer grievance mechanisms, and borrower data confidentiality.",
        icon: Users,
        iconName: "Users",
        displayOrder: 4,
        regulations: [
          "RBI Regulatory Framework for Microfinance Loans Directions, 2022",
          "Fair Practices Code (FPC) for NBFC-MFIs",
          "Prevention of Money Laundering Act (PMLA), 2002",
          "Digital Personal Data Protection Act, 2023 (DPDPA)"
        ],
        focusAreas: [
          "Household income assessment and qualifying asset calculation",
          "Recovery agent conduct and grievance redressal monitoring",
          "Credit bureau submission (CIC) hygiene and data accuracy",
          "Cash-in-transit security and branch statutory registers"
        ],
        businessSegments: [
          {
            name: "Global & Pan-India NBFC-MFIs",
            description: "Institutional lenders operating extensive multi-state rural branch footprints.",
            relevantIndustryRisks: ["Systemic credit cycle volatility", "Borrower over-indebtedness scrutiny", "Fair practices regulatory inspection findings"],
            applicableGrcConsiderations: ["Centralized RBI compliance monitoring", "Automated CIC reporting governance", "Internal audit of loan disbursements"]
          },
          {
            name: "Large–Mid Regional Cooperative Banks",
            description: "District central cooperative banks and urban cooperative financial institutions.",
            relevantIndustryRisks: ["Asset quality classification delays", "State cooperative registrar dual-regulation conflicts", "IT security and phishing vulnerabilities"],
            applicableGrcConsiderations: ["RBI cyber security framework for UCBs", "Statutory audit compliance", "Anti-money laundering KYC verification"]
          },
          {
            name: "Mid–Small Rural Credit Societies & NGOs",
            description: "Grassroots self-help group promoters and localized micro-lending entities.",
            relevantIndustryRisks: ["Manual register tracking errors", "Cash handling misappropriation risks", "Local community dispute escalations"],
            applicableGrcConsiderations: ["Standardized credit register maintenance", "Cash management controls", "Basic privacy and consent protocols"]
          }
        ],
        relevantGrcTopics: [
          "RBI microfinance directions",
          "Fair practices code",
          "Borrower household income assessment",
          "Grievance redressal mechanisms"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "RBI master directions, qualifying asset registers, and supervisory returns."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "Branch cash audits, loan underwriting verification, and AML checks."
          }
        ],
        existingRoute: "/industries/financial-services#microfinance",
        searchKeywords: ["microfinance", "mfi", "nbfc-mfi", "rbi", "priority sector", "cooperative"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "wealth-asset-management",
        title: "Wealth & Asset Management",
        slug: "wealth-asset-management",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "SEBI Portfolio Governance & AIF Compliance",
        overview: "Asset and wealth managers navigate SEBI mutual fund regulations, AIF private placement memorandums, valuation governance, prevention of front-running, and digital distributor onboarding compliance.",
        icon: BarChart3,
        iconName: "BarChart3",
        displayOrder: 5,
        regulations: [
          "SEBI (Mutual Funds) Regulations, 1996",
          "SEBI (Alternative Investment Funds) Regulations, 2012",
          "SEBI (Portfolio Managers) Regulations, 2020",
          "PMLA & Financial Intelligence Unit (FIU-IND) Reporting Guidelines"
        ],
        focusAreas: [
          "Front-running and insider trading surveillance systems",
          "AIF private placement memorandum (PPM) audit compliance",
          "Net asset value (NAV) calculation and valuation committee governance",
          "KYC, beneficial ownership verification, and PEP screening"
        ],
        businessSegments: [
          {
            name: "Global Asset Managers & Private Equity Funds",
            description: "Sovereign wealth funds and global AMCs managing Category II & III AIFs in India.",
            relevantIndustryRisks: ["Cross-border tax treaty reporting changes", "Stewardship code and ESG disclosure mandates", "High-frequency trading surveillance alerts"],
            applicableGrcConsiderations: ["SEBI PPM compliance reviews", "FATCA/CRS statutory submissions", "Institutional trade surveillance"]
          },
          {
            name: "Large–Mid Domestic AMCs & Wealth Managers",
            description: "Registered mutual fund houses and wealth managers offering discretionary PMS solutions.",
            relevantIndustryRisks: ["Distributor commission disclosure violations", "Liquidity stress testing non-compliance", "Personal trading code-of-conduct breaches"],
            applicableGrcConsiderations: ["Automated employee trade pre-clearance", "Risk-o-meter classification audits", "SEBI inspection readiness reviews"]
          },
          {
            name: "Mid–Small Family Offices & Boutique AIFs",
            description: "Independent multi-family offices, angel funds, and niche Category I AIFs.",
            relevantIndustryRisks: ["Unregistered investment advisory notices", "Unlisted asset valuation methodology challenges", "Conflict of interest disclosures"],
            applicableGrcConsiderations: ["Chartered valuation compliance checks", "Investor KYC registers", "Annual statutory secretarial compliance"]
          }
        ],
        relevantGrcTopics: [
          "SEBI mutual fund regulations",
          "AIF PPM compliance audits",
          "Trade surveillance and insider trading",
          "Valuation committee oversight"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "SEBI filings, compliance officer registers, and PPM audit support."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "NAV calculation reviews, front-running surveillance, and AML-KYC audits."
          }
        ],
        existingRoute: "/industries/financial-services#wealth-management",
        searchKeywords: ["amc", "mutual fund", "aif", "pms", "wealth management", "sebi", "front running"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "payments-settlement-systems",
        title: "Payment Aggregators & Gateways",
        slug: "payments-settlement-systems",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "RBI Payment Gateways & Tokenisation Norms",
        overview: "Licensed payment entities must comply with RBI Payment Aggregator (PA) guidelines, card-on-file tokenization, escrow account reconciliations, PCI-DSS requirements, and fraud monitoring mandates.",
        icon: CreditCard,
        iconName: "CreditCard",
        displayOrder: 6,
        regulations: [
          "RBI Guidelines on Regulation of Payment Aggregators and Payment Gateways, 2020",
          "Payment and Settlement Systems Act, 2007 (PSSA)",
          "PCI-DSS v4.0 Payment Card Industry Data Security Standard",
          "RBI Master Direction on Cyber Resilience and Digital Payment Security"
        ],
        focusAreas: [
          "Nodal/escrow account reconciliation and fund settlement timelines (T+1/T+2)",
          "Merchant onboarding due diligence, risk categorization, and site verification",
          "System audit report (SAR) and cyber security audit submissions to RBI",
          "Chargeback, dispute resolution, and cardholder data purge cycles"
        ],
        businessSegments: [
          {
            name: "Global FinTech Payment Processors",
            description: "Cross-border payment giants providing international checkout and merchant acquiring infrastructure.",
            relevantIndustryRisks: ["Card-on-file data storage non-compliance", "Cross-border merchant trade compliance violations", "Escrow audit exceptions"],
            applicableGrcConsiderations: ["Periodic RBI system audit reports (SAR)", "Continuous transaction anomaly surveillance", "Global PCI-DSS v4.0 certification"]
          },
          {
            name: "Large–Mid Domestic Payment Aggregators",
            description: "Licensed Indian PAs supporting UPI, netbanking, and credit card payments for domestic e-commerce.",
            relevantIndustryRisks: ["Merchant fraud and rogue merchant liability", "Settlement delays causing regulatory warnings", "DPDP data localization lapses"],
            applicableGrcConsiderations: ["Merchant KYC and risk categorization", "Escrow turnover reconciliation audits", "Third-party vendor penetration testing"]
          },
          {
            name: "Mid–Small Specialized Payment Gateways",
            description: "Niche B2B invoicing solutions, transit card aggregators, and digital micro-payment facilitators.",
            relevantIndustryRisks: ["RBI PA-CB licensing threshold bottlenecks", "API key leak and integration vulnerability", "Dispute resolution SLA breaches"],
            applicableGrcConsiderations: ["Application security code reviews", "Standardized merchant agreements", "Disaster recovery failover tests"]
          }
        ],
        relevantGrcTopics: [
          "RBI payment aggregator guidelines",
          "PCI-DSS v4.0 certification",
          "Escrow account reconciliation",
          "Merchant due diligence & KYC"
        ],
        linkedOfferings: [
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "PCI-DSS compliance, RBI SAR audit preparation, and penetration testing."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "RBI PA licensing, nodal escrow audits, and quarterly regulatory filings."
          }
        ],
        existingRoute: "/industries/financial-services#payments",
        searchKeywords: ["payment aggregator", "payment gateway", "rbi", "pci-dss", "upi", "escrow"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "corporate-treasury-forex",
        title: "Treasury & Cross-Border Forex",
        slug: "corporate-treasury-forex",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "FEMA Compliance & Cross-Border Forex",
        overview: "Cross-border remittance providers and corporate treasuries adhere to FEMA regulations, Liberalised Remittance Scheme (LRS) caps, EDPMS/IDPMS trade reconciliations, and anti-money laundering monitoring.",
        icon: Landmark,
        iconName: "Landmark",
        displayOrder: 7,
        regulations: [
          "Foreign Exchange Management Act, 1999 (FEMA) and RBI Master Directions",
          "Liberalised Remittance Scheme (LRS) Regulations",
          "RBI Export Data Processing and Monitoring System (EDPMS)",
          "Prevention of Money Laundering (Maintenance of Records) Rules"
        ],
        focusAreas: [
          "FEMA trade credit and external commercial borrowing (ECB) reporting",
          "EDPMS/IDPMS outstanding shipping bill reconciliation",
          "LRS annual remittance threshold tracking and TCS tax collection",
          "Suspicious transaction reporting (STR) to FIU-IND"
        ],
        businessSegments: [
          {
            name: "Global Corporate Treasuries & AD Banks",
            description: "Multinational treasury hubs managing currency hedging, overseas direct investment, and trade credit.",
            relevantIndustryRisks: ["FEMA compounding proceedings for delay in ODI filings", "Derivative transaction reporting mismatch", "Cross-border transfer pricing scrutiny"],
            applicableGrcConsiderations: ["Comprehensive FEMA statutory register audits", "Automated RBI APR/FLA return workflows", "Hedging policy risk governance"]
          },
          {
            name: "Large–Mid Foreign Exchange Intermediaries",
            description: "Authorized Dealers Category II, money changing firms, and overseas education remittance platforms.",
            relevantIndustryRisks: ["LRS limit exceedance fines", "Customer identification lapse in cash currency exchange", "Concurrent audit qualification points"],
            applicableGrcConsiderations: ["Concurrent audit oversight", "Daily currency holding reconciliations", "Digital customer KYC checks"]
          },
          {
            name: "Mid–Small Money Changers & Travel Treasuries",
            description: "Full-Fledged Money Changers (FFMC) serving airport hubs and localized business travelers.",
            relevantIndustryRisks: ["Expired RBI license operations", "Counterfeit currency handling liabilities", "Manual FLM register record errors"],
            applicableGrcConsiderations: ["RBI FFMC license renewal maintenance", "Cash register verification", "Anti-counterfeit SOP implementations"]
          }
        ],
        relevantGrcTopics: [
          "FEMA & RBI Master Directions",
          "EDPMS / IDPMS reconciliations",
          "LRS compliance & TCS tracking",
          "FIU-IND reporting obligations"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "FEMA compounding advisory, FLA/APR returns, and AD-II regulatory filings."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "Concurrent audit of forex branches and trade finance document verifications."
          }
        ],
        existingRoute: "/industries/financial-services#treasury-forex",
        searchKeywords: ["fema", "forex", "treasury", "edpms", "idpms", "lrs", "ffmc", "remittance"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "credit-esg-rating",
        title: "Credit & ESG Rating Agencies",
        slug: "credit-esg-rating",
        parentClusterId: "financial-services",
        parentClusterName: "Financial Services",
        subtitle: "SEBI Rating Code & ESG Assurance",
        overview: "Rating agencies maintain stringent conflict-of-interest walls, rating committee governance, default recognition methodologies, and SEBI CRA/ERP disclosure requirements.",
        icon: Coins,
        iconName: "Coins",
        displayOrder: 8,
        regulations: [
          "SEBI (Credit Rating Agencies) Regulations, 1999",
          "SEBI Master Circular for Credit Rating Agencies, 2023",
          "SEBI Regulatory Framework for ESG Rating Providers (ERPs), 2023",
          "IOSCO Code of Conduct Fundamentals for Credit Rating Agencies"
        ],
        focusAreas: [
          "Rating committee independence and analyst compensation segregation",
          "Mandatory rating review and prompt default recognition protocols",
          "ESG rating provider (ERP) methodology disclosure and transparency",
          "Issuer non-cooperation (INC) classification criteria compliance"
        ],
        businessSegments: [
          {
            name: "Global Credit & Sustainability Rating Conglomerates",
            description: "International rating institutions operating domestic SEBI-registered rating and ESG subsidiaries.",
            relevantIndustryRisks: ["Conflicted advisory vs. rating services penalties", "Cross-border methodology divergence", "Regulatory show-cause notices on rating timeliness"],
            applicableGrcConsiderations: ["Institutional code-of-conduct compliance", "SEBI inspection readiness reviews", "Methodology committee audit trails"]
          },
          {
            name: "Large–Mid Domestic Credit Rating Agencies",
            description: "Registered Indian CRAs rating bank loans, corporate bonds, commercial paper, and structured debt.",
            relevantIndustryRisks: ["Failure to downgrade distressed issuers in time", "Analyst turnover leading to surveillance lapses", "Website disclosure delay fines"],
            applicableGrcConsiderations: ["Comprehensive rating process audits", "Default study and transition matrix compliance", "Internal audit of rating files"]
          },
          {
            name: "Mid–Small ESG & Green Bond Verifiers",
            description: "Boutique sustainability assessors, second-party opinion providers, and accredited ESG rating firms.",
            relevantIndustryRisks: ["Greenwashing liability allegations", "Lack of transparent scoring models", "SEBI ERP registration requirement non-compliance"],
            applicableGrcConsiderations: ["SEBI ERP registration assistance", "Rating methodology documentation", "Data verification and assurance frameworks"]
          }
        ],
        relevantGrcTopics: [
          "SEBI credit rating agency regulations",
          "Rating committee governance",
          "ESG rating provider framework",
          "Conflict-of-interest wall verification"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "SEBI CRA and ERP compliance registers, policy manuals, and regulatory audits."
          },
          {
            serviceId: "esg-sustainability",
            serviceName: "ESG & Sustainability Advisory",
            route: "/services/esg-sustainability",
            relevance: "ESG rating methodology alignment, BRSR core assurance, and green finance frameworks."
          }
        ],
        existingRoute: "/industries/financial-services#rating-agencies",
        searchKeywords: ["credit rating", "cra", "sebi", "esg rating", "erp", "bond rating", "default"],
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
      },
      {
        id: "diagnostic-pathology-labs",
        title: "Diagnostic & Pathology Laboratories",
        slug: "diagnostic-pathology-labs",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "NABL Accreditation & Bio-Waste Management",
        overview: "Clinical testing facilities operate under NABL ISO 15189 accreditation standards, AERB radiation safety for X-ray and CT equipment, biomedical waste authorizations, and digital patient report privacy regulations.",
        icon: Microscope,
        iconName: "Microscope",
        displayOrder: 5,
        regulations: [
          "NABL ISO 15189 Medical Laboratories Requirements",
          "Atomic Energy Regulatory Board (AERB) Safety Directives",
          "Biomedical Waste Management Rules, 2016",
          "Digital Personal Data Protection Act, 2023 (DPDPA)"
        ],
        focusAreas: [
          "External Quality Assessment Scheme (EQAS) calibration compliance",
          "AERB e-LORA registration and radiation safety officer (RSO) governance",
          "Sample barcoding, specimen custody chain, and disposal manifests",
          "Digital diagnostic report authenticity and patient privacy controls"
        ],
        businessSegments: [
          {
            name: "Global Diagnostic Networks",
            description: "Multinational clinical pathology and molecular testing chains with reference laboratories.",
            relevantIndustryRisks: ["Cross-border biological specimen shipping restrictions", "CAP and CLIA international accreditation audit findings", "Cybersecurity breaches of central lab information systems (LIS)"],
            applicableGrcConsiderations: ["Enterprise LIS data security and encryption", "Global reference standard validation", "Statutory infectious disease reporting (IDSP)"]
          },
          {
            name: "Large–Mid Regional Lab Chains",
            description: "Diagnostic chains operating regional hubs, spoke collection centers, and imaging facilities.",
            relevantIndustryRisks: ["Collection center biomedical waste handling lapses", "AERB equipment licensing expiration notices", "Technician competency and sign-off non-compliances"],
            applicableGrcConsiderations: ["NABL internal audit cycles", "Routine e-LORA AERB compliance tracking", "Collection center SLA and safety oversight"]
          },
          {
            name: "Mid–Small Independent Pathology Clinics",
            description: "Doctor-led localized pathology and ultrasound clinics in urban and semi-urban localities.",
            relevantIndustryRisks: ["PNDT Act recordkeeping infractions", "Improper sharps disposal citations", "Unregistered diagnostic analyzer equipment"],
            applicableGrcConsiderations: ["Strict PC-PNDT statutory register maintenance", "Local biomedical waste agency tie-ups", "Basic doctor sign-off verification"]
          }
        ],
        relevantGrcTopics: [
          "NABL ISO 15189 accreditation",
          "AERB radiation safety licensing",
          "PC-PNDT statutory registers",
          "Biomedical waste manifests"
        ],
        linkedOfferings: [
          {
            serviceId: "accreditation-services",
            serviceName: "Healthcare Accreditation Advisory",
            route: "/services/accreditation-services",
            relevance: "NABL ISO 15189 pre-assessment, audit readiness, and SOP preparation."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "AERB e-LORA approvals, PC-PNDT compliance, and BMW authorization filings."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#diagnostic-labs",
        searchKeywords: ["pathology", "nabl", "aerb", "diagnostics", "radiology", "iso 15189", "pndt"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "ayush-wellness-centres",
        title: "AYUSH & Integrative Medicine",
        slug: "ayush-wellness-centres",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "Ministry of AYUSH Standards & GMP Licensing",
        overview: "AYUSH healthcare centers and wellness retreats must comply with Ministry of AYUSH clinical standards, NABH AYUSH accreditation standards, herbal medicine GMP guidelines, and medical tourism statutory disclosures.",
        icon: Leaf,
        iconName: "Leaf",
        displayOrder: 6,
        regulations: [
          "Ministry of AYUSH Guidelines for Clinical Establishments",
          "NABH Accreditation Standards for AYUSH Hospitals",
          "Drugs and Cosmetics Act, 1940 (Schedule T - AYUSH GMP)",
          "Clinical Establishments (Registration and Regulation) Act, 2010"
        ],
        focusAreas: [
          "Schedule T GMP compliance for in-house medicine preparations",
          "Practitioner credentialing and AYUSH state registration boards",
          "Therapeutic treatment consenting and medical tourism visa compliance",
          "Herbal raw material traceability and heavy metal testing records"
        ],
        businessSegments: [
          {
            name: "Global Integrative Health & Wellness Resorts",
            description: "Luxury ayurvedic retreats catering to international medical and wellness tourists.",
            relevantIndustryRisks: ["Foreign tourist medical reporting violations", "Cross-border herbal shipment customs hold-ups", "Misleading wellness cure claim liabilities"],
            applicableGrcConsiderations: ["ASCI advertising code compliance for wellness claims", "Foreign national FRRO and medical visa tracking", "NABH AYUSH accreditation governance"]
          },
          {
            name: "Large–Mid AYUSH Hospital Networks",
            description: "Dedicated inpatient ayurvedic and homeopathic healthcare facilities and hospital chains.",
            relevantIndustryRisks: ["Clinical establishment act registration delays", "Insurance cashless empanelement documentation gaps", "Panchakarma biomedical waste disposal citations"],
            applicableGrcConsiderations: ["NABH pre-accreditation audits", "Biomedical waste management documentation", "Standardized treatment clinical protocols"]
          },
          {
            name: "Mid–Small Herbal Treatment Clinics & Spas",
            description: "Local wellness centers, herbal therapy clinics, and specialized naturopathy spas.",
            relevantIndustryRisks: ["Unregistered practitioner practice risks", "In-house medicine labeling non-compliance", "Local trade license and fire safety lapses"],
            applicableGrcConsiderations: ["Doctor registration register maintenance", "Local municipal licensing", "Fire and safety compliance checks"]
          }
        ],
        relevantGrcTopics: [
          "NABH AYUSH standards",
          "Schedule T GMP compliance",
          "Clinical Establishment registration",
          "Herbal traceability and safety"
        ],
        linkedOfferings: [
          {
            serviceId: "accreditation-services",
            serviceName: "Healthcare Accreditation Advisory",
            route: "/services/accreditation-services",
            relevance: "NABH AYUSH accreditation standards, clinical audit, and quality documentation."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "AYUSH department licensing, Clinical Establishment Act filings, and GMP audits."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#ayush",
        searchKeywords: ["ayush", "ayurveda", "nabh ayush", "wellness", "homeopathy", "schedule t", "naturopathy"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "telehealth-digital-health",
        title: "Telehealth & Digital Health",
        slug: "telehealth-digital-health",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "Telemedicine Practice Guidelines & DPDP",
        overview: "Telemedicine platforms and health-tech providers adhere to Telemedicine Practice Guidelines, ABDM (Ayushman Bharat Digital Mission) integration mandates, Electronic Health Record (EHR) standards, and DPDP patient privacy rules.",
        icon: Laptop,
        iconName: "Laptop",
        displayOrder: 7,
        regulations: [
          "Telemedicine Practice Guidelines, 2020 (NMC)",
          "Ayushman Bharat Digital Mission (ABDM) Integration Standards",
          "Digital Personal Data Protection Act, 2023 (DPDPA)",
          "Information Technology (Intermediary Guidelines) Rules, 2021"
        ],
        focusAreas: [
          "Patient explicit consent and digital health record retention",
          "Doctor identity and medical council registration verification (NPR)",
          "Restricted medicine prescription scheduling adherence (Schedule X/H1 limits)",
          "Health data interoperability and FHIR standard encryption"
        ],
        businessSegments: [
          {
            name: "Global HealthTech & E-Consultation Giants",
            description: "Multinational tele-health aggregators and AI-assisted clinical triage platforms.",
            relevantIndustryRisks: ["Cross-border patient data transfer non-compliance", "Misdiagnosis algorithmic liability", "ABDM milestone integration default"],
            applicableGrcConsiderations: ["Comprehensive DPDP health data impact assessments", "Clinical algorithm risk validation", "SOC 2 Type II and ISO 27701 certification"]
          },
          {
            name: "Large–Mid Domestic Telemedicine & E-Pharmacy Platforms",
            description: "Integrated health apps providing doctor booking, teleconsultation, and prescription delivery.",
            relevantIndustryRisks: ["Dispensing drugs without verified prescription", "Practitioner credential verification lapses", "Intermediary platform liability notices"],
            applicableGrcConsiderations: ["Automated doctor credential verification against NMC", "Prescription audit trails", "Digital grievance redressal mechanisms"]
          },
          {
            name: "Mid–Small Specialty Telehealth Startups",
            description: "Mental health platforms, remote chronic care monitoring apps, and maternal care trackers.",
            relevantIndustryRisks: ["Informed consent capture gaps", "Cloud patient record exposure", "Consumer protection misleading claim notices"],
            applicableGrcConsiderations: ["Standardized teleconsultation consent forms", "Cloud security audits", "Terms of service and privacy policy reviews"]
          }
        ],
        relevantGrcTopics: [
          "Telemedicine Practice Guidelines",
          "ABDM compliance & M1/M2/M3 milestones",
          "Digital patient health privacy",
          "Doctor credential verification"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "DPDP Data Privacy Management",
            route: "/services/data-privacy-dpdp",
            relevance: "Patient health data consent frameworks, ABDM compliance, and EHR data governance."
          },
          {
            serviceId: "cybersecurity-iso27001",
            serviceName: "Cybersecurity & ISO 27001",
            route: "/services/cybersecurity-iso27001",
            relevance: "Telemedicine platform penetration testing, FHIR API security, and HIPAA/ISO 27701 alignment."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#telehealth",
        searchKeywords: ["telemedicine", "telehealth", "abdm", "healthtech", "ehr", "dpdp", "e-pharmacy"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "dental-specialty-clinics",
        title: "Dental & Ambulatory Care",
        slug: "dental-specialty-clinics",
        parentClusterId: "healthcare-life-sciences",
        parentClusterName: "Healthcare & Life Sciences",
        subtitle: "AERB Radiation & Daycare Clinical Safety",
        overview: "Daycare and dental facilities manage biomedical waste autoclaving, AERB dental X-ray/CBCT approvals, Dental Council of India practitioner licensing, and localized clinical establishment registrations.",
        icon: Stethoscope,
        iconName: "Stethoscope",
        displayOrder: 8,
        regulations: [
          "Dentists Act, 1948 and Dental Council of India Regulations",
          "AERB Safety Directives for Dental X-Ray & CBCT Units",
          "Biomedical Waste Management Rules, 2016",
          "State Clinical Establishments Acts"
        ],
        focusAreas: [
          "Autoclaving validation and infection control sterilization protocols",
          "AERB registration for intraoral X-ray and CBCT imaging units",
          "Sharps and mercury amalgam separator waste management",
          "Patient treatment consent and medical indemnity records"
        ],
        businessSegments: [
          {
            name: "Pan-India Dental & Daycare Chains",
            description: "Multi-city dental clinic chains and corporatized ambulatory surgery networks.",
            relevantIndustryRisks: ["Clinic-to-clinic sterilization divergence", "AERB equipment licensing lapses across branches", "Cross-infection liability claims"],
            applicableGrcConsiderations: ["Centralized AERB compliance tracking", "Sterilization autoclave spore testing logs", "Standardized patient consent workflows"]
          },
          {
            name: "Large–Mid Ambulatory & Daycare Surgical Centers",
            description: "Short-stay ophthalmic, laparoscopic, and cosmetic surgery facilities.",
            relevantIndustryRisks: ["Clinical Establishment Act inspection notices", "Post-operative infection audit flags", "Biomedical waste agency manifest non-compliances"],
            applicableGrcConsiderations: ["Infection control committee audits", "BMW monthly return submissions", "Emergency transfer protocol agreements"]
          },
          {
            name: "Mid–Small Standalone Dental Practices",
            description: "Independent dental surgeries, orthodontic clinics, and local dental labs.",
            relevantIndustryRisks: ["Unregistered dental X-ray units", "Improper disposal of dental amalgam and sharps", "Trade and signage license non-compliances"],
            applicableGrcConsiderations: ["Basic AERB e-LORA filing", "Authorized BMW collection tie-ups", "Dentist council registration renewals"]
          }
        ],
        relevantGrcTopics: [
          "Dental clinic sterilization compliance",
          "AERB dental X-ray licensing",
          "Amalgam & biomedical waste disposal",
          "Clinical establishment registration"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "AERB dental equipment approvals, municipal health licenses, and clinical registrations."
          },
          {
            serviceId: "accreditation-services",
            serviceName: "Healthcare Accreditation Advisory",
            route: "/services/accreditation-services",
            relevance: "NABH Daycare and Dental Clinic accreditation standards and audit readiness."
          }
        ],
        existingRoute: "/industries/healthcare-life-sciences#dental-clinics",
        searchKeywords: ["dental", "daycare surgery", "aerb", "cbct", "sterilization", "autoclave", "dentist"],
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
        existingRoute: "/industries/food-processing-pharma-healthcare#pharmaceutical-manufacturing",
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
        existingRoute: "/industries/food-processing-pharma-healthcare#healthcare-delivery",
        searchKeywords: ["healthcare", "hospitals", "clinics", "clinical quality", "patient safety"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "dairy-beverage-processing",
        title: "Dairy, Beverages & Breweries",
        slug: "dairy-beverage-processing",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "FSSAI Safety Standards & Effluent Oversight",
        overview: "Dairy and beverage manufacturers comply with FSSAI microbiological limits, BIS packaged water certifications, state excise regulations for breweries, groundwater NOCs, and effluent treatment standards.",
        icon: Droplets,
        iconName: "Droplets",
        displayOrder: 4,
        regulations: [
          "FSSAI (Food Products Standards and Food Additives) Regulations, 2011",
          "Bureau of Indian Standards IS 14543 (Packaged Drinking Water)",
          "State Excise Acts & Brewery Licensing Rules",
          "Central Ground Water Authority (CGWA) Guidelines"
        ],
        focusAreas: [
          "Milk adulteration testing (aflatoxin M1, antibiotics, urea) protocols",
          "BIS certification surveillance audits for bottled water and soda",
          "State excise bonded warehouse register maintenance and batch tracking",
          "High-COD dairy effluent treatment and biogas capture compliance"
        ],
        businessSegments: [
          {
            name: "Global Beverage & Dairy Conglomerates",
            description: "Multinational beverage corporations operating high-speed automated bottling and dairy plants.",
            relevantIndustryRisks: ["Groundwater depletion public litigation", "FSSAI product recall orders for pesticide residues", "Extended Producer Responsibility (EPR) plastic defaults"],
            applicableGrcConsiderations: ["Enterprise CGWA telemetry monitoring", "Global GFSI benchmark audits", "Centralized EPR credit management"]
          },
          {
            name: "Large–Mid Regional Dairy Cooperatives & Distilleries",
            description: "State dairy federations, craft breweries, and regional fruit juice bottlers.",
            relevantIndustryRisks: ["Milk chilling center contamination incidents", "State excise permit delay losses", "Effluent discharge notice from state PCB"],
            applicableGrcConsiderations: ["Chilling center hygiene audit programs", "Excise register reconciliation audits", "Effluent telemetry governance"]
          },
          {
            name: "Mid–Small Packaged Water & Dairy Units",
            description: "Local 20-litre water jar plants, paneer and ghee manufacturing units, and microbreweries.",
            relevantIndustryRisks: ["BIS license suspension for coliform detection", "Illegal groundwater extraction penalties", "Unregistered contract workers"],
            applicableGrcConsiderations: ["Periodic BIS sample testing records", "Factory Act registrations", "Basic FSSAI hygiene logbooks"]
          }
        ],
        relevantGrcTopics: [
          "FSSAI dairy & beverage standards",
          "BIS packaged water certifications",
          "CGWA groundwater extraction permits",
          "State excise bonded compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "FSSAI central licenses, BIS certifications, and state excise compliance."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Groundwater NOCs, high-BOD effluent treatment, and plastic EPR filings."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#dairy-beverages",
        searchKeywords: ["dairy", "beverage", "brewery", "bottling", "bis water", "fssai", "excise"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "cold-chain-logistics-fp",
        title: "Cold Chain & Perishable Logistics",
        slug: "cold-chain-logistics-fp",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "Cold Chain FSMS & Temperature Integrity",
        overview: "Cold chain logistics providers ensure continuous temperature mapping, CDSCO Good Distribution Practices (GDP) for pharmaceuticals, FSSAI perishable cold-storage mandates, and ammonia refrigeration safety.",
        icon: Truck,
        iconName: "Truck",
        displayOrder: 5,
        regulations: [
          "CDSCO Good Distribution Practices (GDP) Guidelines",
          "FSSAI Guidelines on Cold Chain Logistics and Warehousing",
          "Petroleum and Explosives Safety Organization (PESO) Ammonia Norms",
          "Motor Vehicles Act - Refrigerated Transport Specifications"
        ],
        focusAreas: [
          "Multi-point continuous temperature data logger calibration and audit trails",
          "Cold-room thermal mapping validation (empty and loaded states)",
          "Refrigeration plant ammonia leak detection and emergency response (PSM)",
          "Cross-contamination prevention in multi-commodity cold stores"
        ],
        businessSegments: [
          {
            name: "Global Pharma & Perishable Cold Logistics",
            description: "Multinational 3PL cold-chain operators managing pharma airport hubs and perishable sea freight.",
            relevantIndustryRisks: ["Biologics temperature excursion insurance claims", "Customs clearance delay spoilage", "Cross-border GDP audit disqualifications"],
            applicableGrcConsiderations: ["GDP and WHO-standard thermal mapping", "Real-time IoT temperature telemetry", "Cold chain business continuity planning"]
          },
          {
            name: "Large–Mid Regional Cold Storage Networks",
            description: "Commercial cold-storage parks and reefer truck fleet operators across agricultural belts.",
            relevantIndustryRisks: ["Ammonia cylinder rupture accidents", "Farmer crop spoilage disputes", "Power failure backup downtime liabilities"],
            applicableGrcConsiderations: ["PESO pressure vessel inspections", "Factory Act annual safety audits", "Generator diesel statutory permits"]
          },
          {
            name: "Mid–Small Reefer Fleets & Pack Houses",
            description: "Local refrigerated van operators, fruit ripening chambers, and dairy delivery hubs.",
            relevantIndustryRisks: ["Reefer temperature log falsification claims", "Food safety hygiene notices", "Driver safety and resting hour violations"],
            applicableGrcConsiderations: ["Digital temperature sensor calibration", "Basic FSSAI transport licenses", "Driver statutory compliance records"]
          }
        ],
        relevantGrcTopics: [
          "Cold chain GDP compliance",
          "Thermal mapping & data logging",
          "Ammonia refrigeration safety",
          "Perishable food hygiene"
        ],
        linkedOfferings: [
          {
            serviceId: "supply-chain-compliance",
            serviceName: "Supply Chain & Logistics Compliance",
            route: "/services/supply-chain-compliance",
            relevance: "Reefer fleet audit, temperature logging validation, and vendor SLAs."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "PESO ammonia licenses, FSSAI warehouse approvals, and factory safety."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#cold-chain",
        searchKeywords: ["cold chain", "reefer", "cold storage", "gdp", "temperature mapping", "ammonia"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "nutraceuticals-dietary",
        title: "Nutraceuticals & Health Supplements",
        slug: "nutraceuticals-dietary",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "Nutraceutical Regulations & Labeling Audits",
        overview: "Nutraceutical manufacturers navigate FSSAI Nutraceutical Regulations, permissible ingredient limits (RDA benchmarks), banned sports substance screenings, health claim substantiations, and GMP standards.",
        icon: Pill,
        iconName: "Pill",
        displayOrder: 6,
        regulations: [
          "FSSAI (Health Supplements, Nutraceuticals, Food for Special Dietary Use) Regulations, 2022",
          "Legal Metrology (Packaged Commodities) Rules, 2011",
          "Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954",
          "Consumer Protection Act (E-Commerce) Rules, 2020"
        ],
        focusAreas: [
          "Recommended Dietary Allowance (RDA 2020) formula limit adherence",
          "Clinical substantiation dossiers for product health claims",
          "Heavy metal, microbiological, and pesticide residue batch testing",
          "Online marketplace product listing and labeling disclosure compliance"
        ],
        businessSegments: [
          {
            name: "Global Nutrition & Supplement Brands",
            description: "Multinational wellness corporations marketing vitamins, protein powders, and functional foods.",
            relevantIndustryRisks: ["Misleading health claim penalties by CCPA", "FSSAI unapproved ingredient notices", "Counterfeiting on digital marketplaces"],
            applicableGrcConsiderations: ["Comprehensive health claim validation reviews", "FSSAI non-specified food approval tracking", "Online anti-counterfeiting governance"]
          },
          {
            name: "Large–Mid Contract Supplement Manufacturers (CDMOs)",
            description: "Specialized formulation plants manufacturing capsules, gummies, and powders for third-party brands.",
            relevantIndustryRisks: ["Batch contamination and cross-allergen issues", "FSSAI Schedule 4 GMP inspection flags", "Contractual liability for label inaccuracies"],
            applicableGrcConsiderations: ["GMP and HACCP certified cleanroom audits", "Allergen control and clean-in-place (CIP) logs", "Finished product batch release protocols"]
          },
          {
            name: "Mid–Small Direct-to-Consumer (D2C) Wellness Startups",
            description: "Digital-first brands selling herbal teas, collagen gummies, and Ayurvedic wellness supplements.",
            relevantIndustryRisks: ["Social media influencer misleading endorsement fines", "Mandatory nutritional table omission notices", "Customer allergy complaints"],
            applicableGrcConsiderations: ["ASCI influencer marketing guidelines compliance", "Legal metrology label audits", "Customer grievance and return policies"]
          }
        ],
        relevantGrcTopics: [
          "FSSAI nutraceutical regulations",
          "RDA ingredient limit compliance",
          "Health claim substantiation",
          "Allergen control & GMP audits"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "FSSAI formulation approvals, label compliance, and advertising clearance."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "CDMO contract compliance, batch manufacturing record audits, and QA checks."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#nutraceuticals",
        searchKeywords: ["nutraceuticals", "supplements", "fssai", "rda", "gummies", "whey protein", "health claims"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "organic-agri-processing",
        title: "Organic Foods & Agri-Commodities",
        slug: "organic-agri-processing",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "APEDA Certification & Organic SOPs",
        overview: "Agri-processors and organic exporters manage APEDA NPOP organic certifications, Jaivik Bharat compliance, Spices Board sampling norms, mandi market fees, and warehouse commodity testing.",
        icon: Leaf,
        iconName: "Leaf",
        displayOrder: 7,
        regulations: [
          "National Programme for Organic Production (NPOP) - APEDA",
          "FSSAI (Organic Foods) Regulations, 2017 (Jaivik Bharat)",
          "Spices Board (Quality Evaluation System) Regulations",
          "Warehousing (Development and Regulation) Act, 2007 (WDRA)"
        ],
        focusAreas: [
          "Farmer cluster internal control systems (ICS) and farm inspection trails",
          "NPOP third-party certification audits and Jaivik Bharat logo usage",
          "Ethylene oxide (EtO) and aflatoxin testing protocols for export consignments",
          "WDRA accredited warehouse negotiable warehouse receipt (e-NWR) audits"
        ],
        businessSegments: [
          {
            name: "Global Agri-Commodity Exporters",
            description: "Multinational agricultural trading houses exporting certified organic spices, tea, and grains.",
            relevantIndustryRisks: ["Export consignment rejection at EU/US ports", "NPOP certification suspension", "Traceability gap findings in ICS farmer groups"],
            applicableGrcConsiderations: ["Comprehensive farm-to-shipment traceability audits", "APEDA Tracenet portal reconciliations", "Multi-residue pesticide laboratory screening"]
          },
          {
            name: "Large–Mid Food Processing Mills",
            description: "Rice mills, flour mills, pulse processing units, and edible oil extraction plants.",
            relevantIndustryRisks: ["FSSAI solvent residue exceedances in oils", "Mandi cess payment dispute assessments", "Air pollution dust notices from state PCB"],
            applicableGrcConsiderations: ["Solvent extraction safety compliance", "Mandi market statutory registers", "Dust extraction environmental compliance"]
          },
          {
            name: "Mid–Small Organic Farmer Producer Organizations (FPOs)",
            description: "Farmer producer companies aggregating organic honey, millets, and pulses.",
            relevantIndustryRisks: ["Incomplete ICS documentation causing cert loss", "Packaging labeling mistakes under Legal Metrology", "Working capital loan covenant breaches"],
            applicableGrcConsiderations: ["Farmer group ICS register training", "FSSAI basic registration assistance", "Statutory ROC annual secretarial compliance"]
          }
        ],
        relevantGrcTopics: [
          "NPOP organic certification",
          "Jaivik Bharat logo compliance",
          "APEDA Tracenet traceability",
          "Pesticide & aflatoxin testing"
        ],
        linkedOfferings: [
          {
            serviceId: "supply-chain-compliance",
            serviceName: "Supply Chain & Logistics Compliance",
            route: "/services/supply-chain-compliance",
            relevance: "Farmer group traceability audits, organic certification checks, and supplier verification."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "APEDA registrations, Spices Board clearances, and FSSAI organic compliance."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#organic-agri",
        searchKeywords: ["organic", "apeda", "npop", "jaivik bharat", "spices", "fpo", "agri processing"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "commercial-catering-qsr",
        title: "Commercial Catering & QSR Kitchens",
        slug: "commercial-catering-qsr",
        parentClusterId: "food-processing-pharma-healthcare",
        parentClusterName: "Food Processing, Pharma & Healthcare",
        subtitle: "Central Kitchen Hygiene & FSSAI Licensure",
        overview: "Centralized commercial food providers handle FSSAI Food Safety Supervisor mandates, grease trap and wastewater norms, pest control logs, cold holding temperatures, and food allergen disclosures.",
        icon: ChefHat,
        iconName: "ChefHat",
        displayOrder: 8,
        regulations: [
          "FSSAI (Licensing and Registration of Food Businesses) Regulations, 2011",
          "State Municipal Corporation Public Health By-Laws",
          "Legal Metrology (Packaged Commodities) Rules, 2011",
          "Water & Air Pollution Acts (Grease Trap & Kitchen Exhaust Norms)"
        ],
        focusAreas: [
          "Central commissary HACCP and hygiene rating scheme audits",
          "Kitchen grease trap maintenance and biological wastewater compliance",
          "Cooked food temperature holding logs and blast chilling records",
          "Menu labeling for caloric value, allergens, and nutritional facts"
        ],
        businessSegments: [
          {
            name: "Global QSR & Master Franchisees",
            description: "International fast-food brands and master franchise operators with national store footprints.",
            relevantIndustryRisks: ["Viral food poisoning outbreak liabilities", "Menu labeling non-compliance penalties", "Franchisee food hygiene divergence"],
            applicableGrcConsiderations: ["Third-party store food hygiene mystery audits", "Centralized FSSAI multi-unit license governance", "Menu nutritional validation"]
          },
          {
            name: "Large–Mid Corporate Catering & Cloud Kitchens",
            description: "Institutional dining providers servicing IT tech parks, factories, and dark kitchen networks.",
            relevantIndustryRisks: ["Large-scale food contamination incidents", "Municipal health trade license delays", "Exhaust duct fire safety lapses"],
            applicableGrcConsiderations: ["Central kitchen HACCP implementation", "Fire safety suppression system audits", "Food handler medical fitness certificates"]
          },
          {
            name: "Mid–Small Local Caterers & Independent Eateries",
            description: "Localized banquet caterers, event food contractors, and standalone bakeries.",
            relevantIndustryRisks: ["Unregistered kitchen operation notices", "Expired raw material citations", "Casual labour wage statutory issues"],
            applicableGrcConsiderations: ["FSSAI state license registration", "Clean water potability testing logs", "Labour wage register maintenance"]
          }
        ],
        relevantGrcTopics: [
          "FSSAI hygiene rating scheme",
          "Central commissary HACCP",
          "Grease trap effluent compliance",
          "Food handler medical fitness"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "FSSAI state/central licensing, municipal health trade permits, and fire NOCs."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "Central kitchen hygiene audits, food wastage tracking, and vendor verification."
          }
        ],
        existingRoute: "/industries/food-processing-pharma-healthcare#catering-qsr",
        searchKeywords: ["catering", "qsr", "cloud kitchen", "haccp", "fssai hygiene", "grease trap", "commissary"],
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
      },
      {
        id: "luxury-gems-jewellery",
        title: "Gems, Jewellery & Luxury Retail",
        slug: "luxury-gems-jewellery",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "BIS Hallmarking & AML/CFT Due Diligence",
        overview: "Jewellery retailers and bullion dealers comply with mandatory BIS hallmarking, PMLA reporting for precious metals, Cash transaction limits (Section 269ST), conflict-free diamond Kimberly Process certifications, and showroom physical security.",
        icon: Coins,
        iconName: "Coins",
        displayOrder: 4,
        regulations: [
          "Bureau of Indian Standards (BIS) Mandatory Hallmarking Regulations",
          "Prevention of Money Laundering Act (PMLA) for Gems and Jewellery",
          "Income Tax Act, 1961 (Section 269ST Cash Transaction Limits)",
          "Kimberley Process Certification Scheme (KPCS)"
        ],
        focusAreas: [
          "BIS Hallmarking Unique Identification (HUID) laser registration and tracking",
          "PMLA high-value customer KYC thresholds and Cash Transaction Reports (CTR)",
          "Section 269ST cash acceptance monitoring and PAN card verification",
          "Physical vault security, armed guard licenses, and transit insurance warranties"
        ],
        businessSegments: [
          {
            name: "Global Luxury & Diamond Conglomerates",
            description: "Multinational fine jewellery houses and diamond cutters with international retail boutiques.",
            relevantIndustryRisks: ["Cross-border conflict diamond tracking violations", "Customs duty valuation disputes on imported gemstones", "FIU-IND non-reporting show cause notices"],
            applicableGrcConsiderations: ["Comprehensive Kimberley Process audit trails", "Automated FIU-IND compliance reporting", "Global supply chain ethical sourcing audits"]
          },
          {
            name: "Large–Mid National Jewellery Showroom Chains",
            description: "Listed and organized Indian jewellery retailers with extensive multi-city showroom networks.",
            relevantIndustryRisks: ["Store-level HUID hallmarking inventory discrepancies", "Cash sale limit violations during festive rushes", "Transit heist and insurance non-admissibility"],
            applicableGrcConsiderations: ["Centralized HUID ERP inventory integration", "Automated POS cash transaction controls", "Showroom security and vault standard audits"]
          },
          {
            name: "Mid–Small Standalone Jewellers & Goldsmiths",
            description: "Family-owned traditional jewellery stores, bullion brokers, and localized artisans.",
            relevantIndustryRisks: ["Unregistered artisan subcontracting risks", "BIS hallmarking spot-check penalties", "PAN collection record lapses"],
            applicableGrcConsiderations: ["BIS license registration and renewal", "Standardized customer KYC forms", "Basic fire and police NOC verifications"]
          }
        ],
        relevantGrcTopics: [
          "BIS HUID hallmarking compliance",
          "PMLA precious metals KYC",
          "Section 269ST cash limit controls",
          "Kimberley Process certification"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "BIS hallmarking licensing, PMLA reporting to FIU-IND, and tax compliance."
          },
          {
            serviceId: "internal-audit",
            serviceName: "Internal Audit & Risk Controls",
            route: "/services/internal-audit",
            relevance: "Showroom gold inventory reconciliation, POS cash audit, and vault security."
          }
        ],
        existingRoute: "/industries/consumer-retail#jewellery",
        searchKeywords: ["jewellery", "gems", "huid", "hallmarking", "pmla", "fiu", "diamonds", "gold"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "consumer-durables-electronics",
        title: "Consumer Durables & Electronics",
        slug: "consumer-durables-electronics",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "BEE Star Labeling & E-Waste EPR",
        overview: "Consumer durable manufacturers and retailers adhere to BEE Star Labeling energy efficiency norms, E-Waste Management EPR targets, BIS CRS safety registrations, and consumer warranty redressal rules.",
        icon: Settings,
        iconName: "Settings",
        displayOrder: 5,
        regulations: [
          "Bureau of Energy Efficiency (BEE) Star Rating Regulations",
          "E-Waste (Management) Rules, 2022 (EPR Portals)",
          "Bureau of Indian Standards Compulsory Registration Scheme (CRS)",
          "Consumer Protection (Jurisdiction of the Commissions) Rules"
        ],
        focusAreas: [
          "BEE energy rating label accuracy and periodic star rating upgrade compliance",
          "E-waste recycling target fulfillment and CPCB EPR credit procurement",
          "BIS CRS testing reports for imported and domestic electronic components",
          "Warranty policy clarity, spare parts availability periods, and CCPA right-to-repair"
        ],
        businessSegments: [
          {
            name: "Global Electronics & White Goods OEMs",
            description: "Multinational appliance brands manufacturing refrigerators, ACs, and televisions.",
            relevantIndustryRisks: ["CPCB heavy fines for EPR e-waste shortfall", "BEE star rating downgrades during check-testing", "BIS CRS non-registration port customs blockages"],
            applicableGrcConsiderations: ["BEE test laboratory audit governance", "E-waste EPR portal reconciliation", "Customs electronics conformity documentation"]
          },
          {
            name: "Large–Mid Electronics Retail Superstores",
            description: "Omnichannel electronics retailers operating multi-brand electronics hypermarkets.",
            relevantIndustryRisks: ["Selling older non-compliant BEE star inventory", "Consumer court claims on defective products and service delays", "Extended warranty mis-selling allegations"],
            applicableGrcConsiderations: ["Store inventory BEE rating expiry filters", "Consumer dispute grievance redressal framework", "Standardized warranty terms"]
          },
          {
            name: "Mid–Small Regional Dealers & Service Centers",
            description: "Authorized appliance repair franchises, spare parts distributors, and regional dealerships.",
            relevantIndustryRisks: ["Improper disposal of hazardous refrigerant gases (ODS/HFCs)", "Unauthorized duplicate spare parts liabilities", "Labour overtime in repair centers"],
            applicableGrcConsiderations: ["Ozone Depleting Substances (ODS) refrigerant handling logs", "Authorized genuine spare part audit trails", "Contract technician labour compliance"]
          }
        ],
        relevantGrcTopics: [
          "BEE Star Labeling regulations",
          "CPCB E-Waste EPR targets",
          "BIS CRS electronics testing",
          "Right to repair & warranty compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "E-waste EPR credit management, CPCB portal reporting, and hazardous materials."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "BEE registration, BIS CRS approvals, and Legal Metrology packaging compliance."
          }
        ],
        existingRoute: "/industries/consumer-retail#consumer-durables",
        searchKeywords: ["consumer durables", "appliances", "bee star", "e-waste", "epr", "bis crs", "electronics"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "quick-commerce-darkstores",
        title: "Quick Commerce & Hyperlocal Delivery",
        slug: "quick-commerce-darkstores",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Dark Store Safety & Gig Workforce Compliance",
        overview: "Quick commerce operators must comply with municipal dark store zoning rules, gig worker social security code provisions, rider traffic safety standards, FSSAI dark store food registrations, and DPDP customer location privacy.",
        icon: ShoppingCart,
        iconName: "ShoppingCart",
        displayOrder: 6,
        regulations: [
          "Code on Social Security, 2020 (Gig and Platform Workers Provisions)",
          "Motor Vehicles Act and State Aggregator Guidelines",
          "FSSAI Food Safety Licensing for Dark Stores & Fulfillment Hubs",
          "Digital Personal Data Protection Act, 2023 (Customer Location & Phone Masking)"
        ],
        focusAreas: [
          "Dark store commercial zoning, noise abatement, and municipal trade permits",
          "Gig worker accident insurance, helmet compliance, and resting facilities",
          "Perishable inventory shelf-life expiry tracking and rapid cold storage",
          "Customer phone number masking and delivery address redaction protocols"
        ],
        businessSegments: [
          {
            name: "Pan-India Quick Commerce Platforms",
            description: "High-volume delivery platforms operating thousands of urban dark store nodes.",
            relevantIndustryRisks: ["Municipal sealing of residential-zone dark stores", "Rider accident liabilities and regulatory speed caps", "Aggregator license withholding by state transport departments"],
            applicableGrcConsiderations: ["Centralized dark store licensing trackers", "Rider safety telemetry and dynamic route speed limits", "Gig worker social security fund contributions"]
          },
          {
            name: "Large–Mid Hyperlocal Fleet & Logistics Partners",
            description: "3PL electric two-wheeler delivery fleets and logistics staffing agencies serving e-grocery.",
            relevantIndustryRisks: ["EV battery fire incidents in charging hubs", "Unregistered contract rider wage disputes", "High rider attrition leading to background check omissions"],
            applicableGrcConsiderations: ["EV charging facility fire and electrical safety audits", "Automated digital rider background verification", "Statutory accident insurance records"]
          },
          {
            name: "Mid–Small Local Grocery Express Operators",
            description: "Neighborhood supermarket express delivery units and localized delivery startups.",
            relevantIndustryRisks: ["Expired packaged goods delivery complaints", "Local police notices on delivery van street blockages", "Cash-on-delivery pilferage"],
            applicableGrcConsiderations: ["Dark store daily expiry checklist audits", "Local trade license registrations", "Rider cash reconciliation controls"]
          }
        ],
        relevantGrcTopics: [
          "Gig worker social security compliance",
          "Dark store municipal trade licensing",
          "Customer location data privacy",
          "Rider road safety & insurance"
        ],
        linkedOfferings: [
          {
            serviceId: "managed-staffing-risk-shield",
            serviceName: "Managed Staffing Risk Shield",
            route: "/services/managed-staffing-risk-shield",
            relevance: "Gig delivery rider compliance, accident insurance, and aggregator safety."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Phone number masking, delivery geolocation privacy, and app user consents."
          }
        ],
        existingRoute: "/industries/consumer-retail#quick-commerce",
        searchKeywords: ["quick commerce", "dark stores", "hyperlocal", "gig workers", "delivery", "fssai", "10 minute delivery"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "fmcg-personal-care",
        title: "FMCG & Personal Care Cosmetics",
        slug: "fmcg-personal-care",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Drugs & Cosmetics Act Compliance",
        overview: "Cosmetic and personal care manufacturers comply with CDSCO Cosmetics Rules, heavy metal testing for formulations, microplastic bans, Legal Metrology packaging declarations, and plastic EPR targets.",
        icon: Package,
        iconName: "Package",
        displayOrder: 7,
        regulations: [
          "Cosmetics Rules, 2020 under Drugs and Cosmetics Act, 1940",
          "Bureau of Indian Standards IS 4707 (Dyes and Colorants in Cosmetics)",
          "Plastic Waste Management Rules, 2016 (EPR Obligations)",
          "Legal Metrology (Packaged Commodities) Rules, 2011"
        ],
        focusAreas: [
          "CDSCO cosmetic manufacturing license and import registration (Form COS-2)",
          "Banned ingredient screening (heavy metals, arsenic, lead) and microbiological testing",
          "Consumer packaging font sizes, batch numbering, and country of origin disclosures",
          "Rigid and flexible plastic EPR registration and recycling certificate submission"
        ],
        businessSegments: [
          {
            name: "Global FMCG & Beauty Multinationals",
            description: "Multinational personal care leaders marketing international cosmetic and skincare brands.",
            relevantIndustryRisks: ["Import registration certificate (COS-2) expiration delays", "ASCI penalties for unsubstantiated cosmetic efficacy claims", "CPCB plastic EPR multi-crore default notices"],
            applicableGrcConsiderations: ["Centralized CDSCO cosmetic import portals", "Clinical efficacy dossier verification", "Enterprise plastic packaging circularity tracking"]
          },
          {
            name: "Large–Mid Contract Cosmetics Manufacturers (OEM/ODM)",
            description: "Third-party private label manufacturers producing soaps, shampoos, serums, and fragrances.",
            relevantIndustryRisks: ["State FDA cosmetic license inspection flags", "Cross-contamination in multi-brand filling lines", "Raw material certificate-of-analysis (CoA) errors"],
            applicableGrcConsiderations: ["Good Manufacturing Practices (GMP) cosmetic audits", "Raw material batch testing verification", "Cleanroom air particulate monitoring"]
          },
          {
            name: "Mid–Small D2C Organic Beauty Brands",
            description: "Clean beauty startups selling sulfate-free, cruelty-free, and vegan personal care products.",
            relevantIndustryRisks: ["Mislabeled 'organic' claims without AYUSH or NPOP certification", "Customer contact dermatitis allergy complaints", "Inadequate tamper-evident packaging"],
            applicableGrcConsiderations: ["Label claim legal verification", "Cosmetic stability and patch test documentation", "Customer complaint adverse event registers"]
          }
        ],
        relevantGrcTopics: [
          "CDSCO Cosmetics Rules, 2020",
          "IS 4707 permissible colorants",
          "Plastic waste EPR obligations",
          "Packaged commodity label compliance"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "CDSCO cosmetic licenses, state FDA approvals, and packaging legal metrology."
          },
          {
            serviceId: "environmental-compliance",
            serviceName: "Environmental Compliance",
            route: "/services/environmental-compliance",
            relevance: "Plastic packaging EPR credits, effluent treatment, and CPCB annual filings."
          }
        ],
        existingRoute: "/industries/consumer-retail#fmcg-cosmetics",
        searchKeywords: ["fmcg", "cosmetics", "personal care", "cdsco", "epr", "skincare", "beauty", "legal metrology"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "agri-inputs-rural-retail",
        title: "Agri-Inputs & Rural Distribution",
        slug: "agri-inputs-rural-retail",
        parentClusterId: "consumer-retail",
        parentClusterName: "Consumer & Retail",
        subtitle: "Insecticides Act & Seed License Governance",
        overview: "Agri-input distributors and rural retail hubs operate under the Fertilizer Control Order (FCO), Insecticides Act, Seeds Act, DBT subsidy reconciliations, and hazardous warehouse safety norms.",
        icon: Tractor,
        iconName: "Tractor",
        displayOrder: 8,
        regulations: [
          "Fertilizer (Inorganic, Organic or Mixed) (Control) Order, 1985 (FCO)",
          "Insecticides Act, 1968 and Insecticides Rules, 1971",
          "Seeds Act, 1966 and Seeds (Control) Order, 1983",
          "Direct Benefit Transfer (DBT) in Fertilizers Guidelines"
        ],
        focusAreas: [
          "Department of Fertilizers POS machine biometric transaction reconciliation",
          "Retail insecticide storage license renewals and dealer display boards",
          "Seed germination lot testing and truth-in-labeling compliance",
          "Spill containment, ventilation, and fire safety in rural agrochemical warehouses"
        ],
        businessSegments: [
          {
            name: "Global Crop Science & Fertilizer Corporations",
            description: "Multinational agrochemical manufacturers selling patented crop protection and hybrid seeds.",
            relevantIndustryRisks: ["Counterfeit seed/chemical proliferation harming brand reputation", "DBT subsidy payment audit delays by government", "Central Insecticides Board registration delays"],
            applicableGrcConsiderations: ["Digital anti-counterfeit QR code traceability", "Automated DBT subsidy reconciliation portals", "CIB&RC statutory registration governance"]
          },
          {
            name: "Large–Mid Regional Agri-Input Dealer Networks",
            description: "Wholesale seed and chemical distributors managing thousands of rural dealer touchpoints.",
            relevantIndustryRisks: ["Dealer POS non-authentication of farmers", "Stock expiry and unsellable chemical disposal liabilities", "State agriculture department quality sampling seizures"],
            applicableGrcConsiderations: ["Dealer network statutory compliance monitoring", "Pesticide disposal manifest management", "Legal defense for sample test variance"]
          },
          {
            name: "Mid–Small Rural Retail Outlets & Krishi Kendras",
            description: "Panchayat-level agrochemical shops and localized agri-service centers.",
            relevantIndustryRisks: ["Selling expired pesticide batches", "Missing FCO retail sale licenses", "Storage of chemicals next to cattle feed"],
            applicableGrcConsiderations: ["Local agriculture officer license renewals", "Safe chemical segregation SOPs", "Basic GST and cash book maintenance"]
          }
        ],
        relevantGrcTopics: [
          "Fertilizer Control Order (FCO)",
          "Insecticides Act & CIB&RC licensing",
          "DBT fertilizer subsidy reconciliation",
          "Seed quality & truth-in-labeling"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "Insecticide retail/wholesale licensing, FCO compliance, and seed registrations."
          },
          {
            serviceId: "supply-chain-compliance",
            serviceName: "Supply Chain & Logistics Compliance",
            route: "/services/supply-chain-compliance",
            relevance: "Rural dealer POS audits, warehouse chemical safety, and anti-counterfeiting."
          }
        ],
        existingRoute: "/industries/consumer-retail#agri-inputs",
        searchKeywords: ["agri inputs", "fertilizers", "fco", "insecticides", "seeds", "dbt", "rural retail", "krishi"],
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
      },
      {
        id: "aviation-airports",
        title: "Aviation, Airlines & Airport Hubs",
        slug: "aviation-airports",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "DGCA Safety Standards & Airport EHS",
        overview: "Aviation operators comply with DGCA civil aviation requirements (CAR), BCAS aviation security mandates, airport environmental noise/emissions standards, passenger charter rights, and dangerous goods handling protocols.",
        icon: Plane,
        iconName: "Plane",
        displayOrder: 4,
        regulations: [
          "Directorate General of Civil Aviation (DGCA) Civil Aviation Requirements (CAR)",
          "Bureau of Civil Aviation Security (BCAS) Security Circulars",
          "Aircraft Act, 1934 and Aircraft Rules, 1937",
          "MoEFCC Airport Environmental Noise & Emissions Norms"
        ],
        focusAreas: [
          "DGCA flight safety management systems (SMS) and pilot/crew duty time limits (FDTL)",
          "BCAS airport perimeter security, passenger frisking, and airside pass governance",
          "Aviation turbine fuel (ATF) handling and aircraft maintenance (MRO) safety logs",
          "Passenger charter refund compliance and baggage loss compensation workflows"
        ],
        businessSegments: [
          {
            name: "Global Airlines & International Hub Airports",
            description: "Multinational commercial airlines and international hub airport operators.",
            relevantIndustryRisks: ["Cross-border ICAO safety audit observations", "Ground collision and airside ramp safety penalties", "Aviation emissions carbon offsetting (CORSIA) mandates"],
            applicableGrcConsiderations: ["Enterprise aviation safety management (SMS)", "Continuous BCAS and IATA security compliance", "CORSIA carbon emissions verification"]
          },
          {
            name: "Large–Mid Ground Handling & Airport MRO Operators",
            description: "Dedicated airport ground handlers, air cargo terminals, and aircraft line maintenance centers.",
            relevantIndustryRisks: ["Dangerous goods handling (DGR) infractions", "Airside apron driving license non-compliances", "Contract baggage handler labour law disputes"],
            applicableGrcConsiderations: ["Airside safety protocol auditing", "Contract labour statutory wage compliance", "Dangerous goods regulation (DGR) training logs"]
          },
          {
            name: "Mid–Small Regional Charter & Flying Clubs",
            description: "Helicopter operators, pilot training academies, and non-scheduled operator permit (NSOP) holders.",
            relevantIndustryRisks: ["Airworthiness certificate renewal lapses", "Pilot flight logbook discrepancies", "Local airstrip emergency preparedness gaps"],
            applicableGrcConsiderations: ["DGCA NSOP compliance registers", "Pilot medical certificate tracking", "Aviation fuel storage safety inspections"]
          }
        ],
        relevantGrcTopics: [
          "DGCA CAR regulations & FDTL",
          "BCAS aviation security compliance",
          "Airport airside safety management",
          "Dangerous goods handling (DGR)"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "DGCA approvals, BCAS security clearances, and aviation passenger charter compliance."
          },
          {
            serviceId: "enterprise-risk-management",
            serviceName: "Enterprise Risk Management",
            route: "/services/enterprise-risk-management",
            relevance: "Airside safety risk registers, aviation crisis management, and emergency response drills."
          }
        ],
        existingRoute: "/industries/media-services#aviation",
        searchKeywords: ["aviation", "airlines", "dgca", "bcas", "airports", "mro", "ground handling", "fdtl"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "broadcasting-cable-tv",
        title: "Television Broadcasting & Cable Networks",
        slug: "broadcasting-cable-tv",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "Broadcasting Code & Telecom Regulations",
        overview: "Linear broadcasting and distribution companies comply with TRAI Interconnection Regulations, Ministry of Information & Broadcasting uplinking/downlinking guidelines, Programme and Advertising Codes, and subscriber privacy.",
        icon: Tv,
        iconName: "Tv",
        displayOrder: 5,
        regulations: [
          "TRAI Telecommunication (Broadcasting and Cable) Services Interconnection Regulations",
          "MIB Policy Guidelines for Uplinking and Downlinking of TV Channels",
          "Cable Television Networks (Regulation) Act, 1995 & Programme Code",
          "Broadcasting Content Complaints Council (BCCC) Directives"
        ],
        focusAreas: [
          "MIB channel license renewal, teleport security, and annual permission fee payments",
          "Programme Code content advisory, self-regulation, and BCCC complaint redressal",
          "TRAI subscriber management system (SMS) audits and conditional access compliance",
          "Satellite transponder lease agreements and WPC wireless operating licenses"
        ],
        businessSegments: [
          {
            name: "Global Media & Broadcasting Networks",
            description: "Multinational television networks beaming entertainment, news, and sports channels.",
            relevantIndustryRisks: ["MIB show-cause notices for Programme Code breaches", "Transponder spectrum license revocation", "TRAI tariff order litigation"],
            applicableGrcConsiderations: ["24x7 content legal clearance protocols", "MIB uplinking statutory register governance", "Internal grievance redressal council"]
          },
          {
            name: "Large–Mid DTH & Digital Cable Networks (MSOs)",
            description: "Direct-to-home satellite providers and multi-system digital cable distribution operators.",
            relevantIndustryRisks: ["TRAI subscriber reporting audit penalties", "Signal theft and unauthorized local channel insertion", "Customer privacy breaches in subscriber billing"],
            applicableGrcConsiderations: ["Annual TRAI SMS audit preparations", "Digital conditional access system (CAS) security", "Automated billing DPDP compliance"]
          },
          {
            name: "Mid–Small Local Cable Operators (LCOs)",
            description: "Franchised neighborhood cable operators and regional commercial advertising channels.",
            relevantIndustryRisks: ["Postal department cable registration lapses", "Unauthorized local advertisement broadcasts", "Overhead fiber optic cable civic body cutting"],
            applicableGrcConsiderations: ["Local cable operator license renewals", "Civic right-of-way (RoW) adherence", "Copyright royalty payments"]
          }
        ],
        relevantGrcTopics: [
          "MIB uplinking/downlinking guidelines",
          "Programme and Advertising Codes",
          "TRAI interconnection & SMS audits",
          "BCCC content grievance redressal"
        ],
        linkedOfferings: [
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "MIB television channel permissions, WPC wireless licenses, and TRAI filings."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Subscriber billing data privacy, consent management, and customer data security."
          }
        ],
        existingRoute: "/industries/media-services#broadcasting",
        searchKeywords: ["broadcasting", "television", "trai", "mib", "dth", "cable tv", "programme code"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "sports-stadiums-events",
        title: "Sports Leagues, Arenas & Large Events",
        slug: "sports-stadiums-events",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "Mass Gathering Safety & Fire NOC Protocols",
        overview: "Large-scale event and venue organizers adhere to police crowd control guidelines, municipal fire safety licenses, anti-doping regulations (NADA/WADA), performer labour laws, and public liability insurance requirements.",
        icon: Film,
        iconName: "Film",
        displayOrder: 6,
        regulations: [
          "State Police Public Entertainment & Performance Licensing Rules",
          "National Disaster Management Authority (NDMA) Crowd Management Guidelines",
          "National Anti-Doping Act, 2022 (NADA Guidelines)",
          "Public Liability Insurance Act, 1991 & Municipal Fire Codes"
        ],
        focusAreas: [
          "Stadium maximum occupancy calculations, emergency evacuation, and turnstile crowd flow",
          "Fire safety NOC, temporary structure structural stability, and electrical safety certificates",
          "Athlete anti-doping whereabouts tracking, TUE approvals, and integrity monitoring",
          "Event security contractor background screening and police permission compliances"
        ],
        businessSegments: [
          {
            name: "Global Sports Franchises & Tournament Promoters",
            description: "International cricket, football, and motorsport promoters managing multi-city leagues.",
            relevantIndustryRisks: ["Event cancellation and catastrophic crowd surge liabilities", "NADA athlete sanction litigation", "Cross-border broadcasting broadcast rights piracy"],
            applicableGrcConsiderations: ["NDMA crowd safety risk modeling", "Athlete health and anti-doping integrity protocols", "Event cancellation insurance warranty tracking"]
          },
          {
            name: "Large–Mid Arena & Convention Center Operators",
            description: "Multi-purpose indoor arenas, exhibition grounds, and corporate convention centres.",
            relevantIndustryRisks: ["Structural stability certificate delays", "Municipal sound decibel level violation fines", "Food poisoning in stadium concessions"],
            applicableGrcConsiderations: ["Periodic building and fire safety audits", "Concessionaire FSSAI hygiene audits", "Sound pollution monitoring logs"]
          },
          {
            name: "Mid–Small Event Management & Production Agencies",
            description: "Live music promoters, cultural festivals, wedding planners, and corporate conclave organizers.",
            relevantIndustryRisks: ["Last-minute police permission revocations", "Rigging and stage collapse accidents", "Casual event crew labour wage disputes"],
            applicableGrcConsiderations: ["Single-window municipal event licensing", "Rigging and scaffolding safety checks", "Event crew accident coverage"]
          }
        ],
        relevantGrcTopics: [
          "NDMA crowd management guidelines",
          "Stadium fire safety & structural stability",
          "NADA sports anti-doping compliance",
          "Event licensing & public liability"
        ],
        linkedOfferings: [
          {
            serviceId: "enterprise-risk-management",
            serviceName: "Enterprise Risk Management",
            route: "/services/enterprise-risk-management",
            relevance: "Crowd risk assessments, crisis management protocols, and venue safety audits."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "Police permissions, fire NOCs, amusement licenses, and copyright performance permits."
          }
        ],
        existingRoute: "/industries/media-services#sports-events",
        searchKeywords: ["sports", "stadium", "events", "crowd management", "nada", "concerts", "festivals"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "professional-advisory-services",
        title: "Professional & Corporate Advisory",
        slug: "professional-advisory-services",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "MCA Secretarial Standards & ICAI Rules",
        overview: "Professional services partnerships navigate ICAI/ICSI ethical standards, Bar Council regulations, client data confidentiality, professional indemnity liabilities, and statutory multi-partner firm disclosures.",
        icon: Building,
        iconName: "Building",
        displayOrder: 7,
        regulations: [
          "Institute of Chartered Accountants of India (ICAI) Code of Ethics",
          "Advocates Act, 1961 and Bar Council of India Rules",
          "Companies (Registered Valuers and Valuation) Rules, 2017",
          "Digital Personal Data Protection Act, 2023 (Confidential Client Files)"
        ],
        focusAreas: [
          "Conflict-of-interest checks and employee investment pre-clearance tracking",
          "Audit workpaper retention policies, SQC-1 quality control, and peer review readiness",
          "Confidential client M&A data encryption and restricted access controls",
          "Professional indemnity insurance adequacy and limitation-of-liability contracting"
        ],
        businessSegments: [
          {
            name: "Global Professional Services Networks",
            description: "Multinational accounting, consulting, and legal networks operating Indian member firms.",
            relevantIndustryRisks: ["NFRA regulatory scrutiny and inspection orders", "Cross-border brand fee transfer pricing litigation", "Insider trading leaks regarding listed clients"],
            applicableGrcConsiderations: ["NFRA audit quality framework alignment", "Automated firm-wide independence tracking", "ISO 27001 client data security"]
          },
          {
            name: "Large–Mid Corporate Law & Advisory Firms",
            description: "Full-service corporate law firms, chartered accountant partnerships, and tax advisory practices.",
            relevantIndustryRisks: ["Bar Council restrictions on advertising and firm websites", "Professional liability claims on transactional opinions", "PoSH compliance in high-stress consulting environments"],
            applicableGrcConsiderations: ["Bar Council website compliance reviews", "Standardized engagement letter risk terms", "PoSH committee governance and training"]
          },
          {
            name: "Mid–Small Regional Audit & Secretarial Practices",
            description: "Independent CA firms, practicing company secretaries, and registered valuer entities.",
            relevantIndustryRisks: ["ICAI peer review qualification remarks", "UDIN generation deadline lapses", "Digital signature token (DSC) custody misuse"],
            applicableGrcConsiderations: ["ICAI SQC-1 quality standard manuals", "UDIN tracking registers", "Secure digital signature policies"]
          }
        ],
        relevantGrcTopics: [
          "NFRA & ICAI Code of Ethics",
          "Independence & conflict of interest",
          "Client confidential data protection",
          "Professional indemnity governance"
        ],
        linkedOfferings: [
          {
            serviceId: "governance-framework",
            serviceName: "Corporate Governance & Secretarial",
            route: "/services/governance-framework",
            relevance: "Partnership agreements, professional disclosures, and secretarial compliance."
          },
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "Confidential client document privacy, non-disclosure compliance, and NDAs."
          }
        ],
        existingRoute: "/industries/media-services#advisory",
        searchKeywords: ["consulting", "law firms", "accounting", "icai", "nfra", "advisory", "audit"],
        verificationStatus: "confirmed",
        publicationStatus: "published"
      },
      {
        id: "digital-advertising-martech",
        title: "Digital Advertising, Media & MarTech",
        slug: "digital-advertising-martech",
        parentClusterId: "media-services",
        parentClusterName: "Media & Services",
        subtitle: "ASCI Advertising Codes & Data Privacy",
        overview: "Advertising agencies and ad-tech firms operate under Advertising Standards Council of India (ASCI) codes, Central Consumer Protection Authority (CCPA) misleading ad guidelines, cookie consent frameworks, and influencer disclosure norms.",
        icon: Wifi,
        iconName: "Wifi",
        displayOrder: 8,
        regulations: [
          "Consumer Protection (Prevention of Misleading Advertisements) Guidelines, 2022",
          "ASCI Code for Self-Regulation in Advertising & Influencer Guidelines",
          "Digital Personal Data Protection Act, 2023 (Ad-Targeting & Behavioral Tracking)",
          "Information Technology (Intermediary Guidelines) Rules, 2021"
        ],
        focusAreas: [
          "CCPA surrogate advertising prohibitions and claim substantiation dossiers",
          "Influencer paid partnership disclosures and ASCI hashtag tagging compliance",
          "Third-party cookie phase-out, user consent collection, and tracking opt-outs",
          "Ad-fraud prevention, brand safety whitelist verification, and invalid traffic filtering"
        ],
        businessSegments: [
          {
            name: "Global Advertising Holding Companies",
            description: "Multinational media buying networks and creative advertising agency holding groups.",
            relevantIndustryRisks: ["CCPA multi-crore misleading advertisement penalties for clients", "Cross-border user profiling privacy investigations", "Programmatic ad placement next to harmful content (brand safety)"],
            applicableGrcConsiderations: ["Comprehensive creative legal clearance review workflows", "Enterprise DPDP behavioral tracking compliance", "Automated brand safety verification"]
          },
          {
            name: "Large–Mid Influencer & Performance Marketing Agencies",
            description: "Specialized influencer management agencies, affiliate marketing networks, and programmatic buyers.",
            relevantIndustryRisks: ["Influencer undisclosed sponsorship notices", "Dark pattern user interface litigation", "Affiliate network bot traffic and fraud clawbacks"],
            applicableGrcConsiderations: ["Influencer contract disclosure clause audits", "CCPA dark pattern prevention checks", "Affiliate anti-fraud traffic monitoring"]
          },
          {
            name: "Mid–Small Creative Studios & Social Media Boutiques",
            description: "Boutique digital marketing agencies, SEO service providers, and local creative shops.",
            relevantIndustryRisks: ["Copyright infringement for unlicensed stock imagery/music", "Client contract SLA disputes", "Unauthorized user data collection on campaign landing pages"],
            applicableGrcConsiderations: ["Commercial asset licensing verification", "Standardized client campaign contracts", "Landing page privacy policy and cookie notices"]
          }
        ],
        relevantGrcTopics: [
          "CCPA misleading advertisement guidelines",
          "ASCI influencer marketing disclosures",
          "Behavioral ad targeting & DPDP consent",
          "Brand safety & ad-fraud governance"
        ],
        linkedOfferings: [
          {
            serviceId: "data-privacy-dpdp",
            serviceName: "Data Privacy & DPDP",
            route: "/services/data-privacy-dpdp",
            relevance: "MarTech cookie consent architecture, user profiling privacy, and DPDP adherence."
          },
          {
            serviceId: "regulatory-compliance",
            serviceName: "Regulatory Compliance Management",
            route: "/services/regulatory-compliance",
            relevance: "CCPA advertising guidelines, ASCI self-regulation clearance, and consumer protection."
          }
        ],
        existingRoute: "/industries/media-services#martech",
        searchKeywords: ["martech", "advertising", "asci", "influencer", "ccpa", "adtech", "digital marketing"],
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


import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ArrowRight, ShieldCheck, ChevronDown, Search,
  Scale, Building, Factory, Users, ShieldAlert, UserPlus, FileSpreadsheet, Leaf,
  Heart, Coins,
  User, LogOut, CheckCircle2, Zap, Briefcase,
  Shield, Lock, Laptop, TreePine, Droplet, Activity, Cloud,
  Globe, Building2, Store
} from "lucide-react";
import { whomWeServeClusters, getClusterSizeSegments } from "@/data/whom-we-serve-data";
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
        description: "End-to-end statutory compliance tracking and advisory across agencies like RBI, SEBI, TRAI, and CPCB.",
        keyDetails: [
          "100% Audit Readiness: Continuous monitoring of statutory updates.",
          "Automated Registers: Auto-generation of compliance reports.",
          "Penalty Prevention: Zero-lag alerts for upcoming deadlines."
        ],
        link: "/services/regulatory-compliance",
        icon: ShieldCheck
      },
      {
        id: "labour-law",
        title: "Labour & Employment",
        description: "Comprehensive adherence to PF, ESI, Minimum Wages, and Factory Acts across all Indian states.",
        keyDetails: [
          "State-specific Adherence: Covering all 28 states and UTs.",
          "Contractor Audits: Monthly verification of third-party payrolls.",
          "Inspection Support: Dedicated legal representation during audits."
        ],
        link: "/services/labour-law-compliance",
        icon: Users
      },
      {
        id: "taxation-trade",
        title: "Taxation & Trade",
        description: "Direct and indirect tax advisory, transfer pricing, and SEZ regulatory compliance.",
        keyDetails: [
          "GST & TDS Management: Seamless monthly and annual filings.",
          "Customs & SEZ: Strict adherence to export-import regulations.",
          "Transfer Pricing: Arm's length pricing studies and documentation."
        ],
        link: "/services/taxation-trade-compliance",
        icon: Building
      },
      {
        id: "environmental-ehs",
        title: "Environmental & EHS",
        description: "Statutory adherence to pollution control boards, waste management, and workplace safety laws.",
        keyDetails: [
          "Consent Management: CTE and CTO renewals without delays.",
          "Safety Audits: Comprehensive factory and fire safety inspections.",
          "Waste Returns: Timely filing of hazardous and e-waste returns."
        ],
        link: "/services/environmental-ehs",
        icon: Leaf
      },
      {
        id: "supply-chain-compliance",
        title: "Supply Chain Compliance",
        description: "Auditing and securing statutory compliance across your entire vendor and distributor network.",
        keyDetails: [
          "Vendor Verification: Pre-onboarding compliance checks.",
          "Principal Employer Protection: Shielding you from vendor defaults.",
          "Logistics Laws: Adherence to transport and warehouse regulations."
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
        description: "Deploy futuristic ERM frameworks integrating operational telemetry with risk thresholds.",
        keyDetails: [
          "Predictive Indicators: Real-time KRI dashboards for boards.",
          "Standardized Taxonomy: Unified risk language across departments.",
          "Contingency Mapping: Pre-mapped SOPs for immediate mitigation."
        ],
        link: "/services/enterprise-risk-management",
        icon: ShieldAlert
      },
      {
        id: "internal-audit",
        title: "Internal Audit",
        description: "Compliance-integrated internal audit engine validating physical controls and software logic.",
        keyDetails: [
          "Continuous Cycles: Moving from annual to continuous auditing.",
          "Gap Discovery: Proactive identification before regulators inspect.",
          "Action Tracking: Dashboards tracing corrective responses."
        ],
        link: "/services/internal-audit",
        icon: FileSpreadsheet
      },
      {
        id: "vendor-risk",
        title: "Vendor Risk",
        description: "Ongoing third-party due diligence and security questionnaire audits for supply chains.",
        keyDetails: [
          "Supply Chain Transparency: Contract liability tracking.",
          "Health Scores: Automated vendor risk profiling.",
          "Downstream Protection: Preventing exploits from vendor access."
        ],
        link: "/services/vendor-risk-management",
        icon: Building
      },
      {
        id: "financial-risk",
        title: "Financial Risk Advisory",
        description: "Comprehensive assessments of credit, market, and liquidity risks to protect capital structures.",
        keyDetails: [
          "Stress Testing: Scenario analysis against market volatility.",
          "Credit Profiling: Advanced modeling for counterparty risk.",
          "Capital Adequacy: Regulatory compliance with Basel norms."
        ],
        link: "/services/financial-risk",
        icon: Coins
      },
      {
        id: "operational-risk",
        title: "Operational Resilience",
        description: "Identifying vulnerabilities in daily processes and building robust business continuity plans (BCP).",
        keyDetails: [
          "Process Mapping: Identifying single points of failure.",
          "BCP Drills: Simulated testing of disaster recovery protocols.",
          "Loss Data Analysis: Tracking and mitigating historical failures."
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
        description: "Robust corporate governance charters and operational workflows for board accountability.",
        keyDetails: [
          "Board Committees: Structuring audit, CSR, and risk committees.",
          "DoA Matrices: Standardized delegation of authority.",
          "Conflict Prevention: Clear policy orchestration and tracking."
        ],
        link: "/services/governance-framework",
        icon: Building
      },
      {
        id: "hr-policy-governance",
        title: "HR Policy & Governance",
        description: "Workplace compliance, PoSH framework implementation, and diversity policies.",
        keyDetails: [
          "PoSH Adherence: Mandatory committee setups and training.",
          "Diversity & Inclusion: Benchmarking against global norms.",
          "Policy Handbooks: Tailored employee code of conduct drafting."
        ],
        link: "/services/hr-policy-governance",
        icon: Users
      },
      {
        id: "it-governance",
        title: "IT Governance",
        description: "Aligning IT strategies with business objectives while ensuring structural integrity and compliance.",
        keyDetails: [
          "Framework Alignment: Adherence to COBIT and ITIL standards.",
          "Resource Optimization: Auditing software and hardware lifecycles.",
          "Strategic Steering: Board-level IT investment advisory."
        ],
        link: "/services/it-governance",
        icon: Laptop
      },
      {
        id: "board-advisory",
        title: "Board Advisory Services",
        description: "Expert counsel for independent directors to navigate complex regulatory and fiduciary duties.",
        keyDetails: [
          "Regulatory Briefings: Updates on critical legal amendments.",
          "Performance Evaluation: Assessing board and committee effectiveness.",
          "Ethics Charters: Codifying zero-tolerance anti-bribery policies."
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
        description: "Build and certify custom Information Security Management Systems to protect critical assets.",
        keyDetails: [
          "Certification Readiness: End-to-end support for ISO & SOC 2.",
          "Active Tracking: Continuous risk tracking across networks.",
          "Policy Framework: Robust security policies and procedures."
        ],
        link: "/services/cybersecurity-iso27001",
        icon: Zap
      },
      {
        id: "incident-response",
        title: "Incident Response",
        description: "6-hour response plans, forensic checks, and simulated drills for CERT-In directives.",
        keyDetails: [
          "Emergency Compliance: Meet strict 6-hour CERT-In timelines.",
          "Rapid Isolation: Immediate threat containment protocols.",
          "Forensic Analysis: Deep-dive investigations post-breach."
        ],
        link: "/services/incident-response",
        icon: ShieldAlert
      },
      {
        id: "vapt-testing",
        title: "VAPT & Penetration Testing",
        description: "Simulated ethical hacking to identify and patch vulnerabilities before malicious actors exploit them.",
        keyDetails: [
          "Web & App Security: Deep testing of customer-facing applications.",
          "Network Scans: Identifying weak points in internal infrastructure.",
          "Remediation Support: Step-by-step guidance to patch flaws."
        ],
        link: "/services/vapt-testing",
        icon: Shield
      },
      {
        id: "cloud-security",
        title: "Cloud & Infrastructure Security",
        description: "Securing AWS, Azure, and GCP environments against unauthorized access and data leaks.",
        keyDetails: [
          "Configuration Audits: Detecting misconfigured storage buckets.",
          "Access Management: Enforcing strict IAM and Zero Trust policies.",
          "Continuous Monitoring: 24/7 cloud threat surveillance."
        ],
        link: "/services/cloud-security",
        icon: Cloud
      },
      {
        id: "data-privacy",
        title: "Data Privacy & DPDP",
        description: "Comprehensive audits and consent manager installations to align with India's DPDP Act and GDPR.",
        keyDetails: [
          "Consent Architecture: Secure and verifiable user consent flows.",
          "Data Mapping: Complete lifecycle tracking of personal data.",
          "Breach Readiness: Rapid response plans for patient/client data leaks."
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
        description: "Integrate utilities telemetry to automate environmental reporting and audit waste registers.",
        keyDetails: [
          "BRSR Alignment: Full compliance with SEBI BRSR guidelines.",
          "Carbon Tracking: Automated footprint calculation and offsets.",
          "Audit-Proof Filings: Generating reliable sustainability reports."
        ],
        link: "/services/esg-sustainability",
        icon: Leaf
      },
      {
        id: "carbon-footprint",
        title: "Carbon Footprint & Net Zero",
        description: "Scope 1, 2, and 3 emissions mapping to help your organization achieve net-zero targets.",
        keyDetails: [
          "GHG Accounting: Precise calculation of greenhouse gas emissions.",
          "Reduction Strategies: Actionable roadmaps to lower carbon intensity.",
          "Offset Advisory: Guidance on verified carbon credit markets."
        ],
        link: "/services/carbon-footprint",
        icon: TreePine
      },
      {
        id: "green-audits",
        title: "Green & Energy Audits",
        description: "Comprehensive assessments of facility energy usage, water conservation, and waste management.",
        keyDetails: [
          "Energy Efficiency: Identifying opportunities to lower power costs.",
          "Water Stewardship: Zero liquid discharge (ZLD) planning.",
          "Waste Valuation: Circular economy and recycling integration."
        ],
        link: "/services/green-audits",
        icon: Droplet
      },
      {
        id: "csr-management",
        title: "CSR Strategy & Implementation",
        description: "Designing impactful Corporate Social Responsibility programs that align with brand values and compliance.",
        keyDetails: [
          "Project Vetting: Due diligence on NGO partners and initiatives.",
          "Impact Assessment: Third-party audits of CSR outcomes.",
          "Statutory Reporting: Ensuring adherence to Companies Act CSR rules."
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98dvw] max-w-7xl max-h-[85vh] bg-white border border-slate-200 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Level 1 Sidebar - Divisions */}
                <div className="w-[22%] bg-slate-900 text-white p-6 flex flex-col justify-between border-r border-slate-800">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em] leading-tight">
                        Offerings
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold leading-relaxed">
                        Explore our compliance, security, ESG, and staffing solutions.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
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
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group ${
                            activeOfferTab === offer.id
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                              : "text-slate-350 hover:text-white hover:bg-slate-800/60"
                          }`}
                        >
                          <span>{offer.label}</span>
                          <ArrowRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeOfferTab === offer.id ? "opacity-100" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Pane (Dual Column Layout) */}
                <div className="w-[78%] flex flex-col bg-white min-h-[440px]">
                  
                  {/* Content Area */}
                  <div className="flex flex-1 overflow-hidden">

                    {activeOfferTab === "staffing" ? (
                      /* ── Manpower 2-Panel Layout ── */
                      <>
                        {/* Left: Sector List */}
                        <div className="w-[35%] border-r border-slate-100 p-6 flex flex-col">
                          <div className="mb-4">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Manpower</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {manpowerSectorsData.map((sector) => {
                              const isActive = activeManpowerSector === sector.id;
                              return (
                                <button
                                  key={sector.id}
                                  onMouseEnter={() => setActiveManpowerSector(sector.id)}
                                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group ${
                                    isActive
                                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                                      : "bg-transparent border-slate-100 text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                                  }`}
                                >
                                  <span className="text-xs font-bold tracking-wide">{sector.label}</span>
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
                          return (
                            <div className="w-[65%] p-7 bg-slate-50/50 overflow-y-auto flex flex-col animate-fade-in">
                              {/* Header */}
                              <div className="mb-4">
                                <h3 className="text-base font-black text-slate-900 leading-tight">{sector.label} Workforce Solutions</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{sector.description}</p>
                              </div>

                              {/* 3-Column Grid */}
                              <div className="grid grid-cols-3 gap-3 flex-1">
                                {/* Services */}
                                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                  <h4 className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-3">Services</h4>
                                  <ul className="space-y-1.5">
                                    {sector.services.map((s, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                        <span className="text-[10.5px] font-semibold text-slate-700 leading-snug">{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Coverage */}
                                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                  <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">Coverage</h4>
                                  <ul className="space-y-1.5">
                                    {sector.coverage.map((c, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                                        <span className="text-[10.5px] font-semibold text-slate-700 leading-snug">{c}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Benefits */}
                                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                  <h4 className="text-[9px] font-black text-violet-600 uppercase tracking-widest mb-3">Benefits</h4>
                                  <ul className="space-y-1.5">
                                    {sector.benefits.map((b, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
                                        <span className="text-[10.5px] font-semibold text-slate-700 leading-snug">{b}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* CTA */}
                              <div className="mt-5">
                                <Link
                                  to={sector.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                                >
                                  Explore {sector.label} Solutions <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    ) : (
                      /* ── Standard 3-Column Layout for all other tabs ── */
                      <>
                        {/* Middle Column: Vertical Tabs */}
                        <div className="w-[35%] border-r border-slate-100 p-6 flex flex-col gap-2 overflow-y-auto">
                          {offeringsVerticalTabsData[activeOfferTab]?.items.map((item) => {
                            const IconComp = item.icon;
                            const isActive = activeServiceTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onMouseEnter={() => setActiveServiceTab(item.id)}
                                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                                  isActive 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" 
                                    : "bg-transparent border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                                <span className="text-xs font-bold uppercase tracking-wide flex-1">{item.title}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Right Column: 3-Card Detail Panel */}
                        <div className="w-[65%] p-7 bg-slate-50/50 overflow-y-auto">
                          {(() => {
                            const activeItem = offeringsVerticalTabsData[activeOfferTab]?.items.find(i => i.id === activeServiceTab);
                            if (!activeItem) return null;

                            // Parse "Label: Description" format from keyDetails
                            const parsedDetails = activeItem.keyDetails.map(detail => {
                              const colonIdx = detail.indexOf(": ");
                              return colonIdx !== -1
                                ? { label: detail.substring(0, colonIdx), desc: detail.substring(colonIdx + 2) }
                                : { label: detail, desc: "" };
                            });

                            const cardColors = [
                              { header: "text-blue-600", dot: "bg-blue-400", border: "border-blue-100/60" },
                              { header: "text-emerald-600", dot: "bg-emerald-400", border: "border-emerald-100/60" },
                              { header: "text-violet-600", dot: "bg-violet-400", border: "border-violet-100/60" },
                            ];

                            return (
                              <div className="animate-fade-in flex flex-col h-full">
                                {/* Header */}
                                <div className="mb-4">
                                  <h3 className="text-base font-black text-slate-900 leading-tight">{activeItem.title}</h3>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{activeItem.description}</p>
                                </div>

                                {/* 3-Card Grid */}
                                <div className="grid grid-cols-3 gap-3 flex-1">
                                  {parsedDetails.map((detail, idx) => {
                                    const color = cardColors[idx] || cardColors[0];
                                    return (
                                      <div key={idx} className={`bg-white border ${color.border} rounded-xl p-4 shadow-sm`}>
                                        <h4 className={`text-[9px] font-black ${color.header} uppercase tracking-widest mb-2`}>{detail.label}</h4>
                                        <p className="text-[10.5px] font-semibold text-slate-600 leading-relaxed">{detail.desc}</p>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* CTA */}
                                <div className="mt-5">
                                  <Link
                                    to={activeItem.link}
                                    onClick={() => setActiveDropdown(null)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                                  >
                                    Read Full Details <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </>
                    )}
                  </div>
                  {/* Contact Us Banner */}
                  <div className="mt-8 bg-slate-55 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Need expert guidance for your specific requirements?
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/10"
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98dvw] max-w-7xl max-h-[85vh] bg-white border border-slate-200 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Left Sidebar */}
                <div className="w-[28%] bg-slate-900 text-white border-r border-slate-800 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em] leading-tight">
                        Whom We Serve
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold leading-relaxed">
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
                    <div className="flex flex-col gap-1.5 max-h-[340px] overflow-y-auto pr-1">
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
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                              isSelected && !industrySearchQuery
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ClusterIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected && !industrySearchQuery ? "text-white" : "text-blue-400"}`} />
                              <span className="truncate">{cluster.name}</span>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected && !industrySearchQuery ? "opacity-100" : ""}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-[11px] font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>View All Industries Directory</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Right Pane */}
                <div className="w-[72%] p-6 flex flex-col justify-between bg-white min-h-[460px] overflow-y-auto">
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
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                              Search Results ({matched.length})
                            </h4>
                            <button
                              onClick={() => setIndustrySearchQuery("")}
                              className="text-xs text-blue-600 hover:underline font-semibold"
                            >
                              Back to Clusters
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                            {matched.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.id}
                                  to={sub.existingRoute}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-150 hover:border-blue-300 transition-all group"
                                >
                                  <div className="flex items-center gap-3 text-left min-w-0">
                                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                      <SubIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                                          {sub.title}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-blue-600 font-semibold">{sub.clusterName}</span>
                                      <span className="text-[10px] text-slate-400 font-medium line-clamp-1">
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
                      );
                    })()
                  ) : (
                    /* ── Active Cluster View ── */
                    (() => {
                      const activeCluster = whomWeServeClusters.find(c => c.id === activeSubTab) || whomWeServeClusters[0];
                      return (
                        <div className="flex-1 space-y-4">
                          {/* Cluster Header */}
                          <div className="border-b border-slate-100 pb-3 flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-slate-900 tracking-tight">
                                  {activeCluster.name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9.5px] font-black text-emerald-700 tracking-wide">
                                  Verified Scope
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
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

                          {/* 3-Column Organization-Size Segments Grid (Global | Large–Mid | Mid–Small) */}
                          {(() => {
                            const sizeSegments = getClusterSizeSegments(activeCluster.id);
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-[260px] max-h-[300px] overflow-y-auto pr-1">
                                {/* Column A — Global */}
                                <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 flex flex-col">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                                    <div className="flex items-center gap-1.5">
                                      <div className="p-1 rounded bg-blue-100 text-blue-700">
                                        <Globe className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-black text-slate-900 tracking-tight leading-none">Global</h5>
                                        <span className="text-[9.5px] text-slate-500 font-semibold leading-tight">Multinational Enterprises</span>
                                      </div>
                                    </div>
                                    <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-[8.5px] font-black text-blue-700 uppercase tracking-wider">
                                      MNC Scale
                                    </span>
                                  </div>
                                  <div className="space-y-1.5 overflow-y-auto flex-1 pr-0.5">
                                    {sizeSegments.global.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={item.destinationUrl}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group block p-2 rounded-lg bg-white border border-slate-200/70 hover:border-blue-400 hover:bg-blue-50/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-2xs"
                                      >
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-[11px] font-black text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {item.industryName}
                                          </span>
                                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                                        </div>
                                        <p className="text-[9.5px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                                          {item.businessType}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* Column B — Large–Mid */}
                                <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 flex flex-col">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                                    <div className="flex items-center gap-1.5">
                                      <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                                        <Building2 className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-black text-slate-900 tracking-tight leading-none">Large–Mid</h5>
                                        <span className="text-[9.5px] text-slate-500 font-semibold leading-tight">Regional & Multi-facility</span>
                                      </div>
                                    </div>
                                    <span className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-[8.5px] font-black text-indigo-700 uppercase tracking-wider">
                                      Multi-Site
                                    </span>
                                  </div>
                                  <div className="space-y-1.5 overflow-y-auto flex-1 pr-0.5">
                                    {sizeSegments.largeMid.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={item.destinationUrl}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group block p-2 rounded-lg bg-white border border-slate-200/70 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-2xs"
                                      >
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-[11px] font-black text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                            {item.industryName}
                                          </span>
                                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                                        </div>
                                        <p className="text-[9.5px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                                          {item.businessType}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* Column C — Mid–Small */}
                                <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 flex flex-col">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                                    <div className="flex items-center gap-1.5">
                                      <div className="p-1 rounded bg-emerald-100 text-emerald-700">
                                        <Store className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-black text-slate-900 tracking-tight leading-none">Mid–Small</h5>
                                        <span className="text-[9.5px] text-slate-500 font-semibold leading-tight">Small & Medium Businesses</span>
                                      </div>
                                    </div>
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[8.5px] font-black text-emerald-700 uppercase tracking-wider">
                                      MSME Scale
                                    </span>
                                  </div>
                                  <div className="space-y-1.5 overflow-y-auto flex-1 pr-0.5">
                                    {sizeSegments.midSmall.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={item.destinationUrl}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group block p-2 rounded-lg bg-white border border-slate-200/70 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-2xs"
                                      >
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-[11px] font-black text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                            {item.industryName}
                                          </span>
                                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                                        </div>
                                        <p className="text-[9.5px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                                          {item.businessType}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Key GRC Topics & Documented Offerings */}
                          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                                Applicable GRC Focus Topics
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {activeCluster.keyGrcTopics.slice(0, 3).map((topic, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium border border-slate-200/70 truncate max-w-[240px]"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
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
                                    <span className="truncate max-w-[150px]">{off.serviceName}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {/* Contextual Contact CTA Banner */}
                  <div className="mt-4 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">
                      Discuss your governance, risk and compliance requirements with GOVENICS.
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/10"
                    >
                      Contact Us
                    </Link>
                  </div>
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
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-[11px] font-black tracking-wide transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.03] whitespace-nowrap border border-blue-500/30"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Get Free Assessment
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        {!isAuthenticated ? (
          <div className="hidden xl:flex items-center gap-3">
            <Link to="/login">
              <button className="px-5 py-2.5 border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl text-[11px] font-black transition-all">
                Sign In
              </button>
            </Link>
            <Link to="/contact">
              <button className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 text-xs font-bold tracking-wide transition-all hover:scale-[1.02]">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
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
                <div className="pl-4 my-1 flex flex-col gap-4 bg-slate-50 rounded-lg p-3 border border-slate-100 max-h-[350px] overflow-y-auto text-left">
                  {whomWeServeClusters.map((cluster) => {
                    const sizeSegs = getClusterSizeSegments(cluster.id);
                    return (
                      <div key={cluster.id} className="space-y-2 pb-2 border-b border-slate-200/60 last:border-b-0">
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
                        {/* Mobile: 3 sections stacked in order: Global, Large–Mid, Mid–Small */}
                        <div className="pl-2 space-y-2">
                          <div>
                            <span className="text-[9px] font-black text-blue-700 uppercase tracking-wider block mb-0.5">Global</span>
                            <div className="pl-1.5 flex flex-col gap-0.5">
                              {sizeSegs.global.slice(0, 3).map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.destinationUrl}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block truncate"
                                >
                                  {item.industryName}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-indigo-700 uppercase tracking-wider block mb-0.5">Large–Mid</span>
                            <div className="pl-1.5 flex flex-col gap-0.5">
                              {sizeSegs.largeMid.slice(0, 3).map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.destinationUrl}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-xs text-slate-700 hover:text-indigo-600 font-medium py-0.5 block truncate"
                                >
                                  {item.industryName}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider block mb-0.5">Mid–Small</span>
                            <div className="pl-1.5 flex flex-col gap-0.5">
                              {sizeSegs.midSmall.slice(0, 3).map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.destinationUrl}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-xs text-slate-700 hover:text-emerald-600 font-medium py-0.5 block truncate"
                                >
                                  {item.industryName}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/20"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Get Free Compliance Assessment
                  </button>
                </Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                    Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full py-2.5 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all hover:bg-slate-50">
                    Sign In to Portal
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

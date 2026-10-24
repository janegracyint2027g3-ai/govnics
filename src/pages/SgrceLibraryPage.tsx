import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { sgrceLibraryData, sgrcStatutoryDatabase, type StatutoryDocument } from "@/data/sgrc-data";
import { 
  BookOpen, Calendar, HelpCircle, FileText, Download, CheckCircle2,
  Percent, Coins, Clock, Globe, ShieldAlert, Award, FileCheck, 
  Calculator, UserCheck, Play, Scale, Leaf, Building, CalendarCheck, Copy, Check, Search,
  Database, PlusCircle, Trash2, History, ChevronLeft, ChevronRight, ShieldCheck
} from "lucide-react";


// Helpers for Advanced Search Filtering
const getCleanJurisdiction = (enacted: string) => {
  if (!enacted) return "Central";
  if (enacted.toLowerCase().includes("central") || enacted.toLowerCase().includes("parliament") || enacted.toLowerCase().includes("ministry")) {
    return "Central";
  }
  return enacted
    .replace(/\s+State\s+Legislature/i, "")
    .replace(/\s+Legislature/i, "")
    .replace(/\s+Government/i, "")
    .trim();
};

const matchesEra = (docYear: string, era: string) => {
  if (era === "All") return true;
  const yr = parseInt(docYear);
  if (isNaN(yr)) return false;
  if (era === "post-2020") return yr >= 2020;
  if (era === "2010s") return yr >= 2010 && yr <= 2019;
  if (era === "2000s") return yr >= 2000 && yr <= 2009;
  if (era === "1990s") return yr >= 1990 && yr <= 1999;
  if (era === "pre-1990") return yr < 1990;
  return true;
};

const availableKeywords = [
  { id: "labor", label: "Labor & Workers", terms: ["labour", "worker", "employment", "employee", "remuneration", "standing orders", "apprentice", "cine-worker"] },
  { id: "safety", label: "Safety & Health", terms: ["safety", "health", "hazard", "medical", "pollution", "accident", "maternity", "water", "air", "public liability"] },
  { id: "wages", label: "Wages & Money", terms: ["wage", "bonus", "gratuity", "pension", "provident", "cess", "tax", "welfare", "fund"] },
  { id: "licensing", label: "Licensing & Registry", terms: ["license", "licensing", "registration", "register", "filing", "consent", "reporting", "audit"] },
  { id: "corporate", label: "Corporate & SEZ", terms: ["company", "companies", "corporate", "sez", "listing", "sebi", "shareholding", "fema", "foreign exchange", "board"] }
];

interface LibrarySlide {
  id: string;
  title: string;
  description: string;
  badge: string;
  domain: "lei" | "ehs" | "fcc";
  tab: string;
  icon: any;
  actionLabel: string;
}

const librarySlides: LibrarySlide[] = [
  {
    id: "labour-codes",
    title: "Consolidated Labour Codes 2026",
    description: "Prepare for India's upcoming regulatory consolidation. Access comprehensive frameworks for Wages, Social Security, OSH, and Industrial Relations.",
    badge: "Statutory Reform",
    domain: "lei",
    tab: "labour-codes",
    icon: Scale,
    actionLabel: "View Labour Codes"
  },
  {
    id: "dpdp-compliance",
    title: "DPDP Act Operational Guide",
    description: "Get compliant with the Digital Personal Data Protection Act. Access crucial consent frameworks, audit protocols, and data fiduciary compliance checklists.",
    badge: "Data Privacy",
    domain: "fcc",
    tab: "acts",
    icon: ShieldAlert,
    actionLabel: "Explore DPDP Act"
  },
  {
    id: "epf-thresholds",
    title: "EPF Higher Pension Contribution Slabs",
    description: "Understand the revised guidelines for processing EPFO employer contributions on monthly basic salary exceeding the standard ₹15,000 threshold.",
    badge: "Social Security",
    domain: "lei",
    tab: "calculators",
    icon: Coins,
    actionLabel: "Open EPF Calculator"
  },
  {
    id: "posh-audit",
    title: "POSH IC Audit & Annual Mandates",
    description: "Step-by-step checklist to set up your Internal Committee (IC) and prepare your mandatory POSH annual report filings for district officers.",
    badge: "Safety & Health",
    domain: "lei",
    tab: "acts",
    icon: UserCheck,
    actionLabel: "Read POSH Act"
  },
  {
    id: "iso-ehs",
    title: "ISO 14001:2015 & EHS Consent Slabs",
    description: "Navigate global environmental standards on pollution abatement, waste reduction, and state-level green category consent renewal timelines.",
    badge: "EHS Standards",
    domain: "ehs",
    tab: "ehs-standards",
    icon: Leaf,
    actionLabel: "Learn EHS Standards"
  },
  {
    id: "mca-filings",
    title: "MCA Annual Filings (Form AOC-4)",
    description: "Stay ahead of fiscal compliance calendar deadlines. Review statutory penalty slabs of ₹100/day for delayed balance sheet submittals.",
    badge: "Fiscal & Corporate",
    domain: "fcc",
    tab: "fcc-calendar",
    icon: Building,
    actionLabel: "View Filings Calendar"
  },
  {
    id: "lwf-slabs",
    title: "State Labour Welfare Fund (LWF) Rates",
    description: "Access latest semi-annual contribution slabs for workers and employers in Maharashtra, Karnataka, Tamil Nadu, and Telangana.",
    badge: "LWF Compliance",
    domain: "lei",
    tab: "labour-welfare-fund",
    icon: CalendarCheck,
    actionLabel: "Verify LWF Slabs"
  },
  {
    id: "gratuity-rules",
    title: "Gratuity Benefits Eligibility & Exemption",
    description: "Calculate employee gratuity benefits based on the 15-day salary formula for continuous service periods of 5 years and above.",
    badge: "Employee Benefits",
    domain: "lei",
    tab: "calculators",
    icon: Coins,
    actionLabel: "Open Gratuity Calc"
  }
];

interface KrmDocument {
  id: string;
  title: string;
  domain: "lei" | "ehs" | "fcc";
  category: string;
  version: string;
  classification: "Public" | "Internal" | "Confidential" | "Restricted";
  owner: string;
  lastReviewed: string;
  applicability: string;
  status: "Active" | "Pending Review" | "Archived";
}

const initialKrmDocs: KrmDocument[] = [
  {
    id: "DOC-2026-001",
    title: "The Code on Social Security, 2020",
    domain: "lei",
    category: "Labour Code",
    version: "v2.1",
    classification: "Public",
    owner: "Legal & Compliance",
    lastReviewed: "2026-04-12",
    applicability: "Establishments with 10+ employees",
    status: "Active"
  },
  {
    id: "DOC-2026-002",
    title: "Digital Personal Data Protection (DPDP) Act, 2023",
    domain: "fcc",
    category: "Act",
    version: "v1.4",
    classification: "Restricted",
    owner: "Data Protection Office",
    lastReviewed: "2026-05-30",
    applicability: "All digital entities processing Indian citizen data",
    status: "Active"
  },
  {
    id: "DOC-2026-003",
    title: "ISO 14001:2015 Environmental Standard Policy",
    domain: "ehs",
    category: "ISO Standard",
    version: "v3.0",
    classification: "Internal",
    owner: "EHS Operations",
    lastReviewed: "2026-06-15",
    applicability: "Manufacturing facilities and plant sites",
    status: "Active"
  },
  {
    id: "DOC-2026-004",
    title: "Companies (Filing of AOC-4) Rules",
    domain: "fcc",
    category: "Rule",
    version: "v2.0",
    classification: "Public",
    owner: "Finance & Taxation",
    lastReviewed: "2026-03-01",
    applicability: "All registered corporate entities in India",
    status: "Active"
  },
  {
    id: "DOC-2026-005",
    title: "Contract Labour (Regulation & Abolition) Central Rules",
    domain: "lei",
    category: "Rule",
    version: "v1.2",
    classification: "Public",
    owner: "HR Operations",
    lastReviewed: "2026-01-20",
    applicability: "Firms employing 20+ contract labourers",
    status: "Active"
  },
  {
    id: "DOC-2026-006",
    title: "Hazardous Wastes (Management & Transboundary) Rules",
    domain: "ehs",
    category: "Rule",
    version: "v2.2",
    classification: "Restricted",
    owner: "EHS Operations",
    lastReviewed: "2026-05-10",
    applicability: "Factories generating chemical or electronic waste",
    status: "Active"
  }
];

export default function SgrceLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDomain = (searchParams.get("domain") || "lei") as "lei" | "ehs" | "fcc";
  const activeTab = searchParams.get("tab") || (activeDomain === "lei" ? "labour-codes" : "acts");
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");

  useEffect(() => {
    document.title = "Statutory Compliance e-Library & Act Explorer — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Search Indian statutory acts, minimum wage slabs, LWF contribution rates, Professional Tax tables, and labour compliance calculators on GOVENICS e-Library.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  // Search and visual feedback states
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedActs, setExpandedActs] = useState<{ [key: string]: boolean }>({});

  // Advanced filters states
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("All");
  const [selectedEra, setSelectedEra] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("title-asc");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Calculator states
  const [epfBasic, setEpfBasic] = useState<string>("25000");
  const [gratuityBasic, setGratuityBasic] = useState<string>("35000");
  const [gratuityYears, setGratuityYears] = useState<string>("8");
  const [ptGross, setPtGross] = useState<string>("32000");
  const [ptState, setPtState] = useState<string>("Maharashtra");
  const [taxGross, setTaxGross] = useState<string>("950000");
  const [taxDeductions, setTaxDeductions] = useState<string>("150000");

  const [activeCalcTab, setActiveCalcTab] = useState<"epf" | "gratuity" | "pt" | "tax">("epf");

  // Slider states
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // KRM Registered Documents State
  const [krmDocs, setKrmDocs] = useState<KrmDocument[]>(initialKrmDocs);
  const [krmSearch, setKrmSearch] = useState("");
  const [krmFilterDomain, setKrmFilterDomain] = useState<string>("All");
  
  // Admin Form input states
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocDomain, setNewDocDomain] = useState<"lei" | "ehs" | "fcc">("lei");
  const [newDocCategory, setNewDocCategory] = useState("Act");
  const [newDocVersion, setNewDocVersion] = useState("v1.0");
  const [newDocClassification, setNewDocClassification] = useState<"Public" | "Internal" | "Confidential" | "Restricted">("Public");
  const [newDocOwner, setNewDocOwner] = useState("Legal & Compliance");
  const [newDocApplicability, setNewDocApplicability] = useState("");
  
  // Toast & Activity Log state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [revisionLogs, setRevisionLogs] = useState([
    { timestamp: "2026-06-24 10:45", user: "Admin", action: "Accessed Ledger Dashboard" },
    { timestamp: "2026-06-24 09:12", user: "system", action: "Auto-synced MCA statutory database" },
    { timestamp: "2026-06-23 15:30", user: "Legal Compliance", action: "Updated DPDP Act guidelines (v1.4)" }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navigateToSlideTab = (domain: "lei" | "ehs" | "fcc", tabId: string) => {
    setSearchParams({ domain, tab: tabId });
    setSelectedJurisdiction("All");
    setSelectedEra("All");
    setSortBy("title-asc");
    setSelectedKeywords([]);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Slider Auto-Play Effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % librarySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, activeDomain]);

  const selectTab = (tabId: string) => {
    setSearchParams({ domain: activeDomain, tab: tabId });
    setSelectedJurisdiction("All");
    setSelectedEra("All");
    setSortBy("title-asc");
    setSelectedKeywords([]);
    setSearchQuery("");
  };

  const selectDomain = (domainId: "lei" | "ehs" | "fcc") => {
    const structure = getSidebarStructure(domainId);
    const defaultTab = structure.statutory[0]?.id || "acts";
    setSearchParams({ domain: domainId, tab: defaultTab });
    setSelectedJurisdiction("All");
    setSelectedEra("All");
    setSortBy("title-asc");
    setSelectedKeywords([]);
    setSearchQuery("");
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleActExpand = (id: string) => {
    setExpandedActs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // e-Library Menu Structure based on domain
  const getSidebarStructure = (domain: "lei" | "ehs" | "fcc") => {
    switch (domain) {
      case "lei":
        return {
          statutory: [
            { id: "labour-codes", label: "Labour codes", icon: Award },
            { id: "acts", label: "Acts", icon: FileCheck },
            { id: "rules", label: "Rules", icon: ShieldAlert },
            { id: "schemes", label: "Schemes", icon: Globe },
            { id: "regulations", label: "Regulations", icon: BookOpen },
            { id: "gazette", label: "Gazette Notifications", icon: FileText },
            { id: "labour-welfare-fund", label: "Labour Welfare Fund", icon: UserCheck },
            { id: "leaves-working-hours", label: "Leaves & Working Hours", icon: Clock },
            { id: "holidays-list", label: "Holidays List", icon: Calendar },
            { id: "nfh-details", label: "NFH Details", icon: Globe },
            { id: "professional-tax", label: "Professional Tax", icon: Percent }
          ],
          resources: [
            { id: "knowledge-management", label: "Knowledge Management", icon: Database },
            { id: "minimum-wages", label: "Minimum Wages", icon: Coins },
            { id: "webinar", label: "Webinar", icon: Play },
            { id: "legal-opinion", label: "Legal Opinion", icon: HelpCircle },
            { id: "calculators", label: "Statutory Calculators", icon: Calculator }
          ]
        };
      case "ehs":
        return {
          statutory: [
            { id: "acts", label: "Acts", icon: FileCheck },
            { id: "rules", label: "Rules", icon: ShieldAlert },
            { id: "regulations", label: "Regulations", icon: BookOpen },
            { id: "gazette", label: "Gazette Notifications", icon: FileText },
            { id: "ehs-standards", label: "EHS Standards & ISO", icon: Award }
          ],
          resources: [
            { id: "knowledge-management", label: "Knowledge Management", icon: Database },
            { id: "webinar", label: "Webinar", icon: Play },
            { id: "legal-opinion", label: "Legal Opinion", icon: HelpCircle }
          ]
        };
      case "fcc":
        return {
          statutory: [
            { id: "acts", label: "Acts", icon: FileCheck },
            { id: "rules", label: "Rules", icon: ShieldAlert },
            { id: "regulations", label: "Regulations", icon: BookOpen },
            { id: "gazette", label: "Gazette Notifications", icon: FileText }
          ],
          resources: [
            { id: "knowledge-management", label: "Knowledge Management", icon: Database },
            { id: "fcc-calendar", label: "Compliance Calendar", icon: CalendarCheck },
            { id: "webinar", label: "Webinar", icon: Play },
            { id: "legal-opinion", label: "Legal Opinion", icon: HelpCircle },
            { id: "calculators", label: "Statutory Calculators", icon: Calculator }
          ]
        };
    }
  };

  // EPF Calculation
  const calculateEpf = () => {
    const basic = parseFloat(epfBasic) || 0;
    const employeeShare = basic * 0.12;
    // Employer share calculation: 12% total.
    // EPS (Pension) is 8.33% capped at ₹15,000 basic (i.e. max ₹1,250).
    const epsShare = Math.min(1250, basic * 0.0833);
    const employerEpf = (basic * 0.12) - epsShare;
    return {
      employee: employeeShare,
      employerEpf: employerEpf,
      employerEps: epsShare,
      totalEmployer: basic * 0.12,
      totalSavings: employeeShare + employerEpf + epsShare
    };
  };

  // Gratuity Calculation
  const calculateGratuity = () => {
    const basic = parseFloat(gratuityBasic) || 0;
    const years = parseFloat(gratuityYears) || 0;
    const gratuity = (basic * 15 * years) / 26;
    const isEligible = years >= 5;
    return {
      amount: Math.round(gratuity),
      isEligible
    };
  };

  // Professional Tax Calculation
  const calculatePT = () => {
    const gross = parseFloat(ptGross) || 0;
    const state = ptState;
    let tax = 0;
    let note = "";

    if (state === "Maharashtra") {
      if (gross > 10000) {
        tax = 200;
        note = "₹200 per month (₹250 in February)";
      } else if (gross > 7500) {
        tax = 175;
      } else {
        tax = 0;
      }
    } else if (state === "Karnataka") {
      tax = gross > 25000 ? 200 : 0;
    } else if (state === "Tamil Nadu") {
      // half yearly slabs translated to monthly approx
      if (gross > 12500) { // equivalent to half yearly > 75000
        tax = 208;
      } else if (gross > 10000) {
        tax = 170;
      } else if (gross > 7500) {
        tax = 115;
      } else if (gross > 5000) {
        tax = 52.5;
      } else if (gross > 3500) {
        tax = 22.5;
      } else {
        tax = 0;
      }
    } else if (state === "Telangana") {
      if (gross > 20000) tax = 200;
      else if (gross > 15000) tax = 150;
      else tax = 0;
    }
    return { tax, note };
  };

  // Income Tax Calculation (FY 2026-27 Slabs)
  const calculateTax = () => {
    const gross = parseFloat(taxGross) || 0;
    const deductions = parseFloat(taxDeductions) || 0;

    // 1. New Regime
    const stdDedNew = 75000;
    const taxableNew = Math.max(0, gross - stdDedNew);
    let taxNew = 0;

    // New Regime Slabs:
    // Up to 3,000,000: Nil
    // 300,001 - 700,000: 5%
    // 700,001 - 1,000,000: 10%
    // 1,000,001 - 1,200,000: 15%
    // 1,200,001 - 1,500,000: 20%
    // Above 1,500,000: 30%
    // (Rebate applies if taxable income <= 7,000,000 - tax is zero)
    if (taxableNew > 700000) {
      if (taxableNew <= 700000) taxNew = 0;
      else {
        // Calculate standard slab tax
        if (taxableNew > 1500000) {
          taxNew += (taxableNew - 1500000) * 0.3 + 300000 * 0.2 + 200000 * 0.15 + 300000 * 0.1 + 400000 * 0.05;
        } else if (taxableNew > 1200000) {
          taxNew += (taxableNew - 1200000) * 0.2 + 200000 * 0.15 + 300000 * 0.1 + 400000 * 0.05;
        } else if (taxableNew > 1000000) {
          taxNew += (taxableNew - 1000000) * 0.15 + 300000 * 0.1 + 400000 * 0.05;
        } else if (taxableNew > 700000) {
          taxNew += (taxableNew - 700000) * 0.1 + 400000 * 0.05;
        } else if (taxableNew > 300000) {
          taxNew += (taxableNew - 300000) * 0.05;
        }
      }
    }
    // Add 4% cess
    const finalTaxNew = taxNew + (taxNew * 0.04);

    // 2. Old Regime
    const stdDedOld = 50000;
    const taxableOld = Math.max(0, gross - stdDedOld - deductions);
    let taxOld = 0;
    // Old Slabs:
    // Up to 2.5L: Nil
    // 2.5 - 5L: 5%
    // 5 - 10L: 20%
    // Above 10L: 30%
    // Rebate applies if taxable <= 5L
    if (taxableOld > 500000) {
      if (taxableOld > 1000000) {
        taxOld += (taxableOld - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
      } else {
        taxOld += (taxableOld - 500000) * 0.2 + 250000 * 0.05;
      }
    } else if (taxableOld > 250000) {
      taxOld += (taxableOld - 250000) * 0.05;
      // apply rebate
      if (taxableOld <= 500000) taxOld = 0;
    }
    const finalTaxOld = taxOld + (taxOld * 0.04);
    return {
      newRegimeTax: Math.round(finalTaxNew),
      oldRegimeTax: Math.round(finalTaxOld),
      recommended: finalTaxNew < finalTaxOld ? "New Regime" : "Old Regime",
      savings: Math.abs(Math.round(finalTaxOld - finalTaxNew))
    };
  };

  // Render Knowledge Resource Management Dashboard
  const renderKrmDashboard = () => {
    const totalAssets = krmDocs.length;
    const publicCount = krmDocs.filter(d => d.classification === "Public").length;
    const restrictedCount = krmDocs.filter(d => d.classification === "Restricted").length;
    const internalCount = krmDocs.filter(d => d.classification === "Internal").length;
    const confidentialCount = krmDocs.filter(d => d.classification === "Confidential").length;

    const filteredLedger = krmDocs.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(krmSearch.toLowerCase()) ||
        doc.id.toLowerCase().includes(krmSearch.toLowerCase()) ||
        doc.category.toLowerCase().includes(krmSearch.toLowerCase()) ||
        doc.owner.toLowerCase().includes(krmSearch.toLowerCase());
      
      const matchesDomain = krmFilterDomain === "All" || doc.domain === krmFilterDomain;
      
      return matchesSearch && matchesDomain;
    });

    const handleRegisterDoc = (e: any) => {
      e.preventDefault();
      if (!newDocTitle.trim()) {
        triggerToast("Please enter a document title.");
        return;
      }
      if (!newDocApplicability.trim()) {
        triggerToast("Please describe the applicability.");
        return;
      }

      const nextNum = krmDocs.length + 1;
      const formattedNum = nextNum < 10 ? `00${nextNum}` : nextNum < 100 ? `0${nextNum}` : `${nextNum}`;
      const newDoc: KrmDocument = {
        id: `DOC-2026-${formattedNum}`,
        title: newDocTitle.trim(),
        domain: newDocDomain,
        category: newDocCategory,
        version: newDocVersion.trim() || "v1.0",
        classification: newDocClassification,
        owner: newDocOwner,
        lastReviewed: new Date().toISOString().split("T")[0],
        applicability: newDocApplicability.trim(),
        status: "Active"
      };

      setKrmDocs([newDoc, ...krmDocs]);
      setRevisionLogs([
        {
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          user: "Admin Portal",
          action: `Registered statutory asset "${newDocTitle.trim()}" (${newDocVersion})`
        },
        ...revisionLogs
      ]);

      setNewDocTitle("");
      setNewDocApplicability("");
      triggerToast(`Successfully registered ${newDoc.id}!`);
    };

    const handleDeleteDoc = (id: string, title: string) => {
      setKrmDocs(krmDocs.filter(d => d.id !== id));
      setRevisionLogs([
        {
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          user: "Admin Portal",
          action: `Deregistered statutory asset "${title}" (${id})`
        },
        ...revisionLogs
      ]);
      triggerToast(`Removed document ${id} from registry.`);
    };

    return (
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-left">
            <span className="text-[10px] font-black text-blue-650 uppercase tracking-widest flex items-center gap-1">
              <Database className="w-3 h-3 text-blue-600" /> Registry Operations & Control
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Knowledge Resource Management (KRM)
            </h2>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
              Registry Synced
            </span>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-450">Active Statutes</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalAssets}</div>
            <p className="text-[9px] text-slate-500 font-bold mt-1">Classified and indexed</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-450">Classification Split</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xs font-black text-slate-900 mt-2 flex flex-wrap gap-x-2 gap-y-1">
              <span className="text-emerald-650">Pub: {publicCount}</span>
              <span className="text-blue-650">Int: {internalCount}</span>
              <span className="text-amber-650">Res: {restrictedCount}</span>
              <span className="text-rose-650">Con: {confidentialCount}</span>
            </div>
            <p className="text-[9px] text-slate-500 font-bold mt-1">Data protection mapping</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-450">Audit Readiness</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">98.4%</div>
            <p className="text-[9px] text-emerald-650 font-bold mt-1">✓ Statutory compliance</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left hover:shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-450">Last Sync Activity</span>
              <History className="w-4 h-4 text-violet-500" />
            </div>
            <div className="text-xs font-black text-slate-900 mt-2 truncate">
              {revisionLogs[0]?.timestamp || "Just now"}
            </div>
            <p className="text-[9px] text-slate-500 font-bold mt-1">Local client-side index</p>
          </div>
        </div>

        {/* Two Column Section: Register Form & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Register Document Form */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 md:p-6 text-left shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <PlusCircle className="w-5 h-5 text-blue-650" />
              <div>
                <h3 className="text-sm font-black text-slate-900">Register Statutory Compliance Resource</h3>
                <p className="text-[10px] text-slate-450 font-bold">Ingest new statutory assets or guidelines into the GRC repository</p>
              </div>
            </div>

            <form onSubmit={handleRegisterDoc} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Document Title</label>
                  <input
                    type="text"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. Maharashtra LWF (Amendment) Act"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Regulatory Domain</label>
                  <select
                    value={newDocDomain}
                    onChange={(e) => setNewDocDomain(e.target.value as "lei" | "ehs" | "fcc")}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-750 outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="lei">Labour & Employment (LEI)</option>
                    <option value="ehs">Environment, Health & Safety (EHS)</option>
                    <option value="fcc">Fiscal & Corporate (FCC)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Document Category</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-750 outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="Act">Act (Statute)</option>
                    <option value="Rule">Rule (Regulation)</option>
                    <option value="Gazette">Gazette Notification</option>
                    <option value="ISO Standard">ISO Standard</option>
                    <option value="Policy Document">Policy Document</option>
                    <option value="Compliance Guide">Compliance Guide</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Document Version</label>
                  <input
                    type="text"
                    value={newDocVersion}
                    onChange={(e) => setNewDocVersion(e.target.value)}
                    placeholder="e.g. v1.0"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Classification Level</label>
                  <select
                    value={newDocClassification}
                    onChange={(e) => setNewDocClassification(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-750 outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="Public">Public (Statutory baseline)</option>
                    <option value="Internal">Internal (Organization policy)</option>
                    <option value="Restricted">Restricted (Sensitive audits)</option>
                    <option value="Confidential">Confidential (Board strategy)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Owner Department</label>
                  <select
                    value={newDocOwner}
                    onChange={(e) => setNewDocOwner(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-705 outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="Legal & Compliance">Legal & Compliance</option>
                    <option value="HR Operations">HR Operations</option>
                    <option value="EHS Operations">EHS Operations</option>
                    <option value="Finance & Taxation">Finance & Taxation</option>
                    <option value="Data Protection Office">Data Protection Office</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Applicability Criteria</label>
                  <input
                    type="text"
                    value={newDocApplicability}
                    onChange={(e) => setNewDocApplicability(e.target.value)}
                    placeholder="e.g. Factories employing 10+ workers using power"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-blue-650 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-550/15"
              >
                <PlusCircle className="w-4 h-4" /> Upload & Register statutory Asset
              </button>
            </form>
          </div>

          {/* Audit Logs panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-left flex flex-col self-stretch">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-3 shrink-0">
              <History className="w-4 h-4 text-violet-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Registry Activity Logs</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[260px] space-y-3 pr-1 scrollbar-thin">
              {revisionLogs.map((log, idx) => (
                <div key={idx} className="text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-extrabold">
                    <span>{log.timestamp}</span>
                    <span className="uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-black">{log.user}</span>
                  </div>
                  <p className="font-semibold text-slate-655 mt-1 leading-normal">{log.action}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-center shrink-0">
              <button 
                type="button"
                onClick={() => {
                  setRevisionLogs([
                    {
                      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
                      user: "Admin",
                      action: "Purged local audit session logs cache"
                    }
                  ]);
                  triggerToast("Session activity logs cleared.");
                }}
                className="text-[9px] font-black text-rose-600 hover:text-rose-700 uppercase tracking-wider transition-colors"
              >
                Clear Audit History
              </button>
            </div>
          </div>
        </div>

        {/* Ledger table */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="text-left">
              <h3 className="text-sm font-black text-slate-900">Document Control Ledger</h3>
              <p className="text-[10px] text-slate-450 font-bold">Comprehensive indexing, version mapping, and security classifications for compliance resources</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
              <div className="relative flex-1 sm:w-48 text-left">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search ledger..."
                  value={krmSearch}
                  onChange={(e) => setKrmSearch(e.target.value)}
                  className="w-full h-9 pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
                />
              </div>
              <select
                value={krmFilterDomain}
                onChange={(e) => setKrmFilterDomain(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all text-left"
              >
                <option value="All">All Domains</option>
                <option value="lei">Labour & Employment (LEI)</option>
                <option value="ehs">Environment, Health & Safety (EHS)</option>
                <option value="fcc">Fiscal & Corporate (FCC)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-150 rounded-2xl">
            <table className="w-full text-xs font-semibold text-slate-700 min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-slate-450 uppercase text-[9px] font-black tracking-wider text-left">
                  <th className="p-4 w-28">Asset ID</th>
                  <th className="p-4">Document Title</th>
                  <th className="p-4 w-36">Category & Version</th>
                  <th className="p-4 w-32">Classification</th>
                  <th className="p-4 w-36">Owner Dept.</th>
                  <th className="p-4 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-left">
                {filteredLedger.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 font-semibold bg-slate-50/50">
                      No registered compliance documents found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredLedger.map((doc) => {
                    const domainBadgeColor = 
                      doc.domain === "lei" ? "bg-blue-50 text-blue-700 border-blue-100" :
                      doc.domain === "ehs" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      "bg-amber-50 text-amber-700 border-amber-100";
                    
                    const classColor =
                      doc.classification === "Public" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      doc.classification === "Internal" ? "bg-blue-50 text-blue-700 border-blue-100" :
                      doc.classification === "Restricted" ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-rose-50 text-rose-700 border-rose-100";

                    return (
                      <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono font-black text-slate-800">{doc.id}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${domainBadgeColor}`}>
                              {doc.domain.toUpperCase()}
                            </span>
                            <h4 className="font-black text-slate-900 leading-snug">{doc.title}</h4>
                            <p className="text-[10px] text-slate-500 font-bold leading-normal truncate max-w-sm">{doc.applicability}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-slate-800">{doc.category}</span>
                          <span className="ml-1.5 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-wider border border-slate-200">
                            {doc.version}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${classColor}`}>
                            {doc.classification}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 font-black">{doc.owner}</td>
                        <td className="p-4">
                          <div className="flex justify-center items-center gap-1.5">
                            <button
                              onClick={() => {
                                handleCopy(doc.id, `${doc.title} (${doc.id})\nDomain: ${doc.domain.toUpperCase()} | Version: ${doc.version}\nClassification: ${doc.classification} | Owner: ${doc.owner}\nApplicability: ${doc.applicability}`);
                                triggerToast("Document metadata copied!");
                              }}
                              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-550 hover:text-blue-600 transition-all"
                              title="Copy Metadata Details"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => triggerToast(`Downloading PDF Brief for ${doc.id}...`)}
                              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-550 hover:text-emerald-600 transition-all"
                              title="Download statutory Brief"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDoc(doc.id, doc.title)}
                              className="p-2 border border-slate-200 hover:border-rose-200 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all"
                              title="Deregister Asset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render e-Library Content Card based on activeTab
  const renderLibraryContent = () => {
    // 0. Knowledge Resource Management Dashboard
    if (activeTab === "knowledge-management") {
      return renderKrmDashboard();
    }

    // 1. Calculators Tab
    if (activeTab === "calculators") {
      const epfResult = calculateEpf();
      const gratuityResult = calculateGratuity();
      const ptResult = calculatePT();
      const taxResult = calculateTax();

      return (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Statutory Compliance Calculators
            </h2>
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
              {(["epf", "gratuity", "pt", "tax"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCalcTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeCalcTab === tab
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
            {activeCalcTab === "epf" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800">
                    Provident Fund (EPF) Calculator
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Estimate your monthly statutory EPF and EPS (Pension) contributions. Both employee and employer contribute 12% of the Basic + DA salary.
                  </p>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Monthly Basic Salary + DA (₹)
                    </label>
                    <input
                      type="number"
                      value={epfBasic}
                      onChange={(e) => setEpfBasic(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                    />
                  </div>
                </div>
                <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-450">
                    Contribution Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-bold">Employee Share (12%):</span>
                      <span className="font-extrabold text-slate-800">₹{epfResult.employee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-bold">Employer EPF (3.67%):</span>
                      <span className="font-extrabold text-slate-800">₹{epfResult.employerEpf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-bold">Employer EPS Pension (8.33%):</span>
                      <span className="font-extrabold text-slate-850">₹{epfResult.employerEps.toLocaleString()}</span>
                    </div>
                    <hr className="border-slate-100" />
                    <div className="flex justify-between items-center text-xs font-extrabold text-slate-900">
                      <span>Total Employer Share (12%):</span>
                      <span>₹{epfResult.totalEmployer.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-black text-blue-600 pt-1">
                      <span>Total Monthly Savings:</span>
                      <span>₹{epfResult.totalSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCalcTab === "gratuity" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800">
                    Gratuity Payout Calculator
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Gratuity is payable to an employee after completing 5 or more years of continuous service. It is computed as 15 days of salary for each completed year.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Last Basic Salary (₹)
                      </label>
                      <input
                        type="number"
                        value={gratuityBasic}
                        onChange={(e) => setGratuityBasic(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Completed Years
                      </label>
                      <input
                        type="number"
                        value={gratuityYears}
                        onChange={(e) => setGratuityYears(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col justify-center text-center space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Estimated Gratuity Benefit
                    </span>
                    <div className="text-3xl font-black text-blue-650">
                      ₹{gratuityResult.amount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    {gratuityResult.isEligible ? (
                      <span className="px-3 py-1 bg-emerald-50 border border-emerald-250 text-emerald-600 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-block">
                        Eligible (Service &ge; 5 Years)
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-50 border border-amber-250 text-amber-600 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-block">
                        Not Eligible yet (&lt; 5 Years)
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">
                    Formula: (Basic Salary × 15 × Years of Service) ÷ 26. Maximum tax-free limit is ₹20 Lakhs.
                  </p>
                </div>
              </div>
            )}

            {activeCalcTab === "pt" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800">
                    Professional Tax (PT) Calculator
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Professional Tax slabs vary depending on state regulatory rules. Select your state of employment and monthly gross earnings to calculate deduction.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Gross Monthly (₹)
                      </label>
                      <input
                        type="number"
                        value={ptGross}
                        onChange={(e) => setPtGross(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Select State
                      </label>
                      <select
                        value={ptState}
                        onChange={(e) => setPtState(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col justify-center text-center space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Monthly PT Liability
                    </span>
                    <div className="text-3xl font-black text-blue-650">
                      ₹{Math.round(ptResult.tax)}
                    </div>
                  </div>
                  {ptResult.note && (
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">
                      {ptResult.note}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">
                    Professional tax deductions are capped constitutionally at a maximum of ₹2,500 per annum.
                  </p>
                </div>
              </div>
            )}

            {activeCalcTab === "tax" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800">
                    Income Tax Slabs Estimator (FY 2026-27 Slabs)
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Compare Old vs New Tax Regime calculations side-by-side to identify the optimal tax regime.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Gross Annual Income (₹)
                      </label>
                      <input
                        type="number"
                        value={taxGross}
                        onChange={(e) => setTaxGross(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        Deductions (Old only) (₹)
                      </label>
                      <input
                        type="number"
                        value={taxDeductions}
                        onChange={(e) => setTaxDeductions(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-250 bg-white text-sm font-semibold outline-none focus:border-blue-500 transition-all text-slate-850"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Regime Comparison Results
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-bold">New Regime Tax:</span>
                      <span className="font-extrabold text-slate-800">₹{taxResult.newRegimeTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-655 font-bold">Old Regime Tax:</span>
                      <span className="font-extrabold text-slate-800">₹{taxResult.oldRegimeTax.toLocaleString()}</span>
                    </div>
                    <hr className="border-slate-100" />
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                      <div className="text-xs font-extrabold text-slate-800">
                        Recommendation: <span className="text-blue-600 font-black">{taxResult.recommended}</span>
                      </div>
                      {taxResult.savings > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Saves ₹{taxResult.savings.toLocaleString()} annually
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. Structured Acts/Codes Database
    const docList: StatutoryDocument[] | undefined = (sgrcStatutoryDatabase[activeDomain] as any)?.[activeTab];
    if (docList) {
      // Dynamic lists for filters
      const uniqueJurisdictions = Array.from(
        new Set(
          docList.map((doc) => getCleanJurisdiction(doc.enactedBy))
        )
      ).filter(Boolean).sort();

      const matchesKeywords = (doc: StatutoryDocument) => {
        if (selectedKeywords.length === 0) return true;
        const textToSearch = `${doc.title} ${doc.objective} ${doc.applicability} ${doc.keyProvisions.join(" ")}`.toLowerCase();
        return selectedKeywords.every(kwId => {
          const kw = availableKeywords.find(k => k.id === kwId);
          if (!kw) return true;
          return kw.terms.some(term => textToSearch.includes(term));
        });
      };

      const sortDocs = (a: StatutoryDocument, b: StatutoryDocument) => {
        if (sortBy === "title-asc") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "title-desc") {
          return b.title.localeCompare(a.title);
        }
        if (sortBy === "year-desc") {
          const yrA = parseInt(a.year) || 0;
          const yrB = parseInt(b.year) || 0;
          return yrB - yrA;
        }
        if (sortBy === "year-asc") {
          const yrA = parseInt(a.year) || 0;
          const yrB = parseInt(b.year) || 0;
          return yrA - yrB;
        }
        return 0;
      };

      const filteredDocs = docList
        .filter((doc) => {
          // Search query match
          const matchesSearch = searchQuery === "" ||
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.applicability.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.enactedBy.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Jurisdiction match
          const matchesJur = selectedJurisdiction === "All" || getCleanJurisdiction(doc.enactedBy) === selectedJurisdiction;

          // Era match
          const matchesYrEra = matchesEra(doc.year, selectedEra);

          // Keywords match
          const matchesKws = matchesKeywords(doc);

          return matchesSearch && matchesJur && matchesYrEra && matchesKws;
        })
        .sort(sortDocs);

      return (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 text-left">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              {activeDomain.toUpperCase()} &rarr; {activeTab.replace(/-/g, " ").toUpperCase()}
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Statutory {activeTab.replace(/-/g, " ")} Library
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab.replace(/-/g, " ")} by title, objective or jurisdiction...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-250 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          {/* Advanced Filter Panel */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Jurisdiction Select */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Jurisdiction / Region</label>
                <select
                  value={selectedJurisdiction}
                  onChange={(e) => setSelectedJurisdiction(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-250 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                >
                  <option value="All">All Jurisdictions</option>
                  <option value="Central">Central / Federal</option>
                  {uniqueJurisdictions.filter(j => j !== "Central").map(jur => (
                    <option key={jur} value={jur}>{jur}</option>
                  ))}
                </select>
              </div>

              {/* Enactment Era Select */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Enactment Era</label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-250 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                >
                  <option value="All">All Eras</option>
                  <option value="post-2020">Post-2020 (2020s)</option>
                  <option value="2010s">2010 - 2019 (2010s)</option>
                  <option value="2000s">2000 - 2009 (2000s)</option>
                  <option value="1990s">1990 - 1999 (1990s)</option>
                  <option value="pre-1990">Before 1990</option>
                </select>
              </div>

              {/* Sort By Select */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-250 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                >
                  <option value="title-asc">Title: A &rarr; Z</option>
                  <option value="title-desc">Title: Z &rarr; A</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="year-asc">Year: Oldest First</option>
                </select>
              </div>
            </div>

            {/* Keyword Quick Tags */}
            <div className="space-y-2 text-left pt-2 border-t border-slate-200/60">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Quick Topic Filters</label>
              <div className="flex flex-wrap gap-1.5">
                {availableKeywords.map(kw => {
                  const isSelected = selectedKeywords.includes(kw.id);
                  return (
                    <button
                      key={kw.id}
                      onClick={() => {
                        setSelectedKeywords(prev => 
                          prev.includes(kw.id) ? prev.filter(k => k !== kw.id) : [...prev, kw.id]
                        );
                      }}
                      className={`px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all border ${
                        isSelected 
                          ? "bg-blue-50 text-blue-650 border-blue-250 shadow-sm"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {kw.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Panel */}
            {(selectedJurisdiction !== "All" || selectedEra !== "All" || sortBy !== "title-asc" || selectedKeywords.length > 0 || searchQuery !== "") && (
              <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-200/40 text-left">
                <span className="text-slate-400 font-bold">
                  Filters active. Found <strong className="text-slate-700">{filteredDocs.length}</strong> of <strong className="text-slate-550">{docList.length}</strong> items.
                </span>
                <button
                  onClick={() => {
                    setSelectedJurisdiction("All");
                    setSelectedEra("All");
                    setSortBy("title-asc");
                    setSelectedKeywords([]);
                    setSearchQuery("");
                  }}
                  className="text-[10px] font-black text-rose-600 hover:text-rose-700 uppercase tracking-wider transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Document list */}
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-slate-450 bg-slate-50 border border-slate-150 rounded-2xl font-semibold">
              No documents found matching the selected filters.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocs.map((doc) => {
                const isExpanded = expandedActs[doc.id];
                return (
                  <div
                    key={doc.id}
                    className="border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all text-left"
                  >
                    <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          Enacted By: {doc.enactedBy} ({doc.year})
                        </span>
                        <h3 className="text-sm font-black text-slate-900">
                          {doc.title}
                        </h3>
                      </div>
                      <div className="flex gap-2 shrink-0 self-end md:self-auto">
                        <button
                          onClick={() => handleCopy(doc.id, `${doc.title}\n\nObjective: ${doc.objective}\n\nKey Provisions:\n${doc.keyProvisions.map(p => `- ${p}`).join("\n")}\n\nApplicability: ${doc.applicability}`)}
                          className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                          title="Copy reference info"
                        >
                          {copiedId === doc.id ? (
                            <Check className="w-4 h-4 text-emerald-600 animate-scale-in" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-550" />
                          )}
                        </button>
                        {doc.downloadUrl && (
                          <a
                            href={doc.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center text-slate-550 hover:text-blue-600"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => toggleActExpand(doc.id)}
                          className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-all"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block">
                            Legislative Objective
                          </span>
                          <p className="text-xs text-slate-655 font-semibold leading-relaxed">
                            {doc.objective}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block">
                            Key Compliance Provisions
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {doc.keyProvisions.map((provision, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <span>{provision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block">
                            Applicability Threshold
                          </span>
                          <p className="text-xs text-slate-600 font-bold leading-normal">
                            {doc.applicability}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // 3. Fallback Custom Screens (EHS Standards, Compliance Calendar, Webinars, Legal Opinions)
    if (activeTab === "ehs-standards") {
      return (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-black text-blue-650 uppercase tracking-widest">
              EHS &rarr; STANDARDS & ISO
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              EHS Compliance Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900">ISO 14001:2015</h3>
              <p className="text-xs text-slate-450 uppercase font-black tracking-wider">Environmental Management Systems (EMS)</p>
              <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                An international framework to manage environmental responsibilities, reduce resource wastage, lower carbon footprints, and assure continuous compliance.
              </p>
              <ul className="space-y-1 text-xs text-slate-600 font-semibold pl-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Environmental Policy Suite</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Life-cycle Impact Auditing</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Pollution Abatement Programs</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900">ISO 45001:2018</h3>
              <p className="text-xs text-slate-450 uppercase font-black tracking-wider">Occupational Health & Safety (OH&S)</p>
              <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                Specifies requirements for a comprehensive safety posture to protect the workforce, eliminate industrial hazards, and lower operational accident indices.
              </p>
              <ul className="space-y-1 text-xs text-slate-600 font-semibold pl-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Joint Safety Committees</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Hazard Identification Protocols</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Emergency Containment Plans</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "fcc-calendar") {
      const filings = [
        { name: "Form AOC-4 (Financial Statements filing)", due: "Within 30 days of AGM (typically Oct 30)", auth: "MCA", penalty: "₹100 per day of delay" },
        { name: "Form MGT-7 (Annual Return filing)", due: "Within 60 days of AGM (typically Nov 29)", auth: "MCA", penalty: "₹100 per day + Director disqualification risk" },
        { name: "GSTR-3B (Monthly Summary & Tax Payment)", due: "By 20th of the subsequent month", auth: "GSTN", penalty: "18% interest p.a. + ₹50 per day late fee" },
        { name: "GSTR-1 (Monthly Outward Supplies)", due: "By 11th of the subsequent month", auth: "GSTN", penalty: "₹50 per day late fee" },
        { name: "Form ADT-1 (Auditor Appointment)", due: "Within 15 days of AGM", auth: "MCA", penalty: "Standard late filing fees apply" },
        { name: "Income Tax Return (ITR-6)", due: "October 31 annually", auth: "IT Department", penalty: "Up to ₹10,000 late fee + interest" }
      ];

      return (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-black text-blue-650 uppercase tracking-widest">
              FCC &rarr; COMPLIANCE CALENDAR
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              FCC Statutory Compliance Calendar
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
            <table className="w-full text-xs font-semibold text-slate-700">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase text-[9px] font-black tracking-wider text-left">
                  <th className="p-4">Filing Requirement</th>
                  <th className="p-4">Statutory Due Date</th>
                  <th className="p-4">Authority</th>
                  <th className="p-4">Non-Compliance Penalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filings.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-black text-slate-900">{f.name}</td>
                    <td className="p-4 text-blue-600 font-bold">{f.due}</td>
                    <td className="p-4 text-slate-500 font-black">{f.auth}</td>
                    <td className="p-4 text-rose-600 font-bold">{f.penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "webinar") {
      const webinars = [
        { title: "Masterclass: Navigating the 4 New Labour Codes (2026)", speaker: "Govenics GRC Advisory Panel", duration: "1h 45m", desc: "A detailed analysis of wage modifications, social security thresholds, and factory operations rules in the consolidated regime." },
        { title: "Mitigating Contractor Co-Employment Liability", speaker: "Compliance Operations Director", duration: "1h 20m", desc: "A practical guide to contractor auditing, verification schemes, and shielding principal employers from contractor payroll defaults." },
        { title: "EHS Consent Renewals on Autopilot", speaker: "EHS Audit Lead", duration: "55m", desc: "How to leverage state online portals to obtain automated Green Category consent renewals under the Air and Water acts." }
      ];

      return (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              Resources &rarr; WEBINARS
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Statutory compliance webinars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webinars.map((web, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm hover:shadow-md transition-all">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[9px] text-blue-600 font-black uppercase tracking-wider inline-block">
                    Recorded Session
                  </span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug pt-1">{web.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Presenter: {web.speaker} | {web.duration}</p>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  {web.desc}
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center gap-1">
                  Watch Webinar <Play className="w-3 h-3 text-white fill-current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "legal-opinion") {
      const opinions = [
        { title: "EPFO Slabs under higher pension joint options", date: "March 2026", desc: "Detailed advisory on processing retrospectively revised EPFO employer contributions on salary exceeding the ₹15,000 threshold." },
        { title: "Gig worker status under Code on Social Security 2020", date: "January 2026", desc: "Legal position paper analyzing gig aggregator contribution liabilities (1% to 2% of annual turnover) and benefits administration." }
      ];

      return (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              Resources &rarr; LEGAL OPINION
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Expert Legal Advisory & Opinions
            </h2>
          </div>

          <div className="space-y-4">
            {opinions.map((op, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-black text-slate-900">{op.title}</h3>
                  <span className="text-[9px] text-slate-450 uppercase font-black tracking-wider">{op.date}</span>
                </div>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  {op.desc}
                </p>
                <button className="px-4 py-2 border border-blue-200 hover:bg-blue-50 text-blue-600 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download Advisory Document (PDF)
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. Default State-Specific Info Layouts (LWF, PT, Wages, etc.)
    const selectedData = sgrceLibraryData[activeTab];
    if (selectedData) {
      return (
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                Statutory Resources &rarr; {selectedData.title.toUpperCase()}
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
                {selectedData.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Select State:
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="h-10 px-3 rounded-lg border border-slate-250 bg-white text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Definition & Context
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  {selectedData.introduction}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  {selectedData.whatIsIt}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Scope & Applicability
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  {selectedData.scope}
                </p>
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-blue-900 font-bold flex items-start gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{selectedData.applicability}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 rounded-2xl p-6 shadow-md space-y-4">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-blue-400">
                    Active State Details
                  </span>
                  <h4 className="text-base font-black font-heading mt-0.5">
                    {selectedState} Slabs
                  </h4>
                </div>
                <hr className="border-slate-700" />
                
                <div className="space-y-4 text-xs font-bold">
                  {Object.entries(selectedData.data[selectedState] || {}).map(([key, val]) => {
                    if (key === "slabs" && Array.isArray(val)) {
                      return (
                        <div key={key} className="space-y-2.5">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Slab Rates
                          </span>
                          <div className="space-y-2">
                            {val.map((slab: any, idx: number) => (
                              <div key={idx} className="bg-slate-800/80 p-2.5 border border-slate-700/60 rounded-xl flex flex-col gap-1">
                                <span className="text-[10px] text-slate-450 leading-snug">{slab.range}</span>
                                <span className="text-xs text-white font-black">{slab.tax}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (key === "list" && Array.isArray(val)) {
                      return (
                        <div key={key} className="space-y-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                            Paid Holidays List
                          </span>
                          <div className="max-h-48 overflow-y-auto space-y-1.5 scrollbar-thin pl-1.5">
                            {val.map((item: string, idx: number) => (
                              <div key={idx} className="text-xs text-white font-black flex items-center gap-1.5 py-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    
                    const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
                    return (
                      <div key={key} className="flex flex-col gap-0.5 bg-slate-800/80 p-2.5 border border-slate-700/60 rounded-xl text-left">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">{formattedKey}</span>
                        <span className="text-xs text-white font-black">{val as string}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 text-left">
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Explore {activeTab.replace(/-/g, " ")}
          </h2>
        </div>
        <div className="p-8 bg-slate-50 border border-slate-150 rounded-3xl text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-450 mx-auto" />
          <h3 className="text-base font-black text-slate-800">
            Statutory {activeTab.replace(/-/g, " ")} Library
          </h3>
          <p className="text-xs text-slate-550 leading-relaxed font-semibold max-w-md mx-auto">
            Access Govenics' curated legislative alerts, PDF library, and notifications for the selected category. Browse historical logs, legal opinions, and corporate handbooks.
          </p>
          <div className="pt-2">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto">
              <Download className="w-3.5 h-3.5" /> Download Curated PDF Package
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen text-slate-700 pt-28 pb-20 select-none font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* E-Library Statutory Compliance Highlights Slider */}
          <div 
            className="w-full mb-8 relative border border-slate-200/85 rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-slate-900 to-slate-950 text-white min-h-[180px] sm:min-h-[160px] md:min-h-[140px] flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background glowing gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />
            
            {/* Watermark Icon in background */}
            <div className="absolute right-12 bottom-0 opacity-5 pointer-events-none translate-y-1/4">
              {(() => {
                const ActiveIcon = librarySlides[activeSlideIndex].icon;
                return <ActiveIcon className="w-64 h-64 text-white" />;
              })()}
            </div>

            {/* Slider Content */}
            <div className="w-full px-8 md:px-14 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-550/25 text-[9px] font-black uppercase tracking-widest text-blue-400">
                  {librarySlides[activeSlideIndex].badge}
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight font-heading">
                  {librarySlides[activeSlideIndex].title}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {librarySlides[activeSlideIndex].description}
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  const slide = librarySlides[activeSlideIndex];
                  navigateToSlideTab(slide.domain, slide.tab);
                }}
                className="px-5 py-2.5 bg-blue-650 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shrink-0 transition-all shadow-md shadow-blue-600/20 hover:scale-[1.02]"
              >
                {librarySlides[activeSlideIndex].actionLabel} &rarr;
              </button>
            </div>

            {/* Left/Right Navigation Chevrons */}
            <button
              type="button"
              onClick={() => {
                setActiveSlideIndex((prev) => (prev === 0 ? librarySlides.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/30 text-slate-400 hover:text-white transition-all z-20"
              title="Previous Update"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              type="button"
              onClick={() => {
                setActiveSlideIndex((prev) => (prev + 1) % librarySlides.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/30 text-slate-400 hover:text-white transition-all z-20"
              title="Next Update"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {librarySlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeSlideIndex === idx ? "bg-blue-550 w-3.5" : "bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sidebar Menu (1/3 width) - Replicating Image 3 Two-Column Layout */}
            <aside className="w-full lg:w-1/3 flex border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white self-stretch lg:self-auto min-h-[500px]">
              {/* Column 1: Domains Vertical Strip */}
              <div className="w-16 md:w-20 bg-slate-100/50 border-r border-slate-200 py-6 flex flex-col items-center gap-6 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 font-heading transform -rotate-0">
                  DOMAINS
                </span>
                <div className="flex flex-col gap-4 w-full px-2">
                  {[
                    { id: "lei", label: "LEI", desc: "Labour & Employment", icon: Scale },
                    { id: "ehs", label: "EHS", desc: "Environment, Health & Safety", icon: Leaf },
                    { id: "fcc", label: "FCC", desc: "Fiscal & Corporate", icon: Building }
                  ].map((dom) => {
                    const DomIcon = dom.icon;
                    const isActive = activeDomain === dom.id;
                    return (
                      <button
                        key={dom.id}
                        onClick={() => selectDomain(dom.id as "lei" | "ehs" | "fcc")}
                        title={dom.desc}
                        className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                        }`}
                      >
                        <DomIcon className="w-5 h-5" />
                        <span className="text-[8px] font-black uppercase tracking-widest">{dom.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Main Sidebar Category List */}
              <div className="flex-1 p-5 space-y-6 bg-slate-50/20 text-left">
                {/* Statutory Resources Section */}
                <div className="space-y-2">
                  <h3 className="text-[10px] font-black text-slate-450 uppercase tracking-widest text-left pl-2">
                    Statutory Resources
                  </h3>
                  <div className="flex flex-col gap-1 max-h-[350px] overflow-y-auto scrollbar-thin pr-1">
                    {getSidebarStructure(activeDomain).statutory.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => selectTab(item.id)}
                          className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center gap-2.5 ${
                            isActive
                              ? "bg-white text-blue-650 font-black border border-slate-200 shadow-sm"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-150/40 font-semibold"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                          <span className="text-xs tracking-wide truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Resources Section */}
                {getSidebarStructure(activeDomain).resources && (
                  <div className="space-y-2 border-t border-slate-200/80 pt-4">
                    <h3 className="text-[10px] font-black text-slate-450 uppercase tracking-widest text-left pl-2">
                      Resources
                    </h3>
                    <div className="flex flex-col gap-1">
                      {getSidebarStructure(activeDomain).resources.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => selectTab(item.id)}
                            className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center gap-2.5 ${
                              isActive
                                ? "bg-white text-blue-650 font-black border border-slate-200 shadow-sm"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-150/40 font-semibold"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                            <span className="text-xs tracking-wide truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Main Content Panel (2/3 width) */}
            <main className="w-full lg:w-2/3 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 min-h-[70vh] shadow-sm">
              {renderLibraryContent()}
            </main>

          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 border border-slate-700/60 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-scale-in text-left max-w-sm">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xs text-white font-extrabold tracking-wide">{toastMessage}</p>
        </div>
      )}
    </Layout>
  );
}

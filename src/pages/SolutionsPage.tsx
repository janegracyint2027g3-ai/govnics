// Solutions Page - Pre-Defined GRC Blueprints & AI Solutions Catalog
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  solutionsByIndustrySector,
  solutionsByComplianceDomain,
  solutionsBySolutionType,
  type SolutionItem
} from "@/data/solutions-data";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  Building2,
  Check,
  TrendingUp,
  Award,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  FileCheck,
  Landmark,
  Stethoscope,
  Calculator
} from "lucide-react";

// Spotlight Solutions for Carousel
const spotlightSolutions = [
  {
    id: "spotlight-rbi-dlg",
    sector: "BFSI & Fintech",
    title: "RBI Digital Lending & LSP Regulatory Architecture",
    badge: "Fintech Core",
    icon: Landmark,
    description: "End-to-end statutory blueprint for Lending Service Providers (LSPs) and Regulated Entities (REs). Includes Key Fact Statement (KFS) APR calculation engine, flow-through escrow compliance, and borrower privacy controls.",
    timeframe: "14 Days",
    frameworks: ["RBI Digital Lending Guidelines 2022", "PMLA Act", "PA/PG Directions"],
    metricsHighlight: "14-day turnaround for digital lender audit certification",
    deliverables: [
      "Automated KFS and multilingual borrower disclosure generator",
      "LSP third-party algorithmic and data localization due diligence pack",
      "Pre-configured RBI inspection audit trial room"
    ]
  },
  {
    id: "spotlight-hippa-iomt",
    sector: "Healthcare & Hospitals",
    title: "HIPAA & IoMT Connected Health Security Vault",
    badge: "Clinical Governance",
    icon: Stethoscope,
    description: "Zero-trust Protected Health Information (PHI) tokenization and Internet of Medical Things (IoMT) vulnerability shield for hospital chains and diagnostic networks.",
    timeframe: "21 Days",
    frameworks: ["HIPAA 45 CFR", "NABH 5th Edition", "DPDP Act 2023", "CDSCO"],
    metricsHighlight: "100% PHI breach containment and zero audit exceptions",
    deliverables: [
      "Automated PHI data discovery & cryptographic tokenization",
      "NABH digital clinical governance runbooks and mock drills",
      "24/7 IoMT connected medical device telemetry monitor"
    ]
  },
  {
    id: "spotlight-ai-radar",
    sector: "AI-Driven Advisory",
    title: "Autonomous Regulatory Gazette Radar",
    badge: "AI Intelligence",
    icon: Sparkles,
    description: "Continuous semantic scanning of 400+ Central and State legislative portals. Generates instant executive impact assessments and machine-redlined internal policy amendments.",
    timeframe: "Instant API",
    frameworks: ["400+ Central & State Gazettes", "MCA", "SEBI", "RBI"],
    metricsHighlight: "<15 minutes from Gazette notification to operational alert",
    deliverables: [
      "Real-time semantic gazette parsing & operational risk mapping",
      "Automated policy redline recommendations via LLM",
      "Executive board-ready compliance heatmaps"
    ]
  },
  {
    id: "spotlight-rera-escrow",
    sector: "Infrastructure & Construction",
    title: "RERA Multi-State Compliance & Escrow Automation",
    badge: "Real Estate Core",
    icon: Building2,
    description: "Turnkey statutory registers and automated milestone escrow reconciliations for real estate developers and EPC mega-infrastructure projects.",
    timeframe: "18 Days",
    frameworks: ["RERA Act 2016", "State RERA Rules", "BOCW Safety Act"],
    metricsHighlight: "45-day faster quarterly RERA portal approvals",
    deliverables: [
      "Automated CA & Architect certificate reconciliation engine",
      "Quarterly RERA progress filing generation with zero errors",
      "BOCW contractor labor safety and wage verification registers"
    ]
  },
  {
    id: "spotlight-dpdp-gateway",
    sector: "Data Privacy & Cybersecurity",
    title: "Automated DPDP Consent & DSAR Lifecycle Gateway",
    badge: "Privacy Engineering",
    icon: ShieldCheck,
    description: "Turnkey enterprise consent manager in 22 official Indian languages with automated Data Principal Right (DSAR) fulfillment under 48 hours.",
    timeframe: "30 Days",
    frameworks: ["Digital Personal Data Protection Act 2023", "ISO 27701", "CERT-In"],
    metricsHighlight: "100% adherence to 72-hour DSAR resolution windows",
    deliverables: [
      "Multilingual consent capture widgets and SDKs",
      "Automated data discovery & personal data cataloging",
      "72-hour CERT-In breach notification workflow orchestrator"
    ]
  }
];

export default function SolutionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Top-level dimension: "industry" | "domain" | "ai"
  const [dimensionType, setDimensionType] = useState<"industry" | "domain" | "ai">("industry");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("bfsi-fintech");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Spotlight carousel state
  const [activeSpotlight, setActiveSpotlight] = useState<number>(0);
  const [isSpotlightAuto, setIsSpotlightAuto] = useState<boolean>(true);

  // Selected solution modal
  const [selectedSolutionModal, setSelectedSolutionModal] = useState<SolutionItem | null>(null);

  // ROI Calculator states
  const [companyHeadcount, setCompanyHeadcount] = useState<number>(250);
  const [annualAuditsCount, setAnnualAuditsCount] = useState<number>(4);

  // Listen to searchParams and URL hash
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Enterprise GRC Pre-Defined Solutions & Regulatory Blueprints | GOVENICS";

    const sectorParam = searchParams.get("sector") || (window.location.hash ? window.location.hash.replace("#", "") : "");
    const domainParam = searchParams.get("domain");
    const typeParam = searchParams.get("type");

    if (sectorParam) {
      const cleanSector = sectorParam.toLowerCase();
      const matched = solutionsByIndustrySector.find(
        s => s.id === cleanSector || s.id.includes(cleanSector) || cleanSector.includes(s.id) ||
             (cleanSector.includes("health") && s.id.includes("health")) ||
             (cleanSector.includes("tech") && s.id.includes("tech")) ||
             (cleanSector.includes("infra") && s.id.includes("infra")) ||
             (cleanSector.includes("energy") && s.id.includes("energy"))
      );
      if (matched) {
        setDimensionType("industry");
        setSelectedCategoryId(matched.id);
      }
    } else if (domainParam) {
      const cleanDomain = domainParam.toLowerCase();
      const matched = solutionsByComplianceDomain.find(
        d => d.id === cleanDomain || d.id.includes(cleanDomain) || cleanDomain.includes(d.id)
      );
      if (matched) {
        setDimensionType("domain");
        setSelectedCategoryId(matched.id);
      }
    } else if (typeParam) {
      setDimensionType("ai");
      const matched = solutionsBySolutionType.find(
        t => t.id === typeParam || t.id.includes(typeParam)
      );
      if (matched) {
        setSelectedCategoryId(matched.id);
      }
    }
  }, [searchParams]);

  // Autoplay spotlight carousel
  useEffect(() => {
    if (!isSpotlightAuto) return;
    const interval = setInterval(() => {
      setActiveSpotlight(prev => (prev + 1) % spotlightSolutions.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSpotlightAuto]);

  // Active dataset
  const currentCategoryList = useMemo(() => {
    if (dimensionType === "industry") return solutionsByIndustrySector;
    if (dimensionType === "domain") return solutionsByComplianceDomain;
    return solutionsBySolutionType;
  }, [dimensionType]);

  const activeCategory = useMemo(() => {
    return currentCategoryList.find(c => c.id === selectedCategoryId) || currentCategoryList[0];
  }, [currentCategoryList, selectedCategoryId]);

  // Filtered solution items
  const filteredItems = useMemo(() => {
    return (activeCategory?.items || []).filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.deliverables || []).some(d => d.toLowerCase().includes(q)) ||
        (item.frameworks || []).some(f => f.toLowerCase().includes(q)) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Calculate ROI estimates
  const calculatedSavings = useMemo(() => {
    const hoursSaved = Math.round(annualAuditsCount * companyHeadcount * 0.45);
    const costSavedInLakhs = ((hoursSaved * 950) / 100000).toFixed(1);
    const riskReduction = Math.min(95, Math.round(60 + annualAuditsCount * 3.5));
    return { hoursSaved, costSavedInLakhs, riskReduction };
  }, [companyHeadcount, annualAuditsCount]);

  const currentSpotlightSlide = spotlightSolutions[activeSpotlight];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white pb-24">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/60 via-sky-50/40 to-transparent blur-3xl pointer-events-none" />

        {/* ── 1. HERO SECTION ── */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Turnkey Regulatory Blueprints &amp; AI Toolkits</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-['Sora',sans-serif]"
            >
              Pre-Defined Enterprise GRC Solutions &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Regulatory Blueprints</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Accelerate your regulatory readiness from months to days. Battle-tested compliance architectures, automated statutory registers, and turnkey AI governance assets tailored across 8 industry sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <a
                href="#solutions-catalog"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 inline-flex items-center gap-2 text-sm"
              >
                <span>Browse Solutions Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#roi-calculator"
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 py-3 rounded-xl border border-slate-300 transition-all text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Calculate Compliance ROI</span>
              </a>
              <Link
                to="/case-studies"
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-4 py-3 rounded-xl border border-emerald-200 transition-all text-sm inline-flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>View Case Studies &rarr;</span>
              </Link>
            </motion.div>
          </div>

          {/* ── 2. HIGH-IMPACT STATCARDS GRID ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {[
              {
                value: "65+",
                label: "Pre-Defined Blueprints",
                subtext: "Turnkey frameworks across 8 industry verticals",
                icon: Layers,
                color: "text-blue-600",
                badge: "Ready to Deploy"
              },
              {
                value: "14 Days",
                label: "Average Implementation Velocity",
                subtext: "From initial gap audit to audit-ready baseline",
                icon: Clock,
                color: "text-sky-600",
                badge: "3x Industry Speed"
              },
              {
                value: "100%",
                label: "Statutory Audit Defense",
                subtext: "Zero material findings across active clients",
                icon: ShieldCheck,
                color: "text-emerald-600",
                badge: "Guaranteed"
              },
              {
                value: "40%",
                label: "Operational Cost Reduction",
                subtext: "Through agentic AI & automated evidence harvesting",
                icon: TrendingUp,
                color: "text-purple-600",
                badge: "Measurable ROI"
              }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white border border-slate-200/90 hover:border-blue-500/50 p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {stat.badge}
                    </span>
                  </div>
                  <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color} font-['Sora',sans-serif] tracking-tight`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {stat.subtext}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 3. INTERACTIVE SPOTLIGHT SOLUTIONS SLIDER ── */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Architecture Spotlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif]">
                Flagship Enterprise Solutions
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSpotlightAuto(false);
                  setActiveSpotlight((prev) => (prev - 1 + spotlightSolutions.length) % spotlightSolutions.length);
                }}
                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs cursor-pointer"
                aria-label="Previous Spotlight"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-600 shadow-xs">
                <span className="text-blue-600 font-bold">{activeSpotlight + 1}</span>
                <span>/</span>
                <span>{spotlightSolutions.length}</span>
              </div>
              <button
                onClick={() => {
                  setIsSpotlightAuto(false);
                  setActiveSpotlight((prev) => (prev + 1) % spotlightSolutions.length);
                }}
                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs cursor-pointer"
                aria-label="Next Spotlight"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Spotlight Card */}
          <div
            onMouseEnter={() => setIsSpotlightAuto(false)}
            onMouseLeave={() => setIsSpotlightAuto(true)}
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/70 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpotlightSlide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {currentSpotlightSlide.sector}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      ⏱ Deploy Time: {currentSpotlightSlide.timeframe}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Sora',sans-serif] leading-tight">
                    {currentSpotlightSlide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {currentSpotlightSlide.description}
                  </p>

                  <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">
                      Core Implementation Deliverables:
                    </span>
                    {currentSpotlightSlide.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Regulatory Compliance Standards:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSpotlightSlide.frameworks.map((fw) => (
                        <span key={fw} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Callout Box */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Audited Efficiency Highlight
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-['Sora',sans-serif] my-3 leading-snug">
                      "{currentSpotlightSlide.metricsHighlight}"
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                        <span>Turnkey Audit Registers</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Included</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                        <span>API &amp; Connector Suite</span>
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Ready</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                        <span>External Auditor Read-Only Room</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Pre-Configured</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const matched = activeCategory.items.find(i => i.title.includes(currentSpotlightSlide.title.split(" ")[0])) || activeCategory.items[0];
                      setSelectedSolutionModal(matched);
                    }}
                    className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Architecture Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-slate-200">
              {spotlightSolutions.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setIsSpotlightAuto(false);
                    setActiveSpotlight(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSpotlight === idx ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. ALL SOLUTIONS DIRECTORY & FILTER NAVIGATION ── */}
        <section id="solutions-catalog" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="border-t border-slate-200 pt-12 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif]">
                  Pre-Defined Solutions Catalog
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore ready-to-deploy regulatory governance architectures and AI automation toolkits
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search solutions, laws or frameworks…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Three Dimension Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl w-fit mb-6">
              <button
                onClick={() => {
                  setDimensionType("industry");
                  setSelectedCategoryId(solutionsByIndustrySector[0].id);
                  setSearchParams({ sector: solutionsByIndustrySector[0].id });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  dimensionType === "industry"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>1. By Industry Sector (8)</span>
              </button>

              <button
                onClick={() => {
                  setDimensionType("domain");
                  setSelectedCategoryId(solutionsByComplianceDomain[0].id);
                  setSearchParams({ domain: solutionsByComplianceDomain[0].id });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  dimensionType === "domain"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>2. By Compliance Domain (8)</span>
              </button>

              <button
                onClick={() => {
                  setDimensionType("ai");
                  setSelectedCategoryId(solutionsBySolutionType[0].id);
                  setSearchParams({ type: solutionsBySolutionType[0].id });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  dimensionType === "ai"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3. AI-Driven Solution Types (4)</span>
              </button>
            </div>

            {/* Category Filter Pills (Horizontal Scroll) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-300">
              {currentCategoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    if (dimensionType === "industry") setSearchParams({ sector: cat.id });
                    else if (dimensionType === "domain") setSearchParams({ domain: cat.id });
                    else setSearchParams({ type: cat.id });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategoryId === cat.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategoryId === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {cat.items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Description Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Active Category
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-['Sora',sans-serif]">
                {activeCategory?.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeCategory?.description}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shrink-0 self-start sm:self-center">
              {filteredItems.length} Solutions Available
            </span>
          </div>

          {/* Solutions Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">No solutions found matching your search query.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm group hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {item.badge}
                      </span>
                      {item.metricsHighlight && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 truncate max-w-[170px]">
                          ✓ {item.metricsHighlight}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-['Sora',sans-serif] mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Included Deliverables:
                      </span>
                      {item.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{deliv}</span>
                        </div>
                      ))}
                    </div>

                    {/* Frameworks tags */}
                    {item.frameworks && item.frameworks.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <div className="flex flex-wrap gap-1">
                          {item.frameworks.map((fw) => (
                            <span key={fw} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                              {fw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Button */}
                  <div className="pt-5 mt-4 border-t border-slate-200">
                    <button
                      onClick={() => setSelectedSolutionModal(item)}
                      className="w-full py-2.5 px-3 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Implementation Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── 5. INTERACTIVE COMPLIANCE ROI CALCULATOR ── */}
        <section id="roi-calculator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive ROI Estimator</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif]">
                  Estimate Your Time &amp; Cost Savings with GOVENICS
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Turnkey compliance frameworks and continuous evidence collection eliminate the manual bottleneck of collecting screenshots and redlining statutory filings.
                </p>

                {/* Sliders */}
                <div className="space-y-5 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                      <span>Total Employees / Workforce Size</span>
                      <span className="text-blue-600 font-extrabold">{companyHeadcount} Team Members</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={2500}
                      step={50}
                      value={companyHeadcount}
                      onChange={(e) => setCompanyHeadcount(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>50 (Startup)</span>
                      <span>1,000 (Mid-Market)</span>
                      <span>2,500+ (Enterprise)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                      <span>Annual Statutory &amp; Regulatory Audits</span>
                      <span className="text-blue-600 font-extrabold">{annualAuditsCount} Audits/Year</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={annualAuditsCount}
                      onChange={(e) => setAnnualAuditsCount(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>1 Audit (Annual)</span>
                      <span>4 Audits (Quarterly)</span>
                      <span>12 Audits (Continuous)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Results Box */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block pb-3 border-b border-slate-200">
                  Estimated Annual Compliance Impact
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Audit Hours Saved
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-['Sora',sans-serif] mt-1">
                      {calculatedSavings.hoursSaved.toLocaleString()} hrs
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Saved from manual evidence hunts
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Cost Reduction
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-['Sora',sans-serif] mt-1">
                      ₹{calculatedSavings.costSavedInLakhs} Lakhs
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Estimated legal &amp; advisory savings
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Audit Readiness Index
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Zero non-compliance penalty shield
                    </span>
                  </div>
                  <span className="text-xl font-black text-blue-700 font-['Sora',sans-serif]">
                    {calculatedSavings.riskReduction}%
                  </span>
                </div>

                <Link
                  to="/contact"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Request Custom ROI Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. RAPID DEPLOYMENT METHODOLOGY ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Turnkey Implementation Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif] mt-1">
              4-Stage Rapid Deployment Methodology
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              How GOVENICS moves enterprises from compliance ambiguity to verified audit readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Rapid Gap Diagnostic",
                desc: "Autonomous semantic policy scan identifying missing statutory registers, expired consents, and audit gaps.",
                tag: "Days 1 - 3"
              },
              {
                step: "02",
                title: "Blueprint Customization",
                desc: "Tailoring pre-defined industry templates, risk registers, and statutory checklists to your corporate structure.",
                tag: "Days 4 - 8"
              },
              {
                step: "03",
                title: "Automated Telemetry",
                desc: "Plugging in continuous connectors to cloud, ERP, HRMS, and bank accounts for zero-effort evidence collection.",
                tag: "Days 9 - 12"
              },
              {
                step: "04",
                title: "Audit Certification",
                desc: "Opening pre-configured auditor read-only rooms and conducting synthetic regulatory inspection simulations.",
                tag: "Days 13 - 14"
              }
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-md transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-['Sora',sans-serif]">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {st.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Sora',sans-serif] mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. CROSS-LINK TO CASE STUDIES ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50 border border-blue-200 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-['Sora',sans-serif] mb-3">
              Want to See Real-World Audited Impact?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6">
              Review documented client case studies from leading organizations like Apollo Hospitals, DLF CyberCity, and Federal Bank.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/case-studies"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Explore 40+ Audited Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 text-sm transition-all inline-flex items-center gap-2 shadow-xs"
              >
                <span>Schedule Solution Architecture Call</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SOLUTION BLUEPRINT MODAL ── */}
        <AnimatePresence>
          {selectedSolutionModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedSolutionModal(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {selectedSolutionModal.badge}
                  </span>
                  {selectedSolutionModal.metricsHighlight && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {selectedSolutionModal.metricsHighlight}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Sora',sans-serif] mb-3">
                  {selectedSolutionModal.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {selectedSolutionModal.description}
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                      Included Deliverables &amp; Artifacts
                    </h5>
                    <div className="space-y-2">
                      {selectedSolutionModal.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSolutionModal.frameworks && selectedSolutionModal.frameworks.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                        Target Regulatory Mandates Covered
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSolutionModal.frameworks.map((fw) => (
                          <span key={fw} className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-blue-900 mb-1">
                      Ready to Deploy Architecture
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This pre-defined solution can be tailored to your IT infrastructure, cloud providers, and operational branches in under 14 business days.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedSolutionModal(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    to="/contact"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Request Implementation Kit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

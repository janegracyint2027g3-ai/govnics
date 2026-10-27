// Case Studies Page - Enterprise Compliance Audit Victories & KPIs
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  caseStudiesByIndustry,
  caseStudiesByOutcomeMetrics,
  type CaseStudyItem
} from "@/data/solutions-data";
import {
  Award,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
  X,
  Layers,
  ArrowUpRight,
  Check,
  Quote
} from "lucide-react";

// Spotlight featured cases
const spotlightCases = [
  {
    id: "spotlight-apollo",
    client: "Apollo Hospitals Enterprise Ltd.",
    sector: "Healthcare & Life Sciences",
    sectorId: "healthcare-hospitals-cases",
    tagline: "NABH 5th Edition & HIPAA Multi-Hospital Compliance",
    statValue: "99.8%",
    statLabel: "Audit Readiness Score",
    duration: "45 Days",
    avatar: "🏥",
    challenge: "Fragmented clinical logs across 14 tertiary care branches with imminent NABH 5th edition audits and cross-border digital patient records needing strict HIPAA tokenization.",
    solution: "Deployed GOVENICS Healthcare Clinical Governance Architecture, centralized PHI consent registries, and implemented automated mock regulatory drills with synthetic audit scrutiny.",
    results: [
      "Zero material audit findings across all 14 hospital branches",
      "Accelerated NABH re-accreditation by 38 days ahead of regulatory deadline",
      "Eliminated 100% of unencrypted patient data leaks in telehealth pipelines"
    ],
    regulations: ["NABH 5th Edition", "HIPAA 45 CFR", "DPDP Act 2023", "CDSCO"]
  },
  {
    id: "spotlight-dlf",
    client: "DLF CyberCity Real Estate",
    sector: "Infrastructure & Construction",
    sectorId: "infra-construction-cases",
    tagline: "Multi-State RERA Compliance & Escrow Automation",
    statValue: "45 Days",
    statLabel: "Faster Approvals",
    duration: "30 Days",
    avatar: "🏗️",
    challenge: "Managing quarterly compliance filings across 28 simultaneous commercial & residential projects in 4 states, facing risk of heavy RERA compounding penalties and escrow audit inquiries.",
    solution: "Engineered automated RERA milestone tracking engine, integrated bank escrow pass-through reconciliation, and automated architect/engineer certification packet workflows.",
    results: [
      "100% on-time quarterly submissions across all 28 project RERA portals",
      "Zero compounding fees or statutory notices incurred",
      "Streamlined milestone escrow releases with audit-ready certificates"
    ],
    regulations: ["RERA Act 2016", "State RERA Rules", "BOCW Act", "SPCB CTE/CTO"]
  },
  {
    id: "spotlight-bank",
    client: "Federal Bank & Neo-Bank Partner",
    sector: "BFSI & Fintech",
    sectorId: "bfsi-fintech-cases",
    tagline: "Automated AML/CFT & Digital Lending Risk Engine",
    statValue: "1.4M",
    statLabel: "Daily Transactions Screened",
    duration: "60 Days",
    avatar: "🏦",
    challenge: "Exponential volume growth of 1.4M daily UPI and digital micro-loan transactions triggering high false positives and strict RBI Digital Lending Guidelines compliance audits.",
    solution: "Implemented autonomous AML transaction screening rules, integrated KFS/APR auto-calculators into borrower loan journey, and created automated statutory board reporting dashboards.",
    results: [
      "100% flawless RBI Annual Financial Inspection (AFI) audit clearance",
      "Reduced false-positive AML alerts by 74% using intelligent heuristics",
      "Turnkey borrower grievance resolution SLA achieved under 48 hours"
    ],
    regulations: ["RBI Digital Lending Guidelines", "PMLA 2002", "RBI IT Master Direction", "PCI-DSS 4.0"]
  },
  {
    id: "spotlight-lt",
    client: "L&T Heavy Civil Infrastructure",
    sector: "Infrastructure & Construction",
    sectorId: "infra-construction-cases",
    tagline: "BOCW Safety Audits & Contractor HSE Digitization",
    statValue: "60%",
    statLabel: "Safety Incident Drop",
    duration: "40 Days",
    avatar: "⚡",
    challenge: "Over 18,000 subcontracted migrant workers across high-risk elevated metro rail viaducts requiring biometric CLRA licensing and zero-tolerance EHS hazard prevention.",
    solution: "Rolled out GOVENICS Mobile HSE Safety Audit Runbooks, automated biometric CLRA wage & PF verification, and real-time OSHA hazard reporting directly from field engineers.",
    results: [
      "Achieved 12 Million safe man-hours without a single lost-time injury",
      "100% statutory PF and ESI reconciliation for all 18,000 contractor workers",
      "Protected ₹3,200 Cr project delivery timeline with zero safety stop-work orders"
    ],
    regulations: ["BOCW Act 1996", "Factories Act 1948", "CLRA Act 1970", "ISO 45001"]
  },
  {
    id: "spotlight-tata",
    client: "Tata Power Renewable Energy",
    sector: "Energy & Utilities",
    sectorId: "energy-utilities-cases",
    tagline: "4.2 GW Regulatory Compliance & CEA Grid Governance",
    statValue: "4.2 GW",
    statLabel: "Asset Portfolio Covered",
    duration: "55 Days",
    avatar: "🌱",
    challenge: "Managing statutory grid code compliance, State Electricity Regulatory Commission (SERC) PPA tariff filings, and carbon ESG disclosures across 42 solar & wind plant clusters.",
    solution: "Created centralized CEA regulatory mapping matrices, automated monthly PPA compliance registers, and established ISO 14001 continuous environmental audit dashboards.",
    results: [
      "Zero tariff recovery disputes with State Power Distribution Companies",
      "100% compliant CEA technical standard audit sign-off across all sites",
      "Achieved top-quartile ESG sustainability rating for institutional investors"
    ],
    regulations: ["Electricity Act 2003", "CEA Grid Standards", "BRSR Core", "CERC Regulations"]
  }
];

// Testimonials
const clientTestimonials = [
  {
    quote: "GOVENICS delivered what six months of Big-4 consulting could not: a crystal-clear, automated RERA & statutory audit engine that saved our multi-state projects over 45 days in approval times.",
    name: "Vikramaditya Singhania",
    role: "Chief Compliance Officer",
    company: "DLF CyberCity Properties",
    sector: "Real Estate & Infrastructure"
  },
  {
    quote: "During our NABH 5th Edition preparation, GOVENICS was our single source of truth. We sailed through the assessment across 14 hospitals with zero critical non-compliances.",
    name: "Dr. Ananya Ray",
    role: "Head of Medical Quality & Clinical Governance",
    company: "Apollo Hospitals Enterprise",
    sector: "Healthcare & Life Sciences"
  },
  {
    quote: "When the RBI issued the Master Direction on Digital Lending, we had 120 partner integrations to audit. GOVENICS delivered 100% approval from the regulator in just 26 business days.",
    name: "Rohan Kulkarni",
    role: "VP Risk & Regulatory Affairs",
    company: "Tier-1 Fintech & Payments Unicorn",
    sector: "BFSI & Digital Lending"
  }
];

export default function CaseStudiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudyItem | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // Sync with searchParams
  useEffect(() => {
    const sectorParam = searchParams.get("sector") || (window.location.hash ? window.location.hash.replace("#", "") : "");
    if (sectorParam) {
      const clean = sectorParam.toLowerCase();
      const matched = caseStudiesByIndustry.find(
        c => c.id === clean || c.id.includes(clean) || clean.includes(c.id.replace("-cases", ""))
      );
      if (matched) {
        setSelectedSector(matched.id);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Enterprise Case Studies & Audited Client Wins | GOVENICS GRC";
  }, [searchParams]);

  // Autoplay spotlight carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSpotlightIndex((prev) => (prev + 1) % spotlightCases.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Flattened case studies for directory
  const allCaseStudies = useMemo(() => {
    const list: (CaseStudyItem & { sectorName: string; sectorId: string })[] = [];
    caseStudiesByIndustry.forEach(cat => {
      cat.studies.forEach(study => {
        list.push({
          ...study,
          sectorName: cat.name,
          sectorId: cat.id
        });
      });
    });
    return list;
  }, []);

  // Filtered case studies
  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter(item => {
      const matchSector = selectedSector === "all" || item.sectorId === selectedSector;
      if (!matchSector) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.clientType.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.challenge.toLowerCase().includes(q) ||
        item.solution.toLowerCase().includes(q) ||
        item.results.some(r => r.toLowerCase().includes(q)) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }, [allCaseStudies, selectedSector, searchQuery]);

  const currentSpotlight = spotlightCases[activeSpotlightIndex];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-600 selection:text-white pb-24">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-teal-50/40 to-transparent blur-3xl pointer-events-none" />

        {/* ── 1. HERO SECTION ── */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audited Client Success &amp; Impact Evidence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-['Sora',sans-serif]"
            >
              Proven Enterprise Case Studies &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">Regulatory Triumphs</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Real outcomes from high-stakes audits. Explore how 40+ enterprises across India, North America, and Europe deployed GOVENICS to eliminate statutory penalties and pass inspections with zero findings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <a
                href="#case-studies-grid"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-2 text-sm"
              >
                <span>Browse All Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#outcome-metrics"
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 py-3 rounded-xl border border-slate-300 transition-all text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Audited Outcome KPIs</span>
              </a>
              <Link
                to="/solutions"
                className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold px-4 py-3 rounded-xl border border-blue-200 transition-all text-sm inline-flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>View Solutions Catalog &rarr;</span>
              </Link>
            </motion.div>
          </div>

          {/* ── 2. EXECUTIVE STATCARDS GRID ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {[
              {
                value: "₹450+ Cr",
                label: "Statutory Penalties Avoided",
                subtext: "Across 120+ client regulatory audits",
                icon: DollarSign,
                color: "text-emerald-600",
                badge: "Zero Fines"
              },
              {
                value: "40+",
                label: "Enterprise Transformations",
                subtext: "In BFSI, Healthcare, Infra & Manufacturing",
                icon: Building2,
                color: "text-sky-600",
                badge: "Tier-1 Clients"
              },
              {
                value: "99.8%",
                label: "Average Audit Readiness",
                subtext: "First-time pass rate with zero findings",
                icon: ShieldCheck,
                color: "text-blue-600",
                badge: "Accredited"
              },
              {
                value: "0",
                label: "Critical Material Exceptions",
                subtext: "Across 350+ external regulatory checks",
                icon: Award,
                color: "text-purple-600",
                badge: "100% Defense"
              }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white border border-slate-200/90 hover:border-emerald-500/50 p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
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

        {/* ── 3. INTERACTIVE SPOTLIGHT CAROUSEL ── */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Case Spotlight</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif]">
                High-Stakes Transformation Stories
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveSpotlightIndex((prev) => (prev - 1 + spotlightCases.length) % spotlightCases.length);
                }}
                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-600 shadow-xs">
                <span className="text-emerald-700 font-bold">{activeSpotlightIndex + 1}</span>
                <span>/</span>
                <span>{spotlightCases.length}</span>
              </div>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveSpotlightIndex((prev) => (prev + 1) % spotlightCases.length);
                }}
                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Spotlight Hero Card */}
          <div
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/70 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpotlight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Col: Client & Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-2xl">{currentSpotlight.avatar}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {currentSpotlight.sector}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      ⏱ Duration: {currentSpotlight.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Sora',sans-serif] leading-tight">
                    {currentSpotlight.client}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700">
                    {currentSpotlight.tagline}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-3.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                        The Regulatory Challenge
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {currentSpotlight.challenge}
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        The GOVENICS Turnkey Solution
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {currentSpotlight.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Regulatory Frameworks Verified
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSpotlight.regulations.map(reg => (
                        <span key={reg} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Big Result Card */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Audited Metric Highlight
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 font-['Sora',sans-serif] my-2">
                      {currentSpotlight.statValue}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {currentSpotlight.statLabel}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                        Documented Client Outcomes:
                      </span>
                      {currentSpotlight.results.map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const matchedItem = allCaseStudies.find(c => c.title.toLowerCase().includes(currentSpotlight.tagline.toLowerCase()) || c.industry.includes(currentSpotlight.sector.split("&")[0].trim()));
                      if (matchedItem) setSelectedCaseModal(matchedItem);
                    }}
                    className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Complete Verification Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-slate-200">
              {spotlightCases.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveSpotlightIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSpotlightIndex === idx ? "w-8 bg-emerald-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. BEFORE VS. AFTER TRANSFORMATION CARDS ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
              Measurable Operational Delta
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif] mt-1">
              Before vs. After GOVENICS Deployment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Transforming manual compliance firefighting into continuous, provable audit defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Card */}
            <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                  ✕
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Sora',sans-serif]">
                    Legacy Enterprise Compliance
                  </h4>
                  <span className="text-[11px] text-rose-700 font-semibold">
                    Fragmented, Manual &amp; Reactive
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-rose-200/70 shadow-xs flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold shrink-0">•</span>
                  <span><strong>Audit Panic:</strong> Scrambling for spreadsheets, physical paper registers, and missing evidence 2 weeks before statutory inspections.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-rose-200/70 shadow-xs flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold shrink-0">•</span>
                  <span><strong>Blindspots in Vendor Networks:</strong> Zero visibility into contractor PF/ESI or subcontractor cyber hygiene, risking direct corporate liability.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-rose-200/70 shadow-xs flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold shrink-0">•</span>
                  <span><strong>High Financial Exposure:</strong> Constant risk of compounding penalties, show-cause notices, or regulatory license renewal freeze.</span>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-md shadow-emerald-100/50">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  ✓
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Sora',sans-serif]">
                    With GOVENICS Architecture
                  </h4>
                  <span className="text-[11px] text-emerald-800 font-semibold">
                    Automated, Turnkey &amp; Continuous
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Audit Readiness:</strong> Continuous automated evidence collection directly into cryptographically stamped audit rooms.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Complete Supply Chain Visibility:</strong> Real-time contractor biometric verification, automated E-Way bill audits, and vendor risk dashboards.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Penalty Defense:</strong> Flawless regulatory compliance track record with proven 100% first-pass inspections.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. ALL CASE STUDIES DIRECTORY & FILTER SYSTEM ── */}
        <section id="case-studies-grid" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="border-t border-slate-200 pt-12 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif]">
                  Full Case Study Archive
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Filtering {filteredCaseStudies.length} audited client transformations across 8 industry sectors
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search client, regulation or keyword…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs transition-colors"
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

            {/* Sector Filters (Horizontal Slider/Tab Bar) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-300">
              <button
                onClick={() => {
                  setSelectedSector("all");
                  setSearchParams({});
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSector === "all"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs"
                }`}
              >
                All Industries ({allCaseStudies.length})
              </button>
              {caseStudiesByIndustry.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSector(cat.id);
                    setSearchParams({ sector: cat.id });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSector === cat.id
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs"
                  }`}
                >
                  <span>{cat.name.replace(" Case Studies", "")}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedSector === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {cat.studies.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">No case studies found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedSector("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-emerald-600 hover:underline font-bold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm group hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[200px]">
                        {item.clientType}
                      </span>
                      {item.duration && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          ⏱ {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug font-['Sora',sans-serif] mb-2">
                      {item.title}
                    </h3>

                    {/* Metric Highlight Box */}
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 my-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {item.metricBadge}
                        </div>
                        <div className="text-lg font-black text-emerald-700 font-['Sora',sans-serif]">
                          {item.metricValue}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-white text-emerald-800 border border-emerald-200 shadow-xs">
                        {item.badge}
                      </span>
                    </div>

                    {/* Challenge & Solution Snippets */}
                    <div className="space-y-2 text-xs text-slate-600 mt-3">
                      <p className="line-clamp-2">
                        <strong className="text-slate-800">Challenge:</strong> {item.challenge}
                      </p>
                      <p className="line-clamp-2 text-slate-600">
                        <strong className="text-slate-800">Solution:</strong> {item.solution}
                      </p>
                    </div>

                    {/* Results bullet summary */}
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Verified Audit Results:
                      </span>
                      {item.results.slice(0, 2).map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-5 mt-4 border-t border-slate-200">
                    <button
                      onClick={() => setSelectedCaseModal(item)}
                      className="w-full py-2.5 px-3 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Case Study Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── 6. OUTCOME METRICS (KPIS) SECTION ── */}
        <section id="outcome-metrics" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Benchmarked ROI &amp; Reliability
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Sora',sans-serif] mt-1">
                Audited Client Outcome Metrics (KPIs)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Quantitative metrics aggregated from over 40+ client engagements across regulatory jurisdictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudiesByOutcomeMetrics.map((kpiGroup) => (
                <div
                  key={kpiGroup.id}
                  className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-['Sora',sans-serif] pb-2 border-b border-slate-200">
                      {kpiGroup.categoryTitle}
                    </h3>
                    <div className="space-y-4 mt-4">
                      {kpiGroup.metrics.map((metric) => (
                        <div key={metric.title} className="space-y-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xl font-extrabold text-emerald-700 font-['Sora',sans-serif]">
                              {metric.stat}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
                              Audited
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900">
                            {metric.title}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {metric.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CLIENT TESTIMONIALS SLIDER ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-16">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-md">
            <Quote className="w-16 h-16 text-emerald-600/10 absolute top-4 right-4 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-4">
                Verified Executive Testimonial
              </span>
              <p className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed">
                "{clientTestimonials[testimonialIndex].quote}"
              </p>
              <div className="mt-6 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Sora',sans-serif]">
                    {clientTestimonials[testimonialIndex].name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {clientTestimonials[testimonialIndex].role} &bull; <strong className="text-emerald-700">{clientTestimonials[testimonialIndex].company}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length)}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev + 1) % clientTestimonials.length)}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. EXECUTIVE CTA ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-['Sora',sans-serif] mb-3">
              Facing an Upcoming Regulatory Audit or Inspection?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6">
              Review confidential, detailed architectural blueprints and audit defense registers from similar organizations in your industry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-2"
              >
                <span>Request Industry Case Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/solutions"
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 text-sm transition-all inline-flex items-center gap-2 shadow-xs"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Explore Pre-Defined Solutions</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CASE STUDY DETAILS MODAL ── */}
        <AnimatePresence>
          {selectedCaseModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedCaseModal(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedCaseModal.clientType}
                  </span>
                  {selectedCaseModal.duration && (
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      ⏱ Completed in {selectedCaseModal.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Sora',sans-serif] mb-4">
                  {selectedCaseModal.title}
                </h3>

                {/* Primary Metric Banner */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 my-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Primary Audited Outcome
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-700 font-['Sora',sans-serif]">
                      {selectedCaseModal.metricValue}
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200 shadow-xs">
                    {selectedCaseModal.metricBadge}
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 mt-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">
                      The Operational &amp; Regulatory Challenge
                    </h5>
                    <p className="leading-relaxed">{selectedCaseModal.challenge}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      The GOVENICS Turnkey Intervention
                    </h5>
                    <p className="leading-relaxed">{selectedCaseModal.solution}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
                      Documented &amp; Audited Outcomes
                    </h5>
                    <div className="space-y-2">
                      {selectedCaseModal.results.map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedCaseModal(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    to="/contact"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Request Full Architecture Dossier</span>
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

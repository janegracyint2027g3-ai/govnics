import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { 
  solutionsByIndustrySector, 
  solutionsByComplianceDomain, 
  solutionsBySolutionType,
  caseStudiesByIndustry,
  caseStudiesByComplianceDomain,
  caseStudiesByOutcomeMetrics
} from "@/data/solutions-data";
import {
  ShieldCheck, ArrowRight, CheckCircle2, Search,
  Sparkles, Building2, Check,
  TrendingUp, Award, Clock
} from "lucide-react";

export default function SolutionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("tab") === "cases" ? "cases" : searchParams.get("tab") === "kpis" ? "kpis" : "solutions";
  const [activeMode, setActiveMode] = useState<"solutions" | "cases" | "kpis">(initialMode);
  
  // Solutions filters
  const [solutionCategoryType, setSolutionCategoryType] = useState<"industry" | "domain" | "ai">("industry");
  const [selectedSolutionCatId, setSelectedSolutionCatId] = useState<string>("bfsi-fintech");
  
  // Case Studies filters
  const [caseCategoryType, setCaseCategoryType] = useState<"industry" | "domain">("industry");
  const [selectedCaseCatId, setSelectedCaseCatId] = useState<string>("bfsi-fintech-cases");
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Enterprise Solutions & Proven Case Studies | GOVENICS GRC";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Explore GOVENICS pre-defined consulting assets, compliance domain blueprints, AI-driven automation solutions, and proven enterprise case studies across BFSI, Manufacturing, Healthcare, IT, and more.";
    if (metaDesc) metaDesc.setAttribute("content", descContent);
  }, []);

  // Sync mode with query params
  const handleModeChange = (mode: "solutions" | "cases" | "kpis") => {
    setActiveMode(mode);
    setSearchParams({ tab: mode });
  };

  // Get active dataset for Solutions
  const currentSolutionsCategories = 
    solutionCategoryType === "industry" ? solutionsByIndustrySector :
    solutionCategoryType === "domain" ? solutionsByComplianceDomain :
    solutionsBySolutionType;

  // Selected solution category
  const activeSolutionCategory = 
    currentSolutionsCategories.find(c => c.id === selectedSolutionCatId) || currentSolutionsCategories[0];

  // Filtered solution items based on search
  const filteredSolutionItems = (activeSolutionCategory?.items || []).filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.deliverables || []).some(d => d.toLowerCase().includes(q)) ||
      (item.frameworks || []).some(f => f.toLowerCase().includes(q));
  });

  // Get active dataset for Case Studies
  const currentCaseCategories = 
    caseCategoryType === "industry" ? caseStudiesByIndustry :
    caseStudiesByComplianceDomain;

  // Selected case category
  const activeCaseCategory = 
    currentCaseCategories.find(c => c.id === selectedCaseCatId) || currentCaseCategories[0];

  // Filtered case study items based on search
  const filteredCaseItems = (activeCaseCategory?.studies || []).filter(study => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return study.title.toLowerCase().includes(q) ||
      study.challenge.toLowerCase().includes(q) ||
      study.solution.toLowerCase().includes(q) ||
      study.clientType.toLowerCase().includes(q) ||
      study.results.some(r => r.toLowerCase().includes(q));
  });

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen text-slate-800">

        {/* ── HERO BANNER ────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pt-24 pb-20 px-6 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10 space-y-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Enterprise Consulting Assets & Impact Evidence</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
                Pre-Defined GRC Solutions & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">Client Case Studies</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                Accelerate compliance posture with turnkey regulatory toolkits, AI-driven automation runbooks, and audited evidence from 40+ enterprise client transformations.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {[
                { label: "Pre-defined Assets", value: "65+", desc: "Turnkey toolkits & frameworks" },
                { label: "Industry Sectors", value: "8 Sectors", desc: "Specialized regulatory matrices" },
                { label: "Compliance Domains", value: "8 Domains", desc: "Central, State, AI & Global" },
                { label: "Audited Track Record", value: "100%", desc: "Zero critical audit remarks" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white font-heading">{stat.value}</div>
                  <div className="text-xs font-bold text-blue-300">{stat.label}</div>
                  <div className="text-[11px] text-slate-400">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Main Mode Toggle Buttons */}
            <div className="pt-4 flex flex-wrap gap-2.5">
              <button
                onClick={() => handleModeChange("solutions")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  activeMode === "solutions"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50"
                    : "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>1. Solutions (Pre-defined Assets)</span>
              </button>

              <button
                onClick={() => handleModeChange("cases")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  activeMode === "cases"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50"
                    : "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>2. Case Studies (Client Success)</span>
              </button>

              <button
                onClick={() => handleModeChange("kpis")}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  activeMode === "kpis"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50"
                    : "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>3. Outcome Metrics (KPIs)</span>
              </button>
            </div>
          </div>
        </section>


        {/* ── SEARCH & SUB-NAVIGATION BAR ───────────────────────────── */}
        <section className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
          <div className="container mx-auto max-w-6xl px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Mode-Specific Sub-tabs */}
            {activeMode === "solutions" && (
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => {
                    setSolutionCategoryType("industry");
                    setSelectedSolutionCatId(solutionsByIndustrySector[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    solutionCategoryType === "industry" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Industry Sector ({solutionsByIndustrySector.length})
                </button>
                <button
                  onClick={() => {
                    setSolutionCategoryType("domain");
                    setSelectedSolutionCatId(solutionsByComplianceDomain[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    solutionCategoryType === "domain" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Compliance Domain ({solutionsByComplianceDomain.length})
                </button>
                <button
                  onClick={() => {
                    setSolutionCategoryType("ai");
                    setSelectedSolutionCatId(solutionsBySolutionType[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    solutionCategoryType === "ai" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Solution Type (AI-Driven)
                </button>
              </div>
            )}

            {activeMode === "cases" && (
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => {
                    setCaseCategoryType("industry");
                    setSelectedCaseCatId(caseStudiesByIndustry[0].id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    caseCategoryType === "industry" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Industry Sector ({caseStudiesByIndustry.length})
                </button>
                <button
                  onClick={() => {
                    setCaseCategoryType("domain");
                    setSelectedCaseCatId(caseStudiesByComplianceDomain[0].id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    caseCategoryType === "domain" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Compliance Domain ({caseStudiesByComplianceDomain.length})
                </button>
              </div>
            )}

            {activeMode === "kpis" && (
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Audited Key Performance Indicators & Outcomes
              </div>
            )}

            {/* Right: Quick Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeMode === "solutions" ? "Search solutions, frameworks..." : "Search case studies, metrics..."}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </section>


        {/* ── SECTION 1: SOLUTIONS MODE ─────────────────────────────────── */}
        {activeMode === "solutions" && (
          <div className="container mx-auto max-w-6xl px-6 py-12">
            
            {/* Category Pills Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
              {currentSolutionsCategories.map((cat) => {
                const isSelected = activeSolutionCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSolutionCatId(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 border ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Header */}
            <div className="mt-4 mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10.5px] font-black text-blue-600 uppercase tracking-widest block">
                  {solutionCategoryType === "industry" ? "Industry Sector Blueprint" : solutionCategoryType === "domain" ? "Statutory Compliance Domain" : "AI Autonomous Architecture"}
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  {activeSolutionCategory?.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
                  {activeSolutionCategory?.description}
                </p>
              </div>

              <Link
                to="/contact#book-strategy-session"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 shrink-0"
              >
                <span>Request Asset Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Solution Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSolutionItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-lg">
                        {item.badge}
                      </span>
                      {item.metricsHighlight && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{item.metricsHighlight}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1.5">
                        {item.description}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Core Consulting Deliverables
                      </span>
                      <div className="space-y-1.5">
                        {item.deliverables.map((deliv, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks Pills */}
                    {item.frameworks && item.frameworks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.frameworks.map((fw, fidx) => (
                          <span key={fidx} className="text-[9.5px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200/60">
                            {fw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/contact#book-strategy-session"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group/btn"
                    >
                      <span>Deploy this Solution</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-medium">Turnkey SLA Dispatch</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredSolutionItems.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-700">No solutions matched "{searchQuery}"</h4>
                <p className="text-xs text-slate-400">Try searching for keywords like "GST", "DPDP", "ISO", or "Safety".</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}


        {/* ── SECTION 2: CASE STUDIES MODE ──────────────────────────────── */}
        {activeMode === "cases" && (
          <div className="container mx-auto max-w-6xl px-6 py-12">
            
            {/* Category Pills Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
              {currentCaseCategories.map((cat) => {
                const isSelected = activeCaseCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCaseCatId(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 border ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {cat.studies.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Header */}
            <div className="mt-4 mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10.5px] font-black text-indigo-600 uppercase tracking-widest block">
                  Audited Client Evidence
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  {activeCaseCategory?.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Direct client outcomes, regulatory remediation speed, and quantifiable risk elimination.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl">
                  ✓ Verified Results
                </span>
              </div>
            </div>

            {/* Case Studies Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCaseItems.map((study) => (
                <div
                  key={study.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between group space-y-5"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg uppercase tracking-wide">
                        {study.badge}
                      </span>
                      <div className="flex items-center gap-2">
                        {study.duration && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{study.duration}</span>
                          </span>
                        )}
                        <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-0.5 rounded-md">
                          {study.metricValue}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading group-hover:text-indigo-600 transition-colors">
                        {study.title}
                      </h3>
                      <div className="text-[11px] font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>Client Profile: {study.clientType}</span>
                      </div>
                    </div>

                    {/* Challenge & Solution Block */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl space-y-1">
                        <span className="text-[9.5px] font-black uppercase text-red-700 tracking-wider block">
                          The Regulatory Vulnerability
                        </span>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1">
                        <span className="text-[9.5px] font-black uppercase text-blue-700 tracking-wider block">
                          GOVENICS Advisory Intervention
                        </span>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Measurable Results Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Verified Outcome Results
                      </span>
                      <div className="space-y-1.5">
                        {study.results.map((res, ridx) => (
                          <div key={ridx} className="flex items-start gap-2 text-xs text-slate-800 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/contact#book-strategy-session"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors group/btn"
                    >
                      <span>Discuss a Similar Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-medium">Protected under NDA</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredCaseItems.length === 0 && (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-700">No case studies matched "{searchQuery}"</h4>
                <p className="text-xs text-slate-400">Try adjusting your search keywords.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}


        {/* ── SECTION 3: OUTCOME METRICS (KPIs) MODE ────────────────────── */}
        {activeMode === "kpis" && (
          <div className="container mx-auto max-w-6xl px-6 py-12 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                Proven Client Return on Governance (RoG)
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading">
                Quantifiable Outcome Metrics (KPIs)
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Compliance is no longer an administrative cost center. Discover how GOVENICS consulting solutions protect operating margins, accelerate revenue, and build unbreakable institutional trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudiesByOutcomeMetrics.map((group) => (
                <div key={group.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="border-b border-slate-100 pb-4 space-y-1">
                    <span className="text-[10.5px] font-black text-blue-600 uppercase tracking-wider block">
                      Performance Dimension
                    </span>
                    <h3 className="text-xl font-black text-slate-900 font-heading">
                      {group.categoryTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {group.metrics.map((metric, midx) => (
                      <div key={midx} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900">{metric.title}</span>
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                              {metric.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {metric.description}
                          </p>
                          <div className="text-[10px] text-slate-400 font-semibold pt-1">
                            Client Base: {metric.proofClient}
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0">
                          <div className="text-base sm:text-lg font-black text-indigo-700 font-heading bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5 inline-block">
                            {metric.stat}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Benchmark Callout */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-xl sm:text-2xl font-black font-heading">
                  Benchmark Your Organization's Compliance KPIs
                </h3>
                <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed font-medium">
                  Schedule a 30-minute structured strategy session. We will evaluate your sector's regulatory velocity, identify latent penalty exposures, and share relevant peer case studies.
                </p>
              </div>

              <Link
                to="/contact#book-strategy-session"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:scale-[1.02] shrink-0"
              >
                <span>Book Strategy Session Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}


        {/* ── BOTTOM GLOBAL STRATEGY SESSION CTA ───────────────────────── */}
        <section className="bg-slate-900 text-white py-16 px-6 border-t border-slate-800">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Ready to Deploy Pre-Defined Consulting Assets?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                Connect directly with our senior advisory partners. We deliver turnkey regulatory toolkits, automated compliance architectures, and full audit defense.
              </p>
            </div>
            <div>
              <Link
                to="/contact#book-strategy-session"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02]"
              >
                <span>Book a Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

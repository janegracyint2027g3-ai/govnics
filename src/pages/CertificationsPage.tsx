import React, { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Search,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  X,
  Send,
  HelpCircle
} from "lucide-react";
import {
  certificationsDirectory,
  CATEGORIES_LIST,
  type CertificationItem
} from "@/data/certificationsData";

export const CertificationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tier1Only, setTier1Only] = useState<boolean>(false);
  const [activeModalItem, setActiveModalItem] = useState<CertificationItem | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState<boolean>(false);
  const [consultItem, setConsultItem] = useState<CertificationItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Filtered certifications
  const filteredItems = useMemo(() => {
    return certificationsDirectory.filter((item) => {
      // Category match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Tier-1 only filter
      if (tier1Only && !item.isFeatured) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchShort = item.shortName.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchFrameworks = item.frameworks.some((f) => f.toLowerCase().includes(query));
        const matchIndustries = item.applicableIndustries.some((ind) => ind.toLowerCase().includes(query));
        return matchName || matchShort || matchDesc || matchFrameworks || matchIndustries;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, tier1Only]);

  // Featured 18 core logos for the continuous marquee
  const marqueeLogos = useMemo(() => {
    return certificationsDirectory.filter((item) => item.isFeatured);
  }, []);

  const handleOpenConsult = (item: CertificationItem) => {
    setConsultItem(item);
    setConsultModalOpen(true);
    setFormSubmitted(false);
  };

  return (
    <Layout>
      {/* ── SEO Title & Meta ─────────────────────────────────────── */}
      <title>Certifications & Standards Directory | GOVENICS GRC Consulting</title>
      <meta
        name="description"
        content="Explore 30+ global standards and Indian regulatory bodies including ISO, BSI, TÜV SÜD, DNV, SGS, Bureau Veritas, ISACA, NIST, GRI, EcoVadis, RBI, SEBI, and MCA."
      />

      <div className="bg-slate-950 text-slate-100 min-h-screen">
        {/* ── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {/* Subtle Background Mesh Glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Accreditation &amp; Certifications Directory</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Global Standards, Certifications &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Regulatory Authorities
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Authoritative statutory runbooks, third-party registrar liaison, and automated readiness pipelines.
              GOVENICS equips enterprise leaders across Quality, Risk, Cybersecurity, ESG, and Statutory Governance
              with zero-deviation audit assurance.
            </p>

            {/* Trust Metric Counters */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Global Standards & Acts", value: "31+", icon: Layers, sub: "Harmonized frameworks" },
                { label: "First-Time Audit Pass Rate", value: "100%", icon: CheckCircle2, sub: "Zero major non-conformities" },
                { label: "Accredited Hallmarks", value: "18", icon: Award, sub: "Tier-1 global registrars" },
                { label: "Statutory Penalty Record", value: "0", icon: ShieldCheck, sub: "Flawless regulatory defense" },
              ].map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-left backdrop-blur-sm hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {stat.value}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-200">{stat.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── THE GOLD STANDARD HALLMARKS (MARQUEE OF 18 LOGOS) ───────── */}
        <section className="py-10 bg-slate-900/60 border-b border-slate-800 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
            <span className="text-[11px] font-black text-slate-400 tracking-[0.25em] uppercase">
              The Gold Standard Hallmarks — Most Recognized Global &amp; India Certifications
            </span>
          </div>

          <div className="relative w-full overflow-hidden flex">
            {/* Left & Right gradient masks for marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 sm:gap-6 animate-marquee whitespace-nowrap">
              {marqueeLogos.concat(marqueeLogos).map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setActiveModalItem(item)}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-blue-500/60 hover:bg-slate-900/90 transition-all cursor-pointer group shadow-sm shrink-0"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    {item.logo}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">
                      {item.shortName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate max-w-[140px]">
                      {item.categoryName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN INTERACTIVE DIRECTORY ───────────────────────────── */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar: Search + Category Filters + Tier-1 Toggle */}
          <div className="space-y-6 mb-12">
            {/* Search Input & Tier-1 Toggle */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search certification, act, standard code (e.g. ISO 27001, RBI, NIST, ESG)…"
                  className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Toggle: Tier-1 Hallmarks Only */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTier1Only(!tier1Only)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                    tier1Only
                      ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Tier-1 Hallmarks Only (18)</span>
                </button>

                <div className="text-xs text-slate-400 font-semibold px-2">
                  Showing <span className="text-white font-bold">{filteredItems.length}</span> of 31
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md shadow-blue-600/20"
                        : "bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
              <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No certifications match your criteria</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Try clearing your search query or switching to another category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setTier1Only(false);
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl bg-gradient-to-b ${item.accentColor.bg} border ${item.accentColor.border} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${item.accentColor.glow} shadow-xl`}
                >
                  {/* Top Row: Logo Emblem + Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950/90 border border-slate-800 p-2 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {item.logo}
                      </div>
                      <div className="flex flex-col items-end gap-1.5 text-right">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.accentColor.pillBg}`}>
                          {item.categoryName}
                        </span>
                        {item.isFeatured && (
                          <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            Tier-1 Hallmark
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mb-3">
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {item.badge}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5 leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    {/* Tagline / Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {item.tagline}
                    </p>

                    {/* Framework Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.frameworks.slice(0, 3).map((fw, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[10.5px] font-semibold text-slate-300 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-md"
                        >
                          {fw}
                        </span>
                      ))}
                      {item.frameworks.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded-md">
                          +{item.frameworks.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Meta & Actions */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Readiness: <strong className="text-slate-200">{item.typicalReadiness}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Cycle: <strong className="text-slate-200">{item.auditCycle.split(" ")[0]}</strong></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold text-center border border-slate-700/80 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Audit Scope</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenConsult(item)}
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1"
                      >
                        <span>Get Certified</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 4-STEP CERTIFICATION PATHWAY ─────────────────────────── */}
        <section className="py-20 bg-slate-900/80 border-t border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black text-blue-400 tracking-[0.2em] uppercase">
                Zero-Deviation Audit Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                How GOVENICS Assures a 100% First-Time Certification Pass Rate
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300">
                A deterministic, AI-orchestrated consulting methodology removing surprises, audit delays, and regulatory penalties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Diagnostic Gap Assessment",
                  desc: "Comprehensive clause-by-clause benchmarking against standard requirements. Automated delta identification and priority scoring.",
                  deliverable: "Gap Matrix & Redline Roadmap"
                },
                {
                  step: "02",
                  title: "Evidence & Policy Engineering",
                  desc: "Drafting bulletproof statutory policies, SOPs, control registries, and automated evidence connectors into enterprise IT and cloud stacks.",
                  deliverable: "Ready-to-File IMS Dossier"
                },
                {
                  step: "03",
                  title: "Pre-Assessment Mock Drills",
                  desc: "Rigorous adversarial simulations led by certified Lead Auditors. Staff interview coaching and evidence room war table walkthroughs.",
                  deliverable: "Pre-Audit Zero Non-Conformity Seal"
                },
                {
                  step: "04",
                  title: "Registrar Liaison & Surveillance",
                  desc: "On-site and digital defense alongside accredited registrars (BSI, TÜV, DNV, SGS). Year-round continuous surveillance and renewal monitoring.",
                  deliverable: "Guaranteed Certificate Issuance"
                }
              ].map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-blue-500/60 transition-all"
                >
                  <div className="text-3xl font-black text-blue-500/20 group-hover:text-blue-500/40 transition-colors mb-3">
                    {phase.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{phase.desc}</p>
                  <div className="pt-3 border-t border-slate-850 text-[11px] font-semibold text-blue-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{phase.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONSULTATION CTA BANNER ──────────────────────────────── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/40 p-8 sm:p-14 shadow-2xl">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-black text-blue-300 uppercase tracking-widest">
                Enterprise Assurance Hotline
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                Ready to Certify Your Organization with World-Class Audit Rigor?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                Whether you need ISO 27001 ISMS certification, SEBI BRSR assurance, RBI DLG regulatory audits, or TÜV SÜD industrial verification, speak directly with our Senior Practice Leaders.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => handleOpenConsult(certificationsDirectory[0])}
                  className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <span>Request Readiness Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/solutions"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <span>Explore Solutions Catalog</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── DETAIL MODAL (AUDIT SCOPE & DELIVERABLES) ────────────── */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 p-2 shrink-0">
                  {activeModalItem.logo}
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activeModalItem.accentColor.pillBg}`}>
                    {activeModalItem.categoryName}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeModalItem.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-semibold">{activeModalItem.badge}</p>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  Standard Scope &amp; Regulatory Mandate
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Framework Codes */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  Recognized Frameworks &amp; Directives
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.frameworks.map((fw, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-slate-200 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Govenics Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  What GOVENICS Delivers for 100% Pass Assurance
                </h4>
                <ul className="space-y-2">
                  {activeModalItem.govenicsDeliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timelines and Applicable Industries */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 font-medium">Typical Readiness Window</div>
                  <div className="font-bold text-white text-sm mt-0.5">{activeModalItem.typicalReadiness}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Audit Cycle</div>
                  <div className="font-bold text-white text-sm mt-0.5">{activeModalItem.auditCycle}</div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const item = activeModalItem;
                    setActiveModalItem(null);
                    handleOpenConsult(item);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg text-center"
                >
                  Book Lead Auditor Consultation
                </button>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CONSULTATION INQUIRY MODAL ───────────────────────────── */}
        {consultModalOpen && consultItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setConsultModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 p-1.5 shrink-0">
                  {consultItem.logo}
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Consultation Request
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {consultItem.shortName} Readiness Assessment
                  </h3>
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Request Received</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Our Senior Lead Auditor specializing in {consultItem.shortName} will contact you within 2 business hours with an audit scope dossier.
                  </p>
                  <button
                    onClick={() => setConsultModalOpen(false)}
                    className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-300">
                    Submit your enterprise details to receive a complimentary preliminary readiness review and audit fee estimate for <strong>{consultItem.name}</strong>.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="compliance.officer@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Organization Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Company Pvt Ltd"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Current Readiness Status</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Starting from Scratch (Need Turnkey Readiness)</option>
                      <option>Have Existing Policies (Need Gap Assessment)</option>
                      <option>Audit Scheduled within 30-60 Days (Urgent Mock Drill)</option>
                      <option>Surveillance / Annual Renewal Support</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Assessment Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CertificationsPage;

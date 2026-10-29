import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
  FileText,
  Handshake
} from "lucide-react";
import { partnerCategoriesData } from "@/data/partners-data";

interface PartnerDomainsExplorerProps {
  onOpenPartnerForm: (categoryTitle?: string) => void;
}

export const PartnerDomainsExplorer: React.FC<PartnerDomainsExplorerProps> = ({
  onOpenPartnerForm
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedId, setSelectedId] = useState<string>(
    categoryParam || "regulatory-compliance"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const explorerRef = useRef<HTMLDivElement>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    if (categoryParam) {
      const match = partnerCategoriesData.find((c) => c.id === categoryParam);
      if (match) {
        setSelectedId(match.id);
        // Scroll into view gently
        setTimeout(() => {
          explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [categoryParam]);

  const handleSelectCategory = (id: string) => {
    setSelectedId(id);
    setSearchParams({ category: id });
  };

  const filteredCategories = partnerCategoriesData.filter((cat) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.badge.toLowerCase().includes(term) ||
      cat.relevantRegulations.some((r) => r.toLowerCase().includes(term)) ||
      cat.featuredAlliances.some((a) => a.name.toLowerCase().includes(term))
    );
  });

  const activeCategory =
    partnerCategoriesData.find((c) => c.id === selectedId) ||
    filteredCategories[0] ||
    partnerCategoriesData[0];

  const ActiveIcon = activeCategory.icon;

  return (
    <section
      id="domain-explorer"
      ref={explorerRef}
      className="py-20 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-t border-slate-200/80 relative"
    >
      <div className="container mx-auto px-6 max-w-7xl space-y-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            Specialized Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-heading leading-tight">
            10 Strategic Partner Domains
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-semibold leading-relaxed">
            Collaborating with accredited legal councils, chartered accountants, certified safety inspectors,
            cloud SaaS platforms, and global registrars to deliver total statutory assurance.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across all 10 partner domains, standards, or firms..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 10 Submenus Tab Bar (Desktop Grid / Mobile Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
          {filteredCategories.map((category) => {
            const isSelected = activeCategory.id === category.id;
            const CatIcon = category.icon;

            return (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                className={`p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between shrink-0 w-[240px] sm:w-auto min-h-[96px] ${
                  isSelected
                    ? "bg-[#0A1630] border-blue-500 text-white shadow-lg shadow-blue-950/20 scale-[1.02]"
                    : "bg-white border-slate-200/80 hover:border-blue-300 text-slate-700 hover:bg-blue-50/30"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-blue-500/30 text-sky-300 border border-blue-400/30"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {category.partnerCount.split(" ")[0]}
                  </span>
                </div>

                <div className="mt-2">
                  <div
                    className={`text-xs font-black truncate leading-tight ${
                      isSelected ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {category.shortTitle}
                  </div>
                  <div
                    className={`text-[9.5px] truncate mt-0.5 font-medium ${
                      isSelected ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    {category.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Spotlight Banner & Comprehensive Architecture */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Top Domain Hero Bar */}
          <div className="bg-gradient-to-r from-[#0A1630] via-[#0E1F47] to-[#12285C] text-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-sky-300 flex items-center justify-center shadow-inner">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {activeCategory.badge}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black tracking-wider rounded-full">
                    {activeCategory.partnerCount}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {activeCategory.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {activeCategory.tagline}
                </p>
              </div>

              {/* Action Buttons & Counter */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <button
                  onClick={() => onOpenPartnerForm(activeCategory.name)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] flex items-center gap-2"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Join as {activeCategory.shortTitle} Partner</span>
                </button>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  {activeCategory.stats.map((s, idx) => (
                    <div key={idx} className="text-right">
                      <div className="text-sm font-black text-white leading-none">
                        {s.value}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Overview & Detailed Scope */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">
                  Alliance Overview & Mandate
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  {activeCategory.overview}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {activeCategory.detailedDescription}
                </p>

                {/* Core Alliance Scope */}
                <div className="pt-2 space-y-2.5">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Core Focus & Operational Scope
                  </h5>
                  <div className="space-y-2">
                    {activeCategory.allianceFocus.map((focus, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-medium leading-relaxed">
                          {focus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Applicable Frameworks & Joint Deliverables */}
              <div className="lg:col-span-5 space-y-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
                {/* Regulations */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Applicable Acts & Regulatory Norms
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCategory.relevantRegulations.map((reg, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-[10.5px] font-semibold border border-slate-200 shadow-2xs"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collaborative Deliverables */}
                <div className="space-y-2.5 pt-3 border-t border-slate-200/80">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Co-Delivered Outputs & Toolkits
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    {activeCategory.collaborativeDeliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Alliances Grid */}
            <div className="pt-6 border-t border-slate-150 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Featured Alliances in {activeCategory.shortTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Pre-vetted institutional, legal, audit, and technology members.
                  </p>
                </div>
                <button
                  onClick={() => onOpenPartnerForm(activeCategory.name)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>Apply for Inclusion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeCategory.featuredAlliances.map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-slate-200/90 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9.5px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200/60 truncate">
                          {partner.badge}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">
                          {partner.tier}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {partner.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {partner.specialization}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-600">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {partner.metric}
                      </span>
                      <span className="text-slate-400 group-hover:text-blue-600 font-medium">
                        Verified &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Joint Value Proposition Cards */}
            <div className="pt-6 border-t border-slate-150">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Why Partner With Govenics in {activeCategory.shortTitle}
              </h5>
              <div className="grid sm:grid-cols-3 gap-4">
                {activeCategory.jointValuePropositions.map((prop, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      {prop}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Handshake,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { partnerCategoriesData } from "@/data/partners-data";

interface PartnersMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnersMegaMenu: React.FC<PartnersMegaMenuProps> = ({
  isOpen,
  onClose
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("regulatory-compliance");
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setActiveCategoryId("regulatory-compliance");
    }
  }, [isOpen]);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter categories based on search
  const filteredCategories = partnerCategoriesData.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.shortTitle.toLowerCase().includes(query) ||
      cat.badge.toLowerCase().includes(query) ||
      cat.relevantRegulations.some(r => r.toLowerCase().includes(query)) ||
      cat.featuredAlliances.some(a => a.name.toLowerCase().includes(query))
    );
  });

  const activeCategory =
    partnerCategoriesData.find((c) => c.id === activeCategoryId) ||
    filteredCategories[0] ||
    partnerCategoriesData[0];

  const ActiveIcon = activeCategory.icon;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] bg-white border border-slate-200/90 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50"
      role="menu"
      aria-label="Partners Menu"
    >
      {/* Invisible bridge to prevent mouse leaving hover */}
      <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

      {/* Left Column: Dark Navy 10 Partner Submenus List */}
      <div className="w-[380px] xl:w-[420px] 2xl:w-[440px] bg-[#0A1630] text-white p-6 flex flex-col justify-between border-r border-slate-800/80 shrink-0">
        <div className="space-y-4 flex flex-col min-h-0">
          {/* Header */}
          <div className="px-1 pb-3.5 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] leading-tight">
                Partners Ecosystem
              </h3>
              <span className="text-[9.5px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-sky-300 uppercase tracking-wider border border-blue-400/20">
                10 Specialized Domains
              </span>
            </div>
            <p className="text-[11.5px] text-slate-400 mt-2 font-medium leading-relaxed">
              Explore strategic legal counsels, CA networks, accredited registrars, and cloud tech alliances.
            </p>

            {/* Quick Filter */}
            <div className="relative mt-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search partner domains or standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* 10 Submenus Scrollable List */}
          <div className="flex flex-col gap-1 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredCategories.map((category) => {
              const isSelected = activeCategory.id === category.id;
              const CatIcon = category.icon;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  onMouseEnter={() => setActiveCategoryId(category.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-850/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-slate-800 text-sky-400 group-hover:bg-slate-700"
                      }`}
                    >
                      <CatIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-bold leading-tight">
                        {category.shortTitle}
                      </div>
                      <div
                        className={`text-[10px] truncate mt-0.5 ${
                          isSelected ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {category.badge}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0.5 text-white"
                        : "opacity-0 group-hover:opacity-100 text-slate-400"
                    }`}
                  />
                </button>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No partner domain matched "{searchQuery}".
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA in Left Column */}
        <div className="pt-4 border-t border-slate-800/90 mt-3 px-1 flex items-center justify-between">
          <Link
            to="/partners"
            onClick={onClose}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>All Partners Directory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/partners#partner-form"
            onClick={onClose}
            className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 rounded-lg text-[10.5px] font-bold tracking-wide transition-colors"
          >
            Apply to Join
          </Link>
        </div>
      </div>

      {/* Right Column: Dynamic Deep-Dive Detail Preview for Selected Submenu */}
      <div className="flex-1 flex flex-col justify-between bg-white p-7 min-h-[500px] overflow-hidden">
        <div className="animate-fade-in flex flex-col h-full justify-between gap-5">
          {/* 1. Header of Active Domain */}
          <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  {activeCategory.name}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-black text-blue-700 tracking-wide uppercase">
                  {activeCategory.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-black text-emerald-700 tracking-wide">
                  {activeCategory.partnerCount}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-3xl">
                {activeCategory.overview}
              </p>
            </div>

            <Link
              to={`/partners?category=${activeCategory.id}`}
              onClick={onClose}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <span>Explore Domain</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 2. Middle Grid: Core Alliance Focus & Regulated Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-1">
            {/* Core Alliance Focus Points */}
            <div className="bg-slate-50/70 border border-slate-150 rounded-2xl p-4 space-y-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Core Alliance Focus & Joint Scope
              </span>
              <div className="space-y-2">
                {activeCategory.allianceFocus.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Regulated Frameworks */}
            <div className="bg-slate-50/70 border border-slate-150 rounded-2xl p-4 space-y-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Governing Acts & Regulatory Standards
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCategory.relevantRegulations.map((reg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-[10.5px] font-semibold border border-slate-200/80 shadow-2xs"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Featured Alliances & Brand Roster */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Representative Institutional & Technical Partners
              </span>
              <span className="text-[10.5px] text-slate-400 font-medium">
                Vetted & Pre-integrated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {activeCategory.featuredAlliances.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200/90 rounded-xl hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200/50 truncate">
                        {partner.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {partner.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                      {partner.specialization}
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 text-[9.5px] font-bold text-emerald-600 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{partner.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Bottom Contextual Action Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 p-3.5 rounded-xl border border-slate-150">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                <Handshake className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  Interested in joining our {activeCategory.shortTitle} ecosystem?
                </div>
                <div className="text-[10.5px] text-slate-500 font-medium">
                  Co-branded collateral, shared client pipeline & dedicated partner success manager.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/partners?category=${activeCategory.id}`}
                onClick={onClose}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all shadow-2xs"
              >
                View Category Details
              </Link>
              <Link
                to={`/partners?category=${activeCategory.id}#partner-form`}
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
              >
                <span>Partner Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

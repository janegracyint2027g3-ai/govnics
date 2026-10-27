import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Landmark,
  Factory,
  Stethoscope,
  Cpu,
  Building2,
  Zap,
  ShoppingBag,
  Briefcase,
  FileCheck,
  ShieldAlert,
  Users,
  Leaf,
  Lock,
  BarChart3,
  Globe,
  Sparkles,
  Bot,
  Layers,
  Award,
  TrendingUp,
  DollarSign,
  HeartHandshake,
  Search,
  X,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  type LucideIcon
} from "lucide-react";
import type { MegaMenuData, CardMenuItem, IndustryMenuItem } from "@/data/solutionsMenuData";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Factory,
  Stethoscope,
  Cpu,
  Building2,
  Zap,
  ShoppingBag,
  Briefcase,
  FileCheck,
  ShieldAlert,
  Users,
  Leaf,
  Lock,
  BarChart3,
  Globe,
  Sparkles,
  Bot,
  Layers,
  Award,
  TrendingUp,
  DollarSign,
  HeartHandshake
};

const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || FileCheck;
};

interface TwoColumnMegaMenuProps {
  data: MegaMenuData;
  isOpen: boolean;
  onClose: () => void;
}

export const TwoColumnMegaMenu: React.FC<TwoColumnMegaMenuProps> = ({
  data,
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndustryId, setOpenIndustryId] = useState<string | null>(null);
  const [activeDetailCard, setActiveDetailCard] = useState<CardMenuItem | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const industryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset states whenever menu closes or switches between menus
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setOpenIndustryId(null);
      setActiveDetailCard(null);
    }
  }, [isOpen, data.menuKey]);

  // Click outside to close
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

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const cleanQuery = searchQuery.trim().toLowerCase();
  const isSearching = cleanQuery.length > 0;

  // Filter Industries (Left Column)
  const filteredIndustries = useMemo(() => {
    if (!isSearching) return data.leftColumn.industries;

    return data.leftColumn.industries
      .map((ind) => {
        const nameMatches = ind.name.toLowerCase().includes(cleanQuery);
        const matchedSubItems = ind.subItems.filter((sub) =>
          sub.title.toLowerCase().includes(cleanQuery)
        );

        if (nameMatches) {
          return ind; // Return all subItems if industry name matches
        }
        if (matchedSubItems.length > 0) {
          return {
            ...ind,
            subItems: matchedSubItems
          };
        }
        return null;
      })
      .filter(Boolean) as IndustryMenuItem[];
  }, [data.leftColumn.industries, cleanQuery, isSearching]);

  // Filter Section 1 (Compliance Domains)
  const filteredSection1Items = useMemo(() => {
    if (!isSearching) return data.rightColumn.complianceDomains.items;

    return data.rightColumn.complianceDomains.items.filter((item) => {
      const titleMatches = item.title.toLowerCase().includes(cleanQuery);
      const descMatches = item.description?.toLowerCase().includes(cleanQuery);
      const subMatches = item.subItems?.some((sub) =>
        sub.title.toLowerCase().includes(cleanQuery)
      );
      return titleMatches || descMatches || subMatches;
    });
  }, [data.rightColumn.complianceDomains.items, cleanQuery, isSearching]);

  // Filter Section 2 (Solution Types or Outcome Metrics)
  const filteredSection2Items = useMemo(() => {
    if (!isSearching) return data.rightColumn.secondSection.items;

    return data.rightColumn.secondSection.items.filter((item) => {
      const titleMatches = item.title.toLowerCase().includes(cleanQuery);
      const descMatches = item.description?.toLowerCase().includes(cleanQuery);
      const subMatches = item.subItems?.some((sub) =>
        sub.title.toLowerCase().includes(cleanQuery)
      );
      return titleMatches || descMatches || subMatches;
    });
  }, [data.rightColumn.secondSection.items, cleanQuery, isSearching]);

  const toggleIndustry = (id: string) => {
    if (isSearching) return; // Keep all open during search
    setOpenIndustryId((prev) => (prev === id ? null : id));
  };

  const handleCardClick = (card: CardMenuItem) => {
    if (card.subItems && card.subItems.length > 0) {
      setActiveDetailCard(card);
    }
  };

  // Keyboard arrow navigation through industry list
  const handleIndustryKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredIndustries.length;
      industryRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredIndustries.length) % filteredIndustries.length;
      industryRefs.current[prevIndex]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-[1180px] bg-white dark:bg-[#0e1b38] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[18px] flex flex-col min-[860px]:flex-row overflow-hidden overflow-x-hidden animate-slide-up-dropdown mt-1 text-left z-50 transition-colors duration-200 motion-reduce:animate-none motion-reduce:transition-none"
      style={{
        boxShadow: "0 25px 50px -12px rgba(10, 22, 48, 0.25)"
      }}
      role="dialog"
      aria-label={`${data.menuKey === "solutions" ? "Solutions" : "Case Studies"} Mega Menu`}
    >
      {/* Invisible bridge to prevent hover loss when moving mouse from header */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* ──────────────── LEFT COLUMN (Dark Navy: #0A1630) ──────────────── */}
      <div className="w-full min-[860px]:w-[360px] lg:w-[380px] xl:w-[390px] bg-[#0A1630] text-white p-5 flex flex-col justify-between shrink-0 border-b min-[860px]:border-b-0 min-[860px]:border-r border-slate-800">
        <div className="space-y-4 flex flex-col min-h-0">
          {/* Header */}
          <div>
            <h3 className="text-xs font-bold text-sky-400 tracking-[0.25em] uppercase font-['Sora',sans-serif]">
              {data.leftColumn.heading}
            </h3>
            <p className="text-[11px] text-slate-400 leading-tight mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
              {data.leftColumn.description}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={data.leftColumn.searchPlaceholder}
              className="w-full bg-[#132347] border border-slate-700/80 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all font-['Plus_Jakarta_Sans',sans-serif]"
              aria-label="Search industries or topics"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Industries Vertical List */}
          <div className="overflow-y-auto max-h-[260px] min-[860px]:max-h-[460px] pr-1 space-y-1.5 scrollbar-thin">
            {filteredIndustries.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                No industries matching "{searchQuery}"
              </div>
            ) : (
              filteredIndustries.map((ind, index) => {
                const IndIcon = getIcon(ind.icon);
                const isOpenRow = isSearching || openIndustryId === ind.id;

                return (
                  <div key={ind.id} className="rounded-xl overflow-hidden transition-all">
                    {/* Industry Row Header */}
                    <button
                      ref={(el) => {
                        industryRefs.current[index] = el;
                      }}
                      onClick={() => toggleIndustry(ind.id)}
                      onKeyDown={(e) => handleIndustryKeyDown(e, index)}
                      className={`w-full flex items-center justify-between p-2.5 px-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        isOpenRow
                          ? "bg-[#2563EB] text-white shadow-md font-bold"
                          : "text-slate-200 hover:bg-[#132347] hover:text-white"
                      }`}
                      aria-expanded={isOpenRow}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <IndIcon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isOpenRow ? "text-white" : "text-sky-400 group-hover:text-sky-300"
                          }`}
                        />
                        <span className="leading-snug break-words font-['Plus_Jakarta_Sans',sans-serif]">
                          {ind.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                          isOpenRow ? "rotate-180 text-white" : "text-slate-400 group-hover:text-white"
                        }`}
                      />
                    </button>

                    {/* Sub-items in place: neatly aligned, readable, no truncation */}
                    {isOpenRow && (
                      <div className="border-l-2 border-slate-700/80 ml-3.5 pl-2 my-2 space-y-1">
                        {ind.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.href}
                            onClick={onClose}
                            className="flex items-start gap-2.5 py-1.5 px-2.5 rounded-lg text-left hover:bg-white/10 text-slate-300 hover:text-white transition-all group/sub focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 group-hover/sub:bg-sky-300 shrink-0 mt-1.5 transition-colors" />
                            <span className="text-[12px] font-medium leading-snug break-words font-['Plus_Jakarta_Sans',sans-serif] text-slate-200 hover:text-white">
                              {sub.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* View all industries link at bottom */}
        <div className="pt-3.5 border-t border-slate-800/90 mt-3">
          <Link
            to={data.leftColumn.viewAllLink.href}
            onClick={onClose}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center justify-between w-full transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded p-1 font-['Plus_Jakarta_Sans',sans-serif]"
          >
            <span>{data.leftColumn.viewAllLink.label}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ──────────────── RIGHT COLUMN (Light: White / Deep Navy in dark mode) ──────────────── */}
      <div className="flex-1 p-6 min-[860px]:p-7 flex flex-col justify-between bg-white dark:bg-[#0e1b38] min-h-[460px] max-h-[620px] overflow-y-auto">
        {activeDetailCard ? (
          /* ── DETAIL VIEW ── */
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Back Link */}
              <button
                onClick={() => setActiveDetailCard(null)}
                className="text-xs font-bold text-[#2563EB] dark:text-blue-400 inline-flex items-center gap-1.5 hover:underline mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded p-1 -ml-1 transition-colors font-['Plus_Jakarta_Sans',sans-serif]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>‹ back</span>
              </button>

              {/* Title Header with Count Pill */}
              <div className="border-b border-slate-150 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Sora',sans-serif]">
                    {activeDetailCard.title}
                  </h4>
                  <span className="text-[#0F7A4D] bg-[#DFF5EA] dark:bg-emerald-950/70 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {activeDetailCard.subItems?.length || 0} topics
                  </span>
                </div>
                {activeDetailCard.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                    {activeDetailCard.description}
                  </p>
                )}
              </div>

              {/* Sub-items in 2-Column Grid on desktop, 1-col below 860px */}
              <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-2.5">
                {activeDetailCard.subItems?.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.href}
                    onClick={onClose}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] dark:hover:border-blue-400 bg-white dark:bg-[#132347]/60 hover:bg-blue-50/40 dark:hover:bg-blue-900/20 transition-all duration-200 group flex items-center justify-between shadow-xs hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug pr-2 font-['Plus_Jakarta_Sans',sans-serif]">
                      {sub.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="pt-6">
              <div className="bg-slate-50 dark:bg-[#132347]/70 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 font-['Plus_Jakarta_Sans',sans-serif] text-center sm:text-left">
                  {data.rightColumn.cta.text}
                </span>
                <Link
                  to={data.rightColumn.cta.buttonHref}
                  onClick={onClose}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  {data.rightColumn.cta.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ── STANDARD TWO SECTIONS VIEW ── */
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* SECTION 1: Compliance Domains */}
              <div>
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-wide uppercase font-['Sora',sans-serif]">
                    {data.rightColumn.complianceDomains.title}
                  </h4>
                  <span className="text-[#0F7A4D] bg-[#DFF5EA] dark:bg-emerald-950/70 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {data.rightColumn.complianceDomains.items.length} topics
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                  {data.rightColumn.complianceDomains.description}
                </p>

                {filteredSection1Items.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    No matching topics found.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-2.5">
                    {filteredSection1Items.map((card) => {
                      const CardIcon = getIcon(card.icon);
                      const hasSubItems = card.subItems && card.subItems.length > 0;
                      const subLabel = hasSubItems
                        ? data.menuKey === "solutions"
                          ? `${card.subItems!.length} solutions`
                          : `${card.subItems!.length} cases`
                        : "Open overview";

                      const content = (
                        <>
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-[#2563EB] dark:group-hover:text-blue-300 transition-colors">
                              <CardIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug break-words font-['Plus_Jakarta_Sans',sans-serif]">
                                {card.title}
                              </div>
                              <div className="text-[10px] text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                {subLabel}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                        </>
                      );

                      return hasSubItems ? (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(card)}
                          className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] dark:hover:border-blue-400 bg-white dark:bg-[#132347]/40 hover:bg-blue-50/20 dark:hover:bg-blue-900/20 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          {content}
                        </button>
                      ) : (
                        <Link
                          key={card.id}
                          to={card.href}
                          onClick={onClose}
                          className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] dark:hover:border-blue-400 bg-white dark:bg-[#132347]/40 hover:bg-blue-50/20 dark:hover:bg-blue-900/20 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SECTION 2: Solution Types OR Outcome Metrics */}
              <div>
                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-wide uppercase font-['Sora',sans-serif]">
                    {data.rightColumn.secondSection.title}
                  </h4>
                  <span className="text-[#0F7A4D] bg-[#DFF5EA] dark:bg-emerald-950/70 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {data.rightColumn.secondSection.items.length} topics
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                  {data.rightColumn.secondSection.description}
                </p>

                {filteredSection2Items.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    No matching topics found.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-2.5">
                    {filteredSection2Items.map((card) => {
                      const CardIcon = getIcon(card.icon);
                      const hasSubItems = card.subItems && card.subItems.length > 0;
                      const subLabel = hasSubItems
                        ? `${card.subItems!.length} metrics`
                        : "Open overview";

                      const content = (
                        <>
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-[#2563EB] dark:group-hover:text-blue-300 transition-colors">
                              <CardIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug break-words font-['Plus_Jakarta_Sans',sans-serif]">
                                {card.title}
                              </div>
                              <div className="text-[10px] text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                {subLabel}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                        </>
                      );

                      return hasSubItems ? (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(card)}
                          className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] dark:hover:border-blue-400 bg-white dark:bg-[#132347]/40 hover:bg-blue-50/20 dark:hover:bg-blue-900/20 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          {content}
                        </button>
                      ) : (
                        <Link
                          key={card.id}
                          to={card.href}
                          onClick={onClose}
                          className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] dark:hover:border-blue-400 bg-white dark:bg-[#132347]/40 hover:bg-blue-50/20 dark:hover:bg-blue-900/20 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="pt-4 mt-2">
              <div className="bg-slate-50 dark:bg-[#132347]/70 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 font-['Plus_Jakarta_Sans',sans-serif] text-center sm:text-left">
                  {data.rightColumn.cta.text}
                </span>
                <Link
                  to={data.rightColumn.cta.buttonHref}
                  onClick={onClose}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  {data.rightColumn.cta.buttonText}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

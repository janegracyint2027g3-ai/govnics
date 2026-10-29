import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Server,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  FileText,
  Calculator,
  CreditCard,
  Lock,
  TrendingUp,
  Database,
  Building2,
  HeartHandshake,
  Factory,
  Users,
  Wrench,
  Leaf,
  Pill,
  Activity,
  FlaskConical,
  Cpu,
  Utensils,
  RefreshCw,
  CheckCircle,
  CheckCircle2,
  Stethoscope,
  Microscope,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  Globe,
  ShoppingBag,
  Truck,
  HardHat,
  Clock,
  Receipt,
  Terminal,
  Sun,
  Award,
  Recycle,
  Shield,
  Droplet,
  Layers,
  TrendingDown,
  DollarSign,
  Zap,
  Scale,
  BookOpen,
  Coins,
  type LucideIcon
} from "lucide-react";
import type { MegaMenuConfig, MegaMenuItem } from "@/data/mega-menu/megaMenuTypes";

// Comprehensive Icon Registry for Mega Menu Cards
const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  FileText,
  Calculator,
  CreditCard,
  Lock,
  TrendingUp,
  Database,
  Building2,
  HeartHandshake,
  Factory,
  Users,
  Wrench,
  Leaf,
  Pill,
  Activity,
  FlaskConical,
  Cpu,
  Utensils,
  RefreshCw,
  CheckCircle,
  CheckCircle2,
  Stethoscope,
  Microscope,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  Globe,
  ShoppingBag,
  Truck,
  HardHat,
  Clock,
  Receipt,
  Terminal,
  Sun,
  Award,
  Recycle,
  Shield,
  Droplet,
  Layers,
  TrendingDown,
  DollarSign,
  Zap,
  Scale,
  BookOpen,
  Coins
};

const getMenuIcon = (iconName: string): LucideIcon => {
  return ICON_MAP[iconName] || ShieldCheck;
};

// Subtle icon card color accents
const CARD_COLOR_STYLES = [
  { bg: "bg-blue-50/80",    border: "border-blue-100",    icon: "text-blue-600",    hoverBorder: "hover:border-blue-300"    },
  { bg: "bg-sky-50/80",     border: "border-sky-100",     icon: "text-sky-600",     hoverBorder: "hover:border-sky-300"     },
  { bg: "bg-indigo-50/80",  border: "border-indigo-100",  icon: "text-indigo-600",  hoverBorder: "hover:border-indigo-300"  },
  { bg: "bg-emerald-50/80", border: "border-emerald-100", icon: "text-emerald-600", hoverBorder: "hover:border-emerald-300" },
  { bg: "bg-amber-50/80",   border: "border-amber-100",   icon: "text-amber-600",   hoverBorder: "hover:border-amber-300"   },
  { bg: "bg-violet-50/80",  border: "border-violet-100",  icon: "text-violet-600",  hoverBorder: "hover:border-violet-300"  },
];

interface SharedMegaMenuProps {
  data: MegaMenuConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const SharedMegaMenu: React.FC<SharedMegaMenuProps> = ({
  data,
  isOpen,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize with the first item of the first group
  const allItems = data.groups.flatMap((g) => g.items);
  const [activeItemId, setActiveItemId] = useState<string>(
    allItems[0]?.id || ""
  );

  // Reset active item whenever menu opens
  useEffect(() => {
    if (isOpen && allItems.length > 0) {
      if (!allItems.some((item) => item.id === activeItemId)) {
        setActiveItemId(allItems[0].id);
      }
    }
  }, [isOpen, allItems, activeItemId]);

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

  if (!isOpen) return null;

  const currentItem: MegaMenuItem =
    allItems.find((item) => item.id === activeItemId) || allItems[0];

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] max-w-[96vw] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label={`${data.title} Menu`}
    >
      {/* Invisible bridge to prevent hover loss */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Main Double-Column Layout */}
      <div className="flex flex-row items-stretch min-h-[490px] max-h-[580px]">
        {/* ── LEFT COLUMN: DARK NAVIGATION (#0B1730) ────────────────── */}
        <div className="w-[330px] shrink-0 bg-[#0B1730] text-white p-5 flex flex-col justify-between border-r border-slate-800/80">
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800/90">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-blue-400 to-[#38BDF8]" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">
                  {data.title}
                </span>
              </div>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-[#38BDF8] border border-blue-500/30">
                {data.badgeText}
              </span>
            </div>

            {/* Grouped Expandable / Selectable Items */}
            <div className="space-y-4 max-h-[385px] overflow-y-auto pr-1 scrollbar-thin">
              {data.groups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-2 pt-1 pb-1 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>{group.title}</span>
                    <span className="text-slate-600 text-[9px] font-bold">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = item.id === currentItem.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActiveItemId(item.id)}
                          onClick={() => setActiveItemId(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer border ${
                            isActive
                              ? "bg-[#2563EB] text-white font-bold shadow-md shadow-blue-600/30 border-blue-400/40"
                              : "text-slate-300 hover:text-white hover:bg-slate-850/80 border-transparent hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                                isActive ? "bg-white" : "bg-[#38BDF8]/60 group-hover:bg-[#38BDF8]"
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                          {item.tag && (
                            <span
                              className={`text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 ml-1.5 ${
                                isActive
                                  ? "bg-blue-700 text-white"
                                  : "bg-slate-900 text-slate-400 border border-slate-800"
                              }`}
                            >
                              {item.tag}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation CTA in Left Sidebar */}
          <div className="pt-3.5 border-t border-slate-800/90 mt-2 px-1">
            <Link
              to={data.bottomLink.href}
              onClick={onClose}
              className="text-xs font-semibold text-[#38BDF8] hover:text-sky-200 inline-flex items-center justify-between w-full transition-colors group"
            >
              <span>{data.bottomLink.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN: LIGHT CONTENT (#FFFFFF) ────────────────── */}
        <div className="flex-1 flex flex-col justify-between bg-white p-6 min-h-[480px] overflow-hidden">
          <div className="animate-fade-in flex flex-col h-full justify-between gap-4">
            {/* 1. Header with Breadcrumb & Action Button */}
            <div className="pb-3 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                    {currentItem.categoryGroup}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-black text-slate-800 tracking-wide truncate">
                    {currentItem.name}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-tight tracking-tight pt-0.5">
                  {currentItem.heading}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl line-clamp-2">
                  {currentItem.description}
                </p>
              </div>

              <Link
                to={currentItem.ctaHref}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 mt-0.5 hover:scale-[1.02]"
              >
                <span>{currentItem.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Responsive Grid of Contextual Cards */}
            <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
              <div className="grid grid-cols-2 gap-3">
                {currentItem.cards.map((card, cIdx) => {
                  const CardIcon = getMenuIcon(card.icon);
                  const colorTheme = CARD_COLOR_STYLES[cIdx % CARD_COLOR_STYLES.length];
                  return (
                    <Link
                      key={card.id}
                      to={card.href}
                      onClick={onClose}
                      className={`group p-3 rounded-xl border ${colorTheme.border} ${colorTheme.hoverBorder} hover:shadow-md transition-all duration-200 flex flex-col justify-between bg-slate-50/50 hover:bg-white`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className={`w-7 h-7 rounded-lg ${colorTheme.bg} ${colorTheme.icon} flex items-center justify-center shrink-0`}>
                            <CardIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {card.metric && (
                              <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                {card.metric}
                              </span>
                            )}
                            {card.badge && (
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                {card.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {card.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-bold text-blue-600 group-hover:text-blue-700">
                        <span>Explore Framework</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Bottom Contextual Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs -mx-6 -mb-6 p-3 px-6 bg-slate-50/70 rounded-b-2xl">
              <span className="text-[11px] text-slate-500 font-medium truncate">
                Pre-defined GRC architectures tailored for enterprise governance and audit readiness.
              </span>
              <Link
                to="/contact"
                onClick={onClose}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 shrink-0 ml-3"
              >
                <span>Speak to Practice Leader</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

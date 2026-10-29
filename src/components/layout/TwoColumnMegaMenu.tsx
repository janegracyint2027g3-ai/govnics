import React, { useEffect, useRef } from "react";
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
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import type { MegaMenuData } from "@/data/solutionsMenuData";

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

// Distinct color palettes: one per item index
const LEFT_COLORS = [
  { bg: "bg-blue-50",    icon: "text-blue-600",    hover: "group-hover:bg-blue-600",    label: "group-hover:text-blue-600"    },
  { bg: "bg-orange-50",  icon: "text-orange-600",  hover: "group-hover:bg-orange-600",  label: "group-hover:text-orange-600"  },
  { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "group-hover:bg-emerald-600", label: "group-hover:text-emerald-600" },
  { bg: "bg-violet-50",  icon: "text-violet-600",  hover: "group-hover:bg-violet-600",  label: "group-hover:text-violet-600"  },
  { bg: "bg-amber-50",   icon: "text-amber-600",   hover: "group-hover:bg-amber-600",   label: "group-hover:text-amber-600"   },
  { bg: "bg-teal-50",    icon: "text-teal-600",    hover: "group-hover:bg-teal-600",    label: "group-hover:text-teal-600"    },
  { bg: "bg-rose-50",    icon: "text-rose-600",    hover: "group-hover:bg-rose-600",    label: "group-hover:text-rose-600"    },
  { bg: "bg-indigo-50",  icon: "text-indigo-600",  hover: "group-hover:bg-indigo-600",  label: "group-hover:text-indigo-600"  },
];

const RIGHT_COLORS = [
  { bg: "bg-sky-50",     icon: "text-sky-600",     hover: "group-hover:bg-sky-600",     label: "group-hover:text-sky-600"     },
  { bg: "bg-rose-50",    icon: "text-rose-600",    hover: "group-hover:bg-rose-600",    label: "group-hover:text-rose-600"    },
  { bg: "bg-amber-50",   icon: "text-amber-600",   hover: "group-hover:bg-amber-600",   label: "group-hover:text-amber-600"   },
  { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "group-hover:bg-emerald-600", label: "group-hover:text-emerald-600" },
  { bg: "bg-violet-50",  icon: "text-violet-600",  hover: "group-hover:bg-violet-600",  label: "group-hover:text-violet-600"  },
  { bg: "bg-cyan-50",    icon: "text-cyan-600",    hover: "group-hover:bg-cyan-600",    label: "group-hover:text-cyan-600"    },
  { bg: "bg-teal-50",    icon: "text-teal-600",    hover: "group-hover:bg-teal-600",    label: "group-hover:text-teal-600"    },
  { bg: "bg-indigo-50",  icon: "text-indigo-600",  hover: "group-hover:bg-indigo-600",  label: "group-hover:text-indigo-600"  },
];

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
  const menuRef = useRef<HTMLDivElement>(null);

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

  const isSolutions = data.menuKey === "solutions";
  const mainTitle = isSolutions ? "Solutions Catalog" : "Case Studies";
  const badgeTitle = isSolutions ? "Pre-Defined Assets" : "Verified Client Success";
  const viewAllHref = isSolutions ? "/solutions" : "/case-studies";
  const viewAllLabel = isSolutions ? "Explore All Solutions" : "Browse All Case Studies";
  const accentGradient = isSolutions
    ? "from-blue-500 to-indigo-600"
    : "from-emerald-500 to-teal-600";
  const badgeCls = isSolutions
    ? "bg-blue-50 text-blue-700 border-blue-200/60"
    : "bg-emerald-50 text-emerald-700 border-emerald-200/60";

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] max-w-[95vw] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 p-5 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label={`${mainTitle} Menu`}
    >
      {/* Invisible bridge to prevent hover loss */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Menu Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-5 rounded-full bg-gradient-to-b ${accentGradient}`} />
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            {mainTitle}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeCls}`}>
            {badgeTitle}
          </span>
        </div>
        <Link
          to={viewAllHref}
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Featured Certifications Banner */}
      {isSolutions && (
        <Link
          to="/certifications"
          onClick={onClose}
          className="mb-3.5 p-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-amber-50/60 border border-blue-200/80 hover:border-blue-400 flex items-center justify-between group transition-all shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  Certifications &amp; Standards Directory
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white tracking-wide">
                  31 Bodies
                </span>
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">
                ISO, BSI, TÜV SÜD, DNV, SGS, NIST, GRI, EcoVadis, RBI, SEBI &amp; MCA
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1 shrink-0 ml-2">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      )}

      {/* Topics Grid: 2 clean columns */}
      <div className="grid grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="px-1 text-[10.5px] font-black text-slate-400 uppercase tracking-wider">
            {data.leftColumn.heading}
          </div>
          <div className="flex flex-col gap-1">
            {data.leftColumn.industries.map((ind, idx) => {
              const IndIcon = getIcon(ind.icon);
              const palette = LEFT_COLORS[idx % LEFT_COLORS.length];
              return (
                <Link
                  key={ind.id}
                  to={ind.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50/80 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className={`w-7 h-7 rounded-lg ${palette.bg} ${palette.icon} ${palette.hover} group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-200`}>
                    <IndIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold text-slate-800 ${palette.label} transition-colors truncate`}>
                    {ind.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="px-1 text-[10.5px] font-black text-slate-400 uppercase tracking-wider">
            {data.rightColumn.complianceDomains.title}
          </div>
          <div className="flex flex-col gap-1">
            {data.rightColumn.complianceDomains.items.map((item, idx) => {
              const ItemIcon = getIcon(item.icon);
              const palette = RIGHT_COLORS[idx % RIGHT_COLORS.length];
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50/80 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className={`w-7 h-7 rounded-lg ${palette.bg} ${palette.icon} ${palette.hover} group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-200`}>
                    <ItemIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold text-slate-800 ${palette.label} transition-colors truncate`}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl">
        <span className="text-[11px] text-slate-500 font-medium">
          {isSolutions
            ? "Need custom regulatory architecture for your enterprise?"
            : "Explore audited outcomes and verified metric benchmarks"}
        </span>
        <Link
          to={isSolutions ? "/contact" : "/case-studies"}
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>{isSolutions ? "Speak to Practice Leader" : "View All Wins"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

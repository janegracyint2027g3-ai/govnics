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

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] max-w-[95vw] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 p-5 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label={`${mainTitle} Menu`}
    >
      {/* Invisible bridge to prevent hover loss */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Menu Header: Heading and view all link */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            {mainTitle}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
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

      {/* Topics Grid: 2 clean columns of topics and headings */}
      <div className="grid grid-cols-2 gap-5">
        {/* Left Column: By Industry Sector Topics */}
        <div className="space-y-2">
          <div className="px-1 text-[10.5px] font-black text-slate-400 uppercase tracking-wider">
            {data.leftColumn.heading}
          </div>
          <div className="flex flex-col gap-1">
            {data.leftColumn.industries.map((ind) => {
              const IndIcon = getIcon(ind.icon);
              return (
                <Link
                  key={ind.id}
                  to={ind.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <IndIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {ind.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: By Compliance Domain Topics */}
        <div className="space-y-2">
          <div className="px-1 text-[10.5px] font-black text-slate-400 uppercase tracking-wider">
            {data.rightColumn.complianceDomains.title}
          </div>
          <div className="flex flex-col gap-1">
            {data.rightColumn.complianceDomains.items.map((item) => {
              const ItemIcon = getIcon(item.icon);
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <ItemIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl">
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

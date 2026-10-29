import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whomWeServeClusters } from "@/data/whom-we-serve-data";

interface IndustriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// Assign a distinct color palette to each sector
const SECTOR_COLORS = [
  { bg: "bg-orange-50", icon: "text-orange-600", hover: "group-hover:bg-orange-600", label: "group-hover:text-orange-600" },
  { bg: "bg-blue-50", icon: "text-blue-600", hover: "group-hover:bg-blue-600", label: "group-hover:text-blue-600" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "group-hover:bg-emerald-600", label: "group-hover:text-emerald-600" },
  { bg: "bg-violet-50", icon: "text-violet-600", hover: "group-hover:bg-violet-600", label: "group-hover:text-violet-600" },
  { bg: "bg-amber-50", icon: "text-amber-600", hover: "group-hover:bg-amber-600", label: "group-hover:text-amber-600" },
  { bg: "bg-teal-50", icon: "text-teal-600", hover: "group-hover:bg-teal-600", label: "group-hover:text-teal-600" },
  { bg: "bg-rose-50", icon: "text-rose-600", hover: "group-hover:bg-rose-600", label: "group-hover:text-rose-600" },
  { bg: "bg-indigo-50", icon: "text-indigo-600", hover: "group-hover:bg-indigo-600", label: "group-hover:text-indigo-600" },
  { bg: "bg-cyan-50", icon: "text-cyan-600", hover: "group-hover:bg-cyan-600", label: "group-hover:text-cyan-600" },
  { bg: "bg-sky-50", icon: "text-sky-600", hover: "group-hover:bg-sky-600", label: "group-hover:text-sky-600" },
];

export const IndustriesDropdown: React.FC<IndustriesDropdownProps> = ({
  isOpen,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

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

  const sectors = whomWeServeClusters.slice(0, 10);

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] max-w-[95vw] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 p-5 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label="Industries Menu"
    >
      {/* Invisible bridge */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600" />
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Industries &amp; Sectors
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
            {sectors.length} Key Sectors
          </span>
        </div>
        <Link
          to="/industries"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2-Column Colored Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {sectors.map((cluster, idx) => {
          const ClusterIcon = cluster.icon;
          const palette = SECTOR_COLORS[idx % SECTOR_COLORS.length];
          return (
            <Link
              key={cluster.id}
              to={`/industries/${cluster.id}`}
              onClick={onClose}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50/80 transition-all group border border-transparent hover:border-slate-100"
            >
              <div
                className={`w-8 h-8 rounded-lg ${palette.bg} ${palette.icon} ${palette.hover} group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}
              >
                <ClusterIcon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold text-slate-700 ${palette.label} transition-colors truncate`}>
                {cluster.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl">
        <span className="text-[11px] text-slate-500 font-medium">
          Sector-specific regulatory, statutory &amp; EHS frameworks
        </span>
        <Link
          to="/industries"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>All Sectors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

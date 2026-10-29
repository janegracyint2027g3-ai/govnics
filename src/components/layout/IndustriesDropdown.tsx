import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whomWeServeClusters } from "@/data/whom-we-serve-data";

interface IndustriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndustriesDropdown: React.FC<IndustriesDropdownProps> = ({
  isOpen,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Escape key detection
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

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] max-w-[95vw] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 p-5 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label="Industries Menu"
    >
      {/* Invisible bridge to prevent mouse leaving hover */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Menu Header: Heading and view all link */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Industries & Sectors
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
            8 Key Sectors
          </span>
        </div>
        <Link
          to="/industries"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Topics Grid: Clean 2 columns with only the sector headings and icons */}
      <div className="grid grid-cols-2 gap-1.5">
        {whomWeServeClusters.map((cluster) => {
          const ClusterIcon = cluster.icon;
          return (
            <Link
              key={cluster.id}
              to={`/industries/${cluster.id}`}
              onClick={onClose}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ClusterIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                {cluster.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Menu Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl">
        <span className="text-[11px] text-slate-500 font-medium">
          Sector-specific regulatory, statutory & EHS frameworks
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

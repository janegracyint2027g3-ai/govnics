import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { partnerCategoriesData } from "@/data/partners-data";

interface PartnersMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnersMegaMenu: React.FC<PartnersMegaMenuProps> = ({
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

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-white border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden mt-1 p-5 z-50 animate-slide-up-dropdown text-left"
      role="menu"
      aria-label="Partners Menu"
    >
      {/* Invisible bridge to prevent mouse leaving hover */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

      {/* Menu Header: Heading only */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Partner Domains
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
            10 Categories
          </span>
        </div>
        <Link
          to="/partners"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>Explore All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Topics Grid: Clean 2 columns with only the topic headings and icons */}
      <div className="grid grid-cols-2 gap-1.5">
        {partnerCategoriesData.map((category) => {
          const CatIcon = category.icon;
          return (
            <Link
              key={category.id}
              to={`/partners?category=${category.id}`}
              onClick={onClose}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <CatIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                {category.shortTitle}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Menu Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl">
        <span className="text-[11px] text-slate-500 font-medium">
          Interested in partnering with GOVENICS?
        </span>
        <Link
          to="/partners#partner-form"
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>Become a Partner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

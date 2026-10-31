// src/components/poster/IntelligenceStat.tsx
// Section C: Industry Intelligence / Key Verified Statistic
import React from "react"; // React needed for JSX transform
import { TrendingUp, Award } from "lucide-react";

interface IntelligenceStatProps {
  stat: {
    figure: string;
    label: string;
    context: string;
    source: string;
    year: string;
  };
  isCompact?: boolean;
}

export const IntelligenceStat: React.FC<IntelligenceStatProps> = ({ stat, isCompact = false }) => {
  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-white border border-blue-200/80 p-3.5 sm:p-4 shadow-xs ${isCompact ? "mb-3" : "mb-4.5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Industry Intelligence</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-semibold">{stat.year}</span>
          </div>
          
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1B3D] tracking-tight">
              {stat.figure}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
              {stat.label}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed mt-1">
            {stat.context}
          </p>

          <div className="mt-2 pt-1.5 border-t border-blue-100 flex items-center gap-1 text-[10px] text-slate-500">
            <Award className="w-3 h-3 text-blue-500 shrink-0" />
            <span className="truncate">Source: {stat.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// src/components/poster/IntelligenceStat.tsx
// Section C: Industry Intelligence / Key Verified Statistic & Financial Impact
import React from "react";
import { TrendingUp, Award, DollarSign } from "lucide-react";

interface IntelligenceStatProps {
  stat: {
    figure: string;
    label: string;
    context: string;
    source: string;
    year: string;
    impactType?: "financial" | "operational" | "regulatory" | "legal";
    impactLabel?: string;
  };
  isCompact?: boolean;
}

export const IntelligenceStat: React.FC<IntelligenceStatProps> = ({ stat, isCompact = false }) => {
  const isFinancial = stat.impactType === "financial" || stat.figure.includes("₹") || stat.figure.includes("Cr") || stat.figure.includes("$");
  
  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br from-blue-50/95 via-sky-50/50 to-white border border-blue-200/90 p-3.5 sm:p-4.5 shadow-xs ${isCompact ? "mb-2.5" : "mb-4"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Impact Classification Badge */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isFinancial 
                ? "bg-amber-100/80 text-amber-800 border border-amber-300/80" 
                : "bg-blue-100/80 text-blue-800 border border-blue-300/80"
            }`}>
              {isFinancial ? <DollarSign className="w-3 h-3 text-amber-700" /> : <TrendingUp className="w-3 h-3 text-blue-700" />}
              <span>{stat.impactLabel || (isFinancial ? "Statutory Financial Impact" : "Verified Industry Intelligence")}</span>
            </span>

            <span className="text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200/60">
              FY {stat.year}
            </span>
          </div>
          
          {/* Main Large KPI Typography */}
          <div className="flex items-baseline gap-2.5 flex-wrap my-1">
            <span className="text-2xl sm:text-3xl md:text-[34px] font-black text-[#0B1B3D] tracking-tight leading-none">
              {stat.figure}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1D4ED8] tracking-tight">
              {stat.label}
            </span>
          </div>

          {/* Contextual Narrative */}
          <p className="text-[11px] sm:text-xs text-slate-650 font-medium leading-relaxed mt-1">
            {stat.context}
          </p>

          {/* Attribution Footnote */}
          <div className="mt-2.5 pt-1.5 border-t border-blue-100 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Official Regulatory Citation: {stat.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

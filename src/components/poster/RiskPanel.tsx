// src/components/poster/RiskPanel.tsx
// Section E: Business Risk / Operational Pain Points (Upgraded 2x2 Grid)
import React from "react";
import { AlertTriangle } from "lucide-react";

export interface StructuredRisk {
  title: string;
  desc: string;
}

interface RiskPanelProps {
  risks?: string[];
  structuredRisks?: StructuredRisk[];
  isCompact?: boolean;
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ risks = [], structuredRisks, isCompact = false }) => {
  // Normalize items to structured cards (title + desc)
  const items: StructuredRisk[] = structuredRisks && structuredRisks.length > 0 
    ? structuredRisks.slice(0, 4)
    : risks.slice(0, 4).map((r) => {
        if (r.includes(":")) {
          const [t, ...rest] = r.split(":");
          return { title: t.trim(), desc: rest.join(":").trim() };
        }
        return { title: "Statutory Compliance Risk", desc: r };
      });

  return (
    <div className={`w-full rounded-2xl bg-blue-50/70 border border-blue-200/90 p-3.5 sm:p-4 shadow-xs ${isCompact ? "mb-2.5" : "mb-4"}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-900">
          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          <span>Critical Operational & Governance Exposures</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
          4-Point Vulnerability Matrix
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {items.map((risk, idx) => (
          <div 
            key={idx} 
            className="flex flex-col justify-between bg-white/95 rounded-xl p-2.5 sm:p-3 border border-blue-100 hover:border-red-300 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black shrink-0">
                {idx + 1}
              </span>
              <h4 className="text-[11px] sm:text-xs font-extrabold text-[#0B1B3D] leading-snug truncate">
                {risk.title}
              </h4>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-relaxed pl-5.5">
              {risk.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

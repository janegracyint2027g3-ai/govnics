// src/components/poster/RiskPanel.tsx
// Section E: Business Risk / Operational Pain Points
import React from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface RiskPanelProps {
  risks: string[];
  isCompact?: boolean;
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ risks, isCompact = false }) => {
  return (
    <div className={`w-full rounded-2xl bg-blue-50/70 border border-blue-200/90 p-3.5 sm:p-4 shadow-xs ${isCompact ? "mb-3" : "mb-4.5"}`}>
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span>Critical Operational & Statutory Risks</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {risks.map((risk, idx) => (
          <div key={idx} className="flex items-start gap-2 bg-white/80 rounded-xl p-2 border border-blue-100/80 shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span className="text-[11px] sm:text-xs text-slate-700 font-medium leading-snug">
              {risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


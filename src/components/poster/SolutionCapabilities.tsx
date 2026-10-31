// src/components/poster/SolutionCapabilities.tsx
// Section F: GOVENICS Solution Capabilities (Up to 6 capabilities)
import React from "react";
import { 
  ShieldCheck, Layers, ClipboardCheck, 
  FileSearch, Settings, BarChart3, 
  Lock, Clock, Users, CheckCircle2 
} from "lucide-react";
import type { PosterSolution } from "@/data/posterData";

const iconMap = {
  ShieldCheck,
  Layers,
  ClipboardCheck,
  FileSearch,
  Settings,
  BarChart3,
  Lock,
  Clock,
  Users,
  CheckCircle2
};

interface SolutionCapabilitiesProps {
  solutions: PosterSolution[];
  isCompact?: boolean;
}

export const SolutionCapabilities: React.FC<SolutionCapabilitiesProps> = ({ solutions, isCompact = false }) => {
  // Display up to 6 capabilities
  const displaySolutions = solutions.slice(0, 6);

  return (
    <div className={`w-full ${isCompact ? "mb-2.5" : "mb-4"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#0B1B3D] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1D4ED8]" />
          HOW GOVENICS BUILDS INSTITUTIONAL ACCOUNTABILITY
        </span>
        <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-wider hidden sm:inline">
          {displaySolutions.length} Strategic Controls
        </span>
      </div>

      <div className={`grid ${displaySolutions.length > 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"} gap-2`}>
        {displaySolutions.map((sol, idx) => {
          const IconComp = iconMap[sol.iconName] || ShieldCheck;
          return (
            <div 
              key={idx} 
              className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-blue-50/60 to-white border border-blue-200/70 hover:border-blue-400 transition-colors shadow-2xs"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-extrabold text-[#0B1B3D] leading-tight truncate">
                  {sol.title}
                </h4>
                <p className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-medium leading-relaxed mt-0.5 line-clamp-2">
                  {sol.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


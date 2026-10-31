// src/components/poster/SolutionCapabilities.tsx
// Section F: GOVENICS Solution Capabilities
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
  return (
    <div className={`w-full ${isCompact ? "mb-3" : "mb-4.5"}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#0B1B3D]">
          HOW GOVENICS HELPS
        </span>
        <div className="flex-1 h-px bg-blue-100" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {solutions.map((sol, idx) => {
          const IconComp = iconMap[sol.iconName] || ShieldCheck;
          return (
            <div 
              key={idx} 
              className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-white border border-blue-200/60 hover:border-blue-400/80 transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100/70 border border-blue-300/60 flex items-center justify-center shrink-0 text-[#1D4ED8]">
                <IconComp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-[#0B1B3D] leading-tight">
                  {sol.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
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


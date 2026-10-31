// src/components/poster/PosterFooter.tsx
// Section H: Footer for GOVENICS Poster System
import React from "react";

export const PosterFooter: React.FC = () => {
  return (
    <footer className="w-full pt-3 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider uppercase gap-1">
      <div className="flex items-center gap-1.5 text-[#0B1B3D]">
        <span>WWW.GOVENICS.COM</span>
        <span className="text-slate-300">•</span>
        <span className="text-blue-600 font-bold">A DIVISION OF ISI GROUP</span>
      </div>
      <div className="text-slate-400 font-medium">
        GRC <span className="text-blue-500">|</span> RISK <span className="text-blue-500">|</span> COMPLIANCE <span className="text-blue-500">|</span> ESG <span className="text-blue-500">|</span> ADVISORY
      </div>
    </footer>
  );
};


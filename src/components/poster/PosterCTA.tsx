// src/components/poster/PosterCTA.tsx
// Section G: Lead Generation CTA Section (Executive Buyer-Specific)
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface PosterCTAProps {
  cta: {
    text: string;
    link: string;
    subtitle?: string;
    buttonText?: string;
  };
  isCompact?: boolean;
}

export const PosterCTA: React.FC<PosterCTAProps> = ({ cta, isCompact = false }) => {
  const btnLabel = cta.buttonText || cta.text;

  return (
    <div className={`w-full ${isCompact ? "mb-2.5" : "mb-3.5"}`}>
      <Link
        to={cta.link}
        className="group w-full py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-gradient-to-r from-[#1D4ED8] via-blue-600 to-[#0B1B3D] hover:from-blue-700 hover:to-blue-900 text-white font-extrabold text-xs sm:text-[13px] tracking-wider uppercase flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 border border-blue-400/30"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
          <span className="truncate">{btnLabel}</span>
        </div>
        <div className="flex items-center gap-1 text-sky-200 text-[11px] font-bold">
          <span className="hidden sm:inline">ACTIVATE</span>
          <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
      {cta.subtitle && (
        <p className="text-[10px] sm:text-[11px] text-center text-slate-500 font-medium mt-1.5">
          {cta.subtitle}
        </p>
      )}
    </div>
  );
};

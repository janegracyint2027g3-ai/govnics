// src/components/poster/PosterCTA.tsx
// Section G: Lead Generation CTA Section
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface PosterCTAProps {
  cta: {
    text: string;
    link: string;
    subtitle?: string;
  };
  isCompact?: boolean;
}

export const PosterCTA: React.FC<PosterCTAProps> = ({ cta, isCompact = false }) => {
  return (
    <div className={`w-full ${isCompact ? "mb-3" : "mb-4"}`}>
      <Link
        to={cta.link}
        className="group w-full py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-gradient-to-r from-[#1D4ED8] via-blue-600 to-[#0B1B3D] hover:from-blue-700 hover:to-blue-900 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 border border-blue-400/30"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
          <span>{cta.text}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-1 transition-transform" />
      </Link>
      {cta.subtitle && (
        <p className="text-[10px] sm:text-[11px] text-center text-slate-500 font-medium mt-1.5">
          {cta.subtitle}
        </p>
      )}
    </div>
  );
};


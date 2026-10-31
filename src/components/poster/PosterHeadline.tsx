// src/components/poster/PosterHeadline.tsx
// Section B: Strong Executive Headline with Optional Eyebrow & Subheadline
import React from "react";

interface PosterHeadlineProps {
  headline: {
    prefix?: string;
    highlight: string;
    suffix?: string;
  };
  eyebrow?: string;
  subheadline?: string;
  targetPersona?: string;
  isCompact?: boolean;
}

export const PosterHeadline: React.FC<PosterHeadlineProps> = ({ 
  headline, 
  eyebrow, 
  subheadline, 
  targetPersona, 
  isCompact = false 
}) => {
  return (
    <div className={`w-full ${isCompact ? "mb-2.5" : "mb-4.5"}`}>
      {/* Optional Executive Eyebrow Statement */}
      {eyebrow ? (
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-widest text-[#1D4ED8] uppercase bg-blue-100/70 border border-blue-200/90 px-2.5 py-1 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"></span>
            {eyebrow}
          </span>
        </div>
      ) : targetPersona ? (
        <div className="mb-1.5">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-600/90 bg-blue-50/60 px-2.5 py-0.5 rounded border border-blue-100 inline-block">
            Executive Briefing • {targetPersona}
          </span>
        </div>
      ) : null}

      {/* Main Executive Headline */}
      <h2 className={`${isCompact ? "text-lg sm:text-xl leading-tight" : "text-xl sm:text-2xl md:text-[25px] leading-[1.18]"} font-black tracking-tight text-[#0B1B3D]`}>
        {headline.prefix && <span className="block sm:inline">{headline.prefix} </span>}
        <span className="text-[#1D4ED8] bg-blue-50/80 px-1.5 py-0.5 rounded border-b-2 border-blue-500 inline-block">
          {headline.highlight}
        </span>
        {headline.suffix && <span> {headline.suffix}</span>}
      </h2>

      {/* Optional Subheadline / Challenge Question */}
      {subheadline && (
        <p className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-relaxed mt-1.5 border-l-2 border-blue-400 pl-2.5">
          {subheadline}
        </p>
      )}
    </div>
  );
};


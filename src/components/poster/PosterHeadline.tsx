// src/components/poster/PosterHeadline.tsx
// Section B: Strong Headline with Royal Blue Highlights
import React from "react";

interface PosterHeadlineProps {
  headline: {
    prefix?: string;
    highlight: string;
    suffix?: string;
  };
  targetPersona?: string;
  isCompact?: boolean;
}

export const PosterHeadline: React.FC<PosterHeadlineProps> = ({ headline, targetPersona, isCompact = false }) => {
  return (
    <div className={`w-full ${isCompact ? "mb-3" : "mb-5"}`}>
      {targetPersona && (
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600/90 bg-blue-50/60 px-2.5 py-0.5 rounded border border-blue-100 inline-block mb-1.5">
          Executive Briefing • {targetPersona}
        </span>
      )}
      <h2 className={`${isCompact ? "text-lg sm:text-xl leading-tight" : "text-xl sm:text-2xl md:text-[26px] leading-[1.2]"} font-black tracking-tight text-[#0B1B3D]`}>
        {headline.prefix && <span className="block sm:inline">{headline.prefix} </span>}
        <span className="text-[#1D4ED8] bg-blue-50/40 px-1 py-0.5 rounded border-b-2 border-blue-400">
          {headline.highlight}
        </span>
        {headline.suffix && <span> {headline.suffix}</span>}
      </h2>
    </div>
  );
};


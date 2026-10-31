// src/components/poster/PosterHeader.tsx
// Section A: Brand Header for GOVENICS Poster System
import React from "react";

interface PosterHeaderProps {
  categoryBadge?: string;
  isCompact?: boolean;
}

export const PosterHeader: React.FC<PosterHeaderProps> = ({ categoryBadge, isCompact = false }) => {
  return (
    <header className={`w-full flex items-center justify-between pb-3.5 border-b border-blue-100 ${isCompact ? "mb-3" : "mb-5"}`}>
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="GOVENICS GRC Consulting"
          className="h-9 sm:h-11 w-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
        <div className="hidden sm:block h-7 w-[1.5px] bg-slate-200 mx-1"></div>
        <div className="hidden sm:flex flex-col">
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight">
            A Division of ISI Group <span className="text-slate-300">•</span> Established 1985
          </p>
          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
            Enterprise GRC Advisory
          </span>
        </div>
      </div>

      {/* Category Pill */}
      {categoryBadge && (
        <div className="bg-blue-50/80 border border-blue-200 text-[#1D4ED8] px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
          {categoryBadge}
        </div>
      )}
    </header>
  );
};


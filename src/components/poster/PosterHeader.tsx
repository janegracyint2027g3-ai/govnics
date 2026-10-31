// src/components/poster/PosterHeader.tsx
// Section A: Brand Header for GOVENICS Poster System
import React from "react";

interface PosterHeaderProps {
  categoryBadge?: string;
  isCompact?: boolean;
}

export const PosterHeader: React.FC<PosterHeaderProps> = ({ categoryBadge, isCompact = false }) => {
  return (
    <header className={`w-full flex items-center justify-between pb-4 border-b border-blue-100 ${isCompact ? "mb-3" : "mb-5"}`}>
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm border border-blue-200/60 p-1.5 flex items-center justify-center shrink-0">
          <img
            src="/logo.png"
            alt="GOVENICS GRC Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Graceful fallback if logo.png is loading
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#0B1B3D] uppercase">
              GOVENICS <span className="text-[#1D4ED8]">GRC</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 uppercase tracking-widest pl-2 border-l border-slate-300">
              Consulting
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">
            A Division of ISI Group <span className="text-slate-300">•</span> Established 1985
          </p>
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


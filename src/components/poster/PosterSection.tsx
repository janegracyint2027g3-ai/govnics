// src/components/poster/PosterSection.tsx
// Interactive Infographic Poster Section with Sub-Industry Selector & Modal Export
import React, { useState } from "react";
import type { PosterData } from "@/data/posterData";
import { getPosterData, masterPosterData } from "@/data/posterData";
import { GovenicsPoster } from "./GovenicsPoster";
import { PosterModal } from "./PosterModal";
import { Sparkles, Maximize2 } from "lucide-react";

interface PosterSectionProps {
  initialKey: string;
  relatedKeys?: string[];
  title?: string;
  subtitle?: string;
}

export const PosterSection: React.FC<PosterSectionProps> = ({
  initialKey,
  relatedKeys = [],
  title = "Executive GRC Infographic Poster",
  subtitle = "High-impact statutory briefing & regulatory risk breakdown (LinkedIn 4:5 Edition)"
}) => {
  const [activeKey, setActiveKey] = useState<string>(initialKey);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPosterData: PosterData = getPosterData(activeKey);

  // Available tabs to switch between related posters
  const allKeys = Array.from(new Set([initialKey, ...relatedKeys])).filter(k => masterPosterData[k]);

  return (
    <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-blue-50/40 via-white to-blue-50/20 border-y border-blue-100/80 relative overflow-hidden">
      {/* Decorative Brand Accent Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Infographic Poster Design System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Sub-Industry / Offering Selector (if multiple) */}
        {allKeys.length > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {allKeys.map((k) => {
              const p = masterPosterData[k];
              const isActive = k === activeKey;
              return (
                <button
                  key={k}
                  onClick={() => setActiveKey(k)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-[#1D4ED8] text-white border-blue-600 shadow-md scale-105"
                      : "bg-white text-slate-700 border-blue-200 hover:bg-blue-50/80"
                  }`}
                >
                  {p?.subCategoryName || p?.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Centered Poster Display */}
        <div className="flex flex-col items-center justify-center">
          <GovenicsPoster
            data={currentPosterData}
            onExpand={() => setIsModalOpen(true)}
            onExport={() => setIsModalOpen(true)}
          />

          {/* Quick Action Footer Button */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-blue-300 hover:border-blue-500 text-[#0B1B3D] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all"
            >
              <Maximize2 className="w-4 h-4 text-[#1D4ED8]" />
              <span>View Full Screen & Export High-Res PNG (1080×1350)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Modal */}
      <PosterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={currentPosterData}
      />
    </section>
  );
};


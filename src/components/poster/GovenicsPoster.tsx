// src/components/poster/GovenicsPoster.tsx
// Core 4:5 Portrait Infographic Poster Component for GOVENICS
// Strictly follows Enterprise Brand Identity: White / Light Blue theme with Navy & Royal Blue Typography

import { forwardRef, useState } from "react";
import type { PosterData } from "@/data/posterData";
import { PosterHeader } from "./PosterHeader";
import { PosterHeadline } from "./PosterHeadline";
import { IntelligenceStat } from "./IntelligenceStat";
import { IndustryVisual } from "./IndustryVisual";
import { RiskPanel } from "./RiskPanel";
import { SolutionCapabilities } from "./SolutionCapabilities";
import { PosterCTA } from "./PosterCTA";
import { PosterFooter } from "./PosterFooter";
import { Download, Maximize2, Check, Copy } from "lucide-react";

interface GovenicsPosterProps {
  data: PosterData;
  isCompact?: boolean;
  onExpand?: () => void;
  onExport?: () => void;
  showActions?: boolean;
}

export const GovenicsPoster = forwardRef<HTMLDivElement, GovenicsPosterProps>(
  ({ data, isCompact = false, onExpand, onExport, showActions = true }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCaption = () => {
      const caption = `🚨 ${data.headline.prefix || ""} ${data.headline.highlight} ${data.headline.suffix || ""}

📊 Verified Intelligence (${data.stat.source}, ${data.stat.year}):
${data.stat.figure} ${data.stat.label} — ${data.stat.context}

Key Operational Vulnerabilities:
${data.risks.map(r => `• ${r}`).join("\n")}

HOW GOVENICS HELPS:
${data.solutions.map(s => `✓ ${s.title}: ${s.desc}`).join("\n")}

GOVENICS GRC — A Division of ISI Group (Est. 1985)
🌐 https://govenics.com
💬 Request a consultation: https://govenics.com${data.cta.link}

#GOVENICS #GRC #Compliance #${data.categoryName.replace(/[^a-zA-Z0-9]/g, "")} #RiskManagement`;

      navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };

    return (
      <div className="relative group w-full max-w-[620px] mx-auto">
        {/* Floating Actions Bar (Top-Right) */}
        {showActions && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-blue-200/80 shadow-md">
            {onExpand && (
              <button
                onClick={onExpand}
                className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-[#1D4ED8] transition-colors"
                title="Expand Full Poster"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleCopyCaption}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-[#1D4ED8] transition-colors"
              title="Copy LinkedIn Caption"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            {onExport && (
              <button
                onClick={onExport}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1D4ED8] hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-xs"
                title="Export High-Res 4:5 Poster"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export 4:5</span>
              </button>
            )}
          </div>
        )}

        {/* 4:5 Ratio Poster Canvas */}
        <div
          ref={ref}
          id={`poster-${data.id}`}
          className="w-full bg-white rounded-3xl border-2 border-blue-200/80 shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300"
          style={{
            background: "linear-gradient(170deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)",
            color: "#0B1B3D"
          }}
        >
          {/* Subtle Geometric Background Watermark */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1e40af_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-100/50 via-sky-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Section A: Brand Header */}
          <PosterHeader categoryBadge={data.categoryName} isCompact={isCompact} />

          {/* Section B: Strong Headline */}
          <PosterHeadline headline={data.headline} targetPersona={data.targetPersona} isCompact={isCompact} />

          {/* Middle Content Split / Grid */}
          <div className="w-full">
            {/* Section C: Intelligence Stat */}
            <IntelligenceStat stat={data.stat} isCompact={isCompact} />

            {/* Section D: Industry Visual Graphic */}
            <IndustryVisual theme={data.visualTheme} categoryName={data.categoryName} isCompact={isCompact} />

            {/* Section E: Business Risk / Pain Points Panel */}
            <RiskPanel risks={data.risks} isCompact={isCompact} />

            {/* Section F: GOVENICS Solution Capabilities */}
            <SolutionCapabilities solutions={data.solutions} isCompact={isCompact} />
          </div>

          {/* Section G: CTA */}
          <PosterCTA cta={data.cta} isCompact={isCompact} />

          {/* Section H: Footer */}
          <PosterFooter />
        </div>
      </div>
    );
  }
);

GovenicsPoster.displayName = "GovenicsPoster";


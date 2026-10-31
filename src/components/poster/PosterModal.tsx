// src/components/poster/PosterModal.tsx
// Interactive Fullscreen Modal with 1080x1350 (4:5) High-Res Export
import React, { useRef, useState } from "react";
import type { PosterData } from "@/data/posterData";
import { GovenicsPoster } from "./GovenicsPoster";
import { X, Download, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PosterData;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose, data }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleExportPng = async () => {
    if (!posterRef.current) return;
    setIsExporting(true);
    try {
      // Generate clean high-resolution image at 1080x1350 scale
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 2.5, // Crisp 1080x1350 resolution
        cacheBust: true,
        backgroundColor: "#FFFFFF",
        style: {
          transform: "scale(1)",
        }
      });

      const link = document.createElement("a");
      link.download = `GOVENICS_POSTER_${data.id.toUpperCase()}_4x5.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = () => {
    const text = `🚨 ${data.headline.prefix || ""} ${data.headline.highlight} ${data.headline.suffix || ""}

📊 Verified Stat (${data.stat.source}, ${data.stat.year}):
${data.stat.figure} ${data.stat.label} — ${data.stat.context}

Key Operational Risks:
${data.risks.map(r => `• ${r}`).join("\n")}

HOW GOVENICS HELPS:
${data.solutions.map(s => `✓ ${s.title}: ${s.desc}`).join("\n")}

GOVENICS GRC — A Division of ISI Group (Est. 1985)
🌐 https://govenics.com
💬 Request a consultation: https://govenics.com${data.cta.link}

#GOVENICS #GRC #Compliance #${data.categoryName.replace(/[^a-zA-Z0-9]/g, "")} #RiskManagement`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-200 overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1D4ED8]" />
            <div>
              <h3 className="text-base font-bold text-[#0B1B3D]">
                GOVENICS 4:5 Infographic Poster Studio
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Optimized for LinkedIn Feeds (1080 × 1350 px) & Executive Briefings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-50 text-slate-700 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
              <span>{copied ? "Copied" : "Copy Caption"}</span>
            </button>

            <button
              onClick={handleExportPng}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExporting ? "Rendering PNG..." : "Download 4:5 PNG"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Poster Canvas */}
        <div className="p-4 sm:p-8 bg-slate-100/50 flex justify-center items-center max-h-[80vh] overflow-y-auto">
          <div className="w-full max-w-[560px]">
            <GovenicsPoster ref={posterRef} data={data} showActions={false} />
          </div>
        </div>
      </div>
    </div>
  );
};


// src/components/poster/IndustryVisual.tsx
// Section D: Industry-Specific Conceptual Visual & Technical Compliance Graphic
import React from "react";
import { 
  ShieldCheck, Cpu, Factory, Activity, 
  Coins, Lock, Leaf, Truck, CheckCircle2, 
  Settings, Building2, Flame, ShoppingCart
} from "lucide-react";

interface IndustryVisualProps {
  theme: string;
  categoryName: string;
  isCompact?: boolean;
}

export const IndustryVisual: React.FC<IndustryVisualProps> = ({ theme, categoryName, isCompact = false }) => {
  const getThemeVisual = () => {
    switch (theme) {
      case "governance":
        return {
          icon: ShieldCheck,
          badge: "MCA / SEBI LODR / Sec 134(5)",
          metric: "Multi-Entity Visibility",
          metricSub: "Holding-to-Subsidiary Governance",
          accentColor: "from-blue-700 to-indigo-800",
          subIcon: Building2,
          isEntity: true
        };
      case "manufacturing":
        return {
          icon: Factory,
          badge: "ISO 45001 / Factories Act",
          metric: "Zero Stoppages",
          metricSub: "Plant EHS Verification",
          accentColor: "from-blue-600 to-indigo-700",
          subIcon: Settings,
          isEntity: false
        };
      case "cyber":
      case "technology":
        return {
          icon: Lock,
          badge: "DPDP Act / ISO 27001",
          metric: "6-Hour SLA",
          metricSub: "CERT-In Breach Defense",
          accentColor: "from-blue-600 to-cyan-600",
          subIcon: Cpu,
          isEntity: false
        };
      case "finance":
        return {
          icon: Coins,
          badge: "RBI SBR / SEBI LODR",
          metric: "100% Defense",
          metricSub: "Supervisory Audit Shield",
          accentColor: "from-blue-700 to-sky-700",
          subIcon: ShieldCheck,
          isEntity: false
        };
      case "healthcare":
        return {
          icon: Activity,
          badge: "Schedule M / NABH",
          metric: "Zero Recalls",
          metricSub: "Clinical Integrity SLA",
          accentColor: "from-blue-600 to-teal-700",
          subIcon: CheckCircle2,
          isEntity: false
        };
      case "food":
        return {
          icon: CheckCircle2,
          badge: "FSSAI FoSCoS Norms",
          metric: "100% Batch Trace",
          metricSub: "Zero Seizure Risk",
          accentColor: "from-blue-600 to-emerald-700",
          subIcon: Factory,
          isEntity: false
        };
      case "infrastructure":
        return {
          icon: Building2,
          badge: "RERA / BOCW Act",
          metric: "70% Escrow",
          metricSub: "Statutory Capital Shield",
          accentColor: "from-blue-800 to-slate-700",
          subIcon: Settings,
          isEntity: false
        };
      case "energy":
        return {
          icon: Flame,
          badge: "CEA / CPCB Norms",
          metric: "100% Currency",
          metricSub: "Continuous Telemetry",
          accentColor: "from-blue-700 to-amber-700",
          subIcon: ShieldCheck,
          isEntity: false
        };
      case "retail":
        return {
          icon: ShoppingCart,
          badge: "Legal Metrology / CCPA",
          metric: "Multi-State",
          metricSub: "Retail Shield SLA",
          accentColor: "from-blue-600 to-indigo-600",
          subIcon: CheckCircle2,
          isEntity: false
        };
      case "esg":
        return {
          icon: Leaf,
          badge: "BRSR Core / CBAM",
          metric: "Audit-Grade",
          metricSub: "Scope 1, 2, 3 Evidence",
          accentColor: "from-blue-700 to-emerald-600",
          subIcon: ShieldCheck,
          isEntity: false
        };
      case "supply-chain":
      case "trade":
        return {
          icon: Truck,
          badge: "AEO / CLRA Vendor",
          metric: "Zero Demurrage",
          metricSub: "Tier-1/2 Verified",
          accentColor: "from-blue-700 to-sky-800",
          subIcon: Settings,
          isEntity: false
        };
      default:
        return {
          icon: ShieldCheck,
          badge: "Enterprise GRC Governance",
          metric: "100% Defensible",
          metricSub: "Statutory Shield",
          accentColor: "from-blue-600 to-indigo-700",
          subIcon: Settings,
          isEntity: false
        };
    }
  };

  const v = getThemeVisual();
  const MainIcon = v.icon;
  const SecondaryIcon = v.subIcon;

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-[#0B1B3D] p-3.5 sm:p-4 text-white relative overflow-hidden border border-blue-400/30 shadow-md ${isCompact ? "mb-2.5" : "mb-4"}`}>
      {/* Subtle Blue Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-[9px] sm:text-[10px] font-bold text-sky-300 uppercase tracking-wider mb-1.5">
            <SecondaryIcon className="w-3 h-3 text-cyan-400" />
            <span>{v.badge}</span>
          </div>

          <div className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
            {v.metric}
          </div>
          <div className="text-[11px] sm:text-xs text-blue-200/90 font-medium">
            {v.metricSub} • {categoryName}
          </div>
        </div>

        {/* Dynamic Graphic: Entity Structure for Governance or Tier-1 Shield for others */}
        {v.isEntity ? (
          <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
            <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="w-0.5 h-2 bg-sky-400 my-0.5"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-cyan-400/30 border border-cyan-400 text-[8px] font-bold flex items-center justify-center">E1</span>
              <span className="w-4 h-4 rounded bg-cyan-400/30 border border-cyan-400 text-[8px] font-bold flex items-center justify-center">E2</span>
              <span className="w-4 h-4 rounded bg-cyan-400/30 border border-cyan-400 text-[8px] font-bold flex items-center justify-center">E3</span>
            </div>
            <span className="text-[8px] text-cyan-200 uppercase font-bold tracking-wider mt-1">Multi-Entity</span>
          </div>
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600/40 to-sky-400/20 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-inner">
            <MainIcon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-300" />
          </div>
        )}
      </div>
    </div>
  );
};

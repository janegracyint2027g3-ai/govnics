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
      case "manufacturing":
        return {
          icon: Factory,
          badge: "ISO 45001 / Factories Act",
          metric: "Zero Stoppages",
          metricSub: "Plant EHS Verification",
          accentColor: "from-blue-600 to-indigo-700",
          subIcon: Settings
        };
      case "cyber":
      case "technology":
        return {
          icon: Lock,
          badge: "DPDP Act / ISO 27001",
          metric: "6-Hour SLA",
          metricSub: "CERT-In Breach Defense",
          accentColor: "from-blue-600 to-cyan-600",
          subIcon: Cpu
        };
      case "finance":
        return {
          icon: Coins,
          badge: "RBI SBR / SEBI LODR",
          metric: "100% Defense",
          metricSub: "Supervisory Audit Shield",
          accentColor: "from-blue-700 to-sky-700",
          subIcon: ShieldCheck
        };
      case "healthcare":
        return {
          icon: Activity,
          badge: "Schedule M / NABH",
          metric: "Zero Recalls",
          metricSub: "Clinical Integrity SLA",
          accentColor: "from-blue-600 to-teal-700",
          subIcon: CheckCircle2
        };
      case "food":
        return {
          icon: CheckCircle2,
          badge: "FSSAI FoSCoS Norms",
          metric: "100% Batch Trace",
          metricSub: "Zero Seizure Risk",
          accentColor: "from-blue-600 to-emerald-700",
          subIcon: Factory
        };
      case "infrastructure":
        return {
          icon: Building2,
          badge: "RERA / BOCW Act",
          metric: "70% Escrow",
          metricSub: "Statutory Capital Shield",
          accentColor: "from-blue-800 to-slate-700",
          subIcon: Settings
        };
      case "energy":
        return {
          icon: Flame,
          badge: "CEA / CPCB Norms",
          metric: "100% Currency",
          metricSub: "Continuous Telemetry",
          accentColor: "from-blue-700 to-amber-700",
          subIcon: ShieldCheck
        };
      case "retail":
        return {
          icon: ShoppingCart,
          badge: "Legal Metrology / CCPA",
          metric: "Multi-State",
          metricSub: "Retail Shield SLA",
          accentColor: "from-blue-600 to-indigo-600",
          subIcon: CheckCircle2
        };
      case "esg":
        return {
          icon: Leaf,
          badge: "BRSR Core / CBAM",
          metric: "Audit-Grade",
          metricSub: "Scope 1, 2, 3 Evidence",
          accentColor: "from-blue-700 to-emerald-600",
          subIcon: ShieldCheck
        };
      case "supply-chain":
      case "trade":
        return {
          icon: Truck,
          badge: "AEO / CLRA Vendor",
          metric: "Zero Demurrage",
          metricSub: "Tier-1/2 Verified",
          accentColor: "from-blue-700 to-sky-800",
          subIcon: Settings
        };
      default:
        return {
          icon: ShieldCheck,
          badge: "Enterprise GRC Governance",
          metric: "100% Defensible",
          metricSub: "Statutory Shield",
          accentColor: "from-blue-600 to-indigo-700",
          subIcon: Settings
        };
    }
  };

  const v = getThemeVisual();
  const MainIcon = v.icon;
  const SecondaryIcon = v.subIcon;

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-[#0B1B3D] p-4 text-white relative overflow-hidden border border-blue-400/30 shadow-md ${isCompact ? "mb-3" : "mb-4.5"}`}>
      {/* Subtle Blue Geometric Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-[10px] sm:text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">
            <SecondaryIcon className="w-3 h-3 text-cyan-400" />
            <span>{v.badge}</span>
          </div>

          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {v.metric}
          </div>
          <div className="text-xs text-blue-200/90 font-medium">
            {v.metricSub} • {categoryName}
          </div>
        </div>

        {/* Conceptual Visual Emblem */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-800/80 to-blue-600/60 border border-blue-300/40 shadow-inner flex items-center justify-center shrink-0">
          <MainIcon className="w-7 h-7 sm:w-8 sm:h-8 text-sky-200" />
        </div>
      </div>
    </div>
  );
};


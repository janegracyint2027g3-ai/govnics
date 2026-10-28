import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { 
  Bot, Shield, Cpu, RefreshCw, Layers, CheckCircle2, 
  Download, ArrowRight, Server, Database, Code, ShieldCheck, Clock
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";

import { servicesSpicedSlides } from "@/data/spiced-slider-content";

export default function SgrcEstimatorPage() {
  const [empRange, setEmpRange] = useState<string>("100-500");
  const [statesCount, setStatesCount] = useState<string>("2-5");
  
  // Selected Modules
  const [modules, setModules] = useState<string[]>([
    "statutory-register",
    "vendor-audit"
  ]);

  // Selected AI Slabs
  const [aiSlabs, setAiSlabs] = useState<string[]>([
    "legal-parser",
    "ocr-auditor"
  ]);

  // Loader state
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "GRC Compliance Cost & Scope Estimator — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Calculate statutory audit requirements, scope multi-state compliance footprints, and estimate GRC governance investment with GOVENICS Estimator.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const toggleModule = (id: string) => {
    if (modules.includes(id)) {
      setModules(modules.filter(m => m !== id));
    } else {
      setModules([...modules, id]);
    }
  };

  const toggleAiSlab = (id: string) => {
    if (aiSlabs.includes(id)) {
      setAiSlabs(aiSlabs.filter(a => a !== id));
    } else {
      setAiSlabs([...aiSlabs, id]);
    }
  };

  const runCalculation = () => {
    setLoading(true);
    setLoadingStep(0);
    setShowResults(false);

    // Track telemetry calculations
    trackEvent("estimator_calc", "Statutory GRC", {
      state: statesCount === "1" ? "Single State" : statesCount === "2-5" ? "2-5 States" : statesCount === "6-15" ? "6-15 States" : "Pan-India",
      employeeCount: empRange === "<100" ? 50 : empRange === "100-500" ? 250 : empRange === "500-2500" ? 1500 : 5000,
      avgSalary: 22000,
      totalLiability: empRange === "<100" ? 165000 : empRange === "100-500" ? 825000 : empRange === "500-2500" ? 4950000 : 16500000,
      selectedModules: modules,
      selectedAiLayers: aiSlabs
    });

    // Simulate multi-step calculation logs
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setLoading(false);
          setShowResults(true);
          return 3;
        }
        return prev + 1;
      });
    }, 800);
  };

  const runDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Proposal PDF generation complete! The Govenics SGRC Architecture Blueprint has been downloaded successfully.");
    }, 2000);
  };

  // Dynamic calculations based on state options
  const calculateOutput = () => {
    let timelineWeeks = 6;
    let laborReduction = 65;
    let recommendedAgents: { name: string; role: string }[] = [];

    // Emp Range adjustments
    if (empRange === "<100") {
      timelineWeeks = 4;
      laborReduction = 55;
    } else if (empRange === "500-2500") {
      timelineWeeks = 10;
      laborReduction = 75;
    } else if (empRange === "2500+") {
      timelineWeeks = 16;
      laborReduction = 88;
    }

    // State count adjustment
    if (statesCount === "6-15") timelineWeeks += 2;
    if (statesCount === "16+") timelineWeeks += 4;

    // AI Agents mapping
    if (aiSlabs.includes("legal-parser")) {
      recommendedAgents.push({
        name: "Gov-Gazette Lexer Agent",
        role: "Continuously scans regional gazette notifications and extracts statutory variables (minimum wages, PT adjustments) in real-time."
      });
    }
    if (aiSlabs.includes("ocr-auditor")) {
      recommendedAgents.push({
        name: "SLA Vendor Sentry Agent",
        role: "Performs OCR scans on contractor salary challans, bank receipts, and PF rosters, validating payroll details against compliance rules."
      });
    }
    if (aiSlabs.includes("grc-copilot")) {
      recommendedAgents.push({
        name: "Legal Advisory Copilot",
        role: "Allows HR teams to run natural language searches inside corporate registers, employee handbooks, and POSH charters."
      });
    }
    if (aiSlabs.includes("risk-modeler")) {
      recommendedAgents.push({
        name: "Litigation Predictor Sentry",
        role: "Monitors unresolved employee grievances and vendor defaults to predict litigation probability and alert the legal board."
      });
    }

    if (recommendedAgents.length === 0) {
      recommendedAgents.push({
        name: "Basic Rule Sentry Agent",
        role: "Monitors static compliance registers and sends automated calendar alerts prior to filing deadlines."
      });
    }

    return {
      timeline: timelineWeeks,
      efficiency: laborReduction,
      agents: recommendedAgents
    };
  };

  const results = calculateOutput();

  const loadingMessages = [
    "Analyzing workforce footprint & state registrations...",
    "Calibrating regulatory requirements mapping database...",
    "Configuring Agentic AI orchestration pipelines...",
    "Synthesizing customized platform architecture blueprint..."
  ];

  const heroSlides = servicesSpicedSlides;

  const stats: GrcStatCardItem[] = [
    { value: "↓ 88", suffix: "%", label: "Compliance Labor Reduction", icon: ShieldCheck, badge: "Efficiency", description: "Automated OCR & parser agents replace manual audits" },
    { value: "4 - 16", suffix: " Wks", label: "Implementation Horizon", icon: Clock, badge: "Velocity", description: "Rapid phased rollout across single or pan-India states" },
    { value: "100", suffix: "%", label: "Statutory SLA Adherence", icon: CheckCircle2, badge: "Quality", description: "Zero-lag task routing and automated escalations" },
    { value: "₹0", label: "Penalty Slippage Exposure", icon: Shield, badge: "Protection", description: "Shielding boards from statutory fines & closure notices" }
  ];

  return (
    <Layout noPadding={true}>
      <div className="bg-slate-50/50 min-h-screen pb-24 text-slate-700">
        
        {/* Panel 1: Hero Carousel Slider */}
        <GrcSliderHero 
          slides={heroSlides} 
          backLink={{ to: "/sgrc/services", label: "Back to SGRC Portal" }} 
          categoryLabel="Estimator & Scoping"
        />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* Section Header */}
        <section className="container mx-auto px-6 max-w-4xl text-center space-y-4 pt-12 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            AI Platform Estimator
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Estimate Your Custom GRC Platform
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-500 font-semibold max-w-xl mx-auto">
            Design a custom, AI-agent powered GRC platform similar to Simpliance. Customise your parameters and generate a comprehensive architecture roadmap instantly.
          </p>
        </section>

        {/* Form Container */}
        <section className="container mx-auto px-6 max-w-4xl text-left">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md space-y-8">
            
            {/* Slabs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Range */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Total Active Workforce Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "<100", label: "<100" },
                    { id: "100-500", label: "100-500" },
                    { id: "500-2500", label: "500+" },
                    { id: "2500+", label: "2500+" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEmpRange(item.id)}
                      className={`h-11 rounded-xl border text-xs font-bold transition-all ${
                        empRange === item.id
                          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* States Footprint */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Geographic Footprint (States of Operation)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "1", label: "1 State" },
                    { id: "2-5", label: "2-5 States" },
                    { id: "6-15", label: "6-15" },
                    { id: "16+", label: "Pan-India" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setStatesCount(item.id)}
                      className={`h-11 rounded-xl border text-xs font-bold transition-all ${
                        statesCount === item.id
                          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20"
                          : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modules Checkbox Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Select Required Compliance Modules
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: "statutory-register", label: "Statutory Compliance Register", desc: "Automate shop/establishment listings" },
                  { id: "vendor-audit", label: "Vendor Compliance Auditor", desc: "Track ESI/PF logs for third-party manpower" },
                  { id: "ehs-consents", label: "EHS pollution Consents", desc: "CTE/CTO alert calendar management" },
                  { id: "posh", label: "POSH Grievance Panel", desc: "Airtight cases log and workflow" },
                  { id: "elibrary-api", label: "e-Library Regulatory API", desc: "Lookup wages, PT, LWF dynamically" }
                ].map((item) => {
                  const selected = modules.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleModule(item.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        selected
                          ? "bg-blue-50/50 border-blue-500 shadow-sm"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selected}
                        onChange={() => {}} // handled by click
                        className="mt-1 accent-blue-600"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">{item.label}</div>
                        <div className="text-[10px] text-slate-450 leading-relaxed font-semibold">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Agentic Layers Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Configure Agentic AI Layers (AI Platform Capabilities)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "legal-parser", label: "Gov-Gazette Parser Agent", desc: "Autonomous LLM parsing of central and state updates daily.", icon: Bot },
                  { id: "ocr-auditor", label: "OCR Payroll Auditing Sentry", desc: "AI validation of payroll challans, preventing vendor failures.", icon: Cpu },
                  { id: "grc-copilot", label: "Natural Language GRC Copilot", desc: "Chat querying for internal GxP registries & policy handbooks.", icon: Layers },
                  { id: "risk-modeler", label: "Predictive Litigation Predictor", desc: "Alert dials on unresolved compliance triggers and litigation.", icon: Shield }
                ].map((item) => {
                  const selected = aiSlabs.includes(item.id);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleAiSlab(item.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                        selected
                          ? "bg-blue-50/50 border-blue-500 shadow-sm"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-black text-slate-850 flex items-center gap-1.5">
                          {item.label}
                          {selected && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />}
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold leading-normal">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Calculate Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-center">
              <button
                onClick={runCalculation}
                disabled={loading}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 text-sm uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Estimate...
                  </>
                ) : (
                  <>
                    Calculate Platform Estimate <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </section>

        {/* Loading overlay / step animations */}
        {loading && (
          <section className="container mx-auto px-6 max-w-4xl mt-8 text-left">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 flex items-center gap-4 shadow-xl">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin shrink-0" />
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                  GOVENICS.AI COMPILER
                </span>
                <p className="text-xs font-mono leading-normal text-slate-300">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Results Sections */}
        {showResults && (
          <section className="container mx-auto px-6 max-w-4xl mt-8 text-left space-y-8 animate-fade-in">
            
            {/* Outcomes summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline estimate */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Implementation Timeline
                  </span>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {results.timeline} Weeks
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block">
                    Phase 1: Setup & Ingestion (2W) • Phase 2: AI Core (4W)
                  </span>
                </div>
              </div>

              {/* Resource Reduction */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Manual Labor Reduction
                  </span>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {results.efficiency}%
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block">
                    Continuous monitoring replaces periodic manual audits.
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Details Blueprint */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900 font-heading border-l-4 border-blue-600 pl-3">
                Recommended AI Platform Architecture Blueprint
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-slate-150 rounded-2xl space-y-3 bg-slate-50/50">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-800 uppercase tracking-wider">
                    <Server className="w-4 h-4 text-blue-600" />
                    Frontend Platform
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-normal">
                    Next.js based responsive platform. Embeds client statutory calendars, checklist registers, and analytics widgets.
                  </p>
                </div>
                <div className="p-4 border border-slate-150 rounded-2xl space-y-3 bg-slate-50/50">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-800 uppercase tracking-wider">
                    <Database className="w-4 h-4 text-blue-600" />
                    Vector DB & Storage
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-normal">
                    PgVector or Pinecone DB holding vectorized clauses of 29 labor acts, state rules, and company policy manuals.
                  </p>
                </div>
                <div className="p-4 border border-slate-150 rounded-2xl space-y-3 bg-slate-50/50">
                  <div className="flex items-center gap-2 font-black text-xs text-slate-800 uppercase tracking-wider">
                    <Code className="w-4 h-4 text-blue-600" />
                    AI Agentic Core
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-normal">
                    LangGraph backend orchestrating specialized legal LLM agents (using Llama-3-70B or GPT-4o-mini).
                  </p>
                </div>
              </div>

              {/* Recommended AI Agents list */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Recommended AI Agent Slayers
                </h3>
                <div className="space-y-3">
                  {results.agents.map((agent, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-left space-y-1">
                      <div className="text-xs font-black text-slate-800 flex items-center gap-2">
                        <Bot className="w-4.5 h-4.5 text-blue-600" />
                        {agent.name}
                      </div>
                      <p className="text-[10px] text-slate-550 leading-relaxed font-semibold pl-6">
                        {agent.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download / Proposal Section */}
              <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-50/50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 rounded-b-3xl">
                <div className="text-left space-y-1">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-blue-600" /> Complete Proposal Compiled
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-normal">
                    Download the complete architecture design blueprint, costing tables, and SLA agreements in a single PDF.
                  </p>
                </div>
                <button
                  onClick={runDownload}
                  disabled={downloading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> Download Proposal PDF
                    </>
                  )}
                </button>
              </div>

            </div>

          </section>
        )}

      </div>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { sgrcServices } from "@/data/sgrc-data";
import { sgrcChecklistsData } from "@/data/sgrc-checklists";
import type { ChecklistItem } from "@/data/sgrc-checklists";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { 
  CheckCircle2, Scale, Shield, Building, CreditCard, 
  Factory, Users, ShieldAlert, UserPlus, FileSpreadsheet, 
  Leaf, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck, Briefcase,
  Printer, RotateCcw, Check, ChevronDown, Clock
} from "lucide-react";

import heroVerify from "@/assets/hero-verify.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";

export default function SgrcServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = sgrcServices.find((s) => s.id === serviceId);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  
  // Wizard & FAQ states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCheckedItems({}); // reset checklist on route change
    setMounted(true);
    setCurrentQuestionIndex(0); // reset wizard index
    setOpenFaqIndex(null); // reset FAQ index
    if (service) {
      document.title = `${service.title} | Statutory Compliance Audit — GOVENICS`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = `${service.description} Interactive self-audit checklist, applicability scoping, and penalty prevention by GOVENICS GRC.`;
      if (metaDesc) {
        metaDesc.setAttribute('content', descContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = descContent;
        document.head.appendChild(meta);
      }
    }
  }, [serviceId, service]);

  if (!service) {
    return <Navigate to="/sgrc/e-library" replace />;
  }

  const checklistItems: ChecklistItem[] = sgrcChecklistsData[service.id] || [];
  const totalItems = checklistItems.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentComplete = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    setCheckedItems({});
    setCurrentQuestionIndex(0);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  // Helper to map Lucide Icons
  const getIcon = (id: string) => {
    switch (id) {
      case "compliance-risk-audit":
        return <Scale className="w-8 h-8 text-blue-600" />;
      case "establishment-compliances":
        return <Building className="w-8 h-8 text-blue-600" />;
      case "payroll-compliance":
        return <CreditCard className="w-8 h-8 text-blue-600" />;
      case "factory-compliance":
        return <Factory className="w-8 h-8 text-blue-600" />;
      case "vendor-compliance":
        return <Users className="w-8 h-8 text-blue-600" />;
      case "mines-compliance":
        return <ShieldAlert className="w-8 h-8 text-blue-600" />;
      case "flexi-staffing":
        return <UserPlus className="w-8 h-8 text-blue-600" />;
      case "payroll-services":
        return <FileSpreadsheet className="w-8 h-8 text-blue-600" />;
      case "ehs":
        return <Leaf className="w-8 h-8 text-blue-600" />;
      default:
        return <Shield className="w-8 h-8 text-blue-600" />;
    }
  };

  // Dynamic Hero Slides
  const heroSlides = [
    {
      badge: "Statutory GRC Division",
      title: service.title,
      highlight: "Compliance Overwatch",
      description: service.tagline,
      image: heroVerify,
      icp: "Enterprises & Multi-Plant Facilities",
      outcome: "100% Inspection Readiness & Zero Litigation",
      cta: "Explore Service Scope"
    },
    {
      badge: "Statutory Shield",
      title: "Automated Register Tracking &",
      highlight: "Continuous Audits",
      description: service.description,
      image: heroSoc,
      icp: "CFOs, HR Directors & Compliance Heads",
      outcome: "Full State & Central Rules Alignment",
      cta: "Run Self-Audit Checklist"
    },
    {
      badge: "Pan-India Oversight",
      title: "Risk-Free Inspections &",
      highlight: "Notice Defense",
      description: "Continuous auditing of third-party contracts, payroll records, and statutory licenses to eliminate non-compliance exposure.",
      image: verticalsFacility,
      icp: "Contractor Networks & Operations",
      outcome: "Zero Statutory Deviation Records",
      cta: "Schedule Advisory Call"
    }
  ];

  // Dynamic Key Metrics
  const stats: GrcStatCardItem[] = [
    { value: "0", label: "Statutory Penalty Slippage", icon: ShieldCheck, badge: "Guaranteed", description: "Zero-lag filings across central & state registries" },
    { value: "100", suffix: "%", label: "Inspection Status Pass Rate", icon: CheckCircle2, badge: "Pan-India", description: "Proven audit track record across 28 states & UTs" },
    { value: "↓ 75", suffix: "%", label: "Audit Preparation Timeline", icon: Clock, badge: "Velocity", description: "Standardized templates reduce audit overhead" },
    { value: "28", suffix: " States", label: "Central & State Acts Covered", icon: Building, badge: "Coverage", description: "Full mapping of factory, shop, labor & EHS codes" }
  ];

  return (
    <Layout noPadding={true}>
      <div className="bg-slate-50/50 min-h-screen pb-24 text-slate-700">
        
        {/* Panel 1: Hero Carousel Slider */}
        <GrcSliderHero 
          slides={heroSlides} 
          backLink={{ to: "/sgrc/services", label: "Back to SGRC Services" }} 
          categoryLabel="Statutory Practice"
        />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* Main Content Grid */}
        <section className="container mx-auto px-6 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* Left Column: Problem & Features (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* About / Problem Statement */}
            <div className="bg-white border border-slate-200/85 rounded-3xl p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 font-heading border-l-4 border-blue-600 pl-3">
                Service Overview
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-600 font-medium">
                {service.description}
              </p>
            </div>

            {/* Core Offerings / Features List */}
            <div className="bg-white border border-slate-200/85 rounded-3xl p-8 shadow-sm space-y-6 no-print">
              <h2 className="text-xl font-black text-slate-900 font-heading border-l-4 border-blue-600 pl-3">
                Our Comprehensive Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl space-y-2 hover:border-blue-500/20 transition-all">
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Audit Checklist & Printable Dashboard */}
            <div className="bg-white border border-slate-200/85 rounded-3xl p-8 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div className="text-left">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                    Operational Utility Tool
                  </span>
                  <h2 className="text-xl font-black text-slate-900 font-heading mt-0.5">
                    Statutory Audit Readiness Checklist
                  </h2>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={handleClear}
                    disabled={completedCount === 0}
                    className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/10"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Checklist</span>
                  </button>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                  <span>Readiness Score</span>
                  <span className="text-blue-600 font-extrabold">{percentComplete}% ({completedCount}/{totalItems} items completed)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-500" 
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>

              {/* List of Tasks / Wizard Layout */}
              {totalItems > 0 && (
                <div className="space-y-6">
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Audit Progress</span>
                    <span>Question {currentQuestionIndex + 1} of {totalItems}</span>
                  </div>
                  
                  {/* Progress dots bar */}
                  <div className="flex gap-1.5 w-full h-1">
                    {checklistItems.map((item, idx) => {
                      const isAnswered = checkedItems[item.id] !== undefined;
                      const isActive = idx === currentQuestionIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isActive 
                              ? "bg-blue-600 h-1.5 -translate-y-[1px]" 
                              : isAnswered 
                                ? "bg-emerald-500 h-1" 
                                : "bg-slate-200 h-1 hover:bg-slate-350"
                          }`}
                          title={`Go to Checkpoint ${idx + 1}`}
                        />
                      );
                    })}
                  </div>

                  {/* Active Question Card */}
                  {(() => {
                    const item = checklistItems[currentQuestionIndex];
                    if (!item) return null;
                    const isChecked = !!checkedItems[item.id];
                    const isAnswered = checkedItems[item.id] !== undefined;
                    
                    return (
                      <div 
                        className={`p-6 border rounded-3xl transition-all duration-300 flex flex-col items-start gap-4 select-none min-h-[250px] relative overflow-hidden ${
                          isAnswered 
                            ? isChecked 
                              ? "bg-emerald-50/10 border-emerald-200/80 shadow-md shadow-emerald-500/5" 
                              : "bg-rose-50/10 border-rose-200/80 shadow-md shadow-rose-500/5"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        {/* Decorative background logo icon */}
                        <div className="absolute top-4 right-4 text-slate-100/40 pointer-events-none">
                          {getIcon(service.id)}
                        </div>

                        <div className="space-y-3.5 flex-1 w-full relative z-10">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                              Check {currentQuestionIndex + 1}
                            </span>
                            <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full border ${
                              item.severity === "High" 
                                ? "bg-rose-50 text-rose-700 border-rose-200" 
                                : item.severity === "Medium"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}>
                              {item.severity} Risk
                            </span>
                          </div>

                          <h3 className={`text-base font-black tracking-tight transition-colors ${isAnswered ? isChecked ? "text-emerald-950" : "text-rose-950" : "text-slate-900"}`}>
                            {item.title}
                          </h3>
                          
                          {/* Question Prompt */}
                          <p className="text-xs text-slate-700 font-bold bg-slate-50 border border-slate-100 rounded-2xl p-4 leading-relaxed shadow-inner">
                            <span className="text-blue-600 font-black mr-1.5 uppercase tracking-wide text-[10px]">Question:</span>
                            Has your organization verified that {item.desc.charAt(0).toLowerCase() + item.desc.slice(1)}
                          </p>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100 mt-4 w-full">
                            {/* Verification Guideline */}
                            <div className="text-[10px] text-slate-500 font-semibold leading-normal max-w-full sm:max-w-[65%]">
                              <span className="font-extrabold text-slate-400 uppercase tracking-wide block mb-0.5">Verification Protocol:</span>
                              {item.verificationMethod}
                            </div>

                            {/* Response Buttons */}
                            <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setCheckedItems(prev => ({ ...prev, [item.id]: true }));
                                  
                                  // Auto-flip to next question with a tiny delay
                                  if (currentQuestionIndex < totalItems - 1) {
                                    setTimeout(() => {
                                      setCurrentQuestionIndex(prev => prev + 1);
                                    }, 400);
                                  }
                                }}
                                className={`flex-1 sm:flex-initial h-9 px-4 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                                  isAnswered && isChecked
                                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Yes, Compliant</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCheckedItems(prev => ({ ...prev, [item.id]: false }));
                                  
                                  // Auto-flip to next question with a tiny delay
                                  if (currentQuestionIndex < totalItems - 1) {
                                    setTimeout(() => {
                                      setCurrentQuestionIndex(prev => prev + 1);
                                    }, 400);
                                  }
                                }}
                                className={`flex-1 sm:flex-initial h-9 px-4 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center ${
                                  isAnswered && !isChecked
                                    ? "bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-500/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <span>Pending / Gap</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Navigation Footer */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="px-4 h-9 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 disabled:opacity-55 disabled:pointer-events-none transition-all flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Ready: {percentComplete}% Done
                    </div>

                    <button
                      type="button"
                      disabled={currentQuestionIndex === totalItems - 1}
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-4 h-9 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 disabled:opacity-55 disabled:pointer-events-none transition-all flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Printable Area - Hidden on Screen */}
            {mounted && createPortal(
              <div id="printable-checklist-area" className="hidden">
                <style dangerouslySetInnerHTML={{__html: `
                  @media print {
                    body > :not(#printable-checklist-area) {
                      display: none !important;
                    }
                    #printable-checklist-area {
                      display: block !important;
                    width: 100% !important;
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                    color: #1e293b !important;
                    padding: 40px !important;
                    box-sizing: border-box !important;
                  }
                  .print-header {
                    border-bottom: 3px double #0f172a !important;
                    padding-bottom: 12px !important;
                    margin-bottom: 20px !important;
                    text-align: center !important;
                  }
                  .print-title {
                    font-size: 24px !important;
                    font-weight: 800 !important;
                    color: #0f172a !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.75px !important;
                    margin: 8px 0 4px 0 !important;
                  }
                  .print-meta {
                    font-size: 11px !important;
                    color: #64748b !important;
                    font-weight: 600 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.5px !important;
                  }
                  .doc-control {
                    display: flex !important;
                    justify-content: space-between !important;
                    font-size: 10px !important;
                    color: #475569 !important;
                    border: 1px solid #cbd5e1 !important;
                    background-color: #f8fafc !important;
                    padding: 10px 15px !important;
                    margin-bottom: 20px !important;
                    border-radius: 6px !important;
                  }
                  .audit-summary {
                    display: flex !important;
                    justify-content: space-between !important;
                    border: 1px solid #94a3b8 !important;
                    background-color: #f1f5f9 !important;
                    padding: 12px 18px !important;
                    margin-bottom: 24px !important;
                    border-radius: 6px !important;
                    font-size: 11px !important;
                  }
                  .print-table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin-top: 15px !important;
                    margin-bottom: 30px !important;
                  }
                  .print-table th, .print-table td {
                    border: 1px solid #cbd5e1 !important;
                    padding: 10px 8px !important;
                    text-align: left !important;
                    font-size: 11px !important;
                    vertical-align: top !important;
                  }
                  .print-table th {
                    background-color: #f1f5f9 !important;
                    font-weight: 700 !important;
                    color: #0f172a !important;
                    text-transform: uppercase !important;
                    font-size: 10px !important;
                    letter-spacing: 0.5px !important;
                  }
                  .print-cb {
                    width: 90px !important;
                    text-align: center !important;
                    font-weight: bold !important;
                    font-size: 11px !important;
                  }
                  .print-severity {
                    width: 75px !important;
                    text-align: center !important;
                    font-weight: 800 !important;
                    font-size: 10px !important;
                  }
                  .print-signatures {
                    margin-top: 50px !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    font-size: 11px !important;
                    font-weight: bold !important;
                  }
                  .sig-line {
                    border-top: 1.5px solid #0f172a !important;
                    width: 220px !important;
                    text-align: center !important;
                    padding-top: 6px !important;
                    color: #0f172a !important;
                  }
                  .no-print {
                    display: none !important;
                  }
                }
              `}} />
              
              <div className="print-header">
                <div style={{ fontSize: "12px", fontWeight: "800", color: "#2563eb", letterSpacing: "1.5px", textTransform: "uppercase" }}>Govenics GRC Assurance Portal</div>
                <h1 className="print-title">{service.title}</h1>
                <div className="print-meta">
                  Statutory Audit Readiness Worksheet &bull; Compliance Overwatch
                </div>
              </div>

              <div className="doc-control">
                <div>
                  <strong>DOCUMENT ID:</strong> GOV-GRC-{service.id.toUpperCase()}-CKL<br />
                  <strong>CLASSIFICATION:</strong> Confidential &bull; Corporate Compliance Audit Evidence
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>AUDIT SYSTEM VERSION:</strong> 2.4.0-Enterprise<br />
                  <strong>RUN DATE:</strong> {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="audit-summary">
                <div style={{ flex: 1 }}>
                  <strong>Scope Description:</strong> {service.tagline}<br />
                  <strong>Methodology:</strong> Standardized GRC Risk Protocol (ISO 37301 Framework)
                </div>
                <div style={{ width: "220px", borderLeft: "1px solid #cbd5e1", paddingLeft: "20px", marginLeft: "20px" }}>
                  <strong>Readiness Audit Score:</strong> {percentComplete}% Certified<br />
                  <strong>Verified Controls:</strong> {completedCount} of {totalItems} Points Completed
                </div>
              </div>

              <table className="print-table">
                <thead>
                  <tr>
                    <th className="print-cb" style={{ textAlign: "center" }}>Status</th>
                    <th className="print-severity" style={{ textAlign: "center" }}>Severity</th>
                    <th style={{ width: "150px" }}>Checkpoint</th>
                    <th>Audit Action / Requirement</th>
                    <th style={{ width: "200px" }}>Verification Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistItems.map((item) => (
                    <tr key={item.id}>
                      <td className="print-cb" style={{ textAlign: "center", color: checkedItems[item.id] ? "#16a34a" : "#dc2626", fontSize: "10px", fontWeight: "700" }}>
                        {checkedItems[item.id] ? "COMPLIANT" : "PENDING"}
                      </td>
                      <td className="print-severity" style={{ textAlign: "center" }}>
                        <span style={{
                          color: item.severity === "High" ? "#e11d48" : item.severity === "Medium" ? "#d97706" : "#2563eb",
                          fontSize: "10px",
                          fontWeight: "800"
                        }}>
                          {item.severity.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontWeight: "700", color: "#0f172a" }}>{item.title}</td>
                      <td>{item.desc}</td>
                      <td style={{ fontSize: "10.5px", color: "#475569", fontStyle: "italic" }}>{item.verificationMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="print-signatures">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ height: "45px" }}></div>
                  <div className="sig-line">Lead Auditor (Name & Signature)</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ height: "45px" }}></div>
                  <div className="sig-line">Compliance Officer (Approval)</div>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* FAQs Accordion (If applicable) */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white border border-slate-200/85 rounded-3xl p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-slate-900 font-heading border-l-4 border-blue-600 pl-3">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 transition-all">
                        <h4 
                          onClick={() => toggleFaq(idx)}
                          className="text-sm font-black text-slate-950 flex items-start justify-between gap-3 leading-snug cursor-pointer select-none"
                        >
                          <div className="flex items-start gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="hover:text-blue-600 transition-colors">{faq.q}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                        </h4>
                        {isOpen && (
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold pl-7 pt-3 mt-3 border-t border-slate-250/80 transition-all duration-300">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar ICP & Benefits (1/3 width) */}
          <div className="space-y-8">
            {/* Who Needs This */}
            <div className="bg-white border border-slate-200/85 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-l-2 border-blue-500 pl-2">
                Who Needs This?
              </h3>
              <ul className="space-y-3 pt-2">
                {service.whoNeeds.map((need, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-bold leading-relaxed">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Business Benefits */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-black uppercase tracking-wider border-l-2 border-white/60 pl-2">
                Compliance Outcomes
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-bold leading-relaxed text-white/90">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link to="/contact">
                  <button className="w-full py-3 bg-white hover:bg-slate-100 text-blue-700 font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all">
                    Request Statutory Audit
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Direct Navigator to e-Library */}
            <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-blue-400">
                Interactive e-Library
              </h3>
              <p className="text-xs text-slate-400 font-bold leading-relaxed">
                Need to quickly lookup live state-wise minimum wages, PT slabs, holidays, or Leave limits? Open our digital e-Library database.
              </p>
              <Link 
                to="/sgrc/e-library" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-400 transition-colors uppercase tracking-wider"
              >
                Open e-Library <ArrowRight className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              </Link>
            </div>
          </div>

        </section>

      </div>
    </Layout>
  );
}

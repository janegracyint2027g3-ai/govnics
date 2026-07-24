import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { servicesData } from "@/data/services-data";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle2, ChevronRight, Briefcase, FileText, Scale, Settings } from "lucide-react";
import heroVerify from "@/assets/hero-verify.jpg";
import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";
import heroDrone from "@/assets/hero-drone.jpg";
import heroSoc from "@/assets/hero-soc.jpg";

export default function GrcPage() {
  const [activeTab, setActiveTab] = useState<string>("compliance");

  // Slider 1: Hero Slides (8 slides)
  const heroSlides = [
    {
      title: "Your Risk Register Is a Tombstone.",
      highlight: "Build a Living Risk Engine.",
      description: "Replace static Excel registers with dynamic, quantified risk matrices aligned to ISO 31000—where risks auto-update, auto-prioritize, and auto-escalate.",
      outcome: "Identify hidden risks 2x faster and prevent material losses",
      icp: "Risk Managers in Fortune 500 & Nifty 50 Firms",
      cta: "Upgrade Your ERM",
      badge: "ERM Advisory",
      image: heroCommand
    },
    {
      title: "One Engine. Every Statute.",
      highlight: "Zero Missed Filings.",
      description: "PF, ESI, EHS, GST—managed through a single automated compliance engine that never sleeps, never forgets, and never misses a deadline.",
      outcome: "Maintain 100% audit readiness across all 28 states",
      icp: "Operations Directors in Manufacturing & Industrial",
      cta: "Explore Compliance Engine",
      badge: "Compliance Engine",
      image: heroIntegration
    },
    {
      title: "Hackers Don't Sleep.",
      highlight: "Neither Should Your Defenses.",
      description: "Build an impenetrable security posture with VAPT, SOC 2 readiness, ISMS implementation, and 24/7 threat monitoring that keeps adversaries out.",
      outcome: "Reduce cyber incidents by 80% and achieve SOC 2 readiness",
      icp: "IT Heads & CISOs in Tech, SaaS & FinTech",
      cta: "Boost Cyber Resilience",
      badge: "Cyber Posture",
      image: heroSoc
    },
    {
      title: "Measure What Matters.",
      highlight: "Report What Investors Demand.",
      description: "Accurately track Scope 1, 2, and 3 emissions and draft BRSR reports that satisfy SEBI, GRI, and global investor scrutiny—no greenwashing, just green winning.",
      outcome: "Cut carbon tracking costs by 45% and attract ESG capital",
      icp: "Sustainability Leads in Large Enterprises & PSUs",
      cta: "Start ESG Reporting",
      badge: "ESG & BRSR",
      image: verticalsFacility
    },
    {
      title: "First Attempt. First Pass.",
      highlight: "Zero Stress.",
      description: "Expert gap analysis, documentation rigor, and hand-holding for NABH, NAAC, and ISO certifications—because your reputation can't afford a second attempt.",
      outcome: "Pass certification on the first attempt, every time",
      icp: "Administrators in Healthcare, Education & Quality",
      cta: "Get Certified Now",
      badge: "Accreditation",
      image: heroVerify
    },
    {
      title: "Payroll Is Not HR's Job.",
      highlight: "It's Ours.",
      description: "Accurate salary computation, TDS filing, and HR policy drafting under one unified roof—so your finance team focuses on strategy, not spreadsheets.",
      outcome: "Eliminate 99% of payroll discrepancies and reclaim 20+ hours monthly",
      icp: "Finance Controllers in Mid-Market Firms",
      cta: "Outsource Payroll",
      badge: "Managed Payroll",
      image: heroAiDriven
    },
    {
      title: "Your Supply Chain Is Your Weakest Link.",
      highlight: "Until Now.",
      description: "Continuously monitor vendors for labor violations, EHS risks, and cyber exposure—protecting your brand from the scandals you didn't cause but will own.",
      outcome: "Mitigate vendor risk exposure by 70% and protect brand equity",
      icp: "Procurement Heads in Global Supply Chains",
      cta: "Manage Vendor Risk",
      badge: "Vendor Risk",
      image: heroDrone
    },
    {
      title: "Stop Checking Boxes.",
      highlight: "Start Finding Gold.",
      description: "Agile, continuous auditing methodologies that go beyond tick-box compliance to uncover operational leaks, cost drains, and hidden savings.",
      outcome: "Uncover 30% more operational savings and strengthen governance",
      icp: "Audit Committee Chairs in Listed Entities",
      cta: "Book an Audit",
      badge: "Internal Audit",
      image: heroCommand
    }
  ];

  // Helper to filter and map service cards
  const renderServiceCard = (serviceId: string, icon: React.ReactNode) => {
    const serv = servicesData.find(s => s.id === serviceId);
    if (!serv) return null;
    return (
      <div className="group h-full relative bg-white border border-slate-200/80 hover:border-blue-500/30 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl p-6 select-none min-h-[380px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
        <div className="space-y-4 relative z-10 text-left">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
              {icon}
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-500 uppercase">
              {serv.standards[0] || "GRC Standard"}
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {serv.title}
          </h3>
          <p className="text-xs text-slate-655 line-clamp-3 leading-relaxed font-semibold">
            {serv.problem}
          </p>
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Deliverables Include:</span>
            <ul className="space-y-1">
              {serv.benefits.slice(0, 2).map((ben, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between relative z-10">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {serv.category.split(" ")[0]} Division
          </span>
          <Link
            to={`/services/${serv.id}`}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            <span>Read Detail</span>
            <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  // Sub-sections filtering
  const complianceItems = [
    renderServiceCard("regulatory-compliance", <Scale className="w-5 h-5" />),
    renderServiceCard("labour-law-compliance", <Briefcase className="w-5 h-5" />),
    renderServiceCard("environmental-compliance", <Settings className="w-5 h-5" />),
    renderServiceCard("taxation-trade-compliance", <FileText className="w-5 h-5" />),
    renderServiceCard("data-privacy-dpdp", <Shield className="w-5 h-5" />),
    renderServiceCard("accreditation-services", <Briefcase className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  const riskItems = [
    renderServiceCard("enterprise-risk-management", <Shield className="w-5 h-5" />),
    renderServiceCard("internal-audit", <Settings className="w-5 h-5" />),
    renderServiceCard("vendor-risk-management", <Scale className="w-5 h-5" />),
    renderServiceCard("anti-fraud-investigation", <FileText className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  const governanceItems = [
    renderServiceCard("governance-framework", <Scale className="w-5 h-5" />),
    renderServiceCard("hr-policy-governance", <FileText className="w-5 h-5" />),
    renderServiceCard("regulatory-compliance", <Briefcase className="w-5 h-5" />),
    renderServiceCard("clinical-governance", <Shield className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  // Partner Logos (Slider 6)
  const partners = [
    { name: "ServiceNow", cat: "Technology & SaaS" },
    { name: "MetricStream", cat: "Technology & SaaS" },
    { name: "VComply", cat: "Technology & SaaS" },
    { name: "Persefoni", cat: "Technology & SaaS" },
    { name: "Qualys", cat: "Technology & SaaS" },
    { name: "Bureau Veritas", cat: "Certification Body" },
    { name: "SGS India", cat: "Certification Body" },
    { name: "DNV", cat: "Certification Body" }
  ];

  const partnerItems = partners.map((p, idx) => (
    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center items-center hover:border-blue-500/20 transition-all aspect-[5/3] select-none">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-blue-600 font-black text-sm">
        {p.name.substring(0, 2).toUpperCase()}
      </div>
      <h4 className="text-xs font-black text-slate-800">{p.name}</h4>
      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{p.cat}</p>
    </div>
  ));

  return (
    <Layout>
      <div className="bg-slate-50/50 pb-24 text-slate-600 relative overflow-hidden">
        
        {/* Slider 1: Hero Carousel Section */}
        <section className="relative min-h-[85dvh] flex items-center bg-white border-b border-slate-200/85">
          <GrcCarousel
            autoplay
            autoplayInterval={6000}
            showArrows={false}
            showDots
            itemWidthClassName="w-full"
            gapClassName="gap-0"
            pyClassName="py-0"
            dotsClassName="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            items={heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className="relative w-full min-h-[85dvh] flex items-center bg-cover bg-center select-none pt-28 md:pt-36 pb-16 md:pb-24"
                style={{ backgroundImage: `url(${slide.image})`, width: "100%" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10" />
                <div className="container mx-auto px-6 relative z-20 text-left max-w-6xl">
                  <div className="space-y-4 md:space-y-5 flex flex-col items-start">
                    <div className="flex flex-wrap items-center justify-start gap-2.5">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/90 border border-slate-200 rounded-full shadow-sm">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-extrabold text-slate-700 tracking-[0.2em] uppercase">
                          GRC Division • {slide.badge}
                        </span>
                      </div>
                      {slide.icp && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/90 border border-blue-200/50 rounded-full shadow-sm">
                          <span className="text-xs font-extrabold text-blue-750 tracking-[0.03em] uppercase">
                            Target: {slide.icp}
                          </span>
                        </div>
                      )}
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight font-heading text-left">
                      {slide.title}{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent block sm:inline">
                        {slide.highlight}
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-2xl font-sans leading-relaxed font-medium text-left">
                      {slide.description}
                    </p>
                    {slide.outcome && (
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50/90 border border-emerald-200/60 text-emerald-850 rounded-2xl text-xs sm:text-sm font-bold shadow-sm animate-pulse-subtle">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Outcome: {slide.outcome}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <a href="#compliance" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 text-sm font-bold transition-all hover:scale-[1.02]">
                        {slide.cta} <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          />
        </section>

        {/* Core Content: Vertical Tabs Section */}
        <div id="compliance" className="container mx-auto px-6 max-w-7xl pt-16">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Tabs Selection */}
            <div className="lg:col-span-3 space-y-2 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">What We Offer</span>
              {[
                { id: "compliance", label: "Compliance", desc: "Regulatory adherence, factory audits, and EHS checks." },
                { id: "risk", label: "Risk", desc: "ERM structures, risk registers, and audit control." },
                { id: "governance", label: "Governance", desc: "Board charters, policy frameworks, and oversight." },
                { id: "manpower", label: "Staffing Services", desc: "Staffing models, RPO, and managed hiring." },
                { id: "cybersecurity", label: "Cybersecurity", desc: "VAPT, SOC 2 readiness, and threat monitoring." },
                { id: "esg", label: "ESG & Sustainability", desc: "BRSR reporting, carbon tracking, and ESG advisory." }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-4 rounded-3xl border transition-all duration-300 flex flex-col gap-1 ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg animate-pulse-subtle"
                      : "bg-white border-slate-200/80 hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-wider">{tab.label}</span>
                  <span className={`text-[10px] ${activeTab === tab.id ? "text-slate-400" : "text-slate-500"} font-semibold leading-normal`}>
                    {tab.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {activeTab === "compliance" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Regulatory Adherence</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Compliance Services</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Structured monitoring frameworks, factory audits, consents, and legal reconciliation checklists designed for multi-state corporate and plant compliance.
                    </p>
                  </div>
                  <GrcCarousel items={complianceItems} />
                </div>
              )}

              {activeTab === "risk" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Risk Management</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Risk</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Design robust enterprise risk self-assessments (ERM), deploy key risk registers, conduct internal audits, and handle anti-fraud investigations.
                    </p>
                  </div>
                  <GrcCarousel items={riskItems} />
                </div>
              )}

              {activeTab === "governance" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Executive Oversight</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Governance</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Align board charters, codify corporate governance frameworks, design HR policies, and establish regulatory governance structures.
                    </p>
                  </div>
                  <GrcCarousel items={governanceItems} />
                </div>
              )}

              {activeTab === "manpower" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Staffing Solutions</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Staffing Services</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Flexible staffing models, RPO engagements, managed hiring solutions, and workforce compliance mapped to your project needs.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "cybersecurity" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Defense</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Cybersecurity</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Build an impenetrable security posture with VAPT, SOC 2 readiness, ISMS implementation, and 24/7 threat monitoring.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "esg" && (
                <div className="space-y-4 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sustainability</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">ESG & Sustainability</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Track Scope 1, 2, and 3 emissions, draft BRSR reports, and align with SEBI, GRI, and global investor ESG standards.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slider 6: Partners & Integrations */}
          <section className="space-y-6 pt-20 border-t border-slate-200/60 mt-20">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Integrations Network</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">GRC Integrations & Certifications</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Integrating seamlessly with market-leading risk intelligence solutions and certification bodies to automate audit readiness.
              </p>
            </div>
            <GrcCarousel items={partnerItems} />
          </section>
        </div>

      </div>
    </Layout>
  );
}

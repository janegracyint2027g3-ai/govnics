import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { industriesData } from "@/data/industries-data";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, ChevronRight, Settings, Cpu, Activity, Coins, ShieldAlert, Layers, Building, ShieldCheck, Award } from "lucide-react";
import heroVerify from "@/assets/hero-verify.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";
import heroDrone from "@/assets/hero-drone.jpg";
import heroSoc from "@/assets/hero-soc.jpg";

export default function IndustriesPage() {
  useEffect(() => {
    document.title = "Industries We Serve | Sector-Specific GRC Compliance — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "GRC advisory and regulatory compliance solutions tailored to 15+ Indian industries including BFSI, Manufacturing, Healthcare, IT, Energy, and Real Estate.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const heroSlides = [
    {
      title: "The New Labour Codes Aren't Optional.",
      highlight: "But Compliance Doesn't Have to Be Painful.",
      description: "Expert drafting of employee handbooks, contracts, and wage structures aligned with all four new codes—turning legal complexity into competitive advantage.",
      outcome: "Achieve full code compliance in 45 days, not 45 weeks",
      icp: "Labor Law Managers in Retail, Manufacturing & Services",
      cta: "Transition Codes Now",
      badge: "Labour Codes",
      image: heroVerify
    },
    {
      title: "Zero EHS Penalties. Zero Workplace Incidents.",
      highlight: "Zero Excuses.",
      description: "Simplify PCB consent management, hazardous waste handling, and factory safety audits with a system that makes compliance the path of least resistance.",
      outcome: "Reduce EHS penalties to zero and create safer workplaces",
      icp: "EHS Officers in Heavy Industrial Sectors",
      cta: "Audit EHS Now",
      badge: "EHS & Safety",
      image: verticalsFacility
    },
    {
      title: "GST Leakage Is Silent Theft.",
      highlight: "We Stop It.",
      description: "Automate e-invoicing, way-bills, and GST filings to prevent revenue leakage, input credit losses, and disputes that drain your bottom line.",
      outcome: "Reconcile books 5x faster and recover hidden tax credits",
      icp: "Tax Heads in FMCG, Logistics & E-Commerce",
      cta: "Fix GST Gaps",
      badge: "GST & Taxes",
      image: heroAiDriven
    },
    {
      title: "Customs Holds Kill Margins.",
      highlight: "We Clear the Path.",
      description: "Manage customs, trade licenses, and sanctions screening to ensure your global shipments move at the speed of business, not bureaucracy.",
      outcome: "Clear customs holds 80% quicker and reduce demurrage costs",
      icp: "Logistics Directors in Import-Export Houses",
      cta: "Streamline EXIM",
      badge: "Customs Codes",
      image: heroDrone
    },
    {
      title: "28 States. One Dashboard.",
      highlight: "Zero Lapses.",
      description: "Centralized management of Shop & Establishment registrations, renewals, and digital registers across every Indian state—because expansion shouldn't mean fragmentation.",
      outcome: "Manage 28+ states from 1 dashboard with auto-renewal alerts",
      icp: "Regional Managers in Chain Restaurants, Retail & Hospitality",
      cta: "Unify S&E",
      badge: "S&E Compliance",
      image: heroIntegration
    },
    {
      title: "Health Inspections",
      highlight: "Shouldn't Keep You Awake.",
      description: "Strict adherence to Biomedical Waste rules, Clinical Establishment Acts, and drug licensing—so your facility passes every inspection, every time.",
      outcome: "Pass health inspections with zero citations and maintain licenses",
      icp: "Hospital Administrators & Pharmacy Heads",
      cta: "Secure Healthcare Now",
      badge: "Healthcare GRC",
      image: heroCommand
    },
    {
      title: "Regulators Test Banks.",
      highlight: "We Make Sure Yours Passes.",
      description: "Robust AML/KYC frameworks, data localization, and IT audits for banks and NBFCs that turn regulatory stress tests from threats into validations.",
      outcome: "Pass regulatory stress tests seamlessly and avoid RBI penalties",
      icp: "Compliance Officers in BFSI Sector",
      cta: "Defend BFSI",
      badge: "BFSI GRC",
      image: heroSoc
    },
    {
      title: "Audit Readiness Isn't an Event.",
      highlight: "It's a State of Being.",
      description: "Perpetual cloud-based audit trails that ensure instant readiness for any government scrutiny—no more panic, no more last-minute scrambling.",
      outcome: "Cut audit preparation time by 75% and never fear a surprise inspection",
      icp: "CFOs in High-Growth Startups & Scale-ups",
      cta: "Get Audit Ready",
      badge: "Audit Trails",
      image: heroVerify
    }
  ];

  const getClusterId = (clusterName: string) => {
    return clusterName.toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");
  };

  const renderIndustryCard = (id: string, icon: React.ReactNode) => {
    const ind = industriesData.find(i => i.id === id);
    if (!ind) return null;
    return (
      <div className="group h-full relative bg-white border border-slate-200/80 hover:border-blue-500/30 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl p-6 select-none min-h-[340px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
        <div className="space-y-4 relative z-10 text-left">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
              {icon}
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-500 uppercase">
              {ind.regulations[0]}
            </span>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {ind.title}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ind.cluster}</p>
          </div>
          <p className="text-xs text-slate-650 line-clamp-3 leading-relaxed font-semibold">
            {ind.subtitle}
          </p>
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">GRC Challenges:</span>
            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-semibold">
              {ind.challenges[0]}
            </p>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {ind.focusAreas[0]} Focused
          </span>
          <Link
            to={`/industries/${getClusterId(ind.cluster)}#${ind.id}`}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  // Slider 2: Manufacturing & Industrial
  const manufacturingCards = [
    renderIndustryCard("automobiles", <Settings className="w-5 h-5" />),
    renderIndustryCard("auto-components", <Settings className="w-5 h-5" />),
    renderIndustryCard("engineering-capital-goods", <Settings className="w-5 h-5" />),
    renderIndustryCard("defence-manufacturing", <ShieldAlert className="w-5 h-5" />),
    renderIndustryCard("msme", <Settings className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  // Slider 3: Tech & Electronics
  const techCards = [
    renderIndustryCard("it-bpm", <Cpu className="w-5 h-5" />),
    renderIndustryCard("electronics-semiconductor", <Cpu className="w-5 h-5" />),
    renderIndustryCard("telecommunications", <Cpu className="w-5 h-5" />),
    renderIndustryCard("science-technology", <Cpu className="w-5 h-5" />),
    renderIndustryCard("electric-vehicles", <Cpu className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  // Slider 4: Infrastructure & Energy
  const infraCards = [
    renderIndustryCard("cement", <Settings className="w-5 h-5" />),
    renderIndustryCard("steel", <Settings className="w-5 h-5" />),
    renderIndustryCard("infrastructure", <Settings className="w-5 h-5" />),
    renderIndustryCard("real-estate", <Settings className="w-5 h-5" />),
    renderIndustryCard("roads-highways", <Settings className="w-5 h-5" />),
    renderIndustryCard("oil-gas", <Settings className="w-5 h-5" />),
    renderIndustryCard("power", <Settings className="w-5 h-5" />),
    renderIndustryCard("renewable-energy", <Settings className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  // Slider 5: Healthcare & Retail
  const healthcareCards = [
    renderIndustryCard("pharmaceuticals", <Activity className="w-5 h-5" />),
    renderIndustryCard("healthcare", <Activity className="w-5 h-5" />),
    renderIndustryCard("medical-devices", <Activity className="w-5 h-5" />),
    renderIndustryCard("biotechnology", <Activity className="w-5 h-5" />),
    renderIndustryCard("ayush", <Activity className="w-5 h-5" />),
    renderIndustryCard("fmcg", <Coins className="w-5 h-5" />),
    renderIndustryCard("retail", <Coins className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  // Slider 6: Aligned Regulations (6 items)
  const regulations = [
    { title: "Factories Act 1948", desc: "Covers safety parameters, working hours, and EHS logs for manufacturing setups.", std: "EHS Audit" },
    { title: "DPDP Act 2023", desc: "Regulates user privacy consent directories and cloud log audit trails in IT sectors.", std: "Data Privacy" },
    { title: "RBI Master Directions", desc: "Governs IT outsourcing risks, vendor certifications, and audit structures for banking.", std: "BFSI GRC" },
    { title: "NABH Accreditation", desc: "Quality standards clearance checklists and process registers for healthcare.", std: "Accreditations" },
    { title: "RERA Act 2016", desc: "Mandatory project quarterly progress filings and escrow accounting reviews.", std: "Real Estate" },
    { title: "Mines Act 1952", desc: "Heavy logistics oversight, quarry blast logs, and EHS monitoring at mines.", std: "Mining GRC" }
  ];

  const regulationCards = regulations.map((reg, idx) => (
    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between hover:border-blue-500/20 transition-all min-h-[200px] select-none">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-full">{reg.std}</span>
          <Shield className="w-4 h-4 text-blue-400" />
        </div>
        <h4 className="text-sm font-black text-slate-800">{reg.title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">{reg.desc}</p>
      </div>
    </div>
  ));

  const stats: GrcStatCardItem[] = [
    { value: "8", label: "Industry Clusters Covered", icon: Layers, badge: "Ecosystem", description: "From heavy manufacturing and energy to SaaS and healthcare" },
    { value: "39", suffix: "+", label: "Specialized Sector Frameworks", icon: Building, badge: "Taxonomy", description: "Tailored regulatory baselines for automotive, BFSI, pharma & tech" },
    { value: "100", suffix: "%", label: "Sectoral Audit Clearance", icon: ShieldCheck, badge: "Track Record", description: "Proven first-attempt audit clearance across regulated bodies" },
    { value: "500", suffix: "+", label: "Enterprise Audits Executed", icon: Award, badge: "Experience", description: "Pan-India facilities, plant lines, and tech infra verified" }
  ];

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
                        <Settings className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-extrabold text-slate-700 tracking-[0.2em] uppercase">
                          Compliance • {slide.badge}
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
                      <a href="#manufacturing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 text-sm font-bold transition-all hover:scale-[1.02]">
                        {slide.cta} <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          />
        </section>

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* Content Sliders */}
        <div className="container mx-auto px-6 max-w-7xl pt-16 space-y-20">
          
          {/* Slider 2: Manufacturing & Industrial */}
          <section id="manufacturing" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Heavy Industries</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Manufacturing & Industrial</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                EHS guidelines, contractor wage records, Factories Act registers, and supply chain audit templates built for automotive and defense fabrication.
              </p>
            </div>
            <GrcCarousel items={manufacturingCards} />
          </section>

          {/* Slider 3: Tech & Electronics */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Verticals</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Technology & Electronics</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                ISO 27001 ISMS setup, GDPR/DPDP consent registers, SOC 2 audits, spectrum controls, and battery safety compliance checklists.
              </p>
            </div>
            <GrcCarousel items={techCards} />
          </section>

          {/* Slider 4: Infrastructure & Energy */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Resources & Construction</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Infrastructure & Energy</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Clearance filing support, escrow audit registers, RERA schedules, carbon calculations, and power grid compliance guides.
              </p>
            </div>
            <GrcCarousel items={infraCards} />
          </section>

          {/* Slider 5: Healthcare, Retail & Services */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Public & Consumer Sectors</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Healthcare & Consumer Services</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Accreditation mock checklists, CDSCO drug files, Shops Act licensing renewals, and FSSAI packaging verification registers.
              </p>
            </div>
            <GrcCarousel items={healthcareCards} />
          </section>

          {/* Slider 6: Compliance Standards */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Statutory Rules</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Aligned Compliance Standards</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Mapping corporate operations with local government acts and global standards registers to secure business permits.
              </p>
            </div>
            <GrcCarousel items={regulationCards} />
          </section>

        </div>
      </div>
    </Layout>
  );
}

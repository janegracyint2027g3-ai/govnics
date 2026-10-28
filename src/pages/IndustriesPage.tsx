import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { industriesSpicedSlides } from "@/data/spiced-slider-content";
import { industriesData } from "@/data/industries-data";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Settings, Cpu, Activity, Coins, ShieldAlert, Layers, Building, ShieldCheck, Award } from "lucide-react";

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
    <Layout noPadding={true}>
      <div className="bg-slate-50/50 pb-24 text-slate-600 relative overflow-hidden">
        {/* Slider 1: Hero Carousel Section */}
        <GrcSliderHero slides={industriesSpicedSlides} categoryLabel="Industry GRC" />

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

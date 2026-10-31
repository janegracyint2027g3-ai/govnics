import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { esgSpicedSlides } from "@/data/spiced-slider-content";
import { 
  CheckCircle2, ShieldCheck, ClipboardCheck, Clock, BarChart3,
  ArrowRight, Leaf
} from "lucide-react";

interface EsgItem {
  title: string;
  subCategory: string;
  desc: string;
  deliverables: string[];
}

const EsgCard = ({ item }: { item: EsgItem }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-[320px] [perspective:1000px] select-none cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white border border-slate-200/80 hover:border-blue-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black tracking-widest text-blue-500 uppercase">
                {item.subCategory}
              </span>
              <Leaf className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-650 line-clamp-4 leading-relaxed font-semibold">
              {item.desc}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              ESG Aligned
            </span>
            <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
              View Scope <ArrowRight className="w-3 h-3 text-blue-500" />
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl [transform:rotateY(180deg)]">
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black tracking-widest text-blue-400 uppercase">
                Deliverables
              </span>
              <Leaf className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <h3 className="text-sm font-black text-white line-clamp-1">
              {item.title}
            </h3>
            
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Key Project Deliverables:</span>
              <ul className="space-y-1.5">
                {item.deliverables.slice(0, 3).map((del, i) => (
                  <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              SLA Mapped
            </span>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
              Go Back <span className="rotate-180">↺</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ESGPage() {
  useEffect(() => {
    document.title = "ESG Advisory & BRSR Reporting Services — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "SEBI-aligned BRSR reporting, Scope 1–3 carbon tracking, and ESG strategy advisory for Indian listed companies and sustainability-focused enterprises.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);



  const stats: GrcStatCardItem[] = [
    { value: "0", suffix: " Dev", label: "BRSR Filing Audit Deviation", icon: ShieldCheck, badge: "Precision", description: "First-attempt regulatory clearance across SEBI core indicators" },
    { value: "↓ 25", suffix: "%", label: "Reporting Telemetry Overhead", icon: Clock, badge: "Efficiency", description: "Automated utilities data ingestion replacing manual spreadsheets" },
    { value: "100", suffix: "%", label: "Supply Chain Social Adherence", icon: ClipboardCheck, badge: "Assurance", description: "Strict SMETA & SA8000 contractor wage and safety verification" },
    { value: "SEBI", suffix: " Core", label: "Mandatory Indicators Mapped", icon: BarChart3, badge: "Taxonomy", description: "Pre-calibrated BRSR reporting schemas for top-1000 listed firms" }
  ];

  // Slider 2: Environmental & EHS Regulatory (5 items)
  const ehsItems: EsgItem[] = [
    {
      title: "Multi-Geography EHS Compliance",
      subCategory: "EHS Regulatory",
      desc: "Align plant activities with local environmental, health, and safety rules (OSHA standards, EPA controls, State PCB/CPCB registers in India).",
      deliverables: ["Regulatory compliance registers", "Incident monitoring workflows", "Safety policy documentation"]
    },
    {
      title: "Hazardous Waste & Chemical Management",
      subCategory: "EHS Regulatory",
      desc: "Set up audit-proof waste inventory routing, storage registers, chemical exposure limits, and authorized disposal agreements.",
      deliverables: ["Waste routing directories", "Chemical inventory logs", "Disposal vendor audit sheets"]
    },
    {
      title: "Extended Producer Responsibility (EPR) Filings",
      subCategory: "EHS Regulatory",
      desc: "End-to-end telemetry and compliance declarations for plastics, e-waste, and batteries to meet statutory recycling targets.",
      deliverables: ["EPR registration files", "Recycled volume certificates", "Annual compliance summaries"]
    },
    {
      title: "Factory & Boiler Compliance Audits",
      subCategory: "EHS Regulatory",
      desc: "Safety clearances, pressure testing certificates, structural safety audits, and boiler inspectorate compliance verification.",
      deliverables: ["Boiler clearance certificates", "Structural health audit checklists", "Remediation priority lists"]
    },
    {
      title: "Workplace Health & Emergency Safety",
      subCategory: "EHS Regulatory",
      desc: "Emergency exit maps, mock drill logging, local industrial first-aid setups, and hazard identification and risk assessment (HIRA).",
      deliverables: ["Fire safety layouts", "Mock drill compliance folders", "HIRA registry charts"]
    }
  ];

  // Slider 3: Supply Chain & Labor Compliance (6 items)
  const laborItems: EsgItem[] = [
    {
      title: "Scope 3 Vendor Labor Audits (SMETA)",
      subCategory: "Labor & Supply Chain",
      desc: "Code-of-conduct auditing using SMETA (SEDEX) and SA8000 validation criteria for international trade and export safety.",
      deliverables: ["Vendor social audit reports", "Non-conformance correction plans", "SEDEX upload registries"]
    },
    {
      title: "Contract Labor (CLRA) & Wage Compliance",
      subCategory: "Labor & Supply Chain",
      desc: "Statutory monitoring of payroll, PF/ESIC payments, minimum wage grids, and register maintenance for subcontractors.",
      deliverables: ["CLRA compliance scorecards", "Subcontractor wage receipts audits", "PF/ESI payment files"]
    },
    {
      title: "Anti-Child Labor & Forced Labor Due Diligence",
      subCategory: "Labor & Supply Chain",
      desc: "Rigorous field visits and records validation to secure clean human rights certificates and defend vendor integrity.",
      deliverables: ["Field diligence affidavits", "Identity checks frameworks", "Human rights audit cards"]
    },
    {
      title: "Subcontractor Safety & Welfare Auditing",
      subCategory: "Labor & Supply Chain",
      desc: "Monitoring subcontractor PPE availability, industrial training records, and local housing/sanitation safety baselines.",
      deliverables: ["PPE distribution records", "Safety training checklists", "Welfare facility audits"]
    },
    {
      title: "Vendor Code of Conduct Setup",
      subCategory: "Labor & Supply Chain",
      desc: "Drafting corporate policies for supply chain suppliers covering human rights, environmental standards, and ethical behavior.",
      deliverables: ["Supplier code of conduct drafts", "Legal sign-off templates", "Vendor acceptance monitoring logs"]
    },
    {
      title: "Subcontractor Dispute Resolution",
      subCategory: "Labor & Supply Chain",
      desc: "Providing legal and regulatory guidance during subcontractor conflicts, non-compliance penalties, and labor audits.",
      deliverables: ["Dispute investigation records", "Statutory response outlines", "Audit remediation roadmaps"]
    }
  ];

  // Slider 4: Privacy & Disclosures (5 items)
  const disclosureItems: EsgItem[] = [
    {
      title: "Cross-Border Data Transfer (G in ESG)",
      subCategory: "Governance & Privacy",
      desc: "Auditing cloud workflows and storage frameworks under GDPR, India's DPDP Act, and CCPA to secure user and enterprise data.",
      deliverables: ["Data flow diagrams", "Privacy impact assessments", "Cross-border data agreements"]
    },
    {
      title: "HRIS & Payroll Data Security Audits",
      subCategory: "Governance & Privacy",
      desc: "Securing sensitive employee records, salary data, banking inputs, and background verification logs against data breaches.",
      deliverables: ["HRIS system security scorecards", "Employee PII maps", "Access privilege matrices"]
    },
    {
      title: "BRSR Core Data Aggregation & Assurance",
      subCategory: "Mandatory Disclosures",
      desc: "Preparing companies for SEBI's Business Responsibility & Sustainability Reporting core assurance frameworks.",
      deliverables: ["BRSR data aggregators", "Third-party assurance books", "Filing readiness scorecards"]
    },
    {
      title: "EU CSRD Data Extraction",
      subCategory: "Mandatory Disclosures",
      desc: "Automating ESG taxonomy metrics parsing to support EU Corporate Sustainability Reporting Directive disclosures.",
      deliverables: ["CSRD metrics catalogs", "Supply chain data extractions", "Double-materiality assessments"]
    },
    {
      title: "SEC Climate Disclosure Rule Readiness",
      subCategory: "Mandatory Disclosures",
      desc: "Translating utility footprint logs and facility emissions data into SEC-aligned climate risk and carbon disclosure registers.",
      deliverables: ["SEC climate risk logs", "Utility emissions summaries", "Board oversight templates"]
    }
  ];

  // Slider 5: Decarbonization & Climate Strategy (5 items)
  const climateItems: EsgItem[] = [
    {
      title: "Net-Zero Pathway Planning",
      subCategory: "Decarbonization",
      desc: "Designing long-term corporate energy transition roadmaps, fuel substitution goals, and validated carbon offset strategies.",
      deliverables: ["Transition roadmaps documents", "Carbon reduction targets portfolios", "Feasibility transition budgets"]
    },
    {
      title: "Scope 1, 2 & 3 GHG Accounting",
      subCategory: "Decarbonization",
      desc: "Setting up emissions accounting structures under the GHG Protocol Corporate Standard, covering facilities and scope 3 value chain.",
      deliverables: ["Scope 1/2 calculations databases", "Scope 3 extraction models", "GHG inventory summary reports"]
    },
    {
      title: "Renewable Energy Procurement",
      subCategory: "Decarbonization",
      desc: "Feasibility audits and legal advisories for Open Access green power purchase agreements (PPAs) and solar rooftop leases.",
      deliverables: ["PPA contract assessments", "Open Access viability scores", "Annual savings predictions"]
    },
    {
      title: "TCFD Physical & Transition Assessments",
      subCategory: "Climate Advisory",
      desc: "Modeling climate change physical impacts (flooding, heat stress) and policy transition impacts against business operations.",
      deliverables: ["TCFD risk maps", "Financial exposure evaluations", "Strategic adaptation layouts"]
    },
    {
      title: "Carbon Offset Verification Advisory",
      subCategory: "Climate Advisory",
      desc: "Auditing potential carbon offset credits for validity, checking additionality, and evaluating registry registrations.",
      deliverables: ["Offset verification briefs", "Registry compliance audits", "Project risk scorecards"]
    }
  ];

  // Slider 6: Governance & Sustainability Advisory (7 items)
  const advisoryItems: EsgItem[] = [
    {
      title: "ISSB (IFRS S1 & S2) Alignment & Reporting",
      subCategory: "Sustainability Advisory",
      desc: "Advisories to meet IFRS Sustainability Disclosure Standards for global investor circles and financial reports.",
      deliverables: ["IFRS S1 general disclosures gap review", "IFRS S2 climate-related risk mappings", "Investor reporting packages"]
    },
    {
      title: "GRI Standards & SASB Sector Metrics",
      subCategory: "Sustainability Advisory",
      desc: "Mapping corporate performance indicators to international sustainability benchmarks for transparency.",
      deliverables: ["GRI content index files", "SASB metrics scorecards", "Stakeholder materiality lists"]
    },
    {
      title: "CDP Questionnaire Support",
      subCategory: "Sustainability Advisory",
      desc: "Drafting optimized disclosure profiles for Carbon, Water, and Forest scoring reviews by global institutions.",
      deliverables: ["CDP draft responses folders", "Scoring improvement guides", "Historical submission charts"]
    },
    {
      title: "Product Lifecycle Assessment (LCA)",
      subCategory: "Circular Economy",
      desc: "Analyzing environmental footprint across lifecycle stages from raw material extraction to manufacturing and end-of-life recycling.",
      deliverables: ["LCA model files", "Carbon-per-product stats", "Ecodesign suggestions lists"]
    },
    {
      title: "Water Stewardship & Zero-Waste",
      subCategory: "Circular Economy",
      desc: "Optimizing facility water reuse, local watershed recharging, and zero-waste-to-landfill certifications audits.",
      deliverables: ["Water footprint diagnostics", "Zero-waste audit summaries", "Recycled volume registries"]
    },
    {
      title: "ESG Committee Charter Development",
      subCategory: "Board Governance",
      desc: "Defining oversight roles, committee structures, terms of reference, and audit parameters for corporate board members.",
      deliverables: ["Board charter documents", "RACI governance maps", "Oversight calendar checklists"]
    },
    {
      title: "ESG KPIs in Executive Compensation",
      subCategory: "Board Governance",
      desc: "Setting up measurable ESG performance milestones linking leadership payouts to corporate sustainability achievements.",
      deliverables: ["Executive KPI scorecards", "Compensation adjustment formulas", "Independent validation systems"]
    }
  ];

  // ESG Partners Logos
  const partners = [
    { name: "CDP", cat: "Emissions Reporting" },
    { name: "GRI", cat: "Reporting Framework" },
    { name: "SASB", cat: "Sector Specific Metrics" },
    { name: "DNV", cat: "Certification Body" },
    { name: "Bureau Veritas", cat: "EHS Audit Body" },
    { name: "SGS India", cat: "Social Audit Body" },
    { name: "EcoVadis", cat: "Supply Chain CSR" },
    { name: "ISO 14001", cat: "Environmental Standard" }
  ];

  const ehsCards = ehsItems.map((item, idx) => <EsgCard item={item} key={idx} />);
  const laborCards = laborItems.map((item, idx) => <EsgCard item={item} key={idx} />);
  const disclosureCards = disclosureItems.map((item, idx) => <EsgCard item={item} key={idx} />);
  const climateCards = climateItems.map((item, idx) => <EsgCard item={item} key={idx} />);
  const advisoryCards = advisoryItems.map((item, idx) => <EsgCard item={item} key={idx} />);

  const partnerCards = partners.map((logo, idx) => (
    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center items-center hover:border-blue-500/20 transition-all aspect-[5/3] select-none">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-blue-600 font-black text-xs">
        {logo.name.substring(0, 2).toUpperCase()}
      </div>
      <h4 className="text-xs font-black text-slate-800">{logo.name}</h4>
      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{logo.cat}</p>
    </div>
  ));

  return (
    <Layout noPadding={true}>
      <div className="bg-slate-50/50 pb-24 text-slate-600 relative overflow-hidden">
        
        {/* Slider 1: Hero Carousel Section */}
        <GrcSliderHero slides={esgSpicedSlides} categoryLabel="ESG & Sustainability" />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />


        {/* Content Sliders */}
        <div className="container mx-auto px-6 max-w-7xl pt-16 space-y-20">
          
          {/* Slider 2: Environmental & EHS Regulatory */}
          <section id="ehs" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">EHS Regulatory</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Environmental & EHS Regulatory</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Establish PCB consents, chemical registries, EPR declarations, and pressure clearances for boiler house and plant safety.
              </p>
            </div>
            <GrcCarousel items={ehsCards} />
          </section>

          {/* Slider 3: Supply Chain & Labor Compliance */}
          <section id="labor" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Social Audits</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Supply Chain & Labor Compliance</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Rigorous code-of-conduct audits matching SMETA and SA8000. Track contractor wage records and verify child labor policies.
              </p>
            </div>
            <GrcCarousel items={laborCards} />
          </section>

          {/* Slider 4: Privacy & Disclosures */}
          <section id="privacy" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Reporting & Data Privacy</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Global Privacy & Mandatory Disclosures</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Secure employee payroll data, review cross-border transfers, and compile SEBI-compliant BRSR reports and EU CSRD taxonomy records.
              </p>
            </div>
            <GrcCarousel items={disclosureCards} />
          </section>

          {/* Slider 5: Decarbonization & Climate Strategy */}
          <section id="climate" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Carbon Telemetry</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Decarbonization & Climate Strategy</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Carbon footprint accounting under GHG protocol corporate standard. Evaluate renewable procurement Open Access options and TCFD risks.
              </p>
            </div>
            <GrcCarousel items={climateCards} />
          </section>

          {/* Slider 6: Sustainability & Governance Advisory */}
          <section id="advisory" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Advisory & Governance</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Sustainability & Governance Advisory</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Set IFRS/ISSB metrics, perform lifecycle assessments (LCA), define ESG charters, and assess green values during asset acquisitions.
              </p>
            </div>
            <GrcCarousel items={advisoryCards} />
          </section>

          {/* Slider 7: ESG Partners & Certifications */}
          <section id="partners" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Partner Frameworks</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">ESG Framework Partners & Certifications</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Working with global ESG frameworks, advisory platforms, and verification providers to ensure transparent sustainability accounting.
              </p>
            </div>
            <GrcCarousel items={partnerCards} />
          </section>

        </div>
      </div>
    </Layout>
  );
}

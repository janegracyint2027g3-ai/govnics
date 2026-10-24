import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { 
  screeningPhases, 
  skillTiers, 
  hiringFormats, 
  engagementModels, 
  industryMatrix, 
  detailedOfferings, 
  clientBenefits 
} from "@/data/staffing-compendium-data";
import { 
  Shield, 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  Award, 
  Clock, 
  Layers, 
  BookOpen, 
  Check, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Building2
} from "lucide-react";
import heroVerify from "@/assets/hero-verify.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";
import heroDrone from "@/assets/hero-drone.jpg";

interface StaffingItem {
  title: string;
  subCategory: string;
  desc: string;
  keyPoints: string[];
  linkTab?: string;
}

export default function ManageStaffingPage() {
  useEffect(() => {
    document.title = "Managed Staffing & Manpower Solutions — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Risk-compliant staffing solutions across blue, grey, and white-collar segments. GOVENICS handles statutory compliance, payroll governance, and contractor onboarding.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [compendiumTab, setCompendiumTab] = useState<string>("skill-tiers");
  const [selectedSkillTier, setSelectedSkillTier] = useState<number>(0);
  const [selectedHiringTab, setSelectedHiringTab] = useState<"formats" | "models">("formats");
  const [selectedMatrixIndustry, setSelectedMatrixIndustry] = useState<string>("manufacturing");
  const [selectedOffering, setSelectedOffering] = useState<string>("offering-perm");

  const heroSlides = [
    {
      title: "Need 100 Workers by Monday?",
      highlight: "We Deliver by Friday.",
      description: "Scale your blue, grey, and white-collar workforce without absorbing direct HR liabilities—because agility shouldn't come at the cost of compliance.",
      outcome: "Scale workforce up or down in 48 hours with full statutory coverage",
      icp: "Operations Heads in E-Commerce, Logistics & Quick Commerce",
      cta: "Scale Workforce Now",
      image: verticalsFacility,
      badge: "Workforce Sourcing"
    },
    {
      title: "Hire Globally.",
      highlight: "Pay Locally. Risk Zero.",
      description: "You source the talent anywhere in the world; we put them on our payroll, absorbing all statutory, tax, and compliance risks—borderless hiring, bulletproof compliance.",
      outcome: "Onboard global/remote staff in 3 days, not 3 months",
      icp: "Founders & CEOs of Funded Startups & Scale-ups",
      cta: "Hire via EOR",
      image: heroIntegration,
      badge: "EOR Service"
    },
    {
      title: "One Vendor. One Umbrella.",
      highlight: "Zero Labor Arrests.",
      description: "We consolidate your fragmented staffing vendors under one audited compliance umbrella—because when labour inspectors knock, you need one answer, not twenty.",
      outcome: "Shield against 100% of labor arrests and compliance actions",
      icp: "HR VPs in Large Manufacturing & Industrial",
      cta: "Transfer Risk Now",
      image: heroVerify,
      badge: "Compliance Shield"
    },
    {
      title: "C-Suite Expertise. Fractional Cost.",
      highlight: "Full Impact.",
      description: "Hire fractional CISOs, ISO Lead Auditors, and DPDP Officers on a part-time basis—accessing enterprise-grade expertise without enterprise-grade overhead.",
      outcome: "Access C-Suite talent at 50% cost with 100% impact",
      icp: "CTOs & CISOs in Mid-Market Tech Firms",
      cta: "Hire GRC Experts",
      image: heroDrone,
      badge: "Fractional GRC"
    },
    {
      title: "Niche ESG Roles.",
      highlight: "Filled in 30 Days. Guaranteed.",
      description: "Deploy experienced environmental engineers, ESG analysts, and safety officers on demand—because sustainability deadlines don't wait for recruitment cycles.",
      outcome: "Fill niche ESG roles in under 30 days with pre-vetted specialists",
      icp: "Sustainability Directors in Cement, Steel, Chemicals & Energy",
      cta: "Find ESG Talent",
      image: verticalsFacility,
      badge: "ESG Staffing"
    },
    {
      title: "One Master Vendor. Seventeen Smaller Ones.",
      highlight: "Zero Headaches.",
      description: "We act as your master vendor, managing a panel of smaller staffing agencies—reducing your vendor management overhead to near zero.",
      outcome: "Reduce vendor management overhead by 70% and standardize quality",
      icp: "Procurement Heads in IT/ITES & Global Capability Centers",
      cta: "Activate MSP",
      image: heroCommand,
      badge: "MSP Service"
    },
    {
      title: "Your Recruiters Are Overwhelmed.",
      highlight: "Ours Are Embedded.",
      description: "Our embedded recruiters act as an extension of your team for high-volume permanent hiring—scaling your talent acquisition without scaling your fixed costs.",
      outcome: "Cut cost-per-hire by 40% and accelerate time-to-fill",
      icp: "Talent Acquisition Heads in Rapid-Growth Firms",
      cta: "Start RPO Now",
      image: heroAiDriven,
      badge: "RPO Embedded"
    },
    {
      title: "The Right Risk Leader Changes Everything.",
      highlight: "We Find Them.",
      description: "Headhunt C-Suite leaders, Chief Risk Officers, and Compliance Directors for critical roles—because the wrong hire in risk is a risk itself.",
      outcome: "Place top-tier executives in 45 days with 95% retention",
      icp: "Board Members, PE Firms & CHROs at Large Enterprises",
      cta: "Source Leaders",
      image: heroVerify,
      badge: "Executive Search"
    }
  ];

  const stats = [
    { value: "↓ 40", suffix: "%", label: "Average Sourcing Cost Reduction" },
    { value: "98.6", suffix: "%", label: "SLA-Backed Fill Rate" },
    { value: "100", suffix: "%", label: "Statutory Payroll Compliance" },
    { value: "12,000", suffix: "+", label: "Pre-Vetted Talent Pool" }
  ];

  // Slider 2: Contract Staffing & Sourcing (6 items)
  const contractSourcingItems: StaffingItem[] = [
    {
      title: "Blue Collar Deployment",
      subCategory: "Compliant Contract Staffing",
      desc: "High-volume sourcing and deployment of factory floor assembly workers, warehousing material handlers, and facilities loading crews.",
      keyPoints: ["100% compliance with minimum wage grids", "On-site biometric attendance checks", "Automated ESI/PF registration checks"]
    },
    {
      title: "Grey Collar Deployment",
      subCategory: "Compliant Contract Staffing",
      desc: "Deployment of vocational technicians, machinery operators, lab assistants, and logistics coordinators.",
      keyPoints: ["Verifiable trade certifications check", "Safety training and PPE logs checks", "Dynamic billing rate cards"]
    },
    {
      title: "White Collar Sourcing",
      subCategory: "Compliant Contract Staffing",
      desc: "Providing project-based administrative staff, customer helpdesk teams, and back-office processors.",
      keyPoints: ["Rigorous background vetting logs", "Skill-based benchmark testing", "Standardized NDA sign-off protocols"]
    },
    {
      title: "Fixed-Term Hiring",
      subCategory: "Hiring Formats",
      desc: "Sourcing workforce under defined duration contracts to handle seasonal loads, factory expansions, or project milestones.",
      keyPoints: ["Compliant term contracts drafting", "Automatic contract end workflows", "Fringe benefits statutory compliance"]
    },
    {
      title: "Project-Based (SOW) Hiring",
      subCategory: "Hiring Formats",
      desc: "Deploying outcome-managed teams under clear statement of work parameters, linking billing directly to operational deliverables.",
      keyPoints: ["Outcome-based SLA scorecards", "Milestone validation checks", "Risk sharing deployment agreements"]
    },
    {
      title: "Temporary-to-Hire Placements",
      subCategory: "Hiring Formats",
      desc: "Evaluate candidates on the job before committing to direct-hire payroll, reducing bad hiring costs.",
      keyPoints: ["Smooth payroll transfer protocols", "Defined conversion timelines", "Risk-free talent validation periods"]
    }
  ];

  // Slider 3: Managed Payroll & Risk Transfer (6 items)
  const payrollRiskItems: StaffingItem[] = [
    {
      title: "Employer of Record (EOR) Payrolling",
      subCategory: "Risk Transfer",
      desc: "Outsource payroll processing and statutorily employ your workers under our corporate entity, absorbing complete payroll liabilities.",
      keyPoints: ["Statutory PF/ESIC absorption", "Zero client administrative overhead", "Pan-India wage management registers"]
    },
    {
      title: "Principal Employer Shield",
      subCategory: "Risk Transfer",
      desc: "Comprehensive legal indemnity shields protecting your business from co-employment claims and subcontractor labor disputes.",
      keyPoints: ["Contractor compliance audit tracking", "Full liability indemnity backing", "CLRA advisory and license setup"]
    },
    {
      title: "Multi-State Labour Compliance",
      subCategory: "Risk Transfer",
      desc: "Manage payroll regulations, wage rules, and filing registers across 28+ states through our centralized compliance grid.",
      keyPoints: ["Local labor board coordinates", "Timely monthly filings audits", "Audit-ready document archives"]
    },
    {
      title: "Vendor Consolidation",
      subCategory: "Risk Transfer",
      desc: "Consolidate multiple legacy staffing vendors under a single invoice, simplifying accounting and unifying compliance standards.",
      keyPoints: ["Unified monthly invoices", "Standardized SLA checklists", "Vendor performance audit registers"]
    },
    {
      title: "PF, ESI & Statutory Audits",
      subCategory: "Risk Transfer",
      desc: "Continuous checks on monthly PF, ESI, and Professional Tax deposit logs to guarantee zero-penalty compliance positions.",
      keyPoints: ["Pre-vetted deposit challans logs", "Direct filings verification", "Zero-deviation audit clearance certificates"]
    },
    {
      title: "Labor Dispute Resolution",
      subCategory: "Risk Transfer",
      desc: "Providing legal and regulatory advisory support to handle trade union representation, wage disputes, or labor board notices.",
      keyPoints: ["Expert labor attorneys advisory", "Formulation of response registers", "Audit gap corrective blueprints"]
    }
  ];

  // Slider 4: GRC & Tech Talent (6 items)
  const grcTalentItems: StaffingItem[] = [
    {
      title: "Fractional CISOs & IT Risk Officers",
      subCategory: "GRC Tech Talent",
      desc: "Access part-time or project-based Chief Information Security Officers to design frameworks, run audits, and report to boards.",
      keyPoints: ["Experienced security leads placement", "Prior corporate audit records", "Board presentation dashboards prep"]
    },
    {
      title: "SOC Analysts & Incident Responders",
      subCategory: "GRC Tech Talent",
      desc: "Deploy pre-vetted engineers to run security operations centers, analyze alerts, and execute breach containment playbooks.",
      keyPoints: ["Technical security certifications", "Pre-screened threat analysts", "24/7 rotation availability"]
    },
    {
      title: "ISO 27001 & SOC 2 Coordinators",
      subCategory: "GRC Tech Talent",
      desc: "Contract experts to compile evidence, define control gates, and coordinate with external certification auditors.",
      keyPoints: ["Proven audit execution histories", "Control tracking systems setup", "Documentation audit readiness"]
    },
    {
      title: "DPDP Privacy Officers",
      subCategory: "GRC Tech Talent",
      desc: "Place compliance managers to run data discovery mapping, database encryption projects, and statutory consent register APIs.",
      keyPoints: ["Indian privacy act training", "Data registry audits", "Breach notification playbooks"]
    },
    {
      title: "ESG & Sustainability Analysts",
      subCategory: "GRC Tech Talent",
      desc: "Contract analysts to compile carbon footprint data, calculate emissions inventories, and format SEBI-compliant BRSR reports.",
      keyPoints: ["GRI / SASB methodology training", "Emissions spreadsheet auditing", "Investor deck preparation support"]
    },
    {
      title: "EHS Inspectors & Factory Auditors",
      subCategory: "GRC Tech Talent",
      desc: "Deploy certified plant safety officers, EHS managers, and factory inspectors to audit local assembly lines.",
      keyPoints: ["Factories Act credentials checks", "Mock hazard drills logging", "HIRA register management"]
    }
  ];

  // Slider 5: Sourcing & Engagement Models (5 items)
  const engagementModelItems: StaffingItem[] = [
    {
      title: "Managed Service Provider (MSP)",
      subCategory: "Engagement Models",
      desc: "Consolidate and manage your entire contingent workforce program under a single point of control, unifying billing and vendor checks.",
      keyPoints: ["Master vendor program setup", "Unified contingent rate cards", "Unbiased vendor auditing registers"]
    },
    {
      title: "Recruitment Process Outsourcing (RPO)",
      subCategory: "Engagement Models",
      desc: "Embed our recruitment teams directly into your HR operations to build custom talent pipelines and manage direct hiring.",
      keyPoints: ["Embedded talent teams deployment", "Optimized ATS tracking systems", "Scale permanent hiring pipelines"]
    },
    {
      title: "Executive Search & Direct Hire",
      subCategory: "Engagement Models",
      desc: "Retained search for C-suite officers, board directors, and critical compliance executives matching specific credentials.",
      keyPoints: ["C-Suite target mapping registries", "Psychometric testing checkmarks", "Comprehensive reference verification logs"]
    },
    {
      title: "Vendor Management System (VMS) Integration",
      subCategory: "Engagement Models",
      desc: "Deploying cloud portals to track supplier SLA scores, manage invoices, check compliance, and evaluate workforce rosters.",
      keyPoints: ["Direct API database connectors", "Automatic alert notifications", "Consolidated billing dashboards"]
    },
    {
      title: "Domain-Specific Talent Acquisition",
      subCategory: "Engagement Models",
      desc: "Targeted sourcing for highly technical disciplines such as electronics cleanroom safety, SCADA network protection, or clinical audit boards.",
      keyPoints: ["Domain expert vetting protocols", "Industry standard tests logs", "Rapid matching pipelines database"]
    }
  ];

  // Partners & Associations (Slider 6)
  const partners = [
    { name: "DSCI", cat: "Data Security Council" },
    { name: "NASSCOM", cat: "Tech Association" },
    { name: "CII", cat: "Industry Association" },
    { name: "FICCI", cat: "Trade Association" },
    { name: "ASSOCHAM", cat: "Chamber of Commerce" },
    { name: "Bureau Veritas", cat: "Compliance Partner" },
    { name: "SGS India", cat: "Labor Audit Partner" },
    { name: "DNV", cat: "Risk Advisory Partner" }
  ];

  const renderCard = (item: StaffingItem, idx: number) => (
    <div 
      key={idx} 
      className="group h-full relative bg-white border border-slate-200/80 hover:border-blue-500/30 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl p-6 select-none min-h-[300px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
      <div className="space-y-4 relative z-10 text-left">
        <span className="text-[9px] font-black tracking-widest text-blue-500 uppercase">
          {item.subCategory}
        </span>
        <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-slate-605 line-clamp-3 leading-relaxed font-semibold">
          {item.desc}
        </p>
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <ul className="space-y-1">
            {item.keyPoints.slice(0, 2).map((pt, i) => (
              <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-widest">
        <span>SLA Mapped</span>
        <span className="text-blue-600 flex items-center gap-0.5">
          Indemnified <Shield className="w-3 h-3 text-blue-500" />
        </span>
      </div>
    </div>
  );

  const contractCards = contractSourcingItems.map((item, idx) => renderCard(item, idx));
  const payrollCards = payrollRiskItems.map((item, idx) => renderCard(item, idx));
  const grcCards = grcTalentItems.map((item, idx) => renderCard(item, idx));
  const engagementCards = engagementModelItems.map((item, idx) => renderCard(item, idx));

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
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-extrabold text-slate-700 tracking-[0.2em] uppercase">
                          Staffing Services • {slide.badge}
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
                      <a href="#contracting" onClick={(e) => {
                        const targetEl = document.getElementById("contracting");
                        if (targetEl) {
                          e.preventDefault();
                          targetEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 text-sm font-bold transition-all hover:scale-[1.02]">
                        {slide.cta || "Explore Solutions"} <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          />
        </section>
        {/* Panel 2: Statistics Grid */}
        <section className="py-8 relative overflow-hidden bg-slate-50 border-b border-slate-200/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center">
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {stat.value}
                    <span className="text-blue-600 text-lg font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE DEFINITIVE COMPENDIUM OF MANPOWER STAFFING & SERVICES */}
        <section className="py-16 bg-slate-50/30 border-b border-slate-200/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50">
                    Definitive Compendium
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    Manpower Staffing & Services Portfolio
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-555 font-semibold max-w-2xl leading-relaxed">
                    A comprehensive taxonomy of our skill tiers, deployment timelines, regulatory engagement models, and industry alignment grids.
                  </p>
                </div>
                {/* Dashboard Tabs Selector */}
                <div className="flex flex-wrap gap-2 lg:self-center">
                  {[
                    { id: "skill-tiers", label: "Skill Categories", icon: Layers },
                    { id: "hiring-formats", label: "Hiring & Engagement", icon: Briefcase },
                    { id: "industry-matrix", label: "Industry Matrix", icon: Building2 },
                    { id: "service-offerings", label: "Service Deep-Dives", icon: BookOpen },
                    { id: "benefits", label: "Client Advantages", icon: Award }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = compendiumTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setCompendiumTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-wider transition-all border ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-650 shadow-md shadow-blue-500/10"
                            : "bg-slate-50 text-slate-705 border-slate-200/80 hover:bg-slate-105"
                        }`}
                      >
                        <TabIcon className="w-4 h-4 shrink-0" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TAB CONTENT PANEL */}
              <div className="w-full transition-all duration-300">
                
                {/* 1. Skill Categories Tab */}
                {compendiumTab === "skill-tiers" && (
                  <div className="space-y-8 animate-fade-in text-left">
                    {/* Tier selector */}
                    <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto p-1 bg-slate-100 rounded-2xl border border-slate-200/40">
                      {skillTiers.map((tier, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSkillTier(idx)}
                          className={`py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                            selectedSkillTier === idx
                              ? "bg-white text-blue-600 shadow-sm font-extrabold"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {tier.title.split(" ")[0]} Collar
                        </button>
                      ))}
                    </div>

                    {/* Active tier info */}
                    <div className="grid lg:grid-cols-3 gap-8 pt-4">
                      {/* Left: Profile & Characteristics */}
                      <div className="lg:col-span-1 space-y-6 text-left border-r border-slate-100 pr-0 lg:pr-8">
                        <div>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">
                            Education & Experience
                          </span>
                          <h4 className="text-xl font-black text-slate-900 leading-tight mb-3">
                            {skillTiers[selectedSkillTier].title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                            {skillTiers[selectedSkillTier].profile}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                            Functional Characteristics
                          </span>
                          <ul className="space-y-2.5">
                            {skillTiers[selectedSkillTier].characteristics.map((char, idx) => (
                              <li key={idx} className="text-xs text-slate-700 font-semibold flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Representative Roles by Domain */}
                      <div className="lg:col-span-2 space-y-4 text-left">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          Representative Roles by Industry Sector
                        </span>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {Object.entries(skillTiers[selectedSkillTier].roles).map(([domain, roles]) => (
                            <div key={domain} className="bg-slate-50/70 border border-slate-200/50 rounded-2xl p-5 hover:border-blue-500/20 transition-all">
                              <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-wider border-b border-slate-200/60 pb-2 mb-3">
                                {domain}
                              </h5>
                              <ul className="space-y-1.5">
                                {roles.map((role, idx) => (
                                  <li key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span>{role}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Hiring & Engagement Tab */}
                {compendiumTab === "hiring-formats" && (
                  <div className="space-y-8 animate-fade-in text-left">
                    {/* Inner selector */}
                    <div className="flex justify-center">
                      <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/40">
                        <button
                          onClick={() => setSelectedHiringTab("formats")}
                          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                            selectedHiringTab === "formats"
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Hiring Formats
                        </button>
                        <button
                          onClick={() => setSelectedHiringTab("models")}
                          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                            selectedHiringTab === "models"
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Engagement Models
                        </button>
                      </div>
                    </div>

                    {/* Dynamic grid rendering */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 text-left">
                      {selectedHiringTab === "formats" ? (
                        hiringFormats.map((format) => (
                          <div key={format.id} className="group relative bg-white border border-slate-200/80 hover:border-blue-500/25 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden min-h-[260px]">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                                <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {format.title}
                                </h4>
                                <span className="text-[8px] font-extrabold bg-blue-50 text-blue-600 border border-blue-150 px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider">
                                  {format.urgency.split(" ")[0]}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                {format.definition}
                              </p>
                              <div className="space-y-1.5 pt-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                                  Ideal Scenarios
                                </span>
                                <ul className="space-y-1">
                                  {format.whenToUse.map((scenario, idx) => (
                                    <li key={idx} className="text-[10px] text-slate-600 font-semibold flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                      <span>{scenario}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        engagementModels.map((model) => (
                          <div key={model.id} className="group relative bg-white border border-slate-200/80 hover:border-blue-500/25 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden min-h-[260px]">
                            <div className="space-y-4">
                              <div className="border-b border-slate-100 pb-3">
                                <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {model.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                {model.howItWorks}
                              </p>
                              <div className="space-y-1.5 pt-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                                  Framework Features
                                </span>
                                <ul className="space-y-1">
                                  {model.details.map((detail, idx) => (
                                    <li key={idx} className="text-[10px] text-slate-600 font-semibold flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Industry Matrix Tab */}
                {compendiumTab === "industry-matrix" && (
                  <div className="grid lg:grid-cols-12 gap-8 pt-2 text-left animate-fade-in">
                    {/* Industry Selector Grid */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-2 border-r border-slate-100 pr-0 lg:pr-6 max-h-[460px] overflow-y-auto">
                      {industryMatrix.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedMatrixIndustry(item.id)}
                          className={`p-4 text-[10px] font-black uppercase tracking-wider rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 aspect-[4/3] ${
                            selectedMatrixIndustry === item.id
                              ? "bg-slate-950 text-white border-slate-950 shadow-lg"
                              : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <Building2 className="w-5 h-5 text-blue-500" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Industry Analysis */}
                    {(() => {
                      const ind = industryMatrix.find((item) => item.id === selectedMatrixIndustry);
                      if (!ind) return null;
                      return (
                        <div className="lg:col-span-8 space-y-6">
                          <div className="border-b border-slate-100 pb-4">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                              Sector Specifications
                            </span>
                            <h3 className="text-xl font-black text-slate-900 mt-1">
                              {ind.title} Workforce Blueprint
                            </h3>
                          </div>

                          {/* Skill Tiers Config Matrix */}
                          <div className="grid md:grid-cols-3 gap-4">
                            {[
                              { label: "Blue Collar Tier", key: "lowSkill" as const },
                              { label: "Grey Collar Tier", key: "mediumSkill" as const },
                              { label: "White Collar Tier", key: "highSkill" as const }
                            ].map((tier) => {
                              const tData = ind[tier.key];
                              return (
                                <div key={tier.key} className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 space-y-3">
                                  <div className="border-b border-slate-100 pb-2">
                                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">
                                      {tier.label}
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Formats</span>
                                      <span className="text-[10px] font-semibold text-slate-700">{tData.category}</span>
                                    </div>
                                    <div>
                                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Models</span>
                                      <span className="text-[10px] font-semibold text-slate-700">{tData.model}</span>
                                    </div>
                                    <div>
                                      <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Target Roles</span>
                                      <div className="flex flex-wrap gap-1">
                                        {tData.roles.map((r, i) => (
                                          <span key={i} className="text-[9px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-slate-600">
                                            {r}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Considerations Box */}
                          <div className="bg-slate-950 text-white rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
                            <div className="space-y-3 relative z-10">
                              <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.15em] flex items-center gap-1.5">
                                <ShieldCheck className="w-4.5 h-4.5 text-blue-400" />
                                Sector Specific Compliance & SLA Considerations
                              </h5>
                              <ul className="space-y-2">
                                {ind.considerations.map((c, i) => (
                                  <li key={i} className="text-xs text-slate-350 font-semibold flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 4. Detailed Offerings Tab */}
                {compendiumTab === "service-offerings" && (
                  <div className="grid lg:grid-cols-12 gap-8 text-left animate-fade-in">
                    {/* Left List */}
                    <div className="lg:col-span-4 space-y-1.5 border-r border-slate-100 pr-0 lg:pr-6 max-h-[500px] overflow-y-auto">
                      {detailedOfferings.map((offering) => (
                        <button
                          key={offering.id}
                          onClick={() => setSelectedOffering(offering.id)}
                          className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                            selectedOffering === offering.id
                              ? "bg-slate-950 text-white border-slate-950 shadow-md"
                              : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg font-black text-[9px] flex items-center justify-center shrink-0 ${
                              selectedOffering === offering.id ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                            }`}>
                              {detailedOfferings.findIndex(o => o.id === offering.id) + 1}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider">{offering.title.replace(" Staffing", "")}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        </button>
                      ))}
                    </div>

                    {/* Right Details Panel */}
                    {(() => {
                      const off = detailedOfferings.find((o) => o.id === selectedOffering);
                      if (!off) return null;
                      return (
                        <div className="lg:col-span-8 space-y-8 max-h-[600px] overflow-y-auto pr-2">
                          {/* Overview */}
                          <div className="space-y-2 border-b border-slate-100 pb-4">
                            <h3 className="text-xl font-black text-slate-900">
                              {off.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                              {off.overview}
                            </p>
                          </div>

                          {/* Recruitment & Deployment Timeline */}
                          <div className="space-y-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                              Recruitment & Deployment Process
                            </span>
                            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                              {off.processSteps.map((step, idx) => (
                                <div key={idx} className="relative space-y-1">
                                  {/* Timeline marker */}
                                  <div className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                  </div>
                                  <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">
                                    {step.title}
                                  </h5>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                                    {step.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Two column metrics block: benefits & deployment timeline */}
                          <div className="grid md:grid-cols-2 gap-6 pt-4">
                            {/* Key Benefits */}
                            <div className="space-y-3 bg-slate-50 border border-slate-200/50 rounded-2xl p-5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                                Strategic Benefits
                              </span>
                              <ul className="space-y-2">
                                {off.benefits.slice(0, 4).map((b, idx) => (
                                  <li key={idx} className="text-[11px] text-slate-600 font-semibold flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                      <strong className="text-slate-900 block">{b.title}</strong>
                                      <span className="text-[10px] text-slate-405">{b.desc}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Standard Deploy Timeline */}
                            <div className="space-y-3 bg-slate-50 border border-slate-200/50 rounded-2xl p-5">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                                Expected Deployment Timelines
                              </span>
                              <div className="divide-y divide-slate-200/60">
                                {Object.entries(off.deployTime).map(([tier, timeline]) => (
                                  <div key={tier} className="py-2.5 flex items-center justify-between text-xs font-semibold">
                                    <span className="text-slate-600 font-bold">{tier}</span>
                                    <span className="text-blue-600 font-black flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5" /> {timeline}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 5. Client Advantages Tab */}
                {compendiumTab === "benefits" && (
                  <div className="space-y-8 animate-fade-in text-left">
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      {clientBenefits.map((benefit, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200/60 hover:border-blue-500/20 hover:shadow-md transition-all rounded-3xl p-6 md:p-8 flex items-start gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            {idx === 0 && <Award className="w-6 h-6 text-blue-600" />}
                            {idx === 1 && <ShieldCheck className="w-6 h-6 text-blue-600" />}
                            {idx === 2 && <TrendingUp className="w-6 h-6 text-blue-600" />}
                            {idx === 3 && <Activity className="w-6 h-6 text-blue-600" />}
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-base font-black text-slate-950">
                              {benefit.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Content Sliders */}
        <div className="container mx-auto px-6 max-w-7xl pt-16 space-y-20">
          
          {/* Slider 2: Compliant Contract Staffing */}
          <section id="contracting" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sourcing & SOW</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Compliant Contract Staffing</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Deploy blue, grey, and white-collar contractors with 100% wage compliance, statutory checks, and structured Statement of Work deliverables.
              </p>
            </div>
            <GrcCarousel items={contractCards} />
          </section>

          {/* Slider 3: Managed Payroll & Risk Transfer */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Co-employment Shield</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Managed Payroll & Risk Transfer</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Employer of Record payrolling, principal employer legal shields, vendor audit reconciliations, and multi-state dispute resolution.
              </p>
            </div>
            <GrcCarousel items={payrollCards} />
          </section>

          {/* Slider 4: GRC & Tech Talent-as-a-Service */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Experts on Demand</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">GRC & Tech Talent-as-a-Service</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                On-demand deployment of fractional CISOs, security analysts, DPDP privacy officers, ESG disclosure leads, and certified EHS auditors.
              </p>
            </div>
            <GrcCarousel items={grcCards} />
          </section>

          {/* Slider 5: Strategic Sourcing & SOW Models */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">HR Engagement</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Engagement & Sourcing Models</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                MSP consolidation programs, embedded RPO hiring pipelines, executive retained searches, and vendor management systems configurations.
              </p>
            </div>
            <GrcCarousel items={engagementCards} />
          </section>

          {/* Vetting Phases Layout (Standard 5-Phase Vetting) */}
          <section className="space-y-8 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Quality Vetting</span>
              <h3 className="text-xl font-black text-slate-900 font-heading">Our 5-Phase Candidate Vetting & Quality Check</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-xl mx-auto">Click a vetting phase below to explore how we screen and verify compliance talent before deployment.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3 flex flex-col gap-2">
                {screeningPhases.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhase(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                      selectedPhase === idx
                        ? "bg-slate-950 text-white border-slate-950 shadow-xl"
                        : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-800"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      selectedPhase === idx ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                    }`}>{idx + 1}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{phase.title}</span>
                  </button>
                ))}
              </div>
              <div className="lg:w-2/3 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between text-left min-h-[220px]">
                <div className="space-y-3">
                  <span className="text-[9px] font-black text-blue-550 uppercase tracking-wider block">Phase {selectedPhase + 1} Vetting • {screeningPhases[selectedPhase].phase}</span>
                  <h4 className="text-base font-black text-slate-900">{screeningPhases[selectedPhase].title}</h4>
                  <p className="text-xs text-slate-605 leading-relaxed font-semibold">{screeningPhases[selectedPhase].desc}</p>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider pt-4 border-t border-slate-150 mt-4 block">Govenics Vetting Standards</span>
              </div>
            </div>
          </section>

          {/* Slider 6: Partners & Associations */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Industry Ties</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Associations & Staffing Partners</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Collaborating with leading industry associations and certification bodies to deliver pre-screened, legal, and compliance-aware workforces.
              </p>
            </div>
            <GrcCarousel items={partnerCards} />
          </section>

        </div>
      </div>
    </Layout>
  );
}

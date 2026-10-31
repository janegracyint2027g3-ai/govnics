import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { industriesData } from "@/data/industries-data";
import { servicesData } from "@/data/services-data";
import { industryServicesData } from "@/data/industry-services-data";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { 
  CheckCircle2, ShieldCheck, 
  Shield, Layers, Cpu, Users, ClipboardCheck, 
  Settings, Bot, ArrowRightLeft, BookOpen, BarChart3, Clock,
  ArrowRight
} from "lucide-react";

import heroSoc from "@/assets/hero-soc-cyber.jpg";
import heroDrone from "@/assets/hero-soc-cyber.jpg";
import heroFacility from "@/assets/hero-industrial.jpg";
import heroCommand from "@/assets/hero-command-center.jpg";
import heroVerify from "@/assets/hero-boardroom.jpg";
import heroAiDriven from "@/assets/hero-ai-analytics.jpg";
import heroIntegration from "@/assets/hero-esg.jpg";

// ── Animated Industry Visual Panel ────────────────────────────────────────────
function AnimatedIndustryPanel({ sectorTitle, clusterName }: { sectorId: string; sectorTitle: string; clusterName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Map cluster → image + accent colors + label pills
  const getVisualConfig = () => {
    const c = clusterName.toLowerCase();
    if (c.includes("manufacturing")) return {
      image: heroFacility,
      gradient: "from-blue-900/80 via-blue-800/60 to-transparent",
      accent: "bg-blue-500",
      ring: "border-blue-400",
      pills: ["ISO 45001", "Factories Act", "EHS Compliance", "Safety Audit"],
      tag: "Industrial GRC",
      tagColor: "bg-blue-600",
    };
    if (c.includes("technology")) return {
      image: heroAiDriven,
      gradient: "from-violet-900/80 via-violet-800/60 to-transparent",
      accent: "bg-violet-500",
      ring: "border-violet-400",
      pills: ["CERT-In", "DPDP Act", "ISO 27001", "SOC 2"],
      tag: "Tech & Cyber GRC",
      tagColor: "bg-violet-600",
    };
    if (c.includes("infrastructure")) return {
      image: heroDrone,
      gradient: "from-slate-900/80 via-slate-800/60 to-transparent",
      accent: "bg-orange-500",
      ring: "border-orange-400",
      pills: ["BOCW Act", "PCB Consent", "RERA", "EIA Norms"],
      tag: "Construction GRC",
      tagColor: "bg-orange-600",
    };
    if (c.includes("energy")) return {
      image: heroSoc,
      gradient: "from-emerald-900/80 via-emerald-800/60 to-transparent",
      accent: "bg-emerald-500",
      ring: "border-emerald-400",
      pills: ["CEA Act", "OERC Rules", "SERC Directives", "ISO 50001"],
      tag: "Energy & Utilities GRC",
      tagColor: "bg-emerald-600",
    };
    if (c.includes("financial")) return {
      image: heroCommand,
      gradient: "from-indigo-900/80 via-indigo-800/60 to-transparent",
      accent: "bg-indigo-500",
      ring: "border-indigo-400",
      pills: ["RBI Master", "SEBI LODR", "IRDAI", "PMLA Rules"],
      tag: "BFSI Regulatory GRC",
      tagColor: "bg-indigo-600",
    };
    if (c.includes("healthcare")) return {
      image: heroVerify,
      gradient: "from-rose-900/80 via-rose-800/60 to-transparent",
      accent: "bg-rose-500",
      ring: "border-rose-400",
      pills: ["CDSCO Rules", "PCPNDT Act", "WHO-GMP", "Clinical Trials"],
      tag: "Healthcare & Life Sciences GRC",
      tagColor: "bg-rose-600",
    };
    if (c.includes("consumer") || c.includes("retail")) return {
      image: heroIntegration,
      gradient: "from-amber-900/80 via-amber-800/60 to-transparent",
      accent: "bg-amber-500",
      ring: "border-amber-400",
      pills: ["FSSAI", "BIS Standards", "Consumer Protection", "GST Compliance"],
      tag: "Consumer & Retail GRC",
      tagColor: "bg-amber-600",
    };
    // media/services default
    return {
      image: heroDrone,
      gradient: "from-sky-900/80 via-sky-800/60 to-transparent",
      accent: "bg-sky-500",
      ring: "border-sky-400",
      pills: ["TRAI Rules", "IT Act", "DPDP Act", "Broadcast Code"],
      tag: "Media & Services GRC",
      tagColor: "bg-sky-600",
    };
  };

  const cfg = getVisualConfig();

  return (
    <div
      ref={ref}
      className={`container mx-auto px-6 max-w-6xl pt-8 pb-2 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[280px] sm:h-[340px]">
        {/* Background image */}
        <img
          src={cfg.image}
          alt={sectorTitle}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[8s] hover:scale-100"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${cfg.gradient}`} />

        {/* Floating animated orbs */}
        <div className={`absolute top-6 right-10 w-24 h-24 rounded-full ${cfg.accent} opacity-20 blur-2xl animate-pulse`} />
        <div className={`absolute bottom-8 right-24 w-16 h-16 rounded-full ${cfg.accent} opacity-15 blur-xl`}
          style={{ animation: "pulse 3s ease-in-out 1s infinite" }} />
        <div className={`absolute top-1/2 right-1/3 w-8 h-8 rounded-full border-2 ${cfg.ring} opacity-40`}
          style={{ animation: "spin 8s linear infinite" }} />

        {/* Pulsing ring around sector icon */}
        <div className="absolute top-6 right-6 flex items-center justify-center">
          <div className={`w-14 h-14 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center`}
            style={{ animation: "pulse 2.5s ease-in-out infinite" }}
          >
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-7">
          <span className={`inline-flex self-start items-center px-3 py-1 ${cfg.tagColor} text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg`}>
            {cfg.tag}
          </span>
          <h4 className="text-white font-black text-2xl sm:text-3xl font-heading leading-tight drop-shadow-xl">
            {sectorTitle} <span className="text-white/70">Compliance</span>
          </h4>
          <p className="text-white/70 text-xs font-semibold mt-1 max-w-sm">
            Fully calibrated GRC framework for {sectorTitle} within {clusterName}.
          </p>

          {/* Animated regulation pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {cfg.pills.map((pill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full"
                style={{ animationDelay: `${i * 0.15}s`, animation: visible ? `fadeInUp 0.5s ease forwards ${i * 0.12}s` : "none", opacity: visible ? 1 : 0 }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Floating dots pattern */}
        <div className="absolute top-4 left-1/2 flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full bg-white opacity-30`}
              style={{ animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function IndustryDetailPage() {
  const { clusterId } = useParams<{ clusterId: string }>();
  
  // Track active tab index for each sub-sector independently
  const [activeSectorTabs, setActiveSectorTabs] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const timer = setTimeout(handleScroll, 180);
    return () => clearTimeout(timer);
  }, [clusterId]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Map cluster ID to name
  const getClusterName = (id: string) => {
    const lower = (id || "").toLowerCase();
    if (lower.includes("health") || lower.includes("hospital") || lower.includes("pharma") || lower.includes("medical")) {
      return "Healthcare & Life Sciences";
    }
    if (lower.includes("tech") || lower.includes("software") || lower.includes("it-") || lower.includes("saas") || lower.includes("cyber")) {
      return "Technology & Electronics";
    }
    if (lower.includes("finan") || lower.includes("bank") || lower.includes("bfsi") || lower.includes("insurance") || lower.includes("lending") || lower.includes("capital")) {
      return "Financial Services";
    }
    if (lower.includes("infra") || lower.includes("construct") || lower.includes("realty") || lower.includes("estate")) {
      return "Infrastructure & Construction";
    }
    if (lower.includes("energy") || lower.includes("utilit") || lower.includes("power") || lower.includes("oil") || lower.includes("gas") || lower.includes("renewable")) {
      return "Energy & Utilities";
    }
    if (lower.includes("retail") || lower.includes("consumer") || lower.includes("ecom") || lower.includes("d2c") || lower.includes("fmcg")) {
      return "Consumer & Retail";
    }
    if (lower.includes("food")) {
      return "Food Processing";
    }
    if (lower.includes("media") || lower.includes("prof") || lower.includes("consult") || lower.includes("legal") || lower.includes("audit")) {
      return "Media & Services";
    }
    if (lower.includes("manuf") || lower.includes("auto") || lower.includes("industr") || lower.includes("plant") || lower.includes("factory")) {
      return "Manufacturing & Industrial";
    }
    return "Manufacturing & Industrial";
  };

  const clusterName = getClusterName(clusterId || "");
  
  useEffect(() => {
    document.title = `${clusterName} GRC Solutions & Regulatory Compliance — GOVENICS`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = `Specialized GRC advisory, statutory audit overwatch, and regulatory risk management solutions tailored for ${clusterName} enterprises in India.`;
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, [clusterName]);

  // Filter sub-sectors belonging to this cluster
  const clusterSectors = industriesData.filter((ind) => ind.cluster === clusterName);



  // Dynamic Metrics generator based on industry profile
  const getIndustryStats = (id: string) => {
    const sector = industriesData.find(ind => ind.id === id);
    if (sector?.stats && sector.stats.length === 4) {
      const icons = [ShieldCheck, ClipboardCheck, Clock, BarChart3];
      return sector.stats.map((st, idx) => ({
        value: st.value,
        suffix: st.suffix,
        label: st.label,
        icon: icons[idx] || ShieldCheck
      }));
    }
    // Fallback if stats field is missing:
    if (id === "banking" || id === "financial-services" || id === "insurance" || id === "ecommerce" || id === "it-bpm" || id === "telecommunications") {
      return [
        { value: "0", label: "Regulatory Penalty Events", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Data Privacy Adherence", icon: ClipboardCheck },
        { value: "↓ 80", suffix: "%", label: "Audit Prep Speedup", icon: Clock },
        { value: "12 - 18", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    } else if (id === "automobiles" || id === "auto-components" || id === "engineering-capital-goods" || id === "defence-manufacturing" || id === "cement" || id === "steel" || id === "infrastructure" || id === "real-estate" || id === "roads-highways" || id === "oil-gas" || id === "power" || id === "renewable-energy") {
      return [
        { value: "0", label: "HSE / Safety Incidents", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Licensing & Permit Compliance", icon: ClipboardCheck },
        { value: "↓ 60", suffix: "%", label: "Reporting Overhead Reductions", icon: Clock },
        { value: "18 - 24", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    } else {
      return [
        { value: "100", suffix: "%", label: "Process Audits Pass Rate", icon: ShieldCheck },
        { value: "↓ 90", suffix: "%", label: "SLA Compliance Gaps", icon: ClipboardCheck },
        { value: "↓ 50", suffix: "%", label: "Audit Prep Timeline Speedup", icon: Clock },
        { value: "12 - 15", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    }
  };

  const getIndustryPortfolio = (id: string, challenges: string[], outcomes: string[]) => {
    const offerings = industryServicesData[id] || [];
    const icons = [Shield, Cpu, Layers, BarChart3];
    
    return Array.from({ length: 4 }).map((_, idx) => {
      const offering = offerings[idx];
      const icon = icons[idx] || Shield;
      
      if (offering) {
        return {
          title: offering.title,
          icon: icon,
          features: [
            offering.description,
            offering.outcome,
            idx === 0 ? `Resolves: ${challenges[0] || "Compliance friction"}` :
            idx === 1 ? `Resolves: ${challenges[1] || "Audit preparation delay"}` :
            idx === 2 ? `Delivers: ${outcomes[0] || "Continuous overwatch"}` :
            `Delivers: ${outcomes[1] || "Stakeholder credibility"}`
          ]
        };
      }
      
      return {
        title: `Core GRC Offering ${idx + 1}`,
        icon: icon,
        features: [
          "Operational risk framework design",
          "Statutory regulatory alignment",
          "Continuous compliance reporting"
        ]
      };
    });
  };

  // Generate specific Operational Capabilities tabs for a sub-sector
  const getSectorTabs = (title: string, regulations: string[]) => {
    return [
      {
        title: "Skilled Staffing Services",
        icon: Users,
        description: `The successful implementation of GRC controls in the ${title} sector requires a workforce possessing highly specialized regulatory and technical acumen. By bridging deep domain experience with hands-on execution, our pre-vetted compliance personnel ensure smooth operations under our GRC umbrella.`,
        detailsTitle: "Key Details",
        details: [
          `Safety & Compliance Rigor: Stringent adherence to local and international protocols governing ${title} operations.`,
          `Continuous Skill Upgradation: Mandatory ongoing training programs ensuring our personnel stay ahead of compliance curves.`,
          `Seamless Team Integration: Professionals trained to collaborate cohesively with your internal risk and legal departments.`,
          `Cross-functional Expertise: Personnel capable of bridging physical operations, software systems, and statutory filing workflows.`,
          `Scalable Resourcing: Flexible workforce allocation that dynamically scales up or down based on project auditing demands.`
        ]
      },
      {
        title: "SLA Based Managed Services",
        icon: ClipboardCheck,
        description: `We assume end-to-end operational accountability for your ${title} compliance posture. Managed under strict performance SLAs, we continuously monitor controls, manage reporting registers, and prevent compliance deviations.`,
        detailsTitle: "Key Details",
        details: [
          "99% Assurance Level: Guaranteed response times and SLA-backed compliance targets.",
          "Always-On Overwatch: Ongoing surveillance of critical security controls and risk alerts.",
          "Routine Status Audits: Scheduled weekly and monthly control assessments with automated reporting.",
          "Vendor Oversight: Direct auditing of third-party SLAs and vendor deliverables.",
          "Zero-Lag Incident Resolution: Immediate containment protocols triggered upon control failure alerts."
        ]
      },
      {
        title: "Advisory & Consulting Services",
        icon: ShieldCheck,
        description: `Partner with our senior risk partners and legal advisors to design custom regulatory strategies, build robust internal frameworks, and prepare for upcoming statutory inspections in ${title}.`,
        detailsTitle: "Key Details",
        details: [
          `Regulatory Gap Assessments: Comprehensive analysis of your current controls against ${regulations.join(", ") || "statutory guidelines"}.`,
          "Framework Design & Codification: Custom development of policies, SOPs, and delegation of authority (DoA) matrices.",
          "Audit Preparation Guidance: Expert mock audits and training to ensure 100% readiness for regulatory inspectors.",
          "Litigation Exposure Reduction: Advisory focused on minimizing legal liability and operational penalty risks.",
          "Strategic Board Reporting: Synthesizing complex GRC metrics into clear executive dashboards."
        ]
      },
      {
        title: "Systems Integration Services",
        icon: Settings,
        description: `Bridge the gap between your operational database and GRC dashboards. We integrate telemetry pipelines, consent managers, and sensor telemetry directly into a centralized overwatch system for ${title}.`,
        detailsTitle: "Key Details",
        details: [
          "API-First Integrations: Custom connectors linking CRM, ERP, and database nodes.",
          "Live Data Synchronization: Sub-second latency for security and data privacy logs.",
          "Sensor & Telemetry Pipelines: Feeding real-time operational telemetry into risk engines.",
          "Security Hardening: Implementing quantum-resilient SSL and encryption across data streams.",
          "Single-Pane Dashboard: Unified view of all GRC health metrics and alert indicators."
        ]
      },
      {
        title: "Build Operate Transfer Services",
        icon: ArrowRightLeft,
        description: `Establish a self-sustaining internal GRC and cybersecurity command center for ${title}. We design the infrastructure, operate it initially to stabilize performance, and then transfer complete ownership to your internal team.`,
        detailsTitle: "Key Details",
        details: [
          "Infrastructure Blueprinting: Designing state-of-the-art internal GRC command centers.",
          "Operational Stabilization: Managing initial phases to optimize processes and train staff.",
          "Structured Talent Handover: Seamless transition of operations to your internal team.",
          "Comprehensive Training: Rigorous training programs and knowledge bases for internal staff.",
          "Post-Transfer Support: Periodic external reviews to ensure continuous control quality."
        ]
      },
      {
        title: "Knowledge Management Services",
        icon: BookOpen,
        description: `Keep your enterprise updated on every regulatory change, statutory code update, and legal revision in the ${title} landscape. We manage policy registers, training materials, and audit checklists.`,
        detailsTitle: "Key Details",
        details: [
          "Continuous Policy Updates: Immediate notifications on new legal gazettes and amendments.",
          "Pre-Codified Audit Checklists: Standardized audit templates for immediate deployment.",
          "Interactive Training Portals: Mobile-friendly compliance courses for staff and workers.",
          "Central Policy Library: Secure, version-controlled repository for all corporate policies.",
          "Statutory Filing Logs: Automated tracking of filing deadlines and submission archives."
        ]
      }
    ];
  };

  // General Hero slides for the category
  const slides = [
    {
      badge: "Industry Cluster",
      title: "Solutions for",
      highlight: clusterName,
      description: `Comprehensive GRC governance, EHS safety compliance, and digital trust frameworks designed for the ${clusterName} sectors.`,
      image: heroCommand,
    },
    {
      badge: "Core Focus Sectors",
      title: "Calibrated for",
      highlight: clusterSectors.slice(0, 3).map(s => s.title).join(" • "),
      description: `Targeted compliance operations and risk auditing registers for: ${clusterSectors.map(s => s.title).join(", ")}.`,
      image: heroDrone,
    },
    {
      badge: "Compliance Controls",
      title: "Always-Audit-Ready",
      highlight: "Framework Adherence",
      description: "We align your corporate operations with key local acts, Factories regulations, DPDP directives, and global ISO standards.",
      image: heroSoc,
    },
    {
      badge: "Strategic Outcomes",
      title: "Achieving Operational",
      highlight: "Integrity & Trust",
      description: "Access our pre-vetted compliance talent pool and SLA-managed audit overwatch systems to protect your operational posture.",
      image: heroFacility,
    }
  ];

  const clusterOverviewStats: GrcStatCardItem[] = [
    { value: `${clusterSectors.length}`, suffix: " Sectors", label: "Specialized Industry Sectors", icon: Layers, badge: "Taxonomy", description: `Specialized regulatory calibrations mapped for ${clusterName}` },
    { value: "100", suffix: "%", label: "Inspection Status Pass Rate", icon: ShieldCheck, badge: "Track Record", description: "Proven statutory audit pass rates across central & state inspection boards" },
    { value: "↓ 80", suffix: "%", label: "Penalty Slippage Reduction", icon: Shield, badge: "Protection", description: "Proactive compliance registers prevent costly statutory litigation" },
    { value: "24/7", label: "Continuous Audit Overwatch", icon: Clock, badge: "Monitoring", description: "Real-time task tracking and zero-lag regulatory amendment updates" }
  ];

  return (
    <Layout noPadding={true}>
      <div className="bg-white pb-24 text-slate-600">
        
        {/* Panel 1: Title & Hero Description Carousel */}
        <GrcSliderHero 
          slides={slides} 
          backLink={{ to: "/industries", label: "Back to Industries" }} 
          categoryLabel="Industry Solutions"
        />

        {/* Panel 2: Cluster Overview Statistics */}
        <GrcStatCards stats={clusterOverviewStats} />


        {/* Sub-Sector Sticky Anchor Menu */}
        <section className="bg-slate-50 border-b border-slate-200/80 py-4 sticky top-20 z-30 shadow-sm">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-l-2 border-blue-500 pl-2 shrink-0">
                {clusterName}
              </div>
              <div className="flex flex-wrap gap-2">
                {clusterSectors.map((sec) => {
                  const SecIcon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        const element = document.getElementById(sec.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="flex items-center gap-2 px-3.5 py-2 bg-white text-slate-655 border border-slate-200 hover:border-blue-600 hover:text-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <SecIcon className="w-3.5 h-3.5" />
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Vertically Stacked Sub-Sector Sections */}
        <div className="space-y-6">
          {clusterSectors.map((sector, idx) => {
            const stats = getIndustryStats(sector.id);
            const portfolio = getIndustryPortfolio(sector.id, sector.challenges, sector.outcomes);
            const mappedServices = servicesData.filter((serv) =>
              serv.industries.includes(sector.id)
            );
            const SectorIcon = sector.icon;

            // Generate sub-sector tabs and active states
            const sectorTabs = getSectorTabs(sector.title, sector.regulations);
            const activeTab = activeSectorTabs[sector.id] || 0;

            return (
              <section 
                key={sector.id} 
                id={sector.id} 
                className={`py-10 border-b border-slate-100 scroll-mt-36 ${
                  idx % 2 === 1 ? "bg-slate-50/20" : "bg-white"
                }`}
              >
                {/* Sector Header */}
                <div className="container mx-auto px-6 max-w-3xl text-center flex flex-col items-center space-y-3 pb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    <SectorIcon className="w-3 h-3 text-blue-600" /> Sector GRC calibration
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 font-heading">
                    {sector.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-semibold max-w-2xl leading-relaxed">
                    {sector.subtitle}
                  </p>
                </div>

                {/* Statistics Grid */}
                <div className="container mx-auto px-6 max-w-6xl">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, statIdx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div
                          key={statIdx}
                          className="group relative bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-1 text-left"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                              <StatIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                              <div className="flex items-baseline gap-0.5 text-3xl font-black text-slate-900">
                                {stat.value}
                                {stat.suffix && <span className="text-lg text-slate-500 font-bold ml-0.5">{stat.suffix}</span>}
                              </div>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Industry Visual Panel */}
                <AnimatedIndustryPanel
                  sectorId={sector.id}
                  sectorTitle={sector.title}
                  clusterName={clusterName}
                />

                {/* GRC Offerings (Portfolio Grid) */}
                <div className="container mx-auto px-6 max-w-6xl pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolio.map((card, cardIdx) => {
                      const CardIcon = card.icon;
                      return (
                        <div
                          key={cardIdx}
                          className="group relative bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1 text-left"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10 space-y-5">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                              <CardIcon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                              {card.title}
                            </h4>
                            <ul className="space-y-2 pt-2 border-t border-slate-100">
                              {card.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pre-Calibrated GRC Service Implementations */}
                {mappedServices.length > 0 && (
                  <div className="container mx-auto px-6 max-w-6xl pt-6 space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                      Pre-Calibrated GRC Services
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
                      {mappedServices.map((serv) => {
                        const getServiceIcon = (id: string) => {
                          if (id.includes("cybersecurity")) return ShieldCheck;
                          if (id.includes("privacy")) return ShieldCheck;
                          if (id.includes("incident")) return Bot;
                          if (id.includes("audit")) return ClipboardCheck;
                          if (id.includes("compliance")) return Shield;
                          if (id.includes("governance")) return Layers;
                          if (id.includes("risk")) return BarChart3;
                          return Settings;
                        };
                        const ServiceIcon = getServiceIcon(serv.id);
                        return (
                          <Link
                            key={serv.id}
                            to={`/services/${serv.id}`}
                            className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-200/85 hover:border-blue-500/25 rounded-3xl group transition-all hover:scale-[1.03] hover:shadow-md"
                          >
                            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                              <ServiceIcon className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-0.5 text-center">
                              <div className="text-[11px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider line-clamp-2 min-h-[2rem]">
                                {serv.title}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sub-Sector Operational Capabilities tabs */}
                <div className="container mx-auto px-6 max-w-6xl pt-8">
                  <div className="max-w-3xl mx-auto text-center space-y-2 pb-6">
                    <h4 className="text-xl font-black text-slate-900 font-heading">
                      Govenics Operational Capabilities for {sector.title}
                    </h4>
                    <p className="text-slate-500 text-xs font-semibold">
                      Comprehensive support services deployed specifically to enforce continuous compliance in {sector.title}.
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left tab buttons (1/3 width) */}
                    <div className="lg:w-1/3 space-y-2.5 text-left">
                      {sectorTabs.map((tab, tabIdx) => {
                        const TabIcon = tab.icon;
                        const isActive = activeTab === tabIdx;
                        return (
                          <button
                            key={tabIdx}
                            onClick={() => setActiveSectorTabs(prev => ({ ...prev, [sector.id]: tabIdx }))}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                              isActive
                                ? "bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/25"
                                : "bg-slate-50 border-slate-200/80 hover:border-blue-500/50 hover:bg-white hover:shadow-md"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isActive ? "bg-white/20" : "bg-blue-500/10"
                            }`}>
                              <TabIcon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-blue-600"}`} />
                            </div>
                            <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wide">
                              {tab.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right content panel (2/3 width) */}
                    <div className="lg:w-2/3 text-left">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 min-h-[380px] flex flex-col justify-between shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="space-y-6 relative z-10">
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                            {sectorTabs[activeTab].title}
                          </h4>
                          <p className="text-slate-655 text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                            {sectorTabs[activeTab].description}
                          </p>

                          <div className="bg-white rounded-2xl p-6 border border-slate-200">
                            <h5 className="font-extrabold text-blue-600 mb-4 text-xs uppercase tracking-widest">
                              {sectorTabs[activeTab].detailsTitle}
                            </h5>
                            <ul className="space-y-3">
                              {sectorTabs[activeTab].details.map((item, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Sub-Sector CTA Section */}
                <div className="container mx-auto px-6 max-w-3xl text-center space-y-4 pt-8">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    Ready to secure your {sector.title} operations against regulatory fines and liabilities?
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold max-w-lg mx-auto">
                    Initiate a custom GRC gap assessment for {sector.title} with Govenics risk partners and design compliant workflows.
                  </p>
                  <div className="pt-2">
                    <Link to="/contact">
                      <button className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 mx-auto text-sm tracking-wide">
                        Schedule {sector.title} GRC Audit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

              </section>
            );
          })}
        </div>

      </div>
    </Layout>
  );
}

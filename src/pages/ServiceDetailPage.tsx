import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { servicesData } from "@/data/services-data";
import { industriesData } from "@/data/industries-data";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { 
  CheckCircle2, ShieldCheck, 
  Shield, Layers, Cpu, Users, ClipboardCheck, 
  Settings, ArrowRightLeft, BookOpen, BarChart3, Clock,
  ArrowRight
} from "lucide-react";

import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroVerify from "@/assets/hero-verify.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";

export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  // Find target service
  const service = servicesData.find((serv) => serv.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (service) {
      document.title = `${service.title} | GRC Advisory Services — GOVENICS`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = `${service.solution} Explore regulatory deliverables, audit frameworks, and industry applicability with GOVENICS GRC.`;
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
    return <Navigate to="/" replace />;
  }

  // Filter industries related to this service
  const relatedIndustries = industriesData.filter((ind) =>
    service.industries.includes(ind.id)
  );

  const getClusterId = (name: string) => {
    return name.toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");
  };

  // Dynamic Metrics generator based on service profile
  const getServiceStats = (id: string) => {
    if (id.includes("cybersecurity") || id.includes("privacy") || id.includes("incident")) {
      return [
        { value: "↓ 92", suffix: "%", label: "Incident Probability Cut", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Statutory Audit Readiness", icon: ClipboardCheck },
        { value: "↓ 70", suffix: "%", label: "Audit Prep Timeline Speedup", icon: Clock },
        { value: "18 - 24", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    } else if (id.includes("compliance") || id.includes("audit") || id.includes("rera") || id.includes("labour")) {
      return [
        { value: "0", prefix: "", label: "Compliance Penalties Exposure", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Inspection Status Pass Rate", icon: ClipboardCheck },
        { value: "↓ 50", suffix: "%", label: "Reporting Overhead Reductions", icon: Clock },
        { value: "12 - 18", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    } else {
      return [
        { value: "↓ 40", suffix: "%", label: "Operational Risks Prevented", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Regulatory Posture Confidence", icon: ClipboardCheck },
        { value: "↓ 60", suffix: "%", label: "Control Gap Mitigations", icon: Clock },
        { value: "15 - 20", suffix: " mo", label: "Average ROI Duration", icon: BarChart3 }
      ];
    }
  };

  // Dynamic Portfolio/Feature generator mapping benefits
  const getServicePortfolio = (benefits: string[]) => {
    return [
      {
        title: "Control Framework Integration",
        icon: Shield,
        features: [
          benefits[0] || "Statutory register controls validated",
          "Custom risk taxonomy aligned",
          "Role-based checkmarks enforced"
        ]
      },
      {
        title: "Automated Verification",
        icon: Cpu,
        features: [
          benefits[1] || "Always-on overwatch enabled",
          "Compliance telemetry logging",
          "Deviation alerts active"
        ]
      },
      {
        title: "Continuous Auditing",
        icon: Layers,
        features: [
          benefits[2] || "Independent control validation",
          "Statutory filing readiness",
          "Vendor SLA tracking"
        ]
      },
      {
        title: "Executive Overseeing",
        icon: BarChart3,
        features: [
          "Dynamic risk index scoring",
          "CAG-level audit logs",
          "Board-level risk reports"
        ]
      }
    ];
  };

  const stats = getServiceStats(service.id);
  const portfolio = getServicePortfolio(service.benefits);

  const slides = [
    {
      badge: "Overview",
      title: "Solutions for",
      highlight: service.title,
      description: service.problem,
      image: heroAiDriven,
    },
    {
      badge: "Methodology",
      title: "Dynamic GRC and",
      highlight: "Continuous Audit Controls",
      description: service.solution,
      image: heroIntegration,
    },
    {
      badge: "Standards Compliance",
      title: "Assurance for",
      highlight: service.standards.slice(0, 2).join(" & ") || "Statutory Norms",
      description: `We align your corporate controls with key standards: ${service.standards.join(", ")}.`,
      image: heroSoc,
    },
    {
      badge: "Expected Value",
      title: "Measurable Quality &",
      highlight: "Risk Reductions",
      description: service.benefits.join(" • "),
      image: heroVerify,
    }
  ];

  // Global Capability Tabs matching Govenics support services
  const tabs = [
    {
      title: "Skilled Staffing Services",
      icon: Users,
      description: `The successful implementation of ${service.title} requires a workforce possessing highly specialized regulatory and technical acumen. By bridging deep domain experience with hands-on execution, our pre-vetted compliance personnel ensure smooth operations under our GRC umbrella.`,
      detailsTitle: "Key Details",
      details: [
        `Safety & Compliance Rigor: Stringent adherence to local and international protocols governing ${service.title} deployments.`,
        `Continuous Skill Upgradation: Mandatory ongoing training programs ensuring our personnel stay ahead of compliance curves.`,
        `Seamless Team Integration: Professionals trained to collaborate cohesively with your internal risk and legal departments.`,
        `Cross-functional Expertise: Personnel capable of bridging physical operations, software systems, and statutory filing workflows.`,
        `Scalable Resourcing: Flexible workforce allocation that dynamically scales up or down based on project auditing demands.`
      ]
    },
    {
      title: "SLA Based Managed Services",
      icon: ClipboardCheck,
      description: `We assume end-to-end operational accountability for your ${service.title} posture. Managed under strict performance SLAs, we continuously monitor controls, manage reporting registers, and prevent compliance deviations.`,
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
      description: `Partner with our senior risk partners and legal advisors to design custom regulatory strategies, build robust internal frameworks, and prepare for upcoming statutory inspections.`,
      detailsTitle: "Key Details",
      details: [
        `Regulatory Gap Assessments: Comprehensive analysis of your current controls against ${service.standards.join(", ") || "statutory guidelines"}.`,
        "Framework Design & Codification: Custom development of policies, SOPs, and delegation of authority (DoA) matrices.",
        "Audit Preparation Guidance: Expert mock audits and training to ensure 100% readiness for regulatory inspectors.",
        "Litigation Exposure Reduction: Advisory focused on minimizing legal liability and operational penalty risks.",
        "Strategic Board Reporting: Synthesizing complex GRC metrics into clear executive dashboards."
      ]
    },
    {
      title: "Systems Integration Services",
      icon: Settings,
      description: `Bridge the gap between your operational database and GRC dashboards. We integrate telemetry pipelines, consent managers, and sensor telemetry directly into a centralized overwatch system.`,
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
      description: `Establish a self-sustaining internal GRC and cybersecurity command center. We design the infrastructure, operate it initially to stabilize performance, and then transfer complete ownership to your internal team.`,
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
      description: `Keep your enterprise updated on every regulatory change, statutory code update, and legal revision. We manage policy registers, training materials, and audit checklists.`,
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

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (tabContentRef.current) {
      tabContentRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <Layout>
      <div className="bg-white pb-24 text-slate-600">
        
        {/* Panel 1: Title & Hero Description Carousel */}
        <GrcSliderHero 
          slides={slides} 
          backLink={{ to: "/", label: "Back to Home" }} 
          categoryLabel="Service Solution"
        />

        {/* Panel 2: Statistics Grid */}
        <section className="py-12 relative overflow-hidden bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 space-y-4 text-left">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                        <StatIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-0.5 text-3xl sm:text-4xl font-black text-slate-900">
                          {stat.prefix && <span className="text-xl text-blue-600">{stat.prefix}</span>}
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
        </section>

        {/* Panel 3: Portfolio Card Grid */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolio.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1 text-left"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 space-y-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                        <CardIcon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>
                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-655 text-slate-600 font-semibold leading-relaxed">
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
        </section>

        {/* Panel 4: Rich Vertical Tabs */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left tab buttons (1/3 width) */}
              <div className="lg:w-1/3 space-y-3 text-left">
                {tabs.map((tab, index) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTab === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleTabChange(index)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/25"
                          : "bg-slate-50 border-slate-200/80 hover:border-blue-500/50 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-white/20" : "bg-blue-500/10"
                      }`}>
                        <TabIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-600"}`} />
                      </div>
                      <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">
                        {tab.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right content panel (2/3 width) */}
              <div ref={tabContentRef} className="lg:w-2/3 text-left">
                <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 min-h-[420px] flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="space-y-6 relative z-10">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                      {tabs[activeTab].title}
                    </h4>
                    <p className="text-slate-655 text-slate-600 text-sm leading-relaxed font-semibold">
                      {tabs[activeTab].description}
                    </p>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <h5 className="font-extrabold text-blue-600 mb-4 text-sm uppercase tracking-widest">
                        {tabs[activeTab].detailsTitle}
                      </h5>
                      <ul className="space-y-3">
                        {tabs[activeTab].details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
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
        </section>

        {/* Panel 5: Pre-Calibrated Sector Implementations */}
        <section className="py-16 bg-slate-50/20 border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                Pre-Calibrated Sector Implementations
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                This compliance service is customized and fully operational for the following target industries.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedIndustries.map((ind) => {
                const IconComp = ind.icon;
                return (
                  <Link
                    key={ind.id}
                    to={`/industries/${getClusterId(ind.cluster)}#${ind.id}`}
                    className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-200/80 hover:border-blue-500/25 rounded-3xl group transition-all hover:scale-[1.03] hover:shadow-md"
                  >
                    <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                        {ind.title}
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        Solutions &rarr;
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Panel 6: CTA Bottom Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Ready to secure your posture against regulatory fines and operational risks?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-lg mx-auto">
              Initiate a tactical gap assessment with Govenics risk partners and design custom controls.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 mx-auto text-sm tracking-wide">
                  Schedule {service.title} Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

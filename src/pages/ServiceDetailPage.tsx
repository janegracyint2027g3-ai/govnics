import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { servicesData } from "@/data/services-data";
import { industriesData } from "@/data/industries-data";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { GrcStatCards } from "@/components/ui/GrcStatCards";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import {
  CheckCircle2, ShieldCheck,
  Shield, Layers, Cpu, Users, ClipboardCheck,
  Settings, ArrowRightLeft, BookOpen, BarChart3, Clock,
  ArrowRight, Sparkles, Target,
  TrendingUp, Star, Zap, FileText
} from "lucide-react";

import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroVerify from "@/assets/hero-verify.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroDrone from "@/assets/hero-drone.jpg";

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const raw = value.replace(/[^0-9.]/g, "");
          const prefix = value.replace(/[0-9.].*/, "");
          const numericPart = parseFloat(raw) || 0;
          const steps = 40;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericPart * eased;
            setDisplay(prefix + (Number.isInteger(numericPart) ? Math.round(current).toString() : current.toFixed(1)));
            if (step >= steps) clearInterval(interval);
          }, 1500 / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Service Visual Banner ─────────────────────────────────────────────────────
function ServiceVisualBanner({
  title, category, standards, image, gradient, pills, tag, tagColor
}: {
  title: string; category: string; standards: string[]; image: string;
  gradient: string; pills: string[]; tag: string; tagColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`container mx-auto px-6 max-w-6xl pt-8 pb-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[380px]">
        {/* Background image with subtle zoom */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

        {/* Animated floating orbs */}
        <div className="absolute top-8 right-16 w-28 h-28 rounded-full bg-white/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-6 right-32 w-16 h-16 rounded-full bg-white/8 blur-xl" style={{ animation: "pulse 3.5s ease-in-out 0.5s infinite" }} />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full border-2 border-white/30" style={{ animation: "spin 10s linear infinite" }} />

        {/* Pulsing shield icon top-right */}
        <div className="absolute top-5 right-5">
          <div
            className="w-14 h-14 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl"
            style={{ animation: "pulse 2.5s ease-in-out infinite" }}
          >
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Floating category chip top-left */}
        <div className="absolute top-5 left-5">
          <span className={`inline-flex items-center px-3 py-1 ${tagColor} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm`}>
            {tag}
          </span>
        </div>

        {/* Main content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{category}</p>
          <h2 className="text-white font-black text-2xl sm:text-4xl font-heading leading-tight drop-shadow-xl max-w-xl">
            {title}
          </h2>

          {/* Standards pills — animated in on scroll */}
          <div className="flex flex-wrap gap-2 mt-4">
            {standards.slice(0, 5).map((std, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold rounded-full"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible ? `fadeInUp 0.5s ease forwards` : "none",
                  animationDelay: `${i * 0.1 + 0.3}s`
                }}
              >
                {std}
              </span>
            ))}
          </div>

          {/* Extra pills from the passed array */}
          <div className="flex flex-wrap gap-2 mt-2">
            {pills.map((pill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] font-semibold rounded-full"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible ? `fadeInUp 0.5s ease forwards` : "none",
                  animationDelay: `${(i + standards.length) * 0.1 + 0.3}s`
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Top floating dots */}
        <div className="absolute top-4 left-1/2 flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-25"
              style={{ animation: `pulse ${1.2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Benefits Slider ───────────────────────────────────────────────────────────
function BenefitsSlider({ benefits, problem }: { benefits: string[]; problem: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % benefits.length), 3500);
    return () => clearInterval(t);
  }, [benefits.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-950 border-t border-blue-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Problem statement */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Why This Matters
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
              The Challenge We Solve
            </h3>
            <p className="text-blue-200/80 text-sm font-semibold leading-relaxed max-w-lg">
              {problem}
            </p>
            {/* Key outcome pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Penalty-Free Operations", "Audit-Ready Always", "Board-Level Visibility"].map((pill, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-500/15 border border-blue-500/30 text-blue-200 text-[10px] font-bold rounded-full">
                  ✓ {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Benefits auto-slider */}
          <div className="space-y-4">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Key Benefits</p>
            <div className="relative min-h-[120px]">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-start gap-4 transition-all duration-600 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-white font-semibold text-base leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 pt-2">
              {benefits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "bg-blue-400 w-6" : "bg-blue-600/40 w-2"}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Process Steps ─────────────────────────────────────────────────────────────
function ProcessSteps({ serviceTitle }: { serviceTitle: string }) {
  const steps = [
    { step: "01", title: "Discovery Call", desc: `A 30-minute assessment of your current ${serviceTitle} posture and gaps.`, icon: FileText },
    { step: "02", title: "Gap Analysis", desc: "We benchmark your controls against relevant regulatory standards.", icon: Target },
    { step: "03", title: "Framework Design", desc: "Custom compliance roadmap with SOPs, registers, and automation.", icon: Settings },
    { step: "04", title: "Deploy & Monitor", desc: "Go-live with continuous SLA-backed overwatch and reporting.", icon: Sparkles },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/40 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Engagement Journey
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">How We Deliver {serviceTitle}</h3>
          <p className="text-sm text-slate-500 font-semibold mt-3 max-w-xl mx-auto leading-relaxed">
            Our structured 4-step engagement ensures clarity, speed, and measurable outcomes.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-violet-200 z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center space-y-4"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-200 shadow-lg flex items-center justify-center group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <s.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow">
                    {s.step}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{s.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed max-w-[180px] mx-auto">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Quick Stats Bar ───────────────────────────────────────────────────────────
function QuickStatsBar({ serviceId }: { serviceId: string }) {
  const isCyber = serviceId.includes("cybersecurity") || serviceId.includes("privacy") || serviceId.includes("incident");
  const isCompliance = serviceId.includes("compliance") || serviceId.includes("audit") || serviceId.includes("labour");

  const stats = isCyber
    ? [
        { value: "↓92", suffix: "%", label: "Incident Probability Cut", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Audit Readiness", icon: ClipboardCheck },
        { value: "↓70", suffix: "%", label: "Audit Prep Speed-Up", icon: Clock },
        { value: "24", suffix: " mo", label: "Average ROI Period", icon: BarChart3 },
        { value: "50", suffix: "+", label: "Enterprise Clients", icon: Users },
        { value: "99", suffix: "%", label: "SLA Compliance", icon: Star },
      ]
    : isCompliance
    ? [
        { value: "0", suffix: "", label: "Penalty Exposure", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Inspection Pass Rate", icon: ClipboardCheck },
        { value: "↓50", suffix: "%", label: "Reporting Overhead", icon: Clock },
        { value: "18", suffix: " mo", label: "Average ROI Period", icon: BarChart3 },
        { value: "200", suffix: "+", label: "Compliant Enterprises", icon: TrendingUp },
        { value: "48", suffix: "hr", label: "Onboarding Time", icon: Zap },
      ]
    : [
        { value: "↓40", suffix: "%", label: "Operational Risks Prevented", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Regulatory Confidence", icon: ClipboardCheck },
        { value: "↓60", suffix: "%", label: "Control Gap Mitigations", icon: Clock },
        { value: "20", suffix: " mo", label: "Average ROI Duration", icon: BarChart3 },
        { value: "150", suffix: "+", label: "Frameworks Deployed", icon: Layers },
        { value: "72", suffix: "hr", label: "Rapid Onboarding", icon: Zap },
      ];

  return (
    <div className="container mx-auto px-6 max-w-6xl -mt-6 relative z-20 mb-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-x divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-2">
              <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-blue-50 flex items-center justify-center">
                <s.icon style={{ width: 16, height: 16 }} className="text-blue-600" />
              </div>
              <div className="text-xl font-black text-slate-900 leading-none">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [bannerSlide, setBannerSlide] = useState(0);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  const service = servicesData.find((serv) => serv.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (service) {
      document.title = `${service.title} | GRC Advisory Services — GOVENICS`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = `${service.solution} Explore regulatory deliverables, audit frameworks, and industry applicability with GOVENICS GRC.`;
      if (metaDesc) metaDesc.setAttribute("content", descContent);
      else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = descContent;
        document.head.appendChild(meta);
      }
    }
  }, [serviceId, service]);

  if (!service) return <Navigate to="/" replace />;

  const relatedIndustries = industriesData.filter((ind) => service.industries.includes(ind.id));

  const getClusterId = (name: string) =>
    name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  // Service-to-image & theme mapping
  const getServiceVisual = () => {
    const id = service.id;
    if (id.includes("cybersecurity") || id.includes("incident"))
      return { image: heroSoc, gradient: "from-slate-900/85 via-blue-900/60 to-transparent", tag: "Cybersecurity GRC", tagColor: "bg-blue-600", pills: ["ISMS", "Penetration Testing", "SOC 2"] };
    if (id.includes("privacy") || id.includes("dpdp"))
      return { image: heroAiDriven, gradient: "from-violet-900/85 via-violet-800/60 to-transparent", tag: "Data Privacy & DPDP", tagColor: "bg-violet-600", pills: ["Consent Manager", "Data Mapping", "Breach Response"] };
    if (id.includes("compliance") || id.includes("regulatory"))
      return { image: heroVerify, gradient: "from-indigo-900/85 via-indigo-800/60 to-transparent", tag: "Regulatory Compliance", tagColor: "bg-indigo-600", pills: ["Statutory Registers", "Filing Automation", "Audit Readiness"] };
    if (id.includes("risk") || id.includes("vendor"))
      return { image: heroCommand, gradient: "from-slate-900/85 via-slate-800/60 to-transparent", tag: "Risk Management", tagColor: "bg-slate-700", pills: ["RCSA Dashboard", "KRI Monitoring", "Contingency SOPs"] };
    if (id.includes("governance") || id.includes("audit"))
      return { image: heroIntegration, gradient: "from-emerald-900/85 via-emerald-800/60 to-transparent", tag: "Governance & Audit", tagColor: "bg-emerald-700", pills: ["DoA Matrix", "Policy Register", "Control Testing"] };
    if (id.includes("esg") || id.includes("sustainability") || id.includes("carbon"))
      return { image: heroDrone, gradient: "from-teal-900/85 via-teal-800/60 to-transparent", tag: "ESG & Sustainability", tagColor: "bg-teal-600", pills: ["BRSR Reporting", "Carbon Accounting", "ESG Ratings"] };
    return {
      image: heroVerify, gradient: "from-blue-900/85 via-blue-800/60 to-transparent", tag: "GRC Services", tagColor: "bg-blue-600", pills: ["Compliance", "Risk", "Governance"]
    };
  };

  const visual = getServiceVisual();

  const getServiceStats = (id: string) => {
    if (id.includes("cybersecurity") || id.includes("privacy") || id.includes("incident"))
      return [
        { value: "↓ 92", suffix: "%", label: "Incident Probability Cut", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Statutory Audit Readiness", icon: ClipboardCheck },
        { value: "↓ 70", suffix: "%", label: "Audit Prep Timeline Speedup", icon: Clock },
        { value: "18 - 24", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    else if (id.includes("compliance") || id.includes("audit") || id.includes("rera") || id.includes("labour"))
      return [
        { value: "0", label: "Compliance Penalties Exposure", icon: ShieldCheck },
        { value: "100", suffix: "%", label: "Inspection Status Pass Rate", icon: ClipboardCheck },
        { value: "↓ 50", suffix: "%", label: "Reporting Overhead Reductions", icon: Clock },
        { value: "12 - 18", suffix: " mo", label: "Average ROI Period", icon: BarChart3 }
      ];
    return [
      { value: "↓ 40", suffix: "%", label: "Operational Risks Prevented", icon: ShieldCheck },
      { value: "100", suffix: "%", label: "Regulatory Posture Confidence", icon: ClipboardCheck },
      { value: "↓ 60", suffix: "%", label: "Control Gap Mitigations", icon: Clock },
      { value: "15 - 20", suffix: " mo", label: "Average ROI Duration", icon: BarChart3 }
    ];
  };

  const getServicePortfolio = (benefits: string[]) => [
    {
      title: "Control Framework Integration",
      icon: Shield,
      features: [benefits[0] || "Statutory register controls validated", "Custom risk taxonomy aligned", "Role-based checkmarks enforced"]
    },
    {
      title: "Automated Verification",
      icon: Cpu,
      features: [benefits[1] || "Always-on overwatch enabled", "Compliance telemetry logging", "Deviation alerts active"]
    },
    {
      title: "Continuous Auditing",
      icon: Layers,
      features: [benefits[2] || "Independent control validation", "Statutory filing readiness", "Vendor SLA tracking"]
    },
    {
      title: "Executive Overseeing",
      icon: BarChart3,
      features: ["Dynamic risk index scoring", "CAG-level audit logs", "Board-level risk reports"]
    }
  ];

  const stats = getServiceStats(service.id);
  const portfolio = getServicePortfolio(service.benefits);

  // Banner image slides
  const bannerImages = [visual.image, heroCommand, heroSoc, heroAiDriven];
  const bannerImagesFiltered = [...new Set(bannerImages)];

  const slides = [
    {
      badge: "Overview",
      title: "Solutions for",
      highlight: service.title,
      description: service.problem,
      image: visual.image,
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

        {/* ── Hero Slider ──────────────────────────────────────────── */}
        <GrcSliderHero
          slides={slides}
          backLink={{ to: "/", label: "Back to Home" }}
          categoryLabel="Service Solution"
        />

        {/* ── Quick Stats Bar (animated counters) ─────────────────── */}
        <QuickStatsBar serviceId={service.id} />

        {/* ── Core Stat Cards (GrcStatCards) ──────────────────────── */}
        <GrcStatCards stats={stats} />

        {/* ── Animated Service Visual Banner ──────────────────────── */}
        <ServiceVisualBanner
          title={service.title}
          category={service.category}
          standards={service.standards}
          image={visual.image}
          gradient={visual.gradient}
          pills={visual.pills}
          tag={visual.tag}
          tagColor={visual.tagColor}
        />

        {/* ── Image Mini-Slider strip ──────────────────────────────── */}
        <div className="container mx-auto px-6 max-w-6xl pt-4 pb-2">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {bannerImagesFiltered.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setBannerSlide(i)}
                className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${bannerSlide === i ? "border-blue-500 shadow-md" : "border-transparent opacity-60 hover:opacity-90"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Benefits Dark Slider ─────────────────────────────────── */}
        <BenefitsSlider benefits={service.benefits} problem={service.problem} />

        {/* ── 4-Step Process Timeline ──────────────────────────────── */}
        <ProcessSteps serviceTitle={service.title} />

        {/* ── Portfolio Card Grid ──────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl space-y-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                Service Pillars
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-heading">Our {service.title} Framework</h3>
            </div>
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
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">{card.title}</h3>
                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-semibold leading-relaxed">
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

        {/* ── Standards & Frameworks Row ───────────────────────────── */}
        <section className="py-10 bg-slate-50/60 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">
              Applicable Standards & Regulatory Frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {service.standards.map((std, i) => (
                <span key={i} className="group inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-default shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-600" />
                  {std}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Rich Vertical Tabs ───────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                Delivery Models
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-heading">How We Operate {service.title}</h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left tab buttons */}
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
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-white/20" : "bg-blue-500/10"}`}>
                        <TabIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-600"}`} />
                      </div>
                      <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">{tab.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right content panel */}
              <div ref={tabContentRef} className="lg:w-2/3 text-left">
                <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 min-h-[420px] flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                  <div className="space-y-6 relative z-10">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">{tabs[activeTab].title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">{tabs[activeTab].description}</p>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <h5 className="font-extrabold text-blue-600 mb-4 text-sm uppercase tracking-widest">{tabs[activeTab].detailsTitle}</h5>
                      <ul className="space-y-3">
                        {tabs[activeTab].details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
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
        </section>

        {/* ── Pre-Calibrated Sector Implementations ───────────────── */}
        {relatedIndustries.length > 0 && (
          <section className="py-16 bg-slate-50/20 border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-6xl text-center space-y-8">
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Industry Calibrations
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">Pre-Calibrated Sector Implementations</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  This compliance service is customized and fully operational for the following target industries.
                </p>
              </div>
              {relatedIndustries.length > 3 ? (
                <GrcCarousel
                  items={relatedIndustries.map((ind) => {
                    const IconComp = ind.icon;
                    return (
                      <Link
                        key={ind.id}
                        to={`/industries/${getClusterId(ind.cluster)}#${ind.id}`}
                        className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-200/80 hover:border-blue-500/25 rounded-3xl group transition-all hover:scale-[1.03] hover:shadow-md text-center h-full justify-center select-none"
                      >
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{ind.title}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Solutions &rarr;</div>
                        </div>
                      </Link>
                    );
                  })}
                />
              ) : (
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
                          <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{ind.title}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Solutions &rarr;</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Dark CTA Section ─────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 border-t border-blue-900/30">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Start Today
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading leading-tight">
              Ready to secure your posture against regulatory fines?
            </h3>
            <p className="text-sm text-blue-200/80 font-semibold max-w-lg mx-auto leading-relaxed">
              Initiate a tactical gap assessment for <strong className="text-white">{service.title}</strong> with Govenics risk partners and design custom controls that protect your enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link to="/contact">
                <button className="group inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-700/30 hover:scale-[1.03] transition-all text-sm tracking-wide">
                  Schedule {service.title} Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/partners">
                <button className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm">
                  View Partner Program
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

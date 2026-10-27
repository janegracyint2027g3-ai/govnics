import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { servicesData } from "@/data/services-data";
import { industriesData } from "@/data/industries-data";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import {
  CheckCircle2, ShieldCheck, Shield, Layers, Cpu, ClipboardCheck,
  Settings, BookOpen, BarChart3, Clock, ArrowRight, Target,
  FileText, AlertTriangle, Eye, Scale, RefreshCw, Send, Check, ChevronDown,
  Building2, Phone, Mail, User, HelpCircle, Lock
} from "lucide-react";

import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroVerify from "@/assets/hero-verify.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroDrone from "@/assets/hero-drone.jpg";

export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: ""
  });

  const service = servicesData.find((serv) => serv.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (service) {
      document.title = `${service.title} | Enterprise GRC Solutions — GOVENICS`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = `${service.solution} Explore enterprise governance challenges, core capabilities, 4-stage engagement model, and regulatory compliance frameworks with GOVENICS.`;
      if (metaDesc) metaDesc.setAttribute("content", descContent);
      else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = descContent;
        document.head.appendChild(meta);
      }
      setFormData(prev => ({ ...prev, serviceInterest: service.title }));
    }
  }, [serviceId, service]);

  if (!service) return <Navigate to="/" replace />;

  const relatedIndustries = industriesData.filter((ind) => service.industries.includes(ind.id));
  const relatedServices = servicesData.filter(s => s.id !== service.id && (s.category === service.category || s.industries.some(i => service.industries.includes(i)))).slice(0, 3);

  const getClusterId = (name: string) =>
    name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

  // Visual Theme Mapping
  const getServiceVisual = () => {
    const id = service.id;
    if (id.includes("cybersecurity") || id.includes("incident"))
      return { image: heroSoc, gradient: "from-slate-900/85 via-blue-900/60 to-transparent", tag: "Cybersecurity GRC", tagColor: "bg-blue-600", badge: "Digital Defense" };
    if (id.includes("privacy") || id.includes("dpdp"))
      return { image: heroAiDriven, gradient: "from-violet-900/85 via-violet-800/60 to-transparent", tag: "Data Privacy & DPDP", tagColor: "bg-violet-600", badge: "Data Protection" };
    if (id.includes("compliance") || id.includes("regulatory") || id.includes("labour"))
      return { image: heroVerify, gradient: "from-indigo-900/85 via-indigo-800/60 to-transparent", tag: "Regulatory Compliance", tagColor: "bg-indigo-600", badge: "Statutory Defense" };
    if (id.includes("risk") || id.includes("vendor"))
      return { image: heroCommand, gradient: "from-slate-900/85 via-slate-800/60 to-transparent", tag: "Risk Management", tagColor: "bg-slate-700", badge: "Enterprise Risk" };
    if (id.includes("governance") || id.includes("audit"))
      return { image: heroIntegration, gradient: "from-emerald-900/85 via-emerald-800/60 to-transparent", tag: "Governance & Audit", tagColor: "bg-emerald-700", badge: "Board Oversight" };
    if (id.includes("esg") || id.includes("sustainability") || id.includes("environmental"))
      return { image: heroDrone, gradient: "from-teal-900/85 via-teal-800/60 to-transparent", tag: "ESG & Sustainability", tagColor: "bg-teal-600", badge: "Sustainability Advisory" };
    return { image: heroVerify, gradient: "from-blue-900/85 via-blue-800/60 to-transparent", tag: "GRC Services", tagColor: "bg-blue-600", badge: "Enterprise GRC" };
  };

  const visual = getServiceVisual();

  // SECTION 1: HERO SLIDES
  const heroSlides = [
    {
      badge: visual.badge,
      title: "Eliminate Blind Spots in",
      highlight: service.title,
      description: service.problem,
      image: visual.image,
      icp: "C-Suite, Legal Heads & Compliance Directors",
      outcome: "Full audit readiness and continuous control assurance",
      cta: "Schedule Advisory Call"
    },
    {
      badge: "Targeted Resolution",
      title: "Defensible Governance Aligned to",
      highlight: service.standards[0] || "Statutory Codes",
      description: service.solution,
      image: heroIntegration,
      icp: "Audit Committees & Operations Executives",
      outcome: "Zero penalty exposure across central and state regulations",
      cta: "Request Consultation"
    },
    {
      badge: "Operational Rigor",
      title: "From Static Spreadsheets to",
      highlight: "Living Compliance Controls",
      description: "Replace reactive fire-drills with predictable, continuous telemetry and evidence-backed registers that withstand regulatory scrutiny.",
      image: heroCommand,
      icp: "Chief Risk Officers & Department Leads",
      outcome: "Streamlined stakeholder workflows and transparent accountability",
      cta: "Explore Engagement Model"
    }
  ];

  // SECTION 2: BUSINESS CHALLENGES
  const challenges = [
    {
      title: "Dynamic Regulatory Velocity",
      desc: "Frequent gazette amendments and evolving regulator circulars outpace static internal policies, creating compliance lags and enforcement vulnerabilities.",
      icon: RefreshCw
    },
    {
      title: "Fragmented Operational Silos",
      desc: "Decentralized teams operate on isolated spreadsheets and email threads, leaving senior leadership blind to ground-level compliance slippages.",
      icon: Layers
    },
    {
      title: "Audit Deficits & Missing Evidence",
      desc: "Scrambling to assemble documentary evidence during surprise inspections triggers operational disruption and exposes firms to adverse findings.",
      icon: Eye
    },
    {
      title: "Subcontractor & Vendor Exposure",
      desc: "Third-party vendors and supply chain partners frequently fail statutory standards, transferring severe co-employment and legal liabilities to principal employers.",
      icon: AlertTriangle
    },
    {
      title: "Manual Overhead & Inefficiency",
      desc: "Valuable legal and compliance talent is bogged down by redundant data entry and paperwork rather than executing strategic risk mitigation.",
      icon: Clock
    },
    {
      title: "Board & Fiduciary Liability",
      desc: "Directors face increased scrutiny and personal liability under corporate governance statutes without structured Delegation of Authority (DoA) validation.",
      icon: Scale
    }
  ];

  // SECTION 3: SERVICE CAPABILITIES
  const capabilities = [
    {
      title: "Statutory Architecture & Register Setup",
      desc: "Comprehensive cataloging and codification of all central, state, and sector-specific legal codes directly relevant to your operating facilities and corporate footprint.",
      value: "Eliminates legal ambiguity and establishes crystal-clear regulatory ownership."
    },
    {
      title: "Active Gap Assessment & Risk Prioritization",
      desc: "Structured diagnostic audits comparing existing physical and operational checkmarks against mandated statutory thresholds to identify latent compliance defects.",
      value: "Proactively pinpoints vulnerabilities before government inspectors or external auditors discover them."
    },
    {
      title: "Standard Operating Procedure (SOP) Engineering",
      desc: "Drafting bulletproof, repeatable operational SOPs, escalation workflows, and automated filing checklists integrated with management systems.",
      value: "Transitions compliance from individual memory to institutional, repeatable discipline."
    },
    {
      title: "Continuous Overwatch & Regulatory Intelligence",
      desc: "Ongoing monitoring of gazette notifications and circular amendments with zero-lag advisory updates to calibrate operational controls.",
      value: "Guarantees that your enterprise posture never drifts out of compliance when laws evolve."
    },
    {
      title: "Vendor & Supply Chain Compliance Auditing",
      desc: "Rigorous third-party vendor due diligence, monthly wage verification, statutory challan validation, and compliance scoring.",
      value: "Shields your brand and balance sheet from downstream supplier liabilities and co-employment lawsuits."
    },
    {
      title: "Board Briefings & Evidentiary Reporting",
      desc: "Executive-ready governance dossiers, Key Risk Indicator (KRI) dashboards, and tamper-evident audit packages tailored for board committee reviews.",
      value: "Fulfills fiduciary due diligence duties and enhances shareholder and investor confidence."
    }
  ];

  // SECTION 4: HOW IT WORKS (4 STAGES)
  const processStages = [
    {
      step: "01",
      name: "Discover",
      objective: "Map corporate scope, operational footprint, and existing governance practices.",
      activities: [
        "Catalog operational assets, branches, and multi-state operational hubs.",
        "Review current policies, previous audit findings, and statutory registers.",
        "Align with designated departmental stakeholders to map process boundaries."
      ],
      deliverable: "Comprehensive Scope Charter & Responsibility Matrix",
      icon: SearchIconComponent
    },
    {
      step: "02",
      name: "Assess",
      objective: "Evaluate existing controls against mandated regulatory frameworks to isolate gaps.",
      activities: [
        "Conduct thorough gap analysis against governing central and state statutes.",
        "Evaluate documentary evidence, register veracity, and inspection logs.",
        "Assign risk-weightings to identified deficiencies based on potential enforcement severity."
      ],
      deliverable: "Prioritized Gap Diagnostic Report & Risk Heatmap",
      icon: Target
    },
    {
      step: "03",
      name: "Implement / Remediate",
      objective: "Engineer calibrated controls, draft standard workflows, and resolve identified gaps.",
      activities: [
        "Formulate customized Standard Operating Procedures (SOPs) and control checklists.",
        "Establish standardized statutory registers and automated reporting pipelines.",
        "Conduct operational calibration sessions for internal teams and vendors."
      ],
      deliverable: "Operationalized Governance Framework & Remediated Registers",
      icon: Settings
    },
    {
      step: "04",
      name: "Monitor / Improve",
      objective: "Institutionalize perpetual audit readiness and regulatory overwatch.",
      activities: [
        "Implement continuous compliance telemetry and periodic checkmark validations.",
        "Track statutory gazette updates and update registers in lockstep.",
        "Conduct quarterly simulated inspection drills and maintain evidence archives."
      ],
      deliverable: "Quarterly Executive Governance Pack & Audit Defense Binder",
      icon: ShieldCheck
    }
  ];

  // SECTION 5: BENEFITS & OUTCOMES
  const outcomes = [
    {
      title: "Improved Visibility",
      desc: "Consolidate fragmented departmental information into centralized, real-time oversight across all operating plants, branches, and corporate entities.",
      icon: Eye,
      highlight: "Enterprise-wide transparency"
    },
    {
      title: "Reduced Risk",
      desc: "Systematically uncover latent operational vulnerabilities and resolve them prior to regulatory scrutiny, eliminating exposure to punitive actions.",
      icon: Shield,
      highlight: "Proactive exposure mitigation"
    },
    {
      title: "Better Compliance",
      desc: "Structured adherence to complex multi-jurisdictional statutes, factory acts, and sector guidelines with zero ambiguity in task execution.",
      icon: CheckCircle2,
      highlight: "Rigorous statutory precision"
    },
    {
      title: "Audit Readiness",
      desc: "Perpetual evidentiary archives and validated registers that allow your organization to confidently clear unannounced audits with zero fire-drills.",
      icon: ClipboardCheck,
      highlight: "Zero-notice inspection defense"
    },
    {
      title: "Operational Efficiency",
      desc: "Replace chaotic manual paperwork and ad-hoc filing stress with disciplined, automated routines that liberate leadership time for core business goals.",
      icon: Cpu,
      highlight: "Streamlined administrative overhead"
    },
    {
      title: "Executive Accountability",
      desc: "Clear Delegation of Authority (DoA) matrices, documented committee governance, and tamper-proof decision records safeguarding director liability.",
      icon: Scale,
      highlight: "Verifiable fiduciary governance"
    }
  ];

  // SECTION 6: TRUST & GOVERNANCE PILLARS
  const trustPillars = [
    {
      title: "Recognized Standards Alignment",
      desc: `Every control and register is mapped directly against statutory legal frameworks (${service.standards.join(", ")}).`,
      icon: ShieldCheck
    },
    {
      title: "Standardized Methodology",
      desc: "Our delivery follows rigorous ISO 31000 risk management principles and COSO internal control frameworks, guaranteeing repeatable and legally robust outcomes.",
      icon: BookOpen
    },
    {
      title: "Peer-Reviewed Deliverables",
      desc: "All gap reports, SOPs, and governance charters undergo internal technical and legal review prior to final handover.",
      icon: FileText
    },
    {
      title: "Executive & Board Reporting",
      desc: "Actionable, jargon-free executive briefs and board-level risk registers that communicate clearly with senior leaders.",
      icon: BarChart3
    },
    {
      title: "Tamper-Evident Evidence Management",
      desc: "Strict version control, chronological logs, and authenticated digital timestamps ensure audit archives remain unimpeachable.",
      icon: Lock
    }
  ];

  // SECTION 7: FAQS
  const faqs = [
    {
      q: `What is the typical scope of our ${service.title} engagement?`,
      a: `Our scope encompasses all designated operating entities, facilities, corporate divisions, and third-party vendor interfaces within your enterprise. We assess statutory obligations, configure operational registers, design standard operating procedures, and establish ongoing audit readiness tailored to your specific regulatory jurisdiction.`
    },
    {
      q: "What is the expected engagement duration from kickoff to operational readiness?",
      a: "The initial discovery and diagnostic gap assessment typically requires 2 to 4 weeks. Following assessment sign-off, control remediation, register setup, and workflow calibration are executed over 4 to 8 weeks depending on the size and geographic dispersion of your organization."
    },
    {
      q: "What concrete deliverables will our enterprise receive?",
      a: "Deliverables include a Comprehensive Scope Matrix, Prioritized Gap Diagnostic Report, customized Standard Operating Procedures (SOPs), statutory registers formatted to regulatory requirements, an Executive Board Brief, and an Inspection Defense Dossier."
    },
    {
      q: "What internal resources and time commitments are required from our team?",
      a: "We assign a dedicated engagement director to minimize operational friction. Your team primarily provides access to existing compliance documents, process walkthroughs with department leads (typically 2-3 hours per key stakeholder), and periodic checkpoint reviews."
    },
    {
      q: "How does Govnics support our team during live audits or regulatory inquiries?",
      a: "Our advisory team provides dedicated overwatch. In the event of an unannounced regulatory inspection or notice, we assist with immediate documentary verification, evidence retrieval, and structured response drafting aligned with statutory requirements."
    },
    {
      q: "How are compliance findings and risk postures communicated to senior leadership?",
      a: "Leadership receives concise bi-weekly operational summaries highlighting remediated controls and open actions, supplemented by quarterly executive dossiers designed for Board Audit & Risk Committees."
    },
    {
      q: "Does this service accommodate multi-state Indian operations and sector-specific nuances?",
      a: "Yes. Our frameworks are explicitly calibrated to address state-specific rules across all 28 states and Union Territories in India, as well as sector-specific directives from regulatory bodies."
    },
    {
      q: "How are legislative amendments, gazette notifications, and case law updates handled?",
      a: "Our regulatory tracking desk continuously monitors official gazettes and statutory circulars. When amendments occur, we issue immediate advisory alerts and update your compliance calendars and registers without administrative lag."
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Consultation_Requests",
            table: "Consultation_Requests",
            "Full Name": formData.name,
            "Email": formData.email,
            "Phone": formData.phone,
            "Company": formData.company,
            "Service Interest": formData.serviceInterest || service?.title || "Service Detail Inquiry",
            "Source Page": window.location.pathname,
            "Lead Source": "Service Detail Page — Executive Briefing Form",
            "Booking Status": "New Inquiry",
            "Timestamp": new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Service detail form submission error:", err);
      }
    }

    setFormSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen text-slate-700 selection:bg-blue-600 selection:text-white">

        {/* ── SECTION 1: HERO ────────────────────────────────────────── */}
        <GrcSliderHero
          slides={heroSlides}
          backLink={{ to: "/grc", label: "Back to What We Offer" }}
          categoryLabel="Enterprise GRC"
        />

        {/* Standards Banner Strip */}
        <div className="bg-slate-900 border-b border-slate-800 py-3.5 px-6">
          <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-extrabold text-blue-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Governing Frameworks:
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              {service.standards.map((std, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700/80 rounded-full text-slate-300 font-semibold text-[11px]">
                  {std}
                </span>
              ))}
            </div>
            <a
              href="#consultation-form"
              className="text-blue-400 hover:text-white font-bold inline-flex items-center gap-1 text-[11px] transition-colors"
            >
              Consult with Partners <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── SECTION 2: BUSINESS CHALLENGES ──────────────────────────── */}
        <section id="challenges" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Enterprise Pain Points
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Why Organizations Struggle with {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Navigating complex regulatory environments without structured oversight inevitably leads to systemic vulnerabilities, operational drag, and material legal exposure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((c, idx) => {
                const IconComp = c.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white border border-slate-200/90 hover:border-blue-500/50 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between text-left space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Vulnerability Vector</span>
                      <span className="text-red-600 font-extrabold">Active Risk</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: SERVICE CAPABILITIES ─────────────────────────── */}
        <section id="capabilities" className="py-20 bg-slate-50/70 border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Core Capabilities
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Solution Architecture & Advisory Scope
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Comprehensive, modular capabilities engineered to systematically insulate your enterprise against compliance gaps and operational non-conformance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 hover:border-blue-500/40 rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-5"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100/60 px-2.5 py-1 rounded-full inline-block">
                      Capability {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="p-3.5 bg-blue-500/5 border border-blue-500/15 rounded-2xl">
                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 block mb-1">
                      Business Value:
                    </span>
                    <span className="text-xs font-bold text-slate-800 leading-snug block">
                      {cap.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: HOW IT WORKS (ENGAGEMENT PROCESS) ────────────── */}
        <section id="methodology" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Structured Engagement
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Our 4-Stage Engagement Methodology
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                A disciplined, consultative journey that transitions your organization from initial diagnostic assessment to perpetual governance discipline.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left space-y-5 hover:border-blue-400 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                        {stage.step}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Stage {idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                        {stage.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-1">
                        {stage.objective}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                        Core Activities:
                      </span>
                      <ul className="space-y-2">
                        {stage.activities.map((act, i) => (
                          <li key={i} className="text-xs text-slate-600 font-semibold flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 block">
                      Target Deliverable:
                    </span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block leading-tight">
                      {stage.deliverable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: BENEFITS & OUTCOMES ──────────────────────────── */}
        <section id="outcomes" className="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border-b border-blue-900/30">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Value Realization
              </span>
              <h2 className="text-3xl font-black text-white font-heading leading-tight">
                Measurable Business Outcomes
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/80 font-semibold leading-relaxed">
                Concrete enterprise benefits realized through disciplined control implementation, workflow automation, and structured governance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((out, idx) => {
                const IconComp = out.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-800/60 border border-slate-700/80 hover:border-blue-400/50 rounded-3xl p-7 flex flex-col justify-between text-left space-y-4 hover:bg-slate-800/90 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-white text-base leading-snug">
                        {out.title}
                      </h3>
                      <p className="text-xs text-blue-100/70 font-semibold leading-relaxed">
                        {out.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-blue-300 text-xs font-bold">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{out.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: TRUST & GOVERNANCE ───────────────────────────── */}
        <section id="governance" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Institutional Rigor
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Trust, Compliance & Evidence Integrity
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                How Govnics ensures regulatory defensibility, peer-reviewed methodologies, and airtight evidence governance for external auditor and board review.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustPillars.map((tp, idx) => {
                const IconComp = tp.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all text-left space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{tp.title}</h3>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">{tp.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Applicable Standards Pills Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Statutory Alignment</span>
                <h4 className="text-lg font-black font-heading">Recognized Regulatory Baselines</h4>
                <p className="text-xs text-slate-400 font-semibold">Controls pre-configured to satisfy the following verified standards:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.standards.map((std, i) => (
                  <span key={i} className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold text-blue-300">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: FAQS ─────────────────────────────────────────── */}
        <section id="faqs" className="py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-4xl space-y-12">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Clear Answers
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Key questions enterprise leaders ask about scope, timelines, deliverables, and operational accountability.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 8: RELATED SERVICES ─────────────────────────────── */}
        {relatedServices.length > 0 && (
          <section id="related-services" className="py-20 bg-white border-b border-slate-200/80">
            <div className="container mx-auto px-6 max-w-6xl space-y-12">
              <div className="max-w-2xl mx-auto text-center space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Portfolio Synergy
                </span>
                <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                  Complementary GRC Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Naturally connecting services from the Govnics practice that strengthen your organization's overarching governance perimeter.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedServices.map((rs) => (
                  <div
                    key={rs.id}
                    className="group bg-white border border-slate-200/90 hover:border-blue-500/50 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left space-y-5"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block">
                        {rs.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {rs.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed line-clamp-3">
                        {rs.problem}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {rs.standards[0] || "Statutory"}
                      </span>
                      <Link
                        to={`/services/${rs.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        Explore Service <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Target Industry Applications */}
              {relatedIndustries.length > 0 && (
                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Sector Solutions</span>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Pre-Calibrated Sector Deployments</h3>
                    <p className="text-xs text-slate-500 font-semibold">This service is customized for statutory nuances across the following industries:</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {relatedIndustries.map((ind) => {
                      const IconComp = ind.icon;
                      return (
                        <Link
                          key={ind.id}
                          to={`/industries/${getClusterId(ind.cluster)}#${ind.id}`}
                          className="flex flex-col items-center gap-2 p-3.5 bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:bg-white rounded-2xl group transition-all text-center shadow-sm"
                        >
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1">{ind.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── SECTION 9: STRATEGY SESSION CTA ─────────────────────────────── */}
        <section id="consultation-form" className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Column: Value Proposition */}
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Direct Partner Access
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-heading leading-tight">
                  Ready to Fortify Your {service.title}?
                </h2>
                <p className="text-sm text-blue-200/80 font-semibold leading-relaxed">
                  Book a structured Strategy Session with our senior advisory partners. We evaluate your operational baseline, review statutory exposure, and outline an actionable compliance roadmap.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>NDA-protected preliminary discovery session</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Cross-referenced against all applicable central & state statutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Clear engagement milestones with fixed delivery timelines</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Industry-specific compliance scoping tailored to your sector</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>contact@govenics.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>+91 98840 50000</span>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white font-heading">Book a Strategy Session</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Our structured intake form captures your industry, company size, and functional areas — so your advisory call is prepared and focused from the first minute.
                  </p>
                </div>
                <div className="space-y-3 text-left">
                  {[
                    "Select your industry & company size",
                    "Choose GRC, ESG, Finance or Labour focus",
                    "Receive email confirmation + video call link",
                    "Connect with a senior advisory partner"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 text-[10px] font-black shrink-0">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02]"
                >
                  <ArrowRight className="w-4 h-4" />
                  Book Strategy Session Now
                </Link>
                <p className="text-[10px] text-slate-500 font-medium">
                  Confidential — protected under enterprise NDA. No spam, ever.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

// Icon helper component
function SearchIconComponent({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

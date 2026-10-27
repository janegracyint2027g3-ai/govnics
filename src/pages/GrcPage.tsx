import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { grcSpicedSlides } from "@/data/spiced-slider-content";
import { servicesData } from "@/data/services-data";
import { manpowerServicesData } from "@/data/manpower-services-data";
import { Link } from "react-router-dom";
import { 
  Shield, ArrowRight, CheckCircle2, Briefcase, FileText, Scale, Settings, 
  ShieldCheck, Clock, Users, AlertTriangle, Eye, Layers, RefreshCw, BookOpen, BarChart3, 
  Lock, HelpCircle, ChevronDown, Mail, Phone, Building2, Cpu, Target
} from "lucide-react";

export default function GrcPage() {
  const [activeTab, setActiveTab] = useState<string>("compliance");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "GRC Services | Governance, Risk & Compliance Solutions — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Explore GOVENICS GRC services: regulatory compliance, enterprise risk management, internal audit, governance framework design, labour law advisory, ESG reporting, and cybersecurity solutions.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
    return () => { document.title = "GOVENICS | Enterprise Governance, Risk & Compliance Consulting"; };
  }, []);



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

  // Helper for Manpower Staffing Cards
  const renderManpowerCard = (serviceId: string, icon: React.ReactNode) => {
    const serv = manpowerServicesData.find(s => s.id === serviceId);
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
              Staffing Solution
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {serv.heroTitle}
          </h3>
          <p className="text-xs text-slate-655 line-clamp-3 leading-relaxed font-semibold">
            {serv.shortDescription}
          </p>
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Key Deliverables:</span>
            <ul className="space-y-1">
              {serv.keyServices.slice(0, 2).map((ks, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{ks}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between relative z-10">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Workforce Division
          </span>
          <Link
            to={`/staffing/${serv.id}`}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            <span>Read Detail</span>
            <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  const manpowerItems = [
    renderManpowerCard("permanent-staffing", <Users className="w-5 h-5" />),
    renderManpowerCard("contract-staffing", <Briefcase className="w-5 h-5" />),
    renderManpowerCard("executive-search", <Shield className="w-5 h-5" />),
    renderManpowerCard("sla-managed", <Settings className="w-5 h-5" />),
    renderManpowerCard("payroll-management", <FileText className="w-5 h-5" />),
    renderManpowerCard("healthcare-manpower", <ShieldCheck className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  const cyberItems = [
    renderServiceCard("cybersecurity-iso27001", <Shield className="w-5 h-5" />),
    renderServiceCard("incident-response", <Clock className="w-5 h-5" />),
    renderServiceCard("data-privacy-dpdp", <Scale className="w-5 h-5" />),
    renderServiceCard("vendor-risk-management", <Briefcase className="w-5 h-5" />)
  ].filter(Boolean) as React.ReactNode[];

  const esgItems = [
    renderServiceCard("esg-sustainability", <Shield className="w-5 h-5" />),
    renderServiceCard("environmental-compliance", <Settings className="w-5 h-5" />),
    renderServiceCard("supply-chain-compliance", <Scale className="w-5 h-5" />),
    renderServiceCard("governance-framework", <FileText className="w-5 h-5" />)
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

  const stats: GrcStatCardItem[] = [
    { value: "100", suffix: "%", label: "Board Audit Preparedness", icon: ShieldCheck, badge: "Assurance", description: "Standardized DoA charters & RCSA compliance controls" },
    { value: "250", suffix: "+", label: "Central & State Acts Mapped", icon: Scale, badge: "Taxonomy", description: "Real-time updates against gazette notifications" },
    { value: "↓ 85", suffix: "%", label: "Statutory Penalty Slippage", icon: Shield, badge: "Protection", description: "Automated task routing & zero-lag filing reminders" },
    { value: "18", suffix: " mo", label: "Average Enterprise ROI", icon: Clock, badge: "ROI", description: "Tangible audit prep speedups & litigation prevention" }
  ];

  // SECTION 2: ENTERPRISE BUSINESS CHALLENGES
  const challenges = [
    {
      title: "Regulatory Fragmentation Across Jurisdictions",
      desc: "Multi-state organizations face diverging state amendments, local municipal bylaws, and central acts without a single unified compliance ledger.",
      icon: RefreshCw
    },
    {
      title: "Decentralized Risk Visibility",
      desc: "Operational risks, vendor lapses, and statutory liabilities remain siloed across plants and branch offices, obscuring systemic enterprise threats.",
      icon: Eye
    },
    {
      title: "Audit Anxiety & Missing Evidentiary Trails",
      desc: "Manual register management creates documentary gaps that trigger severe audit observations during statutory, labor, or ISO inspections.",
      icon: AlertTriangle
    },
    {
      title: "Supply Chain & Contractor Non-Compliance",
      desc: "Unvetted vendor workforces expose principal employers to joint liability, wage non-compliance penalties, and reputational damage.",
      icon: Layers
    },
    {
      title: "High Administrative Drag & Manual Overhead",
      desc: "Core legal and compliance teams are overwhelmed by routine challans, filings, and paperwork instead of strategic governance oversight.",
      icon: Clock
    },
    {
      title: "Fiduciary Exposure for Boards & Directors",
      desc: "Stricter regulatory enforcement heightens personal liabilities for key managerial personnel without documented compliance diligence.",
      icon: Scale
    }
  ];

  // SECTION 4: 4-STAGE ENGAGEMENT METHODOLOGY
  const processStages = [
    {
      step: "01",
      name: "Discover",
      objective: "Map enterprise operational footprint, legal entities, and existing compliance posture.",
      activities: [
        "Comprehensive inventory of operating sites, state registrations, and business lines.",
        "Collation of statutory registers, previous inspection notices, and active contracts.",
        "Stakeholder interviews to define governance scope and escalation pathways."
      ],
      deliverable: "Enterprise Scope Matrix & Regulatory Baseline Dossier",
      icon: Target
    },
    {
      step: "02",
      name: "Assess",
      objective: "Benchmark existing operations against statutory mandates and industry benchmarks.",
      activities: [
        "Detailed on-site and remote audits across labor, safety, environmental, and corporate laws.",
        "Verification of physical registers, statutory remittances, and display notices.",
        "Quantitative risk weighting to classify critical versus moderate non-compliances."
      ],
      deliverable: "Prioritized Gap Analysis & Risk Severity Heatmap",
      icon: AlertTriangle
    },
    {
      step: "03",
      name: "Implement / Remediate",
      objective: "Deploy calibrated controls, standardized registers, and automated oversight workflows.",
      activities: [
        "Formulate customized Standard Operating Procedures (SOPs) and operational checklists.",
        "Remediate past non-compliance and align contractor records with statutory norms.",
        "Conduct role-based training for plant managers, HR teams, and contractor supervisors."
      ],
      deliverable: "Standardized Governance Playbook & Remediation Certification",
      icon: Settings
    },
    {
      step: "04",
      name: "Monitor / Improve",
      objective: "Maintain perpetual audit readiness through continuous telemetry and periodic review.",
      activities: [
        "Continuous regulatory intelligence tracking central and state gazette notifications.",
        "Periodic mock inspections and quarterly surprise compliance audits.",
        "Digital evidence archival ensuring all registers are tamper-evident and up-to-date."
      ],
      deliverable: "Quarterly Board Governance Dossier & Compliance Health Index",
      icon: ShieldCheck
    }
  ];

  // SECTION 5: MEASURABLE BUSINESS OUTCOMES (STRICTLY NO INVENTED METRICS)
  const outcomes = [
    {
      title: "Improved Visibility",
      desc: "Unify multi-state corporate and plant-level compliance status into a single, cohesive governance view for executive oversight.",
      icon: Eye,
      highlight: "Unified Enterprise Transparency"
    },
    {
      title: "Reduced Risk",
      desc: "Proactively eliminate latent non-conformances before government inspection notices or external audits materialize.",
      icon: Shield,
      highlight: "Proactive Defense"
    },
    {
      title: "Better Compliance",
      desc: "Rigorous adherence across central, state, and local statutory regulations with zero ambiguity in task execution.",
      icon: CheckCircle2,
      highlight: "Statutory Precision"
    },
    {
      title: "Audit Readiness",
      desc: "Always-maintained evidentiary records ensuring zero panic, minimal business disruption, and high confidence during inspections.",
      icon: ShieldCheck,
      highlight: "Perpetual Readiness"
    },
    {
      title: "Operational Efficiency",
      desc: "Streamlined processes and repeatable SOPs reduce administrative overhead and allow teams to focus on core growth.",
      icon: Cpu,
      highlight: "Administrative Streamlining"
    },
    {
      title: "Executive Accountability",
      desc: "Documented oversight and clear Delegation of Authority (DoA) matrices safeguard directors and senior leadership.",
      icon: Scale,
      highlight: "Fiduciary Protection"
    }
  ];

  // SECTION 6: TRUST & GOVERNANCE RIGOR (NO INVENTED AWARDS/LOGOS)
  const trustPillars = [
    {
      title: "Statutory Legal Alignment",
      desc: "Frameworks mapped against verified central and state acts: Factories Act, EPF, ESI, CLRA, Minimum Wages, DPDP Act, and SEBI BRSR guidelines.",
      icon: ShieldCheck
    },
    {
      title: "ISO & Global Framework Rigor",
      desc: "Advisory workflows structured in alignment with ISO 31000 risk management, ISO 27001 information security, and COSO internal control principles.",
      icon: BookOpen
    },
    {
      title: "Peer-Reviewed Deliverables",
      desc: "Every diagnostic report, risk register, and policy playbook undergoes two-tier internal review by experienced legal and GRC practitioners.",
      icon: FileText
    },
    {
      title: "Executive & Board-Grade Reporting",
      desc: "Structured, non-technical executive briefs and Board Audit Committee packs highlighting risk exposure and remediation progress.",
      icon: BarChart3
    },
    {
      title: "Tamper-Evident Evidence Management",
      desc: "Disciplined documentation protocols ensuring all returns, inspection slips, and payment challans are organized with chronological audit trails.",
      icon: Lock
    }
  ];

  // SECTION 7: INTERACTIVE FAQS
  const faqs = [
    {
      q: "What services are included in the GOVENICS GRC advisory suite?",
      a: "Our suite spans Regulatory & Factory Compliance, Enterprise Risk Management (ERM), Internal Audit & Governance, Managed Workforce Staffing, Cybersecurity Advisory (VAPT, ISO 27001, SOC 2), and ESG/BRSR Sustainability reporting."
    },
    {
      q: "How does GOVENICS accommodate multi-state operations in India?",
      a: "Our frameworks are calibrated to the specific state rules and municipal bylaws across all 28 states and Union Territories in India. We track localized shop and establishment acts, state labor welfare funds, and state pollution control board guidelines."
    },
    {
      q: "What is the typical engagement duration for an enterprise GRC rollout?",
      a: "A baseline diagnostic assessment usually takes 2 to 4 weeks. Subsequent remediation, SOP rollout, and register systematization are typically accomplished within 6 to 10 weeks, followed by continuous monitoring contracts."
    },
    {
      q: "What tangible deliverables do clients receive throughout the engagement?",
      a: "Clients receive an Enterprise Scope Charter, Comprehensive Statutory Register, Prioritized Gap Diagnostic Report, customized SOPs, Vendor Compliance Audits, and Quarterly Executive Board Governance Packs."
    },
    {
      q: "What level of effort is required from our internal staff?",
      a: "We minimize internal burden by leading document collection and audit execution. Your designated department heads participate in targeted discovery sessions (typically 2-3 hours) and regular checkpoint reviews."
    },
    {
      q: "How do you assist our organization during live statutory inspections?",
      a: "Our advisory team provides immediate guidance, verifies the validity of inspection notices, aids in rapid retrieval of required evidentiary documentation, and assists in drafting legally compliant responses."
    },
    {
      q: "How are amendments and new government notifications communicated?",
      a: "Our regulatory desk constantly scans central and state official gazettes. Clients receive immediate actionable regulatory alerts outlining what changed, who is affected, and the exact steps required to stay compliant."
    },
    {
      q: "Can GOVENICS conduct independent audits of third-party vendors and contractors?",
      a: "Yes. We perform comprehensive contractor compliance audits covering PF/ESI challans, wage register adherence, working hours compliance, and contract labor licenses to eliminate co-employment risks for principal employers."
    }
  ];



  return (
    <Layout>
      <div className="bg-slate-50/50 pb-24 text-slate-600 relative overflow-hidden">
        
        {/* Slider 1: Hero Carousel Section */}
        <GrcSliderHero slides={grcSpicedSlides} categoryLabel="GRC Division" />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* ── SECTION 2: ENTERPRISE BUSINESS CHALLENGES ────────────────── */}
        <section id="challenges" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Enterprise Vulnerabilities
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Critical Business Challenges We Solve
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Navigating complex regulatory environments without unified oversight inevitably leads to systemic control gaps, operational drag, and material legal exposure.
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

        {/* ── SECTION 3: SERVICE CAPABILITIES (VERTICAL TABS) ─────────── */}
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
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Workforce Architecture</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Managed Staffing Services</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Flexible staffing models, RPO engagements, managed hiring solutions, and 100% workforce compliance mapped to your enterprise requirements.
                    </p>
                  </div>
                  <GrcCarousel items={manpowerItems} />
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">Blue, Grey & White Collar</h4>
                        <p className="text-xs text-slate-500 mt-1">Full statutory compliance with PF, ESIC, and minimum wage adherence across all tiers.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">Comprehensive Screening</h4>
                        <p className="text-xs text-slate-500 mt-1">5-phase candidate verification including background checks, address, and criminal records.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">Multi-Model Delivery</h4>
                        <p className="text-xs text-slate-500 mt-1">Permanent placement, contract staffing, temp-to-hire, and dedicated offshore/on-site teams.</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link
                        to="/staffing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Explore Full Staffing Compendium & Models</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cybersecurity" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Defense & Trust</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">Cybersecurity Advisory</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Build an impenetrable security posture with VAPT assessments, ISO 27001 ISMS implementation, SOC 2 readiness, and CERT-In aligned incident management.
                    </p>
                  </div>
                  <GrcCarousel items={cyberItems} />
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">VAPT & Security Audits</h4>
                        <p className="text-xs text-slate-500 mt-1">Full-scope web, mobile, network, and cloud vulnerability assessment and penetration testing.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">ISO 27001 & SOC 2</h4>
                        <p className="text-xs text-slate-500 mt-1">End-to-end ISMS framework design, policy drafting, and internal pre-audit assessments.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">DPDP Act Compliance</h4>
                        <p className="text-xs text-slate-500 mt-1">Data protection readiness, privacy impact assessments, and data principal right workflows.</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link
                        to="/cybersecurity"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Explore Full Cybersecurity Offering & Operations</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "esg" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sustainability & Decarbonization</span>
                    <h2 className="text-2xl font-black text-slate-900 font-heading">ESG & Sustainability Advisory</h2>
                    <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                      Track Scope 1, 2, and 3 emissions, draft BRSR reports, and align with SEBI, GRI, and global investor ESG standards.
                    </p>
                  </div>
                  <GrcCarousel items={esgItems} />
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">SEBI BRSR Compliance</h4>
                        <p className="text-xs text-slate-550 mt-1">Comprehensive BRSR core indicators and leadership disclosures for listed enterprises.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">GHG Carbon Accounting</h4>
                        <p className="text-xs text-slate-550 mt-1">Scope 1, 2, and 3 emissions inventory calculation following GHG Protocol standards.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800">Supply Chain ESG</h4>
                        <p className="text-xs text-slate-550 mt-1">Vendor sustainability assessments, human rights due diligence, and carbon disclosures.</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link
                        to="/esg"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Explore Full ESG Advisory & Frameworks</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── SECTION 4: HOW IT WORKS (4-STAGE METHODOLOGY) ───────────── */}
        <section id="methodology" className="py-20 bg-slate-900 text-white mt-20 border-y border-slate-800">
          <div className="container mx-auto px-6 max-w-6xl space-y-14">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Delivery Methodology
              </span>
              <h2 className="text-3xl font-black text-white font-heading leading-tight">
                Our 4-Stage Engagement Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                A disciplined, milestone-driven lifecycle engineered to transition your compliance posture from reactive fire-drills to systematic assurance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processStages.map((stage, idx) => {
                const IconComp = stage.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between text-left space-y-6 hover:border-blue-500/60 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-blue-500/30 group-hover:text-blue-400 font-mono transition-colors">
                          {stage.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                          {stage.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                          {stage.objective}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-700/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Key Activities:
                        </span>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          {stage.activities.map((act, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-1.5">
                              <span className="text-blue-400 mt-0.5">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                        Tangible Deliverable:
                      </span>
                      <p className="text-[11px] font-semibold text-slate-200">
                        {stage.deliverable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: BENEFITS & OUTCOMES ───────────────────────────── */}
        <section id="outcomes" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Business Impact
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Measurable Value & Governance Outcomes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Ground-level transformation that fortifies legal standing, operational speed, and executive defensibility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((out, idx) => {
                const IconComp = out.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-7 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 flex flex-col justify-between text-left space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                        {out.highlight}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                        {out.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                        {out.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Enterprise Verification Standard</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: TRUST & GOVERNANCE PILLARS ────────────────────── */}
        <section id="trust" className="py-20 bg-slate-900 text-white border-b border-slate-800">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Institutional Rigor
              </span>
              <h2 className="text-3xl font-black text-white font-heading leading-tight">
                Governance, Trust & Quality Assurance
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                Built upon verified statutory jurisprudence, global risk standards, and tamper-evident evidentiary systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustPillars.map((tp, idx) => {
                const IconComp = tp.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-7 flex flex-col justify-between text-left space-y-4 hover:border-blue-500/50 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-white text-base leading-snug">
                        {tp.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">
                        {tp.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Defensible Baseline</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: INTERACTIVE FAQS ──────────────────────────────── */}
        <section id="faqs" className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-4xl space-y-12">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Executive Clarity
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Key questions addressing scope, deployment timelines, deliverables, and operational collaboration.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/90 rounded-2xl bg-slate-50/50 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-extrabold text-slate-800 text-sm hover:text-blue-600 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-200/60 bg-white">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 8: RELATED ECOSYSTEM & SPECIALIZED PORTALS ───────── */}
        <section id="ecosystem" className="py-20 bg-slate-50/70 border-b border-slate-200/80">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Connected Practices
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">
                Specialized GRC Practices & Integrations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                Connect your governance architecture across dedicated functional practices and enterprise integrations.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                to="/cybersecurity"
                className="group p-6 bg-white border border-slate-200/90 hover:border-blue-500/50 rounded-3xl shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Cybersecurity & Data Privacy
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    VAPT audits, SOC 2 readiness, ISO 27001 ISMS, and Indian DPDP Act compliance.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore Cybersecurity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                to="/esg"
                className="group p-6 bg-white border border-slate-200/90 hover:border-teal-500/50 rounded-3xl shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                    ESG & Sustainability
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    SEBI BRSR disclosures, Scope 1-3 GHG carbon accounting, and supply chain ESG audits.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore ESG Advisory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                to="/staffing"
                className="group p-6 bg-white border border-slate-200/90 hover:border-indigo-500/50 rounded-3xl shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Managed Workforce Staffing
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    100% statutory compliant temporary, permanent, and executive recruitment operations.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore Staffing Models</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>

            {/* Partner Carousel */}
            <div className="pt-8 border-t border-slate-200/60">
              <div className="border-l-4 border-blue-600 pl-4 text-left mb-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Integrations Network</span>
                <h3 className="text-xl font-black text-slate-900 font-heading">GRC Integrations & Certification Bodies</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Integrating seamlessly with market-leading risk intelligence solutions and certification bodies to automate audit readiness.
                </p>
              </div>
              <GrcCarousel items={partnerItems} />
            </div>
          </div>
        </section>

        {/* ── SECTION 9: STRATEGY SESSION CTA ─────────────────────────────── */}
        <section id="consultation-form" className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Column: Context */}
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Executive Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-heading leading-tight">
                  Ready to Transform Your GRC Operations?
                </h2>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  Engage our senior advisory team for an executive briefing, multi-state statutory audit scoping, or diagnostic assessment tailored to your enterprise.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Confidential Diagnostic Scoping</h4>
                      <p className="text-[11px] text-slate-400">Strict Non-Disclosure Agreement (NDA) protection on all corporate operational assessments.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Direct Advisory Access</h4>
                      <p className="text-[11px] text-slate-400">Engage directly with experienced GRC practitioners, not junior sales representatives.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Multi-Jurisdiction Coverage</h4>
                      <p className="text-[11px] text-slate-400">Comprehensive compliance coverage across all 28 states and Union Territories in India.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    contact@govenics.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    +91 98840 50000
                  </span>
                </div>
              </div>

              {/* Right Column: CTA Card (no duplicate form) */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white font-heading">Book a Strategy Session</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Fill in our structured intake form to describe your compliance needs, company size, and functional areas. We'll schedule a dedicated advisory call within 1 business day.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Industry-specific compliance scoping",
                    "Company size & framework alignment",
                    "GRC, ESG, Finance & Labour advisory",
                    "Dedicated senior partner access"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{point}</span>
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

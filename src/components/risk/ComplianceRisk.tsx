import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Settings,
  DollarSign,
  Truck,
  ShieldAlert,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Zap,
  Scale,
  Leaf,
  Cpu,
  Users,
  LayoutGrid,
  ListFilter,
  Shield,
  Activity,
  Sparkles
} from "lucide-react";

const riskCategories = [
  {
    id: "regulatory",
    number: "01",
    icon: AlertTriangle,
    severity: "Critical Severity",
    severityColor: "bg-red-500/10 text-red-600 border-red-500/20",
    gradient: "from-red-500 to-rose-600",
    glowColor: "rgba(239, 68, 68, 0.15)",
    bgLight: "bg-red-50/60",
    borderLight: "border-red-200",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20",
    iconColor: "text-red-650",
    label: "Regulatory Risk",
    statBadge: "Up to ₹250 Cr Fines",
    description: "Failure to comply with statutory laws, regulatory amendments, or mandatory national compliance directives.",
    businessImpact: [
      "Non-compliance with dynamic tax codes, DPDP Act, and statutory labor codes.",
      "Executive director disqualifications, regulatory fines, and operational license cancellations.",
      "Costly emergency investigations and retroactive compliance penalty back-payments."
    ],
    solutions: [
      "24/7 Automated statutory regulatory change tracking across central & state levels.",
      "Comprehensive multi-framework gap assessments and formal audit readiness reviews.",
      "Delegation of Authority (DoA) matrices protecting board liability."
    ],
    ctaLabel: "Explore Regulatory Solutions",
    ctaHref: "/services/regulatory-compliance",
  },
  {
    id: "operational",
    number: "02",
    icon: Settings,
    severity: "High Operational Impact",
    severityColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.15)",
    bgLight: "bg-amber-50/60",
    borderLight: "border-amber-200",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20",
    iconColor: "text-amber-650",
    label: "Operational Risk",
    statBadge: "68% Production Downtime",
    description: "Systemic process breakdowns, undocumented SOPs, or lack of internal controls triggering cascading halts.",
    businessImpact: [
      "Untrained frontline personnel mishandling sensitive registers, leading to compliance defaults.",
      "Sudden facility shutdown orders from factory inspectors or pollution control authorities.",
      "Severe supply delays, customer SLA breaches, and contract cancellation damages."
    ],
    solutions: [
      "End-to-end process control mapping and digital operational risk heatmaps.",
      "Standard Operating Procedures (SOPs) engineered for continuous statutory compliance.",
      "Automated internal audit inspection workflows with root-cause correction trackers."
    ],
    ctaLabel: "Explore Operational Solutions",
    ctaHref: "/services/internal-audit",
  },
  {
    id: "governance",
    number: "03",
    icon: Scale,
    severity: "Fiduciary Risk",
    severityColor: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
    gradient: "from-fuchsia-500 to-pink-600",
    glowColor: "rgba(217, 70, 239, 0.15)",
    bgLight: "bg-fuchsia-50/60",
    borderLight: "border-fuchsia-200",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/20",
    iconColor: "text-fuchsia-650",
    label: "Governance Risk",
    statBadge: "Director Liability Shield",
    description: "Inadequate board supervision, missing committee records, or weak internal checks exposing leadership.",
    businessImpact: [
      "Undocumented board decisions triggering minority shareholder or regulatory litigations.",
      "Personal liability claims against Independent Directors and Audit Committee members.",
      "Erosion of institutional stakeholder confidence and sharp institutional valuation drops."
    ],
    solutions: [
      "Enterprise Corporate Governance and Secretarial Compliance registers.",
      "Executive Board reporting dashboards with live risk indicators and meeting records.",
      "Independent committee advisory aligning charters with MCA and SEBI LODR norms."
    ],
    ctaLabel: "Explore Governance Solutions",
    ctaHref: "/services/governance-framework",
  },
  {
    id: "financial",
    number: "04",
    icon: DollarSign,
    severity: "Balance Sheet Exposure",
    severityColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.15)",
    bgLight: "bg-blue-50/60",
    borderLight: "border-blue-200",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20",
    iconColor: "text-blue-650",
    label: "Financial Risk",
    statBadge: "18% Revenue At Stake",
    description: "Flaws in financial reporting, tax reconciliations, cross-border transfer pricing, or statutory disclosures.",
    businessImpact: [
      "Substantial tax demand notices, GST input tax credit reversals, and compounding interest penalties.",
      "Regulatory investigation by revenue authorities freezing operating working capital.",
      "Credit rating downgrades escalating institutional debt financing costs."
    ],
    solutions: [
      "Automated statutory tax deduction and GST filing verification audits.",
      "LODR, SEBI, and Companies Act statutory disclosure governance schedules.",
      "Financial control testing protecting balance sheet health prior to external audits."
    ],
    ctaLabel: "Explore Financial Solutions",
    ctaHref: "/services/taxation-trade-compliance",
  },
  {
    id: "vendor",
    number: "05",
    icon: Truck,
    severity: "Third-Party Threat",
    severityColor: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.15)",
    bgLight: "bg-violet-50/60",
    borderLight: "border-violet-200",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20",
    iconColor: "text-violet-650",
    label: "Vendor / Third-Party Risk",
    statBadge: "60% Breach Origin",
    description: "Vulnerabilities introduced through outsourced contractors, cloud partners, logistics, and raw suppliers.",
    businessImpact: [
      "Contractor non-compliance with CLRA and EPF triggering co-employment lawsuits against Principal Employer.",
      "Third-party vendor cyber breaches leaking core enterprise intellectual property and customer data.",
      "Unexpected tier-1 supplier bankruptcies stalling customer deliveries and revenue pipelines."
    ],
    solutions: [
      "Comprehensive vendor onboarding vetting and contractual compliance validation.",
      "Continuous third-party security, labor compliance, and credit health scoring.",
      "Automated challan verification ensuring vendor PF/ESIC deposits before invoice clearance."
    ],
    ctaLabel: "Explore Vendor Solutions",
    ctaHref: "/services/vendor-risk-management",
  },
  {
    id: "cybersecurity",
    number: "06",
    icon: ShieldAlert,
    severity: "Mission-Critical",
    severityColor: "bg-teal-500/10 text-teal-600 border-teal-500/20",
    gradient: "from-teal-500 to-cyan-600",
    glowColor: "rgba(20, 184, 166, 0.15)",
    bgLight: "bg-teal-50/60",
    borderLight: "border-teal-200",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/20",
    iconColor: "text-teal-650",
    label: "Cybersecurity & Data Protection Risk",
    statBadge: "Zero Breach Mandate",
    description: "Unauthorized data exfiltration, ransomware attacks, and failures to protect citizen privacy credentials.",
    businessImpact: [
      "DPDP Act statutory penalties reaching up to ₹250 Crores per data incident.",
      "Mandatory 6-hour CERT-In incident reporting deadlines under statutory cyber surveillance laws.",
      "Permanent loss of enterprise customer goodwill and contract disqualifications."
    ],
    solutions: [
      "Comprehensive DPDP Act & GDPR compliance calibration and Data Protection Officer advisory.",
      "Certified VAPT, red-teaming simulations, and cloud posture hardening.",
      "24/7 Security Operations Center (SOC) oversight with certified incident response runbooks."
    ],
    ctaLabel: "Explore Cyber Solutions",
    ctaHref: "/services/data-privacy-dpdp",
  },
  {
    id: "esg",
    number: "07",
    icon: Leaf,
    severity: "Sustainability Mandate",
    severityColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    gradient: "from-emerald-500 to-green-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
    bgLight: "bg-emerald-50/60",
    borderLight: "border-emerald-200",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20",
    iconColor: "text-emerald-650",
    label: "ESG & Sustainability Risk",
    statBadge: "BRSR Core Mandate",
    description: "Inaccurate carbon accounting, greenwashing scrutiny, or failure to fulfill statutory environmental duties.",
    businessImpact: [
      "Regulatory rejections of annual reports by SEBI due to non-aligned BRSR core indicators.",
      "Pollution control board stop-work notices and steep daily environmental compensation penalties.",
      "Exclusion from global institutional sovereign wealth investment portfolios and green funds."
    ],
    solutions: [
      "SEBI BRSR Core compliance reporting and carbon accounting verification frameworks.",
      "Comprehensive Consent to Establish (CTE) & Consent to Operate (CTO) environmental tracking.",
      "Corporate ESG strategy design aligning with GRI, TCFD, and Scope 1-3 emissions standards."
    ],
    ctaLabel: "Explore ESG Solutions",
    ctaHref: "/services/environmental-compliance",
  },
  {
    id: "ai-technology",
    number: "08",
    icon: Cpu,
    severity: "Emerging Tech Risk",
    severityColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.15)",
    bgLight: "bg-cyan-50/60",
    borderLight: "border-cyan-200",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20",
    iconColor: "text-cyan-650",
    label: "AI & Autonomous Tech Risk",
    statBadge: "Global AI Act Ready",
    description: "Algorithmic bias, automated data processing without consent, model drift, and unvetted shadow AI deployments.",
    businessImpact: [
      "Mass copyright and trade secret leaks through unmonitored employee generative AI tool usage.",
      "Discriminatory algorithmic hiring or credit decisions violating fundamental statutory rights.",
      "Upcoming civil liabilities under emerging global AI regulation and transparency acts."
    ],
    solutions: [
      "Enterprise AI Governance Frameworks establishing data provenance and model explainability.",
      "Algorithmic impact assessments and automated bias detection audits.",
      "Corporate generative AI usage policies and safe deployment sandboxes."
    ],
    ctaLabel: "Explore Tech Solutions",
    ctaHref: "/services/enterprise-risk-management",
  },
  {
    id: "people",
    number: "09",
    icon: Users,
    severity: "Human Capital Risk",
    severityColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    gradient: "from-orange-500 to-amber-600",
    glowColor: "rgba(249, 115, 22, 0.15)",
    bgLight: "bg-orange-50/60",
    borderLight: "border-orange-200",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20",
    iconColor: "text-orange-650",
    label: "People & Cultural Risk",
    statBadge: "91% Incidents Root Cause",
    description: "Human oversights, undocumented whistleblowing policies, internal misconduct, and POSH compliance lapses.",
    businessImpact: [
      "91% of enterprise compliance failures originate from internal human error or misinformed decisions.",
      "POSH Act statutory penalties, employer liability suits, and brand reputational viral fallout.",
      "High executive turnover and low workforce productivity caused by toxic governance environments."
    ],
    solutions: [
      "Complete POSH Internal Committee (IC) constitution, annual reports, and mandated trainings.",
      "Confidential whistleblowing channels and anti-bribery / anti-corruption compliance matrices.",
      "Role-based statutory compliance certification programs for managers and leadership."
    ],
    ctaLabel: "Explore People Solutions",
    ctaHref: "/services/hr-policy-governance",
  }
];

export const ComplianceRisk = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "accordion">("cards");
  const [expandedId, setExpandedId] = useState<string | null>("regulatory");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredRisks = selectedFilter === "all"
    ? riskCategories
    : selectedFilter === "statutory"
    ? riskCategories.filter(r => ["regulatory", "operational", "people"].includes(r.id))
    : selectedFilter === "tech"
    ? riskCategories.filter(r => ["cybersecurity", "ai-technology", "vendor"].includes(r.id))
    : riskCategories.filter(r => ["governance", "financial", "esg"].includes(r.id));

  return (
    <section id="compliance-risk" className="py-20 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background spotlights & geometric grids */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-500/10 to-blue-500/10 border border-slate-200 text-slate-800 text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Enterprise Compliance Risk Matrix</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight font-heading tracking-tight">
            9 Critical Vulnerabilities{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Threatening Enterprises Today
            </span>
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            Proactive governance transforms vulnerabilities into institutional resilience. Explore our multidimensional risk directory detailing immediate business liabilities, financial exposures, and verified statutory solutions.
          </p>

          {/* Controls: Filter Pills & Layout Switcher */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: "All 9 Dimensions" },
                { id: "statutory", label: "Statutory & Labor" },
                { id: "tech", label: "Cyber & Technology" },
                { id: "board", label: "Board & ESG Finance" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === f.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0">
              <button
                onClick={() => setActiveTab("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "cards"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Interactive Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card Grid</span>
              </button>
              <button
                onClick={() => setActiveTab("accordion")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "accordion"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Detailed Diagnostic View"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Diagnostic List</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── VIEW 1: INTERACTIVE 3D CARDS GRID ─────────────────────────────────── */}
        {activeTab === "cards" && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRisks.map((risk) => {
              const IconComp = risk.icon;
              return (
                <motion.div
                  key={risk.id}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-blue-400 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top color bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${risk.gradient}`} />
                  
                  {/* Header row */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${risk.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Vulnerability {risk.number}
                          </span>
                          <div className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border w-fit mt-0.5 ${risk.severityColor}`}>
                            {risk.severity}
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                        {risk.statBadge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {risk.label}
                    </h3>
                    
                    <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                      {risk.description}
                    </p>

                    {/* Highlights: Impact & Solution preview */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-rose-600 flex items-center gap-1 mb-1.5">
                          <Zap className="w-3 h-3 text-rose-500" />
                          <span>Primary Enterprise Exposure</span>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed line-clamp-2">
                          {risk.businessImpact[0]}
                        </p>
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1 mb-1.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                          <span>Govenics Solution</span>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed line-clamp-2">
                          {risk.solutions[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer with CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveTab("accordion");
                        setExpandedId(risk.id);
                        setTimeout(() => {
                          document.getElementById(`risk-toggle-${risk.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 100);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
                    >
                      <Activity className="w-3.5 h-3.5" /> Full Diagnostic
                    </button>

                    <Link
                      to={risk.ctaHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all group-hover:shadow-md"
                    >
                      <span>Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ── VIEW 2: DETAILED DIAGNOSTIC LIST ─────────────────────────────────── */}
        {activeTab === "accordion" && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 max-w-5xl mx-auto"
          >
            {filteredRisks.map((risk) => {
              const IconComp = risk.icon;
              const isExpanded = expandedId === risk.id;

              return (
                <motion.div
                  key={risk.id}
                  layout
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? `${risk.bgLight} ${risk.borderLight} shadow-xl ring-1 ring-blue-500/20`
                      : "bg-white border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300"
                  }`}
                >
                  {/* Card Header — always visible */}
                  <button
                    id={`risk-toggle-${risk.id}`}
                    onClick={() => setExpandedId(isExpanded ? null : risk.id)}
                    className="w-full flex items-center justify-between p-6 text-left group gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Number badge */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-slate-700 border border-slate-200 bg-white shrink-0 shadow-sm">
                        {risk.number}
                      </div>

                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${risk.iconBg} shrink-0 transition-all`}>
                        <IconComp className="w-5 h-5" />
                      </div>

                      {/* Label & Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                            {risk.label}
                          </h3>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${risk.severityColor}`}>
                            {risk.severity}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-1 truncate max-w-xl">
                          {risk.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {risk.statBadge}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-200/80 pt-6 grid md:grid-cols-2 gap-8 bg-white/80 rounded-2xl p-6 border">
                            {/* Business Impact Column */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
                                <Zap className="w-4 h-4 text-rose-600 shrink-0" />
                                <span className="text-xs font-black uppercase tracking-widest text-rose-700">
                                  Business Liabilities & Fines
                                </span>
                              </div>
                              <ul className="space-y-2.5">
                                {risk.businessImpact.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-relaxed"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5 shadow-sm" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Compliance Solutions Column */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-black uppercase tracking-widest text-blue-700">
                                  Govenics Compliance Architecture
                                </span>
                              </div>
                              <ul className="space-y-2.5">
                                {risk.solutions.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-relaxed"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-4">
                            <div className="text-xs text-slate-500 font-medium">
                              Need an enterprise readiness assessment for <strong>{risk.label}</strong>?
                            </div>
                            <div className="flex items-center gap-3">
                              <Link
                                to="/contact"
                                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm"
                              >
                                Request Audit
                              </Link>
                              <Link
                                to={risk.ctaHref}
                                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02]"
                              >
                                {risk.ctaLabel}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Global Bottom Banner */}
        <div className="max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Comprehensive Risk Audit
            </span>
            <h3 className="text-2xl font-black font-heading">
              Uncertain Which Risks Affect Your Organization?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Our Senior Risk Partners evaluate multi-jurisdiction liabilities across statutory, tech, and financial domains.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 shrink-0 hover:scale-105"
          >
            Schedule Risk Consultation
          </Link>
        </div>

      </div>
    </section>
  );
};


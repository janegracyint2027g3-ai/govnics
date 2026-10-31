import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { cyberSpicedSlides } from "@/data/spiced-slider-content";
import { PosterSection } from "@/components/poster/PosterSection";
import { 
  ArrowRight, Shield, Check, ShieldCheck, Lock, Clock
} from "lucide-react";

interface CyberItem {
  title: string;
  subCategory: string;
  desc: string;
  outcomes: string[];
  frameworks: string[];
}

const CyberCard = ({ item }: { item: CyberItem }) => {
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
              <span className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-500 uppercase">
                {item.frameworks[0]}
              </span>
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
              Outcome Aligned
            </span>
            <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
              View Metrics <ArrowRight className="w-3 h-3 text-blue-500" />
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
              <span className="text-[9px] font-bold text-slate-500 uppercase">
                {item.frameworks[0]}
              </span>
            </div>
            <h3 className="text-sm font-black text-white line-clamp-1">
              {item.title}
            </h3>
            
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Target Deliverables:</span>
              <ul className="space-y-1.5">
                {item.outcomes.slice(0, 3).map((out, i) => (
                  <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{out}</span>
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

export default function CyberSecurityPage() {
  useEffect(() => {
    document.title = "Cybersecurity Services | ISO 27001, VAPT & ISMS — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Build a resilient cybersecurity posture with VAPT assessments, ISO 27001 ISMS implementation, SOC 2 readiness, and CERT-In aligned incident management from GOVENICS.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);



  // Cyber GRC Items (8 items)
  const grcItems: CyberItem[] = [
    {
      title: "ISO 27001 (ISMS) Design & Certification",
      subCategory: "Framework Implementation",
      desc: "Complete ISMS architecture design, policy templates, risk assessment registers, internal audit prep, and certification audit guidance.",
      outcomes: ["100% first-attempt certification success", "Fully documented ISMS policy registers", "Pre-audited compliance controls"],
      frameworks: ["ISO/IEC 27001:2022", "Annex A Controls"]
    },
    {
      title: "SOC 2 Type I & II Readiness",
      subCategory: "Framework Implementation",
      desc: "Trust Services Criteria scoping, gap assessment, control definition, evidence collection automation, and CPA auditor coordination.",
      outcomes: ["Audit-ready in under 60 days", "Automated evidence retrieval scripts", "Zero-deviation Type II audit logs"],
      frameworks: ["SOC 2 TSC (Security, Availability, Privacy)"]
    },
    {
      title: "CIS Controls Benchmarking",
      subCategory: "Framework Implementation",
      desc: "Assessing organizational security posture against the Center for Internet Security Top 18 control groups to build baseline maturity models.",
      outcomes: ["Quantified cyber maturity scorecard", "Prioritized gap remediation roadmap", "Alignment with industry-standard control groups"],
      frameworks: ["CIS Controls v8", "NIST CSF 2.0 Mapping"]
    },
    {
      title: "CERT-In Directive Compliance",
      subCategory: "Indian Regulatory Compliance",
      desc: "Implementing automated 6-hour security incident reporting workflows, NTP time synchronization, and required server log retention registers.",
      outcomes: ["Standardized CERT-In incident reporting SOP", "NTP time-synced system audit trails", "180+ days secure log archival"],
      frameworks: ["CERT-In Directions (April 2022)", "IT Act 2000"]
    },
    {
      title: "DPDP Act Technical Implementation",
      subCategory: "Indian Regulatory Compliance",
      desc: "PII data discovery mapping, database-level encryption designs, consent manager APIs, and statutory breach alert notification registers.",
      outcomes: ["Comprehensive PII data mapping catalog", "Encrypted database schemas for sensitive info", "DPDP-compliant privacy notifications"],
      frameworks: ["Digital Personal Data Protection Act 2023 (DPDP)"]
    },
    {
      title: "RBI / SEBI IT & Cyber Frameworks",
      subCategory: "Indian Regulatory Compliance",
      desc: "Specialized GRC compliance reporting, risk registers, and system audits for financial institutions, fintechs, and asset managers.",
      outcomes: ["RBI System Audit clearing certificate", "SEBI-compliant cyber risk dashboards", "Zero-deviation regulatory filings"],
      frameworks: ["RBI Master Direction IT & Cyber Security", "SEBI Cyber Security circulars"]
    },
    {
      title: "IT Risk Register & Heatmap Creation",
      subCategory: "Cyber Governance",
      desc: "Dynamic cataloging of cyber risks, likelihood-impact assessments, control mapping, and risk treatment plan management.",
      outcomes: ["Board-ready risk heatmaps", "Regularly reviewed risk treatment registers", "Alignment with enterprise risk management"],
      frameworks: ["ISO 31000 Risk Management", "NIST SP 800-30"]
    },
    {
      title: "Board-Level Cyber Risk Dashboards",
      subCategory: "Cyber Governance",
      desc: "Executive GRC reporting templates translating technical security telemetry into financial risk indexes and compliance scores.",
      outcomes: ["Sleek executive dashboard reports", "Quantified cyber risk metrics in financial terms", "Quarterly board presentation slides"],
      frameworks: ["FAIR Methodology", "NIST CSF 2.0 Govern"]
    }
  ];

  // Offensive Security Items (7 items)
  const offensiveItems: CyberItem[] = [
    {
      title: "Web Application VAPT (OWASP Top 10)",
      subCategory: "Core Penetration Testing",
      desc: "Dynamic and static vulnerability analysis of web frontends, backend APIs, and session management systems against OWASP Top 10.",
      outcomes: ["Detailed vulnerability reports with POCs", "Developer remediation walk-throughs", "Vulnerability re-test verification certs"],
      frameworks: ["OWASP Top 10", "WASC Threat Classification"]
    },
    {
      title: "Mobile Application VAPT (Android/iOS)",
      subCategory: "Core Penetration Testing",
      desc: "Binary reverse engineering, local storage analysis, IPC interface audits, SSL pinning validation, and API endpoint verification.",
      outcomes: ["Decompiled application vulnerability report", "Secure local keychain integration validation", "Clean runtime verification certificate"],
      frameworks: ["OWASP MASVS / MASTG"]
    },
    {
      title: "API Security & Infrastructure Testing",
      subCategory: "Core Penetration Testing",
      desc: "Testing authorization bypasses, rate limiting, data exposure, and infrastructure boundaries across REST, GraphQL, and server environments.",
      outcomes: ["Thorough API schema validation records", "Infrastructure exploit path discoveries", "Hardened firewall rules configurations"],
      frameworks: ["OWASP API Security Top 10"]
    },
    {
      title: "Red Teaming Operations",
      subCategory: "Advanced Attack Simulation",
      desc: "Multi-layered adversarial simulations combining spear-phishing, physical access bypasses, external network attacks, and lateral privilege jumps.",
      outcomes: ["End-to-end attack scenario timeline logs", "Detection capability gaps matrix for internal SOC", "Tactical defensive corrective steps list"],
      frameworks: ["MITRE ATT&CK Framework", "TIBER-EU guidelines"]
    },
    {
      title: "Ransomware Readiness & Pathway Assessment",
      subCategory: "Advanced Attack Simulation",
      desc: "Mapping active directory weaknesses, domain admin paths, and egress filtering blockades to simulate ransomware propagation.",
      outcomes: ["Ransomware infection path analysis", "Active Directory hardening blueprints", "Incident containment validation logs"],
      frameworks: ["NIST SP 800-83 (Ransomware)", "CIS AD Hardening"]
    },
    {
      title: "Cloud Security Posture Management (CSPM)",
      subCategory: "Cloud & Configuration",
      desc: "Automated configuration auditing of AWS/Azure infrastructures, mapping identity permissions, and checking storage exposures.",
      outcomes: ["Automated infrastructure compliance logs", "Immediate alerts on policy drift", "Remediated IAM privilege paths"],
      frameworks: ["CIS Cloud Benchmarks", "NIST SP 800-190"]
    },
    {
      title: "Configuration Review & Hardening",
      subCategory: "Cloud & Configuration",
      desc: "Deep-dive analysis of server OS configurations, database parameters, firewalls, and network switches to remove factory defaults.",
      outcomes: ["Standardized system hardening checklists", "Pre-hardened VM images templates", "Zero-deviation configuration audit logs"],
      frameworks: ["CIS Hardening Benchmarks", "DISA STIGs"]
    }
  ];

  // Incident Response Items (6 items)
  const incidentItems: CyberItem[] = [
    {
      title: "24/7 Cyber Incident Response Team (CIRT)",
      subCategory: "Response & Retainer Services",
      desc: "Guaranteed SLA response times for security breach isolation, endpoint containment, remote telemetry collection, and ransomware decryption assistance.",
      outcomes: ["Under 1-hour active threat containment SLA", "24/7 access to tier-3 response forensics", "Eradication validation certificates"],
      frameworks: ["NIST SP 800-61 r2 (Incident Handling)", "ISO/IEC 27035"]
    },
    {
      title: "Incident Containment & Eradication Playbooks",
      subCategory: "Response & Retainer Services",
      desc: "Designing custom technical playbooks for security teams to isolate Active Directory, revoke API keys, reroute network traffic, and lock down databases.",
      outcomes: ["Documented execution playbooks per attack type", "Automated orchestration scripts integrations", "Reduced Mean Time to Contain (MTTC)"],
      frameworks: ["NIST SP 800-61", "SANS Incident Handler guide"]
    },
    {
      title: "Digital & Malware Forensics",
      subCategory: "Forensics & Evidence",
      desc: "Detailed memory analysis, disk imaging, registry inspection, and network payload reviews to dissect hacker pathways and construct malware timelines.",
      outcomes: ["Forensic timeline reconstruction reports", "Malware reverse engineering IOC catalogs", "Identified root-cause breach entrance vectors"],
      frameworks: ["ISO/IEC 27037 (Evidence Handling)", "RFC 3227"]
    },
    {
      title: "Court-Admissible Evidence Collection",
      subCategory: "Forensics & Evidence",
      desc: "Maintaining chain of custody during hardware acquisition, hashing files, documenting server steps, and producing expert witness briefs.",
      outcomes: ["Tamper-proof forensic image registries", "Legally binding chain-of-custody receipts", "Court-ready technical affidavits and brief reports"],
      frameworks: ["ISO/IEC 27037", "Indian Evidence Act Section 65B"]
    },
    {
      title: "Regulatory Breach Reporting Workflows",
      subCategory: "Crisis Management",
      desc: "Developing compliance reporting matrices to fulfill mandatory CERT-In 6-hour reports, DPDP Act notices, and sectoral SEBI notifications.",
      outcomes: ["Automated draft forms generation pipelines", "Legal timelines checklist tracking systems", "Pre-vetted regulatory contact coordinates"],
      frameworks: ["CERT-In Directions", "DPDP Act Section 8(6)"]
    },
    {
      title: "Board-Level Cyber Crisis Simulation",
      subCategory: "Crisis Management",
      desc: "Facilitating tabletop exercises for C-suite and board members to walk through ransom demands, customer notifications, and media relations.",
      outcomes: ["Board response maturity evaluations", "Communication coordination worksheets", "Refined business continuity strategies"],
      frameworks: ["NIST SP 800-84 (Tabletop Testing)"]
    }
  ];

  // Specialized Cyber Items (6 items)
  const specializedItems: CyberItem[] = [
    {
      title: "SCADA & ICS Network Security",
      subCategory: "Operating Theatres (OT) & Industrial Security",
      desc: "Designing industrial DMZs, audit-logging SCADA controls, validating safety instrumented systems, and isolating operational plants.",
      outcomes: ["Segmented manufacturing networks architectures", "Secure remote-access configurations blueprints", "ICS-specific anomaly alerts rulesets"],
      frameworks: ["IEC 62443 (Operating Theatres (OT) Security)", "NIST SP 800-82"]
    },
    {
      title: "IoT Device Security & Segmentation",
      subCategory: "Operating Theatres (OT) & Industrial Security",
      desc: "Auditing firmware vulnerabilities on controllers, disabling dangerous diagnostic ports, and implementing device certificates.",
      outcomes: ["IoT firmware vulnerability scans logs", "Device identity certificates directories", "Isolated VLAN architecture frameworks"],
      frameworks: ["OWASP IoT Top 10", "NIST IR 8259"]
    },
    {
      title: "Third-Party Vendor Cyber Risk Assessments",
      subCategory: "Ecosystem & Supply Chain",
      desc: "Auditing downstream contractors, reviewing software bills of materials (SBOM), and checking integration points for supply chain weaknesses.",
      outcomes: ["Standardized vendor audit questionnaires", "Quantified vendor risk scorecards database", "Legal compliance contract templates"],
      frameworks: ["NIST CSF 2.0 Supply Chain (GV.SC)", "ISO 27036"]
    },
    {
      title: "Continuous Attack Surface Monitoring",
      subCategory: "Ecosystem & Supply Chain",
      desc: "Deploying external-facing discovery engines (CASM) to find exposed staging servers, forgotten domain names, and active software vulnerabilities.",
      outcomes: ["Real-time alerts on new exposed endpoints", "Updated asset inventory directories", "Immediate notifications on public CVEs"],
      frameworks: ["NIST SP 800-115 (Testing)", "OWASP Top 10"]
    },
    {
      title: "M&A Cyber Due Diligence",
      subCategory: "Transaction & Product Security",
      desc: "Conducting pre-acquisition threat hunting, reviewing target source code, assessing historical breach registries, and evaluating control maturity.",
      outcomes: ["Quantified cyber liability due diligence reports", "Remediation cost projection budgets", "Integration risk scorecards databases"],
      frameworks: ["NIST CSF 2.0", "ISO 27001 Assessment"]
    },
    {
      title: "DevSecOps & Secure-by-Design Integration",
      subCategory: "Transaction & Product Security",
      desc: "Integrating static (SAST) and dynamic (DAST) scanning, mapping secrets management, and implementing secure coding standards.",
      outcomes: ["Fully automated CI/CD security gate integrations", "Secure coding policy libraries", "Container registry vulnerability scans"],
      frameworks: ["OWASP SAMM (Software Maturity)", "BSIMM"]
    }
  ];

  // Integrations/Tools Logos (Slider 6)
  const integrationLogos = [
    { name: "Qualys", cat: "Vulnerability Management" },
    { name: "CrowdStrike", cat: "Endpoint Defense (EDR)" },
    { name: "Splunk", cat: "Security Analytics (SIEM)" },
    { name: "ServiceNow", cat: "IT GRC Orchestration" },
    { name: "Palo Alto Networks", cat: "Network Security" },
    { name: "Fortinet", cat: "Boundary Hardening" },
    { name: "SentinelOne", cat: "Autonomous Endpoint" },
    { name: "Okta", cat: "Identity & Access (IAM)" }
  ];

  const grcCards = grcItems.map((item, idx) => <CyberCard item={item} key={idx} />);
  const offensiveCards = offensiveItems.map((item, idx) => <CyberCard item={item} key={idx} />);
  const incidentCards = incidentItems.map((item, idx) => <CyberCard item={item} key={idx} />);
  const specializedCards = specializedItems.map((item, idx) => <CyberCard item={item} key={idx} />);

  const partnerCards = integrationLogos.map((logo, idx) => (
    <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center items-center hover:border-blue-500/20 transition-all aspect-[5/3] select-none">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-blue-600 font-black text-xs">
        {logo.name.substring(0, 2).toUpperCase()}
      </div>
      <h4 className="text-xs font-black text-slate-800">{logo.name}</h4>
      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{logo.cat}</p>
    </div>
  ));

  const stats: GrcStatCardItem[] = [
    { value: "99.8", suffix: "%", label: "Vulnerability Remediation", icon: ShieldCheck, badge: "Efficacy", description: "Validated elimination of critical & high CVSS exploits" },
    { value: "0", label: "Breach Liability Exposure", icon: Shield, badge: "Assurance", description: "Continuous defensive posture against ransomware & APTs" },
    { value: "60", suffix: " Days", label: "ISO 27001 & SOC 2 Readiness", icon: Clock, badge: "Velocity", description: "Accelerated gap remediation to Stage-2 audit clearance" },
    { value: "6", suffix: " Hours", label: "CERT-In Statutory Response", icon: Lock, badge: "Compliance", description: "Automated incident reporting & 180-day forensic log audit" }
  ];

  return (
    <Layout noPadding={true}>
      <div className="bg-slate-50/50 pb-24 text-slate-600 relative overflow-hidden">
        
        {/* Slider 1: Hero Carousel Section */}
        <GrcSliderHero slides={cyberSpicedSlides} categoryLabel="Cyber Security" />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* Poster Section: Cybersecurity & Data Governance Briefing */}
        <div className="container mx-auto px-6 max-w-7xl pt-10">
          <PosterSection
            initialKey="cybersecurity-data"
            relatedKeys={["cybersecurity-data", "risk-management", "regulatory-compliance"]}
            title="Cybersecurity & Data Privacy Infographic"
            subtitle="Executive briefing on DPDP Act statutory mandates, CERT-In reporting thresholds, and cyber resilience (LinkedIn 4:5 Edition)"
          />
        </div>

        {/* Content Sliders */}
        <div className="container mx-auto px-6 max-w-7xl pt-16 space-y-20">
          
          {/* Slider 2: Cyber GRC & Compliance */}
          <section id="grc-compliance" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Policy & Certifications</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Cyber GRC & Compliance</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Establish robust governance baselines, gap reports, and statutory filings mapping to ISO 27001, SOC 2, DPDP Act, and CERT-In directions.
              </p>
            </div>
            <GrcCarousel items={grcCards} />
          </section>

          {/* Slider 3: Offensive Security (VAPT) */}
          <section id="offensive-security" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Vulnerability Validation</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Offensive Security (VAPT)</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Active validation of system boundaries, web applications, mobile binaries, APIs, and cloud deployments using real-world exploit simulations.
              </p>
            </div>
            <GrcCarousel items={offensiveCards} />
          </section>

          {/* Slider 4: Incident Response & Defense */}
          <section id="incident-defense" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Response & Overwatch</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Incident Response & Defense</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                SLA-backed incident threat containment, detailed malware forensics, chain-of-custody collection, and crisis desktop drills.
              </p>
            </div>
            <GrcCarousel items={incidentCards} />
          </section>

          {/* Slider 5: Specialized Cyber Solutions */}
          <section id="specialized-solutions" className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Operating Theatres (OT) & Transaction Protection</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Specialized Cyber Solutions</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                SCADA/ICS plant network isolation, third-party contractor risk scoring, M&A cyber due diligence, and DevSecOps integrations.
              </p>
            </div>
            <GrcCarousel items={specializedCards} />
          </section>

          {/* Slider 6: Cyber Integrations */}
          <section className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4 text-left">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tool Integrations</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">Cybersecurity Integrations & Ecosystem</h2>
              <p className="text-xs text-slate-550 max-w-xl font-semibold mt-1">
                Integrating seamlessly with enterprise security, scanning, SIEM, and vulnerability intelligence tools to maintain audit-ready control levels.
              </p>
            </div>
            <GrcCarousel items={partnerCards} />
          </section>

        </div>
      </div>
    </Layout>
  );
}

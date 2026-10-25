import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroVerify from "@/assets/hero-verify.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroDrone from "@/assets/hero-drone.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";
import heroCommand from "@/assets/command_center_1.jpg";

export interface SpicedBreakdown {
  situation: string;       // S: Current state, scale, operating environment
  pain: string;            // P: Underlying problem, bottleneck, hidden liability
  impact: string;          // I: Quantified value, financial & operational ROI
  criticalEvent: string;   // C: Regulatory deadline, audit, trigger event
  decision: string;        // D: Decision criteria, Govnics capability & CTA
}

export interface SpicedSlide {
  badge: string;
  title: string;
  highlight: string;
  titleEnd?: string;
  description: string;
  image: string;
  icp: string;              // Situation (Target Profile)
  outcome: string;          // Impact (Key Tangible Result)
  criticalEvent: string;    // Critical Event (Catalyst / Deadline)
  decisionCriteria?: string;// Decision Criteria summary
  cta: string;              // Action trigger
  spiced: SpicedBreakdown;  // Full SPICED diagnostic model
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HOME / EXECUTIVE COMMAND CENTER SLIDES
// ─────────────────────────────────────────────────────────────────────────────
export const homeSpicedSlides: SpicedSlide[] = [
  {
    badge: "Command Center",
    title: "Stop Juggling GRC Tools.",
    highlight: "Start Commanding Them.",
    titleEnd: "",
    description: "One AI-orchestrated command center unifying fragmented risk registers, multi-state statutory filings, cyber telemetry, and board governance into single-pane intelligence.",
    image: heroCommand,
    icp: "CROs & Board Audit Committees at India's Top 500 Enterprises",
    outcome: "Cut GRC reporting cycles by 50% and eliminate surprise audit citations",
    criticalEvent: "Upcoming Board Audit Committee review & annual statutory governance disclosures",
    cta: "Explore the Command Platform",
    spiced: {
      situation: "Cross-enterprise organization managing disparate spreadsheets and siloed compliance tools across multiple subsidiaries and business units.",
      pain: "Executive leadership lacks a single real-time truth, producing delayed board reports, blind risk spots, and audit anxiety.",
      impact: "50% acceleration in reporting velocity, 100% board-level visibility, and eradication of critical compliance surprises.",
      criticalEvent: "Impending Q4 Board Audit Committee review requiring consolidated multi-entity risk validation.",
      decision: "Govnics continuous command architecture with pre-integrated automated escalation rules and real-time executive dashboards."
    }
  },
  {
    badge: "Cyber GRC & CERT-In",
    title: "Your Security Team Fights Hackers.",
    highlight: "Who Fights the Regulators?",
    titleEnd: "",
    description: "Bridging the critical gap between technical threat containment and mandatory CERT-In 6-hour disclosure windows, ISO 27001 ISMS audits, and global security mandates.",
    image: heroSoc,
    icp: "CISOs, CTOs & Legal Counsel in BFSI, SaaS & Critical Infrastructure",
    outcome: "100% on-time CERT-In disclosure compliance & 3x faster SOC 2 readiness",
    criticalEvent: "CERT-In 6-hour statutory breach reporting trigger & annual ISO 27001 surveillance audit",
    cta: "Deploy Cyber Shield",
    spiced: {
      situation: "Fast-growing digital platforms processing high-volume transactions under scrutiny from CERT-In, RBI, and international data authorities.",
      pain: "Technical security tools flag alerts, but lack automated regulatory logging and legally defensible reporting within statutory timelines.",
      impact: "Zero regulatory penalties, automated 180-day forensic log preservation, and accelerated enterprise customer deal approvals.",
      criticalEvent: "Active threat escalation or approaching customer vendor-security audit deadline.",
      decision: "Govnics 24/7 technical-statutory hybrid defense framework with pre-codified regulatory reporting playbooks."
    }
  },
  {
    badge: "ESG & BRSR Core",
    title: "CSR Is Yesterday's Obligation.",
    highlight: "ESG Is Your Enterprise Valuation Engine.",
    titleEnd: "",
    description: "Moving beyond checkbox sustainability to audit-assured BRSR Core reporting and Scope 1–3 decarbonization that unlocks global institutional capital and customer trust.",
    image: heroIntegration,
    icp: "CSOs, CFOs & Company Secretaries in NSE/BSE Top 1000 Listed Entities",
    outcome: "Reduce ESG reporting overhead by 45% and achieve green rating upgrades",
    criticalEvent: "SEBI mandatory BRSR Core reasonable assurance submission for FY2025",
    cta: "Start BRSR Assurance",
    spiced: {
      situation: "Publicly listed enterprises subject to mandatory SEBI BRSR guidelines with expanding export supply chain requirements.",
      pain: "Fragmented supplier data makes Scope 3 carbon tracking and social KPI verification unreliable, risking greenwashing accusations.",
      impact: "45% lower carbon accounting costs, verified audit assurance readiness, and premium credit ratings from institutional investors.",
      criticalEvent: "Mandatory annual SEBI filing window and investor ESG rating assessments (MSCI/Sustainalytics).",
      decision: "Govnics GHGP-certified calculation models backed by former Big 4 ESG auditors and digital vendor audit portals."
    }
  },
  {
    badge: "Managed Payroll",
    title: "Payroll Errors Cost More Than Money—",
    highlight: "They Cost Executive Trust.",
    titleEnd: "",
    description: "Eliminate statutory remittance delays, PF/ESI discrepancy notices, and labour commissioner disputes with a zero-error, multi-state managed payroll engine.",
    image: heroAiDriven,
    icp: "CHROs, Finance Controllers & Directors in 500–5,000 Employee Firms",
    outcome: "Achieve 99.9% calculation precision and reclaim 25+ hours monthly for HR",
    criticalEvent: "Monthly 15th statutory remittance deadlines and annual EPFO/ESIC reconciliation",
    cta: "Optimize Managed Payroll",
    spiced: {
      situation: "Multi-location operations employing diverse white, grey, and blue-collar workforces across varying state statutory rules.",
      pain: "Complex state-specific minimum wages, bonus rules, and gratuity calculations cause frequent payroll rework and employee dissatisfaction.",
      impact: "Complete elimination of statutory default notices, 35% administrative cost savings, and 100% on-time challan generation.",
      criticalEvent: "Monthly statutory filing cutoff and state labour enforcement audit cycle.",
      decision: "Govnics full-liability managed payroll engine backed by 40-year ISI Group statutory indemnification."
    }
  },
  {
    badge: "Compliance Staffing",
    title: "Scale Your Workforce Rapidly",
    highlight: "Without Absorbing Co-Employment Liabilities.",
    titleEnd: "",
    description: "Deploy pre-vetted contractual and operational personnel across blue, grey, and white-collar roles while Govnics carries 100% of statutory and labour law liability.",
    image: verticalsFacility,
    icp: "Plant Heads & HR VPs in Manufacturing, E-Commerce & Logistics",
    outcome: "Deploy pre-audited talent in 14 days with zero co-employment legal exposure",
    criticalEvent: "Upcoming implementation of India's 4 New National Labour Codes",
    cta: "Deploy Compliant Staffing",
    spiced: {
      situation: "Operations needing flexible contingent labor to meet seasonal manufacturing demands or logistics peaks.",
      pain: "Using multiple unvetted local contractors leads to non-deposit of PF/ESI, resulting in legal summons served directly to principal employers.",
      impact: "100% statutory indemnity, total insulation against labour court litigation, and consistent worker deployment within 14 days.",
      criticalEvent: "Notice of impending state labour inspector inspection or surge contract mobilization.",
      decision: "Govnics Master Service Provider (MSP) model with audited escrow payroll and end-to-end statutory guarantees."
    }
  },
  {
    badge: "DPDP & Data Privacy",
    title: "Customer Data Is an Enterprise Asset.",
    highlight: "Protect It from ₹250 Cr Penalties.",
    titleEnd: "",
    description: "Building consent-first architectures, automated Data Principal Request workflows, and leak-proof PII governance aligned with the Indian DPDP Act 2023.",
    image: heroDrone,
    icp: "Chief Privacy Officers, DPOs & General Counsels in B2C & Tech Platforms",
    outcome: "100% compliance with DPDP consent notices and 48-hr DPR resolution speed",
    criticalEvent: "Notification of DPDP Rules and constitution of the Data Protection Board",
    cta: "Assess Privacy Posture",
    spiced: {
      situation: "Digital enterprises handling millions of consumer data records, KYC credentials, and telemetry streams.",
      pain: "Lack of consent mapping and data inventory creates immense legal risk under DPDP penalties capped up to ₹250 Crores per violation.",
      impact: "Avoid severe regulatory penalties, build customer brand trust, and fulfill Data Principal access/erasure requests in under 48 hours.",
      criticalEvent: "Statutory rollout of DPDP operational rules and consumer privacy grievance escalations.",
      decision: "Govnics holistic Privacy-by-Design blueprint combining automated discovery, consent ledgering, and certified fractional DPOs."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. GRC ADVISORY & ENTERPRISE GOVERNANCE SLIDES (/grc)
// ─────────────────────────────────────────────────────────────────────────────
export const grcSpicedSlides: SpicedSlide[] = [
  {
    badge: "Living ERM Engine",
    title: "Your Static Risk Register Is a Tombstone.",
    highlight: "Build a Real-Time Living Risk Engine.",
    titleEnd: "",
    description: "Replace dormant Excel spreadsheets with dynamic, quantified risk registers aligned to ISO 31000 and COSO—where risks auto-update, auto-score, and auto-escalate.",
    image: heroCommand,
    icp: "CROs & Enterprise Risk Directors in Banking, Pharma & Industrial Leaders",
    outcome: "Detect emerging operational risks 2x faster and prevent multi-crore losses",
    criticalEvent: "Quarterly Board Risk Management Committee (RMC) evaluation",
    cta: "Upgrade to Living ERM",
    spiced: {
      situation: "Enterprise operating with an annual, static spreadsheet-based risk register updated right before audit time.",
      pain: "Emerging supply chain bottlenecks, cyber vulnerabilities, and regulatory shifts are detected only after operational disruption occurs.",
      impact: "Identifies emerging threats 2x faster, establishes automated risk thresholds, and saves crores in unmitigated losses.",
      criticalEvent: "Impending Board Risk Management Committee review and external stakeholder governance audit.",
      decision: "Govnics ISO 31000 automated risk scoring matrices with dynamic KRIs (Key Risk Indicators) and real-time executive escalation."
    }
  },
  {
    badge: "Pan-India Compliance Engine",
    title: "One Central Engine. Every State Statute.",
    highlight: "Zero Missed Filings Across 28 States.",
    titleEnd: "",
    description: "Unify Factories Act, Shops & Establishments, CLRA, Pollution Control, and Tax statutes through a centralized compliance platform that tracks every deadline across India.",
    image: heroIntegration,
    icp: "Heads of Legal, VP Operations & Compliance Officers in Multi-State Enterprises",
    outcome: "100% audit readiness across 28 states with zero penalty notices",
    criticalEvent: "Annual state labour inspectorate audit drives and statutory license renewal periods",
    cta: "Explore Multi-State Engine",
    spiced: {
      situation: "Multi-state manufacturing, retail, or branch footprint operating under differing state rules and local municipal statutes.",
      pain: "Decentralized branch managers miss localized deadlines, leading to compounding late fees, legal notices, and operational stop-work orders.",
      impact: "100% on-time statutory adherence, zero director liability notices, and instant centralized multi-entity audit trails.",
      criticalEvent: "Surprise state inspector visits or annual statutory license renewals across multiple locations.",
      decision: "Govnics automated regulatory engine backed by boots-on-the-ground compliance liaisons in every state."
    }
  },
  {
    badge: "Internal Controls (ICFR)",
    title: "Audit Scrambles Drain Your Finance Team.",
    highlight: "Institutionalize Continuous Control Testing.",
    titleEnd: "",
    description: "Codify Internal Financial Controls (IFC/ICFR) with automated control mapping, walkthrough documentation, and continuous control validation for seamless statutory audits.",
    image: heroVerify,
    icp: "CFOs, Internal Audit Heads & Audit Committee Chairs in Listed & Pre-IPO Firms",
    outcome: "Reduce annual statutory audit testing time by 40% with zero material weaknesses",
    criticalEvent: "Statutory Auditor year-end sign-off and CARO 2020 reporting disclosures",
    cta: "Strengthen Internal Controls",
    spiced: {
      situation: "Organizations preparing for annual statutory auditor sign-offs or gearing up for public market IPO filings.",
      pain: "Ad-hoc documentation of financial controls results in auditor disputes, prolonged audit timelines, and risk of adverse CARO remarks.",
      impact: "Cuts auditor testing cycles by 40%, eliminates material control deficiencies, and provides clean board audit sign-offs.",
      criticalEvent: "Statutory auditor interim/year-end internal financial control audits.",
      decision: "Govnics pre-built IFC control matrices, automated walkthrough workflows, and deficiency remediation tracking."
    }
  },
  {
    badge: "Vendor Risk (TPRM)",
    title: "Your Supply Chain Is Your Hidden Vulnerability.",
    highlight: "Enforce Continuous Third-Party Risk Oversight.",
    titleEnd: "",
    description: "Continuously vet downstream suppliers, logistics partners, and subcontractors for labor violations, tax defaults, and cybersecurity lapses before they tarnish your brand.",
    image: heroDrone,
    icp: "CPOs, Procurement Directors & Supply Chain VPs in Manufacturing & FMCG",
    outcome: "Mitigate third-party operational and reputational exposure by 70%",
    criticalEvent: "Annual supplier re-qualification cycle and ESG supply chain verification",
    cta: "Deploy TPRM Overwatch",
    spiced: {
      situation: "Complex supply networks relying on hundreds of Tier-1 and Tier-2 component vendors and logistics contractors.",
      pain: "Vendor non-compliance in statutory wages or data handling creates vicarious liability and front-page reputational crises.",
      impact: "70% reduction in supplier liability exposure, automated vendor risk scorecards, and uninterrupted production flow.",
      criticalEvent: "Vendor contract renewal milestones and mandatory CSRD/BRSR supply chain audits.",
      decision: "Govnics automated vendor risk evaluation engine with verified statutory challan authentication."
    }
  },
  {
    badge: "Accreditations & Certifications",
    title: "First-Attempt Certification Pass Rate.",
    highlight: "Zero Regulatory Friction. Zero Stress.",
    titleEnd: "",
    description: "Rigorous gap analysis, documentation blueprints, and mock audit simulations for ISO, NABH, NAAC, and NABL certifications—because second attempts damage credibility.",
    image: verticalsFacility,
    icp: "Quality Directors & Facility Administrators in Healthcare, Education & Tech",
    outcome: "100% first-attempt certification success with average 60-day acceleration",
    criticalEvent: "Upcoming external registrar accreditation inspection or renewal window",
    cta: "Fast-Track Certification",
    spiced: {
      situation: "Hospitals, universities, or tech firms needing mandatory quality and security accreditations to operate or tender.",
      pain: "Documentation shortfalls and lack of mock audit readiness lead to failed audits, remediation delays, and lost tenders.",
      impact: "Guaranteed first-pass certification, saves months of administrative delays, and validates premium institutional quality.",
      criticalEvent: "Scheduled registrar inspection or tender submission qualification cutoff.",
      decision: "Govnics certified lead auditors guiding documentation, staff training, and pre-assessment audit rehearsals."
    }
  },
  {
    badge: "Governance & Ethics",
    title: "Protect Your Board from Blind Spots.",
    highlight: "Secure Whistleblower & Vigilance Architecture.",
    titleEnd: "",
    description: "Deploy an encrypted, anonymous whistleblower mechanism, POSH committee overwatch, and anti-bribery governance systems that preserve executive integrity.",
    image: heroAiDriven,
    icp: "Company Secretaries, Independent Directors & Audit Committees",
    outcome: "Resolve 100% of ethics grievances internally before regulatory or public escalation",
    criticalEvent: "Quarterly Audit Committee vigil mechanism review under Companies Act Sec 177",
    cta: "Strengthen Vigil Mechanism",
    spiced: {
      situation: "Corporate boards obligated to maintain an effective whistleblowing and POSH mechanism under Indian corporate governance laws.",
      pain: "Employees lack trust in internal channels, leading to unverified social media leaks, regulatory complaints, and reputational damage.",
      impact: "100% confidential intake, rapid forensic investigation, and complete statutory protection under Companies Act Section 177.",
      criticalEvent: "Quarterly statutory Audit Committee report on ethics filings and POSH compliance.",
      decision: "Govnics third-party secure grievance intake portal backed by independent legal investigation specialists."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. CYBERSECURITY & THREAT DEFENSE SLIDES (/cyber-security)
// ─────────────────────────────────────────────────────────────────────────────
export const cyberSpicedSlides: SpicedSlide[] = [
  {
    badge: "CERT-In 6-Hour Shield",
    title: "CERT-In Mandates 6-Hour Reporting.",
    highlight: "Is Your Incident Playbook Clocked in Seconds?",
    titleEnd: "",
    description: "Automate CERT-In statutory breach reporting, NTP server synchronization, and 180-day forensic log retention—so your CISO stays protected and regulators stay satisfied.",
    image: heroSoc,
    icp: "CISOs, Security Directors & Heads of Infrastructure in Indian Enterprises",
    outcome: "Achieve 100% CERT-In compliance with automated statutory reporting evidence",
    criticalEvent: "CERT-In security audit or active breach detection requiring 6-hour disclosure",
    cta: "Deploy CERT-In Playbook",
    spiced: {
      situation: "Indian enterprises, intermediaries, data centers, and BFSI organizations operating under strict CERT-In cyber guidelines.",
      pain: "Failure to report incidents within 6 hours or maintain 180-day logs invites criminal liability and executive penalties under IT Act Sec 70B.",
      impact: "Guaranteed compliance with statutory reporting timelines, audit-ready immutable logs, and zero regulatory penalty actions.",
      criticalEvent: "Detection of a security incident or regulatory notice from Indian cyber authorities.",
      decision: "Govnics pre-built automated CERT-In incident playbooks, automated log auditing, and 24/7 legal-technical incident responders."
    }
  },
  {
    badge: "ISO 27001 & SOC 2 Fast-Track",
    title: "Enterprise Deals Blocked by Security Reviews?",
    highlight: "Achieve Stage-2 Clearance in Under 60 Days.",
    titleEnd: "",
    description: "Full-lifecycle ISMS architecture, gap analysis, and policy codification for ISO 27001:2022 and SOC 2 Type II readiness—closing enterprise enterprise RFPs 3x faster.",
    image: heroAiDriven,
    icp: "CTOs, CISOs & Founders in SaaS, FinTech, HealthTech & IT Exporters",
    outcome: "Clear Stage-2 audits in 60 days with 0 major non-conformities",
    criticalEvent: "High-value enterprise customer RFP submission or annual contract security audit",
    cta: "Fast-Track SOC 2 & ISO",
    spiced: {
      situation: "B2B SaaS companies and IT service providers pitching enterprise accounts in the US, Europe, and India.",
      pain: "Lengthy security questionnaire cycles and lack of SOC 2 / ISO 27001 certifications stall pipeline and cause lost deals.",
      impact: "Accelerates enterprise sales cycles by 3x, clears Stage-2 registrar audits in 60 days, and builds enterprise market credibility.",
      criticalEvent: "Pending deal closure contingent on SOC 2 Type II or ISO 27001 certification proof.",
      decision: "Govnics accelerated ISMS implementation blueprint with pre-mapped control libraries and empaneled auditor assurance."
    }
  },
  {
    badge: "Offensive VAPT & Red Teaming",
    title: "Hackers Don't Respect Compliance Checklists.",
    highlight: "Expose Exploits Before Adversaries Do.",
    titleEnd: "",
    description: "CREST-methodology Vulnerability Assessment & Penetration Testing across web apps, APIs, cloud environments, and internal networks with validated proof-of-concept exploits.",
    image: heroVerify,
    icp: "Security Architects, Engineering VPs & CISOs managing critical digital workloads",
    outcome: "Remediate 99.8% of high & critical CVSS vulnerabilities within 14 days",
    criticalEvent: "Pre-production software release or quarterly mandatory VAPT audit",
    cta: "Book Offensive VAPT",
    spiced: {
      situation: "Modern distributed cloud architectures with frequent software deployments, microservices, and public API endpoints.",
      pain: "Automated vulnerability scanners produce false positives while missing sophisticated business logic flaws and multi-stage exploits.",
      impact: "Identifies and eliminates critical CVE and zero-day risks, preventing multi-crore breach extortions and data leaks.",
      criticalEvent: "Major feature production release or scheduled annual regulatory penetration test.",
      decision: "Govnics certified ethical hackers executing manual deep-dive penetration testing with tailored remediation code snippets."
    }
  },
  {
    badge: "Ransomware & Kill-Switch",
    title: "Ransomware Doesn't Negotiate.",
    highlight: "Be Armed with Immutable Recovery & Defense.",
    titleEnd: "",
    description: "Combining zero-trust segmentation, air-gapped backup testing, and rapid containment kill-switch playbooks to neutralize ransomware attacks in minutes.",
    image: heroCommand,
    icp: "IT Directors & Chief Risk Officers in Manufacturing, BFSI & Healthcare",
    outcome: "Eliminate ransom extortion vulnerability and achieve sub-4-hour RTO",
    criticalEvent: "Industry ransomware wave or quarterly Disaster Recovery / BCP drill",
    cta: "Fortify Ransomware Defense",
    spiced: {
      situation: "Enterprise operating critical production lines, patient health records, or banking cores vulnerable to ransomware payloads.",
      pain: "A single infected workstation can encrypt network-attached storage within 30 minutes, halting operations and costing millions per hour.",
      impact: "Guaranteed business continuity, zero ransom payouts, and validated air-gapped recovery in under 4 hours.",
      criticalEvent: "Scheduled annual Disaster Recovery drill or urgent ransomware threat advisory.",
      decision: "Govnics ransomware resilience architecture incorporating immutable write-once storage and rapid isolation containment protocols."
    }
  },
  {
    badge: "Cloud & DevSecOps",
    title: "Shift Security Left Without Slowing Sprints.",
    highlight: "Automate Security Gates Across Your CI/CD Pipeline.",
    titleEnd: "",
    description: "Embed automated SAST, DAST, secrets scanning, and Software Bill of Materials (SBOM) tracking into your git workflows to stop vulnerabilities before production.",
    image: heroIntegration,
    icp: "Engineering Leaders, DevOps Heads & Product Security Engineers",
    outcome: "Cut pre-release security review time by 75% with zero high-severity escapes",
    criticalEvent: "Sprint code freeze, SOC 2 software release audit, or major client security review",
    cta: "Integrate DevSecOps",
    spiced: {
      situation: "Fast-moving engineering teams shipping multiple weekly deployments across containerized Kubernetes and serverless stacks.",
      pain: "Security audits conducted right before release create severe engineering friction, delayed launches, and missed sprint deadlines.",
      impact: "75% reduction in security review delays, automated SBOM generation, and elimination of vulnerable open-source dependencies.",
      criticalEvent: "Upcoming client security audit or scheduled production release deadline.",
      decision: "Govnics native CI/CD security gate integrations with automated PR scanning and remediation guidance."
    }
  },
  {
    badge: "Third-Party Cyber TPRM",
    title: "Your Vendors Have Direct Access to Your Network.",
    highlight: "Lock Down the Weakest Link in Your Perimeter.",
    titleEnd: "",
    description: "Continuous external attack surface monitoring (CASM), software supply chain audits, and vendor security scorecards to prevent third-party breach pivot attacks.",
    image: verticalsFacility,
    icp: "Procurement Officers, Information Security Managers & Vendor Risk Teams",
    outcome: "Prevent 100% of supply chain cyber intrusions and automate vendor vetting",
    criticalEvent: "Third-party vendor contract renewal or security breach at an ecosystem partner",
    cta: "Monitor Vendor Risk",
    spiced: {
      situation: "Enterprise granting VPN, API, and cloud integrations to hundreds of third-party software vendors and service contractors.",
      pain: "Attackers routinely compromise smaller, less-secure suppliers to pivot directly into enterprise core databases.",
      impact: "100% visibility into vendor security posture, continuous automated discovery of exposed endpoints, and reduced breach liability.",
      criticalEvent: "High-severity vulnerability discovered in an external vendor software stack.",
      decision: "Govnics automated Continuous Attack Surface Monitoring (CASM) paired with enforceable vendor security SLA frameworks."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. ESG ADVISORY & SUSTAINABILITY SLIDES (/esg)
// ─────────────────────────────────────────────────────────────────────────────
export const esgSpicedSlides: SpicedSlide[] = [
  {
    badge: "BRSR Core Assurance",
    title: "BRSR Doesn't Have to Be a Boardroom Nightmare.",
    highlight: "Deliver Audit-Ready Disclosures with Total Confidence.",
    titleEnd: "",
    description: "Turn mandatory SEBI BRSR compliance into an executive value story. Comprehensive ESG data architecture, 9-principle mapping, and assurance-ready audit trails.",
    image: heroIntegration,
    icp: "CFOs, Sustainability Directors & Company Secretaries in NSE/BSE Top 1000",
    outcome: "Deliver board-approved BRSR reports in 90 days with zero rework",
    criticalEvent: "Mandatory annual SEBI BRSR Core third-party assurance deadline",
    cta: "Prepare BRSR Disclosures",
    spiced: {
      situation: "Top 1000 listed entities mandated by SEBI to publish BRSR Core with mandatory reasonable third-party assurance.",
      pain: "Data is scattered across ERPs, spreadsheets, and factory meters, leading to conflicting disclosures, audit delays, and market scrutiny.",
      impact: "Delivers clean, board-approved BRSR reports in 90 days, improves ESG rating percentiles, and eliminates regulatory inquiries.",
      criticalEvent: "Annual report publishing timeline and statutory SEBI submission date.",
      decision: "Govnics end-to-end BRSR data governance system backed by pre-assurance reviews from senior sustainability auditors."
    }
  },
  {
    badge: "Scope 1, 2 & 3 Carbon Engine",
    title: "Accurately Measure What Regulators Demand.",
    highlight: "Decarbonize Your Operations & Supply Chain.",
    titleEnd: "",
    description: "GHG Protocol-certified carbon accounting for direct emissions, energy consumption, and upstream/downstream Scope 3 supplier footprint calculations.",
    image: verticalsFacility,
    icp: "Sustainability Officers & Operations VPs in Steel, Cement, Auto & Chemicals",
    outcome: "Cut carbon accounting costs by 45% and unlock green capital financing",
    criticalEvent: "Institutional investor ESG rating review or European CBAM / CSRD export filing",
    cta: "Calculate Carbon Footprint",
    spiced: {
      situation: "High-emissions manufacturing and heavy industries facing scrutiny from lenders, global buyers, and carbon boundary taxes (CBAM).",
      pain: "Scope 3 supplier emissions are complex to quantify, resulting in inaccurate guestimates that get rejected by international auditors.",
      impact: "Cuts carbon accounting costs by 45%, provides audit-verified emissions inventories, and qualifies enterprises for lower-interest green debt.",
      criticalEvent: "Upcoming institutional investor ESG evaluation or international export disclosure deadline.",
      decision: "Govnics GHG Protocol-certified calculation engine with verified emission factor libraries and automated supplier surveys."
    }
  },
  {
    badge: "Supply Chain Human Rights & Labour ESG",
    title: "Your Supply Chain Practices Define Your Reputation.",
    highlight: "Audit Supplier Human Rights & Fair Wages.",
    titleEnd: "",
    description: "Verify ethical labor standards, minimum wage compliance, child labor prohibitions, and workplace safety across your Tier-1 and Tier-2 supply partners.",
    image: heroVerify,
    icp: "Chief Procurement Officers, ESG Heads & Legal Directors in FMCG & Apparel",
    outcome: "Eliminate 100% of human rights compliance risks across key supply partners",
    criticalEvent: "European Corporate Sustainability Due Diligence Directive (CSDDD) audit",
    cta: "Audit Supply Chain ESG",
    spiced: {
      situation: "Global and domestic retail, FMCG, and apparel brands contracting out manufacturing to third-party factories.",
      pain: "Under-the-radar labour violations or unsafe working conditions at a supplier site can trigger global boycotts and regulatory sanctions.",
      impact: "Zero supply chain labour violations, protection of brand equity, and complete alignment with BRSR Principle 3 & 5 requirements.",
      criticalEvent: "Global client ethical trade audit or annual supplier code of conduct verification.",
      decision: "Govnics on-site physical labour inspections combined with automated digital statutory wage verification."
    }
  },
  {
    badge: "EHS & Pollution Clearances",
    title: "Environmental Violations Halt Production Overnight.",
    highlight: "Maintain Uninterrupted SPCB Compliance.",
    titleEnd: "",
    description: "Continuous monitoring of Consent to Establish (CTE), Consent to Operate (CTO), hazardous waste manifests, and effluent treatment logs to prevent plant closure notices.",
    image: heroCommand,
    icp: "Plant Managers, EHS Directors & Operations VPs in Chemical, Pharma & Heavy Industries",
    outcome: "100% on-time consent renewals and zero factory closure notices",
    criticalEvent: "State Pollution Control Board (SPCB) renewal window or surprise inspection",
    cta: "Secure EHS Consents",
    spiced: {
      situation: "Industrial manufacturing facilities handling regulated air emissions, industrial effluent, or hazardous waste.",
      pain: "Missed consent renewal deadlines or non-compliant effluent levels trigger immediate closure notices and heavy environmental compensation fines.",
      impact: "100% on-time SPCB consent renewals, zero factory downtime, and validated compliance with environmental protection acts.",
      criticalEvent: "Expiring Consent to Operate (CTO) or scheduled environmental audit.",
      decision: "Govnics proactive EHS compliance tracking calendar combined with certified environmental engineering advisory."
    }
  },
  {
    badge: "Climate Risk & TCFD",
    title: "Climate Volatility Is a Direct Financial Risk.",
    highlight: "Model Climate Scenarios & Safeguard Asset Value.",
    titleEnd: "",
    description: "TCFD and ISSB-aligned financial disclosure modeling assessing physical flood/heat risks and transition regulatory risks across your real estate and industrial asset base.",
    image: heroDrone,
    icp: "Chief Financial Officers, Enterprise Risk Managers & Board Committees in BFSI & Real Estate",
    outcome: "Protect asset valuations against climate transition penalties and attract ESG funds",
    criticalEvent: "RBI Mandatory Climate Risk Disclosures implementation deadline",
    cta: "Model Climate Risk",
    spiced: {
      situation: "Banks, NBFCs, insurers, and large infrastructure owners exposed to physical weather extremes and carbon policy transitions.",
      pain: "Lack of quantified scenario analysis leaves boards vulnerable to asset write-downs and regulatory reprimands from the central bank.",
      impact: "Quantified financial impact projections, enhanced climate resilience, and full compliance with emerging RBI climate disclosure rules.",
      criticalEvent: "Mandatory central bank climate risk stress test filings.",
      decision: "Govnics quantitative climate risk models integrating climate hazard data with enterprise financial balance sheets."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. MANAGED STAFFING & PAYROLL SLIDES (/manage-staffing)
// ─────────────────────────────────────────────────────────────────────────────
export const staffingSpicedSlides: SpicedSlide[] = [
  {
    badge: "Statutory Risk Transfer",
    title: "One Master Compliance Umbrella.",
    highlight: "Zero Labour Arrests. Zero Legal Summons.",
    titleEnd: "",
    description: "Consolidate fragmented contract staffing agencies under a single audited compliance umbrella—carrying 100% of statutory, PF, ESI, and CLRA legal liability.",
    image: heroVerify,
    icp: "HR VPs, Plant Directors & General Counsels in Manufacturing & Warehousing",
    outcome: "Insulate corporate directors from 100% of contract labour litigation",
    criticalEvent: "Enforcement notification of the 4 New National Indian Labour Codes",
    cta: "Transfer Statutory Risk",
    spiced: {
      situation: "Enterprises utilizing thousands of contractual workers across multiple plants, warehouses, and distribution centers.",
      pain: "Sub-contractors default on PF, ESI, or minimum wages, causing criminal liability notices to be served directly upon principal employer directors.",
      impact: "Total transfer of statutory liability, zero labour court summons, and verified monthly challan reconciliation.",
      criticalEvent: "Surprise inspection by the Labour Enforcement Officer or trade union dispute.",
      decision: "Govnics Master Service Provider (MSP) model with audited escrow payroll backed by comprehensive statutory indemnification."
    }
  },
  {
    badge: "Fractional GRC Leadership",
    title: "C-Suite Expertise. Fractional Cost.",
    highlight: "Enterprise-Grade Impact on Demand.",
    titleEnd: "",
    description: "Deploy battle-tested fractional CISOs, DPOs, and ISO Lead Auditors on a flexible part-time basis—giving your organization tier-1 governance without executive payroll overhead.",
    image: heroDrone,
    icp: "CEOs, CTOs & Board Members in Mid-Market Tech, BFSI & Growth Firms",
    outcome: "Access tier-1 executive capability at 50% cost with immediate impact",
    criticalEvent: "Enterprise customer vendor security review or upcoming board governance overhaul",
    cta: "Hire Fractional Leaders",
    spiced: {
      situation: "Mid-market companies scaling rapidly and facing enterprise customer audits or regulatory scrutiny.",
      pain: "Cannot justify spending ₹1.5 Cr+ on a full-time CISO/DPO, yet junior staff lack authority to pass stringent enterprise security reviews.",
      impact: "50% lower executive talent spend, immediate board-level governance maturity, and fast closure of enterprise compliance gaps.",
      criticalEvent: "Major enterprise client contract negotiation contingent on dedicated security leadership.",
      decision: "Govnics bench of vetted ex-Fortune 500 CISOs and certified lead auditors available on flexible retainers."
    }
  },
  {
    badge: "Zero-Error Managed Payroll",
    title: "Payroll Errors Destroy Employee Morale.",
    highlight: "Automate Multi-State Payroll with Zero Leakage.",
    titleEnd: "",
    description: "End-to-end salary processing, attendance integration, TDS computations, and multi-state statutory deductions managed with military precision and SLA guarantees.",
    image: heroAiDriven,
    icp: "HR Heads & Finance Controllers in Companies with 200–5,000 Employees",
    outcome: "Achieve 99.9% payroll calculation precision and eliminate statutory penalties",
    criticalEvent: "Monthly payroll cut-off and quarterly statutory tax filing deadlines",
    cta: "Outsource Payroll Processing",
    spiced: {
      situation: "Companies managing hundreds or thousands of employees spread across different states with distinct local tax and welfare fund laws.",
      pain: "Manual payroll runs result in tax deduction errors, delayed salary disbursements, employee disputes, and late filing interest charges.",
      impact: "Zero payroll discrepancies, 100% on-time salary disbursements, and complete peace of mind for the finance leadership.",
      criticalEvent: "Monthly 7th/10th salary disbursement date and 15th statutory remittance cutoff.",
      decision: "Govnics multi-tier automated validation payroll engine integrated with corporate banking rails and government statutory portals."
    }
  },
  {
    badge: "Specialized EHS & ESG Staffing",
    title: "Niche ESG & Safety Roles.",
    highlight: "Filled in 21 Days. Guaranteed.",
    titleEnd: "",
    description: "Deploy certified environmental safety officers, factory EHS inspectors, and carbon accounting analysts on demand to maintain total regulatory safety at your sites.",
    image: verticalsFacility,
    icp: "Operations Directors & ESG Heads in Infrastructure, Mining, Energy & Steel",
    outcome: "Deploy pre-vetted EHS specialists in 21 days and maintain zero factory lost-time incidents",
    criticalEvent: "Plant expansion commissioning date or upcoming factory inspectorate safety audit",
    cta: "Source ESG Specialists",
    spiced: {
      situation: "High-hazard industrial sites requiring mandatory certified Safety Officers under Factories Act Section 40B.",
      pain: "Acute shortage of qualified, government-certified safety personnel leads to regulatory notices and dangerous workplace accidents.",
      impact: "Immediate statutory compliance, reduced workplace incidents, and zero delays in industrial production expansions.",
      criticalEvent: "Statutory plant safety audit or project commissioning deadline.",
      decision: "Govnics pre-screened talent repository of certified DISH safety diploma holders and certified environmental auditors."
    }
  },
  {
    badge: "Embedded RPO & Talent Pods",
    title: "Recruiting Teams Overwhelmed by Scale?",
    highlight: "Deploy Dedicated Embedded Sourcing Pods.",
    titleEnd: "",
    description: "Scale your talent acquisition with embedded recruitment specialists acting as an extension of your internal HR team—reducing cost-per-hire and slashing time-to-fill.",
    image: heroCommand,
    icp: "Talent Acquisition Directors & CHROs in High-Growth Tech & Industrial Firms",
    outcome: "Cut cost-per-hire by 40% and accelerate time-to-fill to under 21 days",
    criticalEvent: "Quarterly corporate expansion roadmap or mass project staffing drive",
    cta: "Activate Embedded RPO",
    spiced: {
      situation: "Enterprises undergoing rapid headcount expansion across technical, GRC, and specialized operations roles.",
      pain: "Traditional contingency recruitment agencies charge exorbitant fees (15-20%) while internal recruiters are bogged down by volume screening.",
      impact: "40% reduction in overall talent acquisition cost, pre-calibrated candidate quality, and cut average time-to-fill to 21 days.",
      criticalEvent: "Immediate ramp-up required for new facility launch or multi-client project rollout.",
      decision: "Govnics agile embedded recruitment pods equipped with proprietary GRC skill-mapping and behavioral assessment frameworks."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. INDUSTRIES PAGE SLIDES (/industries)
// ─────────────────────────────────────────────────────────────────────────────
export const industriesSpicedSlides: SpicedSlide[] = [
  {
    badge: "Manufacturing & Heavy Engineering",
    title: "Downtime Costs Crores. Non-Compliance Costs Freedom.",
    highlight: "Total Factory Act & EHS Regulatory Shield.",
    titleEnd: "",
    description: "Protecting manufacturing plants with full-lifecycle Factories Act compliance, hazardous waste manifests, machine safety certifications, and SPCB consent renewals.",
    image: verticalsFacility,
    icp: "Plant Heads, Manufacturing Directors & Safety VPs",
    outcome: "100% on-time license renewals with zero production halts or legal notices",
    criticalEvent: "Annual State Directorate of Industrial Safety and Health (DISH) inspection",
    cta: "Explore Manufacturing GRC",
    spiced: {
      situation: "High-output industrial production plants subject to intense scrutiny from factory inspectors, pollution boards, and fire authorities.",
      pain: "A single fatal safety violation or expired pollution consent can lead to plant closure orders and criminal prosecution of directors.",
      impact: "Guaranteed zero plant shutdowns, automated factory registers, and 100% verified worker safety protocols.",
      criticalEvent: "Annual factory renewal inspection or hazardous materials compliance audit.",
      decision: "Govnics deep industrial engineering expertise, on-site audits, and digital safety registers."
    }
  },
  {
    badge: "BFSI & FinTech",
    title: "Regulators Stress Test Banks Daily.",
    highlight: "Ensure Your Financial Core Passes Every Time.",
    titleEnd: "",
    description: "Robust AML/KYC frameworks, digital lending compliance, CERT-In/RBI cyber resilience audits, and DPDP readiness designed specifically for the financial sector.",
    image: heroSoc,
    icp: "Compliance Directors, Chief Risk Officers & CISOs in Banks, NBFCs & FinTechs",
    outcome: "Pass central bank regulatory audits seamlessly with zero supervisory penalties",
    criticalEvent: "Annual RBI Risk-Based Supervision (RBS) inspection or digital lending compliance review",
    cta: "Explore BFSI Frameworks",
    spiced: {
      situation: "Regulated financial institutions handling customer deposits, digital credit, and sensitive financial records.",
      pain: "Rapidly changing circulars from the Reserve Bank of India (RBI) create immense operational stress, with penalties for non-adherence escalating sharply.",
      impact: "Flawless supervisory audit results, zero monetary penalties, and seamless integration of continuous compliance controls.",
      criticalEvent: "Annual RBI supervisory inspection or quarterly cyber audit.",
      decision: "Govnics specialized BFSI compliance practice led by former regulatory consultants and certified financial risk managers."
    }
  },
  {
    badge: "Healthcare & Pharmaceuticals",
    title: "Patient Care Demands Flawless Precision.",
    highlight: "So Does Your Clinical & Biomedical Compliance.",
    titleEnd: "",
    description: "End-to-end Biomedical Waste (BMW) management, Clinical Establishment Act adherence, NABH accreditation advisory, and drug storage licensing for healthcare networks.",
    image: heroVerify,
    icp: "Hospital Administrators, Medical Superintendents & Quality Directors",
    outcome: "Zero citations in biomedical audits and 100% first-attempt NABH renewal",
    criticalEvent: "State health department licensing inspection or NABH surveillance audit",
    cta: "Explore Healthcare GRC",
    spiced: {
      situation: "Multi-specialty hospitals, clinic chains, and diagnostic laboratories balancing intensive healthcare delivery with statutory hygiene laws.",
      pain: "Lapses in biomedical waste disposal or oxygen safety protocols invite immediate license cancellation and national media outrage.",
      impact: "Uncompromised patient safety, seamless license renewals, and uninterrupted medical service delivery.",
      criticalEvent: "Scheduled hospital accreditation review or surprise health department inspection.",
      decision: "Govnics healthcare quality advisors with comprehensive clinical SOP libraries and digital waste tracking registers."
    }
  },
  {
    badge: "Technology, SaaS & Global GCCs",
    title: "Global Customers Demand Global Standards.",
    highlight: "Pass Every Enterprise Vendor Security Audit.",
    titleEnd: "",
    description: "SOC 2 Type II, ISO 27001, GDPR, and Indian DPDP compliance frameworks tailored for software engineering organizations and Global Capability Centers.",
    image: heroAiDriven,
    icp: "Heads of GCCs, CTOs & Legal Counsels in High-Growth Software & IT Exporters",
    outcome: "Shorten enterprise RFP security approvals from 60 days to 7 days",
    criticalEvent: "Enterprise customer master service agreement security sign-off",
    cta: "Explore SaaS & GCC GRC",
    spiced: {
      situation: "Software companies and offshore Global Capability Centers (GCCs) managing international customer data and enterprise codebases.",
      pain: "Exhaustive vendor risk questionnaires and demand for international security certifications delay enterprise sales cycles and risk contract loss.",
      impact: "8x faster enterprise security sign-offs, verified SOC 2 / ISO 27001 credentials, and rapid customer contract execution.",
      criticalEvent: "Closing multi-million dollar annual enterprise client agreements.",
      decision: "Govnics specialized SaaS GRC acceleration practice with automated evidence collection and pre-approved auditor templates."
    }
  },
  {
    badge: "Infrastructure, Power & Energy",
    title: "Megaprojects Cannot Afford Regulatory Roadblocks.",
    highlight: "De-Risk Environmental & Contract Labour Clearances.",
    titleEnd: "",
    description: "Land acquisition compliance, Forest Conservation Act clearances, labour camp statutory standards, and environmental impact assessments for mega projects.",
    image: heroIntegration,
    icp: "Project Directors, Infrastructure VPs & EPC Contractors",
    outcome: "Eliminate statutory project hold-ups and maintain 100% environmental compliance",
    criticalEvent: "Project commissioning milestones and environmental clearance renewals",
    cta: "Explore Infrastructure GRC",
    spiced: {
      situation: "Large-scale renewable energy, highways, ports, and real estate developers managing vast distributed workforces and land rights.",
      pain: "Delays in environmental forest clearances or contractor wage disputes at remote sites halt construction, burning crores in interest daily.",
      impact: "Guaranteed statutory compliance, zero work-stop injunctions, and timely project commissioning.",
      criticalEvent: "Project financial closure or statutory environmental clearance hearing.",
      decision: "Govnics dedicated infrastructure compliance taskforce providing on-the-ground liaison with state and central ministries."
    }
  },
  {
    badge: "Retail & Quick-Commerce",
    title: "Speed Drives Your Business. Compliance Protects Your Foundation.",
    highlight: "Scale Multi-City Dark Stores with Zero Shutdowns.",
    titleEnd: "",
    description: "Shop & Establishment registrations, 24/7 night-shift permissions, FSSAI compliance, and contract rider labor management across thousands of urban micro-warehouses.",
    image: heroCommand,
    icp: "Operations Directors & Expansion Heads in E-Commerce & Quick-Commerce",
    outcome: "Launch new dark stores in 72 hours with pre-approved statutory clearances",
    criticalEvent: "Rapid city-wide dark store rollout schedule and municipal licensing check",
    cta: "Explore Retail GRC",
    spiced: {
      situation: "Hyper-growth quick-commerce and omnichannel retail networks launching dozens of urban delivery hubs each month.",
      pain: "Operating dark stores without proper night-shift permissions or trade licenses results in police raids, seizures, and service disruption.",
      impact: "Accelerates store launch velocity to under 72 hours with guaranteed municipal and labour law compliance.",
      criticalEvent: "Festive sale preparation and multi-city network expansion deadlines.",
      decision: "Govnics automated retail license engine handling central and municipal filings in over 100 Indian cities."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. ABOUT US PAGE SLIDES (/about)
// ─────────────────────────────────────────────────────────────────────────────
export const aboutSpicedSlides: SpicedSlide[] = [
  {
    badge: "Since 1985 • ISI Group Heritage",
    title: "Securing the Future of",
    highlight: "Enterprise Compliance",
    titleEnd: "for 40+ Years",
    description: "Four decades of operational excellence in governance, risk advisory, and statutory defense—safeguarding enterprise assets with uncompromising military-grade discipline.",
    image: heroVerify,
    icp: "Enterprise Boards & Corporate Executives Seeking Trusted Advisors",
    outcome: "1,000+ Enterprise Clients & Zero Unresolved Statutory Violations",
    criticalEvent: "Strategic enterprise restructuring and corporate governance fortification",
    cta: "Explore Our Legacy",
    spiced: {
      situation: "Modern enterprises navigating unprecedented regulatory velocity and corporate governance expectations.",
      pain: "Consulting advisory firms offer theoretical slide decks but abandon clients when regulatory enforcement knocks at the door.",
      impact: "40 years of proven operational defense, zero unmitigated statutory fallout, and unwavering executive peace of mind.",
      criticalEvent: "Board corporate governance review and multi-decade enterprise sustainability planning.",
      decision: "Govnics battle-tested ISI Group heritage combining executive strategic vision with boots-on-the-ground operational execution."
    }
  },
  {
    badge: "Leadership & Command",
    title: "Guided by Experience,",
    highlight: "Integrity & Military Discipline",
    titleEnd: "",
    description: "Led by decorated ex-military officers and corporate compliance veterans with deep expertise in statutory frameworks, industrial safety, and enterprise risk management.",
    image: heroCommand,
    icp: "Directors & Risk Committees Value-Driven Leadership",
    outcome: "Direct Board-Level Oversight & Zero Ethical Compromise",
    criticalEvent: "Annual General Meetings and institutional governance oversight reviews",
    cta: "Meet Our Leadership",
    spiced: {
      situation: "Corporate stakeholders demanding unimpeachable integrity, leadership accountability, and rigorous governance oversight.",
      pain: "Lack of decisive risk leadership leaves organizations reactive and vulnerable during regulatory crises.",
      impact: "Decisive leadership, crystal-clear crisis escalation protocols, and transparent governance stewardship.",
      criticalEvent: "Crisis management escalation or board governance restructuring.",
      decision: "Govnics executive management team bringing decades of high-stakes defense, corporate law, and statutory experience."
    }
  },
  {
    badge: "Pan-India Presence",
    title: "Local Operational Presence in Every State.",
    highlight: "Global Governance Standards Everywhere.",
    titleEnd: "",
    description: "12 regional branch offices and over 5,000 dedicated professionals across India delivering real-time statutory support, physical audit coverage, and immediate liaison.",
    image: heroIntegration,
    icp: "Enterprises with Distributed Multi-State Geographies",
    outcome: "Seamless compliance execution across all 28 Indian states & union territories",
    criticalEvent: "Pan-India enterprise expansion or multi-state operational audits",
    cta: "View Our Office Network",
    spiced: {
      situation: "Enterprises expanding footprint across secondary and tertiary industrial belts across India.",
      pain: "National advisory firms lack local presence to handle district-level labour offices, pollution boards, and municipal bodies.",
      impact: "Immediate physical representation in any district within 24 hours, eliminating regional compliance delays.",
      criticalEvent: "Expansion into new state territories or local regulatory disputes.",
      decision: "Govnics 12 regional headquarters and nationwide field network providing localized mastery with unified reporting."
    }
  },
  {
    badge: "Our Philosophy",
    title: "Moving Beyond Reactive Checklists.",
    highlight: "Building Continuous Control Intelligence.",
    titleEnd: "",
    description: "We don't settle for point-in-time checklist reviews. We embed continuous controls, automated telemetry, and pre-audited workflows directly into your operational fabric.",
    image: heroAiDriven,
    icp: "Modern C-Suites Demanding Modern GRC Infrastructure",
    outcome: "Shift from reactive vulnerability to proactive, automated compliance defense",
    criticalEvent: "Corporate digital transformation and GRC technology migration",
    cta: "Discover Our Approach",
    spiced: {
      situation: "Legacy companies trapped in annual manual spreadsheet audits that are outdated the day after completion.",
      pain: "Periodic audits give a false sense of security, leaving vast blind spots during the remaining 364 days of the year.",
      impact: "Continuous 365-day visibility, real-time alert triggers, and complete elimination of last-minute audit panic.",
      criticalEvent: "Corporate technology modernizations and ERP/GRC platform upgrades.",
      decision: "Govnics continuous controls framework pairing intelligent software telemetry with hands-on domain specialists."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. CONTACT & ASSESSMENT SLIDES (/contact)
// ─────────────────────────────────────────────────────────────────────────────
export const contactSpicedSlides: SpicedSlide[] = [
  {
    badge: "Diagnostic Audit",
    title: "You Can't Defend What You Can't See.",
    highlight: "Uncover Your Hidden GRC Vulnerabilities in 5 Days.",
    titleEnd: "",
    description: "Schedule a comprehensive diagnostic assessment of your governance, statutory filings, cyber posture, and ESG disclosures with our senior advisory team.",
    image: heroVerify,
    icp: "CROs, CFOs, Founders & Board Members Seeking Objective Risk Clarity",
    outcome: "Identify top 3 critical compliance blind spots with clear remediation roadmaps in 5 days",
    criticalEvent: "Upcoming board audit committee meeting or annual statutory reporting cycle",
    cta: "Book Diagnostic Assessment",
    spiced: {
      situation: "Enterprises aware of potential compliance gaps but lacking the internal bandwidth or unbiased perspective to quantify them.",
      pain: "Unknown compliance blind spots inevitably transform into costly regulatory penalties, public notices, or operational shutdowns.",
      impact: "Provides immediate executive clarity, quantifies financial exposure, and outlines a prioritized 30-day remediation blueprint.",
      criticalEvent: "Approaching financial year-end or preparation for external auditor scrutiny.",
      decision: "Govnics zero-obligation diagnostic assessment delivered by domain-certified lead auditors."
    }
  },
  {
    badge: "Inspection Defense",
    title: "Inspections Are Inevitable.",
    highlight: "Regulatory Citations Are Completely Avoidable.",
    titleEnd: "",
    description: "Facing a pending Labour Commissioner visit, SPCB audit, or CERT-In review? Mobilize Govnics rapid inspection defense team to secure your facility.",
    image: verticalsFacility,
    icp: "Plant Managers, Compliance Heads & Operations Directors under Regulatory Scrutiny",
    outcome: "Zero penalty citations and complete statutory register verification before inspectors arrive",
    criticalEvent: "Received formal inspection notice or summons from regulatory authorities",
    cta: "Request Immediate Defense",
    spiced: {
      situation: "Facility receiving formal notice of inspection from labour, pollution, fire, or tax authorities.",
      pain: "Scrambling to pull together fragmented physical registers and challans within a 48-hour notice window.",
      impact: "Full documentation audit and reconciliation in under 48 hours, ensuring a clean inspection with zero citations.",
      criticalEvent: "Upcoming statutory inspection date or formal regulatory show-cause notice.",
      decision: "Govnics emergency compliance intervention team with direct experience resolving regulatory inquiries."
    }
  },
  {
    badge: "Cyber Emergency Response",
    title: "Suspect a Breach or Cyber Incident?",
    highlight: "Engage Rapid Containment & CERT-In Compliance.",
    titleEnd: "",
    description: "Immediate activation of forensic containment engineers and legal-statutory advisors to meet India's mandatory 6-hour CERT-In disclosure window.",
    image: heroSoc,
    icp: "CISOs, CTOs & Incident Responders in Active Threat Scenarios",
    outcome: "Contain threat within 2 hours and fulfill 100% of statutory disclosure mandates",
    criticalEvent: "Active ransomware alert, data leak detection, or perimeter breach",
    cta: "Activate Incident Hotline",
    spiced: {
      situation: "Organization facing an active cyber intrusion, ransomware demand, or sensitive data leak.",
      pain: "Security teams are consumed by technical containment while the statutory 6-hour CERT-In reporting clock runs out.",
      impact: "Rapid threat neutralization, protection of executive leadership from criminal liability, and preservation of forensic evidence.",
      criticalEvent: "Active security incident in progress.",
      decision: "Govnics 24/7 technical-legal rapid response unit specializing in emergency triage and statutory reporting."
    }
  },
  {
    badge: "Enterprise Partnership",
    title: "Looking for an Enterprise Advisory Partner?",
    highlight: "Let's Architect Your Custom GRC Roadmap.",
    titleEnd: "",
    description: "Connect with our practice leaders to discuss multi-plant statutory outsourcing, fractional executive staffing, or custom enterprise risk platforms.",
    image: heroCommand,
    icp: "C-Level Executives & Procurement Decision-Makers",
    outcome: "Receive a tailored commercial proposal and architecture scope within 48 hours",
    criticalEvent: "Annual budget planning cycle or RFP vendor evaluation process",
    cta: "Schedule Executive Briefing",
    spiced: {
      situation: "Enterprise leadership evaluating multi-year GRC outsourcing, technology automation, or payroll transformation.",
      pain: "Standard generic vendor proposals fail to account for unique plant setups, state nuances, and industry risk profiles.",
      impact: "Customized architecture blueprint, transparent pricing matrix, and guaranteed SLA deliverables aligned to corporate objectives.",
      criticalEvent: "Annual vendor consolidation or upcoming fiscal budgeting review.",
      decision: "Govnics consultative engagement model providing tailored commercial and operational roadmaps."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. PARTNERS PORTAL SLIDES (/partners)
// ─────────────────────────────────────────────────────────────────────────────
export const partnersSpicedSlides: SpicedSlide[] = [
  {
    badge: "Technology Alliances",
    title: "You Deploy Global GRC Software.",
    highlight: "We Localize Legally Across Every Indian State.",
    titleEnd: "",
    description: "Partner with Govnics to provide the crucial on-the-ground Indian compliance layer (CERT-In, DPDP, 28-state Labour Codes) for your global cloud platforms.",
    image: heroIntegration,
    icp: "Alliances Heads at ServiceNow, MetricStream, SAP & Global SaaS Leaders",
    outcome: "Accelerate enterprise India software rollouts by 3x with guaranteed legal localization",
    criticalEvent: "Multi-million dollar enterprise software deal closing contingent on Indian statutory compliance",
    cta: "Explore Tech Alliance",
    spiced: {
      situation: "Global GRC and ERP software vendors pitching enterprise accounts in India.",
      pain: "Global platforms lack deep, dynamic out-of-the-box knowledge of 28 Indian state labour, pollution, and municipal laws.",
      impact: "Accelerates enterprise platform adoption, eliminates customer hesitation, and provides high-value implementation services.",
      criticalEvent: "Enterprise customer RFP requiring localized Indian regulatory rules engines.",
      decision: "Govnics pre-built Indian statutory knowledge bases and integration connectors for tier-1 enterprise platforms."
    }
  },
  {
    badge: "PE & VC Portfolio Optimization",
    title: "Fix the Operations. De-Risk the Balance Sheet.",
    highlight: "Maximize Exit Valuation Multiples.",
    titleEnd: "",
    description: "Act as the operational fixer for portfolio companies to clean up labour liabilities, upgrade ESG scores, and clear cyber audits before the next funding round.",
    image: heroAiDriven,
    icp: "Deal Partners & Operating Partners at Private Equity & Venture Capital Funds",
    outcome: "Boost portfolio company valuation multiples by 15% and eliminate due diligence surprises",
    criticalEvent: "Upcoming Series B/C funding round, secondary sale, or IPO prospectus filing",
    cta: "De-Risk Portfolios",
    spiced: {
      situation: "Private equity and venture capital funds preparing high-growth portfolio companies for subsequent financing rounds or exits.",
      pain: "Hidden contract labor non-compliance, unaddressed DPDP privacy debt, or lack of BRSR data leads to valuation haircuts during diligence.",
      impact: "Cleanses compliance debt, delivers institutional-grade governance, and accelerates deal closure with maximum valuation.",
      criticalEvent: "Upcoming institutional due diligence or pre-IPO filing audit.",
      decision: "Govnics rapid 14-day portfolio compliance diagnostic and turnkey remediation playbook."
    }
  },
  {
    badge: "Chartered Accountants & Legal Advisors",
    title: "Your Clients Demand Operational Labor Solutions.",
    highlight: "We Provide the Solution. You Keep the Client Trust & Revenue.",
    titleEnd: "",
    description: "Monetize your corporate client base by referring operational labour law audits, payroll management, and factory clearances to Govnics with generous recurring commissions.",
    image: verticalsFacility,
    icp: "Managing Partners at CA Firms, Corporate Law Practices & Advisory Boutiques",
    outcome: "Earn 15% recurring referral revenue while eliminating operational liability for your firm",
    criticalEvent: "Client fiscal year-end tax audit season or statutory restructuring",
    cta: "Join Advisory Network",
    spiced: {
      situation: "Chartered accountant and corporate law firms advising clients on tax, finance, and M&A.",
      pain: "Clients constantly ask for operational payroll and labour law help, which falls outside the CA firm's core scope and appetite for liability.",
      impact: "Provides clients with enterprise-grade operational execution while generating predictable, recurring advisory referral revenue.",
      criticalEvent: "Client requests help with labour code transition or multi-state payroll outsourcing.",
      decision: "Govnics trusted partner program with transparent revenue share, client protection agreements, and dedicated relationship managers."
    }
  },
  {
    badge: "Industry Bodies & Standards",
    title: "Co-Author Market Authority. Co-Host Influence.",
    highlight: "Shape the Future of Indian Corporate Governance.",
    titleEnd: "",
    description: "Collaborating with leading industry bodies (DSCI, CII, FICCI, NASSCOM) to conduct empirical risk studies, regulatory whitepapers, and high-impact CxO symposiums.",
    image: heroDrone,
    icp: "Leadership & Committee Heads at Industry Councils and Associations",
    outcome: "Deliver actionable regulatory research to 10,000+ member CxOs nationwide",
    criticalEvent: "Annual industry association national conferences and regulatory consultation submissions",
    cta: "Co-Author Research",
    spiced: {
      situation: "Industry trade associations seeking authoritative research to guide members through regulatory transitions.",
      pain: "Member companies struggle to interpret complex statutory gazettes and new regulatory mandates in isolation.",
      impact: "Produces high-authority benchmarking whitepapers, educates corporate boards, and elevates industry standards.",
      criticalEvent: "Government call for public comments on draft regulations (DPDP, Labour Codes).",
      decision: "Govnics empirical research team providing data-backed regulatory impact analyses and co-branded thought leadership."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. KNOWLEDGE HUB & SGRC LIBRARY SLIDES (/resources & /library)
// ─────────────────────────────────────────────────────────────────────────────
export const resourcesSpicedSlides: SpicedSlide[] = [
  {
    badge: "Knowledge Hub",
    title: "Decode Complex Indian Regulations.",
    highlight: "Turn Gazette Amendments into Actionable SOPs.",
    titleEnd: "",
    description: "Access curated regulatory whitepapers, central and state gazette notification breakdowns, statutory checklists, and compliance executive playbooks.",
    image: heroAiDriven,
    icp: "Compliance Officers, Legal Counsels & HR Heads Tracking Regulatory Shifts",
    outcome: "Stay 100% updated on all statutory amendments with pre-parsed legal briefs",
    criticalEvent: "Publication of official Central & State Gazette legal amendments",
    cta: "Explore Research Hub",
    spiced: {
      situation: "Corporate legal and compliance departments inundated by hundreds of pages of complex statutory notifications across states.",
      pain: "Interpreting dense legal jargon into practical shop-floor operational guidelines wastes days and risks misinterpretation.",
      impact: "Instant clarity on legislative changes, actionable step-by-step SOPs, and immediate notification of enforcement deadlines.",
      criticalEvent: "Release of new gazette notifications or high court legal precedents.",
      decision: "Govnics legal research cell breaking down complex statutes into clear, executive-ready operational playbooks."
    }
  },
  {
    badge: "DPDP & Privacy Compendium",
    title: "Master the Digital Personal Data Protection Act.",
    highlight: "Download Verified Frameworks & Consent Blueprints.",
    titleEnd: "",
    description: "Download verified DPDP compliance templates: multilingual consent notices, Data Principal Request (DPR) loggers, data processing agreements, and DPO appointment charters.",
    image: heroIntegration,
    icp: "DPOs, Tech Founders & Product Managers Designing Compliant Architectures",
    outcome: "Fast-track privacy compliance documentation in under 48 hours",
    criticalEvent: "Mandatory implementation of DPDP consent and governance guidelines",
    cta: "Download Privacy Kit",
    spiced: {
      situation: "Product and legal teams needing legally defensible privacy notices, vendor data contracts, and breach response protocols.",
      pain: "Drafting privacy documentation from scratch with external law firms is slow, expensive, and often lacks technical engineering context.",
      impact: "Reduces privacy documentation drafting time by 80%, aligns with Indian regulatory standards, and minimizes penalty exposure.",
      criticalEvent: "Product release or external privacy audit.",
      decision: "Govnics standardized, pre-vetted DPDP legal templates created in collaboration with senior privacy attorneys."
    }
  },
  {
    badge: "Statutory e-Library",
    title: "3,000+ Acts, Rules & State Gazettes.",
    highlight: "Searchable, Codified & Always Current.",
    titleEnd: "",
    description: "Instant access to India's most comprehensive digital repository of Factories Acts, Minimum Wages notifications, EHS rules, and commercial codes.",
    image: heroVerify,
    icp: "Law Students, Corporate Lawyers, HR Directors & Company Secretaries",
    outcome: "Locate specific state amendments and penalty clauses in under 5 seconds",
    criticalEvent: "Preparing legal briefs for inspectorate hearings or corporate audits",
    cta: "Access Live e-Library",
    spiced: {
      situation: "Legal professionals and compliance managers looking for exact section numbers, rules, and latest state minimum wage revision orders.",
      pain: "Government websites are frequently down, outdated, or difficult to search, resulting in reliance on obsolete statutory figures.",
      impact: "Instant access to verified, current legal texts across 28 states, preventing costly wage arrears and filing errors.",
      criticalEvent: "Bi-annual state minimum wage revisions and municipal notification updates.",
      decision: "Govnics AI-indexed, continuously updated statutory library with semantic search and cross-state comparison tools."
    }
  },
  {
    badge: "ESG & Carbon Toolkits",
    title: "Practical BRSR Core Checklists & Carbon SOPs.",
    highlight: "Equip Your Team with Big 4-Grade Toolkits.",
    titleEnd: "",
    description: "Download comprehensive BRSR Core indicator trackers, Scope 1-3 GHG calculation templates, and vendor EHS audit questionnaires used by leading listed entities.",
    image: heroCommand,
    icp: "Sustainability Analysts, EHS Managers & ESG Taskforces",
    outcome: "Standardize enterprise ESG data collection across all operational facilities",
    criticalEvent: "Annual sustainability data gathering cycle across multi-plant networks",
    cta: "Download ESG Toolkit",
    spiced: {
      situation: "Internal sustainability teams struggling to collect consistent ESG data from multiple plant engineers and logistics vendors.",
      pain: "Unstandardized data collection forms result in unit conversion errors, missing data points, and failed external assurance audits.",
      impact: "Standardizes data collection across all sites, speeds up data compilation by 60%, and ensures third-party assurance audit readiness.",
      criticalEvent: "Quarterly sustainability data submission milestone.",
      decision: "Govnics battle-tested ESG calculation toolkits aligned directly with SEBI and GRI reporting standards."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 11. STATUTORY SERVICES LIST & ESTIMATOR SLIDES (/services & /estimator)
// ─────────────────────────────────────────────────────────────────────────────
export const servicesSpicedSlides: SpicedSlide[] = [
  {
    badge: "Statutory GRC Division",
    title: "Statutory Compliance & Advisory Overwatch.",
    highlight: "100% Audit Readiness Across All 10 Disciplines.",
    titleEnd: "",
    description: "End-to-end statutory registers, factory plan approvals, CLRA audits, and environmental clearances across all 28 Indian states with dedicated SLA guarantees.",
    image: heroAiDriven,
    icp: "Manufacturing Plants, GCCs, Retail Networks & Logistics Hubs",
    outcome: "100% Audit Readiness & Zero Legal Litigation Across All State Units",
    criticalEvent: "Annual statutory license renewals and state labour inspectorate audit drives",
    cta: "Explore All 10 Disciplines",
    spiced: {
      situation: "Enterprises operating diverse facilities across industrial, commercial, and warehousing sectors in India.",
      pain: "Fragmented multi-vendor compliance management causes compliance blind spots, missed challans, and legal notices.",
      impact: "Unified single-source overwatch, 100% statutory adherence, and zero director liability exposure.",
      criticalEvent: "State government compliance inspections and annual license renewals.",
      decision: "Govnics comprehensive 10-discipline statutory compliance program backed by 40-year ISI Group heritage."
    }
  },
  {
    badge: "Pan-India Legal Registers",
    title: "Central & State Rules Dynamic Alignment.",
    highlight: "Never Miss a Minimum Wage Revision.",
    titleEnd: "",
    description: "Automated tracking of Minimum Wages, PF, ESIC, Professional Tax, and Labour Welfare Funds with automated deadline alerts and inspection defense.",
    image: heroVerify,
    icp: "CHROs, Compliance Officers & CFOs in Multi-State Organizations",
    outcome: "Guaranteed Zero-Deviation Filings and automated wage revision alerts",
    criticalEvent: "Bi-annual state minimum wage revisions and monthly statutory cutoff dates",
    cta: "Explore Labour Scope",
    spiced: {
      situation: "Organizations operating branches across multiple states with differing local labour rules.",
      pain: "Local state governments announce wage revisions retroactively, leading to wage arrears, employee unrest, and statutory penalties.",
      impact: "Instant notification and payroll adjustments, eliminating compliance penalties and ensuring full statutory accuracy.",
      criticalEvent: "Publication of state labour department wage revision orders.",
      decision: "Govnics continuous gazette monitoring engine tracking changes across every Indian state."
    }
  },
  {
    badge: "Custom GRC Cost Estimator",
    title: "Transparent Scoping. Instant Architectural Sizing.",
    highlight: "Calculate Your Custom GRC Platform Investment.",
    titleEnd: "",
    description: "Configure your employee count, state footprint, and desired GRC modules to generate an instant architecture blueprint and commercial estimate.",
    image: heroCommand,
    icp: "Chief Compliance Officers, CFOs & Enterprise Risk Steering Committees",
    outcome: "Instant custom GRC architecture proposal and investment breakdown",
    criticalEvent: "Annual compliance budgeting cycle or board business case presentation",
    cta: "Run Scope Simulation",
    spiced: {
      situation: "Enterprise leaders seeking to modernize GRC infrastructure needing clear budget projections for executive approval.",
      pain: "Traditional consulting firms take 4-6 weeks just to deliver a high-level scoping proposal and pricing quote.",
      impact: "Generates an instant, mathematically modeled scope, staffing ratio, and investment roadmap in seconds.",
      criticalEvent: "Executive steering committee meeting or annual budgeting deadline.",
      decision: "Govnics algorithmic GRC cost and architecture simulator delivering instant transparency."
    }
  },
  {
    badge: "Factory & EHS Oversight",
    title: "Pollution Clearances & Machine Safety SOPs.",
    highlight: "Zero Factory Production Downtime.",
    titleEnd: "",
    description: "Machine inspection logs, hazardous waste tracking, and SPCB consent renewals managed proactively without disrupting manufacturing shifts.",
    image: verticalsFacility,
    icp: "Factory Managers, Industrial Safety Officers & Plant Directors",
    outcome: "Maintain uninterrupted plant operations and 100% EHS inspection clearance",
    criticalEvent: "State Pollution Control Board consent expiry or DISH safety inspection",
    cta: "Review EHS Coverage",
    spiced: {
      situation: "High-volume manufacturing plants operating multi-shift heavy machinery and industrial chemical processes.",
      pain: "Lapses in machine fitness certificates or hazardous waste manifests result in immediate closure orders and plant shut-downs.",
      impact: "Zero unplanned operational stoppages, continuous safety validation, and total peace of mind for plant leadership.",
      criticalEvent: "Annual factory license renewal or hazardous waste manifest submission.",
      decision: "Govnics certified factory safety engineers and computerized compliance calendar systems."
    }
  }
];

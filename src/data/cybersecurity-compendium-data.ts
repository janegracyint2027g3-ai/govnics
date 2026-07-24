export interface RegulatoryRequirement {
  requirement: string;
  coverage: string;
}

export interface MetricStat {
  kpi: string;
  before: string;
  after: string;
}

export interface SecurityOffering {
  id: string;
  title: string;
  nistFunction: "Govern" | "Identify" | "Protect" | "Detect" | "Respond" | "Recover" | "Cross-cutting";
  offeringNumber: number;
  overview: string;
  statementOfValue: string;
  before: string[];
  situation: string;
  components: string[];
  pentestIntegration: string;
  regulatoryAlignment: RegulatoryRequirement[];
  statistics: MetricStat[];
  benefits: string[];
  timeline: string[];
}

export const securityOfferings: SecurityOffering[] = [
  {
    id: "offering-grc",
    offeringNumber: 1,
    title: "AI Governance, Risk & Compliance (AI-GRC) Platform",
    nistFunction: "Govern",
    overview: "Enterprise-wide AI governance framework covering AI system inventory, risk classification, policy management, accountability structures, regulatory mapping, and board-level AI risk reporting. Aligns with NIST CSF 2.0 Govern function, NIST AI Risk Management Framework (AI RMF), SOC 2 Trust Service Criteria (CC1–CC9), ISO/IEC 42001 (AI Management System), and EU AI Act compliance requirements.",
    statementOfValue: "Establish the governance foundation that every AI deployment, security control, and compliance obligation depends upon.",
    before: [
      "No AI system inventory or classification",
      "Shadow AI usage proliferating across business units",
      "No AI governance policies or accountability structures",
      "Regulatory requirements undefined for AI systems",
      "Board has zero visibility into AI risk posture",
      "No alignment to NIST AI RMF or ISO 42001",
      "AI procurement lacks security gatekeeping"
    ],
    situation: "Organizations deploy GenAI, LLMs, AI agents, and copilots at enterprise scale without governance guardrails. Regulators worldwide — EU AI Act, NIST AI RMF, SEC cyber disclosure rules, DORA for financial services — now mandate documented AI risk management. Without governance, every downstream security control operates in a vacuum.",
    components: [
      "AI System Discovery & Inventory: Automated discovery of all AI systems, LLMs, agents, RAG pipelines, copilots, MCP servers, and model endpoints across the enterprise. Shadow AI detection and cataloging. AI model bill of materials (AI-BOM) generation. Third-party AI vendor inventory and risk profiling. Data pipeline mapping for training, fine-tuning, and inference.",
      "AI Risk Classification & Tiering: Risk classification per EU AI Act (Unacceptable, High, Limited, Minimal). NIST AI RMF Map-Measure-Manage alignment. Business impact analysis for each AI system. AI-specific threat modeling (STRIDE-AI, LINDDUN-AI). Risk scoring integrating adversarial AI threat intelligence.",
      "AI Governance Framework Design: AI governance policy suite (acceptable use, data handling, model lifecycle, incident response, human oversight). AI accountability and RACI matrix design. AI ethics board and review committee establishment. AI change management and approval workflows. Model versioning, deprecation, and retirement policies.",
      "Regulatory Compliance Mapping: Multi-framework mapping: NIST CSF 2.0, NIST AI RMF, SOC 2 TSC, ISO 27001, ISO 42001, EU AI Act, DORA, PCI-DSS, HIPAA, FedRAMP, CMMC, NCA (Saudi Arabia), PDPA, LGPD. Gap analysis against each applicable framework. Compliance roadmap with prioritized remediation. Evidence collection automation for audit readiness. Continuous compliance monitoring dashboard.",
      "Board-Level AI Risk Reporting: Executive AI risk dashboard with quantified metrics. AI risk heat maps and trend analysis. Regulatory compliance scorecards. Benchmarking against industry peers. Quarterly board presentation templates and reports."
    ],
    pentestIntegration: "Governance penetration testing: Red team exercises that test whether governance controls actually function under adversarial conditions. Policy bypass testing: Can AI systems be deployed or modified without triggering governance gates? Shadow AI simulation: Adversarial deployment of unauthorized AI systems to test detection capabilities. Supply chain governance testing: Can poisoned models enter the organization through procurement channels?",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Govern (GV.OC, GV.RM, GV.RR, GV.PO, GV.SC)", coverage: "Full" },
      { requirement: "NIST AI RMF — Map, Measure, Manage", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC1 (Control Environment), CC2 (Communication), CC3 (Risk Assessment), CC5 (Monitoring)", coverage: "Full" },
      { requirement: "ISO/IEC 42001 — AI Management System", coverage: "Full" },
      { requirement: "EU AI Act — Article 9 (Risk Management), Article 17 (Quality Management), Article 72 (Post-Market Monitoring)", coverage: "Full" },
      { requirement: "DORA — ICT Risk Management Framework", coverage: "Full" },
      { requirement: "FedRAMP — AI System Authorization", coverage: "Mapped" }
    ],
    statistics: [
      { kpi: "AI Asset Visibility", before: "20%", after: "100%" },
      { kpi: "AI Risk Identification", before: "Reactive", after: "Proactive & Continuous" },
      { kpi: "Security Coverage", before: "35%", after: "95%" },
      { kpi: "Compliance Readiness (Multi-Framework)", before: "40%", after: "100%" },
      { kpi: "AI Governance Maturity (CMMI Level)", before: "Level 1 – Initial", after: "Level 4 – Managed" },
      { kpi: "Board AI Risk Visibility", before: "None", after: "Real-Time Dashboard" },
      { kpi: "Shadow AI Detection Rate", before: "0%", after: "95%+" },
      { kpi: "Regulatory Audit Preparation Time", before: "Weeks", after: "Hours" },
      { kpi: "AI Policy Coverage", before: "Ad Hoc", after: "Enterprise-Grade, 100%" }
    ],
    benefits: [
      "Complete AI system visibility and inventory",
      "Enterprise-grade governance framework with clear accountability",
      "Multi-framework regulatory compliance (NIST, SOC 2, ISO, EU AI Act, DORA)",
      "Quantified, board-ready AI risk posture",
      "Shadow AI elimination",
      "Audit-ready evidence collection",
      "Reduced regulatory risk and legal exposure",
      "Foundation for all downstream AI security controls"
    ],
    timeline: [
      "Phase 1: AI Discovery & Inventory — Weeks 1–2",
      "Phase 2: Risk Classification & Gap Analysis — Weeks 2–4",
      "Phase 3: Governance Framework Design — Weeks 3–6",
      "Phase 4: Regulatory Mapping & Roadmap — Weeks 5–8",
      "Phase 5: Board Reporting & Continuous Monitoring Setup — Weeks 7–10",
      "Total: 8–12 Weeks (Implementation), Ongoing (Managed Governance)"
    ]
  },
  {
    id: "offering-posture",
    offeringNumber: 2,
    title: "AI Risk Posture Management & Continuous Assessment",
    nistFunction: "Identify",
    overview: "Continuous, automated assessment of enterprise AI systems, infrastructure, and model supply chains to identify vulnerabilities, misconfigurations, data exposure risks, compliance gaps, and emerging AI-specific attack vectors in real time. Integrates AI-driven penetration testing for proactive risk discovery.",
    statementOfValue: "Transform AI risk from an annual snapshot to a real-time, continuously validated security posture.",
    before: [
      "Annual or ad hoc security assessments",
      "Hundreds of AI applications with unknown risk profiles",
      "No continuous monitoring of AI attack surfaces",
      "AI model vulnerabilities discovered only after exploitation",
      "Manual risk assessments cannot keep pace with AI deployment velocity"
    ],
    situation: "Enterprise AI systems change continuously — models are retrained, fine-tuned, agents are modified, RAG knowledge bases are updated, new integrations are deployed. Point-in-time assessments become obsolete within weeks. Organizations need continuous, AI-powered risk posture management that adapts at the speed of AI development.",
    components: [
      "AI Attack Surface Discovery: Continuous discovery and classification of all AI endpoints, APIs, model serving infrastructure, vector databases, embedding services, and agent orchestration layers. External AI attack surface monitoring (publicly exposed model endpoints, leaked API keys, model artifacts). AI supply chain risk mapping (pre-trained models, third-party APIs, data sources, plugins, MCP servers). Model dependency graph generation and risk scoring.",
      "AI Vulnerability Assessment: Automated vulnerability scanning of AI infrastructure (GPU clusters, model serving platforms, ML pipelines). Model-specific vulnerability assessment (adversarial robustness, data poisoning susceptibility, extraction risk). AI application security testing (OWASP Top 10 for LLM Applications, OWASP AI Exchange). Prompt injection surface mapping and risk classification. Data pipeline security assessment (training data integrity, PII exposure, data poisoning vectors).",
      "AI Configuration & Drift Monitoring: Continuous monitoring for model configuration drift. AI infrastructure misconfiguration detection. Access control validation for AI systems. Monitoring of model performance degradation (potential indicator of compromise or data drift). API security configuration assessment.",
      "AI Risk Quantification & Scoring: FAIR-based AI risk quantification (Factor Analysis of Information Risk). AI-specific risk scoring incorporating adversarial threat likelihood and business impact. Risk heat maps with drill-down to individual AI systems. Trend analysis and risk trajectory forecasting. Integration with enterprise GRC platforms (ServiceNow, Archer, OneTrust).",
      "Continuous Compliance Monitoring: Automated control validation against NIST CSF 2.0, SOC 2, ISO 42001, EU AI Act. Evidence generation for auditors. Compliance drift detection and alerting. Regulatory change impact analysis."
    ],
    pentestIntegration: "Continuous AI Penetration Testing as a Service (AI-PTaaS): AI agents continuously probe AI systems for vulnerabilities, simulating real-world attacker behavior. Automated exploit validation: When vulnerabilities are identified, AI-driven testing attempts safe exploitation to confirm severity. Attack path discovery: AI graph analysis (per G-CTR methodology) maps multi-step attack paths across AI infrastructure. Continuous red teaming: AI red team agents run 24/7 against production AI systems within defined safety boundaries. Penetration testing automation: Routine pentest activities automated with AI, reserving human expertise for complex, creative attack scenarios.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Identify (ID.AM, ID.RA, ID.IM)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC3.1 (Risk Assessment), CC3.2 (Fraud Risk), CC3.4 (Change Management)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.9, A.5.23 (Information Security Risk)", coverage: "Full" },
      { requirement: "EU AI Act — Article 9 (Risk Management System)", coverage: "Full" },
      { requirement: "NIST AI RMF — Map 1–4, Measure 1–2", coverage: "Full" },
      { requirement: "DORA — Article 6 (ICT Risk Management)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "AI Asset Visibility", before: "20%", after: "100%" },
      { kpi: "AI Risk Identification", before: "Reactive", after: "Proactive & Continuous" },
      { kpi: "Vulnerability Assessment Frequency", before: "Annual", after: "Continuous" },
      { kpi: "Security Coverage", before: "35%", after: "95%" },
      { kpi: "Compliance Readiness", before: "40%", after: "100%" },
      { kpi: "Mean Time to Identify AI Risk", before: "Weeks", after: "Minutes" },
      { kpi: "AI Attack Surface Coverage", before: "15%", after: "95%" },
      { kpi: "Risk Quantification Accuracy", before: "Qualitative Only", after: "FAIR-Quantified" }
    ],
    benefits: [
      "Real-time AI risk posture visibility",
      "Continuous vulnerability discovery and prioritization",
      "AI attack surface reduction",
      "Compliance drift detection and remediation",
      "Quantified risk metrics for investment decisions",
      "Integration with existing GRC and AI-MDR platforms",
      "Dramatically reduced window of exposure"
    ],
    timeline: [
      "Phase 1: AI Discovery & Baseline Assessment — Weeks 1–3",
      "Phase 2: Continuous Monitoring Deployment — Weeks 2–4",
      "Phase 3: AI-Driven Penetration Testing Activation — Weeks 3–5",
      "Phase 4: Risk Quantification & Dashboard Setup — Weeks 4–6",
      "Phase 5: Compliance Monitoring Integration — Weeks 5–8",
      "Total: 6–8 Weeks (Deployment), Ongoing (Continuous Monitoring & PTaaS)"
    ]
  },
  {
    id: "offering-compliance",
    offeringNumber: 3,
    title: "Regulatory Compliance Management",
    nistFunction: "Govern",
    overview: "Custom mapping and continuous compliance alignment for global regulations (EU AI Act, HIPAA, GDPR, DORA, FedRAMP, CMMC, NCA) mapped to AI infrastructure. Automates control mapping, evidence collection, and gap remediation.",
    statementOfValue: "Navigate the complex global AI regulatory web with automated compliance alignment and audit readiness.",
    before: [
      "Spreadsheet-based, fragmented compliance management",
      "Inability to track compliance across multiple state/national boundaries",
      "Outdated evidence files gathered manually for annual audits",
      "High risk of regulatory fines due to unmapped shadow models"
    ],
    situation: "Global regulators are actively auditing enterprise AI systems. Manual compliance logging across thousands of model endpoints is error-prone, draining security resources and risking severe compliance penalties.",
    components: [
      "Cross-Framework Compliance Engine: Automatic mapping of controls between NIST AI RMF, ISO 42001, and local laws.",
      "Automated Evidence Collection: Continuous scraping of model access logs, training audits, and system settings.",
      "Compliance Gap Remediation: Direct notification and ticketing for drift in control baselines.",
      "Vendor Compliance Vetting: Automatic scanning of third-party AI APIs for regulatory compliance certificates."
    ],
    pentestIntegration: "Compliance bypass testing: Simulated attacks attempting to bypass model safety controls (e.g. data residency locks) to verify that GRC compliance alarms trigger correctly.",
    regulatoryAlignment: [
      { requirement: "EU AI Act — Articles 9, 10, 13, 14, 15, 17, 72", coverage: "Full" },
      { requirement: "GDPR — Articles 22, 25 (Privacy by Design)", coverage: "Full" },
      { requirement: "HIPAA — §164.308 (Administrative Safeguards)", coverage: "Full" },
      { requirement: "DORA — ICT Risk Management & Compliance", coverage: "Full" },
      { requirement: "ISO/IEC 42001 — Annex A (Control Objectives)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Compliance Alignment Rate", before: "30%", after: "100%" },
      { kpi: "Evidence Collection Duration", before: "Weeks", after: "Real-time / Seconds" },
      { kpi: "Audit Pass Rate", before: "65%", after: "99.8%" },
      { kpi: "Compliance Monitoring Cost", before: "High Overhead", after: "75% Reduction" }
    ],
    benefits: [
      "Elimination of manually compiled compliance binders",
      "Automated drift alerts when AI changes breach regulatory thresholds",
      "Single-pane view of global multi-framework compliance scorecards",
      "Protection from major legal liabilities and statutory fines"
    ],
    timeline: [
      "Weeks 1–2: Compliance Mapping & Scope Definition",
      "Weeks 2–4: Automated Evidence Scraping Setup",
      "Weeks 4–6: Dashboard Integration & Compliance Audit Mock"
    ]
  },
  {
    id: "offering-risk",
    offeringNumber: 4,
    title: "AI Risk Assessment & Threat Modeling",
    nistFunction: "Identify",
    overview: "Proactive threat modeling and comprehensive risk assessments for enterprise AI pipelines, autonomous agents, and training environments using STRIDE-AI and LINDDUN-AI frameworks.",
    statementOfValue: "Identify and intercept architectural design flaws before writing a single line of AI orchestration code.",
    before: [
      "AI systems built with standard application risk models",
      "No security review of model training data pipelines",
      "Lack of STRIDE-AI threat mapping for agents and tools",
      "Unknown risk exposure from public API model integrations"
    ],
    situation: "AI models, agent frameworks, and vectors introduce entirely new data and control flow interfaces. Relying on legacy threat models leaves critical structural vulnerabilities unaddressed, leading to expensive post-deployment rewrites.",
    components: [
      "STRIDE-AI Threat Modeling: Specialized modeling of LLM APIs, agent chains, and vector indexes.",
      "Data Flow Analysis: Tracking training, fine-tuning, retrieval, and inference data pipelines.",
      "Model Risk Profiling: Vetting of weights, training datasets, and dependencies for leakage risks.",
      "Architectural Risk Remediation: Actionable architecture designs to mitigate discovered flaws."
    ],
    pentestIntegration: "Algorithmic validation: Automated validation checks run against threat models to verify that identified mitigations are implemented correctly in the codebase.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Identify (ID.RA)", coverage: "Full" },
      { requirement: "NIST AI RMF — Measure 2.4, 2.6 (Threat Modeling)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC3.1 (Risk Assessment)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.23 (Security Risk Assessments)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Design Flaws Caught Before Dev", before: "10%", after: "90%+" },
      { kpi: "Development Re-work Cost", before: "Severe", after: "60% Reduction" },
      { kpi: "Threat Model Coverage", before: "5%", after: "100%" },
      { kpi: "Risk Assessment Speed", before: "Weeks", after: "Days" }
    ],
    benefits: [
      "Secure-by-design AI workloads minimizing technical debt",
      "Structured risk prioritization aligned to business impact",
      "Complete mapping of training and inference dependencies",
      "Clear developer security requirements prior to coding"
    ],
    timeline: [
      "Weeks 1–2: Architecture Discovery & Scoping",
      "Weeks 2–3: STRIDE-AI Modeling Workshops",
      "Weeks 3–4: Risk Report Delivery & Architecture Approval"
    ]
  },
  {
    id: "offering-architecture",
    offeringNumber: 5,
    title: "AI Security Architecture & Zero Trust for AI",
    nistFunction: "Protect",
    overview: "Design and implementation of security architecture for AI systems grounded in Zero Trust principles — never trust, always verify — applied to AI model serving, agent orchestration, data pipelines, and inference infrastructure. Includes AI-aware network segmentation, identity-centric access controls, and AI-specific security patterns.",
    statementOfValue: "Architect AI systems so that no component — model, agent, data pipeline, or API — operates with implicit trust.",
    before: [
      "AI systems deployed in flat network architectures",
      "Model endpoints accessible without authentication",
      "Agent-to-agent communication unrestricted",
      "Training and inference environments sharing resources",
      "No AI-specific network segmentation",
      "Data pipelines lacking isolation between tenants",
      "AI infrastructure outside security architecture review"
    ],
    situation: "AI systems introduce new communication patterns — model-to-model, agent-to-agent, agent-to-tool, RAG retrieval-to-inference — that traditional network security architectures do not account for. Zero Trust must extend to every AI interaction.",
    components: [
      "AI Zero Trust Architecture Design: AI-aware Zero Trust architecture blueprint. Identity-centric access control for models, agents, and APIs. AI workload micro-segmentation strategy. AI-specific policy decision points (PDP) and policy enforcement points (PEP). Continuous verification for all AI system interactions.",
      "AI Network Security Architecture: AI infrastructure network segmentation (training, inference, data). GPU/TPU cluster network isolation. Model serving platform network controls. Agent communication network policies. AI data pipeline network segmentation.",
      "AI Identity & Access Management: AI system identity management (model identities, agent identities). Machine-to-machine authentication for AI components. API key management and rotation for model endpoints. Service mesh security for AI microservices. AI workload certificate management.",
      "AI Infrastructure Hardening: Hardened AI platform configurations (Kubernetes, Docker, GPU drivers). Model serving platform security hardening. MLOps pipeline security controls. AI development environment isolation. Secure AI model deployment patterns.",
      "AI-Aware Encryption & Key Management: Encryption for AI data at rest, in transit, and in use. Homomorphic encryption evaluation for AI inference. Secure enclaves for model protection. AI-specific key management practices. Federated learning privacy architecture."
    ],
    pentestIntegration: "Architecture penetration testing to validate Zero Trust controls for AI. Lateral movement simulation within AI infrastructure. Privilege escalation testing from compromised AI agent to infrastructure. Network segmentation bypass testing. AI identity and authentication bypass attempts.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Protect (PR.AA, PR.DS, PR.PS, PR.IR)", coverage: "Full" },
      { requirement: "NIST SP 800-207 (Zero Trust Architecture)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC6.1, CC6.2, CC6.3, CC6.6 (System Boundaries)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.15, A.8.20 (Network Security), A.8.21 (Web Services)", coverage: "Full" },
      { requirement: "EU AI Act — Article 15 (Cybersecurity)", coverage: "Full" },
      { requirement: "DORA — Article 9 (Protection & Prevention)", coverage: "Full" },
      { requirement: "CMMC — AC, SC Domains", coverage: "Full" }
    ],
    statistics: [
      { kpi: "AI Zero Trust Maturity", before: "Level 0", after: "Level 4 (Optimal)" },
      { kpi: "AI Network Segmentation", before: "None", after: "Full Micro-Segmentation" },
      { kpi: "AI Identity Management", before: "Ad Hoc", after: "Enterprise IAM Integration" },
      { kpi: "AI Infrastructure Hardening Score", before: "30%", after: "95%" },
      { kpi: "Lateral Movement Success (Red Team)", before: "80%", after: "<5%" }
    ],
    benefits: [
      "Zero Trust architecture for all AI workloads",
      "Reduced blast radius of AI system compromise",
      "AI-aware network and identity controls",
      "Hardened AI infrastructure",
      "Regulatory compliance for AI infrastructure security",
      "Defense-in-depth for AI attack surfaces"
    ],
    timeline: [
      "Weeks 1–3: Network & IAM Boundary Assessment",
      "Weeks 2–6: Micro-segmentation & IAM Controls Deployment",
      "Weeks 6–10: Validation Audits & Penetration Testing",
      "Total: 6–10 Weeks (Design & Implementation)"
    ]
  },
  {
    id: "offering-llm",
    offeringNumber: 6,
    title: "AI Security for LLMs, Agents, RAG & Copilots",
    nistFunction: "Protect",
    overview: "End-to-end security architecture, hardening, and protective controls for the enterprise GenAI stack — LLMs, AI agents, RAG pipelines, copilots, MCP servers, vector databases, embedding services, model serving platforms, and autonomous workflows. Implements defense-in-depth across the entire AI lifecycle.",
    statementOfValue: "Secure the entire AI lifecycle — from data ingestion through model training, deployment, inference, and agent action.",
    before: [
      "LLMs deployed without input validation or output filtering",
      "AI agents with unrestricted tool access and no guardrails",
      "RAG pipelines with unprotected knowledge bases",
      "Vector databases accessible without authentication",
      "No model integrity verification",
      "Copilots with excessive permissions and data access",
      "No secure prompt engineering practices",
      "AI workflows lacking human-in-the-loop controls"
    ],
    situation: "Enterprise GenAI deployments create a layered attack surface spanning data, models, APIs, orchestration layers, and autonomous agent actions. Each layer requires specialized security controls that traditional application security does not address.",
    components: [
      "LLM Security Hardening: Input validation and sanitization frameworks. Output filtering and content safety guardrails. System prompt protection and isolation. Context window management and injection defense. Token-level security controls. Rate limiting and abuse prevention. Model access control and authentication. Secure prompt engineering best practices and templates.",
      "AI Agent Security Architecture: Principle of least privilege for agent tool access. Agent action sandboxing and isolation. Human-in-the-loop controls for high-risk actions. Agent memory security and compartmentalization. Multi-agent trust boundaries and authentication. Agent behavior monitoring and anomaly detection. Kill switch and emergency shutdown mechanisms. Agent supply chain security (plugins, tools, MCP servers).",
      "RAG Pipeline Security: Knowledge base integrity controls. Document sanitization and adversarial content filtering. Retrieval query sanitization. Cross-tenant isolation and access controls. Vector database encryption at rest and in transit. Embedding security and inversion attack prevention. Chunking strategy security review. Source attribution and provenance tracking.",
      "Copilot & AI Assistant Security: Data access scoping and classification-based controls. Permission boundary enforcement. Sensitive data redaction in AI outputs. Conversation logging and audit trails. Multi-user isolation and tenant security. Integration security (CRM, ERP, email, code repositories).",
      "MCP Server & Plugin Security: MCP server authentication and authorization. Plugin security assessment and sandboxing. Tool registration security validation. Cross-plugin isolation. API security for MCP endpoints. Plugin supply chain integrity verification.",
      "AI Data Security & Privacy: Training data classification and labeling. PII detection and redaction in training data. Data poisoning detection and prevention. Differential privacy implementation guidance. Data retention and right-to-be-forgotten for AI systems. Synthetic data generation for privacy preservation. Data lineage tracking and provenance verification.",
      "AI Model Security & IP Protection: Model watermarking and fingerprinting. Model extraction attack prevention. Inference API access control. Model serialization security (preventing deserialization attacks). Model registry security hardening. Intellectual property protection strategies. Model licensing and usage monitoring.",
      "AI API Security: API authentication and rate limiting for model endpoints. Input/output schema validation. API abuse detection and prevention. Multi-tenant API isolation. Prompt-response logging with privacy controls. API versioning security."
    ],
    pentestIntegration: "Automated security testing of every GenAI layer using AI-driven tools. Continuous prompt injection and jailbreak testing against deployed guardrails. Agent boundary testing using autonomous AI attackers. RAG poisoning simulation and defense validation. API fuzzing and abuse testing with intelligent payloads. End-to-end attack chain testing (data poisoning → model manipulation → agent exploitation).",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Protect (PR.AA, PR.DS, PR.PS, PR.IR)", coverage: "Full" },
      { requirement: "NIST AI RMF — Manage 1.1–1.4, 2.1–2.7, 3.1–3.5, 4.1–4.5", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC6.1 (Logical Access), CC6.2 (User Authentication), CC6.3 (User Authorization), CC6.7 (Data Disposal), CC6.8 (Protection from Unauthorized Access)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.15 (Access Control), A.8.24 (Use of Cryptography), A.8.25 (Secure Development Lifecycle)", coverage: "Full" },
      { requirement: "ISO/IEC 42001 — Annex B.2 (Data), B.5 (AI System Development), B.6 (AI System Deployment)", coverage: "Full" },
      { requirement: "EU AI Act — Article 10 (Data Governance), Article 13 (Transparency), Article 14 (Human Oversight), Article 15 (Cybersecurity)", coverage: "Full" },
      { requirement: "GDPR — Article 22 (Automated Decision-Making), Article 25 (Data Protection by Design)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Prompt Injection Success Rate", before: "60%", after: "<5%" },
      { kpi: "Data Leakage Risk", before: "High", after: "Low" },
      { kpi: "AI Governance Coverage", before: "30%", after: "100%" },
      { kpi: "Agent Security Controls", before: "Limited", after: "Enterprise-Grade" },
      { kpi: "RAG Pipeline Security", before: "Unprotected", after: "Defense-in-Depth" },
      { kpi: "OWASP LLM Top 10 Coverage", before: "10%", after: "100%" },
      { kpi: "AI API Abuse Detection", before: "None", after: "Real-Time" },
      { kpi: "Model IP Protection", before: "None", after: "Multi-Layer" }
    ],
    benefits: [
      "Secure AI deployments from model weights to agentic tools",
      "Defense-in-depth across the entire GenAI stack",
      "Regulatory compliance (EU AI Act, NIST AI RMF, SOC 2)",
      "Reduced AI-specific attack surface",
      "Enterprise trust in AI systems",
      "Protected AI intellectual property",
      "Secure autonomous agent operations",
      "Privacy-preserving AI data handling"
    ],
    timeline: [
      "Phase 1: GenAI Architecture Security Review — Weeks 1–2",
      "Phase 2: LLM & RAG Security Hardening — Weeks 2–5",
      "Phase 3: Agent Security Architecture & Controls — Weeks 4–7",
      "Phase 4: API & Integration Security — Weeks 6–8",
      "Phase 5: Data Security & Privacy Controls — Weeks 7–9",
      "Phase 6: Validation & Continuous Testing Setup — Weeks 8–10",
      "Total: 4–10 Weeks"
    ]
  },
  {
    id: "offering-hunting",
    offeringNumber: 7,
    title: "Autonomous Threat Hunting Platform",
    nistFunction: "Detect",
    overview: "Deploy AI-driven autonomous threat hunters that continuously search for indicators of compromise, anomalous behaviors, insider threats, ransomware activity, advanced persistent threats, and AI-specific threat indicators across the enterprise environment. Powered by behavioral analytics, machine learning, and autonomous AI reasoning.",
    statementOfValue: "Find attackers before they trigger an incident — hunt threats proactively, not reactively.",
    before: [
      "Threat hunting is manual, ad hoc, and analyst-dependent.",
      "Limited hunting coverage leaving over 80% of the environment unmonitored.",
      "High false positive rates overwhelming the security operations team.",
      "Insider threats and model manipulation discovered weeks after the event.",
      "No proactive tracking of advanced persistent threats (APTs) or living-off-the-land TTPs.",
      "AI-specific threat indicators (data poisoning, model drift) completely unmonitored."
    ],
    situation: "Sophisticated attackers evade automated detection by living off the land, using legitimate credentials, and exploiting trusted processes. AI-specific threats — model compromise, data poisoning, agent manipulation — generate subtle indicators that traditional detection misses entirely. Autonomous AI threat hunters can continuously generate and test hypotheses at machine scale.",
    components: [
      "Autonomous Hypothesis Generation (7.1): AI-driven creation of hunting plans based on real-time global threat intelligence, historical telemetry, and emerging TTPs. Eliminates the need for manual, analyst-dependent hypothesis formulation.",
      "Behavioral Analytics & Anomaly Detection (7.2): Continuous baselining of user, model, agent, and network behaviors. Utilizes advanced machine learning models to detect subtle deviations, indicating compromise, lateral movement, or policy bypass.",
      "AI-Specific Threat Hunting (7.3): Continuous monitoring of enterprise AI pipelines, LLM endpoints, and vector databases. Proactively hunts for indicators of model manipulation, prompt injections, training data poisoning, and unauthorized weights access.",
      "Insider Threat & Abuse Identification (7.4): Tracking of privileged accounts, developer environments, and service credentials. Analyzes access patterns to detect data exfiltration, shadow AI deployment, and unauthorized tool access.",
      "Advanced Persistent Threat (APT) Hunting (7.5): Persistent search for indicators of nation-state APT activity, living-off-the-land techniques, and stealthy command-and-control (C2) channels that bypass standard automated security alerts.",
      "Automated Investigation & Remediation (7.6): Rapid triage and cross-telemetry correlation of threat hunt findings. Generates detailed investigation reports, maps full attack paths, and triggers automated quarantine or containment workflows."
    ],
    pentestIntegration: "Hunting coverage validation: Simulated adversarial activities (living off the land, model manipulation) run against telemetry systems to verify that threat hunters trigger correct hypotheses.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Detect (DE.AE, DE.CM)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC4.1 (Monitoring), CC7.1, CC7.2", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.25, A.8.16 (Monitoring)", coverage: "Full" },
      { requirement: "DORA — Article 10 (Detection)", coverage: "Full" },
      { requirement: "NIST SP 800-53 — SI-4 (System Monitoring)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Threat Discovery Time", before: "Weeks", after: "Hours" },
      { kpi: "False Positive Alert Rates", before: "High Baseline", after: "70% Reduction" },
      { kpi: "Threat Hunting Environment Coverage", before: "20%", after: "95%+" },
      { kpi: "Insider Threat Detection Window", before: "Reactive / Weeks", after: "Real-Time / Continuous" },
      { kpi: "APT Dwell Time in Infrastructure", before: "200+ Days", after: "<30 Days" },
      { kpi: "Hypothesis Tests Completed (Weekly)", before: "5–10 tests", after: "500+ tests" }
    ],
    benefits: [
      "Proactive threat discovery before business-critical impact occurs.",
      "Data-driven security posture with unified log correlation.",
      "Substantially reduced SOC workload through automated hypothesis testing.",
      "Continuous validation of detection systems against emerging APT profiles."
    ],
    timeline: [
      "Phase 1: Telemetry Integration & Network Baselining — Weeks 1–2",
      "Phase 2: Hunting Hypothesis & Custom Playbook Development — Weeks 2–4",
      "Phase 3: AI Hunting Agent Deployment & Threshold Calibration — Weeks 3–6",
      "Phase 4: Adversarial Validation & Performance Optimization — Weeks 5–8",
      "Total: 6–8 Weeks (Deployment)"
    ]
  },
  {
    id: "offering-bas",
    offeringNumber: 8,
    title: "AI-Driven Breach & Attack Simulation Platform (AI-BAS)",
    nistFunction: "Detect",
    overview: "Continuous, AI-powered simulation of real-world attack scenarios — ransomware, phishing, insider threats, lateral movement, privilege escalation, cloud attacks, AI-specific attacks, and nation-state TTPs — across the entire enterprise environment to continuously validate security defenses and identify exploitable attack paths.",
    statementOfValue: "Continuously validate that every security control works — using AI attackers that never sleep.",
    before: [
      "Annual penetration testing as the only form of security validation.",
      "Security controls (firewalls, EDR, SIEM) remain untested between audits.",
      "Unknown detection gaps and blind spots across the cyber kill chain.",
      "Security investments unable to demonstrate quantifiable ROI or effectiveness."
    ],
    situation: "Attackers operate continuously. A single annual penetration test leaves 364 days of unvalidated security exposure. AI-BAS provides continuous, automated attack simulation that validates every security control, detects configuration drift, and quantifies security effectiveness in real time.",
    components: [
      "Continuous Attack Simulation Engine (6.1): Automated, continuous simulation of the full MITRE ATT&CK kill chain across endpoints, cloud systems, and networks. Automatically generates and executes hundreds of attack scenarios to validate security defenses without business disruption.",
      "AI-Specific Adversarial Simulation (6.2): Automated simulation of AI-specific attacks, including prompt injections, jailbreaks, training data poisoning, vector database manipulation, and agent execution bypasses. Mapped to the MITRE ATLAS matrix to validate security guardrails.",
      "Attack Path & Lateral Movement Analysis (6.3): Graph-based visualization and validation of complex multi-step attack paths across enterprise cloud networks. Identifies reachable high-value targets, active exploit chains, and lateral movement opportunities before attackers can exploit them.",
      "Defense Control Validation & Mapping (6.4): Automated verification of security control effectiveness. Maps simulation results directly to firewall rules, EDR configurations, SIEM alert filters, and SOAR response playbooks to highlight detection gaps and configuration drifts.",
      "Security Effectiveness Benchmarking & Reporting (6.5): Quantified, board-ready security posture scoring and peer benchmarking. Provides historical trend analysis, risk quantification, and actionable remediation blueprints to demonstrate security ROI and drive optimization."
    ],
    pentestIntegration: "Automated penetration testing at scale: Autonomous agents adapt payloads dynamically based on defensive system responses, mimicking human red team tactics synchronously.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Detect (DE.AE, DE.CM), Identify (ID.RA)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC4.1, CC7.1, CC7.2, CC7.3", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.24, A.8.16 (Monitoring)", coverage: "Full" },
      { requirement: "DORA — Article 25 (ICT Testing), Article 26 (TLPT)", coverage: "Full" },
      { requirement: "PCI-DSS 4.0 — Requirement 11.3 (Penetration Testing)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Security Validation Frequency", before: "Annual/Ad Hoc", after: "Daily/Continuous" },
      { kpi: "MITRE ATT&CK & ATLAS Coverage", before: "15%", after: "95%+" },
      { kpi: "Security Effectiveness Score", before: "60%", after: "95%+" },
      { kpi: "Mean Control Validation Time", before: "Weeks", after: "Minutes" },
      { kpi: "Attack Path Graph Visibility", before: "None / Speculative", after: "Full Graph / Real-Time" }
    ],
    benefits: [
      "Continuous, automated security validation 24/7/365.",
      "Real-time identification and alerting of misconfigurations and drifts.",
      "Comprehensive coverage mapped directly to MITRE ATT&CK and ATLAS.",
      "Quantifiable security posture metrics for executive and board reporting."
    ],
    timeline: [
      "Phase 1: Environment Profiling & Integration — Weeks 1–3",
      "Phase 2: Attack Scenario & Simulation Configuration — Weeks 2–4",
      "Phase 3: AI Attack Agent Deployment & Run Scheduling — Weeks 3–5",
      "Phase 4: Dashboard Integration & Executive Reporting Setup — Weeks 4–6",
      "Total: 4–6 Weeks (Implementation)"
    ]
  },
  {
    id: "offering-mdr",
    offeringNumber: 9,
    title: "AI Managed Detection & Response (AI-MDR)",
    nistFunction: "Respond",
    overview: "AI-powered Managed Detection and Response service leveraging autonomous threat analysis, behavioral analytics, attack correlation, automated triage, intelligent investigation, and response orchestration — operating 24x7x365 with AI analysts augmenting human expertise.",
    statementOfValue: "Detect and respond to threats at machine speed, with human expertise where it matters most.",
    before: [
      "Severe SOC analyst shortage causing critical alert backlogs.",
      "Severe alert fatigue overwhelming the security team.",
      "Mean time to detect (MTTD) measured in hours or days.",
      "Mean time to respond (MTTR) measured in days or weeks.",
      "Traditional MDR solutions lacking any AI-specific telemetry or monitoring."
    ],
    situation: "Enterprise security operations generate millions of daily events. Human analysts cannot keep pace. AI-MDR combines autonomous AI analysts that handle L1 triage, L2 investigation, and initial response with human experts providing strategic oversight, complex incident handling, and adversarial resilience.",
    components: [
      "Multi-Signal Detection Engine (8.1): Real-time ingestion and correlation of telemetry across endpoints, identity, network, cloud infrastructure, and AI pipelines. Detects both legacy cyber threats and novel AI attack vectors.",
      "Autonomous Triage & Alert Contextualization (8.2): Deploying autonomous AI analysts to handle Tier-1 alert triage, filtering out false positives by over 80% and enriching true alerts with full attack path and threat intelligence context.",
      "Automated Response & Quarantine Orchestration (8.3): Millisecond-level response orchestration, including isolating compromised hosts, revoking leaked API keys, blocking malicious IPs, and quarantining poisoned RAG nodes.",
      "AI-Specific Threat Monitoring & Guardrails (8.4): Dedicated monitoring for LLM interactions, agent actions, and vector store queries. Identifies jailbreaks, prompt injections, and data leakage in real time.",
      "24x7x365 Human-in-the-Loop Expert Oversight (8.5): Strategic oversight and advanced forensics provided by elite security analysts. Combines machine speed with human intelligence for complex threat hunting and response."
    ],
    pentestIntegration: "Rule validation: Automated attack payloads injected continuously to verify that EDR rules and SOAR response playbooks execute correctly under pressure.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Detect (DE.AE, DE.CM), Respond (RS.AN, RS.MI, RS.CO)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC7.1, CC7.2, CC7.3, CC7.4", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.24, A.5.25, A.5.26 (Incident Response)", coverage: "Full" },
      { requirement: "DORA — Article 10, Article 11 (Response & Recovery)", coverage: "Full" },
      { requirement: "PCI-DSS 4.0 — Requirement 12.10 (Incident Response)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Mean Time to Detect (MTTD)", before: "8 Hours", after: "5 Minutes" },
      { kpi: "Mean Time to Respond (MTTR)", before: "2 Days", after: "20 Minutes" },
      { kpi: "Tier-1 Alert Triage Automation", before: "0%", after: "80%+" },
      { kpi: "Security Operations Overhead", before: "Extremely High", after: "Optimized (50% reduction)" },
      { kpi: "AI-Specific Threat Monitoring", before: "None", after: "100% Comprehensive" }
    ],
    benefits: [
      "Machine-speed threat detection and containment",
      "Completely eliminated alert fatigue for the internal security team",
      "Cost-optimized 24/7/365 coverage backed by strict SLA guarantees",
      "Specialized monitoring for GenAI, LLMs, and agentic workflows"
    ],
    timeline: [
      "Phase 1: Log Telemetry & API Endpoint Integration — Weeks 1–2",
      "Phase 2: Automated Playbook Mapping & SIEM Tuning — Weeks 2–4",
      "Phase 3: AI Agent Training, Threshold Tuning & MDR Launch — Weeks 4–6",
      "Total: 4–6 Weeks (Onboarding)"
    ]
  },
  {
    id: "offering-soc",
    offeringNumber: 10,
    title: "Agentic SOC & Autonomous Security Operations",
    nistFunction: "Respond",
    overview: "Fully automated, agentic Security Operations Center (SOC) utilizing autonomous LLM-based security analysts to correlate cross-telemetry alerts, run playbooks, execute memory analysis, isolate hosts, and remediate incidents autonomously.",
    statementOfValue: "Shift from human-reliant, ticket-chasing SOC structures to self-driving, agent-coordinated cyber defense.",
    before: [
      "Security analysts spending hours writing tickets and chasing false positives",
      "Fragmented security tools requiring manual data compilation and correlation",
      "Slow incident response cycles allowing ransomware to spread laterally"
    ],
    situation: "Modern adversaries deploy automated, AI-driven exploit tools that move faster than human SOC analysts can type. Defensive operations must achieve machine speed. Agentic SOC uses groups of collaborative LLM agents to investigate, contain, and remediate alerts in seconds.",
    components: [
      "Multi-Agent Coordination Engine: Auto-dispatching specialized agents (correlator, forensic agent, firewall agent).",
      "Autonomous Log Correlation: Parsing SIEM, cloud trail, and identity logs synchronously.",
      "Self-Healing Containment: Millisecond-level automated host isolation and API token revocation.",
      "Human-in-the-Loop Gateway: Modern notification cards allowing human approval for high-risk containment actions."
    ],
    pentestIntegration: "Agent robustness testing: Purple team simulations attempting to deceive the SOC agents via indirect prompt injections embedded in server logs to ensure resilience against manipulation.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Respond (RS.AN, RS.MI, RS.CO)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC7.2 (Anomaly Evaluation), CC7.3 (Response)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.25 (Assessment & Decision on InfoSec Events)", coverage: "Full" },
      { requirement: "DORA — Article 11 (Response & Mitigation)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Incident Containment Speed", before: "Hours", after: "Seconds" },
      { kpi: "Triage Automation Rate", before: "5%", after: "99.2%" },
      { kpi: "SOC Operating Overhead", before: "Severe", after: "70% Reduction" },
      { kpi: "Playbook Execution Time", before: "Minutes", after: "Milliseconds" }
    ],
    benefits: [
      "Autonomous 24/7 incident investigation and containment",
      "Drastic reduction in MTTR to prevent ransomware propagation",
      "Substantial savings in security staff overhead and recruiting costs",
      "Self-optimizing playbooks that learn from historical alert context"
    ],
    timeline: [
      "Weeks 1–3: Agent Orchestration Engine Setup",
      "Weeks 3–6: Tool Integrations & Playbook Mapping",
      "Weeks 6–8: Parallel Sandbox Testing & Guardrail Calibration",
      "Week 8+: Full Production Autonomy"
    ]
  },
  {
    id: "offering-incident",
    offeringNumber: 11,
    title: "AI Incident Response & Recovery",
    nistFunction: "Recover",
    overview: "Pre-engineered playbook blueprints, backup isolation protocols, and specialized response procedures tailored specifically for AI system failures, data poisoning, prompt injection breaches, and model hijacking incidents.",
    statementOfValue: "Ensure business continuity and rapid recovery when core enterprise AI services are compromised or poisoned.",
    before: [
      "Disaster recovery plans neglecting model weights and vector store indexes",
      "No process for identifying or sanitizing poisoned training datasets",
      "Model restoration requiring full, resource-heavy retrain cycles"
    ],
    situation: "When production models are hijacked or training data is poisoned, companies suffer severe reputational damage. Recovering from an AI-specific incident requires dedicated frameworks to cleanse vector embeddings, audit checkpoints, and restore model parameters cleanly.",
    components: [
      "AI-Specific Incident Playbooks: Action-ready playbooks for prompt injection and weight theft.",
      "Vector DB Cleanse & Restore: Scraping poisoned node embeddings and restoring sanitized snapshots.",
      "Model Checkpoint Vetting: Auditing model registry versions to identify the exact injection timestamp.",
      "Training Data Sanitization: Automatic detection of anomalous patterns in upstream training buffers."
    ],
    pentestIntegration: "DR Simulation: Adversarially injecting malicious files into training pipelines to test if the recovery system detects, isolates, and rolls back the database within SLA thresholds.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Recover (RC.RP, RC.CO)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC7.4 (System Recovery)", coverage: "Full" },
      { requirement: "ISO 27001 — A.5.26 (Response to Information Security Incidents)", coverage: "Full" },
      { requirement: "DORA — Article 11 (ICT Business Continuity Policy)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Model Restoration Time", before: "Days", after: "Minutes" },
      { kpi: "Vector Index Cleanse Accuracy", before: "Manual/Uncertain", after: "100%" },
      { kpi: "Business Disruption Duration", before: "Significant", after: "Minimized" },
      { kpi: "Incident Forensic Discovery Time", before: "Weeks", after: "Hours" }
    ],
    benefits: [
      "Minimized downtime for client-facing generative AI tools",
      "Guaranteed data and model weights restoration with zero corruption",
      "Statutory compliance for business continuity during AI disruptions",
      "Clean forensic evidence trails for insurance and regulatory reporting"
    ],
    timeline: [
      "Weeks 1–2: Model Asset Dependency Inventory",
      "Weeks 2–4: AI DR Playbook & Rollback Mapping",
      "Weeks 4–6: Simulation Drills & SLA Validation"
    ]
  },
  {
    id: "offering-pentesting",
    offeringNumber: 12,
    title: "AI Red Teaming & Adversarial Security Testing",
    nistFunction: "Cross-cutting",
    overview: "Continuous, intelligence-led adversarial testing (Red Teaming) and security assessments of enterprise AI environments, LLMs, autonomous agents, RAG pipelines, and model deployments. Simulates real-world cyber threats and adversarial tactics mapped to the MITRE ATLAS framework to identify vulnerabilities, logical bypasses, data leakage risks, and security control gaps.",
    statementOfValue: "Validate your AI security posture against real-world adversaries using continuous, automated red teaming and expert threat simulation.",
    before: [
      "Point-in-time security testing leaving vulnerability gaps unexposed for months.",
      "Automated vulnerability scanners failing to discover complex, multi-step logical exploits.",
      "No security validation of new container or API endpoints between annual audits.",
      "AI models deployed without adversarial robustness testing (jailbreaks, prompt injections)."
    ],
    situation: "Enterprise codebases, container meshes, and cloud configurations change daily. Standard point-in-time penetration tests become obsolete immediately. Continuous, automated agentic pentesting and targeted AI red teaming are required to catch security flaws before threat actors exploit them.",
    components: [
      "Adversarial Threat Simulation & Red Teaming: Continuous simulation of real-world attacker TTPs targeting enterprise AI architectures, including LLMs, RAG pipelines, and autonomous workflows. Mapped directly to the MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) matrix to validate defensive controls under active attack.",
      "Model Exploitation & Bypass Testing: In-depth vulnerability scanning and exploitation testing targeting model endpoints. Includes multi-turn jailbreak attempts, indirect prompt injections, system prompt extraction, model inversion, and membership inference attacks to assess model robustness and guardrail effectiveness.",
      "RAG Pipeline & Data Poisoning Audits: Simulating data poisoning attacks against RAG knowledge bases, training pipelines, and embedding models. Testing retrieval integrity and access control boundaries to prevent data exfiltration, hallucination exploitation, and unauthorized data exposure.",
      "Agentic Workflow & Tool Abuse Testing: Adversarial testing of autonomous agents, multi-agent coordination systems, and MCP (Model Context Protocol) integrations. Validating permission boundaries, sandboxing, privilege escalation paths, and human-in-the-loop validation triggers.",
      "Continuous Vulnerability Discovery & Exploit Validation (PTaaS): Automated, AI-driven penetration testing probing external and internal AI attack surfaces 24/7/365. Safely executing exploits on discovered vulnerabilities to validate severity, eliminate false positives, and map complete lateral movement paths across cloud infrastructure."
    ],
    pentestIntegration: "Acts as the active offensive engine powering other continuous validation, threat hunting, and MDR operations across the enterprise portfolio.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Identify (ID.RA), Protect (PR.DS)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC7.1, CC4.1 (Continuous Monitoring)", coverage: "Full" },
      { requirement: "DORA — Article 26 (Threat-Led Penetration Testing)", coverage: "Full" },
      { requirement: "PCI-DSS 4.0 — Requirement 11.3 (Penetration Testing)", coverage: "Full" },
      { requirement: "MITRE ATLAS Matrix (AI Adversarial Tactics)", coverage: "Full Alignment" }
    ],
    statistics: [
      { kpi: "Vulnerability Exposure Window", before: "Months", after: "Minutes" },
      { kpi: "Adversarial Exploit Success Rate", before: "85%", after: "<2%" },
      { kpi: "Security Assessment Frequency", before: "Annual / Point-in-time", after: "Continuous / Real-Time" },
      { kpi: "Exploit Path Mapping Duration", before: "Days/Weeks", after: "Minutes" }
    ],
    benefits: [
      "Real-time visibility into active exploit paths across cloud networks.",
      "Adversarial validation of AI systems prior to production builds and merges.",
      "Substantially reduced compliance audit costs through automated testing logs.",
      "Comprehensive mapping of MITRE ATT&CK and ATLAS vulnerabilities."
    ],
    timeline: [
      "Phase 1: Attack Surface Discovery & Target Scope Definition — Weeks 1–2",
      "Phase 2: Pentest Agent Deployment & Baseline Adversarial Runs — Weeks 2–3",
      "Phase 3: Purple Team Dashboard Setup & Automation Handover — Weeks 3–4",
      "Total: 3–4 Weeks (Initial Setup), Ongoing PTaaS"
    ]
  },
  {
    id: "offering-sovereign",
    offeringNumber: 13,
    title: "Sovereign AI & Private Infrastructure Security",
    nistFunction: "Govern",
    overview: "Hardened architectural frameworks for deploying sovereign, on-premise, or private-cloud AI models (LLMs/RAG) to ensure strict data residency, eliminate third-party API exposure, and enforce maximum operational isolation.",
    statementOfValue: "Run advanced generative AI workloads without ever letting sensitive enterprise data touch public internet gateways or third-party servers.",
    before: [
      "Customer data sent to public AI endpoints risking leakage",
      "No control over training dataset sourcing or model weights",
      "Inability to run generative workloads in air-gapped zones"
    ],
    situation: "Highly regulated industries — defense, healthcare, government, and finance — are legally barred from sending sensitive data to public cloud AI APIs. Deploying private AI models requires hardened hardware, air-gapped container security, and isolated GPU architectures.",
    components: [
      "Air-Gapped Model Hardening: Custom container security and network firewalls for local weights.",
      "GPU Hardware Isolation: Hardening virtualized GPU workloads and node clusters.",
      "Local Vector Database Hardening: Enforcing encryption and RBAC logs on local vector storage.",
      "Model weights protection: Cryptographic wrapping of local model files to prevent weights theft."
    ],
    pentestIntegration: "Air-gap escape simulation: Offensive agents attempting to exfiltrate dummy data from within air-gapped training pods to external IP addresses.",
    regulatoryAlignment: [
      { requirement: "GDPR — Data Residency & Auditing", coverage: "Full" },
      { requirement: "EU AI Act — Sovereign Model Requirements", coverage: "Full" },
      { requirement: "NCA (National Cybersecurity Authority) Standards", coverage: "Full" },
      { requirement: "HIPAA — Patient Data Privacy Rules", coverage: "Full" },
      { requirement: "FedRAMP High — Private Infrastructure Guidelines", coverage: "Full" }
    ],
    statistics: [
      { kpi: "External Data Leak Risk", before: "Severe", after: "0%" },
      { kpi: "Public Cloud API Dependencies", before: "100%", after: "0%" },
      { kpi: "GPU Cluster Security Baseline", before: "30%", after: "98%" },
      { kpi: "Auditable Data Custody", before: "Fragmented", after: "100% Traceable" }
    ],
    benefits: [
      "Absolute control over enterprise model files and datasets",
      "Compliance with sovereign data residency and regional privacy laws",
      "Protection from model provider terms-of-service changes",
      "Air-gapped model execution for defense-grade security zones"
    ],
    timeline: [
      "Weeks 1–2: Air-Gap Architecture & Hardware Audit",
      "Weeks 2–5: Hardened Model Container Deployment",
      "Weeks 5–7: Leak Simulation & Penetration Testing Review"
    ]
  },
  {
    id: "offering-range",
    offeringNumber: 14,
    title: "AI Security Cyber Range & Simulation Training",
    nistFunction: "Recover",
    overview: "A sandboxed replication of your enterprise AI infrastructure, allowing security teams, developers, and incident responders to practice defending against prompt injections, model extraction, and poisoned datasets.",
    statementOfValue: "Train your security staff to identify and respond to complex machine learning attack vectors in a safe environment.",
    before: [
      "Defenders unfamiliar with AI-specific attack vectors (membership inference, prompt injection)",
      "Incident response team practicing playbooks during live breaches",
      "High delay in security response for model vulnerabilities"
    ],
    situation: "AI security requires highly specialized technical skills. Responders cannot afford to learn on the job during a live model breach. Organizations need dedicated cyber ranges to run realistic simulations of adversarial AI attacks.",
    components: [
      "Sandboxed Infrastructure Replication: Mimicking company APIs, vector dbs, and container meshes.",
      "Adversarial Attack Simulation: Pre-built attack injection scenarios (data poisoning, model theft).",
      "Developer Defense Laboratories: Training developers on input sanitization and secure system prompts.",
      "Response Speed Training: Timing team responses against metric-based benchmarks."
    ],
    pentestIntegration: "Training sparring: AI exploit agents integrated directly into cyber range zones, adapting attack profiles as defenders build mitigations.",
    regulatoryAlignment: [
      { requirement: "NIST CSF 2.0 — Recover (RC.CO), Identify (ID.RA)", coverage: "Full" },
      { requirement: "SOC 2 TSC — CC7.3 (Response and Recovery Training)", coverage: "Full" },
      { requirement: "DORA — Article 13 (ICT Training & Drills)", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Incident Response Team Preparedness", before: "Low", after: "High (95% pass)" },
      { kpi: "Mean Time to Contain live AI Incidents", before: "Days", after: "Minutes" },
      { kpi: "Developer Security Defense Accuracy", before: "35%", after: "92%" },
      { kpi: "Training Program Compliance Rate", before: "Ad Hoc", after: "100%" }
    ],
    benefits: [
      "Security teams skilled in machine learning offense and defense",
      "Validated, benchmarked incident response playbooks",
      "Reduced developer errors in GenAI deployments",
      "Audit-ready logs of training exercises for regulatory agencies"
    ],
    timeline: [
      "Weeks 1–3: Range Infrastructure Alignment",
      "Weeks 3–5: Attack Campaign Simulation Setup",
      "Weeks 5–7: Active Drills & Performance Vetting"
    ]
  },
  {
    id: "offering-quantum",
    offeringNumber: 15,
    title: "Quantum-Safe Readiness & Post-Quantum Cryptography",
    nistFunction: "Protect",
    overview: "Strategic transition framework and cryptographic engineering to secure enterprise AI models, API keys, training data pipelines, and encrypted databases against decryption attacks from quantum computers using NIST Post-Quantum Cryptography (PQC) standards.",
    statementOfValue: "Safeguard your enterprise AI intellectual property and long-term data logs against the future 'Store Now, Decrypt Later' quantum threat.",
    before: [
      "All models, keys, and log files encrypted with legacy RSA/ECC algorithms",
      "Encrypted communications vulnerable to future decryption by quantum hardware",
      "No strategic roadmap for NIST post-quantum cryptography transition"
    ],
    situation: "Adversaries are currently capturing and storing encrypted data flows. Once cryptographically relevant quantum computers become operational, legacy encryption will be broken instantly. AI databases containing proprietary training data and API keys must adopt post-quantum algorithms now.",
    components: [
      "Cryptographic Discovery & Inventory: Auditing all encryption methods across AI nodes.",
      "PQC Migration Mapping: Aligning transition plans to NIST PQC standards (Kyber/ML-KEM, Dilithium).",
      "Model File Encryption: Post-quantum wrapping for exported model checkpoints.",
      "Quantum-Resilient Key Exchange: Upgrading network transport layers to hybrid PQC protocols."
    ],
    pentestIntegration: "Weakness scanning: Crawling endpoints to detect legacy, quantum-vulnerable TLS configurations and certificate types.",
    regulatoryAlignment: [
      { requirement: "NIST PQC Standards (ML-KEM, ML-DSA, FN-DSA)", coverage: "Full" },
      { requirement: "White House National Security Memorandum 10 (NSM-10)", coverage: "Full" },
      { requirement: "DORA — ICT Cryptographic Controls", coverage: "Full" },
      { requirement: "FedRAMP High — Quantum Readiness Mandate", coverage: "Full" }
    ],
    statistics: [
      { kpi: "Quantum-Resilient Cryptographic Coverage", before: "0%", after: "100%" },
      { kpi: "Quantum Decryption Exposure Risk", before: "Critical", after: "Remediated" },
      { kpi: "Cryptographic Asset Inventory Accuracy", before: "20%", after: "100%" },
      { kpi: "Migration Speed to PQC Protocols", before: "Unplanned", after: "Accelerated (90 days)" }
    ],
    benefits: [
      "Protection of critical model intellectual property from future decryption",
      "Early alignment to statutory quantum-safe compliance mandates",
      "Future-proof security architecture for long-term customer data logs",
      "Quantum-hardened API gateways and model communications"
    ],
    timeline: [
      "Weeks 1–3: Cryptographic Discovery & Audit",
      "Weeks 3–6: Hybrid PQC Algorithmic Trial",
      "Weeks 6–9: Production Migration & Certifications Verification"
    ]
  }
];

export const nistFunctionsList = [
  { id: "Govern", label: "Govern (GV)", color: "rose", offerings: [1, 3, 13] },
  { id: "Identify", label: "Identify (ID)", color: "blue", offerings: [2, 4] },
  { id: "Protect", label: "Protect (PR)", color: "emerald", offerings: [5, 6, 15] },
  { id: "Detect", label: "Detect (DE)", color: "amber", offerings: [7, 8] },
  { id: "Respond", label: "Respond (RS)", color: "purple", offerings: [9, 10] },
  { id: "Recover", label: "Recover (RC)", color: "indigo", offerings: [11, 14] },
  { id: "Cross-cutting", label: "Cross-cutting (CC)", color: "cyan", offerings: [12] }
];

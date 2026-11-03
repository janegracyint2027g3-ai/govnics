/**
 * GOVENICS MASTER KNOWLEDGE BASE
 * ─────────────────────────────────────────────────────────────────────
 * Single source of truth for Govey AI chatbot.
 * Contains structured Q&A, keyword-indexed topic cards, and page summaries
 * covering EVERY section of the GOVENICS website.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface KnowledgeCard {
  id: string;
  topic: string;
  aliases: string[];           // keywords/phrases that trigger this card
  answer: string;              // main response text
  bullets?: string[];          // extra bullet points appended
  link?: string;               // internal page link
  followUpActions?: { label: string; value: string; type: "quickReply" | "link" }[];
}

// ─── 1. ABOUT GOVENICS ───────────────────────────────────────────────
export const aboutCards: KnowledgeCard[] = [
  {
    id: "about-govenics",
    topic: "About GOVENICS",
    aliases: ["about govenics", "who is govenics", "what is govenics", "company overview", "about us", "govenics background", "company info", "govenics profile"],
    answer: "GOVENICS is India's premier Enterprise GRC (Governance, Risk & Compliance) consulting firm, established with 40+ years of advisory heritage. We serve 1,000+ clients across all major industries with a team of 5,000+ GRC professionals operating from 11 pan-India offices.\n\nOur advisory practice covers Regulatory Compliance, Enterprise Risk Management (ERM), Cybersecurity & DPDP, ESG & Sustainability, Labour Law, EHS, Internal Audit, and Statutory GRC.",
    link: "/about",
    followUpActions: [
      { label: "Leadership Team", value: "leadership team", type: "quickReply" },
      { label: "Our Offices", value: "govenics offices", type: "quickReply" },
      { label: "Client Statistics", value: "govenics stats", type: "quickReply" },
    ]
  },
  {
    id: "govenics-stats",
    topic: "GOVENICS Statistics",
    aliases: ["govenics stats", "how many clients", "how many offices", "govenics numbers", "govenics scale", "how big is govenics", "team size", "professionals"],
    answer: "GOVENICS at a glance:\n\n• 40+ Years of Heritage in compliance advisory\n• 11 Pan-India Offices (Chennai, Mumbai, Delhi, Hyderabad, Bengaluru, Kolkata, Pune, Ahmedabad, Coimbatore, Noida, Gurugram + expanding)\n• 5,000+ Security & GRC Professionals\n• 1,000+ Clients Served across private, BFSI, manufacturing, healthcare, government, and PSU sectors",
    link: "/about",
  },
  {
    id: "leadership-team",
    topic: "Leadership Team",
    aliases: ["leadership team", "founders", "directors", "ceo", "md", "management", "who runs govenics", "govenics leadership", "executive team", "vijayakumar"],
    answer: "GOVENICS Leadership:\n\n• **S. Vijayakumar** – Managing Director & Founder. Decorated ex-Indian Air Force officer, recipient of the Marusthal Seva Medal. Founded Security & Intelligence Resources (SIR) in 1994. Qualifications in Business Management & Law.\n• **Indiradevi** – Director. Oversees financial strategy and employee welfare initiatives. Founded the ISI Staff Welfare Corpus Fund.\n• **V. Vishalkumar** – Director. International experience with Accenture (PMO) and Forest Coach Lines (Sydney). Degrees in Computer Engineering, Logistics & Transport (Univ. of Sydney), Law, HR, and NEBOSH.\n• **V. Varshithkumar** – Executive Director. B.Sc. Mechanical Engineering (SUNY), M.Sc. Transport & Logistics (TUM Germany), NEBOSH IGC, LLB.\n• **Rajkumar Sankaran** – Executive Director. 25+ years in operations, compliance, and global delivery. MBA (ICFAI), BL – Company Law & Labour.\n• **S. Yuvaraj** – CEO. MBA, LLB. Deep expertise in administration, governance, and GRC operations.",
    link: "/about",
  },
  {
    id: "govenics-offices",
    topic: "GOVENICS Office Locations",
    aliases: ["govenics offices", "where is govenics", "govenics location", "offices", "cities", "pan india", "branches", "headquarters", "hq", "chennai office"],
    answer: "GOVENICS operates from 11 active pan-India offices and is expanding to 40+ cities:\n\n**Active Offices:**\n• Chennai (HQ) – Tamil Nadu\n• Mumbai – Maharashtra\n• Delhi – NCT\n• Hyderabad – Telangana\n• Bengaluru – Karnataka\n• Kolkata – West Bengal\n• Pune – Maharashtra\n• Ahmedabad – Gujarat\n• Coimbatore – Tamil Nadu\n• Noida – Uttar Pradesh\n• Gurugram – Haryana\n\n**Expansion centers opening in:** Jaipur, Kochi, Lucknow, Nagpur, Bhopal, Chandigarh, Visakhapatnam, Trichy, and more.",
    link: "/about",
  },
  {
    id: "contact-govenics",
    topic: "Contact GOVENICS",
    aliases: ["contact", "contact us", "reach govenics", "phone number", "email", "how to contact", "get in touch", "consultation", "book appointment", "speak to advisor"],
    answer: "You can reach GOVENICS through multiple channels:\n\n• **Website Contact Page:** govenics.com/contact\n• **Email:** info@isisecurity.in\n• **Strategy Session Form:** Book a 30-min GRC Strategy Session directly on our contact page\n• **Advisor Callback:** Request a callback from a Senior GRC Partner through this chat",
    link: "/contact",
    followUpActions: [
      { label: "Request Advisor Callback", value: "callback", type: "quickReply" },
      { label: "Open Contact Page", value: "/contact", type: "link" },
    ]
  },
  {
    id: "advisory-methodology",
    topic: "Advisory Methodology",
    aliases: ["advisory methodology", "how does govenics work", "approach", "methodology", "process", "how do you work", "govenics process", "consulting approach", "framework methodology"],
    answer: "GOVENICS follows a 6-phase GRC Advisory Methodology:\n\n1. **Discovery & Assessment** – Understand existing risk, regulatory, and governance landscape\n2. **Gap Analysis** – Identify compliance gaps vs. applicable statutory frameworks\n3. **Risk Prioritisation** – Score and tier risks by financial and reputational exposure\n4. **Framework Design** – Build tailored GRC controls, policies, and workflows\n5. **Implementation & Training** – Deploy systems, registers, dashboards, and capacity-build teams\n6. **Continuous Monitoring** – Real-time statutory tracking, audit readiness, and quarterly reviews\n\nAll engagements are supported by ex-regulators, CISOs, labour lawyers, and statutory specialists.",
    link: "/about",
  },
  {
    id: "certifications",
    topic: "Certifications & Empanelments",
    aliases: ["certifications", "empanelments", "accreditations", "govenics certifications", "iso certified", "awards", "recognitions", "credentials", "certified"],
    answer: "GOVENICS holds a suite of professional certifications and regulatory empanelments:\n\n• ISO 9001:2015 – Quality Management System\n• ISO 27001:2022 – Information Security Management\n• PSARA Licensed (Private Security Agencies Regulation Act)\n• Empanelled with multiple Central & State Government departments\n• NEBOSH Certified professionals on advisory team\n• Members of NASSCOM, FICCI, and CII GRC working groups",
    link: "/certifications",
  },
];

// ─── 2. CORE GRC SERVICES ────────────────────────────────────────────
export const serviceCards: KnowledgeCard[] = [
  {
    id: "regulatory-compliance",
    topic: "Regulatory Compliance Management",
    aliases: ["regulatory compliance", "statutory compliance", "compliance management", "multi-regulator", "rbi compliance", "sebi compliance", "trai compliance", "cpcb compliance", "fssai compliance", "mca compliance", "compliance tracking"],
    answer: "GOVENICS Regulatory Compliance Management covers end-to-end statutory tracking, audit readiness, and penalty defense across all Central and State regulators.\n\n**What we cover:**\n• Continuous monitoring across 12+ regulatory bodies (RBI, SEBI, TRAI, CPCB, MCA, FSSAI, IRDAI, and more)\n• Real-time regulatory change alerts with impact scoring\n• Automated digital registers per statutory templates\n• 100% Audit Readiness Programs with pre-audit mock inspections\n• Penalty & Prosecution Prevention with zero-lag compliance calendars\n• Digital Evidence Vault with cryptographic document integrity\n• Director liability shield documentation",
    link: "/services/regulatory-compliance",
    followUpActions: [
      { label: "Audit Readiness Program", value: "audit readiness", type: "quickReply" },
      { label: "Penalty Prevention", value: "penalty prevention", type: "quickReply" },
      { label: "Request Proposal", value: "callback", type: "quickReply" },
    ]
  },
  {
    id: "enterprise-risk-management",
    topic: "Enterprise Risk Management (ERM)",
    aliases: ["enterprise risk management", "erm", "risk management", "risk assessment", "risk register", "rcsa", "kri", "key risk indicators", "risk framework", "coso", "iso 31000", "operational risk"],
    answer: "GOVENICS ERM (Enterprise Risk Management) provides organizations with a dynamic, predictive risk posture across all business functions.\n\n**Key deliverables:**\n• Dynamic RCSA (Risk Control Self-Assessment) frameworks\n• KRI (Key Risk Indicator) dashboards with real-time triggers\n• Board-level risk heat maps and management scorecards\n• Standardized risk taxonomy across all departments\n• Business Continuity Planning (BCP) integration\n• Crisis simulation exercises and tabletop drills\n\n**Frameworks used:** ISO 31000, COSO ERM 2017, DGMS Guidelines, RAMS Protocols",
    link: "/services/enterprise-risk-management",
    followUpActions: [
      { label: "BCP & Business Continuity", value: "business continuity", type: "quickReply" },
      { label: "Risk Assessment Details", value: "risk assessment workshop", type: "quickReply" },
    ]
  },
  {
    id: "governance-framework",
    topic: "Corporate Governance Framework",
    aliases: ["corporate governance", "governance framework", "board governance", "board oversight", "delegation of authority", "doa matrix", "policy management", "fiduciary", "sebi lodr", "companies act", "cvc guidelines"],
    answer: "GOVENICS Governance Framework Design services help enterprises establish robust, audit-defensible corporate governance structures.\n\n**Deliverables include:**\n• Board Committee charters and Terms of Reference (ToR)\n• Delegation of Authority (DoA) matrices for all business units\n• Policy Lifecycle Management with version control\n• Conflict-of-interest prevention mechanisms\n• Investor-grade transparency reporting frameworks\n• Whistleblower policy and vigil mechanism setup\n\n**Standards:** Companies Act 2013, SEBI LODR, CVC Guidelines, GFR Rules",
    link: "/services/governance-framework",
  },
  {
    id: "internal-audit",
    topic: "Internal Audit Services",
    aliases: ["internal audit", "audit services", "compliance audit", "sox", "coso controls", "process audit", "control testing", "internal control", "management audit", "audit committee"],
    answer: "GOVENICS Internal Audit Services deliver compliance-integrated, continuous audit cycles that surface control gaps before statutory regulators do.\n\n**Our audit approach:**\n• Risk-based audit planning with control universe mapping\n• Continuous control testing (not just point-in-time)\n• Automated action tracking dashboards for management responses\n• Industry-specific audit procedures (GxP, BFSI, Government)\n• SOX compliance readiness and Audit Committee reporting\n• Financial and operational leak prevention protocols\n\n**Standards:** ISO 19011, CAG Guidelines, GFR Rules, COSO Internal Controls",
    link: "/services/internal-audit",
  },
  {
    id: "data-privacy-dpdp",
    topic: "Data Privacy & DPDP Compliance",
    aliases: ["data privacy", "dpdp", "dpdp act", "digital personal data", "gdpr", "hipaa", "consent management", "data mapping", "personal data", "data breach", "data protection officer", "dpo"],
    answer: "GOVENICS provides comprehensive compliance services for India's Digital Personal Data Protection (DPDP) Act 2023 and global privacy standards.\n\n**Services include:**\n• DPDP Act readiness assessments and gap analysis\n• Consent Management Platform (CMP) design and implementation\n• Data flow mapping and DPIA (Data Protection Impact Assessment)\n• Breach response SOPs and notification procedures\n• HIPAA compliance for healthcare organizations\n• Vendor/processor data processing agreements\n• Penalties up to ₹250 Crores mitigated through compliant architecture\n\n**Standards:** DPDP Act 2023, GDPR, HIPAA, 21 CFR Part 11",
    link: "/services/data-privacy-dpdp",
    followUpActions: [
      { label: "DPDP Readiness Assessment", value: "dpdp readiness", type: "quickReply" },
      { label: "Download DPDP Whitepaper", value: "/sgrc/resources", type: "link" },
    ]
  },
  {
    id: "cybersecurity-iso27001",
    topic: "Cybersecurity & ISO 27001",
    aliases: ["cybersecurity", "iso 27001", "isms", "soc 2", "vapt", "penetration testing", "pentest", "information security", "cyber risk", "nist", "cert-in", "cloud security", "network security"],
    answer: "GOVENICS Cybersecurity practice builds and certifies enterprise Information Security Management Systems (ISMS).\n\n**Core services:**\n• ISO 27001:2022 ISMS implementation and certification\n• SOC 2 Type I & Type II attestation readiness\n• VAPT (Web, Mobile, Cloud, Network, API) penetration testing\n• CERT-In incident reporting and compliance\n• Cloud Security Architecture (AWS, Azure, GCP)\n• Threat modelling and vulnerability assessments\n• Secure Developer Network (SDN) setup\n• Red team / Blue team exercises\n\n**Standards:** ISO 27001:2022, SOC 2, CERT-In Directives, NIST CSF, PCI-DSS",
    link: "/cybersecurity",
    followUpActions: [
      { label: "VAPT Scoping", value: "vapt scoping", type: "quickReply" },
      { label: "ISO 27001 Details", value: "iso 27001", type: "quickReply" },
      { label: "SOC 2 Readiness", value: "soc 2", type: "quickReply" },
    ]
  },
  {
    id: "vendor-risk-management",
    topic: "Vendor & Third-Party Risk Management",
    aliases: ["vendor risk", "third party risk", "supplier audit", "vendor management", "supply chain risk", "tprm", "vendor due diligence", "third party compliance", "subcontractor risk", "procurement risk"],
    answer: "GOVENICS Third-Party Risk Management (TPRM) eliminates supply chain compliance blind spots for enterprise procurement and compliance teams.\n\n**Program includes:**\n• 360° vendor risk scoring and tiering\n• Automated vendor audit checklists (regulatory, financial, operational)\n• SLA governance frameworks and performance monitoring\n• CLRA compliance verification for contract workforce\n• Supplier insolvency early-warning systems\n• ESG/Sustainability screening of vendor networks\n• Incident response for supplier-triggered breaches",
    link: "/services/vendor-risk-management",
  },
  {
    id: "esg-sustainability",
    topic: "ESG & Sustainability Advisory",
    aliases: ["esg", "sustainability", "brsr", "sebi brsr", "carbon footprint", "scope 1 2 3", "csr", "section 135", "green compliance", "climate risk", "carbon accounting", "net zero", "materiality matrix"],
    answer: "GOVENICS ESG & Sustainability Advisory helps enterprises meet SEBI BRSR requirements, carbon accounting mandates, and investor-grade sustainability disclosure standards.\n\n**Services:**\n• SEBI BRSR Core filing and assurance readiness\n• Scope 1, 2, and 3 carbon footprint accounting and verification\n• CSR compliance under Companies Act Section 135\n• Sustainability materiality matrix development\n• Supply chain ESG audits and supplier sustainability scoring\n• GHG Protocol implementation and baseline setting\n• UN SDG alignment reporting\n• Institutional investor ESG due diligence support\n\n**Standards:** SEBI BRSR, GHG Protocol, GRI Standards, CDP Framework, UN SDGs",
    link: "/esg",
    followUpActions: [
      { label: "BRSR Reporting", value: "brsr compliance", type: "quickReply" },
      { label: "Carbon Accounting Scope 1-3", value: "carbon footprint", type: "quickReply" },
      { label: "CSR Section 135", value: "csr audit", type: "quickReply" },
    ]
  },
  {
    id: "ehs-compliance",
    topic: "EHS & Environmental Compliance",
    aliases: ["ehs", "environmental health safety", "hse", "factory safety", "pollution control", "cpcb", "spcb", "hazardous waste", "effluent treatment", "environment compliance", "osha", "industrial safety", "manufacturing safety"],
    answer: "GOVENICS EHS & Environmental Advisory covers factory safety, pollution control board consents, hazardous waste tracking, and OSHA compliance for industrial operations.\n\n**Services:**\n• Pollution Control Board (CPCB/SPCB) consent management\n• Hazardous effluent tracking and waste disposal compliance\n• Factory Act license renewals and compliance registers\n• Environmental Impact Assessment (EIA) support\n• OSHA safety guidelines implementation\n• Emergency response and crisis management plans\n• Unannounced inspection defense protocols\n\n**Standards:** Factories Act 1948, Environment Protection Act, ISO 14001, OHSAS 18001/ISO 45001",
    link: "/services/ehs-compliance",
  },
  {
    id: "labour-law-compliance",
    topic: "Labour Law Compliance",
    aliases: ["labour law", "labor law", "labour code", "wage code", "clra", "contract labour", "minimum wage", "epf", "esic", "pf", "gratuity", "posh", "factories act", "shop establishment", "workforce compliance", "hr compliance"],
    answer: "GOVENICS Labour Law Compliance practice covers the complete spectrum of Indian labour legislation for multi-entity and multi-state enterprises.\n\n**Coverage:**\n• Code on Wages (2019) – Minimum Wages, Payment of Wages, Bonus\n• Industrial Relations Code (2020) – Standing Orders, Trade Unions\n• Social Security Code (2020) – EPF, ESIC, Gratuity, Maternity\n• OSH Code (2020) – Factory safety, working hours, contractor management\n• CLRA Act – Contract Labour Registration & Abolition\n• POSH Act 2013 – Sexual harassment prevention and ICC setup\n• Labour Welfare Fund (LWF) across all states\n• Shop & Establishment Act compliance in all states",
    link: "/sgrc/services",
    followUpActions: [
      { label: "EPF Calculator", value: "calc epf", type: "quickReply" },
      { label: "Gratuity Calculator", value: "calc gratuity", type: "quickReply" },
      { label: "Minimum Wages by State", value: "minimum wages", type: "quickReply" },
      { label: "POSH Compliance", value: "posh compliance", type: "quickReply" },
    ]
  },
  {
    id: "payroll-compliance",
    topic: "Payroll Compliance",
    aliases: ["payroll", "payroll compliance", "salary compliance", "payroll audit", "salary register", "payroll processing", "statutory deductions", "form 16", "tds on salary", "pay structure"],
    answer: "GOVENICS Payroll Compliance services audit and remediate enterprise payroll structures against all applicable statutory requirements.\n\n**Key areas:**\n• Minimum Wage reconciliation across all states and categories\n• EPF & ESIC contribution accuracy verification\n• Professional Tax (PT) filing across states\n• TDS on salary (Section 192) compliance\n• Salary structure optimization for statutory savings\n• Contractor payroll audit and Form 16A compliance\n• Payroll register maintenance and statutory return filing",
    link: "/sgrc/services/payroll-compliance",
  },
  {
    id: "business-continuity",
    topic: "Business Continuity Management (BCM)",
    aliases: ["business continuity", "bcm", "bcp", "disaster recovery", "bcp plan", "continuity plan", "crisis management", "rto rpo", "iso 22301", "business resilience", "operational continuity"],
    answer: "GOVENICS Business Continuity Management (BCM) services help enterprises build resilient operations that withstand disruptions, regulatory crises, or catastrophic events.\n\n**Services:**\n• ISO 22301 Business Continuity Management System (BCMS) certification\n• Business Impact Analysis (BIA) and risk prioritization\n• Recovery Time Objective (RTO) and Recovery Point Objective (RPO) setting\n• IT Disaster Recovery planning and testing\n• Crisis communication and stakeholder notification SOPs\n• Tabletop exercises and scenario simulations\n• Supply chain continuity planning",
    link: "/services/business-continuity",
  },
  {
    id: "secretarial-compliance",
    topic: "Secretarial & Corporate Compliance",
    aliases: ["secretarial", "company secretary", "mca filing", "roc filing", "board minutes", "annual return", "form mgt-7", "agm", "statutory registers", "companies act 2013", "corporate secretarial"],
    answer: "GOVENICS Secretarial Compliance services cover all MCA/ROC filings, board governance secretarial obligations, and corporate law compliance under the Companies Act 2013.\n\n**Services include:**\n• ROC annual return and event-based e-form filings\n• Board and Committee meeting agenda, minutes, and resolutions\n• Statutory register maintenance (members, directors, charges)\n• Director KYC, DIN, and KMP compliance\n• SEBI LODR quarterly and annual compliance\n• Related Party Transaction (RPT) disclosures\n• Compounding petitions and penalty mitigation",
    link: "/services/secretarial-compliance",
  },
];

// ─── 3. STATUTORY GRC (SGRC) SERVICES ────────────────────────────────
export const sgrcCards: KnowledgeCard[] = [
  {
    id: "factory-compliance",
    topic: "Factory Compliance",
    aliases: ["factory compliance", "factories act", "factory license", "factory registration", "factory audit", "factory register", "manufacturing compliance", "industrial compliance"],
    answer: "GOVENICS Factory Compliance service covers all obligations under the Factories Act 1948 and state-specific factory rules.\n\n**Includes:**\n• Factory license registration and renewal\n• Statutory registers (Form 12, 13, 14, 17, 25, 26, etc.)\n• Annual returns (Form 21, 22) filing\n• Safety officer appointment and welfare officer compliance\n• Canteen, creche, first-aid, and welfare facility audits\n• Contract labour CLRA compliance at factory sites\n• Inspector visit defense and show-cause notice responses",
    link: "/sgrc/services/factory-compliance",
  },
  {
    id: "shop-establishment",
    topic: "Shop & Establishment Compliance",
    aliases: ["shop establishment", "shops act", "establishment compliance", "commercial office compliance", "retail compliance", "shop license", "shop registration"],
    answer: "GOVENICS Shop & Establishment compliance covers all state-specific Shops & Establishments Acts for commercial offices, retail stores, and service establishments.\n\n**Services:**\n• Registration certificate procurement across all states\n• Annual renewal and compliance filings\n• Working hours register, overtime management\n• Leave register and compensatory-off tracking\n• Employee register and display board obligations\n• State-specific wage and bonus compliance",
    link: "/sgrc/services/shop-establishment",
  },
  {
    id: "posh-compliance",
    topic: "POSH Act 2013 Compliance",
    aliases: ["posh", "posh act", "sexual harassment", "icc", "internal complaints committee", "she box", "posh policy", "posh training", "posh compliance"],
    answer: "GOVENICS POSH Act 2013 Compliance ensures organizations meet all Prevention of Sexual Harassment at Workplace obligations.\n\n**Our POSH practice includes:**\n• Internal Complaints Committee (ICC) constitution and training\n• POSH Policy drafting and annual review\n• Mandatory annual awareness training sessions\n• Annual report preparation and filing under Section 21\n• SheBox compliance monitoring\n• Complaint investigation support and inquiry protocols\n• External member appointment assistance",
    link: "/sgrc/services/posh-compliance",
  },
  {
    id: "environmental-compliance",
    topic: "Environmental & EHS Compliance",
    aliases: ["environmental compliance", "pollution control", "pcb consent", "cto", "cte", "environment clearance", "hazardous waste", "effluent", "wastewater", "emission standards"],
    answer: "GOVENICS Environmental Compliance covers all Pollution Control Board (PCB) statutory requirements for industries.\n\n**Services:**\n• Consent to Establish (CTE) and Consent to Operate (CTO) applications\n• Hazardous Waste management authorization and renewal\n• Environmental Statement (Form V) filing\n• Water Cess return filing\n• Stack emission monitoring and reporting\n• Effluent Treatment Plant (ETP) compliance registers\n• Annual environmental audit under EPA 1986",
    link: "/sgrc/services/ehs",
  },
];

// ─── 4. SOLUTIONS BY INDUSTRY ────────────────────────────────────────
export const solutionCards: KnowledgeCard[] = [
  {
    id: "bfsi-solutions",
    topic: "BFSI & Fintech Solutions",
    aliases: ["bfsi", "banking", "nbfc", "fintech", "insurance", "digital lending", "payment", "rbi", "sebi", "irdai", "aml", "cft", "banking compliance"],
    answer: "GOVENICS BFSI & Fintech GRC solutions cover the complete regulatory stack for banking, insurance, NBFCs, payment aggregators, and digital lenders.\n\n**Key offerings:**\n• Banking & NBFCs: RBI Master Direction alignment, ALM & Credit Risk, statutory board reporting\n• Insurance: IRDAI compliance, underwriting risk, solvency controls\n• Payments & Digital Lending: DLG guidelines, LSP governance, KFS & APR engines\n• Fintech: AML/CFT frameworks, KYC automation, cybersecurity assessments\n\n**Frameworks:** RBI Master Directions, Basel III, PMLA, IRDAI Act, RBI Digital Lending Guidelines 2022",
    link: "/solutions",
  },
  {
    id: "manufacturing-solutions",
    topic: "Manufacturing & Industrial Solutions",
    aliases: ["manufacturing", "automotive", "auto components", "chemicals", "pharma manufacturing", "industrial compliance", "factory manufacturing", "plant compliance"],
    answer: "GOVENICS Manufacturing GRC solutions are tailored for auto, chemicals, pharma, and heavy industry facilities.\n\n**Coverage:**\n• Automotive & Auto Components: EHS registers, IATF 16949, CLRA audits\n• Chemicals & Process Industries: MSIHC Rules, hazmat compliance, emergency plans\n• Pharmaceuticals: GxP validation, CDSCO manufacturing compliance, WHO-GMP\n• Heavy Engineering: Factories Act compliance, DGMS statutory registers\n\n**Outcomes:** Zero stop-work notices, 100% Factories Act compliance, 60% reduction in reporting overhead",
    link: "/solutions",
  },
  {
    id: "healthcare-solutions",
    topic: "Healthcare & Life Sciences Solutions",
    aliases: ["healthcare", "hospital compliance", "life sciences", "pharma compliance", "clinical compliance", "nabh", "nabl", "hipaa healthcare", "dpdp healthcare", "medical compliance"],
    answer: "GOVENICS Healthcare GRC solutions safeguard patient data and clinical operations from regulatory exposure.\n\n**Services for Healthcare:**\n• NABH and NABL accreditation compliance readiness\n• DPDP & HIPAA patient data governance\n• Telemedicine partner audit and SLA compliance\n• Clinical Trial regulatory compliance (CDSCO, ICH)\n• Medical device compliance (MDR 2017)\n• Pharmacy license and drug distribution compliance\n• EPF/ESIC compliance for hospital contract workforce",
    link: "/solutions",
  },
  {
    id: "it-technology-solutions",
    topic: "IT & Technology Solutions",
    aliases: ["it compliance", "technology compliance", "saas compliance", "software company grc", "it company audit", "soc 2 technology", "cert-in compliance", "it industry"],
    answer: "GOVENICS IT & Technology GRC solutions enable software companies, SaaS providers, and tech enterprises to build trusted, compliant products.\n\n**Services:**\n• ISO 27001:2022 ISMS certification\n• SOC 2 Type I & II attestation\n• CERT-In Directions compliance for IT intermediaries\n• DPDP Act compliance for data processors\n• DevSecOps security controls review\n• Cloud Security Architecture (AWS, Azure, GCP)\n• Vendor risk management for SaaS supply chains",
    link: "/solutions",
  },
  {
    id: "infrastructure-solutions",
    topic: "Infrastructure & Real Estate Solutions",
    aliases: ["infrastructure compliance", "real estate compliance", "construction compliance", "rera", "builders", "realty grc", "construction safety", "infra audit"],
    answer: "GOVENICS Infrastructure & Real Estate GRC covers RERA compliance, construction safety, and labour law obligations for large project developers.\n\n**Services:**\n• RERA registration and ongoing compliance\n• Construction site EHS and safety audits\n• Contract labour (CLRA) compliance for project workforce\n• Building permit and environmental clearance tracking\n• BOCW (Building & Other Construction Workers) Act compliance\n• Safety training and incident reporting systems",
    link: "/solutions",
  },
  {
    id: "energy-utilities-solutions",
    topic: "Energy & Utilities Solutions",
    aliases: ["energy compliance", "power sector", "utilities compliance", "oil gas compliance", "renewable energy compliance", "electricity compliance", "cerc compliance"],
    answer: "GOVENICS Energy & Utilities solutions manage complex regulatory environments across power generation, transmission, oil & gas, and renewable energy sectors.\n\n**Services:**\n• CERC/SERC tariff and grid compliance\n• Oil & Gas PNGRB licensing and compliance\n• Renewable Energy Certificate (REC) management\n• Mines Act and DGMS compliance for coal/mining\n• Environmental consents for power plants\n• HSE compliance for high-risk energy assets",
    link: "/solutions",
  },
];

// ─── 5. INDUSTRIES SERVED ────────────────────────────────────────────
export const industryCards: KnowledgeCard[] = [
  {
    id: "industries-overview",
    topic: "Industries Served",
    aliases: ["industries", "which industries", "sectors served", "govenics industries", "who do you serve", "industry coverage", "sectors", "verticals"],
    answer: "GOVENICS serves enterprises across 8 major industry clusters with 50+ sub-sector specializations:\n\n1. **Manufacturing & Industrial** – Auto, Chemicals, Plastics, Textiles, Heavy Engineering\n2. **Technology & Electronics** – IT Services, SaaS, Electronics, Telecom\n3. **Infrastructure & Construction** – Real Estate, Roads, Ports, Logistics\n4. **Energy & Utilities** – Power, Oil & Gas, Renewables, Mining\n5. **Financial Services (BFSI)** – Banking, Insurance, Fintech, NBFCs\n6. **Healthcare & Life Sciences** – Hospitals, Pharma, Medical Devices, Diagnostics\n7. **Consumer Goods & Retail** – FMCG, E-commerce, Retail, F&B\n8. **Media, Services & Public Sector** – Education, Hospitality, Government, PSUs",
    link: "/industries",
    followUpActions: [
      { label: "BFSI Solutions", value: "bfsi solutions", type: "quickReply" },
      { label: "Manufacturing Solutions", value: "manufacturing solutions", type: "quickReply" },
      { label: "Healthcare Solutions", value: "healthcare solutions", type: "quickReply" },
      { label: "IT Solutions", value: "it compliance", type: "quickReply" },
    ]
  },
];

// ─── 6. CASE STUDIES ────────────────────────────────────────────────
export const caseStudyCards: KnowledgeCard[] = [
  {
    id: "case-bfsi",
    topic: "BFSI Case Study – RBI IT Outsource",
    aliases: ["bfsi case study", "rbi audit case", "fintech case", "payment aggregator case", "rbi inspection", "case study bfsi"],
    answer: "**Case Study: Securing India's Leading Fintech Against RBI IT Outsource Audits**\n\n*Industry:* BFSI – Payment Aggregator\n\n*Challenge:* Severe audit deviations in subcontractor network access, data mapping gaps, and absence of third-party SLAs risked transaction halts.\n\n*GOVENICS Solution:* Designed a robust GRC Outsource Framework, conducted DPDP data mapping, instituted third-party security audits, and built a real-time risk dashboard for the board.\n\n*Results:*\n• 0 Critical RBI Deviations\n• 100% Data Residency Compliance\n• 10 Days to Full Audit Readiness\n• 40+ Fintech Partners onboarded into active SLA monitoring",
    link: "/case-studies",
  },
  {
    id: "case-manufacturing",
    topic: "Manufacturing Case Study – EHS & Factory Compliance",
    aliases: ["manufacturing case study", "automotive case", "factory case", "ehs case study", "case study manufacturing", "auto plant compliance"],
    answer: "**Case Study: 100% EHS & Factory Compliance for an Automotive Giant's Plant Network**\n\n*Industry:* Automotive Manufacturing\n\n*Challenge:* 5,000+ contract workers, recurrent factory audit warnings, register gaps under Factories Act, and low safety training logs across 6 plants.\n\n*GOVENICS Solution:* Deployed Factory Compliance systems, automated statutory registers, mapped daily CLRA compliance, and implemented real-time EHS monitoring.\n\n*Results:*\n• 100% CLRA Compliance Score\n• 60% Reduction in Safety Incidents\n• 6 Plants – All Fully Audited & Safe\n• Zero stop-work safety notices",
    link: "/case-studies",
  },
  {
    id: "case-healthcare",
    topic: "Healthcare Case Study – HIPAA & DPDP",
    aliases: ["healthcare case study", "hospital case", "dpdp case", "hipaa case", "patient data case", "case study healthcare"],
    answer: "**Case Study: HIPAA & DPDP Patient Data Governance for a Multi-Specialty Hospital Chain**\n\n*Industry:* Healthcare – 12-unit hospital chain\n\n*Challenge:* Managing patient consent across EMR applications leaving records vulnerable to leaks, exposing the board to heavy DPDP penalties.\n\n*GOVENICS Solution:* Instituted Privacy-by-Default patient records, audited telemedicine partners, built DPDP consent manager controls, and trained 12 hospital units in HIPAA rules.\n\n*Results:*\n• 12 Hospitals Secured\n• 100% DPDP Consent Implemented\n• Zero Data Breach Events\n• Flawless NABH quality audit scores",
    link: "/case-studies",
  },
  {
    id: "case-telecom",
    topic: "Telecom Case Study – TRAI EMF Compliance",
    aliases: ["telecom case study", "trai case", "spectrum case", "emf compliance case", "case study telecom", "telecom compliance case"],
    answer: "**Case Study: Automating Spectrum EMF & TRAI QoS Compliance for a National Telecom Operator**\n\n*Industry:* Telecommunications\n\n*Challenge:* Spectral fine threats from TRAI due to inconsistent tower radiation tracking and delays in QoS metrics consolidation.\n\n*GOVENICS Solution:* Deployed compliance pipelines connecting spectrum telemetry with EMF tracking logs and automated TRAI QoS dashboard updates.\n\n*Results:*\n• 0 TRAI Spectrum Fines\n• ₹12Cr+ Regulatory Costs Saved\n• 100% Tower EMF Compliance\n• Rapid tower right-of-way certifications",
    link: "/case-studies",
  },
];

// ─── 7. STAFFING / MANPOWER SERVICES ────────────────────────────────
export const staffingCards: KnowledgeCard[] = [
  {
    id: "manpower-services",
    topic: "Manpower & Staffing Services",
    aliases: ["manpower", "staffing", "manpower services", "contract staffing", "workforce solutions", "grc staffing", "compliance staffing", "talent solutions", "human resources", "recruitment"],
    answer: "GOVENICS provides specialized GRC Manpower & Staffing solutions — placing compliance professionals, internal auditors, EHS officers, and data privacy specialists within enterprise teams.\n\n**Staffing categories:**\n• Compliance Officers (Statutory, Regulatory, Secretarial)\n• Internal Auditors (Risk-based, Process, IT)\n• EHS Safety Officers (Factory, Construction, Mining)\n• Data Privacy Officers (DPO, DPDP, GDPR)\n• CISO-as-a-Service and Security Analysts\n• Labour Law Managers and Payroll Specialists\n• Contract-to-Hire, Fixed Term, and Permanent placements",
    link: "/manage-staffing",
  },
  {
    id: "grc-staffing",
    topic: "GRC Professional Staffing",
    aliases: ["grc staffing", "compliance officer staffing", "audit staffing", "hire compliance officer", "grc professionals", "grc manpower", "compliance talent"],
    answer: "GOVENICS GRC Staffing connects enterprises with pre-vetted, industry-certified GRC professionals available for immediate deployment.\n\n**Available profiles:**\n• Chief Compliance Officer (CCO)\n• Internal Audit Manager / Senior Auditor\n• EHS Safety Officer (ISO 45001, NEBOSH certified)\n• Data Protection Officer (DPDP/GDPR)\n• Company Secretary (CS)\n• Labour Compliance Manager\n• Statutory Compliance Executive\n\nEngagement models: Full-time placement, Fractional/Part-time, Project-based, Managed service",
    link: "/manage-staffing",
    followUpActions: [
      { label: "View Staffing Options", value: "/manage-staffing", type: "link" },
      { label: "Request a GRC Professional", value: "callback", type: "quickReply" },
    ]
  },
];

// ─── 8. RESOURCE HUB & KNOWLEDGE BASE ────────────────────────────────
export const resourceCards: KnowledgeCard[] = [
  {
    id: "resource-hub",
    topic: "GRC Resource Hub",
    aliases: ["resource hub", "whitepapers", "download resources", "grc resources", "knowledge base", "research reports", "regulatory alerts", "grc library", "compliance resources"],
    answer: "The GOVENICS Resource Hub provides practitioners with:\n\n• **Whitepapers** – In-depth compliance implementation guides (DPDP, ERM, ISO 27001)\n• **Regulatory Alerts** – Breaking regulatory change notifications (RBI, SEBI, TRAI)\n• **Reports** – ESG/BRSR roadmaps, industry-specific GRC benchmarks\n• **e-Library** – Statutory Acts, Rules, and Regulations database (LEI, EHS, FCC domains)\n• **Checklists** – Factory, POSH, DPDP, ISO audit checklists\n• **Calculators** – EPF, Gratuity, Professional Tax, Income Tax interactive tools",
    link: "/sgrc/resources",
    followUpActions: [
      { label: "Browse Resource Hub", value: "/sgrc/resources", type: "link" },
      { label: "Open e-Library", value: "/sgrc/e-library", type: "link" },
      { label: "Run a Calculator", value: "calculators", type: "quickReply" },
    ]
  },
  {
    id: "e-library",
    topic: "Statutory e-Library",
    aliases: ["e-library", "elibrary", "statutory library", "acts database", "law database", "regulations database", "grc database", "statutory acts", "library portal"],
    answer: "The GOVENICS Statutory e-Library is a searchable database covering 100+ Acts, Rules, and Regulations across three domains:\n\n• **LEI (Labour, Employment & Industrial):** Labour Codes, Factories Act, POSH, Minimum Wages, EPF, ESIC, Gratuity, LWF, Professional Tax, Leave Policies\n• **EHS (Environment, Health & Safety):** Environment Protection Act, Water Act, Air Act, Hazardous Waste Rules, Mines Act\n• **FCC (Financial, Corporate & Commercial):** Companies Act, SEBI LODR, FEMA, GST, Income Tax Act, PMLA",
    link: "/sgrc/e-library",
    followUpActions: [
      { label: "Open LEI Domain", value: "/sgrc/e-library?domain=lei", type: "link" },
      { label: "Open EHS Domain", value: "/sgrc/e-library?domain=ehs", type: "link" },
      { label: "Open FCC Domain", value: "/sgrc/e-library?domain=fcc", type: "link" },
    ]
  },
];

// ─── 9. PARTNERS & ALLIANCES ─────────────────────────────────────────
export const partnerCards: KnowledgeCard[] = [
  {
    id: "partners",
    topic: "Partners & Alliances",
    aliases: ["partners", "alliances", "technology partners", "consulting partners", "govenics partners", "partner ecosystem", "tie-ups", "empanelled"],
    answer: "GOVENICS maintains strategic partnerships across technology, consulting, and regulatory advisory domains to deliver integrated GRC solutions.\n\n**Partnership categories:**\n• **Technology Partners** – GRC Platform vendors, ISMS tooling, e-learning\n• **Legal & Regulatory Partners** – Law firms, ex-regulator advisors, CA firms\n• **Certification Bodies** – ISO certification partners, NABH/NABL consultants\n• **International Alliances** – Global GRC practice associations\n\nPartners complement our in-house advisory team to deliver end-to-end, multidisciplinary compliance solutions.",
    link: "/partners",
  },
];

// ─── 10. CAREERS ─────────────────────────────────────────────────────
export const careerCards: KnowledgeCard[] = [
  {
    id: "careers",
    topic: "Careers at GOVENICS",
    aliases: ["careers", "jobs", "job openings", "work at govenics", "hiring", "join govenics", "grc jobs", "career opportunities", "apply"],
    answer: "GOVENICS is always looking for talented GRC practitioners, auditors, compliance officers, EHS professionals, and technology specialists.\n\n**Open roles typically include:**\n• GRC Consultant / Senior Consultant\n• Internal Auditor (IT & Operational)\n• EHS Safety Officer\n• Labour Law Compliance Manager\n• Cybersecurity Analyst / CISO\n• Data Privacy Officer (DPO)\n• Business Development Manager (GRC Sales)\n\nVisit our Careers page or contact careers@govenics.com to apply.",
    link: "/careers",
    followUpActions: [
      { label: "View Open Positions", value: "/careers", type: "link" },
      { label: "Contact Recruitment", value: "callback", type: "quickReply" },
    ]
  },
];

// ─── 11. GRC FUNDAMENTALS Q&A ────────────────────────────────────────
export const fundamentalCards: KnowledgeCard[] = [
  {
    id: "what-is-grc",
    topic: "What is GRC?",
    aliases: ["what is grc", "grc meaning", "grc full form", "governance risk compliance", "grc explanation", "define grc", "grc definition"],
    answer: "**GRC** stands for **Governance, Risk, and Compliance** — an integrated framework that helps organizations achieve objectives, manage uncertainty, and act with integrity.\n\n• **Governance:** The system of rules, policies, and structures by which an organization is directed, controlled, and held accountable. Includes board oversight, delegation of authority, and policy management.\n\n• **Risk Management:** The process of identifying, assessing, and controlling threats to an organization's capital, operations, and stakeholder value. Encompasses ERM frameworks (ISO 31000, COSO).\n\n• **Compliance:** Adherence to laws, regulations, standards, and internal policies applicable to the organization. Includes statutory compliance, regulatory filings, and audit readiness.\n\nGOVENICS delivers integrated GRC advisory that unifies all three pillars.",
    link: "/grc",
  },
  {
    id: "what-is-erm",
    topic: "What is ERM?",
    aliases: ["what is erm", "enterprise risk management definition", "erm meaning", "erm full form"],
    answer: "**ERM (Enterprise Risk Management)** is a board-endorsed, organization-wide process for identifying, evaluating, and controlling risks that could prevent an enterprise from achieving its strategic objectives.\n\n**Key ERM components:**\n• Risk Identification and categorization (strategic, operational, financial, compliance, reputational)\n• Risk Appetite and Tolerance setting by the Board\n• Risk Control Self-Assessment (RCSA) at department level\n• Key Risk Indicators (KRI) and early warning triggers\n• Risk Treatment plans and mitigation controls\n• Continuous monitoring and Board reporting\n\n**Frameworks:** ISO 31000:2018, COSO ERM 2017, Basel II/III (for financial institutions)",
    link: "/services/enterprise-risk-management",
  },
  {
    id: "what-is-iso-27001",
    topic: "What is ISO 27001?",
    aliases: ["what is iso 27001", "iso 27001 meaning", "isms definition", "information security management"],
    answer: "**ISO/IEC 27001:2022** is the international standard for Information Security Management Systems (ISMS). It specifies requirements for establishing, implementing, maintaining, and continually improving an ISMS.\n\n**Key facts:**\n• Latest version: ISO 27001:2022 (replaced 2013 version)\n• 93 controls across 4 themes: Organizational, People, Physical, Technological\n• Applicable to any size or type of organization\n• Certification is issued by accredited certification bodies\n• Required for many enterprise contracts, government tenders, and BFSI vendor empanelments\n\nGOVENICS provides end-to-end ISO 27001:2022 ISMS implementation and certification support.",
    link: "/cybersecurity",
  },
  {
    id: "what-is-dpdp",
    topic: "What is the DPDP Act?",
    aliases: ["what is dpdp", "dpdp act meaning", "dpdp act india", "digital personal data protection", "dpdp act 2023", "dpdp compliance meaning"],
    answer: "The **Digital Personal Data Protection (DPDP) Act, 2023** is India's landmark personal data privacy legislation, analogous to the EU's GDPR.\n\n**Key provisions:**\n• Applies to digital personal data processed in India\n• Consent-based processing: explicit, informed, and withdrawable\n• Data Principal rights: access, correction, erasure, nomination\n• Data Fiduciary obligations: purpose limitation, data minimisation, security safeguards\n• Cross-border transfer restrictions to notified jurisdictions\n• Penalties up to **₹250 Crores** for breaches\n• Data Protection Board of India (DPBI) for adjudication\n\nGOVENICS provides DPDP Act readiness assessments, consent architecture design, and compliance programs.",
    link: "/services/data-privacy-dpdp",
  },
  {
    id: "what-is-brsr",
    topic: "What is BRSR?",
    aliases: ["what is brsr", "brsr meaning", "business responsibility reporting", "sebi brsr meaning", "brsr core", "non-financial reporting"],
    answer: "**BRSR (Business Responsibility & Sustainability Reporting)** is SEBI's mandated sustainability disclosure framework for listed companies in India, replacing the older BRR format.\n\n**Key points:**\n• Mandatory for top 1,000 listed companies by market cap (FY 2023-24 onwards)\n• BRSR Core – assured sustainability disclosures from FY 2024-25\n• Covers 9 Principles: Ethics, Sustainability, Employee wellbeing, Stakeholder engagement, Human rights, Environment, Policy advocacy, Inclusive growth, Consumer value\n• Scope 1, 2, and 3 GHG emissions disclosure required\n• Third-party assurance of BRSR Core indicators mandatory\n\nGOVENICS provides BRSR Core gap analysis, data collection frameworks, and assurance-ready disclosures.",
    link: "/esg",
  },
  {
    id: "what-is-vapt",
    topic: "What is VAPT?",
    aliases: ["what is vapt", "vapt meaning", "vulnerability assessment", "penetration testing", "pentest meaning", "security testing"],
    answer: "**VAPT (Vulnerability Assessment & Penetration Testing)** is a security testing methodology that identifies and validates security weaknesses in systems, applications, and networks.\n\n**Types of VAPT:**\n• **Web Application VAPT** – SQL injection, XSS, authentication flaws, OWASP Top 10\n• **Mobile Application VAPT** – Android/iOS security, API security\n• **Network VAPT** – Firewall, router, switch, WiFi vulnerabilities\n• **Cloud VAPT** – AWS, Azure, GCP misconfiguration testing\n• **API VAPT** – REST/GraphQL endpoint security testing\n• **Social Engineering** – Phishing simulations, physical intrusion tests\n\nGOVENICS conducts VAPT under CERT-In guidelines with comprehensive reports, risk ratings, and remediation roadmaps.",
    link: "/cybersecurity",
  },
  {
    id: "what-is-clra",
    topic: "What is CLRA?",
    aliases: ["what is clra", "clra meaning", "contract labour regulation", "contract labour act", "clra compliance", "contractor workforce"],
    answer: "The **Contract Labour (Regulation and Abolition) Act, 1970 (CLRA)** regulates the employment of contract labour in establishments and provides for its abolition in certain circumstances.\n\n**Applicability:**\n• Every establishment employing 20+ contract workers\n• Every contractor employing 20+ workers\n\n**Key obligations:**\n• Principal Employer: Registration under Form I, display of abstracts, welfare facilities\n• Contractor: License under Form IV, maintain registers (Form XIII, XIV, XVI, XVII)\n• Welfare facilities: canteen, rest rooms, drinking water, first aid (if 50+ workers)\n• Prohibition of employment in certain processes if prescribed\n\nGOVENICS manages CLRA registration, license, register maintenance, and inspector visit compliance.",
    link: "/sgrc/services",
  },
  {
    id: "what-is-posh",
    topic: "What is POSH Act?",
    aliases: ["what is posh", "posh act meaning", "sexual harassment act", "icc meaning", "prevention of sexual harassment"],
    answer: "The **Prevention, Prohibition & Redressal of Sexual Harassment of Women at Workplace Act, 2013 (POSH Act)** is India's mandatory law protecting women from sexual harassment at the workplace.\n\n**Applicability:** All employers with 10+ employees (organized and unorganized sectors)\n\n**Key obligations:**\n• Constitute an Internal Complaints Committee (ICC) with 4+ members\n• Appoint an external member from an NGO or legal background\n• Draft and display POSH policy\n• Conduct annual POSH awareness training\n• Submit Annual Report (Section 21) to District Officer\n• Complete inquiry within 90 days of complaint receipt\n\n**Penalties:** Up to ₹50,000 fine and cancellation of license for non-compliance.",
    link: "/sgrc/services/posh-compliance",
  },
];

// ─── 12. PRICING & ENGAGEMENT ────────────────────────────────────────
export const pricingCards: KnowledgeCard[] = [
  {
    id: "pricing",
    topic: "Pricing & Engagement Models",
    aliases: ["pricing", "cost", "fees", "how much", "charges", "engagement model", "retainer", "project basis", "how do i engage", "rates", "quotation", "proposal"],
    answer: "GOVENICS operates on flexible engagement models tailored to the scope and complexity of each client's GRC requirements:\n\n• **Retainer Model** – Monthly/Annual retainer for ongoing compliance management, statutory filings, and advisory support\n• **Project-Based** – Fixed-scope engagements for one-time assessments (DPDP readiness, ISO 27001 gap), training, or framework design\n• **Managed Service** – Full outsourcing of compliance function with dedicated specialists\n• **Staff Augmentation** – Deploy GRC professionals on-site at client premises\n\nFor a customized proposal or pricing estimate, request a 30-min Strategy Session with our team.",
    followUpActions: [
      { label: "Request a Proposal", value: "callback", type: "quickReply" },
      { label: "Book Strategy Session", value: "/contact", type: "link" },
    ]
  },
];

// ─── MASTER FLAT INDEX (all cards combined) ──────────────────────────
export const allKnowledgeCards: KnowledgeCard[] = [
  ...aboutCards,
  ...serviceCards,
  ...sgrcCards,
  ...solutionCards,
  ...industryCards,
  ...caseStudyCards,
  ...staffingCards,
  ...resourceCards,
  ...partnerCards,
  ...careerCards,
  ...fundamentalCards,
  ...pricingCards,
];

/**
 * Primary knowledge lookup function.
 * Scores each card by alias match, topic match, and full-text match.
 * Returns top match above threshold, or null.
 */
export const findKnowledgeCard = (query: string): KnowledgeCard | null => {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  let bestCard: KnowledgeCard | null = null;
  let bestScore = 0;

  for (const card of allKnowledgeCards) {
    let score = 0;

    // Exact alias match = highest score
    for (const alias of card.aliases) {
      if (q === alias) { score = Math.max(score, 100); break; }
      if (q.includes(alias)) { score = Math.max(score, 80); }
      if (alias.includes(q) && q.length > 3) { score = Math.max(score, 60); }
    }

    // Topic partial match
    if (q.includes(card.topic.toLowerCase())) score = Math.max(score, 70);
    if (card.topic.toLowerCase().includes(q) && q.length > 4) score = Math.max(score, 55);

    // Full-text answer match (low weight)
    const answerLower = card.answer.toLowerCase();
    if (answerLower.includes(q) && q.length > 5) score = Math.max(score, 30);

    if (score > bestScore) {
      bestScore = score;
      bestCard = card;
    }
  }

  // Return only if score is meaningfully above noise
  return bestScore >= 30 ? bestCard : null;
};

/**
 * Multi-match: returns top N cards that all score above threshold.
 * Useful for broad searches.
 */
export const findTopKnowledgeCards = (query: string, topN = 3): KnowledgeCard[] => {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 3) return [];

  const scored: { card: KnowledgeCard; score: number }[] = [];

  for (const card of allKnowledgeCards) {
    let score = 0;

    for (const alias of card.aliases) {
      if (q === alias) { score = Math.max(score, 100); break; }
      if (q.includes(alias)) score = Math.max(score, 80);
      if (alias.includes(q) && q.length > 3) score = Math.max(score, 60);
    }

    if (q.includes(card.topic.toLowerCase())) score = Math.max(score, 70);
    if (card.topic.toLowerCase().includes(q) && q.length > 4) score = Math.max(score, 55);
    const answerLower = card.answer.toLowerCase();
    if (answerLower.includes(q) && q.length > 5) score = Math.max(score, 30);

    if (score >= 30) scored.push({ card, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.card);
};


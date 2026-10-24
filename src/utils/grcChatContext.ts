import { servicesData } from "@/data/services-data";
import { sgrcServices } from "@/data/sgrc-data";
import { manpowerServicesData } from "@/data/manpower-services-data";

export interface GrcChatAction {
  label: string;
  value: string;
  type: "quickReply" | "link" | "download";
}

export interface GrcPageContext {
  pageTitle: string;
  badgeText: string;
  category: string;
  greeting: string;
  actions: GrcChatAction[];
}

// Cluster name mapper for /industries/:clusterId
const getClusterDisplayName = (id: string): string => {
  switch (id) {
    case "manufacturing-industrial":
      return "Manufacturing & Industrial";
    case "technology-electronics":
    case "technology-telecom":
      return "Technology, Telecom & Electronics";
    case "infrastructure-construction":
    case "real-estate-construction":
      return "Infrastructure & Real Estate";
    case "energy-utilities":
      return "Energy & Utilities";
    case "financial-services":
      return "Financial Services (BFSI)";
    case "healthcare-life-sciences":
    case "healthcare-lifesciences":
      return "Healthcare & Life Sciences";
    case "consumer-retail":
    case "retail-consumer-goods":
      return "Consumer Goods & Retail";
    case "media-services":
    case "public-sector-education":
      return "Media, Services & Public Sector";
    default:
      return id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
  }
};

/**
 * Resolves context, greetings, and dynamic quick replies based on current URL pathname
 */
export const getPageContext = (pathname: string): GrcPageContext => {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, "") || "/";

  // 1. HOME / OVERVIEW
  if (cleanPath === "/") {
    return {
      pageTitle: "Enterprise Governance, Risk & Statutory Portal",
      badgeText: "General GRC Advisory",
      category: "Home",
      greeting:
        "Hello! I am Govey, your Senior GRC Advisor. Welcome to GOVENICS. I can help you locate statutory regulations, audit services, minimum wage slabs, cybersecurity checklists, or run compliance calculators.\n\nWhat compliance area, Act, or state guideline can I locate for you today?",
      actions: [
        { label: "Checklist Scoping Wizard", value: "checklist scoping", type: "quickReply" },
        { label: "Minimum Wages by State", value: "minimum wages", type: "quickReply" },
        { label: "Labour Welfare Fund (LWF)", value: "lwf", type: "quickReply" },
        { label: "Cybersecurity & DPDP Act", value: "cybersecurity", type: "quickReply" },
        { label: "Statutory Calculators", value: "calculators", type: "quickReply" },
        { label: "Request Advisor Callback", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 2. ABOUT US
  if (cleanPath === "/about") {
    return {
      pageTitle: "About GOVENICS & Corporate Credentials",
      badgeText: "Leadership Profile",
      category: "Corporate",
      greeting:
        "Welcome to the GOVENICS Corporate Profile. I can guide you through our advisory methodology, multidisciplinary team (ex-regulators, CISOs, labor lawyers), empanelments, and pan-India statutory track record.\n\nWhat would you like to explore about our firm?",
      actions: [
        { label: "Advisory Methodology", value: "advisory methodology", type: "quickReply" },
        { label: "Leadership & Partners", value: "leadership team", type: "quickReply" },
        { label: "Certifications & Empanelments", value: "certifications", type: "quickReply" },
        { label: "Client Case Studies", value: "case studies", type: "quickReply" },
        { label: "Speak with a Practice Director", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 3. GRC OVERVIEW
  if (cleanPath === "/grc") {
    return {
      pageTitle: "GRC Strategy & Advisory Framework",
      badgeText: "GRC Advisory",
      category: "Advisory",
      greeting:
        "You're exploring our Governance, Risk & Compliance (GRC) framework. We help organizations unify board oversight, enterprise risk posture (ISO 31000/COSO), and dynamic statutory controls. Which GRC pillar are you looking to address?",
      actions: [
        { label: "Enterprise Risk (ERM)", value: "enterprise risk management", type: "quickReply" },
        { label: "Regulatory Compliance", value: "regulatory compliance", type: "quickReply" },
        { label: "Internal Audit & SOX", value: "internal audit", type: "quickReply" },
        { label: "Corporate Governance Charters", value: "governance framework", type: "quickReply" },
        { label: "Request GRC Assessment", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 4. CYBERSECURITY
  if (cleanPath === "/cybersecurity") {
    return {
      pageTitle: "Cybersecurity & Threat Defense",
      badgeText: "Cyber Defense Desk",
      category: "Cybersecurity",
      greeting:
        "Welcome to our Cybersecurity & Defense operations center. I can assist you with VAPT (Web, Mobile, Cloud, Network), ISO/IEC 27001:2022 ISMS, SOC 2 Type II attestation, and India DPDP Act compliance. Which security domain can I help you scope today?",
      actions: [
        { label: "VAPT Scoping Details", value: "vapt scoping", type: "quickReply" },
        { label: "ISO 27001:2022 ISMS", value: "iso 27001", type: "quickReply" },
        { label: "SOC 2 Type II Readiness", value: "soc 2", type: "quickReply" },
        { label: "DPDP Act 2023 Audit", value: "dpdp", type: "quickReply" },
        { label: "Cloud Security Architecture", value: "cloud security", type: "quickReply" },
        { label: "Schedule CISO Consultation", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 5. ESG & SUSTAINABILITY
  if (cleanPath === "/esg") {
    return {
      pageTitle: "ESG & Sustainability Governance",
      badgeText: "ESG & BRSR Advisory",
      category: "ESG",
      greeting:
        "Exploring ESG & Sustainability? I can help you with SEBI BRSR (Business Responsibility & Sustainability Reporting), Scope 1/2/3 carbon footprint accounting, CSR compliance under Companies Act Section 135, and supply chain ESG audits. Where shall we begin?",
      actions: [
        { label: "SEBI BRSR Framework", value: "brsr compliance", type: "quickReply" },
        { label: "Carbon Accounting (Scope 1-3)", value: "carbon footprint", type: "quickReply" },
        { label: "ESG Materiality Matrix", value: "materiality matrix", type: "quickReply" },
        { label: "CSR Section 135 Audit", value: "csr audit", type: "quickReply" },
        { label: "Supply Chain ESG Audits", value: "supply chain esg", type: "quickReply" },
        { label: "Consult ESG Specialist", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 6. SGRC SERVICES CATALOG
  if (cleanPath === "/sgrc/services") {
    return {
      pageTitle: "Statutory GRC Services Catalog",
      badgeText: "Statutory Catalog",
      category: "Statutory GRC",
      greeting:
        "Browse our 10 core Statutory GRC services covering factory licensing, shop & establishment, central labour laws, payroll audits, environmental consent, mines, standing orders, and POSH Act compliance. Which service would you like to inspect?",
      actions: [
        { label: "Factory Compliance", value: "factory compliance", type: "quickReply" },
        { label: "Shop & Establishment", value: "shops establishment", type: "quickReply" },
        { label: "Labour Law Audits", value: "labour laws", type: "quickReply" },
        { label: "Payroll Compliance", value: "payroll compliance", type: "quickReply" },
        { label: "POSH Act 2013", value: "posh compliance", type: "quickReply" },
        { label: "Environmental / EHS", value: "environmental compliance", type: "quickReply" }
      ]
    };
  }

  // 7. SPECIFIC SGRC SERVICE DETAIL (/sgrc/services/:serviceId)
  if (cleanPath.startsWith("/sgrc/services/")) {
    const serviceId = cleanPath.replace("/sgrc/services/", "");
    const matchedService = sgrcServices.find((s) => s.id === serviceId);

    if (matchedService) {
      return {
        pageTitle: matchedService.title,
        badgeText: "Statutory Practice",
        category: "Statutory GRC",
        greeting: `You are reviewing our **${matchedService.title}** practice.\n\n*${matchedService.tagline}*\n\n${matchedService.description}\n\nHow can I help you scope or review statutory requirements for this area?`,
        actions: [
          { label: "Who Needs This?", value: `who needs: ${matchedService.title}`, type: "quickReply" },
          { label: "Key Compliance Features", value: `features: ${matchedService.title}`, type: "quickReply" },
          { label: "Mandatory Registers & Forms", value: `registers: ${matchedService.title}`, type: "quickReply" },
          { label: "Checklist Scoping Wizard", value: "checklist scoping", type: "quickReply" },
          { label: "Request Service Proposal", value: "callback", type: "quickReply" }
        ]
      };
    }
  }

  // 8. GENERAL GRC SERVICE DETAIL (/services/:serviceId)
  if (cleanPath.startsWith("/services/")) {
    const serviceId = cleanPath.replace("/services/", "");
    const matched = servicesData.find((s) => s.id === serviceId);

    if (matched) {
      return {
        pageTitle: matched.title,
        badgeText: matched.category,
        category: "Advisory Service",
        greeting: `You are reviewing our **${matched.title}** practice.\n\n*Challenge:* ${matched.problem}\n\n*Our Solution:* ${matched.solution}\n\nWhat questions can I answer regarding implementation, standards, or team empanelment?`,
        actions: [
          { label: "Applicable Standards", value: `standards: ${matched.title}`, type: "quickReply" },
          { label: "Key Business Benefits", value: `benefits: ${matched.title}`, type: "quickReply" },
          { label: "Industry Coverage", value: `industries: ${matched.title}`, type: "quickReply" },
          { label: "Checklist Scoping", value: "checklist scoping", type: "quickReply" },
          { label: "Request Advisor Callback", value: "callback", type: "quickReply" }
        ]
      };
    }
  }

  // 9. STATUTORY E-LIBRARY
  if (cleanPath === "/sgrc/e-library") {
    return {
      pageTitle: "Statutory E-Library & Labour Acts",
      badgeText: "Statutory Library",
      category: "Legal Repository",
      greeting:
        "Welcome to the Statutory E-Library. Here you can look up minimum wages across 28 states, Labour Welfare Fund (LWF) contribution tables, Professional Tax (PT) brackets, National & Festival Holidays (NFH), and Central Labour Codes. What regulatory data do you need?",
      actions: [
        { label: "Minimum Wages by State", value: "minimum wages", type: "quickReply" },
        { label: "Labour Welfare Fund (LWF)", value: "lwf", type: "quickReply" },
        { label: "Professional Tax (PT) Slabs", value: "pt slabs", type: "quickReply" },
        { label: "Leave & Working Hours", value: "leave working hours", type: "quickReply" },
        { label: "4 Central Labour Codes", value: "labour codes", type: "quickReply" },
        { label: "Statutory Calculators", value: "calculators", type: "quickReply" }
      ]
    };
  }

  // 10. STATUTORY ESTIMATOR & CALCULATOR
  if (cleanPath === "/sgrc/estimator") {
    return {
      pageTitle: "Statutory Compliance Estimators",
      badgeText: "Estimator & Calculators",
      category: "Calculators",
      greeting:
        "Welcome to the Compliance Estimator Hub. You can calculate statutory employer/employee liabilities right here in our chat or on this page. Which calculation would you like to run?",
      actions: [
        { label: "Calculate EPF Liability", value: "calc epf", type: "quickReply" },
        { label: "Calculate Gratuity", value: "calc gratuity", type: "quickReply" },
        { label: "Calculate Professional Tax", value: "calc pt", type: "quickReply" },
        { label: "Compare Income Tax Slabs", value: "calc tax", type: "quickReply" },
        { label: "Checklist Scoping Wizard", value: "checklist scoping", type: "quickReply" },
        { label: "Request Custom Estimate", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 11. INDUSTRIES HUB
  if (cleanPath === "/industries") {
    return {
      pageTitle: "Industries & Sectoral Compliance",
      badgeText: "Sector Specializations",
      category: "Industries",
      greeting:
        "You're viewing our 8 Industry Clusters covering 39+ specialized sectors. From heavy manufacturing and BFSI to healthcare and SaaS, we provide tailored regulatory frameworks. Which sector can I pull regulatory requirements for?",
      actions: [
        { label: "Manufacturing & Industrial", value: "manufacturing compliance", type: "quickReply" },
        { label: "Financial Services (BFSI)", value: "bfsi compliance", type: "quickReply" },
        { label: "Healthcare & Life Sciences", value: "healthcare compliance", type: "quickReply" },
        { label: "Technology & Telecom", value: "technology compliance", type: "quickReply" },
        { label: "Energy & Utilities", value: "energy compliance", type: "quickReply" },
        { label: "Request Industry Consultation", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 12. SPECIFIC INDUSTRY CLUSTER (/industries/:clusterId)
  if (cleanPath.startsWith("/industries/")) {
    const clusterId = cleanPath.replace("/industries/", "");
    const clusterName = getClusterDisplayName(clusterId);

    if (clusterId.includes("financial")) {
      return {
        pageTitle: "Financial Services (BFSI) GRC",
        badgeText: "BFSI Compliance Desk",
        category: "Sector GRC",
        greeting:
          "Welcome to our Financial Services & BFSI advisory. I can help you navigate RBI Master Directions, SEBI LODR, Digital Lending guidelines, CSITE cybersecurity frameworks, and AML/CFT audits. How can I assist your financial institution?",
        actions: [
          { label: "RBI Master Directions", value: "rbi guidelines", type: "quickReply" },
          { label: "SEBI LODR Compliance", value: "sebi lodr", type: "quickReply" },
          { label: "Fintech VAPT & Privacy", value: "fintech vapt", type: "quickReply" },
          { label: "Third-Party Vendor Risk", value: "vendor risk", type: "quickReply" },
          { label: "Speak to BFSI Advisor", value: "callback", type: "quickReply" }
        ]
      };
    }

    if (clusterId.includes("manufacturing")) {
      return {
        pageTitle: "Manufacturing & Industrial Compliance",
        badgeText: "Plant & Factory Desk",
        category: "Sector GRC",
        greeting:
          "Welcome to the Manufacturing & Industrial compliance desk. I can guide you through the Factories Act 1948, State Pollution Control Board (CPCB/SPCB) CTE/CTO renewals, Hazardous Waste rules, and Contract Labour (CLRA) audits. What is your plant's priority?",
        actions: [
          { label: "Factories Act 1948", value: "factories act", type: "quickReply" },
          { label: "Pollution Board CTE/CTO", value: "cto cte consent", type: "quickReply" },
          { label: "Contract Labour (CLRA)", value: "contract labour", type: "quickReply" },
          { label: "Machine Safety & EHS", value: "ehs safety audit", type: "quickReply" },
          { label: "Request Plant Audit", value: "callback", type: "quickReply" }
        ]
      };
    }

    if (clusterId.includes("healthcare")) {
      return {
        pageTitle: "Healthcare & Life Sciences Compliance",
        badgeText: "Healthcare GRC Desk",
        category: "Sector GRC",
        greeting:
          "Welcome to Healthcare & Life Sciences compliance. We guide hospitals, pharmaceutical manufacturers, and clinical labs through Bio-Medical Waste rules, Clinical Establishments Act, NABH/NABL standards, and Drug & Cosmetics regulations. How can I assist?",
        actions: [
          { label: "Bio-Medical Waste Rules", value: "biomedical waste", type: "quickReply" },
          { label: "Clinical Establishments Act", value: "clinical establishments", type: "quickReply" },
          { label: "NABH / NABL Readiness", value: "nabh readiness", type: "quickReply" },
          { label: "Drug & Cosmetics Act", value: "drug cosmetics act", type: "quickReply" },
          { label: "Request Healthcare Audit", value: "callback", type: "quickReply" }
        ]
      };
    }

    if (clusterId.includes("technology") || clusterId.includes("telecom")) {
      return {
        pageTitle: "Technology, Telecom & SaaS GRC",
        badgeText: "Tech Compliance Desk",
        category: "Sector GRC",
        greeting:
          "Welcome to Technology & Telecom GRC. I can help with Digital Personal Data Protection (DPDP) Act readiness, ISO 27001/SOC 2 certifications, TRAI telecommunications regulations, and E-Waste management rules. Which requirement can I explain?",
        actions: [
          { label: "DPDP Act Readiness", value: "dpdp", type: "quickReply" },
          { label: "ISO 27001 & SOC 2", value: "iso 27001", type: "quickReply" },
          { label: "TRAI Telecom Regulations", value: "trai guidelines", type: "quickReply" },
          { label: "E-Waste Management", value: "ewaste compliance", type: "quickReply" },
          { label: "Talk to Tech GRC Specialist", value: "callback", type: "quickReply" }
        ]
      };
    }

    return {
      pageTitle: `${clusterName} Compliance`,
      badgeText: "Sector GRC Desk",
      category: "Sector GRC",
      greeting: `You are exploring our compliance coverage for **${clusterName}**.\n\nWe provide specialized audit checklists, environmental licensing, and statutory registers tailored to this sector. What compliance requirements can I help you locate?`,
      actions: [
        { label: `Applicable Acts: ${clusterName}`, value: `regulations: ${clusterName}`, type: "quickReply" },
        { label: "Audit Checklists", value: "checklist scoping", type: "quickReply" },
        { label: "Key Regulatory Challenges", value: `challenges: ${clusterName}`, type: "quickReply" },
        { label: "Request Sector Consultation", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 13. MANAGED STAFFING HUB
  if (cleanPath === "/staffing") {
    return {
      pageTitle: "Managed Staffing & Manpower Solutions",
      badgeText: "Managed Staffing",
      category: "Staffing",
      greeting:
        "Welcome to GOVENICS Managed Staffing. We provide fully vetted, 100% statutory-compliant talent across Permanent Hiring, Contract / Temp Staffing, Executive Search, and dedicated Compliance Officers. What talent requirements can we solve for you?",
      actions: [
        { label: "Permanent Staffing", value: "permanent staffing", type: "quickReply" },
        { label: "Contract / Temp Staffing", value: "temp staffing", type: "quickReply" },
        { label: "Executive Search", value: "executive search", type: "quickReply" },
        { label: "Compliance Staffing", value: "compliance staffing", type: "quickReply" },
        { label: "RPO Solutions", value: "rpo staffing", type: "quickReply" },
        { label: "Submit Hiring Mandate", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 14. SPECIFIC STAFFING DETAIL (/staffing/:serviceId)
  if (cleanPath.startsWith("/staffing/")) {
    const serviceId = cleanPath.replace("/staffing/", "");
    const matched = manpowerServicesData.find((s) => s.id === serviceId);

    if (matched) {
      return {
        pageTitle: matched.heroTitle,
        badgeText: "Staffing Practice",
        category: "Staffing",
        greeting: `You are exploring our **${matched.heroTitle}** practice.\n\n${matched.shortDescription}\n\nWe provide a rigorous 5-phase screening process with guaranteed statutory compliance (PF/ESI/Gratuity). How can we support your hiring roadmap?`,
        actions: [
          { label: "Key Services Included", value: `services: ${matched.heroTitle}`, type: "quickReply" },
          { label: "Industries Served", value: `industries: ${matched.heroTitle}`, type: "quickReply" },
          { label: "Statutory Compliance Guarantee", value: "staffing compliance guarantee", type: "quickReply" },
          { label: "Submit Hiring Requirement", value: "callback", type: "quickReply" }
        ]
      };
    }
  }

  // 15. RESOURCES & KNOWLEDGE HUB
  if (cleanPath === "/resources" || cleanPath === "/sgrc/resources") {
    return {
      pageTitle: "GRC Resource Hub & Regulatory Bulletins",
      badgeText: "Knowledge Hub",
      category: "Resources",
      greeting:
        "Welcome to our GRC Knowledge Hub. Access expert whitepapers, regulatory amendment bulletins, statutory checklists, and client case studies across Indian and global jurisdictions. What are you looking to research?",
      actions: [
        { label: "Regulatory Bulletins", value: "regulatory bulletins", type: "quickReply" },
        { label: "Audit Checklists", value: "audit checklists", type: "quickReply" },
        { label: "Whitepapers & Insights", value: "whitepapers", type: "quickReply" },
        { label: "Client Case Studies", value: "case studies", type: "quickReply" },
        { label: "Subscribe to Legal Updates", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 16. CONTACT & CONSULTATION
  if (cleanPath === "/contact") {
    return {
      pageTitle: "Advisory Consultation & Contact",
      badgeText: "Consultation Desk",
      category: "Contact",
      greeting:
        "Welcome to our Advisory Consultation desk! I can immediately schedule an exploratory session with our Senior Practice Directors, route your compliance RFP, or take your message directly. How would you prefer to connect?",
      actions: [
        { label: "Schedule 15-min Call", value: "callback", type: "quickReply" },
        { label: "Request RFP Proposal", value: "request proposal", type: "quickReply" },
        { label: "Office Address & Phones", value: "office locations", type: "quickReply" },
        { label: "Ask a Specific Question", value: "ask question", type: "quickReply" }
      ]
    };
  }

  // 17. PARTNERS
  if (cleanPath === "/partners") {
    return {
      pageTitle: "Partnership & Ecosystem Network",
      badgeText: "Partner Ecosystem",
      category: "Partners",
      greeting:
        "Exploring our Partner Ecosystem? We collaborate with corporate law firms, CA practices, HRMS/ERP platforms, and managed service providers. How would your organization like to collaborate with GOVENICS?",
      actions: [
        { label: "Alliance Models", value: "partner models", type: "quickReply" },
        { label: "Technology Integrations", value: "tech integrations", type: "quickReply" },
        { label: "Channel Partner Program", value: "channel partners", type: "quickReply" },
        { label: "Connect with Alliance Lead", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 18. CAREERS
  if (cleanPath === "/careers") {
    return {
      pageTitle: "Careers at GOVENICS",
      badgeText: "Talent & Culture",
      category: "Careers",
      greeting:
        "Interested in joining the GOVENICS team? We hire statutory compliance auditors, cybersecurity analysts, ESG consultants, and enterprise advisors. What type of role aligns with your background?",
      actions: [
        { label: "Compliance Auditor Roles", value: "auditor jobs", type: "quickReply" },
        { label: "Cybersecurity Analyst Roles", value: "cyber jobs", type: "quickReply" },
        { label: "Work Culture & Benefits", value: "work culture", type: "quickReply" },
        { label: "Submit Spontaneous Resume", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 19. ANALYTICS / TELEMETRY
  if (cleanPath === "/analytics") {
    return {
      pageTitle: "Compliance Telemetry & Analytics",
      badgeText: "Analytics Monitor",
      category: "Analytics",
      greeting:
        "You are viewing the internal compliance intelligence dashboard. Here we monitor visitor interactions, calculator usage, and statutory inquiry trends. How can I help you interpret this telemetry?",
      actions: [
        { label: "Top Inquired Regulations", value: "popular regulations", type: "quickReply" },
        { label: "Calculator Usage Stats", value: "calculator stats", type: "quickReply" },
        { label: "Lead Conversion Summary", value: "lead stats", type: "quickReply" },
        { label: "Schedule Platform Demo", value: "callback", type: "quickReply" }
      ]
    };
  }

  // 20. LEGAL / PRIVACY / TERMS
  if (cleanPath === "/privacy" || cleanPath === "/terms" || cleanPath === "/cookies") {
    return {
      pageTitle: "Legal, Privacy & Data Governance",
      badgeText: "Data Privacy & Terms",
      category: "Legal",
      greeting:
        "You are reviewing our legal policies and data governance commitments under the Digital Personal Data Protection (DPDP) Act 2023. Do you have any questions regarding your privacy rights, data retention, or security controls?",
      actions: [
        { label: "DPDP Act Rights", value: "dpdp rights", type: "quickReply" },
        { label: "Data Retention Terms", value: "data retention", type: "quickReply" },
        { label: "Cookie Policy Details", value: "cookies policy", type: "quickReply" },
        { label: "Contact Data Protection Officer", value: "callback", type: "quickReply" }
      ]
    };
  }

  // DEFAULT FALLBACK
  return {
    pageTitle: "Enterprise GRC & Statutory Portal",
    badgeText: "Senior GRC Advisor",
    category: "General",
    greeting:
      "Hello! I am Govey, your Senior GRC Advisor. I can help you search statutory documents, active regulations, audit services, and GRC readiness checklists.\n\nWhat compliance area, Act, or state guideline can I locate for you today?",
    actions: [
      { label: "Checklist Scoping Wizard", value: "checklist scoping", type: "quickReply" },
      { label: "Minimum Wages by State", value: "minimum wages", type: "quickReply" },
      { label: "Labour Welfare Fund (LWF)", value: "lwf", type: "quickReply" },
      { label: "DPDP Act Readiness", value: "dpdp", type: "quickReply" },
      { label: "Statutory Calculators", value: "calculators", type: "quickReply" },
      { label: "Request Advisor Callback", value: "callback", type: "quickReply" }
    ]
  };
};

/**
 * Returns tailored contextual response for page-specific queries & actions
 */
export const getContextualActionResponse = (query: string, _pathname?: string): string | null => {
  const q = query.toLowerCase().trim();

  // Cybersecurity queries
  if (q.includes("vapt scoping")) {
    return `### VAPT (Vulnerability Assessment & Penetration Testing) Scoping\n
Our VAPT methodology follows OWASP Top 10, SANS 25, and NIST SP 800-115 benchmarks.

**Core Scopes Covered:**
• **Web & API Security:** GraphQL, REST, authentication bypass, injection, IDOR.
• **Mobile App Security:** Android APK and iOS IPA reverse engineering & runtime tampering.
• **Cloud Infrastructure:** AWS / Azure / GCP IAM misconfigurations, S3 bucket exposure.
• **Internal/External Network:** Port scanning, firewall bypass, active directory penetration.

*Deliverables:* Executive Board Summary, Technical Remediation Tracker with CVSS 3.1 scores, and a complimentary Re-testing Certification once patches are applied.`;
  }

  if (q.includes("iso 27001")) {
    return `### ISO/IEC 27001:2022 ISMS Certification Roadmap\n
We guide organizations from zero-baseline to formal UKAS/NABCB accredited certification.

**Key Phases:**
1. **Scope Definition & Gap Analysis:** Identifying information assets and control baselines.
2. **Risk Assessment & Treatment Plan:** Quantifying threat likelihood and impact.
3. **Statement of Applicability (SoA):** Mapping against the 93 updated Annex A controls across 4 themes (Organizational, People, Physical, Technological).
4. **Internal Audit & Management Review:** Conducting mandatory pre-audit checks.
5. **Stage 1 & Stage 2 External Audits:** Direct auditor accompaniment and zero-major-NC guarantee.`;
  }

  if (q.includes("soc 2")) {
    return `### SOC 2 Type I & Type II Attestation\n
Essential for SaaS, cloud vendors, and global IT suppliers dealing with US & European enterprise clients.

**Trust Services Criteria (TSC) Covered:**
• **Security (Common Criteria):** Mandatory access controls, encryption at rest/transit.
• **Availability:** Disaster recovery, RTO/RPO validation, high-availability clusters.
• **Processing Integrity:** Error checking, data quality pipelines.
• **Confidentiality & Privacy:** Strict access boundaries and personal data isolation.

*Type I:* Tests control design at a point in time.
*Type II:* Tests operating effectiveness over a 3 to 6-month observation window.`;
  }

  if (q.includes("dpdp") || q.includes("dpdp act")) {
    return `### Digital Personal Data Protection (DPDP) Act 2023 Readiness\n
India's statutory data protection law enforces strict accountability on **Data Fiduciaries** with penalties up to **₹250 Crores** for breaches.

**Compliance Mandates We Implement:**
• **Notice & Consent Architecture:** Multi-lingual, itemized consent notices.
• **Data Principal Rights Management:** Systems for access, correction, erasure, and grievance redressal.
• **Child Data Protection:** Verifiable parental consent mechanism and ban on behavioral tracking.
• **Data Protection Officer (DPO):** Empaneling or training qualified DPOs.
• **Cross-Border Transfer Registers:** Adherence to government blacklists/whitelists.`;
  }

  // ESG queries
  if (q.includes("brsr") || q.includes("sebi brsr")) {
    return `### SEBI Business Responsibility & Sustainability Reporting (BRSR)\n
Mandatory for India's top 1,000 listed entities by market capitalization, with BRSR Core requiring reasonable assurance.

**The 9 Core Principles Covered:**
1. Business Integrity & Anti-Corruption
2. Sustainable & Safe Goods/Services
3. Employee Well-being, Safety & POSH
4. Stakeholder Responsiveness
5. Human Rights Due Diligence
6. Environment (Energy, GHG, Water, Waste)
7. Public Policy & Trade Advocacy
8. Inclusive Growth & CSR Impact
9. Consumer Value & Data Privacy`;
  }

  if (q.includes("carbon footprint") || q.includes("carbon accounting")) {
    return `### Carbon Footprint & GHG Accounting (Scopes 1, 2, and 3)\n
Quantify and reduce greenhouse gas emissions following the global **GHG Protocol Corporate Standard**.

• **Scope 1 (Direct Emissions):** Fuel combustion in boilers, furnaces, and company-owned vehicles.
• **Scope 2 (Indirect Emissions):** Purchased electricity, steam, heating, and cooling.
• **Scope 3 (Value Chain):** Upstream raw material transport, business travel, employee commuting, and product end-of-life disposal.

*Outcome:* ISO 14064 verified carbon inventory and target pathway for Net-Zero alignment.`;
  }

  // Statutory queries
  if (q.includes("factory license") || q.includes("factories act")) {
    return `### Factories Act 1948 Compliance & Licensing\n
Applicable to premises with 10+ workers using power, or 20+ workers without power.

**Key Statutory Obligations:**
• **Factory Site Plan Approval & Endorsement** from the Chief Inspector of Factories (CIF).
• **Renewal of Factory License** (Annual or multi-year block).
• **Statutory Health & Welfare:** Adequate ventilation, spittoons, clean drinking water, crèche facility (if 30+ female staff), canteen (if 250+ workers), safety officer (if 1,000+ workers).
• **Mandatory Registers:** Form 11 (Adult Workers), Form 12 (Attendance), Form 17 (Health), Form 25 (Muster Roll / Overtime).`;
  }

  if (q.includes("shops establishment") || q.includes("shop and establishment")) {
    return `### Shop & Commercial Establishment Act Compliance\n
Governed by state-specific enactments (e.g., Delhi Shops Act, Karnataka Shops & Commercial Establishments Act, Maharashtra S&E Act).

**Key Requirements:**
• Registration within 30 days of opening premises.
• Display of Registration Certificate in a conspicuous location.
• Adherence to maximum weekly working hours (typically 48 hrs) and mandatory weekly off.
• Maintenance of Leave Registers, Fine Registers, and Wage Registers.
• Submission of Annual Returns to the local Labour Commissioner.`;
  }

  if (q.includes("labour laws") || q.includes("labour codes")) {
    return `### Central Labour Laws & 4 Central Labour Codes\n
India is transitioning from 29 fragmented central enactments to 4 unified Labour Codes:

1. **Code on Wages, 2019:** Rationalizes minimum wages, equal remuneration, and bonus payout timelines.
2. **Industrial Relations Code, 2020:** Amalgamates Trade Unions Act, Industrial Employment (Standing Orders) Act, and Industrial Disputes Act.
3. **Code on Social Security, 2020:** Extends EPF, ESIC, and gratuity benefits to gig and platform workers.
4. **OSH & Working Conditions Code, 2020:** Standards for safety, health, annual health check-ups, and overtime regulation.`;
  }

  // Staffing queries
  if (q.includes("permanent staffing")) {
    return `### Permanent Staffing (Direct Hire)\n
Our permanent staffing solution builds your core leadership and technical teams:

• **5-Phase Screening:** Technical evaluation, behavioral alignment, statutory credentials check, background verification, and executive culture fit.
• **90-Day Replacement Guarantee:** If a placed candidate leaves within 90 days, we replace them at no extra fee.
• **Industries:** Manufacturing, BFSI, Healthcare & Pharma, IT & SaaS, Energy, and Retail.`;
  }

  // General corporate
  if (q.includes("advisory methodology")) {
    return `### GOVENICS 4-Stage GRC Advisory Methodology\n
1. **Discovery & Baseline Gap Analysis:** Detailed mapping of physical facilities, contractor rosters, legal registers, and digital assets against statutory rules.
2. **Architecture & Register Optimization:** Setting up standardized SOPs, automated reminder workflows, and board delegation matrices.
3. **Operational Telemetry & Technology:** Deploying real-time compliance dashboards and tracking systems.
4. **Continuous Audit & Board Assurance:** Periodic unannounced mock audits, annual statutory filings, and zero-liability sign-offs.`;
  }

  if (q.includes("office locations") || q.includes("contact")) {
    return `### GOVENICS Headquarters & Contact Channels\n
• **Corporate Headquarters:** GOVENICS GRC Advisory Tower, Financial District, Hyderabad, India.
• **Regional Practice Centers:** Mumbai, Bengaluru, New Delhi, Chennai.
• **Direct Advisory Hotline:** +91 (040) 4892-7100
• **Statutory Desk Email:** advisory@govenics.com
• **Emergency Audit Response:** response@govenics.com`;
  }

  return null;
};

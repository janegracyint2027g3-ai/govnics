export interface MegaMenuData {
  id: string;
  overview: string;
  offerings: string[];
  industries: string[];
  benefits: string[];
  stats: string[];
  cta: {
    message: string;
    buttonLabel: string;
    href: string;
  };
}

export const megaMenuData: Record<string, MegaMenuData> = {
  // Offerings
  "compliance": {
    id: "compliance",
    overview: "Enterprise compliance and governance solutions to align operations with statutory and global standards.",
    offerings: [
      "Regulatory Compliance",
      "Internal Audits",
      "Legal Registers",
      "Policy Management",
      "Compliance Monitoring",
      "Training & Awareness"
    ],
    industries: ["Healthcare", "Manufacturing", "IT Services", "BFSI", "Retail", "Pharmaceuticals"],
    benefits: [
      "Reduce Compliance Risks",
      "Improve Operational Efficiency",
      "Faster Regulatory Readiness",
      "Enterprise-grade Governance Frameworks"
    ],
    stats: [
      "Industry-specific compliance solutions",
      "Enterprise consulting expertise",
      "Scalable governance models"
    ],
    cta: {
      message: "Need help managing regulatory compliance?",
      buttonLabel: "Talk to Our Experts",
      href: "/contact"
    }
  },
  "risk": {
    id: "risk",
    overview: "Comprehensive risk management services to identify, measure, and mitigate enterprise-wide threats.",
    offerings: [
      "Risk Assessments",
      "Operational Risk",
      "Vendor Risk",
      "Cyber Risk",
      "Financial Risk",
      "Risk Reporting"
    ],
    industries: ["Banking", "IT Services", "Manufacturing", "Energy", "Logistics", "Healthcare"],
    benefits: [
      "Mitigate Business Risks",
      "Protect Shareholder Value",
      "Enhance Vendor Resilience",
      "Proactive Threat Detection"
    ],
    stats: [
      "Comprehensive Risk Assessments",
      "Vendor & Third-Party Audits",
      "Continuous Monitoring"
    ],
    cta: {
      message: "Want to identify and mitigate business risks?",
      buttonLabel: "Request Risk Assessment",
      href: "/contact"
    }
  },
  "governance": {
    id: "governance",
    overview: "Establish strong corporate governance structures to ensure transparency, accountability, and ethical conduct.",
    offerings: [
      "Board Charters",
      "Delegation of Authority",
      "HR Policy Governance",
      "Code of Conduct",
      "Whistleblower Setup",
      "Corporate Ethics"
    ],
    industries: ["Financial Services", "IT Services", "Media", "Telecom", "Healthcare", "Retail"],
    benefits: [
      "Ensure Transparent Governance",
      "Align with Global Best Practices",
      "Foster Ethical Cultures",
      "Improve Investor Confidence"
    ],
    stats: [
      "Board-level Consulting",
      "Ethical Policy Frameworks",
      "Corporate Transparency"
    ],
    cta: {
      message: "Build a future-ready governance framework.",
      buttonLabel: "Get Expert Guidance",
      href: "/contact"
    }
  },
  "cybersecurity": {
    id: "cybersecurity",
    overview: "Advanced data protection and cybersecurity frameworks to secure your digital infrastructure against emerging threats.",
    offerings: [
      "VAPT Services",
      "ISO 27001 Consulting",
      "Data Protection",
      "SOC Services",
      "Security Awareness",
      "Incident Response"
    ],
    industries: ["IT Services", "BFSI", "Healthcare", "E-commerce", "SaaS", "Telecom"],
    benefits: [
      "Zero-Trust Architecture",
      "Mitigate Cyber Breaches",
      "Achieve ISO/SOC Certification",
      "Real-time Threat Monitoring"
    ],
    stats: [
      "CERT-In Empanelled Experts",
      "Comprehensive VAPT Audits",
      "Global Data Privacy compliance"
    ],
    cta: {
      message: "Strengthen your cybersecurity posture today.",
      buttonLabel: "Schedule Security Consultation",
      href: "/contact"
    }
  },
  "esg": {
    id: "esg",
    overview: "Comprehensive sustainability and advisory services to drive environmental compliance and social responsibility.",
    offerings: [
      "BRSR Reporting",
      "Carbon Footprint Analysis",
      "EHS Compliance",
      "Social & Labor Audits",
      "Governance Advisory",
      "Green Financing"
    ],
    industries: ["Manufacturing", "Energy", "Automotive", "Logistics", "Retail", "Infrastructure"],
    benefits: [
      "Meet SEBI BRSR Mandates",
      "Attract ESG-focused Investors",
      "Reduce Carbon Emissions",
      "Enhance Brand Reputation"
    ],
    stats: [
      "End-to-End ESG Reporting",
      "Net-Zero Transition Strategy",
      "Supply Chain Audits"
    ],
    cta: {
      message: "Start your ESG and sustainability journey.",
      buttonLabel: "Explore ESG Solutions",
      href: "/contact"
    }
  },
  "staffing": {
    id: "staffing",
    overview: "Flexible staffing and workforce consulting modules mapped to your exact project needs.",
    offerings: [
      "Permanent Staffing",
      "Contract Staffing",
      "Project Staffing",
      "RPO Services",
      "Managed Hiring",
      "Workforce Consulting",
      "Healthcare Staffing",
      "Manufacturing",
      "Facility Management",
      "IT & Campus Housekeeping"
    ],
    industries: ["IT Services", "Manufacturing", "Pharma", "Healthcare", "Retail", "Logistics"],
    benefits: [
      "Faster Time-to-Hire",
      "Scale Workforce Dynamically",
      "Zero Co-employment Risk",
      "Vetted & Compliant Talent"
    ],
    stats: [
      "Pan-India Talent Sourcing",
      "SLA-driven RPO Models",
      "100% Statutory Compliance"
    ],
    cta: {
      message: "Looking for the right staffing model?",
      buttonLabel: "Contact Our Team",
      href: "/contact"
    }
  },

  // Industries (Whom We Serve clusters)
  "food-processing,-pharma-&-healthcare": {
    id: "food-processing,-pharma-&-healthcare",
    overview: "Specialized GRC consulting and quality assurance frameworks for highly regulated life sciences and care sectors.",
    offerings: [
      "Quality Management Systems",
      "FDA/CDSCO Audit Support",
      "Clinical Trial Compliance",
      "Supply Chain Traceability",
      "Health Data Privacy",
      "EHS Regulations"
    ],
    industries: ["Pharmaceuticals", "Healthcare Providers", "Medical Devices", "Food Processing", "Ayush", "Biotech"],
    benefits: [
      "Clear Regulatory Audits",
      "Ensure Patient Data Security",
      "Minimize Product Recalls",
      "Global Standard Alignment"
    ],
    stats: [
      "Deep Domain Expertise",
      "Stringent Quality Audits",
      "HIPAA/DPDP Implementation"
    ],
    cta: {
      message: "Operating in heavily regulated life sciences?",
      buttonLabel: "Book Industry Consultation",
      href: "/contact"
    }
  },
  "manufacturing-&-industrial": {
    id: "manufacturing-&-industrial",
    overview: "Operational risk and compliance strategies to maintain factory safety and robust supply chain integrity.",
    offerings: [
      "Factory Act Compliance",
      "Labor Law Advisory",
      "EHS & Safety Audits",
      "Vendor Risk Assessments",
      "Machinery Standards",
      "Waste Management"
    ],
    industries: ["Automobiles", "Heavy Engineering", "Textiles", "Chemicals", "Electronics", "FMCG"],
    benefits: [
      "Zero Factory Shutdowns",
      "Ensure Worker Safety",
      "Resilient Supply Chains",
      "Environmental Code Adherence"
    ],
    stats: [
      "Complete EHS Frameworks",
      "Supply Chain Traceability",
      "Contract Labor Management"
    ],
    cta: {
      message: "Need robust manufacturing compliance?",
      buttonLabel: "Get Expert Guidance",
      href: "/contact"
    }
  },
  "technology-&-electronics": {
    id: "technology-&-electronics",
    overview: "Digital governance and compliance for rapidly evolving technology, SaaS, and electronics hardware sectors.",
    offerings: [
      "Software IP Protection",
      "Global Data Privacy",
      "Cloud Security Standards",
      "E-Waste Compliance",
      "Export Controls",
      "SaaS Audit Readiness"
    ],
    industries: ["IT Services", "SaaS", "Semiconductors", "Consumer Electronics", "Telecom", "AI/ML"],
    benefits: [
      "Secure Digital Assets",
      "Scale Globally Faster",
      "Prevent Data Breaches",
      "Meet Hardware Standards"
    ],
    stats: [
      "SOC 2 & ISO Implementations",
      "DPDP Compliance Roadmaps",
      "AI Governance Models"
    ],
    cta: {
      message: "Scaling your technology enterprise?",
      buttonLabel: "Schedule Tech Consultation",
      href: "/contact"
    }
  },
  "infrastructure-&-construction": {
    id: "infrastructure-&-construction",
    overview: "Regulatory adherence and project risk management for large-scale civil and infrastructure developments.",
    offerings: [
      "BOCW Act Compliance",
      "Land Acquisition Advisory",
      "Environmental Clearances",
      "Contractor Risk Mgmt",
      "Project Finance Audit",
      "Safety Protocols"
    ],
    industries: ["Real Estate", "Highways", "Ports", "Urban Infra", "Logistics Parks", "Smart Cities"],
    benefits: [
      "Avoid Project Delays",
      "Ensure Site Safety",
      "Clear Land Titles",
      "Streamlined Approvals"
    ],
    stats: [
      "End-to-End Site Audits",
      "Contractor Labor Tracking",
      "EHS Implementation"
    ],
    cta: {
      message: "Managing large infrastructure projects?",
      buttonLabel: "Talk to Our Experts",
      href: "/contact"
    }
  },
  "energy-&-utilities": {
    id: "energy-&-utilities",
    overview: "Energy regulations, environmental impact strategies, and governance for power generation and distribution.",
    offerings: [
      "Renewable Energy Regs",
      "Grid Compliance",
      "Environmental Impact Assessment",
      "Tariff Strategy",
      "Asset Risk Management",
      "Sustainability Reporting"
    ],
    industries: ["Renewable Energy", "Oil & Gas", "Power Distribution", "Water Utilities", "Mining", "Cleantech"],
    benefits: [
      "Navigate Complex Tariffs",
      "Achieve ESG Goals",
      "Minimize Environmental Fines",
      "Optimize Asset Lifecycles"
    ],
    stats: [
      "Cleantech Advisory",
      "Regulatory Filing Support",
      "Grid Security Standards"
    ],
    cta: {
      message: "Navigating energy sector regulations?",
      buttonLabel: "Get Sector Expertise",
      href: "/contact"
    }
  },
  "financial-services": {
    id: "financial-services",
    overview: "Rigorous financial, systemic, and operational risk frameworks designed for banking and capital markets.",
    offerings: [
      "SEBI/RBI Regulations",
      "Anti-Money Laundering (AML)",
      "Fintech Compliance",
      "Credit Risk Models",
      "Cyber Resilience",
      "Capital Adequacy"
    ],
    industries: ["Banking", "NBFCs", "Insurance", "Capital Markets", "Fintech", "Microfinance"],
    benefits: [
      "Prevent RBI/SEBI Penalties",
      "Enhance Cyber Resilience",
      "Protect Customer Assets",
      "Streamline AML Audits"
    ],
    stats: [
      "BFSI Domain Experts",
      "Continuous Monitoring",
      "Audit Committee Support"
    ],
    cta: {
      message: "Ensure absolute financial compliance?",
      buttonLabel: "Book Financial Consultation",
      href: "/contact"
    }
  },
  "healthcare-&-life-sciences": {
    id: "healthcare-&-life-sciences",
    overview: "Quality, safety, and regulatory intelligence for healthcare providers and medical life sciences.",
    offerings: [
      "Clinical Compliance",
      "NABH Accreditation",
      "Medical Device Regs",
      "Patient Data Security",
      "Telemedicine Laws",
      "Drug Pricing (DPCO)"
    ],
    industries: ["Hospitals", "Clinics", "Diagnostics", "Telehealth", "MedTech", "Ayush"],
    benefits: [
      "Improve Patient Safety",
      "Secure Health Records",
      "Accelerate Accreditations",
      "Clear Equipment Audits"
    ],
    stats: [
      "Healthcare Advisory",
      "NABH/JCI Preparedness",
      "Clinical Quality Protocols"
    ],
    cta: {
      message: "Strengthen healthcare compliance?",
      buttonLabel: "Request Assessment",
      href: "/contact"
    }
  },
  "consumer-&-retail": {
    id: "consumer-&-retail",
    overview: "Consumer protection, supply chain tracing, and legal metrology compliance for retail and FMCG.",
    offerings: [
      "Legal Metrology",
      "E-commerce Regulations",
      "FSSAI Compliance",
      "Consumer Data Privacy",
      "Supply Chain Ethics",
      "Franchise Advisory"
    ],
    industries: ["Retail", "FMCG", "E-commerce", "D2C Brands", "Luxury", "Apparel"],
    benefits: [
      "Ensure Product Labeling",
      "Scale Retail Footprint",
      "Protect Consumer Data",
      "Ethical Sourcing"
    ],
    stats: [
      "Retail Sector Specialists",
      "Pan-India Metrology",
      "FMCG Quality Audits"
    ],
    cta: {
      message: "Scaling your retail footprint safely?",
      buttonLabel: "Contact Our Team",
      href: "/contact"
    }
  },
  "media-&-services": {
    id: "media-&-services",
    overview: "IP protection, broadcasting compliance, and digital governance for media and professional services.",
    offerings: [
      "Intellectual Property",
      "Broadcasting Regs",
      "OTT Platform Guidelines",
      "Content Moderation",
      "Advertising Standards",
      "Data Governance"
    ],
    industries: ["Media & Entertainment", "EdTech", "Logistics", "Professional Services", "Gaming", "Publishing"],
    benefits: [
      "Protect IP Rights",
      "Navigate Content Laws",
      "Comply with MIB Rules",
      "Secure Subscriber Data"
    ],
    stats: [
      "Media Sector Advisory",
      "IP Portfolio Management",
      "Digital Platform Audits"
    ],
    cta: {
      message: "Navigating digital and media regulations?",
      buttonLabel: "Get Expert Guidance",
      href: "/contact"
    }
  },

  "food-processing,-pharma-healthcare": {
    id: "food-processing,-pharma-healthcare",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Food Processing, Pharma & Healthcare sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Food Processing", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Food Processing, Pharma & Healthcare?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/food-processing,-pharma-healthcare"
    }
  },
  "manufacturing-industrial": {
    id: "manufacturing-industrial",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Manufacturing & Industrial sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Manufacturing & Industrial", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Manufacturing & Industrial?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/manufacturing-industrial"
    }
  },
  "technology-electronics": {
    id: "technology-electronics",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Technology & Electronics sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Technology & Electronics", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Technology & Electronics?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/technology-electronics"
    }
  },
  "infrastructure-construction": {
    id: "infrastructure-construction",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Infrastructure & Construction sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Infrastructure & Construction", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Infrastructure & Construction?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/infrastructure-construction"
    }
  },
  "energy-utilities": {
    id: "energy-utilities",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Energy & Utilities sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Energy & Utilities", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Energy & Utilities?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/energy-utilities"
    }
  },
  "healthcare-life-sciences": {
    id: "healthcare-life-sciences",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Healthcare & Life Sciences sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Healthcare & Life Sciences", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Healthcare & Life Sciences?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/healthcare-life-sciences"
    }
  },
  "consumer-retail": {
    id: "consumer-retail",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Consumer & Retail sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Consumer & Retail", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Consumer & Retail?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/consumer-retail"
    }
  },
  "media-services": {
    id: "media-services",
    overview: "Specialized compliance, risk, and governance solutions tailored specifically for the Media & Services sector.",
    offerings: [
      "Regulatory Compliance",
      "Risk Management",
      "Operational Audits",
      "Vendor Governance",
      "Data Protection",
      "Workforce Compliance"
    ],
    industries: ["Media & Services", "Enterprise", "Mid-Market", "Startups", "Global Ops", "Supply Chain"],
    benefits: [
      "Sector-Specific Expertise",
      "Mitigate Regulatory Fines",
      "Streamline Operations",
      "Enhance Stakeholder Trust"
    ],
    stats: [
      "Industry-tailored frameworks",
      "End-to-end risk mapping",
      "Dedicated subject experts"
    ],
    cta: {
      message: "Need tailored solutions for Media & Services?",
      buttonLabel: "Contact Our Experts",
      href: "/industries/media-services"
    }
  },

  "regulatory-risk": {
    id: "regulatory-risk",
    overview: "Failure to comply with laws, rules, or government standards. Non-compliance with tax laws, labor laws, or industry-specific regulations.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating regulatory risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "operational-risk": {
    id: "operational-risk",
    overview: "Gaps in processes, training, or controls leading to violations. Untrained staff mishandling data, missed reporting deadlines.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating operational risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "governance-risk": {
    id: "governance-risk",
    overview: "Weak board oversight or poor internal controls. Misclassified revenue, inaccurate financial reporting.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating governance risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "financial-risk": {
    id: "financial-risk",
    overview: "Errors in accounting, reporting, or disclosures. SEC penalties, investor lawsuits.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating financial risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "vendor-risk": {
    id: "vendor-risk",
    overview: "Exposure from suppliers or partners failing compliance. Vendor data breach triggering GDPR fines.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating vendor / third-party risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "cybersecurity-risk": {
    id: "cybersecurity-risk",
    overview: "Breaches of personal or sensitive data. GDPR/HIPAA fines, reputational damage.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating cybersecurity & data protection risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "esg-risk": {
    id: "esg-risk",
    overview: "Misreporting or failing sustainability obligations. Greenwashing accusations, BRSR misalignment.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating esg risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "ai-risk": {
    id: "ai-risk",
    overview: "Bias, privacy, or transparency failures in AI systems. Algorithmic discrimination, lack of explainability.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating ai & technology risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
  "people-risk": {
    id: "people-risk",
    overview: "Human error, unclear roles, or insufficient training. 91% of compliance incidents stem from staff mistakes.",
    offerings: [
      "Risk Identification",
      "Impact Assessment",
      "Controls Implementation",
      "Continuous Monitoring",
      "Incident Response",
      "Board Reporting"
    ],
    industries: ["Enterprise", "Financial Services", "Healthcare", "Technology", "Manufacturing", "Retail"],
    benefits: [
      "Prevent Costly Violations",
      "Protect Brand Reputation",
      "Ensure Business Continuity",
      "Strengthen Internal Controls"
    ],
    stats: [
      "Proactive threat detection",
      "Enterprise-wide coverage",
      "Custom mitigation strategies"
    ],
    cta: {
      message: "Need help mitigating people risk?",
      buttonLabel: "Get a Risk Assessment",
      href: "/contact"
    }
  },
};

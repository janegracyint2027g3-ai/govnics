export interface MenuSubItem {
  id: string;
  title: string;
  href: string;
}

export interface IndustryMenuItem {
  id: string;
  name: string;
  icon: string;
  href: string;
  subItems: MenuSubItem[];
}

export interface CardMenuItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  description?: string;
  subItems?: MenuSubItem[];
}

export interface MenuSection {
  title: string;
  description: string;
  items: CardMenuItem[];
}

export interface MegaMenuData {
  menuKey: "solutions" | "case-studies";
  leftColumn: {
    heading: string;
    description: string;
    searchPlaceholder: string;
    viewAllLink: {
      label: string;
      href: string;
    };
    industries: IndustryMenuItem[];
  };
  rightColumn: {
    complianceDomains: MenuSection;
    secondSection: MenuSection;
    cta: {
      text: string;
      buttonText: string;
      buttonHref: string;
    };
  };
}

export const solutionsMenuData: MegaMenuData = {
  menuKey: "solutions",
  leftColumn: {
    heading: "INDUSTRIES",
    description: "Pre-defined compliance assets by sector",
    searchPlaceholder: "Search industries or topics…",
    viewAllLink: {
      label: "View all industries directory →",
      href: "/solutions"
    },
    industries: [
      {
        id: "bfsi-fintech",
        name: "BFSI & Fintech",
        icon: "Landmark",
        href: "/solutions?sector=bfsi-fintech",
        subItems: [
          { id: "banking-nbfcs", title: "Banking & NBFCs", href: "/solutions?sector=bfsi-fintech#banking-nbfcs" },
          { id: "insurance", title: "Insurance", href: "/solutions?sector=bfsi-fintech#insurance" },
          { id: "payments-lending", title: "Payments & Digital Lending", href: "/solutions?sector=bfsi-fintech#payments-digital-lending" },
          { id: "capital-markets", title: "Capital Markets", href: "/solutions?sector=bfsi-fintech#capital-markets" }
        ]
      },
      {
        id: "manufacturing-industrial",
        name: "Manufacturing & Industrial",
        icon: "Factory",
        href: "/solutions?sector=manufacturing-industrial",
        subItems: [
          { id: "automotive", title: "Automotive", href: "/solutions?sector=manufacturing-industrial#automotive" },
          { id: "electronics-semi", title: "Electronics & Semiconductors", href: "/solutions?sector=manufacturing-industrial#electronics-semiconductors" },
          { id: "pharma-lifesciences", title: "Pharmaceuticals & Life Sciences", href: "/solutions?sector=manufacturing-industrial#pharma-lifesciences" },
          { id: "fmcg-food", title: "Food Processing & FMCG", href: "/solutions?sector=manufacturing-industrial#food-processing-fmcg" },
          { id: "heavy-engineering", title: "Heavy Engineering", href: "/solutions?sector=manufacturing-industrial#heavy-engineering" },
          { id: "shopfloor-ops", title: "Shopfloor & Production Operations", href: "/solutions?sector=manufacturing-industrial#shopfloor-production" },
          { id: "warehouse-infra", title: "Warehouse & Logistics Infrastructure", href: "/solutions?sector=manufacturing-industrial#warehouse-logistics-infra" }
        ]
      },
      {
        id: "healthcare-hospitals",
        name: "Healthcare & Hospitals",
        icon: "Stethoscope",
        href: "/solutions?sector=healthcare-hospitals",
        subItems: [
          { id: "multi-specialty-hospitals", title: "Multi-specialty Hospitals", href: "/solutions?sector=healthcare-hospitals#multispecialty-hospitals" },
          { id: "diagnostic-chains", title: "Diagnostic Chains", href: "/solutions?sector=healthcare-hospitals#diagnostic-chains" },
          { id: "cro", title: "Clinical Research Organizations", href: "/solutions?sector=healthcare-hospitals#cros-clinical-research" },
          { id: "healthtech", title: "HealthTech Platforms", href: "/solutions?sector=healthcare-hospitals#healthtech-platforms" }
        ]
      },
      {
        id: "it-tech-services",
        name: "IT & Technology Services",
        icon: "Cpu",
        href: "/solutions?sector=it-tech-services",
        subItems: [
          { id: "software-products", title: "Software Product Companies", href: "/solutions?sector=it-tech-services#software-product-companies" },
          { id: "it-services-bpo", title: "IT Services & BPO", href: "/solutions?sector=it-tech-services#it-services-bpo" },
          { id: "saas-cloud", title: "SaaS & Cloud Providers", href: "/solutions?sector=it-tech-services#saas-cloud-providers" },
          { id: "cybersecurity-firms", title: "Cybersecurity Firms", href: "/solutions?sector=it-tech-services#cybersecurity-firms" }
        ]
      },
      {
        id: "infrastructure-construction",
        name: "Infrastructure & Construction",
        icon: "Building2",
        href: "/solutions?sector=infrastructure-construction",
        subItems: [
          { id: "real-estate", title: "Real Estate Developers", href: "/solutions?sector=infrastructure-construction#real-estate-developers" },
          { id: "epc-contractors", title: "EPC Contractors", href: "/solutions?sector=infrastructure-construction#epc-contractors" },
          { id: "smart-cities", title: "Smart Cities & Urban Development", href: "/solutions?sector=infrastructure-construction#smart-cities-urban" },
          { id: "logistics-parks", title: "Logistics Parks", href: "/solutions?sector=infrastructure-construction#logistics-parks" }
        ]
      },
      {
        id: "energy-utilities",
        name: "Energy & Utilities",
        icon: "Zap",
        href: "/solutions?sector=energy-utilities",
        subItems: [
          { id: "power-gen", title: "Power Generation & Distribution", href: "/solutions?sector=energy-utilities#power-generation" },
          { id: "renewable-energy", title: "Renewable Energy", href: "/solutions?sector=energy-utilities#renewable-energy" },
          { id: "oil-gas", title: "Oil & Gas", href: "/solutions?sector=energy-utilities#oil-gas" },
          { id: "water-waste", title: "Water & Waste Management", href: "/solutions?sector=energy-utilities#water-waste-management" }
        ]
      },
      {
        id: "retail-ecommerce",
        name: "Retail & E-commerce",
        icon: "ShoppingBag",
        href: "/solutions?sector=retail-ecommerce",
        subItems: [
          { id: "omnichannel", title: "Omnichannel Retailers", href: "/solutions?sector=retail-ecommerce#omnichannel-retailers" },
          { id: "d2c-brands", title: "D2C Brands", href: "/solutions?sector=retail-ecommerce#d2c-brands" },
          { id: "marketplaces", title: "Marketplace Platforms", href: "/solutions?sector=retail-ecommerce#marketplace-platforms" },
          { id: "supply-chain-ops", title: "Supply Chain Operators", href: "/solutions?sector=retail-ecommerce#supply-chain-operators" }
        ]
      },
      {
        id: "professional-services",
        name: "Professional Services",
        icon: "Briefcase",
        href: "/solutions?sector=professional-services",
        subItems: [
          { id: "consulting-firms", title: "Consulting Firms", href: "/solutions?sector=professional-services#consulting-firms" },
          { id: "legal-secretarial", title: "Legal & Secretarial Practices", href: "/solutions?sector=professional-services#legal-secretarial-practices" },
          { id: "audit-firms", title: "Audit Firms", href: "/solutions?sector=professional-services#audit-firms" },
          { id: "hr-payroll", title: "HR & Payroll Outsourcing", href: "/solutions?sector=professional-services#hr-payroll-outsourcing" }
        ]
      }
    ]
  },
  rightColumn: {
    complianceDomains: {
      title: "Compliance Domains",
      description: "Regulatory governance blueprints, statutory frameworks & runbooks",
      items: [
        {
          id: "central-govt-tax",
          title: "Central Govt Tax & Regulatory Compliance",
          icon: "FileCheck",
          href: "/solutions?domain=tax-regulatory",
          description: "GST e-invoicing, TDS/TCS, Customs IEC & Corporate Law secretarial governance",
          subItems: [
            { id: "gst-invoicing", title: "GST Compliance & E-Invoicing Automation", href: "/solutions?domain=tax-regulatory#gst" },
            { id: "income-tax-tds", title: "Income Tax & TDS/TCS Management", href: "/solutions?domain=tax-regulatory#tds" },
            { id: "customs-dgft", title: "Customs, DGFT & Export-Import Code (IEC)", href: "/solutions?domain=tax-regulatory#customs" },
            { id: "fema-crossborder", title: "FEMA & Cross-Border Transaction Compliance", href: "/solutions?domain=tax-regulatory#fema" },
            { id: "corporate-law-roc", title: "Corporate Law (ROC/MCA) & Secretarial", href: "/solutions?domain=tax-regulatory#roc" },
            { id: "ibc-support", title: "Insolvency & Bankruptcy Code (IBC) Support", href: "/solutions?domain=tax-regulatory#ibc" }
          ]
        },
        {
          id: "rbi-nbfc-governance",
          title: "RBI & NBFC Governance Frameworks",
          icon: "ShieldAlert",
          href: "/solutions?domain=rbi-nbfc",
          description: "RBI IT outsourcing directives, Digital Lending, KYC/AML & Scale-Based regulations",
          subItems: [
            { id: "it-outsourcing", title: "Master Direction on IT Outsourcing", href: "/solutions?domain=rbi-nbfc#it-outsourcing" },
            { id: "digital-lending", title: "Digital Lending Guidelines Compliance", href: "/solutions?domain=rbi-nbfc#digital-lending" },
            { id: "kyc-aml-pmla", title: "KYC/AML & PMLA Adherence", href: "/solutions?domain=rbi-nbfc#kyc-aml" },
            { id: "fair-practices", title: "Fair Practices Code & Customer Protection", href: "/solutions?domain=rbi-nbfc#fair-practices" },
            { id: "nbfc-governance", title: "Corporate Governance for NBFCs", href: "/solutions?domain=rbi-nbfc#nbfc-governance" },
            { id: "rbi-reporting", title: "RBI Supervisory Reporting Automation", href: "/solutions?domain=rbi-nbfc#rbi-reporting" }
          ]
        },
        {
          id: "labour-workplace",
          title: "State-Level Labour & Workplace Compliance",
          icon: "Users",
          href: "/solutions?domain=labour-workplace",
          description: "Factories Act, EHS industrial safety, CLRA contract labour & statutory payroll",
          subItems: [
            { id: "factories-ehs", title: "Factories Act & Industrial Safety (EHS)", href: "/solutions?domain=labour-workplace#factories-ehs" },
            { id: "shops-est", title: "Shops & Establishments Act Compliance", href: "/solutions?domain=labour-workplace#shops" },
            { id: "contract-labour", title: "Contract Labour (R&A) Act Management", href: "/solutions?domain=labour-workplace#contract-labour" },
            { id: "statutory-payroll", title: "PF, ESI, PT & LWF Statutory Payroll", href: "/solutions?domain=labour-workplace#payroll" },
            { id: "minimum-wages", title: "Minimum Wages & Bonus Act Compliance", href: "/solutions?domain=labour-workplace#wages" },
            { id: "posh-maternity", title: "POSH & Maternity Benefit Compliance", href: "/solutions?domain=labour-workplace#posh" },
            { id: "warehouse-ergonomics", title: "Warehouse Worker Safety & Ergonomics", href: "/solutions?domain=labour-workplace#warehouse-safety" }
          ]
        },
        {
          id: "environmental-compliance",
          title: "State-Level Environmental Compliance",
          icon: "Leaf",
          href: "/solutions?domain=environmental",
          description: "CPCB/SPCB Consent (CTE/CTO), Plastic/E-Waste EPR & Net Zero footprint verification",
          subItems: [
            { id: "cpcb-spcb-consent", title: "CPCB/SPCB Consent (CTE/CTO) Management", href: "/solutions?domain=environmental#spcb" },
            { id: "hazardous-waste", title: "Hazardous Waste & TSDF Compliance", href: "/solutions?domain=environmental#hazardous" },
            { id: "epr-registration", title: "E-Waste & Plastic Waste EPR Registration", href: "/solutions?domain=environmental#epr" },
            { id: "pollution-control", title: "Air & Water Pollution Control Acts", href: "/solutions?domain=environmental#pollution" },
            { id: "eia-assessment", title: "Environmental Impact Assessment (EIA)", href: "/solutions?domain=environmental#eia" },
            { id: "green-hydrogen", title: "Green Hydrogen & Carbon Credit Tracking", href: "/solutions?domain=environmental#carbon-credit" }
          ]
        },
        {
          id: "data-privacy-cyber",
          title: "Data Privacy & Cybersecurity",
          icon: "Lock",
          href: "/solutions?domain=cybersecurity-privacy",
          description: "DPDP Act readiness, ISO 27001/SOC 2 assurance, VAPT auditing & CERT-In support",
          subItems: [
            { id: "dpdp-act", title: "DPDP Act Compliance", href: "/cybersecurity#dpdp" },
            { id: "iso-soc2", title: "ISO 27001 / SOC 2 Certification", href: "/cybersecurity#iso27001" },
            { id: "gdpr-hipaa", title: "GDPR & HIPAA Alignment", href: "/cybersecurity#gdpr" },
            { id: "vapt-testing", title: "VAPT & Penetration Testing", href: "/cybersecurity#vapt" },
            { id: "incident-certin", title: "Incident Response & CERT-In Support", href: "/cybersecurity#cert-in" },
            { id: "cloud-security", title: "Cloud Security (AWS/Azure/GCP)", href: "/cybersecurity#cloud" }
          ]
        },
        {
          id: "risk-internal-audit",
          title: "Risk Management & Internal Audit",
          icon: "BarChart3",
          href: "/solutions?domain=risk-audit",
          description: "Enterprise ERM frameworks, third-party vendor risk (TPRM) & BCP continuity plans",
          subItems: [
            { id: "erm-framework", title: "Enterprise Risk Management (ERM)", href: "/grc#erm" },
            { id: "tprm-vendor", title: "Third-Party & Vendor Risk Management", href: "/grc#vendor-risk" },
            { id: "internal-audit-auto", title: "Internal Audit Automation", href: "/grc#internal-audit" },
            { id: "bcp-planning", title: "Business Continuity Planning (BCP)", href: "/grc#bcp" },
            { id: "fraud-forensic", title: "Fraud Detection & Forensic Audit", href: "/grc#forensics" }
          ]
        },
        {
          id: "esg-sustainability",
          title: "ESG & Sustainability",
          icon: "Leaf",
          href: "/solutions?domain=esg",
          description: "SEBI BRSR Core assurance, GHG Scope 1/2/3 accounting & circular economy models",
          subItems: [
            { id: "brsr-reporting", title: "BRSR & BRSR Core Reporting", href: "/esg#brsr" },
            { id: "carbon-net-zero", title: "Carbon Footprint & Net Zero Strategy", href: "/esg#net-zero" },
            { id: "green-audits", title: "Green Audits & Circular Economy", href: "/esg#green-audit" },
            { id: "waste-management", title: "Waste Management (Hazardous/E-Waste/Plastic)", href: "/esg#waste" },
            { id: "social-compliance", title: "Social Compliance & Supply Chain Ethics", href: "/esg#social" }
          ]
        },
        {
          id: "intl-frameworks",
          title: "International Compliance Frameworks",
          icon: "Globe",
          href: "/solutions?domain=international",
          description: "EU GDPR, US SOX Section 404, UK Bribery Act & OFAC trade sanction screenings",
          subItems: [
            { id: "gdpr-eu", title: "GDPR (EU Data Privacy)", href: "/solutions?domain=international#gdpr" },
            { id: "sox-us", title: "SOX (US Sarbanes-Oxley)", href: "/solutions?domain=international#sox" },
            { id: "uk-bribery", title: "UK Bribery Act & Anti-Corruption", href: "/solutions?domain=international#uk-bribery" },
            { id: "ofac-sanctions", title: "OFAC Sanctions Screening", href: "/solutions?domain=international#ofac" },
            { id: "iso-standards", title: "ISO Standards (9001, 14001, 45001)", href: "/solutions?domain=international#iso" },
            { id: "cross-border-trade", title: "Cross-Border Trade & Customs Compliance", href: "/solutions?domain=international#trade" }
          ]
        },
        {
          id: "certifications-accreditations",
          title: "Certifications & Standards Directory",
          icon: "Award",
          href: "/certifications",
          description: "31 global & Indian standards: ISO, BSI, TÜV SÜD, DNV, SGS, Bureau Veritas, NIST, GRI, RBI, SEBI, MCA",
          subItems: [
            { id: "iso-bsi-tuv", title: "ISO, BSI, TÜV SÜD, DNV & Bureau Veritas", href: "/certifications?category=standards" },
            { id: "coso-isaca-cobit", title: "COSO, ISACA, COBIT, IIA & ISO 31000", href: "/certifications?category=governance" },
            { id: "iso27001-nist-cis", title: "ISO 27001, NIST, CIS, (ISC)² & EC-Council", href: "/certifications?category=cybersecurity" },
            { id: "gri-cdp-ecovadis", title: "GRI, CDP, EcoVadis, MSCI ESG & SBTi", href: "/certifications?category=esg" },
            { id: "iso9001-iatf-gmp", title: "ISO 9001, IATF 16949, GMP & Lean Six Sigma", href: "/certifications?category=quality" },
            { id: "rbi-sebi-mca", title: "RBI, SEBI, MCA, BIS, CPCB & FSSAI", href: "/certifications?category=regulatory" }
          ]
        }
      ]
    },
    secondSection: {
      title: "Solution Types",
      description: "AI-powered deployment architectures with turnkey advisory and managed models",
      items: [
        {
          id: "ai-advisory",
          title: "AI-Driven Advisory Solutions",
          icon: "Sparkles",
          href: "/solutions?type=advisory",
          description: "Generative compliance intelligence, regulatory mapping & executive advisory"
        },
        {
          id: "ai-automation",
          title: "AI-Driven Automation Solutions",
          icon: "Bot",
          href: "/solutions?type=automation",
          description: "Automated evidence collection, workflow triggers & auditable verification trails"
        },
        {
          id: "ai-managed",
          title: "AI-Driven Managed Services",
          icon: "Layers",
          href: "/solutions?type=managed",
          description: "Continuous compliance monitoring, managed filings & live oversight dashboards"
        },
        {
          id: "ai-assurance",
          title: "AI-Driven Assurance & Certification",
          icon: "Award",
          href: "/solutions?type=assurance",
          description: "Third-party audit readiness, certification runbooks & zero-deviation gap reports"
        }
      ]
    },
    cta: {
      text: "Discuss your compliance requirements with our senior advisory team.",
      buttonText: "Contact Us",
      buttonHref: "/contact"
    }
  }
};

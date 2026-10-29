import type { MegaMenuConfig } from "./megaMenuTypes";

export const industriesMegaData: MegaMenuConfig = {
  menuKey: "industries",
  title: "INDUSTRIES DIRECTORY",
  badgeText: "8+ Core Sectors",
  bottomLink: {
    label: "Explore All Industries & Sectors →",
    href: "/industries"
  },
  groups: [
    {
      title: "Financial Services",
      items: [
        {
          id: "banking-nbfcs",
          name: "Banking & NBFCs",
          tag: "RBI Mandate",
          href: "/industries/financial-services#banking-nbfcs",
          categoryGroup: "Financial Services",
          breadcrumb: "FINANCIAL SERVICES • Banking & NBFCs",
          heading: "Banking & NBFC Regulatory Governance Architecture",
          description: "End-to-end statutory posture for Scheduled Commercial Banks, SFBs, and Upper/Middle layer NBFCs adhering to RBI Master Directions and DAKSH reporting.",
          ctaLabel: "Explore Banking Solutions",
          ctaHref: "/industries/financial-services#banking-nbfcs",
          cards: [
            {
              id: "rbi-it-outsourcing",
              title: "RBI Master Direction on IT Outsourcing",
              description: "Vendor concentration risk, exit strategies, and material IT service provider governance.",
              icon: "Server",
              href: "/solutions?domain=rbi-nbfc#it-outsourcing",
              badge: "Statutory Directive"
            },
            {
              id: "nbfc-sbr-compliance",
              title: "Scale-Based Regulation (SBR) Compliance",
              description: "Capital adequacy, board risk committee charters, and asset classification standards.",
              icon: "Landmark",
              href: "/solutions?domain=rbi-nbfc#nbfc-governance",
              badge: "RBI NBFC Core"
            },
            {
              id: "aml-kyc-pmla",
              title: "CKYC & PMLA Anti-Money Laundering",
              description: "Automated PEP sanctions screening, suspicious transaction reporting (STR), and Video-KYC audit.",
              icon: "ShieldAlert",
              href: "/solutions?domain=rbi-nbfc#kyc-aml",
              badge: "PMLA 2002"
            },
            {
              id: "daksh-supervisory",
              title: "RBI DAKSH Supervisory Audit Defense",
              description: "Turnkey inspection data rooms, evidence verification trails, and zero-finding prep.",
              icon: "FileCheck",
              href: "/services/internal-audit",
              badge: "Audit Ready"
            }
          ]
        },
        {
          id: "payments-lending",
          name: "Payments & Digital Lending",
          tag: "Fintech Core",
          href: "/industries/financial-services#payments-digital-lending",
          categoryGroup: "Financial Services",
          breadcrumb: "FINANCIAL SERVICES • Payments & Lending",
          heading: "Digital Lending Guidelines (DLG) & PA/PG Compliance",
          description: "Statutory runbooks for Lending Service Providers (LSPs), Payment Aggregators (PA), and co-lending partnerships with automated KFS engines.",
          ctaLabel: "Explore Fintech Solutions",
          ctaHref: "/industries/financial-services#payments-digital-lending",
          cards: [
            {
              id: "kfs-generator",
              title: "Key Fact Statement (KFS) APR Engine",
              description: "Automated multilingual KFS calculation with all-inclusive APR breakdown.",
              icon: "Calculator",
              href: "/solutions?sector=bfsi-fintech#payments-digital-lending",
              badge: "RBI DLG 2022"
            },
            {
              id: "pa-pg-governance",
              title: "Payment Aggregator (PA) Authorization",
              description: "Net-worth certificate tracking, escrow account reconciliation, and merchant onboarding SLAs.",
              icon: "CreditCard",
              href: "/solutions?domain=rbi-nbfc#fair-practices",
              badge: "RBI Payments"
            },
            {
              id: "borrower-privacy",
              title: "Borrower Data Privacy & App Audit",
              description: "Mobile app permission reviews preventing unauthorized biometric or contact list harvesting.",
              icon: "Lock",
              href: "/cybersecurity#dpdp",
              badge: "DPDP & DLG"
            },
            {
              id: "flow-through-escrow",
              title: "Flow-Through Escrow Verification",
              description: "Disbursal and repayment path auditing ensuring direct borrower-to-RE transactions.",
              icon: "TrendingUp",
              href: "/solutions?sector=bfsi-fintech#payments-digital-lending",
              badge: "Escrow Rule"
            }
          ]
        },
        {
          id: "insurance-capital",
          name: "Insurance & Capital Markets",
          tag: "SEBI / IRDAI",
          href: "/industries/financial-services#capital-markets",
          categoryGroup: "Financial Services",
          breadcrumb: "FINANCIAL SERVICES • Insurance & Capital Markets",
          heading: "SEBI LODR, PIT & IRDAI Information Security Governance",
          description: "Protecting listed entities, brokerages, and insurers from capital market sanctions with automated Structured Digital Databases and CSCRF cyber audits.",
          ctaLabel: "Explore Capital Markets",
          ctaHref: "/industries/financial-services#capital-markets",
          cards: [
            {
              id: "sebi-lodr",
              title: "SEBI LODR Statutory Disclosures",
              description: "Quarterly compliance certificates, independent director charters, and board composition.",
              icon: "Building2",
              href: "/solutions?domain=tax-regulatory#roc",
              badge: "SEBI LODR 2015"
            },
            {
              id: "sebi-cscrf",
              title: "SEBI Cyber Security Framework (CSCRF)",
              description: "Mandatory SOC audits, penetration tests, and business continuity drills for stockbrokers.",
              icon: "ShieldCheck",
              href: "/cybersecurity#vapt",
              badge: "CSCRF Ready"
            },
            {
              id: "sdd-insider-trading",
              title: "Structured Digital Database (SDD - PIT)",
              description: "Tamper-evident database tracking unpublished price-sensitive information (UPSI).",
              icon: "Database",
              href: "/grc#internal-audit",
              badge: "PIT Rules"
            },
            {
              id: "irdai-infosec",
              title: "IRDAI Information Security Audit",
              description: "Policyholder data vaults, cyber resilience audits, and third-party TPA security compliance.",
              icon: "HeartHandshake",
              href: "/cybersecurity#iso27001",
              badge: "IRDAI Guidelines"
            }
          ]
        }
      ]
    },
    {
      title: "Manufacturing & Industrial",
      items: [
        {
          id: "automotive-heavy",
          name: "Automotive & Auto Components",
          tag: "IATF 16949",
          href: "/industries/manufacturing-industrial#automobiles",
          categoryGroup: "Manufacturing & Industrial",
          breadcrumb: "MANUFACTURING • Automotive & Heavy Engineering",
          heading: "Automotive OEM & Tier-1/2 Statutory Assembly Compliance",
          description: "Workplace safety interlocking, Factories Act registers, CLRA contractor reconciliation, and IATF 16949 core tools assurance across plant networks.",
          ctaLabel: "Explore Automotive Solutions",
          ctaHref: "/industries/manufacturing-industrial#automobiles",
          cards: [
            {
              id: "factories-act-auto",
              title: "Factories Act 1948 Plant Floor Registers",
              description: "Form 1, 2, 7, 24 maintenance, machinery safety guard certification, and mock inspections.",
              icon: "Factory",
              href: "/solutions?domain=labour-workplace#factories-ehs",
              badge: "Statutory EHS"
            },
            {
              id: "clra-roster",
              title: "Contract Labour (CLRA) Wage Audit",
              description: "Monthly contractor wage slip reconciliation, PF/ESIC deposits, and vendor risk mitigation.",
              icon: "Users",
              href: "/solutions?domain=labour-workplace#contract-labour",
              badge: "CLRA 1970"
            },
            {
              id: "iatf-qms",
              title: "IATF 16949 Automotive Quality Readiness",
              description: "APQP, FMEA, PPAP, MSA, and SPC core tools auditing for tier-1 supply contracts.",
              icon: "Wrench",
              href: "/certifications",
              badge: "QMS Automotive"
            },
            {
              id: "spcb-effluent",
              title: "SPCB Paint Shop & Trade Effluent Consents",
              description: "Continuous emission monitoring (CEMS), VOC controls, and hazardous sludge disposal records.",
              icon: "Leaf",
              href: "/solutions?domain=environmental#spcb",
              badge: "Pollution Control"
            }
          ]
        },
        {
          id: "pharma-lifesciences",
          name: "Pharmaceuticals & Life Sciences",
          tag: "Schedule M",
          href: "/industries/manufacturing-industrial#pharma-lifesciences",
          categoryGroup: "Manufacturing & Industrial",
          breadcrumb: "MANUFACTURING • Pharmaceuticals & Life Sciences",
          heading: "CDSCO Revised Schedule M, GMP & Data Integrity ALCOA+",
          description: "Cleanroom validation (HVAC/water), batch production record (BMR) verification, data integrity audits, and US FDA / WHO GMP inspection readiness.",
          ctaLabel: "Explore Pharma Solutions",
          ctaHref: "/industries/manufacturing-industrial#pharma-lifesciences",
          cards: [
            {
              id: "schedule-m-revised",
              title: "Revised Schedule M (2023) Upgrade",
              description: "HVAC validation, computerized system validation (CSV), and quality risk management (QRM).",
              icon: "Pill",
              href: "/solutions?sector=manufacturing-industrial#pharma-lifesciences",
              badge: "CDSCO Mandatory"
            },
            {
              id: "alcoa-data-integrity",
              title: "Data Integrity ALCOA+ Audits",
              description: "Chromatography audit trails, zero-override instrument logs, and laboratory governance.",
              icon: "Activity",
              href: "/services/internal-audit",
              badge: "ALCOA+ Standard"
            },
            {
              id: "spcb-hazardous-pharma",
              title: "Hazardous Chemical & API Waste Consents",
              description: "Zero liquid discharge (ZLD) audits, solvent recovery records, and TSDF manifestations.",
              icon: "FlaskConical",
              href: "/solutions?domain=environmental#hazardous",
              badge: "SPCB CTE/CTO"
            },
            {
              id: "pharmacovigilance",
              title: "Pharmacovigilance & Recall Readiness",
              description: "Standard operating procedures (SOPs) for mock product recalls and adverse reaction alerts.",
              icon: "ShieldAlert",
              href: "/grc#bcp",
              badge: "Safety Reporting"
            }
          ]
        },
        {
          id: "electronics-fmcg",
          name: "Electronics, Food & Consumer Goods",
          tag: "BIS / FSSAI",
          href: "/industries/manufacturing-industrial#electronics-semiconductors",
          categoryGroup: "Manufacturing & Industrial",
          breadcrumb: "MANUFACTURING • Electronics & Consumer Goods",
          heading: "BIS Standards, FSSAI FoSCoS & Supply Chain Traceability",
          description: "Compulsory registration schemes (CRS), RoHS chemical compliance, food safety hygiene audits, and front-of-pack packaging law verification.",
          ctaLabel: "Explore Consumer Goods",
          ctaHref: "/industries/manufacturing-industrial#electronics-semiconductors",
          cards: [
            {
              id: "bis-crs",
              title: "BIS Compulsory Registration (CRS)",
              description: "NABL testing coordination, factory audit support, and ISI hallmark licensing.",
              icon: "Cpu",
              href: "/certifications",
              badge: "BIS Mandatory"
            },
            {
              id: "fssai-foscos",
              title: "FSSAI Central & State FoSCoS Licensing",
              description: "FSMS plans, food allergen warnings, expiry labeling, and annual return filings.",
              icon: "Utensils",
              href: "/solutions?sector=manufacturing-industrial#food-processing-fmcg",
              badge: "Food Safety"
            },
            {
              id: "epr-plastic-ewaste",
              title: "EPR Plastic & E-Waste Credit Portals",
              description: "Centralized CPCB registration, recycling target fulfillment, and quarterly filings.",
              icon: "RefreshCw",
              href: "/solutions?domain=environmental#epr",
              badge: "EPR CPCB"
            },
            {
              id: "rohs-reach",
              title: "RoHS & REACH Substance Screening",
              description: "Hazardous heavy metal testing for export electronics and circuit components.",
              icon: "CheckCircle",
              href: "/solutions?sector=manufacturing-industrial#heavy-engineering",
              badge: "Export Grade"
            }
          ]
        }
      ]
    },
    {
      title: "Healthcare & Life Sciences",
      items: [
        {
          id: "hospitals-healthtech",
          name: "Hospitals & HealthTech Platforms",
          tag: "NABH / HIPAA",
          href: "/industries/healthcare-hospitals#multispecialty-hospitals",
          categoryGroup: "Healthcare & Life Sciences",
          breadcrumb: "HEALTHCARE • Hospitals & HealthTech",
          heading: "NABH 5th Edition, Bio-Medical Waste & Patient Privacy",
          description: "Comprehensive clinical governance, radiation safety (AERB), protected health information (PHI) tokenization, and digital healthcare telemedicine compliance.",
          ctaLabel: "Explore Healthcare Solutions",
          ctaHref: "/industries/healthcare-hospitals#multispecialty-hospitals",
          cards: [
            {
              id: "nabh-clinical-gov",
              title: "NABH 5th Edition Clinical Governance",
              description: "Medication management, infection control committees, and statutory licensing registers.",
              icon: "Stethoscope",
              href: "/solutions?sector=healthcare-hospitals#multispecialty-hospitals",
              badge: "NABH 5th Ed"
            },
            {
              id: "biomedical-waste",
              title: "Bio-Medical Waste Rules 2016 Adherence",
              description: "Bar-coded waste tracking, incineration manifest verification, and SPCB annual returns.",
              icon: "ShieldAlert",
              href: "/solutions?domain=environmental#hazardous",
              badge: "BMW Rules"
            },
            {
              id: "hipaa-dpdp-health",
              title: "HIPAA & DPDP Patient Data Vault",
              description: "Electronic Medical Record (EMR) encryption, consent architecture, and zero patient data leak.",
              icon: "Lock",
              href: "/cybersecurity#dpdp",
              badge: "Patient Privacy"
            },
            {
              id: "diagnostic-nabl",
              title: "Diagnostic Lab NABL 15189 Accreditation",
              description: "Sample traceability, internal quality controls (IQC), and phlebotomy contractor audit.",
              icon: "Microscope",
              href: "/solutions?sector=healthcare-hospitals#diagnostic-chains",
              badge: "NABL 15189"
            }
          ]
        }
      ]
    },
    {
      title: "Technology & Digital",
      items: [
        {
          id: "it-saas-cloud",
          name: "IT Services & Cloud SaaS",
          tag: "ISO 27001 / SOC 2",
          href: "/industries/it-tech-services#software-product-companies",
          categoryGroup: "Technology & Digital",
          breadcrumb: "TECHNOLOGY • IT Services & Cloud SaaS",
          heading: "Information Security, Multi-Tenant Cloud & DPDP Compliance",
          description: "Accelerating enterprise B2B sales cycles with turnkey ISO 27001:2022, SOC 2 Type II, CSA STAR dossiers, and 6-hour CERT-In incident notification pipelines.",
          ctaLabel: "Explore Tech Solutions",
          ctaHref: "/industries/it-tech-services#software-product-companies",
          cards: [
            {
              id: "iso27001-soc2",
              title: "ISO 27001:2022 & SOC 2 Type II Accelerator",
              description: "Annex A 93-control mapping, cloud security posture management (CSPM), and lead auditor defense.",
              icon: "ShieldCheck",
              href: "/cybersecurity#iso27001",
              badge: "Fast Track 30d"
            },
            {
              id: "dpdp-tech-consent",
              title: "DPDP Act 2023 Digital Consent Architecture",
              description: "Consent manager integration, data fiduciary audit trails, and multi-lingual privacy notices.",
              icon: "Lock",
              href: "/cybersecurity#dpdp",
              badge: "DPDP Act"
            },
            {
              id: "certin-incident",
              title: "CERT-In 6-Hour Incident Reporting Engine",
              description: "Standardized cyber incident classification, root cause analysis (RCA), and legal reporting logs.",
              icon: "AlertTriangle",
              href: "/cybersecurity#cert-in",
              badge: "CERT-In Mandate"
            },
            {
              id: "gdpr-crossborder",
              title: "EU GDPR & Cross-Border Transfer DPIA",
              description: "Standard Contractual Clauses (SCCs), Data Transfer Impact Assessments, and UK adequacy.",
              icon: "Globe",
              href: "/cybersecurity#gdpr",
              badge: "EU & UK GDPR"
            }
          ]
        }
      ]
    },
    {
      title: "Commerce & Operations",
      items: [
        {
          id: "retail-logistics",
          name: "Retail, E-Commerce & Logistics Parks",
          tag: "Supply Chain",
          href: "/industries/retail-ecommerce#omnichannel-retailers",
          categoryGroup: "Commerce & Operations",
          breadcrumb: "COMMERCE • Retail, E-Commerce & Logistics",
          heading: "E-Commerce Rules, Warehouse Safety & Supply Chain Audit",
          description: "Protecting omnichannel retailers and mega logistics hubs from dark pattern penalties, consumer protection violations, and BOCW contract worker infractions.",
          ctaLabel: "Explore Commerce Solutions",
          ctaHref: "/industries/retail-ecommerce#omnichannel-retailers",
          cards: [
            {
              id: "ecommerce-consumer-rules",
              title: "Consumer Protection E-Commerce Rules 2020",
              description: "Country-of-origin display, grievance officer workflows, and dark pattern audit validation.",
              icon: "ShoppingBag",
              href: "/solutions?sector=retail-ecommerce#marketplace-platforms",
              badge: "E-Commerce Law"
            },
            {
              id: "logistics-warehouse-ehs",
              title: "Warehouse Fire Safety & Ergonomics",
              description: "High-bay racking safety, forklift operator licensing, and local municipal fire NOC renewals.",
              icon: "Truck",
              href: "/solutions?domain=labour-workplace#warehouse-safety",
              badge: "Warehouse EHS"
            },
            {
              id: "bocw-construction-infra",
              title: "BOCW Safety for Industrial Logistics Parks",
              description: "Building & other construction worker safety welfare funds, crane fitness, and PPE compliance.",
              icon: "HardHat",
              href: "/solutions?sector=infrastructure-construction#logistics-parks",
              badge: "BOCW Act"
            },
            {
              id: "dark-stores-staffing",
              title: "QSR & Quick-Commerce Delivery Compliance",
              description: "Gig-worker accident insurance adherence, minimum wages, and local Shops Act registrations.",
              icon: "Clock",
              href: "/services/managed-staffing-risk-shield",
              badge: "Labour Code"
            }
          ]
        }
      ]
    }
  ]
};

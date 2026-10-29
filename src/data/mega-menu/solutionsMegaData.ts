import type { MegaMenuConfig } from "./megaMenuTypes";

export const solutionsMegaData: MegaMenuConfig = {
  menuKey: "solutions",
  title: "SOLUTIONS CATALOG",
  badgeText: "65+ Turnkey Assets",
  bottomLink: {
    label: "Explore All Solutions & Blueprints →",
    href: "/solutions"
  },
  groups: [
    {
      title: "Regulatory & Statutory",
      items: [
        {
          id: "rbi-nbfc-solutions",
          name: "RBI & NBFC Governance",
          tag: "Central Bank",
          href: "/solutions?domain=rbi-nbfc",
          categoryGroup: "Regulatory & Statutory",
          breadcrumb: "SOLUTIONS • RBI & Banking Governance",
          heading: "Turnkey RBI Statutory Governance & Digital Lending Blueprints",
          description: "Pre-configured compliance architectures for Regulated Entities (REs), NBFCs, and Fintech Lenders. Turnkey KFS engines, IT outsourcing matrices, and DAKSH supervisory inspection trial rooms.",
          ctaLabel: "Explore Solution",
          ctaHref: "/solutions?domain=rbi-nbfc",
          cards: [
            {
              id: "it-outsourcing-matrix",
              title: "Master Direction on IT Outsourcing",
              description: "Continuous vendor risk scoring, concentration analytics, and audited BCP exit strategies.",
              icon: "Server",
              href: "/solutions?domain=rbi-nbfc#it-outsourcing",
              badge: "RBI 2023"
            },
            {
              id: "digital-lending-kfs",
              title: "Digital Lending & KFS APR Generator",
              description: "Direct bank account disbursement checks, Key Fact Statement generator, and privacy audits.",
              icon: "Smartphone",
              href: "/solutions?domain=rbi-nbfc#digital-lending",
              badge: "DLG Compliant"
            },
            {
              id: "kyc-aml-str",
              title: "KYC/AML & PMLA Transaction Monitoring",
              description: "Automated politically exposed person (PEP) screening and suspicious transaction alerts.",
              icon: "ShieldAlert",
              href: "/solutions?domain=rbi-nbfc#kyc-aml",
              badge: "PMLA Act"
            },
            {
              id: "sbr-supervisory",
              title: "Scale-Based Regulation (SBR) Frameworks",
              description: "Tiered capital adequacy registers, quarterly liquidity returns, and board risk minutes.",
              icon: "FileCheck",
              href: "/solutions?domain=rbi-nbfc#nbfc-governance",
              badge: "Supervisory"
            }
          ]
        },
        {
          id: "corporate-law-tax",
          name: "Central Govt Tax & Corporate Law",
          tag: "MCA / GST",
          href: "/solutions?domain=tax-regulatory",
          categoryGroup: "Regulatory & Statutory",
          breadcrumb: "SOLUTIONS • Central Govt Tax & ROC",
          heading: "GST E-Invoicing, Customs AEO & MCA V3 Corporate Secretarial",
          description: "Zero-error secretarial registers, automated Board Meeting minute logging under SS-1 & SS-2, GST reconciliation, and customs valuation defense packets.",
          ctaLabel: "Explore Tax & Legal",
          ctaHref: "/solutions?domain=tax-regulatory",
          cards: [
            {
              id: "gst-einvoicing-auto",
              title: "GST E-Invoicing & E-Way Bill Reconciliation",
              description: "Two-way GSTR-2B vs purchase register matching, ITC optimization, and notice defense.",
              icon: "Receipt",
              href: "/solutions?domain=tax-regulatory#gst",
              badge: "GST Automated"
            },
            {
              id: "customs-aeo-iec",
              title: "Customs, DGFT & AEO Tier-2 Status",
              description: "Authorised Economic Operator accreditation dossiers and expedited port clearance.",
              icon: "Truck",
              href: "/solutions?domain=tax-regulatory#customs",
              badge: "Customs AEO"
            },
            {
              id: "mca-v3-secretarial",
              title: "Corporate Law (ROC/MCA) Automation",
              description: "Automated AOC-4 and MGT-7 generation, Significant Beneficial Ownership (SBO) registers.",
              icon: "FileText",
              href: "/solutions?domain=tax-regulatory#roc",
              badge: "Companies Act"
            },
            {
              id: "fema-crossborder-odi",
              title: "FEMA & Foreign Investment (FC-GPR)",
              description: "Annual Foreign Liabilities & Assets (FLA) returns and Single Master Form filings.",
              icon: "Globe",
              href: "/solutions?domain=tax-regulatory#fema",
              badge: "FEMA 1999"
            }
          ]
        }
      ]
    },
    {
      title: "Cybersecurity & Privacy",
      items: [
        {
          id: "dpdp-cyber-solutions",
          name: "DPDP Act & Cyber Resilience",
          tag: "Data Privacy",
          href: "/solutions?domain=cybersecurity-privacy",
          categoryGroup: "Cybersecurity & Privacy",
          breadcrumb: "SOLUTIONS • Cybersecurity & DPDP Act",
          heading: "DPDP Act 2023 Readiness, ISO 27001 & CERT-In Incident Response",
          description: "Protecting consumer and employee data assets. Automated consent managers, lead auditor certification runbooks, and 6-hour CERT-In breach disclosure response teams.",
          ctaLabel: "Explore Cyber Solutions",
          ctaHref: "/solutions?domain=cybersecurity-privacy",
          cards: [
            {
              id: "dpdp-consent-manager",
              title: "DPDP Act 2023 Consent Architecture",
              description: "Itemized bilingual consent forms, data fiduciary audit trails, and grievance workflows.",
              icon: "Lock",
              href: "/cybersecurity#dpdp",
              badge: "DPDP Core"
            },
            {
              id: "iso27001-soc2-isms",
              title: "ISO 27001:2022 & SOC 2 Certification",
              description: "Statement of Applicability (SoA) covering all 93 controls with cloud evidence scripts.",
              icon: "ShieldCheck",
              href: "/cybersecurity#iso27001",
              badge: "Zero Findings"
            },
            {
              id: "vapt-pen-testing",
              title: "VAPT & Red Team Adversary Emulation",
              description: "Comprehensive external penetration tests, OWASP Top 10 web/API hardening reports.",
              icon: "Terminal",
              href: "/cybersecurity#vapt",
              badge: "VAPT Audit"
            },
            {
              id: "certin-6hr-playbook",
              title: "CERT-In 6-Hour Incident Notification",
              description: "Pre-configured rapid incident triage, legal disclosure templates, and forensic logs.",
              icon: "AlertOctagon",
              href: "/cybersecurity#cert-in",
              badge: "Mandatory SLA"
            }
          ]
        }
      ]
    },
    {
      title: "ESG & Sustainability",
      items: [
        {
          id: "brsr-netzero-solutions",
          name: "BRSR Core & ESG Assurance",
          tag: "SEBI ESG",
          href: "/solutions?domain=esg",
          categoryGroup: "ESG & Sustainability",
          breadcrumb: "SOLUTIONS • BRSR & Sustainability",
          heading: "SEBI BRSR Core, Scope 1-3 GHG Accounting & Net-Zero Strategies",
          description: "Authoritative environmental disclosures for Top 1000 listed entities. Reasonable assurance readiness, science-based targets (SBTi), and circular waste tracking.",
          ctaLabel: "Explore ESG Solutions",
          ctaHref: "/solutions?domain=esg",
          cards: [
            {
              id: "brsr-core-assurance",
              title: "BRSR & BRSR Core Reasonable Assurance",
              description: "Verification of 9 ESG attributes, assurance trial rooms, and annual report dossiers.",
              icon: "Leaf",
              href: "/esg#brsr",
              badge: "Top 1000 Mandate"
            },
            {
              id: "ghg-scope-accounting",
              title: "Scope 1, 2, and 3 Carbon Footprint",
              description: "GHG Protocol compliant carbon inventory across internal operations and supply chain.",
              icon: "Sun",
              href: "/esg#net-zero",
              badge: "GHG Protocol"
            },
            {
              id: "cdp-ecovadis-advisory",
              title: "CDP & EcoVadis Rating Optimization",
              description: "Advisory targeting Leadership Band (A/A-) and EcoVadis Gold/Platinum medal tiers.",
              icon: "Award",
              href: "/certifications",
              badge: "Global Rating"
            },
            {
              id: "epr-waste-credits",
              title: "CPCB Plastic & E-Waste EPR Reconciliation",
              description: "Turnkey procurement and verification of centralized EPR certificates to offset liability.",
              icon: "Recycle",
              href: "/esg#waste",
              badge: "EPR Compliant"
            }
          ]
        }
      ]
    },
    {
      title: "Workforce & Industrial EHS",
      items: [
        {
          id: "labour-ehs-solutions",
          name: "Labour Law, CLRA & Factory EHS",
          tag: "Factories Act",
          href: "/solutions?domain=labour-workplace",
          categoryGroup: "Workforce & Industrial EHS",
          breadcrumb: "SOLUTIONS • Labour Laws & Industrial EHS",
          heading: "Factories Act 1948, Contract Labour (CLRA) & Workplace Safety",
          description: "Eliminating plant stoppage risks and industrial inspector deviations. Real-time wage verification, contractor audits, EHS incident monitoring, and POSH committees.",
          ctaLabel: "Explore Workforce Solutions",
          ctaHref: "/solutions?domain=labour-workplace",
          cards: [
            {
              id: "factories-ehs-safety",
              title: "Factories Act Statutory Registers & Safety",
              description: "Automated maintenance of Forms 1, 2, 7, 24, hazard isolation, and safety drills.",
              icon: "HardHat",
              href: "/solutions?domain=labour-workplace#factories-ehs",
              badge: "EHS Zero-Accident"
            },
            {
              id: "clra-contractor-reconcile",
              title: "Contract Labour (CLRA) Vendor Audits",
              description: "Monthly reconciliation of sub-contractor wage slips, PF, ESI, and statutory registers.",
              icon: "Users",
              href: "/solutions?domain=labour-workplace#contract-labour",
              badge: "CLRA 1970"
            },
            {
              id: "posh-maternity-adherence",
              title: "POSH Act & Maternity Benefit Governance",
              description: "Internal Complaints Committee (ICC) structuring, mandatory workshops, and annual reports.",
              icon: "Shield",
              href: "/solutions?domain=labour-workplace#posh",
              badge: "POSH Mandate"
            },
            {
              id: "spcb-environmental-consent",
              title: "State Environmental CTE/CTO Consents",
              description: "Consent to Establish and Operate renewals, water pollution tests, and hazardous waste logs.",
              icon: "Droplet",
              href: "/solutions?domain=environmental#spcb",
              badge: "SPCB Clearances"
            }
          ]
        }
      ]
    },
    {
      title: "Accreditation & Standards",
      items: [
        {
          id: "certifications-standards-solutions",
          name: "Certifications & Accreditation Directory",
          tag: "31 Bodies",
          href: "/certifications",
          categoryGroup: "Accreditation & Standards",
          breadcrumb: "SOLUTIONS • Certifications & Standards",
          heading: "Global ISO, BSI, TÜV SÜD & Indian Regulatory Hallmarks",
          description: "Dedicated readiness pipelines for 31 world-class certification standards: ISO 9001/27001/14001, BSI Kitemark, DNV, SGS, Bureau Veritas, NIST, GRI, RBI, SEBI, and MCA.",
          ctaLabel: "Explore Certifications Hub",
          ctaHref: "/certifications",
          cards: [
            {
              id: "iso-bsi-tuv-cert",
              title: "ISO, BSI & TÜV SÜD Certifications",
              description: "Lead auditor liaison, zero-deviation audit assurance, and accredited certificate issuance.",
              icon: "Award",
              href: "/certifications?category=standards",
              badge: "Global Tier-1"
            },
            {
              id: "coso-isaca-gov-cert",
              title: "COSO, ISACA & COBIT Governance",
              description: "Board internal control evaluation, CISA audit standards, and risk maturity scoring.",
              icon: "Layers",
              href: "/certifications?category=governance",
              badge: "Audit Standards"
            },
            {
              id: "nist-cis-cyber-cert",
              title: "NIST CSF 2.0 & CIS Critical Controls",
              description: "Defense-in-depth security benchmarking against US federal and global baseline hygiene.",
              icon: "ShieldCheck",
              href: "/certifications?category=cybersecurity",
              badge: "Cyber Benchmark"
            },
            {
              id: "rbi-sebi-india-cert",
              title: "RBI, SEBI, MCA, BIS & FSSAI Hallmarks",
              description: "India's apex statutory regulatory bodies with turnkey statutory compliance dossiers.",
              icon: "Landmark",
              href: "/certifications?category=regulatory",
              badge: "India Regulators"
            }
          ]
        }
      ]
    }
  ]
};

import type { MegaMenuConfig } from "./megaMenuTypes";

export const caseStudiesMegaData: MegaMenuConfig = {
  menuKey: "case-studies",
  title: "CASE STUDIES",
  badgeText: "Audited Outcomes",
  bottomLink: {
    label: "Browse All Documented Case Studies →",
    href: "/case-studies"
  },
  groups: [
    {
      title: "BFSI & Fintech",
      items: [
        {
          id: "bfsi-payment-aggregator",
          name: "Payment Aggregator RBI Outsource",
          tag: "RBI Clearance",
          href: "/case-studies#bfsi-governance",
          categoryGroup: "BFSI & Fintech",
          breadcrumb: "CASE STUDIES • BFSI & Fintech",
          heading: "Securing India's Leading Payment Partner Against RBI IT Outsource Audits",
          description: "A premier payment aggregator faced critical audit deviations in subcontractor network access and third-party SLAs, risking transaction halts under RBI Master Directions.",
          ctaLabel: "View Case Study",
          ctaHref: "/case-studies#bfsi-governance",
          cards: [
            {
              id: "rbi-outsource-audit-win",
              title: "Cleared RBI IT Inspection with Zero Critical Deviations",
              description: "Designed a multi-layered GRC outsource framework and onboarded 40+ fintech partners into continuous SLA monitoring.",
              icon: "CheckCircle2",
              href: "/case-studies#bfsi-governance",
              metric: "0 Critical Deviations",
              badge: "RBI Clear"
            },
            {
              id: "data-residency-win",
              title: "100% Data Localization & Sovereign Logging",
              description: "Re-architected cross-border payment logs into sovereign cloud vaults complying with RBI payment system directives.",
              icon: "Database",
              href: "/case-studies#bfsi-governance",
              metric: "100% Localized",
              badge: "Data Sovereignty"
            },
            {
              id: "readiness-velocity-win",
              title: "10-Day Accelerated Audit Readiness",
              description: "Rapid turnaround from audit notice to full inspection trial room assembly and board committee briefing.",
              icon: "Clock",
              href: "/case-studies#bfsi-governance",
              metric: "10-Day Turnaround",
              badge: "Velocity"
            },
            {
              id: "vendor-risk-win",
              title: "40+ Fintech Vendors Vetted & Monitored",
              description: "Comprehensive third-party security audits and automated concentration risk scoring.",
              icon: "ShieldAlert",
              href: "/case-studies#bfsi-governance",
              metric: "40+ Vendors Vetted",
              badge: "TPRM"
            }
          ]
        },
        {
          id: "tier1-bank-dpdp",
          name: "Tier-1 Private Bank DPDP Readiness",
          tag: "15M Records",
          href: "/case-studies#bfsi-fintech-cases",
          categoryGroup: "BFSI & Fintech",
          breadcrumb: "CASE STUDIES • Banking Data Privacy",
          heading: "DPDP Act 2023 Consent & Governance Overhaul for 15M Customer Records",
          description: "A major private commercial bank instituted automated consent architecture, data fiduciary registries, and DPO audit trails across 250+ digital banking APIs.",
          ctaLabel: "View Case Study",
          ctaHref: "/case-studies#bfsi-fintech-cases",
          cards: [
            {
              id: "records-secured-win",
              title: "15M Customer Record Privacy Tokens",
              description: "Purpose limitation and automated consent withdraw workflows with zero transaction friction.",
              icon: "Lock",
              href: "/case-studies",
              metric: "15M Records",
              badge: "DPDP 2023"
            },
            {
              id: "zero-leak-win",
              title: "Zero Regulatory Exceptions in DPDP Mock Drills",
              description: "Adversarial simulations verifying prompt notice generation and verifiable parental consent.",
              icon: "ShieldCheck",
              href: "/case-studies",
              metric: "0 Exceptions",
              badge: "Audit Pass"
            }
          ]
        }
      ]
    },
    {
      title: "Manufacturing & Industrial",
      items: [
        {
          id: "auto-oem-safety",
          name: "Auto OEM Multi-Plant Safety",
          tag: "6 Plants Safe",
          href: "/case-studies#manufacturing-safety",
          categoryGroup: "Manufacturing & Industrial",
          breadcrumb: "CASE STUDIES • Automotive & Industrial Safety",
          heading: "100% EHS & Factory Compliance for Automotive Plant Network",
          description: "An automotive components manufacturer with 5,000+ contract workers suffered from recurrent factory audit warnings and missing statutory registers under the Factories Act.",
          ctaLabel: "View Case Study",
          ctaHref: "/case-studies#manufacturing-safety",
          cards: [
            {
              id: "zero-stopwork-win",
              title: "Zero Stop-Work Safety Notices Across 6 Plants",
              description: "Standardized machine interlocks, fire safety drills, and certified statutory Form 1, 2, 7, and 24 logs.",
              icon: "Factory",
              href: "/case-studies#manufacturing-safety",
              metric: "Zero Notices",
              badge: "100% EHS"
            },
            {
              id: "clra-compliance-win",
              title: "100% CLRA Contract Labor Reconciliation",
              description: "Automated monthly wage slip matching against PF/ESIC challans, eliminating contractor liability.",
              icon: "Users",
              href: "/case-studies#manufacturing-safety",
              metric: "100% CLRA Pass",
              badge: "Labour Audit"
            },
            {
              id: "incident-reduction-win",
              title: "60% Reduction in Workplace Safety Incidents",
              description: "Real-time near-miss reporting and preventative tool-box talks reducing reportable accidents.",
              icon: "TrendingDown",
              href: "/case-studies#manufacturing-safety",
              metric: "↓ 60% Incidents",
              badge: "Safety First"
            },
            {
              id: "absenteeism-win",
              title: "40% Drop in Workforce Absenteeism",
              description: "Better ergonomic shopfloor conditions and prompt medical health checks improving retention.",
              icon: "Activity",
              href: "/case-studies#manufacturing-safety",
              metric: "↓ 40% Absenteeism",
              badge: "Productivity"
            }
          ]
        }
      ]
    },
    {
      title: "Healthcare & Life Sciences",
      items: [
        {
          id: "hospital-chain-privacy",
          name: "Hospital Chain Patient Data Privacy",
          tag: "12 Hospitals",
          href: "/case-studies#healthcare-privacy",
          categoryGroup: "Healthcare & Life Sciences",
          breadcrumb: "CASE STUDIES • Healthcare Governance",
          heading: "HIPAA & DPDP Patient Record Governance for Multi-Specialty Chain",
          description: "A hospital chain with 12 units struggled to manage patient consent across EMR applications, leaving electronic records vulnerable to leaks and exposing the board to penalties.",
          ctaLabel: "View Case Study",
          ctaHref: "/case-studies#healthcare-privacy",
          cards: [
            {
              id: "hospitals-secured-win",
              title: "12 Multi-Specialty Hospitals Secured",
              description: "Instituted role-based access control, cryptographic PHI vaults, and telemedicine audits.",
              icon: "Stethoscope",
              href: "/case-studies#healthcare-privacy",
              metric: "12 Hospitals",
              badge: "HIPAA & DPDP"
            },
            {
              id: "zero-breach-win",
              title: "Zero Patient Record Leaks Post-Implementation",
              description: "Full NABH 5th edition clinical governance scores and tamper-evident medical record audit trails.",
              icon: "ShieldCheck",
              href: "/case-studies#healthcare-privacy",
              metric: "Zero Breaches",
              badge: "Flawless Audit"
            },
            {
              id: "nabh-quality-win",
              title: "Record-Breaking NABH Accreditation Scores",
              description: "Infection control documentation and bio-medical waste compliance passed on first inspection.",
              icon: "Award",
              href: "/case-studies#healthcare-privacy",
              metric: "100% NABH Pass",
              badge: "Quality Care"
            },
            {
              id: "consent-workflow-win",
              title: "Automated Patient Treatment Consent Portals",
              description: "Multilingual digital consent tablets eliminating lost paper waivers across all diagnostic labs.",
              icon: "FileCheck",
              href: "/case-studies#healthcare-privacy",
              metric: "100% Consent Logged",
              badge: "Digital Health"
            }
          ]
        }
      ]
    },
    {
      title: "IT & Technology",
      items: [
        {
          id: "saas-iso27001-accelerator",
          name: "Enterprise SaaS ISO 27001 & SOC 2",
          tag: "28-Day Fast Track",
          href: "/case-studies#it-tech-cases",
          categoryGroup: "IT & Technology",
          breadcrumb: "CASE STUDIES • SaaS & Cloud Security",
          heading: "Turnkey ISO 27001 & SOC 2 Certification for Global SaaS Startup",
          description: "A fast-growing B2B enterprise software provider unlocked $12M in stalled US & European sales deals by achieving verified ISO 27001:2022 and SOC 2 Type II certification in 28 days.",
          ctaLabel: "View Case Study",
          ctaHref: "/case-studies#it-tech-cases",
          cards: [
            {
              id: "saas-deal-velocity-win",
              title: "Unlocked $12M in Stalled Enterprise Deals",
              description: "Instant vendor security questionnaires approval via published SOC 2 Type II assurance report.",
              icon: "DollarSign",
              href: "/case-studies",
              metric: "$12M Unlocked",
              badge: "Revenue Impact"
            },
            {
              id: "fast-track-cert-win",
              title: "28-Day Rapid Audit Certification",
              description: "Automated AWS and GitHub evidence harvesting with zero major non-conformities.",
              icon: "Zap",
              href: "/case-studies",
              metric: "28 Days",
              badge: "Zero Findings"
            },
            {
              id: "certin-compliance-win",
              title: "CERT-In 6-Hour Automated Incident Vault",
              description: "Automated SIEM alerting integrated with legal disclosure templates.",
              icon: "AlertCircle",
              href: "/case-studies",
              metric: "<15 Min Alert",
              badge: "CERT-In Ready"
            },
            {
              id: "gdpr-transfer-win",
              title: "EU & UK GDPR Data Transfer Verification",
              description: "Validated Standard Contractual Clauses (SCCs) and DPIA files approved by European clients.",
              icon: "Globe",
              href: "/case-studies",
              metric: "100% EU Approved",
              badge: "Cross-Border"
            }
          ]
        }
      ]
    }
  ]
};

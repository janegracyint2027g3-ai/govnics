import type { MegaMenuConfig } from "./megaMenuTypes";

export const partnersMegaData: MegaMenuConfig = {
  menuKey: "partners",
  title: "PARTNER ECOSYSTEM",
  badgeText: "10 Alliances",
  bottomLink: {
    label: "Explore Partner Ecosystem & Tiers →",
    href: "/partners"
  },
  groups: [
    {
      title: "Legal & Statutory",
      items: [
        {
          id: "regulatory-compliance-partner",
          name: "Regulatory Compliance Partners",
          tag: "Legal Counsel",
          href: "/partners?category=regulatory-compliance",
          categoryGroup: "Legal & Statutory",
          breadcrumb: "PARTNERS • Legal & Statutory Counsel",
          heading: "Corporate Law Practices, High-Court Advocates & Secretarial Networks",
          description: "Tier-one statutory legal practices and corporate secretaries delivering joint legal health checks, MCA/ROC secretarial filings, and regulatory gazette impact analysis.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=regulatory-compliance",
          cards: [
            {
              id: "corporate-law-alliances",
              title: "Corporate Law & Board Governance",
              description: "Joint board compliance reviews, D&O liability mapping, and high-court advocate representation.",
              icon: "Scale",
              href: "/partners?category=regulatory-compliance",
              badge: "Tier-1 Counsel"
            },
            {
              id: "secretarial-due-diligence",
              title: "Secretarial & MCA Audit Practices",
              description: "ROC filing verification, annual secretarial audit certification, and SS-1/SS-2 compliance.",
              icon: "FileCheck",
              href: "/partners?category=regulatory-compliance",
              badge: "Company Secretaries"
            },
            {
              id: "tribunal-advocates",
              title: "NCLT & Appellate Tribunal Defense",
              description: "Statutory litigation defense, IBC resolution professional support, and competition law advisory.",
              icon: "Landmark",
              href: "/partners?category=regulatory-compliance",
              badge: "Appellate Defense"
            },
            {
              id: "gazette-monitoring-partner",
              title: "Legislative Gazette Intelligence",
              description: "Co-authoring executive regulatory briefs on gazetted Central and State notification shifts.",
              icon: "BookOpen",
              href: "/partners?category=regulatory-compliance",
              badge: "Policy Intelligence"
            }
          ]
        },
        {
          id: "financial-governance-partner",
          name: "Financial Governance & Tax",
          tag: "Tax & Advisory",
          href: "/partners?category=financial-governance",
          categoryGroup: "Legal & Statutory",
          breadcrumb: "PARTNERS • Financial Governance",
          heading: "Chartered Accountants, Big-4 Tax Practices & Transfer Pricing Advisors",
          description: "Collaborative financial compliance network ensuring seamless GST e-invoicing, TDS/TCS statutory withholding, and cross-border FEMA transaction clearance.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=financial-governance",
          cards: [
            {
              id: "gst-direct-tax-partner",
              title: "GST & Direct Tax Compliance Practices",
              description: "Two-way purchase register reconciliation, input tax credit optimization, and scrutiny notice defense.",
              icon: "Receipt",
              href: "/partners?category=financial-governance",
              badge: "Statutory Tax"
            },
            {
              id: "transfer-pricing-fema",
              title: "Transfer Pricing & FEMA Alliances",
              description: "Cross-border arm's length documentation, Single Master Form filings, and FLA reporting.",
              icon: "Coins",
              href: "/partners?category=financial-governance",
              badge: "FEMA Advisory"
            }
          ]
        }
      ]
    },
    {
      title: "Industrial & Environmental",
      items: [
        {
          id: "labour-ehs-partner",
          name: "Labour & EHS Partners",
          tag: "Factories Act",
          href: "/partners?category=labour-ehs",
          categoryGroup: "Industrial & Environmental",
          breadcrumb: "PARTNERS • Labour & Industrial EHS",
          heading: "Industrial Safety Councils, Factory Inspectors & Occupational Health",
          description: "Joint delivery network for Factories Act 1948 registers, on-site hazard mock walkthroughs, CLRA contract worker audits, and certified industrial hygienists.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=labour-ehs",
          cards: [
            {
              id: "plant-floor-safety-partner",
              title: "Factory Safety Councils & Audit Engineers",
              description: "Machinery guarding inspections, crane fitness certifications, and mock evacuation drills.",
              icon: "HardHat",
              href: "/partners?category=labour-ehs",
              badge: "Industrial Safety"
            },
            {
              id: "clra-roster-partner",
              title: "Contract Labour (CLRA) Audit Practices",
              description: "Monthly contractor wage slip verification, PF/ESIC deposits, and vendor risk mitigation.",
              icon: "Users",
              href: "/partners?category=labour-ehs",
              badge: "Labour Audit"
            }
          ]
        },
        {
          id: "environmental-compliance-partner",
          name: "Environmental Compliance",
          tag: "CPCB / SPCB",
          href: "/partners?category=environmental-compliance",
          categoryGroup: "Industrial & Environmental",
          breadcrumb: "PARTNERS • Environmental Clearances",
          heading: "SPCB-Accredited Environmental Consultants & NABL Test Laboratories",
          description: "Authoritative environmental engineering partners supporting Consent to Establish/Operate (CTE/CTO), hazardous waste manifests, and CPCB EPR credit offsets.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=environmental-compliance",
          cards: [
            {
              id: "spcb-consent-liaison",
              title: "SPCB Consent & Environmental Engineering",
              description: "Online continuous emission monitoring systems (OCEMS), effluent treatment, and CTO renewals.",
              icon: "Leaf",
              href: "/partners?category=environmental-compliance",
              badge: "Pollution Clear"
            },
            {
              id: "epr-waste-alliances",
              title: "EPR Waste Recycler Alliances",
              description: "Audited plastic, battery, and electronic waste recycling certificates to fulfill legal EPR targets.",
              icon: "Recycle",
              href: "/partners?category=environmental-compliance",
              badge: "EPR Network"
            }
          ]
        }
      ]
    },
    {
      title: "Cybersecurity & Technology",
      items: [
        {
          id: "cybersecurity-privacy-partner",
          name: "Cybersecurity & Privacy Partners",
          tag: "CERT-In / VAPT",
          href: "/partners?category=cybersecurity-privacy",
          categoryGroup: "Cybersecurity & Technology",
          breadcrumb: "PARTNERS • Cybersecurity & Privacy",
          heading: "CERT-In Empaneled Auditors, Ethical Hackers & Data Privacy Legalists",
          description: "Collaborative technical delivery ecosystem executing vulnerability assessments (VAPT), 6-hour CERT-In incident notification defense, and DPDP Act consent architectures.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=cybersecurity-privacy",
          cards: [
            {
              id: "certin-auditor-alliances",
              title: "CERT-In Empaneled Auditor Alliances",
              description: "Annual statutory cybersecurity audits for banks, payment gateways, and government utilities.",
              icon: "ShieldAlert",
              href: "/partners?category=cybersecurity-privacy",
              badge: "CERT-In Panel"
            },
            {
              id: "vapt-defense-network",
              title: "Red Team & Penetration Testing Practices",
              description: "Web application, API, mobile app, and cloud infrastructure adversarial simulation reports.",
              icon: "Terminal",
              href: "/partners?category=cybersecurity-privacy",
              badge: "VAPT Network"
            }
          ]
        },
        {
          id: "tech-platforms-partner",
          name: "Technology Platforms & GRC OEMs",
          tag: "OEM Alliances",
          href: "/partners?category=technology-platforms",
          categoryGroup: "Cybersecurity & Technology",
          breadcrumb: "PARTNERS • Technology Platforms",
          heading: "Global Enterprise GRC Software OEMs & Cloud Infrastructure Providers",
          description: "Integrating GOVENICS automated compliance content and regulatory logic with leading GRC platforms: MetricStream, ServiceNow, VComply, AWS, Azure, and Google Cloud.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=technology-platforms",
          cards: [
            {
              id: "grc-platform-connectors",
              title: "GRC Software Integration Connectors",
              description: "Pre-configured Indian statutory regulatory libraries for MetricStream, ServiceNow, and VComply.",
              icon: "Layers",
              href: "/partners?category=technology-platforms",
              badge: "OEM Integration"
            },
            {
              id: "cloud-cspm-alliances",
              title: "Cloud Infrastructure (AWS/Azure/GCP)",
              description: "Automated continuous evidence collectors for cloud security, CIS Benchmarks, and SOC 2.",
              icon: "Cloud",
              href: "/partners?category=technology-platforms",
              badge: "Cloud Partner"
            }
          ]
        }
      ]
    },
    {
      title: "Audit & Certification",
      items: [
        {
          id: "audit-certification-partner",
          name: "Audit & Certification Bodies",
          tag: "Registrar Liaison",
          href: "/partners?category=audit-certification",
          categoryGroup: "Audit & Certification",
          breadcrumb: "PARTNERS • Certification Bodies",
          heading: "Accredited Global Certification Bodies: ISO, BSI, TÜV SÜD & DNV",
          description: "Strategic liaison and co-audit alignment with world-renowned certification registrars ensuring rapid scheduling, zero-deviation closure, and accredited certificate issuance.",
          ctaLabel: "Become a Partner",
          ctaHref: "/partners?category=audit-certification",
          cards: [
            {
              id: "iso-bsi-tuv-alliances",
              title: "BSI, TÜV SÜD & DNV Registrar Liaison",
              description: "Stage 1 and Stage 2 certification coordination for ISO 9001, 27001, 14001, and 45001.",
              icon: "Award",
              href: "/certifications",
              badge: "Tier-1 Registrars"
            },
            {
              id: "sgs-bureau-veritas-liaison",
              title: "SGS & Bureau Veritas Inspection Partnerships",
              description: "Ethical trade Sedex SMETA audits, automotive IATF 16949, and aerospace AS9100.",
              icon: "CheckCircle",
              href: "/certifications",
              badge: "Global Assurance"
            }
          ]
        }
      ]
    }
  ]
};

import type { MegaMenuData } from "./solutionsMenuData";

export const caseStudiesMenuData: MegaMenuData = {
  menuKey: "case-studies",
  leftColumn: {
    heading: "INDUSTRIES",
    description: "Audited enterprise outcomes & sector track records",
    searchPlaceholder: "Search client wins or topics…",
    viewAllLink: {
      label: "View all documented case studies →",
      href: "/case-studies"
    },
    industries: [
      {
        id: "bfsi-fintech-cases",
        name: "BFSI & Fintech",
        icon: "Landmark",
        href: "/case-studies?sector=bfsi-fintech-cases",
        subItems: [
          { id: "rbi-it-outsource", title: "RBI IT Outsource Compliance (Payments Aggregator)", href: "/case-studies?sector=bfsi-fintech-cases#case-rbi-it-payments" },
          { id: "dpdp-readiness-bank", title: "DPDP Readiness for Tier-1 Private Bank", href: "/case-studies?sector=bfsi-fintech-cases#case-dpdp-tier1-bank" },
          { id: "nbfc-gov-overhaul", title: "NBFC Corporate Governance Overhaul", href: "/case-studies?sector=bfsi-fintech-cases#case-nbfc-corp-gov" },
          { id: "aml-kyc-lender", title: "AML/KYC Automation for Digital Lender", href: "/case-studies?sector=bfsi-fintech-cases#case-aml-kyc-lender" }
        ]
      },
      {
        id: "manufacturing-industrial-cases",
        name: "Manufacturing & Industrial",
        icon: "Factory",
        href: "/case-studies?sector=manufacturing-industrial-cases",
        subItems: [
          { id: "shopfloor-safety-auto", title: "Shopfloor Safety Automation (Auto OEM)", href: "/case-studies?sector=manufacturing-industrial-cases#case-shopfloor-safety-auto" },
          { id: "warehouse-fire-safety", title: "Warehouse Compliance & Fire Safety (Logistics Hub)", href: "/case-studies?sector=manufacturing-industrial-cases#case-warehouse-fire-logistics" },
          { id: "factories-act-auto", title: "Factories Act Automation (Auto Component Maker)", href: "/case-studies?sector=manufacturing-industrial-cases#case-factories-act-auto-comp" },
          { id: "esg-brsr-listed", title: "ESG & BRSR Reporting (Listed Manufacturer)", href: "/case-studies?sector=manufacturing-industrial-cases#case-esg-brsr-listed-mfg" },
          { id: "supply-chain-due-diligence", title: "Supply Chain Due Diligence (Electronics OEM)", href: "/case-studies?sector=manufacturing-industrial-cases#case-supply-chain-electronics" },
          { id: "hazardous-waste-pharma", title: "Hazardous Waste Compliance (Pharma Plant)", href: "/case-studies?sector=manufacturing-industrial-cases#case-hazardous-waste-pharma" }
        ]
      },
      {
        id: "healthcare-hospitals-cases",
        name: "Healthcare & Hospitals",
        icon: "Stethoscope",
        href: "/case-studies?sector=healthcare-hospitals-cases",
        subItems: [
          { id: "clinical-gov-hospital", title: "Clinical Governance & NABH 5th Edition (Hospital Chain)", href: "/case-studies?sector=healthcare-hospitals-cases#case-clinical-gov-hospital" },
          { id: "hipaa-dpdp-healthtech", title: "HIPAA & DPDP Compliance (HealthTech Platform)", href: "/case-studies?sector=healthcare-hospitals-cases#case-hipaa-dpdp-healthtech" },
          { id: "medical-device-approval", title: "Medical Device Regulatory Approval & ISO 13485", href: "/case-studies?sector=healthcare-hospitals-cases#case-medical-device-cdsco" },
          { id: "patient-privacy-audit", title: "Patient Data Privacy Audit across 25+ Diagnostic Labs", href: "/case-studies?sector=healthcare-hospitals-cases#case-patient-privacy-audit" }
        ]
      },
      {
        id: "it-tech-cases",
        name: "IT & Technology Services",
        icon: "Cpu",
        href: "/case-studies?sector=it-tech-cases",
        subItems: [
          { id: "iso-soc2-saas", title: "ISO 27001 & SOC 2 Accelerator (SaaS Startup)", href: "/case-studies?sector=it-tech-cases#case-soc2-accelerator" },
          { id: "dpdp-it-exporters", title: "DPDP Compliance for IT Exporters & GCCs", href: "/case-studies?sector=it-tech-cases#case-dpdp-it-exporters" },
          { id: "cloud-security-cspm", title: "Cloud Security Posture Management & CERT-In", href: "/case-studies?sector=it-tech-cases#case-cspm-certin" },
          { id: "vendor-risk-bigtech", title: "Vendor Risk Management for Tier-1 Tech Giant", href: "/case-studies?sector=it-tech-cases#case-tprm-bigtech" }
        ]
      },
      {
        id: "infra-construction-cases",
        name: "Infrastructure & Construction",
        icon: "Building2",
        href: "/case-studies?sector=infra-construction-cases",
        subItems: [
          { id: "rera-compliance-mgmt", title: "RERA Compliance Management (Real Estate Developer)", href: "/case-studies?sector=infra-construction-cases#case-rera-compliance" },
          { id: "epc-safety-audits", title: "EPC Contractor BOCW Safety Audits (Metro Rail)", href: "/case-studies?sector=infra-construction-cases#case-epc-bocw" },
          { id: "smart-city-privacy", title: "Smart City Data Privacy & Municipal Framework", href: "/case-studies?sector=infra-construction-cases#case-smartcity-privacy" },
          { id: "logistics-env-clearance", title: "Logistics Park SPCB Environmental Clearance", href: "/case-studies?sector=infra-construction-cases#case-logistics-env" }
        ]
      },
      {
        id: "energy-utilities-cases",
        name: "Energy & Utilities",
        icon: "Zap",
        href: "/case-studies?sector=energy-utilities-cases",
        subItems: [
          { id: "carbon-netzero-power", title: "Carbon Footprint & Net Zero Roadmap (Power Gen)", href: "/case-studies?sector=energy-utilities-cases#case-netzero-power" },
          { id: "renewable-reg-compliance", title: "Renewable Energy Regulatory Compliance (400MW Solar)", href: "/case-studies?sector=energy-utilities-cases#case-renewable-ppa" },
          { id: "oilgas-hse-system", title: "Oil & Gas OISD/PNGRB Safety Management System", href: "/case-studies?sector=energy-utilities-cases#case-oisd-oilgas" },
          { id: "water-cyber-audit", title: "Water Utility SCADA Cyber Security Audit", href: "/case-studies?sector=energy-utilities-cases#case-scada-water" }
        ]
      },
      {
        id: "retail-ecommerce-cases",
        name: "Retail & E-commerce",
        icon: "ShoppingBag",
        href: "/case-studies?sector=retail-ecommerce-cases",
        subItems: [
          { id: "consumer-privacy-d2c", title: "Consumer Data Privacy & Cookie Audit (D2C Brand)", href: "/case-studies?sector=retail-ecommerce-cases#case-d2c-privacy" },
          { id: "supply-labor-marketplace", title: "Supply Chain Gig Worker Compliance (E-Commerce)", href: "/case-studies?sector=retail-ecommerce-cases#case-marketplace-gig" },
          { id: "gst-einvoicing-auto", title: "GST & E-Invoicing Automation (Multi-State Retail)", href: "/case-studies?sector=retail-ecommerce-cases#case-gst-retail" },
          { id: "omnichannel-fraud", title: "Omnichannel Payment Fraud Prevention Architecture", href: "/case-studies?sector=retail-ecommerce-cases#case-retail-fraud" }
        ]
      },
      {
        id: "professional-services-cases",
        name: "Professional Services",
        icon: "Briefcase",
        href: "/case-studies?sector=professional-services-cases",
        subItems: [
          { id: "statutory-payroll-hr", title: "Automated Statutory Payroll for 45,000 Contract Staff", href: "/case-studies?sector=professional-services-cases#case-payroll-outsourcing" },
          { id: "secretarial-conglomerate", title: "Secretarial & ROC Compliance for Multi-Entity Group", href: "/case-studies?sector=professional-services-cases#case-roc-secretarial" },
          { id: "audit-transformation", title: "Internal Audit Digital Transformation (Top Audit Firm)", href: "/case-studies?sector=professional-services-cases#case-audit-automation" },
          { id: "legaltech-data-sec", title: "Legal Tech Platform ISO 27001 Data Security Overhaul", href: "/case-studies?sector=professional-services-cases#case-legaltech-sec" }
        ]
      }
    ]
  },
  rightColumn: {
    complianceDomains: {
      title: "Compliance Domains",
      description: "Documented regulatory audit wins, zero-penalty clearances & client successes",
      items: [
        {
          id: "central-govt-tax-wins",
          title: "Central Govt Tax & Regulatory Success",
          icon: "FileCheck",
          href: "/case-studies?domain=tax-success",
          description: "Zero-error GST reconciliations, automated TDS filings and DGFT export license clearances",
          subItems: [
            { id: "zero-error-gst", title: "Zero-Error GST Reconciliation across 140+ Retail Stores", href: "/case-studies?domain=tax-success#case-gst" },
            { id: "automated-tds-tcs", title: "Automated TDS/TCS Filing Engine (Fortune 500 IT Services)", href: "/case-studies?domain=tax-success#case-tds" },
            { id: "dgft-license-opt", title: "DGFT Advance License Optimization & Duty Remission", href: "/case-studies?domain=tax-success#case-dgft" },
            { id: "fema-foreign-invest", title: "FEMA Compliant Foreign Direct Investment Restructuring", href: "/case-studies?domain=tax-success#case-fema" }
          ]
        },
        {
          id: "rbi-nbfc-wins",
          title: "RBI & NBFC Governance Wins",
          icon: "ShieldAlert",
          href: "/case-studies?domain=rbi-wins",
          description: "Zero critical deviations during annual RBI AFI audits, digital lending compliance & AML",
          subItems: [
            { id: "zero-deviations-rbi", title: "Zero Critical Deviations in Annual RBI Inspection (Fintech Unicorn)", href: "/case-studies?domain=rbi-wins#case-rbi-zero" },
            { id: "digital-lending-impl", title: "Turnkey Digital Lending Guidelines Implementation (12 LSPs)", href: "/case-studies?domain=rbi-wins#case-digital-lending" },
            { id: "nbfc-board-framework", title: "NBFC Board Governance & Scale-Based Transition Roadmap", href: "/case-studies?domain=rbi-wins#case-nbfc-board" },
            { id: "aml-cft-surveillance", title: "Automated AML/CFT Transaction Surveillance Engine", href: "/case-studies?domain=rbi-wins#case-aml-surveillance" }
          ]
        },
        {
          id: "labour-safety-triumphs",
          title: "State-Level Labour & Safety Triumphs",
          icon: "Users",
          href: "/case-studies?domain=labour-triumphs",
          description: "100% PF/ESI contractor accuracy, zero-accident factory safety records & license renewals",
          subItems: [
            { id: "100-pf-esi", title: "100% PF/ESI Statutory Reconciliation across 12,000 Workers", href: "/case-studies?domain=labour-triumphs#case-pf-esi" },
            { id: "factory-license-accel", title: "Turnkey Factory License Renewal Acceleration across 5 States", href: "/case-studies?domain=labour-triumphs#case-factory-accel" },
            { id: "zero-accident-record", title: "Zero Lost-Time Injury (LTI) Safety Record (Infra Project)", href: "/case-studies?domain=labour-triumphs#case-zero-accident" },
            { id: "contract-wage-verif", title: "Biometric Contractor Wage Verification & CLRA Compliance", href: "/case-studies?domain=labour-triumphs#case-contract-wages" },
            { id: "warehouse-ergo-audit", title: "Ergonomics & Fire Safety Audit across 3 Mega Hubs", href: "/case-studies?domain=labour-triumphs#case-warehouse-audit" }
          ]
        },
        {
          id: "environmental-success",
          title: "State-Level Environmental Success",
          icon: "Leaf",
          href: "/case-studies?domain=env-success",
          description: "Fast-track CPCB/SPCB consent renewals, zero liquid discharge & EPR circularity",
          subItems: [
            { id: "cpcb-15-days", title: "SPCB Consent to Operate (CTO) Renewal in Record 15 Days", href: "/case-studies?domain=env-success#case-cpcb-renewal" },
            { id: "epr-credit-plastic", title: "100% Plastic Packaging EPR Credit Sourcing & Portal Filing", href: "/case-studies?domain=env-success#case-epr-credit" },
            { id: "zero-liquid-discharge", title: "Zero Liquid Discharge (ZLD) Certification for Textile Park", href: "/case-studies?domain=env-success#case-zld" },
            { id: "hazardous-manifest", title: "End-to-End Hazardous Waste Manifest Tracking System", href: "/case-studies?domain=env-success#case-hazardous-manifest" }
          ]
        },
        {
          id: "data-privacy-wins",
          title: "Data Privacy & Cybersecurity Wins",
          icon: "Lock",
          href: "/case-studies?domain=cyber-wins",
          description: "Fast-track SOC 2 Type II certifications, breach responses under 6 hours & DPDP consent managers",
          subItems: [
            { id: "soc2-60-days", title: "SOC 2 Type II Certification in 60 Days (Enterprise SaaS)", href: "/case-studies?domain=cyber-wins#case-soc2" },
            { id: "breach-response-6h", title: "CERT-In Mandated Breach Response Executed in Under 4 Hours", href: "/case-studies?domain=cyber-wins#case-breach" },
            { id: "dpdp-consent-manager", title: "DPDP Multilingual Consent Manager Implementation (8M Users)", href: "/case-studies?domain=cyber-wins#case-dpdp-consent" },
            { id: "cloud-hardening-aws", title: "Multi-Cloud Security Hardening & Zero-Trust Architecture", href: "/case-studies?domain=cyber-wins#case-cloud-hardening" }
          ]
        },
        {
          id: "risk-audit-triumphs",
          title: "Risk Management & Audit Triumphs",
          icon: "BarChart3",
          href: "/case-studies?domain=risk-triumphs",
          description: "Enterprise ERM deployments, third-party vendor risk dashboards & forensic recoveries",
          subItems: [
            { id: "erm-deployment-bfsi", title: "Enterprise Risk Management (ERM) for Top-5 Insurance Group", href: "/case-studies?domain=risk-triumphs#case-erm-bfsi" },
            { id: "tprm-dashboard-it", title: "Third-Party Vendor Risk Dashboard across 450 Active Vendors", href: "/case-studies?domain=risk-triumphs#case-tprm" },
            { id: "bcp-activation", title: "Zero-Downtime Business Continuity Plan (BCP) Activation", href: "/case-studies?domain=risk-triumphs#case-bcp" },
            { id: "forensic-recovery", title: "Internal Audit Forensic Investigation & ₹18 Cr Asset Recovery", href: "/case-studies?domain=risk-triumphs#case-forensic" }
          ]
        },
        {
          id: "esg-impact",
          title: "ESG & Sustainability Impact",
          icon: "Leaf",
          href: "/case-studies?domain=esg-impact",
          description: "SEBI BRSR Core assurance disclosures, 25% carbon footprint cuts & green audits",
          subItems: [
            { id: "brsr-core-listed", title: "SEBI BRSR Core Reasonable Assurance for Listed Conglomerate", href: "/case-studies?domain=esg-impact#case-brsr-core" },
            { id: "25-carbon-reduction", title: "25% Carbon Emission Reduction Roadmap in Cement Operations", href: "/case-studies?domain=esg-impact#case-carbon-red" },
            { id: "circular-waste-model", title: "Zero-Waste-to-Landfill Certification (Industrial Campus)", href: "/case-studies?domain=esg-impact#case-circular-model" },
            { id: "social-supply-audit", title: "Social & Human Rights Supply Chain Audit across Tier-1 Vendors", href: "/case-studies?domain=esg-impact#case-social-audit" }
          ]
        },
        {
          id: "intl-achievements",
          title: "International Compliance Achievements",
          icon: "Globe",
          href: "/case-studies?domain=intl-achieve",
          description: "European GDPR attestations, US SOX Section 404 readiness & integrated ISO audits",
          subItems: [
            { id: "gdpr-eu-clients", title: "EU GDPR Data Transfer Privacy Impact Assessment (German Client)", href: "/case-studies?domain=intl-achieve#case-gdpr-eu" },
            { id: "sox-us-listing", title: "SOX 404 Internal Controls Certification for US-Listed Firm", href: "/case-studies?domain=intl-achieve#case-sox-us" },
            { id: "iso-integrated-audit", title: "Integrated ISO 9001, 14001 & 45001 Certification in 90 Days", href: "/case-studies?domain=intl-achieve#case-iso-audit" },
            { id: "ofac-screening-setup", title: "Automated OFAC & Anti-Money Laundering Screening Setup", href: "/case-studies?domain=intl-achieve#case-ofac-setup" }
          ]
        }
      ]
    },
    secondSection: {
      title: "Outcome Metrics",
      description: "Verified client KPI benchmarks, statutory penalty mitigations and measurable ROI",
      items: [
        {
          id: "regulatory-outcomes",
          title: "Regulatory & Compliance Outcomes",
          icon: "FileCheck",
          href: "/case-studies#outcome-metrics",
          description: "Flawless audit records, 100% statutory filing accuracy & zero regulatory stop-work orders",
          subItems: [
            { id: "zero-audit-deviations", title: "Zero Critical Audit Deviations across 120+ Regulatory Inspections", href: "/case-studies#outcome-metrics" },
            { id: "100-statutory-acc", title: "100% Statutory Filing Accuracy with Zero Late Submissions", href: "/case-studies#outcome-metrics" },
            { id: "zero-penalty-exp", title: "₹0 Incurred Statutory Penalties across Audited Portfolios", href: "/case-studies#outcome-metrics" },
            { id: "accel-license-app", title: "3x Faster Factory & Municipal License Approvals", href: "/case-studies#outcome-metrics" }
          ]
        },
        {
          id: "operational-efficiency",
          title: "Operational Efficiency Gains",
          icon: "TrendingUp",
          href: "/case-studies#outcome-metrics",
          description: "Dramatic compliance effort reductions, real-time risk dashboards and rapid response times",
          subItems: [
            { id: "40-manual-red", title: "40% Direct Reduction in Manual Compliance Overhead", href: "/case-studies#outcome-metrics" },
            { id: "50-faster-incident", title: "50% Faster Security & Incident Response Clearance", href: "/case-studies#outcome-metrics" },
            { id: "999-uptime", title: "99.9% Telemetry Uptime across High-Availability Regulators", href: "/case-studies#outcome-metrics" },
            { id: "realtime-visibility", title: "100% Real-Time Compliance Visibility for Executive Boards", href: "/case-studies#outcome-metrics" }
          ]
        },
        {
          id: "financial-impact",
          title: "Financial & Business Impact",
          icon: "DollarSign",
          href: "/case-studies#outcome-metrics",
          description: "Protected commercial contract values, lowered insurance premiums and investor ESG ratings",
          subItems: [
            { id: "revenue-protection", title: "₹250+ Cr Enterprise Contract Revenue Protected via Fast Audits", href: "/case-studies#outcome-metrics" },
            { id: "cost-savings-auto", title: "₹1.4 Cr Average Annualized Cost Savings via Workflow Automation", href: "/case-studies#outcome-metrics" },
            { id: "improved-esg-ratings", title: "Top-Quartile ESG Rating Improvement for Institutional Investors", href: "/case-studies#outcome-metrics" },
            { id: "lower-insurance-prem", title: "18% Reduction in Cyber & Commercial Liability Insurance Premiums", href: "/case-studies#outcome-metrics" }
          ]
        },
        {
          id: "trust-reputation",
          title: "Trust & Reputation Metrics",
          icon: "HeartHandshake",
          href: "/case-studies#outcome-metrics",
          description: "Elevated stakeholder confidence, flawless client audits and worker welfare ratings",
          subItems: [
            { id: "customer-trust-scores", title: "98.7% Enterprise Customer Trust & Audit Verification Score", href: "/case-studies#outcome-metrics" },
            { id: "brand-protection", title: "Zero Regulatory Disclosures or Reputational Damage Events", href: "/case-studies#outcome-metrics" },
            { id: "stakeholder-conf-index", title: "99.2% Board & Institutional Investor Confidence Index", href: "/case-studies#outcome-metrics" },
            { id: "employee-safety-sat", title: "Zero Fatal Safety Violations and 94% Worker Welfare Satisfaction", href: "/case-studies#outcome-metrics" }
          ]
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

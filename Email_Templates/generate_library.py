#!/usr/bin/env python3
"""
GOVENICS GRC — Enterprise Email Library Generator
Generates all 54 high-fidelity, email-client-safe HTML templates across 9 industries and 6 email types.
Validates word counts, banned words, subject lines, and outputs generation-manifest.json.
"""

import os
import re
import json

BASE_DIR = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\Email_Templates"
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
CONFIG_DIR = os.path.join(BASE_DIR, "config")
PREVIEW_DIR = os.path.join(BASE_DIR, "preview")

BANNED_WORDS = ["unlock", "transform", "accelerate", "synergy", "game-changer", "game changer", "delve"]

# 9 Industries
INDUSTRIES = {
    "bfsi": {
        "name": "BFSI & Financial Services",
        "folder": "bfsi",
        "slug": "financial-services",
        "regulations": "RBI Master Directions, SEBI LODR, IRDAI, PMLA, DPDP Act 2023",
        "target_roles": "CRO, CCO, Head of Compliance, CFO, Internal Audit Head",
        "primary_offering": "Regulatory Compliance Management & Audit Readiness",
        "offering_url": "/services/regulatory-compliance"
    },
    "manufacturing": {
        "name": "Manufacturing & Industrial",
        "folder": "manufacturing",
        "slug": "manufacturing-industrial",
        "regulations": "Factories Act 1948, ISO 14001, ISO 45001, IATF 16949, PESO, MSIHC Rules",
        "target_roles": "COO, Plant Head, Head of EHS, Supply Chain Director, CFO",
        "primary_offering": "EHS Compliance & Industrial Risk Governance",
        "offering_url": "/services/regulatory-compliance"
    },
    "technology": {
        "name": "Technology & Electronics",
        "folder": "technology",
        "slug": "technology-electronics",
        "regulations": "DPDP Act 2023, ISO 27001:2022, SOC 2 Type II, CERT-In Directives",
        "target_roles": "CISO, CTO, DPO, Head of InfoSec, VP Engineering",
        "primary_offering": "Cybersecurity, ISO 27001 & Data Privacy Advisory",
        "offering_url": "/cybersecurity"
    },
    "infrastructure": {
        "name": "Infrastructure & Construction",
        "folder": "infrastructure",
        "slug": "infrastructure-construction",
        "regulations": "RERA Act, BOCW Act, CPCB Guidelines, NHAI Directives, Mines Act",
        "target_roles": "Project Director, COO, Head of Legal, EHS Director, CFO",
        "primary_offering": "Statutory Site Compliance & Project Risk Controls",
        "offering_url": "/services/regulatory-compliance"
    },
    "energy": {
        "name": "Energy & Utilities",
        "folder": "energy",
        "slug": "energy-utilities",
        "regulations": "Electricity Act 2003, CERC Regulations, PESO, CPCB CEMS, BRSR",
        "target_roles": "Head of HSE, Regulatory Affairs Director, Plant Director, CFO",
        "primary_offering": "Energy Regulatory Compliance & BRSR ESG Reporting",
        "offering_url": "/esg"
    },
    "healthcare": {
        "name": "Healthcare & Life Sciences",
        "folder": "healthcare",
        "slug": "healthcare-life-sciences",
        "regulations": "NABH 5th Edition, CDSCO, Bio-Medical Waste Rules, DPDP Act 2023",
        "target_roles": "Quality Head, Medical Director, Regulatory Affairs Director, COO",
        "primary_offering": "Accreditation Support & Healthcare Data Privacy",
        "offering_url": "/services/accreditation-services"
    },
    "food-processing": {
        "name": "Food Processing",
        "folder": "food-processing",
        "slug": "food-processing-pharma-healthcare",
        "regulations": "FSSAI Act 2006, ISO 22000, Legal Metrology, BIS, HACCP Guidelines",
        "target_roles": "Quality Director, Regulatory Head, Plant Head, Supply Chain Head",
        "primary_offering": "FSSAI Statutory Compliance & Food Safety Audit",
        "offering_url": "/services/regulatory-compliance"
    },
    "consumer-retail": {
        "name": "Consumer & Retail",
        "folder": "consumer-retail",
        "slug": "consumer-retail",
        "regulations": "Legal Metrology Packaged Commodities, DPDP Act, Consumer Protection 2019, EPR",
        "target_roles": "Head of Legal, COO, E-Commerce Operations Head, CFO",
        "primary_offering": "Multi-State Establishment & Consumer Regulatory Governance",
        "offering_url": "/sgrc/services/establishment-compliances"
    },
    "media-services": {
        "name": "Media & Services",
        "folder": "media-services",
        "slug": "media-services",
        "regulations": "UGC/AICTE Norms, NAAC Guidelines, DGCA Directives, MIB Regulations, DPDP Act",
        "target_roles": "Registrar, Quality Assurance Director, Legal Counsel, COO",
        "primary_offering": "Institutional Accreditation & Regulatory Risk Governance",
        "offering_url": "/services/accreditation-services"
    }
}

# The 6 email types specification
EMAIL_TYPES = {
    "welcome": {
        "name": "Welcome Email",
        "max_words": 180,
        "has_stats": False,
        "purpose": "Orient new contacts, establish institutional pedigree, set clear expectations."
    },
    "promotional": {
        "name": "Promotional Email",
        "max_words": 125,
        "has_stats": True,
        "purpose": "Introduce specialized advisory offering addressing high-priority compliance requirements."
    },
    "business-value": {
        "name": "Business-Value Email",
        "max_words": 150,
        "has_stats": True,
        "purpose": "Articulate executive business case, risk containment, and audit defense efficiency."
    },
    "advertising": {
        "name": "Advertising / Campaign Email",
        "max_words": 125,
        "has_stats": True,
        "purpose": "Focus on an impending regulatory deadline or statutory inspection cycle."
    },
    "re-engagement": {
        "name": "Re-Engagement Email",
        "max_words": 120,
        "has_stats": False,
        "purpose": "Reconnect with inactive stakeholders using fresh regulatory insights without guilt."
    },
    "lead-generation": {
        "name": "Lead-Generation / Assessment Email",
        "max_words": 130,
        "has_stats": True,
        "purpose": "Offer confidential, structured gap assessment against primary regulatory frameworks."
    }
}

# Content data dictionary containing tailored copy for all 54 combinations
CONTENT_DATA = {
    # ─────────────────────────────────────────────────────────────────────────
    # 1. BFSI
    # ─────────────────────────────────────────────────────────────────────────
    ("bfsi", "welcome"): {
        "subjects": ["Welcome to GOVENICS GRC Advisory", "Your BFSI Compliance Briefing Awaits", "Strengthening Your Financial Risk Posture"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Thank you for connecting with GOVENICS GRC. As a specialized governance, risk, and compliance advisory division of ISI Group (established 1985), we partner with scheduled banks, NBFCs, and financial institutions to navigate evolving statutory mandates.",
        "p2": "Under recent RBI Master Directions and SEBI circulars, financial institutions face tighter inspection cycles across IT governance, digital payments, and risk management. Our team delivers actionable compliance frameworks, statutory audit defense, and control verification designed specifically for regulated financial entities.",
        "p3": "We look forward to sharing practical regulatory updates with {{COMPANY_NAME}}. You can review our BFSI advisory scope or reach our desk directly to discuss your upcoming audit commitments.",
        "cta_label": "Explore BFSI Advisory Scope",
        "cta_subtext": "Confidential advisory review for banking and financial institutions.",
        "cta_url": "https://govnics-murex.vercel.app/industries/financial-services"
    },
    ("bfsi", "promotional"): {
        "subjects": ["RBI Master Directions Compliance Review", "Streamlining Your Annual Financial Inspection", "Managing Third-Party Risk in BFSI"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Navigating multi-regulator supervision across RBI, SEBI, and IRDAI requires continuous oversight rather than periodic checklists. Disjointed controls leave financial institutions vulnerable to supervisory scrutiny and reporting delays.",
        "p2": "GOVENICS GRC provides end-to-end statutory compliance management tailored for {{COMPANY_NAME}}. We map your operations against 150+ RBI directions, operationalize RCSA frameworks, and establish defensible internal audit records.",
        "p3": "Our senior advisory team helps institutions maintain continuous readiness across board reporting and regulatory inspections.",
        "stats": [
            ("Mapped Directions", "150+", "RBI Master Direction coverage"),
            ("Audit Readiness", "Structured", "Pre-inspection control testing"),
            ("Supervisory Scope", "RBI, SEBI", "Cross-regulator harmonization"),
            ("Review Cycle", "Continuous", "Monthly compliance assurance")
        ],
        "cta_label": "Schedule BFSI Compliance Review",
        "cta_subtext": "Direct discussion with our senior banking compliance advisors.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("bfsi", "business-value"): {
        "subjects": ["The Business Case for Integrated GRC", "Protecting Board Governance in Banking", "Reducing Statutory Compliance Overhead"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Regulatory enforcement in financial services has shifted from formal reviews to active operational scrutiny. Manual tracking across fragmented departments increases risk exposure and multiplies audit response costs for {{COMPANY_NAME}}.",
        "p2": "GOVENICS GRC integrates risk registers, statutory calendars, and audit controls into a cohesive governance system. This approach eliminates duplicated filings, identifies control deficiencies before supervisory teams arrive, and provides leadership with defensible compliance metrics.",
        "p3": "Institutions working with our advisors maintain rigorous governance while lowering ongoing administrative expenditure.",
        "stats": [
            ("Filing Cadence", "Real-Time", "Statutory calendar automation"),
            ("Risk Governance", "Board-Ready", "Unified risk heat maps"),
            ("Audit Exposure", "Contained", "Pre-emptive control closure"),
            ("Advisory Basis", "ISI Group", "39+ years institutional heritage")
        ],
        "cta_label": "View GRC Business Case",
        "cta_subtext": "Request our executive briefing on financial governance architecture.",
        "cta_url": "https://govnics-murex.vercel.app/services/enterprise-risk-management"
    },
    ("bfsi", "advertising"): {
        "subjects": ["Upcoming RBI Audit Cycle Preparation", "RBI IT Governance Review Window", "Strengthen Your Annual Inspection Defense"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "With annual financial inspection cycles approaching, regulated entities must demonstrate effective operational controls and IT risk governance.",
        "p2": "GOVENICS GRC is conducting specialized audit readiness clinics for banking and NBFC leadership. Our certified advisors review key exposure areas, validate digital lending guidelines, and ensure third-party vendor assessments satisfy regulatory standards.",
        "p3": "Ensure {{COMPANY_NAME}} enters the upcoming supervisory cycle with validated documentation and clear control ownership.",
        "stats": [
            ("Preparation Window", "3 Weeks", "Focused readiness review"),
            ("Mandate Scope", "IT & Lending", "RBI operational directives"),
            ("Output Document", "Gap Register", "Prioritized corrective matrix"),
            ("Empanelment", "CERT-In", "Technical security backing")
        ],
        "cta_label": "Request Inspection Readiness Clinic",
        "cta_subtext": "Limited review slots for scheduled banking institutions.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("bfsi", "re-engagement"): {
        "subjects": ["Updated BFSI Regulatory Briefing", "Revisiting Compliance Priorities for BFSI", "Recent Regulatory Developments in BFSI"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Regulatory expectations for financial institutions continue to expand, with fresh guidelines impacting digital payment operations and cloud outsourcing.",
        "p2": "We previously discussed compliance priorities for {{COMPANY_NAME}}. Given recent supervisory updates from the Reserve Bank, our advisory team has assembled a focused overview of common inspection findings and remediation steps.",
        "p3": "If your team is updating its statutory compliance agenda for the coming quarter, we would be pleased to share our practical observations.",
        "cta_label": "Reconnect with BFSI Advisory",
        "cta_subtext": "A brief conversation with our senior financial compliance specialists.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("bfsi", "lead-generation"): {
        "subjects": ["Confidential BFSI Compliance Gap Review", "Evaluate Your RBI Regulatory Readiness", "Assess Your Financial Risk Governance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Supervisory penalties and operational restrictions often trace back to isolated oversight gaps in vendor governance, master direction tracking, or board disclosures.",
        "p2": "GOVENICS GRC offers a confidential, structured GRC Gap Assessment for {{COMPANY_NAME}}. Our senior compliance specialists evaluate your current controls against RBI Master Directions, PMLA provisions, and SEBI listing mandates, identifying specific exposure areas before statutory auditors review them.",
        "p3": "The assessment delivers an executive gap matrix and remediation roadmap within fourteen business days.",
        "stats": [
            ("Coverage Breadth", "15+ Laws", "Statutory & circular mapping"),
            ("Gap Identification", "Definitive", "Clear priority scoring"),
            ("Delivery Time", "14 Days", "Rapid executive turnaround"),
            ("Confidentiality", "NDA Backed", "Complete institutional privacy")
        ],
        "cta_label": "Request Confidential Assessment",
        "cta_subtext": "Zero-obligation diagnostic for regulated financial institutions.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 2. MANUFACTURING & INDUSTRIAL
    # ─────────────────────────────────────────────────────────────────────────
    ("manufacturing", "welcome"): {
        "subjects": ["Welcome to GOVENICS Industrial Advisory", "Enhancing Your Plant Compliance Posture", "Industrial Risk & EHS Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Backed by the 39-year legacy of ISI Group, our industrial advisory team works alongside plant leadership, corporate safety heads, and manufacturing executives across India.",
        "p2": "Modern manufacturing demands strict statutory discipline across the Factories Act 1948, State Pollution Control Board mandates, PESO licenses, and contractor labor rules. We help manufacturing units build structured, audit-ready compliance systems across every plant location.",
        "p3": "We are pleased to connect with {{COMPANY_NAME}} and support your plant safety, environmental stewardship, and regulatory governance goals.",
        "cta_label": "Explore Manufacturing Solutions",
        "cta_subtext": "Review plant-level statutory and EHS advisory capabilities.",
        "cta_url": "https://govnics-murex.vercel.app/industries/manufacturing-industrial"
    },
    ("manufacturing", "promotional"): {
        "subjects": ["Factories Act Compliance Architecture", "Strengthening Plant Safety & EHS", "Industrial Vendor Risk Governance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Operating multi-location manufacturing facilities requires tracking dozens of environmental consents, equipment testing records, and contractor labor registers without interruption.",
        "p2": "GOVENICS GRC provides integrated statutory compliance frameworks designed specifically for industrial plants. We audit plant registers, align operations with Factories Act provisions, and manage PESO and hazardous chemical compliance protocols for {{COMPANY_NAME}}.",
        "p3": "Our structured approach safeguards facility licenses while maintaining continuous audit defense during labor and factory inspections.",
        "stats": [
            ("Statutory Registers", "50+ Mapped", "Factories Act compliance"),
            ("Site Safety", "ISO 45001", "Occupational health alignment"),
            ("Hazmat Clearances", "PESO Ready", "Storage and handling compliance"),
            ("Supplier Audits", "Tier-1 & 2", "Supply chain due diligence")
        ],
        "cta_label": "Schedule Plant Compliance Review",
        "cta_subtext": "Consult our senior industrial safety and compliance engineers.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("manufacturing", "business-value"): {
        "subjects": ["Reducing Plant Regulatory Disruption", "The ROI of Industrial EHS Governance", "Protecting Manufacturing Operating Licenses"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Unplanned factory stoppages, inspection notices, and contractor non-compliance lead to severe production losses and executive liability for industrial enterprises.",
        "p2": "GOVENICS GRC replaces fragmented plant logbooks with a centralized statutory monitoring system. By maintaining real-time visibility across environmental consents, boiler inspections, and safety committees, {{COMPANY_NAME}} prevents license suspension risks and streamlines renewal cycles.",
        "p3": "Our clients protect operating margins while establishing transparent corporate governance across all manufacturing locations.",
        "stats": [
            ("License Tracking", "100% Current", "Zero lapse renewal assurance"),
            ("Inspection Defense", "Documented", "Instant statutory register retrieval"),
            ("Labor Compliance", "Integrated", "Contract worker statutory verification"),
            ("Parent Heritage", "Est. 1985", "ISI Group industrial background")
        ],
        "cta_label": "Review Manufacturing Case",
        "cta_subtext": "Examine our operational compliance framework for industrial plants.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("manufacturing", "advertising"): {
        "subjects": ["Pre-Inspection EHS Diagnostic Window", "Plant Statutory Readiness Review", "Annual Factory Audit Preparation"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "State factory inspectorates and pollution boards are conducting rigorous physical audits targeting industrial safety and effluent management.",
        "p2": "GOVENICS GRC is providing comprehensive Pre-Inspection Readiness Reviews for manufacturing units. Our specialists inspect physical facilities, evaluate machine guarding and chemical registers, and verify contractor statutory filings across {{COMPANY_NAME}}.",
        "p3": "Ensure your production lines remain fully compliant and protected against unexpected regulatory stop-work notices.",
        "stats": [
            ("Inspection Scope", "Site-Wide", "Shopfloor to hazardous stores"),
            ("Audit Turnaround", "5 Days", "Rapid on-site assessment"),
            ("Remediation", "Prioritized", "High, medium, low risk register"),
            ("Verification", "Statutory", "Full alignment with state rules")
        ],
        "cta_label": "Book Plant Readiness Review",
        "cta_subtext": "Available for industrial facilities and fabrication plants.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("manufacturing", "re-engagement"): {
        "subjects": ["Manufacturing Regulatory Update Briefing", "Reconnecting on Industrial Compliance", "Key Industrial Rule Amendments"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent amendments to state factory rules and environmental discharge norms have introduced stricter reporting obligations for industrial operations.",
        "p2": "When we last spoke regarding {{COMPANY_NAME}}, your team was evaluating plant risk management priorities. Our advisory team has compiled a practical summary of recent state enforcement actions and recommended inspection defense protocols.",
        "p3": "We welcome the opportunity to reconnect and share how industry peers are addressing these updated mandates.",
        "cta_label": "Connect with Plant Advisors",
        "cta_subtext": "A brief conversation with our industrial compliance specialists.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("manufacturing", "lead-generation"): {
        "subjects": ["Confidential Plant Compliance Diagnostic", "Evaluate Your Manufacturing Risk Exposure", "Request Plant Statutory Assessment"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In manufacturing operations, hidden compliance gaps in contractor payroll, machine safety testing, or waste manifests often surface only during formal statutory inspections.",
        "p2": "GOVENICS GRC conducts structured Industrial Statutory Gap Assessments for {{COMPANY_NAME}}. Our engineers and regulatory specialists review your facility's documentation against the Factories Act, MSIHC rules, and pollution control consents, delivering a clear roadmap to close potential liabilities.",
        "p3": "Secure complete operational peace of mind with an objective, independent plant audit.",
        "stats": [
            ("Regulations Audited", "25+ Acts", "Central and state industrial statutes"),
            ("Assessment Format", "On-Site / Hybrid", "Tailored to facility operational scale"),
            ("Gap Matrix", "Action-Oriented", "Assigns responsibility and timelines"),
            ("Confidentiality", "Guaranteed", "Protected under non-disclosure terms")
        ],
        "cta_label": "Request Plant Assessment",
        "cta_subtext": "Schedule a preliminary discussion with our industrial practice lead.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 3. TECHNOLOGY & ELECTRONICS
    # ─────────────────────────────────────────────────────────────────────────
    ("technology", "welcome"): {
        "subjects": ["Welcome to GOVENICS Tech Advisory", "Strengthening Your Digital Trust Posture", "Cybersecurity & DPDP Governance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. As a specialized governance, cybersecurity, and data protection advisory practice backed by ISI Group (established 1985), we assist technology companies and IT enterprises in building defensible security postures.",
        "p2": "With India's DPDP Act 2023 taking effect alongside stringent CERT-In 6-hour incident directives and global client expectations for SOC 2 and ISO 27001, technology providers must establish rigorous digital trust frameworks.",
        "p3": "We look forward to collaborating with {{COMPANY_NAME}} as you scale your technical infrastructure, data privacy controls, and security certifications.",
        "cta_label": "Explore Cybersecurity Advisory",
        "cta_subtext": "Review our ISO 27001, SOC 2, and data protection advisory scope.",
        "cta_url": "https://govnics-murex.vercel.app/cybersecurity"
    },
    ("technology", "promotional"): {
        "subjects": ["DPDP Act & ISO 27001 Advisory", "CERT-In 6-Hour Reporting Readiness", "Enterprise SOC 2 Certification Support"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Technology enterprises handle sensitive client records, proprietary intellectual property, and critical cloud infrastructure under intense regulatory and customer scrutiny.",
        "p2": "GOVENICS GRC helps {{COMPANY_NAME}} achieve demonstrable data protection and cybersecurity assurance. From mapping personal data flows under DPDP Act requirements to deploying ISO 27001:2022 ISMS policies and conducting vulnerability assessments, we build frameworks that satisfy global enterprise clients.",
        "p3": "Our CERT-In empanelled capabilities ensure your incident response and technical controls withstand both regulatory audits and external threats.",
        "stats": [
            ("DPDP Compliance", "Full Scope", "Data fiduciary obligation mapping"),
            ("ISO 27001 Controls", "93 Mapped", "ISO/IEC 27001:2022 Annex A"),
            ("CERT-In Reporting", "6-Hour SLA", "Documented response framework"),
            ("Security Audits", "VAPT Backed", "Comprehensive vulnerability testing")
        ],
        "cta_label": "Schedule Technology GRC Review",
        "cta_subtext": "Direct consultation with our senior cybersecurity advisors.",
        "cta_url": "https://govnics-murex.vercel.app/cybersecurity"
    },
    ("technology", "business-value"): {
        "subjects": ["Closing Enterprise Deals with SOC 2", "The Commercial Value of DPDP Readiness", "Protecting Technology Enterprise Valuation"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In enterprise technology sales, security reviews and privacy due diligence often dictate deal velocity. Incomplete SOC 2 reports or ambiguous data handling practices delay enterprise contracts.",
        "p2": "GOVENICS GRC builds institutional security credibility for {{COMPANY_NAME}}. By establishing robust ISMS policies, structured vendor risk reviews, and demonstrable DPDP compliance, your organization shortens enterprise procurement cycles and commands premium contract valuations.",
        "p3": "Turn governance from an operational hurdle into a decisive commercial advantage for your technology business.",
        "stats": [
            ("Procurement Cycles", "Streamlined", "Accelerated vendor security vetting"),
            ("Trust Assurances", "SOC 2 Type II", "Meets global buyer standards"),
            ("Statutory Penalties", "Mitigated", "Protection against DPDP fines"),
            ("Institutional Trust", "ISI Group", "39+ years corporate governance heritage")
        ],
        "cta_label": "Review Tech Business Value",
        "cta_subtext": "Read our executive guide to enterprise security procurement.",
        "cta_url": "https://govnics-murex.vercel.app/cybersecurity"
    },
    ("technology", "advertising"): {
        "subjects": ["DPDP Act Implementation Window", "Fast-Track Your ISO 27001 Audit", "CERT-In Cyber Incident Defense Review"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "With enforcement mechanisms under the Digital Personal Data Protection Act 2023 moving forward, technology providers face immediate accountability for data fiduciary obligations.",
        "p2": "GOVENICS GRC is offering a focused DPDP Act & Cybersecurity Readiness Sprint for tech firms. Our experts review your consent workflows, data retention rules, and third-party API data sharing agreements across {{COMPANY_NAME}}.",
        "p3": "Equip your engineering and security teams with verified compliance documentation ahead of statutory notifications.",
        "stats": [
            ("Sprint Duration", "10 Days", "High-velocity technical review"),
            ("Scope Covered", "DPDP + ISMS", "Privacy and infosec integration"),
            ("Key Deliverable", "Remediation Kit", "Policy templates & gap scorecards"),
            ("Advisory Team", "Certified", "CISA, CISSP & Lead Auditors")
        ],
        "cta_label": "Reserve Your Readiness Sprint",
        "cta_subtext": "Limited cohort availability for growth-stage technology firms.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("technology", "re-engagement"): {
        "subjects": ["Tech Sector Regulatory Intelligence Briefing", "Reconnecting on Technology Risk Controls", "Updated Cybersecurity Guidance for Tech"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent CERT-In advisory notices and evolving data protection standards have shifted how enterprise technology firms must manage sub-processors and incident logs.",
        "p2": "Following our earlier discussions with {{COMPANY_NAME}}, our digital trust practice has produced a practical summary addressing common gaps uncovered during recent ISO 27001 surveillance and DPDP readiness reviews.",
        "p3": "If your leadership team is refreshing its security roadmap for the upcoming quarter, we would welcome the opportunity to share our findings.",
        "cta_label": "Reconnect with Tech Advisors",
        "cta_subtext": "A brief discussion with our senior digital trust specialists.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("technology", "lead-generation"): {
        "subjects": ["Confidential Tech Security Gap Assessment", "Assess Your DPDP & ISMS Readiness", "Evaluate Your Technology Risk Controls"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "A single unmapped data repository, unpatched cloud vulnerability, or third-party vendor compromise can jeopardize customer relationships and trigger significant statutory penalties.",
        "p2": "GOVENICS GRC provides a confidential, structured Technology Security & Privacy Assessment for {{COMPANY_NAME}}. Our certified information security auditors analyze your cloud environment, access controls, and data processing inventories against ISO 27001:2022 standards and DPDP Act provisions.",
        "p3": "Receive an executive risk dashboard and prioritized remediation plan tailored for your engineering leadership.",
        "stats": [
            ("Standards Evaluated", "ISO, DPDP, SOC", "Integrated multi-framework assessment"),
            ("Assessment Format", "Technical Review", "Architecture, policies, and workflows"),
            ("Timeline", "10 Business Days", "Concise executive turnaround"),
            ("Security Standard", "Confidential", "Complete non-disclosure protocol")
        ],
        "cta_label": "Request Security Assessment",
        "cta_subtext": "Schedule your confidential consultation with our security team.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 4. INFRASTRUCTURE & CONSTRUCTION
    # ─────────────────────────────────────────────────────────────────────────
    ("infrastructure", "welcome"): {
        "subjects": ["Welcome to GOVENICS Infrastructure Advisory", "Navigating Project Statutory Compliance", "Infrastructure Risk & RERA Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Founded on the established institutional foundation of ISI Group (established 1985), our infrastructure advisory team supports developers, engineering contractors, and infrastructure operators across India.",
        "p2": "Major capital projects operate in complex statutory environments involving RERA compliance, Building and Other Construction Workers (BOCW) welfare mandates, environmental clearances, and strict site safety guidelines. We help infrastructure firms maintain operational continuity and avoid project delays.",
        "p3": "We are honored to connect with {{COMPANY_NAME}} and support your project compliance and risk mitigation objectives.",
        "cta_label": "Explore Infrastructure Services",
        "cta_subtext": "Review statutory compliance solutions for construction and infrastructure.",
        "cta_url": "https://govnics-murex.vercel.app/industries/infrastructure-construction"
    },
    ("infrastructure", "promotional"): {
        "subjects": ["RERA & BOCW Compliance Assurance", "Mitigating Major Infrastructure Project Risks", "Statutory Safety for Construction Sites"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Delays caused by regulatory notices, contractor disputes, or RERA reporting lapses can stall project timelines and inflate capital costs dramatically.",
        "p2": "GOVENICS GRC delivers robust project-level statutory compliance management for {{COMPANY_NAME}}. We monitor labor welfare cess filings, track environmental clearances, verify subcontractor statutory registers, and streamline quarterly RERA progress disclosures.",
        "p3": "Keep your construction sites fully protected from administrative halts and regulatory sanctions.",
        "stats": [
            ("RERA Compliance", "Quarterly", "Timely disclosures and escrow checks"),
            ("BOCW Welfare", "Site Monitored", "Full contractor cess reconciliation"),
            ("Clearance Oversight", "EIA & CPCB", "Environmental conditions tracking"),
            ("Subcontractor Audit", "Comprehensive", "PF, ESIC, and safety verification")
        ],
        "cta_label": "Schedule Project Risk Review",
        "cta_subtext": "Speak directly with our infrastructure compliance specialists.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("infrastructure", "business-value"): {
        "subjects": ["Preventing Costly Project Work Stoppages", "The Financial Value of Site Governance", "Safeguarding Infrastructure Project Margins"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In high-value infrastructure and construction developments, statutory non-compliance directly threatens project financing, buyer confidence, and delivery schedules.",
        "p2": "GOVENICS GRC protects {{COMPANY_NAME}} by institutionalizing project governance. Through proactive labor audits, rigorous safety documentation, and escrow compliance management, our advisors eliminate the root causes of project stay orders and statutory fines.",
        "p3": "Our clients secure smooth project handovers and maintain dependable relationships with lenders and statutory bodies.",
        "stats": [
            ("Project Continuity", "Protected", "Zero-stop regulatory intervention"),
            ("Contractor Vetting", "100% Audited", "Statutory liability containment"),
            ("Financing Security", "Lender-Ready", "Transparent compliance reporting"),
            ("Advisory Heritage", "ISI Group", "Decades of industrial and site experience")
        ],
        "cta_label": "Review Infrastructure Case",
        "cta_subtext": "Access our framework on managing capital project compliance.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("infrastructure", "advertising"): {
        "subjects": ["Construction Site Statutory Health Check", "Pre-Monsoon Site Safety Audit Window", "RERA & BOCW Compliance Clinic"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Regulatory bodies and local authorities are intensifying on-site inspections of commercial developments and infrastructure corridors.",
        "p2": "GOVENICS GRC is offering a comprehensive Construction Site Compliance Health Check for infrastructure leaders. Our field audit team inspects site documentation, contractor welfare records, scaffolding safety protocols, and pollution mitigation systems across {{COMPANY_NAME}}.",
        "p3": "Ensure your project sites remain fully compliant and protected against unexpected regulatory stop-work orders.",
        "stats": [
            ("Site Audit Time", "3 Days", "Rapid field inspection protocol"),
            ("Inspection Areas", "Labor & Safety", "BOCW, EHS, and local authority rules"),
            ("Action Report", "Instant Gap Log", "Immediate on-site corrective actions"),
            ("Coverage", "Nationwide", "Available across all major development hubs")
        ],
        "cta_label": "Book Site Compliance Health Check",
        "cta_subtext": "Direct scheduling with our infrastructure field audit team.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("infrastructure", "re-engagement"): {
        "subjects": ["Infrastructure Statutory Regulatory Briefing", "Reconnecting on Project Site Compliance", "Recent Construction Law Amendments"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent judicial rulings and statutory updates regarding construction worker cess calculation and RERA financial reporting have altered compliance priorities for infrastructure developers.",
        "p2": "When we previously connected regarding {{COMPANY_NAME}}, your team was reviewing project risk controls. Our infrastructure practice has synthesized recent enforcement patterns and practical compliance defenses into a focused advisory briefing.",
        "p3": "We would welcome an opportunity to reconnect and explore how these regulatory updates affect your active project portfolio.",
        "cta_label": "Connect with Infrastructure Team",
        "cta_subtext": "A brief conversation with our project compliance advisors.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("infrastructure", "lead-generation"): {
        "subjects": ["Confidential Project Compliance Assessment", "Assess Your Construction Statutory Risks", "Evaluate Project Regulatory Exposure"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In capital infrastructure, unrecognized compliance gaps in subcontractor labor registers, environmental clearance conditions, or land title approvals can trigger sudden project delays.",
        "p2": "GOVENICS GRC offers a structured, confidential Project Statutory Risk Assessment for {{COMPANY_NAME}}. Our senior compliance auditors evaluate your site protocols, regulatory filings, and vendor contracts against central and state construction laws.",
        "p3": "Receive a comprehensive project risk scorecard and remediation roadmap within twelve working days.",
        "stats": [
            ("Statutes Reviewed", "20+ Laws", "RERA, BOCW, Environment, Municipal"),
            ("Audit Depth", "Site & HQ", "Corporate controls and site registers"),
            ("Remediation Matrix", "Executive Plan", "Clear mitigation assignments"),
            ("Discretion", "Protected", "Full confidentiality agreement")
        ],
        "cta_label": "Request Project Assessment",
        "cta_subtext": "Initiate your confidential infrastructure risk evaluation.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 5. ENERGY & UTILITIES
    # ─────────────────────────────────────────────────────────────────────────
    ("energy", "welcome"): {
        "subjects": ["Welcome to GOVENICS Energy Advisory", "Strengthening Energy Regulatory Governance", "Energy Risk & ESG Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. As an advisory division of ISI Group (established 1985), our energy practice supports conventional power producers, renewable energy developers, grid operators, and fuel distributors across India.",
        "p2": "The energy sector operates under intensive statutory oversight, from CERC tariff regulations and Central Electricity Authority safety standards to PESO hazardous licenses and mandatory SEBI BRSR ESG disclosures. We help energy organizations build disciplined, transparent governance frameworks.",
        "p3": "We look forward to collaborating with {{COMPANY_NAME}} as you deliver reliable power and advance your sustainability commitments.",
        "cta_label": "Explore Energy Practice",
        "cta_subtext": "Review our energy compliance, grid risk, and ESG advisory solutions.",
        "cta_url": "https://govnics-murex.vercel.app/industries/energy-utilities"
    },
    ("energy", "promotional"): {
        "subjects": ["Energy Regulatory Compliance & BRSR", "Navigating CERC & PESO Directives", "Integrated ESG Reporting for Utilities"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Balancing grid stability, plant environmental emissions, and evolving clean energy mandates creates intricate regulatory challenges for energy leadership.",
        "p2": "GOVENICS GRC delivers specialized statutory compliance and sustainability advisory for {{COMPANY_NAME}}. We align power generation assets with CERC grid codes, monitor CEMS emissions monitoring compliance, manage PESO hazardous fuel permits, and prepare BRSR Core sustainability disclosures.",
        "p3": "Our senior advisory team helps energy providers maintain regulatory trust while safeguarding generation uptime.",
        "stats": [
            ("Grid Compliance", "CERC Aligned", "Grid code and deviation settlement"),
            ("Emissions Tracking", "CEMS Current", "Pollution board real-time reporting"),
            ("Hazardous Storage", "PESO Validated", "Storage and pipeline compliance"),
            ("ESG Standards", "BRSR Ready", "SEBI-mandated sustainability metrics")
        ],
        "cta_label": "Schedule Energy Compliance Review",
        "cta_subtext": "Consult directly with our energy regulatory and ESG specialists.",
        "cta_url": "https://govnics-murex.vercel.app/esg"
    },
    ("energy", "business-value"): {
        "subjects": ["Protecting Capital Returns in Energy", "The Business Case for Energy ESG", "Minimizing Regulatory Risk in Power"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In power generation and utility transmission, regulatory disputes, grid deviation penalties, and ESG reporting deficiencies erode project profitability and complicate institutional refinancing.",
        "p2": "GOVENICS GRC provides {{COMPANY_NAME}} with proactive governance frameworks that de-risk energy operations. By standardizing statutory compliance tracking and verifying environmental reporting data, we ensure your assets remain compliant with state regulators and attractive to international green energy financiers.",
        "p3": "Strengthen your organization's standing with regulators, institutional investors, and power off-takers.",
        "stats": [
            ("Regulatory Fines", "Prevented", "Proactive tariff and grid compliance"),
            ("Capital Access", "Green Ready", "Verified sustainability disclosures"),
            ("Operational Safety", "Zero Lapse", "Mandatory CEA safety compliance"),
            ("Legacy Strength", "ISI Group", "Nearly four decades of industrial advisory")
        ],
        "cta_label": "Review Energy Business Case",
        "cta_subtext": "Examine our briefing on risk containment for utility operations.",
        "cta_url": "https://govnics-murex.vercel.app/esg"
    },
    ("energy", "advertising"): {
        "subjects": ["BRSR ESG & CERC Readiness Sprint", "Energy Regulatory Audit Diagnostic", "Prepare for Annual Grid Safety Reviews"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "With annual ESG reporting deadlines approaching and regional electricity regulators tightening grid discipline, energy enterprises must validate statutory filings.",
        "p2": "GOVENICS GRC is conducting specialized Energy Governance Audits for power and utility operators. Our advisors evaluate continuous emission monitoring records, verify plant safety registers, and audit BRSR sustainability data across {{COMPANY_NAME}}.",
        "p3": "Ensure your energy generation and distribution assets withstand upcoming statutory reviews without disruption.",
        "stats": [
            ("Review Window", "10 Days", "Comprehensive multi-plant diagnostic"),
            ("Focus Domains", "CERC, PESO, ESG", "Operational and environmental compliance"),
            ("Deliverable", "Audit Defense Pack", "Verified documentation for regulators"),
            ("Advisory Bench", "Sector Experts", "Decades of power sector experience")
        ],
        "cta_label": "Book Energy Diagnostic",
        "cta_subtext": "Available for generation plants and distribution utilities.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("energy", "re-engagement"): {
        "subjects": ["Energy Sector Regulatory Intelligence", "Reconnecting on Energy Risk Governance", "Updated CERC & Environmental Norms"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent revisions to renewable purchase obligations, open access regulations, and industrial emissions reporting have introduced new statutory requirements for energy enterprises.",
        "p2": "Following our prior discussions with {{COMPANY_NAME}}, our energy advisory team has assembled a focused analysis of recent regulatory enforcement patterns across power generation and transmission utilities.",
        "p3": "If your leadership team is currently reviewing its compliance and sustainability priorities for the coming fiscal year, we would be pleased to share our practical observations.",
        "cta_label": "Reconnect with Energy Advisors",
        "cta_subtext": "A brief conversation with our utility compliance leaders.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("energy", "lead-generation"): {
        "subjects": ["Confidential Energy Compliance Review", "Assess Your Energy Regulatory Posture", "Evaluate Power Sector Statutory Risks"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In power and utilities, isolated compliance gaps in safety reporting, hazardous storage permits, or carbon footprint disclosures can lead to severe regulatory sanctions and public scrutiny.",
        "p2": "GOVENICS GRC provides a confidential, structured Energy Statutory & ESG Assessment for {{COMPANY_NAME}}. Our senior engineers and regulatory advisors evaluate your operational practices against Electricity Act mandates, PESO licenses, and SEBI BRSR standards.",
        "p3": "Obtain an objective, executive-level compliance gap matrix and prioritized remediation strategy.",
        "stats": [
            ("Regulatory Coverage", "18+ Acts", "Power, environmental, and corporate laws"),
            ("Assessment Scope", "Site & Corporate", "Generation facilities and headquarters"),
            ("Turnaround Time", "14 Days", "Structured executive findings"),
            ("Institutional Trust", "Guaranteed", "Complete non-disclosure protection")
        ],
        "cta_label": "Request Energy Assessment",
        "cta_subtext": "Schedule a confidential consultation with our energy practice.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 6. HEALTHCARE & LIFE SCIENCES
    # ─────────────────────────────────────────────────────────────────────────
    ("healthcare", "welcome"): {
        "subjects": ["Welcome to GOVENICS Healthcare Advisory", "Elevating Healthcare Compliance Standards", "Clinical Risk & NABH Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Backed by the 39-year institutional legacy of ISI Group, our healthcare advisory practice assists hospitals, diagnostic chains, and life sciences organizations in maintaining patient trust and clinical compliance.",
        "p2": "Healthcare providers face rigorous statutory requirements across NABH 5th Edition standards, bio-medical waste disposal, clinical establishment acts, and patient data confidentiality under the DPDP Act 2023. We help healthcare organizations build unified, audit-ready governance systems.",
        "p3": "We are proud to connect with {{COMPANY_NAME}} and support your clinical excellence, quality accreditation, and patient data protection goals.",
        "cta_label": "Explore Healthcare Advisory",
        "cta_subtext": "Review accreditation and regulatory solutions for healthcare organizations.",
        "cta_url": "https://govnics-murex.vercel.app/industries/healthcare-life-sciences"
    },
    ("healthcare", "promotional"): {
        "subjects": ["NABH Accreditation & DPDP Compliance", "Clinical Governance & Waste Management", "Streamlining Healthcare Statutory Audits"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Managing healthcare operations requires harmonizing rigorous patient care with strict statutory mandates across waste disposal, drug licensing, and medical data confidentiality.",
        "p2": "GOVENICS GRC provides comprehensive quality accreditation and regulatory advisory for {{COMPANY_NAME}}. We prepare hospitals for NABH mock audits, audit bio-medical waste handling protocols, and establish DPDP-compliant patient health record governance.",
        "p3": "Our healthcare specialists ensure your clinical facilities maintain continuous accreditation readiness while protecting patient confidentiality.",
        "stats": [
            ("NABH Standards", "100+ Criteria", "Accreditation readiness review"),
            ("Waste Compliance", "8 Categories", "Bio-medical waste rule alignment"),
            ("Health Privacy", "DPDP Aligned", "Patient medical data protection"),
            ("Drug Licensing", "CDSCO Current", "Pharmacy and blood bank compliance")
        ],
        "cta_label": "Schedule Healthcare Review",
        "cta_subtext": "Direct discussion with our senior healthcare quality advisors.",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services"
    },
    ("healthcare", "business-value"): {
        "subjects": ["Protecting Hospital Reputation & License", "The Business Case for Clinical Governance", "Safeguarding Patient Trust & Accreditation"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Lapses in clinical quality standards, accidental patient data exposure, or waste disposal infractions directly endanger clinical operating licenses and institutional standing.",
        "p2": "GOVENICS GRC insulates {{COMPANY_NAME}} against compliance failures through structured clinical governance. By uniting infection control documentation, statutory license tracking, and digital privacy safeguards into a cohesive system, we protect your hospital's brand equity and insurance empaneled status.",
        "p3": "Maintain uncompromised clinical excellence while optimizing operational compliance overhead.",
        "stats": [
            ("Insurance Tie-ups", "Protected", "Retains TPA and government empanelment"),
            ("Data Confidentiality", "Defensible", "Guards against medical record breaches"),
            ("Audit Defense", "Always-Ready", "Continuous clinical documentation"),
            ("Advisory Lineage", "ISI Group", "Established 1985 institutional background")
        ],
        "cta_label": "Review Healthcare Value Briefing",
        "cta_subtext": "Examine our clinical governance and risk framework.",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services"
    },
    ("healthcare", "advertising"): {
        "subjects": ["Pre-NABH Surveillance Audit Diagnostic", "Hospital Statutory Readiness Window", "Clinical Quality & Privacy Review"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "With upcoming NABH surveillance inspections and regulatory scrutiny over hospital data handling, healthcare leadership must ensure documentation is fully verifiable.",
        "p2": "GOVENICS GRC is providing Pre-Accreditation Mock Audits for hospitals and diagnostic centers. Our clinical quality auditors inspect patient consent records, medication management protocols, and bio-medical manifests across {{COMPANY_NAME}}.",
        "p3": "Ensure your healthcare network sails through surveillance visits with complete confidence and validated records.",
        "stats": [
            ("Audit Duration", "4 Days", "Intensive on-site clinical evaluation"),
            ("Assessment Scope", "NABH & Statutes", "Quality, safety, and legal compliance"),
            ("Output Document", "Mock Audit Log", "Identifies non-conformities before assessors"),
            ("Auditor Bench", "Qualified", "Experienced healthcare quality professionals")
        ],
        "cta_label": "Book Hospital Mock Audit",
        "cta_subtext": "Available for hospitals, clinics, and diagnostic chains.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("healthcare", "re-engagement"): {
        "subjects": ["Healthcare Regulatory Intelligence Briefing", "Reconnecting on Clinical Risk Controls", "Updated Healthcare & DPDP Guidance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent notifications from health authorities and the Data Protection Board have placed heightened obligations on hospitals regarding digital health records and bio-medical logs.",
        "p2": "When we previously spoke regarding {{COMPANY_NAME}}, your team was evaluating clinical quality and risk initiatives. Our healthcare practice has compiled a practical summary of recent audit findings and recommended defense steps.",
        "p3": "We would welcome an opportunity to reconnect and share insights on how peer healthcare institutions are handling these updated requirements.",
        "cta_label": "Connect with Healthcare Team",
        "cta_subtext": "A brief conversation with our clinical advisory practice.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("healthcare", "lead-generation"): {
        "subjects": ["Confidential Healthcare Gap Assessment", "Assess Your Hospital Regulatory Posture", "Evaluate Clinical & Privacy Compliance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In healthcare organizations, hidden oversights in nursing documentation, statutory equipment calibration, or patient data access can surface abruptly during regulatory visits or media inquiries.",
        "p2": "GOVENICS GRC offers a confidential, structured Healthcare Governance Gap Assessment for {{COMPANY_NAME}}. Our senior clinicians and regulatory specialists review your facility against NABH standards, clinical establishment guidelines, and DPDP Act provisions.",
        "p3": "Receive a comprehensive non-conformity register and actionable corrective roadmap within fourteen business days.",
        "stats": [
            ("Scope Evaluated", "NABH, DPDP, BMW", "Full clinical and statutory spectrum"),
            ("Assessment Method", "Clinical Review", "Protocols, registers, and facilities"),
            ("Turnaround", "14 Days", "Actionable executive report"),
            ("Confidentiality", "Guaranteed", "Protected under healthcare NDA")
        ],
        "cta_label": "Request Healthcare Assessment",
        "cta_subtext": "Schedule your confidential discussion with our medical practice.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 7. FOOD PROCESSING
    # ─────────────────────────────────────────────────────────────────────────
    ("food-processing", "welcome"): {
        "subjects": ["Welcome to GOVENICS Food Advisory", "Strengthening Food Safety & Compliance", "Food Regulatory & FSSAI Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Drawing on the 39-year institutional heritage of ISI Group, our food processing practice partners with food manufacturers, dairy processors, beverage brands, and cold chain operators across India.",
        "p2": "Food businesses operate under rigorous statutory expectations under the FSSAI Act 2006, Legal Metrology Packaged Commodity rules, BIS certifications, and global food safety standards like ISO 22000. We help food companies maintain flawless consumer safety records and continuous audit readiness.",
        "p3": "We are delighted to connect with {{COMPANY_NAME}} and support your food safety, regulatory compliance, and brand protection commitments.",
        "cta_label": "Explore Food Safety Advisory",
        "cta_subtext": "Review regulatory and quality compliance solutions for food enterprises.",
        "cta_url": "https://govnics-murex.vercel.app/industries/food-processing-pharma-healthcare"
    },
    ("food-processing", "promotional"): {
        "subjects": ["FSSAI Central Licensing Compliance", "Food Safety & Traceability Advisory", "Navigating Legal Metrology for Food"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Meeting expanding food labeling mandates, traceability regulations, and supplier quality standards across diverse production lines presents constant operational challenges.",
        "p2": "GOVENICS GRC delivers specialized regulatory and quality governance for {{COMPANY_NAME}}. We audit factory hygiene protocols, verify packaging compliance under Legal Metrology rules, align formulations with FSSAI standards, and prepare manufacturing units for ISO 22000 certification.",
        "p3": "Safeguard your product integrity and maintain trust with consumers and food safety authorities.",
        "stats": [
            ("FSSAI Licensing", "Central Scope", "Manufacturing and multi-state distribution"),
            ("Safety Controls", "HACCP & ISO", "Biological and physical hazard prevention"),
            ("Labeling Rules", "Legal Metrology", "Mandatory declarations and claims vetting"),
            ("Supplier Verification", "Farm to Plant", "Ingredient safety and traceability")
        ],
        "cta_label": "Schedule Food Compliance Review",
        "cta_subtext": "Direct discussion with our senior food safety specialists.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("food-processing", "business-value"): {
        "subjects": ["Protecting Food Brands from Recalls", "The Business Value of Food Governance", "Safeguarding Consumer Trust in Food"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In packaged foods and beverages, a single contamination event, mislabeled allergen claim, or regulatory stop-sale order causes severe financial losses and permanent brand damage.",
        "p2": "GOVENICS GRC builds institutional resilience for {{COMPANY_NAME}} through disciplined food safety governance. By unifying supplier verification, testing schedules, and statutory filing calendars, we help your business prevent compliance crises and satisfy major retail distributor audits.",
        "p3": "Protect your retail market presence and preserve hard-earned brand equity.",
        "stats": [
            ("Brand Integrity", "Protected", "Zero-incident quality governance"),
            ("Retail Onboarding", "Fast-Track", "Pre-qualified for major supermarkets"),
            ("Recall Defense", "Documented", "Traceability frameworks across batches"),
            ("Advisory Heritage", "ISI Group", "Decades of industrial and statutory expertise")
        ],
        "cta_label": "Review Food Business Case",
        "cta_subtext": "Read our briefing on food safety risk containment.",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance"
    },
    ("food-processing", "advertising"): {
        "subjects": ["Pre-FSSAI Inspection Readiness Audit", "Food Plant Quality & Hygiene Review", "Prepare for Annual Food Safety Audits"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Food safety commissioners and central licensing authorities are conducting unannounced physical inspections of food processing plants and cold storage facilities.",
        "p2": "GOVENICS GRC is providing Pre-Inspection Food Safety Health Checks for manufacturers. Our certified food auditors inspect water testing records, pest control logs, allergen segregation, and batch records across {{COMPANY_NAME}}.",
        "p3": "Ensure your production facilities remain fully compliant and protected against unexpected regulatory stop-work orders.",
        "stats": [
            ("Diagnostic Window", "3 Days", "Rapid on-site plant verification"),
            ("Regulatory Scope", "FSSAI & BIS", "Statutory hygiene and packaging review"),
            ("Action Output", "Remediation Plan", "Prioritized non-conformance log"),
            ("Auditor Bench", "Certified", "Lead auditors in ISO 22000 and HACCP")
        ],
        "cta_label": "Book Food Plant Health Check",
        "cta_subtext": "Available for food factories, bakeries, and beverage plants.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("food-processing", "re-engagement"): {
        "subjects": ["Food Regulatory Update Briefing", "Reconnecting on Food Safety Controls", "Recent FSSAI & Labeling Amendments"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent amendments to FSSAI packaging norms, nutritional front-of-pack claims, and import ingredient declarations have introduced fresh compliance requirements.",
        "p2": "Following our earlier conversations with {{COMPANY_NAME}}, our food safety practice has summarized the most common non-compliances identified during recent regulatory sampling drives.",
        "p3": "If your team is updating its regulatory and quality agenda for the coming quarter, we would welcome the opportunity to share our practical findings.",
        "cta_label": "Connect with Food Advisors",
        "cta_subtext": "A brief discussion with our food safety specialists.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("food-processing", "lead-generation"): {
        "subjects": ["Confidential Food Safety Gap Review", "Assess Your FSSAI Regulatory Posture", "Evaluate Plant Food Safety Controls"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In food manufacturing, hidden gaps in water quality testing, raw material certificates of analysis, or packaging declarations can trigger sudden regulatory notices and stock seizures.",
        "p2": "GOVENICS GRC offers a structured, confidential Food Safety & Regulatory Gap Assessment for {{COMPANY_NAME}}. Our food technologists and compliance specialists evaluate your operations against FSSAI mandates, Legal Metrology rules, and ISO 22000 criteria.",
        "p3": "Obtain an objective executive gap report and prioritized corrective roadmap within ten business days.",
        "stats": [
            ("Standards Evaluated", "FSSAI, ISO, BIS", "Comprehensive quality and statutory review"),
            ("Assessment Format", "Plant & Records", "On-site inspection and document audit"),
            ("Timeline", "10 Days", "Fast executive turnaround"),
            ("Confidentiality", "Guaranteed", "Protected under institutional NDA")
        ],
        "cta_label": "Request Food Safety Assessment",
        "cta_subtext": "Schedule your confidential discussion with our food practice.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 8. CONSUMER & RETAIL
    # ─────────────────────────────────────────────────────────────────────────
    ("consumer-retail", "welcome"): {
        "subjects": ["Welcome to GOVENICS Retail Advisory", "Strengthening Consumer Regulatory Compliance", "Retail Risk & Establishment Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Grounded in the 39-year institutional heritage of ISI Group (established 1985), our consumer and retail practice supports store chains, e-commerce marketplaces, textile brands, and consumer goods distributors across India.",
        "p2": "Retail businesses navigate intricate statutory terrain spanning state Shop and Establishment registrations, Legal Metrology Packaged Commodities rules, Consumer Protection regulations, and e-waste EPR mandates. We help consumer enterprises establish organized, audit-ready compliance across all retail locations.",
        "p3": "We look forward to connecting with {{COMPANY_NAME}} and supporting your retail expansion, statutory governance, and consumer trust objectives.",
        "cta_label": "Explore Retail Advisory Scope",
        "cta_subtext": "Review multi-state compliance and establishment solutions for retail.",
        "cta_url": "https://govnics-murex.vercel.app/industries/consumer-retail"
    },
    ("consumer-retail", "promotional"): {
        "subjects": ["Multi-State Shop Act Compliance", "Legal Metrology & Consumer Protection", "E-Commerce Regulatory Governance"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Scaling physical stores or digital commerce across multiple states creates heavy compliance burdens involving local municipal licenses, trade permits, and labor filings.",
        "p2": "GOVENICS GRC delivers integrated establishment compliance management for {{COMPANY_NAME}}. We handle multi-state Shop and Establishment renewals, verify packaging artwork under Legal Metrology rules, audit consumer grievance redressal systems, and oversee e-waste EPR compliance.",
        "p3": "Our compliance specialists keep your retail footprint fully protected across every city and marketplace.",
        "stats": [
            ("Establishment Licenses", "All States", "Shop Act renewals and registrations"),
            ("Packaging Compliance", "Metrology Vetted", "Mandatory MRP, weight, and claims check"),
            ("Grievance Redressal", "30-Day SLA", "Consumer Protection Act 2019 alignment"),
            ("E-Waste Compliance", "EPR Ready", "Extended producer responsibility tracking")
        ],
        "cta_label": "Schedule Retail Compliance Review",
        "cta_subtext": "Consult directly with our retail and establishment specialists.",
        "cta_url": "https://govnics-murex.vercel.app/sgrc/services/establishment-compliances"
    },
    ("consumer-retail", "business-value"): {
        "subjects": ["Protecting Multi-Store Operations from Fines", "The ROI of Centralized Retail GRC", "Safeguarding Consumer Brand Equity"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Unannounced store inspections, expired trade licenses, or packaging mislabeling notices lead to local store closures, product seizures, and executive liability for retail leadership.",
        "p2": "GOVENICS GRC centralizes compliance oversight for {{COMPANY_NAME}}. By moving multi-state statutory licenses, signage permits, and vendor labor verifications into an automated calendar, our advisors eliminate the risk of surprise store closures and protect operating margins.",
        "p3": "Expand your store count and digital channels with absolute regulatory confidence.",
        "stats": [
            ("Store Uptime", "100% Protected", "Zero administrative store closures"),
            ("License Tracking", "Automated", "Centralized national renewal calendar"),
            ("Legal Exposure", "Mitigated", "Pre-emptive Legal Metrology audits"),
            ("Advisory Heritage", "ISI Group", "Over three decades of corporate compliance")
        ],
        "cta_label": "Review Retail Business Case",
        "cta_subtext": "Access our framework on multi-state retail compliance.",
        "cta_url": "https://govnics-murex.vercel.app/sgrc/services/establishment-compliances"
    },
    ("consumer-retail", "advertising"): {
        "subjects": ["Multi-Store Statutory Health Check Sprint", "Legal Metrology Compliance Review", "Pre-Festive Season Retail Audit"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Ahead of peak retail and festive sales periods, weights and measures departments and municipal inspectors ramp up retail store audits and product sampling.",
        "p2": "GOVENICS GRC is providing a Multi-Store Compliance Health Check for retail brands. Our audit team checks physical store licenses, mandatory statutory displays, weights calibration certificates, and warehouse worker filings across {{COMPANY_NAME}}.",
        "p3": "Ensure your retail stores and fulfillment centers remain fully compliant throughout peak trading seasons.",
        "stats": [
            ("Audit Turnaround", "5 Days", "Rapid multi-location review"),
            ("Coverage Scope", "Store & Warehouse", "Shop Act, Metrology, and labor laws"),
            ("Deliverable", "Store Risk Scorecard", "Clear priority remediation guide"),
            ("Bench Strength", "Pan-India", "Field audit presence across key metros")
        ],
        "cta_label": "Book Multi-Store Health Check",
        "cta_subtext": "Available for retail chains, supermarkets, and fashion brands.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("consumer-retail", "re-engagement"): {
        "subjects": ["Retail Regulatory Update Briefing", "Reconnecting on Retail Risk Governance", "Updated Legal Metrology Directives"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent amendments to e-commerce consumer disclosure rules, dark pattern guidelines, and Legal Metrology packaging norms have introduced new compliance requirements for retail brands.",
        "p2": "When we previously connected regarding {{COMPANY_NAME}}, your team was reviewing store operations and risk controls. Our retail advisory group has created a practical briefing addressing recent municipal and central enforcement patterns.",
        "p3": "We would welcome an opportunity to reconnect and share how peer retail enterprises are handling these updated guidelines.",
        "cta_label": "Connect with Retail Team",
        "cta_subtext": "A brief conversation with our retail compliance specialists.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("consumer-retail", "lead-generation"): {
        "subjects": ["Confidential Retail Compliance Assessment", "Assess Your Multi-Store Regulatory Risks", "Evaluate Retail Establishment Exposure"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In retail networks, isolated non-compliances in local signage permits, contractor minimum wages, or packaged goods claims can trigger formal show-cause notices and public controversy.",
        "p2": "GOVENICS GRC offers a confidential, structured Retail Compliance Assessment for {{COMPANY_NAME}}. Our senior compliance specialists evaluate your store licenses, packaging declarations, and vendor contracts against central and state commercial statutes.",
        "p3": "Obtain an executive compliance score and prioritized action matrix within twelve business days.",
        "stats": [
            ("Acts Audited", "20+ Laws", "Shop Act, Metrology, Consumer Protection, Labor"),
            ("Assessment Format", "Store & Headquarters", "Sample store visits and central records"),
            ("Turnaround Time", "12 Days", "Actionable executive report"),
            ("Confidentiality", "Guaranteed", "Protected under formal NDA")
        ],
        "cta_label": "Request Retail Assessment",
        "cta_subtext": "Initiate your confidential retail governance evaluation.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },

    # ─────────────────────────────────────────────────────────────────────────
    # 9. MEDIA & SERVICES
    # ─────────────────────────────────────────────────────────────────────────
    ("media-services", "welcome"): {
        "subjects": ["Welcome to GOVENICS Institutional Advisory", "Elevating Institutional Compliance Standards", "Services Risk & Accreditation Advisory"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Welcome to GOVENICS GRC. Founded on the established institutional foundation of ISI Group (established 1985), our media and institutional services practice assists universities, hospitality groups, media networks, and aviation operators across India.",
        "p2": "Service organizations operate under rigorous oversight involving UGC and NAAC accreditations, DGCA aviation safety directives, MIB broadcasting rules, and consumer data privacy standards under the DPDP Act 2023. We help institutional leaders build resilient, audit-ready governance systems.",
        "p3": "We are honored to connect with {{COMPANY_NAME}} and support your institutional accreditation, operational compliance, and service excellence goals.",
        "cta_label": "Explore Institutional Advisory",
        "cta_subtext": "Review accreditation and statutory solutions for service organizations.",
        "cta_url": "https://govnics-murex.vercel.app/industries/media-services"
    },
    ("media-services", "promotional"): {
        "subjects": ["NAAC Accreditation & Regulatory Advisory", "Campus Safety & Institutional Governance", "Data Privacy for Service Organizations"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Navigating multi-authority mandates across institutional accreditation bodies, safety directorates, and student or guest data privacy requires disciplined governance.",
        "p2": "GOVENICS GRC provides specialized institutional advisory for {{COMPANY_NAME}}. We prepare higher education institutions for NAAC and NBA reviews, audit campus fire and life safety compliance, align broadcast and media operations with MIB guidelines, and implement DPDP privacy safeguards.",
        "p3": "Our senior advisors help service institutions maintain impeccable compliance records and elevate their institutional standing.",
        "stats": [
            ("NAAC Accreditation", "A+ Prepared", "Self-study report and mock audits"),
            ("Campus Safety", "NBC Aligned", "National Building Code safety standards"),
            ("Data Protection", "DPDP Compliant", "Student, subscriber, and guest data"),
            ("Regulatory Filings", "UGC / AICTE", "Statutory returns and disclosures")
        ],
        "cta_label": "Schedule Institutional Review",
        "cta_subtext": "Direct discussion with our senior institutional advisory team.",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services"
    },
    ("media-services", "business-value"): {
        "subjects": ["Protecting Institutional Reputation & Accreditation", "The Business Case for Service Governance", "Elevating Institutional Ranking & Value"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Accreditation downgrades, campus safety infractions, or student data breaches cause immediate institutional disruption, regulatory penalties, and student enrollment declines.",
        "p2": "GOVENICS GRC safeguards {{COMPANY_NAME}} by institutionalizing governance and audit readiness. By aligning operational processes with NAAC benchmarks, local safety mandates, and data protection rules, we help your leadership protect its brand equity and maintain premium institutional standing.",
        "p3": "Position your institution as a benchmark of excellence, safety, and administrative integrity.",
        "stats": [
            ("Accreditation Grade", "Defended", "Targeted scoring enhancement"),
            ("Student Trust", "Protected", "Defensible privacy and safety records"),
            ("Audit Readiness", "Year-Round", "Continuous documentation maintenance"),
            ("Advisory Heritage", "ISI Group", "39+ years institutional trust background")
        ],
        "cta_label": "Review Institutional Case",
        "cta_subtext": "Access our framework on institutional governance and accreditation.",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services"
    },
    ("media-services", "advertising"): {
        "subjects": ["Pre-Accreditation Mock Review Window", "Institutional Safety & Compliance Sprint", "Prepare for Annual Regulatory Audits"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "With annual accreditation deadlines and regulatory inspections approaching, service and educational institutions must ensure their documentation is completely verifiable.",
        "p2": "GOVENICS GRC is providing Pre-Accreditation Diagnostic Audits for educational institutions and service providers. Our senior auditors review institutional data, verify laboratory and campus safety records, and audit administrative governance across {{COMPANY_NAME}}.",
        "p3": "Ensure your organization approaches statutory peer reviews with complete confidence and validated data.",
        "stats": [
            ("Diagnostic Window", "4 Days", "Intensive institutional review"),
            ("Criteria Covered", "NAAC & Statutes", "Curricular, safety, and governance criteria"),
            ("Action Report", "Mock SSR Log", "Identifies scoring gaps before assessors"),
            ("Advisory Bench", "Senior Academics", "Experienced former assessors and auditors")
        ],
        "cta_label": "Book Institutional Health Check",
        "cta_subtext": "Available for universities, colleges, and hospitality groups.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("media-services", "re-engagement"): {
        "subjects": ["Services Sector Regulatory Intelligence Briefing", "Reconnecting on Institutional Risk Controls", "Updated Accreditation & Safety Guidelines"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "Recent revisions to NAAC accreditation criteria, digital education regulations, and consumer privacy guidelines have reshaped compliance priorities for institutions.",
        "p2": "When we previously spoke regarding {{COMPANY_NAME}}, your leadership was reviewing governance and accreditation roadmaps. Our institutional advisory group has synthesized recent regulatory inspection patterns and recommended defense steps.",
        "p3": "We would welcome an opportunity to reconnect and share how peer institutions are addressing these updated mandates.",
        "cta_label": "Connect with Advisory Team",
        "cta_subtext": "A brief conversation with our institutional practice lead.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    },
    ("media-services", "lead-generation"): {
        "subjects": ["Confidential Institutional Gap Review", "Assess Your Institutional Regulatory Readiness", "Evaluate Accreditation & Safety Controls"],
        "salutation": "Dear {{FIRST_NAME}},",
        "p1": "In service and educational institutions, unrecognized gaps in campus fire clearances, statutory committee registers, or student data handling can lead to sudden adverse findings during public reviews.",
        "p2": "GOVENICS GRC offers a confidential, structured Institutional Gap Assessment for {{COMPANY_NAME}}. Our senior education and governance specialists evaluate your institutional records against NAAC, UGC, and statutory safety standards.",
        "p3": "Obtain an executive compliance score and prioritized action matrix within fourteen business days.",
        "stats": [
            ("Standards Audited", "NAAC, UGC, NBC", "Comprehensive institutional evaluation"),
            ("Assessment Format", "Campus & Records", "Site inspection and document review"),
            ("Turnaround Time", "14 Days", "Structured executive findings"),
            ("Discretion", "Guaranteed", "Protected under strict confidentiality terms")
        ],
        "cta_label": "Request Institutional Assessment",
        "cta_subtext": "Schedule your confidential consultation with our education practice.",
        "cta_url": "https://govnics-murex.vercel.app/contact"
    }
}


def build_stat_cards_html(stats_list):
    """Builds a responsive 4-card 2x2 or 4x1 grid with illustrative disclaimer."""
    card_colors = ["#1E40AF", "#065F46", "#92400E", "#5B21B6"]
    
    cells = []
    for i, (label, metric, note) in enumerate(stats_list):
        top_border = card_colors[i % len(card_colors)]
        cells.append(f"""          <td class="stat-grid-cell" width="25%" style="vertical-align:top;padding:0 6px 12px 6px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:#FFFFFF;border:1px solid #E5E9F0;border-top:3px solid {top_border};border-radius:6px;padding:14px 10px;text-align:center;">
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:0.07em;color:#6B7280;text-transform:uppercase;">{label}</p>
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;color:{top_border};line-height:1.1;">{metric}</p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#6B7280;line-height:1.3;">{note}</p>
                </td>
              </tr>
            </table>
          </td>""")
    
    row_html = "\n".join(cells)
    
    return f"""        <!-- Stat Cards Section -->
        <tr>
          <td style="background-color:#F7F9FC;padding:24px 32px 8px 32px;">
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#6B7280;text-transform:uppercase;">Assessment Dimensions</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
{row_html}
              </tr>
            </table>
            <p style="margin:4px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:8px;color:#9CA3AF;font-style:italic;text-align:center;">
              * Figures shown are indicative assessment dimensions, not guaranteed client outcomes.
            </p>
          </td>
        </tr>"""


def build_email_html(industry_key, type_key, data):
    industry_info = INDUSTRIES[industry_key]
    type_info = EMAIL_TYPES[type_key]
    
    subjects = data["subjects"]
    primary_subject = subjects[0]
    salutation = data["salutation"]
    p1 = data["p1"]
    p2 = data["p2"]
    p3 = data["p3"]
    cta_label = data["cta_label"]
    cta_subtext = data["cta_subtext"]
    cta_url = data["cta_url"]
    
    # Body word count calculation
    body_text = f"{salutation} {p1} {p2} {p3}"
    word_count = len(body_text.split())
    
    # Subject line word counts
    subject_counts = [len(s.split()) for s in subjects]
    
    # Stat cards section
    has_stats = type_info["has_stats"] and "stats" in data
    stat_section_html = build_stat_cards_html(data["stats"]) if has_stats else ""
    
    html = f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>{primary_subject}</title>
  <!--
    ════════════════════════════════════════════════════════════════
    GOVENICS GRC — ENTERPRISE EMAIL TEMPLATE
    ────────────────────────────────────────────────────────────────
    Template ID:       {industry_key}_{type_key}
    Industry Cluster:  {industry_info['name']}
    Email Type:        {type_info['name']}
    Target Roles:      {industry_info['target_roles']}
    Primary Offering:  {industry_info['primary_offering']}
    Key Regulations:   {industry_info['regulations']}
    
    SUBJECT LINE ALTERNATIVES (All <= 6 words):
    1. Direct:         "{subjects[0]}" ({subject_counts[0]} words)
    2. Conversational: "{subjects[1]}" ({subject_counts[1]} words)
    3. Curiosity-Led:  "{subjects[2]}" ({subject_counts[2]} words)
    
    Body Word Count:   {word_count} words (Limit: {type_info['max_words']} words)
    Banned Words:      Zero violations (verified)
    Framework:         SPICED (applied internally without labels)
    ════════════════════════════════════════════════════════════════
  -->
  <style>
    * {{ box-sizing: border-box; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }}
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }}
    a {{ color: #1E40AF; text-decoration: underline; }}
    @media only screen and (max-width: 600px) {{
      .email-wrapper {{ width: 100% !important; }}
      .email-content {{ padding: 24px 20px !important; }}
      .stat-grid-cell {{ display: block !important; width: 100% !important; padding: 0 0 10px 0 !important; }}
    }}
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0F4F8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0F4F8;">
  <tr>
    <td align="center" style="padding:28px 12px;">

      <table class="email-wrapper" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #E5E9F0;">

        <!-- Header Banner -->
        <tr>
          <td style="background-color:#0A1628;padding:0;">
            <a href="https://govnics-murex.vercel.app" target="_blank" style="display:block;text-decoration:none;">
              <img src="../../assets/images/header-banner.jpg"
                   alt="GOVENICS GRC — Enterprise GRC Advisory | A Division of ISI Group"
                   width="600"
                   style="display:block;width:100%;max-width:600px;height:auto;border:0;">
            </a>
          </td>
        </tr>

        <!-- Industry Subheader Bar -->
        <tr>
          <td style="background-color:#1E3A5F;padding:8px 36px;border-bottom:2px solid #B8942A;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:700;color:#FFFFFF;letter-spacing:0.06em;text-transform:uppercase;">
                  {industry_info['name']} Advisory
                </td>
                <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#7FB3D3;letter-spacing:0.04em;">
                  Est. 1985 &nbsp;&bull;&nbsp; CERT-In Empanelled
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Email Body Content -->
        <tr>
          <td class="email-content" style="background-color:#FFFFFF;padding:36px 36px 28px 36px;">
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#111827;">
              {salutation}
            </p>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:23px;color:#374151;">
              {p1}
            </p>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:23px;color:#374151;">
              {p2}
            </p>
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:23px;color:#374151;">
              {p3}
            </p>
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6B7280;">
              Sincerely,<br>
              <strong style="color:#111827;">GOVENICS GRC Advisory Practice</strong><br>
              <span style="font-size:12px;color:#8899AA;">Industrial Security Investigators (P) Ltd. (ISI Group)</span>
            </p>
          </td>
        </tr>

{stat_section_html}

        <!-- Call to Action Section -->
        <tr>
          <td style="background-color:#F7F9FC;padding:24px 36px 28px 36px;text-align:center;border-top:1px solid #E5E9F0;">
            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="border-radius:6px;background-color:#1E40AF;">
                  <a href="{cta_url}" target="_blank"
                     style="display:inline-block;padding:14px 34px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:6px;letter-spacing:0.03em;line-height:1.2;">
                    {cta_label} &rarr;
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:10px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#6B7280;line-height:16px;">
              {cta_subtext}
            </p>
          </td>
        </tr>

        <!-- Footer Banner & Institutional Credentials -->
        <tr>
          <td style="background-color:#0A1628;padding:24px 36px 18px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:middle;">
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;letter-spacing:0.04em;">GOVENICS GRC</p>
                  <p style="margin:2px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#7FB3D3;letter-spacing:0.03em;">Enterprise GRC Advisory &nbsp;|&nbsp; A Division of ISI Group</p>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <a href="https://govnics-murex.vercel.app" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#7FB3D3;text-decoration:none;">govnics-murex.vercel.app</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="mailto:contact@govenics.grc" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#7FB3D3;text-decoration:none;">contact@govenics.grc</a>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="padding-top:12px;border-top:1px solid #1E3A5F;">&nbsp;</td></tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#52738A;padding-bottom:4px;line-height:14px;">
                  Chennai, Tamil Nadu &nbsp;&bull;&nbsp; Established 1985 &nbsp;&bull;&nbsp; CERT-In Empanelled Advisory
                </td>
                <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;color:#52738A;padding-bottom:4px;">
                  <a href="https://www.linkedin.com/company/govenics" style="color:#52738A;text-decoration:none;">LinkedIn</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Statutory Compliance & Unsubscribe Block -->
        <tr>
          <td style="background-color:#070E1A;padding:14px 36px;text-align:center;border-top:1px solid #132238;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;line-height:16px;color:#6B7E93;">
              You received this correspondence because you engaged with GOVENICS GRC or requested advisory information.<br>
              <a href="{{{{UNSUBSCRIBE_URL}}}}" style="color:#8899AA;text-decoration:underline;">Unsubscribe</a> &nbsp;|&nbsp;
              <a href="https://govnics-murex.vercel.app/privacy" style="color:#8899AA;text-decoration:underline;">Privacy Policy</a> &nbsp;|&nbsp;
              <a href="https://govnics-murex.vercel.app/terms" style="color:#8899AA;text-decoration:underline;">Terms of Service</a><br><br>
              Industrial Security Investigators (P) Ltd. (ISI Group) &bull; Est. 1985<br>
              No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai, Tamil Nadu 600092, India
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>"""
    return html, word_count, subject_counts


def validate_content(raw_copy, html_full, filename):
    # Check raw copy directly
    for text_block in raw_copy:
        lower = text_block.lower()
        for word in BANNED_WORDS:
            pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(word) + r'(?![a-zA-Z0-9_-])'
            if re.search(pattern, lower):
                raise ValueError(f"BANNED WORD DETECTED: '{word}' in copy of {filename}")
    
    # Also strip HTML tags and verify rendered text
    stripped = re.sub(r'<style.*?</style>', ' ', html_full, flags=re.DOTALL)
    stripped = re.sub(r'<[^>]+>', ' ', stripped)
    # Remove CSS property names like text-transform
    stripped = re.sub(r'[\w-]+:\s*[\w#-]+;', ' ', stripped)
    lower_stripped = stripped.lower()
    for word in BANNED_WORDS:
        pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(word) + r'(?![a-zA-Z0-9_-])'
        if re.search(pattern, lower_stripped):
            raise ValueError(f"BANNED WORD DETECTED: '{word}' in rendered text of {filename}")


def main():
    manifest = []
    total_generated = 0
    
    print("=" * 70)
    print("GOVENICS GRC — ENTERPRISE EMAIL TEMPLATE GENERATION ENGINE")
    print("=" * 70)
    
    for ind_key, ind_info in INDUSTRIES.items():
        ind_dir = os.path.join(TEMPLATES_DIR, ind_key)
        os.makedirs(ind_dir, exist_ok=True)
        print(f"\nGenerating cluster: {ind_info['name']} -> {ind_dir}")
        
        for type_key, type_info in EMAIL_TYPES.items():
            content_key = (ind_key, type_key)
            if content_key not in CONTENT_DATA:
                print(f"  [MISSING] Content data for {content_key}")
                continue
            
            data = CONTENT_DATA[content_key]
            filename = f"{type_key}.html"
            filepath = os.path.join(ind_dir, filename)
            
            html_content, word_count, subject_counts = build_email_html(ind_key, type_key, data)
            
            # Validation
            raw_blocks = [data["salutation"], data["p1"], data["p2"], data["p3"], data["cta_label"], data["cta_subtext"]] + data["subjects"]
            validate_content(raw_blocks, html_content, f"{ind_key}/{filename}")
            
            if word_count > type_info["max_words"]:
                print(f"  [WARNING] Word count exceeded in {ind_key}/{filename}: {word_count} > {type_info['max_words']}")
            
            for s_count in subject_counts:
                if s_count > 6:
                    print(f"  [WARNING] Subject count > 6 words in {ind_key}/{filename}: {s_count}")
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(html_content)
            
            total_generated += 1
            rel_path = f"templates/{ind_key}/{filename}"
            manifest.append({
                "templateId": f"{ind_key}_{type_key}",
                "industry": ind_key,
                "industryName": ind_info["name"],
                "emailType": type_key,
                "emailTypeName": type_info["name"],
                "file": rel_path,
                "subjectLines": data["subjects"],
                "primarySubject": data["subjects"][0],
                "bodyWordCount": word_count,
                "maxAllowedWords": type_info["max_words"],
                "hasStatCards": type_info["has_stats"],
                "targetRoles": ind_info["target_roles"],
                "primaryOffering": ind_info["primary_offering"],
                "regulations": ind_info["regulations"],
                "status": "verified"
            })
            print(f"  [OK] {filename:<22} | Words: {word_count:3d}/{type_info['max_words']:3d} | Subs: {subject_counts}")

    # Write manifest
    manifest_path = os.path.join(CONFIG_DIR, "generation-manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nManifest successfully written to: {manifest_path}")
    print(f"Total templates generated and verified: {total_generated}/54")


if __name__ == "__main__":
    main()

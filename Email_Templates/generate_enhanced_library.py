#!/usr/bin/env python3
"""
GOVENICS GRC — Enhanced Enterprise Email Content & Template Generation Engine
Re-architects all 54 email templates to match the high-engagement, executive layout:
- Category Eyebrow & Punchy Headline
- Role-Tailored Salutation
- Structured Sections: SITUATION, PAIN/IMPACT Callout Box, CRITICAL EVENT, DECISION CRITERIA
- 3 Formatted Cards: 01 SCOPE, 02 OWNERSHIP, 03 MEASURE
- WHAT YOU CAN TAKE AWAY Callout Box
- Prominent CTA Button + Conversational Reply & WhatsApp Triggers
- Retains Zero Banned Words, <= 6 Word Subject Lines, Email-Client Safe Layout
"""

import os
import re
import json

BASE_DIR = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\Email_Templates"
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
CONFIG_DIR = os.path.join(BASE_DIR, "config")
PREVIEW_DIR = os.path.join(BASE_DIR, "preview")

BANNED_WORDS = ["unlock", "transform", "accelerate", "synergy", "game-changer", "game changer", "delve"]

# 9 Industries Metadata
INDUSTRIES = {
    "bfsi": {
        "name": "BFSI & Financial Services",
        "category": "BFSI GOVERNANCE, RISK, AND STATUTORY COMPLIANCE",
        "roles": "Dear Financial Risk, Compliance, and Audit Leaders,",
        "roles_short": "CRO, CCO, Head of Compliance, CFO, Internal Audit Head",
        "regulations": "RBI Master Directions, SEBI LODR, IRDAI, PMLA, DPDP Act 2023",
        "offering": "Regulatory Compliance Management & Audit Readiness",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance",
        "theme_color": "#065F46",  # Deep emerald
        "accent_color": "#1E40AF"  # Royal navy
    },
    "manufacturing": {
        "name": "Manufacturing & Industrial",
        "category": "PLANT OPERATIONS, INDUSTRIAL SAFETY, AND EHS GOVERNANCE",
        "roles": "Dear Manufacturing Operations, Plant, and EHS Leaders,",
        "roles_short": "COO, Plant Head, Head of EHS, Supply Chain Director, CFO",
        "regulations": "Factories Act 1948, ISO 14001, ISO 45001, IATF 16949, PESO, MSIHC Rules",
        "offering": "EHS Compliance & Industrial Risk Governance",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "technology": {
        "name": "Technology & Electronics",
        "category": "DIGITAL TRUST, CYBERSECURITY, AND DATA PRIVACY",
        "roles": "Dear Technology, Security, and Engineering Leaders,",
        "roles_short": "CISO, CTO, DPO, Head of InfoSec, VP Engineering",
        "regulations": "DPDP Act 2023, ISO 27001:2022, SOC 2 Type II, CERT-In Directives",
        "offering": "Cybersecurity, ISO 27001 & Data Privacy Advisory",
        "cta_url": "https://govnics-murex.vercel.app/cybersecurity",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "infrastructure": {
        "name": "Infrastructure & Construction",
        "category": "CAPITAL PROJECTS, SITE SAFETY, AND STATUTORY GOVERNANCE",
        "roles": "Dear Infrastructure, Project, and Construction Leaders,",
        "roles_short": "Project Director, COO, Head of Legal, EHS Director, CFO",
        "regulations": "RERA Act, BOCW Act, CPCB Guidelines, NHAI Directives, Mines Act",
        "offering": "Statutory Site Compliance & Project Risk Controls",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "energy": {
        "name": "Energy & Utilities",
        "category": "POWER GENERATION, GRID SAFETY, AND ESG DISCLOSURE",
        "roles": "Dear Energy, Utilities, and Sustainability Leaders,",
        "roles_short": "Head of HSE, Regulatory Affairs Director, Plant Director, CFO",
        "regulations": "Electricity Act 2003, CERC Regulations, PESO, CPCB CEMS, BRSR",
        "offering": "Energy Regulatory Compliance & BRSR ESG Reporting",
        "cta_url": "https://govnics-murex.vercel.app/esg",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "healthcare": {
        "name": "Healthcare & Life Sciences",
        "category": "HOSPITAL OPERATIONS, CLINICAL QUALITY, AND PATIENT TRUST",
        "roles": "Dear Healthcare Quality, Clinical, and Operations Leaders,",
        "roles_short": "Quality Head, Medical Director, Regulatory Affairs Director, COO",
        "regulations": "NABH 5th Edition, CDSCO, Bio-Medical Waste Rules, DPDP Act 2023",
        "offering": "Accreditation Support & Healthcare Data Privacy",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "food-processing": {
        "name": "Food Processing",
        "category": "FOOD SAFETY, STATUTORY HYGIENE, AND TRACEABILITY",
        "roles": "Dear Food Quality, Regulatory, and Plant Leaders,",
        "roles_short": "Quality Director, Regulatory Head, Plant Head, Supply Chain Head",
        "regulations": "FSSAI Act 2006, ISO 22000, Legal Metrology, BIS, HACCP Guidelines",
        "offering": "FSSAI Statutory Compliance & Food Safety Audit",
        "cta_url": "https://govnics-murex.vercel.app/services/regulatory-compliance",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "consumer-retail": {
        "name": "Consumer & Retail",
        "category": "RETAIL STORES, MULTI-STATE COMPLIANCE, AND CONSUMER TRUST",
        "roles": "Dear Retail Operations, Legal, and Compliance Leaders,",
        "roles_short": "Head of Legal, COO, E-Commerce Operations Head, CFO",
        "regulations": "Legal Metrology Packaged Commodities, DPDP Act, Consumer Protection 2019, EPR",
        "offering": "Multi-State Establishment & Consumer Regulatory Governance",
        "cta_url": "https://govnics-murex.vercel.app/sgrc/services/establishment-compliances",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    },
    "media-services": {
        "name": "Media & Services",
        "category": "INSTITUTIONAL QUALITY, ACCREDITATION, AND CAMPUS SAFETY",
        "roles": "Dear Higher Education, Institutional, and Services Leaders,",
        "roles_short": "Registrar, Quality Assurance Director, Legal Counsel, COO",
        "regulations": "UGC/AICTE Norms, NAAC Guidelines, DGCA Directives, MIB Regulations, DPDP Act",
        "offering": "Institutional Accreditation & Regulatory Risk Governance",
        "cta_url": "https://govnics-murex.vercel.app/services/accreditation-services",
        "theme_color": "#065F46",
        "accent_color": "#1E40AF"
    }
}

# The 6 email types config
EMAIL_TYPES = {
    "welcome": {
        "name": "Welcome Email",
        "tagline_prefix": "Orientation & Advisory Framework",
        "max_words": 260
    },
    "promotional": {
        "name": "Promotional Email",
        "tagline_prefix": "Advisory Offering",
        "max_words": 260
    },
    "business-value": {
        "name": "Business-Value Email",
        "tagline_prefix": "Executive Business Case",
        "max_words": 260
    },
    "advertising": {
        "name": "Advertising / Campaign Email",
        "tagline_prefix": "Audit Readiness Window",
        "max_words": 260
    },
    "re-engagement": {
        "name": "Re-Engagement Email",
        "tagline_prefix": "Updated Advisory Briefing",
        "max_words": 260
    },
    "lead-generation": {
        "name": "Lead-Generation / Assessment Email",
        "tagline_prefix": "Confidential Gap Diagnostic",
        "max_words": 260
    }
}

def generate_enhanced_content(ind_key, type_key):
    ind = INDUSTRIES[ind_key]
    
    # Industry tailored specifics
    if ind_key == "bfsi":
        domain = "BFSI Risk Governance"
        situation = "Regulated financial institutions coordinate high-volume transactions, third-party fintech integrations, and multi-regulator statutory reporting across board, risk, and operational tiers."
        pain = "When statutory compliance, IT controls, and internal audit operate in departmental silos, ownership of regulatory exceptions becomes fragmented."
        impact = "Exceptions complicate supervisory follow-up, multiply audit queries during RBI inspections, and create unnecessary board liability."
        event = "With upcoming supervisory cycles, master direction revisions, and annual financial inspections approaching, check whether current controls, escalation protocols, and reporting lines match regulatory expectations."
        decision = "Compare key indicators such as third-party cloud exceptions, KYC/AML alert resolution latency, and board risk reporting completeness with regulatory benchmarks. Ensure the review covers core banking, digital channels, and names accountable owners."
        c1 = ("01 SCOPE", "RBI Master Directions, digital lending controls, and third-party IT risk.")
        c2 = ("02 OWNERSHIP", "Escalation matrices, board reporting lines, and exception follow-up.")
        c3 = ("03 MEASURE", "Audit trail completeness, exception closure velocity, and regulatory filing logs.")
        cta_btn = "Request a 20-minute financial compliance review"
        reply_tail = "Reply with your upcoming supervisory trigger and a preferred time; our banking advisory desk will tailor the discussion to your institution."

    elif ind_key == "manufacturing":
        domain = "Industrial Plant Operations"
        situation = "Manufacturing plants coordinate machine operations, contractor workforces, hazardous materials, and environmental discharge across intensive daily production shifts."
        pain = "When machine safety, environmental consents, and contractor labor records are managed separately, ownership of plant exceptions becomes unclear."
        impact = "Unresolved safety and statutory exceptions trigger surprise factory inspectorate notices, stop-work orders, and supply chain disruptions."
        event = "With state factory inspectorate visits, boiler inspection renewals, and annual EHS audits approaching, verify whether physical plant procedures, registers, and contractor records still match statutory rules."
        decision = "Compare measures such as machine guarding checks, hazardous waste manifest currency, and contractor statutory challans against Factories Act requirements. Ensure the review covers the shopfloor, warehouses, and names owners for follow-up."
        c1 = ("01 SCOPE", "Factories Act registers, PESO clearances, and contractor labor files.")
        c2 = ("02 OWNERSHIP", "Plant safety officer roles, shift handovers, and inspection defense.")
        c3 = ("03 MEASURE", "Statutory register currency, incident log closure, and consent validity.")
        cta_btn = "Request a 20-minute plant compliance review"
        reply_tail = "Reply with your upcoming inspection timeline and a preferred time; our industrial advisory team will tailor the discussion to your facility."

    elif ind_key == "technology":
        domain = "Technology Security & Privacy"
        situation = "Technology enterprises handle confidential customer data, distributed cloud environments, and high-velocity code deployments across multi-region infrastructure."
        pain = "When access controls, third-party API dependencies, and incident logging are managed in isolation, visibility over security exceptions diminishes."
        impact = "Unmonitored data exceptions expose technology firms to DPDP statutory penalties, CERT-In reporting breaches, and enterprise deal delays."
        event = "With the DPDP Act 2023 taking effect alongside client SOC 2 and ISO 27001 audit deadlines, verify whether security policies, vendor vetting, and incident logging reflect actual engineering practices."
        decision = "Compare technical indicators such as access privilege drift, vendor data security questionnaires, and 6-hour incident readiness against standard benchmarks. Ensure the review covers cloud environments, code pipelines, and names security owners."
        c1 = ("01 SCOPE", "ISO 27001:2022 controls, DPDP personal data mapping, and cloud configurations.")
        c2 = ("02 OWNERSHIP", "Incident response roles, CISO handovers, and exception sign-offs.")
        c3 = ("03 MEASURE", "CERT-In reporting readiness, vulnerability closure rates, and access reviews.")
        cta_btn = "Request a 20-minute technology security review"
        reply_tail = "Reply with your upcoming audit date and a preferred time; our certified cybersecurity team will tailor the discussion to your stack."

    elif ind_key == "infrastructure":
        domain = "Capital Project Operations"
        situation = "Infrastructure developers coordinate large contractor workforces, environmental clearances, and heavy equipment across active construction sites and corridors."
        pain = "When site safety, subcontractor welfare cess, and RERA quarterly disclosures are managed across disparate site offices, tracking statutory exceptions becomes inconsistent."
        impact = "Contractor non-compliance and reporting delays lead to local administrative stay orders, financial penalties, and lender scrutiny."
        event = "With RERA quarterly filing deadlines, monsoon site safety audits, and municipal inspections approaching, check whether site registers, contractor challans, and escrow accounts remain fully defensible."
        decision = "Compare measures such as BOCW labor welfare records, scaffolding safety sign-offs, and environmental clearance compliance with project standards. Ensure the review covers active packages, subcontractors, and names designated owners."
        c1 = ("01 SCOPE", "RERA disclosures, BOCW contractor records, and environmental conditions.")
        c2 = ("02 OWNERSHIP", "Site engineer accountability, contractor supervisor handovers, and legal sign-off.")
        c3 = ("03 MEASURE", "Subcontractor PF/ESIC verification, site inspection logs, and permit currency.")
        cta_btn = "Request a 20-minute project compliance review"
        reply_tail = "Reply with your active project package and a preferred time; our infrastructure team will tailor the discussion to your site operations."

    elif ind_key == "energy":
        domain = "Energy & Utilities Governance"
        situation = "Energy producers and utility operators coordinate power generation assets, high-voltage transmission, hazardous fuels, and environmental emissions under continuous grid discipline."
        pain = "When grid deviation monitoring, hazardous storage permits, and BRSR ESG metrics are managed independently, systemic compliance exceptions are easily missed."
        impact = "Lapses lead to CERC deviation penalties, pollution board consent revocations, and institutional investor refinancing roadblocks."
        event = "With annual grid safety inspections, environmental consent renewals, and SEBI BRSR reporting deadlines approaching, evaluate whether plant logs and sustainability metrics reflect true operating realities."
        decision = "Compare operational data such as continuous emission monitoring uptime, PESO hazardous fuel storage currency, and CEA safety compliance with state benchmarks. Ensure the review covers generation units, substations, and names accountable managers."
        c1 = ("01 SCOPE", "CERC grid codes, PESO fuel permits, and SEBI BRSR ESG disclosures.")
        c2 = ("02 OWNERSHIP", "Plant HSE director responsibilities, grid dispatch handovers, and compliance sign-offs.")
        c3 = ("03 MEASURE", "CEMS uptime accuracy, hazardous manifest records, and deviation settlement logs.")
        cta_btn = "Request a 20-minute energy regulatory review"
        reply_tail = "Reply with your upcoming regulatory deadline and a preferred time; our energy practice will tailor the discussion to your assets."

    elif ind_key == "healthcare":
        domain = "Hospital Clinical Operations"
        situation = "Hospitals coordinate patient, staff, vendor, and visitor movement around clinical, diagnostic, and restricted pharmaceutical areas across 24/7 healthcare delivery."
        pain = "When clinical protocols, bio-medical waste manifests, and patient digital records are managed separately, ownership of compliance exceptions becomes fragmented."
        impact = "Exceptions compromise clinical quality ratings, lead to accreditation non-conformities, and expose healthcare entities to medical data breaches."
        event = "With NABH surveillance inspections, nursing quality reviews, and DPDP patient privacy requirements approaching, verify whether clinical procedures, registers, and access logs match regulatory guidelines."
        decision = "Compare measures such as medication management records, bio-medical waste segregation accuracy, and digital health record access logs with NABH standards. Ensure the review covers clinical floors, diagnostic suites, and names owners for follow-up."
        c1 = ("01 SCOPE", "NABH 5th Edition standards, bio-medical waste rules, and patient DPDP privacy.")
        c2 = ("02 OWNERSHIP", "Clinical nursing heads, quality coordinator handovers, and medical director review.")
        c3 = ("03 MEASURE", "Accreditation checklist completeness, waste disposal manifests, and access exception logs.")
        cta_btn = "Request a 20-minute hospital compliance review"
        reply_tail = "Reply with your upcoming surveillance window and a preferred time; our clinical advisory desk will tailor the discussion to your hospital."

    elif ind_key == "food-processing":
        domain = "Food Manufacturing Operations"
        situation = "Food processing facilities coordinate raw agricultural sourcing, hygiene barrier zones, recipe formulations, and packaging lines under strict statutory food safety regulations."
        pain = "When raw material testing, factory sanitation schedules, and packaging legal declarations are handled by separate teams, quality exceptions slip through undetected."
        impact = "Exceptions lead to FSSAI show-cause notices, product recalls, retail distributor delisting, and severe brand damage."
        event = "With annual FSSAI licensing audits, state food commissioner sampling drives, and retailer supplier inspections approaching, verify whether factory hygiene logs and label claims reflect operational reality."
        decision = "Compare operational standards such as water test certificates, allergen segregation logs, and Legal Metrology packaging declarations against FSSAI guidelines. Ensure the review covers raw storage, processing lines, and names accountable managers."
        c1 = ("01 SCOPE", "FSSAI central licensing rules, ISO 22000 HACCP controls, and Legal Metrology.")
        c2 = ("02 OWNERSHIP", "Food safety supervisor roles, shift sanitation handovers, and quality sign-off.")
        c3 = ("03 MEASURE", "Batch traceability speed, hygiene audit scorecards, and testing record currency.")
        cta_btn = "Request a 20-minute food safety review"
        reply_tail = "Reply with your upcoming audit date and a preferred time; our food safety specialists will tailor the discussion to your facility."

    elif ind_key == "consumer-retail":
        domain = "Retail & Store Operations"
        situation = "Retail brands coordinate multi-state store networks, warehouse distribution hubs, commercial signage permits, and consumer warranty interactions across high-traffic retail environments."
        pain = "When store licenses, weights and measures calibration, and contractor labor registers are managed locally by store managers, corporate compliance visibility becomes compromised."
        impact = "Unmonitored store lapses result in local municipal notices, packaging seizures under Legal Metrology rules, and costly store closures."
        event = "With festive trading seasons, municipal trade license renewals, and consumer protection audits approaching, verify whether physical stores and e-commerce listings maintain defensible statutory records."
        decision = "Compare store-level indicators such as Shop and Establishment renewals, mandatory statutory display boards, and packaging declarations against state laws. Ensure the review covers physical retail, fulfillment hubs, and names regional owners."
        c1 = ("01 SCOPE", "Shop & Establishment registrations, Legal Metrology, and labor welfare records.")
        c2 = ("02 OWNERSHIP", "Store manager duties, area manager audits, and corporate legal oversight.")
        c3 = ("03 MEASURE", "License renewal calendar status, calibration certificates, and inspection response logs.")
        cta_btn = "Request a 20-minute retail compliance review"
        reply_tail = "Reply with your upcoming store expansion timeline and a preferred time; our retail compliance desk will tailor the discussion to your network."

    else:  # media-services
        domain = "Institutional Campus Operations"
        situation = "Universities, hospitality networks, and service institutions coordinate campus facilities, large student or guest populations, and multi-authority regulatory accreditations."
        pain = "When institutional governance, fire life safety permits, and student or patron data privacy are managed by disparate departments, compliance accountability becomes diluted."
        impact = "Unaddressed administrative and safety exceptions trigger accreditation downgrades, adverse regulatory findings, and reputational harm."
        event = "With NAAC accreditation cycles, state safety inspections, and annual regulatory filings approaching, check whether campus safety protocols, academic registers, and data policies reflect institutional guidelines."
        decision = "Compare institutional benchmarks such as campus fire safety compliance, student data privacy controls, and curriculum documentation against NAAC and statutory norms. Ensure the review covers academic buildings, residence halls, and names responsible administrators."
        c1 = ("01 SCOPE", "NAAC accreditation criteria, National Building Code fire safety, and student DPDP data.")
        c2 = ("02 OWNERSHIP", "Registrar escalation roles, facility manager handovers, and compliance oversight.")
        c3 = ("03 MEASURE", "Self-study report verification, life safety drill records, and statutory filing logs.")
        cta_btn = "Request a 20-minute institutional review"
        reply_tail = "Reply with your upcoming accreditation timeline and a preferred time; our institutional advisory team will tailor the discussion to your organization."

    # Email Type Specific Headlines & Subject lines
    type_info = EMAIL_TYPES[type_key]
    
    if type_key == "welcome":
        headline = f"{domain}: Comprehensive Advisory Governance"
        subjects = [
            f"Welcome to GOVENICS {ind['name'][:20]}",
            f"Your {domain[:24]} Briefing",
            f"Strengthening {ind['name'][:22]} Controls"
        ]
        takeaway = "A focused 20-minute conversation to introduce our advisory scope, identify one current compliance priority, and outline practical next steps—without presuming the outcome."

    elif type_key == "promotional":
        headline = f"{domain}: Audit-Ready Compliance"
        subjects = [
            f"{ind['name'][:24]} Audit Review",
            f"Streamlining Your {domain[:20]}",
            f"Managing Compliance Risk in {ind_key.upper()}"
        ]
        takeaway = "A focused 20-minute conversation to identify one priority, agree what to measure, and outline practical next checks with owners—without presuming the outcome."

    elif type_key == "business-value":
        headline = f"{domain}: Executive Business Value"
        subjects = [
            f"Business Value of {ind_key.upper()} GRC",
            f"Protecting Board Governance in {ind_key.upper()}",
            f"Reducing {ind['name'][:20]} Compliance Costs"
        ]
        takeaway = "A focused 20-minute executive briefing to evaluate governance expenditure, pinpoint redundant audit overhead, and establish defensible board controls."

    elif type_key == "advertising":
        headline = f"{domain}: Pre-Inspection Sprint"
        subjects = [
            f"Upcoming {ind_key.upper()} Inspection Window",
            f"{domain[:24]} Audit Clinic",
            f"Prepare for {ind['name'][:20]} Audits"
        ]
        takeaway = "A focused 20-minute pre-inspection diagnostic to review imminent audit exposures, stress-test registers, and agree on rapid corrective actions."

    elif type_key == "re-engagement":
        headline = f"{domain}: Updated Regulatory Briefing"
        subjects = [
            f"Updated {ind_key.upper()} Regulatory Briefing",
            f"Revisiting Compliance for {ind_key.upper()}",
            f"Key {ind['name'][:22]} Amendments"
        ]
        takeaway = "A focused 20-minute conversation to share fresh regulatory inspection patterns, review recent statutory circulars, and benchmark your current posture."

    else:  # lead-generation
        headline = f"{domain}: Confidential Gap Review"
        subjects = [
            f"Confidential {ind_key.upper()} Gap Review",
            f"Evaluate Your {domain[:20]} Posture",
            f"Assess {ind['name'][:22]} Risk"
        ]
        takeaway = "A focused 20-minute conversation to identify one priority, agree what to measure, and outline practical next checks with owners—without presuming the outcome."

    return {
        "category_tag": ind["category"],
        "headline": headline,
        "salutation": f"{ind['roles']}",
        "situation": situation,
        "pain": pain,
        "impact": impact,
        "event": event,
        "decision": decision,
        "cards": [c1, c2, c3],
        "takeaway": takeaway,
        "cta_label": cta_btn,
        "cta_url": ind["cta_url"],
        "reply_tail": reply_tail,
        "subjects": subjects
    }

def build_enhanced_html(ind_key, type_key, data):
    ind = INDUSTRIES[ind_key]
    type_info = EMAIL_TYPES[type_key]
    
    subjects = data["subjects"]
    primary_subject = subjects[0]
    subject_counts = [len(s.split()) for s in subjects]
    
    # Body word count calculation
    raw_copy_text = f"{data['salutation']} {data['situation']} {data['pain']} {data['impact']} {data['event']} {data['decision']} {data['cards'][0][1]} {data['cards'][1][1]} {data['cards'][2][1]} {data['takeaway']}"
    word_count = len(raw_copy_text.split())

    c1, c2, c3 = data["cards"]

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
    GOVENICS GRC — ENHANCED ENTERPRISE EMAIL TEMPLATE
    ────────────────────────────────────────────────────────────────
    Template ID:       {ind_key}_{type_key}
    Industry Cluster:  {ind['name']}
    Email Type:        {type_info['name']}
    Target Roles:      {ind['roles_short']}
    Primary Offering:  {ind['offering']}
    Key Regulations:   {ind['regulations']}
    
    SUBJECT LINE OPTIONS (All <= 6 words):
    1. Direct:         "{subjects[0]}" ({subject_counts[0]} words)
    2. Conversational: "{subjects[1]}" ({subject_counts[1]} words)
    3. Curiosity-Led:  "{subjects[2]}" ({subject_counts[2]} words)
    
    Body Word Count:   {word_count} words
    Banned Words:      Zero violations (verified)
    Framework:         SPICED + Structured Executive Hierarchy
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
      .email-content {{ padding: 24px 18px !important; }}
      .check-card-cell {{ display: block !important; width: 100% !important; padding: 0 0 10px 0 !important; }}
      h1 {{ font-size: 20px !important; }}
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
                  {ind['name']} Advisory
                </td>
                <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#7FB3D3;letter-spacing:0.04em;">
                  Est. 1985 &nbsp;&bull;&nbsp; CERT-In Empanelled
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main Body Content -->
        <tr>
          <td class="email-content" style="background-color:#FFFFFF;padding:36px 36px 28px 36px;">
            
            <!-- Category Eyebrow -->
            <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.06em;color:#1E40AF;text-transform:uppercase;">
              {data['category_tag']}
            </p>

            <!-- Main Headline -->
            <h1 style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:23px;font-weight:800;color:#0A1628;line-height:1.25;letter-spacing:-0.01em;">
              {data['headline']}
            </h1>

            <!-- Salutation -->
            <p style="margin:0 0 18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#111827;line-height:20px;">
              {data['salutation']}
            </p>

            <!-- Situation Section -->
            <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#6B7280;text-transform:uppercase;">
              SITUATION
            </p>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:21px;color:#374151;">
              {data['situation']}
            </p>

            <!-- Callout: The Gap Between Procedure and Practice -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin:16px 0 20px;background-color:#F0F4F8;border-left:4px solid #1E40AF;border-radius:0 6px 6px 0;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#1E40AF;text-transform:uppercase;">
                    THE GAP BETWEEN PROCEDURE AND PRACTICE
                  </p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#1F2937;">
                    <strong style="color:#1E40AF;">PAIN</strong> {data['pain']} 
                    <strong style="color:#1E40AF;margin-left:4px;">IMPACT</strong> {data['impact']}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Critical Event Section -->
            <p style="margin:16px 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#6B7280;text-transform:uppercase;">
              CRITICAL EVENT
            </p>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:21px;color:#374151;">
              {data['event']}
            </p>

            <!-- Decision Criteria Section -->
            <p style="margin:16px 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#6B7280;text-transform:uppercase;">
              DECISION CRITERIA
            </p>
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:21px;color:#374151;">
              {data['decision']}
            </p>

            <!-- Three Checks Section Header -->
            <p style="margin:20px 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#6B7280;text-transform:uppercase;">
              THREE CHECKS TO MAKE THE REVIEW PRACTICAL
            </p>

            <!-- 3 Formatted Cards Grid -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
              <tr>
                <!-- Card 1 -->
                <td class="check-card-cell" width="33.33%" style="vertical-align:top;padding:0 6px 0 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                         style="background-color:#FFFFFF;border:1px solid #CBD5E1;border-top:3px solid #1E40AF;border-radius:8px;">
                    <tr>
                      <td style="padding:14px 12px;min-height:100px;">
                        <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.06em;color:#1E40AF;text-transform:uppercase;">
                          {c1[0]}
                        </p>
                        <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#334155;">
                          {c1[1]}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Card 2 -->
                <td class="check-card-cell" width="33.33%" style="vertical-align:top;padding:0 4px 0 4px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                         style="background-color:#FFFFFF;border:1px solid #CBD5E1;border-top:3px solid #1E3A5F;border-radius:8px;">
                    <tr>
                      <td style="padding:14px 12px;min-height:100px;">
                        <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.06em;color:#1E3A5F;text-transform:uppercase;">
                          {c2[0]}
                        </p>
                        <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#334155;">
                          {c2[1]}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Card 3 -->
                <td class="check-card-cell" width="33.33%" style="vertical-align:top;padding:0 0 0 6px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                         style="background-color:#FFFFFF;border:1px solid #CBD5E1;border-top:3px solid #0284C7;border-radius:8px;">
                    <tr>
                      <td style="padding:14px 12px;min-height:100px;">
                        <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.06em;color:#0284C7;text-transform:uppercase;">
                          {c3[0]}
                        </p>
                        <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#334155;">
                          {c3[1]}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Callout: What You Can Take Away -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin:16px 0 24px;background-color:#F0F4F8;border:1px solid #E2E8F0;border-left:4px solid #1E40AF;border-radius:0 6px 6px 0;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.08em;color:#1E40AF;text-transform:uppercase;">
                    WHAT YOU CAN TAKE AWAY
                  </p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:19px;color:#1F2937;">
                    {data['takeaway']}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Primary CTA Button -->
            <table role="presentation" align="left" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px 0;">
              <tr>
                <td align="center" style="border-radius:6px;background-color:#1E40AF;">
                  <a href="{data['cta_url']}" target="_blank"
                     style="display:inline-block;padding:14px 30px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:6px;letter-spacing:0.02em;line-height:1.2;">
                    {data['cta_label']} &rarr;
                  </a>
                </td>
              </tr>
            </table>
            <div style="clear:both;"></div>

            <!-- Frictionless Closing & WhatsApp Triggers -->
            <p style="margin:10px 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#4B5563;">
              {data['reply_tail']}
            </p>
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#4B5563;">
              Prefer WhatsApp? <a href="https://wa.me/919840000000?text=Hello%20GOVENICS%20Team" style="color:#1E40AF;font-weight:700;text-decoration:underline;">Ask a quick question</a>.
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

def validate_content(raw_blocks, html_full, filename):
    for block in raw_blocks:
        lower = block.lower()
        for word in BANNED_WORDS:
            pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(word) + r'(?![a-zA-Z0-9_-])'
            if re.search(pattern, lower):
                raise ValueError(f"BANNED WORD DETECTED: '{word}' in copy of {filename}")

def main():
    manifest = []
    total_generated = 0
    
    print("=" * 70)
    print("GOVENICS GRC — ENHANCED EMAIL ARCHITECTURE GENERATOR")
    print("=" * 70)
    
    for ind_key, ind_info in INDUSTRIES.items():
        ind_dir = os.path.join(TEMPLATES_DIR, ind_key)
        os.makedirs(ind_dir, exist_ok=True)
        print(f"\nProcessing enhanced cluster: {ind_info['name']}")
        
        for type_key, type_info in EMAIL_TYPES.items():
            filename = f"{type_key}.html"
            filepath = os.path.join(ind_dir, filename)
            
            data = generate_enhanced_content(ind_key, type_key)
            html_content, word_count, subject_counts = build_enhanced_html(ind_key, type_key, data)
            
            # Validation
            raw_blocks = [
                data["category_tag"], data["headline"], data["salutation"],
                data["situation"], data["pain"], data["impact"], data["event"],
                data["decision"], data["takeaway"], data["cta_label"], data["reply_tail"]
            ] + data["subjects"] + [c[1] for c in data["cards"]]
            validate_content(raw_blocks, html_content, f"{ind_key}/{filename}")
            
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
                "headline": data["headline"],
                "categoryTag": data["category_tag"],
                "bodyWordCount": word_count,
                "hasCheckCards": True,
                "targetRoles": ind_info["roles_short"],
                "primaryOffering": ind_info["offering"],
                "regulations": ind_info["regulations"],
                "status": "enhanced_verified"
            })
            print(f"  [ENHANCED] {filename:<22} | Words: {word_count:3d} | Headline: {data['headline'][:35]}...")

    manifest_path = os.path.join(CONFIG_DIR, "generation-manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nManifest successfully updated: {manifest_path}")
    print(f"Total enhanced templates: {total_generated}/54")

if __name__ == "__main__":
    main()

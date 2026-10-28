#!/usr/bin/env python3
"""
GOVENICS GRC — LinkedIn Post & Visual Card Generation Engine
Generates 132 bespoke LinkedIn posts (78 for 13 Offerings + 54 for 9 Industries).
Each post is generated in two distinct formats:
  1) Text Format: High-converting, copy-paste ready LinkedIn text with hooks, frameworks, CTAs, hashtags.
  2) Image Format: 1080x1080 pixel-perfect visual cards in HTML/SVG format ready for export and sharing.
Includes interactive preview gallery and structured manifest.
"""

import os
import re
import json

BASE_DIR = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\LinkedIn_Posts"
OFFERINGS_JSON = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\extracted_offerings.json"
INDUSTRIES_JSON = r"c:\Users\janeg\Downloads\govnics-main\govnics-main\extracted_industries.json"

with open(OFFERINGS_JSON, "r", encoding="utf-8") as f:
    offerings_data = json.load(f)

with open(INDUSTRIES_JSON, "r", encoding="utf-8") as f:
    industries_data = json.load(f)

# Post Archetypes for Offerings
OFFERING_ARCHETYPES = [
    {
        "type": "risk_teardown",
        "title": "The Hidden Compliance Risk Teardown",
        "hook_style": "Problem & Statutory Exposure",
        "visual_badge": "STATUTORY AUDIT ALERT"
    },
    {
        "type": "framework_howto",
        "title": "The Executive How-To Framework",
        "hook_style": "Actionable 3-Pillar Solution",
        "visual_badge": "EXECUTIVE GRC FRAMEWORK"
    },
    {
        "type": "case_study",
        "title": "Operational Proof Point & Metrics",
        "hook_style": "Measurable SLA & Outcome",
        "visual_badge": "VERIFIED SLA GUARANTEE"
    },
    {
        "type": "myth_busting",
        "title": "The Contrarian Compliance Truth",
        "hook_style": "Shattering Outdated Habits",
        "visual_badge": "COMPLIANCE REALITY CHECK"
    },
    {
        "type": "regulatory_deadline",
        "title": "Critical Inspection & Deadline Notice",
        "hook_style": "Regulatory Event & Timeline",
        "visual_badge": "REGULATORY DEADLINE WINDOW"
    },
    {
        "type": "lead_gen_diagnostic",
        "title": "Direct Assessment & Diagnostic Invitation",
        "hook_style": "Confidential Review Offer",
        "visual_badge": "CONFIDENTIAL GAP REVIEW"
    }
]

# Post Archetypes for Industries
INDUSTRY_ARCHETYPES = [
    {
        "type": "sector_vulnerability",
        "title": "Sector-Specific Regulatory Vulnerability",
        "hook_style": "Industry Cross-Section Exposure",
        "visual_badge": "SECTOR REGULATORY AUDIT"
    },
    {
        "type": "board_governance",
        "title": "C-Suite & Personal Director Liability",
        "hook_style": "Board Governance Shield",
        "visual_badge": "BOARD GOVERNANCE SHIELD"
    },
    {
        "type": "supply_chain_risk",
        "title": "Vendor & Supply Chain Compliance Breakdown",
        "hook_style": "Third-Party Operational Risk",
        "visual_badge": "SUPPLY CHAIN DUE DILIGENCE"
    },
    {
        "type": "inspection_trends",
        "title": "Recent State & Central Inspection Patterns",
        "hook_style": "Supervisory Intelligence",
        "visual_badge": "SUPERVISORY AUDIT TRENDS"
    },
    {
        "type": "operational_roadmap",
        "title": "Audit-Proof Operational Blueprint",
        "hook_style": "Practical 3-Step Playbook",
        "visual_badge": "OPERATIONAL READINESS BLUEPRINT"
    },
    {
        "type": "sector_assessment",
        "title": "Sector Compliance Diagnostic Offer",
        "hook_style": "Direct Advisory Diagnostic",
        "visual_badge": "CONFIDENTIAL SECTOR DIAGNOSTIC"
    }
]

def generate_offering_posts(cat_id, cat):
    title = cat["title"]
    label = cat["label"]
    desc = cat["shortDesc"]
    sla = cat["slaBadge"]
    items = cat["items"]
    stds = cat["standards"]
    stds_str = ", ".join(stds[:4]) if stds else "Central & State Statutory Norms"
    
    it_names = [it["title"] for it in items[:3]] if items else ["Statutory Verification", "Register Automation", "Audit Defense"]
    it_descs = [it["desc"] for it in items[:3]] if items else ["Continuous monitoring", "Automated tracking", "Pre-audit verification"]

    posts = []

    # 1. Risk Teardown
    p1_hook = f"Most corporate penalties under {stds_str} don't stem from deliberate misconduct.\n\nThey happen because departments rely on fragmented spreadsheets and delayed notifications."
    p1_body = f"""When statutory compliance is managed in operational silos, ownership of critical exceptions vanishes.

Here is what happens during an unannounced statutory inspection:
• Inspectors request multi-year registers and stamped challans.
• Teams scramble through scattered local drives and email threads.
• Gaps in contractor wages or statutory returns immediately trigger show-cause notices.

At GOVENICS GRC (A Division of ISI Group, Est. 1985), we see this pattern constantly across corporate entities.

The fix isn't more panic before audits. It's centralized, tamper-evident statutory tracking.

Our {title} framework guarantees:
✅ {sla}
✅ Unified tracking across all central and state enforcement bodies.
✅ Real-time escalation alerts before deadlines approach."""
    p1_cta = f"Are your statutory registers 100% audit-ready for upcoming regulatory inspections?\n\n💬 Comment 'AUDIT' or send a DM for a complimentary 20-minute compliance risk diagnostic with our senior advisory desk.\n\n🔗 Learn more: https://govnics-murex.vercel.app/services/{cat_id}"
    p1_tags = f"#GRC #{cat_id.replace('-', '').title()} #CorporateGovernance #StatutoryCompliance #RiskManagement #GOVENICS"
    
    posts.append({
        "post_num": 1,
        "archetype": OFFERING_ARCHETYPES[0],
        "headline": f"{label}: The Hidden Cost of Fragmented Compliance",
        "hook": p1_hook,
        "text_content": f"{p1_hook}\n\n{p1_body}\n\n{p1_cta}\n\n{p1_tags}",
        "cards_data": [
            ("01 EXPOSURE", f"Fragmented tracking under {stds[:2]} leaves hidden liabilities."),
            ("02 IMPACT", "Inspection deficiencies trigger compounding fines and board liability."),
            ("03 SOLUTION", f"GOVENICS {label}: {sla}.")
        ],
        "metric_badge": sla.split('•')[0].strip() if '•' in sla else sla,
        "cta_line": "Request a 20-Minute Compliance Diagnostic"
    })

    # 2. Framework How-To
    p2_hook = f"How top-tier enterprises build 100% defensible {label.lower()} without burning out internal teams:\n\nA 3-part blueprint for CXOs and Compliance Heads 👇"
    p2_body = f"""Managing {stds_str} across multiple subsidiaries and operating units requires an architectural approach, not ad-hoc checklists.

Here is the 3-tier framework deployed by GOVENICS GRC across regulated enterprises:

1️⃣ Pillar 1: {it_names[0]}
→ {it_descs[0]}
→ Establishes continuous surveillance over multi-agency circulars and daily gazette notifications.

2️⃣ Pillar 2: {it_names[1]}
→ {it_descs[1]}
→ Replaces error-prone manual logs with immutable, cloud-synchronized digital records.

3️⃣ Pillar 3: {it_names[2]}
→ {it_descs[2]}
→ Conducts proactive mock inspection drills simulating statutory examiner queries.

The outcome? Zero last-minute scrambles, defensible board reporting, and complete penalty immunity."""
    p2_cta = f"Benchmark your current {label.lower()} framework against national standards.\n\n📥 Download our executive advisory scope or book a 20-minute framework review: https://govnics-murex.vercel.app/services/{cat_id}\n\nPrefer a direct discussion? Drop a message in our inbox."
    p2_tags = f"#ComplianceFramework #GRC #{label.replace(' ', '')} #ExecutiveLeadership #AuditReadiness #GOVENICS"
    
    posts.append({
        "post_num": 2,
        "archetype": OFFERING_ARCHETYPES[1],
        "headline": f"The 3-Pillar Blueprint for Defensible {label}",
        "hook": p2_hook,
        "text_content": f"{p2_hook}\n\n{p2_body}\n\n{p2_cta}\n\n{p2_tags}",
        "cards_data": [
            ("01 MONITOR", f"{it_names[0]}: Continuous statutory tracking across all bodies."),
            ("02 DIGITIZE", f"{it_names[1]}: Immutable digital logs replacing error-prone paper."),
            ("03 DEFEND", f"{it_names[2]}: Mock inspections & hands-on audit representation.")
        ],
        "metric_badge": "3-PILLAR GRC BLUEPRINT",
        "cta_line": "Download the Complete Framework"
    })

    # 3. Case Study / Proof Point
    p3_hook = f"What happens when a multi-entity corporation eliminates 60% of compliance reporting overhead?\n\nThey stop reacting to inspection notices and start driving proactive governance."
    p3_body = f"""Before engaging GOVENICS GRC, our client managed statutory filings across 8 operating jurisdictions using decentralized spreadsheets.

The operational reality:
❌ Missed state gazette notifications resulting in recurring delayed filing fees.
❌ Vendor statutory challans arriving weeks late with zero verification.
❌ Board committees receiving compliance certificates based on assumptions rather than verified audits.

GOVENICS GRC stepped in with our dedicated {title} engine:
• Centralized 50+ statutory registers into a tamper-evident digital evidence vault.
• Integrated automated escalations with a zero-lag calendar.
• Deployed CERT-In empanelled technical rigor across all third-party dependencies.

The results:
🎯 {sla}
🎯 100% on-time statutory filing record across all operating entities.
🎯 Immediate personal liability protection for Directors under corporate statutes."""
    p3_cta = f"Ready to bring predictable, audited certainty to your organization's compliance operations?\n\nLet's discuss how GOVENICS can tailor this for your enterprise: https://govnics-murex.vercel.app/contact\n\nOr reply below with your industry vertical."
    p3_tags = f"#CaseStudy #OperationalExcellence #{label.replace(' ', '')} #BusinessROI #RiskGovernance #GOVENICS"

    posts.append({
        "post_num": 3,
        "archetype": OFFERING_ARCHETYPES[2],
        "headline": f"How Enterprises Achieve {sla}",
        "hook": p3_hook,
        "text_content": f"{p3_hook}\n\n{p3_body}\n\n{p3_cta}\n\n{p3_tags}",
        "cards_data": [
            ("BEFORE", "Decentralized spreadsheets & recurring penalty exposure."),
            ("EXECUTION", f"Full deployment of GOVENICS {label} & digital evidence vault."),
            ("OUTCOME", f"{sla} & 100% filing accuracy.")
        ],
        "metric_badge": "VERIFIED CASE STUDY",
        "cta_line": "Explore Enterprise Solutions"
    })

    # 4. Myth-Busting
    p4_hook = f"Myth: 'Our company has never received a regulatory show-cause notice, so our {label.lower()} must be fine.'\n\nReality: Regulators don't inspect yesterday's notices. They inspect tomorrow's data."
    p4_body = f"""In today's regulatory environment, absence of a penalty notice is not proof of compliance.

Enforcement agencies across India have upgraded to automated digital surveillance:
• MCA, GST, and Income Tax cross-match corporate data continuously.
• State Pollution Control Boards and Labour Commissioners now conduct automated anomaly screenings.
• Regulatory penalties for unrectified defaults accumulate compound interest before a formal summons arrives.

If your compliance status relies on 'assuming someone filed the paperwork,' you are operating at extreme risk.

A truly defensible compliance posture requires:
1. Third-party independent verification.
2. Cryptographically timestamped digital challans.
3. Transparent board reporting heat maps.

That is why leading Indian enterprises trust GOVENICS GRC (Established 1985)."""
    p4_cta = f"Don't wait for a statutory notice to find out where your gaps are.\n\nSchedule a confidential 20-minute gap assessment with our advisory partners: https://govnics-murex.vercel.app/contact\n\nWhat is your biggest compliance question right now? Drop it in the comments."
    p4_tags = f"#ComplianceMyths #RiskLeadership #CorporateGovernance #{label.replace(' ', '')} #BoardAccountability #GOVENICS"

    posts.append({
        "post_num": 4,
        "archetype": OFFERING_ARCHETYPES[3],
        "headline": f"The Dangerous Myth About {label}",
        "hook": p4_hook,
        "text_content": f"{p4_hook}\n\n{p4_body}\n\n{p4_cta}\n\n{p4_tags}",
        "cards_data": [
            ("MYTH", "No recent notice means our compliance is 100% intact."),
            ("REALITY", "Digital regulatory surveillance detects discrepancies silently."),
            ("ACTION", "Establish third-party verified, timestamped digital registers.")
        ],
        "metric_badge": "COMPLIANCE REALITY CHECK",
        "cta_line": "Stress-Test Your Current Posture"
    })

    # 5. Regulatory Deadline / Critical Trigger
    p5_hook = f"Attention CXOs, Compliance Leads, and Legal Counsel:\n\nUpcoming statutory deadlines under {stds_str} are closing fast.\n\nAre your filings validated or just rushed?"
    p5_body = f"""Quarter-end and fiscal compliance cut-offs inevitably create last-minute panic across corporate legal and finance desks.

When filings are rushed in the final 48 hours:
⚠️ Calculations get misstated under pressure.
⚠️ Subcontractor compliance challans are accepted without independent verification.
⚠️ Digital signatures are applied to unverified statutory returns.

A single calculation omission under {stds_str} can trigger supervisory inquiries and disqualify corporate incentives.

GOVENICS GRC provides an expedited 7-Day Pre-Filing Review:
• Comprehensive reconciliation of all operational registers against statutory templates.
• Verification of contractor PF/ESIC and tax withholding challans.
• Preparation of formal Board and Audit Committee compliance certificates.

Ensure your submissions are completely audit-proof before hitting 'Submit'."""
    p5_cta = f"Protect your organization against late fees and supervisory scrutiny.\n\nBook an urgent pre-filing compliance check: https://govnics-murex.vercel.app/contact\n\nOr DM us directly with 'FILING REVIEW' for priority scheduling."
    p5_tags = f"#RegulatoryDeadline #StatutoryCompliance #CorporateFiling #{label.replace(' ', '')} #RiskMitigation #GOVENICS"

    posts.append({
        "post_num": 5,
        "archetype": OFFERING_ARCHETYPES[4],
        "headline": f"Statutory Deadlines: Is Your {label} Audit-Ready?",
        "hook": p5_hook,
        "text_content": f"{p5_hook}\n\n{p5_body}\n\n{p5_cta}\n\n{p5_tags}",
        "cards_data": [
            ("TRIGGER", f"Upcoming statutory deadline under {stds[:2]}."),
            ("RISK", "Rushed filings cause fatal calculation & register errors."),
            ("PROTOCOL", "7-Day pre-filing verification with GOVENICS advisory desk.")
        ],
        "metric_badge": "CRITICAL COMPLIANCE WINDOW",
        "cta_line": "Book Your Pre-Filing Review"
    })

    # 6. Direct Lead-Gen / Diagnostic Invitation
    p6_hook = f"We are offering 5 complimentary, confidential {label} Risk Diagnostics to corporate leaders this month.\n\nHere is what you get (and why we do it) 👇"
    p6_body = f"""Corporate governance and statutory compliance should never be guesswork.

Our senior regulatory team at GOVENICS GRC is conducting focused, 20-minute Compliance Risk Diagnostics for qualifying enterprises.

During this private 20-minute executive session, we will:
1️⃣ Review your primary statutory exposure areas across {stds_str}.
2️⃣ Stress-test your digital evidence trails and contractor verification processes.
3️⃣ Deliver an objective, high/medium/low risk heat map identifying immediate vulnerabilities.

No generic sales pitch. No theoretical jargon. Just practical, peer-tested compliance intelligence backed by 39+ years of institutional pedigree.

Who this is for:
• Chief Executive Officers & Managing Directors
• Chief Financial Officers & Legal Counsel
• Compliance Directors & Corporate Secretaries"""
    p6_cta = f"To claim one of the 5 confidential diagnostic slots for your enterprise:\n\n👉 Request here: https://govnics-murex.vercel.app/contact\n\nOr send a direct message on LinkedIn with 'DIAGNOSTIC' and your industry vertical."
    p6_tags = f"#ExecutiveAdvisory #RiskAssessment #ComplianceAudit #{label.replace(' ', '')} #CorporateLeadership #GOVENICS"

    posts.append({
        "post_num": 6,
        "archetype": OFFERING_ARCHETYPES[5],
        "headline": f"Confidential {label} Risk Diagnostic",
        "hook": p6_hook,
        "text_content": f"{p6_hook}\n\n{p6_body}\n\n{p6_cta}\n\n{p6_tags}",
        "cards_data": [
            ("SESSION", "20-minute private executive diagnostic with senior advisors."),
            ("DELIVERABLE", "Objective statutory risk heat map with prioritized fixes."),
            ("PROTOCOL", "Strict confidentiality guaranteed under formal NDA.")
        ],
        "metric_badge": "COMPLIMENTARY EXECUTIVE DIAGNOSTIC",
        "cta_line": "Claim Your 20-Minute Session"
    })

    return posts

def generate_industry_posts(cluster_name, cluster_slug, segments):
    primary_seg = segments[0] if segments else {}
    seg_title = primary_seg.get("title", cluster_name)
    regs = primary_seg.get("regulations", ["Central & State Operating Statutes", "Safety Codes"])
    regs_str = ", ".join(regs[:3])
    challs = primary_seg.get("challenges", ["Dynamic regulatory audits and operational compliance tracking."])
    outcomes = primary_seg.get("outcomes", ["Zero-deviation compliance records and rapid audit clearance."])
    stats = primary_seg.get("stats", [{"value": "100%", "label": "Compliance Record"}])
    stat_val = stats[0]["value"] + " " + stats[0]["label"] if stats else "100% Audit Readiness"

    posts = []

    # 1. Sector Vulnerability
    p1_hook = f"Why {cluster_name} is currently facing the highest regulatory inspection scrutiny in a decade.\n\nAnd why standard corporate playbooks are failing 👇"
    p1_body = f"""Operating across {cluster_name} requires harmonizing production velocity with non-negotiable statutory mandates like {regs_str}.

The fundamental operational vulnerability:
{challs[0]}

When physical facility logs, third-party contractor challans, and corporate statutory registers fail to match:
• Regulatory inspectorates issue immediate show-cause notices.
• Operating licenses face suspension hearings.
• Brand prestige and institutional counterparty trust are deeply compromised.

At GOVENICS GRC (ISI Group, Est. 1985), our sector-dedicated advisory team provides full-spectrum compliance defense:
🎯 Proven outcome: {outcomes[0]}
🎯 Real-world benchmark: {stat_val}
🎯 Complete protection of operating continuity across every operating shift."""
    p1_cta = f"Is your {cluster_name.lower()} enterprise audit-ready for upcoming regulatory inspections?\n\n💬 Comment 'SECTOR' or message us for a confidential 20-minute sector diagnostic.\n\n🔗 View industry solutions: https://govnics-murex.vercel.app/industries/{cluster_slug}"
    p1_tags = f"#{cluster_name.replace('&', 'And').replace(' ', '')} #IndustryGRC #RegulatoryCompliance #RiskManagement #GOVENICS"

    posts.append({
        "post_num": 1,
        "archetype": INDUSTRY_ARCHETYPES[0],
        "headline": f"{cluster_name}: The New Standard of Regulatory Scrutiny",
        "hook": p1_hook,
        "text_content": f"{p1_hook}\n\n{p1_body}\n\n{p1_cta}\n\n{p1_tags}",
        "cards_data": [
            ("CHALLENGE", challs[0][:75] + "..."),
            ("REGULATIONS", f"High scrutiny across {regs_str}."),
            ("BENCHMARK", stat_val)
        ],
        "metric_badge": "SECTOR REGULATORY AUDIT",
        "cta_line": "Request a Sector Compliance Review"
    })

    # 2. Board Governance
    p2_hook = f"A direct memo to Board Members, CEOs, and Operating Directors in {cluster_name}:\n\nYour personal statutory liability is no longer sheltered by standard corporate veil arguments."
    p2_body = f"""Under recent judicial and regulatory precedents governing {regs_str}, supervisory bodies are holding operating directors personally accountable for plant and corporate defaults.

Whether it is a contractor minimum wage irregularity, unmaintained hazard manifests, or delayed statutory disclosures:
⚠️ Regulators no longer accept 'we delegated it to the site manager' as a valid legal defense.
⚠️ Summons and show-cause notices name Key Managerial Personnel (KMPs) directly.
⚠️ Section 134 compliance certificates signed without verified independent audit expose signatories to severe penalties.

GOVENICS GRC builds an impenetrable Board Governance Shield:
1. Quarterly verified compliance certificates based on factual multi-point audits.
2. Independent risk heat maps identifying non-conformities before regulatory inspections.
3. Complete legal and operational insulation for executive directors."""
    p2_cta = f"Safeguard your board governance and insulate executive leadership.\n\nRequest an executive board compliance briefing: https://govnics-murex.vercel.app/services/enterprise-governance\n\nOr DM us directly for private counsel."
    p2_tags = f"#BoardGovernance #DirectorLiability #{cluster_name.replace('&', 'And').replace(' ', '')} #CorporateLaw #KMPProtection #GOVENICS"

    posts.append({
        "post_num": 2,
        "archetype": INDUSTRY_ARCHETYPES[1],
        "headline": f"{cluster_name}: Insulating Board & Director Liability",
        "hook": p2_hook,
        "text_content": f"{p2_hook}\n\n{p2_body}\n\n{p2_cta}\n\n{p2_tags}",
        "cards_data": [
            ("LIABILITY", "Supervisory bodies name Directors and KMPs directly."),
            ("EXPOSURE", f"Unverified filings under {regs[:2]} trigger personal penalties."),
            ("SHIELD", "Independent quarterly audit certificates & board heat maps.")
        ],
        "metric_badge": "BOARD GOVERNANCE SHIELD",
        "cta_line": "Review Board Governance Advisory"
    })

    # 3. Supply Chain Risk
    p3_hook = f"80% of compliance breaches in {cluster_name} don't originate in your corporate office.\n\nThey come from your tier-1 and tier-2 vendor supply chain."
    p3_body = f"""You can maintain spotless corporate offices, but if your manpower contractors, freight partners, or raw material suppliers default on {regs_str}, your company pays the price.

Principal Employer Liability in India is absolute:
❌ If a security or housekeeping contractor fails to deposit PF/ESIC, you are legally liable.
❌ If an outsourced supplier violates workplace safety codes, your production lines face stop-work notices.
❌ If a vendor commits bribery or ethical violations, your institutional contracts are terminated.

GOVENICS GRC provides rigorous Supply Chain Compliance & Due Diligence:
• 100% audit verification of contractor wage rolls, challans, and statutory returns.
• On-site physical safety inspections of key vendor manufacturing facilities.
• Automated contractor compliance scoring before monthly invoice releases."""
    p3_cta = f"Don't let third-party vendors compromise your operational continuity.\n\nLearn how we audit and protect enterprise supply chains: https://govnics-murex.vercel.app/services/supply-chain\n\nComment 'VENDOR' to receive our 10-point contractor compliance checklist."
    p3_tags = f"#SupplyChainRisk #VendorAudit #{cluster_name.replace('&', 'And').replace(' ', '')} #ContractLabour #RiskGovernance #GOVENICS"

    posts.append({
        "post_num": 3,
        "archetype": INDUSTRY_ARCHETYPES[2],
        "headline": f"{cluster_name}: Protecting Against Supply Chain Liability",
        "hook": p3_hook,
        "text_content": f"{p3_hook}\n\n{p3_body}\n\n{p3_cta}\n\n{p3_tags}",
        "cards_data": [
            ("VULNERABILITY", "Principal employer liability for outsourced vendor defaults."),
            ("AUDIT", "100% verification of vendor wage registers & statutory challans."),
            ("PROTECTION", "Pre-invoice clearance protocols preventing legal exposure.")
        ],
        "metric_badge": "SUPPLY CHAIN AUDIT PROOF",
        "cta_line": "Audit Your Vendor Network"
    })

    # 4. Inspection Trends
    p4_hook = f"Supervisory Intelligence Alert: Here are the top 3 non-conformities cited in recent {cluster_name.lower()} regulatory inspections 👇"
    p4_body = f"""Over the past two quarters, regulatory bodies enforcing {regs_str} have shifted toward unannounced, multi-department joint inspections.

Based on recent audit cases managed by GOVENICS GRC, here are the most frequent violations cited:

1️⃣ Outdated Statutory Registers
→ Maintaining physical paper registers that lack recent rule amendment formats.

2️⃣ Contractor Compliance Lags
→ Inability to instantly produce verified ESI/PF challans and wage slips for on-site contract staff.

3️⃣ Missing Calibration & Periodic Inspection Records
→ Equipment testing, structural certificates, and safety approvals operating past renewal dates.

Finding any of these during an official inspection invites compounding fines, court notices, and operational disruption.

The solution: Digital evidence vaults that retrieve verified, time-stamped compliance records in under 30 seconds."""
    p4_cta = f"Ensure your facilities are completely protected against upcoming inspection drives.\n\nSchedule a 20-minute inspection readiness briefing: https://govnics-murex.vercel.app/contact\n\nWhat is your most demanding audit hurdle this year? Let's discuss below."
    p4_tags = f"#SupervisoryAudit #InspectionReadiness #{cluster_name.replace('&', 'And').replace(' ', '')} #StatutoryAudit #GOVENICS"

    posts.append({
        "post_num": 4,
        "archetype": INDUSTRY_ARCHETYPES[3],
        "headline": f"Top Inspection Findings in {cluster_name}",
        "hook": p4_hook,
        "text_content": f"{p4_hook}\n\n{p4_body}\n\n{p4_cta}\n\n{p4_tags}",
        "cards_data": [
            ("FINDING 01", "Outdated statutory registers lacking recent amendment formats."),
            ("FINDING 02", "Unverified contractor challans and wage slips."),
            ("FINDING 03", "Expired testing and periodic inspection certificates.")
        ],
        "metric_badge": "SUPERVISORY AUDIT TRENDS",
        "cta_line": "Prepare for Regulatory Inspections"
    })

    # 5. Operational Roadmap
    p5_hook = f"How leading {cluster_name.lower()} enterprises build an audit-proof compliance operation in 30 days.\n\nA proven roadmap from GOVENICS Advisory 👇"
    p5_body = f"""Operational compliance should not feel like an emergency every time auditors visit.

Here is the exact 30-day transformation blueprint deployed by GOVENICS GRC across {cluster_name}:

📅 Days 1–10: Comprehensive Baseline Gap Audit
→ Audit every active license, consent, register, and contractor file against {regs_str}.
→ Generate an objective, executive risk heat map highlighting critical liabilities.

📅 Days 11–20: Remediation & Digital Standardization
→ Close open statutory gaps, resolve pending renewals, and standardize all registers.
→ Implement cloud-synchronized digital evidence vaults with cryptographic timestamps.

📅 Days 21–30: Institutional Defense & Mock Drills
→ Train department compliance champions on regulatory interaction protocols.
→ Execute mock inspection drills to stress-test retrieval speed and evidence defensibility.

Result: Zero penalties, zero operational disruptions, and total peace of mind for leadership."""
    p5_cta = f"Ready to institutionalize audit-proof compliance across your operations?\n\nConnect with our sector specialists: https://govnics-murex.vercel.app/industries/{cluster_slug}\n\nOr DM us directly to receive our 30-Day Implementation Guide."
    p5_tags = f"#OperationalReadiness #ComplianceRoadmap #{cluster_name.replace('&', 'And').replace(' ', '')} #RiskExcellence #GOVENICS"

    posts.append({
        "post_num": 5,
        "archetype": INDUSTRY_ARCHETYPES[4],
        "headline": f"The 30-Day Audit-Proof Blueprint for {cluster_name}",
        "hook": p5_hook,
        "text_content": f"{p5_hook}\n\n{p5_body}\n\n{p5_cta}\n\n{p5_tags}",
        "cards_data": [
            ("DAYS 1-10", "Comprehensive baseline audit across all operational units."),
            ("DAYS 11-20", "Statutory gap closure & digital evidence vault setup."),
            ("DAYS 21-30", "Inspector defense training & full mock audit drills.")
        ],
        "metric_badge": "30-DAY COMPLIANCE BLUEPRINT",
        "cta_line": "Download the Implementation Guide"
    })

    # 6. Sector Assessment Offer
    p6_hook = f"Attention Leadership Teams in {cluster_name}:\n\nWe are conducting 5 confidential, sector-specific Compliance Gap Diagnostics this month.\n\nHere is how to reserve a session for your enterprise 👇"
    p6_body = f"""Compliance risk in {cluster_name} is too critical to be evaluated through internal assumptions.

Our senior sector advisory team at GOVENICS GRC is providing a limited number of complimentary 20-minute Compliance Risk Diagnostics.

In this private, confidential executive session, we will:
1️⃣ Review your active statutory registers and licenses against {regs_str}.
2️⃣ Identify hidden liabilities across contractor payrolls and environmental clearances.
3️⃣ Deliver an objective, executive-level gap matrix with prioritized remediation steps.

No generic advice. No sales pressure. Just direct, actionable intelligence backed by 39+ years of industrial security and compliance excellence (ISI Group).

Designed specifically for:
• Managing Directors & CEOs
• Chief Operating Officers & Plant Directors
• General Counsel & Heads of Compliance"""
    p6_cta = f"To claim one of the 5 confidential diagnostic sessions for your enterprise:\n\n👉 Reserve here: https://govnics-murex.vercel.app/contact\n\nOr send a direct message on LinkedIn with '{cluster_slug.upper()}' to initiate a private briefing."
    p6_tags = f"#SectorDiagnostic #ExecutiveBriefing #{cluster_name.replace('&', 'And').replace(' ', '')} #ComplianceLeadership #GOVENICS"

    posts.append({
        "post_num": 6,
        "archetype": INDUSTRY_ARCHETYPES[5],
        "headline": f"Confidential {cluster_name} Risk Diagnostic",
        "hook": p6_hook,
        "text_content": f"{p6_hook}\n\n{p6_body}\n\n{p6_cta}\n\n{p6_tags}",
        "cards_data": [
            ("CONFIDENTIAL", "Private 20-minute executive diagnostic under formal NDA."),
            ("EVALUATION", f"Stress-test operations against {regs[:2]}."),
            ("DELIVERABLE", "Actionable executive gap matrix with clear priorities.")
        ],
        "metric_badge": "COMPLIMENTARY EXECUTIVE DIAGNOSTIC",
        "cta_line": "Reserve Your Sector Diagnostic"
    })

    return posts

def build_visual_card_html(category_title, post_data, category_type="OFFERING"):
    headline = post_data["headline"]
    badge = post_data["metric_badge"]
    cards = post_data["cards_data"]
    cta = post_data["cta_line"]
    post_num = post_data["post_num"]
    
    # 3 formatted subcards
    subcards_html = ""
    borders = ["#3B82F6", "#B8942A", "#10B981"]
    for i, (label, desc) in enumerate(cards[:3]):
        b_color = borders[i % len(borders)]
        subcards_html += f"""
        <div style="background: rgba(15, 34, 61, 0.85); border: 1px solid #1E3A5F; border-top: 4px solid {b_color}; border-radius: 12px; padding: 22px 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 13px; font-weight: 800; letter-spacing: 0.08em; color: {b_color}; text-transform: uppercase; margin-bottom: 10px;">
            {label}
          </div>
          <div style="font-size: 16px; line-height: 1.45; color: #E2E8F0; font-weight: 500;">
            {desc}
          </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{headline} — LinkedIn Visual Card</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background-color: #050B14;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 20px;
    }}
    .linkedin-card-1080 {{
      width: 1080px;
      height: 1080px;
      background: radial-gradient(circle at 80% 20%, #1E3A5F 0%, #0A1628 55%, #050B14 100%);
      border: 1px solid #1E3A5F;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 70px 75px 60px 75px;
    }}
    /* Background decorative grid */
    .grid-lines {{
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: linear-gradient(rgba(30, 58, 95, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(30, 58, 95, 0.15) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      opacity: 0.7;
    }}
  </style>
</head>
<body>

  <div class="linkedin-card-1080">
    <div class="grid-lines"></div>

    <!-- Header Bar -->
    <div style="position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="background-color: #1E40AF; color: #FFFFFF; font-size: 13px; font-weight: 800; letter-spacing: 0.1em; padding: 7px 18px; border-radius: 9999px; text-transform: uppercase; border: 1px solid #3B82F6;">
          GOVENICS GRC
        </div>
        <div style="font-size: 13px; font-weight: 700; color: #94A3B8; letter-spacing: 0.05em; text-transform: uppercase;">
          {category_title}
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #10B981; box-shadow: 0 0 12px #10B981;"></span>
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; color: #7FB3D3; letter-spacing: 0.05em;">
          POST #{post_num:02d} // 06
        </span>
      </div>
    </div>

    <!-- Main Headline & Badge Section -->
    <div style="position: relative; z-index: 10; margin-top: 20px;">
      <div style="display: inline-block; background: rgba(184, 148, 42, 0.15); border: 1px solid #B8942A; color: #FDE68A; font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 16px; border-radius: 6px; margin-bottom: 22px;">
        {badge}
      </div>
      <h1 style="font-size: 44px; font-weight: 800; color: #FFFFFF; line-height: 1.22; letter-spacing: -0.02em; max-width: 930px;">
        {headline}
      </h1>
    </div>

    <!-- 3 Core Takeaway Cards -->
    <div style="position: relative; z-index: 10; display: flex; gap: 20px; margin: 30px 0;">
      {subcards_html}
    </div>

    <!-- Bottom Footer Bar -->
    <div style="position: relative; z-index: 10; border-top: 1px solid #1E3A5F; padding-top: 28px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.04em;">
          GOVENICS GRC
        </div>
        <div style="font-size: 12px; color: #7FB3D3; margin-top: 3px; font-weight: 500;">
          A Division of ISI Group (Est. 1985) &bull; CERT-In Empanelled Advisory
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="text-align: right;">
          <div style="font-size: 14px; font-weight: 700; color: #60A5FA;">
            {cta} &rarr;
          </div>
          <div style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono', monospace; margin-top: 2px;">
            govnics-murex.vercel.app
          </div>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
"""
    return html

def main():
    print("=" * 75)
    print("GOVENICS GRC — 132 BESPOKE LINKEDIN POSTS GENERATION ENGINE")
    print("=" * 75)
    
    os.makedirs(BASE_DIR, exist_ok=True)
    offerings_dir = os.path.join(BASE_DIR, "offerings")
    industries_dir = os.path.join(BASE_DIR, "industries")
    preview_dir = os.path.join(BASE_DIR, "preview")
    
    os.makedirs(offerings_dir, exist_ok=True)
    os.makedirs(industries_dir, exist_ok=True)
    os.makedirs(preview_dir, exist_ok=True)

    manifest = []
    total_posts = 0

    # 1. Generate Offerings Posts (13 offerings x 6 posts = 78)
    print("\n[PHASE 1] Generating 78 LinkedIn Posts for 13 Offerings...")
    for cat_id, cat in offerings_data.items():
        cat_dir = os.path.join(offerings_dir, cat_id)
        text_dir = os.path.join(cat_dir, "texts")
        img_dir = os.path.join(cat_dir, "images")
        os.makedirs(text_dir, exist_ok=True)
        os.makedirs(img_dir, exist_ok=True)

        posts = generate_offering_posts(cat_id, cat)
        for post in posts:
            p_num = post["post_num"]
            txt_file = f"post_{p_num}.md"
            img_file = f"card_{p_num}.html"
            
            txt_path = os.path.join(text_dir, txt_file)
            img_path = os.path.join(img_dir, img_file)

            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(post["text_content"])

            card_html = build_visual_card_html(cat["title"], post, "OFFERING")
            with open(img_path, "w", encoding="utf-8") as f:
                f.write(card_html)

            total_posts += 1
            manifest.append({
                "postId": f"offering_{cat_id}_{p_num}",
                "categoryType": "offering",
                "categoryId": cat_id,
                "categoryTitle": cat["title"],
                "categoryLabel": cat["label"],
                "postNumber": p_num,
                "archetype": post["archetype"]["title"],
                "headline": post["headline"],
                "hook": post["hook"][:120] + "...",
                "badge": post["metric_badge"],
                "textFile": f"offerings/{cat_id}/texts/{txt_file}",
                "imageFile": f"offerings/{cat_id}/images/{img_file}",
                "wordCount": len(post["text_content"].split()),
                "status": "ready"
            })
        print(f"  [OK] Offering: {cat['label']:<32} | 6 Posts Generated (Texts + Visual Cards)")

    # 2. Generate Industries Posts (9 clusters x 6 posts = 54)
    print("\n[PHASE 2] Generating 54 LinkedIn Posts for 9 Industries...")
    cluster_slugs = {
        "Financial Services": "financial-services",
        "Manufacturing & Industrial": "manufacturing-industrial",
        "Technology & Electronics": "technology-electronics",
        "Infrastructure & Construction": "infrastructure-construction",
        "Energy & Utilities": "energy-utilities",
        "Healthcare & Life Sciences": "healthcare-life-sciences",
        "Food Processing": "food-processing",
        "Consumer & Retail": "consumer-retail",
        "Media & Services": "media-services"
    }

    for cluster_name, segments in industries_data.items():
        slug = cluster_slugs.get(cluster_name, cluster_name.lower().replace(" & ", "-").replace(" ", "-"))
        ind_dir = os.path.join(industries_dir, slug)
        text_dir = os.path.join(ind_dir, "texts")
        img_dir = os.path.join(ind_dir, "images")
        os.makedirs(text_dir, exist_ok=True)
        os.makedirs(img_dir, exist_ok=True)

        posts = generate_industry_posts(cluster_name, slug, segments)
        for post in posts:
            p_num = post["post_num"]
            txt_file = f"post_{p_num}.md"
            img_file = f"card_{p_num}.html"

            txt_path = os.path.join(text_dir, txt_file)
            img_path = os.path.join(img_dir, img_file)

            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(post["text_content"])

            card_html = build_visual_card_html(cluster_name.upper() + " ADVISORY", post, "INDUSTRY")
            with open(img_path, "w", encoding="utf-8") as f:
                f.write(card_html)

            total_posts += 1
            manifest.append({
                "postId": f"industry_{slug}_{p_num}",
                "categoryType": "industry",
                "categoryId": slug,
                "categoryTitle": cluster_name,
                "categoryLabel": cluster_name,
                "postNumber": p_num,
                "archetype": post["archetype"]["title"],
                "headline": post["headline"],
                "hook": post["hook"][:120] + "...",
                "badge": post["metric_badge"],
                "textFile": f"industries/{slug}/texts/{txt_file}",
                "imageFile": f"industries/{slug}/images/{img_file}",
                "wordCount": len(post["text_content"].split()),
                "status": "ready"
            })
        print(f"  [OK] Industry: {cluster_name:<32} | 6 Posts Generated (Texts + Visual Cards)")

    # Save Manifest
    manifest_path = os.path.join(BASE_DIR, "posts_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nManifest successfully created: {manifest_path}")
    print(f"Total LinkedIn Posts Generated: {total_posts} (78 Offerings + 54 Industries)")

if __name__ == "__main__":
    main()

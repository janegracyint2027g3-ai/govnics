import os
import json
import re
import sys
import shutil
import base64

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MAIN_DIR = os.path.dirname(BASE_DIR)
TEMP_REPO_DIR = os.path.join(MAIN_DIR, "temp_linkedin_repo")

# Load logo as base64 data URI
logo_path = os.path.join(MAIN_DIR, "public", "logo.png")
with open(logo_path, "rb") as f:
    LOGO_BASE64 = base64.b64encode(f.read()).decode("utf-8")

print(f"Loaded logo.png (base64 size: {len(LOGO_BASE64)} bytes)")

sys.path.append(BASE_DIR)
from build_master_icp_engine import (
    STAT_REGISTER, ICP_PROFILES, ANGLES,
    generate_post_content
)

offerings_list = [
    ("regulatory-compliance", "Regulatory Compliance"),
    ("labour-employment", "Labour & Employment"),
    ("taxation-trade", "Taxation & Trade"),
    ("environmental-ehs", "Environmental & EHS"),
    ("supply-chain", "Supply Chain Governance"),
    ("export-trade", "Export & Global Trade"),
    ("licensing-permits", "Licensing & Permits"),
    ("escrow-services", "Commercial Escrow Services"),
    ("risk-management", "Enterprise Risk Management"),
    ("enterprise-governance", "Enterprise Corporate Governance"),
    ("cybersecurity-data", "Cybersecurity & Data Protection"),
    ("esg-sustainability", "ESG & Sustainability Advisory"),
    ("staffing-managed", "Staffing & Managed Compliance")
]

industries_list = [
    ("manufacturing-industrial", "Manufacturing & Industrial"),
    ("technology-electronics", "Technology & Electronics"),
    ("infrastructure-construction", "Infrastructure & Construction"),
    ("energy-utilities", "Energy & Utilities"),
    ("financial-services", "Financial Services & Banking"),
    ("healthcare-life-sciences", "Healthcare & Life Sciences"),
    ("food-processing", "Food Processing & Agriculture"),
    ("consumer-retail", "Consumer Goods & Retail"),
    ("media-services", "Media & Enterprise Services")
]

def get_svg_graphic(category_id):
    svg_map = {
        "manufacturing-industrial": '''
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="75" r="54" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>
          <circle cx="110" cy="75" r="42" fill="url(#blue_grad_mfg)" opacity="0.9"/>
          <path d="M110 45 L114 55 L124 57 L116 64 L119 74 L110 68 L101 74 L104 64 L96 57 L106 55 Z" fill="#FFFFFF"/>
          <path d="M80 115 L110 135 L140 115 V90 L110 80 L80 90 Z" fill="#1D4ED8" stroke="#60A5FA" stroke-width="2"/>
          <path d="M100 105 L108 113 L122 97" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="blue_grad_mfg" x1="68" y1="33" x2="152" y2="117" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1D4ED8"/>
              <stop offset="1" stop-color="#0B1B3D"/>
            </linearGradient>
          </defs>
        </svg>''',
        "food-processing": '''
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="75" r="56" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.5"/>
          <rect x="75" y="40" width="70" height="70" rx="16" fill="url(#food_grad)" stroke="#60A5FA" stroke-width="2"/>
          <path d="M110 50 C125 50 135 60 135 75 C135 90 120 100 110 100 C100 100 85 90 85 75 C85 60 95 50 110 50 Z" fill="#1D4ED8"/>
          <path d="M98 75 L106 83 L124 65" stroke="#38BDF8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="food_grad" x1="75" y1="40" x2="145" y2="110" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0B1B3D"/>
              <stop offset="1" stop-color="#1E40AF"/>
            </linearGradient>
          </defs>
        </svg>''',
        "cybersecurity-data": '''
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="75" r="58" stroke="#38BDF8" stroke-width="2" stroke-dasharray="5 5" opacity="0.4"/>
          <path d="M110 32 L150 48 V82 C150 108 110 125 110 125 C110 125 70 108 70 82 V48 L110 32 Z" fill="url(#cyber_grad)" stroke="#38BDF8" stroke-width="2"/>
          <rect x="98" y="70" width="24" height="20" rx="4" fill="#FFFFFF"/>
          <path d="M103 70 V62 C103 57.5 106.5 54 110 54 C113.5 54 117 57.5 117 62 V70" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          <circle cx="110" cy="79" r="2.5" fill="#1D4ED8"/>
          <defs>
            <linearGradient id="cyber_grad" x1="70" y1="32" x2="150" y2="125" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1D4ED8"/>
              <stop offset="1" stop-color="#0B1B3D"/>
            </linearGradient>
          </defs>
        </svg>''',
        "financial-services": '''
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="75" r="54" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
          <rect x="75" y="105" width="70" height="10" rx="2" fill="#1D4ED8"/>
          <rect x="80" y="48" width="60" height="8" rx="2" fill="#1D4ED8"/>
          <path d="M80 48 L110 32 L140 48 Z" fill="#0B1B3D" stroke="#60A5FA" stroke-width="1.5"/>
          <rect x="86" y="58" width="8" height="45" rx="2" fill="#38BDF8"/>
          <rect x="101" y="58" width="8" height="45" rx="2" fill="#38BDF8"/>
          <rect x="116" y="58" width="8" height="45" rx="2" fill="#38BDF8"/>
          <circle cx="110" cy="75" r="16" fill="#1D4ED8" stroke="#FFFFFF" stroke-width="2"/>
          <path d="M105 75 L108 78 L115 71" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>''',
        "esg-sustainability": '''
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="75" r="55" stroke="#34D399" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
          <circle cx="110" cy="75" r="44" fill="url(#esg_grad)"/>
          <path d="M110 48 C95 56 90 75 102 92 C108 100 118 102 124 96 C132 88 132 72 122 62 C118 56 112 50 110 48 Z" fill="#34D399"/>
          <path d="M102 92 C108 84 114 74 118 62" stroke="#065F46" stroke-width="2.5" stroke-linecap="round"/>
          <defs>
            <linearGradient id="esg_grad" x1="66" y1="31" x2="154" y2="119" gradientUnits="userSpaceOnUse">
              <stop stop-color="#064E3B"/>
              <stop offset="1" stop-color="#0B1B3D"/>
            </linearGradient>
          </defs>
        </svg>'''
    }
    
    default_svg = '''
    <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="75" r="56" stroke="#38BDF8" stroke-width="2" stroke-dasharray="5 5" opacity="0.5"/>
      <path d="M110 32 L152 48 V84 C152 110 110 128 110 128 C110 128 68 110 68 84 V48 L110 32 Z" fill="url(#def_grad)" stroke="#60A5FA" stroke-width="2"/>
      <path d="M96 76 L106 86 L126 64" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="def_grad" x1="68" y1="32" x2="152" y2="128" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1D4ED8"/>
          <stop offset="1" stop-color="#0B1B3D"/>
        </linearGradient>
      </defs>
    </svg>'''
    
    return svg_map.get(category_id, default_svg)

def build_poster_html_4x5(category_id, category_title, is_industry, post_num, p, icp):
    persona = p['persona']
    org_type = icp['target_org'].split(',')[0].strip()
    stat_metric = p['stat_metric']
    stat_desc = p['stat_desc']
    stat_src = p['stat_src']
    angle_name = p['angle_name']
    cta_action = p['cta_action']
    
    if post_num == 1:
        headline_text = f"Can Your <span class='highlight'>{org_type}</span> Produce Statutory Records During Inspection?"
    elif post_num == 2:
        headline_text = f"Empirical Audit Briefing: <span class='highlight'>{stat_metric}</span> Impacting {category_title}"
    elif post_num == 3:
        headline_text = f"3 Compliance Gaps Threatening <span class='highlight'>{persona}s</span> Across {category_title}"
    elif post_num == 4:
        headline_text = f"How Institutional Advisory Replaces <span class='highlight'>Pre-Audit Scramble</span> with Defensibility"
    elif post_num == 5:
        headline_text = f"The 72-Hour Audit Mandate: Is Your <span class='highlight'>Evidentiary Dossier</span> Ready?"
    else:
        headline_text = f"Executive GRC Diagnostic: Protect Your <span class='highlight'>{org_type}</span> Against Penalties"

    category_badge = f"{category_title.upper()} {'ADVISORY' if is_industry else 'COMPLIANCE'}"
    svg_graphic = get_svg_graphic(category_id)

    risk_items = [
        ("Fragmented Registers", "Statutory logs dispersed across plant spreadsheets and offline registers."),
        ("Contractor Misclassification", "Joint-employer liabilities under contract labour & PF regulations."),
        ("Lapsed Licenses & Filings", "Unflagged expiration windows causing abrupt operational stop-work notices."),
        ("Personal Officer Liability", "Directors & Key Managerial Personnel exposed under statutory default clauses.")
    ]

    sol_items = [
        ("Unified Digital Registers", "Centralized, timestamped regulatory documentation repository."),
        ("Multi-Tier Risk Scorecards", "Real-time visibility across facility, vendor, and entity compliance."),
        ("72-Hour Inspection SLA", "Instant statutory dossier assembly during unannounced audits."),
        ("40-Year Institutional Advisory", "Direct legal defense and secretarial audit reconciliation.")
    ]

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, height=1350">
  <title>{category_title} - {angle_name} | GOVENICS GRC Poster</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: #CBD5E1;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 30px;
    }}
    .poster-container {{
      width: 1080px;
      height: 1350px;
      background: linear-gradient(175deg, #FFFFFF 0%, #F8FAFC 45%, #EFF6FF 100%);
      position: relative;
      overflow: hidden;
      padding: 64px 72px 52px 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 35px 80px rgba(11, 27, 61, 0.22);
      border: 1px solid #BFDBFE;
    }}
    .pattern-dots {{
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: radial-gradient(#1D4ED8 1.5px, transparent 1.5px);
      background-size: 28px 28px;
      opacity: 0.04;
      pointer-events: none;
    }}
    .top-accent-line {{
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 8px;
      background: linear-gradient(90deg, #0B1B3D 0%, #1D4ED8 50%, #38BDF8 100%);
    }}
    /* SECTION A: Brand Header with Official GOVENICS Logo */
    .header-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 22px;
      border-bottom: 2px solid #E2E8F0;
      position: relative;
      z-index: 2;
    }}
    .brand-cluster {{
      display: flex;
      align-items: center;
      gap: 18px;
    }}
    .brand-logo-img {{
      height: 52px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 2px 6px rgba(11, 27, 61, 0.08));
    }}
    .brand-divider {{
      width: 2px;
      height: 40px;
      background: #CBD5E1;
      border-radius: 2px;
    }}
    .brand-heritage {{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}
    .heritage-top {{
      font-size: 13px;
      font-weight: 700;
      color: #475569;
      letter-spacing: 0.02em;
    }}
    .heritage-bottom {{
      font-size: 11px;
      font-weight: 800;
      color: #1D4ED8;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-top: 2px;
    }}
    .domain-tag {{
      background: #EFF6FF;
      border: 1.5px solid #BFDBFE;
      color: #1D4ED8;
      padding: 9px 22px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }}
    /* SECTION B: Headline */
    .headline-zone {{
      margin-top: 24px;
      position: relative;
      z-index: 2;
    }}
    .headline-text {{
      font-size: 40px;
      font-weight: 900;
      line-height: 1.18;
      color: #0B1B3D;
      letter-spacing: -0.02em;
      max-width: 934px;
    }}
    .highlight {{
      color: #1D4ED8;
      background: linear-gradient(180deg, transparent 65%, #DBEAFE 65%);
      display: inline-block;
    }}
    /* SECTION C & D: Intel Stat + Visual */
    .intel-visual-row {{
      margin-top: 22px;
      display: grid;
      grid-template-columns: 1.65fr 1fr;
      gap: 22px;
      align-items: stretch;
      position: relative;
      z-index: 2;
    }}
    .stat-card-box {{
      background: #FFFFFF;
      border: 1.5px solid #BFDBFE;
      border-left: 6px solid #1D4ED8;
      border-radius: 16px;
      padding: 24px 28px;
      box-shadow: 0 8px 24px rgba(29, 78, 216, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .stat-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #DBEAFE;
      color: #1E40AF;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 9999px;
      width: fit-content;
      margin-bottom: 12px;
    }}
    .stat-number {{
      font-size: 44px;
      font-weight: 900;
      color: #1D4ED8;
      letter-spacing: -0.02em;
      line-height: 1.05;
      margin-bottom: 8px;
    }}
    .stat-context {{
      font-size: 16px;
      font-weight: 600;
      color: #334155;
      line-height: 1.4;
      margin-bottom: 12px;
    }}
    .stat-citation {{
      font-size: 12px;
      font-weight: 700;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 6px;
      border-top: 1px solid #F1F5F9;
      padding-top: 8px;
    }}
    .visual-art-box {{
      background: linear-gradient(135deg, #0B1B3D 0%, #1E3A8A 100%);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      border: 1.5px solid #1E40AF;
      box-shadow: 0 10px 25px rgba(11, 27, 61, 0.2);
    }}
    .visual-label {{
      position: absolute;
      top: 14px;
      left: 16px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #93C5FD;
    }}
    /* SECTION E: Risks */
    .section-zone {{
      margin-top: 20px;
      position: relative;
      z-index: 2;
    }}
    .section-title-tag {{
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.1em;
      color: #1D4ED8;
      text-transform: uppercase;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .risk-card {{
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #EF4444;
      border-radius: 12px;
      padding: 14px 18px;
      box-shadow: 0 3px 10px rgba(15, 23, 42, 0.03);
    }}
    .risk-heading {{
      font-size: 14px;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 4px;
    }}
    .risk-desc-text {{
      font-size: 12.5px;
      font-weight: 500;
      color: #475569;
      line-height: 1.35;
    }}
    /* SECTION F: Capabilities */
    .sol-card {{
      background: #EFF6FF;
      border: 1px solid #BFDBFE;
      border-left: 4px solid #1D4ED8;
      border-radius: 12px;
      padding: 13px 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }}
    .sol-icon {{
      width: 20px;
      height: 20px;
      background: #1D4ED8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 900;
      flex-shrink: 0;
      margin-top: 1px;
    }}
    .sol-heading {{
      font-size: 13.5px;
      font-weight: 800;
      color: #0B1B3D;
    }}
    .sol-desc-text {{
      font-size: 12px;
      font-weight: 500;
      color: #334155;
      line-height: 1.35;
    }}
    /* SECTION G: CTA */
    .cta-banner {{
      margin-top: 20px;
      background: linear-gradient(135deg, #0B1B3D 0%, #1D4ED8 100%);
      border-radius: 14px;
      padding: 20px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
      position: relative;
      z-index: 2;
      box-shadow: 0 10px 25px rgba(29, 78, 216, 0.25);
    }}
    .cta-left {{
      display: flex;
      flex-direction: column;
    }}
    .cta-main {{
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.01em;
    }}
    .cta-prompt {{
      font-size: 13px;
      font-weight: 600;
      color: #93C5FD;
      margin-top: 3px;
    }}
    .cta-btn {{
      background: #FFFFFF;
      color: #0B1B3D;
      padding: 12px 24px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    /* SECTION H: Footer */
    .footer-bar {{
      margin-top: 18px;
      padding-top: 16px;
      border-top: 2px solid #E2E8F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 700;
      color: #64748B;
      position: relative;
      z-index: 2;
    }}
    .footer-link {{
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 0.08em;
      color: #0B1B3D;
    }}
    .footer-caps {{
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1D4ED8;
    }}
  </style>
</head>
<body>

<div class="poster-container">
  <div class="pattern-dots"></div>
  <div class="top-accent-line"></div>

  <!-- SECTION A: Brand Header with Authentic GOVENICS Logo -->
  <header class="header-bar">
    <div class="brand-cluster">
      <img src="data:image/png;base64,{LOGO_BASE64}" alt="GOVENICS GRC Consulting" class="brand-logo-img" />
      <div class="brand-divider"></div>
      <div class="brand-heritage">
        <span class="heritage-top">A Division of ISI Group</span>
        <span class="heritage-bottom">Established 1985 • Enterprise GRC</span>
      </div>
    </div>
    <div class="domain-tag">{category_badge}</div>
  </header>

  <!-- SECTION B: Strong Headline -->
  <div class="headline-zone">
    <h1 class="headline-text">{headline_text}</h1>
  </div>

  <!-- SECTION C & D: Key Verified Statistic & Conceptual Visual -->
  <div class="intel-visual-row">
    <div class="stat-card-box">
      <div>
        <div class="stat-pill">Verified Regulatory Intel</div>
        <div class="stat-number">{stat_metric}</div>
        <div class="stat-context">{stat_desc}</div>
      </div>
      <div class="stat-citation">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>Source: {stat_src}</span>
      </div>
    </div>

    <div class="visual-art-box">
      <div class="visual-label">Defensibility Model</div>
      {svg_graphic}
    </div>
  </div>

  <!-- SECTION E: Core Industry Risks -->
  <div class="section-zone">
    <div class="section-title-tag">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Operational Failure Modes & Statutory Exposures
    </div>
    <div class="grid-2col">
      <div class="risk-card">
        <div class="risk-heading">{risk_items[0][0]}</div>
        <div class="risk-desc-text">{risk_items[0][1]}</div>
      </div>
      <div class="risk-card">
        <div class="risk-heading">{risk_items[1][0]}</div>
        <div class="risk-desc-text">{risk_items[1][1]}</div>
      </div>
      <div class="risk-card">
        <div class="risk-heading">{risk_items[2][0]}</div>
        <div class="risk-desc-text">{risk_items[2][1]}</div>
      </div>
      <div class="risk-card">
        <div class="risk-heading">{risk_items[3][0]}</div>
        <div class="risk-desc-text">{risk_items[3][1]}</div>
      </div>
    </div>
  </div>

  <!-- SECTION F: How GOVENICS Helps -->
  <div class="section-zone">
    <div class="section-title-tag">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      How GOVENICS Establishes Enterprise Accountability
    </div>
    <div class="grid-2col">
      <div class="sol-card">
        <div class="sol-icon">&#10003;</div>
        <div>
          <div class="sol-heading">{sol_items[0][0]}</div>
          <div class="sol-desc-text">{sol_items[0][1]}</div>
        </div>
      </div>
      <div class="sol-card">
        <div class="sol-icon">&#10003;</div>
        <div>
          <div class="sol-heading">{sol_items[1][0]}</div>
          <div class="sol-desc-text">{sol_items[1][1]}</div>
        </div>
      </div>
      <div class="sol-card">
        <div class="sol-icon">&#10003;</div>
        <div>
          <div class="sol-heading">{sol_items[2][0]}</div>
          <div class="sol-desc-text">{sol_items[2][1]}</div>
        </div>
      </div>
      <div class="sol-card">
        <div class="sol-icon">&#10003;</div>
        <div>
          <div class="sol-heading">{sol_items[3][0]}</div>
          <div class="sol-desc-text">{sol_items[3][1]}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION G: Actionable Call to Action -->
  <div class="cta-banner">
    <div class="cta-left">
      <div class="cta-main">Schedule an Executive Statutory Exposure Diagnostic</div>
      <div class="cta-prompt">{cta_action}</div>
    </div>
    <div class="cta-btn">
      <span>Request Review</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1B3D" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </div>
  </div>

  <!-- SECTION H: Professional Footer -->
  <footer class="footer-bar">
    <div class="footer-link">WWW.GOVENICS.COM</div>
    <div class="footer-caps">GRC • RISK • COMPLIANCE • ESG • REGULATORY ADVISORY</div>
  </footer>
</div>

</body>
</html>"""
    return html_content

def main():
    print("=" * 70)
    print("RE-GENERATING 132 4:5 POSTERS WITH AUTHENTIC GOVENICS LOGO")
    print("=" * 70)
    
    total_generated = 0
    all_domains = [(cid, ctitle, False) for cid, ctitle in offerings_list] + \
                  [(cid, ctitle, True) for cid, ctitle in industries_list]

    for category_id, category_title, is_industry in all_domains:
        sub_dir = "industries" if is_industry else "offerings"
        images_dir = os.path.join(BASE_DIR, sub_dir, category_id, "images")
        os.makedirs(images_dir, exist_ok=True)
        icp = ICP_PROFILES[category_id]
        
        for i in range(6):
            post_num = i + 1
            p = generate_post_content(category_id, category_title, is_industry, i)
            card_html = build_poster_html_4x5(category_id, category_title, is_industry, post_num, p, icp)
            
            card_path = os.path.join(images_dir, f"card_{post_num}.html")
            with open(card_path, "w", encoding="utf-8") as f:
                f.write(card_html)
            total_generated += 1
            
        print(f"Generated 6 posters with official logo for: {category_title}")

    print(f"\n[OK] Re-generated all {total_generated} 4:5 infographic posters with official GOVENICS logo!")

if __name__ == "__main__":
    main()
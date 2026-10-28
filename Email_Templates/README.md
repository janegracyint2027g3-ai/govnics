# GOVENICS GRC — Enterprise Email Content & Template System

Welcome to the **GOVENICS GRC Enterprise Email Content & Template Library**, a production-grade, multi-industry communication architecture designed for enterprise governance, risk, statutory compliance, and digital trust advisory.

Built specifically for **GOVENICS GRC** (a specialized division of Industrial Security Investigators (P) Ltd. — ISI Group, est. 1985; CERT-In Empanelled), this system contains **54 verified, self-contained HTML email templates** spanning 9 industry clusters and 6 strategic communication types.

---

## 1. Quick Start & Visual Preview

To inspect, filter, and preview all 54 email templates interactively in desktop (600px) and mobile (375px) viewports:

1. Navigate to the [`preview/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/preview) directory.
2. Open [`index.html`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/preview/index.html) directly in any modern web browser (works via double-click on Windows without requiring a local web server).
3. Filter templates by **Industry Cluster** or **Email Type**, review subject line options (&le; 6 words), and inspect live rendered emails.

---

## 2. Directory Architecture

```
Email_Templates/
├── assets/
│   ├── css/
│   └── images/
│       └── header-banner.jpg          # Branded navy/gold header banner asset
├── components/
│   ├── base-layout.html              # Reference outer table wrapper
│   ├── cta-button.html               # Standardized navy blue CTA button
│   ├── footer-banner.html            # Credential footer (ISI Group, CERT-In, address)
│   ├── header-banner.html            # Header hero banner block
│   └── stat-cards.html               # 4-card responsive assessment grid
├── config/
│   ├── email-config.ts               # Master TypeScript configuration & registry
│   └── generation-manifest.json      # Structured manifest of all 54 templates
├── preview/
│   └── index.html                    # Interactive preview gallery
├── templates/
│   ├── bfsi/                         # BFSI & Financial Services (6 templates)
│   ├── manufacturing/                # Manufacturing & Industrial (6 templates)
│   ├── technology/                   # Technology & Electronics (6 templates)
│   ├── infrastructure/               # Infrastructure & Construction (6 templates)
│   ├── energy/                       # Energy & Utilities (6 templates)
│   ├── healthcare/                   # Healthcare & Life Sciences (6 templates)
│   ├── food-processing/              # Food Processing (6 templates)
│   ├── consumer-retail/              # Consumer & Retail (6 templates)
│   └── media-services/               # Media & Services (6 templates)
├── generate_library.py               # Deterministic template generation & validation script
├── generate_preview.py               # Standalone preview gallery generator
├── IMPLEMENTATION_REPORT.md          # Comprehensive executive audit & verification report
└── README.md                         # This documentation
```

---

## 3. Template Inventory Matrix (54 Templates)

Every industry folder contains all 6 core communication types as complete, self-contained, email-client-safe HTML files:

| Industry Cluster | Subindustries & Domains Covered | Key Statutory Frameworks | Folder |
| :--- | :--- | :--- | :--- |
| **BFSI & Financial Services** | Banking, NBFCs, Payments, Wealth Mgmt, Fintech | RBI Master Directions, SEBI LODR, IRDAI, PMLA | [`templates/bfsi/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/bfsi) |
| **Manufacturing & Industrial** | Automotive, Heavy Machinery, Defence, Chemicals | Factories Act 1948, ISO 45001, PESO, MSIHC | [`templates/manufacturing/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/manufacturing) |
| **Technology & Electronics** | IT/BPM, SaaS, Telecom, Clean Mobility, InfoSec | DPDP Act 2023, ISO 27001:2022, SOC 2, CERT-In | [`templates/technology/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/technology) |
| **Infrastructure & Construction** | Real Estate, Highways, Cement, Steel, Ports | RERA Act, BOCW Act, CPCB, NHAI Directives | [`templates/infrastructure/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/infrastructure) |
| **Energy & Utilities** | Renewables, Thermal, Power Grid, Mining, Oil/Gas | CERC Grid Codes, Electricity Act 2003, BRSR | [`templates/energy/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/energy) |
| **Healthcare & Life Sciences** | Hospitals, Pharma, Medical Devices, Clinical Labs | NABH 5th Ed, CDSCO, Bio-Medical Waste, DPDP | [`templates/healthcare/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/healthcare) |
| **Food Processing** | Packaged Goods, Dairy, Beverages, Cold Chain | FSSAI Act 2006, ISO 22000, Legal Metrology | [`templates/food-processing/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/food-processing) |
| **Consumer & Retail** | Store Chains, E-Commerce, Apparel, Durables | Shop & Establishment, Metrology, CPA 2019, EPR | [`templates/consumer-retail/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/consumer-retail) |
| **Media & Services** | Higher Education, Hospitality, Media, Aviation | NAAC, UGC, DGCA Safety Directives, MIB, DPDP | [`templates/media-services/`](file:///c:/Users/janeg/Downloads/govnics-main/govnics-main/Email_Templates/templates/media-services) |

### The 6 Communication Types per Cluster

1. `welcome.html` — **Welcome Email**: Welcomes new subscribers or inbound leads, sets institutional expectations, highlights parent legacy (est. 1985). Maximum 180 words.
2. `promotional.html` — **Promotional Email**: Introduces specific advisory offerings addressing immediate compliance exposures. Maximum 125 words, includes 4 stat cards.
3. `business-value.html` — **Business-Value Email**: Articulates the executive business case, board governance, and risk containment. Maximum 150 words, includes 4 stat cards.
4. `advertising.html` — **Advertising / Campaign Email**: Aligns with upcoming audit cycles or regulatory inspection windows. Maximum 125 words, includes 4 stat cards.
5. `re-engagement.html` — **Re-Engagement Email**: Reconnects with inactive contacts using fresh regulatory intelligence without guilt. Maximum 120 words, text-focused.
6. `lead-generation.html` — **Lead-Generation / Assessment Email**: Proposes a structured, confidential compliance gap assessment. Maximum 130 words, includes 4 stat cards.

---

## 4. Editorial & Writing Rules

### Zero Banned Words Guarantee
To ensure institutional credibility, the following generic marketing buzzwords are strictly forbidden and validated via continuous code gates:
- ❌ `Unlock`
- ❌ `Transform`
- ❌ `Accelerate`
- ❌ `Synergy`
- ❌ `Game-changer`
- ❌ `Delve`

### Subject Line Constraints
- Every template specifies **3 distinct subject line options** (Direct, Conversational, Curiosity-Led) as an HTML header comment.
- All subject lines are strictly **&le; 6 words**.

### SPICED Communication Framework
All copy is structured using the SPICED model (applied internally without printing labels in the email body):
- **S (Situation)**: Grounds the message in the recipient's industry and regulatory context.
- **P (Pain)**: Identifies concrete operational challenges (e.g., fragmented registers, contractor non-compliance).
- **I (Impact)**: Quantifies organizational consequences (penalties, inspection stop-work orders, license delays).
- **C (Critical Event)**: Highlights regulatory inspection cycles, annual returns, or compliance deadlines.
- **D (Decision)**: Directs the recipient to one clear next step (e.g., confidential review or advisory discussion).

### Stat Cards & Illustrative Data
All metrics in stat cards represent **indicative assessment dimensions** rather than guaranteed claims. Every email with stat cards includes the mandatory disclaimer:
> *\* Figures shown are indicative assessment dimensions, not guaranteed client outcomes.*

---

## 5. Personalization Tokens Reference

The templates use standardized tokens compatible with SendGrid, HubSpot, Mailchimp, Salesforce Marketing Cloud, and Google Apps Script:

| Token | Description | Example Replacement |
| :--- | :--- | :--- |
| `{{FIRST_NAME}}` | Recipient's first name | `Suresh` |
| `{{COMPANY_NAME}}` | Target enterprise or institution name | `Apex FinCorp Ltd.` |
| `{{UNSUBSCRIBE_URL}}` | Mandatory one-click unsubscribe URL | `https://govnics.com/unsub?id=123` |

---

## 6. Brand Credentials & Institutional Pedigree

All templates include validated brand identity constants:
- **Brand Entity**: GOVENICS GRC (Enterprise GRC Advisory)
- **Legal Entity**: Industrial Security Investigators (P) Ltd. (ISI Group)
- **Institutional Heritage**: Established 1985 (39+ years of operational excellence)
- **Technical Accreditation**: CERT-In Empanelled Advisory
- **Physical Headquarters**: No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai, Tamil Nadu 600092, India
- **Inbound Desk**: `contact@govenics.grc`
- **Verified URLs**:
  - Live Web Hub: `https://govnics-murex.vercel.app`
  - Contact & Assessment: `https://govnics-murex.vercel.app/contact`
  - Regulatory Services: `https://govnics-murex.vercel.app/services/regulatory-compliance`
  - Cybersecurity Desk: `https://govnics-murex.vercel.app/cybersecurity`
  - ESG & Sustainability: `https://govnics-murex.vercel.app/esg`
  - Accreditation Services: `https://govnics-murex.vercel.app/services/accreditation-services`
  - Establishment Services: `https://govnics-murex.vercel.app/sgrc/services/establishment-compliances`

---

## 7. Email Client Compatibility & Asset Hosting

- **Markup Architecture**: Standards-compliant table structure (`cellpadding="0" cellspacing="0" border="0"`), inline CSS, zero JavaScript.
- **Client Testing**: Formatted for Outlook (MSO), Apple Mail, Gmail, Yahoo Mail, and iOS/Android mobile clients.
- **Header Banner Image**:
  - For local development and preview, templates reference `../../assets/images/header-banner.jpg`.
  - For production ESP sending, update image URLs to point to your live CDN or website host:
    `https://govnics-murex.vercel.app/assets/header-banner.jpg` (or your ESP asset library).

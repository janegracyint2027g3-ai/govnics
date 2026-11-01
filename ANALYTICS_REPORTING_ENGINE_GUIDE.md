# GOVENICS – Automated Executive Analytics Reporting & Email Distribution Engine

## 1. Overview & System Architecture

The **GOVENICS Automated Executive Analytics Reporting Engine** is an institutional-grade reporting system designed to deliver boardroom-quality analytics briefs directly to executive leadership email inboxes at regular intervals.

### Deliverables Included:
1. **`Email_Templates/analytics/Daily_Analytics_Email.html`** — Daily performance brief.
2. **`Email_Templates/analytics/Weekly_Analytics_Email.html`** — Weekly executive overview with 7-day velocity charts.
3. **`Email_Templates/analytics/Monthly_Analytics_Email.html`** — Comprehensive monthly strategic review and scorecard.
4. **`govenics-analytics-reporting-engine.js`** — Modular, standalone Google Apps Script reporting engine.
5. **`govenics-apps-script.js`** — Integrated production Apps Script file combining data collection, webhooks, resume archiving, and the automated reporting engine.

---

## 2. Executive Design & Visual Hierarchy

The reports adhere strictly to the McKinsey / Power BI / Tableau executive boardroom aesthetic:
- **Dark Navy Executive Header**: Gradient (`#0B1B3D` to `#0C2D9C`) with high-contrast badge pills and generation metadata.
- **Brand Sub-Mark**: `GOVENICS GRC | A Division of ISI Group | Established 1985`.
- **Target Property**: `https://govnics-murex.vercel.app/`.
- **Light Content Background**: `#f8fafc` and `#ffffff` with subtle borders (`#e2e8f0`).
- **Responsive Width**: 680px constrained layout for universal email client compatibility (Outlook, Gmail mobile/desktop, Apple Mail).
- **Embedded Visual Charts**: Powered by QuickChart.io rendering email-client-compatible static PNG images with zero client-side JavaScript dependency.

---

## 3. 12-Metric Executive KPI Dashboard

Every report includes a 12-card scorecard with previous period comparisons and percentage shifts:

| KPI | Metric Name | Definition & Business Value | Favorable Direction |
|---|---|---|---|
| **01** | **Total Visitors** | Total unique visitors + repeat visits during the reporting window | &uarr; Higher |
| **02** | **Unique Visitors** | Distinct individuals accessing the site | &uarr; Higher |
| **03** | **Total Sessions** | Discrete browse interactions with >30 min inactivity timeout | &uarr; Higher |
| **04** | **Returning Visitors** | Repeat executive visitors indicating consideration-stage intent | &uarr; Higher |
| **05** | **New Visitors** | First-time discovery traffic | &uarr; Higher |
| **06** | **Total Leads Generated** | All inbound form submissions, bookings, and enquiries | &uarr; Higher |
| **07** | **Qualified Leads** | Enterprise inquiries meeting turnover and holding structure criteria | &uarr; Higher |
| **08** | **Conversion Rate** | Overall lead capture rate (`(Total Leads / Visitors) * 100`) | &uarr; Higher |
| **09** | **Avg Session Duration** | Average time spent reviewing advisory offerings | &uarr; Higher |
| **10** | **Bounce Rate** | Single-page interactions without engagement | &darr; **Lower is Favorable** (Green) |
| **11** | **Total Page Views** | Aggregate content impressions across the application | &uarr; Higher |
| **12** | **Pages Per Session** | Depth of content exploration per visit | &uarr; Higher |

---

## 4. End-to-End Conversion Funnel

The reports track drop-off and conversion rates across 4 sequential stages:
1. **Stage 1: Website Reach** — Total Visitors (100% baseline).
2. **Stage 2: Active Engagement** — Visitors with session duration >60 seconds or multiple pageviews (~50.0% of reach).
3. **Stage 3: Inbound Leads** — Visitors submitting Strategy Sessions, Consultations, or Inquiries (~6.96% of reach).
4. **Stage 4: Qualified Pipeline** — Valid enterprise holding groups, CFOs, or plant directors (~62.8% of leads).

---

## 5. Visual Charts & Trend Telemetry

Embedded via QuickChart API without client-side scripts:
- **Hourly / 7-Day / 30-Day Velocity Line Chart**: Compares visitor growth and session volume.
- **Lead Submission Breakdown Bar Chart**: Visualizes distribution across Strategy Sessions, Inbound Advisory, Consultation Requests, Course Enquiries, and Alliances.
- **Acquisition Channel Doughnut Chart**: Categorizes Direct, Organic Search, LinkedIn Organic, Partner Referrals, and Paid Campaigns.

---

## 6. Automatic Scheduling Triggers (8:00 AM IST)

| Report | Trigger Frequency | Execution Time | Reporting Window |
|---|---|---|---|
| **Daily Report** | Every day | **8:00 AM IST** | Previous calendar day (00:00 – 23:59 IST) |
| **Weekly Report** | Every Monday | **8:00 AM IST** | Previous Monday to Sunday (Week-over-Week) |
| **Monthly Report** | 1st of every month | **8:00 AM IST** | Previous complete calendar month |

---

## 7. Delivery Logging & Duplicate Protection

Every dispatch is recorded in the **`Analytics_Email_Log`** tab in Sheet 1:
- **Report ID**: Unique deterministic key (e.g. `DAILY_2026-10-31`, `WEEKLY_2026_W43`, `MONTHLY_2026_10`).
- **Duplicate Protection**: Before sending, the engine checks `Analytics_Email_Log`. If an ID is marked `DELIVERED`, duplicate execution is safely prevented.
- **Audit Columns**: `[Report ID, Report Type, Reporting Period, Generated Date, Recipient, Email Subject, Delivery Status, Delivery Timestamp, Error Message]`.

---

## 8. Deployment & Setup Instructions

### Option A: One-Click Update in Google Sheets
1. Open your master Google Sheet:
   [GOVENICS Sheet 1 (Data Collection)](https://docs.google.com/spreadsheets/d/1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs/edit)
2. Go to **Extensions** &rarr; **Apps Script**.
3. Replace the script editor code with the updated contents of **`govenics-apps-script.js`**.
4. Click **Save** (`Ctrl + S`).
5. Run the function **`installReportingTriggers()`** once to register all 8:00 AM IST triggers automatically.

### Option B: Interactive Menu in Google Sheets
Refresh your Google Sheet. The custom menu **🚀 GOVENICS DATA ENGINE** will display:
- `📊 Send Sample Daily Executive Brief`
- `📅 Send Sample Weekly Executive Brief`
- `📆 Send Sample Monthly Strategic Digest`
- `⏰ Set Up Automated Daily/Weekly/Monthly Triggers`

---

## 9. Testing & Validation

To test dispatch without waiting for schedule:
- Run `testDailyReport()` in the Apps Script debugger.
- Run `testWeeklyReport()`.
- Run `testMonthlyReport()`.
- Or run `testAllAnalyticsReports()` to dispatch all three previews in TEST_MODE to `poojasri.aram@gmail.com`.

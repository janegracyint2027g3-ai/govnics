# GOVENICS Phase 5 — Regulatory Knowledge Acquisition & Content Engineering API Documentation

The Phase 5 Regulatory Knowledge Engine provides programmatic access to official statutory sources, section-level legal provisions, Central vs State applicability rules, legislative amendments, trust-gate verification workflows, and industry-specific compliance collections across all 36 Indian jurisdictions (Central, 28 States, and 8 Union Territories).

---

## Base Path
All regulatory endpoints are served relative to the API root:
`/api/regulatory/`

---

## Endpoints

### 1. Regulatory Source Registry
**`GET /api/regulatory/sources`**  
Retrieves authorized official government portals, gazettes, and ministry repositories.

#### Query Parameters
- `jurisdiction` *(optional)*: Filter by jurisdiction level (`Central`, `State`, `Union Territory`) or specific state name (e.g. `Maharashtra`, `Delhi`).
- `offering` *(optional)*: Filter by monitored GOVENICS offering slug (e.g. `environmental-ehs`, `taxation-trade`).

#### Sample Response
```json
{
  "success": true,
  "count": 48,
  "data": [
    {
      "sourceId": "SRC-CEN-001",
      "authorityName": "Legislative Department, Ministry of Law and Justice",
      "portalTitle": "India Code Digital Repository",
      "officialUrl": "https://www.indiacode.nic.in/",
      "jurisdictionLevel": "Central",
      "ministryOrDepartment": "Ministry of Law and Justice",
      "trustRating": "Verified Official Government Portal",
      "monitoredOfferings": ["regulatory-compliance", "enterprise-governance", "labour-employment", "environmental-ehs"],
      "rateLimitMs": 2000,
      "isActive": true
    }
  ]
}
```

---

### 2. Structured Section-Level Legal Provisions
**`GET /api/regulatory/provisions`**  
Returns structured legal records parsed down to Act → Rule → Section → Clause → Obligation → Evidence → Deadline → Penalty.

#### Query Parameters
- `offering` *(optional)*: Filter by offering category (e.g. `cybersecurity-data`, `labour-employment`).
- `jurisdiction` *(optional)*: Filter by jurisdiction (e.g. `India (Central)`, `Maharashtra`, `Delhi`).
- `status` *(optional)*: Filter by verification status (default returns verified primary sources).

#### Sample Response
```json
{
  "success": true,
  "count": 9,
  "data": [
    {
      "provisionId": "PRV-DPDP-SEC006",
      "actShortTitle": "DPDP Act 2023",
      "actFullTitle": "Digital Personal Data Protection Act, 2023",
      "sectionNumber": "Section 6",
      "sectionTitle": "Consent of Data Principal",
      "clauseOrSubSection": "S.6(1) — Free, specific, informed, unconditional, unambiguous consent",
      "provisionText": "A Data Fiduciary may process the personal data of a Data Principal only upon her consent...",
      "complianceObligation": "Obtain explicit, purpose-specific, revocable consent before any personal data processing.",
      "evidenceRequired": [
        "Consent Management Platform (CMP) logs",
        "Timestamped consent records per Data Principal",
        "Consent withdrawal mechanism audit trail"
      ],
      "deadlineOrFrequency": "Before first data processing event; re-consent required on purpose change",
      "penaltyOrConsequence": "Non-consensual processing → adjudication by Data Protection Board → penalty up to ₹250 Crores",
      "jurisdictionLevel": "Central",
      "verificationStatus": "Verified Primary Source",
      "trustGateStatus": "Approved"
    }
  ]
}
```

---

### 3. Provision Extraction & Staging Intake
**`POST /api/regulatory/extract`**  
Ingests candidate statutory text extracted by AI agents or submitted by researchers, assigns an immutable provision ID, and stages it for certified counsel verification.

#### Request Body
```json
{
  "actShortTitle": "Minimum Wages Act 1948",
  "actFullTitle": "The Minimum Wages Act, 1948",
  "sectionNumber": "Section 12",
  "sectionTitle": "Payment of minimum rates of wages",
  "provisionText": "Where in respect of any scheduled employment a minimum rate of wages has been fixed under this Act, the employer shall pay to every employee engaged in such scheduled employment wages at a rate not less than the minimum rate of wages fixed by such notification for that class of employees...",
  "complianceObligation": "Disburse statutory minimum wage without unauthorized deductions.",
  "evidenceRequired": ["Wage register Form IV", "Bank transfer scrolls", "Salary slips"],
  "deadlineOrFrequency": "Monthly on or before the 7th/10th day",
  "penaltyOrConsequence": "Section 22: Imprisonment up to 6 months or fine up to ₹500, or both.",
  "jurisdictionLevel": "Central",
  "applicableJurisdictions": ["India (Central)", "All States"],
  "offeringCategory": "labour-employment",
  "regulatoryAuthority": "Ministry of Labour and Employment / State Labour Commissionerates",
  "officialSourceUrl": "https://labour.gov.in/"
}
```

#### Response
```json
{
  "success": true,
  "message": "Provision extracted and queued in Legal Staging for certified counsel verification.",
  "provisionId": "PRV-MINIMU-SEC12-4821",
  "trustGateStatus": "Needs Legal Review"
}
```

---

### 4. Central vs State Applicability & Amendment Tracker
**`GET /api/regulatory/applicability`**  
Returns documented legal conflict resolutions where State rules impose more stringent conditions than Central statutes, as well as legislative amendment tracking.

#### Query Parameters
- `type`: `mappings` (Central vs State conflicts) or `amendments` (amendment tracking).
- `status`: For amendments, filter by `Draft Rules Issued`, `Enacted`, etc.

#### `POST /api/regulatory/applicability`
Calculates state-specific overrides for a corporate profile:
```json
{
  "headcount": 650,
  "states": ["Maharashtra", "Tamil Nadu", "Delhi"],
  "industry": "Manufacturing & Industrial"
}
```

---

### 5. Legal Verification & Trust Gate Audit Trail
**`GET /api/regulatory/verification`**  
Returns provisions pending legal review and the immutable cryptographic audit trail.

**`POST /api/regulatory/verification`**  
Approves a staged provision and moves it into production retrieval.
```json
{
  "provisionId": "PRV-MINIMU-SEC12-4821",
  "reviewerName": "Adv. Rajesh Kumar (Bar Council No. D/1428/2008)",
  "reviewerNotes": "Verified against Official Gazette Notification No. S.O. 1827(E)."
}
```

---

### 6. E-Library Offering E-Books
**`GET /api/regulatory/elibrary`**  
Returns the catalog of 12 authoritative masterclass e-books (one for each GOVENICS offering), including 12-chapter outlines, publication dates, and download metadata.

#### Query Parameters
- `offering` *(optional)*: Filter by offering slug (e.g. `cybersecurity-data`, `esg-sustainability`).

---

### 7. Real-Time Coverage Statistics
**`GET /api/regulatory/coverage`**  
Calculates real-time coverage indices across Central, 28 States, and 8 Union Territories.

#### Sample Response
```json
{
  "success": true,
  "summary": {
    "totalJurisdictions": 37,
    "totalRegisteredPortals": 48,
    "totalDocumentedEnactments": 482,
    "totalStructuredProvisions": 9,
    "verifiedProvisions": 9,
    "pendingReviewProvisions": 0,
    "averageCoveragePercentage": 84.6,
    "offeringEbooksPublished": 12
  }
}
```

---

### 8. Industry Regulatory Collections
**`GET /api/regulatory/industry`**  
Provides full compliance taxonomies for all 18 industry sectors: primary regulators, central acts, state mandates, licensing requirements, EHS critical controls, audit frequencies, and penalty exposures.

#### Query Parameters
- `slug` *(optional)*: Return specific industry (e.g. `manufacturing-industrial`, `bfsi-fintech`, `global-capability-centres`).
- `search` *(optional)*: Search across industry titles and acts.


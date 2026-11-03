# GOVENICS Phase 4: API & Service Documentation

## Overview

Phase 4 introduces modular serverless endpoints for multi-agent AI orchestration, compliance intelligence, risk assessment, document intelligence, regulatory tracking, action remediation, and tenant workspace isolation.

---

### 1. Central Multi-Agent Orchestration
* **Endpoint:** `POST /api/knowledge/orchestrate`
* **Description:** Identifies intent, selects the appropriate specialist or cross-functional agent (from the 20-agent registry), queries the verified Knowledge Hub, and synthesizes cited responses.
* **Request Payload:**
```json
{
  "query": "What is the penalty for failure to prevent data breach under DPDP Act?",
  "selectedAgentId": null,
  "userContext": {
    "orgId": "ORG-GOVENICS-DEMO"
  }
}
```
* **Response:**
```json
{
  "success": true,
  "orchestrationId": "ORCH-1730635200000-412",
  "agent": {
    "agentId": "agent-cyber-priv",
    "agentName": "Cybersecurity & Privacy Agent",
    "roleTitle": "Chief Privacy Officer & Information Security Lead"
  },
  "routing": {
    "intentDetected": "cybersecurity_privacy",
    "confidenceScore": 0.623,
    "jurisdictionDetected": { "country": "India", "state": "Central" }
  },
  "answer": "...",
  "citations": [...]
}
```

---

### 2. Intelligent Compliance Checklist Generator
* **Endpoint:** `POST /api/compliance/intelligent-checklist`
* **Description:** Evaluates jurisdiction, headcount, turnover, operations, and exports to generate a customized 15-field statutory compliance checklist.
* **Request Payload:**
```json
{
  "country": "IN",
  "state": "Maharashtra",
  "industrySector": "Manufacturing & Industrial",
  "employeeCount": 1200,
  "hasHazardousProcesses": true,
  "hasImportExport": true
}
```

---

### 3. Compliance Gap Assessment Engine
* **Endpoint:** `POST /api/compliance/gap-assessment`
* **Description:** Compares declared status and documentary evidence against requirements, calculating inherent risk, control effectiveness, and residual risk.
* **Request Payload:**
```json
{
  "organizationName": "Acme Industrial Ltd",
  "evaluationItems": [
    {
      "checklistId": "CHK-2026-0001",
      "complianceRequirement": "Monthly EPFO ECR Challan",
      "complianceStatus": "Non-Compliant",
      "riskLevel": "High"
    }
  ]
}
```

---

### 4. Enterprise Risk Register & 5x5 Heatmap
* **Endpoint:** `GET & POST /api/risk/register`
* **Description:** Manages the enterprise risk register, calculates Inherent (L x I) vs Residual risk scores, and populates 5x5 heatmap coordinates.

---

### 5. Document Intelligence & Clause Extraction
* **Endpoint:** `POST /api/compliance/document-intelligence`
* **Description:** Non-destructively parses agreements, SOPs, and policies to extract mandatory obligations, detect missing governance clauses, and flag uncapped liability risks.

---

### 6. Guided AI Policy & SOP Generator
* **Endpoint:** `POST /api/compliance/policies`
* **Description:** Generates structured policy drafts with defined roles, procedural steps, and mandatory internal legal review disclaimers.

---

### 7. Regulatory Change Intelligence
* **Endpoint:** `GET & PUT /api/regulatory/monitoring`
* **Description:** Lists approved authority portals and gazette notifications; provides legal review staging and approval workflows.

---

### 8. Corrective Action Plan Management
* **Endpoint:** `GET, POST & PUT /api/compliance/actions`
* **Description:** Lifecycle management of remediation work items from creation to evidence attachment and closure.

---

### 9. Organization Workspaces & RBAC
* **Endpoint:** `GET /api/organizations/workspaces`
* **Description:** Validates tenant membership across 7 distinct roles (`Super Administrator`, `GOVENICS Administrator`, `Consultant`, `Organization Administrator`, `Compliance Manager`, `Department Head`, `Read-only Auditor`).


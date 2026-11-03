# GOVENICS Phase 4: Deployment & Operations Guide

## Overview

This guide details the deployment of **Phase 4: Multi-Agent AI Intelligence, GRC Advisory & Automation Platform** on Vercel and Node.js serverless runtimes.

---

## 1. Prerequisites & Validation

Before triggering deployment, verify the automated test suites pass locally:

```powershell
# 1. Run Phase 4 50-Case Multi-Agent Evaluation Suite
node test/phase4_multiagent_eval.js

# 2. Run Phase 3 30-Case Knowledge Retrieval Regression Suite
node test/phase3_knowledge_eval.js

# 3. Compile & Build Check
npm run build
```

Expected Output:
* Phase 4 Suite: `50 / 50 PASSED (100.0%)`
* Phase 3 Suite: `30 / 30 PASSED (100.0%)`
* Build Output: `✓ built in ~4.8s` (0 TypeScript errors)

---

## 2. Serverless Function Endpoints Added in Phase 4

| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/knowledge/orchestrate` | Multi-agent intent classification & grounded retrieval |
| `POST` | `/api/compliance/intelligent-checklist` | 15-field statutory checklist generator |
| `POST` | `/api/compliance/gap-assessment` | Gap identification & residual risk calculator |
| `GET/POST` | `/api/risk/register` | 5x5 heatmap metrics & enterprise risk register |
| `POST` | `/api/compliance/document-intelligence` | Non-destructive obligation & risk extractor |
| `POST` | `/api/compliance/policies` | Corporate policy and SOP generator |
| `GET/PUT` | `/api/regulatory/monitoring` | Official gazette change tracking & legal review |
| `GET/POST/PUT` | `/api/compliance/actions` | Remediation task management & tracking |
| `GET` | `/api/organizations/workspaces` | Multi-tenant organization workspace isolation |
| `POST` | `/api/reports/generate` | Structured board-ready GRC report generation |

---

## 3. Deployment Steps

### Step 1: Git Push to Main
```bash
git add .
git commit -m "feat(phase4): Multi-Agent AI Ecosystem, GRC Advisory & Automation"
git push origin main
```

### Step 2: Vercel Production Promotion
Vercel automatically detects the push and triggers serverless function bundling and asset minification.


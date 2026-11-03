# GOVENICS Phase 3: Deployment & Operations Guide

## Overview

This guide details the deployment procedure for **Phase 3: AI Knowledge Hub & Agent Intelligence Engine** on Vercel and Node.js environments.

---

## 1. Prerequisites & Environment Setup

Verify the following environment variables are configured in the Vercel Project Dashboard (`Settings` -> `Environment Variables`):

| Variable | Required | Scope | Purpose |
| :--- | :--- | :--- | :--- |
| `UPSTASH_REDIS_REST_URL` | **Yes** (Prod) | Serverless Functions | Redis REST endpoint for document metadata, chunks, and audit logs |
| `UPSTASH_REDIS_REST_TOKEN` | **Yes** (Prod) | Serverless Functions | Secret auth bearer token for Upstash Redis |
| `GEMINI_API_KEY` | Optional | Serverless Functions | Optional Gemini LLM / embedding integration |
| `OPENAI_API_KEY` | Optional | Serverless Functions | Secondary model integration |
| `VITE_TELEMETRY_WEBHOOK_URL`| Existing | Frontend (Vite) | Lead & telemetry forwarding |

> **Note on Client-Side Fallback:** If Upstash Redis credentials are unset or unreachable, the system automatically falls back to the client-side verified seed document corpus with `localStorage` offline caching, ensuring zero disruption to end-user browsing.

---

## 2. Serverless API Routing Architecture

Phase 3 introduces serverless routes under `/api/knowledge/` in accordance with `vercel.json`:
- `GET /api/knowledge/documents` — Search, query, filter, and fetch knowledge document metadata.
- `POST /api/knowledge/documents` — Ingest, validate (magic bytes & SHA-256), chunk, and index documents.
- `PUT /api/knowledge/documents` — Legal review approval/rejection state transitions.
- `DELETE /api/knowledge/documents` — Soft-archive / purge documents.
- `POST /api/knowledge/retrieve` — Central agent hybrid retrieval endpoint with audit logging and trust gate enforcement.
- `GET /api/knowledge/agents` — Dynamic registry of all 12 GOVENICS AI agent configurations and boundaries.

---

## 3. Pre-Flight Verification & Automated Test Run

Before pushing to production, execute the 30-case validation suite locally:

```powershell
# Run the 30-case automated evaluation suite
node test/phase3_knowledge_eval.js

# Build verification
npm run build
```

Expected result:
```text
=====================================================================
EVALUATION SUMMARY: 30 / 30 PASSED (100.0%)
Failed: 0
=====================================================================
✓ built in ~4-6s
```

---

## 4. Production Deployment Steps (Vercel)

### Option A: Automatic Git Integration (Recommended)
1. Commit changes to your main or release branch:
   ```bash
   git add .
   git commit -m "feat(phase3): AI Knowledge Hub, Agent Retrieval Engine, and E-Library Tab"
   git push origin main
   ```
2. Vercel automatically triggers a build via its GitHub integration.
3. Verify the deployment preview at the generated deployment URL.

### Option B: Vercel CLI Manual Deploy
```bash
# Preview deployment
vercel

# Production promotion
vercel --prod
```

---

## 5. Post-Deployment Verification Checklist

1. Navigate to `https://<your-domain>/sgrc/e-library?domain=lei&tab=ai-knowledge-hub`.
2. Verify the **5-tab Knowledge Management Dashboard**:
   - **Overview**: System metrics (Total Documents, Indexed Chunks, AI-Eligible percentage).
   - **Ingestion Pipeline**: Upload dropzone, quality checks, SHA-256 deduplication.
   - **Trust & Legal Review**: Trust state filtering, status progression controls.
   - **12 AI Agent Profiles**: Verify all 12 profiles, thresholds, and permitted domains.
   - **Retrieval Console**: Interactive query test console with instant confidence breakdown and citations.
3. In the chat interface (`/sgrc/e-library`), ask:
   - *"What is the penalty for failure to prevent data breach under DPDP Act?"*
   - Verify citation to DPDP Act 2023 with Section 33 and ₹250 Crores reference.
   - Ask an unverified out-of-domain question and verify the mandated safety fallback triggers.


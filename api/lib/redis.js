// api/lib/redis.js
// Upstash Redis client - server-side only, never imported on frontend

import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";

// Auto-load .env.local or .env if environment variables are not yet present on process.env
function ensureEnvLoaded() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return;
  }
  const filesToTry = [".env.local", ".env"];
  for (const filename of filesToTry) {
    try {
      const fullPath = path.resolve(process.cwd(), filename);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        for (const line of content.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);
          if (match) {
            const key = match[1];
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      }
    } catch {
      // Best-effort loader for local environments
    }
  }
}

ensureEnvLoaded();

const rawUrl = process.env.UPSTASH_REDIS_REST_URL || "";
const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const cleanUrl = rawUrl.replace(/^["']|["']$/g, "").trim();
const cleanToken = rawToken.replace(/^["']|["']$/g, "").trim();

if (!cleanUrl || !cleanToken) {
  throw new Error(
    "Missing Upstash Redis environment variables. " +
    "Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your .env.local (local) or Vercel dashboard (production)."
  );
}

export const redis = new Redis({
  url: cleanUrl,
  token: cleanToken,
});

// ─── Redis Key Namespace Helpers ─────────────────────────────────────────────
export const KEYS = {
  user: (userId) => `govenics:user:${userId}`,
  userData: (userId) => `govenics:user-data:${userId}`,
  allUsers: () => `govenics:users`,
  allRegistrations: () => `govenics:registrations:list`,
  emailLookup: (email) => `govenics:email:${email.toLowerCase().trim()}`,
  usernameLookup: (username) => `govenics:username:${username.toLowerCase().trim()}`,
  company: (companyId) => `govenics:company:${companyId}`,
  userCompany: (userId) => `govenics:user-company:${userId}`,
  checklist: (companyId) => `govenics:checklist:${companyId}`,
  session: (sessionId) => `govenics:session:${sessionId}`,
  registration: (userId) => `govenics:registration:${userId}`,
  auditLog: (userId) => `govenics:audit:${userId}`,

  // ── Phase 2: KRM Document Management ──────────────────────────────────────
  krmAllDocs: () => "govenics:krm:docs:index",
  krmDoc: (docId) => `govenics:krm:doc:${docId}`,
  krmDocVersions: (docId) => `govenics:krm:doc:${docId}:versions`,
  krmAuditLog: () => "govenics:krm:audit:log",
  krmDeletedDocs: () => "govenics:krm:docs:deleted",
  krmStats: () => "govenics:krm:stats",

  // ── Phase 2: Statutory Data Audit ─────────────────────────────────────────
  statutoryAuditReport: () => "govenics:statutory:audit:report",
  statutoryUrlMigrationLog: () => "govenics:statutory:migration:log",
  statutoryEnrichmentQueue: () => "govenics:statutory:enrichment:queue",

  // ── Phase 3: AI Knowledge Hub & Vector Retrieval ──────────────────────────
  knowledgeIndex: () => "govenics:kn:docs:index",
  knowledgeDoc: (docId) => `govenics:kn:doc:${docId}`,
  knowledgeChunks: (docId) => `govenics:kn:doc:${docId}:chunks`,
  knowledgeAllChunks: () => "govenics:kn:chunks:index",
  knowledgeChunk: (chunkId) => `govenics:kn:chunk:${chunkId}`,
  knowledgeStats: () => "govenics:kn:stats",
  knowledgeAuditLog: () => "govenics:kn:audit:log",
  knowledgeAgentQueries: () => "govenics:kn:agent:queries",

  // ── Phase 6: Enterprise GRC Operations ────────────────────────────────────
  complianceRegister: (orgId) => `govenics:comp:reg:${orgId}`,
  complianceObligation: (obligationId) => `govenics:comp:ob:${obligationId}`,
  complianceCalendar: (orgId) => `govenics:comp:cal:${orgId}`,
  tasksList: (orgId) => `govenics:tasks:${orgId}`,
  taskItem: (taskId) => `govenics:task:${taskId}`,
  auditsList: (orgId) => `govenics:audits:${orgId}`,
  auditItem: (auditId) => `govenics:audit:${auditId}`,
  riskRegister: (orgId) => `govenics:risk:${orgId}`,
  riskItem: (riskId) => `govenics:risk:item:${riskId}`,
  capaList: (orgId) => `govenics:capa:${orgId}`,
  capaItem: (capaId) => `govenics:capa:item:${capaId}`,
  evidenceList: (orgId) => `govenics:evidence:${orgId}`,
  evidenceItem: (evidenceId) => `govenics:evidence:item:${evidenceId}`,

  // ── Phase 7: Enterprise Integrations & APIs ────────────────────────────────
  integrationsList: (orgId) => `govenics:integ:${orgId}`,
  integrationConfig: (orgId, provider) => `govenics:integ:${orgId}:${provider}`,
  webhooksList: (orgId) => `govenics:webhooks:${orgId}`,
  webhookItem: (webhookId) => `govenics:webhook:${webhookId}`,
  apiKeysList: (orgId) => `govenics:apikeys:${orgId}`,
  apiKeyData: (keyHash) => `govenics:apikey:${keyHash}`,
  analyticsSnapshot: (orgId) => `govenics:analytics:${orgId}`,

  // ── Phase 8: Customer & Consultant Portals ─────────────────────────────────
  customerOrg: (orgId) => `govenics:cust:org:${orgId}`,
  consultantsList: () => `govenics:consultants:index`,
  consultantProfile: (consultantId) => `govenics:consultant:${consultantId}`,
  consultantAssignments: (consultantId) => `govenics:consultant:${consultantId}:assigns`,
  supportTickets: (orgId) => `govenics:tickets:${orgId}`,
  supportTicketItem: (ticketId) => `govenics:ticket:${ticketId}`,
  subscriptionData: (orgId) => `govenics:sub:${orgId}`,
  invoicesList: (orgId) => `govenics:invoices:${orgId}`,
  partnersList: () => `govenics:partners:index`,
  partnerProfile: (partnerId) => `govenics:partner:${partnerId}`,

  // ── Phase 9: Enterprise Security & AI Governance ───────────────────────────
  securityEvents: () => `govenics:security:events`,
  securityAuditLog: () => `govenics:security:audit:log`,
  aiGovernanceRegistry: () => `govenics:ai:gov:agents`,
  aiQualityMetrics: () => `govenics:ai:quality:metrics`,
  continuousMonitoringTasks: () => `govenics:monitoring:cont:tasks`,
  backupHistory: () => `govenics:backup:history`,
};

// ─── TTLs (in seconds) ───────────────────────────────────────────────────────
export const TTL = {
  SESSION: 60 * 60 * 24 * 7,       // 7 days
  VERIFY_TOKEN: 60 * 60 * 24,      // 24 hours
};

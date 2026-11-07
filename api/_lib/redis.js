// api/_lib/redis.js
// Upstash Redis client - server-side only, never imported on frontend
// In LOCAL DEV (no Upstash credentials): falls back to an in-memory store so
// registration/login work without an external service.
// In PRODUCTION (Vercel): set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
// in the Vercel project environment variables dashboard.

import fs from "fs";
import path from "path";

// ─── Auto-load .env / .env.local ─────────────────────────────────────────────
function ensureEnvLoaded() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) return;
  for (const filename of [".env.local", ".env"]) {
    try {
      const fullPath = path.resolve(process.cwd(), filename);
      if (!fs.existsSync(fullPath)) continue;
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);
        if (!match) continue;
        const key = match[1];
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    } catch { /* best-effort */ }
  }
}
ensureEnvLoaded();

// ─── In-Memory Fallback Store (local dev only) ────────────────────────────────
// Mimics the Upstash REST API surface used by the GOVENICS handlers.
// Data is NOT persisted across server restarts — only for development.
const _store = new Map();
const _sets = new Map();
const _lists = new Map();

class InMemoryRedis {
  async get(key) {
    const entry = _store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) { _store.delete(key); return null; }
    return entry.value;
  }
  async set(key, value, opts) {
    const expiresAt = opts?.ex ? Date.now() + opts.ex * 1000 : null;
    _store.set(key, { value, expiresAt });
    return "OK";
  }
  async del(key) { _store.delete(key); return 1; }
  async exists(key) { return _store.has(key) ? 1 : 0; }
  async sadd(key, ...members) {
    if (!_sets.has(key)) _sets.set(key, new Set());
    for (const m of members) _sets.get(key).add(m);
    return members.length;
  }
  async sismember(key, member) {
    return (_sets.has(key) && _sets.get(key).has(member)) ? 1 : 0;
  }
  async smembers(key) { return _sets.has(key) ? [..._sets.get(key)] : []; }
  async lpush(key, ...values) {
    if (!_lists.has(key)) _lists.set(key, []);
    _lists.get(key).unshift(...[...values].reverse());
    return _lists.get(key).length;
  }
  async lrange(key, start, stop) {
    const list = _lists.get(key) || [];
    const end = stop === -1 ? list.length : stop + 1;
    return list.slice(start, end);
  }
  async incr(key) {
    const cur = parseInt((await this.get(key)) || "0", 10);
    const next = cur + 1;
    await this.set(key, String(next));
    return next;
  }
  async setex(key, seconds, value) {
    const expiresAt = Date.now() + seconds * 1000;
    _store.set(key, { value, expiresAt });
    return "OK";
  }
  async expire(key, seconds) {
    const entry = _store.get(key);
    if (entry) entry.expiresAt = Date.now() + seconds * 1000;
    return 1;
  }
  async ltrim(key, start, stop) {
    const list = _lists.get(key);
    if (!list) return "OK";
    const trimmed = stop === -1 ? list.slice(start) : list.slice(start, stop + 1);
    _lists.set(key, trimmed);
    return "OK";
  }
  async srem(key, ...members) {
    if (!_sets.has(key)) return 0;
    let removed = 0;
    for (const m of members) {
      if (_sets.get(key).delete(m)) removed++;
    }
    return removed;
  }
  pipeline() {
    const self = this;
    const ops = [];
    const p = {
      set: (...a) => { ops.push(["set", a]); return p; },
      setex: (...a) => { ops.push(["setex", a]); return p; },
      get: (...a) => { ops.push(["get", a]); return p; },
      del: (...a) => { ops.push(["del", a]); return p; },
      sadd: (...a) => { ops.push(["sadd", a]); return p; },
      srem: (...a) => { ops.push(["srem", a]); return p; },
      lpush: (...a) => { ops.push(["lpush", a]); return p; },
      ltrim: (...a) => { ops.push(["ltrim", a]); return p; },
      expire: (...a) => { ops.push(["expire", a]); return p; },
      exec: async () => {
        const results = [];
        for (const [method, args] of ops) {
          if (typeof self[method] === "function") {
            results.push(await self[method](...args));
          }
        }
        return results;
      }
    };
    return p;
  }
}

// ─── Choose Upstash or In-Memory ─────────────────────────────────────────────
const rawUrl = (process.env.UPSTASH_REDIS_REST_URL || "").replace(/^["']|["']$/g, "").trim();
const rawToken = (process.env.UPSTASH_REDIS_REST_TOKEN || "").replace(/^["']|["']$/g, "").trim();

let _redis;
if (rawUrl && rawToken) {
  // Production / Vercel: use real Upstash Redis
  const { Redis } = await import("@upstash/redis");
  _redis = new Redis({ url: rawUrl, token: rawToken });
  console.log("[redis] ✅ Connected to Upstash Redis");
} else {
  // Local dev fallback: in-memory store (restarts clear all data)
  _redis = new InMemoryRedis();
  console.warn(
    "[redis] ⚠️  No Upstash credentials found — using in-memory store (local dev only). " +
    "Data will NOT persist across server restarts. " +
    "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env for persistence."
  );
}

export const redis = _redis;

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
  userSessions: (userId) => `govenics:user-sessions:${userId}`,
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
  SESSION: 30 * 60,                // 30 minutes (1800s enterprise session timeout)
  JWT: 30 * 60,                    // 30 minutes JWT lifespan
  VERIFY_TOKEN: 60 * 60 * 24,      // 24 hours
};

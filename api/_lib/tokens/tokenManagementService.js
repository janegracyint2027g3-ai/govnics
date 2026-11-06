// api/_lib/tokens/tokenManagementService.js
// GOVENICS GRC — Enterprise Application Token Management & Expiry Engine
// Secure token generation, SHA-256 hashing, real-time lifecycle & expiry calculation,
// and automated synchronization with Google Sheets via Google Apps Script Webhook.

import crypto from "crypto";
import { redis } from "../redis.js";

const REDIS_TOKEN_SET_KEY = "gov:tokens:set";
const REDIS_TOKEN_PREFIX = "gov:token:";

// In-memory fallback cache to ensure zero downtime and offline resilience
const LOCAL_TOKEN_CACHE = new Map();

// Canonical Google Sheets Webhook URL
function getGoogleSheetsUrl() {
  return (
    process.env.GOOGLE_SHEETS_URL ||
    process.env.VITE_TELEMETRY_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec"
  );
}

// ─── Default Seed Tokens for Initial Setup ───────────────────────────────────
const SEED_TOKENS = [
  {
    tokenId: "TOK-GOV-2026-0841",
    name: "Production ERP Compliance Sync",
    clientOwner: "admin@govenics.com",
    environment: "Production",
    scopes: ["compliance:read", "compliance:write", "regulatory:read"],
    keyPrefix: "gov_tok_live_8f3a...91ce",
    keyHash: crypto.createHash("sha256").update("gov_tok_live_erp_prod_demo_secret_2026").digest("hex"),
    createdAt: "2026-09-01T10:00:00.000Z",
    expiresAt: "2027-03-01T10:00:00.000Z",
    durationDays: 180,
    status: "Active",
    lastUsedAt: "2026-11-05T14:32:10.000Z",
    revokedAt: null,
    revokedReason: null,
    ipAddress: "10.0.4.12",
    syncedToSheetAt: "2026-11-06T10:00:00.000Z",
    sheetSyncStatus: "Synced"
  },
  {
    tokenId: "TOK-GOV-2026-0419",
    name: "Mobile GRC Auditor App",
    clientOwner: "audits@govenics.com",
    environment: "Production",
    scopes: ["audits:read", "audits:write", "evidence:upload"],
    keyPrefix: "gov_tok_live_4b71...e289",
    keyHash: crypto.createHash("sha256").update("gov_tok_live_mobile_auditor_secret_2026").digest("hex"),
    createdAt: "2026-10-15T08:00:00.000Z",
    // Set expiry 6 days from now to demonstrate EXPIRING_SOON
    expiresAt: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    durationDays: 30,
    status: "Expiring Soon",
    lastUsedAt: "2026-11-06T09:15:00.000Z",
    revokedAt: null,
    revokedReason: null,
    ipAddress: "192.168.1.45",
    syncedToSheetAt: "2026-11-06T10:00:00.000Z",
    sheetSyncStatus: "Synced"
  },
  {
    tokenId: "TOK-GOV-2026-0102",
    name: "Legacy HRMS Payroll Connector",
    clientOwner: "payroll-integrations@clientcorp.in",
    environment: "Staging",
    scopes: ["labour:read", "wages:read"],
    keyPrefix: "gov_tok_test_1c89...fa41",
    keyHash: crypto.createHash("sha256").update("gov_tok_test_legacy_hrms_secret_2026").digest("hex"),
    createdAt: "2026-07-01T12:00:00.000Z",
    expiresAt: "2026-10-01T12:00:00.000Z",
    durationDays: 90,
    status: "Expired",
    lastUsedAt: "2026-09-29T16:40:00.000Z",
    revokedAt: null,
    revokedReason: null,
    ipAddress: "203.0.113.19",
    syncedToSheetAt: "2026-11-06T10:00:00.000Z",
    sheetSyncStatus: "Synced"
  }
];

// Initialize local cache with seeds
for (const seed of SEED_TOKENS) {
  LOCAL_TOKEN_CACHE.set(seed.tokenId, seed);
}

// ─── 1. Expiry & Lifecycle Calculation Engine ─────────────────────────────────

export function calculateExpiryMetrics(expiresAt, currentStatus) {
  if (currentStatus === "Revoked") {
    return {
      daysRemaining: 0,
      status: "Revoked",
      isExpired: true,
      isExpiringSoon: false
    };
  }

  const now = Date.now();
  const expTime = new Date(expiresAt).getTime();
  const diffMs = expTime - now;
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysRemaining <= 0) {
    return {
      daysRemaining: 0,
      status: "Expired",
      isExpired: true,
      isExpiringSoon: false
    };
  }

  if (daysRemaining <= 14) {
    return {
      daysRemaining,
      status: "Expiring Soon",
      isExpired: false,
      isExpiringSoon: true
    };
  }

  return {
    daysRemaining,
    status: "Active",
    isExpired: false,
    isExpiringSoon: false
  };
}

// ─── 2. Google Sheets Webhook Synchronizer ───────────────────────────────────

export async function syncTokenToGoogleSheet(tokenRecord) {
  const url = getGoogleSheetsUrl();
  if (!url) {
    return { success: false, error: "Google Sheets Webhook URL not configured" };
  }

  const payload = {
    sheetName: "App_Tokens",
    table: "App_Tokens",
    fields: {
      "Token ID": tokenRecord.tokenId,
      "Application Name": tokenRecord.name,
      "Client / Owner": tokenRecord.clientOwner || "N/A",
      "Environment": tokenRecord.environment || "Production",
      "Scopes": (tokenRecord.scopes || []).join(", "),
      "Created At": tokenRecord.createdAt,
      "Expires At": tokenRecord.expiresAt,
      "Duration (Days)": tokenRecord.durationDays || 30,
      "Days Remaining": tokenRecord.daysRemaining ?? 0,
      "Expiry Status": tokenRecord.status,
      "Last Used": tokenRecord.lastUsedAt || "Never",
      "Masked Key": tokenRecord.keyPrefix,
      "Revoked At": tokenRecord.revokedAt || "N/A",
      "Revoked Reason": tokenRecord.revokedReason || "N/A",
      "IP / Host": tokenRecord.ipAddress || "Direct Web Admin",
      "Sync Timestamp": new Date().toISOString()
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script HTTP ${res.status}`);
    }

    const data = await res.json().catch(() => ({}));
    tokenRecord.syncedToSheetAt = new Date().toISOString();
    tokenRecord.sheetSyncStatus = "Synced";
    
    // Update local cache
    LOCAL_TOKEN_CACHE.set(tokenRecord.tokenId, tokenRecord);
    return { success: true, response: data };
  } catch (err) {
    console.warn(`[tokenManagement] Google Sheets sync warning for ${tokenRecord.tokenId}:`, err.message);
    tokenRecord.sheetSyncStatus = "Pending";
    return { success: false, error: err.message };
  }
}

export async function syncAllTokensToGoogleSheet() {
  const tokens = await getAllTokens();
  const results = [];
  for (const token of tokens) {
    const res = await syncTokenToGoogleSheet(token);
    results.push({ tokenId: token.tokenId, ...res });
  }
  return {
    total: tokens.length,
    synced: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    details: results
  };
}

// ─── 3. Token Persistence Operations ─────────────────────────────────────────

export async function getAllTokens() {
  let tokenIds = [];

  // Try Redis first
  try {
    if (redis?.smembers) {
      tokenIds = await redis.smembers(REDIS_TOKEN_SET_KEY);
    }
  } catch (err) {
    console.warn("[tokenManagement] Redis lookup failed, using local cache:", err.message);
  }

  // Fallback to local cache keys if redis returned empty
  if (!tokenIds || tokenIds.length === 0) {
    tokenIds = Array.from(LOCAL_TOKEN_CACHE.keys());
  }

  const list = [];
  for (const id of tokenIds) {
    let record = null;
    try {
      if (redis?.get) {
        const raw = await redis.get(`${REDIS_TOKEN_PREFIX}${id}`);
        if (raw) {
          record = typeof raw === "string" ? JSON.parse(raw) : raw;
        }
      }
    } catch { /* use cache */ }

    if (!record) {
      record = LOCAL_TOKEN_CACHE.get(id);
    }

    if (record) {
      // Re-evaluate expiry metrics dynamically on read
      const metrics = calculateExpiryMetrics(record.expiresAt, record.status);
      record.daysRemaining = metrics.daysRemaining;
      if (record.status !== "Revoked") {
        record.status = metrics.status;
      }
      LOCAL_TOKEN_CACHE.set(record.tokenId, record);
      list.push(record);
    }
  }

  // Sort: Active/Expiring Soon first, then newest
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveToken(record) {
  // Save to local cache
  LOCAL_TOKEN_CACHE.set(record.tokenId, record);

  // Save to Redis if available
  try {
    if (redis?.set && redis?.sadd) {
      await redis.set(`${REDIS_TOKEN_PREFIX}${record.tokenId}`, JSON.stringify(record));
      await redis.sadd(REDIS_TOKEN_SET_KEY, record.tokenId);
    }
  } catch (err) {
    console.warn("[tokenManagement] Redis save error (using local store):", err.message);
  }

  return record;
}

// ─── 4. Token Generation & Management Operations ─────────────────────────────

export async function generateAppToken(params = {}) {
  const {
    name = "External API Integration",
    clientOwner = "admin@govenics.com",
    environment = "Production",
    durationDays = 90,
    customExpiryDate = null,
    scopes = ["compliance:read", "regulatory:read"],
    ipAddress = "Direct Web Admin"
  } = params;

  // Generate cryptographically strong random token
  const rawSecret = `gov_tok_live_${crypto.randomBytes(24).toString("hex")}`;
  const keyHash = crypto.createHash("sha256").update(rawSecret).digest("hex");
  const keyPrefix = `${rawSecret.slice(0, 16)}...${rawSecret.slice(-4)}`;

  const now = new Date();
  let expiresAt;
  let finalDurationDays = parseInt(durationDays, 10) || 90;

  if (customExpiryDate) {
    expiresAt = new Date(customExpiryDate).toISOString();
    const diff = new Date(expiresAt).getTime() - now.getTime();
    finalDurationDays = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  } else {
    const expDate = new Date(now.getTime() + finalDurationDays * 24 * 60 * 60 * 1000);
    expiresAt = expDate.toISOString();
  }

  const tokenId = `TOK-GOV-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const record = {
    tokenId,
    name,
    clientOwner,
    environment,
    scopes: Array.isArray(scopes) && scopes.length > 0 ? scopes : ["compliance:read"],
    keyPrefix,
    keyHash,
    createdAt: now.toISOString(),
    expiresAt,
    durationDays: finalDurationDays,
    daysRemaining: finalDurationDays,
    status: "Active",
    lastUsedAt: null,
    revokedAt: null,
    revokedReason: null,
    ipAddress,
    syncedToSheetAt: null,
    sheetSyncStatus: "Pending"
  };

  await saveToken(record);

  // Asynchronously trigger Google Sheet sync
  syncTokenToGoogleSheet(record).catch(err => {
    console.warn("[tokenManagement] Background sync failed:", err.message);
  });

  return {
    rawToken: rawSecret,
    record
  };
}

export async function verifyAppToken(rawToken) {
  if (!rawToken || typeof rawToken !== "string") {
    return { valid: false, error: "Token string is required" };
  }

  const trimmed = rawToken.trim();
  const hash = crypto.createHash("sha256").update(trimmed).digest("hex");
  const tokens = await getAllTokens();

  const found = tokens.find(t => t.keyHash === hash);
  if (!found) {
    return { valid: false, error: "Invalid or unrecognized application token" };
  }

  const metrics = calculateExpiryMetrics(found.expiresAt, found.status);
  found.daysRemaining = metrics.daysRemaining;

  if (found.status === "Revoked") {
    return {
      valid: false,
      status: "Revoked",
      revokedAt: found.revokedAt,
      revokedReason: found.revokedReason,
      error: `Token was revoked on ${found.revokedAt}: ${found.revokedReason}`
    };
  }

  if (metrics.isExpired) {
    found.status = "Expired";
    await saveToken(found);
    return {
      valid: false,
      status: "Expired",
      expiresAt: found.expiresAt,
      error: `Token expired ${Math.abs(metrics.daysRemaining)} days ago on ${found.expiresAt}`
    };
  }

  // Token is valid (Active or Expiring Soon)
  found.status = metrics.status;
  found.lastUsedAt = new Date().toISOString();
  await saveToken(found);

  return {
    valid: true,
    tokenId: found.tokenId,
    name: found.name,
    clientOwner: found.clientOwner,
    environment: found.environment,
    scopes: found.scopes,
    expiresAt: found.expiresAt,
    daysRemaining: metrics.daysRemaining,
    status: metrics.status,
    lastUsedAt: found.lastUsedAt
  };
}

export async function revokeAppToken(tokenId, reason = "Manual administrator revocation") {
  const tokens = await getAllTokens();
  const target = tokens.find(t => t.tokenId === tokenId);
  if (!target) {
    return null;
  }

  target.status = "Revoked";
  target.revokedAt = new Date().toISOString();
  target.revokedReason = reason;
  target.daysRemaining = 0;

  await saveToken(target);

  // Sync update to Google Sheet
  await syncTokenToGoogleSheet(target);
  return target;
}

export async function rotateAppToken(tokenId, newDurationDays = 90) {
  const tokens = await getAllTokens();
  const old = tokens.find(t => t.tokenId === tokenId);
  if (!old) {
    return null;
  }

  // Revoke old token
  old.status = "Revoked";
  old.revokedAt = new Date().toISOString();
  old.revokedReason = "Rotated to a newly generated application token";
  await saveToken(old);
  await syncTokenToGoogleSheet(old);

  // Generate new token replacing the rotated one
  const created = await generateAppToken({
    name: `${old.name} (Rotated)`,
    clientOwner: old.clientOwner,
    environment: old.environment,
    durationDays: newDurationDays,
    scopes: old.scopes,
    ipAddress: old.ipAddress
  });

  return created;
}

export async function getTokenStats() {
  const tokens = await getAllTokens();
  const stats = {
    total: tokens.length,
    active: 0,
    expiringSoon: 0,
    expired: 0,
    revoked: 0,
    syncedToSheet: tokens.filter(t => t.sheetSyncStatus === "Synced").length,
    sheetUrl: getGoogleSheetsUrl()
  };

  for (const t of tokens) {
    if (t.status === "Active") stats.active++;
    else if (t.status === "Expiring Soon") stats.expiringSoon++;
    else if (t.status === "Expired") stats.expired++;
    else if (t.status === "Revoked") stats.revoked++;
  }

  return stats;
}

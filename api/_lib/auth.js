// api/lib/auth.js
// Authentication helpers - server-side only

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { redis, KEYS, TTL } from "./redis.js";
import {
  signJwt,
  verifyJwt,
  decodeJwt,
  extractTokenFromRequest,
  JWT_EXPIRY_SECONDS,
} from "./jwt.js";

export { signJwt, verifyJwt, decodeJwt, extractTokenFromRequest, JWT_EXPIRY_SECONDS };

const BCRYPT_ROUNDS = 12;

// ─── Password Utilities ───────────────────────────────────────────────────────
export async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}

export async function verifyPassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}

// ─── Google Sheets Webhook Synchronizer for Session & Token Management ───────
export async function syncSessionToGoogleSheet(sessionData) {
  const googleSheetsUrl =
    process.env.GOOGLE_SHEETS_URL ||
    process.env.VITE_TELEMETRY_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

  if (!googleSheetsUrl || !sessionData) return { success: false, error: "No URL or sessionData" };

  const payload = {
    sheetName: "User_Sessions",
    table: "User_Sessions",
    "Session ID": sessionData.sessionId,
    "User ID": `@${sessionData.preferredUserId || sessionData.userId}`,
    "Email": sessionData.email || "",
    "Full Name": sessionData.fullName || "",
    "Company": sessionData.companyName || "",
    "Auth Provider": sessionData.authProvider || "Direct Password Auth (JWT 30m)",
    "Token Type": sessionData.tokenType || "Bearer JWT",
    "Masked Token": sessionData.maskedToken || "N/A",
    "Created At": sessionData.createdAt || new Date().toISOString(),
    "Expires At": sessionData.expiresAt || "",
    "Status": sessionData.status || "Active",
    "IP Address": sessionData.ip || "Direct Web Client",
    "User Agent": sessionData.userAgent || "Web Client",
    "Last Active": sessionData.lastActive || sessionData.createdAt,
    "Revoked At": sessionData.revokedAt || "",
    "Revoked Reason": sessionData.revokedReason || "",
    "Sync Timestamp": new Date().toISOString(),
  };

  try {
    const res = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Google Apps Script HTTP ${res.status}`);
    }
    const data = await res.json().catch(() => ({}));
    return { success: true, data };
  } catch (err) {
    console.warn(`[auth] Google Sheets User_Sessions sync warning for ${sessionData.sessionId}:`, err.message);
    return { success: false, error: err.message };
  }
}

// ─── Session Utilities ────────────────────────────────────────────────────────
export function generateSessionId() {
  return uuidv4();
}

export async function createSession(userId, userAgent = "", ip = "", metadata = {}) {
  const sessionId = generateSessionId();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + (TTL.SESSION || 1800) * 1000).toISOString();
  const rawToken = metadata.token || "";
  const maskedToken = rawToken
    ? `${rawToken.slice(0, 16)}...${rawToken.slice(-10)}`
    : "N/A";

  const sessionData = {
    sessionId,
    userId,
    preferredUserId: metadata.preferredUserId || userId,
    email: metadata.email || "",
    fullName: metadata.fullName || "",
    companyName: metadata.companyName || "",
    createdAt: now,
    expiresAt,
    userAgent,
    ip,
    lastActive: now,
    status: "Active",
    authProvider: metadata.authProvider || "Direct Password Auth (JWT 30m)",
    tokenType: "Bearer JWT",
    maskedToken,
  };

  // 1. Persist session and token references in Redis
  try {
    await redis.setex(KEYS.session(sessionId), TTL.SESSION, JSON.stringify(sessionData));
    if (redis.sadd) {
      await redis.sadd(KEYS.userSessions(userId), sessionId);
      await redis.sadd(KEYS.activeSessions(), sessionId);
    }
    if (rawToken && redis.setex) {
      await redis.setex(KEYS.userJwtToken(userId), TTL.SESSION, rawToken);
    }
  } catch (err) {
    console.warn("[auth] Redis session persistence error:", err.message);
  }

  // 2. Synchronize to Google Sheets tab "User_Sessions"
  syncSessionToGoogleSheet(sessionData).catch((err) => {
    console.warn("[auth] Google Sheets User_Sessions sync error (non-fatal):", err.message);
  });

  return sessionId;
}

export async function getSession(sessionId) {
  if (!sessionId) return null;
  try {
    const raw = await redis.get(KEYS.session(sessionId));
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

export async function invalidateSession(sessionId, reason = "User Logout") {
  if (!sessionId) return;
  const session = await getSession(sessionId);
  const now = new Date().toISOString();

  // 1. Remove from Redis active sessions
  try {
    if (session && session.userId && redis.srem) {
      await redis.srem(KEYS.userSessions(session.userId), sessionId);
      await redis.srem(KEYS.activeSessions(), sessionId);
      if (redis.del) {
        await redis.del(KEYS.userJwtToken(session.userId));
      }
    }
    await redis.del(KEYS.session(sessionId));
  } catch (err) {
    console.warn("[auth] Redis invalidate session error:", err.message);
  }

  // 2. Synchronize revocation update to Google Sheet "User_Sessions" tab
  if (session) {
    const revokedSession = {
      ...session,
      status: "Revoked",
      revokedAt: now,
      revokedReason: reason,
    };
    syncSessionToGoogleSheet(revokedSession).catch((err) => {
      console.warn("[auth] Google Sheets session revocation sync error (non-fatal):", err.message);
    });
  }
}

export async function getUserActiveSessions(userId) {
  if (!userId || !redis.smembers) return [];
  const sessionIds = await redis.smembers(KEYS.userSessions(userId));
  if (!sessionIds || sessionIds.length === 0) return [];
  
  const activeSessions = [];
  for (const sid of sessionIds) {
    const s = await getSession(sid);
    if (s) {
      activeSessions.push(s);
    } else if (redis.srem) {
      // Clean up expired session ID from user set
      await redis.srem(KEYS.userSessions(userId), sid);
    }
  }
  return activeSessions;
}

// ─── Session Cookie Parsing ───────────────────────────────────────────────────
export function parseSessionCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/govenics_session=([^;]+)/);
  return match ? match[1] : null;
}

// ─── Authenticated User from Request (JWT Token or Session Cookie) ───────────
export async function getAuthenticatedUser(req) {
  // 1. Check for JWT Bearer token or JWT cookie
  const token = extractTokenFromRequest(req);
  if (token) {
    const verification = verifyJwt(token);
    if (verification.valid && verification.payload) {
      const payload = verification.payload;
      const userId = payload.sub || payload.userId;

      if (userId) {
        const userRaw = await redis.get(KEYS.user(userId));
        if (userRaw) {
          const user = typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;
          if (user.accountStatus !== "active") return null;
          const { passwordHash: _, ...safeUser } = user;
          return {
            ...safeUser,
            token,
            tokenPayload: payload,
            sessionId: payload.sessionId || null,
          };
        }

        // Fallback: stateless user profile from trusted JWT claims
        return {
          userId,
          preferredUserId: payload.preferredUserId || userId,
          email: payload.email || "",
          fullName: payload.fullName || "",
          companyId: payload.companyId || null,
          companyName: payload.companyName || "",
          accountStatus: payload.accountStatus || "active",
          role: payload.role || "Enterprise Lead",
          token,
          tokenPayload: payload,
        };
      }
    } else if (verification.expired) {
      // Token is explicitly expired (30-min window reached)
      console.warn("[auth] JWT expired:", verification.error);
      return null;
    }
  }

  // 2. Fallback to Legacy Session Cookie
  const sessionId = parseSessionCookie(req.headers.cookie || "");
  if (!sessionId) return null;

  const session = await getSession(sessionId);
  if (!session) return null;

  const userRaw = await redis.get(KEYS.user(session.userId));
  if (!userRaw) return null;

  const user = typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;
  if (user.accountStatus !== "active") return null;

  const { passwordHash: _, ...safeUser } = user;
  return { ...safeUser, sessionId };
}

// ─── Validation Helpers ───────────────────────────────────────────────────────
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  if (!password || password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  return null; // valid
}

export function validateUserId(userId) {
  if (!userId || userId.length < 3) return "User ID must be at least 3 characters.";
  if (!/^[a-zA-Z0-9_-]+$/.test(userId)) return "User ID may only contain letters, numbers, underscores, and hyphens.";
  return null; // valid
}

// ─── Rate Limiting (simple token-bucket via Redis) ────────────────────────────
export async function checkRateLimit(key, maxRequests = 10, windowSec = 60) {
  const limitKey = `govenics:ratelimit:${key}`;
  const current = await redis.incr(limitKey);
  if (current === 1) {
    await redis.expire(limitKey, windowSec);
  }
  return current <= maxRequests;
}

// ─── Audit Logging ────────────────────────────────────────────────────────────
export async function auditLog(userId, action, details = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    ...details,
  };
  // Append to a list, keep last 100 entries
  await redis.lpush(KEYS.auditLog(userId), JSON.stringify(entry));
  await redis.ltrim(KEYS.auditLog(userId), 0, 99);
}

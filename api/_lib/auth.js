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

// ─── Session Utilities ────────────────────────────────────────────────────────
export function generateSessionId() {
  return uuidv4();
}

export async function createSession(userId, userAgent = "", ip = "") {
  const sessionId = generateSessionId();
  const sessionData = {
    sessionId,
    userId,
    createdAt: new Date().toISOString(),
    userAgent,
    ip,
    lastActive: new Date().toISOString(),
  };
  await redis.setex(KEYS.session(sessionId), TTL.SESSION, JSON.stringify(sessionData));
  if (redis.sadd) {
    await redis.sadd(KEYS.userSessions(userId), sessionId);
  }
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

export async function invalidateSession(sessionId) {
  if (!sessionId) return;
  const session = await getSession(sessionId);
  if (session && session.userId && redis.srem) {
    await redis.srem(KEYS.userSessions(session.userId), sessionId);
  }
  await redis.del(KEYS.session(sessionId));
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

// api/lib/auth.js
// Authentication helpers - server-side only

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { redis, KEYS, TTL } from "./redis.js";

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
    userId,
    createdAt: new Date().toISOString(),
    userAgent,
    ip,
    lastActive: new Date().toISOString(),
  };
  await redis.setex(KEYS.session(sessionId), TTL.SESSION, JSON.stringify(sessionData));
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
  await redis.del(KEYS.session(sessionId));
}

// ─── Session Cookie Parsing ───────────────────────────────────────────────────
export function parseSessionCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/govenics_session=([^;]+)/);
  return match ? match[1] : null;
}

// ─── Authenticated User from Request ─────────────────────────────────────────
export async function getAuthenticatedUser(req) {
  const sessionId = parseSessionCookie(req.headers.cookie || "");
  if (!sessionId) return null;

  const session = await getSession(sessionId);
  if (!session) return null;

  const userRaw = await redis.get(KEYS.user(session.userId));
  if (!userRaw) return null;

  const user = typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;
  // Never return passwordHash to caller
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

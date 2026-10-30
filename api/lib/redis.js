// api/lib/redis.js
// Upstash Redis client - server-side only, never imported on frontend

import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(
    "Missing Upstash Redis environment variables. " +
    "Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your .env.local (local) or Vercel dashboard (production)."
  );
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ─── Redis Key Namespace Helpers ─────────────────────────────────────────────
export const KEYS = {
  user: (userId) => `govenics:user:${userId}`,
  emailLookup: (email) => `govenics:email:${email.toLowerCase().trim()}`,
  usernameLookup: (username) => `govenics:username:${username.toLowerCase().trim()}`,
  company: (companyId) => `govenics:company:${companyId}`,
  userCompany: (userId) => `govenics:user-company:${userId}`,
  checklist: (companyId) => `govenics:checklist:${companyId}`,
  session: (sessionId) => `govenics:session:${sessionId}`,
  registration: (userId) => `govenics:registration:${userId}`,
  auditLog: (userId) => `govenics:audit:${userId}`,
};

// ─── TTLs (in seconds) ───────────────────────────────────────────────────────
export const TTL = {
  SESSION: 60 * 60 * 24 * 7,       // 7 days
  VERIFY_TOKEN: 60 * 60 * 24,      // 24 hours
};

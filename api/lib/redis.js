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
};

// ─── TTLs (in seconds) ───────────────────────────────────────────────────────
export const TTL = {
  SESSION: 60 * 60 * 24 * 7,       // 7 days
  VERIFY_TOKEN: 60 * 60 * 24,      // 24 hours
};

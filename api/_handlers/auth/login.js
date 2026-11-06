// api/auth/login.js
// POST /api/auth/login — Authentication endpoint

import { redis, KEYS, TTL } from "../../_lib/redis.js";
import {
  verifyPassword,
  createSession,
  validateEmail,
  checkRateLimit,
  auditLog,
} from "../../_lib/auth.js";
import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";

  // Rate limit: 10 login attempts per IP per 15 minutes
  const allowed = await checkRateLimit(`login:${ip}`, 10, 900);
  if (!allowed) {
    return errorResponse(res, 429, "Too many login attempts. Please try again in 15 minutes.");
  }

  try {
    const { identifier, password } = req.body || {};

    if (!identifier || !password) {
      return errorResponse(res, 400, "Email/User ID and password are required.");
    }

    // ─── Look up user by email or userId ──────────────────────────────────
    let userId = null;

    if (validateEmail(identifier)) {
      // Email login
      const normalizedEmail = identifier.toLowerCase().trim();
      userId = await redis.get(KEYS.emailLookup(normalizedEmail));
    } else {
      // Username login
      const normalizedUsername = identifier.toLowerCase().trim();
      userId = await redis.get(KEYS.usernameLookup(normalizedUsername));
    }

    // Generic error to prevent account enumeration
    const INVALID_MSG = "Invalid credentials. Please check your email/User ID and password.";

    if (!userId) {
      return errorResponse(res, 401, INVALID_MSG);
    }

    // ─── Fetch User Record ────────────────────────────────────────────────
    const userRaw = await redis.get(KEYS.user(userId));
    if (!userRaw) {
      return errorResponse(res, 401, INVALID_MSG);
    }

    const user = typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;

    if (user.accountStatus !== "active") {
      return errorResponse(res, 403, "This account has been suspended. Please contact support.");
    }

    // ─── Verify Password ──────────────────────────────────────────────────
    const passwordValid = await verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      await auditLog(userId, "LOGIN_FAILED", { ip, reason: "invalid_password" });
      return errorResponse(res, 401, INVALID_MSG);
    }

    // ─── Fetch Company ────────────────────────────────────────────────────
    let company = null;
    if (user.companyId) {
      const companyRaw = await redis.get(KEYS.company(user.companyId));
      if (companyRaw) {
        company = typeof companyRaw === "string" ? JSON.parse(companyRaw) : companyRaw;
      }
    }

    // ─── Create Session ───────────────────────────────────────────────────
    const sessionId = await createSession(
      userId,
      req.headers["user-agent"] || "",
      ip
    );

    // ─── Audit Log ────────────────────────────────────────────────────────
    await auditLog(userId, "LOGIN_SUCCESS", { ip });

    // ─── Set Cookie ───────────────────────────────────────────────────────
    const isProd = process.env.NODE_ENV === "production";
    res.setHeader(
      "Set-Cookie",
      `govenics_session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TTL.SESSION}${isProd ? "; Secure" : ""}`
    );

    // ─── Forward Login Event to Google Sheets Telemetry Webhook ────────
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      process.env.VITE_TELEMETRY_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

    if (googleSheetsUrl) {
      fetch(googleSheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "User_Logins",
          table: "User_Logins",
          "Timestamp": new Date().toISOString(),
          "Email": user.email,
          "Auth Provider": "Direct Password Auth",
          "Login Status": "Success",
          "IP Location": "Direct Web Client",
          "IP Address": ip,
          "User Agent": req.headers["user-agent"] || "Web Client",
          "Action": "LOGIN",
          "User ID": `@${user.preferredUserId || user.userId}`,
          "Full Name": user.fullName,
          "Company": company?.companyName || "N/A",
          "Session ID": sessionId,
        }),
      }).catch((err) => {
        console.warn("[login] Google Sheets telemetry error (non-fatal):", err?.message);
      });
    }

    // ─── Return Safe User Data ────────────────────────────────────────────
    return successResponse(res, {
      message: "Login successful.",
      user: {
        userId: user.userId,
        preferredUserId: user.preferredUserId,
        fullName: user.fullName,
        email: user.email,
        companyId: user.companyId,
        companyName: company?.companyName || "",
        industrySector: company?.industrySector || "",
        country: company?.country || "",
        companySize: company?.companySize || "",
        businessOperations: company?.businessOperations || [],
        accountStatus: user.accountStatus,
      },
    });
  } catch (err) {
    console.error("[login] Error:", err);
    return errorResponse(res, 500, "Internal server error during login.");
  }
}

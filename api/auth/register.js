// api/auth/register.js
// POST /api/auth/register — User registration endpoint

import { v4 as uuidv4 } from "uuid";
import { redis, KEYS, TTL } from "../lib/redis.js";
import {
  hashPassword,
  createSession,
  validateEmail,
  validatePassword,
  validateUserId,
  checkRateLimit,
  auditLog,
} from "../lib/auth.js";
import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  // Rate limiting: 5 registrations per IP per 10 minutes
  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const allowed = await checkRateLimit(`register:${ip}`, 5, 600);
  if (!allowed) {
    return errorResponse(res, 429, "Too many registration attempts. Please try again later.");
  }

  try {
    const {
      // Personal
      fullName,
      email,
      mobileNumber,
      userId: preferredUserId,
      password,
      confirmPassword,
      // Company
      companyName,
      officialWebsite,
      country,
      state,
      city,
      industrySector,
      subIndustry,
      companySize,
      businessOperations,
      businessRegistrationType,
    } = req.body || {};

    // ─── Input Validation ─────────────────────────────────────────────────
    const errors = {};

    if (!fullName || fullName.trim().length < 2)
      errors.fullName = "Full name must be at least 2 characters.";

    if (!email || !validateEmail(email))
      errors.email = "Please enter a valid business email address.";

    if (!mobileNumber || mobileNumber.trim().length < 7)
      errors.mobileNumber = "Please enter a valid mobile number with country code.";

    if (!preferredUserId) {
      errors.userId = "User ID is required.";
    } else {
      const userIdError = validateUserId(preferredUserId);
      if (userIdError) errors.userId = userIdError;
    }

    if (!password) {
      errors.password = "Password is required.";
    } else {
      const pwError = validatePassword(password);
      if (pwError) errors.password = pwError;
    }

    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (!companyName || companyName.trim().length < 2)
      errors.companyName = "Company name must be at least 2 characters.";

    if (!country)
      errors.country = "Please select your country.";

    if (!industrySector)
      errors.industrySector = "Please select your industry sector.";

    if (!companySize)
      errors.companySize = "Please select your company size.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, error: "Validation failed", errors });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUserId = preferredUserId.toLowerCase().trim();

    // ─── Duplicate Checks (Atomic via Pipeline) ───────────────────────────
    const [existingEmailRaw, existingUserIdRaw] = await Promise.all([
      redis.get(KEYS.emailLookup(normalizedEmail)),
      redis.get(KEYS.usernameLookup(normalizedUserId)),
    ]);

    if (existingEmailRaw) {
      return res.status(409).json({
        success: false,
        error: "An account with this email address already exists.",
        field: "email",
      });
    }

    if (existingUserIdRaw) {
      return res.status(409).json({
        success: false,
        error: "This User ID is already taken. Please choose another.",
        field: "userId",
      });
    }

    // ─── Hash Password ────────────────────────────────────────────────────
    const passwordHash = await hashPassword(password);

    // ─── Generate IDs ─────────────────────────────────────────────────────
    const internalUserId = uuidv4();
    const companyId = uuidv4();
    const now = new Date().toISOString();

    // ─── Build Records ────────────────────────────────────────────────────
    const userRecord = {
      userId: internalUserId,
      preferredUserId: normalizedUserId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      mobileNumber: mobileNumber.trim(),
      passwordHash,
      createdAt: now,
      updatedAt: now,
      emailVerified: false,
      accountStatus: "active",
      companyId,
    };

    const companyRecord = {
      companyId,
      ownerId: internalUserId,
      companyName: companyName.trim(),
      officialWebsite: officialWebsite?.trim() || "",
      country: country.trim(),
      state: state?.trim() || "",
      city: city?.trim() || "",
      industrySector,
      subIndustry: subIndustry || "",
      companySize,
      businessOperations: Array.isArray(businessOperations) ? businessOperations : [],
      businessRegistrationType: businessRegistrationType || "",
      createdAt: now,
      updatedAt: now,
    };

    const registrationMeta = {
      userId: internalUserId,
      companyId,
      registeredAt: now,
      ipAddress: ip,
      userAgent: req.headers["user-agent"] || "",
      registrationSource: "web",
    };

    // ─── Atomic Write to Redis (Pipeline) ────────────────────────────────
    // We use a pipeline to write all records atomically
    const pipeline = redis.pipeline();

    // Email lookup (for uniqueness — permanent, no TTL)
    pipeline.set(KEYS.emailLookup(normalizedEmail), internalUserId);
    // Username lookup (permanent, no TTL)
    pipeline.set(KEYS.usernameLookup(normalizedUserId), internalUserId);
    // User record (permanent)
    pipeline.set(KEYS.user(internalUserId), JSON.stringify(userRecord));
    // Company record (permanent)
    pipeline.set(KEYS.company(companyId), JSON.stringify(companyRecord));
    // User-to-company mapping (permanent)
    pipeline.set(KEYS.userCompany(internalUserId), companyId);
    // Registration metadata (permanent)
    pipeline.set(KEYS.registration(internalUserId), JSON.stringify(registrationMeta));

    await pipeline.exec();

    // ─── Create Session ───────────────────────────────────────────────────
    const sessionId = await createSession(
      internalUserId,
      req.headers["user-agent"] || "",
      ip
    );

    // ─── Audit Log ────────────────────────────────────────────────────────
    await auditLog(internalUserId, "REGISTRATION", {
      email: normalizedEmail,
      companyId,
      ip,
    });

    // ─── Set HTTP-Only Session Cookie ─────────────────────────────────────
    const isProd = process.env.NODE_ENV === "production";
    res.setHeader(
      "Set-Cookie",
      `govenics_session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TTL.SESSION}${isProd ? "; Secure" : ""}`
    );

    // ─── Forward to Google Sheets Webhook (Background Async) ─────────────
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      process.env.VITE_TELEMETRY_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

    if (googleSheetsUrl) {
      fetch(googleSheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "Registered_Users",
          table: "Registered_Users",
          "Timestamp": now,
          "Full Name": userRecord.fullName,
          "Business Email": normalizedEmail,
          "Mobile Number": userRecord.mobileNumber,
          "User ID": `@${normalizedUserId}`,
          "Company Name": companyRecord.companyName,
          "Official Website": companyRecord.officialWebsite || "—",
          "Country": companyRecord.country,
          "State / Region": companyRecord.state || "—",
          "City": companyRecord.city || "—",
          "Industry Sector": companyRecord.industrySector,
          "Sub-Industry": companyRecord.subIndustry || "—",
          "Company Size": companyRecord.companySize,
          "Registration Type": companyRecord.businessRegistrationType || "—",
          "Business Operations": (companyRecord.businessOperations || []).join(", "),
          "Registration Status": "Success",
          "IP Address": ip,
          "User Agent": req.headers["user-agent"] || "Web Client",
        }),
      }).catch((err) => {
        console.warn("[register] Google Sheets webhook error (non-fatal):", err?.message);
      });
    }

    // ─── Return Safe Response ─────────────────────────────────────────────
    return successResponse(res, {
      message: "Account created successfully.",
      user: {
        userId: internalUserId,
        preferredUserId: normalizedUserId,
        fullName: userRecord.fullName,
        email: normalizedEmail,
        companyId,
        companyName: companyRecord.companyName,
        industrySector,
        country,
        accountStatus: "active",
      },
    });
  } catch (err) {
    console.error("[register] Error:", err);
    return errorResponse(res, 500, "Internal server error during registration.");
  }
}

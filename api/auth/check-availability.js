// api/auth/check-availability.js
// GET /api/auth/check-availability?email=... or ?userId=...
// Used for real-time duplicate checking during registration

import { redis, KEYS } from "../lib/redis.js";
import { checkRateLimit } from "../lib/auth.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "GET") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const allowed = await checkRateLimit(`check:${ip}`, 30, 60); // 30 checks per minute
  if (!allowed) {
    return errorResponse(res, 429, "Too many requests.");
  }

  const { email, userId } = req.query || {};

  try {
    if (email) {
      const normalized = email.toLowerCase().trim();
      const existing = await redis.get(KEYS.emailLookup(normalized));
      return successResponse(res, {
        field: "email",
        value: normalized,
        available: !existing,
        message: existing ? "This email address is already registered." : "Email is available.",
      });
    }

    if (userId) {
      const normalized = userId.toLowerCase().trim();
      const existing = await redis.get(KEYS.usernameLookup(normalized));
      return successResponse(res, {
        field: "userId",
        value: normalized,
        available: !existing,
        message: existing ? "This User ID is already taken." : "User ID is available.",
      });
    }

    return errorResponse(res, 400, "Please provide email or userId query parameter.");
  } catch (err) {
    console.error("[check-availability] Error:", err);
    return errorResponse(res, 500, "Error checking availability.");
  }
}

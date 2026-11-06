// api/auth/logout.js
// POST /api/auth/logout — Session invalidation

import { invalidateSession, parseSessionCookie, getSession, auditLog } from "../../_lib/auth.js";
import { redis, KEYS } from "../../_lib/redis.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const sessionId = parseSessionCookie(req.headers.cookie || "");
    let loggedOutUser = null;
    const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";

    if (sessionId) {
      const session = await getSession(sessionId);
      if (session && session.userId) {
        const userRaw = await redis.get(KEYS.user(session.userId));
        if (userRaw) {
          loggedOutUser = typeof userRaw === "string" ? JSON.parse(userRaw) : userRaw;
        }
        await auditLog(session.userId, "LOGOUT", { sessionId, ip });
      }
      await invalidateSession(sessionId);
    }

    // Clear the session cookie
    res.setHeader(
      "Set-Cookie",
      "govenics_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    // ─── Forward Logout Event to Google Sheets Telemetry Webhook ────────
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_URL ||
      process.env.VITE_TELEMETRY_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

    if (googleSheetsUrl && (loggedOutUser || sessionId)) {
      fetch(googleSheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "User_Logins",
          table: "User_Logins",
          "Timestamp": new Date().toISOString(),
          "Email": loggedOutUser?.email || "anonymous_user",
          "Auth Provider": "Session Termination",
          "Login Status": "Logged Out",
          "IP Location": "Direct Web Client",
          "IP Address": ip,
          "User Agent": req.headers["user-agent"] || "Web Client",
          "Action": "LOGOUT",
          "User ID": loggedOutUser ? `@${loggedOutUser.preferredUserId || loggedOutUser.userId}` : "N/A",
          "Full Name": loggedOutUser?.fullName || "Active Session",
          "Session ID": sessionId || "N/A",
        }),
      }).catch((err) => {
        console.warn("[logout] Google Sheets telemetry error (non-fatal):", err?.message);
      });
    }

    return successResponse(res, { message: "Logged out successfully." });
  } catch (err) {
    console.error("[logout] Error:", err);
    return errorResponse(res, 500, "Error during logout.");
  }
}

// api/auth/logout.js
// POST /api/auth/logout — Session invalidation

import { invalidateSession, parseSessionCookie, auditLog } from "../lib/auth.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "POST") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const sessionId = parseSessionCookie(req.headers.cookie || "");
    if (sessionId) {
      await invalidateSession(sessionId);
    }

    // Clear the session cookie
    res.setHeader(
      "Set-Cookie",
      "govenics_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    return successResponse(res, { message: "Logged out successfully." });
  } catch (err) {
    console.error("[logout] Error:", err);
    return errorResponse(res, 500, "Error during logout.");
  }
}

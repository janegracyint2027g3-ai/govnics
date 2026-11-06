// api/_handlers/auth/sessions.js
// GET /api/auth/sessions — List active user sessions
// DELETE /api/auth/sessions?sessionId=xyz — Revoke a specific session

import { getAuthenticatedUser, getUserActiveSessions, invalidateSession, parseSessionCookie, auditLog } from "../../_lib/auth.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return errorResponse(res, 401, "Not authenticated.");
    }

    const currentSessionId = parseSessionCookie(req.headers.cookie || "");

    // ─── GET: List Active Sessions ───────────────────────────────────────
    if (req.method === "GET") {
      const sessions = await getUserActiveSessions(user.userId);

      // Enhance sessions with friendly device/browser labels & current flag
      const formatted = sessions.map((s) => {
        const ua = s.userAgent || "";
        let device = "Desktop / Web Browser";
        if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
          device = "Mobile Device";
        } else if (/Macintosh|Mac OS/i.test(ua)) {
          device = "macOS Workstation";
        } else if (/Windows/i.test(ua)) {
          device = "Windows Workstation";
        } else if (/Linux/i.test(ua)) {
          device = "Linux Machine";
        }

        let browser = "Browser";
        if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Google Chrome";
        else if (/Edg/i.test(ua)) browser = "Microsoft Edge";
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Apple Safari";
        else if (/Firefox/i.test(ua)) browser = "Mozilla Firefox";

        return {
          sessionId: s.sessionId,
          device,
          browser,
          ip: s.ip || "Direct Web Client",
          createdAt: s.createdAt,
          lastActive: s.lastActive || s.createdAt,
          isCurrent: s.sessionId === currentSessionId,
        };
      });

      return successResponse(res, { sessions: formatted });
    }

    // ─── DELETE: Invalidate a Specific Session or All Other Sessions ────
    if (req.method === "DELETE") {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
      const targetSessionId = parsedUrl.searchParams.get("sessionId") || (req.body && req.body.sessionId);
      const revokeAllOthers = parsedUrl.searchParams.get("allOthers") === "true" || (req.body && req.body.allOthers);

      if (revokeAllOthers) {
        const sessions = await getUserActiveSessions(user.userId);
        let revokedCount = 0;
        for (const s of sessions) {
          if (s.sessionId !== currentSessionId) {
            await invalidateSession(s.sessionId);
            revokedCount++;
          }
        }
        await auditLog(user.userId, "REVOKE_ALL_OTHER_SESSIONS", { revokedCount });
        return successResponse(res, { message: `Terminated ${revokedCount} other active session(s).` });
      }

      if (!targetSessionId) {
        return errorResponse(res, 400, "sessionId is required.");
      }

      // Check if target session belongs to user
      const sessions = await getUserActiveSessions(user.userId);
      const belongs = sessions.some((s) => s.sessionId === targetSessionId);
      if (!belongs) {
        return errorResponse(res, 404, "Session not found or does not belong to active user.");
      }

      await invalidateSession(targetSessionId);
      await auditLog(user.userId, "REVOKE_SESSION", { targetSessionId });

      // If user revoked current session, clear cookie
      if (targetSessionId === currentSessionId) {
        res.setHeader(
          "Set-Cookie",
          "govenics_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
        );
      }

      return successResponse(res, { message: "Session revoked successfully." });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[auth/sessions] Error:", err);
    return errorResponse(res, 500, "Error managing user sessions.");
  }
}


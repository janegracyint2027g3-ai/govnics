// api/_handlers/tokens/index.js
// GOVENICS GRC — Application Token Management & Google Sheets Sync Handler

import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../../_lib/cors.js";
import {
  getAllTokens,
  generateAppToken,
  verifyAppToken,
  revokeAppToken,
  rotateAppToken,
  getTokenStats,
  syncAllTokensToGoogleSheet,
  syncTokenToGoogleSheet
} from "../../_lib/tokens/tokenManagementService.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers?.origin);
  if (handleOptions(req, res)) return;

  const rawUrl = req.url || "/";
  const parsed = new URL(rawUrl, `https://${req.headers?.host || "localhost"}`);
  const pathname = parsed.pathname.replace(/\/$/, "");

  // Normalize method
  const method = req.method;

  try {
    // ─── 1. Stats Endpoint: /api/tokens/stats ──────────────────────────────────
    if (pathname === "/api/tokens/stats" && method === "GET") {
      const stats = await getTokenStats();
      return successResponse(res, { stats });
    }

    // ─── 2. List Tokens: /api/tokens/list or /api/tokens ────────────────────────
    if ((pathname === "/api/tokens/list" || pathname === "/api/tokens") && method === "GET") {
      const tokens = await getAllTokens();
      const stats = await getTokenStats();
      return successResponse(res, {
        count: tokens.length,
        tokens,
        stats
      });
    }

    // ─── 3. Generate Token: /api/tokens/generate ──────────────────────────────
    if ((pathname === "/api/tokens/generate" || pathname === "/api/tokens") && method === "POST") {
      const body = req.body || {};
      const {
        name,
        clientOwner,
        environment,
        durationDays,
        customExpiryDate,
        scopes
      } = body;

      const ipAddress =
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        "Direct Web Admin";

      const result = await generateAppToken({
        name,
        clientOwner,
        environment,
        durationDays,
        customExpiryDate,
        scopes,
        ipAddress: typeof ipAddress === "string" ? ipAddress.split(",")[0].trim() : ipAddress
      });

      return successResponse(
        res,
        {
          message: "Application Token generated successfully. Store this secret key securely; it will not be displayed again.",
          token: result.rawToken,
          record: result.record
        },
        201
      );
    }

    // ─── 4. Verify Token: /api/tokens/verify ──────────────────────────────────
    if (pathname === "/api/tokens/verify" && method === "POST") {
      const body = req.body || {};
      const rawToken = body.token || body.rawToken || req.headers["authorization"]?.replace(/^Bearer\s+/i, "");

      if (!rawToken) {
        return errorResponse(res, 400, "Missing required 'token' parameter to verify.");
      }

      const result = await verifyAppToken(rawToken);
      if (!result.valid) {
        return successResponse(res, {
          valid: false,
          error: result.error,
          status: result.status || "Invalid",
          details: result
        });
      }

      return successResponse(res, {
        valid: true,
        message: "Token is active and cryptographically verified.",
        token: result
      });
    }

    // ─── 5. Revoke Token: /api/tokens/revoke ──────────────────────────────────
    if (pathname === "/api/tokens/revoke" && method === "POST") {
      const body = req.body || {};
      const { tokenId, reason } = body;

      if (!tokenId) {
        return errorResponse(res, 400, "Missing required 'tokenId' parameter.");
      }

      const revoked = await revokeAppToken(tokenId, reason || "Manual administrator revocation");
      if (!revoked) {
        return errorResponse(res, 404, `Token with ID '${tokenId}' not found.`);
      }

      return successResponse(res, {
        message: `Token ${tokenId} has been revoked and marked in Google Sheet.`,
        token: revoked
      });
    }

    // ─── 6. Rotate Token: /api/tokens/rotate ──────────────────────────────────
    if (pathname === "/api/tokens/rotate" && method === "POST") {
      const body = req.body || {};
      const { tokenId, durationDays } = body;

      if (!tokenId) {
        return errorResponse(res, 400, "Missing required 'tokenId' parameter.");
      }

      const rotated = await rotateAppToken(tokenId, durationDays || 90);
      if (!rotated) {
        return errorResponse(res, 404, `Token with ID '${tokenId}' not found.`);
      }

      return successResponse(res, {
        message: `Token ${tokenId} rotated successfully. New application secret generated.`,
        token: rotated.rawToken,
        record: rotated.record
      });
    }

    // ─── 7. Sync All Tokens to Google Sheet: /api/tokens/sync-sheet ───────────
    if (pathname === "/api/tokens/sync-sheet" && method === "POST") {
      const syncResult = await syncAllTokensToGoogleSheet();
      return successResponse(res, {
        message: `Synchronized ${syncResult.synced} of ${syncResult.total} tokens to Google Sheets (Tab: App Tokens).`,
        result: syncResult
      });
    }

    return errorResponse(res, 404, `Endpoint ${method} ${pathname} not found.`);
  } catch (err) {
    console.error("[api/tokens] Error:", err);
    return errorResponse(res, 500, `Token Management Engine Error: ${err.message}`);
  }
}

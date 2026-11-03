// api/organizations/workspaces.js
// GET /api/organizations/workspaces — Retrieve organization workspace details with tenant validation

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { getOrganizationById, validateUserOrgAccess } from "../../_lib/organizations/workspaceService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`org:ws:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded.");
    }

    const { orgId = "ORG-GOVENICS-DEMO", userEmail = "compliance@acme-ind.com" } = req.query || {};

    const accessCheck = validateUserOrgAccess(userEmail, orgId);
    if (!accessCheck.allowed) {
      return errorResponse(res, 403, accessCheck.reason);
    }

    return successResponse(res, {
      workspace: accessCheck.org,
      currentMember: accessCheck.member
    });
  } catch (err) {
    console.error("[organizations/workspaces] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


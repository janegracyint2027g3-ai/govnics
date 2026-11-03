// api/compliance/actions.js
// GET, POST & PUT /api/compliance/actions — Manage corrective remediation action items

import { setCorsHeaders, handleOptions, errorResponse, successResponse } from "../../_lib/cors.js";
import { getActionsList, updateActionItem, createBulkActions } from "../../_lib/compliance/actionService.js";
import { checkRateLimit } from "../../_lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const allowed = await checkRateLimit(`compliance:act:${clientIp}`, 30, 60);
    if (!allowed) {
      return errorResponse(res, 429, "Rate limit exceeded. Maximum 30 action management requests per minute.");
    }

    if (req.method === "GET") {
      const { status } = req.query || {};
      const actions = getActionsList(status);
      return successResponse(res, { actions });
    }

    if (req.method === "POST") {
      const { items } = req.body || {};
      if (!Array.isArray(items) || items.length === 0) {
        return errorResponse(res, 400, "items array is required for creating actions.");
      }
      const created = createBulkActions(items);
      return successResponse(res, {
        message: `${created.length} corrective action item(s) created successfully.`,
        created
      });
    }

    if (req.method === "PUT") {
      const { actionId, updates } = req.body || {};
      if (!actionId || !updates) {
        return errorResponse(res, 400, "actionId and updates object are required.");
      }
      const updated = updateActionItem(actionId, updates);
      if (!updated) {
        return errorResponse(res, 404, `Action ${actionId} not found.`);
      }
      return successResponse(res, {
        message: `Action ${actionId} updated successfully.`,
        action: updated
      });
    }

    return errorResponse(res, 405, "Method Not Allowed");
  } catch (err) {
    console.error("[compliance/actions] Error:", err);
    return errorResponse(res, 500, `Internal server error: ${err.message}`);
  }
}


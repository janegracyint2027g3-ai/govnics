// api/compliance/checklist.js
// GET & PUT /api/compliance/checklist — Retrieve and update compliance checklist

import { getAuthenticatedUser } from "../lib/auth.js";
import { redis, KEYS } from "../lib/redis.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../lib/cors.js";
import { auditLog } from "../lib/auth.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (!["GET", "PUT"].includes(req.method)) {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return errorResponse(res, 401, "Not authenticated.");

    if (!user.companyId) {
      return errorResponse(res, 404, "No company profile found.");
    }

    // Verify company ownership
    const companyRaw = await redis.get(KEYS.company(user.companyId));
    if (!companyRaw) return errorResponse(res, 404, "Company profile not found.");
    const company = typeof companyRaw === "string" ? JSON.parse(companyRaw) : companyRaw;
    if (company.ownerId !== user.userId) {
      return errorResponse(res, 403, "Not authorised to access this checklist.");
    }

    if (req.method === "GET") {
      const checklistRaw = await redis.get(KEYS.checklist(user.companyId));
      if (!checklistRaw) {
        return res.status(404).json({
          success: false,
          error: "No checklist found. Please generate your compliance checklist first.",
          notGenerated: true,
        });
      }
      const checklist =
        typeof checklistRaw === "string" ? JSON.parse(checklistRaw) : checklistRaw;
      return successResponse(res, { checklist });
    }

    if (req.method === "PUT") {
      // Update individual item statuses / notes / deadlines
      const { itemUpdates } = req.body || {};

      if (!Array.isArray(itemUpdates) || itemUpdates.length === 0) {
        return errorResponse(res, 400, "itemUpdates array is required.");
      }

      const checklistRaw = await redis.get(KEYS.checklist(user.companyId));
      if (!checklistRaw) {
        return errorResponse(res, 404, "No checklist found. Generate one first.");
      }
      const checklist =
        typeof checklistRaw === "string" ? JSON.parse(checklistRaw) : checklistRaw;

      const VALID_STATUSES = ["Not Started", "In Progress", "Completed", "Needs Review", "Not Applicable"];

      // Apply updates
      let updatedCount = 0;
      checklist.items = checklist.items.map((item) => {
        const update = itemUpdates.find((u) => u.ruleId === item.ruleId);
        if (!update) return item;

        const updated = { ...item };

        if (update.completionStatus && VALID_STATUSES.includes(update.completionStatus)) {
          updated.completionStatus = update.completionStatus;
        }
        if (typeof update.notes === "string") {
          updated.notes = update.notes.slice(0, 2000); // Sanitise length
        }
        if (update.internalDeadline !== undefined) {
          updated.internalDeadline = update.internalDeadline;
        }

        updatedCount++;
        return updated;
      });

      checklist.lastUpdated = new Date().toISOString();
      checklist.lastUpdatedBy = user.userId;

      await redis.set(KEYS.checklist(user.companyId), JSON.stringify(checklist));
      await auditLog(user.userId, "CHECKLIST_UPDATED", {
        companyId: user.companyId,
        updatedCount,
      });

      return successResponse(res, {
        checklist,
        message: `${updatedCount} checklist item(s) updated successfully.`,
      });
    }
  } catch (err) {
    console.error("[compliance/checklist] Error:", err);
    return errorResponse(res, 500, "Error processing checklist request.");
  }
}

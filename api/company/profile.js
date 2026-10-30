// api/company/profile.js
// GET & PUT /api/company/profile — Company profile management

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
      return errorResponse(res, 404, "No company profile found for this account.");
    }

    if (req.method === "GET") {
      const companyRaw = await redis.get(KEYS.company(user.companyId));
      if (!companyRaw) {
        return errorResponse(res, 404, "Company profile not found.");
      }
      const company = typeof companyRaw === "string" ? JSON.parse(companyRaw) : companyRaw;
      return successResponse(res, { company });
    }

    if (req.method === "PUT") {
      const companyRaw = await redis.get(KEYS.company(user.companyId));
      if (!companyRaw) {
        return errorResponse(res, 404, "Company profile not found.");
      }
      const existing = typeof companyRaw === "string" ? JSON.parse(companyRaw) : companyRaw;

      // Validate ownership — company must belong to authenticated user
      if (existing.ownerId !== user.userId) {
        return errorResponse(res, 403, "Not authorised to update this company profile.");
      }

      const {
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

      // Validation
      if (companyName && companyName.trim().length < 2) {
        return errorResponse(res, 400, "Company name must be at least 2 characters.");
      }

      const updated = {
        ...existing,
        companyName: companyName?.trim() || existing.companyName,
        officialWebsite: officialWebsite?.trim() ?? existing.officialWebsite,
        country: country?.trim() || existing.country,
        state: state?.trim() ?? existing.state,
        city: city?.trim() ?? existing.city,
        industrySector: industrySector || existing.industrySector,
        subIndustry: subIndustry ?? existing.subIndustry,
        companySize: companySize || existing.companySize,
        businessOperations: Array.isArray(businessOperations)
          ? businessOperations
          : existing.businessOperations,
        businessRegistrationType: businessRegistrationType ?? existing.businessRegistrationType,
        updatedAt: new Date().toISOString(),
      };

      await redis.set(KEYS.company(user.companyId), JSON.stringify(updated));
      await auditLog(user.userId, "COMPANY_PROFILE_UPDATED", { companyId: user.companyId });

      return successResponse(res, { company: updated, message: "Company profile updated." });
    }
  } catch (err) {
    console.error("[company/profile] Error:", err);
    return errorResponse(res, 500, "Error processing company profile request.");
  }
}

// api/auth/me.js
// GET /api/auth/me — Return current authenticated user

import { getAuthenticatedUser } from "../lib/auth.js";
import { redis, KEYS } from "../lib/redis.js";
import { setCorsHeaders, handleOptions, successResponse, errorResponse } from "../lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res, req.headers.origin);
  if (handleOptions(req, res)) return;

  if (req.method !== "GET") {
    return errorResponse(res, 405, "Method Not Allowed");
  }

  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return errorResponse(res, 401, "Not authenticated.");
    }

    // Fetch company info
    let company = null;
    if (user.companyId) {
      const companyRaw = await redis.get(KEYS.company(user.companyId));
      if (companyRaw) {
        company = typeof companyRaw === "string" ? JSON.parse(companyRaw) : companyRaw;
      }
    }

    return successResponse(res, {
      user: {
        userId: user.userId,
        preferredUserId: user.preferredUserId,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        companyId: user.companyId,
        emailVerified: user.emailVerified,
        accountStatus: user.accountStatus,
        createdAt: user.createdAt,
      },
      company: company
        ? {
            companyId: company.companyId,
            companyName: company.companyName,
            officialWebsite: company.officialWebsite,
            country: company.country,
            state: company.state,
            city: company.city,
            industrySector: company.industrySector,
            subIndustry: company.subIndustry,
            companySize: company.companySize,
            businessOperations: company.businessOperations,
            businessRegistrationType: company.businessRegistrationType,
          }
        : null,
    });
  } catch (err) {
    console.error("[me] Error:", err);
    return errorResponse(res, 500, "Error fetching user profile.");
  }
}

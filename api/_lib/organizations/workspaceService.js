// api/lib/organizations/workspaceService.js
// Phase 4 — Organization Workspaces & 7-Role Server-Side RBAC

export const USER_ROLES = [
  "Super Administrator",
  "GOVENICS Administrator",
  "Consultant",
  "Organization Administrator",
  "Compliance Manager",
  "Department Head",
  "Read-only Auditor"
];

// Seed organization workspace
export const ORGANIZATIONS_STORE = [
  {
    orgId: "ORG-GOVENICS-DEMO",
    orgName: "Acme Industrial Technologies Ltd",
    industrySector: "Manufacturing & Industrial",
    subIndustry: "Precision Engineering & Heavy Machinery",
    primaryJurisdiction: "India",
    statesOfOperation: ["Maharashtra", "Karnataka", "Tamil Nadu"],
    facilityLocations: ["Pune Plant 1", "Bengaluru Tech Centre", "Chennai Assembly Unit"],
    departments: [
      "Health, Safety & Environment (HSE)",
      "Human Resources & Industrial Relations",
      "Legal & Secretarial",
      "Finance & Accounts",
      "Information Security (IT/SOC)"
    ],
    employeeCount: 1250,
    annualTurnover: "₹180 Crores",
    authorizedUsers: [
      { userId: "usr-admin-01", email: "admin@acme-ind.com", role: "Organization Administrator", department: "Executive" },
      { userId: "usr-comp-01", email: "compliance@acme-ind.com", role: "Compliance Manager", department: "Legal & Secretarial" },
      { userId: "usr-ehs-01", email: "ehs.lead@acme-ind.com", role: "Department Head", department: "Health, Safety & Environment (HSE)" },
      { userId: "usr-audit-01", email: "external.auditor@kpmg-audit.com", role: "Read-only Auditor", department: "External Audit" }
    ],
    createdAt: "2026-01-15T09:00:00Z",
    isActive: true
  }
];

export function getOrganizationById(orgId) {
  return ORGANIZATIONS_STORE.find(o => o.orgId === orgId) || null;
}

export function validateUserOrgAccess(userEmail, orgId, requiredRoles = []) {
  const org = getOrganizationById(orgId);
  if (!org) return { allowed: false, reason: "Organization not found." };

  const member = org.authorizedUsers.find(u => u.email === userEmail);
  if (!member) {
    return { allowed: false, reason: "User is not a member of this organization workspace (Tenant Isolation Enforced)." };
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(member.role)) {
    return { allowed: false, reason: `Role ${member.role} lacks required permissions: [${requiredRoles.join(", ")}]` };
  }

  return { allowed: true, member, org };
}


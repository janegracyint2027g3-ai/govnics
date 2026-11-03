// api/lib/security/rbacService.js
// Phase 9.1 & 9.2 — Enterprise Identity, Access Management & Security Operations
// 11 Enterprise Roles, Permission Matrix, and Security Event Logging

export const ENTERPRISE_ROLES = [
  "Super Administrator",
  "Platform Administrator",
  "Organization Administrator",
  "GRC Manager",
  "Compliance Officer",
  "Legal Reviewer",
  "Auditor",
  "Consultant",
  "Department Manager",
  "Employee",
  "Read-only Auditor"
];

// Comprehensive permission matrix
export const ROLE_PERMISSIONS = {
  "Super Administrator": ["*"],
  "Platform Administrator": ["admin:*", "security:*", "compliance:*", "reports:*"],
  "Organization Administrator": ["org:*", "compliance:*", "audits:*", "risk:*", "users:*", "billing:*"],
  "GRC Manager": ["compliance:*", "audits:*", "risk:*", "capa:*", "reports:read", "reports:write"],
  "Compliance Officer": ["compliance:read", "compliance:write", "tasks:manage", "evidence:upload", "reports:read"],
  "Legal Reviewer": ["regulatory:verify", "compliance:read", "contracts:review", "evidence:approve"],
  "Auditor": ["audits:manage", "findings:create", "capa:review", "reports:read"],
  "Consultant": ["audits:read", "compliance:read", "evidence:review", "timesheets:manage"],
  "Department Manager": ["tasks:read", "tasks:update", "evidence:upload", "compliance:read"],
  "Employee": ["tasks:read", "tasks:update", "evidence:upload"],
  "Read-only Auditor": ["compliance:read", "audits:read", "reports:read", "evidence:read"]
};

let IN_MEMORY_SECURITY_EVENTS = [
  {
    eventId: "SEC-EVT-001",
    timestamp: "2026-11-03T10:00:00Z",
    eventType: "AUTH_SUCCESS",
    userId: "usr-admin-01",
    ipAddress: "103.21.244.18",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "Info",
    details: "MFA verified session initiated for admin@acme-ind.com"
  },
  {
    eventId: "SEC-EVT-002",
    timestamp: "2026-11-03T10:45:00Z",
    eventType: "RATE_LIMIT_WARNING",
    userId: "anon-api-client",
    ipAddress: "185.220.101.5",
    userAgent: "Python/requests",
    severity: "Warning",
    details: "Excessive burst requests on /api/regulatory/sources throttled at 2000ms delay"
  }
];

export function hasPermission(userRole, requiredPermission) {
  if (!userRole) return false;
  const perms = ROLE_PERMISSIONS[userRole] || [];
  if (perms.includes("*")) return true;
  if (perms.includes(requiredPermission)) return true;

  // Wildcard check e.g. compliance:* matches compliance:read
  const [domain] = requiredPermission.split(":");
  if (perms.includes(`${domain}:*`)) return true;

  return false;
}

export function logSecurityEvent(eventType, details, severity = "Info", userContext = {}) {
  const event = {
    eventId: `SEC-EVT-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    eventType,
    userId: userContext.userId || "system",
    ipAddress: userContext.ipAddress || "internal",
    userAgent: userContext.userAgent || "internal",
    severity,
    details
  };
  IN_MEMORY_SECURITY_EVENTS.push(event);
  return event;
}

export function getSecurityEvents(limit = 50) {
  return IN_MEMORY_SECURITY_EVENTS.slice(-limit);
}


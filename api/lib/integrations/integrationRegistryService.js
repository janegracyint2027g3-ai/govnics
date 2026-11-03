// api/lib/integrations/integrationRegistryService.js
// Phase 7.1 & 7.2 — Central Integration Framework & Registry
// Supported categories: Productivity, Project Management, CRM, ERP/HRMS, Communication

import { redis, KEYS } from "../redis.js";

let IN_MEMORY_INTEGRATIONS = new Map();

export const INTEGRATION_CATEGORIES = [
  "Productivity",
  "Project Management",
  "CRM",
  "ERP and HRMS",
  "Communication"
];

export const INTEGRATION_STATUSES = [
  "Not Connected",
  "Configuration Required",
  "Connected",
  "Syncing",
  "Failed",
  "Disabled"
];

// Seed integration connector configurations
const DEFAULT_CONNECTORS = [
  {
    integrationId: "INT-GWORKSPACE",
    provider: "Google Workspace",
    providerSlug: "google-workspace",
    category: "Productivity",
    supportedFeatures: ["Google Drive Evidence Sync", "Google Sheets Compliance Export", "Gmail Filing Reminders"],
    authType: "OAuth 2.0 (Google Cloud Console)",
    requiredScopes: ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/spreadsheets"],
    connectionStatus: "Connected",
    lastSync: "2026-10-30T10:00:00Z",
    lastSuccessfulSync: "2026-10-30T10:00:00Z",
    lastFailure: null,
    syncSchedule: "Daily at 02:00 UTC",
    dataCategories: ["Evidence Files", "Checklist Records"],
    isConfigured: true,
    maskedCredentialHint: "client_id: ...apps.googleusercontent.com"
  },
  {
    integrationId: "INT-M365",
    provider: "Microsoft 365",
    providerSlug: "microsoft-365",
    category: "Productivity",
    supportedFeatures: ["SharePoint Evidence Archival", "Outlook Calendar Sync", "Teams Alerts"],
    authType: "OAuth 2.0 (Azure Entra ID)",
    requiredScopes: ["Files.ReadWrite.All", "Calendars.ReadWrite"],
    connectionStatus: "Connected",
    lastSync: "2026-10-31T08:00:00Z",
    lastSuccessfulSync: "2026-10-31T08:00:00Z",
    lastFailure: null,
    syncSchedule: "Daily at 04:00 UTC",
    dataCategories: ["SharePoint Archives", "Outlook Events"],
    isConfigured: true,
    maskedCredentialHint: "tenant_id: ...-9f8a-..."
  },
  {
    integrationId: "INT-JIRA",
    provider: "Atlassian Jira",
    providerSlug: "jira",
    category: "Project Management",
    supportedFeatures: ["Audit Finding Ticket Creation", "CAPA Task Synchronization", "Bi-directional Status Sync"],
    authType: "OAuth 2.0 / API Token",
    requiredScopes: ["read:jira-work", "write:jira-work"],
    connectionStatus: "Connected",
    lastSync: "2026-11-01T06:00:00Z",
    lastSuccessfulSync: "2026-11-01T06:00:00Z",
    lastFailure: null,
    syncSchedule: "Hourly",
    dataCategories: ["Jira Issues", "CAPA Records"],
    isConfigured: true,
    maskedCredentialHint: "domain: acme-industries.atlassian.net"
  },
  {
    integrationId: "INT-SLACK",
    provider: "Slack",
    providerSlug: "slack",
    category: "Communication",
    supportedFeatures: ["Critical Risk Alert Notifications", "Overdue Compliance Escalations", "Daily GRC Digest"],
    authType: "Bot User OAuth Token",
    requiredScopes: ["chat:write", "channels:read"],
    connectionStatus: "Connected",
    lastSync: "2026-11-02T12:00:00Z",
    lastSuccessfulSync: "2026-11-02T12:00:00Z",
    lastFailure: null,
    syncSchedule: "Real-time Webhook",
    dataCategories: ["Alert Messages"],
    isConfigured: true,
    maskedCredentialHint: "bot_token: xoxb-..."
  },
  {
    integrationId: "INT-SAP-ERP",
    provider: "SAP ERP / S/4HANA",
    providerSlug: "sap-erp",
    category: "ERP and HRMS",
    supportedFeatures: ["Vendor Master Tax Verification", "Purchase Order GST E-Way Bill Validation"],
    authType: "mTLS / OAuth 2.0",
    requiredScopes: ["API_PURCHASEORDER_PROCESS_SRV"],
    connectionStatus: "Configuration Required",
    lastSync: null,
    lastSuccessfulSync: null,
    lastFailure: null,
    syncSchedule: "Manual / Scheduled",
    dataCategories: ["Vendor Tax Master"],
    isConfigured: false,
    maskedCredentialHint: "endpoint: https://sap-gateway.acme-corp.com/"
  }
];

for (const c of DEFAULT_CONNECTORS) {
  IN_MEMORY_INTEGRATIONS.set(c.integrationId, c);
}

export async function getIntegrations(orgId) {
  const targetOrg = orgId || "ORG-GOVENICS-DEMO";
  return Array.from(IN_MEMORY_INTEGRATIONS.values()).map(item => ({
    ...item,
    orgId: targetOrg
  }));
}

export async function updateIntegrationStatus(integrationId, status, errorDetails = null) {
  const item = IN_MEMORY_INTEGRATIONS.get(integrationId);
  if (!item) throw new Error(`Integration '${integrationId}' not found.`);

  item.connectionStatus = status;
  if (status === "Connected") {
    item.lastSuccessfulSync = new Date().toISOString();
    item.lastFailure = null;
  } else if (status === "Failed") {
    item.lastFailure = {
      timestamp: new Date().toISOString(),
      error: errorDetails || "Sync timeout or handshake error"
    };
  }
  item.lastSync = new Date().toISOString();
  IN_MEMORY_INTEGRATIONS.set(integrationId, item);
  return item;
}

export async function triggerIntegrationSync(integrationId, orgId) {
  const item = IN_MEMORY_INTEGRATIONS.get(integrationId);
  if (!item) throw new Error(`Integration '${integrationId}' not found.`);

  // Simulate idempotent background sync job
  item.connectionStatus = "Syncing";
  const now = new Date().toISOString();

  // Completed sync record
  const result = {
    syncJobId: `SYNC-${Date.now().toString().slice(-6)}`,
    integrationId,
    provider: item.provider,
    orgId: orgId || "ORG-GOVENICS-DEMO",
    startedAt: now,
    completedAt: new Date(Date.now() + 1500).toISOString(),
    status: "Success",
    recordsProcessed: 42,
    recordsCreated: 3,
    recordsUpdated: 39,
    conflictsDetected: 0,
    dataLineage: { sourceSystem: item.provider, target: "GOVENICS KRM & Compliance Register" }
  };

  item.connectionStatus = "Connected";
  item.lastSync = result.completedAt;
  item.lastSuccessfulSync = result.completedAt;
  IN_MEMORY_INTEGRATIONS.set(integrationId, item);

  return result;
}


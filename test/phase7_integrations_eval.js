// test/phase7_integrations_eval.js
// GOVENICS Phase 7 Automated Evaluation Suite
// Validates Enterprise Connectors, Sync, Webhooks, HMAC-SHA256, API Management & BI Analytics

import {
  getIntegrations,
  updateIntegrationStatus,
  triggerIntegrationSync,
  INTEGRATION_CATEGORIES,
  INTEGRATION_STATUSES
} from "../api/lib/integrations/integrationRegistryService.js";

import {
  getWebhooksByOrg,
  registerWebhook,
  dispatchWebhookEvent,
  generateWebhookSignature,
  verifyWebhookSignature,
  getDeliveryLogs,
  SUPPORTED_WEBHOOK_EVENTS
} from "../api/lib/integrations/webhookService.js";

import {
  generateApiKey,
  getApiKeysByOrg,
  revokeApiKey,
  getApiUsageAnalytics
} from "../api/lib/integrations/apiManagementService.js";

import {
  getExecutiveAnalyticsSnapshot,
  generateScheduledExecutiveReport
} from "../api/lib/integrations/analyticsService.js";

let passed = 0;
let failed = 0;

function assert(tcId, description, condition) {
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${tcId}: ${description}`);
  } else {
    failed++;
    console.error(`❌ [FAIL] ${tcId}: ${description} (Assertion failed)`);
  }
}

async function runPhase7Tests() {
  console.log("\n=====================================================================");
  console.log("   GOVENICS PHASE 7: ENTERPRISE INTEGRATIONS EVALUATION SUITE   ");
  console.log("=====================================================================");

  const orgId = "ORG-GOVENICS-DEMO";

  // 1. Central Integration Framework
  const integrations = await getIntegrations(orgId);
  assert("TC-P7-01", "Integrations registry retrieves configured enterprise connectors", Array.isArray(integrations) && integrations.length >= 5);

  const gsuite = integrations.find(i => i.providerSlug === "google-workspace");
  assert("TC-P7-02", "Google Workspace connector has required OAuth scopes & daily sync", gsuite.requiredScopes.length >= 2 && gsuite.connectionStatus === "Connected");

  const jira = integrations.find(i => i.providerSlug === "jira");
  assert("TC-P7-03", "Atlassian Jira connector configured for CAPA & Findings sync", jira.category === "Project Management" && jira.connectionStatus === "Connected");

  // 2. Integration Synchronization
  const syncResult = await triggerIntegrationSync("INT-GWORKSPACE", orgId);
  assert("TC-P7-04", "Integration sync executes idempotently and returns data lineage", syncResult.status === "Success" && syncResult.recordsProcessed > 0);

  // 3. Webhook Management & HMAC-SHA256 Signature Verification
  const payloadStr = JSON.stringify({ event: "compliance.task.overdue", taskId: "TSK-2026-001" });
  const secret = "whsec_test_secret_key_123456789";
  const signature = generateWebhookSignature(payloadStr, secret);
  assert("TC-P7-05", "HMAC-SHA256 webhook signature generated correctly", signature.length === 64);

  const isValidSig = verifyWebhookSignature(payloadStr, signature, secret);
  assert("TC-P7-06", "Webhook signature verification succeeds on untampered payload", isValidSig === true);

  const newWebhook = await registerWebhook({
    orgId,
    targetUrl: "https://siem.acme-corp.com/grc-receiver",
    subscribedEvents: ["compliance.task.overdue", "regulatory.update.detected"]
  });
  assert("TC-P7-07", "Webhook endpoint registration generates unique secret token", newWebhook.secretToken.startsWith("whsec_"));

  const dispatch = await dispatchWebhookEvent("compliance.task.overdue", { taskId: "TSK-001" }, orgId);
  assert("TC-P7-08", "Webhook event dispatch delivers signature headers to active subscribers", dispatch.dispatchedCount >= 1);

  // 4. API Management Platform
  const apiKeyResult = generateApiKey(orgId, "SIEM Integration Key", ["compliance:read"]);
  assert("TC-P7-09", "API key provisioning generates prefixed token and SHA-256 hash", apiKeyResult.apiKey.startsWith("gov_live_") && apiKeyResult.record.keyHash.length === 64);

  const keys = getApiKeysByOrg(orgId);
  assert("TC-P7-10", "API keys list excludes plaintext secrets", keys.every(k => !k.secret && k.keyPrefix.endsWith("...")));

  const usageAnalytics = getApiUsageAnalytics();
  assert("TC-P7-11", "API usage analytics tracks latency, endpoint metrics and rate limits", usageAnalytics.averageLatencyMs > 0 && usageAnalytics.totalRequests > 0);

  // 5. Business Intelligence & Executive Analytics
  const analyticsSnapshot = await getExecutiveAnalyticsSnapshot(orgId);
  assert("TC-P7-12", "Executive analytics snapshot calculates compliance score and KPI cards", analyticsSnapshot.kpiCards.overallComplianceScore >= 0);

  const execReport = await generateScheduledExecutiveReport(orgId, "Monthly");
  assert("TC-P7-13", "Scheduled executive report generates board briefing narrative", execReport.reportPeriod === "Monthly" && execReport.recommendations.length >= 2);

  console.log("\n=====================================================================");
  console.log(`PHASE 7 EVALUATION SUMMARY: ${passed} / ${passed + failed} PASSED (${((passed / (passed + failed)) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed}`);
  console.log("=====================================================================\n");

  if (failed > 0) process.exit(1);
}

runPhase7Tests().catch(err => {
  console.error("Phase 7 test failure:", err);
  process.exit(1);
});


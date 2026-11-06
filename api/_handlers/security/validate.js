// api/_handlers/security/validate.js
// Dedicated Endpoint for GOVENICS Security Controller & API Validation
// GET: Inspect security controller posture, active defense rules, live metrics & incident log
// POST: Interactive validation sandbox for testing payloads, injection detection & schemas

import {
  validateApiRequest,
  getSecurityPostureMetrics,
  inspectSecurityThreats,
  validateSchema,
  checkRateLimit,
  authenticateSecurityContext
} from "../../_lib/security/securityController.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 1. GET: Return Security Controller Telemetry & Posture
  if (req.method === "GET") {
    const metrics = getSecurityPostureMetrics();
    return res.status(200).json({
      success: true,
      service: "GOVENICS Enterprise Security Controller",
      version: "9.4-hardened",
      status: "HEALTHY_ACTIVE",
      defenses: {
        sqlInjectionProtection: "Active (Regex AST & Taint Analysis)",
        xssSanitization: "Active (OWASP Top 10 Sanitizer)",
        noSqlInjectionGuards: "Active (Key & Operator Filter)",
        pathTraversalDefense: "Active (Directory Escapes Interceptor)",
        promptInjectionGuardrails: "Active (Grounded Regulatory Sanitizer)",
        rateLimiterEngine: "Sliding-Window 60s",
        schemaValidator: "Multi-Type JSON Schema Evaluator",
        rbacGatekeeper: "11 Enterprise Roles Matrix"
      },
      metrics
    });
  }

  // 2. POST: Test / Execute Security Validation Sandbox
  if (req.method === "POST") {
    // Run basic security controller check on the request itself
    const gate = await validateApiRequest(req, res, {
      rateLimit: 60,
      allowInjections: true // Allow payload testing without premature termination
    });
    if (!gate.ok) return;

    const { action, payload, schema, input, key, token } = req.body || {};

    // A. Interactive Injection & Threat Test
    if (action === "test_input" || (input !== undefined && !action)) {
      const threatResult = inspectSecurityThreats(input || payload);
      return res.status(200).json({
        success: true,
        action: "test_input",
        isSafe: threatResult.isSafe,
        threatType: threatResult.threatType || "NONE",
        pattern: threatResult.pattern || null,
        sample: threatResult.sample || null,
        verdict: threatResult.isSafe ? "PASSED_SECURITY_GATE" : "BLOCKED_THREAT_DETECTED"
      });
    }

    // B. Interactive Schema Validation Test
    if (action === "test_schema") {
      if (!schema || typeof schema !== "object") {
        return res.status(400).json({ error: "Missing 'schema' object for test_schema action." });
      }
      const valResult = validateSchema(schema, payload || {});
      return res.status(200).json({
        success: true,
        action: "test_schema",
        valid: valResult.valid,
        errors: valResult.errors,
        verdict: valResult.valid ? "SCHEMA_VALID" : "SCHEMA_VALIDATION_FAILED"
      });
    }

    // C. Interactive Rate Limit Status Check
    if (action === "test_rate_limit") {
      const targetKey = key || req.headers?.["x-forwarded-for"] || "sandbox-test-client";
      const rl = checkRateLimit(targetKey, 100);
      return res.status(200).json({
        success: true,
        action: "test_rate_limit",
        key: targetKey,
        ...rl
      });
    }

    // D. Interactive Auth Token Inspection
    if (action === "test_auth") {
      const auth = await authenticateSecurityContext(req);
      return res.status(200).json({
        success: true,
        action: "test_auth",
        authContext: auth
      });
    }

    // E. Full Multi-Layer Validation on arbitrary data
    const threatCheck = inspectSecurityThreats(payload || {});
    let schemaCheck = { valid: true, errors: [] };
    if (schema) {
      schemaCheck = validateSchema(schema, payload || {});
    }

    return res.status(200).json({
      success: true,
      action: "full_validation",
      threatCheck: {
        isSafe: threatCheck.isSafe,
        threatType: threatCheck.threatType || "NONE",
        pattern: threatCheck.pattern || null
      },
      schemaCheck: {
        valid: schemaCheck.valid,
        errors: schemaCheck.errors
      },
      overallVerdict: threatCheck.isSafe && schemaCheck.valid ? "PASSED" : "REJECTED"
    });
  }

  return res.status(405).json({ error: "Method not allowed." });
}

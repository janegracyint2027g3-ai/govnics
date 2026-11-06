// Central Serverless API Gateway for GOVENICS GRC Platform
// Consolidates all API endpoints into a single function to comply with Vercel Hobby plan limits (max 12 functions)

import authLogin from './_handlers/auth/login.js';
import authRegister from './_handlers/auth/register.js';
import authMe from './_handlers/auth/me.js';
import authLogout from './_handlers/auth/logout.js';
import authCheckAvailability from './_handlers/auth/check-availability.js';
import authSessions from './_handlers/auth/sessions.js';
import companyProfile from './_handlers/company/profile.js';

import complianceChecklist from './_handlers/compliance/checklist.js';
import complianceGenerate from './_handlers/compliance/generate.js';
import complianceRegister from './_handlers/compliance/register.js';
import complianceCalendar from './_handlers/compliance/calendar.js';
import complianceTasks from './_handlers/compliance/tasks.js';
import complianceAudits from './_handlers/compliance/audits.js';
import complianceEvidence from './_handlers/compliance/evidence.js';
import complianceCapa from './_handlers/compliance/capa.js';
import complianceEscalations from './_handlers/compliance/escalations.js';
import complianceIntelligentChecklist from './_handlers/compliance/intelligent-checklist.js';
import complianceGapAssessment from './_handlers/compliance/gap-assessment.js';
import complianceDocumentIntelligence from './_handlers/compliance/document-intelligence.js';
import compliancePolicies from './_handlers/compliance/policies.js';
import complianceActions from './_handlers/compliance/actions.js';

import knowledgeOrchestrate from './_handlers/knowledge/orchestrate.js';
import knowledgeDocuments from './_handlers/knowledge/documents.js';
import knowledgeRetrieve from './_handlers/knowledge/retrieve.js';
import knowledgeAgents from './_handlers/knowledge/agents.js';

import krmDocuments from './_handlers/krm/documents.js';
import krmAuditReport from './_handlers/krm/audit-report.js';
import krmUrlAudit from './_handlers/krm/url-audit.js';

import regulatorySources from './_handlers/regulatory/sources.js';
import regulatoryCoverage from './_handlers/regulatory/coverage.js';
import regulatoryProvisions from './_handlers/regulatory/provisions.js';
import regulatoryExtract from './_handlers/regulatory/extract.js';
import regulatoryApplicability from './_handlers/regulatory/applicability.js';
import regulatoryVerification from './_handlers/regulatory/verification.js';
import regulatoryElibrary from './_handlers/regulatory/elibrary.js';
import regulatoryIndustry from './_handlers/regulatory/industry.js';
import regulatoryMonitoring from './_handlers/regulatory/monitoring.js';
import regulatoryLegalReview from './_handlers/regulatory/legal-review.js';
import regulatoryJobs from './_handlers/regulatory/jobs.js';

import integrationsRegistry from './_handlers/integrations/registry.js';
import integrationsWebhooks from './_handlers/integrations/webhooks.js';
import integrationsApikeys from './_handlers/integrations/apikeys.js';
import integrationsAnalytics from './_handlers/integrations/analytics.js';

import portalsCustomer from './_handlers/portals/customer.js';
import portalsConsultant from './_handlers/portals/consultant.js';
import portalsBilling from './_handlers/portals/billing.js';
import portalsLeads from './_handlers/portals/leads.js';

import securityEvents from './_handlers/security/events.js';
import securityGovernance from './_handlers/security/governance.js';
import securityMonitoring from './_handlers/security/monitoring.js';
import securityRecovery from './_handlers/security/recovery.js';
import securityValidate from './_handlers/security/validate.js';
import libraryResources from './_handlers/library/resources.js';
import cmsSyncStatus from './_handlers/cms-sync/status.js';

import riskRegister from './_handlers/risk/register.js';
import reportsGenerate from './_handlers/reports/generate.js';
import organizationsWorkspaces from './_handlers/organizations/workspaces.js';

const exactRoutes = {
  '/api/auth/login': authLogin,
  '/api/auth/register': authRegister,
  '/api/auth/me': authMe,
  '/api/auth/logout': authLogout,
  '/api/auth/check-availability': authCheckAvailability,
  '/api/auth/sessions': authSessions,
  '/api/company/profile': companyProfile,

  '/api/compliance/checklist': complianceChecklist,
  '/api/compliance/generate': complianceGenerate,
  '/api/compliance/register': complianceRegister,
  '/api/compliance/calendar': complianceCalendar,
  '/api/compliance/tasks': complianceTasks,
  '/api/compliance/audits': complianceAudits,
  '/api/compliance/evidence': complianceEvidence,
  '/api/compliance/capa': complianceCapa,
  '/api/compliance/escalations': complianceEscalations,
  '/api/compliance/intelligent-checklist': complianceIntelligentChecklist,
  '/api/compliance/gap-assessment': complianceGapAssessment,
  '/api/compliance/document-intelligence': complianceDocumentIntelligence,
  '/api/compliance/policies': compliancePolicies,
  '/api/compliance/actions': complianceActions,

  '/api/knowledge/orchestrate': knowledgeOrchestrate,
  '/api/knowledge/documents': knowledgeDocuments,
  '/api/knowledge/retrieve': knowledgeRetrieve,
  '/api/knowledge/agents': knowledgeAgents,

  '/api/krm/documents': krmDocuments,
  '/api/krm/audit-report': krmAuditReport,
  '/api/krm/url-audit': krmUrlAudit,

  '/api/regulatory/sources': regulatorySources,
  '/api/regulatory/coverage': regulatoryCoverage,
  '/api/regulatory/provisions': regulatoryProvisions,
  '/api/regulatory/extract': regulatoryExtract,
  '/api/regulatory/applicability': regulatoryApplicability,
  '/api/regulatory/verification': regulatoryVerification,
  '/api/regulatory/elibrary': regulatoryElibrary,
  '/api/regulatory/industry': regulatoryIndustry,
  '/api/regulatory/monitoring': regulatoryMonitoring,
  '/api/regulatory/legal-review': regulatoryLegalReview,
  '/api/regulatory/jobs': regulatoryJobs,

  '/api/integrations/registry': integrationsRegistry,
  '/api/integrations/webhooks': integrationsWebhooks,
  '/api/integrations/apikeys': integrationsApikeys,
  '/api/integrations/analytics': integrationsAnalytics,

  '/api/portals/customer': portalsCustomer,
  '/api/portals/consultant': portalsConsultant,
  '/api/portals/billing': portalsBilling,
  '/api/portals/leads': portalsLeads,

  '/api/security/events': securityEvents,
  '/api/security/governance': securityGovernance,
  '/api/security/monitoring': securityMonitoring,
  '/api/security/recovery': securityRecovery,
  '/api/security/validate': securityValidate,

  '/api/library/ebooks': libraryResources,
  '/api/library/blogs': libraryResources,
  '/api/library/acts': libraryResources,
  '/api/library/regulations': libraryResources,
  '/api/library/guides': libraryResources,
  '/api/library/industry-reports': libraryResources,
  '/api/library/checklists': libraryResources,
  '/api/library/templates': libraryResources,
  '/api/library/search': libraryResources,
  '/api/library/resource': libraryResources,
  '/api/library/categories': libraryResources,
  '/api/cms-sync/status': cmsSyncStatus,

  '/api/risk/register': riskRegister,
  '/api/reports/generate': reportsGenerate,
  '/api/organizations/workspaces': organizationsWorkspaces
};

export default async function handler(req, res) {
  try {
    // Enterprise Security Controller Gateway Headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Govenics-Security-Controller', 'v9.4-active');

    const rawUrl = req.url || '/';
    const parsed = new URL(rawUrl, `https://${req.headers?.host || 'localhost'}`);
    const pathname = parsed.pathname.replace(/\/$/, '') || '/';

    // 1. Direct exact route match
    let selectedHandler = exactRoutes[pathname];

    // 2. Prefix routes for parameterized endpoints
    if (!selectedHandler) {
      if (pathname.startsWith('/api/knowledge/documents')) {
        selectedHandler = knowledgeDocuments;
      } else if (pathname.startsWith('/api/krm/documents')) {
        selectedHandler = krmDocuments;
      } else if (pathname.startsWith('/api/regulatory/provisions')) {
        selectedHandler = regulatoryProvisions;
      } else if (pathname.startsWith('/api/regulatory/sources')) {
        selectedHandler = regulatorySources;
      } else if (pathname.startsWith('/api/regulatory/elibrary')) {
        selectedHandler = regulatoryElibrary;
      } else if (pathname.startsWith('/api/regulatory/industry')) {
        selectedHandler = regulatoryIndustry;
      } else if (pathname.startsWith('/api/regulatory/legal-review')) {
        selectedHandler = regulatoryLegalReview;
      } else if (pathname.startsWith('/api/regulatory/jobs')) {
        selectedHandler = regulatoryJobs;
      } else if (pathname.startsWith('/api/compliance/register')) {
        selectedHandler = complianceRegister;
      } else if (pathname.startsWith('/api/compliance/tasks')) {
        selectedHandler = complianceTasks;
      } else if (pathname.startsWith('/api/compliance/audits')) {
        selectedHandler = complianceAudits;
      } else if (pathname.startsWith('/api/compliance/evidence')) {
        selectedHandler = complianceEvidence;
      } else if (pathname.startsWith('/api/compliance/capa')) {
        selectedHandler = complianceCapa;
      } else if (pathname.startsWith('/api/portals/customer')) {
        selectedHandler = portalsCustomer;
      } else if (pathname.startsWith('/api/portals/consultant')) {
        selectedHandler = portalsConsultant;
      } else if (pathname.startsWith('/api/security/validate')) {
        selectedHandler = securityValidate;
      } else if (pathname.startsWith('/api/library/')) {
        selectedHandler = libraryResources;
      }
    }

    if (!selectedHandler) {
      return res.status(404).json({ error: 'Endpoint not found', path: pathname });
    }

    // Adapt Web standard Request handlers (e.g. krm handlers) to Node (req, res)
    const result = await selectedHandler(req, res);

    // If handler returned a Fetch API Response (e.g. from new Response(...))
    if (result && typeof result === 'object' && typeof result.text === 'function') {
      res.status(result.status || 200);
      if (result.headers && typeof result.headers.forEach === 'function') {
        result.headers.forEach((val, key) => res.setHeader(key, val));
      }
      const bodyText = await result.text();
      return res.send(bodyText);
    }

    return result;
  } catch (err) {
    console.error('[API Gateway Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  }
}


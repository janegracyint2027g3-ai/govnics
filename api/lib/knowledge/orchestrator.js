// api/lib/knowledge/orchestrator.js
// Phase 4 — Central GOVENICS AI Agent Orchestration Engine
// Workflow: User Input -> Intent Classification -> Agent Selection -> Jurisdiction -> Retrieval -> Evidence Check -> Tool Execution -> Citing -> Audit Logging

import { getAgentProfile, getAllAgentProfiles } from "./agentProfiles.js";
import { executeHybridRetrieval } from "./retrievalEngine.js";
import { getSeedDocuments, getAllSeedChunks } from "./seedDocuments.js";
import { STRUCTURED_PROVISIONS } from "../regulatory/sectionExtractionService.js";

// Helper to augment seed corpus with Phase 5 section-level structured provisions
export function getAugmentedRegulatoryCorpus() {
  const seedDocs = getSeedDocuments();
  const seedChunks = getAllSeedChunks();

  const provisionDocs = STRUCTURED_PROVISIONS.map(p => ({
    id: p.provisionId,
    recordId: p.provisionId,
    title: `${p.actTitle} — ${p.sectionNumber}`,
    enrichedTitle: `${p.actTitle} (${p.actNumber}) ${p.sectionNumber} ${p.subsection || ""} ${p.clause || ""}`.trim(),
    offering: p.offering,
    industry: p.industry,
    documentType: "Statutory / Legal Source",
    jurisdiction: {
      country: p.jurisdictionLevel === "State" ? "India" : "India",
      state: p.stateOrUtName || "Central",
      applicableRegulator: p.regulatoryAuthority,
      industryAuthority: p.responsibleDepartment
    },
    summary: p.simplifiedExplanation,
    trustState: p.verificationStatus,
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v4.0",
    statutoryReference: `${p.actTitle} ${p.sectionNumber}`,
    externalSourceUrl: p.sourceUrl,
    tags: [p.actTitle.toLowerCase(), p.sectionNumber.toLowerCase(), p.offering, p.industry.toLowerCase()],
    chunks: [
      {
        id: `${p.provisionId}-C01`,
        documentId: p.provisionId,
        chunkIndex: 1,
        content: `[Document: ${p.actTitle} | Section: ${p.sectionNumber} (${p.complianceRequirement})]\n\nOriginal Text: ${p.originalLegalText}\n\nCompliance Requirement: ${p.complianceRequirement}\n\nApplicability: ${p.applicabilityCondition}\n\nResponsible Role: ${p.responsibleDepartment} (${p.responsibleEntity})\n\nRequired Evidence: ${p.requiredEvidence}\n\nPenalty / Consequence: ${p.penaltyOrConsequence || "General statutory penalty"}\n\nAuthority: ${p.regulatoryAuthority}`,
        tokenCount: 120,
        sectionHeader: `${p.sectionNumber} ${p.complianceRequirement.slice(0, 40)}`,
        clauseReference: p.sectionNumber,
        keywords: [
          p.sectionNumber.toLowerCase(),
          p.actTitle.toLowerCase(),
          p.responsibleDepartment.toLowerCase(),
          ...(p.originalLegalText.toLowerCase().match(/\b[a-z]{4,}\b/g) || []).slice(0, 15)
        ]
      }
    ]
  }));

  const allDocs = [...seedDocs, ...provisionDocs];
  const allChunks = [...seedChunks, ...provisionDocs.flatMap(d => d.chunks)];

  return { documents: allDocs, chunks: allChunks };
}

// ─── 1. INTENT CATEGORIES & KEYWORD DICTIONARIES ──────────────────────────────
export const INTENT_CATEGORIES = {
  CHECKLIST_GENERATION: "checklist_generation",
  GAP_ASSESSMENT: "gap_assessment",
  RISK_ASSESSMENT: "risk_assessment",
  AUDIT_PREP: "audit_prep",
  POLICY_SOP_DRAFTING: "policy_sop_drafting",
  DOCUMENT_ANALYSIS: "document_analysis",
  REGULATORY_UPDATES: "regulatory_updates",
  TAX_TRADE: "tax_trade",
  LICENSING_PERMITS: "licensing_permits",
  LABOUR_EMPLOYMENT: "labour_employment",
  ENVIRONMENTAL_EHS: "environmental_ehs",
  CYBERSECURITY_PRIVACY: "cybersecurity_privacy",
  ESG_SUSTAINABILITY: "esg_sustainability",
  ENTERPRISE_GOVERNANCE: "enterprise_governance",
  MANAGEMENT_REPORTS: "management_reports",
  CONSULTATION: "consultation",
  GENERAL_COMPLIANCE: "general_compliance"
};

const INTENT_RULES = [
  {
    intent: INTENT_CATEGORIES.CHECKLIST_GENERATION,
    agentId: "agent-checklist-gen",
    keywords: ["checklist", "audit checklist", "generate checklist", "compliance items", "statutory checklist", "scoping"]
  },
  {
    intent: INTENT_CATEGORIES.GAP_ASSESSMENT,
    agentId: "agent-gap-assessment",
    keywords: ["gap assessment", "compliance gap", "deficiency", "shortfall", "non-compliance evaluation", "gap analysis"]
  },
  {
    intent: INTENT_CATEGORIES.RISK_ASSESSMENT,
    agentId: "agent-risk-mgmt",
    keywords: ["risk register", "risk score", "inherent risk", "residual risk", "5x5 heatmap", "mitigation strategy", "risk matrix", "kri"]
  },
  {
    intent: INTENT_CATEGORIES.AUDIT_PREP,
    agentId: "agent-audit-prep",
    keywords: ["audit prep", "statutory audit", "audit binder", "internal audit", "inspection readiness", "pre-audit"]
  },
  {
    intent: INTENT_CATEGORIES.POLICY_SOP_DRAFTING,
    agentId: "agent-policy-sop",
    keywords: ["draft policy", "policy template", "sop", "standard operating procedure", "employee handbook", "whistleblower policy", "posh policy"]
  },
  {
    intent: INTENT_CATEGORIES.DOCUMENT_ANALYSIS,
    agentId: "agent-doc-review",
    keywords: ["review document", "contract review", "clause extraction", "obligation extraction", "nda review", "vendor agreement"]
  },
  {
    intent: INTENT_CATEGORIES.REGULATORY_UPDATES,
    agentId: "agent-reg-intel",
    keywords: ["regulatory update", "gazette notification", "recent amendment", "circular", "statutory change", "new rule"]
  },
  {
    intent: INTENT_CATEGORIES.TAX_TRADE,
    agentId: "agent-tax-trade",
    keywords: ["gst", "rcm", "reverse charge", "itc", "input tax credit", "tds", "income tax", "customs tariff", "gstr-3b", "gstr-2b"]
  },
  {
    intent: INTENT_CATEGORIES.LICENSING_PERMITS,
    agentId: "agent-lic-permits",
    keywords: ["fssai", "trade license", "factory permit", "fire noc", "municipal clearance", "consent to establish", "consent to operate", "cte", "cto"]
  },
  {
    intent: INTENT_CATEGORIES.LABOUR_EMPLOYMENT,
    agentId: "agent-labour-emp",
    keywords: ["labour code", "gratuity", "provident fund", "epf", "esi", "clra", "minimum wages", "posh", "fixed term employment", "gig worker"]
  },
  {
    intent: INTENT_CATEGORIES.ENVIRONMENTAL_EHS,
    agentId: "agent-env-ehs",
    keywords: ["factories act", "safety officer", "hazardous process", "pollution control", "cpcb", "spcb", "working hours", "overtime", "occupational safety"]
  },
  {
    intent: INTENT_CATEGORIES.CYBERSECURITY_PRIVACY,
    agentId: "agent-cyber-priv",
    keywords: ["dpdp", "data protection", "cert-in", "data breach", "privacy notice", "data fiduciary", "iso 27001", "personal data"]
  },
  {
    intent: INTENT_CATEGORIES.ESG_SUSTAINABILITY,
    agentId: "agent-esg-sust",
    keywords: ["brsr", "sebi brsr", "scope 1", "scope 2", "scope 3", "ghg emissions", "esg assurance", "carbon footprint", "sustainability report"]
  },
  {
    intent: INTENT_CATEGORIES.ENTERPRISE_GOVERNANCE,
    agentId: "agent-ent-gov",
    keywords: ["companies act", "aoc-4", "mgt-7", "board meeting", "secretarial audit", "mr-3", "annual return", "roc filing", "director appointment"]
  },
  {
    intent: INTENT_CATEGORIES.MANAGEMENT_REPORTS,
    agentId: "agent-mgmt-reporting",
    keywords: ["executive briefing", "board report", "compliance summary", "grc report", "management certificate"]
  },
  {
    intent: INTENT_CATEGORIES.CONSULTATION,
    agentId: "agent-grc-strategy",
    keywords: ["consultation", "advisory", "grc strategy", "maturity roadmap", "framework alignment"]
  }
];

// ─── 2. INTENT CLASSIFICATION ENGINE ──────────────────────────────────────────
export function classifyUserIntent(query) {
  const lowerQuery = (query || "").toLowerCase();
  
  for (const rule of INTENT_RULES) {
    for (const kw of rule.keywords) {
      const isMatch = kw.length <= 4
        ? new RegExp(`\\b${kw}\\b`, "i").test(lowerQuery)
        : lowerQuery.includes(kw);

      if (isMatch) {
        return {
          intent: rule.intent,
          recommendedAgentId: rule.agentId,
          matchedKeyword: kw,
          confidence: 0.88
        };
      }
    }
  }

  // Fallback default: Regulatory Compliance specialist
  return {
    intent: INTENT_CATEGORIES.GENERAL_COMPLIANCE,
    recommendedAgentId: "agent-reg-comp",
    matchedKeyword: null,
    confidence: 0.50
  };
}

// ─── 3. JURISDICTION EXTRACTOR ────────────────────────────────────────────────
export function extractJurisdiction(query) {
  const lower = (query || "").toLowerCase();
  const states = [
    "maharashtra", "karnataka", "tamil nadu", "delhi", "telangana",
    "gujarat", "haryana", "uttar pradesh", "west bengal", "rajasthan"
  ];
  for (const st of states) {
    if (lower.includes(st)) {
      return { country: "India", state: st.charAt(0).toUpperCase() + st.slice(1) };
    }
  }
  if (/\b(global|cross-border|international|european union|united states|usa)\b/i.test(lower)) {
    return { country: "Global", state: null };
  }
  return { country: "India", state: "Central" };
}

// ─── 4. CENTRAL ORCHESTRATION PIPELINE ────────────────────────────────────────
export async function orchestrateAgentRequest(requestParams, knowledgeCorpus = null) {
  const {
    query,
    selectedAgentId = null,
    userContext = {},
    documents = null,
    chunks = null
  } = requestParams;

  const startTime = Date.now();

  // 1. Intent Classification
  const classification = classifyUserIntent(query);
  
  // 2. Agent Selection: honor explicit user selection if provided, else route to recommended specialist
  const activeAgentId = selectedAgentId || classification.recommendedAgentId;
  const agentProfile = getAgentProfile(activeAgentId);

  // 3. Jurisdiction Identification
  const jurisdiction = extractJurisdiction(query);

  // 4. Retrieve Knowledge from Verified Corpus
  const defaultCorpus = getAugmentedRegulatoryCorpus();
  const docsToUse = documents || (knowledgeCorpus ? knowledgeCorpus.documents : defaultCorpus.documents);
  const chunksToUse = chunks || (knowledgeCorpus ? knowledgeCorpus.chunks : defaultCorpus.chunks);

  const retrievalResult = executeHybridRetrieval(docsToUse, chunksToUse, {
    query,
    agentId: agentProfile.agentId,
    jurisdiction: jurisdiction.state || jurisdiction.country,
    topK: agentProfile.retrievalConfiguration?.topK || 5,
    requireAiEligible: true
  });

  // 5. Evidence Validation & Safety Fallback
  const isEvidenceSufficient = retrievalResult.evidenceFound;
  let answerContent = "";
  let executionStatus = "SUCCESS";

  if (isEvidenceSufficient && retrievalResult.retrievedChunks.length > 0) {
    const topChunk = retrievalResult.retrievedChunks[0];
    const cleanChunk = topChunk.content.replace(/^\[Document:[^\]]+\]\s*/i, "").trim();
    
    answerContent = [
      `### ${agentProfile.agentName} Response`,
      `**Specialist:** ${agentProfile.roleTitle}`,
      `**Jurisdiction:** ${jurisdiction.country}${jurisdiction.state ? ` (${jurisdiction.state})` : ""}`,
      "",
      `#### Verified Statutory Position:`,
      cleanChunk,
      "",
      `*Statutory Reference: ${topChunk.clauseReference || "Applicable Act"}*`
    ].join("\n");
  } else {
    executionStatus = "REFUSAL_INSUFFICIENT_EVIDENCE";
    answerContent = [
      `### ${agentProfile.agentName} Response`,
      "",
      retrievalResult.fallbackMessage ||
        "I could not locate sufficient verified information in the approved GOVENICS Knowledge Library to provide a reliable answer. This question requires additional source verification."
    ].join("\n");
  }

  // 6. Multi-Agent Routing Explanation
  const routingExplanation = {
    selectedAgent: {
      agentId: agentProfile.agentId,
      agentName: agentProfile.agentName,
      roleTitle: agentProfile.roleTitle
    },
    intentDetected: classification.intent,
    isUserOverridden: Boolean(selectedAgentId && selectedAgentId !== classification.recommendedAgentId),
    jurisdictionDetected: jurisdiction,
    confidenceScore: retrievalResult.confidenceScore,
    evidenceSufficient: isEvidenceSufficient
  };

  return {
    orchestrationId: `ORCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    query,
    agent: routingExplanation.selectedAgent,
    routing: routingExplanation,
    answer: answerContent,
    citations: retrievalResult.citations,
    retrievedChunks: retrievalResult.retrievedChunks,
    executionStatus,
    processingTimeMs: Date.now() - startTime,
    timestamp: new Date().toISOString()
  };
}

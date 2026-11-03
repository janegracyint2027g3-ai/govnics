// test/regulatory_agent_system_eval.js
// Comprehensive Verification Suite for GOVENICS Central & State Regulatory Knowledge Library Agent System
// Covers Stages 1 to 10 across Central, 28 States, 8 UTs, and 12 Specialist Agents

import assert from "assert";
import {
  ALL_28_STATES,
  ALL_8_UNION_TERRITORIES,
  CENTRAL_SOURCES,
  STATE_SOURCES,
  UT_SOURCES,
  ALL_REGULATORY_SOURCES,
  getSourceCoverageStats,
  getSourceById
} from "../api/_lib/regulatory/sourceRegistry.js";
import {
  validateCanonicalRegulatoryRecord,
  createCanonicalRegulatoryRecord,
  REVIEW_QUEUES
} from "../api/_lib/regulatory/canonicalSchema.js";
import { CentralActsExtractionAgent } from "../api/_lib/regulatory/centralActsAgent.js";
import { StateActsExtractionAgent } from "../api/_lib/regulatory/stateActsAgent.js";
import { UtRegulatoryExtractionAgent } from "../api/_lib/regulatory/utRegulatoryAgent.js";
import {
  LabourComplianceAgent,
  EhsSafetyAgent,
  TaxationTradeAgent,
  CorporateGovernanceAgent,
  LicensingPermitsAgent
} from "../api/_lib/regulatory/domainSpecialistAgents.js";
import { IndustryApplicabilityAgent } from "../api/_lib/regulatory/industryApplicabilityAgent.js";
import { ChangeDetectionAgent } from "../api/_lib/regulatory/changeDetectionAgent.js";
import { SourceVerificationAgent } from "../api/_lib/regulatory/sourceVerificationAgent.js";
import { ObligationStructuringAgent } from "../api/_lib/regulatory/obligationStructuringAgent.js";
import { LegalReviewService } from "../api/_lib/regulatory/legalReviewService.js";
import { ExtractionJobManager } from "../api/_lib/regulatory/extractionJobManager.js";
import { RegulatoryCoverageService } from "../api/_lib/regulatory/regulatoryCoverageService.js";

console.log("=====================================================================");
console.log("GOVENICS REGULATORY KNOWLEDGE LIBRARY AGENT SYSTEM EVALUATION");
console.log("=====================================================================\n");

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    failedTests++;
  }
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    failedTests++;
  }
}

async function executeTestSuite() {
  // ─── STAGE 1: Canonical 46-Field Schema & Normalization ──────────────────────────
  console.log("--- STAGE 1: Canonical Regulatory Knowledge Schema ---");
  runTest("TC-S1-01: Canonical record instantiation creates all 46 metadata attributes", () => {
    const record = createCanonicalRegulatoryRecord({
      actName: "Companies Act, 2013",
      section: "Section 135",
      originalLegalText: "Corporate Social Responsibility mandatory allocation",
      complianceObligation: "Spend 2% average net profit on CSR"
    });
    assert.strictEqual(record.country, "India");
    assert.strictEqual(record.jurisdictionType, "Central");
    assert.strictEqual(record.verificationStatus, "Pending_Verification");
    assert.strictEqual(record.legalReviewStatus, "Draft");
    assert.strictEqual(record.versionNumber, 1);
    assert.ok(record.recordId.startsWith("REG-"));
  });

  runTest("TC-S1-02: Schema validation passes on compliant canonical records", () => {
    const record = createCanonicalRegulatoryRecord({
      actName: "Companies Act, 2013",
      section: "Section 135",
      originalLegalText: "Text",
      plainLanguageExplanation: "Summary",
      complianceObligation: "Obligation",
      applicabilityConditions: ["Turnover >= 1000 Cr"],
      industry: ["All"],
      responsibleDepartment: "Finance",
      responsibleRole: "Company Secretary",
      complianceFrequency: "Annual",
      dueDateLogic: "6 months from FY close",
      effectiveFrom: "2014-04-01",
      officialSourceUrl: "https://www.mca.gov.in/"
    });
    const result = validateCanonicalRegulatoryRecord(record);
    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.missingFields.length, 0);
  });

  runTest("TC-S1-03: Schema validation detects missing state on State jurisdiction record", () => {
    const record = createCanonicalRegulatoryRecord({
      jurisdictionType: "State",
      stateOrUt: null,
      actName: "State Act",
      section: "Sec 1"
    });
    const result = validateCanonicalRegulatoryRecord(record);
    assert.strictEqual(result.isValid, false);
    assert.ok(result.missingFields.includes("stateOrUt"));
  });

  // ─── STAGE 2: Official Source Registry (Central, 28 States, 8 UTs) ──────────────
  console.log("\n--- STAGE 2: Official Source Registry Audit ---");
  runTest("TC-S2-01: All 28 States are registered with official government portals", () => {
    assert.strictEqual(ALL_28_STATES.length, 28);
    assert.strictEqual(STATE_SOURCES.length, 28);
    ALL_28_STATES.forEach(st => {
      const src = STATE_SOURCES.find(s => s.stateOrUtName === st);
      assert.ok(src, `State source for ${st} must be catalogued`);
      assert.ok(src.officialUrl.startsWith("https://"));
      assert.strictEqual(src.verificationStatus, "Verified");
    });
  });

  runTest("TC-S2-02: All 8 Union Territories are registered with administrative portals", () => {
    assert.strictEqual(ALL_8_UNION_TERRITORIES.length, 8);
    assert.strictEqual(UT_SOURCES.length, 8);
    ALL_8_UNION_TERRITORIES.forEach(ut => {
      const src = UT_SOURCES.find(s => s.stateOrUtName === ut);
      assert.ok(src, `UT source for ${ut} must be catalogued`);
      assert.strictEqual(src.jurisdictionLevel, "Union Territory");
    });
  });

  runTest("TC-S2-03: Central source registry contains 12 core statutory bodies + 6 extended authorities", () => {
    assert.strictEqual(CENTRAL_SOURCES.length, 12);
    const authorities = CENTRAL_SOURCES.map(s => s.authorityName);
    assert.ok(authorities.some(a => a.includes("Ministry of Corporate Affairs")));
    assert.ok(authorities.some(a => a.includes("Ministry of Labour")));
    assert.ok(authorities.some(a => a.includes("CPCB")));
    assert.ok(authorities.some(a => a.includes("CBIC")));
    assert.ok(authorities.some(a => a.includes("SEBI")));
    assert.ok(authorities.some(a => a.includes("FSSAI")));
  });

  runTest("TC-S2-04: getSourceCoverageStats returns non-fabricated inventory denominators", () => {
    const stats = getSourceCoverageStats();
    assert.strictEqual(stats.totalRegisteredSources, 48);
    assert.strictEqual(stats.grandTotalWithExtended, 54);
    assert.strictEqual(stats.centralCount, 12);
    assert.strictEqual(stats.stateCount, 28);
    assert.strictEqual(stats.utCount, 8);
    assert.strictEqual(stats.verifiedCount, 48);
  });

  // ─── STAGE 3 & 4: Specialist Extraction Agents Execution ─────────────────────────
  console.log("\n--- STAGES 3 & 4: Coordinated Specialist Extraction Agents ---");
  await runAsyncTest("TC-S4-01: Agent 1 (Central Acts) extracts Sections 135, 149 and DPDP Act provisions", async () => {
    const agent = new CentralActsExtractionAgent();
    const records = await agent.extractCentralActProvisions();
    assert.ok(records.length >= 3);
    const csr = records.find(r => r.section === "Section 135");
    assert.ok(csr);
    assert.strictEqual(csr.actName, "Companies Act, 2013");
    assert.ok(csr.applicabilityConditions.some(c => c.includes("Turnover >= INR 1,000 Crore")));
    assert.strictEqual(csr.jurisdictionType, "Central");
  });

  await runAsyncTest("TC-S4-02: Agent 2 (State Acts) extracts state provisions across Maharashtra, Karnataka, Tamil Nadu, Gujarat", async () => {
    const agent = new StateActsExtractionAgent();
    const records = await agent.extractStateActProvisions();
    assert.ok(records.length >= 4);
    const mah = records.find(r => r.stateOrUt === "Maharashtra");
    const tn = records.find(r => r.stateOrUt === "Tamil Nadu");
    assert.ok(mah);
    assert.ok(tn);
    assert.strictEqual(mah.jurisdictionType, "State");
    assert.strictEqual(tn.complianceFrequency, "Annual");
  });

  await runAsyncTest("TC-S4-03: Agent 3 (UT Regulatory) extracts Delhi, Chandigarh, Puducherry mandates", async () => {
    const agent = new UtRegulatoryExtractionAgent();
    const records = await agent.extractUtProvisions();
    assert.ok(records.length >= 3);
    const delhi = records.find(r => r.stateOrUt === "Delhi");
    assert.ok(delhi);
    assert.strictEqual(delhi.jurisdictionType, "Union Territory");
    assert.ok(delhi.actName.includes("Delhi Shops"));
  });

  await runAsyncTest("TC-S4-04: Agent 4 (Labour) extracts EPF Section 6 & Gratuity Section 4", async () => {
    const agent = new LabourComplianceAgent();
    const records = await agent.extractLabourProvisions();
    assert.strictEqual(records.length, 2);
    const epf = records.find(r => r.actName.includes("Provident Funds"));
    assert.ok(epf);
    assert.strictEqual(epf.complianceFrequency, "Monthly");
    assert.strictEqual(epf.dueDateLogic, "On or before 15th of the following calendar month");
  });

  await runAsyncTest("TC-S4-05: Agent 5 (EHS) extracts Hazardous Waste Form 4 & TSDF requirements", async () => {
    const agent = new EhsSafetyAgent();
    const records = await agent.extractEhsProvisions();
    assert.strictEqual(records.length, 1);
    assert.ok(records[0].actName.includes("Hazardous and Other Wastes"));
    assert.strictEqual(records[0].complianceFrequency, "Annual");
  });

  await runAsyncTest("TC-S4-06: Agent 6 (Tax) extracts GSTR-1 and GSTR-3B monthly filing rules", async () => {
    const agent = new TaxationTradeAgent();
    const records = await agent.extractTaxProvisions();
    assert.strictEqual(records.length, 1);
    assert.ok(records[0].actName.includes("Central Goods and Services Tax Act"));
    assert.strictEqual(records[0].complianceFrequency, "Monthly");
  });

  await runAsyncTest("TC-S4-07: Agent 7 (Governance) extracts Board Meeting 120-day ceiling rule", async () => {
    const agent = new CorporateGovernanceAgent();
    const records = await agent.extractGovernanceProvisions();
    assert.strictEqual(records.length, 1);
    assert.strictEqual(records[0].section, "Section 173");
    assert.strictEqual(records[0].complianceFrequency, "Quarterly");
  });

  await runAsyncTest("TC-S4-08: Agent 8 (Licensing) extracts FSSAI Section 31 mandatory operating license", async () => {
    const agent = new LicensingPermitsAgent();
    const records = await agent.extractLicensingProvisions();
    assert.strictEqual(records.length, 1);
    assert.ok(records[0].actName.includes("Food Safety"));
    assert.strictEqual(records[0].responsibleDepartment, "Quality Assurance & Operations");
  });

  // ─── STAGE 5: Applicability, Change Detection & Source Verification ──────────────
  console.log("\n--- STAGE 5: Processing, Verification & Change Intelligence ---");
  runTest("TC-S5-01: Agent 9 (Applicability) correctly classifies enterprise obligations based on profile", () => {
    const agent = new IndustryApplicabilityAgent();
    const testRecords = [
      createCanonicalRegulatoryRecord({
        recordId: "R1",
        actName: "EPF Act",
        section: "Sec 6",
        industry: ["All"],
        applicabilityConditions: ["Establishments employing >= 20 persons"]
      }),
      createCanonicalRegulatoryRecord({
        recordId: "R2",
        actName: "Maharashtra Shops Act",
        section: "Sec 6",
        jurisdictionType: "State",
        stateOrUt: "Maharashtra",
        industry: ["Information Technology"]
      })
    ];

    // Enterprise A: Small company (5 employees) in Karnataka
    const evalA = agent.evaluateApplicability({ employeeCount: 5, state: "Karnataka", industry: "Information Technology" }, testRecords);
    assert.strictEqual(evalA.applicableCount, 0); // Fails EPF (needs >= 20) and fails State (Karnataka vs Maharashtra)

    // Enterprise B: Large IT company (50 employees) in Maharashtra
    const evalB = agent.evaluateApplicability({ employeeCount: 50, state: "Maharashtra", industry: "Information Technology" }, testRecords);
    assert.strictEqual(evalB.applicableCount, 2); // Matches both!
  });

  runTest("TC-S5-02: Agent 10 (Change Detection) flags gazette amendment deltas", () => {
    const agent = new ChangeDetectionAgent();
    const current = createCanonicalRegulatoryRecord({
      recordId: "REG-CEN-01",
      actName: "Parent Act",
      section: "Sec 1",
      originalLegalText: "Old statutory rule",
      penaltyOrConsequence: "Fine up to INR 10,000"
    });
    const incomingNotification = {
      gazetteOrNotificationNumber: "G.S.R. 505(E)",
      amendedText: "New modified statutory rule with enhanced compliance",
      penaltyOrConsequence: "Fine up to INR 50,000",
      publicationDate: "2026-11-01"
    };
    const report = agent.compareAndDetectChange(current, incomingNotification);
    assert.strictEqual(report.hasChange, true);
    assert.strictEqual(report.isSignificantChange, true);
    assert.strictEqual(report.changeCount, 2);
    assert.strictEqual(report.reviewQueue, "queue:amendments:candidates");
  });

  runTest("TC-S5-03: Agent 11 (Source Verification) validates official sovereign government domains", () => {
    const agent = new SourceVerificationAgent();
    const govRecord = createCanonicalRegulatoryRecord({
      officialSourceUrl: "https://www.mca.gov.in/acts",
      sourceDocumentTitle: "Official Gazette Notification"
    });
    const resultGov = agent.verifyRecordAuthenticity(govRecord);
    assert.strictEqual(resultGov.isAuthentic, true);
    assert.strictEqual(resultGov.checks.isGovDomain, true);
    assert.ok(resultGov.confidenceScore >= 0.90);

    const nonGovRecord = createCanonicalRegulatoryRecord({
      officialSourceUrl: "https://random-commercial-blog.com/acts"
    });
    const resultNonGov = agent.verifyRecordAuthenticity(nonGovRecord);
    assert.strictEqual(resultNonGov.checks.isGovDomain, false);
    assert.ok(resultNonGov.confidenceScore < 0.90);
  });

  runTest("TC-S5-04: Agent 12 (Obligation Structuring) synthesizes actionable corporate obligations", () => {
    const agent = new ObligationStructuringAgent();
    const raw = {
      actName: "Factories Act, 1948",
      section: "Section 16",
      originalLegalText: "No room in any factory shall be overcrowded to an extent injurious to the health of the workers."
    };
    const structured = agent.structureComplianceObligation(raw);
    assert.ok(structured.complianceObligation.includes("Section 16"));
    assert.ok(structured.requiredEvidence.length > 0);
    assert.strictEqual(structured.legalReviewStatus, "Under_Review");
  });

  // ─── STAGE 6: Human Legal Review Console & Queues ───────────────────────────────
  console.log("\n--- STAGE 6: Human Legal Review Console (10 Queues) ---");
  await runAsyncTest("TC-S6-01: Legal Review Console enforces 10 queue separation", async () => {
    const summary = await LegalReviewService.getQueueSummary();
    const queueKeys = Object.keys(summary);
    assert.strictEqual(queueKeys.length, 10);
    assert.ok(queueKeys.includes("NEW_SOURCES"));
    assert.ok(queueKeys.includes("NEW_EXTRACTIONS"));
    assert.ok(queueKeys.includes("LOW_CONFIDENCE"));
    assert.ok(queueKeys.includes("MISSING_SOURCE"));
    assert.ok(queueKeys.includes("CONFLICTING_PROVISIONS"));
    assert.ok(queueKeys.includes("AMENDMENT_CANDIDATES"));
    assert.ok(queueKeys.includes("REPEALED_RECORDS"));
    assert.ok(queueKeys.includes("PENDING_LEGAL_REVIEW"));
    assert.ok(queueKeys.includes("APPROVED_RECORDS"));
    assert.ok(queueKeys.includes("REJECTED_RECORDS"));
  });

  await runAsyncTest("TC-S6-02: Reviewer APPROVE action promotes record to Approved Knowledge Store with audit log", async () => {
    const candidate = createCanonicalRegulatoryRecord({
      recordId: "REG-REV-TEST-001",
      actName: "Review Test Act",
      section: "Sec 1",
      legalReviewStatus: "Under_Review"
    });
    await LegalReviewService.enqueueRecord(REVIEW_QUEUES.PENDING_LEGAL_REVIEW, candidate);

    const actionRes = await LegalReviewService.reviewRecordAction({
      recordId: "REG-REV-TEST-001",
      currentQueue: REVIEW_QUEUES.PENDING_LEGAL_REVIEW,
      action: "APPROVE",
      reviewerName: "Advocate Sharma, Senior Counsel",
      comments: "Verified statutory text against e-Gazette notification"
    });

    assert.strictEqual(actionRes.success, true);
    assert.strictEqual(actionRes.newStatus, "Approved");

    const auditTrail = LegalReviewService.getAuditTrailForRecord("REG-REV-TEST-001");
    assert.strictEqual(auditTrail.length, 1);
    assert.strictEqual(auditTrail[0].action, "APPROVE");
    assert.strictEqual(auditTrail[0].reviewerName, "Advocate Sharma, Senior Counsel");
  });

  // ─── STAGE 7: Job Manager & Automation ──────────────────────────────────────────
  console.log("\n--- STAGE 7: Extraction Job Manager & Telemetry ---");
  await runAsyncTest("TC-S7-01: ExtractionJobManager creates and completes multi-agent extraction run", async () => {
    const job = ExtractionJobManager.createJob({
      agentId: "AGT-REG-01-CENTRAL-ACTS",
      jurisdiction: "Central",
      requestedBy: "TEST_HARNESS"
    });
    assert.strictEqual(job.status, "PENDING");

    const completed = await ExtractionJobManager.runJob(job.jobId);
    assert.strictEqual(completed.status, "COMPLETED");
    assert.ok(completed.recordsExtracted >= 3);
    assert.ok(completed.logs.length >= 3);
    assert.ok(completed.completionTime !== null);
  });

  // ─── STAGE 8: Coverage Service (Central, 28 States, 8 UTs) ──────────────────────
  console.log("\n--- STAGE 8: Explicit Denominator Coverage Service ---");
  await runAsyncTest("TC-S8-01: RegulatoryCoverageService calculates explicit 28-State & 8-UT matrix", async () => {
    const report = await RegulatoryCoverageService.getComprehensiveCoverageReport();
    assert.strictEqual(report.inventoryDenominators.centralSourcesRegistered, 12);
    assert.strictEqual(report.inventoryDenominators.statesRegistered, 28);
    assert.strictEqual(report.inventoryDenominators.utsRegistered, 8);
    assert.strictEqual(report.stateBreakdown.length, 28);
    assert.strictEqual(report.utBreakdown.length, 8);
    assert.strictEqual(report.isAuthenticAudit, true);
  });

  // ─── FINAL SUMMARY ─────────────────────────────────────────────────────────────
  console.log("\n=====================================================================");
  console.log(`EVALUATION SUMMARY: ${passedTests} / ${passedTests + failedTests} PASSED (${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%)`);
  if (failedTests > 0) {
    console.error(`Failed: ${failedTests}`);
    process.exit(1);
  } else {
    console.log("Failed: 0");
    console.log("=====================================================================");
  }
}

executeTestSuite();

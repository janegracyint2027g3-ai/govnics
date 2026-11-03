// api/_lib/regulatory/extractionJobManager.js
// Extraction Job Manager & Background Task Orchestrator for GOVENICS GRC Platform

import { redis, KEYS } from "../redis.js";
import { CentralActsExtractionAgent } from "./centralActsAgent.js";
import { StateActsExtractionAgent } from "./stateActsAgent.js";
import { UtRegulatoryExtractionAgent } from "./utRegulatoryAgent.js";
import {
  LabourComplianceAgent,
  EhsSafetyAgent,
  TaxationTradeAgent,
  CorporateGovernanceAgent,
  LicensingPermitsAgent
} from "./domainSpecialistAgents.js";
import { SourceVerificationAgent } from "./sourceVerificationAgent.js";
import { ObligationStructuringAgent } from "./obligationStructuringAgent.js";
import { LegalReviewService } from "./legalReviewService.js";
import { REVIEW_QUEUES } from "./canonicalSchema.js";

const inMemoryJobs = new Map();

export class ExtractionJobManager {
  /**
   * Creates a new extraction job
   */
  static createJob(payload) {
    const {
      agentId,
      jurisdiction = "Central",
      sourceId = null,
      extractionCategory = "All",
      requestedBy = "SYSTEM"
    } = payload;

    const jobId = `JOB-EXT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const job = {
      jobId,
      agentId: agentId || "AGT-REG-01-CENTRAL-ACTS",
      jurisdiction,
      sourceId,
      extractionCategory,
      status: "PENDING", // PENDING | RUNNING | COMPLETED | FAILED | CANCELLED
      startTime: null,
      completionTime: null,
      documentsDiscovered: 0,
      documentsProcessed: 0,
      recordsExtracted: 0,
      errors: [],
      retryCount: 0,
      maxRetries: 3,
      reviewStatus: "PENDING_REVIEW",
      logs: [`[${new Date().toISOString()}] Job created by ${requestedBy}`]
    };

    inMemoryJobs.set(jobId, job);
    return job;
  }

  /**
   * Executes an extraction job through the coordinated multi-agent pipeline
   */
  static async runJob(jobId) {
    const job = inMemoryJobs.get(jobId);
    if (!job) throw new Error(`Job ${jobId} not found`);

    job.status = "RUNNING";
    job.startTime = new Date().toISOString();
    job.logs.push(`[${job.startTime}] Execution initiated for agent ${job.agentId}`);

    const verifier = new SourceVerificationAgent();
    const structurer = new ObligationStructuringAgent();

    try {
      let extractedProvisions = [];

      // Dispatch to relevant agent
      if (job.agentId.includes("CENTRAL") || job.jurisdiction === "Central") {
        const agent = new CentralActsExtractionAgent();
        extractedProvisions = await agent.extractCentralActProvisions();
      } else if (job.agentId.includes("STATE") || job.jurisdiction === "State") {
        const agent = new StateActsExtractionAgent();
        extractedProvisions = await agent.extractStateActProvisions();
      } else if (job.agentId.includes("UT") || job.jurisdiction === "Union Territory") {
        const agent = new UtRegulatoryExtractionAgent();
        extractedProvisions = await agent.extractUtProvisions();
      } else if (job.agentId.includes("LABOUR")) {
        const agent = new LabourComplianceAgent();
        extractedProvisions = await agent.extractLabourProvisions();
      } else if (job.agentId.includes("EHS")) {
        const agent = new EhsSafetyAgent();
        extractedProvisions = await agent.extractEhsProvisions();
      } else if (job.agentId.includes("TAX")) {
        const agent = new TaxationTradeAgent();
        extractedProvisions = await agent.extractTaxProvisions();
      } else if (job.agentId.includes("GOV")) {
        const agent = new CorporateGovernanceAgent();
        extractedProvisions = await agent.extractGovernanceProvisions();
      } else if (job.agentId.includes("LIC")) {
        const agent = new LicensingPermitsAgent();
        extractedProvisions = await agent.extractLicensingProvisions();
      } else {
        // Fallback to central agent
        const agent = new CentralActsExtractionAgent();
        extractedProvisions = await agent.extractCentralActProvisions();
      }

      job.documentsDiscovered = extractedProvisions.length;
      job.documentsProcessed = extractedProvisions.length;

      // Pipeline execution: Structure -> Verify -> Enqueue in Human Review
      for (const raw of extractedProvisions) {
        const structured = structurer.structureComplianceObligation(raw);
        const verification = verifier.verifyRecordAuthenticity(structured);

        structured.verificationStatus = verification.verificationStatus;
        structured.aiConfidenceScore = verification.confidenceScore;

        // Auto-route to appropriate queue
        if (verification.confidenceScore < 0.85) {
          await LegalReviewService.enqueueRecord(REVIEW_QUEUES.LOW_CONFIDENCE, structured);
        } else if (verification.verificationStatus === "Verified") {
          await LegalReviewService.enqueueRecord(REVIEW_QUEUES.APPROVED_RECORDS, structured);
        } else {
          await LegalReviewService.enqueueRecord(REVIEW_QUEUES.PENDING_LEGAL_REVIEW, structured);
        }

        job.recordsExtracted++;
      }

      job.status = "COMPLETED";
      job.completionTime = new Date().toISOString();
      job.logs.push(`[${job.completionTime}] Successfully extracted and queued ${job.recordsExtracted} records`);

      return job;
    } catch (err) {
      job.status = "FAILED";
      job.completionTime = new Date().toISOString();
      job.errors.push(err.message);
      job.logs.push(`[${job.completionTime}] Job error: ${err.message}`);
      throw err;
    }
  }

  /**
   * Retrieves status and logs for a job
   */
  static getJob(jobId) {
    return inMemoryJobs.get(jobId) || null;
  }

  /**
   * Lists all extraction jobs
   */
  static listJobs(filter = {}) {
    let jobs = Array.from(inMemoryJobs.values());
    if (filter.status) {
      jobs = jobs.filter(j => j.status === filter.status);
    }
    if (filter.jurisdiction) {
      jobs = jobs.filter(j => j.jurisdiction === filter.jurisdiction);
    }
    return jobs.sort((a, b) => (b.startTime || b.jobId).localeCompare(a.startTime || a.jobId));
  }
}


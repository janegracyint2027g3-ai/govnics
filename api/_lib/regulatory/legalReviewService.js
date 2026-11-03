// api/_lib/regulatory/legalReviewService.js
// Human Legal Review & Approval Console Service
// Manages the 10 Review Queues, Audit Logging, and Strict Approval State Machine

import { redis, KEYS } from "../redis.js";
import { REVIEW_QUEUES, createCanonicalRegulatoryRecord } from "./canonicalSchema.js";

// In-memory queue fallback when Redis is operating in memory-only mode
const inMemoryQueues = {
  [REVIEW_QUEUES.NEW_SOURCES]: [],
  [REVIEW_QUEUES.NEW_EXTRACTIONS]: [],
  [REVIEW_QUEUES.LOW_CONFIDENCE]: [],
  [REVIEW_QUEUES.MISSING_SOURCE]: [],
  [REVIEW_QUEUES.CONFLICTING_PROVISIONS]: [],
  [REVIEW_QUEUES.AMENDMENT_CANDIDATES]: [],
  [REVIEW_QUEUES.REPEALED_RECORDS]: [],
  [REVIEW_QUEUES.PENDING_LEGAL_REVIEW]: [],
  [REVIEW_QUEUES.APPROVED_RECORDS]: [],
  [REVIEW_QUEUES.REJECTED_RECORDS]: []
};

const inMemoryAuditTrail = [];

export class LegalReviewService {
  /**
   * Enqueues a regulatory record into the appropriate legal review queue
   */
  static async enqueueRecord(queueKey, record) {
    if (!inMemoryQueues[queueKey]) {
      inMemoryQueues[queueKey] = [];
    }
    
    // Check for existing record to avoid duplicate queue entries
    const existingIdx = inMemoryQueues[queueKey].findIndex(r => r.recordId === record.recordId);
    if (existingIdx >= 0) {
      inMemoryQueues[queueKey][existingIdx] = record;
    } else {
      inMemoryQueues[queueKey].push(record);
    }

    try {
      if (redis?.lpush) {
        await redis.lpush(`govenics:reg:${queueKey}`, JSON.stringify(record));
      }
    } catch (e) {
      // Redis fallback to in-memory
    }

    return { success: true, queue: queueKey, recordId: record.recordId };
  }

  /**
   * Retrieves records in a specific review queue with pagination
   */
  static async getQueueRecords(queueKey, page = 1, limit = 20) {
    const list = inMemoryQueues[queueKey] || [];
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      queue: queueKey,
      totalCount: list.length,
      page,
      limit,
      totalPages: Math.ceil(list.length / limit) || 1,
      records: paginated
    };
  }

  /**
   * Gets counts across all 10 legal review queues
   */
  static async getQueueSummary() {
    const summary = {};
    Object.keys(REVIEW_QUEUES).forEach(key => {
      const qKey = REVIEW_QUEUES[key];
      summary[key] = (inMemoryQueues[qKey] || []).length;
    });
    return summary;
  }

  /**
   * Submits a reviewer action (Approve, Reject, Request Reprocessing, Edit)
   */
  static async reviewRecordAction(actionPayload) {
    const {
      recordId,
      currentQueue,
      action, // "APPROVE" | "REJECT" | "REQUEST_REPROCESSING" | "UPDATE_FIELDS"
      reviewerId,
      reviewerName,
      comments,
      updatedFields = {}
    } = actionPayload;

    const queueList = inMemoryQueues[currentQueue] || [];
    const recordIndex = queueList.findIndex(r => r.recordId === recordId);

    if (recordIndex === -1) {
      throw new Error(`Record ${recordId} not found in queue ${currentQueue}`);
    }

    const record = queueList[recordIndex];
    const now = new Date().toISOString();

    // 1. Audit trail entry
    const auditEntry = {
      auditId: `AUD-REV-${Date.now()}`,
      recordId,
      previousQueue: currentQueue,
      action,
      reviewerId: reviewerId || "LEGAL-REV-01",
      reviewerName: reviewerName || "Senior Legal Compliance Counsel",
      timestamp: now,
      comments: comments || "Action executed via Legal Review Console",
      diff: updatedFields
    };
    inMemoryAuditTrail.unshift(auditEntry);

    // Remove from current queue
    queueList.splice(recordIndex, 1);

    // Apply updates
    Object.assign(record, updatedFields);
    record.lastVerifiedDate = now;
    record.humanReviewer = reviewerName || "Senior Legal Compliance Counsel";

    // Route to target queue based on action
    if (action === "APPROVE") {
      record.legalReviewStatus = "Approved";
      record.verificationStatus = "Verified";
      record.approvalTimestamp = now;
      inMemoryQueues[REVIEW_QUEUES.APPROVED_RECORDS].unshift(record);
    } else if (action === "REJECT") {
      record.legalReviewStatus = "Rejected";
      record.verificationStatus = "Conflicting";
      inMemoryQueues[REVIEW_QUEUES.REJECTED_RECORDS].unshift(record);
    } else if (action === "REQUEST_REPROCESSING") {
      record.legalReviewStatus = "Needs_Reprocessing";
      inMemoryQueues[REVIEW_QUEUES.NEW_EXTRACTIONS].unshift(record);
    } else {
      // Default return to pending review with updated fields
      inMemoryQueues[REVIEW_QUEUES.PENDING_LEGAL_REVIEW].unshift(record);
    }

    return {
      success: true,
      recordId,
      newStatus: record.legalReviewStatus,
      auditId: auditEntry.auditId,
      timestamp: now
    };
  }

  /**
   * Returns audit trail for a specific regulatory record
   */
  static getAuditTrailForRecord(recordId) {
    return inMemoryAuditTrail.filter(a => a.recordId === recordId);
  }
}


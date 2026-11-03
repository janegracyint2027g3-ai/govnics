// api/_lib/regulatory/changeDetectionAgent.js
// Specialist Agent 10: Amendment & Regulatory Change Detection Agent
// Monitors registered statutory sources, diffs versions, and flags impact deltas

export class ChangeDetectionAgent {
  constructor() {
    this.agentId = "AGT-REG-10-CHANGE-DETECT";
    this.agentName = "Amendment & Regulatory Change Detection Agent";
  }

  /**
   * Compares an existing regulatory record against an incoming gazette amendment
   * @param {Object} currentRecord - The live active regulatory record
   * @param {Object} incomingNotification - The newly published amendment notification
   */
  compareAndDetectChange(currentRecord, incomingNotification) {
    const changesDetected = [];
    let isSignificantChange = false;

    // 1. Text difference analysis
    if (incomingNotification.amendedText && incomingNotification.amendedText !== currentRecord.originalLegalText) {
      changesDetected.push({
        field: "originalLegalText",
        changeType: "Statutory Text Substitution / Modification",
        oldValue: currentRecord.originalLegalText,
        newValue: incomingNotification.amendedText
      });
      isSignificantChange = true;
    }

    // 2. Penalty changes
    if (incomingNotification.penaltyOrConsequence && incomingNotification.penaltyOrConsequence !== currentRecord.penaltyOrConsequence) {
      changesDetected.push({
        field: "penaltyOrConsequence",
        changeType: "Statutory Penalty Revision",
        oldValue: currentRecord.penaltyOrConsequence,
        newValue: incomingNotification.penaltyOrConsequence
      });
      isSignificantChange = true;
    }

    // 3. Due Date / Deadline change
    if (incomingNotification.dueDateLogic && incomingNotification.dueDateLogic !== currentRecord.dueDateLogic) {
      changesDetected.push({
        field: "dueDateLogic",
        changeType: "Filing Deadline Revision",
        oldValue: currentRecord.dueDateLogic,
        newValue: incomingNotification.dueDateLogic
      });
      isSignificantChange = true;
    }

    // 4. Threshold adjustments
    if (incomingNotification.applicabilityConditions) {
      const oldConditions = (currentRecord.applicabilityConditions || []).join(" | ");
      const newConditions = incomingNotification.applicabilityConditions.join(" | ");
      if (oldConditions !== newConditions) {
        changesDetected.push({
          field: "applicabilityConditions",
          changeType: "Applicability Threshold Modification",
          oldValue: oldConditions,
          newValue: newConditions
        });
        isSignificantChange = true;
      }
    }

    const impactReport = {
      recordId: currentRecord.recordId,
      actName: currentRecord.actName,
      section: currentRecord.section,
      gazetteOrNotificationNumber: incomingNotification.gazetteOrNotificationNumber || "Pending Notification Number",
      notificationDate: incomingNotification.publicationDate || new Date().toISOString().split("T")[0],
      effectiveFrom: incomingNotification.effectiveFrom || incomingNotification.publicationDate,
      hasChange: changesDetected.length > 0,
      isSignificantChange,
      changeCount: changesDetected.length,
      changes: changesDetected,
      recommendedAction: isSignificantChange
        ? "Route immediately to Human Legal Review Queue (AMENDMENT_CANDIDATES)"
        : "No actionable change detected",
      reviewQueue: isSignificantChange ? "queue:amendments:candidates" : null,
      suggestedVersionNumber: (currentRecord.versionNumber || 1) + 1
    };

    return impactReport;
  }
}


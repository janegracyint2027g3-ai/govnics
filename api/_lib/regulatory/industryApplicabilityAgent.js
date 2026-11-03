// api/_lib/regulatory/industryApplicabilityAgent.js
// Specialist Agent 9: Industry Applicability Agent
// Maps statutory provisions to organization industry, employee count, turnover, and operational characteristics

export class IndustryApplicabilityAgent {
  constructor() {
    this.agentId = "AGT-REG-09-APPLICABILITY";
    this.agentName = "Industry Applicability Agent";
  }

  /**
   * Assesses statutory applicability for an enterprise profile
   * @param {Object} profile - Company parameters { industry, employeeCount, turnoverCr, state, hasFactory, hasHazardous }
   * @param {Array} records - Array of candidate regulatory records
   */
  evaluateApplicability(profile, records) {
    const applicable = [];
    const nonApplicable = [];

    records.forEach(record => {
      let isMatch = true;
      const reasons = [];

      // 1. Industry matching
      if (record.industry && !record.industry.includes("All")) {
        if (!record.industry.some(ind => ind.toLowerCase() === profile.industry?.toLowerCase())) {
          isMatch = false;
          reasons.push(`Industry mismatch: applicable to ${record.industry.join(", ")}, profile is ${profile.industry}`);
        }
      }

      // 2. State matching
      if (record.jurisdictionType === "State" && record.stateOrUt) {
        if (record.stateOrUt.toLowerCase() !== profile.state?.toLowerCase()) {
          isMatch = false;
          reasons.push(`Jurisdiction mismatch: law is specific to ${record.stateOrUt}, profile state is ${profile.state}`);
        }
      }

      // 3. Employee Threshold Evaluation
      if (record.applicabilityConditions) {
        record.applicabilityConditions.forEach(cond => {
          const lower = cond.toLowerCase();
          if (lower.includes(">= 20") || lower.includes("20 or more")) {
            if ((profile.employeeCount || 0) < 20) {
              isMatch = false;
              reasons.push("Employee count threshold (< 20) not met");
            }
          } else if (lower.includes(">= 10") || lower.includes("10 or more")) {
            if ((profile.employeeCount || 0) < 10) {
              isMatch = false;
              reasons.push("Employee count threshold (< 10) not met");
            }
          } else if (lower.includes(">= 50") || lower.includes("50 or more")) {
            if ((profile.employeeCount || 0) < 50) {
              isMatch = false;
              reasons.push("Employee count threshold (< 50) not met");
            }
          } else if (lower.includes(">= 100") || lower.includes("100 or more")) {
            if ((profile.employeeCount || 0) < 100) {
              isMatch = false;
              reasons.push("Employee count threshold (< 100) not met");
            }
          }
        });
      }

      // 4. Turnover & Profit Evaluation
      if (record.applicabilityConditions) {
        record.applicabilityConditions.forEach(cond => {
          const lower = cond.toLowerCase();
          if (lower.includes("turnover >= inr 1,000 crore") || lower.includes("1000 crore")) {
            if ((profile.turnoverCr || 0) < 1000 && (profile.netProfitCr || 0) < 5) {
              isMatch = false;
              reasons.push("CSR financial threshold (Turnover >= 1000 Cr or Net Profit >= 5 Cr) not met");
            }
          }
        });
      }

      if (isMatch) {
        applicable.push({
          record,
          applicabilityStatus: "Applicable",
          rationale: `Matched enterprise profile: ${profile.industry || "General"} in ${profile.state || "National"} with ${profile.employeeCount || 0} employees`
        });
      } else {
        nonApplicable.push({
          recordId: record.recordId,
          actName: record.actName,
          section: record.section,
          applicabilityStatus: "Exempt / Non-Applicable",
          exclusionReasons: reasons
        });
      }
    });

    return {
      totalEvaluated: records.length,
      applicableCount: applicable.length,
      exemptCount: nonApplicable.length,
      applicable,
      exempt: nonApplicable
    };
  }
}


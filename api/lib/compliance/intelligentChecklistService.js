// api/lib/compliance/intelligentChecklistService.js
// Phase 4 — GOVENICS Intelligent Compliance Checklist Generator
// Evaluates jurisdiction, headcount, operations, and exports to build 15-field statutory checklists

import { REGULATORY_RULES } from "../regulatoryRules.js";

export const CHECKLIST_STATUSES = [
  "Compliant",
  "Partially Compliant",
  "Non-Compliant",
  "Not Applicable",
  "Under Review",
  "Evidence Required"
];

export function generateIntelligentChecklist(profile) {
  const {
    country = "IN",
    state = "Central",
    industrySector = "Cross-Industry",
    subIndustry = "",
    employeeCount = 50,
    annualTurnover = "10-50 Cr",
    businessOperations = [],
    hasImportExport = false,
    hasHazardousProcesses = false,
    assessmentPeriod = "FY 2026-27"
  } = profile;

  const generatedItems = [];
  let itemCounter = 1;

  // 1. Evaluate Core Rules from Verified Database
  for (const rule of REGULATORY_RULES) {
    // Country check
    if (rule.country && rule.country !== country && country !== "ALL") continue;
    
    // State check
    if (rule.state && state !== "Central" && rule.state !== state) continue;

    // Industry applicability check
    if (rule.industries && rule.industries.length > 0) {
      const matchesIndustry = rule.industries.some(ind =>
        ind.toLowerCase().includes(industrySector.toLowerCase()) ||
        industrySector.toLowerCase().includes(ind.toLowerCase()) ||
        ind === "Cross-Industry"
      );
      if (!matchesIndustry && industrySector !== "Cross-Industry") continue;
    }

    // Determine responsible department & role based on rule category
    let dept = "Legal & Compliance";
    let role = "Compliance Officer";
    if (rule.category?.includes("Labour") || rule.category?.includes("Employment")) {
      dept = "Human Resources & Industrial Relations";
      role = "Head of HR";
    } else if (rule.category?.includes("Tax") || rule.category?.includes("Financial")) {
      dept = "Finance & Accounts";
      role = "Chief Financial Officer / Tax Head";
    } else if (rule.category?.includes("Environmental") || rule.category?.includes("Safety")) {
      dept = "Health, Safety & Environment (HSE)";
      role = "EHS Manager / Factory Safety Officer";
    } else if (rule.category?.includes("Cybersecurity") || rule.category?.includes("Data")) {
      dept = "Information Technology & Security";
      role = "Chief Information Security Officer (CISO)";
    }

    const itemId = `CHK-2026-${String(itemCounter++).padStart(4, "0")}`;
    const riskLevel = rule.priority === "critical" ? "Critical" : rule.priority === "high" ? "High" : "Medium";

    generatedItems.push({
      checklistId: itemId,
      ruleReferenceId: rule.ruleId,
      complianceRequirement: rule.description || rule.regulationName,
      applicableLaw: rule.regulationName,
      regulatoryAuthority: rule.authority,
      jurisdiction: `${rule.country || country}${rule.state ? ` (${rule.state})` : ` (${state})`}`,
      applicabilityCondition: rule.whyItApplies || "Mandatory national or state statutory mandate.",
      responsibleDepartment: dept,
      responsibleRole: role,
      requiredEvidence: rule.documentation || "Statutory register, filed challans, or board resolution.",
      reviewFrequency: rule.frequency || "Annual",
      dueDate: rule.deadline || "Within statutory prescribed timeline",
      riskLevel,
      complianceStatus: "Under Review",
      sourceDocument: rule.regulationName,
      sourceClause: rule.deadline ? `Filing requirement: ${rule.deadline}` : "Statutory Schedule",
      lastVerifiedDate: rule.lastVerified || "2026-10-15"
    });
  }

  // 2. Add Conditional High-Impact Statutory Mandates
  if (employeeCount >= 20) {
    generatedItems.push({
      checklistId: `CHK-2026-${String(itemCounter++).padStart(4, "0")}`,
      ruleReferenceId: "STAT-EPF-001",
      complianceRequirement: "Mandatory monthly provident fund deposit (12% employee + 12% employer contribution) under EPFO.",
      applicableLaw: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952 / Social Security Code",
      regulatoryAuthority: "Employees' Provident Fund Organisation (EPFO)",
      jurisdiction: "India (Central)",
      applicabilityCondition: "Establishment employs 20 or more persons ordinarily.",
      responsibleDepartment: "Human Resources",
      responsibleRole: "Payroll & Benefits Manager",
      requiredEvidence: "Monthly ECR challan and confirmation slip.",
      reviewFrequency: "Monthly",
      dueDate: "15th of each month",
      riskLevel: "High",
      complianceStatus: "Under Review",
      sourceDocument: "The Code on Social Security, 2020",
      sourceClause: "Section 16 & Schedule IV",
      lastVerifiedDate: "2026-10-18"
    });
  }

  if (hasHazardousProcesses || employeeCount >= 1000) {
    generatedItems.push({
      checklistId: `CHK-2026-${String(itemCounter++).padStart(4, "0")}`,
      ruleReferenceId: "STAT-EHS-040B",
      complianceRequirement: "Mandatory appointment of certified Safety Officers and establishment of Safety Committee.",
      applicableLaw: "The Factories Act, 1948",
      regulatoryAuthority: "State Inspectorate of Factories & DGFASLI",
      jurisdiction: `India (${state})`,
      applicabilityCondition: "Premises employs 1,000+ workers or engages in hazardous chemical/manufacturing processes.",
      responsibleDepartment: "Health, Safety & Environment (HSE)",
      responsibleRole: "Chief Safety Officer",
      requiredEvidence: "Safety Officer appointment notification, quarterly Safety Committee minutes, mock-drill logs.",
      reviewFrequency: "Quarterly",
      dueDate: "Continuous / Annual renewal",
      riskLevel: "Critical",
      complianceStatus: "Under Review",
      sourceDocument: "The Factories Act, 1948",
      sourceClause: "Section 40-B & Section 41-A",
      lastVerifiedDate: "2026-09-20"
    });
  }

  if (hasImportExport) {
    generatedItems.push({
      checklistId: `CHK-2026-${String(itemCounter++).padStart(4, "0")}`,
      ruleReferenceId: "STAT-FTP-IEC01",
      complianceRequirement: "Annual electronic validation and renewal of Importer Exporter Code (IEC) on DGFT Portal.",
      applicableLaw: "Foreign Trade (Development and Regulation) Act, 1992",
      regulatoryAuthority: "Directorate General of Foreign Trade (DGFT)",
      jurisdiction: "India (Central)",
      applicabilityCondition: "Entities engaging in commercial import or export of goods and services.",
      responsibleDepartment: "Supply Chain & Logistics",
      responsibleRole: "Export-Import Manager",
      requiredEvidence: "Updated IEC certificate downloaded from DGFT with current bank account linkage.",
      reviewFrequency: "Annual",
      dueDate: "Between April and June each financial year",
      riskLevel: "Medium",
      complianceStatus: "Under Review",
      sourceDocument: "Foreign Trade Policy (FTP)",
      sourceClause: "Chapter 1 Para 1.05",
      lastVerifiedDate: "2026-10-01"
    });
  }

  // 3. Synthesize Categories & Risk Breakdown
  const categories = Array.from(new Set(generatedItems.map(i => i.responsibleDepartment)));
  const criticalCount = generatedItems.filter(i => i.riskLevel === "Critical").length;
  const highCount = generatedItems.filter(i => i.riskLevel === "High").length;

  return {
    summary: {
      assessmentPeriod,
      country,
      state,
      industrySector,
      employeeCount,
      totalRequirements: generatedItems.length,
      criticalRisks: criticalCount,
      highRisks: highCount,
      departmentsCovered: categories.length
    },
    applicableCategories: categories,
    items: generatedItems,
    assessmentLimitations:
      "This checklist is scoped using rules-based statutory baselines and GOVENICS verified knowledge collections. It serves operational readiness and audit preparation purposes and does not substitute formal legal counsel or official regulatory certificates."
  };
}


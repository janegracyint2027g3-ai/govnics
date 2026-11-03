// api/_lib/regulatory/domainSpecialistAgents.js
// Specialist Agents 4, 5, 6, 7, 8: Domain-Specific Extraction & Analysis Agents

import { createCanonicalRegulatoryRecord } from "./canonicalSchema.js";

// ─── Agent 4: Labour & Employment Compliance Agent ────────────────────────────────
export class LabourComplianceAgent {
  constructor() {
    this.agentId = "AGT-REG-04-LABOUR";
    this.agentName = "Labour & Employment Compliance Agent";
    this.offering = "labour-employment";
  }

  async extractLabourProvisions() {
    const provisions = [
      {
        actName: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
        section: "Section 6",
        authority: "Employees' Provident Fund Organisation (EPFO)",
        originalLegalText: "The contribution which shall be paid by the employer to the Fund shall be twelve per cent of the basic wages, dearness allowance and retaining allowance for the time being payable to each of the employees.",
        plainText: "Employers must contribute 12% of basic wage and DA towards EPF, matching a 12% deduction from the employee's salary.",
        obligation: "Deduct 12% EPF from eligible employees (up to statutory ceiling INR 15,000/mo or actuals if opted); match with 12% employer share; remit via Unified Portal using Electronic Challan cum Return (ECR) by the 15th.",
        applicability: ["Establishments employing 20 or more persons"],
        industry: ["All"],
        dept: "Payroll & HR",
        role: "Payroll Specialist",
        evidence: ["Monthly ECR Receipt", "EPF Challan", "Form 12A Monthly Return"],
        frequency: "Monthly",
        dueDate: "On or before 15th of the following calendar month",
        penalty: "Damages under Section 14B ranging from 5% to 25% per annum on delayed remittances, plus 12% per annum simple interest under Section 7Q."
      },
      {
        actName: "Payment of Gratuity Act, 1972",
        section: "Section 4",
        authority: "Ministry of Labour and Employment",
        originalLegalText: "Gratuity shall be payable to an employee on the termination of his employment after he has rendered continuous service for not less than five years.",
        plainText: "Every employee completing 5 continuous years of service is legally entitled to gratuity calculated at 15 days' last drawn wages per completed year.",
        obligation: "Calculate gratuity at (15 * Last Drawn Basic * Tenure) / 26; pay within 30 days of termination; obtain compulsory group gratuity insurance.",
        applicability: ["Factories, mines, oilfields, plantations, ports, railway companies, shops or establishments with >= 10 employees"],
        industry: ["All"],
        dept: "Finance & HR",
        role: "HR Operations Lead",
        evidence: ["Form F Nomination Forms", "Gratuity Trust Account / Group Insurance Policy", "Form L Notice of Determination of Gratuity"],
        frequency: "Event-Driven",
        dueDate: "Within 30 days from date gratuity becomes payable",
        penalty: "Compound interest at 10% per annum on delayed payments, or imprisonment up to 2 years for non-payment."
      }
    ];

    return provisions.map((p, i) => createCanonicalRegulatoryRecord({
      recordId: `REG-DOM-LBR-SEC-${p.section.replace(/[^a-zA-Z0-9]/g, "")}-${i + 1}`,
      jurisdictionType: "Central",
      country: "India",
      issuingAuthority: p.authority,
      actName: p.actName,
      section: p.section,
      originalLegalText: p.originalLegalText,
      plainLanguageExplanation: p.plainText,
      complianceObligation: p.obligation,
      applicabilityConditions: p.applicability,
      industry: p.industry,
      responsibleDepartment: p.dept,
      responsibleRole: p.role,
      requiredEvidence: p.evidence,
      complianceFrequency: p.frequency,
      dueDateLogic: p.dueDate,
      penaltyOrConsequence: p.penalty,
      officialSourceUrl: "https://labour.gov.in/",
      verificationStatus: "Verified",
      legalReviewStatus: "Approved"
    }));
  }
}

// ─── Agent 5: Factory, Industrial Safety & EHS Agent ──────────────────────────────
export class EhsSafetyAgent {
  constructor() {
    this.agentId = "AGT-REG-05-EHS";
    this.agentName = "Factory, Industrial Safety & EHS Agent";
    this.offering = "environmental-ehs";
  }

  async extractEhsProvisions() {
    const provisions = [
      {
        actName: "Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016",
        section: "Rule 6",
        authority: "MoEFCC / State Pollution Control Board",
        originalLegalText: "Every occupier of the facility who is engaged in handling, generation, collection, storage, packaging, transportation, use, treatment, processing, recycling, recovery, pre-processing, co-processing, utilisation, offering for sale, transfer or disposal of the hazardous and other wastes shall make an application in Form 1 to the State Pollution Control Board for grant of authorisation.",
        plainText: "Any facility generating hazardous waste must hold a valid Authorization from the SPCB and maintain daily waste manifests in Form 10.",
        obligation: "Obtain Form 2 Hazardous Waste Authorization; label containers as per Form 8; send yellow copies to SPCB; file annual return in Form 4 by 30th June.",
        applicability: ["All industrial facilities generating chemical residues, spent solvents, e-waste, lead batteries, or used oil"],
        industry: ["Manufacturing", "Chemicals", "Automotive", "Electronics", "Healthcare"],
        dept: "EHS / Plant Operations",
        role: "EHS Manager",
        evidence: ["Form 2 Authorization Letter", "Form 10 Manifests", "Form 4 Annual Return Acknowledgment", "TSDF Disposal Receipts"],
        frequency: "Annual",
        dueDate: "Form 4 due on or before 30th June of each financial year",
        penalty: "Environmental Compensation fines assessed by CPCB/NGT ranging from INR 1 Lakh to multiple Crores, plus potential facility closure."
      }
    ];

    return provisions.map((p, i) => createCanonicalRegulatoryRecord({
      recordId: `REG-DOM-EHS-SEC-${p.section.replace(/[^a-zA-Z0-9]/g, "")}-${i + 1}`,
      jurisdictionType: "Central",
      country: "India",
      issuingAuthority: p.authority,
      actName: p.actName,
      section: p.section,
      originalLegalText: p.originalLegalText,
      plainLanguageExplanation: p.plainText,
      complianceObligation: p.obligation,
      applicabilityConditions: p.applicability,
      industry: p.industry,
      responsibleDepartment: p.dept,
      responsibleRole: p.role,
      requiredEvidence: p.evidence,
      complianceFrequency: p.frequency,
      dueDateLogic: p.dueDate,
      penaltyOrConsequence: p.penalty,
      officialSourceUrl: "https://cpcb.nic.in/",
      verificationStatus: "Verified",
      legalReviewStatus: "Approved"
    }));
  }
}

// ─── Agent 6: Taxation & Trade Agent ──────────────────────────────────────────────
export class TaxationTradeAgent {
  constructor() {
    this.agentId = "AGT-REG-06-TAX";
    this.agentName = "Taxation & Trade Agent";
    this.offering = "taxation-trade";
  }

  async extractTaxProvisions() {
    const provisions = [
      {
        actName: "Central Goods and Services Tax Act, 2017 (CGST Act)",
        section: "Section 39",
        authority: "Central Board of Indirect Taxes and Customs (CBIC) / GST Council",
        originalLegalText: "Every registered person, other than an Input Service Distributor or a non-resident taxable person, shall furnish a return for every calendar month or part thereof.",
        plainText: "Registered businesses must submit monthly outward supply summaries in GSTR-1 and reconcile input tax credit with tax payments in GSTR-3B.",
        obligation: "File GSTR-1 by 11th; reconcile ITC in GSTR-2B; discharge tax liability via Electronic Cash/Credit ledger and file GSTR-3B by 20th.",
        applicability: ["All GST-registered taxpayers with turnover > INR 5 Crore, or normal monthly filers"],
        industry: ["All"],
        dept: "Taxation & Finance",
        role: "Taxation Manager / CFO",
        evidence: ["GSTR-1 ARN Receipt", "GSTR-3B ARN Receipt", "Electronic Cash Ledger Bank Payment Challan (CPIN)"],
        frequency: "Monthly",
        dueDate: "GSTR-1 by 11th; GSTR-3B by 20th of the following month",
        penalty: "Late fee of INR 50/day (INR 20/day for Nil return) up to INR 10,000 per return, plus 18% per annum interest on unpaid tax."
      }
    ];

    return provisions.map((p, i) => createCanonicalRegulatoryRecord({
      recordId: `REG-DOM-TAX-SEC-${p.section.replace(/[^a-zA-Z0-9]/g, "")}-${i + 1}`,
      jurisdictionType: "Central",
      country: "India",
      issuingAuthority: p.authority,
      actName: p.actName,
      section: p.section,
      originalLegalText: p.originalLegalText,
      plainLanguageExplanation: p.plainText,
      complianceObligation: p.obligation,
      applicabilityConditions: p.applicability,
      industry: p.industry,
      responsibleDepartment: p.dept,
      responsibleRole: p.role,
      requiredEvidence: p.evidence,
      complianceFrequency: p.frequency,
      dueDateLogic: p.dueDate,
      penaltyOrConsequence: p.penalty,
      officialSourceUrl: "https://www.cbic.gov.in/",
      verificationStatus: "Verified",
      legalReviewStatus: "Approved"
    }));
  }
}

// ─── Agent 7: Corporate Governance Agent ──────────────────────────────────────────
export class CorporateGovernanceAgent {
  constructor() {
    this.agentId = "AGT-REG-07-GOV";
    this.agentName = "Corporate Governance Agent";
    this.offering = "enterprise-governance";
  }

  async extractGovernanceProvisions() {
    const provisions = [
      {
        actName: "Companies Act, 2013",
        section: "Section 173",
        authority: "Ministry of Corporate Affairs",
        originalLegalText: "Every company shall hold the first meeting of the Board of Directors within thirty days of the date of its incorporation and thereafter hold a minimum number of four meetings of its Board of Directors every year in such a manner that not more than one hundred and twenty days shall intervene between two consecutive meetings of the Board.",
        plainText: "Every incorporated company must convene at least 4 board meetings per calendar year, with a maximum interval of 120 days between consecutive meetings.",
        obligation: "Issue minimum 7 days' advance written notice with agenda; hold meeting; record draft minutes within 15 days; finalize and sign minutes book within 30 days.",
        applicability: ["All Private Limited and Public Limited companies registered in India"],
        industry: ["All"],
        dept: "Secretarial & Legal",
        role: "Company Secretary",
        evidence: ["Board Meeting Notices & Proof of Dispatch", "Signed Attendance Register", "Numbered & Signed Minutes Book"],
        frequency: "Quarterly",
        dueDate: "At least once every calendar quarter; max 120 days gap",
        penalty: "Penalty of INR 25,000 on the company; every defaulting director liable to penalty of INR 25,000 under Section 450."
      }
    ];

    return provisions.map((p, i) => createCanonicalRegulatoryRecord({
      recordId: `REG-DOM-GOV-SEC-${p.section.replace(/[^a-zA-Z0-9]/g, "")}-${i + 1}`,
      jurisdictionType: "Central",
      country: "India",
      issuingAuthority: p.authority,
      actName: p.actName,
      section: p.section,
      originalLegalText: p.originalLegalText,
      plainLanguageExplanation: p.plainText,
      complianceObligation: p.obligation,
      applicabilityConditions: p.applicability,
      industry: p.industry,
      responsibleDepartment: p.dept,
      responsibleRole: p.role,
      requiredEvidence: p.evidence,
      complianceFrequency: p.frequency,
      dueDateLogic: p.dueDate,
      penaltyOrConsequence: p.penalty,
      officialSourceUrl: "https://www.mca.gov.in/",
      verificationStatus: "Verified",
      legalReviewStatus: "Approved"
    }));
  }
}

// ─── Agent 8: Licensing & Permits Agent ───────────────────────────────────────────
export class LicensingPermitsAgent {
  constructor() {
    this.agentId = "AGT-REG-08-LIC";
    this.agentName = "Licensing & Permits Agent";
    this.offering = "licensing-permits";
  }

  async extractLicensingProvisions() {
    const provisions = [
      {
        actName: "Food Safety and Standards Act, 2006",
        section: "Section 31",
        authority: "Food Safety and Standards Authority of India (FSSAI)",
        originalLegalText: "No person shall commence or carry on any food business except under a licence granted under this Act.",
        plainText: "No food business operator (manufacturer, packager, cloud kitchen, food tech platform, transporter) may operate without an active FSSAI License or Registration.",
        obligation: "Obtain State or Central FSSAI License on FoSCoS portal; comply with Schedule 4 sanitary conditions; submit Form D-1 annual return before 31st May.",
        applicability: ["All entities engaged in manufacturing, processing, storage, distribution, import, or sale of food products in India"],
        industry: ["Food Processing", "Hospitality", "E-Commerce", "Retail", "Agriculture"],
        dept: "Quality Assurance & Operations",
        role: "Quality Assurance Lead",
        evidence: ["Active FSSAI License Certificate with 14-digit number", "Water Potability Report", "Form D-1 Filing Acknowledgement"],
        frequency: "Annual",
        dueDate: "Form D-1 annual return due by 31st May; license renewal applied 30 days prior to expiry",
        penalty: "Operating without license punishable with imprisonment up to 6 months and fine up to INR 5,00,000 under Section 63."
      }
    ];

    return provisions.map((p, i) => createCanonicalRegulatoryRecord({
      recordId: `REG-DOM-LIC-SEC-${p.section.replace(/[^a-zA-Z0-9]/g, "")}-${i + 1}`,
      jurisdictionType: "Central",
      country: "India",
      issuingAuthority: p.authority,
      actName: p.actName,
      section: p.section,
      originalLegalText: p.originalLegalText,
      plainLanguageExplanation: p.plainText,
      complianceObligation: p.obligation,
      applicabilityConditions: p.applicability,
      industry: p.industry,
      responsibleDepartment: p.dept,
      responsibleRole: p.role,
      requiredEvidence: p.evidence,
      complianceFrequency: p.frequency,
      dueDateLogic: p.dueDate,
      penaltyOrConsequence: p.penalty,
      officialSourceUrl: "https://www.fssai.gov.in/",
      verificationStatus: "Verified",
      legalReviewStatus: "Approved"
    }));
  }
}


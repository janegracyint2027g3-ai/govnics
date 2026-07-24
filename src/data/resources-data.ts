export interface ResourceItem {
  id: string;
  type: "whitepaper" | "alert" | "update" | "report" | "blog";
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  downloadUrl?: string;
  grcType?: "Act" | "Rule" | "Compliance" | "Standard";
}

export const resourcesData: ResourceItem[] = [
  {
    id: "dpdp-readiness-whitepaper",
    type: "whitepaper",
    title: "The Enterprise DPDP Act Readiness Blueprint (2026 Edition)",
    category: "Data Privacy",
    summary: "An exhaustive implementation guide detailing how Indian enterprises can structure consent architectures, data mapping registers, and breach response SOPs to prevent ₹250Cr penalties.",
    date: "May 28, 2026",
    readTime: "15 min read",
    author: "Senior GRC Privacy Counsel",
    downloadUrl: "#",
    grcType: "Act"
  },
  {
    id: "rbi-it-outsource-alert",
    type: "alert",
    title: "Critical Regulatory Alert: New RBI Guidelines on Third-Party IT Outsourcing",
    category: "Banking Regulation",
    summary: "Immediate compliance steps required for all commercial banks, NBFCs, and fintech partners regarding third-party audit trails, subcontractor SLAs, and continuous risk tracking.",
    date: "June 01, 2026",
    readTime: "5 min read",
    author: "BFSI Advisory Team",
    grcType: "Rule"
  },
  {
    id: "brsr-esg-report",
    type: "report",
    title: "BRSR ESG Reporting Roadmap for Heavy Manufacturing Units",
    category: "Sustainability & ESG",
    summary: "A practical framework mapping SEBI's Business Responsibility & Sustainability Reporting (BRSR) directives against daily factory emissions, water usage, and labor welfare registers.",
    date: "May 15, 2026",
    readTime: "22 min read",
    author: "Govenics ESG Task Force",
    downloadUrl: "#",
    grcType: "Compliance"
  },
  {
    id: "iso27001-2022-update",
    type: "update",
    title: "ISO 27001:2022 Transition Guide & Audit Checklist",
    category: "Cybersecurity",
    summary: "A step-by-step documentation brief explaining key differences in controls, threat intelligence integrations, and physical-security assessments required for renewal.",
    date: "April 30, 2026",
    readTime: "8 min read",
    author: "Chief Information Security Auditor",
    grcType: "Standard"
  },
  {
    id: "hospital-accreditation-blog",
    type: "blog",
    title: "Top 5 Common Pitfalls in NABH Hospital Inspections and How to Bypass Them",
    category: "Healthcare Governance",
    summary: "Practical operational notes for hospital quality heads regarding patient risk consent forms, Operating Theatres (OT) sterilization logs, and clinical governance audits.",
    date: "May 22, 2026",
    readTime: "6 min read",
    author: "Director of Quality Accreditation",
    grcType: "Compliance"
  }
];


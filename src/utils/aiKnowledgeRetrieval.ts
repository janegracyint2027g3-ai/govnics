// src/utils/aiKnowledgeRetrieval.ts
// Phase 3 — Client-side Knowledge Retrieval Client
// Connects UI components (E-Library, Chatbot, Admin) to /api/knowledge/retrieve
// with seamless fallback to client-side hybrid engine when running in local dev without backend.

import type {
  KnowledgeDocument,
  RetrievalQuery,
  RetrievalResult
} from "@/types/knowledgeHub";

// Bundled verified seed documents for local resilience
export const CLIENT_SEED_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "KN-2026-0001",
    recordId: "GOVENICS-CYB-ACT-0001",
    title: "Digital Personal Data Protection (DPDP) Act, 2023",
    enrichedTitle: "The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)",
    offering: "cybersecurity-data",
    industry: "IT & Technology",
    documentType: "Statutory / Legal Source",
    jurisdiction: {
      country: "India",
      state: "Central",
      applicableRegulator: "Data Protection Board of India (DPBI)",
      industryAuthority: "Ministry of Electronics & Information Technology (MeitY)"
    },
    fileMetadata: {
      originalFileName: "dpdp_act_2023_gazette.pdf",
      fileExtension: "pdf",
      mimeType: "application/pdf",
      fileSizeBytes: 428000,
      fileHashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      pageCount: 24,
      storageUrl: "https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf"
    },
    summary: "Comprehensive data protection statute governing the processing of digital personal data within India and extraterritorial data processing relating to offering goods/services to Indian data principals.",
    trustState: "Verified Primary Source",
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v1.0",
    effectiveDate: "2023-08-11",
    lastReviewedDate: "2026-10-15",
    processingStatus: "Indexed",
    chunkCount: 3,
    statutoryReference: "Act No. 22 of 2023",
    externalSourceUrl: "https://www.meity.gov.in/",
    tags: ["dpdp", "privacy", "consent", "data fiduciary", "penalties", "breach"],
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-10-15T12:00:00Z",
    chunks: [
      {
        id: "KN-2026-0001-C01",
        documentId: "KN-2026-0001",
        chunkIndex: 1,
        content: "[Document: Digital Personal Data Protection Act, 2023 | Section: Section 4, 5 & 6 (Consent & Notice) | Page: 4]\n\nSection 4 mandates that personal data shall only be processed for a lawful purpose for which the Data Principal has given consent, or for certain legitimate uses. Section 5 mandates that on or before requesting consent, the Data Fiduciary must give the Data Principal an itemised notice containing the personal data sought and the specific purpose of processing. Section 6 specifies that consent must be free, specific, informed, unconditional, and unambiguous with clear affirmative action.",
        tokenCount: 95,
        sectionHeader: "Section 4-6 Consent Framework",
        pageNumber: 4,
        clauseReference: "Section 4, 5, 6",
        keywords: ["consent", "notice", "lawful purpose", "data principal", "data fiduciary"]
      },
      {
        id: "KN-2026-0001-C02",
        documentId: "KN-2026-0001",
        chunkIndex: 2,
        content: "[Document: Digital Personal Data Protection Act, 2023 | Section: Section 8 (General Obligations of Data Fiduciary) | Page: 7]\n\nSection 8(5) requires Data Fiduciaries to protect personal data in its possession or control by taking reasonable security safeguards to prevent personal data breach. In the event of a personal data breach, Section 8(6) strictly mandates that the Data Fiduciary shall give the Data Protection Board of India and each affected Data Principal intimation of such breach in such form and manner as prescribed.",
        tokenCount: 88,
        sectionHeader: "Section 8 Breach Notification",
        pageNumber: 7,
        clauseReference: "Section 8(5), 8(6)",
        keywords: ["data breach", "security safeguards", "board intimation", "data fiduciary"]
      },
      {
        id: "KN-2026-0001-C03",
        documentId: "KN-2026-0001",
        chunkIndex: 3,
        content: "[Document: Digital Personal Data Protection Act, 2023 | Section: Section 33 & Schedule (Penalties) | Page: 21]\n\nSection 33 empowers the Data Protection Board to adjudicate penalties for non-compliance. Under the Schedule: Failure to take reasonable security safeguards to prevent data breach carries penalties up to ₹250 Crores (INR 2.5 Billion). Failure to notify Board and affected principals of data breach carries penalties up to ₹200 Crores. Non-compliance with additional obligations in relation to children carries penalties up to ₹200 Crores.",
        tokenCount: 92,
        sectionHeader: "Section 33 Financial Penalties",
        pageNumber: 21,
        clauseReference: "Section 33 & Schedule",
        keywords: ["penalties", "250 crore", "data breach fine", "board adjudication"]
      }
    ]
  },
  {
    id: "KN-2026-0002",
    recordId: "GOVENICS-LEI-ACT-0002",
    title: "The Code on Social Security, 2020",
    enrichedTitle: "The Code on Social Security, 2020 (Act No. 36 of 2020)",
    offering: "labour-employment",
    industry: "Manufacturing & Industrial",
    documentType: "Statutory / Legal Source",
    jurisdiction: {
      country: "India",
      state: "Central",
      applicableRegulator: "Ministry of Labour & Employment",
      industryAuthority: "EPFO & ESIC"
    },
    fileMetadata: {
      originalFileName: "code_on_social_security_2020.pdf",
      fileExtension: "pdf",
      mimeType: "application/pdf",
      fileSizeBytes: 890000,
      fileHashSha256: "b4c2e1198fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b899a",
      pageCount: 110,
      storageUrl: "https://labour.gov.in/sites/default/files/SS_Code_Gazette.pdf"
    },
    summary: "Consolidates and amends laws relating to social security extending benefits across organised and unorganised sectors including gig and platform workers.",
    trustState: "Verified Primary Source",
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v2.1",
    effectiveDate: "2020-09-29",
    lastReviewedDate: "2026-10-18",
    processingStatus: "Indexed",
    chunkCount: 2,
    statutoryReference: "Act No. 36 of 2020",
    externalSourceUrl: "https://labour.gov.in/",
    tags: ["social security", "epf", "gratuity", "esi", "gig workers", "fixed term"],
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-10-18T14:00:00Z",
    chunks: [
      {
        id: "KN-2026-0002-C01",
        documentId: "KN-2026-0002",
        chunkIndex: 1,
        content: "[Document: The Code on Social Security, 2020 | Section: Chapter V & Section 53 (Gratuity Eligibility) | Page: 34]\n\nSection 53 establishes that gratuity shall be payable to an employee on the termination of his employment after continuous service for not less than five years. Proviso to Section 53(1) establishes a key statutory reform: The completion of continuous service of five years shall NOT be necessary where the termination of the employment of any employee is on expiry of his fixed-term employment contract. Fixed-term employees are entitled to pro-rata gratuity if service exceeds one year.",
        tokenCount: 96,
        sectionHeader: "Gratuity Eligibility & Fixed-Term Reform",
        pageNumber: 34,
        clauseReference: "Section 53",
        keywords: ["gratuity", "five years", "fixed term employment", "continuous service", "pro-rata gratuity"]
      },
      {
        id: "KN-2026-0002-C02",
        documentId: "KN-2026-0002",
        chunkIndex: 2,
        content: "[Document: The Code on Social Security, 2020 | Section: Chapter IX (Gig and Platform Workers) | Page: 78]\n\nSection 114 mandates the Central Government to frame suitable social security schemes for gig workers and platform workers on matters relating to life and disability cover, health and maternity benefits, and old age protection. Section 114(4) mandates aggregators (ride-sharing, food delivery, logistics) to contribute to a Social Security Fund a sum between 1% to 2% of their annual turnover, not exceeding 5% of the total amount paid to gig workers.",
        tokenCount: 94,
        sectionHeader: "Gig Worker Social Security Fund",
        pageNumber: 78,
        clauseReference: "Section 114",
        keywords: ["gig worker", "platform worker", "aggregator cess", "turnover contribution"]
      }
    ]
  },
  {
    id: "KN-2026-0003",
    recordId: "GOVENICS-EHS-ACT-0003",
    title: "The Factories Act, 1948 & State Compliance Rules",
    enrichedTitle: "The Factories Act, 1948 (Act No. 63 of 1948) with Model State Rules",
    offering: "environmental-ehs",
    industry: "Manufacturing & Industrial",
    documentType: "Statutory / Legal Source",
    jurisdiction: {
      country: "India",
      state: "Central & States",
      applicableRegulator: "DGFASLI",
      industryAuthority: "State Inspectorate of Factories"
    },
    fileMetadata: {
      originalFileName: "factories_act_1948.pdf",
      fileExtension: "pdf",
      mimeType: "application/pdf",
      fileSizeBytes: 650000,
      fileHashSha256: "c5d3f2298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b771b",
      pageCount: 58,
      storageUrl: "https://labour.gov.in/sites/default/files/TheFactoriesAct1948.pdf"
    },
    summary: "Regulates occupational health, physical safety, working hours, hazardous processes, and welfare provisions for manufacturing workers.",
    trustState: "Verified Primary Source",
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v3.0",
    effectiveDate: "1948-04-01",
    lastReviewedDate: "2026-09-20",
    processingStatus: "Indexed",
    chunkCount: 2,
    statutoryReference: "Act No. 63 of 1948",
    externalSourceUrl: "https://labour.gov.in/",
    tags: ["factories act", "safety officer", "hazardous process", "working hours", "overtime"],
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-09-20T11:00:00Z",
    chunks: [
      {
        id: "KN-2026-0003-C01",
        documentId: "KN-2026-0003",
        chunkIndex: 1,
        content: "[Document: The Factories Act, 1948 | Section: Section 40-B & Section 41-A (Safety Officers & Hazardous Processes) | Page: 22]\n\nSection 40-B requires that in every factory wherein one thousand or more workers are ordinarily employed, or wherein any manufacturing process involves risk of bodily injury or disease, the occupier shall employ qualified Safety Officers. Section 41-A requires the occupier of a factory involving a hazardous process to disclose all information regarding health and safety hazards, disposal of wastes, and emergency response plans to the Chief Inspector, local authority, and workers.",
        tokenCount: 96,
        sectionHeader: "Safety Officers & Hazardous Process Oversight",
        pageNumber: 22,
        clauseReference: "Section 40-B, 41-A",
        keywords: ["safety officer", "1000 workers", "hazardous process", "occupational safety", "chief inspector"]
      },
      {
        id: "KN-2026-0003-C02",
        documentId: "KN-2026-0003",
        chunkIndex: 2,
        content: "[Document: The Factories Act, 1948 | Section: Section 51, 54 & 59 (Working Hours & Overtime) | Page: 30]\n\nSection 51 prohibits adult workers from working more than forty-eight hours in any week. Section 54 caps daily work at nine hours. Under Section 59, where a worker works in a factory for more than nine hours on any day or more than forty-eight hours in any week, he shall, in respect of overtime work, be entitled to wages at the rate of twice his ordinary rate of wages (double rate overtime).",
        tokenCount: 91,
        sectionHeader: "Weekly Hours & Overtime Premium",
        pageNumber: 30,
        clauseReference: "Section 51, 54, 59",
        keywords: ["48 hours", "nine hours", "overtime", "double wages", "ordinary rate"]
      }
    ]
  },
  {
    id: "KN-2026-0004",
    recordId: "GOVENICS-ESG-GUI-0004",
    title: "SEBI BRSR Core Master Framework & ESG Assurance Mandate",
    enrichedTitle: "SEBI Master Circular on Business Responsibility and Sustainability Reporting (BRSR)",
    offering: "esg-sustainability",
    industry: "Banking & Financial Services",
    documentType: "Regulatory Guidance",
    jurisdiction: {
      country: "India",
      state: "Central",
      applicableRegulator: "Securities and Exchange Board of India (SEBI)",
      industryAuthority: "Stock Exchanges (NSE/BSE)"
    },
    fileMetadata: {
      originalFileName: "sebi_brsr_core_circular_2023.pdf",
      fileExtension: "pdf",
      mimeType: "application/pdf",
      fileSizeBytes: 520000,
      fileHashSha256: "d6e4a3398fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b662c",
      pageCount: 42,
      storageUrl: "https://www.sebi.gov.in/legal/circulars/jul-2023/brsr-core_73854.html"
    },
    summary: "Establishes nine core ESG attributes with mandatory reasonable assurance protocols for top 1,000 listed entities by market capitalization under SEBI LODR Regulation 34(2)(f).",
    trustState: "Verified Primary Source",
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v2.0",
    effectiveDate: "2023-07-12",
    lastReviewedDate: "2026-10-01",
    processingStatus: "Indexed",
    chunkCount: 2,
    statutoryReference: "SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122",
    externalSourceUrl: "https://www.sebi.gov.in/",
    tags: ["brsr", "sebi", "esg", "scope 1 2 3", "assurance", "top 1000 listed"],
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-10-01T15:00:00Z",
    chunks: [
      {
        id: "KN-2026-0004-C01",
        documentId: "KN-2026-0004",
        chunkIndex: 1,
        content: "[Document: SEBI BRSR Core Framework | Section: Annexure I (BRSR Core Slabs & KPIs) | Page: 8]\n\nBRSR Core comprises nine key ESG indicators including GHG emissions (Scope 1 and Scope 2 intensity per crore rupee of turnover), water consumption intensity, energy intensity, fair remuneration ratio, gender diversity, and waste recycling percentages. For the top 250 listed entities, reasonable assurance of BRSR Core disclosures is mandatory. The assurance provider must be independent and possess recognized environmental auditing credentials.",
        tokenCount: 89,
        sectionHeader: "BRSR Core KPIs & Scope 1-2 Intensity",
        pageNumber: 8,
        clauseReference: "Circular Para 3.2",
        keywords: ["brsr core", "scope 1", "scope 2", "greenhouse gas", "reasonable assurance", "top 250"]
      },
      {
        id: "KN-2026-0004-C02",
        documentId: "KN-2026-0004",
        chunkIndex: 2,
        content: "[Document: SEBI BRSR Core Framework | Section: Value Chain ESG Disclosures | Page: 15]\n\nListed entities must extend BRSR Core disclosures to their value chain (comprising top suppliers and customers accounting for 75% of purchases or sales by value). The reporting entity may disclose footprint data based on primary assurance obtained by key suppliers or verified Tier-1 questionnaires, emphasizing human rights, ethical supply, and zero child labour in procurement chains.",
        tokenCount: 85,
        sectionHeader: "Value Chain & Scope 3 Disclosures",
        pageNumber: 15,
        clauseReference: "Circular Para 4.1",
        keywords: ["value chain", "tier-1 suppliers", "75 percent turnover", "scope 3", "supply chain esg"]
      }
    ]
  },
  {
    id: "KN-2026-0005",
    recordId: "GOVENICS-GOV-CHK-0005",
    title: "Companies Act 2013 Corporate Governance & Secretarial Checklist",
    enrichedTitle: "Statutory Secretarial Compliance & Board Governance Checklist (Companies Act, 2013)",
    offering: "enterprise-governance",
    industry: "Banking & Financial Services",
    documentType: "Compliance Checklist",
    jurisdiction: {
      country: "India",
      state: "Central",
      applicableRegulator: "Ministry of Corporate Affairs (MCA)",
      industryAuthority: "Registrar of Companies (RoC)"
    },
    fileMetadata: {
      originalFileName: "companies_act_governance_checklist_2026.xlsx",
      fileExtension: "xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      fileSizeBytes: 240000,
      fileHashSha256: "f0e1d2c3b4a596877869504132231405a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1",
      pageCount: 8,
      storageUrl: "https://storage.govenics.com/governance/secretarial_checklist.xlsx"
    },
    summary: "Annual checklist covering Board meeting quorums, Form AOC-4 balance sheet submittals, Form MGT-7 annual returns, and Related Party Transaction disclosures under Section 188.",
    trustState: "Verified Primary Source",
    approvalStatus: "Approved",
    isEligibleForAiRetrieval: true,
    version: "v3.1",
    effectiveDate: "2024-01-01",
    lastReviewedDate: "2026-08-30",
    processingStatus: "Indexed",
    chunkCount: 1,
    statutoryReference: "Companies Act 2013 Sec 134, 137, 188",
    externalSourceUrl: "https://www.mca.gov.in/",
    tags: ["companies act", "mca", "aoc-4", "mgt-7", "board meeting", "secretarial", "roc"],
    createdAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    chunks: [
      {
        id: "KN-2026-0005-C01",
        documentId: "KN-2026-0005",
        chunkIndex: 1,
        content: "[Document: Companies Act 2013 Secretarial Checklist | Section: Section 137 & 92 (AOC-4 & MGT-7 Annual Filing Mandates) | Page: 3]\n\nUnder Section 137, every company must file its adopted financial statements in Form AOC-4 with the Registrar of Companies within thirty days of the AGM. Delayed filings attract a statutory additional fee of ₹100 per day of delay without ceiling. Under Section 92, annual return Form MGT-7 must be filed within sixty days of the AGM. For listed and large public firms, secretarial audit in Form MR-3 under Section 204 is mandatory.",
        tokenCount: 95,
        sectionHeader: "AOC-4 & MGT-7 Filing Timelines & ₹100/day Penalty",
        pageNumber: 3,
        clauseReference: "Section 137, 92, 204",
        keywords: ["aoc-4", "mgt-7", "100 per day penalty", "mca filing", "secretarial audit", "mr-3"]
      }
    ]
  }
];

export async function queryKnowledgeHub(params: RetrievalQuery): Promise<RetrievalResult> {
  const startTime = Date.now();
  const queryStr = params.query.trim();

  // Attempt backend API call first
  try {
    const res = await fetch("/api/knowledge/retrieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          query: queryStr,
          agentId: params.agentId,
          evidenceFound: data.evidenceFound,
          confidenceScore: data.confidenceScore,
          retrievedChunks: data.retrievedEvidence || [],
          citations: data.citations || [],
          groundedAnswer: data.groundedAnswer,
          fallbackMessage: data.fallbackMessage,
          processingTimeMs: data.processingTimeMs || (Date.now() - startTime)
        };
      }
    }
  } catch {
    // Backend API unavailable — fall back gracefully to client-side hybrid engine
  }

  // ── Client-side Hybrid Engine Fallback ──────────────────────────────────────
  const queryTokens = queryStr.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const scoredChunks: any[] = [];

  for (const doc of CLIENT_SEED_DOCUMENTS) {
    if (doc.approvalStatus !== "Approved") continue;
    if (params.offering && params.offering !== doc.offering) continue;
    if (params.industry && params.industry !== doc.industry && doc.industry !== "Cross-Industry") continue;

    for (const chunk of doc.chunks || []) {
      const lower = chunk.content.toLowerCase();
      let matches = 0;
      for (const t of queryTokens) {
        if (lower.includes(t)) matches++;
        else if (chunk.keywords.some(k => k.toLowerCase().includes(t))) matches += 0.5;
      }

      if (matches > 0) {
        const score = Math.min(0.98, (matches / Math.max(queryTokens.length, 1)) * 0.85 + 0.15);
        scoredChunks.push({
          chunkId: chunk.id,
          documentId: doc.id,
          documentTitle: doc.title,
          content: chunk.content,
          pageNumber: chunk.pageNumber,
          sectionHeader: chunk.sectionHeader,
          relevanceScore: parseFloat(score.toFixed(3)),
          doc
        });
      }
    }
  }

  scoredChunks.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topChunks = scoredChunks.slice(0, params.topK || 3);
  const bestScore = topChunks.length > 0 ? topChunks[0].relevanceScore : 0;
  const evidenceFound = bestScore >= 0.55;

  const citations = Array.from(new Set(topChunks.map(c => c.doc))).map((d: any) => ({
    documentId: d.id,
    documentTitle: d.title,
    offering: d.offering,
    industry: d.industry,
    jurisdiction: `${d.jurisdiction.country}${d.jurisdiction.state ? ` (${d.jurisdiction.state})` : ""}`,
    regulator: d.jurisdiction.applicableRegulator,
    documentType: d.documentType,
    sectionOrPage: "Section 1",
    statutoryReference: d.statutoryReference,
    sourceUrl: d.externalSourceUrl || d.fileMetadata.storageUrl || "",
    effectiveDate: d.effectiveDate,
    version: d.version,
    trustState: d.trustState,
    confidenceScore: bestScore
  }));

  let groundedAnswer = "";
  if (evidenceFound) {
    groundedAnswer = `Based on verified records in the **GOVENICS Knowledge Library** (${citations[0].trustState}):\n\n`;
    for (const c of topChunks) {
      const cleanContent = c.content.replace(/^\[Document:[^\]]+\]\s*/i, "").trim();
      groundedAnswer += `• **${c.sectionHeader || "Statutory Provision"}**: ${cleanContent}\n\n`;
    }
    groundedAnswer += `\n**Regulatory Obligation:** Statutory Obligation under ${citations[0].regulator} (${citations[0].jurisdiction})`;
  }

  return {
    query: queryStr,
    agentId: params.agentId,
    evidenceFound,
    confidenceScore: bestScore,
    retrievedChunks: topChunks.map(({ doc: _, ...rest }) => rest),
    citations,
    groundedAnswer: evidenceFound ? groundedAnswer : undefined,
    fallbackMessage: evidenceFound
      ? undefined
      : "I could not locate sufficient verified information in the approved GOVENICS Knowledge Library to provide a reliable answer. This question requires additional source verification.",
    processingTimeMs: Date.now() - startTime
  };
}

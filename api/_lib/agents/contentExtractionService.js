// api/_lib/agents/contentExtractionService.js
// GOVENICS GRC — Content Extraction Agent Service (Node.js runtime)
// Discovers, parses, and structures statutory compliance intelligence and provisions.

import crypto from "crypto";
import fs from "fs";
import path from "path";

const KNOWN_AUTHORITIES = {
  "Ministry of Labour & Employment": ["labour", "employment", "epfo", "esic", "factories", "minimum wages", "gratuity", "bonus", "posh"],
  "Ministry of Corporate Affairs": ["mca", "companies act", "roc", "director", "incorporation", "board of directors", "aoc-4", "mgt-7"],
  "Reserve Bank of India": ["rbi", "banking", "nbfc", "monetary", "fema", "cross-border payment", "foreign exchange"],
  "Securities and Exchange Board of India": ["sebi", "listing", "insider trading", "lodr", "mutual fund", "stock exchange"],
  "Ministry of Electronics & Information Technology": ["meity", "cert-in", "cybersecurity", "dpdp", "data protection", "information technology act"],
  "Central Pollution Control Board": ["cpcb", "spcb", "pollution", "air act", "water act", "environmental", "hazardous waste", "epr"],
  "Food Safety and Standards Authority of India": ["fssai", "food safety", "food adulteration", "food license"],
  "Directorate General of Foreign Trade": ["dgft", "export", "import", "customs", "iec code", "foreign trade policy"]
};

const OFFERING_KEYWORDS = {
  "Regulatory Compliance": ["statutory", "compliance", "register", "inspection", "mca", "licensing"],
  "Labour & Employment": ["labour", "employment", "wages", "epfo", "esic", "factories", "gratuity", "posh", "workman"],
  "Environmental & EHS": ["environment", "pollution", "cpcb", "spcb", "hazardous waste", "emission", "effluent", "water act"],
  "Licensing & Permits": ["license", "permit", "clearance", "consent to operate", "trade license", "fssai"],
  "Taxation & Trade": ["gst", "taxation", "income tax", "tds", "transfer pricing"],
  "Supply Chain Compliance": ["vendor", "contractor", "supply chain", "clra", "third party audit"],
  "Enterprise Governance": ["board of directors", "corporate governance", "independent director", "secretarial audit"],
  "Risk Management": ["risk", "mitigation", "internal controls", "iso 31000", "audit committee"],
  "ESG & Sustainability": ["esg", "brsr", "carbon", "sustainability", "csr", "scope 1", "greenhouse"],
  "Cybersecurity & Privacy": ["dpdp", "data privacy", "cybersecurity", "cert-in", "iso 27001", "vulnerability", "infosec"]
};

export class ContentExtractionService {
  constructor() {
    this.reportsDir = path.join(process.cwd(), "compliance_platform", "reports", "extracted_content");
    if (!fs.existsSync(this.reportsDir)) {
      try {
        fs.mkdirSync(this.reportsDir, { recursive: true });
      } catch { /* best-effort */ }
    }
  }

  async extractFromText(rawText, title = "", hints = {}) {
    if (!rawText || typeof rawText !== "string") {
      throw new Error("rawText must be a non-empty string.");
    }

    const cleanText = rawText.trim();
    let docTitle = title || hints.title;
    if (!docTitle) {
      const firstLine = cleanText.split("\n")[0] || "";
      docTitle = firstLine.replace(/^#\s*/, "").slice(0, 100) || "Structured Regulatory Document";
    }

    const docType = hints.document_type || this.classifyDocumentType(docTitle, cleanText);
    const authority = hints.issuing_authority || this.detectAuthority(docTitle, cleanText);
    const { jurisdiction, governmentLevel } = this.detectJurisdiction(docTitle, cleanText, hints);
    const enactmentYear = this.detectEnactmentYear(docTitle, cleanText);
    const provisions = this.extractProvisions(cleanText);
    const penalties = this.extractPenalties(cleanText);
    const statutoryForms = this.extractStatutoryForms(cleanText);
    const offerings = this.classifyOfferings(docTitle, cleanText, hints);
    const industries = hints.applicable_industries || ["Manufacturing & Industrial", "Cross-Industry"];
    const summary = hints.summary || this.generateExtractiveSummary(cleanText);

    const fingerprint = crypto
      .createHash("sha256")
      .update(`${docTitle}::${cleanText.slice(0, 1000)}`)
      .digest("hex");

    const safePrefix = docTitle.replace(/[^A-Za-z0-9]/g, "").slice(0, 10).toUpperCase();
    const contentId = `EXT-${safePrefix}-${fingerprint.slice(0, 8)}`;

    const record = {
      content_id: contentId,
      source_type: "TEXT",
      source_origin: hints.source_url || "Direct Input",
      title: docTitle,
      document_type: docType,
      issuing_authority: authority,
      jurisdiction,
      government_level: governmentLevel,
      enactment_year: enactmentYear,
      clean_text: cleanText,
      summary,
      provisions,
      applicable_offerings: offerings,
      applicable_industries: industries,
      penalties_summary: penalties,
      statutory_forms: statutoryForms,
      fingerprint,
      extracted_at: new Date().toISOString(),
      validation_status: "VALIDATED",
      extraction_metadata: {
        char_count: cleanText.length,
        provisions_count: provisions.length,
        penalties_count: penalties.length,
        forms_count: statutoryForms.length
      }
    };

    this.persistRecord(record);
    return record;
  }

  classifyDocumentType(title, text) {
    const combined = `${title}\n${text.slice(0, 1000)}`.toLowerCase();
    if (combined.includes("act, 19") || combined.includes("act, 20") || combined.includes("statute")) return "Acts";
    if (combined.includes("regulation") || combined.includes("rules, 20")) return "Regulations";
    if (combined.includes("notification") || combined.includes("circular")) return "Notifications";
    if (combined.includes("handbook") || combined.includes("e-book") || combined.includes("guide")) return "E-Books";
    if (combined.includes("checklist")) return "Checklists";
    return "Articles & Blogs";
  }

  detectAuthority(title, text) {
    const combined = `${title}\n${text.slice(0, 2000)}`.toLowerCase();
    for (const [auth, keywords] of Object.entries(KNOWN_AUTHORITIES)) {
      if (keywords.some(k => combined.includes(k))) return auth;
    }
    return "Appropriate Statutory Authority";
  }

  detectJurisdiction(title, text, hints) {
    if (hints.jurisdiction) {
      return { jurisdiction: hints.jurisdiction, governmentLevel: hints.government_level || "Central" };
    }
    const combined = `${title}\n${text.slice(0, 2000)}`.toLowerCase();
    const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Delhi", "Haryana", "Telangana"];
    for (const st of states) {
      if (combined.includes(st.toLowerCase())) return { jurisdiction: `${st} (State)`, governmentLevel: "State" };
    }
    return { jurisdiction: "India (Central)", governmentLevel: "Central" };
  }

  detectEnactmentYear(title, text) {
    const match = title.match(/\b(19\d{2}|20\d{2})\b/);
    if (match) return parseInt(match[1], 10);
    const bodyMatch = text.slice(0, 2000).match(/(?:enacted|notified|promulgated)\s+.*?\b(19\d{2}|20\d{2})\b/i);
    return bodyMatch ? parseInt(bodyMatch[1], 10) : null;
  }

  extractProvisions(text) {
    const provisions = [];
    const pattern = /(?:Section|Sec\.|Clause|Rule)\s*(\d+[A-Za-z]?(?:\(\d+\))*)\s*[-:–—.]\s*([^\n\r]+)/gi;
    let match;
    const seen = new Set();

    while ((match = pattern.exec(text)) !== null) {
      const secNum = match[1].trim();
      const secTitle = match[2].trim();
      if (seen.has(secNum)) continue;
      seen.add(secNum);

      const start = match.index + match[0].length;
      const provBody = text.slice(start, start + 350).split("\n\n")[0].trim();
      const lower = provBody.toLowerCase();

      let obligation = "Directory";
      if (lower.includes("shall not") || lower.includes("prohibited")) obligation = "Prohibition";
      else if (lower.includes("shall") || lower.includes("must") || lower.includes("mandatory")) obligation = "Mandatory";
      else if (lower.includes("exempt")) obligation = "Exemption";

      provisions.push({
        section_number: `Section ${secNum}`,
        section_title: secTitle,
        provision_text: provBody || `Compliance obligation specified under Section ${secNum} (${secTitle}).`,
        obligation_type: obligation
      });

      if (provisions.length >= 20) break;
    }
    return provisions;
  }

  extractPenalties(text) {
    const penalties = [];
    const patterns = [
      /(?:punishable with|fine which may extend to|imprisonment for a term which may extend to|penalty of)[^\n\.\;]{5,120}/gi,
      /(?:₹|Rs\.?)\s*[\d,]+(?:\s*(?:lakh|crore))?/gi
    ];
    for (const pat of patterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        const item = m[0].trim();
        if (!penalties.includes(item) && item.length > 5) penalties.push(item);
        if (penalties.length >= 6) break;
      }
    }
    return penalties;
  }

  extractStatutoryForms(text) {
    const forms = [];
    const matches = text.match(/\b(?:Form|Schedule|Annexure)\s+[A-Z0-9\-]+/gi) || [];
    for (const f of matches) {
      const clean = f.trim().toUpperCase();
      if (!forms.includes(clean)) forms.push(clean);
      if (forms.length >= 8) break;
    }
    return forms;
  }

  classifyOfferings(title, text, hints) {
    if (hints.applicable_offerings) return hints.applicable_offerings;
    const combined = `${title}\n${text.slice(0, 2000)}`.toLowerCase();
    const matched = [];
    for (const [off, kws] of Object.entries(OFFERING_KEYWORDS)) {
      if (kws.some(kw => combined.includes(kw))) matched.push(off);
    }
    return matched.length ? matched : ["Regulatory Compliance"];
  }

  generateExtractiveSummary(text) {
    const paras = text.split("\n\n").filter(p => p.trim().length > 60);
    if (paras.length) return paras.slice(0, 2).join(" ").slice(0, 600) + "...";
    return text.slice(0, 400).trim() + "...";
  }

  persistRecord(record) {
    try {
      const target = path.join(this.reportsDir, `${record.content_id}.json`);
      fs.writeFileSync(target, JSON.stringify(record, null, 2), "utf8");
    } catch (err) {
      console.warn("[ContentExtractionService] File persistence warning:", err.message);
    }
  }
}

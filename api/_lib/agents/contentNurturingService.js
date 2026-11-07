// api/_lib/agents/contentNurturingService.js
// GOVENICS GRC — Content Nurturing Agent Service (Node.js runtime)
// Enriches extracted compliance intelligence into executive briefings,
// statutory action checklists, advisory Q&A, and publishes to WordPress CMS.

import fs from "fs";
import path from "path";

export class ContentNurturingService {
  constructor() {
    this.nurturedDir = path.join(process.cwd(), "compliance_platform", "reports", "nurtured_content");
    if (!fs.existsSync(this.nurturedDir)) {
      try {
        fs.mkdirSync(this.nurturedDir, { recursive: true });
      } catch { /* best-effort */ }
    }
  }

  async nurture(extractedRecord, options = {}) {
    const { publishToCms = false } = options;

    const assetId = `NURT-${extractedRecord.content_id.replace(/^EXT-/, "")}`;
    const categorySlug = this.resolveCategorySlug(extractedRecord.document_type);

    const execSummary = this.synthesizeExecutiveSummary(extractedRecord);
    const boardroomImpact = this.generateBoardroomImpact(extractedRecord);
    const plainTakeaways = this.generatePlainEnglishTakeaways(extractedRecord);
    const checklist = this.buildComplianceChecklist(extractedRecord);
    const faqs = this.generateAdvisoryFaqs(extractedRecord);
    const htmlArticle = this.buildHtmlArticle(extractedRecord, execSummary, boardroomImpact, checklist, faqs);
    const linkedinSnippets = this.generateLinkedinSnippets(extractedRecord, plainTakeaways);
    const seoMeta = this.generateSeoMetadata(extractedRecord);
    const kgElements = this.generateKgElements(extractedRecord);

    const asset = {
      asset_id: assetId,
      source_content_id: extractedRecord.content_id,
      title: extractedRecord.title,
      document_type: extractedRecord.document_type,
      category_slug: categorySlug,
      issuing_authority: extractedRecord.issuing_authority,
      jurisdiction: extractedRecord.jurisdiction,
      executive_summary: execSummary,
      boardroom_impact: boardroomImpact,
      plain_english_takeaways: plainTakeaways,
      compliance_checklist: checklist,
      advisory_faqs: faqs,
      html_article: htmlArticle,
      linkedin_snippets: linkedinSnippets,
      seo_metadata: seoMeta,
      target_offerings: extractedRecord.applicable_offerings || ["Regulatory Compliance"],
      target_industries: extractedRecord.applicable_industries || ["Cross-Industry"],
      knowledge_graph_elements: kgElements,
      publishing_status: "STAGED",
      nurtured_at: new Date().toISOString()
    };

    if (publishToCms) {
      try {
        const published = await this.publishToWordPress(asset);
        asset.wp_post_id = published.wp_post_id;
        asset.wp_post_url = published.url;
        asset.publishing_status = "PUBLISHED";
      } catch (err) {
        console.warn("[ContentNurturingService] CMS publishing warning:", err.message);
        asset.publishing_status = "PUBLISH_FAILED";
        asset.publishing_error = err.message;
      }
    }

    this.persistAsset(asset);
    return asset;
  }

  resolveCategorySlug(docType) {
    const map = {
      "Acts": "acts",
      "Regulations": "regulations",
      "Notifications": "notifications",
      "E-Books": "ebooks",
      "Articles & Blogs": "articles-blogs",
      "Checklists": "checklists"
    };
    return map[docType] || "articles-blogs";
  }

  synthesizeExecutiveSummary(record) {
    const lines = [
      `This authoritative executive briefing analyzes **${record.title}**, enforced by the **${record.issuing_authority}** across **${record.jurisdiction}**.`,
      `The statutory framework establishes key operational requirements across ${(record.applicable_offerings || []).join(", ")}.`
    ];
    if (record.penalties_summary && record.penalties_summary.length > 0) {
      lines.push(`Non-compliance introduces direct penal liabilities including: ${record.penalties_summary.slice(0, 2).join("; ")}.`);
    }
    return lines.join(" ");
  }

  generateBoardroomImpact(record) {
    return (
      `Directors and C-level officers operating within ${(record.applicable_industries || []).join(", ")} face escalating ` +
      `scrutiny under ${record.title}. Lack of structured internal governance controls and missing statutory registers ` +
      `trigger compounding penalties, show-cause notices, and personal officer-in-default liability.`
    );
  }

  generatePlainEnglishTakeaways(record) {
    const takeaways = [];
    if (record.provisions && record.provisions.length > 0) {
      for (const p of record.provisions.slice(0, 3)) {
        takeaways.push(`**${p.section_number} (${p.section_title}):** Mandates documented controls and timely statutory filings.`);
      }
    } else {
      takeaways.push(`**Core Mandate:** ${record.title} requires rigorous statutory register maintenance.`);
    }
    if (record.penalties_summary && record.penalties_summary.length > 0) {
      takeaways.push(`**Penal Risk:** Violations trigger strict financial fines (${record.penalties_summary[0]}).`);
    }
    return takeaways;
  }

  buildComplianceChecklist(record) {
    const checklist = [];
    if (record.provisions && record.provisions.length > 0) {
      record.provisions.slice(0, 5).forEach((p, idx) => {
        checklist.push({
          step: String(idx + 1),
          action_item: `Implement operational controls for ${p.section_number} - ${p.section_title}`,
          assigned_role: "Legal & Compliance Head",
          frequency: "Quarterly",
          evidence_required: "Signed Statutory Register / Audit Certificate"
        });
      });
    } else {
      checklist.push(
        {
          step: "1",
          action_item: `Conduct statutory applicability review for ${record.title}`,
          assigned_role: "General Counsel",
          frequency: "Annual",
          evidence_required: "Legal Applicability Memo"
        },
        {
          step: "2",
          action_item: "Verify statutory registers and inspection compliance records",
          assigned_role: "Operations Head",
          frequency: "Monthly",
          evidence_required: "Challans and Filing Receipts"
        }
      );
    }
    return checklist;
  }

  generateAdvisoryFaqs(record) {
    return [
      {
        question: `Who does ${record.title} apply to?`,
        answer: `It applies to organizations operating within ${record.jurisdiction}, specifically impacting ${(record.applicable_industries || []).join(", ")} sectors under the supervision of the ${record.issuing_authority}.`
      },
      {
        question: `What are the penalties for non-compliance under ${record.title}?`,
        answer: `Violations trigger show-cause summons, compounding liabilities, and financial sanctions: ${record.penalties_summary?.slice(0, 2).join("; ") || "statutory fines and daily compounding penalties"}.`
      },
      {
        question: "How does GOVENICS help my organization comply?",
        answer: `GOVENICS provides automated statutory registers, calendar alerts, penalty risk quantification, and external audit-readiness reviews tailored for ${record.title}.`
      }
    ];
  }

  buildHtmlArticle(record, summary, impact, checklist, faqs) {
    const provRows = (record.provisions || []).slice(0, 6).map(p => `
      <tr>
        <td style="font-weight: bold; width: 25%;">${p.section_number}</td>
        <td style="width: 45%;">${p.section_title}</td>
        <td style="width: 30%;"><span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">${p.obligation_type || "Mandatory"}</span></td>
      </tr>
    `).join("");

    const checklistRows = checklist.map(c => `
      <tr>
        <td style="text-align: center; font-weight: bold;">${c.step}</td>
        <td>${c.action_item}</td>
        <td><strong>${c.assigned_role}</strong></td>
        <td>${c.frequency}</td>
      </tr>
    `).join("");

    const faqsHtml = faqs.map(f => `
      <div style="margin-bottom: 14px; padding: 12px 16px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
        <p style="margin: 0 0 6px 0; font-weight: 700; color: #1e293b;">Q: ${f.question}</p>
        <p style="margin: 0; font-size: 13.5px; color: #475569; line-height: 1.6;">${f.answer}</p>
      </div>
    `).join("");

    return `
      <!-- wp:paragraph -->
      <p class="lead" style="font-size: 16px; font-weight: 600; color: #1e293b; line-height: 1.7;">
        ${summary}
      </p>
      <!-- /wp:paragraph -->

      <!-- wp:heading {"level":2} -->
      <h2 style="color: #0f172a; margin-top: 25px;">Executive Governance & Leadership Impact</h2>
      <!-- /wp:heading -->
      <p style="color: #334155; line-height: 1.7;">${impact}</p>

      <!-- wp:heading {"level":2} -->
      <h2 style="color: #0f172a; margin-top: 25px;">Statutory Provisions & Obligation Breakdown</h2>
      <!-- /wp:heading -->
      <figure class="wp-block-table">
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
              <th style="padding: 10px;">Section</th>
              <th style="padding: 10px;">Mandate</th>
              <th style="padding: 10px;">Obligation</th>
            </tr>
          </thead>
          <tbody>
            ${provRows || '<tr><td colspan="3" style="padding: 10px;">Official compliance provisions cataloged in primary statute.</td></tr>'}
          </tbody>
        </table>
      </figure>

      <!-- wp:heading {"level":2} -->
      <h2 style="color: #0f172a; margin-top: 25px;">Recommended Compliance Action Matrix</h2>
      <!-- /wp:heading -->
      <figure class="wp-block-table">
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
              <th style="padding: 10px; width: 8%;">#</th>
              <th style="padding: 10px; width: 52%;">Operational Action Item</th>
              <th style="padding: 10px; width: 25%;">Assigned Role</th>
              <th style="padding: 10px; width: 15%;">Frequency</th>
            </tr>
          </thead>
          <tbody>
            ${checklistRows}
          </tbody>
        </table>
      </figure>

      <!-- wp:heading {"level":2} -->
      <h2 style="color: #0f172a; margin-top: 25px;">Frequently Asked Questions (Advisory Hub)</h2>
      <!-- /wp:heading -->
      ${faqsHtml}

      <div style="margin-top: 35px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; text-align: center;">
        <h3 style="margin-top: 0; color: #1e40af;">Ensure Zero-Penalty Compliance with GOVENICS GRC</h3>
        <p style="margin: 8px 0 16px 0; color: #1e3a8a; font-size: 14px;">Connect with our senior regulatory practitioners to conduct an audit gap assessment and automate statutory filings.</p>
        <a href="https://govenics.com/contact" style="background: #2563eb; color: #ffffff; padding: 10px 22px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 13px; display: inline-block;">Schedule Advisory Strategy Session</a>
      </div>
    `;
  }

  generateLinkedinSnippets(record, takeaways) {
    return [
      `🚨 Regulatory Advisory: ${record.title}\n\n` +
      `Enforced by the ${record.issuing_authority}, this mandate directly impacts leadership teams across ${(record.applicable_industries || []).slice(0, 3).join(", ")}.\n\n` +
      `Key Takeaways for Directors & GRC Officers:\n` +
      takeaways.slice(0, 3).map(t => `• ${t}`).join("\n") + "\n\n" +
      `👉 Access the complete compliance guide & checklist: https://govenics.com/e-library\n\n` +
      `#Compliance #GRC #RegulatoryCompliance #EnterpriseRisk #Governance #GOVENICS`,

      `Boardroom Scrutiny Alert: ${record.title}\n\n` +
      `Non-compliance with statutory provisions creates immediate financial and director penal exposure.\n\n` +
      `GOVENICS has released an operational checklist covering required statutory forms, filing frequencies, and verification protocols.\n\n` +
      `https://govenics.com/e-library\n\n` +
      `#CorporateGovernance #LegalCompliance #StatutoryAudits`
    ];
  }

  generateSeoMetadata(record) {
    const slug = record.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
    return {
      focus_keyword: `${record.title} compliance`,
      meta_title: `${record.title.slice(0, 45)} | GOVENICS GRC Advisory`,
      meta_description: `Comprehensive compliance guide for ${record.title}. Review statutory provisions, penalties, and audit checklists.`,
      slug,
      estimated_reading_time_minutes: 4,
      canonical_url: `https://govenics.com/e-library/${slug}`
    };
  }

  generateKgElements(record) {
    return {
      node: {
        id: `ACT_${record.content_id}`,
        label: record.title,
        type: "Regulatory_Act",
        properties: {
          issuing_authority: record.issuing_authority,
          jurisdiction: record.jurisdiction,
          document_type: record.document_type
        }
      }
    };
  }

  async publishToWordPress(asset) {
    const wpUrl = process.env.WORDPRESS_API_URL || "https://cms.govenics.com/wp-json/wp/v2";
    const username = process.env.WORDPRESS_USERNAME || "gracejane";
    const rawPass = process.env.WORDPRESS_APP_PASSWORD || "H1Pv OZk6 makj fefb OLk4 QWe4";
    const password = rawPass.replace(/\s+/g, "");
    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    const payload = {
      title: asset.title,
      content: asset.html_article,
      status: "publish",
      excerpt: asset.executive_summary.slice(0, 250) + "...",
      slug: asset.seo_metadata.slug
    };

    const res = await fetch(`${wpUrl}/posts`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`WordPress API HTTP ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    return {
      wp_post_id: data.id,
      url: data.link
    };
  }

  persistAsset(asset) {
    try {
      const target = path.join(this.nurturedDir, `${asset.asset_id}.json`);
      fs.writeFileSync(target, JSON.stringify(asset, null, 2), "utf8");
    } catch (err) {
      console.warn("[ContentNurturingService] Asset persistence warning:", err.message);
    }
  }
}

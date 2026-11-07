"""
GOVENICS GRC — Content Nurturing Agent
Transforms extracted compliance content and statutory provisions into
executive-ready, multi-channel GRC intelligence:
1. Executive Plain-English Summaries & Boardroom Advisory
2. Statutory Action Checklists & Control Matrices
3. Conversational AI Q&A Pairs for the GRC Knowledge Hub
4. Rich WordPress CMS Articles, E-Library Guides & Blog Posts
5. High-Impact Thought Leadership & LinkedIn Snippets
6. Automated Publishing to WordPress CMS & Knowledge Graph Ingestion
"""

from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
import json
import logging
from pathlib import Path
import re
from typing import Dict, Any, List, Optional

try:
    from config import REPORTS_DIR, GOVENICS_OFFERINGS, GOVENICS_INDUSTRIES
    from integrations.cms_api_service import CMSAPIService
    from agents.content_extraction_agent import ExtractedContentRecord
except ImportError:
    import sys
    sys.path.append(str(Path(__file__).resolve().parent.parent))
    from config import REPORTS_DIR, GOVENICS_OFFERINGS, GOVENICS_INDUSTRIES
    from integrations.cms_api_service import CMSAPIService
    from agents.content_extraction_agent import ExtractedContentRecord

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
log = logging.getLogger("content_nurturing_agent")

NURTURED_CONTENT_DIR = REPORTS_DIR / "nurtured_content"
NURTURED_CONTENT_DIR.mkdir(parents=True, exist_ok=True)


# ─── Nurtured Asset Schema ───────────────────────────────────────────────────

@dataclass
class NurturedContentAsset:
    asset_id: str
    source_content_id: str
    title: str
    document_type: str
    category_slug: str
    issuing_authority: str
    jurisdiction: str
    executive_summary: str
    boardroom_impact: str
    plain_english_takeaways: List[str]
    compliance_checklist: List[Dict[str, str]]
    advisory_faqs: List[Dict[str, str]]
    html_article: str
    linkedin_snippets: List[str]
    seo_metadata: Dict[str, Any]
    target_offerings: List[str]
    target_industries: List[str]
    knowledge_graph_elements: Dict[str, Any]
    wp_post_id: Optional[int] = None
    wp_post_url: Optional[str] = None
    publishing_status: str = "DRAFT"  # DRAFT | STAGED | PUBLISHED
    nurtured_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


# ─── Content Nurturing Agent Implementation ───────────────────────────────────

class ContentNurturingAgent:
    """
    Autonomous Content Nurturing Agent.
    Enriches, reformulates, and publishes compliance intelligence for enterprise stakeholders.
    """

    def __init__(self, auto_publish_to_cms: bool = False):
        self.cms_service = CMSAPIService()
        self.auto_publish = auto_publish_to_cms
        self.output_dir = NURTURED_CONTENT_DIR

    def nurture_content(self, extracted: ExtractedContentRecord, publish: Optional[bool] = None) -> NurturedContentAsset:
        """Nurtures an extracted content record into an enterprise-ready asset."""
        log.info("[ContentNurturingAgent] Nurturing content: %s (%s)", extracted.title, extracted.content_id)
        should_publish = self.auto_publish if publish is None else publish

        asset_id = f"NURT-{extracted.content_id.replace('EXT-', '')}"
        category_slug = self._resolve_category_slug(extracted.document_type)

        # 1. Executive Summary & Plain-English Translation
        exec_summary = self._synthesize_executive_summary(extracted)
        boardroom_impact = self._generate_boardroom_impact(extracted)
        plain_takeaways = self._generate_plain_english_takeaways(extracted)

        # 2. Actionable Compliance Checklist & Control Matrix
        checklist = self._build_compliance_checklist(extracted)

        # 3. Advisory Q&A / FAQs for AI Knowledge Retrieval Hub
        faqs = self._generate_advisory_faqs(extracted)

        # 4. Professional HTML Article for WordPress CMS & E-Library Portal
        html_article = self._build_html_article(extracted, exec_summary, boardroom_impact, checklist, faqs)

        # 5. Thought Leadership & Social / LinkedIn Snippets
        linkedin_snippets = self._generate_linkedin_snippets(extracted, plain_takeaways)

        # 6. SEO & Publication Metadata
        seo_meta = self._generate_seo_metadata(extracted, exec_summary)

        # 7. Knowledge Graph Nodes & Edges
        kg_elements = self._generate_kg_elements(extracted)

        asset = NurturedContentAsset(
            asset_id=asset_id,
            source_content_id=extracted.content_id,
            title=extracted.title,
            document_type=extracted.document_type,
            category_slug=category_slug,
            issuing_authority=extracted.issuing_authority,
            jurisdiction=extracted.jurisdiction,
            executive_summary=exec_summary,
            boardroom_impact=boardroom_impact,
            plain_english_takeaways=plain_takeaways,
            compliance_checklist=checklist,
            advisory_faqs=faqs,
            html_article=html_article,
            linkedin_snippets=linkedin_snippets,
            seo_metadata=seo_meta,
            target_offerings=extracted.applicable_offerings,
            target_industries=extracted.applicable_industries,
            knowledge_graph_elements=kg_elements,
            publishing_status="STAGED"
        )

        # 8. CMS Ingestion (if requested)
        if should_publish:
            try:
                self.publish_to_cms(asset)
            except Exception as e:
                log.error("[ContentNurturingAgent] CMS publication error: %s", e)
                asset.publishing_status = "PUBLISH_FAILED"

        # 9. Persist Nurtured Artifact
        self._persist_asset(asset)
        return asset

    # ── CMS Publisher ─────────────────────────────────────────────────────────

    def publish_to_cms(self, asset: NurturedContentAsset) -> Dict[str, Any]:
        """Publishes the nurtured asset directly to WordPress CMS."""
        log.info("[ContentNurturingAgent] Publishing asset to WordPress CMS: %s", asset.title)

        cat_id = self.cms_service.ensure_category(
            asset.document_type.title(),
            asset.category_slug
        )

        tag_ids = []
        for off in asset.target_offerings[:2]:
            tag_slug = off.lower().replace(" ", "-").replace("&", "and")
            t_id = self.cms_service.ensure_tag(off, tag_slug)
            if t_id:
                tag_ids.append(t_id)

        for ind in asset.target_industries[:2]:
            tag_slug = ind.lower().replace(" ", "-").replace("&", "and")
            t_id = self.cms_service.ensure_tag(ind, tag_slug)
            if t_id:
                tag_ids.append(t_id)

        post_payload = {
            "title": asset.title,
            "content": asset.html_article,
            "status": "publish",
            "categories": [cat_id],
            "tags": tag_ids,
            "excerpt": asset.executive_summary[:280] + "...",
            "slug": asset.seo_metadata.get("slug", re.sub(r"[^a-z0-9]+", "-", asset.title.lower()).strip("-"))
        }

        # Check existing
        existing = self.cms_service.find_post_by_source_id(asset.source_content_id)
        if existing:
            post_id = existing["id"]
            resp = self.cms_service.session.post(f"{self.cms_service.base_url}/posts/{post_id}", json=post_payload, timeout=15)
        else:
            resp = self.cms_service.session.post(f"{self.cms_service.base_url}/posts", json=post_payload, timeout=15)

        if resp.status_code in (200, 210, 201):
            data = resp.json()
            asset.wp_post_id = data.get("id")
            asset.wp_post_url = data.get("link")
            asset.publishing_status = "PUBLISHED"
            log.info("[ContentNurturingAgent] Published successfully! Post ID: %s, URL: %s", asset.wp_post_id, asset.wp_post_url)
            self._persist_asset(asset)
            return {"success": True, "wp_post_id": asset.wp_post_id, "url": asset.wp_post_url}
        else:
            raise RuntimeError(f"WordPress API error: {resp.status_code} - {resp.text}")

    # ── Nurturing Generators ──────────────────────────────────────────────────

    def _resolve_category_slug(self, doc_type: str) -> str:
        mapping = {
            "Acts": "acts",
            "Regulations": "regulations",
            "Notifications": "notifications",
            "E-Books": "ebooks",
            "Articles & Blogs": "articles-blogs",
            "Checklists": "checklists"
        }
        return mapping.get(doc_type, "articles-blogs")

    def _synthesize_executive_summary(self, record: ExtractedContentRecord) -> str:
        lines = [
            f"This authoritative executive briefing analyzes **{record.title}**, enforced by the **{record.issuing_authority}** across **{record.jurisdiction}**.",
            f"The statutory framework establishes key operational requirements across {', '.join(record.applicable_offerings)}."
        ]
        if record.penalties_summary:
            lines.append(f"Non-compliance introduces direct penal liabilities including: {'; '.join(record.penalties_summary[:2])}.")
        return " ".join(lines)

    def _generate_boardroom_impact(self, record: ExtractedContentRecord) -> str:
        return (
            f"Directors and C-level officers operating within {', '.join(record.applicable_industries)} face escalating "
            f"scrutiny under {record.title}. Lack of structured internal governance controls and missing statutory registers "
            f"trigger compounding penalties, show-cause notices, and personal officer-in-default liability."
        )

    def _generate_plain_english_takeaways(self, record: ExtractedContentRecord) -> List[str]:
        takeaways = []
        if record.provisions:
            for p in record.provisions[:4]:
                sec = p.get("section_number", "Statutory Rule")
                title = p.get("section_title", "Provision")
                takeaways.append(f"**{sec} ({title}):** Mandates documented compliance controls and proactive reporting.")
        else:
            takeaways.append(f"**Core Mandate:** {record.title} requires rigorous statutory register maintenance.")
            takeaways.append(f"**Jurisdiction:** Enforced across {record.jurisdiction} at the {record.government_level} tier.")

        if record.penalties_summary:
            takeaways.append(f"**Penal Risk:** Violations trigger strict financial penalties ({record.penalties_summary[0]}).")
        return takeaways

    def _build_compliance_checklist(self, record: ExtractedContentRecord) -> List[Dict[str, str]]:
        checklist = []
        if record.provisions:
            for idx, p in enumerate(record.provisions[:6], start=1):
                checklist.append({
                    "step": str(idx),
                    "action_item": f"Implement operational controls for {p.get('section_number', 'Provision')} - {p.get('section_title', 'Compliance Item')}",
                    "assigned_role": "Legal & Compliance Head",
                    "frequency": p.get("filing_frequency") or "Quarterly",
                    "evidence_required": "Signed Inspection Register / Audit Certificate"
                })
        else:
            checklist.append({
                "step": "1",
                "action_item": f"Review applicability of {record.title} across operating facilities",
                "assigned_role": "General Counsel / CFO",
                "frequency": "Annual",
                "evidence_required": "Applicability Assessment Matrix"
            })
            checklist.append({
                "step": "2",
                "action_item": "Validate statutory registers and filing receipts against statutory deadlines",
                "assigned_role": "Operations Manager",
                "frequency": "Monthly",
                "evidence_required": "Filing Ack Copies & Challans"
            })
        return checklist

    def _generate_advisory_faqs(self, record: ExtractedContentRecord) -> List[Dict[str, str]]:
        return [
            {
                "question": f"Who does {record.title} apply to?",
                "answer": f"It applies to organizations operating within {record.jurisdiction}, specifically impacting the {', '.join(record.applicable_industries)} sectors under the supervision of the {record.issuing_authority}."
            },
            {
                "question": f"What are the consequences of non-compliance under {record.title}?",
                "answer": f"Violations can lead to formal statutory inspection, show-cause notices, compounding proceedings, and strict penalties: {'; '.join(record.penalties_summary[:2]) if record.penalties_summary else 'statutory financial fines and compounding liabilities'}."
            },
            {
                "question": f"How can GOVENICS help my organization comply?",
                "answer": f"GOVENICS provides automated statutory registers, calendar alerts, penalty risk quantification, and external audit-readiness reviews tailored for {record.title}."
            }
        ]

    def _build_html_article(
        self,
        record: ExtractedContentRecord,
        summary: str,
        impact: str,
        checklist: List[Dict[str, str]],
        faqs: List[Dict[str, str]]
    ) -> str:
        """Constructs an executive, audit-grade HTML publication for WordPress CMS."""

        # Provisions Rows
        prov_rows = ""
        for p in record.provisions[:8]:
            prov_rows += f"""
            <tr>
                <td style="font-weight: bold; width: 25%;">{p.get('section_number', 'Section')}</td>
                <td style="width: 35%;">{p.get('section_title', 'Mandate')}</td>
                <td style="width: 20%;"><span class="badge" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">{p.get('obligation_type', 'Mandatory')}</span></td>
                <td style="width: 20%;">{p.get('filing_frequency') or 'Event-Driven'}</td>
            </tr>
            """

        # Checklist Rows
        checklist_rows = ""
        for item in checklist:
            checklist_rows += f"""
            <tr>
                <td style="text-align: center; font-weight: bold;">{item['step']}</td>
                <td>{item['action_item']}</td>
                <td><strong>{item['assigned_role']}</strong></td>
                <td>{item['frequency']}</td>
                <td style="font-size: 12px; color: #475569;">{item['evidence_required']}</td>
            </tr>
            """

        # FAQs
        faq_html = ""
        for faq in faqs:
            faq_html += f"""
            <div style="margin-bottom: 16px; padding: 12px 16px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-weight: 700; color: #1e293b;">Q: {faq['question']}</p>
                <p style="margin: 0; font-size: 13.5px; color: #475569; line-height: 1.6;">{faq['answer']}</p>
            </div>
            """

        html = f"""
        <!-- wp:paragraph -->
        <p class="lead" style="font-size: 16px; font-weight: 600; color: #1e293b; line-height: 1.7;">
            {summary}
        </p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {{"level":2}} -->
        <h2 style="color: #0f172a; margin-top: 30px;">Executive Governance & Leadership Impact</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph -->
        <p style="color: #334155; line-height: 1.7;">{impact}</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {{"level":2}} -->
        <h2 style="color: #0f172a; margin-top: 30px;">Statutory Provisions & Obligation Breakdown</h2>
        <!-- /wp:heading -->

        <!-- wp:table -->
        <figure class="wp-block-table">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
                        <th style="padding: 10px;">Section / Rule</th>
                        <th style="padding: 10px;">Statutory Heading</th>
                        <th style="padding: 10px;">Obligation</th>
                        <th style="padding: 10px;">Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {prov_rows if prov_rows else '<tr><td colspan="4" style="padding: 10px;">Official compliance provisions cataloged in primary statute.</td></tr>'}
                </tbody>
            </table>
        </figure>
        <!-- /wp:table -->

        <!-- wp:heading {{"level":2}} -->
        <h2 style="color: #0f172a; margin-top: 30px;">Recommended Compliance Action Matrix</h2>
        <!-- /wp:heading -->

        <!-- wp:table -->
        <figure class="wp-block-table">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
                        <th style="padding: 10px; width: 6%;">#</th>
                        <th style="padding: 10px; width: 44%;">Operational Action Item</th>
                        <th style="padding: 10px; width: 18%;">Assigned Lead</th>
                        <th style="padding: 10px; width: 14%;">Frequency</th>
                        <th style="padding: 10px; width: 18%;">Required Evidence</th>
                    </tr>
                </thead>
                <tbody>
                    {checklist_rows}
                </tbody>
            </table>
        </figure>
        <!-- /wp:table -->

        <!-- wp:heading {{"level":2}} -->
        <h2 style="color: #0f172a; margin-top: 30px;">Frequently Asked Questions (Advisory Hub)</h2>
        <!-- /wp:heading -->

        {faq_html}

        <!-- wp:separator -->
        <hr class="wp-block-separator has-alpha-channel-opacity" style="margin: 35px 0;"/>
        <!-- /wp:separator -->

        <!-- wp:paragraph -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; text-align: center;">
            <h3 style="margin-top: 0; color: #1e40af;">Ensure Zero-Penalty Compliance with GOVENICS GRC</h3>
            <p style="margin: 8px 0 16px 0; color: #1e3a8a; font-size: 14px;">Connect with our senior regulatory practitioners to conduct an audit gap assessment and automate statutory filings.</p>
            <a href="https://govenics.com/contact" style="background: #2563eb; color: #ffffff; padding: 10px 22px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 13px; display: inline-block;">Schedule Advisory Strategy Session</a>
        </div>
        <!-- /wp:paragraph -->
        """
        return html

    def _generate_linkedin_snippets(self, record: ExtractedContentRecord, takeaways: List[str]) -> List[str]:
        post_1 = (
            f"🚨 Regulatory Update: {record.title}\n\n"
            f"Enforced by the {record.issuing_authority}, this mandate directly impacts leadership teams across {', '.join(record.applicable_industries[:3])}.\n\n"
            f"Key Takeaways for Directors & GRC Officers:\n"
            f"{chr(10).join(['• ' + t for t in takeaways[:3]])}\n\n"
            f"Are your internal statutory registers and audit papers fully defensible?\n\n"
            f"👉 Access the complete compliance guide & checklist: https://govenics.com/e-library\n\n"
            f"#Compliance #GRC #RegulatoryCompliance #EnterpriseRisk #Governance #GOVENICS"
        )

        post_2 = (
            f"Boardroom Scrutiny Alert: {record.title}\n\n"
            f"Non-compliance with statutory provisions is no longer just an administrative oversight—it creates immediate financial and director penal exposure.\n\n"
            f"GOVENICS has released an operational checklist covering required statutory forms, filing frequencies, and verification protocols.\n\n"
            f"Read the full advisory on GOVENICS GRC:\n"
            f"https://govenics.com/e-library\n\n"
            f"#CorporateGovernance #LegalCompliance #StatutoryAudits"
        )
        return [post_1, post_2]

    def _generate_seo_metadata(self, record: ExtractedContentRecord, summary: str) -> Dict[str, Any]:
        clean_slug = re.sub(r"[^a-z0-9]+", "-", record.title.lower()).strip("-")
        return {
            "focus_keyword": f"{record.title} compliance",
            "meta_title": f"{record.title[:45]} | GOVENICS GRC Advisory",
            "meta_description": f"Comprehensive compliance guide for {record.title}. Review statutory provisions, penalties, and audit checklists.",
            "slug": clean_slug[:60],
            "estimated_reading_time_minutes": max(3, len(record.clean_text.split()) // 200),
            "canonical_url": f"https://govenics.com/e-library/{clean_slug[:60]}"
        }

    def _generate_kg_elements(self, record: ExtractedContentRecord) -> Dict[str, Any]:
        node = {
            "id": f"ACT_{record.content_id}",
            "label": record.title,
            "type": "Regulatory_Act",
            "properties": {
                "issuing_authority": record.issuing_authority,
                "jurisdiction": record.jurisdiction,
                "document_type": record.document_type
            }
        }
        edges = []
        for off in record.applicable_offerings:
            edges.append({
                "source": node["id"],
                "target": f"OFF_{off.upper().replace(' ', '_')}",
                "relation": "ALIGNED_WITH_OFFERING"
            })
        for ind in record.applicable_industries:
            edges.append({
                "source": node["id"],
                "target": f"IND_{ind.upper().replace(' ', '_')}",
                "relation": "MANDATED_FOR_INDUSTRY"
            })
        return {"nodes": [node], "edges": edges}

    def _persist_asset(self, asset: NurturedContentAsset):
        target_file = self.output_dir / f"{asset.asset_id}.json"
        try:
            target_file.write_text(json.dumps(asset.to_dict(), indent=2, ensure_ascii=False), encoding="utf-8")
            log.info("[ContentNurturingAgent] Nurtured asset persisted: %s", target_file.name)
        except Exception as e:
            log.error("[ContentNurturingAgent] Failed to persist %s: %s", target_file.name, e)


# ─── Standalone CLI Helper ───────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    from agents.content_extraction_agent import ContentExtractionAgent

    parser = argparse.ArgumentParser(description="GOVENICS Content Nurturing Agent CLI")
    parser.add_argument("--file", help="Path to an extracted JSON record or source file")
    parser.add_argument("--publish", action="store_true", help="Publish directly to WordPress CMS")
    args = parser.parse_args()

    extractor = ContentExtractionAgent()
    nurturer = ContentNurturingAgent(auto_publish_to_cms=args.publish)

    if args.file:
        path = Path(args.file)
        if path.suffix.lower() == ".json":
            data = json.loads(path.read_text(encoding="utf-8"))
            extracted_rec = ExtractedContentRecord(**data)
        else:
            extracted_rec = extractor.extract_from_file(str(path))

        asset = nurturer.nurture_content(extracted_rec, publish=args.publish)
        print(f"Nurtured: {asset.title} ({asset.asset_id})")
        print(f"Publishing Status: {asset.publishing_status}")
    else:
        # Self-test demonstration
        demo_text = """
        THE FACTORIES ACT, 1948
        Ministry of Labour & Employment

        Section 6 - Approval, licensing and registration of factories
        The State Government may make rules requiring the submission of plans of any class of factories. No factory shall be operated without valid license.

        Section 7A - General duties of the occupier
        Every occupier shall ensure, so far as is reasonably practicable, the health, safety and welfare of all workers while they are at work in the factory.

        Section 92 - General penalty for offences
        If in, or in respect of, any factory there is any contravention of any of the provisions of this Act, the occupier and manager of the factory shall each be guilty of an offence and punishable with imprisonment for a term which may extend to two years or with fine which may extend to one lakh rupees.
        """
        rec = extractor.extract_from_text(demo_text, title="The Factories Act, 1948")
        asset = nurturer.nurture_content(rec, publish=False)
        print(f"Self-test success: Nurtured {asset.title} ({asset.asset_id})")
        print(f"Checklist items generated: {len(asset.compliance_checklist)}")
        print(f"Advisory FAQs generated: {len(asset.advisory_faqs)}")
        print(f"LinkedIn snippets generated: {len(asset.linkedin_snippets)}")

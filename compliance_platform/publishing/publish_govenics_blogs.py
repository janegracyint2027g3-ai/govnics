"""
GOVENICS Blogs, Articles & E-Books Ingestion & Publisher
=========================================================
Ingests all 13 Executive E-Books and 78 In-Depth Practice Articles from
the Govenics_Blogs repository (https://github.com/janegracyint2027g3-ai/Govenics_Blogs),
uploads the 13 E-Book PDFs to WordPress Media, and publishes all 91 structured records
into the WordPress CMS E-Library with full metadata, taxonomies, and cross-references.

Idempotent: uses slug-based deduplication so running twice updates rather than duplicates.
"""

import os
import sys
import json
import re
import logging
from pathlib import Path
from datetime import datetime, timezone
from bs4 import BeautifulSoup
import requests

# Set path for importing compliance_platform modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from integrations.cms_api_service import CMSAPIService

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(str(Path(__file__).parent.parent / "reports" / "publish_govenics_blogs.log"), mode="w", encoding="utf-8")
    ]
)
log = logging.getLogger("govenics_blogs_publisher")

# Paths
SCRIPT_DIR = Path(__file__).parent
COMPLIANCE_ROOT = SCRIPT_DIR.parent
PROJECT_ROOT = COMPLIANCE_ROOT.parent

# Govenics_Blogs location (cloned in parent directory or within project)
GOVENICS_BLOGS_ROOT = PROJECT_ROOT.parent / "Govenics_Blogs"
if not GOVENICS_BLOGS_ROOT.exists():
    GOVENICS_BLOGS_ROOT = PROJECT_ROOT / "Govenics_Blogs"

MAPPING_OUTPUT = COMPLIANCE_ROOT / "reports" / "govenics_blogs_cms_mapping.json"


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text[:80]


# ─── 1. Media Upload Service ──────────────────────────────────────────────────

def upload_or_get_media(cms: CMSAPIService, pdf_path: Path, filename: str) -> str:
    """
    Checks if PDF is already in WP media library; if not, uploads it.
    Returns source_url of the media item.
    """
    # Check existing media by search/title
    clean_name = filename.replace(".pdf", "")
    try:
        r_search = cms.session.get(f"{cms.base_url}/media?search={clean_name}&per_page=10", timeout=10)
        if r_search.status_code == 200 and r_search.json():
            for m in r_search.json():
                source_url = m.get("source_url", "")
                if clean_name in source_url:
                    log.info("  Media already exists: %s", source_url)
                    return source_url
    except Exception as exc:
        log.warning("  Media search error: %s", exc)

    # Upload PDF
    log.info("  Uploading PDF: %s", filename)
    auth_header = cms.session.headers["Authorization"]
    with open(pdf_path, "rb") as f:
        headers = {
            "Authorization": auth_header,
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Type": "application/pdf"
        }
        r_up = requests.post(f"{cms.base_url}/media", headers=headers, data=f, timeout=30)
        if r_up.status_code in (200, 201):
            src = r_up.json().get("source_url", "")
            log.info("  ✓ Uploaded: %s", src)
            return src
        else:
            log.error("  ✗ Media upload failed: %s %s", r_up.status_code, r_up.text[:200])
            return ""


# ─── 2. E-Book Publisher ──────────────────────────────────────────────────────

def build_ebook_content(ebook: dict, reader_html: str, pdf_url: str) -> str:
    """Constructs complete Gutenberg/HTML for an E-Book."""
    chapters_html = ""
    for ch in ebook.get("chapters", []):
        ch_title = ch[0] if isinstance(ch, list) and len(ch) > 0 else ""
        ch_desc = ch[1] if isinstance(ch, list) and len(ch) > 1 else ""
        chapters_html += f"""
        <li>
            <strong>{ch_title}</strong>: {ch_desc}
        </li>
        """

    framework_html = ""
    for step in ebook.get("framework_steps", []):
        framework_html += f"<li>{step}</li>"

    pdf_button = ""
    if pdf_url:
        pdf_button = f"""
        <!-- wp:buttons -->
        <div class="wp-block-buttons" style="margin: 24px 0;">
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="{pdf_url}" target="_blank" rel="noopener noreferrer" style="background-color:#1D4ED8;color:#FFFFFF;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">
                    📥 Download Full E-Book PDF ({ebook.get('page_count', 36)} Pages)
                </a>
            </div>
        </div>
        <!-- /wp:buttons -->
        """

    content = f"""
    <!-- wp:paragraph -->
    <div class="govenics-ebook-hero" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #F8FAFC; padding: 32px; border-radius: 12px; margin-bottom: 24px;">
        <span style="color:#60A5FA; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">GOVENICS EXECUTIVE RESEARCH COMPENDIUM • {ebook.get('version', '2026.1')} EDITION</span>
        <h1 style="color:#FFFFFF; font-size:28px; margin-top:8px; margin-bottom:8px;">{ebook.get('title')}</h1>
        <p style="color:#CBD5E1; font-size:16px; margin-bottom:16px;">{ebook.get('subtitle')}</p>
        <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:13px; color:#94A3B8; border-top:1px solid #334155; padding-top:16px;">
            <div><strong>Practice:</strong> {ebook.get('offering_name')}</div>
            <div><strong>Target:</strong> {ebook.get('target_audience')}</div>
            <div><strong>Industry:</strong> {ebook.get('industry')}</div>
            <div><strong>Extent:</strong> {ebook.get('page_count', 36)} Pages</div>
            <div><strong>Ref ID:</strong> {ebook.get('id')}</div>
        </div>
    </div>
    <!-- /wp:paragraph -->

    {pdf_button}

    <!-- wp:heading -->
    <h2>Executive Summary & Board Context</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph -->
    <p class="lead">{ebook.get('description')}</p>
    <!-- /wp:paragraph -->

    <!-- wp:table -->
    <figure class="wp-block-table"><table><tbody>
        <tr><td><strong>Document ID</strong></td><td>{ebook.get('id')}</td></tr>
        <tr><td><strong>Document Type</strong></td><td>Executive E-Book</td></tr>
        <tr><td><strong>Practice Area</strong></td><td>{ebook.get('offering_name')}</td></tr>
        <tr><td><strong>Target Audience</strong></td><td>{ebook.get('target_audience')}</td></tr>
        <tr><td><strong>Applicable Industry</strong></td><td>{ebook.get('industry')}</td></tr>
        <tr><td><strong>Print Extent</strong></td><td>{ebook.get('page_count')} Pages</td></tr>
        <tr><td><strong>Edition / Version</strong></td><td>{ebook.get('version')}</td></tr>
        <tr><td><strong>Publication Date</strong></td><td>{ebook.get('publication_date')}</td></tr>
        <tr><td><strong>PDF Download</strong></td><td><a href="{pdf_url}" target="_blank" rel="noopener">Direct PDF Asset</a></td></tr>
        <tr><td><strong>Issuing Entity</strong></td><td>GOVENICS GRC Consulting (A Division of ISI Group, Est. 1985)</td></tr>
    </tbody></table></figure>
    <!-- /wp:table -->

    <!-- wp:heading -->
    <h2>Comprehensive Chapters & Strategic Analysis</h2>
    <!-- /wp:heading -->
    <!-- wp:list -->
    <ol style="line-height: 1.8;">
        {chapters_html}
    </ol>
    <!-- /wp:list -->

    <!-- wp:heading -->
    <h2>Six-Stage Defensibility Framework</h2>
    <!-- /wp:heading -->
    <!-- wp:list -->
    <ul style="line-height: 1.8;">
        {framework_html}
    </ul>
    <!-- /wp:list -->

    {pdf_button}

    <!-- wp:paragraph -->
    <p><em>Published via GOVENICS Compliance & Knowledge Engineering Platform. © {datetime.now().year} GOVENICS GRC Consulting. All rights reserved.</em></p>
    <!-- /wp:paragraph -->
    """
    return content.strip()


def publish_ebooks(cms: CMSAPIService, blogs_root: Path, cat_id_ebooks: int) -> list:
    """Publishes all 13 E-Books."""
    ebooks_json_path = blogs_root / "data" / "ebooks.json"
    if not ebooks_json_path.exists():
        log.error("ebooks.json not found at %s", ebooks_json_path)
        return []

    ebooks = json.loads(ebooks_json_path.read_text(encoding="utf-8"))
    log.info("── Publishing %d E-Books ──────────────────────────────", len(ebooks))

    results = []
    for i, eb in enumerate(ebooks, start=1):
        slug = eb["slug"]
        title = f"[E-BOOK] {eb['title']}"
        wp_slug = f"ebook-{slug}"
        pdf_path = blogs_root / "assets" / "pdfs" / f"{slug}.pdf"

        log.info("[%d/%d] Processing E-Book: %s", i, len(ebooks), eb["title"])

        # 1. Upload or retrieve PDF
        pdf_url = ""
        if pdf_path.exists():
            pdf_url = upload_or_get_media(cms, pdf_path, f"{slug}.pdf")

        # 2. Extract HTML reader if available
        html_file = blogs_root / "ebooks" / f"{slug}.html"
        reader_html = ""
        if html_file.exists():
            soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "html.parser")
            reader = soup.find("div", class_="reader-container") or soup.find("main")
            if reader:
                reader_html = str(reader)

        # 3. Build WP Content
        content_html = build_ebook_content(eb, reader_html, pdf_url)

        # 4. Tags
        tags = [
            cms.ensure_tag(eb["offering_name"], slugify(eb["offering_name"])),
            cms.ensure_tag(eb["industry"], slugify(eb["industry"])),
            cms.ensure_tag("Executive E-Book", "executive-ebook"),
        ]
        tags = [t for t in tags if t > 0]

        # 5. Check existing post by slug
        r_check = cms.session.get(f"{cms.base_url}/posts?slug={wp_slug}&status=any", timeout=10)
        existing_id = None
        if r_check.status_code == 200 and r_check.json():
            existing_id = r_check.json()[0]["id"]

        post_data = {
            "title": title,
            "content": content_html,
            "status": "publish",
            "slug": wp_slug,
            "categories": [cat_id_ebooks],
            "tags": tags,
            "excerpt": f"{eb.get('subtitle', '')} — {eb.get('description', '')[:250]}",
        }

        if existing_id:
            r = cms.session.put(f"{cms.base_url}/posts/{existing_id}", json=post_data, timeout=20)
            action = "updated"
            wp_id = existing_id
        else:
            r = cms.session.post(f"{cms.base_url}/posts", json=post_data, timeout=20)
            action = "created"
            wp_id = r.json().get("id") if r.status_code in (200, 201) else None

        success = r.status_code in (200, 201)
        if success:
            log.info("  ✓ %s E-Book wp_id=%s — %s", action.upper(), wp_id, title)
        else:
            log.error("  ✗ Error publishing E-Book %s: HTTP %s %s", slug, r.status_code, r.text[:200])

        results.append({
            "type": "ebook",
            "document_id": eb["id"],
            "title": title,
            "slug": wp_slug,
            "wp_id": wp_id,
            "action": action if success else "error",
            "pdf_url": pdf_url,
            "category": "E-books",
            "offering": eb["offering_name"],
            "industry": eb["industry"],
        })

    return results


# ─── 3. Articles Publisher ───────────────────────────────────────────────────

def build_article_content(meta: dict, body_html: str) -> str:
    """Builds complete Gutenberg/HTML for a Practice Briefing / Article."""
    meta_table = f"""
    <!-- wp:table -->
    <figure class="wp-block-table"><table><tbody>
        <tr><td><strong>Article Reference ID</strong></td><td>{meta.get('blog_id')}</td></tr>
        <tr><td><strong>Practice Area</strong></td><td>{meta.get('offering_name')}</td></tr>
        <tr><td><strong>Applicable Industry</strong></td><td>{meta.get('industry')}</td></tr>
        <tr><td><strong>Content Angle</strong></td><td>{meta.get('angle_name')}</td></tr>
        <tr><td><strong>Target Persona</strong></td><td>{meta.get('target_persona')}</td></tr>
        <tr><td><strong>Lead Author</strong></td><td>{meta.get('author')}, {meta.get('author_title')}</td></tr>
        <tr><td><strong>Reading Time</strong></td><td>{meta.get('reading_time')}</td></tr>
        <tr><td><strong>Applicable Frameworks</strong></td><td>{meta.get('frameworks')}</td></tr>
        <tr><td><strong>Publication Date</strong></td><td>{meta.get('publication_date')}</td></tr>
        <tr><td><strong>Issuing Authority</strong></td><td>GOVENICS GRC Consulting (A Division of ISI Group, Est. 1985)</td></tr>
    </tbody></table></figure>
    <!-- /wp:table -->
    """

    content = f"""
    <!-- wp:paragraph -->
    <p class="lead" style="font-size:18px; line-height:1.6; color:#334155;"><strong>Executive Summary:</strong> {meta.get('meta_description')}</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>Article Practice Metadata</h2>
    <!-- /wp:heading -->
    {meta_table}

    <!-- wp:separator -->
    <hr class="wp-block-separator"/>
    <!-- /wp:separator -->

    {body_html}

    <!-- wp:separator -->
    <hr class="wp-block-separator"/>
    <!-- /wp:separator -->

    <!-- wp:paragraph -->
    <p><em>Published by GOVENICS GRC Consulting — A Division of ISI Group (Established 1985). Official Website: <a href="https://govenics.com" target="_blank" rel="noopener">https://govenics.com</a></em></p>
    <!-- /wp:paragraph -->
    """
    return content.strip()


def publish_articles(cms: CMSAPIService, blogs_root: Path, cat_map: dict) -> list:
    """Publishes all 78 Practice Briefings / Articles."""
    inventory_path = blogs_root / "data" / "content_inventory.json"
    if not inventory_path.exists():
        log.error("content_inventory.json not found at %s", inventory_path)
        return []

    articles = json.loads(inventory_path.read_text(encoding="utf-8"))
    log.info("── Publishing %d Practice Briefings / Articles ─────────", len(articles))

    results = []
    for i, art in enumerate(articles, start=1):
        slug = art["slug"]
        title = f"[ARTICLE] {art['title']}"
        wp_slug = f"article-{slug}"
        html_file = blogs_root / "articles" / f"{slug}.html"

        # 1. Parse article HTML body
        body_html = ""
        if html_file.exists():
            soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "html.parser")
            body_elem = soup.find("article", class_="article-body") or soup.find("article") or soup.find("main")
            if body_elem:
                # Remove unneeded elements like scripts or local back-links
                for tag in body_elem.find_all(["script", "style"]):
                    tag.decompose()
                body_html = str(body_elem)
        if not body_html:
            body_html = f"<p>{art.get('meta_description', '')}</p>"

        # 2. Build full WP Content
        content_html = build_article_content(art, body_html)

        # 3. Categories
        post_cats = [cat_map["blogs"], cat_map["articles_blogs"]]
        angle_id = art.get("angle_id", "")
        if angle_id == "checklist-assessment" and "checklists" in cat_map:
            post_cats.append(cat_map["checklists"])
        elif angle_id == "implementation-guide" and "guides" in cat_map:
            post_cats.append(cat_map["guides"])
        elif angle_id == "regulatory-updates" and "regulatory_updates" in cat_map:
            post_cats.append(cat_map["regulatory_updates"])

        post_cats = list({c for c in post_cats if c > 0})

        # 4. Tags
        tags = [
            cms.ensure_tag(art["offering_name"], slugify(art["offering_name"])),
            cms.ensure_tag(art["author"], slugify(art["author"])),
            cms.ensure_tag(art["angle_name"], slugify(art["angle_name"])),
        ]
        # Primary industry tag
        first_ind = art.get("industry", "").split(",")[0].strip()
        if first_ind:
            tags.append(cms.ensure_tag(first_ind, slugify(first_ind)))
        tags = [t for t in tags if t > 0]

        # 5. Check existing post by slug
        r_check = cms.session.get(f"{cms.base_url}/posts?slug={wp_slug}&status=any", timeout=10)
        existing_id = None
        if r_check.status_code == 200 and r_check.json():
            existing_id = r_check.json()[0]["id"]

        post_data = {
            "title": title,
            "content": content_html,
            "status": "publish",
            "slug": wp_slug,
            "categories": post_cats,
            "tags": tags,
            "excerpt": art.get("meta_description", "")[:280],
        }

        if existing_id:
            r = cms.session.put(f"{cms.base_url}/posts/{existing_id}", json=post_data, timeout=20)
            action = "updated"
            wp_id = existing_id
        else:
            r = cms.session.post(f"{cms.base_url}/posts", json=post_data, timeout=20)
            action = "created"
            wp_id = r.json().get("id") if r.status_code in (200, 201) else None

        success = r.status_code in (200, 201)
        if success:
            log.info("[%d/%d] ✓ %s wp_id=%s — %s", i, len(articles), action.upper(), wp_id, title[:70])
        else:
            log.error("[%d/%d] ✗ Error publishing %s: HTTP %s %s", i, len(articles), slug, r.status_code, r.text[:200])

        results.append({
            "type": "article",
            "document_id": art["blog_id"],
            "title": title,
            "slug": wp_slug,
            "wp_id": wp_id,
            "action": action if success else "error",
            "categories": ["Articles & Blogs", "Blogs"],
            "offering": art["offering_name"],
            "industry": first_ind,
            "author": art["author"]
        })

    return results


# ─── 4. Main Orchestration ────────────────────────────────────────────────────

def main():
    log.info("Starting GOVENICS Blogs & E-Books Ingestion Pipeline...")
    log.info("Source directory: %s", GOVENICS_BLOGS_ROOT)

    cms = CMSAPIService()
    health = cms.health_check()
    if not health.get("authenticated"):
        log.error("Authentication failed: %s", health)
        sys.exit(1)
    log.info("Authenticated to WordPress CMS as: %s", health.get("user", {}).get("name"))

    # Ensure all target categories
    cat_map = {
        "ebooks": cms.ensure_category("E-books", "ebooks"),
        "blogs": cms.ensure_category("Blogs and Articles", "blogs"),
        "articles_blogs": cms.ensure_category("Articles & Blogs", "articles-blogs"),
        "checklists": cms.ensure_category("Compliance Checklists", "checklists"),
        "guides": cms.ensure_category("Compliance Guides", "guides"),
        "regulatory_updates": cms.ensure_category("Regulatory Updates", "regulatory-updates"),
        "industry_reports": cms.ensure_category("Industry Reports", "industry-reports"),
    }
    log.info("Category IDs: %s", cat_map)

    # 1. Publish 13 E-Books + Upload PDFs
    ebook_results = publish_ebooks(cms, GOVENICS_BLOGS_ROOT, cat_map["ebooks"])

    # 2. Publish 78 Articles
    article_results = publish_articles(cms, GOVENICS_BLOGS_ROOT, cat_map)

    # 3. Save detailed mapping report
    all_results = ebook_results + article_results
    stats = {
        "total_items": len(all_results),
        "ebooks_published": len(ebook_results),
        "articles_published": len(article_results),
        "created": sum(1 for r in all_results if r["action"] == "created"),
        "updated": sum(1 for r in all_results if r["action"] == "updated"),
        "errors": sum(1 for r in all_results if r["action"] == "error")
    }

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_repo": "https://github.com/janegracyint2027g3-ai/Govenics_Blogs",
        "stats": stats,
        "items": all_results
    }

    MAPPING_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    MAPPING_OUTPUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    log.info("")
    log.info("══════════════════════════════════════════════════════════")
    log.info("  INGESTION & PUBLISHING COMPLETED")
    log.info("  Total items: %d (E-Books: %d, Articles: %d)", stats["total_items"], stats["ebooks_published"], stats["articles_published"])
    log.info("  Created: %d | Updated: %d | Errors: %d", stats["created"], stats["updated"], stats["errors"])
    log.info("  Report saved to: %s", MAPPING_OUTPUT)
    log.info("══════════════════════════════════════════════════════════")


if __name__ == "__main__":
    main()


"""
GOVENICS LinkedIn Posts Batch Publisher
========================================
Scans all post_*.md files under LinkedIn_Post/industries/ and LinkedIn_Post/offerings/,
parses title + body, maps folder name to WordPress category and tags, and publishes
each post to the WordPress CMS E-Library.

Idempotent: uses slug-based dedup — running twice will update rather than duplicate.

Usage (from project root):
    cd compliance_platform
    python publishing/publish_linkedin_posts.py
"""

import os
import sys
import json
import re
import logging
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional

# Allow importing from compliance_platform root
sys.path.insert(0, str(Path(__file__).parent.parent))

from integrations.cms_api_service import CMSAPIService

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(str(Path(__file__).parent.parent / "reports" / "publish_linkedin_posts.log"), mode="w", encoding="utf-8")
    ]
)
log = logging.getLogger("linkedin_publisher")

# ─── Slug / Name mappings ────────────────────────────────────────────────────

INDUSTRY_NAME_MAP = {
    "consumer-retail":           "Consumer Goods & Retail",
    "energy-utilities":          "Energy & Utilities",
    "financial-services":        "Financial Services (BFSI)",
    "food-processing":           "Food Processing & FMCG",
    "healthcare-life-sciences":  "Healthcare & Life Sciences",
    "infrastructure-construction": "Infrastructure & Construction",
    "manufacturing-industrial":  "Manufacturing & Industrial",
    "media-services":            "Media & Services",
    "technology-electronics":    "Technology & Electronics",
}

OFFERING_NAME_MAP = {
    "cybersecurity-data":    "Cybersecurity & Data Protection",
    "enterprise-governance": "Enterprise Governance",
    "environmental-ehs":     "Environmental & EHS Advisory",
    "escrow-services":       "Escrow Services",
    "esg-sustainability":    "ESG & Sustainability Advisory",
    "export-trade":          "Export & Trade Compliance",
    "labour-employment":     "Labour & Employment Advisory",
    "licensing-permits":     "Licensing & Permits",
    "regulatory-compliance": "Regulatory Compliance Advisory",
    "risk-management":       "Risk Management",
    "staffing-managed":      "Staffing & Managed Compliance",
    "supply-chain":          "Supply Chain Compliance",
    "taxation-trade":        "Taxation & Trade Advisory",
}

# WordPress category config
CATEGORY_INDUSTRY_REPORTS = ("Industry Reports", "industry-reports")
CATEGORY_ARTICLES_BLOGS    = ("Articles & Blogs",  "articles-blogs")

# ─── Helpers ─────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text[:80]


def parse_post_file(filepath: Path) -> dict:
    """
    Returns:
        {title, body_html, icp_summary, industry, offering, sub_industry}
    """
    raw = filepath.read_text(encoding="utf-8", errors="replace")

    # Extract front-matter style fields (KEY: VALUE lines at top)
    meta = {}
    for line in raw.splitlines()[:10]:
        if ":" in line and line.split(":")[0].isupper():
            key, _, val = line.partition(":")
            meta[key.strip()] = val.strip()

    industry   = meta.get("INDUSTRY", "")
    sub        = meta.get("SUB-INDUSTRY", "")
    offering   = meta.get("GOVENICS OFFERING", "")

    # Extract LINKEDIN POST section
    post_body = ""
    if "LINKEDIN POST:" in raw:
        post_body = raw.split("LINKEDIN POST:", 1)[1].strip()
        # Remove the footer section
        if "--- CONNECT WITH GOVENICS ---" in post_body:
            post_body = post_body.split("--- CONNECT WITH GOVENICS ---")[0].strip()

    # Derive title: first non-empty line of post body (skip emoji lines if needed)
    title = ""
    for line in post_body.splitlines():
        line_clean = line.strip()
        if line_clean and not line_clean.startswith("🚨") and not line_clean.startswith("📊"):
            title = line_clean[:120]
            break
    if not title:
        # Fallback: use first meaningful line of post body
        for line in post_body.splitlines():
            if line.strip():
                title = line.strip()[:120]
                break
    if not title:
        title = f"{offering or industry} – Post {filepath.stem}"

    # Build ICP extract
    icp_text = ""
    if "ICP:" in raw and "LINKEDIN POST:" in raw:
        icp_text = raw.split("ICP:", 1)[1].split("LINKEDIN POST:", 1)[0].strip()

    # Convert markdown-ish post body to simple HTML
    paragraphs = []
    for line in post_body.splitlines():
        line = line.strip()
        if line:
            # Preserve emoji lines as paragraphs
            escaped = line.replace("<", "&lt;").replace(">", "&gt;")
            paragraphs.append(f"<p>{escaped}</p>")

    body_html = "\n".join(paragraphs)

    # Build ICP block if available
    icp_html = ""
    if icp_text:
        icp_lines = [l.strip() for l in icp_text.splitlines() if l.strip()]
        icp_items = "".join(f"<li>{l.lstrip('- ')}</li>" for l in icp_lines)
        icp_html = f"""
<h3>Target Profile</h3>
<ul>
{icp_items}
</ul>
"""

    return {
        "title":       title,
        "body_html":   body_html,
        "icp_html":    icp_html,
        "industry":    industry,
        "sub_industry": sub,
        "offering":    offering,
    }


def build_wp_content(parsed: dict, folder_name: str, post_type: str) -> str:
    """Build full HTML content for WordPress post."""
    meta_rows = []
    if parsed["industry"]:
        meta_rows.append(f"<tr><td><strong>Industry</strong></td><td>{parsed['industry']}</td></tr>")
    if parsed["sub_industry"]:
        meta_rows.append(f"<tr><td><strong>Sub-Industry / Segment</strong></td><td>{parsed['sub_industry']}</td></tr>")
    if parsed["offering"]:
        meta_rows.append(f"<tr><td><strong>GOVENICS Offering</strong></td><td>{parsed['offering']}</td></tr>")
    meta_rows.append(f"<tr><td><strong>Content Type</strong></td><td>{'Industry Insight' if post_type == 'industry' else 'Advisory Article'}</td></tr>")

    meta_table = ""
    if meta_rows:
        meta_table = f"""
<figure class="wp-block-table">
<table><tbody>
{''.join(meta_rows)}
</tbody></table>
</figure>
"""

    content = f"""
<!-- wp:paragraph -->
{parsed['body_html']}
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading -->
<h2>Article Metadata</h2>
<!-- /wp:heading -->

<!-- wp:table -->
{meta_table}
<!-- /wp:table -->

{parsed['icp_html']}

<!-- wp:paragraph -->
<p><em>Source: GOVENICS GRC – A Division of ISI Group (Est. 1985) | Published via GOVENICS Compliance Platform.</em></p>
<!-- /wp:paragraph -->
"""
    return content.strip()


# ─── Main publisher ───────────────────────────────────────────────────────────

def collect_post_files(linkedin_root: Path) -> list:
    """
    Returns list of dicts: {filepath, folder_name, post_type, folder_slug}
    """
    entries = []
    for post_type in ("industries", "offerings"):
        base = linkedin_root / post_type
        if not base.exists():
            continue
        for folder in sorted(base.iterdir()):
            if not folder.is_dir():
                continue
            texts_dir = folder / "texts"
            if not texts_dir.exists():
                continue
            for md_file in sorted(texts_dir.glob("post_*.md")):
                entries.append({
                    "filepath":    md_file,
                    "folder_name": folder.name,
                    "post_type":   "industry" if post_type == "industries" else "offering",
                    "folder_slug": folder.name,
                })
    return entries


def publish_all(linkedin_root: Path, mapping_output: Path):
    cms = CMSAPIService()

    log.info("── Health check ──────────────────────────────────────")
    health = cms.health_check()
    if not health.get("authenticated"):
        log.error("WordPress authentication failed. Check credentials. %s", health)
        sys.exit(1)
    log.info("Authenticated as: %s", health.get("user", {}).get("name"))

    # Ensure required categories exist
    log.info("── Ensuring WordPress categories ─────────────────────")
    cat_id_industry = cms.ensure_category(*CATEGORY_INDUSTRY_REPORTS)
    cat_id_articles = cms.ensure_category(*CATEGORY_ARTICLES_BLOGS)
    log.info("  Industry Reports cat_id=%s, Articles & Blogs cat_id=%s", cat_id_industry, cat_id_articles)

    # Collect all post files
    entries = collect_post_files(linkedin_root)
    log.info("── Found %d post files to process ────────────────────", len(entries))

    mapping = []
    stats = {"created": 0, "updated": 0, "skipped": 0, "errors": 0}

    for i, entry in enumerate(entries, start=1):
        filepath   = entry["filepath"]
        folder_name = entry["folder_name"]
        post_type  = entry["post_type"]
        folder_slug = entry["folder_slug"]

        try:
            parsed = parse_post_file(filepath)
            title  = parsed["title"]
            if not title:
                log.warning("[%d/%d] SKIP – no title found in %s", i, len(entries), filepath)
                stats["skipped"] += 1
                continue

            # Slug: {folder}-{stem}  e.g. "consumer-retail-post-1"
            slug = f"{folder_slug}-{filepath.stem}"  # e.g. consumer-retail-post-1

            # Category
            cat_id = cat_id_industry if post_type == "industry" else cat_id_articles

            # Tags: offering name or industry name
            tag_ids = []
            if post_type == "industry":
                display_industry = INDUSTRY_NAME_MAP.get(folder_name, folder_name.replace("-", " ").title())
                tag_ids.append(cms.ensure_tag(display_industry, folder_slug))
            else:
                display_offering = OFFERING_NAME_MAP.get(folder_name, folder_name.replace("-", " ").title())
                tag_ids.append(cms.ensure_tag(display_offering, folder_slug))

            # Also tag with the offering listed in the file if present
            if parsed.get("offering"):
                offering_slug = slugify(parsed["offering"])
                tag_ids.append(cms.ensure_tag(parsed["offering"], offering_slug))

            tag_ids = list({t for t in tag_ids if t > 0})

            # Content
            content_html = build_wp_content(parsed, folder_name, post_type)

            # Dedup: search by slug
            r_check = cms.session.get(
                f"{cms.base_url}/posts?slug={slug}&status=any", timeout=10
            )
            existing_id = None
            if r_check.status_code == 200 and r_check.json():
                existing_id = r_check.json()[0]["id"]

            post_data = {
                "title":      title,
                "content":    content_html,
                "status":     "publish",
                "slug":       slug,
                "categories": [cat_id],
                "tags":       tag_ids,
                "excerpt":    parsed["body_html"][:300].replace("<p>", "").replace("</p>", " ").strip(),
            }

            if existing_id:
                r = cms.session.put(f"{cms.base_url}/posts/{existing_id}", json=post_data, timeout=20)
                action = "updated"
                wp_id  = existing_id
            else:
                r = cms.session.post(f"{cms.base_url}/posts", json=post_data, timeout=20)
                action = "created"
                wp_id  = r.json().get("id") if r.status_code in (200, 201) else None

            if r.status_code in (200, 201):
                log.info("[%d/%d] ✓ %s wp_id=%s — %s", i, len(entries), action.upper(), wp_id, title[:70])
                stats[action] += 1
                mapping.append({
                    "file":        str(filepath.relative_to(linkedin_root.parent)),
                    "slug":        slug,
                    "wp_id":       wp_id,
                    "action":      action,
                    "title":       title,
                    "category":    "Industry Reports" if post_type == "industry" else "Articles & Blogs",
                    "post_type":   post_type,
                    "folder":      folder_name,
                    "published_at": datetime.now(timezone.utc).isoformat(),
                })
            else:
                log.error("[%d/%d] ✗ HTTP %s — %s — %s", i, len(entries), r.status_code, slug, r.text[:200])
                stats["errors"] += 1
                mapping.append({
                    "file":   str(filepath.relative_to(linkedin_root.parent)),
                    "slug":   slug,
                    "wp_id":  None,
                    "action": "error",
                    "title":  title,
                    "error":  r.text[:300],
                })

        except Exception as exc:
            log.error("[%d/%d] EXCEPTION — %s — %s", i, len(entries), filepath, exc, exc_info=True)
            stats["errors"] += 1
            mapping.append({
                "file":   str(filepath),
                "slug":   "unknown",
                "wp_id":  None,
                "action": "exception",
                "error":  str(exc),
            })

    # Save mapping report
    mapping_output.parent.mkdir(parents=True, exist_ok=True)
    report = {
        "run_at":   datetime.now(timezone.utc).isoformat(),
        "total":    len(entries),
        "stats":    stats,
        "mapping":  mapping,
    }
    mapping_output.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    log.info("")
    log.info("═══ PUBLISH COMPLETE ════════════════════════════════")
    log.info("  Total files : %d", len(entries))
    log.info("  Created     : %d", stats["created"])
    log.info("  Updated     : %d", stats["updated"])
    log.info("  Skipped     : %d", stats["skipped"])
    log.info("  Errors      : %d", stats["errors"])
    log.info("  Mapping     : %s", mapping_output)
    log.info("════════════════════════════════════════════════════")


if __name__ == "__main__":
    # Paths relative to this script's location
    script_dir    = Path(__file__).parent
    project_root  = script_dir.parent.parent           # govnics-main/govnics-main
    linkedin_root = project_root / "LinkedIn_Post"
    mapping_out   = script_dir.parent / "reports" / "linkedin_posts_cms_mapping.json"

    if not linkedin_root.exists():
        log.error("LinkedIn_Post directory not found at: %s", linkedin_root)
        sys.exit(1)

    publish_all(linkedin_root, mapping_out)


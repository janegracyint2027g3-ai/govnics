"""
cms_structure_creator.py – Replicate extracted digital presence hierarchy in WordPress CMS.

Reads output/govenics_digital_presence.json, maps pages to WordPress Pages,
preserves parent-child hierarchy, sets custom metadata (_govenics_source_id, _govenics_content_hash),
and produces output/govenics_cms_mapping.json.
"""
import argparse
import json
import logging
import sys
from pathlib import Path
from typing import Dict, Any, List

from config import (
    HIERARCHY_JSON,
    CMS_MAPPING_JSON,
    WP_SOURCE_ID_META_KEY,
    WP_CONTENT_HASH_META_KEY,
    LOGS_DIR,
)
from wordpress_client import WordPressClient

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "cms_structure_creator.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("cms_creator")


def generate_page_html(page_data: Dict[str, Any]) -> str:
    """Generate clean Gutenberg/HTML content for a WordPress page from extracted sections."""
    html_parts = []
    
    if page_data.get("meta_description"):
        html_parts.append(f"<!-- wp:paragraph --><p class=\"lead\"><em>{page_data['meta_description']}</em></p><!-- /wp:paragraph -->")

    sections = page_data.get("parsed_sections") or page_data.get("sections") or []
    for s in sections:
        heading = s.get("heading")
        text = s.get("text_preview", "")
        ctype = s.get("component_type", "section")

        html_parts.append(f"<div class=\"govenics-section govenics-{ctype}\">")
        if heading:
            html_parts.append(f"<!-- wp:heading --><h2>{heading}</h2><!-- /wp:heading -->")
        if text:
            html_parts.append(f"<!-- wp:paragraph --><p>{text}</p><!-- /wp:paragraph -->")
        
        paragraphs = s.get("paragraphs", [])
        for p in paragraphs:
            if p != text:
                html_parts.append(f"<!-- wp:paragraph --><p>{p}</p><!-- /wp:paragraph -->")

        items = s.get("list_items", [])
        if items:
            html_parts.append("<!-- wp:list --><ul>")
            for it in items:
                html_parts.append(f"<li>{it}</li>")
            html_parts.append("</ul><!-- /wp:list -->")

        html_parts.append("</div>")

    return "\n".join(html_parts)


class CMSStructureCreator:
    def __init__(self, dry_run: bool = True) -> None:
        self.dry_run = dry_run
        self.client = None if dry_run else WordPressClient()
        self.mapping: Dict[str, Any] = {
            "source_site": "https://govnics-murex.vercel.app",
            "destination_cms": "https://cms.govenics.com",
            "pages_mapped": {},
            "summary": {
                "created": 0,
                "updated": 0,
                "unchanged": 0,
                "total": 0,
            }
        }

    def load_existing_wp_pages(self) -> Dict[str, Any]:
        """Fetch all WP pages and index them by source_id meta or slug."""
        if self.dry_run:
            return {}
        try:
            pages = self.client.get_pages()
            wp_by_source_id = {}
            for p in pages:
                # WP meta is exposed if registered or inside p['meta']
                meta = p.get("meta", {}) or {}
                sid = meta.get(WP_SOURCE_ID_META_KEY)
                if sid:
                    wp_by_source_id[sid] = p
                else:
                    # fallback to matching by slug
                    wp_by_source_id[f"slug_{p['slug']}"] = p
            return wp_by_source_id
        except Exception as exc:
            log.warning("Could not pre-fetch WP pages: %s", exc)
            return {}

    def execute(self, hierarchy_data: Dict[str, Any]) -> Dict[str, Any]:
        flat_pages: List[Dict[str, Any]] = hierarchy_data.get("flat_pages", [])
        # Sort by depth so parents are created before children
        sorted_pages = sorted(flat_pages, key=lambda p: p.get("depth", 0))

        wp_cache = self.load_existing_wp_pages()
        path_to_wp_id: Dict[str, int] = {}

        for page in sorted_pages:
            sid = page["source_id"]
            slug = page["slug"]
            path = page["path"]
            title = page["title"] or slug.replace("-", " ").title()
            content_hash = page.get("content_hash", "")
            parent_path = page.get("parent_path")

            parent_wp_id = 0
            if parent_path and parent_path in path_to_wp_id:
                parent_wp_id = path_to_wp_id[parent_path]

            page_content = generate_page_html(page)

            log.info("Processing page: %s (depth=%d, parent_id=%d)", path, page.get("depth", 0), parent_wp_id)

            if self.dry_run:
                self.mapping["pages_mapped"][sid] = {
                    "source_id": sid,
                    "slug": slug,
                    "path": path,
                    "title": title,
                    "wp_id": 9999,  # simulated
                    "parent_wp_id": parent_wp_id,
                    "action": "dry_run_create",
                    "content_hash": content_hash,
                }
                path_to_wp_id[path] = 9999
                self.mapping["summary"]["created"] += 1
                continue

            # Real execution
            existing = wp_cache.get(sid) or wp_cache.get(f"slug_{slug}")
            meta_payload = {
                WP_SOURCE_ID_META_KEY: sid,
                WP_CONTENT_HASH_META_KEY: content_hash,
            }

            if existing:
                wp_id = existing["id"]
                # Update page
                update_fields = {
                    "title": title,
                    "content": page_content,
                    "parent": parent_wp_id,
                }
                try:
                    self.client.update_page(wp_id, update_fields)
                    self.mapping["pages_mapped"][sid] = {
                        "source_id": sid,
                        "slug": slug,
                        "path": path,
                        "title": title,
                        "wp_id": wp_id,
                        "parent_wp_id": parent_wp_id,
                        "action": "updated",
                        "content_hash": content_hash,
                    }
                    path_to_wp_id[path] = wp_id
                    self.mapping["summary"]["updated"] += 1
                except Exception as exc:
                    log.error("Failed to update WP page %s (%s): %s", title, wp_id, exc)
            else:
                # Create page
                try:
                    res = self.client.create_page(
                        title=title,
                        content=page_content,
                        parent_id=parent_wp_id,
                        status="publish",
                        slug=slug,
                        meta=meta_payload,
                    )
                    wp_id = res.get("id")
                    self.mapping["pages_mapped"][sid] = {
                        "source_id": sid,
                        "slug": slug,
                        "path": path,
                        "title": title,
                        "wp_id": wp_id,
                        "parent_wp_id": parent_wp_id,
                        "action": "created",
                        "content_hash": content_hash,
                    }
                    path_to_wp_id[path] = wp_id
                    self.mapping["summary"]["created"] += 1
                except Exception as exc:
                    log.error("Failed to create WP page %s: %s", title, exc)

        self.mapping["summary"]["total"] = len(sorted_pages)
        CMS_MAPPING_JSON.write_text(
            json.dumps(self.mapping, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        log.info("Mapping output written to %s", CMS_MAPPING_JSON)
        print(f"✅ CMS Structure created! Mapping saved to {CMS_MAPPING_JSON}")
        return self.mapping


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Replicate site structure in WordPress")
    parser.add_argument("--execute", action="store_true", help="Perform real API writes (default is dry-run)")
    args = parser.parse_args()

    if not HIERARCHY_JSON.exists():
        print(f"❌ {HIERARCHY_JSON} not found. Run hierarchy_extractor.py first!")
        sys.exit(1)

    data = json.loads(HIERARCHY_JSON.read_text(encoding="utf-8"))
    creator = CMSStructureCreator(dry_run=not args.execute)
    creator.execute(data)


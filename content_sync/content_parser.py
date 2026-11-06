"""
content_parser.py – Parse raw HTML/page data from the crawler into structured content.

Builds hierarchical content blocks with stable IDs, component type detection,
heading-based section splitting, and content hashing.
"""
import hashlib
import logging
import re
import sys
from typing import Optional

from bs4 import BeautifulSoup

from config import LOGS_DIR

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "content_parser.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("parser")


# ---------------------------------------------------------------------------
# Component-type heuristics
# ---------------------------------------------------------------------------
_COMPONENT_PATTERNS: dict[str, list[str]] = {
    "hero": ["hero", "banner", "jumbotron", "masthead"],
    "cta": ["cta", "call-to-action", "get-started", "contact-us"],
    "stats": ["stats", "metric", "counter", "number"],
    "cards": ["card", "feature", "offering", "service-card"],
    "faq": ["faq", "accordion", "question", "answer"],
    "testimonial": ["testimonial", "review", "quote", "client"],
    "team": ["team", "people", "leadership", "about-us"],
    "nav": ["nav", "menu", "header", "footer"],
    "form": ["form", "contact-form", "subscribe"],
    "table": ["table", "comparison"],
}


def _detect_component_type(class_str: str, tag: str) -> str:
    class_lower = class_str.lower()
    for ctype, patterns in _COMPONENT_PATTERNS.items():
        if any(p in class_lower for p in patterns):
            return ctype
    if tag in ("header",):
        return "hero"
    if tag == "footer":
        return "nav"
    if tag == "form":
        return "form"
    return "section"


def stable_section_id(url: str, position: int) -> str:
    key = f"{url}::{position}"
    return hashlib.sha256(key.encode()).hexdigest()[:12]


def parse_html(html: str, url: str) -> list[dict]:
    """
    Parse HTML into a list of content block dicts.
    Each block has: id, position, heading, text, component_type, has_cta, has_image.
    """
    # Use builtin html.parser for universal portability without native binary dependencies
    soup = BeautifulSoup(html, "html.parser")

    # Remove script / style / nav / footer noise for text extraction
    for tag in soup(["script", "style", "noscript", "aside"]):
        tag.decompose()

    blocks = []
    position = 0

    containers = soup.find_all(
        ["section", "article", "div", "header", "main"],
        recursive=False,
    )
    if not containers:
        containers = soup.find_all(["section", "article", "header"])

    # Flatten top-level containers only (avoid deep recursion noise)
    for el in containers:
        class_list = " ".join(el.get("class", []))
        tag = el.name
        heading_el = el.find(["h1", "h2", "h3", "h4"])
        heading_text = heading_el.get_text(strip=True) if heading_el else ""

        full_text = el.get_text(separator=" ", strip=True)
        if len(full_text) < 20:
            continue  # skip trivially empty blocks

        ctype = _detect_component_type(class_list, tag)
        has_cta = bool(el.find("a", href=True) or el.find("button"))
        has_image = bool(el.find("img"))

        images = [
            {"src": img.get("src", ""), "alt": img.get("alt", "")}
            for img in el.find_all("img")[:3]
        ]

        # Extract bullet / list content
        list_items = [li.get_text(strip=True) for li in el.find_all("li")]

        # Paragraph text (first 3 paragraphs)
        paragraphs = [p.get_text(strip=True) for p in el.find_all("p") if p.get_text(strip=True)][:3]

        block = {
            "section_id": stable_section_id(url, position),
            "position": position,
            "heading": heading_text,
            "component_type": ctype,
            "text_preview": full_text[:600],
            "paragraphs": paragraphs,
            "list_items": list_items[:10],
            "has_cta": has_cta,
            "has_image": has_image,
            "images": images,
            "content_hash": hashlib.sha256(full_text.encode()).hexdigest()[:16],
        }
        blocks.append(block)
        position += 1

    return blocks


def enrich_page_data(page_data: dict, html: Optional[str] = None) -> dict:
    """
    Enrich a crawler PageData dict with parsed content blocks.
    If html is provided (from Playwright innerHTML), use it; otherwise use existing sections.
    """
    if html:
        parsed_blocks = parse_html(html, page_data["url"])
        page_data["parsed_sections"] = parsed_blocks
    else:
        # Re-structure raw sections from Playwright JS extraction
        raw = page_data.get("sections", [])
        page_data["parsed_sections"] = [
            {
                "section_id": stable_section_id(page_data["url"], s.get("position", i)),
                "position": s.get("position", i),
                "heading": s.get("heading", ""),
                "component_type": s.get("component_type", "section"),
                "text_preview": s.get("text_preview", ""),
                "paragraphs": [],
                "list_items": [],
                "has_cta": s.get("has_cta", False),
                "has_image": s.get("has_image", False),
                "images": [],
                "content_hash": hashlib.sha256(
                    s.get("text_preview", "").encode()
                ).hexdigest()[:16],
            }
            for i, s in enumerate(raw)
        ]
    return page_data


def build_hierarchy(pages: list[dict]) -> dict:
    """
    Organise pages into a hierarchy based on URL path depth.
    Returns the full GOVENICS Digital Presence JSON structure.
    """
    import time
    from urllib.parse import urlparse

    root_pages = []
    slug_map: dict[str, dict] = {}

    for page in pages:
        if page.get("http_status", 200) >= 400:
            continue
        path = urlparse(page["url"]).path.rstrip("/") or "/"
        parts = [p for p in path.split("/") if p]
        depth = len(parts)

        entry = {
            **page,
            "depth": depth,
            "parent_path": "/" + "/".join(parts[:-1]) if parts else None,
            "children": [],
        }
        slug_map[path or "/"] = entry

    # Wire up parent-child
    for path, entry in slug_map.items():
        parent_path = entry.get("parent_path")
        if parent_path and parent_path in slug_map:
            slug_map[parent_path]["children"].append(entry)
        else:
            root_pages.append(entry)

    return {
        "source": "https://govnics-murex.vercel.app",
        "extraction_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "total_pages": len(pages),
        "hierarchy": root_pages,
        "flat_pages": list(slug_map.values()),
    }


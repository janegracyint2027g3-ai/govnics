"""
hierarchy_extractor.py – Main extraction orchestrator.

Crawl the site -> parse & enrich content -> organize hierarchy -> output JSON.
Supports Playwright crawler or local mock/fallback crawler if browser fails.
"""
import argparse
import asyncio
import json
import logging
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

from config import (
    SOURCE_URL,
    HIERARCHY_JSON,
    LOGS_DIR,
)
from website_crawler import SEED_ROUTES, stable_id, extract_page_data, normalize_url
from content_parser import parse_html, enrich_page_data, build_hierarchy

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "hierarchy_extractor.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("extractor")


def fallback_http_crawl(routes: list) -> list:
    """
    Fallback HTTP crawler using requests and BeautifulSoup
    if Playwright/Chromium cannot be launched.
    """
    results = []
    session = requests.Session()
    session.headers.update({
        "User-Agent": "GOVENICS-CMS-Sync/1.0 (fallback-crawler; +https://govenics.com)"
    })

    log.info("Starting fallback HTTP crawl for %d seed routes...", len(routes))
    for route in routes:
        full_url = normalize_url(route, SOURCE_URL)
        try:
            resp = session.get(full_url, timeout=15)
            status = resp.status_code
            if status >= 400:
                log.warning("HTTP %d for %s", status, full_url)
                continue

            html = resp.text
            soup = BeautifulSoup(html, "html.parser")
            title = soup.title.string.strip() if soup.title and soup.title.string else route.strip("/").title()

            meta_desc = ""
            m_tag = soup.find("meta", attrs={"name": "description"})
            if m_tag and m_tag.get("content"):
                meta_desc = m_tag["content"]

            og_title = ""
            og_t_tag = soup.find("meta", attrs={"property": "og:title"})
            if og_t_tag and og_t_tag.get("content"):
                og_title = og_t_tag["content"]

            og_desc = ""
            og_d_tag = soup.find("meta", attrs={"property": "og:description"})
            if og_d_tag and og_d_tag.get("content"):
                og_desc = og_d_tag["content"]

            canonical = ""
            c_tag = soup.find("link", attrs={"rel": "canonical"})
            if c_tag and c_tag.get("href"):
                canonical = c_tag["href"]

            headings = []
            for t in ["h1", "h2", "h3", "h4"]:
                for h in soup.find_all(t):
                    htext = h.get_text(strip=True)
                    if htext:
                        headings.append({"level": int(t[1]), "text": htext})

            parsed_sections = parse_html(html, full_url)
            parsed_url = urlparse(full_url)
            slug = parsed_url.path.strip("/").replace("/", "-") or "home"

            content_text = " ".join(s.get("text_preview", "") for s in parsed_sections)
            import hashlib
            content_hash = hashlib.sha256(content_text.encode()).hexdigest()[:16]

            p_type = "page"
            p = parsed_url.path
            if p in ("/", ""):
                p_type = "homepage"
            elif "/offering" in p or "/services" in p:
                p_type = "offering"
            elif "/industr" in p:
                p_type = "industry"
            elif "/blog" in p:
                p_type = "blog"
            elif "/about" in p:
                p_type = "about"
            elif "/contact" in p:
                p_type = "contact"
            elif "/resource" in p or "/e-library" in p:
                p_type = "resource"
            elif "/sgrc" in p:
                p_type = "sgrc"

            pdata = {
                "source_id": stable_id(full_url),
                "url": full_url,
                "canonical_url": canonical or full_url,
                "slug": slug,
                "path": parsed_url.path,
                "title": title,
                "og_title": og_title,
                "meta_description": meta_desc,
                "og_description": og_desc,
                "meta_keywords": "",
                "featured_image": "",
                "hero_image": "",
                "page_type": p_type,
                "headings": headings,
                "sections": parsed_sections,
                "parsed_sections": parsed_sections,
                "images": [],
                "internal_links": [],
                "content_hash": content_hash,
                "http_status": 200,
                "crawled_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            }
            results.append(pdata)
            log.info("Crawled: %s (sections=%d)", full_url, len(parsed_sections))
        except Exception as exc:
            log.error("Failed to crawl %s: %s", full_url, exc)

    return results


def run_extraction(use_playwright: bool = True) -> dict:
    pages = []
    if use_playwright:
        try:
            from website_crawler import WebsiteCrawler
            crawler = WebsiteCrawler()
            raw_pages = asyncio.run(crawler.crawl())
            for p in raw_pages:
                pages.append(enrich_page_data(p))
        except Exception as exc:
            log.warning("Playwright crawl failed or not ready (%s), falling back to HTTP crawl", exc)
            pages = fallback_http_crawl(SEED_ROUTES)
    else:
        pages = fallback_http_crawl(SEED_ROUTES)

    hierarchy = build_hierarchy(pages)
    HIERARCHY_JSON.write_text(
        json.dumps(hierarchy, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    log.info("Hierarchy saved to %s (%d pages)", HIERARCHY_JSON, len(pages))
    print(f"✅ Extraction completed: {len(pages)} pages extracted -> {HIERARCHY_JSON}")
    return hierarchy


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GOVENICS Digital Presence Hierarchy Extractor")
    parser.add_argument("--no-playwright", action="store_true", help="Force fallback HTTP crawler")
    args = parser.parse_args()
    run_extraction(use_playwright=not args.no_playwright)


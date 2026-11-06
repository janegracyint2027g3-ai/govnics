"""
website_crawler.py – Playwright-based async crawler for the GOVENICS Digital Presence website.

Crawls https://govnics-murex.vercel.app, handles JS-rendered content,
respects rate limits, and returns a list of PageData dicts.
"""
import asyncio
import hashlib
import logging
import sys
import time
import re
from typing import Optional
from urllib.parse import urljoin, urlparse

from playwright.async_api import async_playwright, Page, BrowserContext

from config import (
    SOURCE_URL,
    CRAWL_RATE_LIMIT_SECONDS,
    CRAWL_MAX_RETRIES,
    CRAWL_TIMEOUT_MS,
    CRAWL_HEADLESS,
    LOGS_DIR,
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "website_crawler.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("crawler")

# ---------------------------------------------------------------------------
# Known routes from src/App.tsx (seed list – crawler expands from here)
# ---------------------------------------------------------------------------
SEED_ROUTES = [
    "/",
    "/about",
    "/contact",
    "/services",
    "/industries",
    "/sgrc/e-library",
    "/sgrc/resources",
    "/offerings/regulatory-compliance",
    "/offerings/labour-employment",
    "/offerings/environmental-ehs",
    "/offerings/licensing-permits",
    "/offerings/taxation-trade",
    "/offerings/export-trade-services",
    "/offerings/supply-chain-compliance",
    "/offerings/escrow-services",
    "/offerings/enterprise-governance",
    "/offerings/risk-management",
    "/offerings/esg-sustainability",
    "/offerings/cybersecurity-privacy",
    "/industries/manufacturing",
    "/industries/automotive",
    "/industries/pharmaceuticals",
    "/industries/electronics",
    "/industries/chemicals",
    "/industries/textiles",
    "/industries/food-processing",
    "/industries/bfsi-fintech",
    "/industries/healthcare",
    "/industries/it-technology",
    "/industries/logistics",
    "/industries/infrastructure",
    "/industries/energy-utilities",
    "/industries/retail",
    "/industries/agriculture",
    "/blog",
    "/resources",
    "/privacy-policy",
    "/terms",
]

SKIP_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".svg", ".gif", ".ico", ".webp", ".mp4", ".zip"}
SKIP_PATTERNS = ["/wp-admin", "/wp-login", "/wp-json", "/__playwright", "/api/"]


def stable_id(url: str) -> str:
    """Generate a stable 12-char hex ID from a URL."""
    return hashlib.sha256(url.encode()).hexdigest()[:12]


def is_internal(url: str, base: str) -> bool:
    parsed = urlparse(url)
    base_parsed = urlparse(base)
    if parsed.netloc and parsed.netloc != base_parsed.netloc:
        return False
    path = parsed.path.lower()
    if any(parsed.path.endswith(ext) for ext in SKIP_EXTENSIONS):
        return False
    if any(pat in path for pat in SKIP_PATTERNS):
        return False
    return True


def normalize_url(url: str, base: str) -> str:
    full = urljoin(base, url)
    parsed = urlparse(full)
    # Remove fragment and query string for deduplication
    return parsed._replace(fragment="", query="").geturl().rstrip("/")


async def extract_page_data(page: Page, url: str) -> dict:
    """Extract structured data from a loaded Playwright page."""
    title = await page.title()

    # Meta tags
    meta_desc = await page.evaluate(
        "document.querySelector('meta[name=\"description\"]')?.content || ''"
    )
    meta_keywords = await page.evaluate(
        "document.querySelector('meta[name=\"keywords\"]')?.content || ''"
    )
    canonical = await page.evaluate(
        "document.querySelector('link[rel=\"canonical\"]')?.href || ''"
    )
    og_title = await page.evaluate(
        "document.querySelector('meta[property=\"og:title\"]')?.content || ''"
    )
    og_desc = await page.evaluate(
        "document.querySelector('meta[property=\"og:description\"]')?.content || ''"
    )
    og_image = await page.evaluate(
        "document.querySelector('meta[property=\"og:image\"]')?.content || ''"
    )

    # Extract headings
    headings = await page.evaluate("""() => {
        const tags = ['h1','h2','h3','h4'];
        return tags.flatMap(t =>
            [...document.querySelectorAll(t)].map(el => ({
                level: parseInt(t[1]),
                text: el.innerText.trim()
            }))
        ).filter(h => h.text);
    }""")

    # Extract visible text sections (by landmark / section elements)
    sections = await page.evaluate("""() => {
        const containers = document.querySelectorAll('section, article, main > div, [data-section]');
        return [...containers].map((el, i) => {
            const heading = el.querySelector('h1,h2,h3,h4');
            const text = el.innerText?.trim().slice(0, 2000) || '';
            return {
                position: i,
                heading: heading ? heading.innerText.trim() : '',
                text_preview: text.slice(0, 500),
                has_cta: !!el.querySelector('a[href], button'),
                has_image: !!el.querySelector('img'),
                component_type: el.dataset?.section || el.className?.split(' ')[0] || 'section'
            };
        }).filter(s => s.text_preview.length > 20);
    }""")

    # Internal links
    links = await page.evaluate("""() => {
        return [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith('http'));
    }""")

    # Images
    images = await page.evaluate("""() => {
        return [...document.querySelectorAll('img[src]')].slice(0, 10).map(img => ({
            src: img.src,
            alt: img.alt || ''
        }));
    }""")

    # Hero image
    hero_image = await page.evaluate("""() => {
        const hero = document.querySelector('[class*="hero"] img, [class*="banner"] img, header img');
        return hero ? hero.src : '';
    }""")

    # HTTP status is 200 if we got here
    parsed_url = urlparse(url)
    slug = parsed_url.path.strip("/").replace("/", "-") or "home"
    page_type = _infer_page_type(parsed_url.path)

    # Build content hash from meaningful text
    content_text = " ".join(s.get("text_preview", "") for s in sections)
    content_hash = hashlib.sha256(content_text.encode()).hexdigest()[:16]

    return {
        "source_id": stable_id(url),
        "url": url,
        "canonical_url": canonical or url,
        "slug": slug,
        "path": parsed_url.path,
        "title": title,
        "og_title": og_title,
        "meta_description": meta_desc,
        "og_description": og_desc,
        "meta_keywords": meta_keywords,
        "featured_image": og_image or hero_image,
        "hero_image": hero_image,
        "page_type": page_type,
        "headings": headings,
        "sections": sections,
        "images": images[:5],
        "internal_links": list(set(links)),
        "content_hash": content_hash,
        "http_status": 200,
        "crawled_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }


def _infer_page_type(path: str) -> str:
    if path in ("/", ""):
        return "homepage"
    if "/offering" in path or "/services" in path:
        return "offering"
    if "/industr" in path:
        return "industry"
    if "/blog" in path or "/article" in path:
        return "blog"
    if "/about" in path:
        return "about"
    if "/contact" in path:
        return "contact"
    if "/e-library" in path or "/resource" in path:
        return "resource"
    if "/sgrc" in path:
        return "sgrc"
    return "page"


class WebsiteCrawler:
    def __init__(self) -> None:
        self._visited: set[str] = set()
        self._queue: list[str] = []
        self._results: list[dict] = []

    def _seed_queue(self) -> None:
        for route in SEED_ROUTES:
            url = normalize_url(route, SOURCE_URL)
            if url not in self._visited:
                self._queue.append(url)

    async def _crawl_page(self, page: Page, url: str) -> Optional[dict]:
        for attempt in range(1, CRAWL_MAX_RETRIES + 1):
            try:
                log.info("Crawling [%d/%d]: %s", attempt, CRAWL_MAX_RETRIES, url)
                resp = await page.goto(url, timeout=CRAWL_TIMEOUT_MS, wait_until="networkidle")
                if resp is None:
                    log.warning("No response for %s", url)
                    return None
                status = resp.status
                if status >= 400:
                    log.warning("HTTP %d for %s – skipping", status, url)
                    return {"url": url, "http_status": status, "source_id": stable_id(url), "title": "", "error": f"HTTP {status}"}
                data = await extract_page_data(page, url)
                # Queue newly discovered internal links
                for link in data.get("internal_links", []):
                    norm = normalize_url(link, SOURCE_URL)
                    if is_internal(norm, SOURCE_URL) and norm not in self._visited:
                        self._queue.append(norm)
                return data
            except Exception as exc:
                log.warning("Attempt %d failed for %s: %s", attempt, url, exc)
                if attempt < CRAWL_MAX_RETRIES:
                    await asyncio.sleep(2 ** attempt)
        log.error("All retries exhausted for %s", url)
        return None

    async def crawl(self) -> list[dict]:
        self._seed_queue()
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=CRAWL_HEADLESS)
            context: BrowserContext = await browser.new_context(
                user_agent="GOVENICS-CMS-Sync/1.0 (Playwright crawler; +https://govenics.com)"
            )
            page = await context.new_page()

            while self._queue:
                url = self._queue.pop(0)
                norm = normalize_url(url, SOURCE_URL)
                if norm in self._visited:
                    continue
                self._visited.add(norm)

                data = await self._crawl_page(page, norm)
                if data:
                    self._results.append(data)

                await asyncio.sleep(CRAWL_RATE_LIMIT_SECONDS)

            await browser.close()

        log.info("Crawl complete: %d pages collected", len(self._results))
        return self._results


def crawl_website() -> list[dict]:
    """Synchronous entry point for other modules."""
    crawler = WebsiteCrawler()
    return asyncio.run(crawler.crawl())


if __name__ == "__main__":
    import json
    from config import HIERARCHY_JSON
    results = crawl_website()
    print(f"Crawled {len(results)} pages")
    for r in results:
        print(f"  {r.get('http_status', '?')} {r.get('url')}")


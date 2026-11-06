"""
wordpress_client.py – Secure WordPress REST API client for GOVENICS CMS Sync.

Usage:
    python wordpress_client.py --inspect          # write WP structure to output/
    python wordpress_client.py --test-auth        # verify credentials only
"""
import argparse
import base64
import json
import logging
import sys
import time
from typing import Any, Optional

import requests

from config import (
    WORDPRESS_API_URL,
    WORDPRESS_USERNAME,
    WORDPRESS_APP_PASSWORD,
    WP_SOURCE_ID_META_KEY,
    WP_CONTENT_HASH_META_KEY,
    WP_STRUCTURE_JSON,
    LOGS_DIR,
    validate_config,
)

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "wordpress_client.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("wp_client")


class WordPressClient:
    """
    Thread-safe WordPress REST API v2 client using Application Password auth.
    Credentials are NEVER logged.
    """

    def __init__(self) -> None:
        validate_config()
        token = base64.b64encode(
            f"{WORDPRESS_USERNAME}:{WORDPRESS_APP_PASSWORD}".encode()
        ).decode()
        self._session = requests.Session()
        self._session.headers.update(
            {
                "Authorization": f"Basic {token}",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "GOVENICS-CMS-Sync/1.0 (python-requests)",
            }
        )
        self._base = WORDPRESS_API_URL

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _get(self, endpoint: str, params: Optional[dict] = None) -> Any:
        url = f"{self._base}/{endpoint.lstrip('/')}"
        try:
            resp = self._session.get(url, params=params, timeout=30)
            resp.raise_for_status()
            return resp.json()
        except requests.HTTPError as exc:
            log.error("GET %s → HTTP %s", url, exc.response.status_code)
            raise
        except requests.RequestException as exc:
            log.error("GET %s → %s", url, type(exc).__name__)
            raise

    def _get_all_pages(self, endpoint: str, extra_params: Optional[dict] = None) -> list:
        """Fetch all paginated results from a WP list endpoint."""
        results = []
        page = 1
        while True:
            params = {"per_page": 100, "page": page}
            if extra_params:
                params.update(extra_params)
            url = f"{self._base}/{endpoint.lstrip('/')}"
            resp = self._session.get(url, params=params, timeout=30)
            if resp.status_code == 400:
                break  # no more pages
            resp.raise_for_status()
            batch = resp.json()
            if not batch:
                break
            results.extend(batch)
            total_pages = int(resp.headers.get("X-WP-TotalPages", 1))
            if page >= total_pages:
                break
            page += 1
            time.sleep(0.3)
        return results

    def _post(self, endpoint: str, data: dict) -> dict:
        url = f"{self._base}/{endpoint.lstrip('/')}"
        try:
            resp = self._session.post(url, json=data, timeout=30)
            resp.raise_for_status()
            return resp.json()
        except requests.HTTPError as exc:
            log.error("POST %s → HTTP %s: %s", url, exc.response.status_code, exc.response.text[:300])
            raise

    def _put(self, endpoint: str, data: dict) -> dict:
        url = f"{self._base}/{endpoint.lstrip('/')}"
        try:
            resp = self._session.put(url, json=data, timeout=30)
            resp.raise_for_status()
            return resp.json()
        except requests.HTTPError as exc:
            log.error("PUT %s → HTTP %s: %s", url, exc.response.status_code, exc.response.text[:300])
            raise

    # ------------------------------------------------------------------
    # Read methods
    # ------------------------------------------------------------------

    def test_auth(self) -> dict:
        """Return current user info to verify credentials."""
        return self._get("users/me")

    def get_pages(self) -> list:
        return self._get_all_pages("pages", {"_fields": "id,title,slug,link,parent,status,meta,date,modified"})

    def get_posts(self) -> list:
        return self._get_all_pages("posts", {"_fields": "id,title,slug,link,categories,tags,status,meta,date,modified"})

    def get_categories(self) -> list:
        return self._get_all_pages("categories")

    def get_tags(self) -> list:
        return self._get_all_pages("tags")

    def get_types(self) -> dict:
        return self._get("types")

    def get_taxonomies(self) -> dict:
        return self._get("taxonomies")

    def get_media(self) -> list:
        return self._get_all_pages("media", {"_fields": "id,title,slug,source_url,date"})

    def get_namespaces(self) -> list:
        root = self._get("/")
        return root.get("namespaces", [])

    # ------------------------------------------------------------------
    # Look-up by source_id custom field
    # ------------------------------------------------------------------

    def get_by_source_id(self, source_id: str) -> Optional[dict]:
        """Return the first WP page whose _govenics_source_id meta matches source_id."""
        pages = self._get_all_pages(
            "pages",
            {
                "meta_key": WP_SOURCE_ID_META_KEY,
                "meta_value": source_id,
                "_fields": "id,title,slug,link,meta",
            },
        )
        return pages[0] if pages else None

    # ------------------------------------------------------------------
    # Write methods
    # ------------------------------------------------------------------

    def create_page(
        self,
        title: str,
        content: str,
        parent_id: int = 0,
        status: str = "draft",
        slug: str = "",
        meta: Optional[dict] = None,
    ) -> dict:
        data: dict = {
            "title": title,
            "content": content,
            "status": status,
        }
        if parent_id:
            data["parent"] = parent_id
        if slug:
            data["slug"] = slug
        if meta:
            data["meta"] = meta
        result = self._post("pages", data)
        log.info("Created WP page id=%s title=%r", result.get("id"), title)
        return result

    def update_page(self, wp_id: int, fields: dict) -> dict:
        result = self._put(f"pages/{wp_id}", fields)
        log.info("Updated WP page id=%s", wp_id)
        return result

    def create_post(
        self,
        title: str,
        content: str,
        categories: Optional[list] = None,
        tags: Optional[list] = None,
        status: str = "draft",
        slug: str = "",
        meta: Optional[dict] = None,
    ) -> dict:
        data: dict = {
            "title": title,
            "content": content,
            "status": status,
        }
        if categories:
            data["categories"] = categories
        if tags:
            data["tags"] = tags
        if slug:
            data["slug"] = slug
        if meta:
            data["meta"] = meta
        result = self._post("posts", data)
        log.info("Created WP post id=%s title=%r", result.get("id"), title)
        return result

    def ensure_category(self, name: str, slug: str, parent: int = 0) -> int:
        """Return existing category ID or create it. Returns the WP term ID."""
        cats = self._get_all_pages("categories", {"slug": slug})
        if cats:
            return cats[0]["id"]
        data: dict = {"name": name, "slug": slug}
        if parent:
            data["parent"] = parent
        result = self._post("categories", data)
        log.info("Created category id=%s slug=%r", result.get("id"), slug)
        return result["id"]

    def ensure_tag(self, name: str, slug: str) -> int:
        tags = self._get_all_pages("tags", {"slug": slug})
        if tags:
            return tags[0]["id"]
        result = self._post("tags", {"name": name, "slug": slug})
        log.info("Created tag id=%s slug=%r", result.get("id"), slug)
        return result["id"]

    # ------------------------------------------------------------------
    # Full inspection
    # ------------------------------------------------------------------

    def inspect(self) -> dict:
        """Collect full WP state and return as a dict."""
        log.info("Inspecting WordPress site: %s", self._base)
        structure = {
            "api_url": self._base,
            "namespaces": [],
            "current_user": {},
            "post_types": {},
            "taxonomies": {},
            "categories": [],
            "tags": [],
            "pages": [],
            "posts": [],
            "media_count": 0,
        }
        try:
            structure["current_user"] = self.test_auth()
            log.info("Authenticated as: %s", structure["current_user"].get("name"))
        except Exception as exc:
            log.error("Auth failed: %s", exc)
            raise

        structure["namespaces"] = self.get_namespaces()
        structure["post_types"] = self.get_types()
        structure["taxonomies"] = self.get_taxonomies()
        structure["categories"] = self.get_categories()
        structure["tags"] = self.get_tags()
        structure["pages"] = self.get_pages()
        structure["posts"] = self.get_posts()
        media = self.get_media()
        structure["media_count"] = len(media)

        log.info(
            "Inspection complete: %d pages, %d posts, %d categories, %d tags",
            len(structure["pages"]),
            len(structure["posts"]),
            len(structure["categories"]),
            len(structure["tags"]),
        )
        return structure


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="WordPress REST API client for GOVENICS CMS Sync")
    parser.add_argument("--inspect", action="store_true", help="Inspect WP and write output JSON")
    parser.add_argument("--test-auth", action="store_true", help="Verify credentials only")
    args = parser.parse_args()

    client = WordPressClient()

    if args.test_auth:
        user = client.test_auth()
        print(f"✅ Authenticated as: {user.get('name')} (ID {user.get('id')}, roles: {user.get('roles')})")

    elif args.inspect:
        structure = client.inspect()
        WP_STRUCTURE_JSON.write_text(json.dumps(structure, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"✅ WordPress structure written to: {WP_STRUCTURE_JSON}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()


"""
Robust WordPress REST API v2 client and services.
Supports content ingestion, metadata, categories, tags, media upload, and health check.
"""
import base64
import json
import logging
from typing import Dict, Any, List, Optional
import requests

from config import WORDPRESS_API_URL, WORDPRESS_USERNAME, WORDPRESS_APP_PASSWORD

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
log = logging.getLogger("cms_api_service")

class CMSAPIService:
    def __init__(self):
        token = base64.b64encode(f"{WORDPRESS_USERNAME}:{WORDPRESS_APP_PASSWORD}".encode()).decode()
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Basic {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "GOVENICS-CompliancePlatform/2.0"
        })
        self.base_url = WORDPRESS_API_URL

    def health_check(self) -> Dict[str, Any]:
        """Perform API connectivity testing and capability verification."""
        status = {
            "api_reachable": False,
            "authenticated": False,
            "user": None,
            "namespaces": [],
            "endpoints": {}
        }
        try:
            r = self.session.get(f"{self.base_url}/users/me", timeout=10)
            if r.status_code == 200:
                user_data = r.json()
                status["api_reachable"] = True
                status["authenticated"] = True
                status["user"] = {
                    "id": user_data.get("id"),
                    "name": user_data.get("name"),
                    "slug": user_data.get("slug")
                }
            
            # Root namespaces check
            r_root = self.session.get(self.base_url.replace("/wp/v2", ""), timeout=10)
            if r_root.status_code == 200:
                status["namespaces"] = r_root.json().get("namespaces", [])

            # Check post types & taxonomies
            r_types = self.session.get(f"{self.base_url}/types", timeout=10)
            if r_types.status_code == 200:
                status["endpoints"]["post_types"] = list(r_types.json().keys())

            r_tax = self.session.get(f"{self.base_url}/taxonomies", timeout=10)
            if r_tax.status_code == 200:
                status["endpoints"]["taxonomies"] = list(r_tax.json().keys())

        except Exception as exc:
            log.error("Health check error: %s", exc)
            status["error"] = str(exc)

        return status

    def get_categories(self) -> List[Dict[str, Any]]:
        r = self.session.get(f"{self.base_url}/categories?per_page=100", timeout=15)
        return r.json() if r.status_code == 200 else []

    def get_tags(self) -> List[Dict[str, Any]]:
        r = self.session.get(f"{self.base_url}/tags?per_page=100", timeout=15)
        return r.json() if r.status_code == 200 else []

    def ensure_category(self, name: str, slug: str, parent: int = 0) -> int:
        r = self.session.get(f"{self.base_url}/categories?slug={slug}", timeout=10)
        if r.status_code == 200 and r.json():
            return r.json()[0]["id"]
        payload = {"name": name, "slug": slug}
        if parent:
            payload["parent"] = parent
        r_create = self.session.post(f"{self.base_url}/categories", json=payload, timeout=10)
        if r_create.status_code in (200, 201):
            return r_create.json()["id"]
        return 1

    def ensure_tag(self, name: str, slug: str) -> int:
        r = self.session.get(f"{self.base_url}/tags?slug={slug}", timeout=10)
        if r.status_code == 200 and r.json():
            return r.json()[0]["id"]
        r_create = self.session.post(f"{self.base_url}/tags", json={"name": name, "slug": slug}, timeout=10)
        if r_create.status_code in (200, 201):
            return r_create.json()["id"]
        return 0

    def find_post_by_source_id(self, source_id: str) -> Optional[Dict[str, Any]]:
        # Check by search or meta
        r = self.session.get(f"{self.base_url}/posts?search={source_id}", timeout=10)
        if r.status_code == 200 and r.json():
            for post in r.json():
                if source_id in post.get("title", {}).get("rendered", "") or source_id in post.get("content", {}).get("rendered", ""):
                    return post
        return None

    def create_or_update_compliance_record(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update a compliance document record in WordPress."""
        source_id = record.get("document_id")
        title = f"[{record.get('document_type', 'Document').upper()}] {record.get('title')}"
        existing = self.find_post_by_source_id(source_id)

        # Build clean Gutenberg / HTML content with metadata table
        content_html = f"""
        <!-- wp:paragraph -->
        <p class="lead"><strong>Official Compliance Record:</strong> {record.get('title')}</p>
        <!-- /wp:paragraph -->

        <!-- wp:table -->
        <figure class="wp-block-table"><table><tbody>
            <tr><td><strong>Document ID</strong></td><td>{record.get('document_id')}</td></tr>
            <tr><td><strong>Document Type</strong></td><td>{record.get('document_type')}</td></tr>
            <tr><td><strong>Issuing Authority</strong></td><td>{record.get('issuing_authority')}</td></tr>
            <tr><td><strong>Jurisdiction</strong></td><td>{record.get('jurisdiction')} ({record.get('government_level')})</td></tr>
            <tr><td><strong>GOVENICS Offering</strong></td><td>{record.get('offering')}</td></tr>
            <tr><td><strong>Applicable Industry</strong></td><td>{record.get('industry')}</td></tr>
            <tr><td><strong>Publication Date</strong></td><td>{record.get('publication_date')}</td></tr>
            <tr><td><strong>Effective Date</strong></td><td>{record.get('effective_date')}</td></tr>
            <tr><td><strong>Source URL</strong></td><td><a href="{record.get('source_url')}" target="_blank" rel="noopener">Official Portal Link</a></td></tr>
            <tr><td><strong>Verification Status</strong></td><td>{record.get('verification_status')}</td></tr>
        </tbody></table></figure>
        <!-- /wp:table -->

        <!-- wp:heading -->
        <h2>Extracted Regulatory Provisions & Scope</h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph -->
        <p>{record.get('extracted_summary') or record.get('extracted_text', '')[:1200]}</p>
        <!-- /wp:paragraph -->
        """

        cat_id = self.ensure_category(record.get('document_type', 'Acts').title(), record.get('category_slug', 'acts'))
        tag_ids = []
        if record.get('offering'):
            tag_ids.append(self.ensure_tag(record.get('offering'), record.get('offering').lower().replace(' ', '-').replace('&', 'and')))
        if record.get('industry'):
            tag_ids.append(self.ensure_tag(record.get('industry'), record.get('industry').lower().replace(' ', '-').replace('&', 'and')))

        post_data = {
            "title": title,
            "content": content_html,
            "status": record.get("status", "draft"),
            "categories": [cat_id] if cat_id else [],
            "tags": [t for t in tag_ids if t > 0],
            "slug": record.get("slug") or f"doc-{source_id.lower().replace('/', '-').replace(' ', '-')}"
        }

        if existing:
            wp_id = existing["id"]
            r = self.session.put(f"{self.base_url}/posts/{wp_id}", json=post_data, timeout=15)
            action = "updated"
        else:
            r = self.session.post(f"{self.base_url}/posts", json=post_data, timeout=15)
            action = "created"
            wp_id = r.json().get("id") if r.status_code in (200, 201) else None

        return {
            "success": r.status_code in (200, 201),
            "action": action,
            "wp_id": wp_id,
            "status_code": r.status_code,
            "document_id": source_id
        }


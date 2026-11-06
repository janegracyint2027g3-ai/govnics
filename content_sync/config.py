"""
config.py – Central configuration for the GOVENICS CMS Sync pipeline.
Reads all sensitive values from environment variables. Never hardcodes credentials.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).parent
OUTPUT_DIR = BASE_DIR / "output"
LOGS_DIR = BASE_DIR / "logs"
SCHEMAS_DIR = BASE_DIR / "schemas"

OUTPUT_DIR.mkdir(exist_ok=True)
LOGS_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# Load .env files (project root takes precedence over content_sync/.env)
# ---------------------------------------------------------------------------
_project_root = BASE_DIR.parent
load_dotenv(_project_root / ".env.local", override=False)
load_dotenv(_project_root / ".env", override=False)
load_dotenv(BASE_DIR / ".env", override=False)

# ---------------------------------------------------------------------------
# WordPress CMS credentials  (never logged / never committed)
# ---------------------------------------------------------------------------
WORDPRESS_API_URL: str = os.environ.get(
    "WORDPRESS_API_URL", "https://cms.govenics.com/wp-json/wp/v2"
).rstrip("/")

WORDPRESS_USERNAME: str = os.environ.get("WORDPRESS_USERNAME", "")
# Normalize app password: remove whitespace so Basic-Auth header is clean.
WORDPRESS_APP_PASSWORD: str = "".join(
    os.environ.get("WORDPRESS_APP_PASSWORD", "").split()
)

# ---------------------------------------------------------------------------
# Source website
# ---------------------------------------------------------------------------
SOURCE_URL: str = "https://govnics-murex.vercel.app"
SOURCE_SITEMAP: str = f"{SOURCE_URL}/sitemap.xml"
SOURCE_ROBOTS: str = f"{SOURCE_URL}/robots.txt"

# ---------------------------------------------------------------------------
# Crawl settings
# ---------------------------------------------------------------------------
CRAWL_RATE_LIMIT_SECONDS: float = 1.0   # seconds between requests
CRAWL_MAX_RETRIES: int = 3
CRAWL_TIMEOUT_MS: int = 30_000           # Playwright timeout in ms
CRAWL_HEADLESS: bool = True

# ---------------------------------------------------------------------------
# Output file paths
# ---------------------------------------------------------------------------
HIERARCHY_JSON = OUTPUT_DIR / "govenics_digital_presence.json"
WP_STRUCTURE_JSON = OUTPUT_DIR / "wordpress_existing_structure.json"
CMS_MAPPING_JSON = OUTPUT_DIR / "govenics_cms_mapping.json"
PREV_SNAPSHOT_JSON = OUTPUT_DIR / "previous_snapshot.json"
SYNC_REPORT_JSON = OUTPUT_DIR / "sync_report.json"
SYNC_REPORT_MD = OUTPUT_DIR / "sync_report.md"
HIERARCHY_SCHEMA = SCHEMAS_DIR / "hierarchy_schema.json"

# ---------------------------------------------------------------------------
# Custom field key stored in every WordPress page/post for idempotency
# ---------------------------------------------------------------------------
WP_SOURCE_ID_META_KEY = "_govenics_source_id"
WP_CONTENT_HASH_META_KEY = "_govenics_content_hash"

# ---------------------------------------------------------------------------
# Validation helpers
# ---------------------------------------------------------------------------

def validate_config() -> None:
    """Raise EnvironmentError if critical variables are missing."""
    missing = []
    if not WORDPRESS_USERNAME:
        missing.append("WORDPRESS_USERNAME")
    if not WORDPRESS_APP_PASSWORD:
        missing.append("WORDPRESS_APP_PASSWORD")
    if missing:
        raise EnvironmentError(
            f"Missing required environment variables: {', '.join(missing)}. "
            "Set them in .env.local or export them before running."
        )


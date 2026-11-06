# GOVENICS Digital Presence -> WordPress CMS Sync Pipeline

Automated extraction, JSON hierarchy modelling, and continuous synchronization engine from the live GOVENICS digital presence (`https://govnics-murex.vercel.app/`) to the WordPress CMS (`https://cms.govenics.com/`).

## Architecture & Directory Layout

```
content_sync/
├── config.py                 # Central configuration and secret normalization
├── wordpress_client.py       # Authenticated WP REST API v2 client
├── website_crawler.py        # Playwright headless crawler for client-side rendered apps
├── content_parser.py         # DOM parser, heading tree generator, component type detector
├── hierarchy_extractor.py    # Extraction orchestrator producing govenics_digital_presence.json
├── schemas/
│   └── hierarchy_schema.json # JSON Schema (Draft-07) specification
├── json_validator.py         # Automated schema validation script
├── cms_structure_creator.py  # Hierarchy replication engine in WordPress
├── change_detector.py        # Hash-based differential detector
├── content_synchronizer.py   # Full sync engine (Extract -> Diff -> Apply -> Report)
├── output/                   # Generated artifacts (JSON snapshots, mappings, reports)
├── logs/                     # Rotation and execution logs
├── tests/                    # Pytest test suite
└── requirements.txt          # Python dependencies
```

## Quick Start

### 1. Install Dependencies
```bash
pip install -r content_sync/requirements.txt
playwright install chromium
```

### 2. Verify WordPress Connectivity
```bash
python content_sync/wordpress_client.py --test-auth
python content_sync/wordpress_client.py --inspect
```

### 3. Extract Website Hierarchy
```bash
python content_sync/hierarchy_extractor.py
python content_sync/json_validator.py
```

### 4. Create CMS Structure (Dry-run by default)
```bash
# Dry run
python content_sync/cms_structure_creator.py

# Live execution in WordPress
python content_sync/cms_structure_creator.py --execute
```

### 5. Run Full Synchronization Engine
```bash
# Dry run
python content_sync/content_synchronizer.py

# Live sync
python content_sync/content_synchronizer.py --execute
```

## Safety Guarantees
- **No Production Deletions**: Pages removed from the digital presence are flagged and archived, never hard-deleted from WordPress.
- **Idempotency**: All created pages carry unique `_govenics_source_id` and `_govenics_content_hash` meta tags to prevent duplicates and skip redundant writes.
- **Credential Protection**: Application passwords and API credentials are read strictly from environment variables and sanitized against logs.


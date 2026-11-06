import json
from pathlib import Path
import jsonschema
from config import HIERARCHY_SCHEMA

def test_hierarchy_schema():
    assert HIERARCHY_SCHEMA.exists()
    schema = json.loads(HIERARCHY_SCHEMA.read_text(encoding="utf-8"))

    valid_payload = {
        "source": "https://govnics-murex.vercel.app",
        "extraction_timestamp": "2026-11-06T12:00:00Z",
        "total_pages": 1,
        "flat_pages": [
            {
                "source_id": "abc123456789",
                "url": "https://govnics-murex.vercel.app/about",
                "slug": "about",
                "title": "About Us",
                "page_type": "about",
                "content_hash": "abcdef1234567890",
                "crawled_at": "2026-11-06T12:00:00Z"
            }
        ]
    }
    jsonschema.validate(instance=valid_payload, schema=schema)


from unittest.mock import patch, MagicMock
from cms_structure_creator import CMSStructureCreator, generate_page_html

def test_generate_page_html():
    page_data = {
        "meta_description": "Comprehensive compliance platform.",
        "sections": [
            {
                "heading": "Enterprise Suite",
                "text_preview": "Leading enterprise governance tools.",
                "component_type": "cards",
                "list_items": ["Feature A", "Feature B"]
            }
        ]
    }
    html = generate_page_html(page_data)
    assert "Comprehensive compliance platform." in html
    assert "Enterprise Suite" in html
    assert "<li>Feature A</li>" in html

def test_cms_structure_creator_dry_run():
    hierarchy_data = {
        "flat_pages": [
            {
                "source_id": "p1",
                "slug": "home",
                "path": "/",
                "title": "Home",
                "depth": 0,
                "content_hash": "hash1"
            },
            {
                "source_id": "p2",
                "slug": "about",
                "path": "/about",
                "title": "About",
                "parent_path": "/",
                "depth": 1,
                "content_hash": "hash2"
            }
        ]
    }
    creator = CMSStructureCreator(dry_run=True)
    mapping = creator.execute(hierarchy_data)

    assert mapping["summary"]["created"] == 2
    assert "p1" in mapping["pages_mapped"]
    assert "p2" in mapping["pages_mapped"]


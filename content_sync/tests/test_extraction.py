import pytest
from unittest.mock import MagicMock
from content_parser import parse_html, enrich_page_data, build_hierarchy, stable_section_id

def test_stable_section_id():
    id1 = stable_section_id("https://govenics.com/about", 0)
    id2 = stable_section_id("https://govenics.com/about", 0)
    id3 = stable_section_id("https://govenics.com/about", 1)
    assert id1 == id2
    assert id1 != id3
    assert len(id1) == 12

def test_parse_html():
    sample_html = """
    <html>
      <body>
        <section class="hero-banner">
          <h1>Welcome to GOVENICS</h1>
          <p>Global regulatory compliance platform for modern enterprises.</p>
          <a href="/contact">Get Started</a>
        </section>
        <section class="features">
          <h2>Core Offerings</h2>
          <p>Explore our deep regulatory solutions.</p>
          <ul>
            <li>Labour & Employment</li>
            <li>Environmental EHS</li>
          </ul>
        </section>
      </body>
    </html>
    """
    blocks = parse_html(sample_html, "https://govenics.com")
    assert len(blocks) >= 2
    assert blocks[0]["heading"] == "Welcome to GOVENICS"
    assert blocks[0]["component_type"] == "hero"
    assert blocks[0]["has_cta"] is True
    assert blocks[1]["heading"] == "Core Offerings"
    assert len(blocks[1]["list_items"]) == 2

def test_build_hierarchy():
    pages = [
        {"source_id": "111", "url": "https://govnics-murex.vercel.app/", "slug": "home", "http_status": 200},
        {"source_id": "222", "url": "https://govnics-murex.vercel.app/services", "slug": "services", "http_status": 200},
        {"source_id": "333", "url": "https://govnics-murex.vercel.app/services/compliance", "slug": "services-compliance", "http_status": 200},
    ]
    hierarchy = build_hierarchy(pages)
    assert hierarchy["total_pages"] == 3
    assert len(hierarchy["hierarchy"]) >= 1


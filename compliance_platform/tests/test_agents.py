"""
Unit tests for GOVENICS Content Extraction and Content Nurturing Agents.
"""

import sys
from pathlib import Path
import pytest

sys.path.append(str(Path(__file__).resolve().parent.parent))

from agents.content_extraction_agent import ContentExtractionAgent, ExtractedContentRecord
from agents.content_nurturing_agent import ContentNurturingAgent, NurturedContentAsset


SAMPLE_LEGAL_TEXT = """
THE EMPLOYEES' PROVIDENT FUNDS AND MISCELLANEOUS PROVISIONS ACT, 1952
Ministry of Labour & Employment

Section 6 - Contributions and matters which may be provided for in Schemes
The contribution which shall be paid by the employer to the Fund shall be ten per cent. of the basic wages, dearness allowance and retaining allowance.

Section 14 - Penalties
Whoever, for the purpose of avoiding any payment to be made, knowingly makes or causes to be made any false statement or false representation shall be punishable with imprisonment for a term which may extend to one year, or with fine of ₹5,000, or with both.
"""


def test_content_extraction_agent_parses_provisions_and_penalties():
    extractor = ContentExtractionAgent()
    record = extractor.extract_from_text(
        SAMPLE_LEGAL_TEXT,
        title="Employees' Provident Funds Act, 1952"
    )

    assert isinstance(record, ExtractedContentRecord)
    assert record.content_id.startswith("EXT-")
    assert record.document_type == "Acts"
    assert record.issuing_authority == "Ministry of Labour & Employment"
    assert len(record.provisions) >= 2
    assert any("Section 6" in p["section_number"] for p in record.provisions)
    assert any("Section 14" in p["section_number"] for p in record.provisions)
    assert len(record.penalties_summary) >= 1
    assert "Labour & Employment" in record.applicable_offerings


def test_content_nurturing_agent_synthesizes_assets():
    extractor = ContentExtractionAgent()
    nurturer = ContentNurturingAgent(auto_publish_to_cms=False)

    record = extractor.extract_from_text(
        SAMPLE_LEGAL_TEXT,
        title="Employees' Provident Funds Act, 1952"
    )

    asset = nurturer.nurture_content(record, publish=False)

    assert isinstance(asset, NurturedContentAsset)
    assert asset.asset_id.startswith("NURT-")
    assert len(asset.executive_summary) > 50
    assert len(asset.compliance_checklist) >= 2
    assert len(asset.advisory_faqs) >= 2
    assert len(asset.linkedin_snippets) == 2
    assert "Employees' Provident Funds Act, 1952" in asset.seo_metadata["focus_keyword"]
    assert "<table" in asset.html_article
    assert asset.publishing_status in ["STAGED", "DRAFT"]


if __name__ == "__main__":
    test_content_extraction_agent_parses_provisions_and_penalties()
    test_content_nurturing_agent_synthesizes_assets()
    print("All agent unit tests passed!")

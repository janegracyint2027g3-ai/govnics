"""
GOVENICS GRC — Content Extraction & Nurturing Pipeline Runner
Unified CLI and programmatic runner to extract compliance content and nurture it into
executive articles, statutory checklists, and WordPress CMS publications.
"""

import argparse
import json
import logging
from pathlib import Path
import sys

# Ensure root is in sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from agents.content_extraction_agent import ContentExtractionAgent, ExtractedContentRecord
from agents.content_nurturing_agent import ContentNurturingAgent, NurturedContentAsset

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
log = logging.getLogger("agent_runner")


def run_pipeline_for_text(text: str, title: str = "", publish: bool = False):
    extractor = ContentExtractionAgent()
    nurturer = ContentNurturingAgent(auto_publish_to_cms=publish)

    log.info("[Pipeline] Step 1: Extracting compliance intelligence...")
    extracted = extractor.extract_from_text(text, title=title)
    print(f"✅ Extracted: {extracted.title} ({extracted.content_id})")
    print(f"   Provisions: {len(extracted.provisions)}, Penalties: {len(extracted.penalties_summary)}")

    log.info("[Pipeline] Step 2: Nurturing content into executive assets...")
    asset = nurturer.nurture_content(extracted, publish=publish)
    print(f"✅ Nurtured: {asset.title} ({asset.asset_id})")
    print(f"   Checklist items: {len(asset.compliance_checklist)}")
    print(f"   Advisory FAQs: {len(asset.advisory_faqs)}")
    print(f"   LinkedIn Snippets: {len(asset.linkedin_snippets)}")
    if asset.wp_post_url:
        print(f"🚀 Published to WordPress CMS: {asset.wp_post_url}")
    return asset


def run_pipeline_for_file(file_path: str, publish: bool = False):
    path = Path(file_path)
    extractor = ContentExtractionAgent()
    nurturer = ContentNurturingAgent(auto_publish_to_cms=publish)

    log.info("[Pipeline] Ingesting file: %s", path.name)
    extracted = extractor.extract_from_file(str(path))
    print(f"✅ Extracted: {extracted.title} ({extracted.content_id})")

    asset = nurturer.nurture_content(extracted, publish=publish)
    print(f"✅ Nurtured: {asset.title} ({asset.asset_id})")
    if asset.wp_post_url:
        print(f"🚀 Published to WordPress CMS: {asset.wp_post_url}")
    return asset


def run_pipeline_for_url(url: str, publish: bool = False):
    extractor = ContentExtractionAgent()
    nurturer = ContentNurturingAgent(auto_publish_to_cms=publish)

    log.info("[Pipeline] Ingesting URL: %s", url)
    extracted = extractor.extract_from_url(url)
    print(f"✅ Extracted: {extracted.title} ({extracted.content_id})")

    asset = nurturer.nurture_content(extracted, publish=publish)
    print(f"✅ Nurtured: {asset.title} ({asset.asset_id})")
    if asset.wp_post_url:
        print(f"🚀 Published to WordPress CMS: {asset.wp_post_url}")
    return asset


def main():
    parser = argparse.ArgumentParser(description="GOVENICS Content Extraction & Nurturing Pipeline Runner")
    parser.add_argument("--url", help="URL to extract and nurture")
    parser.add_argument("--file", help="File to extract and nurture")
    parser.add_argument("--text", help="Raw text string to extract and nurture")
    parser.add_argument("--title", default="", help="Document title override")
    parser.add_argument("--publish", action="store_true", help="Publish directly to WordPress CMS")
    parser.add_argument("--demo", action="store_true", help="Run end-to-end pipeline self-test")
    args = parser.parse_args()

    if args.url:
        run_pipeline_for_url(args.url, publish=args.publish)
    elif args.file:
        run_pipeline_for_file(args.file, publish=args.publish)
    elif args.text:
        run_pipeline_for_text(args.text, title=args.title, publish=args.publish)
    elif args.demo:
        demo = """
        ENVIRONMENT (PROTECTION) ACT, 1986
        Central Pollution Control Board

        Section 7 - Persons carrying on industry, etc., not to allow emission or discharge of environmental pollutants in excess of the standards
        No person carrying on any industry, operation or process shall discharge or emit or permit to be discharged or emitted any environmental pollutant in excess of such standards as may be prescribed.

        Section 9 - Furnishing of information to authorities and agencies in certain cases
        Where the discharge of any environmental pollutant in excess of the prescribed standards occurs or is apprehended to occur due to any accident, the person responsible shall be bound to prevent or mitigate the pollutant and forthwith inform the authorities.

        Section 15 - Penalty for contravention of the provisions of the Act
        Whoever fails to comply with or contravenes any of the provisions of this Act shall, in respect of each such failure or contravention, be punishable with imprisonment for a term which may extend to five years or with fine which may extend to one lakh rupees, or with both.
        In case the failure continues beyond a period of one year after the date of conviction, the offender shall be punishable with imprisonment for a term which may extend to seven years.
        """
        run_pipeline_for_text(demo, title="The Environment (Protection) Act, 1986", publish=args.publish)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()

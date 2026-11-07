"""
GOVENICS GRC — Content Extraction Agent
Autonomous agent for discovering, parsing, and structuring compliance content,
regulatory rules, statutory provisions, legal circulars, gazettes, policies,
and educational articles from government portals, raw text, and file repositories.
"""

from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
import hashlib
import json
import logging
from pathlib import Path
import re
from typing import Dict, Any, List, Optional
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

# Try importing configuration
try:
    from config import GOVENICS_OFFERINGS, GOVENICS_INDUSTRIES, REPORTS_DIR
except ImportError:
    import sys
    sys.path.append(str(Path(__file__).resolve().parent.parent))
    from config import GOVENICS_OFFERINGS, GOVENICS_INDUSTRIES, REPORTS_DIR

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
log = logging.getLogger("content_extraction_agent")

EXTRACTED_CONTENT_DIR = REPORTS_DIR / "extracted_content"
EXTRACTED_CONTENT_DIR.mkdir(parents=True, exist_ok=True)


# ─── Canonical Extracted Content Schema ───────────────────────────────────────

@dataclass
class StatutoryProvision:
    section_number: str
    section_title: str
    provision_text: str
    obligation_type: str  # Mandatory | Directory | Prohibition | Exemption
    penalties: List[str] = field(default_factory=list)
    evidence_required: List[str] = field(default_factory=list)
    filing_frequency: Optional[str] = None


@dataclass
class ExtractedContentRecord:
    content_id: str
    source_type: str  # URL | TEXT | FILE | RSS
    source_origin: str
    title: str
    document_type: str  # Acts | Regulations | Notifications | E-Books | Articles & Blogs | Checklists
    issuing_authority: str
    jurisdiction: str
    government_level: str  # Central | State | Municipal | International
    enactment_year: Optional[int]
    effective_date: Optional[str]
    clean_text: str
    summary: str
    provisions: List[Dict[str, Any]] = field(default_factory=list)
    applicable_offerings: List[str] = field(default_factory=list)
    applicable_industries: List[str] = field(default_factory=list)
    penalties_summary: List[str] = field(default_factory=list)
    statutory_forms: List[str] = field(default_factory=list)
    fingerprint: str = ""
    extracted_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    validation_status: str = "VALIDATED"
    extraction_metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


# ─── Known Regulators & Authorities Mapping ──────────────────────────────────

KNOWN_AUTHORITIES = {
    "Ministry of Labour & Employment": ["labour", "employment", "epfo", "esic", "factories", "minimum wages", "gratuity", "bonus", "posh"],
    "Ministry of Corporate Affairs": ["mca", "companies act", "roc", "director", "incorporation", "board of directors", "aoc-4", "mgt-7"],
    "Reserve Bank of India": ["rbi", "banking", "nbfc", "monetary", "fema", "cross-border payment", "foreign exchange"],
    "Securities and Exchange Board of India": ["sebi", "listing", "insider trading", "lodr", "mutual fund", "stock exchange"],
    "Ministry of Electronics & Information Technology": ["meity", "cert-in", "cybersecurity", "dpdp", "data protection", "information technology act"],
    "Central Pollution Control Board": ["cpcb", "spcb", "pollution", "air act", "water act", "environmental", "hazardous waste", "epr"],
    "Food Safety and Standards Authority of India": ["fssai", "food safety", "food adulteration", "food license"],
    "Directorate General of Foreign Trade": ["dgft", "export", "import", "customs", "iec code", "foreign trade policy"],
    "Department for Promotion of Industry and Internal Trade": ["dpiit", "fdi", "industrial license", "startup india", "patents", "trademark"],
    "Insurance Regulatory and Development Authority": ["irdai", "insurance", "reinsurance", "underwriting"]
}


# ─── Content Extraction Agent Implementation ───────────────────────────────────

class ContentExtractionAgent:
    """
    Autonomous Content Extraction Agent for statutory compliance intelligence.
    Extracts, deduplicates, and structures statutory provisions and business articles.
    """

    def __init__(self, output_dir: Optional[Path] = None):
        self.output_dir = output_dir or EXTRACTED_CONTENT_DIR
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 GOVENICS-ComplianceBot/2.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        })

    # ── 1. Extract from Web URL ───────────────────────────────────────────────

    def extract_from_url(self, url: str, custom_hints: Optional[Dict[str, Any]] = None) -> ExtractedContentRecord:
        """Fetch a live URL, strip clutter, parse structure, and extract compliance fields."""
        log.info("[ContentExtractionAgent] Extracting content from URL: %s", url)
        try:
            resp = self.session.get(url, timeout=15)
            resp.raise_for_status()
            html = resp.text
        except Exception as err:
            log.error("[ContentExtractionAgent] Failed to fetch URL %s: %s", url, err)
            raise RuntimeError(f"URL extraction failed: {err}")

        soup = BeautifulSoup(html, "html.parser")

        # 1. Remove noise elements
        for tag in soup(["script", "style", "nav", "header", "footer", "aside", "noscript", "iframe"]):
            tag.decompose()

        # 2. Extract Document Title
        title = ""
        if soup.title and soup.title.string:
            title = soup.title.string.strip()
        h1 = soup.find("h1")
        if h1 and h1.get_text():
            title = h1.get_text().strip()

        # 3. Clean Text
        body = soup.find("main") or soup.find("article") or soup.find("body") or soup
        clean_text = "\n".join([line.strip() for line in body.get_text(separator="\n").splitlines() if line.strip()])

        return self._process_text_content(
            clean_text=clean_text,
            source_type="URL",
            source_origin=url,
            fallback_title=title or urlparse(url).path.split("/")[-1] or "Extracted Regulatory Document",
            custom_hints=custom_hints
        )

    # ── 2. Extract from Raw Text ──────────────────────────────────────────────

    def extract_from_text(self, raw_text: str, title: str = "", metadata: Optional[Dict[str, Any]] = None) -> ExtractedContentRecord:
        """Extract compliance entities and provisions directly from raw text."""
        log.info("[ContentExtractionAgent] Extracting content from raw text (%d characters)", len(raw_text))
        return self._process_text_content(
            clean_text=raw_text.strip(),
            source_type="TEXT",
            source_origin="Raw Text Input",
            fallback_title=title or "Structured Compliance Document",
            custom_hints=metadata
        )

    # ── 3. Extract from File (Markdown / HTML / JSON / Text) ───────────────────

    def extract_from_file(self, file_path: str, metadata: Optional[Dict[str, Any]] = None) -> ExtractedContentRecord:
        """Extract compliance content from local files."""
        path = Path(file_path)
        log.info("[ContentExtractionAgent] Extracting content from file: %s", path.name)
        if not path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        content = path.read_text(encoding="utf-8", errors="replace")

        # If HTML file, clean with BeautifulSoup
        if path.suffix.lower() in [".html", ".htm"]:
            soup = BeautifulSoup(content, "html.parser")
            for tag in soup(["script", "style", "nav", "header", "footer"]):
                tag.decompose()
            clean_text = soup.get_text(separator="\n")
            doc_title = (soup.title.string if soup.title else "") or path.stem.replace("_", " ").title()
        else:
            clean_text = content
            doc_title = path.stem.replace("_", " ").title()

        return self._process_text_content(
            clean_text=clean_text,
            source_type="FILE",
            source_origin=str(path.resolve()),
            fallback_title=doc_title,
            custom_hints=metadata
        )

    # ── 4. Batch Extraction ───────────────────────────────────────────────────

    def batch_extract_from_directory(self, dir_path: str, extensions: Optional[List[str]] = None) -> List[ExtractedContentRecord]:
        """Scan a folder and extract all matching documents."""
        folder = Path(dir_path)
        exts = extensions or [".md", ".txt", ".html", ".json"]
        records = []
        log.info("[ContentExtractionAgent] Starting batch extraction in: %s", folder)

        for file in folder.rglob("*"):
            if file.suffix.lower() in exts:
                try:
                    record = self.extract_from_file(str(file))
                    records.append(record)
                except Exception as e:
                    log.warning("[ContentExtractionAgent] Skipping file %s due to error: %s", file.name, e)

        log.info("[ContentExtractionAgent] Batch extraction complete: %d records extracted", len(records))
        return records

    # ── Internal Core Processing & Entity Extraction Engine ───────────────────

    def _process_text_content(
        self,
        clean_text: str,
        source_type: str,
        source_origin: str,
        fallback_title: str,
        custom_hints: Optional[Dict[str, Any]] = None
    ) -> ExtractedContentRecord:
        hints = custom_hints or {}

        # 1. Title Resolution
        title = hints.get("title") or fallback_title
        # Check first line if markdown heading
        first_line = clean_text.splitlines()[0] if clean_text.splitlines() else ""
        if first_line.startswith("# ") and len(first_line) > 3:
            title = first_line.replace("# ", "").strip()

        # 2. Document Type Classification
        doc_type = hints.get("document_type") or self._classify_document_type(title, clean_text)

        # 3. Issuing Authority Resolution
        authority = hints.get("issuing_authority") or self._detect_authority(title, clean_text)

        # 4. Jurisdiction & Level
        jurisdiction, gov_level = self._detect_jurisdiction(title, clean_text, hints)

        # 5. Dates & Enactment Year
        enactment_year = self._detect_enactment_year(title, clean_text)
        effective_date = hints.get("effective_date") or self._detect_effective_date(clean_text)

        # 6. Structured Sections / Provisions Extraction
        provisions = self._extract_provisions(clean_text)

        # 7. Penalties & Legal Sanctions
        penalties = self._extract_penalties(clean_text)

        # 8. Statutory Forms & Registers
        statutory_forms = self._extract_statutory_forms(clean_text)

        # 9. Offerings & Industries Mapping
        offerings = self._classify_offerings(title, clean_text, hints)
        industries = self._classify_industries(title, clean_text, hints)

        # 10. Summary Extraction
        summary = hints.get("summary") or self._generate_extractive_summary(clean_text)

        # 11. Cryptographic Fingerprint for Deduplication
        fingerprint = hashlib.sha256(f"{title}::{clean_text[:1000]}".encode("utf-8")).hexdigest()

        # 12. Unique Content ID
        safe_prefix = re.sub(r"[^A-Za-z0-9]", "", title[:12]).upper()
        content_id = f"EXT-{safe_prefix}-{fingerprint[:8]}"

        record = ExtractedContentRecord(
            content_id=content_id,
            source_type=source_type,
            source_origin=source_origin,
            title=title,
            document_type=doc_type,
            issuing_authority=authority,
            jurisdiction=jurisdiction,
            government_level=gov_level,
            enactment_year=enactment_year,
            effective_date=effective_date,
            clean_text=clean_text,
            summary=summary,
            provisions=[asdict(p) if isinstance(p, StatutoryProvision) else p for p in provisions],
            applicable_offerings=offerings,
            applicable_industries=industries,
            penalties_summary=penalties,
            statutory_forms=statutory_forms,
            fingerprint=fingerprint,
            extraction_metadata={
                "char_count": len(clean_text),
                "word_count": len(clean_text.split()),
                "provisions_count": len(provisions),
                "penalties_count": len(penalties),
                "forms_count": len(statutory_forms)
            }
        )

        # Persist extracted record to JSON
        self._persist_record(record)
        return record

    # ── Entity Classifiers & Regex Parsers ─────────────────────────────────────

    def _classify_document_type(self, title: str, text: str) -> str:
        combined = f"{title}\n{text[:1000]}".lower()
        if any(w in combined for w in ["act, 19", "act, 20", "amendment act", "statute"]):
            return "Acts"
        if any(w in combined for w in ["regulation", "regulations, 20", "rules, 19", "rules, 20"]):
            return "Regulations"
        if any(w in combined for w in ["notification", "circular", "gazette notification", "order no"]):
            return "Notifications"
        if any(w in combined for w in ["handbook", "guide", "e-book", "comprehensive manual"]):
            return "E-Books"
        if any(w in combined for w in ["checklist", "audit checklist", "compliance register"]):
            return "Checklists"
        return "Articles & Blogs"

    def _detect_authority(self, title: str, text: str) -> str:
        combined = f"{title}\n{text[:2500]}".lower()
        for authority, keywords in KNOWN_AUTHORITIES.items():
            if any(k in combined for k in keywords):
                return authority
        return "Appropriate Statutory Authority"

    def _detect_jurisdiction(self, title: str, text: str, hints: Dict[str, Any]) -> tuple:
        if hints.get("jurisdiction"):
            return hints["jurisdiction"], hints.get("government_level", "Central")

        combined = f"{title}\n{text[:2000]}".lower()
        indian_states = [
            "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Delhi", "Haryana",
            "Uttar Pradesh", "Telangana", "West Bengal", "Rajasthan", "Kerala"
        ]
        for state in indian_states:
            if state.lower() in combined:
                return f"{state} (State)", "State"

        if any(w in combined for w in ["india", "central", "parliament", "union", "president of india"]):
            return "India (Central)", "Central"

        return "India (Central)", "Central"

    def _detect_enactment_year(self, title: str, text: str) -> Optional[int]:
        match = re.search(r"\b(19\d{2}|20\d{2})\b", title)
        if match:
            return int(match.group(1))
        match_body = re.search(r"(?:enacted|notified|promulgated|commenced)\s+(?:in|on|dated)?\s*.*?\b(19\d{2}|20\d{2})\b", text[:2000], re.IGNORECASE)
        if match_body:
            return int(match_body.group(1))
        return None

    def _detect_effective_date(self, text: str) -> Optional[str]:
        match = re.search(r"(?:effective from|commences on|force on)\s*([0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+[0-9]{4})", text[:3000], re.IGNORECASE)
        if match:
            return match.group(1)
        return None

    def _extract_provisions(self, text: str) -> List[StatutoryProvision]:
        provisions = []
        # Pattern to capture Section / Rule provisions
        pattern = re.compile(
            r"(?:Section|Sec\.|Clause|Rule)\s*(\d+[A-Za-z]?(?:\(\d+\))*)\s*[-:–—.]\s*([^\n\r]+)",
            re.IGNORECASE
        )
        matches = pattern.finditer(text)
        seen = set()

        for m in matches:
            sec_num = m.group(1).strip()
            sec_title = m.group(2).strip()
            if sec_num in seen:
                continue
            seen.add(sec_num)

            start = m.end()
            # Capture following 400 characters of provision body
            prov_text = text[start:start + 400].split("\n\n")[0].strip()

            # Detect obligation modality
            lower_body = prov_text.lower()
            if any(w in lower_body for w in ["shall not", "prohibited", "no person shall"]):
                obligation = "Prohibition"
            elif any(w in lower_body for w in ["shall", "must", "mandatorily", "is required to"]):
                obligation = "Mandatory"
            elif any(w in lower_body for w in ["exempt", "nothing in this section shall apply"]):
                obligation = "Exemption"
            else:
                obligation = "Directory"

            provisions.append(StatutoryProvision(
                section_number=f"Section {sec_num}",
                section_title=sec_title,
                provision_text=prov_text or f"Statutory obligation specified under Section {sec_num} ({sec_title}).",
                obligation_type=obligation,
                filing_frequency=self._detect_frequency(prov_text)
            ))
            if len(provisions) >= 25:
                break

        return provisions

    def _extract_penalties(self, text: str) -> List[str]:
        penalties = []
        patterns = [
            r"(?:punishable with|fine which may extend to|imprisonment for a term which may extend to|penalty of)[^\n\.\;]{5,150}",
            r"(?:₹|Rs\.?)\s*[\d,]+(?:\s*(?:lakh|crore))?",
            r"compounding of offenc[e|es][^\n\.\;]{0,100}"
        ]
        for pat in patterns:
            for match in re.finditer(pat, text, re.IGNORECASE):
                p_text = match.group(0).strip()
                if p_text not in penalties and len(p_text) > 5:
                    penalties.append(p_text)
                if len(penalties) >= 8:
                    break
        return penalties

    def _extract_statutory_forms(self, text: str) -> List[str]:
        forms = []
        matches = re.findall(r"\b(?:Form|Schedule|Annexure)\s+[A-Z0-9\-]+", text, re.IGNORECASE)
        for f in matches:
            clean_form = f.strip().upper()
            if clean_form not in forms:
                forms.append(clean_form)
            if len(forms) >= 10:
                break
        return forms

    def _detect_frequency(self, text: str) -> Optional[str]:
        lower = text.lower()
        if "annual" in lower or "yearly" in lower:
            return "Annual"
        if "half-yearly" in lower or "biannual" in lower:
            return "Half-Yearly"
        if "quarter" in lower:
            return "Quarterly"
        if "month" in lower:
            return "Monthly"
        if "prior to" in lower or "within 30 days" in lower:
            return "Event-Driven"
        return None

    def _classify_offerings(self, title: str, text: str, hints: Dict[str, Any]) -> List[str]:
        if hints.get("applicable_offerings"):
            return hints["applicable_offerings"]

        matched = []
        combined = f"{title}\n{text[:3000]}".lower()

        offering_keywords = {
            "Regulatory Compliance": ["statutory", "compliance", "register", "inspection", "mca", "licensing"],
            "Labour & Employment": ["labour", "employment", "wages", "epfo", "esic", "factories", "gratuity", "posh", "workman"],
            "Environmental & EHS": ["environment", "pollution", "cpcb", "spcb", "hazardous waste", "emission", "effluent", "water act"],
            "Licensing & Permits": ["license", "permit", "clearance", "consent to operate", "trade license", "fssai"],
            "Taxation & Trade": ["gst", "taxation", "income tax", "tds", "transfer pricing"],
            "Supply Chain Compliance": ["vendor", "contractor", "supply chain", "clra", "third party audit"],
            "Enterprise Governance": ["board of directors", "corporate governance", "independent director", "secretarial audit"],
            "Risk Management": ["risk", "mitigation", "internal controls", "iso 31000", "audit committee"],
            "ESG & Sustainability": ["esg", "brsr", "carbon", "sustainability", "csr", "scope 1", "greenhouse"],
            "Cybersecurity & Privacy": ["dpdp", "data privacy", "cybersecurity", "cert-in", "iso 27001", "vulnerability", "infosec"]
        }

        for off, kws in offering_keywords.items():
            if any(kw in combined for kw in kws):
                matched.append(off)

        return matched or ["Regulatory Compliance"]

    def _classify_industries(self, title: str, text: str, hints: Dict[str, Any]) -> List[str]:
        if hints.get("applicable_industries"):
            return hints["applicable_industries"]

        matched = []
        combined = f"{title}\n{text[:3000]}".lower()

        industry_keywords = {
            "Manufacturing & Industrial": ["manufacturing", "factory", "boiler", "machinery", "industrial plant"],
            "BFSI & Fintech": ["bank", "nbfc", "fintech", "lending", "credit", "financial services"],
            "Healthcare": ["hospital", "clinical", "pharmacy", "medical", "patient"],
            "Pharmaceuticals & Medical Devices": ["pharma", "drug", "clinical trial", "medical device"],
            "IT & Technology": ["software", "cloud", "saas", "technology", "data center", "telecom"],
            "Food Processing": ["food", "beverage", "fssai", "cold chain", "packaging"],
            "Logistics & Supply Chain": ["warehouse", "transport", "freight", "logistics", "shipping"]
        }

        for ind, kws in industry_keywords.items():
            if any(kw in combined for kw in kws):
                matched.append(ind)

        return matched or ["Cross-Industry"]

    def _generate_extractive_summary(self, text: str) -> str:
        paragraphs = [p.strip() for p in text.split("\n\n") if len(p.strip()) > 80]
        if paragraphs:
            return " ".join(paragraphs[:3])[:750] + "..."
        return text[:500].strip() + "..."

    def _persist_record(self, record: ExtractedContentRecord):
        target_file = self.output_dir / f"{record.content_id}.json"
        try:
            target_file.write_text(json.dumps(record.to_dict(), indent=2, ensure_ascii=False), encoding="utf-8")
            log.info("[ContentExtractionAgent] Record persisted: %s", target_file.name)
        except Exception as e:
            log.error("[ContentExtractionAgent] Failed to persist %s: %s", target_file.name, e)


# ─── Standalone CLI Helper ───────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="GOVENICS Content Extraction Agent CLI")
    parser.add_argument("--url", help="URL to extract compliance content from")
    parser.add_argument("--file", help="Local file path to extract")
    parser.add_argument("--dir", help="Directory path for batch extraction")
    args = parser.parse_args()

    agent = ContentExtractionAgent()
    if args.url:
        rec = agent.extract_from_url(args.url)
        print(f"Extracted: {rec.title} ({rec.content_id}) - {len(rec.provisions)} provisions")
    elif args.file:
        rec = agent.extract_from_file(args.file)
        print(f"Extracted: {rec.title} ({rec.content_id}) - {len(rec.provisions)} provisions")
    elif args.dir:
        recs = agent.batch_extract_from_directory(args.dir)
        print(f"Batch extracted {len(recs)} records.")
    else:
        # Self-test demonstration
        demo_text = """
        THE DIGITAL PERSONAL DATA PROTECTION ACT, 2023
        Ministry of Electronics & Information Technology

        Section 4 - Grounds for processing personal data
        A person may process the personal data of a Data Principal only in accordance with the provisions of this Act and for a lawful purpose for which the Data Principal has given consent.

        Section 8 - General obligations of Data Fiduciary
        A Data Fiduciary shall protect personal data in its possession or under its control by taking reasonable security safeguards to prevent personal data breach.
        Every Data Fiduciary shall publish contact details of a Data Protection Officer.

        Section 33 - Penalties
        Failure to take reasonable security safeguards to prevent data breach shall be punishable with a penalty which may extend to ₹250 crore.
        """
        rec = agent.extract_from_text(demo_text, title="Digital Personal Data Protection Act, 2023")
        print(f"Self-test success: {rec.title} ({rec.content_id}) -> {len(rec.provisions)} provisions, {len(rec.penalties_summary)} penalties.")

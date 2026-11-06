"""
Central configuration for the GOVENICS Compliance Content Platform.
Securely loads WordPress and pipeline credentials from environment.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

# Load environment files
load_dotenv(PROJECT_ROOT / ".env.local", override=False)
load_dotenv(PROJECT_ROOT / ".env", override=False)
load_dotenv(BASE_DIR / ".env", override=False)

WORDPRESS_API_URL = os.environ.get(
    "WORDPRESS_API_URL", "https://cms.govenics.com/wp-json/wp/v2"
).rstrip("/")

WORDPRESS_USERNAME = os.environ.get("WORDPRESS_USERNAME", "gracejane")
WORDPRESS_APP_PASSWORD = "".join(
    os.environ.get("WORDPRESS_APP_PASSWORD", "H1Pv OZk6 makj fefb OLk4 QWe4").split()
)

# Core directories
REPORTS_DIR = BASE_DIR / "reports"
SCHEMAS_DIR = BASE_DIR / "schemas"
DATA_DIR = BASE_DIR / "data"

REPORTS_DIR.mkdir(exist_ok=True)
SCHEMAS_DIR.mkdir(exist_ok=True)
DATA_DIR.mkdir(exist_ok=True)

# 12 GOVENICS Offerings
GOVENICS_OFFERINGS = [
    "Regulatory Compliance",
    "Labour & Employment",
    "Environmental & EHS",
    "Licensing & Permits",
    "Taxation & Trade",
    "Export & Trade Services",
    "Supply Chain Compliance",
    "Escrow Services",
    "Enterprise Governance",
    "Risk Management",
    "ESG & Sustainability",
    "Cybersecurity & Privacy"
]

# 15 Priority Industries
GOVENICS_INDUSTRIES = [
    "Manufacturing & Industrial",
    "Automotive & Auto Components",
    "Pharmaceuticals & Medical Devices",
    "Electronics & Semiconductors",
    "Chemicals & Petrochemicals",
    "Textiles",
    "Food Processing",
    "BFSI & Fintech",
    "Healthcare",
    "IT & Technology",
    "Logistics & Supply Chain",
    "Infrastructure & Construction",
    "Energy & Utilities",
    "Retail & Consumer Goods",
    "Agriculture"
]

"""
json_validator.py – Validates JSON against schemas/hierarchy_schema.json.

Exit codes:
  0 – Validation passed
  1 – Validation failed or file not found
"""
import json
import logging
import sys
from pathlib import Path

import jsonschema
from jsonschema import ValidationError, SchemaError

from config import HIERARCHY_SCHEMA, HIERARCHY_JSON, LOGS_DIR

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "json_validator.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("validator")


def validate_json_file(data_path: Path = HIERARCHY_JSON, schema_path: Path = HIERARCHY_SCHEMA) -> bool:
    """Validate a JSON file against a JSON schema file."""
    if not schema_path.exists():
        log.error("Schema file not found at: %s", schema_path)
        return False

    if not data_path.exists():
        log.error("Data file not found at: %s", data_path)
        return False

    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        data = json.loads(data_path.read_text(encoding="utf-8"))
    except Exception as exc:
        log.error("Failed to parse JSON: %s", exc)
        return False

    try:
        jsonschema.validate(instance=data, schema=schema)
        log.info("Validation PASSED for %s against %s", data_path.name, schema_path.name)
        print(f"✅ Schema validation passed for {data_path.name}")
        return True
    except ValidationError as err:
        log.error("Validation error: %s at path %s", err.message, list(err.path))
        print(f"❌ Validation error: {err.message} at path: {'/'.join(str(p) for p in err.path)}")
        return False
    except SchemaError as err:
        log.error("Invalid schema: %s", err.message)
        print(f"❌ Schema error: {err.message}")
        return False


if __name__ == "__main__":
    target_file = Path(sys.argv[1]) if len(sys.argv) > 1 else HIERARCHY_JSON
    valid = validate_json_file(target_file)
    sys.exit(0 if valid else 1)


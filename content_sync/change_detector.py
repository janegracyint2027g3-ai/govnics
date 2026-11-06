"""
change_detector.py – Detect changes between previous and current website content snapshots.

Computes a structured diff of pages and sections:
- new pages
- updated pages (hash mismatch)
- moved pages (parent path changed)
- removed pages
"""
import hashlib
import json
import logging
import sys
from pathlib import Path
from typing import Dict, Any, List

from config import PREV_SNAPSHOT_JSON, LOGS_DIR

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOGS_DIR / "change_detector.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("change_detector")


class ChangeDetector:
    def __init__(self, prev_snapshot_path: Path = PREV_SNAPSHOT_JSON) -> None:
        self.prev_snapshot_path = prev_snapshot_path

    def load_snapshot(self, path: Path) -> Dict[str, Any]:
        if not path.exists():
            return {}
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            log.warning("Could not read snapshot %s: %s", path, exc)
            return {}

    def compute_diff(self, current_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Compare current_data with the snapshot.
        Both should contain 'flat_pages'.
        """
        prev_data = self.load_snapshot(self.prev_snapshot_path)
        prev_pages = {p["source_id"]: p for p in prev_data.get("flat_pages", [])}
        curr_pages = {p["source_id"]: p for p in current_data.get("flat_pages", [])}

        new_pages: List[Dict[str, Any]] = []
        updated_pages: List[Dict[str, Any]] = []
        moved_pages: List[Dict[str, Any]] = []
        unchanged_pages: List[Dict[str, Any]] = []
        removed_pages: List[Dict[str, Any]] = []

        for sid, cpage in curr_pages.items():
            if sid not in prev_pages:
                new_pages.append(cpage)
            else:
                ppage = prev_pages[sid]
                is_hash_diff = cpage.get("content_hash") != ppage.get("content_hash")
                is_parent_diff = cpage.get("parent_path") != ppage.get("parent_path")

                if is_parent_diff:
                    moved_pages.append({
                        "page": cpage,
                        "old_parent": ppage.get("parent_path"),
                        "new_parent": cpage.get("parent_path"),
                    })

                if is_hash_diff:
                    updated_pages.append({
                        "page": cpage,
                        "old_hash": ppage.get("content_hash"),
                        "new_hash": cpage.get("content_hash"),
                    })
                elif not is_parent_diff:
                    unchanged_pages.append(cpage)

        for sid, ppage in prev_pages.items():
            if sid not in curr_pages:
                removed_pages.append(ppage)

        diff = {
            "has_changes": bool(new_pages or updated_pages or moved_pages or removed_pages),
            "counts": {
                "new": len(new_pages),
                "updated": len(updated_pages),
                "moved": len(moved_pages),
                "removed": len(removed_pages),
                "unchanged": len(unchanged_pages),
                "total_current": len(curr_pages),
            },
            "new_pages": new_pages,
            "updated_pages": updated_pages,
            "moved_pages": moved_pages,
            "removed_pages": removed_pages,
        }

        log.info(
            "Diff calculated: %d new, %d updated, %d moved, %d removed, %d unchanged",
            len(new_pages), len(updated_pages), len(moved_pages), len(removed_pages), len(unchanged_pages)
        )
        return diff

    def save_as_snapshot(self, current_data: Dict[str, Any]) -> None:
        self.prev_snapshot_path.write_text(
            json.dumps(current_data, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        log.info("Snapshot updated at: %s", self.prev_snapshot_path)


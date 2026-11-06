from change_detector import ChangeDetector

def test_change_detector():
    detector = ChangeDetector()
    current_data = {
        "flat_pages": [
            {
                "source_id": "page_1",
                "slug": "home",
                "path": "/",
                "title": "Home",
                "content_hash": "hash_v1",
                "parent_path": None
            }
        ]
    }
    # First run without previous snapshot
    diff = detector.compute_diff(current_data)
    assert diff["counts"]["new"] == 1
    assert diff["counts"]["total_current"] == 1


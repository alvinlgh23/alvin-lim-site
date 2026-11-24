"""Pull the latest SGD-NEER model output and write the compact copy the site reads.

Source: docs/data.json in the public SGD-NEER-shadow-model repo, refreshed by that
repo's own weekday workflow. Writes public/data/sgd-neer.json only when the source
has newer data, so the site redeploys only when something actually changed.
Standard library only.
"""
import json
import sys
import urllib.request
from pathlib import Path

SOURCE = "https://raw.githubusercontent.com/alvinlgh23/SGD-NEER-shadow-model/main/docs/data.json"
TARGET = Path(__file__).resolve().parent.parent / "public" / "data" / "sgd-neer.json"
META_KEYS = ["generated_utc", "first_date", "last_date", "next_review", "default_band_pct",
             "initial_slope_pct", "recentre_lookback", "default_mode", "python_check"]


def compact(n: dict) -> dict:
    return {
        "meta": {k: n["meta"][k] for k in META_KEYS},
        "dates": n["dates"],
        "modes": {k: {"label": v["label"], "index": [round(x, 3) for x in v["index"]]} for k, v in n["modes"].items()},
        "events": n["events"],
        "weights": {"ols": n["weights"]["ols"], "currencies": n["weights"]["currencies"]},
        "fit": {k: n["fit"][k] for k in ["full_r2", "latest_r2", "window_weeks"]},
    }


def main() -> int:
    with urllib.request.urlopen(SOURCE, timeout=60) as r:
        source = json.load(r)
    new = compact(source)
    # Sanity checks: never publish a broken file
    assert len(new["dates"]) > 250, "too few dates"
    assert all(len(m["index"]) == len(new["dates"]) for m in new["modes"].values()), "index length mismatch"
    assert new["meta"]["default_mode"] in new["modes"], "unknown default mode"

    old = json.loads(TARGET.read_text()) if TARGET.exists() else {}
    if old.get("meta", {}).get("generated_utc") == new["meta"]["generated_utc"]:
        print(f"No change (data to {new['meta']['last_date']}).")
        return 0
    TARGET.write_text(json.dumps(new, separators=(",", ":"), ensure_ascii=False))
    print(f"Updated: data to {new['meta']['last_date']} (generated {new['meta']['generated_utc']}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Smoke test: Vite + React dashboard entries exist and are wired.

tsc --noEmit passes with react types installed (verified during review);
this guards the entry wiring without needing node_modules.
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent


def test_entries_exist():
    assert (ROOT / "src" / "main.tsx").exists(), "src/main.tsx missing"
    assert (ROOT / "src" / "App.tsx").exists(), "src/App.tsx missing"


def test_react_entry_wiring():
    main = (ROOT / "src" / "main.tsx").read_text()
    assert "App" in main
    assert "createRoot" in main or "render" in main
    app = (ROOT / "src" / "App.tsx").read_text()
    assert "export default" in app or "const App" in app


def test_package_json_has_build():
    pkg = json.loads((ROOT / "package.json").read_text())
    assert "build" in pkg.get("scripts", {})

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Docs worker — generates and maintains KoRT documentation."""

import json
from datetime import datetime, timezone
from pathlib import Path

from koRT_claw.config import KORT_ROOT


class DocsWorker:
    """Generates documentation, wikis, and handoff artifacts."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "generate": self._generate_docs,
            "handoff": self._generate_handoff,
            "index": self._generate_index,
            "update": self._update_docs,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _generate_docs(self, params):
        target = params[0] if params else str(KORT_ROOT)
        path = Path(target)
        doc_entries = []
        for f in path.rglob("*.md"):
            if "node_modules" in str(f) or ".git" in str(f):
                continue
            doc_entries.append({
                "path": str(f.relative_to(KORT_ROOT)),
                "size": f.stat().st_size,
                "modified": datetime.fromtimestamp(f.stat().st_mtime, tz=timezone.utc).isoformat(),
            })
        return {"documents": doc_entries, "total": len(doc_entries)}

    def _generate_handoff(self, params):
        if not params:
            return {"error": "Usage: docs handoff <mission_name>"}
        mission = params[0]
        handoff = {
            "mission": mission,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "ready",
            "sections": {
                "context": "Auto-generated from current workspace state",
                "completed": [],
                "pending": [],
                "blocked": [],
                "artifacts": [],
            },
        }
        dest = KORT_ROOT / "handoffs" / f"HANDOFF_{mission}_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(dest, "w") as f:
            json.dump(handoff, f, indent=2)
        return {"status": "generated", "destination": str(dest)}

    def _generate_index(self, params):
        index = {"spheres": {}, "generated": datetime.now(timezone.utc).isoformat()}
        for sphere_dir in KORT_ROOT.glob("Sphere_*"):
            if sphere_dir.is_dir():
                files = [f.name for f in sphere_dir.iterdir() if f.is_file()]
                index["spheres"][sphere_dir.name] = {"files": files, "count": len(files)}
        return index

    def _update_docs(self, params):
        return {"status": "proposal", "message": "Doc updates require review. Generate first, then approve."}

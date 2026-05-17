#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Logs worker — analyzes and monitors KoRT system logs."""

import json
from datetime import datetime, timezone
from pathlib import Path

from koRT_claw.config import KORT_ROOT, AUDIT_LOG


class LogsWorker:
    """Reads, filters, and analyzes KoRT ecosystem logs."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "audit": self._read_audit,
            "tail": self._tail_log,
            "search": self._search_log,
            "summary": self._log_summary,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _read_audit(self, params):
        limit = int(params[0]) if params else 20
        if not AUDIT_LOG.exists():
            return {"entries": [], "message": "No audit log found"}
        entries = []
        with open(AUDIT_LOG, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        entries.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
        return {"entries": entries[-limit:], "total": len(entries)}

    def _tail_log(self, params):
        lines = int(params[0]) if params else 10
        log_path = KORT_ROOT / "logs" / "claw.log"
        if not log_path.exists():
            return {"message": "No claw.log found", "lines": []}
        with open(log_path, encoding="utf-8") as f:
            all_lines = f.readlines()
        return {"lines": [l.strip() for l in all_lines[-lines:]]}

    def _search_log(self, params):
        if not params:
            return {"error": "Usage: logs search <pattern> [log_path]"}
        pattern = params[0].lower()
        log_path = Path(params[1]) if len(params) > 1 else AUDIT_LOG
        if not log_path.exists():
            return {"error": f"Log not found: {log_path}"}
        matches = []
        with open(log_path, encoding="utf-8") as f:
            for i, line in enumerate(f, 1):
                if pattern in line.lower():
                    matches.append({"line": i, "content": line.strip()})
        return {"pattern": pattern, "matches": matches[:50], "total": len(matches)}

    def _log_summary(self, params):
        if not AUDIT_LOG.exists():
            return {"message": "No audit log found"}
        counts = {"INFO": 0, "WARN": 0, "ERROR": 0, "APPROVED": 0, "DENIED": 0}
        with open(AUDIT_LOG, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    entry = json.loads(line)
                    level = entry.get("level", "")
                    status = entry.get("status", "")
                    if level in counts:
                        counts[level] += 1
                    if status in counts:
                        counts[status] += 1
                except json.JSONDecodeError:
                    continue
        return {"summary": counts, "period": "all_time"}

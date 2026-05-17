#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Refactor worker — code analysis and refactoring proposals."""

import ast
import re
from pathlib import Path

from koRT_claw.config import KORT_ROOT


class RefactorWorker:
    """Analyzes and proposes code refactoring across the KoRT monorepo."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "analyze": self._analyze_code,
            "lint": self._lint_code,
            "propose": self._propose_refactor,
            "apply": self._apply_refactor,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _analyze_code(self, params):
        target = params[0] if params else str(KORT_ROOT / "apps")
        path = Path(target)
        results = {"files": [], "issues": []}
        for py_file in path.rglob("*.py"):
            if "node_modules" in str(py_file) or ".venv" in str(py_file):
                continue
            issues = self._check_py_file(py_file)
            if issues:
                results["files"].append(str(py_file.relative_to(KORT_ROOT)))
                results["issues"].extend(issues)
        return results

    def _lint_code(self, params):
        target = params[0] if params else str(KORT_ROOT)
        path = Path(target)
        findings = []
        for py_file in path.rglob("*.py"):
            if "node_modules" in str(py_file) or ".venv" in str(py_file):
                continue
            with open(py_file, encoding="utf-8") as f:
                lines = f.readlines()
            for i, line in enumerate(lines, 1):
                if len(line.rstrip()) > 120:
                    findings.append({"file": str(py_file), "line": i, "issue": "line_too_long", "length": len(line.rstrip())})
                if line.rstrip() != line.rstrip("\n").rstrip():
                    findings.append({"file": str(py_file), "line": i, "issue": "trailing_whitespace"})
        return {"findings": findings, "total": len(findings)}

    def _propose_refactor(self, params):
        if not params:
            return {"error": "Usage: refactor propose <pattern> <replacement> [path]"}
        pattern = params[0]
        replacement = params[1]
        target = params[2] if len(params) > 2 else str(KORT_ROOT)
        path = Path(target)
        matches = []
        for f in path.rglob("*.py"):
            if "node_modules" in str(f) or ".venv" in str(f):
                continue
            with open(f, encoding="utf-8") as fh:
                content = fh.read()
            if re.search(pattern, content):
                matches.append({"file": str(f.relative_to(KORT_ROOT)), "occurrences": len(re.findall(pattern, content))})
        return {"pattern": pattern, "replacement": replacement, "matches": matches}

    def _apply_refactor(self, params):
        return {"status": "blocked", "message": "Apply requires quorum consent. Use 'propose' first."}

    def _check_py_file(self, path):
        issues = []
        try:
            with open(path, encoding="utf-8") as f:
                source = f.read()
            ast.parse(source)
        except SyntaxError as e:
            issues.append({"file": str(path), "line": e.lineno, "issue": "syntax_error", "detail": str(e)})
        return issues

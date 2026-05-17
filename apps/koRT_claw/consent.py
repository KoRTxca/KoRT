#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KoRT Claw consent gating engine."""

import json
import os
import yaml
from datetime import datetime, timezone
from pathlib import Path

from koRT_claw.config import CONSENT_POLICY_PATH, AUDIT_LOG


class ConsentGate:
    """Enforces consent policy on all KoRT Claw operations."""

    def __init__(self):
        self.policy = self._load_policy()
        self.mode = self.policy.get("governance", {}).get("mode", "consent-gated")
        self._ensure_audit_log()

    def _load_policy(self):
        if CONSENT_POLICY_PATH.exists():
            with open(CONSENT_POLICY_PATH) as f:
                return yaml.safe_load(f)
        return {"governance": {"mode": "consent-gated"}, "consent_levels": {}}

    def _ensure_audit_log(self):
        AUDIT_LOG.parent.mkdir(parents=True, exist_ok=True)
        if not AUDIT_LOG.exists():
            AUDIT_LOG.touch()

    def _audit(self, level, action, status, details=""):
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": level,
            "action": action,
            "status": status,
            "details": details,
        }
        with open(AUDIT_LOG, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")

    def check_consent(self, worker, action):
        """Check if an action is allowed under current consent policy."""
        consent_levels = self.policy.get("consent_levels", {})

        # Determine consent level for this action
        level = self._classify_action(action)
        level_config = consent_levels.get(level, {})

        if level_config.get("auto_approve", False):
            self._audit("INFO", f"{worker}:{action}", "AUTO_APPROVED", f"level={level}")
            return True

        # Require explicit consent
        if os.getenv("KORT_CLAW_AUTO", "").lower() == "true":
            self._audit("WARN", f"{worker}:{action}", "AUTO_OVERRIDE", f"level={level}")
            return True

        print(f"\n[CONSENT REQUIRED] Worker: {worker} | Action: {action} | Level: {level}")
        print(f"  Description: {level_config.get('description', 'N/A')}")

        if level_config.get("require_quorum"):
            min_q = level_config.get("min_quorum", 2)
            print(f"  Quorum required: {min_q} knights")
            response = input(f"  Grant consent? (yes/no): ").strip().lower()
            approved = response in ("yes", "y")
        else:
            response = input(f"  Grant consent? (yes/no): ").strip().lower()
            approved = response in ("yes", "y")

        status = "APPROVED" if approved else "DENIED"
        self._audit("INFO" if approved else "WARN", f"{worker}:{action}", status, f"level={level}")
        return approved

    def _classify_action(self, action):
        """Classify an action into a consent level."""
        action_lower = action.lower()
        if any(k in action_lower for k in ("read", "list", "show", "get", "status", "health")):
            return "read"
        if any(k in action_lower for k in ("analyze", "scan", "report", "check", "audit")):
            return "analyze"
        if any(k in action_lower for k in ("propose", "diff", "plan", "suggest")):
            return "propose"
        if any(k in action_lower for k in ("deploy", "push", "restart", "provision")):
            return "deploy"
        return "execute"

    def get_audit_log(self, limit=20):
        """Read recent audit entries."""
        if not AUDIT_LOG.exists():
            return []
        entries = []
        with open(AUDIT_LOG, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        entries.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
        return entries[-limit:]

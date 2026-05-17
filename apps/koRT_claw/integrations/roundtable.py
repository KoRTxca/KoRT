#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""RoundTable AI integration — multi-agent collaboration interface."""

import json
from datetime import datetime, timezone
from koRT_claw.config import KORT_ROOT
from koRT_claw.integrations.merlin_ai import MerlinAI

ROLES = {
    "castellan": "Antigravity — Architecture & strategy oversight",
    "archivist": "Scribe — Documentation & knowledge management",
    "inference": "Merlin — AI reasoning & problem solving",
    "security": "Bedivere — Security audit & hardening",
    "strategist": "Gawain — Planning & optimization",
    "guardian": "Galahad — Quality assurance & testing",
}


class RoundTableAI:
    """Coordinates multi-agent collaboration across the KoRT AI quorum."""

    def __init__(self):
        self.merlin = MerlinAI()

    def collaborate(self, prompt, role=None):
        """Send a prompt to the RoundTable for collaborative processing."""
        if role and role in ROLES:
            system = f"You are {ROLES[role]}. Respond from this perspective."
        else:
            system = "You are the KoRT RoundTable — a council of AI agents collaborating on sovereign engineering tasks."

        full_prompt = f"[RoundTable Session {datetime.now(timezone.utc).isoformat()}]\n\n{prompt}"
        response = self.merlin.query(full_prompt, system_prompt=system)

        session = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "role": role or "council",
            "prompt": prompt,
            "response": response,
        }
        self._log_session(session)
        return response

    def quorum_vote(self, prompt):
        """Simulate a quorum vote across all AI roles."""
        results = {}
        for role_id, role_desc in ROLES.items():
            system = f"You are {role_desc}. Vote on the following proposal: {prompt}"
            results[role_id] = self.merlin.query(prompt, system_prompt=system)
        return {"proposal": prompt, "votes": results, "timestamp": datetime.now(timezone.utc).isoformat()}

    def _log_session(self, session):
        """Persist RoundTable session to handoffs."""
        dest = KORT_ROOT / "handoffs" / "roundtable_sessions.jsonl"
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(dest, "a", encoding="utf-8") as f:
            f.write(json.dumps(session) + "\n")

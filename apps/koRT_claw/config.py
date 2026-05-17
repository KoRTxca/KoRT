#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KoRT Claw configuration management."""

import os
from pathlib import Path

KORT_ROOT = Path(os.getenv("KORT_ROOT", Path(__file__).resolve().parents[2]))

MERLIN_PROXY = os.getenv("MERLIN_PROXY", "https://api.kortx.ca")
MERLIN_PORT = int(os.getenv("MERLIN_PORT", "8081"))

XEON_IP = os.getenv("XEON_IP", "104.219.251.218")
KAMATERA_IP = os.getenv("KAMATERA_IP", "66.55.78.96")

CONSENT_POLICY_PATH = Path(__file__).parent / "consent_policy.yaml"

WORKER_MODULES = [
    "discovery",
    "import_worker",
    "refactor",
    "deploy",
    "docs",
    "logs",
]

AI_INTEGRATIONS = [
    "merlin_ai",
    "roundtable",
    "voice",
]

LOG_LEVEL = os.getenv("KORT_LOG_LEVEL", "INFO")
AUDIT_LOG = KORT_ROOT / "logs" / "claw_audit.log"

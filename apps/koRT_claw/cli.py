#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KoRT Claw CLI — Sovereign Automation Engine."""

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from koRT_claw.config import WORKER_MODULES, AI_INTEGRATIONS, KORT_ROOT, CONSENT_POLICY_PATH
from koRT_claw.consent import ConsentGate
from koRT_claw.workers.discovery import DiscoveryWorker
from koRT_claw.workers.import_worker import ImportWorker
from koRT_claw.workers.refactor import RefactorWorker
from koRT_claw.workers.deploy import DeployWorker
from koRT_claw.workers.docs import DocsWorker
from koRT_claw.workers.logs import LogsWorker
from koRT_claw.integrations.merlin_ai import MerlinAI
from koRT_claw.integrations.roundtable import RoundTableAI
from koRT_claw.integrations.voice import VoiceInterface

VERSION = "2.0.0"

WORKERS = {
    "discovery": DiscoveryWorker,
    "import": ImportWorker,
    "refactor": RefactorWorker,
    "deploy": DeployWorker,
    "docs": DocsWorker,
    "logs": LogsWorker,
}


def cmd_status(args):
    """Show KoRT Claw system status."""
    print(f"=== KoRT Claw v{VERSION} — Sovereign Status ===")
    print(f"  Root:       {KORT_ROOT}")
    print(f"  Consent:    {CONSENT_POLICY_PATH}")
    print(f"  Workers:    {', '.join(WORKER_MODULES)}")
    print(f"  AI:         {', '.join(AI_INTEGRATIONS)}")
    print(f"  Timestamp:  {datetime.now(timezone.utc).isoformat()}")
    gate = ConsentGate()
    print(f"  Gate Mode:  {gate.mode}")
    print("  Status:     OMNI-STABLE")


def cmd_run(args):
    """Execute a worker with consent gating."""
    worker_cls = WORKERS.get(args.worker)
    if not worker_cls:
        print(f"ERROR: Unknown worker '{args.worker}'. Available: {', '.join(WORKERS)}")
        sys.exit(1)

    gate = ConsentGate()
    if not gate.check_consent(args.worker, args.action):
        print("ACTION BLOCKED: Consent not granted.")
        sys.exit(1)

    worker = worker_cls()
    result = worker.execute(args.action, args.params)
    print(json.dumps(result, indent=2, default=str))


def cmd_ai(args):
    """Interact with Merlin AI or RoundTable."""
    if args.ai == "merlin":
        ai = MerlinAI()
        response = ai.query(args.prompt)
    elif args.ai == "roundtable":
        ai = RoundTableAI()
        response = ai.collaborate(args.prompt)
    else:
        print(f"ERROR: Unknown AI '{args.ai}'. Available: merlin, roundtable")
        sys.exit(1)
    print(response)


def cmd_voice(args):
    """Voice interface (STT + TTS via Merlin)."""
    voice = VoiceInterface()
    if args.mode == "listen":
        text = voice.listen()
        print(f"Transcribed: {text}")
    elif args.mode == "speak":
        voice.speak(args.text)
        print("Audio played.")
    elif args.mode == "converse":
        voice.converse_loop()


def cmd_gui(args):
    """Launch the branded GUI."""
    from koRT_claw.gui.server import launch_gui
    launch_gui(port=args.port)


def cmd_audit(args):
    """Show audit log."""
    gate = ConsentGate()
    entries = gate.get_audit_log(limit=args.limit)
    for entry in entries:
        print(f"[{entry['timestamp']}] {entry['level']}: {entry['action']} — {entry['status']}")


def main():
    parser = argparse.ArgumentParser(
        prog="kort-claw",
        description="KoRT Claw — Sovereign Automation Engine v" + VERSION,
    )
    parser.add_argument("--version", action="version", version=f"KoRT Claw {VERSION}")

    sub = parser.add_subparsers(dest="command", help="Available commands")

    # status
    p_status = sub.add_parser("status", help="Show system status")
    p_status.set_defaults(func=cmd_status)

    # run
    p_run = sub.add_parser("run", help="Execute a worker")
    p_run.add_argument("worker", choices=list(WORKERS.keys()), help="Worker to run")
    p_run.add_argument("action", help="Action to perform")
    p_run.add_argument("--params", nargs="*", default=[], help="Action parameters")
    p_run.set_defaults(func=cmd_run)

    # ai
    p_ai = sub.add_parser("ai", help="Query AI integration")
    p_ai.add_argument("ai", choices=["merlin", "roundtable"], help="AI backend")
    p_ai.add_argument("prompt", help="Prompt to send")
    p_ai.set_defaults(func=cmd_ai)

    # voice
    p_voice = sub.add_parser("voice", help="Voice interface")
    p_voice.add_argument("mode", choices=["listen", "speak", "converse"], help="Voice mode")
    p_voice.add_argument("--text", default="", help="Text to speak (for speak mode)")
    p_voice.set_defaults(func=cmd_voice)

    # gui
    p_gui = sub.add_parser("gui", help="Launch branded GUI")
    p_gui.add_argument("--port", type=int, default=8070, help="GUI port (default: 8070)")
    p_gui.set_defaults(func=cmd_gui)

    # audit
    p_audit = sub.add_parser("audit", help="Show audit log")
    p_audit.add_argument("--limit", type=int, default=20, help="Number of entries")
    p_audit.set_defaults(func=cmd_audit)

    args = parser.parse_args()
    if not args.command:
        parser.print_help()
        sys.exit(1)

    args.func(args)


if __name__ == "__main__":
    main()

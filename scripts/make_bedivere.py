#!/usr/bin/env python3
"""
KoRT Bedivere Relay Client v2.0
Sends events to the SOVEREIGN self-hosted Bedivere Webhook Bus.

Webhook URL: https://webhook.kortx.ca/webhook/event
Server: Xeon 104.219.251.218 (kort-bedivere systemd service)

Make.com has been RETIRED. Zero external dependencies.

Events this sends:
- New mission created
- DD transaction completed
- Knight onboarded
- Wellness mission completed
- System health alerts
"""

import os
import sys
import json
import httpx
from pathlib import Path
from datetime import datetime, timezone

def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

WEBHOOK_URL = os.getenv("BEDIVERE_WEBHOOK_URL", "https://webhook.kortx.ca/webhook/event")
# RETIRED: MAKE_COM was: https://hook.us2.make.com/b8v51fprs6fvg1yc8vu3et1nvl211a1v


def send_event(event_type, data):
    """Send an event to Make.com via webhook."""
    payload = {
        "event_type": event_type,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "source": "kort-mission-control",
        "data": data,
    }
    print(f"Sending {event_type} to Make.com...")
    try:
        r = httpx.post(WEBHOOK_URL, json=payload, timeout=15)
        print(f"  Status: {r.status_code}")
        if r.text:
            print(f"  Response: {r.text[:500]}")
        return r.status_code in (200, 201, 204)
    except Exception as e:
        print(f"  FAILED: {e}")
        return False


def notify_new_mission(title, priority="normal", reward_dd=25):
    return send_event("mission_created", {
        "title": title,
        "priority": priority,
        "reward_dd": reward_dd,
    })


def notify_transaction(from_knight, to_knight, amount, tx_type="transfer"):
    return send_event("dd_transaction", {
        "from_knight": from_knight,
        "to_knight": to_knight,
        "amount": amount,
        "tx_type": tx_type,
    })


def notify_knight_onboarded(display_name, email):
    return send_event("knight_onboarded", {
        "display_name": display_name,
        "email": email,
        "welcome_bounty_dd": 100,
    })


def notify_wellness_completed(knight_name, mission_type, reward_dd):
    return send_event("wellness_completed", {
        "knight_name": knight_name,
        "mission_type": mission_type,
        "reward_dd": reward_dd,
    })


def notify_system_health(component, status, message=""):
    return send_event("system_health", {
        "component": component,
        "status": status,
        "message": message,
    })


def test_webhook():
    """Send a test ping to verify the webhook is alive."""
    return send_event("test_ping", {
        "message": "KoRT Mission Control is online",
        "version": "1.0.0",
    })


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "test"

    if cmd == "test":
        test_webhook()
    elif cmd == "health":
        notify_system_health("mission-control", "online", "All systems operational")
    elif cmd == "onboard":
        name = sys.argv[2] if len(sys.argv) > 2 else "Test Knight"
        notify_knight_onboarded(name, f"{name.lower().replace(' ', '.')}@drt.onl")
    else:
        print(f"Usage: python make_bedivere.py [test|health|onboard <name>]")

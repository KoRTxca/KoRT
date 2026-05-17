#!/usr/bin/env python3
"""
KoRT Vultr VPS Provisioner
Uses the real VULTR_API_KEY to list, create, and manage VPS instances.

Usage:
    python vultr_provisioner.py list        # List all instances
    python vultr_provisioner.py create      # Create a KoRT node
    python vultr_provisioner.py regions     # List available regions
"""

import os
import sys
import json
import httpx
from pathlib import Path

# Load from .env
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

API_KEY = os.getenv("VULTR_API_KEY", "")
BASE = "https://api.vultr.com/v2"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}


def api_get(path):
    r = httpx.get(f"{BASE}{path}", headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.json()


def api_post(path, data):
    r = httpx.post(f"{BASE}{path}", headers=HEADERS, json=data, timeout=30)
    r.raise_for_status()
    return r.json()


def list_instances():
    data = api_get("/instances")
    instances = data.get("instances", [])
    if not instances:
        print("No VPS instances found.")
        return
    print(f"Found {len(instances)} instance(s):\n")
    for inst in instances:
        print(f"  ID:     {inst['id']}")
        print(f"  Label:  {inst.get('label', 'N/A')}")
        print(f"  Region: {inst.get('region', 'N/A')}")
        print(f"  OS:     {inst.get('os', 'N/A')}")
        print(f"  IP:     {inst.get('main_ip', 'N/A')}")
        print(f"  Status: {inst.get('status', 'N/A')}")
        print(f"  Plan:   {inst.get('plan', 'N/A')}")
        print(f"  RAM:    {inst.get('ram', 'N/A')} MB")
        print(f"  vCPUs:  {inst.get('vcpu_count', 'N/A')}")
        print(f"  Disk:   {inst.get('disk', 'N/A')} GB")
        print()


def list_regions():
    data = api_get("/regions")
    regions = data.get("regions", [])
    # Filter to North America
    na = [r for r in regions if r.get("continent") in ("North America",)]
    print(f"North American regions ({len(na)}):\n")
    for r in na:
        print(f"  {r['id']:8s} | {r['city']:20s} | {r['country']}")


def list_plans():
    data = api_get("/plans")
    plans = data.get("plans", [])
    # Show cheapest plans
    affordable = sorted(plans, key=lambda p: p.get("monthly_cost", 9999))[:10]
    print("Top 10 cheapest plans:\n")
    for p in affordable:
        print(f"  {p['id']:20s} | ${p.get('monthly_cost', '?'):>6}/mo | "
              f"{p.get('vcpu_count', '?')} vCPU | {p.get('ram', '?')} MB RAM | "
              f"{p.get('disk', '?')} GB | {p.get('bandwidth', '?')} GB BW")


def list_os():
    data = api_get("/os")
    oses = data.get("os", [])
    # Show Ubuntu options
    ubuntu = [o for o in oses if "ubuntu" in o.get("name", "").lower()]
    print(f"Ubuntu OS options ({len(ubuntu)}):\n")
    for o in ubuntu:
        print(f"  ID: {o['id']:4d} | {o['name']}")


def create_kort_node(label="kort-node-01", region="sea", plan="vc2-1c-1gb"):
    """Create a KoRT mesh node VPS."""
    # Find Ubuntu 24.04
    os_data = api_get("/os")
    ubuntu_id = None
    for o in os_data.get("os", []):
        if "Ubuntu 24.04" in o.get("name", "") and "x64" in o.get("name", ""):
            ubuntu_id = o["id"]
            break
    if not ubuntu_id:
        # Fallback
        ubuntu_id = 2284  # Ubuntu 24.04 LTS x64

    startup_script = """#!/bin/bash
# KoRT Node Auto-Setup
apt-get update && apt-get upgrade -y
apt-get install -y docker.io docker-compose git python3 python3-pip curl
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh
# Clone the sovereign monorepo
git clone https://github.com/KoRTxca/Mission_Control.git /opt/kort
# Start services
cd /opt/kort && docker-compose up -d
echo "KoRT Node Ready" > /var/log/kort-init.log
"""

    print(f"Creating KoRT node: {label}")
    print(f"  Region: {region}")
    print(f"  Plan:   {plan}")
    print(f"  OS:     Ubuntu 24.04 (ID: {ubuntu_id})")

    result = api_post("/instances", {
        "region": region,
        "plan": plan,
        "os_id": ubuntu_id,
        "label": label,
        "hostname": label,
        "enable_ipv6": True,
        "backups": "disabled",
        "tags": ["kort", "mesh-node"],
        "user_data": startup_script,
    })

    inst = result.get("instance", {})
    print(f"\n  Created! ID: {inst.get('id', 'unknown')}")
    print(f"  Default password: {inst.get('default_password', 'check dashboard')}")
    print(f"  Status: {inst.get('status', 'provisioning')}")
    return inst


def list_account():
    data = api_get("/account")
    acct = data.get("account", {})
    print("Vultr Account Info:")
    print(f"  Email:   {acct.get('email', 'N/A')}")
    print(f"  Name:    {acct.get('name', 'N/A')}")
    print(f"  Balance: ${acct.get('balance', 'N/A')}")
    print(f"  Pending: ${acct.get('pending_charges', 'N/A')}")


if __name__ == "__main__":
    if not API_KEY:
        print("ERROR: VULTR_API_KEY not set in .env")
        sys.exit(1)

    cmd = sys.argv[1] if len(sys.argv) > 1 else "list"

    if cmd == "list":
        list_instances()
    elif cmd == "regions":
        list_regions()
    elif cmd == "plans":
        list_plans()
    elif cmd == "os":
        list_os()
    elif cmd == "account":
        list_account()
    elif cmd == "create":
        label = sys.argv[2] if len(sys.argv) > 2 else "kort-node-01"
        create_kort_node(label=label)
    else:
        print(f"Unknown command: {cmd}")
        print("Usage: python vultr_provisioner.py [list|regions|plans|os|account|create]")

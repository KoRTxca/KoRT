#!/usr/bin/env python3
"""
KoRT Dedicated Vultr Mail Server Provisioner
Deploys a dedicated VPS on Vultr for email hosting (drt.onl, kortx.ca, drt.social).
Sets up Stalwart Mail Server, SnappyMail, and Nginx with automatic SSL.
"""

import os
import sys
import json
import httpx
from pathlib import Path

# Load environment variables
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

def deploy_mail_server(region="sea", plan="vc2-1c-2gb", label="kort-mail-server"):
    # 1. Locate Ubuntu 24.04 OS ID
    os_data = api_get("/os")
    ubuntu_id = None
    for o in os_data.get("os", []):
        if "Ubuntu 24.04" in o.get("name", "") and "x64" in o.get("name", ""):
            ubuntu_id = o["id"]
            break
    if not ubuntu_id:
        ubuntu_id = 2284  # Default fallback ID for Ubuntu 24.04 LTS x64

    # Read docker-compose and nginx configs to bake them into the startup userdata
    infra_dir = Path(__file__).parent.parent / "infra" / "mail-server"
    compose_path = infra_dir / "docker-compose.yml"
    nginx_path = infra_dir / "nginx.conf"

    if not compose_path.exists() or not nginx_path.exists():
        print("ERROR: docker-compose.yml or nginx.conf not found in infra/mail-server/")
        sys.exit(1)

    compose_content = compose_path.read_text(encoding="utf-8")
    nginx_content = nginx_path.read_text(encoding="utf-8")

    # 2. Build Startup Script
    startup_script = f"""#!/bin/bash
# KoRT Dedicated Mail Server Auto-Installer
apt-get update && apt-get upgrade -y
apt-get install -y docker.io docker-compose git curl openssl

# Prepare directories
mkdir -p /opt/kort/mail-server/certs/live/mail.drt.onl
mkdir -p /opt/kort/mail-server/webmail-data
mkdir -p /opt/kort/mail-server/stalwart-data

# Write files
cat << 'EOF' > /opt/kort/mail-server/docker-compose.yml
{compose_content}
EOF

cat << 'EOF' > /opt/kort/mail-server/nginx.conf
{nginx_content}
EOF

# Generate dummy self-signed SSL certs so Nginx starts successfully the first time
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout /opt/kort/mail-server/certs/live/mail.drt.onl/privkey.pem \\
  -out /opt/kort/mail-server/certs/live/mail.drt.onl/fullchain.pem \\
  -subj "/CN=mail.drt.onl"

# Bring up Docker services
cd /opt/kort/mail-server && docker-compose up -d

echo "KoRT Sovereign Mail Stack deployed and running." > /var/log/kort-mail-init.log
"""

    import base64
    encoded_user_data = base64.b64encode(startup_script.encode("utf-8")).decode("utf-8")

    print(f"Deploying Sovereign Dedicated Mail Server on Vultr...")
    print(f"  Label:    {label}")
    print(f"  Region:   {region}")
    print(f"  Plan:     {plan} ($10.00/mo - 2GB memory for robust Stalwart operations)")
    print(f"  OS ID:    {ubuntu_id}")

    try:
        result = api_post("/instances", {
            "region": region,
            "plan": plan,
            "os_id": ubuntu_id,
            "label": label,
            "hostname": "mail.drt.onl",
            "enable_ipv6": True,
            "backups": "disabled",
            "tags": ["kort", "mail-server", "sovereign"],
            "user_data": encoded_user_data,
        })
        inst = result.get("instance", {})
        print(f"\nSUCCESS! Mail server instance created!")
        print(f"  Instance ID:       {inst.get('id')}")
        print(f"  Default Password:  {inst.get('default_password')}")
        print(f"  Region:            {inst.get('region')}")
        print(f"  Plan:              {inst.get('plan')}")
        print(f"\nSave these credentials safely in your records.")
        return inst
    except httpx.HTTPStatusError as e:
        print(f"ERROR deploying mail server: {e}")
        print(f"Response details: {e.response.text}")
        sys.exit(1)
    except Exception as e:
        print(f"ERROR deploying mail server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if not API_KEY:
        print("ERROR: VULTR_API_KEY not set in .env")
        sys.exit(1)

    region = sys.argv[1] if len(sys.argv) > 1 else "sea"
    deploy_mail_server(region=region)

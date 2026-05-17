import os
import httpx
from pathlib import Path

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

# List of instances to query
instances = ["77850232-e031-4202-b4cd-2bf0fda7fda3", "d42ee220-0d2c-4037-9775-c488534894bf"]
for inst_id in instances:
    try:
        r = httpx.get(f"{BASE}/instances/{inst_id}", headers=HEADERS, timeout=15)
        r.raise_for_status()
        print(f"\n--- Details for {inst_id} ---")
        print(f"Label:            {r.json().get('instance', {}).get('label')}")
        print(f"IP:               {r.json().get('instance', {}).get('main_ip')}")
        print(f"Status:           {r.json().get('instance', {}).get('status')}")
        print(f"Default Password: {r.json().get('instance', {}).get('default_password')}")
        print(f"Power Status:     {r.json().get('instance', {}).get('power_status')}")
    except Exception as e:
        print(f"Error querying {inst_id}: {e}")

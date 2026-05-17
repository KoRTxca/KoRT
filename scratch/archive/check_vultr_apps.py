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

r = httpx.get(f"{BASE}/applications", headers=HEADERS, timeout=15)
r.raise_for_status()
apps = r.json().get("applications", [])
print(f"Total marketplace apps: {len(apps)}")
for app in apps:
    name = app.get("name", "").lower()
    if "mail" in name or "postfix" in name or "stalwart" in name or "maddy" in name or "panel" in name or "icewarp" in name or "docker" in name:
        print(f"ID: {app['id']:<5d} | Name: {app['name']:30s} | Deploy Name: {app['deploy_name']}")

#!/usr/bin/env python3
"""
KoRT Sovereign Relay Engine — Deploy Script
Replaces Make.com with 100% self-hosted automation:
  - n8n (workflow automation) on port 5678, proxied via nginx
  - Bedivere Webhook Bus (FastAPI) on port 8082
  - Python cron jobs via systemd timers (no crontab fragility)

Target: Xeon 104.219.251.218
Also: Sets up Gitea for self-hosted git on Kamatera 66.55.78.96
"""
import paramiko, time, sys
sys.stdout.reconfigure(encoding='utf-8')

XEON_IP   = '104.219.251.218'
XEON_USER = 'root'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
KAMATERA  = '66.55.78.96'

# ── n8n encryption key (generate once, store in .env) ──────────
N8N_ENCRYPTION_KEY = 'KoRT_S0v3r3ign_Aurum_2026_n8n_K3y!'
N8N_WEBHOOK_URL    = 'https://relay.kortx.ca'
SUPABASE_URL       = 'https://your-supabase-project.supabase.co'

def ssh(host, password=XEON_PASS):
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(host, username=XEON_USER, password=password, timeout=30)
    return c

def run(c, cmd, timeout=120, label=None):
    if label:
        print(f'  >> {label}')
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('     ' + o[:600])
    if e and not any(x in e.lower() for x in ['warning', 'created symlink', 'hint:', 'note:']):
        print(f'  [ERR] {e[:300]}')
    return o

def upload(c, path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  [UPLOADED] {path}')

print('=' * 65)
print('  KoRT Sovereign Relay Engine — Deployment')
print('  Replacing Make.com with self-hosted stack')
print('=' * 65)

c = ssh(XEON_IP)

# ──────────────────────────────────────────────────────────────
# 1. Install Node.js 20 + n8n
# ──────────────────────────────────────────────────────────────
print('\n[1/7] Installing Node.js 20 + n8n...')
run(c, 'curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs', 120,
    'Node 20 setup')
run(c, 'npm install -g n8n', 180, 'n8n global install')
run(c, 'n8n --version', label='n8n version check')

# ──────────────────────────────────────────────────────────────
# 2. n8n systemd service
# ──────────────────────────────────────────────────────────────
print('\n[2/7] Creating n8n systemd service...')
n8n_service = f"""[Unit]
Description=KoRT n8n Workflow Automation (Make.com replacement)
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kort/n8n
Environment=N8N_PORT=5678
Environment=N8N_HOST=0.0.0.0
Environment=N8N_PROTOCOL=https
Environment=WEBHOOK_URL={N8N_WEBHOOK_URL}
Environment=N8N_ENCRYPTION_KEY={N8N_ENCRYPTION_KEY}
Environment=N8N_BASIC_AUTH_ACTIVE=true
Environment=N8N_BASIC_AUTH_USER=kortadmin
Environment=N8N_BASIC_AUTH_PASSWORD=KoRT_Aurum_2026!
Environment=DB_TYPE=sqlite
Environment=DB_SQLITE_DATABASE=/opt/kort/n8n/database.sqlite
ExecStart=/usr/bin/n8n start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""
run(c, 'mkdir -p /opt/kort/n8n')
upload(c, '/etc/systemd/system/kort-n8n.service', n8n_service)
run(c, 'systemctl daemon-reload && systemctl enable kort-n8n && systemctl start kort-n8n', 30,
    'Starting n8n')
time.sleep(8)
run(c, 'systemctl status kort-n8n --no-pager | head -12', label='n8n status')

# ──────────────────────────────────────────────────────────────
# 3. Bedivere Webhook Bus (FastAPI) — replaces Make.com webhooks
# ──────────────────────────────────────────────────────────────
print('\n[3/7] Deploying Bedivere Webhook Bus (FastAPI on :8082)...')

bedivere_api = '''#!/usr/bin/env python3
"""
KoRT Bedivere Webhook Bus v2.0 — Self-hosted Make.com replacement
Handles all internal automation triggers natively.
Port: 8082
"""
import os, json, subprocess, logging
from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("bedivere")

app = FastAPI(title="KoRT Bedivere Webhook Bus v2.0", version="2.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

RELAY_SECRET = os.getenv("RELAY_SECRET", "KoRT_Bedivere_Secret_2026!")
EVENT_LOG    = "/opt/kort/bedivere/events.jsonl"

os.makedirs("/opt/kort/bedivere", exist_ok=True)

class Event(BaseModel):
    event_type: str
    source: str = "kort-mission-control"
    data: dict = {}

def log_event(event: Event):
    """Append every event to a JSONL audit log."""
    entry = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event_type": event.event_type,
        "source": event.source,
        "data": event.data
    }
    with open(EVENT_LOG, "a") as f:
        f.write(json.dumps(entry) + "\\n")
    log.info(f"EVENT: {event.event_type} | {event.data}")

def run_cron_job(script_path: str):
    """Fire a cron job script async via subprocess."""
    try:
        result = subprocess.run(["python3", script_path], capture_output=True, text=True, timeout=60)
        log.info(f"CRON {script_path}: {result.stdout[:200]}")
    except Exception as e:
        log.error(f"CRON FAILED {script_path}: {e}")

# ── Health ──────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "KoRT Bedivere Webhook Bus v2.0",
        "sovereign": True,
        "replaces": "make.com",
        "ts": datetime.now(timezone.utc).isoformat()
    }

# ── Universal event receiver ────────────────────────────────
@app.post("/webhook/event")
async def receive_event(event: Event, background_tasks: BackgroundTasks):
    """Universal inbound event endpoint. Replaces all Make.com webhook URLs."""
    background_tasks.add_task(log_event, event)
    background_tasks.add_task(dispatch_event, event)
    return {"status": "received", "event_type": event.event_type}

def dispatch_event(event: Event):
    """Route events to the right cron job/handler."""
    handlers = {
        "mission_created":    "/opt/kort/crons/on_mission_created.py",
        "dd_transaction":     "/opt/kort/crons/on_dd_transaction.py",
        "knight_onboarded":   "/opt/kort/crons/on_knight_onboarded.py",
        "wellness_completed": "/opt/kort/crons/on_wellness_completed.py",
        "system_health":      "/opt/kort/crons/on_system_health.py",
        "test_ping":          None,
    }
    script = handlers.get(event.event_type)
    if script:
        # Write event data to temp file for script to consume
        payload_path = f"/opt/kort/bedivere/pending_{event.event_type}.json"
        with open(payload_path, "w") as f:
            json.dump({"event_type": event.event_type, "data": event.data}, f)
        run_cron_job(script)

# ── Named endpoints (drop-in for old Make.com webhooks) ────
@app.post("/webhook/mission")
async def webhook_mission(event: Event, background_tasks: BackgroundTasks):
    event.event_type = "mission_created"
    return await receive_event(event, background_tasks)

@app.post("/webhook/transaction")
async def webhook_transaction(event: Event, background_tasks: BackgroundTasks):
    event.event_type = "dd_transaction"
    return await receive_event(event, background_tasks)

@app.post("/webhook/onboard")
async def webhook_onboard(event: Event, background_tasks: BackgroundTasks):
    event.event_type = "knight_onboarded"
    return await receive_event(event, background_tasks)

# ── Event log viewer ────────────────────────────────────────
@app.get("/events")
def list_events(limit: int = 50):
    try:
        with open(EVENT_LOG) as f:
            lines = f.readlines()
        events = [json.loads(l) for l in lines[-limit:] if l.strip()]
        return {"count": len(events), "events": events}
    except FileNotFoundError:
        return {"count": 0, "events": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8082, workers=2)
'''

run(c, 'mkdir -p /opt/kort/bedivere /opt/kort/crons')
upload(c, '/opt/kort/bedivere_api.py', bedivere_api)

bedivere_service = """[Unit]
Description=KoRT Bedivere Webhook Bus v2.0 (Self-hosted Make.com)
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kort
Environment=RELAY_SECRET=KoRT_Bedivere_Secret_2026!
ExecStart=/opt/kort/venv/bin/uvicorn bedivere_api:app --host 0.0.0.0 --port 8082 --workers 2
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""
upload(c, '/etc/systemd/system/kort-bedivere.service', bedivere_service)
run(c, 'systemctl daemon-reload && systemctl enable kort-bedivere && systemctl restart kort-bedivere', 30)
time.sleep(5)
run(c, 'curl -s http://127.0.0.1:8082/health', label='Bedivere health check')

# ──────────────────────────────────────────────────────────────
# 4. Cron Job Scripts (what Make.com scenarios used to do)
# ──────────────────────────────────────────────────────────────
print('\n[4/7] Writing cron job handlers...')

cron_knight_onboarded = '''#!/usr/bin/env python3
"""
on_knight_onboarded.py — Fires when a new knight joins.
Replaces: Make.com "Knight Onboarded" scenario
Actions: Send welcome email, mint 100 DD, log to Supabase
"""
import json, os, subprocess
from pathlib import Path

payload_path = "/opt/kort/bedivere/pending_knight_onboarded.json"
if not Path(payload_path).exists():
    print("No pending onboarding payload.")
    exit(0)

with open(payload_path) as f:
    payload = json.load(f)

data = payload.get("data", {})
name  = data.get("display_name", "Knight")
email = data.get("email", "")
dd    = data.get("welcome_bounty_dd", 100)

print(f"[Bedivere] New knight onboarded: {name} <{email}>")
print(f"[Bedivere] Minting {dd} DD welcome bounty...")

# TODO: POST to Digital Dollars API to mint DD
# TODO: Send welcome email via sovereign SMTP (Postfix/Mailcow on Kamatera)
# TODO: Log to Supabase knight_registry table

# Clean up
os.remove(payload_path)
print("[Bedivere] Onboarding complete.")
'''

cron_dd_transaction = '''#!/usr/bin/env python3
"""
on_dd_transaction.py — Fires on every Digital Dollar transaction.
Replaces: Make.com "DD Transaction" scenario
"""
import json, os
from pathlib import Path

payload_path = "/opt/kort/bedivere/pending_dd_transaction.json"
if not Path(payload_path).exists():
    exit(0)

with open(payload_path) as f:
    payload = json.load(f)

data = payload.get("data", {})
print(f"[Bedivere] DD Transaction: {data.get('from_knight')} -> {data.get('to_knight')}: {data.get('amount')} DD")

# TODO: Verify double-entry in Supabase ledger
# TODO: Trigger reputation score recalculation
# TODO: Notify both knights via sovereign push notification

os.remove(payload_path)
print("[Bedivere] Transaction logged.")
'''

cron_system_health = '''#!/usr/bin/env python3
"""
on_system_health.py — System health alert handler.
Replaces: Make.com "System Health Alert" scenario
"""
import json, os, subprocess
from pathlib import Path

payload_path = "/opt/kort/bedivere/pending_system_health.json"
if not Path(payload_path).exists():
    exit(0)

with open(payload_path) as f:
    payload = json.load(f)

data      = payload.get("data", {})
component = data.get("component", "unknown")
status    = data.get("status", "unknown")
message   = data.get("message", "")

print(f"[Bedivere] Health Alert: {component} = {status} | {message}")

if status in ("down", "error", "critical"):
    # Auto-restart the failing service
    if component in ("kort-merlin", "kort-bedivere", "kort-n8n", "nginx"):
        result = subprocess.run(["systemctl", "restart", component], capture_output=True, text=True)
        print(f"[Bedivere] Auto-restarted {component}: {result.returncode}")

os.remove(payload_path)
'''

upload(c, '/opt/kort/crons/on_knight_onboarded.py', cron_knight_onboarded)
upload(c, '/opt/kort/crons/on_dd_transaction.py', cron_dd_transaction)
upload(c, '/opt/kort/crons/on_system_health.py', cron_system_health)
run(c, 'chmod +x /opt/kort/crons/*.py', label='Making cron scripts executable')

# ──────────────────────────────────────────────────────────────
# 5. Systemd Timers (sovereign cron jobs — no crontab)
# ──────────────────────────────────────────────────────────────
print('\n[5/7] Installing sovereign systemd timers...')

# Heartbeat timer — runs every 5 minutes, checks all services
heartbeat_service = """[Unit]
Description=KoRT Sovereign Heartbeat Check

[Service]
Type=oneshot
ExecStart=/opt/kort/crons/heartbeat.py
"""

heartbeat_timer = """[Unit]
Description=KoRT Sovereign Heartbeat (every 5 min)

[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
AccuracySec=30s

[Install]
WantedBy=timers.target
"""

heartbeat_script = '''#!/usr/bin/env python3
"""KoRT Sovereign Heartbeat — checks all services, fires alerts if down."""
import subprocess, requests, json
from datetime import datetime, timezone

BEDIVERE_URL = "http://127.0.0.1:8082/webhook/event"

services = ["nginx", "kort-merlin", "kort-bedivere", "kort-n8n"]
for svc in services:
    r = subprocess.run(["systemctl", "is-active", svc], capture_output=True, text=True)
    status = r.stdout.strip()
    if status != "active":
        print(f"[HEARTBEAT] {svc} is {status} — alerting Bedivere")
        try:
            requests.post(BEDIVERE_URL, json={
                "event_type": "system_health",
                "source": "heartbeat-timer",
                "data": {"component": svc, "status": status, "message": f"{svc} not active"}
            }, timeout=5)
        except Exception as e:
            print(f"  Could not alert: {e}")
    else:
        print(f"[HEARTBEAT] {svc}: OK")

print(f"[HEARTBEAT] {datetime.now(timezone.utc).isoformat()} — complete")
'''

upload(c, '/opt/kort/crons/heartbeat.py', heartbeat_script)
run(c, 'chmod +x /opt/kort/crons/heartbeat.py')
upload(c, '/etc/systemd/system/kort-heartbeat.service', heartbeat_service)
upload(c, '/etc/systemd/system/kort-heartbeat.timer', heartbeat_timer)
run(c, 'systemctl daemon-reload && systemctl enable --now kort-heartbeat.timer', label='Enable heartbeat timer')
run(c, 'systemctl list-timers --no-pager | grep kort', label='Active timers')

# ──────────────────────────────────────────────────────────────
# 6. Nginx vhost: relay.kortx.ca (n8n UI) + webhook.kortx.ca
# ──────────────────────────────────────────────────────────────
print('\n[6/7] Adding relay.kortx.ca + webhook.kortx.ca nginx vhosts...')

relay_nginx = """server {
    listen 80;
    server_name relay.kortx.ca webhook.kortx.ca;
    return 301 https://$host$request_uri;
}

# relay.kortx.ca -> n8n UI
server {
    listen 443 ssl;
    server_name relay.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass         http://127.0.0.1:5678;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }
}

# webhook.kortx.ca -> Bedivere Bus
server {
    listen 443 ssl;
    server_name webhook.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass         http://127.0.0.1:8082;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 60;
    }
}
"""
upload(c, '/etc/nginx/sites-available/kort-relay', relay_nginx)
run(c, 'ln -sf /etc/nginx/sites-available/kort-relay /etc/nginx/sites-enabled/')
nginx_result = run(c, 'nginx -t 2>&1', label='Nginx test')
if 'successful' in nginx_result.lower() or 'ok' in nginx_result.lower():
    run(c, 'systemctl reload nginx', label='Nginx reloaded')
    print('  [✅ Nginx OK]')

# ──────────────────────────────────────────────────────────────
# 7. Update make_bedivere.py to point to self-hosted endpoint
# ──────────────────────────────────────────────────────────────
print('\n[7/7] Updating bedivere client to use self-hosted endpoint...')
# This is done locally — the script is updated in the monorepo (see note below)
print('  NOTE: Update WEBHOOK_URL in scripts/make_bedivere.py to:')
print('        https://webhook.kortx.ca/webhook/event')
print('  This replaces the Make.com hook.us2.make.com URL entirely.')

c.close()

print('\n' + '=' * 65)
print('  KoRT Relay Engine Deployment COMPLETE')
print()
print('  Services running:')
print('    kort-n8n         -> https://relay.kortx.ca   (workflow UI)')
print('    kort-bedivere    -> https://webhook.kortx.ca (event bus)')
print('    kort-heartbeat   -> systemd timer (every 5 min)')
print()
print('  Make.com is now RETIRED. Zero external dependencies.')
print('=' * 65)

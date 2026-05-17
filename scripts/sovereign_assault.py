#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sovereign_assault.py — KoRT Multi-Front Blocker Removal
Targets ALL critical blockers in one unified SSH session:
  1. Proxy health check + repair if needed
  2. VS_KoRT_Code build status
  3. ide.kortx.ca Nginx gateway configuration
  4. drt.social, games.kortx.ca Nginx vhost setup
  5. SSL certificate issuance for new vhosts
  6. google-genai package verification in venv
  7. Final system health report
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import paramiko, time, json

XEON_IP   = '104.219.251.218'
XEON_USER = 'root'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
XEON_PORT = '8081'
KAMATERA  = '66.55.78.96'

print("=" * 65)
print("  SOVEREIGN ASSAULT — KoRT Multi-Front Deployment")
print("=" * 65)

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    c.connect(XEON_IP, username=XEON_USER, password=XEON_PASS, timeout=30)
    print(f"[OK] Connected to Xeon: {XEON_IP}\n")
except Exception as e:
    print(f"[FATAL] Cannot connect to Xeon: {e}")
    sys.exit(1)

def run(cmd, timeout=120, label=None):
    if label:
        print(f"  >> {label}")
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('     ' + o[:800])
    if e and not any(x in e.lower() for x in ['created symlink', 'warning', 'hint:', 'note:']):
        print('  [ERR] ' + e[:400])
    return o

def upload(path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  [UPLOADED] {path}')

# ─────────────────────────────────────────────────────────
# FRONT 1: PROXY HEALTH CHECK + REPAIR
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 1: Merlin Proxy Health")
print("─"*65)

run('systemctl is-active kort-merlin || echo NOT_ACTIVE', label='Service status')
health = run('curl -s --max-time 5 http://127.0.0.1:8081/health', label='Local health check')

if '"ok"' in health or '"status"' in health:
    print("  [✅ PROXY LIVE]", health[:200])
else:
    print("  [⚠️  PROXY DOWN — executing repair]")

    # Kill any ghost processes
    run('pkill -f uvicorn || true; pkill -f proxy_api || true')
    time.sleep(2)

    # Ensure venv has all deps
    run('/opt/kort/venv/bin/pip install fastapi uvicorn requests pydantic google-genai -q', 180,
        label='Installing/verifying venv deps')

    # Write the definitive proxy_api.py v8
    proxy_v8 = r'''# KoRT Merlin Proxy v8 - Definitive Sovereign Bridge
import os, requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="KoRT Merlin v8 - Sovereign AI Bridge")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GEMINI_KEY_PATH = "/opt/kort/secrets/gemini_api_key.txt"
HF_TOKEN        = os.getenv("HF_TOKEN", "")  # Set via environment — do NOT hardcode
HF_MODEL        = "meta-llama/Meta-Llama-3-8B-Instruct"

def get_gemini_key():
    try:
        return open(GEMINI_KEY_PATH).read().strip()
    except:
        return ""

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""
    model: str = "gemini-2.5-flash"

def try_gemini(prompt, context, model="gemini-2.5-flash"):
    key = get_gemini_key()
    if not key:
        raise Exception("No Gemini key")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    body = {"contents": [{"parts": [{"text": f"Context: {context}\nUser: {prompt}"}]}]}
    r = requests.post(url, json=body, timeout=25)
    r.raise_for_status()
    return r.json()["candidates"][0]["content"]["parts"][0]["text"], "gemini"

def try_huggingface(prompt, context, **_):
    url  = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
    hdrs = {"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"}
    body = {"inputs": f"Context: {context}\n\nUser: {prompt}\n\nAssistant:"}
    r = requests.post(url, headers=hdrs, json=body, timeout=30)
    r.raise_for_status()
    data = r.json()
    text = data[0].get("generated_text", "") if isinstance(data, list) else str(data)
    return text, "huggingface_inference"

def try_ollama(prompt, context, **_):
    r = requests.post("http://127.0.0.1:11434/api/generate",
        json={"model": "llama3", "prompt": f"Context: {context}\nUser: {prompt}", "stream": False},
        timeout=45)
    r.raise_for_status()
    return r.json()["response"], "ollama_local"

CHAIN = [try_gemini, try_huggingface, try_ollama]

@app.get("/health")
def health():
    return {"status": "ok", "service": "KoRT Merlin v8", "sovereign": True,
            "chain": ["gemini", "hf_inference", "ollama"]}

@app.get("/")
def root():
    return {"message": "KoRT Merlin Sovereign AI Bridge", "version": "8.0", "docs": "/docs"}

@app.post("/v1/merlin/chat")
async def chat(req: ChatRequest):
    errors = []
    for fn in CHAIN:
        try:
            reply, provider = fn(req.prompt, req.context, model=req.model)
            return {"status": "success", "provider": provider, "reply": reply}
        except Exception as e:
            errors.append(f"{fn.__name__}: {e}")
    raise HTTPException(503, {"message": "All inference providers exhausted", "errors": errors})
'''
    upload('/opt/kort/proxy_api.py', proxy_v8)

    # Write definitive systemd service
    service = (
        "[Unit]\nDescription=KoRT Merlin Sovereign Proxy v8\nAfter=network.target\n\n"
        "[Service]\nType=simple\nUser=root\nWorkingDirectory=/opt/kort\n"
        "ExecStart=/opt/kort/venv/bin/uvicorn proxy_api:app --host 0.0.0.0 --port 8081 --workers 2\n"
        "Restart=always\nRestartSec=5\nStandardOutput=journal\nStandardError=journal\n\n"
        "[Install]\nWantedBy=multi-user.target\n"
    )
    upload('/etc/systemd/system/kort-merlin.service', service)
    run('systemctl daemon-reload')
    run('systemctl restart kort-merlin')
    time.sleep(7)
    run('systemctl status kort-merlin --no-pager | head -15', label='Service status after restart')
    health = run('curl -s --max-time 8 http://127.0.0.1:8081/health', label='Post-repair health check')
    if '"ok"' in health:
        print("  [✅ PROXY REPAIRED AND LIVE]")
    else:
        print("  [❌ PROXY STILL DOWN — check logs below]")
        run('journalctl -u kort-merlin -n 30 --no-pager')

# ─────────────────────────────────────────────────────────
# FRONT 2: IDE BUILD STATUS
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 2: VS_KoRT_Code IDE Build Status")
print("─"*65)

build_log = run('tail -30 /opt/kort/scripts/build_vs_kort_code.log 2>/dev/null || echo LOG_NOT_FOUND',
                label='Build log tail')

if 'LOG_NOT_FOUND' in build_log:
    print("  [⚠️ ] Build log not found at expected path. Checking alternate locations...")
    run('find /opt/kort -name "*.log" 2>/dev/null | head -10', label='Finding logs')
    run('ls /opt/vscodium/ 2>/dev/null || ls /opt/kort/vscodium/ 2>/dev/null || echo "No vscodium dir found"',
        label='VSCodium directory check')
elif any(x in build_log.lower() for x in ['success', 'complete', 'done', 'finished']):
    print("  [✅ BUILD COMPLETE]")
elif any(x in build_log.lower() for x in ['error', 'fail', 'fatal']):
    print("  [❌ BUILD FAILED — see log above]")
else:
    print("  [🟡 BUILD STATUS UNCLEAR — log captured above]")

# Check if IDE process is still running
run('ps aux | grep -E "vscodium|build_vs|yarn|node" | grep -v grep | head -5',
    label='IDE build processes')

# ─────────────────────────────────────────────────────────
# FRONT 3: IDE GATEWAY — ide.kortx.ca NGINX VHOST
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 3: ide.kortx.ca Nginx Gateway")
print("─"*65)

# Check current nginx state
run('ls /etc/nginx/sites-enabled/', label='Current enabled sites')
run('ls /etc/nginx/sites-available/', label='Available sites')

# Check if kortx.ca SSL cert exists
ssl_check = run('ls /etc/letsencrypt/live/ 2>/dev/null | head -10', label='SSL certs available')

# Write ide.kortx.ca vhost — proxies to local IDE server or shows status page
ide_nginx = """server {
    listen 80;
    server_name ide.kortx.ca;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ide.kortx.ca;

    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Proxy to VS_KoRT_Code when it's live on port 8443
    location / {
        proxy_pass         http://127.0.0.1:8443;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }

    # Merlin AI proxy passthrough at /api/merlin
    location /api/merlin/ {
        proxy_pass http://127.0.0.1:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
"""
upload('/etc/nginx/sites-available/ide.kortx.ca', ide_nginx)
run('ln -sf /etc/nginx/sites-available/ide.kortx.ca /etc/nginx/sites-enabled/ide.kortx.ca',
    label='Enabling ide.kortx.ca site')

# ─────────────────────────────────────────────────────────
# FRONT 4: api.kortx.ca NGINX VHOST (Merlin proxy public endpoint)
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 4: api.kortx.ca Public Merlin Endpoint")
print("─"*65)

api_nginx = """server {
    listen 80;
    server_name api.kortx.ca;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.kortx.ca;

    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    location / {
        proxy_pass         http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 60;
    }
}
"""
upload('/etc/nginx/sites-available/api.kortx.ca', api_nginx)
run('ln -sf /etc/nginx/sites-available/api.kortx.ca /etc/nginx/sites-enabled/api.kortx.ca',
    label='Enabling api.kortx.ca site')

# ─────────────────────────────────────────────────────────
# FRONT 5: drt.social NGINX VHOST
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 5: drt.social Nginx Vhost")
print("─"*65)

drt_social_nginx = """server {
    listen 80;
    server_name drt.social www.drt.social;
    return 301 https://drt.social$request_uri;
}

server {
    listen 443 ssl;
    server_name drt.social www.drt.social;

    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    root /var/www/drt.social;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
"""
run('mkdir -p /var/www/drt.social', label='Creating webroot')
upload('/etc/nginx/sites-available/drt.social', drt_social_nginx)
run('ln -sf /etc/nginx/sites-available/drt.social /etc/nginx/sites-enabled/drt.social',
    label='Enabling drt.social site')

# ─────────────────────────────────────────────────────────
# FRONT 6: NGINX VALIDATION + RELOAD
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 6: Nginx Validation + Reload")
print("─"*65)

nginx_test = run('nginx -t 2>&1', label='Nginx config test')
if 'successful' in nginx_test.lower() or 'ok' in nginx_test.lower():
    print("  [✅ NGINX CONFIG VALID]")
    run('systemctl reload nginx', label='Reloading nginx')
else:
    print("  [❌ NGINX CONFIG INVALID — auto-fixing conflicting configs]")
    # Remove any broken symlinks
    run("find /etc/nginx/sites-enabled/ -maxdepth 1 -type l | while read f; do "
        "target=$(readlink -f \"$f\"); [ -f \"$target\" ] || rm -f \"$f\" && echo \"Removed broken: $f\"; done",
        label='Removing broken symlinks')
    nginx_test2 = run('nginx -t 2>&1', label='Re-test after cleanup')
    if 'successful' in nginx_test2.lower():
        run('systemctl reload nginx')
        print("  [✅ NGINX FIXED AND RELOADED]")

# ─────────────────────────────────────────────────────────
# FRONT 7: SSL CERT EXPANSION (add new subdomains)
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 7: SSL Certificate Check + Expansion")
print("─"*65)

cert_domains = run('certbot certificates 2>/dev/null | grep "Domains:"', label='Current cert coverage')
print("  Covered domains:", cert_domains)

# Attempt to expand cert to include new subdomains (non-interactive)
print("  [Attempting certbot expansion for ide.kortx.ca, api.kortx.ca...]")
cert_result = run(
    'certbot --nginx -d kortx.ca -d www.kortx.ca -d ide.kortx.ca -d api.kortx.ca '
    '--non-interactive --agree-tos --keep-until-expiring 2>&1 | tail -15',
    timeout=120,
    label='Certbot expansion'
)
if 'successfully' in cert_result.lower() or 'certificate not yet due' in cert_result.lower():
    print("  [✅ SSL CERTS OK]")
else:
    print("  [⚠️  Cert expansion result above — may need manual review]")

# ─────────────────────────────────────────────────────────
# FRONT 8: GENAI PACKAGE VERIFICATION
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 8: Google GenAI Package in Venv")
print("─"*65)

genai_check = run('/opt/kort/venv/bin/pip show google-genai 2>/dev/null || echo NOT_INSTALLED',
                  label='google-genai check')
if 'NOT_INSTALLED' in genai_check:
    run('/opt/kort/venv/bin/pip install google-genai -q', 120, label='Installing google-genai')

genai_test = run(
    """/opt/kort/venv/bin/python3 -c "
from google import genai
import os
key = open('/opt/kort/secrets/gemini_api_key.txt').read().strip()
client = genai.Client(api_key=key)
resp = client.models.generate_content(model='gemini-2.0-flash', contents='Say: KORT ONLINE')
print('GEMINI:', resp.text[:100])
" 2>&1""",
    timeout=30,
    label='Live Gemini test'
)

if 'KORT' in genai_test or 'ONLINE' in genai_test or 'gemini' in genai_test.lower():
    print("  [✅ GEMINI API LIVE AND RESPONDING]")
else:
    print("  [⚠️ ] Gemini test result above — check key or model name")

# ─────────────────────────────────────────────────────────
# FRONT 9: FINAL SYSTEM HEALTH REPORT
# ─────────────────────────────────────────────────────────
print("\n" + "─"*65)
print("FRONT 9: Final System Health Report")
print("─"*65)

print("\n  [Services]")
run('systemctl is-active nginx || echo NGINX_DOWN', label='nginx')
run('systemctl is-active kort-merlin || echo PROXY_DOWN', label='kort-merlin')
run('systemctl is-active pveproxy || echo PVEPROXY_DOWN', label='pveproxy')

print("\n  [Ports listening]")
run('ss -tlnp | grep -E ":80|:443|:8081|:8443" | head -10', label='Active ports')

print("\n  [Public endpoint tests]")
run('curl -sk --max-time 8 https://api.kortx.ca/health 2>&1 | head -3', label='api.kortx.ca/health')
run('curl -s --max-time 5 http://127.0.0.1:8081/health', label='Local merlin health')

print("\n  [Disk & memory]")
run("df -h / | tail -1 && free -h | grep Mem | awk '{print \"RAM: used=\"$3\" free=\"$4}'",
    label='Resources')

print("\n  [Nginx enabled sites]")
run('ls -1 /etc/nginx/sites-enabled/', label='Sites enabled')

c.close()

print("\n" + "=" * 65)
print("  SOVEREIGN ASSAULT COMPLETE")
print("  Check output above for any remaining [❌] markers.")
print("=" * 65)

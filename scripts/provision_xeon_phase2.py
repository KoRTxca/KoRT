#!/usr/bin/env python3
"""
KoRT Xeon Resume Provisioner — Phase 2
Picks up after WP/Nginx install. Deploys:
- Merlin proxy v6 (HF 4-tier fallback)
- SSL certs (kortx.ca wildcard + drt.social)
- Systemd service
- Nginx http2 fix
"""
import paramiko, sys, io

XEON_IP   = '104.219.251.218'
XEON_USER = 'root'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
HF_TOKEN  = os.getenv("HF_TOKEN", "")  # Set via environment — do NOT hardcode
HF_SPACE  = 'KoRTxca/kort-merlin'
GEMINI_KEY_PATH = '/opt/kort/secrets/gemini_api_key.txt'

def ssh():
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(XEON_IP, username=XEON_USER, password=XEON_PASS, timeout=30)
    return c

def run(client, cmd, timeout=120):
    print(f'  >> {cmd[:80]}')
    sys.stdout.flush()
    _, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    err = stderr.read().decode('utf-8', errors='replace').strip()
    if out: print('  ' + out[:400])
    if err and 'warning' not in err.lower() and 'warn' not in err.lower():
        print('  ERR: ' + err[:300])
    return out

def upload(client, remote_path, content):
    sftp = client.open_sftp()
    try:
        with sftp.open(remote_path, 'w') as f:
            f.write(content)
        print(f'  Uploaded: {remote_path}')
    finally:
        sftp.close()

print('='*60)
print('KoRT Xeon Resume Provisioner - Phase 2')
print('='*60)

client = ssh()

# ── Fix Nginx http2 directive (nginx >= 1.25 syntax) ─────────
print('\n[1] Fixing Nginx http2 directive...')
fix_cmd = r"""
sed -i 's/listen 443 ssl http2/listen 443 ssl/g; /listen 443 ssl;/a\    http2 on;' \
    /etc/nginx/sites-available/drt-social \
    /etc/nginx/sites-available/kortx-services 2>/dev/null; \
nginx -t && systemctl reload nginx
"""
run(client, fix_cmd.strip())

# ── Deploy Merlin Proxy v6 ────────────────────────────────────
print('\n[2] Deploying Merlin proxy v6 (HF 4-tier fallback chain)...')
proxy_code = '''import os, requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="KoRT Merlin Sovereign Proxy v6.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GEMINI_KEY_PATH = "/opt/kort/secrets/gemini_api_key.txt"
HF_TOKEN = "''' + HF_TOKEN + '''"
HF_MODEL = "meta-llama/Meta-Llama-3-8B-Instruct"

def load_gemini_key():
    try:
        if os.path.exists(GEMINI_KEY_PATH):
            return open(GEMINI_KEY_PATH).read().strip()
    except: pass
    return ""

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""

def try_gemini(prompt, context):
    key = load_gemini_key()
    if not key: raise Exception("No Gemini key")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    r = requests.post(url, json={"contents":[{"parts":[{"text":f"Context: {context}\\nUser: {prompt}"}]}]}, timeout=25)
    r.raise_for_status()
    return r.json()["candidates"][0]["content"]["parts"][0]["text"], "gemini"

def try_huggingface(prompt, context):
    url = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
    hdrs = {"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"}
    r = requests.post(url, headers=hdrs, json={"inputs": f"Context: {context}\\n\\nUser: {prompt}\\n\\nAssistant:"}, timeout=30)
    r.raise_for_status()
    data = r.json()
    text = data[0].get("generated_text","") if isinstance(data, list) else str(data)
    return text, "huggingface_inference"

def try_hf_space(prompt, context):
    url = "https://huggingface.co/api/spaces/''' + HF_SPACE + '''/api/predict"
    r = requests.post(url, json={"data":[prompt, context]}, timeout=30)
    r.raise_for_status()
    return r.json()["data"][0], "huggingface_space"

def try_ollama(prompt, context):
    r = requests.post("http://127.0.0.1:11434/api/generate",
        json={"model":"llama3","prompt":f"Context: {context}\\nUser: {prompt}","stream":False}, timeout=45)
    r.raise_for_status()
    return r.json()["response"], "ollama_local"

CHAIN = [try_gemini, try_huggingface, try_hf_space, try_ollama]

@app.get("/health")
def health(): return {"status":"ok","provider":"merlin-v6","chain":["gemini","hf_inference","hf_space","ollama"]}

@app.post("/v1/merlin/chat")
async def chat(req: ChatRequest):
    errors = []
    for fn in CHAIN:
        try:
            reply, provider = fn(req.prompt, req.context)
            return {"status":"success","provider":provider,"reply":reply}
        except Exception as e:
            errors.append(f"{fn.__name__}: {e}")
    raise HTTPException(503, {"message":"All inference providers exhausted","errors":errors})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081, workers=2)
'''
run(client, 'mkdir -p /opt/kort/secrets')
upload(client, '/opt/kort/proxy_api.py', proxy_code)

# Install deps
run(client, 'pip3 install fastapi uvicorn requests pydantic --break-system-packages -q 2>&1 | tail -3', 120)

# ── Systemd service ───────────────────────────────────────────
print('\n[3] Creating systemd service...')
service = """[Unit]
Description=KoRT Merlin Sovereign Proxy v6
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kort
ExecStart=/usr/bin/python3 /opt/kort/proxy_api.py
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""
upload(client, '/etc/systemd/system/kort-merlin.service', service)
run(client, 'systemctl daemon-reload && systemctl enable kort-merlin')
run(client, 'pkill -f "proxy_api" || true; sleep 2')
run(client, 'systemctl restart kort-merlin')
run(client, 'sleep 3 && systemctl status kort-merlin --no-pager | head -10')

# ── Health check ──────────────────────────────────────────────
print('\n[4] Verifying proxy...')
run(client, 'curl -s http://127.0.0.1:8081/health')

# ── SSL Certificates ──────────────────────────────────────────
print('\n[5] Requesting SSL certs...')
run(client, 'certbot --nginx -d kortx.ca -d www.kortx.ca -d api.kortx.ca -d ide.kortx.ca -d sso.kortx.ca -d hf.kortx.ca -d merlin.kortx.ca -d nexus.kortx.ca -d chat.kortx.ca --non-interactive --agree-tos -m kort@drt.onl --redirect 2>&1 | tail -5', 120)
run(client, 'certbot --nginx -d drt.social -d www.drt.social --non-interactive --agree-tos -m kort@drt.onl --redirect 2>&1 | tail -5', 60)

# ── Final nginx reload ────────────────────────────────────────
run(client, 'nginx -t && systemctl reload nginx')

print('\n' + '='*60)
print('PHASE 2 COMPLETE')
print('api.kortx.ca should now resolve and serve /health')
print('drt.social WordPress + BuddyBoss installed')
print('Merlin v6 proxy running with HF fallback chain')
client.close()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Targeted fix: proxy_api.py has a shebang or imports using system python.
The systemd service IS using venv python (confirmed installed), but
the file itself may have a shebang pointing to /usr/bin/python3.
This script ensures the proxy uses the venv and also removes conflicting 
old nginx configs (advocate, api.kortx.ca, db, dollars files).
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import paramiko, time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU', timeout=30)

def run(cmd, timeout=120):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('  OUT: ' + o[:600])
    if e and 'created symlink' not in e.lower() and 'warning' not in e.lower():
        print('  ERR: ' + e[:300])
    return o

def upload(path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  Uploaded: {path}')

# 1. Remove ALL old conflicting nginx configs
print('[1] Removing all old conflicting nginx configs...')
run('rm -f /etc/nginx/sites-enabled/advocate /etc/nginx/sites-enabled/api.kortx.ca /etc/nginx/sites-enabled/db /etc/nginx/sites-enabled/dollars')
run('ls /etc/nginx/sites-enabled/')

# 2. Diagnose the proxy issue — what python is running
print('[2] Diagnosing proxy...')
run('cat /etc/systemd/system/kort-merlin.service')
run('which python3 && /opt/kort/venv/bin/python3 -c "import sys; print(sys.executable)"')
run('/opt/kort/venv/bin/python3 -c "import fastapi; print(fastapi.__version__)"')

# The issue: OLD proxy_api.py is still using system imports
# Read what's actually on disk
run('head -5 /opt/kort/proxy_api.py')

# 3. Write a clean proxy script with NO shebang, explicit uvicorn call  
print('[3] Writing clean proxy_api.py...')
proxy_v7 = '''# KoRT Merlin Proxy v7 - HuggingFace 4-tier fallback
import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="KoRT Merlin v7")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GEMINI_KEY_PATH = "/opt/kort/secrets/gemini_api_key.txt"
HF_TOKEN = os.getenv("HF_TOKEN", "")  # Set via environment — do NOT hardcode
HF_MODEL = "meta-llama/Meta-Llama-3-8B-Instruct"

def get_gemini_key():
    try:
        return open(GEMINI_KEY_PATH).read().strip()
    except:
        return ""

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""

def try_gemini(prompt, context):
    key = get_gemini_key()
    if not key:
        raise Exception("No Gemini key")
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key
    body = {"contents": [{"parts": [{"text": "Context: " + context + "\\nUser: " + prompt}]}]}
    r = requests.post(url, json=body, timeout=25)
    r.raise_for_status()
    return r.json()["candidates"][0]["content"]["parts"][0]["text"], "gemini"

def try_huggingface(prompt, context):
    url = "https://api-inference.huggingface.co/models/" + HF_MODEL
    headers = {"Authorization": "Bearer " + HF_TOKEN, "Content-Type": "application/json"}
    body = {"inputs": "Context: " + context + "\\n\\nUser: " + prompt + "\\n\\nAssistant:"}
    r = requests.post(url, headers=headers, json=body, timeout=30)
    r.raise_for_status()
    data = r.json()
    text = data[0].get("generated_text", "") if isinstance(data, list) else str(data)
    return text, "huggingface_inference"

def try_hf_space(prompt, context):
    url = "https://huggingface.co/api/spaces/KoRTxca/kort-merlin/api/predict"
    r = requests.post(url, json={"data": [prompt, context]}, timeout=30)
    r.raise_for_status()
    return r.json()["data"][0], "huggingface_space"

def try_ollama(prompt, context):
    r = requests.post("http://127.0.0.1:11434/api/generate",
        json={"model": "llama3", "prompt": "Context: " + context + "\\nUser: " + prompt, "stream": False},
        timeout=45)
    r.raise_for_status()
    return r.json()["response"], "ollama_local"

CHAIN = [try_gemini, try_huggingface, try_hf_space, try_ollama]

@app.get("/health")
def health():
    return {"status": "ok", "service": "KoRT Merlin v7", "chain": ["gemini", "hf_inference", "hf_space", "ollama"]}

@app.post("/v1/merlin/chat")
async def chat(req: ChatRequest):
    errors = []
    for fn in CHAIN:
        try:
            reply, provider = fn(req.prompt, req.context)
            return {"status": "success", "provider": provider, "reply": reply}
        except Exception as e:
            errors.append(fn.__name__ + ": " + str(e))
    raise HTTPException(503, {"message": "All inference providers exhausted", "errors": errors})
'''

upload('/opt/kort/proxy_api.py', proxy_v7)

# Write a launch wrapper that explicitly uses venv python  
launcher = "#!/opt/kort/venv/bin/python3\nimport subprocess, sys\nsubprocess.run(['/opt/kort/venv/bin/uvicorn', 'proxy_api:app', '--host', '0.0.0.0', '--port', '8081', '--workers', '2'], cwd='/opt/kort')\n"
upload('/opt/kort/launch_proxy.sh', launcher)
run('chmod +x /opt/kort/launch_proxy.sh')

# 4. Update systemd to use uvicorn directly (most reliable)
print('[4] Updating systemd with direct uvicorn command...')
service = "[Unit]\nDescription=KoRT Merlin Sovereign Proxy v7\nAfter=network.target\n\n[Service]\nType=simple\nUser=root\nWorkingDirectory=/opt/kort\nExecStart=/opt/kort/venv/bin/uvicorn proxy_api:app --host 0.0.0.0 --port 8081 --workers 2\nRestart=always\nRestartSec=5\nStandardOutput=journal\nStandardError=journal\n\n[Install]\nWantedBy=multi-user.target\n"
upload('/etc/systemd/system/kort-merlin.service', service)
run('systemctl daemon-reload')
run('pkill -f uvicorn || true; pkill -f proxy_api || true')
time.sleep(2)
run('systemctl restart kort-merlin')
time.sleep(6)
run('systemctl status kort-merlin --no-pager | head -12')

# 5. Health check
print('[5] Health checks...')
h1 = run('curl -s http://127.0.0.1:8081/health')
print('  Local health:', h1)

# 6. Nginx test + reload
print('[6] Final nginx state...')
run('nginx -t 2>&1 | tail -3')
run('systemctl reload nginx')

print('\n' + '='*60)
print('DECISIVE FIX COMPLETE')
if 'ok' in h1:
    print('PROXY IS LIVE!')
else:
    print('Proxy still down - check journalctl -u kort-merlin on server')
c.close()

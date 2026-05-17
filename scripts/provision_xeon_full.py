#!/usr/bin/env python3
"""
KoRT Sovereign Xeon Provisioner
Deploys: Nginx, MariaDB, WP-CLI, Certbot, Redis, WordPress (drt.social + BuddyBoss),
         Merlin Proxy (HF fallback chain), HuggingFace bridge
Target: 104.219.251.218
"""
import paramiko, time

XEON_IP   = '104.219.251.218'
XEON_USER = 'root'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
KAMATERA  = '66.55.78.96'

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
    _, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='ignore').strip()
    err = stderr.read().decode('utf-8', errors='ignore').strip()
    if out: print('  ' + out[:300])
    if err and 'warning' not in err.lower(): print('  ERR: ' + err[:200])
    return out

def upload(client, remote_path, content):
    sftp = client.open_sftp()
    try:
        f = sftp.open(remote_path, 'w')
        f.write(content)
        f.close()
        print(f'  Uploaded: {remote_path}')
    finally:
        sftp.close()

print('='*60)
print('KoRT Xeon Sovereign Provisioner')
print('='*60)

client = ssh()

# ── 1. Base packages ──────────────────────────────────────────
print('\n[1/8] Installing base packages...')
run(client, 'apt update -qq && apt install -y nginx mariadb-server php php-fpm php-mysql php-curl php-xml php-mbstring php-zip php-imagick php-redis redis-server certbot python3-certbot-nginx wget curl unzip git python3-pip', 180)

# ── 2. WP-CLI ─────────────────────────────────────────────────
print('\n[2/8] Installing WP-CLI...')
run(client, 'curl -s -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x /usr/local/bin/wp')

# ── 3. MariaDB databases ──────────────────────────────────────
print('\n[3/8] Setting up MariaDB...')
db_cmds = """
CREATE DATABASE IF NOT EXISTS drt_social CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS drt_onl CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'kortadmin'@'localhost' IDENTIFIED BY 'K0rT_Sup3r_S3cr3t!';
GRANT ALL PRIVILEGES ON drt_social.* TO 'kortadmin'@'localhost';
GRANT ALL PRIVILEGES ON drt_onl.* TO 'kortadmin'@'localhost';
FLUSH PRIVILEGES;
"""
run(client, f'mysql -e "{db_cmds.strip()}"')

# ── 4. WordPress drt.social ───────────────────────────────────
print('\n[4/8] Installing WordPress for drt.social...')
run(client, 'mkdir -p /var/www/drt-social && chown -R www-data:www-data /var/www/drt-social')
run(client, 'sudo -u www-data wp core download --path=/var/www/drt-social --allow-root --quiet')
run(client, "sudo -u www-data wp config create --path=/var/www/drt-social --dbname=drt_social --dbuser=kortadmin --dbpass='K0rT_Sup3r_S3cr3t!' --dbhost=localhost --allow-root")
run(client, "sudo -u www-data wp core install --path=/var/www/drt-social --url=https://drt.social --title='DRT Social Network' --admin_user=kortadmin --admin_password='K0rT_Sov3r3ign!' --admin_email=kort@drt.onl --allow-root")

# Enable multisite
run(client, "sudo -u www-data wp core multisite-convert --path=/var/www/drt-social --allow-root --quiet")

# Install BuddyBoss (free) + essential plugins
run(client, "sudo -u www-data wp plugin install buddypress --activate --path=/var/www/drt-social --allow-root --quiet")
run(client, "sudo -u www-data wp plugin install wordfence --activate --path=/var/www/drt-social --allow-root --quiet")
run(client, "sudo -u www-data wp plugin install redis-cache --activate --path=/var/www/drt-social --allow-root --quiet")
run(client, "sudo -u www-data wp plugin install wp-super-cache --activate --path=/var/www/drt-social --allow-root --quiet")
run(client, "sudo -u www-data wp plugin install user-registration --path=/var/www/drt-social --allow-root --quiet")

# ── 5. Nginx vhosts ───────────────────────────────────────────
print('\n[5/8] Configuring Nginx vhosts...')

nginx_drt_social = """
server {
    listen 80;
    server_name drt.social www.drt.social;
    return 301 https://drt.social$request_uri;
}
server {
    listen 443 ssl http2;
    server_name drt.social www.drt.social;
    root /var/www/drt-social;
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/drt.social/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drt.social/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / { try_files $uri $uri/ /index.php?$args; }
    location ~ \\.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d; add_header Cache-Control "public, immutable";
    }
    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { allow all; log_not_found off; access_log off; }
}
"""

nginx_kortx = """
server {
    listen 80;
    server_name api.kortx.ca ide.kortx.ca sso.kortx.ca chat.kortx.ca hf.kortx.ca merlin.kortx.ca nexus.kortx.ca kortx.ca www.kortx.ca;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl http2;
    server_name api.kortx.ca merlin.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 60;
    }
}
server {
    listen 443 ssl http2;
    server_name ide.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / {
        proxy_pass http://127.0.0.1:8443;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
server {
    listen 443 ssl http2;
    server_name hf.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/kortx.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kortx.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
"""

upload(client, '/etc/nginx/sites-available/drt-social', nginx_drt_social)
upload(client, '/etc/nginx/sites-available/kortx-services', nginx_kortx)
run(client, 'ln -sf /etc/nginx/sites-available/drt-social /etc/nginx/sites-enabled/')
run(client, 'ln -sf /etc/nginx/sites-available/kortx-services /etc/nginx/sites-enabled/')
run(client, 'rm -f /etc/nginx/sites-enabled/default')
run(client, 'nginx -t && systemctl reload nginx')

# ── 6. Updated Merlin Proxy (4-tier HF fallback) ──────────────
print('\n[6/8] Deploying Merlin proxy with HuggingFace fallback chain...')
proxy_code = f'''import os, requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="KoRT Merlin Sovereign Proxy v6.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

GEMINI_KEY = open("{GEMINI_KEY_PATH}").read().strip() if os.path.exists("{GEMINI_KEY_PATH}") else ""
HF_TOKEN   = "{HF_TOKEN}"
HF_MODEL   = "meta-llama/Meta-Llama-3-8B-Instruct"
HF_SPACE   = "https://huggingface.co/api/spaces/{HF_SPACE}/api/predict"

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""

def try_gemini(prompt, context):
    if not GEMINI_KEY: raise Exception("No Gemini key")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={{GEMINI_KEY}}"
    r = requests.post(url, json={{"contents":[{{"parts":[{{"text":f"Context: {{context}}\\nUser: {{prompt}}"}}]}}]}}, timeout=25)
    r.raise_for_status()
    return r.json()["candidates"][0]["content"]["parts"][0]["text"], "gemini"

def try_huggingface_inference(prompt, context):
    url = f"https://api-inference.huggingface.co/models/{{HF_MODEL}}"
    hdrs = {{"Authorization": f"Bearer {{HF_TOKEN}}", "Content-Type": "application/json"}}
    r = requests.post(url, headers=hdrs, json={{"inputs": f"Context: {{context}}\\n\\nUser: {{prompt}}\\n\\nAssistant:"}}, timeout=30)
    r.raise_for_status()
    data = r.json()
    if isinstance(data, list): return data[0].get("generated_text",""), "huggingface_inference"
    return str(data), "huggingface_inference"

def try_hf_space(prompt, context):
    r = requests.post(HF_SPACE, json={{"data":[prompt, context]}}, timeout=30)
    r.raise_for_status()
    return r.json()["data"][0], "huggingface_space"

def try_local_ollama(prompt, context):
    r = requests.post("http://127.0.0.1:11434/api/generate",
        json={{"model":"llama3","prompt":f"Context: {{context}}\\nUser: {{prompt}}","stream":False}}, timeout=45)
    r.raise_for_status()
    return r.json()["response"], "ollama_local"

FALLBACK_CHAIN = [try_gemini, try_huggingface_inference, try_hf_space, try_local_ollama]

@app.get("/health")
def health(): return {{"status":"ok","provider":"sovereign-merlin-v6"}}

@app.post("/v1/merlin/chat")
async def merlin_chat(req: ChatRequest):
    for fn in FALLBACK_CHAIN:
        try:
            reply, provider = fn(req.prompt, req.context)
            return {{"status":"success","provider":provider,"reply":reply}}
        except Exception as e:
            continue
    raise HTTPException(500, "All inference providers exhausted")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081, workers=2)
'''
run(client, 'mkdir -p /opt/kort/secrets')
upload(client, '/opt/kort/proxy_api.py', proxy_code)
run(client, 'pip3 install --quiet fastapi uvicorn requests pydantic --break-system-packages')
run(client, 'pkill -f "proxy_api" || true')
run(client, 'nohup python3 -m uvicorn proxy_api:app --host 0.0.0.0 --port 8081 --workers 2 > /opt/kort/proxy.log 2>&1 &', timeout=5)

# ── 7. SSL Certificates ───────────────────────────────────────
print('\n[7/8] Requesting SSL certificates...')
run(client, 'certbot --nginx -d kortx.ca -d www.kortx.ca -d api.kortx.ca -d ide.kortx.ca -d sso.kortx.ca -d hf.kortx.ca -d merlin.kortx.ca --non-interactive --agree-tos -m kort@drt.onl --redirect', 120)
# drt.social cert (only if DNS is propagated)
run(client, 'certbot --nginx -d drt.social -d www.drt.social --non-interactive --agree-tos -m kort@drt.onl --redirect 2>&1 || echo "drt.social cert pending DNS propagation"', 60)

# ── 8. Systemd service for Merlin ─────────────────────────────
print('\n[8/8] Creating systemd service for Merlin proxy...')
service = """[Unit]
Description=KoRT Merlin Sovereign Proxy
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/kort
ExecStart=/usr/bin/python3 -m uvicorn proxy_api:app --host 0.0.0.0 --port 8081 --workers 2
Restart=always
RestartSec=5
Environment=PYTHONPATH=/opt/kort

[Install]
WantedBy=multi-user.target
"""
upload(client, '/etc/systemd/system/kort-merlin.service', service)
run(client, 'systemctl daemon-reload && systemctl enable kort-merlin && systemctl restart kort-merlin')

print('\n' + '='*60)
print('Xeon Provisioner COMPLETE')
run(client, 'systemctl status kort-merlin --no-pager -l | head -15')
run(client, 'curl -s http://127.0.0.1:8081/health')
client.close()

#!/usr/bin/env python3
"""
KoRT Xeon Fix Script - Repairs nginx config + proxy
"""
import paramiko, sys, time
sys.stdout.reconfigure(encoding='utf-8')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU', timeout=30)

def run(cmd, timeout=90):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('  ' + o[:500])
    if e and 'warning' not in e.lower() and 'Created symlink' not in e: print('  ERR: ' + e[:400])
    return o

def upload(path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  Uploaded: {path}')

# ── Fix nginx: rewrite configs without duplicate http2 ────────
print('[1] Rewriting nginx configs cleanly...')

drt_social_conf = """\
server {
    listen 80;
    server_name drt.social www.drt.social;
    return 301 https://drt.social$request_uri;
}
server {
    listen 443 ssl;
    http2 on;
    server_name drt.social www.drt.social;
    root /var/www/drt-social;
    index index.php;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    location / { try_files $uri $uri/ /index.php?$args; }
    location ~ \\.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
"""

kortx_conf = """\
server {
    listen 80;
    server_name kortx.ca www.kortx.ca api.kortx.ca ide.kortx.ca sso.kortx.ca hf.kortx.ca merlin.kortx.ca nexus.kortx.ca chat.kortx.ca;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    http2 on;
    server_name api.kortx.ca merlin.kortx.ca;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
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
    listen 443 ssl;
    http2 on;
    server_name ide.kortx.ca;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
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
    listen 443 ssl;
    http2 on;
    server_name hf.kortx.ca;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
server {
    listen 443 ssl;
    http2 on;
    server_name kortx.ca www.kortx.ca;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    return 200 'KoRT Sovereign Infrastructure — Online';
    add_header Content-Type text/plain;
}
"""

run('apt install -y ssl-cert -qq')
upload('/etc/nginx/sites-available/drt-social', drt_social_conf)
upload('/etc/nginx/sites-available/kortx-services', kortx_conf)
run('ln -sf /etc/nginx/sites-available/drt-social /etc/nginx/sites-enabled/')
run('ln -sf /etc/nginx/sites-available/kortx-services /etc/nginx/sites-enabled/')
run('rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/ide-gateway /etc/nginx/sites-enabled/api-gateway 2>/dev/null || true')

print('\n[2] Testing nginx...')
result = run('nginx -t 2>&1')
if 'successful' in result or 'ok' in result.lower():
    run('systemctl reload nginx')
    print('  Nginx OK and reloaded!')
else:
    print('  Nginx still broken:', result[:200])

# ── Check proxy failure ───────────────────────────────────────
print('\n[3] Checking proxy failure reason...')
run('journalctl -u kort-merlin -n 25 --no-pager 2>&1 | tail -20')

# Try to run proxy directly to see error
print('\n[4] Testing proxy import...')
run('cd /opt/kort && python3 -c "import fastapi; import uvicorn; print(\'OK\')" 2>&1')
run('cd /opt/kort && python3 -c "from proxy_api import app; print(\'Import OK\')" 2>&1 | head -10')

# Restart
print('\n[5] Restarting proxy service...')
run('systemctl restart kort-merlin')
time.sleep(4)
run('systemctl status kort-merlin --no-pager | head -15')
health = run('curl -s http://127.0.0.1:8081/health 2>&1')
print('  Health:', health)

# ── SSL with ACME standalone (bypass nginx plugin issue) ──────
print('\n[6] Requesting SSL certs (standalone mode)...')
run('systemctl stop nginx')
run('certbot certonly --standalone -d kortx.ca -d www.kortx.ca -d api.kortx.ca -d ide.kortx.ca -d sso.kortx.ca -d hf.kortx.ca -d merlin.kortx.ca -d nexus.kortx.ca -d chat.kortx.ca --non-interactive --agree-tos -m kort@drt.onl 2>&1 | tail -8', 120)
run('systemctl start nginx')

# Update nginx configs to use real certs if they exist
cert_check = run('ls /etc/letsencrypt/live/kortx.ca/fullchain.pem 2>&1')
if 'fullchain.pem' in cert_check:
    print('  Real certs found! Updating nginx to use them...')
    run("sed -i 's|/etc/ssl/certs/ssl-cert-snakeoil.pem|/etc/letsencrypt/live/kortx.ca/fullchain.pem|g' /etc/nginx/sites-available/kortx-services")
    run("sed -i 's|/etc/ssl/private/ssl-cert-snakeoil.key|/etc/letsencrypt/live/kortx.ca/privkey.pem|g' /etc/nginx/sites-available/kortx-services")
    run('nginx -t && systemctl reload nginx')

print('\n' + '='*60)
print('FIX SCRIPT COMPLETE')
run('nginx -t 2>&1 | tail -2')
run('curl -sk https://api.kortx.ca/health 2>&1 | head -3')
c.close()

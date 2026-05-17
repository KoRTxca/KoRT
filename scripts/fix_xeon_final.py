#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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

# 1. Remove conflicting old nginx configs
print('[1] Cleaning up nginx sites-enabled...')
run('ls /etc/nginx/sites-enabled/')
run('rm -f /etc/nginx/sites-enabled/nginx_proxy /etc/nginx/sites-enabled/api-gateway /etc/nginx/sites-enabled/ide-gateway')
run('ls /etc/nginx/sites-enabled/')

# 2. Fix drt-social to use kortx.ca cert temporarily (until drt.social DNS propagates)
print('[2] Patching drt-social nginx to use kortx.ca cert temporarily...')
run("sed -i 's|/etc/ssl/certs/ssl-cert-snakeoil.pem|/etc/letsencrypt/live/kortx.ca/fullchain.pem|g' /etc/nginx/sites-available/drt-social")
run("sed -i 's|/etc/ssl/private/ssl-cert-snakeoil.key|/etc/letsencrypt/live/kortx.ca/privkey.pem|g' /etc/nginx/sites-available/drt-social")
print('[2b] Nginx test...')
run('nginx -t 2>&1')
run('systemctl reload nginx')

# 3. Install FastAPI in venv
print('[3] Installing FastAPI in venv...')
run('python3 -m venv /opt/kort/venv')
run('/opt/kort/venv/bin/pip install fastapi uvicorn requests pydantic -q', 120)
ver = run('/opt/kort/venv/bin/python -c "import fastapi; print(fastapi.__version__)"')
print('  FastAPI version:', ver)

# 4. Rewrite systemd service to use venv
print('[4] Updating systemd service...')
service_content = "[Unit]\nDescription=KoRT Merlin Sovereign Proxy v6\nAfter=network.target\n\n[Service]\nType=simple\nUser=root\nWorkingDirectory=/opt/kort\nExecStart=/opt/kort/venv/bin/python /opt/kort/proxy_api.py\nRestart=always\nRestartSec=5\nStandardOutput=journal\nStandardError=journal\n\n[Install]\nWantedBy=multi-user.target\n"
upload('/etc/systemd/system/kort-merlin.service', service_content)
run('systemctl daemon-reload')
run('systemctl restart kort-merlin')
time.sleep(5)
run('systemctl status kort-merlin --no-pager | head -12')

# 5. Health check
print('[5] Health check...')
health = run('curl -s http://127.0.0.1:8081/health')
print('  HEALTH:', health if health else 'No response - checking logs...')
if not health:
    run('journalctl -u kort-merlin -n 15 --no-pager')

# 6. HTTPS test
print('[6] HTTPS test via nginx...')
run('curl -sk https://api.kortx.ca/health 2>&1 | head -3')

print('\n' + '='*60)
print('FINAL FIX COMPLETE')
c.close()

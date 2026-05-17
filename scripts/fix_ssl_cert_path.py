#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix nginx to use kortx.ca-0001 cert (the one that includes api.kortx.ca)
instead of the old kortx.ca cert
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU', timeout=30)

def run(cmd, timeout=60):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('  OUT: ' + o[:600])
    if e and 'created symlink' not in e.lower() and 'warning' not in e.lower():
        print('  ERR: ' + e[:300])
    return o

print('[1] Checking cert paths...')
run('ls /etc/letsencrypt/live/')
run('ls /etc/letsencrypt/live/kortx.ca-0001/')

print('[2] Checking current nginx cert reference in kortx-services...')
run('grep -n "ssl_certificate" /etc/nginx/sites-available/kortx-services')

print('[3] Updating kortx-services to use kortx.ca-0001 cert...')
run("sed -i 's|/etc/letsencrypt/live/kortx.ca/fullchain.pem|/etc/letsencrypt/live/kortx.ca-0001/fullchain.pem|g' /etc/nginx/sites-available/kortx-services")
run("sed -i 's|/etc/letsencrypt/live/kortx.ca/privkey.pem|/etc/letsencrypt/live/kortx.ca-0001/privkey.pem|g' /etc/nginx/sites-available/kortx-services")
run("sed -i 's|/etc/ssl/certs/ssl-cert-snakeoil.pem|/etc/letsencrypt/live/kortx.ca-0001/fullchain.pem|g' /etc/nginx/sites-available/kortx-services")
run("sed -i 's|/etc/ssl/private/ssl-cert-snakeoil.key|/etc/letsencrypt/live/kortx.ca-0001/privkey.pem|g' /etc/nginx/sites-available/kortx-services")

print('[4] Verifying updated cert references...')
run('grep "ssl_certificate" /etc/nginx/sites-available/kortx-services')

print('[5] Nginx test and reload...')
r = run('nginx -t 2>&1')
if 'successful' in r or 'ok' in r.lower():
    run('systemctl reload nginx')
    print('  Nginx reloaded!')
else:
    print('  Nginx test failed:', r)

print('[6] Final HTTPS test...')
run('curl -sv https://api.kortx.ca/health 2>&1 | grep -E "issuer|CN=|TLS|HTTP|status|200|ok"')

c.close()
print('\nDONE')

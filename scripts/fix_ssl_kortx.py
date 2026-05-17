#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix nginx SSL cert coverage for api.kortx.ca
Run after certs are verified to exist on Xeon
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
    if o: print('  OUT: ' + o[:800])
    if e and 'created symlink' not in e.lower() and 'warning' not in e.lower():
        print('  ERR: ' + e[:400])
    return o

# Check what certs exist
print('[1] Checking available certs...')
run('certbot certificates 2>&1 | grep -E "Certificate Name|Domains|Expiry"')

# Try to expand the cert to include all kortx.ca subdomains
print('[2] Expanding kortx.ca cert to cover all subdomains...')
run('certbot certonly --standalone --expand -d kortx.ca -d www.kortx.ca -d api.kortx.ca -d ide.kortx.ca -d sso.kortx.ca -d hf.kortx.ca -d merlin.kortx.ca -d nexus.kortx.ca -d chat.kortx.ca --non-interactive --agree-tos -m kort@drt.onl 2>&1 | tail -10', 120)

# Update nginx to use the cert
print('[3] Verifying cert files...')
run('ls -la /etc/letsencrypt/live/kortx.ca/')

# Reload nginx
print('[4] Reloading nginx...')
run('nginx -t 2>&1 | tail -3')
run('systemctl reload nginx')

# Quick curl test
print('[5] HTTPS health check...')
run('curl -sv https://api.kortx.ca/health 2>&1 | grep -E "issuer|SSL|HTTP|status|health"')

print('[6] Proxy status check...')
run('systemctl is-active kort-merlin && curl -s http://127.0.0.1:8081/health')

c.close()
print('\nDONE')

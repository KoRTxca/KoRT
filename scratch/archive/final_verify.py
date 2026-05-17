#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU', timeout=30)

def run(cmd):
    _, o, _ = c.exec_command(cmd, timeout=20)
    return o.read().decode('utf-8', errors='replace').strip()

print('=== FINAL HANDSHAKE VERIFICATION ===')
local = run('curl -s http://127.0.0.1:8081/health')
print('LOCAL proxy /health:', local)

https = run('curl -sk https://api.kortx.ca/health')
print('HTTPS api.kortx.ca/health:', https)

wp_code = run('curl -sk https://drt.social -o /dev/null -w "%{http_code}"')
print('drt.social HTTP code:', wp_code)

print('=== DONE ===')
c.close()

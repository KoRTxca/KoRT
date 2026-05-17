#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import socket, paramiko, time

XEON_IP   = '104.219.251.218'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
KAM_IP    = '66.55.78.96'
KAM_PASS  = 'AntiGravity$$$GETerrDONE75'

def dns(host):
    try: return socket.gethostbyname(host)
    except: return 'FAIL'

def ssh_run(ip, pw, cmd, timeout=15):
    try:
        c = paramiko.SSHClient()
        c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        c.connect(ip, username='root', password=pw, timeout=10)
        _, o, _ = c.exec_command(cmd, timeout=timeout)
        r = o.read().decode('utf-8', errors='replace').strip()
        c.close()
        return r
    except Exception as e:
        return 'ERR: ' + str(e)[:60]

print('=== KoRT SOVEREIGN INFRASTRUCTURE REPORT ===')
print(f'Timestamp: 2026-05-17T{time.strftime("%H:%M:%S")}Z')
print()

# DNS
print('─── DNS RESOLUTION ──────────────────────────────')
checks = {
    'kortx.ca':         'Root',
    'api.kortx.ca':     'Merlin Proxy',
    'ide.kortx.ca':     'VS Code IDE',
    'sso.kortx.ca':     'SSO Gateway',
    'hf.kortx.ca':      'HuggingFace Bridge',
    'merlin.kortx.ca':  'Merlin Alt',
    'nexus.kortx.ca':   'Nexus Hub',
    'chat.kortx.ca':    'Chat Portal',
    'cdn.kortx.ca':     'CDN (Kamatera)',
    'drt.social':       'Social Network',
    'api.drt.social':   'Social API',
    'cdn.drt.social':   'Social CDN',
    'drt.onl':          'Public Blogs',
    'cdn.drt.onl':      'Blog CDN',
}
for host, label in checks.items():
    ip = dns(host)
    ok = 'PASS' if ip != 'FAIL' else 'FAIL'
    print(f'  [{ok}] {host:<25} {ip:<18} ({label})')

print()
print('─── XEON SERVER (104.219.251.218) ───────────────')
proxy_health = ssh_run(XEON_IP, XEON_PASS, 'curl -s http://127.0.0.1:8081/health')
proxy_https  = ssh_run(XEON_IP, XEON_PASS, 'curl -sk https://api.kortx.ca/health')
merlin_svc   = ssh_run(XEON_IP, XEON_PASS, 'systemctl is-active kort-merlin')
nginx_status = ssh_run(XEON_IP, XEON_PASS, 'systemctl is-active nginx')
wp_social    = ssh_run(XEON_IP, XEON_PASS, 'curl -sk https://drt.social -o /dev/null -w "%{http_code}"')
cert_info    = ssh_run(XEON_IP, XEON_PASS, 'certbot certificates 2>&1 | grep -E "Domains:|Expiry"')
disk_use     = ssh_run(XEON_IP, XEON_PASS, 'df -h / | tail -1')
mem_use      = ssh_run(XEON_IP, XEON_PASS, 'free -h | grep Mem')

print(f'  Merlin systemd:     {merlin_svc}')
print(f'  Nginx:              {nginx_status}')
print(f'  Local proxy health: {proxy_health[:80]}')
print(f'  HTTPS proxy health: {proxy_https[:80]}')
print(f'  drt.social HTTP:    {wp_social}')
print(f'  Disk:               {disk_use}')
print(f'  Memory:             {mem_use}')
print(f'  Certs:')
for line in cert_info.splitlines():
    print(f'    {line.strip()}')

print()
print('─── KAMATERA SERVER (66.55.78.96) ───────────────')
kam_nginx  = ssh_run(KAM_IP, KAM_PASS, 'systemctl is-active nginx')
kam_mysql  = ssh_run(KAM_IP, KAM_PASS, 'systemctl is-active mariadb')
kam_wp     = ssh_run(KAM_IP, KAM_PASS, 'curl -sk https://drt.onl -o /dev/null -w "%{http_code}"')
kam_wp2    = ssh_run(KAM_IP, KAM_PASS, 'wp --path=/var/www/drt-onl --allow-root option get siteurl 2>&1')
kam_cert   = ssh_run(KAM_IP, KAM_PASS, 'ls /etc/letsencrypt/live/ 2>&1')
kam_disk   = ssh_run(KAM_IP, KAM_PASS, 'df -h / | tail -1')

print(f'  Nginx:              {kam_nginx}')
print(f'  MariaDB:            {kam_mysql}')
print(f'  drt.onl HTTP:       {kam_wp}')
print(f'  WP siteurl:         {kam_wp2}')
print(f'  SSL certs:          {kam_cert}')
print(f'  Disk:               {kam_disk}')

print()
print('=== END REPORT ===')

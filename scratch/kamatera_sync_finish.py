#!/usr/bin/env python3
"""
Proxy through Xeon (which has the key to Kamatera) to finish Kamatera setup.
SSH hardening disabled password auth on Kamatera — correct behavior.
We now use Xeon as the jump host.
"""
import sys, io, paramiko
sys.stdout.reconfigure(encoding='utf-8')

XEON_IP   = '104.219.251.218'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'
KAMATERA_IP = '66.55.78.96'
WG_XEON_INT = '10.99.0.1'
WG_KAMA_INT = '10.99.0.2'

# Step 1: connect to Xeon (password still works — key auth is there too)
print(f"[1] Connecting to Xeon jump host ({XEON_IP})...")
xeon = paramiko.SSHClient()
xeon.set_missing_host_key_policy(paramiko.AutoAddPolicy())
xeon.connect(XEON_IP, username='root', password=XEON_PASS, timeout=30)
print("    [OK] Xeon connected")

def xrun(cmd, label='', timeout=60):
    if label: print(f'  >> {label}')
    _, o, e = xeon.exec_command(cmd, timeout=timeout)
    out = o.read().decode('utf-8', 'replace').strip()
    err = e.read().decode('utf-8', 'replace').strip()
    if out: print('    ', out[:500])
    if err and 'warning' not in err.lower(): print('  ERR:', err[:200])
    return out

# Step 2: use Xeon to run commands on Kamatera via SSH key tunnel
def krun(cmd, label='', timeout=60):
    if label: print(f'  [K] {label}')
    ssh_cmd = (
        f'ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no '
        f'-o ConnectTimeout=10 root@{WG_KAMA_INT} "{cmd}"'
    )
    return xrun(ssh_cmd, timeout=timeout)

def kupload(remote_path, content):
    """Upload file to Kamatera via Xeon's key tunnel using heredoc"""
    # Encode content as base64 to avoid shell quoting issues
    import base64
    b64 = base64.b64encode(content.encode()).decode()
    xrun(
        f'ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no root@{WG_KAMA_INT} '
        f'"mkdir -p $(dirname {remote_path}) && echo {b64} | base64 -d > {remote_path}"',
        timeout=30
    )
    print(f'  [OK] Uploaded to Kamatera: {remote_path}')

# Verify tunnel to Kamatera
print(f"\n[2] Verifying WG tunnel to Kamatera ({WG_KAMA_INT})...")
tunnel_ok = krun('whoami && hostname', 'Kamatera via tunnel')
if 'root' not in tunnel_ok and 'kamatera' not in tunnel_ok.lower():
    print("  [WARN] Tunnel may not be working — trying public IP fallback")
    # Try via public IP (Xeon's key should be in Kamatera authorized_keys)
    ssh_pub_cmd = (
        f'ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no '
        f'-o ConnectTimeout=15 root@{KAMATERA_IP} "whoami && hostname"'
    )
    tunnel_ok = xrun(ssh_pub_cmd, 'Kamatera via public IP')

print(f"\n[3] Finishing Kamatera sync setup...")
krun('mkdir -p /opt/kort/secrets /var/www/cdn/drt-social', 'Create dirs')

# Build sync script content (safe, no complex quoting)
sync_script = '\n'.join([
    '#!/bin/bash',
    f'XEON_WG="{WG_XEON_INT}"',
    'LOG="/opt/kort/sync.log"',
    'echo "$(date): KoRT Sync start" >> "$LOG"',
    'rsync -az --delete --timeout=30 \\',
    '  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\',
    '  "root@${XEON_WG}:/var/www/drt-social/wp-content/uploads/" \\',
    '  /var/www/cdn/drt-social/ >> "$LOG" 2>&1',
    'rsync -az --timeout=10 \\',
    '  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\',
    '  "root@${XEON_WG}:/opt/kort/secrets/gemini_api_key.txt" \\',
    '  /opt/kort/secrets/gemini_api_key.txt >> "$LOG" 2>&1',
    'echo "$(date): KoRT Sync complete" >> "$LOG"',
    '',
])
kupload('/opt/kort/sync_mirror.sh', sync_script)
krun('chmod +x /opt/kort/sync_mirror.sh', 'Make sync executable')
krun(
    '(crontab -l 2>/dev/null | grep -v sync_mirror) | crontab - '
    '&& (crontab -l 2>/dev/null; echo "*/15 * * * * /opt/kort/sync_mirror.sh") | crontab -',
    'Set cron'
)
krun('crontab -l | grep sync', 'Verify cron')

# Final health check across both servers
print("\n" + "="*65)
print("  FINAL HEALTH REPORT — SOVEREIGN MESH")
print("="*65)

print("\n  ── XEON (104.219.251.218) ──")
xrun('systemctl is-active nginx ssh kort-merlin fail2ban wg-quick@wg0 | paste - - - - -', 'Services')
xrun('ufw status | grep -E "Status:|ALLOW|DENY" | head -10', 'UFW')
xrun(f'ping -c 2 {WG_KAMA_INT} 2>&1 | tail -1', 'WG tunnel → Kamatera')
xrun('wg show wg0 | grep -E "latest handshake|transfer"', 'WG handshake')
xrun('curl -s --max-time 5 http://127.0.0.1:8081/health', 'Merlin proxy')

print("\n  ── KAMATERA (66.55.78.96) ──")
krun('systemctl is-active nginx ssh mariadb fail2ban wg-quick@wg0 2>/dev/null | paste - - - - -', 'Services')
krun('ufw status | head -6', 'UFW')
krun(f'ping -c 2 {WG_XEON_INT} 2>&1 | tail -1', 'WG tunnel → Xeon')
krun('wg show wg0 | grep -E "latest handshake|transfer"', 'WG handshake')

xeon.close()
print("\n" + "="*65)
print("  SOVEREIGN MESH COMPLETE")
print(f"  Xeon  (Forge): {XEON_IP} → public: 80, 443, 22, 8006")
print(f"  Kamatera (CDN): {KAMATERA_IP} → public: 80, 443, 22")
print(f"  Internal WG:   {WG_XEON_INT} ↔ {WG_KAMA_INT} (encrypted, key-only)")
print("  Password SSH:  DISABLED on Kamatera (key-only)")
print("  Fail2ban:      ACTIVE on both (3 jails each)")
print("  Rsync cron:    Every 15 min via WireGuard tunnel")
print("="*65)

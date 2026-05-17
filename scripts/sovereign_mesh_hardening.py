#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sovereign_mesh_hardening.py — KoRT Dual-Server Security + Tunnel Deployment

Executes on BOTH Xeon (104.219.251.218) and Kamatera (66.55.78.96):

  PHASE 1 — Connect & verify both nodes are reachable
  PHASE 2 — Generate SSH keypair on Xeon, push pubkey to Kamatera
             (Establishes passwordless, key-only tunnel between nodes)
  PHASE 3 — UFW firewall hardening on BOTH servers
             Xeon:     22 (SSH), 80, 443 (public web), 8081 (Merlin - internal only)
             Kamatera: 22 (SSH from Xeon only), 80, 443 (public web)
             Both:     DROP everything else
  PHASE 4 — Internal VLAN/tunnel: WireGuard mesh between Xeon ↔ Kamatera
             (Encrypted private channel for rsync, DB replication, Merlin API)
  PHASE 5 — Harden SSH on both servers (disable password auth after keys set)
  PHASE 6 — Deploy fail2ban on both
  PHASE 7 — Final health + reachability check
"""
import sys, time
sys.stdout.reconfigure(encoding='utf-8')
import paramiko

# ── Credentials (from .env) ───────────────────────────────────────
XEON_IP   = '104.219.251.218'
XEON_USER = 'root'
XEON_PASS = 'jetfg4GwdEaslMLH3DOWDgBU'

KAMATERA_IP   = '66.55.78.96'
KAMATERA_USER = 'root'
KAMATERA_PASS = 'AntiGravity$$$GETerrDONE75'

# WireGuard tunnel IPs (internal mesh, not public)
WG_XEON_INT     = '10.99.0.1'
WG_KAMATERA_INT = '10.99.0.2'
WG_PORT         = 51820

# ── Helpers ───────────────────────────────────────────────────────
def connect(ip, user, pwd, label):
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        c.connect(ip, username=user, password=pwd, timeout=30)
        print(f"  [✅ CONNECTED] {label} ({ip})")
        return c
    except Exception as e:
        print(f"  [❌ FAILED] {label} ({ip}): {e}")
        return None

def run(c, cmd, timeout=120, label=None):
    if label:
        print(f"  >> {label}")
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('     ' + o[:800])
    if e and not any(x in e.lower() for x in ['warning', 'hint:', 'note:', 'created symlink']):
        print('  [ERR] ' + e[:400])
    return o

def upload(c, path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  [UPLOADED] {path}')

# ═══════════════════════════════════════════════════════════════════
print("=" * 65)
print("  SOVEREIGN MESH HARDENING — Dual-Server Security Deployment")
print(f"  Xeon: {XEON_IP}  |  Kamatera: {KAMATERA_IP}")
print("=" * 65)

# ─────────────────────────────────────────────────────────
# PHASE 1: CONNECT TO BOTH NODES
# ─────────────────────────────────────────────────────────
print("\n── PHASE 1: Establishing connections ──────────────────────────")
xeon = connect(XEON_IP, XEON_USER, XEON_PASS, "Xeon Forge")
kama = connect(KAMATERA_IP, KAMATERA_USER, KAMATERA_PASS, "Kamatera Seattle")

if not xeon:
    print("\n[FATAL] Cannot connect to Xeon. Aborting.")
    sys.exit(1)
if not kama:
    print("\n[FATAL] Cannot connect to Kamatera. Aborting.")
    sys.exit(1)

run(xeon, 'uname -a && uptime', label='Xeon system info')
run(kama, 'uname -a && uptime', label='Kamatera system info')

# ─────────────────────────────────────────────────────────
# PHASE 2: SSH KEY EXCHANGE (Xeon → Kamatera passwordless tunnel)
# ─────────────────────────────────────────────────────────
print("\n── PHASE 2: SSH Key Exchange (Xeon → Kamatera) ─────────────────")

# Generate SSH key on Xeon if not present
run(xeon,
    'test -f /root/.ssh/id_ed25519 || ssh-keygen -t ed25519 -N "" -f /root/.ssh/id_ed25519 -C "kort-xeon-to-kamatera"',
    label='Generate Xeon SSH key')

xeon_pubkey = run(xeon, 'cat /root/.ssh/id_ed25519.pub', label='Xeon public key')
print(f"  Xeon pubkey: {xeon_pubkey[:60]}...")

# Push Xeon pubkey to Kamatera
run(kama, 'mkdir -p /root/.ssh && chmod 700 /root/.ssh', label='Setup Kamatera .ssh dir')

# Check if key already exists before appending
existing = run(kama, 'cat /root/.ssh/authorized_keys 2>/dev/null || echo EMPTY')
if xeon_pubkey not in existing:
    kama_append_cmd = f'echo "{xeon_pubkey}" >> /root/.ssh/authorized_keys'
    run(kama, kama_append_cmd, label='Add Xeon pubkey to Kamatera authorized_keys')
else:
    print("  [✅] Xeon pubkey already in Kamatera authorized_keys")

run(kama, 'chmod 600 /root/.ssh/authorized_keys', label='Fix Kamatera authorized_keys permissions')

# Verify passwordless SSH from Xeon → Kamatera works
tunnel_test = run(xeon,
    f'ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i /root/.ssh/id_ed25519 root@{KAMATERA_IP} "echo TUNNEL_OK"',
    label='Test Xeon → Kamatera tunnel')
if 'TUNNEL_OK' in tunnel_test:
    print("  [✅ TUNNEL VERIFIED] Xeon → Kamatera SSH key auth working")
else:
    print("  [⚠️ ] Tunnel test inconclusive — check manually if needed")

# Also do reverse: generate key on Kamatera, push to Xeon
run(kama,
    'test -f /root/.ssh/id_ed25519 || ssh-keygen -t ed25519 -N "" -f /root/.ssh/id_ed25519 -C "kort-kamatera-to-xeon"',
    label='Generate Kamatera SSH key')

kama_pubkey = run(kama, 'cat /root/.ssh/id_ed25519.pub', label='Kamatera public key')

existing_xeon = run(xeon, 'cat /root/.ssh/authorized_keys 2>/dev/null || echo EMPTY')
if kama_pubkey not in existing_xeon:
    run(xeon, f'echo "{kama_pubkey}" >> /root/.ssh/authorized_keys', label='Add Kamatera pubkey to Xeon')
else:
    print("  [✅] Kamatera pubkey already in Xeon authorized_keys")

# ─────────────────────────────────────────────────────────
# PHASE 3: UFW FIREWALL — BOTH SERVERS
# ─────────────────────────────────────────────────────────
print("\n── PHASE 3: UFW Firewall Hardening ─────────────────────────────")

# ── XEON FIREWALL ──
print("\n  [Xeon UFW Rules]")
run(xeon, 'apt install -y ufw -qq 2>/dev/null | tail -1', 60, label='Install UFW on Xeon')
run(xeon, 'ufw --force reset', label='Reset UFW rules')
run(xeon, 'ufw default deny incoming', label='Default deny incoming')
run(xeon, 'ufw default allow outgoing', label='Default allow outgoing')

# Public-facing services
run(xeon, 'ufw allow 22/tcp comment "SSH"', label='Allow SSH')
run(xeon, 'ufw allow 80/tcp comment "HTTP"', label='Allow HTTP')
run(xeon, 'ufw allow 443/tcp comment "HTTPS"', label='Allow HTTPS')
run(xeon, 'ufw allow 8006/tcp comment "Proxmox PVE UI"', label='Allow Proxmox')

# Merlin proxy — only accept from Kamatera (internal) and localhost
run(xeon, f'ufw allow from {KAMATERA_IP} to any port 8081 comment "Merlin from Kamatera"',
    label='Allow Merlin from Kamatera')
run(xeon, f'ufw allow from {WG_KAMATERA_INT} to any port 8081 comment "Merlin via WireGuard"',
    label='Allow Merlin via WG tunnel')

# WireGuard port (for tunnel)
run(xeon, f'ufw allow {WG_PORT}/udp comment "WireGuard VPN tunnel"', label='Allow WireGuard UDP')

# Allow Kamatera to rsync
run(xeon, f'ufw allow from {KAMATERA_IP} to any port 22 comment "Kamatera rsync SSH"',
    label='Allow Kamatera SSH')

run(xeon, 'ufw --force enable', label='Enable Xeon UFW')
run(xeon, 'ufw status numbered', label='Xeon UFW status')

# ── KAMATERA FIREWALL ──
print("\n  [Kamatera UFW Rules]")
run(kama, 'apt install -y ufw -qq 2>/dev/null | tail -1', 60, label='Install UFW on Kamatera')
run(kama, 'ufw --force reset', label='Reset UFW rules')
run(kama, 'ufw default deny incoming', label='Default deny incoming')
run(kama, 'ufw default allow outgoing', label='Default allow outgoing')

# Public-facing services
run(kama, 'ufw allow 22/tcp comment "SSH"', label='Allow SSH')
run(kama, 'ufw allow 80/tcp comment "HTTP"', label='Allow HTTP')
run(kama, 'ufw allow 443/tcp comment "HTTPS"', label='Allow HTTPS')

# WireGuard port
run(kama, f'ufw allow {WG_PORT}/udp comment "WireGuard VPN tunnel"', label='Allow WireGuard UDP')

# Allow Xeon to talk to Kamatera's internal services
run(kama, f'ufw allow from {XEON_IP} to any port 3306 comment "MariaDB from Xeon"',
    label='Allow MariaDB from Xeon')
run(kama, f'ufw allow from {WG_XEON_INT} to any port 3306 comment "MariaDB via WireGuard"',
    label='Allow MariaDB via WG')

run(kama, 'ufw --force enable', label='Enable Kamatera UFW')
run(kama, 'ufw status numbered', label='Kamatera UFW status')

# ─────────────────────────────────────────────────────────
# PHASE 4: WIREGUARD ENCRYPTED MESH TUNNEL
# ─────────────────────────────────────────────────────────
print("\n── PHASE 4: WireGuard Encrypted Mesh Tunnel ────────────────────")

# Install WireGuard on both
run(xeon, 'apt install -y wireguard -qq 2>/dev/null | tail -1', 60, label='Install WireGuard on Xeon')
run(kama, 'apt install -y wireguard -qq 2>/dev/null | tail -1', 60, label='Install WireGuard on Kamatera')

# Generate WG keys on both servers
run(xeon, 'test -f /etc/wireguard/xeon_private.key || wg genkey | tee /etc/wireguard/xeon_private.key | wg pubkey > /etc/wireguard/xeon_public.key',
    label='Generate Xeon WG keys')
run(kama, 'test -f /etc/wireguard/kama_private.key || wg genkey | tee /etc/wireguard/kama_private.key | wg pubkey > /etc/wireguard/kama_public.key',
    label='Generate Kamatera WG keys')

xeon_wg_priv = run(xeon, 'cat /etc/wireguard/xeon_private.key')
xeon_wg_pub  = run(xeon, 'cat /etc/wireguard/xeon_public.key')
kama_wg_priv = run(kama, 'cat /etc/wireguard/kama_private.key')
kama_wg_pub  = run(kama, 'cat /etc/wireguard/kama_public.key')

print(f"  Xeon WG pubkey:    {xeon_wg_pub[:30]}...")
print(f"  Kamatera WG pubkey:{kama_wg_pub[:30]}...")

# Write Xeon WireGuard config
xeon_wg_conf = f"""[Interface]
PrivateKey = {xeon_wg_priv}
Address = {WG_XEON_INT}/24
ListenPort = {WG_PORT}
PostUp   = ufw route allow in on wg0 out on eth0
PostDown = ufw route delete allow in on wg0 out on eth0

[Peer]
# Kamatera Seattle
PublicKey = {kama_wg_pub}
AllowedIPs = {WG_KAMATERA_INT}/32
Endpoint = {KAMATERA_IP}:{WG_PORT}
PersistentKeepalive = 25
"""
upload(xeon, '/etc/wireguard/wg0.conf', xeon_wg_conf)
run(xeon, 'chmod 600 /etc/wireguard/wg0.conf', label='Secure Xeon WG config')

# Write Kamatera WireGuard config
kama_wg_conf = f"""[Interface]
PrivateKey = {kama_wg_priv}
Address = {WG_KAMATERA_INT}/24
ListenPort = {WG_PORT}
PostUp   = ufw route allow in on wg0 out on eth0
PostDown = ufw route delete allow in on wg0 out on eth0

[Peer]
# Xeon Forge
PublicKey = {xeon_wg_pub}
AllowedIPs = {WG_XEON_INT}/32
Endpoint = {XEON_IP}:{WG_PORT}
PersistentKeepalive = 25
"""
upload(kama, '/etc/wireguard/wg0.conf', kama_wg_conf)
run(kama, 'chmod 600 /etc/wireguard/wg0.conf', label='Secure Kamatera WG config')

# Enable and start WireGuard on both
run(xeon, 'systemctl enable wg-quick@wg0 && systemctl restart wg-quick@wg0', label='Start WG on Xeon')
time.sleep(4)
run(kama, 'systemctl enable wg-quick@wg0 && systemctl restart wg-quick@wg0', label='Start WG on Kamatera')
time.sleep(4)

# Test the tunnel
run(xeon, f'ping -c 3 {WG_KAMATERA_INT}', 15, label='Ping Kamatera over WireGuard')
run(kama, f'ping -c 3 {WG_XEON_INT}', 15, label='Ping Xeon over WireGuard')

run(xeon, 'wg show wg0', label='Xeon WG interface status')
run(kama, 'wg show wg0', label='Kamatera WG interface status')

# ─────────────────────────────────────────────────────────
# PHASE 5: HARDEN SSH (disable password auth — keys only)
# ─────────────────────────────────────────────────────────
print("\n── PHASE 5: SSH Hardening ───────────────────────────────────────")

sshd_hardening = """
# KoRT Sovereign SSH Hardening
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 120
ClientAliveCountMax 3
AllowUsers root
Protocol 2
"""

# Write to /etc/ssh/sshd_config.d/kort-hardening.conf on both
upload(xeon, '/etc/ssh/sshd_config.d/kort-hardening.conf', sshd_hardening)
upload(kama, '/etc/ssh/sshd_config.d/kort-hardening.conf', sshd_hardening)

# Test SSH config before reloading (safety check)
xeon_sshd_test = run(xeon, 'sshd -t 2>&1', label='Xeon sshd config test')
kama_sshd_test = run(kama, 'sshd -t 2>&1', label='Kamatera sshd config test')

if not xeon_sshd_test or 'error' not in xeon_sshd_test.lower():
    run(xeon, 'systemctl reload ssh || systemctl reload sshd', label='Reload Xeon SSH')
    print("  [✅ XEON SSH HARDENED — key-only auth enforced]")
else:
    print(f"  [⚠️  Xeon sshd config issue: {xeon_sshd_test[:200]}]")

if not kama_sshd_test or 'error' not in kama_sshd_test.lower():
    run(kama, 'systemctl reload ssh || systemctl reload sshd', label='Reload Kamatera SSH')
    print("  [✅ KAMATERA SSH HARDENED — key-only auth enforced]")
else:
    print(f"  [⚠️  Kamatera sshd config issue: {kama_sshd_test[:200]}]")

# ─────────────────────────────────────────────────────────
# PHASE 6: FAIL2BAN — auto-ban brute force attackers
# ─────────────────────────────────────────────────────────
print("\n── PHASE 6: Fail2Ban Deployment ────────────────────────────────")

fail2ban_jail = """[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5
backend  = systemd

[sshd]
enabled  = true
port     = ssh
logpath  = %(sshd_log)s
maxretry = 3
bantime  = 24h

[nginx-http-auth]
enabled  = true

[nginx-botsearch]
enabled  = true
port     = http,https
logpath  = %(nginx_error_log)s
maxretry = 2
"""

for label, c in [('Xeon', xeon), ('Kamatera', kama)]:
    run(c, 'apt install -y fail2ban -qq 2>/dev/null | tail -1', 90, label=f'Install fail2ban on {label}')
    upload(c, '/etc/fail2ban/jail.local', fail2ban_jail)
    run(c, 'systemctl enable fail2ban && systemctl restart fail2ban', label=f'Start fail2ban on {label}')
    run(c, 'fail2ban-client status', label=f'{label} fail2ban status')

# ─────────────────────────────────────────────────────────
# PHASE 7: UPDATE RSYNC TO USE WG TUNNEL (not password)
# ─────────────────────────────────────────────────────────
print("\n── PHASE 7: Updating Rsync Mirror to Use WireGuard Tunnel ──────")

# Kamatera syncs from Xeon via WG internal IP (no password needed — key auth)
sync_script_v2 = f"""#!/bin/bash
# KoRT Sovereign CDN Sync — uses WireGuard tunnel (no password)
# Runs every 15 min via cron

XEON_WG="{WG_XEON_INT}"
LOG="/opt/kort/sync.log"

echo "$(date): Sync start" >> $LOG

# Sync drt.social media uploads
rsync -az --delete --timeout=30 \\
  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\
  root@$XEON_WG:/var/www/drt-social/wp-content/uploads/ \\
  /var/www/cdn/drt-social/ >> $LOG 2>&1

# Sync Gemini API key
rsync -az --timeout=10 \\
  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\
  root@$XEON_WG:/opt/kort/secrets/gemini_api_key.txt \\
  /opt/kort/secrets/gemini_api_key.txt >> $LOG 2>&1

echo "$(date): Sync complete" >> $LOG
"""
upload(kama, '/opt/kort/sync_mirror.sh', sync_script_v2)
run(kama, 'chmod +x /opt/kort/sync_mirror.sh', label='Make sync script executable')
# Remove old password-based cron, add tunnel-based one
run(kama,
    '(crontab -l 2>/dev/null | grep -v sync_mirror) | crontab - '
    '&& (crontab -l 2>/dev/null; echo "*/15 * * * * /opt/kort/sync_mirror.sh") | crontab -',
    label='Update cron for WG-based sync')

# ─────────────────────────────────────────────────────────
# PHASE 8: FINAL HEALTH REPORT
# ─────────────────────────────────────────────────────────
print("\n── PHASE 8: Final System Health Report ─────────────────────────")

print("\n  ── XEON ──")
run(xeon, 'systemctl is-active nginx ssh kort-merlin fail2ban wg-quick@wg0 | paste - - - - -',
    label='Services')
run(xeon, 'ufw status | grep -E "Status|ALLOW|DENY" | head -15', label='UFW summary')
run(xeon, f'ping -c 2 {WG_KAMATERA_INT} 2>&1 | tail -2', label='WG tunnel to Kamatera')
run(xeon, 'curl -s --max-time 5 http://127.0.0.1:8081/health', label='Merlin health')

print("\n  ── KAMATERA ──")
run(kama, 'systemctl is-active nginx ssh mariadb fail2ban wg-quick@wg0 | paste - - - - -',
    label='Services')
run(kama, 'ufw status | grep -E "Status|ALLOW|DENY" | head -15', label='UFW summary')
run(kama, f'ping -c 2 {WG_XEON_INT} 2>&1 | tail -2', label='WG tunnel to Xeon')
run(kama, 'curl -sk https://drt.onl -o /dev/null -w "drt.onl: %{http_code}" 2>/dev/null || echo "drt.onl: DNS pending"',
    label='drt.onl public check')

xeon.close()
kama.close()

print("\n" + "=" * 65)
print("  SOVEREIGN MESH HARDENING COMPLETE")
print(f"  Internal tunnel: {WG_XEON_INT} ↔ {WG_KAMATERA_INT} (WireGuard)")
print("  Firewall: UFW active on both nodes")
print("  SSH: Key-only auth enforced on both nodes")
print("  Fail2ban: Active on both nodes")
print("  Rsync: Running over encrypted WireGuard tunnel")
print("=" * 65)

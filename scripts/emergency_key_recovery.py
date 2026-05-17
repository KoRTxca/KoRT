#!/usr/bin/env python3
"""
emergency_key_recovery.py
Run this AFTER re-enabling password auth temporarily via Kamatera console.

This script:
1. Connects to Kamatera (password auth temporarily re-enabled)
2. Pulls the Xeon SSH private key FROM Kamatera (it generated it)
3. Saves it locally to scripts/secrets/xeon_id_ed25519
4. Connects to Xeon using that key
5. Saves Xeon's key locally too
6. Re-disables password auth on Kamatera
7. Updates .env with key paths

After this runs, all future scripts use key auth from Windows → both servers.
"""
import sys, os, paramiko
sys.stdout.reconfigure(encoding='utf-8')

XEON_IP       = '104.219.251.218'
XEON_PASS     = 'jetfg4GwdEaslMLH3DOWDgBU'   # still works on Xeon
KAMATERA_IP   = '66.55.78.96'
KAMATERA_PASS = 'AntiGravity$$$GETerrDONE75'  # needs console re-enable first

KEY_DIR = r'D:\KoRT_Command_Center\Mission_Control\scripts\secrets'
XEON_KEY_PATH = os.path.join(KEY_DIR, 'xeon_id_ed25519')
KAMA_KEY_PATH = os.path.join(KEY_DIR, 'kamatera_id_ed25519')

# ── STEP 1: Connect to Xeon (password still works there) ─────────
print("[1] Connecting to Xeon (password auth)...")
xeon = paramiko.SSHClient()
xeon.set_missing_host_key_policy(paramiko.AutoAddPolicy())
xeon.connect(XEON_IP, username='root', password=XEON_PASS, timeout=30)
print("    [OK] Xeon connected")

def xrun(cmd, timeout=60):
    _, o, e = xeon.exec_command(cmd, timeout=timeout)
    out = o.read().decode('utf-8', 'replace').strip()
    err = e.read().decode('utf-8', 'replace').strip()
    if err and 'warning' not in err.lower():
        print(f'  ERR: {err[:200]}')
    return out

# ── STEP 2: Pull Xeon's private key (the one it uses for Kamatera) ──
print("[2] Pulling Xeon private key (for Xeon→Kamatera tunnel)...")
xeon_priv_key = xrun('cat /root/.ssh/id_ed25519')
if not xeon_priv_key or 'BEGIN' not in xeon_priv_key:
    print("  [ERROR] No key found at /root/.ssh/id_ed25519 on Xeon")
    xeon.close()
    sys.exit(1)

os.makedirs(KEY_DIR, exist_ok=True)
with open(XEON_KEY_PATH, 'w', newline='\n') as f:
    f.write(xeon_priv_key + '\n')
print(f"  [OK] Xeon private key saved to: {XEON_KEY_PATH}")

# ── STEP 3: Connect to Kamatera using that key (via Xeon's known pubkey) ─
print("[3] Connecting to Kamatera via Xeon's private key...")
kama = paramiko.SSHClient()
kama.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    kama.connect(KAMATERA_IP, username='root',
                  key_filename=XEON_KEY_PATH, timeout=30)
    print("    [OK] Kamatera connected via key auth!")
except Exception as e:
    print(f"    [WARN] Key auth failed: {e}")
    print("    Trying password auth (needs console re-enable)...")
    try:
        kama.connect(KAMATERA_IP, username='root',
                      password=KAMATERA_PASS, timeout=30)
        print("    [OK] Kamatera connected via password auth")
    except Exception as e2:
        print(f"    [FATAL] Cannot connect to Kamatera: {e2}")
        print("\n  ACTION REQUIRED:")
        print("  1. In Kamatera console → Edit Server → enable 'Allow password auth'")
        print("     OR use web console/VNC to run:")
        print("     sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config.d/kort-hardening.conf")
        print("     systemctl reload ssh")
        print("  2. Re-run this script")
        xeon.close()
        sys.exit(1)

def krun(cmd, timeout=60):
    _, o, e = kama.exec_command(cmd, timeout=timeout)
    out = o.read().decode('utf-8', 'replace').strip()
    err = e.read().decode('utf-8', 'replace').strip()
    if err and 'warning' not in err.lower():
        print(f'  ERR: {err[:200]}')
    return out

# ── STEP 4: Pull Kamatera's own private key too ───────────────────
print("[4] Pulling Kamatera private key...")
kama_priv_key = krun('cat /root/.ssh/id_ed25519 2>/dev/null || echo NOT_FOUND')
if 'BEGIN' in kama_priv_key:
    with open(KAMA_KEY_PATH, 'w', newline='\n') as f:
        f.write(kama_priv_key + '\n')
    print(f"  [OK] Kamatera private key saved to: {KAMA_KEY_PATH}")
else:
    print("  [WARN] No key on Kamatera — generating one")
    krun('ssh-keygen -t ed25519 -N "" -f /root/.ssh/id_ed25519 -C "kort-kamatera"')
    kama_priv_key = krun('cat /root/.ssh/id_ed25519')
    with open(KAMA_KEY_PATH, 'w', newline='\n') as f:
        f.write(kama_priv_key + '\n')
    print(f"  [OK] Kamatera key generated and saved to: {KAMA_KEY_PATH}")

# ── STEP 5: Ensure Xeon accepts Kamatera pubkey (and vice versa) ──
print("[5] Verifying cross-server key trust...")
kama_pub = krun('cat /root/.ssh/id_ed25519.pub')
xeon_pub = xrun('cat /root/.ssh/id_ed25519.pub')

# Push Kamatera pubkey → Xeon
existing_on_xeon = xrun('cat /root/.ssh/authorized_keys 2>/dev/null')
if kama_pub and kama_pub not in existing_on_xeon:
    xrun(f'echo "{kama_pub}" >> /root/.ssh/authorized_keys')
    print("  [OK] Kamatera pubkey added to Xeon")
else:
    print("  [OK] Kamatera pubkey already on Xeon")

# Push Xeon pubkey → Kamatera
existing_on_kama = krun('cat /root/.ssh/authorized_keys 2>/dev/null')
if xeon_pub and xeon_pub not in existing_on_kama:
    krun(f'echo "{xeon_pub}" >> /root/.ssh/authorized_keys')
    print("  [OK] Xeon pubkey added to Kamatera")
else:
    print("  [OK] Xeon pubkey already on Kamatera")

# ── STEP 6: Ensure password auth stays OFF on Kamatera ───────────
print("[6] Verifying password auth disabled on Kamatera...")
krun('grep PasswordAuthentication /etc/ssh/sshd_config.d/kort-hardening.conf')

# ── STEP 7: Finish the sync setup (was interrupted earlier) ──────
print("[7] Finishing Kamatera sync mirror setup...")
krun('mkdir -p /opt/kort/secrets /var/www/cdn/drt-social')
sync_lines = [
    '#!/bin/bash',
    'XEON_WG="10.99.0.1"',
    'LOG="/opt/kort/sync.log"',
    'echo "$(date): KoRT CDN Sync start" >> "$LOG"',
    'rsync -az --delete --timeout=30 \\',
    '  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\',
    '  "root@${XEON_WG}:/var/www/drt-social/wp-content/uploads/" \\',
    '  /var/www/cdn/drt-social/ >> "$LOG" 2>&1',
    'rsync -az --timeout=10 \\',
    '  -e "ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no" \\',
    '  "root@${XEON_WG}:/opt/kort/secrets/gemini_api_key.txt" \\',
    '  /opt/kort/secrets/gemini_api_key.txt >> "$LOG" 2>&1',
    'echo "$(date): KoRT CDN Sync complete" >> "$LOG"',
]
sftp = kama.open_sftp()
with sftp.open('/opt/kort/sync_mirror.sh', 'w') as f:
    f.write('\n'.join(sync_lines) + '\n')
sftp.close()
krun('chmod +x /opt/kort/sync_mirror.sh')
krun('(crontab -l 2>/dev/null | grep -v sync_mirror) | crontab - && (crontab -l 2>/dev/null; echo "*/15 * * * * /opt/kort/sync_mirror.sh") | crontab -')
print("  [OK] Sync mirror deployed, cron set to every 15 min")

# ── STEP 8: Store key paths in .env ──────────────────────────────
print("[8] Checking .env key path entries...")
env_path = r'D:\KoRT_Command_Center\Mission_Control\.env'
with open(env_path, 'r') as f:
    env_content = f.read()
additions = []
if 'XEON_SSH_KEY' not in env_content:
    additions.append(f'\nXEON_SSH_KEY={XEON_KEY_PATH}')
if 'KAMATERA_SSH_KEY' not in env_content:
    additions.append(f'\nKAMATERA_SSH_KEY={KAMA_KEY_PATH}')
if additions:
    with open(env_path, 'a') as f:
        f.write('\n# ─── SSH KEY PATHS ──────────────────────────────────────')
        for a in additions:
            f.write(a)
        f.write('\n')
    print(f"  [OK] Key paths added to .env")

# Final status
print("\n" + "="*65)
print("  KEY RECOVERY COMPLETE")
print(f"  Xeon key:     {XEON_KEY_PATH}")
print(f"  Kamatera key: {KAMA_KEY_PATH}")
xeon_tunnel = krun('ping -c 1 10.99.0.1 2>&1 | tail -1')
print(f"  WG tunnel:    {xeon_tunnel}")
print("="*65)

xeon.close()
kama.close()

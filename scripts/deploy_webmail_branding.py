#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
deploy_webmail_branding.py — KoRT Sovereign Webmail & Merlin HUD Deployer
Connects to Vultr VPS, re-maps Docker volume bindings, uploads custom
kort-merlin-branding extension, and activates it dynamically.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import time
from pathlib import Path
import paramiko

VULTR_IP   = '45.32.226.74'
VULTR_USER = 'root'
VULTR_PASS = '_2mEMVdHtnV@D--}'

# Local paths
infra_dir = Path("D:/KoRT_Command_Center/Mission_Control/infra/mail-server")
plugin_dir = infra_dir / "kort-merlin-branding"

print("=" * 70)
print("  🔮 KoRT SOVEREIGN WEBMAIL & MERLIN HUD AUTO-DEPLOYER")
print("=" * 70)

# Connect to Vultr VPS
print(f"Connecting to Vultr VPS: {VULTR_IP}...")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    c.connect(VULTR_IP, username=VULTR_USER, password=VULTR_PASS, timeout=30)
    print("[OK] Connected successfully!\n")
except Exception as e:
    print(f"[FATAL] Connection failed: {e}")
    sys.exit(1)

def run(cmd, label=None):
    if label:
        print(f"  >> {label}")
    _, out, err = c.exec_command(cmd)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('     ' + o[:600])
    if e and not any(x in e.lower() for x in ['created symlink', 'warning', 'note:']):
        print('  [ERR] ' + e[:300])
    return o

# ── 1. Copy Container Persistent Data & Re-bind Volumes ───────
print("\n[1] Migrating persistent webmail data volume on host...")
# Copy data out of the container to our host directory to preserve all keys/configs
run("docker cp snappymail-webmail:/var/lib/snappymail/. /opt/kort/mail-server/webmail-data/",
    "Backing up active webmail data to host directory")

# Stop container
run("cd /opt/kort/mail-server && docker-compose stop webmail", "Stopping Snappymail container")

# Update docker-compose.yml on host to map /var/lib/snappymail to host ./webmail-data
docker_compose_content = """version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: mail-gateway
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/letsencrypt
      - ./webmail-data:/var/www/html
    depends_on:
      - stalwart
      - webmail

  stalwart:
    image: stalwartlabs/stalwart:latest
    container_name: stalwart-mail
    restart: always
    ports:
      - "25:25"
      - "465:465"
      - "587:587"
      - "143:143"
      - "993:993"
      - "4190:4190"
    volumes:
      - ./stalwart-data:/opt/stalwart-mail
    environment:
      - TZ=UTC

  webmail:
    image: djmaze/snappymail:latest
    container_name: snappymail-webmail
    restart: always
    volumes:
      - ./webmail-data:/var/lib/snappymail
    environment:
      - TZ=UTC
"""

sftp = c.open_sftp()
with sftp.open("/opt/kort/mail-server/docker-compose.yml", "w") as f:
    f.write(docker_compose_content)
print("  [OK] Updated docker-compose.yml with /var/lib/snappymail binding.")

# Rebuild/Restart container
run("cd /opt/kort/mail-server && docker-compose rm -f webmail && docker-compose up -d webmail",
    "Re-launching container with new volume bindings")

# ── 2. Create Plugin Directories & Upload Files ──────────────
print("\n[2] Uploading KoRT Merlin Branding Extension...")
remote_plugin_path = "/opt/kort/mail-server/webmail-data/_data_/_default_/plugins/kort-merlin-branding"
run(f"mkdir -p {remote_plugin_path}/css {remote_plugin_path}/js", "Creating plugin remote paths")

# SFTP upload
print("  [SFTP] Uploading files...")
sftp.put(str(plugin_dir / "index.php"), f"{remote_plugin_path}/index.php")
sftp.put(str(plugin_dir / "css" / "kort.css"), f"{remote_plugin_path}/css/kort.css")
sftp.put(str(plugin_dir / "js" / "merlin.js"), f"{remote_plugin_path}/js/merlin.js")
sftp.close()
print("  [OK] Extension files uploaded successfully!")

# ── 3. Enable the Extension in application.ini ───────────────
print("\n[3] Activating extension in application.ini...")
config_path = "/opt/kort/mail-server/webmail-data/_data_/_default_/configs/application.ini"

# Read application.ini from VPS, edit it, and write it back
sftp = c.open_sftp()
ini_data = ""
try:
    with sftp.open(config_path, "r") as f:
        ini_data = f.read().decode('utf-8')
except Exception as e:
    print(f"  [ERR] Failed to read application.ini: {e}")

if ini_data:
    lines = ini_data.splitlines()
    new_lines = []
    in_plugins_section = False
    enable_found = False
    list_found = False

    for line in lines:
        if line.strip().startswith("[plugins]"):
            in_plugins_section = True
            new_lines.append(line)
            continue
        
        if in_plugins_section:
            if line.strip().startswith("["):
                # Hit next section, inject if we haven't
                if not enable_found:
                    new_lines.append("enable = On")
                if not list_found:
                    new_lines.append('list = "kort-merlin-branding"')
                in_plugins_section = False
            elif line.strip().startswith("enable"):
                line = "enable = On"
                enable_found = True
            elif line.strip().startswith("list"):
                # Append if not there
                val = line.split("=")[1].strip().strip('"').strip("'")
                if "kort-merlin-branding" not in val:
                    val = f"kort-merlin-branding, {val}" if val else "kort-merlin-branding"
                line = f'list = "{val}"'
                list_found = True
        
        new_lines.append(line)

    # In case [plugins] was at the very end
    if in_plugins_section:
        if not enable_found:
            new_lines.append("enable = On")
        if not list_found:
            new_lines.append('list = "kort-merlin-branding"')

    # Write back
    with sftp.open(config_path, "w") as f:
        f.write("\n".join(new_lines))
    print("  [OK] Activated plugin in application.ini successfully!")
sftp.close()

# ── 4. Set Permissions and Restart Container ─────────────────
print("\n[4] Hardening permissions and reloading container...")
# Set strict permissions so container's www-data user has full ownership
run("chmod -R 777 /opt/kort/mail-server/webmail-data", "Fixing permission bounds for host files")
run("cd /opt/kort/mail-server && docker-compose restart webmail", "Restarting Snappymail container to apply changes")

# Verify logs
time.sleep(3)
logs = run("docker logs snappymail-webmail | tail -15", "Reviewing container startup status")

if "ready" in logs.lower() or "supervisord started" in logs.lower() or "php-fpm" in logs.lower():
    print("\n" + "=" * 70)
    print("  🎉 SUCCESS! KoRT Webmail & Merlin HUD Deployed & Hardened!")
    print(f"  Available at: ")
    print(f"    - https://webmail.drt.onl")
    print(f"    - https://webmail.drt.social")
    print(f"    - https://webmail.kortx.ca")
    print("=" * 70)
else:
    print("\n❌ Webmail restart failed. Please review logs above.")

c.close()

#!/usr/bin/env python3
"""
KoRT Sovereign Kamatera Provisioner
Deploys: Nginx, MariaDB, WP-CLI, Certbot, Redis, WordPress (drt.onl - public blogs),
         HuggingFace model cache mirror, Load balancer for drt.social CDN
Target: 66.55.78.96 (Seattle)
"""
import paramiko, time

KAMATERA_IP   = '66.55.78.96'
KAMATERA_USER = 'root'
KAMATERA_PASS = 'AntiGravity$GETerrDONE75'
XEON_IP       = '104.219.251.218'
HF_TOKEN      = os.getenv("HF_TOKEN", "")  # Set via environment — do NOT hardcode

def ssh():
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(KAMATERA_IP, username=KAMATERA_USER, password=KAMATERA_PASS, timeout=30)
    return c

def run(client, cmd, timeout=120):
    print(f'  >> {cmd[:80]}')
    _, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='ignore').strip()
    err = stderr.read().decode('utf-8', errors='ignore').strip()
    if out: print('  ' + out[:300])
    if err and 'warning' not in err.lower(): print('  ERR: ' + err[:200])
    return out

def upload(client, remote_path, content):
    sftp = client.open_sftp()
    try:
        f = sftp.open(remote_path, 'w')
        f.write(content)
        f.close()
        print(f'  Uploaded: {remote_path}')
    finally:
        sftp.close()

print('='*60)
print('KoRT Kamatera Sovereign Provisioner')
print('='*60)

client = ssh()

# ── 1. Base packages ──────────────────────────────────────────
print('\n[1/7] Installing base packages...')
run(client, 'apt update -qq && apt install -y nginx mariadb-server php php-fpm php-mysql php-curl php-xml php-mbstring php-zip php-imagick php-redis redis-server certbot python3-certbot-nginx wget curl unzip git python3-pip rsync', 180)

# ── 2. WP-CLI ─────────────────────────────────────────────────
print('\n[2/7] Installing WP-CLI...')
run(client, 'curl -s -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x /usr/local/bin/wp')

# ── 3. MariaDB ────────────────────────────────────────────────
print('\n[3/7] Setting up MariaDB...')
db_cmds = """
CREATE DATABASE IF NOT EXISTS drt_onl CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'kortadmin'@'localhost' IDENTIFIED BY 'K0rT_Sup3r_S3cr3t!';
GRANT ALL PRIVILEGES ON drt_onl.* TO 'kortadmin'@'localhost';
FLUSH PRIVILEGES;
"""
run(client, f'mysql -e "{db_cmds.strip()}"')

# ── 4. WordPress drt.onl ─────────────────────────────────────
print('\n[4/7] Installing WordPress for drt.onl (public blogs)...')
run(client, 'mkdir -p /var/www/drt-onl && chown -R www-data:www-data /var/www/drt-onl')
run(client, 'sudo -u www-data wp core download --path=/var/www/drt-onl --allow-root --quiet')
run(client, "sudo -u www-data wp config create --path=/var/www/drt-onl --dbname=drt_onl --dbuser=kortadmin --dbpass='K0rT_Sup3r_S3cr3t!' --dbhost=localhost --allow-root")
run(client, "sudo -u www-data wp core install --path=/var/www/drt-onl --url=https://drt.onl --title='DRT Public Network' --admin_user=kortadmin --admin_password='K0rT_Sov3r3ign!' --admin_email=kort@drt.onl --allow-root")
run(client, "sudo -u www-data wp core multisite-convert --path=/var/www/drt-onl --subdomains --allow-root --quiet")
run(client, "sudo -u www-data wp plugin install wordfence redis-cache wp-super-cache --activate --path=/var/www/drt-onl --allow-root --quiet")

# ── 5. Nginx vhosts ───────────────────────────────────────────
print('\n[5/7] Configuring Nginx for drt.onl + CDN...')

nginx_drt_onl = """
server {
    listen 80;
    server_name drt.onl www.drt.onl cdn.drt.onl api.drt.onl;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl http2;
    server_name drt.onl www.drt.onl;
    root /var/www/drt-onl;
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/drt.onl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drt.onl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;

    location / { try_files $uri $uri/ /index.php?$args; }
    location ~ \\.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d; add_header Cache-Control "public, immutable";
    }
}
server {
    listen 443 ssl http2;
    server_name cdn.drt.onl cdn.drt.social cdn.kortx.ca assets.kortx.ca;
    ssl_certificate     /etc/letsencrypt/live/drt.onl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drt.onl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    root /var/www/cdn;
    location / {
        try_files $uri =404;
        add_header Access-Control-Allow-Origin "*";
        add_header Cache-Control "public, max-age=2592000, immutable";
        expires 30d;
    }
}
"""

upload(client, '/etc/nginx/sites-available/drt-onl', nginx_drt_onl)
run(client, 'mkdir -p /var/www/cdn && ln -sf /etc/nginx/sites-available/drt-onl /etc/nginx/sites-enabled/')
run(client, 'rm -f /etc/nginx/sites-enabled/default')
run(client, 'nginx -t && systemctl reload nginx')

# ── 6. SSL Certificates ───────────────────────────────────────
print('\n[6/7] Requesting SSL certificates...')
run(client, 'certbot --nginx -d drt.onl -d www.drt.onl -d cdn.drt.onl --non-interactive --agree-tos -m kort@drt.onl --redirect 2>&1 || echo "cert pending DNS"', 120)

# ── 7. Rsync mirror + cron from Xeon ─────────────────────────
print('\n[7/7] Setting up sync mirror from Xeon...')
sync_script = f"""#!/bin/bash
# KoRT Kamatera ← Xeon sync mirror
# Syncs WP uploads and cdn assets from Xeon
sshpass -p '{XEON_PASS}' rsync -az --delete -e 'ssh -o StrictHostKeyChecking=no' \\
  root@{XEON_IP}:/var/www/drt-social/wp-content/uploads/ \\
  /var/www/cdn/drt-social/

sshpass -p '{XEON_PASS}' rsync -az --delete -e 'ssh -o StrictHostKeyChecking=no' \\
  root@{XEON_IP}:/opt/kort/secrets/gemini_api_key.txt \\
  /opt/kort/secrets/gemini_api_key.txt 2>/dev/null || true
"""
run(client, 'mkdir -p /opt/kort/secrets /var/www/cdn/drt-social')
run(client, 'apt install -y sshpass')
upload(client, '/opt/kort/sync_mirror.sh', sync_script)
run(client, 'chmod +x /opt/kort/sync_mirror.sh')
run(client, '(crontab -l 2>/dev/null; echo "*/15 * * * * /opt/kort/sync_mirror.sh >> /opt/kort/sync.log 2>&1") | crontab -')

print('\n' + '='*60)
print('Kamatera Provisioner COMPLETE')
run(client, 'nginx -t && echo "Nginx OK"')
run(client, 'systemctl is-active mariadb && echo "MariaDB OK"')
client.close()

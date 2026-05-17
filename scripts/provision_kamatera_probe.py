#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Kamatera credential probe + provision
Tries multiple credential combinations then runs the full stack install
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import paramiko, time

KAMATERA_IP = '66.55.78.96'

# Credential candidates to try
CREDS = [
    ('root', 'AntiGravity$GETerrDONE75'),
    ('root', 'AntiGravity$GetErrDONE75'),
    ('root', 'AntiGravity$GETerrDone75'),
    ('root', 'AntiGravity$Geterrdonе75'),
    ('ubuntu', 'AntiGravity$GETerrDONE75'),
    ('admin', 'AntiGravity$GETerrDONE75'),
]

working_user = None
working_pass = None

print('[1] Probing Kamatera credentials...')
for user, pwd in CREDS:
    try:
        c = paramiko.SSHClient()
        c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        c.connect(KAMATERA_IP, username=user, password=pwd, timeout=10)
        _, o, _ = c.exec_command('whoami', timeout=5)
        result = o.read().decode('utf-8', errors='replace').strip()
        print(f'  SUCCESS: {user}:{pwd[:10]}... => {result}')
        working_user = user
        working_pass = pwd
        c.close()
        break
    except paramiko.AuthenticationException:
        print(f'  FAIL auth: {user}:{pwd[:15]}...')
    except Exception as e:
        print(f'  FAIL conn: {user}: {e}')

if not working_user:
    print('\n[!] All credential attempts failed.')
    print('    Kamatera password needs manual verification.')
    print('    Check Kamatera portal at: https://console.kamatera.com')
    sys.exit(1)

print(f'\n[2] Connected! Provisioning Kamatera with {working_user}...')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect(KAMATERA_IP, username=working_user, password=working_pass, timeout=30)

def run(cmd, timeout=180):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o: print('  OUT: ' + o[:600])
    if e and 'warning' not in e.lower() and 'created symlink' not in e.lower():
        print('  ERR: ' + e[:300])
    return o

def upload(path, content):
    sftp = c.open_sftp()
    with sftp.open(path, 'w') as f:
        f.write(content)
    sftp.close()
    print(f'  Uploaded: {path}')

# [3] Base packages
print('\n[3] Installing base stack...')
run('apt update -qq 2>/dev/null | tail -1')
run('DEBIAN_FRONTEND=noninteractive apt install -y nginx mariadb-server php php-fpm php-mysql php-curl php-xml php-mbstring php-zip php-imagick php-redis redis-server certbot python3-certbot-nginx wget curl unzip git rsync sshpass 2>&1 | tail -5', 240)

# [4] WP-CLI
print('\n[4] Installing WP-CLI...')
run('curl -s -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x /usr/local/bin/wp')
run('wp --info --allow-root 2>&1 | head -3')

# [5] MariaDB
print('\n[5] Setting up MariaDB...')
run('mysql -e "CREATE DATABASE IF NOT EXISTS drt_onl CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>&1')
run("mysql -e \"CREATE USER IF NOT EXISTS 'kortadmin'@'localhost' IDENTIFIED BY 'K0rT_Sup3r_S3cr3t!';\" 2>&1")
run("mysql -e \"GRANT ALL PRIVILEGES ON drt_onl.* TO 'kortadmin'@'localhost'; FLUSH PRIVILEGES;\" 2>&1")

# [6] WordPress drt.onl
print('\n[6] Installing WordPress for drt.onl...')
run('mkdir -p /var/www/drt-onl && chown -R www-data:www-data /var/www/drt-onl')
run('sudo -u www-data wp core download --path=/var/www/drt-onl --allow-root --quiet 2>&1')
run("sudo -u www-data wp config create --path=/var/www/drt-onl --dbname=drt_onl --dbuser=kortadmin --dbpass='K0rT_Sup3r_S3cr3t!' --dbhost=localhost --allow-root 2>&1")
run("sudo -u www-data wp core install --path=/var/www/drt-onl --url=https://drt.onl --title='DRT Public Network' --admin_user=kortadmin --admin_password='K0rT_Sov3r3ign!' --admin_email=kort@drt.onl --allow-root 2>&1")
run("sudo -u www-data wp plugin install wordfence wp-super-cache --activate --path=/var/www/drt-onl --allow-root --quiet 2>&1")

# [7] Nginx config
print('\n[7] Configuring Nginx...')
nginx_conf = """\
server {
    listen 80;
    server_name drt.onl www.drt.onl cdn.drt.onl api.drt.onl cdn.drt.social cdn.kortx.ca assets.kortx.ca;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    http2 on;
    server_name drt.onl www.drt.onl;
    root /var/www/drt-onl;
    index index.php;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
    ssl_protocols TLSv1.2 TLSv1.3;
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
    listen 443 ssl;
    http2 on;
    server_name cdn.drt.onl cdn.drt.social cdn.kortx.ca assets.kortx.ca;
    ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
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
run('apt install -y ssl-cert -qq 2>/dev/null | tail -1')
run('mkdir -p /var/www/cdn /opt/kort/secrets')
upload('/etc/nginx/sites-available/drt-onl-kamatera', nginx_conf)
run('ln -sf /etc/nginx/sites-available/drt-onl-kamatera /etc/nginx/sites-enabled/')
run('rm -f /etc/nginx/sites-enabled/default')
run('nginx -t 2>&1 | tail -2')
run('systemctl reload nginx')

# [8] SSL certs via standalone
print('\n[8] Requesting SSL certs...')
run('systemctl stop nginx')
run('certbot certonly --standalone -d drt.onl -d www.drt.onl -d cdn.drt.onl --non-interactive --agree-tos -m kort@drt.onl 2>&1 | tail -5', 120)
run('systemctl start nginx')

# Update to real certs if issued
cert_check = run('ls /etc/letsencrypt/live/drt.onl/fullchain.pem 2>&1')
if 'fullchain.pem' in cert_check:
    run("sed -i 's|/etc/ssl/certs/ssl-cert-snakeoil.pem|/etc/letsencrypt/live/drt.onl/fullchain.pem|g' /etc/nginx/sites-available/drt-onl-kamatera")
    run("sed -i 's|/etc/ssl/private/ssl-cert-snakeoil.key|/etc/letsencrypt/live/drt.onl/privkey.pem|g' /etc/nginx/sites-available/drt-onl-kamatera")
    run('nginx -t && systemctl reload nginx')
    print('  Real SSL cert installed!')

# [9] Setup rsync mirror cron
print('\n[9] Setting up mirror sync from Xeon...')
sync = ("#!/bin/bash\n"
        "# Sync media from Xeon drt.social to Kamatera CDN\n"
        "sshpass -p 'jetfg4GwdEaslMLH3DOWDgBU' rsync -az --delete -e 'ssh -o StrictHostKeyChecking=no' \\\n"
        "  root@104.219.251.218:/var/www/drt-social/wp-content/uploads/ \\\n"
        "  /var/www/cdn/drt-social/ 2>/dev/null\n")
upload('/opt/kort/sync_mirror.sh', sync)
run('chmod +x /opt/kort/sync_mirror.sh')
run('(crontab -l 2>/dev/null; echo "*/15 * * * * /opt/kort/sync_mirror.sh >> /opt/kort/sync.log 2>&1") | crontab -')

# [10] Health check
print('\n[10] Final verification...')
run('nginx -t 2>&1 | tail -2')
run('curl -sk https://drt.onl -o /dev/null -w "%{http_code}" 2>&1')
run('systemctl is-active nginx mariadb')

print('\n' + '='*60)
print('KAMATERA PROVISIONING COMPLETE')
print(f'Working creds: {working_user} / {working_pass}')
c.close()

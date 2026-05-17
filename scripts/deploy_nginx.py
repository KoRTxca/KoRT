import paramiko

host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host_ip, username=host_user, password=host_pw)

# The Nginx deployment script
nginx_script = """
apt-get update && apt-get install -y nginx
cat <<'EOF' > /etc/nginx/sites-available/default
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://10.10.10.35:8443;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}
EOF
systemctl restart nginx
"""

print("Deploying Nginx Reverse Proxy to Xeon Host...")
client.exec_command(f"echo \"{nginx_script}\" > /tmp/deploy_nginx.sh")
client.exec_command("chmod +x /tmp/deploy_nginx.sh")
stdin, stdout, stderr = client.exec_command("/tmp/deploy_nginx.sh")

print("STDOUT:", stdout.read().decode('utf-8'))
print("STDERR:", stderr.read().decode('utf-8'))

client.close()

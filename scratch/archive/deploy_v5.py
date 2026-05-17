import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Uploading proxy_api.py (v5.0)...")
sftp = client.open_sftp()
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\proxy_api.py', '/opt/kort/proxy_api.py')
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\nginx_proxy.conf', '/etc/nginx/sites-available/api.kortx.ca.conf')
sftp.close()

print("Restarting Nginx...")
client.exec_command("nginx -t && systemctl reload nginx")

print("Restarting Proxy Service (nohup for now)...")
# Kill existing uvicorn if any
client.exec_command("pkill -f uvicorn")
# Start new v5.0 on port 8080
client.exec_command("nohup /opt/kort/venv/bin/python -m uvicorn proxy_api:app --host 127.0.0.1 --port 8080 > /opt/kort/proxy.log 2>&1 &")

print("Xeon Forge (v5.0) Online.")
client.close()

import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Creating secrets directory...")
client.exec_command("mkdir -p /opt/kort/secrets")

print("Uploading proxy_api.py (v4.0)...")
sftp = client.open_sftp()
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\proxy_api.py', '/opt/kort/proxy_api.py')
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\nginx_proxy.conf', '/etc/nginx/sites-available/api.kortx.ca.conf')
sftp.close()

print("Installing dependencies in venv...")
# Re-ensure venv and install
client.exec_command("apt-get update && apt-get install -y python3-venv")
stdin, stdout, stderr = client.exec_command("python3 -m venv /opt/kort/venv && /opt/kort/venv/bin/pip install fastapi uvicorn google-cloud-aiplatform pydantic google-auth")
stdout.channel.recv_exit_status()

print("Xeon Forge (v4.0) Environment Ready.")
print("Awaiting /opt/kort/secrets/kort-ide-proxy.json")

client.close()

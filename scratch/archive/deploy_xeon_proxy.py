import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Ensuring pip3 is installed...")
stdin, stdout, stderr = client.exec_command("apt-get update && apt-get install -y python3-pip")
stdout.channel.recv_exit_status()

print("Installing dependencies via pip3...")
stdin, stdout, stderr = client.exec_command("pip3 install fastapi uvicorn google-cloud-aiplatform pydantic --break-system-packages")
print("PIP OUT:", stdout.read().decode('utf-8', errors='ignore'))
print("PIP ERR:", stderr.read().decode('utf-8', errors='ignore'))

print("Xeon Forge environment ready.")
client.close()

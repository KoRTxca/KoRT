import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Setting up virtualenv on Xeon...")
client.exec_command("apt-get update && apt-get install -y python3-venv")
stdin, stdout, stderr = client.exec_command("python3 -m venv /opt/kort_datacore/venv")
stdout.channel.recv_exit_status()

print("Installing dependencies in virtualenv...")
stdin, stdout, stderr = client.exec_command("/opt/kort_datacore/venv/bin/pip install fastapi uvicorn google-cloud-aiplatform pydantic")
stdout.channel.recv_exit_status()

print("Checking FastAPI in virtualenv...")
stdin, stdout, stderr = client.exec_command("/opt/kort_datacore/venv/bin/pip show fastapi")
print("FASTAPI:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

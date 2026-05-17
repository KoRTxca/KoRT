import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Creating secrets directory on Xeon...")
client.exec_command("mkdir -p /opt/kort/secrets")

print("Uploading Autonomously Generated Keys...")
sftp = client.open_sftp()
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\secrets\\kort-ide-proxy.json', '/opt/kort/secrets/kort-ide-proxy.json')
sftp.put('d:\\KoRT_Command_Center\\Mission_Control\\scripts\\secrets\\gemini_api_key.txt', '/opt/kort/secrets/gemini_api_key.txt')
sftp.close()

print("Restarting Proxy Service with Gemini Enterprise Bridge...")
client.exec_command("fuser -k 8081/tcp")
client.exec_command("pkill -f proxy_api.py")
client.exec_command("pkill -f uvicorn")
client.exec_command("sleep 1")
client.exec_command("cd /opt/kort && nohup /opt/kort/venv/bin/python -u proxy_api.py > /opt/kort/proxy.log 2>&1 &")

print("Verification: Checking if proxy is reading the key...")
stdin, stdout, stderr = client.exec_command("grep 'Success' /opt/kort/proxy.log || echo 'Waiting...'")
print(stdout.read().decode())

client.close()
print("Sovereign Bridge ACTIVE.")

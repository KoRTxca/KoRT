import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Using apt to install python3-pip and python3-venv if missing...")
stdin, stdout, stderr = client.exec_command('apt-get update && apt-get install -y python3-pip python3-venv')
print(stdout.read().decode('utf-8', errors='ignore'))

print("Recreating Python Virtual Environment cleanly...")
stdin, stdout, stderr = client.exec_command('rm -rf /opt/kort/venv && python3 -m venv /opt/kort/venv')
print(stdout.read().decode('utf-8', errors='ignore'))

print("Installing packages inside clean venv...")
stdin, stdout, stderr = client.exec_command('/opt/kort/venv/bin/pip install fastapi uvicorn google-cloud-aiplatform httpx pyjwt cryptography paramiko requests')
print(stdout.read().decode('utf-8', errors='ignore'))

print("Starting Proxy API using venv...")
client.exec_command("pkill -f uvicorn")
client.exec_command("nohup /opt/kort/venv/bin/python -m uvicorn proxy_api:app --host 127.0.0.1 --port 8080 > /opt/kort/proxy.log 2>&1 &")

import time
time.sleep(3)

stdin, stdout, stderr = client.exec_command("cat /opt/kort/proxy.log")
print("--- PROXY LOGS ---")
print(stdout.read().decode('utf-8', errors='ignore'))

client.close()

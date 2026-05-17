import paramiko
import sys

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Starting Proxy...")
client.exec_command("pkill -f uvicorn")
client.exec_command("nohup /opt/kort/venv/bin/python -m uvicorn proxy_api:app --host 127.0.0.1 --port 8080 > /opt/kort/proxy.log 2>&1 &")

import time
time.sleep(3)

stdin, stdout, stderr = client.exec_command("cat /opt/kort/proxy.log")
log_data = stdout.read().decode('utf-8', errors='ignore')
print("--- PROXY LOGS ---")
sys.stdout.buffer.write(log_data.encode('utf-8'))
print()

client.close()

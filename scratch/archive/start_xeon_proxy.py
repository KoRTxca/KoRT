import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Installing python packages on Xeon...")
stdin, stdout, stderr = client.exec_command('python3 -m pip install --break-system-packages fastapi uvicorn google-cloud-aiplatform httpx pyjwt cryptography paramiko requests')
print(stdout.read().decode())
print(stderr.read().decode())

print("Restarting Proxy Service with Gemini Enterprise Bridge...")
client.exec_command("pkill -f uvicorn")
client.exec_command("nohup python3 -m uvicorn proxy_api:app --host 127.0.0.1 --port 8080 > /opt/kort/proxy.log 2>&1 &")

import time
time.sleep(2)

print("Checking proxy logs...")
stdin, stdout, stderr = client.exec_command("cat /opt/kort/proxy.log")
print(stdout.read().decode())

client.close()

import paramiko
import sys

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Executing direct system installation check...")
stdin, stdout, stderr = client.exec_command('python3 -c "import uvicorn; print(uvicorn.__file__)"')
print("Import test output:", stdout.read().decode('utf-8', errors='ignore'))
print("Import test err:", stderr.read().decode('utf-8', errors='ignore'))

client.close()

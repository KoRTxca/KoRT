import paramiko
import sys

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing direct import...")
stdin, stdout, stderr = client.exec_command('cd /opt/kort && /opt/kort/venv/bin/python -c "import proxy_api"')
print("Import stdout:", stdout.read().decode('utf-8', errors='ignore'))
print("Import stderr:", stderr.read().decode('utf-8', errors='ignore'))

client.close()

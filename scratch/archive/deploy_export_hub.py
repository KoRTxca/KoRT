import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Deploying Sovereign Claude Export Hub to Xeon...")
sftp = client.open_sftp()
local_path = 'd:\\KoRT_Command_Center\\Apps\\claude-export-hub'
remote_path = '/opt/kort/claude-export-hub'

try:
    sftp.mkdir(remote_path)
except:
    pass

for root, dirs, files in os.walk(local_path):
    if 'node_modules' in root or '.git' in root:
        continue
    rel = os.path.relpath(root, local_path)
    rem = os.path.join(remote_path, rel).replace('\\', '/')
    try:
        sftp.mkdir(rem)
    except:
        pass
    for f in files:
        sftp.put(os.path.join(root, f), os.path.join(rem, f).replace('\\', '/'))

print("Installing dependencies on Xeon...")
client.exec_command(f"cd {remote_path} && /usr/bin/npm install")

print("Starting Build...")
client.exec_command(f"cd {remote_path} && /usr/bin/npm run build")

sftp.close()
client.close()
print("Sovereign Export Hub DEPLOYED.")

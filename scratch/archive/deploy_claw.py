import paramiko
import os

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Pushing KoRT_Claw to Xeon...")
sftp = client.open_sftp()
local_path = 'd:\\KoRT_Command_Center\\Apps\\KoRT_Claw'
remote_path = '/opt/kort/KoRT_Claw'

try:
    sftp.mkdir(remote_path)
except:
    pass

for root, dirs, files in os.walk(local_path):
    rel = os.path.relpath(root, local_path)
    rem = os.path.join(remote_path, rel).replace('\\', '/')
    try:
        sftp.mkdir(rem)
    except:
        pass
    for f in files:
        sftp.put(os.path.join(root, f), os.path.join(rem, f).replace('\\', '/'))

sftp.close()
client.close()
print("Claw Deployed to Xeon.")

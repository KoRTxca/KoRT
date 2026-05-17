import paramiko
import time

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

cmd = """
VMID=$(pvesh get /cluster/nextid)
# nextid is the new one, so the one we created is nextid - 1
CURR=$(($VMID - 1))
pct exec $CURR -- ip a
"""
stdin, stdout, stderr = client.exec_command(cmd)
print("OUT:", stdout.read().decode())

client.close()

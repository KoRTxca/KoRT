import paramiko
import sys

ip = '104.219.251.218'
user = 'root'
pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(ip, username=user, password=pw)

cmd = 'qm set 133 --ide2 local:iso/ubuntu-24.04.1-desktop-amd64.iso,media=cdrom --boot order="scsi0;ide2"'
stdin, stdout, stderr = client.exec_command(cmd)

print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()

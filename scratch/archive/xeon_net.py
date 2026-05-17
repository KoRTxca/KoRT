import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

cmd = "ip a; cat /etc/network/interfaces"
stdin, stdout, stderr = client.exec_command(cmd)
print("OUT:", stdout.read().decode())

client.close()

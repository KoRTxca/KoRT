import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Checking process...")
stdin, stdout, stderr = client.exec_command("ps -f -p 800303")
print("OUT:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

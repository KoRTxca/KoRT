import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Checking dependencies...")
stdin, stdout, stderr = client.exec_command("pip3 show fastapi")
print("FASTAPI:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

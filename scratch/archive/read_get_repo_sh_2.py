import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Reading get_repo.sh lines 51-100...")
stdin, stdout, stderr = client.exec_command("sed -n '51,100p' /opt/vs_kort_code_build/vscodium/get_repo.sh")
print("OUT:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Reading build.sh...")
stdin, stdout, stderr = client.exec_command("head -n 50 /opt/vs_kort_code_build/vscodium/build.sh")
print("OUT:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

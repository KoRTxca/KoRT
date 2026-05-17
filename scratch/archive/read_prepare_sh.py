import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Reading prepare_vscode.sh...")
stdin, stdout, stderr = client.exec_command("head -n 50 /opt/vs_kort_code_build/vscodium/prepare_vscode.sh")
print("OUT:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

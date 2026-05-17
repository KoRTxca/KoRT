import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Checking engines in vscode/package.json...")
stdin, stdout, stderr = client.exec_command("cat /opt/vs_kort_code_build/vscodium/vscode/package.json | jq .engines")
print("ENGINES:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

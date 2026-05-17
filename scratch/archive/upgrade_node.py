import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Installing Node 20 on Xeon...")
stdin, stdout, stderr = client.exec_command('bash -c "source ~/.nvm/nvm.sh && nvm install 20 && nvm alias default 20"')
print(stdout.read().decode())
print(stderr.read().decode())

print("Verifying Node version...")
stdin, stdout, stderr = client.exec_command('bash -c "source ~/.nvm/nvm.sh && node -v"')
print(stdout.read().decode())

client.close()

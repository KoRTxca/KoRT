import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Installing Node 20 on Xeon...")
client.exec_command("curl -fsSL https://deb.nodesource.com/setup_20.x | bash -")
stdin, stdout, stderr = client.exec_command("apt-get install -y nodejs")
stdout.channel.recv_exit_status()

print("Verifying Node version...")
stdin, stdout, stderr = client.exec_command("node -v")
print("NODE:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

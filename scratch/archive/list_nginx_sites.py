import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Files in sites-enabled:")
stdin, stdout, stderr = client.exec_command('ls -la /etc/nginx/sites-enabled/')
print(stdout.read().decode('utf-8', errors='ignore'))

print("Files in sites-available:")
stdin, stdout, stderr = client.exec_command('ls -la /etc/nginx/sites-available/')
print(stdout.read().decode('utf-8', errors='ignore'))

client.close()

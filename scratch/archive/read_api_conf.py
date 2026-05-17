import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Reading api.kortx.ca.conf...")
stdin, stdout, stderr = client.exec_command('cat /etc/nginx/sites-available/api.kortx.ca.conf')
print(stdout.read().decode('utf-8', errors='ignore'))

client.close()

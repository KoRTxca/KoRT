import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Checking port 8080 listeners...")
stdin, stdout, stderr = client.exec_command('ss -lptn sport = :8080')
print("ss output:", stdout.read().decode('utf-8', errors='ignore'))

print("Finding process on port 8080...")
stdin, stdout, stderr = client.exec_command('lsof -i :8080')
print("lsof output:", stdout.read().decode('utf-8', errors='ignore'))

client.close()

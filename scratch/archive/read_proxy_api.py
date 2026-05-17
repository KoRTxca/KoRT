import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Reading proxy_api.py...")
stdin, stdout, stderr = client.exec_command('cat /opt/kort/proxy_api.py')
print(stdout.read().decode('utf-8', errors='ignore').encode('ascii', errors='backslashreplace').decode('ascii'))

client.close()

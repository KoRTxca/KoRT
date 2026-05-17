import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Sending curl request synchronously...")
stdin, stdout, stderr = client.exec_command('curl -v -X POST -H "Content-Type: application/json" -d \'{"prompt": "Hello", "context": "Test"}\' http://127.0.0.1:8081/v1/merlin/chat')

print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()

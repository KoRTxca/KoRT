import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing FastAPI proxy endpoint local request via SSH...")
cmd = "curl -s -X POST -H 'Content-Type: application/json' -d '{\"prompt\": \"Hello, represent the sovereignty of KoRT! Answer in one sentence.\", \"context\": \"System spec v5.0 active.\"}' http://127.0.0.1:8081/v1/merlin/chat"
stdin, stdout, stderr = client.exec_command(cmd)
print("Response:", stdout.read().decode('utf-8'))
print("Errors:", stderr.read().decode('utf-8'))

client.close()

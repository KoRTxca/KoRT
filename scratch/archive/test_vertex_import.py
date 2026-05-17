import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing vertexai import on Xeon...")
stdin, stdout, stderr = client.exec_command('/opt/kort/venv/bin/python -c "import vertexai; from vertexai.generative_models import GenerativeModel; print(\'Imports work!\')"')
print("stdout:", stdout.read().decode('utf-8'))
print("stderr:", stderr.read().decode('utf-8'))

client.close()

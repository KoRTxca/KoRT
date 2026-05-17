import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Installing the NEW google-genai package inside the Xeon virtual environment...")
stdin, stdout, stderr = client.exec_command('/opt/kort/venv/bin/pip install google-genai')
print("stdout:", stdout.read().decode('utf-8', errors='ignore'))
print("stderr:", stderr.read().decode('utf-8', errors='ignore'))

client.close()
print("Install complete!")

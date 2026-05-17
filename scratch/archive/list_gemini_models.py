import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Listing available models from Google AI Studio...")
cmd = """/opt/kort/venv/bin/python -c "
import google.generativeai as genai
with open('/opt/kort/secrets/gemini_api_key.txt') as f:
    key = f.read().strip()
genai.configure(api_key=key)
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)
" """
stdin, stdout, stderr = client.exec_command(cmd)
print("Models:")
print(stdout.read().decode('utf-8'))
print("Errors:")
print(stderr.read().decode('utf-8'))

client.close()

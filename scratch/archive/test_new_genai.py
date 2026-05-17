import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing the NEW google-genai package on Xeon...")
cmd = """/opt/kort/venv/bin/python -c "
from google import genai
with open('/opt/kort/secrets/gemini_api_key.txt') as f:
    key = f.read().strip()
client = genai.Client(api_key=key)
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Hello, represent the sovereignty of KoRT in one short sentence.'
)
print('Reply:', response.text)
" """
stdin, stdout, stderr = client.exec_command(cmd)
print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()

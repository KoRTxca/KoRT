import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing gemini-1.5-flash on Xeon...")
cmd = """/opt/kort/venv/bin/python -c "
import google.generativeai as genai
with open('/opt/kort/secrets/gemini_api_key.txt') as f:
    key = f.read().strip()
genai.configure(api_key=key)
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Hello!')
print('Reply:', response.text)
" """
stdin, stdout, stderr = client.exec_command(cmd)
print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()

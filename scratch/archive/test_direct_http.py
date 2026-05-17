import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Testing direct HTTP POST request to Gemini API...")
cmd = """/opt/kort/venv/bin/python -c "
import requests
with open('/opt/kort/secrets/gemini_api_key.txt') as f:
    key = f.read().strip()
url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}'
headers = {'Content-Type': 'application/json'}
payload = {
    'contents': [{
        'parts': [{'text': 'Hello, represent the sovereignty of KoRT in one short sentence.'}]
    }]
}
response = requests.post(url, json=payload, headers=headers)
print('Status:', response.status_code)
print('Response:', response.json())
" """
stdin, stdout, stderr = client.exec_command(cmd)
print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()

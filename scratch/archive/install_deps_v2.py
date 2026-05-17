import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Re-installing dependencies...")
# No output capture for the massive pip output
client.exec_command("apt-get update && apt-get install -y python3-pip && pip3 install fastapi uvicorn google-cloud-aiplatform pydantic --break-system-packages")

client.close()
print("Triggered installation.")

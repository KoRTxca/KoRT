import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Killing hung dpkg...")
client.exec_command("kill -9 800303")
client.exec_command("killall dpkg")
client.exec_command("killall apt-get")

print("Running noninteractive dpkg...")
stdin, stdout, stderr = client.exec_command("DEBIAN_FRONTEND=noninteractive dpkg --configure -a --force-confdef --force-confold")
print("DPKG OUT:", stdout.read().decode('utf-8', errors='ignore'))
print("DPKG ERR:", stderr.read().decode('utf-8', errors='ignore'))

print("Restarting build script...")
# Truncate log file first to start fresh
client.exec_command("> /opt/kort/scripts/build_vs_kort_code.log")
stdin, stdout, stderr = client.exec_command("nohup /opt/kort/scripts/build_vs_kort_code.sh > /opt/kort/scripts/build_vs_kort_code.log 2>&1 &")
print("Restart triggered.")

client.close()

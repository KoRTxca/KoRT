import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Restarting build script...")
# Truncate log file first to start fresh
client.exec_command("> /opt/kort/scripts/build_vs_kort_code.log")
client.exec_command("nohup /opt/kort/scripts/build_vs_kort_code.sh > /opt/kort/scripts/build_vs_kort_code.log 2>&1 &")
print("Restart triggered.")

client.close()

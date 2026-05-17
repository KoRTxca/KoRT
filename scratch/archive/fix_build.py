import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Fixing dpkg...")
stdin, stdout, stderr = client.exec_command("dpkg --configure -a")
stdout.channel.recv_exit_status() # wait for it to finish

print("Restarting build...")
stdin, stdout, stderr = client.exec_command("nohup /opt/kort/scripts/build_vs_kort_code.sh > /opt/kort/scripts/build_vs_kort_code.log 2>&1 &")

client.close()

import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

# Check build log
cmd = "tail -n 80 /opt/kort/scripts/build_vs_kort_code.log"
stdin, stdout, stderr = client.exec_command(cmd)
with open('d:\\KoRT_Command_Center\\Mission_Control\\scratch\\build_log.txt', 'w', encoding='utf-8') as f:
    f.write(stdout.read().decode('utf-8', errors='ignore'))

# Check if build process is still running
cmd2 = "ps aux | grep build_vs_kort_code | grep -v grep"
stdin2, stdout2, stderr2 = client.exec_command(cmd2)
with open('d:\\KoRT_Command_Center\\Mission_Control\\scratch\\build_ps.txt', 'w', encoding='utf-8') as f:
    f.write(stdout2.read().decode('utf-8', errors='ignore'))

# Check container status
cmd3 = "pct list"
stdin3, stdout3, stderr3 = client.exec_command(cmd3)
with open('d:\\KoRT_Command_Center\\Mission_Control\\scratch\\pct_list.txt', 'w', encoding='utf-8') as f:
    f.write(stdout3.read().decode('utf-8', errors='ignore'))

client.close()

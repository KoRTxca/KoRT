import paramiko

host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

vm_ip = '10.10.10.35'
vm_user = 'kort'
vm_pw = '&Omega%75wx32Z%'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host_ip, username=host_user, password=host_pw)

# The fix script
# We pre-format the strings to avoid shell issues
bash_fix = f"""
export SSHPASS='{vm_pw}'
sshpass -e ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} "echo '{vm_pw}' | sudo -S systemctl restart code-server@kort"
sshpass -e ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} "echo '{vm_pw}' | sudo -S ufw disable"
"""

print("Uplinking to Xeon host to fix service...")
client.exec_command(f"echo \"{bash_fix}\" > /tmp/fix_ide_final.sh")
client.exec_command("chmod +x /tmp/fix_ide_final.sh")
stdin, stdout, stderr = client.exec_command("/tmp/fix_ide_final.sh")

print("STDOUT:", stdout.read().decode('utf-8'))
print("STDERR:", stderr.read().decode('utf-8'))

client.close()

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

# Creating the script on the host
# We avoid HERE-DOCS to prevent shell parsing issues
lazarus = f"""
echo '{vm_pw}' | sudo -S systemctl stop code-server@kort
mkdir -p /home/kort/.config/code-server
echo 'bind-addr: 0.0.0.0:8443' > /home/kort/.config/code-server/config.yaml
echo 'auth: password' >> /home/kort/.config/code-server/config.yaml
echo 'password: {vm_pw}' >> /home/kort/.config/code-server/config.yaml
echo 'cert: false' >> /home/kort/.config/code-server/config.yaml
echo '{vm_pw}' | sudo -S systemctl start code-server@kort
"""

client.exec_command(f'echo "{lazarus}" > /tmp/lazarus_v2.sh')
client.exec_command(f'sshpass -p "{vm_pw}" ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} "bash /tmp/lazarus_v2.sh"')

print("Lazarus payload delivered.")
client.close()

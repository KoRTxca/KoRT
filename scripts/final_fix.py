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

# Create the fix script on the host to avoid ANY local shell interference
remote_fix = f"""
cat <<'EOF' > /tmp/vm_fix.sh
mkdir -p ~/.config/code-server
echo "bind-addr: 0.0.0.0:8443" > ~/.config/code-server/config.yaml
echo "auth: password" >> ~/.config/code-server/config.yaml
echo "password: {vm_pw}" >> ~/.config/code-server/config.yaml
echo "cert: false" >> ~/.config/code-server/config.yaml
echo "{vm_pw}" | sudo -S systemctl restart code-server@kort
EOF

export SSHPASS='{vm_pw}'
sshpass -e ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} 'bash -s' < /tmp/vm_fix.sh

# Fix NAT one last time
iptables -t nat -F
iptables -t nat -A PREROUTING -p tcp --dport 8443 -j DNAT --to-destination 10.10.10.35:8443
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 10.10.10.35:8080
iptables -t nat -A POSTROUTING -j MASQUERADE
echo 1 > /proc/sys/net/ipv4/ip_forward
"""

client.exec_command(f'echo "{remote_fix}" > /tmp/final_ide_fix.sh')
client.exec_command('chmod +x /tmp/final_ide_fix.sh')
stdin, stdout, stderr = client.exec_command('/tmp/final_ide_fix.sh')

print("STDOUT:", stdout.read().decode('utf-8'))
print("STDERR:", stderr.read().decode('utf-8'))

client.close()

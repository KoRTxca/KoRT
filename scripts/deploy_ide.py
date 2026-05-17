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

# The autonomous IDE Deployment script (with sudo -S)
ide_script = f"""
set -e
echo "Checking for code-server..."
if ! command -v code-server &> /dev/null; then
    echo "Installing code-server..."
    curl -fsSL https://code-server.dev/install.sh | sh
fi

echo "Configuring code-server..."
echo '{vm_pw}' | sudo -S systemctl enable --now code-server@kort

mkdir -p /home/kort/.config/code-server
cat <<EOF > /home/kort/.config/code-server/config.yaml
bind-addr: 0.0.0.0:8443
auth: password
password: {vm_pw}
cert: false
EOF

echo '{vm_pw}' | sudo -S chown -R kort:kort /home/kort/.config

echo "Installing extensions..."
/usr/bin/code-server --install-extension zhuangtongfa.Material-theme
/usr/bin/code-server --install-extension pkief.material-icon-theme

echo '{vm_pw}' | sudo -S systemctl restart code-server@kort
echo "KoRT_AI_IDE_READY"
"""

print("Uplinking to Xeon host...")
client.exec_command(f"echo '{ide_script}' > /tmp/deploy_ide_v3.sh")

print("Injecting payload into Cloud OS...")
cmd = f"sshpass -p '{vm_pw}' ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} 'bash -s' < /tmp/deploy_ide_v3.sh"
stdin, stdout, stderr = client.exec_command(cmd)

out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')

print("STDOUT:", out)
print("STDERR:", err)

if "KoRT_AI_IDE_READY" in out:
    print("SUCCESS: KoRT_AI_IDE is operational.")
else:
    print("FAILURE during deployment.")

client.close()

import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

cmd = """
# Fix networking to use vmbr1 (NAT)
pct set 100 -net0 name=eth0,bridge=vmbr1,ip=10.10.10.100/24,gw=10.10.10.1
# Make sure DNS is set
pct set 100 -nameserver 8.8.8.8
pct stop 100
sleep 2
pct start 100
sleep 5

# Configure inside the container
pct exec 100 -- bash -c "
apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y curl wget git build-essential htop python3 python3-pip python3-venv nodejs npm openssh-server sudo

# Start SSH
systemctl enable ssh
systemctl start ssh

# Setup master user 'kort'
id -u kort || useradd -m -s /bin/bash kort
echo 'kort:jetfg4GwdEaslMLH3DOWDgBU' | chpasswd
usermod -aG sudo kort

# Allow password authentication for SSH temporarily or ensure it's enabled
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl restart ssh
"
"""
stdin, stdout, stderr = client.exec_command(cmd)
print("OUT:", stdout.read().decode())
print("ERR:", stderr.read().decode())

client.close()

import paramiko
import time

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

cmd = """
# 1. Install code-server inside the container
pct exec 100 -- bash -c "curl -fsSL https://code-server.dev/install.sh | sh"

# 2. Configure code-server for user 'kort'
pct exec 100 -- su - kort -c "mkdir -p ~/.config/code-server"
pct exec 100 -- bash -c 'cat <<EOF > /home/kort/.config/code-server/config.yaml
bind-addr: 0.0.0.0:8080
auth: password
password: jetfg4GwdEaslMLH3DOWDgBU
cert: false
EOF'
pct exec 100 -- chown -R kort:kort /home/kort/.config

# 3. Enable and start code-server
pct exec 100 -- systemctl enable --now code-server@kort
pct exec 100 -- systemctl restart code-server@kort

# 4. Set up Port Forwarding on Xeon to route external 8080 to container 100
# Remove any existing rule for 8080 to avoid duplicates
iptables -t nat -D PREROUTING -p tcp -d 104.219.251.218 --dport 8080 -j DNAT --to-destination 10.10.10.100:8080 2>/dev/null || true
iptables -t filter -D FORWARD -p tcp -d 10.10.10.100 --dport 8080 -j ACCEPT 2>/dev/null || true

iptables -t nat -A PREROUTING -p tcp -d 104.219.251.218 --dport 8080 -j DNAT --to-destination 10.10.10.100:8080
iptables -t filter -A FORWARD -p tcp -d 10.10.10.100 --dport 8080 -j ACCEPT
"""
stdin, stdout, stderr = client.exec_command(cmd)
print("OUT:", stdout.read().decode())
print("ERR:", stderr.read().decode())

client.close()

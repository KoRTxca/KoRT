import paramiko

ip = '104.219.251.218'
user = 'root'
pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(ip, username=user, password=pw)

# 1. Install dnsmasq
print("Installing dnsmasq...")
stdin, stdout, stderr = client.exec_command('apt update && apt install -y dnsmasq')
stdout.read() # wait

# 2. Configure dnsmasq
config = """interface=vmbr1
dhcp-range=10.10.10.10,10.10.10.100,24h
dhcp-option=option:router,10.10.10.1
dhcp-option=option:dns-server,1.1.1.1,8.8.8.8
"""
print("Writing configuration...")
# Use a heredoc to avoid escaping issues
cmd = f"cat <<EOF > /etc/dnsmasq.d/pve-vms.conf\n{config}EOF"
client.exec_command(cmd)

# 3. Restart dnsmasq
print("Restarting dnsmasq...")
client.exec_command('systemctl restart dnsmasq')

print("DHCP Server (dnsmasq) is now active on vmbr1.")
client.close()

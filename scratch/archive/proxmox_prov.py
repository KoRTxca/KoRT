import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

cmd = """
VMID=$(pvesh get /cluster/nextid)
pct create $VMID local:vztmpl/ubuntu-24.04-standard_24.04-2_amd64.tar.zst --hostname kort-dev-vps --cores 2 --memory 4096 --net0 name=eth0,bridge=vmbr0,ip=dhcp --storage local-lvm --password jetfg4GwdEaslMLH3DOWDgBU --unprivileged 1
pct start $VMID
sleep 3
pct exec $VMID -- ip a
"""
stdin, stdout, stderr = client.exec_command(cmd)
print("OUT:", stdout.read().decode())
print("ERR:", stderr.read().decode())

client.close()

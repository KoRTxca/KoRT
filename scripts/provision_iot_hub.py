import paramiko
import sys

ip = '104.219.251.218'
user = 'root'
pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(ip, username=user, password=pw)

commands = [
    'qm create 134 --name KoRT-IoT-Hub --memory 4096 --cores 2 --net0 virtio,bridge=vmbr0 --scsihw virtio-scsi-pci --bios ovmf --machine q35',
    'qm set 134 --efidisk0 local-lvm:0',
    'qm importdisk 134 /tmp/haos.qcow2 local-lvm',
    'qm set 134 --scsi0 local-lvm:vm-134-disk-1 --boot order=scsi0',
    'qm start 134'
]

for cmd in commands:
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8')
    err = stderr.read().decode('utf-8')
    if out: print(f"STDOUT: {out}")
    if err: print(f"STDERR: {err}")

client.close()

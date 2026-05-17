import paramiko

# Host details
host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

# VM details
vm_ip = '10.10.10.35'
vm_user = 'kort'
vm_pw = '&Omega%75wx32Z%'

print(f"Connecting to Host {host_ip}...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host_ip, username=host_user, password=host_pw)

# Install sshpass on host if not present
print("Ensuring sshpass is on host...")
client.exec_command('apt install -y sshpass')

print(f"Attempting jump to VM {vm_ip}...")
cmd = f'sshpass -p "{vm_pw}" ssh -o StrictHostKeyChecking=no {vm_user}@{vm_ip} "echo VM_READY"'
stdin, stdout, stderr = client.exec_command(cmd)

out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')

print("STDOUT:", out)
print("STDERR:", err)

if "VM_READY" in out:
    print("SUCCESS: KoRT Cloud OS is reachable.")
else:
    print("FAILURE: Could not reach VM.")

client.close()

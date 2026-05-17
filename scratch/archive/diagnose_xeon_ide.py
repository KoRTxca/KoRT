import paramiko

host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host_ip, username=host_user, password=host_pw)

def run_cmd(cmd):
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8')
    err = stderr.read().decode('utf-8')
    if out:
        print("OUT:", out)
    if err:
        print("ERR:", err)
    return out, err

print("=== Nginx Sites Enabled ===")
run_cmd("ls -la /etc/nginx/sites-enabled/")

print("=== Nginx Configuration for ide.kortx.ca or similar ===")
run_cmd("cat /etc/nginx/sites-enabled/ide.kortx.ca || cat /etc/nginx/sites-enabled/default || cat /etc/nginx/sites-enabled/kortx")

print("=== Proxmox VMs Status ===")
run_cmd("qm list")

print("=== Ping VM 10.10.10.35 ===")
run_cmd("ping -c 3 10.10.10.35")

print("=== Check if port 8080 is reachable on VM from Host ===")
run_cmd("nc -zv 10.10.10.35 8080")
run_cmd("nc -zv 10.10.10.35 8443")

client.close()

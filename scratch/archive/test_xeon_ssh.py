import paramiko
import sys
import os

key_path = r"C:\Users\XCLTD\.ssh\id_rsa"
if not os.path.exists(key_path):
    print(f"Key not found at {key_path}")
    sys.exit(1)

print(f"Loading key from {key_path}...")
key = paramiko.RSAKey.from_private_key_file(key_path)

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print("Connecting to Xeon...")
    c.connect('104.219.251.218', username='root', pkey=key, timeout=30)
    print("Connection SUCCESSFUL!")
    
    def run(cmd):
        print(f"\n--- Running: {cmd} ---")
        _, out, err = c.exec_command(cmd)
        o = out.read().decode('utf-8').strip()
        e = err.read().decode('utf-8').strip()
        if o: print("OUT:\n" + o)
        if e: print("ERR:\n" + e)
        return o

    run("nginx -T | grep -E 'server_name|listen'")
    run("ls -la /etc/nginx/sites-enabled/")
    run("certbot certificates")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    c.close()

import paramiko
import sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print("Connecting to Kamatera (66.55.78.96)...")
    c.connect('66.55.78.96', username='root', password='AntiGravity$$$GETerrDONE75', timeout=30)
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

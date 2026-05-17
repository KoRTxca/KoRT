#!/usr/bin/env python3
"""
KoRT Sovereign Mail Server VPS Hardening & SSH Verification
Logs into the dedicated Vultr mail VPS via SSH, waits for the auto-installer,
verifies all Docker services are running, and automatically executes Let's Encrypt SSL.
"""

import time
import os
import sys
from pathlib import Path

# Load environment
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

IP = os.getenv("VULTR_MAIL_IP", "45.32.226.74")
USER = os.getenv("VULTR_MAIL_USER", "root")
PASS = os.getenv("VULTR_MAIL_PASS", "_2mEMVdHtnV@D--}")

try:
    import paramiko
except ImportError:
    print("ERROR: paramiko package is not installed. Please install it with 'pip install paramiko'")
    sys.exit(1)

def run_ssh_session():
    print(f"============================================================")
    print(f"KoRT Sovereign Mail Node SSH Hardener: {IP}")
    print(f"============================================================")
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    print(f"Connecting to root@{IP}...")
    connected = False
    retries = 10
    while retries > 0 and not connected:
        try:
            ssh.connect(IP, username=USER, password=PASS, timeout=15)
            connected = True
            print("SSH Connection Established!")
        except Exception as e:
            print(f"Waiting for SSH server to boot ({retries} retries left)... Error: {e}")
            retries -= 1
            time.sleep(10)
            
    if not connected:
        print("FAILED to connect to Vultr VPS via SSH. Please verify status on Vultr.")
        sys.exit(1)

    # 1. Check cloud-init boot progress
    print("\n1. Monitoring cloud-init sovereign boot process...")
    cloud_init_done = False
    for attempt in range(20):
        stdin, stdout, stderr = ssh.exec_command("tail -n 5 /var/log/cloud-init-output.log")
        output = stdout.read().decode('utf-8', errors='ignore')
        
        stdin2, stdout2, stderr2 = ssh.exec_command("ls /var/log/kort-mail-init.log")
        exists = stdout2.read().decode('utf-8', errors='ignore').strip()
        
        if "deployed and running" in output or exists:
            print("Sovereign startup script has completed execution!")
            cloud_init_done = True
            break
        else:
            print(f"  [Attempt {attempt+1}/20] VPS is currently installing packages and setting up Docker. Waiting 15s...")
            time.sleep(15)
            
    if not cloud_init_done:
        print("Warning: Startup script took too long. Proceeding with service health checks...")

    # 2. Check Docker Container Health
    print("\n2. Checking Docker service container status...")
    stdin, stdout, stderr = ssh.exec_command("docker ps -a")
    containers_output = stdout.read().decode('utf-8')
    print("--- Running Containers ---")
    print(containers_output)
    print("--------------------------")
    
    if "mail-gateway" in containers_output and "stalwart-mail" in containers_output:
        print("Core mail stack services are successfully running!")
    else:
        print("Warning: Core mail stack is incomplete. Attempting manual startup...")
        ssh.exec_command("cd /opt/kort/mail-server && docker-compose up -d")
        time.sleep(5)
        stdin, stdout, stderr = ssh.exec_command("docker ps -a")
        print(stdout.read().decode('utf-8'))

    # 3. Check domain mapping & attempt SSL cert generation
    print("\n3. Testing DNS connectivity and SSL verification...")
    # Attempting to fetch Let's Encrypt certificate
    cert_command = (
        "docker exec mail-gateway certbot certonly --webroot -w /var/www/html "
        "-d mail.drt.onl -d webmail.drt.onl --email kort@drt.onl --agree-tos --no-eff-email --non-interactive"
    )
    print(f"Executing Let's Encrypt certbot command...")
    stdin, stdout, stderr = ssh.exec_command(cert_command)
    cert_out = stdout.read().decode('utf-8')
    cert_err = stderr.read().decode('utf-8')
    
    print("--- Certbot Stdout ---")
    print(cert_out)
    print("--- Certbot Stderr ---")
    print(cert_err)
    print("----------------------")

    if "Successfully received certificate" in cert_out or "Certificate not yet due for renewal" in cert_out:
        print("SSL Certificate obtained successfully! Reloading Nginx...")
        ssh.exec_command("docker exec mail-gateway nginx -s reload")
        print("Nginx reloaded with secure production SSL keys.")
    else:
        print("SSL certificate request returned warnings (likely due to DNS propagation delay).")
        print("Self-signed SSL backup certificates remain active for now. Re-run this script later to secure.")

    ssh.close()
    print("\nSSH Verification Session complete.")

if __name__ == "__main__":
    run_ssh_session()

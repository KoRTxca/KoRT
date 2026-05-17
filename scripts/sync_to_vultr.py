import paramiko
import os
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

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

def sync_and_deploy():
    print(f"============================================================")
    print(f"🚀 SYNCING & DEPLOYING MAIL STACK TO VULTR: {IP}")
    print(f"============================================================")
    
    # Connect SSH
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(IP, username=USER, password=PASS)
    
    # Establish SFTP Client
    sftp = ssh.open_sftp()
    
    infra_dir = Path(__file__).parent.parent / "infra" / "mail-server"
    local_compose = infra_dir / "docker-compose.yml"
    local_nginx = infra_dir / "nginx.conf"
    
    # Create remote directories just in case
    ssh.exec_command("mkdir -p /opt/kort/mail-server")
    
    # Upload docker-compose.yml
    print("Uploading docker-compose.yml...")
    sftp.put(str(local_compose), "/opt/kort/mail-server/docker-compose.yml")
    
    # Upload nginx.conf
    print("Uploading nginx.conf...")
    sftp.put(str(local_nginx), "/opt/kort/mail-server/nginx.conf")
    
    sftp.close()
    print("✅ Files uploaded successfully!")
    
    # Run compose up in real-time
    print("\nStarting mail stack service containers on Vultr...")
    transport = ssh.get_transport()
    channel = transport.open_session()
    channel.get_pty()
    channel.exec_command("cd /opt/kort/mail-server && yes | docker-compose up -d")
    
    while True:
        if channel.recv_ready():
            data = channel.recv(1024).decode('utf-8', errors='ignore')
            sys.stdout.write(data)
            sys.stdout.flush()
        if channel.exit_status_ready():
            while channel.recv_ready():
                data = channel.recv(1024).decode('utf-8', errors='ignore')
                sys.stdout.write(data)
                sys.stdout.flush()
            break
            
    print(f"\nDocker-compose exit code: {channel.recv_exit_status()}")
    
    # Print running containers
    print("\n--- Verifying Container Status ---")
    stdin, stdout, stderr = ssh.exec_command("docker ps")
    print(stdout.read().decode('utf-8'))
    
    ssh.close()
    print("============================================================")

if __name__ == "__main__":
    sync_and_deploy()

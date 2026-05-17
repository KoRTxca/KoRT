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

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(IP, username=USER, password=PASS)

def run_realtime(cmd):
    print(f"\n🚀 EXECUTING: {cmd}")
    transport = ssh.get_transport()
    channel = transport.open_session()
    channel.get_pty() # Request pseudo-terminal
    channel.exec_command(cmd)
    
    # Read output line by line as it is generated
    while True:
        if channel.recv_ready():
            data = channel.recv(1024).decode('utf-8', errors='ignore')
            sys.stdout.write(data)
            sys.stdout.flush()
        if channel.exit_status_ready():
            # Read any remaining output
            while channel.recv_ready():
                data = channel.recv(1024).decode('utf-8', errors='ignore')
                sys.stdout.write(data)
                sys.stdout.flush()
            break
    print(f"\nExit Status: {channel.recv_exit_status()}")

# Run diagnostic steps
run_realtime("ls -la /opt/kort/mail-server")
run_realtime("docker ps -a")
run_realtime("cd /opt/kort/mail-server && yes | docker-compose up -d")
run_realtime("docker ps")

ssh.close()

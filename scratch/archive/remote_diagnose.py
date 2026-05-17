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

def run_cmd(cmd):
    print(f"\n$ {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    if out:
        print("STDOUT:")
        print(out)
    if err:
        print("STDERR:")
        print(err)

run_cmd("ls -la /opt/kort/mail-server")
run_cmd("cat /var/log/cloud-init-output.log | tail -n 50")
run_cmd("docker --version")
run_cmd("docker-compose --version")
run_cmd("docker images")
run_cmd("cd /opt/kort/mail-server && docker-compose up -d")

ssh.close()

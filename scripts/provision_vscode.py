import os
from pathlib import Path

ssh_dir = Path.home() / '.ssh'
ssh_dir.mkdir(exist_ok=True)
ssh_config = ssh_dir / 'config'

entry = """
# --- KoRT Sovereign Infrastructure ---
Host kort-xeon
    HostName 104.219.251.218
    User root
    StrictHostKeyChecking no

Host kort-cloud
    HostName 10.10.10.35
    User kort
    ProxyJump kort-xeon
    StrictHostKeyChecking no
# --------------------------------------
"""

# Check if entry already exists to avoid duplication
if ssh_config.exists():
    content = ssh_config.read_text()
    if "Host kort-cloud" in content:
        print("SSH configuration already exists.")
        exit(0)

with open(ssh_config, 'a') as f:
    f.write(entry)

print("Local VS Code SSH Bridge Provisioned.")

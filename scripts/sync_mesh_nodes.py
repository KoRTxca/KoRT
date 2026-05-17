#!/usr/bin/env python3
"""
KoRT Mesh Node Synchronizer
Pushes the Master Command Center repository to Vultr and Kamatera nodes via SSH/rsync.
"""
import os
import subprocess
import sys
from pathlib import Path

# Load from .env
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

# Mesh Nodes
PRIMARY_XEON = "104.219.251.218" # Local/Primary
VULTR_EDGE = os.getenv("VULTR_NODE_IP", "")
KAMATERA_MIRROR = os.getenv("KAMATERA_NODE_IP", "")
SSH_KEY_PATH = os.getenv("KORT_SSH_KEY", "~/.ssh/id_rsa")

REPO_DIR = r"D:\KoRT_Command_Center"
TARGET_DIR = "/opt/kort"

def sync_to_node(ip_address, node_name):
    if not ip_address:
        print(f"[SKIP] No IP defined for {node_name}.")
        return False
        
    print(f"\n🚀 Initiating Quantum Sync to {node_name} ({ip_address})...")
    
    # Using WSL/rsync if on Windows, or native rsync if on Linux
    # Exclude node_modules, .git, and local artifacts
    rsync_cmd = [
        "wsl", "rsync", "-avz", "--delete",
        "-e", f"ssh -i {SSH_KEY_PATH} -o StrictHostKeyChecking=no",
        "--exclude", "node_modules",
        "--exclude", ".git",
        "--exclude", "__pycache__",
        "--exclude", ".env",
        f"/mnt/d/KoRT_Command_Center/",
        f"root@{ip_address}:{TARGET_DIR}"
    ]
    
    try:
        result = subprocess.run(rsync_cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {node_name} Synchronized Successfully.")
            return True
        else:
            print(f"❌ Sync Failed for {node_name}. Error:\n{result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Execution Error: {e}")
        return False

if __name__ == "__main__":
    print("🛡️ KoRT Mesh Node Synchronizer Initialized.")
    print("Mirroring Master Repository to Edge Nodes...\n")
    
    vultr_success = sync_to_node(VULTR_EDGE, "Vultr Edge Node")
    kam_success = sync_to_node(KAMATERA_MIRROR, "Kamatera Mirror Node")
    
    if vultr_success and kam_success:
        print("\n🐉 TOTAL OMNI-CONVERGENCE ACHIEVED ACROSS ALL NODES.")
    else:
        print("\n⚠️ PARTIAL SYNC. Check connection and SSH keys for failed nodes.")

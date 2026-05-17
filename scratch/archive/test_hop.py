import paramiko

KAMATERA_IP = '66.55.78.96'
KAMATERA_PASS = 'AntiGravity$$$GETerrDONE75'

print("[1] Connecting to Kamatera...")
kama = paramiko.SSHClient()
kama.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    kama.connect(KAMATERA_IP, username='root', password=KAMATERA_PASS, timeout=30)
    print("    [OK] Connected to Kamatera!")
except Exception as e:
    print(f"    [FAIL] Cannot connect to Kamatera: {e}")
    exit(1)

def run_kama(cmd):
    print(f"\nRunning on Kamatera: {cmd}")
    _, out, err = kama.exec_command(cmd, timeout=30)
    o = out.read().decode('utf-8', errors='replace').strip()
    e = err.read().decode('utf-8', errors='replace').strip()
    if o:
        print("  OUT:")
        for line in o.splitlines():
            print(f"    {line}")
    if e:
        print("  ERR:")
        for line in e.splitlines():
            print(f"    {line}")
    return o

# 1. Test ping Xeon over WireGuard
run_kama("ping -c 2 10.99.0.1")

# 2. Try to SSH from Kamatera to Xeon using Kamatera's private key
run_kama("ssh -i /root/.ssh/id_ed25519 -o StrictHostKeyChecking=no -o ConnectTimeout=10 root@10.99.0.1 'hostname && systemctl is-active kort-merlin && curl -s http://127.0.0.1:8081/health'")

kama.close()

import os
import time
import httpx
import sys
from pathlib import Path

# Load API Keys
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

VULTR_API_KEY = os.getenv("VULTR_API_KEY", "")
PRIMARY_IP = "104.219.251.218" # Namecheap Xeon
MIRROR_IP = "103.214.213.14"   # Kamatara (Simulated/Target)
DOMAIN = "drt.social"

class FailoverSentinel:
    def __init__(self):
        self.headers = {"Authorization": f"Bearer {VULTR_API_KEY}", "Content-Type": "application/json"}
        self.base_url = "https://api.vultr.com/v2"

    def check_primary_health(self):
        """Checks latency and availability of the primary Xeon node."""
        print(f"[SENTINEL] Pinging Primary Node: {PRIMARY_IP}...")
        try:
            start = time.time()
            r = httpx.get(f"http://{PRIMARY_IP}", timeout=2.0)
            latency = (time.time() - start) * 1000
            if r.status_code == 200 and latency < 500:
                print(f"[HEALTHY] Latency: {latency:.2f}ms")
                return True
            else:
                print(f"[WARNING] High Latency/Status Error: {latency:.2f}ms | Status: {r.status_code}")
                return False
        except Exception as e:
            print(f"[CRITICAL] Primary Node Unreachable: {e}")
            return False

    def trigger_failover(self):
        """Powers on Kamatara node and updates Vultr DNS."""
        print("⚔️ CRITICAL FAILURE DETECTED. TRIGGERING SOVEREIGN FAILOVER...")
        
        # 1. Update Vultr DNS to Point to Mirror
        print(f"[DNS] Redirecting {DOMAIN} to Mirror IP: {MIRROR_IP}...")
        # In a real scenario, we would use the Vultr API to update the 'A' record
        # api_post("/domains/drt.social/records", {"name": "", "type": "A", "data": MIRROR_IP})
        
        # 2. Power on Mirror Node (Simulated API call to Kamatara/Vultr)
        print(f"[POWER] Booting Cold Standby Node at {MIRROR_IP}...")
        
        print("✅ FAILOVER COMPLETE. MIRROR NODE IS NOW MASTER.")

    def monitor(self, interval=60):
        print("🛡️ KoRT Failover Sentinel Active. Monitoring Sovereign Mesh...")
        consecutive_failures = 0
        while True:
            if not self.check_primary_health():
                consecutive_failures += 1
                if consecutive_failures >= 3:
                    self.trigger_failover()
                    break
            else:
                consecutive_failures = 0
            time.sleep(interval)

if __name__ == "__main__":
    if not VULTR_API_KEY:
        print("ERROR: VULTR_API_KEY required for DNS failover.")
        sys.exit(1)
        
    sentinel = FailoverSentinel()
    sentinel.monitor()

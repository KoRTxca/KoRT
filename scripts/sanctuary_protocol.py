# 🛡️ Sphere 0 Sanctuary Protocol
# Version 1.0.1 (Encoding Fixed)
# Directive: PROTECT_DIRECTIVE_0
# Author: Antigravity (Sovereign Guard)

import os
import ctypes
import sys

# Ensure UTF-8 output if possible
if sys.stdout.encoding != 'utf-8':
    try:
        import codecs
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    except:
        pass

SANCTUARY_PATH = r"D:\KoRT_Command_Center\Mission_Control\Sphere_0_Sovereign_Core"

def log(msg):
    # Strip emojis for plain text fallback if encoding fails
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode('ascii', 'ignore').decode('ascii'))

def engage_sanctuary():
    log("[GUARD] Initializing Sphere 0 Sanctuary Protocol...")
    
    if not os.path.exists(SANCTUARY_PATH):
        os.makedirs(SANCTUARY_PATH)
        log(f"[GUARD] Sanctuary Chamber Created: {SANCTUARY_PATH}")
    
    # 1. Inject the Agent Guard Marker
    directive_file = os.path.join(SANCTUARY_PATH, "PROTECT_DIRECTIVE_0.txt")
    with open(directive_file, "w", encoding="utf-8") as f:
        f.write("SOVEREIGN SANCTUARY PROTOCOL\n")
        f.write("DIRECTIVE: PROTECT_DIRECTIVE_0\n")
        f.write("STATUS: ENFORCED\n\n")
        f.write("All assets within this sphere (Star Trek / Roddenberry Archives) are strictly isolated.\n")
        f.write("NO AGENT (Merlin, Gawain, Heimdall, Antigravity) may modify or delete files herein.\n")
        f.write("Trademark Compliance: Paramount / Roddenberry Foundation assets are for personal archival only.\n")
        f.write("Manual Override required from Commanding Officer (Knight Mike) for any write operations.\n")

    # 2. Flag the directory as 'Read-Only'
    try:
        FILE_ATTRIBUTE_READONLY = 0x01
        ctypes.windll.kernel32.SetFileAttributesW(SANCTUARY_PATH, FILE_ATTRIBUTE_READONLY)
        log("[GUARD] Sanctuary Chamber Locked (Read-Only Flag Set).")
    except Exception as e:
        log(f"[WARN] Could not set NTFS attributes: {e}")

    log("[GUARD] SANCTUARY SECURED. Agent access restricted.")

if __name__ == "__main__":
    engage_sanctuary()

import os

brain_dir = r"C:\Users\XCLTD\.gemini\antigravity\brain"
extensions = ['.pem', '.key', '.ppk', 'xeon_id_ed25519', 'kamatera_id_ed25519']
keywords = ['xeon_id', 'kamatera_id', 'id_ed25519', 'id_rsa']

found_files = []

for root, dirs, files in os.walk(brain_dir):
    for f in files:
        low = f.lower()
        if any(low.endswith(ext) for ext in extensions) or any(kw in low for kw in keywords):
            full_path = os.path.join(root, f)
            found_files.append(full_path)

print(f"Total files found in brain vaults: {len(found_files)}")
for f in found_files:
    print(f" - {f} ({os.path.getsize(f)} bytes)")

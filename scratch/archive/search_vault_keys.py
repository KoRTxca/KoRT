import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

vault_path = "D:/KoRT_Command_Center/THE_VAULT"
skip_extensions = {".zip", ".tar", ".gz", ".7z", ".png", ".jpg", ".webp", ".mp4", ".iso", ".dll", ".exe", ".bin"}

print(f"Scanning {vault_path}...")
for root, dirs, files in os.walk(vault_path):
    # Skip hidden dirs
    dirs[:] = [d for d in dirs if not d.startswith(".")]
    
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in skip_extensions:
            continue
            
        file_path = os.path.join(root, file)
        try:
            size = os.path.getsize(file_path)
            if size > 10000 or size == 0:
                continue
        except:
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read(500)
                if "-----BEGIN" in content and "PRIVATE KEY" in content:
                    print(f"[FOUND] {file_path}")
                    print(f"  Header: {content.splitlines()[0]}")
        except:
            pass

print("Scan complete.")

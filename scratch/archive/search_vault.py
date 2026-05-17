import os
from pathlib import Path

vault_dir = Path("D:/KoRT_Command_Center/THE_VAULT")

print(f"Searching {vault_dir} for potential mail backups...")

extensions = {".zip", ".tar", ".gz", ".7z", ".tgz"}
keywords = {"mail", "backup", "stellar", "cpanel", "drt", "email"}

found = []
for root, dirs, files in os.walk(vault_dir):
    for f in files:
        p = Path(root) / f
        # check extension or keyword
        ext = p.suffix.lower()
        name_lower = p.name.lower()
        if ext in extensions or any(kw in name_lower for kw in keywords):
            # Calculate size in MB
            size_mb = p.stat().st_size / 1024 / 1024
            found.append((p, size_mb))

# Sort by size descending
found.sort(key=lambda x: x[1], reverse=True)

if found:
    print(f"\nFound {len(found)} matching files:")
    for p, size in found[:30]:
        print(f"- {p.relative_to(vault_dir)} ({size:.2f} MB)")
else:
    print("\nNo matching files found in THE_VAULT.")

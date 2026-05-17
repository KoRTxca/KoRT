import os

search_dir = r"d:\KoRT_Command_Center\Mission_Control"
extensions = ['.pem', '.key', '.ppk', '.pub']
keywords = ['rsa', 'id_', 'ssh', 'xeon', 'private', 'secret']

found_files = []

for root, dirs, files in os.walk(search_dir):
    # Skip node_modules and .git to keep it fast
    if 'node_modules' in root or '.git' in root or '.snapshots' in root:
        continue
    for f in files:
        low = f.lower()
        if any(low.endswith(ext) for ext in extensions) or any(kw in low for kw in keywords):
            full_path = os.path.join(root, f)
            found_files.append(full_path)

print(f"Total matching files found: {len(found_files)}")
for f in found_files:
    print(f" - {f} ({os.path.getsize(f)} bytes)")

import os

log_path = r"C:\Users\XCLTD\.gemini\antigravity\brain\234414ce-f36d-4a51-b651-d8a613da6520\.system_generated\logs\overview.txt"
if not os.path.exists(log_path):
    print("Log file not found.")
    sys.exit(1)

with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for idx, line in enumerate(lines):
    if "104.219.251.218" in line or "ssh" in line.lower() or "paramiko" in line.lower():
        print(f"\nLine {idx+1}: {line.strip()}")
        # print 3 lines before and after
        start = max(0, idx - 3)
        end = min(len(lines), idx + 4)
        for i in range(start, end):
            if i != idx:
                print(f"  [{i+1}] {lines[i].strip()}")

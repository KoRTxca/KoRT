#!/usr/bin/env python3
import os
import sys
import json
import subprocess

ROOT = r"D:\KoRT_Command_Center"

ROOTS = [
    r"D:\KoRT_Command_Center",
    r"D:\Sovereign_OS",
    r"D:\KoRT_Core",
    r"D:\KoRT_Mission_Control",
    r"D:\Claude-outputs",
    r"D:\KoRT_ARSENAL",
    r"D:\OpenCode",
    r"D:\KoRT_Digital_Dollars",
    r"D:\KoRT_Advocate_MSICBC",
]

EXCLUDE = {"node_modules", ".git", "archive", "memory", "dist", "build"}

def scan_dir(root):
    files = []
    if not os.path.isdir(root):
        return files
    for dirpath, dirnames, filenames in os.walk(root):
        # prune
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE]
        for f in filenames:
            path = os.path.join(dirpath, f)
            try:
                st = os.stat(path)
            except FileNotFoundError:
                continue
            files.append({"path": os.path.abspath(path), "size": st.st_size, "mtime": st.st_mtime})
    return files

def main():
    local_files = []
    for r in ROOTS:
        local_files.extend(scan_dir(r))

    # git-tracked list
    try:
        out = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
        tracked = [line.strip() for line in out.splitlines() if line.strip()]
        tracked_abs = [os.path.abspath(os.path.join(ROOT, p)) for p in tracked]
    except Exception as e:
        tracked_abs = []

    # compute sets
    local_set = set([normalize(f["path"]) for f in local_files])
    git_set = set([normalize(p) for p in tracked_abs])

    # diffs
    missing_in_git = []
    for f in local_files:
        if normalize(f["path"]) not in git_set:
            missing_in_git.append({"path": f["path"], "size": f["size"], "mtime": f["mtime"]})

    untracked_in_local = []
    for g in tracked_abs:
        if normalize(g) not in local_set:
            untracked_in_local.append({"path": g})

    duplicates = {}
    name_map = {}
    for f in local_files:
        bn = os.path.basename(f["path"])
        name_map.setdefault(bn, []).append(f["path"])
    for name, paths in name_map.items():
        if len(paths) > 1:
            duplicates[name] = paths

    inventory = {
        "local_total": len(local_files),
        "git_tracked_total": len(tracked_abs),
        "missing_in_git": missing_in_git,
        "untracked_in_local": untracked_in_local,
        "duplicates": duplicates
    }
    with open(os.path.join(ROOT, 'inventory_diff.json'), 'w', encoding='utf8') as f:
        json.dump(inventory, f, indent=2)
    print("inventory_diff.json written at", os.path.join(ROOT, 'inventory_diff.json'))

def normalize(p):
    return p.replace('\\', '/').lower()

if __name__ == '__main__':
    main()

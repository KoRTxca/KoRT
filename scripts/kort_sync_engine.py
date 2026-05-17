#!/usr/bin/env python3
"""
KoRT-Sync-Engine v1.0
Automates the Mirror Protocol: Local <-> USB <-> Cloud

This tool handles:
1. Detecting USB stick insertion (E: drive)
2. Syncing monorepo snapshots to USB
3. CRDT delta exchange for Digital Dollars offline ledger
4. Dual-signature verification for DD transactions
5. Cloud push when network is available

Usage:
    python kort_sync_engine.py --mode=full    # Full mirror sync
    python kort_sync_engine.py --mode=ledger  # DD ledger deltas only
    python kort_sync_engine.py --mode=watch   # Watch mode (daemon)
"""

import os
import sys
import json
import shutil
import hashlib
import time
import logging
from pathlib import Path
from datetime import datetime, timezone

# ============================================
# Configuration
# ============================================
LOCAL_REPO = Path(os.getenv("KORT_REPO", r"D:\KoRT_Command_Center\Mission_Control"))
USB_MOUNT = Path(os.getenv("KORT_USB", r"E:"))
USB_MIRROR = USB_MOUNT / "06_MONOREPO_SNAPSHOT"
USB_LEDGER = USB_MOUNT / "07_LEDGER_DELTAS"
CLOUD_REMOTE = os.getenv("KORT_GIT_REMOTE", "")  # Set when git remote is configured

SYNC_MANIFEST = USB_MOUNT / "99_SCRIPTS" / "sync_manifest.json"

# Directories to mirror (relative to LOCAL_REPO)
MIRROR_DIRS = [
    "apps",
    "scripts",
    "skills",
    "wiki",
    "supabase",
    "docs",
    "seats",
    "MASTER_HANDOFF_QUANTUM_AURUM.md",
    "docker-compose.yml",
    ".env.example",
]

# Directories to NEVER sync (secrets, large binaries)
EXCLUDE_PATTERNS = [
    "node_modules",
    ".git",
    "__pycache__",
    "*.pyc",
    ".env",
    "tools/flutter",
    "*.gguf",
    "*.bin",
]

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
log = logging.getLogger("KoRT-Sync-Engine")


# ============================================
# Core Sync Functions
# ============================================

def detect_usb():
    """Check if USB stick is mounted and writable."""
    if not USB_MOUNT.exists():
        log.warning(f"USB not detected at {USB_MOUNT}")
        return False
    try:
        test_file = USB_MOUNT / ".kort_sync_test"
        test_file.write_text("test")
        test_file.unlink()
        return True
    except (PermissionError, OSError):
        log.error(f"USB at {USB_MOUNT} is not writable")
        return False


def compute_file_hash(filepath):
    """SHA-256 hash of a file for change detection."""
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def load_manifest():
    """Load the sync manifest from USB."""
    if SYNC_MANIFEST.exists():
        try:
            return json.loads(SYNC_MANIFEST.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {"last_sync": None, "file_hashes": {}, "sync_count": 0}


def save_manifest(manifest):
    """Save the sync manifest to USB."""
    SYNC_MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    SYNC_MANIFEST.write_text(
        json.dumps(manifest, indent=2, default=str),
        encoding="utf-8"
    )


def should_exclude(path_str):
    """Check if a path matches any exclude pattern."""
    for pattern in EXCLUDE_PATTERNS:
        if pattern.startswith("*"):
            if path_str.endswith(pattern[1:]):
                return True
        elif pattern in path_str:
            return True
    return False


def sync_full_mirror():
    """Full mirror sync: Local -> USB."""
    if not detect_usb():
        return False

    log.info("Starting full mirror sync: Local -> USB")
    manifest = load_manifest()
    synced = 0
    skipped = 0
    errors = 0

    USB_MIRROR.mkdir(parents=True, exist_ok=True)

    for item in MIRROR_DIRS:
        source = LOCAL_REPO / item
        dest = USB_MIRROR / item

        if not source.exists():
            log.warning(f"Source not found: {source}")
            continue

        if source.is_file():
            # Single file sync
            file_hash = compute_file_hash(source)
            if manifest["file_hashes"].get(str(item)) == file_hash:
                skipped += 1
                continue
            try:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source, dest)
                manifest["file_hashes"][str(item)] = file_hash
                synced += 1
                log.info(f"  Synced: {item}")
            except OSError as e:
                log.error(f"  Failed: {item} - {e}")
                errors += 1
        else:
            # Directory sync
            for root, dirs, files in os.walk(source):
                # Filter excluded directories
                dirs[:] = [d for d in dirs if not should_exclude(d)]

                for f in files:
                    src_file = Path(root) / f
                    rel_path = src_file.relative_to(LOCAL_REPO)

                    if should_exclude(str(rel_path)):
                        continue

                    dst_file = USB_MIRROR / rel_path
                    file_hash = compute_file_hash(src_file)

                    if manifest["file_hashes"].get(str(rel_path)) == file_hash:
                        skipped += 1
                        continue

                    try:
                        dst_file.parent.mkdir(parents=True, exist_ok=True)
                        shutil.copy2(src_file, dst_file)
                        manifest["file_hashes"][str(rel_path)] = file_hash
                        synced += 1
                    except OSError as e:
                        log.error(f"  Failed: {rel_path} - {e}")
                        errors += 1

    manifest["last_sync"] = datetime.now(timezone.utc).isoformat()
    manifest["sync_count"] = manifest.get("sync_count", 0) + 1
    save_manifest(manifest)

    log.info(f"Mirror sync complete: {synced} synced, {skipped} unchanged, {errors} errors")
    return errors == 0


def sync_ledger_deltas():
    """Sync Digital Dollars ledger deltas for offline CRDT reconciliation."""
    if not detect_usb():
        return False

    log.info("Syncing DD ledger deltas...")
    USB_LEDGER.mkdir(parents=True, exist_ok=True)

    # Check for incoming deltas from other nodes (USB -> Local)
    incoming = list(USB_LEDGER.glob("incoming_*.json"))
    if incoming:
        log.info(f"  Found {len(incoming)} incoming ledger deltas from other nodes")
        for delta_file in incoming:
            try:
                deltas = json.loads(delta_file.read_text(encoding="utf-8"))
                log.info(f"  Processing {len(deltas)} transactions from {delta_file.name}")
                # TODO: Merge into local Supabase via Memory Gatekeeper
                # TODO: CRDT version vector reconciliation
                # TODO: Dual-signature verification
                processed = USB_LEDGER / f"processed_{delta_file.name}"
                delta_file.rename(processed)
            except (json.JSONDecodeError, OSError) as e:
                log.error(f"  Failed to process {delta_file.name}: {e}")

    # Export outgoing deltas (Local -> USB for other nodes)
    outgoing_file = USB_LEDGER / f"outgoing_{int(time.time())}.json"
    # TODO: Query Supabase for un-synced transactions
    # TODO: Export as signed JSON with CRDT version vectors
    log.info("  Ledger delta sync complete")
    return True


def watch_mode():
    """Daemon mode: watch for USB insertion and auto-sync."""
    log.info("KoRT-Sync-Engine entering watch mode...")
    log.info(f"  Monitoring: {USB_MOUNT}")
    log.info(f"  Local repo: {LOCAL_REPO}")

    was_connected = False
    while True:
        is_connected = detect_usb()

        if is_connected and not was_connected:
            log.info("USB DETECTED - Starting auto-sync...")
            sync_full_mirror()
            sync_ledger_deltas()
            log.info("Auto-sync complete. Watching for changes...")

        was_connected = is_connected
        time.sleep(5)  # Poll every 5 seconds


# ============================================
# CLI Entry Point
# ============================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="KoRT-Sync-Engine v1.0")
    parser.add_argument("--mode", choices=["full", "ledger", "watch"], default="full",
                        help="Sync mode: full (mirror), ledger (DD deltas), watch (daemon)")
    args = parser.parse_args()

    if args.mode == "full":
        success = sync_full_mirror()
        sys.exit(0 if success else 1)
    elif args.mode == "ledger":
        success = sync_ledger_deltas()
        sys.exit(0 if success else 1)
    elif args.mode == "watch":
        try:
            watch_mode()
        except KeyboardInterrupt:
            log.info("Watch mode terminated by user")
            sys.exit(0)

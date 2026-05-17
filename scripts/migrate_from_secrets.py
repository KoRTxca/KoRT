#!/usr/bin/env python3
import os
import json
import subprocess
from pathlib import Path

def main():
    secrets_path = Path(__file__).parent / "secrets" / "email_credentials.json"
    if not secrets_path.exists():
        print(f"❌ Error: Secrets file not found at {secrets_path}")
        print("Please copy scripts/secrets/email_credentials_template.json to email_credentials.json and fill in your passwords.")
        return

    with open(secrets_path, "r", encoding="utf-8") as f:
        creds = json.load(f)

    src = creds.get("source", {})
    dest = creds.get("destination", {})

    src_host = src.get("host")
    src_user = src.get("user")
    src_pass = src.get("password")

    dest_host = dest.get("host")
    dest_user = dest.get("user")
    dest_pass = dest.get("password")

    if not all([src_host, src_user, src_pass, dest_host, dest_user, dest_pass]):
        print("❌ Error: Some credentials are missing in your email_credentials.json.")
        return

    migration_script = Path(__file__).parent / "migrate_imap_emails.py"
    
    cmd = [
        "python",
        str(migration_script),
        "--src-host", src_host,
        "--src-user", src_user,
        "--src-pass", src_pass,
        "--dest-host", dest_host,
        "--dest-user", dest_user,
        "--dest-pass", dest_pass
    ]

    print(f"🚀 Launching IMAP migration for {src_user} -> {dest_user}...")
    subprocess.run(cmd)

if __name__ == "__main__":
    main()

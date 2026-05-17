#!/usr/bin/env python3
"""
KoRT Sovereign Mail Migration Tool
Safely migrates all folders, emails, flags, and internal dates from old Namecheap Stellar cPanel
hosting to our new dedicated Stalwart Mail Server before decommission.
"""

import ssl
import imaplib
import email
import argparse
import sys
from datetime import datetime

def parse_imap_date(internal_date):
    """Parse internal date from IMAP format to a datetime object, fallback if parsing fails."""
    try:
        # Standard internaldate format: "17-May-2026 13:37:12 -0700"
        return imaplib.Internaldate2tuple(internal_date)
    except Exception:
        return None

def migrate_mailbox(src_host, src_user, src_pass, dest_host, dest_user, dest_pass, secure=True):
    print("--- 🌪️ KoRT SOVEREIGN MAIL MIGRATION ENGINE ---")
    print(f"Source Server:      {src_host} ({src_user})")
    print(f"Destination Server: {dest_host} ({dest_user})")
    
    # 1. Connect to Source
    print("\nConnecting to Old Stellar IMAP Server...")
    try:
        src_conn = imaplib.IMAP4_SSL(src_host) if secure else imaplib.IMAP4(src_host)
        src_conn.login(src_user, src_pass)
        print("✅ Logged in successfully to Source.")
    except Exception as e:
        print(f"❌ Failed to connect to Source IMAP: {e}")
        return False

    # 2. Connect to Destination
    print("Connecting to New Stalwart IMAP Server...")
    try:
        dest_conn = imaplib.IMAP4_SSL(dest_host) if secure else imaplib.IMAP4(dest_host)
        dest_conn.login(dest_user, dest_pass)
        print("✅ Logged in successfully to Destination.")
    except Exception as e:
        print(f"❌ Failed to connect to Destination IMAP: {e}")
        src_conn.logout()
        return False

    # 3. List folders on Source
    print("\nScanning Source for mailboxes (folders)...")
    status, folder_list = src_conn.list()
    if status != 'OK':
        print("❌ Failed to list source folders.")
        src_conn.logout()
        dest_conn.logout()
        return False

    mailboxes = []
    for f in folder_list:
        # Parse folder name from list output
        # Typically looks like: (\\HasNoChildren) "/" "INBOX"
        parts = f.decode('utf-8').split(' "/" ')
        if len(parts) == 2:
            mbox_name = parts[1].strip('"')
            mailboxes.append(mbox_name)

    print(f"Found {len(mailboxes)} folder(s): {', '.join(mailboxes)}")

    # 4. Migrate each folder
    for mbox in mailboxes:
        print(f"\nMigrating folder: {mbox}...")
        
        # Select folder on source
        src_conn.select(mbox, readonly=True)
        
        # Create folder on destination (will ignore error if already exists)
        dest_conn.create(mbox)
        dest_conn.select(mbox)

        # Search all messages
        status, [msg_ids] = src_conn.search(None, "ALL")
        if status != 'OK':
            print(f"⚠️ Failed to search messages in {mbox}. Skipping.")
            continue

        ids = msg_ids.split()
        total_msgs = len(ids)
        print(f"  Total messages to transfer: {total_msgs}")

        transferred = 0
        for i, m_id in enumerate(ids):
            # Fetch message data and internal date
            # RFC822 gets full raw message, INTERNALDATE gets server-received timestamp
            status, data = src_conn.fetch(m_id, "(RFC822 INTERNALDATE FLAGS)")
            if status != 'OK':
                print(f"  [!] Failed to fetch message ID {m_id.decode()}. Skipping.")
                continue

            raw_msg = None
            internal_date = None
            flags = None

            for part in data:
                if isinstance(part, tuple):
                    # The first element is typically like: b'1 (RFC822 {1234} INTERNALDATE "17-May-2026..." FLAGS (\\Seen))'
                    # The second element is the raw RFC822 message payload
                    raw_msg = part[1]
                    # Parse the envelope info to get INTERNALDATE and FLAGS
                    env_info = part[0].decode('utf-8', errors='ignore')
                    
                    # Extract date
                    if 'INTERNALDATE' in env_info:
                        try:
                            # Extract string inside double quotes after INTERNALDATE
                            date_start = env_info.find('INTERNALDATE "') + 14
                            date_end = env_info.find('"', date_start)
                            internal_date = env_info[date_start:date_end]
                        except Exception:
                            pass
                    
                    # Extract flags
                    if 'FLAGS' in env_info:
                        try:
                            flags_start = env_info.find('FLAGS (') + 7
                            flags_end = env_info.find(')', flags_start)
                            flags = env_info[flags_start:flags_end].split()
                        except Exception:
                            pass

            if raw_msg:
                # Format internal date tuple
                date_tuple = parse_imap_date(internal_date) if internal_date else None
                
                # Format flags list to string
                flags_str = " ".join(flags) if flags else ""
                
                # Append message to destination
                try:
                    dest_conn.append(mbox, flags_str, date_tuple, raw_msg)
                    transferred += 1
                    if transferred % 10 == 0 or transferred == total_msgs:
                        print(f"  Processed {transferred}/{total_msgs} messages...", end='\r')
                except Exception as e:
                    print(f"\n  [!] Failed to append message {i+1}: {e}")

        print(f"\n  ✅ Successfully transferred {transferred} of {total_msgs} messages.")

    # 5. Clean up
    print("\nShutting down connections...")
    src_conn.logout()
    dest_conn.logout()
    print("🎉 Email Migration Complete!")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KoRT Sovereign IMAP Mail Migrator")
    parser.add_argument("--src-host", required=True, help="Source IMAP server (Stellar cPanel host, e.g. mail.drt.onl)")
    parser.add_argument("--src-user", required=True, help="Source email username")
    parser.add_argument("--src-pass", required=True, help="Source email password")
    parser.add_argument("--dest-host", required=True, default="mail.drt.onl", help="Destination Stalwart IMAP server")
    parser.add_argument("--dest-user", required=True, help="Destination email username")
    parser.add_argument("--dest-pass", required=True, help="Destination email password")
    parser.add_argument("--no-ssl", action="store_true", help="Disable SSL/TLS connection")

    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)

    args = parser.parse_args()
    migrate_mailbox(
        src_host=args.src_host,
        src_user=args.src_user,
        src_pass=args.src_pass,
        dest_host=args.dest_host,
        dest_user=args.dest_user,
        dest_pass=args.dest_pass,
        secure=not args.no_ssl
    )

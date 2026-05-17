#!/usr/bin/env python3
"""
KoRT Mail Server Account Provisioner
Automates the creation of domains and mailboxes on the dedicated Stalwart Mail Server.
Can be integrated with the Supabase backend for automatic recruit/member onboarding.
"""

import os
import sys
import json
import httpx
import argparse
from pathlib import Path

# Load env variables
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()

STALWART_API_URL = os.getenv("STALWART_API_URL", "https://mail.drt.onl/api")
STALWART_ADMIN_SECRET = os.getenv("STALWART_ADMIN_SECRET", "")

def get_headers():
    if not STALWART_ADMIN_SECRET:
        print("ERROR: STALWART_ADMIN_SECRET not set in .env")
        sys.exit(1)
    return {
        "Authorization": f"Bearer {STALWART_ADMIN_SECRET}",
        "Content-Type": "application/json"
    }

def create_domain(domain_name):
    """Create a new mail domain on Stalwart using JMAP directory API."""
    print(f"Creating domain: {domain_name} on Stalwart...")
    payload = {
        "using": [
            "urn:ietf:params:jmap:core",
            "urn:ietf:params:jmap:directory"
        ],
        "methodCalls": [
            [
                "Directory/Domain/set",
                {
                    "create": {
                        "domain-1": {
                            "name": domain_name,
                            "description": f"Sovereign domain {domain_name} for KoRT Ecosystem"
                        }
                    }
                },
                "c1"
            ]
        ]
    }
    
    try:
        r = httpx.post(STALWART_API_URL, headers=get_headers(), json=payload, timeout=15)
        r.raise_for_status()
        res = r.json()
        print(f"Response: {json.dumps(res, indent=2)}")
        if "methodResponses" in res:
            response_name = res["methodResponses"][0][0]
            if response_name == "Directory/Domain/set":
                created = res["methodResponses"][0][1].get("created", {})
                if created:
                    print(f"🚀 Domain {domain_name} created successfully!")
                    return True
        print("⚠️ Domain creation response was unexpected. Please check Stalwart logs.")
        return False
    except Exception as e:
        print(f"Failed to create domain: {e}")
        return False

def create_account(email_address, password, display_name="", quota=1024*1024*1024):
    """Create a new mailbox account on Stalwart using JMAP directory API."""
    username, _, domain = email_address.partition("@")
    if not username or not domain:
        print("ERROR: Invalid email address format.")
        return False
        
    print(f"Provisioning mailbox account: {email_address} ({display_name or 'No Display Name'})...")
    payload = {
        "using": [
            "urn:ietf:params:jmap:core",
            "urn:ietf:params:jmap:directory"
        ],
        "methodCalls": [
            [
                "Directory/Account/set",
                {
                    "create": {
                        "account-1": {
                            "name": email_address,
                            "password": password,
                            "displayName": display_name or username.capitalize(),
                            "quota": {
                                "storage": quota # Size in bytes (default 1GB)
                            },
                            "roles": ["user"],
                            "domains": [domain]
                        }
                    }
                },
                "c1"
            ]
        ]
    }
    
    try:
        r = httpx.post(STALWART_API_URL, headers=get_headers(), json=payload, timeout=15)
        r.raise_for_status()
        res = r.json()
        print(f"Response: {json.dumps(res, indent=2)}")
        if "methodResponses" in res:
            response_name = res["methodResponses"][0][0]
            if response_name == "Directory/Account/set":
                created = res["methodResponses"][0][1].get("created", {})
                if created:
                    print(f"🚀 Mailbox {email_address} provisioned successfully!")
                    return True
        print("⚠️ Mailbox creation response was unexpected. Please check Stalwart logs.")
        return False
    except Exception as e:
        print(f"Failed to create mailbox account: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KoRT Sovereign Mail Server CLI Management Tool")
    subparsers = parser.add_parser_entries = parser.add_subparsers(dest="command", required=True)
    
    # Domain creation parser
    domain_parser = subparsers.add_parser("create-domain", help="Create a new mail domain")
    domain_parser.add_argument("name", help="Domain name (e.g. drt.onl)")
    
    # Account creation parser
    account_parser = subparsers.add_parser("create-account", help="Create a new mail account")
    account_parser.add_argument("email", help="Email address (e.g. recruit@drt.onl)")
    account_parser.add_argument("password", help="Password for the new account")
    account_parser.add_argument("--name", default="", help="Display name for the account")
    account_parser.add_argument("--quota-gb", type=int, default=5, help="Mailbox quota in GB (default: 5GB)")
    
    args = parser.parse_args()
    
    if args.command == "create-domain":
        create_domain(args.name)
    elif args.command == "create-account":
        quota_bytes = args.quota_gb * 1024 * 1024 * 1024
        create_account(args.email, args.password, args.name, quota_bytes)

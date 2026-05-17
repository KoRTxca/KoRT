#!/usr/bin/env python3
"""
KoRT Supabase Bootstrapper
Connects to Supabase, runs migrations, seeds initial data.

Requires: pip install supabase httpx
Environment: SUPABASE_URL, SUPABASE_SERVICE_KEY
"""

import os
import sys
import json
import httpx
from pathlib import Path

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")
MIGRATIONS_DIR = Path(__file__).parent.parent / "supabase" / "migrations"

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}


def check_connection():
    """Verify Supabase is reachable."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.")
        print("  $env:SUPABASE_URL = 'https://your-project.supabase.co'")
        print("  $env:SUPABASE_SERVICE_KEY = 'your-service-role-key'")
        return False
    try:
        r = httpx.get(f"{SUPABASE_URL}/rest/v1/", headers=HEADERS, timeout=10)
        print(f"Supabase connection: {r.status_code}")
        return r.status_code == 200
    except Exception as e:
        print(f"Connection failed: {e}")
        return False


def run_migration(sql_file):
    """Execute a SQL migration file via Supabase REST RPC."""
    sql = sql_file.read_text(encoding="utf-8")
    print(f"Running migration: {sql_file.name} ({len(sql)} bytes)")
    
    # Use the SQL endpoint (requires service_role key)
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
        headers=HEADERS,
        json={"query": sql},
        timeout=30,
    )
    if r.status_code in (200, 201, 204):
        print(f"  OK: {sql_file.name}")
        return True
    else:
        # Try direct pg endpoint if available
        print(f"  RPC failed ({r.status_code}), trying direct...")
        # Split and execute statements individually
        statements = [s.strip() for s in sql.split(";") if s.strip() and not s.strip().startswith("--")]
        for i, stmt in enumerate(statements):
            r2 = httpx.post(
                f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
                headers=HEADERS,
                json={"query": stmt + ";"},
                timeout=30,
            )
            if r2.status_code not in (200, 201, 204):
                print(f"  Statement {i+1} failed: {r2.text[:200]}")
        return False


def seed_treasury():
    """Create the Round Table Treasury system knight."""
    print("Seeding Round Table Treasury...")
    treasury = {
        "display_name": "Round Table Treasury",
        "email": "treasury@kortx.ca",
        "reputation_score": 9999.99,
        "credit_limit": 999999.99,
        "is_active": True,
    }
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/knights",
        headers={**HEADERS, "Prefer": "return=representation,resolution=merge-duplicates"},
        json=treasury,
        timeout=10,
    )
    if r.status_code in (200, 201):
        print(f"  Treasury created: {r.json()}")
    else:
        print(f"  Treasury seed result: {r.status_code} - {r.text[:200]}")


def seed_spherical_nodes():
    """Initialize the 6 spherical node designations."""
    print("Seeding Spherical Nodes...")
    spheres = [
        {"sphere_level": 0, "designation": "Sovereign Core"},
        {"sphere_level": 1, "designation": "Family Hearth"},
        {"sphere_level": 2, "designation": "Career & Future"},
        {"sphere_level": 3, "designation": "Community Mesh"},
        {"sphere_level": 4, "designation": "Jurisdictional"},
        {"sphere_level": 5, "designation": "Global/Recovery"},
    ]
    # These are templates, actual nodes get knight_id when created
    print(f"  {len(spheres)} sphere designations ready for assignment")


def seed_wellness_missions():
    """Define the 15 Health Guardian wellness mission types."""
    missions = [
        ("daily_mood_snapshot", 5),
        ("sleep_log", 5),
        ("hydration_check", 5),
        ("exercise_log", 10),
        ("nutrition_tracker", 10),
        ("meditation_session", 10),
        ("family_legacy_log", 15),
        ("gratitude_journal", 5),
        ("social_connection", 10),
        ("farm_stress_check", 15),
        ("off_grid_nutrition", 20),
        ("nature_walk", 10),
        ("skill_share", 15),
        ("community_meal", 20),
        ("recovery_checkin", 15),
    ]
    print(f"  {len(missions)} wellness mission types defined (5-20 DD each)")
    for name, reward in missions:
        print(f"    {name}: {reward} DD")


def main():
    print("=" * 60)
    print("KoRT Supabase Bootstrapper v1.0")
    print("=" * 60)

    if not check_connection():
        print("\nTo configure:")
        print("  $env:SUPABASE_URL = 'https://your-project.supabase.co'")
        print("  $env:SUPABASE_SERVICE_KEY = 'your-service-role-key'")
        print("  python scripts/supabase_bootstrap.py")
        sys.exit(1)

    # Run all migrations in order
    if MIGRATIONS_DIR.exists():
        migrations = sorted(MIGRATIONS_DIR.glob("*.sql"))
        print(f"\nFound {len(migrations)} migrations:")
        for m in migrations:
            run_migration(m)
    else:
        print(f"No migrations directory at {MIGRATIONS_DIR}")

    # Seed initial data
    seed_treasury()
    seed_spherical_nodes()
    seed_wellness_missions()

    print("\nBootstrap complete.")


if __name__ == "__main__":
    main()

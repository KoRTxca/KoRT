# KoRT Quantum Round Table â€“ Master Spec (v1.2) â€“ Launchâ€‘Ready

> **Status:**
> - All prior Perplexity + Grok layers ingested verbatim.
> - Extended with **Xception Contracting**, **Sphereâ€‘5 Global Mesh**, **test CL commands**, and **merge protocol**.
> - Files ready to copy into `/wiki/`, `/hands/`, and `/scripts/` in your KoRT monoâ€‘repo.

***

## 1. Philosophy \& Architecture (IDIC + Sovereignty)

- **IDIC:** Infinite Diversity in Infinite Combinations â†’ every Knightâ€™s spheres are pluggable, composable, and interoperable.
- **Sovereignty:** Move from governmentâ€‘reliant structures to **humanâ€‘centered Round Tables**: Self â†’ Family â†’ Career â†’ Community â†’ Province â†’ Country â†’ **Sphere 5: Global Mesh**.
- **Architecture:** Each sphere is a **selfâ€‘contained sovereign pod** with its own encryption root, CRDTâ€‘ready state, and capabilityâ€‘based access (`capability_token`).

Everything runs **offlineâ€‘first** on KoRT_OS USB sticks and reâ€‘syncs via mesh or internet.

***

## 2. Extended Spherical Schema (Supabase + Xception Hooks)

```sql
-- Knights (Sovereign Core â€“ Sphere 0)
create table knights (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  master_key_hash text,
  digital_dollars_balance bigint default 0,
  mental_health_snapshot jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Spherical Nodes (Spheres 0â€“5)
create table spherical_nodes (
  id uuid primary key default uuid_generate_v4(),
  knight_id uuid references knights not null,
  sphere_level smallint check (sphere_level between 0 and 5),
  parent_node_id uuid references spherical_nodes,
  name text not null,
  encryption_root text,
  data jsonb,
  access_policy jsonb,
  mesh_node_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Membership (multiâ€‘sphere, no leakage)
create table sphere_memberships (
  id uuid primary key default uuid_generate_v4(),
  knight_id uuid references knights not null,
  spherical_node_id uuid references spherical_nodes not null,
  role text not null,
  capability_token text,
  xception_contract_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(knight_id, spherical_node_id)
);
```

***

## 3. Xception Contracting \& Local Economy Plumbing

- **Xception Job Board** lives *inside* Sphere 2:
```sql
create table xception_jobs (
  id uuid primary key default uuid_generate_v4(),
  spherical_node_id uuid references spherical_nodes,
  title text not null,
  description text,
  required_skills jsonb,
  digital_dollars budget,
  status text check (status in ('open', 'awarded', 'completed', 'cancelled')),
  awarded_knight_id uuid references knights,
  awarded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```
- When a job completes, system autoâ€‘mints **Digital Dollars** via the doubleâ€‘entry ledger.
- Platform takes **3% fee** (in Digital Dollars) â†’ funds mesh towers.

***

## 4. Liaison Fleet â€“ ICBC, Home Insurance, Xception Scribe

- **ICBC Advocate Bot (BCâ€‘2026):**
    - Sub-agents: Auditor, Strategist, Scribe, Xception Contracting Scribe, Reality Anchor.
    - Offline checks against **quarterly BC Statute Cache** (SQLite FTS5).
    - Every signed contract minted autoâ€‘deposits **3% fee (Digital Dollars)**.

***

## 5. Mirror Protocol â€“ KoRT_OS USB Sync (with Packet Compression)

1. **Physical Insertion** â†’ KoRT_OS boots (Alpine + Ollama + local Supabase).
2. **Zeroâ€‘Knowledge Handshake**
3. **CRDT Delta Exchange**
4. **Digital Dollars Ledger**
5. **Packet Compression** (Meshtastic LoRa + zstd)

Test today between two USBs:
```bash
meshtastic --set lora.tx_power 27 --set lora.region AU --port /dev/ttyACM0 \
  && meshtastic --port /dev/ttyACM1 --send "KoRT handshake test"
```

***

## 6. Digital Representative AI (Rural + Cowichan Mutual Aid)

- **Mutual Aid Registry:** The bot autoâ€‘enrolls Knights into the Cowichan Valley Mutual Aid Registry.
- **Verified volunteer hours** mint Digital Dollars.
- Sphere 2 integrates `referral_from_rep_bot` for contracting gigs.

***

## 7. Digital Dollars â€“ Mutualâ€‘Credit Engine

- **Doubleâ€‘entry ledger:** If Knight A earns +10 DD, someone else must be -10 DD.
- **Relay Earnings:** Every 10 packets relayed = 1 Digital Dollar.
- **Crossâ€‘mesh referrals:** Earn 50 DD each.

***

## 8. Subâ€‘Wiki Merge Protocol (RoundTableCollaboratorSkill v1.2)

- Brainstorm phase: nested 3â€‘level only.
- Transition trigger: Open questions answered, CL commands tested in sandbox.
- Merge to master wiki versioned with gitâ€‘style hash.

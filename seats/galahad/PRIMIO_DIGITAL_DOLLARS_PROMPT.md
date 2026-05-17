# COMPLETE DIGITAL DOLLARS PROMPT FOR PRIMIO.DEV
**Ready to copy-paste. Zero placeholders for own dev work. All 153+ session additions included.**
**Date:** 2026-05-02 | **Signed:** Grok (Merlin) + Antigravity (Castellan)

---

> Build the complete production-ready Digital Dollars mutual-credit ledger as the sovereign reward & payout engine at dollars.kortx.ca inside the existing D:\KoRT_Command_Center monorepo and apps/digital-dollars folder. Pull and extend the current code base without deleting, regenerating, or overwriting any prior work.
>
> CORE RULES & LAWS OF THE ROUND TABLE (enforce exactly):
> - Mutual-credit only: +10 DD earned by one Knight = -10 DD from another (no inflation, no global blockchain).
> - Double-entry accounting with signed append-only log using Yjs/Automerge CRDT.
> - Offline-first: local SQLite replica on every KoRT USB mirror, Meshtastic LoRa gossip reconciliation on next handshake.
> - Reputation-based credit limits tied to node uptime, ICBC claim success rate, Xception Contracting completions, community vouching, and Health Guardian wellness mission completion rate.
> - Sovereign philosophy: IDIC + full data sovereignty — every transaction protected by Sphere 0 master_key_hash, capability_token, and encryption_root per spherical_nodes table.
> - Tagline: 'Get paid to belong. No one gets left behind.'
>
> EVERY INTEGRATION (wire all of them exactly as previously defined):
> - Spherical Nodes schema (Sphere 0 Sovereign Core balance, Sphere 1 Family Hearth shared rewards, Sphere 2 Xception revenue-share contracts, Sphere 3 Cowichan Valley mesh relay earnings, Sphere 4 provincial grants, Sphere 5 Recovery Fork detox sponsor credits).
> - KoRT-Sync-Engine & Mirror Protocol handshake (zero-knowledge blinded public key, ephemeral session keys, CRDT delta exchange, dual-signature for Digital Dollars).
> - KoRT Auto-Infector v1.0 PowerShell: mint 100 DD welcome bounty on Windows node infection at D:\KoRT_Command_Center.
> - Health Guardian 15 expanded wellness missions (daily mood snapshot, family legacy logs, proactive Cowichan farm-stress/off-grid nutrition missions) paying 5-20 DD each.
> - Digital Advocate Sentinel/Scribe: auto-draft ICBC/Home Insurance claims and Xception contracts with 5% success fee + 3% platform fee routed to Knight's Sphere 0.
> - Quantum Optimizer Worker (QAOA mission assignment): auto-mint DD on every completed mission.
> - Memory Gatekeeper: filter all Claude/Project Mayhem exports and voice notes into Supabase vector store before ledger writes.
> - Heimdall ingestion: every DD transaction auto-updates Master Wiki at apps/master-wiki.
> - VSCodium/KoRT-IDE: live Sphere Dashboard widget showing real-time balance + earnings.
> - Quantum-Voice-Bridge: Merlin voice treasury updates.
> - Recovery Fork handoff: redacted crisis flags from Health Guardian trigger sponsor matching credits.
>
> CREDENTIAL & API WIRING (use these exact placeholders for immediate own-software replacement tonight):
> - Supabase: SUPABASE_URL=https://your-project-ref.supabase.co, SUPABASE_ANON_KEY=your-anon-key, SUPABASE_SERVICE_ROLE_KEY=your-service-role-key.
> - Meshtastic LoRa: MESH_NODE_ID=your-cowichan-valley-node-id, MESH_API_KEY=your-mesh-relay-key.
> - KoRT-Network OIDC: OIDC_ISSUER=https://auth.kortx.ca/realms/kort, CLIENT_ID=kort-desktop, CLIENT_SECRET=your-client-secret (injected via AG Auto-Infector registry edits).
> - Ollama: OLLAMA_HOST=http://localhost:11434.
> - Ledger table: digital_dollars_ledger (columns: tx_id, from_knight_id, to_knight_id, amount, signed_tx_json, timestamp, sphere_level).
>
> DELIVER IMMEDIATELY (production-ready for one-click deployment):
> - Full docker-compose service definition for dollars.kortx.ca.
> - Supabase migration script (create ledger table + exact RLS policies from spherical_nodes).
> - KoRT-Sync-Engine hooks for USB mirror.
> - VSCodium command palette entries and React dashboard widget.
> - AG Auto-Infector extension script to mint initial bounty.
> - All SOPs, rules, and laws embedded as comments in the code.
>
> Make MY OWN SOFTWARE AND WEBSITES replace everything tonight so the Quantum Aurum Quorum flies high.

---

## SPHERICAL SCHEMA SQL (for Supabase migration)

```sql
-- Spherical Nodes Table
CREATE TABLE IF NOT EXISTS spherical_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID REFERENCES auth.users(id),
    sphere_level INT NOT NULL CHECK (sphere_level BETWEEN 0 AND 5),
    designation TEXT NOT NULL,
    master_key_hash TEXT,
    capability_token TEXT,
    encryption_root TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Digital Dollars Ledger (double-entry, append-only)
CREATE TABLE IF NOT EXISTS digital_dollars_ledger (
    tx_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_knight_id UUID NOT NULL,
    to_knight_id UUID NOT NULL,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    sphere_level INT NOT NULL DEFAULT 0,
    tx_type TEXT NOT NULL DEFAULT 'transfer',
    signed_tx_json JSONB,
    memo TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Knight Balances (materialized view)
CREATE OR REPLACE VIEW knight_balances AS
SELECT
    knight_id,
    COALESCE(SUM(credits), 0) - COALESCE(SUM(debits), 0) AS balance
FROM (
    SELECT to_knight_id AS knight_id, amount AS credits, 0 AS debits FROM digital_dollars_ledger
    UNION ALL
    SELECT from_knight_id AS knight_id, 0 AS credits, amount AS debits FROM digital_dollars_ledger
) ledger
GROUP BY knight_id;

-- RLS Policies
ALTER TABLE digital_dollars_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Knights can view own transactions"
    ON digital_dollars_ledger FOR SELECT
    USING (auth.uid() = from_knight_id OR auth.uid() = to_knight_id);

CREATE POLICY "Service role can insert"
    ON digital_dollars_ledger FOR INSERT
    WITH CHECK (true);

ALTER TABLE spherical_nodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Knights can view own spheres"
    ON spherical_nodes FOR SELECT
    USING (auth.uid() = knight_id);
```

## DOCKER SERVICE DEFINITION

```yaml
  digital-dollars:
    build: ./apps/digital-dollars
    ports:
      - "5177:5173"
    environment:
      - VITE_SUPABASE_URL=${SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - VITE_OLLAMA_HOST=http://host.docker.internal:11434
    volumes:
      - ./apps/digital-dollars:/app
    restart: always
```

## SPHERE DESIGNATION MAP

| Sphere | Designation | DD Earning Sources |
|--------|------------|-------------------|
| 0 | Sovereign Core | Personal key staking, node uptime |
| 1 | Family Hearth | Shared household tasks, family mesh relay |
| 2 | Career & Future | Xception contracts (3% fee), ICBC claims (5% fee) |
| 3 | Community Mesh | Cowichan Valley relay, mutual aid, job board |
| 4 | Jurisdictional | Provincial grants, Digital Advocate filings |
| 5 | Global/Recovery | Recovery Fork sponsor credits, inter-valley alliances |

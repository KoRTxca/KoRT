# Digital Dollars Prompt — Primio.dev (v1.0)

This is the definitive full prompt for Primio.dev to instantiate the production-grade Digital Dollars ledger and payout engine.

## Summary
- Build a mutual-credit ledger at dollars.kortx.ca inside the existing D:\KoRT_Command_Center monorepo and apps/digital-dollars folder.
- Do not delete or regenerate or overwrite prior work. Extend existing codebase.
- Offline-first, CRDT-based ledger with SQLite replica on USB mirrors. Sync to central ledger over a mirror protocol.
- Ledger: digital_dollars_ledger with fields: tx_id, from_knight_id, to_knight_id, amount, signed_tx_json, timestamp, sphere_level.
- Payout engine, reward ledger, mass-adaptor for rewards in the KoRT ecosystem.

## Core Rules
- Mutual-credit only: +10 to earn, -10 to spend; no inflation; double-entry accounting via CRDT.
- Offine-first and reconciliation of digital wallets; local ledger is authoritative when offline.
- Reputation-based credit limits; sphere-based governance; governance across spherical nodes.
- Data sovereignty: all transactions encrypted, logged in Master Wiki.
- Branding phrase: "Get paid to belong. No one gets left behind."

## Integrations
- Sphere 0-5 nodes (Sovereign Core, Family Hearth, Career & Future, Community Mesh, Jurisdictional, Global Mesh).
- KoRT-Sync-Engine Mirror Protocol: handshake and delta exchange.
- Health Guardian wellness missions to empower earnings and well-being.
- Memory Gatekeeper to reduce token usage in prompts.
- Quantum Optimizer and Cortex-based decisions.
- Ollama local LLM for the brain; LiveKit for signaling.
- The Watch: Supabase logs for crisis/discovery.

## Credentials (Placeholders; replace with secure storage before production)
- SUPABASE_URL=REDACTED
- SUPABASE_ANON_KEY=REDACTED
- SUPABASE_SERVICE_ROLE_KEY=REDACTED
- MESH_NODE_ID=REDACTED
- MESH_API_KEY=REDACTED
- OIDC_ISSUER=https://auth.kortx.ca/realms/kort
- OLLAMA_HOST=http://localhost:11434

## Deliverables
- Docker Compose for dollars.kortx.ca
- Supabase migrations for the ledger and RLS policies
- KoRT-Sync-Engine wrappers to mirror USB and cloud
- A UX widget for the DD ledger in the KoRT web UI
- Achievable KPIs: throughput, latency, offline sync latency, admin auditing

## Execution Notes
- Do not alter existing code beyond appending the new ledger service; the goal is to extend, not rewrite.
- Keep the patch minimal and well documented.
- If you must update any pre-existing SQL or schema, document in the migration notes.

End of Prompt

-- =============================================================================
-- KORT ENTERPRISE: HEIMDALL GATEKEEPER SCHEMA (Supabase Migration 0010)
-- Phase H0 — Borg Collective Data Lake Schema
-- Reference: KORT_WIKI_v1.md §9.2
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS lake;

-- 9.2.1 Every event in the kingdom
CREATE TABLE IF NOT EXISTS lake.events (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  seat text not null,                       -- merlin / gawain / antigravity / bedivere / sovereign / etc.
  occupant text,                            -- claude-opus-4-7 / gemini-2.0-flash / etc. (real model occupying the seat)
  event_type text not null,                 -- prompt / response / tool_call / tool_result / decision / handoff / canonization
  scope_token uuid,                         -- if issued by Gatekeeper, which token authorized this
  project text,                             -- kort / digital-advocate / icbc-da57244 / academy / etc.
  task text,                                -- short slug for the immediate task
  parent_event uuid references lake.events(id),  -- threading
  payload jsonb not null,                   -- the actual content (prompt, response, etc.)
  hash text,                                -- sha256 of payload for dedup
  cost_cad numeric(8,4),
  tokens_prompt int,
  tokens_completion int,
  tags text[],
  classification jsonb                      -- Gatekeeper's classification of this event
  -- Note: pgvector extension and 'embedding vector(1536)' to be added in Phase H5
);

CREATE INDEX IF NOT EXISTS lake_events_seat_ts ON lake.events (seat, ts desc);
CREATE INDEX IF NOT EXISTS lake_events_project_ts ON lake.events (project, ts desc);
CREATE INDEX IF NOT EXISTS lake_events_task_ts ON lake.events (task, ts desc);
CREATE INDEX IF NOT EXISTS lake_events_tags ON lake.events USING gin (tags);

-- 9.2.2 Scope tokens issued by Gatekeeper
CREATE TABLE IF NOT EXISTS lake.scope_tokens (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  seat text not null,
  project text not null,
  task text not null,
  scope jsonb not null,                     -- { tables: [...], cases: [...], exhibits: [...], parties: [...], time_window: {...} }
  expires_at timestamptz not null,
  consumed_at timestamptz,
  consumed_by_event uuid references lake.events(id)
);

-- 9.2.3 Categories — the global tag taxonomy
CREATE TABLE IF NOT EXISTS lake.categories (
  id text primary key,                      -- 'global', 'user', 'seat', 'case', 'project', 'public'
  parent text references lake.categories(id),
  description text,
  permission_required text                  -- which seats may read this category
);

-- 9.2.4 Classification rules (Gatekeeper learning)
CREATE TABLE IF NOT EXISTS lake.classification_rules (
  id uuid primary key default gen_random_uuid(),
  seat text,
  pattern text,                             -- regex or NL trigger
  classify_as jsonb,
  confidence numeric(3,2),
  approved_by_sovereign boolean default false,
  created_at timestamptz default now()
);

-- 9.2.5 Insubordination ledger (Mordred flags)
CREATE TABLE IF NOT EXISTS lake.mordred_flags (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  seat text not null,
  event uuid references lake.events(id),
  violation text,
  severity text,                            -- low / medium / high / critical
  resolved_at timestamptz,
  resolution text
);

-- 9.2.6 Transfer requests (when a seat wants out-of-commission action)
CREATE TABLE IF NOT EXISTS lake.transfer_requests (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  seat text not null,
  current_commission text,
  requested_commission text,
  mission_scope text,
  duration interval,
  justification text,
  status text default 'pending',            -- pending / approved / denied / expired
  decided_by text,                          -- 'sovereign' or another seat name
  decided_at timestamptz
);

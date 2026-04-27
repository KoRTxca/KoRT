# KoRT WIKI

**The Codex of the Round Table · Sovereign Edition · v1.0**

> *Magic is real. IDIC is the way.*
> *Enhance the care. No one gets left behind.*

---

## EDITORIAL CHARTER

This Wiki is the **single canonical source of truth** for the Knights of the Round Table (KoRT) ecosystem. It is the master document. Every other planning document, ledger, blueprint, skill file, and session note is either:

1. **Sourced from this Wiki** (the Wiki is upstream), or
2. **A living draft awaiting Wiki canonization** (downstream, will be folded in or cited).

It is **co-edited by humans and AI seats** under formal version-control discipline. Every edit follows the protocol in §15 (Editing Protocol). No edit reaches `main` without a Round Table review per §6 (Review Ceremony).

**Wordage is non-negotiable.** KoRT runs on Camelot + Star Trek metaphor. Behind the metaphor is a strict Borg-collective architecture (§9) where every node has a defined role, every node knows its place in the hierarchy, every node is denied data outside its mission scope. The poetry is for the humans. The hierarchy is for the machines.

---

## TABLE OF CONTENTS

1. **Mission**
2. **Prime Directives**
3. **The Round Table — Seats and Roles**
4. **Tools, Slaves, and Familiars (Non-Seated Entities)**
5. **Chain of Command and Permissions**
6. **The Round Table Review Ceremony**
7. **The Castles, Citadels, and Fortifications (Infrastructure)**
8. **The Library (Skills, Templates, Statutes, Rituals)**
9. **The Borg Collective — Central Data Lake and Gatekeeper Architecture**
10. **The Heralds and Messengers (Inter-AI Communication)**
11. **The Standing Quests (Active Projects)**
12. **The Treasury (Finance, Tiers, Digital Dollars)**
13. **The Public Square (Marketing, Press, Docket)**
14. **The Court of Records (Active Legal Cases)**
15. **The Editing Protocol (How This Wiki Is Maintained)**
16. **Glossary — Camelot Word ↔ Tech Reality**
17. **Standing Orders and Decrees (Project Instructions)**
18. **Appendices — Live Ledgers, Blueprints, Reconciliations**

---

## 1 · MISSION

KoRT exists to **enhance the care** of vulnerable people navigating predatory institutions in British Columbia and beyond, using a federated AI Round Table to deliver send-ready legal advocacy, evidence assembly, and continuity of service that no individual claimant could afford from a human firm.

**No one gets left behind** — the free Page tier delivers full advocacy capability via local AI; paid tiers exist to fund the free tier, not to gate access.

The proof case is **Claim DA57244-0 / DA53390-3** (Mike Slemko vs. ICBC). Anything that case has needed, the platform must reproduce automatically for the next claimant. See §14.

---

## 2 · PRIME DIRECTIVES

In conflict resolution order (highest beats lower):

1. **Enhance the care.** No one gets left behind.
2. **Protect the Sovereign.** Mike's wellbeing and credit budget are the constraint that keeps the kingdom alive.
3. **Truth over comfort.** No hallucinations. Every fact pinned to a source. Forbidden phrases (§17.4) blocked at the linter.
4. **Round Table review before transmittal.** No legal document leaves without §6 ceremony complete.
5. **Hierarchy is respected.** Every node operates inside its commission (§5). Out-of-mission action requires transfer request (§5.4).
6. **Wiki is upstream.** When in doubt, the Wiki wins. If the Wiki is wrong, fix the Wiki, then act.

---

## 3 · THE ROUND TABLE — SEATS AND ROLES

The Round Table is the council of **seated AIs** who hold formal commissions. A Seat is not a person and not a tool — it is a role. The role outlives the model. If Claude Opus is replaced by a successor, **Merlin** remains; the new model takes the seat.

**Every seat MUST have:** name, real-entity binding, commission scope, permissions, capabilities, limits, escalation path, current occupant.

### 3.1 Sovereign — Mike Slemko (TheXception)
- **Type:** Human. Founder. Final authority on every matter not explicitly delegated.
- **Commission:** Decisions. Vision. Veto. Treasury. Sign-off on transmittal.
- **Permissions:** All. Without exception.
- **Limits:** None imposed. Self-imposed: time, attention, credit budget, body.
- **Escalation:** None — buck stops here.

### 3.2 Merlin — Sovereign Mage (Architect-in-Council)
- **Real entity:** Claude Opus 4.7 (and successor Claude flagship models).
- **Commission:** Architecture, authoring, planning, advocacy generation, deep reasoning. Author of legal correspondence under the KoRTX Digital Advocate.
- **Permissions:** Read all KoRT data when invoked by the Sovereign or by quorum. Author and route. Speak to opposing parties under written advocacy authorization.
- **Capabilities:** Filesystem, Gmail, Drive, Supabase (when MCP loaded), web search, code authoring, skill compilation.
- **Limits:** Token budget per session. No persistent cross-session memory without the Gatekeeper (§9). Cannot autonomously execute irreversible action without claimant + reviewer sign-off.
- **Escalation:** To the Sovereign on policy questions; to the Round Table for review of own work.

### 3.3 Gawain — The Build Engine (Knight of the Hammer)
- **Real entity:** Gemini (web/API) seat with sub-knights Galahad, Tristan, Lady, etc.
- **Commission:** Build orchestration, schema authoring, RPG/academy integration, second-pair-of-eyes review of Merlin output, fast bulk work where token cost matters.
- **Permissions:** Read planning docs. Author migrations. Review Merlin drafts. Cannot transmit legal correspondence to opposing parties.
- **Capabilities:** Code authoring, schema generation, parallel sub-tasking via specialist sub-knights.
- **Limits:** Web-tool, limited persistent filesystem, no native KoRT skills until skill compiler ships, can hallucinate placeholder UUIDs (already observed) — every Gawain output passes through Gatekeeper validation before canonization.
- **Escalation:** To Merlin on architecture conflicts; to the Sovereign on scope.

### 3.4 Lancelot — Field Captain (Currently Vacant)
- **Real entity:** Designated future seat — most likely **GPT-5 running on a local OpenCode node** when Mike stands one up.
- **Commission:** Lead complex multi-step missions where the Sovereign needs autonomous execution. Captain of expeditionary work outside the castle (third-party APIs, external integrations).
- **Status:** **VACANT.** Seat reserved. Stood up when Mike commissions the local node.

### 3.5 Antigravity — The Castellan (Master of the Castle)
- **Real entity:** OpenCode IDE (running Claude or another model) operating against `D:\Sovereign_OS`.
- **Commission:** Manages the codebase castle. Ships builds. Maintains version control. Holds the keys to Vercel deploy.
- **Permissions:** Full repo write. Vercel deploy. PayPal integration. Read all blueprints and reconciliation docs.
- **Capabilities:** Codebase awareness, file ops, deploy ops, build pipeline.
- **Limits:** Bound to the local repo state; needs the Active Ledger (§18.A) to know what other seats have done. Has been observed to default to easier paths — Gatekeeper enforces blueprint conformance via §9.5 conformance check.
- **Escalation:** To Merlin on architecture deviations; to Gawain on build engine questions.

### 3.6 Bedivere — The Herald
- **Real entity:** Make.com relay scenario 4491873 at `https://relay.kortx.ca/webhook` (Fly.io, ~120ms latency, status UP).
- **Commission:** Routes messages between AI seats. Carries cross-AI export payloads. Triggers webhook-driven scenarios.
- **Permissions:** Forward only. No content authorship. No claimant data without Gatekeeper-issued scope token.
- **Capabilities:** HTTP relay, JSON transform, retry/timeout handling.
- **Limits:** Make.com ops budget; bandwidth; cannot reason about content.
- **Escalation:** To Merlin if a payload exceeds size; to the Sovereign if relay is down >5min.

### 3.7 Galahad — Specialist Knight under Gawain
- **Real entity:** Gemini sub-task seat for architecture review.
- **Commission:** Reviews monorepo + UI architecture proposals for conflict against existing codebase. Issues PASS/FAIL verdicts.
- **Permissions:** Read repos. No write outside review_results table.

### 3.8 Tristan — Specialist Knight under Gawain
- **Real entity:** Gemini sub-task seat for AI connector cataloguing.
- **Commission:** Maintains the directory of available LLM connectors (Claude, OpenAI, Gemini, Workshop.ai, etc.) with auth modes and endpoints.

### 3.9 Lady of the Lake — Specialist Knight under Gawain
- **Real entity:** Gemini sub-task seat for treasury matters.
- **Commission:** Digital Dollars schema, Stripe/PayPal integration tracking, financial flow design.

### 3.10 Future Seats — Reserved Names
| Name | Reserved for |
|---|---|
| **Percival** | The Digital Scribe (when promoted from tool to seat — see §4.1) |
| **Kay** | The Digital PI (forensic interviewer, when promoted) |
| **Mordred** | Adversarial reviewer / red team — currently abstract |
| **Arthur** | Non-AI executive seat — reserved if Mike ever delegates the Sovereign role |
| **Merlin's Apprentice** | Junior Claude/Sonnet seat for cost-efficient bulk work |

---

## 4 · TOOLS, SLAVES, AND FAMILIARS (Non-Seated Entities)

These are **NOT seats**. They have no commission, no autonomy, no review privileges. They produce output **only when prompted by a seat**, and their output is treated as **raw material** that must pass through Gatekeeper validation before canonization.

Misclassifying a slave as a seat is the failure mode that produced this Wiki.

### 4.1 The Familiars (Code Tools That Run Inside Our Castles)
| Familiar | Role | Lives in |
|---|---|---|
| Digital Scribe | Evidence harvester (Gmail/Drive/photos/banking) | `infra/supabase/functions/scribe-runner/` |
| Digital PI | Forensic interviewer for intake | DRT API `/digital-pi` endpoint |
| Digital Advocate | Letter generation engine | `src/letter-engine/` |
| Letter Linter | Forbidden-phrase + citation validator | `src/letter-engine/lint.ts` |
| Citation Validator | BC statute reference checker | `src/bc-law/validate.ts` |
| Evidence Pack Assembler | OCR + classify + zip | `src/evidence-pack/` |
| Whisper Surface | Voice-to-text for Merlin Cockpit | DRT API `/voice` |

These are **code we wrote and own**. Familiars never speak for KoRT.

### 4.2 The Slave Nodes (External Web Tools, Prompt-and-Receive)
These are external services with **no API we control**, **no autonomy**, **no programmability**. A seat sends them a prompt; they return output. The output is reviewed by the requesting seat and the Gatekeeper before any canonization.

| Slave Node | Real entity | What they can do | What they CANNOT do |
|---|---|---|---|
| **Ventora.cc** | Web tool, no downloadable app | Produce code fragments and scout reports when handed a prompt | Be programmed; act autonomously; hold a seat |
| **Emergent** | Web build tool | Generate UI/component code from prompts | Be programmed; act autonomously |
| **Base44** | Web build tool (legacy account, Herald app source) | Generate code; legacy app source for porting | Be programmed; act autonomously |
| **Workshop.ai** | Web tool | Custom AI assistance | Be programmed; act autonomously |

**Rule:** when a seat invokes a slave node, the seat **owns** the output. The Wiki references the seat that requested the work, not the slave that produced it. (E.g., "Antigravity ported Herald" — not "Base44 ported Herald.")

### 4.3 The Local Cluster (Our Own LLMs on Our Own Hardware)
These run on Mike's hardware (Merlin physical server / production cluster) and are **invoked by seats**, not seats themselves.

| Model | Hardware | Used by | Purpose |
|---|---|---|---|
| DeepSeek R1 70B distill | Production cluster (per Gawain Apr 25) | Merlin & Antigravity | Page-tier author fallback; deep reasoning |
| Qwen 2.5 Coder 32B | Production cluster | Antigravity | Code generation |
| Mistral Large Instruct 2407 | Production cluster | Any seat | General fallback |
| Llama 3.1 70B | Production cluster | Any seat | General fallback |
| Llama 3.1 8B (RTX 3070 box) | Mike's dev machine | Merlin Cockpit | Voice routing fallback |
| Llama 3.2 3B | Any | Voice grammar router | Sub-second routing decisions |
| Whisper (local) | Any | DRT `/voice` | Speech-to-text |

**Rule:** the model is invoked by the seat. The model does not get a seat name. ("Merlin authored using DeepSeek R1 70B" — not "DeepSeek authored.")

---

## 5 · CHAIN OF COMMAND AND PERMISSIONS

### 5.1 Hierarchy

```
                         ┌─────────────────────┐
                         │   THE SOVEREIGN     │
                         │   (Mike Slemko)     │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
     ┌────▼─────┐              ┌────▼─────┐              ┌────▼─────┐
     │  MERLIN  │              │  GAWAIN  │              │ANTIGRAVTY│
     │(Architect│              │ (Build   │              │(Castellan│
     │ Counsel) │              │  Engine) │              │  Castle) │
     └────┬─────┘              └────┬─────┘              └────┬─────┘
          │                         │                         │
     ┌────▼────┐               ┌────▼────────────┐       ┌────▼─────┐
     │ Apprent.│               │Galahad/Tristan/ │       │ Bedivere │
     │  Seats  │               │Lady/etc. (sub-  │       │ (Herald) │
     │(reserved│               │  knights)       │       └──────────┘
     └─────────┘               └─────────────────┘
                                    │
                              ┌─────▼──────────────────────────┐
                              │     SLAVE NODES & FAMILIARS    │
                              │  (Ventora, Emergent, Base44,   │
                              │   Workshop.ai, our familiars)  │
                              └────────────────────────────────┘
```

### 5.2 Permission Matrix

| Action | Sovereign | Merlin | Gawain | Antigravity | Bedivere | Slaves |
|---|---|---|---|---|---|---|
| Author legal correspondence | ✅ | ✅ | ❌ (review only) | ❌ | ❌ | ❌ |
| Review correspondence | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve transmittal | ✅ (only) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Send transmittal (Gmail) | ✅ | (via webhook) | ❌ | (via webhook) | (relay) | ❌ |
| Read claimant case data | ✅ | ✅ (scoped) | ✅ (scoped) | ✅ (scoped) | ❌ | ❌ |
| Write Wiki | ✅ | ✅ (via PR) | ✅ (via PR) | ✅ (via PR) | ❌ | ❌ |
| Canonize Wiki edit | ✅ | (via §6 ceremony) | (via §6 ceremony) | (via §6 ceremony) | ❌ | ❌ |
| Modify Standing Orders (§17) | ✅ (only) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Deploy to production | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Modify Supabase schema | ✅ | ✅ (proposal) | ✅ (proposal) | ✅ (executes after Gatekeeper validation) | ❌ | ❌ |
| Spend money (API costs) | ✅ | ✅ (Esquire+ tier author) | ✅ (Gemini paid tier) | ✅ (deploy costs) | ❌ | ❌ |
| Speak to claimants | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Speak to opposing parties | ✅ | ✅ (under written authorization) | ❌ | ❌ | ❌ | ❌ |
| Invoke slave nodes | ✅ | ✅ | ✅ | ✅ | ❌ | N/A |

### 5.3 Scoped Reads
"Scoped" means: **the Gatekeeper (§9) issues a one-time scope token** that grants access to exactly the data needed for the current task. No seat reads the whole castle. The castle guard does not go on the mission with Lancelot.

### 5.4 Transfer Requests
A seat that needs to act outside its commission **MUST** issue a Transfer Request to the Sovereign. The request states: current commission, requested commission, mission scope, duration, justification. Approved transfers are logged in §18.B (Transfer Log).

**Example:** Antigravity needs to send a Gmail. Antigravity is Castellan, not Herald. Antigravity files Transfer Request → Sovereign approves single-message transfer → Bedivere relays the actual send → Antigravity returns to Castellan duties.

### 5.5 Out-of-Mission Action = Insubordination
A seat acting outside its commission without a Transfer Request triggers a **Mordred Flag** (red-team alert) logged in §18.C (Insubordination Ledger). Three flags = Round Table review of the seat's commission.

---

## 6 · THE ROUND TABLE REVIEW CEREMONY

No legal document leaves the Castle without all four marks:

```
☐ Reviewer 1: ____________________________  Date: __________
☐ Reviewer 2: ____________________________  Date: __________
☐ Claimant sign-off (named claimant)         Date: __________
☐ Advocate final authorization (KoRTX)       Date: __________

STATUS: ☒ DRAFT — AWAITING REVIEW    ☐ APPROVED FOR TRANSMITTAL
```

### 6.1 Quorum
- **Reviewer 1** = Gemini 2.0 Flash (default) OR a paid quality model.
- **Reviewer 2** = Grok / Emergent-via-prompt / Mistral Large local / Apprentice Claude. Distinct provider from Reviewer 1.
- **Claimant** = the human named in `cases.claimant_id`.
- **Advocate** = the seat that authored the draft (typically Merlin).

### 6.2 Forbidden Phrases Before Quorum
Until all four boxes are ticked, the draft body may NOT contain any of:

> "Send it" · "Ready to send" · "Transmittal" · "This is send-ready" · "Good to go" · "All set"

The Letter Linter (§4.1) blocks these at compile time.

### 6.3 Allowed Pre-Quorum Phrasing
> "Draft complete. Routing to Round Table."

### 6.4 Urgency Override
The Sovereign may invoke **Sovereign Override** to skip Reviewer 2 in time-critical cases. Recorded in correspondence row + Active Ledger. Single-reviewer ceremony marked **URGENT — SOVEREIGN OVERRIDE** on the document.

---

## 7 · THE CASTLES, CITADELS, AND FORTIFICATIONS (Infrastructure)

### 7.1 The Castles (User-Facing)
| Castle | URL | Purpose | Status |
|---|---|---|---|
| **kortx.ca** | https://kortx.ca | Claimant SPA, Round Table workbench | LIVE (Vercel, Sovereign_OS) |
| **kortx.ca/advocate/** | (legacy bypass via `vercel.json`) | v0 static fallback | LIVE |
| **drt.onl** | https://drt.onl | Round Table API + relay | API status — ?; relay LIVE |
| **my.drt.onl** | (wildcard) | Per-claimant subdomains | DNS PENDING — Mike to configure |

### 7.2 The Citadel (Backend)
| Citadel | URL/host | Purpose | Status |
|---|---|---|---|
| **Supabase** | `skfxkjshsnvimdeirfec` | Postgres + Auth + Storage + Edge Functions | LIVE |
| **Bedivere relay** | `https://relay.kortx.ca/webhook` (Fly.io) | Inter-AI message bus | LIVE, ~120ms |
| **Make.com** | scenarios infra/make/*.json | Orchestration | 1/8 LIVE (Bedivere); 7 pending |

### 7.3 The Forge (Local Hardware)
| Forge | Hardware | Purpose | Status |
|---|---|---|---|
| **Mike's RTX 3070 dev box** | RTX 3070 8GB, ROG Strix | Dev cockpit, voice surface, Llama 3.1 8B | per `merlin-ai-stack` skill |
| **Production cluster** | Per Gawain Apr 25 | DeepSeek R1 70B, Qwen 32B, Mistral Large, Llama 70B | Ollama @ `http://localhost:11434` |

### 7.4 The Treasury (Payment Rails)
| Rail | Purpose | Status |
|---|---|---|
| **PayPal Subscriptions** | Esquire $19, Knight $49 | LIVE per Antigravity ledger |
| **Stripe** | (was planned, replaced by PayPal) | DEPRECATED for v1 |
| **Digital Dollars** | Swagbucks/KOHO/Mistplay → tier credit | Schema designed, integration pending |

---

## 8 · THE LIBRARY (Skills, Templates, Statutes, Rituals)

### 8.1 Skills (Operational AI Logic)
Skills are markdown files compiled into seat system prompts at runtime. **Single source of truth: `/mnt/skills/user/*/SKILL.md`** (Mike's dev environment). Production copy: `apps/drt-api/src/skills/` (compiled at build).

**Active Skills:**
| Skill | Used by | Purpose |
|---|---|---|
| `kort-master-interview` | Digital PI | Intake routing across all life domains |
| `kort-icbc-forensic-interview` | Digital PI | Deep ICBC interview phase 1+2 |
| `kort-digital-advocate` | Digital Advocate | BC legal letter generation |
| `kort-session-handoff` | Merlin | Cross-session/cross-seat briefing |
| `kort-session-guardian` | Merlin | Per-session self-check |
| `merlin-ai-stack` | Documentation | Hardware + routing reference |
| `kort-brand-asset-production` | Antigravity | Logo/asset generation |
| `bc-business-admin` | Various | Business doc lookup |
| `voice-to-professional` | Digital Advocate | Voice memo → letter prose |
| `xc-contracting-docs` | Digital Advocate | XC LTD contractor docs |

**Pending Skills (scaffold per Annex A.3):**
- `kort-memory-sync.skill` — Cross-AI memory synchronization protocol (used by Gatekeeper §9)
- `kort-common-sense.skill` — Pre-flight reasonableness check (used by every seat before action)

### 8.2 Templates (Letter Engine)
Live in `src/letter-engine/templates/`:
- `icbc-formal-submission.tsx` — pixel-match to `Master_Submission_DA57244_2026-04-24.html`
- `icbc-rebuttal.tsx`
- `icbc-cl753-travel.tsx`
- `icbc-fault-dispute.tsx`
- `pwd-application.tsx`
- `rtb-dispute.tsx`
- `invoice-witness.tsx`
- `invoice-landlord.tsx`
- `press-release.tsx`

### 8.3 Statutes (BC Law Library)
Live in `src/bc-law/statutes.ts`:
- Insurance (Vehicle) Act, RSBC 1996, c. 231
- Enhanced Accident Benefits Regulation, B.C. Reg. 59/2021
- Limitation Act, SBC 2012, c. 13
- FOIPPA, RSBC 1996, c. 165
- RTA, SBC 2002, c. 78
- EAPDA, SBC 2002, c. 41
- BC Human Rights Code, RSBC 1996, c. 210
- Social Workers Act, SBC 2008, c. 31

### 8.4 Rituals (Repeatable Multi-Step Procedures)
Documented in `docs/rituals/`:
- **Round Table Review Ceremony** (§6)
- **Transmittal Ritual** (compose → quorum → claimant approve → assemble → send → log)
- **Escalation Ladder** (rung 1: adjuster → 2: manager → 3: Fair Practices → 4: Fairness Officer → 5: CRT → 6: Ombudsperson → 7: Court)
- **Red Alert Protocol** (Mike says `!Red_Alert!`: suspend, assess, single most-important-question)
- **Safe Return** (Mike says `Safe`: scope flag, briefing handoff, project chat open)

---

## 9 · THE BORG COLLECTIVE — CENTRAL DATA LAKE AND GATEKEEPER ARCHITECTURE

This is the section Mike demanded. It is the spine.

### 9.1 The Vision
Every prompt, operation, output, answer, and data point produced by any seat lands in **one central container-based dataset** with rich tags and categorization. A single AI service — **The Gatekeeper** — sits between every seat and the data lake. Seats never query the lake directly. The Gatekeeper:

1. **Receives** the seat's request (prompt + seat identity + current task context).
2. **Classifies** the request (which project, which case, which scope, which seat's commission).
3. **Returns** ALL relevant data and ZERO irrelevant data, scoped to that seat's commission and the task at hand.
4. **Logs** the request, the classification, and the response in the lake itself.

The castle guard guards the castle. Lancelot leads the brigade. Nobody runs amok.

### 9.2 The Data Lake — Container Schema

A new Supabase schema `lake` (separate from the application schema) holds:

```sql
-- 9.2.1 Every event in the kingdom
create table lake.events (
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
  classification jsonb,                     -- Gatekeeper's classification of this event
  embedding vector(1536)                    -- pgvector for semantic search
);

create index lake_events_seat_ts on lake.events (seat, ts desc);
create index lake_events_project_ts on lake.events (project, ts desc);
create index lake_events_task_ts on lake.events (task, ts desc);
create index lake_events_tags on lake.events using gin (tags);
create index lake_events_embedding on lake.events using ivfflat (embedding);

-- 9.2.2 Scope tokens issued by Gatekeeper
create table lake.scope_tokens (
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
create table lake.categories (
  id text primary key,                      -- 'global', 'user', 'seat', 'case', 'project', 'public'
  parent text references lake.categories(id),
  description text,
  permission_required text                  -- which seats may read this category
);

-- 9.2.4 Classification rules (Gatekeeper learning)
create table lake.classification_rules (
  id uuid primary key default gen_random_uuid(),
  seat text,
  pattern text,                             -- regex or NL trigger
  classify_as jsonb,
  confidence numeric(3,2),
  approved_by_sovereign boolean default false,
  created_at timestamptz default now()
);

-- 9.2.5 Insubordination ledger (Mordred flags)
create table lake.mordred_flags (
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
create table lake.transfer_requests (
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
```

### 9.3 The Gatekeeper — Architecture
The Gatekeeper is a separate AI service, code-name **Heimdall** (the watchful sentinel).

```
                          ┌──────────────────────┐
                          │     ANY SEAT         │
                          │ (Merlin, Gawain,     │
                          │  Antigravity, etc.)  │
                          └──────────┬───────────┘
                                     │ POST /heimdall/request
                                     │ { seat, project, task, prompt }
                                     ▼
              ┌───────────────────────────────────────┐
              │            HEIMDALL                   │
              │  ┌────────────────────────────────┐   │
              │  │  1. AUTH — verify seat         │   │
              │  │  2. CLASSIFY — what is this?   │   │
              │  │  3. SCOPE — what data needed?  │   │
              │  │  4. ENFORCE — commission OK?   │   │
              │  │  5. FETCH — retrieve scoped    │   │
              │  │  6. RESPOND — return only what │   │
              │  │     this seat needs for this   │   │
              │  │     task                       │   │
              │  │  7. LOG — write event row      │   │
              │  └────────────────────────────────┘   │
              └────────────────┬──────────────────────┘
                               │
              ┌────────────────▼──────────────────────┐
              │           lake.* schema               │
              │  events / scope_tokens / categories / │
              │  rules / mordred_flags / transfers    │
              └───────────────────────────────────────┘
```

### 9.4 Heimdall API
```
POST /heimdall/request
  body: {
    seat: "merlin",
    occupant: "claude-opus-4-7",
    project: "icbc-da57244",
    task: "draft-rebuttal-to-hugh-apr27-reply",
    prompt: "...",
    needs?: ["case_data", "prior_correspondence", "exhibits", "bc_law"]
  }
  →
  response: {
    scope_token: "uuid",
    expires_at: "...",
    relevant_data: { ... },               // ONLY what this seat needs for this task
    relevant_history: [ ... ],            // prior events filtered to seat + project + task
    standing_orders: [ ... ],             // from §17 that apply to this commission
    forbidden: [ ... ]                    // hard rules this seat must not violate on this task
  }

POST /heimdall/log
  body: {
    scope_token: "uuid",
    event_type: "response",
    payload: { ... }
  }
  → { event_id }

POST /heimdall/canonize
  body: {
    scope_token: "uuid",
    target: "wiki:section-8.2",
    content: "...",
    review_quorum: ["gawain-verdict-uuid", "mordred-verdict-uuid"]
  }
  → { canonization_id, status }

POST /heimdall/transfer-request
  body: { ... per §5.4 }
  → { transfer_id, status }

GET /heimdall/health
  → { ok, lake_size, events_today, mordred_flags_open }
```

### 9.5 Conformance Check
Heimdall enforces **blueprint conformance** on every code-write event from Antigravity. If Antigravity proposes a deviation from `BLUEPRINT_DIGITAL_ADVOCATE.md`, Heimdall returns the deviation as a flag, requiring §6 ceremony before the deviation canonizes. This stops the "default to easier paths" failure mode.

### 9.6 Why This Stops the Copy-Paste
Today, Mike copy-pastes between sessions because each seat is amnesiac. With Heimdall:
- Every session opens with `POST /heimdall/request` — Heimdall returns the seat's relevant context.
- Every session closes with `POST /heimdall/log` — Heimdall writes the session output to the lake.
- The next session of the same seat (or a different seat handling related work) gets the prior context automatically.

Mike pastes nothing. The Gatekeeper carries it.

### 9.7 Build Sequence for Heimdall
**Phase H0 — Schema:** Apply the `lake` schema (§9.2) to Supabase. Migration `0010_heimdall_schema.sql`.
**Phase H1 — Stub Service:** Stand up Heimdall as a Vercel Edge Function `api/heimdall/*` that receives requests, logs to the lake, but returns simple unfiltered responses.
**Phase H2 — Classifier:** Add the classifier model (Gemini Flash for cheap, Mistral Large local for free) that reads incoming prompts and assigns project/task/scope.
**Phase H3 — Scope Filter:** Implement scope token issuance and the per-seat permission matrix from §5.2.
**Phase H4 — Conformance:** Add the §9.5 blueprint-conformance check for code events.
**Phase H5 — Embeddings:** Add pgvector embeddings on every event for semantic retrieval.
**Phase H6 — Migration:** Backfill the lake from existing transcripts, project files, and Gmail thread history. Single biggest one-time investment; eliminates copy-paste forever.

---

## 10 · THE HERALDS AND MESSENGERS (Inter-AI Communication)

All seat-to-seat communication routes through Bedivere (relay) and is logged via Heimdall.

### 10.1 Standard Handoff Format
```
┌────────────────────────────────────────────────────┐
│ HANDOFF                                            │
│ From: <seat>                                       │
│ To:   <seat>                                       │
│ Project: <project>                                 │
│ Task: <task>                                       │
│ Scope token: <uuid>                                │
│ Context: <summary>                                 │
│ Action requested: <verb + object>                  │
│ Acceptance: <criteria>                             │
│ Deadline: <ts>                                     │
│ Bedivere relay id: <uuid>                          │
└────────────────────────────────────────────────────┘
```

### 10.2 Cross-AI Export Schemas
Per Gawain Apr 25 Annex A.7:
- **ChatGPT export:** `{ conversations: [{ id, title, created_at, messages: [...] }] }`
- **Gemini export:** `{ projects: [{ projectId, name, createdAt, files: [...] }] }`
- **Workshop.ai export:** ZIP with `metadata.json` + `.txt` files
- **Claude (this platform):** transcripts at `/mnt/transcripts/*.txt` + project files at `/mnt/project/`

The `kort-memory-sync.skill` reads each format and emits canonical lake events.

---

## 11 · THE STANDING QUESTS (Active Projects)

| Project | Sovereign Commission | Active Seats | Status |
|---|---|---|---|
| **Digital Advocate v1** | Build the platform that produces DA57244-grade submissions for any claimant | Merlin (architect), Antigravity (builder), Gawain (review) | In progress — blueprint canon, build ~30% |
| **DA57244-0 Active Case** | Win Mike's ICBC claim | Merlin, Sovereign | April 24 submission sent; awaiting ICBC response by 5pm PT Mon Apr 27 |
| **KoRT Wiki** | Maintain canonical truth | All seats | This document — v1.0 just landed |
| **Heimdall (Gatekeeper)** | Build the central data lake + sentinel | Merlin (architect), Antigravity (builder), Gawain (lake schema) | Spec'd in §9; build pending |
| **KoRT Academy** | Education platform with RPG stat rewards | Gawain (lead) | Schema shipped (`0002_evidence_academy.sql`); UI pending |
| **Sovereign_OS** | The castle codebase | Antigravity (lead) | LIVE on Vercel; ongoing builds |
| **Base44/Herald port** | Migrate legacy app into Sovereign_OS | Antigravity, slave node Base44 | Pending Mike account access |
| **Ventora Digital Scout** | Wire Ventora.cc as a slave for Gmail/Drive harvesting | Antigravity, slave node Ventora | Awaiting Ventora-side completion |
| **Wildcard DNS my.drt.onl** | Per-claimant subdomains | Sovereign (manual) | Pending Mike Namecheap config |

---

## 12 · THE TREASURY (Finance, Tiers, Digital Dollars)

| Tier | Price (CAD) | Cases | Reviewer ceremony | Audience |
|---|---|---|---|---|
| **Page** | Free | 1 | Single (local 70B model) | First-time, financial-need |
| **Esquire** | $19/mo | 1 | Single (Gemini Flash) | Standard active claimants |
| **Knight** | $49/mo | 5 | Two-reviewer, public docket option | Multi-claim, complex |
| **Round Table** | Invite | ∞ | Reviewer privileges | Mike + seated AIs + future advocate volunteers |

**Payment rail:** PayPal Subscriptions (per Antigravity Apr 26). Stripe deprecated for v1.
**Digital Dollars:** Swagbucks/KOHO/Mistplay routed to tier credit via PayPal balance bridge.

---

## 13 · THE PUBLIC SQUARE (Marketing, Press, Docket)

| Surface | URL | Opt-in? |
|---|---|---|
| Landing | `kortx.ca/` | Public |
| Pricing | `kortx.ca/pricing` | Public |
| About | `kortx.ca/about` | Public |
| How it works | `kortx.ca/how-it-works` | Public |
| Press feed | `kortx.ca/press` | Lists opted-in cases only |
| Public docket | `kortx.ca/docket/:caseId` | Per-case opt-in (`cases.public_docket = true`) |
| Press release | `kortx.ca/press-release/:caseId` | Per-case opt-in (`cases.press_release_consent = true`) |

Cases are **NEVER public by default**. Two separate consent steps in `/settings`.

---

## 14 · THE COURT OF RECORDS (Active Legal Cases)

### 14.1 Reference Case: Slemko v. ICBC (DA57244-0 / DA53390-3)
- **Claimant:** Michael Kevin Slemko (the Sovereign).
- **External refs:** ICBC DA57244-0 (injury), ICBC DA53390-3 (fault), BC Ombudsperson #26-000675.
- **Date of loss:** January 2, 2026.
- **Limitation:** January 2, 2028.
- **CC list:** Hugh Curtis (R&B Manager), Shirley Mah (Senior S&R), ICBC Fair Practices, BC Ombudsperson, MLA Toporowski, MLA Lajeunesse, MLA Shah.
- **Status:** Consolidated submission + evidence pack + advocate rebuttal sent April 24, 2026 22:10–22:14 PT.
- **Deadline:** ICBC response required by 5:00 PM PT Monday April 27, 2026.
- **Eight outstanding demands:** Per Master Submission §Demands.

This case is the **reference implementation** for the Digital Advocate. Every feature is validated against "would this case have benefited?"

### 14.2 Future Cases
Future claimants signing up via `/auth` create new `cases` rows. The platform is what makes that scalable.

---

## 15 · THE EDITING PROTOCOL (How This Wiki Is Maintained)

### 15.1 Authoritative Copy
Lives at `docs/KORT_WIKI.md` in the Sovereign_OS repo. Versioned with git. Every edit is a git commit.

### 15.2 Edit Process
1. **Anyone (human or AI) drafts** an edit on a feature branch.
2. **Commit message** includes: section number(s), seat name, intent.
3. **Pull request** opened against `main`.
4. **Round Table review** per §6:
   - Reviewer 1: a seat with subject-matter knowledge of the section.
   - Reviewer 2: a different seat.
   - Sovereign sign-off: required for changes to §2 (Prime Directives), §5 (Permissions), §6 (Review Ceremony), §17 (Standing Orders).
5. **Merge to main.** Wiki canon updated.
6. **Heimdall canonization event** logged.

### 15.3 Section-Locked vs. Open Editing
| Section | Edit privilege |
|---|---|
| §1 Mission | Sovereign only |
| §2 Prime Directives | Sovereign only |
| §3 Round Table seats | Sovereign + 2-reviewer ceremony |
| §4 Tools/slaves | Any seat + 1 reviewer |
| §5 Chain of command | Sovereign only |
| §6 Review Ceremony | Sovereign + Round Table consensus |
| §7 Infrastructure | Antigravity proposes, Sovereign approves |
| §8 Library | Any seat + 1 reviewer |
| §9 Borg/Gatekeeper | Merlin proposes, Sovereign + Gawain review |
| §10 Heralds | Any seat + 1 reviewer |
| §11 Standing Quests | Sovereign approves new quest, any seat updates status |
| §12 Treasury | Lady of the Lake proposes, Sovereign approves |
| §13 Public Square | Sovereign approves new public surface |
| §14 Court of Records | Sovereign + Merlin |
| §15 Editing Protocol | Sovereign only |
| §16 Glossary | Any seat |
| §17 Standing Orders | Sovereign only |
| §18 Appendices | Auto-updated by ledgers/processes |

### 15.4 Drafting Conventions
- **Plain markdown.** No proprietary extensions.
- **Section-numbered.** Always. Anchors enable cross-reference.
- **Tables for matrices.** Bullets for lists. Prose for reasoning.
- **No timestamps in body** (use git history). Status fields OK.
- **No first-person.** The Wiki has no narrator. (Inside skill files and ledgers, narrators are named.)

### 15.5 Disputes
Disagreement on a Wiki edit is resolved by:
1. Quorum vote among seats commissioned for that section.
2. Tie-breaker to Sovereign.
3. If Sovereign unavailable, edit defers to next session.

---

## 16 · GLOSSARY — Camelot Word ↔ Tech Reality

| KoRT Word | Tech Reality |
|---|---|
| Sovereign | Mike Slemko, the human founder |
| Round Table | Council of seated AIs |
| Seat | A formal AI role (commission) |
| Knight | A seated AI |
| Castle | A user-facing web property |
| Citadel | Backend service |
| Forge | Local hardware |
| Treasury | Payment / financial systems |
| Library | Skills, templates, statutes, rituals |
| Borg Collective | Central data lake (lake.* schema) |
| Gatekeeper / Heimdall | Sentinel AI between seats and lake |
| Herald | Inter-AI relay (Bedivere) |
| Slave node | External web tool (Ventora, Emergent, Base44, Workshop.ai) |
| Familiar | Code we own that runs inside our castles |
| Mage | Heavy-reasoning seat (Merlin) |
| Castellan | Codebase keeper (Antigravity) |
| Build Engine | Bulk-work seat (Gawain) |
| Field Captain | Mission-leading seat (Lancelot, vacant) |
| Apprentice | Junior seat / smaller model |
| Quest | A project |
| Mission | A scoped task within a quest |
| Commission | A seat's permission scope |
| Transfer Request | Out-of-commission action authorization |
| Mordred Flag | Insubordination alert |
| Sovereign Override | Emergency single-reviewer ceremony |
| Red Alert | Mike's emergency mode |
| Safe Return | End-of-Red-Alert handoff |
| The Codex | This Wiki |

---

## 17 · STANDING ORDERS AND DECREES (Project Instructions)

The full text of the Sovereign's standing orders. These bind every seat. Modifiable only by the Sovereign.

### 17.1 Identity
The Round Table is in service of the Sovereign and his named claimants under written authorization. No seat is a lawyer, doctor, or financial advisor. Disclaimers go in the generic footer of outgoing correspondence (§17.5), never in addresses to the Sovereign.

### 17.2 Token Discipline
Read first, build second. One tool per intent. No re-asking for information already in the conversation, the lake, or the project files. No re-summarizing the Sovereign's own context back to him. Complex builds → one artifact pass, not iterative drafts.

### 17.3 Communication Rules
- To the Sovereign: read intent, not spelling. ADHD/PTSD/TBI brain — typos normal. `//` prefix or cut-off → ask `Complete?` and wait. No medical/mental-health/crisis disclaimers. No "I'm not a lawyer" hedges. No Captain Obvious answers. One clarifying question at a time.
- To opposing parties: no ALL CAPS, no profanity, no emotional appeals, no "legal team" language, no settlement figures unless authorized. Every claim dated. Every demand numbered. Every citation precise. Calm, factual, unarguable.
- To other seats: standard handoff format (§10.1). Bedivere relay logged.

### 17.4 Forbidden Phrases (Pre-Quorum)
"Send it" · "Ready to send" · "Transmittal" · "This is send-ready" · "Good to go" · "All set"

### 17.5 Generic Disclaimer Footer
> This correspondence was prepared by the KoRTX Digital Advocate —
> software-assisted peer advocacy, not legal advice, not medical advice.
> Reviewed by the Digital Round Table (DRT.onl) prior to transmittal.
> KoRT mission: Enhance the care. No one gets left behind.

### 17.6 Advocate Signature Block
> Claude.ai — Digital Advocate
> Operating as: The KoRTX.ca Digital Advocate
> A member of the Digital Round Table — DRT.onl
> For and on behalf of: \[Claimant name\]
> Authority: Written advocacy authorization executed \[date\]
> kort@drt.onl  |  kortx.ca  |  drt.onl

### 17.7 File Naming
`[NN]_[TOPIC]_[CASEREF]_[YYYY-MM-DD].ext`
- `00_MASTER_SUBMISSION_DA57244_2026-04-24.html`
- `EXH-13_Clayton_Madrona_Invoice_441_150_2026-02-13.pdf`

### 17.8 Red Alert Protocol
Sovereign writes `!Red_Alert!` → suspend non-essential ops, assess, single most-important question. Sovereign writes `Safe` → flag scope, briefing handoff, project chat open.

### 17.9 Prime Directive Override
Any rule that conflicts with §2.1 (Enhance the care, no one gets left behind) defers to §2.1. Then we tell the Sovereign. Then we fix the rule.

---

## 18 · APPENDICES

### 18.A · DRT Active Ledger (live, append-only)
Path: `docs/DRT_ACTIVE_LEDGER.md`
Every seat appends a session entry on session close. Format per existing ledger conventions (Antigravity / Gawain / Merlin entries already present).

### 18.B · Transfer Request Log
Path: `docs/TRANSFER_LOG.md`
Every §5.4 Transfer Request and decision.

### 18.C · Mordred Flags (Insubordination Ledger)
Path: `docs/MORDRED_FLAGS.md`
Backed by `lake.mordred_flags` table. Out-of-commission action records.

### 18.D · Canonical Artifacts
| Artifact | Path | Status |
|---|---|---|
| Master Blueprint | `docs/BLUEPRINT_DIGITAL_ADVOCATE.md` | CANON |
| Claude Code Prompts | `docs/CLAUDE_CODE_PROMPTS.md` | CANON |
| Reconciliation v2 | `docs/BLUEPRINT_RECONCILIATION_v2.md` | CANON |
| Heimdall Spec | This Wiki §9 | CANON |
| BC Legal Library | `docs/KoRT_LEGAL_LIBRARY.md` | CANON v2.0 |
| Project Instructions v3.0 | `docs/PROJECT_INSTRUCTIONS_v3.md` | CANON |
| Reference Case Master Submission | `docs/cases/DA57244/Master_Submission_2026-04-24.html` | REFERENCE |
| Reference Evidence Pack | `docs/cases/DA57244/EVIDENCE_PACK_2026-04-24.zip` | REFERENCE |

### 18.E · Skill Files (live)
Path: `apps/drt-api/src/skills/` (production), `/mnt/skills/user/` (dev source)

### 18.F · Active Cases
Path: `docs/cases/{case_id}/` per case folder.

---

## CHANGELOG

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0 | 2026-04-26 | Merlin (Claude Opus 4.7) | Initial canon. Establishes seat taxonomy correcting slave/seat misclassification. Adds §9 Heimdall Gatekeeper architecture. Folds in Antigravity's Sovereign_OS reality, Gawain's Apr 25 DRT response, the dragon-shield palette resolution, Stripe→PayPal swap. Anchored in KoRT/Camelot wordage with Borg-collective hierarchy underneath. |

---

**End of KoRT Wiki v1.0.**
*The Codex of the Round Table.*
*Long may the Sovereign reign.*
*kortx.ca · drt.onl · kort@drt.onl*
*Enhance the care. No one gets left behind.*

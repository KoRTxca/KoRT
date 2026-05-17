# ⚔️ KoRT ECOSYSTEM — MASTER PROJECT MAP v1.0
**Last Updated:** 2026-05-03 | **Maintainer:** Antigravity (IDE Seat)

---

## Architecture Overview

```
                    ┌─────────────────────────────────┐
                    │     SOVEREIGN DATA LAKE          │
                    │  (Supabase + Heimdall Logging)   │
                    └──────────┬──────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼────────┐ ┌────▼─────┐  ┌───────▼──────┐
    │   ClickUp Sync   │ │  .env    │  │ Master Wiki  │
    │  (Kanban/AI/Human│ │  (SoT)   │  │  (MkDocs)    │
    │   shared view)   │ │          │  │              │
    └─────────┬────────┘ └────┬─────┘  └───────┬──────┘
              │               │                │
    ┌─────────▼───────────────▼────────────────▼──────┐
    │            MISSION CONTROL MONOREPO              │
    │      D:\KoRT_Command_Center\Mission_Control      │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
    │  │KoRT_Claw │  │Web Portal│  │ Digital  │       │
    │  │(Automate)│  │(kortx.ca)│  │ Dollars  │       │
    │  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
    │       │              │              │             │
    │  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐       │
    │  │ Advocate │  │  Health  │  │  Wiki    │       │
    │  │ (Legal)  │  │(Wellness)│  │ (Docs)   │       │
    │  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
    │       │              │              │             │
    │  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐       │
    │  │ Recovery │  │ KoRT OS  │  │ Quarter- │       │
    │  │ Fork     │  │ (Linux)  │  │ master   │       │
    │  └──────────┘  └──────────┘  └──────────┘       │
    │                                                  │
    └──────────────────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    VULTR VPS        │
                    │  Docker Fleet +     │
                    │  Ollama (Merlin)    │
                    └─────────────────────┘
```

---

## Project Inventory

### 🔧 KoRT_Claw (Sovereign Automation Engine)
| Item | Value |
|:---|:---|
| **Path** | `apps/kort-claw/` |
| **Status** | v1.0 Core Engine + GUI Delivered |
| **Tech** | Python, Playwright, CustomTkinter |
| **Modules** | Vultr API, Vercel, GitHub, Namecheap DNS, ClickUp, File Scanner, Site Tester |
| **Next** | Cross-platform packaging (PyInstaller), Download page on kortx.ca, Account Discovery module |
| **Depends On** | `.env` credentials, Chrome user profile, Playwright Chromium |
| **Feeds Into** | ClickUp (task sync), Supabase (results logging), Web Portal (downloads page) |

### 🌐 Web Portal (kortx.ca)
| Item | Value |
|:---|:---|
| **Path** | `apps/web-portal/` |
| **Status** | Live (last deploy Apr 27), www.kortx.ca returns 404 |
| **Tech** | React/Vite, deployed to Vercel |
| **Next** | Fix www DNS, add /downloads page, member dashboard, Digital Dollars guide |
| **Depends On** | Vercel, Namecheap DNS, Supabase auth |
| **Feeds Into** | All sub-apps (entry point), Member onboarding |

### 💰 Digital Dollars
| Item | Value |
|:---|:---|
| **Path** | `apps/dollars/` |
| **Status** | Affiliate checklist complete, earning guide page not yet built |
| **Tech** | React, Supabase ledger |
| **Next** | Build earning guide page, collect affiliate codes via KoRT_Claw, wire payout calculator |
| **Depends On** | KoRT_Claw (account discovery), Supabase (ledger), Web Portal (hosting) |
| **Feeds Into** | Revenue engine, member retention, Quantum Optimizer (DD rewards) |

### ⚖️ Digital Advocate
| Item | Value |
|:---|:---|
| **Path** | `apps/advocate/` |
| **Status** | KoRT_Scribe + KoRT_Crawler + Analyzer migrated. ICBC case study #1 in progress |
| **Tech** | Python (CustomTkinter GUI), OCR (Tesseract), PDF parsing |
| **Next** | ICBC dispute bot, Digital Sentinel (PI) module, evidence timeline builder |
| **Depends On** | KoRT_Crawler (evidence gathering), Supabase (case database) |
| **Feeds Into** | Member advocacy services, case study library |

### 🏥 Digital Health
| Item | Value |
|:---|:---|
| **Path** | `apps/health/` |
| **Status** | Blueprint — 15 wellness missions designed |
| **Tech** | React, voice-first (Quantum-Voice-Bridge) |
| **Next** | Build mood snapshot, family logs, Cowichan farm-stress missions |
| **Depends On** | Quantum-Voice-Bridge, Supabase (health vault), Quantum Optimizer (mission rewards) |
| **Feeds Into** | Member wellness tracking, DD payouts |

### 📜 Master Wiki
| Item | Value |
|:---|:---|
| **Path** | `apps/master-wiki/` |
| **Status** | MkDocs Material configured, KoRT-quantum-aurum-master-v2.0 committed |
| **Tech** | MkDocs, Material theme, Markdown |
| **Next** | Deploy to scribe.kortx.ca, add all project docs, SOPs, and handoff protocols |
| **Depends On** | Docker or Vercel (hosting), sovereign_directives.md (source of truth) |
| **Feeds Into** | AI context (all agents read wiki), member knowledge base |

### 🛡️ Recovery Fork
| Item | Value |
|:---|:---|
| **Path** | `apps/bridges/` (Sphere 5 isolation) |
| **Status** | Blueprint — isolated container design |
| **Tech** | Docker (isolated), Supabase RLS |
| **Next** | Design sponsor matching algorithm, build redacted data layer |
| **Depends On** | Docker fleet (Vultr VPS), Supabase RLS policies |
| **Feeds Into** | Member recovery support, community partnerships |

### 🐧 KoRT OS (Linux Distribution)
| Item | Value |
|:---|:---|
| **Path** | `apps/kort-flutter-os/` (Flutter UI) + build scripts TBD |
| **Status** | Flutter OS started at `D:\KoRT\Workspace\kort-flutter-os\` |
| **Tech** | Ubuntu/Debian base, Flutter desktop UI, Docker, Ollama |
| **Next** | Custom ISO build with KoRT branding, GRUB splash, pre-installed toolchain, USB bootable |
| **Depends On** | Linux build environment (WSL or Vultr), Flutter desktop |
| **Feeds Into** | Hardware deployment, offline-first architecture, USB mirror strategy |

### 🧠 Quantum Optimizer
| Item | Value |
|:---|:---|
| **Path** | `apps/quantum-optimizer/` |
| **Status** | Worker exists, mission assignment logic started |
| **Tech** | TypeScript/Node |
| **Next** | Connect to all micro-apps for mission dispatch, wire DD reward payouts |
| **Depends On** | Supabase (mission queue), all micro-apps (mission providers) |
| **Feeds Into** | Gamification layer, member engagement, revenue distribution |

### 🤖 Quartermaster Bot
| Item | Value |
|:---|:---|
| **Path** | `apps/quartermaster/` |
| **Status** | Planned |
| **Tech** | Python, LLM Audit Framework |
| **Next** | Build audit engine, wire to DRT seat outputs |
| **Depends On** | All app logs, ClickUp, Master Wiki |
| **Feeds Into** | System integrity, prompt engineering, dependency management |

---

## Integration Points

| From | To | Method | Status |
|:---|:---|:---|:---|
| All Projects | ClickUp | REST API (sync_to_clickup.ps1 / KoRT_Claw) | 🔶 Token needed |
| All Projects | Supabase | Service key in .env | ✅ Connected |
| All Projects | .env | Single source of truth for credentials | ✅ Active |
| KoRT_Claw | Namecheap | Playwright browser automation | ✅ Built |
| KoRT_Claw | Vultr | REST API (Bearer token) | ✅ Working (0 instances) |
| KoRT_Claw | Vercel | Playwright browser automation | ✅ Built |
| KoRT_Claw | GitHub | Playwright browser automation | ✅ Built |
| Web Portal | Vercel | Git push deploy | ✅ Active |
| Master Wiki | Docker/Vercel | MkDocs build | 🔶 Not deployed |
| All AI Agents | Master Wiki | Read SOPs at session start | 🔶 Protocol defined |
| All AI Agents | ClickUp | Read/write tasks at session start/end | 🔶 Token needed |

---

## Priority Execution Order

1. **🔴 CRITICAL — Fix www.kortx.ca DNS** (5 min via KoRT_Claw)
2. **🔴 CRITICAL — Provision Vultr VPS** (API call, ~3 min)
3. **🔴 CRITICAL — ClickUp Token Retrieval** (KoRT_Claw browser module)
4. **🟠 HIGH — Deploy fresh Web Portal build** (Vercel)
5. **🟠 HIGH — KoRT_Claw cross-platform packaging** (PyInstaller)
6. **🟠 HIGH — Digital Dollars earning guide page**
7. **🟠 HIGH — Master Wiki deployment to scribe.kortx.ca**
8. **🟡 MEDIUM — KoRT OS ISO build kickoff**
9. **🟡 MEDIUM — Member contribution guide (CONTRIBUTING.md)**
10. **🟢 LOW — Recovery Fork isolated container design**

---

*This document is the master reference for all project interconnections. Every AI agent SHALL consult this map before starting work to understand dependencies and avoid duplicate effort.*

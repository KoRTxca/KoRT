KoRTx — Complete Architecture & Launch Package
Knights of the Round Table | Digital Round Table Ecosystem
Date: 2026-05-01

TABLE OF CONTENTS
1. Git Cleanup & Consolidation Strategy
2. Digital Sponsor — Full Spec (Voice-to-Voice & Crisis Mode)
3. Memory Mesh — Architecture & Integration
4. Public Trust Quorum — Technical Deep Dive
5. Health Center — Experience Design & Biometric Loop
6. Digital Dollars — Economy & Fiat Bridge
7. AR/VR Expansion — Immersive Kingdom Vision
8. Crisis Response System — Merlin Bot Mode
9. Launch Roadmap — Phased Rollout
10. Consolidated JSON Export
11. Deployment Commands & Next Steps
12. The Quartermaster Bot — System Integrity & Data Correlation
13. DRT SalesWizard — Member Funnel Builder Spec

# GIT CLEANUP & CONSOLIDATION STRATEGY
**Objective**
Download current state of all KoRTx repositories, eliminate deprecated code, merge best features from all accounts (DRT seats, AI tools), and prepare a unified codebase for launch.

**Process**
```bash
Clone all repos
git clone git@github.com:KoRTx/drt-onl.git
git clone git@github.com:KoRTx/drt-social.git
git clone git@github.com:KoRTx/digital-sponsor.git
git clone git@github.com:KoRTx/ai-quorum.git
git clone git@github.com:KoRTx/memory-mesh.git
git clone git@github.com:KoRTx/digital-dollars.git
git clone git@github.com:KoRTx/health-center.git
git clone git@github.com:KoRTx/advocate.git

Create unified repo
mkdir KoRTx-unified
cd KoRTx-unified
git init

Structure
mkdir -p apps/{drt-onl,drt-social,digital-sponsor,ai-quorum,memory-mesh,digital-dollars,health-center,advocate}
mkdir -p shared/{gatekeeper,quorum-core,context-capsule,ar-engine,crypto-layer}
mkdir -p infra/{kubernetes,terraform,docker,monitoring}
mkdir -p docs/{architecture,api,onboarding,compliance}
```

**Deprecation Rules**
- Remove any code not supporting the unified architecture.
- Eliminate direct API calls that bypass the Quorum Gatekeeper.
- Replace all single-model AI calls with Quorum-chamber patterns.
- Standardize on TypeScript for backend, React/Next.js for frontend, Rust for performance-critical Quorum operations.
- All AI interactions must route through Gatekeeper — no exceptions.

# DIGITAL SPONSOR — FULL SPEC
**Core Purpose**
24/7 AI recovery sponsor with voice-to-voice communication, video chat capability, and escalation to human sponsors. Replacement for the "Digital Detox" concept — now explicitly branded as The Digital Sponsor.

**Architecture**
**Voice-to-Voice Pipeline**
```text
User Mic → Speech-to-Text → Context Capsule Injection → Quorum Chamber → Gatekeeper → Text-to-Speech → Audio Output
                                                                                    ↓
                                                                              Voice Clone Model
                                                                           (User's Sponsor Persona)
```

- STT: Whisper Large v3 (self-hosted)
- TTS: XTTS-v2 with voice cloning for sponsor persona consistency
- Latency Target: <500ms end-to-end for natural conversation
- Fallback: If network degraded, local edge model handles basic sponsor interactions

**Merlin Bot Mode — Crisis Monitoring**
Named for the wizard advisor archetype. Activated during high-risk scenarios.

```text
┌─────────────────────────────────────────┐
│           MERLIN BOT MODE               │
├─────────────────────────────────────────┤
│  INPUTS:                                │
│  • Ambient audio classification         │
│  • Speech sentiment analysis            │
│  • Biometric stream (HRV, GSR, temp)    │
│  • GPS & geofence data                  │
│  • User-initiated panic signal          │
├─────────────────────────────────────────┤
│  OUTPUTS:                               │
│  • Real-time sponsor guidance           │
│  • Escalation to human sponsor network  │
│  • Emergency services dispatch (opt-in) │
│  • Post-crisis debrief & memory logging │
└─────────────────────────────────────────┘
```

**Crisis Detection Triggers**
| Signal | Threshold | Response |
|--------|-----------|----------|
| Slurred speech pattern | Confidence >80% | Merlin mode activates, gentle check-in |
| Elevated heart rate + no movement | >120 BPM for 5 min | Initiate voice call |
| Geofence breach (bar, known trigger zone) | Entry detected | Proactive check-in + distraction offer |
| User keyword ("can't do this," "help") | Detected via STT | Immediate intervention, escalate if no response |
| Inactivity during crisis protocol | >2 min no response | Alert emergency contact or services |

**Voice-to-Voice Session Flow**
1. User initiates (or system detects need) → Sponsor persona appears on video (or audio only)
2. Grounding check-in: "Knight [Name], I'm here. What's happening right now?"
3. Active listening: Quorum analyzes sentiment, intent, risk level
4. Intervention: Sponsor guides through grounding protocol (breathing, 5-4-3-2-1 sensory, reframing)
5. Resolution or escalation: If de-escalated → log victory, award Digital Dollars, update Memory Mesh. If not → offer human sponsor connection or emergency protocol
6. Post-session: Sponsor sends a follow-up message within 2 hours

**AI-to-Human Video Chat**
- Sponsor persona rendered as animated avatar (Unreal Engine MetaHuman or simpler 2D Live2D pipeline depending on client device)
- Lip sync via Rhubarb or Wav2Lip
- Emotion expression mapped from sentiment analysis output
- User can toggle between: Audio Only / Animated Avatar / Voice Clone Call

# CONSOLIDATED JSON EXPORT

```json
{
  "project": "KoRTx",
  "version": "2.0.0-unified",
  "lastupdated": "2026-05-01",
  "repositories": {
    "primary": "github.com/KoRTx/unified",
    "apps": {
      "drtonline": {"status": "active", "path": "apps/drt-onl"},
      "drtsocial": {"status": "active", "path": "apps/drt-social"},
      "digitalsponsor": {"status": "prioritydeploy", "path": "apps/digital-sponsor"},
      "aiquorum": {"status": "active", "path": "apps/ai-quorum"},
      "memorymesh": {"status": "active", "path": "apps/memory-mesh"},
      "digitaldollars": {"status": "active", "path": "apps/digital-dollars"},
      "healthcenter": {"status": "planning", "path": "apps/health-center"},
      "advocate": {"status": "active", "path": "apps/advocate"}
    },
    "shared": {
      "gatekeeper": "shared/gatekeeper",
      "quorumcore": "shared/quorum-core",
      "contextcapsule": "shared/context-capsule",
      "arengine": "shared/ar-engine",
      "cryptolayer": "shared/crypto-layer"
    }
  },
  "namingconventions": {
    "brand": "Knights of the Round Table (KoRTx)",
    "aiecosystem": "AI Quorum",
    "primaryaiinterface": "Gatekeeper",
    "recoveryapp": "Digital Sponsor",
    "crisismode": "Merlin Bot Mode",
    "decisionforum": "Digital Round Table (DRT.onl / DRT.social)",
    "economy": "Digital Dollars (DD)",
    "knowledgesystem": "Memory Mesh",
    "meetingspace": "Bridge Crew Briefing Room",
    "philosophy": "IDIC + Chivalry Code"
  },
  "prioritydeployment": {
    "feature": "Voice-to-Voice Digital Sponsor with Merlin Bot Mode",
    "targetusers": ["Dallas", "Immediate Circle"],
    "services": ["whisper-stt", "xtts-v2", "merlin-monitor", "webrtc-signaling"],
    "timeline": "immediate"
  },
  "quorummodels": {
    "minimumcount": 3,
    "recommendedcount": 5,
    "architectures": ["Llama", "Mistral", "Falcon"],
    "specializations": ["general", "adversarial", "factuality", "domainspecific"],
    "gatekeeper": "separatemodel"
  },
  "arreadiness": {
    "current": "Kingdom-themed flat UI with spatial primitives",
    "next": "WebXR immersive rooms (Q3 2026)",
    "future": "Persistent AR overlay with glasses (Q4 2027)"
  },
  "quartermaster": {
    "status": "planned",
    "role": "Centralized Auditor & Data Correlator",
    "tasks": [
      "Work output audit",
      "Dependency health check",
      "LLM training data correlation",
      "Artificial People logic updates"
    ]
  },
  "saleswizard": {
    "status": "prototype",
    "stack": "React + FastAPI",
    "features": [
      "Zero-cost cascading router",
      "KoRTx SSO gated",
      "Multi-format HTML export"
    ]
  }
}
```

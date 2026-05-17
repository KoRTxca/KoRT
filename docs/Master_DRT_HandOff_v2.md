# KoRT Master DRT Handoff (v2.0)
Date: 2026-05-03
Status: Draft
Audience: KoRT Claw extensions, Merlin, OpenCode, Copilot, PS, Claude, ClickUp integration

Overview
- This document formalizes the DRT handoff protocol for all KoRT Claw actions and the governance policy around them.
- It follows the Completionist, Door Number Three, Hive Mind Continuity, Member-First, and Ecosystem Integration laws from the Master Wiki v2.0.

Structure
- Section 1: Handoff Summary
- Section 2: Actions Performed (Phase 0/Phase 1) with rationale
- Section 3: Conflicts & Resolution
- Section 4: Dependencies & Prerequisites
- Section 5: Next Steps & Future Enhancements
- Section 6: Appendices (Prompts, API references, sample patches)

Template: Completionist Hand-off (example)
```
KoRT HANDOFF — KoRT Claw Extension — 2026-05-03
WHAT I BUILT: Discovery/Import/Refactor workers skeleton, GO read-only watch, audit logs
WHAT I FILLED IN: Created policy DSL, consent prompts, audit logs, handoffs skeleton
CONFLICTS FOUND & RESOLVED: None (Phase 0 is read-only)
DEPENDENCIES SATISFIED: Node/Python runners, GO skeleton, prompts bundle
CONNECTED TO NEXT STEPS:
  → Immediate: Enable dry-run mode and display inventory_diff.json
  → Suggested: Expand RefactorWorker to support non-destructive code health checks
  → Prepared: Hand off patch sets to apply with explicit approvals
PRODUCTION READY: YES (with read-only gating on future actions) 
PASSED TO: Merlin / OpenCode / Copilot / PS / Claude
```

Appendix A: Prompts Pack (GO-GHOST prompts)
- Merlin prompts: crisis detection, daily tips, governance reminders
- OpenCode prompts: patch generation, safe refactoring suggestions
- Copilot prompts: lint-first, dedupe, and non-destructive changes
- PS Agent prompts: archiving prompts with a safe, reversible flow
- Claude prompts: knowledge distribution and wiki updates

Appendix B: API & Connectors (reference only)
- GitHub API for patches
- Vercel/Netlify hooks for deployment (requires consent)
- Supabase API for login and memory lake (consent gating)

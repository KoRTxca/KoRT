# 🧬 SKILL: KoRT Premium Portal Generation (Quantum Aurum v2.0)

**Date:** 2026-05-03
**Author:** Antigravity (Castellan)
**Status:** Canonical Design Standard
**Version:** 1.0

## 1. PURPOSE
To generate high-fidelity, sovereign "Mission Control" dashboards for any monorepo or project within the KoRT network. This skill codifies the "Quantum Aurum" aesthetic—a blend of glassmorphism, deep space gradients, and gold/cyan accents.

## 2. DESIGN PHILOSOPHY
- **Glassmorphism:** Use `backdrop-filter: blur(20px)` and semi-transparent backgrounds (`rgba(10, 12, 18, 0.7)`).
- **Aurum Accents:** Gold (`#d4af37`) used for borders, headers, and key CTAs.
- **Quantum Glow:** Subtle cyan (`#00f2ff`) for interactive elements and "Sanctuary" protocols.
- **Typography:** 'Outfit' for body text, 'Space Grotesk' for headers.
- **Non-Linear Layout:** Use asymmetrical grids and fixed sidebar navigation for a "Command Center" feel.

## 3. COMPONENT REGISTRY
### A. The Dashboard Card
```css
.card {
    background: rgba(10, 12, 18, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 175, 55, 0.15);
    border-radius: 32px;
    padding: 3rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### B. The FileSystem Index
- Must differentiate between **Canonical** (`/apps`, `/skills`) and **Staging/Legacy** (root icons).
- Must include a **Sanctuary Protocol** section for personal data protection.

### C. Branding Tokens
- `primary-bg`: `#050608`
- `aurum-gradient`: `linear-gradient(135deg, #d4af37 0%, #f9d71c 100%)`
- `quantum-blue`: `#0066ff`
- `status-online`: `#00ff88`

## 4. GENERATION LOGIC (PSEUDO-CODE)
1. **Scan Workspace:** Identify directories (`apps`, `skills`, `shared-assets`).
2. **Read Metadata:** Parse `pubspec.yaml`, `package.json`, or `.md` files for status and descriptions.
3. **Apply Template:** Inject discovered data into the Quantum Aurum HTML template.
4. **Deploy Background:** Use `shared-assets/branding/portal_bg.png` (8k AI-generated).
5. **Finalize:** Output as `MISSION_CONTROL.html` in the target root.

## 5. CLAUDE DESIGN INTEGRATION
To interface with Claude Design (Artifacts), provide a React-based implementation of this design system.
- **Exportable File:** `KoRT_Design_System.jsx`
- **Import Method:** Paste into Claude Artifacts window to initialize the branding.

---
**"Everything must look like this or better. No exceptions."**
*Signed: Antigravity*

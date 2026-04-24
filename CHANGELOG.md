# Sovereign OS Changelog

All notable changes to the KoRT Digital OS will be documented in this file. 
As mandated, old versions are preserved, and new logic enters pre-release before integration.

## [Release: 2.2.0] - 2026-04-23
### Added
- **Content API Orchestrator (`contentApi.js`)**: Integrated utility for dynamic fetching of text (OpenAI), images (Unsplash), and video (Pexels) content.
- **Link Validator Script (`check-links.js`)**: Automated verification of all internal project links to prevent dead ends.
- **CodeRabbit Integration**: Added `.coderabbit.yaml` for AI-powered code reviews and quality gates.
- **High-Fidelity Assets**: Generated and deployed cinematic portraits for all character classes (Admiral, Captain, Sentry, etc.).
- **Premium Design System**: Enhanced `index.css` with gothic-tech design tokens, glassmorphism, and cinematic animations.

### Fixed
- **Navigation Integrity**: Resolved broken links across `Advocate.jsx`, `WatchPage.jsx`, and `CasesList` components.
- **Asset Routing**: Standardized image paths in `WatchPage` to use optimized high-quality assets.


## [Pre-Release: 0.8.0] - 2026-04-10
### Added
- **The Merlin Bridge (`SovereignLLM.js`)**: Direct API hook via `@gradio/client` to the `meta-llama/Meta-Llama-3.1-70B-Instruct` endpoint deployed on HuggingFace.
- **The Advocate UI Revision (`Advocate.jsx`)**: Deployed an interactive Chatbot interface connecting directly to the sovereign LLM backend, handling Crisis Resolution parameters natively.

## [Release: 0.7.5] - 2026-04-10
### Added
- **The Owner's Table Upsell (`UpsellOffer.jsx`)**: High-converting $497 ($5,995 value) Mastermind e-commerce funnel integrated immediately following character generation.
- **Diablo 2 Aesthetic Interface (`CharacterCreation.jsx`)**: Complete frontend graphics overhaul utilizing generated gothic avatars (Paladin, Wizard, Rogue) and an RPG stats-card rendering component.
- **Warrior Forum Secure Gate (`BetaWaitlist.jsx`)**: Enforced a strict `/beta` pipeline and locked all internal OS features behind a session-based Private Route.

## [Release: 0.5.0] - Genesis Build
- Base44 logical core, Vercel CI/CD linking, and Vault extraction scripts deployed.

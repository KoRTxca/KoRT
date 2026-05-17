# ⚓ KoRT Shipyards: Shipping & Logistics Manifest

This manifest tracks the lifecycle of every "Ship" (app, project, or infrastructure unit) in the KoRT ecosystem.

## 🗺️ Resource Mapping

### Zone 0: The Yard (Local Dedicated Hardware)
- **Primary Host**: Local Dedicated PC
- **Role**: AI Inference (Ollama), Secure Workspace, Core Splicing
- **Status**: 🟢 OPERATIONAL

### Zone 1: Dry Dock (Namecheap Business Hosting)
- **Domains**: `kortx.ca`, `drt.onl`, `drt.social`
- **Role**: Static Frontend, Wildcard Subdomain Reservations, Email, Staging
- **Status**: 🟡 CONFIGURING WILDCARDS

### Zone 2: The High Seas (Vultr Production)
- **Role**: Hardened Backend, API Services, Multi-domain Production
- **Targets**: `drt.social`, `drt.onl`
- **Status**: 🔴 PENDING GIT INSTALLATION (IP Required)

---

## 🏗️ Active Shipyards (Current Projects)

### 1. IDE Forge (Ship #1)
- **Description**: Cross-IDE configuration sync (VSCode, VSCodium, Zed).
- **Goal**: Auto-provision themes, extensions, and snippets.
- **Status**: 🟢 BUILD COMPLETE (`skills/ide_forge.py`)

### 2. SalesWizard (Ship #2)
- **Description**: Sovereign funnel builder.
- **Path**: `Apps/sales-funnel`
- **Deployment**: Routing via Namecheap -> Vultr.
- **Status**: 🟡 RE-CONFIGURING FOR MULTI-TENANT

### 3. Digital Round Table (Ship #3)
- **Description**: `drt.social` & `drt.onl` branding and agent provisioning.
- **Components**: `kortx-provision.php`, AI Search Plugin.
- **Status**: 🔍 LOCATING AI SEARCH PLUGIN

---

## 🛠️ Requisition Orders (Pending Consent)

| ID | Description | Resource | Cost | Status |
| :--- | :--- | :--- | :--- | :--- |
| REQ-001 | Multi-domain Git Install | Vultr SSH | $0 | PENDING IP |
| REQ-002 | Wildcard DNS Reservation | Namecheap API/UI | $0 | PENDING CONSENT |

---

> [!IMPORTANT]
> **ABSOLUTE LAW**: No financial action without human consent. Requisition orders must be filed above.

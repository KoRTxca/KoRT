# KoRT OS (Linux) Build Plan & Checklist

This document tracks the steps required to transition from the current Windows staging environment to the 100% Sovereign Custom Ubuntu Linux ISO (`kort-os:v1.2`).

## Phase 1: Custom Ubuntu ISO Generation (Cowichan Bay Build)
- [ ] Install `cubic` (Custom Ubuntu ISO Creator) or `live-build` on a Linux VM.
- [ ] Base Image: Ubuntu 24.04 LTS Desktop.
- [ ] Pre-install system packages: `git`, `docker.io`, `meshtastic`, `curl`, `wget`.
- [ ] Inject `setup.sh` installer directly into the ISO `/etc/skel` to execute on first boot.

## Phase 2: IDE & SSO Pre-Bake
- [ ] Pre-install VSCodium (`codium`).
- [ ] Compile `kort-ide` plugin using `npm run compile` and package it as a `.vsix` file.
- [ ] Pre-install `kort-ide.vsix` into VSCodium via CLI (`codium --install-extension kort-ide.vsix`).
- [ ] Embed Keycloak Docker container in the ISO to handle local OIDC SSO authentication.

## Phase 3: Hardware Burn & Mesh Testing
- [ ] Flash the custom ISO to USB using Balena Etcher or Rufus.
- [ ] Boot 2 local laptops from the USB drives in Cowichan Bay.
- [ ] Run the `meshtastic` handshake test script to verify LoRa connectivity.
- [ ] Execute `npx supabase start` offline to confirm the Spherical 0-5 database replicates over the mesh.

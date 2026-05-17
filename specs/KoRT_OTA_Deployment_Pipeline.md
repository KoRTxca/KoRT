# 🚀 KoRT SOVEREIGN PIPELINE & OTA DEPLOYMENT (V1.0)

## 1. THE CI/CD DEPLOYMENT PIPELINE
We have established a Sovereign Gatekeeper workflow to ensure that rapid AI generation (via Primio or other external agents) never corrupts the production environment.

### The Workflow:
1. **Generation (Primio.dev):** Rapid prototyping and UI generation happen via external AI.
2. **Internal Ingestion:** Code is pulled into the `D:\KoRT_Command_Center` monorepo.
3. **The Codekeeper Audit (KoRT_IDE):** 
   * The code is opened in our Sovereign VS Codium environment (`KoRT_IDE`).
   * The local AI Quorum (Seat 3: Codekeeper) audits the code for security, performance, and adherence to the *Oracle Protocol*.
   * Only the Codekeeper can approve the merge to the `production` branch.
4. **Production Push:** The Xeon Proxmox stack triggers the build and pushes the new binaries/web builds to the global edge nodes.
5. **Client OTA Update:** The 33 KoRT apps receive a ping and attempt to run internal automated updates.

## 2. CENTRALIZED BRANDING & OTA ASSET SYNC
To manage 33 distinct apps efficiently, we will NOT hardcode splash screens or heavy branding assets into the app bundles. 

### The Protocol (Dynamic Offline-First Caching):
* **Central Asset Server:** All master assets (`kort_intro_video.mp4`, `dragon_hero_bg.png`) are hosted on the KoRT web portal (`https://api.kortx.ca/assets/`).
* **The Manifest:** The server maintains an `assets_manifest.json` containing version numbers and checksum hashes for all media.
* **App Boot Sequence:**
  1. App launches and instantly plays the **locally cached** version of the video splash screen.
  2. In the background, it pings the `assets_manifest.json`.
  3. If a newer version of the video/branding exists, it downloads it silently in the background using `flutter_cache_manager` or `dio`.
  4. On the *next* app boot, the new splash screen plays.
* **Offline Mode:** If there is no internet, the background ping safely fails, and the app continues using the cached assets indefinitely.

This allows us to update one MP4 file on the server, and within 24 hours, all 33 apps will automatically display the new splash screen without requiring an App Store/Play Store update.

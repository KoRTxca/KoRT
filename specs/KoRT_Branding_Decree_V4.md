# 🐉 KoRT BRANDING DECREE V4.0 (CYBER-ARTHURIAN)

## 1. THE AESTHETIC: "THE SOVEREIGN STARSHIP"
The overarching aesthetic for the KoRT Nexus, the Web Portal, and all Apps is a collision of **Utopian Fantasy** and **Deep-Space Sci-Fi**. 
We are building a "Command Center Starship" that features old-school Knights of the Round Table elements.

*   **Backgrounds:** Deep space void `#050505` layered with glassmorphic panels.
*   **Starship Accents:** Sleek, brushed metallic borders, neon holographic HUD lines.
*   **Medieval Elements:** Glowing Gold Round Tables (`#c9a84c`), Dragon Blue Banners (`#0033a0`), glowing sword motifs.
*   **Typography:** 
    *   `Cinzel` (Google Fonts) for all Headers and Royal Decrees (The Arthurian touch).
    *   `Share Tech Mono` (Google Fonts) for all HUD elements, numbers, and system logs (The Sci-Fi touch).

## 2. MERLIN HOLOGRAPHIC OVERLAY (LIP-SYNC & 3D)
Merlin is no longer a static image or a text bot. Merlin is a live 3D avatar that floats on the screen.
*   **The Model:** A highly detailed `.glb` / `.gltf` 3D model of a glowing digital wizard.
*   **The Interface:** Merlin lives in a `React Three Fiber` / `Three.js` canvas overlayed on the UI with `pointer-events: none` (except for his bounding box).
*   **The Voice (Lipsync):** As the WebRTC stream feeds audio from our AI server (or live voice), the audio frequency data is processed in real-time. The volume amplitude maps directly to the `jaw` blendshape/morph target of the 3D model, causing Merlin's mouth to move exactly when he speaks.

## 3. ASSET PIPELINE & MEDIA (NO GENERATIVE PLACEHOLDERS)
All components MUST use the official KoRT media assets which are hosted on the live Sovereign Web Portal. DO NOT generate new placeholders or mockups. You MUST use the public web paths for all assets so that external AIs and remote environments can access them globally.

*   **Splash Screen Videos (MP4):**
    *   `/public/kort_intro_video.mp4`
    *   `/public/splash-screen.mp4`
*   **Static Branding & Hero Assets:**
    *   `/assets/branding/kort_dragon_hero_bg.png`
    *   `/assets/branding/merlin_transparent_guide.png`
    *   `/shared-assets/media/KoRTx.ca-Logo-MAIN.jpg`
*   **Merlin 3D Model:**
    *   `/assets/merlin.glb` (Note: Fallback to a procedural glowing orb mesh if the .glb fails to load over the network).

## 4. THE 33 OPEN-SOURCE KNIGHTS (THE QUORUM)
The Round Table seats are powered by local, self-hosted open-source models (Llama 3, Mistral, Phi-3, Qwen) running on our Proxmox Xeon stack.
We do NOT rely purely on OpenAI/Anthropic. We run Ollama locally to power the 33 core seats of the Quorum. They are sovereign and immune to API rate limits.



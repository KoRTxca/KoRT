# Digital Dollars: Game Engine Blueprint & Architecture

## 1. Executive Summary
To scale from 0 to 49+ playable games within the Digital Dollars ecosystem, we are establishing a unified Game Engine Framework. This blueprint ensures all games share core similarities (branding, APIs, ad serving, splash screens), allowing for rapid deployment and enabling the community to build, submit, and monetize their own games.

## 2. Core Game Similarities & Replication
Every game built for the KoRT ecosystem will inherit from a base `KortGameWidget` class in Flutter, which standardizes the following:
*   **Branding & Splash Screens:** Every game automatically launches with a "Quantum Aurum" animated splash screen displaying the KoRT logo and the game title.
*   **Ad Serving (AdMob/Custom):** The wrapper automatically injects a persistent "DD Ad Display Bar" at the top or bottom of the screen. This ensures ads are served consistently without the game developer needing to configure ad tags manually.
*   **API Interactions:** A standardized `RewardEngine` class handles all Supabase interactions to securely credit Digital Dollars (DD) or RTD to the user's wallet when they win or reach milestones.

## 3. User-Generated Games Ecosystem
Instead of only playing games, paid Sovereign Users can become **Architects**.
1.  **SDK & Blueprints:** Users download our `KoRT_Game_SDK`.
2.  **Creation:** They build their game logic inside our provided wrapper.
3.  **Submission & Review:** The game is submitted to the KoRT Quorum for review.
4.  **Monetization Split:** Once approved, the game is added to the `games_screen.dart` directory. When other users play it, the ad revenue generated is split (e.g., 50% to the Creator, 20% to the player in DD, 30% to the KoRT Community Pool).

## 4. The DD Ad Display Bar (Chrome Extension & OS Addon)
To capture value outside of the web portal, we are developing the **DD Ad Display Bar**.
*   **Chrome Extension:** A persistent, minimal bar injected at the top of the browser that displays subtle text/banner ads. As long as it is active, the user earns a slow drip of passive DD.
*   **KoRT_OS Core Addon:** Baked directly into the sovereign OS. This can display unobtrusive ads on the desktop environment.

### 4.1 Steam "Play-to-Earn" Overlay
*   **The Logic:** Users run a lightweight KoRT desktop app while they play their normal Steam games (e.g., CS:GO, Dota, Elden Ring).
*   **The Overlay:** The app uses the Discord/Steam overlay API to inject our "DD Ad Display Bar" into the corner of the game screen. 
*   **The Reward:** Because our ads are displaying while they play, they earn Digital Dollars per hour of gaming, turning their existing Steam library into a passive income stream.

## 5. KoRT Support Radio
A massive community engagement and retention tool.
*   **Concept:** A 24/7 Lo-Fi / Synthwave radio station streaming directly in the Web Portal and Discord.
*   **Integration:** While users listen to the radio or play Steam games with the KoRT Support Radio Discord channel open, the audio stream will periodically play KoRT sponsorships, and the web interface will cycle visual ads. This acts as the central hub for the community to hang out, earn DD, and get support.

# VS Codium Fork: Merlin WYSIWYG Theme Wizard

## 1. Executive Summary
The KoRT ecosystem includes a customized fork of VS Codium, tailored to match our sovereign design decrees. To create a highly immersive and personalized onboarding experience, we are introducing the **Merlin WYSIWYG AI Interface Engine**. This engine will allow users to converse with "Merlin" to generate a comprehensive, personalized utopian fantasy theme that spans their IDE, the web portal, and their overall infrastructure control panels.

## 2. Core Features
### 2.1 Merlin AI Chat Interface
*   **Conversational Onboarding:** Instead of picking from dropdowns, users interact with Merlin.
*   **Prompting & Inspiration:** Users describe their favorite heroes, characters, shows, or aesthetics. 
    *   *Examples:* "All Knights of the Round Table", "All Star Trek", or a "Mix in the middle" (e.g., Cyber-Arthurian).
*   **Real-time Generation:** Merlin interprets these inputs to define a cohesive color palette, typography, micro-animations, and UI components.

### 2.2 Utopian Fantasy World Generation
*   **Holistic Application:** The generated theme is not limited to VS Codium. It acts as a universal profile applied across:
    *   VS Codium editor and control panels.
    *   The KoRT Nexus PWA / entire website.
    *   Digital Round Table (DRT) and Quantum Quorum interfaces.
*   **Congruency:** Ensures that a user's chosen aesthetic is synchronized across all infrastructure elements tied to their user account.

### 2.3 Variations and Templates
While the AI generates custom themes, the system will support core archetypal templates that Merlin can blend:
1.  **Quantum Aurum (Default/Core KoRT):** The established high-end, glassmorphic, sovereign aesthetic.
2.  **Camelot/Knights of the Round Table:** High fantasy, rich golds, deep royal blues/reds, parchment textures.
3.  **Starfleet/Sci-Fi:** Sleek, neon accents, dark mode, LCARS-inspired layouts.
4.  **Hybrid/Custom:** A seamless blend driven by the AI (e.g., sci-fi paneling with fantasy metallic accents).

## 3. Integration & Architecture (V1 Update)
Currently, the baseline VS Codium fork is compiling on the Xeon server. This specification serves as the blueprint for the **first version update** once the base build is successfully deployed.

### 3.1 Data Flow
1.  **User Input:** User interacts with Merlin via the Web Portal or an initial VS Codium extension popup.
2.  **Merlin Processing:** AI translates narrative input into a structured JSON theme payload (colors, fonts, CSS variables).
3.  **Profile Sync:** The theme JSON is saved to the user's Supabase profile under `theme_preferences`.
4.  **Distribution:**
    *   **PWA/Web:** Fetches the theme JSON on login and applies CSS variables dynamically to the DOM.
    *   **VS Codium Fork:** An embedded extension or native modification queries the user's profile and applies the corresponding VS Code theme API settings dynamically.

### 4. Next Steps for Implementation
1.  **Finalize Xeon Compile:** Await the successful build of the base VS Codium fork.
2.  **Theme JSON Schema:** Define the exact JSON structure that Merlin must output to ensure compatibility between Web CSS and VS Codium theme configurations.
3.  **Merlin System Prompt:** Draft the specific AI system prompt that guides Merlin in translating user stories into valid design tokens.
4.  **VS Codium Injection:** Develop the sync mechanism inside the VS Codium fork that pulls from the central user database to apply the theme in real-time.

## 5. Extension Architecture & Ecosystem Dependencies
Yes, the most robust and maintainable way to implement the Merlin Wizard within the VSCodium fork is **as an extension**. By bundling this as a native extension inside our fork, we can leverage the VS Code API (`workbench.colorCustomizations`, `editor.tokenColorCustomizations`) to dynamically rewrite the theme in real-time without recompiling the editor.

To make the Merlin Theme Wizard fully functional for the V1 update, the following components and "helper" extensions will be required alongside it:

### 5.1 The "Merlin Interface" Extension (Core)
*   **Webview Panel:** We will use the VS Code Webview API to render the beautiful, glassmorphic Merlin AI chat interface directly inside an editor tab or side panel.
*   **AI Backend Connector:** The extension needs an API client to securely communicate with the Anthropic/Google AI endpoints that power Merlin's logic.
*   **Theme Injection Logic:** Code that takes the JSON payload returned by Merlin and maps it onto the VS Code `workspace.getConfiguration` settings to apply colors instantly.

### 5.2 KoRT Identity & Sync Extension
*   **Authentication:** We need an extension (or a module within the Merlin extension) to handle user login, connecting the VSCodium instance to our Supabase backend.
*   **State Synchronization:** This ensures that when a user generates a theme on the Web Portal, their local VSCodium fork detects the Supabase database change and automatically pulls the new theme profile.

### 5.3 Baseline Archetype Theme Extensions (Bundled)
While Merlin generates the *overrides* (custom hex codes, fonts, animations), we should bundle the base Utopian themes into the fork so Merlin has a solid foundation to modify:
*   `theme-kort-quantum-aurum`
*   `theme-kort-camelot`
*   `theme-kort-starfleet`
By having these installed by default, Merlin simply selects the closest base archetype and then applies the user's custom variations via `colorCustomizations`.

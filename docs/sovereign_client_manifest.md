# 🐉 KoRT Sovereign Client Manifest: Firefox & Thunderbird Forks
**Version:** 1.0 (Enterprise Specification)
**Authorized by:** Antigravity / Lead Architect

---

## 1. Architectural Strategy: The "Bespoke Sovereign Client"
Rather than compiling complex C++ browser engines from raw source code (which takes hours and requires massive build nodes), we will build **Custom Enterprise Distributions** using official, hardened ESM (Enterprise Service Policy) configurations. This allows us to inject our own custom CSS branding, default settings, pre-loaded security configurations, and custom AI tools in a zero-overhead, instantly installable format.

---

## 2. Part I: Sovereign Thunderbird (AI-Enhanced Mail)

### A. Automatic Auto-Configuration Protocol (`autoconfig.drt.onl`)
We will set up an autoconfig server on our mail gateway so that when a recruit types their email address (`username@drt.onl` or `username@kortx.ca`) into any Thunderbird instance, the client automatically configures the correct secure SSL servers and ports instantly.

#### Autoconfig Server Schema (`/opt/kort/mail-server/webmail-data/.well-known/autoconfig/mail/config-v1.1.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
  <emailProvider id="drt.onl">
    <domain>drt.onl</domain>
    <domain>kortx.ca</domain>
    <domain>drt.social</domain>
    <displayName>KoRT Sovereign Mail Network</displayName>
    <displayShortName>KoRT</displayShortName>
    
    <!-- Inbound secure IMAP -->
    <incomingServer type="imap">
      <hostname>mail.drt.onl</hostname>
      <port>993</port>
      <socketType>SSL</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </incomingServer>
    
    <!-- Outbound secure SMTP -->
    <outgoingServer type="smtp">
      <hostname>mail.drt.onl</hostname>
      <port>465</port>
      <socketType>SSL</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </outgoingServer>
  </emailProvider>
</clientConfig>
```

### B. Pre-Loaded Extensions & Custom Theme
We package the custom Thunderbird installer with three essential plugins:
1.  **Enigmail / OpenPGP:** Configured to enforce message encryption automatically for DRT-internal communication.
2.  **KoRT AI Scribe Add-on (Custom WebExtension):**
    *   A custom sidebar panel loaded inside Thunderbird.
    *   Connects directly to the **Merlin Proxy / Local Ollama API**.
    *   Provides quick context generation, email drafting based on the 3-email triangle protocol, and automated response summarization for the ICBC/Advocate pipeline.

---

## 3. Part II: Sovereign Firefox (Sovereign Web Browser)

### C. Hardened Enterprise Policy Configuration (`policies.json`)
Sovereign Firefox enforces strict anti-tracking, local-first routing, and pre-loaded bookmark hubs.

#### Policies File (`/distribution/policies.json`)
```json
{
  "policies": {
    "DisableTelemetry": true,
    "DisableFirefoxStudies": true,
    "DisablePocket": true,
    "DisableFeedbackCommands": true,
    "DisplayMenuBar": "default-off",
    "Homepage": {
      "URL": "https://kortx.ca/portal",
      "Locked": false,
      "StartPage": "homepage"
    },
    "Bookmarks": [
      {
        "Title": "KoRT Command Center Portal",
        "URL": "https://kortx.ca/portal",
        "Favicon": "https://kortx.ca/assets/dragon.ico",
        "Placement": "toolbar"
      },
      {
        "Title": "Sovereign Webmail",
        "URL": "https://webmail.drt.onl",
        "Favicon": "https://webmail.drt.onl/favicon.ico",
        "Placement": "toolbar"
      },
      {
        "Title": "Round Table Wiki",
        "URL": "http://localhost:8000",
        "Placement": "toolbar"
      }
    ],
    "ExtensionSettings": {
      "uBlock0@raymondhill.net": {
        "installation_mode": "force_installed",
        "install_url": "https://addons.mozilla.org/firefox/downloads/latest/ublock-origin/latest.xpi"
      },
      "kort-scribe-advocate@drt.onl": {
        "installation_mode": "force_installed",
        "install_url": "https://raw.githubusercontent.com/KoRTxca/Mission_Control/master/assets/extensions/kort_scribe.xpi"
      }
    }
  }
}
```

### D. Custom User Stylesheet (`userChrome.css`)
Injects a custom-branded dark dragon aesthetic directly into the Firefox tab and address bar interface.

```css
/* Custom Sovereign Chrome Styling */
:root {
  --tab-active-bg-color: #1a0f2e !important; /* Dark Purple */
  --tab-active-text-color: #ffd700 !important; /* Gold */
  --toolbar-bg-color: #0d0614 !important;
}

#nav-bar {
  background-color: var(--toolbar-bg-color) !important;
  border-bottom: 1px solid #ffd700 !important;
}

#urlbar-background {
  background-color: #150b20 !important;
  border: 1px solid #4a2f70 !important;
}
```

---

## 4. Automation & Distribution Plan
1.  **Package Custom Installers:** We will write a lightweight PowerShell packaging script that bundles the `policies.json`, custom `userChrome.css`, and extensions into standard Windows `.msi` / `.exe` installer directories for distribution.
2.  **OTA Sync:** High-paying recruits can download their pre-configured Sovereign Browser directly from the "Tavern" Nexus Super-App download portal.

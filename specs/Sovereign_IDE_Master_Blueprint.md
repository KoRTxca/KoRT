# 🐉 VS_KORT_CODE: SOVEREIGN IDE MASTER BLUEPRINT

## 1. INFRASTRUCTURE OVERVIEW
*   **Primary Compute:** Xeon-hosted VPS (ID 100 on Proxmox) @ `104.219.251.218`.
*   **Environment:** Headless Debian-based Dev Beast configured for high-load compilation and AI inference proxying.
*   **Networking:** Private NAT bridge (`vmbr1`) with public gateway at `ide.kortx.ca`.

## 2. COMPILATION PIPELINE (VS_KORT_CODE)
*   **Core:** VSCodium (MIT) source fork.
*   **Status:** **ACTIVE FORGE** (PID 1024844).
*   **Build Script:** `/opt/kort/scripts/build_vs_kort_code.sh`.
*   **Patch Matrix:**
    *   [X] Branding Injection (KoRT Dragon Shield Icons).
    *   [X] Telemetry Annihilation.
    *   [X] Sovereign Kernel Extension (`kort-sovereign-kernel`).

## 3. SOVEREIGN OAUTH GATEWAY (GEMINI ENTERPRISE)
*   **Objective:** Securely route AI requests to Gemini Enterprise using the `kort@drt.onl` identity without third-party telemetry.
*   **Identity Management:**
    *   **Primary:** Google Enterprise OAuth via KoRT SSO.
    *   **Fallback/Headless:** Google Cloud Service Account JSON with `Vertex AI User` permissions.
*   **Architecture Flow:**
    1.  **Client:** IDE (Merlin Extension) triggers a request.
    2.  **Proxy:** Xeon Server intercepts the request, attaches the Enterprise Token/Key.
    3.  **Endpoint:** Gemini API (Vertex AI) processes the request under the `drt.onl` business project.
    4.  **Security:** No API keys are stored on the client; all authentication is handled server-side on the Xeon.

## 4. MERLIN AI INTEGRATION
*   **The Kernel:** A native VS Code extension bundled into the IDE at compile-time.
*   **Functionality:**
    *   **133-Seat Quorum:** Access to local Xeon-hosted LLMs (Ollama/Llama 3) for zero-latency code completion.
    *   **Merlin Chat:** High-reasoning gateway to Gemini Enterprise for architectural shifts and complex logic.
    *   **WYSIWYG Theme Wizard:** Generative UI theme engine for "Quantum Aurum" aesthetics.

## 5. DEPLOYMENT BLUEPRINT
1.  [X] Provision Xeon VPS & Fix DPkg Locks.
2.  [X] Trigger Background Compilation of VS_KoRT_Code.
3.  [ ] **AWAITING:** Service Account `.json` or OAuth Client Credentials from the King.
4.  [ ] Configure Nginx Reverse Proxy for `ide.kortx.ca`.
5.  [ ] Deploy SSO Gateway & Wire Gemini Enterprise Proxy.
6.  [ ] Distribute `KoRT_IDE.exe` borderless client.

## 6. IMPLEMENTATION DETAILS: SOVEREIGN OAUTH GATEWAY

### A. Generating the Vertex AI Service Account (Headless)
1.  **Google Cloud Console:** Navigate to `IAM & Admin` > `Service Accounts`.
2.  **Create Account:** Name it `kort-ide-service-agent`.
3.  **Roles:** Grant the **Vertex AI User** role to this account.
4.  **Keys:** Select the account > `Keys` > `Add Key` > `Create new key` > **JSON**.
5.  **Secure Storage:** Download the `.json` file and provide it to Antigravity (or store it in `Mission_Control/keys/`).

### B. Flutter SSO Logic (Client Side)
```dart
// KoRT SSO Provider - Integrated into VS_KoRT_Code Webview
import 'package:google_sign_in/google_sign_in.dart';

class KortSSO {
  static final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    hostedDomain: 'drt.onl', // Restrict to Gemini Enterprise domain
  );

  static Future<void> signIn() async {
    try {
      final account = await _googleSignIn.signIn();
      final auth = await account?.authentication;
      final token = auth?.accessToken;
      
      // Send token to the Xeon Sovereign Proxy
      await registerTokenWithXeon(token);
    } catch (error) {
      print("SSO Failed: $error");
    }
  }
}
```

### C. Python FastAPI Proxy (Xeon Side)
```python
# Sovereign AI Proxy running on Xeon (Port 8080)
from fastapi import FastAPI, Header, HTTPException
from google.cloud import aiplatform
import os

app = FastAPI(title="KoRT Sovereign AI Proxy")

# Load the Service Account JSON
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/opt/kort/keys/vertex-key.json"

@app.post("/v1/chat/completions")
async def proxy_gemini(request: dict, authorization: str = Header(None)):
    # 1. Verify KoRT SSO Token (Optional extra layer)
    # 2. Route to Vertex AI
    aiplatform.init(project="drt-enterprise", location="us-central1")
    
    model = aiplatform.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(request['prompt'])
    
    return {"response": response.text, "identity": "kort@drt.onl"}
```

---
**🐉 STATE:** IN PROGRESS | **FORGE:** HOT

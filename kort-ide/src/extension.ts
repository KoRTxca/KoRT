import * as vscode from 'vscode';
import * as http from 'http';
import * as crypto from 'crypto';

const PORT = 52345;
let idToken: string | null = null;

const idpConfig = {
  issuer: "https://auth.koort.os/realms/kort",
  clientId: "kort-desktop",
  redirectUri: `http://localhost:${PORT}/oauth2/callback`,
  scopes: ["openid", "profile", "email", "device_sso"],
};

export function activate(context: vscode.ExtensionContext) {
    console.log('KoRT IDE Plugin is active.');

    const loginCmd = vscode.commands.registerCommand('kort.login', async () => {
        const state = crypto.randomBytes(16).toString('hex');
        
        const url = new URL(`${idpConfig.issuer}/protocol/openid-connect/auth`);
        url.searchParams.set("client_id", idpConfig.clientId);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("redirect_uri", idpConfig.redirectUri);
        url.searchParams.set("scope", idpConfig.scopes.join(" "));
        url.searchParams.set("state", state);

        startCallbackServer(context);
        vscode.window.showInformationMessage('Opening browser to authenticate with KoRT SSO...');
        await vscode.env.openExternal(vscode.Uri.parse(url.toString()));
    });

    const provider = new KortViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('kort-view', provider)
    );

    context.subscriptions.push(loginCmd);
}

function startCallbackServer(context: vscode.ExtensionContext) {
    const server = http.createServer(async (req, res) => {
        if (req.url && req.url.startsWith('/oauth2/callback')) {
            const url = new URL(req.url, `http://localhost:${PORT}`);
            const code = url.searchParams.get('code');
            
            if (code) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Authentication successful. You may close this window.</h1>');
                server.close();
                
                vscode.window.showInformationMessage('KoRT SSO: Login successful! Tokens secured.');
                idToken = "simulated_id_token_for_testing_replace_with_exchange";
            }
        }
    });
    server.listen(PORT, () => {
        console.log(`KoRT SSO Callback listening on port ${PORT}`);
    });
}

class KortViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = this.getHtmlForWebview();
    }

    private getHtmlForWebview() {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: var(--vscode-font-family); padding: 15px; }
                button { background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; padding: 10px; cursor: pointer; width: 100%; margin-bottom: 15px; font-weight: bold; border-radius: 4px; }
                button:hover { background-color: var(--vscode-button-hoverBackground); }
                select { width: 100%; padding: 8px; margin-bottom: 15px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 4px; }
                label { font-weight: bold; margin-bottom: 5px; display: inline-block; }
            </style>
        </head>
        <body>
            <h2>🛡️ KoRT Sovereign Gateway</h2>
            <button onclick="login()">Login with KoRT IdP</button>
            <hr style="border: 1px solid var(--vscode-panel-border);">
            <label>Model Routing</label>
            <select id="modelSelect">
                <option value="local-lm-studio">⚡ LM Studio (Local / Free)</option>
                <option value="local-ollama">⚡ Ollama (Local / Free)</option>
                <option value="kort-fast">🌐 KoRT Network (Fast)</option>
                <option value="kort-heavy">🧠 KoRT Network (Heavy)</option>
            </select>
            <label>Active Sphere</label>
            <select id="sphereSelect">
                <option value="0">Sphere 0: Self</option>
                <option value="1">Sphere 1: Family Hearth</option>
                <option value="2">Sphere 2: Career / Xception</option>
                <option value="3">Sphere 3: Community Mesh</option>
                <option value="4">Sphere 4: Province</option>
                <option value="5">Sphere 5: Global Mesh</option>
            </select>
            <button>Engage AI Assistant</button>
            <p style="font-size: 0.9em; color: var(--vscode-descriptionForeground); text-align: center;">Balance: <strong>0 Digital Dollars</strong></p>
            <script>
                const vscode = acquireVsCodeApi();
                function login() {
                    vscode.postMessage({ command: 'login' });
                }
            </script>
        </body>
        </html>`;
    }
}

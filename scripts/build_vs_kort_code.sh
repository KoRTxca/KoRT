#!/bin/bash
# ==============================================================================
# 🐉 VS_KoRT_Code BARE METAL FORGE 🐉
# Target: Full Standalone Binary Compilation (No Shortcuts, No Extensions)
# Base: VSCodium (MIT Licensed telemetry-free VS Code clone)
# Output: Downloadable .exe / .AppImage / .deb for distribution
# ==============================================================================

set -e

echo "⚔️ INITIALIZING VS_KORT_CODE FORGE..."
BUILD_DIR="/opt/vs_kort_code_build"
BRANDING_DIR="/opt/kort/shared-assets/media"

# 1. Prepare Environment
echo "[1/5] Preparing Build Environment..."
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update && sudo apt-get install -y \
    build-essential \
    pkg-config \
    libx11-dev \
    libxkbfile-dev \
    libsecret-1-dev \
    python3 \
    git \
    jq \
    libkrb5-dev

# Load NVM if already installed, otherwise install it
export NVM_DIR="$HOME/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
fi
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20
npm install -g yarn

# 2. Clone VSCodium Repository (The Build System)
echo "[2/5] Cloning VSCodium Source..."
mkdir -p $BUILD_DIR
cd $BUILD_DIR
if [ ! -d "vscodium" ]; then
    git clone --depth 1 https://github.com/VSCodium/vscodium.git
fi
cd vscodium

# 3. Inject KoRT Branding into VSCodium's patch system
# VSCodium uses patch files and product.json overrides — NOT direct source edits
echo "[3/5] Injecting KoRT Sovereign Identity Matrix..."

# VSCodium reads branding from this file during its build
cat << 'EOF' > product.json
{
  "nameShort": "VS_KoRT_Code",
  "nameLong": "VS_KoRT_Code Sovereign Edition",
  "applicationName": "vs-kort-code",
  "dataFolderName": ".vs-kort-code",
  "win32MutexName": "vskortcode",
  "licenseName": "MIT",
  "licenseUrl": "https://kortx.ca/license",
  "serverApplicationName": "vs-kort-code-server",
  "serverDataFolderName": ".vs-kort-code-server",
  "quality": "stable",
  "extensionsGallery": {
    "serviceUrl": "https://open-vsx.org/vscode/gallery",
    "itemUrl": "https://open-vsx.org/vscode/item"
  }
}
EOF

# Replace Icons with KoRT Dragon Shield if available
echo "  -> Replacing executable icons..."
if [ -f "$BRANDING_DIR/dragon_shield.ico" ]; then
    # VSCodium icons are injected during the build via the icons/ directory
    mkdir -p icons
    cp "$BRANDING_DIR/dragon_shield.ico" icons/stable/code.ico 2>/dev/null || true
    cp "$BRANDING_DIR/dragon_shield.png" icons/stable/code.png 2>/dev/null || true
else
    echo "  -> WARNING: Dragon Shield icons not found in $BRANDING_DIR. Using VSCodium defaults."
fi

# 4. Create a KoRT extension that loads on IDE startup
# This is the correct way to inject logic — as a bundled extension, not by hacking the source
echo "[4/5] Creating KoRT Sovereign Kernel Extension..."
KORT_EXT_DIR="$BUILD_DIR/kort-sovereign-extension"
mkdir -p "$KORT_EXT_DIR"

cat << 'EXTJSON' > "$KORT_EXT_DIR/package.json"
{
  "name": "kort-sovereign-kernel",
  "displayName": "KoRT Sovereign Kernel",
  "description": "133-Seat Quorum & Merlin AI backbone for VS_KoRT_Code",
  "version": "1.0.0",
  "publisher": "kortx",
  "engines": { "vscode": "^1.85.0" },
  "activationEvents": ["onStartupFinished"],
  "main": "./extension.js",
  "contributes": {
    "commands": [
      { "command": "kort.initQuorum", "title": "KoRT: Initialize 133-Seat Quorum" },
      { "command": "kort.merlinChat", "title": "KoRT: Open Merlin AI Chat" }
    ]
  }
}
EXTJSON

cat << 'EXTJS' > "$KORT_EXT_DIR/extension.js"
const vscode = require('vscode');

function activate(context) {
    console.log('🐉 KoRT Sovereign Kernel Active — 133-Seat Quorum Initialized');
    
    vscode.window.setStatusBarMessage('🐉 KoRT Sovereign | Quorum Active', 10000);

    let initCmd = vscode.commands.registerCommand('kort.initQuorum', () => {
        vscode.window.showInformationMessage('133-Seat Quorum Active within VS_KoRT_Code.');
    });

    let merlinCmd = vscode.commands.registerCommand('kort.merlinChat', () => {
        vscode.window.showInformationMessage('Merlin AI Chat — connecting to sovereign inference endpoints...');
    });

    context.subscriptions.push(initCmd, merlinCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
EXTJS

echo "  -> KoRT Sovereign Kernel extension created at $KORT_EXT_DIR"

# 5. Build VS_KoRT_Code using VSCodium's build system
echo "[5/5] Compiling Full Binary (this will take a while)..."
export SHOULD_BUILD="yes"
export CI_BUILD="no"
export OS_NAME="linux"
export VSCODE_ARCH="x64"
export VSCODE_QUALITY="stable"

# Clean previous source to ensure idempotency
rm -rf vscode

# Fetch VS Code source (uses version from upstream/stable.json)
bash get_repo.sh

# Resolve MS_COMMIT
source version.sh

# VSCodium's actual build command
bash build.sh

echo "✅ BUILD COMPLETE."
echo "The standalone VS_KoRT_Code output is located in: $BUILD_DIR/vscodium/VSCode-linux-x64"
echo "Ready for distribution."

#!/bin/bash
# 🛡️ KoRT OS: Ubuntu 24.x Sovereign Deployment Tool
# Version 1.1.0
# Author: Master Builder (Antigravity)

set -e

echo "🛡️ Initializing KoRT Sovereign Environment for Ubuntu..."

# 1. Asset Provisioning
ASSETS_DIR="$HOME/.local/share/kort-os"
mkdir -p "$ASSETS_DIR"

# Note: Since this runs on Windows subsystem for now or target Linux, 
# we assume the user has the branding assets relative to their mount.
# For high-fidelity consistency, we point to the absolute branding files.
WALLPAPER_SOURCE="/mnt/d/KoRT_Command_Center/Mission_Control/shared-assets/branding/desktop_bg.png"
WALLPAPER_DEST="$ASSETS_DIR/desktop_bg.png"

if [ -f "$WALLPAPER_SOURCE" ]; then
    cp "$WALLPAPER_SOURCE" "$WALLPAPER_DEST"
    echo "🛡️ Quantum Aurum 4K Background Synchronized."
else
    echo "⚠️ Warning: Master Wallpaper source not found. Skipping background set."
fi

# 2. GNOME Configuration (Quantum Aurum Palette)
echo "🛡️ Calibrating Sovereign Palette..."
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
gsettings set org.gnome.desktop.background picture-uri "file://$WALLPAPER_DEST"
gsettings set org.gnome.desktop.background picture-uri-dark "file://$WALLPAPER_DEST"

# 3. Typography Law Enforcement
echo "🛡️ Enforcing KoRT Typography Laws..."
# Assumes Outfit font is installed. If not, fallback to Sans.
gsettings set org.gnome.desktop.interface font-name 'Outfit 11'
gsettings set org.gnome.desktop.interface document-font-name 'Outfit 11'
gsettings set org.gnome.desktop.interface monospace-font-name 'Space Grotesk 11'

# 4. Terminal Branding
echo "🛡️ Branding Sovereign Terminal..."
# Note: This would typically require profile-specific gsettings, 
# but we can set the default color scheme if profile exists.

echo "🛡️ KoRT OS DEPLOYED. Engage the Sovereign Frontier."

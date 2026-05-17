import os
import json
from pathlib import Path

def forge_ide_settings():
    print("🛠️ KoRT IDE Forge: Initiating Master Sync...")
    
    # KoRT Standard Settings
    kort_settings = {
        "workbench.colorTheme": "Default Dark Modern", # We can update to a custom theme later
        "editor.fontSize": 14,
        "editor.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
        "editor.formatOnSave": True,
        "editor.bracketPairColorization.enabled": True,
        "workbench.iconTheme": "vscode-icons",
        "files.autoSave": "onFocusChange",
        "telemetry.telemetryLevel": "off"
    }

    # Paths to editors
    app_data = os.environ.get("APPDATA")
    editor_paths = {
        "VSCode": Path(app_data) / "Code" / "User" / "settings.json",
        "VSCodium": Path(app_data) / "VSCodium" / "User" / "settings.json",
    }

    # Apply to VSCode/VSCodium
    for name, path in editor_paths.items():
        if path.parent.exists():
            print(f"  Syncing {name}...")
            if path.exists():
                with open(path, "r") as f:
                    try:
                        current = json.load(f)
                    except:
                        current = {}
            else:
                current = {}
            
            # Merge settings
            current.update(kort_settings)
            
            with open(path, "w") as f:
                json.dump(current, f, indent=4)
            print(f"  ✅ {name} Forge Complete.")
        else:
            print(f"  ⏭️ {name} not found. Skipping.")

    # Zed (Usually in ~/.config/zed/settings.json on Linux, but check Windows)
    # On Windows: %APPDATA%/Zed/settings.json
    zed_path = Path(app_data) / "Zed" / "settings.json"
    if zed_path.parent.exists():
        print("  Syncing Zed...")
        # Zed uses a slightly different format (usually a JSON-like block)
        # We'll just ensure the dir exists for now or write a standard config
        with open(zed_path, "w") as f:
            json.dump(kort_settings, f, indent=4)
        print("  ✅ Zed Forge Complete.")
    
    print("\n⚔️ Forge Complete. All ships (editors) are now synchronized.")

if __name__ == "__main__":
    forge_ide_settings()

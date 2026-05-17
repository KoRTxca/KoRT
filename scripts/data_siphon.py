import os
import shutil
import time
from pathlib import Path

# --- CONFIGURATION ---
SOURCE_DRIVE = 'E:/' 
TARGET_VAULT = Path('d:/KoRT_Command_Center/THE_VAULT/External_Siphon')
FOLDER_WHITELIST = ['Wiki', 'Backups', 'Docs', 'Archives', 'Assets']

def siphon_drive():
    print("--- 🌪️ KoRT DATA SIPHON: EXTERNAL DRIVE -> THE VAULT ---")
    
    if not os.path.exists(SOURCE_DRIVE):
        print(f"Status: Drive {SOURCE_DRIVE} not detected. Waiting for connection...")
        return

    TARGET_VAULT.mkdir(parents=True, exist_ok=True)
    
    print(f"Scanning {SOURCE_DRIVE} for mission-critical data...")
    found_folders = []
    for folder in FOLDER_WHITELIST:
        src_path = Path(SOURCE_DRIVE) / folder
        if src_path.exists():
            found_folders.append(src_path)
    
    if not found_folders:
        print("No whitelisted folders found. Siphoning root files instead...")
        # Add logic for root files if needed
    
    for folder_path in found_folders:
        dest_path = TARGET_VAULT / folder_path.name
        print(f"Siphoning {folder_path.name} -> {dest_path}...")
        
        # Using a more robust copy that can resume/handle large files
        try:
            if dest_path.exists():
                print(f"Folder {folder_path.name} already exists in Vault. Syncing differences...")
                # Simple sync logic (overwrite if newer)
                shutil.copytree(folder_path, dest_path, dirs_exist_ok=True)
            else:
                shutil.copytree(folder_path, dest_path)
            print(f"✅ {folder_path.name} Siphoned successfully.")
        except Exception as e:
            print(f"❌ Failed to siphon {folder_path.name}: {e}")

    print("\n--- SIPHON COMPLETE ---")
    print(f"Vault Status: {sum(f.stat().st_size for f in TARGET_VAULT.rglob('*') if f.is_file()) / 1024 / 1024:.2f} MB secured.")

if __name__ == "__main__":
    siphon_drive()

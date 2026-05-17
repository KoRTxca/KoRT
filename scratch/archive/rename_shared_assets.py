import os
import re

shared_assets_dir = r"d:\KoRT_Command_Center\Mission_Control\shared-assets"

def clean_name(name):
    # Split name and extension
    base, ext = os.path.splitext(name)
    
    # Lowercase
    base = base.lower()
    
    # Replace & with _and_
    base = base.replace('&', '_and_')
    
    # Replace spaces with underscores
    base = base.replace(' ', '_')
    
    # Replace dot in base (e.g. KoRTx.ca) with underscore
    base = base.replace('.', '_')
    
    # Remove parentheses and other invalid characters, keep alphanumeric, hyphen, underscore
    base = re.sub(r'[^a-z0-9\-_]', '_', base)
    
    # Collapse multiple underscores/hyphens into one
    base = re.sub(r'_{2,}', '_', base)
    base = re.sub(r'-{2,}', '-', base)
    base = base.strip('_').strip('-')
    
    return base + ext.lower()

def rename_recursive(root_dir):
    print(f"Starting asset renaming in {root_dir}...")
    
    # We walk bottom-up so that children are renamed before their parents
    for dirpath, dirnames, filenames in os.walk(root_dir, topdown=False):
        # Rename files
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_filename = clean_name(filename)
            new_path = os.path.join(dirpath, new_filename)
            
            if old_path != new_path:
                # If target exists, resolve conflict
                if os.path.exists(new_path):
                    base, ext = os.path.splitext(new_filename)
                    counter = 1
                    while os.path.exists(os.path.join(dirpath, f"{base}_{counter}{ext}")):
                        counter += 1
                    new_filename = f"{base}_{counter}{ext}"
                    new_path = os.path.join(dirpath, new_filename)
                
                print(f"[RENAME FILE] {filename} -> {new_filename}")
                os.rename(old_path, new_path)
                
        # Rename directories
        for dirname in dirnames:
            old_path = os.path.join(dirpath, dirname)
            new_dirname = clean_name(dirname)
            new_path = os.path.join(dirpath, new_dirname)
            
            if old_path != new_path:
                if os.path.exists(new_path):
                    counter = 1
                    while os.path.exists(os.path.join(dirpath, f"{new_dirname}_{counter}")):
                        counter += 1
                    new_dirname = f"{new_dirname}_{counter}"
                    new_path = os.path.join(dirpath, new_dirname)
                
                print(f"[RENAME DIR] {dirname} -> {new_dirname}")
                os.rename(old_path, new_path)

if __name__ == "__main__":
    rename_recursive(shared_assets_dir)
    print("Renaming process complete.")

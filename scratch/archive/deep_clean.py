import os
import shutil

base_dir = r"d:\KoRT_Command_Center\Mission_Control"
branding_dir = os.path.join(base_dir, "assets", "branding")
junk_dir = os.path.join(base_dir, "assets", "temp_junk")
portals_dir = os.path.join(base_dir, "portals")
specs_dir = os.path.join(base_dir, "specs")
data_dir = os.path.join(base_dir, "data")
instr_dir = os.path.join(base_dir, "instructions")

# Ensure all target directories exist
for d in [branding_dir, junk_dir, portals_dir, specs_dir, data_dir, instr_dir]:
    if not os.path.exists(d):
        os.makedirs(d)

# 1. White-listed Branding Assets (DO NOT MOVE TO JUNK)
branding_assets = [
    "kort_dragon_hero_bg.png",
    "merlin_transparent_guide.png",
    "logo-3d.png",
    "logo-128.png",
    "DisplayP3Logo.png",
    "DisplayP3Logo.jpg",
    "app_icon_1024.png",
    "app_icon_512.png"
]

# 2. File categorization patterns
instruction_keywords = ["INSTRUCTIONS", "HANDOFF", "MANUAL", "SOP"]

print(f"Starting deep clean in {base_dir}...")

for filename in os.listdir(base_dir):
    file_path = os.path.join(base_dir, filename)
    
    # Skip directories
    if os.path.isdir(file_path):
        continue
        
    ext = os.path.splitext(filename)[1].lower()
    
    # Handle Branding
    if filename in branding_assets:
        print(f"Protecting branding: {filename}")
        shutil.move(file_path, os.path.join(branding_dir, filename))
        continue
        
    # Handle Images (Junk)
    if ext in [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"]:
        print(f"Junking image: {filename}")
        shutil.move(file_path, os.path.join(junk_dir, filename))
        continue
        
    # Handle Portals (HTML)
    if ext == ".html":
        print(f"Moving portal: {filename}")
        shutil.move(file_path, os.path.join(portals_dir, filename))
        continue
        
    # Handle Data (JSON, CSV)
    if ext in [".json", ".csv"]:
        print(f"Moving data: {filename}")
        shutil.move(file_path, os.path.join(data_dir, filename))
        continue
        
    # Handle Markdown
    if ext == ".md":
        # Keep critical files in root
        if any(x in filename for x in ["MASTER_CONTEXT", "CHANGELOG", "ROADMAP", "README"]):
            continue
            
        # Check for instructions
        if any(k in filename.upper() for k in instruction_keywords):
            print(f"Moving instruction: {filename}")
            shutil.move(file_path, os.path.join(instr_dir, filename))
        else:
            print(f"Moving spec: {filename}")
            shutil.move(file_path, os.path.join(specs_dir, filename))

print("Deep clean complete.")

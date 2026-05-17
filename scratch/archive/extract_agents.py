import json
import re
from pathlib import Path

def extract_agents():
    php_path = Path(r"D:\KoRT_Command_Center\Mission_Control\scripts\kortx-provision.php")
    content = php_path.read_text(encoding="utf-8")
    
    # Use regex to find the JSON string
    match = re.search(r"json_decode\('(.*?)', true\);", content, re.DOTALL)
    if match:
        agents_json = match.group(1)
        agents = json.loads(agents_json)
        
        output_path = Path(r"D:\KoRT_Command_Center\Mission_Control\data\quorum\agents.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(agents, f, indent=4)
        print(f"Successfully extracted {len(agents)} agents to {output_path}")
    else:
        print("Could not find agent JSON in PHP file.")

if __name__ == "__main__":
    extract_agents()

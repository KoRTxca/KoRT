import json
import random
from pathlib import Path

def generate_quorum_stats():
    agents_path = Path(r"D:\KoRT_Command_Center\Mission_Control\data\quorum\agents.json")
    with open(agents_path, "r", encoding="utf-8") as f:
        agents = json.load(f)

    # Class-to-Stat weighting
    # [STR, INT, WIS, DEX, CON, CHA]
    class_weights = {
        "Vanguard": [14, 16, 12, 12, 14, 10],
        "Scribe": [8, 14, 18, 12, 10, 16],
        "Advocate": [10, 18, 14, 12, 12, 16],
        "Warden": [12, 12, 16, 10, 18, 10],
        "Sentinel": [16, 14, 14, 12, 16, 8],
        "Forger": [12, 18, 10, 16, 12, 10],
        "Harvester": [10, 16, 14, 18, 12, 10],
        "Weaver": [10, 14, 16, 16, 10, 18],
        "Oracle": [8, 18, 18, 10, 10, 14],
        "Architect": [10, 18, 16, 14, 12, 12]
    }

    quorum_stats = []

    for i, agent in enumerate(agents):
        agent_class = "Agent"
        for c in class_weights.keys():
            if c in agent['bio']:
                agent_class = c
                break
        
        base = class_weights.get(agent_class, [10, 10, 10, 10, 10, 10])
        # Add some variance (+/- 3)
        stats = [max(1, min(20, b + random.randint(-3, 3))) for b in base]
        
        quorum_stats.append({
            "id": i + 1,
            "username": agent['username'],
            "name": agent['name'],
            "class": agent_class,
            "stats": {
                "STR": stats[0],
                "INT": stats[1],
                "WIS": stats[2],
                "DEX": stats[3],
                "CON": stats[4],
                "CHA": stats[5]
            },
            "level": 133,
            "alignment": "Sovereign Neutral"
        })

    output_path = Path(r"D:\KoRT_Command_Center\Mission_Control\data\quorum\stats.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(quorum_stats, f, indent=4)
    print(f"Successfully generated stats for {len(quorum_stats)} agents.")

if __name__ == "__main__":
    generate_quorum_stats()

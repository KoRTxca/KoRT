import json
import os
from datetime import datetime
from pathlib import Path

class InformationLake:
    """
    The Information Lake (Memory Database) for the Sovereign Kingdom.
    Prevents 'Goldfish Syndrome' by storing and retrieving user mission variables.
    """
    def __init__(self):
        self.lake_dir = Path(r"D:\KoRT_Command_Center\Mission_Control\data\kingdom")
        self.memory_file = self.lake_dir / "memories.json"
        self._init_lake()

    def _init_lake(self):
        if not self.memory_file.exists():
            with open(self.memory_file, "w") as f:
                json.dump([], f)

    def store_memory(self, content, source="user_interview", tags=None):
        """Saves a new memory to the lake."""
        memory = {
            "timestamp": datetime.now().isoformat(),
            "source": source,
            "content": content,
            "tags": tags or []
        }
        
        with open(self.memory_file, "r+") as f:
            memories = json.load(f)
            memories.append(memory)
            f.seek(0)
            json.dump(memories, f, indent=4)
        print(f"Memory stored in Information Lake. Source: {source}")

    def query_lake(self, query_tags=None):
        """Retrieves memories matching tags."""
        with open(self.memory_file, "r") as f:
            memories = json.load(f)
            if not query_tags:
                return memories
            
            return [m for m in memories if any(tag in m['tags'] for tag in query_tags)]

def install_memory_skill():
    lake = InformationLake()
    # Initial seed memory
    lake.store_memory(
        "Sovereign Kingdom Protocol: Your Kingdom awaits, my liege.",
        source="system_init",
        tags=["onboarding", "greeting"]
    )

if __name__ == "__main__":
    install_memory_skill()

import json
import random
import time

class LeadGenSentinel:
    def __init__(self):
        self.sources = ["Bark.com", "UsedEverywhere.com", "Facebook Marketplace", "Kijiji"]
        self.leads_path = "d:/KoRT_Command_Center/Mission_Control/data/job_leads.json"
        
    def scan_for_leads(self):
        """
        Simulates the AI's search for people with money who want things.
        Generates leads based on the 'Double/10x' business model.
        """
        new_leads = [
            {
                "id": f"LEAD-{random.randint(1000, 9999)}",
                "source": random.choice(self.sources),
                "type": "digital",
                "client_budget": 500,
                "description": "Custom Website for Local Business",
                "status": "UNCLAIMED",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            },
            {
                "id": f"LEAD-{random.randint(1000, 9999)}",
                "source": "Local Outreach",
                "type": "physical",
                "client_budget": 1200,
                "materials_est": 300,
                "description": "Garden Shed Assembly & Foundation",
                "status": "UNCLAIMED",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
        ]
        
        # Save to leads database
        leads = []
        try:
            with open(self.leads_path, "r") as f:
                leads = json.load(f)
        except:
            pass
            
        leads.extend(new_leads)
        with open(self.leads_path, "w") as f:
            json.dump(leads, f, indent=4)
            
        print(f"[SENTINEL] {len(new_leads)} new leads discovered and prioritized for 10x potential.")
        return new_leads

if __name__ == "__main__":
    sentinel = LeadGenSentinel()
    sentinel.scan_for_leads()

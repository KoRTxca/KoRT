import os
import json
import time

class OnboardingTrigger:
    def __init__(self):
        self.registry_path = "d:/KoRT_Command_Center/Mission_Control/data/onboarding_queue.json"
        
    def log_invite_request(self, name, email, source="Web Portal"):
        """
        Logs a new invite request to the queue for staggered processing.
        """
        request = {
            "name": name,
            "email": email,
            "source": source,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "status": "Awaiting Onboarding",
            "phase": 1
        }
        
        # Load existing queue
        queue = []
        if os.path.exists(self.registry_path):
            with open(self.registry_path, "r") as f:
                queue = json.load(f)
        
        # Append new request
        queue.append(request)
        
        # Save back
        with open(self.registry_path, "w") as f:
            json.dump(queue, f, indent=4)
            
        print(f"[SUCCESS] Invite logged for {name} ({email}) from {source}.")
        self.trigger_onboarding_email(email, name)

    def trigger_onboarding_email(self, email, name):
        """
        Simulates the dispatch of the unified onboarding email.
        """
        print(f"📧 DISPATCHING UNIFIED ONBOARDING: {email}")
        print("-" * 50)
        print(f"Subject: Welcome to the Sovereign Mesh, {name}")
        print(f"Body: Greetings, Knight. Your request for entrance has been authorized.")
        print(f"Phase 1: The Interview. Please click the link below to verify your nodes.")
        print(f"Link: https://kortx.ca/interview?token=STAGGERED_PHASE_1")
        print("-" * 50)

if __name__ == "__main__":
    trigger = OnboardingTrigger()
    # Mock a request from the web portal
    trigger.log_invite_request("New User", "user@example.com")

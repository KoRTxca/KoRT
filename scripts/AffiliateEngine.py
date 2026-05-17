import hashlib
import json
import os
import time

class AffiliateEngine:
    def __init__(self):
        self.registry_path = "d:/KoRT_Command_Center/Mission_Control/data/affiliate_registry.json"
        
    def generate_invitation_code(self, user_id, salt="QUANTUM_AURUM"):
        """
        Generates a unique, encoded invitation hash for a user.
        """
        raw_string = f"{user_id}-{time.time()}-{salt}"
        return hashlib.sha256(raw_string.encode()).hexdigest()[:12].upper()

    def register_affiliate(self, user_id, referrer_id=None):
        """
        Initializes a user in the affiliate registry with 3-level hierarchy.
        """
        registry = self._load_registry()
        
        if user_id not in registry:
            registry[user_id] = {
                "invite_code": self.generate_invitation_code(user_id),
                "referrer": referrer_id, # L1 Referrer
                "recruits": [],
                "round_table_count": 0,
                "tier": "Page",
                "total_earned_rtd": 0.0,
                "platform_links": {} # e.g. {"koho": {"url": "...", "limit": 10, "count": 0}}
            }
            
            # Attribute to parent if exists
            if referrer_id and referrer_id in registry:
                registry[referrer_id]["recruits"].append(user_id)
                registry[referrer_id]["round_table_count"] += 1
                
                # Tier Advancement Logic
                # Milestone updated to 33 per Directive.
                if registry[referrer_id]["round_table_count"] >= 33:
                    registry[referrer_id]["tier"] = "Archon"
                    # Archon Tier: 25% commission total.
                    # 10% direct / 10% indirect / 5% to FAMILY MEMBER.
                    print(f"[ASCENSION] User {referrer_id} has attained ARCHON status. Initializing family legacy protocol.")
                elif registry[referrer_id]["round_table_count"] >= 3:
                    registry[referrer_id]["tier"] = "Knight"
                
                self._save_registry(registry)
                print(f"[RECRUIT] User {user_id} added to {referrer_id}'s Resistance Cell.")
            
            self._save_registry(registry)
            print(f"[SUCCESS] Affiliate node initialized for {user_id}. Referrer: {referrer_id}")
        return registry[user_id]

    def calculate_commissions(self, amount, user_id):
        """
        Calculates and attributes commissions across 3 levels.
        L1 (Direct): 20% (10% if Guru), L2: 10%, L3: 5% (10% if Guru L2)
        """
        registry = self._load_registry()
        commissions = []
        
        # Level 1
        l1_id = registry.get(user_id, {}).get("referrer")
        if l1_id:
            commissions.append({"id": l1_id, "amount": amount * 0.20, "level": 1})
            
            # Level 2
            l2_id = registry.get(l1_id, {}).get("referrer")
            if l2_id:
                commissions.append({"id": l2_id, "amount": amount * 0.10, "level": 2})
                
                # Level 3
                l3_id = registry.get(l2_id, {}).get("referrer")
                if l3_id:
                    commissions.append({"id": l3_id, "amount": amount * 0.05, "level": 3})
        
        return commissions

    def get_next_pool_link(self, platform):
        """
        Cycles through available affiliate links for a platform (FCFS).
        Drops saturated links from the list.
        """
        registry = self._load_registry()
        
        # Priority Queue: Mike (kslemk) and Isaac (islemk) always checked first
        priority_ids = ["kslemk", "islemk"]
        other_ids = [uid for uid in registry.keys() if uid not in priority_ids]
        
        for uid in (priority_ids + other_ids):
            user_data = registry.get(uid, {})
            link_data = user_data.get("platform_links", {}).get(platform)
            
            if link_data:
                if link_data["count"] < link_data["limit"]:
                    return {"user_id": uid, "url": link_data["url"]}
                    
        return None # All links saturated or none found

    def increment_referral_count(self, user_id, platform):
        """
        Increments the usage count for a platform link.
        """
        registry = self._load_registry()
        if user_id in registry and platform in registry[user_id]["platform_links"]:
            registry[user_id]["platform_links"][platform]["count"] += 1
            self._save_registry(registry)
            return True
        return False

    def auto_adopt_orphan(self, user_id, user_email, user_name):
        """
        Adopts a signup that has no referrer into the Resistance Cell Mesh.
        """
        registry = self._load_registry()
        
        # Heuristic 1: Relation check (Surname matching)
        surname = user_name.split()[-1].lower() if " " in user_name else None
        if surname:
            for uid, data in registry.items():
                if surname in uid.lower():
                    print(f"[CELL-ADOPT] Cell Relation found: {user_id} anchored to {uid} Cell.")
                    return self.register_affiliate(user_id, uid)

        # Fallback: Cell Pool Adoption (Filling the Quorum)
        priority_ids = ["kslemk", "islemk"]
        other_ids = [uid for uid in registry.keys() if uid not in priority_ids]
        
        for uid in (priority_ids + other_ids):
            if len(registry[uid]["recruits"]) < 33: # New 33-Member Cell target
                print(f"[CELL-POOL] {user_id} added to {uid}'s Cell to maintain mesh integrity.")
                return self.register_affiliate(user_id, uid)
                
        return self.register_affiliate(user_id, "kslemk")

    def claim_offline_referral(self, claimer_id, recruit_id, proof_note="Manual Offline Claim"):
        """
        Allows a member to claim a recruit they brought in 'offline'.
        Transparently updates the Resistance Cell hierarchy.
        """
        registry = self._load_registry()
        if recruit_id in registry and claimer_id in registry:
            # Shift the recruit to the new cell
            registry[recruit_id]["referrer"] = claimer_id
            registry[claimer_id]["recruits"].append(recruit_id)
            registry[claimer_id]["round_table_count"] = len(registry[claimer_id]["recruits"])
            
            # Log the proof for audit trail
            registry[recruit_id]["offline_proof"] = proof_note
            
            self._save_registry(registry)
            print(f"[OFFLINE-CLAIM] Cell Re-alignment: {recruit_id} successfully attributed to {claimer_id}.")
            return True
        return False

    def get_cell_contingency(self, cell_id):
        """
        Calculates the failover node for a cell if the primary node goes dark.
        """
        registry = self._load_registry()
        parent_id = registry.get(cell_id, {}).get("referrer")
        return parent_id if parent_id else "kslemk" # The King is the ultimate failover.

    def _load_registry(self):
        if os.path.exists(self.registry_path):
            with open(self.registry_path, "r") as f:
                return json.load(f)
        return {}

    def _save_registry(self, registry):
        with open(self.registry_path, "w") as f:
            json.dump(registry, f, indent=4)

if __name__ == "__main__":
    engine = AffiliateEngine()
    # Mocking a master user registration
    engine.register_affiliate("kslemk")

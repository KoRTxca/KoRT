import json
import os

class EconomicLedger:
    def __init__(self):
        self.ledger_path = "d:/KoRT_Command_Center/Mission_Control/data/kingdom_economics.json"
        
    def process_revenue(self, gross_revenue, expenses):
        """
        Calculates the KoRT Sovereign Split.
        1. Subtract Expenses (Overhead, AI, Coffee, SaaS).
        2. Split remaining profits: 60% Ops / 40% Members.
        3. Member split: 20% Direct Cash / 20% Stored/Invested.
        """
        net_profit = gross_revenue - expenses
        if net_profit <= 0:
            return {"status": "Maintenance Mode", "profit": 0}

        ops_fund = net_profit * 0.60
        member_fund = net_profit * 0.40
        
        direct_payout_pool = member_fund * 0.50 # The 20% of total profit
        sovereign_investment_pool = member_fund * 0.50 # The other 20%
        
        ledger = self._load_ledger()
        ledger["total_ops_fund"] += ops_fund
        ledger["total_member_pool"] += member_fund
        ledger["last_reconciliation_profit"] = net_profit
        
        self._save_ledger(ledger)
        
        return {
            "net_profit": net_profit,
            "ops_allocation": ops_fund,
            "member_allocation": member_fund,
            "direct_cash_pool": direct_payout_pool
        }

    def calculate_payout(self, user_rtd_balance, is_archon=False):
        """
        Calculates monthly commission-based payout (Tiered Splits).
        Archon Tier: 10% Direct / 10% Indirect / 5% Family.
        """
        base_payout = user_rtd_balance
        max_advance = base_payout * 0.35
        
        family_allocation = base_payout * 0.05 if is_archon else 0
        
        return {
            "expected_commission": base_payout,
            "available_advance": max_advance,
            "family_allocation": family_allocation,
            "direct_cash": base_payout * 0.10 if is_archon else base_payout,
            "indirect_fund": base_payout * 0.10 if is_archon else 0
        }

    def calculate_task_payout(self, task_base_rate, user_tier="Page"):
        """
        Calculates 100% direct payout for active labor/tasks.
        Rates scale with seniority (Page: 1.0x, Knight: 1.5x, Archon: 2.0x).
        """
        multipliers = {
            "Page": 1.0,
            "Knight": 1.5,
            "Archon": 2.0
        }
        multiplier = multipliers.get(user_tier, 1.0)
        final_payout = task_base_rate * multiplier
        
        print(f"[TASK-PAYOUT] Seniority Multiplier ({multiplier}x) applied for {user_tier}.")
        return {
            "direct_payout": final_payout,
            "allocation": "100% Direct",
            "source": "60% Ops Budget"
        }

    def calculate_job_offer(self, client_payment, materials=0, work_type="digital"):
        """
        Calculates job budget based on the KoRT Piecework Model.
        Digital: 50% to Human if AI does 90% of work.
        Physical: Revenue - Materials - 10% House Fee = 90% of remainder to Human.
        """
        if work_type == "digital":
            # Digital model: 50/50 split between House and Human
            human_payout = client_payment * 0.50
            house_profit = client_payment * 0.50
            return {
                "work_type": "Digital",
                "total_budget": client_payment,
                "human_payout": human_payout,
                "house_profit": house_profit,
                "ai_contribution": "90%"
            }
        else:
            # Physical model: Materials first, then 10% House Fee
            remaining = client_payment - materials
            house_fee = remaining * 0.10
            human_payout = remaining - house_fee
            
            return {
                "work_type": "Physical",
                "total_budget": client_payment,
                "materials_cost": materials,
                "house_fee": house_fee,
                "human_payout": human_payout,
                "min_hourly_rate": 25.00 # CDN
            }

    def calculate_archon_dividends(self, total_profit):
        """
        Archons receive exclusive dividends from the 40% member pool.
        """
        # Archon-only dividend logic
        return total_profit * 0.05 # 5% exclusive Archon Dividend Pool

if __name__ == "__main__":
    ledger = EconomicLedger()
    # Mocking $10k revenue with $2k expenses
    result = ledger.process_revenue(10000, 2000)
    print(json.dumps(result, indent=2))

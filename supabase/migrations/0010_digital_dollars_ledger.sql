-- KoRT Digital Dollars Supabase Migration v1.0
-- Sovereign Mutual-Credit Ledger Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- 1. SPHERICAL NODES TABLE
-- Tracks which sphere each knight operates in
-- ============================================
CREATE TABLE IF NOT EXISTS spherical_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    sphere_level INT NOT NULL CHECK (sphere_level BETWEEN 0 AND 5),
    designation TEXT NOT NULL,
    master_key_hash TEXT,
    capability_token TEXT,
    encryption_root TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sphere designation reference:
-- 0 = Sovereign Core (personal keys, master vault)
-- 1 = Family Hearth (household, private legacy)
-- 2 = Career & Future (Xception, Project Mayhem Hub)
-- 3 = Community Mesh (Cowichan Valley, mutual aid)
-- 4 = Jurisdictional (Digital Advocate, BC statutes)
-- 5 = Global/Recovery (Recovery Fork, inter-valley)

-- ============================================
-- 2. KNIGHTS TABLE
-- Core identity for all Round Table members
-- ============================================
CREATE TABLE IF NOT EXISTS knights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    email TEXT UNIQUE,
    avatar_url TEXT,
    una_profile_id INT,
    wp_user_id INT,
    reputation_score DECIMAL(8,2) DEFAULT 100.00,
    node_uptime_hours INT DEFAULT 0,
    icbc_success_rate DECIMAL(5,2) DEFAULT 0.00,
    xception_completions INT DEFAULT 0,
    community_vouches INT DEFAULT 0,
    wellness_completion_rate DECIMAL(5,2) DEFAULT 0.00,
    credit_limit DECIMAL(12,2) DEFAULT 500.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. DIGITAL DOLLARS LEDGER
-- Double-entry, append-only, signed transactions
-- ============================================
CREATE TABLE IF NOT EXISTS digital_dollars_ledger (
    tx_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_knight_id UUID NOT NULL REFERENCES knights(id),
    to_knight_id UUID NOT NULL REFERENCES knights(id),
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    sphere_level INT NOT NULL DEFAULT 0 CHECK (sphere_level BETWEEN 0 AND 5),
    tx_type TEXT NOT NULL DEFAULT 'transfer' CHECK (tx_type IN (
        'transfer',
        'mission_reward',
        'welcome_bounty',
        'icbc_fee',
        'xception_fee',
        'wellness_reward',
        'sponsor_credit',
        'mesh_relay',
        'ad_revenue',
        'referral_bonus'
    )),
    signed_tx_json JSONB,
    memo TEXT,
    mission_id UUID,
    crdt_version_vector JSONB,
    synced_to_usb BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast balance queries
CREATE INDEX idx_ledger_from ON digital_dollars_ledger(from_knight_id);
CREATE INDEX idx_ledger_to ON digital_dollars_ledger(to_knight_id);
CREATE INDEX idx_ledger_type ON digital_dollars_ledger(tx_type);
CREATE INDEX idx_ledger_created ON digital_dollars_ledger(created_at DESC);

-- ============================================
-- 4. KNIGHT BALANCES VIEW
-- Materialized from the double-entry ledger
-- ============================================
CREATE OR REPLACE VIEW knight_balances AS
SELECT
    knight_id,
    COALESCE(SUM(credits), 0) - COALESCE(SUM(debits), 0) AS balance,
    COUNT(*) AS total_transactions
FROM (
    SELECT to_knight_id AS knight_id, amount AS credits, 0 AS debits
    FROM digital_dollars_ledger
    UNION ALL
    SELECT from_knight_id AS knight_id, 0 AS credits, amount AS debits
    FROM digital_dollars_ledger
) ledger
GROUP BY knight_id;

-- ============================================
-- 5. MISSIONS TABLE
-- For Quantum Optimizer integration
-- ============================================
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
    assigned_knight_id UUID REFERENCES knights(id),
    reward_dd DECIMAL(12,2) DEFAULT 25.00,
    sphere_level INT DEFAULT 2,
    quantum_score DECIMAL(8,4),
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- 6. WELLNESS MISSIONS (Health Guardian)
-- 15 expanded wellness missions paying 5-20 DD
-- ============================================
CREATE TABLE IF NOT EXISTS wellness_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    mission_type TEXT NOT NULL CHECK (mission_type IN (
        'daily_mood_snapshot',
        'sleep_log',
        'hydration_check',
        'exercise_log',
        'nutrition_tracker',
        'meditation_session',
        'family_legacy_log',
        'gratitude_journal',
        'social_connection',
        'farm_stress_check',
        'off_grid_nutrition',
        'nature_walk',
        'skill_share',
        'community_meal',
        'recovery_checkin'
    )),
    reward_dd DECIMAL(12,2) NOT NULL CHECK (reward_dd BETWEEN 5 AND 20),
    completed BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- 7. ROW LEVEL SECURITY
-- ============================================
ALTER TABLE spherical_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE knights ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_dollars_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_missions ENABLE ROW LEVEL SECURITY;

-- Knights can view their own data
CREATE POLICY "knights_own_spheres" ON spherical_nodes
    FOR SELECT USING (knight_id IN (
        SELECT id FROM knights WHERE auth_user_id = auth.uid()
    ));

CREATE POLICY "knights_own_profile" ON knights
    FOR SELECT USING (auth_user_id = auth.uid());

CREATE POLICY "knights_own_transactions" ON digital_dollars_ledger
    FOR SELECT USING (
        from_knight_id IN (SELECT id FROM knights WHERE auth_user_id = auth.uid())
        OR to_knight_id IN (SELECT id FROM knights WHERE auth_user_id = auth.uid())
    );

CREATE POLICY "knights_own_missions" ON missions
    FOR SELECT USING (
        assigned_knight_id IN (SELECT id FROM knights WHERE auth_user_id = auth.uid())
        OR status = 'pending'
    );

CREATE POLICY "knights_own_wellness" ON wellness_missions
    FOR SELECT USING (
        knight_id IN (SELECT id FROM knights WHERE auth_user_id = auth.uid())
    );

-- Service role can do everything (for workers/bots)
CREATE POLICY "service_full_access_spheres" ON spherical_nodes
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_full_access_knights" ON knights
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_full_access_ledger" ON digital_dollars_ledger
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_full_access_missions" ON missions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_full_access_wellness" ON wellness_missions
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 8. SYSTEM KNIGHT (for auto-minting)
-- The "Round Table Treasury" that issues welcome bounties
-- ============================================
-- INSERT INTO knights (display_name, email, reputation_score, credit_limit)
-- VALUES ('Round Table Treasury', 'treasury@kortx.ca', 9999.99, 999999.99);

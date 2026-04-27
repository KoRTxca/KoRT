-- =============================================================================
-- KORT ENTERPRISE: MISSING TABLES (Supabase Migration 0003)
-- Reconciles against Blueprint Section 4 & Annex A.9
-- =============================================================================

-- 1. PARTIES
CREATE TABLE IF NOT EXISTS public.parties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('claimant', 'defendant', 'adjuster', 'counsel', 'witness', 'expert', 'medical')),
    name TEXT NOT NULL,
    organization TEXT,
    email TEXT,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DAMAGES
CREATE TABLE IF NOT EXISTS public.damages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('special', 'general', 'irb', 'medical', 'travel', 'out_of_pocket')),
    description TEXT NOT NULL,
    amount_cad NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disputed')),
    date_incurred DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CORRESPONDENCE
CREATE TABLE IF NOT EXISTS public.correspondence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    sender_id UUID REFERENCES public.parties(id),
    recipient_id UUID REFERENCES public.parties(id),
    subject TEXT,
    body_text TEXT,
    date_sent TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS (Round Table Review Ceremony)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    target_id UUID NOT NULL, -- references correspondence or exhibit
    target_type TEXT NOT NULL CHECK (target_type IN ('correspondence', 'exhibit', 'submission')),
    reviewer_id UUID REFERENCES public.profiles(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'changes_requested')),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. AUTHORIZATIONS
CREATE TABLE IF NOT EXISTS public.authorizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL CHECK (provider IN ('gmail', 'drive', 'ms365', 'icloud', 'banking')),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. DEADLINES
CREATE TABLE IF NOT EXISTS public.deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'missed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. LLM USAGE (For tracking costs/quotas)
CREATE TABLE IF NOT EXISTS public.llm_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    model TEXT NOT NULL,
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    cost_usd NUMERIC(10,5) DEFAULT 0.00000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. DIGITAL DOLLARS (Treasury & Balances)
CREATE TABLE IF NOT EXISTS public.digital_dollars (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    balance NUMERIC(10,2) DEFAULT 0.00,
    lifetime_earned NUMERIC(10,2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. DD TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.dd_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('earned_academy', 'earned_referral', 'spent_tier', 'spent_service', 'refund')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

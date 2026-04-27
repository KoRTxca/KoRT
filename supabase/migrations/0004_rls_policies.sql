-- =============================================================================
-- KORT ENTERPRISE: ROW LEVEL SECURITY (Supabase Migration 0004)
-- Blueprint Section 4.13 - "Claimant data must not leak across tenants"
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scribe_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.damages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.correspondence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.llm_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_dollars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dd_transactions ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 1. PROFILES (Users can read/update their own profile)
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 2. CASES (Users can read/update their own cases)
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view own cases" 
ON public.cases FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own cases" 
ON public.cases FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own cases" 
ON public.cases FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own cases" 
ON public.cases FOR DELETE USING (auth.uid() = profile_id);

-- -----------------------------------------------------------------------------
-- 3. EVIDENCE & TASKS (Derived through Case ownership)
-- -----------------------------------------------------------------------------
-- Scribe Tasks
CREATE POLICY "Users can view scribe tasks for own cases" 
ON public.scribe_tasks FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Exhibits
CREATE POLICY "Users can view exhibits for own cases" 
ON public.exhibits FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Timeline Events
CREATE POLICY "Users can view timeline events for own cases" 
ON public.timeline_events FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Parties
CREATE POLICY "Users can view parties for own cases" 
ON public.parties FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Damages
CREATE POLICY "Users can view damages for own cases" 
ON public.damages FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Correspondence
CREATE POLICY "Users can view correspondence for own cases" 
ON public.correspondence FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- Deadlines
CREATE POLICY "Users can view deadlines for own cases" 
ON public.deadlines FOR SELECT USING (
    case_id IN (SELECT id FROM public.cases WHERE profile_id = auth.uid())
);

-- -----------------------------------------------------------------------------
-- 4. PERSONAL ASSETS (Direct Profile link)
-- -----------------------------------------------------------------------------
-- Academy Progress
CREATE POLICY "Users can view own academy progress" 
ON public.academy_progress FOR SELECT USING (auth.uid() = profile_id);

-- Authorizations
CREATE POLICY "Users can view own authorizations" 
ON public.authorizations FOR SELECT USING (auth.uid() = profile_id);

-- LLM Usage
CREATE POLICY "Users can view own LLM usage" 
ON public.llm_usage FOR SELECT USING (auth.uid() = profile_id);

-- Digital Dollars
CREATE POLICY "Users can view own Digital Dollars balance" 
ON public.digital_dollars FOR SELECT USING (auth.uid() = profile_id);

-- DD Transactions
CREATE POLICY "Users can view own DD transactions" 
ON public.dd_transactions FOR SELECT USING (auth.uid() = profile_id);

-- -----------------------------------------------------------------------------
-- 5. GLOBAL READ-ONLY (Organizations)
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can view organizations" 
ON public.organizations FOR SELECT USING (true);

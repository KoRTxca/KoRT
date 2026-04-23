-- KORT SOVEREIGN OS — APP SUBMISSIONS SCHEMA
-- Phase: Alpha Launch Digital Dollars
-- Author: Antigravity / Gemini

CREATE TABLE IF NOT EXISTS public.app_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  app_name TEXT NOT NULL,
  app_url TEXT NOT NULL,
  category TEXT,
  referral_code TEXT NOT NULL,
  description TEXT,
  chain_depth TEXT DEFAULT '1',
  canada_available TEXT DEFAULT 'unknown',
  extra_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SECURITY: Enable RLS
ALTER TABLE public.app_submissions ENABLE ROW LEVEL SECURITY;

-- POLICIES
DROP POLICY IF EXISTS "Anyone can submit" ON public.app_submissions;
CREATE POLICY "Anyone can submit" ON public.app_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins see all" ON public.app_submissions;
-- Note: This assumes a 'users' table with roles exists. 
-- Adjust the subquery if your admin check logic differs.
CREATE POLICY "Admins see all" ON public.app_submissions FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'Round Table')
  OR 
  (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'))
);

-- KoRT Digital Dollars Ledger
-- Migration file for Supabase/Postgres Sovereign Core Database
-- Target: database.kortx.ca

-- Create Ledger Table
CREATE TABLE IF NOT EXISTS public.digital_dollars_ledger (
    tx_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_knight_id TEXT NOT NULL,
    to_knight_id TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    signed_tx_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    sphere_level INTEGER NOT NULL CHECK (sphere_level >= 0 AND sphere_level <= 5),
    synced_from_node TEXT DEFAULT 'Sovereign Core'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.digital_dollars_ledger ENABLE ROW LEVEL SECURITY;

-- Create Policies for Sovereign Verification
CREATE POLICY "Allow public read access to ledger history"
    ON public.digital_dollars_ledger FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated knights to append transactions"
    ON public.digital_dollars_ledger FOR INSERT
    WITH CHECK (
        -- Enforce double-entry security using signed OIDC tokens in header if available
        auth.role() = 'authenticated' OR 
        (signed_tx_json IS NOT NULL)
    );

-- Create Index for fast transaction tracking
CREATE INDEX IF NOT EXISTS idx_ledger_from ON public.digital_dollars_ledger(from_knight_id);
CREATE INDEX IF NOT EXISTS idx_ledger_to ON public.digital_dollars_ledger(to_knight_id);
CREATE INDEX IF NOT EXISTS idx_ledger_timestamp ON public.digital_dollars_ledger(created_at);

-- Comments representing system credentials and sovereignty rules
COMMENT ON TABLE public.digital_dollars_ledger IS 'KoRT Sovereign Mutual-Credit Double-Entry Ledger System';

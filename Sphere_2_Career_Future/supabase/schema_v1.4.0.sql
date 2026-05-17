-- KoRT Master Ledger v1.4.0
CREATE TABLE IF NOT EXISTS assets (id TEXT PRIMARY KEY, asset_type TEXT, status TEXT DEFAULT 'intake');
CREATE TABLE IF NOT EXISTS rtd_ledger (id BIGSERIAL PRIMARY KEY, user_id UUID, amount NUMERIC(10,2), transaction_type TEXT);

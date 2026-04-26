-- =============================================================================
-- KORT ENTERPRISE: EVIDENCE & ACADEMY (Supabase Migration 0002)
-- =============================================================================

-- 1. SCRIBE TASKS (Digital Scribe / Digital Scout Ingestion Queue)
CREATE TABLE IF NOT EXISTS public.scribe_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    target TEXT NOT NULL CHECK (target IN ('gmail', 'drive', 'phone_photos', 'banking', 'manual')),
    search_terms TEXT[], -- e.g. ['ICBC', 'Slemko', 'DA57244']
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'authorized', 'running', 'completed', 'failed')),
    result_summary JSONB, -- Stores metadata about what was harvested
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. EXHIBITS (Harvested Evidence)
CREATE TABLE IF NOT EXISTS public.exhibits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    source_task_id UUID REFERENCES public.scribe_tasks(id) ON DELETE SET NULL,
    doc_type TEXT NOT NULL CHECK (doc_type IN ('invoice', 'receipt', 'email', 'letter', 'photo', 'audio', 'video', 'other')),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL, -- URL to Supabase Storage bucket 'case-exhibits'
    ocr_text TEXT, -- Raw text extracted for AI semantic search
    event_date DATE,
    amount_cad NUMERIC(10,2),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TIMELINE EVENTS (The Chronological Narrative of a Case)
CREATE TABLE IF NOT EXISTS public.timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    exhibit_id UUID REFERENCES public.exhibits(id) ON DELETE SET NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'hostile')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ACADEMY PROGRESS (Gamified Financial/Legal Literacy)
CREATE TABLE IF NOT EXISTS public.academy_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    score INTEGER DEFAULT 0,
    digital_dollars_awarded NUMERIC(10,2) DEFAULT 0.00,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(profile_id, lesson_id)
);

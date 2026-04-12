import { createClient } from '@supabase/supabase-js'

// KORT_OS: MASTER ARCHITECTURE - Backend Node
// Driven by Supabase Project ID: skfxkjshsnvimdeirfec

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://skfxkjshsnvimdeirfec.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'MISSING_ANON_KEY_REQUIRES_ENV';

export const supabase = createClient(supabaseUrl, supabaseKey);

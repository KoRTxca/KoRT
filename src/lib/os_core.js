import { createClient } from '@supabase/supabase-js'

// --- 1. BACKEND ARCHITECTURE (SUPABASE) ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://skfxkjshsnvimdeirfec.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'MISSING_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);

// --- 2. INTELLIGENCE ORCHESTRATION (MERLIN) ---
const OLLAMA_HOST = 'http://192.168.1.101:11434';
export const merlinClient = {
  checkStatus: async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: controller.signal });
      clearTimeout(timeoutId);
      return res.ok;
    } catch (e) { return false; }
  },
  generate: async (prompt, model = 'llama3') => {
    try {
      const res = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: false })
      });
      const data = await res.json();
      return data.response;
    } catch (e) {
      console.error("Merlin Generation Error:", e);
      throw e;
    }
  }
};

const { createClient } = require('@supabase/supabase-js');

async function test(key, label) {
  const supabase = createClient('https://skfxkjshsnvimdeirfec.supabase.co', key);
  const { data, error } = await supabase.from('knights').select('*').limit(1);
  if (error) {
    console.log(`❌ [${label}] Error:`, error.message);
  } else {
    console.log(`✅ [${label}] Success!`);
  }
}

const keyWithSubamase = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhbWFzZSIsInJlZiI6InNrZnhranNoc252aW1kZWlyZmVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQzMDk0OCwiZXhwIjoyMDg5MDA2OTQ4fQ.glnpaTLFL2Z9dC3V2fRldedKxdBuYASicVhetfy0R7Q';
const keyWithSupabase = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZnhranNoc252aW1kZWlyZmVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQzMDk0OCwiZXhwIjoyMDg5MDA2OTQ4fQ.glnpaTLFL2Z9dC3V2fRldedKxdBuYASicVhetfy0R7Q';

(async () => {
  await test(keyWithSubamase, 'Subamase');
  await test(keyWithSupabase, 'Supabase');
})();

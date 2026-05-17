const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://skfxkjshsnvimdeirfec.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhbWFzZSIsInJlZiI6InNrZnhranNoc252aW1kZWlyZmVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQzMDk0OCwiZXhwIjoyMDg5MDA2OTQ4fQ.glnpaTLFL2Z9dC3V2fRldedKxdBuYASicVhetfy0R7Q');

async function test() {
  const { data, error } = await supabase.from('knights').select('*').limit(1);
  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Success! Data:', data);
  }
}

test();

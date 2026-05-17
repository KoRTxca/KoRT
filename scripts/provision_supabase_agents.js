/**
 * ⚔️ KoRTx Supabase 133 Agent Provisioner
 * Creates 133 auth users and knight profiles in Supabase.
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Extract agent data (abbreviated here, I'll load from a JSON file or the PHP script)
const agents = JSON.parse(fs.readFileSync(path.join(__dirname, './kortx_133_agents.json'), 'utf8'));

async function provisionAgents() {
  console.log(`Starting provisioning for ${agents.length} agents...`);

  for (const agent of agents) {
    console.log(`Processing: ${agent.name} (${agent.username})`);

    // 1. Create Auth User
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: agent.email,
      password: agent.password,
      email_confirm: true,
      user_metadata: {
        username: agent.username,
        full_name: agent.name,
        role: agent.role
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.warn(`⚠️ Auth user already exists: ${agent.email}`);
      } else {
        console.error(`❌ Error creating auth user: ${authError.message}`);
        continue;
      }
    }

    // Get the user ID (either from the new user or by searching)
    let userId;
    if (authUser?.user) {
      userId = authUser.user.id;
    } else {
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const user = existingUser.users.find(u => u.email === agent.email);
      userId = user?.id;
    }

    if (!userId) {
      console.error(`❌ Could not resolve user ID for ${agent.email}`);
      continue;
    }

    // 2. Create Knight Profile
    const { error: profileError } = await supabase
      .from('knights')
      .upsert({
        user_id: userId,
        digital_dollars_balance: 100, // Welcome bounty
        mental_health_snapshot: { status: "operational", last_sync: new Date().toISOString() }
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error(`❌ Error creating knight profile: ${profileError.message}`);
    } else {
      console.log(`✅ Provisioned: ${agent.name}`);
    }
  }

  console.log("⚔️ Provisioning complete.");
}

provisionAgents();

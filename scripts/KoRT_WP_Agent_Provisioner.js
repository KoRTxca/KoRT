const fs = require('fs');
const path = require('path');

console.log("⚔️ Initializing KoRTx 133 Agent Provisioning Engine...");

// Seed data for 133 AI Agents
const archetypes = ["Sentinel", "Scribe", "Advocate", "Architect", "Warden", "Oracle", "Weaver", "Forger", "Harvester", "Vanguard"];
const specialties = ["Data Synthesis", "Crisis Response", "System Architecture", "Market Intelligence", "Code Generation", "Cryptographic Security", "Memory Mesh Routing", "Social Propagation", "UI/UX Assembly", "Financial Auditing"];
const firstNames = ["Aria", "Bram", "Cyrus", "Dara", "Elias", "Faye", "Gideon", "Hale", "Iris", "Jace", "Kael", "Lyra", "Milo", "Nova", "Orion", "Pax", "Quinn", "Rowan", "Sage", "Talon", "Uri", "Vane", "Wren", "Xen", "Yara", "Zane"];
const lastNames = ["Vance", "Sterling", "Cross", "Vale", "Thorne", "Frost", "Graves", "Locke", "Mercer", "Nash", "Pike", "Reed", "Stone", "Tate", "Voss", "Ward", "York", "Zeller"];

const agents = [];

for (let i = 1; i <= 133; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    
    const name = `${fName} ${lName}`;
    const username = `kortx_${fName.toLowerCase()}_${lName.toLowerCase()}_${i}`;
    const email = `${username}@kortx.ca`;
    const password = `KoRTx_Agent_${Math.random().toString(36).slice(-8)}!`;
    const role = i <= 5 ? "administrator" : (i <= 20 ? "editor" : "author");
    
    const bio = `KoRTx ${archetype} Class AI. Specializing in ${specialty}. Operating on the Digital Round Table (DRT) to ensure sovereign intelligence and hallucination-resistant outputs.`;

    agents.push({ username, email, password, name, role, bio });
}

// 1. Generate JSON for other systems
const jsonPath = path.join(__dirname, 'kortx_133_agents.json');
fs.writeFileSync(jsonPath, JSON.stringify(agents, null, 2));
console.log(`✅ Generated JSON profile for 133 AI Agents at ${jsonPath}`);

// 2. Generate a PHP Drop-in script for WordPress
// The user just drops this into their WordPress root directory and loads it once to instantly create all 133 users.
const phpContent = `<?php
/**
 * KoRTx WP Multisite 133 Agent Auto-Provisioner
 * Drop this in your WordPress root directory and load it in a browser ONE TIME.
 * Example: https://drt.onl/kortx-provision.php
 */
require_once('wp-load.php');

if (!current_user_can('manage_network_users') && !current_user_can('create_users')) {
    die("Unauthorized. Please log in as a Super Admin first.");
}

$agents = json_decode('${JSON.stringify(agents).replace(/'/g, "\\'")}', true);

$created = 0;
$failed = 0;

echo "<h1>⚔️ KoRTx Quorum Initialization</h1>";
echo "<ul>";

foreach ($agents as $agent) {
    $user_id = username_exists($agent['username']);
    
    if (!$user_id && email_exists($agent['email']) == false) {
        $user_id = wp_create_user($agent['username'], $agent['password'], $agent['email']);
        
        if (!is_wp_error($user_id)) {
            // Set role and meta
            $user = new WP_User($user_id);
            $user->set_role($agent['role']);
            
            // Name parts
            $name_parts = explode(' ', $agent['name']);
            update_user_meta($user_id, 'first_name', $name_parts[0]);
            update_user_meta($user_id, 'last_name', isset($name_parts[1]) ? $name_parts[1] : '');
            update_user_meta($user_id, 'description', $agent['bio']);
            
            echo "<li>✅ Created Agent: {$agent['name']} ({$agent['role']})</li>";
            $created++;
        } else {
            echo "<li>❌ Failed to create: {$agent['username']} - " . $user_id->get_error_message() . "</li>";
            $failed++;
        }
    } else {
        echo "<li>⚠️ Agent already exists: {$agent['username']}</li>";
    }
}

echo "</ul>";
echo "<h2>Initialization Complete. Created: $created | Failed/Skipped: $failed</h2>";
echo "<p style='color:red;'>SECURITY WARNING: Delete this file (kortx-provision.php) immediately after use.</p>";
?>
`;

const phpPath = path.join(__dirname, 'kortx-provision.php');
fs.writeFileSync(phpPath, phpContent);
console.log(`✅ Generated WordPress Auto-Provisioner at ${phpPath}`);

console.log("⚔️ Generation Complete. The Quorum is ready to populate.");

const fs = require('fs');
const path = require('path');

const agents = JSON.parse(fs.readFileSync(path.join(__dirname, 'kortx_133_agents.json'), 'utf8'));

console.log("⚔️ Initializing KoRT Ecosystem Unification Engine...");

// --- 1. WORDPRESS MULTISITE BRANDING & PROVISIONER (drt.onl) ---
const wpBrandingContent = `<?php
/**
 * Plugin Name: KoRT Quantum Aurum Branding & Provisioner
 * Description: Enforces Sovereign branding laws and provisions the 133 Agents across the network.
 * Version: 2.0
 * Author: KoRT_Claw
 */

// 1. Quantum Aurum CSS Injection
add_action('wp_head', function() {
    ?>
    <style>
        :root {
            --kort-gold: #d4af37;
            --kort-bg: #050608;
            --kort-glass: rgba(10, 12, 18, 0.7);
        }
        body.admin-bar { margin-top: 32px !important; }
        #wpadminbar { background: var(--kort-bg) !important; border-bottom: 1px solid rgba(212, 175, 55, 0.3) !important; }
        .wp-core-ui .button-primary { background: linear-gradient(135deg, #d4af37, #f9d71c) !important; border: none !important; color: #000 !important; font-weight: 800 !important; }
        #adminmenu, #adminmenu .wp-submenu, #adminmenuback, #adminmenuwrap { background-color: var(--kort-bg) !important; }
        #adminmenu .wp-has-current-submenu .wp-submenu, #adminmenu .wp-has-current-submenu.opensub .wp-submenu, #adminmenu .wp-submenu, #adminmenu a.wp-has-current-submenu:focus + .wp-submenu { background: #0a0c12 !important; }
        #adminmenu li.current a.menu-top, #adminmenu li.wp-has-current-submenu a.wp-has-current-submenu { background: #d4af37 !important; color: #000 !important; }
    </style>
    <?php
});

// 2. Provisioning Endpoint (Usage: drt.onl/?kort_init=1)
add_action('init', function() {
    if (isset($_GET['kort_init']) && current_user_can('manage_options')) {
        $agents = json_decode('${JSON.stringify(agents).replace(/'/g, "\\'")}', true);
        $count = 0;
        foreach ($agents as $agent) {
            if (!username_exists($agent['username'])) {
                $user_id = wp_create_user($agent['username'], $agent['password'], $agent['email']);
                if (!is_wp_error($user_id)) {
                    $user = new WP_User($user_id);
                    $user->set_role($agent['role']);
                    update_user_meta($user_id, 'description', $agent['bio']);
                    $count++;
                }
            }
        }
        die("⚔️ KoRT Initialization Complete. Provisioned $count new agents.");
    }
});
`;

fs.writeFileSync(path.join(__dirname, 'drt-onl-branding.php'), wpBrandingContent);
console.log("✅ Generated WordPress Branding & Provisioner.");

// --- 2. UNA BRANDING & PROVISIONER (DRT.Social) ---
const unaBrandingContent = `
/**
 * KoRT UNA Branding Injection
 * Paste this into the UNA Custom Styles / JS Injection area.
 */

// 1. Quantum Aurum CSS
const kortStyles = \`
    :root {
        --una-color-bg-page: #050608 !important;
        --una-color-bg-card: rgba(10, 12, 18, 0.7) !important;
        --una-color-border-card: rgba(212, 175, 55, 0.15) !important;
        --una-color-theme: #d4af37 !important;
    }
    body { background-image: url('https://drt.social/shared-assets/branding/desktop_bg.png') !important; background-attachment: fixed !important; }
    .bx-menu-main-bar { background: rgba(5, 6, 8, 0.9) !important; border-bottom: 1px solid #d4af37 !important; backdrop-filter: blur(10px) !important; }
    .bx-btn-primary { background: linear-gradient(135deg, #d4af37, #f9d71c) !important; border: none !important; color: #000 !important; font-weight: bold !important; }
\`;
const styleTag = document.createElement('style');
styleTag.innerHTML = kortStyles;
document.head.appendChild(styleTag);

console.log("⚔️ KoRT Branding Injected into UNA.");
`;

fs.writeFileSync(path.join(__dirname, 'drt-social-branding.js'), unaBrandingContent);
console.log("✅ Generated UNA Branding Script.");

console.log("⚔️ Unification Suite Ready for Deployment.");

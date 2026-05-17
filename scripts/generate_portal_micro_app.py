#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KoRT Portal Generator Micro-App ($0.97 retail edition)
Scans the local filesystem, accounts, and specifications, and compiles a highly personalized,
stunning "Quantum Aurum" Mission Control HTML dashboard.
"""

import os
import sys
import json
from pathlib import Path

DEFAULT_PORTAL_NAME = "Mission Control"
DEFAULT_SPHERE_LIMIT = 5

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KoRT Mission Control | {user_name} Edition</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-deep: #050608;
            --bg-card: rgba(10, 12, 18, 0.75);
            --border-card: rgba(212, 175, 55, 0.2);
            --gold: #d4af37;
            --gold-bright: #f9d71c;
            --aurum-gradient: linear-gradient(135deg, #d4af37 0%, #f9d71c 100%);
            --blue-glow: rgba(0, 242, 255, 0.1);
            --text-primary: #ffffff;
            --text-secondary: #a0a5b5;
            --glass-blur: blur(25px);
            --accent-cyan: #00f2ff;
        }}

        @keyframes holoPulse {{
            0% {{ opacity: 0.1; transform: translateY(0) scale(1); }}
            50% {{ opacity: 0.18; transform: translateY(-10px) scale(1.01); }}
            100% {{ opacity: 0.1; transform: translateY(0) scale(1); }}
        }}

        * {{
            margin: 0; padding: 0; box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: var(--gold) var(--bg-deep);
        }}

        body {{
            background-color: var(--bg-deep);
            color: var(--text-primary);
            font-family: 'Outfit', sans-serif;
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
            background-image: radial-gradient(circle at top right, rgba(0, 242, 255, 0.05), transparent),
                              radial-gradient(circle at bottom left, rgba(212, 175, 55, 0.03), transparent);
        }}

        .holo-grid {{
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(rgba(212, 175, 55, 0.01) 1px, transparent 1px) 0 0 / 50px 50px,
                        linear-gradient(90deg, rgba(212, 175, 55, 0.01) 1px, transparent 1px) 0 0 / 50px 50px;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        }}

        .holo-carbon {{
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
            opacity: 0.03;
            pointer-events: none;
            z-index: -1;
            animation: holoPulse 20s infinite alternate ease-in-out;
        }}

        .container {{
            max-width: 1600px;
            margin: 0 auto;
            padding: 5rem 2rem 5rem 7rem;
            position: relative;
        }}

        /* --- Floating Sidebar --- */
        nav.sidebar {{
            position: fixed;
            left: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            z-index: 1000;
        }}

        nav.sidebar a {{
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: var(--gold);
            font-size: 1.3rem;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: var(--glass-blur);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            position: relative;
        }}

        nav.sidebar a:hover {{
            transform: scale(1.15) translateX(8px);
            background: var(--aurum-gradient);
            color: #000;
            box-shadow: 0 0 25px var(--gold);
            border-color: var(--gold-bright);
        }}

        nav.sidebar a::after {{
            content: attr(data-tooltip);
            position: absolute;
            left: 70px;
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            color: var(--gold-bright);
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s;
            pointer-events: none;
            backdrop-filter: var(--glass-blur);
        }}

        nav.sidebar a:hover::after {{
            opacity: 1;
            transform: translateX(0);
        }}

        /* --- Header --- */
        header {{
            margin-bottom: 5rem;
            border-left: 4px solid var(--gold);
            padding-left: 2rem;
            position: relative;
        }}

        h1 {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 4.5rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -2px;
            background: var(--aurum-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
        }}

        .subtitle {{
            font-size: 1.2rem;
            color: var(--gold);
            font-weight: 300;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-top: 0.5rem;
        }}

        .hud-status {{
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 50px;
            padding: 10px 24px;
            display: flex;
            align-items: center;
            gap: 15px;
            backdrop-filter: var(--glass-blur);
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }}

        .status-dot {{
            width: 8px; height: 8px; border-radius: 50%;
            background: #00ff88; box-shadow: 0 0 10px #00ff88;
        }}

        .hud-wallet {{
            color: #00ff88; font-weight: 800; font-size: 0.85rem;
        }}

        /* --- Main Grid --- */
        .main-grid {{
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
        }}

        @media (max-width: 1200px) {{
            .main-grid {{ grid-template-columns: 1fr; }}
            .container {{ padding-left: 5rem; }}
        }}

        /* --- Cards --- */
        .card {{
            background: var(--bg-card);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--border-card);
            border-radius: 24px;
            padding: 2.5rem;
            margin-bottom: 2.5rem;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
            position: relative;
            overflow: hidden;
            transition: border-color 0.4s;
        }}

        .card:hover {{
            border-color: rgba(212, 175, 55, 0.4);
        }}

        .card::before {{
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 3px;
            background: var(--aurum-gradient);
            opacity: 0.6;
        }}

        h2 {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            color: var(--gold);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding-bottom: 0.8rem;
        }}

        /* --- Interactive Search & Glossary --- */
        .search-container {{
            margin-bottom: 2rem;
            position: relative;
        }}

        .search-input {{
            width: 100%;
            padding: 14px 20px;
            border-radius: 12px;
            background: rgba(0,0,0,0.4);
            border: 1px solid var(--border-card);
            color: #fff;
            font-family: 'Outfit', sans-serif;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s;
        }}

        .search-input:focus {{
            border-color: var(--accent-cyan);
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);
        }}

        .file-list {{
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 500px;
            overflow-y: auto;
            padding-right: 10px;
        }}

        .file-item {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-radius: 12px;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.04);
            transition: all 0.3s;
        }}

        .file-item:hover {{
            background: rgba(212, 175, 55, 0.04);
            border-color: var(--gold);
            transform: translateX(5px);
        }}

        .file-name-container {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .file-icon {{ font-size: 1.2rem; }}

        .file-name {{
            font-weight: 600;
            color: #fff;
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s;
        }}

        .file-name:hover {{
            color: var(--gold-bright);
        }}

        .file-desc {{
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-top: 2px;
        }}

        .sphere-badge {{
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: rgba(0, 242, 255, 0.1);
            color: var(--accent-cyan);
            border: 1px solid rgba(0, 242, 255, 0.2);
        }}

        /* --- Quorum & Telemetry --- */
        .quorum-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 12px;
        }}

        .quorum-card {{
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 14px;
            padding: 1.2rem 1rem;
            text-align: center;
            position: relative;
            transition: all 0.3s;
        }}

        .quorum-card:hover {{
            border-color: var(--gold);
            transform: translateY(-5px);
            background: rgba(212, 175, 55, 0.04);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }}

        .q-role {{
            font-size: 0.55rem;
            font-weight: 800;
            color: var(--accent-cyan);
            text-transform: uppercase;
            letter-spacing: 1px;
        }}

        .q-id {{
            display: block;
            font-weight: 700;
            font-size: 1rem;
            margin: 4px 0;
            color: #fff;
        }}

        .q-status {{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 0.65rem;
            color: #00ff88;
            font-weight: 600;
        }}

        .q-dot {{
            width: 6px; height: 6px; border-radius: 50%;
            background: #00ff88; box-shadow: 0 0 6px #00ff88;
        }}

        /* --- Merlin Assistant Widget --- */
        #merlin-companion {{
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 320px;
            z-index: 10000;
            pointer-events: none;
        }}

        .merlin-avatar-wrap {{
            width: 140px; height: 140px;
            margin: 0 auto;
            position: relative;
            cursor: pointer;
            pointer-events: auto;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }}

        .merlin-avatar-wrap:hover {{
            transform: scale(1.12) rotate(4deg);
        }}

        .merlin-avatar-wrap img {{
            width: 100%; height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 15px var(--gold));
        }}

        .merlin-bubble {{
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 20px;
            padding: 1.2rem;
            margin-top: 10px;
            font-size: 0.85rem;
            color: var(--gold-bright);
            box-shadow: 0 12px 40px rgba(0,0,0,0.5);
            backdrop-filter: var(--glass-blur);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
            pointer-events: auto;
        }}

        #merlin-companion.active .merlin-bubble {{
            opacity: 1;
            transform: translateY(0);
        }}

        /* --- Custom Scrollbar --- */
        ::-webkit-scrollbar {{
            width: 8px;
        }}
        ::-webkit-scrollbar-track {{
            background: rgba(0,0,0,0.2);
        }}
        ::-webkit-scrollbar-thumb {{
            background: var(--border-card);
            border-radius: 4px;
        }}
        ::-webkit-scrollbar-thumb:hover {{
            background: var(--gold);
        }}
    </style>
</head>
<body>
    <div class="holo-grid"></div>
    <div class="holo-carbon"></div>

    <div class="hud-status">
        <div class="status-dot"></div>
        <span style="font-size: 0.7rem; font-weight: 800; letter-spacing: 2px;">SOVEREIGN ACTIVE</span>
        <span style="opacity: 0.3;">|</span>
        <span class="hud-wallet">1,250.00 DD</span>
    </div>

    <nav class="sidebar">
        <a href="#dashboard" data-tooltip="Dashboard">🏠</a>
        <a href="#glossary" data-tooltip="Sovereign Index">📚</a>
        <a href="#workforce" data-tooltip="AI Workforce">👥</a>
        <a href="#infrastructure" data-tooltip="Infrastructure">🛠️</a>
        <a href="#sanctuary" data-tooltip="Sanctuary">🛸</a>
    </nav>

    <div class="container">
        <header id="dashboard">
            <h1>{portal_title}</h1>
            <div class="subtitle">Quantum Aurum Core v2.0</div>
        </header>

        <div class="main-grid">
            <div class="left-col">
                <!-- SITREP -->
                <div class="card">
                    <h2>📊 Sovereign SITREP</h2>
                    <p style="color: var(--gold-bright); font-weight: 700; margin-bottom: 1rem;">STATUS: OMNI-STABLE | SECURE DEPLOYMENT</p>
                    <div style="background: rgba(0, 242, 255, 0.03); border-left: 4px solid var(--accent-cyan); padding: 1.2rem; border-radius: 8px;">
                        <p style="font-size: 0.95rem; color: #fff;">
                            "Get paid to belong. No one gets left behind." The monorepo has transitioned to a fully private self-hosted architecture. Standard API end-points are active and failover guardrails are synchronized.
                        </p>
                    </div>
                </div>

                <!-- GLOSSARY & TABLE OF CONTENTS -->
                <div class="card" id="glossary">
                    <h2>📚 Sovereign Branded Glossary & Filesystem Index</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                        Real-time file map across all spheres. Use search to filter canonical documentation, assets, and active modules.
                    </p>
                    <div class="search-container">
                        <input type="text" id="search-box" class="search-input" placeholder="Search files, logs, or blueprints...">
                    </div>
                    <div class="file-list" id="file-registry">
                        {file_items_placeholder}
                    </div>
                </div>

                <!-- AI WORKFORCE -->
                <div class="card" id="workforce">
                    <h2>👥 AI Quorum Workforce</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                        Real-time telemetry and standing orders of synchronized AI specialized seats.
                    </p>
                    <div class="quorum-grid">
                        <div class="quorum-card">
                            <span class="q-role">Castellan</span>
                            <span class="q-id">Antigravity</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                        <div class="quorum-card">
                            <span class="q-role">Archivist</span>
                            <span class="q-id">Scribe</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                        <div class="quorum-card">
                            <span class="q-role">Inference</span>
                            <span class="q-id">Merlin</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                        <div class="quorum-card">
                            <span class="q-role">Security</span>
                            <span class="q-id">Bedivere</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                        <div class="quorum-card">
                            <span class="q-role">Strategist</span>
                            <span class="q-id">Gawain</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                        <div class="quorum-card">
                            <span class="q-role">Guardian</span>
                            <span class="q-id">Galahad</span>
                            <div class="q-status"><div class="q-dot"></div>ACTIVE</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right-col">
                <!-- INFRASTRUCTURE -->
                <div class="card" id="infrastructure">
                    <h2>🛠️ Sovereign Mesh Infrastructure</h2>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 5px;">
                                <span style="font-weight: 600;">Xeon Core Node (Active)</span>
                                <span style="color: #00ff88;">104.219.251.218</span>
                            </div>
                            <div style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                <div style="width: 14%; height: 100%; background: var(--aurum-gradient);"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 5px;">
                                <span style="font-weight: 600;">Kamatera Failover (Mirror)</span>
                                <span style="color: var(--accent-cyan);">66.55.78.96</span>
                            </div>
                            <div style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                                <div style="width: 0%; height: 100%; background: var(--accent-cyan);"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SANCTUARY PROTOCOL -->
                <div class="card" id="sanctuary" style="border-color: rgba(255, 42, 42, 0.2);">
                    <h2>🛸 Sanctuary Protocol</h2>
                    <p style="color: #ff2a2a; font-weight: 700; font-size: 0.85rem; margin-bottom: 10px;">LOCKED TERMINAL — SPHERE 0</p>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">
                        Star Trek archives, blueprints, and private Roddenberry logs are successfully isolated. Automated firewalls block unauthorized commercial crawlers.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- MERLIN COMPANION -->
    <div id="merlin-companion" class="active">
        <div class="merlin-avatar-wrap" onclick="merlinSpeak()">
            <img src="merlin_transparent_guide.png" onerror="this.src='https://i.imgur.com/W2d0uLz.png';" alt="Merlin Guide">
        </div>
        <div class="merlin-bubble" id="merlin-bubble-text">
            "Welcome back, Knight! We are currently operating at warp speed. All sovereign files are indexed."
        </div>
    </div>

    <script>
        // Interactive search engine
        document.getElementById('search-box').addEventListener('input', function(e) {{
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.file-item');
            items.forEach(item => {{
                const text = item.innerText.toLowerCase();
                if(text.includes(term)) {{
                    item.style.display = 'flex';
                }} else {{
                    item.style.display = 'none';
                }}
            }});
        }});

        // Merlin dialog rotations (Logic/Strategy, Doc Brown, Roddenberry, Keanu)
        const quotes = [
            "\\\"Logic is the beginning of wisdom, not the end.\\\" — Spock",
            "\\\"Roads? Where we're going, we don't need roads.\\\" — Doc Brown",
            "\\\"It is the struggle itself, not the encounter, that winneth the crown.\\\" — Keanu Reeves",
            "\\\"No one gets left behind. The future is created now.\\\" — Gene Roddenberry",
            "\\\"The only way to make sense out of change is to plunge into it.\\\" — Alan Watts",
            "\\\"Sovereignty is not given, it is taken.\\\" — Castellan"
        ];
        
        let quoteIndex = 0;
        function merlinSpeak() {{
            const bubble = document.getElementById('merlin-bubble-text');
            quoteIndex = (quoteIndex + 1) % quotes.length;
            bubble.innerText = quotes[quoteIndex];
        }}
    </script>
</body>
</html>
"""

def scan_files(root_path: Path) -> list:
    items = []
    
    # Define mapping of files and directories to Spheres and descriptions
    spherical_map = {
        "Sphere_0_Sovereign_Core": (0, "Core databases, primary credentials, and Sanctuary vaults."),
        "Sphere_1_Family_Hearth": (1, "Private personal files, recovery details, and memory logs."),
        "Sphere_2_Career_Future": (2, "Project blueprints, sovereign applications, and development repositories."),
        "Sphere_3_Community_Mesh": (3, "Mesh node configs, coordination tools, and agent networks."),
        "Sphere_4_Jurisdictional": (4, "Legal entities, tax records, and sovereign registrations."),
        "Sphere_5_Global_Mesh": (5, "Server failover arrays, Namecheap, and Kamatera deployments."),
        "MASTER_CONTEXT.md": (0, "Canonical architecture ledger for the KoRT sovereignty core."),
        "SKILLS.md": (0, "Standing rules of operational engagement and AI capability tokens."),
        "Roadmap.md": (0, "Omni-convergence implementation timeline."),
        "CHANGELOG.md": (0, "Git commit history and incremental improvements ledger."),
        "scripts": (2, "Automation frameworks, Xeon control utilities, and Namecheap DNS automation."),
        "portals": (2, "Quantum Aurum theme user portals and LCARS Command dashboard HUDs."),
        "apps": (2, "Sovereign microservices (Digital Dollars, Advocate engine, and Watch nodes)."),
    }
    
    for item in root_path.iterdir():
        if item.name.startswith(".") or item.name == "node_modules":
            continue
        
        name = item.name
        sphere = 2
        desc = "Monorepo workspace component"
        icon = "📁" if item.is_dir() else "📄"
        
        if name in spherical_map:
            sphere, desc = spherical_map[name]
        
        if item.is_dir() and "Sphere_" in name:
            icon = "🌐"
            
        items.append({
            "name": name,
            "path": item.absolute().as_uri(),
            "sphere": sphere,
            "desc": desc,
            "icon": icon
        })
        
    return sorted(items, key=lambda x: x["sphere"])

def generate_portal(user_name: str, target_dir: Path, output_file: Path):
    print(f"Scanning workspace: {target_dir}...")
    files = scan_files(target_dir)
    
    file_items_html = ""
    for f in files:
        file_items_html += f"""
        <div class="file-item">
            <div class="file-name-container">
                <span class="file-icon">{f['icon']}</span>
                <div>
                    <a class="file-name" href="{f['path']}" target="_blank">{f['name']}</a>
                    <div class="file-desc">{f['desc']}</div>
                </div>
            </div>
            <span class="sphere-badge">Sphere {f['sphere']}</span>
        </div>
        """
        
    compiled_html = HTML_TEMPLATE.format(
        user_name=user_name,
        portal_title=f"{user_name} Mission Control",
        file_items_placeholder=file_items_html
    )
    
    output_file.write_text(compiled_html, encoding="utf-8")
    print(f"Success! Branded Quantum Aurum portal generated at: {output_file.absolute()}")

if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "KoRT"
    workspace = Path("d:/KoRT_Command_Center/Mission_Control")
    output = workspace / "KORT_MASTER_PORTAL.html"
    
    generate_portal(name, workspace, output)

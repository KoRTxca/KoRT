
/**
 * KoRT UNA Branding Injection
 * Paste this into the UNA Custom Styles / JS Injection area.
 */

// 1. Quantum Aurum CSS
const kortStyles = `
    :root {
        --una-color-bg-page: #050608 !important;
        --una-color-bg-card: rgba(10, 12, 18, 0.7) !important;
        --una-color-border-card: rgba(212, 175, 55, 0.15) !important;
        --una-color-theme: #d4af37 !important;
    }
    body { background-image: url('https://drt.social/shared-assets/branding/desktop_bg.png') !important; background-attachment: fixed !important; }
    .bx-menu-main-bar { background: rgba(5, 6, 8, 0.9) !important; border-bottom: 1px solid #d4af37 !important; backdrop-filter: blur(10px) !important; }
    .bx-btn-primary { background: linear-gradient(135deg, #d4af37, #f9d71c) !important; border: none !important; color: #000 !important; font-weight: bold !important; }
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = kortStyles;
document.head.appendChild(styleTag);

console.log("⚔️ KoRT Branding Injected into UNA.");

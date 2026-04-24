import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PAGES_DIR = path.join(rootDir, 'src', 'pages');
const MAIN_JSX = path.join(rootDir, 'src', 'main.jsx');

console.log("🛡️  KoRT Sovereign Link Validator Initiated...");

// 1. Get all defined routes from main.jsx
const mainContent = fs.readFileSync(MAIN_JSX, 'utf-8');
const routeRegex = /path="([^"]+)"/g;
const routes = [];
let match;
while ((match = routeRegex.exec(mainContent)) !== null) {
    routes.push(match[1]);
}

console.log(`📍 Found ${routes.length} defined routes in main.jsx`);

// 2. Get all page files
const pageFiles = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.jsx'));
console.log(`📄 Found ${pageFiles.length} page components in src/pages/`);

// 3. Simple check: Do all routes have components?
// (This is hard to automate perfectly without a parser, but we can check imports)
const importRegex = /import\s+([A-Z]\w+)\s+from\s+'\.\/pages\/([^']+)'/g;
const imports = {};
while ((match = importRegex.exec(mainContent)) !== null) {
    imports[match[1]] = match[2];
}

// 4. Check for broken links in all files
const allJsxFiles = [];
function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
                walk(fullPath);
            }
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            allJsxFiles.push(fullPath);
        }
    });
}
walk(path.join(rootDir, 'src'));

let brokenLinksCount = 0;
allJsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const linkRegex = /to="([^"]+)"/g;
    while ((match = linkRegex.exec(content)) !== null) {
        const link = match[1];
        if (link.startsWith('/') && !routes.includes(link) && !link.includes(':')) {
            console.error(`❌ Broken link found in ${path.relative(rootDir, file)}: ${link}`);
            brokenLinksCount++;
        }
    }
});

if (brokenLinksCount === 0) {
    console.log("✅ All internal links verified.");
} else {
    console.error(`🚨 Found ${brokenLinksCount} broken links!`);
    process.exit(1);
}

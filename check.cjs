const fs = require('fs');
const path = require('path');

function checkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            checkDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const imports = [...content.matchAll(/import\s+.*?(?:from\s+)?['"]([^'"]+)['"]/g), ...content.matchAll(/import\(['"]([^'"]+)['"]\)/g)];
            imports.forEach(m => {
                const importPath = m[1];
                if (importPath.startsWith('.')) {
                    let targetPath = path.resolve(dir, importPath);
                    let targetDir = path.dirname(targetPath);
                    if (fs.existsSync(targetDir)) {
                        const actualFiles = fs.readdirSync(targetDir);
                        const expectedFile = path.basename(targetPath);
                        // Check exact match, or exactly adding .js / .jsx
                        if (!actualFiles.includes(expectedFile) && 
                            !actualFiles.includes(expectedFile + '.jsx') && 
                            !actualFiles.includes(expectedFile + '.js') &&
                            !actualFiles.includes(expectedFile + '/index.js') &&
                            !actualFiles.includes(expectedFile + '/index.jsx')) {
                                
                            // Find the case-insensitive match
                            const caseInsensitiveMatch = actualFiles.find(f => f.toLowerCase() === expectedFile.toLowerCase() || f.toLowerCase() === expectedFile.toLowerCase() + '.jsx');
                            if (caseInsensitiveMatch) {
                                console.log(`Case mismatch in ${fullPath}: imports '${importPath}' but actual file is '${caseInsensitiveMatch}'`);
                            } else {
                                console.log(`Missing file in ${fullPath}: imports '${importPath}'`);
                            }
                        }
                    } 
                }
            });
        }
    });
}

checkDir(path.join(__dirname, 'src'));
console.log('Case check complete.');

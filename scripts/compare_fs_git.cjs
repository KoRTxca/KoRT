#!/usr/bin/env node
/**
Compare local filesystem vs git-tracked files. CommonJS version for compatibility.
Outputs inventory_diff.json at repo root.
*/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve("D:\\KoRT_Command_Center");
const roots = [
  "D:\\KoRT_Command_Center",
  "D:\\Sovereign_OS",
  "D:\\KoRT_Core",
  "D:\\KoRT_Mission_Control",
  "D:\\Claude-outputs",
  "D:\\KoRT_ARSENAL",
  "D:\\OpenCode",
  "D:\\KoRT_Digital_Dollars",
  "D:\\KoRT_Advocate_MSICBC"
];

const excludeDirs = new Set(["node_modules", ".git", "archive", "memory", "dist", "build"]);

function scanDir(dir){
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const stack = [dir];
  while (stack.length){
    const p = stack.pop();
    let stat;
    try { stat = fs.statSync(p); } catch(e) { continue; }
    if (stat.isDirectory()){
      const base = path.basename(p);
      if (excludeDirs.has(base)) continue;
      let items;
      try { items = fs.readdirSync(p); } catch(e){ continue; }
      for (const it of items){ stack.push(path.join(p, it)); }
    } else if (stat.isFile()){
      files.push({ path: p, size: stat.size, mtime: stat.mtimeMs });
    }
  }
  return files;
}

function normalize(p){ return p.replace(/\\/g, '/').toLowerCase(); }

function main(){
  const localFiles = [];
  for (const r of roots){
    const list = scanDir(r);
    localFiles.push(...list);
  }

  let gitList = [];
  try {
    gitList = execSync('git ls-files', { cwd: repoRoot, encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
  } catch(e){ }
  const gitAbs = gitList.map(rel => path.normalize(path.join(repoRoot, rel)));

  const localSet = new Set(localFiles.map(f => normalize(f.path)));
  const gitSet = new Set(gitAbs.map(p => normalize(p)));

  const missing_in_git = [];
  for (const f of localFiles){
    const abs = path.normalize(f.path);
    const inGit = gitAbs.find(p => normalize(p) === normalize(abs));
    if (!inGit){ missing_in_git.push({ path: abs, size: f.size, mtime: f.mtime }); }
  }

  const untracked_in_local = [];
  for (const g of gitAbs){ if (!localSet.has(normalize(g))){ untracked_in_local.push({ path: g, exists: false }); } }

  const nameMap = new Map();
  for (const f of localFiles){ const bn = path.basename(f.path); if (!nameMap.has(bn)) nameMap.set(bn, []); nameMap.get(bn).push(f.path); }
  const duplicates = [];
  for (const [name, paths] of nameMap.entries()){ if (paths.length > 1){ duplicates.push({ name, paths }); } }

  const inventory = {
    local_total: localFiles.length,
    git_tracked_total: gitAbs.length,
    missing_in_git,
    untracked_in_local,
    duplicates
  };
  fs.writeFileSync(path.resolve(repoRoot, 'inventory_diff.json'), JSON.stringify(inventory, null, 2));
  console.log('inventory_diff.json written at', path.resolve(repoRoot, 'inventory_diff.json'));
}

main();

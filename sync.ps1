# Sovereign OSSync Utility
# Ensures local node stays in sync with origin/master

Write-Host "--- INITIALIZING SOVEREIGN SYNC ---" -ForegroundColor Amber

# 1. Fetching latest remote state
Write-Host "[1/3] Fetching latest remote state..." -ForegroundColor Cyan
git fetch origin

# 2. Reconciling with Master
# We use reset --hard to ensure local servers perfectly match the repository state
Write-Host "[2/3] Reconciling branch: master..." -ForegroundColor Cyan
git reset --hard origin/master

# 3. Synchronizing Dependencies
Write-Host "[3/3] Synchronizing dependencies..." -ForegroundColor Cyan
npm install

# 4. Finalizing
Write-Host "`n--- SYNC COMPLETE: LOCAL NODE UPDATED ---" -ForegroundColor Green
Write-Host "Run 'npm run dev' to start local server." -ForegroundColor White

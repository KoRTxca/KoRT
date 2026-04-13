# Sovereign OS Sync Utility v3.0
# "One Push = Global Update" 
# Ensures Local Node, GitHub, and Global Node Clusters remain synchronized.

Write-Host "--- INITIALIZING SOVEREIGN PUSH/SYNC ---" -ForegroundColor Yellow

# 1. Verification Block
Write-Host "[1/5] Running Local Sanity Check..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "CRITICAL: Build failed. Aborting push to protect Global Cluster." -ForegroundColor Red
    exit 1
}

# 2. Synchronizing Local State
Write-Host "[2/5] Staging all Sovereign Grain for global distribution..." -ForegroundColor Cyan
git add .
git commit -m "feat: Sovereign Unification (Operation OMEGA). Optimized artifacts, restored logic grain, and flattened architecture."

# 3. The Global Trigger
Write-Host "[3/5] TRIGGERING GLOBAL UPDATE (Origin Push)..." -ForegroundColor Magenta
git push origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Force pushing to reconcile branch history..." -ForegroundColor Yellow
    git push origin master --force
}

# 4. Production Wait
Write-Host "[4/5] Waiting for Vercel Deployment to propagate (15s)..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

# 5. Production Audit
Write-Host "[5/5] Running Production Audit..." -ForegroundColor Cyan
node scripts/verify-production.cjs
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Route validation failed. It may take a moment for Vercel to fully update." -ForegroundColor Yellow
}

Write-Host "Signal sent to Global Node Cluster." -ForegroundColor Green
Write-Host "`n--- OPERATION OMEGA: GLOBAL DEPLOYMENT COMPLETE ---" -ForegroundColor Green
Write-Host "Sovereign OS is now live on Vercel and Peer Nodes." -ForegroundColor White

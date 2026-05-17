$ErrorActionPreference = "Stop"

Write-Host "Initiating KoRT Quantum Round Table Windows Setup (Local Sovereign Mode)..." -ForegroundColor Green

# Install Chocolatey (if not present)
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Cyan
    Set-ExecutionPolicy Bypass -Scope Process -Force
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install Node.js (for Supabase CLI), Git, Docker Desktop, VSCodium, LM Studio
Write-Host "Installing toolchain (Node.js, Git, Docker, VSCodium, LM Studio)..." -ForegroundColor Cyan
choco install -y nodejs git docker-desktop vscodium lm-studio

# Install Supabase CLI globally
Write-Host "Installing Local Supabase CLI..." -ForegroundColor Cyan
npm install -g supabase

Write-Host "======================================================" -ForegroundColor Green
Write-Host "SETUP COMPLETE." -ForegroundColor Green
Write-Host "1. Ensure Docker Desktop is running." -ForegroundColor Yellow
Write-Host "2. Run 'npx supabase init' (if not already done)." -ForegroundColor Yellow
Write-Host "3. Run 'npx supabase start' to launch your 100% FREE local database and SSO!" -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Green

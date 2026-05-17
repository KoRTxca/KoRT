# ⚔️ KoRT MASTER INFECTOR (v1.0)
# Directive: Rapid Sovereign Deployment
# "Get paid to belong. No one gets left behind."

$ErrorActionPreference = "Continue"

Write-Host "🚀 Launching KoRT Sovereign Infection..." -ForegroundColor Cyan

# 1. PATH STABILIZATION
$FlutterPath = "D:\KoRT_Command_Center\Mission_Control\tools\flutter\bin"
if (Test-Path $FlutterPath) {
    Write-Host "✅ Stabilizing Flutter Path..."
    $CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($CurrentPath -notlike "*$FlutterPath*") {
        [Environment]::SetEnvironmentVariable("Path", "$FlutterPath;$CurrentPath", "User")
        $env:Path = "$FlutterPath;$env:Path"
    }
}

# 2. IDE DEPLOYMENT
$IDEInstaller = "D:\KoRT_Command_Center\Mission_Control\ide\Install-KoRT-IDE.ps1"
if (Test-Path $IDEInstaller) {
    Write-Host "⚔️ Installing Branded KoRT-IDE (VSCodium)..."
    & $IDEInstaller
}

# 3. DIGITAL DOLLARS BOUNTY (100 DD)
Write-Host "💰 Initializing Welcome Bounty..."
try {
    # This would call the Supabase API to credit the local node
    $EnvFile = "D:\KoRT_Command_Center\Mission_Control\.env"
    if (Test-Path $EnvFile) {
        Write-Host "   Registering node with Treasury..."
        # python D:\KoRT_Command_Center\Mission_Control\scripts\register_node.py
    }
} catch {
    Write-Warning "   Treasury sync deferred (Offline Mode)."
}

# 4. WINDOWS THEME INJECTION (DRAGON SHIELD)
Write-Host "🛡️ Applying Sovereign Theme..."
# Simple registry tweaks for dark mode and gold/blue accents
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "AppsUseLightTheme" -Value 0
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "SystemUsesLightTheme" -Value 0

# 5. LAUNCH PORTAL
$PortalPath = "D:\KoRT_Command_Center\Mission_Control\apps\web-portal\dist\index.html"
if (Test-Path $PortalPath) {
    Write-Host "🌐 Launching Mission Control Portal..."
    Start-Process "chrome.exe" $PortalPath
} else {
    Write-Host "   Portal build pending. Launching Dev Portal..."
    # Start-Process "npm" "run dev -- --host" -WorkingDirectory "D:\KoRT_Command_Center\Mission_Control\apps\web-portal"
}

Write-Host "✅ INFECTION COMPLETE. WELCOME TO THE ROUND TABLE." -ForegroundColor Gold
Read-Host "Press Enter to exit..."

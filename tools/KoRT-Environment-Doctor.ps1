# ⚔️ KoRT Tool Installer & Environment Doctor
# Designed to fix Flutter/Dart PATH issues and setup the sovereign IDE environment.

$toolsDir = "D:\KoRT_Command_Center\Mission_Control\tools"
if (!(Test-Path $toolsDir)) { New-Item -ItemType Directory -Path $toolsDir }

Write-Host "🕵️ Checking Sovereign Environment..." -ForegroundColor Yellow

# 1. Check Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git missing. Please install Git for Windows." -ForegroundColor Red
} else {
    Write-Host "✅ Git is ready." -ForegroundColor Green
}

# 2. Check/Fix Flutter
$flutterPath = "$toolsDir\flutter\bin\flutter.bat"
if (!(Test-Path $flutterPath)) {
    Write-Host "⚠️ Flutter not found in monorepo tools." -ForegroundColor Cyan
    Write-Host "🚀 To install Flutter locally, run: git clone https://github.com/flutter/flutter.git $toolsDir\flutter -b stable" -ForegroundColor Yellow
} else {
    Write-Host "✅ Flutter found in tools." -ForegroundColor Green
    # Add to current session PATH
    $env:PATH += ";$toolsDir\flutter\bin"
}

# 3. Initialize VSCode/VSCodium Config
Write-Host "🛠️ Synchronizing IDE Settings..." -ForegroundColor Cyan
# (The .vscode/settings.json is already managed by Antigravity)

Write-Host "✨ Preflight Check Complete." -ForegroundColor Green

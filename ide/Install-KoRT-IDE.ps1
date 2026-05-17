# KoRT IDE Installer (Branded VSCodium Fork)
# Installs VSCodium, applies KoRT sovereign branding, installs extensions
# This IS the KoRT IDE — no separate fork needed, just sovereign configuration.

Write-Host "KoRT IDE INSTALLER - Branding the Sovereign Development Environment" -ForegroundColor Yellow

$IDE_DIR = "d:\KoRT_Command_Center\Mission_Control\ide"
$KORT_SETTINGS = "$IDE_DIR\kort-ide-settings.json"

# ─── Step 1: Detect or Install VSCodium ───────────────────
$vscodium = Get-Command codium -ErrorAction SilentlyContinue
$vscode = Get-Command code -ErrorAction SilentlyContinue

if ($vscodium) {
    $IDE_CMD = "codium"
    $SETTINGS_DIR = "$env:APPDATA\VSCodium\User"
    Write-Host "  Found VSCodium at $($vscodium.Source)" -ForegroundColor Green
} elseif ($vscode) {
    $IDE_CMD = "code"
    $SETTINGS_DIR = "$env:APPDATA\Code\User"
    Write-Host "  Found VS Code at $($vscode.Source)" -ForegroundColor Green
} else {
    Write-Host "  No IDE found. Installing VSCodium..." -ForegroundColor Cyan
    winget install vscodium --accept-source-agreements --accept-package-agreements 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  winget failed. Downloading VSCodium directly..." -ForegroundColor Yellow
        $vscodiumUrl = "https://github.com/VSCodium/vscodium/releases/latest/download/VSCodiumSetup-x64.exe"
        $installer = "$env:TEMP\VSCodiumSetup.exe"
        Invoke-WebRequest -Uri $vscodiumUrl -OutFile $installer -UseBasicParsing
        Start-Process -FilePath $installer -ArgumentList "/VERYSILENT /NORESTART" -Wait
        Remove-Item $installer -Force
    }
    $IDE_CMD = "codium"
    $SETTINGS_DIR = "$env:APPDATA\VSCodium\User"
}

# ─── Step 2: Apply KoRT Sovereign Branding ────────────────
Write-Host "`nApplying KoRT Sovereign Branding..." -ForegroundColor Cyan

if (!(Test-Path $SETTINGS_DIR)) { New-Item -ItemType Directory -Path $SETTINGS_DIR -Force | Out-Null }

# Copy KoRT settings
Copy-Item $KORT_SETTINGS "$SETTINGS_DIR\settings.json" -Force
Write-Host "  Settings applied: Dark Blue + Gold theme" -ForegroundColor Green

# ─── Step 3: Install Essential Extensions ─────────────────
Write-Host "`nInstalling KoRT Essential Extensions..." -ForegroundColor Cyan

$extensions = @(
    "Dart-Code.dart-code",
    "Dart-Code.flutter",
    "eamodio.gitlens",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "PKief.material-icon-theme",
    "esbenp.prettier-vscode",
    "ritwickdey.LiveServer",
    "formulahendry.auto-rename-tag",
    "bradlc.vscode-tailwindcss",
    "GitHub.copilot",
    "Continue.continue"
)

foreach ($ext in $extensions) {
    Write-Host "  Installing $ext..." -ForegroundColor White
    & $IDE_CMD --install-extension $ext --force 2>$null
}

# ─── Step 4: Create KoRT Workspace File ───────────────────
Write-Host "`nCreating KoRT Workspace..." -ForegroundColor Cyan

$workspace = @{
    folders = @(
        @{ path = "D:\KoRT_Command_Center\Mission_Control" }
    )
    settings = @{
        "window.title" = "KoRT IDE - `${activeEditorShort}`${separator}`${rootName}"
        "workbench.colorTheme" = "Dragon Shield"
    }
} | ConvertTo-Json -Depth 5

$workspace | Out-File "$IDE_DIR\KoRT.code-workspace" -Encoding utf8 -Force
Write-Host "  Workspace file created: $IDE_DIR\KoRT.code-workspace" -ForegroundColor Green

# ─── Step 5: Create Desktop Shortcut ─────────────────────
Write-Host "`nCreating KoRT IDE Desktop Shortcut..." -ForegroundColor Cyan

$WshShell = New-Object -ComObject WScript.Shell
$shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\KoRT IDE.lnk")
$ideExe = (Get-Command $IDE_CMD -ErrorAction SilentlyContinue).Source
if ($ideExe) {
    $shortcut.TargetPath = $ideExe
    $shortcut.Arguments = "$IDE_DIR\KoRT.code-workspace"
    $shortcut.WorkingDirectory = "D:\KoRT_Command_Center\Mission_Control"
    $shortcut.Description = "KoRT Sovereign IDE - Merlin KoRT OS Edition"
    $shortcut.Save()
    Write-Host "  Desktop shortcut created" -ForegroundColor Green
}

Write-Host "`nKoRT IDE Installation Complete." -ForegroundColor Green
Write-Host "Launch with: $IDE_CMD $IDE_DIR\KoRT.code-workspace" -ForegroundColor Yellow

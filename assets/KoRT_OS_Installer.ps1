# 🛡️ KoRT OS: Windows Sovereign Deployment Tool
# Version 1.0.0
# Author: Master Builder (Antigravity)

$KoRTDir = "C:\KoRT_OS"
if (!(Test-Path $KoRTDir)) { New-Item -ItemType Directory -Path $KoRTDir }

# 1. Download Master Assets
Write-Host "🛡️ Initializing KoRT Sovereign Assets..." -ForegroundColor Cyan
$WallpaperPath = "$KoRTDir\KoRT_Holo_Wallpaper.jpg"
# (Simulated download of master wallpaper)
Copy-Item "D:\KoRT_Command_Center\Mission_Control\shared-assets\media\kort_logo_transparent.png" $WallpaperPath

# 2. Inject System Colors (Gold & Shadow)
Write-Host "🛡️ Calibrating Sovereign Palette..." -ForegroundColor Yellow
$RegistryPath = "HKCU:\Control Panel\Colors"
Set-ItemProperty -Path $RegistryPath -Name "ActiveTitle" -Value "0 0 0"
Set-ItemProperty -Path $RegistryPath -Name "Background" -Value "5 6 8"
Set-ItemProperty -Path $RegistryPath -Name "Hilight" -Value "212 175 55"
Set-ItemProperty -Path $RegistryPath -Name "TitleText" -Value "212 175 55"
Set-ItemProperty -Path $RegistryPath -Name "Window" -Value "10 15 25"

# 3. Set Desktop Wallpaper
$code = @'
using System.Runtime.InteropServices;
public class Wallpaper {
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
}
'@
Add-Type -TypeDefinition $code
[Wallpaper]::SystemParametersInfo(20, 0, $WallpaperPath, 3)

# 4. Animated Background (Legacy Hack)
# Creates a startup shortcut to the Master Portal HTML
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$HOME\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\KoRT_Desktop.lnk")
$Shortcut.TargetPath = "chrome.exe"
$Shortcut.Arguments = "--app=file:///D:/KoRT_Command_Center/Mission_Control/KORT_MASTER_PORTAL.html --window-position=0,0 --window-size=1920,1080"
$Shortcut.Save()

Write-Host "🛡️ KoRT OS DEPLOYED. Restart Explorer to engage." -ForegroundColor Green

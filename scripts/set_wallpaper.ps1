$code = @'
using System;
using System.Runtime.InteropServices;
using System.Drawing;

namespace WinAPI {
    public class Wallpaper {
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);

        public const int SPI_SETDESKWALLPAPER = 20;
        public const int SPIF_UPDATEINIFILE = 0x01;
        public const int SPIF_SENDWININICHANGE = 0x02;

        public static void Set(string path) {
            SystemParametersInfo(SPI_SETDESKWALLPAPER, 0, path, SPIF_UPDATEINIFILE | SPIF_SENDWININICHANGE);
        }
    }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$wallpaperPath = "D:\KoRT_Command_Center\Mission_Control\shared-assets\branding\desktop_bg.png"
if (Test-Path $wallpaperPath) {
    [WinAPI.Wallpaper]::Set($wallpaperPath)
    Write-Host "Kingdom Wallpaper Deployed Successfully." -ForegroundColor Yellow
} else {
    Write-Host "Error: Wallpaper asset not found at $wallpaperPath" -ForegroundColor Red
}

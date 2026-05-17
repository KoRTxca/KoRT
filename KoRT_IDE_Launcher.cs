using System;
using System.Diagnostics;

namespace KoRT_IDE
{
    class Program
    {
        static void Main(string[] args)
        {
            // The Sovereign IDE Server URL. 
            // We use ide.kortx.ca as the final domain.
            string targetUrl = "http://104.219.251.218:8080"; 
            
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = "msedge.exe";
                psi.Arguments = "--app=" + targetUrl;
                psi.UseShellExecute = true;
                Process.Start(psi);
            }
            catch
            {
                try
                {
                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = "chrome.exe";
                    psi.Arguments = "--app=" + targetUrl;
                    psi.UseShellExecute = true;
                    Process.Start(psi);
                }
                catch
                {
                    Process.Start(new ProcessStartInfo(targetUrl) { UseShellExecute = true });
                }
            }
        }
    }
}

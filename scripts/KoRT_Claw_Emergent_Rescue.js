const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("==========================================");
  console.log("🦅 KoRT_Claw: Initiating Emergent Code Rescue...");
  console.log("==========================================");
  
  // Use the default Chrome User Data directory to bypass login screens
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
  
  try {
    const browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });

    const page = await browser.newPage();
    console.log("Navigating to Emergent app...");
    await page.goto('https://app.emergent.sh/'); 
    
    console.log("Waiting 20 seconds...");
    console.log("👉 KNIGHT MANUAL OVERRIDE REQUIRED: Please click into your 'Claude Export Hub' project so the code editor is visible on screen.");
    await page.waitForTimeout(20000);

    console.log("Attempting to extract code from the editor DOM...");
    
    // Attempt to scrape raw text from Monaco editor lines or standard code blocks
    const codeElements = await page.locator('.view-lines, pre, code').allTextContents();
    
    if (codeElements && codeElements.length > 0) {
        const extractedCode = codeElements.join('\n\n--- FILE SEPARATOR ---\n\n');
        
        const dumpPath = path.join(__dirname, '..', 'apps', 'claude-export-hub', 'rescued_code_dump.txt');
        fs.writeFileSync(dumpPath, extractedCode);
        
        console.log(`✅ Rescue successful! Raw code saved to: ${dumpPath}`);
    } else {
        console.log("⚠️ Could not automatically detect the code blocks. Emergent might be obscuring the DOM.");
    }
    
    console.log("Operation complete. Leaving browser open for manual inspection if needed.");
    
  } catch (error) {
    console.error("❌ KoRT_Claw encountered an error:", error.message);
    if (error.message.includes("EBUSY") || error.message.includes("Target page, context or browser has been closed")) {
        console.log("\n⚠️ CRITICAL FIX: Google Chrome is currently running in the background.");
        console.log("KoRT_Claw needs exclusive access to your profile to bypass the login paywall.");
        console.log("Please close all Chrome windows completely and run this script again.");
    }
  }
})();

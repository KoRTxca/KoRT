const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("==========================================");
  console.log("🦅 KoRT_Claw: Namecheap DNS Overdrive...");
  console.log("==========================================");
  
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
  
  try {
    console.log("Connecting to Namecheap using local profile...");
    const browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });

    const page = await browser.newPage();
    
    // 1. Navigate to kortx.ca management
    console.log("Navigating to Domain Management...");
    await page.goto('https://ap.www.namecheap.com/domains/domaincontrolpanel/kortx.ca/domain');
    
    // Wait for the user to be logged in or handle 2FA if needed
    console.log("Waiting for dashboard to load (15s)...");
    await page.waitForTimeout(15000);

    // 2. Personal Nameservers (Advanced DNS)
    console.log("Attempting to access Personal Nameservers...");
    // Note: Namecheap selectors can be tricky, using text-based locator
    try {
        await page.getByRole('link', { name: 'Advanced DNS' }).click();
        console.log("✅ Advanced DNS tab selected.");
        await page.waitForTimeout(5000);
        
        // Register ns1
        console.log("Registering ns1.kortx.ca...");
        // This part is highly dependent on Namecheap's current UI. 
        // We will look for 'Add Nameserver' or similar.
    } catch (e) {
        console.log("⚠️ Could not find Advanced DNS tab. Retrying via direct URL...");
        await page.goto('https://ap.www.namecheap.com/domains/domaincontrolpanel/kortx.ca/advancedns');
        await page.waitForTimeout(5000);
    }

    console.log("👉 KORTCLAW PAUSED: Please ensure 'Personal Nameservers' section is visible.");
    console.log("I am leaving the browser open for you to finalize the registration of ns1/ns2 to 104.219.251.218.");
    
    // Leaving browser open for the user
  } catch (error) {
    console.error("❌ KoRT_Claw encountered an error:", error.message);
    if (error.message.includes("EBUSY")) {
        console.log("\n⚠️ ERROR: CHROME IS RUNNING.");
        console.log("Please close ALL Chrome windows so KoRT_Claw can access the profile.");
    }
  }
})();

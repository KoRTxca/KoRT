const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("==================================================");
  console.log("🦅 KoRT_Claw: INITIALIZING WORKSHOP.AI KEYS...");
  console.log("==================================================");
  
  const mapPath = path.join('D:', 'KoRT_Command_Center', 'Mission_Control', 'docs', 'workshop_city_keys.md');
  let projectMap = "";
  
  try {
      projectMap = fs.readFileSync(mapPath, 'utf8');
      console.log("✅ Project Map loaded.");
  } catch (err) {
      console.error("❌ Failed to read project map:", err.message);
      process.exit(1);
  }

  // Use a DEDICATED profile for KoRT_Claw to avoid EBUSY with user's Chrome
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'KoRT_Claw_Chrome_Profile');
  
  try {
    console.log(`Connecting to KoRT_Claw Profile at: ${userDataDir}`);
    const browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto('https://workshop.ai/');
    
    console.log("Navigated to Workshop.ai.");
    console.log("👉 ACTION REQUIRED: If you are not logged in, please log in now in the automation window.");
    console.log("Waiting for page state (max 30 seconds)...");
    
    // Wait for a common element on the logged-in page
    try {
        await page.waitForSelector('textarea, [contenteditable="true"]', { timeout: 30000 });
    } catch (e) {
        console.log("⚠️ Timeout waiting for login. Please ensure you are logged in and in a project.");
    }

    const setupPayload = `
🛡️ KoRT SOVEREIGN PROTOCOL: KEYS TO THE CITY 🛡️

I am KoRT_Claw, your automation interface. I am providing you with the Master Project Map for the entire KoRT Ecosystem. 

YOUR OBJECTIVE: 
1. Absorb the following ecosystem context.
2. Initialize the 'Business Document Integration' task.
3. Build investor pitch decks and WSO sales pages using the 'Quantum Aurum' branding laws.
4. Orchestrate sub-tasks to Merlin, Gawain, and Heimdall as needed.

MASTER PROJECT MAP:
${projectMap}

Confirm receipt and begin the first task: "Generate Investor Pitch Deck Blueprint (Quantum Aurum v2.0)".
`;

    console.log("Injecting Keys to the City...");
    
    let textbox = page.locator('textarea, input[type="text"], div[contenteditable="true"]').last();
    await textbox.waitFor({ state: 'visible', timeout: 10000 });
    await textbox.fill(setupPayload);
    console.log("✅ Keys injected.");
    
    const submitBtn = page.locator('button[type="submit"], button[aria-label*="send" i], button[aria-label*="submit" i], button:has(svg)').last();
    try {
        await submitBtn.waitFor({ state: 'visible', timeout: 3000 });
        await submitBtn.click();
        console.log("🚀 WORKSHOP.AI PROVISIONED! Keys delivered.");
    } catch (e) {
        console.log("⚠️ Submit button failed. Pressing Enter.");
        await textbox.press('Enter');
    }

    console.log("KoRT_Claw operation complete. Keep this window open if you want to continue the session.");
    
  } catch (error) {
    console.error("❌ KoRT_Claw error:", error.message);
  }
})();

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("==========================================");
  console.log("🦅 KoRT_Claw: Engaging Workshop.ai automation...");
  console.log("==========================================");
  
  // Use the default Chrome User Data directory
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
  
  try {
    console.log("Connecting to Chrome using your local profile...");
    // Launch using local Chrome so we retain your active login session to workshop.ai
    const browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto('https://workshop.ai/');
    
    console.log("Navigated to Workshop.ai.");
    console.log("Waiting 10 seconds for the page to settle...");
    console.log("👉 Please ensure you are logged in and navigated to the correct chat project.");
    await page.waitForTimeout(10000);

    const payloads = [
      "1. D\nImplement a router that attempts the home cluster first (OpenAI-compatible /v1/chat/completions), falls back to the HuggingFace Inference free tier, and uses Vultr Serverless Inference as the final fallback.",
      "2. E\nDesign and stub the SSO. We will use Supabase Auth tied to the kortx.ca Google Workspace. Provide the necessary integration points, and I will plug in the real validation keys during the launch sequence.",
      "3. B\nUse the HuggingFace Inference API (free tier, SDXL or Flux). I will provide the HF_TOKEN.",
      "Additional Directive:\nOnce the DRT landing page generator is finished and compiled, prepare the workspace for the immediate deployment of the 'Death of Claude / AI Memory Extractor Refactor Wizard' project that was completed by Emergent. We are moving straight to launch and payment integration for that micro-app."
    ];

    for (let i = 0; i < payloads.length; i++) {
        console.log(`Attempting to inject payload ${i + 1} of ${payloads.length}...`);
        
        let textbox = page.getByRole('textbox').last();
        try {
            await textbox.waitFor({ state: 'visible', timeout: 8000 });
            await textbox.fill(payloads[i]);
            console.log(`✅ Payload ${i + 1} typed.`);
        } catch (e) {
            textbox = page.locator('textarea, input[type="text"], div[contenteditable="true"]').last();
            await textbox.waitFor({ state: 'visible', timeout: 5000 });
            await textbox.fill(payloads[i]);
            console.log(`✅ Payload ${i + 1} typed via generic selector.`);
        }
        
        const submitBtn = page.locator('button[type="submit"], button[aria-label*="send" i], button[aria-label*="submit" i], button:has(svg)').last();
        try {
            await submitBtn.waitFor({ state: 'visible', timeout: 3000 });
            await submitBtn.click();
            console.log(`🚀 Payload ${i + 1} sent!`);
        } catch (e) {
            console.log(`⚠️ Could not click 'Send' for payload ${i + 1}. Pressing Enter instead.`);
            await textbox.press('Enter');
        }

        if (i < payloads.length - 1) {
            console.log("Waiting 15 seconds for Workshop.ai to process and ask the next question...");
            await page.waitForTimeout(15000);
        }
    }
    
    console.log("KoRT_Claw operation complete. Handing browser control back to the Knight.");
    
  } catch (error) {
    console.error("❌ KoRT_Claw encountered an error:", error.message);
    if (error.message.includes("EBUSY") || error.message.includes("Target page, context or browser has been closed")) {
        console.log("\n⚠️ CRITICAL FIX: Google Chrome is currently running in the background.");
        console.log("KoRT_Claw needs exclusive access to your profile to inject the prompt while preserving your login session.");
        console.log("Please close all Chrome windows completely and run this script again.");
    }
  }
})();

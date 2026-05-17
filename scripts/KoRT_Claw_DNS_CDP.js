/**
 * KoRT_Claw: DNS CDP Automation Engine
 * Connects directly to your already open Chrome session (via Remote Debugging port 9222)
 * and updates DNS records for drt.onl, drt.social, and kortx.ca in your logged-in tabs.
 * 
 * NO NEW SHIT. NO EXTRA WINDOWS. JUST USES YOUR OPEN NAMECHEAP SESSIONS.
 */

const { chromium } = require('playwright');
const path = require('path');

const XEON = '104.219.251.218';
const KAMATERA = '66.55.78.96';
const VULTR_MAIL = '45.32.226.74';

const DNS_PLANS = {
  'drt.onl': [
    { type: 'A', host: '@', value: KAMATERA },
    { type: 'A', host: 'www', value: KAMATERA },
    { type: 'A', host: 'cdn', value: KAMATERA },
    { type: 'A', host: 'api', value: KAMATERA },
    { type: 'A', host: 'backup', value: XEON },
    { type: 'A', host: 'mail', value: VULTR_MAIL },
    { type: 'A', host: 'webmail', value: VULTR_MAIL },
    { type: 'MX', host: '@', value: 'mail.drt.onl.', priority: 10 },
    { type: 'TXT', host: '@', value: `v=spf1 mx ip4:${VULTR_MAIL} -all` },
    { type: 'TXT', host: '_dmarc', value: 'v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@drt.onl' }
  ],
  'drt.social': [
    { type: 'A', host: '@', value: XEON },
    { type: 'A', host: 'www', value: XEON },
    { type: 'A', host: 'api', value: XEON },
    { type: 'A', host: 'cdn', value: KAMATERA },
    { type: 'A', host: 'backup', value: KAMATERA },
    { type: 'A', host: 'mail', value: VULTR_MAIL },
    { type: 'A', host: 'webmail', value: VULTR_MAIL },
    { type: 'MX', host: '@', value: 'mail.drt.onl.', priority: 10 },
    { type: 'TXT', host: '@', value: `v=spf1 mx ip4:${VULTR_MAIL} -all` },
    { type: 'TXT', host: '_dmarc', value: 'v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@drt.social' }
  ],
  'kortx.ca': [
    { type: 'CNAME', host: 'www', value: 'kortx.ca' },
    { type: 'A', host: 'ide', value: XEON },
    { type: 'A', host: 'api', value: XEON },
    { type: 'A', host: 'games', value: XEON },
    { type: 'A', host: 'scribe', value: XEON },
    { type: 'A', host: 'mail', value: VULTR_MAIL },
    { type: 'A', host: 'webmail', value: VULTR_MAIL },
    { type: 'MX', host: '@', value: 'mail.drt.onl.', priority: 10 },
    { type: 'TXT', host: '@', value: `v=spf1 mx ip4:${VULTR_MAIL} -all` },
    { type: 'TXT', host: '_dmarc', value: 'v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@kortx.ca' }
  ]
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function addRecord(page, domain, record) {
  console.log(`  👉 Processing ${record.type} ${record.host} -> ${record.value}`);
  
  try {
    // 1. Check if record already exists on the page to prevent duplicates
    // Select elements in the Namecheap DNS table rows
    const rows = page.locator('tr.nc-dns-table__row, tr.grid-row');
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).innerText();
      if (rowText.includes(record.host) && rowText.includes(record.value)) {
        console.log(`    => ✅ Already Exists (Skipping)`);
        return true;
      }
    }

    // 2. Click "Add New Record"
    const addBtn = page.locator('a:has-text("Add New Record"), button:has-text("Add New Record"), .nc-dns-table__add-new').first();
    if (await addBtn.count() === 0) {
      console.log(`    => ❌ Could not find "Add New Record" button.`);
      return false;
    }
    await addBtn.click();
    await sleep(800);

    // 3. Select type from dropdown
    // In Namecheap, clicking the type dropdown opens a select or custom menu
    const typeDropdown = page.locator('tr.new-record select.type, tr.editing select.type, tr.editing .dropdown-toggle').first();
    if (await typeDropdown.count() > 0) {
      const tagName = await typeDropdown.evaluate(el => el.tagName.toLowerCase());
      if (tagName === 'select') {
        // Standard HTML select
        const optionVal = record.type === 'MX' ? 'MX' : record.type === 'TXT' ? 'TXT' : record.type === 'CNAME' ? 'CNAME' : 'A';
        await typeDropdown.selectOption({ label: `${record.type} Record` });
      } else {
        // Custom dropdown component
        await typeDropdown.click();
        await sleep(400);
        const item = page.locator(`li:has-text("${record.type} Record"), a:has-text("${record.type} Record")`).first();
        if (await item.count() > 0) {
          await item.click();
        }
      }
    }
    await sleep(600);

    // 4. Fill in Host and Value
    const inputs = page.locator('tr.new-record input[type="text"], tr.editing input[type="text"]');
    const inputCount = await inputs.count();
    
    if (inputCount >= 2) {
      // Host
      await inputs.nth(0).fill(record.host);
      await sleep(200);
      
      // Value (IP or Target)
      await inputs.nth(1).fill(record.value);
      await sleep(200);
      
      // MX specific inputs (Priority)
      if (record.type === 'MX' && record.priority !== undefined && inputCount >= 3) {
        await inputs.nth(2).fill(record.priority.toString());
        await sleep(200);
      }

      // 5. Save the record row
      const saveBtn = page.locator('button.checkmark, .btn-checkmark, a[title="Save"], td.save-btn button').first();
      if (await saveBtn.count() > 0) {
        await saveBtn.click();
        await sleep(1500);
        console.log(`    => ✅ Saved successfully.`);
        return true;
      }
    }
    
    console.log(`    => ❌ Failed to input record data.`);
    return false;
  } catch (e) {
    console.log(`    => ❌ Error: ${e.message.slice(0, 80)}`);
    return false;
  }
}

(async () => {
  console.log("=========================================================");
  console.log("🐉 KoRT CLAW: DNS AUTOMATION (CDP SESSION CONNECT) 🐉");
  console.log("=========================================================");
  
  try {
    console.log("Connecting to Chrome on http://localhost:9222...");
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    
    // Retrieve all active pages in the browser session
    const pages = [];
    for (const context of browser.contexts()) {
      pages.push(...context.pages());
    }
    
    console.log(`Connected! Found ${pages.length} active tab(s) in Chrome.`);
    
    for (const [domain, records] of Object.entries(DNS_PLANS)) {
      console.log(`\n=== 🌐 Domain: ${domain} ===`);
      
      // Look for a tab matching the Namecheap Advanced DNS URL for this domain
      let page = pages.find(p => p.url().includes('namecheap.com') && p.url().includes(domain) && p.url().includes('advancedns'));
      
      if (!page) {
        // If not found on Advanced DNS, look for any general Namecheap tab for this domain
        const generalNC = pages.find(p => p.url().includes('namecheap.com') && p.url().includes(domain));
        if (generalNC) {
          console.log(`Found a general Namecheap tab for ${domain}. Navigating to Advanced DNS...`);
          await generalNC.goto(`https://ap.www.namecheap.com/domains/domaincontrolpanel/${domain}/advancedns`);
          page = generalNC;
          await sleep(5000);
        } else {
          // If no tab exists for this domain, look for ANY active Namecheap tab where the user is logged in
          const loggedInTab = pages.find(p => p.url().includes('namecheap.com'));
          if (loggedInTab) {
            console.log(`Opening a new tab inside your logged-in Namecheap Chrome window for ${domain}...`);
            const context = loggedInTab.context();
            page = await context.newPage();
            await page.goto(`https://ap.www.namecheap.com/domains/domaincontrolpanel/${domain}/advancedns`);
            await sleep(5000);
          }
        }
      }
      
      if (!page) {
        console.log(`⚠️  Could not find any logged-in Namecheap tab in Chrome for ${domain}.`);
        console.log(`👉 Please open this URL in Chrome:`);
        console.log(`   https://ap.www.namecheap.com/domains/domaincontrolpanel/${domain}/advancedns`);
        console.log(`   And then re-run this script!`);
        continue;
      }
      
      console.log(`Using active tab: ${await page.title()}`);
      
      // Execute the record additions
      for (const r of records) {
        await addRecord(page, domain, r);
      }
      
      // Click "Save All" if it is present
      try {
        const saveAll = page.locator('input[value*="Save All"], button:has-text("Save All"), .nc-dns-table__save-all').first();
        if (await saveAll.count() > 0) {
          await saveAll.click();
          console.log(`✅ Clicked "Save All" for ${domain}`);
          await sleep(2000);
        }
      } catch {}
    }
    
    console.log("\n🎉 All domain DNS plans processed! Let them propagate.");
    
  } catch (error) {
    console.error("\n❌ Error connecting to Chrome session:", error.message);
    console.log("\n💡 TO RESOLVE THIS:");
    console.log("1. Close your Chrome completely.");
    console.log("2. Open PowerShell and run this command to start Chrome with remote debugging:");
    console.log('   Stop-Process -Name chrome -Force; Start-Process chrome.exe -ArgumentList "--remote-debugging-port=9222", "--restore-last-session"');
    console.log("3. Your logged-in sessions and tabs will be fully restored.");
    console.log("4. Run this script again: node scripts/KoRT_Claw_DNS_CDP.js");
  }
})();

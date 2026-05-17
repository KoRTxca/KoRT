/**
 * KoRT_Claw DNS Sovereign Expansion v2.0
 * Fixes: www.kortx.ca (404), ide.kortx.ca, api.kortx.ca, games.kortx.ca
 * Deploys: drt.social → Xeon, drt.onl → Kamatera
 *
 * USAGE: Close all Chrome windows first, then:
 *   node KoRT_Claw_DNS_Sovereign_Expansion.js
 */
const { chromium } = require('playwright');
const path = require('path');

const XEON     = '104.219.251.218';
const KAMATERA = '66.55.78.96';

// Full DNS plan — all domains, all records
const DNS_PLANS = {
  'kortx.ca': {
    url: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/kortx.ca/advancedns',
    records: [
      // Fix the broken www subdomain
      { type: 'CNAME', host: 'www',    value: 'kortx.ca' },
      // Xeon subdomains
      { type: 'A',     host: 'ide',    value: XEON },
      { type: 'A',     host: 'api',    value: XEON },
      { type: 'A',     host: 'games',  value: XEON },
      { type: 'A',     host: 'scribe', value: XEON },
    ]
  },
  'drt.social': {
    url: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/drt.social/advancedns',
    records: [
      { type: 'A', host: '@',      value: XEON },
      { type: 'A', host: 'www',    value: XEON },
      { type: 'A', host: 'api',    value: XEON },
      { type: 'A', host: 'cdn',    value: KAMATERA },
      { type: 'A', host: 'backup', value: KAMATERA },
    ]
  },
  'drt.onl': {
    url: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/drt.onl/advancedns',
    records: [
      { type: 'A', host: '@',      value: KAMATERA },
      { type: 'A', host: 'www',    value: KAMATERA },
      { type: 'A', host: 'cdn',    value: KAMATERA },
      { type: 'A', host: 'api',    value: KAMATERA },
      { type: 'A', host: 'backup', value: XEON },
      { type: 'A', host: 'mail',    value: '45.32.226.74' },
      { type: 'A', host: 'webmail', value: '45.32.226.74' },
    ]
  }
};

// Summary of what will be deployed (printed before browser opens)
console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   KoRT_Claw DNS Sovereign Expansion v2.0                     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
console.log('DEPLOYMENT PLAN:');
for (const [domain, plan] of Object.entries(DNS_PLANS)) {
  console.log(`\n  ${domain}:`);
  for (const r of plan.records) {
    console.log(`    ${r.type.padEnd(6)} ${r.host.padEnd(10)} → ${r.value}`);
  }
}
console.log('\n[Starting browser in 2 seconds...]');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function setRecord(page, record) {
  try {
    // Click "Add New Record" button
    const addBtnSelectors = [
      'a:has-text("Add New Record")',
      'button:has-text("Add New Record")',
      '[data-testid="add-record"]',
      '.nc-dns-table__add-new'
    ];
    let added = false;
    for (const sel of addBtnSelectors) {
      const btn = page.locator(sel).first();
      if (await btn.count() > 0) {
        await btn.click();
        await sleep(800);
        added = true;
        break;
      }
    }
    if (!added) {
      console.log(`    => No "Add New Record" button found for ${record.host} — manual entry needed`);
      return false;
    }

    // Fill host and value in the new row
    const inputs = page.locator('tr.new-record input[type="text"], .editing input[type="text"]');
    const count = await inputs.count();
    if (count >= 2) {
      await inputs.nth(0).clear();
      await inputs.nth(0).fill(record.host);
      await inputs.nth(1).clear();
      await inputs.nth(1).fill(record.value);
      await sleep(400);

      // Save the row
      const saveRow = page.locator('button.checkmark, .btn-checkmark, a[title="Save"], td.save-btn button').first();
      if (await saveRow.count() > 0) {
        await saveRow.click();
        await sleep(1000);
      }
      console.log(`    => ✅ Set: ${record.type} ${record.host} → ${record.value}`);
      return true;
    } else {
      console.log(`    => ⚠️  Could not find input fields for ${record.host}`);
      return false;
    }
  } catch (e) {
    console.log(`    => ❌ Error on ${record.host}: ${e.message.slice(0, 80)}`);
    return false;
  }
}

(async () => {
  await sleep(2000);

  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
  let browser;

  try {
    browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized', '--no-sandbox'],
      timeout: 15000
    });
  } catch (e) {
    // Fall back to non-persistent Chromium
    console.log('[INFO] Chrome user data unavailable (Chrome is open or locked), launching fresh Chromium...');
    browser = await chromium.launch({ headless: false });
  }

  const page = (typeof browser.pages === 'function')
    ? (await browser.pages())[0] || await browser.newPage()
    : await browser.newPage();
  let loginHandled = false;

  for (const [domain, plan] of Object.entries(DNS_PLANS)) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`Processing: ${domain}`);
    console.log('═'.repeat(60));

    await page.goto(plan.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(8000);

    // Handle login if needed (only once)
    const loginField = page.locator('#LoginUserName, input[name="LoginUserName"]');
    if (!loginHandled && await loginField.count() > 0) {
      console.log('\n[ACTION REQUIRED] Please log in to Namecheap in the browser.');
      console.log('[Waiting up to 60 seconds for login...]');
      await page.waitForNavigation({ timeout: 60000 }).catch(() => {});
      await sleep(5000);
      loginHandled = true;
    }

    // Navigate again after login if needed
    if (loginHandled) {
      await page.goto(plan.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await sleep(8000);
    }

    let successCount = 0;
    for (const record of plan.records) {
      const ok = await setRecord(page, record);
      if (ok) successCount++;
      await sleep(500);
    }

    // Save All changes
    try {
      const saveAll = page.locator(
        'input[value*="Save All"], button:has-text("Save All"), input[value="Save All Changes"]'
      ).first();
      if (await saveAll.count() > 0) {
        await saveAll.click();
        await sleep(4000);
        console.log(`  ✅ Saved all changes for ${domain} (${successCount}/${plan.records.length} records set)`);
      } else {
        console.log(`  ⚠️  No "Save All" button found. Records may need manual save.`);
      }
    } catch (e) {
      console.log(`  ⚠️  Save All error: ${e.message.slice(0, 60)}`);
    }

    console.log(`  Pausing 5s before next domain...`);
    await sleep(5000);
  }

  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   KoRT_Claw DNS EXPANSION COMPLETE                           ║');
  console.log('║   Browser left open for manual verification.                 ║');
  console.log('║   DNS propagation: 5–30 minutes globally.                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
})();

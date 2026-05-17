const { chromium } = require('playwright');
const path = require('path');

const XEON = '104.219.251.218';
const KAMATERA = '66.55.78.96';

const DNS_PLANS = {
  'drt.social': {
    url: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/drt.social/advancedns',
    records: [
      { host: '@',      value: XEON },
      { host: 'www',    value: XEON },
      { host: 'api',    value: XEON },
      { host: 'cdn',    value: KAMATERA },
      { host: 'backup', value: KAMATERA },
    ]
  },
  'drt.onl': {
    url: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/drt.onl/advancedns',
    records: [
      { host: '@',      value: KAMATERA },
      { host: 'www',    value: KAMATERA },
      { host: 'cdn',    value: KAMATERA },
      { host: 'api',    value: KAMATERA },
      { host: 'backup', value: XEON },
    ]
  }
};

(async () => {
  console.log('KoRT_Claw: DNS Full Deployment for drt.social + drt.onl');
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');

  let browser;
  try {
    browser = await chromium.launchPersistentContext(userDataDir, {
      headless: false, channel: 'chrome',
      args: ['--start-maximized']
    });
  } catch (e) {
    if (e.message.includes('EBUSY')) {
      console.error('ERROR: Close ALL Chrome windows first, then re-run.');
      process.exit(1);
    }
    throw e;
  }

  const page = await browser.newPage();

  for (const [domain, plan] of Object.entries(DNS_PLANS)) {
    console.log('\n=== Processing: ' + domain + ' ===');
    await page.goto(plan.url);
    await page.waitForTimeout(10000);

    // Handle login if needed
    if (await page.locator('#LoginUserName').count() > 0) {
      console.log('Not logged in. Waiting 45s for manual login...');
      await page.waitForTimeout(45000);
    }

    console.log('Page loaded. Add records manually if automation fails.');
    console.log('Target records for ' + domain + ':');
    for (const r of plan.records) {
      console.log('  A  ' + r.host + ' -> ' + r.value + '  TTL: Auto');
      // Try to auto-add each record
      try {
        const addBtn = page.locator('a:has-text("Add New Record"), button:has-text("Add New Record")').first();
        if (await addBtn.count() > 0) {
          await addBtn.click();
          await page.waitForTimeout(1000);
          const inputs = page.locator('tr.new-record input[type="text"], .editing input[type="text"]');
          const count = await inputs.count();
          if (count >= 2) {
            await inputs.nth(0).fill(r.host);
            await inputs.nth(1).fill(r.value);
            const saveBtn = page.locator('button.checkmark, .btn-checkmark, a[title="Save"]').first();
            if (await saveBtn.count() > 0) await saveBtn.click();
            await page.waitForTimeout(1500);
            console.log('  => Submitted: ' + r.host);
          }
        }
      } catch (e) {
        console.log('  => Manual entry needed for: ' + r.host);
      }
    }

    // Try to click Save All
    try {
      const saveAll = page.locator('input[value*="Save All"], button:has-text("Save All")').first();
      if (await saveAll.count() > 0) {
        await saveAll.click();
        await page.waitForTimeout(3000);
        console.log('Saved all changes for ' + domain);
      }
    } catch {}

    console.log('Done with ' + domain + '. Pausing 5s before next domain...');
    await page.waitForTimeout(5000);
  }

  console.log('\nKoRT_Claw DNS operation complete. Browser left open for verification.');
})();

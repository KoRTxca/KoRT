/**
 * KoRT Sovereign OS: Production Sanity Check
 * v3.0 Operation OMEGA Version
 * Purpose: Verify live website status to prevent "Done" hallucinations.
 */

const https = require('https');

const PRODUCTION_URL = 'https://kortx.ca';
const ROUTES = [
  '/',
  '/login',
  '/digital-dollars',
  '/roundtable',
  '/advocacy',
  '/advocacy/icbc',
  '/scribe',
  '/library',
  '/watch',
  '/guide'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    https.get(`${PRODUCTION_URL}${route}`, (res) => {
      // 200 is good, 308 (redirect) can also be okay for some frameworks, but for SPA we want 200
      resolve({
        route,
        status: res.statusCode,
        ok: res.statusCode === 200 || res.statusCode === 308
      });
    }).on('error', (e) => {
      resolve({
        route,
        status: 'FAILED',
        ok: false,
        error: e.message
      });
    });
  });
}

async function runCheck() {
  console.log(`⚔️  Initiating Sovereign Sanity Check: ${PRODUCTION_URL}`);
  console.log('--------------------------------------------------');
  
  const results = await Promise.all(ROUTES.map(checkRoute));
  
  let allOk = true;
  results.forEach(res => {
    const symbol = res.ok ? '✅' : '❌';
    console.log(`${symbol} ${res.route.padEnd(25)} : ${res.status}`);
    if (!res.ok) allOk = false;
  });

  console.log('--------------------------------------------------');
  if (allOk) {
    console.log('✅ ALL SYSTEMS OPERATIONAL. Sovereign Node is live.');
  } else {
    console.log('❌ FAILURE DETECTED. Check Vercel routing configuration.');
    process.exit(1);
  }
}

runCheck();

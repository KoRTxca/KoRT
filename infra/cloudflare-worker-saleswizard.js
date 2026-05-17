/**
 * Cloudflare Worker for KoRT SalesWizard
 * Routes /api requests to the Vultr VPS and / requests to Vercel.
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async def handleRequest(request) {
  const url = new URL(request.url)
  
  // Route API to Vultr
  if (url.pathname.startsWith('/api/')) {
    const vultrIP = "104.238.154.18" // Injected from .env
    const target = `http://${vultrIP}${url.pathname}${url.search}`
    
    return fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
  }

  // Fallback to Vercel (Static Frontend)
  return fetch(request)
}

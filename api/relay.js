// ============================================================================
// BEDIVERE AUTOMAGIC RELAY (Vercel Serverless Function)
// Endpoint: POST /api/relay
// Purpose: Catch incoming AI Handoffs (Grok, Ventora, Claude) and route them.
// ============================================================================

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const payload = req.body;
    
    // 1. Authenticate the Relay (Simple Secret Key Check)
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.DRT_RELAY_SECRET || 'drt-alpha-key-2026'}`) {
      console.warn("Unauthorized relay attempt rejected.");
      return res.status(401).json({ error: 'Unauthorized Knight.' });
    }

    console.log(`[BEDIVERE RELAY] Received payload from: ${payload.source || 'Unknown AI'}`);

    // 2. Process DRT Universal Handoff Payload
    // THE RELAY IS THE CORE PROTOCOL FOR ALL AI AGENTS.
    // It captures handoffs, code blocks, and ledger updates.
    
    const { source, target, action, payload_data } = payload;
    
    console.log(`[DRT RELAY] Handoff from ${source} to ${target}. Action: ${action}`);

    // In a production environment, this stores the handoff in the shared memory bank (Supabase 'drt_handoffs') 
    // or triggers a GitHub Action to update the DRT_LEDGER.md and drt_ingest folder.
    
    if (action === 'ledger_update') {
      console.log(`[DRT RELAY] Syncing ledger update from ${source}`);
    } else if (action === 'code_handoff') {
      console.log(`[DRT RELAY] Staging code from ${source} for ${target}`);
    } else {
      console.log(`[DRT RELAY] Standard payload received. Broadcasting to Quorum.`);
    }

    // 3. Return Standardized DRT Response
    return res.status(200).json({
      status: "success",
      message: "DRT Relay Received & Processed.",
      timestamp: new Date().toISOString(),
      transaction_id: `DRT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });

  } catch (error) {
    console.error('[BEDIVERE RELAY ERROR]:', error);
    return res.status(500).json({ error: 'Internal Server Error processing DRT Relay.' });
  }
}

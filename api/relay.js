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

    // 2. Process based on Payload Type
    const { type, content, caseId, user_id } = payload;

    if (type === 'evidence_ingest') {
      // Logic to trigger Supabase insert into `exhibits`
      // await supabaseAdmin.from('exhibits').insert(content);
      console.log(`Processing evidence for Case: ${caseId}`);
    } 
    else if (type === 'academy_progress') {
      // Logic to update RPG Stats / DB
      console.log(`Processing Academy update for User: ${user_id}`);
    }
    else if (type === 'code_handoff') {
      // Logic to stage code for Antigravity (OpenCode)
      console.log("Code handoff staged for IDE ingestion.");
    }
    else {
      console.log("Generic DRT payload received. Logging to memory bank.");
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

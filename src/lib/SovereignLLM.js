import { Client } from "@gradio/client";

/**
 * SovereignLLM - The API Bridge to HuggingFace
 * Connects the KoRT Native OS directly to the Llama-3.1-70B model deployed
 * on the User's personal HuggingFace Space. 
 */
export class SovereignLLM {
  /**
   * Queries the Llama-3.1-70B Gradio endpoint
   * @param {string} message - The user prompt or crisis claim data
   * @param {string} systemPrompt - Optional configuration of the LLM identity
   * @returns {Promise<string>} The synthesized text from the Cloud LLM
   */
  static async queryMerlin(message, systemPrompt = null) {
    // Falls back to the provided URL if .env isn't populated locally
    const spaceUrl = import.meta.env.VITE_HF_SPACE_URL || "KoRTxca/kort-merlin";
    
    // Safety check ensuring the user linked the Space correctly
    if (!spaceUrl || spaceUrl.includes('your-username')) {
      return "[SOVEREIGN SYSTEM ERROR - OFFLINE]\nVITE_HF_SPACE_URL is missing. Please paste your true HuggingFace Space URL into your .env to awaken the 70B parameters.";
    }

    try {
      console.log(`[Base44] Initiating TCP Link to Sovereign Node: ${spaceUrl}`);
      
      // Connect to the Gradio Backend
      const client = await Client.connect(spaceUrl);
      
      const defaultSystem = "You are King Arthur, the member-facing AI of KoRT (Knights of the Round Table). You speak directly. No clinical language. No corporate polish. Tagline: 'No one gets left behind.'";
      
      // Trigger the '/chat' inference endpoint declared in app.py
      // Parameters: message, history, system_message, max_tokens, temp, top_p
      const result = await client.predict("/chat", [
        message, 
        [], // empty history for now as we treat CaseAssistant as stateless briefs
        systemPrompt || defaultSystem,
        1500, // max_tokens
        0.7,  // temperature
        0.95  // top_p
      ]);

      console.log("[Base44] Inference received successfully.");
      
      return result.data[0]; 
    } catch (e) {
      console.error("SovereignLLM Integration Error:", e);
      return `[MESH NETWORK FAILURE]\nThe connection to the HuggingFace Node failed. Ensure the HuggingFace space is Awoken and not Sleeping. Error Data: ${e.message}`;
    }
  }
}

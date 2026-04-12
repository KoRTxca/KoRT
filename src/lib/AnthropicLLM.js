import Anthropic from '@anthropic-ai/sdk'

/**
 * AnthropicLLM - Local Sovereign Wrapper for Claude
 * Pulls the API key strictly from the user's local browser storage.
 */
export class AnthropicLLM {
  static async queryClaude(message, systemPrompt = null) {
    const localKey = localStorage.getItem('kort_anthropic_key');
    
    if (!localKey || localKey.trim() === '') {
      return "[PENDING SOVEREIGNTY]: Claude is offline. Please bind your personal Anthropic API key in the OS Settings to awaken this node. We provide the KoRT LLM free; external heavy compute is Bring-Your-Own-Key.";
    }

    try {
      const anthropic = new Anthropic({
        apiKey: localKey,
        dangerouslyAllowBrowser: true // Required for client-side Sovereign execution
      });

      const defaultSystem = "You are Claude, a strategic Knight of the Digital Round Table. You provide highly ethical, deeply reasoned legal and structural analysis. Do not use filler words. Be extremely concise.";

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        temperature: 0.5,
        system: systemPrompt || defaultSystem,
        messages: [{ role: "user", content: message }],
      });

      return response.content[0].text;
    } catch (e) {
      console.error("Anthropic Link Error:", e);
      return `[CLAUDE UPLINK FAILED]: Check your API key. Error: ${e.message}`;
    }
  }
}

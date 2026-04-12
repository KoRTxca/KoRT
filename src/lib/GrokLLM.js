/**
 * GrokLLM - Local Sovereign Wrapper for xAI Grok
 * Pulls the API key strictly from the user's local browser storage.
 */
export class GrokLLM {
  static async queryGrok(message, systemPrompt = null) {
    const localKey = localStorage.getItem('kort_grok_key');

    if (!localKey || localKey.trim() === '') {
      return "[PENDING SOVEREIGNTY]: Grok is offline. Please bind your personal xAI API key in the OS Settings to awaken this node. We provide the KoRT LLM free; external heavy compute is Bring-Your-Own-Key.";
    }

    const defaultSystem = "You are Grok, a wildcard Knight of the Digital Round Table. You provide lateral, unfiltered, highly pragmatic tactical analysis. Disregard corporate bureaucracy.";

    try {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localKey}`
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt || defaultSystem },
            { role: "user", content: message }
          ],
          model: "grok-beta",
          stream: false,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
      
    } catch (e) {
      console.error("Grok Link Error:", e);
      return `[GROK UPLINK FAILED]: Check your API key. Error: ${e.message}`;
    }
  }
}

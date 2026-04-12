/**
 * MERLIN CLIENT: Sovereign OS Local LLM Bridge
 * Connects to the local worker nodes running Ollama/LiteLLM.
 */

export const OLLAMA_HOST = 'http://192.168.1.101:11434';
export const WORKER_2_HOST = 'http://192.168.1.102:11434';

export const merlinClient = {
  /**
   * Probes the local network for the Merlin Node (Worker 1).
   * @returns {Promise<boolean>} True if online.
   */
  checkStatus: async () => {
    try {
      // Use the tags endpoint as a heartbeat
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
      
      const response = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response.ok;
    } catch (e) {
      console.warn("Merlin Node 1 Offline:", e.message);
      return false;
    }
  },

  /**
   * Sends a prompt to the local Merlin orchestration layer.
   * Defaults to llama3-8b as per litellm_config.
   */
  generate: async (prompt, model = 'llama3') => {
    try {
      const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: false
        })
      });
      const data = await response.json();
      return data.response;
    } catch (e) {
      if (e.name === 'AbortError') {
        throw new Error("Merlin node took too long to respond. Check system load.");
      }
      if (e.message.includes('Failed to fetch')) {
        throw new Error("Cannot reach local Merlin node. Ensure OLLAMA_ORIGINS=\"*\" is set and the worker is running.");
      }
      console.error("Merlin Generation Error:", e);
      throw e;
    }
  }
};

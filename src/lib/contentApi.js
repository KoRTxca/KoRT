/**
 * KoRT Content API Orchestrator
 * Interfacing with external APIs for dynamic text, image, and video content.
 * 
 * Version: 1.0.0
 * Protocol: Secure Fetch
 */

export const ContentAPI = {
  // --- TEXT GENERATION (OpenAI / Anthropic / Groq) ---
  async fetchText(prompt, options = {}) {
    const apiKey = import.meta.env.VITE_TEXT_API_KEY || '';
    if (!apiKey) {
      console.warn("ContentAPI: VITE_TEXT_API_KEY missing. Returning fallback.");
      return "The Round Table stands ready. (API key required for dynamic content)";
    }

    try {
      // Example using OpenAI-compatible endpoint
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: options.model || "gpt-4-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: options.maxTokens || 500
        })
      });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("ContentAPI Text Error:", error);
      return "Error fetching wisdom from the Ether.";
    }
  },

  // --- IMAGE GENERATION / FETCH (Unsplash / DALL-E) ---
  async fetchImage(query, options = {}) {
    const apiKey = import.meta.env.VITE_IMAGE_API_KEY || '';
    if (!apiKey) {
      // Fallback to high-quality placeholders
      return `https://source.unsplash.com/featured/?${encodeURIComponent(query)},dark,gothic`;
    }

    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${apiKey}`);
      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.error("ContentAPI Image Error:", error);
      return "/placeholder_dragon.png";
    }
  },

  // --- VIDEO CONTENT (Pexels / YouTube / Vimeo) ---
  async fetchVideo(query, options = {}) {
    const apiKey = import.meta.env.VITE_VIDEO_API_KEY || '';
    if (!apiKey) {
      return "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-background-10-large.mp4";
    }

    try {
      const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=1`, {
        headers: { 'Authorization': apiKey }
      });
      const data = await response.json();
      return data.videos[0]?.video_files[0]?.link;
    } catch (error) {
      console.error("ContentAPI Video Error:", error);
      return null;
    }
  }
};

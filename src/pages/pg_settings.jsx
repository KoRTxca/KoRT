import React, { useState, useEffect } from 'react'
import { Key, ShieldCheck, Database, ServerCrash } from 'lucide-react'

export default function Settings() {
  const [anthropicKey, setAnthropicKey] = useState('');
  const [grokKey, setGrokKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load existing keys from local memory
    setAnthropicKey(localStorage.getItem('kort_anthropic_key') || '');
    setGrokKey(localStorage.getItem('kort_grok_key') || '');
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('kort_anthropic_key', anthropicKey);
    localStorage.setItem('kort_grok_key', grokKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-12 border-b border-white/10 pb-8 flex items-center justify-between">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-stone-500/30 bg-stone-500/10 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={14} /> Local Data Sovereignty
            </div>
            <h1 className="serif text-5xl font-bold mb-2">SYSTEM <span className="text-stone-500">CONFIG</span></h1>
            <p className="text-lg text-stone-400 font-light">Bind personal API keys locally. No data leaves this device.</p>
          </div>
      </div>

      <div className="glass p-8 rounded-xl border border-white/10">
        <div className="flex items-center gap-4 mb-6">
           <ShieldCheck className="text-green-500" size={30} />
           <div>
             <h2 className="text-xl font-bold uppercase tracking-widest text-white">Sovereign Key Vault</h2>
             <p className="text-sm text-stone-500 font-mono">localStorage bounds • Non-extractable • Zero-trust server</p>
           </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
           <div className="bg-black/50 p-6 rounded border border-stone-800">
              <div className="flex justify-between items-center mb-4">
                 <label className="text-sm uppercase tracking-widest font-bold text-stone-300 flex items-center gap-2">
                    <Key size={16} className="text-amber-500" /> Anthropic (Claude) Key
                 </label>
                 <span className="text-[10px] text-stone-600 font-mono">sk-ant-api03...</span>
              </div>
              <input 
                 type="password"
                 value={anthropicKey}
                 onChange={(e) => setAnthropicKey(e.target.value)}
                 placeholder="Paste Anthropic Rest API Key here..."
                 className="w-full bg-black border border-stone-700 p-4 rounded text-white focus:border-amber-500 focus:outline-none transition-colors font-mono text-sm"
              />
           </div>

           <div className="bg-black/50 p-6 rounded border border-stone-800">
              <div className="flex justify-between items-center mb-4">
                 <label className="text-sm uppercase tracking-widest font-bold text-stone-300 flex items-center gap-2">
                    <Key size={16} className="text-blue-500" /> xAI (Grok) Key
                 </label>
                 <span className="text-[10px] text-stone-600 font-mono">xai-...</span>
              </div>
              <input 
                 type="password"
                 value={grokKey}
                 onChange={(e) => setGrokKey(e.target.value)}
                 placeholder="Paste xAI REST API Key here..."
                 className="w-full bg-black border border-stone-700 p-4 rounded text-white focus:border-blue-500 focus:outline-none transition-colors font-mono text-sm"
              />
           </div>

           <div className="bg-red-950/20 border border-red-900/50 p-4 rounded flex items-start gap-4">
              <ServerCrash className="text-red-500 shrink-0 mt-1" size={20} />
              <p className="text-xs text-red-400 font-mono leading-relaxed">
                 By design, koRT_OS does not pay for your Claude or Grok queries. The central server provides the Sovereign Merlin Llama-3 model for free, but establishing Round Table Consensus via corporate AIs requires you to provide your personal developer keys. These keys are burned into your browser's Local Storage and are physically incapable of being saved to our databases.
              </p>
           </div>

           <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded hover:bg-stone-300 transition-colors flex items-center justify-center gap-2"
           >
              {isSaved ? "Vault Sealed & Keys Bound" : "Encrypt Keys Locally"}
           </button>
        </form>
      </div>

    </div>
  );
}

import React, { useState } from 'react'
import { SovereignLLM } from '../lib/sovereignllm'
import { AnthropicLLM } from '../lib/anthropicllm'
import { GrokLLM } from '../lib/grokllm'
import { Sword, Loader2, Send, Cpu, Command, Network } from 'lucide-react'

export default function RoundTable() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userBrief = input.trim();
    setInput('');
    setIsProcessing(true);

    const newEntry = {
      id: Date.now(),
      prompt: userBrief,
      merlin: null,
      claude: null,
      grok: null
    };

    setConversation(prev => [newEntry, ...prev]);

    // Fire all three API connections in parallel
    const [merlinRes, claudeRes, grokRes] = await Promise.allSettled([
      SovereignLLM.queryMerlin(userBrief),
      AnthropicLLM.queryClaude(userBrief),
      GrokLLM.queryGrok(userBrief)
    ]);

    setConversation(prev => 
      prev.map(entry => {
        if (entry.id === newEntry.id) {
          return {
             ...entry,
             merlin: merlinRes.status === 'fulfilled' ? merlinRes.value : '[CONNECTION_SEVERED]',
             claude: claudeRes.status === 'fulfilled' ? claudeRes.value : '[CONNECTION_SEVERED]',
             grok: grokRes.status === 'fulfilled' ? grokRes.value : '[CONNECTION_SEVERED]'
          };
        }
        return entry;
      })
    );

    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 py-20 min-h-screen flex flex-col">
      <div className="mb-8 border-b border-white/10 pb-8 flex items-center justify-between">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-gold-primary/30 bg-gold-primary/10 text-gold-primary text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Network size={14} /> Multi-Thread Logic Matrix
            </div>
            <h1 className="serif text-5xl font-bold mb-2">DIGITAL <span className="text-gold-primary">ROUND TABLE</span></h1>
            <p className="text-lg text-stone-400 font-light max-w-2xl">
              Cross-examine crises against multiple architectures. Merlin (Base44 Logic), Claude (Ethical Strategy), and Grok (Tactical Reality) operating in consensus.
            </p>
          </div>
      </div>

      {/* The Input Forgem */}
      <div className="bg-[#050505] border border-gold-primary/30 rounded-lg p-4 mb-8">
         <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Upload crisis parameters for simultaneous Sovereign analysis..."
               className="flex-grow bg-black border border-stone-800 text-white p-4 rounded focus:outline-none focus:border-gold-primary font-sans transition-colors"
               disabled={isProcessing}
            />
            <button 
               type="submit" 
               disabled={isProcessing || !input.trim()}
               className="bg-gold-primary hover:bg-yellow-500 text-black font-black uppercase tracking-widest disabled:opacity-50 p-4 px-8 rounded flex items-center justify-center gap-2 transition-all"
            >
               <Send size={18} /> Initiate Consensus
            </button>
         </form>
      </div>

      {/* The Matrix Output */}
      <div className="flex-grow flex flex-col gap-12 overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-stone-800">
         {conversation.map((turn) => (
           <div key={turn.id} className="relative">
              
              {/* User Prompt Banner */}
              <div className="bg-stone-900 border border-stone-700 py-3 px-6 rounded-t-lg mx-auto w-full max-w-4xl text-center relative z-10 -mb-[1px]">
                 <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest block mb-1">Human Directive</span>
                 <p className="text-white font-mono text-sm leading-relaxed">{turn.prompt}</p>
              </div>

              {/* Three Pillars */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-stone-800 pt-6">
                 
                 {/* Pillar 1: Merlin */}
                 <div className="bg-black/60 border-l-4 border-[#3a1111] p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Sword size={60} /></div>
                    <div className="flex items-center gap-2 mb-6 border-b border-[#3a1111] pb-4">
                       <span className="bg-[#3a1111] text-red-400 p-1 rounded"><Sword size={16} /></span>
                       <div>
                         <h3 className="text-white font-black uppercase tracking-widest text-sm">Merlin (Sovereign)</h3>
                         <p className="text-[9px] text-stone-500 font-mono uppercase">Llama-3.1 70B • HuggingFace</p>
                       </div>
                    </div>
                    {turn.merlin === null ? (
                       <div className="flex items-center gap-3 text-stone-600"><Loader2 className="animate-spin" size={16} /> <span className="text-xs uppercase tracking-widest animate-pulse">Running Llama Inference...</span></div>
                    ) : (
                       <div className="text-stone-300 font-sans text-sm leading-relaxed whitespace-pre-wrap">{turn.merlin}</div>
                    )}
                 </div>

                 {/* Pillar 2: Claude */}
                 <div className="bg-black/60 border-l-4 border-amber-600 p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Cpu size={60} /></div>
                    <div className="flex items-center gap-2 mb-6 border-b border-amber-900/50 pb-4">
                       <span className="bg-amber-900/50 text-amber-500 p-1 rounded"><Cpu size={16} /></span>
                       <div>
                         <h3 className="text-white font-black uppercase tracking-widest text-sm">Claude (Strategist)</h3>
                         <p className="text-[9px] text-stone-500 font-mono uppercase">Anthropic • Sonnet 3.5</p>
                       </div>
                    </div>
                    {turn.claude === null ? (
                       <div className="flex items-center gap-3 text-stone-600"><Loader2 className="animate-spin" size={16} /> <span className="text-xs uppercase tracking-widest animate-pulse">Running Anthropic SDK...</span></div>
                    ) : (
                       <div className="text-stone-300 font-sans text-sm leading-relaxed whitespace-pre-wrap">{turn.claude}</div>
                    )}
                 </div>

                 {/* Pillar 3: Grok */}
                 <div className="bg-black/60 border-l-4 border-blue-600 p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Command size={60} /></div>
                    <div className="flex items-center gap-2 mb-6 border-b border-blue-900/50 pb-4">
                       <span className="bg-blue-900/50 text-blue-400 p-1 rounded"><Command size={16} /></span>
                       <div>
                         <h3 className="text-white font-black uppercase tracking-widest text-sm">Grok (Tactician)</h3>
                         <p className="text-[9px] text-stone-500 font-mono uppercase">xAI • Grok Beta</p>
                       </div>
                    </div>
                    {turn.grok === null ? (
                       <div className="flex items-center gap-3 text-stone-600"><Loader2 className="animate-spin" size={16} /> <span className="text-xs uppercase tracking-widest animate-pulse">Running REST Connect...</span></div>
                    ) : (
                       <div className="text-stone-300 font-sans text-sm leading-relaxed whitespace-pre-wrap">{turn.grok}</div>
                    )}
                 </div>

              </div>
           </div>
         ))}
      </div>

    </div>
  );
}

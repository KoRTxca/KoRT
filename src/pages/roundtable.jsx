import React, { useState, useEffect } from 'react';
import { SovereignLLM } from '../lib/sovereignllm';
import { AnthropicLLM } from '../lib/anthropicllm';
import { GrokLLM } from '../lib/grokllm';
import { Sword, Loader2, Send, Cpu, Command, Network, Shield, AlertCircle, FileText, Gavel } from 'lucide-react';

/**
 * 🏰 THE DIGITAL ROUND TABLE — CONCENSUS MATRIX
 * v3.1.0 | Operation OMEGA Restoration
 * 
 * THE THREE LAWS OF KORT:
 * 1. Does it contain everything Mike ASKED FOR?
 * 2. Does it match what Mike WANTS? (brand, tone, legal safety, KoRT philosophy)
 * 3. Does it account for what Mike NEEDS? (unasked dependencies, liabilities, broken links)
 * 
 * CORE ARCHITECTURE:
 * - Merlin (Lead Architect / Sovereign Node)
 * - Claude (Strategist / Ethical Strategy)
 * - Grok (Tactician / Tactical Reality)
 */

const CONSTITUTION = [
  { 
    id: 'oath', 
    title: 'THE OATH OF THE KNIGHT', 
    content: '"No one gets left behind." We serve the community first. We protect the vulnerable. We build the future with Sovereign code.' 
  },
  { 
    id: 'three-laws', 
    title: 'THE THREE LAWS', 
    content: '1. Ask (Fulfill the request) • 2. Want (Align with the spirit) • 3. Need (Fill the gaps).' 
  },
  { 
    id: 'pre-flight', 
    title: 'PRE-FLIGHT PROTOCOL', 
    content: 'Zero placeholders. Zero partial files. Surgical edits only. Consensus before delivery.' 
  }
];

export default function RoundTable() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [activeTab, setActiveTab] = useState('consensus'); // consensus, constitution

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

    // Consolidate queries across the Matrix
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
             merlin: merlinRes.status === 'fulfilled' ? merlinRes.value : '[SIGNAL_LOST]',
             claude: claudeRes.status === 'fulfilled' ? claudeRes.value : '[SIGNAL_LOST]',
             grok: grokRes.status === 'fulfilled' ? grokRes.value : '[SIGNAL_LOST]'
          };
        }
        return entry;
      })
    );

    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 py-20 min-h-screen flex flex-col font-sans bg-[#08080f] text-[#e8e8e8]">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 italic">
              <Network size={12} /> Matrix Protocol v3.1.0
            </div>
            <h1 className="serif text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">DIGITAL <span className="text-[#c9a84c] italic">ROUND TABLE</span></h1>
            <p className="text-stone-400 text-lg font-light mt-4 max-w-3xl italic">
              Consensus-based logic execution. Merlin, Claude, and Grok operating under the Three Laws of Neo-Camelot.
            </p>
          </div>
          
          <div className="flex gap-4">
             <button onClick={() => setActiveTab('consensus')} className={`px-6 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'consensus' ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'}`}>Consensus Matrix</button>
             <button onClick={() => setActiveTab('constitution')} className={`px-6 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'constitution' ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'}`}>Constitution</button>
          </div>
      </div>

      {activeTab === 'consensus' ? (
        <>
          {/* THE FORGE (INPUT) */}
          <div className="bg-[#0a0a1a] border border-[#c9a84c]/20 rounded-3xl p-6 mb-12 shadow-2xl shadow-amber-500/5">
             <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input 
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Upload directive to the Multi-Thread Consensus Matrix..."
                   className="flex-grow bg-black border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-[#c9a84c] font-mono transition-all text-sm"
                   disabled={isProcessing}
                />
                <button 
                   type="submit" 
                   disabled={isProcessing || !input.trim()}
                   className="bg-[#c9a84c] text-[#08080f] font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-xl hover:bg-[#e8d5a3] transition-all disabled:opacity-50 flex items-center justify-center gap-3 italic"
                >
                   {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Sword size={18} />} Initiate Consensus
                </button>
             </form>
          </div>

          {/* THE MATRIX (OUTPUT) */}
          <div className="flex-grow space-y-16 pb-20">
             {conversation.map((turn) => (
               <div key={turn.id} className="animate-fade-in">
                  
                  {/* Human Directive Banner */}
                  <div className="bg-white/5 border border-white/10 py-4 px-8 rounded-2xl mx-auto w-fit mb-8 relative">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#08080f] px-4 text-[10px] font-bold text-stone-500 uppercase tracking-[0.4em]">Directive</div>
                     <p className="text-white font-mono text-sm italic">{turn.prompt}</p>
                  </div>

                  {/* Three Pillars */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     
                     {/* Pillar 1: Merlin */}
                     <div className="bg-[#0a0a1a] border-t-2 border-[#c9a84c] p-8 rounded-3xl relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                           <div className="w-12 h-12 bg-[#c9a84c]/10 text-[#c9a84c] rounded-xl flex items-center justify-center"><Sword size={24} /></div>
                           <div>
                             <h3 className="text-white font-bold uppercase tracking-widest text-sm">Merlin (Sovereign)</h3>
                             <p className="text-[9px] text-stone-600 font-mono uppercase">Local Iron Node • Llama-3.1 70B</p>
                           </div>
                        </div>
                        {turn.merlin === null ? (
                           <div className="flex items-center gap-3 text-stone-600 font-mono text-xs uppercase tracking-widest animate-pulse">Running Local Inference...</div>
                        ) : (
                           <div className="text-stone-400 font-light text-sm leading-relaxed whitespace-pre-wrap italic">{turn.merlin}</div>
                        )}
                     </div>

                     {/* Pillar 2: Claude */}
                     <div className="bg-[#0a0a1a] border-t-2 border-[#4da868] p-8 rounded-3xl relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                           <div className="w-12 h-12 bg-[#4da868]/10 text-[#4da868] rounded-xl flex items-center justify-center"><Cpu size={24} /></div>
                           <div>
                             <h3 className="text-white font-bold uppercase tracking-widest text-sm">Claude (Strategist)</h3>
                             <p className="text-[9px] text-stone-600 font-mono uppercase">Anthropic • Sonnet 3.5</p>
                           </div>
                        </div>
                        {turn.claude === null ? (
                           <div className="flex items-center gap-3 text-stone-600 font-mono text-xs uppercase tracking-widest animate-pulse">Running Strategic Logic...</div>
                        ) : (
                           <div className="text-stone-400 font-light text-sm leading-relaxed whitespace-pre-wrap italic">{turn.claude}</div>
                        )}
                     </div>

                     {/* Pillar 3: Grok */}
                     <div className="bg-[#0a0a1a] border-t-2 border-blue-500 p-8 rounded-3xl relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                           <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center"><Gavel size={24} /></div>
                           <div>
                             <h3 className="text-white font-bold uppercase tracking-widest text-sm">Grok (Tactician)</h3>
                             <p className="text-[9px] text-stone-600 font-mono uppercase">xAI • Grok Beta</p>
                           </div>
                        </div>
                        {turn.grok === null ? (
                           <div className="flex items-center gap-3 text-stone-600 font-mono text-xs uppercase tracking-widest animate-pulse">Running Tactical Check...</div>
                        ) : (
                           <div className="text-stone-400 font-light text-sm leading-relaxed whitespace-pre-wrap italic">{turn.grok}</div>
                        )}
                     </div>

                  </div>
               </div>
             ))}
          </div>
        </>
      ) : (
        /* CONSTITUTIONAL MODE */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in pb-20">
           <div className="space-y-12">
              <div className="border-l-4 border-[#c9a84c] pl-8">
                 <h2 className="serif text-3xl font-bold text-white uppercase tracking-tighter mb-4 italic">THE KoRT <span className="text-[#c9a84c]">CONSTITUTION</span></h2>
                 <p className="text-stone-400 font-light leading-relaxed italic">The Round Table Protocol (v3.1.0). Immutably defined to protect members and preserve Sovereignty.</p>
              </div>

              <div className="space-y-8">
                 {CONSTITUTION.map((item) => (
                    <div key={item.id} className="bg-[#0a0a1a] border border-white/5 p-8 rounded-3xl shadow-xl shadow-amber-500/5 transition-all hover:bg-white/5">
                       <h3 className="serif text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-3">
                          <Shield size={16} /> {item.title}
                       </h3>
                       <p className="text-stone-300 font-light italic leading-loose text-sm">{item.content}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 p-10 rounded-[3rem]">
                 <h2 className="serif text-2xl font-bold text-white uppercase tracking-tighter mb-6 italic flex items-center gap-3">
                    <AlertCircle className="text-amber-500" /> System Protocols
                 </h2>
                 <ul className="space-y-6">
                    <li className="flex gap-4">
                       <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-amber-500 shrink-0 font-bold text-xs">P.1</div>
                       <p className="text-xs text-stone-400 leading-relaxed font-mono uppercase tracking-widest"><strong className="text-white">Zero Placeholders:</strong> No document leaves the node without complete variables. No partial code. Ever.</p>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-amber-500 shrink-0 font-bold text-xs">P.2</div>
                       <p className="text-xs text-stone-400 leading-relaxed font-mono uppercase tracking-widest"><strong className="text-white">Surgical Immutability:</strong> Original comments, docstrings, and logic grain are preserved during edits. No nuking.</p>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-amber-500 shrink-0 font-bold text-xs">P.3</div>
                       <p className="text-xs text-stone-400 leading-relaxed font-mono uppercase tracking-widest"><strong className="text-white">Consensus Consensus:</strong> All outputs verified against the Three Laws before delivery to the User Node.</p>
                    </li>
                 </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
                 <FileText className="text-stone-700 mb-6" size={40} />
                 <h3 className="serif text-xl font-bold text-white uppercase tracking-widest mb-4">Official Documentation</h3>
                 <p className="text-xs text-stone-500 leading-relaxed mb-8 uppercase tracking-[0.2em]">Master instructions located in <code className="text-[#c9a84c]">CLAUDE_PROJECT_INSTRUCTIONS.md</code>. Reference for canonical naming and tiering.</p>
                 <a href="/guide" className="inline-block px-8 py-3 border border-stone-800 text-stone-400 hover:text-amber-500 hover:border-amber-500 transition-all text-[10px] uppercase font-bold tracking-widest rounded-full">View System Guide →</a>
              </div>
           </div>
        </div>
      )}

      <footer className="text-center text-[10px] text-stone-600 uppercase font-bold tracking-[0.5em] mt-20">
         Knights of the Round Table — KoRTx.ca // Round Table Protocol v3.1.0
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { SovereignLLM } from '../lib/sovereignllm';
import { Sword, Loader2, Send, Cpu, Command, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SovereignSandbox() {
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
      merlin: null
    };

    setConversation(prev => [newEntry, ...prev]);

    // ONLY query SovereignLLM (Merlin) - Do not touch Anthropic or Grok
    try {
        const merlinRes = await SovereignLLM.queryMerlin(userBrief);
        setConversation(prev => 
            prev.map(entry => {
              if (entry.id === newEntry.id) {
                return { ...entry, merlin: merlinRes };
              }
              return entry;
            })
        );
    } catch(err) {
        setConversation(prev => 
            prev.map(entry => {
              if (entry.id === newEntry.id) {
                return { ...entry, merlin: "[CONNECTION SEVERED]" };
              }
              return entry;
            })
        );
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 min-h-screen flex flex-col">
      <div className="mb-4 border-b border-white/10 pb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="inline-block px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 w-max">
              <Sword size={14} /> Sandbox Protocol Active
            </div>
            <Link to="/create" className="bg-white text-black px-4 py-2 text-xs uppercase tracking-widest font-black rounded hover:bg-stone-300 transition-colors">
               Unlock Full OS
            </Link>
          </div>
          <h1 className="serif text-4xl font-bold mb-2">MERLIN <span className="text-amber-500">SANDBOX</span></h1>
          <p className="text-sm text-stone-400 font-light max-w-3xl">
            You are operating in an unsecured guest environment. Anthropic [Claude] and xAI [Grok] consensus processors have been forcibly bypassed to conserve network keys. You are directly interfacing with the free <strong className="text-stone-300">Sovereign Llama-3 Node</strong>.
          </p>
      </div>

      <div className="bg-red-950/20 border border-red-900/50 p-3 rounded flex items-center gap-3 mb-8 w-max text-xs text-red-500 uppercase tracking-widest font-bold">
         <AlertTriangle size={16} /> Data Sovereignty Not Guaranteed Outside Protected Sector.
      </div>

      <div className="bg-[#050505] border border-amber-500/30 rounded-lg p-4 mb-8 relative">
         <div className="absolute -top-3 -right-3 rotate-12 opacity-50 pointer-events-none">
            <ShieldCheck size={40} className="text-amber-500" />
         </div>
         <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Run an isolated simulation against the Llama-3 matrix..."
               className="flex-grow bg-black border border-stone-800 text-white p-4 rounded focus:outline-none focus:border-amber-500 font-sans transition-colors"
               disabled={isProcessing}
            />
            <button 
               type="submit" 
               disabled={isProcessing || !input.trim()}
               className="bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest disabled:opacity-50 p-4 px-8 rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
               <Send size={18} /> Ping Node
            </button>
         </form>
      </div>

      <div className="flex-grow flex flex-col gap-8 overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-stone-800">
         {conversation.map((turn) => (
           <div key={turn.id} className="relative">
              
              <div className="bg-stone-900 border border-stone-700 py-3 px-6 rounded-t-lg mx-auto w-full max-w-3xl text-center relative z-10 -mb-[1px]">
                 <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest block mb-1">Unverified Directive</span>
                 <p className="text-white font-mono text-sm leading-relaxed">{turn.prompt}</p>
              </div>

              <div className="border border-stone-800 rounded bg-black/60 w-full max-w-4xl mx-auto">
                 <div className="bg-black/60 border-l-4 border-amber-600 p-8 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Sword size={80} /></div>
                    
                    <div className="flex items-center justify-between border-b border-amber-900/50 pb-4 mb-6">
                        <div className="flex items-center gap-3">
                           <span className="bg-amber-900/50 text-amber-500 p-2 rounded"><Sword size={20} /></span>
                           <div>
                             <h3 className="text-white font-black uppercase tracking-widest text-sm">Merlin</h3>
                             <p className="text-[9px] text-stone-500 font-mono uppercase">Llama-3.1 70B • HuggingFace Bridge</p>
                           </div>
                        </div>

                        <div className="flex gap-2">
                           <span className="bg-stone-900 text-stone-600 border border-stone-800 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded line-through flex items-center gap-1">
                               <Cpu size={12}/> Claude Offline
                           </span>
                           <span className="bg-stone-900 text-stone-600 border border-stone-800 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded line-through flex items-center gap-1">
                               <Command size={12}/> Grok Offline
                           </span>
                        </div>
                    </div>

                    {turn.merlin === null ? (
                       <div className="flex items-center gap-3 text-stone-500 py-10 justify-center">
                          <Loader2 className="animate-spin text-amber-500" size={24} /> 
                          <span className="text-sm uppercase tracking-widest animate-pulse font-bold text-amber-500/80">Running Llama Inference against HuggingFace...</span>
                       </div>
                    ) : (
                       <div className="text-stone-300 font-sans leading-relaxed whitespace-pre-wrap">{turn.merlin}</div>
                    )}
                 </div>
              </div>

           </div>
         ))}
      </div>

    </div>
  );
}

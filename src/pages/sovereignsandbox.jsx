import React from 'react'
import { Layers, Cpu, Rocket, Code, Box, Terminal, ShieldAlert } from 'lucide-react'

export default function SovereignSandbox() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in flex flex-col gap-12">
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Layers size={12} /> Application Sandbox Node
             </div>
             <h1 className="serif text-5xl font-black text-white uppercase tracking-tighter">APP <span className="text-blue-500">SANDBOX</span></h1>
             <p className="text-stone-400 text-lg font-light mt-2 max-w-2xl">
                Build and test your own Sovereign Apps within our native stack. No servers, no tracking, pure iron-grade performance for those who forge their own tools.
             </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-[#0a0a1a] border border-blue-500/20 p-4 rounded-xl flex items-center gap-4">
                <Rocket className="text-blue-500" size={32} />
                <div>
                   <span className="block text-[10px] uppercase font-bold text-stone-500 tracking-widest">Compiler Env</span>
                   <span className="text-xl font-bold text-white uppercase italic">Active</span>
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
             <div className="glass-vault p-10 rounded-3xl border border-white/5 bg-[#050510] relative overflow-hidden flex flex-col items-center justify-center text-center py-32 group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
                <Code size={64} className="text-stone-700 mb-8 group-hover:text-blue-500 transition-colors duration-500" />
                <h3 className="serif text-2xl font-black text-white uppercase tracking-widest mb-4">Initialize New Forge Project</h3>
                <p className="text-stone-500 text-sm max-w-sm mb-12">Click to generate a local React/Tailwind scaffold optimized for the Sovereign P2P runtime.</p>
                <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] rounded transition-all shadow-xl shadow-blue-500/10">Launch Compiler</button>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-[#0a0a1a] border border-white/10 p-8 rounded-3xl">
                <h4 className="serif text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Terminal size={14} /> Dev Metrics
                </h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-stone-500">
                      <span>Node Latency</span>
                      <span className="text-white">4ms</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-stone-500">
                      <span>Memory Cap</span>
                      <span className="text-white">512MB</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-stone-500">
                      <span>Network Protocol</span>
                      <span className="text-green-500 font-mono">P2P_MESH_3.4</span>
                   </div>
                </div>
             </div>

             <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                <h4 className="serif text-sm font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <ShieldAlert size={14} /> Safety Guard
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed font-light uppercase tracking-wider">
                   All sandbox applications are strictly isolated from the Primary Knight Dossier. Multi-signature verification is required for full filesystem node access.
                </p>
             </div>
          </div>

       </div>

    </div>
  );
}

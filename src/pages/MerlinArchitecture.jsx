import React from 'react';
import { Cpu, Combine, Network, ShieldCheck, Zap, Lock, Database, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MerlinArchitecture() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e8e8e8] font-sans pb-32">
      
      {/* HEADER SECTION */}
      <section className="relative w-full pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
            <Combine className="text-green-500 w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400">P2P Mesh Commander</span>
          </div>
          <h1 className="serif text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">
            Meet <span className="text-green-500">Merlin</span>
          </h1>
          <p className="text-xl text-stone-400 font-light max-w-3xl mx-auto leading-relaxed">
            The Sovereign Agentic Commander. Merlin is not a single language model. It is a decentralized P2P logic proxy that securely distributes workloads (like ICBC affidavits or game logic generation) across our Consenting Members' private hardware nodes using LM Studio.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Representation */}
            <div className="relative">
               <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
               <div className="relative bg-[#0a0a12] border border-green-900/50 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(74,222,128,0.1)]">
                  <div className="flex flex-col gap-6">
                     <div className="bg-black border border-stone-800 p-6 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <ShieldCheck className="text-blue-500" />
                           <span className="font-mono text-sm tracking-widest">USER [LCARS WAR ROOM]</span>
                        </div>
                     </div>
                     <div className="w-1 h-8 bg-green-900 mx-auto" />
                     <div className="bg-black border border-green-500/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(74,222,128,0.1)] relative">
                        <Cpu className="text-green-500 w-12 h-12 mb-4" />
                        <h4 className="serif text-xl font-bold uppercase text-white tracking-widest">Merlin Relay</h4>
                        <span className="text-xs text-stone-500 font-mono mt-2">D:\KoRT_Workspace\drt_relay</span>
                     </div>
                     <div className="w-1 h-8 bg-green-900 mx-auto" />
                     <div className="grid grid-cols-3 gap-4">
                        <div className="bg-black border border-stone-800 p-4 rounded-2xl text-center">
                           <HardDrive className="text-amber-500 mx-auto mb-2 w-6 h-6" />
                           <div className="font-mono text-[9px] tracking-widest text-stone-500">ISAAC_PC [GEMMA]</div>
                        </div>
                        <div className="bg-black border border-stone-800 p-4 rounded-2xl text-center">
                           <Database className="text-blue-500 mx-auto mb-2 w-6 h-6" />
                           <div className="font-mono text-[9px] tracking-widest text-stone-500">VULTR GPU NODE</div>
                        </div>
                        <div className="bg-black border border-stone-800 p-4 rounded-2xl text-center">
                           <Network className="text-purple-500 mx-auto mb-2 w-6 h-6" />
                           <div className="font-mono text-[9px] tracking-widest text-stone-500">API GATEWAYS</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content text */}
            <div className="space-y-8">
               <div>
                  <h3 className="text-3xl font-bold uppercase serif italic mb-4 text-white">The P2P Hardware Mesh</h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                     By pooling the hardware of consenting members (like Isaac's PC running LM Studio), we bypass the standard tech grid. Merlin routes logic requests to the best available idle hardware node.
                  </p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Lock className="text-green-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-2">Gatekeeper Consensus</h4>
                        <p className="text-sm font-light text-stone-400">Before a member's local hardware executes a command, the prompt is authenticated and scrubbed to ensure it strictly follows KoRT SOPs and legal protocols.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Zap className="text-amber-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-2">The LCARS War Room</h4>
                        <p className="text-sm font-light text-stone-400">Merlin is controlled via the <strong>Sovereign War Room</strong>—our proprietary clone of the LM Studio / Claude UI interface, injected with x.ai Grok voice synthesis for hands-free command dictation.</p>
                     </div>
                  </div>
               </div>

               <div className="pt-8 flex gap-4">
                 <Link to="/war-room" className="inline-flex items-center gap-4 bg-amber-500 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors">
                   Enter War Room <Cpu className="w-4 h-4" />
                 </Link>
               </div>
            </div>

         </div>
      </section>

    </div>
  );
}

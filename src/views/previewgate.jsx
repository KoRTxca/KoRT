import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, Cpu, HeartPulse, ShieldCheck, Gamepad2, Sword, BookOpen, Layers } from 'lucide-react'

export default function PreviewGate({ attemptedRoute }) {
  // Format the attempted route name for the display
  const routeName = attemptedRoute 
      ? attemptedRoute.replace('/', '').toUpperCase().split('/')[0] 
      : 'PROTECTED SECTOR';

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 min-h-screen animate-fade-in">
      
      {/* Premium Authorization Header */}
      <div className="flex flex-col items-center text-center mb-16">
         <div className="bg-red-900/10 border border-red-500/30 px-6 py-2 rounded-full mb-8 flex items-center gap-3">
            <ShieldAlert size={16} className="text-red-500 animate-pulse" />
            <span className="text-red-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
               Access Restricted: {routeName} requires Sovereign Clearance
            </span>
         </div>
         
         <h1 className="SERIF TEXT-5XL MD:TEXT-7XL FONT-BOLD MB-6 UPPERCASE">
            Knights of <br/> <span className=\"text-amber-500\">the Round Table</span>
         </h1>
         <p className="text-lg text-stone-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
            You've reached a secure sector of the KoRT OS. This area is reserved for verified Knights who have forged their local node. Forge your identity below to unlock the full tactical suite.
         </p>
         
         <Link 
            to="/create"
            className="group relative inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-black px-12 py-5 font-black uppercase tracking-widest rounded shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:scale-105"
         >
            <ShieldCheck size={20} /> Generate Your Node Profile (Free)
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
         </Link>
      </div>

      {/* Feature Showcase Grid */}
      <div className="mb-20">
         <h2 className="serif text-2xl text-center mb-12 uppercase tracking-[0.4em] text-stone-500 text-sm font-bold">
            [ WHAT LIES WITHIN THE TABLE ]
         </h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Peer Advocacy */}
            <div className="glass p-8 border-t-2 border-amber-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <Sword className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">Peer Advocacy</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  Our premier peer-advocacy engine. Automated checklists and legal letter generators for ICBC, PWD, and Housing disputes.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-amber-500/50">Tactical Defense Protocol</span>
            </div>

            {/* Digital Dollars */}
            <div className="glass p-8 border-t-2 border-green-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <HeartPulse className="text-green-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">Digital Dollars</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  The $5,000/month UBI roadmap. A curated ecosystem of earning stacks designed to fund your sovereignty through P2P work.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-green-500/50">Economic Recovery Engine</span>
            </div>

            {/* Think Tank */}
            <div className="glass p-8 border-t-2 border-teal-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <Cpu className="text-teal-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">Think Tank AI</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  Multi-model consensus logic. Run your toughest questions through Llama-3, Claude, and Grok simultaneously for unbiased truth.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-teal-500/50">Intelligence Orchestration</span>
            </div>

            {/* Crisis Watch */}
            <div className="glass p-8 border-t-2 border-red-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <ShieldCheck className="text-red-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">The Watch</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  Real-world crisis notification and support coordination. A mesh-network backup for when corporate clouds go dark.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-red-500/50">Network Resilience</span>
            </div>

            {/* The Archive */}
            <div className="glass p-8 border-t-2 border-purple-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <BookOpen className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">The Archive</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  Access 35 years of curated knowledge, business blueprints, and PPLR assets recovered to build your independent legacy.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-purple-500/50">Knowledge Preservation</span>
            </div>

            {/* Sovereign Sandbox */}
            <div className="glass p-8 border-t-2 border-blue-500 hover:bg-white/5 transition-colors rounded-xl flex flex-col group h-full">
               <Layers className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
               <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">App Sandbox</h3>
               <p className="text-sm text-stone-400 leading-relaxed font-sans mb-6">
                  Build and test your own Sovereign Apps within our native stack. No servers, no tracking, pure iron-grade performance.
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-blue-500/50">Dev-Ops Integration</span>
            </div>
         </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center pt-10 border-t border-white/10">
         <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Ready to take your seat?</p>
         <div className="flex justify-center gap-6">
            <Link to="/join" className="text-amber-500 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-colors underline underline-offset-4">Choose a Membership Tier</Link>
            <Link to="/create" className="text-white hover:text-amber-500 font-bold uppercase text-[10px] tracking-widest transition-colors underline underline-offset-4">Forge Profile First</Link>
         </div>
      </div>

    </div>
  );
}

import React from 'react';
import { Server, Database, Video, Globe, Shield, Cpu, Cloud, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SovereignStack() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e8e8e8] font-sans pb-32">
      
      {/* HEADER SECTION */}
      <section className="relative w-full pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
            <Cpu className="text-amber-500 w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400">System Architecture</span>
          </div>
          <h1 className="serif text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">
            The <span className="text-amber-500">Sovereign</span> Stack
          </h1>
          <p className="text-xl text-stone-400 font-light max-w-3xl mx-auto leading-relaxed">
            KoRT is an autonomous ecosystem. While our ultimate goal is complete decentralization, the current iteration relies on strategic partnerships with enterprise-grade infrastructure to deploy our AI Agents, host our UI, and secure our members' data.
          </p>
        </div>
      </section>

      {/* STACK DIAGRAM */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          
          {/* Vercel */}
          <div className="group bg-[#0a0a10] border border-stone-800 hover:border-purple-500 p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-black rounded-2xl border border-purple-500/30 flex items-center justify-center mb-8">
              <Globe className="text-purple-500 w-8 h-8" />
            </div>
            <h3 className="serif text-2xl font-bold uppercase text-white mb-2">Vercel Edge</h3>
            <span className="text-xs uppercase text-purple-500 font-bold tracking-widest mb-4 inline-block">The Shield (Frontend)</span>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              We leverage Vercel's global CDN to host our React interface for free. It guarantees our site loads instantly worldwide, absorbs potential DDoS attacks, and routes lightweight requests without exposing our private backend servers.
            </p>
          </div>

          {/* Vultr */}
          <div className="group bg-[#0a0a10] border border-stone-800 hover:border-blue-500 p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-black rounded-2xl border border-blue-500/30 flex items-center justify-center mb-8">
              <Server className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="serif text-2xl font-bold uppercase text-white mb-2">Vultr GPU</h3>
            <span className="text-xs uppercase text-blue-500 font-bold tracking-widest mb-4 inline-block">The Muscle (Backend)</span>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Our direct bare-metal and serverless infrastructure. Vultr provides the high-performance CUDA GPUs necessary to run our private Python FastAPI backends and local AI model inference securely off-the-grid.
            </p>
          </div>

          {/* LM Studio Local Nodes */}
          <div className="group bg-[#0a0a10] border border-stone-800 hover:border-green-500 p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-black rounded-2xl border border-green-500/30 flex items-center justify-center mb-8">
              <HardDrive className="text-green-500 w-8 h-8" />
            </div>
            <h3 className="serif text-2xl font-bold uppercase text-white mb-2">P2P Mesh AI</h3>
            <span className="text-xs uppercase text-green-500 font-bold tracking-widest mb-4 inline-block">The Slave Nodes (LM Studio)</span>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              We bypass Big Tech by running <strong className="text-white">LM Studio</strong> across consenting members' local hardware (e.g. Isaac's PC). By pooling graphics cards via a local network tunnel, we achieve decentralized computational power entirely off the traditional internet grid.
            </p>
          </div>

          {/* LTX Studio */}
          <div className="group bg-[#0a0a10] border border-stone-800 hover:border-green-500 p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-black rounded-2xl border border-green-500/30 flex items-center justify-center mb-8">
              <Video className="text-green-500 w-8 h-8" />
            </div>
            <h3 className="serif text-2xl font-bold uppercase text-white mb-2">LTX Video</h3>
            <span className="text-xs uppercase text-green-500 font-bold tracking-widest mb-4 inline-block">The Canvas (Cinematography)</span>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Powered by Lightricks' LTX-Video APIs. Our autonomous agents generate cinematic, high-fidelity video briefings on-the-fly directly into the UI to educate members rapidly.
            </p>
          </div>

        </div>
      </section>

      {/* WHY PRIVATE SERVERS? */}
      <section className="max-w-5xl mx-auto px-6 mt-12">
        <div className="bg-gradient-to-r from-stone-900 to-black border border-stone-800 p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Shield className="w-64 h-64 text-green-500" />
           </div>
           
           <div className="relative z-10 max-w-3xl">
              <h2 className="serif text-4xl font-bold text-white uppercase italic mb-6">Why Separate Domains?</h2>
              <p className="text-lg text-stone-300 font-light mb-6 leading-relaxed">
                We manage our domains via <strong className="text-white">Namecheap</strong>, routing our core URL (`kortx.ca`) directly to Vercel's global nameservers. 
              </p>
              <p className="text-stone-400 mb-8 leading-relaxed">
                Why? Because the UI requires fast, immediate asset delivery globally. Vercel handles this perfectly on their free open-source tier. However, if we put our heavy AI backend on Vercel, we would exhaust our serverless execution limits instantly. By routing the frontend via Vercel, and maintaining our API infrastructure quietly on Vultr GPU nodes, we achieve enterprise-grade scale with almost zero initial operational cost overhead.
              </p>

              <div className="flex gap-4">
                 <Link to="/digital-dollars" className="px-8 py-3 bg-amber-500 text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-amber-400 transition-colors">
                   Return to Treasury
                 </Link>
                 <Link to="/how-it-works/merlin" className="px-8 py-3 bg-transparent border border-stone-600 text-stone-300 font-bold uppercase tracking-widest text-sm rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors">
                   Review Merlin Protocol
                 </Link>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}

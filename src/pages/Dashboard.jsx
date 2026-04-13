import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Sword, Cpu, Zap, Activity, Database, HeartPulse, Flame } from 'lucide-react'
import ModuleMatrix from '../components/dashboard/modulematrix'

/**
 * 🐉 SOVEREIGN DASHBOARD v4.0
 * OPERATION OMEGA: THE DRAGON'S ASCENT
 */

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col bg-[#050505]">
      
      {/* PUBLIC GATE: Warrior Forum Banner */}
      <div className="w-full bg-[#111] border-b border-red-500/30 text-center py-4 px-6 shadow-xl relative z-20">
        <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm md:text-base animate-pulse mb-1">
          ⚠️ For Warrior Forum Members Only!
        </h3>
        <p className="text-stone-300 text-xs md:text-sm">
          Not a WF member? <a href="https://www.warriorforum.com" target="_blank" rel="noopener" className="text-amber-500 hover:text-white underline underline-offset-4 decoration-amber-500/50 transition-colors mx-1">Join Here</a>
          -- or <Link to="/beta" className="text-[#0033a0] hover:text-white underline underline-offset-4 decoration-[#0033a0]/50 transition-colors mx-1">sign up for the pre-release special offer list</Link> and request a beta invite.
        </p>
      </div>

      {/* 🐲 SOVEREIGN COMMAND HERO - THE DRAGON'S ASCENT */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
        {/* Cinematic Dragon Backdrop */}
        <div className="absolute inset-0 bg-[url('/sovereign_dragon.png')] bg-cover bg-center opacity-60 scale-105 animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#08080f]"></div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        
        {/* Breathing Fire Glow Overlay */}
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay animate-pulse pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-block px-6 py-2 rounded-full border-2 border-amber-500/50 bg-black/60 backdrop-blur-md text-amber-500 text-xs font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
            <Flame className="inline-block w-4 h-4 mr-2 -mt-1" /> Sector Alpha // Dragon Protocol Engaged
          </div>
          
          <h1 className="serif text-7xl md:text-[10rem] font-black mb-8 leading-none tracking-tighter text-white drop-shadow-[5px_5px_0_rgba(201,168,76,0.5)] uppercase italic">
            Knights of <br/> <span className="text-amber-500 not-italic">the Round Table</span>
          </h1>
          
          <p className="max-w-4xl text-stone-200 text-xl md:text-2xl font-light mb-16 leading-relaxed bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 block">35 Years of Sovereign Architecture</span>
            Forged in the Tornado of 3s. A self-hosted citadel of logic, empathy, and technological independence. <br/>
            <span className="text-red-500 font-black uppercase tracking-[0.3em] text-xs mt-6 block animate-pulse">No one gets left behind.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-8">
            <Link 
              to="/create" 
              className="group relative px-12 py-6 bg-red-700 hover:bg-red-600 text-white rounded shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all hover:scale-105 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3 font-black uppercase tracking-[0.2em] text-lg">
                <Sword size={24} /> Claim a Chair
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <Link 
              to="/library" 
              className="group px-12 py-6 border-2 border-amber-500 text-amber-500 bg-black/40 backdrop-blur-md rounded font-black hover:bg-amber-500 hover:text-black transition-all uppercase tracking-[0.2em] text-lg flex items-center gap-3"
            >
              <Database size={24} /> Research Data
            </Link>
          </div>
        </div>
      </section>

      {/* 🛡️ CHARACTER ROSTER SECTOR */}
      <section className="py-24 px-6 bg-[#08080f] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
               <h2 className="serif text-5xl font-black text-white uppercase tracking-tighter">Sovereign <span className="text-amber-500">Roster</span></h2>
               <p className="text-stone-500 uppercase tracking-[0.3em] text-[10px] font-bold mt-4 italic">Choose your alignment. Forge your legacy.</p>
            </div>
            <Link to="/join" className="text-amber-500 text-xs font-black uppercase tracking-widest border-b border-amber-500/30 pb-1 hover:text-white transition-colors">Expand Node Capacity →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paladin Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all shadow-2xl h-[500px]">
              <div className="absolute inset-0 bg-[url('/paladin.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 w-full">
                <h4 className="serif text-3xl font-bold text-white mb-2 uppercase italic">The Paladin</h4>
                <p className="text-stone-400 text-xs uppercase tracking-widest mb-6 font-bold">Absolute Defense // Legal Shield</p>
                <div className="w-full bg-white/10 h-1 rounded-full mb-6">
                   <div className="h-full bg-amber-500 w-[95%]"></div>
                </div>
              </div>
            </div>

            {/* Rogue Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all shadow-2xl h-[500px]">
              <div className="absolute inset-0 bg-[url('/rogue.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 w-full">
                <h4 className="serif text-3xl font-bold text-white mb-2 uppercase italic">The Rogue</h4>
                <p className="text-stone-400 text-xs uppercase tracking-widest mb-6 font-bold">Tactical Evasion // Counter-Audit</p>
                <div className="w-full bg-white/10 h-1 rounded-full mb-6">
                   <div className="h-full bg-red-600 w-[88%]"></div>
                </div>
              </div>
            </div>

            {/* Wizard Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all shadow-2xl h-[500px]">
              <div className="absolute inset-0 bg-[url('/wizard.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 w-full">
                <h4 className="serif text-3xl font-bold text-white mb-2 uppercase italic">The Wizard</h4>
                <p className="text-stone-400 text-xs uppercase tracking-widest mb-6 font-bold">Logic Weaver // Machine Master</p>
                <div className="w-full bg-white/10 h-1 rounded-full mb-6">
                   <div className="h-full bg-teal-500 w-[99%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE COMMAND SUITE */}
      <section className="py-20 px-6 bg-[#0a0a1a] border-y border-amber-500/20 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left max-w-2xl">
              <h2 className="serif text-4xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter">
                Secure <span className="text-amber-500">Mobile Suite</span>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-4 italic">
                Extend your Sovereignty to any device. Our tactical mobile tools are built for off-grid resilience and encrypted data harvesting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
              <a 
                href="/downloads/KoRT_Scribe_Alpha.apk" 
                download
                className="group flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-amber-500/10 hover:border-amber-500/30 transition-all shadow-xl"
              >
                <div className="p-4 bg-amber-500/20 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                  <Zap size={32} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">KoRT Scribe</h4>
                  <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest">v1.2 Alpha // APK</p>
                </div>
              </a>

              <a 
                href="/downloads/KoRT_Browser_Knight_v2.4.zip" 
                download
                className="group flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-all shadow-xl"
              >
                <div className="p-4 bg-red-500/20 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                  <Shield size={32} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Browser Knight</h4>
                  <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest">v2.4 Alpha // ZIP</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOVEREIGN MODULE MATRIX (Restored) */}
      <ModuleMatrix />

      {/* Sector 1.5: The Crucible */}
      <section id="crucible" className="py-32 px-6 bg-[#08080f] relative overflow-hidden w-full border-t border-red-900/40">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="serif text-6xl font-black mb-8 text-white uppercase tracking-tighter">THE <span className="text-red-600">CRUCIBLE</span></h2>
                    <p className="text-stone-400 text-xl leading-relaxed mb-10">
                        KoRT was forged in a <strong>Tornado of 3s</strong>: A son's crisis, a business scam, and a car accident. We fought ICBC from the streets after losing <strong>$150,000</strong> in tools and inventory.
                    </p>
                </div>
                <div className="relative">
                    <div className="glass-vault p-12 rounded-3xl relative z-10 border-amber-500/20">
                        <div className="flex items-center gap-6 mb-10">
                           <div className="p-4 bg-red-600/20 rounded-full border border-red-600/50">
                              <Activity className="text-red-500" size={32} />
                           </div>
                           <h4 className="serif text-3xl font-black uppercase tracking-widest text-white">Logic Factory</h4>
                        </div>
                        <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">We used AI to survive the paperwork of disaster. Now, we've automated that survival for everyone else.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

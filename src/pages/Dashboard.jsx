import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sword, Cpu, Zap, Activity, Database, HeartPulse } from 'lucide-react';
import ModuleMatrix from '../components/dashboard/ModuleMatrix';

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

      {/* SOVEREIGN COMMAND Hero - CINEMATIC OVERHAUL */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[url('/sovereign_vault_hero.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#08080f]"></div>
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-block px-6 py-2 rounded-full border-2 border-amber-500/50 bg-amber-500/10 text-amber-500 text-xs font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
            Launch Sector Alpha // Sovereign Node Active
          </div>
          
          <h1 className="serif text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter text-white drop-shadow-[5px_5px_0_rgba(201,168,76,0.5)]">
            THE <span className="text-amber-500">SOVEREIGN</span> COMMAND<span className="text-amber-500">.</span>
          </h1>
          
          <p className="max-w-4xl text-stone-300 text-xl md:text-2xl font-light mb-16 leading-relaxed bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/5">
            35 years of architecture merging into a single Sovereign Stack. <br/>
            <span className="text-amber-500/80 font-bold uppercase tracking-widest text-sm mt-4 block">We are the 4th Option for 911.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-8">
            <Link 
              to="/create" 
              className="group relative px-12 py-6 bg-amber-600 hover:bg-amber-500 text-black rounded shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all hover:scale-105 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3 font-black uppercase tracking-[0.2em] text-lg">
                <Sword size={24} /> Claim a Chair
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <Link 
              to="/library" 
              className="group px-12 py-6 border-2 border-white/40 text-white rounded font-black hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] text-lg flex items-center gap-3"
            >
              <Database size={24} /> Research Data
            </Link>
          </div>
        </div>
      </section>

      {/* SOVEREIGN MODULE MATRIX (Restored) */}
      <ModuleMatrix />

      {/* Sector 1.5: The Crucible (The Storm) */}
      <section id="crucible" className="py-32 px-6 bg-[#08080f] relative overflow-hidden w-full border-t border-red-900/40">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                   <div className="inline-block px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-8">
                      Sector Omega // The Perfect Storm
                   </div>
                    <h2 className="serif text-6xl font-black mb-8 text-white uppercase tracking-tighter">THE <span className="text-red-600">CRUCIBLE</span></h2>
                    <p className="text-stone-400 text-xl leading-relaxed mb-10">
                        KoRT was forged in a <strong>Tornado of 3s</strong>: A son's crisis, a business scam, and a car accident. We fought ICBC from the streets after losing <strong>$150,000</strong> in tools and inventory.
                    </p>
                    <div className="glass-vault p-8 rounded-2xl border-l-[6px] border-red-600 shadow-[20px_0_40px_rgba(220,38,38,0.1)]">
                        <h3 className="serif text-xl text-amber-500 mb-4 font-bold uppercase tracking-widest">When the Cloud Failed</h3>
                        <p className="text-stone-300 text-base italic leading-relaxed">
                            "Anthropic shat the bed. Google shat the bed. Make.com shat the bed. When the legal deadlines hit and the internet stormed, the corporate giants went dark. So we built our own."
                        </p>
                    </div>
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
                        
                        <div className="space-y-8">
                            <div>
                               <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-stone-500 mb-3">
                                   <span>Sovereign Iron</span>
                                   <span className="text-amber-500">100% Active</span>
                               </div>
                               <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden border border-white/5">
                                   <div className="h-full bg-amber-600 w-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                               </div>
                            </div>
                            <div>
                               <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-stone-500 mb-3">
                                   <span>P2P Intranet Mesh</span>
                                   <span className="text-red-500">Crisis Ready</span>
                               </div>
                               <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden border border-white/5">
                                   <div className="h-full bg-red-600 w-3/4 border-r-2 border-white/50 animate-pulse"></div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Sector 2: The Home Cluster (The Engine) */}
      <section id="cluster" className="py-32 px-6 w-full bg-[radial-gradient(circle_at_top,_#111_0%,_#050505_100%)] border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="glass-vault p-12 rounded-3xl border-l-[6px] border-amber-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl serif uppercase font-black">Iron</div>
                    <h2 className="serif text-5xl font-black mb-12 text-amber-500 uppercase tracking-tighter">THE HOME CLUSTER</h2>
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform">
                            <div className="w-16 h-16 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black italic text-xl shadow-[0_0_15px_rgba(201,168,76,0.2)]">RoG</div>
                            <div>
                                <h4 className="text-white font-black uppercase text-lg tracking-widest">ASUS RoG Strix Server</h4>
                                <p className="text-stone-500 text-xs uppercase tracking-widest">Primary Inference Node running KoRT_OS</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform">
                            <div className="w-16 h-16 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black italic text-xl shadow-[0_0_15px_rgba(201,168,76,0.2)]">BVP</div>
                            <div>
                                <h4 className="text-white font-black uppercase text-lg tracking-widest">Bedivere Protocol</h4>
                                <p className="text-stone-500 text-xs uppercase tracking-widest">Multi-Model Orchestration & Consensus Logic</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform">
                            <div className="w-16 h-16 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black italic text-xl shadow-[0_0_15px_rgba(201,168,76,0.2)]">P2P</div>
                            <div>
                                <h4 className="text-white font-black uppercase text-lg tracking-widest">Crisis Mesh Ready</h4>
                                <p className="text-stone-500 text-xs uppercase tracking-widest">Off-grid intelligence for real-world support</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="serif text-4xl font-black mb-8 uppercase tracking-tighter text-white">Sovereignty <br/><span className="text-amber-500">on Iron.</span></h3>
                    <p className="text-stone-400 text-xl leading-relaxed mb-12 font-light">
                        We don't just lease intelligence; we own it. Our cluster runs multiple LLMs simultaneously, deliberating in a "Think Tank" environment to provide the most logical, empathetic, and tactical responses possible.
                    </p>
                    
                    <div className="p-8 glass-vault rounded-2xl border-amber-500/30">
                        <div className="flex items-center gap-3 mb-8">
                           <Activity size={16} className="text-amber-500 animate-pulse" />
                           <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Current Node Status</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">100%</div>
                                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-widest mt-3">Uptime</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white">Local</div>
                                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-widest mt-3">Inference</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]">IDIC</div>
                                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-widest mt-3">Logic</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Partner Matrix */}
      <section id="ecosystem" className="py-32 px-6 bg-[#050505] w-full mb-0">
        <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="serif text-5xl font-black mb-6 text-white uppercase tracking-tighter">THE <span className="text-amber-500">PARTNER</span> MATRIX</h2>
            <p className="text-stone-500 text-xl font-light uppercase tracking-widest">Technological Alignment Strategy // v2.4</p>
        </div>
        
        <div className="max-w-5xl mx-auto glass-vault rounded-3xl overflow-hidden border-2 border-amber-500/20 shadow-2xl">
            <table className="w-full text-left text-sm">
                <thead className="bg-amber-600 text-black uppercase text-xs font-black tracking-[0.3em]">
                    <tr>
                        <th className="p-6">Partner</th>
                        <th className="p-6">Role</th>
                        <th className="p-6">Tactical Analysis</th>
                        <th className="p-6">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-300">
                    <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 font-black text-lg">Lovable.dev</td>
                        <td className="p-6 uppercase text-xs text-amber-500 font-bold tracking-widest">UI Engine</td>
                        <td className="p-6 text-stone-400 font-light">Generating the high-fidelity RPG Member Onboarding.</td>
                        <td className="p-6"><span className="text-blue-500 font-black uppercase text-[10px] tracking-widest bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded">Merged</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 font-black text-lg">Base44</td>
                        <td className="p-6 uppercase text-xs text-amber-500 font-bold tracking-widest">Logic Core</td>
                        <td className="p-6 text-stone-400 font-light">Managing 50k+ cluster integrations and P2P routing.</td>
                        <td className="p-6"><span className="text-amber-500 font-black uppercase text-[10px] tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded">Scaling</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-6 font-black text-lg">Anthropic</td>
                        <td className="p-6 uppercase text-xs text-amber-500 font-bold tracking-widest">Ethics LLM</td>
                        <td className="p-6 text-stone-400 font-light">Providing the Sovereign Logic reasoning and ethical constraints.</td>
                        <td className="p-6"><span className="text-green-500 font-black uppercase text-[10px] tracking-widest bg-green-500/10 border border-green-500/30 px-3 py-1 rounded">Active</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}

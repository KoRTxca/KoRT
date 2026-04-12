import React from 'react'
import { CircleDollarSign, TrendingUp, ShieldCheck, HeartPulse, CreditCard, PieChart, Info } from 'lucide-react'

export default function DigitalDollars() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in flex flex-col gap-12">
       
       {/* Economic Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <CircleDollarSign size={12} /> Economic Sovereign Node
             </div>
             <h1 className="serif text-5xl font-black text-white uppercase tracking-tighter">DIGITAL <span className="text-amber-500">DOLLARS</span></h1>
             <p className="text-stone-400 text-lg font-light mt-2 max-w-2xl">
                The $5,000/month UBI survival roadmap. A curated ecosystem of earning stacks designed to fund your sovereignty and ensure no one gets left behind.
             </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4">
             <HeartPulse className="text-amber-500" size={32} />
             <div>
                <span className="block text-[10px] uppercase font-bold text-stone-500 tracking-widest">Target Velocity</span>
                <span className="text-xl font-bold text-white">$60,000 / ANNUM</span>
             </div>
          </div>
       </div>

       {/* Revenue Matrix */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-vault p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
             <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl w-fit mb-6">
                <TrendingUp className="text-green-500" size={24} />
             </div>
             <h3 className="serif text-2xl font-bold text-white mb-2 uppercase">60/40 Split</h3>
             <p className="text-sm text-stone-500 leading-relaxed mb-6 font-light">60% to your direct wallet, 40% to the Sovereign Mesh network to fund community defense and P2P infrastructure.</p>
             <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest bg-green-500/5 px-3 py-1 rounded inline-block">Active Protocol</div>
          </div>

          <div className="glass-vault p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
             <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl w-fit mb-6">
                <ShieldCheck className="text-blue-500" size={24} />
             </div>
             <h3 className="serif text-2xl font-bold text-white mb-2 uppercase">Survivor Vault</h3>
             <p className="text-sm text-stone-500 leading-relaxed mb-6 font-light">Emergency bridge funding for verified Knights. Peer-reviewed distribution based on crisis severity and node health.</p>
             <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded inline-block">Tier 2 Access Only</div>
          </div>

          <div className="glass-vault p-8 rounded-3xl border border-white/5 relative overflow-hidden group bg-gradient-to-br from-amber-500/10 to-transparent">
             <div className="p-4 bg-amber-500/20 border border-amber-500/30 rounded-2xl w-fit mb-6">
                <PieChart className="text-amber-500" size={24} />
             </div>
             <h3 className="serif text-2xl font-bold text-white mb-2 uppercase">UBI Roadmap</h3>
             <p className="text-sm text-stone-300 leading-relaxed mb-6 font-light">Join our Founding Founding Node. Access the 12-week roadmap to independent earning through Sovereign Assets.</p>
             <button className="w-full py-4 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] rounded hover:bg-amber-400 transition-colors shadow-2xl shadow-amber-500/20">Forge Economic Node</button>
          </div>
       </div>

       {/* FAQ / Info Component */}
       <div className="bg-[#050510] border border-white/5 p-8 rounded-3xl flex items-start gap-6">
          <Info className="text-stone-600 shrink-0 mt-1" size={24} />
          <div>
             <h4 className="serif text-lg font-bold text-white mb-2 uppercase tracking-widest">Why 40% to the Mesh?</h4>
             <p className="text-sm text-stone-500 leading-relaxed max-w-4xl font-light">
                Autonomy isn't solitary. A node is only as safe as its network. Your 40% contribution funds the development of the Herald (Legal Defense), the Watch (Emergency Mesh), and the Merlin Node (Intelligence). We don't take a cut—you fund your brothers.
             </p>
          </div>
       </div>

    </div>
  );
}

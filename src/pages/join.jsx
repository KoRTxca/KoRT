import React from 'react'
import { Shield, Check, Star, Zap, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Join() {
  const tiers = [
    {
      name: "Prospect",
      price: "$1.79",
      type: "Entry Node",
      desc: "Activate your digital existence. Basic mesh presence and vault awareness.",
      features: ["Verified Identity", "Mesh Connectivity", "Basic Scribe Access", "KoRT Badge"],
      accent: "stone"
    },
    {
      name: "Page",
      price: "$5 / MO",
      type: "Initiate",
      desc: "Join the conversation. Full access to community channels and the legal library.",
      features: ["Universal Library Access", "Community Voting", "Support Node Access", "Basic Merlin Logic"],
      accent: "teal"
    },
    {
       name: "Esquire",
       price: "$15 / MO",
       type: "Advocate",
       desc: "Precision tools for the professional. Advanced data harvesting and case management.",
       features: ["Scribe Engine Pro", "Advocate Templates", "Digital Dollars Roadmap", "Case Triage Support"],
       accent: "blue"
    },
    {
       name: "Knight",
       price: "$50 / MO",
       type: "Sovereign",
       desc: "The professional's edge. Full command center access and dedicated crisis response.",
       features: ["70B Logic Access", "Priority Case Assistant", "Digital Dollars Pro", "Venture Equity"],
       featured: true,
       accent: "amber"
    },
    {
       name: "Round Table",
       price: "$150 / MO",
       type: "Master Node",
       desc: "A seat at the table. Direct influence over system architecture and treasury allocation.",
       features: ["Mastermind Access", "Private Node Identity", "Full Archive Export", "Direct Founder Access"],
       accent: "purple"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in flex flex-col items-center">
       
       <div className="text-center mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
             <Star size={12} className="animate-pulse" /> Limited Seats Open
          </div>
          <h1 className="serif text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">CHOOSE YOUR <span className="text-amber-500">SEAT</span></h1>
          <p className="text-stone-400 text-xl font-light leading-relaxed font-sans">
             Sovereignty is a choice. Every seat strengthens the Round Table and ensures that no one gets left behind in the digital transition.
          </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {tiers.map((tier, i) => (
             <div key={i} className={`glass-vault p-8 rounded-3xl border transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full ${
               tier.featured ? 'border-amber-500/40 bg-amber-500/5 shadow-[0_0_30px_rgba(201,168,76,0.1)]' : 'border-white/5 bg-[#050510]'
             }`}>
                {tier.featured && (
                   <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Core Choice</div>
                )}
                
                <h3 className="serif text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{tier.type}</h3>
                <h2 className="serif text-2xl font-black text-white uppercase tracking-tighter mb-4">{tier.name}</h2>
                <div className="text-xl font-mono text-white mb-6 border-b border-white/5 pb-6">{tier.price}</div>
                
                <p className="text-stone-400 text-[11px] mb-8 leading-relaxed font-light flex-grow">{tier.desc}</p>
                
                <ul className="space-y-4 mb-10">
                   {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                         <Check className={`shrink-0 mt-0.5 ${tier.featured ? 'text-amber-500' : 'text-teal-500'}`} size={14} />
                         <span className="text-stone-300 text-[9px] font-bold uppercase tracking-widest leading-tight">{f}</span>
                      </li>
                   ))}
                </ul>

                <Link 
                   to="/create"
                   className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[9px] text-center transition-all ${
                     tier.featured 
                       ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-xl shadow-amber-500/20' 
                       : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                   }`}
                >
                   Secure My Seat
                </Link>
             </div>
          ))}
       </div>

       <p className="mt-20 text-stone-600 text-[9px] uppercase tracking-[0.4em] font-bold">Node Identity Verification Required Post-Selection</p>
    </div>
  );
}

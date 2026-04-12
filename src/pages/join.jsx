import React from 'react'
import { Shield, Check, Star, Zap, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Join() {
  const tiers = [
    {
      name: "Sovereign Knight",
      price: "$0",
      type: "Founding Member",
      desc: "Earn your way in by contributing to the Mesh. Build the future, own the nodes.",
      features: ["Full Command Center Access", "P2P Tactical Defense", "Basic Merlin Logic", "Sovereign Badge"],
      accent: "teal"
    },
    {
       name: "Founding Forge",
       price: "$49 / MO",
       type: "Master Node",
       desc: "The professional's edge. Advanced LLM parameters and dedicated crisis response support.",
       features: ["70B Logic Access", "Priority Case Assistant", "Digital Dollars Roadmap", "Voting Rights"],
       featured: true,
       accent: "amber"
    },
    {
       name: "Round Table One",
       price: "$999",
       type: "Lifetime Protocol",
       desc: "A seat at the table. Lifetime access to all future Sovereign assets and blueprints.",
       features: ["Lifetime Membership", "Private Node Identity", "Full Archive Export", "Venture Equity"],
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
             Sovereignty is a choice. Whether you earn your node through contribution or forge it through investment, the Round Table welcomes those who seek true digital independence.
          </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {tiers.map((tier, i) => (
             <div key={i} className={`glass-vault p-10 rounded-3xl border transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full ${
               tier.featured ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/5 bg-[#050510]'
             }`}>
                {tier.featured && (
                   <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Most Practical</div>
                )}
                
                <h3 className="serif text-sm font-bold text-stone-500 uppercase tracking-widest mb-2">{tier.type}</h3>
                <h2 className="serif text-4xl font-black text-white uppercase tracking-tighter mb-4">{tier.name}</h2>
                <div className="text-3xl font-mono text-white mb-8 border-b border-white/5 pb-8">{tier.price}</div>
                
                <p className="text-stone-400 text-sm mb-8 leading-relaxed font-light">{tier.desc}</p>
                
                <ul className="space-y-4 mb-12 flex-grow">
                   {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                         <Check className={`shrink-0 mt-0.5 ${tier.featured ? 'text-amber-500' : 'text-teal-500'}`} size={16} />
                         <span className="text-stone-300 text-xs font-bold uppercase tracking-widest">{f}</span>
                      </li>
                   ))}
                </ul>

                <Link 
                   to="/create"
                   className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-[11px] text-center transition-all ${
                     tier.featured 
                       ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-xl shadow-amber-500/20' 
                       : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                   }`}
                >
                   {tier.price === "$0" ? "Earn Free Access" : "Secure My Seat"}
                </Link>
             </div>
          ))}
       </div>

       <p className="mt-20 text-stone-600 text-xs uppercase tracking-[0.4em] font-bold">Node Identity Verification Required Post-Selection</p>
    </div>
  );
}

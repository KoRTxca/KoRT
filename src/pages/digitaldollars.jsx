import React from 'react'
import { 
  CircleDollarSign, TrendingUp, ShieldCheck, HeartPulse, 
  CreditCard, PieChart, Info, CheckCircle2, ArrowRight,
  Landmark, ShoppingCart, Smartphone, Globe, Zap, Shield, AlertTriangle
} from 'lucide-react'

/**
 * 💰 DIGITAL DOLLARS — THE TREASURY
 * v3.1.0 | Operation OMEGA Restoration
 * 
 * CORE LOGIC: THE 60/40 SPLIT
 * - 60% stays with the member (Digital Survival)
 * - 40% goes to the Community Pool (Economic Stability)
 * - The Pool redistributes to all active members based on velocity.
 */

export default function DigitalDollars() {
  const referralLinks = {
    koho: "#kort-koho",
    tangerine: "#kort-tangerine",
    neo: "#kort-neo",
    simplii: "#kort-simplii",
    wealthsimple: "#kort-wealthsimple",
    eq: "#kort-eq",
    rakuten: "#kort-rakuten",
    swagbucks: "#kort-swagbucks",
    nielsen: "https://www.nielsen.com/digital-panel/",
    microsoft: "https://rewards.microsoft.com"
  };

  const quickStackSteps = [
    { 
      num: 1, 
      name: "KOHO — Free prepaid Mastercard", 
      detail: "Sign up, make one $20 purchase, get $20-$40 bonus instantly. Takes 10 minutes.", 
      icon: <CreditCard className="text-amber-500" /> 
    },
    { 
      num: 2, 
      name: "Rakuten Canada — Cashback on everything", 
      detail: "Sign up, make any $30 purchase you'd make anyway, get $30 bonus. Use for your next online order.", 
      icon: <ShoppingCart className="text-amber-500" /> 
    },
    { 
      num: 3, 
      name: "Swagbucks — Surveys + shopping cashback", 
      detail: "Sign up, do 3-4 quick surveys, earn your first $5 within an hour. Passive 10% for KoRT forever.", 
      icon: <Smartphone className="text-amber-500" /> 
    },
    { 
      num: 4, 
      name: "Nielsen — Background passive earning", 
      detail: "Install and forget. Earns ~$50/year per device just for running in the background.", 
      icon: <Globe className="text-amber-500" /> 
    },
    { 
      num: 5, 
      name: "Microsoft Rewards — Search & earn", 
      detail: "Switch default search to Bing. Earn points on every search. Redeem for gift cards. Zero effort.", 
      icon: <Zap className="text-amber-500" /> 
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in flex flex-col gap-16 font-sans bg-[#08080f] text-[#e8e8e8]">
       
       {/* HERO SECTION */}
       <div className="text-center py-12 bg-gradient-to-b from-amber-500/5 to-transparent rounded-[3rem]">
          <div className="text-6xl mb-6 filter drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]">💰</div>
          <h1 className="serif text-5xl md:text-7xl font-bold text-[#c9a84c] uppercase tracking-widest mb-4 italic">Digital Dollars</h1>
          <p className="text-[#9090a0] text-xl max-w-2xl mx-auto italic">
            Earn real money. Fund your community. Every dollar you make through our curated stack strengthens the Round Table.
          </p>
       </div>

       {/* THE SPLIT EXPLAINER */}
       <div className="max-w-3xl mx-auto w-full bg-[#0a0a1a] border border-[#c9a84c]/20 p-10 rounded-3xl text-center shadow-2xl shadow-amber-500/5">
          <h3 className="serif text-lg font-bold text-[#c9a84c] uppercase tracking-[0.3em] mb-8">How The Protocol Works</h3>
          
          <div className="flex h-12 rounded-xl overflow-hidden border border-white/10 mb-8 font-bold uppercase tracking-widest text-[10px]">
             <div className="w-[60%] bg-gradient-to-r from-[#c9a84c] to-[#e8d5a3] flex items-center justify-center text-[#08080f]">60% — YOU</div>
             <div className="w-[40%] bg-[#1a3a2a] flex items-center justify-center text-[#c9a84c] border-l border-white/5 uppercase">40% — COMMUNITY POOL</div>
          </div>
          
          <p className="text-[#9090a0] text-lg leading-relaxed">
            We earn <strong className="text-white">$10</strong>. You keep <strong className="text-[#c9a84c]">$6</strong>. The other <strong className="text-[#c9a84c]">$4</strong> goes into the <strong className="text-white">Community Pool</strong> — which pays <strong className="text-white italic">you back</strong> based on everyone else's activity.
          </p>
       </div>

       {/* QUICK STACK SECTION */}
       <div className="bg-gradient-to-br from-[#c9a84c]/10 to-[#0a0a1a] border border-[#c9a84c]/20 p-12 rounded-[2rem] relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                <h3 className="serif text-2xl font-bold text-[#c9a84c] uppercase tracking-tighter mb-4 italic flex items-center gap-3">
                   <Zap className="text-amber-500 animate-pulse" /> The Quick Stack
                </h3>
                <p className="text-[#9090a0] text-sm leading-relaxed mb-8 italic">
                   Follow this exact sequence. Most members hit <span className="text-white">$50+ in referral bonuses</span> within 48 hours. No monthly fees, real survival money.
                </p>
                
                <div className="bg-[#1a3a2a]/30 border border-[#4da868]/20 p-6 rounded-2xl">
                   <h4 className="text-[10px] font-bold text-[#4da868] uppercase tracking-widest mb-3 flex items-center gap-2">
                     <PieChart size={12} /> How Compound Earning Works
                   </h4>
                   <p className="text-[11px] text-[#9090a0] leading-relaxed italic">
                     "When 50 members do the Quick Stack, <span className="text-white font-bold">$1,000 enters the pool</span>. That's how we fund Peer Advocacy and the Mobile Node Mesh. Stability through scale."
                   </p>
                </div>
             </div>
             
             <div className="md:w-2/3 space-y-3">
                {quickStackSteps.map((step) => (
                   <div key={step.num} className="flex items-center gap-6 p-6 hover:bg-white/5 rounded-2xl transition-all border border-white/5 bg-[#08080f]/50">
                      <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#08080f] font-bold text-sm shrink-0">{step.num}</div>
                      <div className="flex-grow">
                         <div className="text-white font-bold uppercase tracking-widest text-xs mb-1">{step.name}</div>
                         <p className="text-[#9090a0] text-xs leading-relaxed italic">{step.detail}</p>
                      </div>
                      <ArrowRight className="text-stone-700" size={16} />
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* BANK REFERRAL MATRIX */}
       <div>
          <div className="flex items-baseline gap-4 mb-10 border-b border-white/10 pb-6">
             <h2 className="serif text-3xl font-bold text-white uppercase tracking-tighter">BANK <span className="text-[#c9a84c]">REFERRAL</span> STACK</h2>
             <span className="text-[10px] font-bold text-[#9090a0] uppercase tracking-[0.4em]">Region: Canada // High-Velocity Payouts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* KOHO Card */}
             <div className="bg-[#0a0a1a] p-8 rounded-3xl border border-white/5 hover:border-[#c9a84c]/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#08080f] transition-all">
                      <Landmark size={28} />
                   </div>
                   <div className="text-right">
                      <span className="block text-[10px] text-[#4da868] font-bold uppercase tracking-widest bg-[#4da868]/10 px-3 py-1 rounded-full border border-[#4da868]/20">$20-$40 BONUS</span>
                   </div>
                </div>
                <h3 className="serif text-xl font-bold text-white uppercase tracking-widest mb-2">KOHO</h3>
                <p className="text-[#9090a0] text-sm leading-relaxed mb-8 italic">Free prepaid Mastercard + credit building. Sign up, spend $20, and unlock your survival bonus instantly.</p>
                <a href={referralLinks.koho} className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[9px] rounded-xl hover:bg-[#c9a84c] hover:text-[#08080f] transition-all">Sign Up via KoRT →</a>
             </div>

             {/* Tangerine Card */}
             <div className="bg-[#0a0a1a] p-8 rounded-3xl border border-white/5 hover:border-[#c9a84c]/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#08080f] transition-all">
                      <Landmark size={28} />
                   </div>
                   <div className="text-right">
                      <span className="block text-[10px] text-[#4da868] font-bold uppercase tracking-widest bg-[#4da868]/10 px-3 py-1 rounded-full border border-[#4da868]/20">$50-$100 BONUS</span>
                   </div>
                </div>
                <h3 className="serif text-xl font-bold text-white uppercase tracking-widest mb-2">Tangerine</h3>
                <p className="text-[#9090a0] text-sm leading-relaxed mb-8 italic">No-fee online banking by Scotiabank. Setting up a direct deposit earns you $100 and helps KoRT scale.</p>
                <a href={referralLinks.tangerine} className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[9px] rounded-xl hover:bg-[#c9a84c] hover:text-[#08080f] transition-all">Sign Up via KoRT →</a>
             </div>

             {/* Simplii Card */}
             <div className="bg-[#0a0a1a] p-8 rounded-3xl border border-white/5 hover:border-[#c9a84c]/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#08080f] transition-all">
                      <Landmark size={28} />
                   </div>
                   <div className="text-right">
                      <span className="block text-[10px] text-[#4da868] font-bold uppercase tracking-widest bg-[#4da868]/10 px-3 py-1 rounded-full border border-[#4da868]/20">$50 BONUS</span>
                   </div>
                </div>
                <h3 className="serif text-xl font-bold text-white uppercase tracking-widest mb-2">Simplii Financial</h3>
                <p className="text-[#9090a0] text-sm leading-relaxed mb-8 italic">CIBC backed no-fee banking. Use any CIBC ATM for free. Solid everyday banking for Sovereign members.</p>
                <a href={referralLinks.simplii} className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[9px] rounded-xl hover:bg-[#c9a84c] hover:text-[#08080f] transition-all">Sign Up via KoRT →</a>
             </div>
          </div>
       </div>

       {/* THE ROADMAP */}
       <div className="bg-[#050510] border border-white/5 p-12 rounded-[3rem] relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
             <h2 className="serif text-3xl font-bold text-white uppercase tracking-tighter italic">Sovereign <span className="text-amber-500">Survival</span> Roadmap</h2>
             <span className="text-[10px] font-bold text-[#9090a0] uppercase tracking-[0.4em]">Outcome: $5,000 / month Freedom Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
             <div className="space-y-4">
                <div className="serif text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">TIER 1: SURVIVAL</div>
                <div className="text-4xl font-bold text-[#c9a84c]">$500 / MO</div>
                <p className="text-[#9090a0] text-sm italic">The "Quick Stack" outcome. Initial 5-10 apps (KOHO, Nielsen, Swagbucks) to cover data, transit, and basics.</p>
             </div>
             <div className="space-y-4">
                <div className="serif text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">TIER 2: STABILITY</div>
                <div className="text-4xl font-bold text-[#c9a84c]">$1,500 / MO</div>
                <p className="text-[#9090a0] text-sm italic">Bank Referral looping + Community Pool dividends. Requires active participation of 50+ members.</p>
             </div>
             <div className="space-y-4 opacity-50">
                <div className="serif text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">TIER 3: SOVEREIGNTY</div>
                <div className="text-4xl font-bold text-[#c9a84c]">$5,000 / MO</div>
                <p className="text-[#9090a0] text-sm italic">Unified Mesh rewards + Affiliate Revenue Engine. Automated by the Agent Council (Bedivere/Merlin).</p>
             </div>
          </div>
       </div>

       {/* THE FINE PRINT */}
       <div className="bg-[#0a0a1a] border border-[#c9a84c]/20 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10">
          <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl shrink-0">
             <Shield className="text-[#c9a84c]" size={32} />
          </div>
          <div>
             <h4 className="serif text-xl font-bold text-white mb-2 uppercase tracking-widest italic tracking-tighter">The Sovereign Contribution</h4>
             <p className="text-sm text-[#9090a0] leading-relaxed italic">
                Why 40% to the Pool? Autonomy isn't solitary. Your contribution funds the developer nodes building the <span className="text-white font-bold italic">Herald</span>, the <span className="text-white font-bold italic">Mesh</span>, and our custom AI nodes. We don't take a cut — you fund your brothers. No one gets left behind.
             </p>
          </div>
       </div>

       <footer className="text-center text-[10px] text-stone-600 uppercase font-bold tracking-[0.5em] mt-20">
          Knights of the Round Table — KoRTx.ca // Treasury Protocol v3.1.0
       </footer>
    </div>
  );
}

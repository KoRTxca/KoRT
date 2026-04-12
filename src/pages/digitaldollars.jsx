import React from 'react'
import { 
  CircleDollarSign, TrendingUp, ShieldCheck, HeartPulse, 
  CreditCard, PieChart, Info, CheckCircle2, ArrowRight,
  Landmark, ShoppingCart, Smartphone, Globe, Zap
} from 'lucide-react'

export default function DigitalDollars() {
  const referralLinks = {
    koho: "#kort-koho",
    tangerine: "#kort-tangerine",
    neo: "#kort-neo",
    simplii: "#kort-simplii",
    wealthsimple: "#kort-wealthsimple",
    eq: "#kort-eq",
    rakuten: "#kort-rakuten",
    swagbucks: "#kort-swagbucks"
  };

  const stackSteps = [
    { title: "KOHO", detail: "Free prepaid Mastercard. Spend $20, get $20-$40 bonus instantly.", icon: <CreditCard size={16} /> },
    { title: "Rakuten Canada", detail: "Sign up, spend $30 on any online order, get $30 bonus.", icon: <ShoppingCart size={16} /> },
    { title: "Swagbucks", detail: "Surveys + shopping. KoRT earns a 10% lifetime match on your activity.", icon: <Smartphone size={16} /> },
    { title: "Nielsen", detail: "Background passive earning (~$50/yr). Install and forget.", icon: <Globe size={16} /> },
    { title: "Microsoft Rewards", detail: "Search via Bing. Zero effort, redeem for gift cards.", icon: <Zap size={16} /> }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in flex flex-col gap-16 font-sans">
       
       {/* Economic Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/10 pb-12">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <CircleDollarSign size={12} /> THE TREASURY // v2.1.0
             </div>
             <h1 className="serif text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">DIGITAL <span className="text-amber-500 underline decoration-amber-500/20 underline-offset-8">DOLLARS</span></h1>
             <p className="text-stone-400 text-xl font-light mt-6 max-w-3xl leading-relaxed">
                Earn real money. Fund your community. Every dollar you make through our curated stack strengthens the Round Table. No one gets left behind.
             </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex items-center gap-6 shadow-2xl shadow-amber-500/5">
             <HeartPulse className="text-amber-500 animate-pulse" size={40} />
             <div>
                <span className="block text-[10px] uppercase font-black text-stone-500 tracking-[0.3em]">Survivor Velocity</span>
                <span className="text-2xl font-black text-white">$60,000 / ANNUM</span>
             </div>
          </div>
       </div>

       {/* The Recursive Split */}
       <div className="max-w-4xl mx-auto w-full glass-vault p-10 rounded-3xl border border-amber-500/20 bg-amber-500/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          <h3 className="serif text-xs font-black text-amber-500 uppercase tracking-[0.5em] mb-8">How The Protocol Works</h3>
          
          <div className="flex h-16 rounded-xl overflow-hidden border border-white/10 mb-8 font-black uppercase tracking-widest text-xs">
             <div className="w-[60%] bg-gradient-to-r from-amber-600 to-amber-400 flex items-center justify-center text-black">60% — YOU</div>
             <div className="w-[40%] bg-[#0a2a1a] flex items-center justify-center text-amber-500/80 border-l border-white/5">40% — ROUND TABLE</div>
          </div>
          
          <p className="text-stone-300 text-lg font-light leading-relaxed max-w-2xl mx-auto">
             We earn <strong className="text-white">$10</strong>. You keep <strong className="text-amber-500">$6</strong>. The other <strong className="text-amber-500">$4</strong> goes into the Community Pool — which pays <strong className="text-white italic">you back</strong> based on everyone else's activity.
          </p>
       </div>

       {/* Quick Stack Checklist */}
       <div className="bg-[#050510] border border-white/5 p-12 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full group-hover:bg-amber-500/10 transition-all duration-700"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                <h3 className="serif text-2xl font-black text-white uppercase tracking-tighter mb-4 italic flex items-center gap-3">
                   <TrendingUp className="text-green-500" /> The Quick Stack
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8">
                   Follow this exact sequence. Most members hit <span className="text-white">$50 in referral bonuses</span> within 48 hours. Zero risk, pure velocity.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                   <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">Compound Logic</h4>
                   <p className="text-[11px] text-stone-400 leading-relaxed italic">"When 50 members do the Quick Stack, $1,000 enters the pool. That's how we fund Peer Advocacy and the Defense Mesh."</p>
                </div>
             </div>
             
             <div className="md:w-2/3 space-y-2">
                {stackSteps.map((step, i) => (
                   <div key={i} className="flex items-center gap-6 p-5 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 bg-[#0a0a0f]">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-black text-sm shrink-0 shadow-xl shadow-amber-500/20">{i+1}</div>
                      <div className="flex-grow">
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-white font-black uppercase tracking-widest text-xs">{step.title}</span>
                            <div className="h-px bg-white/10 flex-grow"></div>
                         </div>
                         <p className="text-stone-400 text-[11px] font-light uppercase tracking-wider">{step.detail}</p>
                      </div>
                      <ArrowRight className="text-stone-700" size={16} />
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Referral Matrix */}
       <div>
          <div className="flex items-baseline gap-4 mb-10 border-b border-white/10 pb-6">
             <h2 className="serif text-3xl font-black text-white uppercase tracking-tighter">BANK <span className="text-amber-500">REFERRAL</span> MATRIX</h2>
             <span className="text-[10px] font-bold text-stone-600 uppercase tracking-[0.4em]">Region: Canada // Tier 1 Payouts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* KOHO Card */}
             <div className="glass-vault p-8 rounded-3xl border border-white/5 bg-[#08080f] hover:-translate-y-2 transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <Landmark size={28} />
                   </div>
                   <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">$20 - $40 BONUS</span>
                </div>
                <h3 className="serif text-xl font-black text-white uppercase tracking-widest mb-2">KOHO</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-8 flex-grow">Free prepaid Mastercard + credit building. Sign up and spend $20 to unlock your bonus.</p>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> No Monthly Fees
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> Credit Building Available
                   </div>
                </div>
                <a href={referralLinks.koho} id="cta-koho" className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all">Connect via KoRT →</a>
             </div>

             {/* Tangerine Card */}
             <div className="glass-vault p-8 rounded-3xl border border-white/5 bg-[#08080f] hover:-translate-y-2 transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <Landmark size={28} />
                   </div>
                   <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">$50 BONUS</span>
                </div>
                <h3 className="serif text-xl font-black text-white uppercase tracking-widest mb-2">Tangerine</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-8 flex-grow">Scotiabank's no-fee online arm. High-interest rates and robust mobile banking.</p>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> Scotiabank ATM Access
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> Unlimited Transactions
                   </div>
                </div>
                <a href={referralLinks.tangerine} id="cta-tangerine" className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all">Connect via KoRT →</a>
             </div>

             {/* Wealthsimple Card */}
             <div className="glass-vault p-8 rounded-3xl border border-white/5 bg-[#08080f] hover:-translate-y-2 transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <TrendingUp size={28} />
                   </div>
                   <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">$25 BONUS</span>
                </div>
                <h3 className="serif text-xl font-black text-white uppercase tracking-widest mb-2">Wealthsimple</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-8 flex-grow">The gold standard for Canadian investing. Commissions-free and crystal clear interface.</p>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> Auto-Invest Logic
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-amber-500" /> Crypto & Cash Card
                   </div>
                </div>
                <a href={referralLinks.wealthsimple} id="cta-wealthsimple" className="block w-full py-4 text-center bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all">Connect via KoRT →</a>
             </div>
          </div>
       </div>

       {/* FAQ / Mesh Info */}
       <div className="bg-[#0a0a1a] border border-amber-500/20 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-blue-500/5">
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl shrink-0">
             <Info className="text-blue-500" size={32} />
          </div>
          <div className="text-center md:text-left">
             <h4 className="serif text-xl font-black text-white mb-2 uppercase tracking-widest italic">The Sovereign Contribution</h4>
             <p className="text-sm text-stone-400 leading-relaxed font-light">
                Why 40% to the Mesh? Autonomy isn't solitary. Your contribution funds the developer nodes building the <span className="text-white font-bold italic">Herald</span>, the <span className="text-white font-bold italic">Watch</span>, and the <span className="text-white font-bold italic">Merlin Intelligence</span> layers. We don't take a cut—you fund your brothers in the Round Table.
             </p>
          </div>
       </div>

    </div>
  );
}

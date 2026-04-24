import React from 'react';
import { 
  CircleDollarSign, TrendingUp, ShieldCheck, HeartPulse, 
  CreditCard, PieChart, Info, CheckCircle2, ArrowRight,
  Landmark, ShoppingCart, Smartphone, Globe, Zap, Shield, AlertTriangle,
  Play, Video, Cpu, Combine, Network, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * 💰 DIGITAL DOLLARS — THE SOVEREIGN ECOSYSTEM HUB
 * v4.0.0 | Operation OMEGA Exhaustive Integration
 */

export default function DigitalDollars() {
  const referralLinks = {
    koho: "https://referral.koho.ca/mzIA8a5",
    mistplay: "https://mistplay.onelink.me/ZGRQ/2jh95s8y",
    bestplay: "https://bestplay.onelink.me/IZ8a/6n85wno3",
    cashkarma: "https://cashkar.ma/Q2wiZO3qN0b",
    gemsloot: "https://gemsloot.com/?aff=kort",
    tango: "https://tango.onelink.me/RCIH/igsme4lt",
    attapoll: "https://attapoll.app/join/xdmdn",
    surveyspin: "https://surveyspin.com/code/C66GQI",
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
    { num: 1, name: "KOHO — Free Mastercard", detail: "Sign up, spend $20, get $20-$40 instantly.", icon: <CreditCard className="text-amber-500" /> },
    { num: 2, name: "Rakuten — Cashback", detail: "Buy what you already need, get $30 bonus.", icon: <ShoppingCart className="text-amber-500" /> },
    { num: 3, name: "Swagbucks — Surveys", detail: "Earn your first $5 within an hour. Passive 10% for KoRT.", icon: <Smartphone className="text-amber-500" /> },
    { num: 4, name: "Nielsen — Passive", detail: "Earns ~$50/year just for running in the background.", icon: <Globe className="text-amber-500" /> },
    { num: 5, name: "Microsoft Rewards", detail: "Search & earn points on every search.", icon: <Zap className="text-amber-500" /> }
  ];

  return (
    <div className="w-full bg-[#050505] min-h-screen text-[#e8e8e8] overflow-x-hidden font-sans">
      
      {/* 1. CINEMATIC HERO GATE */}
      <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden border-b-[3px] border-amber-500/30">
         <div className="absolute inset-0 bg-[url('/sovereign_vault_hero.png')] bg-cover bg-top opacity-40 scale-105 animate-[pulse_15s_ease-in-out_infinite]" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
         
         <div className="relative z-10 max-w-6xl px-6 flex flex-col items-center">
            <div className="animate-bounce mb-8 p-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full shadow-[0_0_50px_rgba(201,168,76,0.6)]">
               <img src="/kort_dragon_crest.jpg" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black object-cover" alt="Sovereign Crest" />
            </div>
            
            <h1 className="serif text-5xl md:text-[7rem] font-black uppercase text-white tracking-tighter leading-[0.9] drop-shadow-[0_10px_20px_rgba(0,0,0,1)] mix-blend-screen italic mb-6">
              The <span className="text-amber-500">Treasury</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-stone-300 font-light max-w-4xl leading-relaxed bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
              <span className="block text-amber-500 font-black tracking-[0.4em] text-[10px] md:text-xs uppercase mb-4 not-italic">Universal Basic Income — The Survival Protocol</span>
              We do not beg the State. We do not starve. We weaponize affiliate routing, data dividends, and peer networks to fund Sovereign independence. <br/>
              <span className="text-white font-bold block mt-6">Outcome: The $5,000 / Month Freedom Engine.</span>
            </p>
         </div>
         
         {/* Animated Fire overlay */}
         <div className="absolute inset-0 bg-amber-600/10 mix-blend-color-dodge animate-[fireBreath_3s_infinite] pointer-events-none" />
         <style dangerouslySetInnerHTML={{__html: `
            @keyframes fireBreath { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
         `}} />
      </section>

      {/* 2. THE PHILOSOPHY & ECOSYSTEM */}
      <section className="w-full py-32 px-6 bg-[#0a0a1a] relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* V-Text / Rich Typography */}
            <div className="space-y-10">
               <div>
                  <h2 className="serif text-sm text-green-500 font-black uppercase tracking-[0.5em] mb-4 flex items-center gap-4">
                     <TrendingUp /> Star Trek IDIC Meets Camelot
                  </h2>
                  <h3 className="serif text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
                     Funding The <span className="text-amber-500">Autonomous</span> Fleet
                  </h3>
               </div>
               
               <div className="prose prose-invert prose-lg text-stone-300">
                  <p className="font-light leading-loose text-xl border-l-4 border-amber-500 pl-6 bg-amber-500/5 py-4 rounded-r-2xl">
                     KoRT is not a charity. It is a highly engineered economic engine designed to outmaneuver institutional poverty. Every application installed, every survey completed, and every banking node linked funnels capital back into the hands of the people.
                  </p>
                  <p className="font-mono text-sm leading-relaxed mt-8 bg-black/50 p-6 rounded-xl border border-white/5">
                     <strong>THE ECOSYSTEM:</strong> This treasury directly fuels <span className="text-white font-bold">The Watch</span> (our crisis response network), buys server time for <span className="text-white font-bold">Merlin & Scribe</span> (our legal AI models), and guarantees that no brother or sister is left standing alone at a tribunal or hospital.
                  </p>
               </div>
            </div>

            {/* Visual Node Representation */}
            <div className="relative w-full h-[600px] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(74,222,128,0.1)] group">
               <img src="/table_nodes.png" alt="Node Ecosystem" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-green-500/30">
                  <h4 className="serif text-2xl font-black text-white uppercase tracking-widest mb-2 flex items-center gap-3">
                     <Network className="text-green-500" /> The Mesh
                  </h4>
                  <p className="text-sm text-stone-400 font-mono">
                     Every connected member actively increases the valuation of the entire Round Table protocol.
                  </p>
               </div>
            </div>

         </div>
      </section>

      {/* 3. THE 60/40 PROTOCOL MATRIX */}
      <section className="w-full py-32 bg-[#050505] border-y border-stone-800 relative z-20">
         <div className="max-w-6xl mx-auto px-6 text-center">
            
            <div className="mb-20">
               <h2 className="serif text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                  The <span className="text-green-500 bg-green-500/10 px-6 py-2 rounded-2xl border border-green-500/30">60/40</span> Split
               </h2>
               <p className="text-2xl text-stone-400 font-light max-w-3xl mx-auto">
                  A ruthlessly transparent revenue model designed for massive collective scaling without leaving anyone behind.
               </p>
            </div>

            {/* Interactive Split Diagram Layout */}
            <div className="flex flex-col md:flex-row bg-[#08080f] rounded-[4rem] border border-stone-800 overflow-hidden shadow-2xl">
               
               {/* 60% User Side */}
               <div className="md:w-[60%] p-16 relative bg-gradient-to-br from-green-900/20 to-transparent flex flex-col justify-center border-b md:border-b-0 md:border-r border-stone-800">
                  <div className="absolute top-10 left-10 text-8xl font-black text-green-500/10 serif italic">60</div>
                  <div className="relative z-10 text-left">
                     <h3 className="serif text-5xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-4">
                        <ShieldCheck className="text-green-500 w-12 h-12" /> Digital Survival
                     </h3>
                     <p className="text-xl text-stone-300 font-light mb-8">
                        Sixty percent of all generated revenue paths immediately belong to you. This is your survival capital for groceries, rent, and legal defense.
                     </p>
                     <ul className="space-y-4 font-mono text-sm text-green-400 font-bold uppercase tracking-widest">
                        <li className="flex items-center gap-3"><ArrowRight /> Instant Payout Routing</li>
                        <li className="flex items-center gap-3"><ArrowRight /> Direct Deposit Capabilities</li>
                        <li className="flex items-center gap-3"><ArrowRight /> Zero Platform Grooming</li>
                     </ul>
                  </div>
               </div>

               {/* 40% Community Side */}
               <div className="md:w-[40%] p-16 relative bg-gradient-to-bl from-amber-900/20 to-transparent flex flex-col justify-center">
                  <div className="absolute top-10 right-10 text-8xl font-black text-amber-500/10 serif italic">40</div>
                  <div className="relative z-10 text-left">
                     <h3 className="serif text-4xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-4">
                        <Combine className="text-amber-500 w-10 h-10" /> The Pool
                     </h3>
                     <p className="text-lg text-stone-400 font-light mb-8">
                        Forty percent flows securely into the Community Treasury. This pool pays compounding dividends back to all active advocates.
                     </p>
                     <ul className="space-y-4 font-mono text-xs text-amber-500 font-bold uppercase tracking-widest">
                        <li className="flex items-center gap-3">» Funds Scribe AI Node</li>
                        <li className="flex items-center gap-3">» Funds "The Watch"</li>
                        <li className="flex items-center gap-3">» Rewards active responders</li>
                     </ul>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. THE SOVEREIGN VIDEO VAULT */}
      <section className="w-full py-32 px-6 bg-[#08080f] relative overflow-hidden">
         {/* Background artwork integration */}
         <div className="absolute -left-[500px] top-0 opacity-10 blur-sm pointer-events-none">
            <img src="/excalibur.png" alt="BG" className="h-[1200px]" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="serif text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                  The <span className="text-blue-500">Intelligence</span> Vault
               </h2>
               <p className="text-xl text-stone-400 uppercase tracking-widest font-mono font-bold">
                  Extensive Masterclass Briefings & Tactical Theory
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               
               {/* AI Generated LTX Intro Video */}
               <div className="group relative w-full aspect-video bg-black rounded-[2rem] border border-stone-800 overflow-hidden shadow-2xl cursor-pointer">
                  <video 
                     src="/kort_intro_video.mp4" 
                     className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                     autoPlay loop muted playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <div className="w-24 h-24 bg-blue-600/80 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(37,99,235,0.6)]">
                        <Play size={40} className="ml-2" />
                     </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
                     <span className="bg-blue-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full mb-3 inline-block">System Init</span>
                     <h3 className="serif text-3xl font-bold text-white uppercase italic">Sovereign OS Initialization</h3>
                     <p className="text-stone-300 mt-2 font-light">Cinematic AI Intro • LTX Video Synthesis.</p>
                  </div>
               </div>

               {/* Video Player Placeholder 2 */}
               <div className="group relative w-full aspect-video bg-black rounded-[2rem] border border-stone-800 overflow-hidden shadow-2xl cursor-pointer">
                  <img src="/paladin.png" alt="Video Poster" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 bg-amber-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-black group-hover:bg-amber-400 transition-colors shadow-[0_0_50px_rgba(245,158,11,0.6)]">
                        <Play size={40} className="ml-2" />
                     </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                     <span className="bg-amber-500 text-black text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full mb-3 inline-block">Module 2.0</span>
                     <h3 className="serif text-3xl font-bold text-white uppercase italic">Peer Advocacy Logistics</h3>
                     <p className="text-stone-300 mt-2 font-light">32 Min Masterclass • How capital flows to boots on the ground.</p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. THE SURVIVAL ROADMAP ($5000/mo) */}
      <section className="w-full py-32 px-6 bg-gradient-to-b from-[#0a0a1a] to-black border-y border-amber-500/10">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="serif text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                  The <span className="text-amber-500">Freedom</span> Roadmap
               </h2>
               <p className="text-stone-400 font-mono font-bold uppercase tracking-widest">
                  Target: Complete Escape Velocity
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-[50%] left-0 w-full h-1 bg-gradient-to-r from-stone-800 via-amber-500/50 to-stone-800 -z-10" />

               {/* Tier 1 */}
               <div className="glass-vault bg-[#050505] border border-stone-800 hover:border-amber-500 rounded-3xl p-10 text-center transition-all group hover:-translate-y-4 duration-500">
                  <div className="w-20 h-20 mx-auto bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center mb-8 group-hover:bg-amber-500/10 group-hover:border-amber-500 transition-colors">
                     <Shield className="text-stone-500 group-hover:text-amber-500 w-8 h-8" />
                  </div>
                  <h3 className="serif text-2xl font-black text-white uppercase tracking-widest mb-2 font-bold italic">PHASE 1: Survival</h3>
                  <div className="text-5xl font-black text-amber-500 hover:text-white transition-colors mb-6 drop-shadow-md">$500 / MO</div>
                  <p className="text-stone-400 leading-relaxed font-light text-sm">
                     The outcome of executing the immediate "Quick Stack" protocol. Initial gig-apps, surveys, and routing bonuses to secure basic cellular service and transport.
                  </p>
               </div>

               {/* Tier 2 */}
               <div className="glass-vault bg-[#080812] border border-stone-700 hover:border-green-500 rounded-3xl p-10 text-center transition-all group hover:-translate-y-4 duration-500 shadow-[0_0_30px_rgba(74,222,128,0.05)]">
                  <div className="w-20 h-20 mx-auto bg-stone-900 border border-green-900 rounded-full flex items-center justify-center mb-8 group-hover:bg-green-500/10 group-hover:border-green-500 transition-colors">
                     <Combine className="text-green-700 group-hover:text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="serif text-2xl font-black text-white uppercase tracking-widest mb-2 font-bold italic">PHASE 2: Stability</h3>
                  <div className="text-5xl font-black text-green-500 hover:text-white transition-colors mb-6 drop-shadow-md">$1,500 / MO</div>
                  <p className="text-stone-400 leading-relaxed font-light text-sm">
                     Achieved via the Bank Referral Looping process + Early Pool Dividends. Requires executing the system with the active participation of roughly 50 localized members.
                  </p>
               </div>

               {/* Tier 3 */}
               <div className="glass-vault bg-[#1a0a0a] border border-red-900/50 hover:border-red-500 rounded-3xl p-10 text-center transition-all group hover:-translate-y-4 duration-500 shadow-[0_0_40px_rgba(220,38,38,0.1)]">
                  <div className="w-20 h-20 mx-auto bg-black border border-red-700 rounded-full flex items-center justify-center mb-8 group-hover:bg-red-500/20 group-hover:border-red-500 transition-colors relative">
                     <Flame className="text-red-500 w-8 h-8 relative z-10" />
                     <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                  </div>
                  <h3 className="serif text-2xl font-black text-white uppercase tracking-widest mb-2 font-bold italic">PHASE 3: Sovereignty</h3>
                  <div className="text-5xl font-black text-white hover:text-red-500 transition-colors mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">$5,000 / MO</div>
                  <p className="text-stone-300 leading-relaxed font-light text-sm">
                     Total escape velocity via Unified Mesh Rewards, 40% Pool Profit Sharing, and full integration of our AI Agent Council automating backend revenue channels continuously.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 6. THE QUICK STACK - ACTIONABLE GLASSMORPHISM */}
      <section className="w-full py-32 px-6 bg-[#050505] relative z-20">
         <div className="max-w-5xl mx-auto">
            <div className="mb-16 text-center">
               <h2 className="serif text-4xl font-black text-white uppercase tracking-tighter mb-4 italic flex justify-center items-center gap-4">
                  <Zap className="text-amber-500 w-10 h-10" /> Execute Quick Stack
               </h2>
               <p className="text-stone-400 uppercase tracking-widest font-mono text-xs">Deploy these links immediately to fund Phase 1.</p>
            </div>

            <div className="grid gap-6">
               <a href={referralLinks.koho} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-amber-500/50 transition-all group cursor-pointer text-left">
                  <div className="flex items-center gap-8 w-full">
                     <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:border-amber-500 transition-colors">
                        <Landmark className="text-amber-500 w-8 h-8" />
                     </div>
                     <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                           <h3 className="serif text-3xl font-black text-white uppercase italic">KOHO Mastercard</h3>
                           <span className="text-[10px] font-black uppercase text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20 tracking-widest whitespace-nowrap">$20–$40 INSTANT</span>
                        </div>
                        <p className="text-stone-400 font-light text-sm">Free prepaid card + credit builder. Spend $20 anywhere to unlock the bonus.</p>
                     </div>
                  </div>
               </a>
               
               <a href={referralLinks.tangerine} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-amber-500/50 transition-all group cursor-pointer text-left">
                  <div className="flex items-center gap-8 w-full">
                     <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:border-amber-500 transition-colors">
                        <Landmark className="text-amber-500 w-8 h-8" />
                     </div>
                     <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                           <h3 className="serif text-3xl font-black text-white uppercase italic">Tangerine Bank</h3>
                           <span className="text-[10px] font-black uppercase text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20 tracking-widest whitespace-nowrap">$50–$100 BONUS</span>
                        </div>
                        <p className="text-stone-400 font-light text-sm">No-fee banking. Connect direct deposit to pull down high-velocity referral rewards.</p>
                     </div>
                  </div>
               </a>

               <a href={referralLinks.rakuten} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-amber-500/50 transition-all group cursor-pointer text-left">
                  <div className="flex items-center gap-8 w-full">
                     <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:border-amber-500 transition-colors">
                        <ShoppingCart className="text-amber-500 w-8 h-8" />
                     </div>
                     <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                           <h3 className="serif text-3xl font-black text-white uppercase italic">Rakuten Rebates</h3>
                           <span className="text-[10px] font-black uppercase text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20 tracking-widest whitespace-nowrap">$30 BONUS</span>
                        </div>
                        <p className="text-stone-400 font-light text-sm">Purchase a $30 gift card or hardware you need anyway, instantly recover your entry capital.</p>
                     </div>
                  </div>
               </a>
            </div>
         </div>
      </section>

      {/* 7. FOOTER PUSH */}
      <div className="pb-32 bg-[#050505]" />

    </div>
  );
}

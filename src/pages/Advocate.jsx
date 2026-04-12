import React from 'react'
import { Link } from 'react-router-dom'
import { Scale, FileText, Home, ShieldCheck, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react'

const HERALD_MODULES = [
  {
    title: "ICBC Tactical Defense",
    desc: "Dispute fault determinations and classify Income Replacement Benefits using the Unified Letter Generator.",
    icon: Scale,
    link: "/herald/icbc",
    color: "border-red-600",
    action: "Enter Dispute Flow"
  },
  {
    title: "PWD Disability Support",
    desc: "Activity of Daily Living (ADL) mapping and automated application assistance for BC disability benefits.",
    icon: ShieldCheck,
    link: "/herald/pwd",
    color: "border-blue-600",
    action: "Start Application"
  },
  {
    title: "Housing Matrix",
    desc: "Dispute RTB notices, manage 10-day eviction responses, and access the Crisis Supplement Shelter archives.",
    icon: Home,
    link: "/herald/housing",
    color: "border-amber-600",
    action: "Review Rights"
  },
  {
    title: "Legal Letter Synth",
    desc: "Generate court-ready correspondence and medical narratives using the MoA Consensus engine.",
    icon: FileText,
    link: "/herald/letters",
    color: "border-teal-600",
    action: "Generate Document"
  }
];

export default function Advocate() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      
      {/* Header Deck */}
      <div className="mb-20">
         <div className="inline-block px-4 py-1 rounded-full border-2 border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            The Herald // Peer Advocacy Command
         </div>
         <h1 className="serif text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase drop-shadow-[5px_5px_0_rgba(201,168,76,0.3)]">
           SYSTEM <span className="text-amber-500">DEFENSE</span>.
         </h1>
         <p className="text-xl text-stone-400 font-light max-w-3xl leading-relaxed">
           You are not a lawyer. You are a Peer Advocate. Use these tactical tools to navigate systemic failure and ensure no one is left alone in the storm.
         </p>
      </div>

      {/* Tactical Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
         {HERALD_MODULES.map((m, idx) => (
            <Link key={idx} to={m.link} className={`glass-vault p-10 rounded-2xl border-l-[6px] ${m.color} group hover:-translate-y-2 transition-all duration-300 shadow-xl overflow-hidden relative`}>
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <m.icon size={120} />
               </div>
               
               <m.icon className="text-white mb-8 group-hover:scale-110 transition-transform" size={40} />
               <h3 className="serif text-3xl font-black text-white mb-4 uppercase tracking-tighter">{m.title}</h3>
               <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">{m.desc}</p>
               
               <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs group-hover:text-amber-500 transition-colors">
                  {m.action} <ArrowRight size={16} />
               </div>
            </Link>
         ))}
      </div>

      {/* Intelligence Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2">
            <h2 className="serif text-2xl font-bold text-white uppercase tracking-widest mb-10 border-b border-white/10 pb-4">Active Crisis Dossiers</h2>
            
            <div className="space-y-4">
               <div className="glass-vault p-6 rounded-xl flex items-center justify-between border-amber-900/20">
                  <div className="flex items-center gap-6">
                     <AlertTriangle className="text-red-500" size={24} />
                     <div>
                        <h4 className="text-white font-bold uppercase text-sm tracking-wider">ICBC IRB NOC Misclassification</h4>
                        <p className="text-stone-500 text-[10px] uppercase font-mono mt-1">Status: Active Dispute // Target: Jackie Secrest</p>
                     </div>
                  </div>
                  <button className="text-amber-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">View Evidence</button>
               </div>

               <div className="glass-vault p-6 rounded-xl flex items-center justify-between border-amber-900/20">
                  <div className="flex items-center gap-6">
                     <Home className="text-amber-500" size={24} />
                     <div>
                        <h4 className="text-white font-bold uppercase text-sm tracking-wider">RTB-30 Eviction Response</h4>
                        <p className="text-stone-500 text-[10px] uppercase font-mono mt-1">Status: Pending Filing // Applicant: Isaac S-S</p>
                     </div>
                  </div>
                  <button className="text-amber-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">View Evidence</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-1">
             <div className="glass-vault p-8 rounded-2xl border-amber-500/20 bg-amber-500/5">
                <BookOpen className="text-amber-500 mb-6" size={32} />
                <h4 className="serif text-xl font-black text-white uppercase tracking-widest mb-4">RTFM Jazz</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-8">
                   "We are the roundtable of the digital chaotic mess. We are a Strategic Hub. We bring chaos to order."
                </p>
                <Link to="/library" className="block w-full py-4 text-center border-2 border-amber-500/30 text-amber-500 font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-black transition-all">
                   Full Archive Index
                </Link>
             </div>
         </div>
      </div>

    </div>
  );
}

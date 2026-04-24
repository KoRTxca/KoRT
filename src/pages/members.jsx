import React, { useState, useEffect } from 'react'
import { Crown, Shield, Star, User, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const TIERS = [
  { id: 'Page', icon: User, color: 'text-stone-400', desc: 'Entry-level node. Active monitoring of crisis flows.' },
  { id: 'Esquire', icon: Star, color: 'text-blue-400', desc: 'Verified contributor. Access to Digital Dollars stacks.' },
  { id: 'Knight', icon: Shield, color: 'text-amber-500', desc: 'Sovereign operator. Can initiate tactical response.' },
  { id: 'Round Table', icon: Crown, color: 'text-red-500', desc: 'Governance tier. Direct influence on system logic.' }
];

export default function Members() {
  const [knightData, setKnightData] = useState(null);
  const [userRole, setUserRole] = useState('Page');

  useEffect(() => {
    const data = localStorage.getItem('kort_knight');
    if (data) {
      const parsed = JSON.parse(data);
      setKnightData(parsed);
      // In a real app, we'd fetch the role from the 'users' table in Supabase here.
      // For now, we'll derive it from the 'isAdmin' check or local storage.
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 animate-fade-in">
      
      <div className="flex flex-col items-center text-center mb-16">
         <h1 className="serif text-5xl font-black mb-4 uppercase tracking-tighter text-white">The <span className="text-amber-500">Round Table</span> Council</h1>
         <p className="text-stone-400 max-w-2xl font-light leading-relaxed">
            Every Knight has a seat. Your tier determines your clearance level across the Nine Base44 Modules.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* User Status Card */}
         <div className="lg:col-span-1">
            <div className="glass-vault p-8 rounded-2xl border-amber-500/30 sticky top-24">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center">
                     <Shield className="text-amber-500" size={32} />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-white uppercase">{knightData?.handle || 'GUEST_NODE'}</h2>
                     <p className="text-amber-500 text-[10px] uppercase font-black tracking-widest">Alignment: {knightData?.alignment || 'UNKNOWN'}</p>
                  </div>
               </div>

               <div className="space-y-6 mb-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center">
                     <span className="text-stone-500 text-xs uppercase font-bold">Current Tier</span>
                     <span className="text-white font-black uppercase text-sm">{knightData?.class || 'PAGE'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-stone-500 text-xs uppercase font-bold">Active Nodes</span>
                     <span className="text-white font-black uppercase text-sm">1 (Local)</span>
                  </div>
               </div>

               <button className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-[.2em] transition-all rounded shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                  Upgrade to Knight
               </button>
            </div>
         </div>

         {/* Tier Description Grid */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="serif text-xl font-bold text-white uppercase tracking-widest mb-8 border-b border-amber-500/20 pb-4">Clearance Levels</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {TIERS.map((tier) => (
                  <div key={tier.id} className={`glass-vault p-6 rounded-xl border-t-4 ${tier.id === knightData?.class ? 'border-amber-500 bg-amber-500/5' : 'border-stone-800'}`}>
                     <div className="flex items-center gap-4 mb-4">
                        <tier.icon className={tier.color} size={24} />
                        <h4 className="text-lg font-black text-white uppercase tracking-widest">{tier.id}</h4>
                        {tier.id === knightData?.class && (
                          <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 border border-amber-500/30 rounded">Active</span>
                        )}
                     </div>
                     <p className="text-stone-400 text-xs leading-relaxed">{tier.desc}</p>
                  </div>
               ))}
            </div>

            <div className="mt-12 p-8 bg-red-900/10 border border-red-500/30 rounded-xl flex gap-6">
               <AlertCircle className="text-red-500 shrink-0" size={32} />
               <div>
                  <h4 className="text-red-500 font-black uppercase text-sm mb-2">Blood Oath Governance</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                     Governance is decentralized but enforced by the Round Table Council. Insubordination or violation of the sovereign network protocols results in immediate node ejection.
                  </p>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}

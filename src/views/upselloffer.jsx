import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Crown, Key, Pickaxe, Zap, X } from 'lucide-react'

export default function UpsellOffer() {
  const navigate = useNavigate();

  const handleAccept = () => {
    // In production, this redirects to Stripe checkout
    navigate('/dashboard'); 
  };

  const handleDecline = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-stone-300 font-sans p-6 flex flex-col items-center justify-center relative overflow-x-hidden">
      
      {/* Visual Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('/diablo_texture.png')] bg-cover mix-blend-overlay"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-900/30 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-4xl w-full relative z-10 animate-fade-in">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-red-950/50 rounded-full border border-red-500/30 mb-4 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            <Crown size={40} className="text-gold-primary" />
          </div>
          <h1 className="serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,100,0,0.6)]">
            The Mastermind Seat
          </h1>
          <p className="text-stone-400 mt-4 text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest">
            Wait! Before you enter the grid, upgrade your clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 bg-[#0a0a0c] border border-red-900/50 shadow-2xl rounded-2xl overflow-hidden relative group">
          
          {/* Holographic scanning line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-50 shadow-[0_0_10px_rgba(201,168,76,1)]"></div>
          
          <style>{`@keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }`}</style>
          
          {/* Left Panel: Value Proposition */}
          <div className="col-span-3 p-8 md:p-12 border-b md:border-b-0 md:border-r border-red-900/30">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <Shield className="text-red-500" /> Executive Privileges
            </h2>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Crown className="shrink-0 text-gold-primary w-6 h-6" />
                <div>
                  <strong className="text-white block text-sm uppercase tracking-widest mb-1">Owner's Table Access</strong>
                  <span className="text-stone-400 text-xs leading-relaxed">Exclusive entry to the executive mastermind group across our Round Table networks.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Key className="shrink-0 text-gold-primary w-6 h-6" />
                <div>
                  <strong className="text-white block text-sm uppercase tracking-widest mb-1">Early Beta & Dev Seat</strong>
                  <span className="text-stone-400 text-xs leading-relaxed">Get a "Backstage Pass" to the Dev Table. Shape the future of KoRT_OS tools before the public sees them.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Pickaxe className="shrink-0 text-gold-primary w-6 h-6" />
                <div>
                  <strong className="text-white block text-sm uppercase tracking-widest mb-1">Lifetime Premium Tier</strong>
                  <span className="text-stone-400 text-xs leading-relaxed">No recurring subscriptions for core modules. Plus, deep scaling discounts on all future a-la-carte purchases.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Zap className="shrink-0 text-gold-primary w-6 h-6" />
                <div>
                  <strong className="text-white block text-sm uppercase tracking-widest mb-1">Network Shoutouts</strong>
                  <span className="text-stone-400 text-xs leading-relaxed">Your name, callsign, and business websites formally recognized across our active network grid.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Panel: The Offer */}
          <div className="col-span-2 p-8 md:p-12 bg-red-950/10 flex flex-col justify-center items-center text-center">
             
             <div className="mb-6 space-y-2">
                <p className="text-stone-500 line-through text-lg font-mono tracking-widest">$5,995 Value</p>
                <div className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(201,168,76,0.3)]">$497</div>
                <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">One-Time Activation</p>
             </div>

             <button 
                onClick={handleAccept}
                className="w-full py-5 bg-gradient-to-br from-gold-primary to-amber-700 text-black font-black uppercase tracking-[0.2em] text-xs rounded hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] hover:scale-105 transition-all mb-6"
             >
               Claim The Mastermind Seat
             </button>

             <button 
                onClick={handleDecline}
                className="text-[10px] text-stone-500 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-stone-700 hover:decoration-white transition-colors"
             >
               No thanks, I will surrender my seat.
             </button>
          </div>

        </div>

      </div>
    </div>
  );
}

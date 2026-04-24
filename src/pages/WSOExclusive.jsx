import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Shield, Flame, ChevronRight, Lock, Share2 } from 'lucide-react';

export default function WSOExclusive() {
    const navigate = useNavigate();

    const generateAffiliateSetup = () => {
        navigate('/viral-broadcast');
    };

    return (
        <div className="w-full min-h-screen bg-[#050505] relative overflow-hidden font-sans">
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-[url('/sovereign_dragon.png')] bg-cover bg-center opacity-40 mix-blend-screen scale-105 animate-[headerPulse_12s_ease-in-out_infinite] pointer-events-none fade-out-bottom"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050505] to-[#050505] pointer-events-none"></div>

            <div className="absolute inset-0 bg-red-900/10 mix-blend-color-dodge animate-[fireBreath_4s_ease-in-out_infinite] pointer-events-none"></div>

            {/* Exclusive Banner */}
            <div className="w-full bg-red-600 text-white text-center py-2 font-black uppercase tracking-widest text-xs relative z-20 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                WARRIOR FORUM EXCLUSIVE OFFER — DO NOT SHARE LINK EXTERNALLY
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-[8vh] pb-32 text-center relative z-10">
                <header className="mb-20">
                    <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-red-500/50 bg-black/80 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                        <Lock className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-red-500 text-[10px] uppercase font-black tracking-widest">PRIVATE PRE-LAUNCH ACCESS</span>
                    </div>

                    <h2 className="serif text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                        Secure Your <span className="text-amber-500">Sovereign Node</span>
                    </h2>
                    <p className="text-stone-300 font-light text-lg max-w-3xl mx-auto mt-6 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 leading-relaxed">
                        You have bypassed the public subscription tiers. For early adopters funding our physical infrastructure, we are unlocking <strong className="text-amber-500">Lifetime Paid Access</strong> thresholds. No monthly fees. Direct integration into the 60/40 treasury pool from day one.
                    </p>
                </header>

                {/* Exclusive Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative text-left max-w-4xl mx-auto">
                    
                    {/* Pioneer Base */}
                    <div className="group relative glass-vault rounded-3xl p-8 border border-amber-500 hover:border-amber-500 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col hover:-translate-y-2 bg-amber-900/10">
                        <div className="relative z-10 flex-grow">
                            <div className="mb-6 flex justify-between items-start">
                                <h3 className="serif text-3xl font-black text-white uppercase italic">Pioneer Base</h3>
                                <div className="p-3 bg-black/50 rounded-xl border border-amber-500/30">
                                    <Shield className="text-amber-500" size={32} />
                                </div>
                            </div>
                            <div className="serif text-5xl font-black text-white mb-2 drop-shadow-md">
                                $47<span className="text-sm font-sans tracking-widest text-stone-500 ml-1"> LIFETIME</span>
                            </div>
                            <p className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-8 h-8">
                                PRE-LAUNCH SPECIAL (Reg $15/mo)
                            </p>
                            <ul className="space-y-4 mb-10 text-stone-300 font-mono text-xs tracking-wider">
                                <li className="flex items-start gap-3"><span className="text-amber-500 text-lg leading-none">»</span> Lifetime Base Platform Access</li>
                                <li className="flex items-start gap-3"><span className="text-amber-500 text-lg leading-none">»</span> Community Revenue Pool Entry</li>
                                <li className="flex items-start gap-3"><span className="text-amber-500 text-lg leading-none">»</span> Discord Priority Access</li>
                                <li className="flex items-start gap-3"><span className="text-amber-500 text-lg leading-none">»</span> No monthly fees until launch</li>
                            </ul>
                        </div>
                        <button onClick={() => navigate('/create')} className="relative z-10 w-full bg-amber-500 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all flex justify-center items-center gap-2 hover:bg-amber-400">
                            Secure Base Seat <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Owners Box */}
                    <div className="group relative glass-vault rounded-3xl p-8 border border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.2)] flex flex-col hover:-translate-y-2 bg-red-900/20">
                        <div className={`absolute -top-6 -right-6 bg-red-600 border-b border-l border-red-400 px-6 py-2 rounded-bl-2xl shadow-lg z-20`}>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white animate-pulse">ONLY 5 SEATS</span>
                        </div>
                        <div className="relative z-10 flex-grow pt-4">
                            <div className="mb-6 flex justify-between items-start">
                                <h3 className="serif text-3xl font-black text-white uppercase italic">Owners Box</h3>
                                <div className="p-3 bg-black/50 rounded-xl border border-red-500/30">
                                    <Crown className="text-red-500" size={32} />
                                </div>
                            </div>
                            <div className="serif text-5xl font-black text-white mb-2 drop-shadow-md">
                                $497<span className="text-sm font-sans tracking-widest text-stone-400 ml-1"> LIFETIME</span>
                            </div>
                            <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-bold mb-8 h-8">
                                Complete Founding Access
                            </p>
                            <ul className="space-y-4 mb-10 text-stone-300 font-mono text-xs tracking-wider">
                                <li className="flex items-start gap-3"><span className="text-red-500 text-lg leading-none">»</span> Round Table Voting Rights</li>
                                <li className="flex items-start gap-3"><span className="text-red-500 text-lg leading-none">»</span> Direct access to Architects</li>
                                <li className="flex items-start gap-3"><span className="text-red-500 text-lg leading-none">»</span> Unlimited API Gateway routing (Local)</li>
                                <li className="flex items-start gap-3"><span className="text-red-500 text-lg leading-none">»</span> Equity pipeline recognition</li>
                            </ul>
                        </div>
                        <button onClick={() => navigate('/create')} className="relative z-10 w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all flex justify-center items-center gap-2 hover:bg-red-500">
                            Claim Owners Box <ChevronRight size={16} />
                        </button>
                    </div>

                </div>

                {/* Viral CTA */}
                <div className="max-w-3xl mx-auto mb-24 cursor-pointer" onClick={generateAffiliateSetup}>
                    <div className="w-full bg-gradient-to-r from-[#0a0a1a] via-[#1a1205] to-[#0a0a1a] border border-amber-500/30 rounded-3xl p-8 hover:border-amber-500/80 transition-all shadow-xl text-left flex flex-col md:flex-row items-center gap-8">
                        <div className="p-6 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <Share2 size={40} className="text-amber-500" />
                        </div>
                        <div>
                            <h3 className="serif text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Funded by the People</h3>
                            <p className="text-stone-300 font-mono text-xs tracking-wider mb-4 leading-relaxed">
                                Don't have the $47 right now? Initiate a Network-Wide Broadcast. We authorize your social handles and blast the WSO out with your tracking code. Earn $DRT to fund your own entry.
                            </p>
                            <span className="text-amber-500 font-black uppercase tracking-widest text-[10px]">Ignite Viral Broadcast &rarr;</span>
                        </div>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .fade-out-bottom {
                  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
              }
            ` }} />
        </div>
    );
}

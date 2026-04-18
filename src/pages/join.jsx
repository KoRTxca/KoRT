import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Sword, Award, Crown, ChevronDown, Flame, ChevronRight } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            onClick={() => setIsOpen(!isOpen)} 
            className="group cursor-pointer mb-6 bg-black/40 border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all shadow-xl backdrop-blur-md relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex justify-between items-center relative z-10">
                <h4 className="serif text-amber-500 uppercase tracking-widest text-sm font-bold m-0">{question}</h4>
                <ChevronDown className="text-stone-500 group-hover:text-amber-500 transition-colors" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.4s' }} size={20} />
            </div>
            {isOpen && <p className="font-mono text-stone-300 mt-4 text-xs tracking-wider leading-relaxed opacity-80">{answer}</p>}
        </div>
    );
};

export default function Join() {
    const navigate = useNavigate();
    const tiers = [
        {
            id: 'page',
            name: 'PAGE',
            icon: <Award className="text-stone-400 group-hover:scale-125 transition-transform" size={40} />,
            price: '$5',
            tagline: '"I believe in this."',
            color: 'border-stone-500',
            bg: 'bg-stone-500/10',
            features: ['Digital Dollars earning suite', 'Monthly progress updates', 'Founding Supporters list', 'App submission rights']
        },
        {
            id: 'esquire',
            name: 'ESQUIRE',
            icon: <Shield className="text-amber-500 group-hover:scale-125 transition-transform" size={40} />,
            price: '$15',
            tagline: '"I want to be part of this."',
            featured: true,
            color: 'border-amber-500',
            bg: 'bg-amber-500/10',
            features: ['Everything in Page', 'Community Pool earnings', 'Discord priority access', 'Microloan eligible (60 days)']
        },
        {
            id: 'knight',
            name: 'KNIGHT',
            icon: <Sword className="text-red-500 group-hover:scale-125 transition-transform" size={40} />,
            price: '$50',
            tagline: '"I am committed back."',
            color: 'border-red-500',
            bg: 'bg-red-500/10',
            features: ['Everything in Esquire', 'Monthly strategy calls', 'Network directory access', 'Priority crisis support']
        },
        {
            id: 'round-table',
            name: 'ROUND TABLE',
            icon: <Crown className="text-purple-500 group-hover:scale-125 transition-transform" size={40} />,
            price: '$150',
            tagline: '"I want to help lead."',
            featured: true,
            color: 'border-purple-500',
            bg: 'bg-purple-500/10',
            features: ['Everything in Knight', 'Voting rights on decisions', 'Co-founder recognition', 'Equity potential as we scale']
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#050505] relative overflow-hidden font-sans">
            
            {/* Cinematic Dragon Backdrop */}
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-[url('/sovereign_dragon.png')] bg-cover bg-center opacity-40 mix-blend-screen scale-105 animate-[headerPulse_12s_ease-in-out_infinite] pointer-events-none fade-out-bottom"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] pointer-events-none"></div>

            {/* Breathing Fire Overlays */}
            <div className="absolute inset-0 bg-red-900/10 mix-blend-color-dodge animate-[fireBreath_4s_ease-in-out_infinite] pointer-events-none"></div>
            <div className="absolute inset-0 bg-amber-900/5 mix-blend-overlay animate-[emberFlicker_0.15s_infinite] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 pt-[12vh] pb-32 text-center relative z-10">
                <header className="mb-20">
                    <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
                        <Flame className="w-4 h-4 mr-2 text-red-500 animate-pulse" />
                        <span className="text-amber-500 text-[10px] uppercase font-black tracking-widest">Sovereign Treasury Node // Active</span>
                    </div>

                    <h2 className="serif text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                        Claim Your <span className="text-amber-500">Seat</span>
                    </h2>
                    <p className="text-stone-300 font-light text-xl md:text-2xl max-w-2xl mx-auto mt-6 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                        Every tier <strong className="text-green-400">earns</strong>. Every tier <strong className="text-amber-500">matters</strong>. This is peer-funded autonomy. Join the mission.
                    </p>
                </header>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 relative text-left">
                    {tiers.map(tier => (
                        <div key={tier.id} className={`group relative glass-vault rounded-3xl p-8 border ${tier.featured ? tier.color : 'border-white/10'} hover:border-amber-500/80 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col hover:scale-105`}>
                            {/* Inner Background overlay */}
                            <div className={`absolute inset-0 ${tier.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[40px] group-hover:bg-amber-500/10 pointer-events-none"></div>

                            <div className="relative z-10 flex-grow">
                                {tier.featured && (
                                    <div className={`absolute -top-8 -right-8 ${tier.bg} border-b border-l ${tier.color} px-6 py-2 rounded-bl-2xl shadow-lg`}>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white animate-pulse">Recommended</span>
                                    </div>
                                )}
                                
                                <div className="mb-6 flex justify-between items-start">
                                    <h3 className="serif text-3xl font-black text-white uppercase italic">{tier.name}</h3>
                                    <div className="p-3 bg-black/50 rounded-xl border border-white/5 group-hover:border-amber-500/50 transition-colors shadow-inner">
                                        {tier.icon}
                                    </div>
                                </div>

                                <div className="serif text-5xl font-black text-white mb-2 drop-shadow-md">
                                    {tier.price}<span className="text-sm font-sans tracking-widest text-stone-500 ml-1">/MO</span>
                                </div>
                                <p className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-8 h-8">
                                    {tier.tagline}
                                </p>

                                <ul className="space-y-4 mb-10 text-stone-300 font-mono text-xs tracking-wider">
                                    {tier.features.map(f => (
                                        <li key={f} className="flex items-start gap-3">
                                            <span className="text-amber-500 text-lg leading-none pt-0.5">»</span> 
                                            <span className="opacity-90 leading-tight">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={() => navigate('/create')}
                                className="relative z-10 w-full bg-white/5 border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                            >
                                Enlist <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="h-px bg-gradient-to-r from-transparent to-amber-500/50 flex-grow"></div>
                        <h3 className="serif text-3xl font-black text-white uppercase tracking-tighter">Tactical <span className="text-amber-500">Intel</span></h3>
                        <div className="h-px bg-gradient-to-l from-transparent to-amber-500/50 flex-grow"></div>
                    </div>

                    <FaqItem 
                        question="How do I earn money as a member?"
                        answer="Through the Digital Dollars stack — curated apps that pay you for signups, cashback, and surveys. We use the 60/40 treasury split to fund your wallet first."
                    />
                    <FaqItem 
                        question="What is the Community Pool?"
                        answer="40% of all earnings flow into a shared pool, redistributed proportionally to active members. As we grow, the pool grows."
                    />
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

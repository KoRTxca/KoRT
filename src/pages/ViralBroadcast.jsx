import React, { useState } from 'react';
import { Share2, Lock, Zap, CheckCircle, Mail, Hash, Briefcase, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ViralBroadcast() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [authorizations, setAuthorizations] = useState({
        email: false,
        twitter: false,
        linkedin: false
    });

    const isFullyAuthorized = Object.values(authorizations).every(Boolean);

    const handleAuthorize = (platform) => {
        // Trigger generic secure OAuth window simulation for local n8n parsing
        // In real execution, this opens OAuth popups hooking into n8n webhooks
        setTimeout(() => {
            setAuthorizations(prev => ({ ...prev, [platform]: true }));
        }, 800);
    };

    const initiateBlast = () => {
        setStep(2);
        // Ping local drt-n8n relay webhook
        fetch('http://localhost:5678/webhook/viral-broadcast-init', {
            method: 'POST',
            body: JSON.stringify({ authorized: authorizations, action: 'broadcast' })
        }).catch(err => console.log('n8n local not running yet', err));
        
        setTimeout(() => setStep(3), 3000);
    };

    return (
        <div className="min-h-screen bg-[#050505] p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-amber-900/5 mix-blend-overlay animate-[emberFlicker_0.15s_infinite] pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-2xl w-full z-10">
                <div className="glass-vault border border-amber-500/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(201,168,76,0.15)] bg-black/60 backdrop-blur-xl">
                    
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <div className="flex justify-center mb-8">
                                <Share2 size={64} className="text-amber-500" />
                            </div>
                            <h1 className="serif text-4xl font-black text-center text-white uppercase italic tracking-tighter mb-4">
                                Network-Wide <span className="text-amber-500">Broadcast</span>
                            </h1>
                            <p className="text-stone-300 font-mono text-xs tracking-widest text-center mb-12 opacity-80 leading-relaxed">
                                Fund your seat by activating your network. Authorize Sovereign OS to send a one-time pre-launch dispatch on your behalf.
                                <br/><br/>You earn 40% of the entry fee for every comrade who answers the call.
                            </p>

                            <div className="space-y-4 mb-8">
                                {/* Email Auth */}
                                <button 
                                    onClick={() => handleAuthorize('email')}
                                    disabled={authorizations.email}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${authorizations.email ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-white/5 border-white/10 hover:border-amber-500 text-stone-300'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Mail size={24} />
                                        <span className="font-black uppercase tracking-widest text-sm">Gmail / Address Book</span>
                                    </div>
                                    {authorizations.email ? <CheckCircle size={20} /> : <Lock size={20} />}
                                </button>

                                {/* Twitter Auth */}
                                <button 
                                    onClick={() => handleAuthorize('twitter')}
                                    disabled={authorizations.twitter}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${authorizations.twitter ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-white/5 border-white/10 hover:border-amber-500 text-stone-300'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Hash size={24} />
                                        <span className="font-black uppercase tracking-widest text-sm">X (Twitter) Network</span>
                                    </div>
                                    {authorizations.twitter ? <CheckCircle size={20} /> : <Lock size={20} />}
                                </button>

                                {/* LinkedIn Auth */}
                                <button 
                                    onClick={() => handleAuthorize('linkedin')}
                                    disabled={authorizations.linkedin}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${authorizations.linkedin ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-white/5 border-white/10 hover:border-amber-500 text-stone-300'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Briefcase size={24} />
                                        <span className="font-black uppercase tracking-widest text-sm">LinkedIn Professional</span>
                                    </div>
                                    {authorizations.linkedin ? <CheckCircle size={20} /> : <Lock size={20} />}
                                </button>
                            </div>

                            <button 
                                onClick={initiateBlast}
                                className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-sm flex justify-center items-center gap-3 transition-all ${isFullyAuthorized || authorizations.email || authorizations.twitter || authorizations.linkedin ? 'bg-amber-500 text-black shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:scale-[1.02]' : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'}`}
                                disabled={!authorizations.email && !authorizations.twitter && !authorizations.linkedin}
                            >
                                <Zap size={20} /> Initiate Local Broadcast Protocol
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-20 animate-fade-in flex flex-col items-center">
                            <div className="relative w-24 h-24 mb-8">
                                <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin"></div>
                                <Share2 size={32} className="absolute inset-x-0 inset-y-0 m-auto text-amber-500 animate-pulse" />
                            </div>
                            <h2 className="font-mono text-sm tracking-widest text-amber-500 uppercase mb-4">Firing Protocol Active</h2>
                            <p className="text-stone-400 font-mono text-xs uppercase opacity-70">Standby. The Scribe is charting your network via n8n relay.</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-10 animate-fade-in">
                            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                            <h2 className="serif text-3xl font-black text-white uppercase italic tracking-widest mb-4">Broadcast Deployed</h2>
                            <p className="text-stone-300 font-mono text-xs tracking-widest opacity-80 mb-8 leading-relaxed">
                                The relay has consumed your tokens and fired the WSO sequence. Your unique affiliate signature is active. Monitor incoming connections from the dashboard.
                            </p>
                            <button 
                                onClick={() => navigate('/')}
                                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-black uppercase tracking-widest transition-all"
                            >
                                Return to Command Center
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

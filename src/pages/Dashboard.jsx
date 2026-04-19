import React, { useState, useEffect } from 'react';
import { Shield, Sword, Cpu, Zap, Activity, Award, Share2, CheckCircle, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userStats, setUserStats] = useState({
        level: 1,
        alignment: 'Rogue',
        classTitle: 'Initiate of the Open Code',
        digitalDollars: 0,
        referrals: 0,
        onboardingComplete: false
    });

    // Mock progress hooks for onboarding
    const [tasks, setTasks] = useState({
        createdCharacter: true,
        connectedAccounts: false,
        ignitedBroadcast: false,
        startedEarning: false
    });

    const isFullyOnboarded = Object.values(tasks).every(Boolean);

    return (
        <div className="w-full min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-x-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 relative z-10">
                <div>
                    <h1 className="serif text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Command <span className="text-amber-500">Center</span></h1>
                    <p className="text-stone-400 font-mono text-xs uppercase tracking-widest">Sovereign Node ID: #77X-BETA</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                    <button onClick={() => navigate('/settings')} className="text-stone-400 hover:text-white uppercase tracking-widest text-[10px] font-black border border-white/10 px-4 py-2 rounded-lg bg-white/5 transition-all">
                        ⚙️ Tactical Config
                    </button>
                    <button className="text-red-500 hover:text-white uppercase tracking-widest text-[10px] font-black border border-red-500/30 px-4 py-2 rounded-lg bg-red-900/10 transition-all">
                        Log Out
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                
                {/* COLUMN 1: Character Card */}
                <div className="lg:col-span-1">
                    <div className="glass-vault bg-black/60 border border-amber-500/30 rounded-3xl p-6 shadow-[0_0_30px_rgba(201,168,76,0.1)] relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            {userStats.alignment === 'Rogue' && <Sword size={120} className="transform -rotate-12" />}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500 flex items-center justify-center">
                                <Shield className="text-amber-500" size={40} />
                            </div>
                            <div>
                                <h3 className="serif text-2xl font-black uppercase italic tracking-wider">The {userStats.alignment}</h3>
                                <p className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">{userStats.classTitle}</p>
                            </div>
                        </div>

                        <div className="w-full bg-black/50 rounded-xl p-4 border border-white/10 mb-6 relative z-10 flex-grow">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-xs uppercase tracking-widest text-stone-300">Level {userStats.level}</span>
                                <span className="font-mono text-[10px] text-amber-500">450 / 1000 XP</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[45%]"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">Recruits</h4>
                                    <span className="text-xl font-bold text-white font-mono">{userStats.referrals}</span>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-1">Treasury</h4>
                                    <span className="text-xl font-bold text-green-400 font-mono">${userStats.digitalDollars}</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/create" className="w-full text-center py-3 border border-amber-500/50 text-amber-500 rounded-xl uppercase tracking-widest text-[10px] font-black hover:bg-amber-500 hover:text-black transition-all">
                            Modify Character Sync
                        </Link>
                    </div>
                </div>

                {/* COLUMN 2 & 3: Active Protocols & Onboarding */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Onboarding Matrix */}
                    <div className="glass-vault border border-white/10 rounded-3xl p-8 bg-gradient-to-br from-black to-[#0a0a1a]">
                        <h2 className="serif text-2xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                            <Activity className="text-blue-500" /> Tactical Onboarding Matrix
                        </h2>
                        
                        <div className="space-y-4">
                            {/* Task 1 */}
                            <div className={`p-4 rounded-xl border flex items-center justify-between ${tasks.createdCharacter ? 'border-green-500/30 bg-green-900/10' : 'border-white/10 bg-white/5'}`}>
                                <div className="flex items-center gap-4">
                                    {tasks.createdCharacter ? <CheckCircle className="text-green-500" /> : <div className="w-6 h-6 border-2 border-stone-600 rounded-full"></div>}
                                    <div>
                                        <h4 className={`font-bold uppercase tracking-widest text-sm ${tasks.createdCharacter ? 'text-green-500' : 'text-stone-300'}`}>Forge Character Form</h4>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Determine your alignment.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${tasks.connectedAccounts ? 'border-green-500/30 bg-green-900/10' : 'border-amber-500/50 bg-amber-900/10 cursor-pointer hover:border-amber-500'}`} onClick={() => !tasks.connectedAccounts && navigate('/settings')}>
                                <div className="flex items-center gap-4">
                                    {tasks.connectedAccounts ? <CheckCircle className="text-green-500" /> : <div className="w-6 h-6 border-2 border-amber-500 rounded-full animate-pulse"></div>}
                                    <div>
                                        <h4 className={`font-bold uppercase tracking-widest text-sm ${tasks.connectedAccounts ? 'text-green-500' : 'text-amber-500'}`}>Link Social Nodes</h4>
                                        <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Connect Reddit, Discord, or X.</p>
                                    </div>
                                </div>
                                {!tasks.connectedAccounts && <button className="text-[10px] uppercase font-black tracking-widest bg-amber-500 text-black px-4 py-2 rounded-lg">Link</button>}
                            </div>

                            {/* Task 3 */}
                            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${tasks.ignitedBroadcast ? 'border-green-500/30 bg-green-900/10' : 'border-white/20 bg-white/5 cursor-pointer hover:border-amber-500'}`} onClick={() => !tasks.ignitedBroadcast && navigate('/viral-broadcast')}>
                                <div className="flex items-center gap-4">
                                    {tasks.ignitedBroadcast ? <CheckCircle className="text-green-500" /> : <Share2 className={tasks.connectedAccounts ? 'text-stone-400' : 'text-stone-700'} />}
                                    <div>
                                        <h4 className={`font-bold uppercase tracking-widest text-sm ${tasks.ignitedBroadcast ? 'text-green-500' : (tasks.connectedAccounts ? 'text-stone-300' : 'text-stone-600')}`}>Ignite Viral Broadcast</h4>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Blast your referral link to earn $DRT.</p>
                                    </div>
                                </div>
                                {!tasks.ignitedBroadcast && <button className={`text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-lg ${tasks.connectedAccounts ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-stone-800 text-stone-600 cursor-not-allowed'}`} disabled={!tasks.connectedAccounts}>Broadcast</button>}
                            </div>

                            {/* Task 4 */}
                            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between cursor-pointer hover:border-green-500 transition-all" onClick={() => navigate('/digital-dollars')}>
                                <div className="flex items-center gap-4">
                                    <Award className="text-green-500" />
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-sm text-stone-300">Initiate Digital Dollars</h4>
                                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Complete your first earning action.</p>
                                    </div>
                                </div>
                                <button className="text-[10px] uppercase font-black tracking-widest bg-green-500 text-black px-4 py-2 rounded-lg">Start Earning</button>
                            </div>

                        </div>
                    </div>

                    {/* Quick Access Matrix */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/digital-dollars" className="p-4 bg-black/40 border border-green-500/20 hover:border-green-500 rounded-2xl flex flex-col items-center justify-center text-center group transition-all">
                            <Cpu className="text-green-500 mb-3 group-hover:scale-125 transition-transform" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Yield Farm</h4>
                        </Link>
                        <Link to="/sandbox" className="p-4 bg-black/40 border border-purple-500/20 hover:border-purple-500 rounded-2xl flex flex-col items-center justify-center text-center group transition-all">
                            <Zap className="text-purple-500 mb-3 group-hover:scale-125 transition-transform" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">AI Sandbox</h4>
                        </Link>
                        <Link to="/library" className="p-4 bg-black/40 border border-amber-500/20 hover:border-amber-500 rounded-2xl flex flex-col items-center justify-center text-center group transition-all">
                            <Shield className="text-amber-500 mb-3 group-hover:scale-125 transition-transform" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Advocacy Laws</h4>
                        </Link>
                        <Link to="/watch" className="p-4 bg-black/40 border border-red-500/20 hover:border-red-500 rounded-2xl flex flex-col items-center justify-center text-center group transition-all shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                            <Activity className="text-red-500 mb-3 group-hover:scale-125 transition-transform" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Active Crises</h4>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

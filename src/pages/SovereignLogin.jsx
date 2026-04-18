import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Terminal, Zap, Fingerprint, ChevronRight } from 'lucide-react';
import { supabase } from '../api/base44client';

export default function SovereignLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Secure Magic Link sent! Check your inbox.' });
    }
    setLoading(false);
  };

  const handleCommanderOverride = () => {
    // Mike's Emergency Bypass
    const adminProfile = { 
      handle: 'COMMANDER', 
      class: 'DIRECTOR', 
      alignment: 'CORE', 
      machine: 'VULCAN',
      role: 'admin'
    };
    localStorage.setItem('kort_knight', JSON.stringify(adminProfile));
    
    // Add a cinematic pause effect
    setMessage({ type: 'success', text: 'BYPASS AUTHORIZED. WELCOME, COMMANDER.' });
    setTimeout(() => {
      navigate('/');
      window.location.reload(); // Force refresh to update nav
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0033a0]/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        
        {/* LOGO AREA */}
        <div className="text-center mb-12">
           <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
             <img src="/logo.png" alt="KoRT Sovereign Logo" className="h-16 w-auto drop-shadow-[0_0_20px_rgba(201,168,76,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all" />
           </Link>
           <h1 className="serif text-4xl font-black text-white uppercase tracking-tighter mb-2">
             Sovereign <span className="text-amber-500">Access</span>
           </h1>
           <p className="text-stone-500 text-xs uppercase tracking-[0.3em] font-bold">Authentication Required // Node Alpha</p>
        </div>

        {/* MAIN LOGIN CARD */}
        <div className="glass-vault p-10 rounded-3xl border border-white/10 shadow-2xl relative">
          
          <div className="absolute -top-4 -left-4 p-4 bg-amber-500 rounded-2xl shadow-[0_0_30px_rgba(201,168,76,0.3)]">
            <Lock className="text-black" size={24} />
          </div>

          <form onSubmit={handleMagicLink} className="space-y-6">
            <div>
              <label className="block text-stone-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Knight Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.com" 
                  className="w-full bg-black/50 border-2 border-stone-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition-all placeholder:text-stone-800 tracking-wider"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white/5 border-2 border-white/10 hover:border-amber-500/50 hover:bg-white/10 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? 'Encrypting...' : (
                <>
                  <Zap size={18} className="text-amber-500 group-hover:scale-125 transition-transform" />
                  Request Magic Link
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl border text-xs font-bold uppercase tracking-widest text-center animate-pulse ${
              message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-grow bg-white/5"></div>
            <span className="text-stone-700 text-[9px] font-black uppercase tracking-[0.5em]">DIRECTORATE ONLY</span>
            <div className="h-px flex-grow bg-white/5"></div>
          </div>

          {/* THE PROMINENT BYPASS BUTTON */}
          <button 
            onClick={handleCommanderOverride}
            className="w-full bg-red-950/20 border-2 border-red-900/40 hover:border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-black uppercase tracking-[0.2em] py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(220,38,38,0.05)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] flex flex-col items-center group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Fingerprint className="mb-2 group-hover:animate-pulse" size={32} />
            <span className="text-sm">Commander Override</span>
            <span className="text-[9px] opacity-40 mt-1 font-mono tracking-widest">[ Emergency Bypass Node ]</span>
          </button>

          <p className="mt-8 text-center text-stone-600 text-[10px] font-bold uppercase tracking-widest">
            Don't have a seat yet? <Link to="/create" className="text-amber-500 hover:underline">Register Dossier</Link>
          </p>
        </div>

        {/* System Breadcrumbs */}
        <div className="mt-12 flex justify-center gap-8 text-stone-700 text-[8px] font-mono uppercase tracking-[0.3em]">
          <span>Ver: OS_4.2.1</span>
          <span>Status: Protected</span>
          <span>Node: Sector_Alpha</span>
        </div>
      </div>
    </div>
  );
}

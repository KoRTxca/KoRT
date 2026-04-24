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

  const handleGoogleAuth = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
    
    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    }
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
            
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-white/10 flex-grow"></div>
              <span className="text-stone-600 font-black text-[10px] uppercase tracking-widest">OR</span>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3 hover:bg-stone-200"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Authenticate with Google
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

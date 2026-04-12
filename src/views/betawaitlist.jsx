import React, { useState } from 'react'
import { Shield, ChevronRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BetaWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] bg-black w-full flex flex-col justify-center items-center py-20 px-6 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-dragon-blue/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gold-primary/20 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-xl w-full text-center">
        <Shield className="w-16 h-16 text-gold-primary mx-auto mb-6" />
        <h1 className="serif text-4xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4">
          The <span className="gold-text">Sovereign</span> Waitlist
        </h1>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-10 tracking-wide">
          Access to the KoRT_OS Command Center is currently strictly limited to <strong className="text-white">Warrior Forum Members</strong> and Founding Knights. Join the pre-release special offer list to secure priority access to the Beta.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-xl animate-fade-in backdrop-blur-md">
            <h3 className="serif text-2xl text-green-400 mb-2 uppercase tracking-widest">Protocol Accepted</h3>
            <p className="text-stone-300 text-sm">Your frequency has been logged. We will contact you at <strong>{email}</strong> when a slot opens.</p>
            <Link to="/" className="inline-block mt-6 text-[10px] text-stone-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Return to Gates
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-5 h-5" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter secure communication channel (Email)..."
                  className="w-full bg-black/50 border border-white/20 text-white pl-12 pr-4 py-4 rounded focus:outline-none focus:border-gold-primary transition-colors text-sm"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gold-primary text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-[#e6c15c] transition-all flex justify-center items-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
              >
                Request Beta Invite <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-6 text-[10px] text-stone-500 uppercase tracking-widest text-center">
              No spam. No surrender. Mankind Thriving.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}

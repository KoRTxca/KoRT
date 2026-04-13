import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const [knightData, setKnightData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('kort_knight');
    if (data) setKnightData(JSON.parse(data));
  }, [location]);

  return (
    <>
      <div className="w-full h-32 md:h-48 bg-[url('/banner.png')] bg-cover bg-center bg-[#050505] relative flex flex-col justify-center items-center text-center border-b border-[#222]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h2 className="serif text-2xl md:text-4xl text-white font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Knights of the Round Table</h2>
          <p className="text-amber-500 text-sm md:text-base font-bold uppercase tracking-widest mt-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">No one gets left behind.</p>
        </div>
      </div>

      <nav className="w-full bg-[#08080f] border-b border-amber-500/20 py-4 px-6 flex justify-between items-center z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="KoRT Sovereign Logo" className="h-10 w-auto group-hover:drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] group-hover:scale-105 transition-all duration-300 relative z-10" />
            <span className="serif text-xl font-bold tracking-widest text-[#e0e0e0] group-hover:text-[#c9a84c] transition-colors">KoRTx.ca<span className="text-amber-500">.</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-widest font-bold">
            <Link to="/" className="text-stone-400 hover:text-amber-400 transition-colors">Dashboard</Link>
            <Link to="/advocacy" className="text-stone-400 hover:text-amber-400 transition-colors">Tactical Defense</Link>
            <Link to="/digital-dollars" className="text-stone-400 hover:text-amber-400 transition-colors">Digital Dollars</Link>
            <Link to="/roundtable" className="text-amber-500 hover:text-amber-300 font-black border-b border-amber-500/30 px-1">Round Table</Link>
            <Link to="/scribe" className="text-stone-400 hover:text-teal-400 transition-colors">Scribe</Link>
            <Link to="/library" className="text-stone-400 hover:text-teal-400 transition-colors">Archive</Link>
            <Link to="/guide" className="text-stone-400 hover:text-amber-400 transition-colors">Guide</Link>
            <Link to="/settings" className="text-stone-400 hover:text-amber-400 transition-colors">Settings</Link>
            <Link to="/watch" className="bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-all text-[10px] ml-4">The Watch</Link>
          </div>
        </div>
        
        <div>
          {knightData ? (
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs uppercase text-amber-500 tracking-widest font-bold font-mono">
                {knightData.alignment} NODE // {knightData.machine}
              </span>
              <button onClick={() => { localStorage.removeItem('kort_knight'); window.location.reload(); }} className="ml-4 text-[10px] text-red-500 hover:text-white uppercase tracking-widest">Eject</button>
            </div>
          ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 border border-white/20 text-stone-400 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-white/5 transition-colors">
              Login
            </Link>
            <Link to="/create" className="px-6 py-2 border border-amber-500 text-amber-500 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)]">
              Join Early Access
            </Link>
          </div>
          )}
        </div>
      </nav>
    </>
  );
}

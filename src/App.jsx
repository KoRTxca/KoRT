import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Advocate from './pages/Advocate';
import ICBCFlow from './pages/ICBCFlow';
import Letters from './pages/Letters';
import PWDFlow from './pages/PWDFlow';
import CaseAssistant from './pages/CaseAssistant';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Settings from './pages/Settings';
import SovereignLogin from './pages/SovereignLogin';
import CharacterCreation from './pages/CharacterCreation';
import ScribeEngine from './pages/ScribeEngine';
import WatchPage from './pages/WatchPage';
import BetaWaitlist from './pages/BetaWaitlist';
import UpsellOffer from './pages/UpsellOffer';
import RoundTable from './pages/RoundTable';
import Library from './pages/Library';
import PreviewGate from './pages/PreviewGate';
import SovereignSandbox from './pages/SovereignSandbox';
import Join from './pages/Join';
import DigitalDollars from './pages/DigitalDollars';
import SubmitApp from './pages/SubmitApp';

// THE HERALD (Advocate App) Imports
import HeraldLayout from './components/herald/HeraldLayout';
import HeraldDashboard from './pages/HeraldDashboard';
import NewCase from './pages/NewCase';
import PWDApplication from './pages/PWDApplication';
import LetterGenerator from './pages/LetterGenerator';
import RightsDatabase from './pages/RightsDatabase';
import DeadlineTracker from './pages/DeadlineTracker';
import ToolSuggestion from './pages/ToolSuggestion';
import MerlinChat from './pages/MerlinChat';
import GlobalFooter from './components/GlobalFooter';
import SovereignStatus from './components/dashboard/SovereignStatus';

import './index.css';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('kort_knight');
  const location = useLocation();
  if (!isAuth) {
    return <PreviewGate attemptedRoute={location.pathname} />;
  }
  return children;
};

function Navigation() {
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
          <h2 className="serif text-2xl md:text-4xl text-white font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Pre-Launch Founding Sale</h2>
          <p className="text-amber-500 text-sm md:text-base font-bold uppercase tracking-widest mt-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">Limited Spots Open / Earn Your Way In Free</p>
        </div>
      </div>

      <nav className="w-full bg-[#08080f] border-b border-amber-500/20 py-4 px-6 flex justify-between items-center z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="KoRT Sovereign Logo" className="h-10 w-auto group-hover:drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] group-hover:scale-105 transition-all duration-300 relative z-10" />
            <span className="serif text-xl font-bold tracking-widest text-[#e0e0e0] group-hover:text-[#c9a84c] transition-colors">KoRT_OS<span className="text-amber-500">.</span></span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest font-bold">
            <Link to="/" className="text-stone-400 hover:text-amber-400">Dashboard</Link>
            <Link to="/herald/icbc" className="text-stone-400 hover:text-amber-400">Tactical Defense</Link>
            <Link to="/digital-dollars" className="text-stone-400 hover:text-amber-400">Digital Dollars</Link>
            <Link to="/roundtable" className="text-gold-primary hover:text-yellow-500 font-bold border-b border-gold-primary/50 mx-2">Think Tank</Link>
            <Link to="/herald/pwd" className="text-stone-400 hover:text-amber-400">Digital Detox</Link>
            <Link to="/scribe" className="text-stone-400 hover:text-teal-400">Digital Scribe</Link>
            <Link to="/library" className="text-stone-400 hover:text-teal-400 font-bold">The Archive</Link>
            <Link to="/settings" className="text-stone-400 hover:text-amber-400">Settings</Link>
            <Link to="/watch" className="text-stone-400 hover:text-red-500 font-bold ml-4 border border-red-500/30 px-3 py-1 rounded bg-red-500/10 uppercase tracking-widest text-xs">The Watch</Link>
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
            {!knightData && (
              <Link to="/login" className="px-6 py-2 border border-white/20 text-stone-400 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-white/5 transition-colors">
                Login
              </Link>
            )}
            <Link to="/create" className={knightData ? "px-6 py-2 border border-[#0033a0] text-[#0033a0] font-bold uppercase tracking-widest text-[10px] rounded hover:bg-[#0033a0] hover:text-white transition-all shadow-[0_0_15px_rgba(0,51,160,0.3)]" : "px-6 py-2 border border-amber-500 text-amber-500 font-bold uppercase tracking-widest text-[10px] rounded hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)]"}>
              {knightData ? 'Active Dossier' : 'Join Early Access'}
            </Link>
          </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#08080f] text-[#e0e0e0] font-sans flex flex-col w-full overflow-x-hidden">
        <Navigation />
        <main className="flex-grow w-full flex flex-col items-center">
          <Routes>
            {/* ... routes ... */}
          </Routes>
        </main>
        <SovereignStatus />
        <GlobalFooter />
      </div>
    </BrowserRouter>
  );
}

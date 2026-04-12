import React, { useState, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  Shield, Globe, Lock, Cpu, Activity, 
  ShieldAlert, ShieldCheck, Sword, BookOpen, Layers
} from 'lucide-react'

// --- 1. CORE SYSTEM ---
import './index.css'

// --- 2. MODULE MATRIX (EXPLICIT PATHS) ---
const Dashboard = React.lazy(() => import('./views/pg_dashboard.jsx'));
const Settings = React.lazy(() => import('./views/pg_settings.jsx'));
const SovereignLogin = React.lazy(() => import('./views/pg_sovereignlogin.jsx'));
const CharacterCreation = React.lazy(() => import('./views/pg_charactercreation.jsx'));
const WatchPage = React.lazy(() => import('./views/watchpage.jsx'));
const SubmitApp = React.lazy(() => import('./views/submitapp.jsx'));
const TheGuide = React.lazy(() => import('./views/pg_theguide.jsx'));
const ScribeEngine = React.lazy(() => import('./views/scribeengine.jsx'));
const RoundTable = React.lazy(() => import('./pages/roundtable.jsx'));
const Library = React.lazy(() => import('./pages/library.jsx'));
const DigitalDollars = React.lazy(() => import('./pages/digitaldollars.jsx'));
const Join = React.lazy(() => import('./pages/join.jsx'));
const SovereignSandbox = React.lazy(() => import('./pages/sovereignsandbox.jsx'));
const HeraldLayout = React.lazy(() => import('./components/herald/heraldlayout.jsx')); 
const PreviewGate = React.lazy(() => import('./views/previewgate.jsx'));

// --- 3. LAYOUT COMPONENTS ---

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const isAuth = localStorage.getItem('kort_knight');
    setIsAdmin(!!isAuth);
  }, [location]);

  if (!localStorage.getItem('kort_knight')) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-amber-500 serif animate-pulse">Summoning Gate...</div>}>
        <PreviewGate attemptedRoute={location.pathname} />
      </Suspense>
    );
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
        <div className="relative z-10 px-6">
          <h2 className="serif text-2xl md:text-5xl font-bold text-white uppercase tracking-tighter shadow-black">KNIGHTS OF <span className="text-amber-500">THE ROUND TABLE</span></h2>
          <p className="text-stone-300 text-xs md:text-sm uppercase tracking-widest mt-2 font-mono">KoRTx.ca // No one gets left behind.</p>
        </div>
      </div>
      <nav className="w-full bg-[#08080f] border-b border-amber-500/20 py-4 px-6 flex justify-between items-center z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
             <span className="serif text-xl font-bold tracking-widest text-white uppercase">KoRT_OS.</span>
          </Link>
          <div className="hidden lg:flex gap-6 text-[10px] uppercase tracking-widest font-bold">
            <Link to="/" className="text-stone-400 hover:text-amber-400 transition-colors">Dashboard</Link>
            <Link to="/herald/icbc" className="text-stone-400 hover:text-amber-400 transition-colors">Tactical Defense</Link>
            <Link to="/roundtable" className="text-amber-500 hover:text-white border-b border-amber-500/30">Round Table</Link>
            <Link to="/scribe" className="text-stone-400 hover:text-teal-400">Scribe</Link>
            <Link to="/library" className="text-stone-400 hover:text-teal-400">The Archive</Link>
            <Link to="/digital-dollars" className="text-stone-400 hover:text-green-400">Treasury</Link>
            <Link to="/guide" className="text-stone-400 hover:text-white">Manual</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {knightData ? (
             <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest">{knightData.alignment} // {knightData.machine}</span>
             </div>
          ) : (
            <Link to="/create" className="px-5 py-2 border border-amber-500 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-amber-500 hover:text-black transition-all">Join Early Access</Link>
          )}
        </div>
      </nav>
    </>
  );
}

function GlobalFooter() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-[9px] font-bold uppercase tracking-widest text-stone-600">
        <div className="max-w-sm">
           <h3 className="serif text-xl font-bold text-white mb-2 uppercase">KoRTx.ca</h3>
           <p className="text-stone-500 text-xs italic">"No one gets left behind."</p>
        </div>
        <div className="flex gap-12">
           <Link to="/guide" className="hover:text-white">System Guide</Link>
           <Link to="/compliance" className="hover:text-white">Compliance Node</Link>
           <Link to="/watch" className="hover:text-white text-red-500">The Watch</Link>
        </div>
      </div>
    </footer>
  );
}

// --- 4. UNIFIED APPLICATION ---
function SovereignApp() {
  return (
    <div className="min-h-screen bg-[#08080f] text-[#e0e0e0] font-sans flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <main className="flex-grow w-full flex flex-col items-center">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-amber-500 serif animate-pulse">Summoning Node...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<SovereignLogin />} />
            <Route path="/create" element={<CharacterCreation />} />
            <Route path="/guide" element={<TheGuide />} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/submit" element={<SubmitApp />} />
            <Route path="/scribe" element={<ProtectedRoute><ScribeEngine /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/roundtable" element={<ProtectedRoute><RoundTable /></ProtectedRoute>} />
            <Route path="/digital-dollars" element={<ProtectedRoute><DigitalDollars /></ProtectedRoute>} />
            <Route path="/herald/*" element={<ProtectedRoute><HeraldLayout /></ProtectedRoute>} />
            <Route path="/sandbox" element={<ProtectedRoute><SovereignSandbox /></ProtectedRoute>} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </Suspense>
      </main>
      <GlobalFooter />
    </div>
  );
}

// --- 5. INITIALIZATION ---
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <SovereignApp />
      </BrowserRouter>
    </React.StrictMode>
  );
}

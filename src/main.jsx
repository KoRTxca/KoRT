import React, { useState, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'

// --- 1. CORE SYSTEM ---
import './index.css'

// --- AUTH HELPERS ---
// Supabase Auth and Commander Overrides managed in SovereignLogin.jsx


// --- 2. MODULE MATRIX ---
const LandingPage = React.lazy(() => import('./pages/LandingPage.jsx'));
const LandingStarTrek = React.lazy(() => import('./pages/LandingStarTrek.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const SovereignLogin = React.lazy(() => import('./pages/SovereignLogin.jsx'));
const CharacterCreation = React.lazy(() => import('./pages/CharacterCreation.jsx'));
const WatchPage = React.lazy(() => import('./pages/watchpage.jsx'));
const SubmitApp = React.lazy(() => import('./pages/submitapp.jsx'));
const TheGuide = React.lazy(() => import('./pages/TheGuide.jsx'));
const ScribeEngine = React.lazy(() => import('./pages/scribeengine.jsx'));
const RoundTable = React.lazy(() => import('./pages/RoundTable.jsx'));
const Library = React.lazy(() => import('./pages/library.jsx'));
const DigitalDollars = React.lazy(() => import('./pages/digitaldollars.jsx'));
const Join = React.lazy(() => import('./pages/Join.jsx'));
const Economics = React.lazy(() => import('./pages/Economics.jsx'));
const TavernChapter1 = React.lazy(() => import('./pages/TavernChapter1.jsx'));
const SovereignSandbox = React.lazy(() => import('./pages/SovereignSandbox.jsx'));
const ViralBroadcast = React.lazy(() => import('./pages/ViralBroadcast.jsx'));
const WSOExclusive = React.lazy(() => import('./pages/WSOExclusive.jsx'));
const PreviewGate = React.lazy(() => import('./pages/previewgate.jsx'));
const TacticalSettings = React.lazy(() => import('./pages/TacticalSettings.jsx'));

// ADVOCACY SUITE
const ICBCFlow = React.lazy(() => import('./pages/ICBCFlow.jsx'));
const PWDFlow = React.lazy(() => import('./pages/PWDFlow.jsx'));
const PWDApplication = React.lazy(() => import('./pages/pwdapplication.jsx'));
const LetterGenerator = React.lazy(() => import('./pages/LetterGenerator.jsx'));
const RightsDatabase = React.lazy(() => import('./pages/rightsdatabase.jsx'));
const Advocate = React.lazy(() => import('./pages/Advocate.jsx'));
const NewCase = React.lazy(() => import('./pages/NewCase.jsx'));
const CaseAssistant = React.lazy(() => import('./pages/CaseAssistant.jsx'));
const DeadlineTracker = React.lazy(() => import('./pages/deadlinetracker.jsx'));
const Members = React.lazy(() => import('./pages/members.jsx'));
const MerlinChat = React.lazy(() => import('./pages/merlinchat.jsx'));

// --- 3. PROTECTED ROUTE (real auth check) ---
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation()
  const knight = localStorage.getItem('kort_knight')
  const admin = localStorage.getItem('kort_admin')

  // Admin-only routes (advocacy case files etc)
  if (adminOnly && !admin) {
    return <Navigate to="/login" state={{ from: location, adminOnly: true }} replace />
  }
  // Knight-level routes
  if (!knight && !admin) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontFamily: 'monospace' }}>Summoning Gate...</div>}>
        <PreviewGate attemptedRoute={location.pathname} />
      </Suspense>
    )
  }
  return children
}

// -- LOGIN REMOVED: Using SovereignLogin.jsx component instead --

// --- 5. ANIMATED DRAGON HEADER ---
function DragonHeader() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 350, overflow: 'hidden', background: '#000', borderBottom: '2px solid rgba(201,168,76,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes headerPulse { 0%, 100% { transform: scale(1.05); } 50% { transform: scale(1.1); } }
        @keyframes fireBreath { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.25; } }
        @keyframes emberFlicker {
          0% { opacity: 0.6; } 10% { opacity: 0.8; } 20% { opacity: 0.5; }
          30% { opacity: 0.9; } 40% { opacity: 0.4; } 50% { opacity: 0.85; }
          60% { opacity: 0.6; } 70% { opacity: 0.9; } 80% { opacity: 0.5; }
          90% { opacity: 0.8; } 100% { opacity: 0.6; }
        }
      `}</style>

      {/* Cinematic Dragon Backdrop */}
      <div style={{
        position: 'absolute', inset: -20,
        backgroundImage: "url('/sovereign_dragon.png')",
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        animation: 'headerPulse 12s ease-in-out infinite',
        opacity: 0.8
      }} />

      {/* Fade Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(8,8,15,1) 100%)' }} />
      
      {/* Breathing Fire / Ember Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#ff3300',
        mixBlendMode: 'color-dodge',
        animation: 'fireBreath 4s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#991100',
        mixBlendMode: 'overlay',
        animation: 'emberFlicker 0.15s infinite',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 style={{ 
          fontFamily: "'Cinzel', serif", 
          fontSize: '3.5rem', 
          color: '#e8e8e8', 
          fontWeight: 900, 
          letterSpacing: '3px', 
          fontStyle: 'italic',
          margin: '0 0 8px 0',
          textShadow: '0 0 40px rgba(201,168,76,0.5)',
          lineHeight: 1.1,
          textTransform: 'uppercase'
        }}>
          Knights of <br/>
          <span style={{ color: '#c9a84c', fontStyle: 'normal' }}>The Round Table</span>
        </h1>
        <div style={{ color: '#ff6b00', fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '6px', textTransform: 'uppercase', fontWeight: 700, textShadow: '0 0 10px rgba(255,107,0,0.8)' }}>
          Sector Alpha // Protocol Engaged
        </div>
      </div>
    </div>
  )
}

// --- 6. NAVIGATION ---
function Navigation() {
  const [knightData, setKnightData] = useState(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('kort_knight')
    if (data) try { setKnightData(JSON.parse(data)) } catch (e) { }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('kort_knight')
    localStorage.removeItem('kort_admin')
    navigate('/')
    window.location.reload()
  }

  const isAdmin = !!localStorage.getItem('kort_admin') || knightData?.role === 'admin'

  return (
    <>
      <DragonHeader />
      <nav style={{ width: '100%', background: '#08080f', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.png" alt="KoRT" style={{ width: 32, height: 40, objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: '1rem', color: '#e8d5a3', letterSpacing: '0.05em' }}>KoRTx.ca</span>
          </Link>
          <div style={{ display: 'flex', gap: 20, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
            <Link to="/dashboard" style={{ color: '#9a9ab0', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/join" style={{ color: '#9a9ab0', textDecoration: 'none' }}>Join</Link>
            <Link to="/digital-dollars" style={{ color: '#4ade80', textDecoration: 'none' }}>Treasury</Link>
            <Link to="/roundtable" style={{ color: '#c9a84c', textDecoration: 'none' }}>Round Table</Link>
            <Link to="/watch" style={{ color: '#9a9ab0', textDecoration: 'none' }}>The Watch</Link>
            <Link to="/guide" style={{ color: '#9a9ab0', textDecoration: 'none' }}>Manual</Link>
            {knightData && <Link to="/advocacy" style={{ color: '#f08080', textDecoration: 'none' }}>Advocate</Link>}
          </div>
        </div>
        
        {/* Account Icon w/ Hover Overlay */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowAccountMenu(true)}
          onMouseLeave={() => setShowAccountMenu(false)}
        >
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', 
            padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px' 
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: knightData ? '#4ade80' : '#4a9eff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#000', fontSize: 10, fontWeight: 900 }}>{knightData ? 'K' : '?'}</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#e8e8e8', letterSpacing: '0.1em', fontWeight: 700 }}>
              {knightData ? (knightData.handle || 'KNIGHT_ACTIVE') : 'GUEST'}
            </span>
            <span style={{ fontSize: 10, color: '#c9a84c', marginLeft: 4 }}>▼</span>
          </div>

          {/* Hover Overlay Menu */}
          {showAccountMenu && (
            <div style={{ 
              position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, 
              background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.5)', borderRadius: 6,
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 
            }}>
              {knightData ? (
                <>
                  <div style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 4 }}>
                    <div style={{ fontSize: 10, color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</div>
                    <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 'bold' }}>{knightData.alignment || 'Active'} Node</div>
                    {isAdmin && <div style={{ fontSize: 9, color: '#f08080', background: 'rgba(240,128,128,0.1)', padding: '2px 4px', borderRadius: 2, display: 'inline-block', marginTop: 4 }}>DIRECTORATE LEVEL</div>}
                  </div>
                  <Link to="/settings" style={{ color: '#e8e8e8', fontSize: 12, padding: '8px', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>Tactical Settings</Link>
                  <Link to="/dashboard" style={{ color: '#e8e8e8', fontSize: 12, padding: '8px', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>Command Center</Link>
                  <button onClick={handleLogout} style={{ textAlign: 'left', background: 'rgba(240,128,128,0.1)', border: '1px solid rgba(240,128,128,0.3)', color: '#f08080', fontSize: 12, padding: '8px', cursor: 'pointer', borderRadius: 4 }}>
                    Disconnect Node
                  </button>
                </>
              ) : (
                <>
                  <div style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 4 }}>
                    <div style={{ fontSize: 10, color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unverified Access</div>
                    <div style={{ fontSize: 11, color: '#c9a84c', marginTop: 4 }}>Identify yourself to access the Round Table.</div>
                  </div>
                  <Link to="/login" style={{ color: '#000', background: '#c9a84c', border: '1px solid #e8d5a3', fontSize: 12, padding: '10px 8px', textDecoration: 'none', borderRadius: 4, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Login / Sync
                  </Link>
                  <Link to="/create" style={{ color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', fontSize: 12, padding: '10px 8px', textDecoration: 'none', borderRadius: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Create Dossier
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

// --- 7. FOOTER ---
function GlobalFooter() {
  return (
    <footer style={{ width: '100%', background: '#050505', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '40px 24px', marginTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <img src="/logo.png" alt="KoRT" style={{ height: 50, opacity: 0.8 }} />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['Discord', 'https://discord.gg/T6bfsceJ'], ['Reddit', 'https://reddit.com/r/KoRT'], ['Email', 'mailto:hello@kortx.ca'], ['250-800-9225', 'tel:2508009225']].map(([l, h]) => (
            <a key={l} href={h} style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>{l}</a>
          ))}
          {['/join', '/dashboard', '/digital-dollars', '/trek'].map(l => (
            <Link key={l} to={l} style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>{l.slice(1) || 'home'}</Link>
          ))}
        </div>
        <p style={{ color: '#9a9ab0', fontSize: '0.72rem', textAlign: 'center', maxWidth: 640, lineHeight: 1.6 }}>
          © 2026 KoRT / Xception Contracting Ltd. — Cowichan Valley, BC<br />
          Pre-launch educational community. Not a licensed service provider. Peer support is not professional counselling. v2.1.0
        </p>
      </div>
    </footer>
  )
}

// --- 8. MAIN APP ---
function SovereignApp() {
  return (
    <div style={{ minHeight: '100vh', background: '#08080f', color: '#e0e0e0', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Navigation />
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontFamily: "'Cinzel',serif", animation: 'pulse 1.5s infinite' }}>Summoning Node...</div>}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/trek" element={<LandingStarTrek />} />
            <Route path="/join" element={<Join />} />
            <Route path="/wso-exclusive" element={<WSOExclusive />} />
            <Route path="/viral-broadcast" element={<ViralBroadcast />} />
            <Route path="/economics" element={<Economics />} />
            <Route path="/how-it-works" element={<Economics />} />
            <Route path="/tavern/chapter-1" element={<TavernChapter1 />} />
            <Route path="/tavern" element={<TavernChapter1 />} />
            <Route path="/login" element={<SovereignLogin />} />
            <Route path="/create" element={<CharacterCreation />} />
            <Route path="/guide" element={<TheGuide />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/submit" element={<SubmitApp />} />

            {/* KNIGHT-GATED */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/digital-dollars" element={<ProtectedRoute><DigitalDollars /></ProtectedRoute>} />
            <Route path="/roundtable" element={<ProtectedRoute><RoundTable /></ProtectedRoute>} />
            <Route path="/scribe" element={<ProtectedRoute><ScribeEngine /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/sandbox" element={<ProtectedRoute><SovereignSandbox /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><TacticalSettings /></ProtectedRoute>} />
            <Route path="/merlin-chat" element={<ProtectedRoute><MerlinChat /></ProtectedRoute>} />

            {/* ADVOCACY — ADMIN ONLY (case files, personal data) */}
            <Route path="/advocacy" element={<ProtectedRoute adminOnly={true}><Advocate /></ProtectedRoute>} />
            <Route path="/advocacy/icbc" element={<ProtectedRoute adminOnly={true}><ICBCFlow /></ProtectedRoute>} />
            <Route path="/advocacy/pwd" element={<ProtectedRoute adminOnly={true}><PWDFlow /></ProtectedRoute>} />
            <Route path="/advocacy/pwd-app" element={<ProtectedRoute adminOnly={true}><PWDApplication /></ProtectedRoute>} />
            <Route path="/advocacy/letters" element={<ProtectedRoute adminOnly={true}><LetterGenerator /></ProtectedRoute>} />
            <Route path="/advocacy/rights" element={<ProtectedRoute adminOnly={true}><RightsDatabase /></ProtectedRoute>} />
            <Route path="/advocacy/new-case" element={<ProtectedRoute adminOnly={true}><NewCase /></ProtectedRoute>} />
            <Route path="/advocacy/case-manager" element={<ProtectedRoute adminOnly={true}><CaseAssistant /></ProtectedRoute>} />
            <Route path="/advocacy/deadlines" element={<ProtectedRoute adminOnly={true}><DeadlineTracker /></ProtectedRoute>} />
            <Route path="/advocacy/members" element={<ProtectedRoute adminOnly={true}><Members /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
      <GlobalFooter />
    </div>
  )
}

// --- 9. BOOT ---
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <SovereignApp />
      </BrowserRouter>
    </React.StrictMode>
  )
}

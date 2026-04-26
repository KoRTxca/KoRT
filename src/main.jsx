import React, { useState, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'

// --- 1. CORE SYSTEM ---
import './index.css'

// --- AUTH HELPERS ---
// Supabase Auth and Commander Overrides managed in SovereignLogin.jsx


// --- 2. MODULE MATRIX ---
const Awakening = React.lazy(() => import('./pages/Awakening.jsx'));
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
const SovereignStack = React.lazy(() => import('./pages/SovereignStack.jsx'));
const MerlinArchitecture = React.lazy(() => import('./pages/MerlinArchitecture.jsx'));
const SovereignWarRoom = React.lazy(() => import('./pages/SovereignWarRoom.jsx'));
const BetaWaitlist = React.lazy(() => import('./pages/BetaWaitlist.jsx'));
const UpsellOffer = React.lazy(() => import('./pages/UpsellOffer.jsx'));
const Terms = React.lazy(() => import('./pages/Terms.jsx'));
const Privacy = React.lazy(() => import('./pages/Privacy.jsx'));
const Blog = React.lazy(() => import('./pages/Blog.jsx'));
const BlogAiBuildBattle = React.lazy(() => import('./pages/BlogAiBuildBattle.jsx'));

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

// --- 6. UNIFIED PROFESSIONAL HEADER ---
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
    <header style={{ 
      width: '100%', 
      background: 'rgba(10, 10, 26, 0.95)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(201,168,76,0.2)', 
      padding: '16px 40px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
    }}>
      {/* Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img src="/logo.png" alt="KoRT" style={{ width: 36, height: 44, objectFit: 'contain' }} />
        <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '1.4rem', color: '#e8d5a3', letterSpacing: '0.05em' }}>KoRTx</span>
      </Link>

      {/* Main Menu */}
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {[
          { to: '/join', label: 'Membership', color: '#e8e8e8' },
          { to: '/digital-dollars', label: 'Treasury', color: '#4ade80' },
          { to: '/economics', label: 'Economics', color: '#e8e8e8' },
          { to: '/watch', label: 'The Watch', color: '#e8e8e8' },
          { to: '/guide', label: 'Manual', color: '#e8e8e8' },
          knightData && { to: '/dashboard', label: 'Command', color: '#c9a84c' },
          knightData && { to: '/merlin-chat', label: 'Merlin AI', color: '#a855f7' },
          knightData && { to: '/advocacy', label: 'Advocacy', color: '#f08080' }
        ].filter(Boolean).map((link, idx) => (
          <Link key={idx} to={link.to} style={{ 
            color: link.color, 
            textDecoration: 'none', 
            fontSize: '0.95rem', 
            fontWeight: 600, 
            fontFamily: 'sans-serif',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
            opacity: location.pathname === link.to ? 1 : 0.8
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = location.pathname === link.to ? '1' : '0.8'}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User / Login Bar */}
      <div 
        style={{ position: 'relative' }}
        onMouseEnter={() => setShowAccountMenu(true)}
        onMouseLeave={() => setShowAccountMenu(false)}
      >
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', 
          padding: '10px 16px', background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(201,168,76,0.4)', borderRadius: '6px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: knightData ? '#4ade80' : '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#000', fontSize: 13, fontWeight: 900, fontFamily: 'sans-serif' }}>{knightData ? knightData.handle?.charAt(0).toUpperCase() || 'K' : '?'}</span>
          </div>
          <span style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', color: '#fff', letterSpacing: '0.05em', fontWeight: 600 }}>
            {knightData ? (knightData.handle || 'KNIGHT ACTIVE') : 'Guest Access'}
          </span>
          <span style={{ fontSize: 10, color: '#c9a84c', marginLeft: 4 }}>▼</span>
        </div>

        {/* Hover Dropdown */}
        {showAccountMenu && (
          <div style={{ 
            position: 'absolute', top: '100%', right: 0, marginTop: 12, width: 240, 
            background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.8)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 
          }}>
            {knightData ? (
              <>
                <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 11, color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Network Status</div>
                  <div style={{ fontSize: 14, color: '#4ade80', fontWeight: 700, marginTop: 4 }}>{knightData.alignment || 'Active'} Node</div>
                  {isAdmin && <div style={{ fontSize: 10, color: '#f08080', background: 'rgba(240,128,128,0.1)', padding: '4px 6px', borderRadius: 4, display: 'inline-block', marginTop: 8, fontWeight: 700 }}>DIRECTORATE</div>}
                </div>
                <Link to="/settings" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', padding: '8px', borderRadius: 4, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>⚙️ Tactical Settings</Link>
                <Link to="/dashboard" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', padding: '8px', borderRadius: 4, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>🖥️ Command Center</Link>
                <button onClick={handleLogout} style={{ textAlign: 'left', background: 'rgba(240,128,128,0.1)', border: '1px solid rgba(240,128,128,0.2)', color: '#f08080', fontSize: 13, padding: '10px', cursor: 'pointer', borderRadius: 4, marginTop: 4, fontWeight: 600 }}>
                  Disconnect
                </button>
              </>
            ) : (
              <>
                <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 11, color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unverified Access</div>
                  <div style={{ fontSize: 13, color: '#e8e8e8', marginTop: 6, lineHeight: 1.4 }}>Login to access your Dashboard and Round Table tools.</div>
                </div>
                <Link to="/login" style={{ color: '#000', background: '#c9a84c', fontSize: 13, padding: '10px', textDecoration: 'none', borderRadius: 4, textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Login to Account
                </Link>
                <Link to="/create" style={{ color: '#c9a84c', border: '1px solid rgba(201,168,76,0.4)', fontSize: 13, padding: '10px', textDecoration: 'none', borderRadius: 4, textAlign: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
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
          {[['/join', 'Join'], ['/economics', 'Economics'], ['/guide', 'Manual'], ['/blog', 'Chronicle'], ['/terms', 'Terms'], ['/privacy', 'Privacy']].map(([path, label]) => (
            <Link key={path} to={path} style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <p style={{ color: '#9a9ab0', fontSize: '0.72rem', textAlign: 'center', maxWidth: 640, lineHeight: 1.6 }}>
          © 2026 KoRT / Xception Contracting Ltd. — Cowichan Valley, BC<br />
          Pre-launch educational community. Not a licensed service provider. Peer support is not professional counselling. v2.3.0
        </p>
      </div>
    </footer>
  )
}

// --- 8. MAIN APP ---
function SovereignApp() {
  return (
    <div style={{ minHeight: '100vh', background: '#08080f', color: '#e0e0e0', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <ScrollToTop />
      <Navigation />
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontFamily: "'Cinzel',serif", animation: 'pulse 1.5s infinite' }}>Summoning Node...</div>}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/awakening" element={<Awakening />} />
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
            <Route path="/how-it-works/stack" element={<SovereignStack />} />
            <Route path="/how-it-works/merlin" element={<MerlinArchitecture />} />
            <Route path="/war-room" element={<SovereignWarRoom />} />
            <Route path="/beta" element={<BetaWaitlist />} />
            <Route path="/upsell" element={<UpsellOffer />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/ai-build-battle" element={<BlogAiBuildBattle />} />

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

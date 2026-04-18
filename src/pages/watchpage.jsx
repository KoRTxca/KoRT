import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useWatch, CRISIS_TYPES } from '../hooks/usewatch'
import { SOSButton } from '../components/sosbutton'
import { WatchStatus } from '../components/watchstatus'
import { ResponderDashboard } from '../components/responderdashboard'

const watchTheme = `:root{--watch-bg:#08080f;--watch-card:#0a0a1a;--watch-gold:#c9a84c;--watch-red:#c44455;--watch-green:#3a9a6a;}`;
const globalStyles = `${watchTheme}@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');@keyframes spin{to{transform:rotate(360deg);}}`;

const USER_TIERS = { page: { label: 'Page', icon: '📜', canRespond: false }, esquire: { label: 'Esquire', icon: '🛡️', canRespond: false }, knight: { label: 'Knight', icon: '⚔️', canRespond: true }, round_table: { label: 'Round Table', icon: '👑', canRespond: true } };

const styles = {
  page: { minHeight: '100vh', background: 'var(--watch-bg)', color: '#fff', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(201, 168, 76, 0.2)' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  logoIcon: { width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--watch-gold), #8a7030)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' },
  logoText: { fontFamily: 'Cinzel, serif', fontSize: '1.25rem', fontWeight: '700', color: 'var(--watch-gold)', letterSpacing: '0.05em' },
  tierBadge: { padding: '0.35rem 0.75rem', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid var(--watch-gold)', borderRadius: '20px', color: 'var(--watch-gold)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' },
  main: { padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' },
  tabs: { display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.5rem', background: 'var(--watch-card)', borderRadius: '12px' },
  tab: { flex: 1, padding: '0.75rem', background: 'transparent', border: 'none', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' },
  tabActive: { background: 'rgba(201, 168, 76, 0.2)', color: 'var(--watch-gold)' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' },
  spinner: { width: '48px', height: '48px', border: '3px solid rgba(201, 168, 76, 0.2)', borderTopColor: 'var(--watch-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  loginPrompt: { textAlign: 'center', padding: '3rem 1rem' },
  loginButton: { padding: '1rem 2rem', background: 'var(--watch-gold)', border: 'none', borderRadius: '10px', color: '#000', fontSize: '1rem', fontWeight: '600', fontFamily: 'Cinzel, serif', cursor: 'pointer', marginTop: '1.5rem' }
};

export default function WatchPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('request');
  const [knightProfile, setKnightProfile] = useState(null);
  const [introPhase, setIntroPhase] = useState(0); // 0: Storm, 1: Sword, 2: Table, 3: Active
  const { user, userProfile, isResponder, responderActive, activeDispatch, availableDispatches, location, locationError, loading, requestLocation, createSOS, cancelSOS, toggleResponderActive, acceptDispatch, updateDispatchStatus } = useWatch();

  useEffect(() => { const style = document.createElement('style'); style.textContent = globalStyles; document.head.appendChild(style); return () => document.head.removeChild(style); }, []);
  useEffect(() => { const fetchKnight = async () => { if (activeDispatch?.assigned_knight && !isResponder) { const { data } = await supabase.from('users').select('id, display_name, role').eq('id', activeDispatch.assigned_knight).single(); setKnightProfile(data); } }; fetchKnight(); }, [activeDispatch?.assigned_knight, isResponder]);
  useEffect(() => { if (isResponder && !activeDispatch) setActiveTab('respond'); }, [isResponder]);

  // Timed Intro Sequence
  useEffect(() => {
    if (introPhase < 3) {
      const timer = setTimeout(() => setIntroPhase(introPhase + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [introPhase]);

  const handleSOS = async (crisisType, description) => { const { error } = await createSOS(crisisType, description); if (error) console.error('SOS failed:', error); };

  if (loading) return (<div style={styles.page}><div style={styles.loading}><div style={styles.spinner} /><p style={{ color: 'rgba(255,255,255,0.5)' }}>Initializing The Watch...</p></div></div>);

  // Cinematic Intro Layer
  if (introPhase === 0) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-[url('/digital_storm_skyline_1775953603520.png')] bg-cover bg-center animate-pulse opacity-60"></div>
        <div className="relative z-10 text-center">
          <h2 className="serif text-stone-500 uppercase tracking-[0.8em] text-sm mb-4">Phase I // The Gathering</h2>
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
        </div>
      </div>
    );
  }
  if (introPhase === 1) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-0">
        <div className="absolute inset-0 bg-[url('/excalibur_circuit_board_1775953617241.png')] bg-cover bg-center opacity-80 scale-110 animate-pulse"></div>
        <div className="relative z-10 text-center">
          <h2 className="serif text-amber-500 uppercase tracking-[0.8em] text-sm mb-4">Phase II // The Impact</h2>
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
      </div>
    );
  }
  if (introPhase === 2) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-0">
        <div className="absolute inset-0 bg-[url('/round_table_ai_nodes_1775953642535.png')] bg-cover bg-center opacity-70"></div>
        <div className="relative z-10 text-center">
          <h2 className="serif text-white uppercase tracking-[0.8em] text-sm mb-4">Phase III // The Seat</h2>
          <button
            onClick={() => setIntroPhase(3)}
            className="mt-8 px-12 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black uppercase tracking-widest text-xs transition-all"
          >
            Enter The Watch
          </button>
        </div>
      </div>
    );
  }

  if (!user) return (
    <div style={styles.page}>
      <header style={styles.header}><div style={styles.logo}><div style={styles.logoIcon}>⚔️</div><span style={styles.logoText}>The Watch</span></div></header>
      <div style={styles.loginPrompt}><h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--watch-gold)', marginBottom: '1rem' }}>Knights of the Round Table</h2><p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>Peer support and mutual aid for BC communities.<br />The 4th option when you need help.</p><button style={styles.loginButton} onClick={() => navigate('/login')} data-testid="login-redirect-button">Enter The Watch</button></div>
    </div>
  );

  const userTier = USER_TIERS[userProfile?.role] || USER_TIERS.page;

  return (
    <div style={styles.page} data-testid="watch-page">
      <header style={styles.header}><div style={styles.logo}><div style={styles.logoIcon}>⚔️</div><span style={styles.logoText}>The Watch</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={styles.tierBadge} data-testid="user-tier-badge">{userTier.icon} {userTier.label}</span><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{userProfile?.display_name}</span></div></header>
      <main style={styles.main}>
        {isResponder && (<div style={styles.tabs}><button style={{ ...styles.tab, ...(activeTab === 'request' ? styles.tabActive : {}) }} onClick={() => setActiveTab('request')} data-testid="tab-request">Request Help</button><button style={{ ...styles.tab, ...(activeTab === 'respond' ? styles.tabActive : {}) }} onClick={() => setActiveTab('respond')} data-testid="tab-respond">Respond</button></div>)}
        {activeTab === 'request' && (<>{activeDispatch && !isResponder ? <WatchStatus dispatch={activeDispatch} onCancel={cancelSOS} knightProfile={knightProfile} /> : <SOSButton onSOS={handleSOS} location={location} locationError={locationError} requestLocation={requestLocation} disabled={!!activeDispatch} />}</>)}
        {activeTab === 'respond' && isResponder && <ResponderDashboard responderActive={responderActive} onToggleActive={toggleResponderActive} availableDispatches={availableDispatches} activeDispatch={activeDispatch} onAccept={acceptDispatch} onUpdateStatus={updateDispatchStatus} userLocation={location} />}
      </main>
    </div>
  );
}

import React, { useState } from 'react';

// The Awakening Experience (3D Void / RPG Onboarding)
// Phase 2 Blueprint implementation.

export default function Awakening() {
  const [phase, setPhase] = useState('entry'); // entry -> generation -> ghost -> oracle -> manifestation

  const startJourney = () => {
    setPhase('generation');
    setTimeout(() => setPhase('ghost'), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #0a0a1a 0%, #000 100%)',
      color: '#e8e8e8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic 3D Void Background Placeholder */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', animation: 'spin 100s linear infinite', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 600, textAlign: 'center', padding: '40px' }}>
        
        {phase === 'entry' && (
          <div style={{ animation: 'fadeIn 1s' }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", color: '#c9a84c', fontSize: '3rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(201,168,76,0.5)' }}>Enter the Void</h1>
            <p style={{ color: '#9a9ab0', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
              You are about to transition from a Digital Ghost to a Sovereign Identity.
            </p>
            <button 
              onClick={startJourney}
              style={{
                background: 'transparent', border: '2px solid #c9a84c', color: '#c9a84c',
                padding: '1rem 3rem', fontSize: '1rem', fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer',
                transition: 'all 0.3s', borderRadius: '4px'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c'; }}
            >
              Initiate Sequence
            </button>
          </div>
        )}

        {phase === 'generation' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '1rem' }}>Generating Local X25519 Keypair...</div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(74,222,128,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: '#4ade80', animation: 'progress 2s infinite linear' }} />
            </div>
          </div>
        )}

        {phase === 'ghost' && (
          <div style={{ animation: 'fadeIn 1s' }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: '#0033a0', fontSize: '2rem', textShadow: '0 0 20px rgba(0,51,160,0.8)' }}>The Digital Ghost</h2>
            <p style={{ color: '#9a9ab0', fontSize: '1rem', marginBottom: '2rem' }}>
              Your skeleton is currently 12% populated. Connect data sources to build your Sovereign Identity.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', borderRadius: '8px' }}>
                Authorize OSINT Sweep (Basic)
              </button>
              <button onClick={() => setPhase('oracle')} style={{ padding: '1rem', background: '#0033a0', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold' }}>
                Speak to the Oracle (Voice Interview)
              </button>
            </div>
          </div>
        )}

        {phase === 'oracle' && (
          <div style={{ animation: 'fadeIn 1s' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)', margin: '0 auto 2rem', animation: 'pulse 2s infinite' }} />
            <h2 style={{ fontFamily: "'Cinzel', serif", color: '#c9a84c' }}>The Oracle is Listening...</h2>
            <p style={{ color: '#9a9ab0', fontStyle: 'italic' }}>"I see your ambition, but I sense your fatigue. Tell me, what is the largest obstacle currently blocking your path?"</p>
            <button onClick={() => setPhase('manifestation')} style={{ marginTop: '2rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #c9a84c', color: '#c9a84c', cursor: 'pointer' }}>
              [Skip to Manifestation for Demo]
            </button>
          </div>
        )}

        {phase === 'manifestation' && (
          <div style={{ animation: 'fadeIn 1s' }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", color: '#fff', fontSize: '3rem', textShadow: '0 0 30px #fff' }}>Sovereign Identity Forged</h1>
            <div style={{ margin: '2rem 0', padding: '2rem', background: 'rgba(201,168,76,0.1)', border: '1px solid #c9a84c', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.5rem', color: '#c9a84c', fontWeight: 'bold', fontFamily: "'Cinzel', serif" }}>Class: Esquire</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', fontFamily: 'monospace', color: '#4ade80' }}>
                <div>STR: 12</div>
                <div>CON: 14</div>
                <div>INT: 18</div>
                <div>WIS: 16</div>
              </div>
            </div>
            <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '1rem 3rem', background: '#c9a84c', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '1.2rem', fontFamily: "'Cinzel', serif" }}>
              Enter the Command Center
            </button>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.2); opacity: 1; } }
      `}</style>
    </div>
  );
}

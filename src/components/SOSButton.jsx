import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CRISIS_TYPES } from '../hooks/useWatch';

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '1rem', width: '100%', maxWidth: '480px', margin: '0 auto' },
  sosButton: { width: '100%', padding: '2.5rem 2rem', background: 'linear-gradient(145deg, var(--watch-red, #c44455), #8a2a38)', border: '3px solid var(--watch-gold, #c9a84c)', borderRadius: '16px', color: '#fff', fontSize: '1.5rem', fontFamily: 'Cinzel, serif', fontWeight: '700', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 8px 32px rgba(196, 68, 85, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)', textTransform: 'uppercase' },
  silentZone: { width: '100%', padding: '1rem', background: 'var(--watch-card, #0a0a1a)', border: '1px solid rgba(201, 168, 76, 0.2)', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' },
  silentText: { color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' },
  silentHint: { color: 'var(--watch-gold, #c9a84c)', fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.7 },
  crisisGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '100%' },
  crisisCard: { padding: '1.25rem', background: 'var(--watch-card, #0a0a1a)', border: '1px solid rgba(201, 168, 76, 0.3)', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' },
  crisisCardSelected: { borderColor: 'var(--watch-gold, #c9a84c)', background: 'rgba(201, 168, 76, 0.1)', boxShadow: '0 0 20px rgba(201, 168, 76, 0.2)' },
  crisisIcon: { fontSize: '2rem', marginBottom: '0.5rem' },
  crisisLabel: { color: '#fff', fontSize: '0.9rem', fontWeight: '600' },
  descInput: { width: '100%', padding: '1rem', background: 'var(--watch-card, #0a0a1a)', border: '1px solid rgba(201, 168, 76, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '1rem', resize: 'none' },
  charCount: { color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textAlign: 'right', marginTop: '0.25rem' },
  confirmButton: { width: '100%', padding: '1.25rem', background: 'var(--watch-red, #c44455)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontFamily: 'Cinzel, serif', fontWeight: '600', cursor: 'pointer' },
  backButton: { padding: '0.75rem 2rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', cursor: 'pointer' },
  locationStatus: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(58, 154, 106, 0.1)', border: '1px solid var(--watch-green, #3a9a6a)', borderRadius: '8px', color: 'var(--watch-green, #3a9a6a)', fontSize: '0.85rem' },
  locationError: { background: 'rgba(196, 68, 85, 0.1)', borderColor: 'var(--watch-red, #c44455)', color: 'var(--watch-red, #c44455)' },
  pulseRing: { position: 'absolute', width: '100%', height: '100%', borderRadius: '16px', border: '2px solid var(--watch-red, #c44455)', animation: 'pulse-ring 2s ease-out infinite' }
};

const keyframes = `@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.15); opacity: 0; } }`;

export function SOSButton({ onSOS, location, locationError, requestLocation, disabled = false }) {
  const [phase, setPhase] = useState('idle');
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [silentTaps, setSilentTaps] = useState(0);
  const silentTimerRef = useRef(null);

  const handleSilentTap = useCallback(() => {
    setSilentTaps(prev => {
      const newCount = prev + 1;
      if (silentTimerRef.current) clearTimeout(silentTimerRef.current);
      silentTimerRef.current = setTimeout(() => setSilentTaps(0), 2000);
      if (newCount >= 3) { setSelectedType('partner_removal'); setPhase('confirm'); setSilentTaps(0); return 0; }
      return newCount;
    });
  }, []);

  const handleSOSTrigger = () => { if (!location) { requestLocation(); return; } setPhase('select'); };
  const handleTypeSelect = (type) => { setSelectedType(type.id); setPhase('confirm'); };
  const handleConfirm = () => { if (selectedType && onSOS) { onSOS(selectedType, description); setPhase('idle'); setSelectedType(null); setDescription(''); } };
  const handleBack = () => { if (phase === 'confirm') { setPhase('select'); setSelectedType(null); } else setPhase('idle'); setDescription(''); };

  useEffect(() => { const style = document.createElement('style'); style.textContent = keyframes; document.head.appendChild(style); return () => document.head.removeChild(style); }, []);
  useEffect(() => { if (!location && !locationError) requestLocation(); }, []);

  if (phase === 'idle') {
    return (
      <div style={styles.container} data-testid="sos-container">
        <div style={{...styles.locationStatus, ...(locationError ? styles.locationError : {})}} data-testid="location-status">
          {location ? (<><span>📍</span><span>Location acquired ({location.accuracy.toFixed(0)}m)</span></>) : locationError ? (<><span>⚠️</span><span>{locationError}</span><button onClick={requestLocation} style={{marginLeft:'auto',background:'none',border:'none',color:'inherit',cursor:'pointer',textDecoration:'underline'}}>Retry</button></>) : (<><span>🔄</span><span>Acquiring location...</span></>)}
        </div>
        <div style={{position:'relative',width:'100%'}}><div style={styles.pulseRing}/><button style={styles.sosButton} onClick={handleSOSTrigger} disabled={disabled || !location} data-testid="sos-main-button">Request Peer Support</button></div>
        <div style={styles.silentZone} onClick={handleSilentTap} data-testid="silent-mode-trigger"><p style={styles.silentText}>{silentTaps > 0 ? `Tap ${3-silentTaps} more...` : 'Silent Mode Available'}</p><p style={styles.silentHint}>Tap 3x for domestic situations</p></div>
        <a href="tel:911" style={{color:'rgba(255,255,255,0.4)',fontSize:'0.85rem',textDecoration:'none',marginTop:'1rem'}} data-testid="emergency-911-link">For life-threatening emergencies, call 911</a>
      </div>
    );
  }

  if (phase === 'select') {
    return (
      <div style={styles.container} data-testid="crisis-type-selector">
        <h2 style={{color:'var(--watch-gold)',fontFamily:'Cinzel,serif',fontSize:'1.25rem',marginBottom:'0.5rem'}}>What kind of support do you need?</h2>
        <div style={styles.crisisGrid}>{CRISIS_TYPES.filter(t => !t.silent).map(type => (<div key={type.id} style={{...styles.crisisCard,...(selectedType===type.id?styles.crisisCardSelected:{})}} onClick={() => handleTypeSelect(type)} data-testid={`crisis-type-${type.id}`}><div style={styles.crisisIcon}>{type.icon}</div><div style={styles.crisisLabel}>{type.label}</div></div>))}</div>
        <button style={styles.backButton} onClick={handleBack} data-testid="back-button">← Back</button>
      </div>
    );
  }

  if (phase === 'confirm') {
    const typeInfo = CRISIS_TYPES.find(t => t.id === selectedType);
    return (
      <div style={styles.container} data-testid="sos-confirmation">
        <h2 style={{color:'var(--watch-gold)',fontFamily:'Cinzel,serif',fontSize:'1.25rem'}}>Confirm Request</h2>
        <div style={{...styles.crisisCard,...styles.crisisCardSelected,width:'100%'}}><div style={styles.crisisIcon}>{typeInfo?.icon}</div><div style={styles.crisisLabel}>{typeInfo?.label}</div><div style={{color:'rgba(255,255,255,0.6)',fontSize:'0.8rem',marginTop:'0.5rem'}}>{typeInfo?.desc}</div></div>
        <div style={{width:'100%'}}><textarea style={styles.descInput} placeholder="Additional details (optional)" value={description} onChange={(e) => setDescription(e.target.value.slice(0,200))} rows={3} data-testid="sos-description-input"/><div style={styles.charCount}>{description.length}/200</div></div>
        <div style={styles.locationStatus}><span>📍</span><span>{location?.lat.toFixed(5)}, {location?.lng.toFixed(5)}</span></div>
        <button style={styles.confirmButton} onClick={handleConfirm} data-testid="sos-confirm-button">Send Request Now</button>
        <button style={styles.backButton} onClick={handleBack} data-testid="back-button">← Change Type</button>
        <a href="tel:911" style={{color:'rgba(255,255,255,0.4)',fontSize:'0.85rem',textDecoration:'none'}} data-testid="emergency-911-link">For life-threatening emergencies, call 911</a>
      </div>
    );
  }
  return null;
}

export default SOSButton;

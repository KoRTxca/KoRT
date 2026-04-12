import React, { useState, useEffect } from 'react';
import { CRISIS_TYPES } from '../hooks/useWatch';

const styles = {
  container: { padding: '1.5rem', background: 'var(--watch-card, #0a0a1a)', border: '1px solid rgba(201, 168, 76, 0.3)', borderRadius: '16px', width: '100%', maxWidth: '480px', margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' },
  title: { color: 'var(--watch-gold, #c9a84c)', fontFamily: 'Cinzel, serif', fontSize: '1.1rem', fontWeight: '600' },
  statusBadge: { padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' },
  radarContainer: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  radar: { width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201, 168, 76, 0.1) 0%, transparent 70%)', border: '2px solid var(--watch-gold, #c9a84c)', position: 'relative', overflow: 'hidden' },
  radarSweep: { position: 'absolute', width: '50%', height: '50%', top: '50%', left: '50%', background: 'conic-gradient(from 0deg, transparent 0deg, var(--watch-gold, #c9a84c) 30deg, transparent 60deg)', transformOrigin: '0 0', animation: 'radar-sweep 3s linear infinite' },
  radarCenter: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--watch-red, #c44455)', boxShadow: '0 0 10px var(--watch-red)' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  infoLabel: { color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' },
  infoValue: { color: '#fff', fontSize: '0.85rem', fontWeight: '500' },
  knightInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(58, 154, 106, 0.1)', border: '1px solid var(--watch-green, #3a9a6a)', borderRadius: '12px', marginTop: '1rem' },
  knightAvatar: { width: '48px', height: '48px', borderRadius: '50%', background: 'var(--watch-gold, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
  knightName: { color: '#fff', fontSize: '1rem', fontWeight: '600' },
  knightStatus: { color: 'var(--watch-green, #3a9a6a)', fontSize: '0.85rem' },
  buttonRow: { display: 'flex', gap: '1rem', marginTop: '1.5rem' },
  cancelButton: { flex: 1, padding: '0.875rem', background: 'transparent', border: '1px solid rgba(196, 68, 85, 0.5)', borderRadius: '10px', color: 'var(--watch-red, #c44455)', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' },
  emergencyButton: { flex: 1, padding: '0.875rem', background: 'var(--watch-red, #c44455)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  timeElapsed: { color: 'var(--watch-gold, #c9a84c)', fontSize: '1.5rem', fontFamily: 'monospace', textAlign: 'center' }
};

const keyframes = `@keyframes radar-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

export function WatchStatus({ dispatch, onCancel, isResponder = false, knightProfile = null }) {
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    if (!dispatch?.created_at) return;
    const calcElapsed = () => {
      const start = new Date(dispatch.created_at);
      const diff = Math.floor((Date.now() - start) / 1000);
      setElapsed(`${Math.floor(diff/60).toString().padStart(2,'0')}:${(diff%60).toString().padStart(2,'0')}`);
    };
    calcElapsed();
    const interval = setInterval(calcElapsed, 1000);
    return () => clearInterval(interval);
  }, [dispatch?.created_at]);

  useEffect(() => { const style = document.createElement('style'); style.textContent = keyframes; document.head.appendChild(style); return () => document.head.removeChild(style); }, []);

  if (!dispatch) return null;
  const crisisType = CRISIS_TYPES.find(t => t.id === dispatch.crisis_type);
  const statusStyles = { pending: { background: 'rgba(201, 168, 76, 0.2)', color: 'var(--watch-gold)' }, assigned: { background: 'rgba(58, 154, 106, 0.2)', color: 'var(--watch-green)' }, responding: { background: 'rgba(58, 154, 106, 0.3)', color: 'var(--watch-green)' }, on_scene: { background: 'var(--watch-green)', color: '#fff' } };
  const statusLabels = { pending: 'Searching', assigned: 'Knight Assigned', responding: 'On Their Way', on_scene: 'On Scene' };

  return (
    <div style={styles.container} data-testid="watch-status-container">
      <div style={styles.header}><span style={styles.title}>Active Request</span><span style={{...styles.statusBadge,...statusStyles[dispatch.status]}} data-testid="dispatch-status-badge">{statusLabels[dispatch.status] || dispatch.status}</span></div>
      {dispatch.status === 'pending' && (<div style={styles.radarContainer}><div style={styles.radar}><div style={styles.radarSweep}/><div style={styles.radarCenter}/></div></div>)}
      <div style={{textAlign:'center',marginBottom:'1rem'}}><div style={styles.infoLabel}>Time Elapsed</div><div style={styles.timeElapsed} data-testid="time-elapsed">{elapsed}</div></div>
      <div style={styles.infoRow}><span style={styles.infoLabel}>Type</span><span style={styles.infoValue}>{crisisType?.icon} {crisisType?.label}</span></div>
      {dispatch.description && (<div style={styles.infoRow}><span style={styles.infoLabel}>Details</span><span style={styles.infoValue}>{dispatch.description}</span></div>)}
      <div style={styles.infoRow}><span style={styles.infoLabel}>Location</span><span style={styles.infoValue}>{dispatch.location_address || `${dispatch.location_lat?.toFixed(4)}, ${dispatch.location_lng?.toFixed(4)}`}</span></div>
      {dispatch.assigned_knight && !isResponder && (<div style={styles.knightInfo} data-testid="knight-info"><div style={styles.knightAvatar}>⚔️</div><div><div style={styles.knightName}>{knightProfile?.display_name || 'Knight Responder'}</div><div style={styles.knightStatus}>{dispatch.status === 'responding' ? 'On their way' : dispatch.status === 'on_scene' ? 'Has arrived' : 'Assigned'}</div></div></div>)}
      <div style={styles.buttonRow}>{!isResponder && dispatch.status !== 'on_scene' && (<button style={styles.cancelButton} onClick={onCancel} data-testid="cancel-request-button">Cancel Request</button>)}<a href="tel:911" style={styles.emergencyButton} data-testid="call-911-button">Call 911</a></div>
      {dispatch.police_involved && (<div style={{marginTop:'1rem',padding:'0.75rem',background:'rgba(196, 68, 85, 0.1)',border:'1px solid var(--watch-red)',borderRadius:'8px',color:'var(--watch-red)',fontSize:'0.85rem',textAlign:'center'}} data-testid="police-involved-warning">⚠️ This incident has been escalated to emergency services</div>)}
    </div>
  );
}

export default WatchStatus;

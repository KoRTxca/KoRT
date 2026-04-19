import React, { useState, useEffect, useRef } from 'react';
import { useWatch, CRISIS_TYPES } from '../hooks/usewatch';


const styles = {
  container: { padding: '1rem', width: '100%', maxWidth: '600px', margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1rem', background: 'var(--watch-card)', borderRadius: '12px', border: '1px solid rgba(201, 168, 76, 0.2)' },
  watchToggle: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  toggleLabel: { color: '#fff', fontSize: '1rem', fontFamily: 'Cinzel, serif' },
  toggleSwitch: { width: '56px', height: '28px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' },
  toggleSwitchActive: { background: 'var(--watch-green)' },
  toggleKnob: { position: 'absolute', top: '3px', left: '3px', width: '22px', height: '22px', borderRadius: '50%', background: '#fff', transition: 'all 0.3s' },
  toggleKnobActive: { left: '31px' },
  statusText: { fontSize: '0.85rem', fontWeight: '500' },
  dispatchList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  dispatchCard: { padding: '1.25rem', background: 'var(--watch-card)', border: '1px solid rgba(201, 168, 76, 0.3)', borderRadius: '12px' },
  dispatchUrgent: { borderColor: 'var(--watch-red)', boxShadow: '0 0 20px rgba(196, 68, 85, 0.2)' },
  dispatchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' },
  dispatchType: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  dispatchIcon: { fontSize: '1.5rem' },
  dispatchLabel: { color: '#fff', fontSize: '1rem', fontWeight: '600' },
  distanceBadge: { padding: '0.25rem 0.5rem', background: 'rgba(201, 168, 76, 0.2)', borderRadius: '6px', color: 'var(--watch-gold)', fontSize: '0.75rem', fontWeight: '600' },
  dispatchMeta: { display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' },
  dispatchDesc: { color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.4' },
  acceptButton: { width: '100%', padding: '0.875rem', background: 'var(--watch-green)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', fontWeight: '600', fontFamily: 'Cinzel, serif', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '3rem 1rem', color: 'rgba(255,255,255,0.4)' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 },
  activeDispatch: { padding: '1.5rem', background: 'var(--watch-card)', border: '2px solid var(--watch-green)', borderRadius: '16px', marginBottom: '1.5rem' },
  mapContainer: { width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', background: '#1a1a2e' },
  statusButtons: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' },
  statusButton: { padding: '0.75rem', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer' },
  notesInput: { width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', marginTop: '1rem', resize: 'none' }
};

export function ResponderDashboard({ responderActive, onToggleActive, availableDispatches, activeDispatch, onAccept, onUpdateStatus, userLocation }) {
  const [notes, setNotes] = useState('');
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  useEffect(() => {
    if (!activeDispatch || !mapRef.current) return;
    const loadLeaflet = async () => {
      if (!window.L) {
        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
        await new Promise(r => { const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload = r; document.head.appendChild(s); });
      }
      if (leafletMapRef.current) leafletMapRef.current.remove();
      const L = window.L;
      const map = L.map(mapRef.current).setView([activeDispatch.location_lat, activeDispatch.location_lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);
      L.marker([activeDispatch.location_lat, activeDispatch.location_lng], { icon: L.divIcon({ html: '<div style="background:#c44455;width:20px;height:20px;border-radius:50%;border:3px solid #fff;"></div>', iconSize: [20,20] }) }).addTo(map);
      if (userLocation) { L.marker([userLocation.lat, userLocation.lng], { icon: L.divIcon({ html: '<div style="background:#3a9a6a;width:16px;height:16px;border-radius:50%;border:2px solid #fff;"></div>', iconSize: [16,16] }) }).addTo(map); map.fitBounds([[activeDispatch.location_lat, activeDispatch.location_lng], [userLocation.lat, userLocation.lng]], { padding: [30,30] }); }
      leafletMapRef.current = map;
    };
    loadLeaflet();
    return () => { if (leafletMapRef.current) { leafletMapRef.current.remove(); leafletMapRef.current = null; } };
  }, [activeDispatch, userLocation]);

  const formatTimeAgo = (ts) => { const d = Math.floor((Date.now() - new Date(ts)) / 1000); return d < 60 ? `${d}s ago` : d < 3600 ? `${Math.floor(d/60)}m ago` : `${Math.floor(d/3600)}h ago`; };
  const handleStatusUpdate = (s) => { if (s === 'resolved' || s === 'escalated') { onUpdateStatus(s, notes); setNotes(''); } else onUpdateStatus(s); };

  return (
    <div style={styles.container} data-testid="responder-dashboard">
      <div style={styles.header}>
        <div style={styles.watchToggle}><span style={styles.toggleLabel}>{responderActive ? 'On Watch' : 'Off Watch'}</span><button style={{...styles.toggleSwitch, ...(responderActive ? styles.toggleSwitchActive : {})}} onClick={onToggleActive} data-testid="watch-toggle"><div style={{...styles.toggleKnob, ...(responderActive ? styles.toggleKnobActive : {})}}/></button></div>
        <span style={{...styles.statusText, color: responderActive ? 'var(--watch-green)' : 'rgba(255,255,255,0.4)'}}>{responderActive ? '● Active' : '○ Inactive'}</span>
      </div>
      {activeDispatch && (
        <div style={styles.activeDispatch} data-testid="active-dispatch">
          <div style={styles.dispatchHeader}><div style={styles.dispatchType}><span style={styles.dispatchIcon}>{CRISIS_TYPES.find(t => t.id === activeDispatch.crisis_type)?.icon}</span><span style={styles.dispatchLabel}>{CRISIS_TYPES.find(t => t.id === activeDispatch.crisis_type)?.label}</span></div><span style={{padding:'0.25rem 0.75rem',background:'var(--watch-green)',borderRadius:'12px',color:'#fff',fontSize:'0.75rem',fontWeight:'600',textTransform:'uppercase'}}>{activeDispatch.status.replace('_',' ')}</span></div>
          <div style={styles.mapContainer} ref={mapRef} data-testid="dispatch-map"/>
          <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.85rem',marginBottom:'0.5rem'}}>📍 {activeDispatch.location_address || `${activeDispatch.location_lat?.toFixed(5)}, ${activeDispatch.location_lng?.toFixed(5)}`}</div>
          {activeDispatch.description && <div style={styles.dispatchDesc}>"{activeDispatch.description}"</div>}
          <div style={styles.statusButtons}>
            {activeDispatch.status === 'assigned' && <button style={{...styles.statusButton,background:'var(--watch-gold)',color:'#000'}} onClick={() => handleStatusUpdate('responding')} data-testid="en-route-button">En Route</button>}
            {activeDispatch.status === 'responding' && <button style={{...styles.statusButton,background:'var(--watch-green)',color:'#fff'}} onClick={() => handleStatusUpdate('on_scene')} data-testid="on-scene-button">On Scene</button>}
            {activeDispatch.status === 'on_scene' && <button style={{...styles.statusButton,background:'rgba(58, 154, 106, 0.2)',border:'1px solid var(--watch-green)',color:'var(--watch-green)'}} onClick={() => handleStatusUpdate('resolved')} data-testid="resolve-button">Resolved</button>}
            <button style={{...styles.statusButton,background:'rgba(196, 68, 85, 0.2)',border:'1px solid var(--watch-red)',color:'var(--watch-red)'}} onClick={() => handleStatusUpdate('escalated')} data-testid="escalate-button">Escalate to 911</button>
          </div>
          {activeDispatch.status === 'on_scene' && <textarea style={styles.notesInput} placeholder="Incident notes..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} data-testid="incident-notes"/>}
        </div>
      )}
      {!activeDispatch && responderActive && (
        <div style={styles.dispatchList} data-testid="dispatch-list">
          {availableDispatches.length === 0 ? (<div style={styles.emptyState}><div style={styles.emptyIcon}>⚔️</div><p>No active requests</p><p style={{fontSize:'0.85rem',marginTop:'0.5rem'}}>You'll be notified when someone needs support</p></div>) : (
            availableDispatches.map(d => {
              const ct = CRISIS_TYPES.find(t => t.id === d.crisis_type);
              return (
                <div key={d.id} style={{...styles.dispatchCard, ...(d.crisis_type === 'substance' || d.crisis_type === 'partner_removal' ? styles.dispatchUrgent : {})}} data-testid={`dispatch-card-${d.id}`}>
                  <div style={styles.dispatchHeader}><div style={styles.dispatchType}><span style={styles.dispatchIcon}>{ct?.icon}</span><span style={styles.dispatchLabel}>{ct?.label}</span></div>{d.distance !== null && <span style={styles.distanceBadge}>{d.distance < 1 ? `${(d.distance*1000).toFixed(0)}m` : `${d.distance.toFixed(1)}km`}</span>}</div>
                  <div style={styles.dispatchMeta}><span>🕐 {formatTimeAgo(d.created_at)}</span><span>📍 {d.location_address || 'GPS'}</span></div>
                  {d.description && <div style={styles.dispatchDesc}>"{d.description}"</div>}
                  <button style={styles.acceptButton} onClick={() => onAccept(d.id)} data-testid={`accept-dispatch-${d.id}`}>Accept Dispatch</button>
                </div>
              );
            })
          )}
        </div>
      )}
      {!responderActive && <div style={styles.emptyState}><div style={styles.emptyIcon}>🛡️</div><p>You are currently off watch</p><p style={{fontSize:'0.85rem',marginTop:'0.5rem'}}>Toggle "On Watch" to receive requests</p></div>}
    </div>
  );
}

export default ResponderDashboard;

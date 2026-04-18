import React, { useState, useEffect } from 'react';
import { Lock, Save, ShieldAlert, Key } from 'lucide-react';

const Settings = () => {
  const [keys, setKeys] = useState({
    supabase_url: '',
    supabase_anon_key: '',
    anthropic_key: '',
    grok_key: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sovereign_vault');
    if (saved) {
      setKeys(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('sovereign_vault', JSON.stringify(keys));
    setStatus('VAULT SEALED. SOVEREIGNTY SECURED.');
    setTimeout(() => setStatus(''), 3000);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--glass-border)',
    color: 'var(--silver)',
    padding: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    marginBottom: '1rem',
    outline: 'none',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10vh 2rem' }}>
      <div className="fade-in">
        <h2 className="title-heavy serif">The <span className="gold-text">Vault</span></h2>
        <p className="title-sub">Secure API Key & Sovereignty Management</p>

        <div className="glass-panel" style={{ border: '1px solid var(--crimson)', background: 'rgba(153,27,27,0.05)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <ShieldAlert className="crimson-text" size={20} />
            <h4 className="mono uppercase tracking-widest crimson-text" style={{ fontSize: '0.7rem' }}>Sovereign Protocol Active</h4>
          </div>
          <p className="mono" style={{ fontSize: '0.65rem', color: 'var(--silver)', opacity: 0.8 }}>
            Keys entered here are stored **strictly in your local browser storage**. 
            They never traverse the network or touch a central server. This is your baseline for data sovereignty.
          </p>
        </div>

        <div className="glass-panel">
          <label className="mono uppercase gold-text" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '0.5rem' }}>Supabase URL</label>
          <input 
            type="text" 
            placeholder="https://xxx.supabase.co"
            value={keys.supabase_url}
            onChange={(e) => setKeys({...keys, supabase_url: e.target.value})}
            style={inputStyle}
          />

          <label className="mono uppercase gold-text" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '0.5rem' }}>Supabase Anon Key</label>
          <input 
            type="password" 
            placeholder="eyJ..."
            value={keys.supabase_anon_key}
            onChange={(e) => setKeys({...keys, supabase_anon_key: e.target.value})}
            style={inputStyle}
          />

          <hr style={{ border: '0', borderTop: '1px solid var(--glass-border)', margin: '2rem 0' }} />

          <label className="mono uppercase gold-text" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '0.5rem' }}>Anthropic API Key</label>
          <input 
            type="password" 
            placeholder="sk-ant-..."
            value={keys.anthropic_key}
            onChange={(e) => setKeys({...keys, anthropic_key: e.target.value})}
            style={inputStyle}
          />

          <label className="mono uppercase gold-text" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '0.5rem' }}>Grok (X.AI) API Key</label>
          <input 
            type="password" 
            placeholder="grok-..."
            value={keys.grok_key}
            onChange={(e) => setKeys({...keys, grok_key: e.target.value})}
            style={inputStyle}
          />

          <button className="btn-sovereign" style={{ width: '100%', marginTop: '1rem' }} onClick={handleSave}>
            <Save size={16} style={{ marginRight: '0.5rem' }} /> Seal Vault
          </button>

          {status && (
            <p className="mono gold-text fade-in" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.7rem' }}>{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

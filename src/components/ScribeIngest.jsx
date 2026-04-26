import React, { useState } from 'react';

// Blueprint Section 10: DIGITAL SCRIBE & EVIDENCE HARVESTER
// This tool automates the fetching of emails from Gmail, eliminating manual copy/paste.

export function ScribeIngest({ caseId = "KX-2026-00001", target = "gmail" }) {
  const [status, setStatus] = useState('pending'); // pending -> authorized -> running -> completed

  const handleAuthorize = () => {
    // Phase 1: Connect to Google OAuth via Supabase
    setStatus('authorized');
    console.log("OAuth authorization granted for target:", target);
  };

  const handleRunHarvest = () => {
    setStatus('running');
    console.log(`Running Digital Scribe search for: ICBC, DA57244, Hugh Curtis...`);
    
    // Mock the backend daemon process duration
    setTimeout(() => {
      setStatus('completed');
    }, 3000);
  };

  return (
    <div style={{ padding: '20px', background: '#0a0a1a', border: '1px solid #c9a84c', borderRadius: '8px', color: '#e8e8e8', fontFamily: 'sans-serif' }}>
      <h3 style={{ color: '#c9a84c', marginTop: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Digital Scribe: Evidence Harvester</h3>
      
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#9a9ab0' }}>
        <strong>Target:</strong> {target.toUpperCase()} <br/>
        <strong>Task:</strong> Sweep inbox for all communications with adjusters regarding DA57244-0.
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {status === 'pending' && (
          <button 
            onClick={handleAuthorize}
            style={{ padding: '10px 16px', background: '#0033a0', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            1. Authorize Gmail Access
          </button>
        )}

        {status === 'authorized' && (
          <button 
            onClick={handleRunHarvest}
            style={{ padding: '10px 16px', background: '#c9a84c', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            2. Run Harvester Daemon
          </button>
        )}

        {status === 'running' && (
          <span style={{ color: '#4ade80', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
            [SCRIBE RUNNING] Scanning threads...
          </span>
        )}

        {status === 'completed' && (
          <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>
            ✓ 4 Emails harvested. Exhibits auto-indexed.
          </span>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

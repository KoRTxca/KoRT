import React, { useState } from 'react'

const AGENT_CLASSES = [
  'Vanguard', 'Scribe', 'Advocate', 'Harvester', 'Warden', 
  'Sentinel', 'Forger', 'Weaver', 'Architect', 'Oracle'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-area">
          <h1>MISSION CONTROL</h1>
          <p>QUANTUM AURUM 2.0</p>
        </div>
        
        <nav className="main-nav">
          <a href="#" onClick={() => setActiveTab('Overview')} className={`nav-item ${activeTab === 'Overview' ? 'active' : ''}`}>
            <span>📊</span> Kingdom Overview
          </a>
          <a href="#" onClick={() => setActiveTab('Agents')} className={`nav-item ${activeTab === 'Agents' ? 'active' : ''}`}>
            <span>👥</span> AI Workforce (133)
          </a>
          <a href="#" onClick={() => setActiveTab('Treasury')} className={`nav-item ${activeTab === 'Treasury' ? 'active' : ''}`}>
            <span>💰</span> Sovereign Ledger
          </a>
          <a href="#" onClick={() => setActiveTab('Claw')} className={`nav-item ${activeTab === 'Claw' ? 'active' : ''}`}>
            <span>🦾</span> KoRT_Claw Console
          </a>
          <a href="#" onClick={() => setActiveTab('Infrastructure')} className={`nav-item ${activeTab === 'Infrastructure' ? 'active' : ''}`}>
            <span>🌐</span> Infra & DNS
          </a>
        </nav>

        <div className="sso-card">
          <p className="label">SSO IDENTITY</p>
          <p className="name">KING AUTHORIZED</p>
          <p className="balance">1,250.00 DD</p>
        </div>
      </aside>

      <main className="viewport">
        <header className="top-bar">
          <div className="breadcrumb">
            <span style={{opacity: 0.5}}>Mission Control</span> / <strong>{activeTab}</strong>
          </div>
          <div className="status-badge">
            <div className="pulse"></div>
            SYSTEM STATE: OMNI-STABLE
          </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="tab-content">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Sovereign Velocity</h3>
                <div className="value">98.4%</div>
                <p style={{fontSize: '0.7rem', color: '#00ff88'}}>+2.1% from prev cycle</p>
              </div>
              <div className="metric-card">
                <h3>Active Node Count</h3>
                <div className="value">133 / 133</div>
                <p style={{fontSize: '0.7rem', color: 'var(--cyan)'}}>Quorum Established</p>
              </div>
              <div className="metric-card">
                <h3>Treasury Balance</h3>
                <div className="value">1.25M DD</div>
                <p style={{fontSize: '0.7rem', color: 'var(--gold)'}}>Reserve: 500k DD</p>
              </div>
            </div>

            <h2 style={{fontFamily: 'var(--font-accent)', marginBottom: '1.5rem', color: 'var(--gold)'}}>🚀 Recent Activity</h2>
            <div className="activity-card">
              <ul className="activity-list">
                <li className="activity-item">
                  <span className="timestamp">[13:42]</span> <span><strong>KoRT_Claw:</strong> Successfully provisioned WHMCS AISO module.</span>
                </li>
                <li className="activity-item">
                  <span className="timestamp">[13:30]</span> <span><strong>Sentinel:</strong> Security audit complete. No breaches detected.</span>
                </li>
                <li className="activity-item">
                  <span className="timestamp">[13:15]</span> <span><strong>Sovereign Ledger:</strong> 500.00 DD minted to Treasury Reserve.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Agents' && (
          <div className="tab-content">
            <div className="agent-grid">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="agent-card">
                  <div className="role">{AGENT_CLASSES[i % AGENT_CLASSES.length]}</div>
                  <div className="name">Agent-{100 + i}</div>
                  <div className="status">
                    <div className={`dot ${i % 5 === 0 ? 'idle' : 'online'}`}></div>
                    <span>{i % 5 === 0 ? 'IDLE' : 'ACTIVE'}</span>
                  </div>
                </div>
              ))}
              <div className="agent-card" style={{gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5}}>
                + 93 more agents standby...
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

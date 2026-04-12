import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ClaudeStyles.css';

export default function SubmitApp() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', appName: '', appUrl: '', category: '', referralCode: '', description: '', chainDepth: '1', canada: 'yes', extraNotes: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: false });
    }
  };

  const submitApp = () => {
    let newErrors = {};
    const required = ['name', 'email', 'appName', 'appUrl', 'referralCode'];
    required.forEach(req => {
      if (!formData[req].trim()) {
        newErrors[req] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { name, email, appName, appUrl, category, referralCode, description, chainDepth, canada, extraNotes } = formData;
    
    const subject = encodeURIComponent(`[KoRT App Submission] ${appName}`);
    const body = encodeURIComponent(
      `App: ${appName}\nURL: ${appUrl}\nCategory: ${category}\nReferral: ${referralCode}\nChain: ${chainDepth}\nCanada: ${canada}\n\nDescription:\n${description}\n\nNotes:\n${extraNotes}\n\nSubmitted by: ${name} (${email})`
    );
    
    window.open(`mailto:hello@kortx.ca?subject=${subject}&body=${body}`, '_blank');
    
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="claude-page-container">
      <div className="claude-topbar">
        <Link to="/digital-dollars" className="topbar-back">← Back to Digital Dollars</Link>
        <div className="topbar-brand">SUBMIT AN APP</div>
      </div>

      <div className="claude-page-wrap">
        <h1>⚔️ Bring a New Weapon to the Table</h1>
        <p className="subtitle">Found an app that pays? Submit it to the KoRT stack. If we add it, YOUR referral code goes in — and every future member who signs up earns YOU money.</p>

        {!submitted ? (
          <>
            {/* HOW IT WORKS */}
            <div className="how-it-works">
              <h2>HOW IT WORKS</h2>
              <div className="step-row">
                <div className="step-circle">1</div>
                <div className="step-text">
                  <strong>You find an app that pays</strong>
                  <p>Cashback, surveys, games, passive earning, banking — anything that puts money in people's pockets and has a referral program.</p>
                </div>
              </div>
              <div className="step-row">
                <div className="step-circle">2</div>
                <div className="step-text">
                  <strong>You submit it here with YOUR referral code</strong>
                  <p>Tell us the app name, what it does, how it pays, and your referral link or code.</p>
                </div>
              </div>
              <div className="step-row">
                <div className="step-circle">3</div>
                <div className="step-text">
                  <strong>The Round Table reviews it</strong>
                  <p>We verify it's legit, test the payout, and check the referral structure. If it passes, it goes into the Digital Dollars stack.</p>
                </div>
              </div>
              <div className="step-row">
                <div className="step-circle">4</div>
                <div className="step-text">
                  <strong>YOUR code goes live on the earning guide</strong>
                  <p>Every future KoRT member who signs up for that app goes through YOUR referral link. As membership grows, your passive income grows with it.</p>
                </div>
              </div>
            </div>

            {/* REWARD BOX */}
            <div className="reward-box">
              <h2>THE UPSIDE</h2>
              <div className="big-number">∞</div>
              <p>There's no cap. If 1,000 members sign up for the app you submitted, you earn referral bonuses on all 1,000. You brought the weapon — you get credit for every Knight who wields it.</p>
            </div>

            {/* SUBMISSION FORM */}
            <div className="form-section">
              <h2>SUBMIT YOUR APP</h2>

              <div className="field">
                <label>YOUR NAME / KORT HANDLE</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} style={{ borderColor: errors.name ? '#cc4444' : '#1a1a3a' }} placeholder="e.g. TheXception" required />
              </div>

              <div className="field">
                <label>YOUR EMAIL</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} style={{ borderColor: errors.email ? '#cc4444' : '#1a1a3a' }} placeholder="your@email.com" required />
              </div>

              <div className="field">
                <label>APP / PLATFORM NAME</label>
                <input type="text" id="appName" value={formData.appName} onChange={handleChange} style={{ borderColor: errors.appName ? '#cc4444' : '#1a1a3a' }} placeholder="e.g. CashKarma, KOHO, Mistplay" required />
              </div>

              <div className="field">
                <label>APP WEBSITE URL</label>
                <input type="url" id="appUrl" value={formData.appUrl} onChange={handleChange} style={{ borderColor: errors.appUrl ? '#cc4444' : '#1a1a3a' }} placeholder="https://..." required />
              </div>

              <div className="field">
                <label>CATEGORY</label>
                <select id="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select a category</option>
                  <option value="banking">Banking / Fintech</option>
                  <option value="cashback">Cashback / Shopping</option>
                  <option value="surveys">Surveys / Tasks</option>
                  <option value="gaming">Gaming Rewards</option>
                  <option value="passive">Passive / Background Earning</option>
                  <option value="streaming">Streaming / Content</option>
                  <option value="investing">Investing / Crypto</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="field">
                <label>YOUR REFERRAL LINK OR CODE</label>
                <input type="text" id="referralCode" value={formData.referralCode} onChange={handleChange} style={{ borderColor: errors.referralCode ? '#cc4444' : '#1a1a3a' }} placeholder="Your referral link or code for this app" required />
                <div className="hint">This is the link/code that will go into the KoRT Digital Dollars stack if approved.</div>
              </div>

              <div className="field">
                <label>HOW DOES IT PAY? WHAT DOES A NEW USER EARN?</label>
                <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe: what does the app do? How much can someone earn? What's the referral bonus for new signups? Is it Canada-only or worldwide?"></textarea>
              </div>

              <div className="field">
                <label>DOES THE REFERRAL CHAIN GO DEEPER THAN 1 LEVEL?</label>
                <select id="chainDepth" value={formData.chainDepth} onChange={handleChange}>
                  <option value="1">1 level — I earn on direct signups only</option>
                  <option value="2">2 levels — I earn on my referrals' referrals too</option>
                  <option value="3+">3+ levels — multi-tier referral chain</option>
                  <option value="unknown">I'm not sure</option>
                </select>
                <div className="hint">Multi-level referral apps are gold for KoRT. If your referrals' referrals earn you money, this app could be a top-tier addition.</div>
              </div>

              <div className="field">
                <label>AVAILABLE IN CANADA?</label>
                <select id="canada" value={formData.canada} onChange={handleChange}>
                  <option value="yes">Yes — works in Canada</option>
                  <option value="us-only">US only</option>
                  <option value="worldwide">Worldwide</option>
                  <option value="unknown">Not sure</option>
                </select>
              </div>

              <div className="field">
                <label>ANYTHING ELSE WE SHOULD KNOW?</label>
                <textarea id="extraNotes" value={formData.extraNotes} onChange={handleChange} placeholder="Payout methods, minimum thresholds, platform (Android/iOS/web), any catches..."></textarea>
              </div>

              <button className="submit-btn" onClick={submitApp}>SUBMIT TO THE ROUND TABLE</button>
            </div>
          </>
        ) : (
          <div className="success-msg" style={{ display: 'block' }}>
            <div className="check">⚔️</div>
            <strong>Submission received.</strong><br/>
            The Round Table will review your app. If approved, your referral code goes live on the Digital Dollars earning guide — and every future member who signs up through it earns you money.<br/><br/>
            <em>You'll be notified by email when we make a decision.</em>
          </div>
        )}

        {/* EXAMPLES */}
        <div className="examples">
          <h3>APPS ALREADY IN THE STACK</h3>
          <div className="example-grid">
            <div className="example-card"><div className="name">KOHO</div><div className="type">Banking / Fintech</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">Mistplay</div><div className="type">Gaming Rewards</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">AttaPoll</div><div className="type">Surveys</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">CashKarma</div><div className="type">Rewards</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">BestPlay</div><div className="type">Gaming Rewards</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">GemSloot</div><div className="type">Gaming</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">Tango</div><div className="type">Streaming</div><div className="status">✅ LIVE</div></div>
            <div className="example-card"><div className="name">Survey Spin</div><div className="type">Surveys</div><div className="status">✅ LIVE</div></div>
          </div>
        </div>

      </div>

      <footer>
        <strong>Knights of the Round Table</strong> — kortx.ca<br/>
        No one gets left behind.
      </footer>
    </div>
  );
}

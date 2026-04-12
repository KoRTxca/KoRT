import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ViralInviteEngine from '../components/viralinviteengine'
import './ClaudeStyles.css';

export default function DigitalDollars() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((el, i) => {
        if (el.isIntersecting) {
          el.target.style.transition = `opacity 0.5s ${i * 0.06}s, transform 0.5s ${i * 0.06}s`;
          el.target.style.opacity = '1';
          el.target.style.transform = 'translateY(0)';
          observer.unobserve(el.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.app-card, .cashout-item');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="claude-page-container">
      <div className="claude-topbar">
        <Link to="/" className="topbar-back">← Back to KoRT</Link>
        <div className="topbar-brand">THE TREASURY</div>
      </div>

      <div className="hero">
        <div className="hero-icon">💰</div>
        <h1>Digital Dollars</h1>
        <p className="hero-sub">Earn real money. Fund your community. Every dollar you make strengthens the Round Table.</p>
      </div>

      <div className="split-box">
        <div className="split-title">HOW THE SPLIT WORKS</div>
        <div className="split-bar">
          <div className="split-you">60% — YOU</div>
          <div className="split-pool">40% — ROUND TABLE</div>
        </div>
        <p className="split-explain">You earn <strong>$10</strong>. You keep <strong>$6</strong>. The other <strong>$4</strong> goes into the Community Pool — and the Pool pays <strong>you back</strong> from everyone else's activity. The more members earning, the more everyone makes.</p>
      </div>

      <div className="section">
        <div className="quick-stack">
          <h3>⚡ The Quick Stack — $50+ in 48 Hours</h3>
          <p>New to Digital Dollars? Follow this exact sequence.</p>
          <div className="stack-step">
            <div className="step-num">1</div>
            <div>
              <div className="step-name">KOHO — Free prepaid Mastercard <span className="status-badge status-live">LIVE</span></div>
              <div className="step-detail">Sign up, make one $20 purchase, get $20-$40 bonus. Takes 10 minutes.</div>
            </div>
          </div>
          <div className="stack-step">
            <div className="step-num">2</div>
            <div>
              <div className="step-name">Mistplay — Earn playing games <span className="status-badge status-live">LIVE</span></div>
              <div className="step-detail">Android. Play games, earn points, redeem for gift cards.</div>
            </div>
          </div>
          <div className="stack-step">
            <div className="step-num">3</div>
            <div>
              <div className="step-name">AttaPoll — Quick surveys <span className="status-badge status-live">LIVE</span></div>
              <div className="step-detail">Short surveys, cash out to PayPal. $1-5/day.</div>
            </div>
          </div>
          <div className="stack-step">
            <div className="step-num">4</div>
            <div>
              <div className="step-name">Survey Spin — Bonus survey <span className="status-badge status-live">LIVE</span></div>
              <div className="step-detail">$1.20 bonus survey just for signing up with code C66GQI.</div>
            </div>
          </div>
          <div className="stack-step">
            <div className="step-num">5</div>
            <div>
              <div className="step-name">CashKarma — Rewards app <span className="status-badge status-live">LIVE</span></div>
              <div className="step-detail">Surveys, offers, tasks. Redeem for gift cards and PayPal.</div>
            </div>
          </div>
        </div>

        <div className="compound-box">
          <h3>🔄 How Compound Earning Works</h3>
          <p style={{ color: 'var(--text-dim)' }}>This isn't just about what YOU earn — it's about the whole Round Table.</p>
          <div className="compound-example">
            <strong>You</strong> earn <strong>$50</strong> in bonuses. Your <strong>60%</strong> = <span className="hl">$30 in your wallet</span>.<br/>
            The <strong>40%</strong> = $20 into the Community Pool.<br/><br/>
            <strong>49 other members</strong> did the same thing. Pool total: <strong>$980</strong>.<br/>
            Your share of the pool: <span className="hl">$19.60</span>.<br/><br/>
            <strong>Your actual take: $49.60</strong> — because everyone's 40% comes back around.
          </div>
        </div>
      </div>

      {/* BANK STACK */}
      <div className="section">
        <div className="section-header">BANK REFERRAL STACK</div>
        <p className="section-sub">Highest-paying signups. Free accounts, real cash bonuses. Canada only.</p>
        <div className="app-grid">
          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">🏦</div>
              <div>
                <div className="app-name">KOHO <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Prepaid Mastercard + Cashback + Credit Building</div>
              </div>
            </div>
            <p className="app-desc">Free prepaid Mastercard that pays you. Cashback on every purchase, high-interest savings, credit building with no credit check. Up to 50 referrals = $1,000 cap.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $20-$40 bonus</span>
              <span className="stat-chip">⏱ 10 min</span>
              <span className="stat-chip">🔄 Up to 5% cashback</span>
              <span className="stat-chip green">🎯 KoRT: $20-$30/ref</span>
            </div>
            <a href="https://referral.koho.ca/mzIA8a5" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>
          
          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">🍊</div>
              <div>
                <div className="app-name">Tangerine <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">No-fee online banking</div>
              </div>
            </div>
            <p className="app-desc">One of Canada's highest referral payouts. Open a free account, set up a direct deposit, both you and KoRT earn $50.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $50-$100 bonus</span>
              <span className="stat-chip">🏦 No fees</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">💳</div>
              <div>
                <div className="app-name">Neo Financial <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">Cashback card + savings</div>
              </div>
            </div>
            <p className="app-desc">Cashback at thousands of partners. No annual fee. Instant virtual card. $25 bonus through KoRT.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $25 bonus</span>
              <span className="stat-chip">🔄 Up to 5% cashback</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">🔵</div>
              <div>
                <div className="app-name">Simplii Financial <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">No-fee banking by CIBC</div>
              </div>
            </div>
            <p className="app-desc">Backed by CIBC. No monthly fees. Free CIBC ATMs. $50 referral bonus both ways.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $50 bonus</span>
              <span className="stat-chip">🏧 CIBC ATMs</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">📈</div>
              <div>
                <div className="app-name">Wealthsimple <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">Investing + Crypto + Cash Card</div>
              </div>
            </div>
            <p className="app-desc">Canada's most popular investing app. $25 bonus after first deposit.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $25 bonus</span>
              <span className="stat-chip">📊 Commission-free</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">🏦</div>
              <div>
                <div className="app-name">EQ Bank <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">High-interest savings</div>
              </div>
            </div>
            <p className="app-desc">One of Canada's highest savings rates. No monthly fees, unlimited transactions, free Interac.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $20-$30 bonus</span>
              <span className="stat-chip">💰 High interest</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>
        </div>
      </div>

      {/* EARNING APPS */}
      <div className="section">
        <div className="section-header">EARNING APPS</div>
        <p className="section-sub">Surveys, games, rewards. Earn on your phone while you wait, ride the bus, or wind down.</p>
        <div className="app-grid">
          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">🎮</div>
              <div>
                <div className="app-name">Mistplay <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Earn playing games (Android)</div>
              </div>
            </div>
            <p className="app-desc">Play games on your phone, earn points, redeem for gift cards. Android only. Perfect for downtime.</p>
            <div className="app-stats">
              <span className="stat-chip">📱 Android</span>
              <span className="stat-chip">🎁 Gift cards</span>
            </div>
            <a href="https://mistplay.onelink.me/ZGRQ/2jh95s8y" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">🏆</div>
              <div>
                <div className="app-name">BestPlay <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Mobile gaming rewards</div>
              </div>
            </div>
            <p className="app-desc">Like Mistplay — play games, earn rewards. 200,000 bonus coins with KoRT link. Stack with Mistplay.</p>
            <div className="app-stats">
              <span className="stat-chip green">🎁 200K bonus coins</span>
              <span className="stat-chip">🎮 Play to earn</span>
            </div>
            <a href="https://bestplay.onelink.me/IZ8a/6n85wno3" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">📋</div>
              <div>
                <div className="app-name">AttaPoll <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Quick paid surveys</div>
              </div>
            </div>
            <p className="app-desc">Short surveys, cash out to PayPal. 2-5 min each. Stacks well with everything else.</p>
            <div className="app-stats">
              <span className="stat-chip">💵 PayPal cashout</span>
              <span className="stat-chip">⏱ 2-5 min</span>
            </div>
            <a href="https://attapoll.app/join/xdmdn" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">🔄</div>
              <div>
                <div className="app-name">Survey Spin <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Paid surveys</div>
              </div>
            </div>
            <p className="app-desc">$1.20 bonus survey immediately on signup with KoRT code. Quick first-dollar earner.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $1.20 instant</span>
              <span className="stat-chip">🏷️ Code: C66GQI</span>
            </div>
            <a href="https://surveyspin.page.link/DTcappYEh3ZBBmweASR2T8B" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">💎</div>
              <div>
                <div className="app-name">CashKarma <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Rewards app</div>
              </div>
            </div>
            <p className="app-desc">Surveys, offers, daily tasks. Redeem for PayPal cash and gift cards.</p>
            <div className="app-stats">
              <span className="stat-chip">🎁 Gift cards + PayPal</span>
            </div>
            <a href="https://cashkar.ma/Q2wiZO3qN0b" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">💎</div>
              <div>
                <div className="app-name">GemSloot <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Gaming rewards</div>
              </div>
            </div>
            <p className="app-desc">Earn rewards through gaming. KoRT affiliate link for direct access.</p>
            <div className="app-stats">
              <span className="stat-chip">🎮 Gaming</span>
              <span className="stat-chip green">🔗 aff=kort</span>
            </div>
            <a href="https://gemsloot.com/?aff=kort" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>

          <div className="app-card live">
            <div className="app-top">
              <div className="app-icon">🎙️</div>
              <div>
                <div className="app-name">Tango <span className="status-badge status-live">LIVE</span></div>
                <div className="app-type">Live streaming + coins</div>
              </div>
            </div>
            <p className="app-desc">Live-streaming platform. Earn bonus coins signing up through KoRT. Stream or watch to earn.</p>
            <div className="app-stats">
              <span className="stat-chip green">🎁 Bonus coins</span>
              <span className="stat-chip">📱 Stream/watch</span>
            </div>
            <a href="https://tango.onelink.me/RCIH/igsme4lt" className="app-cta live-cta" target="_blank" rel="noreferrer">SIGN UP VIA KORT →</a>
          </div>
        </div>
      </div>

      {/* CASHBACK */}
      <div className="section">
        <div className="section-header">CASHBACK & SHOPPING</div>
        <p className="section-sub">Earn on things you already buy.</p>
        <div className="app-grid">
          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">🛒</div>
              <div>
                <div className="app-name">Rakuten Canada <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">Cashback on online shopping</div>
              </div>
            </div>
            <p className="app-desc">750+ Canadian stores — Amazon, Walmart, Canadian Tire, Home Depot. $30 bonus after first $30 purchase. UNLIMITED referrals for KoRT.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 $30 bonus</span>
              <span className="stat-chip green">♾️ Unlimited refs</span>
              <span className="stat-chip">🔄 Up to 30% back</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">📋</div>
              <div>
                <div className="app-name">Swagbucks <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">Surveys + cashback</div>
              </div>
            </div>
            <p className="app-desc">Surveys, videos, shopping. KoRT earns 10% of every member's earnings FOR LIFE.</p>
            <div className="app-stats">
              <span className="stat-chip green">🔄 10% lifetime passive</span>
              <span className="stat-chip">💵 $5-$20/day</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">💧</div>
              <div>
                <div className="app-name">Drop <span className="status-badge status-pending">COMING SOON</span></div>
                <div className="app-type">Automatic cashback</div>
              </div>
            </div>
            <p className="app-desc">Link your card. Drop detects purchases and gives you points automatically. Zero effort.</p>
            <div className="app-stats">
              <span className="stat-chip">🔄 Automatic</span>
              <span className="stat-chip">🔇 Zero effort</span>
            </div>
            <a href="#" className="app-cta pending" onClick={e => e.preventDefault()}>COMING SOON</a>
          </div>
        </div>
      </div>

      {/* PASSIVE */}
      <div className="section">
        <div className="section-header">PASSIVE EARNING</div>
        <p className="section-sub">Install once. Forget it. Earn forever.</p>
        <div className="app-grid">
          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">📡</div>
              <div>
                <div className="app-name">Nielsen Panel</div>
                <div className="app-type">Background data (opt-in)</div>
              </div>
            </div>
            <p className="app-desc">Runs silently. Anonymous browsing data for market research. ~$50/year per device for nothing.</p>
            <div className="app-stats">
              <span className="stat-chip green">💵 ~$50/yr/device</span>
              <span className="stat-chip">🔇 Passive</span>
            </div>
            <a href="https://www.nielsen.com/digital-panel/" className="app-cta" target="_blank" rel="noreferrer">GET STARTED →</a>
          </div>

          <div className="app-card">
            <div className="app-top">
              <div className="app-icon">🔍</div>
              <div>
                <div className="app-name">Microsoft Rewards</div>
                <div className="app-type">Search + quizzes</div>
              </div>
            </div>
            <p className="app-desc">Bing searches earn points. Daily quizzes take 2 minutes. Redeem for gift cards.</p>
            <div className="app-stats">
              <span className="stat-chip">🔄 ~$5-10/mo</span>
              <span className="stat-chip">⏱ 2 min/day</span>
            </div>
            <a href="https://rewards.microsoft.com" className="app-cta" target="_blank" rel="noreferrer">GET STARTED →</a>
          </div>
        </div>
      </div>

      {/* SOVEREIGN SURVIVAL ROADMAP */}
      <div className="section">
        <div className="section-header">SOVEREIGN SURVIVAL ROADMAP</div>
        <p className="section-sub">The $5,000/Month Freedom Protocol.</p>
        
        <div className="roadmap-container">
          <div className="roadmap-tier tier-1">
            <div className="tier-header">
              <span className="tier-tag">TIER 1</span>
              <h4>DIGITAL SURVIVAL</h4>
              <div className="tier-price">$500/mo</div>
            </div>
            <p>The "Quick Stack." Initial 5-10 apps (KOHO, AttaPoll, Mistplay) to cover immediate essentials (food, data).</p>
            <div className="roadmap-progress"><div className="progress-fill" style={{ width: '100%' }}></div></div>
            <div className="status-indicator live">READY</div>
          </div>

          <div className="roadmap-tier tier-2">
            <div className="tier-header">
              <span className="tier-tag">TIER 2</span>
              <h4>ECONOMIC STABILITY</h4>
              <div className="tier-price">$1,500/mo</div>
            </div>
            <p>Bank Referral looping + Community Pool dividends. Requires active Participation of 50+ members.</p>
            <div className="roadmap-progress"><div className="progress-fill" style={{ width: '60%' }}></div></div>
            <div className="status-indicator scaling">SCALING</div>
          </div>

          <div className="roadmap-tier tier-3">
            <div className="tier-header">
              <span className="tier-tag">TIER 3</span>
              <h4>FULL SOVEREIGNTY</h4>
              <div className="tier-price">$5,000/mo</div>
            </div>
            <p>Unified Mesh rewards + Affiliate Revenue Engine. Automated by the Agent Council (Bedivere/Merlin).</p>
            <div className="roadmap-progress"><div className="progress-fill" style={{ width: '20%' }}></div></div>
            <div className="status-indicator locking">LOCKING</div>
          </div>
        </div>
      </div>

      {/* VIRAL INVITE PROTOCOL */}
      <div className="section">
        <ViralInviteEngine />
      </div>

      {/* CASHOUT */}
      <div className="section">
        <div className="section-header">CASHOUT OPTIONS</div>
        <p className="section-sub">Your earnings. Your choice.</p>
        <div className="cashout-grid">
          <div className="cashout-item"><div className="cashout-icon">🍔</div><div className="cashout-label">Food Delivery</div></div>
          <div className="cashout-item"><div className="cashout-icon">🛒</div><div className="cashout-label">Groceries</div></div>
          <div className="cashout-item"><div className="cashout-icon">💊</div><div className="cashout-label">Health</div></div>
          <div className="cashout-item"><div className="cashout-icon">🏦</div><div className="cashout-label">Bank Transfer</div></div>
          <div className="cashout-item"><div className="cashout-icon">⛽</div><div className="cashout-label">Gas & Transit</div></div>
          <div className="cashout-item"><div className="cashout-icon">👕</div><div className="cashout-label">Clothing</div></div>
          <div className="cashout-item"><div className="cashout-icon">📱</div><div className="cashout-label">Phone & Data</div></div>
          <div className="cashout-item"><div className="cashout-icon">🏕</div><div className="cashout-label">Camping</div></div>
        </div>
      </div>

      <div className="footer-cta">
        <h2>Start Earning Today</h2>
        <p>Every dollar funds you first, the Round Table second. No one gets left behind.</p>
        <Link to="/join">JOIN KORT →</Link>
      </div>

      <footer>
        <strong>Knights of the Round Table</strong> — kortx.ca<br/>
        No one gets left behind.
      </footer>
    </div>
  );
}

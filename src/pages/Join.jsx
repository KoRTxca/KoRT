import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ClaudeStyles.css';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-q">{question}</div>
      <div className="faq-a">{answer}</div>
    </div>
  );
};

export default function Join() {
  return (
    <div className="claude-page-container">
      <div className="claude-topbar">
        <Link to="/" className="topbar-back">← Back to KoRT</Link>
        <div className="topbar-brand">JOIN THE TABLE</div>
      </div>

      <div className="claude-page-wrap">
        <h1>⚔️ Choose Your Seat</h1>
        <p className="subtitle">Every tier earns. Every tier matters. Pick the level that matches your commitment and start building with us today.</p>

        <div className="tiers-grid">
          {/* PAGE */}
          <div className="tier-card">
            <div className="tier-icon">📜</div>
            <div className="tier-name">PAGE</div>
            <div className="tier-price">$5<span>/month</span></div>
            <div className="tier-tagline">"I believe in this."</div>
            <ul className="tier-features">
              <li>Full Digital Dollars earning stack access</li>
              <li>Monthly progress updates</li>
              <li>Founding Supporters list</li>
              <li>Submit apps to the earning stack</li>
            </ul>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PAGE_BUTTON_ID" className="tier-cta outline" target="_blank" rel="noreferrer">JOIN AS PAGE →</a>
          </div>

          {/* ESQUIRE */}
          <div className="tier-card featured">
            <div className="tier-icon">🛡️</div>
            <div className="tier-name">ESQUIRE</div>
            <div className="tier-price">$15<span>/month</span></div>
            <div className="tier-tagline">"I want to be part of this."</div>
            <ul className="tier-features">
              <li>Everything in Page</li>
              <li>Community Pool earnings (earn from others)</li>
              <li>Discord community access</li>
              <li>Transparency ledger (see every dollar)</li>
              <li>Microloan eligible (60 days)</li>
            </ul>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ESQUIRE_BUTTON_ID" className="tier-cta gold" target="_blank" rel="noreferrer">JOIN AS ESQUIRE →</a>
          </div>

          {/* KNIGHT */}
          <div className="tier-card">
            <div className="tier-icon">⚔️</div>
            <div className="tier-name">KNIGHT</div>
            <div className="tier-price">$50<span>/month</span></div>
            <div className="tier-tagline">"I'm committed to this mission."</div>
            <ul className="tier-features">
              <li>Everything in Esquire</li>
              <li>Monthly strategy calls</li>
              <li>Network directory access</li>
              <li>Priority feature access</li>
              <li>Microloan eligible (30 days)</li>
            </ul>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KNIGHT_BUTTON_ID" className="tier-cta outline" target="_blank" rel="noreferrer">JOIN AS KNIGHT →</a>
          </div>

          {/* ROUND TABLE */}
          <div className="tier-card featured">
            <div className="tier-icon">👑</div>
            <div className="tier-name">ROUND TABLE</div>
            <div className="tier-price">$150<span>/month</span></div>
            <div className="tier-tagline">"I want to help lead this."</div>
            <ul className="tier-features">
              <li>Everything in Knight</li>
              <li>Voting rights on all decisions</li>
              <li>Co-founder recognition</li>
              <li>Equity potential as KoRT scales</li>
              <li>Direct microloan access</li>
              <li>Priority crisis support</li>
            </ul>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ROUNDTABLE_BUTTON_ID" className="tier-cta gold" target="_blank" rel="noreferrer">JOIN THE ROUND TABLE →</a>
          </div>
        </div>

        {/* OWNER SEAT */}
        <div className="tiers-grid" style={{ maxWidth: '500px', margin: '0 auto 48px' }}>
          <div className="tier-card owner">
            <div className="tier-icon">🏰</div>
            <div className="tier-name">ROUND TABLE OWNER</div>
            <div className="tier-price">$5,000<span> one-time</span></div>
            <div className="tier-tagline">"I own a piece of the Table."</div>
            <ul className="tier-features">
              <li>Permanent ownership stake in KoRT</li>
              <li>10% of all profits — split among Owners — taken off the top BEFORE standard revenue sharing</li>
              <li>Voting rights on all major decisions</li>
              <li>Co-founder title and recognition</li>
              <li>Everything in every tier, permanently</li>
              <li>Your name in the founding documents</li>
              <li>Limited to 5 seats total</li>
            </ul>
            <a href="mailto:hello@kortx.ca?subject=Round%20Table%20Owner%20Seat%20Inquiry&body=I'm%20interested%20in%20the%20Round%20Table%20Owner%20seat.%20Please%20send%20me%20details%20on%20next%20steps." className="tier-cta owner-cta">INQUIRE — 5 SEATS AVAILABLE →</a>
          </div>
        </div>

        {/* NO-CASH EARN PATH */}
        <div className="earn-path">
          <h2>💰 No Cash? Earn Your Way In</h2>
          <p>Install the Quick Stack via KoRT affiliate links. Earn $15+ in 48 hours. That covers your first Esquire month — no money out of pocket.</p>
          <Link to="/digital-dollars">Start the Quick Stack →</Link>
        </div>

        {/* ONE-TIME SUPPORT */}
        <div style={{ background: 'var(--surface)', border: '1px solid #1a1a3a', borderRadius: '10px', padding: '28px', marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: 'var(--gold)', fontSize: '20px', marginBottom: '16px' }}>ONE-TIME SUPPORT</h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '500px', margin: '0 auto 20px' }}>Not ready for monthly? One-time contributions welcome. Every dollar is tracked and accounted for.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: 'var(--elevated)', border: '1px solid #1a1a3a', color: 'var(--gold-light)', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontFamily: "'Cinzel', serif", fontSize: '13px' }}>$5</a>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: 'var(--elevated)', border: '1px solid #1a1a3a', color: 'var(--gold-light)', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontFamily: "'Cinzel', serif", fontSize: '13px' }}>$25</a>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: 'var(--elevated)', border: '1px solid #1a1a3a', color: 'var(--gold-light)', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontFamily: "'Cinzel', serif", fontSize: '13px' }}>$100</a>
            <a href="#" onClick={e => e.preventDefault()} style={{ background: 'var(--elevated)', border: '1px solid #1a1a3a', color: 'var(--gold-light)', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontFamily: "'Cinzel', serif", fontSize: '13px' }}>$500</a>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginTop: '12px' }}>E-transfer: admin@xception.ai</p>
        </div>

        {/* FAQ */}
        <div className="faq">
          <h2>QUESTIONS</h2>
          <FaqItem 
            question="How do I earn money as a member?"
            answer="Through the Digital Dollars earning stack — curated apps that pay you for signups, cashback, surveys, passive data sharing, and gaming. Follow the Quick Stack guide and earn $50+ in your first 48 hours."
          />
          <FaqItem 
            question="What's the Community Pool?"
            answer="40% of all Digital Dollars earnings flow into a shared pool. That pool gets redistributed proportionally to all active members. The more people earning, the more everyone makes — including you."
          />
          <FaqItem 
            question="Can I submit my own earning apps?"
            answer="Yes. If you find an app that pays and has a referral program, submit it with YOUR referral code. If we approve it, your code goes live permanently. Every future member who signs up earns you money."
          />
          <FaqItem 
            question="Is this MLM?"
            answer="No. You earn from using apps, not from recruiting people. The referral layer is a bonus, not the business model. KoRT earns through affiliate commissions and membership fees."
          />
          <FaqItem 
            question="What's the Owner Seat?"
            answer="A one-time $5,000 investment for a permanent ownership stake. Owner seat holders split 10% of all KoRT profits before standard revenue sharing. Only 5 seats available, ever."
          />
          <FaqItem 
            question="What else does KoRT do besides Digital Dollars?"
            answer="KoRT is building peer-led community response, recovery support, and legal advocacy tools. Digital Dollars funds all of it. Your membership directly funds services that help people in crisis."
          />
        </div>
      </div>

      <footer>
        <strong>Knights of the Round Table</strong> — kortx.ca<br/>
        No one gets left behind.
      </footer>
    </div>
  );
}

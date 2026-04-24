import React from 'react'
import { Link } from 'react-router-dom'
import { Lock, Eye, Database, MapPin, BarChart2, Shield } from 'lucide-react'

const cards = [
  { icon: Eye, title: 'What We Collect', color: '#c9a84c', items: ['Name & email address for your member account', 'Contact details you provide voluntarily', 'Payment confirmation (not card numbers — handled by PayPal)', 'Your general location — only when you activate SOS or Responder Mode, never stored permanently', 'Affiliate referral data to calculate your Digital Dollars earnings', 'Anonymized crisis incident logs for organizational safety reviews'] },
  { icon: Lock, title: 'What We Never Do', color: '#f08080', items: ['Sell your personal data — ever', 'Share your data with advertisers', 'Store your location permanently', 'Build behavioral profiles for marketing', 'Share your data with government without a court order', 'Spam you (one optional weekly digest, unsubscribe anytime)'] },
  { icon: Database, title: 'Third-Party Services', color: '#4ade80', items: ['Supabase (database) — your account data lives here, encrypted at rest', 'PayPal (payments) — KoRT never sees your card number', 'Discord — voluntary community platform, governed by Discord ToS', 'Tawk.to (live chat) — optional, anonymous by default', 'Google Analytics — anonymized aggregate traffic only, no personal identifiers'] },
  { icon: MapPin, title: 'Location Data (The Watch)', color: '#a855f7', items: ['Location is only accessed when you explicitly activate SOS or Responder Mode', 'Your location is shared only with nearby KoRT responders in that moment', 'Location data is not stored after the incident resolves', 'You can disable location at any time through your device settings', 'No background location tracking — ever'] },
  { icon: BarChart2, title: 'Your Earning Data', color: '#4a9eff', items: ['Affiliate referral tracking is required to pay you correctly', 'Your earnings data is visible only to you and KoRT admins', 'Referral chain data (3 tiers deep) is used only for commission calculations', 'You can request a full export of your earnings history at any time', 'Earnings data is retained for 7 years for tax compliance purposes'] },
  { icon: Shield, title: 'Your Rights (BC Privacy Law)', color: '#c9a84c', items: ['Access: Request a copy of all data KoRT holds about you', 'Correction: Request corrections to inaccurate data', 'Deletion: Request deletion of your account and associated data (subject to legal retention requirements)', 'Portability: Request your data in a standard format', 'Complaint: File a complaint with the BC Office of the Information and Privacy Commissioner'] }
]

export default function Privacy() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 24 }}>
          <Lock size={14} color="#4a9eff" />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#4a9eff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Privacy Policy — Effective March 16, 2026</span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#e8e8e8', fontWeight: 900, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Your Privacy <span style={{ color: '#4a9eff' }}>Matters</span>
        </h1>
        <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.8, maxWidth: 620, margin: '0 auto' }}>
          KoRT was built for people who've been let down by institutions. We have no interest in being another one. This policy is written in plain language because you deserve to know exactly what happens with your information.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginBottom: 48 }}>
        {cards.map((card) => (
          <div key={card.title} style={{ background: '#0a0a1a', border: `1px solid ${card.color}22`, borderRadius: 14, padding: 28, borderTop: `3px solid ${card.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={20} color={card.color} />
              </div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', color: '#e8e8e8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{card.title}</h2>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {card.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: card.color, fontSize: 14, marginTop: 2, flexShrink: 0 }}>›</span>
                  <span style={{ color: '#9a9ab0', fontSize: '0.88rem', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Cookies */}
      <div style={{ background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 32, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>Cookies & Tracking</h2>
        <p style={{ color: '#9a9ab0', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          KoRT uses essential session cookies to keep you logged in and remember your preferences. We use anonymized Google Analytics to understand aggregate traffic patterns — this data is not linked to your identity. We do not use advertising cookies, third-party tracking pixels, or retargeting technologies. You can disable cookies in your browser settings; this may affect login functionality.
        </p>
      </div>

      {/* PIPA note */}
      <div style={{ background: '#0a0a1a', border: '1px solid rgba(74,158,255,0.15)', borderRadius: 14, padding: 32, marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#4a9eff', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>Governing Law — BC PIPA</h2>
        <p style={{ color: '#9a9ab0', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          KoRT operates under BC's Personal Information Protection Act (PIPA). We are committed to compliance with PIPA and applicable federal privacy law (PIPEDA). To exercise your rights or file a privacy complaint, contact Mike Slemko at <a href="mailto:mslemko@xcltd.ca" style={{ color: '#4a9eff', textDecoration: 'none' }}>mslemko@xcltd.ca</a>. If your concern is not resolved, you may contact the <a href="https://www.oipc.bc.ca" target="_blank" rel="noopener noreferrer" style={{ color: '#4a9eff', textDecoration: 'none' }}>BC Office of the Information and Privacy Commissioner</a>.
        </p>
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: 32, textAlign: 'center' }}>
        <p style={{ color: '#9a9ab0', fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 20px' }}>
          Questions about this privacy policy? We actually answer emails.<br />
          <a href="mailto:mslemko@xcltd.ca" style={{ color: '#c9a84c', textDecoration: 'none' }}>mslemko@xcltd.ca</a> — <a href="tel:2508009225" style={{ color: '#9a9ab0', textDecoration: 'none' }}>250-800-9225</a>
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/terms" style={{ color: '#c9a84c', fontSize: '0.85rem', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>Terms of Service →</Link>
          <Link to="/join" style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>Join KoRT</Link>
          <Link to="/guide" style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>The Manual</Link>
        </div>
      </div>
    </div>
  )
}

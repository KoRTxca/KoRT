import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * KoRT — Star Trek Landing Page
 * Target: Trek fans, IDIC community, federation-minded people
 * "No one gets left behind" = the Prime Directive meets peer support
 */

const STARDATE = () => {
  const now = new Date()
  const start = new Date(2323, 0, 1)
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  const days = Math.floor(diff / oneDay)
  return `${Math.floor(days / 365)}.${String(days % 365).padStart(3,'0')}`
}

const CREW = [
  { role: 'Merlin', station: 'Chief Intelligence Officer', color: '#c9a84c', desc: 'Multi-model AI orchestration. Logic, strategy, pattern recognition across the entire fleet.' },
  { role: 'Galahad', station: 'Chief Engineer', color: '#4a9eff', desc: 'Architecture and systems. Keeps the engine room running at warp.' },
  { role: 'Bedivere', station: 'Communications', color: '#7acd7a', desc: 'The relay backbone. Keeps every node talking to every other node.' },
  { role: 'Gawain', station: 'Tactical', color: '#f08080', desc: 'The Watch. Crisis response coordination in real time.' },
]

const TIERS = [
  { name: 'Page', price: '$5/mo', rank: 'Ensign', color: '#9a9ab0', perks: ['Monthly dispatches', 'Full mission brief docs', 'Founders manifest', 'Discord — Ensign access'] },
  { name: 'Esquire', price: '$15/mo', rank: 'Lieutenant', color: '#4a9eff', perks: ['Everything in Ensign', 'Full crew channel', 'Treasury ledger access', 'Microloan eligible at 60 days', 'Behind-the-scenes logs'], featured: true },
  { name: 'Knight', price: '$50/mo', rank: 'Commander', color: '#c9a84c', perks: ['Everything in Lieutenant', 'Monthly command briefings', 'Network directory', 'Microloan eligible at 30 days', 'Priority for missions and contracts'] },
  { name: 'Round Table', price: '$150+/mo', rank: 'Captain', color: '#e8d5a3', perks: ['Everything in Commander', 'Quarterly fleet councils', 'Voting rights', 'Equity pathway', 'Co-founder recognition'] },
]

export default function LandingStarTrek() {
  const [phase, setPhase] = useState(0)
  const [stardate] = useState(STARDATE())
  const [scanline, setScanline] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2800)
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setScanline(s => (s + 1) % 100), 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000814',
      color: '#e8e8e8',
      fontFamily: "'JetBrains Mono', monospace",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* LCARS scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999,
        background: `linear-gradient(transparent ${scanline}%, rgba(74,158,255,0.015) ${scanline}%, rgba(74,158,255,0.015) ${scanline+2}%, transparent ${scanline+2}%)`,
      }} />

      {/* STARFIELD */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {Array.from({length: 200}).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() > 0.95 ? '2px' : '1px',
            height: Math.random() > 0.95 ? '2px' : '1px',
            background: 'white',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes lcarsSlide { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes warpLine { from{transform:scaleX(0) translateX(-50%)} to{transform:scaleX(1) translateX(0)} }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .lcars-bar { animation: lcarsSlide 0.4s ease forwards; }
      `}</style>

      {/* LCARS TOP BAR */}
      <div style={{
        background: '#000814', borderBottom: '3px solid #c9a84c',
        padding: '8px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50% 50% 50% 0', background: '#c9a84c', marginRight: 8 }} />
          <div>
            <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>KoRT Digital Round Table</div>
            <div style={{ color: '#4a9eff', fontSize: 10, letterSpacing: '0.2em' }}>LCARS Interface v2.1.0</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#c9a84c', fontSize: 10, letterSpacing: '0.2em' }}>STARDATE {stardate}</div>
          <div style={{ color: '#4a9eff', fontSize: 10 }}>● SECTOR ALPHA ACTIVE</div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 24px' }}>

        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.8s', marginBottom: 24 }}>
          <div style={{
            display: 'inline-block', border: '1px solid #4a9eff',
            padding: '6px 20px', borderRadius: 2, marginBottom: 20,
            color: '#4a9eff', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          }}>
            ◈ Incoming Transmission — Cowichan Sector, BC ◈
          </div>
        </div>

        <div style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.8s', transitionDelay: '0.2s' }}>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 900,
            color: '#c9a84c',
            marginBottom: 8,
            lineHeight: 1.1,
            textShadow: '0 0 60px rgba(201,168,76,0.4)',
          }}>
            IDIC IS THE WAY
          </h1>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', color: '#4a9eff', letterSpacing: '0.3em', marginBottom: 32 }}>
            INFINITE DIVERSITY · INFINITE COMBINATIONS
          </div>
        </div>

        <div style={{ opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.8s', transitionDelay: '0.4s', maxWidth: 700 }}>
          <p style={{ fontSize: '1.2rem', color: '#9a9ab0', lineHeight: 1.8, fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 16 }}>
            "The needs of the many outweigh the needs of the few."
          </p>
          <p style={{ fontSize: '1rem', color: '#e8e8e8', lineHeight: 1.8, fontFamily: 'Georgia, serif', marginBottom: 40 }}>
            KoRT is the civilian fleet you always wished existed. Peer responders trained like the crew you grew up with — showing up for the people the system leaves behind. Self-funded. Zero government dependency. Cowichan Valley, BC → everywhere.
          </p>

          {/* WARP-SPEED DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0', justifyContent: 'center' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                height: 1, background: '#4a9eff',
                width: `${20 + i * 15}px`,
                opacity: 0.3 + i * 0.15,
              }} />
            ))}
            <div style={{ color: '#c9a84c', fontSize: 12, letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>NO ONE GETS LEFT BEHIND</div>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                height: 1, background: '#4a9eff',
                width: `${80 - i * 15}px`,
                opacity: 1 - i * 0.15,
              }} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/join" style={{
              background: '#c9a84c', color: '#000814',
              fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
              letterSpacing: '0.1em', padding: '14px 32px', borderRadius: 2,
              textDecoration: 'none', display: 'inline-block',
            }}>⚔ Request Posting →</Link>
            <Link to="/create" style={{
              border: '1px solid #4a9eff', color: '#4a9eff',
              fontFamily: "'Cinzel', serif", fontSize: 13,
              letterSpacing: '0.08em', padding: '13px 28px', borderRadius: 2,
              textDecoration: 'none', display: 'inline-block',
            }}>Create Your Dossier</Link>
          </div>
        </div>
      </section>

      {/* LCARS MISSION STATS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '64px 24px', background: 'rgba(0,8,20,0.9)', borderTop: '2px solid rgba(74,158,255,0.3)', borderBottom: '2px solid rgba(74,158,255,0.3)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {[
              { label: 'Years On Mission', value: '20+' },
              { label: 'Gov\'t Dependency', value: 'ZERO' },
              { label: 'Status', value: 'ALPHA' },
              { label: 'Prime Directive', value: '∞' },
            ].map(s => (
              <div key={s.label} style={{ background: '#000d1a', border: '1px solid rgba(74,158,255,0.2)', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2.5rem', color: '#c9a84c', fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: '#9a9ab0', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDGE CREW — AI COUNCIL */}
      <section style={{ position: 'relative', zIndex: 1, padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#4a9eff', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>Bridge Crew</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#c9a84c', marginBottom: 16 }}>The Digital Round Table</h2>
            <p style={{ color: '#9a9ab0', maxWidth: 540, margin: '0 auto' }}>A multi-model AI think tank running 24/7. Not one AI — a full bridge crew, each with a specialty, all working the same mission.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.2)' }}>
            {CREW.map(c => (
              <div key={c.role} style={{ background: '#000d1a', padding: '32px 24px', borderLeft: `3px solid ${c.color}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: c.color, letterSpacing: '0.2em', marginBottom: 8 }}>AI COUNCIL — {c.station.toUpperCase()}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#e8e8e8', marginBottom: 12 }}>{c.role}</div>
                <div style={{ color: '#9a9ab0', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE MISSION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '96px 24px', background: '#000d1a', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#4a9eff', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>Away Mission Log</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#c9a84c' }}>What We Actually Do</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '⚔️', label: 'Peer Crisis Response', status: 'PRE-LAUNCH', statusColor: '#c9a84c', desc: 'Trained civilian peer responders for mental health, addiction, and social crises. CAHOOTS-inspired. Zero government strings.' },
              { icon: '⚖️', label: 'Digital Advocate', status: 'IN DEV', statusColor: '#4a9eff', desc: 'AI-powered navigation of ICBC claims, PWD applications, housing disputes, legal letters. The system won\'t win because you don\'t know the rules.' },
              { icon: '🛡️', label: 'Digital Detox', status: 'COMING', statusColor: '#7acd7a', desc: 'Street-smart recovery. No clinical language. No shame. AI Sponsor 24/7. Harm reduction tools and a community that\'s been there.' },
              { icon: '💰', label: 'Digital Dollars', status: 'COMING', statusColor: '#7acd7a', desc: 'Members earn real money through curated app stacks and affiliate programs. Join broke. Leave earning.' },
              { icon: '🏡', label: 'Tiered Housing', status: 'PHASE 2', statusColor: '#9a9ab0', desc: 'Emergency pads → transitional → permanent. Seacan clusters and hybrid construction. A roof is not a luxury.' },
              { icon: '🌾', label: 'Land & Production', status: 'PHASE 2', statusColor: '#9a9ab0', desc: 'Self-sufficient community food and goods production. Farm shares. Dividends are food, not promises.' },
            ].map(m => (
              <div key={m.label} style={{ background: '#000814', border: '1px solid rgba(74,158,255,0.15)', padding: '28px 24px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: m.statusColor, letterSpacing: '0.15em', marginBottom: 8 }}>● {m.status}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#e8d5a3', marginBottom: 12 }}>{m.label}</div>
                <div style={{ color: '#9a9ab0', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANKS / MEMBERSHIP */}
      <section style={{ position: 'relative', zIndex: 1, padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#4a9eff', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>Fleet Roster</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#c9a84c', marginBottom: 16 }}>Choose Your Rank</h2>
            <p style={{ color: '#9a9ab0', maxWidth: 540, margin: '0 auto' }}>You're funding the build. You're getting access now. You're locking in founding rates before official launch. This is your posting.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {TIERS.map(t => (
              <div key={t.name} style={{
                background: '#000d1a',
                border: `1px solid ${t.featured ? t.color : 'rgba(74,158,255,0.2)'}`,
                borderRadius: 2, padding: '36px 28px',
                position: 'relative',
              }}>
                {t.featured && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: t.color, color: '#000814',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em',
                    padding: '3px 12px', borderRadius: 2, whiteSpace: 'nowrap',
                  }}>MOST ACTIVE RANK</div>
                )}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.color, letterSpacing: '0.2em', marginBottom: 8 }}>RANK: {t.rank.toUpperCase()}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#e8e8e8', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', color: t.color, fontWeight: 700, marginBottom: 20 }}>{t.price}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
                  {t.perks.map(p => (
                    <li key={p} style={{ padding: '6px 0', borderBottom: '1px solid rgba(74,158,255,0.08)', fontSize: '0.88rem', color: '#e8e8e8' }}>
                      <span style={{ color: t.color }}>✓ </span>{p}
                    </li>
                  ))}
                </ul>
                <Link to="/join" style={{
                  display: 'block', textAlign: 'center',
                  background: t.featured ? t.color : 'transparent',
                  color: t.featured ? '#000814' : t.color,
                  border: `1px solid ${t.color}`,
                  fontFamily: "'Cinzel', serif", fontSize: 11,
                  letterSpacing: '0.1em', padding: '11px 16px', borderRadius: 2,
                  textDecoration: 'none',
                }}>Request Posting →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING HAIL */}
      <section style={{ position: 'relative', zIndex: 1, padding: '96px 24px', background: '#000d1a', borderTop: '1px solid rgba(201,168,76,0.2)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Cinzel', serif", color: '#4a9eff', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24 }}>Incoming Hail</div>
          <blockquote style={{
            fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontStyle: 'italic',
            color: '#c9a84c', lineHeight: 1.8, borderLeft: '3px solid #c9a84c',
            padding: '20px 28px', textAlign: 'left', marginBottom: 40,
          }}>
            "KoRT is built on 20 years of lived experience. We've sat with people at 3am who had nowhere else to turn. We've helped navigate impossible systems. We've been the community that showed up when nothing else did. Now we're building the infrastructure to do this properly."
          </blockquote>
          <p style={{ color: '#9a9ab0', marginBottom: 8 }}>🕊 Dedicated to Aaron Van Nice and Kyle "Krymes" Dunn</p>
          <p style={{ color: '#9a9ab0', fontSize: '0.85rem', marginBottom: 40 }}>who showed us what this looks like done with love.</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/join" style={{
              background: '#c9a84c', color: '#000814',
              fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
              letterSpacing: '0.1em', padding: '14px 32px', borderRadius: 2,
              textDecoration: 'none',
            }}>⚔ Request Posting</Link>
            <Link to="/create" style={{
              border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c',
              fontFamily: "'Cinzel', serif", fontSize: 13,
              letterSpacing: '0.08em', padding: '13px 28px', borderRadius: 2,
              textDecoration: 'none',
            }}>Create Dossier →</Link>
          </div>
        </div>
      </section>

      {/* LCARS FOOTER */}
      <footer style={{
        background: '#000814', borderTop: '3px solid #c9a84c',
        padding: '32px 24px', textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          {['Discord', 'Reddit', 'Email', 'Join', 'Mission'].map(l => (
            <a key={l} href={l === 'Email' ? 'mailto:hello@kortx.ca' : l === 'Discord' ? 'https://discord.gg/T6bfsceJ' : '#'} style={{ color: '#9a9ab0', fontSize: '0.9rem', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ color: '#4a9eff', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>
          STARDATE {stardate} · KORT DIGITAL ROUND TABLE · kortx.ca
        </div>
        <div style={{ color: '#9a9ab0', fontSize: '0.75rem' }}>
          © 2026 KoRT / Xception Contracting Ltd. · Pre-launch community. Not a licensed service provider. Peer support is not professional counselling. v2.1.0
        </div>
      </footer>
    </div>
  )
}

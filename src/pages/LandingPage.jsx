import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, ArrowRight, ChevronDown, Flame } from 'lucide-react';

const INTRO_LINES = [
  { phase: 'I', label: 'The Gathering', color: '#c44455', img: '/storm.png' },
  { phase: 'II', label: 'The Impact', color: '#c9a84c', img: '/excalibur.png' },
  { phase: 'III', label: 'The Seat', color: '#e8e8e8', img: '/table_nodes.png' },
];

const PILLARS = [
  {
    icon: <Shield size={32} className="text-amber-500" />,
    title: 'The Watch',
    desc: 'A peer-crisis network for BC communities. When institutions fail you — The Watch answers the call.',
    cta: 'Enter The Watch',
    to: '/watch',
    color: 'border-amber-500/40 hover:border-amber-500',
    glow: 'hover:shadow-[0_0_30px_rgba(201,168,76,0.2)]',
  },
  {
    icon: <Zap size={32} className="text-green-400" />,
    title: 'Digital Dollars',
    desc: 'The sovereign UBI engine. Affiliate networks, cashback stacks, and community pools funding your freedom.',
    cta: 'Open Treasury',
    to: '/digital-dollars',
    color: 'border-green-500/40 hover:border-green-500',
    glow: 'hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]',
  },
  {
    icon: <Heart size={32} className="text-red-400" />,
    title: 'Peer Advocacy',
    desc: 'ICBC claims, PWD applications, housing rights. AI-powered legal guidance + human backup.',
    cta: 'Get Support',
    to: '/join',
    color: 'border-red-500/40 hover:border-red-500',
    glow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]',
  },
];

const STATS = [
  { value: '$5,000', label: 'Monthly Freedom Target', sub: 'per active member' },
  { value: '40%', label: 'Revenue Shared Back', sub: 'to the community pool' },
  { value: '21', label: 'Seats at the Table', sub: 'sovereign council' },
  { value: '4th', label: 'Option When You Need Help', sub: 'peer-to-peer' },
];

export default function LandingPage() {
  const [introPhase, setIntroPhase] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  // Cinematic intro bypassed for splash screen video
  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const current = INTRO_LINES[introPhase] || INTRO_LINES[2];

  // --- INTRO SEQUENCE ---
  if (!heroVisible) {
    return (
      <div
        key={introPhase}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000, background: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', animation: 'fadeInPage 1s forwards',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${current.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.55,
          animation: 'slowZoom 8s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: current.color, letterSpacing: '0.8em', textTransform: 'uppercase', marginBottom: '1.5rem', animation: 'fadeUp 1s forwards' }}>
            Phase {current.phase} // {current.label}
          </p>
          <div style={{ width: 200, height: 1, background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`, margin: '0 auto 1.5rem' }} />
          {introPhase === 2 && (
            <button
              onClick={() => setHeroVisible(true)}
              style={{
                marginTop: '2rem', padding: '0.9rem 2.5rem',
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.6)',
                color: '#c9a84c', fontFamily: 'monospace', fontSize: '0.75rem',
                letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
                borderRadius: 4, animation: 'fadeUp 0.8s 0.4s both',
              }}
            >
              Enter The Watch ⚔
            </button>
          )}
        </div>
        <style>{`
          @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInPage { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  // --- MAIN LANDING PAGE ---
  return (
    <div style={{ background: '#08080f', color: '#e0e0e0', fontFamily: 'sans-serif', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
        overflow: 'hidden',
      }}>
        {/* Dragon bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/sovereign_dragon.png')",
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: 0.35,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(8,8,15,0.95) 100%)' }} />
        {/* Fire overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,80,0,0.04)', mixBlendMode: 'color-dodge', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 800 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 999, marginBottom: 28, fontSize: 11, color: '#c9a84c', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            <Flame size={12} style={{ color: '#f44' }} /> Sovereign OS // Pre-Launch Alpha Active
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            color: '#fff', textTransform: 'uppercase', letterSpacing: '2px',
            lineHeight: 1.05, margin: '0 0 24px',
            textShadow: '0 0 60px rgba(201,168,76,0.25)',
          }}>
            No One Gets<br />
            <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Left Behind</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#b0b0c0', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 48px' }}>
            A peer-funded sovereignty engine for BC communities. We build mutual aid networks, legal advocacy tools, and a shared economy — so no one faces the system alone.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/join" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '1rem 2.5rem', background: '#c9a84c', color: '#000',
              fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '0.85rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: 4, boxShadow: '0 0 30px rgba(201,168,76,0.4)',
              transition: 'all 0.2s',
            }}>
              Claim Your Seat <ArrowRight size={16} />
            </Link>
            <Link to="/economics" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '1rem 2.5rem', background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c',
              fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: 4, transition: 'all 0.2s',
            }}>
              How It Works
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: '#9a9ab0' }}>
          <ChevronDown size={24} />
        </div>


      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: '#0a0a1a', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#c9a84c', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#e8e8e8', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: '#9a9ab0', marginTop: 4, fontFamily: 'monospace' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 11, color: '#c9a84c', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 16 }}>Three Sovereign Modules</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            One <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Mission</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={{
              background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '40px 32px',
              transition: 'all 0.3s', cursor: 'default',
              display: 'flex', flexDirection: 'column', gap: 20,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = p.color.includes('amber') ? 'rgba(201,168,76,0.6)' : p.color.includes('green') ? 'rgba(74,222,128,0.6)' : 'rgba(239,68,68,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <div style={{ padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, display: 'inline-flex', width: 'fit-content' }}>
                {p.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ color: '#9a9ab0', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{p.desc}</p>
              </div>
              <Link to={p.to} style={{
                marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
                color: '#c9a84c', fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                {p.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS STRIP ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a0a1a, #08080f)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 16px' }}>
            The <span style={{ color: '#4ade80' }}>60/40</span> Engine
          </h2>
          <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 48px' }}>
            Every dollar the platform earns — subscriptions, affiliate routing, ads, P2P node hosting — gets split. 60% funds operations. <strong style={{ color: '#4ade80' }}>40% flows back to the community pool</strong>, split equally among every active member.
          </p>

          <div style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 680, margin: '0 auto 40px' }}>
            <div style={{ flex: 1.5, background: 'rgba(201,168,76,0.08)', padding: '32px 24px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#c9a84c', fontFamily: "'Cinzel',serif" }}>60%</div>
              <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>Platform Operations</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(74,222,128,0.08)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#4ade80', fontFamily: "'Cinzel',serif" }}>40%</div>
              <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>Community Pool</div>
            </div>
          </div>

          <Link to="/economics" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.9rem 2rem', border: '1px solid rgba(74,222,128,0.4)',
            color: '#4ade80', borderRadius: 4, textDecoration: 'none',
            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            See Full Calculator <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── MEMBERSHIP PREVIEW ── */}
      <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Claim Your <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Seat</span>
          </h2>
          <p style={{ color: '#9a9ab0', fontSize: '1rem' }}>Four tiers. Every tier earns. No one left behind.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { name: 'Page', price: '$5', color: '#9a9ab0', features: ['Digital Dollars suite', 'Monthly updates', 'App submission rights'] },
            { name: 'Esquire', price: '$15', color: '#c9a84c', featured: true, features: ['Everything in Page', 'Community Pool earnings', 'Discord priority access'] },
            { name: 'Knight', price: '$50', color: '#ef4444', features: ['Everything in Esquire', 'Monthly strategy calls', 'Priority crisis support'] },
            { name: 'Round Table', price: '$150', color: '#a855f7', features: ['Everything in Knight', 'Voting rights', 'Co-founder recognition'] },
          ].map((tier, i) => (
            <div key={i} style={{
              background: tier.featured ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(0,0,0,0))' : '#0a0a1a',
              border: `1px solid ${tier.featured ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 16, padding: '32px 24px',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 11, color: tier.color, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{tier.name}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{tier.price}<span style={{ fontSize: '0.7rem', color: '#9a9ab0', fontFamily: 'sans-serif' }}>/mo</span></div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '0.8rem', color: '#9a9ab0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a84c', marginTop: 1 }}>»</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/join" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '1.1rem 3rem', background: '#c9a84c', color: '#000',
            fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '0.9rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: 4, boxShadow: '0 0 40px rgba(201,168,76,0.35)',
          }}>
            View All Tiers & Enlist <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(to bottom, #08080f, #0a0505)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/kort_round_table.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, margin: '0 0 24px' }}>
            The Table<br /><span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Awaits</span>
          </h2>
          <p style={{ color: '#9a9ab0', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 auto 48px', maxWidth: 560 }}>
            Join Knights from across BC building a new kind of mutual aid — digital, sovereign, and unstoppable.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/join" style={{
              padding: '1rem 2.5rem', background: '#c9a84c', color: '#000',
              fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '0.85rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: 4, boxShadow: '0 0 30px rgba(201,168,76,0.4)',
            }}>
              Join the Round Table
            </Link>
            <Link to="/guide" style={{
              padding: '1rem 2.5rem', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)', color: '#e8e8e8',
              fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: 4,
            }}>
              Read the Manual
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

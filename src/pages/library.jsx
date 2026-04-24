import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, FileText, Shield, Lock, Download, ExternalLink, Search, Filter } from 'lucide-react'

const DOCS = [
  {
    title: 'Terms of Service',
    category: 'Legal',
    date: 'March 16, 2026',
    desc: 'Full terms governing your use of all KoRT platforms. Membership, conduct, crisis response liability, and dispute resolution.',
    link: '/terms',
    internal: true,
    gated: false,
    color: '#c9a84c',
    icon: Shield
  },
  {
    title: 'Privacy Policy',
    category: 'Legal',
    date: 'March 16, 2026',
    desc: 'What data we collect, what we never do with it, your BC PIPA rights, and how to request deletion.',
    link: '/privacy',
    internal: true,
    gated: false,
    color: '#4a9eff',
    icon: Lock
  },
  {
    title: 'Round Table Protocols v1.0',
    category: 'Governance',
    date: 'March 20, 2026',
    desc: 'The Three Laws of Output, AI Knight operating manual, pre-flight protocol, and absolute prohibitions governing KoRT operations.',
    link: '/protocols/ROUND_TABLE_PROTOCOLS_v1.0.md',
    internal: false,
    gated: false,
    color: '#c9a84c',
    icon: FileText
  },
  {
    title: 'Digital Dollars — Affiliate Setup Checklist',
    category: 'Earning',
    date: 'April 10, 2026',
    desc: 'Full checklist of 15 affiliate programs across 4 tiers — banks, cashback, passive earning, and telecom. With quick math: $8,750+ potential in month one.',
    link: '/digital-dollars',
    internal: true,
    gated: true,
    color: '#4ade80',
    icon: Download
  },
  {
    title: 'AI Build Battle — Lovable vs Bolt vs Replit vs Emergent',
    category: 'Technology',
    date: 'March 17, 2026',
    desc: 'The live relay race we ran building KoRT across four AI builders simultaneously. Head-to-head scores, real findings, no lab benchmarks.',
    link: '/blog/ai-build-battle',
    internal: true,
    gated: false,
    color: '#a855f7',
    icon: BookOpen
  },
  {
    title: 'Claude Project Instructions v1.0',
    category: 'AI Protocols',
    date: 'March 20, 2026',
    desc: 'Internal instructions governing Claude (Merlin) operations including the Three Laws, pre-flight protocol, absolute prohibitions, and AI division of labor.',
    link: '/protocols/CLAUDE_PROJECT_INSTRUCTIONS.md',
    internal: false,
    gated: true,
    color: '#f08080',
    icon: FileText
  },
  {
    title: 'Gemini Instructions v1.0',
    category: 'AI Protocols',
    date: 'March 20, 2026',
    desc: 'Internal instructions governing Antigravity (Galahad/Gemini) operations — database architecture, relay coordination, and schema ownership.',
    link: '/protocols/GEMINI_GEM_INSTRUCTIONS.md',
    internal: false,
    gated: true,
    color: '#4ade80',
    icon: FileText
  },
  {
    title: 'KoRT Sovereign Pipeline SQL v2.0',
    category: 'Infrastructure',
    date: 'April 14, 2026',
    desc: 'Supabase schema SQL defining the 9-table Vault — users, earnings_ledger, community_pool, crisis_dispatch, motions, advocate_cases, and more.',
    link: '/guide',
    internal: true,
    gated: true,
    color: '#ff6b00',
    icon: FileText
  },
  {
    title: 'BC Community Resources Directory',
    category: 'Resources',
    date: 'March 2026',
    desc: '53 verified BC resources across mental health, addiction, housing, food, medical, legal, Indigenous services, youth, income benefits, and domestic safety.',
    link: '/advocacy/rights',
    internal: true,
    gated: false,
    color: '#4ade80',
    icon: ExternalLink
  },
  {
    title: 'The Manual — Sovereign OS Documentation',
    category: 'Documentation',
    date: 'Live',
    desc: 'Full platform documentation: membership tiers, earning stacks, The Watch protocols, Advocate tools, Merlin AI, and the Digital Round Table architecture.',
    link: '/guide',
    internal: true,
    gated: false,
    color: '#c9a84c',
    icon: BookOpen
  }
]

const CATEGORIES = ['All', 'Legal', 'Governance', 'Earning', 'Technology', 'AI Protocols', 'Infrastructure', 'Resources', 'Documentation']

export default function Library() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = DOCS.filter(d => {
    const matchCat = cat === 'All' || d.category === cat
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 999, padding: '6px 18px', width: 'fit-content', marginBottom: 12 }}>
          <BookOpen size={13} color="#a855f7" />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#a855f7', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Universal Archive Node</span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#e8e8e8', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
          The <span style={{ color: '#a855f7' }}>Archive</span>
        </h1>
        <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
          The centralized repository of KoRT tactical knowledge, legal documents, business blueprints, and PPLR assets preserved for the new digital sovereignty.
        </p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 36, alignItems: 'center' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: 240 }}>
          <Search size={16} color="#9a9ab0" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search the scrolls..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px 12px 42px', fontSize: '0.9rem', color: '#e8e8e8', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: '0.78rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
              background: cat === c ? 'rgba(168,85,247,0.15)' : 'transparent',
              borderColor: cat === c ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.08)',
              color: cat === c ? '#a855f7' : '#9a9ab0'
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filtered.map((doc) => {
          const Wrapper = ({ children }) => doc.internal
            ? <Link to={doc.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{children}</Link>
            : <a href={doc.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{children}</a>
          return (
            <Wrapper key={doc.title}>
              <div style={{
                background: '#0a0a1a', border: `1px solid ${doc.gated ? 'rgba(255,255,255,0.05)' : `${doc.color}22`}`,
                borderTop: `3px solid ${doc.color}`, borderRadius: 12, padding: 24,
                height: '100%', boxSizing: 'border-box', transition: 'border-color 0.2s, transform 0.15s',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${doc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <doc.icon size={20} color={doc.color} />
                  </div>
                  {doc.gated && (
                    <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#f08080', background: 'rgba(240,128,128,0.1)', border: '1px solid rgba(240,128,128,0.3)', padding: '2px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Knight+
                    </span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: doc.color, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{doc.category} · {doc.date}</div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', color: '#e8e8e8', fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', lineHeight: 1.3 }}>{doc.title}</h3>
                  <p style={{ color: '#9a9ab0', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{doc.desc}</p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {doc.internal ? null : <ExternalLink size={11} color={doc.color} />}
                  <span style={{ fontSize: '0.78rem', color: doc.color, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {doc.internal ? 'Open →' : 'External →'}
                  </span>
                </div>
              </div>
            </Wrapper>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#9a9ab0' }}>
          <BookOpen size={40} color="#333" style={{ marginBottom: 16 }} />
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>No scrolls match your search</p>
        </div>
      )}

      {/* Footer note */}
      <div style={{ marginTop: 56, padding: 28, background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ color: '#9a9ab0', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
          Documents marked <span style={{ color: '#f08080' }}>Knight+</span> require an active membership to access.<br />
          <Link to="/join" style={{ color: '#c9a84c', textDecoration: 'none' }}>Claim your seat →</Link> to unlock the full archive.
        </p>
      </div>
    </div>
  )
}

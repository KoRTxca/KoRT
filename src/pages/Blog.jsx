import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ExternalLink, Calendar, Tag } from 'lucide-react'

const posts = [
  {
    slug: 'ai-build-battle',
    title: 'Lovable vs Bolt.new vs Replit vs Emergent: Which AI Builder Actually Ships in 2026?',
    date: 'March 17, 2026',
    category: 'Technology',
    readTime: '8 min read',
    excerpt: 'We didn\'t benchmark these tools in a lab. We built a real product with all four simultaneously — under real deadline pressure, with real money on the line. Here\'s what we found.',
    tags: ['AI app builder', 'Lovable', 'Bolt.new', 'Replit', 'Supabase', 'no-code']
  },
  {
    slug: 'icbc-claim-guide',
    title: 'How to Document Your ICBC Claim Properly — A Peer Guide for BC Residents',
    date: 'April 2, 2026',
    category: 'Advocacy',
    readTime: '6 min read',
    excerpt: 'ICBC adjusters are professionals. Most claimants aren\'t. Here\'s everything KoRT has learned about documenting your claim, tracking your timeline, and not getting lowballed.',
    tags: ['ICBC', 'insurance claims', 'BC advocacy', 'personal injury']
  },
  {
    slug: 'digital-dollars-quick-start',
    title: 'Earn $200 in Your First Month with Digital Dollars — A Real Walkthrough',
    date: 'April 10, 2026',
    category: 'Digital Dollars',
    readTime: '5 min read',
    excerpt: 'KOHO, Tangerine, Rakuten, Swagbucks — the Quick Stack isn\'t theory. It\'s real money available to real Canadians right now. Here\'s how to do it in 48 hours.',
    tags: ['earning online', 'affiliate programs', 'Canada cashback', 'KOHO', 'Tangerine']
  },
  {
    slug: 'pwd-application-bc',
    title: 'The Persons with Disabilities (PWD) Application — What Nobody Tells You',
    date: 'April 14, 2026',
    category: 'Advocacy',
    readTime: '7 min read',
    excerpt: 'The PWD application process in BC is designed for people who already understand it. Most people don\'t. KoRT breaks down every section, every common rejection reason, and how to respond.',
    tags: ['PWD', 'disability benefits', 'BC income assistance', 'peer advocacy']
  },
  {
    slug: 'peer-crisis-response',
    title: 'What Peer Crisis Response Actually Looks Like — Not What You\'ve Been Told',
    date: 'April 18, 2026',
    category: 'The Watch',
    readTime: '6 min read',
    excerpt: 'Peer crisis response isn\'t about replacing 911. It\'s about the 90% of situations where 911 makes things worse. KoRT\'s Watch network is designed for those moments.',
    tags: ['crisis response', 'peer support', 'community safety', 'mental health', 'BC']
  }
]

const categoryColors = {
  'Technology': '#a855f7',
  'Advocacy': '#f08080',
  'Digital Dollars': '#4ade80',
  'The Watch': '#4a9eff'
}

export default function Blog() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 24 }}>
          <BookOpen size={14} color="#c9a84c" />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Building In Public — Every Experiment Documented</span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#e8e8e8', fontWeight: 900, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          The KoRT <span style={{ color: '#c9a84c' }}>Chronicle</span>
        </h1>
        <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.7, maxWidth: 620 }}>
          Real guides. Real experiments. Real outcomes. We document everything — what works, what doesn't, and what the system doesn't want you to know.
        </p>
      </div>

      {/* Featured post */}
      <Link to="/blog/ai-build-battle" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
        <div style={{
          background: '#0a0a1a', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 16,
          padding: 36, position: 'relative', overflow: 'hidden',
          transition: 'border-color 0.2s, transform 0.2s',
          borderLeft: '4px solid #a855f7'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.15em', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', padding: '3px 10px', borderRadius: 999 }}>Featured · Technology</span>
            <span style={{ fontSize: 10, color: '#9a9ab0', fontFamily: 'monospace' }}>March 17, 2026 · 8 min read</span>
          </div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: '#e8e8e8', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.3 }}>
            {posts[0].title}
          </h2>
          <p style={{ color: '#9a9ab0', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 20px' }}>{posts[0].excerpt}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {posts[0].tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, color: '#9a9ab0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: 4, fontFamily: 'monospace' }}>#{tag}</span>
            ))}
          </div>
        </div>
      </Link>

      {/* Article grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {posts.slice(1).map(post => {
          const color = categoryColors[post.category] || '#c9a84c'
          return (
            <Link to={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
                padding: 28, height: '100%', borderTop: `3px solid ${color}`,
                transition: 'border-color 0.2s, transform 0.15s', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${color}15`, border: `1px solid ${color}30`, padding: '2px 8px', borderRadius: 999 }}>{post.category}</span>
                  <span style={{ fontSize: 10, color: '#9a9ab0', fontFamily: 'monospace' }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#e8e8e8', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{post.title}</h2>
                <p style={{ color: '#9a9ab0', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 16px' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={11} color="#9a9ab0" />
                  <span style={{ fontSize: 11, color: '#9a9ab0', fontFamily: 'monospace' }}>{post.date}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Discord CTA */}
      <div style={{ marginTop: 56, background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, padding: 36, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#e8e8e8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>
          Building In Public — <span style={{ color: '#c9a84c' }}>Join The Conversation</span>
        </h2>
        <p style={{ color: '#9a9ab0', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 24px' }}>
          Every article, every tool we build, every dollar earned gets documented. Follow along on Discord and Reddit.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://discord.gg/T6bfsceJ" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#5865F2', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            <ExternalLink size={14} /> Discord
          </a>
          <a href="https://reddit.com/r/KoRT" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#FF4500', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            <ExternalLink size={14} /> r/KoRT
          </a>
        </div>
      </div>
    </div>
  )
}

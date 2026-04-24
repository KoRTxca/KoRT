import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const table = [
  { builder: 'Lovable', module: 'KoRT Hub', assignment: 'Medieval Oath UI, member governance' },
  { builder: 'Bolt.new', module: 'Digital Dollars Dashboard', assignment: 'Earning hub, wallet, affiliate tracking' },
  { builder: 'Replit Agent', module: 'Data Mining & Background Earning', assignment: 'Complex backend logic' },
  { builder: 'Emergent.sh', module: 'The Watch (Crisis Response)', assignment: 'Real-time SOS dispatch' }
]
const headToHead = [
  { criteria: 'UI Polish (first pass)', lovable: '⭐⭐⭐⭐⭐', bolt: '⭐⭐⭐⭐', replit: '⭐⭐⭐', emergent: '⭐⭐⭐⭐' },
  { criteria: 'Supabase Integration', lovable: '⭐⭐⭐', bolt: '⭐⭐⭐', replit: '⭐⭐⭐⭐', emergent: '⭐⭐⭐⭐' },
  { criteria: 'Complex Logic', lovable: '⭐⭐⭐', bolt: '⭐⭐⭐', replit: '⭐⭐⭐⭐⭐', emergent: '⭐⭐⭐⭐⭐' },
  { criteria: 'Speed to First Preview', lovable: '⭐⭐⭐⭐', bolt: '⭐⭐⭐⭐⭐', replit: '⭐⭐⭐', emergent: '⭐⭐⭐⭐' },
  { criteria: 'Cost (est. per full app)', lovable: '$20–50', bolt: '$10–20', replit: '$15–30', emergent: '$10–30 credits' },
  { criteria: 'Best Use Case', lovable: 'Hub, portals', bolt: 'Demos, CRUD', replit: 'Backend, APIs', emergent: 'Complex full-stack' }
]

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#c9a84c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid rgba(201,168,76,0.2)' }}>{title}</h2>
    {children}
  </div>
)
const P = ({ children }) => <p style={{ color: '#b0b0c0', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px' }}>{children}</p>
const Score = ({ label, rating, color }) => (
  <div style={{ background: '#0a0a1a', border: `1px solid ${color}22`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', color: '#e8e8e8', fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: '0.85rem', color, fontFamily: 'monospace', fontWeight: 700 }}>Production Readiness</span>
    </div>
  </div>
)

export default function BlogAiBuildBattle() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '48px 24px 80px' }}>
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#9a9ab0', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 40, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
        <ArrowLeft size={14} /> Back to Chronicle
      </Link>

      {/* Meta */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.15em', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', padding: '3px 10px', borderRadius: 999 }}>Technology</span>
          <span style={{ fontSize: 11, color: '#9a9ab0', fontFamily: 'monospace' }}>March 17, 2026 · 8 min read · kortx.ca</span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.5rem, 4vw, 2.3rem)', color: '#e8e8e8', fontWeight: 900, margin: '0 0 20px', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Lovable vs Bolt.new vs Replit vs Emergent:<br />
          <span style={{ color: '#c9a84c' }}>Which AI Builder Actually Ships?</span>
        </h1>
        <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid rgba(201,168,76,0.4)', paddingLeft: 20, margin: 0 }}>
          Posted on KoRTx.ca — Building in public. Every experiment documented.
        </p>
      </div>

      {/* Body */}
      <Section title="The Real Test">
        <P>We didn't benchmark these tools in a lab. We built a real product with all four simultaneously — under real deadline pressure, with real money on the line, and a real community waiting for the result.</P>
        <P>KoRT (Knights of the Round Table) is a peer-powered crisis response organization and earning ecosystem based in BC, Canada. When we set out to build our 6-app relay — Digital Dollars, a crisis dispatch system, member governance hub, and advocate portal — we made a deliberate choice: run a live AI build relay race across every major platform, document everything, and tell the truth.</P>
      </Section>

      <Section title="The Setup: One Team, Four Builders, One Real Product">
        <P>The build target was identical for each tool: full-stack web app with Supabase authentication, membership tier enforcement (Page / Esquire / Knight / Round Table), real-time data updates, mobile-first PWA, production-deployable with a custom subdomain.</P>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
                {['Builder', 'Module', 'Assignment'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#c9a84c', fontFamily: 'monospace', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 14px', color: '#e8e8e8', fontWeight: 700, fontFamily: 'monospace' }}>{row.builder}</td>
                  <td style={{ padding: '12px 14px', color: '#9a9ab0' }}>{row.module}</td>
                  <td style={{ padding: '12px 14px', color: '#9a9ab0' }}>{row.assignment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Lovable — UI First, Backend Second">
        <P>Lovable produced the most visually polished output of any tool we tested. Component quality is legitimately impressive — well-structured React, sensible state management, clean Tailwind. When we specified the KoRT design system (dark #08080f background, gold #c9a84c, Cinzel font, medieval-modern aesthetic), it actually followed the brief. A full-screen animated modal with typewriter oath text and signature field came out in a single generation.</P>
        <P><strong style={{ color: '#e8e8e8' }}>What slowed it down:</strong> Supabase integration requires more handholding than it should. Lovable tends to generate mock data rather than live queries on the first pass. You'll spend revision cycles nudging it toward real auth flows.</P>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a855f7', fontFamily: 'monospace' }}>7/10</div>
            <div style={{ fontSize: '0.75rem', color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Production Ready</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: '#9a9ab0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#e8e8e8' }}>Best for:</strong> Frontend-heavy apps where UI polish matters on day one. Member portals, dashboards, anything users will stare at.</p>
          </div>
        </div>
      </Section>

      <Section title="Bolt.new — Fastest to Browser, Shallowest on Logic">
        <P>Bolt is the fastest of the four to go from prompt to something visible in a browser. The preview loop is excellent — you iterate quickly, the diff view helps, and it doesn't hallucinate wildly outside its lane.</P>
        <P><strong style={{ color: '#e8e8e8' }}>What slowed it down:</strong> Complex multi-table Supabase schemas gave it trouble. When we described the KoRT earnings split model (60% direct, 40% community pool, referral chains), it oversimplified. It prefers single-table CRUD apps.</P>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.3)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ff6b00', fontFamily: 'monospace' }}>6/10</div>
            <div style={{ fontSize: '0.75rem', color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Complex Apps</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: '#9a9ab0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#e8e8e8' }}>Best for:</strong> Quick demos, landing pages, simple admin panels. If you're validating a concept before real development, Bolt wins.</p>
          </div>
        </div>
      </Section>

      <Section title="Replit Agent — The Backend Specialist">
        <P>Replit Agent is the only tool in this list that genuinely understands backend systems. When we described our data mining module — background passive earning, opt-in privacy model, revenue split calculation — it built actual server-side logic rather than faking it with client-side hacks.</P>
        <P><strong style={{ color: '#e8e8e8' }}>What slowed it down:</strong> The UX is rougher than Lovable or Bolt. It's building in an editor environment, not a preview-first environment. The output needs more human cleanup before it's presentable.</P>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ade80', fontFamily: 'monospace' }}>8/10</div>
            <div style={{ fontSize: '0.75rem', color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Backend Logic</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: '#9a9ab0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#e8e8e8' }}>Best for:</strong> API integrations, webhook handlers, automation backends, anything that needs real server logic. Pair it with Lovable for full-stack production quality.</p>
          </div>
        </div>
      </Section>

      <Section title="Emergent.sh — High Reasoning, High Stakes">
        <P>Emergent runs Claude Opus in Ultra mode — which means the reasoning quality on complex requirements is noticeably higher than the other tools. When we described The Watch (real-time crisis dispatch, caller mode vs responder mode, live Supabase subscriptions, silent SOS for domestic situations), Emergent understood the nuance without us having to break it into pieces.</P>
        <P><strong style={{ color: '#e8e8e8' }}>What slowed it down:</strong> Credit consumption is real. Complex builds eat credits fast. And it's newer — less documentation, less community, rougher edges.</P>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          <div style={{ background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.3)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4a9eff', fontFamily: 'monospace' }}>8/10</div>
            <div style={{ fontSize: '0.75rem', color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Complex Apps</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: '#9a9ab0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#e8e8e8' }}>Best for:</strong> Complex apps that need genuine reasoning. Crisis response systems. Apps where edge cases matter as much as the happy path.</p>
          </div>
        </div>
      </Section>

      <Section title="Head-to-Head Comparison">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
                {['Criteria', 'Lovable', 'Bolt.new', 'Replit', 'Emergent'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#c9a84c', fontFamily: 'monospace', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {headToHead.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', color: '#e8e8e8', fontWeight: 600 }}>{row.criteria}</td>
                  <td style={{ padding: '10px 12px', color: '#9a9ab0' }}>{row.lovable}</td>
                  <td style={{ padding: '10px 12px', color: '#9a9ab0' }}>{row.bolt}</td>
                  <td style={{ padding: '10px 12px', color: '#9a9ab0' }}>{row.replit}</td>
                  <td style={{ padding: '10px 12px', color: '#9a9ab0' }}>{row.emergent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="The Honest Assessment: Use All Four">
        <P>The trap is thinking you pick one. The relay race model works:</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { step: '1', tool: 'Bolt.new', desc: 'Sketch the concept fast. Validate the screen flows.' },
            { step: '2', tool: 'Lovable', desc: 'Build the UI layer properly. Polish the components.' },
            { step: '3', tool: 'Replit', desc: 'Wire the backend. Webhooks, automation, complex queries.' },
            { step: '4', tool: 'Emergent', desc: 'Build the modules that require real reasoning — crisis systems, governance logic.' }
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#c9a84c', fontWeight: 900, fontSize: '0.85rem', fontFamily: 'monospace' }}>{item.step}</span>
              </div>
              <div>
                <div style={{ color: '#e8e8e8', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{item.tool}</div>
                <div style={{ color: '#9a9ab0', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <P>Each tool has a lane. The mistake is putting Bolt on your crisis dispatch system or Lovable on your webhook handler.</P>
      </Section>

      {/* CTA */}
      <div style={{ background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 36, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.2rem', color: '#e8e8e8', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase' }}>Join the Build</h2>
        <P>KoRT is live at kortx.ca. We're onboarding beta members now. If you complete our Quick Stack in 48 hours, you earn enough to cover your first Esquire month before you spend a dollar.</P>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          <Link to="/join" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: '#c9a84c', color: '#000', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Claim Your Seat →</Link>
          <a href="https://discord.gg/T6bfsceJ" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'rgba(255,255,255,0.05)', color: '#e8e8e8', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>
            <ExternalLink size={14} /> Discord
          </a>
        </div>
        <div style={{ marginTop: 24, fontSize: '0.8rem', color: '#9a9ab0', fontFamily: 'monospace' }}>
          Tagged: AI app builder · no-code AI development · Lovable vs Bolt · Supabase · Flutter · community app development
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#9a9ab0', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'monospace' }}>
          <ArrowLeft size={14} /> Back to Chronicle
        </Link>
      </div>
    </div>
  )
}

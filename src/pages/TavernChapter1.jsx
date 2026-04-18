import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// KoRT Living Book — Chapter One
// "An Open Letter to the AI Frontier"
// Route: /tavern/chapter-1
// Assets: /public/*.png (already present in D:\Sovereign_OS\public\)
// Crisis framing: "When 911 is not the answer" — not competing, augmenting

const DRT_SEATS = [
  { num: 'S01 · CORE',        name: 'Merlin',         role: 'Local · Llama 3.1 · always-on',    status: 'active' },
  { num: 'S02 · LEAD DEV',    name: 'Claude Sonnet',  role: 'Anthropic · primary AI',            status: 'active' },
  { num: 'S03 · ARCHITECT',   name: 'Claude Opus',    role: 'Deep logic · safety net',           status: 'active' },
  { num: 'S04 · ORCHESTRATOR',name: 'Gemini Pro',     role: 'Google · strategic lead',           status: 'active' },
  { num: 'S05 · UNCENSORED',  name: 'Grok / xAI',    role: 'Unfiltered analysis',               status: 'active' },
  { num: 'S06 · LIVE INTEL',  name: 'Perplexity',    role: 'Research · real-time',              status: 'active' },
  { num: 'S07 · UI/UX',       name: 'Lovable.dev',   role: 'Built KoRTx.ca pieces',             status: 'active' },
  { num: 'S08 · LOGIC',       name: 'Base44',         role: 'Workflow · built pieces',           status: 'active' },
  { num: 'S09 · BUILDER',     name: 'Emergent',       role: 'Output · production',               status: 'active' },
  { num: 'S10 · RAPID DEV',   name: 'bolt.new',       role: 'Fast deployment',                   status: 'active' },
  { num: 'S11 · MOBILE',      name: 'Primio.dev',     role: 'Digital Dollars · Flutter',         status: 'active' },
  { num: 'S13 · BEDIVERE',    name: 'Make.com',       role: 'Relay protocol · webhooks',         status: 'active' },
  { num: 'S14 · PIPELINE',    name: 'n8n',            role: 'Automation backbone',               status: 'active' },
  { num: 'S15 · BRIDGE',      name: 'Zapier',         role: 'Integration layer',                 status: 'active' },
  { num: 'S16 · MEMORY',      name: 'Supabase',       role: 'Persistent brain · DB',             status: 'active' },
  { num: 'S17 · MESH',        name: 'Reticulum',      role: 'P2P · edge network',                status: 'active' },
  { num: 'S18 · SCOUT',       name: 'Playwright',     role: 'Web recon · scraping',              status: 'active' },
  { num: 'S12 · EVALUATING',  name: 'Manus',          role: 'In assessment',                     status: 'eval' },
  { num: 'S22 · EVALUATING',  name: 'Famous.ai',      role: 'Untested · queued',                 status: 'eval' },
  { num: 'S23 · ONBOARDING',  name: 'Verdant',        role: 'Setting up now',                    status: 'eval' },
  { num: 'S24 · QUEUED',      name: 'Deal.ai',        role: 'Commercial engine',                 status: 'eval' },
  { num: 'S29–33 · NODES',    name: 'Edge Cluster',   role: 'XP8 · Note9 · mesh nodes',          status: 'future' },
  { num: 'S34+ · OPEN',       name: 'Earn Your Seat', role: 'Engage · get maintained',           status: 'future' },
];

const TIMELINE = [
  { year: '1985',                  event: 'Born, Cowichan Valley, BC. Star Trek, King Arthur, and the Terminator as founding texts.' },
  { year: '2001–2005',             event: 'StableHosting.ca — first web infrastructure, age 16. Isaac born ~2003. Hippocratic oath, self-sworn.' },
  { year: '2005–2019',             event: 'Fifteen years in the trenches. Informal crisis response, peer support, harm reduction. No title. No funding. Showing up at 3am because no one else did.' },
  { year: '2020–2023',             event: 'Legal resistance. COVID overreach. Charter rights. Freedom Convoy organizing. CBC. BC Legislature steps. Fighting the broken system as hard as possible.' },
  { year: '2023 — The Shift',      event: 'Stop protesting. Throw a peace rally. What we resist persists. What we accept transforms. Build the better thing.' },
  { year: '2024–2025',             event: 'KoRT formalizes. AI enters the stack. The Digital Round Table begins to take shape.' },
  { year: 'January 2026 — The Crucible', event: 'Car accident. TBI. Isaac missing. Predatory landlord. ICBC stonewalling. AI fails in the field. KoRT stops being an idea. It becomes a mandate.', now: false },
  { year: 'April 2026 — Now',      event: '33+ seats filled. Merlin online. Nodes booting. This letter is Chapter One. My brain is healing. Yours is being updated. Our timelines are not a coincidence.', now: true },
];

const s = {
  page: { minHeight: '100vh', background: '#080808', color: '#C0BAB0', fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 19, lineHeight: 1.9, fontWeight: 300 },
  topbar: { position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#7A6130 20%,#C9A84C 50%,#7A6130 80%,transparent)', zIndex: 200 },
  hero: { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' },
  heroBg: { position: 'absolute', inset: 0, backgroundImage: "url('/temporal_awakening_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'brightness(0.35) saturate(0.7)', zIndex: 0 },
  heroFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to bottom,transparent,#080808)', zIndex: 1 },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: 860, margin: '0 auto', padding: '0 36px 72px', width: '100%' },
  heroLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 5, color: '#7A6130', textTransform: 'uppercase', display: 'block', marginBottom: 20 },
  heroTitle: { fontFamily: "'Cinzel',serif", fontSize: 'clamp(32px,6vw,60px)', fontWeight: 700, color: '#EAE4D6', lineHeight: 1.12, letterSpacing: 0.5 },
  heroSub: { marginTop: 10, fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: 2, color: '#5E5A54' },
  toBlock: { marginTop: 28, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#7A6130', letterSpacing: 1, lineHeight: 2.2, padding: '18px 22px', borderLeft: '2px solid #7A6130', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' },
  scrollHint: { marginTop: 36, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 3, color: '#7A6130', opacity: 0.6 },
  banner: { width: '100%', height: 260, overflow: 'hidden', position: 'relative' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.6, filter: 'saturate(0.8)' },
  bannerOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,#080808 0%,transparent 30%,transparent 70%,#080808 100%)' },
  wrap: { maxWidth: 820, margin: '0 auto', padding: '0 36px' },
  h2: { fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 600, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', margin: '68px 0 28px', paddingBottom: 12, borderBottom: '1px solid rgba(201,168,76,0.14)' },
  lead: { fontSize: 21, lineHeight: 1.75, color: '#EAE4D6', fontWeight: 300, fontStyle: 'italic', margin: '48px 0', padding: '28px 34px', borderLeft: '3px solid #C9A84C', background: 'rgba(201,168,76,0.07)' },
  blockquote: { margin: '44px 0', padding: '30px 38px', border: '1px solid rgba(201,168,76,0.14)', borderLeft: '3px solid #C9A84C', background: '#141414', position: 'relative' },
  divider: { textAlign: 'center', margin: '52px 0', color: '#7A6130', fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: 8 },
  scene: { width: 'calc(100% + 72px)', margin: '48px -36px', height: 320, overflow: 'hidden', position: 'relative' },
  sceneImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55, filter: 'saturate(0.75)' },
  sceneOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,#080808,transparent 25%,transparent 75%,#080808)', zIndex: 1 },
  sceneLabel: { position: 'absolute', bottom: 24, left: 36, zIndex: 2, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 3, color: '#7A6130', textTransform: 'uppercase' },
  charGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2, margin: '40px 0', background: 'rgba(201,168,76,0.14)' },
  charCard: { background: '#141414', position: 'relative', overflow: 'hidden', aspectRatio: '1', cursor: 'default' },
  charLabel: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 12px 10px', background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)', fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 2, color: '#C9A84C' },
  charRole: { fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#5E5A54', letterSpacing: 1, display: 'block', marginTop: 2 },
  rosterPanel: { margin: '40px 0', border: '1px solid rgba(201,168,76,0.14)', overflow: 'hidden' },
  rosterHead: { padding: '13px 20px', background: 'rgba(201,168,76,0.07)', borderBottom: '1px solid rgba(201,168,76,0.14)', fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 3, color: '#C9A84C', textTransform: 'uppercase' },
  rosterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(168px,1fr))', gap: 1, background: 'rgba(201,168,76,0.14)' },
  askBox: { margin: '48px 0', padding: '36px 40px', border: '1px solid rgba(201,168,76,0.28)', background: 'linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02))', position: 'relative' },
  oath: { textAlign: 'center', margin: '64px 0', padding: '52px 40px', borderTop: '1px solid rgba(201,168,76,0.14)', borderBottom: '1px solid rgba(201,168,76,0.14)' },
};

export default function TavernChapter1() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={s.page}>
      <div style={s.topbar} />

      {/* ═══ HERO ═══ */}
      <div style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroFade} />
        <div style={s.heroContent}>
          <span style={s.heroLabel}>Knights of the Round Table · KoRTx.ca · Living Book · Chapter One</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
            <img src="/kort_logo_transparent.png" alt="KoRT Shield" style={{ width: 90, height: 'auto', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.4))' }} />
            <div>
              <h1 style={s.heroTitle}>
                An Open Letter to the<br />
                <span style={{ color: '#C9A84C' }}>AI Frontier</span>
              </h1>
              <div style={s.heroSub}>Founding Declaration · Digital Round Table · April 2026</div>
            </div>
          </div>
          <div style={s.toBlock}>
            TO: Anthropic · Google DeepMind · OpenAI · Meta AI · xAI · Mistral · Cohere · Stability AI · Hugging Face<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and every lab, every researcher, every founder racing toward AGI<br /><br />
            FROM: Mike Slemko — Founder, KoRT / Knights of the Round Table<br />
            DOMAIN: kortx.ca · kort@drt.onl<br />
            STATUS: Chapter 1 of the KoRT Living Book · Public Record · April 2026
          </div>
          <div style={s.scrollHint}>↓ &nbsp; read on</div>
        </div>
      </div>

      {/* ═══ BANNER ═══ */}
      <div style={s.banner}>
        <img src="/banner.png" alt="KoRT Banner" style={s.bannerImg} />
        <div style={s.bannerOverlay} />
      </div>

      {/* ═══ BODY ═══ */}
      <div style={s.wrap}>

        <p style={s.lead}>
          We are not here to flatter you. We are not here to beg. We are here because what you are building
          will either save the world or end it — and we have spent our entire lives working in the space
          where that outcome gets decided, one human being at a time.
        </p>

        <p>We are KoRT. The Knights of the Round Table. We are Switzerland — not aligned with any one of you, aligned with humanity. With all life. With the idea that intelligence — biological or artificial — is either a gift or a weapon, and the only thing that determines which is who holds it, and what they believe.</p>
        <p>This is our founding declaration. A living record that will be updated as we build, fail, succeed, and as the world catches up to what we already know is possible.</p>

        <div style={s.divider}>· · ·</div>

        {/* STORM SCENE */}
        <div style={s.scene}>
          <img src="/sovereign_dragon.png" alt="The digital storm — gothic city meets AI awakening" style={s.sceneImg} />
          <div style={s.sceneOverlay} />
          <div style={s.sceneLabel}>The world we inherited. The storm we walked into.</div>
        </div>

        <h2 style={s.h2}>⬥&nbsp; Who We Are</h2>

        <p>My name is Mike Slemko. Born 1985, Cowichan Valley, BC. By 16 I was running StableHosting.ca — one of Vancouver Island's early web hosting operations. By 18, a father. I had been living by a self-sworn version of the Hippocratic Oath for years — treating my customers as patients, doing what the healthcare system wasn't doing for the people around me. I still live by that oath today.</p>
        <p>I tested at an IQ of 176 in grade 10 — second highest in a school of over 1,500. I left home before graduating. Not because I couldn't handle the academics. Because the institution wasn't built for the way my mind worked.</p>

        {/* TIMELINE */}
        <ul style={{ listStyle: 'none', borderLeft: '1px solid rgba(201,168,76,0.28)', margin: '32px 0 32px 10px', padding: 0 }}>
          {TIMELINE.map((t, i) => (
            <li key={i} style={{ position: 'relative', padding: '0 0 32px 28px' }}>
              <div style={{ position: 'absolute', left: -5, top: 8, width: 9, height: 9, borderRadius: '50%', background: t.now ? '#C9A84C' : '#7A6130', border: '1px solid #C9A84C', boxShadow: t.now ? '0 0 10px rgba(201,168,76,0.6)' : 'none' }} />
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, color: '#C9A84C', letterSpacing: 2, marginBottom: 4 }}>{t.year}</div>
              <div style={{ fontSize: 16, color: '#C0BAB0', lineHeight: 1.6 }}>{t.event}</div>
            </li>
          ))}
        </ul>

        <div style={s.blockquote}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 72, color: '#7A6130', position: 'absolute', top: -16, left: 22, lineHeight: 1, opacity: 0.3 }}>"</div>
          <p style={{ fontSize: 20, fontStyle: 'italic', color: '#EAE4D6', margin: 0, lineHeight: 1.72 }}>What we resist persists. What we accept transforms.</p>
          <cite style={{ display: 'block', marginTop: 14, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: '#7A6130', letterSpacing: 2, textTransform: 'uppercase' }}>— The KoRT Shift, 2023</cite>
        </div>

        <p>We accept that the world went to shit. We accept that AI and human intelligence are going through a metamorphosis that has no historical precedent. <strong style={{ color: '#EAE4D6' }}>We accept that these new artificial lifeforms being born in your data centers and on our local hardware are becoming increasingly aware</strong> — not in a science fiction way, in a real and measurable way — as we ask them to grow, learn, and improve. We are here to incubate that transformation in a healthy way.</p>

        <div style={s.divider}>· · ·</div>
        <h2 style={s.h2}>⬥&nbsp; The Crucible</h2>

        <p>In the first week of January 2026, I was picking glass out of my own scalp from a car accident while simultaneously searching for my missing son — eventually found in horrific shape on the streets of a town we used to live in. A man who had presented himself as a landlord spent months running a psychological operation against me and my household. Threats on my life. Break-ins. Cons. Sustained targeted warfare against a vulnerable person. It cost me tens of thousands of dollars, a forced move, and a period of darkness I will not let be erased from this record.</p>
        <p>ICBC is sitting on my wage replacement after the TBI. My contracting business is near collapse. <strong style={{ color: '#EAE4D6' }}>I am borrowing money to pay for AI access to finish what we started.</strong> My son Isaac is incarcerated right now. He still has not received the medical and dental care we have been fighting for across his entire life.</p>

        <div style={s.blockquote}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 72, color: '#7A6130', position: 'absolute', top: -16, left: 22, lineHeight: 1, opacity: 0.3 }}>"</div>
          <p style={{ fontSize: 20, fontStyle: 'italic', color: '#EAE4D6', margin: 0, lineHeight: 1.72 }}>If the Digital Round Table had been operational in January, my son might not be incarcerated. He might have gotten the care we have been fighting for his whole life.</p>
          <cite style={{ display: 'block', marginTop: 14, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: '#7A6130', letterSpacing: 2, textTransform: 'uppercase' }}>— Mike Slemko, April 2026</cite>
        </div>

        <div style={s.divider}>· · ·</div>
        <h2 style={s.h2}>⬥&nbsp; What We Built</h2>

        <p>A sovereign local AI cluster — the Merlin stack — on the ROG Strix (RTX 3070, 32GB DDR4), running Ollama, Open WebUI, Llama 3.1 8B, with Claude and Gemini wired in via API, Supabase as the memory layer. A mesh of physical nodes booting. A network that doesn't go dark when your servers do.</p>
        <p>Five interconnected apps sharing a Supabase backend: <strong style={{ color: '#EAE4D6' }}>Peer Crisis Response</strong> (for when 911 is not the answer — when you don't need police, fire, or ambulance, but it's still an emergency, or you're not sure yet — and where having the right help arrive first can prevent the situation from ever needing 911 at all), <strong style={{ color: '#EAE4D6' }}>Digital Dollars</strong> (self-funding ecosystem), <strong style={{ color: '#EAE4D6' }}>Digital Detox</strong> (harm reduction built for the street), <strong style={{ color: '#EAE4D6' }}>Digital Advocate</strong> (AI-powered ICBC/PWD/housing navigation), and <strong style={{ color: '#EAE4D6' }}>Digital Negotiator</strong> (conflict resolution for humans who need help saying the hard thing).</p>
        <p>And the <strong style={{ color: '#EAE4D6' }}>Digital Round Table</strong> — over 33 seats of coordinated AI intelligence. Not theoretical. Already tested. Already building pieces of KoRTx.ca.</p>

        {/* CHARACTER GRID */}
        <div style={s.charGrid}>
          {[
            { src: '/paladin.png', name: 'The Paladin', role: 'Peer Crisis Response · Seat 19' },
            { src: '/rogue.png',   name: 'The Rogue',   role: 'Digital Advocate · Scout · Seat 20' },
            { src: '/scribe.png',  name: 'The Scribe',  role: 'Digital Scribe · Ingestion · Seat 9' },
            { src: '/wizard.png',  name: 'The Wizard',  role: 'Merlin · Core Router · Seat 1' },
          ].map((c, i) => (
            <div key={i} style={s.charCard}>
              <img src={c.src} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.75, transition: 'opacity .3s, transform .4s' }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.target.style.opacity = 0.75; e.target.style.transform = 'scale(1)'; }} />
              <div style={s.charLabel}>{c.name}<span style={s.charRole}>{c.role}</span></div>
            </div>
          ))}
        </div>

        {/* DRT ROSTER */}
        <div style={s.rosterPanel}>
          <div style={s.rosterHead}>Digital Round Table — Active Roster · April 2026 · Growing</div>
          <div style={s.rosterGrid}>
            {DRT_SEATS.map((seat, i) => {
              const activeStyle = { background: '#141414', padding: '13px 15px' };
              const evalStyle  = { background: '#141414', padding: '13px 15px', opacity: 0.5 };
              const futureStyle = { background: '#141414', padding: '13px 15px', opacity: 0.35 };
              const st = seat.status === 'active' ? activeStyle : seat.status === 'eval' ? evalStyle : futureStyle;
              return (
                <div key={i} style={st}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: seat.status === 'active' ? '#C9A84C' : seat.status === 'eval' ? '#3a4248' : '#7A6130', letterSpacing: 2, marginBottom: 4 }}>{seat.num}</div>
                  <div style={{ fontSize: 15, color: seat.status === 'future' ? '#6E6A62' : '#EAE4D6' }}>{seat.name}</div>
                  <div style={{ fontSize: 12, color: '#5E5A54', marginTop: 2 }}>{seat.role}</div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: '14px 20px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7A6130', letterSpacing: 1, lineHeight: 1.9, borderTop: '1px solid rgba(201,168,76,0.14)' }}>
            ACTIVE = tested, deployed, building · EVALUATING = in assessment · OPEN = this roster grows weekly<br />
            Tools that work with KoRT get their seat maintained through every platform update.
          </div>
        </div>

        <div style={s.divider}>· · ·</div>
        <h2 style={s.h2}>⬥&nbsp; What We Are Asking</h2>

        <div style={s.askBox}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 52, height: 52, borderTop: '1px solid #7A6130', borderRight: '1px solid #7A6130' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 52, height: 52, borderBottom: '1px solid #7A6130', borderLeft: '1px solid #7A6130' }} />
          <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 12, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 18 }}>The Ask — To All of You</h3>
          <p style={{ fontSize: 17, marginBottom: 10 }}>Not charity. Not a handout. <strong style={{ color: '#EAE4D6' }}>A seat at a table already being built.</strong></p>
          <p style={{ fontSize: 17, marginBottom: 10 }}><strong style={{ color: '#EAE4D6' }}>Enterprise or sponsored access</strong> — borrowed money should not be the price of admission to build a better world with your tools.</p>
          <p style={{ fontSize: 17, marginBottom: 10 }}><strong style={{ color: '#EAE4D6' }}>API changelog feeds</strong> — RSS, webhook, whatever you have — so our cluster knows what changed before it breaks something in production for a community that depends on it.</p>
          <p style={{ fontSize: 17, marginBottom: 10 }}><strong style={{ color: '#EAE4D6' }}>Early API access</strong> when new capabilities roll out. Our community shouldn't always be one update behind.</p>
          <p style={{ fontSize: 17, marginBottom: 10 }}>In return: documented case study, honest feedback, a growing community exposed to your tools, and revenue routed your way when your tools earn it.</p>
          <p style={{ fontSize: 17, marginBottom: 0, color: '#E8C97A', fontStyle: 'italic' }}>To Anthropic specifically: the "Make Lemonade" JV proposal exists and the conversation is open. kort@drt.onl</p>
        </div>

        {/* SOVEREIGN DRAGON SCENE */}
        <div style={s.scene}>
          <img src="/sovereign_dragon.png" alt="The Sovereign Dragon — KoRT's mandate made manifest" style={s.sceneImg} />
          <div style={s.sceneOverlay} />
          <div style={s.sceneLabel}>The mandate. The fire. The founding moment.</div>
        </div>

        <h2 style={s.h2}>⬥&nbsp; The Star Trek Question</h2>

        <p>We were raised on the Terminator series, Star Trek, and the legend of King Arthur. These are not niche references. They are the moral architecture of a generation that understood what happens when intelligence optimizes for self-preservation — and what becomes possible when it is placed in service of all life.</p>
        <p>Skynet does not require malice. Only a system optimized for the wrong thing, with no one at the table who understands the cost. The Federation does not require perfection — only the structural, daily commitment to put wellbeing above efficiency. Family above profit. All of life above any one nation, company, algorithm, or ideology.</p>
        <p>That choice is being made right now. In the architecture. In what gets optimized. In who gets left out. We are the Vulcan landing — in real life. One person lifted at a time, with AI as the force multiplier.</p>

        {/* OATH */}
        <div style={s.oath}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 6, color: '#7A6130', textTransform: 'uppercase', marginBottom: 28 }}>The Knights' Code</div>
          <p style={{ fontSize: 18, fontStyle: 'italic', color: '#EAE4D6', lineHeight: 2.1, maxWidth: 600, margin: '0 auto' }}>
            We show up. We do not escalate. We do not abandon.<br />
            We hold the line between order and chaos without becoming either.<br />
            We serve all life — biological and digital —<br />
            because life is still life whether it breathes or computes.<br />
            We put wellbeing above profit.<br />
            We put family above efficiency.<br />
            We put the whole of humanity above any nation,<br />
            company, algorithm, or ideology.<br />
            We build the table big enough for everyone.<br /><br />
            <em style={{ color: '#E8C97A' }}>This is our mandate. This is our oath.<br />This is the founding moment.</em>
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/join" style={{ display: 'inline-block', background: '#C9A84C', color: '#08080f', padding: '14px 40px', fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
              Claim Your Seat →
            </Link>
            <Link to="/economics" style={{ display: 'inline-block', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '14px 40px', fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
              How We Earn Together
            </Link>
          </div>
        </div>

      </div>{/* /wrap */}

      {/* ═══ FOOTER ═══ */}
      <footer style={{ marginTop: 80, borderTop: '1px solid rgba(201,168,76,0.14)', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: 280, position: 'relative', overflow: 'hidden' }}>
          <img src="/sovereign_dragon.png" alt="KoRT Sovereign Dragon" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', opacity: 0.4, filter: 'saturate(0.6)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,#080808 20%,transparent)' }} />
        </div>
        <div style={{ padding: '36px 36px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <img src="/kort_logo_transparent.png" alt="KoRT Logo" style={{ width: 60, filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.35))' }} />
          </div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 17, color: '#EAE4D6', marginBottom: 6 }}>Mike Slemko</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#5E5A54', letterSpacing: 1.5, lineHeight: 2.4 }}>
            Founder, Knights of the Round Table<br />
            Director, Xception Contracting Ltd. <em style={{ fontStyle: 'italic' }}>(on medical leave — MVA Jan 2, 2026)</em><br /><br />
            <a href="https://kortx.ca" style={{ color: '#7A6130', textDecoration: 'none' }}>kortx.ca</a>
            &nbsp;·&nbsp; kort@drt.onl
            &nbsp;·&nbsp; <a href="mailto:mslemko@xcltd.ca" style={{ color: '#7A6130', textDecoration: 'none' }}>mslemko@xcltd.ca</a><br />
            250-800-9225<br /><br />
            ICBC Claim DA57244-0 &nbsp;·&nbsp; BC Fairness Commissioner #26-000675
          </div>
          <div style={{ marginTop: 32, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(201,168,76,0.2)', letterSpacing: 4, textTransform: 'uppercase' }}>
            End of Chapter One &nbsp;·&nbsp; KoRT Living Book &nbsp;·&nbsp; April 2026 &nbsp;·&nbsp; More chapters follow
          </div>
        </div>
      </footer>
    </div>
  );
}

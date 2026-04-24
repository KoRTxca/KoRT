import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ChevronDown, ChevronUp } from 'lucide-react'

const s = (txt) => txt.split('\n').map((line, i) => (
  <p key={i} style={{ color: line.startsWith('•') ? '#c8c8d8' : '#9a9ab0', fontSize: '0.92rem', lineHeight: 1.8, margin: line === '' ? '10px 0 0' : '2px 0', paddingLeft: line.startsWith('•') ? 12 : 0 }}>{line || '\u00A0'}</p>
))

const sections = [
  { id: 'plain', title: 'Plain English First', body: `KoRT is a community organization. We built this for people, not profit. We are straight about what we do, what we don't do, and what you're agreeing to. Questions? Contact us directly: mslemko@xcltd.ca.` },
  { id: 'who', title: '1. Who We Are', body: `Knights of the Round Table (KoRT) is a community mutual aid organization operated by Xception Contracting Ltd., a sole proprietorship registered in British Columbia, Canada. Director: Mike Slemko.\n\nWhat KoRT IS: A member-supported community organization providing peer support, harm reduction education, community resources, and digital earning tools.\n\nWhat KoRT IS NOT: A licensed medical provider, emergency service, law firm, financial advisor, or government agency. Nothing on our platforms constitutes medical, legal, or financial advice.` },
  { id: 'age', title: '2. Who Can Use KoRT', body: `You must be 18 years of age or older to become a paying member. Community resources and educational content are publicly available to all ages. By using our platforms, you confirm you are of legal age or have obtained parental/guardian consent.` },
  { id: 'membership', title: '3. Membership', body: `Tiers and Billing (CAD):\n• Page: $5/month or $50/year\n• Esquire: $15/month or $150/year\n• Knight: $50/month or $500/year\n• Round Table: $150+/month or $1,500+/year\n\nMemberships renew automatically unless cancelled. Cancel anytime — takes effect at end of billing period. No partial refunds on annual memberships after 30 days.\n\nWork-for-Membership: Members who contribute verified work may receive membership credits. All arrangements are documented in writing.\n\nZero-Cost Earn Path: Members may earn their membership fee through KoRT's affiliate earning program. KoRT does not guarantee specific earning amounts.` },
  { id: 'rtd', title: '4. The Round Table Dollar (RTD)', body: `RTD is KoRT's internal community ledger unit. It is:\n• Not a security or investment\n• Not cryptocurrency\n• Not directly redeemable for cash (redeemable for goods/services through KoRT's partner ecosystem)\n• A community accounting tool tracking contribution, earning, and equity participation\n\nRTD balances are maintained at KoRT's discretion with 30 days notice for any changes.` },
  { id: 'watch', title: '5. The Watch (Crisis Response)', body: `The Watch operates as peer support and mutual aid only:\n• KoRT responders are community peers — not licensed medical professionals, police, or emergency services\n• KoRT cannot provide emergency medical services\n• KoRT cannot involuntarily apprehend any individual (BC Mental Health Act authority belongs to police and physicians)\n• If you are in a life-threatening emergency, call 911 immediately\n\nBy using The Watch, you acknowledge:\n• KoRT is providing peer support, not emergency services\n• Responders act in good faith as community volunteers\n• KoRT, Xception Contracting Ltd., and individual responders are not liable for outcomes\n• You consent to your general location being shared with nearby responders when you activate SOS` },
  { id: 'advocate', title: '6. The Advocate Program', body: `KoRT's advocate tools provide educational information and peer guidance only. We are not lawyers. Nothing in the Advocate Program constitutes legal advice. Always consult a qualified lawyer for legal matters. KoRT recommends Legal Aid BC (legalaid.bc.ca) for members who need legal representation.` },
  { id: 'harm', title: '7. Harm Reduction Content', body: `Harm reduction information is provided for educational purposes from publicly available peer-reviewed sources. It:\n• Does not constitute medical advice\n• Is not a substitute for professional addiction treatment\n• Is provided under a harm reduction philosophy, not as an endorsement of drug use\n\nFor medical emergencies: call 911. For addiction support: BC Alcohol and Drug Information and Referral Service — 1-800-663-1441.` },
  { id: 'conduct', title: '8. Member Conduct', body: `By joining KoRT, you agree to:\n• Treat all members with respect (the Round Table has no head — all seats are equal)\n• Not use KoRT platforms to harass, threaten, or harm others\n• Not misrepresent yourself or your credentials\n• Not use KoRT's crisis response system for non-genuine emergencies\n• Not use KoRT platforms for illegal activities\n• Respect the privacy of other members\n\nViolations may result in membership suspension or termination without refund.` },
  { id: 'privacy', title: '9. Privacy', body: `We collect what we need to run the organization and nothing more:\n• Account info: Name, email, contact details for membership management\n• Location data: Only when you activate responder mode or SOS — not stored permanently\n• Earning data: Affiliate tracking to calculate RTD balance and referral commissions\n• Crisis logs: Anonymized incident records for organizational safety\n\nWe do not sell your data. We do not share your data with advertisers.` },
  { id: 'ip', title: '10. Intellectual Property', body: `KoRT's content, branding, and materials are owned by Xception Contracting Ltd. Members may share KoRT content with attribution. You may not use KoRT's name, logo, or brand commercially without written permission.\n\nContent you create within KoRT platforms remains yours. By posting it, you grant KoRT a non-exclusive license to display it within our platforms.` },
  { id: 'liability', title: '11. Limitation of Liability', body: `KoRT provides services "as is." To the maximum extent permitted by BC law:\n• KoRT is not liable for outcomes of peer support interactions\n• KoRT is not liable for earnings outcomes from affiliate programs\n• KoRT is not liable for third-party platform availability or terms changes\n• KoRT's maximum liability is limited to fees paid in the preceding 12 months` },
  { id: 'disputes', title: '12. Dispute Resolution', body: `We'd rather talk it out. Contact mslemko@xcltd.ca first. If unresolved, disputes are governed by the laws of British Columbia, Canada and subject to the jurisdiction of BC courts.` },
  { id: 'changes', title: '13. Changes to These Terms', body: `We'll notify members of material changes with at least 14 days notice via email and Discord. Continuing to use KoRT after the effective date constitutes acceptance. You can cancel without penalty if you disagree.` },
  { id: 'contact', title: '14. Contact', body: `Xception Contracting Ltd. / KoRT\nMike Slemko, Director\nLadysmith, British Columbia, Canada\nmslemko@xcltd.ca | 250-800-9225\nkortx.ca` }
]

export default function Terms() {
  const [open, setOpen] = useState({ plain: true })
  const toggle = (id) => setOpen(p => ({ ...p, [id]: !p[id] }))

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 999, padding: '6px 18px', marginBottom: 24 }}>
          <Shield size={14} color="#c9a84c" />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Legal Document — v1.0 — Effective March 16, 2026</span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#e8e8e8', fontWeight: 900, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Terms of <span style={{ color: '#c9a84c' }}>Service</span>
        </h1>
        <p style={{ color: '#9a9ab0', fontSize: '1rem', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
          Knights of the Round Table — kortx.ca<br />Last updated March 16, 2026.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map((sec) => (
          <div key={sec.id} style={{ background: '#0a0a1a', border: `1px solid ${open[sec.id] ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <button onClick={() => toggle(sec.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', fontWeight: 700, color: open[sec.id] ? '#c9a84c' : '#e8e8e8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sec.title}</span>
              {open[sec.id] ? <ChevronUp size={16} color="#c9a84c" /> : <ChevronDown size={16} color="#9a9ab0" />}
            </button>
            {open[sec.id] && (
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ height: 1, background: 'rgba(201,168,76,0.15)', marginBottom: 20 }} />
                {s(sec.body)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, padding: 32, background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ color: '#9a9ab0', fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 20px' }}>
          <em>Last updated March 16, 2026.</em><br />
          <strong style={{ color: '#c9a84c' }}>"No one gets left behind."</strong>
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/privacy" style={{ color: '#c9a84c', fontSize: '0.85rem', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>Privacy Policy →</Link>
          <a href="mailto:mslemko@xcltd.ca" style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>mslemko@xcltd.ca</a>
          <a href="tel:2508009225" style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>250-800-9225</a>
          <Link to="/join" style={{ color: '#9a9ab0', fontSize: '0.85rem', textDecoration: 'none' }}>Join KoRT</Link>
        </div>
      </div>
    </div>
  )
}

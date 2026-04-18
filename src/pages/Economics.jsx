import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Shield, Zap, DollarSign, ArrowRight, CheckCircle, Repeat } from 'lucide-react';

// KoRT Economics — How the Platform Money Works
// Route: /economics
// KEY: 60/40 = PLATFORM REVENUE split only.
// Individual member work pay is NEVER subject to this split — members always get 100% of what they earn for their work.
// The 40% pool is a BONUS on top of everything else.
// Brand: #c9a84c gold, #08080f dark, Cinzel serif

const memberCountScenarios = [
  { members: 100, label: '100 Members' },
  { members: 500, label: '500 Members' },
  { members: 1000, label: '1,000 Members' },
  { members: 5000, label: '5,000 Members' },
  { members: 10000, label: '10,000 Members' },
];

// Revenue sources that feed the pool
const revenueSources = [
  { label: 'Membership subscriptions', icon: '⚔️', note: 'Monthly recurring from all tiers' },
  { label: 'Affiliate & referral earnings', icon: '🔗', note: 'When members sign up to 3rd-party platforms through KoRT' },
  { label: 'Digital Dollars task completions', icon: '💰', note: 'Surveys, app installs, cashback platforms' },
  { label: 'Advertising revenue', icon: '📢', note: 'Ads served to the mesh — members who host earn more' },
  { label: 'Work & services marketplace', icon: '🛠️', note: 'Services sold through the platform' },
  { label: 'P2P node hosting', icon: '🖥️', note: 'Members who run KoRT_OS nodes earn from bandwidth' },
  { label: 'Product & digital sales', icon: '📦', note: 'KoRTx / DRT branded goods and digital products' },
];

const taskEarnings = [
  { task: 'Daily check-in + task feed', freq: 'Daily', time: '5 min', rtd: 0.50, cad: 0.10 },
  { task: 'Complete 1 survey/app offer', freq: 'Daily', time: '10 min', rtd: 2.00, cad: 0.75 },
  { task: 'Refer 1 new member signup', freq: 'Weekly', time: '5 min', rtd: 5.00, cad: 2.50 },
  { task: 'Respond to a dispatch', freq: 'Weekly', time: '30 min', rtd: 10.00, cad: 5.00 },
  { task: 'Host KoRT_OS node (24h)', freq: 'Daily', time: '0 min', rtd: 3.00, cad: 1.00 },
  { task: 'Serve 10 ads on your device', freq: 'Daily', time: '0 min', rtd: 0.25, cad: 0.05 },
];

const cashoutMethods = [
  { name: 'E-Transfer', icon: '🏦', bonus: 'Standard', color: '#9a9ab0' },
  { name: 'PayPal', icon: '💳', bonus: 'Standard', color: '#9a9ab0' },
  { name: 'Crypto (BTC/ETH/USDC)', icon: '₿', bonus: 'Standard', color: '#9a9ab0' },
  { name: 'Member Marketplace', icon: '🏪', bonus: '+20% Bonus', color: '#c9a84c', highlight: true },
  { name: 'Tier Upgrade', icon: '⚔️', bonus: '+20% Bonus', color: '#c9a84c', highlight: true },
  { name: 'Gift to a Member', icon: '🎁', bonus: '+20% Bonus', color: '#c9a84c', highlight: true },
  { name: 'Prepaid Card', icon: '💰', bonus: 'Standard', color: '#9a9ab0' },
];

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 2 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

export default function Economics() {
  const [memberCount, setMemberCount] = useState(1000);
  const [customMembers, setCustomMembers] = useState(1000);
  const [activeScenario, setActiveScenario] = useState(2);

  // Revenue model assumptions
  const avgRevenuePerMember = 25; // blended avg across tiers + platform revenue
  const totalMonthlyRevenue = memberCount * avgRevenuePerMember;
  const houseShare = totalMonthlyRevenue * 0.60;
  const memberPool = totalMonthlyRevenue * 0.40;
  const perMemberMonthly = memberPool / memberCount;
  const perMemberWeekly = perMemberMonthly / 4.33;
  const perMemberDaily = perMemberMonthly / 30;

  // Working member ($20/hr, 2hr/day on tasks)
  const workHoursPerDay = 2;
  const hourlyRate = 20;
  const workEarningsDaily = workHoursPerDay * hourlyRate;
  const workEarningsMonthly = workEarningsDaily * 22; // 22 working days

  // Total for an active working member
  const totalActiveMemberMonthly = workEarningsMonthly + perMemberMonthly;
  const breakEvenTier = 'Round Table'; // $150/mo

  const handleScenario = (idx) => {
    setActiveScenario(idx);
    setMemberCount(memberCountScenarios[idx].members);
    setCustomMembers(memberCountScenarios[idx].members);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#08080f', color: '#e8e8e8', fontFamily: "'Cinzel', serif" }}>

      {/* Cinematic Header */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a05 50%, #0a0a1a 100%)', borderBottom: '1px solid rgba(201,168,76,0.3)', padding: '80px 24px 60px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 20px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 999, marginBottom: 24, fontSize: 11, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <TrendingUp size={14} /> Sovereign Economics // How The Money Works
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 20px', lineHeight: 1.1, fontStyle: 'italic' }}>
            We Give <span style={{ color: '#c9a84c' }}>40%</span> of Platform Revenue Back.<br />
            <span style={{ fontSize: '60%', fontStyle: 'normal', color: '#e8d5a3' }}>Every Month. Every Member.</span>
          </h1>
          <p style={{ maxWidth: 700, margin: '0 auto', fontSize: 18, lineHeight: 1.8, color: '#9a9ab0', fontFamily: "'Crimson Text', serif" }}>
            Everything the <strong style={{ color: '#e8e8e8' }}>platform earns</strong> — subscriptions, ads, affiliate commissions, P2P node fees — gets split 60/40.
            KoRTx.ca keeps 60% for operations. The other 40% goes into a shared pool and is split equally among every paid member, every month.
            <br /><br />
            <strong style={{ color: '#c9a84c' }}>This has nothing to do with your work pay.</strong> When you do work, you get 100% of what you're owed. The pool is a separate bonus — a share of what the platform earns just by existing and growing.
          </p>
        </div>
      </div>

      {/* The Split Visualization */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>

        {/* Revenue Flow */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 40 }}>Platform Revenue Flow</h2>
          <p style={{ color: '#9a9ab0', fontSize: 13, fontFamily: 'monospace', marginBottom: 32, maxWidth: 700, margin: '0 auto 32px' }}>
            This split applies to <strong style={{ color: '#e8e8e8' }}>platform revenue only</strong> — subscriptions, advertising, affiliate commissions, P2P node fees, digital product sales.
            It does <strong style={{ color: '#f08080' }}>not</strong> apply to what you earn doing work. Your work pay is always 100% yours.
          </p>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, maxWidth: 900, margin: '0 auto', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

            {/* Revenue In */}
            <div style={{ flex: 1, background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💰</div>
              <div style={{ fontSize: 12, color: '#9a9ab0', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Total Platform Revenue</div>
              <div style={{ fontSize: 24, color: '#fff', fontWeight: 900 }}>100%</div>
              <div style={{ fontSize: 11, color: '#9a9ab0', marginTop: 8, fontFamily: 'monospace' }}>
                Memberships + Affiliates +<br />Ads + Work + P2P Nodes
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', background: '#050505' }}>
              <ArrowRight size={24} color="#c9a84c" />
            </div>

            {/* House Share */}
            <div style={{ flex: 1.2, background: 'linear-gradient(135deg, #1a0a00, #0a0505)', border: '2px solid rgba(201,168,76,0.5)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
              <div style={{ fontSize: 12, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>House Keeps</div>
              <div style={{ fontSize: 42, color: '#c9a84c', fontWeight: 900, lineHeight: 1 }}>60%</div>
              <div style={{ fontSize: 11, color: '#9a9ab0', marginTop: 8, fontFamily: 'monospace' }}>
                KoRTx.ca + DRT.onl operations,<br />infrastructure, growth, RT Owner draw
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', background: '#050505' }}>
              <ArrowRight size={24} color="#4ade80" />
            </div>

            {/* Member Pool */}
            <div style={{ flex: 1.2, background: 'linear-gradient(135deg, #001a0a, #000a05)', border: '2px solid rgba(74,222,128,0.4)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚔️</div>
              <div style={{ fontSize: 12, color: '#4ade80', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Members Receive</div>
              <div style={{ fontSize: 42, color: '#4ade80', fontWeight: 900, lineHeight: 1 }}>40%</div>
              <div style={{ fontSize: 11, color: '#9a9ab0', marginTop: 8, fontFamily: 'monospace' }}>
                Split equally among ALL<br />paid active members monthly
              </div>
            </div>
          </div>
        </div>

        {/* What Feeds The Pool */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 22, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', marginBottom: 32 }}>What Feeds The Pool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {revenueSources.map((s, i) => (
              <div key={i} style={{ background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'border-color 0.3s' }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 13, color: '#e8e8e8', fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#9a9ab0', fontFamily: 'monospace', lineHeight: 1.5 }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Calculator */}
        <div style={{ background: 'linear-gradient(135deg, #0a0a1a, #0d0d20)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '48px 40px', marginBottom: 60 }}>
          <h2 style={{ fontSize: 24, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', marginBottom: 8 }}>Live Earnings Calculator</h2>
          <p style={{ textAlign: 'center', color: '#9a9ab0', fontSize: 13, fontFamily: 'monospace', marginBottom: 40 }}>
            Assumptions: avg $25 blended revenue/member/month · $20/hr task rate · 2hr/day active member
          </p>

          {/* Scenario Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {memberCountScenarios.map((s, i) => (
              <button key={i} onClick={() => handleScenario(i)}
                style={{ padding: '8px 16px', background: activeScenario === i ? '#c9a84c' : 'rgba(255,255,255,0.05)', border: '1px solid', borderColor: activeScenario === i ? '#c9a84c' : 'rgba(201,168,76,0.2)', color: activeScenario === i ? '#08080f' : '#e8e8e8', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontFamily: "'Cinzel',serif", fontWeight: 700, letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Custom slider */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, color: '#9a9ab0', marginBottom: 8, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Or drag to customize</div>
            <input type="range" min={50} max={50000} step={50} value={customMembers}
              onChange={e => { setCustomMembers(+e.target.value); setMemberCount(+e.target.value); setActiveScenario(-1); }}
              style={{ width: '100%', maxWidth: 500, accentColor: '#c9a84c' }} />
            <div style={{ fontSize: 28, color: '#c9a84c', marginTop: 8, fontWeight: 900 }}>
              {memberCount.toLocaleString()} Members
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              { label: 'Total Monthly Revenue', value: `$${totalMonthlyRevenue.toLocaleString()}`, sub: 'Platform-wide', color: '#e8e8e8' },
              { label: 'House Keeps (60%)', value: `$${houseShare.toLocaleString()}`, sub: 'KoRTx / DRT operations', color: '#c9a84c' },
              { label: 'Member Pool (40%)', value: `$${memberPool.toLocaleString()}`, sub: 'Shared equally', color: '#4ade80' },
              { label: 'Per Member / Month', value: `$${perMemberMonthly.toFixed(2)}`, sub: 'Just for being here', color: '#4ade80' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#9a9ab0', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>{stat.label}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: '#9a9ab0', marginTop: 8, fontFamily: 'monospace' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Per Member Projection */}
          <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 12, padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#9a9ab0', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Your Pool Share → Per Member</div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Daily', value: `$${perMemberDaily.toFixed(2)}` },
                { label: 'Weekly', value: `$${perMemberWeekly.toFixed(2)}` },
                { label: 'Monthly', value: `$${perMemberMonthly.toFixed(2)}` },
              ].map((p, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.1em' }}>{p.label}</div>
                  <div style={{ fontSize: 36, color: '#4ade80', fontWeight: 900 }}>{p.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 11, color: '#9a9ab0', fontFamily: 'monospace' }}>
              Pool share only · no work required · just keep your membership active
            </div>
          </div>
        </div>

        {/* The Double Earn */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 22, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', marginBottom: 12 }}>The Double Earn</h2>
          <p style={{ textAlign: 'center', color: '#9a9ab0', fontSize: 16, fontFamily: "'Crimson Text', serif", maxWidth: 700, margin: '0 auto 32px', lineHeight: 1.8 }}>
            Your work pay and the platform pool are <strong style={{ color: '#e8e8e8' }}>completely separate streams.</strong><br />
            When you do work — you receive <strong style={{ color: '#4ade80' }}>100% of your agreed rate</strong>. Always. No cut taken.<br />
            The pool share is a <em>bonus on top of that</em> — the platform's way of sharing what it earns with everyone who's part of it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {/* Passive member */}
            <div style={{ background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 13, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>🛡️ Passive Member</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#9a9ab0', lineHeight: 2 }}>
                Work income: <span style={{ color: '#e8e8e8' }}>$0/mo</span><br />
                Pool share (1,000 members): <span style={{ color: '#4ade80' }}>+${perMemberMonthly.toFixed(2)}/mo</span><br />
                Membership cost: <span style={{ color: '#f08080' }}>-$5.00/mo</span><br />
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.1em' }}>Net Monthly</div>
                <div style={{ fontSize: 32, color: (perMemberMonthly - 5) > 0 ? '#4ade80' : '#f08080', fontWeight: 900 }}>
                  {(perMemberMonthly - 5) >= 0 ? '+' : ''}${(perMemberMonthly - 5).toFixed(2)}
                </div>
                <div style={{ fontSize: 10, color: '#9a9ab0', marginTop: 4, fontFamily: 'monospace' }}>pays the $5 Page tier at ~{Math.ceil(5 / perMemberMonthly * memberCount).toLocaleString()} members</div>
              </div>
            </div>

            {/* Active working member */}
            <div style={{ background: 'linear-gradient(135deg, #001a08, #0a1a0a)', border: '2px solid rgba(74,222,128,0.4)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 13, color: '#4ade80', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>⚔️ Active Working Member</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#9a9ab0', lineHeight: 2 }}>
                Work income ($20/hr, 2hr/day): <span style={{ color: '#e8e8e8' }}>+${workEarningsMonthly.toFixed(0)}/mo</span><br />
                Pool share (1,000 members): <span style={{ color: '#4ade80' }}>+${perMemberMonthly.toFixed(2)}/mo</span><br />
                Node hosting + ads: <span style={{ color: '#4ade80' }}>+$30.00/mo</span><br />
                Membership cost: <span style={{ color: '#f08080' }}>-$50.00/mo (Knight)</span>
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(74,222,128,0.2)' }}>
                <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.1em' }}>Net Monthly</div>
                <div style={{ fontSize: 32, color: '#4ade80', fontWeight: 900 }}>
                  +${(workEarningsMonthly + perMemberMonthly + 30 - 50).toFixed(2)}
                </div>
                <div style={{ fontSize: 10, color: '#9a9ab0', marginTop: 4, fontFamily: 'monospace' }}>Round Table ($150/mo) breaks even at ~{Math.ceil(150 / perMemberMonthly).toLocaleString()} pool members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 22, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', marginBottom: 32 }}>KoRT Daily / Weekly Earning Tasks</h2>
          <div style={{ background: '#0a0a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 24px', background: 'rgba(201,168,76,0.1)', fontSize: 10, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Task</div><div>Freq</div><div>Time</div><div>RTD</div><div>CAD Est.</div>
            </div>
            {taskEarnings.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 12 }}>
                <div style={{ color: '#e8e8e8' }}>{t.task}</div>
                <div style={{ color: '#9a9ab0', fontFamily: 'monospace' }}>{t.freq}</div>
                <div style={{ color: '#9a9ab0', fontFamily: 'monospace' }}>{t.time}</div>
                <div style={{ color: '#c9a84c', fontFamily: 'monospace', fontWeight: 700 }}>{t.rtd} RTD</div>
                <div style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: 700 }}>${t.cad.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Round Table Break-Even */}
        <div style={{ background: 'linear-gradient(135deg, #1a0800, #0a0800)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: 20, padding: '48px 40px', marginBottom: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏆</div>
          <h2 style={{ fontSize: 28, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16 }}>Round Table Self-Pays</h2>
          <p style={{ color: '#9a9ab0', fontSize: 16, maxWidth: 600, margin: '0 auto 32px', fontFamily: "'Crimson Text', serif", lineHeight: 1.8 }}>
            A member paying $150/mo for Round Table who does typical daily tasks, hosts a node, and has ads served
            can realistically <strong style={{ color: '#c9a84c' }}>earn more than their membership costs</strong> — and that number grows
            with every new member who joins.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Task earnings (typical)', value: '$200—400/mo', note: 'Work + surveys + dispatches' },
              { label: 'Pool share @ 1K members', value: `$${perMemberMonthly.toFixed(2)}/mo`, note: 'Grows with platform' },
              { label: 'Node + ad hosting', value: '$20—50/mo', note: 'Passive, 0 effort' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: '20px 28px' }}>
                <div style={{ fontSize: 11, color: '#9a9ab0', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 24, color: '#c9a84c', fontWeight: 900 }}>{item.value}</div>
                <div style={{ fontSize: 11, color: '#9a9ab0', marginTop: 6, fontFamily: 'monospace' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cashout Options */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 22, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', marginBottom: 12 }}>Cashout Options</h2>
          <p style={{ textAlign: 'center', color: '#9a9ab0', fontSize: 13, fontFamily: 'monospace', marginBottom: 32 }}>
            Cash out anytime. But keeping it in the house earns you a 20% bonus.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {cashoutMethods.map((m, i) => (
              <div key={i} style={{ background: m.highlight ? 'rgba(201,168,76,0.08)' : '#0a0a1a', border: `1px solid ${m.highlight ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontSize: 13, color: '#e8e8e8', fontWeight: 700, marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: m.color, fontFamily: 'monospace', fontWeight: m.highlight ? 700 : 400 }}>{m.bonus}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⚔️</div>
          <h3 style={{ fontSize: 24, color: '#fff', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>
            No one gets left behind.
          </h3>
          <p style={{ color: '#9a9ab0', fontSize: 15, fontFamily: "'Crimson Text', serif", maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.8 }}>
            The more members who join, the more the pool grows. The more the pool grows,
            the more everyone earns. This is sovereignty by design.
          </p>
          <a href="/join" style={{ display: 'inline-block', background: '#c9a84c', color: '#08080f', padding: '16px 48px', fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4 }}>
            Claim Your Seat →
          </a>
        </div>
      </div>
    </div>
  );
}

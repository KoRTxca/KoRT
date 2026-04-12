import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { addDays, format, parseISO } from 'date-fns';
import { Car, AlertTriangle, FileText, CheckSquare, Square, Shield } from 'lucide-react';

const TIMELINE_ITEMS = [
  { days: 0, label: '24 Hours', title: 'Immediate Steps', items: [
    'Report accident to ICBC (call 604-520-8222 or dial 1)',
    'Get medical attention — even if you feel "fine" (adrenaline masks injuries)',
    'Document the scene: photos of vehicles, road, injuries, license plates',
    'Get names and contact info of witnesses',
    'DO NOT give a recorded statement to ICBC yet',
  ]},
  { days: 7, label: '7 Days', title: 'First Week', items: [
    'See your family doctor — get injuries documented on file',
    'Start a daily pain/symptom journal (this is evidence)',
    'Keep all receipts: prescriptions, taxi fares, etc.',
    'File your CL19 crash report if police did not attend',
    'DO NOT sign anything from ICBC without reading it carefully',
  ]},
  { days: 30, label: '30 Days', title: 'First Month', items: [
    'Follow up with all medical referrals (physio, chiro, etc.)',
    'Request your ICBC claim file (you have a right to it)',
    'Consider whether you need an advocate or lawyer',
    'Continue your symptom journal',
    'DO NOT accept a quick settlement — ICBC counts on urgency',
  ]},
  { days: 90, label: '90 Days', title: 'Three Months', items: [
    'Review your Part 7 benefits (rehab, wage loss, medical expenses)',
    'If injuries persist, request referral to specialist',
    'Know: you have 2 YEARS from accident date to start a lawsuit',
    'Document how injuries affect daily life and work',
    'Gather all medical records and treatment summaries',
  ]},
];

const ICBC_TACTICS = [
  { title: 'The Lowball Offer', desc: 'ICBC may offer a quick settlement for far less than your claim is worth. They hope you\'ll accept before understanding your full injuries. NEVER accept the first offer.' },
  { title: 'The Recorded Statement Trap', desc: 'ICBC adjusters are trained to get you to say things that minimize your claim. "You seem to be doing well!" isn\'t small talk — it\'s evidence-gathering. You can decline or have someone present.' },
  { title: 'Delay, Delay, Delay', desc: 'ICBC may drag things out hoping you\'ll give up or accept less out of frustration. Track every communication. Follow up in writing.' },
  { title: 'Surveillance', desc: 'ICBC has been known to surveil claimants. Be honest about your limitations — don\'t exaggerate, but don\'t downplay either.' },
  { title: 'Denying Part 7 Benefits', desc: 'You\'re entitled to no-fault Part 7 benefits (medical, rehab, wage loss) REGARDLESS of who caused the accident. ICBC sometimes "forgets" to mention this.' },
];

const DOCUMENT_CHECKLIST = [
  'CL19 Crash Report',
  'Police file number (if attended)',
  'Photos of damage and injuries',
  'Medical records & doctor notes',
  'Symptom/pain journal',
  'Receipts for all expenses',
  'Witness contact information',
  'Correspondence with ICBC',
  'Pay stubs (for wage loss claim)',
  'Treatment plan from physio/chiro',
];

export default function ICBCFlow() {
  const [accidentDate, setAccidentDate] = useState('');
  const [checked, setChecked] = useState({});

  const toggleCheck = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <Car className="w-6 h-6 text-[#4a90d9]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>
          ICBC Claim Guide
        </h1>
      </div>
      <p className="text-sm text-[#666] mb-8">Step-by-step guidance for BC motor vehicle claims. You have rights — know them.</p>

      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 mb-6 card-glow">
        <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Enter Your Accident Date</label>
        <input
          type="date"
          value={accidentDate}
          onChange={(e) => setAccidentDate(e.target.value)}
          className="bg-[#08080f] border border-[#1a1a2e] text-white p-2 rounded max-w-xs focus:outline-none focus:border-[#c9a84c]"
        />
        {accidentDate && (
          <p className="text-xs text-[#c9a84c] mt-2">
            ⚖️ Limitation date (2 years): {format(addDays(parseISO(accidentDate), 730), 'MMMM d, yyyy')}
          </p>
        )}
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Your Timeline</h2>
        {TIMELINE_ITEMS.map((phase) => {
          const dueDate = accidentDate ? format(addDays(parseISO(accidentDate), phase.days), 'MMM d, yyyy') : null;
          return (
            <div key={phase.label} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#c9a84c] bg-[#c9a84c]/10 px-2.5 py-1 rounded">{phase.label}</span>
                  <h3 className="text-white font-medium">{phase.title}</h3>
                </div>
                {dueDate && <span className="text-xs text-[#666]">By {dueDate}</span>}
              </div>
              <div className="space-y-2">
                {phase.items.map((item, i) => {
                  const key = `${phase.label}-${i}`;
                  return (
                    <button key={key} onClick={() => toggleCheck(key)} className="flex items-start gap-3 w-full text-left group">
                      {checked[key] ? (
                        <CheckSquare className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#444] mt-0.5 flex-shrink-0 group-hover:text-[#666]" />
                      )}
                      <span className={`text-sm ${checked[key] ? 'text-[#666] line-through' : 'text-[#ccc]'}`}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>What ICBC Will Try</h2>
        </div>
        <div className="space-y-3">
          {ICBC_TACTICS.map((tactic) => (
            <div key={tactic.title} className="bg-[#0a0a1a] border border-[#ef4444]/10 rounded-xl p-5">
              <h3 className="text-[#ef4444] font-semibold text-sm mb-1">{tactic.title}</h3>
              <p className="text-sm text-[#999]">{tactic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#c9a84c]" />
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Document Checklist</h2>
        </div>
        <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
          <div className="space-y-2">
            {DOCUMENT_CHECKLIST.map((doc, i) => {
              const key = `doc-${i}`;
              return (
                <button key={key} onClick={() => toggleCheck(key)} className="flex items-center gap-3 w-full text-left group">
                  {checked[key] ? (
                    <CheckSquare className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[#444] flex-shrink-0 group-hover:text-[#666]" />
                  )}
                  <span className={`text-sm ${checked[key] ? 'text-[#666] line-through' : 'text-[#ccc]'}`}>{doc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl p-5 flex gap-3 mb-10">
        <Shield className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-[#c9a84c] font-medium">Peer Guidance, Not Legal Advice</p>
          <p className="text-xs text-[#888] mt-1">
            KoRT members are peer advocates, not lawyers. For complex ICBC claims, contact a personal injury lawyer or Legal Aid BC: <a href="https://legalaid.bc.ca" target="_blank" rel="noopener noreferrer" className="text-[#4a90d9] underline">legalaid.bc.ca</a>
          </p>
        </div>
      </div>
    </div>
  );
}

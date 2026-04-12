import React, { useState } from 'react';
import { Accessibility, ChevronDown, ChevronUp, AlertTriangle, FileText, Shield } from 'lucide-react';

const SECTIONS = [
  { title: 'What Is PWD?', content: `Persons with Disabilities (PWD) designation in BC provides a higher monthly assistance rate, additional health supplements, and protections. As of 2024, PWD rate is significantly higher than basic income assistance. You also get extended medical/dental coverage, bus pass, and other supports.` },
  { title: 'Who Qualifies?', content: `You must have a severe physical or mental impairment that:\n• Is likely to continue for at least 2 years\n• Directly and significantly restricts your ability to perform daily living activities (either continuously or periodically)\n• Requires you to have assistance with daily living activities from another person, an assistive device, or an assistance animal\n\nThis includes physical disabilities, mental health conditions, chronic pain, cognitive impairments, and more. You do NOT need to be "totally disabled."` },
  { title: 'The Application Form', content: `The PWD application has several sections:\n\n1. Self-Assessment (you fill this out): Describe YOUR experience. Be specific about your WORST days. Don't minimize.\n\n2. Assessor Report (your doctor fills this out): This is the most important part. Your doctor describes your diagnosis, limitations, and prognosis.\n\n3. Authorization: Standard consent forms.\n\nTIP: Write your self-assessment BEFORE meeting with your doctor. Share it with them so they can align their report.` },
  { title: 'Tips for the Self-Assessment', content: `• Describe your WORST days, not your best\n• Be specific: "I cannot stand longer than 5 minutes without severe pain" beats "I have trouble standing"\n• Include how your condition affects: mobility, personal care, meal prep, social functioning, thinking/memory\n• Mention if you need help from others (even occasionally)\n• Don't be brave or stoic — this is the one time you need to describe every limitation honestly\n• Include frequency: "3-4 days per week I cannot leave the house"` },
  { title: "Doctor's Report Guidance", content: `The assessor (usually your family doctor) must complete the medical section. Tips:\n\n• Book a LONG appointment (tell them it's for PWD paperwork)\n• Bring your self-assessment for reference\n• Ask them to be detailed and specific about restrictions\n• They should describe the FUNCTIONAL impact, not just the diagnosis\n• If your doctor seems reluctant, you can use a different doctor or nurse practitioner\n• Walk-in clinic doctors usually cannot do this — use someone who knows your history` },
];

const DENIAL_REASONS = [
  { reason: 'Not enough detail on functional limitations', fix: 'Rewrite self-assessment with specific examples. Ask doctor to add more detail about daily restrictions.' },
  { reason: 'Condition not expected to last 2+ years', fix: 'Get a supplementary letter from your doctor confirming expected duration and chronic nature.' },
  { reason: 'No evidence of needing assistance', fix: 'Document all help you receive from others, assistive devices, or accommodations you use.' },
  { reason: "Assessment is inconsistent", fix: "Ensure your self-assessment and doctor's report align. They should tell the same story." },
  { reason: 'Missing or incomplete forms', fix: 'Double-check every section is filled out. Submit copies, keep originals.' },
];

const APPEAL_STEPS = [
  'You have 20 business days to request a reconsideration after denial',
  'Write a letter explaining why the decision should be reversed',
  'Include any new medical evidence or letters',
  'If reconsideration fails, you can appeal to the Employment and Assistance Appeal Tribunal',
  'You can have an advocate (like KoRT) help you at any stage',
  'Legal Aid BC may help with tribunal appeals: legalaid.bc.ca',
];

export default function PWDApplication() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <Accessibility className="w-6 h-6 text-[#a855f7]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>
          PWD Application Guide
        </h1>
      </div>
      <p className="text-sm text-[#666] mb-8">BC Persons with Disabilities walkthrough. Plain language, no jargon.</p>

      <div className="space-y-3 mb-10">
        {SECTIONS.map((section, i) => (
          <div key={i} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl overflow-hidden card-glow">
            <button onClick={() => setOpenSection(openSection === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
              <h3 className="text-white font-medium">{section.title}</h3>
              {openSection === i ? <ChevronUp className="w-4 h-4 text-[#c9a84c]" /> : <ChevronDown className="w-4 h-4 text-[#666]" />}
            </button>
            {openSection === i && (
              <div className="px-5 pb-5 border-t border-[#1a1a2e]">
                <p className="text-sm text-[#999] mt-4 whitespace-pre-line leading-relaxed">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#f97316]" />
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Common Denial Reasons & Fixes</h2>
        </div>
        <div className="space-y-3">
          {DENIAL_REASONS.map((item, i) => (
            <div key={i} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5">
              <p className="text-sm text-[#ef4444] font-medium mb-1">❌ {item.reason}</p>
              <p className="text-sm text-[#22c55e]">✅ {item.fix}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#4a90d9]" />
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>If You're Denied: Appeal Steps</h2>
        </div>
        <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
          <ol className="space-y-3">
            {APPEAL_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#4a90d9]/10 text-[#4a90d9] flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-sm text-[#ccc]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl p-5 flex gap-3 mb-10">
        <Shield className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-[#c9a84c] font-medium">Peer Guidance, Not Legal Advice</p>
          <p className="text-xs text-[#888] mt-1">
            For complex disability cases, contact Legal Aid BC: <a href="https://legalaid.bc.ca" target="_blank" rel="noopener noreferrer" className="text-[#4a90d9] underline">legalaid.bc.ca</a> or Disability Alliance BC: <a href="https://disabilityalliancebc.org" target="_blank" rel="noopener noreferrer" className="text-[#4a90d9] underline">disabilityalliancebc.org</a>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FileText, Copy, Download, ArrowLeft, ArrowRight, Loader2, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

const LETTER_TYPES = [
  { key: 'demand',       label: 'Demand Letter',   emoji: '💰', desc: 'Request payment or action owed to you' },
  { key: 'dispute',      label: 'Dispute Letter',   emoji: '⚖️', desc: 'Challenge a decision or charge' },
  { key: 'cease_desist', label: 'Cease & Desist',   emoji: '🛑', desc: 'Demand someone stop an action' },
  { key: 'landlord',     label: 'Landlord Notice',  emoji: '🏠', desc: 'Repairs, rent issues, disputes under BC RTA' },
  { key: 'employer',     label: 'Employer Letter',  emoji: '💼', desc: 'Workplace issues, wage disputes, accommodation' },
  { key: 'bail_hearing', label: 'Bail Hearing Application', emoji: '⚖️', desc: 'Formal application for bail' },
  { key: 'char_ref',     label: 'Character Reference', emoji: '👤', desc: 'Supportive statement for court proceedings' },
  { key: 'legal_aid',    label: 'Legal Aid BC',    emoji: '🏢', desc: 'Application for legal assistance / coverage' },
];

/**
 * ⚖️ LETTER GENERATOR CORE
 * v3.1.0 | Operation OMEGA Stabilization
 */

export default function LetterGenerator() {
  const [step, setStep] = useState(0);
  const [letterType, setLetterType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [formData, setFormData] = useState({
    sender_name: '', sender_address: '', recipient_name: '',
    recipient_address: '', subject: '', details: '',
    desired_outcome: '', deadline_days: '14',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    let templateInstructions = "";
    if (letterType === 'bail_hearing') {
        templateInstructions = "Specifically for a bail hearing in British Columbia. Focus on the 'Ladder Principle' (least restrictive conditions), the three grounds for detention (Primary, Secondary, Tertiary), and proposed community-based release plans including sureties.";
    } else if (letterType === 'char_ref') {
        templateInstructions = "Create a character reference statement for a bail hearing. Focus on the relationship to the accused, the accused's positive traits, their ties to the community, and the writer's willingness to assist with supervision if applicable.";
    } else if (letterType === 'legal_aid') {
        templateInstructions = "Address this to Legal Aid BC. Requesting coverage for a criminal matter. Emphasize the constitutional right to counsel (Section 10b) and the complexity of the case.";
    }

    const prompt = `Generate a professional ${LETTER_TYPES.find(l => l.key === letterType)?.label} for a British Columbia, Canada resident.
${templateInstructions}

Sender: ${formData.sender_name}, ${formData.sender_address}
Recipient: ${formData.recipient_name}, ${formData.recipient_address}
Subject: ${formData.subject}
Details of the issue: ${formData.details}
Desired outcome: ${formData.desired_outcome}
Response deadline: ${formData.deadline_days} days

Format it as a proper business letter with today's date (${format(new Date(), 'MMMM d, yyyy')}).
Use professional but plain language. Reference relevant BC and Canadian laws where applicable (e.g. Criminal Code of Canada, BC Residential Tenancy Act).
Include a clear statement that this is a peer-drafted letter from an advocacy organization (KoRT - Knights of the Round Table), not a law firm.
End with a clear deadline for response.
DO NOT include any AI disclaimers or notes — output ONLY the letter text.`;

    try {
        const { data, error } = await supabase.functions.invoke('generate-letter', {
            body: { prompt }
        });
        
        if (error) throw error;
        setGeneratedLetter(data.text);
        setStep(2);
    } catch (e) {
        console.error(e);
        setGeneratedLetter("ERROR: AI Generator Offline. Please manually draft using the information provided.");
        setStep(2);
    } finally {
        setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert('Letter copied to clipboard');
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letterType}_letter_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = "w-full bg-[#0a0a1a] border border-[#1a1a2e] text-white p-3 rounded-xl focus:outline-none focus:border-[#c9a84c] transition-all placeholder:text-[#444] text-sm";

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-[#e8e8e8]">
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-6 h-6 text-[#c9a84c]" />
        <h1 className="serif text-3xl font-bold text-[#c9a84c] uppercase tracking-tighter italic">Letter Generator</h1>
      </div>
      <p className="text-sm text-[#9090a0] mb-8 italic">Generate professional letters for common advocacy situations.</p>

      {step === 0 && (
        <div className="animate-fade-in">
          <h2 className="serif text-lg text-white font-semibold mb-6 uppercase tracking-widest italic">Choose Letter Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LETTER_TYPES.map(type => (
              <button key={type.key} onClick={() => { setLetterType(type.key); setStep(1); }}
                className="p-6 rounded-2xl border border-white/5 bg-[#0a0a1a] text-left hover:border-[#c9a84c]/30 transition-all card-glow">
                <span className="text-2xl block mb-2">{type.emoji}</span>
                <span className="text-white font-bold text-xs uppercase tracking-widest block">{type.label}</span>
                <span className="text-xs text-[#666] mt-2 block italic">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6 animate-fade-in pb-20">
          <button onClick={() => setStep(0)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666] hover:text-[#ccc] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Change letter type
          </button>
          <h2 className="serif text-lg text-white font-semibold uppercase tracking-widest italic">
            {LETTER_TYPES.find(l => l.key === letterType)?.emoji} {LETTER_TYPES.find(l => l.key === letterType)?.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Your Name</label><input value={formData.sender_name} onChange={(e) => setFormData({...formData, sender_name: e.target.value})} placeholder="Full name" className={inputClass} /></div>
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Your Address</label><input value={formData.sender_address} onChange={(e) => setFormData({...formData, sender_address: e.target.value})} placeholder="City, BC" className={inputClass} /></div>
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Recipient Name</label><input value={formData.recipient_name} onChange={(e) => setFormData({...formData, recipient_name: e.target.value})} placeholder="Person or organization" className={inputClass} /></div>
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Recipient Address</label><input value={formData.recipient_address} onChange={(e) => setFormData({...formData, recipient_address: e.target.value})} placeholder="Address" className={inputClass} /></div>
          </div>
          <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Subject / Re:</label><input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Brief subject line" className={inputClass} /></div>
          <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Details of the Issue</label><textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="Describe what happened, when, and any relevant facts..." rows={5} className={inputClass} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">What You Want</label><input value={formData.desired_outcome} onChange={(e) => setFormData({...formData, desired_outcome: e.target.value})} placeholder="e.g. Full refund, repairs completed" className={inputClass} /></div>
            <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Response Deadline (days)</label><input type="number" value={formData.deadline_days} onChange={(e) => setFormData({...formData, deadline_days: e.target.value})} className={inputClass} /></div>
          </div>
          <div className="flex justify-end pt-8">
            <button onClick={handleGenerate} disabled={!formData.sender_name || !formData.recipient_name || !formData.details || isGenerating} className="bg-[#c9a84c] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#e8d5a3] transition-all disabled:opacity-50 flex items-center gap-2 italic shadow-xl shadow-amber-500/10">
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <>Generate Letter <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in pb-20">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666] hover:text-[#ccc] transition-colors"><ArrowLeft className="w-4 h-4" /> Edit details</button>
            <div className="flex gap-4">
              <button onClick={copyToClipboard} className="px-6 py-2 bg-white/5 border border-white/10 text-stone-300 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all"><Copy size={14} /> Copy</button>
              <button onClick={downloadLetter} className="px-6 py-2 bg-white/5 border border-white/10 text-stone-300 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all"><Download size={14} /> Download</button>
            </div>
          </div>
          <div className="bg-white text-black rounded-3xl p-8 md:p-14 shadow-2xl relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px]"></div>
            <pre className="whitespace-pre-wrap font-serif text-base leading-relaxed">{generatedLetter}</pre>
          </div>
          <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-3xl p-6 flex gap-4 mt-12 shadow-xl shadow-amber-500/5">
            <Shield className="w-6 h-6 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#e8e8e8] font-bold uppercase tracking-widest mb-1">Review Before Sending</p>
              <p className="text-xs text-[#9090a0] leading-relaxed italic">This is an AI-generated draft. Read it carefully and modify as needed. For legal matters, consult <a href="https://legalaid.bc.ca" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] underline">Legal Aid BC</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

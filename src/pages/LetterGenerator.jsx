import React, { useState } from 'react';
import { FileText, Copy, Download, ArrowLeft, ArrowRight, Loader2, Shield } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

const LETTER_TYPES = [
  { key: 'demand',       label: 'Demand Letter',   emoji: '💰', desc: 'Request payment or action owed to you' },
  { key: 'dispute',      label: 'Dispute Letter',   emoji: '⚖️', desc: 'Challenge a decision or charge' },
  { key: 'cease_desist', label: 'Cease & Desist',   emoji: '🛑', desc: 'Demand someone stop an action' },
  { key: 'landlord',     label: 'Landlord Notice',  emoji: '🏠', desc: 'Repairs, rent issues, disputes under BC RTA' },
  { key: 'employer',     label: 'Employer Letter',  emoji: '💼', desc: 'Workplace issues, wage disputes, accommodation' },
];

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
    
    // We'll use a Supabase Edge Function to generate the letter using KoRT's AI logic
    const prompt = `Generate a professional ${LETTER_TYPES.find(l => l.key === letterType)?.label} for a British Columbia, Canada resident.

Sender: ${formData.sender_name}, ${formData.sender_address}
Recipient: ${formData.recipient_name}, ${formData.recipient_address}
Subject: ${formData.subject}
Details of the issue: ${formData.details}
Desired outcome: ${formData.desired_outcome}
Response deadline: ${formData.deadline_days} days

Format it as a proper business letter with today's date (${format(new Date(), 'MMMM d, yyyy')}).
Use professional but plain language. Reference relevant BC laws where applicable.
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
        // Fallback or alert
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

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-6 h-6 text-[#c9a84c]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>Letter Generator</h1>
      </div>
      <p className="text-sm text-[#666] mb-8">Generate professional letters for common advocacy situations.</p>

      {step === 0 && (
        <div>
          <h2 className="text-lg text-white font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Choose Letter Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LETTER_TYPES.map(type => (
              <button key={type.key} onClick={() => { setLetterType(type.key); setStep(1); }}
                className="p-5 rounded-xl border border-[#1a1a2e] bg-[#0a0a1a] text-left hover:border-[#c9a84c]/20 transition-all card-glow">
                <span className="text-2xl block mb-2">{type.emoji}</span>
                <span className="text-white font-medium text-sm block">{type.label}</span>
                <span className="text-xs text-[#666] mt-1 block">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <button onClick={() => setStep(0)} className="flex items-center gap-2 text-sm text-[#666] hover:text-[#ccc] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Change letter type
          </button>
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>
            {LETTER_TYPES.find(l => l.key === letterType)?.emoji} {LETTER_TYPES.find(l => l.key === letterType)?.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Your Name</label><Input value={formData.sender_name} onChange={(e) => setFormData({...formData, sender_name: e.target.value})} placeholder="Full name" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Your Address</label><Input value={formData.sender_address} onChange={(e) => setFormData({...formData, sender_address: e.target.value})} placeholder="City, BC" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Recipient Name</label><Input value={formData.recipient_name} onChange={(e) => setFormData({...formData, recipient_name: e.target.value})} placeholder="Person or organization" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Recipient Address</label><Input value={formData.recipient_address} onChange={(e) => setFormData({...formData, recipient_address: e.target.value})} placeholder="Address" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
          </div>
          <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Subject / Re:</label><Input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Brief subject line" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
          <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Details of the Issue</label><Textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="Describe what happened, when, and any relevant facts..." rows={5} className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">What You Want</label><Input value={formData.desired_outcome} onChange={(e) => setFormData({...formData, desired_outcome: e.target.value})} placeholder="e.g. Full refund, repairs completed" className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
            <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Response Deadline (days)</label><Input type="number" value={formData.deadline_days} onChange={(e) => setFormData({...formData, deadline_days: e.target.value})} className="bg-[#0a0a1a] border-[#1a1a2e] text-white" /></div>
          </div>
          <div className="flex justify-end pt-4 pb-12">
            <Button onClick={handleGenerate} disabled={!formData.sender_name || !formData.recipient_name || !formData.details || isGenerating} className="bg-[#c9a84c] text-[#08080f] hover:bg-[#d4b85e] font-semibold">
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : <>Generate Letter <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="pb-12">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-[#666] hover:text-[#ccc] transition-colors"><ArrowLeft className="w-4 h-4" /> Edit details</button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-[#1a1a2e] text-[#ccc] hover:bg-[#1a1a2e]"><Copy className="w-4 h-4 mr-1" /> Copy</Button>
              <Button variant="outline" size="sm" onClick={downloadLetter} className="border-[#1a1a2e] text-[#ccc] hover:bg-[#1a1a2e]"><Download className="w-4 h-4 mr-1" /> Download</Button>
            </div>
          </div>
          <div className="bg-white text-black rounded-xl p-6 md:p-10 shadow-2xl">
            <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{generatedLetter}</pre>
          </div>
          <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl p-5 flex gap-3 mt-6">
            <Shield className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#c9a84c] font-medium">Review Before Sending</p>
              <p className="text-xs text-[#888] mt-1">This is an AI-generated draft. Read it carefully and modify as needed before sending. For legal matters, consult Legal Aid BC: <a href="https://legalaid.bc.ca" target="_blank" rel="noopener noreferrer" className="text-[#4a90d9] underline">legalaid.bc.ca</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

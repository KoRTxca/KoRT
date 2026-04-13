import React, { useState } from 'react';
import { Lightbulb, Send, CheckCircle } from 'lucide-react';

/**
 * 💡 TOOL SUGGESTION CORE
 * v3.1.0 | Operation OMEGA Stabilization
 */

export default function ToolSuggestion() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', tool_name: '', reason: '' });

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Tool Suggestion: ${formData.tool_name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nSuggested Tool: ${formData.tool_name}\n\nWhy it would be useful:\n${formData.reason}`);
    window.open(`mailto:chimney2curb@gmail.com?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
  };

  const inputClass = "w-full bg-[#0a0a1a] border border-[#1a1a2e] text-white p-3 rounded-xl focus:outline-none focus:border-[#c9a84c] transition-all placeholder:text-[#444] text-sm";

  if (submitted) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto bg-[#08080f] min-h-screen text-[#e8e8e8]">
        <div className="bg-[#0a0a1a] border border-[#22c55e]/20 rounded-3xl p-12 text-center mt-20 shadow-2xl shadow-green-500/5">
          <CheckCircle className="w-16 h-16 text-[#22c55e] mx-auto mb-6" />
          <h2 className="serif text-2xl text-white font-bold mb-4 uppercase tracking-widest italic">Thank You!</h2>
          <p className="text-sm text-[#9090a0] italic">Your suggestion has been logged. The Agent Council will review this for the next Sovereign Sprint.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', tool_name: '', reason: '' }); }} className="mt-8 text-[#c9a84c] text-xs font-bold uppercase tracking-widest underline decoration-[#c9a84c]/30 underline-offset-8">Submit another suggestion</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto bg-[#08080f] min-h-screen text-[#e8e8e8]">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="w-6 h-6 text-[#c9a84c]" />
        <h1 className="serif text-3xl font-bold text-[#c9a84c] uppercase tracking-tighter italic">Suggest a Tool</h1>
      </div>
      <p className="text-sm text-[#9090a0] mb-8 italic">Have an idea for a tool that would help KoRT members? Let us know.</p>

      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-amber-500/5 space-y-6">
        <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Your Name</label><input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" className={inputClass} /></div>
        <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Your Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" className={inputClass} /></div>
        <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Tool Name / Idea</label><input value={formData.tool_name} onChange={(e) => setFormData({ ...formData, tool_name: e.target.value })} placeholder="e.g. Document scanner, template library" className={inputClass} /></div>
        <div><label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Why Would This Be Useful?</label><textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} placeholder="Describe how this tool would help members..." rows={4} className={inputClass} /></div>
        <button 
           onClick={handleSubmit} 
           disabled={!formData.name || !formData.tool_name || !formData.reason} 
           className="w-full bg-[#c9a84c] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#e8d5a3] transition-all disabled:opacity-50 flex items-center justify-center gap-2 italic shadow-xl shadow-amber-500/10"
        >
          <Send className="w-4 h-4" /> Submit Suggestion
        </button>
      </div>
    </div>
  );
}

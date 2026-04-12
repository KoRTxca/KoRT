import React, { useState } from 'react'
import { Lightbulb, Send, CheckCircle } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'

export default function ToolSuggestion() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', tool_name: '', reason: '' });

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Tool Suggestion: ${formData.tool_name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nSuggested Tool: ${formData.tool_name}\n\nWhy it would be useful:\n${formData.reason}`);
    window.open(`mailto:chimney2curb@gmail.com?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto bg-[#08080f] min-h-screen text-white">
        <div className="bg-[#0a0a1a] border border-[#22c55e]/20 rounded-xl p-8 text-center mt-20">
          <CheckCircle className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
          <h2 className="text-xl text-white font-semibold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Thank You!</h2>
          <p className="text-sm text-[#888]">Your email client should have opened with the suggestion. Send it to complete the submission.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', tool_name: '', reason: '' }); }} className="mt-4 text-[#c9a84c] text-sm underline">Submit another suggestion</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="w-6 h-6 text-[#c9a84c]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>Suggest a Tool</h1>
      </div>
      <p className="text-sm text-[#666] mb-8">Have an idea for a tool that would help KoRT members? Let us know.</p>

      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 md:p-6 card-glow space-y-5">
        <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Your Name</label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" className="bg-[#08080f] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
        <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Your Email</label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" className="bg-[#08080f] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
        <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Tool Name / Idea</label><Input value={formData.tool_name} onChange={(e) => setFormData({ ...formData, tool_name: e.target.value })} placeholder="e.g. Document scanner, template library" className="bg-[#08080f] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
        <div><label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Why Would This Be Useful?</label><Textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} placeholder="Describe how this tool would help members..." rows={4} className="bg-[#08080f] border-[#1a1a2e] text-white placeholder:text-[#444]" /></div>
        <Button onClick={handleSubmit} disabled={!formData.name || !formData.tool_name || !formData.reason} className="w-full bg-[#c9a84c] text-[#08080f] hover:bg-[#d4b85e] font-semibold">
          <Send className="w-4 h-4 mr-2" /> Submit Suggestion
        </Button>
      </div>
    </div>
  );
}

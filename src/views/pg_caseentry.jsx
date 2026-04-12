import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { CASE_TYPES } from '../components/herald/casetypebadge'

const STEPS = ['type', 'details'];

export default function NewCase() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    case_type: '',
    title: '',
    notes: '',
    next_deadline: '',
    deadline_label: '',
    accident_date: '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const payload = { 
        ...formData, 
        member_id: user?.id,
        status: 'open' 
    };
    if (!payload.next_deadline) delete payload.next_deadline;
    if (!payload.deadline_label) delete payload.deadline_label;
    if (!payload.accident_date) delete payload.accident_date;

    const { error } = await supabase.from('advocate_cases').insert([payload]);
    
    if (error) {
        console.error(error);
        setIsSubmitting(false);
    } else {
        navigate('/herald');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <button onClick={() => navigate('/herald')} className="flex items-center gap-2 text-sm text-[#666] hover:text-[#ccc] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
        Open New Case
      </h1>
      <p className="text-sm text-[#666] mb-8">We'll guide you through the process. You are not alone.</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ${
              i <= step ? 'bg-[#c9a84c]/20 border-[#c9a84c]/40 text-[#c9a84c]' : 'border-[#1a1a2e] text-[#444]'
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px ${i < step ? 'bg-[#c9a84c]/40' : 'bg-[#1a1a2e]'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="text-lg text-white font-semibold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            What type of issue are you dealing with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(CASE_TYPES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => { setFormData({ ...formData, case_type: key }); setStep(1); }}
                className={`p-5 rounded-xl border text-left transition-all card-glow ${
                  formData.case_type === key
                    ? 'border-[#c9a84c]/40 bg-[#c9a84c]/5'
                    : 'border-[#1a1a2e] bg-[#0a0a1a] hover:border-[#c9a84c]/20'
                }`}
              >
                <span className="text-3xl block mb-2">{config.emoji}</span>
                <span className="text-white font-medium text-sm">{config.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-lg text-white font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>
            Case Details
          </h2>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Case Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. ICBC claim after rear-end collision"
              className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]"
            />
          </div>

          <div>
            <label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Notes / Description</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe your situation in your own words..."
              rows={4}
              className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Next Deadline (optional)</label>
              <Input
                type="date"
                value={formData.next_deadline}
                onChange={(e) => setFormData({ ...formData, next_deadline: e.target.value })}
                className="bg-[#0a0a1a] border-[#1a1a2e] text-white"
              />
            </div>
            <div>
              <label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Deadline For</label>
              <Input
                value={formData.deadline_label}
                onChange={(e) => setFormData({ ...formData, deadline_label: e.target.value })}
                placeholder="e.g. File initial claim"
                className="bg-[#0a0a1a] border-[#1a1a2e] text-white placeholder:text-[#444]"
              />
            </div>
          </div>

          {formData.case_type === 'icbc_claim' && (
            <div>
              <label className="text-xs text-[#888] uppercase tracking-wider block mb-1.5">Accident Date</label>
              <Input
                type="date"
                value={formData.accident_date || ''}
                onChange={(e) => setFormData({ ...formData, accident_date: e.target.value })}
                className="bg-[#0a0a1a] border-[#1a1a2e] text-white"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button onClick={() => setStep(0)} className="flex items-center gap-2 text-sm text-[#666] hover:text-[#ccc] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.title || isSubmitting}
              className="bg-[#c9a84c] text-[#08080f] hover:bg-[#d4b85e] font-semibold"
            >
              {isSubmitting ? 'Creating...' : 'Create Case'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

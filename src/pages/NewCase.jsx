import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CASE_TYPES } from '../components/herald/CaseTypeBadge';

const STEPS = ['type', 'details'];

/**
 * ⚖️ NEW CASE ENTRY CORE
 * v3.1.0 | Operation OMEGA Stabilization
 */

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
        navigate('/advocacy');
    }
  };

  const inputClass = "w-full bg-[#0a0a1a] border border-[#1a1a2e] text-white p-3 rounded-xl focus:outline-none focus:border-[#c9a84c] transition-all placeholder:text-[#444] text-sm";

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-[#08080f] min-h-screen text-[#e8e8e8]">
      <button onClick={() => navigate('/advocacy')} className="flex items-center gap-2 text-sm text-[#666] hover:text-[#ccc] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h1 className="serif text-3xl font-bold text-[#c9a84c] mb-2 uppercase tracking-tighter italic">
        Open New Case
      </h1>
      <p className="text-sm text-[#9090a0] mb-8 italic">We'll guide you through the process. You are not alone.</p>

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
        <div className="animate-fade-in">
          <h2 className="serif text-lg text-white font-semibold mb-6 uppercase tracking-widest italic">
            What type of issue are you dealing with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(CASE_TYPES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => { setFormData({ ...formData, case_type: key }); setStep(1); }}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  formData.case_type === key
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10'
                    : 'border-white/5 bg-[#0a0a1a] hover:border-[#c9a84c]/30'
                }`}
              >
                <span className="text-3xl block mb-2">{config.emoji}</span>
                <span className="text-white font-bold text-xs uppercase tracking-widest">{config.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="serif text-lg text-white font-semibold uppercase tracking-widest italic">
            Case Details
          </h2>

          <div>
            <label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Case Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. ICBC claim after rear-end collision"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Notes / Description</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe your situation in your own words..."
              rows={4}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Next Deadline (optional)</label>
              <input
                type="date"
                value={formData.next_deadline}
                onChange={(e) => setFormData({ ...formData, next_deadline: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[10px] text-[#c9a84c] uppercase font-bold tracking-[0.2em] block mb-2">Deadline For</label>
              <input
                value={formData.deadline_label}
                onChange={(e) => setFormData({ ...formData, deadline_label: e.target.value })}
                placeholder="e.g. File initial claim"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            <button onClick={() => setStep(0)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#666] hover:text-[#ccc] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.title || isSubmitting}
              className="bg-[#c9a84c] text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#e8d5a3] transition-all disabled:opacity-50 flex items-center gap-2 italic"
            >
              {isSubmitting ? 'Creating...' : 'Create Case'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

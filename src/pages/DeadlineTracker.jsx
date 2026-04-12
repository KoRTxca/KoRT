import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock } from 'lucide-react';
import { differenceInDays, parseISO, format } from 'date-fns';
import CaseTypeBadge from '../components/herald/CaseTypeBadge';

export default function DeadlineTracker() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.from('advocate_cases').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
        if (!error) setCases(data);
        setIsLoading(false);
    });
  }, []);

  const casesWithDeadlines = cases
    .filter(c => c.next_deadline && ['open', 'in_progress', 'waiting'].includes(c.status))
    .map(c => ({ ...c, daysLeft: differenceInDays(parseISO(c.next_deadline), new Date()) }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const getColor = (days) => {
    if (days <= 0)  return { text: 'text-[#ef4444]', bg: '#ef4444', border: 'border-[#ef4444]/20', label: 'OVERDUE' };
    if (days <= 7)  return { text: 'text-[#ef4444]', bg: '#ef4444', border: 'border-[#ef4444]/20', label: `${days}d left` };
    if (days <= 30) return { text: 'text-[#f97316]', bg: '#f97316', border: 'border-[#f97316]/20', label: `${days}d left` };
    return           { text: 'text-[#22c55e]',  bg: '#22c55e',  border: 'border-[#22c55e]/20',  label: `${days}d left` };
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="w-6 h-6 text-[#c9a84c]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>Deadline Tracker</h1>
      </div>
      <p className="text-sm text-[#666] mb-8">Never miss a deadline. All open case deadlines at a glance.</p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#ef4444]">{casesWithDeadlines.filter(c => c.daysLeft <= 7).length}</p>
          <p className="text-xs text-[#ef4444]/70 mt-1">Urgent (≤7d)</p>
        </div>
        <div className="bg-[#f97316]/5 border border-[#f97316]/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#f97316]">{casesWithDeadlines.filter(c => c.daysLeft > 7 && c.daysLeft <= 30).length}</p>
          <p className="text-xs text-[#f97316]/70 mt-1">Soon (8-30d)</p>
        </div>
        <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{casesWithDeadlines.filter(c => c.daysLeft > 30).length}</p>
          <p className="text-xs text-[#22c55e]/70 mt-1">On Track (30d+)</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => (<div key={i} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 animate-pulse"><div className="h-4 bg-[#1a1a2e] rounded w-1/3" /></div>))}</div>
      ) : casesWithDeadlines.length === 0 ? (
        <div className="bg-[#0a0a1a] border border-[#1a1a2e] border-dashed rounded-xl p-12 text-center">
          <Clock className="w-8 h-8 text-[#333] mx-auto mb-3" />
          <p className="text-[#666]">No upcoming deadlines. Set deadlines on your cases to track them here.</p>
        </div>
      ) : (
        <div className="space-y-3 pb-12">
          {casesWithDeadlines.map(c => {
            const color = getColor(c.daysLeft);
            return (
              <div key={c.id} className={`bg-[#0a0a1a] border ${color.border} rounded-xl p-4 md:p-5 card-glow`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <CaseTypeBadge type={c.case_type} />
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${color.text}`} style={{ backgroundColor: `${color.bg}15` }}>{color.label}</span>
                    </div>
                    <h3 className="text-white font-medium text-sm">{c.title}</h3>
                    {c.deadline_label && <p className="text-xs text-[#888] mt-1">{c.deadline_label}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-semibold ${color.text}`}>{format(parseISO(c.next_deadline), 'MMM d')}</p>
                    <p className="text-xs text-[#666]">{format(parseISO(c.next_deadline), 'yyyy')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

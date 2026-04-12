import React from 'react'
import { Link } from 'react-router-dom'
import { differenceInDays, parseISO, format } from 'date-fns'
import { MessageSquare, ChevronRight } from 'lucide-react'
import CaseTypeBadge from '../herald/casetypebadge'
import StatusBadge from '../herald/statusbadge'

export default function CasesList({ cases, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 animate-pulse">
            <div className="h-4 bg-[#1a1a2e] rounded w-1/3 mb-3" />
            <div className="h-3 bg-[#1a1a2e] rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="bg-[#0a0a1a] border border-[#1a1a2e] border-dashed rounded-xl p-12 text-center">
        <p className="text-[#666] mb-4">No cases yet. Open your first case to get started.</p>
        <Link
          to="/herald/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 rounded-lg text-sm hover:bg-[#c9a84c]/20 transition-colors"
        >
          Open New Case
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm text-[#666] uppercase tracking-wider mb-2">All Cases</h2>
      {cases.map(c => {
        const daysToDeadline = c.next_deadline
          ? differenceInDays(parseISO(c.next_deadline), new Date())
          : null;
        const isUrgent = daysToDeadline !== null && daysToDeadline <= 14;

        return (
          <div key={c.id} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-4 md:p-5 card-glow hover:border-[#c9a84c]/20 transition-all group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <CaseTypeBadge type={c.case_type} />
                  <StatusBadge status={c.status} />
                </div>
                <h3 className="text-white font-medium truncate">{c.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#666]">
                  <span>Opened {format(new Date(c.created_at), 'MMM d, yyyy')}</span>
                  {c.next_deadline && (
                    <span className={`flex items-center gap-1 ${isUrgent ? 'text-[#ef4444] font-medium' : ''}`}>
                      Deadline: {format(parseISO(c.next_deadline), 'MMM d, yyyy')}
                      {isUrgent && ' ⚠️'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/herald/assistant?caseId=${c.id}`}
                  className="p-2 rounded-lg text-[#666] hover:text-[#4a90d9] hover:bg-[#4a90d9]/10 transition-colors"
                  title="AI Assistant"
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-[#c9a84c] transition-colors" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

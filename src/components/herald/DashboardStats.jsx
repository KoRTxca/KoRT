import React from 'react';
import { Briefcase, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function DashboardStats({ openCount, resolvedCount, daysToNext, nextDeadlineLabel }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#4a90d9]/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-[#4a90d9]" />
          </div>
          <span className="text-xs text-[#666] uppercase tracking-wider">Open Cases</span>
        </div>
        <p className="text-3xl font-bold text-white">{openCount}</p>
      </div>

      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          </div>
          <span className="text-xs text-[#666] uppercase tracking-wider">Resolved</span>
        </div>
        <p className="text-3xl font-bold text-white">{resolvedCount}</p>
      </div>

      <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 card-glow">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#ef4444]/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          </div>
          <span className="text-xs text-[#666] uppercase tracking-wider">Next Deadline</span>
        </div>
        {daysToNext !== null ? (
          <>
            <p className={`text-3xl font-bold ${daysToNext <= 14 ? 'text-[#ef4444]' : daysToNext <= 30 ? 'text-[#f97316]' : 'text-white'}`}>
              {daysToNext <= 0 ? 'Overdue' : `${daysToNext}d`}
            </p>
            {nextDeadlineLabel && (
              <p className="text-xs text-[#666] mt-1 truncate">{nextDeadlineLabel}</p>
            )}
          </>
        ) : (
          <p className="text-lg text-[#444]">No deadlines</p>
        )}
      </div>
    </div>
  );
}

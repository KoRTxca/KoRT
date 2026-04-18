import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Plus } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import DashboardStats from '../components/herald/DashboardStats';
import CasesList from '../components/herald/CasesList';

export default function HeraldDashboard() {
  const { user } = useOutletContext();
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase.from('advocate_cases').select('*').order('created_at', { ascending: false });
      if (!error) setCases(data);
      setIsLoading(false);
    };
    fetchCases();
  }, []);

  const openCases = cases.filter(c => ['open', 'in_progress', 'waiting'].includes(c.status));
  const resolvedCases = cases.filter(c => ['resolved', 'closed'].includes(c.status));

  const nextDeadline = openCases
    .filter(c => c.next_deadline)
    .sort((a, b) => new Date(a.next_deadline) - new Date(b.next_deadline))[0];

  const daysToNext = nextDeadline
    ? differenceInDays(parseISO(nextDeadline.next_deadline), new Date())
    : null;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-[#08080f] animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#c9a84c] uppercase tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>
            The Herald
          </h1>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-stone-500 mt-2">
            {user?.handle ? `TACTICAL DEFENSE // NODE: ${user.handle}` : 'ACTIVE ADVOCACY CASES'}
          </p>
        </div>
        <Link
          to="/herald/new"
          className="inline-flex items-center gap-3 px-8 py-3 bg-[#c9a84c] text-[#08080f] rounded shadow-[0_0_20px_rgba(201,168,76,0.3)] font-black uppercase tracking-widest text-xs hover:bg-[#d4b85e] transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Open New Case
        </Link>
      </div>

      <div className="glass-vault p-2 rounded-2xl mb-12">
        <div className="bg-[#050505] border border-white/5 rounded-xl p-8">
          <DashboardStats
            openCount={openCases.length}
            resolvedCount={resolvedCases.length}
            daysToNext={daysToNext}
            nextDeadlineLabel={nextDeadline?.deadline_label}
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-[#c9a84c] to-transparent"></div>
        <h2 className="serif text-xl font-bold text-white uppercase tracking-widest mb-8 ml-6">Active Case Files</h2>
        <CasesList cases={cases} isLoading={isLoading} />
      </div>
    </div>
  );
}

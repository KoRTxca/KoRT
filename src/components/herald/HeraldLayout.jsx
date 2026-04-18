import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import HeraldSidebar from './HeraldSidebar';

export default function HeraldLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        // Fetch extra profile info from users table if needed
        supabase.from('users').select('*').eq('id', user.id).single().then(({ data }) => {
          setUser({ ...user, ...data });
        });
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-[#08080f] overflow-hidden">
      <HeraldSidebar user={user} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#1a1a2e] bg-[#0a0a1a]">
          <button onClick={() => setSidebarOpen(true)} className="text-[#888] hover:text-[#ccc]">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>
            The Herald
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

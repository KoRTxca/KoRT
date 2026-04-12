import React from 'react'
import { Shield, Globe, Lock, Cpu } from 'lucide-react'

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  const systemInfo = "NODE-ID: KORT-VULCAN-X1 | LOC: BC, CANADA | MAC: CLASSIFIED";

  return (
    <footer className="w-full bg-[#050505] border-t border-amber-500/20 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand & Mission */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-amber-500" size={24} />
            <span className="serif text-xl font-bold tracking-widest text-white">KoRT SOVEREIGN</span>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6 italic">
            "The 4th Option for 911." A decentralized, peer-powered crisis response and digital earning ecosystem ensuring no one gets left behind.
          </p>
          <div className="flex gap-4">
             <a href="#" className="p-2 bg-white/5 border border-white/10 rounded hover:border-amber-500/50 transition-colors">
                <Globe size={18} className="text-stone-400" />
             </a>
             <a href="#" className="p-2 bg-white/5 border border-white/10 rounded hover:border-amber-500/50 transition-colors">
                <Lock size={18} className="text-stone-400" />
             </a>
             <a href="#" className="p-2 bg-white/5 border border-white/10 rounded hover:border-amber-500/50 transition-colors">
                <Cpu size={18} className="text-stone-400" />
             </a>
          </div>
        </div>

        {/* System & Compliance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
           <div>
              <h4 className="serif text-xs font-bold text-amber-500 uppercase tracking-widest mb-6">Sovereign Compliance</h4>
              <ul className="space-y-3 text-xs uppercase tracking-widest font-bold">
                 <li><a href="/privacy" className="text-stone-500 hover:text-white transition-colors">Privacy Pulse</a></li>
                 <li><a href="/terms" className="text-stone-500 hover:text-white transition-colors">Terms of the Blood Oath</a></li>
                 <li><a href="/compliance" className="text-stone-500 hover:text-white transition-colors">Reg-D / SEC Transparency</a></li>
                 <li><a href="/disclaimer" className="text-stone-500 hover:text-white transition-colors">Sovereign Disclaimer</a></li>
              </ul>
           </div>
           <div>
              <h4 className="serif text-xs font-bold text-amber-500 uppercase tracking-widest mb-6">Resource Nodes</h4>
              <ul className="space-y-3 text-xs uppercase tracking-widest font-bold">
                 <li><a href="/library" className="text-stone-500 hover:text-white transition-colors">Digital Archive</a></li>
                 <li><a href="/scribe" className="text-stone-500 hover:text-white transition-colors">Harvester Logs</a></li>
                 <li><a href="/watch" className="text-stone-500 hover:text-white transition-colors">The Watch Desk</a></li>
                 <li><a href="/settings" className="text-stone-500 hover:text-white transition-colors">System Metrics</a></li>
              </ul>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
           {systemInfo}
        </div>
        <div className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">
           © {currentYear} KNIGHTS OF THE ROUND TABLE // ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}

import React from 'react'
import { BookOpen, Search, Shield, Lock, Download, FileText, Bookmark } from 'lucide-react'

export default function Library() {
  const archives = [
    { title: "Sovereign Blueprints", category: "Architecture", date: "v1.0.42" },
    { title: "Legacy Node Recovery", category: "Tactical", date: "April 2026" },
    { title: "Merlin Protocol Logs", category: "Intelligence", date: "Real-time" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8 mb-12">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <BookOpen size={12} /> Universal Archive Node
             </div>
             <h1 className="serif text-5xl font-black text-white uppercase tracking-tighter">THE <span className="text-purple-500">ARCHIVE</span></h1>
             <p className="text-stone-400 text-lg font-light mt-2 max-w-2xl">
                The centralized repository of KoRT tactical knowledge, business blueprints, and PPLR assets preserved for the new digital sovereignty.
             </p>
          </div>
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
             <input type="text" placeholder="Search the scrolls..." className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all font-mono" />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archives.map((doc, i) => (
             <div key={i} className="glass-vault p-6 border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-white/5 rounded-xl text-purple-500 group-hover:bg-purple-500/10 transition-colors">
                      <FileText size={24} />
                   </div>
                   <Bookmark size={16} className="text-stone-700 group-hover:text-purple-500 transition-colors" />
                </div>
                <h3 className="serif text-xl font-bold text-white mb-2 uppercase group-hover:text-purple-400 transition-colors">{doc.title}</h3>
                <div className="flex items-center gap-4 text-[9px] font-mono text-stone-500 uppercase tracking-widest">
                   <span className="text-purple-500/50">{doc.category}</span>
                   <span>{doc.date}</span>
                </div>
             </div>
          ))}
       </div>

       {/* Empty State / Coming Soon */}
       <div className="mt-20 p-20 border-2 border-dashed border-white/5 rounded-3xl text-center flex flex-col items-center justify-center opacity-40">
          <Lock size={48} className="text-stone-600 mb-6" />
          <p className="serif text-xs uppercase tracking-[0.4em] font-black text-stone-500">Restricted Sector // Founding Badge Required</p>
       </div>
    </div>
  );
}

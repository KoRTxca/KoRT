import React from 'react';
import { BookOpen, Key, Link as LinkIcon, Database, Gamepad2, FileArchive } from 'lucide-react';

export default function Library() {
  
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      <div className="mb-12 border-b border-white/10 pb-8 flex items-center justify-between">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen size={14} /> Sovereign Repository 
            </div>
            <h1 className="serif text-5xl font-bold mb-2">THE <span className="text-teal-400">ARCHIVE</span></h1>
            <p className="text-lg text-stone-400 font-light max-w-2xl">
              Access the White-Label tools, PLR repositories, structural diagrams, and native local game hubs.
            </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
         {/* DB Architecture */}
         <div className="glass p-8 rounded-xl border-t-4 border-blue-500/80">
            <Database className="text-blue-500 mb-6" size={32} />
            <h3 className="serif text-2xl text-white mb-2 uppercase tracking-wide">Ecosystem DB Schema</h3>
            <p className="text-xs text-stone-400 font-sans mb-6">
               The digital dollars local-currency blueprint mapped by Claude/Gemini. Methods for a 100% self-sufficient loop.
            </p>
            <div className="bg-[#050505] border border-blue-900 rounded p-4 font-mono text-[10px] text-blue-300 leading-relaxed max-h-48 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-blue-900">
               // KORT_OS SUPABASE SCHEMA DRAFT<br/>
               Table: auth_knights<br/>
               - pk_uuid (UUID)<br/>
               - class_matrix (TEXT)<br/>
               - active_node (BOOLEAN)<br/><br/>
               Table: digital_ledger<br/>
               - trx_id (UUID)<br/>
               - ubi_dist_fiat (DECIMAL)<br/>
               - ubi_dist_resource (TEXT)<br/>
               - proof_of_work (JSON)
            </div>
            <button className="w-full py-3 bg-blue-900/20 text-blue-400 border border-blue-500/50 hover:bg-blue-900/50 uppercase tracking-widest text-xs font-bold transition-all">Submit for Sync</button>
         </div>

         {/* Tools & PLR */}
         <div className="glass p-8 rounded-xl border-t-4 border-amber-500/80 md:col-span-2">
            <Key className="text-amber-500 mb-6" size={32} />
            <h3 className="serif text-2xl text-white mb-2 uppercase tracking-wide">White-Label & PLR Master Vault</h3>
            <p className="text-xs text-stone-400 font-sans mb-8">
               Free tools and systems to jumpstart freelance monetization. No licensing restrictions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-black/60 border border-stone-800 p-5 rounded hover:border-amber-500/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-white text-sm group-hover:text-amber-500">Claude/Gemini AI Outputs</span>
                     <FileArchive size={14} className="text-stone-500" />
                  </div>
                  <p className="text-[10px] text-stone-500 uppercase font-mono">D:\Claude-outputs mapped</p>
               </div>

               <div className="bg-black/60 border border-stone-800 p-5 rounded hover:border-amber-500/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-white text-sm group-hover:text-amber-500">BuyWebsiteToProfit UI Kit</span>
                     <LinkIcon size={14} className="text-stone-500" />
                  </div>
                  <p className="text-[10px] text-stone-500 uppercase font-mono">HTML/Tailwind ZIP Archive</p>
               </div>

               <div className="bg-black/60 border border-stone-800 p-5 rounded hover:border-amber-500/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-white text-sm group-hover:text-amber-500">GPT Comparison Sandbox</span>
                     <FileArchive size={14} className="text-stone-500" />
                  </div>
                  <p className="text-[10px] text-stone-500 uppercase font-mono">Articles / Prompt Chains</p>
               </div>

               <div className="bg-black/60 border border-stone-800 p-5 rounded hover:border-amber-500/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-white text-sm group-hover:text-amber-500">Local Networking Protocol</span>
                     <LinkIcon size={14} className="text-stone-500" />
                  </div>
                  <p className="text-[10px] text-stone-500 uppercase font-mono">Gun.js P2P Framework</p>
               </div>
            </div>
         </div>

         {/* Gaming Hub */}
         <div className="glass p-8 rounded-xl border-t-4 border-purple-500/80 md:col-span-3 mt-4 bg-gradient-to-r from-black/80 to-purple-900/10">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-4">
                  <Gamepad2 className="text-purple-500" size={40} />
                  <div>
                    <h3 className="serif text-3xl text-white uppercase tracking-wide">The Arena</h3>
                    <p className="text-xs text-stone-400 font-sans">Our natively deployed games. Play-to-Earn structure parsing.</p>
                  </div>
               </div>
               <button className="px-6 py-2 border border-purple-500 text-purple-400 hover:bg-purple-900/30 uppercase text-xs tracking-widest font-bold">Mount Directory</button>
            </div>

            <div className="flex items-center justify-center h-32 border border-dashed border-stone-800 bg-black/40 rounded">
               <p className="text-stone-600 font-mono text-sm uppercase tracking-widest text-center">
                  [ WAITING ON DIRECTORY PATH FROM D:\ TO MOUNT LOCAL GAME EXECUTABLES ]
               </p>
            </div>
         </div>

      </div>

    </div>
  );
}

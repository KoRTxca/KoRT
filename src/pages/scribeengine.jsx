import React, { useState, useEffect, useRef } from 'react'
import { PenTool, Brain, Search, Terminal, Download, Shield, Loader2, Cpu, Database } from 'lucide-react'
import { merlinClient } from '../lib/os_core'

export default function ScribeEngine() {
  const [logs, setLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [command, setCommand] = useState('');
  const logEndRef = useRef(null);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now(), msg, type, time: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleInitiateScribe = async () => {
    if (isScanning) return;
    setIsScanning(true);
    addLog("Digital Scribe Handshake Initiated...", "warning");
    addLog("Connecting to Merlin Node // 70B Tactical logic...", "info");
    
    try {
      const isOnline = await merlinClient.checkStatus();
      if (!isOnline) throw new Error("Local worker offline");
      
      addLog("Node Online. Sector D: Scanning established.", "success");
      const res = await merlinClient.generate("Initialize sector scan report. Focus on tactical assets and knowledge preservation.");
      addLog(`Scribe Intelligence Received: ${res.substring(0, 100)}...`, "info");
      
    } catch (e) {
      addLog(`CRITICAL: Connection Severed - ${e.message}`, "error");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col gap-8 animate-fade-in">
      
      {/* Header Matrix */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
               <PenTool size={12} /> Knowledge Harvester Protocol
            </div>
            <h1 className="serif text-5xl font-black text-white uppercase tracking-tighter">DIGITAL <span className="text-teal-500">SCRIBE</span></h1>
            <p className="text-stone-400 text-lg font-light mt-2 max-w-2xl">
               Autonomous data extraction and archival engine. Digested tactical intelligence recovered from legacy nodes and sector-wide scans.
            </p>
         </div>
         <div className="flex gap-4">
            <div className="bg-[#0a0a1a] border border-white/10 p-4 rounded-xl flex items-center gap-4">
               <Cpu className="text-teal-500" size={24} />
               <div className="flex flex-col">
                  <span className="text-[9px] uppercase text-stone-500 font-bold tracking-widest">Logic Node</span>
                  <span className="text-xs text-white font-mono">Merlin v1.02</span>
               </div>
            </div>
            <button 
               onClick={handleInitiateScribe}
               disabled={isScanning}
               className="bg-teal-600 hover:bg-teal-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
            >
               {isScanning ? <Loader2 className="animate-spin" size={18} /> : <Terminal size={18} />}
               {isScanning ? 'Harvesting...' : 'Initiate Scan'}
            </button>
         </div>
      </div>

      {/* Main Terminal Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
         
         {/* Live Harvester Output */}
         <div className="lg:col-span-2 flex flex-col bg-[#050510] border border-teal-500/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-teal-500/5 border-b border-white/5 flex justify-between items-center">
               <span className="text-[10px] uppercase tracking-widest text-teal-500 font-black">Harvester Console // Live Stream</span>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>
            </div>
            
            <div className="flex-grow p-6 font-mono text-sm overflow-y-auto max-h-[500px] space-y-3 scrollbar-thin scrollbar-thumb-teal-900">
               {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-700 opacity-50 space-y-4 py-20">
                     <Database size={48} />
                     <p className="uppercase tracking-[0.3em] text-xs">Awaiting Directive...</p>
                  </div>
               ) : (
                  logs.map(log => (
                     <div key={log.id} className="flex gap-4 animate-in slide-in-from-left-2 duration-300">
                        <span className="text-stone-600 shrink-0">[{log.time}]</span>
                        <span className={`
                           ${log.type === 'error' ? 'text-red-500' : 
                             log.type === 'success' ? 'text-green-500' : 
                             log.type === 'warning' ? 'text-amber-500' : 'text-teal-400'}
                        `}>
                           {log.type === 'error' ? '>>> CRITICAL:' : 
                             log.type === 'warning' ? '>>> HANDSHAKE:' : '>>>'} {log.msg}
                        </span>
                     </div>
                  ))
               )}
               <div ref={logEndRef} />
            </div>

            <div className="p-4 bg-black border-t border-white/5 flex gap-4">
               <span className="text-teal-500 font-bold shrink-0">merlin@sovereign:~$</span>
               <input 
                  type="text"
                  placeholder="Send tactical directive to Merlin..."
                  className="bg-transparent border-none outline-none text-white flex-grow font-mono text-sm"
               />
            </div>
         </div>

         {/* Sector Metrics & Files */}
         <div className="flex flex-col gap-6">
            <div className="bg-[#0a0a1a] border border-white/10 p-6 rounded-2xl">
               <h3 className="serif text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                  <Search size={20} className="text-teal-500" /> Sector Matrix
               </h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-stone-500">
                     <span>Sector D: (Local)</span>
                     <span className="text-teal-500">Authenticated</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                     <div className="bg-teal-500 h-full w-[85%]"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-stone-500 pt-4">
                     <span>Personal Archives</span>
                     <span className="text-amber-500">Parsing...</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                     <div className="bg-amber-500 h-full w-[42%] animate-pulse"></div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0a0a1a] border border-white/10 p-6 rounded-2xl flex-grow">
               <h3 className="serif text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                  <Download size={20} className="text-teal-500" /> Recovered Assets
               </h3>
               <div className="space-y-2 text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  <div className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center">
                     <span>merlin_tactical_v1.log</span>
                     <span className="text-stone-600">4.2MB</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center">
                     <span>dossier_founding.pdf</span>
                     <span className="text-stone-600">12.1MB</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center">
                     <span>logic_gate_manifest.csv</span>
                     <span className="text-stone-600">0.8MB</span>
                  </div>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}

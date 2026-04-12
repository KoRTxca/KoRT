import React, { useState } from 'react';

export default function ScribeEngine() {
  const [ingestState, setIngestState] = useState('idle'); // idle, scanning, encrypting, complete
  const [progress, setProgress] = useState(0);

  const triggerArcheologyScan = () => {
      setIngestState('scanning');
      setProgress(0);
      
      const interval = setInterval(() => {
          setProgress(p => {
              if (p >= 100) {
                  clearInterval(interval);
                  setIngestState('encrypting');
                  setTimeout(() => setIngestState('complete'), 2000);
                  return 100;
              }
              return p + Math.floor(Math.random() * 15);
          });
      }, 400);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      <div className="mb-12 border-b border-white/10 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              Digital Archeology Core
            </div>
            <h1 className="serif text-5xl font-bold mb-4">THE <span className="text-teal-400">SCRIBE</span></h1>
            <p className="text-lg text-stone-400 font-light">Extraction and resurrection engine for legacy logic from the Genesis Grave (1991-2025). Feeding past "Lemons" into the Lemonade Factory.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Target Registry */}
          <div className="glass p-8 rounded-xl border-t-4 border-teal-500 lg:col-span-2">
              <h3 className="serif text-2xl mb-8 text-white uppercase flex justify-between items-center">
                  Primary Extraction Targets
                  <span className="text-xs tracking-widest text-teal-400 font-mono bg-teal-900/40 px-3 py-1 rounded border border-teal-500/30">SCANNING SECTOR: D:\ NODE</span>
              </h3>
              
              <div className="space-y-4 mb-8">
                  <div className="bg-black/60 border border-white/10 rounded-lg p-5 flex items-center justify-between group">
                      <div>
                          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-1">Secret Energy Formula</h4>
                          <p className="text-xs text-stone-400">Healer-era research & iteration tracking</p>
                      </div>
                      <div className="text-stone-600 font-mono text-xs uppercase tracking-widest">Status: Offline</div>
                  </div>

                  <div className="bg-black/60 border border-white/10 rounded-lg p-5 flex items-center justify-between group">
                      <div>
                          <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-1">BuyWebsiteToProfit.com</h4>
                          <p className="text-xs text-stone-400">Business logic and early web-flipping metrics</p>
                      </div>
                      <div className="text-stone-600 font-mono text-xs uppercase tracking-widest">Status: Offline</div>
                  </div>

                  <div className="bg-black/60 border border-white/10 rounded-lg p-5 flex items-center justify-between group">
                      <div>
                          <h4 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-1">Listen95 / Listen2</h4>
                          <p className="text-xs text-stone-400">JTS MicroConsulting text-to-speech Pioneer binaries</p>
                      </div>
                      <div className="text-stone-600 font-mono text-xs uppercase tracking-widest">Status: Offline</div>
                  </div>
              </div>

              {/* Intake Funnel */}
              <div className="border border-dashed border-stone-600 bg-stone-900/30 rounded-lg p-10 text-center transition-colors hover:border-teal-400 hover:bg-teal-900/10 cursor-pointer" onClick={ingestState === 'idle' ? triggerArcheologyScan : undefined}>
                  {ingestState === 'idle' ? (
                      <>
                          <div className="text-4xl mb-4 opacity-50">&#x1F4C2;</div>
                          <h4 className="text-white font-bold mb-2 uppercase tracking-widest">Drop Master ZIP / Mount Drive</h4>
                          <p className="text-xs text-stone-500 max-w-sm mx-auto">Upload Google Workspace Takeouts or point local path to inject historical data to the Scribe Parser.</p>
                      </>
                  ) : ingestState === 'scanning' ? (
                      <div className="animate-pulse">
                          <h4 className="text-teal-400 font-bold mb-4 uppercase tracking-widest">Deep-Scan Engaged</h4>
                          <div className="w-full bg-black rounded-full h-2 mb-4 overflow-hidden border border-white/10">
                            <div className="bg-teal-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
                          </div>
                          <p className="text-xs text-stone-500 font-mono">Parsing metadata across historically mapped regions: {progress}%</p>
                      </div>
                  ) : ingestState === 'encrypting' ? (
                      <div className="text-amber-500">
                          <div className="text-4xl mb-4 animate-spin opacity-80">&#x2699;</div>
                          <h4 className="font-bold uppercase tracking-widest mb-2">Sovereignty Check Protocol</h4>
                          <p className="text-xs font-mono">Encrypting recovered artifacts natively to Local Iron Vault...</p>
                      </div>
                  ) : (
                      <div className="text-green-500">
                          <h4 className="font-bold uppercase tracking-widest text-2xl mb-2">NO DATA DETECTED</h4>
                          <p className="text-xs font-mono text-stone-400">The Scribe confirmed legacy files are not present on mounted volumes. Awaiting external media.</p>
                          <button onClick={() => setIngestState('idle')} className="mt-6 px-6 py-2 border border-stone-500 text-stone-300 hover:text-white rounded text-xs uppercase tracking-widest">Reset Scribe</button>
                      </div>
                  )}
              </div>
          </div>

          {/* Logic Merging Panel */}
          <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-xl border border-white/10 flex-grow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl"></div>
                  <h3 className="serif text-xl mb-4 text-teal-400 uppercase">Ecosystem Merge Data</h3>
                  <p className="text-sm text-stone-400 mb-8 font-light leading-relaxed">
                      "Lemons" recovered by the Scribe are automatically intercepted by the Bedivere Protocol logic loop, scrubbing 2012-era code and refactoring it for the modern 2026 Sovereign OS stack.
                  </p>

                  <div className="space-y-4">
                      <div className="p-4 border-l-2 border-stone-700 bg-stone-900/50">
                          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block mb-1">Queue Status</span>
                          <span className="text-white text-sm">0 Legacy Artifacts Pending Merge</span>
                      </div>
                      <div className="p-4 border-l-2 border-stone-700 bg-stone-900/50">
                          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block mb-1">Active Model</span>
                          <span className="text-teal-400 text-sm font-bold">Claude-3.5 (Sovereign Mode)</span>
                      </div>
                  </div>

                  <button className="w-full mt-8 py-4 bg-transparent border border-stone-600 text-stone-400 hover:bg-teal-900/20 hover:text-teal-400 hover:border-teal-500 font-bold uppercase tracking-widest text-sm rounded transition-all">
                      Force Integration Logic
                  </button>
              </div>

              {/* Harvester Node */}
              <div className="glass p-8 rounded-xl border border-teal-500/20 flex-grow relative overflow-hidden mt-8">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded bg-teal-500/10 flex items-center justify-center text-teal-400 font-mono text-xs">
                          🛰️
                      </div>
                      <h3 className="serif text-xl text-white uppercase">Harvester Node</h3>
                  </div>
                  <p className="text-xs text-stone-500 mb-6 font-mono uppercase tracking-widest">Protocol: Apify Google Places</p>
                  
                  <div className="space-y-3">
                      <div className="bg-black/40 p-3 rounded border border-white/5">
                          <p className="text-[10px] text-stone-600 uppercase mb-1">Target Sector</p>
                          <p className="text-sm text-stone-300">British Columbia, Canada</p>
                      </div>
                      <div className="bg-black/40 p-3 rounded border border-white/5">
                          <p className="text-[10px] text-stone-600 uppercase mb-1">Logic Pattern</p>
                          <p className="text-sm text-stone-300">Advocacy & Legal Service Leads</p>
                      </div>
                  </div>

                  <p className="text-[10px] text-stone-600 mt-6 leading-relaxed italic">
                      * Harvester scripts are located in <code className="text-teal-900">/scripts/apify_harvester.py</code>. Run via CLI for autonomous extraction.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
}

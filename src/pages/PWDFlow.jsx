import React from 'react'

export default function PWDFlow() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      <div className="mb-12 border-b border-white/10 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">
              Physical & Mental Telemetry
            </div>
            <h1 className="serif text-5xl font-bold mb-4">DIGITAL <span className="text-blue-500">DETOX</span></h1>
            <p className="text-lg text-stone-400 font-light">Sovereign tracking of real-world endurance, nervous system regulation, and off-grid health without corporate surveillance.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-xl border-t-4 border-blue-500 lg:col-span-2">
              <h3 className="serif text-2xl mb-8 text-white uppercase">Vitals & Activity Log</h3>
              
              <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-8 text-center text-stone-500 py-20 font-mono text-sm">
                  [TELEMETRY GRAPHIC RENDERER OFFLINE]<br/>Waiting for physical node sync...
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded text-white">
                      <div className="text-3xl font-bold text-blue-400">4.2</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Screen Hours</div>
                  </div>
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded text-white">
                      <div className="text-3xl font-bold text-green-500">8.1</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Sleep (Hrs)</div>
                  </div>
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded text-white">
                      <div className="text-3xl font-bold text-amber-500">84</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-2">HRV Score</div>
                  </div>
              </div>
          </div>

          <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-xl border border-white/10 flex-grow">
                  <h3 className="serif text-xl mb-4 gold-text uppercase">Detox Directives</h3>
                  <p className="text-sm text-stone-400 mb-6">Automated logic to sever all non-essential cloud connections for mental bandwidth recovery.</p>
                  
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-sm rounded mb-4 transition-colors">
                      Trigger 24H Dark Mode
                  </button>
                  <button className="w-full py-4 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase tracking-widest text-sm rounded transition-colors">
                      Emergency Override
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
}

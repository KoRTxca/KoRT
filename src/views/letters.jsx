import React from 'react'

export default function Letters() {
  const knightData = JSON.parse(localStorage.getItem('kort_knight') || '{"alignment":"Standard", "machine":"Unknown"}');

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen">
      
      <div className="mb-12 border-b border-white/10 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-stone-500/30 bg-stone-500/10 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              Base44 Protocol
            </div>
            <h1 className="serif text-5xl font-bold mb-4">THE <span className="text-stone-300">HERALD</span></h1>
            <p className="text-lg text-stone-400 font-light">P2P Mesh Communication. The Herald routes off-grid comms and Distress Beacons across the Sovereign network independently of corporate ISPs.</p>
          </div>
      </div>

      <div className="glass p-12 rounded-xl border border-stone-800 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl text-9xl"></div>
        <h2 className="serif text-3xl text-stone-300 mb-6 uppercase">Mesh Sync Required</h2>
        <p className="text-stone-500 mb-8 max-w-lg mx-auto">Your Node ({knightData.machine}) must be physically bound to the RoG Strix intranet via the Base44 CLI client to access Global Distress routing.</p>
        
        <div className="bg-black p-6 rounded-lg font-mono text-sm inline-block text-left text-green-500 border border-green-500/20 mb-8">
            {`> npm install -g base44-cli`} <br/>
            {`> base44 connect --node "${knightData.machine}" --mode P2P`}
        </div>

        <button className="px-8 py-4 border border-stone-500 text-stone-300 hover:bg-stone-500 hover:text-black uppercase tracking-widest font-bold text-sm block mx-auto rounded transition-colors">
            Ping Global Network
        </button>
      </div>
      
    </div>
  );
}

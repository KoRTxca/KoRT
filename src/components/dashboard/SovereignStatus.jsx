import React, { useState, useEffect } from 'react'
import { Shield, Wifi, WifiOff, Activity } from 'lucide-react'

export default function SovereignStatus() {
  const [status, setStatus] = useState('checking');
  
  useEffect(() => {
    const checkMeshStatus = async () => {
      try {
        const res = await fetch('https://kortx.ca/', { method: 'HEAD' });
        setStatus(res.ok ? 'online' : 'degraded');
      } catch (e) {
        setStatus('offline');
      }
    };
    checkMeshStatus();
    const interval = setInterval(checkMeshStatus, 60000); // Check every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-500 backdrop-blur-md ${
        status === 'online' ? 'bg-green-500/10 border-green-500/30' : 
        status === 'degraded' ? 'bg-amber-500/10 border-amber-500/30' : 
        'bg-red-500/10 border-red-500/30'
      }`}>
        <div className="relative">
          <Activity size={12} className={status === 'online' ? 'text-green-500 animate-pulse' : 'text-red-500'} />
          {status === 'online' && (
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          )}
        </div>
        
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 leading-none">Node Status</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${
            status === 'online' ? 'text-green-500' : 
            status === 'degraded' ? 'text-amber-500' : 
            'text-red-500'
          }`}>
            {status === 'online' ? 'Sovereign // Live' : status === 'checking' ? 'Establishing Handshake...' : 'Mesh Down'}
          </span>
        </div>
      </div>
      
      {/* Tooltip Expansion */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[#0a0a1a] border border-white/10 p-4 rounded-xl shadow-2xl w-48">
          <h4 className="serif text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">Network Logic</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase tracking-widest text-stone-500">
              <span>Latency</span>
              <span className="text-white">12ms</span>
            </div>
            <div className="flex justify-between text-[8px] uppercase tracking-widest text-stone-500">
              <span>Mesh Nodes</span>
              <span className="text-white">1 Active</span>
            </div>
            <div className="flex justify-between text-[8px] uppercase tracking-widest text-stone-500">
              <span>Security</span>
              <span className="text-green-500">Sovereign</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

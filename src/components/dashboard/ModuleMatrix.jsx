import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, PenTool, CircleDollarSign, Brain, Activity, Wifi, WifiOff, ChevronRight } from 'lucide-react'
import { merlinClient } from '../../api/merlinclient'

export default function ModuleMatrix() {
  const [merlinStatus, setMerlinStatus] = useState('checking');
  
  useEffect(() => {
    const checkMerlin = async () => {
      const isOnline = await merlinClient.checkStatus();
      setMerlinStatus(isOnline ? 'online' : 'offline');
    };
    checkMerlin();
    const interval = setInterval(checkMerlin, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      id: 'herald',
      name: 'Peer Advocacy',
      desc: 'Advocacy & Legal Defense',
      icon: <Shield className="text-blue-500" />,
      path: '/herald',
      status: 'Ready',
      metrics: '0 Open Cases'
    },
    {
      id: 'scribe',
      name: 'Digital Scribe',
      desc: 'Knowledge Harvester',
      icon: <PenTool className="text-teal-500" />,
      path: '/scribe',
      status: 'Monitoring',
      metrics: 'Scanning Sector D:'
    },
    {
      id: 'treasury',
      name: 'Digital Dollars',
      desc: 'Economic UBI Protocol',
      icon: <CircleDollarSign className="text-amber-500" />,
      path: '/digital-dollars',
      status: 'Active',
      metrics: '60/40 Split Active'
    },
    {
      id: 'merlin',
      name: 'Merlin Local LLM',
      desc: 'Local Intelligence Node',
      icon: <Brain className={merlinStatus === 'online' ? 'text-purple-500' : 'text-stone-600'} />,
      path: '/merlin',
      status: merlinStatus === 'online' ? 'Connected' : 'Offline',
      statusColor: merlinStatus === 'online' ? 'text-green-500' : 'text-red-500',
      metrics: merlinStatus === 'online' ? 'Llama3 Alpha' : 'Check Worker 1'
    }
  ];

  return (
    <div className="w-full py-20 px-6 bg-[#08080f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="serif text-4xl font-black text-white uppercase tracking-tighter">Command <span className="text-amber-500">Center</span></h2>
            <p className="text-stone-500 text-xs uppercase tracking-[0.4em] font-bold mt-2">Sovereign OS Module Matrix // v4.2</p>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
            <Activity className="text-amber-500 animate-pulse" size={16} />
            <span className="text-[10px] text-stone-300 font-mono uppercase tracking-widest">System Load: 12% // P2P Mesh: 1 Active Node</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <Link 
              key={mod.id} 
              to={mod.path}
              className="group glass-vault p-6 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-all hover:-translate-y-1 block relative overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                  {mod.icon}
                </div>
                <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                    mod.status === 'Offline' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-green-500/10 border-green-500/30 text-green-500'
                }`}>
                  {mod.status}
                </div>
              </div>

              {/* Module Content */}
              <h3 className="serif text-xl font-bold text-white mb-2 uppercase group-hover:text-amber-500 transition-colors">{mod.name}</h3>
              <p className="text-stone-500 text-xs mb-6 font-light">{mod.desc}</p>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{mod.metrics}</span>
                <ChevronRight size={14} className="text-stone-700 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

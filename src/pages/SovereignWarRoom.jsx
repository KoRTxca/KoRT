import React, { useState } from 'react';
import { 
  Network, Cpu, HardDrive, Mic, MicOff, Send, Settings, 
  Activity, ShieldAlert, Wifi, Zap, Lock, TerminalSquare
} from 'lucide-react';

export default function SovereignWarRoom() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedNode, setSelectedNode] = useState("isaac_pc");
  const [messages, setMessages] = useState([
    { role: 'system', content: 'INITIALIZING SOVEREIGN P2P MESH... ESTABLISHING HANDSHAKE WITH ISSAC_PC [GEMINA-8B]...' },
    { role: 'assistant', content: 'Commander. Hardware mesh synchronized. Awaiting input protocols.' }
  ]);
  const [inputField, setInputField] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputField.trim()) return;
    setMessages([...messages, { role: 'user', content: inputField }]);
    setInputField('');
    // Mocking response logic
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Processing distributed workload parameters. Voice-to-Text inference queued.' }]);
    }, 1000);
  };

  const activeNodes = [
    { id: 'isaac_pc', name: 'Isaac_PC [Gemma 9B]', status: 'ONLINE', ping: '12ms', type: 'LOCAL_SLAVE' },
    { id: 'vultr_lambda', name: 'Vultr GPU Node 01 [Llama 3.1]', status: 'ONLINE', ping: '45ms', type: 'CLOUD_CORE' },
    { id: 'merlin_core', name: 'Merlin Agentic Core [Mixtral]', status: 'STANDBY', ping: 'LOCAL', type: 'ROUTER' },
    { id: 'x_ai_proxy', name: 'x.ai [Grok Voice Auth]', status: 'ONLINE', ping: '88ms', type: 'API_GATEWAY' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#e8e8e8] font-mono overflow-hidden flex flex-col md:flex-row relative">
      
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-[url('/sovereign_vault_hero.png')] bg-cover opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-b from-[#ff3300]/5 to-transparent pointer-events-none blur-3xl" />

      {/* LEFT PANEL: LCARS STRUCTURAL STRUT */}
      <div className="hidden md:flex flex-col w-[300px] p-6 border-r-8 border-amber-600 rounded-br-[4rem] bg-[#0a0a0a] relative z-10 shrink-0">
        
        {/* LCARS Arch Aesthetic */}
        <div className="text-right border-b-8 border-stone-800 pb-4 mb-8">
           <h1 className="text-4xl font-black text-[#ff3300] tracking-tighter uppercase mb-1">KoRT-OS</h1>
           <div className="text-amber-500 font-bold tracking-widest text-sm uppercase">Sector 4 // WAR ROOM</div>
        </div>

        {/* Tactical Telemetry */}
        <div className="space-y-6">
          <div className="bg-[#111] p-4 border-l-4 border-amber-500 rounded text-xs uppercase tracking-widest">
            <div className="flex justify-between text-stone-500 mb-2"><span>MESH LOAD</span> <span>42%</span></div>
            <div className="w-full h-1 bg-stone-800 rounded-full"><div className="w-[42%] h-full bg-amber-500" /></div>
          </div>
          
          <div className="bg-[#111] p-4 border-l-4 border-amber-500 rounded text-xs uppercase tracking-widest">
            <div className="flex justify-between text-stone-500 mb-2"><span>ACTIVE SLAVE NODES</span> <span>3</span></div>
          </div>

          <div className="bg-[#111] p-4 border-l-8 border-[#ff3300] rounded text-[10px] uppercase tracking-widest text-[#ff3300] font-bold shadow-[0_0_15px_rgba(255,51,0,0.1)]">
            <ShieldAlert className="inline-block w-4 h-4 mr-2" />
            Gatekeeper Auth: STRICT
          </div>
        </div>

        {/* Decorative Blocks */}
        <div className="mt-auto flex flex-col gap-2">
           <div className="w-full h-6 bg-stone-800 rounded-l-full" />
           <div className="w-3/4 h-4 bg-amber-600 rounded-l-full opacity-50" />
           <div className="w-full h-12 bg-amber-600 rounded-l-full mt-4" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col p-4 md:p-8 relative z-10 h-screen overflow-hidden">
        
        {/* HEADER: Model Hardware Map */}
        <header className="w-full bg-[#111] border border-stone-800 rounded-2xl p-4 mb-6 flex flex-col lg:flex-row justify-between items-center gap-4">
           
           <div className="flex items-center gap-4 w-full lg:w-auto">
              <Network className="text-amber-500 w-8 h-8" />
              <div>
                 <h2 className="text-xl font-black text-amber-500 uppercase tracking-widest">P2P Mesh Interface</h2>
                 <p className="text-stone-500 text-xs tracking-widest">Distributed Consensus & Autonomous Logic</p>
              </div>
           </div>

           {/* Hardware Dropdown / Status */}
           <div className="w-full lg:w-auto flex items-center gap-3 bg-black border border-stone-700 p-2 rounded-xl">
              <Cpu className="text-stone-400 w-5 h-5 ml-2" />
              <select 
                value={selectedNode}
                onChange={(e) => setSelectedNode(e.target.value)}
                className="bg-transparent text-white font-bold text-sm tracking-widest uppercase outline-none px-2 py-1 appearance-none cursor-pointer min-w-[250px]"
              >
                 {activeNodes.map(node => (
                    <option key={node.id} value={node.id} className="bg-[#111] text-amber-500">
                      {node.name} [{node.ping}]
                    </option>
                 ))}
              </select>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-black rounded-lg">
                 LINK ACTIVE
              </div>
           </div>

        </header>

        {/* CHAT LOG TERMINAL */}
        <div className="flex-1 bg-[#0a0a0a] border border-stone-800 rounded-2xl p-6 overflow-y-auto font-mono text-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] relative">
           
           {/* Terminal watermark */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <TerminalSquare className="w-96 h-96" />
           </div>

           <div className="space-y-6 relative z-10 pb-4">
              {messages.map((msg, i) => (
                 <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={
                       `max-w-[85%] p-4 rounded-2xl ${
                          msg.role === 'system' 
                           ? 'bg-amber-900/10 border border-amber-500/30 text-amber-500 text-xs tracking-widest' 
                           : msg.role === 'user'
                              ? 'bg-stone-800/50 border border-stone-700 text-stone-300 rounded-br-sm'
                              : 'bg-[#111] border border-blue-900/30 text-stone-200 rounded-bl-sm shadow-[0_0_15px_rgba(37,99,235,0.05)]'
                       }`
                    }>
                       {msg.role === 'assistant' && <div className="text-[10px] text-blue-500 mb-2 font-bold uppercase tracking-widest border-b border-blue-900/30 pb-1">MERLIN_CORE : GROK_PROXY</div>}
                       {msg.content}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* INPUT TACTICAL CONSOLE */}
        <div className="mt-6 bg-[#111] border border-stone-800 p-4 rounded-2xl">
           <form onSubmit={handleSend} className="flex gap-4 items-center">
              
              {/* x.ai Voice Module Placeholder */}
              <button 
                 type="button"
                 onClick={() => setIsVoiceActive(!isVoiceActive)}
                 className={`p-4 rounded-xl border transition-all duration-300 ${
                    isVoiceActive 
                    ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] animate-pulse' 
                    : 'bg-black border-stone-700 text-stone-500 hover:text-amber-500 hover:border-amber-500'
                 }`}
                 title="Grok TTS Voice Link"
              >
                 {isVoiceActive ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              <input 
                 type="text" 
                 value={inputField}
                 onChange={(e) => setInputField(e.target.value)}
                 placeholder="Command the Mesh. E.g. 'Generate legal affidavit via OpenCode node...'"
                 className="flex-1 bg-black text-[#e8e8e8] placeholder-stone-600 px-6 py-4 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
              />

              <button 
                 type="submit"
                 className="p-4 bg-amber-500 text-black hover:bg-amber-400 font-bold rounded-xl flex items-center justify-center transition-colors shadow-[0_0_20px_rgba(201,168,76,0.3)]"
              >
                 <Send className="w-6 h-6" />
              </button>

           </form>

           {/* Voice status warning */}
           {isVoiceActive && (
              <div className="w-full mt-4 text-[10px] text-red-500 font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                 <Activity className="w-3 h-3 animate-bounce" />
                 x.AI GROK Voice Synthesis Active — Awaiting Commander Dictation
              </div>
           )}
        </div>

      </div>

    </div>
  );
}

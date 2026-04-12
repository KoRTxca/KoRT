import React, { useState, useEffect, useRef } from 'react'
import { merlinClient } from '../api/merlinclient'
import { Bot, User, Send, Wifi, WifiOff, Terminal, Zap, ShieldAlert } from 'lucide-react'

export default function MerlinChat() {
  const [messages, setMessages] = useState([
    { role: 'merlin', text: 'Sovereign Node v4.2 Active. State your query, Knight.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('checking');
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkNode = async () => {
      const online = await merlinClient.checkStatus();
      setStatus(online ? 'online' : 'offline');
    };
    checkNode();
    const interval = setInterval(checkNode, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await merlinClient.generate(userMsg);
      setMessages(prev => [...prev, { role: 'merlin', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: `CRITICAL ERROR: Merlin node unreachable. Verify OLLAMA_HOST is running and OLLAMA_ORIGINS="*" is set on the worker node.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[80vh] flex flex-col p-6 animate-fade-in">
      
      {/* Header / Status Bar */}
      <div className="flex items-center justify-between mb-8 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
            <Bot className="text-purple-500" size={24} />
          </div>
          <div>
            <h1 className="serif text-2xl font-black text-white uppercase tracking-tighter">Merlin <span className="text-purple-500">Node</span></h1>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Local-First sovereign Intelligence</p>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
          status === 'online' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
        }`}>
          {status === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
          {status === 'online' ? 'Node 1: Online' : 'Node 1: Offline'}
        </div>
      </div>

      {/* Chat Display */}
      <div 
        ref={scrollRef}
        className="flex-grow bg-[#050505] border border-white/5 rounded-2xl p-6 overflow-y-auto mb-6 flex flex-col gap-6 shadow-inner"
        style={{ minHeight: '500px' }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                msg.role === 'merlin' ? 'bg-purple-900/20 border-purple-500/30 text-purple-500' : 
                msg.role === 'system' ? 'bg-red-900/20 border-red-500/30 text-red-500' :
                'bg-amber-900/20 border-amber-500/30 text-amber-500'
              }`}>
                {msg.role === 'merlin' ? <Bot size={16} /> : msg.role === 'system' ? <ShieldAlert size={16} /> : <User size={16} />}
              </div>
              <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                msg.role === 'merlin' ? 'bg-white/5 text-stone-200 border border-white/10' : 
                msg.role === 'system' ? 'bg-red-600/10 text-red-400 border border-red-600/20 font-mono italic' :
                'bg-amber-600 text-black font-semibold'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2">
              <Zap size={14} className="text-purple-500" />
              <span className="text-xs text-stone-500 uppercase font-black tracking-widest">Merlin is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="relative group">
        <div className="absolute inset-0 bg-purple-500/5 group-focus-within:bg-purple-500/10 transition-colors rounded-2xl pointer-events-none border border-white/10 group-focus-within:border-purple-500/50"></div>
        <div className="relative flex p-2">
          <div className="flex-shrink-0 flex items-center px-4 text-stone-600">
            <Terminal size={20} />
          </div>
          <input 
            type="text"
            placeholder="Command Merlin..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== 'online' || isTyping}
            className="flex-grow bg-transparent border-none focus:ring-0 text-white py-4 font-mono text-lg placeholder:text-stone-800 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={!input.trim() || status !== 'online' || isTyping}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-stone-800 text-white px-8 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2"
          >
            <Send size={14} /> Transmit
          </button>
        </div>
      </form>
      
      <p className="mt-4 text-[10px] text-center text-stone-700 uppercase tracking-[0.4em] font-black">
        End of Line // Encryption Level: Master
      </p>
    </div>
  );
}

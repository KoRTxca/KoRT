import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Sparkles, BookOpen, Sword, Skull, 
  Gamepad2, Cpu, User, Zap, Lock, Mic, Play
} from 'lucide-react';

const CLASSES = [
  { id: 'Paladin', label: 'Vanguard Paladin', icon: Shield, img: '/paladin.png', desc: "Heavy armor. Sovereign tactical force." },
  { id: 'Wizard', label: 'Tech Wizard', icon: Sparkles, img: '/wizard.png', desc: "Deep logic. Master of the Base44 cluster." },
  { id: 'Rogue', label: 'Rogue Agent', icon: Gamepad2, img: '/rogue.png', desc: "Digital archivist. Unseen mesh runner." },
  { id: 'Officer', label: 'Starfleet Officer', icon: User, img: '/officer.png', desc: "Standardized command and diplomatic routing." },
  { id: 'Cleric', label: 'Cleric', icon: BookOpen, img: '/cleric.png', desc: "System recovery and empathy-based logic." },
  { id: 'CMO', label: 'Chief Medical Officer', icon: Zap, img: '/cmo.png', desc: "Biological survival and recovery support." },
  { id: 'Guard', label: 'Castle Guard', icon: Sword, img: '/guard.png', desc: "Front-line defense and entry point management." },
  { id: 'Warrior', label: 'Klingon Warrior', icon: Sword, img: '/warrior.png', desc: "Honor-based tactical code and aggressive defense." },
  { id: 'Engineer', label: 'Chief Engineer', icon: Cpu, img: '/engineer.png', desc: "Hardware sovereignty and infra optimization." },
  { id: 'Sentry', label: 'Sentry Commander', icon: Shield, img: '/sentry.png', desc: "Perimeter monitoring and early warning alerts." },
  { id: 'Admiral', label: 'Fleet Admiral', icon: User, img: '/admiral.png', desc: "Global strategy and network orchestration." },
  { id: 'Captain', label: 'Captain', icon: User, img: '/captain.png', desc: "Direct command of local nodes and mission execution." }
];

const SOVEREIGN_QUESTIONS = [
  "In what sector of the analog world did your journey begin?",
  "When the corporate grid failed you, what was the first resource you lost?",
  "Is privacy a luxury, a right, or a weapon?",
  "Who owns your data when your heartbeat stops?",
  "If the internet went dark tonight, how many days could your local node sustain your defense?",
  "Would you risk your local bandwidth to save a neighboring Knight in distress?",
  "Is a perfect machine logic superior to a flawed human empathy?",
  "Does your allegiance lie with the platform, the community, or the self?",
  "What part of your digital identity is most fragile?",
  "When the Herald files a dispute, do you seek settlement or justice?",
  "Have you ever fought a government administrative error and won?",
  "What is the one truth you would never commit to a centralized cloud?",
  "If an AI can win your legal battle, do you still care how it was fought?",
  "Why does the 60/40 community split represent strength rather than loss?",
  "Do you prefer the silence of a solo node or the clamor of the Council?",
  "What is your primary defense against identity harvesting?",
  "Is the Sovereign OS an exit strategy or a foundation?",
  "When you put on the Dragon Armor, what part of your old self do you leave behind?",
  "Will you uphold the Three Laws even when the Founder is offline?",
  "What digital artifact will you leave for the next generation of Knights?",
  "Do you swear to protect the Mesh and the Sovereignty of all Round Table participants?"
];

export default function CharacterCreation() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0 is Temporal Awakening (Video)
  const [handle, setHandle] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(21).fill(''));
  const [dossier, setDossier] = useState(null);
  const [voiceText, setVoiceText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const typewriterRef = useRef(null);

  // Phase 1: Temporal Awakening (Video Pop-over Simulator)
  const skipVideo = () => setPhase(1);

  const speak = (text) => {
    setVoiceText("");
    setIsTyping(true);
    let i = 0;
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    
    typewriterRef.current = setInterval(() => {
      setVoiceText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(typewriterRef.current);
        setIsTyping(false);
      }
    }, 25);
  };

  useEffect(() => {
    if (phase === 3) {
      speak(`Warrior ${handle}, you have selected the path of the ${selectedClass.id}. The Sovereign Dossier Protocol is initiated. 21 Queries remain. ${SOVEREIGN_QUESTIONS[0]}`);
    }
  }, [phase]);

  const nextQuestion = () => {
    if (currentQuestionIndex < 20) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      speak(`${nextIdx + 1}/21: ${SOVEREIGN_QUESTIONS[nextIdx]}`);
    } else {
      calculateDossier();
    }
  };

  const calculateDossier = () => {
    // Dynamic Stat Calculation based on answer depth and complexity
    const totalChars = answers.join('').length;
    const avgLen = totalChars / 21;
    
    // Higher average length -> More Wisdom and Intelligence
    // Specific keywords -> Strength
    const str = Math.min(20, 10 + Math.floor(avgLen / 10) + (answers.some(a => a.toLowerCase().includes('shield') || a.toLowerCase().includes('iron')) ? 2 : 0));
    const int = Math.min(20, 10 + Math.floor(avgLen / 8));
    const wis = Math.min(20, 10 + Math.floor(avgLen / 12) + (answers.some(a => a.toLowerCase().includes('sovereign') || a.toLowerCase().includes('oath')) ? 2 : 0));
    const dex = Math.min(20, 12 + Math.floor(Math.random() * 4)); // Dexterity is inherently tech-linked

    const relicType = avgLen > 30 ? 'Ethereal Logic Engine' : avgLen > 15 ? 'Iron Empathy Core' : 'Standard Node Shell';
    
    setDossier({
      relic: relicType,
      str, int, wis, dex
    });
    setPhase(4);
  };

  const sealVault = () => {
    const payload = { 
      handle, 
      class: selectedClass.id, 
      dossier, 
      alignment: 'Sovereign', 
      machine: 'LocalNode',
      oathSigned: true,
      protocolVersion: '2.0'
    };
    localStorage.setItem('kort_knight', JSON.stringify(payload));
    setPhase(5);
    setTimeout(() => { navigate('/'); }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#030000] w-full flex items-center justify-center font-serif relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('/temporal_awakening_bg.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-black pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* PHASE 0: TEMPORAL AWAKENING (Video) */}
        {phase === 0 && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-12 animate-fade-in">
             <div className="w-full max-w-4xl aspect-video bg-amber-950/20 border-4 border-amber-500/30 rounded shadow-[0_0_100px_rgba(201,168,76,0.2)] flex flex-col items-center justify-center relative group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                {/* Simulated Kling Intro Graphic */}
                <div className="relative text-center">
                   <Skull size={120} className="text-red-900 mx-auto mb-8 animate-pulse drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
                   <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-4 drop-shadow-[4px_4px_0_#c0392b]">TEMPORAL AWAKENING</h2>
                   <div className="text-stone-500 font-mono text-sm tracking-[0.5em] uppercase mb-12">System Init // Kling_Intro_v2.mp4</div>
                   
                   <button 
                     onClick={skipVideo}
                     className="bg-amber-600 hover:bg-amber-500 text-black px-12 py-4 font-black uppercase tracking-[0.3em] rounded transition-all hover:scale-105 flex items-center gap-4 mx-auto"
                   >
                     <Play size={20} fill="black" /> Engage Node Profile
                   </button>
                </div>
             </div>
             <p className="mt-8 text-stone-600 font-mono text-xs uppercase tracking-widest animate-pulse">Scanning Bio-Signatures... Press Engage to Proceed</p>
          </div>
        )}

        {/* PHASE 1: INITIALIZATION */}
        {phase === 1 && (
          <div className="max-w-xl mx-auto text-center animate-fade-in origin-bottom">
            <Skull className="w-20 h-20 text-red-900 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(220,38,38,1)] mb-4">
              Enter The <span className="text-red-600">Sanctuary</span>
            </h1>
            <p className="text-stone-400 font-sans text-sm tracking-widest uppercase mb-12 border-b border-red-900/50 pb-6 inline-block">
              "The physical world is breaking. Forge your digital armor."
            </p>
            
            <div className="bg-[#0a0505] p-8 border-2 border-[#2a1111] rounded shadow-[0_0_50px_rgba(220,38,38,0.1)] relative group">
              <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors pointer-events-none"></div>
              
              <label className="block text-stone-500 text-xs tracking-[0.3em] uppercase mb-4 text-left font-bold">Input Knight Designation</label>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Callsign..." 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handle && setPhase(2)}
                  className="flex-1 bg-black border-2 border-red-900 text-white px-6 py-4 rounded text-lg tracking-widest focus:border-red-500 focus:shadow-[0_0_20px_rgba(220,38,38,0.5)] focus:outline-none uppercase font-black placeholder:text-stone-800"
                  autoFocus
                />
                <button 
                  disabled={!handle}
                  onClick={() => setPhase(2)} 
                  className={`border-2 font-black uppercase tracking-widest px-8 py-4 transition-all ${
                    handle 
                      ? 'bg-red-600 border-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:bg-red-500' 
                      : 'bg-stone-900 border-stone-800 text-stone-700 opacity-50 cursor-not-allowed'
                  }`}
                >
                  Init
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em]">
                <span className="text-red-900/50">Biometric Handshake Required</span>
                <button 
                  onClick={() => {
                    localStorage.setItem('kort_knight', JSON.stringify({ handle: 'COMMANDER', class: 'ADMIN', alignment: 'CORE', machine: 'VULCAN' }));
                    window.location.href = '/';
                  }}
                  className="text-stone-600 hover:text-red-500 transition-colors"
                >
                  [ EMERGENCY BYPASS ]
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: VULCAN CLASS SELECTION */}
        {phase === 2 && (
          <div className="w-full animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-white uppercase tracking-wider font-black drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">Choose Your Class</h2>
              <p className="text-red-500/60 font-sans tracking-[0.2em] text-xs uppercase mt-2">The Sovereign Matrix awaits</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CLASSES.map((c) => (
                <button 
                  key={c.id}
                  onClick={() => setSelectedClass(c)}
                  className={`relative flex flex-col text-left group overflow-hidden border-2 transition-all duration-300 ${
                    selectedClass?.id === c.id 
                    ? 'border-amber-500 shadow-[0_0_30px_rgba(201,168,76,0.3)] bg-amber-950/20' 
                    : 'border-[#2a1111] bg-black hover:border-red-900'
                  }`}
                >
                  <div className="p-4 relative z-10 flex flex-col items-center text-center">
                    <c.icon className={`w-8 h-8 mb-3 ${selectedClass?.id === c.id ? 'text-amber-500' : 'text-stone-700'}`} />
                    <h3 className={`text-[10px] font-black uppercase tracking-widest ${selectedClass?.id === c.id ? 'text-amber-500' : 'text-stone-500'}`}>
                      {c.id}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {selectedClass && (
               <div className="mt-8 max-w-md mx-auto p-6 bg-black/80 border border-amber-500/30 rounded text-center animate-fade-in">
                  <h4 className="text-amber-500 font-black uppercase text-lg mb-2">{selectedClass.label}</h4>
                  <p className="text-stone-500 italic text-sm mb-6">{selectedClass.desc}</p>
                  <button 
                    onClick={() => setPhase(3)} 
                    className="bg-amber-600 text-black font-black uppercase tracking-[0.3em] px-12 py-3 hover:bg-amber-500 transition-all text-sm"
                  >
                    Lock Destiny
                  </button>
               </div>
            )}
          </div>
        )}

        {/* PHASE 3: THE VULCAN INTERVIEW (VOICE INTERACTION) */}
        {phase === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
             <div className="glass-vault p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                   <Mic size={24} className={`text-red-500 ${isTyping ? 'animate-pulse' : 'opacity-20'}`} />
                </div>
                
                <div className="mb-12">
                    <h2 className="serif text-xs font-bold text-amber-500 uppercase tracking-widest mb-4">Sovereign Dossier Protocol // {currentQuestionIndex + 1} of 21</h2>
                   
                   {/* Progress Tracker */}
                   <div className="flex gap-1 mb-8">
                      {new Array(21).fill(0).map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentQuestionIndex ? 'bg-amber-500 shadow-[0_0_5px_rgba(201,168,76,0.5)]' : 'bg-stone-900 border border-white/5'}`}></div>
                      ))}
                   </div>

                   <div className="min-h-[120px] text-2xl text-white font-bold leading-relaxed mb-6">
                      {voiceText} <span className="animate-blink">|</span>
                   </div>
                </div>

                <div className="space-y-6">
                   <textarea 
                     className="w-full bg-black border-2 border-amber-900 text-stone-200 p-6 focus:border-amber-500 focus:shadow-[0_0_15px_rgba(201,168,76,0.2)] focus:outline-none font-mono text-lg h-32 resize-none uppercase"
                     placeholder="State your response for the permanent record..."
                     value={answers[currentQuestionIndex]}
                     onChange={(e) => {
                       const newAnswers = [...answers];
                       newAnswers[currentQuestionIndex] = e.target.value;
                       setAnswers(newAnswers);
                     }}
                   ></textarea>
                   
                   <button 
                     disabled={isTyping || !answers[currentQuestionIndex]}
                     onClick={nextQuestion}
                     className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest py-4 transition-all disabled:opacity-20"
                   >
                     {currentQuestionIndex < 20 ? "Next Query" : "Complete Induction"}
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* PHASE 4: THE D&D DOSSIER */}
        {phase === 4 && dossier && (
          <div className="max-w-2xl mx-auto w-full animate-fade-in relative">
            <h2 className="text-4xl text-center text-white mb-10 uppercase tracking-widest font-black drop-shadow-[0_0_10px_rgba(201,168,76,0.8)]">Profile Forged</h2>
            
            <div className="glass-vault p-2 shadow-2xl relative">
              <div className="border border-amber-500/30 p-8 relative flex flex-col md:flex-row gap-8">
                
                {/* Avatar Column */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                   <div className="w-full aspect-square border-2 border-amber-500/60 shadow-[0_0_30px_rgba(201,168,76,0.2)] p-1 bg-black relative flex items-center justify-center">
                      <selectedClass.icon size={80} className="text-white opacity-20 absolute" />
                      <div className="relative z-10 text-6xl font-black text-amber-500 drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]">
                         {handle.charAt(0)}
                      </div>
                   </div>
                   <div className="mt-4 text-center">
                     <span className="bg-amber-900/40 text-amber-500 font-sans font-bold text-[10px] uppercase tracking-widest px-3 py-1 border border-amber-900">{selectedClass.id}</span>
                   </div>
                </div>

                {/* Stats Column */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-1">{handle}</h3>
                  <p className="text-stone-500 font-sans text-xs uppercase tracking-[0.2em] mb-6">Level 1 Founding Node</p>

                  <div className="mb-6 bg-black/80 border border-amber-950 p-3 text-center">
                    <span className="block text-[9px] text-stone-600 font-sans uppercase tracking-widest mb-1">Equipped Relic</span>
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">{dossier.relic}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 gap-y-6 font-sans">
                    <div className="border-l-2 border-amber-900 pl-3">
                      <span className="block text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">STR // Force</span>
                      <span className="text-xl font-bold text-stone-200">{dossier.str}<span className="text-xs text-stone-700 ml-1">/20</span></span>
                    </div>
                    <div className="border-l-2 border-amber-900 pl-3">
                      <span className="block text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">INT // logic</span>
                      <span className="text-xl font-bold text-stone-200 drop-shadow-[0_0_5px_rgba(201,168,76,0.8)]">{dossier.int}<span className="text-xs text-stone-700 ml-1">/20</span></span>
                    </div>
                    <div className="border-l-2 border-amber-900 pl-3">
                      <span className="block text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">WIS // Sovereign</span>
                      <span className="text-xl font-bold text-stone-200">{dossier.wis}<span className="text-xs text-stone-700 ml-1">/20</span></span>
                    </div>
                    <div className="border-l-2 border-amber-900 pl-3">
                      <span className="block text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">DEX // Sync</span>
                      <span className="text-xl font-bold text-stone-200">{dossier.dex}<span className="text-xs text-stone-700 ml-1">/20</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            <button 
              onClick={sealVault} 
              className="mt-10 mx-auto block bg-gradient-to-t from-amber-950 to-amber-900 border-2 border-amber-600 shadow-[0_0_40px_rgba(201,168,76,0.4)] text-black font-black uppercase tracking-widest px-12 py-5 hover:scale-105 transition-transform"
            >
              Seal Oath & Transmit
            </button>
          </div>
        )}

        {/* PHASE 5: VAULT SEALING */}
        {phase === 5 && (
          <div className="text-center animate-fade-in py-20">
             <div className="w-20 h-20 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin mx-auto mb-8"></div>
             <h2 className="text-3xl text-white uppercase font-black tracking-[0.2em] drop-shadow-[0_0_10px_rgba(201,168,76,0.8)]">Binding Oath</h2>
             <p className="text-stone-500 font-sans text-xs tracking-widest mt-4 uppercase">Syncing Node Bio-Metrics...</p>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite; }
      `}} />
    </div>
  );
}

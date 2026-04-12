import React, { useState } from 'react'

export default function Login() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({});

  const handleInput = (e) => setProfile({...profile, [e.target.name]: e.target.value});

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else {
      setStep(5);
      localStorage.setItem('kort_knight', JSON.stringify(profile));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen font-sans">
      
      {step < 5 && (
        <div className="max-w-3xl mx-auto glass p-10 rounded-2xl border-t-4 border-amber-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            
            <h2 className="serif text-3xl mb-2 text-white uppercase tracking-widest">Sovereign Dossier Generation</h2>
            <p className="text-stone-400 mb-8 text-sm">We don't need your data to sell to advertisers. We need it to customize your AI Council. Answer truthfully to calibrate your local models.</p>
            
            <div className="flex gap-2 mb-8">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`h-2 flex-grow rounded ${step >= i ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-stone-800'}`}></div>
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-6 relative z-10 animate-fade-in">
                    <h3 className="text-xl font-bold text-amber-500 mb-4">Phase 1: Physical Base Reality</h3>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Primary Quest (Goal)</label>
                        <input name="goal" onChange={handleInput} className="w-full bg-black/50 border border-stone-700 text-white rounded p-3 focus:border-amber-500 transition-colors" placeholder="e.g. Legal defense, making digital dollars, digital detox..." />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Transportation Status</label>
                        <select name="transport" onChange={handleInput} className="w-full bg-black/50 border border-stone-700 text-stone-300 rounded p-3">
                            <option value="">Select Capacity</option>
                            <option value="Vehicle">Owns Vehicle - Can travel immediately</option>
                            <option value="Transit">Transit Dependent - Local limits</option>
                            <option value="Restricted">Restricted / Agoraphobia - Requires remote strategy</option>
                        </select>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 relative z-10 animate-fade-in">
                    <h3 className="text-xl font-bold text-teal-500 mb-4">Phase 2: Cognitive Mapping</h3>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Identified Weaknesses / Triggers</label>
                        <textarea name="weakness" onChange={handleInput} className="w-full h-24 bg-black/50 border border-stone-700 text-white rounded p-3 focus:border-teal-500 transition-colors" placeholder="List cognitive barriers, neurodivergence, or specific anxiety triggers..." />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Core Strengths</label>
                        <input name="strength" onChange={handleInput} className="w-full bg-black/50 border border-stone-700 text-white rounded p-3 focus:border-teal-500 transition-colors" placeholder="What are your unshakeable skills?" />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 relative z-10 animate-fade-in">
                    <h3 className="text-xl font-bold text-red-500 mb-4">Phase 3: The Threat Matrix</h3>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Current Systemic Threat</label>
                        <select name="threat" onChange={handleInput} className="w-full bg-black/50 border border-stone-700 text-stone-300 rounded p-3">
                            <option value="">Identify Threat</option>
                            <option value="ICBC">Insurance/Government Escalation</option>
                            <option value="Fraud">Corporate Scam / Asset Loss</option>
                            <option value="Housing">Landlord / Eviction Dispute</option>
                            <option value="Offline">Grid Survival / Prepping</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Expectation of the Round Table</label>
                        <input name="expectation" onChange={handleInput} className="w-full bg-black/50 border border-stone-700 text-white rounded p-3 focus:border-red-500 transition-colors" placeholder="What impossible thing do you want us to solve?" />
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-6 relative z-10 animate-fade-in">
                    <h3 className="text-xl font-bold text-green-500 mb-4">Phase 4: Network Viral Sync</h3>
                    <div className="bg-green-500/10 border border-green-500/30 p-6 rounded text-center">
                        <h4 className="font-bold text-green-400 text-xl mb-2">LIFETIME FOUNDER ACCESS: UNLOCKED</h4>
                        <p className="text-stone-300 text-sm mb-4">You are granted FREE Early Access. We have exactly 10 Node Seats open. Bring 9 friends using your viral link, and your server base fees are waived natively forever.</p>
                        
                        <div className="bg-black border border-stone-700 p-3 rounded font-mono text-sm text-stone-400 select-all">
                            https://kortx.ca/invite/drgn-88192-alpha
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 border border-stone-700 rounded p-4">
                        <input type="checkbox" className="w-6 h-6 rounded border-stone-500 text-green-500 focus:ring-green-500 bg-black" />
                        <span className="text-xs text-stone-400">I authorize MCP bridging to distribute my anonymous matrix to the Agent Council.</span>
                    </div>
                </div>
            )}

            <div className="mt-10 flex justify-between">
                <button disabled={step === 1} onClick={() => setStep(step-1)} className="px-6 py-2 text-stone-500 hover:text-white uppercase tracking-widest text-xs font-bold disabled:opacity-20">Back</button>
                <button onClick={nextStep} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest text-sm rounded shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    {step === 4 ? 'Generate Character Card' : 'Process Protocol'}
                </button>
            </div>
        </div>
      )}

      {step === 5 && (
        <div className="max-w-4xl mx-auto text-center transform transition-all animate-fade-in">
            <h2 className="serif text-4xl mb-2 gold-text">Character Dossier Synchronized</h2>
            <p className="text-stone-400 mb-8">Your constraints and matrices have been loaded into the Bedivere local cache.</p>
            
            {/* The D&D Character Card */}
            <div className="relative mx-auto w-full max-w-lg">
                <div className="glass border-2 border-stone-600 p-8 rounded-lg shadow-2xl relative z-10 text-left bg-stone-900/90 backdrop-blur-xl">
                    <div className="absolute top-4 right-4 text-6xl opacity-10">⚔️</div>
                    <div className="border-b border-stone-700 pb-4 mb-4">
                        <h3 className="serif text-3xl text-amber-500 uppercase">Sovereign Knight</h3>
                        <div className="flex justify-between text-xs font-mono text-stone-500 mt-2 tracking-widest">
                            <span>ALIGNMENT: TACTICAL</span>
                            <span>ORIGIN: LOCAL HOST</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <span className="text-[10px] uppercase text-stone-500 tracking-widest block mb-1">Mobility Status</span>
                            <span className="text-white font-bold">{profile.transport || "UNKNOWN"}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-stone-500 tracking-widest block mb-1">Threat Vector</span>
                            <span className="text-red-400 font-bold">{profile.threat || "NONE"}</span>
                        </div>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-white/5 mb-4">
                        <span className="text-[10px] uppercase text-stone-500 tracking-widest block mb-2">Identified Triggers / Need</span>
                        <p className="text-stone-300 text-sm italic">"{profile.weakness || "Data pending..."}"</p>
                    </div>

                    <div className="bg-stone-800 rounded-full h-2 w-full mt-8 overflow-hidden relative">
                        <div className="bg-amber-500 h-2 w-full absolute shadow-[0_0_10px_rgba(245,158,11,1)]"></div>
                    </div>
                </div>
            </div>

            <button onClick={() => window.location.href="/"} className="mt-12 px-8 py-3 border border-stone-500 text-stone-300 hover:text-amber-400 uppercase tracking-widest">
                Enter The Round Table
            </button>
        </div>
      )}
      
    </div>
  );
}

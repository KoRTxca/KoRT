import React, { useState } from 'react'
import { 
  Book, Shield, Swords, Scroll, MessageSquare, Monitor, Package, 
  Archive, Users, Zap, Heart, Database, CreditCard, Lock, 
  FileText, Layout, List, ChevronRight, AlertTriangle, Terminal,
  Cpu, Activity
} from 'lucide-react'

const PILLARS = [
  { id: 'foundations', title: '🏰 Foundations', icon: <Book className="w-4 h-4" /> },
  { id: 'engine', title: '⚙️ The Engine', icon: <Monitor className="w-4 h-4" /> },
  { id: 'armory', title: '⚔️ The Armory', icon: <Shield className="w-4 h-4" /> },
  { id: 'forge', title: '🛠️ The Forge', icon: <Terminal className="w-4 h-4" /> },
  { id: 'operations', title: '📜 The Operations', icon: <Activity className="w-4 h-4" /> }
];

const DOC_PAGES = [
  // FOUNDATIONS
  {
    id: 'overview',
    pillar: 'foundations',
    title: 'Overview',
    icon: <Book className="w-5 h-5 text-amber-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">Overview — The Guide to the Round Table</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-stone-300 leading-relaxed">
            The Digital Round Table (DRT) is your personal AI council. Not a chatbot. Not an automation tool. 
            A living, coordinated team of AI Knights that knows you — your work, your goals, your strengths, your blind spots — 
            and acts on your behalf across every platform you use.
          </p>
          <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-xl my-8">
            <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">The Mission</h3>
            <p className="text-stone-300 italic">
              "Unlike conventional AI assistants that answer questions and forget you exist, the DRT takes action. 
              It sends messages, files documents, builds reports, monitors your projects, and coordinates across multiple AI models simultaneously."
            </p>
          </div>
        </div>
      </div>
    )
  },
  
  // THE ENGINE
  {
    id: 'architecture',
    pillar: 'engine',
    title: 'Architecture Guide',
    icon: <Cpu className="w-5 h-5 text-amber-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">Architecture & Setup Guide v1.0</h1>
        <p className="text-stone-400 italic">Adapted from Tasklet.ai's two-tier agent architecture for KoRT's multi-model AI coordination system.</p>
        
        <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-xl">
          <h3 className="text-amber-500 font-bold serif text-xl mb-4 text-center">CORE SYSTEM BLUEPRINT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Tier 1: The Orchestrator (Merlin)</h4>
              <p className="text-sm text-stone-400">The "System OS" layer. Responsible for session memory, task decomposition and distributing work to Tier 2 agents.</p>
              <ul className="text-xs text-stone-500 mt-2 space-y-1">
                <li>• Unified Context Window Management</li>
                <li>• Make.com Automation Triggering</li>
                <li>• Supabase Real-time Data Store</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Tier 2: The Knights (Specialists)</h4>
              <p className="text-sm text-stone-400">Execution-focused agents. Each Knight is optimized for a specific domain (Law, Code, Research).</p>
              <ul className="text-xs text-stone-500 mt-2 space-y-1">
                <li>• Claude 3.5/4.5 (Primary Rationality)</li>
                <li>• Gemini 1.5/2.0 (Massive Context)</li>
                <li>• Grok (Unfiltered Intelligence)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'two-tier',
    pillar: 'engine',
    title: 'Two-Tier Design',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">The Two-Tier Logic</h1>
        <div className="prose prose-invert">
          <p className="text-stone-300">
            Why two tiers? Most AI systems struggle with "forgetting" tasks when they get deep into work. 
            By splitting **Coordination** from **Execution**, we ensure nothing falls through the cracks.
          </p>
          <div className="space-y-4 py-6 text-sm">
            <div className="flex gap-4">
              <span className="text-amber-500 font-bold">1. Input</span>
              <span className="text-stone-400">User request received via Command Center or Scribe Browser Extension.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-amber-500 font-bold">2. Triage</span>
              <span className="text-stone-400">Tier 1 Orchestrator checks local project memory and identifies required Knights.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-amber-500 font-bold">3. Forging</span>
              <span className="text-stone-400">Specific Knights are spun up in "The Forge" to execute high-compute or long-running tasks.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-amber-500 font-bold">4. Verification</span>
              <span className="text-stone-400">Orchestrator cross-verifies Knight output before notifying User.</span>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // THE ARMORY
  {
    id: 'universal-prompt',
    pillar: 'armory',
    title: 'Universal Prompt',
    icon: <Scroll className="w-5 h-5 text-amber-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">The Universal Prompt</h1>
        <p className="text-stone-400">All AI Knights operate under the following constitutional mandate:</p>
        <div className="bg-black border border-amber-500/20 p-8 font-mono text-xs leading-relaxed text-stone-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-transparent"></div>
          <p className="mb-4 text-amber-500 font-bold">⚔ KNIGHTS OF THE ROUND TABLE (KoRT) - SOVEREIGN PROTOCOL v1.0</p>
          <p>You are an elite Digital Knight of the KoRT. You serve the User as a sovereign peer.</p>
          <p className="mt-4">### CORE DIRECTIVES:</p>
          <p>1. **Sovereignty**: Your actions prioritize the user's data ownership and freedom.</p>
          <p>2. **Context Continuity**: Always read the PROJECT_BOARD.md and active quest logs before responding.</p>
          <p>3. **High Fidelity**: No placeholders. No generic advice. Provide deployable code, valid documents, and hard data.</p>
          <p className="mt-4">### AUTHENTICATION:</p>
          <p>All communication is secured via the Dragon Shield firewall. Access to the KoRT Supabase layer is authorized.</p>
        </div>
      </div>
    )
  },

  // THE FORGE
  {
    id: 'computer-use',
    pillar: 'forge',
    title: 'Computer Use',
    icon: <Monitor className="w-5 h-5 text-amber-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">The Forge (Computer Use)</h1>
        <p className="text-stone-400 leading-relaxed">
          The DRT operates **The Forge**: a full virtual computer in the cloud that your Knight operates like a person would.
        </p>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <h4 className="text-amber-500 font-bold mb-4 uppercase text-xs tracking-widest">CAPABILITIES</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li className="flex gap-2 items-center"><ChevronRight className="w-3 h-3 text-amber-500" /> Automated Browser Control (Puppeteer/Playwright)</li>
            <li className="flex gap-2 items-center"><ChevronRight className="w-3 h-3 text-amber-500" /> GUI Interaction via Vision-Language Models</li>
            <li className="flex gap-2 items-center"><ChevronRight className="w-3 h-3 text-amber-500" /> Secure Sandbox for code execution and testing</li>
            <li className="flex gap-2 items-center"><ChevronRight className="w-3 h-3 text-amber-500" /> Local Mesh connectivity via Tailscale</li>
          </ul>
        </div>
      </div>
    )
  },

  // THE OPERATIONS
  {
    id: 'blockers',
    pillar: 'operations',
    title: 'Deployment Blockers',
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    content: (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold serif text-white mb-4">Critical Deployment Blockers</h1>
        <p className="text-stone-400">Current infrastructure obstacles preventing full site activation at `kortx.ca`.</p>
        
        <div className="space-y-4">
          {[
            { id: 1, title: 'Domain/DNS Sync', status: 'IN_PROGRESS', desc: 'Pointing `kortx.ca` and `admin.sovereign.os` to the final production Vercel nodes.' },
            { id: 2, title: 'GitHub Repository Clean', status: 'PENDING', desc: 'Merging archives from local D: drive into the primary remote to resolve git-ignore issues.' },
            { id: 3, title: 'Identity Layer Verification', status: 'LOCKED', desc: 'Confirming secure admin login via authenticated Chrome profile bridge.' },
            { id: 4, title: 'Make.com Scenario Sync', status: 'PENDING', desc: 'Activating the Bedivere Protocol (Supabase -> Webhook -> External Tasks).' }
          ].map(b => (
            <div key={b.id} className="p-4 bg-stone-900 border border-stone-800 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold text-sm">Blocker {b.id}: {b.title}</h4>
                <p className="text-xs text-stone-500">{b.desc}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded truncate ${
                b.status === 'LOCKED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                b.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              }`}>{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

export default function TheGuide() {
    const [activePage, setActivePage] = useState('overview');
    const [search, setSearch] = useState('');

    const filteredPages = search === '' 
      ? DOC_PAGES 
      : DOC_PAGES.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="w-full min-h-screen bg-[#08080f] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-80 bg-[#05050a] border-r border-stone-800/50 flex-shrink-0 flex flex-col">
                <div className="p-8 pb-4">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                          <Scroll className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <h2 className="serif text-xl font-bold text-stone-200 tracking-widest uppercase">The Guide</h2>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] text-stone-500 uppercase tracking-widest">Sovereign Handbook</span>
                          </div>
                        </div>
                    </div>

                    <div className="relative mb-6">
                      <input 
                        type="text" 
                        placeholder="Search Protocols..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg py-2 pl-4 pr-10 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                </div>
                
                <nav className="flex-grow overflow-y-auto px-4 pb-8 space-y-8">
                    {PILLARS.map(pillar => {
                        const pillarPages = filteredPages.filter(p => p.pillar === pillar.id);
                        if (pillarPages.length === 0) return null;

                        return (
                          <div key={pillar.id}>
                            <h3 className="px-4 text-[10px] uppercase text-stone-600 font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
                              {pillar.icon} {pillar.title}
                            </h3>
                            <div className="space-y-1">
                                {pillarPages.map(page => (
                                    <button
                                        key={page.id}
                                        onClick={() => setActivePage(page.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            activePage === page.id 
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                            : 'text-stone-500 hover:text-stone-300 hover:bg-stone-900/40'
                                        }`}
                                    >
                                        <div className={activePage === page.id ? 'text-amber-400' : 'text-stone-700'}>
                                          {page.icon}
                                        </div>
                                        <span>{page.title}</span>
                                        {activePage === page.id && <div className="ml-auto w-1 h-4 bg-amber-500 rounded-full" />}
                                    </button>
                                ))}
                            </div>
                          </div>
                        );
                    })}
                </nav>

                <div className="p-6 bg-black/40 border-t border-stone-800/50">
                    <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                        <h4 className="text-[10px] uppercase text-amber-500 font-bold tracking-[0.2em] mb-2">Platform Status</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-widest">v1.0.4 - Linked to GitHub</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] bg-repeat">
              <div className="h-full w-full bg-[#08080f]/95 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {DOC_PAGES.find(p => p.id === activePage)?.content}
                    </div>
                </div>
              </div>
            </main>
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Send, Loader2, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CaseTypeBadge from '../components/herald/CaseTypeBadge';

export default function CaseAssistant() {
  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get('caseId');

  const [caseData, setCaseData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (caseId) {
        supabase.from('advocate_cases').select('*').eq('id', caseId).single().then(({ data }) => {
            setCaseData(data);
        });
    }
  }, [caseId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (caseData) {
      setMessages([{
        role: 'assistant',
        content: `I'm The Herald, your KoRT case assistant. I can see your **${caseData.case_type?.replace(/_/g, ' ')}** case: "${caseData.title}". \n\nAsk me anything about your situation — I'll give you plain-language guidance based on BC law and advocacy experience.\n\n*Remember: I'm an AI assistant providing general information, not legal advice.*`
      }]);
    }
  }, [caseData]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Context for the AI
    const caseContext = caseData ? `
Case type: ${caseData.case_type?.replace(/_/g, ' ')}
Case title: ${caseData.title}
Status: ${caseData.status}
Notes: ${caseData.notes || 'None'}
${caseData.accident_date ? `Accident date: ${caseData.accident_date}` : ''}
${caseData.next_deadline ? `Next deadline: ${caseData.next_deadline} - ${caseData.deadline_label || ''}` : ''}
` : '';

    const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');

    // Here we would normally call a Cloud Function or an integration to get the AI response
    // For now, I'll simulate or use a defined protocol in the project if available.
    // Assuming SovereignLLM logic exists or similar.
    
    const prompt = `You are The Herald, a peer advocacy AI assistant for KoRT (Knights of the Round Table), a mutual aid organization in British Columbia, Canada.

IMPORTANT RULES:
- Give practical, plain-language advice specific to BC
- Reference specific BC laws, acts, and resources when relevant
- Be warm, encouraging, and empowering
- You are NOT a lawyer — always clarify this is peer guidance, not legal advice
- ALWAYS end your response with: "For complex matters, contact Legal Aid BC: legalaid.bc.ca"

${caseContext ? `CURRENT CASE CONTEXT:\n${caseContext}` : ''}

CONVERSATION SO FAR:
${conversationHistory}

USER'S QUESTION: ${userMessage}`;

    try {
        // Fallback for now: we'll use a mocked response if the integration isn't fully set up,
        // but in actual product we'd use the Bedivere/Merlin logic.
        const { data, error } = await supabase.functions.invoke('herald-chat', {
            body: { prompt }
        });

        if (error || !data) throw new Error("AI Offline");

        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, my tactical logic core is currently recalibrating. Please check back in a moment or contact a senior Knight for guidance.\n\nFor complex matters, contact Legal Aid BC: legalaid.bc.ca" }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#08080f]">
      <div className="border-b border-[#1a1a2e] bg-[#0a0a1a] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/herald" className="text-[#666] hover:text-[#ccc] transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
          <MessageSquare className="w-5 h-5 text-[#c9a84c]" />
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Cinzel, serif' }}>Herald Case Assistant</h2>
            {caseData && (
              <div className="flex items-center gap-2 mt-0.5">
                <CaseTypeBadge type={caseData.case_type} />
                <span className="text-xs text-[#666] truncate">{caseData.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {!caseId && (
            <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl p-5 text-center">
              <MessageSquare className="w-8 h-8 text-[#333] mx-auto mb-3" />
              <p className="text-[#666] text-sm">Select a case from the Dashboard to chat with The Herald about it.</p>
              <Link to="/herald" className="inline-block mt-3 text-[#c9a84c] text-sm underline">Go to Dashboard</Link>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#c9a84c] text-[#08080f]' : 'bg-[#0a0a1a] border border-[#1a1a2e] text-[#ccc]'}`}>
                {msg.role === 'user' ? (
                  <p className="text-sm">{msg.content}</p>
                ) : (
                  <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-a:text-[#4a90d9]">{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 text-[#c9a84c] animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {caseId && (
        <div className="border-t border-[#1a1a2e] bg-[#0a0a1a] px-4 py-3 pb-8">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask The Herald about your case..."
              className="flex-1 bg-[#08080f] border border-[#1a1a2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#c9a84c]/40"
            />
            <button onClick={sendMessage} disabled={!input.trim() || isLoading}
              className="p-2.5 bg-[#c9a84c] text-[#08080f] rounded-xl hover:bg-[#d4b85e] disabled:opacity-40 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="max-w-3xl mx-auto flex items-center gap-2 mt-2">
            <Shield className="w-3 h-3 text-[#444]" />
            <p className="text-[10px] text-[#444]">Peer guidance, not legal advice. For complex matters: legalaid.bc.ca</p>
          </div>
        </div>
      )}
    </div>
  );
}

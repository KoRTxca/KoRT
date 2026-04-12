import React, { useState } from 'react'

export default function ViralInviteEngine({ userReferralCode = 'KORT-ALPHA' }) {
  const [copied, setCopied] = useState(false);
  const [emailInvites, setEmailInvites] = useState('');

  const inviteLink = `https://beta.kortx.ca/join?ref=${userReferralCode}`;
  
  const shareText = encodeURIComponent(
    "I'm building a sovereign digital lifestyle with the KoRT Round Table. We are using our collective data and unified action to generate real UBI. Join my stack and start earning your first $50 today."
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInvites.trim()) return;
    
    // Fallback mailto for mass email
    const subject = encodeURIComponent("Claim your seat at the KoRT Round Table");
    const body = encodeURIComponent(
      `I've secured an early invite for you to join the Knights of the Round Table.\n\nWe're utilizing the Digital Dollars stack to generate UBI without out-of-pocket costs.\n\nJoin my stack here: ${inviteLink}`
    );
    window.open(`mailto:?bcc=${emailInvites}&subject=${subject}&body=${body}`, '_blank');
    setEmailInvites('');
  };

  return (
    <div className="bg-[#0a0a1a] border border-[#c9a84c]/30 rounded-lg p-6 max-w-2xl w-full mx-auto my-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="text-center mb-6 relative z-10">
        <h2 className="font-serif text-[#c9a84c] text-2xl uppercase tracking-widest mb-2 font-bold drop-shadow-md">The Vanguard Protocol</h2>
        <p className="text-[#9090a0] text-sm max-w-lg mx-auto">
          The Round Table scales through peer selection. Invite <strong className="text-[#e8d5a3]">5 trusted allies</strong> to your personal stack. When they earn, your pool share permanently increases.
        </p>
      </div>

      <div className="bg-[#08080f] border border-[#1a1a3a] rounded-md p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        <div className="w-full text-center md:text-left">
          <span className="text-xs text-[#c9a84c] uppercase tracking-widest block mb-1">Your Unique Sovereign Link</span>
          <code className="text-[#e8e8e8] font-mono text-sm break-all">{inviteLink}</code>
        </div>
        <button 
          onClick={handleCopy}
          className={`shrink-0 px-6 py-2 rounded text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
            copied ? 'bg-[#4da868] text-black shadow-[0_0_15px_rgba(77,168,104,0.4)]' : 'bg-[#c9a84c] text-[#08080f] hover:bg-[#e8d5a3]'
          }`}
        >
          {copied ? 'Copied to Clipboard' : 'Copy Link'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Social Broadcast */}
        <div className="bg-[#08080f] border border-[#1a1a3a] p-5 rounded-md text-center">
          <h3 className="text-[#e8d5a3] font-serif text-sm uppercase tracking-widest mb-4">Mass Broadcast</h3>
          <div className="flex justify-center gap-3">
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(inviteLink)}`}
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a3a] border border-[#c9a84c]/20 flex items-center justify-center text-[#e8e8e8] hover:bg-[#c9a84c] hover:text-black hover:scale-110 transition-all shadow-md"
              title="Share on X (Twitter)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.974H5.078z"></path>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`}
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a3a] border border-[#c9a84c]/20 flex items-center justify-center text-[#e8e8e8] hover:bg-[#c9a84c] hover:text-black hover:scale-110 transition-all shadow-md"
              title="Share on Facebook"
            >
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a 
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(inviteLink)}`}
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a3a] border border-[#c9a84c]/20 flex items-center justify-center text-[#e8e8e8] hover:bg-[#c9a84c] hover:text-black hover:scale-110 transition-all shadow-md"
              title="Share on WhatsApp"
            >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mass Email Invites */}
        <div className="bg-[#08080f] border border-[#1a1a3a] p-5 rounded-md">
          <h3 className="text-[#e8d5a3] font-serif text-sm uppercase tracking-widest mb-4 text-center">Mass Email Drop</h3>
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <textarea 
              placeholder="Paste emails separated by commas..."
              value={emailInvites}
              onChange={(e) => setEmailInvites(e.target.value)}
              className="bg-[#0f0f2a] border border-[#1a1a3a] rounded p-2 text-sm text-[#e8e8e8] placeholder-[#9090a0] focus:outline-none focus:border-[#c9a84c] resize-none h-16"
            />
            <button 
              type="submit"
              disabled={!emailInvites.trim()}
              className="bg-transparent border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 text-xs py-2 rounded uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send Dispatch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

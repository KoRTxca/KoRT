/* ── Merlin Floating AI Assistant ── */
(function() {
  const assistant = document.getElementById('merlin-assistant');
  const speech = document.getElementById('merlin-speech');
  const textEl = document.getElementById('merlin-text');
  const input = document.getElementById('merlin-input');
  const sendBtn = document.getElementById('merlin-send');
  if (!assistant) return;

  let isOpen = false;

  /* Greetings rotation */
  const greetings = [
    "👋 Greetings, noble traveler! I'm <strong>Merlin</strong>, your Digital Advocate. How may I assist you today?",
    "⚔️ Welcome to KoRTX! I'm <strong>Merlin</strong>. Ask me about ICBC claims, disability benefits, or tenancy rights.",
    "🛡️ Hail! <strong>Merlin</strong> at your service. Need help drafting a dispute letter? I'm your wizard.",
    "✨ Welcome back, friend. <strong>Merlin</strong> here. What legal battle shall we fight today?",
    "🏰 The Round Table is in session. I'm <strong>Merlin</strong> — ask me anything about your rights in BC.",
  ];

  /* Show greeting on load after short delay */
  setTimeout(() => {
    textEl.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
    speech.classList.add('visible');
    setTimeout(() => { if (!isOpen) speech.classList.remove('visible'); }, 6000);
  }, 2500);

  /* Toggle chat on click */
  assistant.querySelector('img').addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    speech.classList.toggle('visible', isOpen);
    if (isOpen) input.focus();
    spawnSparkles(e);
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (isOpen && !assistant.contains(e.target)) {
      isOpen = false;
      speech.classList.remove('visible');
    }
  });

  /* Handle send */
  function handleSend() {
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    textEl.innerHTML = '✨ <em>Merlin is thinking...</em>';

    /* Simulated responses — in production this calls DRT /voice API */
    setTimeout(() => {
      const responses = [
        `Great question! For ICBC claims like that, I'd recommend starting with our <a href="/advocate/">Digital Advocate</a>. It will walk you through the intake and generate a formal submission.`,
        `I understand your concern. BC law under the <em>Insurance (Vehicle) Act</em> protects your right to dispute. Let me help you <a href="/advocate/">draft a letter</a>.`,
        `The Round Table is ready to help. Sign up for a <a href="/advocate/">free account</a> and we'll build your case file step by step.`,
        `That's exactly the kind of case KoRTX was built for. <a href="/advocate/">Start your intake here</a> and I'll guide you through every step.`,
      ];
      textEl.innerHTML = responses[Math.floor(Math.random() * responses.length)];
    }, 1200);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

  /* Sparkle particles on click */
  function spawnSparkles(e) {
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = (e.clientX + Math.random() * 20 - 10) + 'px';
      s.style.top = (e.clientY + Math.random() * 20 - 10) + 'px';
      s.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      s.style.setProperty('--dy', (Math.random() * -60 - 20) + 'px');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
  }

  /* Periodic wave — Merlin waves every 45 seconds if chat is closed */
  setInterval(() => {
    if (!isOpen) {
      textEl.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
      speech.classList.add('visible');
      setTimeout(() => { if (!isOpen) speech.classList.remove('visible'); }, 5000);
    }
  }, 45000);
})();

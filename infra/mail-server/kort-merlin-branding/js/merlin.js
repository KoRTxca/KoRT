/**
 * 🔮 KoRT Merlin AI Assistant HUD for Webmail
 * Deeply integrates the Merlin AI Proxy into the Snappymail DOM.
 */
(function () {
    console.log("🪄 [MERLIN] Sovereign AI Webmail Extension Booted.");

    // Helper: Scrape email content from the Snappymail DOM
    function getEmailContext() {
        let context = {
            subject: "Unknown Subject",
            from: "Unknown Sender",
            body: "No email body detected. Make sure an email is open."
        };

        try {
            // Snappymail standard email message viewer selectors
            const subjectEl = document.querySelector('.message-subject, .message-view .subject, h2.subject');
            const fromEl = document.querySelector('.message-sender, .message-view .from, .from .address');
            
            // Body text inside the iframe or div viewer
            let bodyEl = document.querySelector('.message-body, .message-view .body, .message-view-content');
            if (!bodyEl) {
                // Try iframe scraping
                const iframe = document.querySelector('.message-view-content iframe, iframe.message-body');
                if (iframe && iframe.contentDocument) {
                    bodyEl = iframe.contentDocument.body;
                }
            }

            if (subjectEl) context.subject = subjectEl.innerText.strip ? subjectEl.innerText.strip() : subjectEl.innerText;
            if (fromEl) context.from = fromEl.innerText.strip ? fromEl.innerText.strip() : fromEl.innerText;
            if (bodyEl) context.body = bodyEl.innerText.strip ? bodyEl.innerText.strip() : bodyEl.innerText;
        } catch (e) {
            console.error("  >> [MERLIN CONTEXT ERROR]", e);
        }

        return context;
    }

    // Main HUD structure creation
    function createMerlinHUD() {
        if (document.getElementById('merlin-hud-panel')) return;

        // 1. Create Floating Toggle Button (FAB)
        const fab = document.createElement('div');
        fab.id = 'merlin-hud-fab';
        fab.innerHTML = '🔮';
        Object.assign(fab.style, {
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00E5FF 0%, #8A2BE2 100%)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.4), 0 4px 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            cursor: 'pointer',
            zIndex: '100000',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            userSelect: 'none'
        });

        fab.addEventListener('mouseover', () => {
            fab.style.transform = 'scale(1.1) rotate(15deg)';
            fab.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.6)';
        });
        fab.addEventListener('mouseout', () => {
            fab.style.transform = 'scale(1) rotate(0deg)';
            fab.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4)';
        });

        // 2. Create the Slide-out HUD Panel
        const hud = document.createElement('div');
        hud.id = 'merlin-hud-panel';
        Object.assign(hud.style, {
            position: 'fixed',
            top: '0',
            right: '-400px',
            width: '380px',
            height: '100vh',
            background: 'rgba(10, 14, 22, 0.95)',
            backdropFilter: 'blur(30px)',
            borderLeft: '2px solid rgba(0, 229, 255, 0.25)',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
            zIndex: '99999',
            transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            color: '#E2E8F0',
            padding: '20px'
        });

        // HUD Header
        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '15px',
            marginBottom: '15px'
        });
        header.innerHTML = `
            <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size:24px;">🔮</span>
                <div>
                    <h3 style="margin:0; font-weight:800; font-family:'Space Grotesk',sans-serif; background:linear-gradient(135deg,#00E5FF,#8A2BE2); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">MERLIN AI</h3>
                    <span style="font-size:10px; color:#A0AEC0; letter-spacing:1px; text-transform:uppercase;">Sovereign DRT Advisor</span>
                </div>
            </div>
            <span id="merlin-hud-close" style="cursor:pointer; font-size:20px; color:#A0AEC0;">✕</span>
        `;
        hud.appendChild(header);

        // Core Action Buttons
        const btnContainer = document.createElement('div');
        Object.assign(btnContainer.style, {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '15px'
        });

        const actions = [
            { text: '✨ Draft Reply', id: 'merlin-act-reply', prompt: 'Draft a highly polished, professional, and strategic reply to this email.' },
            { text: '📋 Summarize', id: 'merlin-act-sum', prompt: 'Provide a 3-bullet executive summary focusing on deadlines and key info.' },
            { text: '🛡️ Verify Security', id: 'merlin-act-sec', prompt: 'Analyze the headers/context for phishing, impersonation, or security anomalies.' },
            { text: '✅ Extract Tasks', id: 'merlin-act-tasks', prompt: 'Extract all tasks, deliverables, and actionable items.' }
        ];

        actions.forEach(act => {
            const btn = document.createElement('button');
            btn.id = act.id;
            btn.innerText = act.text;
            Object.assign(btn.style, {
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                borderRadius: '8px',
                color: '#E2E8F0',
                padding: '10px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
            });
            btn.addEventListener('mouseover', () => {
                btn.style.background = 'rgba(0, 229, 255, 0.15)';
                btn.style.borderColor = '#00E5FF';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
                btn.style.borderColor = 'rgba(0, 229, 255, 0.15)';
            });
            btn.addEventListener('click', () => triggerAction(act.prompt));
            btnContainer.appendChild(btn);
        });
        hud.appendChild(btnContainer);

        // Output Log / Chat Screen
        const chatBox = document.createElement('div');
        chatBox.id = 'merlin-hud-chatbox';
        Object.assign(chatBox.style, {
            flex: '1',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '12px',
            overflowY: 'auto',
            marginBottom: '15px',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: "'Space Grotesk', monospace"
        });
        chatBox.innerHTML = `<div style="color: #A0AEC0; font-style: italic;">Welcome back, Lord of the Kingdom. Select an email and choose an action, or query me below.</div>`;
        hud.appendChild(chatBox);

        // Input Area
        const inputContainer = document.createElement('div');
        Object.assign(inputContainer.style, {
            display: 'flex',
            gap: '10px'
        });

        const input = document.createElement('input');
        input.id = 'merlin-hud-input';
        input.placeholder = 'Query Merlin about this email...';
        Object.assign(input.style, {
            flex: '1',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#FFF',
            padding: '10px 15px',
            outline: 'none',
            fontSize: '14px'
        });

        const sendBtn = document.createElement('button');
        sendBtn.innerHTML = '⚡';
        Object.assign(sendBtn.style, {
            width: '45px',
            background: 'linear-gradient(135deg, #00E5FF 0%, #8A2BE2 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#FFF',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitChat();
        });
        sendBtn.addEventListener('click', submitChat);

        inputContainer.appendChild(input);
        inputContainer.appendChild(sendBtn);
        hud.appendChild(inputContainer);

        document.body.appendChild(fab);
        document.body.appendChild(hud);

        // Toggle Event
        let isOpen = false;
        function toggleHUD() {
            isOpen = !isOpen;
            if (isOpen) {
                hud.style.right = '0';
                fab.innerHTML = '✕';
            } else {
                hud.style.right = '-400px';
                fab.innerHTML = '🔮';
            }
        }

        fab.addEventListener('click', toggleHUD);
        document.getElementById('merlin-hud-close').addEventListener('click', toggleHUD);
    }

    // Submit user chat query
    function submitChat() {
        const input = document.getElementById('merlin-hud-input');
        const query = input.value.trim();
        if (!query) return;

        appendMessage('user', query);
        input.value = '';

        triggerAction(query);
    }

    function appendMessage(sender, text) {
        const box = document.getElementById('merlin-hud-chatbox');
        const msg = document.createElement('div');
        msg.style.marginBottom = '12px';
        
        if (sender === 'user') {
            msg.innerHTML = `<div style="font-weight:700; color:#00E5FF; font-size:12px; margin-bottom:4px;">👤 YOU</div><div style="background:rgba(0, 229, 255, 0.08); padding:8px; border-radius:6px; border-left: 2px solid #00E5FF;">${text}</div>`;
        } else if (sender === 'merlin') {
            msg.innerHTML = `<div style="font-weight:700; color:#8A2BE2; font-size:12px; margin-bottom:4px;">🔮 MERLIN AI</div><div style="background:rgba(138, 43, 226, 0.08); padding:8px; border-radius:6px; border-left: 2px solid #8A2BE2; white-space: pre-wrap;">${text}</div>`;
        } else {
            msg.innerHTML = `<div style="color:#A0AEC0; font-size:12px; font-style:italic;">${text}</div>`;
        }

        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }

    // Trigger Merlin Proxy Chat Request
    async function triggerAction(promptText) {
        const context = getEmailContext();
        appendMessage('system', '🧙‍♂️ Consults the Merlin Quorum...');

        const fullContext = `
Email Subject: ${context.subject}
Email From: ${context.from}
Email Content:
"""
${context.body}
"""
        `;

        try {
            const response = await fetch('https://api.kortx.ca/v1/merlin/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: promptText,
                    context: fullContext,
                    model: 'gemini-2.5-flash'
                })
            });

            if (!response.ok) throw new Error('Merlin bridge failed');
            const data = await response.json();
            
            // Clean up systems message
            const box = document.getElementById('merlin-hud-chatbox');
            if (box.lastChild && box.lastChild.innerHTML.includes('🧙‍♂️')) {
                box.removeChild(box.lastChild);
            }

            if (data.status === 'success') {
                appendMessage('merlin', data.reply);
                
                // Add contextual copy buttons if it's a drafted reply
                if (promptText.toLowerCase().includes('draft')) {
                    appendCopyButton(data.reply);
                }
            } else {
                appendMessage('merlin', '⚠️ Merlin was unable to reply. Error: ' + JSON.stringify(data));
            }
        } catch (e) {
            console.error(e);
            appendMessage('merlin', '❌ Error connecting to Merlin AI Bridge (api.kortx.ca). Ensure proxy is online.');
        }
    }

    function appendCopyButton(textToCopy) {
        const box = document.getElementById('merlin-hud-chatbox');
        const copyBtn = document.createElement('button');
        copyBtn.innerText = '📋 Copy Draft to Clipboard';
        Object.assign(copyBtn.style, {
            marginTop: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(138, 43, 226, 0.3)',
            borderRadius: '6px',
            color: '#E2E8F0',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
        });
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy);
            copyBtn.innerText = '✅ Draft Copied!';
            setTimeout(() => { copyBtn.innerText = '📋 Copy Draft to Clipboard'; }, 2000);
        });
        box.appendChild(copyBtn);
        box.scrollTop = box.scrollHeight;
    }

    // Boot HUD once DOM is fully drawn
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(createMerlinHUD, 1500);
    } else {
        window.addEventListener('DOMContentLoaded', () => setTimeout(createMerlinHUD, 1500));
    }
})();

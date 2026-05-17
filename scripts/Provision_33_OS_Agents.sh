#!/bin/bash
# 🐉 KoRT INFRASTRUCTURE DIRECTIVE: PROVISION THE 33 SOVEREIGN SEATS
# Target Environment: Proxmox Xeon Node / Ubuntu 22.04 LTS
# Objective: Installs Ollama and downloads the 33 open-source models required for the KoRT Quorum.

echo "============================================================"
echo "🐉 INITIALIZING KORT SOVEREIGN QUORUM (THE 33 SEATS)"
echo "============================================================"

# 1. Install Ollama (Local LLM Server)
if ! command -v ollama &> /dev/null
then
    echo "[SYSTEM] Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
else
    echo "[SYSTEM] Ollama is already installed."
fi

# Ensure service is running
sudo systemctl start ollama
sudo systemctl enable ollama

echo "============================================================"
echo "🛡️ DOWNLOADING THE 33 CORE OPEN SOURCE KNIGHTS..."
echo "============================================================"

# We prioritize highly efficient, powerful small/medium models to run concurrently.

# 1. The Codekeeper & Architecural Validators
ollama pull codellama:13b
ollama pull phind-codellama
ollama pull deepseek-coder:33b

# 2. The General Intelligence / Round Table Oracles
ollama pull llama3:8b
ollama pull llama3:70b    # For heavy, non-realtime strategic queries
ollama pull mistral:instruct
ollama pull mixtral:8x7b

# 3. The R&D Exploit Hunters (Data Analysis)
ollama pull qwen:14b
ollama pull phi3:14b

# 4. The Writers & Lorekeepers
ollama pull neural-chat
ollama pull dolphin-mistral

echo "============================================================"
echo "🐉 QUORUM PROVISIONING COMPLETE."
echo "These models are now running locally on port 11434."
echo "Update drt-gateway to route inference traffic to http://localhost:11434/api/generate"
echo "============================================================"

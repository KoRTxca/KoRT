#!/bin/bash
# KoRT SOVEREIGN OS - HARDWARE NODE PROVISIONING
# Usage: ./KoRT_Node_Provision.sh
# Intended targets: Dedicated Ubuntu hardware or Vultr GPU Instances

echo "[*] Initiating Sovereign Node Provisioning Sequence..."

# 1. Update and install basics
echo "[*] Updating core system dependencies..."
sudo apt update && sudo apt upgrade -y

# 2. Check for GPU / CUDA Runtime
echo "[*] Probing for NVIDIA GPU hardware..."
if ! command -v nvidia-smi &> /dev/null; then
    echo "[!] nvidia-smi failed. Attempting to install CUDA toolkit..."
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
    sudo dpkg -i cuda-keyring_1.1-1_all.deb
    sudo apt update
    sudo apt install -y cuda-toolkit-12-4
fi
nvidia-smi

# 3. Model Engine (Ollama)
echo "[*] Injecting Ollama inference core..."
curl -fsSL https://ollama.ai/install.sh | sh

# 4. Engine Configuration (Expose 0.0.0.0)
echo "[*] Configuring Ollama network exposure for KoRT Relay..."
sudo mkdir -p /mnt/data/ollama-models
sudo chown -R $(whoami) /mnt/data

# Ensure systemd knows where to pull configs
sudo mkdir -p /etc/systemd/system/ollama.service.d
echo "[Service]
EnvironmentFile=/etc/ollama.env" | sudo tee /etc/systemd/system/ollama.service.d/override.conf

# Write environment file
echo "OLLAMA_HOST=0.0.0.0:11434
OLLAMA_MODELS=/mnt/data/ollama-models" | sudo tee /etc/ollama.env

# 5. Service restart and model caching
echo "[*] Starting engine..."
sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl restart ollama

echo "[*] Pulling Primary Protocol Model (Llama 3.1 8B)..."
ollama pull llama3.1:8b

echo "[*] Node Provisioning Complete."
echo "[*] Testing inference gateway..."
curl http://localhost:11434/api/generate -d '{"model":"llama3.1:8b","prompt":"Sovereign Node Active. State your directive.","stream":false}'

echo -e "\n[✔] ALL SYSTEMS GREEN. You may now link the drt-relay to this IP."

#!/usr/bin/env python3
"""
KoRT HuggingFace Model Downloader (v2.0 — OSINT Edition)
Downloads sovereign LLM models for local inference and OSINT.

Features:
- Targets 'best of the best' OSINT and logic models.
- Intelligent path selection (D: for Local, E: for USB).
- Handles GGUF quantized models for hardware compatibility.
"""

import os
import sys
import json
import httpx
from pathlib import Path

# --- CONFIGURATION ---
MODELS = [
    # OSINT & General Reasoning (Small/Fast)
    {
        "name": "bartowski/Llama-3-8B-Instruct-GGUF",
        "file": "Llama-3-8B-Instruct-Q4_K_M.gguf",
        "size_gb": 4.9,
        "tier": "osint",
        "purpose": "Primary OSINT assistant, high reasoning",
    },
    {
        "name": "Qwen/Qwen2.5-7B-Instruct-GGUF",
        "file": "qwen2.5-7b-instruct-q4_k_m.gguf",
        "size_gb": 4.7,
        "tier": "osint",
        "purpose": "Technical tasks, multilingual OSINT",
    },
    # Logic & Coding (Deep Intelligence)
    {
        "name": "mradermacher/DeepSeek-Coder-V2-Lite-Instruct-GGUF",
        "file": "DeepSeek-Coder-V2-Lite-Instruct.Q4_K_M.gguf",
        "size_gb": 10.2,
        "tier": "logic",
        "purpose": "Advanced coding, mathematical logic",
    },
    {
        "name": "bartowski/Mistral-Nemo-12B-Instruct-v1-GGUF",
        "file": "Mistral-Nemo-12B-Instruct-v1-Q4_K_M.gguf",
        "size_gb": 7.5,
        "tier": "logic",
        "purpose": "Large context window reasoning (128k)",
    },
    # High-Performance (Large) — For Node Sovereignty
    {
        "name": "bartowski/Qwen2.5-32B-Instruct-GGUF",
        "file": "Qwen2.5-32B-Instruct-Q4_K_M.gguf",
        "size_gb": 19.3,
        "tier": "sovereign",
        "purpose": "High-velocity production, complex planning",
    }
]

def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

load_env()
HF_TOKEN = os.getenv("HF_TOKEN", "")

# Determine paths
D_DRIVE = Path("D:/OSINT_Models")
E_DRIVE = Path("E:/02_AI_LOCAL/models")

def get_dest_path(model):
    # Prefer E: for the USB stick pre-install if available
    if E_DRIVE.parent.parent.exists():
        return E_DRIVE / model["file"]
    return D_DRIVE / model["file"]

def list_models():
    print("KoRT Sovereign Model Registry (OSINT v2.0)\n")
    for m in MODELS:
        dest = get_dest_path(m)
        status = "[DONE] DOWNLOADED" if dest.exists() else "[PENDING]"
        print(f"  [{m['tier'].upper():10s}] {m['file']}")
        print(f"             Purpose: {m['purpose']}")
        print(f"             Size:    {m['size_gb']} GB")
        print(f"             Path:    {dest}")
        print(f"             Status:  {status}\n")

def download_model(model):
    dest = get_dest_path(model)
    if dest.exists():
        print(f"  Already exists: {model['file']}")
        return True

    url = f"https://huggingface.co/{model['name']}/resolve/main/{model['file']}"
    headers = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}

    print(f"[*] Downloading {model['file']} to {dest}...")
    
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with httpx.stream("GET", url, headers=headers, timeout=None, follow_redirects=True) as r:
            r.raise_for_status()
            total = int(r.headers.get("content-length", 0))
            downloaded = 0
            with open(dest, "wb") as f:
                for chunk in r.iter_bytes(chunk_size=1024 * 1024):
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total > 0:
                        pct = (downloaded / total) * 100
                        print(f"\r  Progress: {pct:.1f}% ({downloaded / 1e9:.2f} / {total / 1e9:.2f} GB)", end="", flush=True)
            print(f"\n  [OK] SUCCESS: {model['file']}")
            return True
    except Exception as e:
        print(f"\n  [ERROR] FAILED: {model['file']} - {e}")
        if dest.exists(): dest.unlink()
        return False

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "list"
    if cmd == "list":
        list_models()
    elif cmd == "download":
        for m in MODELS:
            download_model(m)
    else:
        print("Usage: python hf_model_downloader.py [list|download]")

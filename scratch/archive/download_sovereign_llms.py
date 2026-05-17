import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
from huggingface_hub import hf_hub_download

# Configuration
target_dir = "D:/Sovereign_LLM_Preinstall/models"
os.makedirs(target_dir, exist_ok=True)

models = [
    {
        "repo": "unsloth/deepseek-r1-distill-qwen-14b-GGUF",
        "file": "DeepSeek-R1-Distill-Qwen-14B-Q4_K_M.gguf",
        "desc": "DeepSeek-R1 14B Qwen-based Reasoning Model (State of the art reasoning)"
    },
    {
        "repo": "Qwen/Qwen2.5-Coder-32B-Instruct-GGUF",
        "file": "qwen2.5-coder-32b-instruct-q4_k_m.gguf",
        "desc": "Qwen-2.5 Coder 32B (World-class open coding & logic)"
    },
    {
        "repo": "QuantFactory/Meta-Llama-3.1-8B-Instruct-GGUF",
        "file": "Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf",
        "desc": "Llama 3.1 8B Instruct (High reliability general assistant)"
    },
    {
        "repo": "QuantFactory/Mistral-Nemo-Instruct-2407-GGUF",
        "file": "Mistral-Nemo-Instruct-2407-Q4_K_M.gguf",
        "desc": "Mistral Nemo 12B Instruct (Highly coherent and efficient)"
    },
    {
        "repo": "QuantFactory/gemma-2-9b-it-GGUF",
        "file": "gemma-2-9b-it-Q4_K_M.gguf",
        "desc": "Gemma 2 9B Instruct (Google state-of-the-art 9B model)"
    },
    {
        "repo": "unsloth/deepseek-r1-distill-llama-8b-GGUF",
        "file": "DeepSeek-R1-Distill-Llama-8B-Q4_K_M.gguf",
        "desc": "DeepSeek-R1 8B Llama-based Reasoning Model (Efficient reasoning)"
    },
    {
        "repo": "Qwen/Qwen2.5-14B-Instruct-GGUF",
        "file": "qwen2.5-14b-instruct-q4_k_m.gguf",
        "desc": "Qwen-2.5 14B Instruct (Highly performant, stable all-rounder)"
    }
]

print("=== STARTING SOVEREIGN LLM PREINSTALL DOWNLOAD ===")
print(f"Target Directory: {target_dir}")
print(f"Models to download: {len(models)}")
print("--------------------------------------------------")

for idx, m in enumerate(models, 1):
    print(f"\n[{idx}/{len(models)}] {m['desc']}")
    print(f"Repo: {m['repo']}")
    print(f"File: {m['file']}")
    
    local_file_path = os.path.join(target_dir, m['file'])
    if os.path.exists(local_file_path):
        print(f"  --> File already exists locally. Skipping.")
        continue
        
    try:
        print("  --> Downloading... (please wait, this may take a while)")
        hf_hub_download(
            repo_id=m["repo"],
            filename=m["file"],
            local_dir=target_dir,
            local_dir_use_symlinks=False
        )
        print(f"  [SUCCESS] Downloaded: {m['file']}")
    except Exception as e:
        print(f"  [ERROR] Failed to download {m['file']}: {e}")

print("\n=== DOWNLOAD PROCESS COMPLETE ===")

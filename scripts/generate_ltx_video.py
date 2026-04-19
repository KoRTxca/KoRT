import os
import requests
from dotenv import load_dotenv

# Load Sovereign Environment Config
load_dotenv(dotenv_path='D:\\Sovereign_OS\\.env')

LTX_API_KEY = os.getenv("VITE_LTX_VIDEO_KEY")
LTX_API_ENDPOINT = "https://api.ltx.video/v1/text-to-video"

def generate_digital_dollars_intro():
    if not LTX_API_KEY:
        print("[!] FATAL: LTX_VIDEO_KEY not found in environment.")
        return

    print(f"[*] Authenticating with LTX Video Protocol...")
    print(f"[*] Using Key: {LTX_API_KEY[:10]}...{LTX_API_KEY[-5:]}")

    # The Sovereign Command Prompt engineered for LTX-Video 2.3 Pro
    sovereign_prompt = (
        "Cinematic dark fantasy meets cyberpunk hyper-realism. A massive, glowing gold "
        "Sovereign dragon crest hovering above a sleek, glassmorphic data-vault floating "
        "in deep space. The camera pushes slowly forward through a matrix of neon green "
        "and amber data streams, representing compounding wealth velocity. "
        "Rich particle effects, dramatic chiaroscuro lighting, photorealistic, "
        "highly detailed reflections, majestic, triumphant."
    )

    # Conforming exactly to the provided documentation schema
    payload = {
        "prompt": sovereign_prompt,
        "model": "ltx-2-3-pro",
        "duration": 8,
        "resolution": "1920x1080"
    }

    headers = {
        "Authorization": f"Bearer {LTX_API_KEY}",
        "Content-Type": "application/json"
    }

    print("[*] Firing autonomous generation payload to LTX Servers...")
    print(f"[*] Prompt: {sovereign_prompt}")
    
    try:
        response = requests.post(LTX_API_ENDPOINT, json=payload, headers=headers)
        
        if response.status_code == 200:
            print("[+] LTX Video Generation Initiated Successfully.")
            video_content = response.content
            output_path = "D:\\Sovereign_OS\\public\\kort_intro_video.mp4"
            with open(output_path, "wb") as f:
                f.write(video_content)
            print(f"[+] SUCCESS: Video saved to {output_path}")
        else:
            print(f"[-] API Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"[-] Network Exception during API call: {str(e)}")

if __name__ == "__main__":
    generate_digital_dollars_intro()

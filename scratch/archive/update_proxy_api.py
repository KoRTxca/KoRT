import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Modifying proxy_api.py to use direct HTTP POST for maximum stability and speed...")
code = """import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

API_KEY_PATH = "/opt/kort/secrets/gemini_api_key.txt"

app = FastAPI(title="KoRT Sovereign Token Proxy")

# Load free Gemini API key globally
api_key = None
if os.path.exists(API_KEY_PATH):
    try:
        with open(API_KEY_PATH) as f:
            api_key = f.read().strip()
        print("Google AI Studio (Free Tier) API key loaded successfully!")
    except Exception as e:
        print(f"Warning: Failed to load Google AI Studio key: {e}")

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""

@app.post("/v1/merlin/chat")
async def merlin_proxy(request: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="Sovereign Bridge Offline: Google AI Studio key missing!")
        
    try:
        # Direct HTTP POST to Gemini 2.5 Flash for maximum speed and zero dependencies
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{
                "parts": [{"text": f"Context: {request.context}\\nUser: {request.prompt}"}]
            }]
        }
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
            
        data = response.json()
        reply_text = data["candidates"][0]["content"]["parts"][0]["text"]
        return {"status": "success", "provider": "ai_studio_direct", "reply": reply_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # V5.0 Directive: Port 8081
    uvicorn.run(app, host="127.0.0.1", port=8081)
"""

# Write code to Xeon
sftp = client.open_sftp()
f = sftp.open('/opt/kort/proxy_api.py', 'w')
f.write(code)
f.close()
sftp.close()

client.close()
print("proxy_api.py updated successfully!")

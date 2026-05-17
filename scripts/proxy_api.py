import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from google.oauth2 import service_account
from google.cloud import aiplatform

# Define path to the JSON key you generated in Step 1
KEY_PATH = "/opt/kort/secrets/kort-ide-proxy.json"
PROJECT_ID = "kort-enterprise-402153"
LOCATION = "us-central1"

app = FastAPI(title="KoRT Sovereign Token Proxy")

# Initialize Vertex AI globally if key exists
if os.path.exists(KEY_PATH):
    credentials = service_account.Credentials.from_service_account_file(KEY_PATH)
    aiplatform.init(project=PROJECT_ID, location=LOCATION, credentials=credentials)
else:
    print("⚠️ MORDRED FLAG: Service account JSON missing!")

class ChatRequest(BaseModel):
    prompt: str
    context: str = ""

@app.post("/v1/merlin/chat")
async def merlin_proxy(request: ChatRequest):
    if not os.path.exists(KEY_PATH):
        raise HTTPException(status_code=500, detail="Enterprise Gateway Offline: Key Missing")
        
    try:
        # Utilizing Gemini 1.5 Pro (Version 5.0 Spec)
        model = aiplatform.GenerativeModel("gemini-1.5-pro") 
        full_prompt = f"Context: {request.context}\nUser: {request.prompt}"
        
        response = model.generate_content(full_prompt)
        return {"status": "success", "reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # V5.0 Directive: Port 8080
    uvicorn.run(app, host="127.0.0.1", port=8080)

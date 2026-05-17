import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://api.kortx.ca/v1/merlin/chat"
payload = {
    "prompt": "Hello Merlin, say 'KORT TRIAGE ONLINE' if you hear me.",
    "context": "System verification test",
    "model": "gemini-2.5-flash"
}

print(f"Sending test request to {URL} with verify=False...")
try:
    r = requests.post(URL, json=payload, verify=False, timeout=15)
    print(f"Status Code: {r.status_code}")
    print("Response JSON:")
    print(r.json())
except Exception as e:
    print(f"Error: {e}")

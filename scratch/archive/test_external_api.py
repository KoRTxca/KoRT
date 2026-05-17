import requests

url = "https://api.kortx.ca/api/v1/v1/merlin/chat"
headers = {"Content-Type": "application/json"}
payload = {
    "prompt": "Hello Merlin, are you online and listening?",
    "context": "External Verification"
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error connecting to external API:", e)

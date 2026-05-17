import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = "https://104.219.251.218/api/v1/v1/merlin/chat"
headers = {
    "Content-Type": "application/json",
    "Host": "api.kortx.ca"
}
payload = {
    "prompt": "Hello Merlin, represent the sovereignty of KoRT!",
    "context": "External Direct IP Verification"
}

print(f"Sending request directly to {url} with Host header...")
try:
    response = requests.post(url, json=payload, headers=headers, verify=False, timeout=10)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error connecting to external API via IP:", e)

from apify_client import ApifyClient
import os
from dotenv import load_dotenv

load_dotenv()

# KORT_OS: SCRIBE HARVESTER PROTOCOL
# This script uses Apify to crawl Google Places for leads, partners, and business tactical data.

# Configuration
API_TOKEN = os.getenv("APIFY_API_TOKEN", "<YOUR_API_TOKEN>")
SEARCH_QUERIES = ["ramen"] # Replace with target keywords (e.g., "legal aid", "tenancy advocacy")
LOCATION = "New York, USA" # Replace with "British Columbia, Canada" or specific cities
MAX_PLACES = 10

if API_TOKEN == "<YOUR_API_TOKEN>":
    print("⚠️ WARNING: API Token missing. Please set APIFY_API_TOKEN in your .env file.")

apify_client = ApifyClient(API_TOKEN)

# Define the input for the Actor
actor_input = {
    "searchStringsArray": SEARCH_QUERIES,
    "locationQuery": LOCATION,
    "maxCrawledPlacesPerSearch": MAX_PLACES,
    "language": "en",
}

def run_harvester():
    print(f"🚀 Running The Scribe Harvester for: {SEARCH_QUERIES} in {LOCATION}...")
    try:
        actor_run = apify_client.actor('compass/crawler-google-places').start(run_input=actor_input)
        print("✅ Harvester initiated successfully.")
        print(f"💾 Monitor the extraction here: https://console.apify.com/actors/runs/{actor_run['id']}")
        return actor_run
    except Exception as e:
        print(f"❌ Harvester Failure: {e}")
        return None

if __name__ == "__main__":
    run_harvester()

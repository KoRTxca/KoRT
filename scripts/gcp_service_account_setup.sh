#!/bin/bash
# Run this in Google Cloud Shell or local terminal authenticated with kort@drt.onl
export PROJECT_ID="kort-enterprise-402153"
export SA_NAME="kort-ide-proxy"

gcloud config set project $PROJECT_ID
gcloud iam service-accounts create $SA_NAME --display-name="KoRT IDE Sovereign Proxy"
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
gcloud iam service-accounts keys create /opt/kort/secrets/kort-ide-proxy.json \
  --iam-account="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"
echo "✅ KEY GENERATED: Move /opt/kort/secrets/kort-ide-proxy.json to the Xeon server."

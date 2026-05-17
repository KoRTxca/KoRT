#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merlin AI integration — connects to the Merlin Proxy on Xeon."""

import json
import urllib.request
import urllib.error
from koRT_claw.config import MERLIN_PROXY


class MerlinAI:
    """Interfaces with the Merlin AI proxy for text-based AI operations."""

    def __init__(self):
        self.base_url = MERLIN_PROXY

    def query(self, prompt, system_prompt=None):
        """Send a query to Merlin AI and return the response."""
        payload = {
            "prompt": prompt,
            "system": system_prompt or "You are Merlin, the KoRT Sovereign AI assistant.",
        }
        try:
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                f"{self.base_url}/v1/chat/completions",
                data=data,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read().decode("utf-8"))
            return self._extract_response(result)
        except urllib.error.URLError as e:
            return f"[Merlin Proxy unreachable] {str(e)}"
        except Exception as e:
            return f"[Merlin Error] {str(e)}"

    def health_check(self):
        """Check Merlin proxy health."""
        try:
            req = urllib.request.Request(f"{self.base_url}/health")
            with urllib.request.urlopen(req, timeout=5) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            return {"status": "error", "detail": str(e)}

    def _extract_response(self, result):
        """Extract text from various response formats."""
        if isinstance(result, dict):
            if "choices" in result:
                return result["choices"][0].get("message", {}).get("content", "")
            if "response" in result:
                return result["response"]
            if "text" in result:
                return result["text"]
        return json.dumps(result, indent=2)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KoRT Claw GUI server — serves the branded web interface."""

import http.server
import json
import os
import subprocess
import sys
import threading
import webbrowser
from pathlib import Path

GUI_DIR = Path(__file__).parent


class ClawAPIHandler(http.server.BaseHTTPRequestHandler):
    """Handles API requests from the Claw GUI."""

    def do_GET(self):
        if self.path == "/api/status":
            self._json({"status": "online", "version": "2.0.0"})
        elif self.path == "/api/workers":
            self._json({
                "workers": ["discovery", "import", "refactor", "deploy", "docs", "logs"],
                "ai": ["merlin", "roundtable", "voice"],
            })
        elif self.path.startswith("/api/run/"):
            parts = self.path.split("/")
            if len(parts) >= 4:
                worker = parts[3]
                action = parts[4] if len(parts) > 4 else "status"
                result = self._run_worker(worker, action)
                self._json(result)
            else:
                self._json({"error": "Invalid path"})
        else:
            self._serve_file(self.path)

    def do_POST(self):
        if self.path == "/api/ai":
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
            from koRT_claw.integrations.merlin_ai import MerlinAI
            ai = MerlinAI()
            response = ai.query(body.get("prompt", ""), body.get("system"))
            self._json({"response": response})
        else:
            self._json({"error": "Not found"}, 404)

    def _run_worker(self, worker, action):
        try:
            root = str(Path(__file__).parents[2])
            env = os.environ.copy()
            env["PYTHONPATH"] = root
            cmd = [sys.executable, "-m", "koRT_claw.cli", "run", worker, action]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30, cwd=root, env=env)
            if result.stdout:
                try:
                    return json.loads(result.stdout)
                except json.JSONDecodeError:
                    return {"output": result.stdout}
            return {"error": result.stderr or "No output"}
        except subprocess.TimeoutExpired:
            return {"error": "Worker timed out (30s limit)"}
        except Exception as e:
            return {"error": str(e)}

    def _serve_file(self, path):
        if path == "/" or path == "/index.html":
            filepath = GUI_DIR / "index.html"
        else:
            filepath = GUI_DIR / path.lstrip("/")
        if filepath.exists() and filepath.is_file():
            self.send_response(200)
            ext = filepath.suffix
            content_types = {".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".png": "image/png", ".ico": "image/x-icon"}
            self.send_header("Content-Type", content_types.get(ext, "text/plain"))
            self.end_headers()
            with open(filepath, "rb") as f:
                self.wfile.write(f.read())
        else:
            self._json({"error": "Not found"}, 404)

    def _json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def log_message(self, format, *args):
        pass  # Suppress default logging


def launch_gui(port=8070):
    """Launch the KoRT Claw GUI in a browser."""
    server = http.server.HTTPServer(("127.0.0.1", port), ClawAPIHandler)
    url = f"http://127.0.0.1:{port}"
    print(f"KoRT Claw GUI launching at {url}")
    threading.Timer(1.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nGUI server stopped.")
        server.shutdown()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8070
    launch_gui(port)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Discovery worker — scans KoRT ecosystem for resources, services, and nodes."""

import os
import socket
from pathlib import Path
from koRT_claw.config import KORT_ROOT, XEON_IP, KAMATERA_IP, MERLIN_PROXY


class DiscoveryWorker:
    """Discovers and inventories KoRT ecosystem components."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "nodes": self._discover_nodes,
            "services": self._discover_services,
            "files": self._discover_files,
            "dns": self._discover_dns,
            "full": self._discover_full,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _discover_nodes(self, params):
        nodes = {
            "xeon": {
                "ip": XEON_IP,
                "role": "Primary Forge / API Gateway",
                "status": self._check_host(XEON_IP),
            },
            "kamatera": {
                "ip": KAMATERA_IP,
                "role": "CDN / Failover Mirror",
                "status": self._check_host(KAMATERA_IP),
            },
        }
        return {"nodes": nodes, "count": len(nodes)}

    def _discover_services(self, params):
        services = {
            "merlin_proxy": {"url": MERLIN_PROXY, "status": self._check_url(MERLIN_PROXY + "/health")},
            "nginx_xeon": {"host": XEON_IP, "port": 443, "status": self._check_port(XEON_IP, 443)},
            "nginx_kamatera": {"host": KAMATERA_IP, "port": 443, "status": self._check_port(KAMATERA_IP, 443)},
        }
        return {"services": services, "count": len(services)}

    def _discover_files(self, params):
        target = params[0] if params else str(KORT_ROOT)
        path = Path(target)
        if not path.exists():
            return {"error": f"Path not found: {target}"}
        files = []
        for p in path.rglob("*"):
            if p.is_file() and not any(x in str(p) for x in (".git", "node_modules", "__pycache__", ".venv")):
                files.append({"path": str(p.relative_to(KORT_ROOT)), "size": p.stat().st_size})
        return {"files": files[:200], "total": len(files), "scanned": str(path)}

    def _discover_dns(self, params):
        domains = [
            "kortx.ca", "api.kortx.ca", "ide.kortx.ca", "sso.kortx.ca",
            "drt.social", "api.drt.social", "drt.onl", "cdn.drt.social",
        ]
        results = {}
        for d in domains:
            try:
                ip = socket.gethostbyname(d)
                results[d] = {"resolved": ip, "status": "OK"}
            except socket.gaierror:
                results[d] = {"resolved": None, "status": "FAIL"}
        return {"dns": results}

    def _discover_full(self, params):
        return {
            "nodes": self._discover_nodes(params),
            "services": self._discover_services(params),
            "dns": self._discover_dns(params),
        }

    def _check_host(self, ip):
        try:
            socket.gethostbyname(ip)
            return "reachable"
        except socket.gaierror:
            return "unreachable"

    def _check_port(self, host, port, timeout=3):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(timeout)
            result = s.connect_ex((host, port))
            s.close()
            return "open" if result == 0 else "closed"
        except Exception:
            return "timeout"

    def _check_url(self, url, timeout=5):
        try:
            import urllib.request
            req = urllib.request.Request(url, method="GET")
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return f"HTTP {resp.status}"
        except Exception as e:
            return f"error: {str(e)[:50]}"

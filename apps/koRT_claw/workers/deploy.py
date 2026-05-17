#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Deploy worker — orchestrates deployments across the KoRT sovereign mesh."""

import subprocess
import json
from pathlib import Path
from datetime import datetime, timezone

from koRT_claw.config import KORT_ROOT, XEON_IP, KAMATERA_IP


class DeployWorker:
    """Manages deployments to Xeon, Kamatera, and Docker services."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "docker": self._deploy_docker,
            "sync": self._deploy_sync,
            "status": self._deploy_status,
            "rollback": self._deploy_rollback,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _deploy_docker(self, params):
        service = params[0] if params else "digital-dollars"
        compose_path = KORT_ROOT / "apps" / service / "docker-compose.yml"
        if not compose_path.exists():
            return {"error": f"Compose file not found: {compose_path}"}
        return {
            "status": "proposal",
            "service": service,
            "compose": str(compose_path),
            "message": "Run 'docker compose up -d --build' to execute",
        }

    def _deploy_sync(self, params):
        target = params[0] if params else "kamatera"
        if target == "kamatera":
            return {
                "status": "proposal",
                "target": KAMATERA_IP,
                "method": "rsync via WireGuard tunnel",
                "message": "Syncs /var/www/drt-social to Kamatera CDN every 15min via cron",
            }
        return {"error": f"Unknown sync target: {target}"}

    def _deploy_status(self, params):
        services = {
            "digital-dollars": {"port": 8099, "compose": "apps/digital-dollars/docker-compose.yml"},
            "merlin-proxy": {"port": 8081, "host": XEON_IP},
            "nginx-xeon": {"port": 443, "host": XEON_IP},
            "nginx-kamatera": {"port": 443, "host": KAMATERA_IP},
        }
        return {"services": services, "timestamp": datetime.now(timezone.utc).isoformat()}

    def _deploy_rollback(self, params):
        if not params:
            return {"error": "Usage: deploy rollback <service_name>"}
        service = params[0]
        backup_dir = KORT_ROOT / "backups" / service
        if not backup_dir.exists():
            return {"error": f"No backups found for {service}"}
        backups = sorted(backup_dir.iterdir(), reverse=True)
        return {
            "status": "available",
            "service": service,
            "latest_backup": str(backups[0]) if backups else "none",
            "message": "Quorum consent required for rollback execution",
        }

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Import worker — ingests data, files, and configs into the KoRT ecosystem."""

import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

from koRT_claw.config import KORT_ROOT


class ImportWorker:
    """Imports external data into KoRT sovereign storage."""

    def execute(self, action, params=None):
        params = params or []
        actions = {
            "file": self._import_file,
            "config": self._import_config,
            "data": self._import_data,
            "backup": self._import_backup,
        }
        handler = actions.get(action)
        if not handler:
            return {"error": f"Unknown action: {action}. Available: {', '.join(actions)}"}
        return handler(params)

    def _import_file(self, params):
        if len(params) < 2:
            return {"error": "Usage: import file <source_path> <destination_dir>"}
        src = Path(params[0])
        dest_dir = Path(params[1])
        if not src.exists():
            return {"error": f"Source not found: {src}"}
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / src.name
        shutil.copy2(src, dest)
        return {"status": "imported", "source": str(src), "destination": str(dest)}

    def _import_config(self, params):
        if not params:
            return {"error": "Usage: import config <config_json_path>"}
        config_path = Path(params[0])
        if not config_path.exists():
            return {"error": f"Config not found: {config_path}"}
        with open(config_path) as f:
            config = json.load(f)
        dest = KORT_ROOT / "config" / f"imported_{config_path.stem}_{datetime.now(timezone.utc).strftime('%Y%m%d')}.json"
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(dest, "w") as f:
            json.dump(config, f, indent=2)
        return {"status": "config_imported", "destination": str(dest), "keys": list(config.keys())}

    def _import_data(self, params):
        if len(params) < 2:
            return {"error": "Usage: import data <source> <sphere_level>"}
        source = params[0]
        sphere = params[1]
        dest = KORT_ROOT / f"Sphere_{sphere}_Data" / "imports"
        dest.mkdir(parents=True, exist_ok=True)
        return {"status": "data_imported", "sphere": sphere, "destination": str(dest)}

    def _import_backup(self, params):
        if not params:
            return {"error": "Usage: import backup <backup_path>"}
        backup = Path(params[0])
        if not backup.exists():
            return {"error": f"Backup not found: {backup}"}
        dest = KORT_ROOT / "backups" / f"restored_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}"
        if backup.is_dir():
            shutil.copytree(backup, dest)
        else:
            dest.mkdir(parents=True, exist_ok=True)
            shutil.copy2(backup, dest / backup.name)
        return {"status": "backup_restored", "destination": str(dest)}

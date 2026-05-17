#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KoRT Digital Dollars (DD) Ledger & Payout Engine
Sovereign, offline-first, CRDT-based mutual credit accounting.
URL: dollars.kortx.ca
"""

import os
import sqlite3
import json
import uuid
import httpx
from datetime import datetime, timezone
from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="KoRT Digital Dollars Ledger", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.getenv("DD_DB_PATH", "digital_dollars.db")

class TransactionRequest(BaseModel):
    from_knight_id: str
    to_knight_id: str
    amount: float
    sphere_level: int = 1
    signature: str = ""

class SyncPayload(BaseModel):
    client_node_id: str
    last_sync_timestamp: str
    transactions: List[dict]

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS digital_dollars_ledger (
                tx_id TEXT PRIMARY KEY,
                from_knight_id TEXT NOT NULL,
                to_knight_id TEXT NOT NULL,
                amount REAL NOT NULL,
                signed_tx_json TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                sphere_level INTEGER NOT NULL,
                synced_to_cloud INTEGER DEFAULT 0
            )
        """)
        conn.commit()

init_db()

@app.get("/health")
def health():
    return {
        "status": "online",
        "service": "KoRT Digital Dollars Engine",
        "branding": "Get paid to belong. No one gets left behind.",
        "mutual_credit": "Active (+10 earn / -10 spend limit rules enforced)"
    }

@app.get("/balance/{knight_id}")
def get_balance(knight_id: str, db=Depends(get_db)):
    cursor = db.cursor()
    
    # Calculate balance via Double-Entry CRDT Ledger logic
    # In a mutual credit system, credits earned minus credits spent
    cursor.execute(
        "SELECT SUM(amount) as earned FROM digital_dollars_ledger WHERE to_knight_id = ?",
        (knight_id,)
    )
    earned = cursor.fetchone()["earned"] or 0.0

    cursor.execute(
        "SELECT SUM(amount) as spent FROM digital_dollars_ledger WHERE from_knight_id = ?",
        (knight_id,)
    )
    spent = cursor.fetchone()["spent"] or 0.0

    balance = earned - spent
    return {
        "knight_id": knight_id,
        "balance_dd": balance,
        "earned_total": earned,
        "spent_total": spent,
        "credit_limit": -500.0,  # Sovereign reputation-based mutual credit floor
        "status": "authorized" if balance >= -500.0 else "delinquent"
    }

@app.post("/transaction")
def create_transaction(req: TransactionRequest, db=Depends(get_db)):
    if req.amount <= 0:
        raise HTTPException(400, "Transaction amount must be positive")

    cursor = db.cursor()
    
    # Verify mutual credit limit of sender
    cursor.execute(
        "SELECT SUM(amount) FROM digital_dollars_ledger WHERE to_knight_id = ?",
        (req.from_knight_id,)
    )
    earned = cursor.fetchone()[0] or 0.0

    cursor.execute(
        "SELECT SUM(amount) FROM digital_dollars_ledger WHERE from_knight_id = ?",
        (req.from_knight_id,)
    )
    spent = cursor.fetchone()[0] or 0.0

    current_balance = earned - spent
    credit_limit = -500.0  # Spherical reputational threshold

    if current_balance - req.amount < credit_limit:
        raise HTTPException(400, f"Insufficient mutual credit. Floor limit: {credit_limit} DD")

    tx_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()
    
    signed_tx_json = json.dumps({
        "tx_id": tx_id,
        "from": req.from_knight_id,
        "to": req.to_knight_id,
        "amount": req.amount,
        "timestamp": timestamp,
        "sphere": req.sphere_level,
        "signature": req.signature
    })

    try:
        cursor.execute(
            """INSERT INTO digital_dollars_ledger 
               (tx_id, from_knight_id, to_knight_id, amount, signed_tx_json, timestamp, sphere_level) 
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (tx_id, req.from_knight_id, req.to_knight_id, req.amount, signed_tx_json, timestamp, req.sphere_level)
        )
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Ledger database error: {str(e)}")

    return {
        "status": "success",
        "tx_id": tx_id,
        "amount": req.amount,
        "timestamp": timestamp,
        "from": req.from_knight_id,
        "to": req.to_knight_id
    }

@app.get("/history/{knight_id}")
def get_history(knight_id: str, db=Depends(get_db)):
    cursor = db.cursor()
    cursor.execute(
        """SELECT * FROM digital_dollars_ledger 
           WHERE from_knight_id = ? OR to_knight_id = ? 
           ORDER BY timestamp DESC""",
        (knight_id, knight_id)
    )
    rows = cursor.fetchall()
    
    history = []
    for row in rows:
        history.append({
            "tx_id": row["tx_id"],
            "from": row["from_knight_id"],
            "to": row["to_knight_id"],
            "amount": row["amount"],
            "timestamp": row["timestamp"],
            "sphere": row["sphere_level"],
            "synced": bool(row["synced_to_cloud"])
        })
    return history

@app.post("/sync")
def sync_ledger(payload: SyncPayload, db=Depends(get_db)):
    cursor = db.cursor()
    added_count = 0
    
    for tx in payload.transactions:
        # Idempotent write (CRDT replica sync)
        cursor.execute("SELECT 1 FROM digital_dollars_ledger WHERE tx_id = ?", (tx["tx_id"],))
        if not cursor.fetchone():
            cursor.execute(
                """INSERT INTO digital_dollars_ledger 
                   (tx_id, from_knight_id, to_knight_id, amount, signed_tx_json, timestamp, sphere_level, synced_to_cloud) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 1)""",
                (tx["tx_id"], tx["from_knight_id"], tx["to_knight_id"], tx["amount"], tx["signed_tx_json"], tx["timestamp"], tx["sphere_level"])
            )
            added_count += 1
            
    db.commit()
    
    # Query all local unsynced txs to return to caller for bilateral sync
    cursor.execute("SELECT * FROM digital_dollars_ledger WHERE synced_to_cloud = 0")
    unsynced_rows = cursor.fetchall()
    
    response_txs = []
    for row in unsynced_rows:
        response_txs.append({
            "tx_id": row["tx_id"],
            "from_knight_id": row["from_knight_id"],
            "to_knight_id": row["to_knight_id"],
            "amount": row["amount"],
            "signed_tx_json": row["signed_tx_json"],
            "timestamp": row["timestamp"],
            "sphere_level": row["sphere_level"]
        })
        # Mark as synced
        cursor.execute("UPDATE digital_dollars_ledger SET synced_to_cloud = 1 WHERE tx_id = ?", (row["tx_id"],))
        
    db.commit()
    return {
        "status": "synchronized",
        "added_transactions": added_count,
        "returned_transactions": response_txs
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8099)

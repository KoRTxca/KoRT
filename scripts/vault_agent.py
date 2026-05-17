import os
import json
from cryptography.fernet import Fernet

class SovereignVault:
    """
    Sovereign Vault Agent foundation.
    Handles encrypted storage of Knight credentials for 'Artificial Lifeform' logins.
    """
    def __init__(self, key_path="vault.key"):
        self.key_path = key_path
        if not os.path.exists(key_path):
            self.key = Fernet.generate_key()
            with open(key_path, "wb") as f:
                f.write(self.key)
        else:
            with open(key_path, "rb") as f:
                self.key = f.read()
        self.cipher = Fernet(self.key)

    def encrypt_credential(self, service, data):
        encrypted = self.cipher.encrypt(json.dumps(data).encode())
        with open(f"{service}.vault", "wb") as f:
            f.write(encrypted)

    def decrypt_credential(self, service):
        if not os.path.exists(f"{service}.vault"):
            return None
        with open(f"{service}.vault", "rb") as f:
            encrypted = f.read()
        return json.loads(self.cipher.decrypt(encrypted).decode())

if __name__ == "__main__":
    vault = SovereignVault()
    print("🛡️ Sovereign Vault Initialized.")
    # Usage: vault.encrypt_credential("vercel", {"token": "..."})

"""
Encryption utilities for secure document storage and handling.
Uses AES-256 for document encryption and Argon2 for key derivation.
"""
import os
from typing import Union
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from base64 import b64encode, b64decode
import secrets

class DocumentEncryption:
    """Handles secure document encryption and decryption."""

    def __init__(self):
        """Initialize encryption with a secure key."""
        self.backend = default_backend()
        # Get encryption key from environment or generate one
        self.master_key = os.getenv('DOCUMENT_ENCRYPTION_KEY',
                                  b64encode(os.urandom(32)).decode('utf-8'))

    def generate_document_key(self) -> tuple:
        """Generate a unique key for document encryption."""
        salt = os.urandom(16)
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=self.backend
        )
        key = kdf.derive(self.master_key.encode())
        return b64encode(key).decode('utf-8'), b64encode(salt).decode('utf-8')

    def encrypt_document(self, document_data: bytes) -> tuple:
        """
        Encrypt document data using AES-256.

        Args:
            document_data: Raw document data to encrypt

        Returns:
            tuple: (encrypted_data, key, iv) - all base64 encoded
        """
        key, salt = self.generate_document_key()
        iv = os.urandom(16)
        cipher = Cipher(
            algorithms.AES(b64decode(key)),
            modes.CBC(iv),
            backend=self.backend
        )
        encryptor = cipher.encryptor()

        # Pad the data
        padder = self._pad_data(document_data)
        encrypted_data = encryptor.update(padder) + encryptor.finalize()

        return (
            b64encode(encrypted_data).decode('utf-8'),
            key,
            b64encode(iv).decode('utf-8'),
            salt
        )

    def decrypt_document(self, encrypted_data: str, key: str, iv: str) -> bytes:
        """
        Decrypt document data.

        Args:
            encrypted_data: Base64 encoded encrypted data
            key: Base64 encoded encryption key
            iv: Base64 encoded initialization vector

        Returns:
            bytes: Decrypted document data
        """
        cipher = Cipher(
            algorithms.AES(b64decode(key)),
            modes.CBC(b64decode(iv)),
            backend=self.backend
        )
        decryptor = cipher.decryptor()
        decrypted_data = decryptor.update(b64decode(encrypted_data))
        decrypted_data += decryptor.finalize()

        # Remove padding
        return self._unpad_data(decrypted_data)

    def _pad_data(self, data: bytes) -> bytes:
        """Add PKCS7 padding to data."""
        block_size = algorithms.AES.block_size // 8
        padding_length = block_size - (len(data) % block_size)
        padding = bytes([padding_length] * padding_length)
        return data + padding

    def _unpad_data(self, data: bytes) -> bytes:
        """Remove PKCS7 padding from data."""
        padding_length = data[-1]
        return data[:-padding_length]

class DocumentHasher:
    """Handles secure document hashing for verification."""

    @staticmethod
    def hash_document(document_data: bytes) -> str:
        """
        Create a secure hash of document data for verification.

        Args:
            document_data: Raw document data to hash

        Returns:
            str: Base64 encoded hash
        """
        hasher = hashes.Hash(hashes.SHA256(), backend=default_backend())
        hasher.update(document_data)
        return b64encode(hasher.finalize()).decode('utf-8')

    @staticmethod
    def verify_document_hash(document_data: bytes, stored_hash: str) -> bool:
        """
        Verify document hasn't been tampered with.

        Args:
            document_data: Raw document data to verify
            stored_hash: Previously stored hash to compare against

        Returns:
            bool: True if document is valid
        """
        current_hash = DocumentHasher.hash_document(document_data)
        return secrets.compare_digest(current_hash, stored_hash)

# General-purpose encryption functions for credential management
def get_encryption_key() -> bytes:
    """Get or generate encryption key."""
    key = os.getenv('ENCRYPTION_KEY')
    if not key:
        key = Fernet.generate_key()
        os.environ['ENCRYPTION_KEY'] = key.decode()
    return key.encode() if isinstance(key, str) else key

def encrypt_data(data: Union[str, bytes]) -> str:
    """
    Encrypt data using Fernet symmetric encryption.

    Args:
        data: String or bytes to encrypt

    Returns:
        Encrypted data as base64 string
    """
    if isinstance(data, str):
        data = data.encode()

    f = Fernet(get_encryption_key())
    encrypted_data = f.encrypt(data)
    return b64encode(encrypted_data).decode()

def decrypt_data(encrypted_data: str) -> str:
    """
    Decrypt Fernet-encrypted data.

    Args:
        encrypted_data: Base64-encoded encrypted string

    Returns:
        Decrypted string
    """
    try:
        encrypted_bytes = b64decode(encrypted_data.encode())
        f = Fernet(get_encryption_key())
        decrypted_data = f.decrypt(encrypted_bytes)
        return decrypted_data.decode()
    except Exception as e:
        raise ValueError(f"Failed to decrypt data: {str(e)}")

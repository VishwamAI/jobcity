"""
Base document validator implementation with OCR processing.
"""
from abc import ABC, abstractmethod
import pytesseract
from PIL import Image
import io
import re
from typing import Optional, Dict, Any, Tuple
from datetime import datetime
import logging
from .encryption import DocumentEncryption, DocumentHasher
from .models import DocumentStatus, VerifiedDocument

logger = logging.getLogger(__name__)

class DocumentValidator(ABC):
    """Abstract base class for document validation."""

    def __init__(self):
        """Initialize validator with encryption utilities."""
        self.encryption = DocumentEncryption()
        self.hasher = DocumentHasher()

    async def validate_document(self, document_data: bytes, metadata: Dict[str, Any]) -> Tuple[bool, str, Dict[str, Any]]:
        """
        Validate a document using OCR and specific validation rules.

        Args:
            document_data: Raw document image data
            metadata: Additional document metadata

        Returns:
            Tuple[bool, str, Dict]: (is_valid, message, extracted_data)
        """
        try:
            # Convert bytes to image
            image = Image.open(io.BytesIO(document_data))

            # Extract text using OCR
            extracted_text = pytesseract.image_to_string(image)

            # Clean up extracted text
            cleaned_text = self._clean_text(extracted_text)

            # Extract document fields
            extracted_data = self._extract_fields(cleaned_text)

            # Validate extracted data
            is_valid, message = await self._validate_extracted_data(extracted_data, metadata)

            if is_valid:
                # Additional security checks
                security_valid, security_msg = self._perform_security_checks(extracted_data)
                if not security_valid:
                    return False, security_msg, {}

                # Format validation result
                validation_result = self._format_validation_result(extracted_data)
                return True, "Document validated successfully", validation_result

            return False, message, {}

        except Exception as e:
            logger.error(f"Document validation error: {str(e)}")
            return False, f"Validation error: {str(e)}", {}
        finally:
            # Ensure image is closed
            if 'image' in locals():
                image.close()

    def prepare_document_storage(self, document_data: bytes, validation_result: Dict[str, Any]) -> VerifiedDocument:
        """
        Prepare document for secure storage.

        Args:
            document_data: Raw document data
            validation_result: Extracted and validated document data

        Returns:
            VerifiedDocument: Database model instance
        """
        # Encrypt document data
        encrypted_data, key, iv, salt = self.encryption.encrypt_document(document_data)

        # Hash original document for verification
        document_hash = self.hasher.hash_document(document_data)

        # Create document record
        document = VerifiedDocument(
            document_type=self.get_document_type(),
            document_hash=document_hash,
            encryption_key=key,
            encryption_iv=iv,
            encryption_salt=salt,
            status=DocumentStatus.PENDING.value,
            verification_method="OCR",
            metadata_encrypted=self.encryption.encrypt_document(
                str(validation_result).encode()
            )[0]
        )

        return document

    @abstractmethod
    def get_document_type(self) -> str:
        """Return the type of document this validator handles."""
        pass

    @abstractmethod
    async def _validate_extracted_data(self, extracted_data: Dict[str, Any], metadata: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Validate extracted document data against specific rules.

        Args:
            extracted_data: Data extracted from document
            metadata: Additional validation metadata

        Returns:
            Tuple[bool, str]: (is_valid, message)
        """
        pass

    @abstractmethod
    def _extract_fields(self, text: str) -> Dict[str, Any]:
        """
        Extract relevant fields from OCR text.

        Args:
            text: Cleaned OCR text

        Returns:
            Dict[str, Any]: Extracted fields
        """
        pass

    def _clean_text(self, text: str) -> str:
        """Clean OCR extracted text."""
        # Remove extra whitespace
        text = ' '.join(text.split())
        # Remove special characters
        text = re.sub(r'[^\w\s-]', '', text)
        return text

    def _perform_security_checks(self, extracted_data: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Perform additional security checks on extracted data.

        Args:
            extracted_data: Extracted document data

        Returns:
            Tuple[bool, str]: (is_valid, message)
        """
        # Check for required fields
        if not extracted_data:
            return False, "No data could be extracted from document"

        # Check expiration if applicable
        expiration_date = extracted_data.get('expiration_date')
        if expiration_date and isinstance(expiration_date, datetime):
            if expiration_date < datetime.utcnow():
                return False, "Document has expired"

        return True, "Security checks passed"

    def _format_validation_result(self, extracted_data: Dict[str, Any]) -> Dict[str, Any]:
        """Format extracted data for storage."""
        return {
            'document_type': self.get_document_type(),
            'validation_timestamp': datetime.utcnow().isoformat(),
            'extracted_data': extracted_data
        }

    def _validate_image_quality(self, image: Image) -> Tuple[bool, str]:
        """
        Validate image quality for OCR processing.

        Args:
            image: PIL Image object

        Returns:
            Tuple[bool, str]: (is_valid, message)
        """
        min_width = 1000
        min_height = 1000

        if image.width < min_width or image.height < min_height:
            return False, f"Image resolution too low. Minimum {min_width}x{min_height} required"

        # Convert to grayscale for analysis
        gray_image = image.convert('L')

        # Check image brightness and contrast
        pixels = list(gray_image.getdata())
        avg_brightness = sum(pixels) / len(pixels)
        if avg_brightness < 50 or avg_brightness > 200:
            return False, "Image too dark or too bright for accurate processing"

        return True, "Image quality acceptable"

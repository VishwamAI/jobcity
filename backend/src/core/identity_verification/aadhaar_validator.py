"""
Aadhaar card validation implementation.
"""
from typing import Dict, Any, Tuple
import re
from datetime import datetime
from .document_validator import DocumentValidator
import logging

logger = logging.getLogger(__name__)

class AadhaarValidator(DocumentValidator):
    """Validator for Aadhaar cards."""

    def get_document_type(self) -> str:
        """Return document type."""
        return "AADHAAR"

    async def _validate_extracted_data(self, extracted_data: Dict[str, Any], metadata: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Validate extracted Aadhaar data.

        Args:
            extracted_data: Data extracted from document
            metadata: Additional validation metadata

        Returns:
            Tuple[bool, str]: (is_valid, message)
        """
        # Check required fields
        required_fields = ['aadhaar_number', 'name', 'dob', 'gender']
        for field in required_fields:
            if field not in extracted_data:
                return False, f"Missing required field: {field}"

        # Validate Aadhaar number format
        if not self._validate_aadhaar_number(extracted_data['aadhaar_number']):
            return False, "Invalid Aadhaar number format"

        # Validate name
        if not self._validate_name(extracted_data['name']):
            return False, "Invalid name format"

        # Validate date of birth
        if not self._validate_dob(extracted_data['dob']):
            return False, "Invalid date of birth"

        # Validate gender
        if not self._validate_gender(extracted_data['gender']):
            return False, "Invalid gender value"

        # Verify against provided metadata
        if not self._verify_metadata_match(extracted_data, metadata):
            return False, "Document data doesn't match provided metadata"

        return True, "All validations passed"

    def _extract_fields(self, text: str) -> Dict[str, Any]:
        """
        Extract Aadhaar card fields from OCR text.

        Args:
            text: Cleaned OCR text

        Returns:
            Dict[str, Any]: Extracted fields
        """
        extracted_data = {}

        # Extract Aadhaar number (12 digits)
        aadhaar_match = re.search(r'\b\d{4}\s?\d{4}\s?\d{4}\b', text)
        if aadhaar_match:
            extracted_data['aadhaar_number'] = aadhaar_match.group().replace(' ', '')

        # Extract name (usually after "Name:" or similar)
        name_match = re.search(r'(?:Name|नाम)[\s:]+([A-Za-z\s]+)', text, re.IGNORECASE)
        if name_match:
            extracted_data['name'] = name_match.group(1).strip()

        # Extract DOB (in various formats)
        dob_match = re.search(
            r'(?:DOB|Date of Birth|जन्म तिथि)[\s:]+(\d{2}[-/]\d{2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})',
            text,
            re.IGNORECASE
        )
        if dob_match:
            extracted_data['dob'] = self._parse_date(dob_match.group(1))

        # Extract gender
        gender_match = re.search(r'(?:Gender|लिंग)[\s:]+([A-Za-z]+)', text, re.IGNORECASE)
        if gender_match:
            extracted_data['gender'] = gender_match.group(1).strip().upper()

        return extracted_data

    def _validate_aadhaar_number(self, number: str) -> bool:
        """
        Validate Aadhaar number using Verhoeff algorithm.

        Args:
            number: Aadhaar number to validate

        Returns:
            bool: True if valid
        """
        if not re.match(r'^\d{12}$', number):
            return False

        # Verhoeff algorithm implementation
        mult = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
                [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
                [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
                [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
                [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
                [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
                [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
                [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
                [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]
        perm = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]
        inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9]

        check = 0
        for i, d in enumerate(reversed(number)):
            check = mult[check][perm[i % 8][int(d)]]
        return check == 0

    def _validate_name(self, name: str) -> bool:
        """Validate name format."""
        if not name:
            return False
        # Check for minimum length and valid characters
        return bool(re.match(r'^[A-Za-z\s]{3,50}$', name))

    def _validate_dob(self, dob: datetime) -> bool:
        """Validate date of birth."""
        if not isinstance(dob, datetime):
            return False
        # Check if date is not in future and person is not too old
        now = datetime.utcnow()
        age = now.year - dob.year - ((now.month, now.day) < (dob.month, dob.day))
        return 0 <= age <= 120

    def _validate_gender(self, gender: str) -> bool:
        """Validate gender value."""
        return gender.upper() in ['MALE', 'FEMALE', 'TRANSGENDER']

    def _verify_metadata_match(self, extracted_data: Dict[str, Any], metadata: Dict[str, Any]) -> bool:
        """Verify extracted data matches provided metadata."""
        if not metadata:
            return True

        # Check name match if provided
        if 'name' in metadata and metadata['name'].lower() != extracted_data['name'].lower():
            return False

        # Check DOB match if provided
        if 'dob' in metadata:
            metadata_dob = self._parse_date(metadata['dob'])
            if metadata_dob != extracted_data['dob']:
                return False

        return True

    def _parse_date(self, date_str: str) -> datetime:
        """Parse date string to datetime object."""
        try:
            # Try different date formats
            for fmt in ('%d-%m-%Y', '%Y-%m-%d', '%d/%m/%Y', '%Y/%m/%d'):
                try:
                    return datetime.strptime(date_str, fmt)
                except ValueError:
                    continue
            raise ValueError("Invalid date format")
        except Exception as e:
            logger.error(f"Date parsing error: {str(e)}")
            return None

"""
Passport validation implementation.
"""
from typing import Dict, Any, Tuple
import re
from datetime import datetime
from .document_validator import DocumentValidator
import logging
import pycountry

logger = logging.getLogger(__name__)

class PassportValidator(DocumentValidator):
    """Validator for international passports."""

    def get_document_type(self) -> str:
        """Return document type."""
        return "PASSPORT"

    async def _validate_extracted_data(self, extracted_data: Dict[str, Any], metadata: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Validate extracted passport data.

        Args:
            extracted_data: Data extracted from document
            metadata: Additional validation metadata

        Returns:
            Tuple[bool, str]: (is_valid, message)
        """
        # Check required fields
        required_fields = ['passport_number', 'name', 'surname', 'nationality', 'dob', 'expiry_date', 'gender']
        for field in required_fields:
            if field not in extracted_data:
                return False, f"Missing required field: {field}"

        # Validate passport number
        if not self._validate_passport_number(extracted_data['passport_number']):
            return False, "Invalid passport number format"

        # Validate name and surname
        if not self._validate_name(extracted_data['name']) or not self._validate_name(extracted_data['surname']):
            return False, "Invalid name or surname format"

        # Validate nationality
        if not self._validate_nationality(extracted_data['nationality']):
            return False, "Invalid nationality"

        # Validate dates
        if not self._validate_dates(extracted_data['dob'], extracted_data['expiry_date']):
            return False, "Invalid date format or expired passport"

        # Validate gender
        if not self._validate_gender(extracted_data['gender']):
            return False, "Invalid gender value"

        # Verify against provided metadata
        if not self._verify_metadata_match(extracted_data, metadata):
            return False, "Document data doesn't match provided metadata"

        return True, "All validations passed"

    def _extract_fields(self, text: str) -> Dict[str, Any]:
        """
        Extract passport fields from OCR text.

        Args:
            text: Cleaned OCR text

        Returns:
            Dict[str, Any]: Extracted fields
        """
        extracted_data = {}

        # Extract passport number (usually after "Passport No" or similar)
        passport_match = re.search(r'(?:Passport No|No|Number)[\s.:]+([A-Z0-9]{6,12})', text, re.IGNORECASE)
        if passport_match:
            extracted_data['passport_number'] = passport_match.group(1).strip()

        # Extract surname (usually after "Surname" or similar)
        surname_match = re.search(r'(?:Surname|Last Name)[\s.:]+([A-Za-z\s]+)', text, re.IGNORECASE)
        if surname_match:
            extracted_data['surname'] = surname_match.group(1).strip()

        # Extract given names
        name_match = re.search(r'(?:Given Names|First Name)[\s.:]+([A-Za-z\s]+)', text, re.IGNORECASE)
        if name_match:
            extracted_data['name'] = name_match.group(1).strip()

        # Extract nationality
        nationality_match = re.search(r'(?:Nationality|Nation)[\s.:]+([A-Za-z\s]+)', text, re.IGNORECASE)
        if nationality_match:
            extracted_data['nationality'] = nationality_match.group(1).strip()

        # Extract dates (DOB and expiry)
        dob_match = re.search(
            r'(?:Date of Birth|Birth Date|DOB)[\s.:]+(\d{2}[-/]\d{2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})',
            text,
            re.IGNORECASE
        )
        if dob_match:
            extracted_data['dob'] = self._parse_date(dob_match.group(1))

        expiry_match = re.search(
            r'(?:Date of Expiry|Expiry Date|EXP)[\s.:]+(\d{2}[-/]\d{2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})',
            text,
            re.IGNORECASE
        )
        if expiry_match:
            extracted_data['expiry_date'] = self._parse_date(expiry_match.group(1))

        # Extract gender
        gender_match = re.search(r'(?:Sex|Gender)[\s.:]+([MF]|MALE|FEMALE)', text, re.IGNORECASE)
        if gender_match:
            extracted_data['gender'] = gender_match.group(1).strip().upper()

        # Extract MRZ (Machine Readable Zone)
        mrz_lines = self._extract_mrz(text)
        if mrz_lines:
            self._parse_mrz(mrz_lines, extracted_data)

        return extracted_data

    def _validate_passport_number(self, number: str) -> bool:
        """Validate passport number format."""
        # Most passport numbers are 6-12 characters, alphanumeric
        return bool(re.match(r'^[A-Z0-9]{6,12}$', number))

    def _validate_name(self, name: str) -> bool:
        """Validate name format."""
        if not name:
            return False
        # Check for minimum length and valid characters (including hyphens and apostrophes)
        return bool(re.match(r"^[A-Za-z\s'-]{2,50}$", name))

    def _validate_nationality(self, nationality: str) -> bool:
        """Validate nationality against ISO country codes."""
        try:
            return bool(pycountry.countries.search_fuzzy(nationality))
        except LookupError:
            return False

    def _validate_dates(self, dob: datetime, expiry_date: datetime) -> bool:
        """Validate date of birth and expiry date."""
        if not isinstance(dob, datetime) or not isinstance(expiry_date, datetime):
            return False

        now = datetime.utcnow()

        # Check if DOB is valid (not in future and not too old)
        age = now.year - dob.year - ((now.month, now.day) < (dob.month, dob.day))
        if not (0 <= age <= 120):
            return False

        # Check if passport is not expired
        return expiry_date > now

    def _validate_gender(self, gender: str) -> bool:
        """Validate gender value."""
        return gender.upper() in ['M', 'F', 'MALE', 'FEMALE']

    def _verify_metadata_match(self, extracted_data: Dict[str, Any], metadata: Dict[str, Any]) -> bool:
        """Verify extracted data matches provided metadata."""
        if not metadata:
            return True

        # Check name match if provided
        if 'name' in metadata:
            if metadata['name'].lower() != f"{extracted_data['name']} {extracted_data['surname']}".lower():
                return False

        # Check passport number match if provided
        if 'passport_number' in metadata:
            if metadata['passport_number'] != extracted_data['passport_number']:
                return False

        # Check DOB match if provided
        if 'dob' in metadata:
            metadata_dob = self._parse_date(metadata['dob'])
            if metadata_dob != extracted_data['dob']:
                return False

        return True

    def _extract_mrz(self, text: str) -> list:
        """Extract Machine Readable Zone lines."""
        # MRZ consists of 2 or 3 lines of 44 characters each
        mrz_pattern = r'[A-Z0-9<]{44}'
        matches = re.findall(mrz_pattern, text)
        return matches if len(matches) in [2, 3] else None

    def _parse_mrz(self, mrz_lines: list, extracted_data: Dict[str, Any]) -> None:
        """Parse MRZ data and update extracted data."""
        if len(mrz_lines) < 2:
            return

        # Parse first line (document type, issuing country, surname, given names)
        if len(mrz_lines[0]) >= 44:
            extracted_data['document_type'] = mrz_lines[0][0:2].strip('<')
            extracted_data['issuing_country'] = mrz_lines[0][2:5].strip('<')

        # Parse second line (passport number, nationality, dob, gender, expiry date)
        if len(mrz_lines[1]) >= 44:
            extracted_data['passport_number'] = mrz_lines[1][0:9].strip('<')
            extracted_data['nationality'] = mrz_lines[1][10:13].strip('<')

            # Parse DOB (YYMMDD format)
            dob_str = mrz_lines[1][13:19]
            try:
                year = int(dob_str[:2])
                month = int(dob_str[2:4])
                day = int(dob_str[4:])
                # Assume 20xx for years 00-99
                year = 2000 + year if year < 50 else 1900 + year
                extracted_data['dob'] = datetime(year, month, day)
            except ValueError:
                pass

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

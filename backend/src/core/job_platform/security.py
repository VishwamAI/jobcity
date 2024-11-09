"""
Security module for job platform integrations.
Handles verification checks, rate limiting, and secure credential management.
"""
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import logging
from fastapi import HTTPException, status
from redis import Redis
from sqlalchemy.orm import Session

from ..auth.models import User
from ..identity_verification.models import VerifiedDocument
from ..database import get_db

logger = logging.getLogger(__name__)

class JobPlatformSecurity:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
        self.rate_limit_window = 3600  # 1 hour
        self.max_applications_per_hour = 20
        self.platform_timeouts = {
            'linkedin': 5,  # seconds between requests
            'indeed': 3,
            'google': 4
        }

    async def verify_user_documents(self, user_id: int, db: Session) -> bool:
        """
        Verify that the user has valid identity documents before allowing job applications.
        """
        verified_docs = db.query(VerifiedDocument).filter(
            VerifiedDocument.user_id == user_id,
            VerifiedDocument.status == 'verified',
            VerifiedDocument.expiry_date > datetime.utcnow()
        ).first()

        if not verified_docs:
            logger.warning(f"User {user_id} attempted to apply without verified documents")
            return False

        return True

    async def check_rate_limit(self, user_id: int, platform: str) -> bool:
        """
        Check if the user has exceeded their rate limit for job applications.
        Implements platform-specific rate limiting.
        """
        # Global application rate limit
        global_key = f"job_applications:{user_id}"
        current_count = self.redis.get(global_key)

        if current_count is None:
            self.redis.setex(global_key, self.rate_limit_window, 1)
        else:
            count = int(current_count)
            if count >= self.max_applications_per_hour:
                logger.warning(f"User {user_id} exceeded global rate limit")
                return False
            self.redis.incr(global_key)

        # Platform-specific rate limit
        platform_key = f"platform:{platform}:{user_id}:last_request"
        last_request = self.redis.get(platform_key)

        if last_request:
            time_diff = datetime.utcnow() - datetime.fromtimestamp(float(last_request))
            if time_diff.total_seconds() < self.platform_timeouts.get(platform, 5):
                logger.warning(f"User {user_id} exceeded platform rate limit for {platform}")
                return False

        self.redis.set(platform_key, datetime.utcnow().timestamp())
        return True

    def secure_credentials(self, credentials: Dict[str, Any]) -> Dict[str, Any]:
        """
        Securely handle and validate platform-specific credentials.
        Implements additional security checks and sanitization.
        """
        required_fields = {'email', 'password', 'platform'}
        if not all(field in credentials for field in required_fields):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing required credentials"
            )

        platform = credentials['platform'].lower()
        if platform not in {'linkedin', 'indeed', 'google'}:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported platform"
            )

        # Sanitize and validate email
        email = credentials['email'].strip().lower()
        if not self._validate_email(email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )

        return {
            'platform': platform,
            'email': email,
            'password': credentials['password']  # Password handled by auth system
        }

    def _validate_email(self, email: str) -> bool:
        """Basic email validation"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))

    async def verify_application_eligibility(
        self,
        user_id: int,
        platform: str,
        db: Session
    ) -> bool:
        """
        Comprehensive verification check before allowing job application.
        """
        # Check document verification
        if not await self.verify_user_documents(user_id, db):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User identity not verified"
            )

        # Check rate limits
        if not await self.check_rate_limit(user_id, platform):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded"
            )

        return True

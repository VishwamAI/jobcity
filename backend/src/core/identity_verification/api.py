from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from datetime import datetime
import asyncio

from src.core.database import get_db
from src.core.auth.models import User
from src.core.auth.dependencies import get_current_user
from src.core.identity_verification.models import VerifiedDocument, DocumentStatus
from src.core.identity_verification.document_validator import DocumentValidator
from src.core.identity_verification.aadhaar_validator import AadhaarValidator
from src.core.identity_verification.passport_validator import PassportValidator

router = APIRouter()

# Rate limiting configuration
RATE_LIMIT = 5  # requests
RATE_WINDOW = 300  # seconds
rate_limit_store = {}

def check_rate_limit(user_id: int) -> bool:
    """Check if user has exceeded rate limit."""
    now = datetime.now().timestamp()
    user_requests = rate_limit_store.get(user_id, [])

    # Clean old requests
    user_requests = [ts for ts in user_requests if now - ts < RATE_WINDOW]

    if len(user_requests) >= RATE_LIMIT:
        return False

    user_requests.append(now)
    rate_limit_store[user_id] = user_requests
    return True

@router.get("/status")
async def get_verification_status() -> Dict[str, Any]:
    """Get identity verification system status."""
    return {
        "status": "ready",
        "message": "Identity verification system operational",
        "supported_documents": ["AADHAAR", "PASSPORT"],
        "verification_enabled": True
    }

@router.post("/documents/upload")
async def upload_document(
    document_type: str = Form(...),
    metadata: Dict[str, Any] = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Upload and validate identity document."""
    # Check rate limit
    if not check_rate_limit(current_user.id):
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later."
        )

    # Validate document type
    if document_type not in ["AADHAAR", "PASSPORT"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid document type"
        )

    # Create document record
    document = VerifiedDocument(
        user_id=current_user.id,
        document_type=document_type,
        status=DocumentStatus.PENDING.value,
        upload_date=datetime.now()
    )
    db.add(document)
    db.commit()
    db.refresh(document)

    # Start background verification
    asyncio.create_task(
        perform_background_verification(document.id, metadata, db)
    )

    return JSONResponse(
        status_code=202,
        content={
            "status": "success",
            "message": "Document uploaded and queued for verification",
            "document_id": document.id
        }
    )

@router.get("/documents/{document_id}/status")
async def get_document_status(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get document verification status."""
    document = db.query(VerifiedDocument).filter_by(
        id=document_id,
        user_id=current_user.id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "status": document.status,
        "upload_date": document.upload_date,
        "verification_date": document.verification_date,
        "document_type": document.document_type
    }

async def perform_background_verification(
    document_id: int,
    metadata: Dict[str, Any],
    db: Session
) -> None:
    """Perform background verification of uploaded document."""
    document = db.query(VerifiedDocument).filter_by(id=document_id).first()
    if not document:
        return

    # Select appropriate validator
    validator = None
    if document.document_type == "AADHAAR":
        validator = AadhaarValidator()
    elif document.document_type == "PASSPORT":
        validator = PassportValidator()

    if validator:
        is_valid, message, _ = validator.validate_document(metadata)

        # Update document status
        document.status = (
            DocumentStatus.VERIFIED.value if is_valid
            else DocumentStatus.REJECTED.value
        )
        document.verification_date = datetime.now()
        document.verification_message = message

        db.commit()

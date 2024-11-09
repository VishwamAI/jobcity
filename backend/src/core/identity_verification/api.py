from fastapi import APIRouter, HTTPException
from typing import Dict, Any

router = APIRouter()

@router.get("/status")
async def get_verification_status() -> Dict[str, Any]:
    """
    Get identity verification status
    """
    return {
        "status": "ready",
        "message": "Identity verification system operational",
        "supported_documents": ["aadhaar", "passport"],
        "verification_enabled": True
    }

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

router = APIRouter()

@router.get("/")
async def list_jobs() -> List[Dict[str, Any]]:
    """
    List available jobs
    """
    return [
        {
            "id": 1,
            "title": "Software Engineer",
            "company": "TechCorp",
            "location": "Remote",
            "status": "open"
        },
        {
            "id": 2,
            "title": "Data Scientist",
            "company": "DataCo",
            "location": "New York",
            "status": "open"
        }
    ]

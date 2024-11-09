from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from ..base import Base
import datetime
import enum

class DocumentStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"
    REVOKED = "revoked"

class VerifiedDocument(Base):
    __tablename__ = "verified_documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    document_type = Column(String)
    document_number = Column(String)
    status = Column(SQLEnum(DocumentStatus))
    verification_date = Column(DateTime)
    expiry_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="documents")

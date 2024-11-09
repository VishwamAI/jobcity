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
    audit_logs = relationship("DocumentAuditLog", back_populates="document")
    verification_attempts = relationship("VerificationAttempt", back_populates="document")

class DocumentAuditLog(Base):
    __tablename__ = "document_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("verified_documents.id"))
    action = Column(String)  # e.g., "status_change", "verification_attempt"
    details = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("VerifiedDocument", back_populates="audit_logs")

class VerificationAttempt(Base):
    __tablename__ = "verification_attempts"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("verified_documents.id"))
    attempt_status = Column(String)  # success, failure
    error_message = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    document = relationship("VerifiedDocument", back_populates="verification_attempts")

    def __repr__(self):
        return f"<VerificationAttempt(id={self.id}, status={self.attempt_status})>"

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session

SQLALCHEMY_DATABASE_URL = "postgresql://user_zktribknii:qTg1pIe3pAgjyJOrePWx@devinapps-backend-prod.cluster-clussqewa0rh.us-west-2.rds.amazonaws.com/db_vqyfvbwjgl?sslmode=require"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Session:
    """
    Get database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

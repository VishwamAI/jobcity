from src.core.database import engine, Base, SessionLocal
from sqlalchemy import text
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_database_connection():
    try:
        # Test raw connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            logger.info("Database connection test successful")
            
        # Test session creation
        db = SessionLocal()
        try:
            # Test session query
            result = db.execute(text("SELECT 1"))
            logger.info("Database session test successful")
        finally:
            db.close()
            
        return True
    except Exception as e:
        logger.error(f"Database connection test failed: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_database_connection()
    if success:
        print("All database connection tests passed!")
    else:
        print("Database connection tests failed!")

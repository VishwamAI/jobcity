"""Test script to verify database configuration and table creation."""
import os
import sys
from sqlalchemy import inspect
from src.core.database import init_db, get_engine, Base
from src.core.job_data_model import JobDataModel

def check_db_setup():
    """Check database setup and configuration."""
    # Set testing environment
    os.environ['TESTING'] = 'true'
    
    print("Current Environment:")
    print(f"TESTING={os.environ.get('TESTING')}")
    print(f"DATABASE_URL={os.environ.get('DATABASE_URL', 'Not set')}")
    
    try:
        # Initialize database
        init_db()
        
        # Get engine and inspector
        engine = get_engine()
        inspector = inspect(engine)
        
        # Check tables
        tables = inspector.get_table_names()
        print("\nDatabase Tables:")
        for table in tables:
            print(f"- {table}")
            
        print("\nDatabase setup successful!")
        return True
    except Exception as e:
        print(f"\nError setting up database: {str(e)}")
        return False

if __name__ == "__main__":
    success = check_db_setup()
    sys.exit(0 if success else 1)

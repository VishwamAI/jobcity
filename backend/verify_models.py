from src.core.job_data_model import Base

def verify_models():
    """Verify that SQLAlchemy models can be imported correctly."""
    try:
        print("Models imported successfully")
        print(f"Found tables: {', '.join(Base.metadata.tables.keys())}")
        return True
    except Exception as e:
        print(f"Error importing models: {e}")
        return False

if __name__ == "__main__":
    verify_models()

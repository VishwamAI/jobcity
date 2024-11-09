from logging.config import fileConfig
import os
import sys
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
from dotenv import load_dotenv

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# Load environment variables
load_dotenv()

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import Base and all models to ensure they're registered
from src.core.base import Base
from src.core.auth.models import User, UserSession, SecurityEvent, FailedLoginAttempt, PasswordReset
from src.core.identity_verification.models import VerifiedDocument, DocumentAuditLog, VerificationAttempt

# Set target metadata
target_metadata = Base.metadata

def get_url():
    """Get database URL from environment variables."""
    return os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/jobcity")

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

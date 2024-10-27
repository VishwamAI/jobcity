# Installation Guide for JobCity

## Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Chrome/Chromium browser
- pnpm (for frontend package management)

## Backend Setup

### 1. Environment Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials and settings
```

### 2. Database Setup

#### PostgreSQL Installation and Configuration
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER jobcity WITH PASSWORD 'jobcity';"
sudo -u postgres psql -c "ALTER USER jobcity CREATEDB;"
sudo -u postgres psql -c "CREATE DATABASE jobcity OWNER jobcity;"

# Verify database connection
psql -U jobcity -d jobcity -h localhost -c "\conninfo"
```

#### Database Migration and Setup
```bash
# Run database migrations
alembic upgrade head

# Verify migrations
alembic current
alembic history --verbose

# Optional: Generate test data
python scripts/generate_test_data.py  # If available
```

#### Troubleshooting Database Setup
- If `createdb: error: connection to server failed`, check PostgreSQL service status
- If permission denied, verify user privileges with `\du` in psql
- For migration errors, check alembic version history with `alembic history`

### 3. Development Mode
For local development without Indeed credentials and simplified setup:

1. Configure Development Mode:
```bash
# In backend/.env
DEV_MODE=True
DEBUG=True
MOCK_INDEED_AUTH=True
LOG_LEVEL=DEBUG

# Optional: Test Data Generation
GENERATE_TEST_DATA=True
TEST_DATA_SIZE=50
```

2. Development Features:
- Mock Indeed Authentication (bypasses real Indeed login)
- Auto-generated test job listings
- Enhanced debug logging
- Faster database operations
- Disabled rate limiting
- Mock application submissions

3. Development API Endpoints:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Health Check: http://localhost:8000/health

4. Monitoring Tools:
- Database Status: http://localhost:8000/db-status
- Memory Usage: http://localhost:8000/debug/memory
- Request Logs: Check `logs/development.log`

## Frontend Setup

### 1. Environment Setup
```bash
# Install dependencies using pnpm
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL and settings
```

### 2. Development Server
```bash
# Start development server
pnpm dev
```

## Running the Application

### Backend
```bash
# Start the backend server
uvicorn main:app --reload
```

### Frontend
```bash
# Start the frontend development server
pnpm dev
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists: `createdb jobcity`

2. **Frontend Build Issues**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `pnpm install`
   - Check for Node.js version compatibility

3. **Backend Import Errors**
   - Ensure virtual environment is activated
   - Verify all dependencies are installed
   - Check Python version compatibility

4. **Indeed Authentication Issues**
   - For development, set DEV_MODE=True in .env
   - For production, ensure Indeed credentials are set
   - Check Chrome/Chromium installation

## Development Notes

- Use DEV_MODE=True for local development without Indeed credentials
- Frontend runs on http://localhost:3000 by default
- Backend API runs on http://localhost:8000 by default
- API documentation available at http://localhost:8000/docs

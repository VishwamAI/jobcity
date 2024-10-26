# Installation Guide for Job-City

## Prerequisites

### System Requirements
- Node.js >= 18.0.0
- Python >= 3.8
- Git
- PostgreSQL database
- Chrome/ChromeDriver (for web automation)

### Package Managers
- pnpm (v8.0.0 or higher) for frontend
- Pip for backend

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies using pnpm (required):
```bash
# Install core dependencies
pnpm install

# Install required style dependencies
pnpm add -D style-loader@4.0.0 css-loader@7.1.2 postcss-loader@8.1.1 autoprefixer@10.4.20 tailwindcss@3.4.14
```

3. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WEBSOCKET_URL=ws://localhost:8000/ws
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install system dependencies:
```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
sudo apt-get install -y chromium-chromedriver

# For macOS
brew install postgresql
brew install --cask chromedriver
```

3. Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install Python dependencies:
```bash
pip install --upgrade pip
pip install wheel
pip install -r requirements.txt

# Install NLTK datasets
python -m nltk.downloader punkt stopwords wordnet
python -m nltk.downloader averaged_perceptron_tagger maxent_ne_chunker words

# Verify NLTK installation
python setup_nltk.py  # This will verify all required NLTK datasets are installed

5. Create a `.env` file in the backend directory:
```
DEBUG=True
HOST=0.0.0.0
PORT=8000
DATABASE_URL=postgresql://jobcity:jobcity123@localhost:5432/jobcity
SECRET_KEY=your-secret-key-here
SELENIUM_DRIVER_PATH=/usr/bin/chromedriver
CHROME_BINARY_PATH=/usr/bin/chromium-browser
OPENAI_API_KEY=your-openai-key-here
HUGGINGFACE_API_KEY=your-huggingface-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here
GOOGLE_API_KEY=your-google-key-here
```

Note: You'll need to obtain API keys from:
- OpenAI: https://platform.openai.com/
- HuggingFace: https://huggingface.co/settings/tokens
- Anthropic: https://console.anthropic.com/
- Google AI: https://makersuite.google.com/app/apikey

6. Set up the database:
```bash
# Create database
sudo -u postgres createdb jobcity

# Create database user (if needed)
sudo -u postgres psql -c "CREATE USER jobcity WITH PASSWORD 'jobcity';"
sudo -u postgres psql -c "ALTER USER jobcity WITH SUPERUSER;"

# Run database migrations
cd backend
source venv/bin/activate
alembic upgrade head     # Apply existing migrations

# Verify database connection
python test_db_connection.py  # Should output "All database connection tests passed!"

## Running the Application

### Frontend
```bash
cd frontend
pnpm dev
```
The frontend will be available at http://localhost:3000

### Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API will be available at http://localhost:8000

## Common Issues and Solutions

1. Package Manager Issues:
   - Always use pnpm for frontend, not npm or yarn
   - If you see package manager conflicts, clean up and reinstall:
   ```bash
   rm -rf node_modules package-lock.json yarn.lock
   pnpm install
   ```

2. Node.js Version Issues:
   - Error: "The engine node is incompatible"
   - Solution: Use nvm to install correct Node.js version:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. TypeScript Errors:
   - Install missing type definitions:
   ```bash
   pnpm add -D @types/react@18.2.0 @types/react-dom@18.2.0
   ```

4. Python/Backend Issues:
   - Clean virtual environment: `rm -rf venv && python -m venv venv`
   - Update pip and wheel: `pip install --upgrade pip wheel`
   - Install exact versions: `pip install -r requirements.txt --no-cache-dir`

5. Database Connection Issues:
   - Ensure PostgreSQL is running: `sudo service postgresql start`
   - Check database exists: `sudo -u postgres psql -l`
   - Verify connection string in .env file

6. ChromeDriver Issues:
   - Install Chrome and ChromeDriver:
     ```bash
     # Ubuntu/Debian
     sudo apt-get install -y chromium-browser chromium-chromedriver
     # macOS
     brew install --cask chromium chromedriver
     ```
   - Add to PATH: `export PATH=$PATH:/usr/lib/chromium-browser/`
   - Create Chrome profile directory:
     ```bash
     mkdir -p ~/.config/google-chrome/linkedin_profile
     ```
   - Check installation: `chromedriver --version`
   - Verify Chrome version matches ChromeDriver: `google-chrome --version`
   - Common issues:
     - Permission denied: `sudo chmod +x /usr/lib/chromium-browser/chromedriver`
     - Version mismatch: Download matching version from ChromeDriver website
     - Missing dependencies: `sudo apt-get install -y xvfb libxi6 libgconf-2-4`
   - Verify paths in .env file match your system:
     ```
     SELENIUM_DRIVER_PATH=/usr/lib/chromium-browser/chromedriver
     CHROME_BINARY_PATH=/usr/bin/chromium-browser
     ```

## Development Notes
- The frontend uses Create React App with custom configurations
- TypeScript is used throughout the frontend
- The backend uses FastAPI with various ML and web scraping capabilities
- Both frontend and backend need to be running for full functionality
- Database migrations should be run before starting the backend
- Web scraping features require proper ChromeDriver setup
- Input validation is implemented for numeric fields (e.g., maxApplications: 1-20)

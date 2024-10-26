# Installation Guide for Job-City

## Prerequisites
- Node.js >= 18.0.0
- Python >= 3.8
- Git

## Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8000
SKIP_PREFLIGHT_CHECK=true
```

## Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```
DEBUG=True
HOST=localhost
PORT=8000
```

## Running the Application

### Frontend
```bash
cd frontend
npm start
```
The frontend will be available at http://localhost:3000

### Backend
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API will be available at http://localhost:8000

## Common Issues and Solutions

1. If you encounter Node.js related errors:
   - Make sure you're using Node.js version 18 or higher
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json and reinstall

2. If you encounter Python dependency issues:
   - Make sure you're in a clean virtual environment
   - Upgrade pip: `pip install --upgrade pip`
   - Install wheel: `pip install wheel`

## Development Notes
- The frontend uses Create React App with custom configurations
- TypeScript is used throughout the frontend
- The backend uses FastAPI with various ML and web scraping capabilities
- Both frontend and backend need to be running for full functionality

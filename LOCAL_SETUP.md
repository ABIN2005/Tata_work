# Local Development Setup Guide

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

---

## Step 1: Frontend Setup

### 1.1 Install Frontend Dependencies

Open terminal in the project root directory and run:

```bash
npm install
```

This will install all React dependencies listed in `package.json`.

### 1.2 Create Environment File

Create a `.env` file in the root directory with:

```env
VITE_API_URL=http://localhost:8000/api
```

**Note**: The backend will run on port 8000, frontend on port 5173 (default Vite port).

### 1.3 Run Frontend Development Server

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## Step 2: Backend Setup (AI Server)

### 2.1 Navigate to AI Directory

```bash
cd ai
```

### 2.2 Create Python Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2.3 Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI
- TensorFlow
- Uvicorn
- Pydantic
- NumPy
- Pandas
- scikit-learn
- pytest

### 2.4 Run Backend Server

```bash
uvicorn api.api:app --reload
```

The backend API will be available at: **http://localhost:8000**

API documentation (Swagger UI) at: **http://localhost:8000/docs**

---

## Step 3: Access the Application

1. **Frontend**: Open http://localhost:5173 in your browser
2. **Backend API**: http://localhost:8000
3. **API Docs**: http://localhost:8000/docs

---

## Quick Start Commands

### Terminal 1 - Frontend
```bash
# In project root
npm install
npm run dev
```

### Terminal 2 - Backend
```bash
# In ai directory
cd ai
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
uvicorn api.api:app --reload
```

---

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Python not found:**
- Make sure Python is installed and in PATH
- Try `python3` instead of `python` on Mac/Linux

**Virtual environment issues:**
```bash
# Delete and recreate venv
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Port 8000 already in use:**
```bash
# Change port
uvicorn api.api:app --reload --port 8001
# Then update .env: VITE_API_URL=http://localhost:8001/api
```

**TensorFlow installation issues:**
- TensorFlow is large (~500MB). Be patient during installation
- If it fails, try: `pip install tensorflow --upgrade`

---

## Development Tips

1. **Keep both servers running**: Frontend and backend need to run simultaneously
2. **Hot Reload**: Both servers support hot reload - changes auto-refresh
3. **API Testing**: Use http://localhost:8000/docs to test API endpoints
4. **Browser Console**: Check browser console (F12) for frontend errors
5. **Terminal Logs**: Check terminal for backend errors

---

## Next Steps

- Read `COMPLETE_EXPLANATION.md` for detailed project documentation
- Check `PROJECT_ANALYSIS.md` for known issues and improvements
- Review `QUICK_REFERENCE.md` for quick commands

---

## Notes

- The frontend uses base path `/DAMSBF/` for GitHub Pages, but locally it works without it
- If you see routing issues, check `vite.config.js` - you might need to remove `base: '/DAMSBF/'` for local development
- The AI model is currently a placeholder - actual model implementation is needed

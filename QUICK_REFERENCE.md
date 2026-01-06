# DAMSBF Project - Quick Reference Guide

## 🎯 What is DAMSBF?

**DAMSBF** = **Digital Asset Management System for Blast Furnace**

An industrial monitoring dashboard for **Tata Steel Kalinganagar (TSK)** that:
- Monitors blast furnace equipment in real-time
- Detects anomalies using AI
- Visualizes industrial data
- Provides chatbot assistance
- Manages multiple plant systems

---

## 📂 Folder Structure Quick Guide

```
DAMSBF-production/
│
├── 📁 src/                          # Frontend React Application
│   ├── 📁 Components/               # Reusable UI components (~40+)
│   │   ├── Layout.jsx               # Main layout wrapper
│   │   ├── Dashboard components    # Charts, gauges, health panels
│   │   ├── Alert components        # Alert cards, tables, graphs
│   │   └── AboutUs/                # About page components
│   │
│   ├── 📁 Pages/                    # Page components (~20+)
│   │   ├── Home.jsx                # Landing page
│   │   ├── BLT.jsx                 # Blast Furnace monitoring
│   │   ├── Dashboard/              # Dashboard pages
│   │   ├── FurnaceOverview.jsx    # Furnace monitoring
│   │   └── AdminDashboard.jsx     # Admin panel
│   │
│   ├── 📁 routes/                   # Route configuration
│   ├── 📁 Services/                 # API service layer
│   ├── 📁 Context/                  # Global state (React Context)
│   └── 📁 assets/                   # Images, logos
│
├── 📁 ai/                           # Python AI Backend
│   ├── 📁 model/                    # ML model (TensorFlow/Keras)
│   ├── 📁 api/                      # FastAPI REST endpoints
│   ├── 📁 utils/                    # Utility functions
│   └── requirements.txt             # Python dependencies
│
├── 📁 Documentations/                # Project documentation
├── 📄 package.json                  # Frontend dependencies
├── 📄 vite.config.js                # Build configuration
└── 📄 index.html                    # Entry HTML
```

---

## 🚀 Key Technologies

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19, Vite, Material-UI, TailwindCSS |
| **Charts** | Recharts, ECharts |
| **Backend** | FastAPI, TensorFlow |
| **Deployment** | GitHub Pages |
| **CI/CD** | GitHub Actions (to be set up) |

---

## 🔧 Current Status

### ✅ What's Working
- Frontend React application structure
- Routing system configured
- UI components created
- Basic API service layer
- AI backend structure

### ⚠️ What Needs Work

#### **Critical (Do First)**
1. **AI Backend Dependencies** ✅ Fixed (requirements.txt updated)
2. **AI Model Implementation** - Needs actual model logic
3. **API Error Handling** - Add try-catch, auth headers
4. **Environment Variables** - Create .env.example
5. **CI/CD Workflows** - Create GitHub Actions workflows

#### **Important (Do Next)**
6. **Authentication** - Implement JWT tokens
7. **Tests** - Add unit/integration tests
8. **Documentation** - Update README.md
9. **API Integration** - Connect frontend to backend
10. **Error Boundaries** - Add React error handling

#### **Enhancements (Later)**
11. Performance optimization
12. Accessibility improvements
13. Code cleanup
14. Security audit

---

## 📋 Route Structure

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/signout` - Sign out

### Blast Furnace Routes
- `/blast-furnace/bf1/` - BF1 dashboard
- `/blast-furnace/bf1/BLT` - BLT monitoring
- `/blast-furnace/bf1/about` - About page
- `/blast-furnace/bf1/chatbot` - AI chatbot
- `/blast-furnace/bf1/media-gallery` - Media gallery
- `/blast-furnace/bf1/asset-timeline` - Asset timeline

### Furnace Routes
- `/furnace/overview` - Furnace overview
- `/furnace/hot-blast-flow` - Hot blast monitoring
- `/furnace/tuyere-nose-system-1` - Tuyere Nose 1
- `/furnace/tuyere-nose-system-2` - Tuyere Nose 2

### Admin Routes
- `/admin-dashboard` - Admin panel
- `/overall-status` - System status
- `/health-status` - Health monitoring

### Coming Soon
- `/blast-furnace/bf2` - BF2 (not implemented)
- `/caster/c1`, `/caster/c2`, `/caster/c3` - Caster systems
- `/bof/bof1`, `/bof/bof2`, `/bof/bof3` - BOF systems

---

## 🛠️ Setup Instructions

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Backend Setup (AI)
```bash
cd ai

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run API server
uvicorn api.api:app --reload
```

---

## 📝 Next Steps Checklist

- [ ] Create `.env.example` file
- [ ] Set up GitHub Actions workflows
- [ ] Complete AI model implementation
- [ ] Add authentication system
- [ ] Write tests
- [ ] Update README.md
- [ ] Add error boundaries
- [ ] Connect frontend to backend API
- [ ] Performance optimization
- [ ] Security audit

---

## 📚 Documentation Files

- `PROJECT_ANALYSIS.md` - Detailed project analysis
- `Documentations/Technologies.txt` - Technology explanations
- `Documentations/Deployment.txt` - Deployment guide
- `Documentations/Movement.txt` - Git workflow guide
- `Documentations/Use of CI CD.txt` - CI/CD importance

---

## 🐛 Known Issues

1. AI model has placeholder implementation
2. API service lacks error handling
3. No environment variable documentation
4. Missing CI/CD workflows
5. Minimal test coverage
6. Authentication not fully implemented

---

*For detailed analysis, see `PROJECT_ANALYSIS.md`*

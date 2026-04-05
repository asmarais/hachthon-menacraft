#  The Vision - Authenticity Detection Platform

A comprehensive media authenticity verification system that leverages advanced AI/ML techniques to detect deepfakes, verify document authenticity, and analyze content credibility across multiple media types.

---


**Link Canva :**
https://www.canva.com/design/DAHF9p33i2o/JHSKHvvsX5PL2yXaDyve4A/edit

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technologies Used](#-technologies-used)
- [Architecture & Diagrams](#-architecture--diagrams)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Design Resources](#-design-resources)

---

## 🎯 Project Overview

MenaCraft is an integrated platform designed to combat misinformation and media manipulation by providing robust authenticity verification capabilities. The platform analyzes multiple dimensions of authenticity:

- **Video Authenticity**: Deepfake detection using advanced neural networks
- **Document Verification**: Authentication and integrity checks for documents
- **URL Credibility**: Website authenticity and phishing detection
- **Content Consistency**: Contextual analysis of claims and facts

The system combines multiple analytical axes (consistency, authenticity, credibility) to provide comprehensive verdicts on media integrity.

---

## ✨ Key Features

- ✅ Real-time video deepfake detection
- ✅ Document authenticity verification
- ✅ URL and website credibility analysis
- ✅ Contextual consistency checking
- ✅ Multi-factor analysis with composite scoring
- ✅ REST API for integration
- ✅ Web-based user interface
- ✅ Comprehensive analysis reports

---

## 🛠️ Technologies Used

### Backend
- **Python 3.9+** - Core language
- **FastAPI** - REST API framework
- **PyTorch** - Deep learning framework
- **OpenCV** - Video processing
- **NumPy & Pandas** - Data manipulation
- **Scikit-learn** - ML utilities
- **TensorFlow** - Alternative DL framework

### Frontend
- **Next.js 14+** - React metaframework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **React Hooks** - State management

### Core Models
- **VeriDisQuo 25M** - Deepfake detection model
- **YOLOv8** - Face detection
- **Custom CNN** - Feature extraction
- **Frequency-domain analysis** - FFT/DCT extractors

### Infrastructure & Tools
- **Docker** - Containerization
- **Git** - Version control
- **Pytest** - Testing framework

---

## 🏗️ Architecture & Diagrams

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│         User Interface & Media Upload Handler            │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    Video Input   Document Input   URL Input
        │             │             │
        ▼             ▼             ▼
┌─────────────────────────────────────────────────────────┐
│                    API Layer (FastAPI)                   │
│              /analyze, /verify-url, etc.                 │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌──────────┐   ┌────────────┐
    │ Video  │   │ Document │   │ URL Check  │
    │ Pipeline   │ Handler  │   │ Service    │
    └────────┘   └──────────┘   └────────────┘
        │              │              │
        ▼              ▼              ▼
    ┌──────────────────────────────────────────┐
    │   Analysis Engines (Multiple Axes)       │
    ├──────────────────────────────────────────┤
    │ • Authenticity Axis                      │
    │ • Consistency Axis                       │
    │ • Credibility Axis                       │
    └──────────────────────────────────────────┘
        │              │              │
        ▼              ▼              ▼
    ┌──────────────────────────────────────────┐
    │       Model Inference Engine             │
    ├──────────────────────────────────────────┤
    │ • Deepfake Detection (VeriDisQuo)        │
    │ • Face Detection & Analysis              │
    │ • Frequency Domain Analysis              │
    │ • Feature Extraction                     │
    └──────────────────────────────────────────┘
        │
        ▼
    ┌──────────────────────────────────────────┐
    │      Composite Scoring & Verdict         │
    └──────────────────────────────────────────┘
```

### Data Flow Pipeline

```
Input Media
    │
    ├─→ Preprocessing
    │   ├─ Frame Extraction (Video)
    │   ├─ Normalization
    │   └─ Resizing
    │
    ├─→ Feature Extraction
    │   ├─ Spatial Features (CNN)
    │   ├─ Frequency Features (FFT/DCT)
    │   └─ Face Features
    │
    ├─→ Multi-Axis Analysis
    │   ├─ Authenticity Analysis
    │   ├─ Consistency Analysis
    │   └─ Credibility Analysis
    │
    └─→ Result Aggregation
        └─ Final Verdict & Score
```

---

## 📁 Project Structure

```
hachthon-menacraft/
├── backend/                          # Python backend application
│   ├── app/
│   │   ├── main.py                  # Application entry point
│   │   ├── pipeline.py              # Processing pipeline
│   │   ├── axes/                    # Analysis dimensions
│   │   │   ├── authenticity.py      # Deepfake detection
│   │   │   ├── credibility.py       # Credibility scoring
│   │   │   └── consistency/         # Consistency analysis
│   │   │       ├── consistency.py
│   │   │       ├── axis2_contextual_consistency.py
│   │   │       ├── axis2_document_handler.py
│   │   │       ├── axis2_video_handler.py
│   │   │       ├── burstiness_analyzer.py
│   │   │       ├── fact_check_client.py
│   │   │       └── sentence_model_singleton.py
│   │   ├── models/                  # Pre-trained models
│   │   │   ├── deepfake_detection/  # VeriDisQuo 25M model
│   │   │   └── face_detection/      # Face detection model
│   │   └── utils/                   # Utility modules
│   │       ├── api/                 # REST API
│   │       │   ├── app.py           # FastAPI app
│   │       │   ├── routes.py        # API endpoints
│   │       │   └── schemas.py       # Request/response schemas
│   │       ├── classification/      # Face classification
│   │       ├── frequal/             # Frequency domain analysis
│   │       ├── preprocessing/       # Data preprocessing
│   │       ├── training/            # Model training utilities
│   │       └── dataset_builder/     # Dataset creation tools
│   ├── requirements.txt             # Python dependencies
│   ├── run.py                       # Run script
│   └── tests/                       # Integration tests
│
├── frontend/                        # Next.js frontend
│   ├── app/
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout
│   │   ├── api/                    # API routes
│   │   │   └── analyze/            # Analysis endpoint
│   │   └── components/             # React components
│   │       ├── AnalysisProvider.tsx
│   │       ├── DropZone.tsx
│   │       ├── ResultsSection.tsx
│   │       └── ...other components
│   ├── lib/                        # Utilities
│   ├── types/                      # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── README.md                        # This file
├── quick_test.py                    # Quick testing script
└── test_consistency.py              # Consistency tests
```

### Backend Module Breakdown

| Module | Purpose |
|--------|---------|
| `axes/authenticity` | Deepfake detection & video authenticity |
| `axes/consistency` | Content consistency & fact-checking |
| `axes/credibility` | Content credibility scoring |
| `utils/api` | REST API implementation |
| `utils/classification` | Face detection & classification |
| `utils/frequal` | Frequency domain feature extraction |
| `utils/preprocessing` | Data preprocessing pipelines |
| `utils/dataset_builder` | Dataset construction utilities |
| `utils/training` | Model training workflows |

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.9 or higher
- Node.js 18+ (for frontend)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend
python run.py
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 💻 Usage

### API Endpoints

**Analyze Video/Document:**
```bash
POST /api/analyze
Content-Type: multipart/form-data

Parameters:
- file: <media_file>
- type: 'video' | 'document' | 'url'
```

**Response:**
```json
{
  "verdict": "authentic" | "deepfake" | "suspicious",
  "confidence": 0.95,
  "scores": {
    "authenticity": 0.92,
    "consistency": 0.88,
    "credibility": 0.95
  },
  "details": {...}
}
```

---

## ⚡ Resources

### Details about Axis 

<img width="1230" height="960" alt="Design 2" src="https://github.com/user-attachments/assets/188495ba-1d75-4049-8755-72a800bf3dc1" />

<img width="1230" height="960" alt="Design 1" src="https://github.com/user-attachments/assets/19b49230-bffe-476e-b250-689c02347eaf" />

<img width="1240" height="943" alt="Design 3" src="https://github.com/user-attachments/assets/83f8fa40-9f82-4302-ac2b-b80d3e3fe1eb" />

# AI-Driven Resume Screening & Candidate Ranking System

An AI-powered, full-stack recruitment platform that automates resume screening, candidate evaluation, and ranking using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and the **Google Gemini API**.

Recruiters often have to manually sift through hundreds of resumes for every job opening — a slow, inconsistent, and error-prone process. This project automates that first stage of recruitment: employers upload resumes, the system extracts and semantically compares them against the job description using Google Gemini, and returns match scores, matched/missing skills, experience estimates, bias flags, and explainable rankings — all through a simple dashboard.

---

## ✨ Features

- 🔐 Secure employer & candidate authentication (JWT-based)
- 📋 Job posting creation, editing, and management
- 📄 Bulk resume upload (PDF & DOCX, up to 20 files per batch)
- 🧠 AI-powered semantic resume analysis via Google Gemini API
- 📊 Automatic match scoring, skill gap analysis & experience estimation
- 🏆 Deterministic candidate ranking with tie-breaking logic
- ⚠️ Bias-indicator flagging (e.g., photographs, age, marital status)
- ✅ Candidate status management (Shortlist / Reject / Pending)
- 📥 CSV export of shortlisted candidates
- 📧 Automated email notifications for status updates
- 👤 Read-only candidate portal to check application status
- 📈 Recruitment analytics dashboard

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, React Router, React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| AI Service | Google Gemini API (`gemini-2.5-flash-lite`) |
| Authentication | JWT, bcrypt |
| File Handling | Multer, `unpdf` (PDF), `mammoth` (DOCX) |
| Notifications | Nodemailer |
| Tooling | Postman, dotenv |

---

## 🖥️ Architecture

The system follows a **three-tier architecture**:

1. **Presentation Layer** — React.js SPA with separate employer and candidate interfaces
2. **Application Layer** — Node.js/Express.js REST APIs handling auth, job management, resume processing, AI screening, and ranking
3. **Data Layer** — MongoDB collections for `Users`, `Jobs`, and `Resumes`

The Google Gemini API is integrated as an external AI service for semantic resume-to-job matching.

---

## 📂 Project Structure

```
AI-Driven-Resume-Screening-and-Candidate-Ranking-System/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, JobModal, FilterBar, ...
│   │   ├── context/        # AuthContext, JobsContext, ResumeContext, ...
│   │   ├── layouts/         # MainLayout, CandidateLayout
│   │   ├── pages/           # Login, Register, Dashboard, Jobs, ...
│   │   ├── routes/          # AppRoutes.jsx
│   │   └── services/        # authService, jobService, resumeService, ...
│   └── package.json
└── backend/
    ├── config/           # db.js
    ├── controllers/       # authController, jobController, resumeController, ...
    ├── middleware/         # authMiddleware, uploadMiddleware, validateRequest
    ├── models/             # User.js, Job.js, Resume.js
    ├── routes/             # authRoutes, jobRoutes, resumeRoutes, ...
    ├── services/           # geminiService, pdfService, rankingService, emailService
    ├── uploads/            # Uploaded resume storage
    └── server.js
```

---

## ⚙️ Installation & Setup

### Prerequisites

| Software | Version |
|---|---|
| Node.js | v18 or later |
| npm | v9 or later |
| MongoDB | Community Edition or Atlas |
| Git | Latest |

### 1. Clone the repository

```bash
git clone https://github.com/Harshal10k/AI-Driven-Resume-Screening-and-Candidate-Ranking-System.git
cd AI-Driven-Resume-Screening-and-Candidate-Ranking-System
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
```

Start the backend:

```bash
npm run dev
```

The server runs on `http://localhost:5000` by default.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Overview

| Module | Method | Endpoint | Description |
|---|---|---|---|
| Auth | POST | `/api/auth/register` | Register employer/candidate |
| Auth | POST | `/api/auth/login` | Authenticate & get JWT |
| Profile | GET/PUT | `/api/profile` | View/update profile |
| Jobs | POST/GET/PATCH/DELETE | `/api/jobs` | Manage job postings |
| Resumes | POST | `/api/resumes/upload/:jobId` | Upload resumes for AI screening |
| Resumes | GET | `/api/resumes/job/:jobId` | Get ranked resumes for a job |
| Resumes | PATCH | `/api/resumes/:resumeId/status` | Shortlist / reject candidate |
| Resumes | GET | `/api/resumes/export/:jobId` | Export shortlisted candidates as CSV |
| Dashboard | GET | `/api/dashboard` | Recruitment statistics |
| Candidate | GET | `/api/resumes/candidate` | Candidate's application status |

---

## 🧪 Testing

Module-level testing was performed using the React frontend and Postman for API validation, covering authentication, job management, file upload/validation, Gemini integration, candidate ranking, and error handling.

---

## 🚧 Limitations

- Supports only **PDF and DOCX** resumes, in **English**
- Depends on **Google Gemini API** availability, connectivity, and rate limits
- Evaluation quality depends on resume formatting and job description clarity
- No interview scheduling, ATS integration, onboarding, or payroll features
- Not yet optimized for large-scale concurrent resume processing

---

## 🔮 Future Scope

- Support additional formats (TXT, ODT)
- Asynchronous job queues for bulk resume processing at scale
- Interview scheduling & calendar integration
- Advanced analytics dashboards
- Recruiter-feedback-informed ranking
- Multilingual resume analysis
- Cloud deployment with containerization
- Support for additional/alternate AI models

---

## 👥 Contributors

- Harshal Giradkar
- Sahil Madavi
- Kshitij Dhote
- Aniket Khorgade

---

## 📄 License

See the [LICENSE](./LICENSE) file for details.

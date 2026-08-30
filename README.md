interviewAI

An all-in-one AI-powered career preparation platform** — build your resume, check your ATS score, generate a personalized learning roadmap, and practice interviews with an AI voice interviewer for both technical and HR rounds.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

✨ Features

📄 Resume Builder & ATS Checker
- Create a professional resume from scratch inside the app
- Get an instant ATS (Applicant Tracking System) compatibility score to see how well your resume performs against automated screening systems
- Actionable suggestions to improve resume quality and keyword match

🗺️ AI Roadmap Builder
- Generates a personalized learning roadmap based on your target role/skills
- Each roadmap node comes attached with **curated YouTube lectures and articles**, so you can learn directly from the roadmap without searching separately

🎙️ AI Voice Interviewer
- Conducts **both Technical and HR interviews**
- Fully voice-based — ask and answer questions naturally, just like a real interview
- **Built-in code editor** for technical/coding rounds
- Supports **two ways to answer coding questions**:
  - Speak your answer via microphone (auto-converted to code/text)
  - Type your answer manually
- Real-time interview flow powered by AI agents

📊 Dashboard
- Centralized dashboard to track all your activity — resumes created, interviews taken, roadmap progress, and past scores/records

💳 Payments
- Integrated **Razorpay** for subscription/premium plan payments

🔐 Authentication
- **Google Sign-In** via Firebase Authentication for quick and secure login

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠️ Tech Stack

Frontend
- React.js
- JavaScript

Backend
- Node.js / Express (microservices architecture)
- MongoDB

**Authentication**
- Firebase (Google Sign-In)

**Payments**
- Razorpay

**Architecture**
- Microservices-based backend — separate services for:
  - Auth
  - Billing
  - Interview (AI agents + LangGraph-based flow)
  - Resume (builder + ATS scoring)
  - Roadmap (AI-generated learning paths)
- API Gateway to route requests across services
- Redis for shared caching/session data
- Dockerized services with individual Dockerfiles + `docker-compose.yml`

---

## 🏗️ Project Structure

```
backend/
├── gateway/            # API Gateway
├── services/
│   ├── auth/           # Authentication service
│   ├── billing/        # Razorpay payment handling
│   ├── interview/      # AI voice interviewer (agents, graph, prompts)
│   ├── resume/         # Resume builder + ATS scoring
│   └── roadmap/        # AI-generated roadmap with resources
├── shared/redis/       # Shared Redis config
└── docker-compose.yml

frontend/
├── src/
│   ├── apis/            # API call handlers
│   ├── components/      # Reusable UI components
│   ├── pages/            # App pages (Dashboard, Interview, Billing, etc.)
│   ├── redux/            # State management
│   └── utils/             # Axios instance, Firebase config
```
